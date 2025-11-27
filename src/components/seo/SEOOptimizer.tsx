import Head from 'next/head';
import Script from 'next/script';

interface SEOOptimizerProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  h1Text?: string;
  pageType?: 'service' | 'location' | 'calculator' | 'about' | 'contact';
  locationData?: { city?: string; state?: string; };
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
    return baseKeywords.filter(Boolean).slice(0, 10);
  };

  const enhancedKeywords = generateEnhancedKeywords();
  const truncatedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={truncatedDescription} />
        {enhancedKeywords.length > 0 && (
          <meta name="keywords" content={enhancedKeywords.join(', ')} />
        )}
        {canonical && <link rel="canonical" href={canonical} />}
        {locationData?.city && locationData?.state && (
          <>
            <meta name="geo.region" content={`US-${locationData.state}`} />
            <meta name="geo.placename" content={locationData.city} />
          </>
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {canonical && <meta property="og:url" content={canonical} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      {structuredData.length > 0 && (
        <Script
          id="seo-optimizer-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
};

export default SEOOptimizer;
