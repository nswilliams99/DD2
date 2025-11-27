
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HOASection = () => {
  return (
    <section 
      className="py-12 md:py-16 bg-dark-neutral" 
      aria-labelledby="hoa-services-heading"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="hoa-services-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white font-poppins">
            HOA Waste Services
          </h2>
          <p className="text-base md:text-lg text-white/80 font-inter leading-relaxed mb-8 max-w-2xl">
            Live in a neighborhood with an HOA? Dumpster Diverz provides full-service trash pickup for HOA communities across Northern Colorado — including bulk disposal, gated access, and same-day support.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white font-semibold font-inter shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-neutral h-12 lg:h-14 px-8 py-3 text-base lg:text-lg"
            asChild
          >
            <Link href="/hoa-services" 
              aria-label="Explore HOA Services - Learn about community waste management solutions"
            >
              Explore HOA Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HOASection;
