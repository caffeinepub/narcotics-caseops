import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddEvidence, useGetAllCases } from '../../hooks/useQueries';
import { Variant_testimonial_physical_digital } from '../../backend';
import { toast } from 'sonner';

interface EvidenceFormProps {
  onClose: () => void;
}

export default function EvidenceForm({ onClose }: EvidenceFormProps) {
  const { data: cases = [] } = useGetAllCases();
  const [caseId, setCaseId] = useState('');
  const [description, setDescription] = useState('');
  const [dateCollected, setDateCollected] = useState(new Date().toISOString().split('T')[0]);
  const [evidenceType, setEvidenceType] = useState<Variant_testimonial_physical_digital | ''>('');
  const addEvidence = useAddEvidence();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseId || !description.trim() || !dateCollected || !evidenceType) {
      toast.error('All fields are required');
      return;
    }

    try {
      await addEvidence.mutateAsync({
        caseId: BigInt(caseId),
        description: description.trim(),
        dateCollected,
        evidenceType: evidenceType as Variant_testimonial_physical_digital,
      });
      toast.success('Evidence added successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to add evidence');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Evidence</DialogTitle>
          <DialogDescription>Register a new evidence item.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caseId">Case *</Label>
            <Select value={caseId} onValueChange={setCaseId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                {cases.map((c) => (
                  <SelectItem key={c.id.toString()} value={c.id.toString()}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter evidence description"
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="evidenceType">Evidence Type *</Label>
            <Select value={evidenceType} onValueChange={(value) => setEvidenceType(value as Variant_testimonial_physical_digital)}>
              <SelectTrigger>
                <SelectValue placeholder="Select evidence type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Variant_testimonial_physical_digital.physical}>Physical</SelectItem>
                <SelectItem value={Variant_testimonial_physical_digital.digital}>Digital</SelectItem>
                <SelectItem value={Variant_testimonial_physical_digital.testimonial}>Testimonial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateCollected">Date Collected *</Label>
            <Input
              id="dateCollected"
              type="date"
              value={dateCollected}
              onChange={(e) => setDateCollected(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addEvidence.isPending}>
              {addEvidence.isPending ? 'Adding...' : 'Add Evidence'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
