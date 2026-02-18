import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Layers } from 'lucide-react';

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
          <p className="text-muted-foreground">Operational modules and workflows</p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intelligence Gathering Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Collect actionable intelligence on drug trafficking networks</li>
                  <li>Identify key players, suppliers, and distribution channels</li>
                  <li>Monitor suspicious activities and locations</li>
                  <li>Coordinate with informants and other agencies</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Develop and maintain network of informants</li>
                  <li>Conduct surveillance operations on suspects</li>
                  <li>Analyze call detail records and digital footprints</li>
                  <li>Share intelligence with NCB, DRI, and other agencies</li>
                  <li>Prepare intelligence reports for operational planning</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enforcement and Interdiction Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Execute search and seizure operations</li>
                  <li>Arrest drug traffickers and dealers</li>
                  <li>Intercept drug consignments in transit</li>
                  <li>Dismantle drug trafficking networks</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Plan and execute raids based on intelligence inputs</li>
                  <li>Conduct vehicle checks and nakabandi operations</li>
                  <li>Search premises, vehicles, and persons as per NDPS Act</li>
                  <li>Seize contraband and related materials</li>
                  <li>Arrest accused persons and produce before court</li>
                  <li>Coordinate with local police for operational support</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investigation Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Conduct thorough investigation of NDPS cases</li>
                  <li>Identify entire drug trafficking network</li>
                  <li>Collect evidence for successful prosecution</li>
                  <li>Trace financial transactions and money laundering</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Register FIR and initiate investigation</li>
                  <li>Send samples to FSL for chemical analysis</li>
                  <li>Record statements of witnesses and accused</li>
                  <li>Collect digital evidence (CDRs, emails, social media)</li>
                  <li>Trace financial transactions and bank accounts</li>
                  <li>Identify and arrest co-accused and associates</li>
                  <li>Prepare comprehensive case diary</li>
                  <li>File charge sheet within statutory time limits</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prosecution and Court Coordination Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Ensure effective prosecution of NDPS cases</li>
                  <li>Coordinate with Public Prosecutor</li>
                  <li>Present evidence and witnesses in court</li>
                  <li>Secure convictions and appropriate punishment</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>File comprehensive charge sheet with all evidence</li>
                  <li>Brief Public Prosecutor on case details</li>
                  <li>Ensure witnesses appear in court for testimony</li>
                  <li>Produce exhibits and FSL reports in court</li>
                  <li>Assist prosecutor during trial proceedings</li>
                  <li>Monitor case progress and court dates</li>
                  <li>Appeal against acquittals if required</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prevention and Awareness Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Create awareness about drug abuse and its consequences</li>
                  <li>Prevent drug abuse among youth and vulnerable groups</li>
                  <li>Engage with community and educational institutions</li>
                  <li>Promote rehabilitation of drug addicts</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Conduct awareness programs in schools and colleges</li>
                  <li>Organize community outreach programs</li>
                  <li>Distribute educational materials on drug abuse</li>
                  <li>Coordinate with NGOs for rehabilitation programs</li>
                  <li>Celebrate International Day Against Drug Abuse (June 26)</li>
                  <li>Engage with media for awareness campaigns</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training and Capacity Building Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Enhance skills and knowledge of ANTF personnel</li>
                  <li>Keep officers updated on latest trends and techniques</li>
                  <li>Improve investigation and enforcement capabilities</li>
                  <li>Foster inter-agency cooperation</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Conduct regular training programs for officers</li>
                  <li>Organize workshops on NDPS Act and procedures</li>
                  <li>Arrange specialized training on digital forensics</li>
                  <li>Facilitate training at NCB and other national agencies</li>
                  <li>Conduct mock drills and scenario-based exercises</li>
                  <li>Share best practices and case studies</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
