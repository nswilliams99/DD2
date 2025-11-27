
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import PageHeading from '@/components/seo/PageHeading';
import ResidentialHero from './ResidentialHero';
import TownSEOSection from './TownSEOSection';
import ServiceIntroduction from './ServiceIntroduction';
import WeeklyPickupSection from './WeeklyPickupSection';
import WeeklyPickupSectionWindsor from './WeeklyPickupSectionWindsor';
import WeeklyPickupSectionFortCollins from './WeeklyPickupSectionFortCollins';
import WeeklyPickupSectionWellington from './WeeklyPickupSectionWellington';
import WeeklyPickupSectionGreeley from './WeeklyPickupSectionGreeley';
import WeeklyPickupSectionNorthCounty from './WeeklyPickupSectionNorthCounty';
import WeeklyPickupSectionSeverance from './WeeklyPickupSectionSeverance';
import ResidentialPricing from './ResidentialPricing';
import ResidentialBottomCTA from './ResidentialBottomCTA';
import ResidentialFAQSection from './ResidentialFAQSection';
import HOASection from './HOASection';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';
import { useResidentialStructuredData } from './ResidentialStructuredData';
import { useResidentialTownBySlug } from '@/hooks/useResidentialTowns';
import { useResidentialFaqsByTown } from '@/hooks/useResidentialFaqs';
import { generateSchemas } from '@/components/seo/SchemaFactory';
import { usePageSection } from '@/hooks/usePageSections';

interface ResidentialTownPageProps {
  slug: string;
}

const ResidentialTownPage = ({ slug }: ResidentialTownPageProps) => {
  const { data: town, isLoading: townLoading, error: townError } = useResidentialTownBySlug(slug);
  const { data: faqs, isLoading: faqsLoading } = useResidentialFaqsByTown(slug);
  
  // Load page sections for dynamic content
  const { section: serviceIntroSection } = usePageSection(`residential-${slug}`, 'service-introduction');
  const { section: bottomCTASection } = usePageSection(`residential-${slug}`, 'bottom-cta');

  if (townLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" role="status" aria-label="Loading page content">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (townError || !town) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <PageHeading level={1} variant="hero" className="mb-4">
            Page Not Found
          </PageHeading>
          <p className="text-professional-medium">The requested residential service page could not be found.</p>
        </div>
      </div>
    );
  }

  // Ensure canonical URL matches the exact route pattern and strips trailing slashes
  const canonicalUrl = `https://www.dumpsterdiverz.com/residential/${town.slug}`;
  
  // Force canonical to match current location to avoid duplicates
  const currentPath = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
  const expectedPath = `/residential/${town.slug}`;
  const finalCanonical = currentPath === expectedPath ? canonicalUrl : canonicalUrl;
  
  // Generate breadcrumb structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://www.dumpsterdiverz.com" },
    { name: "Residential Service", url: "https://www.dumpsterdiverz.com/residential" },
    { name: `${town.name} Residential`, url: canonicalUrl }
  ];
  
  // Generate enhanced schemas using SchemaFactory
  const enhancedSchemas = generateSchemas({
    town,
    faqs: faqs?.map(faq => ({ question: faq.question, answer: faq.answer })),
    pageType: 'residential',
    canonicalUrl
  });

  // Optimized SEO metadata
  const seoTitle = town.meta_title || `Residential Trash & Recycling Services in ${town.name}, CO | Dumpster Diverz`;
  const seoDescription = town.meta_description || `Reliable residential trash and recycling services in ${town.name}, Colorado. Weekly pickup, online management, and no contracts required.`;

  return (
    <div className="min-h-screen">
      {/* Preload hero image for LCP optimization */}
      {town.hero_image_url && (
        <link
          rel="preload"
          as="image"
          href={town.hero_image_url}
          fetchPriority="high"
        />
      )}
      
      <SEOOptimizer
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        pageType="location"
        locationData={{ city: town.name, state: 'CO' }}
        keywords={[
          'residential trash pickup',
          `${town.name} trash service`,
          'recycling service',
          'Colorado waste management',
          `${town.name} waste pickup`,
          'weekly trash collection',
          'curbside pickup'
        ]}
        structuredData={enhancedSchemas}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main>
        <ResidentialHero
          section={{
            id: 0,
            page_slug: `town-${town.slug}`,
            section_name: 'hero',
            title: `${town.name} Residential Trash & Recycling`,
            description: town.local_blurb,
            image_path: town.hero_image_url,
            button_text: null,
            button_url: null,
            display_order: 0,
            created_at: '',
            updated_at: ''
          }}
          heroImageUrl={town.hero_image_url}
        />

        {/* SEO Section */}
        <TownSEOSection town={town} />

        {/* Service Introduction */}
        <ServiceIntroduction section={serviceIntroSection} />

        {/* How Our Weekly Pickup Works - Town-specific versions */}
        {town.slug === 'windsor' ? (
          <WeeklyPickupSectionWindsor />
        ) : town.slug === 'fort-collins' ? (
          <WeeklyPickupSectionFortCollins />
        ) : town.slug === 'wellington' ? (
          <WeeklyPickupSectionWellington />
        ) : town.slug === 'greeley' ? (
          <WeeklyPickupSectionGreeley />
        ) : town.slug === 'north-county' ? (
          <WeeklyPickupSectionNorthCounty />
        ) : town.slug === 'severance' ? (
          <WeeklyPickupSectionSeverance />
        ) : (
          <WeeklyPickupSection />
        )}

        {/* Pricing Section */}
        <ResidentialPricing 
          townName={town.name} 
          pricingInfo={town.pricing_info}
        />

        {/* HOA Services Section */}
        <HOASection />

        {/* FAQs Section */}
        <ErrorBoundary fallback={<ErrorFallback message="Unable to load FAQs for this location" />}>
          <ResidentialFAQSection faqs={faqs} isLoading={faqsLoading} />
        </ErrorBoundary>

        <ResidentialBottomCTA section={bottomCTASection} />
      </main>
      <Footer />
    </div>
  );
};

export default ResidentialTownPage;
