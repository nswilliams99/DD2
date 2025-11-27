
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';
import { usePageSection } from '@/hooks/usePageSections';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

const AboutHero = () => {
  const { section: heroSection } = usePageSection('about', 'hero');
  
  return (
    <section className="relative bg-gradient-to-br from-professional-dark via-professional-medium to-diverz-purple text-white py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-diverz-purple/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content Column */}
            <div className="space-y-6">
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl leading-tight font-poppins">
                  <span className="font-light text-white/90">About</span>
                  <br />
                  <span className="font-bold text-white">Dumpster Diverz</span>
                </h1>
                <div className="relative">
                  <p className="text-xl lg:text-2xl text-white/85 font-medium leading-relaxed font-inter">
                    {heroSection?.description || "Founded in January 2008 by Nicole Hicks, we're a family-owned waste management company serving Northern Colorado with reliable, personal, and honest service that puts our community first."}
                  </p>
                  {/* Softened gradient underline */}
                  <div className="absolute -bottom-2 left-0 w-[60%] h-1 bg-gradient-to-r from-diverz-pink/80 via-diverz-pink-light/60 to-transparent rounded-full blur-[0.5px]"></div>
                </div>
              </div>
              
              {/* CTA Buttons - matching Residential page spacing */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-diverz-pink to-diverz-pink-dark hover:from-diverz-pink-dark hover:to-diverz-purple text-white font-semibold font-inter px-8 py-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                  asChild
                >
                  <a href="/contact" aria-label="Contact Dumpster Diverz for waste management services">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Us
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-professional-dark font-semibold font-inter px-8 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <a href="/#services" aria-label="Explore Dumpster Diverz waste management services">
                    Explore Our Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Image Column - matching Residential page styling */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-lg aspect-square lg:aspect-video bg-gradient-to-br from-diverz-purple/20 to-diverz-magenta/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <OptimizedImage 
                  src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/about/about_hero_img.webp"
                  alt="Dumpster Diverz truck providing waste management services in Northern Colorado communities"
                  className="w-full h-full object-cover rounded-2xl"
                  priority={true}
                  width={512}
                  height={384}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 512px"
                />
              </div>

              {/* "Local Since 2008" badge - styled like Residential page badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 rounded-xl shadow-xl hidden md:block border">
                <div className="text-3xl font-bold font-poppins text-diverz-purple">Local Since</div>
                <div className="text-sm font-medium text-gray-700">2008</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
