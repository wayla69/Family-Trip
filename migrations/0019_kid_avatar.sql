-- A child's own cartoon character drawn from a photo (server/avatar.js): children.avatar = the id of the current drawing
-- (files k/<slug>/<id>-full.png and -face.png in the family's storage; null = the app's own drawing or the emoji),
-- avatar_gens = one row per successful drawing, for the few-a-year allowance per child (AVATAR_YEARLY).
ALTER TABLE children ADD COLUMN IF NOT EXISTS avatar text;
CREATE TABLE IF NOT EXISTS avatar_gens (
  id         bigserial PRIMARY KEY,
  family_id  text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  child      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS avatar_gens_child ON avatar_gens (family_id, child, created_at);
