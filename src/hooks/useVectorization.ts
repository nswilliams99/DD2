
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface VectorizeContentParams {
  content: string;
  contentType: 'page' | 'pdf' | 'image' | 'upload';
  sourceUrl?: string;
  filePath?: string;
  title?: string;
  metadata?: Record<string, any>;
}

export const useVectorization = () => {
  const [isVectorizing, setIsVectorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vectorizeContent = async (params: VectorizeContentParams) => {
    setIsVectorizing(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('vectorize-content', {
        body: params
      });

      if (error) {
        throw new Error(error.message);
      }

      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Vectorization failed';
      setError(errorMessage);
      console.error('Vectorization error:', err);
      throw err;
    } finally {
      setIsVectorizing(false);
    }
  };

  return {
    vectorizeContent,
    isVectorizing,
    error
  };
};
