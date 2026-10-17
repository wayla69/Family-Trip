'use strict';
// Postgres pool (Railway Postgres provides DATABASE_URL). Migrations run once at boot.
const { Pool, types } = require('pg');
types.setTypeParser(1082, (v) => v);   // `date` stays 'YYYY-MM-DD' (no local-midnight Date → timezone shifts in exports)
const { migrate } = require('./migrate');

function create(env = process.env) {
  if (!env.DATABASE_URL) return null;
  const url = env.DATABASE_URL;
  // Railway's private network (*.railway.internal) is plain TCP; public proxy URLs need TLS.
  const ssl = /sslmode=require/.test(url) || env.PGSSL === '1' ? { rejectUnauthorized: false } : undefined;
  return new Pool({ connectionString: url, ssl, max: +env.PG_POOL_MAX || 5, idleTimeoutMillis: 30000 });
}

async function ready(pool, log) {
  await migrate(pool, log);
  const r = await pool.query('SELECT count(*)::int AS n FROM schema_migrations');
  return r.rows[0].n;
}

module.exports = { create, ready };
