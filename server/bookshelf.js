'use strict';
// Memory Bookshelf API on Postgres (docs/PRD.md, docs/ADR.md). Mounted at /api/b and /media.
// Every query is scoped to one family; ids are client-generated so the offline queue can retry any write safely.
const fs = require('fs');
const path = require('path');
const express = require('express');
const zlib = require('zlib');
const crypto = require('crypto');
const IMG = require('./images');
const GUIDE = require('./guide');
const IMPORT = require('./bookimport');
const FAM = require('./family');
const AVATAR = require('./avatar');
const EMOJI = require('./emoji');
const sharp = require('sharp');

const FAMILY = process.env.FAMILY_ID || 'family';
const ID_RE = /^[A-Za-z0-9_.:-]{4,80}$/;
// voice memos arrive as the phone's recorder made them: Chrome/Android webm-opus, iPhone mp4-aac; stored under a/<trip>/<id>.<ext>
const AUDIO_EXT = { 'audio/webm': 'webm', 'audio/mp4': 'm4a', 'audio/x-m4a': 'm4a', 'audio/aac': 'aac', 'audio/mpeg': 'mp3', 'audio/ogg': 'ogg' };
const SLUG_RE = /^[a-z0-9-]{2,60}$/;
const KINDS = ['quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field', 'sum', 'talk', 'letter', 'mquiz', 'fore', 'cover'];   // cover = the printed book's cover: text 'art' | 'photo'   // mquiz = the morning memory game (kid mode) · fore = the book's foreword   // sum = the day in a few lines (book + PDF) · talk = bedtime questions (kid mode)
const TRIP_WIDE = ['story', 'tick', 'field', 'letter', 'fore', 'cover'];   // kinds that may have no day (whole-trip story, passport checklists, Explorer ID, the letter to the kids)
const HEART_EMOJI = ['💗', '😍', '👏', '🙏', '⭐', '🎉', '🤗', '😘', '🎈'];   // the picker's six (views.js HEARTS) + the older ones, still accepted
const REVIEW_KINDS = ['stay', 'food', 'place'], KID_VERDICT = ['love', 'ok', 'no'];
const HEARTS_PER_DAY = { sender: 40, family: 400 };   // the view link is shared: cap what one phone, and everyone together, can send
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);
// photo tags: up to 10 short words (the fixed keys from Claude, or the parents' own); null when the shape is wrong
const tagList = (v) => (Array.isArray(v) && v.length <= 10 && v.every((x) => typeof x === 'string') ? [...new Set(v.map((x) => x.trim().toLowerCase().slice(0, 24)).filter(Boolean))] : null);
const i18n = (o, n = 200) => (o && typeof o === 'object' ? { th: clip(o.th, n), en: clip(o.en, n), ...(o.zh ? { zh: clip(o.zh, n) } : {}) } : { th: clip(o, n), en: clip(o, n) });
const at = (v) => new Date(Math.min(Number.isFinite(+v) && +v > 0 ? +v : Date.now(), Date.now() + 86400e3));
const bad = (res, error, code = 400) => res.status(code).json({ error });
// the state carries every book's plan (~1 MB of text for a 16-day road trip): gzip it, a phone on hotel wifi feels the difference
const sha = (s) => crypto.createHash('sha1').update(s).digest('base64url').slice(0, 20);
// etag: answer 304 (no body) when the phone already holds exactly this — the app asks every 30 s and on every return
function sendJson(req, res, obj, etag) {
  const body = Buffer.from(typeof obj === 'string' ? obj : JSON.stringify(obj));   // a string is already JSON
  if (etag) {
    const tag = `"${etag === true ? sha(body) : etag}"`;
    res.setHeader('ETag', tag);
    if ((req.headers['if-none-match'] || '').split(/\s*,\s*/).includes(tag)) return res.status(304).end();
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Vary', 'Accept-Encoding');
  if (body.length > 1024 && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) { res.setHeader('Content-Encoding', 'gzip'); return res.end(zlib.gzipSync(body, { level: 6 })); }
  res.end(body);
}

// ---------- seeds: server/seeds/*.json (trip.schema.json + theme) → trips, trip_days, firsts_catalog, children ----------
// one book (seed format 2) into trips / trip_days / firsts_catalog. source 'seed' = bundled with the app (re-synced on every boot,
// only over an earlier seed); 'manual' = made or imported in the app (inserted once, never touched by a later sync). Throws {code:'exists'}
// when the slug is taken by a book of the other kind.
async function putSeed(c, t, source) {
  const id = t.slug;
  const ins = await c.query(`INSERT INTO trips (id, family_id, slug, legacy_id, title, sub, date_from, date_to, timezone, theme, cover, stamp, moods, passport, info, source)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    ON CONFLICT (family_id, slug) DO UPDATE SET legacy_id=EXCLUDED.legacy_id, title=EXCLUDED.title, sub=EXCLUDED.sub, date_from=EXCLUDED.date_from,
      date_to=EXCLUDED.date_to, timezone=EXCLUDED.timezone, theme=EXCLUDED.theme, cover=EXCLUDED.cover, stamp=EXCLUDED.stamp, moods=EXCLUDED.moods,
      passport=EXCLUDED.passport, info=EXCLUDED.info
    WHERE trips.source = 'seed' AND EXCLUDED.source = 'seed' RETURNING id`,
  [id, FAMILY, t.slug, t.legacy_trip_id || null, t.title, t.sub || null, t.date_from, t.date_to, t.timezone || 'Asia/Bangkok',
    { ...(t.theme || {}), children: (t.children || []).map((k) => ({ slug: k.slug, age: k.age_at_trip || null })) },
    t.cover || {}, t.stamp || {}, JSON.stringify(t.moods || []), t.passport || {}, t.info || {}, source]);
  if (!ins.rows.length) throw Object.assign(new Error('exists'), { code: 'exists' });
  for (const d of t.days) {
    const plan = {};   // the day card's plan block (seed keys: timeline, how we move, local pick, plan B, money, tips, tonight's stay, maps route, nearby food, learn cards, quiz, the guide's story, legs with directions, meal picks, food by stop)
    for (const k of ['moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'tale', 'legs', 'picks', 'food']) if (d[k]) plan[k] = d[k];
    await c.query(`INSERT INTO trip_days (trip_id, day_index, date, title, sleep, emoji, gradient, planned, wx, plan) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT (trip_id, day_index) DO UPDATE SET date=EXCLUDED.date, title=EXCLUDED.title, sleep=EXCLUDED.sleep, emoji=EXCLUDED.emoji,
        gradient=EXCLUDED.gradient, planned=EXCLUDED.planned, wx=EXCLUDED.wx, plan=EXCLUDED.plan`,
    [id, d.index, d.date, d.title, d.sleep || null, d.emoji || '', JSON.stringify(d.gradient || null), JSON.stringify(d.planned || []), d.wx || null, plan]);
  }
  let fp = 0;
  for (const f of t.firsts_catalog || []) {
    await c.query(`INSERT INTO firsts_catalog (trip_id, key, emoji, label, pos) VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (trip_id, key) DO UPDATE SET emoji=EXCLUDED.emoji, label=EXCLUDED.label, pos=EXCLUDED.pos`, [id, f.key, f.emoji || '', f.label, fp++]);
  }
}

async function syncSeeds(pool, dir = path.join(__dirname, 'seeds')) {
  const seeds = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    await c.query('INSERT INTO families (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', [FAMILY, 'Family']);
    // another family's instance (scripts/provision.mjs sets BUNDLED_SEEDS=0) starts empty: no Mimi and Mika, no Hong Kong or Australia book
    if (process.env.BUNDLED_SEEDS === '0') { await c.query('COMMIT'); return 0; }
    const kidColor = { mimi: '#FF4F8B', mika: '#2F8BFF' };
    const kids = new Map();
    for (const t of seeds) for (const k of t.children || []) kids.set(k.slug, k);
    let pos = 0;
    for (const k of kids.values()) {
      await c.query(`INSERT INTO children (id, family_id, slug, name_th, name_en, emoji, color, pos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (family_id, slug) DO UPDATE SET name_th=EXCLUDED.name_th, name_en=EXCLUDED.name_en, emoji=EXCLUDED.emoji`,
      [`${FAMILY}:${k.slug}`, FAMILY, k.slug, k.name_th, k.name_en, k.emoji || '', kidColor[k.slug] || '#8B3DFF', pos++]);
    }
    for (const t of seeds) {
      // a seed never overwrites a book made or imported in the app under the same slug (putSeed refuses); the boot goes on
      await c.query('SAVEPOINT seed');
      try { await putSeed(c, t, 'seed'); await c.query('RELEASE SAVEPOINT seed'); } catch (e) { if (e.code !== 'exists') throw e; await c.query('ROLLBACK TO SAVEPOINT seed'); }
    }
    await c.query('COMMIT');
    return seeds.length;
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}

function router({ pool, media, A, ai, hooks = {} }) {   // hooks.heart(h): set by index.js once the push scheduler exists
  const r = express.Router();
  const json = express.json({ limit: '200kb' });
  const W = [A.requireEditor, json];
  const q = (sql, args) => pool.query(sql, args).then((x) => x.rows);
  EMOJI.routes(r, { q, pool, media, A, family: FAMILY });   // the family's emoji library (server/emoji.js)
  const trip = async (id) => (await q('SELECT id, date_from, date_to, (SELECT count(*)::int FROM trip_days WHERE trip_id=t.id) AS days FROM trips t WHERE id=$1 AND family_id=$2', [id, FAMILY]))[0];
  const dayOk = (t, d) => d === null || (Number.isInteger(d) && d >= 0 && d < t.days);
  const dayArg = (v) => (v === null || v === undefined || v === '' ? null : Number(v));
  const keyFull = (tid, id) => `p/${tid}/${id}.jpg`;
  const keyThumb = (tid, id) => `t/${tid}/${id}.jpg`;
  const keyAudio = (tid, id, ext) => `a/${tid}/${id}.${ext}`;   // voice memos: stored as the phone recorded them

  // ----- the family: who the children are and how they are drawn (server/family.js)
  const kidRows = () => q('SELECT slug, name_th, name_en, emoji, color, birth_ym, look, avatar, avatars, pos FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY]);
  const kidsFor = async (t) => FAM.kidsFor(await kidRows(), t && t.date_from ? new Date(t.date_from) : new Date());   // for prompts: names and ages at the trip
  // before login the app shows only the family's app name and the drawings — never the children's names
  r.get('/api/brand', async (_req, res, next) => {
    try { res.setHeader('Cache-Control', 'no-store'); res.json({ ...(await brand(pool)), pin: await pinLens() }); } catch (e) { next(e); }
  });
  // the lengths a sign-in code can have (the family's, the relatives' shared PIN, each group's) — never a digit of any of them — so
  // the pad signs in by itself at the last digit; open = a group PIN of unknown length exists (saved before migration 0021)
  async function pinLens() {
    const g = await q('SELECT pin_len FROM viewer_groups WHERE family_id=$1 AND pin_hash IS NOT NULL', [FAMILY]);
    const lens = new Set([A.FAMILY_CODE.length, A.VIEW_PIN.length, ...g.map((x) => x.pin_len)].filter((n) => n > 0));
    return { lens: [...lens].sort((a, b) => a - b), open: g.some((x) => !x.pin_len) };
  }
  r.put('/api/b/family', ...W, async (req, res, next) => {
    try {
      const b = req.body || {}, prof = FAM.cleanProfile(b.profile);
      const kids = (Array.isArray(b.children) ? b.children : []).slice(0, 6).map(FAM.cleanKid).filter(Boolean);
      if (new Set(kids.map((k) => k.slug)).size !== kids.length) return bad(res, 'slug');
      if (kids.some((k) => !k.birth_ym)) return bad(res, 'birth');   // the age at each trip (and the age a character is drawn at) comes from it
      const have = await kidRows(), gone = have.filter((k) => !kids.some((x) => x.slug === k.slug));
      for (const k of gone) {   // a child with memories recorded stays (the parents remove nothing by accident)
        const used = await q('SELECT 1 FROM entries WHERE family_id=$1 AND child=$2 UNION ALL SELECT 1 FROM hearts WHERE family_id=$1 AND child=$2 LIMIT 1', [FAMILY, k.slug]);
        if (used.length) return res.status(409).json({ error: 'used', slug: k.slug });
      }
      const c = await pool.connect();
      try {
        await c.query('BEGIN');
        await c.query('UPDATE families SET profile=$2 WHERE id=$1', [FAMILY, JSON.stringify(prof)]);
        for (const k of gone) await c.query('DELETE FROM children WHERE family_id=$1 AND slug=$2', [FAMILY, k.slug]);
        for (const [i, k] of kids.entries()) {
          await c.query(`INSERT INTO children (id, family_id, slug, name_th, name_en, emoji, color, birth_ym, look, pos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            ON CONFLICT (family_id, slug) DO UPDATE SET name_th=EXCLUDED.name_th, name_en=EXCLUDED.name_en, emoji=EXCLUDED.emoji, color=EXCLUDED.color, birth_ym=EXCLUDED.birth_ym, look=EXCLUDED.look, pos=EXCLUDED.pos`,
          [`${FAMILY}:${k.slug}`, FAMILY, k.slug, k.name_th, k.name_en, k.emoji, k.color, k.birth_ym, k.look ? JSON.stringify(k.look) : null, i]);
        }
        await c.query('COMMIT');
      } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
      const rows = await kidRows();
      res.json({ ok: true, family: FAM.profile(prof, rows), children: rows.map((k) => ({ ...k, v: FAM.lookVersion(k.look) })) });
    } catch (e) { next(e); }
  });
  // a child's own cartoon character from a photo (server/avatar.js, OpenAI): a few tries a year per child, used at once
  let drawing = false;   // one drawing at a time per family
  const avatarLeft = async (slug) => Math.max(0, AVATAR.YEARLY() - Number((await q("SELECT count(*)::int n FROM avatar_gens WHERE family_id=$1 AND child=$2 AND created_at > now() - interval '365 days'", [FAMILY, slug]))[0].n));
  const avatarKey = (slug, id, kind) => `k/${slug}/${id}-${kind}.png`;
  r.get('/api/b/family/avatars', A.requireEditor, async (_req, res, next) => {
    try {
      const kids = await kidRows(), left = {};
      for (const k of kids) left[k.slug] = await avatarLeft(k.slug);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ on: AVATAR.enabled(), yearly: AVATAR.YEARLY(), left });
    } catch (e) { next(e); }
  });
  const ageMonths = (ym, at = new Date()) => { if (!/^\d{4}-\d{2}$/.test(ym || '')) return null; const [y, m] = ym.split('-').map(Number); const n = (at.getUTCFullYear() - y) * 12 + at.getUTCMonth() + 1 - m; return n >= 0 ? n : null; };
  const AVATAR_KEEP = 12;   // drawings kept per child (a few a year: years of books)
  r.post('/api/b/family/avatar/:slug', A.requireEditor, express.raw({ type: () => true, limit: '15mb' }), async (req, res, next) => {
    try {
      if (!AVATAR.enabled()) return bad(res, 'no-key', 501);
      const kid = (await q('SELECT slug, birth_ym, avatars FROM children WHERE family_id=$1 AND slug=$2', [FAMILY, req.params.slug]))[0];
      if (!kid) return bad(res, 'child', 404);
      const ageM = ageMonths(kid.birth_ym);
      if (ageM === null) return bad(res, 'birth');   // the character is drawn at the child's age: the birth month comes first
      if (!Buffer.isBuffer(req.body) || req.body.length < 100) return bad(res, 'photo');
      try { await sharp(req.body, { failOn: 'none' }).metadata(); } catch (_) { return bad(res, 'photo'); }
      if ((await avatarLeft(kid.slug)) < 1) return res.status(429).json({ error: 'quota', left: 0 });
      if (drawing) return bad(res, 'busy', 409);
      drawing = true;
      let out;
      try { out = await AVATAR.draw(req.body, { ageM }); } catch (e) { console.error('avatar', e.code || '', e.message); return bad(res, e.code === 'refused' ? 'refused' : 'failed', 502); } finally { drawing = false; }
      const id = crypto.randomBytes(6).toString('hex');
      await media.put(avatarKey(kid.slug, id, 'full'), out.full, 'image/png');
      await media.put(avatarKey(kid.slug, id, 'face'), out.face, 'image/png');
      // every drawing is kept with the day and the age it was drawn at, so an older book keeps the younger child
      const all = [...(Array.isArray(kid.avatars) ? kid.avatars : []), { id, at: new Date().toISOString().slice(0, 10), age_m: ageM }];
      const drop = all.slice(0, Math.max(0, all.length - AVATAR_KEEP)), keep = all.slice(-AVATAR_KEEP);
      await q('INSERT INTO avatar_gens (family_id, child) VALUES ($1,$2)', [FAMILY, kid.slug]);
      await q('UPDATE children SET avatar=$3, avatars=$4 WHERE family_id=$1 AND slug=$2', [FAMILY, kid.slug, id, JSON.stringify(keep)]);
      for (const d of drop) for (const kind of ['full', 'face']) await media.del(avatarKey(kid.slug, d.id, kind)).catch(() => {});
      res.json({ avatar: id, avatars: keep, left: await avatarLeft(kid.slug) });
    } catch (e) { next(e); }
  });
  // back to the app's own drawing (or the emoji); the drawing's files go, the tries used stay used
  r.delete('/api/b/family/avatar/:slug', A.requireEditor, async (req, res, next) => {
    try {
      const kid = (await q('SELECT slug, avatar, avatars FROM children WHERE family_id=$1 AND slug=$2', [FAMILY, req.params.slug]))[0];
      if (!kid) return bad(res, 'child', 404);
      await q("UPDATE children SET avatar=NULL, avatars='[]' WHERE family_id=$1 AND slug=$2", [FAMILY, kid.slug]);
      const ids = new Set([kid.avatar, ...(Array.isArray(kid.avatars) ? kid.avatars.map((d) => d.id) : [])].filter(Boolean));
      for (const did of ids) for (const kind of ['full', 'face']) await media.del(avatarKey(kid.slug, did, kind)).catch(() => {});
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // the drawing itself, for the family only (signed in): it is made from a child's photo, so never on the public sign-in page
  r.get('/media/kid/:slug/:kind.png', A.requireUser, async (req, res, next) => {
    try {
      if (!['full', 'face'].includes(req.params.kind)) return next();
      const kid = (await q('SELECT avatar, avatars FROM children WHERE family_id=$1 AND slug=$2', [FAMILY, req.params.slug]))[0];
      const pick = kid && Array.isArray(kid.avatars) && kid.avatars.some((d) => d.id === req.query.v) ? req.query.v : kid && kid.avatar;   // only an id this child owns
      const buf = pick ? await media.get(avatarKey(req.params.slug, pick, req.params.kind)) : null;
      if (!buf) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, max-age=604800');   // the app versions the url by the drawing (?v=)
      res.type('image/png').send(buf);
    } catch (e) { next(e); }
  });
  // a child's drawing: /art/kids/<slug>[-<outfit>][-full].svg — recoloured from the templates when the child has a look,
  // else left to the static files (Mimi and Mika as drawn). ?look=<json> (editors) previews a look before it is saved.
  r.get(/^\/art\/kids\/([a-z0-9-]+?)(?:-(adventure))?(?:-(full))?\.svg$/, async (req, res, next) => {
    try {
      const slug = req.params[0], outfit = req.params[1], full = req.params[2];
      let look = null;
      if (req.query.look !== undefined) { if (!req.user || req.user.role !== 'editor') return next(); try { look = JSON.parse(String(req.query.look)); } catch (_) { return bad(res, 'look'); } }
      else look = ((await q('SELECT look FROM children WHERE family_id=$1 AND slug=$2', [FAMILY, slug]))[0] || {}).look;
      if (!look) return next();
      const svg = FAM.renderKid({ slug, look, outfit, full: !!full });
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.setHeader('Cache-Control', req.query.look !== undefined ? 'no-store' : 'public, max-age=604800');   // the app versions the url by the look (?v=)
      res.end(svg);
    } catch (e) { next(e); }
  });

  // ----- everything in one payload (cached by the app for offline use)
  r.get('/api/b/state', A.requireUser, async (req, res, next) => {
    try {
      const [children, trips, days, firsts, entries, mediaRows, places, hearts, reviews, spendRows, emojiRows] = await Promise.all([
        q('SELECT slug, name_th, name_en, emoji, color, birth_ym, look, avatar, avatars FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY]),
        q("SELECT id, slug, legacy_id, title, sub, to_char(date_from,'YYYY-MM-DD') date_from, to_char(date_to,'YYYY-MM-DD') date_to, timezone, theme, cover, stamp, moods, passport, info, source FROM trips WHERE family_id=$1 ORDER BY date_from", [FAMILY]),
        q("SELECT d.trip_id, d.day_index, to_char(d.date,'YYYY-MM-DD') date, d.title, d.sleep, d.emoji, d.gradient, d.planned, d.wx, d.plan, d.done_at FROM trip_days d JOIN trips t ON t.id=d.trip_id WHERE t.family_id=$1 ORDER BY d.trip_id, d.day_index", [FAMILY]),
        q('SELECT f.trip_id, f.key, f.emoji, f.label FROM firsts_catalog f JOIN trips t ON t.id=f.trip_id WHERE t.family_id=$1 ORDER BY f.trip_id, f.pos, f.key', [FAMILY]),
        q('SELECT id, trip_id, day_index, kind, child, text, tr, mood, first_key, lang, highlight, occurred_at, created_by, created_uid FROM entries WHERE family_id=$1 ORDER BY occurred_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, width, height, caption, highlight, pos, taken_at, created_by, mime, tags, place, ai_at FROM media WHERE family_id=$1 ORDER BY taken_at, pos', [FAMILY]),
        q('SELECT id, trip_id, day_index, key, kind, name, visited_at, created_by FROM places WHERE family_id=$1 ORDER BY visited_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, child, emoji, text, from_name, created_uid, created_at FROM hearts WHERE family_id=$1 ORDER BY created_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, kind, key, name, rating, tags, kids, again, note, created_by, updated_at FROM reviews WHERE family_id=$1 ORDER BY updated_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, amount, cur, cat, note, created_by, updated_at FROM spend WHERE family_id=$1 ORDER BY updated_at', [FAMILY]),
        EMOJI.rows(q, FAMILY),
      ]);
      const ms = (d) => (d ? new Date(d).getTime() : null);
      // a relatives' group sees only its ticked books — everything tied to another book is left out here, at the source
      const see = (x) => A.canSee(req.user, x.trip_id === undefined ? x.id : x.trip_id);
      if (req.user.group) for (const list of [trips, days, firsts, entries, mediaRows, places, hearts, reviews, spendRows]) list.splice(0, list.length, ...list.filter(see));
      // ?lite=1 (the app): each book's guide text (info, passport, day plans — ~95% of the bytes, changes only with a new seed)
      // is left out and named by a hash; the app keeps the copy it has or fetches /api/b/seed/<trip>/<hash> once
      const lite = req.query.lite === '1';
      res.setHeader('Cache-Control', 'no-store');
      sendJson(req, res, {
        me: { role: req.user.role, name: req.user.name, uid: req.user.uid, group: req.user.groupName || null },
        family: FAM.profile(((await q('SELECT profile FROM families WHERE id=$1', [FAMILY]))[0] || {}).profile, children),
        children: children.map((k) => ({ ...k, v: FAM.lookVersion(k.look) })),
        trips: trips.map((t) => {
          const td = days.filter((d) => d.trip_id === t.id).map(({ trip_id, ...d }) => ({ ...d, done_at: ms(d.done_at) }));
          const out = { ...t, days: td, firsts: firsts.filter((f) => f.trip_id === t.id).map(({ trip_id, ...f }) => f) };
          if (!lite) return out;
          const g = seedOf(t, td);
          return { ...out, info: undefined, passport: undefined, days: td.map(({ plan, ...d }) => d), seed: g.hash };
        }),
        entries: entries.map(({ trip_id, day_index, occurred_at, created_uid, ...e }) => ({ ...e, trip: trip_id, day: day_index, at: ms(occurred_at), mine: created_uid === req.user.uid })),
        media: mediaRows.map(({ trip_id, day_index, taken_at, width, height, ai_at, ...m }) => ({ ...m, trip: trip_id, day: day_index, w: width, h: height, at: ms(taken_at), ai: !!ai_at })),
        places: places.map(({ trip_id, day_index, visited_at, ...p }) => ({ ...p, trip: trip_id, day: day_index, at: ms(visited_at) })),
        hearts: hearts.map(({ trip_id, day_index, created_uid, created_at, from_name, ...h }) => ({ ...h, trip: trip_id, day: day_index, from: from_name, at: ms(created_at), mine: created_uid === req.user.uid })),
        reviews: reviews.map(({ trip_id, day_index, updated_at, ...r }) => ({ ...r, trip: trip_id, day: day_index, at: ms(updated_at) })),
        emoji: emojiRows.map(EMOJI.out),   // the family's emoji library: each emoji's picture (core.js emo)
        spend: spendRows.map(({ trip_id, day_index, updated_at, amount, ...s }) => ({ ...s, trip: trip_id, day: day_index, amount: Number(amount), at: ms(updated_at) })),
        features: { avatar: AVATAR.enabled(), story: !!(ai && ai.enabled()), photoAi: !!(ai && ai.photoEnabled && ai.photoEnabled()) },   // photoAi: the owner's PHOTO_AI switch (captions/tags from the pictures)
      }, true);
    } catch (e) { next(e); }
  });
  // one book's guide text by its hash: never changes for that hash, so the phone (and its HTTP cache) keeps it
  const seedOf = (t, td) => { const body = JSON.stringify({ info: t.info, passport: t.passport, plans: td.map((d) => d.plan) }); return { body, hash: sha(body) }; };
  r.get('/api/b/seed/:trip/:hash', A.requireUser, async (req, res, next) => {
    try {
      if (!A.canSee(req.user, req.params.trip)) return bad(res, 'trip', 404);
      const t = (await q('SELECT id, passport, info FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, FAMILY]))[0];
      if (!t) return bad(res, 'trip', 404);
      const td = await q('SELECT plan FROM trip_days WHERE trip_id=$1 ORDER BY day_index', [t.id]);
      const g = seedOf(t, td);
      if (g.hash !== req.params.hash) return bad(res, 'stale', 409);   // the seed moved on (new deploy): the app reloads the state
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      sendJson(req, res, g.body, g.hash);
    } catch (e) { next(e); }
  });

  // ----- entries: quote | mood | fav | note | first | story | tick | field (one row per item; mood/fav/note/tick/field use deterministic ids → upsert)
  r.put('/api/b/entries/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      if (!KINDS.includes(b.kind)) return bad(res, 'kind');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (day === null && !TRIP_WIDE.includes(b.kind)) return bad(res, 'day');
      const kids = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug);
      const child = b.child == null || b.child === '' ? null : String(b.child);
      if (child !== null && child !== 'both' && !kids.includes(child)) return bad(res, 'child');
      if (['mood', 'tick', 'field'].includes(b.kind) && (!child || child === 'both')) return bad(res, 'child');
      if (['tick', 'field'].includes(b.kind) && !b.first_key) return bad(res, 'key');
      if (b.kind === 'tick' && !['', 'yum', 'yuck', '1', '2', '3'].includes(String(b.text || ''))) return bad(res, 'text');   // plain tick, food yum/yuck, 1–3 stars
      const row = [id, FAMILY, t.id, day, b.kind, child, clip(b.text, 4000), b.mood ? clip(b.mood, 16) : null, b.first_key ? clip(b.first_key, 40) : null,
        ['th', 'en'].includes(b.lang) ? b.lang : null, !!b.highlight, at(b.at), clip(req.user.name, 40), req.user.uid];
      const out = await q(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, child, text, mood, first_key, lang, highlight, occurred_at, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, child=EXCLUDED.child, text=EXCLUDED.text, mood=EXCLUDED.mood,
          first_key=EXCLUDED.first_key, lang=EXCLUDED.lang, highlight=EXCLUDED.highlight, updated_at=now(),
          tr=CASE WHEN entries.text = EXCLUDED.text THEN entries.tr ELSE NULL END   -- an edited text drops its old translation
        WHERE entries.family_id = EXCLUDED.family_id AND entries.kind = EXCLUDED.kind AND entries.trip_id = EXCLUDED.trip_id
        RETURNING id`, row);
      if (!out.length) return bad(res, 'conflict', 409);   // id taken by another trip/kind/family
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/entries/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM entries WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- photos: EXIF/GPS stripped, 2560 px + 520 px thumb, stored in the private bucket
  r.put('/api/b/media/:id', A.requireEditor, express.raw({ type: () => true, limit: '40mb' }), async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!ID_RE.test(id)) return bad(res, 'id');
      if (req.headers['x-mb'] !== '1') return bad(res, 'bad-request');
      const ex = (await q('SELECT width w, height h, family_id FROM media WHERE id=$1', [id]))[0];
      if (ex) return ex.family_id === FAMILY ? res.json({ ok: true, id, w: ex.w, h: ex.h, dup: true }) : bad(res, 'conflict', 409);
      const t = await trip(String(req.query.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(req.query.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (!Buffer.isBuffer(req.body) || req.body.length < 100) return bad(res, 'empty');
      if (req.query.kind === 'audio') {   // a voice memo: kept as recorded (no transcoding), no thumbnail, its mime kept for playback
        const mime = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase(), ext = AUDIO_EXT[mime];
        if (!ext) return bad(res, 'bad-audio', 415);
        if (req.body.length < 1000) return bad(res, 'empty');
        if (req.body.length > 8e6) return bad(res, 'too-big', 413);
        const key = keyAudio(t.id, id, ext);
        await media.put(key, req.body, mime);
        const pos = (await q('SELECT count(*)::int n FROM media WHERE trip_id=$1 AND day_index IS NOT DISTINCT FROM $2', [t.id, day]))[0].n;
        await q(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, mime, bytes, width, height, caption, pos, taken_at, created_by, created_uid)
          VALUES ($1,$2,$3,$4,$5,$6,$7,0,0,$8,$9,$10,$11,$12) ON CONFLICT (id) DO NOTHING`,
        [id, FAMILY, t.id, day, key, mime, req.body.length, clip(req.query.caption, 500), pos, at(req.query.at), clip(req.user.name, 40), req.user.uid]);
        return res.json({ ok: true, id, w: 0, h: 0, mime });
      }
      let img;
      try { img = await IMG.processImage(req.body); } catch (e) { return bad(res, 'bad-image', 415); }
      await media.put(keyFull(t.id, id), img.full);
      await media.put(keyThumb(t.id, id), img.thumb);
      const pos = (await q('SELECT count(*)::int n FROM media WHERE trip_id=$1 AND day_index IS NOT DISTINCT FROM $2', [t.id, day]))[0].n;
      await q(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, bytes, width, height, caption, pos, taken_at, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (id) DO NOTHING`,
      [id, FAMILY, t.id, day, keyFull(t.id, id), img.full.length, img.w, img.h, clip(req.query.caption, 500), pos, at(req.query.at), clip(req.user.name, 40), req.user.uid]);
      res.json({ ok: true, id, w: img.w, h: img.h });
    } catch (e) { next(e); }
  });
  r.patch('/api/b/media/:id', ...W, async (req, res, next) => {
    try {
      const b = req.body || {}, sets = [], args = [req.params.id, FAMILY];
      if ('caption' in b) { args.push(clip(b.caption, 500)); sets.push(`caption=$${args.length}`); }
      if ('highlight' in b) { args.push(!!b.highlight); sets.push(`highlight=$${args.length}`); }
      if ('tags' in b) { const tags = tagList(b.tags); if (!tags) return bad(res, 'tags'); args.push(tags); sets.push(`tags=$${args.length}`); }
      if ('place' in b) { args.push(clip(b.place, 120).trim()); sets.push(`place=$${args.length}`); }
      if (!sets.length) return bad(res, 'nothing');
      const out = await q(`UPDATE media SET ${sets.join(', ')} WHERE id=$1 AND family_id=$2 RETURNING id`, args);
      res.status(out.length ? 200 : 404).json({ ok: !!out.length });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/media/:id', A.requireEditor, async (req, res, next) => {
    try {
      const m = (await q('DELETE FROM media WHERE id=$1 AND family_id=$2 RETURNING trip_id, storage_key, mime', [req.params.id, FAMILY]))[0];
      if (m && String(m.mime || '').startsWith('audio/')) await media.del(m.storage_key);   // really gone (PDPA)
      else if (m) { await media.del(keyFull(m.trip_id, req.params.id)); await media.del(keyThumb(m.trip_id, req.params.id)); }
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // stream a photo to a signed-in user; never a public URL, never another family's photo (IDOR)
  const send = (thumb) => async (req, res, next) => {
    try {
      const m = (await q('SELECT trip_id, storage_key, mime FROM media WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]))[0];
      if (!m || !A.canSee(req.user, m.trip_id)) return res.sendStatus(404);   // a group never sees another book's photos
      const audio = String(m.mime || '').startsWith('audio/');
      if (audio && thumb) return res.sendStatus(404);   // a voice memo has no thumbnail
      const buf = await media.get(audio ? m.storage_key : thumb ? keyThumb(m.trip_id, req.params.id) : keyFull(m.trip_id, req.params.id));
      if (!buf) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      if (!audio) return res.type('image/jpeg').send(buf);
      // a voice memo: Safari's <audio> asks for byte ranges and only plays a 206 answer
      res.setHeader('Accept-Ranges', 'bytes'); res.type(m.mime);
      const r = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
      if (!r || (r[1] === '' && r[2] === '')) return res.send(buf);
      const a = r[1] === '' ? Math.max(0, buf.length - Number(r[2])) : Number(r[1]), b = r[1] !== '' && r[2] !== '' ? Math.min(Number(r[2]), buf.length - 1) : buf.length - 1;
      if (!(a <= b) || a >= buf.length) { res.setHeader('Content-Range', `bytes */${buf.length}`); return res.sendStatus(416); }
      res.status(206); res.setHeader('Content-Range', `bytes ${a}-${b}/${buf.length}`); res.send(buf.subarray(a, b + 1));
    } catch (e) { next(e); }
  };
  r.get('/media/:id', A.requireUser, send(false));
  r.get('/media/:id/t', A.requireUser, send(true));

  // ----- travel notebook: how a stay / restaurant / place worked for us (editors; one row per thing per trip)
  r.put('/api/b/reviews/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (!REVIEW_KINDS.includes(b.kind)) return bad(res, 'kind');
      const key = clip(b.key, 120).trim(); if (!key) return bad(res, 'key');
      const rating = b.rating == null || b.rating === '' ? null : Number(b.rating);
      if (rating !== null && !(Number.isInteger(rating) && rating >= 1 && rating <= 5)) return bad(res, 'rating');
      const tags = Array.isArray(b.tags) ? [...new Set(b.tags.map((x) => clip(x, 24)).filter((x) => /^[a-z0-9_-]+$/.test(x)))].slice(0, 12) : [];
      const kidSlugs = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug), kids = {};
      for (const [k, v] of Object.entries(b.kids && typeof b.kids === 'object' ? b.kids : {})) { if (!kidSlugs.includes(k)) return bad(res, 'child'); if (KID_VERDICT.includes(v)) kids[k] = v; }
      const again = typeof b.again === 'boolean' ? b.again : null;
      const out = await q(`INSERT INTO reviews (id, family_id, trip_id, day_index, kind, key, name, rating, tags, kids, again, note, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, name=EXCLUDED.name, rating=EXCLUDED.rating, tags=EXCLUDED.tags, kids=EXCLUDED.kids,
          again=EXCLUDED.again, note=EXCLUDED.note, updated_at=now()
        WHERE reviews.family_id = EXCLUDED.family_id AND reviews.trip_id = EXCLUDED.trip_id AND reviews.kind = EXCLUDED.kind AND reviews.key = EXCLUDED.key
        RETURNING id`, [id, FAMILY, t.id, day, b.kind, key, i18n(b.name || key, 120), rating, JSON.stringify(tags), kids, again, clip(b.note, 500), clip(req.user.name, 40), req.user.uid]);
      if (!out.length) return bad(res, 'conflict', 409);
      res.json({ ok: true });
    } catch (e) { if (e.code === '23505') return bad(res, 'conflict', 409); next(e); }   // same trip+kind+key under another id
  });
  r.delete('/api/b/reviews/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM reviews WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- hearts from the family: anyone signed in (relatives on the view link too) may send one; text only
  const sameSite = (req, res, next) => (req.headers['x-mb'] === '1' ? next() : bad(res, 'bad-request'));
  r.put('/api/b/hearts/:id', A.requireUser, sameSite, json, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t || !A.canSee(req.user, t.id)) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const kids = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug);
      const child = String(b.child || ''); if (child !== 'both' && !kids.includes(child)) return bad(res, 'child');
      if (!HEART_EMOJI.includes(b.emoji)) return bad(res, 'emoji');
      const from = clip(b.from, 24).trim(); if (!from) return bad(res, 'from');
      const text = clip(b.text, 140).trim();
      const ex = (await q('SELECT family_id FROM hearts WHERE id=$1', [id]))[0];
      if (ex) return ex.family_id === FAMILY ? res.json({ ok: true, dup: true }) : bad(res, 'conflict', 409);
      const [n] = await q("SELECT count(*) FILTER (WHERE created_uid=$2)::int mine, count(*)::int alls FROM hearts WHERE family_id=$1 AND created_at > now() - interval '1 day'", [FAMILY, req.user.uid]);
      if (n.mine >= HEARTS_PER_DAY.sender || n.alls >= HEARTS_PER_DAY.family) return bad(res, 'too-many', 429);
      await q(`INSERT INTO hearts (id, family_id, trip_id, day_index, child, emoji, text, from_name, created_uid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (id) DO NOTHING`, [id, FAMILY, t.id, day, child, b.emoji, text, from, req.user.uid]);
      if (req.user.role === 'viewer' && hooks.heart) Promise.resolve(hooks.heart({ trip: t.id })).catch((e) => console.error('heart push', e.message));   // a relative's heart → the parents' phones
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // grown-ups may remove any heart; a sender may take back their own
  r.delete('/api/b/hearts/:id', A.requireUser, sameSite, async (req, res, next) => {
    try {
      const out = await q('DELETE FROM hearts WHERE id=$1 AND family_id=$2 AND ($3 OR created_uid=$4) RETURNING id', [req.params.id, FAMILY, req.user.role === 'editor', req.user.uid]);
      res.status(out.length ? 200 : 404).json({ ok: !!out.length });
    } catch (e) { next(e); }
  });

  // ----- check-ins at planned places / meals (stamps)
  r.put('/api/b/places', ...W, async (req, res, next) => {
    try {
      const b = req.body || {};
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const key = clip(b.key, 120).trim(); if (!key) return bad(res, 'key');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (b.done === false) { await q('DELETE FROM places WHERE trip_id=$1 AND key=$2 AND family_id=$3', [t.id, key, FAMILY]); return res.json({ ok: true }); }
      await q(`INSERT INTO places (id, family_id, trip_id, day_index, key, kind, name, visited_at, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (trip_id, key) DO NOTHING`,
      [`${t.id}:${key}`.slice(0, 200), FAMILY, t.id, day, key, b.kind === 'food' ? 'food' : 'place', i18n(b.name || key, 120), at(b.at), clip(req.user.name, 40)]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // ----- "Done" for a day (stamp rule: all days done OR trip over)
  r.put('/api/b/days/:trip/:day', ...W, async (req, res, next) => {
    try {
      const t = await trip(req.params.trip); if (!t) return bad(res, 'trip');
      const day = Number(req.params.day); if (!dayOk(t, day) || day === null) return bad(res, 'day');
      await q('UPDATE trip_days SET done_at = CASE WHEN $3 THEN COALESCE(done_at, now()) ELSE NULL END WHERE trip_id=$1 AND day_index=$2', [t.id, day, !!(req.body || {}).done]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // ----- what we actually spent (the manual's budget is an estimate; this is the real number, per day — editors only;
  // stays in this family's database, never in a seed or the printed book)
  const SPEND_CATS = ['food', 'transport', 'tickets', 'stay', 'shop', 'other'];
  r.put('/api/b/spend/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const amount = Number(b.amount);
      if (!Number.isFinite(amount) || amount < 0 || amount > 1e7) return bad(res, 'amount');
      const cur = String(b.cur || '').toUpperCase(); if (!/^[A-Z]{3}$/.test(cur)) return bad(res, 'cur');
      if (!SPEND_CATS.includes(b.cat)) return bad(res, 'cat');
      await q(`INSERT INTO spend (id, family_id, trip_id, day_index, amount, cur, cat, note, created_by, created_uid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, amount=EXCLUDED.amount, cur=EXCLUDED.cur, cat=EXCLUDED.cat, note=EXCLUDED.note, updated_at=now()
        WHERE spend.family_id = EXCLUDED.family_id`, [id, FAMILY, t.id, day, amount.toFixed(2), cur, b.cat, clip(b.note, 200), clip(req.user.name, 40), req.user.uid]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/spend/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM spend WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- a new trip (book) created in the app
  r.post('/api/b/trips', ...W, async (req, res, next) => {
    const c = await pool.connect();
    try {
      const b = req.body || {};
      const slug = clip(b.slug, 60);
      const from = new Date(b.date_from + 'T00:00:00Z'), to = new Date(b.date_to + 'T00:00:00Z');
      if (!SLUG_RE.test(slug)) return bad(res, 'slug');
      if (isNaN(from) || isNaN(to) || to < from || (to - from) / 864e5 > 60) return bad(res, 'dates');
      if (!clip(b.title && (b.title.th || b.title.en || b.title), 120).trim()) return bad(res, 'title');
      await c.query('BEGIN');
      const ins = await c.query(`INSERT INTO trips (id, family_id, slug, title, sub, date_from, date_to, timezone, theme, cover, source)
        VALUES ($1,$2,$1,$3,$4,$5,$6,$7,$8,$9,'manual') ON CONFLICT DO NOTHING RETURNING id`,
      [slug, FAMILY, i18n(b.title, 120), b.sub ? i18n(b.sub, 120) : null, b.date_from, b.date_to, clip(b.timezone || 'Asia/Bangkok', 60),
        { accent: /^#[0-9a-fA-F]{6}$/.test(b.accent) ? b.accent : '#1F3A5F', display: 'sans' }, { emoji: clip(b.emoji || '📖', 8) }]);
      if (!ins.rows.length) { await c.query('ROLLBACK'); return bad(res, 'exists', 409); }
      for (let i = 0, d = new Date(from); d <= to; i++, d = new Date(d.getTime() + 864e5)) {
        await c.query('INSERT INTO trip_days (trip_id, day_index, date, title) VALUES ($1,$2,$3,$4)', [slug, i, d.toISOString().slice(0, 10), { th: `วันที่ ${i + 1}`, en: `Day ${i + 1}` }]);
      }
      await c.query('COMMIT');
      res.json({ ok: true, id: slug });
    } catch (e) { await c.query('ROLLBACK').catch(() => {}); next(e); } finally { c.release(); }
  });

  // ----- bedtime story (Claude): only when pressed, text facts only, streamed as SSE; disconnect = stop, nothing saved
  async function storyFacts(t, day, lang) {
    const days = await q("SELECT day_index, to_char(date,'YYYY-MM-DD') date, title FROM trip_days WHERE trip_id=$1 ORDER BY day_index", [t.id]);
    const kidRows = await q('SELECT slug, name_th, name_en FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY]);
    const kids = Object.fromEntries(kidRows.map((k) => [k.slug, lang === 'en' ? k.name_en : k.name_th]));
    const who = (s) => (s === 'both' ? FAM.names(kidRows, lang) : kids[s] || s);
    const firsts = Object.fromEntries((await q('SELECT key, label FROM firsts_catalog WHERE trip_id=$1', [t.id])).map((f) => [f.key, f.label[lang] || f.label.en]));
    const pp = ((await q('SELECT passport FROM trips WHERE id=$1', [t.id]))[0] || {}).passport || {};
    const spot = (di, k) => { const it = (((pp.days || [])[di] || {}).spot || []).find((x) => `spot.d${di}.${x.k}` === k) || ((((pp.little || {}).days || [])[di]) || []).find((x) => `little.d${di}.${x.k}` === k); return it ? it[lang] || it.en : null; };
    const lines = [];
    for (const d of days.filter((x) => day === null || x.day_index === day)) {
      const es = await q("SELECT kind, child, text, mood, first_key FROM entries WHERE trip_id=$1 AND day_index=$2 AND kind<>'story' ORDER BY occurred_at", [t.id, d.day_index]);
      const pl = await q('SELECT name FROM places WHERE trip_id=$1 AND day_index=$2 ORDER BY visited_at', [t.id, d.day_index]);
      const caps = (await q("SELECT caption FROM media WHERE trip_id=$1 AND day_index=$2 AND caption<>'' ORDER BY taken_at", [t.id, d.day_index])).map((m) => m.caption);
      const part = [];
      if (pl.length) part.push(`${lang === 'en' ? 'Places' : 'ที่ไป'}: ${pl.map((p) => p.name[lang] || p.name.en).join(', ')}`);
      es.filter((e) => e.kind === 'mood' && e.mood).forEach((e) => part.push(`${lang === 'en' ? 'Mood' : 'อารมณ์'} ${who(e.child)}: ${e.mood}`));
      es.filter((e) => e.kind === 'quote').forEach((e) => part.push(`${who(e.child)} ${lang === 'en' ? 'said' : 'พูดว่า'}: "${e.text}"`));
      caps.forEach((c) => part.push(`${lang === 'en' ? 'Photo' : 'รูป'}: ${c}`));
      es.filter((e) => e.kind === 'fav').forEach((e) => part.push(`${lang === 'en' ? 'Favourite today' : 'ของโปรดวันนี้'}: ${e.text}`));
      es.filter((e) => e.kind === 'note').forEach((e) => part.push(`${lang === 'en' ? 'Parents’ note' : 'บันทึกพ่อแม่'}: ${e.text}`));
      es.filter((e) => e.kind === 'first').forEach((e) => part.push(`${lang === 'en' ? 'First time' : 'ครั้งแรก'} (${who(e.child)}): ${e.first_key === 'custom' ? e.text : firsts[e.first_key] || e.first_key}`));
      es.filter((e) => e.kind === 'tick' && spot(d.day_index, e.first_key)).forEach((e) => part.push(`${lang === 'en' ? 'Spotted' : 'เจอแล้ว'} (${who(e.child)}): ${spot(d.day_index, e.first_key)}`));
      (await q('SELECT kind, name, rating, kids, note FROM reviews WHERE trip_id=$1 AND day_index=$2 AND (rating IS NOT NULL OR note<>\'\') ORDER BY updated_at', [t.id, d.day_index]))
        .forEach((r) => part.push(`${{ stay: lang === 'en' ? 'Stay' : 'ที่พัก', food: lang === 'en' ? 'Food' : 'ร้านอาหาร', place: lang === 'en' ? 'Place' : 'สถานที่' }[r.kind]}: ${r.name[lang] || r.name.en}${r.rating ? ` ${'★'.repeat(r.rating)}` : ''}${Object.entries(r.kids || {}).map(([k, v]) => ` · ${who(k)} ${{ love: '😍', ok: '🙂', no: '😖' }[v]}`).join('')}${r.note ? ` — ${r.note}` : ''}`));
      if (part.length) lines.push(`${lang === 'en' ? 'Day' : 'วันที่'} ${d.day_index + 1} (${d.date}) — ${d.title[lang] || d.title.en}\n- ${part.join('\n- ')}`);
    }
    return lines.join('\n\n');
  }
  // tomorrow in five lines (mode 'next'): tomorrow's plan from the seed (timeline, stay, backup plan, money/tips, the climate note),
  // the live forecast when the trip is near (weather.js, town-level), then today's notes — so a tired day can lighten tomorrow
  async function nextFacts(t, day, lang) {
    const d = (await q("SELECT day_index, to_char(date,'YYYY-MM-DD') date, title, wx, plan FROM trip_days WHERE trip_id=$1 AND day_index=$2", [t.id, day + 1]))[0];
    if (!d) return '';
    const G = require('./guide'), tx = (v, n = 600) => G.textOf(v, lang).join(' · ').slice(0, n), pl = d.plan || {}, en = lang === 'en';
    const out = [`${en ? 'Tomorrow' : 'พรุ่งนี้'}: ${en ? 'Day' : 'วันที่'} ${d.day_index + 1} (${d.date}) — ${tx(d.title, 200)}`];
    (pl.plan || []).forEach((r) => out.push(`${r.t ? r.t + ' ' : ''}${tx(r, 300)}`));
    if (pl.stay) out.push(`${en ? 'Sleep at' : 'นอนที่'}: ${tx(pl.stay.name || pl.stay, 200)}`);
    for (const [k, th, enl] of [['planB', 'แผนสำรอง', 'Backup plan'], ['moving', 'การเดินทาง', 'Getting around'], ['money', 'เงิน', 'Money'], ['tips', 'ทิป', 'Tips']]) if (pl[k]) out.push(`${en ? enl : th}: ${tx(pl[k])}`);
    if (d.wx) out.push(`${en ? 'Climate' : 'อากาศ'}: ${tx(d.wx, 300)}`);
    try {
      const [f] = await require('./weather').forecast([{ date: d.date, ll: pl.stay && pl.stay.ll }], t.timezone);
      if (f) out.push(`${en ? 'Forecast' : 'พยากรณ์'}: ${Math.round(f.tmin)}–${Math.round(f.tmax)}°C${f.pop != null ? `, ${en ? 'rain' : 'โอกาสฝน'} ${f.pop}%` : ''}`);
    } catch (_) { /* the forecast is a nice-to-have */ }
    const today = await storyFacts(t, day, lang);
    if (today) out.push(`\n${en ? 'How today went' : 'วันนี้เป็นยังไง'}:\n${today}`);
    return out.join('\n');
  }
  const STORY_DAILY = Math.max(1, parseInt(process.env.STORY_DAILY, 10) || 60);   // model calls per family per UTC day — a cap on the API bill, not a quota anyone should meet
  // the daily cap is counted in Postgres (ai_usage), atomically: a redeploy doesn't reset it, two phones can't both pass the last call
  const aiTake = async () => (await q(`INSERT INTO ai_usage (family_id, day, calls) VALUES ($1, (now() AT TIME ZONE 'UTC')::date, 1)
    ON CONFLICT (family_id, day) DO UPDATE SET calls = ai_usage.calls + 1 WHERE ai_usage.calls < $2 RETURNING calls`, [FAMILY, STORY_DAILY])).length > 0;
  const addUsage = (u) => q(`UPDATE ai_usage SET tokens_in = tokens_in + $2, tokens_cached = tokens_cached + $3, tokens_out = tokens_out + $4
    WHERE family_id=$1 AND day=(now() AT TIME ZONE 'UTC')::date`, [FAMILY, (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0), u.cache_read_input_tokens || 0, u.output_tokens || 0]).catch((e) => console.error('ai usage', e.message));
  if (ai && ai.onUsage) ai.onUsage(addUsage);
  // "Claude today" for the grown-ups: today's calls against the cap, and the last 30 days' calls and tokens
  // (an optional USD estimate when AI_USD_PER_MTOK_IN / _OUT are set — prices are not hard-coded here)
  // ----- a book from a Trip Operations Manual PDF (server/bookimport.js): one job at a time, the result waits as a draft until saved
  const DATA_TMP = path.join(path.resolve(process.env.DATA_DIR || './data'), 'tmp');
  // What the draft list shows of a seed without sending the seed itself: cover, dates, the table of contents and what the kids' pages hold
  const peek = (seed) => {
    const n = (a) => (Array.isArray(a) ? a.length : 0), pp = seed.passport || {}, inf = seed.info || {};
    const list = (k) => { const l = (pp.lists || []).find((x) => x && x.key === k); return l ? (l.groups || []).reduce((a, g) => a + n(g.items), 0) : 0; };
    return { title: seed.title, cover: seed.cover || null, date_from: seed.date_from || null, date_to: seed.date_to || null, days: n(seed.days),
      toc: (seed.days || []).map((d) => ({ t: d.title, e: d.emoji || '' })),
      peek: { stops: (seed.days || []).reduce((a, d) => a + n(d.planned), 0), restaurants: ((inf.restaurants && inf.restaurants.groups) || []).reduce((a, g) => a + n(g.items), 0), missions: n(pp.days),
        wild: n(inf.wild), firsts: n(seed.firsts_catalog), words: list('words'), food: list('food'), map: n(pp.map && pp.map.stops), stays: n(inf.stays) } };
  };
  const IMPORT_CALLS = 30;   // a manual of ~300 restaurants: structure, info, ~12 restaurant calls, kids, extras, ~4 Thai batches, and room for retries
  let job = null;   // { id, slug, status: running|done|error, log, draft, error, started }
  const jobView = () => (job ? { id: job.id, slug: job.slug, status: job.status, log: job.log, draft: job.draft || null, error: job.error || null, started: job.started } : { status: 'idle' });
  r.post('/api/b/import', A.requireEditor, express.raw({ type: () => true, limit: '25mb' }), async (req, res, next) => {
    try {
      if (!(ai && ai.enabled())) return bad(res, 'ai', 503);
      if (job && job.status === 'running') return bad(res, 'busy', 409);
      const slug = clip(req.query.slug, 60);
      if (!SLUG_RE.test(slug)) return bad(res, 'slug');
      if (!Buffer.isBuffer(req.body) || req.body.length < 2000 || req.body.subarray(0, 5).toString() !== '%PDF-') return bad(res, 'pdf');
      if ((await q('SELECT 1 FROM trips WHERE family_id=$1 AND slug=$2', [FAMILY, slug])).length) return bad(res, 'exists', 409);
      // a book takes about 30 Claude calls: start only when today's allowance can carry it, so a cap hit midway never wastes the calls already paid for
      const used = Number(((await q("SELECT calls FROM ai_usage WHERE family_id=$1 AND day=(now() AT TIME ZONE 'UTC')::date", [FAMILY]))[0] || {}).calls || 0);
      const need = Math.min(IMPORT_CALLS, STORY_DAILY);   // a family whose daily cap is below a book's needs can still start from a fresh day
      if (STORY_DAILY - used < need) return res.status(429).json({ error: 'limit', left: Math.max(0, STORY_DAILY - used), need });
      const id = crypto.randomBytes(8).toString('hex'), who = req.user.name || '', buf = req.body;
      job = { id, slug, status: 'running', log: [], started: Date.now() };
      const log = (line) => { job.log.push(`${new Date().toISOString().slice(11, 19)} ${line}`); if (job.log.length > 60) job.log.shift(); };
      res.status(202).json({ job: id });
      try {
        const kids = await q('SELECT slug, name_th, name_en, emoji, birth_ym FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY]);
        const out = await IMPORT.run({ buf, slug, client: new ai.SDK(), take: aiTake, onUsage: addUsage, log, dir: DATA_TMP,
          kids: kids.map((k) => ({ name_en: k.name_en, age: k.birth_ym ? Math.max(0, Math.floor((Date.now() - new Date(k.birth_ym + '-01')) / 31557600000)) : '' })) });
        if (kids.length) out.seed.children = FAM.seedChildren(kids, out.seed.date_from);   // the book is about this family's children, whatever the manual's defaults
        await q('INSERT INTO book_drafts (id, family_id, slug, seed, report, cost, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7)', [id, FAMILY, slug, out.seed, out.report, out.cost, who]);
        job.draft = { id, slug, title: out.seed.title, days: out.seed.days.length, report: out.report, cost: out.cost };
        job.status = 'done'; log('done — review the draft, then save it as a book');
      } catch (e) {
        job.status = 'error'; job.error = e.code || 'failed'; log(`failed: ${e.message}`); console.error('import', e.message);
      }
    } catch (e) { next(e); }
  });
  r.get('/api/b/import', A.requireEditor, async (_req, res, next) => {
    try {
      const drafts = await q('SELECT id, slug, seed, report, cost, created_by, created_at FROM book_drafts WHERE family_id=$1 ORDER BY created_at DESC', [FAMILY]);
      res.setHeader('Cache-Control', 'no-store');
      res.json({ job: jobView(), drafts: drafts.map(({ seed, ...d }) => ({ ...d, ...peek(seed), created_at: new Date(d.created_at).getTime() })), on: !!(ai && ai.enabled()) });
    } catch (e) { next(e); }
  });
  r.get('/api/b/import/:id', A.requireEditor, async (req, res, next) => {
    try {
      const d = (await q('SELECT id, slug, seed, report, cost FROM book_drafts WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]))[0];
      if (!d) return bad(res, 'draft', 404);
      res.setHeader('Cache-Control', 'no-store'); res.json(d);
    } catch (e) { next(e); }
  });
  r.post('/api/b/import/:id/save', ...W, async (req, res, next) => {
    const c = await pool.connect();
    try {
      const d = (await c.query('SELECT seed FROM book_drafts WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY])).rows[0];
      if (!d) return bad(res, 'draft', 404);
      await c.query('BEGIN');
      try { await putSeed(c, d.seed, 'manual'); } catch (e) { await c.query('ROLLBACK'); if (e.code === 'exists') return bad(res, 'exists', 409); throw e; }
      await c.query('DELETE FROM book_drafts WHERE id=$1', [req.params.id]);
      await c.query('COMMIT');
      res.json({ ok: true, id: d.seed.slug });
    } catch (e) { await c.query('ROLLBACK').catch(() => {}); next(e); } finally { c.release(); }
  });
  r.delete('/api/b/import/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM book_drafts WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  r.get('/api/b/ai', A.requireEditor, async (_req, res, next) => {
    try {
      const rows = await q(`SELECT to_char(day,'YYYY-MM-DD') AS day, calls, tokens_in::float8 tin, tokens_cached::float8 tcache, tokens_out::float8 tout FROM ai_usage
        WHERE family_id=$1 AND day > (now() AT TIME ZONE 'UTC')::date - 30 ORDER BY day DESC`, [FAMILY]);
      const today = new Date().toISOString().slice(0, 10), t0 = rows.find((x) => x.day === today) || { calls: 0, tin: 0, tcache: 0, tout: 0 };
      const pin = Number(process.env.AI_USD_PER_MTOK_IN) || 0, pout = Number(process.env.AI_USD_PER_MTOK_OUT) || 0;
      const sum = rows.reduce((a, x) => ({ calls: a.calls + x.calls, tin: a.tin + x.tin, tcache: a.tcache + x.tcache, tout: a.tout + x.tout }), { calls: 0, tin: 0, tcache: 0, tout: 0 });
      const usd = pin && pout ? Math.round(((sum.tin + sum.tcache * 0.1) * pin + sum.tout * pout) / 1e4) / 100 : null;   // cache reads ≈ a tenth of the input rate
      res.setHeader('Cache-Control', 'no-store');
      res.json({ limit: STORY_DAILY, on: !!(ai && ai.enabled()), today: t0, days30: sum, usd30: usd, days: rows });
    } catch (e) { next(e); }
  });
  r.post('/api/b/story', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.enabled()) return bad(res, 'no-key', 501);
      const b = req.body || {}, lang = b.lang === 'en' ? 'en' : 'th', mode = ['sum', 'msg', 'talk', 'letter', 'next', 'mquiz', 'fore'].includes(b.mode) ? b.mode : 'story';   // sum = the day summary for the book · msg = a note for the relatives (not saved) · talk = bedtime questions
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const whole = mode === 'letter' || mode === 'fore';   // the letter and the foreword are for the whole trip; the rest need a day
      if (whole ? day !== null : mode !== 'story' && day === null) return bad(res, 'day');
      if (mode === 'next' && day + 1 >= t.days) return bad(res, 'day');   // no tomorrow after the last day
      const facts = mode === 'next' ? await nextFacts(t, day, lang) : await storyFacts(t, day, lang);
      if (!facts) return bad(res, 'empty', 422);   // nothing written down → don't call the model
      const kids = await kidsFor(t);
      if (!(await aiTake())) return bad(res, 'limit', 429);
      const ctl = new AbortController();
      let done = false;
      res.on('close', () => { if (!done) ctl.abort(); });
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
      const send = (ev, data) => res.write(`${ev ? `event: ${ev}\n` : ''}data: ${JSON.stringify(data)}\n\n`);
      try {
        let text = await ai.writeStory({ lang, whole: day === null, mode, facts, kids, signal: ctl.signal, onText: (x) => send(null, { t: x }) });
        if (mode === 'talk') text = text.split('\n').map((l) => l.replace(/^\s*\d+[.)]\s*/, '').trim()).filter(Boolean).slice(0, 5).join('\n');   // one question per line, no numbering
        if (mode === 'msg' || mode === 'next') { done = true; send('done', { text }); return res.end(); }   // the note for the relatives and tomorrow's lines live only on the phone
        if (mode === 'mquiz') {   // the memory game: only a valid set of picture questions is kept
          const quiz = ai.parseQuiz ? ai.parseQuiz(text) : null;
          if (!quiz) { done = true; send('error', { error: 'failed' }); return res.end(); }
          text = JSON.stringify(quiz);
        }
        const id = day === null ? `${t.id}.${mode}.all` : `${t.id}.${mode}.d${day}`;   // sum id = the record page's blur-save id, so edits upsert the same row
        await q(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, text, lang, created_by, created_uid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          ON CONFLICT (id) DO UPDATE SET text=EXCLUDED.text, lang=EXCLUDED.lang, updated_at=now(), tr=NULL`, [id, FAMILY, t.id, day, mode, text, lang, 'Claude', req.user.uid]);
        done = true;
        send('done', { id, text });
      } catch (e) {
        done = true;
        if (ctl.signal.aborted) return res.end();   // stopped by the user: nothing saved
        console.error('story', e.code || e.status || e.message);
        send('error', { error: e.code === 'refusal' ? 'refusal' : 'failed' });
      }
      res.end();
    } catch (e) { next(e); }
  });

  // ----- ask the guide (Claude): a parent's question answered from the book's own manual (excerpts picked by server/guide.js).
  // Editors only, only when asked, guide text only (no records, no photos), streamed as SSE, never saved; shares the daily cap.
  r.post('/api/b/ask', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.enabled()) return bad(res, 'no-key', 501);
      const b = req.body || {}, lang = b.lang === 'en' ? 'en' : 'th', qtext = String(b.q || '').trim().slice(0, 300);
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      if (!qtext) return bad(res, 'q');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const info = ((await q('SELECT info FROM trips WHERE id=$1', [t.id]))[0] || {}).info || {};
      const days = await q("SELECT day_index, to_char(date,'YYYY-MM-DD') date, title, sleep, plan FROM trip_days WHERE trip_id=$1 ORDER BY day_index", [t.id]);
      const guide = GUIDE.excerpt({ info, days, lang, q: qtext, day });
      if (!(await aiTake())) return bad(res, 'limit', 429);
      const ctl = new AbortController();
      let done = false;
      res.on('close', () => { if (!done) ctl.abort(); });
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
      const send = (ev, data) => res.write(`${ev ? `event: ${ev}\n` : ''}data: ${JSON.stringify(data)}\n\n`);
      try {
        const text = await ai.askGuide({ lang, guide, q: qtext, kids: await kidsFor(t), signal: ctl.signal, onText: (x) => send(null, { t: x }) });
        done = true;
        send('done', { text });
      } catch (e) {
        done = true;
        if (ctl.signal.aborted) return res.end();
        console.error('ask', e.code || e.status || e.message);
        send('error', { error: e.code === 'refusal' ? 'refusal' : 'failed' });
      }
      res.end();
    } catch (e) { next(e); }
  });

  // ----- look at today's photos (Claude, editors, only with PHOTO_AI=1): the day's 520 px thumbnails Claude has not seen yet (≤ 12 a call)
  // go with the day's title and stop names; back come a caption (kept only where the parents wrote none), tags from the fixed list and the
  // stop the photo belongs to. One model call per press; {all: true} sends the day's photos again. Nothing else about the family travels.
  const PHOTOS_PER_CALL = 12;
  r.post('/api/b/photos/ai', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.photoEnabled || !ai.photoEnabled()) return bad(res, 'no-key', 501);
      const b = req.body || {}, lang = b.lang === 'en' ? 'en' : 'th';
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (day === null || !dayOk(t, day)) return bad(res, 'day');
      const rows = await q(`SELECT id, caption FROM media WHERE trip_id=$1 AND day_index=$2 AND mime NOT LIKE 'audio/%' ${b.all ? '' : 'AND ai_at IS NULL'} ORDER BY taken_at, pos LIMIT $3`, [t.id, day, PHOTOS_PER_CALL]);
      if (!rows.length) return bad(res, 'empty', 422);   // nothing new to look at → don't call the model
      const d = (await q('SELECT title, planned, plan FROM trip_days WHERE trip_id=$1 AND day_index=$2', [t.id, day]))[0] || {};
      const nm = (x) => (x && typeof x === 'object' ? x[lang] || x.en || x.th : x);
      const stops = [...new Set([...(d.planned || []).map(nm), ...(await q('SELECT name FROM places WHERE trip_id=$1 AND day_index=$2 ORDER BY visited_at', [t.id, day])).map((p) => nm(p.name)),
        (d.plan && d.plan.stay && nm(d.plan.stay.name || d.plan.stay))].map((x) => clip(x, 120).trim()).filter(Boolean))].slice(0, 30);
      const photos = [];
      for (const m of rows) { const jpeg = await media.get(keyThumb(t.id, m.id)); if (jpeg) photos.push({ id: m.id, jpeg }); }
      if (!photos.length) return bad(res, 'empty', 422);
      if (!(await aiTake())) return bad(res, 'limit', 429);
      let seen;
      try { seen = await ai.describePhotos({ lang, photos, context: { title: nm(d.title) || '', stops } }); }
      catch (e) { console.error('photos', e.code || e.status || e.message); return bad(res, e.code === 'refusal' ? 'refusal' : 'failed', 502); }
      let n = 0;
      for (const m of rows) {
        const x = seen[m.id]; if (!x) continue;
        await q(`UPDATE media SET caption = CASE WHEN caption = '' THEN $3 ELSE caption END, tags=$4, place=$5, ai_at=now() WHERE id=$1 AND trip_id=$2`, [m.id, t.id, clip(x.cap, 500), x.tags, x.place]);
        n++;
      }
      // the day's best photos: Claude's picks get the ⭐ only while the day has none yet (the parents' own stars always win;
      // a drawing is never picked); at most two, and the parents change them in the photo viewer like any star
      let starred = 0;
      const picks = rows.filter((m) => seen[m.id] && seen[m.id].best && !m.id.startsWith('dr-')).slice(0, 2).map((m) => m.id);
      if (picks.length && !(await q("SELECT 1 FROM media WHERE trip_id=$1 AND day_index=$2 AND highlight AND mime NOT LIKE 'audio/%' AND id NOT LIKE 'dr-%' LIMIT 1", [t.id, day])).length) {
        starred = (await pool.query('UPDATE media SET highlight=true WHERE trip_id=$1 AND id = ANY($2)', [t.id, picks])).rowCount;
      }
      const left = (await q("SELECT count(*)::int n FROM media WHERE trip_id=$1 AND day_index=$2 AND mime NOT LIKE 'audio/%' AND ai_at IS NULL", [t.id, day]))[0].n;
      res.json({ ok: true, n, left, starred });
    } catch (e) { next(e); }
  });

  // ----- translate a day (Claude): the day's quotes, note, favourite, summary and own "firsts" into the other language (Thai ↔ English),
  // so the book reads in both; only those words travel (never photos); saved per entry (tr), only while its text is unchanged
  const TR_KINDS = ['quote', 'note', 'fav', 'sum', 'first'];
  r.post('/api/b/translate', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.enabled()) return bad(res, 'no-key', 501);
      const b = req.body || {};
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (day === null || !dayOk(t, day)) return bad(res, 'day');
      const rows = (await q("SELECT id, kind, text, first_key FROM entries WHERE trip_id=$1 AND day_index=$2 AND kind = ANY($3) AND text<>'' AND tr IS NULL ORDER BY occurred_at", [t.id, day, TR_KINDS]))
        .filter((e) => e.kind !== 'first' || e.first_key === 'custom').slice(0, 60);
      if (!rows.length) return bad(res, 'empty', 422);   // nothing new to translate → don't call the model
      if (!(await aiTake())) return bad(res, 'limit', 429);
      const items = rows.map((e) => ({ id: e.id, to: /[\u0E00-\u0E7F]/.test(e.text) ? 'en' : 'th', text: e.text }));
      let tr;
      try { tr = await ai.translate({ items, kids: await kidsFor(t) }); } catch (e) { console.error('translate', e.code || e.status || e.message); return bad(res, e.code === 'refusal' ? 'refusal' : 'failed', 502); }
      let n = 0;
      for (const e of rows) if (tr[e.id]) n += (await pool.query('UPDATE entries SET tr=$1 WHERE id=$2 AND trip_id=$3 AND text=$4', [tr[e.id], e.id, t.id, e.text])).rowCount;
      res.json({ ok: true, n });
    } catch (e) { next(e); }
  });

  // ----- what our family likes (Claude, editors): the travel notebook across every trip → what works for us, for the next trip.
  // Only the notebook's words go (names, stars, tags, the kids' verdicts, notes); saved in settings (family_likes) for both parents.
  const VERDICT = { love: 'loved it', ok: 'okay', no: 'did not like it' };
  r.get('/api/b/likes', A.requireEditor, async (_req, res, next) => {
    try { const v = (await q("SELECT value FROM settings WHERE key='family_likes'"))[0]; res.setHeader('Cache-Control', 'no-store'); res.json(v ? JSON.parse(v.value) : null); } catch (e) { next(e); }
  });
  r.post('/api/b/likes', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.enabled()) return bad(res, 'no-key', 501);
      const lang = (req.body || {}).lang === 'en' ? 'en' : 'th';
      const rows = await q(`SELECT r.kind, r.name, r.rating, r.tags, r.kids, r.again, r.note, t.title FROM reviews r JOIN trips t ON t.id=r.trip_id
        WHERE r.family_id=$1 ORDER BY t.date_from, r.updated_at`, [FAMILY]);
      if (!rows.length) return bad(res, 'empty', 422);
      const kids = Object.fromEntries((await q('SELECT slug, name_th, name_en FROM children WHERE family_id=$1', [FAMILY])).map((k) => [k.slug, lang === 'en' ? k.name_en : k.name_th]));
      const facts = rows.map((r) => `${r.title[lang] || r.title.en} · ${r.kind}: ${r.name[lang] || r.name.en}${r.rating ? ` · ${r.rating}/5` : ''}${(r.tags || []).length ? ` · tags: ${r.tags.join(', ')}` : ''}`
        + `${Object.entries(r.kids || {}).map(([k, v]) => ` · ${kids[k] || k}: ${VERDICT[v] || v}`).join('')}${r.again === true ? ' · would go again' : r.again === false ? ' · would not go again' : ''}${r.note ? ` · note: ${r.note}` : ''}`).join('\n');
      if (!(await aiTake())) return bad(res, 'limit', 429);
      const ctl = new AbortController();
      let done = false;
      res.on('close', () => { if (!done) ctl.abort(); });
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
      const send = (ev, data) => res.write(`${ev ? `event: ${ev}\n` : ''}data: ${JSON.stringify(data)}\n\n`);
      try {
        const text = await ai.writeStory({ lang, whole: true, mode: 'likes', facts, kids: await kidsFor(), signal: ctl.signal, onText: (x) => send(null, { t: x }) });
        const v = { text, lang, at: Date.now(), n: rows.length };
        await q("INSERT INTO settings (key, value) VALUES ('family_likes', $1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [JSON.stringify(v)]);
        done = true;
        send('done', v);
      } catch (e) {
        done = true;
        if (ctl.signal.aborted) return res.end();
        console.error('likes', e.code || e.status || e.message);
        send('error', { error: e.code === 'refusal' ? 'refusal' : 'failed' });
      }
      res.end();
    } catch (e) { next(e); }
  });

  // ----- relatives' groups (editors): each group its own view-only PIN and/or link, and the books it may see.
  // The PIN is stored only as A.pinHash (keyed hash); a link token is random. Deleting a group signs its phones out.
  const groupOut = (g) => ({ id: g.id, name: g.name, trips: g.trips, pin: !!g.pin_hash, link: g.link_token ? `/v/${g.link_token}` : null, at: new Date(g.updated_at).getTime() });
  r.get('/api/b/viewers', A.requireEditor, async (_req, res, next) => {
    try { res.json({ groups: (await q('SELECT * FROM viewer_groups WHERE family_id=$1 ORDER BY created_at', [FAMILY])).map(groupOut) }); } catch (e) { next(e); }
  });
  r.put('/api/b/viewers/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!/^[a-z0-9-]{6,40}$/.test(id)) return bad(res, 'id');
      const name = clip(b.name, 40).trim(); if (!name) return bad(res, 'name');
      const all = (await q('SELECT id FROM trips WHERE family_id=$1', [FAMILY])).map((t) => t.id);
      const trips = [...new Set((Array.isArray(b.trips) ? b.trips : []).map(String))].filter((x) => all.includes(x));
      const cur = (await q('SELECT * FROM viewer_groups WHERE id=$1', [id]))[0];
      if (cur && cur.family_id !== FAMILY) return bad(res, 'conflict', 409);
      let pin = cur ? cur.pin_hash : null, link = cur ? cur.link_token : null, pinLen = cur ? cur.pin_len : null;
      if (b.pin === null) { pin = null; pinLen = null; }   // remove the PIN (link only)
      else if (b.pin !== undefined && String(b.pin) !== '') {
        const code = String(b.pin);
        if (!/^\d{6,12}$/.test(code)) return bad(res, 'pin');   // the login pad is digits; at least 6 so a group PIN is not guessable in the throttle window
        if ((A.FAMILY_CODE && A.safeEq(code, A.FAMILY_CODE)) || (A.VIEW_PIN && A.safeEq(code, A.VIEW_PIN))) return bad(res, 'pin-taken', 409);
        pin = A.pinHash(code); pinLen = code.length;   // only the length is kept beside the hash: the sign-in pad opens by itself at the last digit
        if ((await q('SELECT 1 FROM viewer_groups WHERE pin_hash=$1 AND id<>$2', [pin, id])).length) return bad(res, 'pin-taken', 409);
      }
      if (b.link === false) link = null;
      else if (b.link === 'new' || (b.link === true && !link)) link = crypto.randomBytes(24).toString('base64url');   // a fresh link stops the old one
      if (!pin && !link) return bad(res, 'no-way-in');
      await q(`INSERT INTO viewer_groups (id, family_id, name, pin_hash, link_token, trips, pin_len) VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, pin_hash=EXCLUDED.pin_hash, link_token=EXCLUDED.link_token, trips=EXCLUDED.trips, pin_len=EXCLUDED.pin_len, updated_at=now()`, [id, FAMILY, name, pin, link, trips, pinLen]);
      A.groupsChanged();
      res.json({ ok: true, group: groupOut((await q('SELECT * FROM viewer_groups WHERE id=$1', [id]))[0]) });
    } catch (e) { if (e.code === '23505') return bad(res, 'pin-taken', 409); next(e); }
  });
  r.delete('/api/b/viewers/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM viewer_groups WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); A.groupsChanged(); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- PDPA: everything we hold about the family, in one JSON (photos via /api/b/backup.zip later)
  r.get('/api/b/export.json', A.requireEditor, async (_req, res, next) => {
    try {
      const out = {};
      for (const t of ['children', 'trips', 'entries', 'media', 'places', 'hearts', 'reviews']) out[t] = await q(`SELECT * FROM ${t} WHERE family_id=$1`, [FAMILY]);
      out.trip_days = await q('SELECT d.* FROM trip_days d JOIN trips t ON t.id=d.trip_id WHERE t.family_id=$1', [FAMILY]);
      out.firsts_catalog = await q('SELECT f.* FROM firsts_catalog f JOIN trips t ON t.id=f.trip_id WHERE t.family_id=$1', [FAMILY]);
      res.setHeader('Content-Disposition', 'attachment; filename="memory-bookshelf.json"');
      res.json({ format: 'memory-bookshelf-export', version: 1, at: Date.now(), ...out });
    } catch (e) { next(e); }
  });

  return r;
}

// the family's app name and kicker, resolved as the app shows them (the manifest and /api/brand)
async function brand(pool) {
  const kids = (await pool.query('SELECT slug, name_th, name_en, look, avatar FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY])).rows;
  const prof = FAM.profile(((await pool.query('SELECT profile FROM families WHERE id=$1', [FAMILY])).rows[0] || {}).profile, kids);
  return { ...prof, kids: kids.map((k) => ({ slug: k.slug, v: FAM.lookVersion(k.look), ...(k.avatar ? { a: 1 } : {}) })) };
}
module.exports = { router, syncSeeds, brand, FAMILY, AUDIO_EXT };
