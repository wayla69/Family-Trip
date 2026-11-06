-- The family's own profile (docs/ADR.md ADR-11: one family per instance, so nothing about Mimi and Mika may be baked in):
-- profile = {app:{th,en}, kicker:{th,en}} as the parents typed it (empty → built from the children's names);
-- look = how a child is drawn: {base: girl|boy, skin, hair, top} — the two hand-drawn characters recoloured (server/family.js).
ALTER TABLE families ADD COLUMN IF NOT EXISTS profile jsonb NOT NULL DEFAULT '{}';
ALTER TABLE children ADD COLUMN IF NOT EXISTS look jsonb;
