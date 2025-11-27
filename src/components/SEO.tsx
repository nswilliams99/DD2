import Head from 'next/head';
import Script from 'next/script';
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
  noIndex?: boolean;
  noFollow?: boolean;
  includeLocalBusiness?: boolean;
  technicalSEO?: boolean;
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

  const getCanonicalUrl = () => {
    if (canonical) {
      let normalizedCanonical = canonical;
      if (canonical.includes('dumpsterdiverz.com') && !canonical.includes('www.')) {
        normalizedCanonical = canonical.replace('https://dumpsterdiverz.com', 'https://www.dumpsterdiverz.com');
      }
      return normalizedCanonical.replace(/\/$/, '');
    }
    
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(param => {
        url.searchParams.delete(param);
      });
      const pathname = url.pathname.replace(/\/$/, '');
      return `https://www.dumpsterdiverz.com${pathname}${url.search}`;
    }
    
    return 'https://www.dumpsterdiverz.com';
  };
  
  const finalCanonical = getCanonicalUrl();

  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}
        
        <link rel="canonical" href={finalCanonical} />
        
        <meta property="og:title" content={finalOgTitle} />
        <meta property="og:description" content={finalOgDescription} />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="Dumpster Diverz" />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalOgTitle} />
        <meta name="twitter:description" content={finalOgDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        <meta name="twitter:image:alt" content="Dumpster Diverz - Professional Waste Management Services" />
        <meta name="twitter:site" content="@dumpsterdiverz" />
        
        <meta name="author" content="Dumpster Diverz" />
        <meta name="publisher" content="Dumpster Diverz, LLC" />
        <meta name="theme-color" content="hsl(331 92% 47%)" />
        
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Northern Colorado" />
        <meta name="geo.position" content="40.4774;-104.9014" />
        <meta name="ICBM" content="40.4774, -104.9014" />
      </Head>
      
      {structuredData && (
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])
          }}
        />
      )}
      
      <OrganizationSchema />
      {includeLocalBusiness && <EnhancedLocalBusiness />}
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
