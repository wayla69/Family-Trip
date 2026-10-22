'use strict';
// /healthz answers Railway's deploy health check: can this process serve the app (Postgres up)? Photo storage is checked only
// with ?full=1 (the uptime alert): a storage outage must not keep a new deploy from going live — the books, plans and search
// work without it; only photo upload/view waits for the bucket.
async function health(pg, media, full) {
  try { await pg.query('SELECT 1'); } catch (e) { return { ok: false, why: 'postgres: ' + e.message }; }
  if (full) { try { await media.ping(); } catch (e) { return { ok: false, why: 'storage: ' + e.message }; } }
  return { ok: true };
}
module.exports = { health };
