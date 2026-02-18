import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [rank, setRank] = useState('');
  const [department, setDepartment] = useState('Anti Narcotics Task Force');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !badgeNumber.trim() || !rank.trim() || !department.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        badgeNumber: badgeNumber.trim(),
        rank: rank.trim(),
        department: department.trim(),
      });
      toast.success('Profile created successfully');
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>Please provide your officer details to continue.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badgeNumber">Badge Number *</Label>
            <Input
              id="badgeNumber"
              value={badgeNumber}
              onChange={(e) => setBadgeNumber(e.target.value)}
              placeholder="Enter your badge number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rank">Rank *</Label>
            <Input
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g., Inspector, Sub-Inspector"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={saveProfile.isPending}>
            {saveProfile.isPending ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
