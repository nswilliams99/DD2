
CREATE TABLE public.commercial_faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_commercial_faqs_updated_at
  BEFORE UPDATE ON public.commercial_faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the initial hardcoded FAQs
INSERT INTO public.commercial_faqs (question, answer, category, sort_order) VALUES
('What commercial dumpster sizes are available in Windsor and Fort Collins?', 'We offer 2, 3, 4, 6, and 8-yard commercial dumpsters for businesses in Windsor, Fort Collins, and Wellington. Each dumpster has a 1,000 lb weight limit and can be scheduled for daily, weekly, or bi-weekly pickup.', 'General', 1),
('What pickup schedules do you offer for commercial dumpster service?', 'We offer flexible pickup schedules including daily pickup for high-volume businesses, weekly pickup (our most popular option), and bi-weekly pickup for cost-effective waste management solutions.', 'Service Schedule', 2),
('Do you provide commercial recycling services for businesses?', 'Yes, we offer recycling options for commercial customers throughout Northern Colorado. Contact us to discuss recycling solutions that meet your business''s specific needs and sustainability goals.', 'Eligibility', 3);

-- Enable RLS and allow public SELECT
ALTER TABLE public.commercial_faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for commercial FAQs"
  ON public.commercial_faqs FOR SELECT
  TO public USING (is_active = true);
