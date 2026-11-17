-- what a photo looks like, coarsely (owner, Nov 2026: "รูปซ้ำข้ามเครื่อง"): the brightness of a 16×16 grid of its thumbnail, 256 bytes as
-- hex (server/images.js phOf). Two copies of one picture (the original and the copy sent over LINE, re-encoded and smaller) correlate
-- above 0.985; a moment later in a burst, or another picture, below. Not shown to anyone; not the picture.
ALTER TABLE media ADD COLUMN IF NOT EXISTS ph text;
