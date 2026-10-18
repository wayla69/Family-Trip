'use strict';
/* ===== Memory Bookshelf · core: state, api, offline queue, helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function ls(k, v) {
  try {
    if (v === undefined) return JSON.parse(localStorage.getItem('mbs_' + k));
    localStorage.setItem('mbs_' + k, JSON.stringify(v));
  } catch (_) {}
  return null;
}
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
async function load() {
  try {
    const r = await fetch('/api/b/state', { credentials: 'same-origin', cache: 'no-store' });
    if (r.status === 401) { S = null; return 'auth'; }
    if (!r.ok) throw new Error('http ' + r.status);
    S = await r.json(); offline = false; S.syncedAt = Date.now();
    idb.set('state', S); ls('state', null);   // the offline copy lives in IndexedDB (an old localStorage copy is dropped)
  } catch (_) {
    const c = (await idb.get('state')) || ls('state');
    if (!c) return 'fail';
    S = c; offline = true;
  }
  S.hearts = S.hearts || []; S.reviews = S.reviews || [];   // a copy cached before these existed
  queue.forEach(applyLocal);   // pending writes stay visible on top of server data
  return offline ? 'cached' : 'ok';
}
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
      queue.shift(); await idb.del(op.qid);
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
  KID_ART.forEach((k) => { urls.add(kidArt(k)); urls.add(kidArt(k, true)); });
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
const kidArt = (slug, full) => (KID_ART.includes(slug) ? `/art/kids/${slug}${full ? '-full' : ''}.svg` : '');
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
