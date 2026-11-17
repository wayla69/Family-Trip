-- letters to open in the future (owner, Nov 2026: "จดหมายเปิดในอนาคต"; server/capsule.js): the parents write to a child (or both) and
-- choose the day it may be opened — when they turn 10, 15 or 18, or any date. Until it is sealed it can be changed; once sealed its
-- text never leaves the server before that day (not to the app, not to a relative), and on the day the parents' phones hear it may be
-- opened. In backups: it is the family's own.
CREATE TABLE IF NOT EXISTS capsules (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  child       text NOT NULL DEFAULT 'both',
  title       text NOT NULL DEFAULT '',
  text        text NOT NULL DEFAULT '',
  open_on     date NOT NULL,
  sealed_at   timestamptz,
  created_by  text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS capsules_family ON capsules (family_id, open_on);
