-- Update color variables to have properly formatted HSL values with % symbols
UPDATE color_variables SET hsl_value = '331 92% 47%' WHERE css_variable_name = '--color-primary-pink';
UPDATE color_variables SET hsl_value = '327 87% 62%' WHERE css_variable_name = '--color-cta-accent';
UPDATE color_variables SET hsl_value = '138 23% 70%' WHERE css_variable_name = '--color-eco-green';
UPDATE color_variables SET hsl_value = '339 53% 94%' WHERE css_variable_name = '--color-soft-neutral';
UPDATE color_variables SET hsl_value = '218 7% 34%' WHERE css_variable_name = '--color-dark-neutral';
UPDATE color_variables SET hsl_value = '60 3% 85%' WHERE css_variable_name = '--color-light-neutral';
UPDATE color_variables SET hsl_value = '0 0% 100%' WHERE css_variable_name = '--color-white';

-- Add core theme variables to enable complete dynamic control
INSERT INTO color_variables (palette_id, css_variable_name, variable_name, hsl_value, category, sort_order) 
SELECT 
  (SELECT id FROM color_palettes WHERE is_active = true LIMIT 1),
  '--primary',
  'primary',
  '331 92% 47%',
  'theme',
  10
WHERE NOT EXISTS (SELECT 1 FROM color_variables WHERE css_variable_name = '--primary');

INSERT INTO color_variables (palette_id, css_variable_name, variable_name, hsl_value, category, sort_order) 
SELECT 
  (SELECT id FROM color_palettes WHERE is_active = true LIMIT 1),
  '--primary-foreground',
  'primary-foreground',
  '0 0% 100%',
  'theme',
  11
WHERE NOT EXISTS (SELECT 1 FROM color_variables WHERE css_variable_name = '--primary-foreground');

INSERT INTO color_variables (palette_id, css_variable_name, variable_name, hsl_value, category, sort_order) 
SELECT 
  (SELECT id FROM color_palettes WHERE is_active = true LIMIT 1),
  '--background',
  'background',
  '0 0% 100%',
  'theme',
  12
WHERE NOT EXISTS (SELECT 1 FROM color_variables WHERE css_variable_name = '--background');

INSERT INTO color_variables (palette_id, css_variable_name, variable_name, hsl_value, category, sort_order) 
SELECT 
  (SELECT id FROM color_palettes WHERE is_active = true LIMIT 1),
  '--foreground',
  'foreground',
  '218 7% 34%',
  'theme',
  13
WHERE NOT EXISTS (SELECT 1 FROM color_variables WHERE css_variable_name = '--foreground');