#!/bin/bash
# Claude Code cloud session setup: deps + local Postgres 16 + S3 emulator, so `npm test` works like CI.
# Async: the session opens at once while this runs; /tmp/mb-session-ready appears when everything is up.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 300000}'

cd "$CLAUDE_PROJECT_DIR"
rm -f /tmp/mb-session-ready

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  cat >> "$CLAUDE_ENV_FILE" <<'ENV'
export TEST_DATABASE_URL=postgres://postgres:pg@localhost:5432/postgres
export TEST_S3_ENDPOINT=http://localhost:4569
export TEST_S3_KEY=S3RVER
export TEST_S3_SECRET=S3RVER
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV
fi

# Postgres 16 (preinstalled cluster 16/main on :5432), password = pg, same as CI.
if ! pg_isready -q -h localhost -p 5432; then
  pg_ctlcluster 16 main start || service postgresql start
fi
for i in $(seq 1 30); do pg_isready -q -h localhost -p 5432 && break; sleep 0.5; done
su postgres -c "psql -q -c \"ALTER USER postgres PASSWORD 'pg';\"" >/dev/null

# Node deps (npm install, not ci: keeps the cached node_modules between sessions).
# Chromium comes from /opt/pw-browsers (test/run.mjs falls back to it) — never `playwright install`.
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund >/tmp/mb-npm-install.log 2>&1

# S3 emulator for the bucket adapter tests (CI does the same). Needs node_modules, so after npm install.
if ! curl -s -o /dev/null localhost:4569; then
  mkdir -p /tmp/mb-s3
  setsid nohup npx s3rver -d /tmp/mb-s3 -p 4569 --configure-bucket mb-test --silent >/tmp/mb-s3.log 2>&1 < /dev/null &
  for i in $(seq 1 20); do curl -s -o /dev/null localhost:4569 && break; sleep 0.5; done
fi

touch /tmp/mb-session-ready
