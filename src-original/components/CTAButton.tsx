
import { Button } from '@/components/ui/button';
import { Phone, Clipboard, CreditCard, Calendar } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  variant: 'primary' | 'secondary';
  icon: 'phone' | 'clipboard' | 'credit-card' | 'calendar';
  label: string;
  analyticsEvent?: string;
}

const iconMap = {
  'phone': Phone,
  'clipboard': Clipboard,
  'credit-card': CreditCard,
  'calendar': Calendar,
};

const CTAButton = ({ href, variant, icon, label, analyticsEvent }: CTAButtonProps) => {
  const Icon = iconMap[icon];
  
  const baseClasses = "font-semibold font-inter transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group h-14 shadow-lg px-8 py-3 text-lg";
  
  const variantClasses = variant === 'primary' 
    ? "bg-diverz-pink hover:bg-diverz-pink-dark text-white border-2 border-white/20 hover:shadow-diverz-pink/30"
    : "bg-white/95 backdrop-blur-sm border-2 border-white/50 text-professional-dark hover:bg-white hover:border-white hover:shadow-white/30";

  return (
    <Button
      asChild
      size="lg"
      className={`${baseClasses} ${variantClasses}`}
      aria-label={`${label} - Dumpster Diverz ${variant === 'primary' ? 'primary action' : 'service'}`}
    >
      <a 
        href={href}
        data-analytics-event={analyticsEvent}
      >
        <Icon className={`w-5 h-5 mr-2 group-hover:${variant === 'primary' ? 'rotate-12' : 'scale-110'} transition-transform duration-300 ${variant === 'primary' ? 'text-white' : 'text-professional-dark'}`} />
        {label}
      </a>
    </Button>
  );
};

export default CTAButton;
