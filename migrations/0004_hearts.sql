-- Hearts from the family: relatives on the read-only link (and the grown-ups) send a heart or a short note to Mimi / Mika.
-- The kids see them in kid mode ("Grandma sent you a heart 💗"). Text only, no photos; included in backups and the PDPA export.
CREATE TABLE hearts (
  id          text PRIMARY KEY,                 -- client id (the offline queue may retry)
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,                          -- the trip day it was sent on, null before/after the trip
  child       text NOT NULL,                    -- 'mimi' | 'mika' | 'both'
  emoji       text NOT NULL,
  text        text NOT NULL DEFAULT '',
  from_name   text NOT NULL,                    -- what the sender calls themself ("ยาย", "Grandpa")
  created_uid text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX hearts_family_time ON hearts (family_id, created_at);
