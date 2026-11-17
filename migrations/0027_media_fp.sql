-- a fingerprint of the original file a photo or clip came from (owner, Nov 2026: "ไม่ให้รูปเดิมขึ้นซ้ำ"): the phone hashes the file's
-- size, first and last 64 KB before it shrinks it; a file the book already holds is not sent again. Not the picture, not secret.
ALTER TABLE media ADD COLUMN IF NOT EXISTS fp text;
CREATE INDEX IF NOT EXISTS media_trip_fp ON media (trip_id, fp) WHERE fp IS NOT NULL;
