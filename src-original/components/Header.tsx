
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EnhancedSearchModal from './EnhancedSearchModal';
import TopBar from './header/TopBar';
import MainNavigation from './header/MainNavigation';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAdminMode, setShowAdminMode] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const adminParam = searchParams.get('admin');
    const storedAdminMode = localStorage.getItem('adminMode');
    
    if (adminParam === 'true') {
      setShowAdminMode(true);
      localStorage.setItem('adminMode', 'true');
    } else if (storedAdminMode === 'true') {
      setShowAdminMode(true);
    }
  }, [searchParams]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="bg-background shadow-sm relative z-50" role="banner">
        <TopBar showAdminMode={showAdminMode} />
        <MainNavigation
          isMenuOpen={isMenuOpen}
          onMenuToggle={toggleMenu}
          onSearchOpen={openSearch}
        />
        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={closeMenu}
          onSearchOpen={openSearch}
        />
      </header>

      <EnhancedSearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Header;
