
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#53565A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-pink rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-poppins">DD</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-poppins">Dumpster Diverz</h3>
                <p className="text-gray-400 font-inter">Northern Colorado Waste Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed font-inter">
              Local waste management company serving Windsor, Fort Collins, Wellington and surrounding 
              Northern Colorado communities with reliable, eco-friendly waste and recycling services.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-poppins">Get in Touch</h4>
            <div className="space-y-2 text-gray-300 font-inter">
              <div>
                <span className="text-white font-medium">Office: </span>
                <a 
                  href="tel:9708887274" 
                  className="text-white hover:text-primary-pink transition-colors"
                  aria-label="Call office at 970-888-7274"
                >
                  (970) 888-7274
                </a>
              </div>
              
              <div>
                <span className="text-white font-medium">Email: </span>
                <a 
                  href="mailto:info@dumpsterdiverz.com" 
                  className="text-white hover:text-primary-pink transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send email to info@dumpsterdiverz.com"
                >
                  info@dumpsterdiverz.com
                </a>
              </div>
              
              <div>
                <span className="text-white font-medium">Business Address: </span>
                <a 
                  href="https://www.google.com/search?q=1100+South+St+Louis+Ave+Loveland+CO+80537" 
                  className="text-white hover:text-primary-pink transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Dumpster Diverz location on Google Maps"
                >
                  1100 South St Louis Ave, Loveland, CO 80537
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-poppins">Services</h4>
            <ul className="space-y-3 text-gray-300 font-inter">
              <li>
                <Link href="/residential" 
                  className="hover:text-white transition-colors"
                  aria-label="Learn about residential trash pickup services"
                >
                  Residential Trash
                </Link>
              </li>
              <li>
                <Link href="/residential" 
                  className="hover:text-white transition-colors"
                  aria-label="Learn about recycling services"
                >
                  Recycling Services
                </Link>
              </li>
              <li>
                <Link href="/commercial" 
                  className="hover:text-white transition-colors"
                  aria-label="Learn about commercial dumpster services"
                >
                  Commercial Dumpsters
                </Link>
              </li>
              <li>
                <Link href="/roll-off-dumpsters" 
                  className="hover:text-white transition-colors"
                  aria-label="Learn about roll-off dumpster rentals"
                >
                  Roll-Off Rentals
                </Link>
              </li>
              <li>
                <Link href="/about" 
                  className="hover:text-white transition-colors"
                  aria-label="Learn about our company and team"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" 
                  className="hover:text-white transition-colors"
                  aria-label="Get a quote for waste management services"
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col space-y-2">
              <p className="text-white text-sm font-inter">
                © {currentYear} Dumpster Diverz LLC. All rights reserved.
              </p>
              <p className="text-white/80 text-sm font-inter">
                <Link href="/" 
                  className="text-primary-pink hover:text-cta-accent transition-colors underline"
                  aria-label="Go to homepage"
                >
                  Website
                </Link>
                <span className="text-white"> and </span>
                <a 
                  href="https://app.trashjoes.com/h/dumpster-diverz" 
                  className="text-primary-pink hover:text-cta-accent transition-colors underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Access online signup portal"
                >
                  Online Signup
                </a>
                <span className="text-white"> by </span>
                <a 
                  href="https://trashjoes.com" 
                  className="text-primary-pink hover:text-cta-accent transition-colors underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Trash Joes website"
                >
                  Trash Joes
                </a>
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 font-inter">
              <Link href="/privacy-policy" 
                className="text-white hover:text-primary-pink text-sm transition-colors underline"
                aria-label="View our privacy policy"
              >
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" 
                className="text-white hover:text-primary-pink text-sm transition-colors underline"
                aria-label="View our terms of service"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
