import React from 'react';
import { cn } from '@/lib/utils';
import { getPlaceholder, type PlaceholderType } from '@/utils/placeholders';

interface OptimizedImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  objectPosition?: string;
  onError?: (e: any) => void;
  onLoad?: () => void;
  placeholderType?: PlaceholderType;
  fallbackSrc?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width,
  height,
  objectFit = 'cover',
  objectPosition,
  onError,
  onLoad,
  placeholderType = 'default',
  fallbackSrc
}: OptimizedImageProps) => {
  // Handle fallback logic
  const finalSrc = src || fallbackSrc || getPlaceholder(placeholderType);
  
  const handleError = (e: any) => {
    // If the current src fails, try the placeholder
    if (e.target.src !== getPlaceholder(placeholderType)) {
      e.target.src = getPlaceholder(placeholderType);
    }
    
    // Call custom onError if provided
    if (onError) {
      onError(e);
    }
  };
  
  // Generate responsive srcset for common breakpoints
  const generateSrcSet = (baseSrc: string) => {
    // For Supabase images, we need to use the render endpoint for transformations
    if (baseSrc.includes('supabase.co/storage')) {
      // Convert object URL to render URL if needed
      let renderUrl = baseSrc;
      
      // If it's an object URL, convert to render URL
      if (baseSrc.includes('/storage/v1/object/public/')) {
        renderUrl = baseSrc.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
      }
      
      // Remove any existing query params
      const baseUrl = renderUrl.split('?')[0];
      
      // Supabase only supports width and quality parameters
      // It will maintain aspect ratio automatically
      return [
        `${baseUrl}?width=400&quality=75 400w`,
        `${baseUrl}?width=768&quality=75 768w`,
        `${baseUrl}?width=1024&quality=80 1024w`,
        `${baseUrl}?width=1280&quality=85 1280w`
      ].join(', ');
    }
    
    // For other images, return the original src
    return baseSrc;
  };
  
  const imageProps = {
    src: finalSrc,
    alt,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    fetchpriority: priority ? 'high' as const : 'auto' as const,
    sizes,
    className: cn(
      'transition-opacity duration-300',
      objectFit === 'cover' && 'object-cover',
      objectFit === 'contain' && 'object-contain',
      objectFit === 'fill' && 'object-fill',
      objectFit === 'scale-down' && 'object-scale-down',
      objectFit === 'none' && 'object-none',
      className
    ),
    style: {
      ...(objectPosition && { objectPosition })
    },
    ...(width && { width }),
    ...(height && { height }),
    onError: handleError,
    ...(onLoad && { onLoad })
  };
  
  // Add srcSet for responsive images
  const srcSet = generateSrcSet(finalSrc);
  if (srcSet !== finalSrc) {
    (imageProps as any).srcSet = srcSet;
  }
  
  return <img {...imageProps} />;
};

export default OptimizedImage;
