import type { Tables } from '@/integrations/supabase/types';

type ResidentialTown = Tables<'residential_towns'>;
type RolloffTown = Tables<'rolloff_towns'>;
type CommercialSize = Tables<'commercial_sizes'>;
type FAQ = { question: string; answer: string };

export interface PageData {
  town?: ResidentialTown | RolloffTown;
  commercialSize?: CommercialSize;
  faqs?: FAQ[];
  serviceName?: string;
  pageType?: 'residential' | 'rolloff' | 'commercial' | 'hoa';
  canonicalUrl?: string;
}

export const generateLocalBusinessSchema = (pageData: PageData) => {
  const { town, pageType } = pageData;
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dumpster Diverz",
    "description": "Professional waste management and dumpster rental services in Northern Colorado",
    "url": "https://www.dumpsterdiverz.com",
    "logo": "https://www.dumpsterdiverz.com/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png",
    "image": "https://www.dumpsterdiverz.com/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png",
    "telephone": "970-888-7274",
    "email": "info@dumpsterdiverz.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": town?.name || "Wellington",
      "addressRegion": "Colorado",
      "postalCode": "80537",
      "addressCountry": "US",
      "streetAddress": "1100 South St Louis Ave, Loveland"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4774",
      "longitude": "-104.9014"
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
      },
      {
        "@type": "City",
        "name": "Severance",
        "addressRegion": "Colorado"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  // Add service-specific enhancements
  if (pageType === 'residential') {
    return {
      ...baseSchema,
      "@type": ["LocalBusiness", "WasteManagementService"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Residential Waste Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Weekly Trash Pickup",
              "description": `Reliable weekly trash pickup service in ${town?.name || 'Northern Colorado'}`
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Recycling Service",
              "description": "Comprehensive recycling pickup and processing"
            }
          }
        ]
      }
    };
  }

  if (pageType === 'commercial') {
    return {
      ...baseSchema,
      "@type": ["LocalBusiness", "WasteManagementService"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Commercial Dumpster Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Dumpster Rental",
              "description": "2-yard to 8-yard commercial dumpsters for businesses"
            }
          }
        ]
      }
    };
  }

  if (pageType === 'rolloff') {
    return {
      ...baseSchema,
      "@type": ["LocalBusiness", "EquipmentRental"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Roll-off Container Rental",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Roll-off Dumpster Rental",
              "description": "Large container rentals for construction and cleanout projects"
            }
          }
        ]
      }
    };
  }

  if (pageType === 'hoa') {
    return {
      ...baseSchema,
      "@type": ["LocalBusiness", "WasteManagementService"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "HOA Waste Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "HOA Trash Management",
              "description": "Comprehensive waste management solutions for homeowner associations"
            }
          }
        ]
      }
    };
  }

  return baseSchema;
};

export const generateServiceSchema = (pageData: PageData) => {
  const { town, pageType, serviceName } = pageData;
  
  if (pageType === 'residential') {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Residential Trash Pickup in ${town?.name || 'Northern Colorado'}`,
      "description": town?.local_blurb || `Professional residential waste management services in ${town?.name || 'Northern Colorado'} with weekly pickup, online billing, and no contracts.`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Dumpster Diverz",
        "telephone": "970-888-7274"
      },
      "areaServed": {
        "@type": "City",
        "name": town?.name || "Northern Colorado",
        "addressRegion": "Colorado"
      },
      "serviceType": "Waste Management",
      "offers": {
        "@type": "Offer",
        "description": "Weekly residential trash and recycling pickup",
        "price": "Contact for pricing",
        "priceCurrency": "USD"
      }
    };
  }

  if (pageType === 'commercial') {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName || "Commercial Dumpster Service",
      "description": "Professional commercial waste management with various dumpster sizes for businesses",
      "provider": {
        "@type": "LocalBusiness", 
        "name": "Dumpster Diverz",
        "telephone": "970-888-7274"
      },
      "serviceType": "Commercial Waste Management",
      "offers": {
        "@type": "Offer",
        "description": "Commercial dumpster rental and waste management",
        "price": "Contact for pricing",
        "priceCurrency": "USD"
      }
    };
  }

  if (pageType === 'rolloff') {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Roll-off Container Rental in ${town?.name || 'Northern Colorado'}`,
      "description": "Large roll-off dumpster rentals for construction, renovation, and cleanout projects",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Dumpster Diverz", 
        "telephone": "970-888-7274"
      },
      "areaServed": {
        "@type": "City",
        "name": town?.name || "Northern Colorado",
        "addressRegion": "Colorado"
      },
      "serviceType": "Equipment Rental",
      "offers": {
        "@type": "Offer",
        "description": "Roll-off container rental for large projects",
        "price": "Contact for pricing",
        "priceCurrency": "USD"
      }
    };
  }

  if (pageType === 'hoa') {
    return {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "HOA Waste Management Services",
      "description": "Comprehensive waste management solutions designed specifically for homeowner associations and multi-family properties",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Dumpster Diverz",
        "telephone": "970-888-7274"
      },
      "serviceType": "HOA Services",
      "offers": {
        "@type": "Offer",
        "description": "Tailored waste management for HOAs and multi-family properties",
        "price": "Contact for pricing",
        "priceCurrency": "USD"
      }
    };
  }

  return null;
};

export const generateFAQSchema = (faqs: FAQ[]) => {
  if (!faqs || faqs.length === 0) return null;

  return {
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
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateSchemas = (pageData: PageData): any[] => {
  const schemas = [];
  const { pageType, faqs } = pageData;

  // Always include LocalBusiness for location-based pages
  if (pageType && ['residential', 'rolloff', 'commercial', 'hoa'].includes(pageType)) {
    schemas.push(generateLocalBusinessSchema(pageData));
  }

  // Add service schema
  const serviceSchema = generateServiceSchema(pageData);
  if (serviceSchema) {
    schemas.push(serviceSchema);
  }

  // Add FAQ schema if FAQs exist
  if (faqs && faqs.length > 0) {
    const faqSchema = generateFAQSchema(faqs);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  return schemas;
};
