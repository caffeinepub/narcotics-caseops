import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pill } from 'lucide-react';

export default function NdpsSubstancesQuantityPage() {
  const substances = [
    {
      name: 'Heroin',
      smallQuantity: '5 grams',
      commercialQuantity: '250 grams',
    },
    {
      name: 'Cocaine',
      smallQuantity: '2 grams',
      commercialQuantity: '100 grams',
    },
    {
      name: 'Morphine',
      smallQuantity: '5 grams',
      commercialQuantity: '250 grams',
    },
    {
      name: 'Opium',
      smallQuantity: '25 grams',
      commercialQuantity: '2.5 kg',
    },
    {
      name: 'Charas (Hashish)',
      smallQuantity: '100 grams',
      commercialQuantity: '1 kg',
    },
    {
      name: 'Ganja (Cannabis)',
      smallQuantity: '1 kg',
      commercialQuantity: '20 kg',
    },
    {
      name: 'Methamphetamine',
      smallQuantity: '2 grams',
      commercialQuantity: '50 grams',
    },
    {
      name: 'MDMA (Ecstasy)',
      smallQuantity: '0.5 grams',
      commercialQuantity: '10 grams',
    },
    {
      name: 'LSD',
      smallQuantity: '0.1 grams',
      commercialQuantity: '1 gram',
    },
    {
      name: 'Amphetamine',
      smallQuantity: '2 grams',
      commercialQuantity: '50 grams',
    },
    {
      name: 'Mephedrone',
      smallQuantity: '5 grams',
      commercialQuantity: '50 grams',
    },
    {
      name: 'Ketamine',
      smallQuantity: '2 grams',
      commercialQuantity: '125 grams',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Pill className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NDPS Substances & Quantity</h1>
          <p className="text-muted-foreground">Small and commercial quantity classification</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quantity Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Small Quantity</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Punishment: Up to 1 year imprisonment or fine up to ₹10,000, or both
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Intermediate Quantity</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                More than small but less than commercial. Punishment: Up to 10 years imprisonment and fine up to ₹1,00,000
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Commercial Quantity</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Punishment: 10-20 years imprisonment and fine ₹1,00,000 to ₹2,00,000
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NDPS Substances Quantity Table</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Substance Name</TableHead>
                  <TableHead className="w-[30%]">Small Quantity</TableHead>
                  <TableHead className="w-[30%]">Commercial Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {substances.map((substance, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{substance.name}</TableCell>
                    <TableCell>{substance.smallQuantity}</TableCell>
                    <TableCell>{substance.commercialQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note 1:</strong> The quantities mentioned are as per the NDPS Act and its amendments. Always refer
              to the latest notification for any updates.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note 2:</strong> For mixtures containing narcotic drugs or psychotropic substances, the quantity
              of the pure drug is considered for classification.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note 3:</strong> Intermediate quantity refers to any quantity more than small quantity but less
              than commercial quantity.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note 4:</strong> FSL report is essential to determine the exact quantity and nature of the seized
              substance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
