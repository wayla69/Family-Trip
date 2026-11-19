-- the parents' passkeys (owner, Nov 2026: "เข้าด้วยลายนิ้วมือ/หน้า"): a phone's Face ID / fingerprint signs in for a parent in place of
-- the family code. Only the public half of each key is here (the private half never leaves the phone's secure chip), with who made
-- it, the kind of phone in two words, and when it was last used. Not in backups (a restored family adds its phones again).
CREATE TABLE IF NOT EXISTS passkeys (
  id          text PRIMARY KEY,              -- the credential id (base64url), as the phone names it
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name        text NOT NULL DEFAULT '',
  device      text NOT NULL DEFAULT '',
  public_key  bytea NOT NULL,
  counter     bigint NOT NULL DEFAULT 0,
  transports  text[] NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now(),
  last_used   timestamptz
);
CREATE INDEX IF NOT EXISTS passkeys_family ON passkeys (family_id, created_at);
