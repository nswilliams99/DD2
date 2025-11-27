
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'hero' | 'section' | 'subsection';
}

const PageHeading = ({ 
  level, 
  children, 
  className, 
  id,
  variant = 'section'
}: PageHeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return level === 1 
          ? 'text-4xl lg:text-6xl font-bold leading-tight font-poppins'
          : 'text-3xl lg:text-4xl font-bold font-poppins';
      case 'section':
        return level === 2 
          ? 'text-3xl lg:text-4xl font-bold text-professional-dark font-poppins'
          : 'text-2xl lg:text-3xl font-bold text-professional-dark font-poppins';
      case 'subsection':
        return 'text-xl lg:text-2xl font-semibold text-professional-dark font-poppins';
      default:
        return 'text-xl font-semibold text-professional-dark font-poppins';
    }
  };

  return (
    <HeadingTag 
      id={id}
      className={cn(getVariantStyles(), className)}
    >
      {children}
    </HeadingTag>
  );
};

export default PageHeading;
