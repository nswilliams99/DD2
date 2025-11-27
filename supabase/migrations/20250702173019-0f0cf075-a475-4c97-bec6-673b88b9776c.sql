-- Create commercial_sizes table for centralized commercial dumpster size management
CREATE TABLE public.commercial_sizes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  size_value INTEGER NOT NULL, -- 2, 3, 4, 6, 8
  size_label TEXT NOT NULL, -- "2-Yard", "3-Yard", etc.
  title TEXT NOT NULL, -- "2 Yard Dumpster"
  description TEXT NOT NULL, -- "Perfect for small businesses and coffee shops"
  capacity_bags INTEGER NOT NULL, -- Number of bags it holds
  weight_limit INTEGER NOT NULL, -- Weight limit in pounds
  dimensions TEXT NOT NULL, -- "6' L x 3' W x 3' H"
  ideal_for TEXT[] NOT NULL, -- ["coffee shops", "small offices", "retail stores"]
  pickup_options TEXT[] NOT NULL, -- ["daily", "weekly", "bi-weekly"]
  pricing_range TEXT, -- "$75-$150"
  hero_image_url TEXT,
  hero_alt_text TEXT,
  features JSONB DEFAULT '[]'::jsonb, -- Array of feature objects {icon, title, description}
  specifications JSONB DEFAULT '{}'::jsonb, -- Key-value pairs for specs table
  faqs JSONB DEFAULT '[]'::jsonb, -- Array of FAQ objects {question, answer}
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_commercial_sizes_active_sort ON public.commercial_sizes (is_active, sort_order);
CREATE INDEX idx_commercial_sizes_value ON public.commercial_sizes (size_value);

-- Enable RLS
ALTER TABLE public.commercial_sizes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read active commercial sizes" 
ON public.commercial_sizes 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage commercial sizes" 
ON public.commercial_sizes 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_commercial_sizes_updated_at
BEFORE UPDATE ON public.commercial_sizes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data for 2-8 yard commercial dumpsters
INSERT INTO public.commercial_sizes (
  size_value, size_label, title, description, capacity_bags, weight_limit, 
  dimensions, ideal_for, pickup_options, pricing_range, hero_image_url, 
  hero_alt_text, features, specifications, faqs, sort_order
) VALUES 
(2, '2-Yard', '2 Yard Dumpster', 'Perfect for small businesses and coffee shops', 16, 1000,
 '6'' L x 3'' W x 3'' H', 
 ARRAY['coffee shops', 'small offices', 'retail stores', 'salons'],
 ARRAY['daily', 'weekly', 'bi-weekly'],
 '$75-$150',
 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
 'Dumpster Diverz 2-yard commercial dumpster perfect for small businesses',
 '[
   {"icon": "Building", "title": "Perfect for Small Businesses", "description": "Ideal for coffee shops, small offices, and retail stores with moderate waste volumes. Fits behind small storefronts and tight spaces."},
   {"icon": "Truck", "title": "Flexible Pickup Schedule", "description": "Choose from daily, weekly, or bi-weekly pickup schedules to match your business needs and budget"},
   {"icon": "Clock", "title": "Reliable Weekly Service", "description": "Consistent pickup times and professional service you can count on for your small business trash pickup"},
   {"icon": "Shield", "title": "Holds Up to 16 Bags", "description": "Generous capacity with 1,000 lb weight limit, perfect for typical small business waste loads"}
 ]'::jsonb,
 '{"Dimensions": "6'' L x 3'' W x 3'' H", "Capacity": "~16 trash bags", "Weight Limit": "1,000 lbs", "Pickup Options": "Daily, Weekly, Bi-weekly", "Ideal For": "Small offices, retail stores, coffee shops"}'::jsonb,
 '[
   {"question": "What types of small businesses can use a 2-yard commercial dumpster?", "answer": "2-yard dumpsters are perfect for coffee shops, small offices, retail stores, salons, and other small businesses that generate moderate waste volumes. They fit easily behind small storefronts and in tight urban spaces throughout Windsor, Fort Collins, and Wellington."},
   {"question": "How often can I schedule pickup for my 2-yard commercial dumpster in Northern Colorado?", "answer": "We offer flexible pickup schedules including daily pickup for busy locations, weekly pickup (most popular option), and bi-weekly pickup for cost-effective waste management in Windsor, Fort Collins, and Wellington areas."}
 ]'::jsonb,
 1),

(3, '3-Yard', '3 Yard Dumpster', 'Perfect for restaurants and retail stores', 24, 1500,
 '6'' L x 3'' W x 4'' H',
 ARRAY['restaurants', 'retail stores', 'medium offices', 'cafes'],
 ARRAY['daily', 'weekly', 'bi-weekly'],
 '$100-$200',
 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
 'Dumpster Diverz 3-yard commercial dumpster perfect for restaurants and retail stores',
 '[
   {"icon": "Building", "title": "Perfect for Restaurants", "description": "Ideal for restaurants, larger retail stores, and medium-sized offices with higher waste volumes"},
   {"icon": "Truck", "title": "Daily Pickup Available", "description": "Essential for restaurants and food service businesses that need frequent waste removal"},
   {"icon": "Clock", "title": "Health Code Compliant", "description": "Regular pickup schedules help maintain sanitation standards for food service businesses"},
   {"icon": "Shield", "title": "Holds Up to 24 Bags", "description": "Increased capacity with 1,500 lb weight limit for businesses with higher waste volumes"}
 ]'::jsonb,
 '{"Dimensions": "6'' L x 3'' W x 4'' H", "Capacity": "~24 trash bags", "Weight Limit": "1,500 lbs", "Pickup Options": "Daily, Weekly, Bi-weekly", "Ideal For": "Restaurants, retail stores, medium offices"}'::jsonb,
 '[
   {"question": "What types of businesses need a 3-yard commercial dumpster?", "answer": "3-yard dumpsters are ideal for restaurants, cafes, larger retail stores, and medium-sized offices that generate higher waste volumes than small businesses can handle with a 2-yard container."},
   {"question": "Can a 3-yard dumpster handle restaurant food waste?", "answer": "Yes, 3-yard dumpsters are excellent for restaurants and food service businesses. We recommend daily or frequent pickup schedules to maintain health code compliance and prevent odors."}
 ]'::jsonb,
 2),

(4, '4-Yard', '4 Yard Dumpster', 'Ideal for large offices and busy restaurants', 32, 2000,
 '6'' L x 5'' W x 4'' H',
 ARRAY['large offices', 'busy restaurants', 'retail chains', 'medical offices'],
 ARRAY['daily', 'weekly', 'bi-weekly'],
 '$150-$250',
 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
 'Dumpster Diverz 4-yard commercial dumpster for large offices and busy restaurants',
 '[
   {"icon": "Building", "title": "High-Volume Businesses", "description": "Perfect for large offices, busy restaurants, and retail chains with substantial daily waste"},
   {"icon": "Truck", "title": "Frequent Service Options", "description": "Daily and weekly pickup available to handle high-volume waste generation"},
   {"icon": "Clock", "title": "Professional Service", "description": "Reliable pickup times designed for busy commercial environments"},
   {"icon": "Shield", "title": "Holds Up to 32 Bags", "description": "Large capacity with 2,000 lb weight limit for high-volume waste generators"}
 ]'::jsonb,
 '{"Dimensions": "6'' L x 5'' W x 4'' H", "Capacity": "~32 trash bags", "Weight Limit": "2,000 lbs", "Pickup Options": "Daily, Weekly, Bi-weekly", "Ideal For": "Large offices, busy restaurants, retail chains"}'::jsonb,
 '[
   {"question": "What size businesses need a 4-yard commercial dumpster?", "answer": "4-yard dumpsters are designed for high-volume businesses like large offices with 50+ employees, busy restaurants, retail chains, and medical facilities that generate substantial daily waste."},
   {"question": "How often should a 4-yard dumpster be picked up?", "answer": "Most 4-yard customers choose daily or weekly pickup depending on their waste volume. Restaurants typically need daily service, while offices often do well with weekly pickup."}
 ]'::jsonb,
 3),

(6, '6-Yard', '6 Yard Dumpster', 'Heavy-duty solution for large commercial operations', 48, 3000,
 '6'' L x 5'' W x 6'' H',
 ARRAY['large restaurants', 'shopping centers', 'warehouses', 'manufacturing'],
 ARRAY['daily', 'weekly'],
 '$200-$300',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
 'Dumpster Diverz 6-yard commercial dumpster for heavy-duty commercial operations',
 '[
   {"icon": "Building", "title": "Large Commercial Operations", "description": "Designed for shopping centers, large restaurants, warehouses, and manufacturing facilities"},
   {"icon": "Truck", "title": "Heavy-Duty Construction", "description": "Built to handle high-volume waste and frequent use in demanding commercial environments"},
   {"icon": "Clock", "title": "Efficient Collection", "description": "Streamlined pickup process designed for large-scale commercial waste management"},
   {"icon": "Shield", "title": "Holds Up to 48 Bags", "description": "Maximum capacity with 3,000 lb weight limit for the largest commercial waste volumes"}
 ]'::jsonb,
 '{"Dimensions": "6'' L x 5'' W x 6'' H", "Capacity": "~48 trash bags", "Weight Limit": "3,000 lbs", "Pickup Options": "Daily, Weekly", "Ideal For": "Shopping centers, large restaurants, warehouses"}'::jsonb,
 '[
   {"question": "What businesses need a 6-yard commercial dumpster?", "answer": "6-yard dumpsters serve large commercial operations like shopping centers, major restaurants, warehouses, manufacturing facilities, and multi-tenant buildings that generate substantial waste volumes."},
   {"question": "Can a 6-yard dumpster handle mixed commercial waste?", "answer": "Yes, 6-yard dumpsters can handle standard commercial waste including paper, cardboard, food waste, and general business refuse. Contact us for specific material restrictions."}
 ]'::jsonb,
 4),

(8, '8-Yard', '8 Yard Dumpster', 'Maximum capacity for enterprise-level waste management', 64, 4000,
 '6'' L x 6'' W x 7'' H',
 ARRAY['large warehouses', 'shopping malls', 'hospitals', 'universities'],
 ARRAY['daily', 'weekly'],
 '$250-$400',
 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
 'Dumpster Diverz 8-yard commercial dumpster for enterprise-level waste management',
 '[
   {"icon": "Building", "title": "Enterprise-Level Solutions", "description": "Maximum capacity for hospitals, universities, shopping malls, and large industrial facilities"},
   {"icon": "Truck", "title": "Industrial-Grade Service", "description": "Professional waste management for the largest commercial and institutional facilities"},
   {"icon": "Clock", "title": "Scheduled Efficiency", "description": "Optimized pickup routes and timing for high-capacity commercial waste management"},
   {"icon": "Shield", "title": "Holds Up to 64 Bags", "description": "Maximum commercial capacity with 4,000 lb weight limit for enterprise-level operations"}
 ]'::jsonb,
 '{"Dimensions": "6'' L x 6'' W x 7'' H", "Capacity": "~64 trash bags", "Weight Limit": "4,000 lbs", "Pickup Options": "Daily, Weekly", "Ideal For": "Hospitals, universities, shopping malls, large warehouses"}'::jsonb,
 '[
   {"question": "What institutions need an 8-yard commercial dumpster?", "answer": "8-yard dumpsters serve enterprise-level facilities like hospitals, universities, shopping malls, large warehouses, and multi-building complexes that generate maximum commercial waste volumes."},
   {"question": "How is 8-yard dumpster service scheduled for large facilities?", "answer": "We work with facility managers to create customized pickup schedules, typically daily or multiple times per week, to ensure consistent waste management for large operations."}
 ]'::jsonb,
 5);