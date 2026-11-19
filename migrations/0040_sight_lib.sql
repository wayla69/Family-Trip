-- the library of things to do (docs/PLACES-ECOSYSTEM.md E2, docs/SIGHTS.md; server/sightlib.js): one row a sight under its town. The
-- built-in rows (src 'starter', server/sights/*.json) are each confirmed on the web before they ship (owner, Nov 2026); a family's own
-- part is what the parents take out (gone) and what they would love to go to (wish) — both in backups.
CREATE TABLE IF NOT EXISTS sight_lib (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  place       text NOT NULL DEFAULT '',
  town        text NOT NULL,
  town_th     text NOT NULL DEFAULT '',
  tkey        text NOT NULL,
  nkey        text NOT NULL,
  kind        text NOT NULL DEFAULT '',
  name        text NOT NULL,
  row         jsonb NOT NULL DEFAULT '{}',
  src         text NOT NULL DEFAULT 'starter',
  url         text NOT NULL DEFAULT '',
  checked     date,
  gone        boolean NOT NULL DEFAULT false,
  wish        boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, tkey, nkey)
);
CREATE INDEX IF NOT EXISTS sight_lib_family ON sight_lib (family_id, tkey);
