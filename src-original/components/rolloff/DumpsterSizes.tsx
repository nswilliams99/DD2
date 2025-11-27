
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRolloffSizes } from '@/hooks/useRolloffSizes';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface DumpsterSizesProps {
  townName?: string;
}

const DumpsterSizes = ({ townName }: DumpsterSizesProps) => {
  const { data: sizes, isLoading, error } = useRolloffSizes();

  const locationText = townName ? ` in ${townName}` : '';

  return (
    <section className="py-16 bg-professional-lighter" role="region" aria-labelledby="dumpster-sizes-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="dumpster-sizes-heading" className="text-3xl md:text-4xl font-bold text-professional-dark mb-4 font-poppins">
            Roll-Off Container Sizes{locationText}
          </h2>
          <p className="text-lg text-professional-medium max-w-3xl mx-auto font-inter">
            Choose the perfect size container for your project{locationText}. All containers include delivery, pickup, and disposal fees.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 mb-12">
            <p>Unable to load dumpster sizes. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {sizes?.map((size) => (
              <Card key={size.id} className="h-full border-2 border-professional-lighter shadow-lg hover:shadow-xl hover:border-diverz-purple/30 hover:scale-105 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/roll-off-dumpsters/rolloff_size_cards.webp"
                    alt={`${size.size_label} roll-off dumpster container${townName ? ` for rent in ${townName}, Colorado` : ''} - Professional waste management`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    width={400}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-diverz-purple text-white px-3 py-1 rounded-full font-semibold border-2 border-professional-lighter">
                    {size.size_label}
                  </div>
                </div>
                
                <CardHeader className="pb-3 bg-professional-lighter/50">
                  <CardTitle className="text-xl font-bold text-professional-dark font-poppins">
                    {size.size_label} Dumpster
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 bg-white flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="font-semibold text-professional-dark">Capacity:</span>
                      <p className="text-professional-medium">{size.cubic_yards} cubic yards</p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-professional-dark">Description:</span>
                      <p className="text-professional-medium">{size.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      asChild
                      className="w-full bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold"
                    >
                      <a href="/contact">
                        Order Here
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    
                    <Button 
                      asChild
                      variant="outline"
                      className="w-full border-2 border-diverz-purple text-diverz-purple hover:bg-diverz-purple hover:text-white font-semibold"
                    >
                      <a href="tel:970-888-7274" aria-label={`Call 970-888-7274 for ${size.size_label} dumpster pricing and availability`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call for Pricing
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Centralized CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border-2 border-professional-lighter">
            <h3 className="text-2xl font-bold text-professional-dark mb-4 font-poppins">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-professional-medium mb-6 font-inter">
              Get an instant quote or speak with our team to find the perfect container size for your project{locationText}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold border border-professional-lighter/30 px-8 py-3"
                asChild
              >
                <a href="/contact" aria-label={`Get instant quote for roll-off dumpster${townName ? ` in ${townName}` : ''}`}>
                  <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Instant Quote
                </a>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-diverz-purple text-diverz-purple hover:bg-diverz-purple hover:text-white font-semibold px-8 py-3"
                asChild
              >
                <a href="tel:970-888-7274" aria-label={`Call 970-888-7274 for free consultation on dumpster size selection${townName ? ` in ${townName}` : ''}`}>
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get Free Size Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DumpsterSizes;
