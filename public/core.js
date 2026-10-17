'use strict';
/* ===== Memory Book · core: state, api, offline queue, helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function ls(k, v) {
  try {
    if (v === undefined) return JSON.parse(localStorage.getItem('mb_' + k));
    localStorage.setItem('mb_' + k, JSON.stringify(v));
  } catch (_) {}
  return null;
}
let lang = ls('lang') || ((navigator.language || '').startsWith('th') ? 'th' : 'en');
const L = (th, en) => (lang === 'th' ? th : en);
const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const MOODS = ['😍', '🤩', '😋', '😂', '😴', '🥱', '😭', '🥶'];

let S = null;            // server state
let offline = false;
let queue = [];          // pending captures (IndexedDB)
let kf = '';             // kid filter
let showAllDays = false;

/* ---------- IndexedDB queue (falls back to memory) ---------- */
const idb = {
  _p: null,
  open() {
    if (!this._p) {
      this._p = new Promise((res, rej) => {
        if (!window.indexedDB) return rej(new Error('no idb'));
        const r = indexedDB.open('mb', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('q', { keyPath: 'id' });
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
    }
    return this._p;
  },
  async all() { try { const d = await this.open(); return await new Promise((res, rej) => { const q = d.transaction('q').objectStore('q').getAll(); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); } catch (_) { return []; } },
  async put(v) { try { const d = await this.open(); await new Promise((res, rej) => { const t = d.transaction('q', 'readwrite'); t.objectStore('q').put(v); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch (_) {} },
  async del(id) { try { const d = await this.open(); await new Promise((res, rej) => { const t = d.transaction('q', 'readwrite'); t.objectStore('q').delete(id); t.oncomplete = res; t.onerror = () => rej(t.error); }); } catch (_) {} },
};
const persistable = (it) => ({ id: it.id, mem: it.mem, checkin: it.checkin, at: it.at, photos: it.photos.map((p) => ({ id: p.id, blob: p.blob, done: !!p.done })) });
function hydrate(it) { it.photos.forEach((p) => { if (!p.url) p.url = URL.createObjectURL(p.blob); }); return it; }

/* ---------- api ---------- */
async function api(method, url, body, raw) {
  const opt = { method, headers: { 'x-mb': '1' }, credentials: 'same-origin' };
  if (raw) { opt.body = raw; opt.headers['content-type'] = raw.type || 'image/jpeg'; }
  else if (body !== undefined) { opt.body = JSON.stringify(body); opt.headers['content-type'] = 'application/json'; }
  const r = await fetch(url, opt);
  if (r.status === 401) { S = null; render(); const e = new Error('auth'); e.code = 401; throw e; }
  if (!r.ok) { const e = new Error('http ' + r.status); e.code = r.status; throw e; }
  return r.json();
}
async function load() {
  try {
    const r = await fetch('/api/state', { credentials: 'same-origin', cache: 'no-store' });
    if (r.status === 401) { S = null; return 'auth'; }
    S = await r.json(); offline = false; ls('state', S); return 'ok';
  } catch (_) {
    const c = ls('state');
    if (c) { S = c; offline = true; return 'cached'; }
    return 'fail';
  }
}
const isEditor = () => !!(S && S.me.role === 'editor');

/* ---------- derived data ---------- */
const kids = () => (S ? S.kids : []);
const kid = (id) => kids().find((k) => k.id === id);
const kn = (k) => (k ? k[lang] : '');
const trips = () => (S ? S.trips : []);
const trip = (id) => trips().find((t) => t.id === id);
const tt = (t) => (t ? (t.title[lang] || t.title.en) : '');
const dayOf = (t, n) => t && t.days.find((d) => d.n === n);
const dtitle = (d) => (d ? (d.title[lang] || d.title.en) : '');
const hasArt = (t) => t && !t.custom && t.art !== false;
function artSrc(t, d) { return hasArt(t) ? `/art/day-${d.n}.svg` : ''; }
function todayStr() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function tripDayNow(t) {
  const s = new Date(t.start + 'T00:00:00'), n = new Date(); n.setHours(0, 0, 0, 0);
  const i = Math.round((n - s) / 864e5) + 1;
  return i >= 1 && i <= t.days.length ? i : 0;
}
function curTrip() {
  const ts = trips(); if (!ts.length) return null;
  const live = ts.find((t) => tripDayNow(t)); if (live) return live;
  const today = todayStr();
  const past = ts.filter((t) => t.start <= today).sort((a, b) => b.start.localeCompare(a.start))[0];
  return past || ts.slice().sort((a, b) => a.start.localeCompare(b.start))[0];
}
function allMems() {
  const pend = queue.map((it) => ({
    id: it.id, trip: it.mem.trip, day: it.mem.day, kids: it.mem.kids, mood: it.mem.mood, text: it.mem.text, stop: it.mem.stop, at: it.mem.at,
    by: S.me.name, mine: true, pending: true, photos: it.photos.map((p) => ({ id: p.id, local: p.url })),
  }));
  const ids = new Set(pend.map((m) => m.id));
  return S.memories.filter((m) => !ids.has(m.id)).concat(pend);
}
const memsOf = (tripId) => allMems().filter((m) => m.trip === tripId);
const forKid = (m, k) => !k || m.kids.includes(k) || !m.kids.length;
const pSrc = (p) => p.local || '/img/' + p.id + '/t';
const pFull = (p) => p.local || '/img/' + p.id;
function stopName(tripId, key, fallback) {
  const t = trip(tripId);
  if (t) for (const d of t.days) { const s = d.stops.find((x) => x.key === key); if (s) return s[lang] || s.en; }
  return fallback || key;
}
const checkin = (tripId, key) => S.checkins.find((c) => c.trip === tripId && c.key === key);
function fmtDate(ts) { return new Date(ts).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }
function fmtTime(ts) { return new Date(ts).toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-AU', { hour: '2-digit', minute: '2-digit' }); }
function tripDates(t) {
  const f = (s) => new Date(s + 'T00:00:00').toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  return f(t.start) + ' – ' + f(t.end);
}
function ageText(birth, atDate) {
  if (!birth) return '';
  const b = new Date(birth.length === 7 ? birth + '-01' : birth), a = atDate ? new Date(atDate) : new Date();
  let m = (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth());
  if (m < 0) return '';
  const y = Math.floor(m / 12); m = m % 12;
  return lang === 'th' ? (y ? y + ' ปี ' : '') + (m || !y ? m + ' เดือน' : '') : (y ? y + ' y ' : '') + (m || !y ? m + ' m' : '');
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

/* ---------- stats / achievements ---------- */
function kidStats(kidId) {
  const ms = allMems().filter((m) => m.kids.includes(kidId));
  const stampsAll = S.checkins;
  const tripsWith = new Set(stampsAll.map((c) => c.trip));
  const daysWith = new Set(allMems().filter((m) => m.kids.includes(kidId)).map((m) => m.trip + ':' + m.day));
  return {
    stamps: stampsAll.length, food: stampsAll.filter((c) => c.kind === 'food').length, places: stampsAll.filter((c) => c.kind === 'place').length,
    photos: ms.reduce((a, m) => a + m.photos.length, 0), quotes: ms.filter((m) => m.text.trim()).length, days: daysWith.size, trips: tripsWith.size,
  };
}
function medals(kidId) {
  const s = kidStats(kidId);
  return [
    { e: '🌱', th: 'ก้าวแรก', en: 'First step', v: s.stamps, g: 1 },
    { e: '🧭', th: 'นักสำรวจ', en: 'Explorer', v: s.stamps, g: 10 },
    { e: '🗺️', th: 'นักผจญภัย', en: 'Adventurer', v: s.stamps, g: 30 },
    { e: '🍽️', th: 'นักชิมตัวน้อย', en: 'Little foodie', v: s.food, g: 8 },
    { e: '📸', th: 'ช่างภาพ', en: 'Photographer', v: s.photos, g: 20 },
    { e: '💬', th: 'คำพูดทองคำ', en: 'Golden words', v: s.quotes, g: 10 },
    { e: '🌙', th: 'เก็บทุกวัน', en: 'Every day counts', v: s.days, g: 7 },
    { e: '🎒', th: 'นักเดินทางข้ามทริป', en: 'Trip after trip', v: s.trips, g: 2 },
  ];
}

/* ---------- ui helpers ---------- */
let toastT = 0;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT);
  toastT = setTimeout(() => { t.hidden = true; }, 2800);
}
function kavHtml(k, size) { return `<span class="kav ${size || ''}" style="--c:${esc(k.color)}">${k.emoji}</span>`; }

/* ---------- router ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, q] = h.split('?');
  return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), q: new URLSearchParams(q || '') };
}
function nav(hash) { if (location.hash === hash) render(); else location.hash = hash; }
