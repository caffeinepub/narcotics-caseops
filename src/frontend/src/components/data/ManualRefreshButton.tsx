import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ManualRefreshButtonProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export default function ManualRefreshButton({ onRefresh, isRefreshing }: ManualRefreshButtonProps) {
  return (
    <Button onClick={onRefresh} disabled={isRefreshing} variant="outline" size="sm" className="gap-2">
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
  );
}
