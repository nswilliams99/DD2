
import { Card, CardContent } from '@/components/ui/card';

const ServicePlansTable = () => {
  return (
    <section className="py-16 bg-professional-light">
      <div className="container mx-auto px-4">
        {/* Main Container Card for Pricing Table */}
        <div className="max-w-5xl mx-auto">
          {/* Berry Pink top border for brand identity */}
          <div className="h-1 bg-gradient-to-r from-primary to-cta-accent rounded-t-xl"></div>
          
          <Card className="bg-white shadow-xl rounded-xl rounded-t-none">
            <CardContent className="py-16 px-8">
              
              {/* Table A - Pricing Plans */}
              <section aria-labelledby="pricing-title">
                <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
                  Compare Trash & Recycling Plans by Cart Size – Dumpster Diverz, Northern Colorado
                </h2>
                <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-4">
                  <div className="overflow-x-auto">
                     <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary to-cta-accent text-center text-sm sm:text-base">
                          <th className="px-6 py-4 font-semibold font-poppins text-black">Feature</th>
                          <th className="px-6 py-4 font-semibold font-poppins text-black">65-Gallon Cart</th>
                          <th className="px-6 py-4 font-semibold font-poppins text-black border-l border-white/20">96-Gallon Cart</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-sm sm:text-base">
                        <tr className="border-t shadow-sm">
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-center">Monthly Price</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">$29</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">$33</td>
                        </tr>
                        <tr className="border-t bg-gray-50">
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-center">Recycling Add-on</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">+$10/month</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">+$10/month</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-center">Online Management</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">Yes</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">Yes</td>
                        </tr>
                        <tr className="border-t bg-gray-50">
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-center">Text Notifications</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">Yes</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">Yes</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-6 py-4 font-medium text-professional-dark font-inter text-center">Contract Required</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">No</td>
                          <td className="px-6 py-4 text-professional-medium font-inter text-center">No</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-sm text-center mt-3 text-professional-medium italic font-inter">
                  Available in select towns. See service coverage below.
                </p>
              </section>

            </CardContent>
          </Card>
          
          {/* Berry Pink bottom border for brand identity */}
          <div className="h-1 bg-gradient-to-r from-primary to-cta-accent rounded-b-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicePlansTable;
