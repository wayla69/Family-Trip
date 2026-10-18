'use strict';
/* ===== Memory Bookshelf · kid mode: big buttons for Mimi (3) and Mika (1½) =====
   #/kid → pick a child · #/kid/<kid> home (pages of four huge tiles, swipe or arrows) · /colour · /draw · /spot · /stamp · /words
   · /count (surprise doors) · /pack · /map · /quiz · /stickers · /hearts · /photos · /match · /mood · /animals · /numbers · /trophies
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
const drawBusy = () => !!pad.cur || (typeof stk !== 'undefined' && !!stk);   // safeRender waits while a finger is drawing or dragging a sticker
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

/* ---------- living map: Mimi and Mika walk the route, day by day (seed passport.map, hand-placed pins) ---------- */
const MAP_W = 400, MAP_H = 300;
let mapFrom = null;   // where the walkers start on the next draw (they walk to the day's stop)
let kidEnter = false;
let mapAt = null;   // the stop a kid tapped (several stops can share a day)   // this render opens a new kid page (set by render())
function mapModel(t) {
  const m = (t.passport || {}).map; if (!m || !m.stops) return null;
  const at = Object.fromEntries(m.stops.map((s) => [s.k, s]));
  const seq = [];   // the stops in the order we reach them; staying put is one stop
  (m.days || []).forEach((ks, d) => ks.forEach((k) => { if (at[k] && (!seq.length || seq[seq.length - 1].k !== k)) seq.push({ k, day: d }); }));
  const P = (k) => [at[k].x * MAP_W / 100, at[k].y * MAP_H / 100];
  const hops = seq.slice(1).map((v, j) => {   // gentle arcs, alternating sides, so out-and-back trips show two paths
    const a = P(seq[j].k), b = P(v.k), bend = (j % 2 ? 1 : -1) * 0.22;
    const cx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, cy = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend;
    return { day: v.day, d: `M${a[0]},${a[1]} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b[0]},${b[1]}` };
  });
  return { m, at, seq, hops };
}
// index into seq where the kids are at the end of day i
const mapPos = (mm, i) => { let p = 0; mm.seq.forEach((v, j) => { if (v.day <= i) p = j; }); return p; };
// the day shown on a passport map: today on the trip, the last day after it, the first before it
const mapDayOf = (t) => { const n = dayNow(t); return n >= 0 ? n : tripOver(t) ? t.days.length - 1 : 0; };
function mapHtml(t, day, kids, at) {
  const mm = mapModel(t); if (!mm) return '';
  const pos = at !== undefined && at !== null && mm.seq[at] && mm.seq[at].day === day ? at : mapPos(mm, day), here = mm.seq[pos].k, been = new Set(mm.seq.slice(0, pos + 1).map((v) => v.k));
  const s0 = mm.at[here];
  const waves = Array.from({ length: 14 }, (_, j) => `<text class="wave" x="${(j * 83) % 380 + 10}" y="${(j * 47) % 270 + 20}">〰</text>`).join('');
  return `<div class="tmap" data-t="${esc(t.id)}" data-pos="${pos}">
<svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="${esc(T(mm.m.title))}">
<rect class="sea" x="2" y="2" width="${MAP_W - 4}" height="${MAP_H - 4}" rx="18"/>${waves}
<text class="sealbl" x="${MAP_W - 14}" y="${MAP_H - 12}">${esc(T(mm.m.sea))}</text>
<g class="compass" transform="translate(30,40)"><circle r="15"/><path d="M0,-12 L4,0 L0,12 L-4,0Z"/><text y="-18">N</text></g>
${mm.hops.map((h, j) => `<path class="hop${j < pos ? ' done' : ''}" id="hop${j}" d="${h.d}"/>`).join('')}
${mm.m.stops.filter((s) => mm.seq.some((v) => v.k === s.k)).map((s) => `<g class="pin${been.has(s.k) ? ' on' : ''}${s.k === here ? ' here' : ''}" data-a="mappin" data-t="${esc(t.id)}" data-v="${esc(s.k)}" data-say="${esc(T(s))}" transform="translate(${s.x * MAP_W / 100},${s.y * MAP_H / 100})" role="button" aria-label="${esc(T(s))}"><circle r="17"/><text class="e" y="6">${esc(s.e)}</text><text class="lbl" y="31">${esc(T(s))}</text></g>`).join('')}
</svg>
<div class="walkers" style="left:${s0.x}%;top:${s0.y}%" aria-hidden="true">${kids.filter((k) => kidArt(k)).map((k) => `<img class="${esc(k)}" src="${kidArt(k, true)}" alt="">`).join('')}</div></div>`;
}
// walk the kids from mapFrom to the stop of this map (one hop after another, along the drawn paths)
function hydrateMap(root) {
  const box = $('.tmap', root || document); if (!box) return;
  const to = +box.dataset.pos, from = mapFrom; mapFrom = null;
  const w = $('.walkers', box), mm = mapModel(trip(box.dataset.t));
  if (!w || !mm || from === null || from === to || from >= mm.seq.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const put = (x, y) => { w.style.left = `${(x / MAP_W) * 100}%`; w.style.top = `${(y / MAP_H) * 100}%`; };
  const steps = [], dir = to > from ? 1 : -1;
  for (let j = from; j !== to; j += dir) steps.push(dir > 0 ? j : j - 1);   // hop j goes from seq[j] to seq[j+1]
  const s0 = mm.at[mm.seq[from].k]; put(s0.x * MAP_W / 100, s0.y * MAP_H / 100);
  w.classList.add('walking');
  let n = 0, t0 = 0;
  const tick = (now) => {
    if (!w.isConnected) return;
    const path = $(`#hop${steps[n]}`, box); if (!path) { w.classList.remove('walking'); return; }
    t0 = t0 || now;
    const k = Math.min(1, (now - t0) / 900), len = path.getTotalLength(), pt = path.getPointAtLength(len * (dir > 0 ? k : 1 - k));
    put(pt.x, pt.y);
    if (k < 1) return requestAnimationFrame(tick);
    n++; t0 = 0;
    if (n < steps.length) requestAnimationFrame(tick); else { w.classList.remove('walking'); beep('pop'); }
  };
  requestAnimationFrame(tick);
}

/* ---------- stickers: every mission ticked earns one; drag them onto your sticker page ---------- */
function stickerSet(t, kid) {
  const pp = t.passport || {}, out = [], seen = new Set();
  const add = (k, e, img, got) => { if (seen.has(k) || (!e && !img)) return; seen.add(k); out.push({ k, e, img, got: !!got }); };
  t.days.forEach((_, i) => add(`stamp.d${i}`, '', dayArt(t, i), dayStamped(t, i)));
  (pp.days || []).forEach((pd, i) => (pd.spot || []).forEach((s) => add(`spot.d${i}.${s.k}`, s.e, '', ticked(t, `spot.d${i}.${s.k}`, kid))));
  (pp.lists || []).forEach((l) => listItems(l).forEach((it) => { const x = ticked(t, `${l.key}.${it.k}`, kid); add(`${l.key}.${it.k}`, it.e, '', x && x.text !== 'yuck'); }));
  ((pp.countdown || {}).doors || []).forEach((d, n) => add(`cd.${n + 1}`, d.e, '', ticked(t, `cd.${n + 1}`, kid)));
  entriesOf(t.id).filter((e) => e.kind === 'first' && e.child === kid && e.first_key !== 'custom').forEach((e) => add(`first.${e.first_key}`, firstLabel(t, e.first_key).e, '', true));
  return out;
}
const STK_MAX = 120;
const stickersPlaced = (t, kid) => { try { const a = JSON.parse(fieldVal(t, 'stickers', kid) || '[]'); return Array.isArray(a) ? a : []; } catch (_) { return []; } };
const stkFace = (s) => (s.img ? `<img src="${esc(s.img)}" alt="" draggable="false">` : esc(s.e));
function stickerBoard(t, kid, edit) {
  const set = stickerSet(t, kid), by = Object.fromEntries(set.map((s) => [s.k, s]));
  const placed = stickersPlaced(t, kid).filter((p) => by[p[0]] && by[p[0]].got), used = new Set(placed.map((p) => p[0]));
  const tray = set.filter((s) => s.got && !used.has(s.k)), got = set.filter((s) => s.got).length;
  const st = (t.passport || {}).style || {};
  return `<div class="stkboard${edit ? ' edit' : ''}" id="stkboard" data-t="${esc(t.id)}" data-k="${esc(kid)}" style="--bgA:${esc(st.bgA || '#FFF6E5')};--bgB:${esc(st.bgB || '#E8F4FF')}">
<span class="stkhd">⭐ ${esc(kidName(kid))} · ${got}/${set.length}</span>
${placed.map((p, i) => `<span class="stk on${by[p[0]].img ? ' img' : ''}" data-i="${i}" style="left:${+p[1]}%;top:${+p[2]}%;--r:${+p[3] || 0}deg">${stkFace(by[p[0]])}</span>`).join('')}
${!placed.length ? `<p class="stkempty">${edit ? L('ลากสติกเกอร์มาแปะตรงนี้!', 'Drag your stickers here!') : L('ยังไม่ได้แปะสติกเกอร์', 'No stickers yet')}</p>` : ''}</div>
${edit ? `<div class="stktray" id="stktray">${tray.map((s) => `<button class="stk${s.img ? ' img' : ''}" data-k="${esc(s.k)}" aria-label="${L('สติกเกอร์', 'Sticker')}">${stkFace(s)}</button>`).join('')
    || `<p class="label">${got ? L('แปะครบทุกอันแล้ว! 🎉', 'All your stickers are on the page! 🎉') : L('ทำภารกิจ ติ๊กของที่เจอ แล้วจะได้สติกเกอร์', 'Do missions and tick what you spot to earn stickers')}</p>`}</div>` : ''}`;
}
function saveStickers(t, kid, arr) {
  putEntry(t, { day: null, kind: 'field', child: kid, first_key: 'stickers', text: JSON.stringify(arr.slice(-STK_MAX)) }, `${t.id}.field.stickers.${kid}`);
}
let stk = null;   // a sticker being dragged
document.addEventListener('pointerdown', (e) => {
  const el = e.target.closest && e.target.closest('.stktray .stk, .stkboard.edit .stk'); if (!el || !isEditor()) return;
  e.preventDefault();
  stk = { el, x0: e.clientX, y0: e.clientY, ghost: null, id: e.pointerId };
});
document.addEventListener('pointermove', (e) => {
  if (!stk || e.pointerId !== stk.id) return;
  if (!stk.ghost && Math.hypot(e.clientX - stk.x0, e.clientY - stk.y0) < 8) return;
  if (!stk.ghost) { stk.ghost = document.createElement('div'); stk.ghost.className = 'stkghost' + (stk.el.classList.contains('img') ? ' img' : ''); stk.ghost.innerHTML = stk.el.innerHTML; document.body.appendChild(stk.ghost); stk.el.classList.add('lifted'); beep('tap'); }
  stk.ghost.style.left = e.clientX + 'px'; stk.ghost.style.top = e.clientY + 'px';
});
['pointerup', 'pointercancel'].forEach((ev) => document.addEventListener(ev, (e) => {
  if (!stk || e.pointerId !== stk.id) return;
  const s = stk; stk = null;
  if (s.ghost) s.ghost.remove();
  s.el.classList.remove('lifted');
  const board = $('#stkboard'); if (!board || ev === 'pointercancel') return;
  const t = trip(board.dataset.t), kid = board.dataset.k, arr = stickersPlaced(t, kid), r = board.getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  const x = Math.round(Math.min(94, Math.max(6, ((e.clientX - r.left) / r.width) * 100))), y = Math.round(Math.min(92, Math.max(10, ((e.clientY - r.top) / r.height) * 100)));
  const rot = Math.round(Math.random() * 24 - 12);
  if (s.el.dataset.k) {   // from the tray: drop it on the page, or a tap puts it somewhere
    if (s.ghost && !inside) return;
    arr.push(s.ghost ? [s.el.dataset.k, x, y, rot] : [s.el.dataset.k, Math.round(10 + Math.random() * 80), Math.round(16 + Math.random() * 72), rot]);
    beep('pop'); burst(s.ghost ? { getBoundingClientRect: () => ({ left: e.clientX, top: e.clientY, width: 0, height: 0 }) } : s.el, ['⭐', '✨']);
  } else {   // on the page: move it, or drag it off to peel it back into the tray
    const i = +s.el.dataset.i; if (!arr[i] || !s.ghost) { s.el.classList.remove('wig'); void s.el.offsetWidth; s.el.classList.add('wig'); beep('tap'); return; }
    if (inside) { arr[i][1] = x; arr[i][2] = y; beep('pop'); } else { arr.splice(i, 1); beep('tap'); }
  }
  saveStickers(t, kid, arr);
}));
const stkBusy = () => !!stk;

/* ---------- the new games: photos, pairs, mood, animals, counting, trophies ---------- */
const kidPhotos = (t, i) => { const all = mediaOf(t.id).filter((m) => !isDrawing(m)), today = all.filter((m) => m.day === i); return today.concat(all.filter((m) => m.day !== i)); };
let kidPhoto = 0, kidPage = 0;
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let mg = null;   // pairs game: {t, kid, cards:[{k, img|e}], up:[card indexes face up], done:Set(k), moves, won}
function matchDeck(t) {
  const faces = []; t.days.forEach((_, i) => { const a = dayArt(t, i); if (a) faces.push({ k: 'd' + i, img: a }); });
  ((t.passport || {}).days || []).forEach((pd, i) => (pd.spot || []).forEach((s) => faces.push({ k: `s${i}.${s.k}`, e: s.e })));
  if (faces.length < 6) ['🐨', '🦘', '🐬', '🐼', '🚢', '✈️'].forEach((e, i) => faces.push({ k: 'x' + i, e }));
  const pick = shuffle(faces).slice(0, 6); return shuffle(pick.concat(pick));
}
const newMatch = (t, kid) => { mg = { t: t.id, kid, cards: matchDeck(t), up: [], done: new Set(), moves: 0, won: false }; };
let cnt = null;   // counting game: {n, e, hit:[card indexes in the order tapped]}
const NUMW = { th: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ'], en: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'] };
function newCount(t) {
  const wild = ((t.info || {}).wild || []), pool = wild.length ? wild.map((w) => w.emo) : t.days.map((d) => d.emoji).filter(Boolean);
  cnt = { n: 3 + Math.floor(Math.random() * 8), e: pool[Math.floor(Math.random() * pool.length)] || '⭐', hit: [] };
}
const MOODW = { '😄': ['ดีใจ', 'happy'], '🥰': ['มีความสุขมาก', 'loved'], '🤩': ['ตื่นเต้น', 'excited'], '😋': ['อร่อย', 'yummy'], '😴': ['ง่วง', 'sleepy'], '😢': ['เศร้า', 'sad'] };
// trophies are read off what the child already did — nothing new is stored except which ones were seen
function trophies(t, kid) {
  const pp = t.passport || {}, info = t.info || {}, days = t.days.length;
  const stamps = t.days.filter((_, j) => ticked(t, `stamp.d${j}`, kid)).length;
  const colours = S.entries.filter((e) => e.trip === t.id && e.kind === 'field' && e.child === kid && /^colour\./.test(e.first_key)).length;
  const draws = mediaOf(t.id).filter((m) => m.id.startsWith(`dr-${kid}-`)).length;
  const said = (pp.lists || []).filter((l) => l.said).reduce((n, l) => n + listGot(t, l, kid).length, 0);
  const spotsAll = (pp.days || []).some((pd, j) => (pd.spot || []).length && pd.spot.every((x) => ticked(t, `spot.d${j}.${x.k}`, kid)));
  const stk = stickersPlaced(t, kid).length, hearts = heartsFor(kid).length, wins = ls('match_' + kid) || 0;
  const wildN = (info.wild || []).filter((_, n) => ticked(t, `wild.${n}`, kid)).length;
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first' && e.child === kid).length;
  const doorsAll = ((pp.countdown || {}).doors || []).length, doors = ((pp.countdown || {}).doors || []).filter((_, n) => ticked(t, `cd.${n + 1}`, kid)).length;
  const packAll = (((pp.countdown || {}).pack || {}).items || []), packed = packAll.filter((x) => ticked(t, `pack.${x.k}`, kid)).length;
  // the first three can be earned before we leave (surprise doors, packing) so the shelf is never all locks
  return [
    doorsAll ? ['door1', '🚪', L('เปิดประตูแรก', 'First door opened'), doors >= 1] : null,
    packAll.length ? ['packed', '🧳', L('ช่วยจัดกระเป๋า', 'Packing helper'), packed >= Math.min(5, packAll.length)] : null,
    doorsAll > 1 ? ['doorhalf', '🗓️', L('นับถอยหลังครึ่งทาง', 'Halfway there'), doors >= Math.ceil(doorsAll / 2)] : null,
    ['stamp1', '🛂', L('ตราแรก', 'First stamp'), stamps >= 1],
    ['stamp3', '🏅', L('นักสะสมตรา', 'Stamp collector'), stamps >= 3],
    ['stampall', '👑', L('ครบทุกวัน!', 'Every day stamped!'), days > 0 && stamps >= days],
    ['colour', '🎨', L('จิตรกรน้อย', 'Little painter'), colours >= 1],
    ['draw', '🖍️', L('นักวาด', 'Artist'), draws >= 1],
    ['words', '🗣️', L('พูดได้ 5 คำ', '5 words said'), said >= 5],
    ['spot', '🔍', L('ตาไว', 'Eagle eyes'), spotsAll],
    ['stickers', '⭐', L('สติกเกอร์ 10 ชิ้น', '10 stickers'), stk >= 10],
    ['hearts', '💗', L('ที่รักของทุกคน', 'Everyone’s darling'), hearts >= 5],
    ['match', '🧩', L('นักจับคู่', 'Pair finder'), wins >= 1],
    (info.wild || []).length ? ['wild', '🦘', L('นักดูสัตว์', 'Animal spotter'), wildN >= 3] : null,
    ['firsts', '🌟', L('ครั้งแรก 3 อย่าง', '3 firsts'), firsts >= 3],
    doorsAll ? ['doors', '🎁', L('เปิดครบทุกประตู', 'All doors opened'), doors >= doorsAll] : null,
    ['explorer', '🧭', L('นักสำรวจตัวจริง', 'Master Explorer'), certEarned(t, kid)],
  ].filter(Boolean);
}
// the home pager: keep the page across re-renders, move the dots and arrows with the scroll
function hydratePager(root) {
  const pg = $('#kidpager', root || document); if (!pg) return;
  const n = pg.children.length, w = () => pg.clientWidth || 1;
  const show = () => { const k = Math.min(n - 1, Math.max(0, Math.round(pg.scrollLeft / w()))); kidPage = k; $$('#kdots i').forEach((d, j) => d.classList.toggle('on', j === k)); const pv = $('.kparrow.prev'), nx = $('.kparrow.next'); if (pv) pv.hidden = k === 0; if (nx) nx.hidden = k >= n - 1; };
  if (kidPage) pg.scrollLeft = kidPage * w();
  pg.addEventListener('scroll', () => { clearTimeout(pg._t); pg._t = setTimeout(show, 60); }, { passive: true }); show();
}

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
  const view = p[2] || 'home', name = kidName(kid), pre = preTrip(t), cd = pp.countdown, wild = ((t.info || {}).wild || []);
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
      .concat(words ? [['words', '🗣️', L('พูดตาม', 'Say it')]] : [], [['stickers', '⭐', L('สติกเกอร์', 'Stickers')]], pp.map ? [['map', '🗺️', L('แผนที่', 'Map')]] : [], ((d.plan || {}).quiz || []).length ? [['quiz', '❓', L('ทายซิ', 'Quiz')]] : [],
        kidPhotos(t, i).length ? [['photos', '📸', L('ดูรูป', 'Photos')]] : [], [['match', '🧩', L('จับคู่', 'Match')]], pre ? [] : [['mood', '😊', L('วันนี้รู้สึก', 'My mood')]],
        wild.length ? [['animals', '🦘', L('สัตว์', 'Animals')]] : [], [['numbers', '🔢', L('นับเลข', 'Count')]], [['trophies', '🏆', L('รางวัล', 'Trophies')]]).filter(Boolean);
    const until = daysUntil(t);
    const btns = tiles.map(([v, e, lbl]) => `<button data-a="kidnav" data-v="#/kid/${esc(kid)}/${v}" data-say="${esc(lbl)}"><span>${e}</span><b>${lbl}</b></button>`)
      .concat(story ? [`<button class="night" data-a="bedtime" data-v="${esc(story.id)}"><span>🌙</span><b>${L('นิทาน', 'Story')}</b></button>`] : [],
        heartsFor(kid).length && !fresh.length ? [`<button class="love" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(L('หัวใจจากครอบครัว', 'Hearts from the family'))}"><span>💗</span><b>${heartsFor(kid).length}</b></button>`] : []);
    const pages = []; for (let k = 0; k < btns.length; k += 4) pages.push(btns.slice(k, k + 4));
    body = `${fresh.length ? `<button class="kidhearts" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(heartLine(fresh[0], kid))}"><span class="float" aria-hidden="true">💗</span><span class="e">${esc(fresh[0].emoji)}</span><b>${esc(L(`${fresh[0].from} ส่งหัวใจให้หนู!`, `${fresh[0].from} sent you a heart!`))}</b>${fresh.length > 1 ? `<small>+${fresh.length - 1}</small>` : ''}</button>` : ''}
<div class="kidhello">${kidArt(kid) ? `<img src="${kidArt(kid, true)}" alt="">` : ''}<p>${pre ? L(`อีก <b>${until}</b> วันไป${esc(T(t.title).split(' · ')[0])}!`, `<b>${until}</b> ${until === 1 ? 'sleep' : 'sleeps'} to ${esc(T(t.title).split(' · ')[0])}!`) : L(`สวัสดี ${esc(name)}! วันนี้เล่นอะไรดี?`, `Hello ${esc(name)}! What shall we play?`)}</p></div>
<nav class="kiddays">${t.days.map((x, j) => `<button data-a="kidday" data-v="${j}" aria-pressed="${j === i}" aria-label="${L('วันที่', 'Day')} ${j + 1}">${artImg(t, j)}</button>`).join('')}</nav>
<div class="kidpagerwrap"><button class="kparrow prev" data-a="kidpage" data-v="-1" aria-label="${L('หน้าก่อน', 'Previous page')}" hidden>‹</button>
<div class="kidpager" id="kidpager">${pages.map((pg, n) => `<div class="kpage kidtiles" data-n="${n}">${pg.join('')}</div>`).join('')}</div>
<button class="kparrow next" data-a="kidpage" data-v="1" aria-label="${L('หน้าถัดไป', 'Next page')}"${pages.length > 1 ? '' : ' hidden'}>›</button></div>
${pages.length > 1 ? `<div class="kdots" id="kdots">${pages.map((_, n) => `<i${n === 0 ? ' class="on"' : ''}></i>`).join('')}</div>` : ''}`;
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
  } else if (view === 'map' && pp.map) {
    if (mapFrom === null && kidEnter && !pre && i > 0) mapFrom = mapPos(mapModel(t), Math.max(0, i - 1));   // walk in from yesterday's stop
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะหมุด แล้วเราจะเดินไปด้วยกัน!', "Tap a pin and we'll walk there!")}</p></div>
${mapHtml(t, i, [kid].concat((t.theme.children || []).map((c) => c.slug).filter((s) => s !== kid)), mapAt !== null ? mapAt : pre ? 0 : null)}`;
  } else if (view === 'quiz' && ((d.plan || {}).quiz || []).length) {
    body = `<div class="kidguide">${guideImg(1)}<p>${L('แตะการ์ดเพื่อดูคำตอบ!', 'Tap a card to see the answer!')}</p></div>
<div class="kidquiz">${d.plan.quiz.map((q, n) => `<button class="qcard" data-a="kidquiz" data-v="${n}" data-q="${esc(T(q.q))}" data-ans="${esc(T(q.a))}" aria-pressed="false"><small>${L('คำถาม', 'Question')} ${n + 1}</small><b>${esc(T(q.q))}</b><span class="ans" hidden>${esc(T(q.a))}</span></button>`).join('')}</div>`;
  } else if (view === 'stickers') {
    body = `<div class="kidguide">${guideImg(1)}<p>${L('ลากสติกเกอร์ไปแปะได้เลย!', 'Drag your stickers onto the page!')}</p></div>${stickerBoard(t, kid, true)}`;
  } else if (view === 'photos') {
    const ph = kidPhotos(t, i); if (kidPhoto >= ph.length) kidPhoto = 0; const m = ph[kidPhoto];
    body = m ? `<div class="kidguide">${guideImg(0)}<p>${m.caption ? esc(m.caption) : L(`รูปวันที่ ${m.day + 1}`, `A photo from day ${m.day + 1}`)}</p></div>
<button class="kidphoto" data-a="kidphoto" data-v="1" aria-label="${L('รูปถัดไป', 'Next photo')}"><img src="/media/${esc(m.id)}" alt=""></button>
<div class="kpnav"><button class="kidbig ghost" data-a="kidphoto" data-v="-1" aria-label="${L('รูปก่อนหน้า', 'Previous')}">‹</button><span class="kpn">${kidPhoto + 1} / ${ph.length}</span><button class="kidbig ghost" data-a="kidphoto" data-v="1" aria-label="${L('รูปถัดไป', 'Next')}">›</button></div>`
      : `<div class="kidguide">${guideImg(0)}<p>${L('ยังไม่มีรูปเลย', 'No photos yet')}</p></div>`;
  } else if (view === 'match') {
    if (!mg || mg.t !== t.id || mg.kid !== kid) newMatch(t, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${mg.won ? L(`เก่งมาก! จับคู่ครบใน ${mg.moves} ครั้ง 🎉`, `Brilliant! All the pairs in ${mg.moves} goes 🎉`) : L('แตะเปิดการ์ดสองใบ หาคู่ที่เหมือนกัน!', 'Tap two cards — find the pairs!')}</p></div>
<div class="mgrid">${mg.cards.map((c, n) => `<button class="mcard${mg.up.includes(n) || mg.done.has(c.k) ? ' open' : ''}${mg.done.has(c.k) ? ' done' : ''}" data-a="kidflip" data-v="${n}" aria-label="${L('การ์ด', 'Card')} ${n + 1}"><span class="back">?</span><span class="face">${c.img ? `<img src="${esc(c.img)}" alt="">` : esc(c.e)}</span></button>`).join('')}</div>
<button class="kidbig ghost" data-a="kidnewmatch">🔁 ${L('เล่นใหม่', 'Play again')}</button>`;
  } else if (view === 'mood' && !pre) {
    const moods = t.moods.length ? t.moods : Object.keys(MOODW), cur = (S.entries.find((e) => e.id === `${t.id}.mood.d${i}.${kid}`) || {}).mood;
    body = `<div class="kidguide">${guideImg(1)}<p>${cur ? L(`วันนี้${esc(name)}รู้สึก ${cur}`, `Today ${esc(name)} feels ${cur}`) : L(`${esc(name)} วันนี้รู้สึกยังไง?`, `${esc(name)}, how do you feel today?`)}</p></div>
<div class="moodgrid">${moods.map((m) => `<button data-a="kidmood" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="${esc(m)}" aria-pressed="${cur === m}"><span>${esc(m)}</span><b>${esc(MOODW[m] ? L(MOODW[m][0], MOODW[m][1]) : '')}</b></button>`).join('')}</div>`;
  } else if (view === 'animals' && wild.length) {
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะสัตว์เพื่อฟังชื่อ · เจอตัวจริงแล้วแตะ 👀', 'Tap an animal to hear its name · tap 👀 when you spot one')}</p></div>
<div class="animals">${wild.map((w, n) => { const key = `wild.${n}`, on = ticked(t, key, kid); return `<div class="an${on ? ' on' : ''}"><button class="hear" data-a="sayfacts" data-v="${esc(T(w.name))}. ${esc(T(w.text))}"><span>${esc(w.emo || '🐾')}</span><b>${esc(T(w.name))}</b></button><button class="seen" data-a="kidspot" data-t="${esc(t.id)}" data-d="" data-k="${esc(kid)}" data-v="${key}" data-say="${esc(L(`เจอ${T(w.name)}แล้ว!`, `Spotted a ${T(w.name)}!`))}" aria-pressed="${!!on}" aria-label="${L('เจอแล้ว', 'Spotted')}">${on ? '✓' : '👀'}</button></div>`; }).join('')}</div>`;
  } else if (view === 'numbers') {
    if (!cnt) newCount(t);
    const done = cnt.hit.length >= cnt.n;
    body = `<div class="kidguide">${guideImg(1)}<p>${done ? L(`ทั้งหมด ${cnt.n} ตัว! เก่งมาก 🎉`, `${cnt.n} altogether! Brilliant 🎉`) : L('แตะนับทีละตัว — มีกี่ตัวนะ?', 'Tap them one by one — how many?')}</p></div>
<div class="countfield">${Array.from({ length: cnt.n }, (_, k) => `<button class="cnt${cnt.hit.includes(k) ? ' hit' : ''}" data-a="kidcount" data-v="${k}" aria-label="${k + 1}"><span>${esc(cnt.e)}</span><i>${cnt.hit.includes(k) ? cnt.hit.indexOf(k) + 1 : ''}</i></button>`).join('')}</div>
<div class="bignum" id="bignum">${cnt.hit.length || ''}</div>
<button class="kidbig ghost" data-a="kidnewcount">🔁 ${L('นับใหม่', 'Count again')}</button>`;
  } else if (view === 'trophies') {
    const all = trophies(t, kid), got = all.filter((x) => x[3]), seen = new Set(ls('tseen_' + kid) || []), fresh = got.filter((x) => !seen.has(x[0]));
    if (fresh.length) ls('tseen_' + kid, got.map((x) => x[0]));
    body = `<div class="kidguide${fresh.length ? ' pop' : ''}">${guideImg(0)}<p>${fresh.length ? L(`เย้! รางวัลใหม่: ${fresh.map((x) => x[2]).join(', ')} 🎉`, `Yay! New: ${fresh.map((x) => x[2]).join(', ')} 🎉`) : L(`${esc(name)} มี ${got.length} จาก ${all.length} รางวัล`, `${esc(name)} has ${got.length} of ${all.length} trophies`)}</p></div>
<div class="trophies">${all.map((x) => `<button class="tro${x[3] ? ' got' : ''}${fresh.some((f) => f[0] === x[0]) ? ' new' : ''}" data-a="sayfacts" data-v="${esc(x[3] ? x[2] : L(`${x[2]} — ยังไม่ได้ ลองดูนะ`, `${x[2]} — not yet, keep going`))}"><span>${x[3] ? x[1] : '🔒'}</span><b>${esc(x[2])}</b></button>`).join('')}</div>`;
  } else if (view === 'hearts') {
    const hs = heartsFor(kid), seen = ls('hseen_' + kid) || 0;
    if (hs.length) ls('hseen_' + kid, Math.max(seen, hs[0].at));
    body = `<div class="kidhearts-list">${hs.map((h) => `<button class="${h.at > seen ? 'new' : ''}" data-a="kidheart" data-v="${esc(heartLine(h, kid))}"><span class="e">${esc(h.emoji)}</span><b>${esc(h.from)}</b>${h.text ? `<p>${esc(h.text)}</p>` : ''}<i>🔊</i></button>`).join('') || `<p class="kidguide"><span>${L('ยังไม่มีหัวใจ', 'No hearts yet')}</span></p>`}</div>`;
  } else body = `<button class="kidbig" data-a="kidnav" data-v="#/kid/${esc(kid)}">🏠</button>`;
  // kid mode's own bar: big pictures, read aloud on tap (data-say), no grown-up pages
  const kb = [['', '🏠', L('บ้าน', 'Home')], pp.map && ['map', '🗺️', L('แผนที่', 'Map')], [pre ? 'colour' : 'stamp', pre ? '🎨' : '🛂', pre ? L('ระบายสี', 'Colour') : L('พาสปอร์ต', 'Passport')], ['stickers', '⭐', L('สติกเกอร์', 'Stickers')], ['trophies', '🏆', L('รางวัล', 'Trophies')]].filter(Boolean);
  const bar = `<nav class="kidbar">${kb.map(([v, e, lbl]) => `<button data-a="kidnav" data-v="#/kid/${esc(kid)}${v ? '/' + v : ''}" data-say="${esc(lbl)}"${(v || 'home') === view ? ' aria-current="page"' : ''}><span>${e}</span><b>${lbl}</b></button>`).join('')}</nav>`;
  return `<div class="kidwrap" style="${style}">${head}${body}${lock}${bar}</div>`;
}

/* ---------- kid mode actions ---------- */
let colourSaveT = 0;
Object.assign(A, {
  kidmode(b) { ls('kidmode', b.dataset.v || 'pick'); nav(b.dataset.v ? `#/kid/${b.dataset.v}` : '#/kid'); },
  kidpick(b) { beep('pop'); ls('kidmode', b.dataset.v); kidDay = null; nav(`#/kid/${b.dataset.v}`); },
  kidnav(b) { beep('tap'); kidDoor = null; nav(b.dataset.v); if (b.dataset.say) sayUi(b.dataset.say); },
  kidday(b) { beep('pop'); kidDay = +b.dataset.v; mapAt = null; kidPhoto = 0; render(); },
  kidpage(b) { beep('tap'); const pg = $('#kidpager'); if (pg) pg.scrollBy({ left: +b.dataset.v * pg.clientWidth, behavior: reduced() ? 'auto' : 'smooth' }); },
  kidphoto(b) { beep('tap'); const t = trip(route().parts[1] && kidTrip(route().parts[1]).id), n = kidPhotos(t, kidDayOf(t)).length; if (!n) return; kidPhoto = (kidPhoto + +b.dataset.v + n) % n; render(); },
  kidflip(b) {
    const n = +b.dataset.v; if (!mg) return; const c = mg.cards[n];
    if (mg.up.includes(n) || mg.done.has(c.k) || mg.up.length >= 2) return;
    beep('tap'); mg.up.push(n); b.classList.add('open');
    if (mg.up.length < 2) return;
    mg.moves++; const [x, y] = mg.up.map((k) => mg.cards[k]);
    if (x.k === y.k) {
      mg.done.add(x.k); mg.up = []; beep('chime'); burst(b, ['⭐', '✨']);
      if (mg.done.size * 2 === mg.cards.length) { mg.won = true; ls('match_' + mg.kid, (ls('match_' + mg.kid) || 0) + 1); setTimeout(() => { render(); sayUi(L('เก่งมาก!', 'Brilliant!')); }, 350); }
    } else setTimeout(() => { mg.up = []; $$('.mcard').forEach((el, k) => { if (!mg.done.has(mg.cards[k].k)) el.classList.remove('open'); }); beep('thud'); }, 800);
  },
  kidnewmatch() { beep('pop'); const t = trip(mg.t); newMatch(t, mg.kid); render(); },
  kidmood(b) { beep('pop'); const was = b.getAttribute('aria-pressed') === 'true'; A.mood(b); if (!was) { const w = MOODW[b.dataset.v]; sayUi(L(`วันนี้${kidName(b.dataset.k)}รู้สึก${w ? w[0] : ''}`, `Today ${kidName(b.dataset.k)} feels ${w ? w[1] : ''}`)); } render(); },
  kidcount(b) {
    const k = +b.dataset.v; if (!cnt || cnt.hit.includes(k)) return;
    cnt.hit.push(k); const n = cnt.hit.length; beep('pop'); burst(b, [cnt.e, '✨']);
    say(NUMW[lang === 'th' ? 'th' : 'en'][n - 1] || String(n), lang === 'th' ? 'th-TH' : 'en-GB');
    if (n >= cnt.n) setTimeout(() => { beep('chime'); render(); sayUi(L(`ทั้งหมด ${n} ตัว!`, `${n} altogether!`)); }, 500); else render();
  },
  kidnewcount() { beep('pop'); const t = kidTrip(route().parts[1]); newCount(t); render(); },
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
  mappin(b) {
    const t = trip(b.dataset.t), mm = mapModel(t); if (!mm) return;
    beep('pop'); sayUi(b.dataset.say);
    if (!document.body.classList.contains('kidmode')) return;   // the passport map only says the name
    const box = $('.tmap'), cur = box ? +box.dataset.pos : mapPos(mm, kidDayOf(t)), j = mm.seq.reduce((best, v, n) => (v.k === b.dataset.v && (best < 0 || Math.abs(n - cur) < Math.abs(best - cur)) ? n : best), -1);   // the visit nearest to where we stand
    if (j < 0 || j === cur) return;
    mapFrom = cur; mapAt = j; kidDay = mm.seq[j].day; render();
  },
  kidquiz(b) {
    const on = b.getAttribute('aria-pressed') === 'true', ans = b.querySelector('.ans');
    b.setAttribute('aria-pressed', String(!on)); if (ans) ans.hidden = on;
    if (!on) { beep('chime'); burst(b, ['⭐', '✨', '🎉']); sayUi(b.dataset.ans); } else { beep('tap'); sayUi(b.dataset.q); }
  },
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
