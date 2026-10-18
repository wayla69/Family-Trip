-- Kids' adventure passport (like the printed "Kids Adventure Passport"): content per trip from the seed,
-- and two new entry kinds: 'tick' (a mission spot / animal / food / explorer box, per child; text '' | 'yum' | 'yuck')
-- and 'field' (Explorer ID answers per child: favourite animal, superpower, height on the first and last day).
ALTER TABLE trips ADD COLUMN IF NOT EXISTS passport jsonb NOT NULL DEFAULT '{}';
ALTER TABLE entries DROP CONSTRAINT IF EXISTS entries_kind_check;
ALTER TABLE entries ADD CONSTRAINT entries_kind_check CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field'));
