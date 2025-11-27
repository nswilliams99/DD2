import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface KBArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

// Stub hook - kb_articles table may not exist yet
export const useKBArticles = () => {
  return useQuery({
    queryKey: ['kb-articles'],
    queryFn: async () => {
      // Return empty array if table doesn't exist
      try {
        const { data, error } = await supabase
          .from('kb_articles')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn('kb_articles table may not exist:', error.message);
          return [] as KBArticle[];
        }
        return data as unknown as KBArticle[];
      } catch {
        return [] as KBArticle[];
      }
    },
  });
};
