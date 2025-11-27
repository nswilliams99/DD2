-- About Page Content Migration
-- Professional-grade organization for future maintainability

-- Insert About page content sections in logical order
-- Each section corresponds to a component with clear, descriptive names

-- 1. Hero Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order, image_path, button_text, button_url) VALUES
('about', 'hero', 'About Dumpster Diverz', 'We''re a locally owned waste management company serving Northern Colorado with reliable, personal, and honest service that puts our community first.', 10, '/lovable-uploads/83de10f7-82de-45c2-81a2-3e6a4d347744.jpg', 'Contact Us', '/contact');

-- 2. Company Story Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'story-intro', 'Built Local for Northern Colorado', 'Dumpster Diverz started in Windsor, Colorado — not in a boardroom, but because a national hauler skipped another scheduled pickup and left one of our founders holding the bag. Tired of 800 numbers, surprise fees, and missed routes, we launched something better: a local trash company built for real neighbors, by real neighbors.', 20);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'story-values', 'Our Three Promises', 'We made three promises and we''ve kept them: show up when we say we will, never hide fees, and treat every customer like we''d treat our own. Whether it''s weekly residential pickup or rural roll-off delivery, we''ve designed our service around how Northern Colorado actually works — weather delays, HOA rules, and all.', 30);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'story-community', 'Local Accountability', 'Today, we serve families and businesses across the Front Range with the same values we started with. Check our full list of residential service areas in Northern Colorado, and know that every route we run comes backed by local accountability and real support.', 40);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'story-quote', 'Our Philosophy', '"We don''t just drive these routes — we live on these streets."', 50);

-- 3. Services Overview Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'services-intro', 'Local Trash Services Built for Northern Colorado', 'From curbside pickup to roll-off rentals, we provide waste solutions for homes, businesses, and job sites across Northern Colorado — always with local support and honest pricing.', 60);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('about', 'services-residential', 'Residential Trash Pickup', 'Weekly trash and recycling pickup for Northern Colorado neighborhoods. Flexible schedules, no long-term contracts, and local support whenever you need it. Ideal for HOAs, townhomes, and single-family homes.', 70, 'Learn More', '/residential');

INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('about', 'services-rolloff', 'Roll-Off Dumpster Rentals', 'Same-day roll-off dumpster rentals for cleanouts, construction, and renovation projects across Northern Colorado. Transparent pricing and local permit expertise in Windsor, Fort Collins, Greeley, and nearby communities.', 80, 'View Sizes', '/roll-off-dumpsters');

INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('about', 'services-commercial', 'Commercial Waste Services', 'Commercial waste service for businesses of all sizes — from offices and retail to restaurants and warehouses. Local account managers, flexible pickup schedules, and scalable dumpster sizes across Northern Colorado.', 90, 'Get Quote', '/commercial');

-- 4. Local Advantages Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'advantages-intro', 'The Local Advantage', 'Why Northern Colorado chooses local over national haulers', 100);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'advantage-local-knowledge', 'Local Knowledge', 'We know Northern Colorado inside and out — from navigating snow delays to understanding HOA trash restrictions. Our team lives here, so your pickup runs on time, every time. We live and work in Northern Colorado — so we know what it''s like to deal with steep driveways, ice-packed alleys, HOA limits, and county-specific landfill rules. That knowledge isn''t just local—it''s personal.', 110);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'advantage-no-surprises', 'No Hidden Surprises', 'We believe in transparent pricing, dependable service, and real communication. No 800 numbers. No unexpected charges. Just honest waste service you can rely on. You won''t find 800-numbers, vague fees, or confusing contracts here. We''re upfront about what it costs and what you get.', 120);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'advantage-personal-accountability', 'Personal Accountability', 'Our customers know our names. If something ever goes wrong, we fix it fast — because our trucks, our brand, and our reputation are part of this community. This isn''t a franchise. If something goes wrong, you''re not getting bounced to corporate — you''re getting a fix from someone who probably lives down the street.', 130);

INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('about', 'advantage-sustainability', 'Sustainability-Minded', 'We minimize landfill waste through efficient routing, responsible disposal, and recycling partnerships with local providers. Cleaner service, cleaner streets. We don''t just haul trash — we help reduce it. From smarter routing and fuel-efficient trucks to local recycling partnerships and construction debris sorting, we do everything we can to cut landfill waste.', 140);

-- 5. Call to Action Section
INSERT INTO page_sections (page_slug, section_name, title, description, display_order, button_text, button_url) VALUES
('about', 'bottom-cta', 'Ready to Experience the Local Difference?', 'Join thousands of Northern Colorado residents and businesses who trust Dumpster Diverz for reliable, honest waste management. Get your quote today and see why local makes all the difference.', 150, 'Get Your Quote', '/contact');