
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, CreditCard, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageSection } from '@/hooks/usePageSections';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Hero = () => {
  const { section, isLoading, error } = usePageSection('homepage', 'hero');
  const [imageError, setImageError] = useState(false);

  // Fallback values (current hardcoded content)
  const title = section?.title || "Reliable Dumpster Rental & Trash Services";
  const description = section?.description || "Serving Windsor, Fort Collins, Wellington & Timnath with eco-friendly weekly service, no hidden fees, and real customer support.";
  const fallbackImage = "https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_about.webp";
  const imageSrc = !imageError && section?.image_path ? section.image_path : fallbackImage;
  const primaryButtonText = section?.button_text || "Order Online";
  const primaryButtonUrl = section?.button_url || "https://app.trashjoes.com/h/dumpster-diverz";

  return (
    <section className="relative bg-gradient-to-br from-gray-800 via-gray-500 to-gray-300 text-white py-16 lg:py-20 overflow-hidden" aria-label="Hero section">
      {/* Visible Cool Grey Ombre Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-600 to-gray-200 opacity-90" aria-hidden="true"></div>
      {/* Subtle Pink Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-pink/10" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <Badge className="bg-primary-pink text-white font-inter border-2 border-white/30">
                <MapPin className="w-4 h-4 mr-2" />
                Dumpster Services in Northern Colorado
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight font-poppins">
                {title.includes('&') ? (
                  <>
                    {title.split('&')[0].trim()} & <span className="text-primary-pink">{title.split('&')[1].trim()}</span>
                  </>
                ) : (
                  title
                )}
              </h1>
              
              <p className="text-lg lg:text-xl xl:text-2xl text-gray-200 font-medium leading-relaxed">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-primary-pink hover:bg-primary-pink text-white font-semibold font-inter border-2 border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-pink/30 hover:-translate-y-1 group h-12 lg:h-14 px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <a href="tel:970-888-7274" aria-label="Call 970-888-7274 to speak with a local waste service expert">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Call Now
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-white/95 backdrop-blur-sm border-2 border-white text-dark-neutral hover:bg-white hover:text-dark-neutral hover:shadow-2xl hover:shadow-white/30 font-semibold font-inter transition-all duration-300 hover:-translate-y-1 group h-12 lg:h-14 shadow-lg px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <a 
                  href="/about#holiday-schedule" 
                  aria-label="Holiday Trash Pickup Schedule"
                  title="Holiday Trash Pickup Schedule"
                >
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Holiday Schedule
                </a>
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white hover:shadow-2xl hover:shadow-white/20 font-semibold font-inter transition-all duration-300 hover:-translate-y-1 group h-12 lg:h-14 shadow-lg px-6 lg:px-8 py-3 text-base lg:text-lg"
                asChild
              >
                <Link to="/pay-my-bill" aria-label="Go to Dumpster Diverz billing instructions page">
                  <CreditCard className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Pay My Bill
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-6">
              <div className="text-center p-3 lg:p-4 bg-soft-neutral/20 backdrop-blur-sm rounded-lg">
                <div className="text-2xl lg:text-3xl font-bold text-primary-pink">$29</div>
                <div className="text-xs lg:text-sm text-gray-300">Starting Price</div>
              </div>
              <div className="text-center p-3 lg:p-4 bg-soft-neutral/20 backdrop-blur-sm rounded-lg">
                <div className="text-2xl lg:text-3xl font-bold text-primary-pink">Weekly</div>
                <div className="text-xs lg:text-sm text-gray-300">Pickup</div>
              </div>
              <div className="text-center p-3 lg:p-4 bg-soft-neutral/20 backdrop-blur-sm rounded-lg">
                <div className="text-2xl lg:text-3xl font-bold text-primary-pink">No</div>
                <div className="text-xs lg:text-sm text-gray-300">Contracts</div>
              </div>
            </div>

            {/* Primary Order Online CTA - Centered and Prominent */}
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                className="bg-primary-pink hover:bg-primary-pink/90 text-white font-bold font-inter border-3 border-white/40 shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-pink/40 hover:-translate-y-2 hover:scale-105 group h-14 lg:h-16 px-10 lg:px-12 py-4 text-lg lg:text-xl"
                asChild
              >
                <a 
                  href="https://app.trashjoes.com/h/dumpster-diverz"
                  aria-label="Order Residential Trash Service Online - Main CTA"
                  title="Order Residential Trash Service Online"
                  className="relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Mail className="w-5 h-5 lg:w-6 lg:h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold tracking-wide">ORDER ONLINE</span>
                  </span>
                  {/* Subtle gradient overlay for extra prominence */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-pink via-cta-accent to-primary-pink opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl h-[400px] lg:h-[550px] xl:h-[600px] bg-gradient-to-br from-primary-pink/20 to-cta-accent/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
              <OptimizedImage 
                src={imageSrc}
                alt="Dumpster Diverz pink garbage truck and bin curbside for residential trash pickup" 
                objectFit="cover"
                objectPosition="center top"
                className="w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"
                priority={true}
                width={1024}
                height={768}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 1024px"
                onError={(e) => {
                  console.log('Hero image failed to load:', imageSrc);
                  if (!imageError) {
                    setImageError(true);
                  }
                }}
                onLoad={() => console.log('Hero image loaded successfully:', imageSrc)}
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white text-black p-4 lg:p-6 rounded-xl shadow-xl hidden md:block border">
              <div className="text-xl lg:text-3xl font-bold font-poppins text-primary-pink">Text Notifications</div>
              <div className="text-xs lg:text-sm font-medium text-dark-neutral">Stay updated on every pickup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
