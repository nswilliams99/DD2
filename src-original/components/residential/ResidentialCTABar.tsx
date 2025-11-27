
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, Calendar, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResidentialCTABar = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-professional-lighter to-white border-b border-professional-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-diverz-pink hover:bg-diverz-pink-dark text-white font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group h-14 border border-diverz-pink"
            >
              <a 
                href="tel:970-888-7274" 
                aria-label="Call Now – Dumpster Diverz Residential Trash Service Fort Collins Windsor Wellington – 970-888-7274"
                title="Call Now – Dumpster Diverz Residential Trash Service Fort Collins Windsor Wellington – 970-888-7274"
                className="flex items-center"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Call Now
              </a>
            </Button>

            <Button 
              asChild 
              size="lg" 
              className="bg-white border-2 border-diverz-pink text-diverz-pink hover:bg-diverz-pink hover:text-white font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group h-14"
            >
              <Link 
                to="/contact" 
                aria-label="Order Online – Dumpster Diverz Residential Trash Pickup Service Windsor Fort Collins Wellington"
                title="Order Online – Dumpster Diverz Residential Trash Pickup Service Windsor Fort Collins Wellington"
                className="flex items-center"
              >
                Order Online
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <Button 
              asChild 
              size="lg" 
              className="bg-diverz-pink hover:bg-diverz-pink-dark text-white font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group h-14 border border-diverz-pink"
            >
              <Link 
                to="/pay-my-bill" 
                aria-label="Go to Dumpster Diverz billing instructions page"
                title="Pay My Bill Online – Dumpster Diverz Secure Trash Service Payment for Fort Collins Windsor Wellington"
                className="flex items-center"
              >
                <CreditCard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Pay My Bill
              </Link>
            </Button>

            <Button 
              asChild 
              size="lg" 
              className="bg-white border-2 border-professional-medium text-professional-medium hover:bg-professional-medium hover:text-white font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group h-14"
            >
              <a 
                href="#holiday-schedule" 
                aria-label="Holiday Schedule – Dumpster Diverz Trash Pickup Holidays Fort Collins Windsor Wellington"
                title="Holiday Schedule – Dumpster Diverz Trash Pickup Holidays Fort Collins Windsor Wellington"
                className="flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Holiday Schedule
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialCTABar;
