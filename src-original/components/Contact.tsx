
import QuoteRequestForm from './QuoteRequestForm';
import { usePageSection } from '@/hooks/usePageSections';
import { supabase } from '@/integrations/supabase/client';
const Contact = () => {
  
  const { section: heroSection } = usePageSection('contact', 'hero');
  const { section: contactInfoTitle } = usePageSection('contact', 'contact-info-title');
  const { section: phoneSection } = usePageSection('contact', 'phone');
  const { section: emailSection } = usePageSection('contact', 'email');
  const { section: serviceAreasSection } = usePageSection('contact', 'service-areas');
  const { section: businessHoursSection } = usePageSection('contact', 'business-hours');
  const { section: responseGuaranteeSection } = usePageSection('contact', 'response-guarantee');
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">`
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
              {heroSection?.title || "Get a Fast, Reliable Quote from Dumpster Diverz"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
              {heroSection?.description || "We make waste management easy with local support, upfront pricing, and fast turnaround. Fill out the form below to request a quote."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="w-full">
              <QuoteRequestForm />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 font-poppins">{contactInfoTitle?.title || "Contact Information"}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground font-poppins">{phoneSection?.title || "Phone"}</h4>
                    <div className="text-muted-foreground font-inter">
                      <p>{phoneSection?.description || "(970) 888-7274"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground font-poppins">{emailSection?.title || "Email"}</h4>
                    <p className="text-muted-foreground font-inter">{emailSection?.description || "dumpsterdiverz@gmail.com"}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground font-poppins">{serviceAreasSection?.title || "Service Areas"}</h4>
                    <p className="text-muted-foreground font-inter">
                      {serviceAreasSection?.description || "Windsor, Fort Collins, Loveland, Greeley, Severance, Wellington, Longmont, Timnath, Laporte, Bellvue, and surrounding areas in Northern Colorado"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground font-poppins">{businessHoursSection?.title || "Business Hours"}</h4>
                    <div className="text-muted-foreground font-inter">
                      {businessHoursSection?.description ? (
                        businessHoursSection.description.split(', ').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))
                      ) : (
                        <>
                          <p>Monday – Friday: 7:00 AM – 4:00 PM</p>
                          <p>Saturday: Closed</p>
                          <p>Sunday: Emergency service only (upon availability)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2 font-poppins">{responseGuaranteeSection?.title || "Quick Response Guarantee"}</h4>
                <p className="text-muted-foreground font-inter">
                  {responseGuaranteeSection?.description || "We respond to most quote requests within 2 business hours. Emergency service quotes receive priority handling."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
