
import React from 'react';

const SkipLink = () => {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-primary text-white px-4 py-2 font-semibold rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-all duration-200 font-inter"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
