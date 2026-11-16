-- the helper's drafts of a book from photos (docs/SNAP-BOOK.md D6, C3): 'ai' while the text is the helper's own; any save by the
-- parents (a changed text, or "use this draft") clears it
ALTER TABLE entries ADD COLUMN IF NOT EXISTS src text;
