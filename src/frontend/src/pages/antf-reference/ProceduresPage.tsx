import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ClipboardList } from 'lucide-react';

export default function ProceduresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procedures</h1>
          <p className="text-muted-foreground">Standard operating procedures for ANTF operations</p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search and Seizure Procedure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Pre-Search Requirements</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Obtain proper authorization under Section 42 or Section 43 of NDPS Act</li>
                  <li>Ensure at least two independent witnesses (Panchas) are present</li>
                  <li>Inform the person about their right under Section 50 (search before Magistrate/Gazetted Officer)</li>
                  <li>Prepare search warrant or authorization letter</li>
                  <li>Arrange for female officer if female suspect is to be searched</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">During Search</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Conduct search in presence of Panchas and the accused (if present)</li>
                  <li>Videograph the entire search proceedings if possible</li>
                  <li>Prepare detailed Panchanama documenting all items found</li>
                  <li>Seize contraband and related materials with proper documentation</li>
                  <li>Take photographs of seized items and the scene</li>
                  <li>Seal samples properly with signatures of Panchas and accused</li>
                  <li>Maintain chain of custody for all seized items</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Post-Search Documentation</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Complete Panchanama with all signatures</li>
                  <li>Prepare seizure memo listing all items seized</li>
                  <li>Send samples to FSL for chemical analysis within 72 hours</li>
                  <li>Deposit bulk contraband in Malkhana with proper documentation</li>
                  <li>File FIR immediately after seizure</li>
                  <li>Inform superior officers and prepare preliminary report</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Arrest Procedure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Arrest Guidelines</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Inform the person being arrested of grounds for arrest</li>
                  <li>Inform about their right to bail (if applicable)</li>
                  <li>Conduct personal search in presence of Panchas</li>
                  <li>Prepare arrest memo with time, date, and place of arrest</li>
                  <li>Inform family member or friend about the arrest</li>
                  <li>Conduct medical examination within 24 hours</li>
                  <li>Produce before Magistrate within 24 hours of arrest</li>
                  <li>Record statement under Section 67 of NDPS Act if required</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Rights of Arrested Person</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Right to be informed of grounds of arrest</li>
                  <li>Right to consult and be defended by a legal practitioner</li>
                  <li>Right to be produced before Magistrate within 24 hours</li>
                  <li>Right to medical examination</li>
                  <li>Right to inform family member or friend</li>
                  <li>Right against self-incrimination</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investigation Procedure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Investigation Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Register FIR immediately after seizure/arrest</li>
                  <li>Send samples to FSL for chemical analysis</li>
                  <li>Record statements of witnesses under Section 161 CrPC</li>
                  <li>Conduct further investigation to identify source and network</li>
                  <li>Collect call detail records (CDR) and digital evidence</li>
                  <li>Trace financial transactions if money laundering is suspected</li>
                  <li>Coordinate with other agencies (NCB, DRI, Customs) if required</li>
                  <li>Prepare case diary documenting daily investigation progress</li>
                  <li>Complete investigation within statutory time limits</li>
                  <li>File charge sheet under Section 173 CrPC</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evidence Collection and Preservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Evidence Handling</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Maintain strict chain of custody for all evidence</li>
                  <li>Use tamper-proof seals for samples and exhibits</li>
                  <li>Store evidence in secure Malkhana with proper documentation</li>
                  <li>Maintain register of all seized items</li>
                  <li>Preserve digital evidence (photos, videos, CDRs) properly</li>
                  <li>Ensure FSL reports are obtained and filed with charge sheet</li>
                  <li>Prepare exhibit list for court proceedings</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Essential Documents</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>FIR copy</li>
                  <li>Panchanama (search and seizure)</li>
                  <li>Arrest memo</li>
                  <li>Medical examination report</li>
                  <li>FSL report</li>
                  <li>Statements of witnesses (161 CrPC)</li>
                  <li>Statement of accused (if recorded under Section 67)</li>
                  <li>Photographs and videography</li>
                  <li>Seizure memo and sample sealing memo</li>
                  <li>Case diary</li>
                  <li>Charge sheet</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
