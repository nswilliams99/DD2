
import { Helmet } from 'react-helmet-async';

interface CommercialStructuredDataProps {
  pageType?: 'commercial-main' | 'size-specific';
  sizeName?: string;
  sizeValue?: number;
}

const CommercialStructuredData = ({ 
  pageType = 'commercial-main', 
  sizeName,
  sizeValue 
}: CommercialStructuredDataProps) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Commercial Dumpster Rental Services",
    "description": "Professional commercial dumpster rental services for businesses in Northern Colorado. All sizes from 2-yard to 8-yard containers with flexible pickup schedules.",
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
      "url": "https://www.dumpsterdiverz.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150+"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Windsor",
        "addressRegion": "Colorado"
      },
      {
        "@type": "City", 
        "name": "Fort Collins",
        "addressRegion": "Colorado"
      },
      {
        "@type": "City",
        "name": "Wellington", 
        "addressRegion": "Colorado"
      },
      {
        "@type": "City",
        "name": "Greeley",
        "addressRegion": "Colorado"
      }
    ],
    "serviceType": "Waste Management",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Dumpster Sizes",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "2 Yard Commercial Dumpster"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "3 Yard Commercial Dumpster"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "4 Yard Commercial Dumpster"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "6 Yard Commercial Dumpster"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "8 Yard Commercial Dumpster"
          }
        }
      ]
    }
  };

  // For size-specific pages, enhance with specific size info
  const sizeSpecificData = sizeValue && sizeName ? {
    ...baseStructuredData,
    "name": `${sizeValue} Yard Commercial Dumpster Rental`,
    "description": `${sizeName} commercial dumpster rental for businesses. Professional ${sizeValue}-yard container service with flexible pickup schedules.`,
    "offers": {
      "@type": "Offer",
      "description": `${sizeValue} yard commercial dumpster rental with flexible pickup schedules`,
      "availability": "InStock",
      "priceRange": "$$"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What businesses use ${sizeValue} yard dumpsters?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${sizeValue} yard commercial dumpsters are ideal for medium to large businesses, retail stores, restaurants, and office buildings that generate regular waste volumes.`
          }
        },
        {
          "@type": "Question", 
          "name": `How often are ${sizeValue} yard dumpsters picked up?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `We offer flexible pickup schedules for ${sizeValue} yard dumpsters including weekly, bi-weekly, and on-demand service throughout Windsor, Fort Collins, and Wellington.`
          }
        }
      ]
    }
  } : baseStructuredData;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(pageType === 'size-specific' ? sizeSpecificData : baseStructuredData)}
      </script>
    </Helmet>
  );
};

export default CommercialStructuredData;
