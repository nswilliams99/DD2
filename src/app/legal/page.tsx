"use client";

import SEOOptimizer from '@/components/seo/SEOOptimizer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function LegalPage() {
  const canonicalUrl = "https://www.dumpsterdiverz.com/legal";

  return (
    <>
      <SEOOptimizer
        title="Legal Information - Privacy Policy & Terms of Service | Dumpster Diverz"
        description="Complete legal information for Dumpster Diverz including Privacy Policy, Terms of Service, SMS Terms, and data protection details."
        canonical={canonicalUrl}
        pageType="about"
        locationData={{ city: "Northern Colorado", state: "CO" }}
        keywords={[
          "privacy policy",
          "terms of service",
          "legal information",
          "dumpster diverz legal"
        ]}
      />

      <BreadcrumbSchema items={[
        { name: "Home", url: "https://www.dumpsterdiverz.com" },
        { name: "Legal", url: canonicalUrl }
      ]} />

      <section className="py-16">
        <div className="max-w-[768px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 font-poppins text-foreground">
            Legal Information
          </h1>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-inter">
            <em>Effective Date: June 25, 2025</em>
          </p>

          {/* PRIVACY POLICY SECTION */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-poppins text-foreground">
              Privacy Policy
            </h2>
            
            <p className="text-base text-foreground leading-relaxed mb-8 font-inter">
              Dumpster Diverz LLC maintains strict privacy policies, ensuring that personal information and mobile information of our users and members is not sold, shared, rented, released, or traded to third parties for marketing/promotional purposes.
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">1. Information We Collect</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-4">
                    Dumpster Diverz LLC ("we," "our," or "us") collects both personal and non-personal data to provide and improve our services.
                  </p>
                  <p className="mb-2">Personal information may include:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Mailing address</li>
                    <li>Service location</li>
                    <li>Billing preferences</li>
                    <li>IP address, browser info, and site behavior</li>
                  </ul>
                  <p>Non-personal data includes analytics like session duration and general site usage patterns.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">2. How We Collect Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-base text-foreground leading-relaxed">
                  <li>Information you provide directly through forms, emails, or quote requests</li>
                  <li>Automatically collected via cookies, analytics tools, or embedded widgets</li>
                  <li>From third-party tools integrated with our platform (e.g., scheduling tools)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-base text-foreground leading-relaxed">
                  <li>To deliver and manage waste services</li>
                  <li>To respond to service inquiries</li>
                  <li>To handle billing and account management</li>
                  <li>To improve customer experience and site usability</li>
                  <li>For fraud prevention, compliance, and legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">4. Sharing Your Information</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-2">We do not sell or trade your personal data. We may share information only with:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Legal authorities when required</li>
                    <li>Contractors who operate on our behalf under confidentiality agreements</li>
                    <li>Technology vendors supporting site operations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">5. SMS Terms & Conditions</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-4">
                    By submitting your phone number through a form on our website, you consent to receive text messages from Dumpster Diverz at the number provided. These may include service notifications, appointment confirmations, payment reminders, and promotional offers.
                  </p>
                  <p className="mb-4">
                    Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. You may unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available). For help, reply HELP.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">6. Data Security & Retention</h3>
                <p className="text-base text-foreground leading-relaxed">
                  We use encryption, firewalls, and limited access protocols to safeguard your information. We retain information only as long as necessary to provide services, meet legal obligations, and support business functions.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">7. Your Rights</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-2">Depending on your location, you may:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Request access or deletion of your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Object to data use</li>
                    <li>Request data portability (transfer of your data to another provider)</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>

          {/* TERMS OF SERVICE SECTION */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 font-poppins text-foreground">
              Terms of Service
            </h2>
            
            <p className="text-base text-foreground leading-relaxed mb-8 font-inter">
              By using Dumpster Diverz LLC services, you agree to these Terms of Service. Please read them carefully before booking any services.
            </p>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">1. Services Offered</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-2">Dumpster Diverz LLC provides:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Weekly residential trash collection</li>
                    <li>Commercial waste services</li>
                    <li>Roll-off dumpster rentals for cleanup, remodeling, and construction projects</li>
                  </ul>
                  <p>Service availability may vary based on location and operational capacity.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">2. Customer Responsibilities</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-2">By using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Provide accurate information during booking</li>
                    <li>Ensure clear, safe, and accessible placement location (e.g., driveways or curbs)</li>
                    <li>Avoid placing hazardous materials, electronics, chemicals, batteries, or flammables in any dumpster</li>
                    <li>Prevent overflow or debris exceeding the fill line or weight limits</li>
                    <li>Keep lids closed on residential carts to avoid spillage</li>
                  </ul>
                  <p>Failure to comply may result in extra fees, service refusal, or removal without refund.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">3. Payment Terms</h3>
                <ul className="list-disc pl-6 space-y-1 text-base text-foreground leading-relaxed">
                  <li>Full payment is due at the time of booking unless otherwise stated</li>
                  <li>Accepted methods include credit/debit cards and bank transfers</li>
                  <li>Late payments may result in suspended or delayed service</li>
                  <li>Services are non-refundable once completed</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">4. Cancellations and Refunds</h3>
                <ul className="list-disc pl-6 space-y-1 text-base text-foreground leading-relaxed">
                  <li><strong>Residential Service:</strong> Cancel at least 24 hours before your pickup day to avoid charges</li>
                  <li><strong>Roll-Offs:</strong> Cancel at least 24 hours before scheduled delivery for a refund (less card processing fees)</li>
                  <li>Same-day cancellations may incur a dry-run or delivery fee</li>
                  <li>No refunds once service is performed or dumpster is delivered</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">5. Limitation of Liability</h3>
                <div className="text-base text-foreground leading-relaxed">
                  <p className="mb-2">Dumpster Diverz LLC is not liable for:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Property damage resulting from container placement on driveways, lawns, or pavement</li>
                    <li>Delays due to weather, traffic, equipment issues, or acts of nature</li>
                    <li>Injuries or damages caused by misuse of dumpsters or blocked access</li>
                  </ul>
                  <p>By using our services, you agree to assume all responsibility for safe placement and use of containers. Liability is strictly limited to the amount paid for the specific service.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-foreground">6. Governing Law</h3>
                <p className="text-base text-foreground leading-relaxed">
                  These Terms are governed by the laws of the State of Colorado. Any legal disputes must be resolved in courts located within Larimer County, Colorado.
                </p>
              </section>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-poppins text-foreground">
              Contact Information
            </h2>
            <div className="text-base text-foreground leading-relaxed space-y-2">
              <p><strong>Dumpster Diverz LLC</strong></p>
              <p>1100 South St Louis Ave, Loveland, CO 80537</p>
              <p>
                Email:{' '}
                <a 
                  href="mailto:info@dumpsterdiverz.com" 
                  className="text-primary hover:text-primary/80 transition-colors underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@dumpsterdiverz.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a 
                  href="tel:970-888-7274" 
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  (970) 888-7274
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
