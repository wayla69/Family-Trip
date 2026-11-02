-- Bedtime questions: entry kind 'talk' (one per day, id `<trip>.talk.d<i>`, one question per line), written by Claude from the
-- day's notes when a grown-up presses the button on the record page; the children hear them in kid mode ("Let's talk").
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk'));
