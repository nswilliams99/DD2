
"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Testimonial = Tables<'testimonials'>;

export const useTestimonials = (filters?: {
  featured?: boolean;
  approved?: boolean;
  serviceType?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['testimonials', filters],
    queryFn: async () => {
      let query = supabase
        .from('testimonials')
        .select('*');

      // Apply filters
      if (filters?.approved !== undefined) {
        query = query.eq('is_approved', filters.approved);
      }
      
      if (filters?.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }
      
      if (filters?.serviceType) {
        query = query.eq('service_type', filters.serviceType);
      }

      // Order by featured first, then by creation date
      query = query.order('is_featured', { ascending: false });
      query = query.order('created_at', { ascending: false });

      // Apply limit
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

export const useFeaturedTestimonials = (limit: number = 6) => {
  return useTestimonials({
    featured: true,
    approved: true,
    limit
  });
};

export const useServiceTestimonials = (serviceType: string, limit: number = 3) => {
  return useTestimonials({
    serviceType,
    approved: true,
    limit
  });
};
