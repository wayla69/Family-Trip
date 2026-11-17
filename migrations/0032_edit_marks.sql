-- who last changed a text and when (owner, Nov 2026: "พ่อแม่แก้พร้อมกันสองเครื่อง"): a phone that edits a kid's words, a note, the
-- day's summary, the foreword, the letter or a photo's caption says which version it started from; when the other parent's phone changed
-- the same text since, the server answers 409 conflict with the other version instead of writing over it, and the phone asks which to
-- keep. edited_uid is the session of the phone that last wrote it (never a name of a person outside the family); edited_by its name.
ALTER TABLE entries ADD COLUMN IF NOT EXISTS edited_uid text;
ALTER TABLE entries ADD COLUMN IF NOT EXISTS edited_by text;
ALTER TABLE media ADD COLUMN IF NOT EXISTS edited_at timestamptz;
ALTER TABLE media ADD COLUMN IF NOT EXISTS edited_uid text;
ALTER TABLE media ADD COLUMN IF NOT EXISTS edited_by text;
