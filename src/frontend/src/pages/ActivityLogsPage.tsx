import { useState } from 'react';
import { useGetAllActivityLogs } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import ActivityLogForm from '../components/activity/ActivityLogForm';
import { Plus, Activity, Calendar, X } from 'lucide-react';
import { ActivityType } from '../backend';

const activityTypeColors: Record<ActivityType, string> = {
  [ActivityType.patrol]: 'default',
  [ActivityType.arrest]: 'destructive',
  [ActivityType.evidenceCollection]: 'secondary',
  [ActivityType.witnessInterview]: 'outline',
  [ActivityType.surveillance]: 'outline',
};

export default function ActivityLogsPage() {
  const { data: logs = [], dataUpdatedAt, isLoading, refetch } = useGetAllActivityLogs();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const sortedLogs = [...logs].sort((a, b) => Number(b.id - a.id));

  const handleTodayFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const filteredLogs = sortedLogs.filter((log) => {
    if (!startDate && !endDate) return true;

    // Parse log timestamp (assuming format like "2024-01-15" or "2024-01-15 10:30")
    const logDate = log.timestamp.split(' ')[0];

    if (startDate && logDate < startDate) return false;
    if (endDate && logDate > endDate) return false;

    return true;
  });

  const hasFilters = startDate || endDate;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">Officer activity timeline</p>
        </div>
        <div className="flex gap-2">
          <ManualRefreshButton onRefresh={refetch} isRefreshing={isLoading} />
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Log Activity
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Date Filters</h3>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleTodayFilter}>
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            {hasFilters && (
              <Button variant="outline" onClick={handleClearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {hasFilters ? `${filteredLogs.length} filtered entries` : `${logs.length} entries`}
        </p>
        <LastUpdatedBadge dataUpdatedAt={dataUpdatedAt} isLoading={isLoading} />
      </div>

      {filteredLogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              {hasFilters ? 'No activity logs found for the selected date range' : 'No activity logs found'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id.toString()} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={activityTypeColors[log.activityType] as any}>{log.activityType}</Badge>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="text-sm">{log.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showCreateForm && <ActivityLogForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
