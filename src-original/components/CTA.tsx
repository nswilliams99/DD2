
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-primary-pink text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins leading-tight">
            Northern Colorado Dumpster Rentals – Simple, Fast, Local
          </h2>
          <p className="text-xl mb-8 text-purple-100 leading-relaxed font-inter max-w-3xl mx-auto">
            Get trusted residential and roll-off service from Dumpster Diverz. Schedule online, call for same-day delivery, or request a custom quote today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="bg-white text-primary-pink hover:bg-gray-100 hover:text-primary-pink font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group border border-white h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
              asChild
            >
              <Link to="/contact" aria-label="Schedule your dumpster service">
                Schedule My Service
                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-pink font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
              asChild
            >
              <a href="tel:970-888-7274" aria-label="Call 970-888-7274 for dumpster service">
                <Phone className="mr-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-12 transition-transform duration-300" />
                Call 970-888-7274
              </a>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Local", subtitle: "Northern Colorado" },
              { title: "Free", subtitle: "Quote & Consultation" },
              { title: "Easy", subtitle: "Online Ordering" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group animate-fade-in hover:-translate-y-1 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl font-bold mb-2 font-poppins group-hover:text-purple-200 transition-colors duration-300">
                  {item.title}
                </div>
                <div className="text-purple-100 font-inter group-hover:text-white transition-colors duration-300">
                  {item.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
