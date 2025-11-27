import { usePageSection } from '@/hooks/usePageSections';

const RolloffIntroduction = () => {
  const { section: heroSection } = usePageSection('roll-off', 'hero');
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="sr-only">Roll-off Dumpster Rental Introduction</h2>
          <p className="text-xl text-professional-dark leading-relaxed font-inter">
            {heroSection?.description || "Dumpster Diverz offers 12-30 yard roll-off containers for construction, remodeling, and large cleanout projects throughout Windsor, Fort Collins, Wellington and Northern Colorado. Same-day delivery available with flexible rental periods to match your project timeline."}
          </p>
        </div>
      </div>
    </section>
  );
};
export default RolloffIntroduction;