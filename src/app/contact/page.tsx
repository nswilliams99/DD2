"use client";

import Contact from '@/components/Contact';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function ContactPage() {
  const canonicalUrl = 'https://www.dumpsterdiverz.com/contact';
  const heroImageUrl = "/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png";
  
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Contact Dumpster Diverz | Get Quote | 970-888-7274",
      "description": "Contact Dumpster Diverz for waste management quotes in Windsor, Fort Collins & Wellington. Call 970-888-7274 or email info@dumpsterdiverz.com for fast service!",
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "Organization",
        "name": "Dumpster Diverz LLC",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "970-888-7274",
          "contactType": "customer service"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dumpster Diverz LLC",
      "telephone": "970-888-7274",
      "email": "info@dumpsterdiverz.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1100 South St Louis Ave",
        "addressLocality": "Loveland",
        "addressRegion": "CO",
        "postalCode": "80537",
        "addressCountry": "US"
      },
      "url": "https://www.dumpsterdiverz.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "970-888-7274",
        "contactType": "customer service",
        "areaServed": "Colorado",
        "availableLanguage": "English"
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
        title="Contact Dumpster Diverz | Get Quote | 970-888-7274"
        description="Contact Dumpster Diverz for waste management quotes in Windsor, Fort Collins & Wellington. Call 970-888-7274 or email info@dumpsterdiverz.com for fast service!"
        canonical={canonicalUrl}
        pageType="contact"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          "contact dumpster diverz",
          "dumpster rental contact", 
          "Windsor Colorado",
          "Fort Collins",
          "Wellington",
          "waste management contact",
          "get quote",
          "customer service"
        ]}
        structuredData={structuredData}
      />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "Contact", url: canonicalUrl }
      ]} />
      
      <Contact />
    </>
  );
}
