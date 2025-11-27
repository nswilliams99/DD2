-- HOA Services Page Content Migration
-- Professional-grade organization for HOA services page

-- 1. Hero Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('hoa-services', 'hero', 'HOA Trash & Dumpster Services', 'Reliable trash and recycling service for HOAs across Northern Colorado. Weekly pickup, bulk disposal, and roll-off rentals — tailored to your community''s needs.', 10, 'Request HOA Service', '#hoa-request');

-- 2. How It Works Section  
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'how-it-works-intro', 'How Our HOA Service Works', 'Simple steps to get your community set up with professional waste management', 20);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'step-reach-out', 'Reach Out to Our Team', 'Tell us about your community''s needs.', 30);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'step-custom-plan', 'Get a Custom Plan', 'We''ll build a pickup schedule and service plan just for your HOA.', 40);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'step-pickup-starts', 'Trash + Bulk Pickup Starts', 'Enjoy weekly service with HOA-compliant bins.', 50);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'step-support', 'Support On-Call', 'Local team available for questions, service changes, or overflow pickup.', 60);

-- 3. What's Included Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'whats-included-intro', 'What''s Included in HOA Service', 'Comprehensive waste management services for your community', 70);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'included-services', 'Included Services', 'Weekly Trash Pickup, Recycling Service, Bulk Item Removal, Yard Waste (optional), Roll-Off Dumpster Access, HOA-Compliant Bin Placement', 80);

-- 4. Why Choose Us Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'why-choose-intro', 'Why HOAs Choose Dumpster Diverz', 'We understand the unique needs of HOA communities and deliver reliable, professional service that keeps your neighborhood looking its best.', 90);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('hoa-services', 'advantages', 'HOA Advantages', 'Local service, fast response times, Same-day support when needed, Clean, uniform bin placement, Experience with gated and private communities, No surprise fees or confusing billing', 100);

-- 5. Bottom CTA Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('hoa-services', 'bottom-cta', 'Need Trash Service for Your Neighborhood?', 'Let''s talk about your HOA''s needs — we''ll build a solution that works.', 110, 'Call for HOA Quote', 'tel:970-888-7274');