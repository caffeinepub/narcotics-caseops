import { useState } from 'react';
import { useGetAllEvidence, useGetAllCases } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LastUpdatedBadge from '../components/data/LastUpdatedBadge';
import ManualRefreshButton from '../components/data/ManualRefreshButton';
import EvidenceForm from '../components/evidence/EvidenceForm';
import { Plus, Package } from 'lucide-react';
import { EvidenceStatus } from '../backend';

const statusColors: Record<EvidenceStatus, string> = {
  [EvidenceStatus.inCustody]: 'default',
  [EvidenceStatus.analyzed]: 'secondary',
  [EvidenceStatus.returned]: 'outline',
  [EvidenceStatus.destroyed]: 'destructive',
};

export default function EvidencePage() {
  const { data: evidence = [], dataUpdatedAt, isLoading, refetch } = useGetAllEvidence();
  const { data: cases = [] } = useGetAllCases();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getCaseTitle = (caseId: bigint) => {
    const caseItem = cases.find((c) => c.id === caseId);
    return caseItem?.title || `Case #${caseId}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evidence Register</h1>
          <p className="text-muted-foreground">Track and manage evidence items</p>
        </div>
        <div className="flex gap-2">
          <ManualRefreshButton onRefresh={refetch} isRefreshing={isLoading} />
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Evidence
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{evidence.length} items</p>
        <LastUpdatedBadge dataUpdatedAt={dataUpdatedAt} isLoading={isLoading} />
      </div>

      {evidence.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No evidence items found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evidence.map((item) => (
            <Card key={item.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{item.description}</CardTitle>
                  <Badge variant={statusColors[item.status] as any}>{item.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Case: {getCaseTitle(item.caseId)}</p>
                  <p>Type: {item.evidenceType}</p>
                  <p>Collected: {item.dateCollected}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showCreateForm && <EvidenceForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
