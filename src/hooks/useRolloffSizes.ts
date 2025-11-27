"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface RolloffSize {
  id: number;
  size_label: string;
  cubic_yards: number;
  hero_image_url: string;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  slug?: string;
  dimensions?: string;
  weight_limit?: string;
  pricing_range?: string;
  use_cases?: string[];
  detailed_description?: string;
  ideal_for?: string;
  meta_title?: string;
  meta_description?: string;
  seo_keywords?: string[];
  specifications?: any;
}

export const useRolloffSizes = () => {
  return useQuery({
    queryKey: ['rolloff-sizes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rolloff_sizes')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as RolloffSize[];
    },
  });
};
