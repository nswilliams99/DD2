
import SkipLink from '@/components/SkipLink';
import AccessibleHeader from '@/components/AccessibleHeader';
import Footer from '@/components/Footer';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import RolloffServiceHero from '@/components/rolloff/RolloffServiceHero';
import RolloffIntroduction from '@/components/rolloff/RolloffIntroduction';
import RolloffTownGrid from '@/components/rolloff/RolloffTownGrid';
import RolloffFeaturePanels from '@/components/rolloff/RolloffFeaturePanels';
import RolloffSpecsTable from '@/components/rolloff/RolloffSpecsTable';
import RolloffProjectTypes from '@/components/rolloff/RolloffProjectTypes';
import DumpsterSizes from '@/components/rolloff/DumpsterSizes';
import HowItWorks from '@/components/rolloff/HowItWorks';
import RolloffFAQ from '@/components/rolloff/RolloffFAQ';
import RolloffBottomCTA from '@/components/rolloff/RolloffBottomCTA';


const RollOffService = () => {
  const canonicalUrl = 'https://www.dumpsterdiverz.com/roll-off-dumpsters';
  const heroImageUrl = "/lovable-uploads/services-rolloff-new.jpg";
  
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Roll-Off Dumpster Rental | Construction | Northern CO",
      "description": "Roll-off dumpster rental for construction, remodeling & cleanouts in Windsor, Fort Collins. 10-40 yard containers, same-day delivery. Call 970-888-7274!",
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "Service",
        "name": "Roll-Off Dumpster Rental",
        "provider": {
          "@type": "Organization",
          "name": "Dumpster Diverz LLC"
        },
        "areaServed": [
          {"@type": "City", "name": "Windsor", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Fort Collins", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Wellington", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Greeley", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Loveland", "addressRegion": "Colorado"},
          {"@type": "City", "name": "Severance", "addressRegion": "Colorado"}
        ],
        "serviceType": "Waste Management"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Roll-Off Dumpster Rental",
      "description": "Construction and project dumpster rentals in Windsor, Fort Collins, Wellington. 10-40 yard containers with same-day delivery available.",
      "provider": {
        "@type": "Organization",
        "name": "Dumpster Diverz LLC",
        "telephone": "970-888-7274",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wellington",
          "addressRegion": "Colorado",
          "addressCountry": "US"
        },
        "url": "https://www.dumpsterdiverz.com"
      },
      "areaServed": [
        {"@type": "City", "name": "Windsor", "addressRegion": "Colorado"},
        {"@type": "City", "name": "Fort Collins", "addressRegion": "Colorado"},
        {"@type": "City", "name": "Wellington", "addressRegion": "Colorado"},
        {"@type": "City", "name": "Greeley", "addressRegion": "Colorado"},
        {"@type": "City", "name": "Loveland", "addressRegion": "Colorado"},
        {"@type": "City", "name": "Severance", "addressRegion": "Colorado"}
      ],
      "serviceType": "Waste Management",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Roll-off Container Sizes",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "10 Yard Roll-off Container",
              "description": "Perfect for small cleanouts and bathroom remodels"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "20 Yard Roll-off Container",
              "description": "Ideal for kitchen remodels and flooring projects"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "30 Yard Roll-off Container",
              "description": "Great for large renovations and new construction"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "40 Yard Roll-off Container",
              "description": "Perfect for commercial projects and large construction sites"
            }
          }
        ]
      }
    }
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
      
      <SkipLink />
      <SEOOptimizer
        title="Roll-Off Dumpster Rental | Construction | Northern CO"
        description="Roll-off dumpster rental for construction, remodeling & cleanouts in Windsor, Fort Collins. 10-40 yard containers, same-day delivery. Call 970-888-7274!"
        canonical={canonicalUrl}
        pageType="service"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          "roll-off dumpster rental",
          "construction dumpster",
          "Windsor remodeling",
          "Fort Collins construction",
          "junk removal",
          "Northern Colorado",
          "same-day delivery",
          "waste management",
          "renovation debris",
          "cleanup dumpster"
        ]}
        structuredData={structuredData}
      />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "Roll-Off Dumpsters", url: canonicalUrl }
      ]} />
      
      <AccessibleHeader />
      <main id="main">
        <RolloffServiceHero />
        <RolloffIntroduction />
        <RolloffTownGrid />
        <RolloffFeaturePanels />
        <HowItWorks />
        <RolloffSpecsTable />
        <DumpsterSizes />
        <RolloffProjectTypes />
        <RolloffFAQ />
        <RolloffBottomCTA />
      </main>
      <Footer />
    </div>
  );
};

export default RollOffService;
