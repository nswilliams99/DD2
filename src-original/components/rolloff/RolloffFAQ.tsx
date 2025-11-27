
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useRolloffFAQs } from '@/hooks/useRolloffFAQs';

interface RolloffFAQProps {
  townSlug?: string;
}

const RolloffFAQ = ({ townSlug }: RolloffFAQProps) => {
  const { data: faqs, isLoading } = useRolloffFAQs();

  if (isLoading) {
    return (
      <section className="py-16 bg-white" role="region" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 id="faq-heading" className="text-3xl font-bold text-professional-dark font-poppins">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4" aria-label="Loading FAQ content">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-2"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" role="region" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-bold text-professional-dark mb-4 font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Get answers to common questions about our rolloff dumpster rentals
            </p>
          </div>

          {faqs && faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4" role="region" aria-label="FAQ accordion">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger 
                    className="text-left font-semibold text-professional-dark hover:text-diverz-purple"
                    aria-expanded="false"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No FAQs available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RolloffFAQ;
