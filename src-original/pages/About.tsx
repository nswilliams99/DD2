
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import SEO from '@/components/SEO';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutServices from '@/components/about/AboutServices';
import AboutAdvantages from '@/components/about/AboutAdvantages';
import ServiceAreaMapSection from '@/components/about/ServiceAreaMapSection';
import HolidaySchedule from '@/components/about/HolidaySchedule';
import AboutCTA from '@/components/about/AboutCTA';
import AboutPageSchema from '@/components/seo/AboutPageSchema';

const About = () => {
  const location = useLocation();
  const heroImageUrl = "/src/assets/about-hero-image.jpg";

  useEffect(() => {
    if (location.hash === '#holiday-schedule') {
      // Small delay to ensure component is rendered
      setTimeout(() => {
        const element = document.getElementById('holiday-schedule');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  }, [location.hash]);
  
  // Enhanced Organization schema structured data for better SEO
  const organizationSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dumpster Diverz LLC",
      "alternateName": "Dumpster Diverz",
      "description": "Locally owned trash and dumpster rental company serving Northern Colorado with honest pricing and reliable service since 2008",
      "url": "https://www.dumpsterdiverz.com",
      "sameAs": [
        "https://www.facebook.com/dumpsterdiverz",
        "https://www.google.com/search?q=dumpster+diverz+windsor+co"
      ],
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dumpsterdiverz.com/lovable-uploads/3a53a43a-17e6-4009-b3ee-ee806c4288fe.png",
        "width": 200,
        "height": 64
      },
      "image": "https://www.dumpsterdiverz.com/lovable-uploads/3a53a43a-17e6-4009-b3ee-ee806c4288fe.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1100 South St Louis Ave",
        "addressLocality": "Loveland",
        "addressRegion": "CO",
        "postalCode": "80537",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "970-888-7274",
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": ["Windsor, CO", "Fort Collins, CO", "Wellington, CO", "Greeley, CO", "Severance, CO"]
      },
      "telephone": "970-888-7274",
      "email": "info@dumpsterdiverz.com",
      "priceRange": "$$",
      "paymentAccepted": ["Cash", "Check", "Credit Card"],
      "currenciesAccepted": "USD",
      "foundingDate": "2008-01",
      "foundingLocation": "Windsor, Colorado",
      "numberOfEmployees": "10-50",
      "founder": {
        "@type": "Person",
        "name": "Nicole Hicks",
        "jobTitle": "Founder & Owner"
      },
      "serviceArea": [
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 40.4774,
            "longitude": -104.9014
          },
          "geoRadius": "50000"
        },
        {
          "@type": "Place",
          "name": "Northern Colorado"
        }
      ],
      "areaServed": [
        "Windsor, CO",
        "Fort Collins, CO", 
        "Wellington, CO",
        "Greeley, CO",
        "Severance, CO",
        "Loveland, CO",
        "Berthoud, CO"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Waste Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Trash Collection",
              "description": "Weekly trash and recycling pickup for homes"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Dumpster Service",
              "description": "Regular dumpster service for businesses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Roll-Off Dumpster Rental",
              "description": "Temporary dumpster rentals for projects"
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
      
      <SEOOptimizer
        title="About Dumpster Diverz | Local Waste Company | Northern Colorado"
        description="Meet Dumpster Diverz, Northern Colorado's family-owned waste management company founded by Nicole Hicks in 2008. Serving Windsor, Fort Collins & Wellington for over 16 years with honest pricing and reliable service."
        canonical="https://www.dumpsterdiverz.com/about"
        pageType="about"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          'about dumpster diverz',
          'local waste company', 
          'northern colorado trash service',
          'locally owned hauler',
          'windsor trash company',
          'family owned business',
          'colorado waste management',
          'nicole hicks founder',
          'since 2008',
          'eco friendly waste'
        ]}
        structuredData={organizationSchema}
      />
      
      {/* Additional technical SEO meta tags */}
      <link rel="alternate" type="application/rss+xml" title="Dumpster Diverz News" href="https://www.dumpsterdiverz.com/feed.xml" />
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Northern Colorado" />
      <meta name="geo.position" content="40.4774;-104.9014" />
      <meta name="ICBM" content="40.4774, -104.9014" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#D11768" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "About", url: "https://www.dumpsterdiverz.com/about" }
      ]} />
      <AboutPageSchema organizationData={organizationSchema[0]} />

      <Header />
      
      <main>
        <AboutHero />
        <AboutStory />
        <AboutServices />
        <AboutAdvantages />
        <ServiceAreaMapSection />
        <HolidaySchedule />
        <AboutCTA />
      </main>

      <Footer />
    </div>
  );
};

export default About;
