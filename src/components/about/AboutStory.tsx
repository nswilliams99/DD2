
import { usePageSection } from '@/hooks/usePageSections';

const AboutStory = () => {
  const { section: storyIntro } = usePageSection('about', 'story-intro');
  const { section: storyValues } = usePageSection('about', 'story-values');
  const { section: storyCommunity } = usePageSection('about', 'story-community');
  const { section: storyQuote } = usePageSection('about', 'story-quote');
  return (
    <section className="py-16 md:py-20 bg-professional-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-poppins text-center">
            {storyIntro?.title || "Built Local for Northern Colorado"}
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg text-gray-200 leading-relaxed font-inter">
              {storyIntro?.description || "Dumpster Diverz was founded in January 2008 by Nicole Hicks in Northern Colorado. What started with a single truck and a local route has grown into a trusted residential, commercial, and roll-off waste partner across the region."}
            </p>
            <p className="text-lg text-gray-200 leading-relaxed font-inter">
              {storyValues?.description || "Still family-owned and operated, Dumpster Diverz is known for honest pricing, responsive support, and deep roots in the community. We provide residential trash pickup, commercial dumpster service, and roll-off dumpster rentals with no hidden fees and dependable service."}
            </p>
            <p className="text-lg text-gray-200 leading-relaxed font-inter">
              {storyCommunity?.description || "We serve families and businesses across the Front Range with our locally owned and operated service."}{' '}
              <a 
                href="/residential#service-areas" 
                className="text-diverz-pink hover:text-diverz-pink-dark font-semibold underline decoration-2 underline-offset-2 hover:decoration-diverz-pink-dark transition-colors duration-300"
                aria-label="Check our full list of residential service areas in Northern Colorado"
              >
                Check our full list of residential service areas in Northern Colorado
              </a> and experience the trusted, family-owned waste management solutions that have served the community for over 16 years.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
