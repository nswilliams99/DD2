-- Create calculator_questions table
CREATE TABLE public.calculator_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calculator_question_options table
CREATE TABLE public.calculator_question_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES calculator_questions(id) ON DELETE CASCADE,
  option_value TEXT NOT NULL,
  option_label TEXT NOT NULL,
  option_description TEXT,
  project_type_filter TEXT, -- null means show for all project types
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calculator_ui_content table
CREATE TABLE public.calculator_ui_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL,
  content_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.calculator_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_ui_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public can read calculator questions" ON public.calculator_questions FOR SELECT USING (true);
CREATE POLICY "Public can read calculator options" ON public.calculator_question_options FOR SELECT USING (true);
CREATE POLICY "Public can read calculator UI content" ON public.calculator_ui_content FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage calculator questions" ON public.calculator_questions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage calculator options" ON public.calculator_question_options FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage calculator UI content" ON public.calculator_ui_content FOR ALL USING (auth.role() = 'authenticated');

-- Add triggers for updated_at
CREATE TRIGGER update_calculator_questions_updated_at
  BEFORE UPDATE ON public.calculator_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calculator_question_options_updated_at
  BEFORE UPDATE ON public.calculator_question_options
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calculator_ui_content_updated_at
  BEFORE UPDATE ON public.calculator_ui_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert calculator questions
INSERT INTO public.calculator_questions (question_text, question_order) VALUES
('What type of project are you working on?', 1),
('How much material do you expect to generate?', 2),
('How often do you need pickup service?', 3);

-- Get question IDs for options
WITH question_ids AS (
  SELECT id, question_order FROM calculator_questions
)

-- Insert options for Question 1: Project Type
INSERT INTO public.calculator_question_options (question_id, option_value, option_label, option_description, sort_order)
SELECT 
  q.id,
  vals.option_value,
  vals.option_label,
  vals.option_description,
  vals.sort_order
FROM question_ids q
CROSS JOIN (VALUES
  ('home-renovation', 'Home Renovation', 'Kitchen remodels, bathroom updates, flooring replacement', 1),
  ('construction', 'Construction/Demolition', 'New builds, major demolition, structural work', 2),
  ('landscaping', 'Landscaping/Yard Work', 'Tree removal, garden cleanup, outdoor projects', 3),
  ('cleanout', 'Cleanout/Moving', 'Estate cleanouts, moving preparation, decluttering', 4),
  ('roofing', 'Roofing Project', 'Roof replacement, shingle removal, roofing materials', 5),
  ('business', 'Business/Commercial', 'Office cleanouts, retail renovations, commercial projects', 6)
) AS vals(option_value, option_label, option_description, sort_order)
WHERE q.question_order = 1;

-- Insert options for Question 2: Volume Level (these will be populated dynamically based on project type)
INSERT INTO public.calculator_question_options (question_id, option_value, option_label, project_type_filter, sort_order)
SELECT 
  q.id,
  vals.option_value,
  vals.option_label,
  vals.project_type_filter,
  vals.sort_order
FROM question_ids q
CROSS JOIN (VALUES
  -- Home Renovation volumes
  ('small-room', 'Small Room (1-2 rooms)', 'home-renovation', 1),
  ('large-room', 'Large Room (3-4 rooms)', 'home-renovation', 2),
  ('whole-house', 'Whole House Interior', 'home-renovation', 3),
  -- Construction volumes
  ('small-demo', 'Small Demolition', 'construction', 1),
  ('medium-demo', 'Medium Demolition', 'construction', 2),
  ('large-demo', 'Large Demolition', 'construction', 3),
  -- Landscaping volumes
  ('small-yard', 'Small Yard Project', 'landscaping', 1),
  ('medium-yard', 'Medium Yard Project', 'landscaping', 2),
  ('large-yard', 'Large Yard Project', 'landscaping', 3),
  -- Cleanout volumes
  ('single-room', 'Single Room', 'cleanout', 1),
  ('multiple-rooms', 'Multiple Rooms', 'cleanout', 2),
  ('whole-property', 'Whole Property', 'cleanout', 3),
  -- Roofing volumes
  ('small-roof', 'Small Roof (under 1,500 sq ft)', 'roofing', 1),
  ('medium-roof', 'Medium Roof (1,500-3,000 sq ft)', 'roofing', 2),
  ('large-roof', 'Large Roof (over 3,000 sq ft)', 'roofing', 3),
  -- Business volumes
  ('small-office', 'Small Office/Retail', 'business', 1),
  ('medium-office', 'Medium Office/Retail', 'business', 2),
  ('large-office', 'Large Office/Warehouse', 'business', 3)
) AS vals(option_value, option_label, project_type_filter, sort_order)
WHERE q.question_order = 2;

-- Insert options for Question 3: Pickup Frequency
INSERT INTO public.calculator_question_options (question_id, option_value, option_label, option_description, sort_order)
SELECT 
  q.id,
  vals.option_value,
  vals.option_label,
  vals.option_description,
  vals.sort_order
FROM question_ids q
CROSS JOIN (VALUES
  ('one-time', 'One-time pickup', 'Single pickup when project is complete', 1),
  ('weekly', 'Weekly pickup', 'Regular weekly service during project', 2),
  ('bi-weekly', 'Bi-weekly pickup', 'Every other week service', 3),
  ('as-needed', 'As needed', 'Flexible pickup schedule based on fill level', 4)
) AS vals(option_value, option_label, option_description, sort_order)
WHERE q.question_order = 3;

-- Insert UI content
INSERT INTO public.calculator_ui_content (content_key, content_value, content_description) VALUES
-- Hero section
('hero_title', 'Dumpster Size Calculator', 'Main page title'),
('hero_subtitle', 'Answer a few quick questions to find the perfect dumpster size for your project', 'Hero subtitle'),
('hero_icon', 'calculator', 'Icon name for hero section'),

-- Progress indicators
('progress_step_template', 'Step {current} of {total}', 'Template for step progress'),
('progress_percentage_template', '{percentage}% Complete', 'Template for percentage progress'),

-- Navigation buttons
('button_next', 'Next', 'Next button text'),
('button_previous', 'Previous', 'Previous button text'),
('button_get_recommendation', 'Get My Recommendation', 'Final submit button text'),
('selection_saved', 'Selection Saved ✓', 'Confirmation text after selection'),

-- Loading states
('loading_title', 'Finding Your Perfect Match...', 'Loading screen title'),
('loading_subtitle', 'Analyzing your project requirements', 'Loading screen subtitle'),

-- Results page
('results_title', 'Perfect! We recommend a {size} dumpster', 'Results page title template'),
('results_subtitle', 'Based on your project details', 'Results page subtitle'),
('results_explanation_intro', 'Here''s why this size works best for your project:', 'Introduction to explanation'),
('results_cta_primary', 'Get Pricing & Schedule', 'Primary CTA button'),
('results_cta_secondary', 'Request Free Quote', 'Secondary CTA button'),
('results_support_text', 'Need help deciding? Call us at', 'Support text before phone number'),
('results_phone_number', '(970) 888-7274', 'Phone number for support'),
('results_start_over', 'Start Over', 'Button to restart calculator'),

-- Error messages
('error_answer_required', 'Please answer this question before continuing', 'Error when no option selected'),
('error_calculation_failed', 'Unable to calculate recommendation. Please try again.', 'Error when calculation fails'),
('error_generic', 'Something went wrong. Please refresh and try again.', 'Generic error message'),

-- Personalized explanation templates
('explanation_home_renovation', 'For your {volume} home renovation project, a {size} dumpster provides ample space for debris like drywall, flooring, and fixtures while fitting comfortably in most driveways.', 'Template for home renovation explanations'),
('explanation_construction', 'Construction and demolition projects like yours generate heavy materials. A {size} dumpster can handle the weight and volume of concrete, lumber, and other construction debris.', 'Template for construction explanations'),
('explanation_landscaping', 'Your {volume} landscaping project will benefit from a {size} dumpster that can accommodate organic materials, soil, and yard waste while being easy to load.', 'Template for landscaping explanations'),
('explanation_cleanout', 'For {volume} cleanout projects, a {size} dumpster provides the right capacity for furniture, household items, and general debris without being oversized.', 'Template for cleanout explanations'),
('explanation_roofing', 'Roofing materials are heavy and bulky. A {size} dumpster is specifically sized to handle shingles, underlayment, and roofing debris for your {volume} project.', 'Template for roofing explanations'),
('explanation_business', 'Commercial projects require reliable waste management. A {size} dumpster offers the capacity and convenience needed for your {volume} business project.', 'Template for business explanations'),
('explanation_fallback', 'Based on your project requirements, a {size} dumpster offers the best combination of capacity, convenience, and value for your needs.', 'Fallback explanation template');

-- Insert page metadata for size calculator
INSERT INTO public.page_metadata (page_path, title, description, keywords, og_title, og_description) VALUES
('/size-calculator', 
 'Dumpster Size Calculator | Find the Perfect Size | Dumpster Diverz', 
 'Use our free dumpster size calculator to find the perfect dumpster for your project. Answer 3 quick questions and get an instant recommendation.',
 ARRAY['dumpster size calculator', 'dumpster rental calculator', 'waste calculator', 'dumpster size guide', 'roll off calculator', 'construction dumpster size'],
 'Free Dumpster Size Calculator - Dumpster Diverz',
 'Find the perfect dumpster size for your project in seconds. Free calculator with instant recommendations.');

-- Insert page sections for size calculator
INSERT INTO public.page_sections (page_slug, section_name, title, description, display_order) VALUES
('size-calculator', 'hero', 'Find Your Perfect Dumpster Size', 'Answer a few quick questions to get an instant recommendation tailored to your specific project needs.', 1),
('size-calculator', 'support', 'Need Help Choosing?', 'Our waste management experts are standing by to help you select the right dumpster size for your project.', 2);