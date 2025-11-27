
-- Expand rolloff_sizes table with comprehensive data
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS dimensions TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS weight_limit TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS pricing_range TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS use_cases TEXT[];
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS ideal_for TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS seo_keywords TEXT[];
ALTER TABLE public.rolloff_sizes ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';

-- Create rolloff_size_faqs table for size-specific FAQs
CREATE TABLE IF NOT EXISTS public.rolloff_size_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rolloff_size_id BIGINT NOT NULL REFERENCES public.rolloff_sizes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on rolloff_size_faqs
ALTER TABLE public.rolloff_size_faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for rolloff_size_faqs
CREATE POLICY "Public can read active rolloff size FAQs" 
ON public.rolloff_size_faqs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage rolloff size FAQs" 
ON public.rolloff_size_faqs 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Update existing rolloff_sizes with comprehensive data from static files
UPDATE public.rolloff_sizes 
SET 
  dimensions = '14'' L × 8'' W × 3.5'' H',
  weight_limit = 'Up to 2 tons',
  pricing_range = 'Starting at $299',
  slug = '12-yard',
  use_cases = ARRAY[
    'Garage cleanouts',
    'Small basement cleanouts', 
    'Attic cleanouts',
    'Small remodeling projects',
    'Furniture removal'
  ],
  detailed_description = 'Perfect for small home projects and cleanouts. Our 12 yard dumpsters are ideal for garage cleanouts, small basement projects, and furniture removal.',
  ideal_for = 'Small cleanouts, garage projects, furniture removal',
  meta_title = '12 Yard Roll-Off Dumpster Rental | Small Projects | Dumpster Diverz',
  meta_description = '12 yard roll-off dumpster rental for small cleanouts, garage projects, and furniture removal. Same-day delivery in Northern Colorado. Call 970-888-7274',
  seo_keywords = ARRAY[
    '12 yard dumpster rental',
    'small dumpster rental',
    'garage cleanout dumpster',
    'furniture removal dumpster',
    'small project dumpster',
    'Northern Colorado dumpster'
  ],
  specifications = jsonb_build_object(
    'length', '14 feet',
    'width', '8 feet', 
    'height', '3.5 feet',
    'capacity', '12 cubic yards',
    'weight_limit', '2 tons',
    'delivery_time', 'Same day available'
  )
WHERE size_label = '12 Yard';

UPDATE public.rolloff_sizes 
SET 
  dimensions = '16'' L × 8'' W × 4.5'' H',
  weight_limit = 'Up to 2.5 tons',
  pricing_range = 'Starting at $349',
  slug = '15-yard',
  use_cases = ARRAY[
    'Kitchen renovations',
    'Flooring removal projects',
    'Medium basement cleanouts',
    'Small roofing projects',
    'Home office remodels'
  ],
  detailed_description = 'Perfect for medium-sized home improvement projects. Our 15 yard dumpsters are ideal for kitchen remodels, flooring projects, and medium cleanouts.',
  ideal_for = 'Kitchen remodels, flooring projects, medium cleanouts',
  meta_title = '15 Yard Roll-Off Dumpster Rental | Kitchen Remodels | Dumpster Diverz',
  meta_description = '15 yard roll-off dumpster rental for kitchen remodels, flooring projects, and medium cleanouts. Same-day delivery in Northern Colorado. Call 970-888-7274',
  seo_keywords = ARRAY[
    '15 yard dumpster rental',
    'kitchen remodel dumpster',
    'flooring project dumpster',
    'medium dumpster rental',
    'home renovation dumpster',
    'Northern Colorado dumpster'
  ],
  specifications = jsonb_build_object(
    'length', '16 feet',
    'width', '8 feet',
    'height', '4.5 feet', 
    'capacity', '15 cubic yards',
    'weight_limit', '2.5 tons',
    'delivery_time', 'Same day available'
  )
WHERE size_label = '15 Yard';

UPDATE public.rolloff_sizes 
SET 
  dimensions = '22'' L × 8'' W × 4.5'' H',
  weight_limit = 'Up to 3 tons',
  pricing_range = 'Starting at $399',
  slug = '20-yard',
  use_cases = ARRAY[
    'Large home renovations',
    'Roof replacements', 
    'Deck removals',
    'Large cleanouts',
    'Multi-room projects'
  ],
  detailed_description = 'Our most popular size for home renovations and construction projects. The 20 yard dumpster is perfect for roof replacements, large cleanouts, and multi-room renovations.',
  ideal_for = 'Large renovations, roofing, deck removal, multi-room projects',
  meta_title = '20 Yard Roll-Off Dumpster Rental | Home Renovations | Dumpster Diverz',
  meta_description = '20 yard roll-off dumpster rental for large home renovations, roofing projects, and deck removals. Most popular size. Same-day delivery. Call 970-888-7274',
  seo_keywords = ARRAY[
    '20 yard dumpster rental',
    'large dumpster rental',
    'roofing dumpster',
    'home renovation dumpster',
    'deck removal dumpster',
    'construction dumpster'
  ],
  specifications = jsonb_build_object(
    'length', '22 feet',
    'width', '8 feet',
    'height', '4.5 feet',
    'capacity', '20 cubic yards', 
    'weight_limit', '3 tons',
    'delivery_time', 'Same day available'
  )
WHERE size_label = '20 Yard';

UPDATE public.rolloff_sizes 
SET 
  dimensions = '22'' L × 8'' W × 6'' H',
  weight_limit = 'Up to 3.5 tons',
  pricing_range = 'Starting at $499',
  slug = '30-yard',
  use_cases = ARRAY[
    'New construction projects',
    'Large commercial cleanouts',
    'Major home additions',
    'Estate cleanouts', 
    'Large renovation projects'
  ],
  detailed_description = 'Our largest residential dumpster, perfect for major construction and renovation projects. The 30 yard dumpster handles the biggest jobs with ease.',
  ideal_for = 'Major construction, large renovations, estate cleanouts',
  meta_title = '30 Yard Roll-Off Dumpster Rental | Large Construction | Dumpster Diverz',
  meta_description = '30 yard roll-off dumpster rental for large construction, major renovations, and estate cleanouts. Our largest size. Same-day delivery. Call 970-888-7274',
  seo_keywords = ARRAY[
    '30 yard dumpster rental',
    'large construction dumpster',
    'major renovation dumpster',
    'estate cleanout dumpster',
    'commercial dumpster rental',
    'Northern Colorado construction'
  ],
  specifications = jsonb_build_object(
    'length', '22 feet',
    'width', '8 feet',
    'height', '6 feet',
    'capacity', '30 cubic yards',
    'weight_limit', '3.5 tons', 
    'delivery_time', 'Same day available'
  )
WHERE size_label = '30 Yard';

-- Add trigger for automatic timestamp updates on rolloff_size_faqs
CREATE TRIGGER update_rolloff_size_faqs_updated_at
BEFORE UPDATE ON public.rolloff_size_faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
