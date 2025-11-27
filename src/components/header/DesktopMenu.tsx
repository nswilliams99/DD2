import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface DesktopMenuProps {
  onSearchOpen: () => void;
}

const DesktopMenu = ({ onSearchOpen }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <Link href="/" className="text-professional-dark hover:text-diverz-purple transition-colors font-medium">Home</Link>
      <div className="relative group">
        <button
          className="text-professional-dark hover:text-diverz-purple transition-colors font-medium cursor-pointer"
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Services menu"
        >
          Services
        </button>
        <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" role="menu">
          <Link href="/residential" className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium" role="menuitem">Residential Service</Link>
          <Link href="/commercial" className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium" role="menuitem">Commercial Service</Link>
          <Link href="/roll-off-dumpsters" className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium" role="menuitem">Roll-Off Dumpsters</Link>
          <Link href="/hoa-services" className="block px-4 py-3 text-sm text-professional-dark hover:bg-professional-light hover:text-diverz-purple font-medium" role="menuitem">HOA Services</Link>
        </div>
      </div>
      <Link href="/about" className="text-professional-dark hover:text-diverz-purple transition-colors font-medium">About</Link>
      <Link href="/contact" className="text-professional-dark hover:text-diverz-purple transition-colors font-medium">Contact</Link>
      <button
        onClick={onSearchOpen}
        className="text-professional-dark hover:text-diverz-purple transition-colors font-medium flex items-center gap-2"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
      <Button
        className="bg-diverz-purple hover:bg-diverz-purple-dark text-white px-6 py-2 font-semibold"
        aria-label="Get free quote for waste management services"
        asChild
      >
        <Link href="/contact" data-analytics-event="quote-request">Get Quote</Link>
      </Button>
    </div>
  );
};

export default DesktopMenu;
