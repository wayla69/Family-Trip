'use strict';
/* ===== Memory Bookshelf · kid mode: big buttons for Mimi (3) and Mika (1½) =====
   #/kid → pick a child · #/kid/<kid> home · /colour · /draw · /spot · /stamp · /words · /count · /pack · /hearts
   Locked: while kid mode is on, every route comes back here; a grown-up exits by pressing and holding the lock (1.2 s).
   Sounds are synthesised (Web Audio), words and bedtime stories are read by the phone's own voices (speechSynthesis) —
   nothing leaves the phone. Drawings are uploaded like photos (private, never public). */

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
    else if (kind === 'creak') { tone(220, 0, 0.25, 'sawtooth', 0.05); tone(330, 0.12, 0.3, 'triangle', 0.12); }
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
// one utterance; onend runs when it finishes (or fails). Returns false when the phone can't speak.
function speak(text, langTag, opt) {
  const o = opt || {};
  if (!window.speechSynthesis || !text) return false;
  const v = voiceFor(langTag);
  if (!v && /^zh-HK$/i.test(langTag)) { toast(L('เครื่องนี้ยังไม่มีเสียงภาษากวางตุ้ง (ตั้งค่า › การช่วยการเข้าถึง › เนื้อหาที่ถูกอ่าน › เสียง)', 'No Cantonese voice on this phone yet (Settings › Accessibility › Spoken Content › Voices)')); return false; }
  try {   // never let a voice problem stop a tap from doing its job
    if (!o.keep) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langTag; u.rate = o.rate || 0.85; u.pitch = o.pitch || 1.1;
    try { if (v) u.voice = v; } catch (_) {}
    if (o.onend) { u.onend = o.onend; u.onerror = o.onend; }
    speechSynthesis.speak(u);
    return true;
  } catch (_) { return false; }
}
const say = (text, langTag) => speak(text, langTag);
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

/* ---------- finger drawing ("Draw today's best moment") → a private picture, like a photo ---------- */
const DRAW_W = 1200, DRAW_H = 900, PEN = [10, 24, 48];
let pen = PEN[1];
const pad = { key: '', strokes: [], cur: null };   // kept while the page re-renders; cleared once saved
const isDrawing = (m) => /^dr-/.test(m.id);
const drawingsOf = (t, kid, day) => mediaOf(t.id, day).filter((m) => m.id.startsWith(`dr-${kid}-`));
const drawBusy = () => !!pad.cur;   // safeRender waits while a finger is on the canvas
function paint(ctx, st, from) {
  ctx.strokeStyle = st.c; ctx.fillStyle = st.c; ctx.lineWidth = st.w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const p = st.pts;
  if (p.length === 1) { ctx.beginPath(); ctx.arc(p[0][0], p[0][1], st.w / 2, 0, Math.PI * 2); ctx.fill(); return; }
  ctx.beginPath(); ctx.moveTo(p[Math.max(0, (from || 1) - 1)][0], p[Math.max(0, (from || 1) - 1)][1]);
  for (let i = from || 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
  ctx.stroke();
}
function redraw(cv) {
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, DRAW_W, DRAW_H);
  pad.strokes.forEach((st) => paint(ctx, st));
}
function hydrateDraw(root) { const cv = $('#kidcanvas', root || document); if (cv) { if (cv.dataset.key !== pad.key) { pad.key = cv.dataset.key; pad.strokes = []; } redraw(cv); } }
const padPoint = (cv, e) => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * (DRAW_W / r.width)), Math.round((e.clientY - r.top) * (DRAW_H / r.height))]; };
document.addEventListener('pointerdown', (e) => {
  const cv = e.target.closest && e.target.closest('#kidcanvas'); if (!cv) return;
  e.preventDefault();
  try { cv.setPointerCapture(e.pointerId); } catch (_) {}
  pad.cur = { c: kidColour, w: pen, pts: [padPoint(cv, e)], id: e.pointerId };
  pad.strokes.push(pad.cur); paint(cv.getContext('2d'), pad.cur);
});
document.addEventListener('pointermove', (e) => {
  if (!pad.cur || e.pointerId !== pad.cur.id) return;
  const cv = $('#kidcanvas'); if (!cv) { pad.cur = null; return; }
  const n = pad.cur.pts.length; pad.cur.pts.push(padPoint(cv, e)); paint(cv.getContext('2d'), pad.cur, n);
});
['pointerup', 'pointercancel'].forEach((ev) => document.addEventListener(ev, (e) => { if (pad.cur && e.pointerId === pad.cur.id) pad.cur = null; }));

/* ---------- bedtime: the phone reads a story aloud while the pages turn ---------- */
let bt = null;   // {t, e, pages, p, c, playing, tok}
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// short pieces so a long story doesn't get cut off by the speech engine; Thai has few full stops, so long runs split at spaces
function storyChunks(txt) {
  const out = [];
  (txt.match(/[^.!?…。！？]+[.!?…。！？]*["”’)]*\s*/g) || [txt]).forEach((p) => {
    if (p.length <= 160) { out.push(p); return; }
    let cur = '';
    p.split(/(\s+)/).forEach((w) => { if ((cur + w).length > 120 && cur.trim()) { out.push(cur); cur = ''; } cur += w; });
    if (cur.trim()) out.push(cur);
  });
  return out.filter((x) => x.trim());
}
function storyPages(t, e) {
  const paras = e.text.split(/\n+/).map((x) => x.trim()).filter(Boolean), n = paras.length, last = t.days.length - 1;
  return paras.map((x, j) => ({ chunks: storyChunks(x), art: e.day !== null && e.day !== undefined ? e.day : Math.round((j * last) / Math.max(1, n - 1)) }));
}
function openBedtime(t, e) {
  closeBedtime();
  bt = { t, e, pages: storyPages(t, e), p: 0, c: 0, playing: false, tok: 0 };
  const box = document.createElement('div');
  box.id = 'bedtime'; box.className = 'bedtime'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', L('นิทานก่อนนอน', 'Bedtime story'));
  document.body.appendChild(box); document.body.classList.add('btopen');
  drawBt();
  btPlay(true);
}
function closeBedtime() {
  if (!bt) return;
  bt.tok++; bt = null;
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (_) {}
  const box = $('#bedtime'); if (box) box.remove();
  document.body.classList.remove('btopen');
}
function drawBt() {
  const box = $('#bedtime'); if (!box || !bt) return;
  const { t, pages, p } = bt, pg = pages[p], end = p >= pages.length;
  const kids = (t.theme.children || []).map((k) => k.slug);
  const stars = Array.from({ length: 18 }, (_, i) => `<i style="left:${(i * 53) % 100}%;top:${(i * 37) % 28}%;--d:${(i % 6) * 0.4}s">✦</i>`).join('');
  box.innerHTML = `<div class="sky" aria-hidden="true">${stars}<span class="moon">🌙</span></div>
<button class="btclose" data-a="btclose" aria-label="${L('ปิด', 'Close')}">✕</button>
<div class="btpage${reduced() ? '' : ' turn'}" id="btpage">
${end ? `<div class="btart">${castHtml(kids)}</div><p class="bttext end">${L('จบแล้ว… ฝันดีนะ 💤', 'The end… sweet dreams 💤')}</p>`
    : `<div class="btart">${artImg(t, Math.min(pg.art, t.days.length - 1))}${p === 0 ? castHtml(kids) : ''}</div>
<p class="bttext" lang="${esc(bt.e.lang || lang)}">${pg.chunks.map((c, k) => `<span class="${k === bt.c && bt.playing ? 'on' : ''}">${esc(c)}</span>`).join('')}</p>`}
</div>
<div class="btctl">
<button data-a="btprev" aria-label="${L('หน้าก่อน', 'Previous page')}"${p === 0 ? ' disabled' : ''}>◀</button>
<button class="play" data-a="btplay" aria-label="${bt.playing ? L('หยุดอ่าน', 'Pause') : L('อ่านให้ฟัง', 'Read aloud')}">${bt.playing ? '❚❚' : '▶'}</button>
<button data-a="btnext" aria-label="${L('หน้าถัดไป', 'Next page')}"${end ? ' disabled' : ''}>▶▶</button></div>
<div class="btdots">${pages.map((_, j) => `<i class="${j === p ? 'on' : ''}"></i>`).join('')}<span>${Math.min(p + 1, pages.length)}/${pages.length}</span></div>`;
}
function btHighlight() { $$('#btpage .bttext span').forEach((s, k) => s.classList.toggle('on', !!bt && bt.playing && k === bt.c)); }
function btStep() {
  if (!bt || !bt.playing) return;
  const tok = ++bt.tok, pg = bt.pages[bt.p];
  if (!pg) { bt.playing = false; drawBt(); return; }
  if (bt.c >= pg.chunks.length) {   // page done → turn the page
    bt.p++; bt.c = 0;
    if (bt.p >= bt.pages.length) { bt.playing = false; drawBt(); return; }
    drawBt(); setTimeout(() => { if (bt && bt.tok === tok) btStep(); }, 900); return;
  }
  btHighlight();
  const next = () => { if (!bt || bt.tok !== tok) return; bt.c++; setTimeout(() => { if (bt && bt.tok === tok) btStep(); }, 250); };
  const spoke = speak(pg.chunks[bt.c], bt.e.lang === 'en' ? 'en-GB' : 'th-TH', { rate: 0.8, pitch: 1.05, keep: true, onend: next });
  if (!spoke) setTimeout(next, Math.max(2500, pg.chunks[bt.c].length * 90));   // no voice on this phone: just turn the pages slowly
}
function btPlay(on) {
  if (!bt) return;
  bt.playing = on === undefined ? !bt.playing : on;
  bt.tok++;
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (_) {}
  if (bt.playing && bt.p >= bt.pages.length) { bt.p = 0; bt.c = 0; }
  drawBt();
  if (bt.playing) btStep();
}
function btGo(d) {
  if (!bt) return;
  const was = bt.playing; bt.tok++;
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (_) {}
  bt.p = Math.max(0, Math.min(bt.pages.length, bt.p + d)); bt.c = 0;
  bt.playing = was && bt.p < bt.pages.length;
  drawBt();
  if (bt.playing) btStep();
}
window.addEventListener('hashchange', closeBedtime);
document.addEventListener('keydown', (e) => { if (bt && e.key === 'Escape') closeBedtime(); });
// the story the kids can listen to on a day: that day's, else the whole trip's
const kidStory = (t, i) => S.entries.find((e) => e.trip === t.id && e.kind === 'story' && e.day === i) || S.entries.find((e) => e.trip === t.id && e.kind === 'story' && e.day === null);

/* ---------- hearts from the family ---------- */
const heartsFor = (kid) => (S.hearts || []).filter((h) => h.child === kid || h.child === 'both').sort((a, b) => b.at - a.at);
const heartLine = (h, kid) => L(`${h.from} ส่ง ${h.emoji} ให้${kidName(kid)}${h.text ? ` บอกว่า ${h.text}` : ''}`, `${h.from} sent ${kidName(kid)} ${h.emoji}${h.text ? `: ${h.text}` : ''}`);

/* ---------- countdown before the trip: one surprise door a day + "help me pack" ---------- */
// door n (0-based) of N opens N-n days before we leave: the last one the day before; all open once the trip starts
const doorOpen = (t, n, N) => dayNow(t) >= 0 || daysUntil(t) <= N - n;
const doorIn = (t, n, N) => daysUntil(t) - (N - n);
let kidDoor = null;

/* ---------- kid mode views ---------- */
let kidDay = null;
function kidTrip(kid) { const mine = kidTrips(kid); const c = curTrip(); return mine.includes(c) ? c : mine[0]; }
function kidDayOf(t) {
  if (kidDay !== null && kidDay < t.days.length) return kidDay;
  const n = dayNow(t); return n >= 0 ? n : 0;
}
const preTrip = (t) => dayNow(t) < 0 && daysUntil(t) > 0;
function viewKid(p) {
  const ks = children(), kid = p[1], k = ks.find((c) => c.slug === kid);
  if (!k) {
    return `<div class="kidwrap pick"><h1>${L('ใครจะเล่น?', 'Who is playing?')}</h1><div class="kidpick">${ks.map((c) => `<button data-a="kidpick" data-v="${esc(c.slug)}">${kidArt(c.slug) ? `<img src="${kidArt(c.slug, true)}" alt="">` : `<span>${esc(c.emoji)}</span>`}<b>${esc(kidName(c.slug))}</b></button>`).join('')}</div>
<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button></div>`;
  }
  const t = kidTrip(kid); if (!t) return `<div class="empty">${L('ยังไม่มีทริป', 'No trips yet')}</div>`;
  const pp = t.passport || {}, i = kidDayOf(t), d = t.days[i], pd = (pp.days || [])[i] || {}, g = pp.guides || [];
  const view = p[2] || 'home', name = kidName(kid), pre = preTrip(t), cd = pp.countdown;
  const fill = (x) => String(x || '').replace(/\{name\}/g, name);
  const style = `--accent:${esc(pd.acc || t.theme.accent || '#1F3A5F')};--tint:${esc(pd.tint || '#F3F6FA')}`;
  const back = `<button class="kidback" data-a="kidnav" data-v="#/kid/${esc(kid)}" aria-label="${L('กลับ', 'Back')}">‹</button>`;
  const lock = `<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button>`;
  const guideImg = (n) => (g[n] ? `<img class="guide" src="${esc(g[n].art)}" alt="">` : '');
  const head = `<header class="kidhd">${view === 'home' ? `<button class="kidme" data-a="kidnav" data-v="#/kid" aria-label="${L('เปลี่ยนคน', 'Switch child')}">${kidFace(kid)}</button>` : back}
<div class="kidday">${artImg(t, i)}<div><small>${L('วันที่', 'Day')} ${i + 1}</small><b>${esc(T(pd.title) || T(d.title))}</b></div></div></header>`;
  let body = '';
  if (view === 'home') {
    const words = (pp.lists || []).find((l) => l.said), story = kidStory(t, i);
    const fresh = heartsFor(kid).filter((h) => h.at > (ls('hseen_' + kid) || 0));
    const tiles = (pre
      ? [cd && ['count', '🎁', L('เซอร์ไพรส์', 'Surprise')], cd && cd.pack && ['pack', '🧳', L('จัดกระเป๋า', 'Pack')], ['colour', '🎨', L('ระบายสี', 'Colour')], ['draw', '🖍️', L('วาดรูป', 'Draw')]]
      : [['colour', '🎨', L('ระบายสี', 'Colour')], ['draw', '🖍️', L('วาดรูป', 'Draw')], ['spot', '🔍', L('หาของ', 'Find it')], ['stamp', '🛂', L('ปั๊มตรา', 'Stamp')]])
      .concat(words ? [['words', '🗣️', L('พูดตาม', 'Say it')]] : []).filter(Boolean);
    const until = daysUntil(t);
    body = `${fresh.length ? `<button class="kidhearts" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(heartLine(fresh[0], kid))}"><span class="float" aria-hidden="true">💗</span><span class="e">${esc(fresh[0].emoji)}</span><b>${esc(L(`${fresh[0].from} ส่งหัวใจให้หนู!`, `${fresh[0].from} sent you a heart!`))}</b>${fresh.length > 1 ? `<small>+${fresh.length - 1}</small>` : ''}</button>` : ''}
<div class="kidhello">${kidArt(kid) ? `<img src="${kidArt(kid, true)}" alt="">` : ''}<p>${pre ? L(`อีก <b>${until}</b> วันไป${esc(T(t.title).split(' · ')[0])}!`, `<b>${until}</b> ${until === 1 ? 'sleep' : 'sleeps'} to ${esc(T(t.title).split(' · ')[0])}!`) : L(`สวัสดี ${esc(name)}!`, `Hi ${esc(name)}!`)}</p></div>
<nav class="kiddays">${t.days.map((x, j) => `<button data-a="kidday" data-v="${j}" aria-pressed="${j === i}" aria-label="${L('วันที่', 'Day')} ${j + 1}">${artImg(t, j)}</button>`).join('')}</nav>
<div class="kidtiles">${tiles.map(([v, e, lbl]) => `<button data-a="kidnav" data-v="#/kid/${esc(kid)}/${v}" data-say="${esc(lbl)}"><span>${e}</span><b>${lbl}</b></button>`).join('')}
${story ? `<button class="night" data-a="bedtime" data-v="${esc(story.id)}"><span>🌙</span><b>${L('นิทาน', 'Story')}</b></button>` : ''}
${heartsFor(kid).length && !fresh.length ? `<button class="love" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(L('หัวใจจากครอบครัว', 'Hearts from the family'))}"><span>💗</span><b>${heartsFor(kid).length}</b></button>` : ''}</div>`;
  } else if (view === 'colour') {
    body = `<div class="colourpad colsvg" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}"></div>
<div class="palette">${COLOURS.map((c) => `<button data-a="kidcolor" data-v="${c}" style="--c:${c}" aria-pressed="${c === kidColour}" aria-label="${c}"></button>`).join('')}</div>
<button class="kidbig" data-a="kidcolourdone" data-v="#/kid/${esc(kid)}">${L('เสร็จแล้ว! ✨', 'All done! ✨')}</button>`;
  } else if (view === 'draw') {
    const day = pre ? null : i, mine = drawingsOf(t, kid, day === null ? undefined : day).filter((m) => m.day === day);
    body = `<div class="kidguide">${guideImg(1)}<p>${pre ? L(`วาดสิ่งที่อยากเจอที่${esc(T(t.title).split(' · ')[0])}`, `Draw what you want to see in ${esc(T(t.title).split(' · ')[0])}`) : L('วาดสิ่งที่ชอบที่สุดวันนี้!', "Draw today's best moment!")}</p></div>
<div class="drawpad"><canvas id="kidcanvas" width="${DRAW_W}" height="${DRAW_H}" data-key="${esc(`${t.id}:${day}:${kid}`)}" aria-label="${L('กระดานวาดรูป', 'Drawing board')}"></canvas></div>
<div class="palette">${COLOURS.map((c) => `<button data-a="kidcolor" data-v="${c}" style="--c:${c}" aria-pressed="${c === kidColour}" aria-label="${c === '#FFFFFF' ? L('ยางลบ', 'Eraser') : c}"></button>`).join('')}</div>
<div class="drawtools">${PEN.map((w) => `<button data-a="kidpen" data-v="${w}" aria-pressed="${w === pen}" aria-label="${L('ขนาดพู่กัน', 'Brush')} ${w}"><i style="width:${Math.round(w / 2) + 6}px;height:${Math.round(w / 2) + 6}px"></i></button>`).join('')}
<button data-a="kidundo" aria-label="${L('ย้อนกลับ', 'Undo')}">↶</button><button data-a="kidclear" aria-label="${L('ล้างทั้งหมด', 'Clear')}">🧽</button></div>
<button class="kidbig" data-a="kiddrawdone" data-t="${esc(t.id)}" data-d="${day === null ? '' : day}" data-k="${esc(kid)}">${L('เก็บรูปนี้! ✨', 'Keep it! ✨')}</button>
${mine.length ? `<div class="drawn">${mine.map((m) => `<img src="${esc(imgT(m))}" alt="">`).join('')}</div>` : ''}`;
  } else if (view === 'spot') {
    const spots = pd.spot || [];
    body = `<div class="kidguide">${guideImg(1)}<p>${L(`${T((g[1] || {}).name)}: หาให้เจอนะ!`, `${T((g[1] || {}).name)}: can you find them?`)}</p></div>
<div class="kidspots">${spots.map((s) => { const on = ticked(t, `spot.d${i}.${s.k}`, kid); return `<button class="${on ? 'on' : ''}" data-a="kidspot" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="spot.d${i}.${esc(s.k)}" data-say="${esc(T(s))}" aria-pressed="${!!on}"><span>${esc(s.e)}</span><b>${esc(T(s))}</b>${on ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>`;
  } else if (view === 'stamp') {
    const mine = ticked(t, `stamp.d${i}`, kid);
    body = `<div class="kidstamp${mine ? ' done' : ''}" id="kidstamp"><div class="ring"><span class="lbl">${esc(pd.stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</span>${artImg(t, i, 'inked')}</div></div>
<div class="kidguide pop" id="kidcheer" ${mine ? '' : 'hidden'}>${guideImg(0)}<p>${L(`เก่งมาก ${name}! ได้ตราวันนี้แล้ว`, `Well done, ${name}! Today's stamp is yours`)}</p></div>
<button class="kidbig stampbtn" data-a="kidstamp" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}">${mine ? L('ปั๊มอีกที! 🛂', 'Stamp again! 🛂') : L('ปั๊ม! 🛂', 'Stamp! 🛂')}</button>`;
  } else if (view === 'words') {
    const l = (pp.lists || []).find((x) => x.said);
    body = `<div class="kidwords">${(l ? listItems(l) : []).map((it) => { const on = ticked(t, `${l.key}.${it.k}`, kid); return `<div class="kw${on ? ' on' : ''}">
<button class="hear" data-a="kidword" data-v="${esc(it.speak ? it.speak.text : it.en)}" data-lang="${esc(it.speak ? it.speak.lang : 'en-GB')}"><span>${esc(it.e)}</span><b>${esc(it.en)}</b><small>${esc(T(it.note))}</small><i>🔊</i></button>
<button class="said" data-a="kidspot" data-t="${esc(t.id)}" data-d="" data-k="${esc(kid)}" data-v="${esc(l.key)}.${esc(it.k)}" aria-pressed="${!!on}" aria-label="${L('พูดได้แล้ว', 'I said it')}">${on ? '✓' : '🗣️'}</button></div>`; }).join('')}</div>`;
  } else if (view === 'count' && cd) {
    const N = cd.doors.length, door = kidDoor !== null ? cd.doors[kidDoor] : null;
    body = `<div class="kidguide">${guideImg(0)}<p>${L('เปิดได้วันละประตู!', 'One door a day!')}</p></div>
<div class="doors">${cd.doors.map((x, n) => { const opened = ticked(t, `cd.${n + 1}`, kid), can = doorOpen(t, n, N); return `<button class="door${opened ? ' opened' : can ? ' ready' : ' locked'}" data-a="kiddoor" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${n}" aria-label="${L('ประตู', 'Door')} ${n + 1}"><b>${n + 1}</b><span>${opened ? esc(x.e) : can ? '🎁' : '🔒'}</span></button>`; }).join('')}</div>
${door ? `<div class="doorcard" id="doorcard" role="dialog" aria-label="${L('เซอร์ไพรส์', 'Surprise')}"><div class="in">
${door.art !== undefined ? artImg(t, Math.min(door.art, t.days.length - 1), 'big') : `<span class="big">${esc(door.e)}</span>`}
<div class="kidguide">${guideImg(kidDoor % 2)}<p>${esc(fill(T(door)))}</p></div>
<div class="row">${door.speak ? `<button class="kidbig ghost" data-a="kidword" data-v="${esc(door.speak.text)}" data-lang="${esc(door.speak.lang)}">🔊 ${esc(door.speak.text)}</button>` : `<button class="kidbig ghost" data-a="sayfacts" data-v="${esc(fill(T(door)))}">🔊</button>`}
<button class="kidbig" data-a="kiddoorclose">${L('เย้!', 'Yay!')}</button></div></div></div>` : ''}`;
  } else if (view === 'pack' && cd && cd.pack) {
    const items = cd.pack.items, n = items.filter((x) => ticked(t, `pack.${x.k}`, kid)).length;
    body = `<div class="kidguide">${guideImg(1)}<p>${n >= items.length ? L('กระเป๋าพร้อมแล้ว! เก่งมาก 🎉', 'Bag packed! Brilliant 🎉') : esc(fill(T(cd.pack.title)))}</p></div>
<div class="kidspots">${items.map((s) => { const on = ticked(t, `pack.${s.k}`, kid); return `<button class="${on ? 'on' : ''}" data-a="kidspot" data-t="${esc(t.id)}" data-d="" data-k="${esc(kid)}" data-v="pack.${esc(s.k)}" data-say="${esc(T(s))}" aria-pressed="${!!on}"><span>${esc(s.e)}</span><b>${esc(T(s))}</b>${on ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>`;
  } else if (view === 'hearts') {
    const hs = heartsFor(kid), seen = ls('hseen_' + kid) || 0;
    if (hs.length) ls('hseen_' + kid, Math.max(seen, hs[0].at));
    body = `<div class="kidhearts-list">${hs.map((h) => `<button class="${h.at > seen ? 'new' : ''}" data-a="kidheart" data-v="${esc(heartLine(h, kid))}"><span class="e">${esc(h.emoji)}</span><b>${esc(h.from)}</b>${h.text ? `<p>${esc(h.text)}</p>` : ''}<i>🔊</i></button>`).join('') || `<p class="kidguide"><span>${L('ยังไม่มีหัวใจ', 'No hearts yet')}</span></p>`}</div>`;
  } else body = `<button class="kidbig" data-a="kidnav" data-v="#/kid/${esc(kid)}">🏠</button>`;
  return `<div class="kidwrap" style="${style}">${head}${body}${lock}</div>`;
}

/* ---------- kid mode actions ---------- */
let colourSaveT = 0;
Object.assign(A, {
  kidmode(b) { ls('kidmode', b.dataset.v || 'pick'); nav(b.dataset.v ? `#/kid/${b.dataset.v}` : '#/kid'); },
  kidpick(b) { beep('pop'); ls('kidmode', b.dataset.v); kidDay = null; nav(`#/kid/${b.dataset.v}`); },
  kidnav(b) { beep('tap'); kidDoor = null; nav(b.dataset.v); if (b.dataset.say) sayUi(b.dataset.say); },
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
  // drawing
  kidpen(b) { beep('tap'); pen = +b.dataset.v; $$('.drawtools [data-a="kidpen"]').forEach((x) => x.setAttribute('aria-pressed', +x.dataset.v === pen)); },
  kidundo() { beep('tap'); pad.strokes.pop(); const cv = $('#kidcanvas'); if (cv) redraw(cv); },
  kidclear(b) { if (!pad.strokes.length) return; if (!b.dataset.armed) { b.dataset.armed = '1'; b.classList.add('armed'); setTimeout(() => { delete b.dataset.armed; b.classList.remove('armed'); }, 2500); beep('tap'); return; } pad.strokes = []; beep('pop'); const cv = $('#kidcanvas'); if (cv) redraw(cv); },
  kiddrawdone(b) {
    const cv = $('#kidcanvas'), t = trip(b.dataset.t), kid = b.dataset.k, day = b.dataset.d === '' ? null : +b.dataset.d;
    if (!cv || !pad.strokes.length) { sayUi(L('วาดอะไรสักหน่อยก่อนนะ', 'Draw something first!')); return; }
    redraw(cv);
    cv.toBlob(async (blob) => {
      if (!blob) return;
      const id = `dr-${kid}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, at = Date.now();
      const caption = `🖍️ ${kidName(kid)}`;
      pad.strokes = []; pad.key = '';
      beep('chime'); burst(b, ['🖍️', '✨', '⭐']); sayUi(L(`สวยมาก ${kidName(kid)}!`, `Beautiful, ${kidName(kid)}!`));
      await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day === null ? '' : day}&at=${at}&caption=${encodeURIComponent(caption)}`, blob,
        local: { coll: 'media', id, row: { trip: t.id, day, caption, highlight: false, at, w: DRAW_W, h: DRAW_H } } });
      setTimeout(() => nav(`#/kid/${kid}`), 700);
    }, 'image/jpeg', 0.9);
  },
  // countdown doors
  kiddoor(b) {
    const t = trip(b.dataset.t), kid = b.dataset.k, n = +b.dataset.v, cd = t.passport.countdown, N = cd.doors.length;
    if (!doorOpen(t, n, N)) { beep('tap'); const x = doorIn(t, n, N); sayUi(L(`ประตูนี้เปิดได้อีก ${x} วัน`, `This door opens in ${x} ${x === 1 ? 'day' : 'days'}`)); return; }
    const id = `${t.id}.tick.cd.${n + 1}.${kid}`;
    if (!S.entries.some((e) => e.id === id)) putEntry(t, { day: null, kind: 'tick', child: kid, first_key: `cd.${n + 1}`, text: '' }, id);
    kidDoor = n; beep('creak'); setTimeout(() => beep('chime'), 250);
    render();
    burst($('#doorcard .in') || b, ['🎁', '✨', '🎉', '⭐']);
    sayUi(String(T(cd.doors[n])).replace(/\{name\}/g, kidName(kid)));
  },
  kiddoorclose() { beep('pop'); kidDoor = null; render(); },
  kidheart(b) { beep('pop'); burst(b, ['💗', '💕', '✨']); sayUi(b.dataset.v); },
  // bedtime story player (kid mode and the book)
  bedtime(b) { const e = S.entries.find((x) => x.id === b.dataset.v); if (e) openBedtime(trip(e.trip), e); },
  btclose() { closeBedtime(); },
  btplay() { btPlay(); },
  btnext() { btGo(1); },
  btprev() { btGo(-1); },
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
