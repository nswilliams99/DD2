
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

const RolloffBottomCTA = () => {
  return (
    <section className="py-16 bg-diverz-purple">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-poppins">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-purple-100 mb-8 font-inter">
            Get your roll-off dumpster delivered fast. Same-day delivery available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-diverz-purple hover:bg-gray-100 hover:text-diverz-purple-dark font-semibold font-inter border border-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
              asChild
            >
              <a 
                href="tel:970-888-7274" 
                aria-label="Call 970-888-7274 for roll-off dumpster rental" 
                className="flex items-center"
                data-analytics-event="click-to-call"
              >
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                Call 970-888-7274
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-diverz-purple font-semibold font-inter transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
              asChild
            >
              <a 
                href="/contact" 
                aria-label="Get quote for roll-off dumpster rental" 
                className="flex items-center"
                data-analytics-event="quote-request"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Get Quote Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolloffBottomCTA;
