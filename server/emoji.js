'use strict';
// The family's emoji library (table emoji, migration 0022). Each row is one picture the app draws for an emoji: the
// emoji it stands for (`ch`, what the text keeps — moods, hearts, quotes, notes and captions stay plain Unicode), other
// emoji drawn the same (`alt`), a Thai and an English name, and the picture: a bundled one (public/art/emoji/<file>.webp)
// or one the parents uploaded (storage e/<id>.png, shrunk here to 160 px, metadata stripped). The bundled set is added
// once per family on boot; after that the parents add and delete freely (a deleted bundled one stays deleted, and
// "bring back the original set" puts back the missing ones).
const express = require('express');
const sharp = require('sharp');

// [file, emoji, Thai name, English name, …other emoji drawn with the same picture] — the owner's pack (LifeBook Part 2)
const DEFAULTS = [
  ['joy', '😄', 'ดีใจ', 'Joy', '😊', '🙂', '😀', '😃'], ['love', '😍', 'รักเลย', 'Love', '🥰'], ['laugh', '😂', 'ขำมาก', 'Laugh', '🤣'],
  ['surprise', '😮', 'ว้าว', 'Wow', '😲', '😯'], ['sad', '😢', 'เศร้า', 'Sad', '😭'], ['angry', '😠', 'โกรธ', 'Cross', '😡'],
  ['thumbs-up', '👍', 'เยี่ยม', 'Great'], ['heart', '💗', 'หัวใจ', 'Heart', '❤', '💖', '💕', '🧡', '💛', '💚', '💙', '💜'], ['clap', '👏', 'ปรบมือ', 'Clap'],
  ['thanks', '🙏', 'ขอบคุณ', 'Thank you'], ['celebrate', '🎉', 'เย้!', 'Hooray', '🥳', '🎊'], ['cozy', '☕', 'อบอุ่น', 'Cosy'],
  ['star', '⭐', 'ดาว', 'Star', '🌟'], ['rainbow', '🌈', 'สายรุ้ง', 'Rainbow'], ['sun', '☀', 'แดด', 'Sunny'],
  ['sleepy-moon', '🌙', 'ฝันดี', 'Sleepy', '😴'], ['partly-cloudy', '⛅', 'เมฆบ้าง', 'Cloudy', '🌤', '🌥'], ['rainy', '☔', 'ฝนตก', 'Rainy', '🌧', '🌦'],
  ['birthday-cake', '🎂', 'วันเกิด', 'Birthday'], ['gift', '🎁', 'ของขวัญ', 'Gift'], ['camera', '📷', 'กล้อง', 'Camera', '📸'],
  ['airplane', '✈', 'เครื่องบิน', 'Plane', '🛫'], ['suitcase', '🧳', 'กระเป๋า', 'Suitcase'], ['travel-map', '🗺', 'แผนที่', 'Map'],
  // the owner's second pack (Nov 2026): the two moods without a picture, the forecast's other skies, the older hearts
  ['excited', '🤩', 'ตื่นเต้น', 'Excited'], ['yummy', '😋', 'อร่อย', 'Yummy'], ['hug', '🤗', 'กอด', 'Hug'], ['kiss', '😘', 'จุ๊บ', 'Kiss', '😚'],
  ['cloudy', '☁', 'เมฆมาก', 'Overcast'], ['fog', '🌫', 'หมอก', 'Fog'], ['snowflake', '❄', 'หิมะ', 'Snow'], ['snowy', '🌨', 'หิมะตก', 'Snowing'],
  ['storm', '⛈', 'พายุฝน', 'Storm', '🌩'], ['balloon', '🎈', 'ลูกโป่ง', 'Balloon'],
  // the third pack (Nov 2026): Today's bag, the photo tags and the spending categories (five reuse the app's own pictures)
  ['passport-book', '📕', 'หนังสือเดินทาง', 'Passport'], ['passport', '🛂', 'พาสปอร์ตนักผจญภัย', 'Kids’ passport'], ['swimsuit', '🩱', 'ชุดว่ายน้ำ', 'Swimsuit', '👙', '🩳'],
  ['sunscreen', '🧴', 'ครีมกันแดด', 'Sunscreen'], ['jacket', '🧥', 'เสื้อกันหนาว', 'Jacket'], ['backpack', '🎒', 'เป้', 'Backpack'],
  ['stroller', '🛒', 'รถเข็น', 'Stroller'], ['cash', '💵', 'เงินสด', 'Cash', '💴', '💶', '💷', '💰'], ['card', '💳', 'บัตร', 'Card'],
  ['ticket', '🎟', 'ตั๋ว', 'Ticket', '🎫'], ['tshirt', '👕', 'เสื้อยืด', 'T-shirt'], ['apple', '🍎', 'แอปเปิล', 'Apple'], ['nappy', '🧷', 'ผ้าอ้อม', 'Nappy'],
  ['child', '🧒', 'เด็กๆ', 'Child', '👦', '👧'], ['family', '👨‍👩‍👧‍👦', 'ครอบครัว', 'Family', '👪'], ['icecream', '🍦', 'ไอติม', 'Ice cream', '🍨'],
  ['koala', '🐨', 'โคอาล่า', 'Koala'], ['tree', '🌳', 'ต้นไม้', 'Tree', '🌲'], ['beach', '🏖', 'ชายหาด', 'Beach', '🏝'], ['splash', '💦', 'เล่นน้ำ', 'Splash'],
  ['slide', '🛝', 'สไลเดอร์', 'Slide'], ['rollercoaster', '🎢', 'รถไฟเหาะ', 'Rollercoaster'], ['taxi', '🚕', 'แท็กซี่', 'Taxi', '🚖'], ['receipt', '🧾', 'ใบเสร็จ', 'Receipt'],
  ['bus', '🚌', 'รถบัส', 'Bus', '🚍'], ['city', '🏙', 'เมือง', 'City'], ['sunrise', '🌄', 'วิว', 'View', '🌅'], ['museum', '🏛', 'พิพิธภัณฑ์', 'Museum'],
  ['palette', '🎨', 'ศิลปะ', 'Art'], ['shopping', '🛍', 'ช้อปปิ้ง', 'Shopping'], ['bed', '🛏', 'ที่พัก', 'Bed'], ['teddy', '🧸', 'ตุ๊กตาหมี', 'Teddy'],
  ['walking', '🚶', 'เดินเล่น', 'Walk', '👟'], ['selfie', '🤳', 'เซลฟี่', 'Selfie'], ['signpost', '🪧', 'ป้าย', 'Sign'], ['mouse', '🐭', 'หนู', 'Mouse'],
  ['noodles', '🍜', 'ก๋วยเตี๋ยว', 'Noodles']];
const FIRST_SET = 24;   // the families seeded before the second pack were offered DEFAULTS[0..23]
const MAX = 160;                                  // pictures in one family's library
const ID_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;
const keyOf = (id) => `e/${id}.png`;
const bare = (s) => String(s || '').replace(/️/g, '').trim();
// one emoji: a pictograph (with any skin tone / joiner parts), nothing else — a word or a letter is not an emoji
const isEmoji = (s) => s.length > 0 && s.length <= 16 && /\p{Extended_Pictographic}/u.test(s) && !/[\p{L}\p{N}\s]/u.test(s.replace(/[‍\u{1F3FB}-\u{1F3FF}⃣]/gu, ''));
const name = (s) => String(s || '').replace(/[\u0000-\u001F<>]/g, '').trim().slice(0, 30);

// every boot: the bundled pictures this family has never been offered are added once (a new pack reaches families that
// already exist); one the parents deleted stays deleted — settings 'emoji_offered' remembers the ids offered so far
// (a family seeded before it existed was offered the first set)
async function seed(pool, family) {
  const kv = Object.fromEntries((await pool.query("SELECT key, value FROM settings WHERE key IN ('emoji_seeded', 'emoji_offered')")).rows.map((r) => [r.key, r.value]));
  let offered = [];
  try { offered = kv.emoji_offered ? JSON.parse(kv.emoji_offered) : kv.emoji_seeded ? DEFAULTS.slice(0, FIRST_SET).map((d) => d[0]) : []; } catch (_) { offered = []; }
  const fresh = DEFAULTS.map((d) => d[0]).filter((id) => !offered.includes(id));
  if (!fresh.length) return 0;
  const n = await putDefaults(pool, family, fresh);
  await pool.query("INSERT INTO settings (key, value) VALUES ('emoji_offered', $1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [JSON.stringify(DEFAULTS.map((d) => d[0]))]);
  await pool.query("INSERT INTO settings (key, value) VALUES ('emoji_seeded', $1) ON CONFLICT (key) DO NOTHING", [new Date().toISOString()]);
  return n;
}
// the bundled set (or just `only` of it), only what is missing (by id, or an emoji already drawn by one of the family's own)
async function putDefaults(pool, family, only = null) {
  let n = 0;
  for (const [i, [file, ch, th, en, ...alt]] of DEFAULTS.entries()) {
    if (only && !only.includes(file)) continue;
    n += (await pool.query('INSERT INTO emoji (family_id, id, ch, alt, name_th, name_en, file, pos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING',
      [family, file, ch, alt, th, en, file, i])).rowCount;
  }
  return n;
}
const rows = (q, family) => q("SELECT id, ch, alt, name_th, name_en, file, (storage_key IS NOT NULL) AS up, floor(extract(epoch FROM created_at))::bigint AS v FROM emoji WHERE family_id=$1 ORDER BY pos, created_at", [family]);
// as the app sees a row: where its picture is
const out = (e) => ({ id: e.id, ch: e.ch, alt: e.alt || [], th: e.name_th, en: e.name_en, src: e.up ? `/media/emoji/${e.id}.png?v=${e.v}` : `/art/emoji/${e.file}.webp` });

function routes(r, { q, pool, media, A, family }) {
  const bad = (res, code, status = 400) => res.status(status).json({ error: code });
  r.get('/api/b/emoji', A.requireUser, async (req, res, next) => { try { res.setHeader('Cache-Control', 'no-store'); res.json((await rows(q, family)).map(out)); } catch (e) { next(e); } });
  // an uploaded picture: anyone signed in (relatives see the hearts and quotes too); the url carries the version
  r.get('/media/emoji/:id.png', A.requireUser, async (req, res, next) => {
    try {
      const e = ID_RE.test(req.params.id) ? (await q('SELECT storage_key FROM emoji WHERE family_id=$1 AND id=$2', [family, req.params.id]))[0] : null;
      const buf = e && e.storage_key ? await media.get(e.storage_key) : null;
      if (!buf) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      res.type('image/png').send(buf);
    } catch (err) { next(err); }
  });
  // add or change one: ?ch=&th=&en=, the body is the picture (needed for a new one, optional when renaming)
  r.put('/api/b/emoji/:id', A.requireEditor, express.raw({ type: () => true, limit: '10mb' }), async (req, res, next) => {
    try {
      const id = req.params.id; if (!ID_RE.test(id)) return bad(res, 'id');
      const ch = bare(req.query.ch), th = name(req.query.th), en = name(req.query.en);
      if (!isEmoji(ch)) return bad(res, 'emoji');
      if (!th && !en) return bad(res, 'name');
      const was = (await q('SELECT id, storage_key FROM emoji WHERE family_id=$1 AND id=$2', [family, id]))[0];
      const pic = Buffer.isBuffer(req.body) && req.body.length ? req.body : null;
      if (!was && !pic) return bad(res, 'picture');
      const taken = (await q('SELECT id FROM emoji WHERE family_id=$1 AND (ch=$2 OR $2 = ANY(alt)) AND id<>$3', [family, ch, id]))[0];
      if (taken) return bad(res, 'taken', 409);
      if (!was && (await q('SELECT count(*)::int n FROM emoji WHERE family_id=$1', [family]))[0].n >= MAX) return bad(res, 'full', 409);
      let key = null;
      if (pic) {
        let png;
        try { png = await sharp(pic, { limitInputPixels: 40e6 }).rotate().resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer(); }   // re-encoded: no metadata survives
        catch (_) { return bad(res, 'picture'); }
        key = keyOf(id); await media.put(key, png, 'image/png');
      }
      if (was) {   // a rename, or a new picture for it (a plain UPDATE: the table's check runs on an INSERT's row even when it turns into an update)
        await q(`UPDATE emoji SET ch=$3, name_th=$4, name_en=$5${key ? ', storage_key=$6, file=NULL, created_at=now()' : ''} WHERE family_id=$1 AND id=$2`,
          key ? [family, id, ch, th, en, key] : [family, id, ch, th, en]);
      } else {
        await q('INSERT INTO emoji (family_id, id, ch, name_th, name_en, storage_key, pos) VALUES ($1,$2,$3,$4,$5,$6,(SELECT coalesce(max(pos),0)+1 FROM emoji WHERE family_id=$1))',
          [family, id, ch, th, en, key]);
      }
      const row = (await rows(q, family)).find((e) => e.id === id);
      res.json(out(row));
    } catch (e) { next(e); }
  });
  r.delete('/api/b/emoji/:id', A.requireEditor, async (req, res, next) => {
    try {
      if (!ID_RE.test(req.params.id)) return bad(res, 'id');
      const gone = (await q('DELETE FROM emoji WHERE family_id=$1 AND id=$2 RETURNING storage_key', [family, req.params.id]))[0];
      if (gone && gone.storage_key) await media.del(gone.storage_key).catch(() => {});
      res.json({ ok: true, deleted: !!gone });
    } catch (e) { next(e); }
  });
  // bring back the bundled pictures that were deleted (the family's own stay as they are)
  r.post('/api/b/emoji/defaults', A.requireEditor, async (req, res, next) => {
    try { res.json({ added: await putDefaults(pool, family) }); } catch (e) { next(e); }
  });
}

module.exports = { DEFAULTS, seed, routes, rows, out, keyOf, isEmoji, ID_RE };
