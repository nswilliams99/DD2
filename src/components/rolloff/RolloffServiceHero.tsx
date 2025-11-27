
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Truck, ArrowRight } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const RolloffServiceHero = () => {
  const { section: heroSection, isLoading } = usePageSection('roll-off', 'hero');

  return (
    <section className="relative bg-gradient-to-br from-professional-dark via-professional-medium to-diverz-purple text-white py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-diverz-purple/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-diverz-purple text-white font-inter border-2 border-white/30">
                <Truck className="w-4 h-4 mr-2" />
                Roll-Off Dumpsters
              </Badge>
              
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200/20 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200/20 rounded"></div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl lg:text-5xl font-bold leading-tight font-poppins">
                    {heroSection?.title || "Roll-Off Dumpster Rentals: 12, 15, 20 & 30 Yard Sizes Available"}
                  </h1>
                  
                  <h2 className="text-xl lg:text-2xl text-gray-200 font-medium font-inter">
                    {heroSection?.description || "Perfect for residential cleanouts, remodeling projects, and construction debris removal."}
                  </h2>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold font-inter border-2 border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-diverz-purple/30 hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <a href="tel:970-888-7274" aria-label="Call 970-888-7274 for roll-off dumpster rental">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Call 970-888-7274
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-professional-dark font-semibold font-inter shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <a href="/contact" aria-label="Get instant quote for roll-off dumpster">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  Get Instant Quote
                </a>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-diverz-purple">4 Sizes</div>
                <div className="text-sm text-gray-300">12-30 Yards</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-diverz-purple">Same-Day</div>
                <div className="text-sm text-gray-300">Delivery</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg col-span-2 lg:col-span-1">
                <div className="text-2xl font-bold text-diverz-purple">Local</div>
                <div className="text-sm text-gray-300">Service</div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-square lg:aspect-video bg-gradient-to-br from-diverz-purple/20 to-diverz-magenta/20 rounded-2xl flex items-center justify-center overflow-hidden">
              <OptimizedImage
                src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/roll-off-dumpsters/rolloff_hero_img.webp"
                alt="Professional roll-off dumpster rental service for construction projects in Northern Colorado"
                className="w-full h-full object-cover rounded-2xl"
                priority={true}
                width={512}
                height={384}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 512px"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-white text-black p-6 rounded-xl shadow-xl hidden md:block border">
              <div className="text-3xl font-bold font-poppins text-diverz-purple">Professional Service</div>
              <div className="text-sm font-medium text-gray-700">Construction & project experts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolloffServiceHero;
