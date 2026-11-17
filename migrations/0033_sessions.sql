-- the phones signed in (owner, Nov 2026: "มือถือหาย"): one row per sign-in (the cookie's own random uid), so the parents can see which
-- phones hold the books and sign one out — a lost phone's cookie stops working at once (server/auth.js reads revoked_at). The kind of
-- phone is kept as two words ("iphone safari"), never the full browser string; last_seen is updated at most every few minutes.
-- Not in backups: a restored family signs in again.
CREATE TABLE IF NOT EXISTS sessions (
  uid         text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  role        text NOT NULL,
  name        text NOT NULL DEFAULT '',
  group_id    text,
  device      text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  last_seen   timestamptz NOT NULL DEFAULT now(),
  revoked_at  timestamptz
);
CREATE INDEX IF NOT EXISTS sessions_family ON sessions (family_id, last_seen DESC);
