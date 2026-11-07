-- The printed memory book's style by age, chosen by the parents: entry kind 'bookage' (one per trip, no day, id `<trip>.bookage.all`),
-- text 'auto' (by the youngest child's age at the trip) or 'little' (1–3) · 'kid' (4–7) · 'big' (8+).
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter', 'mquiz', 'fore', 'cover', 'bookage'));
