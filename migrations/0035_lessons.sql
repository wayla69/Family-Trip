-- lessons for the next trip (owner, Nov 2026: "บทเรียนสำหรับทริปหน้า"): after a trip the helper reads the book's own reviews, moods,
-- notes and summaries and writes what worked, what did not and what to try next time — saved as entry kind 'lessons' (one per trip, no
-- day, id `<trip>.lessons.all`), shown in the travel notebook, editable like the letter.
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter', 'mquiz', 'fore', 'cover', 'bookage', 'lessons'));
