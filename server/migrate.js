'use strict';
// Numbered SQL migrations + journal (docs/ADR.md ADR-2). Runs on boot; also used by scripts/check-migrations.js (CI "migrations-journaled").
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = path.join(__dirname, '..', 'migrations');
const FILE_RE = /^(\d{4})_[a-z0-9_]+\.sql$/;

// Validate journal ⇄ files: every file journaled, every entry exists, ids 0001.. contiguous, id matches file prefix.
function readJournal(dir = DIR) {
  const errors = [];
  const journal = JSON.parse(fs.readFileSync(path.join(dir, 'journal.json'), 'utf8')).migrations || [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql'));
  for (const f of files) {
    if (!FILE_RE.test(f)) errors.push(`bad file name: ${f} (want NNNN_lower_snake.sql)`);
    if (!journal.some((m) => m.file === f)) errors.push(`not in journal.json: ${f}`);
  }
  journal.forEach((m, i) => {
    const want = String(i + 1).padStart(4, '0');
    if (m.id !== want) errors.push(`journal entry ${i + 1} has id ${m.id}, expected ${want} (duplicate or gap?)`);
    if (!m.file || !m.file.startsWith(m.id + '_')) errors.push(`journal entry ${m.id} file ${m.file} does not start with its id`);
    if (!files.includes(m.file)) errors.push(`journal lists missing file: ${m.file}`);
  });
  if (errors.length) throw Object.assign(new Error('migrations journal invalid:\n  ' + errors.join('\n  ')), { errors });
  return journal.map((m) => {
    const sql = fs.readFileSync(path.join(dir, m.file), 'utf8');
    return { ...m, sql, sum: crypto.createHash('sha256').update(sql).digest('hex') };
  });
}

async function migrate(pool, log = console.log) {
  const list = readJournal();
  const c = await pool.connect();
  try {
    await c.query('SELECT pg_advisory_lock(727001)');   // one booting instance at a time
    await c.query('CREATE TABLE IF NOT EXISTS schema_migrations (id text PRIMARY KEY, file text NOT NULL, sum text NOT NULL, at timestamptz NOT NULL DEFAULT now())');
    const done = new Map((await c.query('SELECT id, sum FROM schema_migrations')).rows.map((r) => [r.id, r.sum]));
    for (const m of list) {
      if (done.has(m.id)) {
        if (done.get(m.id) !== m.sum) throw new Error(`migration ${m.file} was edited after it ran — add a new migration instead`);
        continue;
      }
      await c.query('BEGIN');
      try {
        await c.query(m.sql);
        await c.query('INSERT INTO schema_migrations (id, file, sum) VALUES ($1, $2, $3)', [m.id, m.file, m.sum]);
        await c.query('COMMIT');
        log(`migration ${m.file} applied`);
      } catch (e) { await c.query('ROLLBACK'); throw new Error(`migration ${m.file} failed: ${e.message}`); }
    }
  } finally {
    await c.query('SELECT pg_advisory_unlock(727001)').catch(() => {});
    c.release();
  }
}

module.exports = { readJournal, migrate };
