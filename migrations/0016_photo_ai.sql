-- Photos: what Claude saw (only when a grown-up presses "look at today's photos", and only with PHOTO_AI=1):
--   tags  = a few keys from the fixed list (public/core.js PHOTO_TAGS / server/story.js TAGS), also hand-edited in the lightbox
--   place = which of the day's stops the photo belongs to (one of the plan's names, or '')
--   ai_at = when Claude looked (NULL = never) — the button sends only photos it has not seen
ALTER TABLE media ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE media ADD COLUMN IF NOT EXISTS place text NOT NULL DEFAULT '';
ALTER TABLE media ADD COLUMN IF NOT EXISTS ai_at timestamptz;
