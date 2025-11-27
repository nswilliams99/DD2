
import { useState, useCallback, useEffect } from 'react';
import { useSemanticSearch } from './useSemanticSearch';
import { useServices } from './useServices';
import { useFAQs } from './useFAQs';
import { useKBArticles } from './useKnowledgeBase';
import { useTestimonials } from './useTestimonials';
import { useSearchAnalytics } from './useSearchAnalytics';
import { useResidentialTowns } from './useResidentialTowns';
import { useRolloffTowns } from './useRolloffTowns';
import { useCommercialSizes } from './useCommercialSizes';
import { useRolloffSizes } from './useRolloffSizes';

export interface EnhancedSearchResult {
  id: string;
  title: string;
  content: string;
  contentType: 'service' | 'faq' | 'kb_article' | 'testimonial' | 'semantic' | 'residential_town' | 'rolloff_town' | 'commercial_size' | 'rolloff_size';
  url?: string;
  similarity?: number;
  metadata?: Record<string, any>;
}

export interface SearchFilters {
  contentTypes: string[];
  sortBy: 'relevance' | 'date' | 'popularity';
}

export const useEnhancedSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    contentTypes: [],
    sortBy: 'relevance'
  });
  const [results, setResults] = useState<EnhancedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);

  const { search: semanticSearch, isSearching: isSemanticSearching } = useSemanticSearch();
  const { data: services } = useServices();
  const { data: faqs } = useFAQs();
  const { data: articles } = useKBArticles();
  const { data: testimonials } = useTestimonials({ approved: true });
  const { data: residentialTowns } = useResidentialTowns();
  const { data: rolloffTowns } = useRolloffTowns();
  const { data: commercialSizes } = useCommercialSizes();
  const { data: rolloffSizes } = useRolloffSizes();
  const { trackSearch, trackResultClick } = useSearchAnalytics();

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
    
    const savedPopular = localStorage.getItem('popularQueries');
    if (savedPopular) {
      setPopularQueries(JSON.parse(savedPopular));
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 10);
    setSearchHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
    
    // Track popular queries
    const queryCount = JSON.parse(localStorage.getItem('queryCount') || '{}');
    queryCount[searchQuery] = (queryCount[searchQuery] || 0) + 1;
    localStorage.setItem('queryCount', JSON.stringify(queryCount));
    
    // Update popular queries
    const sorted = Object.entries(queryCount)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([query]) => query);
    setPopularQueries(sorted);
    localStorage.setItem('popularQueries', JSON.stringify(sorted));
  }, [searchHistory]);

  const searchLocalContent = useCallback((searchQuery: string): EnhancedSearchResult[] => {
    if (!searchQuery.trim()) return [];

    const localResults: EnhancedSearchResult[] = [];
    const queryLower = searchQuery.toLowerCase();

    // Search services
    if (!filters.contentTypes.length || filters.contentTypes.includes('service')) {
      services?.forEach(service => {
        const relevance = (
          (service.title.toLowerCase().includes(queryLower) ? 2 : 0) +
          (service.description?.toLowerCase().includes(queryLower) ? 1 : 0) +
          (service.content?.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: service.id,
            title: service.title,
            content: service.description || service.content || '',
            contentType: 'service',
            url: `/services/${service.slug}`,
            metadata: { relevance, type: 'Service' }
          });
        }
      });
    }

    // Search FAQs
    if (!filters.contentTypes.length || filters.contentTypes.includes('faq')) {
      faqs?.forEach(faq => {
        const relevance = (
          (faq.question.toLowerCase().includes(queryLower) ? 2 : 0) +
          (faq.answer.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
            contentType: 'faq',
            metadata: { relevance, type: 'FAQ', category: faq.category }
          });
        }
      });
    }

    // Search Knowledge Base articles
    if (!filters.contentTypes.length || filters.contentTypes.includes('kb_article')) {
      articles?.forEach(article => {
        const relevance = (
          (article.title.toLowerCase().includes(queryLower) ? 2 : 0) +
          (article.excerpt?.toLowerCase().includes(queryLower) ? 1 : 0) +
          (article.content.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: article.id,
            title: article.title,
            content: article.excerpt || article.content,
            contentType: 'kb_article',
            url: `/help/${article.slug}`,
            metadata: { relevance, type: 'Knowledge Base' }
          });
        }
      });
    }

    // Search testimonials
    if (!filters.contentTypes.length || filters.contentTypes.includes('testimonial')) {
      testimonials?.forEach(testimonial => {
        const relevance = (
          (testimonial.customer_name.toLowerCase().includes(queryLower) ? 1 : 0) +
          (testimonial.content.toLowerCase().includes(queryLower) ? 2 : 0) +
          (testimonial.service_type?.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: testimonial.id,
            title: `Review by ${testimonial.customer_name}`,
            content: testimonial.content,
            contentType: 'testimonial',
            metadata: { 
              relevance, 
              type: 'Testimonial', 
              rating: testimonial.rating,
              serviceType: testimonial.service_type 
            }
          });
        }
      });
    }

    // Search residential towns
    if (!filters.contentTypes.length || filters.contentTypes.includes('residential_town')) {
      residentialTowns?.forEach(town => {
        const relevance = (
          (town.name.toLowerCase().includes(queryLower) ? 3 : 0) +
          (town.local_blurb?.toLowerCase().includes(queryLower) ? 2 : 0) +
          (town.meta_description?.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: town.id,
            title: `${town.name} Residential Service`,
            content: town.local_blurb || town.meta_description || `Residential waste management services in ${town.name}, ${town.state}`,
            contentType: 'residential_town',
            metadata: { 
              relevance, 
              type: 'Residential Service', 
              name: town.name,
              slug: town.slug,
              state: town.state
            }
          });
        }
      });
    }

    // Search rolloff towns
    if (!filters.contentTypes.length || filters.contentTypes.includes('rolloff_town')) {
      rolloffTowns?.forEach(town => {
        const relevance = (
          (town.name.toLowerCase().includes(queryLower) ? 3 : 0) +
          (town.local_blurb?.toLowerCase().includes(queryLower) ? 2 : 0) +
          (town.meta_description?.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: town.id,
            title: `${town.name} Rolloff Service`,
            content: town.local_blurb || town.meta_description || `Rolloff dumpster rentals in ${town.name}, ${town.state}`,
            contentType: 'rolloff_town',
            metadata: { 
              relevance, 
              type: 'Rolloff Service', 
              name: town.name,
              slug: town.slug,
              state: town.state
            }
          });
        }
      });
    }

    // Search commercial sizes
    if (!filters.contentTypes.length || filters.contentTypes.includes('commercial_size')) {
      commercialSizes?.forEach(size => {
        const relevance = (
          (size.title.toLowerCase().includes(queryLower) ? 3 : 0) +
          (size.size_label.toLowerCase().includes(queryLower) ? 2 : 0) +
          (size.description.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: size.id,
            title: `${size.size_label} Commercial Dumpster`,
            content: size.description,
            contentType: 'commercial_size',
            metadata: { 
              relevance, 
              type: 'Commercial Size', 
              size_label: size.size_label,
              slug: `${size.size_value}-yard`
            }
          });
        }
      });
    }

    // Search rolloff sizes
    if (!filters.contentTypes.length || filters.contentTypes.includes('rolloff_size')) {
      rolloffSizes?.forEach(size => {
        const relevance = (
          (size.size_label.toLowerCase().includes(queryLower) ? 3 : 0) +
          (size.description?.toLowerCase().includes(queryLower) ? 2 : 0) +
          (size.detailed_description?.toLowerCase().includes(queryLower) ? 1 : 0) +
          (size.ideal_for?.toLowerCase().includes(queryLower) ? 1 : 0)
        );
        
        if (relevance > 0) {
          localResults.push({
            id: size.id?.toString() || 'unknown',
            title: `${size.size_label} Rolloff Dumpster`,
            content: size.description || size.detailed_description || size.ideal_for || '',
            contentType: 'rolloff_size',
            metadata: { 
              relevance, 
              type: 'Rolloff Size', 
              size_label: size.size_label,
              slug: size.slug
            }
          });
        }
      });
    }

    return localResults;
  }, [services, faqs, articles, testimonials, residentialTowns, rolloffTowns, commercialSizes, rolloffSizes, filters.contentTypes]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    saveToHistory(searchQuery);

    try {
      // Get local content results
      const localResults = searchLocalContent(searchQuery);

      // Get semantic search results
      let semanticResults: EnhancedSearchResult[] = [];
      try {
        const semanticData = await semanticSearch({
          query: searchQuery,
          threshold: 0.6,
          limit: 5
        });

        semanticResults = semanticData?.results?.map(result => ({
          id: result.id,
          title: result.title || 'Semantic Result',
          content: result.content,
          contentType: 'semantic' as const,
          url: result.source_url,
          similarity: result.similarity,
          metadata: { type: 'Semantic Search', ...result.metadata }
        })) || [];
      } catch (error) {
        // Fallback to local search only
      }

      // Combine and sort results
      const allResults = [...localResults, ...semanticResults];
      
      // Sort by relevance, similarity, or date
      allResults.sort((a, b) => {
        if (filters.sortBy === 'relevance') {
          const aScore = a.similarity || a.metadata?.relevance || 0;
          const bScore = b.similarity || b.metadata?.relevance || 0;
          return bScore - aScore;
        }
        return 0; // Default order
      });

      const finalResults = allResults.slice(0, 20); // Limit to 20 results
      setResults(finalResults);
      
      // Track search analytics
      trackSearch(searchQuery, finalResults.length);
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      trackSearch(searchQuery, 0);
    } finally {
      setIsSearching(false);
    }
  }, [searchLocalContent, semanticSearch, filters.sortBy, saveToHistory, trackSearch]);

  const getSuggestions = useCallback((partial: string): string[] => {
    if (!partial.trim()) return popularQueries;
    
    const suggestions = searchHistory
      .filter(query => query.toLowerCase().includes(partial.toLowerCase()))
      .slice(0, 5);
    
    return suggestions.length ? suggestions : popularQueries.slice(0, 3);
  }, [searchHistory, popularQueries]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  const handleResultClick = useCallback((result: EnhancedSearchResult) => {
    trackResultClick(query, {
      contentType: result.contentType,
      title: result.title,
      url: result.url
    });
  }, [query, trackResultClick]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    isSearching: isSearching || isSemanticSearching,
    searchHistory,
    popularQueries,
    performSearch,
    getSuggestions,
    clearHistory,
    handleResultClick
  };
};
