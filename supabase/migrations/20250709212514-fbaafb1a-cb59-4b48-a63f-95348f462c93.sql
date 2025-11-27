-- Contact Page Content Migration
-- Professional-grade organization for Contact page

-- 1. Hero/Main Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'hero', 'Get a Fast, Reliable Quote from Dumpster Diverz', 'We make waste management easy with local support, upfront pricing, and fast turnaround. Fill out the form below to request a quote.', 10);

-- 2. Contact Information Sections
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'contact-info-title', 'Contact Information', 'Reach out to us directly for immediate assistance', 20);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'phone', 'Phone', '(970) 888-7274', 30);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'email', 'Email', 'dumpsterdiverz@gmail.com', 40);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'service-areas', 'Service Areas', 'Windsor, Fort Collins, Loveland, Greeley, Severance, Wellington, Longmont, Timnath, Laporte, Bellvue, and surrounding areas in Northern Colorado', 50);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'business-hours', 'Business Hours', 'Monday – Friday: 7:00 AM – 6:00 PM, Saturday: 8:00 AM – 4:00 PM, Sunday: Emergency service only (upon availability)', 60);

-- 3. Response Guarantee Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('contact', 'response-guarantee', 'Quick Response Guarantee', 'We respond to most quote requests within 2 business hours. Emergency service quotes receive priority handling.', 70);