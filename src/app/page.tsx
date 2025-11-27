"use client";

import React from 'react';
import CriticalCSS from '@/components/CriticalCSS';
import Hero from '@/components/Hero';
import ServicePlansTable from '@/components/residential/ServicePlansTable';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import SEOOptimizer from '@/components/seo/SEOOptimizer';
import SitemapGenerator from '@/components/seo/SitemapGenerator';
import ServiceAreaSchema from '@/components/seo/ServiceAreaSchema';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function HomePage() {
  const heroImageUrl = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_hero.webp";
  
  const serviceAreas = [
    { name: "Windsor", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.4774, longitude: -104.9014 } },
    { name: "Fort Collins", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.5853, longitude: -105.0844 } },
    { name: "Wellington", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.7006, longitude: -105.0067 } },
    { name: "Greeley", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.4233, longitude: -104.7091 } },
    { name: "Loveland", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.3928, longitude: -105.0750 } },
    { name: "Severance", region: "Colorado", country: "US", geoCoordinates: { latitude: 40.5206, longitude: -104.8669 } }
  ];

  const serviceTypes = [
    "Residential Trash Collection",
    "Commercial Dumpster Service", 
    "Roll-Off Container Rental",
    "Recycling Services",
    "Construction Waste Management"
  ];

  const homepageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dumpster Diverz LLC",
      "alternateName": "Dumpster Diverz",
      "url": "https://www.dumpsterdiverz.com",
      "logo": "https://www.dumpsterdiverz.com/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png",
      "description": "Professional dumpster rental and waste management services in Northern Colorado",
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
      "serviceArea": serviceAreas,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Waste Management Services",
        "itemListElement": serviceTypes.map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service
          }
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Dumpster Rental & Trash Service | Northern Colorado",
      "description": "Professional dumpster rental & trash services in Windsor, Fort Collins & Northern Colorado. Family-owned, reliable delivery, no contracts. Call 970-888-7274 today!",
      "url": "https://www.dumpsterdiverz.com",
      "mainEntity": {
        "@type": "Service",
        "name": "Waste Management Services",
        "provider": {
          "@type": "Organization",
          "name": "Dumpster Diverz LLC"
        },
        "areaServed": serviceAreas,
        "serviceType": serviceTypes
      }
    }
  ];
  
  return (
    <>
      <CriticalCSS />
      <link
        rel="preload"
        as="image"
        href={`${heroImageUrl}?width=1024&height=768&format=webp`}
        fetchPriority="high"
      />
      
      <SEOOptimizer
        title="Trash service that doesn't suck | Dumpster Diverz"
        description="Reliable waste management in Northern Colorado. Residential trash pickup, 2-3 yard commercial dumpsters & roll-off rentals. Family-owned since 2008. Call 970-888-7274!"
        canonical="https://www.dumpsterdiverz.com/"
        pageType="service"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          "dumpster rental with text notifications",
          "Windsor trash service",
          "Fort Collins dumpster rental", 
          "Northern Colorado waste management",
          "residential trash pickup",
          "pink garbage truck",
          "residential trash service",
          "family owned waste service",
          "curbside garbage collection",
          "commercial dumpster service",
          "roll-off containers Colorado",
          "reliable trash service",
          "weekly garbage pickup",
          "professional waste management"
        ]}
        structuredData={homepageSchema}
      />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" }
      ]} />
      
      <ServiceAreaSchema 
        serviceAreas={serviceAreas}
        serviceTypes={serviceTypes}
      />
      <SitemapGenerator />
      
      <Hero />
      <Services />
      <ServicePlansTable />
      <About />
      <Testimonials />
      <CTA />
      <FAQ />
      <ServiceAreaMap />
      <Contact />
    </>
  );
}
