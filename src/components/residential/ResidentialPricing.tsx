
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResidentialPricingProps {
  townName: string;
  pricingInfo?: string;
  pricingHighlightText?: string;
}

const ResidentialPricing = ({ townName, pricingInfo, pricingHighlightText }: ResidentialPricingProps) => {
  // Parse pricing info from JSON if available
  let dynamicPricing: any = null;
  try {
    if (pricingInfo) {
      dynamicPricing = JSON.parse(pricingInfo);
    }
  } catch (error) {
    // Using fallback table
  }

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="windsor-pricing">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="windsor-pricing" className="text-3xl md:text-4xl font-bold mb-6 font-poppins text-professional-dark">
            {townName} Trash Pickup Pricing
          </h2>
          <p className="text-lg text-professional-medium font-inter mb-8 max-w-xl mx-auto leading-relaxed">
            Dumpster Diverz offers reliable trash pickup in {townName} with two cart size options and optional curbside recycling. No long-term contracts, no hidden fees — just simple monthly pricing.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
            {dynamicPricing && dynamicPricing.items ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-professional-dark">{dynamicPricing.columns?.[0] || 'Service'}</TableHead>
                    <TableHead className="text-right font-semibold text-professional-dark">{dynamicPricing.columns?.[1] || 'Price'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dynamicPricing.items.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-lg font-medium text-professional-dark py-4">{item.service}</TableCell>
                      <TableCell className="text-right text-xl font-semibold text-primary py-4">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-professional-dark">Cart Type</TableHead>
                    <TableHead className="text-right font-semibold text-professional-dark">Monthly Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-lg font-medium text-professional-dark py-4">65-gallon cart</TableCell>
                    <TableCell className="text-right text-xl font-semibold text-primary py-4">$29/month</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-lg font-medium text-professional-dark py-4">96-gallon cart</TableCell>
                    <TableCell className="text-right text-xl font-semibold text-primary py-4">$33/month</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-lg font-medium text-professional-dark py-4">Recycling add-on</TableCell>
                    <TableCell className="text-right text-xl font-semibold text-primary py-4">+$10/month</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialPricing;
