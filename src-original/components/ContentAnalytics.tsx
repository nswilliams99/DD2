import { useEffect } from 'react';
import { useServices } from '@/hooks/useServices';
import { useKBArticles } from '@/hooks/useKnowledgeBase';

const ContentAnalytics = () => {
  const { data: services } = useServices();
  const { data: articles } = useKBArticles();

  useEffect(() => {
    // Generate sitemap data for SEO
    const generateSitemapData = () => {
      const baseUrls = [
        { url: '/', priority: 1.0, changefreq: 'daily' },
        { url: '/residential', priority: 0.8, changefreq: 'weekly' },
        { url: '/commercial', priority: 0.8, changefreq: 'weekly' },
        { url: '/roll-off', priority: 0.8, changefreq: 'weekly' },
        { url: '/help', priority: 0.7, changefreq: 'weekly' }
      ];

      const serviceUrls = services?.map(service => ({
        url: `/services/${service.slug}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: service.updated_at
      })) || [];

      const articleUrls = articles?.map(article => ({
        url: `/help/${article.slug}`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: article.updated_at
      })) || [];

      const allUrls = [...baseUrls, ...serviceUrls, ...articleUrls];
      
      // Store sitemap data in sessionStorage for potential use
      sessionStorage.setItem('sitemapData', JSON.stringify(allUrls));
    };

    if (services && articles) {
      generateSitemapData();
    }
  }, [services, articles]);

  // Analytics tracking
  useEffect(() => {
    // Track page performance
    const trackPageMetrics = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Analytics data available for monitoring tools
      }
    };

    // Track conversion button clicks
    const trackConversionClicks = () => {
      const trackClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a[data-analytics-event]');
        if (anchor) {
          const eventType = anchor.getAttribute('data-analytics-event');
          const href = anchor.getAttribute('href');
          
          // Track click event for analytics
          if ((window as any).gtag) {
            (window as any).gtag('event', 'click', {
              event_category: 'conversion',
              event_label: eventType,
              value: href
            });
          }
        }
      };

      document.addEventListener('click', trackClick);
      return () => document.removeEventListener('click', trackClick);
    };

    // Track after initial render
    setTimeout(trackPageMetrics, 1000);
    const cleanup = trackConversionClicks();

    return cleanup;
  }, []);

  return null; // This component doesn't render anything
};

export default ContentAnalytics;
