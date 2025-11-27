-- Create app role enum for internal access control
CREATE TYPE public.app_role AS ENUM ('super_admin', 'dumpster_diverz_team', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or team member
CREATE OR REPLACE FUNCTION public.is_internal_user(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin', 'dumpster_diverz_team')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Super admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create color palettes table
CREATE TABLE public.color_palettes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT false,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on color_palettes
ALTER TABLE public.color_palettes ENABLE ROW LEVEL SECURITY;

-- Create color variables table
CREATE TABLE public.color_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    palette_id UUID REFERENCES public.color_palettes(id) ON DELETE CASCADE NOT NULL,
    variable_name TEXT NOT NULL, -- e.g., 'primary', 'secondary', 'accent'
    css_variable_name TEXT NOT NULL, -- e.g., '--primary', '--secondary'
    hsl_value TEXT NOT NULL, -- e.g., '209 23 104' (HSL values without hsl())
    description TEXT,
    category TEXT, -- e.g., 'brand', 'neutral', 'semantic'
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (palette_id, variable_name),
    UNIQUE (palette_id, css_variable_name)
);

-- Enable RLS on color_variables
ALTER TABLE public.color_variables ENABLE ROW LEVEL SECURITY;

-- RLS policies for color management (internal users only)
CREATE POLICY "Internal users can manage color palettes"
ON public.color_palettes
FOR ALL
TO authenticated
USING (public.is_internal_user(auth.uid()));

CREATE POLICY "Public can read active color palettes"
ON public.color_palettes
FOR SELECT
USING (is_active = true);

CREATE POLICY "Internal users can manage color variables"
ON public.color_variables
FOR ALL
TO authenticated
USING (public.is_internal_user(auth.uid()));

CREATE POLICY "Public can read color variables from active palettes"
ON public.color_variables
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.color_palettes 
        WHERE id = palette_id AND is_active = true
    )
);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_color_palettes_updated_at
    BEFORE UPDATE ON public.color_palettes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_color_variables_updated_at
    BEFORE UPDATE ON public.color_variables
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default Dumpster Diverz color palette
INSERT INTO public.color_palettes (name, slug, description, is_active, is_default)
VALUES ('Dumpster Diverz Default', 'dumpster-diverz-default', 'Default color palette for Dumpster Diverz brand', true, true);

-- Get the palette ID for inserting default colors
DO $$
DECLARE
    default_palette_id UUID;
BEGIN
    SELECT id INTO default_palette_id 
    FROM public.color_palettes 
    WHERE slug = 'dumpster-diverz-default';

    -- Insert default color variables based on custom instructions
    INSERT INTO public.color_variables (palette_id, variable_name, css_variable_name, hsl_value, description, category, sort_order) VALUES
    (default_palette_id, 'primary-pink', '--color-primary-pink', '331 92 47', 'Berry Pink - Main CTAs, quote boxes, buttons', 'brand', 1),
    (default_palette_id, 'cta-accent', '--color-cta-accent', '327 87 62', 'Raspberry Pink - Backgrounds and CTA highlights', 'brand', 2),
    (default_palette_id, 'eco-green', '--color-eco-green', '138 23 70', 'Eco Green - Used in eco sections or trust blocks', 'accent', 3),
    (default_palette_id, 'soft-neutral', '--color-soft-neutral', '339 53 94', 'Light Blush - Testimonials, quote forms, content separation', 'neutral', 4),
    (default_palette_id, 'dark-neutral', '--color-dark-neutral', '218 7 34', 'Charcoal Gray - Body text, navigation, headers', 'neutral', 5),
    (default_palette_id, 'light-neutral', '--color-light-neutral', '60 3 85', 'Cool Gray 3 - Card containers, input fields, FAQ backgrounds', 'neutral', 6),
    (default_palette_id, 'base-white', '--color-white', '0 0 100', 'True White - Page backgrounds, section dividers, button text', 'neutral', 7);
END $$;