-- The day in a few lines: entry kind 'sum' (one per day, id `<trip>.sum.d<i>`), typed on the record page or written by Claude
-- from the day's notes; shown on the book's day page and in the PDF.
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum'));
