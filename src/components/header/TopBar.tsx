
import { Phone } from 'lucide-react';

interface TopBarProps {
  showAdminMode?: boolean;
}

const TopBar = ({ showAdminMode }: TopBarProps) => {
  return (
    <div className="bg-professional-dark text-white py-2 md:py-3">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop: Show phone on left */}
          <a href="tel:970-888-7274" className="hidden md:flex items-center space-x-2 hover:text-diverz-purple-light transition-colors">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">970-888-7274</span>
          </a>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Mobile: Phone on right */}
          <div className="md:hidden"></div>
          <a href="tel:970-888-7274" className="md:hidden flex items-center space-x-2 hover:text-diverz-purple-light transition-colors touch-manipulation py-1 px-2">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">Call Us</span>
          </a>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <span className="font-medium">Serving Windsor, Fort Collins, Wellington & Northern Colorado</span>
          {showAdminMode && (
            <a 
              href="/admin/login" 
              className="text-xs opacity-75 hover:opacity-100 transition-opacity border-l border-white/20 pl-4"
            >
              Admin
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
