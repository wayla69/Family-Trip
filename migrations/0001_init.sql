-- Memory Bookshelf: initial schema (docs/handoff/Memory_Bookshelf_Handoff.md §4, adapted per docs/ADR.md)
-- Every family table carries family_id. Ids are client-generated text so offline retries stay idempotent.

CREATE TABLE families (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE settings (
  key   text PRIMARY KEY,
  value text NOT NULL
);

CREATE TABLE children (
  id        text PRIMARY KEY,
  family_id text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  slug      text NOT NULL,
  name_th   text NOT NULL,
  name_en   text NOT NULL,
  emoji     text NOT NULL DEFAULT '',
  color     text NOT NULL DEFAULT '',
  birth_ym  text,                         -- 'YYYY-MM' only: enough for "age at trip"
  pos       integer NOT NULL DEFAULT 0,
  UNIQUE (family_id, slug)
);

CREATE TABLE trips (
  id         text PRIMARY KEY,
  family_id  text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  slug       text NOT NULL,
  legacy_id  text,                        -- e.g. 'hk2026' in the Harbour Hop app
  title      jsonb NOT NULL,              -- {th, en}
  sub        jsonb,
  date_from  date NOT NULL,
  date_to    date NOT NULL,
  timezone   text NOT NULL DEFAULT 'Asia/Bangkok',
  theme      jsonb NOT NULL DEFAULT '{}', -- docs/DESIGN.md per-trip tokens
  cover      jsonb NOT NULL DEFAULT '{}',
  stamp      jsonb NOT NULL DEFAULT '{}',
  moods      jsonb NOT NULL DEFAULT '[]',
  source     text NOT NULL DEFAULT 'seed' CHECK (source IN ('seed', 'manual', 'harbour_hop_import')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (family_id, slug)
);

CREATE TABLE trip_days (
  trip_id   text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index integer NOT NULL CHECK (day_index >= 0),
  date      date NOT NULL,
  title     jsonb NOT NULL,
  sleep     jsonb,
  emoji     text NOT NULL DEFAULT '',
  gradient  jsonb,
  planned   jsonb NOT NULL DEFAULT '[]',  -- planned places [{key, kind, en, th, zh}]
  done_at   timestamptz,                  -- "Done" pressed (stamp rule)
  PRIMARY KEY (trip_id, day_index)
);

CREATE TABLE firsts_catalog (
  trip_id text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  key     text NOT NULL,
  emoji   text NOT NULL DEFAULT '',
  label   jsonb NOT NULL,
  pos     integer NOT NULL DEFAULT 0,
  PRIMARY KEY (trip_id, key)
);

-- quote | mood | fav | note | first | story ; photos live in media, check-ins in places
CREATE TABLE entries (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,                    -- NULL = whole trip (e.g. trip story)
  kind        text NOT NULL CHECK (kind IN ('quote', 'mood', 'fav', 'note', 'first', 'story')),
  child       text,                       -- child slug or 'both'
  text        text NOT NULL DEFAULT '',
  mood        text,
  first_key   text,
  lang        text,
  highlight   boolean NOT NULL DEFAULT false,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_by  text NOT NULL DEFAULT '',
  created_uid text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  external_id text
);
CREATE INDEX entries_trip_day ON entries (trip_id, day_index, occurred_at);
CREATE UNIQUE INDEX entries_external ON entries (family_id, external_id) WHERE external_id IS NOT NULL;

CREATE TABLE media (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,
  storage_key text NOT NULL UNIQUE,       -- object key in the bucket; never a public URL
  mime        text NOT NULL DEFAULT 'image/jpeg',
  bytes       integer NOT NULL DEFAULT 0,
  width       integer NOT NULL DEFAULT 0,
  height      integer NOT NULL DEFAULT 0,
  caption     text NOT NULL DEFAULT '',
  highlight   boolean NOT NULL DEFAULT false,
  pos         integer NOT NULL DEFAULT 0,
  taken_at    timestamptz NOT NULL DEFAULT now(),
  created_by  text NOT NULL DEFAULT '',
  created_uid text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  external_id text
);
CREATE INDEX media_trip_day ON media (trip_id, day_index, taken_at);
CREATE UNIQUE INDEX media_external ON media (family_id, external_id) WHERE external_id IS NOT NULL;

-- check-ins at places / meals (the Harbour Hop "visits")
CREATE TABLE places (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,
  key         text NOT NULL,
  kind        text NOT NULL DEFAULT 'place' CHECK (kind IN ('place', 'food')),
  name        jsonb NOT NULL,             -- {en, th, zh}
  visited_at  timestamptz NOT NULL DEFAULT now(),
  created_by  text NOT NULL DEFAULT '',
  external_id text,
  UNIQUE (trip_id, key)
);
CREATE UNIQUE INDEX places_external ON places (family_id, external_id) WHERE external_id IS NOT NULL;
