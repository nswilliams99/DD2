import { useCallback, useEffect } from 'react';

interface SearchEvent {
  query: string;
  resultCount: number;
  timestamp: number;
  selectedResult?: {
    contentType: string;
    title: string;
    url?: string;
  };
}

export const useSearchAnalytics = () => {
  // Track search query
  const trackSearch = useCallback((query: string, resultCount: number) => {
    const event: SearchEvent = {
      query,
      resultCount,
      timestamp: Date.now()
    };
    
    // Store in localStorage for now (could be sent to analytics service)
    const searches = JSON.parse(localStorage.getItem('searchAnalytics') || '[]');
    searches.push(event);
    
    // Keep only last 100 searches
    if (searches.length > 100) {
      searches.splice(0, searches.length - 100);
    }
    
    localStorage.setItem('searchAnalytics', JSON.stringify(searches));
    
    
  }, []);

  // Track result click
  const trackResultClick = useCallback((query: string, result: { contentType: string; title: string; url?: string }) => {
    const event: SearchEvent = {
      query,
      resultCount: 0,
      timestamp: Date.now(),
      selectedResult: result
    };
    
    const clicks = JSON.parse(localStorage.getItem('searchClicks') || '[]');
    clicks.push(event);
    
    // Keep only last 50 clicks
    if (clicks.length > 50) {
      clicks.splice(0, clicks.length - 50);
    }
    
    localStorage.setItem('searchClicks', JSON.stringify(clicks));
    
    
  }, []);

  // Get search insights
  const getSearchInsights = useCallback(() => {
    const searches = JSON.parse(localStorage.getItem('searchAnalytics') || '[]');
    const clicks = JSON.parse(localStorage.getItem('searchClicks') || '[]');
    
    // Get most common queries
    const queryCount: Record<string, number> = {};
    searches.forEach((search: SearchEvent) => {
      queryCount[search.query] = (queryCount[search.query] || 0) + 1;
    });
    
    const topQueries = Object.entries(queryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
    
    // Get queries with no results
    const noResultQueries = searches
      .filter((search: SearchEvent) => search.resultCount === 0)
      .map((search: SearchEvent) => search.query);
    
    // Get click-through rates by content type
    const contentTypeClicks: Record<string, number> = {};
    clicks.forEach((click: SearchEvent) => {
      if (click.selectedResult) {
        const type = click.selectedResult.contentType;
        contentTypeClicks[type] = (contentTypeClicks[type] || 0) + 1;
      }
    });
    
    return {
      totalSearches: searches.length,
      totalClicks: clicks.length,
      topQueries,
      noResultQueries: [...new Set(noResultQueries)],
      contentTypeClicks,
      averageResultsPerSearch: searches.length > 0 
        ? searches.reduce((sum: number, search: SearchEvent) => sum + search.resultCount, 0) / searches.length 
        : 0
    };
  }, []);

  // Clear analytics data
  const clearAnalytics = useCallback(() => {
    localStorage.removeItem('searchAnalytics');
    localStorage.removeItem('searchClicks');
  }, []);

  return {
    trackSearch,
    trackResultClick,
    getSearchInsights,
    clearAnalytics
  };
};
