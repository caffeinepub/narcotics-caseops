import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { AccusedStatus } from '../../backend';

interface AccusedFiltersBarProps {
  nameQuery: string;
  setNameQuery: (value: string) => void;
  firQuery: string;
  setFirQuery: (value: string) => void;
  policeStationQuery: string;
  setPoliceStationQuery: (value: string) => void;
  selectedStatus: AccusedStatus | null;
  setSelectedStatus: (value: AccusedStatus | null) => void;
  onClear: () => void;
}

export default function AccusedFiltersBar({
  nameQuery,
  setNameQuery,
  firQuery,
  setFirQuery,
  policeStationQuery,
  setPoliceStationQuery,
  selectedStatus,
  setSelectedStatus,
  onClear,
}: AccusedFiltersBarProps) {
  const hasFilters = nameQuery || firQuery || policeStationQuery || selectedStatus;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Search & Filter</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Input
            placeholder="Search by name..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
          <Input
            placeholder="Search by FIR..."
            value={firQuery}
            onChange={(e) => setFirQuery(e.target.value)}
          />
          <Input
            placeholder="Search by police station..."
            value={policeStationQuery}
            onChange={(e) => setPoliceStationQuery(e.target.value)}
          />
          <Select
            value={selectedStatus || 'all'}
            onValueChange={(value) => setSelectedStatus(value === 'all' ? null : (value as AccusedStatus))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={AccusedStatus.inJail}>In Jail</SelectItem>
              <SelectItem value={AccusedStatus.onBail}>On Bail</SelectItem>
              <SelectItem value={AccusedStatus.absconded}>Absconded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {hasFilters && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={onClear}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
