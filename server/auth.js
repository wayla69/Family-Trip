'use strict';
const crypto = require('crypto');

// Cookie signing secret: SESSION_SECRET, else generated once and kept in Postgres (no volume needed).
let SECRET = process.env.SESSION_SECRET || '';
async function init(p) {
  pool = p;
  if (!SECRET) {
    const fresh = crypto.randomBytes(32).toString('hex');
    await p.query("INSERT INTO settings (key, value) VALUES ('session_secret', $1) ON CONFLICT (key) DO NOTHING", [fresh]);
    SECRET = (await p.query("SELECT value FROM settings WHERE key='session_secret'")).rows[0].value;
  }
  await loadCode();
}
/* The family code the parents changed in the app (owner, Nov 2026: "เปลี่ยนรหัสครอบครัว"): kept only as a keyed hash in settings
   'family_code' {h, len}; while it is there it is the code (FAMILY_CODE in the environment is the first one, before any change). Phones
   already signed in keep their sessions — a new code only changes what a new sign-in types. */
let codeSet = null;   // {h, len} | null
async function loadCode() {
  if (!pool) return;
  const r = (await pool.query("SELECT value FROM settings WHERE key='family_code'")).rows[0];
  try { codeSet = r ? JSON.parse(r.value) : null; } catch (_) { codeSet = null; }
}
const codeHash = (code) => crypto.createHmac('sha256', SECRET).update('family-code:' + String(code)).digest('hex');
const isFamilyCode = (code) => (codeSet && codeSet.h ? safeEq(codeHash(code), codeSet.h) : !!FAMILY_CODE && safeEq(code, FAMILY_CODE));
const familyCodeLen = () => (codeSet && codeSet.len ? codeSet.len : FAMILY_CODE.length);
async function setFamilyCode(code) {
  const v = JSON.stringify({ h: codeHash(code), len: String(code).length, at: Date.now() });
  await pool.query("INSERT INTO settings (key, value) VALUES ('family_code', $1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [v]);
  await loadCode();
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
  return { role, name: unb64(n), uid, group: group || null, iat: (+exp - MAXAGE) * 1000 };   // iat: when it was made (ms), for "sign out every other phone"
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
/* The phones signed in (migration 0033 sessions; owner, Nov 2026: "มือถือหาย"): a sign-in writes a row (noteSession); a phone the
   parents signed out has revoked_at, and "sign out every other phone" also stamps a cutoff (settings 'sessions_cut' {at, keep}) so a
   cookie made before this list existed stops too. Both are read through a short cache like the groups, cleared at once on a change. */
let gate = null, gateAt = 0;
const GATE_TTL = 15000;
async function sessionGate() {
  if (!pool) return { revoked: new Set(), cut: null };
  if (!gate || Date.now() - gateAt > GATE_TTL) {
    const rows = (await pool.query('SELECT uid FROM sessions WHERE revoked_at IS NOT NULL')).rows;
    const c = (await pool.query("SELECT value FROM settings WHERE key='sessions_cut'")).rows[0];
    let cut = null; try { cut = c ? JSON.parse(c.value) : null; } catch (_) { cut = null; }
    gate = { revoked: new Set(rows.map((x) => x.uid)), cut }; gateAt = Date.now();
  }
  return gate;
}
const sessionsChanged = () => { gate = null; };
const seen = new Map();   // uid → when last_seen was last written (at most every five minutes)
function touch(u) {
  const now = Date.now(); if (!pool || now - (seen.get(u.uid) || 0) < 300e3) return;
  seen.set(u.uid, now); if (seen.size > 5000) seen.delete(seen.keys().next().value);
  pool.query('UPDATE sessions SET last_seen=now() WHERE uid=$1', [u.uid]).catch(() => {});
}
// the kind of phone, in two words: never the whole browser string
function deviceOf(ua) {
  ua = String(ua || '');
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && /Mobile\//.test(ua));
  const os = ipad ? 'ipad' : /iPhone|iPod/.test(ua) ? 'iphone' : /Android/.test(ua) ? 'android' : /Mac OS X/.test(ua) ? 'mac' : /Windows/.test(ua) ? 'windows' : /Linux/.test(ua) ? 'linux' : 'other';
  const br = /SamsungBrowser/.test(ua) ? 'samsung' : /Edg\//.test(ua) ? 'edge' : /Firefox\//.test(ua) ? 'firefox' : /Chrome\/|CriOS/.test(ua) ? 'chrome' : /Safari\//.test(ua) ? 'safari' : 'other';
  return `${os} ${br}`;
}
async function noteSession({ uid, role, name, group, ua, family }) {
  if (!pool) return;
  await pool.query('INSERT INTO sessions (uid, family_id, role, name, group_id, device) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (uid) DO NOTHING',
    [uid, family, role, String(name || '').slice(0, 40), group || null, deviceOf(ua)]).catch((e) => console.error('session note', e.message));
}
function attachUser(req, _res, next) {
  const u = readToken(parseCookies(req.headers.cookie)[COOKIE]);
  if (!u) { req.user = null; return next(); }
  sessionGate().then(async (g) => {
    if (g.revoked.has(u.uid) || (g.cut && u.iat < Math.floor(g.cut.at / 1000) * 1000 && !(g.cut.keep || []).includes(u.uid))) { req.user = null; return next(); }   // signed out from another phone (a cookie's time is in whole seconds: one made in the cut's own second stays)
    touch(u);
    if (!u.group) { req.user = u; return next(); }
    const grp = await groupById(u.group);
    req.user = grp ? { ...u, trips: grp.trips, groupName: grp.name } : null;   // a deleted group = signed out
    next();
  }).catch(next);
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
  isFamilyCode, familyCodeLen, setFamilyCode, noteSession, sessionsChanged, deviceOf,
};
