-- A book from photos (docs/SNAP-BOOK.md D4): a book made from the photos' own dates, with no plan behind it.
-- trips.kind 'snap' (a 'plan' book comes from a manual or a seed), trips.open = started on the trip and still taking new days;
-- trip_days.place = the day's place in words (the phone names a photo's position and drops it; no coordinates are ever stored).
ALTER TABLE trips ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'plan';
ALTER TABLE trips DROP CONSTRAINT IF EXISTS trips_kind_check;
ALTER TABLE trips ADD CONSTRAINT trips_kind_check CHECK (kind IN ('plan', 'snap'));
ALTER TABLE trips ADD COLUMN IF NOT EXISTS open boolean NOT NULL DEFAULT false;
ALTER TABLE trip_days ADD COLUMN IF NOT EXISTS place jsonb;
