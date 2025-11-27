
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Clock, Shield } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

const About = () => {
  return (
    <section className="py-20 bg-white" aria-label="About Dumpster Diverz">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-professional-dark font-poppins">
                About <span className="text-diverz-purple">Dumpster Diverz</span>
              </h2>
              <p className="text-xl text-professional-medium leading-relaxed font-inter">
                Dumpster Diverz was founded in January 2008 by Nicole Hicks in Northern Colorado. What started with a single truck and a local route has grown into a trusted residential, commercial, and roll-off waste partner across the region.
              </p>
              <p className="text-lg text-professional-medium leading-relaxed font-inter">
                Still family-owned and operated, Dumpster Diverz is known for honest pricing, responsive support, and deep roots in the community. We provide reliable waste management services with no hidden fees—just honest, dependable waste solutions for homes and businesses throughout Northern Colorado.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-diverz-purple flex-shrink-0" />
                  <span className="text-professional-dark font-medium">Locally Owned</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-diverz-purple flex-shrink-0" />
                  <span className="text-professional-dark font-medium">No Contracts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-diverz-purple flex-shrink-0" />
                  <span className="text-professional-dark font-medium">Fair Pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-diverz-purple flex-shrink-0" />
                  <span className="text-professional-dark font-medium">Real Support</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gray-100 min-h-[600px] lg:min-h-[700px]">
                <OptimizedImage 
                  src="https://cgizicrrzdbzvfniffhw.supabase.co/storage/v1/object/public/website_pics/pages/home/homepage_about.webp"
                  alt="Dumpster Diverz truck providing reliable waste management services in Northern Colorado communities"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                  objectFit="contain"
                  objectPosition="center"
                  width={600}
                  height={700}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                />
              </div>
              
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border hidden lg:block">
                <div className="text-3xl font-bold text-diverz-purple font-poppins">16+</div>
                <div className="text-sm font-medium text-gray-700">Years Serving</div>
                <div className="text-sm text-gray-600">Northern Colorado</div>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-diverz-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-diverz-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-professional-dark font-poppins">Community First</h3>
                <p className="text-professional-medium font-inter">
                  We live and work in the communities we serve. Your success is our success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-diverz-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-diverz-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-professional-dark font-poppins">Reliable Service</h3>
                <p className="text-professional-medium font-inter">
                  Consistent pickup schedules and dependable service you can count on, week after week.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-diverz-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-diverz-purple" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-professional-dark font-poppins">Honest Pricing</h3>
                <p className="text-professional-medium font-inter">
                  Transparent rates with no hidden fees, contracts, or surprise charges. What you see is what you pay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
