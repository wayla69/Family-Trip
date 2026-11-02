-- Claude usage per family per UTC day: the daily cap (STORY_DAILY) is counted here, so a redeploy no longer resets it,
-- and the tokens each call used are added up for the "Claude today" card (watching the API bill). Not in backups.
CREATE TABLE IF NOT EXISTS ai_usage (
  family_id     text NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  day           date NOT NULL,
  calls         int NOT NULL DEFAULT 0,
  tokens_in     bigint NOT NULL DEFAULT 0,   -- input tokens billed at the full rate (incl. writing the cache)
  tokens_cached bigint NOT NULL DEFAULT 0,   -- input tokens read from the prompt cache (billed at a fraction)
  tokens_out    bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (family_id, day)
);
