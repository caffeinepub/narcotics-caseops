import { useState } from 'react';
import { useAddInvestigationRecordToAccused } from '../../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';

interface AccusedAttachmentUploadDialogProps {
  accusedId: bigint;
  onClose: () => void;
}

export default function AccusedAttachmentUploadDialog({
  accusedId,
  onClose,
}: AccusedAttachmentUploadDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addRecordMutation = useAddInvestigationRecordToAccused();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let attachments: ExternalBlob[] | undefined;

      if (selectedFile) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
        attachments = [blob];
      }

      await addRecordMutation.mutateAsync({
        accusedId,
        title: title.trim(),
        description: description.trim(),
        attachments,
      });

      toast.success('Investigation record added successfully');
      onClose();
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to add investigation record';
      if (errorMessage.includes('size') || errorMessage.includes('limit')) {
        toast.error('File size exceeds the maximum allowed limit. Please use a smaller file.');
      } else {
        toast.error(errorMessage);
      }
      console.error(error);
    }
  };

  const isSubmitting = addRecordMutation.isPending;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Investigation Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter record title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter investigation details"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="file">Attachment (Optional, max 10MB)</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {isSubmitting && uploadProgress > 0 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} />
              <p className="text-xs text-muted-foreground text-center">{uploadProgress}%</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
