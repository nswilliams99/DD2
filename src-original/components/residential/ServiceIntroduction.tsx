
import type { PageSection } from '@/hooks/usePageSections';

interface ServiceIntroductionProps {
  section?: PageSection | null;
}

const ServiceIntroduction = ({ section }: ServiceIntroductionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-professional-dark leading-relaxed font-inter">
            {section?.description || "Dumpster Diverz provides reliable weekly trash pickup and recycling service for homeowners throughout Windsor, Fort Collins, Wellington and Northern Colorado. Choose from 64-gallon or 96-gallon carts with convenient online management, text notifications, and eco-friendly recycling included at no extra cost."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntroduction;
