
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, Search, Mail } from 'lucide-react';
import EnhancedSearchModal from './EnhancedSearchModal';
import FocusTrap from 'focus-trap-react';

const AccessibleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Return focus to menu button when closing
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 100);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    // Return focus to search button when closing
    setTimeout(() => {
      searchButtonRef.current?.focus();
    }, 100);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          closeMenu();
        }
        if (isSearchOpen) {
          closeSearch();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isSearchOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-background shadow-sm relative z-50" role="banner">
        {/* Top bar with improved contrast */}
        <div className="bg-professional-dark text-white py-2 md:py-3">
          <div className="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Desktop: Show phone on left */}
              <a 
                href="tel:970-888-7274" 
                className="hidden md:flex items-center space-x-2 text-white hover:text-diverz-purple-light motion-safe:transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-professional-dark rounded"
                aria-label="Call Dumpster Diverz at 970-888-7274"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">970-888-7274</span>
              </a>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Mobile: Phone on right */}
              <div className="md:hidden"></div>
              <a 
                href="tel:970-888-7274" 
                className="md:hidden flex items-center space-x-2 text-white hover:text-diverz-purple-light motion-safe:transition-colors motion-reduce:transition-none touch-manipulation py-1 px-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-professional-dark rounded"
                aria-label="Call Dumpster Diverz at 970-888-7274"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">Call Us</span>
              </a>
            </div>
            <div className="hidden lg:block">
              <span className="font-medium text-white">Serving Windsor, Fort Collins, Wellington & Northern Colorado</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-4 py-3 md:py-4" role="navigation" aria-label="Main navigation">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <a 
                href="/" 
                className="h-12 md:h-16 w-auto focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded"
                aria-label="Dumpster Diverz - Home page"
              >
                <img
                  src="/lovable-uploads/3a53a43a-17e6-4009-b3ee-ee806c4288fe.png"
                  alt="Dumpster Diverz logo - Professional waste management services in Northern Colorado"
                  className="h-full w-auto object-contain"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-professional-dark hover:text-diverz-purple motion-safe:transition-colors motion-reduce:transition-none font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded px-2 py-1"
              >
                Home
              </a>
              <div className="relative group">
                <button 
                  className="text-professional-dark hover:text-diverz-purple motion-safe:transition-colors motion-reduce:transition-none font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded px-2 py-1"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-label="Services menu"
                >
                  Services
                </button>
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none z-50" 
                  role="menu"
                  aria-label="Services submenu"
                >
                  <a 
                    href="/residential" 
                    className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium focus:outline-none focus:bg-professional-light focus:text-diverz-purple" 
                    role="menuitem"
                  >
                    Residential Service
                  </a>
                  <a 
                    href="/commercial" 
                    className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium focus:outline-none focus:bg-professional-light focus:text-diverz-purple" 
                    role="menuitem"
                  >
                    Commercial Service
                  </a>
                  <a 
                    href="/roll-off-dumpsters" 
                    className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium focus:outline-none focus:bg-professional-light focus:text-diverz-purple" 
                    role="menuitem"
                  >
                    Roll-Off Dumpsters
                  </a>
                </div>
              </div>
              <a 
                href="#about" 
                className="text-professional-dark hover:text-diverz-purple motion-safe:transition-colors motion-reduce:transition-none font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded px-2 py-1"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-professional-dark hover:text-diverz-purple motion-safe:transition-colors motion-reduce:transition-none font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded px-2 py-1"
              >
                Contact
              </a>
              <button 
                ref={searchButtonRef}
                onClick={openSearch}
                className="text-professional-dark hover:text-diverz-purple motion-safe:transition-colors motion-reduce:transition-none font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded px-2 py-1"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                Search
              </button>
              <Button 
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white px-6 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-diverz-purple motion-safe:transition-colors motion-reduce:transition-none"
                aria-label="Get free quote for waste management services"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              ref={menuButtonRef}
              className="lg:hidden p-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded"
              onClick={toggleMenu}
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

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu with Focus Trap */}
          {isMenuOpen && (
            <FocusTrap>
              <div 
                id="mobile-menu"
                className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out motion-reduce:transition-none z-50"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <a href="/" className="h-10 w-auto" onClick={closeMenu}>
                      <img
                        src="/lovable-uploads/3a53a43a-17e6-4009-b3ee-ee806c4288fe.png"
                        alt="Dumpster Diverz"
                        className="h-full w-auto object-contain"
                      />
                    </a>
                    <button 
                      className="p-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2 rounded"
                      onClick={closeMenu}
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6 text-professional-dark" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex flex-col flex-1 py-6">
                    <div className="flex flex-col space-y-1 px-4">
                      <a 
                        href="/" 
                        className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none font-medium text-lg py-4 px-4 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                        onClick={closeMenu}
                      >
                        Home
                      </a>
                      <div className="px-4 py-2">
                        <span className="text-professional-dark font-semibold text-lg">Services</span>
                        <div className="mt-2 ml-4 space-y-1">
                          <a 
                            href="/residential" 
                            className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none py-3 px-4 rounded-lg touch-manipulation font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                            onClick={closeMenu}
                          >
                            Residential
                          </a>
                          <a 
                            href="/commercial" 
                            className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none py-3 px-4 rounded-lg touch-manipulation font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                            onClick={closeMenu}
                          >
                            Commercial
                          </a>
                          <a 
                            href="/roll-off-dumpsters" 
                            className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none py-3 px-4 rounded-lg touch-manipulation font-medium focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                            onClick={closeMenu}
                          >
                            Roll-Off
                          </a>
                        </div>
                      </div>
                      <a 
                        href="#about" 
                        className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none font-medium text-lg py-4 px-4 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                        onClick={closeMenu}
                      >
                        About
                      </a>
                      <a 
                        href="#contact" 
                        className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none font-medium text-lg py-4 px-4 rounded-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                        onClick={closeMenu}
                      >
                        Contact
                      </a>
                      <button 
                        onClick={() => {
                          closeMenu();
                          openSearch();
                        }}
                        className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light motion-safe:transition-colors motion-reduce:transition-none font-medium text-lg py-4 px-4 rounded-lg touch-manipulation flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-diverz-purple focus:ring-offset-2"
                      >
                        <Search className="w-5 h-5" aria-hidden="true" />
                        Search
                      </button>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="mt-auto px-4 py-6 border-t border-gray-200">
                      <Button 
                        className="bg-diverz-purple hover:bg-diverz-purple-dark text-white w-full text-lg py-4 touch-manipulation font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-diverz-purple motion-safe:transition-colors motion-reduce:transition-none"
                        onClick={closeMenu}
                      >
                        Get Quote
                      </Button>
                      
                      {/* Contact info in mobile menu */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center space-x-3 text-professional-dark">
                          <Phone className="h-5 w-5 text-diverz-purple" aria-hidden="true" />
                          <span className="text-base font-medium">970-888-7274</span>
                        </div>
                        <div className="flex items-center space-x-3 text-professional-dark">
                          <Mail className="h-5 w-5 text-diverz-purple" aria-hidden="true" />
                          <span className="text-base font-medium">dumpsterdiverz@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FocusTrap>
          )}
        </nav>
      </header>

      <EnhancedSearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default AccessibleHeader;
