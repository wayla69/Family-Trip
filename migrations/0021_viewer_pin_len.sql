-- The length of each relatives' group PIN (the PIN itself is only ever stored as a keyed hash). The sign-in pad uses the set of
-- PIN lengths to sign in by itself once the last digit is typed — no "open" button to find. NULL = a group saved before this
-- column existed (its length is unknown until its PIN is set again).
ALTER TABLE viewer_groups ADD COLUMN IF NOT EXISTS pin_len smallint;
