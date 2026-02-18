import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCase } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';

interface CaseFormProps {
  onClose: () => void;
}

export default function CaseForm({ onClose }: CaseFormProps) {
  const { identity } = useInternetIdentity();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateOpened, setDateOpened] = useState(new Date().toISOString().split('T')[0]);
  const createCase = useCreateCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !dateOpened) {
      toast.error('All fields are required');
      return;
    }

    if (!identity) {
      toast.error('Not authenticated');
      return;
    }

    try {
      await createCase.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        leadInvestigator: identity.getPrincipal(),
        dateOpened,
      });
      toast.success('Case created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create case');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
          <DialogDescription>Add a new investigation case to the system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter case title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter case description"
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOpened">Date Opened *</Label>
            <Input
              id="dateOpened"
              type="date"
              value={dateOpened}
              onChange={(e) => setDateOpened(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCase.isPending}>
              {createCase.isPending ? 'Creating...' : 'Create Case'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
