
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const CommercialPanels = () => {
  const { section: pickupTopSection, isLoading: pickupTopLoading } = usePageSection('commercial', 'flexible-pickup-top');
  
  return (
    <>
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <OptimizedImage
                src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial/comm_flexible_pickup.webp"
                alt="Dumpster Diverz flexible commercial pickup schedules for businesses"
                className="w-full rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              {pickupTopLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded w-40"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-6 font-poppins">
                    {pickupTopSection?.title || "Flexible Pickup Schedules"}
                  </h2>
                  <p className="text-lg text-professional-medium mb-6 leading-relaxed font-inter">
                    {pickupTopSection?.description || "Choose from daily, weekly, or bi-weekly pickup schedules to match your business needs. Our reliable commercial service ensures your dumpsters are emptied on time, keeping your business operations running smoothly."}
                  </p>
                  <Button 
                    className="bg-diverz-purple hover:bg-diverz-purple-dark text-white px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                    asChild
                  >
                    <Link to={pickupTopSection?.button_url || "/contact"} aria-label="Schedule commercial dumpster service">
                      {pickupTopSection?.button_text || "Schedule Service"}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommercialPanels;
