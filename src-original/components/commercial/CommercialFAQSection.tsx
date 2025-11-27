
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCommercialFAQs } from '@/hooks/useCommercialFAQs';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback';

const CommercialFAQSection = () => {
  const { data: faqs, isLoading, error } = useCommercialFAQs();

  if (isLoading) {
    return (
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Service FAQs
            </h2>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
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

  if (error) {
    console.error('Error loading commercial FAQs:', error);
    return (
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Service FAQs
            </h2>
            <div className="text-center py-8">
              <p className="text-professional-medium">Unable to load FAQs at this time.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs?.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || []
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback message="Unable to load Commercial FAQs" />}>
      <section className="py-16 bg-professional-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-professional-dark mb-8 text-center font-poppins">
              Commercial Service FAQs
            </h2>
            
            {faqs && faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full bg-background rounded-lg shadow-lg">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index + 1}`} className="border-b border-professional-light">
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-professional-dark hover:text-diverz-purple font-poppins">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-professional-medium font-inter">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-professional-medium">No FAQs available at this time.</p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </section>
    </ErrorBoundary>
  );
};

export default CommercialFAQSection;
