
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';

interface RolloffActionButtonsProps {
  townName: string;
}

const RolloffActionButtons = ({ townName }: RolloffActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button size="lg" className="bg-diverz-purple hover:bg-diverz-purple-dark text-white font-semibold font-inter border-2 border-white/30 shadow-xl" asChild>
        <a href="tel:970-888-7274" aria-label={`Call 970-888-7274 for roll-off dumpster rental in ${townName}`}>
          <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
          Call 970-888-7274
        </a>
      </Button>
      <Button size="lg" className="bg-white/95 backdrop-blur-sm border-2 border-white/50 text-professional-dark hover:bg-white hover:border-white font-semibold font-inter shadow-xl" asChild>
        <a href="#quote-form" aria-label={`Get instant quote for roll-off dumpster in ${townName}`}>
          Get Instant Quote
          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
};

export default RolloffActionButtons;
