"use client";

import { useEffect } from 'react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutServices from '@/components/about/AboutServices';
import AboutAdvantages from '@/components/about/AboutAdvantages';
import ServiceAreaMapSection from '@/components/about/ServiceAreaMapSection';
import HolidaySchedule from '@/components/about/HolidaySchedule';
import AboutCTA from '@/components/about/AboutCTA';
import AboutPageSchema from '@/components/seo/AboutPageSchema';

export default function AboutPage() {
  const heroImageUrl = "/src/assets/about-hero-image.jpg";

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#holiday-schedule') {
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
  }, []);
  
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
    <>
      <link
        rel="preload"
        as="image"
        href={heroImageUrl}
        fetchPriority="high"
      />
      
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
      
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "About", url: "https://www.dumpsterdiverz.com/about" }
      ]} />
      <AboutPageSchema organizationData={organizationSchema[0]} />

      <AboutHero />
      <AboutStory />
      <AboutServices />
      <AboutAdvantages />
      <ServiceAreaMapSection />
      <HolidaySchedule />
      <AboutCTA />
    </>
  );
}
