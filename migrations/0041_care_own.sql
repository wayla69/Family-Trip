-- the family's own places in the list of help and play near a stay (owner, Nov 2026: "ให้ครอบครัวเพิ่มที่เองได้" — small towns the
-- web does not know: a clinic, a playground, a mall's baby room the parents found themselves). One row a place, under a library
-- town id (server/care/*.json towns); the name, kind, a short note; in backups. Never opening hours or a phone number.
CREATE TABLE IF NOT EXISTS care_own (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  place       text NOT NULL,
  name        text NOT NULL,
  kind        text NOT NULL,
  note        text NOT NULL DEFAULT '',
  created_by  text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS care_own_place ON care_own (family_id, place);
