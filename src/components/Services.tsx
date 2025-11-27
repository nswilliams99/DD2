
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Services = () => {
  const { section: overviewSection } = usePageSection('homepage', 'services-overview');
  const { section: residentialSection } = usePageSection('homepage', 'services-residential');
  const { section: commercialSection } = usePageSection('homepage', 'services-commercial');
  const { section: rolloffSection } = usePageSection('homepage', 'services-rolloff');

  const [residentialImageError, setResidentialImageError] = useState(false);
  const [commercialImageError, setCommercialImageError] = useState(false);
  const [rolloffImageError, setRolloffImageError] = useState(false);

  const fallbackResidential = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_resi_card.webp";
  const fallbackCommercial = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_comm_card.webp";
  const fallbackRolloff = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_rolloff_card.webp";
  
  return (
    <section className="py-16 md:py-20 bg-light-neutral" aria-label="Services overview">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark-neutral mb-6 font-poppins">
              {overviewSection?.title || "Our Services"}
            </h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto font-inter text-dark-neutral">
              {overviewSection?.description || "From residential weekly pickup to commercial dumpsters and construction roll-offs, we provide comprehensive waste management solutions for Northern Colorado."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/residential"
                className="inline-flex items-center px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                View All Residential Services
              </Link>
              <Link href="/commercial"
                className="inline-flex items-center px-4 py-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Commercial Solutions
              </Link>
              <Link href="/roll-off-dumpsters"
                className="inline-flex items-center px-4 py-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Roll-Off Rentals
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Residential Service */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-background hover:-translate-y-2">
              <CardContent className="p-0 h-full flex flex-col">
                 <div className="h-1/2 overflow-hidden rounded-t-lg bg-light-neutral">
                   <OptimizedImage 
                     src={!residentialImageError && residentialSection?.image_path ? encodeURI(residentialSection.image_path) : fallbackResidential}
                     alt="Dumpster Diverz employee in purple uniform checking residential trash cart in front of house" 
                     objectFit="cover"
                     objectPosition="center center"
                     className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                     width={400}
                     height={225}
                     sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                     onError={(e) => {
                       console.log('Residential service image failed to load:', residentialSection?.image_path);
                       if (!residentialImageError) {
                         setResidentialImageError(true);
                       }
                     }}
                     onLoad={() => console.log('Residential service image loaded:', residentialSection?.image_path)}
                   />
                </div>
                 <div className="h-1/2 flex-1 justify-center items-center flex flex-col p-4">
                   <div className="bg-soft-neutral text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-soft-neutral transition-colors duration-300">
                     <Home className="w-6 h-6 text-primary-pink" aria-hidden="true" />
                   </div>
                   <h3 className="text-xl font-bold mb-3 font-poppins text-primary-pink text-center">
                     {residentialSection?.title || "Residential Service"}
                   </h3>
                   <p className="mb-4 leading-relaxed font-inter text-dark-neutral text-center text-sm">
                     {residentialSection?.description || "Weekly trash pickup and recycling for homes. Choose from 64 or 96-gallon carts with convenient online management."}
                   </p>
                   <Button 
                     className="bg-transparent hover:bg-white text-primary-pink border-primary-pink font-bold group/btn transition-all duration-300 border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg"
                     asChild
                   >
                     <Link href="/residential" aria-label="Learn more about residential trash pickup services">
                       Learn More
                       <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                     </Link>
                   </Button>
                 </div>
              </CardContent>
            </Card>

            {/* Commercial Service */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-background hover:-translate-y-2">
              <CardContent className="p-0 h-full flex flex-col">
                 <div className="h-1/2 overflow-hidden rounded-t-lg bg-light-neutral">
                   <OptimizedImage 
                     src={!commercialImageError && commercialSection?.image_path ? encodeURI(commercialSection.image_path) : fallbackCommercial}
                     alt="Commercial dumpster behind an office in Fort Collins, Colorado, ready for pickup by Dumpster Diverz" 
                     objectFit="cover"
                     objectPosition="center top"
                     className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                     width={400}
                     height={225}
                     sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                     onError={(e) => {
                       console.log('Commercial service image failed to load:', commercialSection?.image_path);
                       if (!commercialImageError) {
                         setCommercialImageError(true);
                       }
                     }}
                     onLoad={() => console.log('Commercial service image loaded:', commercialSection?.image_path)}
                   />
                </div>
                 <div className="h-1/2 flex-1 justify-center items-center flex flex-col p-4">
                   <div className="bg-soft-neutral text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-soft-neutral transition-colors duration-300">
                     <Building className="w-6 h-6 text-primary-pink" aria-hidden="true" />
                   </div>
                   <h3 className="text-xl font-bold mb-3 font-poppins text-primary-pink text-center">
                     {commercialSection?.title || "Commercial Dumpsters"}
                   </h3>
                   <p className="mb-4 leading-relaxed font-inter text-dark-neutral text-center text-sm">
                     {commercialSection?.description || "Flexible dumpster service for businesses. Multiple sizes and pickup schedules to fit your operations."}
                   </p>
                   <Button 
                     className="bg-transparent hover:bg-white text-primary-pink border-primary-pink font-bold group/btn transition-all duration-300 border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg"
                     asChild
                   >
                     <Link href="/commercial" aria-label="Learn more about commercial dumpster rental services">
                       Learn More
                       <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                     </Link>
                   </Button>
                 </div>
              </CardContent>
            </Card>

            {/* Roll-Off Service */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-background hover:-translate-y-2">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="h-1/2 overflow-hidden rounded-t-lg bg-light-neutral">
                   <OptimizedImage 
                     src={!rolloffImageError && rolloffSection?.image_path ? encodeURI(rolloffSection.image_path) : fallbackRolloff}
                     alt="Dumpster Diverz roll-off container at a Fort Collins home renovation site" 
                     objectFit="cover"
                     objectPosition="left center"
                     className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                     width={400}
                     height={225}
                     sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                     onError={(e) => {
                       console.log('Roll-off service image failed to load:', rolloffSection?.image_path);
                       if (!rolloffImageError) {
                         setRolloffImageError(true);
                       }
                     }}
                     onLoad={() => console.log('Roll-off service image loaded:', rolloffSection?.image_path)}
                   />
                </div>
                <div className="h-1/2 flex-1 justify-center items-center flex flex-col p-4">
                  <div className="bg-soft-neutral text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-soft-neutral transition-colors duration-300">
                    <Truck className="w-6 h-6 text-primary-pink" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-poppins text-primary-pink text-center">
                    {rolloffSection?.title || "Roll-Off Dumpsters"}
                  </h3>
                  <p className="mb-4 leading-relaxed font-inter text-dark-neutral text-center text-sm">
                    {rolloffSection?.description || "Construction and project dumpsters. 10-40 yard containers with same-day delivery available."}
                  </p>
                  <Button 
                    className="bg-transparent hover:bg-white text-primary-pink border-primary-pink font-bold group/btn transition-all duration-300 border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg"
                    asChild
                  >
                    <Link href="/roll-off-dumpsters" aria-label="Learn more about roll-off dumpster rental services">
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
