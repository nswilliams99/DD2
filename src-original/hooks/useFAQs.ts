
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type FAQ = Tables<'faqs'>;
type FAQInsert = TablesInsert<'faqs'>;
type FAQUpdate = TablesUpdate<'faqs'>;

export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as FAQ[];
    },
  });
};

export const useCreateFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (faq: FAQInsert) => {
      const { data, error } = await supabase
        .from('faqs')
        .insert(faq)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};

export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: FAQUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};

export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};
