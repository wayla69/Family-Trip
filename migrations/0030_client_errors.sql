-- what went wrong on the family's phones (owner, Nov 2026: "รู้เมื่อมีอะไรพังบนมือถือ"): a script error the app itself threw, sent by
-- core.js and kept here for 30 days — the message, which file and line, the app version, the kind of page and of phone. Never a name,
-- a text the family wrote, a photo, a position, an address, a cookie or a code. One row per error per day, counted. Not in backups.
CREATE TABLE IF NOT EXISTS client_errors (
  sig        text PRIMARY KEY,
  family_id  text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  day        date NOT NULL,
  msg        text NOT NULL DEFAULT '',
  src        text NOT NULL DEFAULT '',
  line       integer NOT NULL DEFAULT 0,
  col        integer NOT NULL DEFAULT 0,
  ver        text NOT NULL DEFAULT '',
  route      text NOT NULL DEFAULT '',
  device     text NOT NULL DEFAULT '',
  n          integer NOT NULL DEFAULT 1,
  first_at   timestamptz NOT NULL DEFAULT now(),
  last_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS client_errors_last ON client_errors (family_id, last_at DESC);
