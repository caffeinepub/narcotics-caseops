import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, Edit } from 'lucide-react';
import { AccusedDatabase, AccusedStatus } from '../../backend';
import AccusedFormDialog from './AccusedFormDialog';
import AccusedInvestigationRecords from './AccusedInvestigationRecords';

interface AccusedListProps {
  records: AccusedDatabase[];
}

const statusColors: Record<AccusedStatus, string> = {
  [AccusedStatus.inJail]: 'destructive',
  [AccusedStatus.onBail]: 'default',
  [AccusedStatus.absconded]: 'outline',
};

const statusLabels: Record<AccusedStatus, string> = {
  [AccusedStatus.inJail]: 'In Jail',
  [AccusedStatus.onBail]: 'On Bail',
  [AccusedStatus.absconded]: 'Absconded',
};

export default function AccusedList({ records }: AccusedListProps) {
  const [selectedAccused, setSelectedAccused] = useState<AccusedDatabase | null>(null);
  const [editingAccused, setEditingAccused] = useState<AccusedDatabase | null>(null);

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">No accused records found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <Card key={record.id.toString()} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{record.name}</h3>
                  <Badge variant={statusColors[record.status] as any} className="mt-1">
                    {statusLabels[record.status]}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditingAccused(record)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">FIR:</span>
                  <p className="text-muted-foreground">{record.firDetails}</p>
                </div>
                <div>
                  <span className="font-medium">Police Station:</span>
                  <p className="text-muted-foreground">{record.policeStation}</p>
                </div>
                <div>
                  <span className="font-medium">NDPS Quantity:</span>
                  <p className="text-muted-foreground">{record.ndpsQuantity}</p>
                </div>
                {record.investigationRecords.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{record.investigationRecords.length} investigation record(s)</span>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedAccused(record)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAccused && (
        <AccusedInvestigationRecords
          accused={selectedAccused}
          onClose={() => setSelectedAccused(null)}
        />
      )}

      {editingAccused && (
        <AccusedFormDialog
          accused={editingAccused}
          onClose={() => setEditingAccused(null)}
        />
      )}
    </>
  );
}
