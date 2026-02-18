import { useState } from 'react';
import { useGetAllCases } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import CaseForm from '../components/cases/CaseForm';
import { useNavigate } from '@tanstack/react-router';
import { Plus, FolderOpen } from 'lucide-react';
import { CaseStatus } from '../backend';

const statusColors: Record<CaseStatus, string> = {
  [CaseStatus.open]: 'default',
  [CaseStatus.underInvestigation]: 'secondary',
  [CaseStatus.closed]: 'outline',
  [CaseStatus.archived]: 'outline',
};

export default function CasesListPage() {
  const { data: cases = [], dataUpdatedAt, isLoading, refetch } = useGetAllCases();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredCases = statusFilter === 'all' ? cases : cases.filter((c) => c.status === statusFilter);

  const handleCaseClick = (caseId: bigint) => {
    navigate({ to: '/cases/$caseId', params: { caseId: caseId.toString() } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <p className="text-muted-foreground">Manage investigation cases</p>
        </div>
        <div className="flex gap-2">
          <ManualRefreshButton onRefresh={refetch} isRefreshing={isLoading} />
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>
          All
        </Button>
        <Button
          variant={statusFilter === CaseStatus.open ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(CaseStatus.open)}
        >
          Open
        </Button>
        <Button
          variant={statusFilter === CaseStatus.underInvestigation ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(CaseStatus.underInvestigation)}
        >
          Under Investigation
        </Button>
        <Button
          variant={statusFilter === CaseStatus.closed ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(CaseStatus.closed)}
        >
          Closed
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filteredCases.length} cases</p>
        <LastUpdatedBadge dataUpdatedAt={dataUpdatedAt} isLoading={isLoading} />
      </div>

      {filteredCases.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No cases found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id.toString()}
              className="h-full transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <Badge variant={statusColors[caseItem.status] as any}>{caseItem.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{caseItem.description}</p>
                <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                  <p>Opened: {caseItem.dateOpened}</p>
                  <p>Officers: {caseItem.involvedOfficers.length}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showCreateForm && <CaseForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
