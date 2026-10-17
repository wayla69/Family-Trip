'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./db');

function loadSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const f = path.join(DATA_DIR, '.session-secret');
  try { return fs.readFileSync(f, 'utf8'); } catch (_) {}
  const s = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(f, s, { mode: 0o600 });
  return s;
}
const SECRET = loadSecret();
const FAMILY_CODE = process.env.FAMILY_CODE || '';
const VIEW_TOKEN = process.env.VIEW_TOKEN || '';
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

// very small in-memory login throttle
const tries = new Map();
function throttled(ip) {
  const now = Date.now();
  const a = (tries.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  tries.set(ip, a);
  return a.length >= 10;
}
function noteFail(ip) { const a = tries.get(ip) || []; a.push(Date.now()); tries.set(ip, a); }

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
  FAMILY_CODE, VIEW_TOKEN, makeToken, setCookie, clearCookie, safeEq, throttled, noteFail,
  attachUser, requireUser, requireEditor,
};
