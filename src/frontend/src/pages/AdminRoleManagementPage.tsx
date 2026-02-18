import { useState } from 'react';
import { useAssignCallerUserRole } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Principal } from '@dfinity/principal';
import { UserRole } from '../backend';
import AdminOnly from '../components/auth/AdminOnly';

export default function AdminRoleManagementPage() {
  const [principalText, setPrincipalText] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.user);

  const assignRoleMutation = useAssignCallerUserRole();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!principalText.trim()) {
      toast.error('Please enter a principal ID');
      return;
    }

    try {
      const principal = Principal.fromText(principalText.trim());
      await assignRoleMutation.mutateAsync({
        user: principal,
        role: selectedRole,
      });
      toast.success(`Role ${selectedRole} assigned successfully`);
      setPrincipalText('');
      setSelectedRole(UserRole.user);
    } catch (error: any) {
      if (error.message?.includes('Invalid principal')) {
        toast.error('Invalid principal ID format');
      } else if (error.message?.includes('Unauthorized')) {
        toast.error('You do not have permission to assign roles');
      } else {
        toast.error(error.message || 'Failed to assign role');
      }
      console.error(error);
    }
  };

  return (
    <AdminOnly>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground">Assign roles and permissions to users</p>
          </div>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Assign User Role</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="principal">Principal ID *</Label>
                <Input
                  id="principal"
                  value={principalText}
                  onChange={(e) => setPrincipalText(e.target.value)}
                  placeholder="Enter principal ID (e.g., xxxxx-xxxxx-xxxxx-xxxxx-xxx)"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The unique identifier for the user on the Internet Computer
                </p>
              </div>

              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.admin}>Admin</SelectItem>
                    <SelectItem value={UserRole.user}>User</SelectItem>
                    <SelectItem value={UserRole.guest}>Guest</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <p><strong>Admin:</strong> Full access including role management and case/task/evidence status updates</p>
                  <p><strong>User:</strong> Standard access for officers (view and create records)</p>
                  <p><strong>Guest:</strong> Read-only access</p>
                </div>
              </div>

              <Button type="submit" disabled={assignRoleMutation.isPending}>
                {assignRoleMutation.isPending ? 'Assigning...' : 'Assign Role'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-sm text-muted-foreground">
                <strong>Role changes take effect immediately</strong> after the user refreshes or logs in again.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <p className="text-sm text-muted-foreground">
                <strong>Only admins</strong> can access this page and assign roles to other users.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <p className="text-sm text-muted-foreground">
                <strong>Admin-only operations:</strong> Creating cases, tasks, and evidence; updating case/task/evidence status.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminOnly>
  );
}
