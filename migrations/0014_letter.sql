-- A letter to Mimi and Mika, to read when they are older: entry kind 'letter' (one per trip, no day, id `<trip>.letter.all`),
-- drafted by Claude from the whole trip's notes when a grown-up presses the button, edited by hand; the last page of the PDF.
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter'));
