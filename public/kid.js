'use strict';
/* ===== Memory Bookshelf · kid mode: big buttons for Mimi (3) and Mika (1½) =====
   #/kid → pick a child · #/kid/<kid> home · /colour · /spot · /stamp · /words
   Locked: while kid mode is on, every route comes back here; a grown-up exits by pressing and holding the lock (1.2 s).
   Sounds are synthesised (Web Audio), words are read by the phone's own voices (speechSynthesis) — nothing leaves the phone. */

/* ---------- sounds ---------- */
let audioCtx = null;
function beep(kind) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const c = audioCtx, t0 = c.currentTime;
    const tone = (f, at, dur, type, vol) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0 + at);
      g.gain.setValueAtTime(vol || 0.2, t0 + at); g.gain.exponentialRampToValueAtTime(0.001, t0 + at + dur);
      o.connect(g); g.connect(c.destination); o.start(t0 + at); o.stop(t0 + at + dur);
    };
    if (kind === 'thud') { tone(140, 0, 0.35, 'triangle', 0.5); tone(70, 0, 0.45, 'sine', 0.5); }
    else if (kind === 'chime') [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.4, 'sine', 0.18));
    else if (kind === 'pop') tone(880, 0, 0.12, 'sine', 0.2);
    else tone(600, 0, 0.08, 'triangle', 0.12);
  } catch (_) { /* no audio — fine */ }
}

/* ---------- the phone reads aloud ---------- */
function voiceFor(langTag) {
  const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
  const want = langTag.toLowerCase(), base = want.split('-')[0];
  const ok = (v) => v.lang.toLowerCase().replace('_', '-');
  if (want === 'zh-hk') return vs.find((v) => ok(v) === 'zh-hk' || ok(v).startsWith('yue')) || null;   // Cantonese only — Mandarin would teach the wrong word
  return vs.find((v) => ok(v) === want) || vs.find((v) => ok(v).startsWith(base)) || null;
}
function say(text, langTag) {
  if (!window.speechSynthesis || !text) return false;
  const v = voiceFor(langTag);
  if (!v && /^zh-HK$/i.test(langTag)) { toast(L('เครื่องนี้ยังไม่มีเสียงภาษากวางตุ้ง (ตั้งค่า › การช่วยการเข้าถึง › เนื้อหาที่ถูกอ่าน › เสียง)', 'No Cantonese voice on this phone yet (Settings › Accessibility › Spoken Content › Voices)')); return false; }
  try {   // never let a voice problem stop a tap from doing its job
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langTag; u.rate = 0.85; u.pitch = 1.1;
    try { if (v) u.voice = v; } catch (_) {}
    speechSynthesis.speak(u);
    return true;
  } catch (_) { return false; }
}
const sayUi = (text) => say(text, lang === 'th' ? 'th-TH' : 'en-GB');
if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};   // iOS/Chrome load voices lazily

/* ---------- colouring pages (tap a shape to fill it) ---------- */
const svgCache = {};
const fetchSvg = (url) => (svgCache[url] = svgCache[url] || fetch(url).then((r) => (r.ok ? r.text() : '')).catch(() => ''));
const COLOURS = ['#EF5350', '#FF9800', '#FFD54F', '#8BC34A', '#26A69A', '#42A5F5', '#5C6BC0', '#AB47BC', '#F48FB1', '#8D6E63', '#9E9E9E', '#FFFFFF'];
let kidColour = COLOURS[0], svgN = 0;
// line art from a coloured drawing: light fills become white and tappable (data-c), dark details and strokes stay
function lineArt(text) {
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml'), svg = doc.documentElement;
  if (!svg || svg.nodeName !== 'svg') return null;
  const suffix = '_c' + (++svgN);
  svg.querySelectorAll('[id]').forEach((el) => { el.id += suffix; });
  svg.querySelectorAll('[clip-path]').forEach((el) => el.setAttribute('clip-path', el.getAttribute('clip-path').replace(/#([^)]+)\)/, `#$1${suffix})`)));
  const lum = (hex) => { const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 1; let h = m[1]; if (h.length === 3) h = h.replace(/./g, '$&$&'); const n = parseInt(h, 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  let i = 0;
  svg.querySelectorAll('path,circle,rect,ellipse,polygon').forEach((el) => {
    if (el.closest('defs,clipPath,text')) return;
    const own = el.getAttribute('fill'), inh = el.parentNode && el.parentNode.getAttribute && el.parentNode.getAttribute('fill');
    const fill = own || inh;
    if (!fill || fill === 'none' || lum(fill) < 0.3 || el.getAttribute('opacity')) return;
    el.setAttribute('fill', '#ffffff'); el.setAttribute('data-c', i++);
  });
  svg.removeAttribute('width'); svg.removeAttribute('height');
  return svg;
}
async function hydrateColours(root) {
  for (const box of $$('.colsvg:not([data-done])', root || document)) {
    box.dataset.done = '1';
    const svg = lineArt(await fetchSvg(box.dataset.src)); if (!svg) continue;
    let fills = {}; try { fills = JSON.parse(box.dataset.fill || '{}'); } catch (_) {}
    Object.entries(fills).forEach(([k, c]) => { const el = svg.querySelector(`[data-c="${k}"]`); if (el) el.setAttribute('fill', c); });
    box.replaceChildren(document.importNode(svg, true));
  }
}
const colourUrl = (t, i) => { const pat = (t.passport || {}).colour; return pat ? pat.replace('{n}', i + 1) : dayArt(t, i); };
const colourFill = (t, i, kid) => fieldVal(t, `colour.d${i}`, kid) || '{}';

/* ---------- kid mode views ---------- */
let kidDay = null;
function kidTrip(kid) { const mine = kidTrips(kid); const c = curTrip(); return mine.includes(c) ? c : mine[0]; }
function kidDayOf(t) {
  if (kidDay !== null && kidDay < t.days.length) return kidDay;
  const n = dayNow(t); return n >= 0 ? n : 0;
}
function viewKid(p) {
  const ks = children(), kid = p[1], k = ks.find((c) => c.slug === kid);
  if (!k) {
    return `<div class="kidwrap pick"><h1>${L('ใครจะเล่น?', 'Who is playing?')}</h1><div class="kidpick">${ks.map((c) => `<button data-a="kidpick" data-v="${esc(c.slug)}">${kidArt(c.slug) ? `<img src="${kidArt(c.slug, true)}" alt="">` : `<span>${esc(c.emoji)}</span>`}<b>${esc(kidName(c.slug))}</b></button>`).join('')}</div>
<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button></div>`;
  }
  const t = kidTrip(kid); if (!t) return `<div class="empty">${L('ยังไม่มีทริป', 'No trips yet')}</div>`;
  const pp = t.passport || {}, i = kidDayOf(t), d = t.days[i], pd = (pp.days || [])[i] || {}, g = pp.guides || [];
  const view = p[2] || 'home', name = kidName(kid);
  const style = `--accent:${esc(pd.acc || t.theme.accent || '#1F3A5F')};--tint:${esc(pd.tint || '#F3F6FA')}`;
  const back = `<button class="kidback" data-a="kidnav" data-v="#/kid/${esc(kid)}" aria-label="${L('กลับ', 'Back')}">‹</button>`;
  const lock = `<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button>`;
  const head = `<header class="kidhd">${view === 'home' ? `<button class="kidme" data-a="kidnav" data-v="#/kid" aria-label="${L('เปลี่ยนคน', 'Switch child')}">${kidFace(kid)}</button>` : back}
<div class="kidday">${artImg(t, i)}<div><small>${L('วันที่', 'Day')} ${i + 1}</small><b>${esc(T(pd.title) || T(d.title))}</b></div></div></header>`;
  let body = '';
  if (view === 'home') {
    const words = (pp.lists || []).find((l) => l.said);
    const tiles = [['colour', '🎨', L('ระบายสี', 'Colour')], ['spot', '🔍', L('หาของ', 'Find it')], ['stamp', '🛂', L('ปั๊มตรา', 'Stamp')]]
      .concat(words ? [['words', '🗣️', L('พูดตาม', 'Say it')]] : []);
    body = `<div class="kidhello">${kidArt(kid) ? `<img src="${kidArt(kid, true)}" alt="">` : ''}<p>${L(`สวัสดี ${name}!`, `Hi ${name}!`)}</p></div>
<nav class="kiddays">${t.days.map((x, j) => `<button data-a="kidday" data-v="${j}" aria-pressed="${j === i}" aria-label="${L('วันที่', 'Day')} ${j + 1}">${artImg(t, j)}</button>`).join('')}</nav>
<div class="kidtiles">${tiles.map(([v, e, lbl]) => `<button data-a="kidnav" data-v="#/kid/${esc(kid)}/${v}" data-say="${esc(lbl)}"><span>${e}</span><b>${lbl}</b></button>`).join('')}</div>`;
  } else if (view === 'colour') {
    body = `<div class="colourpad colsvg" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}"></div>
<div class="palette">${COLOURS.map((c) => `<button data-a="kidcolor" data-v="${c}" style="--c:${c}" aria-pressed="${c === kidColour}" aria-label="${c}"></button>`).join('')}</div>
<button class="kidbig" data-a="kidcolourdone" data-v="#/kid/${esc(kid)}">${L('เสร็จแล้ว! ✨', 'All done! ✨')}</button>`;
  } else if (view === 'spot') {
    const spots = pd.spot || [];
    body = `<div class="kidguide">${g[1] ? `<img class="guide" src="${esc(g[1].art)}" alt="">` : ''}<p>${L(`${T((g[1] || {}).name)}: หาให้เจอนะ!`, `${T((g[1] || {}).name)}: can you find them?`)}</p></div>
<div class="kidspots">${spots.map((s) => { const on = ticked(t, `spot.d${i}.${s.k}`, kid); return `<button class="${on ? 'on' : ''}" data-a="kidspot" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="spot.d${i}.${esc(s.k)}" data-say="${esc(T(s))}" aria-pressed="${!!on}"><span>${esc(s.e)}</span><b>${esc(T(s))}</b>${on ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>`;
  } else if (view === 'stamp') {
    const mine = ticked(t, `stamp.d${i}`, kid);
    body = `<div class="kidstamp${mine ? ' done' : ''}" id="kidstamp"><div class="ring"><span class="lbl">${esc(pd.stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</span>${artImg(t, i, 'inked')}</div></div>
<div class="kidguide pop" id="kidcheer" ${mine ? '' : 'hidden'}>${g[0] ? `<img class="guide" src="${esc(g[0].art)}" alt="">` : ''}<p>${L(`เก่งมาก ${name}! ได้ตราวันนี้แล้ว`, `Well done, ${name}! Today's stamp is yours`)}</p></div>
<button class="kidbig stampbtn" data-a="kidstamp" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}">${mine ? L('ปั๊มอีกที! 🛂', 'Stamp again! 🛂') : L('ปั๊ม! 🛂', 'Stamp! 🛂')}</button>`;
  } else if (view === 'words') {
    const l = (pp.lists || []).find((x) => x.said);
    body = `<div class="kidwords">${(l ? listItems(l) : []).map((it) => { const on = ticked(t, `${l.key}.${it.k}`, kid); return `<div class="kw${on ? ' on' : ''}">
<button class="hear" data-a="kidword" data-v="${esc(it.speak ? it.speak.text : it.en)}" data-lang="${esc(it.speak ? it.speak.lang : 'en-GB')}"><span>${esc(it.e)}</span><b>${esc(it.en)}</b><small>${esc(T(it.note))}</small><i>🔊</i></button>
<button class="said" data-a="kidspot" data-t="${esc(t.id)}" data-d="" data-k="${esc(kid)}" data-v="${esc(l.key)}.${esc(it.k)}" aria-pressed="${!!on}" aria-label="${L('พูดได้แล้ว', 'I said it')}">${on ? '✓' : '🗣️'}</button></div>`; }).join('')}</div>`;
  }
  return `<div class="kidwrap" style="${style}">${head}${body}${lock}</div>`;
}

/* ---------- kid mode actions ---------- */
let colourSaveT = 0;
Object.assign(A, {
  kidmode(b) { ls('kidmode', b.dataset.v || 'pick'); nav(b.dataset.v ? `#/kid/${b.dataset.v}` : '#/kid'); },
  kidpick(b) { beep('pop'); ls('kidmode', b.dataset.v); kidDay = null; nav(`#/kid/${b.dataset.v}`); },
  kidnav(b) { beep('tap'); nav(b.dataset.v); if (b.dataset.say) sayUi(b.dataset.say); },
  kidday(b) { beep('pop'); kidDay = +b.dataset.v; render(); },
  kidcolor(b) { beep('tap'); kidColour = b.dataset.v; $$('.palette button').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === kidColour)); },
  kidcolourdone(b) { beep('chime'); burst(b, ['🎨', '✨', '⭐']); setTimeout(() => nav(b.dataset.v), 600); },
  kidspot(b) {
    if (b.dataset.say) sayUi(b.dataset.say);
    beep(b.getAttribute('aria-pressed') === 'true' ? 'tap' : 'chime');
    A.tick(b);
  },
  kidword(b) { beep('tap'); say(b.dataset.v, b.dataset.lang); },
  async kidstamp(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, kid = b.dataset.k, box = $('#kidstamp');
    box.classList.remove('done'); void box.offsetWidth; box.classList.add('done', 'slam');
    beep('thud'); setTimeout(() => beep('chime'), 350);
    burst(box, ['⭐', '✨', '🎉', '💫']);
    const cheer = $('#kidcheer'); if (cheer) cheer.hidden = false;
    sayUi(L(`เก่งมาก ${kidName(kid)}!`, `Well done, ${kidName(kid)}!`));
    const id = `${t.id}.tick.stamp.d${i}.${kid}`;
    if (!S.entries.some((e) => e.id === id)) putEntry(t, { day: i, kind: 'tick', child: kid, first_key: `stamp.d${i}`, text: '' }, id);
    if (!t.days[i].done_at) {   // the stamp ceremony finishes the day (same as "Mark day done")
      t.days[i].done_at = Date.now();
      enqueue({ method: 'PUT', url: `/api/b/days/${encodeURIComponent(t.id)}/${i}`, body: { done: true } });
    }
  },
  hear(b) { say(b.dataset.v, b.dataset.lang); },
  sayfacts(b) { sayUi(b.dataset.v); },
});
// tap a shape on the colouring page
document.addEventListener('click', (e) => {
  const el = e.target.closest && e.target.closest('.colourpad [data-c]'); if (!el || !isEditor()) return;
  const pad = el.closest('.colourpad');
  el.setAttribute('fill', kidColour); beep('pop');
  let fills = {}; try { fills = JSON.parse(pad.dataset.fill || '{}'); } catch (_) {}
  fills[el.dataset.c] = kidColour; pad.dataset.fill = JSON.stringify(fills);
  clearTimeout(colourSaveT);
  colourSaveT = setTimeout(() => {
    const t = trip(pad.dataset.t), i = +pad.dataset.d, kid = pad.dataset.k;
    putEntry(t, { day: null, kind: 'field', child: kid, first_key: `colour.d${i}`, text: pad.dataset.fill }, `${t.id}.field.colour.d${i}.${kid}`);
  }, 500);
});
// grown-ups leave kid mode by pressing and holding the lock
let holdT = 0;
document.addEventListener('pointerdown', (e) => {
  const lock = e.target.closest && e.target.closest('#kidexit'); if (!lock) return;
  lock.classList.add('holding');
  holdT = setTimeout(() => { const k = ls('kidmode'); ls('kidmode', null); beep('pop'); nav(k && k !== 'pick' ? `#/passport/${k}` : '#/'); }, 1200);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => document.addEventListener(ev, () => { clearTimeout(holdT); const l = $('#kidexit'); if (l) l.classList.remove('holding'); }, true));
