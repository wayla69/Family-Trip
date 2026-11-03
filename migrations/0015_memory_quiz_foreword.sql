-- Two more things Claude writes for the family, both only when a grown-up presses the button:
--   'mquiz' = the morning memory game for kid mode (one per day, id `<trip>.mquiz.d<i>`, text = JSON questions with picture answers)
--   'fore'  = the foreword of the memory book (whole trip, no day, id `<trip>.fore.all`), the PDF's first page after the cover
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter', 'mquiz', 'fore'));
