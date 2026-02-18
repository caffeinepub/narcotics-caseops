import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, Plus } from 'lucide-react';
import { AccusedDatabase, AccusedStatus } from '../../backend';
import AccusedAttachmentUploadDialog from './AccusedAttachmentUploadDialog';

interface AccusedInvestigationRecordsProps {
  accused: AccusedDatabase;
  onClose: () => void;
}

const statusLabels: Record<AccusedStatus, string> = {
  [AccusedStatus.inJail]: 'In Jail',
  [AccusedStatus.onBail]: 'On Bail',
  [AccusedStatus.absconded]: 'Absconded',
};

export default function AccusedInvestigationRecords({ accused, onClose }: AccusedInvestigationRecordsProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Accused Details & Investigation Records</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-100px)]">
            <div className="space-y-6 pr-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accused Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium">Name:</span>
                      <p className="text-sm text-muted-foreground">{accused.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Status:</span>
                      <div className="mt-1">
                        <Badge>{statusLabels[accused.status]}</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm font-medium">FIR Details:</span>
                    <p className="text-sm text-muted-foreground mt-1">{accused.firDetails}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Police Station:</span>
                    <p className="text-sm text-muted-foreground mt-1">{accused.policeStation}</p>
                  </div>

                  {accused.seizureDetails && (
                    <div>
                      <span className="text-sm font-medium">Seizure Details:</span>
                      <p className="text-sm text-muted-foreground mt-1">{accused.seizureDetails}</p>
                    </div>
                  )}

                  {accused.ndpsQuantity && (
                    <div>
                      <span className="text-sm font-medium">NDPS Quantity:</span>
                      <p className="text-sm text-muted-foreground mt-1">{accused.ndpsQuantity}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Investigation Records</CardTitle>
                    <Button size="sm" onClick={() => setShowUploadDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {accused.investigationRecords.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-sm text-muted-foreground">No investigation records yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setShowUploadDialog(true)}
                      >
                        Add First Record
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {accused.investigationRecords.map((record) => (
                        <div
                          key={record.id.toString()}
                          className="border border-border rounded-lg p-4 space-y-3"
                        >
                          <div>
                            <h4 className="font-semibold">{record.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Created: {record.createdAt}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground">{record.description}</p>

                          {record.attachments.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Attachments:</p>
                              <div className="space-y-2">
                                {record.attachments.map((attachment, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between bg-muted p-2 rounded"
                                  >
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">Attachment {idx + 1}</span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => window.open(attachment.getDirectURL(), '_blank')}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {showUploadDialog && (
        <AccusedAttachmentUploadDialog
          accusedId={accused.id}
          onClose={() => setShowUploadDialog(false)}
        />
      )}
    </>
  );
}
