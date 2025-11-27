"use client";

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import CommercialStructuredData from '@/components/CommercialStructuredData';
import CommercialHero from '@/components/commercial/CommercialHero';
import CommercialIntro from '@/components/commercial/CommercialIntro';
import CommercialPanels from '@/components/commercial/CommercialPanels';
import CommercialSpecsTable from '@/components/commercial/CommercialSpecsTable';
import DynamicCommercialSizeCards from '@/components/commercial/DynamicCommercialSizeCards';
import CommercialFAQSection from '@/components/commercial/CommercialFAQSection';
import CommercialBottomCTA from '@/components/commercial/CommercialBottomCTA';

export default function CommercialPage() {
  const canonicalUrl = "https://www.dumpsterdiverz.com/commercial";
  const heroImageUrl = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/commercial/comm_hero_img.webp";

  const enhancedStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Commercial Dumpster Rental Services",
      "description": "Complete commercial dumpster rental services for businesses in Windsor, Fort Collins, Wellington. All sizes from 2-yard to 8-yard containers with flexible pickup schedules.",
      "provider": {
        "@type": "LocalBusiness",
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
        {"@type": "City", "name": "Greeley", "addressRegion": "Colorado"}
      ],
      "serviceType": "Waste Management",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Commercial Dumpster Sizes",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "2 Yard Commercial Dumpster"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "3 Yard Commercial Dumpster"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "4 Yard Commercial Dumpster"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "6 Yard Commercial Dumpster"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "8 Yard Commercial Dumpster"}}
        ]
      }
    }
  ];

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={heroImageUrl}
        fetchPriority="high"
      />
      
      <SEOOptimizer
        title="Commercial Dumpster Service | 2-3 Yard Sizes | Northern Colorado"
        description="Commercial dumpster rental for businesses in Windsor, Fort Collins & Wellington. 2-3 yard containers, flexible pickup. Call 970-888-7274 for pricing!"
        canonical={canonicalUrl}
        pageType="service"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          'commercial dumpster rental',
          'business waste pickup',
          'office trash collection',
          'commercial dumpster sizes Colorado',
          'Fort Collins commercial trash service',
          '2 yard dumpster',
          '3 yard dumpster',
          '4 yard dumpster',
          '6 yard dumpster',
          '8 yard dumpster',
          'Northern Colorado business waste'
        ]}
        structuredData={enhancedStructuredData}
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "Commercial Service", url: canonicalUrl }
      ]} />

      <CommercialStructuredData pageType="commercial-main" />

      <CommercialHero />
      <CommercialIntro />
      <CommercialPanels />
      <DynamicCommercialSizeCards />
      <CommercialSpecsTable />
      <CommercialFAQSection />
      <CommercialBottomCTA />
    </>
  );
}
