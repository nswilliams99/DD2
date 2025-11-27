
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  id: string;
  content: string;
  content_type: string;
  source_url?: string;
  title?: string;
  metadata: Record<string, any>;
  similarity: number;
}

export interface SearchParams {
  query: string;
  contentType?: string;
  threshold?: number;
  limit?: number;
}

export const useSemanticSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: SearchParams) => {
    if (!params.query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      console.log('Searching with params:', params);
      
      const { data, error } = await supabase.functions.invoke('semantic-search', {
        body: {
          query: params.query,
          contentType: params.contentType,
          threshold: params.threshold || 0.7,
          limit: params.limit || 10
        }
      });

      if (error) {
        console.error('Search function error:', error);
        throw new Error(error.message);
      }

      console.log('Search results:', data);
      setResults(data.results || []);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Search error:', err);
      throw err;
    } finally {
      setIsSearching(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    search,
    clearResults,
    isSearching,
    results,
    error
  };
};
