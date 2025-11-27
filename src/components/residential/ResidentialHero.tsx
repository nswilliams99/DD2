
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import type { PageSection } from '@/hooks/usePageSections';

interface ResidentialHeroProps {
  section?: PageSection | null;
  heroImageUrl?: string;
}

const ResidentialHero = ({ section, heroImageUrl }: ResidentialHeroProps) => {
  const defaultImageUrl = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/residential/resi_heroimg.webp";
  const finalImageUrl = heroImageUrl || defaultImageUrl;
  
  const heroTitle = section?.title || "Residential Trash Pickup in Windsor & Fort Collins";
  const heroDescription = section?.description || "Weekly residential trash and recycling services across Windsor, Fort Collins, and Northern Colorado. Choose from 64 or 96-gallon carts with no long-term contracts.";

  return (
    <section 
      className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden"
      aria-labelledby="residential-hero-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl relative z-10">
        <div 
          className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center"
          style={{ gridTemplateColumns: '2fr 3fr' }}
        >
          <div className="animate-fade-in">
            <h1 id="residential-hero-heading" className="text-4xl lg:text-6xl font-bold leading-tight font-poppins mb-6 text-white">
              {heroTitle}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-medium font-inter leading-relaxed mb-8 max-w-2xl">
              {heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 lg:gap-4 justify-center sm:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 font-semibold font-inter shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg group"
                asChild
              >
                <a href="tel:970-888-7274" aria-label="Call Dumpster Diverz at 970-888-7274">
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  Call 970-888-7274
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/95 backdrop-blur-sm border-2 border-white/50 text-professional-dark hover:bg-white hover:text-primary font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg group"
                asChild
              >
                <a href="https://app.trashjoes.com/h/dumpster-diverz" aria-label="Order Online – Dumpster Diverz Service Request">
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  Order Online
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/95 backdrop-blur-sm border-2 border-white/50 text-professional-dark hover:bg-white hover:text-primary font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg group"
                asChild
              >
                <Link href="/about#holiday-schedule" aria-label="View Holiday Service Schedule">
                  <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Holiday Schedule
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="relative p-2 lg:p-3">
              <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src={finalImageUrl}
                  alt="Dumpster Diverz employee providing residential trash service with truck in neighborhood setting"
                  className="w-full h-auto"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 800px"
                  priority
                  objectFit="contain"
                />
              </div>
              {/* Trust badge overlay */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-poppins">5★</div>
                  <div className="text-sm text-professional-medium font-inter">Rated Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialHero;
