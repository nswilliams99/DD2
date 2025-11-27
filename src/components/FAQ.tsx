
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFAQs } from "@/hooks/useFAQs";
import { Skeleton } from "@/components/ui/skeleton";

const FAQ = () => {
  const { data: faqs, isLoading, error } = useFAQs();

  if (isLoading) {
    return (
      <section className="py-20 bg-industrial-light" role="region" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="faq-heading" className="text-4xl lg:text-5xl font-bold text-industrial-dark mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-industrial-gray">
                Find answers to common questions about Dumpster Diverz services
              </p>
            </div>
            <div className="space-y-4" aria-label="Loading FAQ content">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-industrial-light" role="region" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="faq-heading" className="text-4xl lg:text-5xl font-bold text-industrial-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-red-600">
              Unable to load FAQs. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-industrial-light" role="region" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="faq-heading" className="text-4xl lg:text-5xl font-bold text-industrial-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-industrial-gray">
              Find answers to common questions about Dumpster Diverz services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4" role="region" aria-label="FAQ accordion">
            {faqs?.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger 
                  className="text-left font-semibold text-industrial-dark hover:text-diverz-purple"
                  aria-expanded="false"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-industrial-gray leading-relaxed">
                  <div>
                    {faq.answer}
                    {faq.question.toLowerCase().includes('how do i pay my bill') && (
                      <a
                        href="/pay-my-bill"
                        target="_blank"
                        rel="noopener"
                        className="inline-block mt-4 bg-primary text-white py-2 px-4 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition hover:bg-primary/90"
                        aria-label="Pay My Bill online"
                      >
                        Pay My Bill
                      </a>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
