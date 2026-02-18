import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTask, useGetAllCases } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { toast } from 'sonner';

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { identity } = useInternetIdentity();
  const { data: cases = [] } = useGetAllCases();
  const [caseId, setCaseId] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const createTask = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseId || !description.trim() || !deadline) {
      toast.error('All fields are required');
      return;
    }

    if (!identity) {
      toast.error('Not authenticated');
      return;
    }

    try {
      await createTask.mutateAsync({
        caseId: BigInt(caseId),
        description: description.trim(),
        assignedOfficer: identity.getPrincipal(),
        deadline,
      });
      toast.success('Task created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create task');
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new investigation task.</DialogDescription>
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
            <Label htmlFor="description">Task Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createTask.isPending}>
              {createTask.isPending ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
