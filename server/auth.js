'use strict';
const crypto = require('crypto');

// Cookie signing secret: SESSION_SECRET, else generated once and kept in Postgres (no volume needed).
let SECRET = process.env.SESSION_SECRET || '';
async function init(p) {
  pool = p;
  if (SECRET) return;
  const fresh = crypto.randomBytes(32).toString('hex');
  await p.query("INSERT INTO settings (key, value) VALUES ('session_secret', $1) ON CONFLICT (key) DO NOTHING", [fresh]);
  SECRET = (await p.query("SELECT value FROM settings WHERE key='session_secret'")).rows[0].value;
}
const FAMILY_CODE = process.env.FAMILY_CODE || '';
const VIEW_TOKEN = process.env.VIEW_TOKEN || '';
const VIEW_PIN = process.env.VIEW_PIN && process.env.VIEW_PIN !== FAMILY_CODE ? process.env.VIEW_PIN : '';   // relatives' read-only PIN (same pad as the family's)
const BACKUP_TOKEN = (process.env.BACKUP_TOKEN || '').trim().length >= 24 ? process.env.BACKUP_TOKEN.trim() : '';   // too short → backup endpoint off (a pasted trailing space/newline is not part of it)
const COOKIE = 'mb';
const MAXAGE = 400 * 24 * 3600; // seconds (browser cap)

const b64 = (s) => Buffer.from(s, 'utf8').toString('base64url');
const unb64 = (s) => Buffer.from(s, 'base64url').toString('utf8');
const sign = (p) => crypto.createHmac('sha256', SECRET).update(p).digest('base64url');
const safeEq = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

// a relatives' group session carries the group id as a 6th part; older 5-part cookies (family, VIEW_PIN, VIEW_TOKEN) still read
function makeToken(role, name, uid, group) {
  const exp = Math.floor(Date.now() / 1000) + MAXAGE;
  const p = [role, b64(name), uid, exp].concat(group ? [group] : []).join('.');
  return p + '.' + sign(p);
}
function readToken(t) {
  if (!t) return null;
  const parts = t.split('.');
  if (parts.length !== 5 && parts.length !== 6) return null;
  const sig = parts.pop();
  const p = parts.join('.');
  if (!safeEq(sig, sign(p))) return null;
  const [role, n, uid, exp, group] = parts;
  if (+exp < Date.now() / 1000) return null;
  if (role !== 'editor' && role !== 'viewer') return null;
  if (group && role !== 'viewer') return null;
  return { role, name: unb64(n), uid, group: group || null };
}
// a group's PIN is kept only as a keyed hash (the session secret is the key), so the database alone never reveals a PIN
const pinHash = (pin) => crypto.createHmac('sha256', SECRET).update('viewer-pin:' + String(pin)).digest('hex');
function parseCookies(h) {
  const o = {};
  (h || '').split(';').forEach((kv) => {
    const i = kv.indexOf('=');
    if (i > 0) { try { o[kv.slice(0, i).trim()] = decodeURIComponent(kv.slice(i + 1).trim()); } catch (_) { /* a mangled cookie is skipped, never a 500 on every page */ } }
  });
  return o;
}
function setCookie(res, value, secure) {
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${MAXAGE}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
}
function clearCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
}

// in-memory login throttle. The family code may be a short numeric PIN, so besides 10 wrong tries per device (IP)
// there is a family-wide cap: 30 wrong tries in 10 minutes from anywhere pauses new logins for everyone
// (already signed-in phones keep their 400-day session). 6 digits / 30 per 10 min ≈ years to guess.
const WINDOW = 10 * 60 * 1000, PER_IP = 10, GLOBAL = 30;
const tries = new Map();
let allFails = [];
function throttled(ip) {
  const now = Date.now();
  const a = (tries.get(ip) || []).filter((t) => now - t < WINDOW);
  if (a.length) tries.set(ip, a); else tries.delete(ip);
  allFails = allFails.filter((t) => now - t < WINDOW);
  return a.length >= PER_IP || allFails.length >= GLOBAL;
}
function noteFail(ip) { const a = tries.get(ip) || []; a.push(Date.now()); tries.set(ip, a); allFails.push(Date.now()); }

// relatives' groups (viewer_groups): looked up on every request through a short cache, so deleting a group or changing its
// books takes effect within seconds; editors' changes clear the cache at once (groupsChanged)
let pool = null, groups = null, groupsAt = 0;
const GROUP_TTL = 15000;
async function groupById(id) {
  if (!pool) return null;
  if (!groups || Date.now() - groupsAt > GROUP_TTL) {
    const rows = (await pool.query('SELECT id, name, trips FROM viewer_groups')).rows;
    groups = new Map(rows.map((g) => [g.id, g])); groupsAt = Date.now();
  }
  return groups.get(id) || null;
}
const groupsChanged = () => { groups = null; };
function attachUser(req, _res, next) {
  const u = readToken(parseCookies(req.headers.cookie)[COOKIE]);
  if (!u || !u.group) { req.user = u; return next(); }
  groupById(u.group).then((g) => {
    req.user = g ? { ...u, trips: g.trips, groupName: g.name } : null;   // a deleted group = signed out
    next();
  }, next);
}
// may this session see this book? the family and the old shared PIN/link see all; a group only its ticked books
const canSee = (user, trip) => !!user && (!user.group || (user.trips || []).includes(trip));
function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'auth' });
  next();
}
function requireEditor(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'auth' });
  if (req.user.role !== 'editor') return res.status(403).json({ error: 'read-only' });
  if (req.method !== 'GET' && req.headers['x-mb'] !== '1') return res.status(400).json({ error: 'bad-request' });
  next();
}

module.exports = {
  init, FAMILY_CODE, VIEW_TOKEN, VIEW_PIN, BACKUP_TOKEN, makeToken, setCookie, clearCookie, safeEq, throttled, noteFail,
  attachUser, requireUser, requireEditor, pinHash, canSee, groupsChanged,
};
