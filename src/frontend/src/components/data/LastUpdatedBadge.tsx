import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface LastUpdatedBadgeProps {
  dataUpdatedAt: number;
  isLoading?: boolean;
  isError?: boolean;
}

export default function LastUpdatedBadge({ dataUpdatedAt, isLoading, isError }: LastUpdatedBadgeProps) {
  if (isError) {
    return (
      <Badge variant="destructive" className="gap-1">
        <Clock className="h-3 w-3" />
        Error loading data
      </Badge>
    );
  }

  if (isLoading) {
    return (
      <Badge variant="secondary" className="gap-1">
        <Clock className="h-3 w-3" />
        Loading...
      </Badge>
    );
  }

  const now = Date.now();
  const diff = now - dataUpdatedAt;
  const seconds = Math.floor(diff / 1000);

  let timeText = 'Just now';
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    timeText = `${minutes}m ago`;
  } else if (seconds > 5) {
    timeText = `${seconds}s ago`;
  }

  return (
    <Badge variant="outline" className="gap-1">
      <Clock className="h-3 w-3" />
      {timeText}
    </Badge>
  );
}
