import { Helmet } from 'react-helmet-async';

interface ServiceArea {
  name: string;
  region: string;
  country: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface ServiceAreaSchemaProps {
  businessName?: string;
  serviceAreas: ServiceArea[];
  serviceTypes: string[];
}

const ServiceAreaSchema = ({ 
  businessName = "Dumpster Diverz",
  serviceAreas,
  serviceTypes 
}: ServiceAreaSchemaProps) => {
  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${businessName} Service Areas`,
    "serviceType": serviceTypes,
    "provider": {
      "@type": "LocalBusiness",
      "name": businessName
    },
    "areaServed": serviceAreas.map(area => ({
      "@type": "City",
      "name": area.name,
      "addressRegion": area.region,
      "addressCountry": area.country,
      ...(area.geoCoordinates && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": area.geoCoordinates.latitude,
          "longitude": area.geoCoordinates.longitude
        }
      })
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Area Coverage",
      "itemListElement": serviceTypes.map(serviceType => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceType,
          "areaServed": serviceAreas.map(area => area.name)
        }
      }))
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceAreaSchema)}
      </script>
    </Helmet>
  );
};

export default ServiceAreaSchema;