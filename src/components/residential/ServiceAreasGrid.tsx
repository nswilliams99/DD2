import { serviceAreas } from '@/data/residentialServiceData';
import Link from 'next/link';
import type { PageSection } from '@/hooks/usePageSections';

interface ServiceAreasGridProps {
  section?: PageSection | null;
}

const ServiceAreasGrid = ({ section }: ServiceAreasGridProps) => {
  // Extended service areas with routing information
  const serviceAreasWithRouting = [
    { name: 'Windsor', route: '/residential/windsor' },
    { name: 'Fort Collins', route: '/residential/fort-collins' },
    { name: 'Wellington', route: '/residential/wellington' },
    { name: 'Greeley', route: '/residential/greeley' },
    { name: 'Northern Communities', route: '/residential/north-county' },
    { name: 'Severance', route: '/residential/severance' }
  ];

  return (
    <section 
      className="py-16 bg-background"
      aria-labelledby="service-areas-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="service-areas-heading" className="text-3xl md:text-4xl font-bold text-dark-neutral mb-6 font-poppins">
            {section?.title || "Northern Colorado Service Areas"}
          </h2>
          <p className="text-lg text-professional-medium mb-8 font-inter">
            {section?.description || "We proudly serve residential customers throughout Northern Colorado"}
          </p>
          <div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            role="navigation"
            aria-label="Service area links"
          >
            {serviceAreasWithRouting.map((area, index) => (
              <Link 
                key={area.name}
                href={area.route}
                className="bg-professional-lighter p-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 animate-fade-in group block focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:outline-none" 
                style={{animationDelay: `${index * 0.1}s`}}
                aria-label={`View residential trash service details for ${area.name}`}
              >
                <span className="font-medium text-dark-neutral group-hover:text-white font-inter transition-colors duration-300">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-professional-medium font-inter">
            Plus surrounding Northern Colorado communities
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasGrid;
