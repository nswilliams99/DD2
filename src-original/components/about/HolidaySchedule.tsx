import { Helmet } from 'react-helmet-async';
import { Flag, Sparkles, HardHat, TreePine, PartyPopper } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HolidaySchedule = () => {
  const holidayFAQs = [
    {
      question: "Which holidays does Dumpster Diverz observe?",
      answer: "New Year's Day, Memorial Day, Independence Day (July 4th), Labor Day, Thanksgiving Day, and Christmas Day."
    },
    {
      question: "What happens if a holiday falls on Friday?",
      answer: "Friday residential pickups move to Saturday of the same week."
    },
    {
      question: "What happens if a holiday falls on Monday, Tuesday, Wednesday, or Thursday?",
      answer: "Pickups for the holiday's day move to the following day, and all remaining days in that week shift forward by one day. Example: If Christmas falls on a Monday, Monday routes are collected on Tuesday with Tuesday's routes; Tuesday moves to Wednesday; Wednesday to Thursday; Thursday to Friday."
    },
    {
      question: "Does this policy apply to commercial service?",
      answer: "The holiday policy above applies to residential routes. Commercial accounts should contact support to confirm their schedule."
    }
  ];

  return (
    <>
      {/* Holiday Service Schedule (single source of truth) */}
      <section id="holiday-schedule" aria-labelledby="holiday-schedule-heading" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {/* Pink Holiday Box */}
              <div className="bg-[#53565A] text-[#D11768] font-bold text-4xl lg:text-5xl py-10 px-8 rounded-xl mb-8 mx-auto max-w-2xl">
                Holiday = 1 Day Later
              </div>
              
              {/* Holiday Icons Row */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex flex-col items-center text-center">
                  <Flag className="w-12 h-12 text-[#53565A] mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#53565A]">Memorial Day</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Sparkles className="w-12 h-12 text-[#53565A] mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#53565A]">Independence Day</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <HardHat className="w-12 h-12 text-[#53565A] mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#53565A]">Labor Day</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="/lovable-uploads/e6f3e6a8-d84a-413d-893c-7f0aa8e128bb.png" 
                    alt="Turkey icon for Thanksgiving" 
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <span className="text-sm font-medium text-[#53565A]">Thanksgiving</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <TreePine className="w-12 h-12 text-[#53565A] mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#53565A]">Christmas</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <PartyPopper className="w-12 h-12 text-[#53565A] mb-2" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#53565A]">New Year's Day</span>
                </div>
              </div>
              
              <h2 id="holiday-schedule-heading" className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Dumpster Diverz Holiday Observance
              </h2>
              
              <div className="text-lg text-black leading-relaxed mb-8 max-w-3xl mx-auto">
                <p className="mb-6">
                  Dumpster Diverz observes six major U.S. holidays each year: <span className="underline" style={{textDecorationColor: '#D11768'}}>New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving Day, and Christmas Day</span>. These holidays may affect your regular trash pickup schedule, but our goal is to keep your service consistent and predictable. By clearly communicating our holiday observance dates, we make it easy for residential customers to plan ahead and avoid missed collections.
                </p>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border mb-12">
              {/* How Holiday Weeks Work */}
              <h3 className="text-2xl font-semibold text-foreground mb-6">How Holiday Weeks Work</h3>
              
              <div className="text-lg text-black leading-relaxed mb-8">
                <p className="mb-6">
                  If a holiday falls on or before your normal pickup day, <span className="underline font-semibold" style={{textDecorationColor: '#D11768'}}>your trash collection will be moved back by one day</span> for the remainder of that week. For example, if a holiday is on Monday, Monday routes will run Tuesday, Tuesday routes will run Wednesday, and so on—keeping service on track without long delays. <span className="underline font-semibold" style={{textDecorationColor: '#D11768'}}>When a holiday lands on Friday, your pickup will shift to Saturday of the same week</span>—so your trash still gets collected promptly and you never have to worry about overflow. This simple one-day shift policy applies across all affected service areas, ensuring timely and reliable waste removal during holiday weeks. By following this easy schedule, you'll always know exactly when to roll out your cart, no matter the season.
                </p>
              </div>
            </div>

            {/* Holiday FAQs using existing accordion style */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Holiday Service FAQs</h3>
              <Accordion type="single" collapsible className="w-full space-y-4" role="region" aria-label="Holiday FAQ accordion">
                {holidayFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`holiday-item-${index}`}
                    className="bg-background rounded-lg border border-border px-6"
                  >
                    <AccordionTrigger 
                      className="text-left font-semibold text-foreground hover:text-primary"
                      aria-expanded="false"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* JSON-LD for FAQ rich results */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": holidayFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        </Helmet>
      </section>
    </>
  );
};

export default HolidaySchedule;