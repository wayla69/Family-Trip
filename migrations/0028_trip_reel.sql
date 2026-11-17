-- a book's own short film (owner, Nov 2026: "คลิปสรุปทริป"): {v, at, secs, n} of the MP4 kept at r/<trip>/<v>.mp4 (server/reel.js);
-- null until the parents make one
ALTER TABLE trips ADD COLUMN IF NOT EXISTS reel jsonb;
