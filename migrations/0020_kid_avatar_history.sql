-- A child's drawings over the years (server/avatar.js): children.avatars = [{id, at: 'YYYY-MM-DD', age_m}] — every drawing kept with the
-- date and the child's age in months when it was drawn, so each book shows the child as they were on that trip (the newest drawing
-- made by the trip's last day), and the family page can suggest a new drawing once the child has grown a year. children.avatar stays the newest.
ALTER TABLE children ADD COLUMN IF NOT EXISTS avatars jsonb NOT NULL DEFAULT '[]';
UPDATE children SET avatars = jsonb_build_array(jsonb_build_object('id', avatar, 'at', to_char(now(), 'YYYY-MM-DD'), 'age_m', NULL))
  WHERE avatar IS NOT NULL AND avatars = '[]';
