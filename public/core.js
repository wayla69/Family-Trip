'use strict';
/* ===== Memory Bookshelf · core: state, api, offline queue, helpers ===== */
// an older iPad/iPhone (Safari before 16.2: iPadOS 15 on an iPad mini 4 / Air 2) drops every colour written with color-mix() — swap in
// the copy the server makes with those colours resolved, before the first render
try { if (window.CSS && CSS.supports && !CSS.supports('color', 'color-mix(in srgb, red 50%, blue)')) { const l = document.querySelector('link[href="/app.css"]'); if (l) l.href = '/app-legacy.css'; } } catch (_) { /* keep app.css */ }
// what went wrong on this phone (owner, Nov 2026: "รู้เมื่อมีอะไรพังบนมือถือ"): a script error of our own files goes to our server
// (server/errors.js) — the message, which file and line, the app version, the kind of page and of phone. Never the book, a child's
// name, a text, a position, the address or a cookie. At most five a visit, each once; nothing while signed out or with no signal.
const errSeen = new Set();
function errDevice() {
  const u = navigator.userAgent || '', ipad = /iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1);
  const os = ipad ? 'ipad' : /iPhone|iPod/.test(u) ? 'iphone' : /Android/.test(u) ? 'android' : /Mac OS X/.test(u) ? 'mac' : /Windows/.test(u) ? 'windows' : /Linux/.test(u) ? 'linux' : 'other';
  const b = /SamsungBrowser\/(\d+)/.exec(u) || /Edg\/(\d+)/.exec(u) || /Firefox\/(\d+)/.exec(u) || /(?:Chrome|CriOS)\/(\d+)/.exec(u) || /Version\/(\d+)[\d.]* .*Safari/.exec(u);
  const name = !b ? 'other' : /Samsung/.test(b[0]) ? 'samsung' : /Edg/.test(b[0]) ? 'edge' : /Firefox/.test(b[0]) ? 'firefox' : /Chrome|CriOS/.test(b[0]) ? 'chrome' : 'safari';
  const app = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
  return `${os} ${name} ${b ? Math.min(999, +b[1]) : 0}${app ? ' app' : ''}`;
}
// the message keeps its shape, not its data — the same masks as the server's (server/errors.js scrub), done here so nothing leaves the phone
function errScrub(m) {
  return String(m || '').slice(0, 600).replace(/[^\x20-\x7E\u0E00-\u0E7F]/g, ' ')
    .replace(/https?:\/\/[^\s'")]+/g, (u) => { try { return new URL(u).pathname.replace(/\/[^/]*\d[^/]*/g, '/…'); } catch (_) { return '…'; } })
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '…@…').replace(/#\/\S*/g, '#/…')
    .replace(/(["'`])((?:(?!\1).){1,200})\1/g, (x, q, w) => (/^[A-Za-z_$][\w$.]{0,40}$/.test(w) ? x : `${q}…${q}`))
    .replace(/\d{5,}/g, '…').replace(/\s+/g, ' ').trim().slice(0, 300);
}
async function errReport(msg, src, line, col) {
  try {
    msg = errScrub(msg); if (!msg || /ResizeObserver loop|^Script error\.?$/i.test(msg)) return;
    let file = ''; try { const u = new URL(src || '', location.href); if (u.origin !== location.origin) return; file = u.pathname; } catch (_) { if (src) return; }   // a browser add-on's error is not ours
    const key = `${msg}|${file}|${line}`; if (errSeen.has(key) || errSeen.size >= 5 || !navigator.onLine || typeof S === 'undefined' || !S) return;
    errSeen.add(key);
    const p = String(location.hash || '').replace(/^#\/?/, '').split('/');
    const route = /^[a-z]+$/.test(p[0] || '') ? (p[0] === 't' ? 't/' + (/^[a-z]+$/.test(p[2] || '') ? p[2] : 'menu') : p[0] === 'kid' ? 'kid/' + (/^[a-z]+$/.test(p[2] || '') ? p[2] : 'home') : p[0]) : 'shelf';
    let ver = ''; try { ver = ((await caches.keys()).find((k) => /^mbs-v\d+(-[0-9a-f]+)?$/.test(k)) || ''); } catch (_) {}
    fetch('/api/b/err', { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-mb': '1' },
      body: JSON.stringify({ msg, src: file, line: line | 0, col: col | 0, ver, route, device: errDevice() }) }).catch(() => {});
  } catch (_) { /* reporting must never break the page */ }
}
window.addEventListener('error', (e) => { if (e && e.message) errReport(e.message, e.filename, e.lineno, e.colno); });
window.addEventListener('unhandledrejection', (e) => {
  const r = e && e.reason; if (!r || !(r instanceof Error) || r.name === 'AbortError' || /Failed to fetch|NetworkError|Load failed|network/i.test(r.message)) return;   // no signal is not a fault
  const at = /(\/[a-z0-9-]+\.js):(\d+):(\d+)/.exec(String(r.stack || ''));
  errReport(`${r.name}: ${r.message}`, at ? location.origin + at[1] : '', at ? +at[2] : 0, at ? +at[3] : 0);
});
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* Forgiving search (owner, Nov 2026: "มีอะไรที่ flexible แบบนี้ได้อีกไหม อย่าตึงเกินไป"): every search box looks for the words as typed
   first; only when nothing at all is found does it look again forgivingly (fzFind) — accents and spaces never count, and a slip of
   a letter (one from 4 letters typed, two from 7: a change, a missing or extra letter, two letters swapped) still finds the word.
   The planner's "where to" has its own ranking (views.js plFit); the book search, the search of every book, the photos, the
   offline guide answers, the place-to-eat, things-to-do, town and place-sheet boxes use these. */
const fzNorm = (x) => String(x || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const fzCompact = (x) => fzNorm(x).replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const fzSlack = (n) => (n >= 7 ? 2 : n >= 4 ? 1 : 0);
function fzEdit(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let p2 = null, p1 = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let low = i;
    for (let j = 1; j <= b.length; j++) {
      let v = Math.min(p1[j] + 1, cur[j - 1] + 1, p1[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (p2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, p2[j - 2] + 1);
      cur.push(v); if (v < low) low = v;
    }
    if (low > max) return max + 1;
    p2 = p1; p1 = cur;
  }
  return p1[b.length];
}
// the piece of `text` that `w` finds forgivingly ('' = none): the same letters with other spacing or accents, else a word (Thai: a run
// of letters, Thai has no spaces) a slip away. Three letters or fewer must be exact.
function fzFind(text, w) {
  const cw = fzCompact(w); if (cw.length < 3 || !text) return '';
  const nt = fzNorm(text), ct = nt.replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
  if (ct.includes(cw)) return String(w);
  const sl = fzSlack(cw.length); if (!sl) return '';
  if (/[฀-๿一-鿿]/.test(cw)) {
    const tt = ct.slice(0, 4000);
    for (let len = Math.max(3, cw.length - sl); len <= cw.length + sl; len++) {
      for (let i = 0; i + len <= tt.length; i++) {
        if (tt[i] !== cw[0] && tt[i + 1] !== cw[1]) continue;   // a cheap first look before the full count
        const seg = tt.substr(i, len); if (fzEdit(cw, seg, sl) <= sl) return seg;
      }
    }
    return '';
  }
  for (const word of nt.split(/[^a-z0-9]+/)) {
    if (word.length < 3) continue;
    if (fzEdit(cw, word, sl) <= sl) return word;
    if (word.length > cw.length && fzEdit(cw, word.slice(0, cw.length), sl) <= sl) return word.slice(0, cw.length);
  }
  // two words typed as one and a slip ("dimsun" for "dim sum"): the run of letters without spaces, in short texts only
  if (ct.length <= 600) for (let i = 0; i + cw.length - sl <= ct.length; i++) {
    if (ct[i] !== cw[0] && ct[i + 1] !== cw[1]) continue;
    for (let len = Math.max(3, cw.length - sl); len <= cw.length + sl && i + len <= ct.length; len++) if (fzEdit(cw, ct.substr(i, len), sl) <= sl) return ct.substr(i, len);
  }
  return '';
}
// a filter over things shown on the page: the exact matches, or — only when there are none — the forgiving ones. → {ok(i), near}
function fzFilter(texts, q) {
  const k = fzNorm(q).trim(); if (!k) return { ok: () => true, near: false };
  const exact = texts.map((t) => fzNorm(t).includes(k));
  if (exact.some(Boolean)) return { ok: (i) => exact[i], near: false };
  const words = k.split(/\s+/).filter(Boolean), near = texts.map((t) => words.every((w) => fzNorm(t).includes(w) || !!fzFind(t, w)));
  return { ok: (i) => near[i], near: near.some(Boolean) };
}
/* Numbers typed the way people type them (the same ask): Thai digits (๑๒๐๐), thousands commas, a currency sign, and a short word
   for thousands — 1.2k, 1,200, ฿300, ¥12,000, 3 พัน, 2 หมื่น, 1.5 แสน, 2 ล้าน. NaN when there is no number. */
function fzAmount(x) {
  let s = String(x == null ? '' : x).replace(/[๐-๙]/g, (d) => String(d.charCodeAt(0) - 0x0E50)).trim().toLowerCase();
  // the word for thousands counts only right after the number ("HK$ 85" is not 85 thousand)
  const mult = /\d\s*(?:ล้าน|m(?![a-z]))/.test(s) ? 1e6 : /\d\s*แสน/.test(s) ? 1e5 : /\d\s*หมื่น/.test(s) ? 1e4 : /\d\s*(?:พัน|k(?![a-z]))/.test(s) ? 1e3 : 1;
  s = s.replace(/(\d),(?=\d{3}\b)/g, '$1');
  const m = s.match(/\d+(?:\.\d+)?|\.\d+/); if (!m) return NaN;
  return Math.round(parseFloat(m[0]) * mult * 100) / 100;
}
// a child's height in cm, typed any way: 105, 105 ซม., 105cm, 1.05 ม., 1.05m, ๑๐๕
function fzHeight(x) {
  const s = String(x == null ? '' : x).replace(/[๐-๙]/g, (d) => String(d.charCodeAt(0) - 0x0E50)).replace(',', '.').toLowerCase();
  const m = s.match(/\d+(?:\.\d+)?/); if (!m) return NaN;
  let v = parseFloat(m[0]);
  if (v > 0 && v < 3) v *= 100;   // metres
  return Math.round(v * 10) / 10;
}
// one line-icon set for the grown-ups' pages (kid mode keeps its emoji): 24-unit grid, 1.75 stroke, drawn in currentColor
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  plane: '<path d="M20.2 3.8c.9.9.2 2.8-1.2 4.2l-2.7 2.7 1.9 8.3-1.6 1.6-3.6-6.6-3.2 3.2.3 2.6-1.3 1.3-1.7-3.2-3.2-1.7 1.3-1.3 2.6.3 3.2-3.2L4.4 8.4 6 6.8l8.3 1.9L17 6c1.4-1.4 3.3-2.1 3.2-2.2z"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
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
  lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  wifi: '<path d="M3 9.5a14 14 0 0 1 18 0M6.5 13a9 9 0 0 1 11 0M10 16.5a4 4 0 0 1 4 0"/><path d="M12 20h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7.5l9 6 9-6"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  quote: '<path d="M4 5h16v11H9l-5 4z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
  exchange: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 14h18M8 9a2 2 0 1 1 4 0M12 9a2 2 0 1 1 4 0"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/>',
  share: '<path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7h14v-7"/>',
  flag: '<path d="M5 21V4h12l-2 4 2 4H5"/>',
  device: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  family: '<circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="10" r="2.3"/><path d="M3 20a6 6 0 0 1 12 0M14 20a4 4 0 0 1 7 0"/>',
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
/* The fingerprint of an original photo or clip (owner, Nov 2026: "ไม่ให้รูปเดิมขึ้นซ้ำ"): SHA-256 of its size, first and last 64 KB,
   taken before shrink() re-encodes it — the same file picked again gives the same print, so a book never holds it twice (media.fp,
   migration 0027). '' where the browser has no crypto.subtle (an insecure page): nothing is skipped then. */
async function fileFp(f) {
  try {
    if (!f || typeof crypto === 'undefined' || !crypto.subtle) return '';
    const n = f.size, a = new Uint8Array(await f.slice(0, 65536).arrayBuffer()), b = n > 131072 ? new Uint8Array(await f.slice(n - 65536).arrayBuffer()) : new Uint8Array(0);
    const head = new TextEncoder().encode(n + ':'), buf = new Uint8Array(head.length + a.length + b.length);
    buf.set(head, 0); buf.set(a, head.length); buf.set(b, head.length + a.length);
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buf)).slice(0, 12), (x) => x.toString(16).padStart(2, '0')).join('');
  } catch (_) { return ''; }
}
const fpIn = (t, fp) => !!fp && S.media.some((m) => m.trip === t.id && m.fp === fp);   // the book already holds this file (sent or still queued)

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
  if (!r.ok) { const j = await r.json().catch(() => null); throw Object.assign(new Error('http ' + r.status), { code: r.status, error: j && j.error, body: j }); }   // e.error = the server's word (limit, runs, exists…)
  return r.json();
}
// a GET whose answer is kept on the phone (IndexedDB kv 'k:<url>'): with no signal the last answer stands in — the library lists
// Today and SOS read (the towns, places to eat near tonight's bed, the rainy-day list); packOffline asks them ahead (warmOffline)
async function apiKeep(url) {
  try { const r = await api('GET', url); idb.set('k:' + url, r); return r; }
  catch (e) { if (e && e.code === 401) throw e; const v = await idb.get('k:' + url); if (v !== undefined) return v; throw e; }
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
// A load that started before a newer one succeeded must never undo it: the boot's first ask (no session yet) can come back with its 401
// after a quick sign-in has already loaded the shelf — the phone would fall back to the sign-in page (the "login flake" seen in the tests).
let loadGen = 0, loadOk = 0;
async function load(tries = 0) {
  const gen = ++loadGen;
  try {
    const w0 = written, prev = S;
    const r = await fetch('/api/b/state?lite=1', { credentials: 'same-origin', cache: 'no-store', headers: prev && prev.etag ? { 'If-None-Match': prev.etag } : {} });
    if (r.status === 401) { if (loadOk > gen) return 'stale'; S = null; return 'auth'; }
    if (r.status === 304 && prev) { offline = false; prev.syncedAt = Date.now(); return 'same'; }
    if (!r.ok) throw new Error('http ' + r.status);
    const fresh = await r.json();
    fresh.etag = r.headers.get('ETag');
    try { await withSeeds(fresh, prev || (await idb.get('state'))); } catch (e) { if (e.code === 409 && tries < 5) return load(tries + 1); throw e; }
    if (written !== w0 && tries < 5) return load(tries + 1);
    if (loadOk > gen) return 'stale';
    S = fresh; loadOk = gen; offline = false; S.syncedAt = Date.now();
    idb.set('state', typeof structuredClone === 'function' ? structuredClone(S) : JSON.parse(JSON.stringify(S)));   // structuredClone: Safari 15.4+ ls('state', null);   // the offline copy lives in IndexedDB, as the server sent it (before pending writes are laid on top)
  } catch (e) {
    if (loadOk > gen) return 'stale';
    const c = (await idb.get('state')) || ls('state');
    if (!c) return 'fail';
    S = c; offline = !navigator.onLine || e instanceof TypeError;   // a failed fetch is no signal; a server error (5xx) is not, so the banner must not say so
  }
  overlay();
  return offline ? 'cached' : 'ok';
}
// a copy of the state, ready to draw: lists a copy cached before they existed, and the pending writes laid on top
function overlay() { S.hearts = S.hearts || []; S.reviews = S.reviews || []; S.spend = S.spend || []; queue.forEach(applyLocal); }
const isEditor = () => !!(S && S.me.role === 'editor');

/* ---------- live forecast for the Today page: one request per book per hour, the answer kept in localStorage so the line
   survives a reload offline; nothing of the family leaves the phone (the server asks Open-Meteo with the stay's town only) */
const WX = {};
function ensureWx(t) {
  const k = 'wx:' + t.id, c = WX[t.id] || ls(k);
  if (c && !c.pending && Date.now() - c.at < 3600e3) { WX[t.id] = c; return; }
  if (WX[t.id] && WX[t.id].pending) return;
  if (!navigator.onLine) { if (c) WX[t.id] = c; return; }
  WX[t.id] = { ...(c || { at: 0, days: [] }), pending: true };
  fetch(`/api/b/wx/${encodeURIComponent(t.id)}`, { credentials: 'same-origin' }).then((r) => (r.ok ? r.json() : null)).then((j) => {
    WX[t.id] = j ? { at: Date.now(), days: j.days || [] } : { ...(c || { days: [] }), at: Date.now() - 3600e3 + 600e3, pending: false };   // no answer: ask again in ten minutes
    if (j) { ls(k, WX[t.id]); if (j.days.some(Boolean)) safeRender(); }
  }).catch(() => { WX[t.id] = { ...(c || { days: [] }), at: Date.now() - 3600e3 + 600e3, pending: false }; });
}
/* ---------- the family's emoji library (table emoji, server/emoji.js; managed on #/emoji) ----------
   S.emoji = [{id, ch, alt, th, en, src}]: each emoji the family has a picture for — the owner's bundled set to start with,
   then whatever the parents add or delete. The data always keeps the Unicode emoji (moods, hearts, quotes, notes, captions),
   so old entries, push texts and shares are unchanged; only the drawing changes. emo('💗') → the picture (else the emoji as
   text); emoIn(html) swaps them inside already-escaped text (an emoji is never part of an entity) — never on attributes. */
const emoRows = () => (S && Array.isArray(S.emoji) ? S.emoji : []);
let emoMemo = { rows: null, map: {}, re: null };
function emoMap() {
  const rows = emoRows(); if (emoMemo.rows === rows) return emoMemo;
  const map = {}; for (const e of rows) for (const c of [e.ch, ...(e.alt || [])]) if (c && !map[c.replace(/\uFE0F/g, '')]) map[c.replace(/\uFE0F/g, '')] = e;
  const keys = Object.keys(map).sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  emoMemo = { rows, map, re: keys.length ? new RegExp(`(${keys.join('|')})\\uFE0F?`, 'gu') : null };
  return emoMemo;
}
const emoOf = (ch) => emoMap().map[String(ch || '').replace(/\uFE0F/g, '')];
const emo = (ch, cls = '') => { const e = emoOf(ch); return e ? `<img class="emi${cls ? ' ' + cls : ''}" src="${esc(e.src)}" alt="${esc(ch)}" draggable="false">` : esc(ch); };
const emoIn = (html) => { const m = emoMap(); return m.re ? String(html).replace(m.re, (x) => emo(x)) : String(html); };
// the library button beside a text box: opens the grid of pictures, the one tapped goes in at the cursor
const emoBtn = (id) => `<button type="button" class="emobtn" data-a="emopick" data-for="${esc(id)}" aria-label="${L('ใส่อีโมจิ', 'Add an emoji')}" title="${L('ใส่อีโมจิ', 'Add an emoji')}">${emo('😄')}</button>`;
// WMO weather codes → a glyph and a word (the first row whose ceiling the code fits under)
const WX_CODES = [[0, '☀️', 'แดดจัด', 'clear'], [2, '🌤️', 'มีเมฆบ้าง', 'partly cloudy'], [3, '☁️', 'เมฆมาก', 'overcast'], [48, '🌫️', 'หมอก', 'fog'], [57, '🌦️', 'ฝนปรอย', 'drizzle'],
  [67, '🌧️', 'ฝน', 'rain'], [77, '❄️', 'หิมะ', 'snow'], [82, '🌦️', 'ฝนซู่', 'showers'], [86, '🌨️', 'หิมะซู่', 'snow showers'], [99, '⛈️', 'พายุฝน', 'thunderstorms']];
// "🌤️ พยากรณ์ 15–22°C · มีเมฆบ้าง · ฝน 40%", or '' when there is none yet (too far ahead, offline, or the service did not answer)
function wxLine(t, i) {
  const f = WX[t.id] && WX[t.id].days && WX[t.id].days[i]; if (!f || f.tmin == null) return '';
  const c = WX_CODES.find(([max]) => f.code != null && f.code <= max) || WX_CODES[1];
  return `${c[1]} ${L('พยากรณ์', 'Forecast')} ${Math.round(f.tmin)}–${Math.round(f.tmax)}°C · ${L(c[2], c[3])}${f.pop != null ? ` · ${L('โอกาสฝน', 'rain')} ${f.pop}%` : ''}`;
}

/* ---------- offline queue: every write goes through here ----------
   op: {qid, seq, method, url, body?, blob?, local} — `local` describes the optimistic change so it can be re-applied after reload */
let seq = Date.now();
let flushing = false;
// the texts two parents may both edit (server/bookshelf.js TEXTY) and the conflicts waiting for a parent's answer (kept on this phone)
const TEXTY = ['quote', 'note', 'fav', 'sum', 'fore', 'letter'];
let conflicts = (() => { try { const c = ls('conflicts'); return Array.isArray(c) ? c : []; } catch (_) { return []; } })();
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
  idxTick++;   // the per-book lists (rowsIdx) are built again on the next ask
  const list = S[l.coll] || (S[l.coll] = []);   // a list an older stored state did not have yet (comments)
  const i = list.findIndex((x) => x.id === l.id);
  if (l.del) { if (i >= 0) list.splice(i, 1); return; }
  const row = { ...(i >= 0 ? list[i] : {}), ...l.row, id: l.id, pending: true };
  if (op.blob && !row.local) row.local = URL.createObjectURL(op.blob);
  if (i >= 0) list[i] = row; else list.push(row);
}
let progress = null;   // {done, total} while photos upload
// "Photos on Wi-Fi only" (roaming data): photos, voice clips and drawings wait in the queue while the phone is on mobile data;
// words still go at once. Android Chrome tells us the network (navigator.connection.type); iPhone doesn't, so there they wait
// until a grown-up taps "send now" (upNow, this visit only). Ops on a waiting photo (star, caption, delete) wait with it.
let upNow = false, allHeld = false;   // allHeld: everything left in the queue is waiting for Wi-Fi (so keep refreshing the state)
const netType = () => { const c = navigator.connection; return c && c.type ? c.type : ''; };
const wifiOnly = () => !!ls('wifionly');
function holdMedia() {
  if (!wifiOnly() || upNow) return false;
  const n = netType();
  return n ? n === 'cellular' : true;
}
const mediaIdOf = (op) => { const m = /^\/api\/b\/media\/([^/?]+)/.exec(op.url || ''); return m ? decodeURIComponent(m[1]) : null; };
// how many queued writes are waiting for Wi-Fi: the photos/clips and anything done to them since (a ⭐, a caption, a delete)
function heldCount() {
  if (!holdMedia()) return 0;
  const held = new Set(); let n = 0;
  queue.forEach((o) => { const mid = mediaIdOf(o); if (o.blob || (mid && held.has(mid))) { if (mid) held.add(mid); n++; } });
  return n;
}
if (navigator.connection && navigator.connection.addEventListener) navigator.connection.addEventListener('change', () => { flush(); renderProgress(); });
async function flush() {
  if (flushing || !queue.length || !S) return;
  flushing = true;
  const hold = holdMedia();
  const photos = hold ? 0 : queue.filter((o) => o.blob).length;
  if (photos) progress = { done: 0, total: photos };
  const held = new Set(), w0 = written;
  try {
    let at = 0;
    while (at < queue.length) {
      const op = queue[at], mid = mediaIdOf(op);
      if (hold && (op.blob || (mid && held.has(mid)))) { if (mid) held.add(mid); at++; continue; }   // keep it (and its order) for Wi-Fi
      try {
        await api(op.method, op.url, op.body, op.blob);
      } catch (e) {
        if (e.code === 401) break;
        if (e.code === 409 && e.body && e.body.error === 'conflict' && e.body.current) {   // the other parent's phone changed this text: ask (sheets.js conflictSheet)
          conflicts.push({ op: { method: op.method, url: op.url, body: op.body, local: op.local }, current: e.body.current }); ls('conflicts', conflicts);
          queue.splice(at, 1); written++; await idb.del(op.qid);
          if (typeof conflictSheet === 'function') setTimeout(conflictSheet, 0);
          continue;
        }
        if (e.code === 429 && op.limit) toast(L('วันนี้ส่งหัวใจครบแล้ว พรุ่งนี้ส่งใหม่ได้นะ', 'That’s all the hearts for today — send more tomorrow'));   // a daily cap: retrying won't help
        else if (!e.code || e.code === 408 || e.code === 429 || e.code >= 500) {   // offline / server busy: keep it, try later
          offline = !e.code; if (e.code === 429) toast(L('อัปโหลดถี่เกินไป จะลองใหม่อีกครั้ง', 'Too many uploads — will retry'));
          break;
        }
        // 4xx: drop this one, keep the rest
        else if (e.code === 413) toast(/kind=video/.test(op.url) ? L('คลิปใหญ่เกินไป (เกิน 400 MB) — ข้ามคลิปนี้', 'Clip too large (over 400 MB) — skipped') : L('รูปใหญ่เกินไป (เกิน 40 MB) — ข้ามรูปนี้', 'Photo too large (over 40 MB) — skipped'));
        else if (e.code === 415) toast(/kind=video/.test(op.url) ? L('เปิดคลิปนี้ไม่ได้ — ข้ามคลิปนี้', 'This clip could not be read — skipped') : L('ไฟล์นี้ไม่ใช่รูปที่อ่านได้ — ข้ามรูปนี้', 'Not a readable photo — skipped'));
        else toast(L('บันทึกไม่สำเร็จ 1 รายการ', 'One change could not be saved') + ` (${e.code})`);
      }
      queue.splice(at, 1); written++; await idb.del(op.qid);
      if (op.blob && progress) progress.done++;
      renderProgress();
    }
  } finally {
    flushing = false;
    if (!queue.some((o) => o.blob)) { progress = null; upNow = false; }
    allHeld = hold && queue.length > 0 && queue.every((o) => o.blob || held.has(mediaIdOf(o)));
    renderProgress();
    if (!queue.length || (allHeld && written !== w0)) { await load(); safeRender(); }
  }
}

/* ---------- derived data ---------- */
const trips = () => (S ? S.trips : []);
const trip = (id) => trips().find((t) => t.id === id);
const children = () => (S ? S.children : []);
// what we actually spent: rows of a book, or of one day of it
const spendOf = (tid, day) => (S && S.spend ? S.spend : []).filter((s) => s.trip === tid && (day === undefined || s.day === day));
// the money of a book, by its timezone: the first is the default when typing in a spend; THB is always there for things paid from home
const CURS = [[/^Australia\//, ['AUD']], [/Hong_Kong|Macau/, ['HKD', 'MOP']], [/Tokyo/, ['JPY']], [/Singapore/, ['SGD']], [/Seoul/, ['KRW']], [/Taipei/, ['TWD']], [/Kuala_Lumpur/, ['MYR']], [/Europe\/London/, ['GBP']], [/^Europe\//, ['EUR']], [/^America\//, ['USD']]];
const tripCurs = (t) => { const m = CURS.find(([re]) => re.test(t.timezone || '')); return m ? [...m[1], 'THB'] : ['THB']; };
const fmtMoney = (n, cur) => { try { return new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-GB', { style: 'currency', currency: cur, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n); } catch (_) { return `${cur} ${n}`; } };
const sumMoney = (rows) => { const m = {}; rows.forEach((s) => { m[s.cur] = (m[s.cur] || 0) + s.amount; }); return Object.entries(m).map(([c, n]) => fmtMoney(n, c)).join(' + '); };
// baht at a rate the parents type in on the spending page (kept on this phone, ls('fx') = {HKD: 4.4, …}); never fetched from anywhere.
// toThb(rows) → {thb, missing: [currencies without a rate]}; THB rows count as they are
const fxRates = () => ls('fx') || {};
function toThb(rows) {
  const fx = fxRates(), miss = new Set(); let thb = 0;
  rows.forEach((s) => { if (s.cur === 'THB') thb += s.amount; else if (+fx[s.cur] > 0) thb += s.amount * fx[s.cur]; else miss.add(s.cur); });
  return { thb, missing: [...miss] };
}
const thbLine = (rows) => { const r = toThb(rows); return !r.missing.length && rows.some((s) => s.cur !== 'THB') ? `≈ ${fmtMoney(Math.round(r.thb), 'THB')}` : ''; };
const kidName = (slug) => { if (slug === 'both') return L('ทั้งคู่', 'Both'); const k = children().find((c) => c.slug === slug); return k ? (lang === 'th' ? k.name_th : k.name_en) : ''; };
const kidEmoji = (slug) => (slug === 'both' ? children().map((c) => c.emoji || '🧒').join('') : (children().find((c) => c.slug === slug) || {}).emoji || '');
/* The family's rows by book and by day, built once per state (owner, Nov 2026: "ทดสอบกับข้อมูลเยอะ" — with 12 books, 6,000 photos and
   4,000 words, the shelf drew in 600 ms on a slow phone, most of it filtering and sorting every list for every book, day and stamp).
   Rebuilt when the state is replaced (load), a write is laid on top (applyLocal → idxTick) or a list changes its length. Each list a
   caller gets is a fresh copy, so a caller that sorts or splices it never changes the index. */
let idxTick = 0, IDX = null;
function rowsIdx(tid) {
  const k = S && [S, idxTick, S.entries.length, S.media.length, S.places.length];
  if (!IDX || !k || IDX.k.some((x, i) => x !== k[i])) {
    const by = new Map(), get = (t) => { let b = by.get(t); if (!b) by.set(t, (b = { entries: [], photos: [], videos: [], audios: [], places: [], day: new Map() })); return b; };
    if (S) {
      for (const e of S.entries) get(e.trip).entries.push(e);
      for (const m of S.media) get(m.trip)[isAudio(m) ? 'audios' : isVideo(m) ? 'videos' : 'photos'].push(m);
      for (const p of S.places) get(p.trip).places.push(p);
      for (const b of by.values()) for (const l of [b.photos, b.videos, b.audios]) l.sort((x, y) => x.at - y.at);
    }
    IDX = { k: k || [], by };
  }
  return IDX.by.get(tid) || { entries: [], photos: [], videos: [], audios: [], places: [], day: new Map() };
}
const idxOf = (tid, kind, day) => {
  const b = rowsIdx(tid); if (day === undefined) return b[kind].slice();
  const key = kind + '|' + day; let l = b.day.get(key);
  if (!l) { l = b[kind].filter((x) => x.day === day); b.day.set(key, l); }
  return l.slice();
};
const entriesOf = (tid, day) => idxOf(tid, 'entries', day);
// photos and voice memos share the media table; mediaOf() is the photos (everything that draws a picture), audioOf() the kids' voices
const isAudio = (m) => !!m && String(m.mime || '').startsWith('audio/');
const isVideo = (m) => !!m && String(m.mime || '').startsWith('video/');   // video clips (≤ 30 s): their own list, never counted, printed or shared as photos
const mediaOf = (tid, day) => idxOf(tid, 'photos', day);
const videoOf = (tid, day) => idxOf(tid, 'videos', day);
const audioOf = (tid, day) => idxOf(tid, 'audios', day);
const placesOf = (tid, day) => idxOf(tid, 'places', day);
// photo tags Claude may pick (server/story.js TAGS — the same keys, in the same order) + how the app shows each; a parent's own tag shows as typed
const PHOTO_TAGS = [['kids', '🧒', 'เด็กๆ', 'Kids'], ['family', '👨‍👩‍👧‍👦', 'ครอบครัว', 'Family'], ['food', '🍜', 'อาหาร', 'Food'], ['dessert', '🍦', 'ของหวาน', 'Sweets'],
  ['animals', '🐨', 'สัตว์', 'Animals'], ['nature', '🌳', 'ธรรมชาติ', 'Nature'], ['beach', '🏖️', 'ชายหาด', 'Beach'], ['water', '💦', 'เล่นน้ำ', 'Water'],
  ['playground', '🛝', 'สนามเด็กเล่น', 'Playground'], ['ride', '🎢', 'เครื่องเล่น', 'Rides'], ['transport', '🚌', 'รถ เรือ รถไฟ', 'Transport'], ['plane', '✈️', 'เครื่องบิน', 'Plane'],
  ['city', '🏙️', 'ในเมือง', 'City'], ['view', '🌄', 'วิว', 'View'], ['museum', '🏛️', 'พิพิธภัณฑ์', 'Museum'], ['art', '🎨', 'ศิลปะ', 'Art'], ['shop', '🛍️', 'ช้อปปิ้ง', 'Shopping'],
  ['stay', '🛏️', 'ที่พัก', 'Stay'], ['sleep', '😴', 'หลับ', 'Sleeping'], ['play', '🧸', 'เล่น', 'Playing'], ['walk', '🚶', 'เดินเล่น', 'Walking'], ['night', '🌙', 'กลางคืน', 'Night'],
  ['rain', '🌧️', 'ฝน', 'Rain'], ['funny', '😂', 'ขำๆ', 'Funny'], ['selfie', '🤳', 'เซลฟี่', 'Selfie'], ['sign', '🪧', 'ป้าย', 'Signs'], ['character', '🐭', 'ตัวการ์ตูน', 'Characters']];
const tagLabel = (k) => { const x = PHOTO_TAGS.find((t) => t[0] === k); return x ? `${x[1]} ${L(x[2], x[3])}` : `#${k}`; };
// the same, as HTML: the emoji drawn by the family's library picture (emo), the words escaped
const tagHtml = (k) => { const x = PHOTO_TAGS.find((t) => t[0] === k); return x ? `${emo(x[1])} ${esc(L(x[2], x[3]))}` : esc(`#${k}`); };
const tagsOf = (m) => (Array.isArray(m && m.tags) ? m.tags : []);
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
function hourIn(tz) { try { return +new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: tz }).format(new Date()); } catch (_) { return new Date().getHours(); } }
// today's date in a zone, worked out at most once a second per zone (a formatter is costly, and the shelf asks for every book and day)
const TODAY = {};
function todayIn(tz) {
  const now = Date.now(), c = TODAY[tz]; if (c && Math.abs(now - c.at) < 1000) return c.d;   // a clock set back (a phone's own, or a test's) is asked again
  let d; try { d = new Date(now).toLocaleDateString('en-CA', { timeZone: tz }); } catch (_) { d = new Date(now).toISOString().slice(0, 10); }
  TODAY[tz] = { at: now, d }; return d;
}
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
let artJob = null;   // the helper drawing a book's pictures (sheets.js bookart ↔ GET /api/b/art), shown on the book menu
// theme.artDays[i] = a stock library picture for that day (resolved to its /stock/ URL by the server; '' = not there) wins over the template
const dayArt = (t, i) => (t.theme && Array.isArray(t.theme.artDays) && t.theme.artDays[i]) || (t.theme && t.theme.art ? t.theme.art.replace('{n}', i + 1) : '');
// passport: a day's stamp is inked once the day is Done or has anything recorded in it
const dayStamped = (t, i) => !!t.days[i].done_at || !!dayHasContent(t, i);
const daysUntil = (t) => Math.round((Date.parse(t.date_from + 'T00:00:00Z') - Date.parse(todayIn(t.timezone) + 'T00:00:00Z')) / 864e5);
const dayHasContent = (t, i) => entriesOf(t.id, i).some((e) => e.kind !== 'mood' || e.mood) || mediaOf(t.id, i).length || audioOf(t.id, i).length || videoOf(t.id, i).length || placesOf(t.id, i).length;
function themeStyle(t) {
  const th = (t && t.theme) || {};
  const keys = { accent: '--accent', accent2: '--accent2', ink: '--ink', muted: '--muted', panel: '--panel', rule: '--rule', pick: '--pick', info: '--info', calm: '--calm', warn: '--warn' };
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const acc2 = th.accent2 && dark ? (th.accent2Dark || (/^#[0-9a-f]{6}$/i.test(th.accent2) ? mixHex(th.accent2, '#ffffff', 0.35) : th.accent2)) : th.accent2;
  const css = Object.entries(keys).filter(([k]) => th[k] && !(dark && ['ink', 'muted', 'panel', 'rule', 'pick', 'info', 'calm', 'warn'].includes(k)))
    .map(([k, v]) => `${v}:${k === 'accent' && dark && th.accentDark ? th.accentDark : k === 'accent2' ? acc2 : th[k]}`);
  const acc = dark && th.accentDark ? th.accentDark : th.accent;
  if (acc) css.push(`--on-accent:${onAccent(acc)}`);   // text on an accent fill: white on a deep accent, the dark paper on the light dark-mode accent
  if (th.accent2) css.push(`--on-accent2:${onAccent(acc2)}`);   // the same for the second colour (AU's sea blue wants dark text)
  return css.join(';');
}
const mixHex = (a, b, w) => { const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), x = rgb(a), y = rgb(b); return `#${x.map((v, i) => Math.round(v * (1 - w) + y[i] * w).toString(16).padStart(2, '0')).join('')}`; };
// WCAG contrast: white or the dark paper, whichever reads better on this colour
function onAccent(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim()); if (!m) return '#FFFFFF';
  const lum = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const l = lum(m[1]), cr = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return cr(l, 1) >= cr(l, lum('1B2230')) ? '#FFFFFF' : '#1B2230';
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
  ((t.passport || {}).stamps || []).forEach((s) => s && s.art && urls.add(s.art));   // the stock library's city/country stamps
  (((t.passport || {}).map || {}).stops || []).forEach((s) => s && s.art && urls.add(s.art));   // map pins drawn from the library
  kidArtSlugs().forEach((k) => { urls.add(kidArt(k)); urls.add(kidArt(k, true)); urls.add(kidArt(k, false, t)); urls.add(kidArt(k, true, t)); });
  mediaOf(t.id).forEach((m) => { if (!m.local) { urls.add(`/media/${encodeURIComponent(m.id)}/t`); if (m.highlight || isDrawingId(m.id)) urls.add(`/media/${encodeURIComponent(m.id)}`); } });
  videoOf(t.id).forEach((m) => { if (!m.local) urls.add(`/media/${encodeURIComponent(m.id)}/t`); });   // a clip's poster; the clip itself only with "everything"
  // every picture the guide text names (a chapter's park map, a card's picture): HK day 2's Disneyland map was missing with no signal
  const pics = (v) => { if (typeof v === 'string') { if (/^\/(art|stock)\/[^\s"'<>]+\.(svg|webp|png|jpe?g)(\?[^\s"'<>]*)?$/i.test(v)) urls.add(v); } else if (v && typeof v === 'object') Object.values(v).forEach(pics); };
  pics(t.info); t.days.forEach((d) => pics(d.plan));
  urls.add('/geo/land.json');   // the kids' world map draws its land from it
  if (t.kind === 'snap') new Set(['th', ...(((t.theme || {}).snap || {}).places || []).map((p) => String(p).split('-')[0])]).forEach((cc) => { if (/^[a-z]{2}$/.test(cc)) urls.add(`/geo/${cc}.json`); });   // a book from photos names new photos with no signal too
  return [...urls];
};
const isDrawingId = (id) => /^dr-/.test(id);
let packing = null;   // {done, total} while a book is being stored
async function packOffline(t, all) {
  if (packing) return;
  let urls = offlineUrls(t);
  if (all) urls = urls.concat(mediaOf(t.id).concat(audioOf(t.id), videoOf(t.id)).filter((m) => !m.local).map((m) => `/media/${encodeURIComponent(m.id)}`));
  urls = [...new Set(urls)];
  packing = { done: 0, total: urls.length }; let failed = 0;
  renderProgress();
  const worker = async () => { for (;;) { const u = urls.shift(); if (!u) return; try { const r = await fetch(u, { credentials: 'same-origin' }); if (!r.ok) failed++; } catch (_) { failed++; } packing.done++; renderProgress(); } };
  await Promise.all([worker(), worker(), worker()]);
  try { await warmOffline(t); } catch (_) { failed++; }
  packing = null; renderProgress();
  if (failed) toast(L(`เก็บไม่ครบ ${failed} ไฟล์ ลองอีกครั้งเมื่อสัญญาณดี`, `${failed} files could not be stored — try again with better signal`));
  else { ls('offline_' + t.id, { at: Date.now(), n: mediaOf(t.id).length, all: !!all }); toast(L('เก็บเล่มนี้ไว้ในเครื่องแล้ว เปิดได้แม้ไม่มีเน็ต', 'This book is stored on the phone — it opens without signal')); safeRender(); }
}

/* ---------- ui helpers ---------- */
let toastT = 0;
// reminders (Web Push): this phone subscribes once; the server sends "08:00 · in 30 min" before each timed step of the day
const pushOk = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
// iPhone, iPod or iPad — an iPad (iPadOS 13+) calls itself a Mac in its user agent, so it is the Mac with a touch screen
const isIOS = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
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
// the family's profile: the app's name and the kicker under it (S.family after login; /api/brand before — app name and the
// children's drawings only, never their names), and the children as drawn (server/family.js: each child's "look" recolours one of
// the two hand-drawn characters; Mimi and Mika with no look are the drawings as they are)
let BRAND = ls('brand') || null;
const famProf = () => (S && S.family) || BRAND || { app: { th: 'LifeBook', en: 'LifeBook' }, kicker: { th: '', en: '' } };
const appName = () => T(famProf().app) || 'LifeBook';
const kicker = () => T(famProf().kicker);
// "มีมี่และมีก้า" / "Mimi and Mika" — every child, in the language on screen
const kidsNames = () => { const ns = children().map((k) => (lang === 'th' ? k.name_th : k.name_en)).filter(Boolean); return ns.length <= 1 ? ns.join('') : ns.slice(0, -1).join(lang === 'th' ? ' ' : ', ') + (lang === 'th' ? 'และ' : ' and ') + ns[ns.length - 1]; };
const kidRows = () => (S ? S.children : ((BRAND && BRAND.kids) || []));
const kidArtSlugs = () => kidRows().filter((k) => kidArt(k.slug)).map((k) => k.slug);
// which drawing a child is: 'mimi' (the girl with her wagon) or 'mika' (the toddler) — the CSS sizes the two differently
const kidBase = (slug) => { const k = kidRows().find((c) => c.slug === slug); return k && k.avatar ? 'drawnai' : k && k.look ? (k.look.base === 'boy' ? 'mika' : 'mimi') : slug; };
// the kids dress for the trip: a book's theme.outfit (e.g. "adventure" for Australia) picks /art/kids/<kid>-<outfit>[-full].svg;
// artTrip is the book on screen (set by render), so every drawing of the kids on that page wears the same clothes
const KID_OUTFITS = ['adventure'];
let artTrip = null;
// Mimi and Mika have a wardrobe (owner, Nov 2026: "สร้างชุดให้หลากหลาย … ให้สอดคล้องกับทริป"): twenty painted outfits each in
// /art/kids/<kid>-<outfit>.webp (the whole figure) + -face.webp (the round badge). They dress for the day on the page (artDay, set by render):
// the day's title and its timeline headlines (words and their emoji) pick the outfit (WEAR_RULES: a flight first, else the most hits, the first on a tie); with no day, the book's
// own (theme.outfit "adventure" = hiking, else the city clothes). A child may choose in kid mode (ls wear_<kid>, this phone only).
const KID_STOCK = ['mimi', 'mika'];
const KID_WEAR = ['beach', 'hike', 'city', 'park', 'rain', 'snow', 'plane', 'pyjamas', 'farm', 'festival', 'sailor', 'train', 'chef', 'astronaut', 'hero', 'kangaroo', 'koala', 'panda', 'penguin', 'dino'];
const WEAR_RULES = [['plane', /\b(flights?|fly|flying|airport|plane|take-?off|boarding)\b|✈|🛫|🛬/g], ['snow', /\b(snow\w*|ski\w*|sledg\w*)\b|❄|☃|⛄/g], ['beach', /\b(beach\w*|swim\w*|pool|snorkel\w*|sandcastles?|paddl\w*)\b|🏖|🏝/g],
  ['sailor', /\b(ferry|ferries|boats?|cruise|sail\w*)\b|⛴|⛵|🚢|🛥/g], ['park', /(theme park|disneyland|ocean park|luna park|carousel|amusement|playground|funfair|🎢|🎡|🎠)/g],
  ['farm', /\b(zoo|farm|wildlife|koalas?|kangaroos?|aquarium|pandas?|penguins?|horses?)\b/g], ['train', /\b(trains?|railway|trams?)\b|🚂|🚆|🚃|🚄/g],
  ['festival', /(festival|fireworks|lanterns?|christmas|new year|light show|🎆|🎇|🏮)/g], ['hike', /\b(hik\w*|trails?|mountains?|lookouts?|national park|bushwalk\w*|peak|waterfalls?)\b|🥾|⛰|🏔/g],
  ['city', /\b(museums?|gallery|galleries|markets?|temples?|city|harbour|shopping)\b/g]];
let artDay = null;
const wearAuto = (t, i) => {
  const d = t && t.days && i != null && i >= 0 ? t.days[i] : null;
  if (!d) return t && (t.theme || {}).outfit === 'adventure' ? 'hike' : 'city';
  const txt = [(d.title || {}).en || '', (d.place || {}).en || ''].concat((((d.plan || {}).plan) || []).map((r) => ((r.h || {}).en) || '')).join(' · ').toLowerCase();
  if (txt.match(WEAR_RULES[0][1])) return 'plane';   // a flight is the day, whatever else it holds
  let best = '', n = 0;
  WEAR_RULES.forEach(([w, re]) => { const c = (txt.match(re) || []).length; if (c > n) { n = c; best = w; } });
  return best || (t && (t.theme || {}).outfit === 'adventure' ? 'hike' : 'city');
};
const kidStock = (slug) => { const k = kidRows().find((c) => c.slug === slug); return !!k && KID_STOCK.includes(slug) && !k.avatar && !k.a && !k.look && !k.v; };
const kidWear = (slug, t) => { const w = ls('wear_' + slug); return KID_WEAR.includes(w) ? w : wearAuto(t || artTrip, artDay); };
const kidArt = (slug, full, t) => {
  const k = kidRows().find((c) => c.slug === slug); if (!k) return '';
  // a character drawn from the child's photo (server/avatar.js): family only, so never on the sign-in page (the brand says only that one exists)
  if (k.avatar) {   // the child as they were on that trip: the newest drawing made by the book's last day (else the earliest one), the newest elsewhere
    const tt = t || artTrip, list = Array.isArray(k.avatars) ? k.avatars : [];
    let id = k.avatar;
    if (tt && tt.date_to && list.length) { const by = list.filter((d) => d.at <= tt.date_to); id = (by.length ? by[by.length - 1] : list[0]).id; }
    return `/media/kid/${encodeURIComponent(slug)}/${full ? 'full' : 'face'}.png?v=${encodeURIComponent(id)}`;
  }
  if (k.a) return '';
  if (kidStock(slug)) return `/art/kids/${slug}-${kidWear(slug, t)}${full ? '' : '-face'}.webp`;
  if (!(k.look || k.v || slug === 'mimi' || slug === 'mika')) return '';   // v: a look's version (the brand lists only that)
  const o = (((t || artTrip) || {}).theme || {}).outfit;
  return `/art/kids/${slug}${KID_OUTFITS.includes(o) ? '-' + o : ''}${full ? '-full' : ''}.svg${k.v ? '?v=' + k.v : ''}`;
};
const kidFace = (slug) => (slug === 'both' ? kidArtSlugs().map((k) => `<img class="face" src="${kidArt(k)}" alt="">`).join('')
  : kidArt(slug) ? `<img class="face" src="${kidArt(slug)}" alt="">` : esc(kidEmoji(slug)));
function kidBadge(slug, off) {
  const art = slug === 'both' ? kidArtSlugs().map((k) => `<img src="${kidArt(k)}" alt="">`).join('') : kidArt(slug) ? `<img src="${kidArt(slug)}" alt="">` : kidEmoji(slug);
  const c = (children().find((k) => k.slug === slug) || {}).color;
  return `<span class="kid ${esc(slug)}${off ? ' off' : ''}${kidArt(slug) || slug === 'both' ? ' drawn' : ''}"${c ? ` style="--c:${esc(c)}"` : ''} title="${esc(kidName(slug))}">${art}</span>`;
}
// two taps to delete (no confirm()): first tap arms for 3 s
function armed(btn, label) {
  if (btn.dataset.armed) return true;
  btn.dataset.armed = '1'; const old = btn.textContent; btn.textContent = label || L('แตะอีกครั้งเพื่อลบ', 'Tap again to delete');
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
