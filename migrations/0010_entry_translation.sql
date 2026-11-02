-- Both languages in the book: a translation of an entry's text (quote, note, favourite, summary, own "first") into the other
-- language (Thai ↔ English), written by Claude when a grown-up presses "translate this day". Cleared when the text changes.
ALTER TABLE entries ADD COLUMN IF NOT EXISTS tr text;
