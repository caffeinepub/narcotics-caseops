import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Scale } from 'lucide-react';

export default function LawsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Scale className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laws</h1>
          <p className="text-muted-foreground">NDPS Act and related legal provisions</p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Narcotic Drugs and Psychotropic Substances Act, 1985</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  The NDPS Act is the primary legislation for the control and regulation of operations relating to
                  narcotic drugs and psychotropic substances in India. It consolidates and amends the law relating to
                  narcotic drugs, makes stringent provisions for the control and regulation of operations relating to
                  narcotic drugs and psychotropic substances.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Key Sections</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Section 8 - Prohibition of certain operations</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      No person shall cultivate any cannabis plant or gather any portion of coca plant or cannabis
                      plant or produce, manufacture, possess, sell, purchase, transport, warehouse, use, consume,
                      import inter-State, export inter-State, import into India, export from India or tranship any
                      narcotic drug or psychotropic substance.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Section 15 - Punishment for contravention</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Whoever contravenes any provision of section 8 or section 9 or section 10 or section 11 or
                      section 12 or section 13 or section 14 shall be punishable with rigorous imprisonment and fine
                      as per the quantity involved (small, commercial, or intermediate).
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Section 20 - Power of entry, search, seizure and arrest</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Any officer authorized under section 42 may enter into and search any building, conveyance or
                      place and seize any narcotic drug or psychotropic substance found therein and may detain and
                      search any person found in such building, conveyance or place.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Section 37 - Offences to be cognizable and non-bailable</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Notwithstanding anything contained in the Code of Criminal Procedure, 1973, every offence
                      punishable under this Act shall be cognizable and non-bailable.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Section 50 - Conditions under which search of persons shall be conducted</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      When any officer is about to search any person, he shall inform such person of his right to be
                      searched before a Gazetted Officer or a Magistrate. If such person requires to be taken before a
                      Gazetted Officer or a Magistrate, the officer shall take him without unnecessary delay.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Punishment Based on Quantity</h3>
                <div className="space-y-3">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Small Quantity</h4>
                    <p className="text-sm text-muted-foreground">
                      Rigorous imprisonment up to 1 year, or fine up to ₹10,000, or both
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Intermediate Quantity (More than small but less than commercial)</h4>
                    <p className="text-sm text-muted-foreground">
                      Rigorous imprisonment up to 10 years and fine up to ₹1,00,000
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Commercial Quantity</h4>
                    <p className="text-sm text-muted-foreground">
                      Rigorous imprisonment not less than 10 years (may extend to 20 years) and fine not less than
                      ₹1,00,000 (may extend to ₹2,00,000)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Legal Provisions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-medium">Code of Criminal Procedure (CrPC), 1973</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sections 41, 41A, 154, 157, 160, 161, 164, 165, 167, 173 - Relevant for arrest, investigation,
                  recording statements, and filing charge sheets.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-medium">Indian Evidence Act, 1872</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sections 25, 26, 27 - Admissibility of confessions and statements; discovery of facts.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-medium">Prevention of Money Laundering Act (PMLA), 2002</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Applicable when proceeds of drug trafficking are involved in money laundering activities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
