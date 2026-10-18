#!/bin/bash
# Claude Code cloud session setup: deps + local Postgres 16 + S3 emulator, so `npm test` works like CI.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Node deps (npm install, not ci: keeps the cached node_modules between sessions).
# Chromium comes from /opt/pw-browsers (test/run.mjs falls back to it) — never `playwright install`.
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund

# Postgres 16 (preinstalled cluster 16/main on :5432), password = pg, same as CI.
if ! pg_isready -q -h localhost -p 5432; then
  pg_ctlcluster 16 main start || service postgresql start
fi
for i in $(seq 1 30); do pg_isready -q -h localhost -p 5432 && break; sleep 0.5; done
su postgres -c "psql -q -c \"ALTER USER postgres PASSWORD 'pg';\"" >/dev/null

# S3 emulator for the bucket adapter tests (CI does the same).
if ! curl -s -o /dev/null localhost:4569; then
  mkdir -p /tmp/mb-s3
  setsid nohup npx s3rver -d /tmp/mb-s3 -p 4569 --configure-bucket mb-test --silent >/tmp/mb-s3.log 2>&1 < /dev/null &
  for i in $(seq 1 20); do curl -s -o /dev/null localhost:4569 && break; sleep 0.5; done
fi

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  cat >> "$CLAUDE_ENV_FILE" <<'ENV'
export TEST_DATABASE_URL=postgres://postgres:pg@localhost:5432/postgres
export TEST_S3_ENDPOINT=http://localhost:4569
export TEST_S3_KEY=S3RVER
export TEST_S3_SECRET=S3RVER
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV
fi
