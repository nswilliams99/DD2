import { useEffect } from 'react';
import { useServices } from '@/hooks/useServices';
import { useRolloffTowns } from '@/hooks/useRolloffTowns';
import { useResidentialTowns } from '@/hooks/useResidentialTowns';

interface SitemapUrl {
  url: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

const DynamicSitemapGenerator = () => {
  const { data: services } = useServices();
  const { data: rolloffTowns } = useRolloffTowns();
  const { data: residentialTowns } = useResidentialTowns();

  useEffect(() => {
    const generateDynamicSitemap = async () => {
      if (!services || !rolloffTowns || !residentialTowns) return;
      
      const baseUrl = 'https://www.dumpsterdiverz.com';
      const currentDate = new Date().toISOString().split('T')[0];

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
        { url: `${baseUrl}/hoa-services`, priority: 0.8, changefreq: 'weekly' },
        
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
      residentialTowns.forEach(town => {
        sitemapUrls.push({
          url: `${baseUrl}/residential/${town.slug}`,
          priority: 0.7,
          changefreq: 'weekly',
          lastmod: town.updated_at?.split('T')[0] || currentDate
        });
      });

      // Add rolloff town pages - using correct /roll-off-dumpsters/ format
      rolloffTowns.forEach(town => {
        sitemapUrls.push({
          url: `${baseUrl}/roll-off-dumpsters/${town.slug}`,
          priority: 0.7,
          changefreq: 'weekly',
          lastmod: town.updated_at?.split('T')[0] || currentDate
        });
      });

      // Generate XML sitemap content
      const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod || currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Store for development/debugging
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('dynamicXmlSitemap', xmlSitemap);
        sessionStorage.setItem('dynamicSitemapUrls', JSON.stringify(sitemapUrls));
      }
      
      // In a production environment, this would trigger a build-time sitemap generation
      // For now, we're maintaining the static sitemap.xml with core pages
    };

    generateDynamicSitemap();
  }, [services, rolloffTowns, residentialTowns]);

  return null; // This component doesn't render anything
};

export default DynamicSitemapGenerator;
