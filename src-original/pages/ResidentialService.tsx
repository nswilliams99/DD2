
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ResidentialHero from '@/components/residential/ResidentialHero';
import ServiceIntroduction from '@/components/residential/ServiceIntroduction';
import WeeklyPickupSection from '@/components/residential/WeeklyPickupSection';
import ServiceAreasGrid from '@/components/residential/ServiceAreasGrid';
import ResidentialFAQSection from '@/components/residential/ResidentialFAQSection';
import ResidentialBottomCTA from '@/components/residential/ResidentialBottomCTA';
import { usePageSection } from '@/hooks/usePageSections';
import { useResidentialFaqs } from '@/hooks/useResidentialFaqs';
import {
  residentialFAQStructuredData
} from '@/data/residentialStructuredData';

const ResidentialService = () => {
  const canonicalPageUrl = "https://www.dumpsterdiverz.com/residential";
  
  // Load page sections from Supabase
  const { section: heroSection } = usePageSection('residential', 'hero');
  const { section: serviceIntroSection } = usePageSection('residential', 'service-introduction');
  const { section: weeklyPickupSection } = usePageSection('residential', 'weekly-pickup');
  const { section: serviceAreasSection } = usePageSection('residential', 'service-areas');
  const { section: bottomCTASection } = usePageSection('residential', 'bottom-cta');
  
  // Load residential FAQs
  const { data: faqs, isLoading: isLoadingFAQs } = useResidentialFaqs();
  
  // Construct image URLs with fallbacks
  const heroImageUrl = heroSection?.image_path 
    ? heroSection.image_path.startsWith('http') 
      ? heroSection.image_path 
      : `https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/${encodeURI(heroSection.image_path)}`
    : "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/residential/resi_heroimg.webp";

  // Enhanced structured data for residential service page
  const residentialStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Residential Trash Pickup | Weekly Service | Northern CO",
      "description": "Weekly residential trash & recycling pickup in Windsor, Fort Collins, Wellington. 64 & 96-gallon carts, no contracts. Call 970-888-7274 for service!",
      "url": canonicalPageUrl,
      "mainEntity": {
        "@type": "Service",
        "name": "Residential Trash Collection Service",
        "provider": {
          "@type": "Organization", 
          "name": "Dumpster Diverz LLC"
        },
        "areaServed": [
          {"@type": "City", "name": "Windsor", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Fort Collins", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Wellington", "addressRegion": "Colorado"}
        ],
        "serviceType": "Residential Waste Collection"
      }
    },
    residentialFAQStructuredData
  ];

  return (
    <div className="min-h-screen">
      {/* Preload hero image for LCP optimization */}
      <link
        rel="preload"
        as="image"
        href={heroImageUrl}
        fetchPriority="high"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      <SEOOptimizer
        title="Residential Trash Pickup | Weekly Service | Northern CO"
        description="Weekly residential trash & recycling pickup in Windsor, Fort Collins, Wellington. 64 & 96-gallon carts, no contracts. Call 970-888-7274 for service!"
        canonical={canonicalPageUrl}
        pageType="service"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          "residential trash pickup",
          "weekly garbage service",
          "Windsor trash collection", 
          "Fort Collins waste service",
          "Wellington garbage pickup",
          "64 gallon cart",
          "96 gallon cart",
          "no contract trash service",
          "Northern Colorado residential"
        ]}
        structuredData={residentialStructuredData}
      />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "Residential Service", url: canonicalPageUrl }
      ]} />

      <Header />
      <main>
        <ResidentialHero
          section={heroSection}
          heroImageUrl={heroImageUrl}
        />
        <ServiceIntroduction 
          section={serviceIntroSection}
        />
        <WeeklyPickupSection 
          section={weeklyPickupSection}
        />
        <ServiceAreasGrid 
          section={serviceAreasSection}
        />
        <ResidentialFAQSection 
          faqs={faqs}
          isLoading={isLoadingFAQs}
        />
        <ResidentialBottomCTA 
          section={bottomCTASection}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ResidentialService;
