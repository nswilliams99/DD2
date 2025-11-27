import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SitemapUrl {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

const SitemapXML = () => {
  const [sitemap, setSitemap] = useState<string>('');

  useEffect(() => {
    const generateSitemap = async () => {
      const baseUrl = 'https://www.dumpsterdiverz.com';
      const currentDate = new Date().toISOString().split('T')[0];

      try {
        // Fetch dynamic data
        const [rolloffTownsResult, residentialTownsResult, rolloffSizesResult] = await Promise.all([
          supabase.from('rolloff_towns').select('slug, updated_at').eq('is_active', true),
          supabase.from('residential_towns').select('slug, updated_at').eq('is_active', true),
          supabase.from('rolloff_sizes').select('slug, updated_at')
        ]);

        const sitemapUrls: SitemapUrl[] = [
          // Core pages
          { url: `${baseUrl}/`, priority: 1.0, changefreq: 'daily', lastmod: currentDate },
          { url: `${baseUrl}/about`, priority: 0.8, changefreq: 'weekly' },
          { url: `${baseUrl}/contact`, priority: 0.7, changefreq: 'monthly' },
          { url: `${baseUrl}/services`, priority: 0.9, changefreq: 'weekly' },
          
          // Service pages
          { url: `${baseUrl}/residential`, priority: 0.9, changefreq: 'weekly' },
          { url: `${baseUrl}/commercial`, priority: 0.9, changefreq: 'weekly' },
          { url: `${baseUrl}/roll-off-dumpsters`, priority: 0.9, changefreq: 'weekly' },
          
          // Commercial size pages
          { url: `${baseUrl}/commercial/2-yard`, priority: 0.8, changefreq: 'weekly' },
          { url: `${baseUrl}/commercial/3-yard`, priority: 0.8, changefreq: 'weekly' },
          { url: `${baseUrl}/commercial/4-yard`, priority: 0.8, changefreq: 'weekly' },
          { url: `${baseUrl}/commercial/6-yard`, priority: 0.8, changefreq: 'weekly' },
          { url: `${baseUrl}/commercial/8-yard`, priority: 0.8, changefreq: 'weekly' },
          
          // Utility pages
          { url: `${baseUrl}/help`, priority: 0.7, changefreq: 'weekly' },
          { url: `${baseUrl}/pay-my-bill`, priority: 0.5, changefreq: 'monthly' },
          { url: `${baseUrl}/privacy-policy`, priority: 0.3, changefreq: 'yearly' },
          { url: `${baseUrl}/terms-of-service`, priority: 0.3, changefreq: 'yearly' }
        ];

        // Add residential town pages
        residentialTownsResult.data?.forEach(town => {
          sitemapUrls.push({
            url: `${baseUrl}/residential/${town.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: town.updated_at?.split('T')[0] || currentDate
          });
        });

        // Add rolloff town pages
        rolloffTownsResult.data?.forEach(town => {
          sitemapUrls.push({
            url: `${baseUrl}/rolloffs/${town.slug}`,
            priority: 0.7,
            changefreq: 'weekly',
            lastmod: town.updated_at?.split('T')[0] || currentDate
          });
        });

        // Add rolloff size pages
        rolloffSizesResult.data?.forEach(size => {
          if (size.slug) {
            sitemapUrls.push({
              url: `${baseUrl}/rolloffs/sizes/${size.slug}`,
              priority: 0.6,
              changefreq: 'monthly',
              lastmod: size.updated_at?.split('T')[0] || currentDate
            });
          }
        });

        // Generate XML sitemap
        const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        setSitemap(xmlSitemap);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateSitemap();
  }, []);

  // Set content type for XML
  useEffect(() => {
    if (sitemap) {
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Download or display the sitemap
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      
      // Store in sessionStorage for access
      sessionStorage.setItem('generatedSitemap', sitemap);
    }
  }, [sitemap]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">XML Sitemap Generator</h1>
      <p className="mb-4">Dynamic sitemap generated with current data from the database.</p>
      
      {sitemap ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated Sitemap:</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
            {sitemap}
          </pre>
          <div className="mt-4">
            <button
              onClick={() => {
                const blob = new Blob([sitemap], { type: 'application/xml' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'sitemap.xml';
                link.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
            >
              Download Sitemap
            </button>
          </div>
        </div>
      ) : (
        <p>Generating sitemap...</p>
      )}
    </div>
  );
};

export default SitemapXML;