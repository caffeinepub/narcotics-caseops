import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Copy, LogOut, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AccessDeniedScreen() {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const principalId = identity?.getPrincipal().toString() || '';

  const handleCopyPrincipal = async () => {
    try {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      toast.success('Principal ID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy Principal ID');
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[oklch(0.25_0_0)] to-[oklch(0.15_0_0)] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You are logged in but do not have the required permissions to access this application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium text-foreground">Your Principal ID:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 overflow-hidden text-ellipsis rounded bg-background px-3 py-2 text-xs font-mono">
                {principalId}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyPrincipal}
                className="shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">What to do next:</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Copy your Principal ID using the button above</li>
              <li>Contact an administrator of this application</li>
              <li>Provide them with your Principal ID</li>
              <li>Ask them to assign you a role (User or Admin) via the Role Management page</li>
              <li>Once assigned, log out and log back in to access the application</li>
            </ol>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
