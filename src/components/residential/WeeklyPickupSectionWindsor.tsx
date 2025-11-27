
import { Button } from '@/components/ui/button';
import { Trash2, Recycle, Calendar, MapPin, Handshake } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const WeeklyPickupSectionWindsor = () => {
  const { section } = usePageSection('residential-windsor', 'weekly-pickup');
  
  const serviceFeatures = [
    {
      icon: <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Trash2 className="w-6 h-6 text-white" />
      </div>,
      title: "Bin Delivered to Windsor Homes",
      description: "We deliver 64 or 96-gallon carts across Windsor's neighborhoods—fast and on time."
    },
    {
      icon: <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Recycle className="w-6 h-6 text-white" />
      </div>,
      title: "Optional Recycling Available",
      description: "Add recycling for $10/month—picked up the same day as trash."
    },
    {
      icon: <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Calendar className="w-6 h-6 text-white" />
      </div>,
      title: "Weekly Pickup in Your Area",
      description: "Pickup runs weekly—rain, snow, or shine—across Windsor's communities."
    },
    {
      icon: <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <MapPin className="w-6 h-6 text-white" />
      </div>,
      title: "Local Drivers from Northern CO",
      description: "Our crew knows Windsor's streets and HOAs, from Water Valley to Highland Meadows."
    },
    {
      icon: <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Handshake className="w-6 h-6 text-white" />
      </div>,
      title: "Flexible, No-Contract Service",
      description: "Month-to-month plans trusted by Windsor families and subdivisions."
    }
  ];
  
  return (
    <section className="bg-professional-light py-[80px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-4 font-poppins">
            {section?.title || "How Our Weekly Pickup Works"}
          </h2>
          <p className="text-lg text-professional-medium font-inter">
            {section?.description || "Simple, reliable service that fits your schedule"}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <OptimizedImage 
              alt="Weekly residential trash pickup service with proper bin placement in Windsor" 
              className="w-full rounded-lg shadow-lg" 
               src={section?.image_path 
                ? `https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/${encodeURI(section.image_path)}`
                : "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/residential-windsor/resi_town_weekly_pickup.webp"
              }
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-6" role="list">
              {serviceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4" role="listitem">
                  {feature.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-professional-dark mb-2 font-poppins">
                      {feature.title}
                    </h3>
                    <p className="text-professional-medium font-inter font-normal text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPickupSectionWindsor;
