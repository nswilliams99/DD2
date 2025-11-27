
import { Helmet } from 'react-helmet-async';
import EnhancedLocalBusiness from './seo/EnhancedLocalBusiness';
import TechnicalSEO from './seo/TechnicalSEO';
import OrganizationSchema from './seo/OrganizationSchema';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any | any[];
  canonical?: string;
  // Advanced SEO options
  noIndex?: boolean;
  noFollow?: boolean;
  includeLocalBusiness?: boolean;
  technicalSEO?: boolean;
  // Schema injection options
  pageType?: 'residential' | 'rolloff' | 'commercial' | 'hoa';
  pageData?: any;
}

const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  structuredData,
  canonical,
  noIndex = false,
  noFollow = false,
  includeLocalBusiness = true,
  technicalSEO = true,
  pageType,
  pageData
}: SEOProps) => {
  const defaultTitle = "Dumpster Diverz - Waste Management Services in Northern Colorado";
  const defaultDescription = "Professional dumpster rental and waste management services in Windsor, Fort Collins, Wellington. Residential trash pickup, commercial dumpsters, and roll-off containers.";
  const defaultImage = "/lovable-uploads/91df8bdb-05c3-437e-a0be-bec01d76ebeb.png";
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage = ogImage || defaultImage;

  // Ensure canonical URL is properly formatted - force HTTPS and www, strip UTM params, normalize trailing slashes
  const getCanonicalUrl = () => {
    if (canonical) {
      // Normalize provided canonical to ensure www prefix and no trailing slash
      let normalizedCanonical = canonical;
      if (canonical.includes('dumpsterdiverz.com') && !canonical.includes('www.')) {
        normalizedCanonical = canonical.replace('https://dumpsterdiverz.com', 'https://www.dumpsterdiverz.com');
      }
      // Remove trailing slash to prevent duplicates
      return normalizedCanonical.replace(/\/$/, '');
    }
    
    // Generate canonical from current location, stripping UTM parameters and trailing slashes
    const url = new URL(window.location.href);
    // Remove UTM and other tracking parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(param => {
      url.searchParams.delete(param);
    });
    
    // Force www and https, remove trailing slash
    const pathname = url.pathname.replace(/\/$/, '');
    return `https://www.dumpsterdiverz.com${pathname}${url.search}`;
  };
  
  const finalCanonical = getCanonicalUrl();

  return (
    <>
      <Helmet>
        {/* Critical Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cgizicrrzdbzvfniffhw.supabase.co" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* LCP Image Preload for Commercial Pages */}
        {window.location.pathname.includes('/commercial/') && (
          <>
            <link 
              rel="preconnect" 
              href="https://images.unsplash.com"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="//images.unsplash.com" />
          </>
        )}
        
        {/* Basic Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}
        
        {/* Canonical URL - Self-canonical */}
        <link rel="canonical" href={finalCanonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={finalOgTitle} />
        <meta property="og:description" content={finalOgDescription} />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="Dumpster Diverz" />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalOgTitle} />
        <meta name="twitter:description" content={finalOgDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        <meta name="twitter:image:alt" content="Dumpster Diverz - Professional Waste Management Services" />
        <meta name="twitter:site" content="@dumpsterdiverz" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Dumpster Diverz" />
        <meta name="publisher" content="Dumpster Diverz, LLC" />
        <meta property="article:publisher" content="https://www.dumpsterdiverz.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="hsl(331 92% 47%)" />
        
        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Northern Colorado" />
        <meta name="geo.position" content="40.4774;-104.9014" />
        <meta name="ICBM" content="40.4774, -104.9014" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:street_address" content="Wellington, CO" />
        <meta name="business:contact_data:locality" content="Wellington" />
        <meta name="business:contact_data:region" content="Colorado" />
        <meta name="business:contact_data:postal_code" content="80549" />
        <meta name="business:contact_data:country_name" content="United States" />
        <meta name="business:contact_data:phone_number" content="970-888-7274" />
        <meta name="business:contact_data:email" content="dumpsterdiverz@gmail.com" />
        
        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
          </script>
        )}
      </Helmet>
      
      {/* Organization Schema - Always Include */}
      <OrganizationSchema />
      
      {/* Enhanced Local Business Schema */}
      {includeLocalBusiness && <EnhancedLocalBusiness />}
      
      {/* Technical SEO Optimizations */}
      {technicalSEO && (
        <TechnicalSEO 
          noIndex={noIndex} 
          noFollow={noFollow}
          maxImagePreview="large"
        />
      )}
    </>
  );
};

export default SEO;
