-- Reminders on the trip: a push to the grown-ups' phones 30 minutes before each timed step of the day's plan.
-- push_subs: one row per phone that switched reminders on (Web Push endpoint + its keys; no names, no codes).
-- push_sent: one row per reminder already sent, so a restart or a second instance never sends it twice.
CREATE TABLE push_subs (
  id          text PRIMARY KEY,                -- sha256 of the endpoint
  family_id   text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  endpoint    text NOT NULL,
  p256dh      text NOT NULL,
  auth        text NOT NULL,
  lang        text NOT NULL DEFAULT 'th',
  created_at  timestamptz NOT NULL DEFAULT now(),
  last_ok     timestamptz
);
CREATE TABLE push_sent (
  key      text PRIMARY KEY,                   -- <trip>.d<day>.p<row>
  sent_at  timestamptz NOT NULL DEFAULT now()
);
