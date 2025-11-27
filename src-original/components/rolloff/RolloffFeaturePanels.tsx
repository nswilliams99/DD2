
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Truck } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/ui/OptimizedImage';

const RolloffFeaturePanels = () => {
  const navigate = useNavigate();
  const { section: sameDaySection } = usePageSection('roll-off', 'same-day');
  const { section: flexiblePeriodsSection } = usePageSection('roll-off', 'flexible-periods');

  const handleButtonClick = (index: number) => {
    if (index === 0) {
      // Schedule Delivery button - navigate to contact page
      navigate('/contact');
    } else {
      // Learn More button - call phone number
      window.location.href = 'tel:970-888-7274';
    }
  };
  
  const features = [
    {
      title: sameDaySection?.title || "Same-Day Delivery Available",
      description: sameDaySection?.description || "Need a dumpster fast? We offer same-day delivery for orders placed before 12 PM throughout Windsor, Fort Collins, and Wellington. Keep your construction or remodeling project moving with our reliable, prompt delivery service.",
      image: "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/roll-off-dumpsters/rolloff_same_day.webp",
      imageAlt: "Dumpster Diverz same-day delivery for roll-off dumpsters",
      icon: <Clock className="w-6 h-6" aria-hidden="true" />,
      reverse: false
    },
    {
      title: flexiblePeriodsSection?.title || "Flexible Rental Periods",
      description: flexiblePeriodsSection?.description || "Rent your roll-off dumpster for as long as your project needs. Whether it's a weekend cleanout or a multi-month construction project, we provide flexible rental periods that adapt to your timeline and budget.",
      image: "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/roll-off-dumpsters/rolloff_flexible_rental.webp",
      imageAlt: "Dumpster Diverz flexible rental periods for construction projects",
      icon: <Truck className="w-6 h-6" aria-hidden="true" />,
      reverse: true
    }
  ];

  return (
    <>
      {features.map((feature, index) => (
        <section 
          key={feature.title} 
          className={`py-16 ${index % 2 === 0 ? 'bg-professional-light' : 'bg-background'}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={feature.reverse ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}>
                <OptimizedImage
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-full rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={feature.reverse ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}>
                <div className="flex items-center mb-4">
                  <div className="bg-diverz-purple text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-professional-dark font-poppins">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-lg text-professional-medium mb-6 leading-relaxed font-inter">
                  {feature.description}
                </p>
                <Button 
                  onClick={() => handleButtonClick(index)}
                  className="bg-diverz-purple hover:bg-diverz-purple-dark text-white px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  {index === 0 ? 'Schedule Delivery' : 'Learn More'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default RolloffFeaturePanels;
