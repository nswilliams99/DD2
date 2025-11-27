import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ResidentialFAQ = () => {
  return (
    <section className="py-16 bg-professional-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full bg-background rounded-lg shadow-lg">
            
            <AccordionItem value="item-1" className="border-b border-professional-light">
              <AccordionTrigger className="px-6 py-4 text-left font-medium text-professional-dark hover:text-primary font-poppins">
                <h3 className="text-lg font-semibold">
                  What size trash carts do you offer for residential service?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-professional-medium font-inter">
                <div>
                  We offer two cart sizes: 64-gallon carts for $25/month (perfect for smaller households) and 96-gallon carts for $30/month (ideal for families). Both include weekly pickup and recycling service.
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-professional-light">
              <AccordionTrigger className="px-6 py-4 text-left font-medium text-professional-dark hover:text-primary font-poppins">
                <h3 className="text-lg font-semibold">
                  Is recycling included with residential trash service in Windsor and Fort Collins?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-professional-medium font-inter">
                <div>
                  Yes, recycling is included with all our residential trash service plans at no additional cost. We provide recycling pickup alongside your weekly trash collection throughout Windsor, Fort Collins, Wellington and surrounding areas.
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6 py-4 text-left font-medium text-professional-dark hover:text-primary font-poppins">
                <h3 className="text-lg font-semibold">
                  What areas do you serve for residential waste management?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-professional-medium font-inter">
                <div>
                  We provide residential trash and recycling service throughout Northern Colorado including Windsor, Fort Collins, Wellington, Greeley and surrounding communities. Contact us to confirm service availability in your specific area.
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ResidentialFAQ;
