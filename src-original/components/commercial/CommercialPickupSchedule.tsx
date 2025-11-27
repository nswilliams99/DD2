
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const CommercialPickupSchedule = () => {
  const { section } = usePageSection('commercial', 'flexible-pickup-bottom');
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-12 text-center font-poppins">
            Flexible Pickup Schedules
          </h2>
          
          {/* Two-column layout with image */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {/* Left side - Image */}
            <div className="relative">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-lg shadow-lg">
                <OptimizedImage
                  src={section?.image_path 
                    ? `https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/${encodeURI(section.image_path)}`
                    : "/lovable-uploads/d454be17-c35e-445c-b3c7-0422a78536fa.png"
                  }
                  alt="Bright pink Dumpster Diverz commercial dumpster positioned outside a retail building with store and office signage, demonstrating flexible pickup service locations."
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            {/* Right side - Pickup options */}
            <div className="space-y-6">
              {[
                { frequency: "Daily", description: "For high-volume businesses that generate waste consistently throughout the week", icon: <Calendar className="w-8 h-8 text-primary-pink" /> },
                { frequency: "Weekly", description: "Most popular option for regular business operations and consistent waste generation", icon: <Calendar className="w-8 h-8 text-primary-pink" /> },
                { frequency: "Bi-Weekly", description: "Cost-effective solution for smaller businesses with lower waste volumes", icon: <Calendar className="w-8 h-8 text-primary-pink" /> }
              ].map((schedule, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border border-light-neutral">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{schedule.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-dark-neutral mb-2 font-poppins">{schedule.frequency}</h3>
                        <p className="text-professional-medium font-inter">{schedule.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialPickupSchedule;
