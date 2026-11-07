-- The printed book's cover, chosen by the parents: entry kind 'cover' (one per trip, no day, id `<trip>.cover.all`),
-- text 'art' (the day pictures on the manual's cream panel, the default) or 'photo' (the first ⭐ photo, full width).
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter', 'mquiz', 'fore', 'cover'));
