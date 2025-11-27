
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Building, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const CommercialHero = () => {
  const { section } = usePageSection('commercial', 'hero');
  return (
    <section className="relative bg-gradient-to-br from-professional-dark via-professional-medium to-diverz-purple text-white py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-diverz-purple/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12">
          {/* Text Content */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-4">
              <Badge className="bg-diverz-purple text-white font-inter border-2 border-white/30">
                <Building className="w-4 h-4 mr-2" />
                Commercial Service
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-poppins">
                {section?.title || "Commercial Dumpster Service"}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-200 font-medium">
                {section?.description || "Flexible commercial dumpster rental for businesses throughout Windsor, Fort Collins, Wellington and Northern Colorado."}
              </p>
            </div>

            {/* CTA Buttons - Standardized with homepage */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold font-inter border-2 border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-diverz-purple/30 hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <a href="tel:970-888-7274" aria-label="Call 970-888-7274 for commercial dumpster service">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Call Now
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white hover:shadow-2xl hover:shadow-white/20 font-semibold font-inter transition-all duration-300 hover:-translate-y-1 group h-12 lg:h-14 shadow-lg px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <Link href="/pay-my-bill" aria-label="Go to Dumpster Diverz billing instructions page">
                  <CreditCard className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Pay My Bill
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white/95 backdrop-blur-sm border-2 border-white text-professional-medium hover:bg-white hover:text-professional-dark hover:shadow-2xl hover:shadow-white/30 font-semibold font-inter transition-all duration-300 hover:-translate-y-1 group h-12 lg:h-14 shadow-lg px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <Link href="/contact" aria-label="Get commercial dumpster service quote">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Get Commercial Quote
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-diverz-purple">2-3</div>
                <div className="text-sm text-gray-300">Yard Sizes</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-diverz-purple">Flexible</div>
                <div className="text-sm text-gray-300">Pickup</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg col-span-2 lg:col-span-1">
                <div className="text-2xl font-bold text-diverz-purple">No</div>
                <div className="text-sm text-gray-300">Contracts</div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial/comm_hero_img.webp"
                alt="Dumpster Diverz pink 2-yard commercial dumpster with company branding and phone number 970-888-7274 for small business waste management in Windsor, Fort Collins, and Wellington Colorado"
                className="w-full h-auto object-contain"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-white text-black p-6 rounded-xl shadow-xl hidden md:block border">
              <div className="text-3xl font-bold font-poppins text-diverz-purple">Business Service</div>
              <div className="text-sm font-medium text-gray-700">Reliable commercial solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialHero;
