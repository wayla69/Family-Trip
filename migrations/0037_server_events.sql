-- what went wrong on the server, and what was slow (owner, Nov 2026: "จับปัญหาฝั่งเซิร์ฟเวอร์"): an answer of 500 or more, or one that
-- took longer than SLOW_MS — the kind of request (its method and path with every id masked), the status, the error's message scrubbed
-- like the phones' (server/errors.js scrub), how many times and the longest it took. Never a body, a query string, a cookie, a name or an
-- id. One row per kind per day, counted; kept 30 days. Not in backups.
CREATE TABLE IF NOT EXISTS server_events (
  sig       text PRIMARY KEY,
  day       date NOT NULL,
  kind      text NOT NULL CHECK (kind IN ('error', 'slow')),
  route     text NOT NULL DEFAULT '',
  status    integer NOT NULL DEFAULT 0,
  msg       text NOT NULL DEFAULT '',
  n         integer NOT NULL DEFAULT 1,
  ms_max    integer NOT NULL DEFAULT 0,
  first_at  timestamptz NOT NULL DEFAULT now(),
  last_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS server_events_last ON server_events (last_at DESC);
