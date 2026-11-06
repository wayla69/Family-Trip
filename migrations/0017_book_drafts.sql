-- A book imported from a PDF inside the app waits here as a draft until the parents review it and press "save as a book":
-- seed = the finished format-2 seed (no booking numbers — the privacy scan ran before it was stored), report = what is there /
-- what was defaulted / warnings, cost = the model calls behind it. Not in backups (a draft is a minute's work to redo).
CREATE TABLE IF NOT EXISTS book_drafts (
  id         text PRIMARY KEY,
  family_id  text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  slug       text NOT NULL,
  seed       jsonb NOT NULL,
  report     jsonb NOT NULL DEFAULT '{}',
  cost       jsonb NOT NULL DEFAULT '{}',
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS book_drafts_family ON book_drafts (family_id, created_at DESC);
