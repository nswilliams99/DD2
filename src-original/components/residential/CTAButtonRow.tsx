
import CTAButton from '@/components/CTAButton';

const CTAButtonRow = () => {
  return (
    <section className="flex flex-wrap gap-4 justify-center lg:justify-start" aria-label="Quick actions">
      <CTAButton
        href="tel:9708887274"
        variant="primary"
        icon="phone"
        label="Call Now"
        analyticsEvent="click-to-call"
      />
      <CTAButton
        href="/contact"
        variant="secondary"
        icon="clipboard"
        label="Get Quote"
        analyticsEvent="quote-request"
      />
      <CTAButton
        href="/contact"
        variant="secondary"
        icon="credit-card"
        label="Pay Bill"
      />
      <CTAButton
        href="/contact"
        variant="secondary"
        icon="calendar"
        label="Schedule Service"
      />
    </section>
  );
};

export default CTAButtonRow;
