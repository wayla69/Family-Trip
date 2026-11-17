'use strict';
const { sendRanged } = require('./ranged');
/* A book's own short film (owner, Nov 2026: "คลิปสรุปทริป"): the trip in a minute or two, made on our server from what the book
   already holds — a title card, then day by day a card (the day's picture, its name, where we were), up to three of its photos (⭐
   first, then spread through the day) with a slow zoom, a few seconds of one of its clips with the kids' own voices, and an end card;
   a little music-box tune written here (no one else's music) under it, quieter while a clip speaks. Portrait 720×1280 H.264/AAC MP4
   that starts at once (faststart) and carries no metadata — what a phone, a share sheet or LINE plays as it is.
   The cards are the app's own page (#/reelcards/<trip>) photographed by the same headless Chromium that prints the PDF, so they wear
   the book's colours, font and pictures. One film at a time; the file is r/<trip>/<v>.mp4 in the family's storage, trips.reel names it
   (migration 0028), served signed-in and scoped like a photo (GET /media/reel/:trip). Nothing leaves our server. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const express = require('express');
const sharp = require('sharp');

const FFMPEG = process.env.FFMPEG || 'ffmpeg', FFPROBE = process.env.FFPROBE || 'ffprobe';
const W = 720, H = 1280, FPS = 25;
const D = { title: 3.2, day: 2.2, photo: 2.6, clip: 6, end: 3.2 };   // seconds a piece

function run(cmd, args, ms = 300e3) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    const timer = setTimeout(() => { p.kill('SIGKILL'); reject(new Error(cmd + ' timeout')); }, ms);
    p.stdout.on('data', (d) => { out = (out + d).slice(-4000); });
    p.stderr.on('data', (d) => { err = (err + d).slice(-2000); });
    p.on('error', (e) => { clearTimeout(timer); reject(e); });
    p.on('close', (code) => { clearTimeout(timer); code === 0 ? resolve(out) : reject(Object.assign(new Error(cmd + ' failed'), { detail: err })); });
  });
}
// a clip's length and whether it has sound
async function probe(file) {
  const out = await run(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type', '-of', 'json', file], 30e3);
  const j = JSON.parse(out || '{}');
  return { secs: Number((j.format || {}).duration) || 0, audio: (j.streams || []).some((s) => s.codec_type === 'audio') };
}

/* The tune: our own little music box over I–V–vi–IV in C, an arpeggio in eighths, a melody of chord tones an octave up, a soft bass
   note a bar, a touch of echo. Written sample by sample (mono, 32 kHz, 16-bit WAV). */
let tuneCycle = null;   // the 8-bar cycle, written once
function musicWav(secs) {
  // one 8-bar cycle (about 20 s) is written note by note once, then repeated: the tune repeats every 8 bars, and writing it all
  // would keep the server busy for seconds
  const sr = 32000, beat = 60 / 92, e8 = beat / 2, cyc = Math.round(8 * 8 * e8 * sr), tail = 2 * sr, n = cyc + tail;
  const buf = tuneCycle || (tuneCycle = tuneOf(sr, beat, e8, n));
  return wavOf(buf, secs, sr, cyc, tail);
}
function tuneOf(sr, beat, e8, n) {
  const buf = new Float32Array(n);
  const CH = [[60, 64, 67], [59, 62, 67], [57, 60, 64], [57, 60, 65]], ARP = [0, 1, 2, 1, 0, 1, 2, 1], MEL = [[2, 1, 0, 1], [0, 1, 2, 0], [1, 2, 1, 0], [2, 0, 1, 2]];
  const note = (t0, midi, amp, decay) => {
    const f = 440 * Math.pow(2, (midi - 69) / 12), a = Math.floor(t0 * sr), len = Math.min(n - a, Math.floor(2 * sr));
    for (let k = 0; k < len; k++) {
      const t = k / sr, env = (t < 0.004 ? t / 0.004 : 1) * Math.exp(-t * decay), w = 2 * Math.PI * f * t;
      buf[a + k] += amp * env * (Math.sin(w) + 0.35 * Math.sin(2 * w) * Math.exp(-t * 6) + 0.12 * Math.sin(3 * w) * Math.exp(-t * 9));
    }
  };
  for (let bar = 0, t = 0; bar < 8; bar++, t += 8 * e8) {
    const c = CH[bar % 4], m = MEL[bar % 4];
    note(t, c[0] - 12, 0.22, 1.2);
    for (let k = 0; k < 8; k++) note(t + k * e8, c[ARP[k]], 0.13, 3.4);
    for (let k = 0; k < 4; k++) if (!(bar % 8 === 7 && k === 3)) note(t + k * beat + (k % 2 ? e8 : 0), c[m[k]] + 12, 0.2, 2.6);
  }
  return buf;
}
function wavOf(buf, secs, sr, cyc, tail) {
  const total = Math.ceil(secs * sr), lead = Math.floor(0.4 * sr), song = new Float32Array(total);
  for (let k = lead; k < total; k++) { const j = (k - lead) % cyc; song[k] = buf[j] + (k - lead >= cyc && j < tail ? buf[cyc + j] : 0); }   // the cycle again, its last notes ringing into the next
  const dl = Math.floor(0.19 * sr); for (let k = dl; k < total; k++) song[k] += 0.22 * song[k - dl];
  let peak = 0; for (let k = 0; k < total; k++) peak = Math.max(peak, Math.abs(song[k]));
  const N = total, out = Buffer.alloc(44 + N * 2), g = peak ? 0.8 / peak : 1;
  out.write('RIFF', 0); out.writeUInt32LE(36 + N * 2, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
  out.writeUInt32LE(sr, 24); out.writeUInt32LE(sr * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(N * 2, 40);
  const pcm = new Int16Array(N); for (let k = 0; k < N; k++) pcm[k] = Math.max(-32767, Math.min(32767, Math.round(song[k] * g * 32767)));
  Buffer.from(pcm.buffer).copy(out, 44);   // little-endian on every machine we run on
  return out;
}

/* What goes in: rows = the book's media ({id, day, mime, highlight, at}). Per day (in order): up to three photos — ⭐ first, then
   spread evenly through the day, shown in the order they were taken — and one clip (a ⭐ one, else the first). Long books take two
   photos a day and at most eight clips, so the film stays near two minutes. A kid's drawing comes in only when starred. */
function plan(rows, nDays) {
  const isImg = (m) => /^image\//.test(m.mime || 'image/jpeg'), isVid = (m) => /^video\//.test(m.mime || '');
  const days = [];
  for (let d = 0; d < nDays; d++) {
    const ph = rows.filter((m) => m.day === d && isImg(m) && (!/^dr-/.test(m.id) || m.highlight)).sort((a, b) => a.at - b.at);
    const vids = rows.filter((m) => m.day === d && isVid(m)).sort((a, b) => (b.highlight - a.highlight) || (a.at - b.at));
    if (ph.length || vids.length) days.push({ day: d, ph, vids });
  }
  const k = days.length > 8 ? 2 : 3; let clips = 0;
  return days.map(({ day, ph, vids }) => {
    const pick = ph.filter((m) => m.highlight).slice(0, k), rest = ph.filter((m) => !pick.includes(m)), need = Math.min(k - pick.length, rest.length);
    for (let i = 0; i < need; i++) pick.push(rest[Math.floor((i + 0.5) * rest.length / need)]);   // spread through the day
    const clip = vids[0] && clips < 8 ? (clips++, vids[0]) : null;
    return { day, photos: pick.sort((a, b) => a.at - b.at).map((m) => m.id), clip: clip ? clip.id : null };
  }).filter((x) => x.photos.length || x.clip);
}

// a picture filling the portrait frame: the photo whole, over a blurred, dimmed copy of itself (2× for a smooth zoom)
async function frame(buf) {
  const bg = await sharp(buf).rotate().resize(W * 2, H * 2, { fit: 'cover' }).blur(28).modulate({ brightness: 0.82 }).jpeg().toBuffer();
  const fg = await sharp(buf).rotate().resize(W * 2 - 80, H * 2 - 160, { fit: 'inside' }).jpeg({ quality: 92 }).toBuffer();
  return sharp(bg).composite([{ input: fg, gravity: 'center' }]).jpeg({ quality: 90 }).toBuffer();
}
const ENC = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-ac', '2'];
// a still with a slow zoom (in, or out when `out`)
async function stillSeg(img, secs, file, out, zoom = 0.06) {
  const N = Math.round(secs * FPS), z = out ? `${1 + zoom}-${zoom}*on/${N}` : `1+${zoom}*on/${N}`;
  await run(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-framerate', String(FPS), '-t', String(secs), '-i', img, '-f', 'lavfi', '-t', String(secs), '-i', 'anullsrc=r=44100:cl=stereo',
    '-filter_complex', `[0:v]zoompan=z='${z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS},setsar=1,format=yuv420p,fade=t=in:st=0:d=0.3,fade=t=out:st=${(secs - 0.3).toFixed(2)}:d=0.3[v]`,
    '-map', '[v]', '-map', '1:a', ...ENC, '-t', String(secs), file]);
}
// a few seconds of a clip, whole in the frame over a blurred copy of itself, with its own sound
async function clipSeg(src, file) {
  const p = await probe(src), secs = Math.max(1, Math.min(D.clip, p.secs || D.clip));
  const v = `[0:v]split[a][b];[a]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=20:2,eq=brightness=-0.06[bg];[b]scale=${W}:${H}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=${FPS},setsar=1,format=yuv420p,fade=t=in:st=0:d=0.25,fade=t=out:st=${(secs - 0.3).toFixed(2)}:d=0.3[v]`;
  const a = p.audio ? `[0:a]aresample=44100,aformat=channel_layouts=stereo,afade=t=in:d=0.2,afade=t=out:st=${(secs - 0.3).toFixed(2)}:d=0.3[a]` : `[1:a]anull[a]`;
  await run(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-t', String(secs), '-i', src, ...(p.audio ? [] : ['-f', 'lavfi', '-t', String(secs), '-i', 'anullsrc=r=44100:cl=stereo']),
    '-filter_complex', `${v};${a}`, '-map', '[v]', '-map', '[a]', ...ENC, '-t', String(secs), file]);
  return { secs, voice: p.audio };
}

/* The whole film. cards: [title, day…, end] PNGs (2×); get(key) reads a stored file. → {mp4: Buffer, secs} */
async function make({ picks, cards, get, keyOf, step }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mbr-'));
  try {
    const segs = [], quiet = []; let t = 0, n = 0;
    const total = 2 + picks.reduce((s, d) => s + 1 + d.photos.length + (d.clip ? 1 : 0), 0);
    const add = (f, secs) => { segs.push(f); t += secs; step(++n / total); };
    const card = async (png, secs) => { const f = path.join(dir, `c${n}.png`); fs.writeFileSync(f, png); const o = path.join(dir, `s${n}.mp4`); await stillSeg(f, secs, o, false, 0.03); add(o, secs); };
    await card(cards[0], D.title);
    for (const [k, d] of picks.entries()) {
      await card(cards[k + 1], D.day);
      for (const [j, id] of d.photos.entries()) {
        const buf = await get(keyOf(id)); if (!buf) continue;
        const f = path.join(dir, `p${n}.jpg`); fs.writeFileSync(f, await frame(buf));
        const o = path.join(dir, `s${n}.mp4`); await stillSeg(f, D.photo, o, j % 2 === 1); add(o, D.photo);
      }
      if (d.clip) {
        const buf = await get(keyOf(d.clip)); if (buf) {
          const src = path.join(dir, `v${n}.mp4`); fs.writeFileSync(src, buf);
          const o = path.join(dir, `s${n}.mp4`), c = await clipSeg(src, o); if (c.voice) quiet.push([t, t + c.secs]); add(o, c.secs);
        }
      }
    }
    await card(cards[cards.length - 1], D.end);
    const list = path.join(dir, 'list.txt'); fs.writeFileSync(list, segs.map((f) => `file '${f}'`).join('\n'));
    const joined = path.join(dir, 'joined.mp4'); await run(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);
    const secs = (await probe(joined)).secs || t;
    const wav = path.join(dir, 'music.wav'); fs.writeFileSync(wav, musicWav(secs + 1));
    const duck = quiet.length ? quiet.map(([a, b]) => `between(t,${a.toFixed(2)},${b.toFixed(2)})`).join('+') : '0';
    const out = path.join(dir, 'reel.mp4');
    await run(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-i', joined, '-i', wav, '-filter_complex',
      `[1:a]aresample=44100,aformat=channel_layouts=stereo,volume='if(${duck},0.08,0.3)':eval=frame,afade=t=in:d=1,afade=t=out:st=${Math.max(0, secs - 2.5).toFixed(2)}:d=2.5[m];[0:a][m]amix=inputs=2:duration=first:normalize=0[a]`,
      '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-map_metadata', '-1', '-map_chapters', '-1', '-t', secs.toFixed(2), out]);
    return { mp4: fs.readFileSync(out), secs: Math.round(secs) };
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

/* The routes. cards(trip, lang, days) → [PNG…] (server/pdf.js, the app's own #/reelcards page) */
function create({ pool, media, A, family, cards }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows;
  const key = (tid, v) => `r/${tid}/${v}.mp4`;
  let job = null;   // {trip, state: 'run'|'done'|'error', pct, step, err, at}
  const mediaKey = (rows) => (id) => { const m = rows.find((x) => x.id === id); return m && m.storage_key; };
  r.post('/api/b/reel/:trip', A.requireEditor, express.json({ limit: '4kb' }), async (req, res, next) => {
    try {
      if (job && job.state === 'run') return res.status(409).json({ error: 'busy', trip: job.trip });
      const mine = job = { trip: req.params.trip, state: 'run', pct: 0, step: 'cards', at: Date.now() };   // claimed before the first await
      const drop = (code, error) => { job = null; return res.status(code).json({ error }); };
      const t = (await q('SELECT id, reel, (SELECT count(*)::int FROM trip_days WHERE trip_id=t.id) AS days FROM trips t WHERE id=$1 AND family_id=$2', [req.params.trip, family]))[0];
      if (!t) return drop(404, 'trip');
      const rows = (await q('SELECT id, day_index, mime, highlight, taken_at, storage_key FROM media WHERE trip_id=$1 AND family_id=$2', [t.id, family]))
        .map((m) => ({ id: m.id, day: m.day_index, mime: m.mime, highlight: !!m.highlight, at: m.taken_at ? new Date(m.taken_at).getTime() : 0, storage_key: m.storage_key }));
      const picks = plan(rows, t.days);
      if (picks.reduce((s, d) => s + d.photos.length, 0) < 3) return drop(400, 'few');
      const lang = req.body && req.body.lang === 'en' ? 'en' : 'th';
      res.status(202).json({ ok: true });
      try {
        const png = await cards(t.id, lang, picks.map((d) => d.day));
        if (!Array.isArray(png) || png.length !== picks.length + 2) throw new Error('cards');
        mine.step = 'film';
        const out = await make({ picks, cards: png, get: (k) => media.get(k), keyOf: mediaKey(rows), step: (p) => { mine.pct = Math.round(p * 95); } });
        const v = crypto.randomBytes(6).toString('hex');
        await media.put(key(t.id, v), out.mp4, 'video/mp4');
        const reel = { v, at: Date.now(), secs: out.secs, bytes: out.mp4.length, n: picks.reduce((s, d) => s + d.photos.length, 0), lang };
        await q('UPDATE trips SET reel=$2 WHERE id=$1 AND family_id=$3', [t.id, JSON.stringify(reel), family]);
        if (t.reel && t.reel.v) await media.del(key(t.id, t.reel.v)).catch(() => {});   // the film it replaces
        Object.assign(mine, { state: 'done', pct: 100, step: 'done', reel });
      } catch (e) { console.error('reel', e.message, e.detail || ''); Object.assign(mine, { state: 'error', err: e.message === 'cards' ? 'cards' : 'film' }); }
    } catch (e) { if (!res.headersSent) { job = null; next(e); } }
  });
  r.get('/api/b/reel', A.requireEditor, (req, res) => { res.setHeader('Cache-Control', 'no-store'); res.json({ job }); });
  r.delete('/api/b/reel/:trip', A.requireEditor, async (req, res, next) => {
    try {
      const t = (await q('SELECT id, reel FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, family]))[0];
      if (!t) return res.status(404).json({ error: 'trip' });
      if (t.reel && t.reel.v) await media.del(key(t.id, t.reel.v)).catch(() => {});
      await q('UPDATE trips SET reel=NULL WHERE id=$1 AND family_id=$2', [t.id, family]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // the film, to whoever may see the book (a relatives' group only its ticked books); byte ranges for Safari's <video>
  r.get('/media/reel/:trip', A.requireUser, async (req, res, next) => {
    try {
      if (!A.canSee(req.user, req.params.trip)) return res.sendStatus(404);
      const t = (await q('SELECT id, reel FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, family]))[0];
      if (!(t && t.reel && t.reel.v)) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      if (req.query.dl) res.setHeader('Content-Disposition', 'attachment; filename="trip.mp4"');
      await sendRanged(req, res, media, key(t.id, t.reel.v), 'video/mp4');
    } catch (e) { next(e); }
  });
  return { router: r, key };
}

module.exports = { create, plan, musicWav, make, D };
