'use strict';
/* Passkeys (owner, Nov 2026: "เข้าด้วยลายนิ้วมือ/หน้า"; migration 0037 passkeys): a parent's phone signs in with Face ID or a fingerprint
   in place of the family code. WebAuthn through @simplewebauthn/server; the private key never leaves the phone, the server keeps only
   the public half. The family code stays as the way in on a new phone and on a phone that has no passkey.
   POST /api/passkey/register/options · /api/passkey/register   a signed-in parent adds this phone (requireUserVerification)
   POST /api/passkey/login/options · /api/passkey/login         anyone: a discoverable passkey of this family → a parent's session
   GET /api/b/passkeys · DELETE /api/b/passkeys/:id              the parents' list on #/devices (two taps remove one)
   The relying party is the app's own host (PASSKEY_RP_ID overrides it); a challenge is used once and lives five minutes. */
const crypto = require('crypto');
const express = require('express');
const SW = require('@simplewebauthn/server');

const TTL = 5 * 60e3;
const ID_RE = /^[A-Za-z0-9_-]{16,512}$/;

function create({ pool, A, family, appName, isSecure }) {
  const q = async (s, a) => (await pool.query(s, a)).rows;
  const challenges = new Map();   // challenge → {kind, exp, uid?}
  const keep = (challenge, v) => {
    const now = Date.now();
    for (const [k, x] of challenges) if (x.exp < now) challenges.delete(k);
    if (challenges.size > 500) challenges.delete(challenges.keys().next().value);
    challenges.set(challenge, { ...v, exp: now + TTL });
  };
  const take = (kind) => (c) => { const x = challenges.get(c); if (!x || x.kind !== kind || x.exp < Date.now()) return false; challenges.delete(c); return true; };
  const rpID = (req) => process.env.PASSKEY_RP_ID || req.hostname;
  const origin = (req) => `${isSecure(req) ? 'https' : req.protocol}://${req.get('host')}`;
  const only = (req, res) => { if (req.headers['x-mb'] !== '1') { res.status(400).json({ error: 'bad-request' }); return false; } return true; };
  const count = async () => (await q('SELECT count(*)::int n FROM passkeys WHERE family_id=$1', [family]))[0].n;

  const r = express.Router();
  r.post('/api/passkey/register/options', A.requireEditor, async (req, res, next) => {
    try {
      if (!only(req, res)) return;
      const have = await q('SELECT id, transports FROM passkeys WHERE family_id=$1', [family]);
      const name = String(req.user.name || '').slice(0, 24) || 'Parent';
      const opts = await SW.generateRegistrationOptions({
        rpName: String(await appName()).slice(0, 64) || 'LifeBook', rpID: rpID(req), userName: name, userDisplayName: name,
        userID: crypto.randomBytes(16), attestationType: 'none', timeout: TTL,
        excludeCredentials: have.map((k) => ({ id: k.id, transports: k.transports || [] })),
        authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
      });
      keep(opts.challenge, { kind: 'reg', uid: req.user.uid });
      res.json(opts);
    } catch (e) { next(e); }
  });
  r.post('/api/passkey/register', A.requireEditor, express.json({ limit: '64kb' }), async (req, res, next) => {
    try {
      if (!only(req, res)) return;
      let v;
      try {
        v = await SW.verifyRegistrationResponse({ response: (req.body || {}).response, expectedChallenge: take('reg'), expectedOrigin: origin(req), expectedRPID: rpID(req), requireUserVerification: true });
      } catch (_) { return res.status(400).json({ error: 'verify' }); }
      if (!v.verified) return res.status(400).json({ error: 'verify' });
      const c = v.registrationInfo.credential;
      if (!ID_RE.test(c.id)) return res.status(400).json({ error: 'verify' });
      await q('INSERT INTO passkeys (id, family_id, name, device, public_key, counter, transports) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING',
        [c.id, family, String(req.user.name || '').slice(0, 40), A.deviceOf(req.headers['user-agent']), Buffer.from(c.publicKey), c.counter || 0, (c.transports || []).slice(0, 6).map(String)]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.post('/api/passkey/login/options', async (req, res, next) => {
    try {
      if (!only(req, res)) return;
      if (A.throttled(req.ip)) return res.status(429).json({ error: 'too-many' });
      if (!(await count())) return res.status(404).json({ error: 'none' });
      const opts = await SW.generateAuthenticationOptions({ rpID: rpID(req), userVerification: 'required', timeout: TTL });
      keep(opts.challenge, { kind: 'auth' });
      res.json(opts);
    } catch (e) { next(e); }
  });
  r.post('/api/passkey/login', express.json({ limit: '64kb' }), async (req, res, next) => {
    try {
      if (!only(req, res)) return;
      const ip = req.ip;
      if (A.throttled(ip)) return res.status(429).json({ error: 'too-many' });
      const resp = (req.body || {}).response || {};
      const k = ID_RE.test(String(resp.id || '')) ? (await q('SELECT * FROM passkeys WHERE id=$1 AND family_id=$2', [resp.id, family]))[0] : null;
      if (!k) { A.noteFail(ip); return res.status(401).json({ error: 'unknown' }); }
      let v;
      try {
        v = await SW.verifyAuthenticationResponse({ response: resp, expectedChallenge: take('auth'), expectedOrigin: origin(req), expectedRPID: rpID(req), requireUserVerification: true,
          credential: { id: k.id, publicKey: new Uint8Array(k.public_key), counter: Number(k.counter) || 0, transports: k.transports || [] } });
      } catch (_) { v = null; }
      if (!v || !v.verified) { A.noteFail(ip); return res.status(401).json({ error: 'verify' }); }
      await q('UPDATE passkeys SET counter=$2, last_used=now() WHERE id=$1', [k.id, v.authenticationInfo.newCounter || 0]);
      const name = String((req.body || {}).name || '').slice(0, 24).trim() || k.name || 'Family';
      const uid = crypto.randomBytes(6).toString('hex');
      A.setCookie(res, A.makeToken('editor', name, uid), isSecure(req));
      await A.noteSession({ uid, role: 'editor', name, ua: req.headers['user-agent'], family });
      res.json({ ok: true, role: 'editor' });
    } catch (e) { next(e); }
  });
  r.get('/api/b/passkeys', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q('SELECT id, name, device, created_at, last_used FROM passkeys WHERE family_id=$1 ORDER BY created_at', [family]);
      res.json({ list: rows.map((x) => ({ id: x.id, name: x.name, device: x.device, at: new Date(x.created_at).getTime(), used: x.last_used ? new Date(x.last_used).getTime() : null })) });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/passkeys/:id', A.requireEditor, async (req, res, next) => {
    try {
      if (!ID_RE.test(req.params.id)) return res.status(400).json({ error: 'id' });
      await q('DELETE FROM passkeys WHERE id=$1 AND family_id=$2', [req.params.id, family]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  return { router: r, count };
}
module.exports = { create };
