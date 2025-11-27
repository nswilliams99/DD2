-- Create Services Overview page sections
INSERT INTO page_sections (page_slug, section_name, title, description, display_order) VALUES
('homepage', 'services-overview', 'Our Services', 'From residential weekly pickup to commercial dumpsters and construction roll-offs, we provide comprehensive waste management solutions for Northern Colorado.', 1),
('homepage', 'services-residential', 'Residential Service', 'Weekly trash pickup and recycling for homes. Choose from 64 or 96-gallon carts with convenient online management.', 2),
('homepage', 'services-commercial', 'Commercial Dumpsters', 'Flexible dumpster service for businesses. Multiple sizes and pickup schedules to fit your operations.', 3),
('homepage', 'services-rolloff', 'Roll-Off Dumpsters', 'Construction and project dumpsters. 10-40 yard containers with same-day delivery available.', 4)
ON CONFLICT (page_slug, section_name) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  updated_at = now();