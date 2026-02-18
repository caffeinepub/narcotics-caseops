import { useState } from 'react';
import { useCreateAccused, useUpdateAccused } from '../../hooks/useQueries';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { AccusedDatabase, AccusedStatus } from '../../backend';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AccusedFormDialogProps {
  accused?: AccusedDatabase;
  onClose: () => void;
}

export default function AccusedFormDialog({ accused, onClose }: AccusedFormDialogProps) {
  const [name, setName] = useState(accused?.name || '');
  const [status, setStatus] = useState<AccusedStatus>(accused?.status || AccusedStatus.inJail);
  const [firDetails, setFirDetails] = useState(accused?.firDetails || '');
  const [seizureDetails, setSeizureDetails] = useState(accused?.seizureDetails || '');
  const [ndpsQuantity, setNdpsQuantity] = useState(accused?.ndpsQuantity || '');
  const [policeStation, setPoliceStation] = useState(accused?.policeStation || '');

  const createMutation = useCreateAccused();
  const updateMutation = useUpdateAccused();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !firDetails.trim() || !policeStation.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (accused) {
        await updateMutation.mutateAsync({
          accusedId: accused.id,
          name: name.trim(),
          status,
          firDetails: firDetails.trim(),
          seizureDetails: seizureDetails.trim(),
          ndpsQuantity: ndpsQuantity.trim(),
          policeStation: policeStation.trim(),
        });
        toast.success('Accused record updated successfully');
      } else {
        await createMutation.mutateAsync({
          name: name.trim(),
          status,
          firDetails: firDetails.trim(),
          seizureDetails: seizureDetails.trim(),
          ndpsQuantity: ndpsQuantity.trim(),
          policeStation: policeStation.trim(),
        });
        toast.success('Accused record created successfully');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save accused record');
      console.error(error);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{accused ? 'Edit Accused Record' : 'Add New Accused'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter accused name"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as AccusedStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AccusedStatus.inJail}>In Jail</SelectItem>
                  <SelectItem value={AccusedStatus.onBail}>On Bail</SelectItem>
                  <SelectItem value={AccusedStatus.absconded}>Absconded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="firDetails">FIR Details *</Label>
              <Textarea
                id="firDetails"
                value={firDetails}
                onChange={(e) => setFirDetails(e.target.value)}
                placeholder="Enter FIR number and details"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="policeStation">Police Station *</Label>
              <Input
                id="policeStation"
                value={policeStation}
                onChange={(e) => setPoliceStation(e.target.value)}
                placeholder="Enter police station name"
                required
              />
            </div>

            <div>
              <Label htmlFor="seizureDetails">Seizure Details</Label>
              <Textarea
                id="seizureDetails"
                value={seizureDetails}
                onChange={(e) => setSeizureDetails(e.target.value)}
                placeholder="Enter seizure details"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="ndpsQuantity">NDPS Quantity Classification</Label>
              <Input
                id="ndpsQuantity"
                value={ndpsQuantity}
                onChange={(e) => setNdpsQuantity(e.target.value)}
                placeholder="e.g., Small Quantity - 50g Heroin"
              />
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : accused ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
