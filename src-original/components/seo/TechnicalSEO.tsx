import { Helmet } from 'react-helmet-async';

interface TechnicalSEOProps {
  noIndex?: boolean;
  noFollow?: boolean;
  noSnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  hreflang?: Array<{ lang: string; url: string }>;
  alternateFormats?: Array<{ type: string; url: string }>;
}

const TechnicalSEO = ({
  noIndex = false,
  noFollow = false,
  noSnippet = false,
  maxSnippet,
  maxImagePreview = 'large',
  maxVideoPreview,
  hreflang = [],
  alternateFormats = []
}: TechnicalSEOProps) => {
  // Build robots content
  const robotsDirectives = [];
  if (noIndex) robotsDirectives.push('noindex');
  else robotsDirectives.push('index');
  
  if (noFollow) robotsDirectives.push('nofollow');
  else robotsDirectives.push('follow');
  
  if (noSnippet) robotsDirectives.push('nosnippet');
  if (maxSnippet) robotsDirectives.push(`max-snippet:${maxSnippet}`);
  if (maxImagePreview) robotsDirectives.push(`max-image-preview:${maxImagePreview}`);
  if (maxVideoPreview) robotsDirectives.push(`max-video-preview:${maxVideoPreview}`);

  const robotsContent = robotsDirectives.join(', ');

  return (
    <Helmet>
      {/* Ensure HTML lang attribute */}
      <html lang="en" />
      
      {/* Advanced Robots Meta */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Publisher Information */}
      <meta name="publisher" content="Dumpster Diverz, LLC" />
      <meta property="article:publisher" content="https://www.dumpsterdiverz.com" />
      
      {/* Hreflang for multi-language support */}
      {hreflang.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Alternate formats */}
      {alternateFormats.map(({ type, url }) => (
        <link key={type} rel="alternate" type={type} href={url} />
      ))}
      
      {/* Advanced Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dumpster Diverz" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Resource Hints for Performance */}
      <link rel="dns-prefetch" href="//www.google.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preload critical resources */}
      <link rel="modulepreload" href="/src/main.tsx" />
    </Helmet>
  );
};

export default TechnicalSEO;