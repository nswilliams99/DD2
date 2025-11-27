
import { Truck, Calendar, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HowItWorksProps {
  townName?: string;
}

const HowItWorks = ({ townName }: HowItWorksProps) => {
  const locationText = townName ? ` in ${townName}` : '';

  const steps = [
    {
      icon: <Calendar className="w-12 h-12 text-white" aria-hidden="true" />,
      title: 'Choose',
      description: `Select your container size and schedule delivery${locationText}`
    },
    {
      icon: <Truck className="w-12 h-12 text-white" aria-hidden="true" />,
      title: 'Schedule',
      description: 'We deliver your dumpster on time, where you need it'
    },
    {
      icon: <Trash2 className="w-12 h-12 text-white" aria-hidden="true" />,
      title: 'Fill',
      description: 'Load your debris safely within weight limits'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-white" aria-hidden="true" />,
      title: 'We Pick It Up',
      description: 'We handle pickup and responsible disposal for you'
    }
  ];

  return (
    <section className="py-16 bg-professional-dark" role="region" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-6 font-poppins text-white">
            How Our Rolloff Dumpster Service Works
          </h2>
          <p className="text-lg mb-12 font-inter text-white/90">
            Simple, reliable roll-off dumpster rental process{locationText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-diverz-purple flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-poppins text-white">
                  {step.title}
                </h3>
                <p className="font-inter leading-relaxed text-white/90">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-professional-medium">
            <h3 className="text-xl font-bold mb-3 font-poppins text-white">
              Need a Dumpster Delivered Today{locationText}?
            </h3>
            <p className="mb-4 font-inter text-white/90">
              Same-day roll-off delivery is available across Northern Colorado. Book early to guarantee your preferred drop-off time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-diverz-purple hover:bg-diverz-purple-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-diverz-purple shadow-lg"
              >
                <Link href="/contact"
                  aria-label={`Get free quote for roll-off dumpster rental${locationText}`}
                >
                  Get Free Quote
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                <a 
                  href="tel:970-888-7274" 
                  aria-label="Call Dumpster Diverz at 970-888-7274"
                >
                  Call 970-888-7274
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
