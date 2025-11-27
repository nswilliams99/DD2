
import { Helmet } from 'react-helmet-async';

interface SEOOptimizerProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  h1Text?: string;
  pageType?: 'service' | 'location' | 'calculator' | 'about' | 'contact';
  locationData?: {
    city?: string;
    state?: string;
  };
  structuredData?: any[];
}

const SEOOptimizer = ({
  title,
  description,
  canonical,
  keywords = [],
  h1Text,
  pageType,
  locationData,
  structuredData = []
}: SEOOptimizerProps) => {
  // Generate enhanced keywords based on page type and location
  const generateEnhancedKeywords = () => {
    const baseKeywords = [...keywords];
    
    if (locationData?.city) {
      baseKeywords.push(
        `${locationData.city} dumpster rental`,
        `${locationData.city} waste management`,
        `${locationData.city} trash service`
      );
    }
    
    if (pageType === 'service') {
      baseKeywords.push('professional waste service', 'local dumpster company');
    }
    
    return baseKeywords.filter(Boolean).slice(0, 10); // Limit to 10 keywords
  };

  const enhancedKeywords = generateEnhancedKeywords();

  return (
    <Helmet>
      {/* Enhanced Title Structure */}
      <title>{title}</title>
      
      {/* Meta Description with proper length */}
      <meta 
        name="description" 
        content={description.length > 160 ? `${description.substring(0, 157)}...` : description} 
      />
      
      {/* Enhanced Keywords */}
      {enhancedKeywords.length > 0 && (
        <meta name="keywords" content={enhancedKeywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Geographic Meta Tags */}
      {locationData?.city && locationData?.state && (
        <>
          <meta name="geo.region" content={`US-${locationData.state}`} />
          <meta name="geo.placename" content={locationData.city} />
        </>
      )}
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Structured Data */}
      {structuredData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOOptimizer;
