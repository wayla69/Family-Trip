'use strict';
/* ===== Memory Bookshelf · a book from photos (docs/SNAP-BOOK.md) =====
   P0: read when and where a photo was taken, on the phone, from the original file — before shrink() re-encodes it and the
   EXIF is gone. The position never leaves this file: snapMeta hands it to whoever asked, the test page shows only yes/no.
   The reader is plain functions over bytes (test/infra.mjs runs them in Node on test/fixtures/snap). */

const SNAP_HEAD = 262144;   // the first 256 KB of a JPEG hold its EXIF (APP1 sits before the picture data)

// a TIFF block (the body of EXIF) → {at: 'YYYY-MM-DDTHH:MM:SS', tz: '+07:00', ll: [lat, lon]} (each null when absent)
function snapTiff(u8) {
  const out = { at: null, tz: null, ll: null };
  if (!u8 || u8.length < 8) return out;
  const le = u8[0] === 0x49 && u8[1] === 0x49, be = u8[0] === 0x4D && u8[1] === 0x4D;
  if (!le && !be) return out;
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength), n = u8.length;
  const u16 = (o) => (o + 2 <= n ? dv.getUint16(o, le) : 0), u32 = (o) => (o + 4 <= n ? dv.getUint32(o, le) : 0);
  if (u16(2) !== 42) return out;
  const SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
  const ifd = (off) => {   // tag → {type, count, at: where its value starts}
    const tags = {}; if (!off || off + 2 > n) return tags;
    const cnt = Math.min(u16(off), 400);
    for (let i = 0; i < cnt; i++) {
      const e = off + 2 + i * 12; if (e + 12 > n) break;
      const tag = u16(e), type = u16(e + 2), count = u32(e + 4), size = (SIZE[type] || 1) * count;
      tags[tag] = { type, count, at: size <= 4 ? e + 8 : u32(e + 8) };
    }
    return tags;
  };
  const ascii = (t) => { if (!t || t.type !== 2) return ''; let s = ''; for (let i = 0; i < t.count && t.at + i < n; i++) { const c = u8[t.at + i]; if (!c) break; s += String.fromCharCode(c); } return s.trim(); };
  const rats = (t) => { if (!t || (t.type !== 5 && t.type !== 10) || t.at + t.count * 8 > n) return null; const r = []; for (let i = 0; i < t.count; i++) { const a = u32(t.at + i * 8), b = u32(t.at + i * 8 + 4); r.push(b ? a / b : 0); } return r; };
  const ifd0 = ifd(u32(4)), ex = ifd0[0x8769] ? ifd(u32(ifd0[0x8769].at)) : {}, gps = ifd0[0x8825] ? ifd(u32(ifd0[0x8825].at)) : {};
  const when = ascii(ex[0x9003]) || ascii(ex[0x9004]) || ascii(ifd0[0x0132]);   // DateTimeOriginal, else Digitized, else the file's DateTime
  const m = /^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/.exec(when);
  if (m && m[1] !== '0000') out.at = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`;
  const off = ascii(ex[0x9011]) || ascii(ex[0x9010]); if (/^[+-]\d{2}:\d{2}$/.test(off)) out.tz = off;
  const dms = (r) => (r && r.length >= 3 ? r[0] + r[1] / 60 + r[2] / 3600 : null);
  let lat = dms(rats(gps[2])), lon = dms(rats(gps[4]));
  if (lat != null && lon != null && isFinite(lat) && isFinite(lon) && (lat || lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
    if (/^S/i.test(ascii(gps[1]))) lat = -lat;
    if (/^W/i.test(ascii(gps[3]))) lon = -lon;
    out.ll = [Math.round(lat * 1e5) / 1e5, Math.round(lon * 1e5) / 1e5];
  }
  return out;
}

// a JPEG's first bytes → its EXIF TIFF block, or null
function snapJpegTiff(u8) {
  if (u8.length < 4 || u8[0] !== 0xFF || u8[1] !== 0xD8) return null;
  let o = 2;
  while (o + 4 <= u8.length) {
    if (u8[o] !== 0xFF) return null;
    const mk = u8[o + 1]; if (mk === 0xFF) { o++; continue; }
    if (mk === 0xD9 || mk === 0xDA) return null;   // end of image / start of the picture data: no EXIF before it
    const len = (u8[o + 2] << 8) | u8[o + 3];
    if (mk === 0xE1 && u8[o + 4] === 0x45 && u8[o + 5] === 0x78 && u8[o + 6] === 0x69 && u8[o + 7] === 0x66 && u8[o + 8] === 0 && u8[o + 9] === 0) return u8.subarray(o + 10, Math.min(u8.length, o + 2 + len));
    o += 2 + len;
  }
  return null;
}

// the boxes inside a run of ISO-BMFF bytes → [{t, start, end}] (start = after the box header)
function snapBoxes(u8, from, to) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength), r = []; let o = from;
  while (o + 8 <= to) {
    let size = dv.getUint32(o), head = 8; const t = String.fromCharCode(u8[o + 4], u8[o + 5], u8[o + 6], u8[o + 7]);
    if (size === 1) { if (o + 16 > to) break; size = dv.getUint32(o + 8) * 4294967296 + dv.getUint32(o + 12); head = 16; } else if (size === 0) size = to - o;
    if (size < head || o + size > to) break;
    r.push({ t, start: o + head, end: o + size }); o += size;
  }
  return r;
}
// HEIC / HEIF / AVIF: the 'meta' box (its payload, version/flags first) names an item of type 'Exif'; 'iloc' says where its bytes are.
// → {ext: [[offset, length], …], idat: bool} — offsets in the file, or inside the payload of 'meta' when the item lives in its 'idat' —
//   or {why} when there is no Exif to read (said on the check page, so a phone's own layout can be told apart from a bug here)
function snapHeifExif(meta) {
  const dv = new DataView(meta.buffer, meta.byteOffset, meta.byteLength), n = meta.length;
  const u16 = (o) => (o + 2 <= n ? dv.getUint16(o) : 0), u32 = (o) => (o + 4 <= n ? dv.getUint32(o) : 0);
  const big = (o, size) => (size === 0 ? 0 : size === 2 ? u16(o) : size === 4 ? u32(o) : size === 8 ? u32(o) * 4294967296 + u32(o + 4) : 0);
  const type = (o) => String.fromCharCode(meta[o], meta[o + 1], meta[o + 2], meta[o + 3]);
  const kids = snapBoxes(meta, 4, n);   // 'meta' is a full box: 4 bytes of version/flags first
  const iinf = kids.find((b) => b.t === 'iinf'), iloc = kids.find((b) => b.t === 'iloc'), idat = kids.find((b) => b.t === 'idat');
  if (!iinf || !iloc) return { why: 'heif-noiinf' };
  let exifId = null;
  { const v = meta[iinf.start]; const first = iinf.start + 4 + (v === 0 ? 2 : 4);
    for (const e of snapBoxes(meta, first, iinf.end)) { if (e.t !== 'infe') continue;
      const ev = meta[e.start]; if (ev < 2) continue;
      const id = ev === 2 ? u16(e.start + 4) : u32(e.start + 4), tOff = e.start + 4 + (ev === 2 ? 2 : 4) + 2;
      if (tOff + 4 <= e.end && type(tOff) === 'Exif') { exifId = id; break; } } }
  if (exifId == null) return { why: 'heif-noexif' };
  const v = meta[iloc.start]; let o = iloc.start + 4;
  const offSize = meta[o] >> 4, lenSize = meta[o] & 15, baseSize = meta[o + 1] >> 4, idxSize = v === 1 || v === 2 ? meta[o + 1] & 15 : 0; o += 2;
  const count = v < 2 ? u16(o) : u32(o); o += v < 2 ? 2 : 4;
  for (let i = 0; i < count && o < iloc.end; i++) {
    const id = v < 2 ? u16(o) : u32(o); o += v < 2 ? 2 : 4;
    let method = 0; if (v === 1 || v === 2) { method = u16(o) & 15; o += 2; }
    o += 2;   // data_reference_index
    const base = big(o, baseSize); o += baseSize;
    const cnt = u16(o); o += 2;
    const ext = [];
    for (let k = 0; k < cnt; k++) { if (idxSize) o += idxSize; const eo = big(o, offSize); o += offSize; const el = big(o, lenSize); o += lenSize; ext.push([base + eo, el]); }
    if (id !== exifId) continue;
    if (!ext.length) return { why: 'heif-noext' };
    if (method === 0) return { ext, idat: false };
    if (method === 1 && idat) return { ext: ext.map(([a, l]) => [idat.start + a, l]), idat: true };   // inside the 'idat' box of 'meta'
    return { why: 'heif-method' + method };
  }
  return { why: 'heif-noloc' };
}
// an Exif item's bytes → the TIFF block: they start with the offset of the TIFF header (often 6, after "Exif\0\0"); a phone that
// leaves that out still has "II*\0" / "MM\0*" within the first bytes
function snapExifItem(ex) {
  const at = 4 + ((ex[0] << 24) | (ex[1] << 16) | (ex[2] << 8) | ex[3]);
  const tiffAt = (o) => o >= 0 && o + 4 <= ex.length && ((ex[o] === 0x49 && ex[o + 1] === 0x49 && ex[o + 2] === 42 && ex[o + 3] === 0) || (ex[o] === 0x4D && ex[o + 1] === 0x4D && ex[o + 2] === 0 && ex[o + 3] === 42));
  if (tiffAt(at)) return ex.subarray(at);
  for (let o = 0; o < Math.min(64, ex.length - 4); o++) if (tiffAt(o)) return ex.subarray(o);
  return null;
}

// a picked File → {at, tz, ll, src, kind, why}. `at` is the wall clock where the photo was taken; with no EXIF time the file's own
// time (in this phone's zone) stands in, marked src 'file'; `why` names what was missing (for the check page). Never throws.
async function snapMeta(file) {
  const fileAt = () => { if (!file.lastModified) return null; const d = new Date(file.lastModified), p = (x) => String(x).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
  const bytes = async (a, b) => new Uint8Array(await file.slice(a, b).arrayBuffer());
  let r = { at: null, tz: null, ll: null }, kind = '', why = '';
  try {
    const head = await bytes(0, SNAP_HEAD);
    if (head[0] === 0xFF && head[1] === 0xD8) { kind = 'jpeg'; const tf = snapJpegTiff(head); if (tf) r = snapTiff(tf); else why = 'jpeg-noexif'; }
    else if (head[0] === 0x89 && head[1] === 0x50) { kind = 'png'; why = 'png'; }
    else if (head.length > 12 && String.fromCharCode(head[4], head[5], head[6], head[7]) === 'ftyp') {
      kind = 'heif';
      // walk the top-level boxes by their headers: 'meta' usually follows 'ftyp', but a file may put the picture data ('mdat') first
      let o = 0, meta = null;
      for (let k = 0; k < 64 && o + 8 <= file.size; k++) {
        const h = o + 16 <= head.length ? head.subarray(o, o + 16) : await bytes(o, o + 16), hv = new DataView(h.buffer, h.byteOffset, h.byteLength);
        let size = hv.getUint32(0), hd = 8; const t = String.fromCharCode(h[4], h[5], h[6], h[7]);
        if (size === 1) { size = hv.getUint32(8) * 4294967296 + hv.getUint32(12); hd = 16; } else if (size === 0) size = file.size - o;
        if (size < hd) break;
        if (t === 'meta') { meta = { start: o + hd, end: Math.min(file.size, o + size) }; break; }
        o += size;
      }
      if (!meta) why = 'heif-nometa';
      else if (meta.end - meta.start > 8388608) why = 'heif-bigmeta';
      else {
        const mb = meta.end <= head.length ? head.subarray(meta.start, meta.end) : await bytes(meta.start, meta.end);
        const loc = snapHeifExif(mb);
        if (loc.why) why = loc.why;
        else {
          const total = loc.ext.reduce((s, x) => s + x[1], 0);
          if (total < 8 || total > 4194304) why = 'heif-size';
          else {
            const parts = []; for (const [a, l] of loc.ext) parts.push(loc.idat ? mb.subarray(a, a + l) : await bytes(a, a + l));
            const ex = new Uint8Array(total); let p = 0; for (const x of parts) { ex.set(x, p); p += x.length; }
            const tf = snapExifItem(ex); if (tf) r = snapTiff(tf); else why = 'heif-notiff';
          }
        }
      }
    } else why = 'other';
  } catch (_) { why = 'error'; }
  if (r.at) return { at: r.at, tz: r.tz, ll: r.ll, src: 'exif', kind, why: r.ll ? '' : 'nogps' };
  return { at: fileAt(), tz: null, ll: r.ll, src: 'file', kind, why: why || 'notime' };
}

// many files, a few at a time so a phone stays responsive; onEach(i, meta) as each one is read
async function snapRead(files, onEach, width) {
  const out = new Array(files.length); let next = 0;
  const lane = async () => { while (next < files.length) { const i = next++; out[i] = await snapMeta(files[i]); if (onEach) onEach(i, out[i]); } };
  await Promise.all(Array.from({ length: Math.min(width || 6, files.length) }, lane));
  return out;
}

/* ---------- P0: the device check page (#/snaptest, editors, not linked anywhere) ----------
   The owner picks photos on each phone; the page lists what the phone handed over. It shows "yes/no" for a position,
   never the numbers, and nothing is uploaded. */
const snapT = { runs: [], busy: false, geo: null };
// photos shared to the app from the gallery (manifest share_target → sw.js takeShare → cache 'mbs-share'): read once, then forgotten
async function snapTakeShared() {
  if (!('caches' in self)) return [];
  const c = await caches.open('mbs-share'), keys = await c.keys(), files = [];
  for (const k of keys) {
    const res = await c.match(k); if (!res) continue;
    files.push(new File([await res.blob()], decodeURIComponent(res.headers.get('x-name') || '') || 'shared', { type: res.headers.get('content-type') || '', lastModified: +res.headers.get('x-mod') || Date.now() }));
    await c.delete(k);
  }
  return files;
}
function snapRun(via, files) {
  const run = { via, files, rows: new Array(files.length).fill(null), ms: 0 }, t0 = performance.now();
  snapT.runs.push(run); snapT.busy = true; render();
  let last = 0;
  return snapRead(files, (i, m) => { run.rows[i] = m; const now = performance.now(); if (now - last > 250) { last = now; snapDraw(); } })
    .then(() => { run.ms = performance.now() - t0; snapT.busy = false; render(); });
}
const SNAP_PICKS = [
  ['photos', 'image/*', false, 'คลังรูป', 'Photo library'],
  ['files', '', false, 'ไฟล์', 'Files'],
  ['camera', 'image/*', true, 'ถ่ายด้วยกล้องตอนนี้', 'Take one now'],
];
const SNAP_SHARE = ['share', '', false, 'แชร์จากแกลเลอรี', 'Shared from the gallery'];
function snapDevice() {
  const ua = navigator.userAgent;
  const os = /Android ([\d.]+)/.exec(ua), ios = /OS (\d+)_(\d+)/.exec(ua), cr = /Chrome\/(\d+)/.exec(ua), sa = /Version\/([\d.]+).*Safari/.exec(ua), sm = /SamsungBrowser\/([\d.]+)/.exec(ua);
  const sys = snapT.plat ? snapT.plat : os ? 'Android ' + os[1] : ios ? (/iPad/.test(ua) || (navigator.maxTouchPoints > 1 && /Mac/.test(ua)) ? 'iPadOS ' : 'iOS ') + ios[1] + '.' + ios[2] : /Mac/.test(ua) ? (navigator.maxTouchPoints > 1 ? 'iPadOS (Mac UA)' : 'macOS') : /Windows/.test(ua) ? 'Windows' : 'Linux';
  const br = sm ? 'Samsung Internet ' + sm[1] : cr ? 'Chrome ' + cr[1] : sa ? 'Safari ' + sa[1] : 'browser';
  const app = matchMedia('(display-mode: standalone)').matches || navigator.standalone ? L(' · แอปบนหน้าจอโฮม', ' · Home-Screen app') : '';
  return `${sys} · ${br}${app}`;
}
function snapRunHtml(run) {
  const rs = run.rows, done = rs.filter(Boolean), n = rs.length;
  const cnt = (f) => done.filter(f).length;
  const exif = cnt((m) => m.src === 'exif'), off = cnt((m) => m.tz), gps = cnt((m) => m.ll), heif = run.files.filter((f) => /hei[cf]|avif/i.test(f.type + f.name)).length;
  const line = (th, en, v) => `<li><span>${L(th, en)}</span><b>${v}</b></li>`;
  const pct = (k) => (done.length ? Math.round(k * 100 / done.length) + '%' : '');
  const pick = SNAP_PICKS.concat([SNAP_SHARE]).find((p) => p[0] === run.via) || SNAP_PICKS[0];
  return `<section class="snaprun"><h2>${L(pick[3], pick[4])} · ${L(`${n} รูป`, `${n} photo${n === 1 ? '' : 's'}`)}</h2>
${done.length < n ? `<p class="label">${L('กำลังอ่าน', 'Reading')} ${done.length}/${n}</p>` : `<p class="label">${L('อ่านเสร็จใน', 'Read in')} ${(run.ms / 1000).toFixed(1)} ${L('วินาที', 's')}</p>`}
<ul class="snapsum">${line('มีเวลาถ่ายในรูป', 'Time taken (EXIF)', `${exif} · ${pct(exif)}`)}${line('มีเขตเวลา', 'Time zone', `${off} · ${pct(off)}`)}${line('มีตำแหน่ง', 'Position', `${gps} · ${pct(gps)}`)}${line('ไฟล์ HEIC/HEIF', 'HEIC/HEIF files', heif)}</ul>
<div class="snapscroll"><table class="snapt"><thead><tr><th>#</th><th>${L('ชนิด', 'Type')}</th><th>${L('ขนาด', 'Size')}</th><th>${L('เวลาถ่าย', 'Taken')}</th><th>${L('ตำแหน่ง', 'Position')}</th></tr></thead><tbody>${run.files.map((f, i) => {
    const m = rs[i], ty0 = (f.type || '?').replace('image/', ''), ty = esc(ty0) + (m && m.kind && m.kind !== ty0 ? ` <small>${m.kind}</small>` : '');
    return `<tr><td>${i + 1}</td><td>${ty}</td><td>${f.size < 1048576 ? Math.max(1, Math.round(f.size / 1024)) + ' KB' : (f.size / 1048576).toFixed(1) + ' MB'}</td><td>${!m ? '…' : m.at ? `${esc(m.at.replace('T', ' '))}${m.tz ? ` <small>${esc(m.tz)}</small>` : ''}${m.src === 'file' ? ` <small>${L('(เวลาไฟล์', '(file time')}${m.why ? ' · ' + esc(m.why) : ''})</small>` : ''}` : '—'}</td><td>${!m ? '…' : m.ll ? L('มี ✓', 'yes ✓') : L('ไม่มี', 'no')}</td></tr>`;
  }).join('')}</tbody></table></div></section>`;
}
function snapText() {   // what the owner pastes back: the device and the counts per picker — never a position, never a file name
  const lines = [snapDevice()];
  for (const run of snapT.runs) {
    const done = run.rows.filter(Boolean), c = (f) => done.filter(f).length;
    lines.push(`${run.via}: ${run.files.length} · exif ${c((m) => m.src === 'exif')} · tz ${c((m) => m.tz)} · gps ${c((m) => m.ll)} · types ${[...new Set(run.files.map((f) => f.type || '?'))].join(',')} · ${(run.ms / 1000).toFixed(1)}s`);
    const by = {}; run.files.forEach((f, i) => { const m = run.rows[i]; if (!m) return; const k = f.type || '?', b = by[k] || (by[k] = { n: 0, exif: 0, gps: 0, why: {} }); b.n++; if (m.src === 'exif') b.exif++; if (m.ll) b.gps++; if (m.why) b.why[m.why] = (b.why[m.why] || 0) + 1; });
    for (const [k, b] of Object.entries(by)) lines.push(`  ${k} ${b.n}: exif ${b.exif} · gps ${b.gps}${Object.keys(b.why).length ? ' · ' + Object.entries(b.why).map(([w, n]) => `${w}×${n}`).join(' ') : ''}`);
  }
  if (snapT.geo) lines.push('live position: ' + snapT.geo);
  return lines.join('\n');
}
function viewSnapTest() {
  const shq = route().q.get('shared');
  if (shq !== null && !snapT.shareTaken) {   // arrived from the gallery's share sheet: read what it handed over, once
    snapT.shareTaken = true; history.replaceState(null, '', '#/snaptest');
    snapTakeShared().then((fs) => { if (fs.length) snapRun('share', fs); else { snapT.shareNone = true; render(); } }).catch(() => { snapT.shareNone = true; render(); });
  }
  // Chrome on Android always says "Android 10" in its user agent; the real version comes from the client hints, once
  if (!snapT.platAsked && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) { snapT.platAsked = true;
    navigator.userAgentData.getHighEntropyValues(['platformVersion']).then((h) => { const pf = navigator.userAgentData.platform; if (pf && h.platformVersion) { snapT.plat = `${pf} ${h.platformVersion}`; render(); } }).catch(() => {}); }
  return `<h1>${L('ทดสอบรูปบนเครื่องนี้', 'Photo check on this phone')}</h1>
<p class="notice">${L('หน้านี้ใช้ทดสอบเล่มจากรูป: ดูว่ามือถืออ่านเวลาถ่ายและตำแหน่งจากรูปได้หรือไม่ ไม่มีรูปถูกส่งไปไหน และไม่แสดงพิกัด แสดงแค่ว่ามีหรือไม่มี',
    'A check for the book-from-photos idea: does this phone hand over when and where each photo was taken? Nothing is uploaded and no position is shown — only whether there is one.')}</p>
<p class="label">${esc(snapDevice())}</p>
<p class="label">${L('อีกทาง: เปิดแกลเลอรี เลือกรูป กด "แชร์" แล้วเลือก LifeBook รูปจะมาที่หน้านี้ (ต้องเป็นแอปที่ติดตั้งบนหน้าจอโฮม)', 'Another way: in the gallery, pick photos, tap Share and choose LifeBook — they arrive on this page (the Home-Screen app only).')}</p>
${snapT.shareNone ? `<p class="notice">${L('การแชร์มาถึงแล้ว แต่ไม่มีรูปติดมา ลองติดตั้งแอปบนหน้าจอโฮมใหม่ แล้วแชร์อีกครั้ง', 'The share arrived without photos. Re-add the app to the Home Screen and share again.')}</p>` : ''}
<div class="snappicks">${SNAP_PICKS.map(([k, , , th, en]) => `<button type="button" class="btn${k === 'photos' ? '' : ' ghost'}" data-a="snappick" data-v="${k}"${snapT.busy ? ' disabled' : ''}>${L(th, en)}</button>`).join('')}
<button type="button" class="btn ghost" data-a="snapgeo">${L('ตำแหน่งตอนนี้', 'Position now')}</button></div>
${snapT.geo ? `<p class="label">${L('ตำแหน่งตอนนี้', 'Position now')}: ${esc(snapT.geo)}</p>` : ''}
<div id="snapruns">${snapT.runs.slice().reverse().map(snapRunHtml).join('')}</div>
${snapT.runs.length ? `<div class="row"><button type="button" class="btn" data-a="snapcopy">${L('คัดลอกผลไว้ส่งให้ผู้พัฒนา', 'Copy the results')}</button><button type="button" class="linkbtn" data-a="snapclear">${L('ล้าง', 'Clear')}</button></div>` : ''}`;
}
function snapDraw() { const el = document.getElementById('snapruns'); if (el) el.innerHTML = snapT.runs.slice().reverse().map(snapRunHtml).join(''); }
Object.assign(A, {
  snappick(b) {   // the inputs live outside #app (like #fpick): a background redraw while the phone's picker is open must not replace them
    const k = b.dataset.v, p = SNAP_PICKS.find((x) => x[0] === k); if (!p) return;
    let inp = document.getElementById('snapin-' + k);
    if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'snapin-' + k; inp.className = 'snapin'; inp.dataset.v = k; inp.multiple = true; inp.hidden = true;
      if (p[1]) inp.accept = p[1]; if (p[2]) inp.setAttribute('capture', 'environment'); document.body.append(inp); }
    inp.value = ''; inp.click();
  },
  snapgeo() {
    if (!navigator.geolocation) { snapT.geo = L('เครื่องนี้ไม่มี', 'not available'); render(); return; }
    snapT.geo = L('กำลังขอ…', 'asking…'); render();
    navigator.geolocation.getCurrentPosition((p) => { snapT.geo = L(`ได้ ✓ แม่นยำราว ${Math.round(p.coords.accuracy)} ม.`, `yes ✓ within about ${Math.round(p.coords.accuracy)} m`); render(); },
      (e) => { snapT.geo = (e.code === 1 ? L('ไม่อนุญาต', 'permission refused') : e.code === 3 ? L('หมดเวลา', 'timed out') : L('หาไม่ได้', 'unavailable')) + ` (${e.code})`; render(); },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 });
  },
  snapcopy() { const s = snapText(); (navigator.clipboard ? navigator.clipboard.writeText(s) : Promise.reject()).then(() => toast(L('คัดลอกแล้ว', 'Copied'))).catch(() => { prompt(L('คัดลอกข้อความนี้', 'Copy this'), s); }); },
  snapclear() { snapT.runs = []; snapT.geo = null; snapT.shareNone = false; render(); },
});
if (typeof document !== 'undefined') document.addEventListener('change', (e) => {
  if (e.target.id === 'snapin-book') { const fs = [...(e.target.files || [])]; if (fs.length) snapStartRead(fs); return; }
  if (!e.target.classList || !e.target.classList.contains('snapin')) return;
  const files = [...(e.target.files || [])]; if (!files.length) return;
  snapRun(e.target.dataset.v, files);
});

/* ---------- P1: a book from photos (docs/SNAP-BOOK.md J1; screens A2–B3 of the design canvas) ----------
   Pick the trip's photos → the phone reads each one's time and position (snapMeta) → a position becomes a place name from the
   library's cities (snapPlace) and is dropped on the spot → days and moments → "make the book": the trip and its days are created
   from the dates, then the photos go through the usual queue (addPhotos, with the time they were taken and their place). */

// a wall-clock time where a photo was taken ('YYYY-MM-DDTHH:MM:SS') → ms, using the photo's own zone offset, else the book's zone
function snapWallMs(at, off, zone) {
  if (!at) return null;
  if (off) { const v = Date.parse(at + off); if (!isNaN(v)) return v; }
  const guess = Date.parse(at + 'Z'); if (isNaN(guess)) return null;
  const offAt = (ms) => { try { const p = new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ms)).reduce((o, x) => ((o[x.type] = x.value), o), {});
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - ms; } catch (_) { return 0; } };
  const first = guess - offAt(guess); return guess - offAt(first);
}
let snapGeoP = null;
function snapGeo() { if (!snapGeoP) snapGeoP = api('GET', '/api/b/geo').catch(() => { snapGeoP = null; return { places: [], countries: [] }; }); return snapGeoP; }
const snapShort = (n) => ({ th: String(n.th || n.en || '').split(/\s+และ/)[0].trim(), en: String(n.en || n.th || '').split(/ and | & /)[0].trim() });
// a position → the nearest library city within reach (60 km at home in Thailand, 80 km abroad), or null — the position itself is not kept
function snapPlace(ll, geo) {
  if (!ll || !geo || !geo.places) return null;
  const rad = Math.PI / 180, dist = (a, b) => { const x = Math.sin((b[0] - a[0]) * rad / 2), y = Math.sin((b[1] - a[1]) * rad / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * y * y)); };
  let best = null;
  for (const p of geo.places) { const d = dist(ll, p.ll); if (d <= (p.home ? 60 : 80) && (!best || d < best.d)) best = { d, p }; }
  return best ? { id: best.p.id, tz: best.p.tz, cc: best.p.cc, ...snapShort(best.p.name) } : null;
}
/* Finer names (owner, Nov 2026: "บอกชื่อสถานที่จากตำแหน่งให้ละเอียดขึ้น"): besides the library's town (snapPlace), the nearest
   well-known spot or town from the country's list — public/geo/<cc>.json (GeoNames, CC BY 4.0, scripts/geo/build.mjs), downloaded
   once per country and read **on the phone**: nothing leaves it. With the family's switch on (ls('geoOnline'), off by default) our
   server asks OpenStreetMap instead, sent only a position rounded to about a kilometre (snapRound) — the privacy page says so. */
const snapGaz = {};   // cc → Promise of that country's list (or null)
function snapGazOf(cc) {
  if (!/^[a-z]{2}$/.test(cc || '')) return Promise.resolve(null);
  if (!snapGaz[cc]) snapGaz[cc] = fetch(`/geo/${cc}.json`, { credentials: 'same-origin' }).then((r) => (r.ok ? r.json() : null)).catch(() => { delete snapGaz[cc]; return null; });
  return snapGaz[cc];
}
const snapKm = (a, b) => { const rad = Math.PI / 180, x = Math.sin((b[0] - a[0]) * rad / 2), y = Math.sin((b[1] - a[1]) * rad / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * y * y)); };
// the spot whose reach the photo is deepest inside (a temple 600 m, an airport 3 km, a national park 12 km), else a town within 8 km
function snapNearest(ll, g) {
  if (!g || !Array.isArray(g.s)) return null;
  let best = null;
  for (const s of g.s) { const r = (g.r || {})[s[5]] || 0.5, d = snapKm(ll, [s[3], s[4]]); if (d <= r && (!best || d / r < best.q)) best = { q: d / r, x: s }; }
  if (!best) for (const t of g.t || []) { const d = snapKm(ll, [t[3], t[4]]); if (d <= 8 && (!best || d < best.q)) best = { q: d, x: t }; }
  return best ? { id: 'g' + best.x[0], en: best.x[1], th: best.x[2] || best.x[1] } : null;
}
const snapRound = (ll) => [Math.round(ll[0] * 100) / 100, Math.round(ll[1] * 100) / 100];   // about a kilometre: all that ever leaves the phone, and only with the switch on
async function snapSpot(ll, geo, city) {
  if (ls('geoOnline') && navigator.onLine !== false) {
    try { const r = await api('POST', '/api/b/geo/near', { ll: snapRound(ll) }); if (r && r.name && (r.name.th || r.name.en)) return { id: 'o' + (r.id || ''), th: r.name.th || r.name.en, en: r.name.en || r.name.th }; } catch (_) { /* the list on the phone answers instead */ }
  }
  // the country: the library town's, else the nearest library place's (a town away from every library town)
  const ccs = []; if (city && city.cc) ccs.push(city.cc);
  for (const p of ((geo && geo.places) || []).map((p) => ({ cc: p.cc, d: snapKm(ll, p.ll) })).sort((a, b) => a.d - b.d).slice(0, 4)) if (p.d < 900 && !ccs.includes(p.cc)) ccs.push(p.cc);
  for (const cc of ccs.slice(0, 2)) { const hit = snapNearest(ll, await snapGazOf(cc)); if (hit) return hit; }
  return null;
}
// a position → the library town (or, away from every library town, the nearest town of the country's list) + the spot, if one is
// named more finely; the position itself is not kept
async function snapWhere(ll, geo) {
  if (!ll) return null;
  const city = snapPlace(ll, geo), spot = await snapSpot(ll, geo, city).catch(() => null);
  if (!city) return spot ? { id: spot.id, th: spot.th, en: spot.en, tz: null } : null;
  if (spot && spot.en.toLowerCase() !== city.en.toLowerCase() && spot.th !== city.th) city.spot = spot;
  return city;
}
// the family's switch for the online lookup (this phone; off unless a parent turns it on)
const snapGeoSwitch = () => `<div class="snapgeosw"><button type="button" class="chip" data-a="snapgeoon" aria-pressed="${!!ls('geoOnline')}">${ls('geoOnline') ? '✓ ' : ''}${L('ชื่อสถานที่ละเอียดจากแผนที่ออนไลน์', 'Finer place names from an online map')}</button>
<small>${L('เปิดแล้ว: ส่งตำแหน่งแบบคร่าวๆ (ราวหนึ่งกิโลเมตร) ไปถาม OpenStreetMap ผ่านเซิร์ฟเวอร์ของเรา ไม่ส่งรูป ไม่เก็บไว้ ปิดอยู่: ใช้รายชื่อสถานที่ในเครื่อง', 'On: a rough position (about a kilometre) goes to OpenStreetMap through our server — no photo, nothing kept. Off: the list on this phone names it.')}</small></div>`;
const snapNameOf = (pl) => (pl ? pl.spot || pl : null);   // what a photo is labelled with: the spot, else the town
let snapS = null;   // the book being made from photos: {mode, name, files, metas, pl, typed, read, done, geo, urls}
const snapPart = (at) => { const h = +String(at || '').slice(11, 13); return h < 11 ? L('ช่วงเช้า', 'Morning') : h < 14 ? L('ตอนกลางวัน', 'Midday') : h < 17 ? L('ช่วงบ่าย', 'Afternoon') : h < 19 ? L('ตอนเย็น', 'Evening') : L('ตอนค่ำ', 'Night'); };
function snapStartRead(files) {
  const list = files.filter((f) => /^image\//.test(f.type) || /\.(heic|heif|jpe?g|png|webp|avif)$/i.test(f.name)).slice(0, 600);
  snapS = { mode: 'after', name: snapS ? snapS.name : '', files: list, metas: new Array(list.length).fill(null), pl: new Array(list.length).fill(null), typed: {}, read: 0, done: false, urls: {}, more: files.length > 600, aside: {}, keep: new Set(), star: new Set(), runPick: null };
  nav('#/snap/read');
  const naming = [];
  snapGeo().then((geo) => {
    snapS.geo = geo;
    let last = 0;
    return snapRead(list, (i, m) => {
      if (!snapS || snapS.files !== list) return;
      if (m.ll) naming.push(snapWhere(m.ll, geo).then((pl) => { if (snapS && snapS.files === list) snapS.pl[i] = pl; }, () => {}));
      snapS.metas[i] = { at: m.at, tz: m.tz, src: m.src, pos: !!m.ll };   // the position is named and dropped here
      m.ll = null; snapS.read++;
      const now = performance.now(); if (now - last > 200) { last = now; const el = document.getElementById('snapprog'); if (el) el.textContent = `${snapS.read}/${list.length}`; }
    });
  }).then(() => Promise.all(naming)).then(() => { if (!snapS || snapS.files !== list) return; snapS.sifting = true; render(); return snapSift(list); })
    .then(() => { if (!snapS || snapS.files !== list) return; snapS.sifting = false; snapS.done = true; render(); });
}
/* Best photos and the ones set aside (owner, Nov 2026: "เลือกรูปเด่นให้เอง" + "ตัดรูปซ้ำและรูปที่ไม่ใช่ทริป"), all on the phone: a few
   photos are decoded small (96 px) for how sharp, how bright and what they look like (a 64-bit difference hash). A burst — photos
   seconds apart — keeps its sharpest and sets aside the ones that look the same; a screenshot (a PNG or a file named so, with no
   camera time) is set aside; each day gets one star (two on a day of ten photos or more), the sharpest, well-lit photos of different
   moments. Nothing leaves the phone; the parents bring back or star any photo on the days page. */
const SNAP_SHOT_RE = /screen ?shot|screen[_-]?shot|screen[_-]?cap|capture|สกรีน|ภาพหน้าจอ/i;
async function snapLook(file) {
  try {
    let bmp; try { bmp = await createImageBitmap(file, { resizeWidth: 96, resizeQuality: 'low' }); } catch (_) { bmp = await createImageBitmap(file); }
    const w = 96, h = Math.max(8, Math.round(96 * bmp.height / bmp.width)), c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(bmp, 0, 0, w, h);
    const px = g.getImageData(0, 0, w, h).data, gr = new Float32Array(w * h); let sum = 0;
    for (let k = 0; k < w * h; k++) { gr[k] = 0.299 * px[k * 4] + 0.587 * px[k * 4 + 1] + 0.114 * px[k * 4 + 2]; sum += gr[k]; }
    let lv = 0, ln = 0, lm = 0; const lap = [];
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const k = y * w + x, v = 4 * gr[k] - gr[k - 1] - gr[k + 1] - gr[k - w] - gr[k + w]; lap.push(v); lm += v; ln++; }
    lm /= ln || 1; for (const v of lap) lv += (v - lm) * (v - lm);
    const hc = document.createElement('canvas'); hc.width = 9; hc.height = 8; const hg = hc.getContext('2d', { willReadFrequently: true }); hg.drawImage(bmp, 0, 0, 9, 8);
    const hp = hg.getImageData(0, 0, 9, 8).data; let hash = '';
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const a = (y * 9 + x) * 4, b = a + 4; hash += (hp[a] + hp[a + 1] + hp[a + 2] > hp[b] + hp[b + 1] + hp[b + 2]) ? '1' : '0'; }
    if (bmp.close) bmp.close();
    return { sharp: lv / (ln || 1), light: sum / (w * h), hash };
  } catch (_) { return null; }   // a file this browser cannot draw (HEIC on Chrome): kept, never starred by guess
}
const snapHam = (a, b) => { let n = 0; for (let k = 0; k < 64; k++) if (a[k] !== b[k]) n++; return n; };
async function snapSift(list) {
  const s = snapS; if (!s || s.files !== list) return;
  const t = (i) => Date.parse(s.metas[i].at + 'Z');
  list.forEach((f, i) => { const m = s.metas[i]; if (m && m.src !== 'exif' && (f.type === 'image/png' || SNAP_SHOT_RE.test(f.name || ''))) s.aside[i] = 'shot'; });
  const looks = {}; let budget = 260;
  const look = async (i) => { if (!(i in looks) && budget-- > 0) looks[i] = await snapLook(list[i]); return looks[i]; };
  // bursts: camera-timed photos four seconds apart or less
  const timed = list.map((_, i) => i).filter((i) => s.metas[i] && s.metas[i].src === 'exif' && s.metas[i].at && !s.aside[i]).sort((a, b) => t(a) - t(b));
  const bursts = []; for (const i of timed) { const b = bursts[bursts.length - 1]; if (b && t(i) - t(b[b.length - 1]) <= 4000) b.push(i); else bursts.push([i]); }
  for (const b of bursts.filter((x) => x.length > 1)) {
    for (const i of b) await look(i);
    const ok = b.filter((i) => looks[i]); if (ok.length < 2) continue;
    const best = ok.reduce((a, i) => (looks[i].sharp > looks[a].sharp ? i : a), ok[0]);
    for (const i of ok) if (i !== best && snapHam(looks[i].hash, looks[best].hash) <= 12) s.aside[i] = 'dup';
  }
  // stars: per date, up to eight photos spread through the day, the sharpest well-lit ones of different moments
  const byDate = {}; for (const i of timed) if (!s.aside[i]) (byDate[s.metas[i].at.slice(0, 10)] = byDate[s.metas[i].at.slice(0, 10)] || []).push(i);
  for (const ids of Object.values(byDate)) {
    const step = Math.max(1, Math.floor(ids.length / 8)), cand = ids.filter((_, k) => k % step === 0).slice(0, 8);
    for (const i of cand) await look(i);
    const score = (i) => (looks[i] ? looks[i].sharp * (looks[i].light < 45 || looks[i].light > 225 ? 0.35 : 1) : -1);
    const ranked = cand.filter((i) => looks[i]).sort((a, b) => score(b) - score(a)), want = ids.length >= 10 ? 2 : 1, got = [];
    for (const i of ranked) { if (got.length >= want) break; if (got.every((j) => Math.abs(t(i) - t(j)) > 20 * 6e4)) got.push(i); }
    got.forEach((i) => s.star.add(i));
  }
}
const snapIn = (s, i) => !s.aside[i] || s.keep.has(i);   // a photo set aside stays out until the parents bring it back
// the runs of dates in the picked photos (gaps under three days), in date order, each with how many photos it holds
function snapRuns() {
  const s = snapS, items = s.files.map((f, i) => ({ i, m: s.metas[i] })).filter((x) => x.m && x.m.at && snapIn(s, x.i));
  const dates = [...new Set(items.map((x) => x.m.at.slice(0, 10)))].sort();
  const runs = []; for (const d of dates) { const r = runs[runs.length - 1]; if (r && (Date.parse(d) - Date.parse(r[r.length - 1])) / 864e5 < 3) r.push(d); else runs.push([d]); }
  return runs.map((r) => ({ dates: r, n: items.filter((x) => r.includes(x.m.at.slice(0, 10))).length }));
}
// "looks like two trips" (owner, Nov 2026): a second run is a trip of its own when it holds five photos or more
const snapBigRuns = () => snapRuns().filter((r) => r.n >= 5);
// the trip in the picked photos: dates in a run with gaps under three days (the run that holds the most photos, or the one the parents
// picked, or every big run merged), its days and moments
function snapPlan(only) {
  const s = snapS, items = s.files.map((f, i) => ({ i, m: s.metas[i], pl: s.pl[i] })).filter((x) => x.m && x.m.at && snapIn(s, x.i));
  const runs = snapRuns(), big = runs.filter((r) => r.n >= 5), pick = only !== undefined ? only : s.runPick;
  const run = typeof pick === 'number' && runs[pick] ? runs[pick].dates : pick === 'all' ? big.flatMap((r) => r.dates)
    : (runs.slice().sort((a, b) => b.n - a.n)[0] || { dates: [] }).dates;
  const inRun = new Set(run), days = run.map((date) => {
    const ps = items.filter((x) => x.m.at.slice(0, 10) === date).sort((a, b) => (a.m.at < b.m.at ? -1 : 1));
    const t = (x) => Date.parse(x.m.at + 'Z');
    ps.forEach((x, k) => { if (x.pl) return; let near = null;   // a photo with no position takes the place of the nearest one in time (45 min)
      for (const y of ps) if (y.pl && Math.abs(t(y) - t(x)) <= 45 * 6e4 && (!near || Math.abs(t(y) - t(x)) < Math.abs(t(near) - t(x)))) near = y;
      x.near = near ? near.pl : null; void k; });
    const placeOf = (x) => x.pl || x.near || null;
    const keyOf = (p) => (p ? (p.spot ? p.spot.id : p.id) : '');   // a moment is a spot when one is named, else the town
    const moments = []; for (const x of ps) { const m = moments[moments.length - 1], p = placeOf(x);
      if (m && keyOf(p) === keyOf(m.place) && t(x) - m.last <= 90 * 6e4) { m.items.push(x); m.last = t(x); } else moments.push({ place: p, items: [x], first: x.m.at, last: t(x) }); }
    const tally = {}; for (const x of ps) { const p = placeOf(x); if (p) (tally[p.id] = tally[p.id] || { p, n: 0 }).n++; }
    const top = Object.values(tally).sort((a, b) => b.n - a.n).map((v) => v.p);
    return { date, items: ps, moments, top };
  });
  const out = items.filter((x) => !inRun.has(x.m.at.slice(0, 10))).length, none = s.files.filter((f, i) => !(s.metas[i] && s.metas[i].at)).length;
  return { days, out, none, span: run.length ? (Date.parse(run[run.length - 1]) - Date.parse(run[0])) / 864e5 : 0, pos: s.metas.filter((m) => m && m.pos).length,
    aside: Object.keys(s.aside).filter((i) => !s.keep.has(+i)).length, stars: [...s.star].filter((i) => snapIn(s, i)).length };
}
const snapDayPlace = (d) => { const typed = snapS.typed[d.date]; if (typed !== undefined) return typed.trim() ? { th: typed.trim(), en: typed.trim() } : null; return d.top[0] ? { th: d.top.slice(0, 3).map((p) => p.th).join(' · '), en: d.top.slice(0, 3).map((p) => p.en).join(' · ') } : null; };
function snapTitle(plan) {
  if (snapS.name.trim()) return { th: snapS.name.trim(), en: snapS.name.trim() };
  const n = plan.days.length, ids = [...new Set(plan.days.flatMap((d) => d.top.map((p) => p.id)))], all = plan.days.flatMap((d) => d.top);
  const typed = plan.days.map((d) => (snapS.typed[d.date] || '').trim()).filter(Boolean);
  const first = ids.length ? all.find((p) => p.id === ids[0]) : typed[0] ? { th: typed[0], en: typed[0] } : null;
  if (!first) { const d0 = plan.days[0] ? plan.days[0].date : ''; return { th: `ทริป ${d0 ? new Date(d0 + 'T00:00:00').toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : ''}`.trim(), en: `Trip ${d0 ? new Date(d0 + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}`.trim() }; }
  if (ids.length > 1) { const last = all.filter((p) => p.id === ids[ids.length - 1])[0]; return { th: `${first.th} ถึง ${last.th}`, en: `${first.en} to ${last.en}` }; }
  return n === 1 ? { th: `${first.th} วันเดียว`, en: `A day in ${first.en}` } : { th: `${first.th} ${n} วัน`, en: `${first.en}, ${n} days` };
}
function snapThumb(i) { if (!snapS.urls[i]) snapS.urls[i] = URL.createObjectURL(snapS.files[i]); return snapS.urls[i]; }
function snapForget() { if (snapS) Object.values(snapS.urls).forEach((u) => URL.revokeObjectURL(u)); snapS = null; }
const snapNote = (th, en) => `<p class="snapnote">${ic('lock')}<span>${L(th, en)}</span></p>`;

function viewSnap(p) {
  const step = p[1] || '';
  if (step && !snapS) { setTimeout(() => location.replace('#/snap'), 0); return ''; }   // the picked files live only in this page's memory
  if (!step) {
    const shq = route().q.get('shared');
    if (shq !== null) { history.replaceState(null, '', '#/snap'); snapTakeShared().then((fs) => { if (fs.length) snapStartRead(fs); else toast(L('การแชร์ไม่มีรูปติดมา', 'The share came without photos')); }).catch(() => {}); }
    const mode = (snapS && snapS.mode) || snapMode;
    return `<h1>${L('เล่มจากรูป', 'A book from photos')}</h1>
<p class="sub">${L('เลือกรูปของทริป แอปจัดวันและสถานที่ให้ แล้วค่อยแก้สิ่งที่ไม่ตรง', 'Pick the trip’s photos — the app sorts them into days and places, you fix what is off')}</p>
<div class="tpk snapmode" role="group" aria-label="${L('ทริปนี้', 'This trip')}">${[['after', L('กลับมาแล้ว', 'We’re back'), L('เลือกรูปทั้งทริปทีเดียว', 'Pick the whole trip’s photos at once')], ['live', L('กำลังเที่ยวอยู่', 'We’re on the trip'), L('เล่มเริ่มวันนี้ แล้วค่อยเติมทุกวัน', 'The book starts today, add to it each day')]]
    .map(([k, h, sm]) => `<button type="button" class="tpo" data-a="snapmode" data-v="${k}" aria-pressed="${mode === k}"><b>${h}</b><small>${sm}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>
<label class="flabel" for="snapname">${L('ชื่อเล่ม (ไม่ใส่ก็ได้ แอปตั้งให้)', 'Book name (optional — the app names it)')}</label>
<input id="snapname" class="field" type="text" maxlength="120" value="${esc(snapName)}" placeholder="${L('เช่น เขาใหญ่ปลายปี', 'e.g. Khao Yai at New Year')}">
${snapNote('แอปอ่านวันเวลาและตำแหน่งจากรูปบนเครื่องนี้ แล้วเก็บไว้แค่ชื่อเมือง ย่าน หรือที่เที่ยว ไม่เก็บพิกัด', 'The app reads when and where each photo was taken on this phone and keeps only the name of the town or place — never the position.')}
${snapGeoSwitch()}
<div class="snapfoot">${mode === 'live' ? `<button type="button" class="btn wide" data-a="snaplive">${L('เริ่มเล่มวันนี้', 'Start the book today')}</button>`
    : `<button type="button" class="btn wide" data-a="snappickbook">${L('เลือกรูปจากเครื่อง', 'Pick photos')}</button><small>${L('หรือเปิดแกลเลอรี เลือกรูป กดแชร์ แล้วเลือกแอปนี้', 'Or in the gallery: pick photos, Share, then this app')}</small>`}</div>`;
  }
  const s = snapS;
  if (step === 'read') {
    if (!s.done) return `<h1>${s.sifting ? L('กำลังเลือกรูปเด่น', 'Picking the best photos') : L('กำลังอ่านรูป', 'Reading the photos')}</h1><p class="snapbig"><b id="snapprog">${s.read}/${s.files.length}</b></p>${snapNote('ทั้งหมดนี้ทำบนเครื่องของคุณ รูปยังไม่ได้ส่งไปไหน', 'All of this happens on your phone — no photo has been sent anywhere.')}`;
    const plan = snapPlan(), n = s.files.length;
    if (!plan.days.length) return `<h1>${L('ไม่พบวันที่ในรูป', 'No dates in these photos')}</h1><p>${L('รูปที่เลือกไม่มีวันเวลาที่ถ่าย ลองเลือกรูปจากกล้องโดยตรง หรือเริ่มเป็นเล่มเปล่า', 'These photos carry no time taken. Pick photos straight from the camera, or start an empty book.')}</p><div class="snapfoot"><a class="btn wide" href="#/snap">${L('เลือกใหม่', 'Pick again')}</a></div>`;
    if (plan.span > 60) return `<h1>${L('รูปยาวเกิน 60 วัน', 'More than 60 days of photos')}</h1><p>${L('เลือกเฉพาะรูปของทริปเดียว', 'Pick one trip’s photos only')}</p><div class="snapfoot"><a class="btn wide" href="#/snap">${L('เลือกใหม่', 'Pick again')}</a></div>`;
    const few = plan.pos < Math.ceil(n * 0.3), d0 = plan.days[0].date, d1 = plan.days[plan.days.length - 1].date;
    const big = snapBigRuns(), rng = (r) => `${esc(fmtDay(r.dates[0], { day: 'numeric', month: 'short' }))}${r.dates.length > 1 ? ' – ' + esc(fmtDay(r.dates[r.dates.length - 1], { day: 'numeric', month: 'short' })) : ''}`;
    const allSpan = big.length ? (Date.parse(big[big.length - 1].dates.slice(-1)[0]) - Date.parse(big[0].dates[0])) / 864e5 : 0, runs = snapRuns();
    // "looks like two trips" (owner, Nov 2026): one of them, a book each, or all in one book (when they fit in 60 days)
    const twoTrips = big.length > 1 ? `<section class="snaptwo"><h3>${L(`ดูเหมือนรูปมาจาก ${big.length} ทริป`, `These look like ${big.length} trips`)}</h3>
<div class="tpk snapruns" role="group">${big.map((r) => { const k = runs.findIndex((x) => x.dates[0] === r.dates[0]); return `<button type="button" class="tpo" data-a="snaprun" data-v="${k}" aria-pressed="${s.runPick === k || (s.runPick === null && plan.days[0].date === r.dates[0])}"><b>${rng(r)}</b><small>${L(`เฉพาะทริปนี้ · ${r.n} รูป`, `Only this trip · ${r.n} photos`)}</small><span class="ck" aria-hidden="true">✓</span></button>`; }).join('')}
<button type="button" class="tpo" data-a="snaprun" data-v="both" aria-pressed="${s.runPick === 'both'}"><b>${L(`แยกเป็น ${big.length} เล่ม`, `${big.length} books, one a trip`)}</b><small>${L('แต่ละทริปได้เล่มของตัวเอง', 'Each trip gets its own book')}</small><span class="ck" aria-hidden="true">✓</span></button>
${allSpan <= 60 ? `<button type="button" class="tpo" data-a="snaprun" data-v="all" aria-pressed="${s.runPick === 'all'}"><b>${L('รวมเป็นเล่มเดียว', 'All in one book')}</b><small>${L('วันที่ห่างกันเว้นว่างไว้', 'The days between stay empty')}</small><span class="ck" aria-hidden="true">✓</span></button>` : ''}</div></section>` : '';
    return `<h1>${L(`อ่าน ${n} รูปแล้ว`, `${n} photos read`)}</h1>${twoTrips}
<ul class="snapsum">
<li><span>${L('วันที่', 'Dates')}</span><b>${esc(fmtDay(d0, { day: 'numeric', month: 'short' }))}${d0 !== d1 ? ' – ' + esc(fmtDay(d1, { day: 'numeric', month: 'short' })) : ''} · ${L(`${plan.days.length} วัน`, `${plan.days.length} day${plan.days.length === 1 ? '' : 's'}`)}</b></li>
<li><span>${L('รู้ว่าถ่ายที่ไหน', 'Know where')}</span><b>${plan.pos ? L(`${plan.pos} รูป`, `${plan.pos}`) : L('ยังไม่รู้', 'not yet')}</b></li>
${plan.out ? `<li><span>${L('รูปนอกช่วงทริป', 'Outside the trip')}</span><b>${L(`${plan.out} รูป ไม่ใส่ในเล่ม`, `${plan.out}, left out`)}</b></li>` : ''}
${plan.none ? `<li><span>${L('ไม่รู้วันที่ถ่าย', 'No date')}</span><b>${L(`${plan.none} รูป ไม่ใส่ในเล่ม`, `${plan.none}, left out`)}</b></li>` : ''}
${plan.aside ? `<li><span>${L('พักไว้ก่อน', 'Set aside')}</span><b>${L(`${plan.aside} รูป (ภาพซ้ำ ภาพหน้าจอ) เอากลับได้`, `${plan.aside} (repeats, screenshots) — bring back any`)}</b></li>` : ''}
${plan.stars ? `<li><span>${L('รูปเด่น ⭐', 'Best photos ⭐')}</span><b>${L(`เลือกให้ ${plan.stars} รูป เปลี่ยนได้`, `${plan.stars} picked — change any`)}</b></li>` : ''}
</ul>
${few ? `<p>${L('รูปส่วนใหญ่ไม่บอกตำแหน่ง (มือถือ Android ตัดออก) ขั้นต่อไปบอกสถานที่ของแต่ละวันได้เลย', 'Most photos don’t say where they were taken (Android takes it out) — the next step asks each day’s place.')}</p>` : ''}
${snapNote('ทั้งหมดนี้ทำบนเครื่องของคุณ รูปยังไม่ได้ส่งไปไหน', 'All of this happens on your phone — no photo has been sent anywhere.')}
<div class="snapfoot"><a class="btn wide" href="${few ? '#/snap/places' : '#/snap/days'}">${L('ต่อไป', 'Next')}</a></div>`;
  }
  const plan = snapPlan();
  const geoList = ((s.geo && s.geo.places) || []).filter((g) => g.home || !plan.days.some((d) => d.top.length)).map((g) => snapShort(g.name)[lang === 'en' ? 'en' : 'th']);
  const dl = `<datalist id="snapgeo">${[...new Set(geoList)].map((x) => `<option value="${esc(x)}">`).join('')}</datalist>`;
  const dayLine = (d, i) => `${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)} · ${esc(fmtDay(d.date))}`;
  const placeVal = (d) => { const v = s.typed[d.date]; if (v !== undefined) return v; const p = snapDayPlace(d); return p ? T(p) : ''; };
  if (step === 'places') {
    return `<h1>${L('แต่ละวันอยู่ที่ไหน', 'Where was each day?')}</h1>
<p class="sub">${L('พิมพ์ชื่อเมืองหรือที่เที่ยวสั้นๆ ไม่ใส่ก็ได้', 'A town or a place, short — or leave it')}</p>${dl}
<div class="snapplaces">${plan.days.map((d, i) => `<label class="snapplace"><span>${dayLine(d, i)} <small>${L(`${d.items.length} รูป`, `${d.items.length} photo${d.items.length === 1 ? '' : 's'}`)}</small></span>
<input class="field" type="text" maxlength="120" list="snapgeo" data-snapday="${d.date}" value="${esc(placeVal(d))}" placeholder="${L('เช่น เขาใหญ่', 'e.g. Khao Yai')}"></label>`).join('')}</div>
${plan.days.length > 1 ? `<button type="button" class="linkbtn" data-a="snapsame">${L('ใช้ชื่อวันแรกกับทุกวัน', 'Use the first day’s place for every day')}</button>` : ''}
<div class="snapfoot"><a class="btn wide" href="#/snap/days">${L('ต่อไป', 'Next')}</a><a class="linkbtn" href="#/snap/days">${L('ข้าม', 'Skip')}</a></div>`;
  }
  // B1 + B2: the days the app found, each opening to its moments; the parents fix a day's place, then make the book
  const title = snapTitle(plan);
  return `<h1>${L('วันที่จัดให้', 'Your days')}</h1>${dl}
<label class="flabel" for="snaptitle">${L('ชื่อเล่ม', 'Book name')}</label>
<input id="snaptitle" class="field" type="text" maxlength="120" value="${esc(s.name || T(title))}">
<div class="snapdays">${plan.days.map((d, i) => `<details class="snapday" data-fold="d${d.date}"${(s.folds ? s.folds.has('d' + d.date) : i === 0) ? ' open' : ''}><summary>
<span class="sdt"><b>${dayLine(d, i)}</b><small>${esc(placeVal(d) || L('ยังไม่ได้ใส่สถานที่', 'No place yet'))} · ${L(`${d.items.length} รูป`, `${d.items.length} photo${d.items.length === 1 ? '' : 's'}`)}</small></span>
<span class="sdph">${d.items.slice(0, 3).map((x) => `<img src="${snapThumb(x.i)}" alt="" loading="lazy">`).join('')}</span>${ic('chev', 'chv')}</summary>
<label class="snapplace"><span>${L('สถานที่ของวัน', 'The day’s place')}</span><input class="field" type="text" maxlength="120" list="snapgeo" data-snapday="${d.date}" value="${esc(placeVal(d))}"></label>
<ol class="snapmoms">${d.moments.map((m) => `<li><b>${snapPart(m.first)}${m.place ? ' · ' + esc(T(snapNameOf(m.place))) : ''}</b><small>${L(`${m.items.length} รูป`, `${m.items.length} photo${m.items.length === 1 ? '' : 's'}`)}</small>
<span class="sdph sdpick">${m.items.slice().sort((a, b) => (s.star.has(b.i) ? 1 : 0) - (s.star.has(a.i) ? 1 : 0)).slice(0, 6).map((x) => `<button type="button" class="sdpt${s.star.has(x.i) ? ' on' : ''}" data-a="snapstar" data-i="${x.i}" aria-pressed="${s.star.has(x.i)}" aria-label="${L('รูปเด่น', 'Best photo')}"><img src="${snapThumb(x.i)}" alt="" loading="lazy">${s.star.has(x.i) ? '<i>⭐</i>' : ''}</button>`).join('')}</span></li>`).join('')}</ol>
${snapAsideHtml(d.date)}</details>`).join('')}</div>
${plan.out + plan.none ? `<p class="label">${L(`${plan.out + plan.none} รูปไม่อยู่ในช่วงทริปหรือไม่รู้วันที่ ไม่ใส่ในเล่มนี้`, `${plan.out + plan.none} photos are outside the trip or have no date — left out of this book`)}</p>` : ''}
<div class="snapfoot"><button type="button" class="btn wide" data-a="snapmake"${s.making ? ' disabled' : ''}>${s.making ? L('กำลังสร้างเล่ม…', 'Making the book…') : L('สร้างเล่ม', 'Make the book')}</button>
<small>${L('รูปจะถูกย่อและส่งขึ้นเล่มทีละรูป ไม่ต้องรอ', 'The photos are made smaller and sent up one by one — no need to wait')}</small></div>`;
}
// the photos of a date set aside (repeats, screenshots): a tap brings one back into the book, a second sets it aside again
function snapAsideHtml(date) {
  const s = snapS, ids = Object.keys(s.aside).map(Number).filter((i) => s.metas[i] && String(s.metas[i].at || '').slice(0, 10) === date);
  if (!ids.length) return '';
  return `<details class="snapaside" data-fold="a${date}"${s.folds && s.folds.has('a' + date) ? ' open' : ''}><summary><span>${L(`พักไว้ ${ids.length} รูป`, `${ids.length} set aside`)}<small>${L('ภาพซ้ำและภาพหน้าจอ แตะรูปเพื่อเอากลับเข้าเล่ม', 'Repeats and screenshots — tap one to put it back')}</small></span>${ic('chev', 'chv')}</summary>
<span class="sdph sdpick">${ids.map((i) => `<button type="button" class="sdpt${s.keep.has(i) ? ' kept' : ' off'}" data-a="snapkeep" data-i="${i}" aria-pressed="${s.keep.has(i)}"><img src="${snapThumb(i)}" alt="" loading="lazy">${s.keep.has(i) ? '<i>✓</i>' : ''}</button>`).join('')}</span></details>`;
}
// which day and set-aside folds are open on the days page, so a redraw (a photo brought back) leaves them as they were
if (typeof document !== 'undefined') document.addEventListener('toggle', (e) => {
  const d = e.target; if (!snapS || !d.dataset || !d.dataset.fold) return;
  if (!snapS.folds) snapS.folds = new Set([...document.querySelectorAll('details[data-fold][open]')].map((x) => x.dataset.fold));
  if (d.open) snapS.folds.add(d.dataset.fold); else snapS.folds.delete(d.dataset.fold);
}, true);
let snapMode = 'after', snapName = '';
Object.assign(A, {
  snapmode(b) { snapMode = b.dataset.v; if (snapS) snapS.mode = snapMode; render(); },
  snappickbook() {   // outside #app, like #fpick: a background redraw while the gallery is open must not drop the pick
    let inp = document.getElementById('snapin-book');
    if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'snapin-book'; inp.multiple = true; inp.accept = 'image/*'; inp.hidden = true; document.body.append(inp); }
    inp.value = ''; inp.click();
  },
  snaprun(b) { if (!snapS) return; const v = b.dataset.v; snapS.runPick = v === 'both' || v === 'all' ? v : Number(v); render(); },
  snapstar(b) {   // in place: a redraw would close the day's fold under the finger
    if (!snapS) return; const i = +b.dataset.i, on = !snapS.star.has(i); if (on) snapS.star.add(i); else snapS.star.delete(i);
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); const badge = b.querySelector('i'); if (on && !badge) b.insertAdjacentHTML('beforeend', '<i>⭐</i>'); else if (!on && badge) badge.remove();
  },
  snapkeep(b) {   // the day's count changes: a redraw, with the folds that were open kept open (snapS.folds)
    if (!snapS) return; const i = +b.dataset.i; if (snapS.keep.has(i)) snapS.keep.delete(i); else snapS.keep.add(i); render();
  },
  snapsame() { const plan = snapPlan(), first = (document.querySelector('[data-snapday]') || {}).value || ''; plan.days.forEach((d) => { snapS.typed[d.date] = first; }); render(); },
  async snaplive() {
    const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Bangkok'; } catch (_) { return 'Asia/Bangkok'; } })();
    try {
      const r = await api('POST', '/api/b/snap', { open: true, timezone: tz, title: snapName.trim() ? { th: snapName.trim(), en: snapName.trim() } : undefined });
      snapName = ''; await load(); nav(`#/t/${encodeURIComponent(r.id)}/today`);
    } catch (e) { toast(e.code === 401 ? L('เข้าระบบใหม่ก่อน', 'Sign in again') : L('ต้องมีเน็ตเพื่อเริ่มเล่ม', 'You need a connection to start the book')); }
  },
  async snapmake() {
    if (!snapS || snapS.making) return;
    const s = snapS;
    if (s.runPick === 'both') {   // a book for each trip in the picked photos, in date order
      const runs = snapRuns(), picks = runs.map((r, k) => (r.n >= 5 ? k : -1)).filter((k) => k >= 0);
      s.making = true; render(); let last = null;
      for (const k of picks) { const id = await snapMakeOne(s, snapPlan(k), picks.length > 1); if (!id) { s.making = false; render(); return; } last = id; }
      snapForget(); snapName = '';
      toast(L(`สร้าง ${picks.length} เล่มแล้ว รูปกำลังส่งขึ้น`, `${picks.length} books made — the photos are on their way`));
      nav('#/'); return void last;
    }
    const plan = snapPlan(); if (!plan.days.length) return;
    s.making = true; render();
    const id = await snapMakeOne(s, plan, false); if (!id) { s.making = false; render(); return; }
    snapForget(); snapName = '';
    toast(L('สร้างเล่มแล้ว รูปกำลังส่งขึ้น', 'The book is made — the photos are on their way'));
    nav(`#/t/${encodeURIComponent(id)}/${S.features.story ? 'draft' : 'book'}`);
  },
});
// one book from one plan: the book, its check-ins, its photos with their time, place and star; the new book's id, or null
async function snapMakeOne(s, plan, several) {
  {
    const ids = [...new Set(plan.days.flatMap((d) => d.top.map((p) => p.id)))], tzs = plan.days.flatMap((d) => d.top.map((p) => p.tz)).filter(Boolean);
    const tz = tzs[0] || (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (_) { return 'Asia/Bangkok'; } })() || 'Asia/Bangkok';
    const typedTitle = (s.name || '').trim(), auto = snapTitle(plan), d0 = plan.days[0].date;
    const title = typedTitle ? (several ? { th: `${typedTitle} · ${fmtDay(d0, { day: 'numeric', month: 'short' })}`, en: `${typedTitle} · ${fmtDay(d0, { day: 'numeric', month: 'short' })}` } : { th: typedTitle, en: typedTitle }) : auto;
    let r;
    try { r = await api('POST', '/api/b/snap', { title, timezone: tz, places: ids, days: plan.days.map((d) => ({ date: d.date, place: snapDayPlace(d) })) }); }
    catch (e) { toast(L('ต้องมีเน็ตเพื่อสร้างเล่ม ลองอีกครั้ง', 'You need a connection to make the book — try again')); return null; }
    await load();
    const t = trip(r.id);
    if (!t) return null;
    for (const [i, d] of plan.days.entries()) {
      const typed = s.typed[d.date] !== undefined;   // a day the parents named: every photo of it takes that place
      for (const m of d.moments) {
        const pl = typed ? snapDayPlace(d) : snapNameOf(m.place), name = pl ? T(pl) : '';
        if (m.place && !typed) for (const p of [m.place, m.place.spot].filter(Boolean)) {   // the town and the spot are check-ins (the kids' map, the photo chips, the library's match read them)
          const key = 'snap.' + (p.id || T(p)), at0 = snapWallMs(m.first, null, tz) || Date.now();
          if (!S.places.some((x) => x.trip === t.id && x.key === key)) await enqueue({ method: 'PUT', url: '/api/b/places', body: { trip: t.id, key, day: i, kind: 'place', name: { th: p.th, en: p.en }, done: true, at: at0 },
            local: { coll: 'places', id: `${t.id}:${key}`, row: { trip: t.id, key, day: i, kind: 'place', name: { th: p.th, en: p.en }, at: at0 } } });
        }
        await addPhotos(t, i, m.items.map((x) => s.files[x.i]), name ? { place: name } : null, m.items.map((x) => (s.metas[x.i] ? { ...s.metas[x.i], star: s.star.has(x.i) } : null)));
      }
    }
    return t.id;
  }
}
/* ---------- P2: during the trip (docs/SNAP-BOOK.md J2; screen B4) ----------
   An open book from photos has a page of its own for the day: where we are now (a name only: the live position, asked on a tap,
   is named and dropped like a photo's), take or pick photos (a new date adds a day by itself), the kids' words and voices on the
   record page, today's photos, and "we're home" to close the book. */
const snapHereKey = (t) => 'snapHere_' + t.id;
function snapHere(t) { const h = ls(snapHereKey(t)); return h && h.date === todayIn(t.timezone) ? h : null; }   // where we are: kept for today only
let snapDayAsk = {};
// today's day of an open book: added when the page opens on a new date (after its last day), so the record page, the 21:30 nudge and the kids have it
// a book from photos is "live" (its Today page, the app opening on it) while it is open; a "go again" book (made from an earlier one
// for the next trip, theme.snap.again) also on its own dates — a book the family closed with "we're home" stays closed
const snapLive = (t) => !!t && t.kind === 'snap' && (!!t.open || (!!((t.theme || {}).snap || {}).again && dayNow(t) >= 0));
/* After the book is made (owner, Nov 2026: "แก้เล่มหลังสร้างแล้ว"): #/t/<id>/days — the book's name, then each day's name, place and
   picture, saved when a box is left (PATCH /api/b/trips, /api/b/days; the server then runs the library's match again, so a new place
   brings its picture, crest and town). A typed name is the book's in both languages: the family named it. */
function viewSnapEdit(t) {
  const field = (cls, data, val, ph, max, extra) => `<input class="field ${cls}" type="text" ${data} maxlength="${max}" value="${esc(val || '')}" placeholder="${esc(ph)}"${extra || ''}>`;
  return `<h1>${L('แก้เล่ม', 'Edit the book')}</h1>
<p class="sub">${L('แก้แล้วบันทึกเองเมื่อออกจากช่อง สถานที่ใหม่จะได้รูปจากคลังให้ด้วย', 'Saved when you leave a box — a new place brings its picture from the library')}</p>
<label class="flabel" for="sebook">${L('ชื่อเล่ม', 'Book name')}</label>
${field('sebook', `id="sebook" data-t="${esc(t.id)}"`, T(t.title), L('ชื่อเล่ม', 'Book name'), 120)}
<datalist id="snapgeo">${snapGeoNames()}</datalist>
<ol class="sedays">${t.days.map((d, i) => `<li class="seday"><div class="sehd">${artImg(t, i, 'seart')}<b>${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)}</b><small>${esc(fmtDay(d.date))} · ${L(`${mediaOf(t.id, i).length} รูป`, `${mediaOf(t.id, i).length} photos`)}</small></div>
<label class="flabel">${L('ชื่อวัน', 'Day name')}${field('sedt', `data-t="${esc(t.id)}" data-d="${i}" data-k="title"`, T(d.title), L(`วันที่ ${i + 1}`, `Day ${i + 1}`), 80)}</label>
<div class="serow"><label class="flabel grow">${L('สถานที่', 'Place')}${field('sedt', `data-t="${esc(t.id)}" data-d="${i}" data-k="place"`, d.place ? T(d.place) : '', L('เช่น เขาใหญ่', 'e.g. Khao Yai'), 120, ' list="snapgeo"')}</label>
<label class="flabel seemo">${L('อีโมจิ', 'Emoji')}${field('sedt', `data-t="${esc(t.id)}" data-d="${i}" data-k="emoji"`, d.emoji || '', '📷', 8)}</label></div></li>`).join('')}</ol>
<p class="label">${L('ย้ายรูปที่ลงผิดวัน: เปิดรูปนั้น แล้วเลือกวันที่ใต้รูป', 'A photo on the wrong day: open it and pick its day under the picture')}</p>`;
}
// a box on the edit page was left: save what changed (the book's name, or one day's name / place / emoji)
async function snapEditSave(el) {
  const t = trip(el.dataset.t); if (!t) return;
  const v = el.value.trim();
  try {
    if (el.id === 'sebook') { if (!v || v === T(t.title)) return; await api('PATCH', `/api/b/trips/${encodeURIComponent(t.id)}`, { title: { th: v, en: v } }); }
    else {
      const i = +el.dataset.d, d = t.days[i], k = el.dataset.k; if (!d) return;
      const was = k === 'title' ? T(d.title) : k === 'place' ? (d.place ? T(d.place) : '') : d.emoji || '';
      if (v === was || (k === 'title' && !v)) return;
      await api('PATCH', `/api/b/days/${encodeURIComponent(t.id)}/${i}`, { [k]: k === 'emoji' ? v : k === 'place' ? (v ? { th: v, en: v } : null) : { th: v, en: v } });
    }
    await load(); toast(L('บันทึกแล้ว', 'Saved')); safeRender();
  } catch (_) { toast(L('บันทึกไม่ได้ ต้องมีเน็ต', 'Could not save — you need a connection')); }
}
function snapEnsureToday(t) {
  const today = todayIn(t.timezone), last = t.days.length ? t.days[t.days.length - 1].date : '';
  if (!t.open || !isEditor() || t.days.some((d) => d.date === today) || today < last || snapDayAsk[t.id + today] || offline) return;
  snapDayAsk[t.id + today] = 1;
  api('POST', `/api/b/snap/${encodeURIComponent(t.id)}/days`, { days: [{ date: today }] }).then(() => load()).then(() => safeRender()).catch(() => { delete snapDayAsk[t.id + today]; });
}
function viewSnapLive(t) {
  snapEnsureToday(t);
  const today = todayIn(t.timezone), i = t.days.findIndex((d) => d.date === today), d = t.days[i];
  if (!snapLive(t)) { setTimeout(() => location.replace(`#/t/${encodeURIComponent(t.id)}/book`), 0); return ''; }
  const here = snapHere(t), ph = i >= 0 ? mediaOf(t.id, i) : [], words = i >= 0 ? entriesOf(t.id, i).filter((e) => e.kind === 'quote').length : 0, clips = i >= 0 ? audioOf(t.id, i).length : 0;
  const act = (k, icon, th, en, extra) => `<button type="button" class="snapact" data-a="${k}" data-t="${esc(t.id)}"${extra || ''}>${ic(icon)}<b>${L(th, en)}</b></button>`;
  const lnk = (href, icon, th, en, n) => `<a class="snapact" href="${href}">${ic(icon)}<b>${L(th, en)}</b>${n ? `<small>${n}</small>` : ''}</a>`;
  return `<h1 class="vh">${L('วันนี้', 'Today')}</h1>
<p class="snaplivehd"><b>${d ? `${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)} · ${esc(fmtDay(d.date))}` : esc(fmtDay(today))}</b></p>
<div class="snaphere"><span class="shl">${ic('pin')}</span><span class="sht"><small>${L('ตอนนี้อยู่แถว', 'Now around')}</small>
<input id="snaphere" class="field" type="text" maxlength="120" list="snapgeo" data-t="${esc(t.id)}" value="${esc(here ? T(snapNameOf(here)) : '')}" placeholder="${L('ชื่อเมืองหรือที่เที่ยว', 'A town or a place')}"></span>
<button type="button" class="mini snapgps" data-a="snaphere" data-t="${esc(t.id)}">${L('ใช้ตำแหน่งตอนนี้', 'Use where I am')}</button></div>
<datalist id="snapgeo">${snapGeoNames()}</datalist>
<div class="snapacts">
${act('snapcam', 'camera', 'ถ่ายรูป', 'Take a photo')}
${act('snapadd', 'image', 'เลือกรูป', 'Pick photos')}
${i >= 0 ? lnk(`#/t/${encodeURIComponent(t.id)}/log/${i}`, 'quote', 'คำพูดเด็ก', 'The kids’ words', words ? L(`วันนี้ ${words}`, `${words} today`) : '') : ''}
${i >= 0 ? lnk(`#/t/${encodeURIComponent(t.id)}/log/${i}`, 'mic', 'อัดเสียง', 'Record a voice', clips ? L(`วันนี้ ${clips}`, `${clips} today`) : '') : ''}
</div>
${snapNote('รูปที่ถ่ายผ่านปุ่มนี้รู้ว่าถ่ายที่ไหน แอปเก็บไว้แค่ชื่อสถานที่ ไม่เก็บพิกัด', 'A photo taken with this button knows where it was taken — the app keeps only the place’s name, never the position.')}
${snapGeoSwitch()}
<section class="blk"><h2>${ph.length ? L(`วันนี้ ${ph.length} รูป`, `Today, ${ph.length} photo${ph.length === 1 ? '' : 's'}`) : L('วันนี้', 'Today')}</h2>
${ph.length ? mosaicByPlace(t, ph) : `<p class="label">${L('รูปแรกของวันรออยู่', 'The day’s first photo is waiting')}</p>`}</section>
<div class="snapfoot"><button type="button" class="btn ghost wide" data-a="snapclose" data-t="${esc(t.id)}">${L('กลับถึงบ้านแล้ว ปิดเล่ม', 'We’re home — close the book')}</button>
<small>${L('ปิดแล้วยังเติมรูปและแก้เล่มได้เหมือนเดิม', 'You can still add photos and edit the book after')}</small></div>`;
}
let snapGeoCache = '';
function snapGeoNames() {
  if (!snapGeoCache) snapGeo().then((g) => { snapGeoCache = [...new Set((g.places || []).map((p) => snapShort(p.name)[lang === 'en' ? 'en' : 'th']))].map((x) => `<option value="${esc(x)}">`).join('') || ' '; const dl = document.getElementById('snapgeo'); if (dl) dl.innerHTML = snapGeoCache; });
  return snapGeoCache;
}
// the dates a closed book from photos may still take (snapMoreAdd): the book's own span, then outwards while each next date is
// under three days from the trip (the same rule that cut the trip out of the gallery, snapPlan), never past 60 days in all
function snapMoreDates(have, cand) {
  const dms = (d) => Date.parse(d + 'T00:00:00Z') / 864e5, hv = have.slice().sort(), ok = new Set(hv);
  let lo = dms(hv[0]), hi = dms(hv[hv.length - 1]);
  const cs = [...new Set(cand)].filter((d) => !ok.has(d)).sort();
  cs.forEach((d) => { const x = dms(d); if (x > lo && x < hi) ok.add(d); });
  for (const d of cs) { const x = dms(d); if (x > hi && x - hi < 3 && x - lo <= 60) { ok.add(d); hi = x; } }
  for (const d of cs.slice().reverse()) { const x = dms(d); if (x < lo && lo - x < 3 && hi - x <= 60) { ok.add(d); lo = x; } }
  return cs.filter((d) => ok.has(d));
}
// photos added to a book from photos. During the trip (live): each to the day it was taken (a new date after the last day adds
// that day), placed by its own position, else by "now around" when it was taken today. After the trip (owner, Nov 2026: "เพิ่มรูป
// ทีหลัง"): only photos whose date the camera wrote; a new date at either end or in a gap adds its day (once the book holds memories
// the server adds days after the last one only — day numbers live in the ids — so an earlier date is left out and said so);
// what has no day is left out, never piled on day 1
async function snapLiveAdd(t, files, live = true) {
  const geo = await snapGeo(), today = todayIn(t.timezone), here = live ? snapHere(t) : null;
  const metas = []; for (const f of files) { const m = await snapMeta(f).catch(() => null); const pl = m && m.ll ? await snapWhere(m.ll, geo).catch(() => null) : null; if (m) m.ll = null; metas.push({ m, pl }); }
  const dateOf = (x) => (x.m && x.m.src === 'exif' && x.m.at ? x.m.at.slice(0, 10) : live ? today : '');
  const last = t.days.length ? t.days[t.days.length - 1].date : '', tid = encodeURIComponent(t.id);
  const dates = metas.map(dateOf).filter(Boolean);
  const newer = snapMoreDates(t.days.map((d) => d.date), dates);   // the book's gaps and dates close to either end (the server lays the days out again, renumbering what they hold)
  if (newer.length) {
    try { await api('POST', `/api/b/snap/${tid}/days`, { days: newer.map((date) => ({ date })) }); }
    catch (e) {   // a book with memories takes new days after its last one only
      const after = newer.filter((d) => d > last);
      if (e && e.error === 'order' && after.length) await api('POST', `/api/b/snap/${tid}/days`, { days: after.map((date) => ({ date })) }).catch(() => {});
    }
    await load().catch(() => {}); t = trip(t.id);
  }
  const groups = {}; let out = 0;
  metas.forEach((x, k) => {
    const date = dateOf(x); let i = t.days.findIndex((d) => d.date === date);
    if (i < 0 && !live) { out++; return; }
    if (i < 0) i = date < t.days[0].date ? 0 : t.days.length - 1;   // during the trip a photo from before the book began goes on its first day
    const pl = x.pl || (date === today && here ? here : null), name = pl ? T(snapNameOf(pl)) : '';
    const key = i + '|' + name; (groups[key] = groups[key] || { i, pl, name, files: [], metas: [] }); groups[key].files.push(files[k]); groups[key].metas.push(x.m);
  });
  for (const g of Object.values(groups)) {
    for (const p of g.pl && g.pl.id ? [g.pl, g.pl.spot].filter(Boolean) : []) { const key = 'snap.' + p.id;
      if (!S.places.some((x) => x.trip === t.id && x.key === key)) await enqueue({ method: 'PUT', url: '/api/b/places', body: { trip: t.id, key, day: g.i, kind: 'place', name: { th: p.th, en: p.en }, done: true, at: Date.now() },
        local: { coll: 'places', id: `${t.id}:${key}`, row: { trip: t.id, key, day: g.i, kind: 'place', name: { th: p.th, en: p.en }, at: Date.now() } } }); }
    await addPhotos(t, g.i, g.files, g.name ? { place: g.name } : null, g.metas);
  }
  // a day with no place yet takes the first place its photos name: the server then finds its library picture, stamp and town
  const named = {}; for (const g of Object.values(groups)) if (g.pl && !named[g.i] && !(t.days[g.i] || {}).place) named[g.i] = g.pl;
  for (const [i, pl] of Object.entries(named)) await api('PATCH', `/api/b/days/${encodeURIComponent(t.id)}/${i}`, { place: { th: pl.th, en: pl.en } }).catch(() => {});
  if (Object.keys(named).length) await load().catch(() => {});
  if (!live) { const n = files.length - out;
    toast([n && L(`เติม ${n} รูปลงเล่มแล้ว`, `${n} photo${n > 1 ? 's' : ''} added`), out && L(`${out} รูปไม่รู้วันที่หรืออยู่นอกช่วงทริป ไม่ได้ใส่`, `${out} with no date or from outside the trip — left out`)].filter(Boolean).join(' · ')); }
  safeRender();
}
function snapLivePick(t, cam) {   // outside #app, like #fpick
  const id = cam ? 'snapin-cam' : 'snapin-live';
  let inp = document.getElementById(id);
  if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = id; inp.accept = 'image/*'; inp.hidden = true; if (cam) inp.setAttribute('capture', 'environment'); else inp.multiple = true; document.body.append(inp); }
  inp.dataset.t = t.id; inp.value = ''; inp.click();
}
function snapMorePick(t) {   // a closed book from photos: more photos from the gallery, each to the day it was taken
  let inp = document.getElementById('snapin-more');
  if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'snapin-more'; inp.accept = 'image/*'; inp.multiple = true; inp.hidden = true; document.body.append(inp); }
  inp.dataset.t = t.id; inp.value = ''; inp.click();
}
Object.assign(A, {
  snapcam(b) { const t = trip(b.dataset.t); if (t) snapLivePick(t, true); },
  snapadd(b) { const t = trip(b.dataset.t); if (t) snapLivePick(t, false); },
  snapmore(b) { const t = trip(b.dataset.t); if (t) snapMorePick(t); },
  snapgeoon() { ls('geoOnline', ls('geoOnline') ? null : 1); safeRender(); },
  snapagain(b) {   // "go here again": the first day of the next trip, then a new book with the same towns day by day
    const t = trip(b.dataset.t); if (!t) return;
    const next = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10), n = t.days.length;
    openSheet(`<h3>${L('ไปที่นี่อีกครั้ง', 'Go here again')}</h3>
<p class="lede">${L(`ได้เล่มใหม่ ${n} วัน เมืองเดิมทีละวัน พร้อมรูป พาสปอร์ต และแผนที่ของเด็กๆ ส่วนรูปและคำพูดของทริปนี้อยู่ที่เล่มนี้เหมือนเดิม`, `A new ${n}-day book: the same towns day by day, with its pictures, passports and the kids' map. This trip's photos and words stay in this book.`)}</p>
<label class="label" for="againfrom">${L('วันแรกของทริปหน้า', 'First day of the next trip')}</label>
<input id="againfrom" class="field" type="date" value="${next}">
<div class="row end" style="margin-top:12px"><button class="btn ghost" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="snapagaingo" data-t="${esc(t.id)}">${L('สร้างเล่มใหม่', 'Make the new book')}</button></div>`);
  },
  async snapagaingo(b) {
    const t = trip(b.dataset.t), from = ($('#againfrom') || {}).value;
    if (!t || !/^\d{4}-\d{2}-\d{2}$/.test(from || '')) { toast(L('เลือกวันแรกก่อน', 'Pick the first day')); return; }
    b.disabled = true;
    try { const r = await api('POST', `/api/b/snap/${encodeURIComponent(t.id)}/again`, { date_from: from }); await load(); closeSheet(); toast(L('ได้เล่มใหม่แล้ว', 'Your new book is ready')); nav(`#/t/${encodeURIComponent(r.id)}`); }
    catch (e) { b.disabled = false; toast(e && e.error === 'dates' ? L('วันนี้ใช้ไม่ได้ ลองวันอื่น', 'That date does not work — try another') : L('สร้างเล่มไม่ได้ ลองใหม่อีกครั้ง', 'Could not make the book — try again')); }
  },
  snaphere(b) {   // the live position → the nearest library town's name, kept for today; the position itself is not kept
    const t = trip(b.dataset.t); if (!t) return;
    if (!navigator.geolocation) { toast(L('เครื่องนี้หาตำแหน่งไม่ได้ พิมพ์ชื่อแทนได้', 'This phone has no location — type the place instead')); return; }
    b.disabled = true;
    navigator.geolocation.getCurrentPosition(async (p) => {
      const pl = await snapWhere([p.coords.latitude, p.coords.longitude], await snapGeo()).catch(() => null); b.disabled = false;
      if (!pl) { toast(L('ยังไม่รู้จักแถวนี้ พิมพ์ชื่อเองได้เลย', 'This place isn’t in the list yet — type its name')); const f = $('#snaphere'); if (f) f.focus(); return; }
      ls(snapHereKey(t), { th: pl.th, en: pl.en, id: pl.id, spot: pl.spot || null, date: todayIn(t.timezone) }); safeRender();
    }, () => { b.disabled = false; toast(L('ไม่ได้รับอนุญาตให้ใช้ตำแหน่ง พิมพ์ชื่อแทนได้', 'No permission for location — type the place instead')); }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 });
  },
  async snapclose(b) {
    if (!armed(b, L('แตะอีกครั้งเพื่อปิดเล่ม', 'Tap again to close the book'))) return;
    const t = trip(b.dataset.t); if (!t) return;
    try { await api('PATCH', `/api/b/trips/${encodeURIComponent(t.id)}`, { open: false }); await load(); toast(L('ปิดเล่มแล้ว ยินดีต้อนรับกลับบ้าน', 'Book closed — welcome home')); nav(`#/t/${encodeURIComponent(t.id)}/${S.features.story ? 'draft' : 'book'}`); }
    catch (_) { toast(L('ต้องมีเน็ตเพื่อปิดเล่ม', 'You need a connection to close the book')); }
  },
});
if (typeof document !== 'undefined') document.addEventListener('change', (e) => {
  if (e.target.id === 'snapin-cam' || e.target.id === 'snapin-live') { const t = trip(e.target.dataset.t), fs = [...(e.target.files || [])]; if (t && fs.length) snapLiveAdd(t, fs); return; }
  if (e.target.id === 'sebook' || (e.target.classList && e.target.classList.contains('sedt'))) { snapEditSave(e.target); return; }
  if (e.target.id === 'snapin-more') { const t = trip(e.target.dataset.t), fs = [...(e.target.files || [])]; if (t && fs.length) { toast(L(`กำลังอ่าน ${fs.length} รูป…`, `Reading ${fs.length} photos…`)); snapLiveAdd(t, fs, false); } return; }
  if (e.target.id === 'snaphere') { const t = trip(e.target.dataset.t), v = e.target.value.trim(); if (t) ls(snapHereKey(t), v ? { th: v, en: v, date: todayIn(t.timezone) } : null); }   // typed: a name, kept for today
});
/* ---------- P3: the helper drafts the book (docs/SNAP-BOOK.md D6; screens C1–C2) ----------
   #/t/<id>/draft: what to draft (the book's and the days' names, a summary a day, the foreword, a bedtime story a day), how many
   helper calls that takes, then the job's steps as they go (the job runs on the server: this page can be closed). */
const snapDraft = { opt: { names: true, sums: true, fore: true, stories: false }, job: null, err: '', timer: 0 };
const snapDraftCalls = (t, o) => (o.names ? 1 : 0) + (o.sums ? t.days.length : 0) + (o.fore ? 1 : 0) + (o.stories ? t.days.length : 0);
function snapDraftPoll() {
  clearTimeout(snapDraft.timer);
  api('GET', '/api/b/snap/draft').then(async (r) => {
    const was = snapDraft.job && snapDraft.job.status; snapDraft.job = r.job;
    if (r.job && r.job.status === 'running') snapDraft.timer = setTimeout(snapDraftPoll, 1500);
    else if (was === 'running') await load();   // the names and texts the helper wrote
    safeRender();
  }).catch(() => { snapDraft.timer = setTimeout(snapDraftPoll, 4000); });
}
function viewSnapDraft(t) {
  // a running job shows on any phone; a finished one only on the phone that started it (a later visit offers the parts again)
  const job = snapDraft.job && snapDraft.job.trip === t.id && (snapDraft.job.status === 'running' || snapDraft.mine === t.id) ? snapDraft.job : null, o = snapDraft.opt, n = snapDraftCalls(t, o);
  if (!S.features.story) return emptyCard(t, L('ผู้ช่วยยังไม่ได้เปิดใช้', 'The helper is not switched on'), L('เขียนชื่อวันและเรื่องราวเองได้ในหน้าบันทึกของแต่ละวัน', 'Name the days and write their stories on each day’s record page'), [`#/t/${encodeURIComponent(t.id)}/book`, L('ไปที่เล่ม', 'Go to the book')]);
  if (!job && !snapDraft.asked) { snapDraft.asked = true; snapDraftPoll(); }   // a job may already be running for this book
  const stepName = (s) => (s.k === 'names' ? L('ชื่อเล่มและชื่อของแต่ละวัน', 'The book’s and the days’ names') : s.k === 'fore' ? L('คำนำของเล่ม', 'The foreword')
    : s.k === 'sum' ? L(`สรุปวันที่ ${s.day + 1}`, `Day ${s.day + 1} in a few lines`) : L(`นิทานวันที่ ${s.day + 1}`, `Day ${s.day + 1}’s bedtime story`));
  const stepSt = (s) => ({ done: ['ok', '✓', L('เสร็จ', 'done')], kept: ['ok', '✓', L('มีอยู่แล้ว ไม่แตะ', 'already written, left alone')], skip: ['wait', '–', L('ยังไม่มีอะไรให้เล่า', 'nothing to go on yet')],
    now: ['now', '…', L('กำลังเขียน', 'writing')], error: ['err', '!', L('ไม่สำเร็จ', 'did not work')] }[s.st] || ['wait', '', L('รอคิว', 'waiting')]);
  if (job) {
    const running = job.status === 'running', doneN = job.steps.filter((s) => s.st !== 'wait' && s.st !== 'now').length;
    const why = job.error === 'limit' ? L('วันนี้ใช้ผู้ช่วยครบแล้ว ที่เขียนเสร็จเก็บไว้แล้ว พรุ่งนี้กดร่างต่อได้', 'The helper is used up for today — what is written is kept; carry on tomorrow')
      : job.error === 'refusal' ? L('ผู้ช่วยไม่เขียนส่วนนี้ ที่เขียนเสร็จเก็บไว้แล้ว', 'The helper would not write this part — what is written is kept') : job.error ? L('ร่างไม่สำเร็จ ที่เขียนเสร็จเก็บไว้แล้ว ลองอีกครั้งได้', 'The draft stopped — what is written is kept; try again') : '';
    return `<h1>${running ? L('ผู้ช่วยกำลังร่างเล่ม', 'The helper is drafting the book') : job.status === 'done' ? L('ร่างเสร็จแล้ว', 'The draft is ready') : L('หยุดร่างแล้ว', 'The draft stopped')}</h1>
${running ? `<p class="sub">${L(`เสร็จ ${doneN} จาก ${job.steps.length} · ปิดหน้านี้ได้ ผู้ช่วยเขียนต่อเอง`, `${doneN} of ${job.steps.length} done · you can leave this page, the helper carries on`)}</p>` : ''}
${why ? `<p class="notice">${why}</p>` : ''}
<ol class="snapsteps">${job.steps.map((s) => { const [c, m, w] = stepSt(s); return `<li class="${c}"><span class="ssi" aria-hidden="true">${m}</span><b>${stepName(s)}</b><small>${w}</small></li>`; }).join('')}</ol>
<div class="snapfoot">${running ? `<button type="button" class="btn ghost wide" data-a="snapdstop">${L('หยุดร่าง', 'Stop')}</button>`
    : `<a class="btn wide" href="#/t/${encodeURIComponent(t.id)}/book">${L('อ่านเล่ม', 'Read the book')}</a><small>${L('ทุกบรรทัดแก้ได้ ชื่อวันแก้ที่หน้าวันที่จัดให้ เรื่องของวันแก้ในหน้าบันทึก', 'Every line can be changed — a day’s story on its record page')}</small>`}</div>`;
  }
  const row = (k, th, en, sth, sen) => `<label class="snapopt"><span><b>${L(th, en)}</b>${sth ? `<small>${L(sth, sen)}</small>` : ''}</span><input type="checkbox" data-snapopt="${k}"${o[k] ? ' checked' : ''}></label>`;
  return `<h1>${L('ให้ผู้ช่วยร่างเล่ม', 'Let the helper draft the book')}</h1>
<p class="sub">${L('ผู้ช่วยเขียนร่างให้ทั้งเล่ม คุณแก้ได้ทุกบรรทัดก่อนพิมพ์', 'The helper drafts the whole book — you can change every line before printing')}</p>
<div class="snapopts">${row('names', 'ชื่อเล่ม และชื่อของแต่ละวัน', 'The book’s and the days’ names', 'วันที่คุณตั้งชื่อเองแล้วจะไม่ถูกเปลี่ยน', 'A day you named yourself keeps its name')}
${row('sums', 'สรุปวันละ 2–3 ประโยค', 'Each day in 2–3 sentences', 'จากสถานที่ เวลา และคำที่คุณจดไว้', 'From the places, times and your notes')}
${row('fore', 'คำนำของเล่ม', 'The foreword')}
${row('stories', 'นิทานก่อนนอนของแต่ละวัน', 'A bedtime story for each day', 'ให้เด็กฟังในโหมดเด็ก', 'For the children in kid mode')}</div>
${snapNote('ผู้ช่วยรู้แค่วัน เวลา ชื่อสถานที่ คำที่คุณจด และชื่อเล่นกับอายุของเด็ก ไม่เห็นรูป ไม่รู้พิกัด', 'The helper only gets the dates, times, place names, what you wrote, and the children’s names and ages — no photos, no positions.')}
${snapDraft.err ? `<p class="notice">${esc(snapDraft.err)}</p>` : ''}
<div class="snapfoot"><button type="button" class="btn wide" data-a="snapdraft" data-t="${esc(t.id)}"${n ? '' : ' disabled'}>${L('เริ่มร่าง', 'Start the draft')}</button>
<small>${n ? L(`ใช้ผู้ช่วย ${n} ครั้ง`, `${n} helper call${n === 1 ? '' : 's'}`) : L('เลือกอย่างน้อยหนึ่งอย่าง', 'Pick at least one')}</small>
<a class="linkbtn" href="#/t/${encodeURIComponent(t.id)}/book">${L('ข้าม เขียนเอง', 'Skip — I’ll write it')}</a></div>`;
}
Object.assign(A, {
  async snapdraft(b) {
    const t = trip(b.dataset.t); if (!t) return;
    b.disabled = true; snapDraft.err = '';
    try { snapDraft.job = await api('POST', `/api/b/snap/${encodeURIComponent(t.id)}/draft`, { ...snapDraft.opt, lang }); snapDraft.mine = t.id; snapDraftPoll(); }
    catch (e) {
      snapDraft.err = e.code === 429 ? L(`วันนี้ผู้ช่วยเหลือ ${(e.body && e.body.left) || 0} ครั้ง ต้องใช้ ${(e.body && e.body.need) || ''} ครั้ง ลองเลือกน้อยลง หรือพรุ่งนี้`, `The helper has ${(e.body && e.body.left) || 0} calls left today and this needs ${(e.body && e.body.need) || ''} — pick less, or try tomorrow`)
        : e.code === 409 ? L('ผู้ช่วยกำลังร่างอีกเล่มอยู่ รอสักครู่', 'The helper is drafting another book — wait a moment') : L('ต้องมีเน็ตเพื่อเริ่มร่าง', 'You need a connection to start');
      render();
    }
  },
  async snapdstop() { try { await api('DELETE', '/api/b/snap/draft'); } catch (_) { /* polls on */ } snapDraftPoll(); },
});
if (typeof document !== 'undefined') document.addEventListener('change', (e) => {
  if (e.target.dataset && e.target.dataset.snapopt) { snapDraft.opt[e.target.dataset.snapopt] = e.target.checked; const t = trip((route().parts || [])[1]), sm = document.querySelector('.snapfoot small'), go = document.querySelector('[data-a="snapdraft"]');
    if (t && sm && go) { const n = snapDraftCalls(t, snapDraft.opt); sm.textContent = n ? L(`ใช้ผู้ช่วย ${n} ครั้ง`, `${n} helper call${n === 1 ? '' : 's'}`) : L('เลือกอย่างน้อยหนึ่งอย่าง', 'Pick at least one'); go.disabled = !n; } }   // counted in place
});
if (typeof document !== 'undefined') document.addEventListener('input', (e) => {   // typed in place: no redraw under the finger
  if (e.target.id === 'snapname') { snapName = e.target.value; if (snapS) snapS.name = e.target.value; return; }
  if (e.target.id === 'snaptitle' && snapS) { snapS.name = e.target.value; return; }
  if (e.target.dataset && e.target.dataset.snapday && snapS) snapS.typed[e.target.dataset.snapday] = e.target.value;
});
