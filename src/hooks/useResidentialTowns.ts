"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type ResidentialTown = Tables<'residential_towns'>;
type ResidentialTownInsert = TablesInsert<'residential_towns'>;
type ResidentialTownUpdate = TablesUpdate<'residential_towns'>;

export const useResidentialTowns = () => {
  return useQuery({
    queryKey: ['residential-towns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residential_towns')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as ResidentialTown[];
    },
  });
};

export const useResidentialTownBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['residential-town', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residential_towns')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as ResidentialTown | null;
    },
    enabled: !!slug,
  });
};

export const useCreateResidentialTown = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (town: ResidentialTownInsert) => {
      const { data, error } = await supabase
        .from('residential_towns')
        .insert(town)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residential-towns'] });
    },
  });
};

export const useUpdateResidentialTown = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ slug, ...updates }: ResidentialTownUpdate & { slug: string }) => {
      const { data, error } = await supabase
        .from('residential_towns')
        .update(updates)
        .eq('slug', slug)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['residential-towns'] });
      queryClient.invalidateQueries({ queryKey: ['residential-town', data.slug] });
    },
  });
};

export const useDeleteResidentialTown = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase
        .from('residential_towns')
        .delete()
        .eq('slug', slug);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residential-towns'] });
    },
  });
};
