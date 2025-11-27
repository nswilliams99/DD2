import Head from 'next/head';

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
  const robotsDirectives: string[] = [];
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
    <Head>
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <meta name="publisher" content="Dumpster Diverz, LLC" />
      <meta property="article:publisher" content="https://www.dumpsterdiverz.com" />
      {hreflang.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      {alternateFormats.map(({ type, url }) => (
        <link key={type} rel="alternate" type={type} href={url} />
      ))}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dumpster Diverz" />
    </Head>
  );
};

export default TechnicalSEO;
