-- the relatives, a step closer (owner, Nov 2026: "ญาติได้แจ้งเตือนเมื่อมีรูปวันนี้" · "ญาติคอมเมนต์ใต้รูปได้"):
-- push_subs.role/group_id: a relative's phone may switch reminders on too — it hears only "today's new photos" of the books its group
-- may see (never the plan's steps, the parents' nudges or the owner's alerts, which stay with role 'editor').
-- comments: a short line under a photo from anyone who may see it (the sender's typed name, ≤ 200 letters) — read aloud in kid mode,
-- in backups with the hearts; a parent removes any, a relative their own.
ALTER TABLE push_subs ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'editor';
ALTER TABLE push_subs ADD COLUMN IF NOT EXISTS group_id text;
CREATE TABLE IF NOT EXISTS comments (
  id           text PRIMARY KEY,
  family_id    text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id      text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  media_id     text NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  from_name    text NOT NULL DEFAULT '',
  text         text NOT NULL,
  created_uid  text NOT NULL DEFAULT '',
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS comments_media ON comments (media_id, created_at);
