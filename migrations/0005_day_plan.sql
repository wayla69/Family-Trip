-- The day's plan from the trip seed, like the manual's day card: {moving, pick, planB, money, plan: [{t, th, en}], tips: [{th, en}]}.
-- Times, transport and prices only — never bookings, PNRs or confirmation numbers (those stay out of the bookshelf).
ALTER TABLE trip_days ADD COLUMN IF NOT EXISTS plan jsonb NOT NULL DEFAULT '{}';
-- Trip-wide pocket guide from the seed: stays with addresses, emergency numbers, attraction prices, packing, things to learn.
ALTER TABLE trips ADD COLUMN IF NOT EXISTS info jsonb NOT NULL DEFAULT '{}';
