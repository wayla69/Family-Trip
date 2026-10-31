-- What we actually spent, day by day. The manual's budget is a planning estimate; this is the real number, typed in on the
-- record page. It lives only in this family's database (never in a seed, never in the printed memory book).
CREATE TABLE spend (
  id          text PRIMARY KEY,
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  trip_id     text NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_index   integer,                         -- NULL = not tied to a day (e.g. a booking paid before the trip)
  amount      numeric(12,2) NOT NULL CHECK (amount >= 0),
  cur         text NOT NULL,                   -- ISO 4217: HKD, MOP, AUD, THB …
  cat         text NOT NULL CHECK (cat IN ('food', 'transport', 'tickets', 'stay', 'shop', 'other')),
  note        text NOT NULL DEFAULT '',
  created_by  text NOT NULL DEFAULT '',
  created_uid text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX spend_trip_day ON spend (trip_id, day_index);
