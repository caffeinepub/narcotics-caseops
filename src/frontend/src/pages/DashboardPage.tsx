import { useGetAllCases, useGetAllTasks, useGetAllActivityLogs, useGetAllEvidence } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import { FolderOpen, ListTodo, Activity, Package, TrendingUp } from 'lucide-react';
import { CaseStatus, TaskStatus } from '../backend';

export default function DashboardPage() {
  const { data: cases = [], dataUpdatedAt: casesUpdatedAt, isLoading: casesLoading, refetch: refetchCases } = useGetAllCases();
  const { data: tasks = [], dataUpdatedAt: tasksUpdatedAt, isLoading: tasksLoading, refetch: refetchTasks } = useGetAllTasks();
  const { data: logs = [], dataUpdatedAt: logsUpdatedAt, isLoading: logsLoading, refetch: refetchLogs } = useGetAllActivityLogs();
  const { data: evidence = [], dataUpdatedAt: evidenceUpdatedAt, isLoading: evidenceLoading, refetch: refetchEvidence } = useGetAllEvidence();

  const openCases = cases.filter((c) => c.status === CaseStatus.open || c.status === CaseStatus.underInvestigation).length;
  const pendingTasks = tasks.filter((t) => t.status === TaskStatus.pending || t.status === TaskStatus.inProgress).length;
  const recentLogs = logs.slice(-5).reverse();

  const handleRefreshAll = () => {
    refetchCases();
    refetchTasks();
    refetchLogs();
    refetchEvidence();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of current operations</p>
        </div>
        <ManualRefreshButton onRefresh={handleRefreshAll} isRefreshing={casesLoading || tasksLoading} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
            <p className="text-xs text-muted-foreground">{openCases} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investigation Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">{pendingTasks} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">Total entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evidence Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evidence.length}</div>
            <p className="text-xs text-muted-foreground">In custody</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <LastUpdatedBadge dataUpdatedAt={logsUpdatedAt} isLoading={logsLoading} />
            </div>
          </CardHeader>
          <CardContent>
            {recentLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id.toString()} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                    <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{log.activityType}</p>
                      <p className="text-xs text-muted-foreground">{log.description}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Case Status Overview</CardTitle>
              <LastUpdatedBadge dataUpdatedAt={casesUpdatedAt} isLoading={casesLoading} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Open</span>
                <Badge variant="default">{cases.filter((c) => c.status === CaseStatus.open).length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Under Investigation</span>
                <Badge variant="secondary">{cases.filter((c) => c.status === CaseStatus.underInvestigation).length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Closed</span>
                <Badge variant="outline">{cases.filter((c) => c.status === CaseStatus.closed).length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Archived</span>
                <Badge variant="outline">{cases.filter((c) => c.status === CaseStatus.archived).length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
