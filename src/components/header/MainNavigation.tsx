
import { Menu, X } from 'lucide-react';
import DesktopMenu from './DesktopMenu';
import Image from 'next/image';

interface MainNavigationProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSearchOpen: () => void;
}

const MainNavigation = ({ isMenuOpen, onMenuToggle, onSearchOpen }: MainNavigationProps) => {
  return (
    <nav className="container mx-auto px-4 py-3 md:py-4" role="navigation" aria-label="Main navigation">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <a 
            href="/" 
            className="h-12 md:h-16 w-auto"
            aria-label="Dumpster Diverz - Home page"
          >
            <Image
              src="/lovable-uploads/3a53a43a-17e6-4009-b3ee-ee806c4288fe.png"
              alt="Dumpster Diverz logo - Professional waste management services in Northern Colorado"
              className="h-full w-auto object-contain"
              width={200}
              height={64}
              priority={true}
            />
          </a>
        </div>

        <DesktopMenu onSearchOpen={onSearchOpen} />

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 touch-manipulation"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-professional-dark" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6 text-professional-dark" aria-hidden="true" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default MainNavigation;
