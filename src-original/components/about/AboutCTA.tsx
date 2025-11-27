
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';

const AboutCTA = () => {
  const { section: bottomCTA } = usePageSection('about', 'bottom-cta');
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-professional-dark via-professional-medium to-diverz-purple text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            {bottomCTA?.title || "Work With a Hauler Who Gets It"}
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed font-inter">
            {bottomCTA?.description || "Ready to experience what local service really means? Whether you need residential pickup, a dumpster for your project, or commercial service for your business, we're here to help with honest pricing and reliable service you can count on."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-professional-dark hover:bg-gray-100 font-semibold font-inter px-8"
              asChild
            >
              <a href={bottomCTA?.button_url || "/contact"} aria-label="Contact Dumpster Diverz for waste management services">
                <Mail className="w-5 h-5 mr-2" />
                {bottomCTA?.button_text || "Contact Us"}
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-professional-dark font-semibold font-inter px-8"
              asChild
            >
              <a href="/#services" aria-label="Explore Dumpster Diverz waste management services">
                Explore Our Services
              </a>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">970-888-7274</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Northern Colorado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
