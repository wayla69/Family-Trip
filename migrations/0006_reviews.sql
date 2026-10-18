-- The travel notebook: how a stay, a restaurant or a place worked for *this* family, so the next trip can be planned from it.
-- One row per thing per trip (upsert by id `<trip>.rev.<kind>.<key>`); stars, tags, each kid's verdict, a note, "would go again".
CREATE TABLE reviews (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,
  kind        text NOT NULL CHECK (kind IN ('stay', 'food', 'place')),
  key         text NOT NULL,                   -- planned-place key / stay name (stable across re-seeds)
  name        jsonb NOT NULL,                  -- {th, en}
  rating      smallint CHECK (rating BETWEEN 1 AND 5),
  tags        jsonb NOT NULL DEFAULT '[]',     -- preset tag keys, e.g. ["kidsleep", "kitchen"]
  kids        jsonb NOT NULL DEFAULT '{}',     -- {mimi: "love" | "ok" | "no"}
  again       boolean,                         -- would we go again?
  note        text NOT NULL DEFAULT '',
  created_by  text NOT NULL DEFAULT '',
  created_uid text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trip_id, kind, key)
);
