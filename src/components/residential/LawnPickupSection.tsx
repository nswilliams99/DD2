import { Button } from '@/components/ui/button';
import { Leaf, Calendar, DollarSign, MapPin } from 'lucide-react';

const LawnPickupSection = () => {
  return (
    <section className="py-16 bg-soft-neutral">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-professional-dark font-poppins mb-4">
            Seasonal Lawn &amp; Grass Pickup
          </h2>
          <p className="text-lg text-professional-medium font-inter max-w-2xl mx-auto">
            Keep your yard clean with our convenient seasonal lawn and grass clipping pickup service. 
            Perfect for maintaining a beautiful landscape throughout the growing season.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-professional-dark font-poppins mb-1">What&apos;s Included</h3>
                <p className="text-professional-medium font-inter">
                  One dedicated 64-gallon can for lawn clippings and grass with weekly pickup service
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-professional-dark font-poppins mb-1">Seasonal Service</h3>
                <p className="text-professional-medium font-inter">
                  Available May 1st through end of October during peak growing season
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-professional-dark font-poppins mb-1">Service Areas</h3>
                <p className="text-professional-medium font-inter">
                  Fort Collins, Loveland, Windsor, Greeley, Wellington and surrounding areas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-8 h-8 text-primary" />
                <span className="text-4xl font-bold text-professional-dark font-poppins">$20</span>
                <span className="text-xl text-professional-medium">/month</span>
              </div>
              <p className="text-professional-medium font-inter">May through October</p>
            </div>
            
            <p className="text-professional-medium font-inter mb-6">
              Simple monthly billing through our secure TrashJoes system. No contracts, cancel anytime.
            </p>

            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold" asChild>
              <a href="https://app.trashjoes.com/h/dumpster-diverz" target="_blank" rel="noopener noreferrer">
                Order Lawn Pickup Online
              </a>
            </Button>
            
            <p className="text-sm text-professional-medium mt-4">Secure billing through TrashJoes integration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawnPickupSection;
