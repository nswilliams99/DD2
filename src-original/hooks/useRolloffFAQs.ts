
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type RolloffFAQ = Tables<'rolloff_faqs'>;
type RolloffFAQInsert = TablesInsert<'rolloff_faqs'>;
type RolloffFAQUpdate = TablesUpdate<'rolloff_faqs'>;

export const useRolloffFAQs = () => {
  return useQuery({
    queryKey: ['rolloff-faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rolloff_faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as RolloffFAQ[];
    },
  });
};

export const useCreateRolloffFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (faq: RolloffFAQInsert) => {
      const { data, error } = await supabase
        .from('rolloff_faqs')
        .insert(faq)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolloff-faqs'] });
    },
  });
};

export const useUpdateRolloffFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: RolloffFAQUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('rolloff_faqs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolloff-faqs'] });
    },
  });
};

export const useDeleteRolloffFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('rolloff_faqs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolloff-faqs'] });
    },
  });
};
