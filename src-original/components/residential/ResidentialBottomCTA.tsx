
import { Button } from '@/components/ui/button';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PageSection } from '@/hooks/usePageSections';

interface ResidentialBottomCTAProps {
  section?: PageSection | null;
}

const ResidentialBottomCTA = ({ section }: ResidentialBottomCTAProps) => {
  return (
    <section 
      className="py-16 bg-gradient-to-br from-primary to-cta-accent relative overflow-hidden"
      aria-labelledby="residential-cta-heading"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 id="residential-cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
            {section?.title || "Ready to Get Started?"}
          </h2>
          <p className="text-xl text-white/90 mb-8 font-inter">
            {section?.description || "Sign up today and enjoy reliable waste management for your home"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary group border border-white"
              asChild
            >
              <a 
                href="tel:970-888-7274" 
                aria-label="Call Dumpster Diverz at 970-888-7274"
                data-analytics-event="click-to-call"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                Call 970-888-7274
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-white/95 backdrop-blur-sm border-2 border-white/50 text-professional-dark hover:bg-white hover:text-primary font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary group" 
              asChild
            >
              <Link 
                to="/contact" 
                aria-label="Start your residential trash service by requesting a quote"
                data-analytics-event="quote-request"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Get Quote Online
              </Link>
            </Button>
          </div>
          
          {/* Cross-service linking for HOA and other services */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/80 text-sm mb-4">
              Need commercial or construction dumpster services?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/hoa-services"
                className="inline-flex items-center px-4 py-2 bg-white/10 text-white hover:bg-white hover:text-primary rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                HOA Communities
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
              <Link 
                to="/commercial"
                className="inline-flex items-center px-4 py-2 bg-white/10 text-white hover:bg-white hover:text-primary rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Business Service
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
              <Link 
                to="/roll-off-dumpsters"
                className="inline-flex items-center px-4 py-2 bg-white/10 text-white hover:bg-white hover:text-primary rounded-full text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Construction Roll-Offs
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialBottomCTA;
