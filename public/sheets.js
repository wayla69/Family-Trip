'use strict';
/* ===== Memory Bookshelf · actions, photos, lightbox, sheets, boot ===== */

/* ---------- writes (all through the offline queue) ---------- */
function putEntry(t, row, id) {
  const body = { trip: t.id, day: row.day, kind: row.kind, child: row.child || null, text: row.text || '', mood: row.mood || null, first_key: row.first_key || null, lang: row.lang || null, highlight: !!row.highlight, at: row.at || Date.now() };
  return enqueue({ method: 'PUT', url: '/api/b/entries/' + encodeURIComponent(id), body, local: { coll: 'entries', id, row: { ...body, created_by: S.me.name, mine: true } } });
}
const delEntry = (id) => enqueue({ method: 'DELETE', url: '/api/b/entries/' + encodeURIComponent(id), local: { coll: 'entries', id, del: true } });

// shrink on the phone before upload (saves mobile data); EXIF is stripped again on the server anyway
async function shrink(file) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const s = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
    if (s === 1 && file.type === 'image/jpeg' && file.size < 4e6) return file;
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob((b) => res(b || file), 'image/jpeg', 0.86));
  } catch (_) { return file; }   // e.g. HEIC the browser can't decode — the server converts it
}
async function addPhotos(t, day, files) {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
  if (!list.length) return;
  toast(L(`เตรียมรูป ${list.length} รูป…`, `Preparing ${list.length} photos…`));
  for (const f of list) {
    const blob = await shrink(f);
    const id = uid('ph');
    const at = f.lastModified && Math.abs(f.lastModified - Date.now()) < 400 * 864e5 ? Math.min(f.lastModified, Date.now()) : Date.now();
    await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}`, blob,
      local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0 } } });
  }
}

/* ---------- actions ---------- */
const A = {
  lang(b) { lang = b.dataset.v; ls('lang', lang); render(); },
  jump(b, e) { e.preventDefault(); const el = document.getElementById('d' + b.dataset.v); if (el) el.scrollIntoView({ behavior: 'smooth' }); },
  pin(b) {
    const f = $('#lcode'), k = b.dataset.v;
    f.value = k === 'clear' ? '' : k === 'back' ? f.value.slice(0, -1) : (f.value + k).slice(0, 32);
    $('#lerr').textContent = '';
  },
  'who-login'(b) { const n = $('#lname'); n.value = n.value === b.dataset.v ? '' : b.dataset.v; $$('[data-a="who-login"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === n.value)); },
  print() { window.print(); },
  pdf(b) { toast(L('กำลังสร้าง PDF พร้อมรูป… อาจใช้เวลาครึ่งนาที', 'Making the PDF with photos… may take half a minute')); location.href = b.getAttribute('href'); },
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
      const note = es.find((e) => e.kind === 'note'); if (note) lines.push(`  ${L('บันทึก', 'Note')}: ${note.text}`);
      es.filter((e) => e.kind === 'first').forEach((e) => lines.push(`  ${L('ครั้งแรก', 'First')}: ${e.first_key === 'custom' ? e.text : firstLabel(t, e.first_key).t} — ${kidName(e.child)}`));
      lines.push('');
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(L('คัดลอกแล้ว', 'Copied')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Copy not available here')); }
  },
  who(b) { quoteWho = b.dataset.v; render(); },
  async savequote(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, ta = $('#qtext'), text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    delete drafts[ta.dataset.draft]; ta.value = '';
    await putEntry(t, { day: d, kind: 'quote', child: quoteWho, text }, uid('q'));
    toast(L('บันทึกคำพูดแล้ว', 'Quote saved'));
  },
  hiq(b) { const e = S.entries.find((x) => x.id === b.dataset.v); if (e) putEntry(trip(e.trip), { ...e, highlight: !e.highlight }, e.id); },
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
    if (ex) delEntry(ex.id); else { burst(b, ['🌟', '✨', '🎉']); putEntry(t, { day: d, kind: 'first', child: k, first_key: key }, `${t.id}.first.${key}.${k}`); }
  },
  customfirst(b) {
    const inp = $('#firsttext'), text = inp.value.trim(); if (!text) { inp.focus(); return; }
    delete drafts[inp.dataset.draft]; inp.value = '';
    putEntry(trip(b.dataset.t), { day: +b.dataset.d, kind: 'first', child: b.dataset.k, first_key: 'custom', text }, uid('fc'));
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
  async story(b) {
    if (storyCtl) return;
    const t = trip(b.dataset.t), day = b.dataset.d === '' ? null : +b.dataset.d;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตเพื่อแต่งนิทาน', 'Writing a story needs a connection')); return; }
    const box = $('#storytext'); box.hidden = false; box.textContent = ''; box.classList.add('writing');
    $('#storygo').disabled = true; $('#storystop').hidden = false;
    storyCtl = new AbortController();
    let text = '';
    try {
      const r = await fetch('/api/b/story', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal,
        headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: t.id, day, lang }) });
      if (r.status === 422) { box.textContent = L('ยังไม่มีบันทึกของวันนี้ — เพิ่มคำพูด คำอธิบายรูป หรือเช็คอินก่อน', 'Nothing written down yet — add a quote, a photo caption or a check-in first'); return; }
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
          if (!ev) { text += d.t; box.textContent = text; }
          else if (ev === 'done') { await load(); render(); toast(L('เก็บนิทานไว้ในสมุดแล้ว', 'Story saved in the book')); }
          else if (ev === 'error') box.textContent = d.error === 'refusal' ? L('Claude แต่งนิทานนี้ไม่ได้ ลองเพิ่มบันทึกแล้วลองใหม่', 'Claude could not write this one — try again later') : L('แต่งไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') toast(L('หยุดแล้ว — ไม่ได้บันทึก', 'Stopped — nothing saved'));
      else box.textContent = L('แต่งไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
    } finally {
      storyCtl = null; box.classList.remove('writing');
      const go = $('#storygo'), stop = $('#storystop'); if (go) go.disabled = false; if (stop) stop.hidden = true;
    }
  },
  storystop() { if (storyCtl) storyCtl.abort(); },
  lb(b) { openLb(b.dataset.t, b.dataset.v); },
  newtrip() { openSheet(newTripSheet()); },
  async createtrip(b, e) {
    e.preventDefault();
    const f = $('#ntf'), title = f.title.value.trim(), from = f.from.value, to = f.to.value;
    const slug = (f.slug.value.trim() || title).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || uid('trip');
    if (!title || !from || !to) return;
    try {
      await api('POST', '/api/b/trips', { slug, title: { th: title, en: f.title_en.value.trim() || title }, date_from: from, date_to: to, accent: f.accent.value });
      closeSheet(); await load(); nav('#/t/' + slug);
    } catch (err) { $('#nterr').textContent = err.code === 409 ? L('มีเล่มชื่อนี้แล้ว', 'A book with this id exists') : L('ตรวจวันที่อีกครั้ง (ไม่เกิน 60 วัน)', 'Check the dates (60 days max)'); }
  },
  closesheet() { closeSheet(); },
};

/* ---------- fav/note save when leaving the field; empty = delete ---------- */
async function saveBlur(el) {
  const t = trip(el.dataset.t), d = +el.dataset.d, kind = el.dataset.aBlur, text = el.value.trim();
  const id = `${t.id}.${kind}.d${d}`, cur = S.entries.find((e) => e.id === id);
  delete drafts[el.dataset.draft];
  if (!text) { if (cur) await delEntry(id); return; }
  if (!cur || cur.text !== text) await putEntry(t, { day: d, kind, text }, id);
}

let storyCtl = null;   // AbortController while a story streams

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
  const { list, i } = lbState, m = list[i]; if (!m) { lbState = null; return drawLb(); }
  const ed = isEditor();
  lb.innerHTML = `<div class="bar"><button data-lb="close" aria-label="${L('ปิด', 'Close')}">✕</button><span class="grow">${i + 1} / ${list.length}</span>
${ed ? `<button data-lb="star" aria-pressed="${!!m.highlight}">${m.highlight ? '⭐' : '☆'} ${L('ชอบ', 'Fave')}</button><button data-lb="del">${L('ลบ', 'Delete')}</button>` : ''}</div>
<div class="stage"><img src="${esc(imgF(m))}" alt="${esc(m.caption)}">${list.length > 1 ? `<button class="nav prev" data-lb="prev" aria-label="prev">‹</button><button class="nav next" data-lb="next" aria-label="next">›</button>` : ''}</div>
<div class="capbox">${ed ? `<input id="lbcap" value="${esc(m.caption || '')}" placeholder="${L('คำอธิบายรูป', 'Caption')}" maxlength="500">` : m.caption ? `<p>${esc(m.caption)}</p>` : ''}</div>`;
  lb.hidden = false;
}
function lbAct(k, btn) {
  const s = lbState; if (!s) return;
  const m = s.list[s.i];
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
  enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { caption: inp.value }, local: { coll: 'media', id: m.id, row: { caption: inp.value } } });
}

/* ---------- sheet ---------- */
function openSheet(html) { $('#scrim').hidden = false; const s = $('#sheet'); s.innerHTML = html; s.hidden = false; const f = s.querySelector('input'); if (f) f.focus(); }
function closeSheet() { $('#scrim').hidden = true; $('#sheet').hidden = true; $('#sheet').innerHTML = ''; }
const sheetOpen = () => !$('#sheet').hidden || !$('#lb').hidden;
function newTripSheet() {
  return `<h3>${L('เล่มใหม่', 'New book')}</h3><form id="ntf">
<label class="label">${L('ชื่อทริป', 'Trip name')}</label><input name="title" class="field" required maxlength="80" placeholder="${L('เช่น เชียงใหม่หน้าหนาว', 'e.g. Chiang Mai in winter')}">
<label class="label">${L('ชื่อภาษาอังกฤษ (ไม่บังคับ)', 'English name (optional)')}</label><input name="title_en" class="field" maxlength="80">
<div class="row" style="margin-top:8px"><label class="label" style="flex:1">${L('วันแรก', 'From')}<input name="from" type="date" class="field" required></label><label class="label" style="flex:1">${L('วันสุดท้าย', 'To')}<input name="to" type="date" class="field" required></label></div>
<div class="row" style="margin-top:8px"><label class="label" style="flex:1">${L('รหัสเล่ม (ไม่บังคับ)', 'Book id (optional)')}<input name="slug" class="field" maxlength="40" placeholder="chiang-mai-2027"></label><label class="label">${L('สีปก', 'Colour')}<input name="accent" type="color" value="#1F3A5F" class="field" style="height:44px;width:70px;padding:4px"></label></div>
<div class="err" id="nterr" style="color:var(--accent2);min-height:20px;margin-top:6px"></div>
<div class="row end"><button type="button" class="btn ghost" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="createtrip">${L('สร้างเล่ม', 'Create')}</button></div></form>`;
}

/* ---------- events ---------- */
document.addEventListener('click', (e) => {
  const lb = e.target.closest('[data-lb]'); if (lb) { lbAct(lb.dataset.lb, lb); return; }
  const b = e.target.closest('[data-a]');
  if (b && A[b.dataset.a]) { if (b.tagName === 'A' || b.type === 'submit') e.preventDefault(); A[b.dataset.a](b, e); return; }
  if (e.target.id === 'scrim') closeSheet();
});
document.addEventListener('input', (e) => { const el = e.target; if (el.dataset && el.dataset.draft) drafts[el.dataset.draft] = el.value; });
document.addEventListener('focusout', (e) => { const el = e.target; if (el.dataset && el.dataset.aBlur) saveBlur(el); if (el.id === 'lbcap') saveCaption(el); });
document.addEventListener('change', (e) => {
  if (e.target.id === 'fpick') { const el = e.target; addPhotos(trip(el.dataset.t), +el.dataset.d, el.files); el.value = ''; }
});
document.addEventListener('keydown', (e) => {
  if (lbState) { if (e.key === 'Escape') lbAct('close'); if (e.key === 'ArrowRight') lbAct('next'); if (e.key === 'ArrowLeft') lbAct('prev'); return; }
  if (e.key === 'Escape') closeSheet();
});
let sx = null;
document.addEventListener('touchstart', (e) => { if (lbState && e.target.closest('.stage')) sx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => { if (sx === null || !lbState) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) lbAct(dx < 0 ? 'next' : 'prev'); });
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'ntf') { e.preventDefault(); A.createtrip(null, e); return; }
  if (e.target.id !== 'lf') return;
  e.preventDefault();
  const name = $('#lname').value.trim(); ls('name', name);
  const r = await fetch('/api/login', { method: 'POST', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: $('#lcode').value, name }) });
  if (r.ok) { await load(); render(); flush(); return; }
  $('#lcode').value = '';
  $('#lerr').textContent = r.status === 429 ? L('ใส่ผิดหลายครั้งเกินไป รอ 10 นาทีแล้วลองใหม่', 'Too many wrong tries — wait 10 minutes') : L('PIN ไม่ถูกต้อง', 'Wrong PIN');
});

/* ---------- boot ---------- */
async function refresh() {
  if (document.hidden || sheetOpen() || flushing || queue.length) return;
  const before = JSON.stringify([S && S.entries.length, S && S.media.length, S && S.places.length]);
  if ((await load()) === 'ok' && JSON.stringify([S.entries.length, S.media.length, S.places.length]) !== before) safeRender();
}
(async function boot() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  queue = await idb.all();
  seq = Math.max(seq, ...queue.map((o) => o.seq || 0));
  await load();
  render();
  window.addEventListener('hashchange', () => { closeSheet(); lbState = null; drawLb(); render(); window.scrollTo(0, 0); });
  window.addEventListener('online', () => { offline = false; flush(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { flush(); refresh(); } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
  setInterval(() => { if (queue.length) flush(); else refresh(); }, 30000);
  if (S) flush();
})();
