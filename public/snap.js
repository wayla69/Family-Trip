'use strict';
/* ===== Memory Bookshelf · a book from photos (docs/SNAP-BOOK.md) =====
   P0: read when and where a photo was taken, on the phone, from the original file — before shrink() re-encodes it and the
   EXIF is gone. The position never leaves this file: snapMeta hands it to whoever asked, the test page shows only yes/no.
   The reader is plain functions over bytes (test/infra.mjs runs them in Node on test/fixtures/snap). */

const SNAP_HEAD = 262144;   // the first 256 KB of a JPEG hold its EXIF (APP1 sits before the picture data)

// a TIFF block (the body of EXIF) → {at: 'YYYY-MM-DDTHH:MM:SS', tz: '+07:00', ll: [lat, lon]} (each null when absent)
function snapTiff(u8) {
  const out = { at: null, tz: null, ll: null, th: null };
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
  { const o0 = u32(4), c0 = o0 && o0 + 2 <= n ? u16(o0) : 0, i1 = c0 ? ifd(u32(o0 + 2 + c0 * 12)) : {};   // the camera's own small preview (about 160 px)
    const ta = i1[0x0201] ? u32(i1[0x0201].at) : 0, tl = i1[0x0202] ? u32(i1[0x0202].at) : 0; if (ta > 8 && tl > 100 && tl < 131072) out.th = [ta, tl]; }
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
    r.push({ t, start: o + head, end: o + size, at: o }); o += size;
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
/* The small preview inside a HEIC/HEIF/AVIF (owner, Nov 2026: "รูปจาก iPhone เร็วขึ้น"): the camera stores it as an item of its own,
   pointed at the main picture by an 'iref' 'thmb'. It is cut out with its own properties (the codec's setup, its size) and wrapped as
   a little file of one picture, which the browser decodes in a few ms instead of the whole 12 MP photo (Safari for HEIC; any browser
   for AVIF). → {type, ext: [[offset, length]…], idat, props: [{box, ess}]} or null */
function snapHeifThumb(meta) {
  const dv = new DataView(meta.buffer, meta.byteOffset, meta.byteLength), n = meta.length;
  const u16 = (o) => (o + 2 <= n ? dv.getUint16(o) : 0), u32 = (o) => (o + 4 <= n ? dv.getUint32(o) : 0);
  const type = (o) => String.fromCharCode(meta[o], meta[o + 1], meta[o + 2], meta[o + 3]);
  const kids = snapBoxes(meta, 4, n), get = (t) => kids.find((b) => b.t === t);
  const pitm = get('pitm'), iinf = get('iinf'), iloc = get('iloc'), iref = get('iref'), iprp = get('iprp'), idat = get('idat');
  if (!pitm || !iinf || !iloc || !iref || !iprp) return null;
  const primary = meta[pitm.start] === 0 ? u16(pitm.start + 4) : u32(pitm.start + 4);
  const types = {};
  { const v = meta[iinf.start];
    for (const e of snapBoxes(meta, iinf.start + 4 + (v === 0 ? 2 : 4), iinf.end)) { if (e.t !== 'infe') continue;
      const ev = meta[e.start]; if (ev < 2) continue;
      const id = ev === 2 ? u16(e.start + 4) : u32(e.start + 4), tOff = e.start + 4 + (ev === 2 ? 2 : 4) + 2; if (tOff + 4 <= e.end) types[id] = type(tOff); } }
  let thumb = null;
  { const sz = meta[iref.start] === 0 ? 2 : 4, rd = (o) => (sz === 2 ? u16(o) : u32(o));
    for (const b of snapBoxes(meta, iref.start + 4, iref.end)) { if (b.t !== 'thmb' || thumb != null) continue;
      let o = b.start; const from = rd(o); o += sz; const c = u16(o); o += 2;
      for (let k = 0; k < c && o + sz <= b.end; k++, o += sz) if (rd(o) === primary) { thumb = from; break; } } }
  if (thumb == null || !types[thumb] || types[thumb] === 'grid') return null;   // a tiled preview is not worth putting together
  // where its bytes are
  let loc = null;
  { const v = meta[iloc.start]; let o = iloc.start + 4;
    const big = (q, size) => (size === 0 ? 0 : size === 2 ? u16(q) : size === 4 ? u32(q) : size === 8 ? u32(q) * 4294967296 + u32(q + 4) : 0);
    const offSize = meta[o] >> 4, lenSize = meta[o] & 15, baseSize = meta[o + 1] >> 4, idxSize = v === 1 || v === 2 ? meta[o + 1] & 15 : 0; o += 2;
    const count = v < 2 ? u16(o) : u32(o); o += v < 2 ? 2 : 4;
    for (let i = 0; i < count && o < iloc.end; i++) {
      const id = v < 2 ? u16(o) : u32(o); o += v < 2 ? 2 : 4;
      let method = 0; if (v === 1 || v === 2) { method = u16(o) & 15; o += 2; }
      o += 2; const base = big(o, baseSize); o += baseSize; const cnt = u16(o); o += 2; const ext = [];
      for (let k = 0; k < cnt; k++) { if (idxSize) o += idxSize; const eo = big(o, offSize); o += offSize; const el = big(o, lenSize); o += lenSize; ext.push([base + eo, el]); }
      if (id === thumb) { loc = { method, ext }; break; }
    } }
  if (!loc || !loc.ext.length || (loc.method === 1 && !idat) || loc.method > 1) return null;
  // its properties: ipma names them (1-based) in ipco
  const ip = snapBoxes(meta, iprp.start, iprp.end), ipco = ip.find((b) => b.t === 'ipco'), ipma = ip.find((b) => b.t === 'ipma');
  if (!ipco || !ipma) return null;
  const all = snapBoxes(meta, ipco.start, ipco.end), props = [];
  { const v = meta[ipma.start], wide = meta[ipma.start + 3] & 1; let o = ipma.start + 4; const cnt = u32(o); o += 4;
    for (let i = 0; i < cnt && o < ipma.end; i++) {
      const id = v < 1 ? u16(o) : u32(o); o += v < 1 ? 2 : 4; const ac = meta[o]; o += 1;
      for (let k = 0; k < ac; k++) { const x = wide ? u16(o) : meta[o]; o += wide ? 2 : 1;
        if (id !== thumb) continue; const ess = wide ? !!(x & 0x8000) : !!(x & 0x80), idx = wide ? x & 0x7FFF : x & 0x7F, b = all[idx - 1];
        if (b) props.push({ box: meta.subarray(b.at, b.end), ess }); }
    } }
  if (!props.length || props.length > 120) return null;
  return { type: types[thumb], ext: loc.method === 1 ? loc.ext.map(([a, l]) => [idat.start + a, l]) : loc.ext, idat: loc.method === 1, props };
}
// one picture → a file of its own: the original ftyp, a meta of one item (hdlr, pitm, iloc, iinf, iprp) and its bytes in mdat
function snapHeifPack(ftyp, itype, props, data) {
  const enc = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0)), u16 = (x) => Uint8Array.of((x >> 8) & 255, x & 255), u32 = (x) => Uint8Array.of((x >>> 24) & 255, (x >> 16) & 255, (x >> 8) & 255, x & 255);
  const cat = (parts) => { const out = new Uint8Array(parts.reduce((s, x) => s + x.length, 0)); let o = 0; for (const x of parts) { out.set(x, o); o += x.length; } return out; };
  const box = (t, ...parts) => { const body = cat(parts); return cat([u32(body.length + 8), enc(t), body]); };
  const full = (t, v, ...parts) => box(t, Uint8Array.of(v, 0, 0, 0), ...parts);
  const iloc = (off) => full('iloc', 0, Uint8Array.of(0x44, 0x00), u16(1), u16(1), u16(0), u16(1), u32(off), u32(data.length));
  const rest = [full('hdlr', 0, u32(0), enc('pict'), new Uint8Array(12), Uint8Array.of(0)), full('pitm', 0, u16(1))];
  const tail = [full('iinf', 0, u16(1), full('infe', 2, u16(1), u16(0), enc(itype), Uint8Array.of(0))),
    box('iprp', box('ipco', ...props.map((p) => p.box)), full('ipma', 0, u32(1), u16(1), Uint8Array.of(props.length), Uint8Array.from(props.map((p, k) => (p.ess ? 128 : 0) | (k + 1)))))];
  const metaLen = full('meta', 0, ...rest, iloc(0), ...tail).length;   // the same length whatever the offset says
  return cat([ftyp, full('meta', 0, ...rest, iloc(ftyp.length + metaLen + 8), ...tail), box('mdat', data)]);
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
  let r = { at: null, tz: null, ll: null }, kind = '', why = '', heifTh = null;
  try {
    const head = await bytes(0, SNAP_HEAD);
    if (head[0] === 0xFF && head[1] === 0xD8) { kind = 'jpeg'; const tf = snapJpegTiff(head); if (tf) { r = snapTiff(tf); if (r.th) r.th = [tf.byteOffset - head.byteOffset + r.th[0], r.th[1]]; } else why = 'jpeg-noexif'; }
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
        try {   // the camera's small preview, wrapped as a file of its own (for the receipt gate)
          const th = snapHeifThumb(mb), tot = th ? th.ext.reduce((s, x) => s + x[1], 0) : 0;
          if (th && tot > 100 && tot < 524288) {
            const parts = []; for (const [a, l] of th.ext) parts.push(th.idat ? mb.subarray(a, a + l) : await bytes(a, a + l));
            const data = new Uint8Array(tot); let q = 0; for (const x of parts) { data.set(x, q); q += x.length; }
            const fsz = (head[0] << 24 | head[1] << 16 | head[2] << 8 | head[3]) >>> 0, brand = String.fromCharCode(head[8], head[9], head[10], head[11]);
            if (fsz >= 16 && fsz <= 256) heifTh = new Blob([snapHeifPack(head.slice(0, fsz), th.type, th.props, data)], { type: /^avi/.test(brand) ? 'image/avif' : 'image/heic' });
          }
        } catch (_) { heifTh = null; }
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
  if (r.at) return { at: r.at, tz: r.tz, ll: r.ll, th: r.th || heifTh || null, src: 'exif', kind, why: r.ll ? '' : 'nogps' };
  return { at: fileAt(), tz: null, ll: r.ll, th: r.th || heifTh || null, src: 'file', kind, why: why || 'notime' };
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
    .then(() => { run.ms = performance.now() - t0; render(); return devSpeed(run); })
    .then(() => { snapT.busy = false; render(); });
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
${((d) => (d ? `<ul class="snapsum devspeed">${line('รูปตัวอย่างในไฟล์', 'A preview inside the file', d.pv)}${line('ตรวจใบเสร็จต่อรูป', 'Receipt check a photo', `${d.avg} ms`)}${line('เครื่องนี้เปิดไม่ได้', 'This phone cannot open', String(d.bad))}${line('เจอใบเสร็จหรือเอกสาร', 'Receipts or papers found', String(d.doc))}</ul>` : ''))(devSpeedLine(run))}
<ul class="snapsum">${line('มีเวลาถ่ายในรูป', 'Time taken (EXIF)', `${exif} · ${pct(exif)}`)}${line('มีเขตเวลา', 'Time zone', `${off} · ${pct(off)}`)}${line('มีตำแหน่ง', 'Position', `${gps} · ${pct(gps)}`)}${line('ไฟล์ HEIC/HEIF', 'HEIC/HEIF files', heif)}</ul>
<div class="snapscroll"><table class="snapt"><thead><tr><th>#</th><th>${L('ชนิด', 'Type')}</th><th>${L('ขนาด', 'Size')}</th><th>${L('เวลาถ่าย', 'Taken')}</th><th>${L('ตำแหน่ง', 'Position')}</th></tr></thead><tbody>${run.files.map((f, i) => {
    const m = rs[i], ty0 = (f.type || '?').replace('image/', ''), ty = esc(ty0) + (m && m.kind && m.kind !== ty0 ? ` <small>${m.kind}</small>` : '');
    return `<tr><td>${i + 1}</td><td>${ty}</td><td>${f.size < 1048576 ? Math.max(1, Math.round(f.size / 1024)) + ' KB' : (f.size / 1048576).toFixed(1) + ' MB'}</td><td>${!m ? '…' : m.at ? `${esc(m.at.replace('T', ' '))}${m.tz ? ` <small>${esc(m.tz)}</small>` : ''}${m.src === 'file' ? ` <small>${L('(เวลาไฟล์', '(file time')}${m.why ? ' · ' + esc(m.why) : ''})</small>` : ''}` : '—'}</td><td>${!m ? '…' : m.ll ? L('มี ✓', 'yes ✓') : L('ไม่มี', 'no')}</td></tr>`;
  }).join('')}</tbody></table></div></section>`;
}
function snapText() {   // what the owner pastes back: the device and the counts per picker — never a position, never a file name
  const lines = [snapDevice()], hand = devHand();
  if (snapT.dev) for (const [lab, st, det] of snapT.dev.rows) lines.push(`${st === 'ok' ? '✓' : st === 'no' ? '✗' : st === 'warn' ? '!' : '—'} ${lab}${det ? ' · ' + det : ''}`);
  for (const [k, th, en] of DEV_HAND) if (hand[k]) lines.push(`${hand[k] === 'ok' ? '✓' : '✗'} ${L(th, en)}`);
  for (const run of snapT.runs) {
    const done = run.rows.filter(Boolean), c = (f) => done.filter(f).length;
    lines.push(`${run.via}: ${run.files.length} · exif ${c((m) => m.src === 'exif')} · tz ${c((m) => m.tz)} · gps ${c((m) => m.ll)} · types ${[...new Set(run.files.map((f) => f.type || '?'))].join(',')} · ${(run.ms / 1000).toFixed(1)}s`);
    const by = {}; run.files.forEach((f, i) => { const m = run.rows[i]; if (!m) return; const k = f.type || '?', b = by[k] || (by[k] = { n: 0, exif: 0, gps: 0, why: {} }); b.n++; if (m.src === 'exif') b.exif++; if (m.ll) b.gps++; if (m.why) b.why[m.why] = (b.why[m.why] || 0) + 1; });
    for (const [k, b] of Object.entries(by)) lines.push(`  ${k} ${b.n}: exif ${b.exif} · gps ${b.gps}${Object.keys(b.why).length ? ' · ' + Object.entries(b.why).map(([w, n]) => `${w}×${n}`).join(' ') : ''}`);
    const d = devSpeedLine(run); if (d) lines.push(`  preview ${d.pv} · gate ${d.avg} ms · cannot open ${d.bad} · papers ${d.doc}`);
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
  return `${pageHead('checkphone', PG.teal, L('ตั้งค่า', 'Settings'), L('ตรวจเครื่องนี้', 'Check this phone'), L('กดตรวจ แล้วลองทำตามรายการด้านล่าง เสร็จแล้วกด "คัดลอกผล" ส่งให้ผู้พัฒนา ไม่มีรูปหรือตำแหน่งออกจากเครื่อง', 'Run the check, try the list below, then "copy the results" and send them to the developer — no photo or position leaves the phone'))}
<button type="button" class="btn wide" data-a="devcheck"${snapT.devBusy ? ' disabled' : ''}>${snapT.devBusy ? L('กำลังตรวจ…', 'Checking…') : L('ตรวจเครื่องนี้', 'Check this phone')}</button>
${devHtml()}
<h2 class="snaph2 pch"><span class="pcpic">${hubIc('snapcam')}</span><span>${L('ทดสอบรูปบนเครื่องนี้', 'Photo check on this phone')}</span></h2>
<p class="notice">${L('หน้านี้ใช้ทดสอบเล่มจากรูป: ดูว่ามือถืออ่านเวลาถ่ายและตำแหน่งจากรูปได้หรือไม่ ไม่มีรูปถูกส่งไปไหน และไม่แสดงพิกัด แสดงแค่ว่ามีหรือไม่มี',
    'A check for the book-from-photos idea: does this phone hand over when and where each photo was taken? Nothing is uploaded and no position is shown — only whether there is one.')}</p>
<p class="label">${esc(snapDevice())}</p>
<p class="label">${L('อีกทาง: เปิดแกลเลอรี เลือกรูป กด "แชร์" แล้วเลือก LifeBook รูปจะมาที่หน้านี้ (ต้องเป็นแอปที่ติดตั้งบนหน้าจอโฮม)', 'Another way: in the gallery, pick photos, tap Share and choose LifeBook — they arrive on this page (the Home-Screen app only).')}</p>
${snapT.shareNone ? `<p class="notice">${L('การแชร์มาถึงแล้ว แต่ไม่มีรูปติดมา ลองติดตั้งแอปบนหน้าจอโฮมใหม่ แล้วแชร์อีกครั้ง', 'The share arrived without photos. Re-add the app to the Home Screen and share again.')}</p>` : ''}
<div class="snappicks">${SNAP_PICKS.map(([k, , , th, en]) => `<button type="button" class="btn${k === 'photos' ? '' : ' ghost'}" data-a="snappick" data-v="${k}"${snapT.busy ? ' disabled' : ''}>${L(th, en)}</button>`).join('')}
<button type="button" class="btn ghost" data-a="snapgeo">${L('ตำแหน่งตอนนี้', 'Position now')}</button></div>
${snapT.geo ? `<p class="label">${L('ตำแหน่งตอนนี้', 'Position now')}: ${esc(snapT.geo)}</p>` : ''}
<div id="snapruns">${snapT.runs.slice().reverse().map(snapRunHtml).join('')}</div>
${snapT.runs.length || snapT.dev ? `<div class="row"><button type="button" class="btn" data-a="snapcopy">${L('คัดลอกผลไว้ส่งให้ผู้พัฒนา', 'Copy the results')}</button><button type="button" class="linkbtn" data-a="snapclear">${L('ล้าง', 'Clear')}</button></div>` : ''}`;
}
/* The phone check (owner, Nov 2026: "ลองกับมือถือจริง"): what this phone can do for the app, asked of the phone itself — the
   Home-Screen app, the offline helper and its space, the file print, small decodes, sharing a film, playing a clip in parts (206),
   the voice recorder, reminders — then a short list to try by hand. Nothing leaves the phone but what the owner copies. */
const DEV_HAND = [
  ['film', 'เล่นคลิปสรุปทริปในหน้าสมุด มีภาพและเสียง', 'The trip film plays on the memory book page, with sound'],
  ['share', 'กด "ส่งให้ญาติ" แล้วส่งทาง LINE ได้', '"Send to family" sends it through LINE'],
  ['clip', 'คลิปของลูกในวันที่บันทึกเล่นได้', "A kid's clip plays on the record page"],
  ['offclip', 'โหมดเครื่องบิน: คลิปที่เคยเปิดแล้วยังเล่นได้', 'Airplane mode: a clip played before still plays'],
  ['receipt', 'เล่มจากรูปที่มีใบเสร็จ 1 ใบ: ใบเสร็จถูกพักไว้', 'A book from photos with one receipt: the receipt is set aside'],
  ['twice', 'เลือกรูปเดิมซ้ำ: ขึ้นว่ามีในเล่มแล้ว', 'The same photo picked again: "already in the book"'],
  ['remind', 'กดทดสอบการเตือนในหน้าไม่มีเน็ต: เตือนเด้งขึ้นมา', 'The test reminder on the no-signal page arrives'],
];
const devHand = () => { try { return ls('devHand') || {}; } catch (_) { return {}; } };
function devHtml() {
  const d = snapT.dev, hand = devHand(), mark = (s) => (s === 'ok' ? '✓' : s === 'no' ? '✗' : s === 'warn' ? '!' : '—');
  return `${d ? `<ul class="devlist">${d.rows.map(([lab, st, det]) => `<li class="dv-${st}"><b aria-hidden="true">${mark(st)}</b><span>${esc(lab)}${det ? `<small>${esc(det)}</small>` : ''}</span></li>`).join('')}</ul>` : ''}
<h2 class="snaph2 pch"><span class="pcpic">${hubIc('pencil')}</span><span>${L('ลองด้วยมือ', 'Try by hand')}</span></h2><p class="sub">${L('แตะเพื่อบอกผล: ได้ ✓ · ไม่ได้ ✗', 'Tap to say how it went: works ✓ · does not ✗')}</p>
<div class="devhand">${DEV_HAND.map(([k, th, en]) => `<button type="button" class="devh dv-${hand[k] || 'none'}" data-a="devhand" data-v="${k}" aria-pressed="${!!hand[k]}"><b aria-hidden="true">${mark(hand[k])}</b><span>${L(th, en)}</span></button>`).join('')}</div>`;
}
async function devCheck() {
  const rows = [], add = (th, en, st, det) => rows.push([L(th, en), st, det || '']), time = async (fn) => { const t0 = performance.now(); const r = await fn(); return [r, Math.round(performance.now() - t0)]; };
  const app = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  add('เปิดจากไอคอนบนหน้าจอโฮม', 'Opened from the Home-Screen icon', app ? 'ok' : 'warn', app ? '' : L('iPhone เตือนได้เฉพาะเมื่อเปิดจากไอคอน', 'an iPhone reminds only from the icon'));
  try {
    const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration(), keys = 'caches' in self ? await caches.keys() : [];
    add('ตัวช่วยตอนไม่มีเน็ต', 'The offline helper', reg && reg.active ? 'ok' : 'no', (keys.find((k) => /^mbs-v\d/.test(k)) || '').replace(/-[0-9a-f]+$/, ''));
  } catch (_) { add('ตัวช่วยตอนไม่มีเน็ต', 'The offline helper', 'no'); }
  try { const e = await navigator.storage.estimate(), per = navigator.storage.persisted ? await navigator.storage.persisted() : false;
    add('พื้นที่ในเครื่อง', 'Space on the phone', e.quota > 500e6 ? 'ok' : 'warn', `${Math.round((e.usage || 0) / 1e6)} / ${Math.round((e.quota || 0) / 1e6)} MB${per ? L(' · เก็บถาวร', ' · kept') : ''}`); } catch (_) { add('พื้นที่ในเครื่อง', 'Space on the phone', 'none'); }
  add('ลายนิ้วมือไฟล์ (กันรูปซ้ำ)', 'File print (no photo twice)', typeof crypto !== 'undefined' && crypto.subtle ? 'ok' : 'no');
  try { const c = document.createElement('canvas'); c.width = 400; c.height = 300; c.getContext('2d').fillRect(0, 0, 400, 300);
    const blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.8)), [bmp, ms] = await time(() => createImageBitmap(blob, { resizeWidth: 96, resizeQuality: 'low' }));
    add('ย่อรูปเร็ว', 'Quick small decodes', bmp && bmp.width === 96 ? 'ok' : 'warn', `${ms} ms`); if (bmp && bmp.close) bmp.close(); } catch (e) { add('ย่อรูปเร็ว', 'Quick small decodes', 'no', e.name); }
  const tryShare = (type, name) => { try { return !!(navigator.canShare && navigator.canShare({ files: [new File([new Uint8Array(16)], name, { type })] })); } catch (_) { return false; } };
  add('ส่งคลิปผ่านหน้าแชร์', 'Share a film', tryShare('video/mp4', 'trip.mp4') ? 'ok' : 'no', tryShare('image/jpeg', 'x.jpg') ? L('ส่งรูปได้', 'photos too') : '');
  // a clip or film of the family's own: plays here, and in parts (206)
  const tr = trips().find((x) => x.reel && x.reel.v), vid = S.media.find((m) => isVideo(m) && !m.local && !m.pending);
  const src = tr ? `/media/reel/${encodeURIComponent(tr.id)}?v=${encodeURIComponent(tr.reel.v)}` : vid ? `/media/${encodeURIComponent(vid.id)}` : '';
  if (!src) add('เล่นคลิป', 'Play a clip', 'none', L('ยังไม่มีคลิปในเล่ม', 'no clip in the books yet'));
  else {
    try { const r = await fetch(src, { headers: { range: 'bytes=0-99' }, credentials: 'same-origin' }); add('ส่งคลิปเป็นช่วง (206)', 'Clip in parts (206)', r.status === 206 ? 'ok' : 'no', String(r.status)); } catch (e) { add('ส่งคลิปเป็นช่วง (206)', 'Clip in parts (206)', 'no', e.name); }
    const [res, ms] = await time(() => new Promise((ok) => { const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.preload = 'metadata';
      const done = (x) => { v.removeAttribute('src'); v.load(); ok(x); }; v.onloadedmetadata = () => done(v.duration); v.onerror = () => done(-1); setTimeout(() => done(0), 10000); v.src = src; }));
    add('เล่นคลิป', 'Play a clip', res > 0 ? 'ok' : 'no', res > 0 ? `${Math.round(res)} s · ${ms} ms` : res < 0 ? L('เปิดไม่ได้', 'cannot open') : L('ช้าเกิน 10 วินาที', 'over 10 s'));
  }
  const rec = typeof MediaRecorder !== 'undefined' ? ['audio/webm;codecs=opus', 'audio/mp4'].filter((m) => MediaRecorder.isTypeSupported(m)) : [];
  add('อัดเสียงลูก', "Record the kids' voices", rec.length ? 'ok' : 'no', rec.join(', '));
  add('การเตือน', 'Reminders', typeof Notification === 'undefined' || !('PushManager' in self) ? 'no' : Notification.permission === 'granted' ? 'ok' : 'warn', typeof Notification === 'undefined' ? '' : Notification.permission);
  return { rows, at: Date.now() };
}
// each picked photo: does it carry its own small preview (JPEG / HEIF), how long the receipt gate took, can this phone open it, is it a paper
async function devSpeed(run) {
  run.speed = [];
  for (const [i, f] of run.files.slice(0, 40).entries()) {
    const m = run.rows[i]; if (!m) continue; const t0 = performance.now(); let pv = 'none', dec = false, gate = null;
    if (m.th) { pv = m.th instanceof Blob ? 'heif' : 'jpeg'; gate = await snapThumbGate(f, m.th); dec = gate !== null; }
    if (gate === null) { const lk = await snapLook(f); dec = dec || !!lk; gate = !!(lk && lk.paper); }
    const ms = Math.round(performance.now() - t0), doc = gate ? await snapDocLook(f) : false;
    run.speed[i] = { pv, ms, dec, doc };
  }
}
function devSpeedLine(run) {
  const sp = (run.speed || []).filter(Boolean); if (!sp.length) return '';
  const c = (f) => sp.filter(f).length, avg = Math.round(sp.reduce((s, x) => s + x.ms, 0) / sp.length);
  return { pv: `jpeg ${c((x) => x.pv === 'jpeg')} · heif ${c((x) => x.pv === 'heif')} · ${L('ไม่มี', 'none')} ${c((x) => x.pv === 'none')}`, avg, bad: c((x) => !x.dec), doc: c((x) => x.doc), n: sp.length };
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
  snapclear() { snapT.runs = []; snapT.geo = null; snapT.shareNone = false; snapT.dev = null; render(); },
  async devcheck() { if (snapT.devBusy) return; snapT.devBusy = true; render(); try { snapT.dev = await devCheck(); } finally { snapT.devBusy = false; render(); } },
  devhand(b) { const k = b.dataset.v, h = devHand(); h[k] = h[k] === 'ok' ? 'no' : h[k] === 'no' ? undefined : 'ok'; if (!h[k]) delete h[k]; try { ls('devHand', h); } catch (_) {} render(); },
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
function snapGeo() { if (!snapGeoP) snapGeoP = apiKeep('/api/b/geo').catch(() => { snapGeoP = null; return { places: [], countries: [] }; }); return snapGeoP; }
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
const snapGeoSwitch = () => `<label class="ckrow snapgeosw"><input type="checkbox" data-a="snapgeoon"${ls('geoOnline') ? ' checked' : ''}><span><b>${L('ชื่อสถานที่ละเอียดจากแผนที่ออนไลน์', 'Finer place names from an online map')}</b><small>${L('เปิดแล้ว: ส่งตำแหน่งแบบคร่าวๆ (ราวหนึ่งกิโลเมตร) ไปถาม OpenStreetMap ผ่านเซิร์ฟเวอร์ของเรา ไม่ส่งรูป ไม่เก็บไว้ ปิดอยู่: ใช้รายชื่อสถานที่ในเครื่อง', 'On: a rough position (about a kilometre) goes to OpenStreetMap through our server — no photo, nothing kept. Off: the list on this phone names it.')}</small></span></label>`;
// where a photo was taken, said once in a card of its own (owner, Nov 2026: "ปรับ UI ส่วนนี้ด้วย" — a grey note and a long chip
// under it): the privacy line and the online-names switch together, in the look of the settings pages (views.js pcard)
const snapWhereCard = (th, en) => pcard('privacy', PG.blue, L('ที่ถ่ายรูป', 'Where each photo was taken'), `<p class="pcsub">${L(th, en)}</p>${snapGeoSwitch()}`, 'snapwhere');
const snapNameOf = (pl) => (pl ? pl.spot || pl : null);   // what a photo is labelled with: the spot, else the town
/* Clips in a book from photos (owner, Nov 2026: "วิดีโอในเล่มจากรูป"): a video picked with the photos goes to the day it was
   filmed. Its time is the movie header's creation time ('moov' → 'mvhd', seconds since 1904 in UTC), found by walking the file's
   top-level boxes with small slices (the picture data is never read); the place a phone writes into a clip is not read at all. */
const SNAP_VID_RE = /\.(mp4|mov|m4v|3gp|webm)$/i;
const snapIsVid = (f) => /^video\//.test(f.type || '') || SNAP_VID_RE.test(f.name || '');
async function snapVidAt(file) {
  try {
    const rd = async (a, n) => new DataView(await file.slice(a, a + n).arrayBuffer());
    const box = async (from, to, want) => {   // the first box of the wanted type between from and to: {at, size, head}
      let p = from;
      while (p + 8 <= to) {
        const h = await rd(p, 16); let size = h.getUint32(0); const type = String.fromCharCode(h.getUint8(4), h.getUint8(5), h.getUint8(6), h.getUint8(7)); let head = 8;
        if (size === 1) { size = Number(h.getBigUint64(8)); head = 16; } else if (size === 0) size = to - p;
        if (size < head) return null;
        if (type === want) return { at: p, size, head };
        p += size;
      }
      return null;
    };
    const moov = await box(0, file.size, 'moov'); if (!moov || moov.size > 64e6) return null;
    const mvhd = await box(moov.at + moov.head, moov.at + moov.size, 'mvhd'); if (!mvhd) return null;
    const v = await rd(mvhd.at + mvhd.head, 20), ver = v.getUint8(0);
    const secs = ver === 1 ? Number(v.getBigUint64(4)) : v.getUint32(4);
    if (!secs) return null;
    const ms = (secs - 2082844800) * 1000;   // 1904-01-01 → 1970-01-01
    if (ms < Date.UTC(2000, 0, 1) || ms > Date.now() + 864e5) return null;
    const p = new Intl.DateTimeFormat('en-CA', { hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ms)).reduce((o, x) => ((o[x.type] = x.value), o), {});
    return { ms, at: `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}` };   // the wall clock of this phone's zone
  } catch (_) { return null; }
}
let snapS = null;   // the book being made from photos: {mode, name, files, metas, pl, typed, read, done, geo, urls}
const snapPart = (at) => { const h = +String(at || '').slice(11, 13); return h < 11 ? L('ช่วงเช้า', 'Morning') : h < 14 ? L('ตอนกลางวัน', 'Midday') : h < 17 ? L('ช่วงบ่าย', 'Afternoon') : h < 19 ? L('ตอนเย็น', 'Evening') : L('ตอนค่ำ', 'Night'); };
function snapStartRead(files) {
  const list = files.filter((f) => !snapIsVid(f) && (/^image\//.test(f.type) || /\.(heic|heif|jpe?g|png|webp|avif)$/i.test(f.name))).slice(0, 600);
  const vfiles = files.filter(snapIsVid).slice(0, 40);
  snapS = { mode: 'after', name: snapS ? snapS.name : '', files: list, metas: new Array(list.length).fill(null), pl: new Array(list.length).fill(null), typed: {}, read: 0, done: false, urls: {}, more: files.length > 600, aside: {}, keep: new Set(), star: new Set(), runPick: null, vids: [] };
  Promise.all(vfiles.map(async (f) => { const v = await snapVidAt(f); return { file: f, at: v ? v.at : '', ms: v ? v.ms : null }; })).then((vs) => { if (snapS && snapS.files === list) snapS.vids = vs; });
  nav('#/snap/read');
  const naming = [];
  snapGeo().then((geo) => {
    snapS.geo = geo;
    let last = 0;
    return snapRead(list, (i, m) => {
      if (!snapS || snapS.files !== list) return;
      if (m.ll) naming.push(snapWhere(m.ll, geo).then((pl) => { if (snapS && snapS.files === list) snapS.pl[i] = pl; }, () => {}));
      snapS.metas[i] = { at: m.at, tz: m.tz, src: m.src, pos: !!m.ll, th: m.th };   // th = where the file's own small preview sits (for the receipt gate)   // the position is named and dropped here
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
/* Receipts and papers (owner, Nov 2026: "ตรวจจับใบเสร็จ"): a photo of a receipt, a ticket or a printed page is set aside like a
   screenshot — it may carry a card's last digits or a booking, and it is not a memory. Two looks, on the phone: at 96 px a gate (a
   good share of white paper, little colour), then for the few that pass a 320 px read for lines of print = rows of many thin dark
   marks on the paper, with clean rows between them, read straight and slanted up to 12° (a receipt is rarely held straight). A row of
   windows (wide marks), snow or sand (no clean rows) and polka dots or a grille (every line the same) are not print. */
function snapDocGate(px, w, h) {
  const n = w * h; let P = 0, C = 0;
  for (let k = 0; k < n; k++) { const r = px[k * 4], g = px[k * 4 + 1], b = px[k * 4 + 2], l = 0.299 * r + 0.587 * g + 0.114 * b, sat = Math.max(r, g, b) - Math.min(r, g, b); if (l > 150 && sat < 50) P++; if (sat > 80) C++; }
  return P / n >= 0.2 && C / n < 0.25;
}
function snapDocOf(px, w, h) {
  const n = w * h, Lm = new Float32Array(n), Sa = new Uint8Array(n);
  for (let k = 0; k < n; k++) { const r = px[k * 4], g = px[k * 4 + 1], b = px[k * 4 + 2]; Lm[k] = 0.299 * r + 0.587 * g + 0.114 * b; Sa[k] = Math.max(r, g, b) - Math.min(r, g, b); }
  const hist = new Uint32Array(256), lum = new Float32Array(w); let best = 0;
  for (const deg of [0, -4, 4, -8, 8, -12, 12]) {
    const tn = Math.tan(deg * Math.PI / 180), off = Math.ceil(Math.abs(tn) * w); let lines = 0, band = false, clean = 0; const per = [];
    for (let y0 = -off; y0 < h + off; y0++) {
      hist.fill(0); let m = 0, cnt = 0;
      for (let x = 0; x < w; x++) { const y = Math.round(y0 + x * tn); if (y < 0 || y >= h) { lum[x] = -1; continue; } const k = y * w + x; lum[x] = Lm[k]; cnt++; if (Sa[k] < 50) { hist[Lm[k] | 0]++; m++; } }
      if (cnt < w * 0.5) { band = false; continue; }
      let paper = 0; if (m > w * 0.2) { let c = 0; for (let v = 255; v >= 0; v--) { c += hist[v]; if (c >= m * 0.25) { paper = v; break; } } }   // the row's paper: its brightest quarter
      let marks = 0, run = 0;
      if (paper >= 150) for (let x = 0; x <= w; x++) { const dark = x < w && lum[x] >= 0 && lum[x] < paper - 45; if (dark) run++; else { if (run >= 1 && run <= 6) marks++; run = 0; } }
      if (marks >= 8) { if (!band && clean >= 1) { lines++; per.push(marks); } else if (band && per.length) per[per.length - 1] = Math.max(per[per.length - 1], marks); band = true; clean = 0; }
      else { band = false; if (marks <= 2 && paper >= 150) clean++; }
    }
    const mean = per.reduce((a, v) => a + v, 0) / (per.length || 1), cv = per.length ? Math.sqrt(per.reduce((a, v) => a + (v - mean) * (v - mean), 0) / per.length) / mean : 0;
    if (cv >= 0.12 && lines > best) best = lines;
  }
  return best >= 6;
}
async function snapThumbGate(file, th) {   // the gate on the camera's preview: a tiny decode instead of the whole photo
  try {
    const bmp = await createImageBitmap(th instanceof Blob ? th : new Blob([file.slice(th[0], th[0] + th[1])], { type: 'image/jpeg' }));   // a HEIF's preview comes as its own file
    const w = bmp.width, h = bmp.height; if (w < 32 || h < 24) { if (bmp.close) bmp.close(); return null; }
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(bmp, 0, 0); if (bmp.close) bmp.close();
    return snapDocGate(g.getImageData(0, 0, w, h).data, w, h);
  } catch (_) { return null; }   // no usable preview: the photo itself is looked at
}
async function snapDocLook(file) {   // the 320 px read, only for a photo that passed the gate
  try {
    let bmp; try { bmp = await createImageBitmap(file, { resizeWidth: 320, resizeQuality: 'medium' }); } catch (_) { bmp = await createImageBitmap(file); }
    const w = 320, h = Math.max(8, Math.round(320 * bmp.height / bmp.width)), c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(bmp, 0, 0, w, h); if (bmp.close) bmp.close();
    return snapDocOf(g.getImageData(0, 0, w, h).data, w, h);
  } catch (_) { return false; }
}
/* Faces (owner, Nov 2026: "เลือกรูปเด่นโดยดูหน้าเด็ก"): a photo where faces are seen, big enough and sharp, is a better pick than
   the same moment without them, and a bigger face better than a far-off one. On the phone only: the pixel-intensity-comparison
   cascade of N. Markuš's pico (MIT; its trained face finder, /geo/facefinder.bin, 234 KB, fetched once and kept for no signal) run on
   a 320 px grey copy, about 30 ms a photo. Eyes shut are not judged: two simple reads of the eye (dark band, white of the eye) could
   not tell a blink from a smile on test photos, so a guess is not made. Nothing leaves the phone, and nothing about a face is kept:
   the answer is only "how many faces, how big". */
let faceFind = null, faceAsk = null;
function faceCascade(bytes) {   // the trees of the cascade file: depth, count, then per tree its pixel pairs, leaf values and threshold
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const depth = dv.getInt32(8, true), n = dv.getInt32(12, true), leaves = 1 << depth;
  let p = 16; const codes = new Int8Array(n * 4 * leaves), preds = new Float32Array(n * leaves), thresh = new Float32Array(n);
  for (let t = 0; t < n; t++) {
    codes.set(new Int8Array(bytes.buffer, bytes.byteOffset + p, 4 * leaves - 4), t * 4 * leaves + 4); p += 4 * leaves - 4;
    for (let k = 0; k < leaves; k++) { preds[t * leaves + k] = dv.getFloat32(p, true); p += 4; }
    thresh[t] = dv.getFloat32(p, true); p += 4;
  }
  return (r, c, s, px, w) => {   // > 0: a face centred at (r, c), size s
    r *= 256; c *= 256; let o = 0, root = 0;
    for (let t = 0; t < n; t++) {
      let idx = 1;
      for (let j = 0; j < depth; j++) {
        const q = root + 4 * idx;
        idx = 2 * idx + (px[((r + codes[q] * s) >> 8) * w + ((c + codes[q + 1] * s) >> 8)] <= px[((r + codes[q + 2] * s) >> 8) * w + ((c + codes[q + 3] * s) >> 8)] ? 1 : 0);
      }
      o += preds[t * leaves + idx - leaves];
      if (o <= thresh[t]) return -1;
      root += 4 * leaves;
    }
    return o - thresh[n - 1];
  };
}
function faceRun(classify, px, w, h) {   // every place and size a face may be, then the overlapping answers merged
  const dets = []; let s = Math.max(16, Math.round(Math.min(w, h) * 0.07));
  while (s <= Math.min(w, h)) {
    const step = Math.max(1, Math.round(s * 0.1)), off = (s / 2 + 1) | 0;
    for (let r = off; r <= h - off; r += step) for (let c = off; c <= w - off; c += step) { const q = classify(r, c, s, px, w); if (q > 0) dets.push([r, c, s, q]); }
    s = Math.round(s * 1.1) + (s < 20 ? 1 : 0);
  }
  dets.sort((a, b) => b[3] - a[3]);
  const iou = (a, b) => { const or = Math.max(0, Math.min(a[0] + a[2] / 2, b[0] + b[2] / 2) - Math.max(a[0] - a[2] / 2, b[0] - b[2] / 2)), oc = Math.max(0, Math.min(a[1] + a[2] / 2, b[1] + b[2] / 2) - Math.max(a[1] - a[2] / 2, b[1] - b[2] / 2)); return (or * oc) / (a[2] * a[2] + b[2] * b[2] - or * oc); };
  const used = new Uint8Array(dets.length), out = [];
  for (let i = 0; i < dets.length; i++) {
    if (used[i]) continue; let r = 0, c = 0, s2 = 0, q = 0, k = 0;
    for (let j = i; j < dets.length; j++) if (!used[j] && iou(dets[i], dets[j]) > 0.2) { used[j] = 1; r += dets[j][0]; c += dets[j][1]; s2 += dets[j][2]; q += dets[j][3]; k++; }
    out.push([r / k, c / k, s2 / k, q]);
  }
  return out.filter((d) => d[3] >= 30);   // a weak answer is a pattern in a wall or a tree, not a face
}
async function faceReady() {
  if (faceFind) return faceFind;
  if (!faceAsk) faceAsk = fetch('/geo/facefinder.bin').then((r) => (r.ok ? r.arrayBuffer() : null)).then((b) => (b && b.byteLength > 1000 ? (faceFind = faceCascade(new Uint8Array(b))) : null)).catch(() => null);
  const f = await faceAsk; if (!f) faceAsk = null; return f;
}
// a photo's faces: [{size (share of the photo's short side)}], biggest first; null when it cannot be looked at
async function faceLook(file) {
  try {
    const classify = await faceReady(); if (!classify) return null;
    let bmp; try { bmp = await createImageBitmap(file, { resizeWidth: 320, resizeQuality: 'medium' }); } catch (_) { bmp = await createImageBitmap(file); }
    const w = 320, h = Math.max(8, Math.round(320 * bmp.height / bmp.width)), cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(bmp, 0, 0, w, h); if (bmp.close) bmp.close();
    return faceOf(g.getImageData(0, 0, w, h).data, w, h, classify);
  } catch (_) { return null; }
}
function faceOf(rgba, w, h, classify) {
  const px = new Uint8Array(w * h); for (let k = 0; k < w * h; k++) px[k] = (rgba[k * 4] * 77 + rgba[k * 4 + 1] * 150 + rgba[k * 4 + 2] * 29) >> 8;
  return faceRun(classify, px, w, h).sort((a, b) => b[2] - a[2]).slice(0, 8).map((d) => ({ size: d[2] / Math.min(w, h) }));
}
// how much the faces add to a photo's pick: none → 1; a face → 1.5 for a far-off one up to 2.2 for a close one; more faces a little more
function faceBonus(faces) {
  if (!faces || !faces.length) return 1;
  return 1 + Math.min(1.2, 0.5 + faces[0].size * 2.5) + Math.min(0.3, (faces.length - 1) * 0.1);
}
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
    return { sharp: lv / (ln || 1), light: sum / (w * h), hash, paper: snapDocGate(px, w, h) };
  } catch (_) { return null; }   // a file this browser cannot draw (HEIC on Chrome): kept, never starred by guess
}
const snapHam = (a, b) => { let n = 0; for (let k = 0; k < 64; k++) if (a[k] !== b[k]) n++; return n; };
// what to set aside in picked photos, and the best ones (owner, Nov 2026: the first build, then "เพิ่มรูปทีหลัง" too): metas[i] =
// snapMeta's answer; alive() says the page still wants the answer. → {aside: {i: 'dup'|'shot'|'doc'}, star: Set, sift} or null
async function snapScreen(list, metas, alive, stars = true) {
  const aside = {}, star = new Set(), sift = { preview: 0, full: 0, read: 0, faces: 0 }, faces = {}; let faceBudget = 160;   // how each photo was looked at (the tests read it)
  const t = (i) => Date.parse(metas[i].at + 'Z');
  list.forEach((f, i) => { const m = metas[i]; if (m && m.src !== 'exif' && (f.type === 'image/png' || SNAP_SHOT_RE.test(f.name || ''))) aside[i] = 'shot'; });
  const looks = {}; let budget = 700;
  const look = async (i) => { if (!(i in looks) && budget-- > 0) looks[i] = await snapLook(list[i]); return looks[i]; };
  // receipts and papers: every photo not yet set aside, the 320 px read only after the gate
  let shown = 0, next = 0, done = 0;
  const lane = async () => { while (next < list.length) {
    const i = next++, f = list[i]; if (!alive()) return;
    if (!aside[i]) {
      const th = metas[i] && metas[i].th; let gate = th ? await snapThumbGate(f, th) : null;
      if (gate !== null) sift.preview++; else { const lk = await look(i); gate = !!(lk && lk.paper); sift.full++; }
      if (gate) sift.read++;
      if (gate && await snapDocLook(f)) aside[i] = 'doc';
    }
    done++; const now = performance.now(); if (now - shown > 200) { shown = now; const el = document.getElementById('snapprog'); if (el) el.textContent = `${done}/${list.length}`; }
  } };
  await Promise.all([lane(), lane(), lane()]);
  if (!alive()) return null;
  // bursts: camera-timed photos four seconds apart or less
  const timed = list.map((_, i) => i).filter((i) => metas[i] && metas[i].src === 'exif' && metas[i].at && !aside[i]).sort((x, y) => t(x) - t(y));
  const bursts = []; for (const i of timed) { const b = bursts[bursts.length - 1]; if (b && t(i) - t(b[b.length - 1]) <= 4000) b.push(i); else bursts.push([i]); }
  for (const b of bursts.filter((x) => x.length > 1)) {
    for (const i of b) await look(i);
    const ok = b.filter((i) => looks[i]); if (ok.length < 2) continue;
    const best = ok.reduce((x, i) => (looks[i].sharp > looks[x].sharp ? i : x), ok[0]);
    for (const i of ok) if (i !== best && snapHam(looks[i].hash, looks[best].hash) <= 12) aside[i] = 'dup';
  }
  // stars: per date, up to eight photos spread through the day, the sharpest well-lit ones of different moments
  if (stars) {
    const byDate = {}; for (const i of timed) if (!aside[i]) (byDate[metas[i].at.slice(0, 10)] = byDate[metas[i].at.slice(0, 10)] || []).push(i);
    for (const ids of Object.values(byDate)) {
      const step = Math.max(1, Math.floor(ids.length / 8)), cand = ids.filter((_, k) => k % step === 0).slice(0, 8);
      for (const i of cand) { await look(i); if (looks[i] && !(i in faces) && faceBudget-- > 0) { faces[i] = await faceLook(list[i]); if (faces[i] && faces[i].length) sift.faces++; } }
      const score = (i) => (looks[i] ? looks[i].sharp * (looks[i].light < 45 || looks[i].light > 225 ? 0.35 : 1) * faceBonus(faces[i]) : -1);
      const ranked = cand.filter((i) => looks[i]).sort((x, y) => score(y) - score(x)), want = ids.length >= 10 ? 2 : 1, got = [];
      for (const i of ranked) { if (got.length >= want) break; if (got.every((j) => Math.abs(t(i) - t(j)) > 20 * 6e4)) got.push(i); }
      got.forEach((i) => star.add(i));
    }
  }
  return alive() ? { aside, star, sift } : null;
}
async function snapSift(list) {
  const s = snapS; if (!s || s.files !== list) return;
  const r = await snapScreen(list, s.metas, () => snapS === s && s.files === list);
  if (!r) return;
  Object.assign(s.aside, r.aside); r.star.forEach((i) => s.star.add(i)); s.sift = r.sift;
}
// the reasons photos were set aside, in words: "ภาพซ้ำ · ใบเสร็จและเอกสาร"
const SNAP_WHY = { dup: ['ภาพซ้ำ', 'repeats'], shot: ['ภาพหน้าจอ', 'screenshots'], doc: ['ใบเสร็จและเอกสาร', 'receipts and papers'], near: ['เหมือนรูปที่มีในเล่มแล้ว', 'like a photo already in the book'] };
const snapWhy = (kinds) => ['dup', 'shot', 'doc', 'near'].filter((k) => kinds.includes(k)).map((k) => L(SNAP_WHY[k][0], SNAP_WHY[k][1])).join(' · ');
const snapIn = (s, i) => !s.aside[i] || s.keep.has(i);   // a photo set aside stays out until the parents bring it back
// the runs of dates in the picked photos (gaps under three days), in date order, each with how many photos it holds (a photo set aside
// does not count), the towns it names most and whether it is already a book
function snapRuns() {
  const s = snapS, items = s.files.map((f, i) => ({ i, m: s.metas[i] })).filter((x) => x.m && x.m.at && snapIn(s, x.i));
  const dates = [...new Set(items.map((x) => x.m.at.slice(0, 10)))].sort();
  const runs = []; for (const d of dates) { const r = runs[runs.length - 1]; if (r && (Date.parse(d) - Date.parse(r[r.length - 1])) / 864e5 < 3) r.push(d); else runs.push([d]); }
  return runs.map((r) => { const its = items.filter((x) => r.includes(x.m.at.slice(0, 10))), tally = {};
    for (const x of its) { const p = s.pl[x.i]; if (p && p.id) tally[p.id] = (tally[p.id] || 0) + 1; }
    return { dates: r, at: r[0], n: its.length, made: (s.made || []).includes(r[0]), towns: Object.keys(tally).sort((a, b) => tally[b] - tally[a]).slice(0, 3) }; });
}
// "ดูเหมือนสองทริป": two or more runs that each look like a trip (three photos or more) — the parents pick one, a book each, or all in one book
const snapTrips = () => snapRuns().filter((r) => r.n >= 3);
// the trip in the picked photos: the run asked for (its first date), every trip not yet made ('all'), the one the parents picked, else the
// one that holds the most photos (not one already made) — its days and moments
function snapPlan(only) {
  const s = snapS, items = s.files.map((f, i) => ({ i, m: s.metas[i], pl: s.pl[i] })).filter((x) => x.m && x.m.at && snapIn(s, x.i));
  const runs = snapRuns(), pick = only !== undefined ? only : s.runPick === 'all' ? 'all' : s.runAt;
  const run = pick === 'all' ? snapTrips().filter((r) => !r.made).flatMap((r) => r.dates)
    : ((pick && runs.find((r) => r.at === pick && !r.made)) || runs.filter((r) => !r.made).sort((x, y) => y.n - x.n)[0] || { dates: [] }).dates;
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
    return { date, items: ps, moments, top, vids: (s.vids || []).filter((v) => v.at.slice(0, 10) === date) };
  });
  const out = items.filter((x) => !inRun.has(x.m.at.slice(0, 10))).length, none = s.files.filter((f, i) => !(s.metas[i] && s.metas[i].at)).length;
  return { days, out, none, span: run.length ? (Date.parse(run[run.length - 1]) - Date.parse(run[0])) / 864e5 : 0, pos: s.metas.filter((m) => m && m.pos).length,
    aside: Object.keys(s.aside).filter((i) => !s.keep.has(+i)).length, asideWhy: snapWhy(Object.keys(s.aside).filter((i) => !s.keep.has(+i)).map((i) => s.aside[i])), stars: [...s.star].filter((i) => snapIn(s, i)).length };
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

// B3, the place sheet (docs/SNAP-BOOK.md D2.3): a day's place picked from a list instead of typed — the places its photos named, the
// landmarks of that region from the library (finer than the town: "a waterfall", "the night safari"), the places this family used in
// its other books, then every library town; a search box filters the list in place, and what is typed can be used as it is
// the menu's bright colours (app.css .hubgrid .t-*), one per day or group, painted pastel by .pz (the menu tiles' recipe)
const SNAP_PAL = ['#4F7BFF', '#FF9A3C', '#1CC9A4', '#C850F0', '#FF6FA8', '#F2B90C', '#22D3EE', '#9BD82A'];
const snapPal = (i) => SNAP_PAL[((i % SNAP_PAL.length) + SNAP_PAL.length) % SNAP_PAL.length];
// a place's own look on the photo-book screens: its library stamp and colour (from /api/b/geo), else nothing
const snapGeoOf = (id) => (id && snapS && snapS.geo && (snapS.geo.places || []).find((g) => g.id === id)) || null;
const snapArtOf = (id) => (snapGeoOf(id) || {}).art || '';
const snapColOf = (id) => (snapGeoOf(id) || {}).c || '';
const snapPlBtn = (d) => `<button type="button" class="snapplb" data-a="snapplace" data-v="${d.date}" aria-label="${L('เลือกจากรายการ', 'Pick from a list')}">${ic('pin')}<span>${L('เลือก', 'Pick')}</span></button>`;
const snapLm = {};   // place id → Promise of its landmarks
function snapLandmarks(id) { if (!snapLm[id]) snapLm[id] = api('GET', `/api/b/geo/${encodeURIComponent(id)}/landmarks`).then((r) => r.landmarks || []).catch(() => { delete snapLm[id]; return []; }); return snapLm[id]; }
async function snapPlaceSheet(date) {
  const plan = snapPlan(), d = plan.days.find((x) => x.date === date); if (!d) return;
  const k = lang === 'en' ? 'en' : 'th', seen = new Set(), now = (snapS.typed[date] !== undefined ? snapS.typed[date] : T(snapDayPlace(d) || '')).trim().toLowerCase();
  // a row: a picture (the library's own drawing for a landmark, else a tinted icon), the name, a ✓ on the day's place now — the app's option-card look
  const group = (title, icon, items) => { const xs = items.map((x) => (typeof x === 'string' ? { n: x } : x)).map((x) => ({ ...x, n: String(x.n || '').trim() })).filter((x) => x.n && !seen.has(x.n.toLowerCase()) && seen.add(x.n.toLowerCase()));
    const gc = { camera: '#FF6FA8', pin: snapColOf((d.top[0] || {}).id) || '#1CC9A4', book: '#F2B90C', globe: '#4F7BFF' }[icon] || '#4F7BFF';
    return xs.length ? `<li class="psh" style="--g1:${gc}">${title}</li>${xs.map((x) => `<li><button type="button" class="psopt pz" style="--g1:${gc}" data-a="snapplacepick" data-d="${date}" data-v="${esc(x.n)}" aria-pressed="${x.n.toLowerCase() === now}">${x.art ? `<img class="psart" src="${esc(x.art)}" alt="" loading="lazy">` : `<span class="psic">${ic(icon)}</span>`}<span class="psn">${esc(x.n)}</span><span class="ck" aria-hidden="true">✓</span></button></li>`).join('')}` : ''; };
  const photo = d.top.flatMap((p) => [p.spot ? { n: p.spot[k] || p.spot.th, art: snapArtOf(p.id) } : '', { n: p[k] || p.th, art: snapArtOf(p.id) }]);
  const region = (d.top[0] && d.top[0].id ? await snapLandmarks(d.top[0].id) : []).map((x) => ({ n: x.name[k] || x.name.th, art: x.art }));
  const ours = trips().filter((t) => t.kind === 'snap').flatMap((t) => t.days.map((x, j) => (x.place ? { n: T(x.place), art: dayArt(t, j) || '' } : null)).filter(Boolean));   // with that day's picture from its book
  const towns = ((snapS.geo && snapS.geo.places) || []).slice().sort((a, b) => (b.home ? 1 : 0) - (a.home ? 1 : 0)).map((g) => ({ n: snapShort(g.name)[k], art: g.art }));
  openSheet(`<h3>${L('สถานที่ของวัน', 'The day’s place')} · ${esc(fmtDay(date, { day: 'numeric', month: 'short' }))}</h3>
<div class="psrow"><input id="psq" class="field" type="search" maxlength="120" autocomplete="off" placeholder="${L('ค้นหา หรือพิมพ์ชื่อเอง', 'Search, or type your own')}" value="${esc(snapS.typed[date] || '')}">
<button type="button" class="btn" data-a="snapplacepick" data-d="${date}" data-own="1">${L('ใช้ชื่อนี้', 'Use this')}</button></div>
<ul class="pslist">${group(L('จากรูปของวันนี้', 'From the day’s photos'), 'camera', photo)}${group(d.top[0] ? L(`ที่เที่ยวแถว${d.top[0].th}`, `Around ${d.top[0].en}`) : '', 'pin', region)}${group(L('ที่เคยใส่ในเล่มอื่น', 'From your other books'), 'book', ours)}${group(L('เมืองในคลังภาพ', 'Towns in the library'), 'globe', towns)}</ul>
<button type="button" class="btn ghost wide" data-a="closesheet">${L('ปิด', 'Close')}</button>`);
}
function viewSnap(p) {
  const step = p[1] || '';
  if (step && !snapS) { setTimeout(() => location.replace('#/snap'), 0); return ''; }   // the picked files live only in this page's memory
  if (!step) {
    const shq = route().q.get('shared');
    if (shq !== null) { history.replaceState(null, '', '#/snap'); snapTakeShared().then((fs) => { if (fs.length) snapStartRead(fs); else toast(L('การแชร์ไม่มีรูปติดมา', 'The share came without photos')); }).catch(() => {}); }
    const mode = (snapS && snapS.mode) || snapMode;
    return `${pageHead('snapcam', PG.pink, L('เล่มใหม่', 'New book'), L('เล่มจากรูป', 'A book from photos'), L('เลือกรูปของทริป แอปจัดวันและสถานที่ให้ แล้วค่อยแก้สิ่งที่ไม่ตรง', 'Pick the trip’s photos — the app sorts them into days and places, you fix what is off'))}
<div class="tpk snapmode" role="group" aria-label="${L('ทริปนี้', 'This trip')}">${[['after', '/art/hub/album.webp', PG.orange, L('กลับมาแล้ว', 'We’re back'), L('เลือกรูปทั้งทริปทีเดียว', 'Pick the whole trip’s photos at once')], ['live', HUB_PIC.plan, PG.teal, L('กำลังเที่ยวอยู่', 'We’re on the trip'), L('เล่มเริ่มวันนี้ แล้วค่อยเติมทุกวัน', 'The book starts today, add to it each day')]]
    .map(([k, pic, g, h, sm]) => `<button type="button" class="tpo pz" style="--g1:${g}" data-a="snapmode" data-v="${k}" aria-pressed="${mode === k}"><span class="smpic"><img src="${pic}" alt="" draggable="false"></span><span class="smtx"><b>${h}</b><small>${sm}</small></span><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>
${pcard('pencil', PG.gold, `<label for="snapname">${L('ชื่อเล่ม', 'The book’s name')}</label>`, `<input id="snapname" class="field" type="text" maxlength="120" value="${esc(snapName)}" placeholder="${L('เช่น เขาใหญ่ปลายปี', 'e.g. Khao Yai at New Year')}"><p class="pcsub snapnmh">${L('ไม่ใส่ก็ได้ แอปตั้งชื่อให้จากที่เที่ยว', 'Optional — the app names it after the places')}</p>`, 'snapnamec')}
${snapWhereCard('แอปอ่านวันเวลาและตำแหน่งจากรูปบนเครื่องนี้ แล้วเก็บไว้แค่ชื่อเมือง ย่าน หรือที่เที่ยว ไม่เก็บพิกัด', 'The app reads when and where each photo was taken on this phone and keeps only the name of the town or place — never the position.')}
<div class="snapfoot">${mode === 'live' ? `<button type="button" class="btn wide" data-a="snaplive">${L('เริ่มเล่มวันนี้', 'Start the book today')}</button>`
    : `<button type="button" class="btn wide" data-a="snappickbook">${L('เลือกรูปจากเครื่อง', 'Pick photos')}</button><small>${L('หรือเปิดแกลเลอรี เลือกรูป กดแชร์ แล้วเลือกแอปนี้', 'Or in the gallery: pick photos, Share, then this app')}</small>`}</div>`;
  }
  const s = snapS;
  if (step === 'read') {
    if (!s.done) return `<h1>${s.sifting ? L('กำลังเลือกรูปเด่น แยกใบเสร็จ', 'Picking the best photos, setting receipts aside') : L('กำลังอ่านรูป', 'Reading the photos')}</h1><p class="snapbig"><b id="snapprog">${s.read}/${s.files.length}</b></p>${snapNote('ทั้งหมดนี้ทำบนเครื่องของคุณ รูปยังไม่ได้ส่งไปไหน', 'All of this happens on your phone — no photo has been sent anywhere.')}`;
    const plan = snapPlan(), n = s.files.length;
    if (!plan.days.length) return `<h1>${L('ไม่พบวันที่ในรูป', 'No dates in these photos')}</h1><p>${L('รูปที่เลือกไม่มีวันเวลาที่ถ่าย ลองเลือกรูปจากกล้องโดยตรง หรือเริ่มเป็นเล่มเปล่า', 'These photos carry no time taken. Pick photos straight from the camera, or start an empty book.')}</p><div class="snapfoot"><a class="btn wide" href="#/snap">${L('เลือกใหม่', 'Pick again')}</a></div>`;
    if (plan.span > 60) return `<h1>${L('รูปยาวเกิน 60 วัน', 'More than 60 days of photos')}</h1><p>${L('เลือกเฉพาะรูปของทริปเดียว', 'Pick one trip’s photos only')}</p><div class="snapfoot"><a class="btn wide" href="#/snap">${L('เลือกใหม่', 'Pick again')}</a></div>`;
    const few = plan.pos < Math.ceil(n * 0.3), d0 = plan.days[0].date, d1 = plan.days[plan.days.length - 1].date;
    const trips = snapTrips(), span = (r) => esc(fmtDay(r.at, { day: 'numeric', month: 'short' })) + (r.dates.length > 1 ? ' – ' + esc(fmtDay(r.dates[r.dates.length - 1], { day: 'numeric', month: 'short' })) : '');
    const made = s.lastMade && trip(s.lastMade);
    const pick = trips.length > 1 ? `<h2 class="snaph2">${L(`ดูเหมือนรูปมาจาก ${trips.length} ทริป`, `These look like ${trips.length} trips`)}</h2>
<p class="sub">${L('เลือกทริปที่จะทำเป็นเล่มนี้ ทริปที่เหลือทำเป็นอีกเล่มได้หลังสร้างเล่มนี้', 'Pick the trip for this book — the others can be their own books once this one is made')}</p>
<div class="tpk snaptrips" role="group" aria-label="${L('ทริป', 'Trips')}">${trips.map((r) => `<button type="button" class="tpo pz" data-a="snaprun" data-v="${r.at}" aria-pressed="${!s.runPick && r.dates[0] === d0}"${r.made ? ' disabled' : ''} style="--g1:${esc(snapColOf(r.towns[0]) || snapPal(trips.indexOf(r)))}">${r.towns.some(snapArtOf) ? `<span class="sttowns">${r.towns.map(snapArtOf).filter(Boolean).map((u) => `<img src="${esc(u)}" alt="" loading="lazy">`).join('')}</span>` : ''}<b>${span(r)}</b><small>${r.made ? L('ทำเป็นเล่มแล้ว', 'already a book') : L(`${r.dates.length} วัน · ${r.n} รูป`, `${r.dates.length} day${r.dates.length === 1 ? '' : 's'} · ${r.n} photos`)}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>` : '';
    // "a book each" or "all in one book" (owner, Nov 2026), while two trips or more are still to make; all in one only within 60 days
    const open = trips.filter((r) => !r.made), allSpan = open.length ? (Date.parse(open[open.length - 1].dates.slice(-1)[0]) - Date.parse(open[0].at)) / 864e5 : 0;
    const joinRow = open.length > 1 ? `<div class="tpk snapjoin" role="group">
<button type="button" class="tpo" data-a="snaprun" data-v="both" aria-pressed="${s.runPick === 'both'}"><b>${L(`แยกเป็น ${open.length} เล่ม`, `${open.length} books, one a trip`)}</b><small>${L('แต่ละทริปได้เล่มของตัวเอง', 'Each trip gets its own book')}</small><span class="ck" aria-hidden="true">✓</span></button>
${allSpan <= 60 ? `<button type="button" class="tpo" data-a="snaprun" data-v="all" aria-pressed="${s.runPick === 'all'}"><b>${L('รวมเป็นเล่มเดียว', 'All in one book')}</b><small>${L('วันที่ห่างกันเว้นว่างไว้', 'The days between stay empty')}</small><span class="ck" aria-hidden="true">✓</span></button>` : ''}</div>` : '';
    return `${made ? `<p class="notice">${L(`สร้างเล่ม “${esc(T(made.title))}” แล้ว รูปกำลังส่งขึ้น — ทำอีกทริปต่อได้เลย`, `“${esc(T(made.title))}” is made and its photos are on their way — now the next trip`)} <a href="#/t/${encodeURIComponent(made.id)}/${S.features.story ? 'draft' : 'book'}">${L('ไปที่เล่มนั้น', 'Go to that book')}</a></p>` : ''}
<h1>${L(`อ่าน ${n} รูปแล้ว`, `${n} photos read`)}</h1>
<ul class="snapsum pzs">
<li class="pz" style="--g1:#4F7BFF"><span>${L('วันที่', 'Dates')}</span><b>${esc(fmtDay(d0, { day: 'numeric', month: 'short' }))}${d0 !== d1 ? ' – ' + esc(fmtDay(d1, { day: 'numeric', month: 'short' })) : ''} · ${L(`${plan.days.length} วัน`, `${plan.days.length} day${plan.days.length === 1 ? '' : 's'}`)}</b></li>
<li class="pz" style="--g1:#1CC9A4"><span>${L('รู้ว่าถ่ายที่ไหน', 'Know where')}</span><b>${plan.pos ? L(`${plan.pos} รูป`, `${plan.pos}`) : L('ยังไม่รู้', 'not yet')}</b></li>
${plan.out ? `<li class="pz" style="--g1:#FF9A3C"><span>${L(trips.length > 1 ? 'รูปของทริปอื่น' : 'รูปนอกช่วงทริป', trips.length > 1 ? 'Other trips' : 'Outside the trip')}</span><b>${trips.length > 1 ? L(`${plan.out} รูป ไม่ใส่ในเล่มนี้`, `${plan.out}, not in this book`) : L(`${plan.out} รูป ไม่ใส่ในเล่ม`, `${plan.out}, left out`)}</b></li>` : ''}
${plan.none ? `<li class="pz" style="--g1:#FF6FA8"><span>${L('ไม่รู้วันที่ถ่าย', 'No date')}</span><b>${L(`${plan.none} รูป ไม่ใส่ในเล่ม`, `${plan.none}, left out`)}</b></li>` : ''}
${(s.vids || []).length ? `<li class="pz" style="--g1:#22D3EE"><span>${L('คลิปวิดีโอ', 'Video clips')}</span><b>${((n2, rest) => L(`${n2} คลิปลงวันที่ถ่าย`, `${n2} go on the day they were filmed`) + (rest ? L(` · ${rest} คลิปไม่รู้วันหรืออยู่นอกทริป`, ` · ${rest} with no date or outside the trip`) : ''))(plan.days.reduce((a, d) => a + d.vids.length, 0), s.vids.length - plan.days.reduce((a, d) => a + d.vids.length, 0))}</b></li>` : ''}
${plan.aside ? `<li class="pz" style="--g1:#C850F0"><span>${L('พักไว้ก่อน', 'Set aside')}</span><b>${L(`${plan.aside} รูป (${plan.asideWhy}) เอากลับได้`, `${plan.aside} (${plan.asideWhy}) — bring back any`)}</b></li>` : ''}
${plan.stars ? `<li class="pz" style="--g1:#F2B90C"><span>${L('รูปเด่น ⭐', 'Best photos ⭐')}</span><b>${L(`เลือกให้ ${plan.stars} รูป เปลี่ยนได้`, `${plan.stars} picked — change any`)}</b></li>` : ''}
</ul>${pick}${joinRow}
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
<span class="snappl"><input class="field" type="text" maxlength="120" list="snapgeo" data-snapday="${d.date}" value="${esc(placeVal(d))}" placeholder="${L('เช่น เขาใหญ่', 'e.g. Khao Yai')}">${snapPlBtn(d)}</span></label>`).join('')}</div>
${plan.days.length > 1 ? `<button type="button" class="linkbtn" data-a="snapsame">${L('ใช้ชื่อวันแรกกับทุกวัน', 'Use the first day’s place for every day')}</button>` : ''}
<div class="snapfoot"><a class="btn wide" href="#/snap/days">${L('ต่อไป', 'Next')}</a><a class="linkbtn" href="#/snap/days">${L('ข้าม', 'Skip')}</a></div>`;
  }
  // B1 + B2: the days the app found, each opening to its moments; the parents fix a day's place, then make the book
  const title = snapTitle(plan);
  return `<h1>${L('วันที่จัดให้', 'Your days')}</h1>${dl}
<label class="flabel" for="snaptitle">${L('ชื่อเล่ม', 'Book name')}</label>
<input id="snaptitle" class="field" type="text" maxlength="120" value="${esc(s.name || T(title))}">
<div class="snapdays">${plan.days.map((d, i) => `<details class="snapday pz" data-fold="d${d.date}"${(s.folds ? s.folds.has('d' + d.date) : i === 0) ? ' open' : ''} style="--g1:${esc(snapColOf((d.top[0] || {}).id) || snapPal(i))}"><summary>${snapArtOf((d.top[0] || {}).id) ? `<img class="sdart" src="${esc(snapArtOf(d.top[0].id))}" alt="" loading="lazy">` : `<span class="sdart sdn" aria-hidden="true">${i + 1}</span>`}
<span class="sdt"><b>${dayLine(d, i)}</b><small>${esc(placeVal(d) || L('ยังไม่ได้ใส่สถานที่', 'No place yet'))} · ${L(`${d.items.length} รูป`, `${d.items.length} photo${d.items.length === 1 ? '' : 's'}`)}${d.vids.length ? ' · ' + L(`🎬 ${d.vids.length} คลิป`, `🎬 ${d.vids.length} clip${d.vids.length === 1 ? '' : 's'}`) : ''}</small></span>
<span class="sdph">${d.items.slice(0, 3).map((x) => `<img src="${snapThumb(x.i)}" alt="" loading="lazy">`).join('')}</span>${ic('chev', 'chv')}</summary>
<label class="snapplace"><span>${L('สถานที่ของวัน', 'The day’s place')}</span><span class="snappl"><input class="field" type="text" maxlength="120" list="snapgeo" data-snapday="${d.date}" value="${esc(placeVal(d))}">${snapPlBtn(d)}</span></label>
<ol class="snapmoms">${d.moments.map((m) => `<li><b>${snapPart(m.first)}${m.place ? ' · ' + esc(T(snapNameOf(m.place))) : ''}</b><small>${L(`${m.items.length} รูป`, `${m.items.length} photo${m.items.length === 1 ? '' : 's'}`)}</small>
<span class="sdph sdpick">${m.items.slice().sort((a, b) => (s.star.has(b.i) ? 1 : 0) - (s.star.has(a.i) ? 1 : 0)).slice(0, 6).map((x) => `<button type="button" class="sdpt${s.star.has(x.i) ? ' on' : ''}" data-a="snapstar" data-i="${x.i}" aria-pressed="${s.star.has(x.i)}" aria-label="${L('รูปเด่น', 'Best photo')}"><img src="${snapThumb(x.i)}" alt="" loading="lazy">${s.star.has(x.i) ? '<i>⭐</i>' : ''}</button>`).join('')}</span></li>`).join('')}</ol>
${snapAsideHtml(d.date)}</details>`).join('')}</div>
${plan.out + plan.none ? `<p class="label">${L(`${plan.out + plan.none} รูปไม่อยู่ในช่วงทริปหรือไม่รู้วันที่ ไม่ใส่ในเล่มนี้`, `${plan.out + plan.none} photos are outside the trip or have no date — left out of this book`)}</p>` : ''}
<div class="snapfoot"><button type="button" class="btn wide" data-a="snapmake"${s.making ? ' disabled' : ''}>${s.making ? L('กำลังสร้างเล่ม…', 'Making the book…') : L('สร้างเล่ม', 'Make the book')}</button>
<small>${L('รูปจะถูกย่อและส่งขึ้นเล่มทีละรูป ไม่ต้องรอ', 'The photos are made smaller and sent up one by one — no need to wait')}</small></div>`;
}
// the photos of a date set aside (repeats, screenshots, receipts and papers): a tap brings one back into the book, a second sets it aside again
function snapAsideHtml(date) {
  const s = snapS, ids = Object.keys(s.aside).map(Number).filter((i) => s.metas[i] && String(s.metas[i].at || '').slice(0, 10) === date);
  if (!ids.length) return '';
  return `<details class="snapaside" data-fold="a${date}"${s.folds && s.folds.has('a' + date) ? ' open' : ''}><summary><span>${L(`พักไว้ ${ids.length} รูป`, `${ids.length} set aside`)}<small>${L(`${snapWhy(ids.map((i) => s.aside[i]))} แตะรูปเพื่อเอากลับเข้าเล่ม`, `${snapWhy(ids.map((i) => s.aside[i])).replace(/^./, (c) => c.toUpperCase())} — tap one to put it back`)}</small></span>${ic('chev', 'chv')}</summary>
<span class="sdph sdpick">${ids.map((i) => `<button type="button" class="sdpt${s.keep.has(i) ? ' kept' : ' off'}" data-a="snapback" data-i="${i}" aria-pressed="${s.keep.has(i)}" aria-label="${esc(snapWhy([s.aside[i]]))}"><img src="${snapThumb(i)}" alt="" loading="lazy">${s.keep.has(i) ? '<i>✓</i>' : ''}</button>`).join('')}</span></details>`;
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
    if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'snapin-book'; inp.multiple = true; inp.accept = 'image/*,video/*'; inp.hidden = true; document.body.append(inp); }
    inp.value = ''; inp.click();
  },
  snapplace(b) { if (snapS) snapPlaceSheet(b.dataset.v); },
  snapplacepick(b) {   // a name from the sheet (or what was typed in its search box) becomes the day's place
    if (!snapS) return; const v = b.dataset.own ? ((document.getElementById('psq') || {}).value || '') : b.dataset.v;
    snapS.typed[b.dataset.d] = v.trim(); closeSheet(); render();
  },
  snaprun(b) {   // the trip this book is made of, or 'both' (a book each) / 'all' (one book)
    if (!snapS) return; const v = b.dataset.v; if (v === 'both' || v === 'all') snapS.runPick = v; else { snapS.runPick = null; snapS.runAt = v; } snapS.typed = {}; snapS.name = ''; snapS.folds = null; render();
  },
  snapstar(b) {   // in place: a redraw would close the day's fold under the finger
    if (!snapS) return; const i = +b.dataset.i, on = !snapS.star.has(i); if (on) snapS.star.add(i); else snapS.star.delete(i);
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); const badge = b.querySelector('i'); if (on && !badge) b.insertAdjacentHTML('beforeend', '<i>⭐</i>'); else if (!on && badge) badge.remove();
  },
  snapback(b) {   // the day's count changes: a redraw, with the folds that were open kept open (snapS.folds)
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
      const picks = snapTrips().filter((r) => !r.made).map((r) => r.at);
      s.making = true; render(); let last = null;
      for (const k of picks) { const id = await snapMakeOne(s, snapPlan(k), picks.length > 1); if (!id) { s.making = false; render(); return; } last = id; s.made = (s.made || []).concat(k); }
      snapForget(); snapName = '';
      toast(L(`สร้าง ${picks.length} เล่มแล้ว รูปกำลังส่งขึ้น`, `${picks.length} books made — the photos are on their way`));
      nav('#/'); return void last;
    }
    const plan = snapPlan(); if (!plan.days.length) return;
    s.making = true; render();
    const id = await snapMakeOne(s, plan, false); if (!id) { s.making = false; render(); return; }
    // the photos held more than one trip: keep the rest on the phone and go on with the next one (the files are still in memory)
    s.made = (s.made || []).concat(snapTrips().filter((r) => r.dates.some((d) => plan.days.some((x) => x.date === d))).map((r) => r.at));
    s.making = false; s.typed = {}; s.name = ''; s.runAt = null; s.runPick = null; s.folds = null; s.lastMade = id; snapName = '';   // the next trip's days open as new
    if (snapTrips().some((r) => !r.made)) { toast(L('สร้างเล่มแล้ว ทำอีกทริปต่อได้เลย', 'The book is made — now the next trip')); nav('#/snap/read'); return; }
    snapForget();
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
        await addPhotos(t, i, m.items.map((x) => s.files[x.i]), name ? { place: name } : null, Object.assign(m.items.map((x) => (s.metas[x.i] ? { ...s.metas[x.i], star: s.star.has(x.i) } : null)), { near: false }));   // a new book: the read page already sifted the pick
      }
      for (const v of d.vids) await addVideo(t, i, v.file, v.ms, true);   // the day's clips, each with the time it was filmed
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
  return `${pageHead('pencil', PG.teal, L('เล่มจากรูป', 'A book from photos'), L('แก้เล่ม', 'Edit the book'), L('แก้แล้วบันทึกเองเมื่อออกจากช่อง สถานที่ใหม่จะได้รูปจากคลังให้ด้วย', 'Saved when you leave a box — a new place brings its picture from the library'))}
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
${snapWhereCard('รูปที่ถ่ายผ่านปุ่มนี้รู้ว่าถ่ายที่ไหน แอปเก็บไว้แค่ชื่อสถานที่ ไม่เก็บพิกัด', 'A photo taken with this button knows where it was taken — the app keeps only the place’s name, never the position.')}
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
async function snapLiveAdd(t, files0, live = true, screen = true) {
  const geo = await snapGeo(), today = todayIn(t.timezone), here = live ? snapHere(t) : null;
  // the same file the book already holds (or picked twice now) is not sent again
  const seen = new Set(), fresh = []; let already = 0;
  for (const f of files0) { const fp = await fileFp(f); if (fp && (seen.has(fp) || fpIn(t, fp))) { already++; continue; } if (fp) seen.add(fp); fresh.push([f, fp]); }
  const fpOfFile = new Map(fresh);
  const clips = []; for (const [f] of fresh.filter(([f]) => snapIsVid(f))) { const v = await snapVidAt(f); clips.push({ file: f, at: v ? v.at : '', ms: v ? v.ms : null }); }
  let files = fresh.map(([f]) => f).filter((f) => !snapIsVid(f));
  let metas = []; for (const f of files) { const m = await snapMeta(f).catch(() => null); const pl = m && m.ll ? await snapWhere(m.ll, geo).catch(() => null) : null; if (m) { m.ll = null; m.fp = fpOfFile.get(f) || ''; } metas.push({ m, pl }); }
  // repeats, screenshots, receipts and papers wait aside (owner, Nov 2026: "เพิ่มรูปทีหลัง" the same as the first build)
  let held = [];
  if (screen && files.length) {
    const r = await snapScreen(files, metas.map((x) => x.m), () => true, false);
    if (r && Object.keys(r.aside).length) {
      held = files.map((f, k) => (r.aside[k] ? { file: f, why: r.aside[k] } : null)).filter(Boolean);
      const keep = files.map((f, k) => !r.aside[k]); files = files.filter((f, k) => keep[k]); metas = metas.filter((x, k) => keep[k]);
    }
  }
  if (!files.length && !clips.length) { snapHeldSheet(t, held, live, already); return; }
  const dateOf = (x) => (x.m && x.m.src === 'exif' && x.m.at ? x.m.at.slice(0, 10) : live ? today : '');
  const last = t.days.length ? t.days[t.days.length - 1].date : '', tid = encodeURIComponent(t.id);
  const dates = metas.map(dateOf).concat(clips.map((c) => c.at.slice(0, 10) || (live ? today : ''))).filter(Boolean);
  const newer = snapMoreDates(t.days.map((d) => d.date), dates);   // the book's gaps and dates close to either end (the server lays the days out again, renumbering what they hold)
  if (newer.length) {
    try { await api('POST', `/api/b/snap/${tid}/days`, { days: newer.map((date) => ({ date })) }); }
    catch (e) {   // a book with memories takes new days after its last one only
      const after = newer.filter((d) => d > last);
      if (e && e.error === 'order' && after.length) await api('POST', `/api/b/snap/${tid}/days`, { days: after.map((date) => ({ date })) }).catch(() => {});
    }
    await load().catch(() => {}); t = trip(t.id);
  }
  const groups = {}, nearOut = []; let out = 0;
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
    g.metas.quiet = true;   // one line below says it all
    g.metas.nearOut = nearOut; if (!screen) g.metas.near = false;   // a look-alike waits in the same sheet; one brought back from it is sent as it is
    await addPhotos(t, g.i, g.files, g.name ? { place: g.name } : null, g.metas);
  }
  let vout = 0;   // the clips, each on the day it was filmed (during the trip one with no time goes on today)
  for (const c of clips) {
    const date = c.at.slice(0, 10) || (live ? today : ''); let i = t.days.findIndex((d) => d.date === date);
    if (i < 0 && !live) { vout++; continue; }
    if (i < 0) i = date && date < t.days[0].date ? 0 : t.days.length - 1;
    await addVideo(t, i, c.file, c.ms, true);
  }
  // a day with no place yet takes the first place its photos name: the server then finds its library picture, stamp and town
  const named = {}; for (const g of Object.values(groups)) if (g.pl && !named[g.i] && !(t.days[g.i] || {}).place) named[g.i] = g.pl;
  for (const [i, pl] of Object.entries(named)) await api('PATCH', `/api/b/days/${encodeURIComponent(t.id)}/${i}`, { place: { th: pl.th, en: pl.en } }).catch(() => {});
  if (Object.keys(named).length) await load().catch(() => {});
  const vn = clips.length - vout, n = files.length - out - nearOut.length;   // a look-alike held in the sheet is not "added"
  const said = [n && L(`เติม ${n} รูปลงเล่มแล้ว`, `${n} photo${n > 1 ? 's' : ''} added`), vn && L(`${vn} คลิป`, `${vn} clip${vn > 1 ? 's' : ''}`),
    out + vout && L(`${out + vout} รูปหรือคลิปไม่รู้วันที่หรืออยู่นอกช่วงทริป ไม่ได้ใส่`, `${out + vout} with no date or from outside the trip — left out`),
    already && L(`ข้าม ${already} ที่มีในเล่มแล้ว`, `${already} already in the book`)].filter(Boolean).join(' · ');
  if (said) toast(said);
  safeRender();
  held = held.concat(nearOut);
  if (held.length) snapHeldSheet(t, held, live, 0);
}
/* What the screen set aside from photos added later or during the trip waits here, never sent: a tap picks one, "add the ones picked"
   sends those (not screened again); "no thanks" leaves them on the phone. */
let snapHeld = null;
function snapHeldSheet(t, held, live, already) {
  if (!held.length) { if (already) toast(L(`รูปที่เลือกมีในเล่มแล้วทั้งหมด`, 'Every photo picked is already in the book')); return; }
  if (snapHeld) snapHeld.urls.forEach((u) => URL.revokeObjectURL(u));
  const urls = held.map((h) => URL.createObjectURL(h.file));
  snapHeld = { t: t.id, live, held, urls, pick: new Set() };
  openSheet(`<h3>${L(`พักไว้ ${held.length} รูป ยังไม่ได้ส่งขึ้นเล่ม`, `${held.length} set aside — not sent`)}</h3>
<p class="sub">${esc(snapWhy(held.map((h) => h.why)).replace(/^./, (c) => c.toUpperCase()))} · ${L('แตะรูปที่จะเอาเข้าเล่ม', 'tap the ones to put in the book')}</p>
<span class="sdph sdpick snapheld">${held.map((h, k) => `<button type="button" class="sdpt off" data-a="snapheldpick" data-k="${k}" aria-pressed="false" aria-label="${esc(snapWhy([h.why]))}"><img src="${urls[k]}" alt="" loading="lazy"></button>`).join('')}</span>
<button type="button" class="btn wide" id="snapheldgo" data-a="snapheldadd" disabled>${L('เพิ่มรูปที่เลือก', 'Add the ones picked')}</button>
<button type="button" class="btn ghost wide" data-a="closesheet">${L('ไม่ต้อง', 'No thanks')}</button>`);
}
Object.assign(A, {
  snapheldpick(b) {   // in place: the sheet stays as it is
    if (!snapHeld) return; const k = +b.dataset.k, on = !snapHeld.pick.has(k); if (on) snapHeld.pick.add(k); else snapHeld.pick.delete(k);
    b.classList.toggle('kept', on); b.classList.toggle('off', !on); b.setAttribute('aria-pressed', String(on));
    const badge = b.querySelector('i'); if (on && !badge) b.insertAdjacentHTML('beforeend', '<i>✓</i>'); else if (!on && badge) badge.remove();
    const go = document.getElementById('snapheldgo'); if (go) { go.disabled = !snapHeld.pick.size; go.textContent = snapHeld.pick.size ? L(`เพิ่ม ${snapHeld.pick.size} รูปที่เลือก`, `Add the ${snapHeld.pick.size} picked`) : L('เพิ่มรูปที่เลือก', 'Add the ones picked'); }
  },
  snapheldadd() {
    const h = snapHeld; if (!h || !h.pick.size) return; const t = trip(h.t), files = [...h.pick].map((k) => h.held[k].file);
    closeSheet(); h.urls.forEach((u) => URL.revokeObjectURL(u)); snapHeld = null;
    if (t) snapLiveAdd(t, files, h.live, false);
  },
});
function snapLivePick(t, cam) {   // outside #app, like #fpick
  const id = cam ? 'snapin-cam' : 'snapin-live';
  let inp = document.getElementById(id);
  if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = id; inp.accept = cam ? 'image/*' : 'image/*,video/*'; inp.hidden = true; if (cam) inp.setAttribute('capture', 'environment'); else inp.multiple = true; document.body.append(inp); }
  inp.dataset.t = t.id; inp.value = ''; inp.click();
}
function snapMorePick(t) {   // a closed book from photos: more photos from the gallery, each to the day it was taken
  let inp = document.getElementById('snapin-more');
  if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'snapin-more'; inp.accept = 'image/*,video/*'; inp.multiple = true; inp.hidden = true; document.body.append(inp); }
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
  if (e.target.id === 'snapin-cam' || e.target.id === 'snapin-live') { const t = trip(e.target.dataset.t), fs = [...(e.target.files || [])]; if (t && fs.length) snapLiveAdd(t, fs, true, e.target.id === 'snapin-live'); return; }   // the camera's photo was taken just now, on purpose: not screened
  if (e.target.id === 'sebook' || (e.target.classList && e.target.classList.contains('sedt'))) { snapEditSave(e.target); return; }
  if (e.target.id === 'snapin-more') { const t = trip(e.target.dataset.t), fs = [...(e.target.files || [])]; if (t && fs.length) { toast(L(`กำลังอ่าน ${fs.length} รูป…`, `Reading ${fs.length} photos…`)); snapLiveAdd(t, fs, false); } return; }
  if (e.target.id === 'snaphere') { const t = trip(e.target.dataset.t), v = e.target.value.trim(); if (t) ls(snapHereKey(t), v ? { th: v, en: v, date: todayIn(t.timezone) } : null); }   // typed: a name, kept for today
});
/* ---------- P3: the helper drafts the book (docs/SNAP-BOOK.md D6; screens C1–C2) ----------
   #/t/<id>/draft: what to draft (the book's and the days' names, a summary a day, the foreword, a bedtime story a day), how many
   helper calls that takes, then the job's steps as they go (the job runs on the server: this page can be closed). */
const snapDraft = { opt: { photos: false, names: true, sums: true, fore: true, stories: false }, job: null, err: '', timer: 0 };   // photos: off until ticked (small copies of the photos go to the helper)
const snapDraftCalls = (t, o) => (o.photos && S.features.photoAi ? t.days.length : 0) + (o.names ? 1 : 0) + (o.sums ? t.days.length : 0) + (o.fore ? 1 : 0) + (o.stories ? t.days.length : 0);
function snapDraftPoll() {
  clearTimeout(snapDraft.timer);
  api('GET', '/api/b/snap/draft').then(async (r) => {
    const was = snapDraft.job && snapDraft.job.status; snapDraft.job = r.job;
    if (r.job && r.job.status === 'running') snapDraft.timer = setTimeout(snapDraftPoll, 1500);
    else if (was === 'running') await load();   // the names and texts the helper wrote
    safeRender();
  }).catch(() => { snapDraft.timer = setTimeout(snapDraftPoll, 4000); });
}
// what travels to the helper, said exactly — the photos only when the parents ticked them (small copies, never a position)
const snapDraftNote = (o) => (o.photos && S.features.photoAi
  ? snapNote('ผู้ช่วยได้รูปย่อขนาดเล็กของแต่ละวัน วัน เวลา ชื่อสถานที่ คำที่คุณจด และชื่อเล่นกับอายุของเด็ก ไม่รู้พิกัด', 'The helper gets small copies of each day’s photos, the dates, times, place names, what you wrote, and the children’s names and ages — never a position.')
  : snapNote('ผู้ช่วยรู้แค่วัน เวลา ชื่อสถานที่ คำที่คุณจด และชื่อเล่นกับอายุของเด็ก ไม่เห็นรูป ไม่รู้พิกัด', 'The helper only gets the dates, times, place names, what you wrote, and the children’s names and ages — no photos, no positions.'));
function viewSnapDraft(t) {
  // a running job shows on any phone; a finished one only on the phone that started it (a later visit offers the parts again)
  const job = snapDraft.job && snapDraft.job.trip === t.id && (snapDraft.job.status === 'running' || snapDraft.mine === t.id) ? snapDraft.job : null, o = snapDraft.opt, n = snapDraftCalls(t, o);
  if (!S.features.story) return emptyCard(t, L('ผู้ช่วยยังไม่ได้เปิดใช้', 'The helper is not switched on'), L('เขียนชื่อวันและเรื่องราวเองได้ในหน้าบันทึกของแต่ละวัน', 'Name the days and write their stories on each day’s record page'), [`#/t/${encodeURIComponent(t.id)}/book`, L('ไปที่เล่ม', 'Go to the book')]);
  if (!job && !snapDraft.asked) { snapDraft.asked = true; snapDraftPoll(); }   // a job may already be running for this book
  const stepName = (s) => (s.k === 'photos' ? L(`ดูรูปวันที่ ${s.day + 1}`, `Day ${s.day + 1}’s photos`) : s.k === 'names' ? L('ชื่อเล่มและชื่อของแต่ละวัน', 'The book’s and the days’ names') : s.k === 'fore' ? L('คำนำของเล่ม', 'The foreword')
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
    : `<a class="btn wide" href="#/t/${encodeURIComponent(t.id)}/draft/review">${L('ตรวจร่างทีละวัน', 'Check the draft, day by day')}</a><a class="linkbtn" href="#/t/${encodeURIComponent(t.id)}/book">${L('อ่านเล่ม', 'Read the book')}</a>`}</div>`;
  }
  const row = (k, th, en, sth, sen) => `<label class="snapopt"><span><b>${L(th, en)}</b>${sth ? `<small>${L(sth, sen)}</small>` : ''}</span><input type="checkbox" data-snapopt="${k}"${o[k] ? ' checked' : ''}></label>`;
  return `${pageHead('helper', PG.gold, L('เล่มจากรูป', 'A book from photos'), L('ให้ผู้ช่วยร่างเล่ม', 'Let the helper draft the book'), L('ผู้ช่วยเขียนร่างให้ทั้งเล่ม คุณแก้ได้ทุกบรรทัดก่อนพิมพ์', 'The helper drafts the whole book — you can change every line before printing'))}
<div class="snapopts">${S.features.photoAi ? row('photos', 'ให้ผู้ช่วยดูรูปก่อน', 'Let the helper look at the photos first', 'คำบรรยายรูป แท็ก และรูปโปรด ⭐ ของแต่ละวัน แล้วเขียนจากที่เห็น', 'Captions, tags and each day’s ⭐ — then it writes from what it saw') : ''}
${row('names', 'ชื่อเล่ม และชื่อของแต่ละวัน', 'The book’s and the days’ names', 'วันที่คุณตั้งชื่อเองแล้วจะไม่ถูกเปลี่ยน', 'A day you named yourself keeps its name')}
${row('sums', 'สรุปวันละ 2–3 ประโยค', 'Each day in 2–3 sentences', 'จากสถานที่ เวลา และคำที่คุณจดไว้', 'From the places, times and your notes')}
${row('fore', 'คำนำของเล่ม', 'The foreword')}
${row('stories', 'นิทานก่อนนอนของแต่ละวัน', 'A bedtime story for each day', 'ให้เด็กฟังในโหมดเด็ก', 'For the children in kid mode')}</div>
<div id="snapdnote">${snapDraftNote(o)}</div>
${snapDraft.err ? `<p class="notice">${esc(snapDraft.err)}</p>` : ''}
<div class="snapfoot"><button type="button" class="btn wide" data-a="snapdraft" data-t="${esc(t.id)}"${n ? '' : ' disabled'}>${L('เริ่มร่าง', 'Start the draft')}</button>
<small>${n ? L(`ใช้ผู้ช่วย ${n} ครั้ง`, `${n} helper call${n === 1 ? '' : 's'}`) : L('เลือกอย่างน้อยหนึ่งอย่าง', 'Pick at least one')}</small>
<a class="linkbtn" href="#/t/${encodeURIComponent(t.id)}/book">${L('ข้าม เขียนเอง', 'Skip — I’ll write it')}</a></div>`;
}
// C3 (docs/SNAP-BOOK.md): every word the helper drafted on one page — the book's name, the foreword, and each day's name, few lines and
// bedtime story — each box saves when left (the record page's own blur-save for the texts), a draft not yet kept carries "ร่างโดยผู้ช่วย"
// with "ใช้ร่างนี้", and "ใช้ร่างทุกอันเลย" keeps them all; changing a text keeps it too (the server clears the mark)
const snapDrafted = (t) => S.entries.filter((e) => e.trip === t.id && e.src === 'ai' && e.text);
function viewSnapReview(t) {
  const ent = (id) => S.entries.find((e) => e.id === id), tag = (e) => (e && e.src === 'ai' && e.text ? `<span class="aitag"><span>${ic('sparkle')}${L('ร่างโดยผู้ช่วย', 'Drafted by the helper')}</span><button type="button" class="linkbtn" data-a="snapkeep" data-v="${esc(e.id)}">${L('ใช้ร่างนี้', 'Keep this draft')}</button></span>` : '');
  const box = (kind, d, label, rows) => { const id = d === null ? `${t.id}.${kind}.all` : `${t.id}.${kind}.d${d}`, e = ent(id);
    return `<label class="flabel" for="rv-${esc(id)}">${label}</label>${tag(e)}<textarea id="rv-${esc(id)}" class="field" rows="${rows}" data-a-blur="${kind}" data-t="${esc(t.id)}"${d === null ? '' : ` data-d="${d}"`} data-draft="rv:${esc(id)}" placeholder="${L('ยังว่าง เขียนเองได้', 'Empty — write your own')}">${esc((e && e.text) || '')}</textarea>`; };
  const n = snapDrafted(t).length;
  return `${pageHead('review', PG.orange, L('เล่มจากรูป', 'A book from photos'), L('ตรวจร่าง', 'Check the draft'), L('แก้ได้ทุกช่อง ออกจากช่องแล้วบันทึกเอง', 'Change any box — it saves when you leave it'))}
${n ? `<button type="button" class="btn ghost wide" data-a="snapkeepall" data-t="${esc(t.id)}">${L(`ใช้ร่างทุกอันเลย (${n})`, `Keep every draft (${n})`)}</button>` : ''}
<section class="rvbook pz" style="--g1:${esc(t.theme.accent || '#4F7BFF')}">${((t.passport || {}).style || {}).crest ? `<img class="rvcrest" src="${esc(t.passport.style.crest)}" alt="">` : ''}<label class="flabel" for="rvtitle">${L('ชื่อเล่ม', 'Book name')}</label>
<input id="rvtitle" class="field" type="text" maxlength="120" data-snaprt="${esc(t.id)}" value="${esc(T(t.title))}">
${box('fore', null, L('คำนำ', 'Foreword'), 4)}</section>
${t.days.map((d, i) => `<details class="rvday pz"${i === 0 ? ' open' : ''} style="--g1:${esc((((t.passport || {}).days || [])[i] || {}).acc || snapPal(i))}"><summary>${dayArt(t, i) ? `<img class="rvn rvart" src="${esc(dayArt(t, i))}" alt="" loading="lazy" style="--tc:${esc((((t.passport || {}).days || [])[i] || {}).acc || t.theme.accent || '')}">` : `<span class="rvn" aria-hidden="true">${i + 1}</span>`}<span class="rvt"><b>${esc(T(d.title))}</b><small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}${d.place ? ' · ' + esc(T(d.place)) : ''}${snapDrafted(t).some((e) => e.day === i) ? ' · ' + L('มีร่างรอตรวจ', 'a draft to check') : ''}</small></span>${ic('chev', 'chv')}</summary>
<label class="flabel" for="rvd${i}">${L('ชื่อวัน', 'The day’s name')}</label><input id="rvd${i}" class="field" type="text" maxlength="80" data-snapdt="${i}" data-t="${esc(t.id)}" value="${esc(T(d.title))}">
${box('sum', i, L('สรุปวันนี้', 'The day in a few lines'), 3)}${box('story', i, L('นิทานก่อนนอน', 'Bedtime story'), 5)}</details>`).join('')}
<div class="snapfoot"><a class="btn wide" href="#/t/${encodeURIComponent(t.id)}/book">${L('อ่านเล่ม', 'Read the book')}</a></div>`;
}
if (typeof document !== 'undefined') document.addEventListener('focusout', (e) => {   // the review page's names save when left (the texts use saveBlur)
  const el = e.target, v = (el.value || '').trim(); if (!el.dataset) return;
  if (el.dataset.snaprt) { const t = trip(el.dataset.snaprt); if (t && v && v !== T(t.title)) api('PATCH', `/api/b/trips/${encodeURIComponent(t.id)}`, { title: { th: v, en: v } }).then(() => load()).catch(() => toast(L('ยังบันทึกไม่ได้ ต้องมีเน็ต', 'Not saved — you need a connection'))); }
  if (el.dataset.snapdt !== undefined) { const t = trip(el.dataset.t), i = +el.dataset.snapdt, d = t && t.days[i]; if (d && v && v !== T(d.title)) api('PATCH', `/api/b/days/${encodeURIComponent(t.id)}/${i}`, { title: { th: v, en: v } }).then(() => load()).catch(() => toast(L('ยังบันทึกไม่ได้ ต้องมีเน็ต', 'Not saved — you need a connection'))); }
});
Object.assign(A, {
  snapkeep(b) { const e = S.entries.find((x) => x.id === b.dataset.v), t = e && trip(e.trip); if (!t) return; putEntry(t, { day: e.day, kind: e.kind, text: e.text, lang: e.lang, accept: true }, e.id).then(() => safeRender()); },
  snapkeepall(b) { const t = trip(b.dataset.t); if (!t) return; Promise.all(snapDrafted(t).map((e) => putEntry(t, { day: e.day, kind: e.kind, text: e.text, lang: e.lang, accept: true }, e.id))).then(() => { toast(L('ใช้ร่างทั้งหมดแล้ว', 'Every draft kept')); safeRender(); }); },
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
    const nt = document.getElementById('snapdnote'); if (nt) nt.innerHTML = snapDraftNote(snapDraft.opt);   // the privacy line follows the photos tick
    if (t && sm && go) { const n = snapDraftCalls(t, snapDraft.opt); sm.textContent = n ? L(`ใช้ผู้ช่วย ${n} ครั้ง`, `${n} helper call${n === 1 ? '' : 's'}`) : L('เลือกอย่างน้อยหนึ่งอย่าง', 'Pick at least one'); go.disabled = !n; } }   // counted in place
});
if (typeof document !== 'undefined') document.addEventListener('input', (e) => {   // typed in place: no redraw under the finger
  if (e.target.id === 'snapname') { snapName = e.target.value; if (snapS) snapS.name = e.target.value; return; }
  if (e.target.id === 'snaptitle' && snapS) { snapS.name = e.target.value; return; }
  if (e.target.id === 'psq') {   // the sheet's search filters in place — as typed, or forgivingly when nothing matches as typed
    const q = e.target.value.trim().toLowerCase(), lis = [...document.querySelectorAll('.pslist li')].filter((li) => !li.classList.contains('psh'));
    const fz = fzFilter(lis.map((li) => li.textContent), q);
    lis.forEach((li, i) => { li.hidden = !!q && !fz.ok(i); }); return;
  }   // the sheet's search filters in place
  if (e.target.dataset && e.target.dataset.snapday && snapS) snapS.typed[e.target.dataset.snapday] = e.target.value;
});
