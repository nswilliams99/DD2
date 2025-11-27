import { usePageSection } from '@/hooks/usePageSections';

const AboutServices = () => {
  const { section: servicesIntro } = usePageSection('about', 'services-intro');
  const { section: residentialService } = usePageSection('about', 'services-residential');
  const { section: rolloffService } = usePageSection('about', 'services-rolloff');
  const { section: commercialService } = usePageSection('about', 'services-commercial');
  return (
    <section className="py-16 md:py-20 bg-professional-lighter">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 font-poppins text-center">
            {servicesIntro?.title || "Local Trash Services Built for Northern Colorado"}
          </h2>
          <p className="text-lg text-professional-medium leading-relaxed mb-12 font-inter text-center">
            {servicesIntro?.description || "From curbside pickup to roll-off rentals, we provide waste solutions for homes, businesses, and job sites across Northern Colorado — always with local support and honest pricing."}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <a 
              href="/residential" 
              className="group bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block focus:outline-none focus:ring-2 focus:ring-diverz-pink focus:ring-offset-2"
              aria-label="Learn more about our residential trash pickup services"
            >
              <h3 className="text-xl font-bold text-diverz-pink group-hover:text-diverz-pink-dark mb-4 font-poppins transition-colors duration-300">
                {residentialService?.title || "Residential Trash Pickup"}
              </h3>
              <p className="text-professional-medium font-inter group-hover:text-professional-dark transition-colors duration-300">
                {residentialService?.description || "Weekly trash and recycling pickup for Northern Colorado neighborhoods. Flexible schedules, no long-term contracts, and local support whenever you need it. Ideal for HOAs, townhomes, and single-family homes."}
              </p>
            </a>
            
            <a 
              href="/roll-off-dumpsters" 
              className="group bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block focus:outline-none focus:ring-2 focus:ring-diverz-pink focus:ring-offset-2"
              aria-label="Learn more about our roll-off dumpster rental services"
            >
              <h3 className="text-xl font-bold text-diverz-pink group-hover:text-diverz-pink-dark mb-4 font-poppins transition-colors duration-300">
                {rolloffService?.title || "Roll-Off Dumpster Rentals"}
              </h3>
              <p className="text-professional-medium font-inter group-hover:text-professional-dark transition-colors duration-300">
                {rolloffService?.description || "Same-day roll-off dumpster rentals for cleanouts, construction, and renovation projects across Northern Colorado. Transparent pricing and local permit expertise in Windsor, Fort Collins, Greeley, and nearby communities."}
              </p>
            </a>
            
            <a 
              href="/commercial" 
              className="group bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block focus:outline-none focus:ring-2 focus:ring-diverz-pink focus:ring-offset-2"
              aria-label="Learn more about our commercial waste management services"
            >
              <h3 className="text-xl font-bold text-diverz-pink group-hover:text-diverz-pink-dark mb-4 font-poppins transition-colors duration-300">
                {commercialService?.title || "Commercial Waste Services"}
              </h3>
              <p className="text-professional-medium font-inter group-hover:text-professional-dark transition-colors duration-300">
                {commercialService?.description || "Commercial waste service for businesses of all sizes — from offices and retail to restaurants and warehouses. Local account managers, flexible pickup schedules, and scalable dumpster sizes across Northern Colorado."}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
