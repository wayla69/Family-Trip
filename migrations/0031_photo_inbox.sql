-- photos the relatives send for a book (owner, Nov 2026: "ญาติส่งรูปเข้าเล่มได้ แต่ต้องรอพ่อแม่กดอนุมัติก่อน"; server/inbox.js): kept
-- apart from the book's own photos until a parent puts one in (it then becomes a row of media like any photo) or turns it away (its
-- files are deleted). Its files are i/<trip>/<id>.jpg and i/<trip>/t/<id>.jpg — metadata stripped like every photo. Not in backups:
-- a photo waiting is not yet the family's.
CREATE TABLE IF NOT EXISTS photo_inbox (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,
  bytes       integer NOT NULL DEFAULT 0,
  width       integer NOT NULL DEFAULT 0,
  height      integer NOT NULL DEFAULT 0,
  caption     text NOT NULL DEFAULT '',
  taken_at    timestamptz,
  from_name   text NOT NULL DEFAULT '',
  created_uid text NOT NULL DEFAULT '',
  ph          text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS photo_inbox_family ON photo_inbox (family_id, created_at);
