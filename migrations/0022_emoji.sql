-- The family's emoji library: each picture the app draws for an emoji (moods, hearts, quotes, notes, captions).
-- The bundled set (public/art/emoji, `file`) is added once per family on boot (server/emoji.js seed, settings 'emoji_seeded');
-- after that the parents add their own (an uploaded picture in the family's storage, `storage_key`) and delete any.
CREATE TABLE emoji (
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  id          text NOT NULL,
  ch          text NOT NULL,                       -- the emoji the picture stands for (what is stored in the text)
  alt         text[] NOT NULL DEFAULT '{}',        -- other emoji drawn with the same picture
  name_th     text NOT NULL DEFAULT '',
  name_en     text NOT NULL DEFAULT '',
  file        text,                                -- a bundled picture: /art/emoji/<file>.webp
  storage_key text,                                -- an uploaded picture: e/<id>.png
  pos         integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (family_id, id),
  UNIQUE (family_id, ch),
  CHECK (file IS NOT NULL OR storage_key IS NOT NULL)
);
