-- Per-day weather line from the trip seed ({th, en}), shown on the day page like the manual's "December weather".
ALTER TABLE trip_days ADD COLUMN IF NOT EXISTS wx jsonb;
