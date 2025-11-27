"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TablesInsert } from '@/integrations/supabase/types';

type RolloffQuoteInsert = TablesInsert<'rolloff_quote_requests'>;

export const useCreateRolloffQuote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (quote: RolloffQuoteInsert) => {
      const { data, error } = await supabase
        .from('rolloff_quote_requests')
        .insert(quote)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolloff-quotes'] });
    },
  });
};
