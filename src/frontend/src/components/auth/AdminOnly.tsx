import { ReactNode } from 'react';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

interface AdminOnlyProps {
  children: ReactNode;
}

export default function AdminOnly({ children }: AdminOnlyProps) {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="max-w-md mx-auto mt-12">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShieldAlert className="h-16 w-16 text-destructive" />
          <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            You do not have permission to access this page. Only administrators can view this content.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}
