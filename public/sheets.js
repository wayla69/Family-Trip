'use strict';
/* ===== Memory Bookshelf · actions, photos, lightbox, sheets, boot ===== */

/* ---------- writes (all through the offline queue) ---------- */
function putEntry(t, row, id) {
  const body = { trip: t.id, day: row.day, kind: row.kind, child: row.child || null, text: row.text || '', mood: row.mood || null, first_key: row.first_key || null, lang: row.lang || null, highlight: !!row.highlight, at: row.at || Date.now(), ...(row.accept ? { accept: true } : {}) };
  const cur = S.entries.find((e) => e.id === id), same = cur && cur.text === body.text, tr = same ? cur.tr || null : null;   // an edited text drops its translation (the server does the same)
  const src = same && !row.accept ? cur.src || null : null;   // the helper's draft mark: gone once the text changes or the parents keep the draft
  if (TEXTY.includes(body.kind) && cur && cur.v) body.base = cur.v;   // the version this phone edits from: a change from the other parent's phone since is told, not written over
  return enqueue({ method: 'PUT', url: '/api/b/entries/' + encodeURIComponent(id), body, local: { coll: 'entries', id, row: { ...body, tr, src, created_by: S.me.name, mine: true } } });
}
const delEntry = (id) => enqueue({ method: 'DELETE', url: '/api/b/entries/' + encodeURIComponent(id), local: { coll: 'entries', id, del: true } });
let spendCat = 'food', spendCur = '';   // the spend box remembers the last category / money while recording

// the day as a message for LINE or Messages: title and date, what they said, the favourite, the firsts — the photos travel
// along as files from this phone (never a link: nothing in the book has a public URL)
function shareText(t, i) {
  const d = t.days[i], es = entriesOf(t.id, i);
  const lines = [`${T(d.title)} · ${fmtDay(d.date)}`];
  es.filter((e) => e.kind === 'quote').forEach((e) => lines.push(`${kidName(e.child)}: “${e.text}”`));
  const fav = es.find((e) => e.kind === 'fav'); if (fav && fav.text) lines.push(`${L('ของโปรดวันนี้', 'Favourite today')}: ${fav.text}`);
  es.filter((e) => e.kind === 'first').forEach((e) => { const f = t.firsts.find((x) => x.key === e.first_key); lines.push(`🌟 ${kidName(e.child)} — ${e.first_key === 'custom' ? e.text : f ? T(f.label) : e.first_key}`); });
  return lines.join('\n');
}

// shrink on the phone before upload (saves mobile data); EXIF is stripped again on the server anyway
/* What a photo looks like, coarsely — the server's images.js phOf, worked out the same way on the phone: a 64×64 grey copy (drawn
   through 256 px so it is averaged, not sampled), the mean of each 4×4 block → 16×16 bytes as hex. Copies of one picture correlate
   above PH_NEAR; the server is asked before a photo is sent (POST /api/b/media/near). */
const PH_NEAR = 0.985;
function phOfBitmap(bmp) {
  try {
    const a = document.createElement('canvas'); a.width = 256; a.height = 256; const g = a.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(bmp, 0, 0, 256, 256);
    const c = document.createElement('canvas'); c.width = 64; c.height = 64; const h = c.getContext('2d', { willReadFrequently: true }); h.imageSmoothingQuality = 'high'; h.drawImage(a, 0, 0, 64, 64);
    const d = h.getImageData(0, 0, 64, 64).data, L = (i) => 0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]; let out = '';
    for (let by = 0; by < 16; by++) for (let bx = 0; bx < 16; bx++) {
      let s = 0; for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) s += L((by * 4 + y) * 64 + bx * 4 + x);
      out += Math.round(s / 16).toString(16).padStart(2, '0');
    }
    return out;
  } catch (_) { return ''; }
}
function phCorr(a, b) {   // the same as images.js phCorr
  if (!/^[0-9a-f]{512}$/.test(a || '') || !/^[0-9a-f]{512}$/.test(b || '')) return 0;
  const x = [], y = []; let mx = 0, my = 0;
  for (let i = 0; i < 256; i++) { x[i] = parseInt(a.substr(i * 2, 2), 16); y[i] = parseInt(b.substr(i * 2, 2), 16); mx += x[i]; my += y[i]; }
  mx /= 256; my /= 256; let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < 256; i++) { const dx = x[i] - mx, dy = y[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxx > 256 && syy > 256 ? sxy / Math.sqrt(sxx * syy) : 0;
}
async function shrinkPh(file) {   // → {blob: what is sent (≤ 2560 px JPEG), ph: what it looks like ('' when this browser cannot draw it)}
  let bmp;
  try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (_) { return { blob: file, ph: '' }; }   // e.g. HEIC the browser can't decode — the server converts it
  try {
    const ph = phOfBitmap(bmp), s = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
    if (s === 1 && file.type === 'image/jpeg' && file.size < 4e6) return { blob: file, ph };
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return { blob: await new Promise((res) => c.toBlob((b) => res(b || file), 'image/jpeg', 0.86)), ph };
  } catch (_) { return { blob: file, ph: '' }; } finally { if (bmp.close) bmp.close(); }
}
const shrink = async (file) => (await shrinkPh(file)).blob;
// spot (the record page's "where was it?" chips): { place: the stop's name, key + kind: the planned stop } — the photos carry the place,
// and a planned stop not yet checked in is checked in (a photo taken there says we went)
async function addPhotos(t, day, files, spot, metas) {
  const all = Array.from(files), pics = all.filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
  if (!pics.length) return 0;
  // the same file picked again (today, or on another page of the book): skipped — the book holds it already
  const fps = new Map(), seen = new Set(), list = [];
  for (const f of pics) { const m = metas && metas[all.indexOf(f)], fp = (m && m.fp) || await fileFp(f); if (fp && (seen.has(fp) || fpIn(t, fp))) continue; if (fp) seen.add(fp); fps.set(f, fp); list.push(f); }
  if (list.length < pics.length && !(metas && metas.quiet)) toast(L(`ข้าม ${pics.length - list.length} รูปที่มีในเล่มแล้ว`, `${pics.length - list.length} photo${pics.length - list.length > 1 ? 's are' : ' is'} already in the book`));
  if (!list.length) return 0;
  const place = String((spot && spot.place) || '').trim().slice(0, 120);
  if (place && spot.key && !S.places.some((x) => x.trip === t.id && x.key === spot.key)) {   // a chip with a key is a planned stop (a sight, a meal, a planned airport or hotel)
    const p = ((t.days[day] || {}).planned || []).find((x) => x.key === spot.key);
    if (p) await enqueue({ method: 'PUT', url: '/api/b/places', body: { trip: t.id, key: p.key, day, kind: p.kind || 'place', name: { en: p.en, th: p.th, zh: p.zh }, done: true, at: Date.now() },
      local: { coll: 'places', id: `${t.id}:${p.key}`, row: { trip: t.id, key: p.key, day, kind: p.kind || 'place', name: { en: p.en, th: p.th }, at: Date.now() } } });
  }
  if (!(metas && metas.quiet)) toast(L(`เตรียมรูป ${list.length} รูป…`, `Preparing ${list.length} photos…`));
  const send = async (x) => {
    const id = uid('ph'), f = x.f, m = x.m, fp = fps.get(f) || '';
    const at = x.shot && x.shot <= Date.now() + 864e5 ? x.shot : f.lastModified && Math.abs(f.lastModified - Date.now()) < 400 * 864e5 ? Math.min(f.lastModified, Date.now()) : Date.now();
    await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}${place ? '&place=' + encodeURIComponent(place) : ''}${fp ? '&fp=' + fp : ''}`, blob: x.blob,
      local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0, place, fp } } });
    if (m && m.star) await enqueue({ method: 'PATCH', url: '/api/b/media/' + id, body: { highlight: true }, local: { coll: 'media', id, row: { highlight: true } } });   // a book from photos: the best photo of the day, picked on the phone
    return id;
  };
  // twelve at a time: made small (and what each looks like worked out from the same drawing), then the server is asked which look like a
  // photo the book already holds — the same picture from the other parent's phone or over LINE (owner, Nov 2026) — and this pick's own
  // photos are compared too; a look-alike waits in a sheet ("add anyway"), the rest go. With no signal nothing is asked: all go.
  const check = !(metas && metas.near === false), mine = [], held = []; let sent = 0;
  for (let k = 0; k < list.length; k += 12) {
    const chunk = [];
    for (const f of list.slice(k, k + 12)) {
      // when it was taken: the photo's own clock (EXIF, read here before shrink() re-encodes it; snap.js), else the file's time
      const m = (metas && metas[all.indexOf(f)]) || (typeof snapMeta === 'function' ? await snapMeta(f).catch(() => null) : null);
      const shot = m && m.src === 'exif' ? snapWallMs(m.at, m.tz, t.timezone) : null;
      if (m) m.ll = null;   // a position is never used here
      const s = await shrinkPh(f); chunk.push({ f, m, shot, blob: s.blob, ph: s.ph });
    }
    const twin = new Map();
    if (check && chunk.some((x) => x.ph) && navigator.onLine !== false) {
      try { const r = await api('POST', '/api/b/media/near', { trip: t.id, ph: chunk.map((x) => x.ph || '') }); for (const n of r.near || []) twin.set(n.i, { id: n.id }); } catch (_) { /* not asked: they go */ }
    }
    for (const [i, x] of chunk.entries()) {
      if (check && !twin.has(i) && x.ph) { const o = mine.find((y) => phCorr(y.ph, x.ph) >= PH_NEAR); if (o) twin.set(i, { id: o.id, blob: o.blob }); }   // twice in this very pick
      if (twin.has(i)) { held.push({ ...x, twin: twin.get(i) }); continue; }
      const id = await send(x); sent++; if (x.ph) mine.push({ ph: x.ph, id, blob: x.blob });
    }
  }
  if (held.length) {
    if (metas && metas.quiet) { if (Array.isArray(metas.nearOut)) metas.nearOut.push(...held.map((h) => ({ file: h.f, why: 'near' }))); }   // the caller has its own sheet
    else nearSheet(t, held, send);
  }
  return sent;
}
/* "This looks like a photo already in the book": each held photo beside the one it looks like; a tap picks it, "add anyway" sends
   those picked, "no thanks" leaves them on the phone */
let nearHeld = null;
/* Two parents, one text (owner, Nov 2026: "พ่อแม่แก้พร้อมกันสองเครื่อง"; migration 0032): when the other phone changed a kid's words,
   a note, a summary, the foreword, the letter or a caption since this phone started editing, the server answers 409 conflict with that
   version (core.js flush keeps it in `conflicts`); this sheet shows both, one at a time — keep mine (sent again with force) or theirs. */
function conflictSheet() {
  const c = conflicts[0]; if (!c) return;
  const mine = c.op.body.text !== undefined ? c.op.body.text : c.op.body.caption, when = c.current.at ? new Date(c.current.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
  openSheet(`<h3>${L('ข้อความนี้ถูกแก้จากอีกเครื่อง', 'This was changed on another phone')}</h3>
<p class="sub">${L('เก็บอันไหนไว้ดี อีกอันจะหายไป', 'Which one stays? The other goes')}${conflicts.length > 1 ? L(` · อีก ${conflicts.length - 1} ข้อความ`, ` · ${conflicts.length - 1} more`) : ''}</p>
<div class="cflist"><div class="cfv"><b>${L('ของอีกเครื่อง', 'The other phone')}${c.current.by ? ` · ${esc(c.current.by)}` : ''}</b>${when ? `<small>${esc(when)}</small>` : ''}<p>${esc(c.current.text) || `<i>${L('(ว่าง)', '(empty)')}</i>`}</p></div>
<div class="cfv mine"><b>${L('ของเครื่องนี้', 'This phone')}</b><p>${esc(mine) || `<i>${L('(ว่าง)', '(empty)')}</i>`}</p></div></div>
<button type="button" class="btn wide" data-a="cfkeep" data-v="mine">${L('เก็บของเครื่องนี้', 'Keep this phone’s')}</button>
<button type="button" class="btn ghost wide" data-a="cfkeep" data-v="theirs">${L('เก็บของอีกเครื่อง', 'Keep the other phone’s')}</button>`);
}
function nearSheet(t, held, send) {
  if (nearHeld) nearHeld.urls.forEach((u) => URL.revokeObjectURL(u));
  const urls = [], src = (b) => { const u = URL.createObjectURL(b); urls.push(u); return u; };
  const rows = held.map((h, k) => `<button type="button" class="nearpair off" data-a="nearpick" data-k="${k}" aria-pressed="false"><img src="${src(h.blob)}" alt="${L('รูปใหม่', 'New photo')}"><span aria-hidden="true">≈</span><img src="${h.twin.blob ? src(h.twin.blob) : `/media/${encodeURIComponent(h.twin.id)}/t`}" alt="${L('รูปที่มีในเล่ม', 'Photo in the book')}"></button>`).join('');
  nearHeld = { t: t.id, held, send, urls, pick: new Set() };
  openSheet(`<h3>${L(`${held.length} รูปเหมือนรูปที่มีในเล่มแล้ว`, `${held.length} look${held.length === 1 ? 's' : ''} like a photo already in the book`)}</h3>
<p class="sub">${L('อาจเป็นรูปเดียวกันจากอีกเครื่อง หรือที่ส่งต่อทาง LINE ยังไม่ได้ส่งขึ้นเล่ม แตะคู่ที่ไม่ใช่รูปเดียวกันเพื่อเพิ่ม', 'Perhaps the same picture from the other phone, or sent over LINE — not sent yet. Tap a pair that is not the same picture to add it')}</p>
<div class="nearlist">${rows}</div>
<button type="button" class="btn wide" id="neargo" data-a="nearadd" disabled>${L('เพิ่มอยู่ดี', 'Add anyway')}</button>
<button type="button" class="btn ghost wide" data-a="closesheet">${L('ไม่ต้อง', 'No thanks')}</button>`);
}

/* ---------- voice memos: a few seconds of the kids' own voices, recorded on the phone (MediaRecorder) and queued exactly like a
   photo (blob upload, retried offline). 30 s cap. The clip stays in our bucket; it never goes to Claude or anywhere else. */
let recState = null, kidAudioEl = null;
async function startRec(t, day, about) {   // about: the photo a child is telling the story of (kid mode)
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (_) { toast(L('ไม่ได้รับอนุญาตให้ใช้ไมค์', 'Microphone not allowed')); return; }
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((m) => MediaRecorder.isTypeSupported(m)) || '';
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined), chunks = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = async () => {
    stream.getTracks().forEach((x) => x.stop());
    const st = recState; recState = null; clearInterval(st.timer);
    const secs = Math.round((Date.now() - st.started) / 1000), type = (rec.mimeType || mime || 'audio/webm').split(';')[0];
    const blob = new Blob(chunks, { type });
    if (blob.size < 1000 || secs < 1) { toast(L('สั้นเกินไป ลองอัดใหม่', 'Too short — try again')); safeRender(); return; }
    await addClip(t, day, blob, secs, about); safeRender();   // never over a field being typed in (the 30 s cap stops the recorder by itself)
  };
  recState = { rec, stream, started: Date.now(), timer: setInterval(() => { const el = $('#rectime'), sec = Math.round((Date.now() - recState.started) / 1000); if (el) el.textContent = `0:${String(sec).padStart(2, '0')}`; if (sec >= 30) stopRec(); }, 250) };
  rec.start(); render();
}
function stopRec() { if (recState && recState.rec.state !== 'inactive') recState.rec.stop(); }
// a video clip from the phone's gallery: sent as it is (the server cuts it to its first 30 s, makes it small and drops where it was
// filmed — server/video.js), queued like a photo so no signal only means later. The phone reads how long it is first, to say so.
const VID_MAX = 400e6;
async function addVideo(t, day, file, shotAt, quiet) {   // shotAt: when it was filmed (a book from photos reads it from the clip); quiet: the caller says one line for many
  if (!file || !t) return;
  if (file.size > VID_MAX) { toast(L('คลิปใหญ่เกินไป (เกิน 400 MB) เลือกคลิปที่สั้นกว่านี้', 'This clip is over 400 MB — pick a shorter one')); return false; }
  const fp = await fileFp(file);
  if (fpIn(t, fp)) { if (!quiet) toast(L('คลิปนี้มีในเล่มแล้ว', 'This clip is already in the book')); return false; }
  const secs = quiet ? NaN : await new Promise((res) => { const v = document.createElement('video'), u = URL.createObjectURL(file); v.preload = 'metadata'; v.muted = true;
    const done = (x) => { URL.revokeObjectURL(u); res(x); }; v.onloadedmetadata = () => done(v.duration); v.onerror = () => done(NaN); setTimeout(() => done(NaN), 8000); v.src = u; });
  const id = uid('vd'), at = shotAt && shotAt <= Date.now() + 864e5 ? shotAt : file.lastModified && Math.abs(file.lastModified - Date.now()) < 400 * 864e5 ? Math.min(file.lastModified, Date.now()) : Date.now();
  const type = ['video/mp4', 'video/quicktime', 'video/webm', 'video/3gpp', 'video/x-m4v'].includes(file.type) ? file.type : 'video/mp4';   // the server reads what it really is
  await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}&kind=video${fp ? '&fp=' + fp : ''}`, blob: file.type === type ? file : new Blob([file], { type }),
    local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0, mime: type, fp } } });
  if (!quiet) toast(secs > 31 ? L('เก็บ 30 วินาทีแรกของคลิปนี้', 'The first 30 s of this clip will be kept') : L('เพิ่มคลิปแล้ว', 'Clip added'));
  return true;
}
async function addClip(t, day, blob, secs, about) {
  const id = uid('vc'), at = Date.now(), type = blob.type || 'audio/webm';
  await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}&kind=audio${about ? '&about=' + encodeURIComponent(about) : ''}`, blob,
    local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0, mime: type, place: about ? 'photo:' + about : '' } } });
  if (!about) toast(L(`เก็บเสียง ${secs} วินาทีแล้ว`, `${secs} s of voice saved`));
}

/* ---------- a book from a PDF (#/import): page state, polling, upload ---------- */
let imp = { list: null, job: null, slug: '', err: '', file: null, timer: null };
// the library of places to eat: the helper fills a town (one call with a web check); the page and the planner's route read it again
async function eatFill(town, th, where) {
  if (eatLib.busy) return '';
  eatLib.busy = town; eatLib.err = ''; pln.err = ''; render();
  let tk = '';
  try { const r = await api('POST', '/api/b/eatlib/fill', { town, town_th: th, where }); tk = r.tkey || ''; eatLib.towns = null; eatLib.places = null; eatLib.town = ''; eatRoute = { key: '', list: null }; toast(L(`เพิ่ม ${r.added} ร้านเข้าคลังแล้ว`, `${r.added} places added to the library`)); }
  catch (e) { const m = { limit: L('ผู้ช่วยใช้ครบโควตาวันนี้แล้ว ลองพรุ่งนี้', "Today's helper allowance is used up — try tomorrow"), busy: L('ผู้ช่วยกำลังหาร้านของอีกเมืองอยู่ รอสักครู่', 'The helper is finding places for another town — wait a moment'), json: L('คำตอบอ่านไม่ได้ ลองอีกครั้ง', 'Unreadable answer — try again'), refusal: L('ผู้ช่วยหาร้านให้ไม่ได้', 'The helper could not find places'), ai: L('ผู้ช่วยยังไม่ได้เปิดใช้', 'The helper is not switched on'), town: L('พิมพ์ชื่อเมืองก่อน', 'Type the town first') }[e.error] || L('หาร้านไม่สำเร็จ ลองอีกครั้ง', 'Could not find places — try again'); eatLib.err = m; pln.err = route().parts[0] === 'planner' ? m : ''; }
  finally { eatLib.busy = ''; render(); }
  return tk;
}
// plan with the helper: the plan lives on this phone (ls plan / planRoute) and, once it has a route, on the family's server too
// (PUT /api/b/planner/plans/:id, 1.5 s after the last change) so the other parent's phone can open it
let planSaveT = null;
const planBare = () => { if (!pln.route) return null; const { facts, budget, ...r } = pln.route; return r; };   // the app's own facts and budget never travel back
function planKeepA() { ls('plan', pln.a); planSaveSoon(); }
function planKeep() { ls('plan', pln.a); ls('planRoute', pln.route); planSaveSoon(); }
function planSaveSoon() {
  if (!pln.route) return;
  if (!pln.id) { pln.id = `pl${Math.random().toString(36).slice(2, 12)}00000`.slice(0, 12); ls('planId', pln.id); }
  clearTimeout(planSaveT); planSaveT = setTimeout(() => { planSaveT = null; planSave(); }, 1500);
}
async function planSave() {
  if (!pln.route || !pln.id) return;
  const id = pln.id, row = { id, by: '', answers: pln.a, route: pln.route };
  try {
    const r = await api('PUT', `/api/b/planner/plans/${id}`, { answers: pln.a, route: planBare() });
    if (pln.id === id) { pln.at = r.at; ls('planAt', r.at); }
    row.at = r.at; pln.plans = [row, ...(pln.plans || []).filter((p) => p.id !== id)];
  } catch (_) { /* no signal: the plan is still on this phone, the next change saves it */ }
}
// the other parent changed this plan on their phone: take theirs, unless this phone has a change still waiting to be sent
function planAdopt() {
  const p = (pln.plans || []).find((x) => x.id === pln.id);
  if (!p || planSaveT || !(p.at > (pln.at || 0))) return;
  pln.a = { ...pln.a, ...p.answers }; pln.route = p.route; pln.at = p.at; ls('plan', pln.a); ls('planRoute', pln.route); ls('planAt', p.at);
}
function planSpan() {   // the "6 days, 5 nights" line and the length chips, in place
  const a = pln.a, n = plDays(a) || (a.from ? 0 : a.len), el = $('#plspan'); if (el) el.textContent = plSpan(n);
  $$('.pllens .plchip').forEach((x) => x.setAttribute('aria-pressed', +x.dataset.v === n ? 'true' : 'false'));
}
// a change made by hand to the route's days (move, add, remove): the old route is kept for one undo, the dates laid out again
function planEdit(fn) {
  if (!pln.route || pln.busy) return;
  pln.prev = JSON.parse(JSON.stringify(pln.route));
  const rt = pln.route; fn(rt.days);
  rt.days.forEach((d, i) => { d.date = plAdd(rt.from, i); }); rt.to = rt.days[rt.days.length - 1].date;
  if (pln.a.from) pln.a.to = rt.to;
  pln.edit = -1; planKeep(); render();
}
// the route call (a draft, two to compare, or a change asked in words); a change keeps the old route for one undo
async function planCall(body) {
  if (pln.busy) return;
  if (!String(pln.a.dest || '').trim()) { pln.err = L('บอกก่อนว่าอยากไปที่ไหน', 'Say where to first'); if (!$('#pldest')) { location.hash = '#/planner/where'; return; } render(); const d = $('#pldest'); if (d) d.focus(); return; }   // asked from a later page: back to "where"
  const old = pln.route;
  pln.busy = 'route'; pln.err = ''; render();
  try {
    const r = await api('POST', '/api/b/planner/route', body);
    if (r.routes) { pln.alts = r.routes; pln.route = null; ls('planRoute', null); }
    else { pln.route = r.route; pln.alts = null; pln.prev = body.ask && old ? old : null; pln.open = false; pln.edit = -1; planKeep(); }
    pln.ask = '';
  }
  catch (e) { pln.err = planErr(e); }
  finally { pln.busy = ''; render(); }
  const el = $(pln.alts ? '.plalts' : '#plroute'); if (el && (pln.route || pln.alts) && !pln.err) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// the web check's job: asked every 3 s while it runs on this page; when it ends the state is loaded again (the answers live on the book)
let vfTimer = null;
function vfPoll() {
  if (vfTimer) return;
  vfTimer = setInterval(async () => {
    let r; try { r = await api('GET', '/api/b/planner/verify'); } catch (_) { return; }
    vfState = r;
    if (r.status !== 'running') { clearInterval(vfTimer); vfTimer = null; if (r.status === 'done') { await load(); toast(L('เช็กเสร็จแล้ว', 'The check is done')); } }
    if (route().parts[2] === 'check') safeRender();
  }, 3000);
}
const dchErr = (e) => ({ limit: L('ผู้ช่วยใช้ครบโควตาวันนี้แล้ว ลองพรุ่งนี้', "Today's helper allowance is used up — try tomorrow"), seed: L('เล่มนี้มากับแอป เปลี่ยนแผนในแอปไม่ได้', 'This book came with the app — its plan cannot be changed here'), privacy: L('แผนใหม่มีข้อมูลส่วนตัว จึงไม่ใช้ ลองอีกครั้ง', 'The new plan held private details — not used, try again'), json: L('คำตอบอ่านไม่ได้ ลองอีกครั้ง', 'Unreadable answer — try again'), day: L('แผนใหม่อ่านไม่ได้ ลองอีกครั้ง', 'The new plan could not be read — try again'), refusal: L('ผู้ช่วยเปลี่ยนวันนี้ไม่ได้', 'The helper could not change this day'), none: L('ไม่มีแผนเดิมให้กลับไป', 'No old plan to go back to') }[e && e.error] || L('ส่งไม่สำเร็จ ลองอีกครั้ง', 'Could not send — try again'));
const planErr = (e) => ({ limit: L('ผู้ช่วยใช้ครบโควตาวันนี้แล้ว ลองพรุ่งนี้', "Today's helper allowance is used up — try tomorrow"), month: L('เดือนนี้เขียนครบแล้ว เขียนได้อีกเดือนหน้า', "This month's books are written — next month"), busy: L('ผู้ช่วยกำลังเขียนอีกเล่มอยู่ รอให้เสร็จก่อน', 'The helper is writing another book — wait for it to finish'), dest: L('บอกก่อนว่าอยากไปที่ไหน', 'Say where to first'), days: L('ทริปยาวได้ไม่เกิน 31 วัน', 'A trip can be 31 days at most'), route: L('เส้นทางอ่านไม่ได้ ลองให้ผู้ช่วยร่างใหม่', 'The route could not be read — ask for a new one'), json: L('คำตอบอ่านไม่ได้ ลองอีกครั้ง', 'Unreadable answer — try again'), refusal: L('ผู้ช่วยวางแผนทริปนี้ไม่ได้', 'The helper could not plan this trip'), ai: L('ผู้ช่วยยังไม่ได้เปิดใช้', 'The helper is not switched on') }[e && e.error] || L('ส่งไม่สำเร็จ ลองอีกครั้ง', 'Could not send — try again'));
/* a book's film (server/reel.js): one at a time on the server; this phone follows the one it started */
let reelJob = null, reelTimer = null;
function reelPoll() {
  clearTimeout(reelTimer);
  reelTimer = setTimeout(async () => {
    let j = null; try { j = (await api('GET', '/api/b/reel')).job; } catch (_) { reelPoll(); return; }
    reelJob = j;
    if (j && j.state === 'run') { const el = document.getElementById('reelpct'); if (el) el.textContent = `${j.pct || 0}%`; reelPoll(); return; }
    if (j && j.state === 'done') { await load().catch(() => {}); if (/^year:/.test(j.trip)) { YEAR.reels = { ...(YEAR.reels || {}), [j.trip.slice(5)]: j.reel }; } toast(/^year:/.test(j.trip) ? L('คลิปทั้งปีเสร็จแล้ว 🎬', 'The year’s film is ready 🎬') : L('คลิปสรุปทริปเสร็จแล้ว 🎬', 'The trip film is ready 🎬')); }
    else if (j && j.state === 'error') toast(L('ทำคลิปไม่สำเร็จ ลองอีกครั้ง', 'The film could not be made — try again'));
    safeRender();
  }, 2500);
}
let artTimer = null, artWant = null;   // the book this phone asked for (the server has one job at a time, maybe another book's)
// why a drawing did not start, in the parents' words
const artWhy = (code, err) => (code === 409 && err === 'own' ? L('เล่มนี้มีรูปวาดของตัวเองแล้ว', 'This book has its own drawings')
  : code === 409 ? L('ผู้ช่วยกำลังวาดเล่มอื่นอยู่', 'The helper is busy with another book')
  : code === 429 && err === 'runs' ? L('เล่มนี้วาดใหม่ครบจำนวนแล้ว', 'This book has had all its redraws')
  : code === 429 ? L('โควตาผู้ช่วยวันนี้ไม่พอสำหรับทั้งเล่ม ลองพรุ่งนี้', "Today's helper allowance can't carry the whole book — try tomorrow")
  : code === 503 ? L('ผู้ช่วยยังไม่เปิด', 'The helper is not switched on') : L('เริ่มวาดไม่ได้', 'Could not start'));
async function artPoll() {
  if (artTimer) return;
  artTimer = setInterval(async () => {
    let j; try { j = await api('GET', '/api/b/art'); } catch (_) { return; }
    artJob = j.status === 'idle' ? null : j;
    if (!artJob || artJob.status !== 'running') {
      clearInterval(artTimer); artTimer = null;
      if (artJob && artJob.trip !== artWant) { safeRender(); return; }   // another book's job: not this phone's news
      if (artJob && artJob.status === 'done') { toast(L('วาดรูปประจำเล่มเสร็จแล้ว ✨', "The book's pictures are drawn ✨")); try { await load(); } catch (_) {} }
      else if (artJob) toast(artJob.error === 'refused' ? L('ผู้ช่วยไม่วาดภาพนี้ให้', 'The helper declined this picture') : L('วาดไม่สำเร็จ ลองใหม่ได้', 'Drawing failed — try again'));
    }
    safeRender();
  }, 3000);
}
async function impRefresh() {
  try { const r = await api('GET', '/api/b/import'); imp.list = r.drafts; imp.job = r.job; }
  catch (_) { imp.list = []; }
  if (imp.job && imp.job.status === 'running') { if (!imp.timer) imp.timer = setInterval(() => { if (route().parts[0] === 'import') impRefresh(); else { clearInterval(imp.timer); imp.timer = null; } }, 3000); }
  else if (imp.timer) { clearInterval(imp.timer); imp.timer = null; }
  if (route().parts[0] === 'import') safeRender();
}
/* ---------- actions ---------- */
// the family's taste (#/taste): kept on S.family at once, sent 700 ms after the last tap (one save for a run of taps)
let tasteT = 0;
function tasteSave(t) {
  if (S && S.family) S.family.taste = cleanTaste(t);
  clearTimeout(tasteT);
  tasteT = setTimeout(() => api('PATCH', '/api/b/family/profile', { taste: S.family.taste }).then((r) => { if (r && r.family && S.family) S.family.taste = r.family.taste; }, () => toast(L('บันทึกไม่สำเร็จ ลองใหม่', 'Could not save — try again'))), 700);
}
const A = {
  lang(b) { lang = b.dataset.v; ls('lang', lang); render(); if (ls('remind')) pushSub().then((s) => s && api('POST', '/api/b/push/sub', { ...s.toJSON(), lang })).catch(() => {}); },   // reminders follow the language
  fs(b) {   // text size: normal → large → larger → largest (the page content zooms; the bars stay put) — a value from the shelf's four Aa, else the sign-in page's one Aa cycles
    const n = b && b.dataset.v !== undefined ? +b.dataset.v : ((+ls('fs') || 0) + 1) % 4; ls('fs', n); document.documentElement.dataset.fs = String(n);
    $$('.fsb').forEach((x) => { x.dataset.l = n; });
    $$('.fsseg button').forEach((x) => x.setAttribute('aria-pressed', String(+x.dataset.v === n)));   // in place: no re-render
    const nm = $('#fsname'); if (nm) nm.textContent = L(FS_NAMES[n][0], FS_NAMES[n][1]);
    toast(L(`ขนาดตัวอักษร: ${FS_NAMES[n][0]}`, `Text size: ${FS_NAMES[n][1].toLowerCase()}`));
  },
  dayfull(b) {   // Today's plan short (a tap opens a step or a box) or in full (everything open) — in place; the address keeps it (/full)
    const f = b.dataset.v === '1';
    $$('.tl.plan.brief > li').forEach((li) => { const d = li.querySelector(':scope > [aria-expanded]'); if (d) { li.classList.toggle('open', f); d.setAttribute('aria-expanded', String(f)); } });
    $$('details.dfold, details.dmore').forEach((x) => { x.open = f; });
    $$('.dfoot').forEach((x) => { x.hidden = !f; });   // the manual's footnote belongs to the full view
    $$('.dayseg button').forEach((x) => x.setAttribute('aria-pressed', String((x.dataset.v === '1') === f)));
    $$('.daystrip a').forEach((a) => a.setAttribute('href', a.getAttribute('href').replace(/\/full$/, '') + (f ? '/full' : '')));
    const cur = $('.daystrip a[aria-current=true]'); if (cur) history.replaceState(null, '', cur.getAttribute('href'));
  },
  repmode(b) {   // the report short (headlines, detail on a tap) or in full (every detail open) — in place, kept on this phone
    const f = b.dataset.v === '1'; ls('repfull', f);
    $$('details.ifold').forEach((d) => { d.open = f; });
    $$('.tp.full').forEach((x) => x.classList.toggle('repall', f));
    $$('.repseg button').forEach((x) => x.setAttribute('aria-pressed', String((x.dataset.v === '1') === f)));
  },
  findwho(b) { findWho = b.dataset.v; $$('[data-a="findwho"]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === findWho))); const r = $('#findres'); if (r) r.innerHTML = findResults(); },
  findfirst(b) { findFirsts = !findFirsts; b.setAttribute('aria-pressed', String(findFirsts)); const r = $('#findres'); if (r) r.innerHTML = findResults(); },
  sq(b) { bookQ = b.dataset.v; const i = $('#bookq'), r = $('#bookres'), t = trip(route().parts[1]); if (i) i.value = bookQ; if (r && t) r.innerHTML = bookResults(t); },   // a suggestion chip
  eatgo(b) { eatTrip = b.dataset.t; eatQ = b.dataset.v; eatKind = -1; eatPick = false; location.hash = `#/t/${encodeURIComponent(b.dataset.t)}/eat/all`; },   // a place found by the search: open the list filtered to it
  async remind() {
    if (ls('remind')) {
      const s = await pushSub().catch(() => null);
      if (s) { await api('POST', '/api/b/push/unsub', { endpoint: s.endpoint }).catch(() => {}); await s.unsubscribe().catch(() => {}); }
      ls('remind', null); render(); toast(L('ปิดการเตือนบนเครื่องนี้แล้ว', 'Reminders off on this phone')); return;
    }
    if (!pushOk()) {
      const ios = isIOS() && !matchMedia('(display-mode: standalone)').matches;
      toast(ios ? L('บน iPhone/iPad: กดปุ่มแชร์ → "เพิ่มไปยังหน้าจอโฮม" แล้วเปิดแอปจากไอคอน จึงจะเปิดการเตือนได้', 'On iPhone/iPad: Share → "Add to Home Screen", open the app from its icon, then turn reminders on')
        : L('เบราว์เซอร์นี้ยังไม่รองรับการแจ้งเตือน', 'This browser cannot show reminders')); return;
    }
    if (await Notification.requestPermission() !== 'granted') { toast(L('ต้องกด "อนุญาต" การแจ้งเตือนก่อน', 'Allow notifications first')); return; }
    try {
      const { key } = await api('GET', '/api/b/push/key'), reg = await navigator.serviceWorker.ready;
      const s = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(key) }));
      await api('POST', '/api/b/push/sub', { ...s.toJSON(), lang });
      ls('remind', 1); render(); if (!isEditor()) { toast(L('เปิดแล้ว ✓ ตอนค่ำของวันที่มีรูปใหม่ จะมีแจ้งเตือน', 'On ✓ — you will hear in the evening of a day with new photos')); return; } toast(L('เปิดการเตือนแล้ว ✓ จะเด้งก่อนทุกกิจกรรม 30 นาที · ทดสอบหรือปิดได้ที่หน้า "ใช้ตอนไม่มีเน็ต"', 'Reminders on ✓ — 30 min before each step · test or turn off on the Offline page'));
    } catch (_) { toast(L('เปิดการเตือนไม่สำเร็จ ลองอีกครั้ง', 'Could not turn reminders on — try again')); }
  },
  // the setup steps: skip them for good (the shelf's welcome card still leads back) · "not now" on the reminders step
  startskip() { ls('startDone', 1); nav('#/'); },
  // the passport before the trip: open that day's mission (the others fold) and go to it
  ppedit() { ppEditOn = !ppEditOn; render(); },   // the passport's ✏️: a parent opens the boxes and ticks of the book (never in kid mode)
  mday(b) { mdayPick[b.dataset.t] = +b.dataset.v; render(); const el = $('#m' + b.dataset.v); if (el) el.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); },
  // the sample book: made for this family on request; opens its menu (already there: just opens it)
  async sample(b) {
    b.disabled = true;
    try { const r = await api('POST', '/api/b/sample'); ls('startDone', 1); await load(); nav('#/t/' + r.id); toast(L('เล่มตัวอย่างอยู่บนชั้นแล้ว ลบได้ทุกเมื่อจากท้ายเมนูเล่ม', 'The sample book is on the shelf — delete it any time from the foot of its menu')); }
    catch (e) { b.disabled = false; if (e.code === 409) { nav('#/t/sakura-hop-2028'); return; } toast(L('สร้างไม่สำเร็จ ลองใหม่', 'Could not make it — try again')); }
  },
  // delete a book the family made (never a bundled one): two taps, then everything in it goes
  async tripdel(b) {
    const t = trip(b.dataset.t); if (!t) return;
    if (!armed(b, L('แตะอีกครั้งเพื่อลบทั้งเล่ม รูปและบันทึกในเล่มหายด้วย', 'Tap again to delete the whole book — its photos and records go too'))) return;
    b.disabled = true;
    try { await api('DELETE', '/api/b/trips/' + encodeURIComponent(t.id)); await load(); nav('#/'); toast(L('ลบเล่มแล้ว', 'Book deleted')); }
    catch (_) { b.disabled = false; toast(L('ลบไม่สำเร็จ ลองใหม่', 'Could not delete — try again')); }
  },
  // the book menu's tile look, for the whole family: applied at once, saved in the profile
  tiles(b) { const v = b.dataset.v; if (S.family) S.family.tiles = v; render(); api('PATCH', '/api/b/family/profile', { tiles: v }).catch(() => toast(L('บันทึกไม่สำเร็จ ลองใหม่', 'Could not save — try again'))); },
  // delete everything (privacy page): the typed app name is the confirmation; afterwards this phone is signed out and wiped
  async erase(b) {
    const msg = $('#erasemsg'), typed = ($('#erasetxt') || {}).value || '';
    if (typed.trim() !== appName()) { msg.textContent = L('พิมพ์ชื่อแอปให้ตรงก่อน', 'Type the app’s name exactly first'); return; }
    if (!armed(b, L('แตะอีกครั้งเพื่อลบทั้งหมด กู้คืนไม่ได้', 'Tap again to delete everything — this cannot be undone'))) return;
    b.disabled = true; msg.textContent = L('กำลังลบ…', 'Deleting…');
    try {
      await api('POST', '/api/b/family/erase', { confirm: typed.trim() });
      try { await api('POST', '/api/logout'); } catch (_) {}
      await idb.set('state', null); ls('state', null); ls('lostTel', null); ls('brand', null); ls('startDone', null); ls('remind', null); ls('remindLater', null); BRAND = null; eraseTyped = '';
      S = null; location.hash = '#/'; render(); toast(L('ลบข้อมูลทั้งหมดแล้ว', 'Everything has been deleted'));
    } catch (e) { b.disabled = false; msg.textContent = e.code === 400 ? L('ชื่อแอปไม่ตรง', 'The name does not match') : L('ลบไม่สำเร็จ ลองใหม่', 'Could not delete — try again'); }
  },
  startlater() { ls('remindLater', 1); nav('#/start/5'); },
  remindlater() { ls('remindLater', 1); render(); toast(L('เปิดได้ทีหลังที่หน้า "วันนี้" หรือ "ใช้ตอนไม่มีเน็ต"', 'You can turn them on later from Today or the no-signal page')); },
  async remindtest() {
    const s = await pushSub().catch(() => null);
    if (!s) { ls('remind', null); render(); toast(L('เครื่องนี้ยังไม่ได้เปิดการเตือน', 'Reminders are not on for this phone')); return; }
    try { await api('POST', '/api/b/push/test', { endpoint: s.endpoint }); toast(L('ส่งแล้ว — ดูแจ้งเตือนบนเครื่องนี้ (ถ้าไม่ขึ้น ดูการตั้งค่า → การแจ้งเตือน ของแอปนี้ และโหมดโฟกัส)', 'Sent — look for it on this phone (nothing? check Settings → Notifications for this app, and Focus)')); }
    catch (e) {   // the push service said no: show its code and reason so the family can tell us (e.g. Apple 403 BadJwtToken)
      const d = (e && e.body) || {}, code = [d.status, d.reason].filter(Boolean).join(' ');
      toast(L(`ส่งทดสอบไม่สำเร็จ${code ? ` (${code})` : ''}${d.apple ? ' — ปิดแล้วเปิดการเตือนใหม่หนึ่งครั้ง ถ้ายังไม่ได้ส่งรหัสนี้มา' : ''}`, `The test did not go through${code ? ` (${code})` : ''}${d.apple ? ' — turn reminders off and on once; if it still fails, send us this code' : ''}`));
    }
  },
  pin(b) {
    const f = $('#lcode'), k = b.dataset.v;
    f.value = k === 'clear' ? '' : k === 'back' ? f.value.slice(0, -1) : (f.value + k).slice(0, 32);
    $('#lerr').textContent = '';
    b.classList.add('tap'); setTimeout(() => b.classList.remove('tap'), 110);   // a visible press for a quick finger (and a tiny buzz where the phone allows)
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (_) { /* no buzz */ }
    pinAuto();
  },
  'who-login'(b) { const n = $('#lname'); n.value = n.value === b.dataset.v ? '' : b.dataset.v; $$('[data-a="who-login"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === n.value)); },
  print() { window.print(); },
  async pdf(b) {   // fetch, then save: a failed render shows a message instead of replacing the app with an error page
    if (b.getAttribute('aria-busy') === 'true') return;
    if (!navigator.onLine) { toast(L('ต้องมีสัญญาณตอนสร้าง PDF', 'Making the PDF needs a connection')); return; }
    b.setAttribute('aria-busy', 'true'); toast(L('กำลังสร้าง PDF พร้อมรูป… อาจใช้เวลาครึ่งนาที', 'Making the PDF with photos… may take half a minute'));
    try {
      const r = await fetch(b.getAttribute('href'), { credentials: 'same-origin' });
      if (!r.ok || !/pdf/.test(r.headers.get('content-type') || '')) throw new Error(String(r.status));
      const url = URL.createObjectURL(await r.blob()), a = document.createElement('a');
      a.href = url; a.download = ((b.getAttribute('href').split('?')[0].split('/').pop() || 'memory-book') + (b.dataset.sfx || '')) + '.pdf'; document.body.append(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 10000);
      toast(L('ได้ไฟล์ PDF แล้ว ✓', 'PDF ready ✓'));
    } catch (_) { toast(L('สร้าง PDF ไม่สำเร็จ ลองอีกครั้งในอีกสักครู่', 'Could not make the PDF — try again in a moment')); }
    finally { b.removeAttribute('aria-busy'); }
  },
  async copytext() {
    const t = trip(route().parts[1]); if (!t) return;
    const lines = [T(t.title), fmtRange(t), ''];
    t.days.forEach((d, i) => {
      if (!dayHasContent(t, i)) return;
      const es = entriesOf(t.id, i);
      lines.push(`${L('วันที่', 'Day')} ${i + 1} · ${fmtDay(d.date)} — ${T(d.title)}`);
      const pl = placesOf(t.id, i).map((p) => T(p.name)); if (pl.length) lines.push(`  ${L('ที่ไป', 'Places')}: ${pl.join(', ')}`);
      const md = es.filter((e) => e.kind === 'mood' && e.mood).map((e) => `${kidName(e.child)} ${e.mood}`); if (md.length) lines.push(`  ${L('อารมณ์', 'Mood')}: ${md.join(' · ')}`);
      es.filter((e) => e.kind === 'quote').forEach((e) => lines.push(`  “${e.text}” — ${kidName(e.child)}`));
      const fav = es.find((e) => e.kind === 'fav'); if (fav) lines.push(`  ${L('ของโปรด', 'Favourite')}: ${fav.text}`);
      const note = es.find((e) => e.kind === 'note'); if (note) lines.push(`  ${L('โน้ต', 'Note')}: ${note.text}`);
      es.filter((e) => e.kind === 'first').forEach((e) => lines.push(`  ${L('ครั้งแรก', 'First')}: ${e.first_key === 'custom' ? e.text : firstLabel(t, e.first_key).t} — ${kidName(e.child)}`));
      lines.push('');
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(L('คัดลอกแล้ว', 'Copied')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Copy not available here')); }
  },
  who(b) { quoteWho = b.dataset.v; $$('[data-a="who"]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === quoteWho))); },   // in place: a streaming story box must not be redrawn
  async savequote(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, ta = $('#qtext'), text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    delete drafts[ta.dataset.draft]; ta.value = '';
    await putEntry(t, { day: d, kind: 'quote', child: quoteWho, text }, uid('q'));
    toast(L('บันทึกคำพูดแล้ว', 'Quote saved'));
  },
  hiq(b) { const e = S.entries.find((x) => x.id === b.dataset.v); if (e) putEntry(trip(e.trip), { ...e, highlight: !e.highlight }, e.id); },
  spendcat(b) { spendCat = b.dataset.v; $$('[data-a="spendcat"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === spendCat)); const f = $('.spendfood'); if (f) f.hidden = spendCat !== 'food'; },
  spendcur(b) { spendCur = b.dataset.v; $$('[data-a="spendcur"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === spendCur)); },
  async addspend(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, amt = $('#spendamt'), note = $('#spendnote');
    const n = fzAmount(amt.value);   // 1,200 · ๑๒๐๐ · 1.2k · ฿300 · 3 พัน
    if (!(n >= 0) || !amt.value.trim()) { amt.focus(); return; }
    const curs = tripCurs(t), cur = curs.includes(spendCur) ? spendCur : curs[0], id = uid('sp');
    const body = { trip: t.id, day: d, amount: n, cur, cat: spendCat, note: note.value.trim() };
    delete drafts[amt.dataset.draft]; delete drafts[note.dataset.draft]; amt.value = ''; note.value = '';
    await enqueue({ method: 'PUT', url: '/api/b/spend/' + encodeURIComponent(id), body, local: { coll: 'spend', id, row: { ...body, at: Date.now(), created_by: S.me.name } } });
    toast(L('จดแล้ว', 'Noted'));
  },
  delspend(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/spend/' + encodeURIComponent(b.dataset.v), local: { coll: 'spend', id: b.dataset.v, del: true } }); },
  rec(b) { if (recState) stopRec(); else startRec(trip(b.dataset.t), +b.dataset.d); },
  delclip(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/media/' + encodeURIComponent(b.dataset.v), local: { coll: 'media', id: b.dataset.v, del: true } }); },
  kidplay(b) { const m = (S.media || []).find((x) => x.id === b.dataset.v); kidAudioEl = kidAudioEl || new Audio(); kidAudioEl.src = (m && m.local) || `/media/${encodeURIComponent(b.dataset.v)}`; kidAudioEl.play().catch(() => {}); },   // a clip still waiting to upload plays from the phone
  // the day's words and up to three photos go to whatever the phone can share with (LINE, Messages…); the photos are fetched
  // from our own server with the session cookie and handed over as files, so no public link is ever made
  async share(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, files = [];
    const own = b.dataset.src === 'msg' && $('#msgtext') ? $('#msgtext').value.trim() : '', text = own || shareText(t, i);   // Claude's note (edited) or the plain day
    if (!navigator.share) {   // a desktop browser: copy the words instead
      try { await navigator.clipboard.writeText(text); toast(L('คัดลอกข้อความแล้ว — วางใน LINE ได้เลย', 'Copied — paste it into LINE')); } catch (_) { toast(L('คัดลอกไม่สำเร็จ', 'Could not copy')); }
      return;
    }
    if (navigator.onLine) {
      const ph = mediaOf(t.id, i), pick = ph.filter((m) => m.highlight).concat(ph.filter((m) => !m.highlight)).filter((m) => !m.pending).slice(0, 3);
      for (const m of pick) { try { const r = await fetch(`/media/${encodeURIComponent(m.id)}`, { credentials: 'same-origin' }); if (r.ok) files.push(new File([await r.blob()], `${m.id}.jpg`, { type: 'image/jpeg' })); } catch (_) {} }
    }
    const withFiles = files.length && navigator.canShare && navigator.canShare({ files });
    try { await navigator.share(withFiles ? { text, files } : { text }); } catch (e) { if (e.name !== 'AbortError') toast(L('แชร์ไม่สำเร็จ', 'Could not share')); }
  },
  // sign out: the cookie goes on the server, the offline copy of the book goes from this phone (a lent phone keeps nothing)
  async logout(b) {
    if (queue.length) { toast(L('ยังมีบันทึกรอส่ง — ต่อเน็ตให้ส่งเสร็จก่อนออกจากระบบ', 'Some records are still waiting to upload — connect first')); return; }
    if (!armed(b, L('แตะอีกครั้งเพื่อออกจากระบบ', 'Tap again to sign out'))) return;
    try { await api('POST', '/api/logout'); } catch (_) {}
    await idb.set('state', null); ls('state', null); ls('lostTel', null); ls('conflicts', null); conflicts = [];   // the parents' numbers for the lost-child card go too, and any text waiting to be settled
    S = null; location.hash = '#/'; render(); brandLoad();
  },
  delentry(b) { if (armed(b)) delEntry(b.dataset.v); },
  mood(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, k = b.dataset.k, id = `${t.id}.mood.d${d}.${k}`;
    const cur = S.entries.find((e) => e.id === id);
    if (cur && cur.mood === b.dataset.v) delEntry(id);   // tap again = clear
    else { burst(b, [b.dataset.v, '✨']); putEntry(t, { day: d, kind: 'mood', child: k, mood: b.dataset.v }, id); }
  },
  first(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, key = b.dataset.v, k = b.dataset.k;
    const ex = S.entries.find((e) => e.trip === t.id && e.kind === 'first' && e.first_key === key && e.child === k);
    if (ex && ex.day !== d) { toast(L(`${kidName(k)} ได้ "ครั้งแรก" นี้ไปแล้วในวันที่ ${ex.day + 1} — แก้ได้ที่หน้าวันนั้น`, `${kidName(k)} already had this first on day ${ex.day + 1} — change it on that day`)); return; }   // never untick another day's first from here
    if (ex) delEntry(ex.id); else { burst(b, ['🌟', '✨', '🎉']); putEntry(t, { day: d, kind: 'first', child: k, first_key: key }, `${t.id}.first.${key}.${k}`); }
  },
  customfirst(b) {
    const inp = $('#firsttext'), text = inp.value.trim(); if (!text) { inp.focus(); return; }
    delete drafts[inp.dataset.draft]; inp.value = '';
    putEntry(trip(b.dataset.t), { day: +b.dataset.d, kind: 'first', child: b.dataset.k, first_key: 'custom', text }, uid('fc'));
  },
  // the little one's new words (passport page): a quote for that child on today's day of the trip
  littleword(b) {
    const t = trip(b.dataset.t), kid = b.dataset.k, inp = $(`#lw-${kid}`), text = inp ? inp.value.trim() : '';
    if (!text) { if (inp) inp.focus(); return; }
    delete drafts[inp.dataset.draft]; inp.value = '';
    putEntry(t, { day: todayIdx(t), kind: 'quote', child: kid, text }, uid('q'));
    burst(b, ['🗣️', '✨', '💛']);
  },
  // passport: a mission spot / animal / explorer box (tap again to untick); food has YUM / YUCK
  tick(b) {
    const t = trip(b.dataset.t), k = b.dataset.k, key = b.dataset.v, yum = b.dataset.yum || '', id = `${t.id}.tick.${key}.${k}`;
    const cur = S.entries.find((e) => e.id === id), before = certEarned(t, k);
    if (cur && cur.text === yum) { delEntry(id); return; }
    burst(b, yum === 'yuck' ? ['😖', '💦'] : yum ? ['😋', '✨'] : ['⭐', '✨', '🎉']);
    putEntry(t, { day: b.dataset.d === '' ? null : +b.dataset.d, kind: 'tick', child: k, first_key: key, text: yum }, id);
    if (!before && certEarned(t, k)) toast(L(`🎉 ${kidName(k)} ได้ใบประกาศนักสำรวจแล้ว!`, `🎉 ${kidName(k)} earned the explorer certificate!`));
  },
  place(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, key = b.dataset.v;
    const p = (t.days[d].planned || []).find((x) => x.key === key) || { en: key, th: key };
    const id = `${t.id}:${key}`, done = !S.places.some((x) => x.trip === t.id && x.key === key);
    if (done) burst(b, ['📍', '✨']);
    enqueue({ method: 'PUT', url: '/api/b/places', body: { trip: t.id, key, day: d, kind: b.dataset.k, name: { en: p.en, th: p.th, zh: p.zh }, done, at: Date.now() },
      local: done ? { coll: 'places', id, row: { trip: t.id, key, day: d, kind: b.dataset.k, name: { en: p.en, th: p.th }, at: Date.now() } } : { coll: 'places', id, del: true } });
  },
  done(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, day = t.days[d], done = !day.done_at;
    day.done_at = done ? Date.now() : null;   // optimistic; not re-applied after reload, the server copy wins
    if (done) { burst(b, ['🎉', '✨', '⭐']); toast(L('ได้ตราประทับของวันนี้ในพาสปอร์ตแล้ว 🛂', 'Today’s stamp is in the passports 🛂')); }
    enqueue({ method: 'PUT', url: `/api/b/days/${encodeURIComponent(t.id)}/${d}`, body: { done } });
  },
  // Claude, only when pressed: data-m "story" (bedtime story, #story…), "sum" (the day in a few lines into the #sumtext box, #sum…)
  // or "msg" (a note for the relatives into #msgtext — never saved, kept as a draft until it is shared);
  // story/sum are saved by the server, so the page reloads the state; a summary lands in its textarea and stays editable (blur saves)
  async story(b) {
    if (storyCtl) return;
    const mode = ['sum', 'msg', 'talk', 'letter', 'next', 'mquiz', 'fore'].includes(b.dataset.m) ? b.dataset.m : 'story', sum = ['sum', 'msg', 'letter', 'fore'].includes(mode);   // sum/msg/letter/fore write into a textarea; story/talk/next/mquiz into a box
    const quiet = mode === 'mquiz';   // the memory game streams JSON: show a line, not the raw text
    const t = trip(b.dataset.t), day = b.dataset.d === '' ? null : +b.dataset.d;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน ผู้ช่วยจึงทำงานได้', 'The helper needs a connection')); return; }
    const box = $(`#${mode}text`), msg = sum ? $(`#${mode}msg`) : box, before = sum ? box.value : '';
    const say = (x) => { if (sum) { box.value = before; msg.textContent = x; } else box.textContent = x; };
    const show = (x) => { if (sum) box.value = x; else box.textContent = x; };
    box.hidden = false; show(''); box.classList.add('writing'); if (sum) box.readOnly = true;
    $(`#${mode}go`).disabled = true; $(`#${mode}stop`).hidden = false;
    storyCtl = new AbortController();
    let text = '', ok = false;   // ok: Claude finished (what "do it all" waits for)
    try {
      const r = await fetch('/api/b/story', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal,
        headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: t.id, day, lang, mode }) });
      if (r.status === 422) { say(L('ยังไม่มีบันทึกของวันนี้ — เพิ่มคำพูด คำอธิบายรูป หรือเช็กอินก่อน', 'Nothing written down yet — add a quote, a photo caption or a check-in first')); return; }
      if (r.status === 429) { say(L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow')); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '', ev = null;
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {   // one SSE event per blank line
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2); ev = null;
          let data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; show(quiet ? L('กำลังคิดคำถาม… 🧠', 'Thinking up the questions… 🧠') : text); }
          else if (ev === 'done' && (ok = true) && mode === 'next') {   // nothing saved: kept for this page only
            nextAns = { t: t.id, i: day, text: d.text || text }; show(nextAns.text);
            toast(L('พรุ่งนี้พร้อมแล้ว — ไม่ได้บันทึกไว้', 'Tomorrow is ready — not saved'));
          }
          else if (ev === 'done' && mode === 'msg') {   // nothing saved: keep it as the box's draft so a re-render can't lose it
            drafts[box.dataset.draft] = box.value = d.text || text; msg.textContent = '';
            const send = $('#msgsend'); if (send) send.hidden = false;
            toast(L('แก้ข้อความได้ แล้วกดส่ง', 'Edit it if you like, then send'));
          } else if (ev === 'done') {
            if (sum) delete drafts[box.dataset.draft];   // the saved summary wins over a half-typed draft
            storyCtl = null; await load(); render();
            toast(mode === 'mquiz' ? L('เกมพร้อมแล้ว — พรุ่งนี้เช้าเปิดโหมดเด็ก แตะ 🧠', 'The game is ready — tomorrow morning, kid mode, tap 🧠') : mode === 'fore' ? L('เก็บคำนำแล้ว — แก้ในช่องได้', 'Foreword saved — edit it in the box') : mode === 'letter' ? L('เก็บร่างจดหมายแล้ว — แก้ในช่องให้เป็นคำของเราเอง', 'Draft saved — make it your own words in the box') : sum ? L('เก็บสรุปไว้ในสมุดแล้ว — แก้ในช่องได้', 'Summary saved in the book — edit it in the box') : mode === 'talk' ? L('คำถามอยู่ในโหมดเด็กแล้ว — แตะ 💬 คุยกัน', 'The questions are in kid mode — tap 💬 Let’s talk') : L('เก็บนิทานไว้ในสมุดแล้ว', 'Story saved in the book'));
          } else if (ev === 'error') say(d.error === 'refusal' ? L('ผู้ช่วยเขียนอันนี้ไม่ได้ ลองเพิ่มบันทึกแล้วลองใหม่', 'The helper could not write this one — try again later') : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') { if (sum) box.value = before; toast(L('หยุดแล้ว — ไม่ได้บันทึก', 'Stopped — nothing saved')); }
      else say(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally {
      storyCtl = null; aiUseAt = 0;
      const bx = $(`#${mode}text`); if (bx) { bx.classList.remove('writing'); bx.readOnly = false; }
      const go = $(`#${mode}go`), stop = $(`#${mode}stop`); if (go) go.disabled = false; if (stop) stop.hidden = true;
    }
    return ok;
  },
  // tonight, Claude helps → "do it all": photos → summary → story → questions, one Claude call each, skipping what is done;
  // each step scrolls to its box and streams there as if pressed; the first failure (or Stop) ends the run
  async aiall(b) {
    if (aiRun || storyCtl) return;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน ผู้ช่วยจึงทำงานได้', 'The helper needs a connection')); return; }
    if (queue.length) { toast(L('รอให้บันทึกและรูปส่งเสร็จก่อน แล้วค่อยกด', 'Wait for the records and photos to upload first')); return; }
    const t = trip(b.dataset.t), i = +b.dataset.d, dk = `${t.id}:${i}`, steps = aiTodo(t, i, dk);
    if (!steps.length) return;
    aiRun = { n: 0, of: steps.length, stop: false };
    let done = 0;
    try {
      for (const k of steps) {
        if (aiRun.stop) break;
        aiRun.n++; render();
        const sel = { photo: '.phaiblk', sum: '.sumblk', story: '#storyblk', talk: '.talkblk' }[k], box = $(sel);
        if (box) box.scrollIntoView({ block: 'start', behavior: 'auto' });
        let ok;
        if (k === 'photo') {   // 12 photos a call: go round until every photo of the day is seen (or Stop, or a failure)
          for (let round = 0; round < 10 && !aiRun.stop; round++) {
            ok = await A.photoai($('#phaigo') || { dataset: { t: t.id, d: String(i) }, setAttribute() {}, removeAttribute() {} });
            if (!ok || !ok.left) break;
          }
        } else ok = await A.story({ dataset: { m: k === 'story' ? '' : k, t: t.id, d: String(i) } });
        if (!ok) break;
        done++;
      }
    } finally {
      const stopped = aiRun && aiRun.stop; aiRun = null; render();
      const p = $('#aipanel'); if (p) p.scrollIntoView({ block: 'start' });
      toast(done === steps.length ? L('คืนนี้ครบแล้ว — นิทานกับคำถามอยู่ในโหมดเด็ก', 'All set for tonight — the story and the questions are in kid mode')
        : stopped ? L(`หยุดแล้ว — ทำไป ${done} จาก ${steps.length}`, `Stopped — ${done} of ${steps.length} done`)
          : L(`ทำได้ ${done} จาก ${steps.length} — ดูข้อความในกล่องที่ค้าง`, `${done} of ${steps.length} done — see the message in the box that stopped`));
    }
  },
  aistop() { if (aiRun) aiRun.stop = true; if (storyCtl) storyCtl.abort(); },
  storystop() { if (storyCtl) storyCtl.abort(); },
  lckid(b) { lostKid = b.dataset.v; render(); },
  async lostcard(b) {
    const t = trip(b.dataset.t), kid = b.dataset.v;
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const blob = await drawLostCard(t, kid, lostPhoto, ls('lostTel') || []);
      lastCard = blob;
      const prev = $('#lcprev'); if (prev) { if (prev.src.startsWith('blob:')) URL.revokeObjectURL(prev.src); prev.src = URL.createObjectURL(blob); prev.hidden = false; }
      const file = new File([blob], `lost-card-${kid}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); } catch (e) { if (e.name !== 'AbortError') throw e; } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast(L('บันทึกรูปการ์ดแล้ว', 'Card saved')); }
    } catch (_) { toast(L('ทำการ์ดไม่สำเร็จ', 'Could not make the card')); }
    finally { b.disabled = false; b.removeAttribute('aria-busy'); }
  },
  // the day card: drawn here, then the phone's share sheet (LINE…), or a download on a computer
  async daycard(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d;
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const blob = await drawDayCard(t, i), file = new File([blob], `${t.id}-day${i + 1}.png`, { type: 'image/png' });
      lastCard = blob;
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); } catch (e) { if (e.name !== 'AbortError') throw e; } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast(L('บันทึกรูปการ์ดแล้ว', 'Card saved')); }
    } catch (_) { toast(L('ทำการ์ดไม่สำเร็จ', 'Could not make the card')); }
    finally { b.disabled = false; b.removeAttribute('aria-busy'); }
  },
  // what our family likes: the notebook of every trip → Claude → saved for both parents (settings), streamed into #likestext
  async lessonsgo(b) {   // the helper writes one trip's lessons into its box, streamed, then saved by the server
    if (storyCtl) return;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน ผู้ช่วยจึงทำงานได้', 'The helper needs a connection')); return; }
    const t = trip(b.dataset.t), box = document.getElementById('lessons-' + b.dataset.t); if (!t || !box) return;
    const before = box.value; box.value = ''; box.rows = 9; b.disabled = true; storyCtl = new AbortController(); let text = '';
    try {
      const r = await fetch(`/api/b/lessons/${encodeURIComponent(t.id)}`, { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal, headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ lang }) });
      if (r.status === 422) { box.value = before; toast(L('เล่มนี้ยังมีบันทึกน้อยเกินไป', 'This book has too few notes yet')); return; }
      if (r.status === 429) { box.value = before; toast(L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow')); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder(); let buf = '';
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true }); let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2); let ev = null, data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; box.value = text; }
          else if (ev === 'done') { storyCtl = null; await load().catch(() => {}); toast(L('เก็บบทเรียนไว้แล้ว', 'Saved')); }
          else if (ev === 'error') { box.value = before; toast(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again')); }
        }
      }
    } catch (e) { box.value = before; if (e.name !== 'AbortError') toast(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again')); }
    finally { storyCtl = null; b.disabled = false; safeRender(); }
  },
  async likes(b) {
    if (storyCtl) return;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน ผู้ช่วยจึงทำงานได้', 'The helper needs a connection')); return; }
    const box = $('#likestext'), before = box.textContent; box.hidden = false; box.textContent = ''; b.disabled = true;
    storyCtl = new AbortController();
    let text = '';
    try {
      const r = await fetch('/api/b/likes', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal, headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ lang }) });
      if (r.status === 422) { box.textContent = L('ยังไม่มีรีวิวในสมุดโน้ต — ให้ดาวที่พัก ร้าน สถานที่ ในหน้าบันทึกก่อน', 'No reviews yet — rate stays, food and places on the record pages first'); return; }
      if (r.status === 429) { box.textContent = L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow'); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
          let ev = null, data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; box.textContent = text; }
          else if (ev === 'done') { likes = d; storyCtl = null; render(); toast(L('เก็บสรุปไว้แล้ว', 'Saved')); }
          else if (ev === 'error') box.textContent = L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
        }
      }
    } catch (e) {
      box.textContent = e.name === 'AbortError' ? before : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
    } finally { storyCtl = null; aiUseAt = 0; const g = $('#likesgo'); if (g) g.disabled = false; }
  },
  // the record page's "more" fold: keep it open on this phone from now on (or let it fold again)
  logall(b, e) { e.preventDefault(); e.stopPropagation(); ls('logall', ls('logall') ? 0 : 1); render(); },
  // the printed cover: 'art' (day pictures, the default) or 'photo' (the first ⭐ photo) — one trip-wide entry, read by #/print and the PDF
  async bookage(b) { const t = trip(b.dataset.t); await putEntry(t, { day: null, kind: 'bookage', text: b.dataset.v }, `${t.id}.bookage.all`); render(); },   // the printed book's style by age
  async cover(b) { const t = trip(b.dataset.t); await putEntry(t, { day: null, kind: 'cover', text: b.dataset.v }, `${t.id}.cover.all`); render(); },
  jump(b) { const el = $(b.dataset.v); if (el) { let d = el.closest('details:not([open])'); while (d) { d.open = true; d = d.parentElement && d.parentElement.closest('details:not([open])'); } el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } },
  // relatives' groups (#/viewers): the form lives in vgForm (views.js) so a background render keeps the ticks
  wifionly(b) { ls('wifionly', b.checked ? 1 : null); upNow = false; renderProgress(); flush(); },
  upnow() { upNow = true; toast(L('กำลังส่งรูปที่รออยู่…', 'Sending the waiting photos…')); renderProgress(); flush(); },
  vgtrip(b) { const s2 = new Set(vgForm.trips); if (b.checked) s2.add(b.dataset.v); else s2.delete(b.dataset.v); vgForm.trips = [...s2]; },
  vglink(b) { vgForm.link = b.checked; },
  vgnewlink(b) { vgForm.newLink = b.checked; },
  vgedit(b) {
    const g = (Array.isArray(vg) ? vg : []).find((x) => x.id === b.dataset.v); if (!g) return;
    vgForm = { id: g.id, name: g.name, trips: [...g.trips], link: !!g.link, hasLink: !!g.link, newLink: false }; vgJust = null;
    delete drafts['vg:name']; delete drafts['vg:pin']; render();
    setTimeout(() => { const n = $('#vgname'); if (n) n.scrollIntoView({ block: 'center' }); }, 30);
  },
  vgcancel() { vgForm = null; delete drafts['vg:name']; delete drafts['vg:pin']; render(); },
  async vgsave(b) {
    const name = $('#vgname').value.trim(), pin = $('#vgpin').value.trim(), msg = $('#vgmsg'), f = vgForm;
    if (!name) { msg.textContent = L('ใส่ชื่อกลุ่มก่อน', 'Give the group a name'); $('#vgname').focus(); return; }
    if (pin && !/^\d{6,12}$/.test(pin)) { msg.textContent = L('รหัสต้องเป็นตัวเลข 6–12 ตัว', 'The PIN must be 6–12 digits'); $('#vgpin').focus(); return; }
    if (!f.id && !pin && !f.link) { msg.textContent = L('ต้องมีรหัสหรือลิงก์อย่างน้อยหนึ่งอย่าง', 'Give it a PIN or a link'); return; }
    const id = f.id || 'vg-' + Math.random().toString(36).slice(2, 10);
    b.disabled = true;
    try {
      await api('PUT', '/api/b/viewers/' + id, { name, trips: f.trips, ...(pin ? { pin } : {}), link: f.newLink ? 'new' : f.link });
      vgJust = pin ? { name, pin } : null; vgForm = null; vg = null; delete drafts['vg:name']; delete drafts['vg:pin'];
      if (route().parts[0] === 'start' && !vgJust) { nav('#/start/3'); return; }   // a link-only group in the setup: nothing to show, on to the next step
      toast(L('บันทึกกลุ่มแล้ว', 'Group saved')); render(); scrollTo(0, 0);
    } catch (e) {
      b.disabled = false;
      msg.textContent = e.code === 409 ? L('รหัสนี้ใช้แล้ว (ซ้ำกับกลุ่มอื่นหรือรหัสครอบครัว) — ลองตัวอื่น', 'That PIN is taken (another group or the family PIN) — try another')
        : e.code === 400 ? L('ต้องมีรหัสหรือลิงก์อย่างน้อยหนึ่งอย่าง', 'Give it a PIN or a link') : L('บันทึกไม่สำเร็จ ลองใหม่', 'Could not save — try again');
    }
  },
  async vgdel(b) {
    if (!armed(b, L('แตะอีกครั้ง — คนในกลุ่มจะออกจากระบบ', 'Tap again — its phones get signed out'))) return;
    try { await api('DELETE', '/api/b/viewers/' + encodeURIComponent(b.dataset.v)); vg = null; vgJust = null; toast(L('ลบกลุ่มแล้ว', 'Group deleted')); render(); } catch (_) { toast(L('ลบไม่สำเร็จ', 'Could not delete')); }
  },
  // ---- our family (#/family): edit in place, save as a whole
  fammove(b) { const i = +b.dataset.i, j = i + +b.dataset.v; if (j < 0 || j >= fam.kids.length) return; [fam.kids[i], fam.kids[j]] = [fam.kids[j], fam.kids[i]]; render(); },
  famdel(b) { if (!armed(b, L('แตะอีกครั้งเพื่อเอาออก', 'Tap again to remove'))) return; fam.kids.splice(+b.dataset.i, 1); render(); },
  famadd() { if (fam.kids.length >= 6) return; fam.kids.push({ slug: '', name_th: '', name_en: '', emoji: '🧒', birth_ym: '', look: null, avatar: null }); render(); },
  async famavoff(b) {   // back to the plain drawing (or the emoji); the tries used stay used
    const k = fam.kids[+b.dataset.i]; if (!k || !armed(b, L('แตะอีกครั้งเพื่อยืนยัน', 'Tap again to confirm'))) return;
    try { await api('DELETE', `/api/b/family/avatar/${encodeURIComponent(k.slug)}`); k.avatar = null; await load(); render(); } catch (_) { toast(L('ไม่สำเร็จ', 'Did not work')); }
  },
  async famsave() {
    fam.err = '';
    const kids = fam.kids.map((k) => ({ ...k, name_en: k.name_en.trim(), name_th: k.name_th.trim() || k.name_en.trim() })).filter((k) => k.name_en);
    if (kids.length !== fam.kids.length) { fam.err = L('ลูกทุกคนต้องมีชื่อภาษาอังกฤษ (ใช้ในลิงก์และไฟล์)', 'Every child needs an English name (it is used in links and files)'); render(); return; }
    if (kids.some((k) => !k.birth_ym)) { fam.err = L('ใส่เดือนและปีเกิดของลูกทุกคน (ใช้คิดอายุในแต่ละทริป)', 'Add every child’s month and year of birth (it gives the age on each trip)'); render(); return; }
    fam.busy = true; render();
    try {
      await api('PUT', '/api/b/family', { profile: { app: fam.app, kicker: fam.kicker }, children: kids });
      const onb = route().parts[0] === 'start';
      fam = null; toast(L('บันทึกโปรไฟล์แล้ว', 'Profile saved')); ls('brand', null); await load(); nav(onb ? '#/start/2' : '#/');
    } catch (e) {
      fam.busy = false;
      fam.err = e.code === 409 ? L('เอาออกไม่ได้ มีบันทึกของลูกคนนี้อยู่แล้ว เปลี่ยนชื่อแทนได้', 'Cannot remove: this child already has memories recorded — rename instead') : L('บันทึกไม่สำเร็จ', 'Could not save');
      render();
    }
  },
  async vgshare(b) {
    const url = location.origin + b.dataset.v, text = L(`สมุดความทรงจำ${kicker()} (${b.dataset.n})`, `${kicker()}'s memory books (${b.dataset.n})`);
    if (navigator.share) { try { await navigator.share({ text, url }); } catch (e) { if (e.name !== 'AbortError') toast(L('แชร์ไม่สำเร็จ', 'Could not share')); } return; }
    try { await navigator.clipboard.writeText(url); toast(L('คัดลอกลิงก์แล้ว', 'Link copied')); } catch (_) { toast(url); }
  },
  // look at today's photos: the server sends the day's unseen thumbnails to Claude and saves caption/tags/place; then the state reloads
  async photoai(b) {
    let ok = false;   // returned: "do it all" goes on only after the photos were seen
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน จึงให้ดูรูปได้', 'The helper needs a connection to look')); return; }
    if (queue.length) { toast(L('รอให้รูปส่งเสร็จก่อน แล้วค่อยให้ดู', 'Wait for the photos to upload first')); return; }
    const btns = $$('.phaiblk button'); btns.forEach((x) => { x.disabled = true; }); b.setAttribute('aria-busy', 'true');
    try {
      const r = await api('POST', '/api/b/photos/ai', { trip: b.dataset.t, day: +b.dataset.d, lang, all: !!b.dataset.all }); aiUseAt = 0;
      await load(); safeRender();
      ok = r;   // truthy: the answer itself, so "do it all" knows how many are left
      const star = r.starred ? L(` · ติดดาว ⭐ ให้ ${r.starred} รูป (แตะรูปเพื่อเปลี่ยน)`, ` · ⭐ on ${r.starred} best photo${r.starred > 1 ? 's' : ''} (tap a photo to change)`) : '';
      toast((r.left ? L(`ดูแล้ว ${r.n} รูป · เหลืออีก ${r.left} กดอีกครั้ง`, `${r.n} photos seen · ${r.left} more, press again`) : L(`ดูแล้ว ${r.n} รูป`, `${r.n} photos seen`)) + star);
    } catch (e) {
      btns.forEach((x) => { x.disabled = false; }); b.removeAttribute('aria-busy');
      toast(e.code === 422 ? L('ไม่มีรูปใหม่ให้ดู', 'Nothing new to look at') : e.code === 429 ? L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow') : e.code === 501 ? L('การดูรูปยังไม่เปิดในบัญชีนี้', 'Not switched on (PHOTO_AI)') : L('ดูไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally { btns.forEach((x) => { x.disabled = false; }); b.removeAttribute('aria-busy'); }
    return ok;
  },
  // photos by tag: the chip filters the page in place (hides the photos, groups and days that don't carry the tag) — never a re-render
  phtag(b) {
    photoTag = b.dataset.v; $$('[data-a="phtag"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === photoTag));
    const t = trip(route().parts[1]); if (!t) return;
    $$('#phlist .mosaic button[data-v]').forEach((el) => { const m = S.media.find((x) => x.id === el.dataset.v); el.hidden = !!photoTag && !tagsOf(m).includes(photoTag); });
    $$('#phlist .phgrp').forEach((g) => { g.hidden = ![...g.querySelectorAll('.mosaic button')].some((x) => !x.hidden); });
    $$('#phlist .mosaic').forEach((g) => { g.hidden = ![...g.querySelectorAll('button')].some((x) => !x.hidden); });
    $$('#phlist .phday').forEach((d) => { d.hidden = ![...d.querySelectorAll('.mosaic button')].some((x) => !x.hidden); });
  },
  // both languages: the server sends the day's untranslated words to Claude and saves each translation; then the state reloads
  async translate(b) {
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตเพื่อแปล', 'Translating needs a connection')); return; }
    if (queue.length) { toast(L('รอให้บันทึกส่งเสร็จก่อน แล้วค่อยแปล', 'Wait for the records to upload, then translate')); return; }
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const r = await api('POST', '/api/b/translate', { trip: b.dataset.t, day: +b.dataset.d }); aiUseAt = 0;
      await load(); safeRender();
      toast(L(`แปลแล้ว ${r.n} ข้อความ`, `${r.n} translated`));
    } catch (e) {
      b.disabled = false; b.removeAttribute('aria-busy');
      toast(e.code === 422 ? L('ไม่มีข้อความใหม่ให้แปล', 'Nothing new to translate') : e.code === 429 ? L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow') : L('แปลไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally { b.disabled = false; b.removeAttribute('aria-busy'); }
  },
  // ask the guide: the question goes with excerpts of this book's manual (picked on the server), the answer streams back; never saved —
  // the last answer stays on this page (askAns) until another question; a chip (data-v) asks its own question
  async ask(b) {
    if (storyCtl) return;
    const t = trip(b.dataset.t), day = b.dataset.d === '' ? null : +b.dataset.d, inp = $('#askq');
    if (b.dataset.v && inp) { inp.value = b.dataset.v; drafts[inp.dataset.draft] = inp.value; }
    const q = inp ? inp.value.trim() : '';
    if (!q) { if (inp) inp.focus(); return; }
    const box = $('#askans');
    if (!navigator.onLine) { askOffline(t, q, box); return; }   // no signal: answer from the manual on the phone, without Claude
    box.hidden = false; box.textContent = ''; box.classList.add('writing');
    $('#askgo').disabled = true; $('#askstop').hidden = false;
    askAns = { t: t.id, q, text: '' };
    storyCtl = new AbortController();
    const say = (x) => { box.textContent = x; askAns.text = x; };
    let text = '';
    try {
      const r = await fetch('/api/b/ask', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal,
        headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: t.id, day, lang, q }) });
      if (r.status === 429) { say(L('วันนี้ผู้ช่วยทำงานครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the helper can do today — more tomorrow')); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
          let ev = null, data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; say(text); }
          else if (ev === 'done') say(d.text || text);
          else if (ev === 'error') say(d.error === 'refusal' ? L('ผู้ช่วยตอบข้อนี้ไม่ได้ ลองถามแบบอื่น', 'The helper could not answer that one — try asking another way') : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') { say(''); box.hidden = true; askAns = null; }
      else if (!text) { storyCtl = null; askOffline(t, q, box); }   // the network dropped (roaming, a ferry): fall back to the manual on the phone
      else say(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally {
      storyCtl = null; aiUseAt = 0; box.classList.remove('writing');
      const go = $('#askgo'), stop = $('#askstop'); if (go) go.disabled = false; if (stop) stop.hidden = true;
    }
  },
  lb(b) { openLb(b.dataset.t, b.dataset.v); },
  newtrip() { openSheet(newTripSheet()); },
  async impstart() {
    const f = imp.file, typed = (($('#impslug') || {}).value || '').trim();
    imp.err = '';
    if (!f) { imp.err = L('เลือกไฟล์ PDF ก่อน', 'Choose a PDF first'); render(); return; }
    // the link name is the app's job (owner, Nov 2026: a parent should never be stuck on a box they cannot fill): what was typed,
    // made safe, else the file's name, else "book-<date>"; a name a book already has gets -2, -3 …
    imp.slug = bookSlug(typed || f.name.replace(/\.pdf$/i, ''));
    try {
      imp.job = { status: 'running', slug: imp.slug, log: [] }; render();
      await api('POST', `/api/b/import?slug=${encodeURIComponent(imp.slug)}`, undefined, new Blob([await f.arrayBuffer()], { type: 'application/pdf' }));
      imp.file = null; await impRefresh();
    } catch (e) { imp.job = null; imp.err = { 409: L('มีงานกำลังทำ หรือมีเล่มรหัสนี้แล้ว', 'Busy, or the id exists'), 503: L('ผู้ช่วยยังไม่เปิดในบัญชีนี้', 'The helper is not switched on for this family'), 429: L('โควตาผู้ช่วยของวันนี้เหลือไม่พอทำทั้งเล่ม ลองพรุ่งนี้', 'Not enough of today’s helper allowance left for a whole book — try tomorrow'), 400: L('ไฟล์ไม่ใช่ PDF หรือรหัสเล่มไม่ถูกต้อง', 'Not a PDF, or a bad id'), 413: L('ไฟล์ใหญ่เกิน 25 MB', 'Over 25 MB') }[e.code] || L('ส่งไม่สำเร็จ', 'Could not send'); render(); }
  },
  // the helper draws a book's day circles and passport crest (server/bookart.js); the menu card shows the progress, the state reloads when it is done
  async bookart(b) {
    const id = b.dataset.t;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อน', 'Connect to the internet first')); return; }
    try { artJob = await api('POST', `/api/b/art/${encodeURIComponent(id)}`, {}); artWant = id; }
    catch (e) { toast(artWhy(e.code, e.error)); return; }
    safeRender(); artPoll();
  },
  async impsave(b) {
    try { const r = await api('POST', `/api/b/import/${encodeURIComponent(b.dataset.v)}/save`, {}); toast(L('บันทึกเล่มแล้ว', 'Book saved')); imp.list = null; imp.job = null; await load(); if (r.art === 'started') { artJob = { trip: r.id, status: 'running', done: 0, total: 0 }; artWant = r.id; artPoll(); } else if (r.art && r.art !== 'off') toast(artWhy(r.art === 'limit' ? 429 : r.art === 'runs' ? 429 : 409, r.art)); location.hash = `#/t/${encodeURIComponent(r.id)}`; }
    catch (e) { toast(e.code === 409 ? L('มีเล่มรหัสนี้แล้ว', 'A book with this id exists') : L('บันทึกไม่สำเร็จ', 'Could not save')); }
  },
  async impdel(b) {
    if (!armed(b, L('แตะอีกครั้งเพื่อทิ้ง', 'Tap again to discard'))) return;
    try { await api('DELETE', `/api/b/import/${encodeURIComponent(b.dataset.v)}`); imp.list = null; if (imp.job && imp.job.draft && imp.job.draft.id === b.dataset.v) imp.job = null; impRefresh(); } catch (_) { toast(L('ลบไม่สำเร็จ', 'Could not delete')); }
  },
  dchfill(b) { const f = $('#dchask'), el = $('#dchblk'); if (f) f.value = b.dataset.v; if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
  async vfstart(b) {
    try { const r = await api('POST', `/api/b/planner/verify/${encodeURIComponent(b.dataset.t)}`, {}); vfState = { trip: b.dataset.t, status: 'running', done: 0, total: r.total, started: Date.now() }; safeRender(); vfPoll(); }
    catch (e) { toast(e.error === 'limit' && e.body ? L(`โควตาวันนี้เหลือ ${e.body.left} ต้องใช้ ${e.body.need} ลองพรุ่งนี้`, `${e.body.left} of today's calls left, ${e.body.need} needed — try tomorrow`) : e.error === 'busy' ? L('ผู้ช่วยกำลังเช็กอีกเล่มอยู่', 'The helper is checking another book') : e.error === 'none' ? L('เล่มนี้ยังไม่มีร้านหรือที่เที่ยวให้เช็ก', 'This book has no places to check yet') : vfErr(e.error)); }
  },
  dchchip(b) { const f = $('#dchask'); if (f) { f.value = b.dataset.v; f.focus(); } },
  dchdrop() { if (dch) { dch.prop = null; dch.err = ''; } safeRender(); },
  async dchgo(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, ask = (($('#dchask') || {}).value || '').trim();
    dch = { t: b.dataset.t, i, ask, busy: '', prop: null, err: '' };
    if (!ask) { dch.err = L('เลือกหรือพิมพ์ก่อนว่าอยากเปลี่ยนอะไร', 'Pick or type what should change first'); safeRender(); return; }
    dch.busy = 'ask'; safeRender();
    try { const r = await api('POST', `/api/b/planner/day/${encodeURIComponent(t.id)}/${i}`, { ask }); if (dch && dch.t === t.id && dch.i === i) { dch.prop = r.day; dch.fc = r.forecast || ''; } }
    catch (e) { if (dch) dch.err = dchErr(e); }
    finally { if (dch) dch.busy = ''; safeRender(); const el = $('#dchblk'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  },
  async dchuse(b) {
    if (!dch || !dch.prop) return;
    dch.busy = 'use'; safeRender();
    try { await api('PUT', `/api/b/planner/day/${encodeURIComponent(b.dataset.t)}/${+b.dataset.d}`, { day: dch.prop }); dch = null; await load(); render(); toast(L('ใช้แผนใหม่แล้ว', 'The new plan is in')); scrollTo(0, 0); }
    catch (e) { if (dch) { dch.err = dchErr(e); dch.busy = ''; } safeRender(); }
  },
  async dchundo(b) {
    if (!armed(b, L('แตะอีกครั้งเพื่อกลับไปแผนเดิม', 'Tap again to go back'))) return;
    try { await api('POST', `/api/b/planner/day/${encodeURIComponent(b.dataset.t)}/${+b.dataset.d}/undo`, {}); await load(); render(); toast(L('กลับไปแผนเดิมแล้ว', 'Back to the old plan')); }
    catch (e) { toast(dchErr(e)); }
  },
  careadd(b) {   // the SOS page: a place this family knows in a town of the list (a clinic, a playground, a baby room) — no hours, no phone
    openSheet(`<h3>${L('เพิ่มที่ที่เรารู้จัก', 'Add a place we know')} · ${esc(b.dataset.n)}</h3>
<div class="pform"><input class="field" id="coname" maxlength="90" placeholder="${L('ชื่อสถานที่', 'The place’s name')}">
<div class="row chips" role="group">${CARE_KINDS.map(([k, e, th, en], i) => `<button class="chip" data-a="carekind" data-v="${k}" aria-pressed="${i === 0}">${emo(e)} ${L(th, en)}</button>`).join('')}</div>
<input class="field" id="conote" maxlength="160" placeholder="${L('โน้ตสั้นๆ เช่น ชั้นไหน ทำไมดี (ไม่ต้องใส่เบอร์โทรหรือเวลาเปิด)', 'A short note — which floor, why it is good (no phone number or hours)')}">
<div class="row"><button class="btn" data-a="careaddgo" data-v="${esc(b.dataset.v)}">${L('บันทึก', 'Save')}</button><button class="btn ghost" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button></div></div>`);
  },
  carekind(b) { $$('[data-a="carekind"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); },
  async careaddgo(b) {
    const name = (($('#coname') || {}).value || '').trim(), note = (($('#conote') || {}).value || '').trim(), pick = $('[data-a="carekind"][aria-pressed="true"]'), kind = (pick && pick.dataset.v) || 'hospital';
    if (name.length < 2) { toast(L('ใส่ชื่อสถานที่ก่อน', 'Type the place’s name first')); return; }
    const id = 'co-' + Math.random().toString(36).slice(2, 12);
    try {
      await api('PUT', `/api/b/care/own/${id}`, { place: b.dataset.v, name, kind, note });
      closeSheet(); careAsk = ''; toast(L('เพิ่มแล้ว', 'Added')); render();
    } catch (e) { toast(e && e.error === 'phone' ? L('ไม่ต้องใส่เบอร์โทร', 'Leave the phone number out') : L('เพิ่มไม่ได้ ลองอีกครั้ง', 'Could not add it — try again')); }
  },
  async caredel(b) {
    if (!armed(b, L('แตะอีกครั้งเพื่อเอาออก', 'Tap again to remove'))) return;
    try { await api('DELETE', `/api/b/care/own/${encodeURIComponent(b.dataset.v)}`); careAsk = ''; render(); }
    catch (_) { toast(L('เอาออกไม่ได้ ลองอีกครั้ง', 'Could not remove it — try again')); }
  },
  sightk(b) { SIGHT.kind = b.dataset.v; render(); },   // explore a town: the filters redraw the page (the search box keeps what was typed)
  sightst(b) { SIGHT.st = SIGHT.st === b.dataset.v ? '' : b.dataset.v; render(); },
  sightkid(b) { SIGHT.kid = SIGHT.kid === b.dataset.v ? '' : b.dataset.v; render(); },
  sightf(b) { const k = b.dataset.v; if (['io', 'free', 'wish'].includes(k)) SIGHT[k] = !SIGHT[k]; render(); },
  async sightwish(b) {   // ♡ → ♥: on the family's wish list (both parents; the planner reads it)
    const x = (SIGHT.list || []).find((y) => y.id === b.dataset.v); if (!x) return;
    const on = !x.wish; x.wish = on; SIGHT.towns = null; render();
    try { await api('PUT', `/api/b/sights/${encodeURIComponent(x.id)}/wish`, { on }); toast(on ? L('เก็บไว้ในที่อยากไปแล้ว ♥', 'On our wish list ♥') : L('เอาออกจากที่อยากไปแล้ว', 'Off the wish list')); }
    catch (_) { x.wish = !on; render(); toast(L('บันทึกไม่ได้ ต้องมีเน็ต', 'Not saved — you need a connection')); }
  },
  dayagain() { SIGHT.seed++; SIGHT.day = buildDay(SIGHT.list || [], Array.isArray(SIGHT.eats) ? SIGHT.eats : [], SIGHT.seed); render(); },
  dayplan() {   // the day's sights become the plan's "must do" and its town "where to"
    const d = SIGHT.day; if (!d) return;
    const cur = (Array.isArray(SIGHT.towns) ? SIGHT.towns : []).find((t) => t.tkey === SIGHT.town), town = cur ? L(cur.town_th || cur.town, cur.town) : '';
    if (!pln.a) pln.a = { dest: '', want: '', likes: [], needs: [], ...(ls('plan') || {}) };
    const parts = String(pln.a.dest || '').split(',').map((x) => x.trim()).filter(Boolean); if (town && !parts.some((x) => plNorm(x) === plNorm(town))) parts.push(town);
    pln.a.dest = parts.join(', ');
    const want = String(pln.a.want || '').split(/,\s*/).filter(Boolean); for (const x of d.cost) { const n = T(x.name); if (!want.includes(n)) want.push(n); }
    pln.a.want = want.join(', ').slice(0, 500); planKeepA();
    location.hash = '#/planner/where';
  },
  async sightdel(b) {   // a sight the parents do not want: two taps, it stays out
    if (!armed(b, L('แตะอีกครั้งเพื่อเอาออก', 'Tap again to take it out'))) return;
    const id = b.dataset.v;
    try { await api('DELETE', `/api/b/sights/${encodeURIComponent(id)}`); SIGHT.list = (SIGHT.list || []).filter((x) => x.id !== id); SIGHT.towns = null; render(); }
    catch (_) { toast(L('เอาออกไม่ได้ ลองอีกครั้ง', 'Could not take it out — try again')); }
  },
  async eatlibdel(b) {   // a place the parents do not want in the library: two taps, it stays out
    if (!armed(b, L('แตะอีกครั้งเพื่อเอาออก', 'Tap again to take it out'))) return;
    const id = b.dataset.v;
    try { await api('DELETE', `/api/b/eatlib/${encodeURIComponent(id)}`); eatLib.places = (eatLib.places || []).filter((x) => x.id !== id); eatLib.towns = null; eatRoute = { key: '', list: null }; render(); }
    catch (_) { toast(L('เอาออกไม่ได้ ลองอีกครั้ง', 'Could not take it out — try again')); }
  },
  async eatlibfill(b) {   // the library page: more places for the town on the page, or a town typed in ("Osaka, Japan")
    const typed = (($('#eltown') || {}).value || '').trim(), parts = typed.split(/\s*,\s*|\s+(?=ญี่ปุ่น|เกาหลี|ไต้หวัน|จีน|เวียดนาม|ไทย)/);
    const town = b.dataset.v || parts[0] || '', where = b.dataset.v ? '' : parts.slice(1).join(' ');
    if (!town) { toast(L('พิมพ์ชื่อเมืองก่อน', 'Type the town first')); return; }
    const tk = await eatFill(town, b.dataset.th || town, where);
    if (tk) { eatLib.add = ''; eatLib.town = ''; if (location.hash === `#/eats/${tk}`) render(); else location.hash = `#/eats/${tk}`; }
  },
  async planeat(b) { if (await eatFill(b.dataset.v, b.dataset.th || b.dataset.v, pln.route ? T(pln.route.place) : '')) render(); },
  planopt(b) { pln.a[b.dataset.k] = b.dataset.v; planKeepA(); b.closest('.plopts').querySelectorAll('.tpo').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); },
  planseniors(b) { pln.a.seniors = !!b.checked; planKeepA(); },
  planchip(b) { const k = b.dataset.k, v = b.dataset.v, l = pln.a[k] = Array.isArray(pln.a[k]) ? pln.a[k] : []; const i = l.indexOf(v); if (i >= 0) l.splice(i, 1); else l.push(v); planKeepA(); b.setAttribute('aria-pressed', i < 0 ? 'true' : 'false'); },
  plantx(b) {   // a choice on the planner's extras page: its words in the box or out of it; a choice of the same group (land in the morning / evening) gives way
    const k = b.dataset.k, on = b.getAttribute('aria-pressed') === 'true', box = $(`#pl${k}`);
    const sib = b.dataset.g ? [...b.parentNode.querySelectorAll(`[data-g="${b.dataset.g}"]`)].filter((x) => x !== b) : [];
    const drop = new Set([b, ...sib].flatMap((x) => [x.dataset.p, x.dataset.p2]).filter(Boolean).map((x) => x.toLowerCase()));
    const parts = String(pln.a[k] || '').split(/\s*,\s*/).map((x) => x.trim()).filter((x) => x && !drop.has(x.toLowerCase()));
    if (!on) parts.push(b.dataset.p);
    pln.a[k] = parts.join(', ').slice(0, box && box.maxLength > 0 ? box.maxLength : 500); planKeepA();
    if (box) box.value = pln.a[k];
    b.setAttribute('aria-pressed', on ? 'false' : 'true'); sib.forEach((x) => x.setAttribute('aria-pressed', 'false'));
  },
  planlen(b) {   // how long: with a first day it sets the last day, without one it is kept as a number of days
    const n = +b.dataset.v, a = pln.a;
    if (a.from) { a.to = plAdd(a.from, n - 1); const el = $('#plto'); if (el) el.value = a.to; } else a.len = a.len === n ? 0 : n;
    planKeepA(); planSpan();
  },
  planmon(b) { const a = pln.a; a.approx = a.approx === b.dataset.v ? '' : b.dataset.v; planKeepA(); b.closest('.plmons').querySelectorAll('.plchip').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === a.approx ? 'true' : 'false')); const el = $('#plapprox'); if (el) el.value = a.approx; },
  planadults(b) { pln.a.adults = Math.max(1, Math.min(8, (parseInt(pln.a.adults, 10) || 2) + (+b.dataset.v))); planKeepA(); const el = $('#pladults'); if (el) el.textContent = pln.a.adults; },
  plancc(b) {   // where to, country first: open a country's towns ('' = back to the countries)
    pln.cc = b.dataset.v || ''; const w = $('#plwhere'); if (w) { w.innerHTML = plWhereHtml(pln.a); w.scrollIntoView({ block: 'nearest' }); }
  },
  planallcc() { pln.allcc = !pln.allcc; const w = $('#plwhere'); if (w) w.innerHTML = plWhereHtml(pln.a); },
  plantown(b) {   // a town of the open country (or the whole country) in or out of "where to"
    const name = b.dataset.v, k = plNorm(name), g = plGeo(), cur = g && (g.countries || []).find((c) => c.cc === pln.cc);
    let parts = String(pln.a.dest || '').split(/[,،、]/).map((x) => x.trim()).filter(Boolean);
    const has = parts.some((x) => plNorm(x) === k);
    if (has) parts = parts.filter((x) => plNorm(x) !== k);
    else {
      // a town replaces "the whole country" and the whole country replaces its towns: one or the other
      const cn = cur ? [plNorm(snapShort(cur.name).en), plNorm(snapShort(cur.name).th)] : [];
      const towns = cur ? g.places.filter((p) => p.cc === cur.cc).flatMap((p) => [plNorm(snapShort(p.name).en), plNorm(snapShort(p.name).th)]) : [];
      parts = parts.filter((x) => !(b.dataset.whole ? towns : cn).includes(plNorm(x)));
      parts.push(name);
    }
    pln.a.dest = parts.join(', ').slice(0, 200); planKeepA();
    const el = $('#pldest'); if (el) el.value = pln.a.dest;
    const w = $('#plwhere'); if (w) w.innerHTML = plWhereHtml(pln.a);
    const sg = $('#plsug'); if (sg) sg.innerHTML = plSugHtml(pln.a.dest);
  },
  plansug(b) {   // a suggested place: it finishes the word being typed, else it is added to the list
    const parts = String(pln.a.dest || '').split(',').map((x) => x.trim()).filter(Boolean), name = b.dataset.v, last = parts[parts.length - 1] || '';
    if (last && plNorm(last).length >= 2 && (b.dataset.r || plNorm(name).includes(plNorm(last)))) parts[parts.length - 1] = name; else parts.push(name);   // data-r: offered for what is being typed (USA → The United States)
    pln.a.dest = parts.join(', ').slice(0, 200); planKeepA();
    const el = $('#pldest'); if (el) el.value = pln.a.dest; const sg = $('#plsug'); if (sg) sg.innerHTML = plSugHtml(pln.a.dest);
    if (b.dataset.cc) pln.cc = b.dataset.cc;   // a typed town opens its country's towns above
    const w = $('#plwhere'); if (w) w.innerHTML = plWhereHtml(pln.a);
  },
  async planideas() {
    if (pln.busy) return;
    pln.busy = 'ideas'; pln.err = ''; render();
    try { pln.ideas = (await api('POST', '/api/b/planner/ideas', { answers: pln.a })).ideas || []; }
    catch (e) { pln.err = planErr(e); }
    finally { pln.busy = ''; render(); }
    const el = $('#plideas'); if (el && !pln.err) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  planidea(b) {
    const x = (pln.ideas || [])[+b.dataset.v]; if (!x) return;
    const a = pln.a; a.dest = T(x.place); if (a.from) a.to = plAdd(a.from, x.days - 1); else a.len = x.days;
    pln.ideas = null; planKeepA(); render(); const el = $('#pldest'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  planopen() { pln.open = !pln.open; render(); const el = $('#plq'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
  async planroute() { pln.alts = null; await planCall({ answers: pln.a }); },
  async planroute2() { await planCall({ answers: pln.a, two: true }); },
  planpick(b) { const r = (pln.alts || [])[+b.dataset.v]; if (!r) return; pln.route = r; pln.alts = null; pln.prev = null; pln.open = false; planKeep(); render(); const el = $('#plroute'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
  planmove(b) { const i = +b.dataset.i, j = i + (+b.dataset.v); planEdit((d) => { if (d[j]) [d[i], d[j]] = [d[j], d[i]]; }); },
  planadd(b) { const i = +b.dataset.i; if (pln.route && pln.route.days.length >= 31) { toast(planErr({ error: 'days' })); return; } planEdit((d) => { const o = d[i]; d.splice(i + 1, 0, { date: o.date, town: o.town, title: { th: 'วันสบายๆ ไม่มีแผน', en: 'An easy day, nothing planned' }, emoji: '🌿', stops: [], sleep: o.sleep }); }); },
  plandel(b) { if (!armed(b, L('แตะอีกครั้งเพื่อลบวันนี้', 'Tap again to remove this day'))) return; const i = +b.dataset.i; planEdit((d) => { if (d.length > 1) d.splice(i, 1); }); },
  planedit(b) { const i = +b.dataset.i; pln.edit = pln.edit === i ? -1 : i; render(); if (pln.edit === i) { const el = $(`[data-pr="${i}.title"]`); if (el) el.focus(); } },
  planday(b) { pln.ask = L(`วันที่ ${+b.dataset.i + 1}: `, `Day ${+b.dataset.i + 1}: `); render(); const el = $('#plask'); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus(); el.setSelectionRange(el.value.length, el.value.length); } },
  planundo() { if (!pln.prev || pln.busy) return; [pln.route, pln.prev] = [pln.prev, pln.route]; pln.edit = -1; planKeep(); render(); toast(L('ย้อนกลับแล้ว', 'Undone')); },
  async planquick(b) { await planCall({ answers: pln.a, route: planBare(), ask: b.dataset.v }); },
  // B3: the plan a book's spending is held against (the spend page)
  budedit() { budEdit = !budEdit; render(); },
  async budsave(b) {
    const box = b.closest('.budblk'), ed = box && box.querySelector('.budedit'); if (!ed) return;
    const t = trip(b.dataset.trip), cur0 = ed.dataset.cur, old = ((budgetOf(t) || {}).lines || []).filter((l) => l.cur !== cur0);
    const mine = [...ed.querySelectorAll('[data-bud]')].map((i) => ({ cat: i.dataset.bud, cur: cur0, amt: Math.round(parseFloat(String(i.value).replace(/[^\d.]/g, '')) || 0) })).filter((l) => l.amt > 0);
    if (!mine.length && !old.length) { toast(L('ใส่งบอย่างน้อยหนึ่งหมวด', 'Type a plan for at least one kind')); return; }
    try { const r = await api('PUT', `/api/b/budget/${t.id}`, { lines: [...mine, ...old] }); S.budgets = { ...(S.budgets || {}), [t.id]: r.budget }; budEdit = false; toast(L('บันทึกงบแล้ว', 'Plan saved')); render(); } catch (_) { toast(L('ยังบันทึกไม่ได้ ลองใหม่เมื่อมีเน็ต', 'Could not save — try again with signal')); }
  },
  async budclear(b) {
    const t = trip(b.dataset.trip);
    try { const r = await api('PUT', `/api/b/budget/${t.id}`, { lines: [] }); S.budgets = { ...(S.budgets || {}) }; if (r.budget) S.budgets[t.id] = r.budget; else delete S.budgets[t.id]; budEdit = false; render(); } catch (_) { toast(L('ยังบันทึกไม่ได้ ลองใหม่เมื่อมีเน็ต', 'Could not save — try again with signal')); }
  },
  async planask() { const ask = (($('#plask') || {}).value || '').trim(); if (!ask || /^(วันที่|Day) \d+:$/.test(ask)) { toast(L('พิมพ์ก่อนว่าอยากเปลี่ยนอะไร', 'Type what should change first')); return; } await planCall({ answers: pln.a, route: planBare(), ask }); },
  async planshare() {
    if (!pln.route) return; const text = plText(pln.route);
    if (navigator.share) { try { await navigator.share({ text }); } catch (e) { if (e.name !== 'AbortError') toast(L('แชร์ไม่สำเร็จ', 'Could not share')); } return; }
    try { await navigator.clipboard.writeText(text); toast(L('คัดลอกข้อความแล้ว — วางใน LINE ได้เลย', 'Copied — paste it into LINE')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Could not copy in this browser')); }
  },
  plannew(b) {   // a clean page: the kept plan stays in the list, the family's way of travelling stays ticked
    if (!armed(b, L('แตะอีกครั้งเพื่อเริ่มแผนใหม่', 'Tap again to start a new plan'))) return;
    clearTimeout(planSaveT); planSaveT = null; planSave();
    pln.a = { ...pln.a, dest: '', from: '', to: '', approx: '', len: 0, stays: '', flights: '', want: '', avoid: '' };
    pln.route = null; pln.alts = null; pln.ideas = null; pln.prev = null; pln.id = ''; pln.at = 0; pln.open = false; pln.err = '';
    ls('plan', pln.a); ls('planRoute', null); ls('planId', null); ls('planAt', null);
    if (location.hash !== '#/planner/where') location.hash = '#/planner/where'; else render();   // a new plan starts on its first question
    scrollTo(0, 0);
  },
  planload(b) {
    const p = (pln.plans || []).find((x) => x.id === b.dataset.v); if (!p) return;
    clearTimeout(planSaveT); planSaveT = null; planSave();
    pln.a = { ...pln.a, ...p.answers }; pln.route = p.route; pln.id = p.id; pln.at = p.at; pln.alts = null; pln.ideas = null; pln.prev = null; pln.open = false; pln.err = '';
    ls('plan', pln.a); ls('planRoute', pln.route); ls('planId', pln.id); ls('planAt', pln.at); render(); const el = $('#plroute'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  async plandrop(b) {
    if (!armed(b, L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete'))) return;
    const id = b.dataset.v;
    try { await api('DELETE', `/api/b/planner/plans/${encodeURIComponent(id)}`); pln.plans = (pln.plans || []).filter((p) => p.id !== id); if (pln.id === id) { pln.id = ''; ls('planId', null); } render(); }
    catch (_) { toast(L('ลบไม่ได้ ลองอีกครั้ง', 'Could not delete — try again')); }
  },
  snapplan(b) {   // a book from photos as the start of the next plan: its towns as where, its days as wishes, no dates (a new trip)
    const t = trip(b.dataset.t); if (!t) return;
    const towns = [...new Set(t.days.map((d) => T(d.place)).filter(Boolean).flatMap((x) => x.split(' · ')))].slice(0, 6);
    const wish = t.days.map((d) => T(d.title)).filter((x) => x && !/^(วันที่|Day) \d+$/.test(x)).slice(0, 8).join(' · ');
    pln.a = { dest: towns.join(', ') || T(t.title), from: '', to: '', approx: '', len: Math.min(31, t.days.length), adults: 2, seniors: false, pace: 'slow', move: 'mix', budget: 'mid', likes: [], needs: [], stays: '', flights: '', want: L(`แบบทริป "${T(t.title)}"`, `Like our trip "${T(t.title)}"`) + (wish ? ` — ${wish}` : ''), avoid: '' };
    pln.route = null; pln.alts = null; pln.id = ''; pln.at = 0; ls('plan', pln.a); ls('planRoute', null); ls('planId', null); ls('planAt', null); location.hash = '#/planner';
  },
  async planbook() {
    if (pln.busy) return;
    pln.busy = 'book'; pln.err = ''; safeRender();
    try { clearTimeout(planSaveT); planSaveT = null; await api('POST', '/api/b/planner/draft', { answers: pln.a, route: planBare(), plan: pln.id }); pln.route = null; pln.prev = null; pln.id = ''; pln.plans = null; ls('planId', null); ls('planAt', null); imp.list = null; imp.job = { status: 'running', slug: '', log: [], started: Date.now() }; pln.info = null; ls('planRoute', null); location.hash = '#/import'; impRefresh(); }
    catch (e) { pln.err = planErr(e); }
    finally { pln.busy = ''; safeRender(); }
  },
  phmore(b) { const r = b.closest('.phsrow'); if (r) r.classList.add('all'); b.remove(); },   // the photo box: show the meals' chips too
  pickvideo(b) { const vp = $('#vpick'); vp.dataset.t = b.dataset.t; vp.dataset.d = b.dataset.d; vp.value = ''; vp.click(); },
  pickphotos(b) { const fp = $('#fpick'); fp.dataset.t = b.dataset.t; fp.dataset.d = b.dataset.d; fp.dataset.place = b.dataset.place || ''; fp.dataset.key = b.dataset.key || ''; fp.dataset.kind = b.dataset.kind || ''; fp.click(); },   // a "where was it?" chip passes its place
  // full backup zip (editors only on the server too); the browser downloads it in place, the page stays
  backup() {
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อนจึงทำสำเนาได้', 'Connect to the internet to back up')); return; }
    if (queue.length) toast(L('ยังมีบันทึกรอส่ง — ไฟล์นี้จะยังไม่มีรายการเหล่านั้น', 'Some records are still waiting to send — this file will not have them yet'));
    else toast(L('กำลังเตรียมสำเนา… รูปเยอะอาจใช้เวลาสักครู่', 'Preparing the backup… many photos can take a minute'));
    ls('last_backup', Date.now());
    const a = document.createElement('a'); a.href = '/api/export.zip'; a.download = ''; document.body.appendChild(a); a.click(); a.remove();
    render();
  },
  async createtrip(b, e) {
    e.preventDefault();
    const f = $('#ntf'), from = f.from.value, to = f.to.value;
    if (!from || !to) { $('#nterr').textContent = L('ใส่วันแรกและวันสุดท้าย หรือแตะจำนวนวัน', 'Give the first and last day, or tap how long'); return; }
    const mon = (l) => new Date(from + 'T12:00:00').toLocaleDateString(l, { month: 'long', year: 'numeric' });
    const typed = f.title.value.trim(), th = typed || `ทริป${mon('th-TH')}`, en = f.title_en.value.trim() || typed || `Trip · ${mon('en-GB')}`;
    const slug = bookSlug(f.slug.value.trim() || f.title_en.value.trim() || f.title.value.trim() || `trip-${from}`);
    try {
      await api('POST', '/api/b/trips', { slug, title: { th, en }, date_from: from, date_to: to, accent: f.accent.value });
      closeSheet(); await load(); nav('#/t/' + slug);
    } catch (err) { $('#nterr').textContent = err.code === 409 ? L('มีเล่มชื่อนี้แล้ว', 'A book with this id exists') : L('ตรวจวันที่อีกครั้ง (ไม่เกิน 60 วัน)', 'Check the dates (60 days max)'); }
  },
  closesheet() { closeSheet(); },
  ntlen(b) {   // how long: the last day from the first (today when none was given)
    const f = $('#ntf'); if (!f) return;
    const pad = (x) => String(x).padStart(2, '0'), iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (!f.from.value) f.from.value = iso(new Date());
    const d = new Date(f.from.value + 'T12:00:00'); d.setDate(d.getDate() + (+b.dataset.v) - 1); f.to.value = iso(d);
    f.querySelectorAll('[data-a="ntlen"]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  },
  vgrandpin() {   // a PIN the parents do not have to think up: six digits, never one digit repeated or a plain run
    const box = $('#vgpin'); if (!box) return; let p = '';
    do { const a = new Uint32Array(6); crypto.getRandomValues(a); p = [...a].map((x) => x % 10).join(''); } while (/^(\d)\1+$/.test(p) || '0123456789'.includes(p) || '9876543210'.includes(p));
    box.value = p; drafts['vg:pin'] = p;
  },
  vgnamechip(b) { const box = $('#vgname'); if (box) { box.value = b.dataset.v; drafts['vg:name'] = b.dataset.v; } },
  nearpick(b) {   // in place: the sheet stays as it is
    if (!nearHeld) return; const k = +b.dataset.k, on = !nearHeld.pick.has(k); if (on) nearHeld.pick.add(k); else nearHeld.pick.delete(k);
    b.classList.toggle('kept', on); b.classList.toggle('off', !on); b.setAttribute('aria-pressed', String(on));
    const go = document.getElementById('neargo'); if (go) { go.disabled = !nearHeld.pick.size; go.textContent = nearHeld.pick.size ? L(`เพิ่ม ${nearHeld.pick.size} รูปอยู่ดี`, `Add ${nearHeld.pick.size} anyway`) : L('เพิ่มอยู่ดี', 'Add anyway'); }
  },
  async nearadd() {
    const h = nearHeld; if (!h || !h.pick.size) return;
    closeSheet(); nearHeld = null;
    for (const k of h.pick) await h.send(h.held[k]);
    h.urls.forEach((u) => URL.revokeObjectURL(u));
    toast(L(`เพิ่ม ${h.pick.size} รูปแล้ว`, `${h.pick.size} added`)); safeRender();
  },
  async yearreel(b) {   // the year's film (server/reel.js startYear)
    const y = b.dataset.v; b.disabled = true;
    try { await api('POST', `/api/b/reel-year/${encodeURIComponent(y)}`, { lang, mood: reelMood() }); reelJob = { trip: 'year:' + y, state: 'run', pct: 0 }; safeRender(); reelPoll(); }
    catch (e) {
      b.disabled = false;
      if (e && e.error === 'busy' && e.body && e.body.trip === 'year:' + y) { reelJob = { trip: 'year:' + y, state: 'run', pct: 0 }; safeRender(); reelPoll(); return; }
      toast(e && e.error === 'few' ? L('ต้องมีรูปในเล่มของปีนี้อย่างน้อย 3 รูป', 'The year’s books need at least 3 photos') : e && e.error === 'busy' ? L('กำลังทำคลิปอื่นอยู่ รอสักครู่', 'Another film is being made — try in a moment') : L('ต้องมีเน็ตเพื่อทำคลิป', 'You need a connection to make the film'));
    }
  },
  reelmood(b) { ls('reelMood', b.dataset.v); $$('.reelmood .tpo').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.v === b.dataset.v))); },
  async reelmake(b) {
    const t = trip(b.dataset.t); if (!t) return;
    b.disabled = true;
    try { await api('POST', `/api/b/reel/${encodeURIComponent(t.id)}`, { lang, mood: reelMood() }); reelJob = { trip: t.id, state: 'run', pct: 0 }; safeRender(); reelPoll(); }
    catch (e) {
      b.disabled = false;
      if (e && e.error === 'busy' && e.body && e.body.trip === t.id) { reelJob = { trip: t.id, state: 'run', pct: 0 }; safeRender(); reelPoll(); return; }   // this book's film is already being made (another phone, or before a reload)
      toast(e && e.error === 'few' ? L('ต้องมีรูปในเล่มอย่างน้อย 3 รูป', 'The book needs at least 3 photos') : e && e.error === 'busy' ? L('กำลังทำคลิปของอีกเล่มอยู่ รอสักครู่', 'Another book’s film is being made — try in a moment')
        : L('ต้องมีเน็ตเพื่อทำคลิป', 'You need a connection to make the film'));
    }
  },
  async reelshare(b) {   // the phone's share sheet with the film itself (LINE, messages…); else it is saved
    const t = trip(b.dataset.t); if (!t || !t.reel) return;
    const url = `/media/reel/${encodeURIComponent(t.id)}?v=${encodeURIComponent(t.reel.v)}`;
    b.disabled = true;
    try {
      const blob = await (await fetch(url, { credentials: 'same-origin' })).blob(), file = new File([blob], `${(T(t.title) || 'trip').replace(/[\\/:*?"<>|]+/g, ' ').trim().slice(0, 60)}.mp4`, { type: 'video/mp4' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title: T(t.title) }).catch(() => {});
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = file.name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); }
    } catch (_) { toast(L('ต้องมีเน็ตเพื่อส่งคลิป', 'You need a connection to send the film')); }
    finally { b.disabled = false; }
  },
  taste(b) {   // a style chip on #/taste: none → love → skip → none, saved in place
    const side = b.dataset.g, k = b.dataset.v, t = famTaste(), s = t[side], st = tasteState(side, k);
    s.like = s.like.filter((x) => x !== k); s.avoid = s.avoid.filter((x) => x !== k);
    const next = st === '' ? 'like' : st === 'like' ? 'avoid' : '';
    if (next) s[next].push(k);
    b.dataset.st = next; b.setAttribute('aria-pressed', !!next); const m = b.querySelector('.tsm'); if (m) m.textContent = next === 'like' ? '💛' : next === 'avoid' ? '🚫' : '';
    tasteSave(t);
  },
  tasteadd(b) {   // a style the stars suggest: loved, the chip above shows it, the suggestion goes
    const side = b.dataset.g, k = b.dataset.v, t = famTaste(), sd = t[side];
    sd.avoid = sd.avoid.filter((x) => x !== k); if (!sd.like.includes(k)) sd.like.push(k);
    tasteSave(t);
    const c = document.querySelector(`.tastechip[data-g="${side}"][data-v="${k}"]`); if (c) { c.dataset.st = 'like'; c.setAttribute('aria-pressed', 'true'); const m = c.querySelector('.tsm'); if (m) m.textContent = '💛'; }
    b.remove();
  },
  tasteneed(b) { const t = famTaste(), k = b.dataset.v; t.needs = t.needs.includes(k) ? t.needs.filter((x) => x !== k) : [...t.needs, k]; b.setAttribute('aria-pressed', t.needs.includes(k)); tasteSave(t); },
  tastekid(b) { const t = famTaste(), k = b.dataset.v, s = b.dataset.k, cur = t.kids[s] || []; t.kids[s] = cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]; b.setAttribute('aria-pressed', t.kids[s].includes(k)); tasteSave(t); const sm = document.querySelector(`.tks[data-k="${CSS.escape(s)}"]`); if (sm) { const rows = [...TASTE_OUT, ...TASTE_FOOD].filter((r) => t.kids[s].includes(r[0])); sm.textContent = rows.length ? rows.slice(0, 6).map((r) => `${r[1]} ${L(r[2], r[3])}`).join(' · ') + (rows.length > 6 ? ' …' : '') : L('แตะเพื่อเลือก (ไม่ใส่ก็ได้)', 'Tap to choose (optional)'); } },
  eattag(b) { const k = b.dataset.v; if (eatTags.has(k)) eatTags.delete(k); else eatTags.add(k); b.setAttribute('aria-pressed', eatTags.has(k)); eatFilter(); },
  eatk(b) { eatKind = +b.dataset.v; $$('[data-a="eatk"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === b.dataset.v)); eatFilter(); },
  eatpick(b) { eatPick = !eatPick; b.setAttribute('aria-pressed', eatPick); eatFilter(); },
  driver(b) {   // big-print address card to hand a taxi driver (works offline: it's in the book's state)
    const st = ((trip(b.dataset.t) || {}).info || {}).stays || [], x = st[+b.dataset.v]; if (!x) return;
    const parts = String(x.addr).split(' · ');
    openSheet(`<div class="drivercard"><div class="kicker">${L('กรุณาพาไปที่', 'Please take us to')}${parts.length > 1 ? ' · 請送我們到' : ''}</div><b>${esc(T(x.prop))}</b>${parts.map((a) => `<p>${esc(a)}</p>`).join('')}</div>
<div class="row end">${extA(mapsUrl(x.q || x.addr), '🗺️ ' + L('เปิดแผนที่', 'Open in Maps'), 'btn ghost small')}<button class="btn small" data-a="closesheet">${L('ปิด', 'Close')}</button></div>`);
  },
  offline(b) { if (!navigator.onLine) { toast(L('ต้องมีสัญญาณตอนเก็บ', 'Needs a connection to store the book')); return; } packOffline(trip(b.dataset.t), b.dataset.v === 'all'); },
  // hearts from the family
  heartto(b) { heartTo = b.dataset.v; $$('[data-a="heartto"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === heartTo)); },
  heartemo(b) { heartEmoji = b.dataset.v; $$('[data-a="heartemo"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === heartEmoji)); const s = $('[data-a="sendheart"]'); if (s) s.innerHTML = `${L('ส่ง', 'Send')} ${emo(heartEmoji)}`; },
  sendheart(b) {
    const t = trip(b.dataset.t), f = $('#hfrom'), m = $('#htext'), from = f.value.trim(), text = m.value.trim();
    if (!from) { f.focus(); toast(L('ใส่ชื่อผู้ส่งก่อนนะ เด็กๆ จะได้รู้ว่าใครส่ง', 'Add your name so the kids know who it is from')); return; }
    ls('heartfrom', from); delete drafts.hfrom; delete drafts.htext; m.value = '';
    const id = uid('h'), dn = dayNow(t), day = dn >= 0 ? dn : null, at = Date.now();
    burst(b, [heartEmoji, '💕', '✨']);
    toast(L(`ส่ง ${heartEmoji} ถึง${kidName(heartTo)}แล้ว`, `${heartEmoji} sent to ${kidName(heartTo)}`));
    enqueue({ method: 'PUT', url: '/api/b/hearts/' + id, limit: true, body: { trip: t.id, day, child: heartTo, emoji: heartEmoji, text, from },
      local: { coll: 'hearts', id, row: { trip: t.id, day, child: heartTo, emoji: heartEmoji, text, from, at, mine: true } } });
  },
  delheart(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/hearts/' + encodeURIComponent(b.dataset.v), local: { coll: 'hearts', id: b.dataset.v, del: true } }); },
};

/* ---------- fav/note save when leaving the field; empty = delete ---------- */
async function saveBlur(el) {
  const kind = el.dataset.aBlur, text = el.value.trim();
  if (kind === 'rnote') {   // travel-notebook note: the card holds the context
    delete drafts[el.dataset.draft];
    const card = el.closest('.rev'), cur = reviewFrom(card); if ((cur.note || '') !== text) putReview(card, { note: text }); return;
  }
  const t = trip(el.dataset.t);
  // passport Explorer ID answers are per child, not per day
  const field = kind === 'field', whole = kind === 'letter' || kind === 'fore' || kind === 'lessons', d = field || whole ? null : +el.dataset.d;   // the letter and the foreword belong to the whole trip
  const id = field ? `${t.id}.field.${el.dataset.v}.${el.dataset.k}` : whole ? `${t.id}.${kind}.all` : `${t.id}.${kind}.d${d}`, cur = S.entries.find((e) => e.id === id);
  delete drafts[el.dataset.draft];
  if (!text) { if (cur) await delEntry(id); return; }
  if (!cur || cur.text !== text) await putEntry(t, field ? { day: null, kind, child: el.dataset.k, first_key: el.dataset.v, text } : { day: d, kind, text }, id);
}

// travel notebook: a review card (details.rev) carries its context; every tap upserts the whole row
const reviewFrom = (card) => { const t = trip(card.dataset.t); return reviewOf(t, card.dataset.kind, card.dataset.key) || { trip: t.id, day: +card.dataset.d, kind: card.dataset.kind, key: card.dataset.key, name: { th: card.dataset.nth, en: card.dataset.nen }, rating: null, tags: [], kids: {}, again: null, note: '' }; };
function putReview(card, patch) {
  const t = trip(card.dataset.t), cur = reviewFrom(card), id = revId(t, cur.kind, cur.key);
  const body = { trip: t.id, day: cur.day, kind: cur.kind, key: cur.key, name: cur.name, rating: cur.rating, tags: cur.tags || [], kids: cur.kids || {}, again: cur.again, note: cur.note || '', ...patch };
  return enqueue({ method: 'PUT', url: '/api/b/reviews/' + encodeURIComponent(id), body, local: { coll: 'reviews', id, row: { ...body, at: Date.now(), created_by: S.me.name } } });
}
Object.assign(A, {
  capto(b) { capKeep(); CAP.edit.child = b.dataset.v; safeRender(); },
  capage(b) { capKeep(); CAP.edit.open_on = b.dataset.v; safeRender(); },
  capedit(b) { const c = (CAP.list || []).find((x) => x.id === b.dataset.v); if (!c) return; CAP.edit = { id: c.id, child: c.child, title: c.title, text: c.text || '', open_on: c.open_on }; safeRender(); setTimeout(() => { const el = $('#captext'); if (el) el.focus(); }, 0); },
  async capsave(b) {
    capKeep(); const e = CAP.edit, say = (t) => { const m = $('#capmsg'); if (m) m.textContent = t; };
    if (!e.text.trim()) return say(L('ยังไม่ได้เขียนจดหมาย', 'The letter is empty'));
    if (!e.open_on) return say(L('เลือกวันที่จะเปิด', 'Pick the day it opens'));
    b.disabled = true;
    try { await api('PUT', `/api/b/capsules/${encodeURIComponent(e.id)}`, e); CAP.edit = null; toast(L('บันทึกแล้ว ปิดผนึกเมื่อพร้อม', 'Saved — seal it when it is ready')); capLoad(true); }
    catch (x) { say(x && x.error === 'past' ? L('วันที่เปิดต้องเป็นวันในอนาคต', 'The day must be in the future') : x && x.error === 'sealed' ? L('ฉบับนี้ปิดผนึกแล้ว แก้ไม่ได้', 'This one is sealed') : L('บันทึกไม่ได้ ต้องมีเน็ต', 'Could not save — you need a connection')); }
    finally { b.disabled = false; }
  },
  async capseal(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้ง หลังจากนี้แก้และอ่านไม่ได้จนถึงวันเปิด', 'Tap again — after this it cannot be read or changed until its day'); return; }
    b.disabled = true;
    try { await api('POST', `/api/b/capsules/${encodeURIComponent(b.dataset.v)}/seal`); toast(L('ปิดผนึกแล้ว 🔒', 'Sealed 🔒')); } catch (_) { toast(L('ปิดผนึกไม่ได้ ลองอีกครั้ง', 'Could not seal — try again')); }
    capLoad(true);
  },
  async capdel(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete'); return; }
    b.disabled = true;
    try { await api('DELETE', `/api/b/capsules/${encodeURIComponent(b.dataset.v)}`); } catch (_) {}
    if (CAP.edit && CAP.edit.id === b.dataset.v) CAP.edit = null;
    capLoad(true);
  },
  async devout(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้ง', 'Tap again'); return; }
    b.disabled = true;
    try { await api('POST', `/api/b/devices/${encodeURIComponent(b.dataset.v)}/out`); toast(L('เครื่องนั้นออกจากระบบแล้ว', 'That phone is signed out')); } catch (_) { toast(L('ทำไม่ได้ ลองอีกครั้ง', 'Could not — try again')); }
    devLoad(true);
  },
  async devoutall(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อให้ทุกเครื่องออก', 'Tap again to sign them all out'); return; }
    b.disabled = true;
    try { const r = await api('POST', '/api/b/devices/out-others'); toast(L(`ให้ออกแล้ว ${r.out} เครื่อง`, `${r.out} signed out`)); } catch (_) { toast(L('ทำไม่ได้ ลองอีกครั้ง', 'Could not — try again')); }
    devLoad(true);
  },
  async codesave(b) {
    const v = (id) => ($('#' + id) || {}).value || '', msg = $('#codemsg'), say = (t) => { if (msg) msg.textContent = t; };
    const old = v('codeold'), code = v('codenew');
    if (!/^\d{6,12}$/.test(code)) return say(L('รหัสใหม่ต้องเป็นตัวเลข 6–12 หลัก', 'The new code is 6–12 digits'));
    if (code !== v('codenew2')) return say(L('รหัสใหม่สองช่องไม่ตรงกัน', 'The two new codes differ'));
    b.disabled = true;
    try {
      const r = await api('PUT', '/api/b/family/code', { old, code, others: !!($('#codeothers') || {}).checked });
      ['codeold', 'codenew', 'codenew2'].forEach((id) => { const el = $('#' + id); if (el) el.value = ''; });
      say(L('เปลี่ยนรหัสแล้ว ใช้รหัสใหม่ตอนเข้าระบบครั้งต่อไป', 'Changed — use the new code at the next sign-in') + (r.out ? L(` · ให้ออก ${r.out} เครื่อง`, ` · ${r.out} signed out`) : ''));
      devLoad(true);
    } catch (e) {
      say(e && e.error === 'old' ? L('รหัสเดิมไม่ถูก', 'The current code is wrong') : e && e.error === 'pin-taken' ? L('รหัสนี้ใช้กับญาติอยู่ เลือกรหัสอื่น', 'The relatives use that code — pick another') : e && e.error === 'same' ? L('รหัสใหม่เหมือนรหัสเดิม', 'That is the current code') : e && e.code === 429 ? L('ลองผิดหลายครั้ง รอ 10 นาที', 'Too many tries — wait 10 minutes') : L('เปลี่ยนไม่ได้ ลองอีกครั้ง', 'Could not change it — try again'));
    } finally { b.disabled = false; }
  },
  inboxpick(b) {   // a relative picks photos to send for a book
    const from = (($('#hfrom') || {}).value || ls('heartfrom') || '').trim();
    if (!from) { const f = $('#hfrom'); if (f) f.focus(); toast(L('ใส่ชื่อผู้ส่งก่อน เช่น ยาย', 'Type who it is from first, e.g. Grandma')); return; }
    ls('heartfrom', from);
    let inp = document.getElementById('inboxin');
    if (!inp) { inp = document.createElement('input'); inp.type = 'file'; inp.id = 'inboxin'; inp.accept = 'image/*'; inp.multiple = true; inp.hidden = true; document.body.append(inp); }
    inp.dataset.t = b.dataset.t; inp.value = ''; inp.click();
  },
  async inboxok(b) {
    const id = b.dataset.v, sel = document.getElementById('ibday-' + id), day = sel && sel.value !== '' ? +sel.value : null; b.disabled = true;
    try { await api('POST', `/api/b/inbox/${encodeURIComponent(id)}/ok`, { day }); INBOX.items = (INBOX.items || []).filter((x) => x.id !== id); toast(L('ใส่ในเล่มแล้ว', 'In the book')); await load().catch(() => {}); }
    catch (_) { toast(L('ใส่ไม่ได้ ลองอีกครั้ง', 'Could not add it — try again')); }
    safeRender();
  },
  async inboxall(b) {
    const ids = (INBOX.items || []).filter((x) => x.trip === b.dataset.t).map((x) => x.id); b.disabled = true; let n = 0;
    for (const id of ids) { const sel = document.getElementById('ibday-' + id), day = sel && sel.value !== '' ? +sel.value : null; try { await api('POST', `/api/b/inbox/${encodeURIComponent(id)}/ok`, { day }); n++; INBOX.items = INBOX.items.filter((x) => x.id !== id); } catch (_) {} }
    toast(L(`ใส่ในเล่มแล้ว ${n} รูป`, `${n} in the book`)); await load().catch(() => {}); safeRender();
  },
  async inboxno(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete'); return; }
    const id = b.dataset.v; b.disabled = true;
    try { await api('DELETE', `/api/b/inbox/${encodeURIComponent(id)}`); INBOX.items = (INBOX.items || []).filter((x) => x.id !== id); } catch (_) { toast(L('ลบไม่ได้ ลองอีกครั้ง', 'Could not delete — try again')); }
    safeRender();
  },
  async cfkeep(b) {   // a conflict settled: this phone's text again with force, or the other phone's kept (the state is read again)
    const c = conflicts.shift(); ls('conflicts', conflicts); if (!c) return closeSheet();
    if (b.dataset.v === 'mine') await enqueue({ ...c.op, qid: undefined, body: { ...c.op.body, force: true } });
    else await load().catch(() => {});
    if (conflicts.length) conflictSheet(); else { closeSheet(); safeRender(); }
  },
  tellplay(b) {   // the audiobook: play this telling, then the next card's
    const au = $('#tellaudio'), cards = $$('.tellcard'); if (!au) return;
    const go = (k) => { const c = cards[k]; if (!c) { cards.forEach((x) => x.classList.remove('on')); return; } cards.forEach((x) => x.classList.toggle('on', x === c)); c.scrollIntoView({ block: 'nearest', inline: 'center' }); const m = S.media.find((x) => x.id === c.dataset.v); au.src = (m && m.local) || `/media/${encodeURIComponent(c.dataset.v)}`; au.onended = () => go(k + 1); au.play().catch(() => {}); };
    go(+b.dataset.k);
  },
  famzoom(b) { const r = route().parts, tid = r[0] === 'map' ? r[1] || '' : ''; FM.zoom = b.dataset.v ? { tid, ids: b.dataset.v.split('~') } : null; FM.pick = null; if (typeof kidWorldAt !== 'undefined') kidWorldAt = null; if (typeof beep === 'function' && r[0] === 'kid') beep('tap'); safeRender(); },
  fampin(b) { const tid = route().parts[1] || ''; FM.pick = FM.pick && FM.pick.tid === tid && FM.pick.k === +b.dataset.v ? null : { tid, k: +b.dataset.v }; safeRender(); },
  async healthsrvclear(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อล้าง', 'Tap again to clear'); return; }
    b.disabled = true;
    try { await api('DELETE', '/api/b/health/server'); if (HEALTH.server) HEALTH.server.events = []; } catch (_) { toast(L('ล้างไม่ได้ ลองใหม่อีกครั้ง', 'Could not clear, try again')); }
    safeRender();
  },
  async orphansgo(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อลบ', 'Tap again to remove'); return; }
    b.disabled = true;
    try { const r = await api('POST', '/api/b/health/orphans', {}); HEALTH.orphans = r; toast(L(`ลบแล้ว ${r.removed || 0} ไฟล์`, `Removed ${r.removed || 0} file${r.removed === 1 ? '' : 's'}`)); } catch (_) { toast(L('ลบไม่ได้ ลองใหม่อีกครั้ง', 'Could not remove, try again')); }
    safeRender();
  },
  async healthclear(b) {
    if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = L('แตะอีกครั้งเพื่อล้าง', 'Tap again to clear'); return; }
    b.disabled = true;
    try { await api('DELETE', '/api/b/health/errors'); HEALTH.errors = []; } catch (_) { toast(L('ล้างไม่ได้ ลองใหม่อีกครั้ง', 'Could not clear, try again')); }
    safeRender();
  },
  rate(b) { const card = b.closest('.rev'), n = +b.dataset.v, cur = reviewFrom(card); if (n && n >= 4) burst(b, ['⭐', '✨']); putReview(card, { rating: n === 0 || cur.rating === n ? null : n }); },
  rtag(b) { const card = b.closest('.rev'), cur = reviewFrom(card), k = b.dataset.v, tags = (cur.tags || []).includes(k) ? cur.tags.filter((x) => x !== k) : [...(cur.tags || []), k]; putReview(card, { tags }); },
  rkid(b) { const card = b.closest('.rev'), cur = reviewFrom(card), kids = { ...(cur.kids || {}) }; if (kids[b.dataset.k] === b.dataset.v) delete kids[b.dataset.k]; else kids[b.dataset.k] = b.dataset.v; if (b.dataset.v === 'love') burst(b, ['😍', '💕']); putReview(card, { kids }); },
  ragain(b) { const card = b.closest('.rev'), cur = reviewFrom(card), v = b.dataset.v === '1'; putReview(card, { again: cur.again === v ? null : v }); },
  rdel(b) { if (!armed(b)) return; const card = b.closest('.rev'), cur = reviewFrom(card), id = revId(trip(card.dataset.t), cur.kind, cur.key); enqueue({ method: 'DELETE', url: '/api/b/reviews/' + encodeURIComponent(id), local: { coll: 'reviews', id, del: true } }); },
  async copynotebook() {
    const lines = [L('สมุดโน้ตนักเดินทาง — อะไรที่ครอบครัวเราชอบ', 'Travel notebook — what works for our family'), ''];
    for (const kind of ['stay', 'food', 'place']) {
      const list = S.reviews.filter((r) => r.kind === kind).sort((a, b) => (b.rating || 0) - (a.rating || 0)); if (!list.length) continue;
      lines.push(`${RKIND[kind][0]} ${L(RKIND[kind][1], RKIND[kind][2])}`);
      list.forEach((r) => { const t = trip(r.trip); lines.push(`  ${r.rating ? '★'.repeat(r.rating) : '—'} ${T(r.name)} (${t ? T(t.title).split(' · ')[0] : r.trip}${r.day !== null && r.day !== undefined ? ` ${L('วันที่', 'day')} ${r.day + 1}` : ''})${(r.tags || []).length ? ' · ' + r.tags.map((k) => rtagLabel(r.kind, k)).join(', ') : ''}${Object.entries(r.kids || {}).map(([k, v]) => ` · ${kidName(k)} ${VERDICT[v]}`).join('')}${r.again === false ? ` · ${L('ไม่ไปอีก', 'not again')}` : r.again ? ` · ${L('ไปอีก', 'again')}` : ''}${r.note ? ` — ${r.note}` : ''}`); });
      lines.push('');
    }
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(L('คัดลอกแล้ว', 'Copied')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Copy not available here')); }
  },
});

// ask the guide without a connection: the question's key words (filler like "ถ้า… ทำยังไง", "where can we…" dropped) go through
// the book's own search on the phone; the best few sections are shown as links. No Claude, nothing sent.
const ASK_FILL_TH = /ทำยังไงดี|ทำยังไง|ทำอย่างไร|ยังไงดี|ยังไง|อย่างไร|ที่ไหนดี|ที่ไหน|ตรงไหน|อะไรดี|อะไร|ได้ไหม|ได้มั้ย|หรือเปล่า|ไหม|มั้ย|บ้าง|วันนี้|คืนนี้|พรุ่งนี้|ควรจะ|ควร|ถ้า|เรา|จะ|ดีไหม|นะ|คะ|ค่ะ|ครับ|จ้ะ|หน่อย/g;
const ASK_FILL_EN = /\b(what|where|when|which|how|who|do|does|did|we|i|is|are|was|the|a|an|to|if|can|could|should|would|today|tonight|tomorrow|for|of|in|on|at|our|us|it|there|any|some|near|good|best|please)\b/gi;
function askOffline(t, q, box) {
  const core = q.replace(ASK_FILL_TH, ' ').replace(ASK_FILL_EN, ' ').replace(/[?？!.,]/g, ' ').replace(/\s+/g, ' ').trim();
  let hits = core ? bookFind(t, core).list : [];
  if (!hits.length && core) {   // no section has every word: take the best per word
    const seen = new Map();
    core.split(' ').filter((w) => w.length > 1).forEach((w) => bookFind(t, w).list.slice(0, 8).forEach((x) => { const c = seen.get(x.e); if (!c || c.score < x.score) seen.set(x.e, x); }));
    hits = [...seen.values()].sort((a, b) => b.score - a.score);
  }
  const alts = core ? core.split(' ') : [];
  const html = `<p class="label">📴 ${L('ไม่มีเน็ต — คำตอบจากคู่มือที่อยู่ในเครื่อง', 'Offline — the parts of the manual that match (no helper)')}</p>`
    + (hits.length ? `<ul class="sres">${hits.slice(0, 5).map(({ e }) => `<li class="k-${e.topic}"><a href="${esc(e.href)}"><span class="stopic">${esc(topicName(e.topic))}</span><b>${esc((e.title[lang] || e.title.en).replace(/\s+·\s+\d+$/, ''))}</b><span class="ssnip">${snippet(e, alts)}</span></a></li>`).join('')}</ul>`
      : `<p>${L('ไม่พบในคู่มือ ลองคำสั้นๆ เช่น หมอ แท็กซี่ ห้องน้ำ', 'Nothing in the manual — try one word: doctor, taxi, toilet')}</p>`)
    + `<p><a href="#/t/${esc(t.id)}/search">${L('ค้นทั้งเล่ม ›', 'Search the whole book ›')}</a></p>`;
  askAns = { t: t.id, q, html };
  box.hidden = false; box.innerHTML = html;
}
/* ---------- the day as one picture (4:5, for LINE): drawn on this phone from what the book already holds — the day's ⭐ photo
   (or its art), the date and title, today in brief (or the favourite words), one quote, the app's name. Nothing is uploaded or
   sent to an AI; it goes only where the grown-up shares it. ---------- */
const CARD_W = 1080, CARD_H = 1350;
const loadImg = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
// lines that fit maxW: Thai has no spaces, so break between words found by Intl.Segmenter (or between characters without it)
function wrapLines(ctx, text, maxW, maxLines) {
  const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? [...new Intl.Segmenter(lang === 'en' ? 'en' : 'th', { granularity: 'word' }).segment(text)].map((x) => x.segment) : [...text];
  const lines = []; let cur = '';
  for (const w of seg) {
    if (w === '\n') { lines.push(cur.trim()); cur = ''; continue; }
    if (ctx.measureText(cur + w).width > maxW && cur.trim()) { lines.push(cur.trim()); cur = w.trimStart(); } else cur += w;
  }
  if (cur.trim()) lines.push(cur.trim());
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, '…'); }
  return lines;
}
async function drawDayCard(t, i) {
  await (document.fonts ? document.fonts.ready : Promise.resolve());
  const css = getComputedStyle(document.documentElement), accent = css.getPropertyValue('--accent').trim() || '#1F3A5F';
  const c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
  const g = c.getContext('2d'), F = (w, px) => `${w} ${px}px "KIRA UI", system-ui, sans-serif`, M = 72, W = CARD_W - M * 2;
  g.fillStyle = '#FFFDF8'; g.fillRect(0, 0, CARD_W, CARD_H);
  g.fillStyle = accent; g.fillRect(0, 0, CARD_W, 18);
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i).filter((m) => !m.pending);
  const pick = ph.find((m) => m.highlight) || ph[0];
  let y = 96;
  g.fillStyle = accent; g.font = F(700, 30); g.fillText(`${L('วันที่', 'DAY')} ${i + 1} · ${fmtDay(d.date)}`.toUpperCase(), M, y);
  g.fillStyle = '#1F2A3A'; g.font = F(700, 60);
  for (const ln of wrapLines(g, T(d.title), W, 2)) { y += 74; g.fillText(ln, M, y); }
  y += 36;
  const photo = pick && (await loadImg(`/media/${encodeURIComponent(pick.id)}`));
  const art = dayArt(t, i) && (await loadImg(dayArt(t, i)));
  const boxH = 600;
  g.save(); g.beginPath(); g.roundRect ? g.roundRect(M, y, W, boxH, 36) : g.rect(M, y, W, boxH); g.clip();
  if (photo) { const s = Math.max(W / photo.width, boxH / photo.height), w = photo.width * s, h = photo.height * s; g.drawImage(photo, M + (W - w) / 2, y + (boxH - h) / 2, w, h); }
  else { g.fillStyle = css.getPropertyValue('--panel').trim() || '#F7F2EA'; g.fillRect(M, y, W, boxH); if (art) g.drawImage(art, M + (W - 440) / 2, y + 80, 440, 440); }
  g.restore();
  if (photo && art) { g.save(); g.beginPath(); g.arc(M + W - 90, y + boxH - 90, 76, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); g.clip(); g.drawImage(art, M + W - 160, y + boxH - 160, 140, 140); g.restore(); }
  y += boxH + 64;
  const sum = es.find((e) => e.kind === 'sum' && e.text), fav = es.find((e) => e.kind === 'fav' && e.text);
  const quote = es.filter((e) => e.kind === 'quote').sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))[0];
  g.fillStyle = '#1F2A3A'; g.font = F(500, 38);
  const lead = sum ? sum.text : fav ? `${L('ของโปรดวันนี้', 'Favourite today')}: ${fav.text}` : '';
  for (const ln of wrapLines(g, lead, W, quote ? 3 : 6)) { g.fillText(ln, M, y); y += 54; }
  if (quote) {
    y += lead ? 24 : 0;
    g.fillStyle = accent; g.font = F(600, 40);
    const ql = wrapLines(g, `“${quote.text}”`, W - 40, 3);
    g.fillRect(M, y - 38, 8, ql.length * 56 + 44);
    g.fillStyle = '#1F2A3A'; for (const ln of ql) { g.fillText(ln, M + 32, y); y += 56; }
    g.fillStyle = '#666D79'; g.font = F(500, 30); g.fillText(`— ${kidName(quote.child)}`, M + 32, y); y += 40;
  }
  g.fillStyle = '#666D79'; g.font = F(600, 28);
  g.fillText(`${appName()} · ${T(t.title).split(' · ')[0]}`, M, CARD_H - 56);
  return new Promise((ok) => c.toBlob(ok, 'image/png'));
}
// the lost-child card: 1080×1920 (a phone's lock screen; the top is left calm for the clock). English first (staff anywhere read it),
// the local language where the book's timezone has one (Hong Kong / Macau: Traditional Chinese), Thai for the child
const LOST_LOCAL = [[/Hong_Kong|Macau/, { head: '我走失了', call: '請致電我的父母', stay: '我們住在', sos: '緊急求助' }]];
async function drawLostCard(t, kid, photoUrl, tels) {
  await (document.fonts ? document.fonts.ready : Promise.resolve());
  const W0 = 1080, H0 = 1920, th = t.theme || {}, accent = th.accent || '#1F3A5F', ink = th.ink || '#1F2A3A', muted = th.muted || '#666D79';   // the book's light colours, also in dark mode
  const c = document.createElement('canvas'); c.width = W0; c.height = H0;
  const g = c.getContext('2d'), F = (w, px) => `${w} ${px}px "KIRA UI", system-ui, "PingFang HK", "Noto Sans CJK TC", sans-serif`, M = 80, W = W0 - M * 2;
  const rr = (x, y, w, h, r) => { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); };
  const center = (txt, y) => { g.fillText(txt, (W0 - g.measureText(txt).width) / 2, y); };
  const loc = (LOST_LOCAL.find(([re]) => re.test(t.timezone || '')) || [])[1];
  const d = t.days[todayIdx(t)], stay = (d.plan || {}).stay, sos = ((t.info || {}).emergency || []).find((e) => e.main);
  const ch = children().find((x) => x.slug === kid) || { name_en: kid, name_th: '' };
  const ageRaw = (((th.children || []).find((x) => x.slug === kid) || {}).age);
  const ageS = String(ageRaw == null ? '' : typeof ageRaw === 'object' ? ageRaw.en || ageRaw.th || '' : ageRaw).trim(), age = /^\d+$/.test(ageS) ? `${ageS} years old` : ageS;
  const nums = (tels || []).map((x) => String(x || '').trim()).filter(Boolean).slice(0, 2);
  g.fillStyle = '#FFFDF8'; g.fillRect(0, 0, W0, H0);
  g.fillStyle = th.calm || th.panel || '#EEF3EF'; g.fillRect(0, 0, W0, 340);   // calm area under the lock-screen clock
  // bottom up: the footer, the emergency bar, tonight's address, the call box — the photo takes what is left
  g.fillStyle = muted; g.font = F(600, 30);
  center(`${new Date(d.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · ${appName()}`, H0 - 44);
  let bottom = H0 - 96;
  if (sos) {
    const sh = 100; bottom -= sh;
    g.fillStyle = '#B42318'; rr(M, bottom, W, sh, 50); g.fill();
    g.fillStyle = '#fff'; g.font = F(800, 52); center(`Emergency${loc ? ' · ' + loc.sos : ''}  ${String(sos.tel).split('·')[0].trim()}`, bottom + 68);
    bottom -= 44;
  }
  if (stay) {
    g.font = F(800, 46); const nl = wrapLines(g, stay.name, W, 2);
    g.font = F(500, 34); const al = wrapLines(g, stay.addr || '', W, 3);
    let y = bottom - (al.length * 44 + nl.length * 56 + 52) + 34;
    bottom = y - 34 - 40;
    g.fillStyle = muted; g.font = F(700, 34); center(`We are staying at${loc ? ' · ' + loc.stay : ''}`, y);
    y += 56; g.fillStyle = ink; g.font = F(800, 46); for (const ln of nl) { center(ln, y); y += 56; }
    g.fillStyle = '#3A4350'; g.font = F(500, 34); for (const ln of al) { center(ln, y - 8); y += 44; }
  }
  const callH = 110 + Math.max(1, nums.length) * 88, cy = bottom - callH;
  g.fillStyle = accent; rr(M, cy, W, callH, 32); g.fill();
  g.fillStyle = '#fff'; g.font = F(700, 42); center(`Please call my parents${loc ? ' · ' + loc.call : ''}`, cy + 62);
  let yy = cy + 72;
  if (nums.length) { g.font = F(800, 72); nums.forEach((n) => { yy += 88; center(`📞 ${n}`, yy); }); }
  else { yy += 80; g.font = F(600, 44); center('(ใส่เบอร์ในหน้า SOS ก่อน)', yy); }
  // the top: who this is
  let y = 440;
  g.fillStyle = '#B42318'; g.font = F(800, 92); center(`I'M LOST${loc ? ' · ' + loc.head : ''}`, y);
  y += 66; g.fillStyle = '#B42318'; g.font = F(700, 50); center('หนูพลัดหลงกับพ่อแม่', y);
  const nameY = cy - 50 - (age ? 52 : 0);
  g.fillStyle = ink; g.font = F(800, 78); center(`${String(ch.name_en || '').toUpperCase()}${ch.name_th ? '  ' + ch.name_th : ''}`, nameY);
  if (age) { g.fillStyle = muted; g.font = F(600, 40); center(age, nameY + 52); }
  const top = y + 36, bh = Math.max(240, Math.min(600, nameY - 90 - top)), bw = Math.min(560, Math.round(bh * 0.88)), bx = (W0 - bw) / 2;
  const img = (photoUrl && (await loadImg(photoUrl))) || (await loadImg(kidArt(kid, true, t)));
  g.save(); rr(bx, top, bw, bh, 40); g.clip();
  g.fillStyle = th.panel || '#F7F2EA'; g.fillRect(bx, top, bw, bh);
  if (img) { const sc = photoUrl ? Math.max(bw / img.width, bh / img.height) : Math.min(bw / img.width, bh / img.height) * 0.92, w = img.width * sc, h = img.height * sc; g.drawImage(img, bx + (bw - w) / 2, top + (bh - h) / 2, w, h); }
  g.restore();
  g.strokeStyle = accent; g.lineWidth = 8; rr(bx, top, bw, bh, 40); g.stroke();
  return new Promise((ok) => c.toBlob(ok, 'image/png'));
}
let lastCard = null;   // the last day card drawn (kept for the tests)
let storyCtl = null;   // AbortController while a story (or a guide answer) streams
let askAns = null;     // the last guide answer on the Today page {t, q, text} — kept across re-renders, never stored

/* ---------- lightbox ---------- */
let lbState = null;
function openLb(tid, id) {
  const r = route(), t = trip(tid);
  const inDay = r.parts[2] === 'log' ? +r.parts[3] : null;
  const list = (inDay === null ? mediaOf(tid).filter((m) => document.querySelector(`[data-a="lb"][data-v="${CSS.escape(m.id)}"]`)) : mediaOf(tid, inDay));
  lbState = { t, list, i: Math.max(0, list.findIndex((m) => m.id === id)) };
  drawLb();
}
function drawLb() {
  const lb = $('#lb'); if (!lbState) { lb.hidden = true; lb.innerHTML = ''; return; }
  const s0 = lbState, { list, i } = lbState, m = list[i]; if (!m) { lbState = null; return drawLb(); }
  const ed = isEditor();
  lb.innerHTML = `<div class="bar"><button data-lb="close" aria-label="${L('ปิด', 'Close')}">✕</button><span class="grow">${i + 1} / ${list.length}</span>
${ed ? `<button data-lb="star" aria-pressed="${!!m.highlight}">${m.highlight ? '⭐' : '☆'} ${L('ชอบ', 'Fave')}</button><button data-lb="del">${L('ลบ', 'Delete')}</button>` : ''}</div>
<div class="stage"><img src="${esc(imgF(m))}" alt="${esc(m.caption)}">${list.length > 1 ? `<button class="nav prev" data-lb="prev" aria-label="prev">‹</button><button class="nav next" data-lb="next" aria-label="next">›</button>` : ''}</div>
<div class="capbox">${ed ? `<span class="emowrap"><input id="lbcap" value="${esc(m.caption || '')}" placeholder="${L('คำอธิบายรูป', 'Caption')}" maxlength="500">${emoBtn('lbcap')}</span>` : m.caption ? `<p>${emoIn(esc(m.caption))}</p>` : ''}
${ed ? `<div class="tagrow"><input id="lbtags" value="${esc(tagsOf(m).join(', '))}" placeholder="${L('แท็ก คั่นด้วยจุลภาค เช่น food, kids', 'Tags, comma-separated, e.g. food, kids')}" maxlength="200"><input id="lbplace" value="${esc(m.place || '')}" placeholder="${L('ที่ไหน (จุดแวะ)', 'Where (the stop)')}" maxlength="120"></div>` : ''}
${ed && s0.t && s0.t.kind === 'snap' && s0.t.days.length > 1 ? `<label class="lbday">${L('วันของรูปนี้', 'This photo’s day')}<select id="lbday">${s0.t.days.map((d, k) => `<option value="${k}"${k === m.day ? ' selected' : ''}>${esc(L(`วันที่ ${k + 1}`, `Day ${k + 1}`))} · ${esc(fmtDay(d.date))}</option>`).join('')}</select></label>` : ''}
${tagsOf(m).length || m.place ? `<div class="tags">${m.place ? `<span class="tagc">📍 ${esc(m.place)}</span>` : ''}${tagsOf(m).map((k) => `<span class="tagc">${tagHtml(k)}</span>`).join('')}</div>` : ''}${lbComments(m)}</div>`;
  lb.hidden = false;
}
/* Lines under a photo (server: comments, migration 0038): everyone who may see the book reads them and writes one — the name is the
   one the hearts use (ls heartfrom, else the sign-in name); a parent removes any line, a sender their own (two taps). */
const commentsOf = (mid) => (S.comments || []).filter((c) => c.media === mid).sort((a, b) => (a.at || 0) - (b.at || 0));
function lbComments(m) {
  if (isVideo(m) || isAudio(m) || m.local) return '';
  const cs = commentsOf(m.id), ed = isEditor(), from = ls('heartfrom') || ls('name') || '';
  return `<div class="lbcom"><b class="lbch"><img src="/art/hub/comment.webp" alt="">${cs.length ? L(`ข้อความถึงรูปนี้ · ${cs.length}`, `Notes on this photo · ${cs.length}`) : L('เขียนถึงรูปนี้', 'Write about this photo')}</b>
${cs.length ? `<ul>${cs.map((c) => `<li><span><b>${esc(c.from)}</b> ${emoIn(esc(c.text))}</span>${ed || c.mine ? `<button class="mini" data-lb="uncomment" data-v="${esc(c.id)}" aria-label="${L('ลบข้อความ', 'Remove the note')}">✕</button>` : ''}</li>`).join('')}</ul>` : ''}
<div class="lbcin">${from ? '' : `<input id="lbfrom" maxlength="24" placeholder="${L('ชื่อผู้เขียน เช่น ยาย', 'Your name, e.g. Grandma')}">`}<input id="lbcomm" maxlength="200" enterkeyhint="send" placeholder="${L('เขียนสั้นๆ ถึงรูปนี้', 'A short note about this photo')}"><button class="btn small" data-lb="comment">${L('ส่ง', 'Send')}</button></div></div>`;
}
function lbAct(k, btn) {
  const s = lbState; if (!s) return;
  const m = s.list[s.i];
  if (k === 'comment') {
    const inp = $('#lbcomm'), fromIn = $('#lbfrom'), text = (inp && inp.value || '').trim();
    const from = ((fromIn && fromIn.value) || ls('heartfrom') || ls('name') || '').trim();
    if (!text) return;
    if (!from) { if (fromIn) fromIn.focus(); toast(L('ใส่ชื่อผู้เขียนก่อน', 'Type your name first')); return; }
    if (fromIn) ls('heartfrom', from);
    const id = uid('cm').replace(/[^A-Za-z0-9_-]/g, '');
    enqueue({ method: 'PUT', url: '/api/b/comments/' + id, body: { media: m.id, from, text }, local: { coll: 'comments', id, row: { media: m.id, trip: m.trip, from, text, at: Date.now(), mine: true } } });
    drawLb(); return;
  }
  if (k === 'uncomment') {
    if (!armed(btn)) return;
    enqueue({ method: 'DELETE', url: '/api/b/comments/' + encodeURIComponent(btn.dataset.v), local: { coll: 'comments', id: btn.dataset.v, del: true } });
    drawLb(); return;
  }
  if (k === 'close') { lbState = null; drawLb(); render(); return; }
  if (k === 'prev' || k === 'next') { s.i = (s.i + (k === 'next' ? 1 : -1) + s.list.length) % s.list.length; drawLb(); return; }
  if (k === 'star') { m.highlight = !m.highlight; enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { highlight: m.highlight }, local: { coll: 'media', id: m.id, row: { highlight: m.highlight } } }); drawLb(); return; }
  if (k === 'del') {
    if (!armed(btn)) return;
    enqueue({ method: 'DELETE', url: '/api/b/media/' + encodeURIComponent(m.id), local: { coll: 'media', id: m.id, del: true } });
    s.list.splice(s.i, 1); if (s.i >= s.list.length) s.i = s.list.length - 1; if (!s.list.length) lbState = null; drawLb();
  }
}
function saveCaption(inp) {
  const m = lbState && lbState.list[lbState.i]; if (!m || m.caption === inp.value) return;
  m.caption = inp.value;
  enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { caption: inp.value, ...(m.v ? { base: m.v } : {}) }, local: { coll: 'media', id: m.id, row: { caption: inp.value } } });
}
// the lightbox's tags ("food, kids" → ['food','kids'], at most 10) and place: saved like a caption when the box is left
function saveTags(inp) {
  const m = lbState && lbState.list[lbState.i]; if (!m) return;
  const body = inp.id === 'lbplace' ? { place: inp.value.trim().slice(0, 120) } : { tags: [...new Set(inp.value.split(/[,，]/).map((x) => x.trim().toLowerCase().slice(0, 24)).filter(Boolean))].slice(0, 10) };
  if (JSON.stringify(body[inp.id === 'lbplace' ? 'place' : 'tags']) === JSON.stringify(inp.id === 'lbplace' ? m.place || '' : tagsOf(m))) return;
  Object.assign(m, body);
  enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body, local: { coll: 'media', id: m.id, row: body } });
}

/* ---------- sheet ---------- */
function openSheet(html) { $('#scrim').hidden = false; const s = $('#sheet'); s.innerHTML = html; s.hidden = false; const f = s.querySelector('input'); if (f) f.focus(); }
function closeSheet() { $('#scrim').hidden = true; $('#sheet').hidden = true; $('#sheet').innerHTML = ''; }
const sheetOpen = () => !$('#sheet').hidden || !$('#lb').hidden;
function bookSlug(base) {
  let b = String(base || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
  if (b.length < 3) { const d = new Date(); b = `book-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`; }
  const taken = (x) => (S.trips || []).some((t) => t.slug === x || t.id === x);
  let out = b, n = 2; while (taken(out)) out = `${b}-${n++}`;
  return out;
}
function newTripSheet() {
  // in the app's card look (owner, Nov 2026): the name, the days, then the rarely used settings folded away — nothing must be typed
  // but the days, and those are one tap on how long
  return `<form id="ntf" class="ntsheet"><h3 class="ntt">${L('เล่มใหม่', 'New book')}</h3>
${S.features && S.features.story ? `<a class="ntplan pz" style="--g1:${PG.purple}" href="#/planner" data-a="closesheet"><span class="pcpic">${hubIc('plan')}</span><span><b>${L('ยังไม่รู้จะไปไหนหรือวันไหน?', 'Not sure where or when yet?')}</b><small>${L('วางแผนกับผู้ช่วย ตอบไม่กี่ข้อ ได้เส้นทางทั้งทริป', 'Plan with the helper — a few answers, a whole route')}</small></span><i aria-hidden="true">›</i></a>` : ''}
${pcard('pencil', PG.gold, L('ชื่อทริป', 'Trip name'), `<div class="pform"><input name="title" class="field" maxlength="80" aria-label="${L('ชื่อทริป', 'Trip name')}" placeholder="${L('เช่น เชียงใหม่หน้าหนาว', 'e.g. Chiang Mai in winter')}">
<p class="label">${L('ไม่ใส่ก็ได้ แอปตั้งให้จากเดือนที่ไป', 'Optional — the app names it from the month')}</p></div>`)}
${pcard('today', PG.teal, L('ไปวันไหน', 'When'), `<div class="pform"><div class="plchips ntlens" role="group" aria-label="${L('กี่วัน', 'How many days')}">${[2, 3, 4, 5, 7, 10].map((n) => `<button type="button" class="plchip" data-a="ntlen" data-v="${n}">${n} ${L('วัน', 'days')}</button>`).join('')}</div>
<div class="pform2"><label class="vgl">${L('วันแรก', 'From')}<input name="from" type="date" class="field"></label><label class="vgl">${L('วันสุดท้าย', 'To')}<input name="to" type="date" class="field"></label></div>
<p class="label">${L('แตะจำนวนวันได้ ถ้ายังไม่ใส่วันแรกจะเริ่มวันนี้', 'Tap how long — with no first day it starts today')}</p></div>`)}
<details class="ntmore"><summary>${L('ตั้งค่าเพิ่มเติม (ไม่ต้องก็ได้)', 'More settings (optional)')}${ic('chev', 'chv')}</summary><div class="pform">
<label class="vgl">${L('ชื่อภาษาอังกฤษ', 'English name')}<input name="title_en" class="field" maxlength="80"></label>
<div class="pform2"><label class="vgl">${L('รหัสเล่มในลิงก์', 'Book id in the link')}<input name="slug" class="field" maxlength="40" placeholder="chiang-mai-2027"></label><label class="vgl">${L('สีปก', 'Colour')}<input name="accent" type="color" value="#1F3A5F" class="field ntcol"></label></div></div></details>
<div class="err" id="nterr"></div>
<div class="row end ntgo"><button type="button" class="btn ghost" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="createtrip">${L('สร้างเล่ม', 'Create')}</button></div></form>`;
}

/* ---------- the emoji library beside a text box (core.js EMOJI_LIB / emoBtn) ----------
   The grid floats on <body>, so a render underneath never takes it away; the box keeps the focus the whole time (pointerdown
   is held back on the button and the grid), so a box that saves when left (note, favourite, caption) saves the emoji too. */
const emoClose = () => { const p = $('#emopop'); if (p) p.remove(); };
Object.assign(A, {
  emopick(b) {
    const was = $('#emopop'); emoClose(); if (was && was.dataset.for === b.dataset.for) return;   // a second tap closes it
    const f = document.getElementById(b.dataset.for);
    if (f && document.activeElement !== f) { f.focus(); const n = f.value.length; f.setSelectionRange(n, n); }   // not typing in it: the emoji goes at the end
    const p = document.createElement('div'); p.id = 'emopop'; p.className = 'emopop'; p.dataset.for = b.dataset.for;
    p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', L('อีโมจิของเรา', 'Our emoji'));
    const rows = emoRows();
    p.innerHTML = rows.map((e) => `<button type="button" data-a="emoput" data-v="${esc(e.ch)}" title="${esc(L(e.th || e.en, e.en || e.th))}" aria-label="${esc(L(e.th || e.en, e.en || e.th))}">${emo(e.ch)}</button>`).join('')
      + (isEditor() ? `<a class="emoman" href="#/emoji" title="${L('จัดการอีโมจิ', 'Manage emoji')}" aria-label="${L('จัดการอีโมจิ', 'Manage emoji')}">⚙️</a>` : '')
      + (rows.length ? '' : `<p class="emonone">${L('ยังไม่มีอีโมจิ', 'No emoji yet')}</p>`);
    document.body.appendChild(p);
    const r = b.getBoundingClientRect(), w = Math.min(320, innerWidth - 16);
    p.style.width = w + 'px'; const h = p.offsetHeight;
    p.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.right - w)) + 'px';
    p.style.top = (r.bottom + h + 8 < innerHeight || r.top < h + 8 ? r.bottom + 6 : r.top - h - 6) + 'px';   // below the button, or above it near the foot of the screen
  },
  // the library page (#/emoji): add one (a picture + the emoji it stands for + a name), delete one, bring back the original set
  async emoadd() {
    const f = emoForm; f.err = '';
    const ch = f.ch.replace(/\s+/g, '');
    if (!f.file) f.err = L('เลือกรูปก่อน', 'Pick a picture first');
    else if (!ch) f.err = L('ใส่อีโมจิที่จะให้รูปนี้แทน เช่น 🦘', 'Type the emoji it stands for, e.g. 🦘');
    else if (!f.th.trim() && !f.en.trim()) f.err = L('ตั้งชื่อให้อีโมจิ', 'Give it a name');
    else if (emoOf(ch)) f.err = L('อีโมจินี้มีรูปอยู่แล้ว ลบตัวเดิมก่อนถ้าจะเปลี่ยน', 'That emoji already has a picture — delete it first to change it');
    if (f.err) { render(); return; }
    if (!navigator.onLine) { f.err = L('ต้องต่อเน็ตก่อน', 'You need to be online'); render(); return; }
    f.busy = true; render();
    const id = 'my-' + uid('e').replace(/[^a-z0-9]/gi, '').toLowerCase().slice(-12);
    try {
      const qs = new URLSearchParams({ ch, th: f.th.trim(), en: f.en.trim() });
      await api('PUT', `/api/b/emoji/${id}?${qs}`, undefined, f.file);
      if (f.url) URL.revokeObjectURL(f.url);
      emoForm = { ch: '', th: '', en: '', file: null, url: null, err: '', busy: false };
      toast(L('เพิ่มอีโมจิแล้ว', 'Emoji added')); await load(); render();
    } catch (e) {
      f.busy = false;
      f.err = { 409: L('อีโมจินี้มีรูปอยู่แล้ว หรือคลังเต็มแล้ว', 'That emoji already has a picture, or the library is full'), 400: L('อ่านรูปหรืออีโมจิไม่ได้ ลองใหม่', 'Could not read the picture or the emoji — try again'), 413: L('รูปใหญ่เกินไป', 'The picture is too big') }[e.code] || L('เพิ่มไม่สำเร็จ ลองใหม่', 'Could not add it — try again');
      render();
    }
  },
  async emodel(b) {
    if (!armed(b)) return;
    try { await api('DELETE', '/api/b/emoji/' + encodeURIComponent(b.dataset.v)); toast(L('ลบแล้ว', 'Deleted')); await load(); render(); }
    catch (_) { toast(L('ลบไม่สำเร็จ ต้องต่อเน็ตก่อน', 'Could not delete — you need to be online')); }
  },
  async emodefaults() {
    try { const r = await api('POST', '/api/b/emoji/defaults', {}); toast(r.added ? L(`เอากลับมา ${r.added} ตัว`, `${r.added} brought back`) : L('ชุดเดิมอยู่ครบแล้ว', 'The original set is all there')); await load(); render(); }
    catch (_) { toast(L('ทำไม่สำเร็จ ต้องต่อเน็ตก่อน', 'Did not work — you need to be online')); }
  },
  emoput(b) {
    const f = document.getElementById($('#emopop').dataset.for); emoClose(); if (!f) return;
    const ch = b.dataset.v, a = f.selectionStart ?? f.value.length, z = f.selectionEnd ?? a, max = +f.getAttribute('maxlength') || Infinity;
    if (f.value.length - (z - a) + ch.length > max) { toast(L('ข้อความยาวเต็มแล้ว', 'The box is full')); return; }
    f.value = f.value.slice(0, a) + ch + f.value.slice(z); f.focus(); f.setSelectionRange(a + ch.length, a + ch.length);
    f.dispatchEvent(new Event('input', { bubbles: true }));   // drafts and live previews follow, as if typed
  },
});
document.addEventListener('pointerdown', (e) => { if (e.target.closest('.emobtn, #emopop')) e.preventDefault(); else emoClose(); });
document.addEventListener('mousedown', (e) => { if (e.target.closest('.emobtn, #emopop')) e.preventDefault(); });
window.addEventListener('hashchange', emoClose);

/* ---------- events ---------- */
document.addEventListener('click', (e) => {
  const lb = e.target.closest('[data-lb]'); if (lb) { lbAct(lb.dataset.lb, lb); return; }
  if (e.target.closest('.sres a')) rememberQ();   // a search that found what was needed comes back as a chip next time
  const b = e.target.closest('[data-a]');
  if (b && A[b.dataset.a]) { if (b.tagName === 'A' || b.type === 'submit') e.preventDefault(); A[b.dataset.a](b, e); return; }
  const tl = e.target.closest('.tl.plan > li'); if (tl && !e.target.closest('a')) { tlToggle(tl); return; }   // a long timeline row shows two lines (Today: its first clause); a tap shows it all
  if (e.target.id === 'scrim') closeSheet();
});
document.addEventListener('input', (e) => { const el = e.target; if (el.id === 'erasetxt') { eraseTyped = el.value; const bt = document.querySelector('[data-a="erase"]'); if (bt) bt.disabled = el.value.trim() !== appName(); } if (el.dataset && el.dataset.emf) emoForm[el.dataset.emf] = el.value; if (el.dataset && el.dataset.fx) { const fx = ls('fx') || {}, v = parseFloat(String(el.value).replace(',', '.')); if (v > 0 && v < 100000) fx[el.dataset.fx] = v; else delete fx[el.dataset.fx]; ls('fx', fx); const t = trip(route().parts[1]), r = $('#fxres'); if (t && r) r.innerHTML = fxResult(t); document.querySelectorAll('.fxa').forEach((x) => { const rows = spendOf(t.id).filter((s2) => s2.cur === x.dataset.fxc); x.textContent = thbLine(rows); }); } if (el.dataset && el.dataset.lc) { const v = ls('lostTel') || ['', '']; v[+el.dataset.lc] = el.value.slice(0, 40); ls('lostTel', v); } if (el.dataset && el.dataset.draft) drafts[el.dataset.draft] = el.value; if (el.dataset && el.dataset.fam && fam) { const [i, f] = el.dataset.fam.split(':'), k = fam.kids[+i]; if (k) { k[f] = el.value; const tag = el.closest('.famkid') && el.closest('.famkid').querySelector('.famtag b'); if (tag && (f === 'name_th' || f === 'name_en')) tag.textContent = L(k.name_th || k.name_en, k.name_en || k.name_th) || L('ลูกคนใหม่', 'New child'); } } if (el.dataset && el.dataset.famp && fam) { const [o, l] = el.dataset.famp.split(':'); fam[o][l] = el.value; const pv = $('.fampreview'), b = famBuilt(); if (pv) { pv.querySelector('b').textContent = L(fam.app.th, fam.app.en) || L(b.app.th, b.app.en); pv.querySelector('small').textContent = L(fam.kicker.th, fam.kicker.en) || L(b.kicker.th, b.kicker.en); } } if (el.id === 'eatq') { eatQ = el.value.trim(); eatFilter(); } if (el.id === 'findq') { findQ = el.value; const r = $('#findres'); if (r) r.innerHTML = findResults(); } if (el.id === 'bookq') { bookQ = el.value; const r = $('#bookres'), t = trip(route().parts[1]); if (r && t) r.innerHTML = bookResults(t); } });
document.addEventListener('focusout', (e) => { const el = e.target; if (el.dataset && el.dataset.aBlur) saveBlur(el); if (el.id === 'lbcap') saveCaption(el); if (el.id === 'lbtags' || el.id === 'lbplace') saveTags(el); });
document.addEventListener('focusout', (e) => {   // a voice memo's caption ("who said what") saves when the box is left, like a photo caption
  const el = e.target; if (!el.classList || !el.classList.contains('clipcap')) return;
  const id = el.dataset.v, m = S && S.media.find((x) => x.id === id), cap = el.value.trim();
  if (m && (m.caption || '') !== cap) enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(id), body: { caption: cap, ...(m.v ? { base: m.v } : {}) }, local: { coll: 'media', id, row: { caption: cap } } });
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'lbday' && lbState) {   // a book from photos: this photo belongs to another day (the queue carries it; the viewer moves on)
    const m = lbState.list[lbState.i], day = +e.target.value; if (!m || m.day === day) return;
    enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { day }, local: { coll: 'media', id: m.id, row: { day } } });
    toast(L(`ย้ายไปวันที่ ${day + 1} แล้ว`, `Moved to day ${day + 1}`)); return;
  }
  if (e.target.dataset && e.target.dataset.ck) { const m = ls('ck') || {}; if (e.target.checked) m[e.target.dataset.ck] = 1; else delete m[e.target.dataset.ck]; ls('ck', m);
    const bag = e.target.closest('details.bag');   // today's bag counts in place, and folds itself a moment after the last thing is in
    if (bag) { const n = bag.querySelectorAll('input[data-ck]').length, left = () => bag.querySelectorAll('input[data-ck]:not(:checked)').length, lb = bag.querySelector('.bagn');
      if (lb) lb.textContent = bagLabel(n - left(), n);
      if (!left()) setTimeout(() => { if (bag.isConnected && !left()) bag.open = false; }, 700); }
    return; }
  if (e.target.dataset && e.target.dataset.fx) { safeRender(); return; }   // leaving a rate field: redraw (the field has lost focus)
  if (e.target.id === 'emfile') {   // the picture for a new emoji: a preview in place, the file kept until "add"
    const file = e.target.files && e.target.files[0]; if (!file) return;
    if (emoForm.url) URL.revokeObjectURL(emoForm.url);
    emoForm.file = file; emoForm.url = URL.createObjectURL(file); emoForm.err = ''; render(); return;
  }
  if (e.target.id === 'lcfile') { const f = e.target.files && e.target.files[0]; if (f) { if (lostPhoto) URL.revokeObjectURL(lostPhoto); lostPhoto = URL.createObjectURL(f); render(); } return; }   // this morning's photo: in memory only
  if (e.target.id === 'impfile') { imp.file = (e.target.files || [])[0] || null; const sl = $('#impslug'); if (imp.file && sl && !sl.value) { sl.value = imp.file.name.replace(/\.pdf$/i, '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40); } return; }
  if (e.target.id === 'impslug') { imp.slug = e.target.value; return; }
  if (e.target.id === 'plask') { pln.ask = e.target.value; return; }
  if (e.target.dataset && e.target.dataset.pl && pln.a) { const k = e.target.dataset.pl; pln.a[k] = e.target.value; if (k === 'from' && pln.a.from && pln.a.len) { pln.a.to = plAdd(pln.a.from, pln.a.len - 1); pln.a.len = 0; } planKeepA(); if (k === 'from') safeRender(); if (k === 'to') planSpan(); return; }
  if (e.target.dataset && e.target.dataset.pr && pln.route) { const [i, f] = e.target.dataset.pr.split('.'), d = pln.route.days[+i]; if (d) { d[f] = { ...(d[f] || {}), [lang]: e.target.value.slice(0, 120) }; planKeep(); } return; }
  if (e.target.id === 'plask') { pln.ask = e.target.value; return; }
  if (e.target.dataset && e.target.dataset.famavatar !== undefined && fam) {   // a photo of the child → the AI draws their character, used at once
    const f = (e.target.files || [])[0], i = +e.target.dataset.famavatar, k = fam.kids[i]; if (!f || !k) return;
    fam.busyKid = i; fam.err = ''; render();
    api('POST', `/api/b/family/avatar/${encodeURIComponent(k.slug)}`, undefined, new Blob([f], { type: f.type || 'image/jpeg' })).then(async (r) => {
      k.avatar = r.avatar; if (Array.isArray(r.avatars)) k.avatars = r.avatars; if (fam.quota && fam.quota.left) fam.quota.left[k.slug] = r.left;
      await load(); toast(L('ได้ตัวละครใหม่แล้ว ✨', 'A new character ✨'));
    }, (err) => { fam.err = { 429: L('ใช้ครบโควตาของปีนี้แล้ว', 'All tries for this year are used'), 501: L('การวาดตัวละครยังไม่เปิดในบัญชีนี้', 'Drawing characters is not switched on for this account'), 400: L('อ่านรูปไม่ได้ ลองรูปอื่น', 'Could not read the photo — try another'), 409: L('กำลังวาดตัวอื่นอยู่ รอสักครู่', 'Another drawing is in progress — wait a moment'), 502: L('วาดไม่สำเร็จ ไม่เสียโควตา ลองรูปอื่นได้', 'The AI could not draw it — no try used; try another photo') }[err.code] || L('ครั้งนี้ไม่สำเร็จ ลองใหม่', 'That did not work — try again'); })
      .finally(() => { fam.busyKid = null; render(); });
    return;
  }
  if (e.target.id === 'vpick') { const el = e.target, f = (el.files || [])[0]; if (f) addVideo(trip(el.dataset.t), +el.dataset.d, f).then(() => safeRender()); el.value = ''; }
  if (e.target.id === 'fpick') { const el = e.target; addPhotos(trip(el.dataset.t), +el.dataset.d, el.files, el.dataset.place ? { place: el.dataset.place, key: el.dataset.key, kind: el.dataset.kind } : null); el.value = ''; el.dataset.place = ''; }   // the place is spent: the next pick starts plain
  if (e.target.id === 'spendplace') { const n = $('#spendnote'); if (n) { if (e.target.value) { n.value = e.target.value; drafts[n.dataset.draft] = n.value; $('#spendamt').focus(); } else n.focus(); } }   // a picked place becomes the note; "other" → type it
});
function tlToggle(li) { const o = li.classList.toggle('open'), d = li.querySelector(':scope > [aria-expanded]'); if (d) d.setAttribute('aria-expanded', String(o)); }
document.addEventListener('cancel', (e) => { if (e.target && e.target.id === 'fpick') e.target.dataset.place = ''; }, true);   // the gallery closed without a photo: forget the chip's place
window.addEventListener('beforeprint', () => { $$('details.ifold:not([open]), details.dfold:not([open])').forEach((d) => { d.open = true; d.dataset.printOpened = '1'; }); });   // a printed pocket guide shows every detail
window.addEventListener('afterprint', () => { $$('details.ifold[data-print-opened], details.dfold[data-print-opened]').forEach((d) => { d.open = false; delete d.dataset.printOpened; }); });
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.tl.plan > li > [role="button"]')) { e.preventDefault(); tlToggle(e.target.parentElement); return; }
  if (lbState) { if (e.key === 'Enter' && e.target && e.target.id === 'lbcomm') { e.preventDefault(); lbAct('comment'); return; }
    if (/^(INPUT|TEXTAREA)$/.test((e.target && e.target.tagName) || '')) return;   // arrows inside the caption box move the cursor, not the photo
    if (e.key === 'Escape') lbAct('close'); if (e.key === 'ArrowRight') lbAct('next'); if (e.key === 'ArrowLeft') lbAct('prev'); return; }
  if (e.key === 'Escape') closeSheet();
  if (e.key === 'Enter' && e.target.id === 'askq') { e.preventDefault(); const b = $('#askgo'); if (b && !b.disabled) A.ask(b); }   // Enter = ask the guide
  if (e.key === 'Enter' && e.target.id === 'bookq') { e.preventDefault(); const a = $('.sres a'); if (a) a.click(); }   // Enter = open the best hit
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && $('.ppbook') && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '') && !$('#sheet.open')) ppTurn(e.key === 'ArrowRight' ? 'next' : 'prev');   // the passport: arrow keys turn the page
});
// the passport book turns a page with a swipe — never from a sticker, the map, a box or the page tabs (they scroll or drag on their own)
function ppTurn(dir) { const b = $(`.ppturn [data-dir="${dir}"]`); if (b) b.click(); }
let ppx = null;
document.addEventListener('touchstart', (e) => { ppx = e.touches.length === 1 && e.target.closest && e.target.closest('.ppbody') && !e.target.closest('.stkboard, .stktray, svg, input, textarea, .pptabs, .mapdays, .cstamps, .colsvg') ? [e.touches[0].clientX, e.touches[0].clientY] : null; }, { passive: true });
document.addEventListener('touchend', (e) => { if (!ppx) return; const dx = e.changedTouches[0].clientX - ppx[0], dy = e.changedTouches[0].clientY - ppx[1]; ppx = null; if (Math.abs(dx) > 70 && Math.abs(dx) > 2 * Math.abs(dy)) ppTurn(dx < 0 ? 'next' : 'prev'); });
let sx = null;
document.addEventListener('touchstart', (e) => { if (lbState && e.target.closest('.stage')) sx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => { if (sx === null || !lbState) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) lbAct(dx < 0 ? 'next' : 'prev'); });
// the pad signs in by itself at the last digit: when the code has reached a length a code can have and no longer one exists
// (the lengths come from /api/brand, never a digit); a code of unknown length (an old group PIN) keeps the button
let pinTry = false;
function pinAuto() {
  const f = $('#lcode'), p = BRAND && BRAND.pin; if (!f || !p || !Array.isArray(p.lens) || pinTry) return;
  const n = f.value.length;
  if (p.lens.includes(n) && !p.lens.some((l) => l > n) && !p.open) { pinTry = true; setTimeout(() => { pinTry = false; const form = $('#lf'); if (form && $('#lcode') && $('#lcode').value.length === n) form.requestSubmit(); }, 180); }   // a beat to see the last dot
}
document.addEventListener('input', (e) => { if (e.target && e.target.id === 'lcode') { $('#lerr').textContent = ''; pinAuto(); } });   // typed on a keyboard too
let loginBusy = false;
/* Passkeys (server/passkey.js): the phone's Face ID or fingerprint in place of the family code. The browser's own API, no library:
   the options come as JSON with base64url strings, the answer goes back the same way. */
const pkb64 = {
  dec: (s) => { const b = atob(String(s).replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((String(s).length + 3) % 4)); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; },
  enc: (buf) => { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
};
const pkOk = () => !!(window.PublicKeyCredential && navigator.credentials && navigator.credentials.get);
const pkJson = (c) => {
  const r = c.response, o = { id: c.id, rawId: pkb64.enc(c.rawId), type: c.type, clientExtensionResults: (c.getClientExtensionResults && c.getClientExtensionResults()) || {}, authenticatorAttachment: c.authenticatorAttachment || undefined, response: { clientDataJSON: pkb64.enc(r.clientDataJSON) } };
  if (r.attestationObject) { o.response.attestationObject = pkb64.enc(r.attestationObject); o.response.transports = r.getTransports ? r.getTransports() : []; }
  if (r.authenticatorData) { o.response.authenticatorData = pkb64.enc(r.authenticatorData); o.response.signature = pkb64.enc(r.signature); o.response.userHandle = r.userHandle ? pkb64.enc(r.userHandle) : undefined; }
  return o;
};
async function pkPost(url, body) { return fetch(url, { method: 'POST', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify(body || {}) }); }
Object.assign(A, {
  async pkadd(b) {
    if (!pkOk()) return;
    b.disabled = true;
    try {
      const or = await pkPost('/api/passkey/register/options'); if (!or.ok) throw new Error('options');
      const o = await or.json();
      const cred = await navigator.credentials.create({ publicKey: { ...o, challenge: pkb64.dec(o.challenge), user: { ...o.user, id: pkb64.dec(o.user.id) }, excludeCredentials: (o.excludeCredentials || []).map((x) => ({ ...x, id: pkb64.dec(x.id) })) } });
      const r = await pkPost('/api/passkey/register', { response: pkJson(cred) }); if (!r.ok) throw new Error('verify');
      toast(L('เพิ่มแล้ว ครั้งหน้าเข้าด้วยลายนิ้วมือหรือใบหน้าได้เลย', 'Added — next time sign in with your fingerprint or face'));
      DEV.at = 0; devLoad(true);
    } catch (e) {
      if (!(e && e.name === 'NotAllowedError')) toast(e && e.name === 'InvalidStateError' ? L('เครื่องนี้เพิ่มไว้แล้ว', 'This phone is already added') : L('เพิ่มไม่ได้ ลองใหม่อีกครั้ง', 'Could not add it, try again'));
    } finally { b.disabled = false; }
  },
  async pkdel(b) {
    if (!armed(b)) return;
    b.disabled = true;
    try { await api('DELETE', '/api/b/passkeys/' + encodeURIComponent(b.dataset.v)); DEV.keys = (DEV.keys || []).filter((k) => k.id !== b.dataset.v); } catch (_) { toast(L('ลบไม่ได้ ลองใหม่อีกครั้ง', 'Could not remove, try again')); }
    safeRender();
  },
  async pklogin(b) {
    if (loginBusy || !pkOk()) return;
    loginBusy = true; b.disabled = true; $('#lerr').textContent = '';
    try {
      const or = await pkPost('/api/passkey/login/options');
      if (!or.ok) throw new Error(or.status === 429 ? 'many' : 'none');
      const o = await or.json();
      const cred = await navigator.credentials.get({ publicKey: { ...o, challenge: pkb64.dec(o.challenge), allowCredentials: (o.allowCredentials || []).map((x) => ({ ...x, id: pkb64.dec(x.id) })) } });
      const name = ($('#lname') && $('#lname').value.trim()) || ls('name') || '';
      const r = await pkPost('/api/passkey/login', { response: pkJson(cred), name });
      if (!r.ok) throw new Error(r.status === 429 ? 'many' : 'verify');
      if (name) ls('name', name);
      try { await load(); render(); } finally { loginBusy = false; } flush(); return;
    } catch (e) {
      loginBusy = false; b.disabled = false;
      if (e && e.name === 'NotAllowedError') return;   // the person closed the phone's own prompt
      $('#lerr').textContent = e && e.message === 'many' ? L('ลองหลายครั้งเกินไป รอ 10 นาทีแล้วลองใหม่', 'Too many tries — wait 10 minutes') : L('เข้าด้วยลายนิ้วมือหรือใบหน้าไม่ได้ ใส่รหัสแทนได้', 'Could not sign in with the fingerprint or face — use the code instead');
    }
  },
});
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'ntf') { e.preventDefault(); A.createtrip(null, e); return; }
  if (e.target.id !== 'lf') return;
  e.preventDefault();
  if (loginBusy) return;   // the pad's auto-submit and a tap on the button can both fire: one sign-in at a time
  loginBusy = true;
  const name = $('#lname').value.trim(); ls('name', name);
  let r; try { r = await fetch('/api/login', { method: 'POST', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: $('#lcode').value, name }) }); }
  catch (_) { loginBusy = false; $('#lerr').textContent = L('ต่อเน็ตไม่ได้ ลองใหม่', 'No connection — try again'); return; }
  // signed in: stay busy until the shelf replaces the form, else the pad's own submit (180 ms after the last digit) sends a second login while the state loads
  if (r.ok) { try { await load(); render(); } finally { loginBusy = false; } flush(); return; }
  loginBusy = false;
  $('#lcode').value = '';
  $('#lerr').textContent = r.status === 429 ? L('ใส่ผิดหลายครั้งเกินไป รอ 10 นาทีแล้วลองใหม่', 'Too many wrong tries — wait 10 minutes') : L('รหัสไม่ถูกต้อง', 'Wrong PIN');
});

/* ---------- boot ---------- */
async function refresh() {
  if (document.hidden || sheetOpen() || flushing || (queue.length && !(allHeld && holdMedia()))) return;
  if ((await load()) === 'ok') safeRender();   // 'ok' = the state changed on the server (a 304 is 'same'): the other parent's caption, ⭐ or mood shows up too
}
// the app's name, the children's drawings and the ways in (the code lengths, a passkey) for the sign-in page — at the start and on sign-out
function brandLoad() {
  fetch('/api/brand', { credentials: 'same-origin', cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((b) => { if (!b) return; const changed = JSON.stringify(b) !== JSON.stringify(BRAND); BRAND = b; ls('brand', b); const pin = $('#lcode'); if (!S && changed && !(pin && pin.value)) render(); }).catch(() => {});   // never redraw the login form under someone typing
}
(async function boot() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  // the app's name and the children's drawings for the login page (kept on the phone for the next cold start)
  brandLoad();
  queue = await idb.all();
  seq = Math.max(seq, ...queue.map((o) => o.seq || 0));
  // open from the phone's own copy at once, then ask the server (a 304 when nothing changed) and redraw only if something did
  const c = await idb.get('state');
  if (c && c.etag) {
    S = c; overlay();
    // on the trip the app opens on Today (owner, Nov 2026: easy to use while travelling): a parent's phone that already holds the book,
    // opened from its icon (no page asked for) while a trip is on, goes straight to the day's page — the shelf is the top bar's back, twice
    try { const live = !location.hash && isEditor() && !ls('kidmode') && trips().find((t) => (t.kind === 'snap' ? snapLive(t) : dayNow(t) >= 0)); if (live) history.replaceState(null, '', `#/t/${encodeURIComponent(live.id)}/today`); } catch (e) { /* the shelf it is */ }
    render();
    load().then((r) => { if (r !== 'same') safeRender(); });   // new data, signed out, or offline (load sets the banner)
  } else { await load(); render(); }
  if (ls('remind')) pushSub().then((s) => { if (!s) { ls('remind', null); render(); } }).catch(() => {});   // the phone dropped the subscription
  window.addEventListener('hashchange', () => { closeSheet(); lbState = null; drawLb(); render(); window.scrollTo(0, 0); });
  window.addEventListener('online', () => { offline = false; flush(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { flush(); refresh(); } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
  setInterval(() => { if (queue.length && !(allHeld && holdMedia())) flush(); else refresh(); }, 30000);
  if (S) flush();
})();

// a relative's photos for a book: made small on the phone (shrinkPh), sent one by one to wait for the parents (server/inbox.js)
document.addEventListener('change', async (e) => {
  if (e.target.id !== 'inboxin') return;
  const t = trip(e.target.dataset.t), files = [...(e.target.files || [])].slice(0, 40), from = (ls('heartfrom') || '').trim();
  if (!t || !files.length || !from) return;
  INBOX.sending = files.length; safeRender(); let ok = 0;
  const today = dayNow(t);
  for (const f of files) {
    try {
      let at = 0; try { const m = await snapMeta(f); if (m && m.src === 'exif') at = snapWallMs(m.at, m.tz, t.timezone) || 0; } catch (_) {}
      const { blob } = await shrinkPh(f), id = uid('ib').replace(/[^A-Za-z0-9_-]/g, '');
      const u = `/api/b/inbox/${id}?trip=${encodeURIComponent(t.id)}&from=${encodeURIComponent(from)}${today >= 0 ? `&day=${today}` : ''}${at ? `&at=${at}` : ''}`;
      const r = await fetch(u, { method: 'PUT', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'image/jpeg' }, body: blob });
      if (r.ok) ok++; else if (r.status === 429) { toast(L('วันนี้ส่งครบจำนวนแล้ว พรุ่งนี้ส่งต่อได้', 'That is enough for today — send more tomorrow')); break; }
    } catch (_) { /* no signal: that one is not sent */ }
    INBOX.sending = Math.max(0, INBOX.sending - 1); safeRender();
  }
  INBOX.sending = 0; inboxLoad(true);
  toast(ok ? L(`ส่งแล้ว ${ok} รูป รอพ่อแม่ดู`, `${ok} sent — waiting for the parents`) : L('ส่งไม่ได้ ต้องมีเน็ต', 'Not sent — you need a connection'));
});

// the letter being written keeps what was typed over a redraw (a chip tap, the list coming back)
function capKeep() { if (!CAP.edit) return; const v = (id) => { const el = $('#' + id); return el ? el.value : null; }; const t = v('captitle'), x = v('captext'), d = v('capdate'); if (t !== null) CAP.edit.title = t; if (x !== null) CAP.edit.text = x; if (d !== null && d) CAP.edit.open_on = d; }
document.addEventListener('input', (e) => { if (['captitle', 'captext', 'capdate'].includes(e.target.id)) capKeep(); });
// the planner: what is typed is kept as it is typed (a redraw after a tap never loses it); "where to" filters its suggestions in place
document.addEventListener('input', (e) => {
  const el = e.target; if (!el) return;
  if (el.id === 'eltown') { eatLib.add = el.value; return; }
  if (el.id === 'sightq') {   // explore a town: the search hides cards in place (the box keeps the focus)
    SIGHT.q = el.value; const q = el.value.trim().toLowerCase(); let n = 0;
    const lis = [...document.querySelectorAll('.sightl .sightc')], fz = fzFilter(lis.map((li) => li.dataset.s || ''), q);
    lis.forEach((li, i) => { const ok = !q || fz.ok(i); li.hidden = !ok; if (ok) n++; });
    document.querySelectorAll('.sagegrp').forEach((g) => { g.hidden = !g.querySelector('.sightc:not([hidden])'); });
    const c = document.getElementById('sightn'), none = document.getElementById('sightnone'), all = (SIGHT.list || []).length;
    if (c) c.textContent = L(`แสดง ${n} จาก ${all} แห่ง`, `Showing ${n} of ${all}`); if (none) none.hidden = n > 0; return;
  }
  if (el.id === 'eltq') {   // the library's towns: filter the chips in place (the box keeps the focus)
    const q = el.value.trim().toLowerCase(); let n = 0;
    const chips = [...document.querySelectorAll('.elgrp .plchip')], fz = fzFilter(chips.map((c) => c.dataset.s || ''), q), at = new Map(chips.map((c, i) => [c, i]));
    document.querySelectorAll('.elgrp').forEach((g) => { let any = false; g.querySelectorAll('.plchip').forEach((c) => { const ok = !q || fz.ok(at.get(c)); c.hidden = !ok; if (ok) { any = true; n++; } }); g.hidden = !any; });
    const none = document.getElementById('eltnone'); if (none) none.hidden = n > 0; return;
  }
  if (!pln.a) return;
  if (el.id === 'plask') { pln.ask = el.value; return; }
  if (el.dataset && el.dataset.pl && el.type !== 'date') { pln.a[el.dataset.pl] = el.value; ls('plan', pln.a); document.querySelectorAll(`[data-a="plantx"][data-k="${el.dataset.pl}"]`).forEach((c) => c.setAttribute('aria-pressed', plHasTx(el.value, [c.dataset.p, c.dataset.p2]) ? 'true' : 'false')); if (el.id === 'pldest') { const sg = $('#plsug'); if (sg) sg.innerHTML = plSugHtml(el.value); } }
});
