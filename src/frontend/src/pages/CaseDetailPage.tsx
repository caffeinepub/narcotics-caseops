import { useParams, Link } from '@tanstack/react-router';
import { useGetCase, useGetAllTasks, useGetAllActivityLogs, useGetAllEvidence, useUpdateCaseStatus, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import { ArrowLeft, ListTodo, Activity, Package } from 'lucide-react';
import { CaseStatus } from '../backend';
import { toast } from 'sonner';

export default function CaseDetailPage() {
  const { caseId } = useParams({ from: '/cases/$caseId' });
  const caseIdBigInt = BigInt(caseId);
  const { data: caseData, dataUpdatedAt, isLoading, refetch } = useGetCase(caseIdBigInt);
  const { data: allTasks = [] } = useGetAllTasks();
  const { data: allLogs = [] } = useGetAllActivityLogs();
  const { data: allEvidence = [] } = useGetAllEvidence();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const updateStatus = useUpdateCaseStatus();

  if (isLoading) {
    return <div className="text-center py-12">Loading case details...</div>;
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Case not found</p>
        <Link to="/cases">
          <Button className="mt-4" variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
        </Link>
      </div>
    );
  }

  const caseTasks = allTasks.filter((t) => t.caseId === caseIdBigInt);
  const caseEvidence = allEvidence.filter((e) => e.caseId === caseIdBigInt);

  const handleStatusChange = async (newStatus: CaseStatus) => {
    if (!isAdmin) {
      toast.error('Only administrators can update case status');
      return;
    }

    try {
      await updateStatus.mutateAsync({ caseId: caseIdBigInt, status: newStatus });
      toast.success('Case status updated');
    } catch (error: any) {
      if (error.message?.includes('Unauthorized')) {
        toast.error('You do not have permission to update case status');
      } else {
        toast.error('Failed to update case status');
      }
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/cases">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{caseData.title}</h1>
            <p className="text-muted-foreground">Case #{caseData.id.toString()}</p>
          </div>
        </div>
        <ManualRefreshButton onRefresh={refetch} isRefreshing={isLoading} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Case Details</CardTitle>
            <LastUpdatedBadge dataUpdatedAt={dataUpdatedAt} isLoading={isLoading} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              value={caseData.status}
              onValueChange={(value) => handleStatusChange(value as CaseStatus)}
              disabled={!isAdmin}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={CaseStatus.open}>Open</SelectItem>
                <SelectItem value={CaseStatus.underInvestigation}>Under Investigation</SelectItem>
                <SelectItem value={CaseStatus.closed}>Closed</SelectItem>
                <SelectItem value={CaseStatus.archived}>Archived</SelectItem>
              </SelectContent>
            </Select>
            {!isAdmin && (
              <p className="text-xs text-muted-foreground mt-1">
                Only administrators can update case status
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <p className="mt-1 text-sm text-muted-foreground">{caseData.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Date Opened</label>
              <p className="mt-1 text-sm text-muted-foreground">{caseData.dateOpened}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Involved Officers</label>
              <p className="mt-1 text-sm text-muted-foreground">{caseData.involvedOfficers.length} officers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseTasks.length}</div>
            <p className="text-xs text-muted-foreground">Investigation tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Evidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseEvidence.length}</div>
            <p className="text-xs text-muted-foreground">Evidence items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Officers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseData.involvedOfficers.length}</div>
            <p className="text-xs text-muted-foreground">Assigned officers</p>
          </CardContent>
        </Card>
      </div>

      {caseTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {caseTasks.map((task) => (
                <div key={task.id.toString()} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.description}</p>
                    <p className="text-xs text-muted-foreground">Deadline: {task.deadline}</p>
                  </div>
                  <Badge variant="outline">{task.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {caseEvidence.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Evidence Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {caseEvidence.map((item) => (
                <div key={item.id.toString()} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.evidenceType} • Collected: {item.dateCollected}
                    </p>
                  </div>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
