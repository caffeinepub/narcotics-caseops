import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Scale, Microscope, Users } from 'lucide-react';

export default function AntfStructurePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ANTF Structure</h1>
        <p className="mt-2 text-muted-foreground">
          Anti-Narcotics Task Force (Ops) organizational structure and jurisdiction
        </p>
      </div>

      <Separator />

      {/* ANTF Hierarchy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Structure of the Anti-Narcotics Task Force (Ops)</CardTitle>
          </div>
          <CardDescription>Organizational hierarchy and command structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              The Anti-Narcotics Task Force (Ops) is headed by a <strong>Special Inspector General of Police</strong>.
              The headquarters of the said Task Force is at Pune. Under his command, a post of{' '}
              <strong>Deputy Inspector General of Police</strong> is working at the headquarters.
            </p>
            <p>
              Under the command of the Deputy Inspector General of Police, there are{' '}
              <strong>Superintendent of Police, (Ops) Pune Unit</strong> and{' '}
              <strong>Superintendent of Police, (Ops) Nagpur Unit</strong>. Each territory unit is working under the
              leadership of a Superintendent of Police (Ops).
            </p>
            <p>
              The <strong>Additional Superintendent of Police (Ops)</strong> and{' '}
              <strong>Deputy Superintendent of Police (Ops)</strong> Kolhapur, Konkan and Nashik are working under the
              Superintendent of Police (Ops) Pune territory Unit.
            </p>
            <p>
              The <strong>Additional Superintendent of Police (Ops)</strong> and{' '}
              <strong>Deputy Superintendent of Police (Ops)</strong> Nagpur, Amravati, Nanded and Chhatrapati Sambhaji
              Nagar (Ops) are working under the Superintendent of Police (Ops) Nagpur territory Unit.
            </p>
            <p>
              Under the Pune ANTF unit and Nagpur ANTF unit, officers of the rank of{' '}
              <strong>Deputy Superintendent of Police (Ops)</strong> are working in their respective range districts:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Konkan Division - Thane</li>
              <li>Kolhapur Division - Pune</li>
              <li>Nashik Division - Nashik</li>
              <li>Nagpur Division - Nagpur</li>
              <li>Amravati Division - Amravati</li>
              <li>Chhatrapati Sambhaji Nagar Division - Chhatrapati Sambhaji Nagar</li>
              <li>Nanded Division - Nanded</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Appendix A - Jurisdictions */}
      <Card>
        <CardHeader>
          <CardTitle>Appendix "A" - Range Dy.SP (Ops) Jurisdiction</CardTitle>
          <CardDescription>Territorial divisions and district assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pune ANTF Territory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Pune ANTF Territory</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">1. Konkan Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Thane rural</li>
                    <li>• Palghar</li>
                    <li>• Ratnagiri</li>
                    <li>• Sindhudurg</li>
                    <li>• Thane Police Commissionerate</li>
                    <li>• Navi Mumbai Police Commissionerate</li>
                    <li>• Mira-Bhaindar-Wasai-Virar Police Commissionerate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">2. Kolhapur Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Kolhapur</li>
                    <li>• Satara</li>
                    <li>• Sangli</li>
                    <li>• Solapur rural</li>
                    <li>• Pune rural</li>
                    <li>• Pune Police Commissionerate</li>
                    <li>• Pimpri Chinchwad Police Commissionerate</li>
                    <li>• Solapur Police Commissionerate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">3. Nashik Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Nashik rural</li>
                    <li>• Dhule</li>
                    <li>• Jalgaon</li>
                    <li>• Ahmadnagar</li>
                    <li>• Nandurbar</li>
                    <li>• Nashik Police Commissionerate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nagpur ANTF Territory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Nagpur ANTF Territory</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">1. Amravati Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Amravati rural</li>
                    <li>• Yawatmal</li>
                    <li>• Buldhana</li>
                    <li>• Akola</li>
                    <li>• Washim</li>
                    <li>• Amravati Police Commissionerate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">2. Chhatrapati Sambhaji Nagar Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Chhatrapati Sambhaji Nagar rural</li>
                    <li>• Jalna</li>
                    <li>• Beed</li>
                    <li>• Osmanabad</li>
                    <li>• Chhatrapati Sambhaji Nagar Police Commissionerate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">3. Nanded Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Nanded</li>
                    <li>• Latur</li>
                    <li>• Parbhani</li>
                    <li>• Hingoli</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">4. Nagpur / Gadchiroli Division - Dy.SP (Ops)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                    <li>• Nagpur rural</li>
                    <li>• Wardha</li>
                    <li>• Bhandara</li>
                    <li>• Chandrapur</li>
                    <li>• Gadchiroli</li>
                    <li>• Aheri</li>
                    <li>• Gondia</li>
                    <li>• Nagpur Police Commissionerate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Advisor */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <CardTitle>Legal Advisor</CardTitle>
          </div>
          <CardDescription>Legal support and advisory services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              There will be one <strong>Legal Advisor</strong> under the control of the Superintendent of Police (Ops),
              who will provide legal assistance to the Investigating Officer and the Supervisory Officer in all matters
              of investigation and inquiry. This number may be increased in future depending on the scope of work.
            </p>
            <p className="font-medium mt-4 mb-2">Responsibilities:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                They will correctly interpret laws and regulations and, if necessary, draft amendments to them for the
                benefit of the investigating officers.
              </li>
              <li>
                They will provide sound legal advice in departmental matters as well as in proceedings before various
                courts and administrative tribunals.
              </li>
              <li>They will assist all officers of the ANTF (Ops) in legal matters.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Forensic Expert */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-primary" />
            <CardTitle>Forensic Expert</CardTitle>
          </div>
          <CardDescription>Scientific and forensic investigation support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              There will be one <strong>Forensic Expert</strong> under the control of the Superintendent of Police
              (Ops). He will assist the Investigating Officer and the Supervisory Officer in the investigation of NDPS
              crimes. This number may be increased in future depending on the scope of work.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Officer Strength */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Officer Strength</CardTitle>
          </div>
          <CardDescription>Personnel composition per division</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              Each <strong>Deputy Superintendent of Police (Ops) Division</strong> has a total of{' '}
              <strong>31 officers and officials</strong>, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>01 Deputy Superintendent of Police</li>
              <li>02 Police Inspectors</li>
              <li>02 Assistant Police Inspectors</li>
              <li>02 Police Sub-Inspectors</li>
              <li>24 officials (supporting staff)</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              The list of districts falling under Pune and Nagpur sub-categories is as per Appendix "A" above.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
