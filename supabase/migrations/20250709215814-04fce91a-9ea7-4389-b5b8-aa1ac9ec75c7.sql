-- Deactivate commercial sizes that Dumpster Divers doesn't offer
-- Only keep 2-yard and 3-yard active
UPDATE public.commercial_sizes 
SET is_active = false, updated_at = now()
WHERE size_value IN (4, 6, 8);