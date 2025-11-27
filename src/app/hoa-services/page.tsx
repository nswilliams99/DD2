"use client";

import { Phone, Mail, CheckCircle, Users, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePageSection } from '@/hooks/usePageSections';

export default function HOAServicesPage() {
  const { section: heroSection } = usePageSection('hoa-services', 'hero');
  const { section: howItWorksIntro } = usePageSection('hoa-services', 'how-it-works-intro');
  const { section: stepReachOut } = usePageSection('hoa-services', 'step-reach-out');
  const { section: stepCustomPlan } = usePageSection('hoa-services', 'step-custom-plan');
  const { section: stepPickupStarts } = usePageSection('hoa-services', 'step-pickup-starts');
  const { section: stepSupport } = usePageSection('hoa-services', 'step-support');
  const { section: whatsIncludedIntro } = usePageSection('hoa-services', 'whats-included-intro');
  const { section: includedServices } = usePageSection('hoa-services', 'included-services');
  const { section: whyChooseIntro } = usePageSection('hoa-services', 'why-choose-intro');
  const { section: advantages } = usePageSection('hoa-services', 'advantages');
  const { section: bottomCTA } = usePageSection('hoa-services', 'bottom-cta');

  const howItWorksSteps = [
    { icon: Phone, title: stepReachOut?.title || "Reach Out to Our Team", description: stepReachOut?.description || "Tell us about your community's needs." },
    { icon: Users, title: stepCustomPlan?.title || "Get a Custom Plan", description: stepCustomPlan?.description || "We'll build a pickup schedule and service plan just for your HOA." },
    { icon: Truck, title: stepPickupStarts?.title || "Trash + Bulk Pickup Starts", description: stepPickupStarts?.description || "Enjoy weekly service with HOA-compliant bins." },
    { icon: Shield, title: stepSupport?.title || "Support On-Call", description: stepSupport?.description || "Local team available for questions, service changes, or overflow pickup." }
  ];

  const includedServicesList = includedServices?.description?.split(', ') || [
    "Weekly Trash Pickup", "Recycling Service", "Bulk Item Removal", 
    "Yard Waste (optional)", "Roll-Off Dumpster Access", "HOA-Compliant Bin Placement"
  ];

  const advantagesList = advantages?.description?.split(', ') || [
    "Local service, fast response times", "Same-day support when needed",
    "Clean, uniform bin placement", "Experience with gated and private communities",
    "No surprise fees or confusing billing"
  ];

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-poppins mb-6">
            {heroSection?.title || 'HOA Trash & Dumpster Services'}
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 font-inter max-w-3xl mx-auto mb-8">
            {heroSection?.description || 'Reliable trash and recycling service for HOAs across Northern Colorado.'}
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold h-14 px-8 text-lg" asChild>
            <Link href="/contact">{heroSection?.button_text || "Request HOA Service"}</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-poppins text-professional-dark">
            {howItWorksIntro?.title || "How Our HOA Service Works"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-poppins text-professional-dark">{step.title}</h3>
                <p className="text-professional-medium font-inter">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-dark-neutral text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-poppins">
            {whatsIncludedIntro?.title || "What's Included in HOA Service"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {includedServicesList.map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="font-inter">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-professional-light">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-professional-dark mb-4">
              {whyChooseIntro?.title || "Why HOAs Choose Dumpster Diverz"}
            </h2>
            <p className="text-lg text-professional-medium font-inter">
              {whyChooseIntro?.description || "We understand the unique needs of HOA communities."}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {advantagesList.map((advantage, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-professional-dark font-inter">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-poppins">
            {bottomCTA?.title || "Need Trash Service for Your Neighborhood?"}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-inter">
            {bottomCTA?.description || "Let's talk about your HOA's needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold h-14 px-8 text-lg" asChild>
              <a href="tel:970-888-7274"><Phone className="w-5 h-5 mr-2" />{bottomCTA?.button_text || "Call for HOA Quote"}</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold h-14 px-8 text-lg" asChild>
              <Link href="/contact"><Mail className="w-5 h-5 mr-2" />Request HOA Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
