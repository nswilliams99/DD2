
import type { Tables } from '@/integrations/supabase/types';

type ResidentialTown = Tables<'residential_towns'>;
type ResidentialFaq = Tables<'residential_faqs'>;

interface ResidentialStructuredDataProps {
  town: ResidentialTown;
  faqs?: ResidentialFaq[];
  canonicalUrl: string;
}

export const useResidentialStructuredData = ({ town, faqs, canonicalUrl }: ResidentialStructuredDataProps) => {
  // Create structured data for FAQs
  const faqStructuredData = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Create local business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": canonicalUrl,
    "name": `Dumpster Diverz - ${town.name} Residential Trash Service`,
    "description": town.local_blurb,
    "url": canonicalUrl,
    "telephone": "970-888-7274",
    "priceRange": "$29-$33",
    "areaServed": {
      "@type": "City",
      "name": town.name,
      "addressRegion": town.state
    },
    "serviceType": "Residential Waste Management",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Residential Trash Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Weekly Trash Pickup",
            "description": "65-gallon and 96-gallon cart options with weekly pickup"
          }
        }
      ]
    }
  };

  // Combine structured data
  return faqStructuredData ? [localBusinessData, faqStructuredData] : localBusinessData;
};
