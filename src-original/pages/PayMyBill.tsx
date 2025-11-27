
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, MessageSquare, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import EnhancedFAQSchema from "@/components/seo/EnhancedFAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SEO from "@/components/SEO";

const billingFAQs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and bank transfers through our secure TrashBilling.com portal. You can also set up automatic payments for your convenience.",
  },
  {
    question: "When are bills generated and when are they due?",
    answer: "Bills are generated monthly and are due within 30 days of the billing date. You'll receive email notifications when your bill is ready and payment reminders before the due date.",
  },
  {
    question: "What is my Customer ID and where do I find it?",
    answer: "Your Customer ID is a unique number we assign to your account for secure bill payment. You can find it on your paper bill, email bill, or use our lookup tool above to have it sent to your phone or email.",
  },
  {
    question: "Are there late fees for overdue payments?",
    answer: "We understand things happen! Contact us at (970) 888-7274 if you're having trouble with payment. We work with our customers in Windsor, Fort Collins, Wellington, and surrounding areas to find solutions.",
  },
  {
    question: "How do I update my billing information or service address?",
    answer: "Use the 'Update My Account Info' form above, call us at (970) 888-7274, or email info@dumpsterdiverz.com. Our local team will update your information within 1 business day.",
  },
  {
    question: "What are your customer service hours for billing questions?",
    answer: "Our billing support team is available Monday through Friday, 7:00 AM to 4:00 PM. For urgent billing issues, email info@dumpsterdiverz.com.",
  },
];

const breadcrumbItems = [
  { name: "Home", url: "https://dumpsterdiverz.com" },
  { name: "Pay My Bill", url: "https://dumpsterdiverz.com/pay-my-bill" },
];

const sendEmail = (subject: string, message: string) => {
  const mailto = `mailto:info@dumpsterdiverz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.open(mailto, "_blank");
};

const logToSupabase = (data: any, type: string) => {
  // TODO: Implement backend email logging for Nate
  console.log("Logged to Supabase:", { type, data, user_agent: navigator.userAgent });
};

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function PayMyBillPage() {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    serviceAddress: "",
    updateDetails: "",
  });
  const [isLoadingSMS, setIsLoadingSMS] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const handleSMSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoadingSMS(true);
    try {
      logToSupabase({ phone_number: phoneNumber }, "sms");
      sendEmail("Customer ID Request - SMS", `Phone Number: ${phoneNumber}`);
      toast({ 
        title: "Request Submitted", 
        description: "We'll text your Customer ID shortly." 
      });
      setPhoneNumber("");
    } catch {
      toast({ 
        title: "Submission Error", 
        description: "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoadingSMS(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoadingEmail(true);
    try {
      logToSupabase({ email }, "email");
      sendEmail("Customer ID Request - Email", `Email: ${email}`);
      toast({ 
        title: "Request Submitted", 
        description: "We'll email your Customer ID shortly." 
      });
      setEmail("");
    } catch {
      toast({ 
        title: "Submission Error", 
        description: "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingForm(true);
    try {
      logToSupabase(formData, "account-update");
      sendEmail("Account Update Request", JSON.stringify(formData, null, 2));
      toast({ 
        title: "Request Submitted", 
        description: "We'll follow up within 1 business day." 
      });
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        serviceAddress: "",
        updateDetails: "",
      });
    } catch {
      toast({ 
        title: "Submission Error", 
        description: "Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoadingForm(false);
    }
  };

  const retryIframe = () => {
    setIframeError(false);
    setIframeLoading(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pay My Bill | Dumpster Diverz",
    "description": "Pay your Dumpster Diverz bill online securely through TrashBilling.com. Find your Customer ID, update your info, or contact support.",
    "url": "https://dumpsterdiverz.com/pay-my-bill",
    "provider": {
      "@type": "Organization",
      "name": "Dumpster Diverz, LLC",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-970-888-7274",
        "contactType": "billing support",
        "availableLanguage": "English"
      }
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Online Bill Payment",
      "description": "Secure online bill payment service for Dumpster Diverz customers",
      "provider": {
        "@type": "Organization",
        "name": "Dumpster Diverz, LLC"
      }
    }
  };

  return (
    <>
      <SEO
        title="Pay My Bill Online | Secure Payment Portal | Dumpster Diverz"
        description="Pay your Dumpster Diverz bill online with TrashBilling.com. Find Customer ID, update account info, or call 970-888-7274 for billing help in Northern Colorado."
        keywords={["dumpster diverz bill pay", "trash billing", "pay trash bill online", "customer ID", "Northern Colorado waste billing"]}
        canonical="https://dumpsterdiverz.com/pay-my-bill"
        structuredData={structuredData}
        ogTitle="Pay Your Trash Bill Online | Dumpster Diverz"
        ogDescription="Pay your Dumpster Diverz bill online securely through TrashBilling.com. Find your Customer ID, update your info, or contact support."
        ogType="website"
      />

      <Helmet>
        <meta name="keywords" content="dumpster diverz bill pay, trash billing, pay trash bill online, customer ID, Northern Colorado waste billing" />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Northern Colorado" />
      </Helmet>

      <BreadcrumbSchema items={breadcrumbItems} />
      <EnhancedFAQSchema faqs={billingFAQs} pageUrl="https://dumpsterdiverz.com/pay-my-bill" />

      <Header />
      
      <main id="main" className="min-h-screen">
        {/* SECTION 1: HERO SECTION */}
        <section className="w-full bg-gradient-to-br from-professional-dark to-industrial-dark py-12 md:py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white font-poppins">
              Pay Your <span className="text-primary">Dumpster Diverz</span> Bill
            </h1>
            <p className="mt-4 text-base md:text-lg text-center text-white/90 max-w-2xl mx-auto font-inter">
              Dumpster Diverz uses TrashBilling.com for secure online bill payments. All you need is your 12-digit Customer ID, typically found on your invoice.
            </p>
          </div>
        </section>

        {/* SECTION 2: PAY YOUR BILL ONLINE (IFRAME SECTION) */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl px-4 mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8 font-poppins">
              Pay Your Bill Online
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 mb-8">
              <Button 
                onClick={() => smoothScrollTo('find-customer-id')}
                className="bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:ring-4 focus-visible:ring-primary/20"
                aria-label="Scroll to Customer ID form"
              >
                Find My Customer ID
              </Button>
              <Button 
                onClick={() => smoothScrollTo('update-account-info')}
                variant="outline" 
                className="hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:ring-4 focus-visible:ring-primary/20"
                aria-label="Scroll to Account Info form"
              >
                Update My Account Info
              </Button>
            </div>

            <div 
              className="relative aspect-[16/10] md:aspect-[16/9] max-md:w-full max-md:h-[480px] overflow-hidden mb-6 rounded-lg border shadow-lg"
              data-analytics-event="billing-external"
            >
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading secure payment portal...</span>
                </div>
              )}
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
                  <p className="text-muted-foreground mb-4">Unable to load payment portal</p>
                  <Button onClick={retryIframe} className="bg-primary text-white hover:bg-primary/90">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : (
                <iframe
                  title="Secure Dumpster Diverz Bill Payment Portal via TrashBilling.com - Pay your trash bill online with your Customer ID"
                  src="https://trashbilling.com"
                  className="w-full h-full border-0"
                  onLoad={() => setIframeLoading(false)}
                  onError={() => {
                    setIframeLoading(false);
                    setIframeError(true);
                  }}
                />
              )}
            </div>
            <p className="md:hidden text-sm text-muted-foreground text-center mb-6">
              Tip: Use two fingers to scroll inside the box above if needed.
            </p>
          </div>
        </section>

        {/* SECTION 3: FIND MY CUSTOMER ID */}
        <section 
          id="find-customer-id" 
          className="py-16 bg-muted"
          aria-labelledby="find-my-customer-id-heading"
          aria-describedby="find-my-customer-id-instructions"
        >
          <div className="container max-w-6xl px-4 mx-auto">
            <h2 id="find-my-customer-id-heading" className="text-3xl font-bold text-foreground text-center mb-4 font-poppins">
              Find My Customer ID
            </h2>
            <p id="find-my-customer-id-instructions" className="text-lg text-muted-foreground text-center mb-12 font-inter">
              Don't have your Customer ID? We can send it to you via text or email.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* SMS Form */}
              <div className="bg-card p-8 rounded-lg shadow-lg border">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold text-foreground font-poppins">Get ID via Text</h3>
                </div>
                <p className="text-muted-foreground mb-6 font-inter">
                  Enter your phone number and we'll text your Customer ID within minutes.
                </p>
                <form onSubmit={handleSMSSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(970) 555-0123"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                      aria-describedby="phone-help"
                    />
                    <p id="phone-help" className="sr-only">Enter your phone number to receive your Customer ID via text message</p>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoadingSMS}
                    className="w-full h-12 text-base bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:ring-4 focus-visible:ring-primary/20"
                  >
                    {isLoadingSMS ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Customer ID via Text"
                    )}
                  </Button>
                </form>
              </div>

              {/* Email Form */}
              <div className="bg-card p-8 rounded-lg shadow-lg border">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold text-foreground font-poppins">Get ID via Email</h3>
                </div>
                <p className="text-muted-foreground mb-6 font-inter">
                  Enter your email address and we'll send your Customer ID to your inbox.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                      aria-describedby="email-help"
                    />
                    <p id="email-help" className="sr-only">Enter your email address to receive your Customer ID via email</p>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoadingEmail}
                    className="w-full h-12 text-base bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:ring-4 focus-visible:ring-primary/20"
                  >
                    {isLoadingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Customer ID via Email"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: UPDATE ACCOUNT INFO */}
        <section 
          id="update-account-info" 
          className="py-16 bg-gradient-to-br from-professional-dark via-industrial-gray to-industrial-dark"
        >
          <div className="container max-w-4xl px-4 mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-4 font-poppins">
              Update My Account Info
            </h2>
            <p className="text-lg text-white/80 text-center mb-12 font-inter">
              Need to update your contact information or service address? Fill out the form below.
            </p>
            
            <div className="bg-card p-8 rounded-lg shadow-xl border">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="John Doe"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="formPhone" className="text-foreground font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="formPhone"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      placeholder="(970) 555-0123"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="formEmail" className="text-foreground font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="formEmail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceAddress" className="text-foreground font-medium">
                      Service Address *
                    </Label>
                    <Input
                      id="serviceAddress"
                      type="text"
                      value={formData.serviceAddress}
                      onChange={(e) => setFormData({...formData, serviceAddress: e.target.value})}
                      placeholder="123 Main St, Windsor, CO 80550"
                      className="h-12 text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="updateDetails" className="text-foreground font-medium">
                    What would you like to update?
                  </Label>
                  <Textarea
                    id="updateDetails"
                    value={formData.updateDetails}
                    onChange={(e) => setFormData({...formData, updateDetails: e.target.value})}
                    placeholder="Please describe what information you'd like to update (e.g., new phone number, billing address change, etc.)"
                    className="min-h-[120px] text-base focus-visible:ring-4 focus-visible:ring-primary/20"
                    rows={4}
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoadingForm}
                  className="w-full h-12 text-base bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:ring-4 focus-visible:ring-primary/20"
                >
                  {isLoadingForm ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Update Request"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 5: BILLING FAQ ACCORDION */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl px-4 mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12 font-poppins">
              Billing FAQs
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {billingFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger 
                    className="px-6 py-4 text-left font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-t-lg focus-visible:ring-4 focus-visible:ring-primary/20"
                    aria-expanded={false}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="font-poppins">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent 
                    id={`faq-content-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-6 pb-4 text-muted-foreground font-inter"
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
