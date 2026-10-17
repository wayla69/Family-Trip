'use strict';
/* ===== Memory Book · sheets, lightbox, actions, boot ===== */
let cap = null;   // capture sheet state
let sh = null;    // other sheet state
let lbs = { list: [], i: 0 };
let armed = '';   // two-tap delete

function openSheet(html) { const s = $('#sheet'); s.innerHTML = html; s.hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet() { const s = $('#sheet'); s.hidden = true; s.innerHTML = ''; document.body.style.overflow = ''; cap = null; sh = null; }
const sheetOpen = () => !$('#sheet').hidden;
const panelWrap = (inner) => `<div class="scrim" data-a="closesheet"></div><div class="panel"><button class="iconbtn x" data-a="closesheet" aria-label="close">✕</button>${inner}</div>`;

/* ---------- photos ---------- */
async function shrink(file) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const sc = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * sc), h = Math.round(bmp.height * sc);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(bmp, 0, 0, w, h);
    if (bmp.close) bmp.close();
    const b = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.84));
    return b && b.size ? b : file;
  } catch (_) { return file; }
}

/* ---------- capture sheet ---------- */
function openCapture(ctx = {}) {
  if (!isEditor()) return;
  if (ctx.edit) {
    const m = ctx.edit;
    const t = trip(m.trip), d = t && dayOf(t, m.day);
    const known = d && m.stop && d.stops.some((s) => s.key === m.stop.key);
    cap = { id: m.id, edit: true, trip: m.trip, day: m.day, stopKey: m.stop ? (known ? m.stop.key : '__c') : '', custom: m.stop && !known ? m.stop.name : '',
      kids: new Set(m.kids), mood: { ...m.mood }, text: m.text, photos: m.photos.map((p) => ({ id: p.id, url: pSrc(p), old: true })), checkin: false, at: m.at };
  } else {
    const rp = route().parts; const t = trip(ctx.trip) || (rp[0] === 'trip' && trip(rp[1])) || curTrip();
    if (!t) { toast(L('ยังไม่มีทริป', 'No trip yet')); return; }
    const day = ctx.day !== undefined && ctx.day !== '' && !isNaN(ctx.day) ? +ctx.day : tripDayNow(t);
    cap = { id: uid('m'), edit: false, trip: t.id, day, stopKey: ctx.key || '', custom: '', kids: new Set(kids().map((k) => k.id)), mood: {},
      text: '', photos: [], checkin: !!ctx.key && !checkin(t.id, ctx.key), at: Date.now() };
  }
  drawCap();
}
function capStops() { const t = trip(cap.trip), d = t && dayOf(t, cap.day); return d ? d.stops : []; }
function drawCap() {
  const prev = $('#sheet .panel'); const sc = prev ? prev.scrollTop : 0;
  const t = trip(cap.trip), ts = trips();
  const stops = capStops();
  const selKids = kids().filter((k) => cap.kids.has(k.id));
  const photoSec = cap.edit
    ? (cap.photos.length ? `<div class="prev">${cap.photos.map((p) => `<div><img src="${p.url}" alt=""></div>`).join('')}</div>` : '')
    : `<label class="f">📷 ${L('รูป', 'Photos')} (${cap.photos.length}/12)</label>
<div class="row"><button class="btn sec2" data-a="pickcam">📷 ${L('ถ่ายรูป', 'Take photo')}</button><button class="btn sec2" data-a="pickfile">🖼 ${L('เลือกรูป', 'Choose photos')}</button></div>
<input id="fcam" type="file" accept="image/*" capture="environment" hidden><input id="fpick" type="file" accept="image/*" multiple hidden>
${cap.photos.length ? `<div class="prev">${cap.photos.map((p, i) => `<div><img src="${p.url}" alt=""><button data-a="rmphoto" data-i="${i}" aria-label="remove">✕</button></div>`).join('')}</div>` : ''}`;
  const stopSel = `<select id="cstop"><option value="">${L('— ไม่ระบุ —', '— none —')}</option>${stops.map((s) => `<option value="${esc(s.key)}"${cap.stopKey === s.key ? ' selected' : ''}>${s.kind === 'food' ? '🍽' : '📍'} ${esc(s[lang] || s.en)}</option>`).join('')}<option value="__c"${cap.stopKey === '__c' ? ' selected' : ''}>✏️ ${L('ที่อื่น (พิมพ์ชื่อเอง)', 'Somewhere else (type a name)')}</option></select>${cap.stopKey === '__c' ? `<input id="ccustom" type="text" maxlength="80" style="margin-top:8px" value="${esc(cap.custom)}" placeholder="${L('ชื่อสถานที่', 'Place name')}">` : ''}`;
  const already = cap.stopKey && cap.stopKey !== '__c' && checkin(cap.trip, cap.stopKey);
  const html = panelWrap(`<h2>${cap.edit ? L('แก้ไขความทรงจำ', 'Edit memory') : L('บันทึกความทรงจำ', 'Save a memory')}</h2><p class="sub">${esc(tt(t))}</p>
${ts.length > 1 && !cap.edit ? `<label class="f">${L('ทริป', 'Trip')}</label><select id="ctrip">${ts.map((x) => `<option value="${esc(x.id)}"${x.id === cap.trip ? ' selected' : ''}>${esc(tt(x))}</option>`).join('')}</select>` : ''}
<label class="f">${L('วัน', 'Day')}</label><select id="cday"><option value="0">${L('— ไม่ระบุวัน —', '— no particular day —')}</option>${t.days.map((d) => `<option value="${d.n}"${cap.day === d.n ? ' selected' : ''}>${L('วันที่', 'Day')} ${d.n} · ${esc(d.date[lang] || d.date.en)} · ${esc(dtitle(d))}</option>`).join('')}</select>
<label class="f">${L('ที่ไหน / มื้อไหน', 'Where / which meal')}</label>${stopSel}
${photoSec}
<label class="f">${L('ใครอยู่ในช่วงเวลานี้', 'Who was in this moment')}</label>
<div class="chips">${kids().map((k) => `<button class="chip" data-a="ckid" data-k="${esc(k.id)}" aria-pressed="${cap.kids.has(k.id)}">${k.emoji} ${esc(kn(k))}</button>`).join('')}</div>
${selKids.length ? `<label class="f">${L('รู้สึกยังไง', 'How did it feel')}</label>${selKids.map((k) => `<div class="kmood"><b>${kavHtml(k, 's')} ${esc(kn(k))}</b><div class="moods">${MOODS.map((m) => `<button data-a="cmood" data-k="${esc(k.id)}" data-v="${m}" aria-pressed="${cap.mood[k.id] === m}">${m}</button>`).join('')}</div></div>`).join('')}` : ''}
<label class="f">💬 ${L('คำพูดน่ารัก / สิ่งที่เกิดขึ้น', 'Something they said / what happened')}</label>
<textarea id="ctext" maxlength="2000" placeholder="${L('เช่น มีมี่: “จิงโจ้กระโดดเหมือนมีมี่เลย!”', 'e.g. Mimi: “The kangaroo hops just like me!”')}">${esc(cap.text)}</textarea>
${!cap.edit && cap.stopKey && cap.stopKey !== '__c' ? (already ? `<p class="sub" style="margin-top:10px">🏅 ${L('เช็คอินที่นี่แล้ว', 'Already stamped here')}</p>` : `<label class="f" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="cchk"${cap.checkin ? ' checked' : ''}> 🏅 ${L('ได้แสตมป์ที่นี่ด้วย', 'Collect the stamp here too')}</label>`) : ''}
<div class="foot"><button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="csave" id="csave">${L('บันทึก', 'Save')}</button></div>`);
  openSheet(html);
  const p = $('#sheet .panel'); if (p) p.scrollTop = sc;
}
async function addFiles(files) {
  const room = 12 - cap.photos.length;
  const list = [...files].slice(0, room);
  if (files.length > room) toast(L('ใส่ได้สูงสุด 12 รูปต่อหนึ่งความทรงจำ', 'Up to 12 photos per memory'));
  if (list.length) toast(L('กำลังเตรียมรูป…', 'Preparing photos…'));
  for (const f of list) {
    const blob = await shrink(f);
    cap.photos.push({ id: uid('p'), blob, url: URL.createObjectURL(blob) });
  }
  drawCap();
}
function buildStop() {
  if (!cap.stopKey) return null;
  if (cap.stopKey === '__c') { const n = cap.custom.trim(); return n ? { key: n, name: n, kind: 'place' } : null; }
  const s = capStops().find((x) => x.key === cap.stopKey);
  return s ? { key: s.key, name: s.en, kind: s.kind } : null;
}
async function saveCapture() {
  const text = cap.text.trim(), stop = buildStop();
  const kidsArr = [...cap.kids];
  const mood = {}; kidsArr.forEach((k) => { if (cap.mood[k]) mood[k] = cap.mood[k]; });
  if (!text && !cap.photos.length && !Object.keys(mood).length && !stop) { toast(L('ใส่รูป ข้อความ หรือความรู้สึกอย่างน้อยหนึ่งอย่างนะ', 'Add a photo, a note or a feeling first')); return; }
  const mem = { trip: cap.trip, day: cap.day, kids: kidsArr, mood, text, stop, at: cap.at };
  if (cap.edit) {
    try { await api('PUT', '/api/memories/' + cap.id, mem); closeSheet(); await load(); render(); toast('✓ ' + L('แก้ไขแล้ว', 'Updated')); }
    catch (e) { toast(L('บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง', 'Could not save — try again')); }
    return;
  }
  const doChk = $('#cchk') ? $('#cchk').checked : false;
  const ck = doChk && stop ? { trip: cap.trip, key: stop.key, day: cap.day, kind: stop.kind, name: stop.name, done: true, at: Date.now() } : null;
  ls('name', S.me.name);
  const item = { id: cap.id, mem, checkin: ck, at: Date.now(), photos: cap.photos.map((p) => ({ id: p.id, blob: p.blob, url: p.url })) };
  queue.push(item);
  await idb.put(persistable(item));
  closeSheet(); render();
  toast('✓ ' + L('บันทึกแล้ว', 'Saved'));
  flush();
}

/* ---------- upload queue ---------- */
let flushing = false;
async function flush() {
  if (flushing || !queue.length || !S || !isEditor()) return;
  flushing = true;
  const done = new Set();
  try {
    for (const it of [...queue]) {
      await api('PUT', '/api/memories/' + it.id, it.mem);
      for (const p of it.photos) {
        if (p.done) continue;
        await api('PUT', '/api/photos/' + p.id + '?mem=' + it.id, undefined, p.blob);
        p.done = true; await idb.put(persistable(it));
      }
      if (it.checkin) await api('PUT', '/api/checkins', it.checkin);
      await idb.del(it.id); done.add(it.id);
    }
  } catch (e) {
    if (e.code === 403) toast(L('บัญชีนี้ดูอย่างเดียว — เก็บไว้ในเครื่องก่อน', 'This session is read-only — kept on this device'));
  }
  if (done.size) {
    await load();
    queue.filter((x) => done.has(x.id)).forEach((x) => x.photos.forEach((p) => { try { URL.revokeObjectURL(p.url); } catch (_) {} }));
    queue = queue.filter((x) => !done.has(x.id));
    toast('☁️ ' + L(`ส่งขึ้นสมุดแล้ว ${done.size} รายการ`, `${done.size} uploaded to the book`));
    if (!sheetOpen()) render();
  } else if (queue.length && !sheetOpen()) render();
  flushing = false;
}

/* ---------- lightbox ---------- */
function drawLb() {
  const it = lbs.list[lbs.i], n = lbs.list.length;
  $('#lb').innerHTML = `<div class="top"><span>${lbs.i + 1} / ${n}</span><span><a href="${esc(it.src)}" download>⬇ ${L('บันทึกรูป', 'Save')}</a> &nbsp; <button class="t" data-a="lbclose" aria-label="close">✕</button></span></div>
<div class="stage"><img src="${esc(it.src)}" alt="">${n > 1 ? `<button class="nv" style="left:8px" data-a="lbprev" aria-label="prev">‹</button><button class="nv" style="right:8px" data-a="lbnext" aria-label="next">›</button>` : ''}</div>
<div class="cap">${esc(it.cap || '')}</div>`;
}
function openLb(list, i) { if (!list || !list.length) return; lbs = { list, i }; drawLb(); $('#lb').hidden = false; }
function closeLb() { $('#lb').hidden = true; $('#lb').innerHTML = ''; }
let tx = 0;
document.addEventListener('touchstart', (e) => { if (!$('#lb').hidden) tx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
  if ($('#lb').hidden) return;
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 60) { lbs.i = (lbs.i + (dx < 0 ? 1 : -1) + lbs.list.length) % lbs.list.length; drawLb(); }
}, { passive: true });

/* ---------- other sheets ---------- */
function openStory(tripId, day, text) {
  sh = { kind: 'story', trip: tripId, day, text };
  const d = dayOf(trip(tripId), day);
  openSheet(panelWrap(`<h2>✍️ ${L('เรื่องเล่าของวัน', 'Story of the day')}</h2><p class="sub">${L('วันที่', 'Day')} ${day} · ${esc(dtitle(d))}</p>
<label class="f">${L('เล่าให้เด็กๆ ฟังตอนโต (เว้นว่างแล้วบันทึก = ลบ)', 'For the kids to read when they’re older (save empty to remove)')}</label><textarea id="stext" style="min-height:170px" maxlength="8000">${esc(text)}</textarea>
<div class="foot"><button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="ssave">${L('บันทึก', 'Save')}</button></div>`));
}
function openAddTrip() {
  sh = { kind: 'trip' };
  const today = todayStr();
  openSheet(panelWrap(`<h2>🧳 ${L('ทริปใหม่', 'New trip')}</h2><p class="sub">${L('เริ่มเล่มใหม่บนชั้นหนังสือ', 'Start a new book on the shelf')}</p>
<label class="f">${L('ชื่อทริป', 'Trip name')}</label><input id="ttitle" type="text" maxlength="80" placeholder="${L('เช่น ทริปญี่ปุ่น 2028', 'e.g. Japan 2028')}">
<label class="f">${L('ที่ไหน (ไม่บังคับ)', 'Where (optional)')}</label><input id="tplace" type="text" maxlength="80">
<div class="row"><div><label class="f">${L('เริ่ม', 'Start')}</label><input id="tstart" type="date" value="${today}"></div><div><label class="f">${L('จบ', 'End')}</label><input id="tend" type="date" value="${today}"></div></div>
<div class="foot"><button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="tsave">${L('สร้างเล่ม', 'Create')}</button></div>`));
}
function openKid(id) {
  const k = kid(id); sh = { kind: 'kid', id };
  openSheet(panelWrap(`<h2>${k.emoji} ${esc(kn(k))}</h2>
<label class="f">🎂 ${L('วันเกิด (ไว้คำนวณอายุและตั้งวันเปิดจดหมาย)', 'Birthday (for ages and letter dates)')}</label><input id="kbirth" type="date" value="${esc(k.birth && k.birth.length === 10 ? k.birth : '')}">
<div class="foot"><button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="ksave">${L('บันทึก', 'Save')}</button></div>`));
}
function openTK(kidId, tripId) {
  const k = kid(kidId), t = trip(tripId), p = S.tripkid.find((x) => x.trip === tripId && x.kid === kidId) || {};
  sh = { kind: 'tk', kid: kidId, trip: tripId };
  const guess = p.age || ageText(k.birth, t.start);
  openSheet(panelWrap(`<h2>${k.emoji} ${esc(kn(k))} · ${esc(tt(t))}</h2>
<div class="row"><div><label class="f">🎈 ${L('อายุตอนไปทริป', 'Age on this trip')}</label><input id="tkage" type="text" maxlength="40" value="${esc(guess)}"></div><div><label class="f">📏 ${L('ส่วนสูง (ซม.)', 'Height (cm)')}</label><input id="tkh" type="text" inputmode="decimal" maxlength="20" value="${esc(p.height || '')}"></div></div>
<label class="f">⭐ ${L('ของโปรดช่วงนี้', 'Current favourites')}</label><input id="tkfav" type="text" maxlength="200" value="${esc(p.fav || '')}" placeholder="${L('อาหาร สัตว์ เพลง ของเล่น…', 'food, animal, song, toy…')}">
<label class="f">📝 ${L('เด็กคนนี้ช่วงนี้เป็นยังไง', 'What this age is like')}</label><textarea id="tknote" maxlength="600" placeholder="${L('พูดได้กี่คำ ชอบทำอะไร กลัวอะไร…', 'words she says, what she loves, what scares her…')}">${esc(p.note || '')}</textarea>
<div class="foot"><button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="tksave">${L('บันทึก', 'Save')}</button></div>`));
}
function openLetter(l) {
  const k0 = l ? l.to : kids()[0].id;
  sh = { kind: 'letter', id: l ? l.id : uid('l'), edit: !!l, to: k0, title: l ? l.title : '', text: l ? l.text || '' : '', open_at: l ? l.open_at : '' };
  drawLetter();
}
function drawLetter() {
  const prev = $('#sheet .panel'); const sc = prev ? prev.scrollTop : 0;
  const k = kid(sh.to);
  const age = (n) => { if (!k || !k.birth) return ''; const b = new Date(k.birth.length === 7 ? k.birth + '-01' : k.birth); b.setFullYear(b.getFullYear() + n); return b.toISOString().slice(0, 10); };
  const yrs = (n) => { const d = new Date(); d.setFullYear(d.getFullYear() + n); return d.toISOString().slice(0, 10); };
  const q = (label, v) => `<button class="chip" data-a="lq" data-v="${v}" ${v ? '' : 'disabled'}>${label}</button>`;
  openSheet(panelWrap(`<h2>💌 ${sh.edit ? L('แก้จดหมาย', 'Edit letter') : L('จดหมายถึงอนาคต', 'Letter to the future')}</h2>
<p class="sub">${L('ปิดผนึกจริง คนอื่นอ่านไม่ได้จนถึงวันเปิด', 'Truly sealed — nobody else can read it until the date')}</p>
<label class="f">${L('ถึงใคร', 'To')}</label><select id="lto">${kids().map((x) => `<option value="${esc(x.id)}"${sh.to === x.id ? ' selected' : ''}>${x.emoji} ${esc(kn(x))}</option>`).join('')}<option value="all"${sh.to === 'all' ? ' selected' : ''}>👨‍👩‍👧‍👦 ${L('ทุกคน', 'Everyone')}</option></select>
<label class="f">${L('หัวเรื่อง (ไม่บังคับ)', 'Title (optional)')}</label><input id="ltitle" type="text" maxlength="120" value="${esc(sh.title)}">
<label class="f">${L('ข้อความ', 'Message')}</label><textarea id="ltext" style="min-height:160px" maxlength="20000" placeholder="${L('ถึงลูกรัก…', 'Dear ...')}">${esc(sh.text)}</textarea>
<label class="f">🔒 ${L('เปิดอ่านได้วันที่', 'Opens on')}</label><input id="lopen" type="date" value="${esc(sh.open_at)}" min="${todayStr()}">
<div class="chips" style="margin-top:8px">${q('+1 ' + L('ปี', 'y'), yrs(1))}${q('+5 ' + L('ปี', 'y'), yrs(5))}${q('+10 ' + L('ปี', 'y'), yrs(10))}${q(L('อายุ 10', 'age 10'), age(10))}${q(L('อายุ 18', 'age 18'), age(18))}${q(L('อายุ 21', 'age 21'), age(21))}</div>
${k && !k.birth ? `<p class="sub">${L('ใส่วันเกิดในหน้า “เด็กๆ” เพื่อใช้ปุ่มตามอายุ', 'Add a birthday in “Kids” to use the age shortcuts')}</p>` : ''}
<div class="foot">${sh.edit ? `<button class="btn danger" data-a="ldel">${armed === 'l' + sh.id ? L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete') : L('ลบ', 'Delete')}</button>` : `<button class="btn sec2" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button>`}<button class="btn" data-a="lsave">${L('ปิดผนึก', 'Seal it')}</button></div>`));
  const p = $('#sheet .panel'); if (p) p.scrollTop = sc;
}
function readLetter(id) {
  const l = S.letters.find((x) => x.id === id); if (!l) return;
  const k = kid(l.to);
  openSheet(panelWrap(`<h2>💌 ${esc(l.title || L('ถึง ', 'To ') + (k ? kn(k) : L('ทุกคน', 'everyone')))}</h2><p class="sub">${L('เขียนโดย', 'by')} ${esc(l.by)} · ${fmtDate(l.at)} · ${L('เปิดได้ตั้งแต่', 'opened from')} ${esc(l.open_at)}</p>
<div class="story" style="margin-top:14px;font-size:17px">${esc(l.text)}</div><div class="foot"><button class="btn sec2" data-a="closesheet">${L('ปิด', 'Close')}</button></div>`));
}

/* ---------- actions ---------- */
const val = (id) => ($('#' + id) ? $('#' + id).value : '');
const A = {
  back() { if (history.length > 1) history.back(); else location.hash = '#/'; },
  lang(t) { lang = t.dataset.v; ls('lang', lang); const s = sheetOpen(); render(); if (s && cap) drawCap(); },
  async retry() { await flush(); },
  async logout() { try { await fetch('/api/logout', { method: 'POST', headers: { 'x-mb': '1' } }); } catch (_) {} S = null; ls('state', null); render(); },
  cap(t) { openCapture({ trip: t.dataset.t, day: t.dataset.d, key: t.dataset.key }); },
  editmem(t) { const m = allMems().find((x) => x.id === t.dataset.id); if (!m) return; if (m.pending) return toast(L('กำลังรอส่ง แก้ได้หลังส่งเสร็จ', 'Still uploading — edit after it’s sent')); openCapture({ edit: m }); },
  async delmem(t) {
    const id = t.dataset.id;
    if (armed !== 'm' + id) { armed = 'm' + id; t.textContent = L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete'); setTimeout(() => { if (armed === 'm' + id) { armed = ''; if (t.isConnected) t.textContent = L('ลบ', 'Delete'); } }, 4000); return; }
    armed = '';
    const q = queue.find((x) => x.id === id);
    if (q) { await idb.del(id); queue = queue.filter((x) => x !== q); render(); return; }
    try { await api('DELETE', '/api/memories/' + id); await load(); render(); toast(L('ลบแล้ว', 'Deleted')); } catch (_) { toast(L('ลบไม่สำเร็จ', 'Could not delete')); }
  },
  lb(t) { openLb((window.LB || {})[t.dataset.k], +t.dataset.i); },
  lbclose() { closeLb(); },
  lbprev() { lbs.i = (lbs.i - 1 + lbs.list.length) % lbs.list.length; drawLb(); },
  lbnext() { lbs.i = (lbs.i + 1) % lbs.list.length; drawLb(); },
  kf(t) { const r = route(); location.hash = '#/trip/' + encodeURIComponent(r.parts[1]) + (t.dataset.k ? '?k=' + t.dataset.k : ''); },
  alldays() { showAllDays = !showAllDays; render(); },
  async stop(t) {
    const tr = trip(t.dataset.t), d = dayOf(tr, +t.dataset.d), s = d.stops.find((x) => x.key === t.dataset.key), on = checkin(tr.id, s.key);
    try {
      await api('PUT', '/api/checkins', on ? { trip: tr.id, key: s.key, done: false } : { trip: tr.id, key: s.key, day: d.n, kind: s.kind, name: s.en, done: true, at: Date.now() });
      await load(); render(); if (!on) toast('🏅 ' + L('ได้แสตมป์แล้ว!', 'Stamp collected!'));
    } catch (_) { toast(L('ไม่สำเร็จ ลองใหม่', 'Failed — try again')); }
  },
  story(t) {
    const tr = t.dataset.t, d = +t.dataset.d;
    const s = S.stories.find((x) => x.trip === tr && x.day === d && x.lang === lang);
    openStory(tr, d, s ? s.text : '');
  },
  async aistory(t) {
    toast('✨ ' + L('Claude กำลังเขียน… รอสักครู่', 'Claude is writing… one moment'));
    try { const r = await api('POST', '/api/story', { trip: t.dataset.t, day: +t.dataset.d, lang }); openStory(t.dataset.t, +t.dataset.d, r.text); }
    catch (_) { toast(L('Claude เขียนไม่สำเร็จ ลองใหม่หรือเขียนเอง', 'Claude could not write it — try again or write it yourself')); }
  },
  async ssave() {
    try { await api('PUT', '/api/stories', { trip: sh.trip, day: sh.day, lang, text: val('stext') }); closeSheet(); await load(); render(); toast('✓'); } catch (_) { toast(L('บันทึกไม่สำเร็จ', 'Could not save')); }
  },
  addtrip() { openAddTrip(); },
  async tsave() {
    try { const r = await api('POST', '/api/trips', { title: val('ttitle'), place: val('tplace'), start: val('tstart'), end: val('tend') }); closeSheet(); await load(); location.hash = '#/trip/' + r.id; }
    catch (e) { toast(L('กรอกชื่อทริปและวันที่ให้ครบ (จบต้องไม่ก่อนเริ่ม)', 'Add a name and valid dates (end can’t be before start)')); }
  },
  kidedit(t) { openKid(t.dataset.id); },
  async ksave() { try { await api('PUT', '/api/kids/' + sh.id, { birth: val('kbirth') }); closeSheet(); await load(); render(); } catch (_) { toast(L('บันทึกไม่สำเร็จ', 'Could not save')); } },
  tkedit(t) { openTK(t.dataset.id, t.dataset.t); },
  async tksave() {
    try { await api('PUT', '/api/tripkid', { trip: sh.trip, kid: sh.kid, age: val('tkage'), height: val('tkh'), fav: val('tkfav'), note: val('tknote') }); closeSheet(); await load(); render(); toast('✓'); }
    catch (_) { toast(L('บันทึกไม่สำเร็จ', 'Could not save')); }
  },
  newletter() { openLetter(null); },
  editletter(t) { const l = S.letters.find((x) => x.id === t.dataset.id); if (l) openLetter(l); },
  readletter(t) { readLetter(t.dataset.id); },
  sealedtoast() { toast('🔒 ' + L('ยังไม่ถึงวันเปิดอ่าน', 'Not time to open it yet')); },
  lq(t) { sh.to = val('lto'); sh.title = val('ltitle'); sh.text = val('ltext'); sh.open_at = t.dataset.v; drawLetter(); },
  async lsave() {
    const body = { to: val('lto'), title: val('ltitle'), text: val('ltext'), open_at: val('lopen') };
    if (!body.text.trim()) return toast(L('เขียนข้อความก่อนนะ', 'Write the message first'));
    if (!body.open_at || body.open_at <= todayStr()) return toast(L('เลือกวันเปิดอ่านในอนาคต', 'Pick an opening date in the future'));
    try { await api('PUT', '/api/letters/' + sh.id, body); closeSheet(); await load(); render(); toast('💌 ' + L('ปิดผนึกแล้ว', 'Sealed')); } catch (_) { toast(L('บันทึกไม่สำเร็จ', 'Could not save')); }
  },
  async ldel() {
    if (armed !== 'l' + sh.id) { armed = 'l' + sh.id; sh.to = val('lto'); sh.title = val('ltitle'); sh.text = val('ltext'); sh.open_at = val('lopen'); drawLetter(); setTimeout(() => { armed = ''; }, 4000); return; }
    armed = '';
    try { await api('DELETE', '/api/letters/' + sh.id); closeSheet(); await load(); render(); } catch (_) { toast(L('ลบไม่สำเร็จ', 'Could not delete')); }
  },
  closesheet() { closeSheet(); },
  pickcam() { $('#fcam').click(); },
  pickfile() { $('#fpick').click(); },
  rmphoto(t) { const p = cap.photos.splice(+t.dataset.i, 1)[0]; if (p && p.url) URL.revokeObjectURL(p.url); drawCap(); },
  ckid(t) { const k = t.dataset.k; if (cap.kids.has(k)) cap.kids.delete(k); else cap.kids.add(k); drawCap(); },
  cmood(t) { const k = t.dataset.k; if (cap.mood[k] === t.dataset.v) delete cap.mood[k]; else cap.mood[k] = t.dataset.v; drawCap(); },
  csave() { const b = $('#csave'); if (b) b.disabled = true; saveCapture().finally(() => { const x = $('#csave'); if (x) x.disabled = false; }); },
  print() { window.print(); },
};
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-a]'); if (!t) return;
  const f = A[t.dataset.a]; if (f) { e.preventDefault(); f(t, e); }
});
document.addEventListener('input', (e) => {
  if (!cap) return;
  if (e.target.id === 'ctext') cap.text = e.target.value;
  else if (e.target.id === 'ccustom') cap.custom = e.target.value;
});
document.addEventListener('change', (e) => {
  const id = e.target.id;
  if (cap) {
    if (id === 'ctrip') { cap.trip = e.target.value; cap.day = tripDayNow(trip(cap.trip)); cap.stopKey = ''; cap.checkin = false; drawCap(); }
    else if (id === 'cday') { cap.day = +e.target.value; cap.stopKey = ''; drawCap(); }
    else if (id === 'cstop') { cap.stopKey = e.target.value; cap.checkin = !!cap.stopKey && cap.stopKey !== '__c' && !checkin(cap.trip, cap.stopKey); drawCap(); }
    else if (id === 'fcam' || id === 'fpick') { addFiles(e.target.files); }
  }
  if (sh && sh.kind === 'letter' && (id === 'lto')) { sh.to = e.target.value; sh.title = val('ltitle'); sh.text = val('ltext'); sh.open_at = val('lopen'); drawLetter(); }
});
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'lf') return;
  e.preventDefault();
  const err = $('#lerr'); err.textContent = '';
  const name = val('lname').trim() || L('ครอบครัว', 'Family');
  try {
    const r = await fetch('/api/login', { method: 'POST', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: val('lcode'), name }) });
    if (r.status === 429) { err.textContent = L('ลองหลายครั้งเกินไป รอสักครู่', 'Too many tries — wait a bit'); return; }
    if (!r.ok) { err.textContent = L('รหัสไม่ถูกต้อง', 'Wrong code'); return; }
    ls('name', name);
    await load(); queue = (await idb.all()).map(hydrate); render(); flush();
  } catch (_) { err.textContent = L('เชื่อมต่อไม่ได้ ลองใหม่', 'Can’t connect — try again'); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (!$('#lb').hidden) closeLb(); else if (sheetOpen()) closeSheet(); }
  if (!$('#lb').hidden && e.key === 'ArrowRight') A.lbnext();
  if (!$('#lb').hidden && e.key === 'ArrowLeft') A.lbprev();
});

/* ---------- boot ---------- */
async function refresh() {
  if (document.hidden || sheetOpen() || !$('#lb').hidden || flushing) return;
  const was = JSON.stringify([S && S.memories.length, S && S.checkins.length]);
  if (await load() === 'ok' && S && JSON.stringify([S.memories.length, S.checkins.length]) !== was) render();
}
(async function boot() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  queue = (await idb.all()).map(hydrate);
  await load();
  render();
  window.addEventListener('hashchange', () => { closeSheet(); closeLb(); render(); window.scrollTo(0, 0); });
  window.addEventListener('online', () => { flush(); refresh(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { flush(); refresh(); } });
  setInterval(() => { if (queue.length) flush(); else refresh(); }, 30000);
  if (S) flush();
})();
