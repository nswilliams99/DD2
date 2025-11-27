import { Helmet } from 'react-helmet-async';

interface AboutPageSchemaProps {
  organizationData?: any;
}

const AboutPageSchema = ({ organizationData }: AboutPageSchemaProps) => {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dumpster Diverz",
    "description": "Learn about Dumpster Diverz, Northern Colorado's family-owned waste management company founded by Nicole Hicks in 2008.",
    "url": "https://www.dumpsterdiverz.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Dumpster Diverz LLC",
      "foundingDate": "2008-01",
      "founder": {
        "@type": "Person",
        "name": "Nicole Hicks"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1100 South St Louis Ave",
        "addressLocality": "Loveland", 
        "addressRegion": "CO",
        "postalCode": "80537",
        "addressCountry": "US"
      }
    },
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Dumpster Diverz",
      "url": "https://www.dumpsterdiverz.com"
    }
  };

  const schema = organizationData || defaultSchema;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      {/* Additional meta tags for crawlability */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href="https://www.dumpsterdiverz.com/about" />
      {/* Technical SEO improvements */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};

export default AboutPageSchema;