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
const SNAP_PICKS = [
  ['photos', 'image/*', false, 'คลังรูป', 'Photo library'],
  ['files', '', false, 'ไฟล์', 'Files'],
  ['camera', 'image/*', true, 'ถ่ายด้วยกล้องตอนนี้', 'Take one now'],
];
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
  const pick = SNAP_PICKS.find((p) => p[0] === run.via) || SNAP_PICKS[0];
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
  // Chrome on Android always says "Android 10" in its user agent; the real version comes from the client hints, once
  if (!snapT.platAsked && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) { snapT.platAsked = true;
    navigator.userAgentData.getHighEntropyValues(['platformVersion']).then((h) => { const pf = navigator.userAgentData.platform; if (pf && h.platformVersion) { snapT.plat = `${pf} ${h.platformVersion}`; render(); } }).catch(() => {}); }
  return `<h1>${L('ทดสอบรูปบนเครื่องนี้', 'Photo check on this phone')}</h1>
<p class="notice">${L('หน้านี้ใช้ทดสอบเล่มจากรูป: ดูว่ามือถืออ่านเวลาถ่ายและตำแหน่งจากรูปได้หรือไม่ ไม่มีรูปถูกส่งไปไหน และไม่แสดงพิกัด แสดงแค่ว่ามีหรือไม่มี',
    'A check for the book-from-photos idea: does this phone hand over when and where each photo was taken? Nothing is uploaded and no position is shown — only whether there is one.')}</p>
<p class="label">${esc(snapDevice())}</p>
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
  snapclear() { snapT.runs = []; snapT.geo = null; render(); },
});
if (typeof document !== 'undefined') document.addEventListener('change', (e) => {
  if (!e.target.classList || !e.target.classList.contains('snapin')) return;
  const files = [...(e.target.files || [])]; if (!files.length) return;
  const run = { via: e.target.dataset.v, files, rows: new Array(files.length).fill(null), ms: 0 }, t0 = performance.now();
  snapT.runs.push(run); snapT.busy = true; render();
  let last = 0;
  snapRead(files, (i, m) => { run.rows[i] = m; const now = performance.now(); if (now - last > 250) { last = now; snapDraw(); } })
    .then(() => { run.ms = performance.now() - t0; snapT.busy = false; render(); });
});
