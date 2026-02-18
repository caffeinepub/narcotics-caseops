import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLogActivity } from '../../hooks/useQueries';
import { ActivityType } from '../../backend';
import { toast } from 'sonner';

interface ActivityLogFormProps {
  onClose: () => void;
}

export default function ActivityLogForm({ onClose }: ActivityLogFormProps) {
  const [activityType, setActivityType] = useState<ActivityType | ''>('');
  const [description, setDescription] = useState('');
  const logActivity = useLogActivity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activityType || !description.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await logActivity.mutateAsync({
        activityType: activityType as ActivityType,
        description: description.trim(),
        timestamp: new Date().toISOString(),
      });
      toast.success('Activity logged successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to log activity');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
          <DialogDescription>Record an officer activity.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activityType">Activity Type *</Label>
            <Select value={activityType} onValueChange={(value) => setActivityType(value as ActivityType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ActivityType.patrol}>Patrol</SelectItem>
                <SelectItem value={ActivityType.arrest}>Arrest</SelectItem>
                <SelectItem value={ActivityType.evidenceCollection}>Evidence Collection</SelectItem>
                <SelectItem value={ActivityType.witnessInterview}>Witness Interview</SelectItem>
                <SelectItem value={ActivityType.surveillance}>Surveillance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter activity description"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={logActivity.isPending}>
              {logActivity.isPending ? 'Logging...' : 'Log Activity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
