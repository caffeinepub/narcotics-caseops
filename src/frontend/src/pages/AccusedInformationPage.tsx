import { useState } from 'react';
import { useGetAllAccusedRecords, useSearchAccusedRecords } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users } from 'lucide-react';
import { AccusedStatus } from '../backend';
import AccusedList from '../components/accused/AccusedList';
import AccusedFormDialog from '../components/accused/AccusedFormDialog';
import AccusedFiltersBar from '../components/accused/AccusedFiltersBar';

export default function AccusedInformationPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AccusedStatus | null>(null);
  const [nameQuery, setNameQuery] = useState('');
  const [firQuery, setFirQuery] = useState('');
  const [policeStationQuery, setPoliceStationQuery] = useState('');

  const hasFilters = nameQuery || firQuery || policeStationQuery || selectedStatus;

  const { data: allRecords = [], isLoading: allLoading } = useGetAllAccusedRecords();
  const { data: searchResults = [], isLoading: searchLoading } = useSearchAccusedRecords(
    nameQuery || null,
    firQuery || null,
    policeStationQuery || null,
    selectedStatus
  );

  const displayRecords = hasFilters ? searchResults : allRecords;
  const isLoading = hasFilters ? searchLoading : allLoading;

  const jailRecords = displayRecords.filter((r) => r.status === AccusedStatus.inJail);
  const bailRecords = displayRecords.filter((r) => r.status === AccusedStatus.onBail);
  const abscondedRecords = displayRecords.filter((r) => r.status === AccusedStatus.absconded);

  const handleClearFilters = () => {
    setNameQuery('');
    setFirQuery('');
    setPoliceStationQuery('');
    setSelectedStatus(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accused Information</h1>
            <p className="text-muted-foreground">Internal accused database and records</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Accused
        </Button>
      </div>

      <AccusedFiltersBar
        nameQuery={nameQuery}
        setNameQuery={setNameQuery}
        firQuery={firQuery}
        setFirQuery={setFirQuery}
        policeStationQuery={policeStationQuery}
        setPoliceStationQuery={setPoliceStationQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onClear={handleClearFilters}
      />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({displayRecords.length})</TabsTrigger>
          <TabsTrigger value="jail">In Jail ({jailRecords.length})</TabsTrigger>
          <TabsTrigger value="bail">On Bail ({bailRecords.length})</TabsTrigger>
          <TabsTrigger value="absconded">Absconded ({abscondedRecords.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">Loading accused records...</p>
              </CardContent>
            </Card>
          ) : (
            <AccusedList records={displayRecords} />
          )}
        </TabsContent>

        <TabsContent value="jail">
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">Loading accused records...</p>
              </CardContent>
            </Card>
          ) : (
            <AccusedList records={jailRecords} />
          )}
        </TabsContent>

        <TabsContent value="bail">
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">Loading accused records...</p>
              </CardContent>
            </Card>
          ) : (
            <AccusedList records={bailRecords} />
          )}
        </TabsContent>

        <TabsContent value="absconded">
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">Loading accused records...</p>
              </CardContent>
            </Card>
          ) : (
            <AccusedList records={abscondedRecords} />
          )}
        </TabsContent>
      </Tabs>

      {showCreateForm && <AccusedFormDialog onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}
