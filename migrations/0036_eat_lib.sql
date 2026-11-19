-- the family's library of places to eat (owner, Nov 2026: "ร้านอาหาร … ทำเป็นคลัง"; server/eatlib.js): one row a place under its town,
-- in the shape of a book's "where to eat" row. Filled from every book the family has and, for a town with none, by the helper with a
-- web check (src 'helper', the day it was checked). A place the parents take out stays out (gone) — the next boot does not bring it
-- back. Not in backups: the books it is read from are, and a helper's list can be asked for again.
CREATE TABLE IF NOT EXISTS eat_lib (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  town        text NOT NULL,
  town_th     text NOT NULL DEFAULT '',
  tkey        text NOT NULL,
  nkey        text NOT NULL,
  area        jsonb,
  kind        int  NOT NULL DEFAULT 0,
  name        text NOT NULL,
  row         jsonb NOT NULL DEFAULT '{}',
  src         text NOT NULL DEFAULT 'book',
  trip        text,
  st          text NOT NULL DEFAULT '',
  url         text NOT NULL DEFAULT '',
  checked     date,
  gone        boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, tkey, nkey)
);
CREATE INDEX IF NOT EXISTS eat_lib_family ON eat_lib (family_id, tkey);
