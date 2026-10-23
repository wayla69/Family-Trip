'use strict';
/* ===== Memory Bookshelf · core: state, api, offline queue, helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// one line-icon set for the grown-ups' pages (kid mode keeps its emoji): 24-unit grid, 1.75 stroke, drawn in currentColor
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  today: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h3v3H8z"/>',
  log: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
  eat: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 21V3c-2 1-3.5 4-3.5 7.5V13H17"/>',
  kid: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
  book: '<path d="M5 18V5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2 2 2 0 0 0 2 2h12"/><path d="M9 7h6"/>',
  plan: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  stays: '<path d="M3 19V6M3 15h18v4M21 15v-2.5A3.5 3.5 0 0 0 17.5 9H11v6"/><circle cx="7" cy="12" r="2"/>',
  sos: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
  prep: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 12h16"/>',
  learn: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  firsts: '<path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6l-5.3 2.9 1.1-6-4.4-4.2 6-.8z"/>',
  hearts: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  offline: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  shelf: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16 5.2l3.4-.9 2.6 15.5-3.4.9z"/>',
  passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
  notebook: '<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z"/><path d="M6 3v18M10 8h5M10 12h5"/>',
  pin: '<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  car: '<path d="M4 17v-5l2.2-5.2A1.5 1.5 0 0 1 7.6 6h8.8a1.5 1.5 0 0 1 1.4.8L20 12v5z"/><path d="M4 12h16M7 17v2M17 17v2M7.5 14.5h.01M16.5 14.5h.01"/>',
  money: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9v.01M17.5 15v.01"/>',
  weather: '<path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.6 4.2 4.2 0 0 0 7 18z"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16"/>',
  shuffle: '<path d="M4 7h3c4 0 6 10 10 10h3M4 17h3c1.4 0 2.6-1.2 3.6-2.8M13.4 9.8C14.4 8.2 15.6 7 17 7h3"/><path d="M18 4l3 3-3 3M18 14l3 3-3 3"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  star: '<path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6l-5.3 2.9 1.1-6-4.4-4.2 6-.8z"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  ext: '<path d="M7 17L17 7M9 7h8v8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
};
const ic = (k, cls) => `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k] || ''}</svg>`;
function ls(k, v) {
  try {
    if (v === undefined) return JSON.parse(localStorage.getItem('mbs_' + k));
    localStorage.setItem('mbs_' + k, JSON.stringify(v));
  } catch (_) {}
  return null;
}
document.documentElement.dataset.fs = String(ls('fs') || 0);   // reading size 0–3, set from the top bar (app.css zooms the page content)
let lang = ls('lang') || ((navigator.language || '').startsWith('en') ? 'en' : 'th');
const L = (th, en) => (lang === 'th' ? th : en);
const T = (o) => (o == null ? '' : typeof o === 'string' ? o : o[lang] || o.en || o.th || '');
const uid = (p) => p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

let S = null;          // server state (+ optimistic local changes)
let offline = false;
let queue = [];        // pending writes, persisted in IndexedDB

/* ---------- IndexedDB (falls back to memory) ---------- */
const idb = {
  _p: null,
  open() {
    if (!this._p) {
      this._p = new Promise((res, rej) => {
        if (!window.indexedDB) return rej(new Error('no idb'));
        const r = indexedDB.open('mbs', 2);
        r.onupgradeneeded = () => {   // v1: the write queue · v2: + 'kv' (the last server state — localStorage is too small once a trip has many photos)
          const d = r.result;
          if (!d.objectStoreNames.contains('q')) d.createObjectStore('q', { keyPath: 'qid' });
          if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv');
        };
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
    }
    return this._p;
  },
  async all() { try { const d = await this.open(); return await new Promise((res, rej) => { const q = d.transaction('q').objectStore('q').getAll(); q.onsuccess = () => res(q.result.sort((a, b) => a.seq - b.seq)); q.onerror = () => rej(q.error); }); } catch (_) { return []; } },
  async put(v) { try { const d = await this.open(); await new Promise((res, rej) => { const t = d.transaction('q', 'readwrite'); t.objectStore('q').put(v); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch (_) {} },
  async del(qid) { try { const d = await this.open(); await new Promise((res, rej) => { const t = d.transaction('q', 'readwrite'); t.objectStore('q').delete(qid); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch (_) {} },
  async get(k) { try { const d = await this.open(); return await new Promise((res, rej) => { const q = d.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); } catch (_) { return undefined; } },
  async set(k, v) { try { const d = await this.open(); await new Promise((res, rej) => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch (_) {} },
};

/* ---------- api ---------- */
async function api(method, url, body, blob) {
  const opt = { method, headers: { 'x-mb': '1' }, credentials: 'same-origin' };
  if (blob) { opt.body = blob; opt.headers['content-type'] = blob.type || 'image/jpeg'; }
  else if (body !== undefined) { opt.body = JSON.stringify(body); opt.headers['content-type'] = 'application/json'; }
  const r = await fetch(url, opt);
  if (r.status === 401) { S = null; render(); throw Object.assign(new Error('auth'), { code: 401 }); }
  if (!r.ok) throw Object.assign(new Error('http ' + r.status), { code: r.status });
  return r.json();
}
// a write that lands while the state is being fetched would be lost: the older answer would replace it locally and the next
// tap would send a row without it (a review lost Mimi's 😍 this way) — so a fetch that overlapped a finished write is redone
let written = 0;
// the state comes without each book's guide text (?lite=1, ~20 KB instead of ~370 KB): a book whose seed hash is unchanged
// keeps the text the phone already has, a new one is fetched once from /api/b/seed (cached for good under its hash)
async function withSeeds(fresh, old) {
  for (const t of fresh.trips) {
    if (!t.seed) continue;
    const o = old && (old.trips || []).find((x) => x.id === t.id && x.seed === t.seed && x.info !== undefined);
    let g = o && { info: o.info, passport: o.passport, plans: o.days.map((d) => d.plan) };
    if (!g) {
      const r = await fetch(`/api/b/seed/${encodeURIComponent(t.id)}/${t.seed}`, { credentials: 'same-origin' });
      if (!r.ok) throw Object.assign(new Error('seed ' + r.status), { code: r.status });
      g = await r.json();
    }
    t.info = g.info; t.passport = g.passport; t.days.forEach((d, i) => { d.plan = g.plans[i] === undefined ? null : g.plans[i]; });
  }
}
// 'ok' new data · 'same' the server answered 304 (nothing changed since this phone's copy) · 'cached' offline copy · 'auth' · 'fail'
async function load(tries = 0) {
  try {
    const w0 = written, prev = S;
    const r = await fetch('/api/b/state?lite=1', { credentials: 'same-origin', cache: 'no-store', headers: prev && prev.etag ? { 'If-None-Match': prev.etag } : {} });
    if (r.status === 401) { S = null; return 'auth'; }
    if (r.status === 304 && prev) { offline = false; prev.syncedAt = Date.now(); return 'same'; }
    if (!r.ok) throw new Error('http ' + r.status);
    const fresh = await r.json();
    fresh.etag = r.headers.get('ETag');
    try { await withSeeds(fresh, prev || (await idb.get('state'))); } catch (e) { if (e.code === 409 && tries < 5) return load(tries + 1); throw e; }
    if (written !== w0 && tries < 5) return load(tries + 1);
    S = fresh; offline = false; S.syncedAt = Date.now();
    idb.set('state', structuredClone(S)); ls('state', null);   // the offline copy lives in IndexedDB, as the server sent it (before pending writes are laid on top)
  } catch (_) {
    const c = (await idb.get('state')) || ls('state');
    if (!c) return 'fail';
    S = c; offline = true;
  }
  overlay();
  return offline ? 'cached' : 'ok';
}
// a copy of the state, ready to draw: lists a copy cached before they existed, and the pending writes laid on top
function overlay() { S.hearts = S.hearts || []; S.reviews = S.reviews || []; queue.forEach(applyLocal); }
const isEditor = () => !!(S && S.me.role === 'editor');

/* ---------- offline queue: every write goes through here ----------
   op: {qid, seq, method, url, body?, blob?, local} — `local` describes the optimistic change so it can be re-applied after reload */
let seq = Date.now();
let flushing = false;
async function enqueue(op) {
  op.qid = op.qid || uid('q'); op.seq = ++seq;
  queue.push(op); applyLocal(op);
  // re-render right after this event (so focus has landed if they tapped into another box), never over a field
  // someone is typing in — a late render would swap the box under their fingers and lose the text
  setTimeout(safeRender, 0);
  await idb.put(op);
  flush();
}
function applyLocal(op) {
  const l = op.local; if (!l || !S) return;
  const list = S[l.coll];
  const i = list.findIndex((x) => x.id === l.id);
  if (l.del) { if (i >= 0) list.splice(i, 1); return; }
  const row = { ...(i >= 0 ? list[i] : {}), ...l.row, id: l.id, pending: true };
  if (op.blob && !row.local) row.local = URL.createObjectURL(op.blob);
  if (i >= 0) list[i] = row; else list.push(row);
}
let progress = null;   // {done, total} while photos upload
async function flush() {
  if (flushing || !queue.length || !S) return;
  flushing = true;
  const photos = queue.filter((o) => o.blob).length;
  if (photos) progress = { done: 0, total: photos };
  try {
    while (queue.length) {
      const op = queue[0];
      try {
        await api(op.method, op.url, op.body, op.blob);
      } catch (e) {
        if (e.code === 401) break;
        if (e.code === 429 && op.limit) toast(L('วันนี้ส่งหัวใจครบแล้ว พรุ่งนี้ส่งใหม่ได้นะ', 'That’s all the hearts for today — send more tomorrow'));   // a daily cap: retrying won't help
        else if (!e.code || e.code === 408 || e.code === 429 || e.code >= 500) {   // offline / server busy: keep it, try later
          offline = !e.code; if (e.code === 429) toast(L('อัปโหลดถี่เกินไป จะลองใหม่อีกครั้ง', 'Too many uploads — will retry'));
          break;
        }
        // 4xx: drop this one, keep the rest
        else if (e.code === 413) toast(L('รูปใหญ่เกินไป (เกิน 40 MB) — ข้ามรูปนี้', 'Photo too large (over 40 MB) — skipped'));
        else if (e.code === 415) toast(L('ไฟล์นี้ไม่ใช่รูปที่อ่านได้ — ข้ามรูปนี้', 'Not a readable photo — skipped'));
        else toast(L('บันทึกไม่สำเร็จ 1 รายการ', 'One change could not be saved') + ` (${e.code})`);
      }
      queue.shift(); written++; await idb.del(op.qid);
      if (op.blob && progress) progress.done++;
      renderProgress();
    }
  } finally {
    flushing = false;
    if (!queue.some((o) => o.blob)) progress = null;
    renderProgress();
    if (!queue.length) { await load(); safeRender(); }
  }
}

/* ---------- derived data ---------- */
const trips = () => (S ? S.trips : []);
const trip = (id) => trips().find((t) => t.id === id);
const children = () => (S ? S.children : []);
const kidName = (slug) => { if (slug === 'both') return L('ทั้งคู่', 'Both'); const k = children().find((c) => c.slug === slug); return k ? (lang === 'th' ? k.name_th : k.name_en) : ''; };
const kidEmoji = (slug) => (slug === 'both' ? '👧👶' : (children().find((c) => c.slug === slug) || {}).emoji || '');
const entriesOf = (tid, day) => S.entries.filter((e) => e.trip === tid && (day === undefined || e.day === day));
const mediaOf = (tid, day) => S.media.filter((m) => m.trip === tid && (day === undefined || m.day === day)).sort((a, b) => a.at - b.at);
const placesOf = (tid, day) => S.places.filter((p) => p.trip === tid && (day === undefined || p.day === day));
const imgT = (m) => m.local || `/media/${encodeURIComponent(m.id)}/t`;
const imgF = (m) => m.local || `/media/${encodeURIComponent(m.id)}`;
const LOC = () => (lang === 'th' ? 'th-TH' : 'en-GB');
function fmtDay(iso, opt) { return new Date(iso + 'T00:00:00').toLocaleDateString(LOC(), opt || { weekday: 'short', day: 'numeric', month: 'short' }); }
function fmtRange(t) {
  const a = new Date(t.date_from + 'T00:00:00'), b = new Date(t.date_to + 'T00:00:00');
  const y = b.toLocaleDateString(LOC(), { year: 'numeric' });
  return `${a.toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })} – ${b.toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })} ${y}`;
}
function fmtTime(ms, tz) { try { return new Date(ms).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }); } catch (_) { return new Date(ms).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); } }
// today's date in the trip's own time zone → day index or -1
function todayIn(tz) { try { return new Date().toLocaleDateString('en-CA', { timeZone: tz }); } catch (_) { return new Date().toISOString().slice(0, 10); } }
function dayNow(t) { const i = t.days.findIndex((d) => d.date === todayIn(t.timezone)); return i; }
// stamp: every day Done, or the trip is over
const tripOver = (t) => todayIn(t.timezone) > t.date_to;
const stampEarned = (t) => tripOver(t) || (t.days.length > 0 && t.days.every((d) => d.done_at));
function stats(t) {
  const es = entriesOf(t.id);
  return {
    photos: mediaOf(t.id).length,
    quotes: es.filter((e) => e.kind === 'quote').length,
    firsts: es.filter((e) => e.kind === 'first').length,
    places: placesOf(t.id).length,
  };
}
// illustrated stamp per day (theme.art = "/art/hk/day-{n}.svg"); app-made trips have none and use the day emoji
const dayArt = (t, i) => (t.theme && t.theme.art ? t.theme.art.replace('{n}', i + 1) : '');
// passport: a day's stamp is inked once the day is Done or has anything recorded in it
const dayStamped = (t, i) => !!t.days[i].done_at || !!dayHasContent(t, i);
const daysUntil = (t) => Math.round((Date.parse(t.date_from + 'T00:00:00Z') - Date.parse(todayIn(t.timezone) + 'T00:00:00Z')) / 864e5);
const dayHasContent = (t, i) =>entriesOf(t.id, i).some((e) => e.kind !== 'mood' || e.mood) || mediaOf(t.id, i).length || placesOf(t.id, i).length;
function themeStyle(t) {
  const th = (t && t.theme) || {};
  const keys = { accent: '--accent', accent2: '--accent2', ink: '--ink', muted: '--muted', panel: '--panel', rule: '--rule', pick: '--pick', info: '--info', calm: '--calm', warn: '--warn' };
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  return Object.entries(keys).filter(([k]) => th[k] && !(dark && ['ink', 'muted', 'panel', 'rule', 'pick', 'info', 'calm', 'warn'].includes(k)))
    .map(([k, v]) => `${v}:${k === 'accent' && dark && th.accentDark ? th.accentDark : th[k]}`).join(';');
}
const firstLabel = (t, key) => { const f = t.firsts.find((x) => x.key === key); return f ? { e: f.emoji, t: T(f.label) } : { e: '⭐', t: key }; };

// a photo that is not on this phone yet (offline): fall back to its thumbnail, then to a placeholder
document.addEventListener('error', (e) => {
  const img = e.target; if (!img || img.tagName !== 'IMG' || !/^\/media\//.test(img.getAttribute('src') || '')) return;
  if (!img.src.endsWith('/t')) img.src = img.getAttribute('src') + '/t';
  else { img.classList.add('nophoto'); img.removeAttribute('src'); img.alt = L('รูปนี้ยังไม่ได้เก็บไว้ในเครื่อง', 'Not stored on this phone yet'); }
}, true);

/* ---------- offline pack: fetch a book's photos + art once so the whole book opens without signal ---------- */
const offlineUrls = (t) => {
  const urls = new Set(['/', '/app.css', '/core.js', '/views.js', '/sheets.js', '/kid.js']);
  t.days.forEach((_, i) => { if (dayArt(t, i)) urls.add(dayArt(t, i)); const c = (t.passport || {}).colour; if (c) urls.add(c.replace('{n}', i + 1)); });
  ((t.passport || {}).guides || []).forEach((g) => g.art && urls.add(g.art));
  if ((t.passport || {}).style && t.passport.style.crest) urls.add(t.passport.style.crest);
  KID_ART.forEach((k) => { urls.add(kidArt(k)); urls.add(kidArt(k, true)); urls.add(kidArt(k, false, t)); urls.add(kidArt(k, true, t)); });
  mediaOf(t.id).forEach((m) => { if (!m.local) { urls.add(`/media/${encodeURIComponent(m.id)}/t`); if (m.highlight || isDrawingId(m.id)) urls.add(`/media/${encodeURIComponent(m.id)}`); } });
  return [...urls];
};
const isDrawingId = (id) => /^dr-/.test(id);
let packing = null;   // {done, total} while a book is being stored
async function packOffline(t, all) {
  if (packing) return;
  let urls = offlineUrls(t);
  if (all) urls = urls.concat(mediaOf(t.id).filter((m) => !m.local).map((m) => `/media/${encodeURIComponent(m.id)}`));
  urls = [...new Set(urls)];
  packing = { done: 0, total: urls.length }; let failed = 0;
  renderProgress();
  const worker = async () => { for (;;) { const u = urls.shift(); if (!u) return; try { const r = await fetch(u, { credentials: 'same-origin' }); if (!r.ok) failed++; } catch (_) { failed++; } packing.done++; renderProgress(); } };
  await Promise.all([worker(), worker(), worker()]);
  packing = null; renderProgress();
  if (failed) toast(L(`เก็บไม่ครบ ${failed} ไฟล์ ลองอีกครั้งเมื่อสัญญาณดี`, `${failed} files could not be stored — try again with better signal`));
  else { ls('offline_' + t.id, { at: Date.now(), n: mediaOf(t.id).length, all: !!all }); toast(L('เก็บเล่มนี้ไว้ในเครื่องแล้ว เปิดได้แม้ไม่มีเน็ต', 'This book is stored on the phone — it opens without signal')); safeRender(); }
}

/* ---------- ui helpers ---------- */
let toastT = 0;
// reminders (Web Push): this phone subscribes once; the server sends "08:00 · in 30 min" before each timed step of the day
const pushOk = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
const pushSub = async () => (pushOk() ? (await navigator.serviceWorker.ready).pushManager.getSubscription() : null);
const b64u = (s) => { const b = atob((s + '='.repeat((4 - s.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, (c) => c.charCodeAt(0)); };
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2800); }
// a little burst of sparkles from a button that was just tapped (ticks, moods, check-ins)
function burst(el, chars) {
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect(), cs = chars || ['✨', '⭐', '💫'];
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('span'), a = (i / 8) * Math.PI * 2;
    s.className = 'spark'; s.textContent = cs[i % cs.length];
    s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--dx:${Math.cos(a) * 46}px;--dy:${Math.sin(a) * 46}px`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 750);
  }
}
// the kids as drawn characters (public/art/kids, drawn from photos the owner shared — the photos themselves are not in the repo)
const KID_ART = ['mimi', 'mika'];
// the kids dress for the trip: a book's theme.outfit (e.g. "adventure" for Australia) picks /art/kids/<kid>-<outfit>[-full].svg;
// artTrip is the book on screen (set by render), so every drawing of the kids on that page wears the same clothes
const KID_OUTFITS = ['adventure'];
let artTrip = null;
const kidArt = (slug, full, t) => { if (!KID_ART.includes(slug)) return ''; const o = (((t || artTrip) || {}).theme || {}).outfit; return `/art/kids/${slug}${KID_OUTFITS.includes(o) ? '-' + o : ''}${full ? '-full' : ''}.svg`; };
const kidFace = (slug) => (slug === 'both' ? KID_ART.map((k) => `<img class="face" src="${kidArt(k)}" alt="">`).join('')
  : kidArt(slug) ? `<img class="face" src="${kidArt(slug)}" alt="">` : esc(kidEmoji(slug)));
function kidBadge(slug, off) {
  const art = slug === 'both' ? `<img src="${kidArt('mimi')}" alt=""><img src="${kidArt('mika')}" alt="">` : kidArt(slug) ? `<img src="${kidArt(slug)}" alt="">` : kidEmoji(slug);
  return `<span class="kid ${esc(slug)}${off ? ' off' : ''}${kidArt(slug) || slug === 'both' ? ' drawn' : ''}" title="${esc(kidName(slug))}">${art}</span>`;
}
// two taps to delete (no confirm()): first tap arms for 3 s
function armed(btn) {
  if (btn.dataset.armed) return true;
  btn.dataset.armed = '1'; const old = btn.textContent; btn.textContent = L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete');
  setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = old; } }, 3000);
  return false;
}

/* ---------- router ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [p, q] = h.split('?');
  return { parts: p.split('/').filter(Boolean).map(decodeURIComponent), q: new URLSearchParams(q || '') };
}
function nav(hash) { if (location.hash === hash) render(); else location.hash = hash; }
// never wipe what someone is typing: re-render only when no field has focus
function safeRender() { if (typeof storyCtl !== 'undefined' && storyCtl) return;   // a story is streaming into the page
  if (typeof drawBusy === 'function' && drawBusy()) return;   // a finger is drawing on the canvas
  const a = document.activeElement; if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && a.closest('#app')) return; render(); }
