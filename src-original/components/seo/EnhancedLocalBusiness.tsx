import { Helmet } from 'react-helmet-async';

interface EnhancedLocalBusinessProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  openingHours?: string[];
  serviceArea?: string[];
  priceRange?: string;
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  sameAs?: string[];
}

const EnhancedLocalBusiness = ({
  name = "Dumpster Diverz LLC",
  description = "Professional waste management and dumpster rental services in Northern Colorado",
  url = "https://www.dumpsterdiverz.com",
  telephone = "970-888-7274",
  email = "info@dumpsterdiverz.com",
  address = {
    addressLocality: "Wellington",
    addressRegion: "Colorado",
    addressCountry: "US"
  },
  openingHours = [
    "Mo-Fr 07:00-16:00"
  ],
  serviceArea = [
    "Windsor, CO",
    "Fort Collins, CO", 
    "Wellington, CO",
    "Greeley, CO",
    "Loveland, CO",
    "Severance, CO"
  ],
  priceRange = "$$",
  aggregateRating = {
    ratingValue: "4.9",
    reviewCount: "150"
  },
  sameAs = [
    "https://www.facebook.com/dumpsterdiverz",
    "https://www.google.com/maps/place/Dumpster+Diverz"
  ]
}: EnhancedLocalBusinessProps) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#organization`,
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "openingHours": openingHours,
    "areaServed": serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "priceRange": priceRange,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount
    },
    "sameAs": sameAs,
    "serviceType": [
      "Waste Management",
      "Dumpster Rental",
      "Trash Collection",
      "Recycling Services"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Waste Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Trash Service",
            "serviceType": "Waste Management"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Dumpster Service",
            "serviceType": "Waste Management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roll-Off Container Rental",
            "serviceType": "Waste Management"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default EnhancedLocalBusiness;
