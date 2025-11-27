
import { Button } from '@/components/ui/button';
import { X, Search, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/ui/OptimizedImage';
import logoOptimized from '@/assets/dumpster-diverz-logo-optimized.webp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

const MobileMenu = ({ isOpen, onClose, onSearchOpen }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div 
        className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-in-out z-50"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <Link to="/" className="h-10 w-auto" onClick={onClose}>
              <OptimizedImage
                src={logoOptimized}
                alt="Dumpster Diverz"
                className="h-full w-auto object-contain"
                width={150}
                height={40}
                sizes="150px"
              />
            </Link>
            <button 
              className="p-2 touch-manipulation"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-professional-dark" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col flex-1 py-6">
            <div className="flex flex-col space-y-1 px-4">
              <Link
                to="/" 
                className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors font-medium text-lg py-4 px-4 rounded-lg touch-manipulation"
                onClick={onClose}
              >
                Home
              </Link>
              <div className="px-4 py-2">
                <span className="text-professional-dark font-semibold text-lg">Services</span>
                <div className="mt-2 ml-4 space-y-1">
                  <Link
                    to="/residential" 
                    className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors py-3 px-4 rounded-lg touch-manipulation font-medium"
                    onClick={onClose}
                  >
                    Residential
                  </Link>
                  <Link
                    to="/commercial" 
                    className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors py-3 px-4 rounded-lg touch-manipulation font-medium"
                    onClick={onClose}
                  >
                    Commercial
                  </Link>
                  <Link
                    to="/roll-off-dumpsters" 
                    className="block text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors py-3 px-4 rounded-lg touch-manipulation font-medium"
                    onClick={onClose}
                  >
                    Roll-Off
                  </Link>
                </div>
              </div>
              <Link
                to="/about" 
                className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors font-medium text-lg py-4 px-4 rounded-lg touch-manipulation"
                onClick={onClose}
              >
                About
              </Link>
              <Link
                to="/contact" 
                className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors font-medium text-lg py-4 px-4 rounded-lg touch-manipulation"
                onClick={onClose}
              >
                Contact
              </Link>
              <button 
                onClick={() => {
                  onClose();
                  onSearchOpen();
                }}
                className="text-professional-dark hover:text-diverz-purple hover:bg-professional-light transition-colors font-medium text-lg py-4 px-4 rounded-lg touch-manipulation flex items-center gap-2"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Search
              </button>
            </div>

            {/* Mobile Menu Footer */}
            <div className="mt-auto px-4 py-6 border-t border-border">
              <Button 
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white w-full text-lg py-4 touch-manipulation font-semibold"
                onClick={onClose}
                asChild
              >
                <Link to="/contact">Get Quote</Link>
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
    </>
  );
};

export default MobileMenu;
