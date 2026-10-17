'use strict';
const crypto = require('crypto');

// Cookie signing secret: SESSION_SECRET, else generated once and kept in Postgres (no volume needed).
let SECRET = process.env.SESSION_SECRET || '';
async function init(pool) {
  if (SECRET) return;
  const fresh = crypto.randomBytes(32).toString('hex');
  await pool.query("INSERT INTO settings (key, value) VALUES ('session_secret', $1) ON CONFLICT (key) DO NOTHING", [fresh]);
  SECRET = (await pool.query("SELECT value FROM settings WHERE key='session_secret'")).rows[0].value;
}
const FAMILY_CODE = process.env.FAMILY_CODE || '';
const VIEW_TOKEN = process.env.VIEW_TOKEN || '';
const BACKUP_TOKEN = (process.env.BACKUP_TOKEN || '').length >= 24 ? process.env.BACKUP_TOKEN : '';   // too short → backup endpoint off
const COOKIE = 'mb';
const MAXAGE = 400 * 24 * 3600; // seconds (browser cap)

const b64 = (s) => Buffer.from(s, 'utf8').toString('base64url');
const unb64 = (s) => Buffer.from(s, 'base64url').toString('utf8');
const sign = (p) => crypto.createHmac('sha256', SECRET).update(p).digest('base64url');
const safeEq = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

function makeToken(role, name, uid) {
  const exp = Math.floor(Date.now() / 1000) + MAXAGE;
  const p = [role, b64(name), uid, exp].join('.');
  return p + '.' + sign(p);
}
function readToken(t) {
  if (!t) return null;
  const parts = t.split('.');
  if (parts.length !== 5) return null;
  const sig = parts.pop();
  const p = parts.join('.');
  if (!safeEq(sig, sign(p))) return null;
  const [role, n, uid, exp] = parts;
  if (+exp < Date.now() / 1000) return null;
  if (role !== 'editor' && role !== 'viewer') return null;
  return { role, name: unb64(n), uid };
}
function parseCookies(h) {
  const o = {};
  (h || '').split(';').forEach((kv) => {
    const i = kv.indexOf('=');
    if (i > 0) o[kv.slice(0, i).trim()] = decodeURIComponent(kv.slice(i + 1).trim());
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

function attachUser(req, _res, next) {
  req.user = readToken(parseCookies(req.headers.cookie)[COOKIE]);
  next();
}
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
  init, FAMILY_CODE, VIEW_TOKEN, BACKUP_TOKEN, makeToken, setCookie, clearCookie, safeEq, throttled, noteFail,
  attachUser, requireUser, requireEditor,
};
