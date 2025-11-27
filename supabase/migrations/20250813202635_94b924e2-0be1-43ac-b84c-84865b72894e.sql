-- Remove the 10-yard and 40-yard entries we added since we're redirecting them instead
DELETE FROM rolloff_sizes WHERE slug IN ('10-yard', '40-yard');