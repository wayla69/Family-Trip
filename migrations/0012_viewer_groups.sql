-- Relatives in groups (ฝั่งคุณยาย, ฝั่งคุณย่า, เพื่อน…): each group has its own view-only PIN and/or link and sees only the
-- books ticked for it. The PIN is never stored: pin_hash = HMAC-SHA256(session secret, PIN). Deleting a group signs its
-- phones out (their cookie names the group, which no longer exists). Not in backups: groups are access, not memories.
CREATE TABLE IF NOT EXISTS viewer_groups (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name        text NOT NULL,
  pin_hash    text UNIQUE,                 -- null = link only
  link_token  text UNIQUE,                 -- /v/<token>; null = PIN only
  trips       text[] NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
