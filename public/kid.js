'use strict';
/* ===== Memory Bookshelf · kid mode: big buttons for Mimi (3) and Mika (1½) =====
   #/kid → pick a child · #/kid/<kid> home (pages of four huge tiles, swipe or arrows) · /colour · /draw · /spot · /stamp · /words
   · /count (surprise doors) · /pack · /map · /quiz · /stickers · /hearts · /photos · /match · /mood · /animals · /numbers · /trophies
   Locked: while kid mode is on, every route comes back here; a grown-up exits by pressing and holding the lock (1.2 s).
   Sounds are synthesised (Web Audio), words and bedtime stories are read by the phone's own voices (speechSynthesis) —
   nothing leaves the phone. Drawings are uploaded like photos (private, never public). */

/* ---------- sounds ---------- */
let audioCtx = null;
// every sound goes through one limiter (owner, Nov 2026: "เสียงเครื่องดนตรีไม่ค่อยดัง"): the instruments play louder, and a fast run of
// taps or a drum over a note never clips into a crackle
let outNode = null;
function outOf(c) {
  if (outNode && outNode.context === c) return outNode;
  try {
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -12; comp.knee.value = 8; comp.ratio.value = 10; comp.attack.value = 0.002; comp.release.value = 0.18;
    const g = c.createGain(); g.gain.value = 1.15; comp.connect(g); g.connect(c.destination); outNode = comp;
  } catch (_) { outNode = c.destination; }
  return outNode;
}
function beep(kind, x) {   // x: the note's frequency for 'note'
  try {
    // iPad/iPhone: web sounds obey the ring/silent switch unless the page says it plays media (Safari 16.4+), and a context made outside
    // a tap starts "suspended" (or is "interrupted" after a call) — wake it on every sound, which is always a tap (iPad owner: music was silent)
    try { if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch (_) { /* older Safari */ }
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state !== 'running' && audioCtx.resume) audioCtx.resume().catch(() => {});
    const c = audioCtx, t0 = c.currentTime;
    const tone = (f, at, dur, type, vol) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0 + at);
      g.gain.setValueAtTime(vol || 0.2, t0 + at); g.gain.exponentialRampToValueAtTime(0.001, t0 + at + dur);
      o.connect(g); g.connect(outOf(c)); o.start(t0 + at); o.stop(t0 + at + dur);
    };
    if (kind === 'thud') { tone(140, 0, 0.35, 'triangle', 0.5); tone(70, 0, 0.45, 'sine', 0.5); }
    else if (kind === 'chime') [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.4, 'sine', 0.18));
    else if (kind === 'pop') tone(880, 0, 0.12, 'sine', 0.2);
    else if (kind === 'creak') { tone(220, 0, 0.25, 'sawtooth', 0.05); tone(330, 0.12, 0.3, 'triangle', 0.12); }
    else if (kind === 'whoosh') sweep(c, t0, 260, 1400, 0.45, 'sine', 0.14);
    else if (kind === 'boom') { sweep(c, t0, 160, 40, 0.6, 'sine', 0.55); tone(90, 0.02, 0.5, 'triangle', 0.3); }
    else if (kind === 'splash') [1100, 1500, 900, 1800, 1250].forEach((f, i) => tone(f + Math.random() * 200, i * 0.05, 0.12, 'sine', 0.12));
    else if (kind === 'sparkle') [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.06, 0.35, 'sine', 0.12));
    else if (kind === 'yay') [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.07, 0.25, 'triangle', 0.14));
    else if (kind === 'boing') sweep(c, t0, 180, 520, 0.3, 'triangle', 0.2);
    else if (kind === 'note') { tone(x, 0, 0.7, 'triangle', 0.55); tone(x * 2, 0, 0.35, 'sine', 0.14); tone(x * 3, 0, 0.12, 'sine', 0.05); }   // the xylophone
    else if (kind === 'kick') { sweep(c, t0, 160, 45, 0.3, 'sine', 1); tone(80, 0, 0.18, 'triangle', 0.45); }
    else if (kind === 'snare') { noise(c, t0, 0.2, 0.8, 1500); tone(190, 0, 0.12, 'triangle', 0.55); }
    else if (kind === 'hat') { [2093, 2637, 3136].forEach((f) => tone(f, 0, 0.5, 'sine', 0.12)); noise(c, t0, 0.08, 0.35, 6000); }   // a little bell (its button is 🔔)
    else if (kind === 'clap') { noise(c, t0, 0.1, 0.75, 1100); noise(c, t0 + 0.025, 0.14, 0.65, 1400); }
    else if (kind === 'frog') { sweep(c, t0, 420, 180, 0.16, 'sawtooth', 0.32); sweep(c, t0 + 0.17, 380, 160, 0.14, 'sawtooth', 0.28); }
    else if (kind === 'munch') [0, 0.13, 0.26].forEach((at) => { tone(260, at, 0.08, 'triangle', 0.3); noise(c, t0 + at, 0.05, 0.12, 900); });   // feed the animal: chomp chomp chomp
    else if (kind === 'bubble') sweep(c, t0, 520 + Math.random() * 380, 1500, 0.12, 'sine', 0.16);
    else if (kind === 'hello') [523, 659, 784].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.16));   // a child picked themself
    else if (kind === 'fanfare') [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, i === 6 ? 0.6 : 0.22, 'triangle', 0.16));
    else { tone(740, 0, 0.06, 'sine', 0.14); tone(980, 0.045, 0.09, 'sine', 0.1); }   // 'tap': a soft two-note tick (every kid button)
  } catch (_) { /* no audio — fine */ }
}

// a tone that slides from one pitch to another (whoosh up, boom down, boing)
function sweep(c, t0, f1, f2, dur, type, vol) {
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f1, t0); o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g); g.connect(outOf(c)); o.start(t0); o.stop(t0 + dur);
}
// a burst of white noise through a high-pass filter (the snare, the hi-hat)
let noiseBuf = null;
function noise(c, t0, dur, vol, hp) {
  if (!noiseBuf) { noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp;
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  s.connect(f); f.connect(g); g.connect(outOf(c)); s.start(t0); s.stop(t0 + dur);
}

/* ---------- the phone reads aloud ---------- */
// iPad/iPhone list novelty and robot voices among the real ones (Bad News, Bells, Trinoids, Zarvox, Whisper… and the old "Eddy/Rocko/
// Grandpa" family) — taking the first English voice could land on one, which scared the kids (owner, Nov 2026). Those are never used;
// a warm, natural voice is preferred, and a downloaded "Enhanced"/"Premium" one above all.
const VOICE_NO = /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Junior|Organ|Pipe Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Ralph|Fred|Kathy|Princess|Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley)\b/i;
const VOICE_NICE = /\b(Samantha|Karen|Moira|Tessa|Serena|Kate|Martha|Fiona|Stephanie|Ava|Allison|Susan|Catherine|Nicky|Zoe|Kanya|Narisa|Sinji|Google UK English Female|Google US English|Google ไทย|Microsoft (Libby|Sonia|Maisie|Aria|Jenny|Ana|Premwadee))\b/i;
function voiceFor(langTag) {
  const vs = ((window.speechSynthesis && speechSynthesis.getVoices()) || []).filter((v) => !VOICE_NO.test(v.name || ''));
  const want = langTag.toLowerCase(), base = want.split('-')[0];
  const ok = (v) => v.lang.toLowerCase().replace('_', '-');
  const score = (v) => (VOICE_NICE.test(v.name) ? 4 : 0) + (/premium|enhanced|neural|natural/i.test(`${v.name} ${v.voiceURI || ''}`) ? 3 : 0) + (ok(v) === want ? 2 : 0) + (v.localService ? 0.5 : 0);
  const best = (list) => list.sort((a, b) => score(b) - score(a))[0] || null;
  if (want === 'zh-hk') return best(vs.filter((v) => ok(v) === 'zh-hk' || ok(v).startsWith('yue')));   // Cantonese only — Mandarin would teach the wrong word
  return best(vs.filter((v) => ok(v) === want || ok(v).startsWith(base)));
}
if (window.speechSynthesis && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', () => {});   // Safari fills the list late; asking early wakes it
// one utterance; onend runs when it finishes (or fails). Returns false when the phone can't speak.
function speak(text, langTag, opt) {
  const o = opt || {};
  if (!window.speechSynthesis || !text) return false;
  const v = voiceFor(langTag);
  if (!v && /^zh-HK$/i.test(langTag)) { toast(L('เครื่องนี้ยังไม่มีเสียงภาษากวางตุ้ง', 'No Cantonese voice on this phone yet (Settings › Accessibility › Spoken Content › Voices)')); return false; }
  try {   // never let a voice problem stop a tap from doing its job
    if (!o.keep) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langTag; u.rate = o.rate || 0.92; u.pitch = o.pitch || 1.2;   // bright and friendly, still unhurried for small ears
    try { if (v) u.voice = v; } catch (_) {}
    if (o.onend) { u.onend = o.onend; u.onerror = o.onend; }
    speechSynthesis.speak(u);
    return true;
  } catch (_) { return false; }
}
const say = (text, langTag) => speak(text, langTag);
const sayUi = (text) => say(text, lang === 'th' ? 'th-TH' : 'en-GB');
// a long text in chunks of a sentence or two (Chrome stops one long utterance after about 15 s)
function chunks(text) {
  const out = [];
  for (const w of String(text || '').split(/\s+/).filter(Boolean)) { const c = out.length ? out[out.length - 1] : ''; if (c && c.length + w.length < 180 && !/[.!?]$/.test(c)) out[out.length - 1] = c + ' ' + w; else out.push(w); }
  return out;
}
// the guide's story: scene by scene, the scene being read lights up; tap again to stop
let taleRun = 0;
function sayTale(b) {
  const box = b.closest('.tale'), was = b.classList.contains('on'), run = ++taleRun;
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (_) {}
  $$('.tale .now, .talebtn.on').forEach((x) => x.classList.remove('now', 'on'));
  if (was || !box) return;
  const q = $$('[data-say]', box).flatMap((el) => chunks(el.dataset.say).map((c) => [el, c]));
  const next = (n) => {
    if (run !== taleRun) return;
    if (n >= q.length) { b.classList.remove('on'); q.forEach(([el]) => el.classList.remove('now')); return; }
    const [el, c] = q[n];
    if (!el.classList.contains('now')) { $$('.now', box).forEach((x) => x.classList.remove('now')); el.classList.add('now'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    if (!speak(c, lang === 'th' ? 'th-TH' : 'en-GB', { keep: true, onend: () => next(n + 1) })) { b.classList.remove('on'); el.classList.remove('now'); }
  };
  b.classList.add('on'); next(0);
}
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
const canColour = (t, i) => /\.svg(\?|$)/.test(colourUrl(t, i));   // the colouring page is the day's SVG with its fills lifted; a PNG (drawn by the helper) has no regions to tap
const colourFill = (t, i, kid) => fieldVal(t, `colour.d${i}`, kid) || '{}';

/* ---------- finger drawing ("Draw today's best moment") → a private picture, like a photo ---------- */
const DRAW_W = 1200, DRAW_H = 900, PEN = [10, 24, 48];
let pen = PEN[1];
const pad = { key: '', strokes: [], cur: null, gone: null, hide: false, full: false };   // kept while the page re-renders; cleared once saved (gone = the strokes the sponge just wiped, ↶ brings them back; hide = the colour tray tucked away while drawing; full = the paper fills the screen)
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
function hydrateDraw(root) { const cv = $('#kidcanvas', root || document); if (cv) { if (cv.dataset.key !== pad.key) { pad.key = cv.dataset.key; pad.strokes = []; pad.gone = null; pad.hide = false; pad.full = false; drawWrap(); } redraw(cv); } }
// The drawing page's state lives on its wrapper: .busy tucks the colour tray away, .full lays the paper over the whole screen
function drawWrap() { const w = $('#drawwrap'); if (!w) return; w.classList.toggle('busy', pad.hide); w.classList.toggle('full', pad.full); const c = $('#drawcol'); if (c) c.style.setProperty('--c', kidColour); const f = $('#drawfull'); if (f) { f.textContent = pad.full ? '✕' : '⛶'; f.setAttribute('aria-label', pad.full ? L('ย่อกระดาษ', 'Smaller paper') : L('กระดาษเต็มจอ', 'Full-screen paper')); } }
const padPoint = (cv, e) => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * (DRAW_W / r.width)), Math.round((e.clientY - r.top) * (DRAW_H / r.height))]; };
document.addEventListener('pointerdown', (e) => {
  const cv = e.target.closest && e.target.closest('#kidcanvas'); if (!cv) return;
  e.preventDefault();
  try { cv.setPointerCapture(e.pointerId); } catch (_) {}
  if (!pad.hide) { pad.hide = true; drawWrap(); }   // owner: the tray hides once the child starts drawing; the colour dot on the paper brings it back
  pad.cur = { c: kidColour, w: pen, pts: [padPoint(cv, e)], id: e.pointerId }; pad.gone = null;
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
<p class="bttext" lang="${esc(bt.e.lang || lang)}">${pg.chunks.map((c, k) => `<span class="${k === bt.c && bt.playing ? 'on' : ''}">${sfxHtml(c, p === pages.length - 1)}</span>`).join('')}</p>`}
</div>
<div class="btctl">
<button data-a="btprev" aria-label="${L('หน้าก่อน', 'Previous page')}"${p === 0 ? ' disabled' : ''}>◀</button>
<button class="play" data-a="btplay" aria-label="${bt.playing ? L('หยุดอ่าน', 'Pause') : L('อ่านให้ฟัง', 'Read aloud')}">${bt.playing ? '❚❚' : '▶'}</button>
<button data-a="btnext" aria-label="${L('หน้าถัดไป', 'Next page')}"${end ? ' disabled' : ''}>▶▶</button></div>
<div class="btdots">${pages.map((_, j) => `<i class="${j === p ? 'on' : ''}"></i>`).join('')}<span>${Math.min(p + 1, pages.length)}/${pages.length}</span></div>`;
}
// sound words in a story (the story prompt asks for them): when the reader reaches one, a little synthesised sound plays and
// sparkles fly from the line; the word itself is drawn big. Never on the last page — the end of a bedtime story stays quiet.
const SFX = [
  // English words whole (\b: "Bangkok" is not a bang); Thai only distinct sound words (no ปัง — it hides in ขนมปัง)
  [/ว้าว+|\bwo+w\b/i, 'sparkle', ['✨', '⭐', '🌟']],
  [/ฟิ้ว+|ฟุ่บ|วู้+ว?|\b(?:whoo+sh|zoo+m|swoo+sh)\b/i, 'whoosh', ['💨', '✨']],
  [/ตู้*ม!|โครม|\b(?:boo+m|bang|crash)\b/i, 'boom', ['💥', '⭐']],
  [/จ๋อม|จ๋อง|ซ่า+~|\b(?:spla+sh|sploo+sh|plop)\b/i, 'splash', ['💧', '🫧', '💦']],
  [/เย้+|ไชโย|\b(?:ye+y|ya+y|hoo+ray)\b/i, 'yay', ['🎉', '🎈', '⭐']],
  [/ดึ๋ง|\b(?:boi+ng)\b/i, 'boing', ['⭐', '💫']],
];
const SFX_ANY = new RegExp(SFX.map(([re]) => re.source).join('|'), 'gi');
const sfxOf = (txt) => { const x = SFX.find(([re]) => re.test(txt)); return x ? { snd: x[1], fx: x[2] } : null; };
// escape first, decorate never: split the raw text on the sound words, escape each piece, wrap only the matches
const sfxHtml = (txt, quiet) => (quiet ? esc(txt) : txt.split(new RegExp(`(${SFX_ANY.source})`, 'gi')).map((x, k) => (k % 2 ? `<b class="sfxw">${esc(x)}</b>` : esc(x))).join(''));
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
  const read = () => {
    if (!bt || bt.tok !== tok) return;
    const spoke = speak(pg.chunks[bt.c], bt.e.lang === 'en' ? 'en-GB' : 'th-TH', { rate: 0.8, pitch: 1.05, keep: true, onend: next });
    if (!spoke) setTimeout(next, Math.max(2500, pg.chunks[bt.c].length * 90));   // no voice on this phone: just turn the pages slowly
  };
  const fx = bt.p < bt.pages.length - 1 && sfxOf(pg.chunks[bt.c]);   // a sound word in this line (not on the quiet last page)
  if (!fx) { read(); return; }
  bt.sfx = (bt.sfx || 0) + 1;
  beep(fx.snd);
  const line = $$('#btpage .bttext span')[bt.c], w = line && line.querySelector('.sfxw');
  burst(w || line, fx.fx); if (w) { w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop'); }
  setTimeout(read, 450);   // the sound first, then the voice
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
// the bedtime questions of a day (entry kind talk), if a grown-up asked Claude for them
const kidTalk = (t, i) => S.entries.find((e) => e.trip === t.id && e.kind === 'talk' && e.day === i && e.text);
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
  if (!seq.length) return null;   // a map with stops but no day that reaches one (an import whose day keys matched nothing): no walk to draw
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
${mm.m.stops.filter((s) => mm.seq.some((v) => v.k === s.k)).map((s) => `<g class="pin${been.has(s.k) ? ' on' : ''}${s.k === here ? ' here' : ''}" data-a="mappin" data-t="${esc(t.id)}" data-v="${esc(s.k)}" data-say="${esc(T(s))}" transform="translate(${s.x * MAP_W / 100},${s.y * MAP_H / 100})" role="button" aria-label="${esc(T(s))}"><circle r="17"/>${s.art ? `<image class="ea" href="${esc(s.art)}" x="-15" y="-15" width="30" height="30"/>` : `<text class="e" y="6">${esc(s.e)}</text>`}</g>`).join('')}
</svg>
<svg class="lbls" viewBox="0 0 ${MAP_W} ${MAP_H}" aria-hidden="true">${mm.m.stops.filter((s) => mm.seq.some((v) => v.k === s.k)).map((s) => `<text class="lbl" x="${s.x * MAP_W / 100}" y="${s.y * MAP_H / 100 + 31}">${esc(T(s))}</text>`).join('')}</svg>
<div class="walkers" style="left:${s0.x}%;top:${s0.y}%" aria-hidden="true">${kids.filter((k) => kidArt(k)).map((k) => `<img class="${esc(k)} ${esc(kidBase(k))}" src="${kidArt(k, true)}" alt="">`).join('')}</div></div>`;
}
// a pin on the passport map, for the grown-ups: which days we are there, the real place in Google Maps, directions, the day pages
function pinSheet(t, s) {
  const days = ((t.passport.map || {}).days || []).map((ks, d) => (ks.includes(s.k) ? d : -1)).filter((d) => d >= 0), q = s.q || T(s);
  const stays = days.map((d) => (t.days[d].plan || {}).stay).filter((x, n, a) => x && x.name && a.findIndex((y) => y && y.name === x.name) === n);   // the nights' addresses, for the driver
  return `<h3>${esc(s.e || '📍')} ${esc(T(s))}</h3>${days.length ? `<p class="label">${L('วันที่', days.length > 1 ? 'Days' : 'Day')} ${days.map((d) => d + 1).join(', ')}</p>` : ''}
<div class="pinacts">${extA(mapsUrl(q), ic('pin') + ' ' + L('เปิดใน Google Maps', 'Open in Google Maps'), 'btn')}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`, ic('route') + ' ' + L('นำทางไปที่นี่', 'Directions'), 'btn ghost')}</div>
${days.length ? `<div class="pindays">${days.map((d) => `<a class="chip" href="#/t/${esc(t.id)}/today/${d}">${L('แผนวันที่', 'Plan · Day')} ${d + 1}</a>`).join('')}</div>` : ''}
${stays.length ? `<div class="pinstays"><span class="label">${L('ที่พักแถวนี้', 'Where we sleep here')}</span>${stays.map((x) => `<div class="pinstay"><span>${ic('stays')}<b>${esc(x.name)}</b>${x.addr ? `<small>${esc(x.addr)}</small>` : ''}</span>${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || x.addr || x.name)}`, ic('route') + ' ' + L('นำทาง', 'Go'), 'btn small ghost')}</div>`).join('')}</div>` : ''}
<div class="row end"><button class="btn ghost small" data-a="closesheet">${L('ปิด', 'Close')}</button></div>`;
}
// walk the kids from mapFrom to the stop of this map (one hop after another, along the drawn paths)
function hydrateMap(root) {
  const box = $('.tmap', root || document); if (!box) return;
  const to = +box.dataset.pos, from = mapFrom; mapFrom = null;
  const w = $('.walkers', box), mm = mapModel(trip(box.dataset.t));
  if (!w || !mm || from === null || from === to || from >= mm.seq.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const put = (x, y) => { w.style.left = `${(x / MAP_W) * 100}%`; w.style.top = `${(y / MAP_H) * 100}%`; };
  const steps = [], dir = to > from ? 1 : -1;   // each hop 0.9 s, a long jump across days at most ~2.4 s in all
  for (let j = from; j !== to; j += dir) steps.push(dir > 0 ? j : j - 1);   // hop j goes from seq[j] to seq[j+1]
  const s0 = mm.at[mm.seq[from].k]; put(s0.x * MAP_W / 100, s0.y * MAP_H / 100);
  w.classList.add('walking');
  let n = 0, t0 = 0;
  const tick = (now) => {
    if (!w.isConnected) return;
    const path = $(`#hop${steps[n]}`, box); if (!path) { w.classList.remove('walking'); return; }
    t0 = t0 || now;
    const k = Math.min(1, (now - t0) / Math.min(900, 2400 / steps.length)), len = path.getTotalLength(), pt = path.getPointAtLength(len * (dir > 0 ? k : 1 - k));
    put(pt.x, pt.y);
    if (k < 1) return requestAnimationFrame(tick);
    n++; t0 = 0;
    if (n < steps.length) requestAnimationFrame(tick); else { w.classList.remove('walking'); beep('pop'); }
  };
  requestAnimationFrame(tick);
}

/* ---------- stickers: every mission ticked earns one; drag them onto your sticker page ---------- */
// the morning surprise box: one per trip day, opened by the child in kid mode (tick gift.d<i>) — a sticker of its own and today's missions
// the big celebration (owner's ask, Nov 2026: the stamp, the surprise box, a finished game felt quiet): confetti over the whole screen,
// 36 pieces in the book's pastels and a few emoji, falling for ~2 s; nothing when the phone asks for reduced motion
// the star jar: every finished game drops stars in (kept on this phone, `stars_<kid>`); every ten stars the jar is full and a new
// friend joins (`pets_<kid>`) — a celebration, never a goal: nothing says what is missing
const PETS = ['🐣', '🦊', '🐼', '🦄', '🐬', '🦉', '🐨', '🦋', '🐢', '🦜', '🐧', '🦁'];
const stars = (kid) => +ls('stars_' + kid) || 0, pets = (kid) => ls('pets_' + kid) || [];
const kidNow = () => route().parts[1];
function star(kid, n) {
  if (!kid) return;
  const was = stars(kid), now = was + (n || 1); ls('stars_' + kid, now);
  const jar = $('.starjar'); if (jar) { jar.querySelector('b').textContent = now; burst(jar, ['⭐']); }
  if (Math.floor(now / 10) > Math.floor(was / 10)) {
    const ps = pets(kid), pet = PETS[ps.length % PETS.length]; ls('pets_' + kid, ps.concat(pet));
    setTimeout(() => { beep('fanfare'); celebrate(['⭐', pet, '✨']); sayUi(L(`โถดาวเต็มแล้ว! ${pet} มาเป็นเพื่อนใหม่`, `The star jar is full! ${pet} is your new friend`)); }, 900);
  }
}
const CONF_C = ['#FFD36B', '#FFB0C8', '#7FE3D2', '#8FB4FF', '#C9B6FF', '#FF9A6B'];
function celebrate(chars) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cs = chars || ['⭐', '✨', '🎉'];
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span'), e = i % 6 === 0;
    s.className = 'confetti' + (e ? ' e' : ''); if (e) s.textContent = cs[(i / 6) % cs.length | 0]; else s.style.background = CONF_C[i % CONF_C.length];
    s.style.cssText += `left:${Math.random() * 100}vw;--dx:${(Math.random() - 0.5) * 120}px;--rot:${(Math.random() - 0.5) * 900}deg;--t:${1.5 + Math.random() * 0.9}s;--d:${Math.random() * 0.45}s`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 2800);
  }
}
let memState = null;   // the memory game's place: {key: trip.day.kid, n: question, got: answered right}
const GIFT_E = ['🦄', '🐉', '🎈', '🍭', '🌈', '🚀', '🦋', '🍦', '🐳', '🪁', '🎠', '🧸', '🌟', '🦕', '🎪', '🍩'];
const giftE = (i) => GIFT_E[i % GIFT_E.length];
function stickerSet(t, kid) {
  const pp = t.passport || {}, out = [], seen = new Set();
  const add = (k, e, img, got) => { if (seen.has(k) || (!e && !img)) return; seen.add(k); out.push({ k, e, img, got: !!got }); };
  t.days.forEach((_, i) => add(`stamp.d${i}`, '', dayArt(t, i), dayStamped(t, i)));
  t.days.forEach((_, i) => daySpots(t, i, kid).forEach((s) => add(s.key, s.e, '', ticked(t, s.key, kid))));
  t.days.forEach((_, i) => add(`gift.d${i}`, giftE(i), '', ticked(t, `gift.d${i}`, kid)));
  t.days.forEach((_, i) => add(questKey(i, 'chest'), QUEST_GEM[i % QUEST_GEM.length], '', ticked(t, questKey(i, 'chest'), kid)));   // a town's treasure on the adventure map   // the morning surprise box's sticker
  kidLists(t, kid).forEach((l) => listItems(l).forEach((it) => { const x = ticked(t, `${l.key}.${it.k}`, kid); add(`${l.key}.${it.k}`, it.e, '', x && x.text !== 'yuck'); }));
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
<span class="stkhd">⭐ ${esc(kidName(kid))}${got ? ` · ${got}` : ''}</span>
${placed.map((p, i) => `<span class="stk on${by[p[0]].img ? ' img' : ''}" data-i="${i}" style="left:${+p[1]}%;top:${+p[2]}%;--r:${+p[3] || 0}deg">${stkFace(by[p[0]])}</span>`).join('')}
${!placed.length ? `<p class="stkempty">${edit ? L('ลากสติกเกอร์มาแปะตรงนี้!', 'Drag your stickers here!') : L('ยังไม่ได้แปะสติกเกอร์', 'No stickers yet')}</p>` : ''}</div>
${edit ? `<div class="stktray" id="stktray">${tray.map((s) => `<button class="stk${s.img ? ' img' : ''}" data-k="${esc(s.k)}" aria-label="${L('สติกเกอร์', 'Sticker')}">${stkFace(s)}</button>`).join('')
    || `<p class="label">${got ? L('แปะครบทุกอันแล้ว! 🎉', 'All your stickers are on the page! 🎉') : L('ทำภารกิจ แล้วได้สติกเกอร์นะ!', 'Do missions and tick what you spot to earn stickers')}</p>`}</div>` : ''}`;
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
// the kids' own voices (this day's first, then the rest of the book): one big button each, played in place
const kidAudio = (t, i) => { const all = audioOf(t.id), cs = all.filter((m) => m.day === i).concat(all.filter((m) => m.day !== i)).slice(0, 6); return cs.length ? `<div class="kidclips">${cs.map((m) => `<button class="kidbig" data-a="kidplay" data-v="${esc(m.id)}">🎙️ ${esc(m.caption || L(`เสียงวันที่ ${m.day + 1}`, `Voice from day ${m.day + 1}`))}</button>`).join('')}</div>` : ''; };
const kidPhotos = (t, i) => { const all = mediaOf(t.id).filter((m) => !isDrawing(m)), today = all.filter((m) => m.day === i); return today.concat(all.filter((m) => m.day !== i)); };
let kidPhoto = 0, kidPage = 0;
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let mg = null;   // pairs game: {t, kid, cards:[{k, img|e}], up:[card indexes face up], done:Set(k), moves, won}
function matchDeck(t, pairs) {
  pairs = pairs || 6;
  const faces = [];
  if (pixMode(t, kidDayOf(t), 'match') === 'photo') shuffle(kidPhotoPool(t)).slice(0, pairs).forEach((m) => faces.push({ k: 'p' + m.id, img: imgT(m), ph: true }));   // the family's photos first, drawings fill the rest
  if (faces.length < pairs) t.days.forEach((_, i) => { const a = dayArt(t, i); if (a) faces.push({ k: 'd' + i, img: a }); });
  ((t.passport || {}).days || []).forEach((pd, i) => (pd.spot || []).forEach((s) => faces.push({ k: `s${i}.${s.k}`, e: s.e })));
  if (faces.length < pairs + 2) ['🐨', '🦘', '🐬', '🐼', '🚢', '✈️', '🦒', '🐢', '🦋', '🍓', '🚗', '🌈', '🐘', '🦁', '🐙', '🍉', '🚂', '🎈', '🦉', '🐞', '🍄', '⛵', '🐧', '🦊'].forEach((e, i) => faces.push({ k: 'x' + i, e }));
  const seenE = new Set(), uniq = faces.filter((f) => !f.e || (!seenE.has(f.e) && seenE.add(f.e)));   // one card per face: two different keys with the same emoji would never match
  const pick = uniq.filter((f) => f.ph).concat(shuffle(uniq.filter((f) => !f.ph))).slice(0, pairs); return shuffle(pick.concat(pick));
}
// which pictures a game uses (owner's ask, Nov 2026: the children's own photos are the pictures they love most): 'art' = the day's drawing,
// 'photo' = one of the family's photos (520 px thumbnails, on the phone once the book is stored) — per game, this visit
let kidPix = { jigsaw: null, hideseek: null, match: null };
const kidPhotoPool = (t) => mediaOf(t.id).filter((m) => !isDrawing(m) && !m.pending);
const pixMode = (t, i, g) => kidPix[g] || (g === 'jigsaw' && !dayArt(t, i) ? 'photo' : 'art');
const randPhoto = (t) => { const p = kidPhotoPool(t); return p.length ? imgT(p[Math.floor(Math.random() * p.length)]) : null; };
const pixPick = (t, i, g, again) => (kidPhotoPool(t).length ? `<div class="pixpick" role="group" aria-label="${L('รูปที่ใช้', 'Pictures')}">${(g === 'jigsaw' && !dayArt(t, i) ? [] : [['art', '🎨', L('ภาพวาด', 'Drawing')]]).concat([['photo', '📷', L('รูปของเรา', 'Our photos')]]).map(([v, e, l]) => `<button data-a="kidpix" data-g="${g}" data-v="${v}" aria-pressed="${pixMode(t, i, g) === v}">${e} ${l}</button>`).join('')}${pixMode(t, i, g) === 'photo' ? `<button data-a="${again}">🔀 ${L('รูปใหม่', 'New photo')}</button>` : ''}</div>` : '');
const newMatch = (t, kid) => { mg = { t: t.id, kid, at: lvState(t, kid, 'match').at, cards: matchDeck(t, lvOf(t, kid, 'match').p), up: [], done: new Set(), moves: 0, won: false }; };
let cnt = null;   // counting game: {n, e, hit:[card indexes in the order tapped]}
const NUMW = { th: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ', 'สิบเอ็ด', 'สิบสอง', 'สิบสาม', 'สิบสี่', 'สิบห้า', 'สิบหก', 'สิบเจ็ด', 'สิบแปด', 'สิบเก้า', 'ยี่สิบ'], en: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'] };
function newCount(t, kid) {   // count today's things (the day's missions), now and then the trip's animals and friends
  const wild = ((t.info || {}).wild || []).map((w) => w.emo), today = daySpots(t, kidDayOf(t), kid || (route().parts[1] || '')).map((x) => x.e).filter((e) => e && e !== '🔊');
  const pool = today.length ? today.concat(today, wild.slice(0, 3)) : wild.length ? wild : t.days.map((d) => d.emoji).filter(Boolean);
  cnt = { n: 3 + Math.floor(Math.random() * 8), e: pool[Math.floor(Math.random() * pool.length)] || '⭐', hit: [] };
}
const MOODW = { '😄': ['ดีใจ', 'happy'], '🥰': ['มีความสุขมาก', 'loved'], '🤩': ['ตื่นเต้น', 'excited'], '😋': ['อร่อย', 'yummy'], '😴': ['ง่วง', 'sleepy'], '😢': ['เศร้า', 'sad'] };
// trophies are read off what the child already did — nothing new is stored except which ones were seen
function trophies(t, kid) {
  const pp = t.passport || {}, info = t.info || {}, days = t.days.length;
  const stamps = t.days.filter((_, j) => ticked(t, `stamp.d${j}`, kid)).length;
  const colours = S.entries.filter((e) => e.trip === t.id && e.kind === 'field' && e.child === kid && /^colour\./.test(e.first_key)).length;
  const draws = mediaOf(t.id).filter((m) => m.id.startsWith(`dr-${kid}-`)).length;
  const said = (pp.lists || []).filter((l) => l.said).reduce((n, l) => n + listGot(t, l, kid), 0);
  const spotsAll = t.days.some((_, j) => { const sp = daySpots(t, j, kid); return sp.length && sp.every((x) => ticked(t, x.key, kid)); });
  const stk = stickersPlaced(t, kid).length, hearts = heartsFor(kid).length, wins = ls('match_' + kid) || 0;
  const wildN = (info.wild || []).filter((_, n) => ticked(t, `wild.${n}`, kid)).length;
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first' && e.child === kid).length;
  const doorsAll = ((pp.countdown || {}).doors || []).length, doors = ((pp.countdown || {}).doors || []).filter((_, n) => ticked(t, `cd.${n + 1}`, kid)).length;
  const packAll = (((pp.countdown || {}).pack || {}).items || []), packed = packAll.filter((x) => ticked(t, `pack.${x.k}`, kid)).length;
  // the first three can be earned before we leave (surprise doors, packing) so the shelf is never all locks
  return [
    doorsAll ? ['door1', '🚪', L('เปิดประตูแรก', 'First door opened'), doors >= 1] : null,
    packAll.length ? ['packed', '🧳', L('ช่วยจัดกระเป๋า', 'Packing helper'), packed >= Math.min(5, packAll.length)] : null,
    doorsAll > 1 ? ['doorhalf', '🗓️', L('มาได้ครึ่งทางแล้ว!', 'Halfway there'), doors >= Math.ceil(doorsAll / 2)] : null,
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
    (info.wild || []).length ? ['wild', (info.wildLabel || {}).emo || '🦘', info.wildLabel ? L('นักตามหา', 'Spotter') : L('นักดูสัตว์', 'Animal spotter'), wildN >= 3] : null,
    ['firsts', '🌟', L('ครั้งแรก 3 อย่าง', '3 firsts'), firsts >= 3],
    doorsAll ? ['doors', '🎁', L('เปิดครบทุกประตู', 'All doors opened'), doors >= doorsAll] : null,
    ['quest1', '🗺️', L('สมบัติชิ้นแรก', 'First treasure'), t.days.some((_, j) => ticked(t, questKey(j, 'chest'), kid))],
    ['questall', '💎', L('นักผจญภัย', 'Adventurer'), days > 0 && t.days.every((_, j) => ticked(t, questKey(j, 'chest'), kid))],
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
// Thai has no spaces, and the phone's line breaker splits common words ("วัน|นี้"): a word joiner keeps them whole in the kid's big type
const wj = (s) => String(s).replace(/วันนี้/g, 'วัน\u2060นี้').replace(/กันเลย/g, 'กัน\u2060เลย').replace(/ทะเล/g, 'ทะ\u2060เล');
// kid mode's picture tiles (owner's set, public/art/kidui): [picture or '' for the emoji, gradient top, gradient bottom]
const KTILE = { count: ['surprise', '#FFC93C', '#FF9F0A'], pack: ['pack', '#62CCFF', '#1C9BEA'], words: ['say', '#C9A2FF', '#8F5CEB'], colour: ['colour', '#FF93B5', '#F2557F'],
  draw: ['draw', '#AEEA80', '#5EBB3D'], match: ['match', '#B592FF', '#7C4EE5'], quiz: ['quiz', '#86D6FF', '#2BA8F0'], animals: ['animals', '#93DD60', '#3FA82C'], numbers: ['count', '#FFB54A', '#FF8A1F'],
  spot: ['find', '#7FE3D2', '#24B39B'], stamp: ['stamp', '#8FB4FF', '#3F6FE0'], talk: ['talk', '#FFB0C8', '#F06A93'], memory: ['memory', '#FFD36B', '#F2A90C'], photos: ['photos', '#9CD9FF', '#3BA0E8'], mood: ['mood', '#FFC2A0', '#FF8A57'], hideseek: ['spy', '#FFD54A', '#E8A317'], jigsaw: ['jigsaw', '#A8E86A', '#2E9E4F'], bubbles: ['bubbles', '#5BB8FF', '#1E6FE8'], music: ['music', '#FF8FD8', '#7B3FE0'], shadow: ['', '#B8C2D6', '#5B6680'], feed: ['', '#FFD98A', '#F29B38'], sort: ['', '#9EE6B8', '#3FA0E0'], farm: ['', '#B8E986', '#E0893F'], wash: ['', '#BDE6F2', '#4FA3D9'], bigsmall: ['', '#FFD0A8', '#E06A8F'], maze: ['', '#C3F0A0', '#3E9B4F'], where: ['', '#FFE08A', '#F08C2E'], odd: ['', '#D7C6FF', '#7B5BE0'], next: ['', '#A8E6FF', '#2F86D6'], simon: ['', '#FFC9C9', '#E8590C'], dots: ['', '#C5CAFF', '#3B3F86'], howmany: ['', '#B2F2BB', '#2B8A3E'], cake: ['', '#FFD6E7', '#E64980'], _: ['', '#C9D3E6', '#8C9BB8'] };
// each game's own backdrop (owner, Nov 2026: "เพิ่มฉากด้วย"): a sky or room in CSS and a drawn strip along the bottom (app.css .sc-<scene>)
const KSCENE = { quest: 'road', bubbles: 'sea', music: 'stage', shadow: 'night', feed: 'picnic', sort: 'garden', numbers: 'garden', bigsmall: 'garden', farm: 'farm', wash: 'bath', maze: 'farm', where: 'picnic', odd: 'sea', next: 'stage', simon: 'stage', dots: 'night', howmany: 'sea', cake: 'picnic' };
const KBAR = { home: 'home', map: 'map', colour: 'colour', stamp: 'passport', stickers: 'stickers', trophies: 'trophies' };   // the bar's middle button: colour before the trip, the passport on it
function viewKid(p) {
  const ks = children(), kid = p[1], k = ks.find((c) => c.slug === kid);
  if (!k) {
    return `<div class="kidwrap pick enter"><h1>${L('ใครจะเล่น?', 'Who is playing?')}</h1><div class="kidpick">${ks.map((c) => `<button data-a="kidpick" data-v="${esc(c.slug)}">${kidArt(c.slug) ? `<img src="${kidArt(c.slug, true)}" alt="">` : `<span>${esc(c.emoji)}</span>`}<b>${esc(kidName(c.slug))}</b></button>`).join('')}</div>
<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">${ic('lock', 'klk')}</button></div>`;
  }
  if (!kidTrip(kid)) return `<div class="kidwrap pick enter"><p class="empty">${L('ยังไม่มีเล่มของหนู', 'No book for you yet')}</p><button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">${ic('lock', 'klk')}</button></div>`;   // never a page without the lock: a grown-up must be able to leave
  const t = kidTrip(kid);
  const pp = t.passport || {}, i = kidDayOf(t), d = t.days[i], pd = (pp.days || [])[i] || {}, g = pp.guides || [];
  const view = p[2] || 'home', name = kidName(kid), pre = preTrip(t), cd = pp.countdown, wild = ((t.info || {}).wild || []);
  if (quest && (quest.game !== view || quest.kid !== kid || quest.tid !== t.id)) { const qt = trip(quest.tid); if (qt && !questGot(qt, quest.kid, quest.town, quest.slot)) questQuit(quest); quest = null; questReset(); }   // off the mission's page: free play again
  const fill = (x) => String(x || '').replace(/\{name\}/g, name);
  const style = `--accent:${esc(pd.acc || t.theme.accent || '#1F3A5F')};--tint:${esc(pd.tint || '#F3F6FA')}`;
  const back = `<button class="kidback" data-a="kidnav" data-v="#/kid/${esc(kid)}${quest ? '/quest' : ''}" aria-label="${L('กลับ', 'Back')}">‹</button>`;
  const lock = `<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">${ic('lock', 'klk')}</button>`;
  const guideImg = (n) => (g[n] ? `<img class="guide" src="${esc(g[n].art)}" alt="">` : '');
  const head = `<header class="kidhd">${view === 'home' ? `<button class="kidme" data-a="kidnav" data-v="#/kid" aria-label="${L('เปลี่ยนคน', 'Switch child')}">${kidFace(kid)}</button>` : back}
<div class="kidday">${artImg(t, i)}<div><small>${L('วันที่', 'Day')} ${i + 1}</small><b>${wj(esc(T(pd.title) || T(d.title)))}</b></div></div>
<button class="kidhear" data-a="kidhear" aria-label="${L('ฟัง', 'Listen')}">🔊</button></header>`;   // every kid page reads itself aloud: a small child cannot read yet
  let body = '';
  if (view === 'home') {
    const lit = littleOf(t, kid), words = lit ? null : (pp.lists || []).find((l) => l.said), story = kidStory(t, i), live = dayNow(t);   // the little one: no words-to-say, no quiz
    const fresh = heartsFor(kid).filter((h) => h.at > (ls('hseen_' + kid) || 0));
    const tiles = (pre
      ? [cd && ['count', '🎁', L('เซอร์ไพรส์', 'Surprise')], cd && cd.pack && ['pack', '🧳', L('จัดกระเป๋า', 'Pack')], canColour(t, i) && ['colour', '🎨', L('ระบายสี', 'Colour')], ['draw', '🖍️', L('วาดรูป', 'Draw')], ['bubbles', '🫧', L('ฟองสบู่', 'Bubbles')], ['music', '🎵', L('ดนตรี', 'Music')], ['hideseek', '🙈', L('ซ่อนหา', 'I spy')]]
      : [canColour(t, i) && ['colour', '🎨', L('ระบายสี', 'Colour')], ['draw', '🖍️', L('วาดรูป', 'Draw')], ['bubbles', '🫧', L('ฟองสบู่', 'Bubbles')], ['music', '🎵', L('ดนตรี', 'Music')], ['hideseek', '🙈', L('ซ่อนหา', 'I spy')], ['spot', littleOf(t, kid) ? '👉' : '🔍', littleOf(t, kid) ? L('ชี้ แตะ', 'Point it') : L('หาของ', 'Find it')], ['stamp', '🛂', L('ปั๊มตรา', 'Stamp')]])
      .concat(words ? [['words', '🗣️', L('พูดตาม', 'Say it')]] : [], ((d.plan || {}).quiz || []).length && !lit ? [['quiz', '❓', L('ทายซิ', 'Quiz')]] : [],
        kidTalk(t, i) ? [['talk', '💬', L('คุยกัน', 'Let’s talk')]] : [], !pre && i > 0 && memQuiz(t, i - 1) ? [['memory', '🧠', L('จำได้ไหม', 'Remember?')]] : [], kidPhotos(t, i).length ? [['photos', '📸', L('ดูรูป', 'Photos')]] : [], [['match', '🧩', L('จับคู่', 'Match')], ['shadow', '🦒', L('เงาของใคร', 'Shadows')], ['feed', '🍌', L('ป้อนอาหาร', 'Feed me')], ['sort', '🧺', L('แยกสี', 'Colours')], ['farm', '🐮', L('เสียงสัตว์', 'Animal sounds')], ['wash', '🛁', L('อาบน้ำ', 'Bath time')], ['bigsmall', '🐘', L('ใหญ่-เล็ก', 'Big & small')], ['maze', '🧭', L('เขาวงกต', 'Maze')], ['where', '📍', L('ตรงไหนนะ', 'Where is it?')], ['odd', '🤔', L('ไม่เข้าพวก', 'Odd one out')], ['next', '➡️', L('อะไรมาต่อ', 'What’s next?')], ['simon', '🎹', L('จำเสียงตามสี', 'Copy the tune')], ['dots', '✨', L('ลากจุดต่อภาพ', 'Join the dots')], ['howmany', '🧮', L('มีกี่ตัว', 'How many?')], ['cake', '🎂', L('แต่งเค้ก', 'Decorate a cake')]], pre ? [] : [['mood', '😊', L('วันนี้รู้สึก', 'My mood')]],
        wild.length ? [['animals', (t.info.wildLabel || {}).emo || '🦘', t.info.wildLabel ? esc(T(t.info.wildLabel.short)) : L('สัตว์', 'Animals')]] : [], [['numbers', '🔢', L('นับเลข', 'Count')]], dayArt(t, i) || kidPhotoPool(t).length ? [['jigsaw', '🖼️', L('ต่อภาพ', 'Puzzle')]] : []).filter(Boolean);   // map, stickers and trophies live on the kid bar below — not twice
    const until = daysUntil(t);
    const btns = tiles.map(([v, e, lbl]) => { const k = KTILE[v] || KTILE._; return `<button class="pic" style="--k1:${k[1]};--k2:${k[2]}" data-a="kidnav" data-v="#/kid/${esc(kid)}/${v}" data-say="${esc(lbl)}">${k[0] ? `<img src="/art/kidui/${k[0]}.webp" alt="">` : `<span>${e}</span>`}<b>${lbl}</b></button>`; })
      .concat(story ? [`<button class="night" data-a="bedtime" data-v="${esc(story.id)}"><span>${emo('🌙')}</span><b>${L('นิทาน', 'Story')}</b></button>`] : [],
        heartsFor(kid).length && !fresh.length ? [`<button class="love" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(L('หัวใจจากญาติ', 'Hearts from the family'))}"><span>${emo('💗')}</span><b>${heartsFor(kid).length}</b></button>`] : []);
    const pages = []; for (let k = 0; k < btns.length; k += 4) pages.push(btns.slice(k, k + 4));
    body = `${fresh.length ? `<button class="kidhearts" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(heartLine(fresh[0], kid))}"><span class="float" aria-hidden="true">💗</span><span class="e">${emo(fresh[0].emoji)}</span><b>${esc(L(`${fresh[0].from} ส่งหัวใจให้หนู!`, `${fresh[0].from} sent you a heart!`))}</b>${fresh.length > 1 ? `<small>+${fresh.length - 1}</small>` : ''}</button>` : ''}
${live === i && !ticked(t, `gift.d${i}`, kid) ? `<button class="kidgift" data-a="kidnav" data-v="#/kid/${esc(kid)}/gift" data-say="${esc(L('มีกล่องเซอร์ไพรส์มาให้! แตะเปิดเลย', 'A surprise box for you! Tap to open it'))}"><span class="box" aria-hidden="true">${emo('🎁')}</span><b>${L('<span class="nw">กล่องเซอร์ไพรส์</span><span class="nw">วันนี้!</span>', 'Today’s surprise box!')}</b><small>${L('แตะเปิดเลย', 'Tap to open')}</small></button>`
  : live === i && hourIn(t.timezone) >= 17 && !ticked(t, `stamp.d${i}`, kid) ? `<button class="kidnight" data-a="kidnav" data-v="#/kid/${esc(kid)}/stamp" data-say="${esc(L('ก่อนนอน มาปั๊มตราวันนี้กัน!', 'Before bed — let’s stamp today!'))}"><span class="moon" aria-hidden="true">${emo('🌙')}</span><b>${L('ปั๊มตราวันนี้ก่อนนอน!', 'Stamp today before bed!')}</b><small>🛂 ${L('ปั๊ก!', 'Thump!')}</small></button>` : ''}
${questBanner(t, kid)}
<div class="kidhello">${kidArt(kid) ? `<button class="poke" data-a="kidpoke" data-k="${esc(kid)}" aria-label="${esc(name)}"><img src="${kidArt(kid, true)}" alt=""></button>` : ''}<p>${pre ? L(`<span class="nw">อีก <b>${until}</b> วัน</span> เราจะไป<span class="nw">${esc(T(t.title).split(' · ').pop())}กัน!</span>`, `<b>${until}</b> ${until === 1 ? 'sleep' : 'sleeps'} to ${esc(T(t.title).split(' · ')[0])}!`) : L(`<span class="nw">สวัสดี ${esc(name)}!</span> <span class="nw">วันนี้เล่นอะไรดี?</span>`, `Hello ${esc(name)}! What shall we play?`)}</p></div>
${stars(kid) ? `<div class="jarrow"><button class="starjar" data-a="kidjar" data-k="${esc(kid)}" aria-label="${L('โถดาว · ผู้ใหญ่กดค้างเพื่อล้าง', 'Star jar · grown-ups press and hold to empty')}">⭐ <b>${stars(kid)}</b></button>${pets(kid).length ? `<span class="pets" aria-label="${L('เพื่อน', 'Friends')}">${pets(kid).join('')}</span>` : ''}</div>` : ''}
<nav class="kiddays">${t.days.map((x, j) => `<button data-a="kidday" data-v="${j}" aria-pressed="${j === i}" aria-label="${L('วันที่', 'Day')} ${j + 1}">${artImg(t, j)}</button>`).join('')}</nav>
<div class="kidpagerwrap"><button class="kparrow prev" data-a="kidpage" data-v="-1" aria-label="${L('หน้าก่อน', 'Previous page')}" hidden>‹</button>
<div class="kidpager" id="kidpager">${pages.map((pg, n) => `<div class="kpage kidtiles" data-n="${n}">${pg.join('')}</div>`).join('')}</div>
<button class="kparrow next" data-a="kidpage" data-v="1" aria-label="${L('หน้าถัดไป', 'Next page')}"${pages.length > 1 ? '' : ' hidden'}>›</button></div>
${pages.length > 1 ? `<div class="kdots" id="kdots">${pages.map((_, n) => `<i${n === 0 ? ' class="on"' : ''}></i>`).join('')}</div>` : ''}`;
  } else if (view === 'quest') {
    body = questHtml(t, kid, guideImg);
  } else if (view === 'colour') {
    body = `<div class="colourpad colsvg" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}"></div>
<div class="palette">${COLOURS.map((c) => `<button data-a="kidcolor" data-v="${c}" style="--c:${c}" aria-pressed="${c === kidColour}" aria-label="${c}"></button>`).join('')}</div>
<button class="kidbig" data-a="kidcolourdone" data-v="#/kid/${esc(kid)}">${L('เสร็จแล้ว! ✨', 'All done! ✨')}</button>`;
  } else if (view === 'draw') {
    const day = pre ? null : i, mine = drawingsOf(t, kid, day === null ? undefined : day).filter((m) => m.day === day);
    body = `<div class="kidguide">${guideImg(1)}<p>${pre ? L(`วาดสิ่งที่อยากเจอที่${esc(T(t.title).split(' · ')[0])}`, `Draw what you want to see in ${esc(T(t.title).split(' · ')[0])}`) : L('วาดสิ่งที่ชอบที่สุดวันนี้!', "Draw today's best moment!")}</p></div>
<div class="drawwrap${pad.hide ? ' busy' : ''}${pad.full ? ' full' : ''}" id="drawwrap"><div class="drawpad"><canvas id="kidcanvas" width="${DRAW_W}" height="${DRAW_H}" data-key="${esc(`${t.id}:${day}:${kid}`)}" aria-label="${L('กระดานวาดรูป', 'Drawing board')}"></canvas>
<button class="dpb dpcol" id="drawcol" data-a="kidtray" style="--c:${kidColour}" aria-label="${L('เลือกสี', 'Colours')}">🎨</button><button class="dpb dpfull" id="drawfull" data-a="kidfull" aria-label="${pad.full ? L('ย่อกระดาษ', 'Smaller paper') : L('กระดาษเต็มจอ', 'Full-screen paper')}">${pad.full ? '✕' : '⛶'}</button><button class="dpb dpundo" data-a="kidundo" aria-label="${L('ย้อนกลับ', 'Undo')}">↶</button></div>
<div class="drawtray" id="drawtray"><div class="palette">${COLOURS.map((c) => `<button data-a="kidcolor" data-v="${c}" style="--c:${c}" aria-pressed="${c === kidColour}" aria-label="${c === '#FFFFFF' ? L('ยางลบ', 'Eraser') : c}"></button>`).join('')}</div>
<div class="drawtools">${PEN.map((w) => `<button data-a="kidpen" data-v="${w}" aria-pressed="${w === pen}" aria-label="${L('ขนาดพู่กัน', 'Brush')} ${w}"><i style="width:${Math.round(w / 2) + 6}px;height:${Math.round(w / 2) + 6}px"></i></button>`).join('')}
<button class="dclear" data-a="kidclear" aria-label="${L('ล้างแล้ววาดใหม่', 'Wipe and start again')}">🧽 <b>${L('วาดใหม่', 'Start again')}</b></button></div></div></div>
<button class="kidbig" data-a="kiddrawdone" data-t="${esc(t.id)}" data-d="${day === null ? '' : day}" data-k="${esc(kid)}">${L('เก็บรูปนี้! ✨', 'Keep it! ✨')}</button>
${mine.length ? `<div class="drawn">${mine.map((m) => `<img src="${esc(imgT(m))}" alt="">`).join('')}</div>` : ''}`;
  } else if (view === 'spot') {
    const spots = daySpots(t, i, kid), lit = littleOf(t, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${lit ? L(`${name} ชี้ให้ดูหน่อย!`, `${name}, can you point to it?`) : L(`${T((g[1] || {}).name)}: หาให้เจอนะ!`, `${T((g[1] || {}).name)}: can you find them?`)}</p></div>
<div class="kidspots${lit ? ' little' : ''}">${spots.map((s) => { const on = ticked(t, s.key, kid); return `<button class="${on ? 'on' : ''}" data-a="kidspot" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="${esc(s.key)}" data-say="${esc(T(s))}" aria-pressed="${!!on}"><span>${esc(s.e)}</span><b>${esc(T(s))}</b>${on ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>`;
  } else if (view === 'gift' && !pre) {
    const got = ticked(t, `gift.d${i}`, kid), sp = daySpots(t, i, kid), fact = (pd.facts || [])[0], lit = littleOf(t, kid);
    body = got ? `<div class="giftopen"><div class="gstk">${giftE(i)}</div><p class="gnew">${L('ได้สติกเกอร์ใหม่!', 'A new sticker!')} ⭐</p>
<div class="kidguide">${guideImg(0)}<p>${esc(T(pd.title) || T(d.title))}${fact ? ` — ${esc(T(fact))}` : ''}</p></div>
${sp.length ? `<div class="gmiss"><b>${lit ? L('วันนี้ชี้ให้ดูนะ', 'Point to these today') : L('วันนี้หาให้เจอนะ', 'Find these today')}</b><div>${sp.map((x) => `<span title="${esc(T(x))}">${esc(x.e)}</span>`).join('')}</div></div>` : ''}
<button class="kidbig" data-a="kidnav" data-v="#/kid/${esc(kid)}/spot">${lit ? '👉 ' + L('ไปชี้กัน!', 'Let’s point!') : '🔍 ' + L('ไปหากัน!', 'Let’s find them!')}</button></div>`
      : `<div class="kidguide">${guideImg(0)}<p>${L(`${esc(name)} แตะกล่องเลย!`, `${esc(name)}, tap the box!`)}</p></div>
<button class="giftbox" data-a="kidgift" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" aria-label="${L('เปิดกล่อง', 'Open the box')}"><span>🎁</span></button>`;
  } else if (view === 'memory' && i > 0 && memQuiz(t, i - 1)) {   // yesterday's memory game: one question at a time, no score — a wrong tap just says "try again"
    const qs = memQuiz(t, i - 1), key = `${t.id}.${i - 1}.${kid}`;
    if (!memState || memState.key !== key) memState = { key, n: 0, got: false };
    if (memState.n >= qs.length) body = `<div class="kidguide pop">${guideImg(0)}<p>${L(`เก่งมาก ${esc(name)}! จำเมื่อวานได้เยอะเลย 🎉`, `Brilliant, ${esc(name)}! You remember so much 🎉`)}</p></div>
<button class="kidbig" data-a="memagain">🔁 ${L('เล่นอีกรอบ', 'Play again')}</button>`;
    else {
      const x = qs[memState.n], voice = /[\u0E00-\u0E7F]/.test(x.q) ? 'th-TH' : 'en-GB';
      body = `<div class="kidguide">${guideImg(1)}<p>${L('เมื่อวานนะ… จำได้ไหม?', 'Yesterday… do you remember?')}</p></div>
<button class="memq" data-a="kidword" data-v="${esc(x.q)}" data-lang="${voice}"><b>${esc(x.q)}</b><i>🔊</i></button>
<div class="mema">${x.a.map((c, n) => `<button data-a="memans" data-ok="${n === x.ok ? 1 : 0}" data-last="${memState.n + 1 >= qs.length ? 1 : 0}" data-say="${esc(c.t)}"${memState.got && n === x.ok ? ' class="right"' : ''}><span>${esc(c.e)}</span><b>${esc(c.t)}</b></button>`).join('')}</div>
${memState.got ? `<button class="kidbig" data-a="memnext">${memState.n + 1 < qs.length ? L('ข้อต่อไป ›', 'Next ›') : L('เสร็จแล้ว! 🎉', 'All done! 🎉')}</button>` : ''}`;
    }
  } else if (view === 'bubbles') {   // pop the bubbles: they float up, anything tapped pops with a sound; every 15 pops a cheer and a star
    setTimeout(startBubbles, 0);
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะฟองให้แตก!', 'Pop the bubbles!')}</p></div>
<div class="bubblefield" id="bubblefield" data-k="${esc(kid)}"><div class="bubscore" id="bubscore" aria-live="polite"></div></div>`;
  } else if (view === 'maze') {   // the maze: drag the animal to its goal
    const m = mazeFor(t, kid);
    body = lvBar(t, kid, 'maze') + `<div class="kidguide">${guideImg(0)}<p>${m.done ? L(`เย้! ${esc(m.pair[2])}เจอ${esc(m.pair[3])}แล้ว 🎉`, `Hooray! The ${esc(m.pair[4])} found the ${esc(m.pair[5])} 🎉`) : m.star >= 0 && !m.got ? L(`เก็บดาว ⭐ ก่อน แล้วพา${esc(m.pair[2])}ไปหา${esc(m.pair[3])}`, `Pick up the ⭐, then help the ${esc(m.pair[4])} find the ${esc(m.pair[5])}`) : L(`พา${esc(m.pair[2])}ไปหา${esc(m.pair[3])}กัน! ลากนิ้วตามทาง`, `Help the ${esc(m.pair[4])} find the ${esc(m.pair[5])}! Drag along the path`)}</p></div>
<div class="mazeb${m.done ? ' won' : ''}" id="mazeb" style="--n:${m.n}" role="img" aria-label="${L('เขาวงกต', 'Maze')}">${mazeCells()}</div>
${m.done ? lvWin(t, kid, 'maze', ['mazeagain']) : `<button class="kidbig ghost" data-a="mazeagain">🔀 ${L('ทางใหม่', 'New maze')}</button>`}`;
  } else if (view === 'simon') {   // copy the tune
    const s2 = simonFor(t, kid);
    body = lvBar(t, kid, 'simon') + `<div class="kidguide">${guideImg(0)}<p id="simonsay">${s2.done ? L(`เก่งมาก ${esc(name)}! จำเพลงได้หมดเลย 🎉`, `Brilliant, ${esc(name)}! You remembered every tune 🎉`) : s2.turn === 'you' ? L('ถึงตาหนู! กดตามเพลง', 'Your turn! Play it back') : L('กดฟัง แล้วกดตามนะ', 'Listen, then play it back')}</p></div>
<div class="simonb${s2.turn === 'listen' ? ' listen' : ''}" id="simonb">${SIMON.map((q, k) => `<button class="spad" style="--pc:${q[0]}" data-a="simonpad" data-v="${k}" aria-label="${esc(L(q[3], q[4]))}"><span>${q[1]}</span></button>`).join('')}</div>
${s2.done ? '' : simTrackHtml(s2.seq.length)}
${s2.n && !s2.done ? `<div class="simstars" aria-hidden="true">${'⭐'.repeat(s2.n)}</div>` : ''}
${s2.done ? lvWin(t, kid, 'simon', ['simonagain']) : `<button class="kidbig" data-a="simonplay">▶️ ${L('ฟังเพลง', 'Listen')}</button>`}`;
  } else if (view === 'dots') {   // connect the dots
    const d2 = dotsFor(t, kid), sh = DOT_SHAPES[d2.order[d2.n]];
    body = lvBar(t, kid, 'dots') + `<div class="kidguide">${guideImg(1)}<p>${d2.done ? L(`เก่งมาก ${esc(name)}! ต่อจุดครบทุกรูปแล้ว 🎉`, `Brilliant, ${esc(name)}! Every picture is done 🎉`) : d2.shown ? L(`เป็น${esc(sh.th)}!`, `It’s ${esc(sh.en)}!`) : L('ลากนิ้วต่อจุด 1 2 3 ไปเรื่อยๆ', 'Join the dots: 1, 2, 3…')}</p></div>
<div class="dotsb${d2.shown ? ' won' : ''}" id="dotsb">${dotsSvg()}</div>
${d2.done ? lvWin(t, kid, 'dots', ['dotsagain']) : ''}`;
  } else if (view === 'cake') {   // decorate a cake
    const c2 = cakeFor(kid), candles = c2.items.some((x) => x.e === '🕯️');
    body = `<div class="kidguide">${guideImg(0)}<p>${c2.blown ? L('สุขสันต์วันเกิด! 🎉', 'Happy birthday! 🎉') : candles ? L('ปักเทียนแล้ว เป่าเลย!', 'Candles on — blow them out!') : L('แตะของแต่งเค้กเลย!', 'Tap the toppings to decorate the cake!')}</p></div>
<div class="cakebox" id="cakebox">${CAKE_SVG}${c2.items.map((x) => `<span class="ctop${x.e === '🕯️' ? ' candle' : ''}${c2.blown && x.e === '🕯️' ? ' out' : ''}" style="left:${x.x}%;top:${x.y}%">${x.e}</span>`).join('')}</div>
<div class="ctray">${CAKE_TOPS.map((e) => `<button data-a="cakeadd" data-v="${e}" aria-label="${e}"><span>${e}</span></button>`).join('')}</div>
${candles && !c2.blown ? `<button class="kidbig" data-a="cakeblow">🌬️ ${L('เป่าเทียน!', 'Blow!')}</button>` : ''}
${c2.items.length ? `<button class="kidbig ghost" data-a="cakenew">🎂 ${L('เค้กใหม่', 'New cake')}</button>` : ''}`;
  } else if (view === 'where' || view === 'odd' || view === 'next' || view === 'howmany') {   // where is it · odd one out · what comes next: one round at a time, five levels
    const g2 = kgFor(view, t, kid), r = g2.r;
    const doneLine = L(`เก่งมาก ${esc(name)}! ผ่าน${lvWord(t, kid, view)}แล้ว 🎉`, `Brilliant, ${esc(name)}! You finished ${lvWord(t, kid, view)} 🎉`);
    let board = '';
    if (!g2.done && view === 'where') {
      const inPlay = new Set(g2.lv.p);
      board = `${r.mode === 'place' || (r.mode === 'two' && !g2.got) ? `<div class="wheretake" aria-hidden="true">${r.item}</div>` : ''}<div class="whereb">${Array.from({ length: 9 }, (_, q) => !inPlay.has(q) ? '<div class="wcell off"></div>'
        : r.mode === 'two' ? `<button class="wcell slot${r.placed[q] ? ' right' : ''}" data-a="kgpick" data-v="${q}" aria-label="${esc(L(WHERE_NAME[q][0], WHERE_NAME[q][1]))}"><span>${r.placed[q] || ''}</span></button>`
        : r.mode === 'find' ? `<button class="wcell${g2.got && q === r.pos ? ' right' : ''}" data-a="kgpick" data-v="${q}" aria-label="${esc(L(WHERE_ITEM[r.at[q]][0], WHERE_ITEM[r.at[q]][1]))}"><span>${r.at[q]}</span></button>`
          : `<button class="wcell slot${g2.got && q === r.pos ? ' right' : ''}" data-a="kgpick" data-v="${q}" aria-label="${esc(L(WHERE_NAME[q][0], WHERE_NAME[q][1]))}"><span>${g2.got && q === r.pos ? r.item : ''}</span></button>`).join('')}</div>`;
    } else if (!g2.done && view === 'odd') {
      board = `<div class="mema kgch oddch" data-n="${r.opts.length}">${r.opts.map((e) => `<button data-a="kgpick" data-v="${esc(e)}"${g2.got && e === r.one ? ' class="right"' : ''}><span>${e}</span></button>`).join('')}</div>`;
    } else if (!g2.done && view === 'howmany') {
      board = `<div class="hmbox${r.n > 10 ? ' many' : ''}">${r.items.map((it, k) => `<button class="hmi${r.ct.includes(k) ? ' ct' : ''}" style="left:${it.x}%;top:${it.y}%" data-a="hmtap" data-v="${k}"${r.ct.includes(k) ? ` data-c="${r.ct.indexOf(k) + 1}"` : ''} aria-label="${k + 1}"><span>${r.e}</span></button>`).join('')}</div>
<div class="mema kgch hmch" data-n="${r.opts.length}">${r.opts.map((n) => `<button data-a="kgpick" data-v="${n}"${g2.got && n === r.n ? ' class="right"' : ''}><span>${n}</span></button>`).join('')}</div>`;
    } else if (!g2.done && view === 'next') {
      board = `<div class="nextrow" aria-hidden="true">${r.shown.map((e) => `<span>${e}</span>`).join('')}<span class="q">${g2.got ? r.answer : '❓'}</span></div>
<div class="mema kgch" data-n="${r.opts.length}">${r.opts.map((e) => `<button data-a="kgpick" data-v="${esc(e)}"${g2.got && e === r.answer ? ' class="right"' : ''}><span>${e}</span></button>`).join('')}</div>`;
    }
    body = lvBar(t, kid, view) + (g2.done ? `<div class="kidguide pop">${guideImg(0)}<p>${doneLine}</p></div>${lvWin(t, kid, view, ['kgagain', view])}`
      : `<div class="kidguide">${guideImg(1)}<p>${esc(kgAsk(g2))}</p></div>${board}`);
  } else if (view === 'farm') {   // animal sounds: the farm is the game, a tap makes an animal jump and say its sound; all of them heard = a cheer
    const fm = farmFor(t, kid);
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะสัตว์ ฟังเสียงร้องกัน!', 'Tap an animal to hear it!')}</p></div>
<div class="farmfield">${FARM.map((a, n) => `<button class="fa${fm.heard.has(n) ? ' heard' : ''}" style="left:${a[5]}%;top:${a[6]}%" data-a="farmtap" data-v="${n}" aria-label="${esc(L(a[1], a[2]))}"><span>${a[0]}</span></button>`).join('')}</div>`;
  } else if (view === 'wash') {   // bath time: scrub the mud off with a finger (a canvas over the animal), a clean animal sparkles
    const w = washFor(t, kid);
    setTimeout(washMount, 0);
    body = `<div class="kidguide">${guideImg(1)}<p>${w.clean ? L(`${esc(w.a[1])}สะอาดแล้ว! หอมจัง`, `${esc(w.a[2])} is all clean!`) : L(`${esc(w.a[1])}เลอะโคลน! ถูให้สะอาดหน่อย`, `${esc(w.a[2])} is muddy! Scrub scrub!`)}</p></div>
<div class="washbox${w.clean ? ' clean' : ''}" id="washbox"><span class="wa">${w.a[0]}</span><div id="washph"></div></div>
${w.clean ? `<button class="kidbig" data-a="washnext">🛁 ${L('ตัวต่อไป', 'Next friend')}</button>` : ''}`;
  } else if (view === 'bigsmall') {   // big and small: the same thing in two or three sizes, tap the biggest or the smallest
    const g2 = kgFor('bigsmall', t, kid), r = g2.r;
    body = lvBar(t, kid, 'bigsmall') + (g2.done ? `<div class="kidguide pop">${guideImg(0)}<p>${L(`เก่งมาก ${esc(name)}! ผ่าน${lvWord(t, kid, 'bigsmall')}แล้ว 🎉`, `Brilliant, ${esc(name)}! You finished ${lvWord(t, kid, 'bigsmall')} 🎉`)}</p></div>
${lvWin(t, kid, 'bigsmall', ['kgagain', 'bigsmall'])}`
      : `<div class="kidguide">${guideImg(0)}<p>${r.big ? L(`${esc(r.thing[1])}ตัวไหนใหญ่ที่สุด?`, `Which ${esc(r.thing[2])} is the biggest?`) : L(`${esc(r.thing[1])}ตัวไหนเล็กที่สุด?`, `Which ${esc(r.thing[2])} is the smallest?`)}</p></div>
<div class="bsrow${r.sizes.length > 4 ? ' many' : ''}" style="--bk:${Math.min(1, 3.2 / r.sizes.length).toFixed(2)}">${r.sizes.map((z, n) => `<button data-a="kgpick" data-v="${n}" style="--z:${z}"${g2.got && n === r.right ? ' class="right"' : ''} aria-label="${esc(L(r.thing[1], r.thing[2]))} ${n + 1}"><span>${r.thing[0]}</span></button>`).join('')}</div>`);
  } else if (view === 'shadow') {   // whose shadow? a big black shape, pick the thing it belongs to; right = the shape fills with colour and its name is said
    const g2 = kgFor('shadow', t, kid), r = g2.r;
    body = lvBar(t, kid, 'shadow') + (g2.done ? `<div class="kidguide pop">${guideImg(0)}<p>${L(`เก่งมาก ${esc(name)}! ผ่าน${lvWord(t, kid, 'shadow')}แล้ว 🎉`, `Brilliant, ${esc(name)}! You finished ${lvWord(t, kid, 'shadow')} 🎉`)}</p></div>
${lvWin(t, kid, 'shadow', ['kgagain', 'shadow'])}`
      : `<div class="kidguide">${guideImg(0)}<p>${g2.got ? L(`ใช่แล้ว! ${esc(r.want[1])}!`, `Yes! A ${esc(r.want[2])}!`) : g2.lv.half ? L('เห็นแค่ครึ่งเดียว! เงาของใครเอ่ย?', 'Only half of it! Whose shadow is this?') : L('นี่เงาของใครเอ่ย?', 'Whose shadow is this?')}</p></div>
<div class="shbig${g2.got ? ' lit' : ''}${g2.lv.flip ? ' flip' : ''}${g2.lv.half ? ' half' : ''}" aria-hidden="true"><span>${r.want[0]}</span></div>
<div class="mema kgch" data-n="${r.opts.length}">${r.opts.map((o) => `<button data-a="kgpick" data-v="${esc(o[0])}"${g2.got && o === r.want ? ' class="right"' : ''}><span>${o[0]}</span><b>${esc(L(o[1], o[2]))}</b></button>`).join('')}</div>`);
  } else if (view === 'feed') {   // feed the animal: it asks for one food (the picture in its bubble, the words read aloud); the right one is munched
    const g2 = kgFor('feed', t, kid), r = g2.r;
    body = lvBar(t, kid, 'feed') + (g2.done ? `<div class="kidguide pop">${guideImg(1)}<p>${L(`${esc(r.pal[1])}อิ่มแล้ว! ขอบคุณ${esc(name)}นะ 🎉`, `${esc(r.pal[2])} is full! Thank you, ${esc(name)} 🎉`)}</p></div>
<div class="feedpal full" aria-hidden="true"><span class="pal">${r.pal[0]}</span><div class="fedrow">${g2.fed.join('')}</div></div>
${lvWin(t, kid, 'feed', ['kgagain', 'feed'])}`
      : `<div class="kidguide">${guideImg(1)}<p>${g2.lv.mem ? L(`${esc(r.pal[1])}หิวจัง! จำให้ดีนะ อยากกินอะไร`, `${esc(r.pal[2])} is hungry! Remember the wish`) : L(`${esc(r.pal[1])}หิวจัง! อยากกิน${esc(r.want[1])}`, `${esc(r.pal[2])} is hungry! ${esc(capFirst(r.want[3]))}, please`)}</p></div>
<div class="feedpal${g2.lv.mem ? ' mem' : ''}"><span class="want${r.hid ? ' gone' : ''}" id="kgwant" aria-hidden="true">${r.want[0]}</span><button class="pal" id="kgpal" data-a="kgpal" aria-label="${esc(L(r.pal[1], r.pal[2]))}">${r.pal[0]}</button><div class="fedrow" aria-hidden="true">${g2.fed.join('')}</div></div>
<div class="mema kgch" data-n="${r.opts.length}">${r.opts.map((o) => `<button data-a="kgpick" data-v="${esc(o[0])}"><span>${o[0]}</span><b>${esc(L(o[1], o[2]))}</b></button>`).join('')}</div>`);
  } else if (view === 'sort') {   // sort by colour: one thing at a time, tap the basket of its colour; the colour's name is said
    const g2 = kgFor('sort', t, kid), it = g2.items[g2.n];
    body = lvBar(t, kid, 'sort') + (g2.done ? `<div class="kidguide pop">${guideImg(1)}<p>${L(`เก่งมาก ${esc(name)}! ผ่าน${lvWord(t, kid, 'sort')}แล้ว 🎉`, `Brilliant, ${esc(name)}! You finished ${lvWord(t, kid, 'sort')} 🎉`)}</p></div>
${lvWin(t, kid, 'sort', ['kgagain', 'sort'])}`
      : `<div class="kidguide">${guideImg(1)}<p>${L('อันนี้สีอะไร? ใส่ตะกร้าสีเดียวกันเลย', 'What colour is it? Put it in the same colour basket')}</p></div>
<div class="sortitem" aria-hidden="true"><span>${it.e}</span></div>`);
    if (!g2.done) body += `<div class="baskets">${g2.cols.map((c) => `<button class="basket" style="--bc:${c.c}" data-a="kgpick" data-v="${c.k}" aria-label="${esc(L(c.th, c.en))}"><span class="in">${(g2.bin[c.k] || []).join('')}</span><b>${esc(L(c.th, c.en))}</b></button>`).join('')}</div>`;
  } else if (view === 'music') {   // a xylophone (C major, an animal on every bar), three drums, two songs that light the bars to follow
    body = `<div class="kidguide">${guideImg(1)}<p>${L('แตะแท่งสีให้ร้องเพลง!', 'Tap the bars to make music!')}</p></div>
<div class="xylo" role="group">${XYLO.map((n, k) => `<button data-a="xylo" data-v="${k}" style="--c:${n[2]};--h:${100 - k * 7}%" aria-label="${n[0]}"><span>${n[3]}</span></button>`).join('')}</div>
<div class="drums" role="group">${[['kick', '🥁', L('ตุ้ม', 'Boom')], ['snare', '🪘', L('แต๊ก', 'Tak')], ['hat', '🔔', L('ฉิ่ง', 'Ting')], ['clap', '👏', L('ปรบมือ', 'Clap')], ['frog', '🐸', L('กบ', 'Frog')]].map(([k, e, l]) => `<button data-a="drum" data-v="${k}"><span>${e}</span><b>${l}</b></button>`).join('')}</div>
<div class="songs">${SONGS.map((s, k) => `<button class="kidbig ghost" data-a="song" data-v="${k}" data-k="${esc(kid)}">🎶 ${L(s.th, s.en)}</button>`).join('')}</div>`;
  } else if (view === 'hideseek') {   // I spy: twelve things scattered over the day's picture; the guide names one at a time (its Thai name read aloud)
    if (!hs || hs.key !== `${t.id}.${i}.${kid}`) newHide(t, i, kid);
    const want = hs.targets[hs.found.length];
    body = `<div class="kidguide">${guideImg(0)}<p>${want ? L(`หา${want[1]}ให้เจอ! ${want[0]}`, `Find the ${want[2]}! ${want[0]}`) : L('เจอครบแล้ว! เก่งมาก 🎉', 'Found them all! Brilliant 🎉')}</p></div>
${pixPick(t, i, 'hideseek', 'kidnewhide')}
<div class="hideboard"${hs.src ? ` style="--art:url('${esc(hs.src)}')"` : ''}>${hs.items.map((it, n) => `<button class="hid${it.found ? ' found' : ''}" style="left:${it.x}%;top:${it.y}%;--s:${it.s}px;--r:${it.r}deg" data-a="kidhide" data-v="${n}" aria-label="${esc(it.th)}">${it.e}</button>`).join('')}</div>
${want ? `<div class="hidetarget" aria-hidden="true">${want[0]}</div>` : `<button class="kidbig" data-a="kidnewhide">🔁 ${L('เล่นใหม่', 'Play again')}</button>`}`;
  } else if (view === 'jigsaw' && (dayArt(t, i) || kidPhotoPool(t).length)) {   // the day's picture in pieces: tap a piece, tap its place (tap-tap, not drag: a small hand can do it)
    if (!jg || jg.key !== `${t.id}.${i}.${kid}` || jg.at !== lvState(t, kid, 'jigsaw').at) newJigsaw(t, i, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${jg.done ? L('ต่อภาพเสร็จแล้ว! 🎉', 'Picture done! 🎉') : jg.pick === null ? L('ลากชิ้นไปใส่ช่องที่ใช่! (หรือแตะชิ้น แล้วแตะช่อง)', 'Drag a piece to its place! (or tap it, then tap the place)') : L('ใส่ตรงไหนดีนะ?', 'Where does it go?')}</p></div>
${lvBar(t, kid, 'jigsaw')}${pixPick(t, i, 'jigsaw', 'kidnewjig')}
<div class="jigboard" style="--art:url('${esc(jg.src)}');--c:${jg.cols};--ar:${jg.ar};--pa:${jg.ar * jg.rows / jg.cols}">${jg.slots.map((p, s) => `<button class="jslot${p !== null ? ' filled' : ''}" data-a="kidjslot" data-v="${s}"${p !== null ? ` style="${jgPos(p, jg)}"` : ''} aria-label="${L('ช่อง', 'Slot')} ${s + 1}"></button>`).join('')}</div>
<div class="jigtray${jg.slots.length > 20 ? ' many lots' : jg.slots.length > 6 ? ' many' : ''}" style="--art:url('${esc(jg.src)}');--pa:${jg.ar * jg.rows / jg.cols}">${jg.tray.map((p) => `<button class="jpiece${jg.pick === p ? ' pick' : ''}" data-a="kidjpick" data-v="${p}" style="${jgPos(p, jg)}" aria-label="${L('ชิ้น', 'Piece')} ${p + 1}"></button>`).join('')}</div>
${jg.done ? lvWin(t, kid, 'jigsaw', ['kidnewjig']) : ''}`;
  } else if (view === 'stamp') {
    const mine = ticked(t, `stamp.d${i}`, kid);
    body = `<div class="kidstamp${mine ? ' done' : ''}" id="kidstamp"><div class="ring"><span class="lbl">${esc(pd.stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</span>${artImg(t, i, 'inked')}</div></div>
<div class="kidguide pop" id="kidcheer" ${mine ? '' : 'hidden'}>${guideImg(0)}<p>${L(`เก่งมาก ${name}! ได้ตราวันนี้แล้ว`, `Well done, ${name}! Today's stamp is yours`)}</p></div>
<button class="kidbig stampbtn" data-a="kidstamp" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}">${mine ? L('ปั๊มอีกที! 🛂', 'Stamp again! 🛂') : L('ปั๊มตรา! 🛂', 'Stamp! 🛂')}</button>`;
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
    if (mapFrom === null && kidEnter && !pre && i > 0 && mapModel(t)) mapFrom = mapPos(mapModel(t), Math.max(0, i - 1));   // walk in from yesterday's stop
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะรูปหมุด แล้วไปด้วยกันเลย!', "Tap a pin and we'll walk there!")}</p></div>
${mapHtml(t, i, [kid].concat((t.theme.children || []).map((c) => c.slug).filter((s) => s !== kid)), mapAt !== null ? mapAt : pre ? 0 : null)}`;
  } else if (view === 'quiz' && ((d.plan || {}).quiz || []).length) {
    body = `<div class="kidguide">${guideImg(1)}<p>${L('แตะการ์ดเพื่อดูคำตอบ!', 'Tap a card to see the answer!')}</p></div>
<div class="kidquiz">${d.plan.quiz.map((q, n) => `<button class="qcard" data-a="kidquiz" data-v="${n}" data-q="${esc(T(q.q))}" data-ans="${esc(T(q.a))}" aria-pressed="false"><small>${L('คำถาม', 'Question')} ${n + 1}</small><b>${esc(T(q.q))}</b><span class="ans" hidden>${esc(T(q.a))}</span></button>`).join('')}</div>`;
  } else if (view === 'talk' && kidTalk(t, i)) {   // bedtime questions: tap a card, the phone reads it; the child answers out loud (nothing stored)
    const qs = kidTalk(t, i).text.split('\n').filter((x) => x.trim());
    body = `<div class="kidguide">${guideImg(0)}<p>${L('แตะการ์ดแล้วตอบดังๆ นะ!', 'Tap a card and say your answer!')}</p></div>
<div class="kidquiz kidtalk">${qs.map((q, n) => `<button class="qcard" data-a="kidtalk" data-q="${esc(q)}" aria-pressed="false"><small>💬 ${n + 1}</small><b>${esc(q)}</b></button>`).join('')}</div>`;
  } else if (view === 'stickers') {
    body = `<div class="kidguide">${guideImg(1)}<p>${L('ลากสติกเกอร์ไปแปะได้เลย!', 'Drag your stickers onto the page!')}</p></div>${stickerBoard(t, kid, true)}`;
  } else if (view === 'photos') {
    const ph = kidPhotos(t, i); if (kidPhoto >= ph.length) kidPhoto = 0; const m = ph[kidPhoto];
    body = m ? `<div class="kidguide">${guideImg(0)}<p>${m.caption ? esc(m.caption) : L(`รูปวันที่ ${m.day + 1}`, `A photo from day ${m.day + 1}`)}</p></div>
<button class="kidphoto" data-a="kidphoto" data-v="1" aria-label="${L('รูปถัดไป', 'Next photo')}"><img src="${esc(imgT(m))}" alt=""></button>
<div class="kpnav"><button class="kidbig ghost" data-a="kidphoto" data-v="-1" aria-label="${L('รูปก่อนหน้า', 'Previous')}">‹</button><span class="kpn">${kidPhoto + 1} / ${ph.length}</span><button class="kidbig ghost" data-a="kidphoto" data-v="1" aria-label="${L('รูปถัดไป', 'Next')}">›</button></div>`
      : `<div class="kidguide">${guideImg(0)}<p>${L('ยังไม่มีรูปเลย', 'No photos yet')}</p></div>`;
    body += kidAudio(t, i);
  } else if (view === 'match') {
    if (!mg || mg.t !== t.id || mg.kid !== kid || mg.at !== lvState(t, kid, 'match').at) newMatch(t, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${mg.won ? L(`เก่งมาก! จับคู่ครบใน ${mg.moves} ครั้ง 🎉`, `Brilliant! All the pairs in ${mg.moves} goes 🎉`) : L('แตะเปิดการ์ดสองใบ หาคู่ที่เหมือนกัน!', 'Tap two cards — find the pairs!')}</p></div>
${lvBar(t, kid, 'match')}${pixPick(t, i, 'match', 'kidnewmatch')}
<div class="mgrid" style="--mc:${mg.cards.length <= 6 ? 3 : mg.cards.length <= 16 ? 4 : mg.cards.length <= 24 ? 5 : 6}">${mg.cards.map((c, n) => `<button class="mcard${c.ph ? ' ph' : ''}${mg.up.includes(n) || mg.done.has(c.k) ? ' open' : ''}${mg.done.has(c.k) ? ' done' : ''}" data-a="kidflip" data-v="${n}" aria-label="${L('การ์ด', 'Card')} ${n + 1}"><span class="back">?</span><span class="face">${c.img ? `<img src="${esc(c.img)}" alt="">` : esc(c.e)}</span></button>`).join('')}</div>
${mg.won ? lvWin(t, kid, 'match', ['kidnewmatch']) : `<button class="kidbig ghost" data-a="kidnewmatch">🔁 ${L('เล่นใหม่', 'Play again')}</button>`}`;
  } else if (view === 'mood' && !pre) {
    const moods = t.moods.length ? t.moods : Object.keys(MOODW), cur = (S.entries.find((e) => e.id === `${t.id}.mood.d${i}.${kid}`) || {}).mood;
    body = `<div class="kidguide">${guideImg(1)}<p>${cur ? L(`วันนี้${esc(name)}รู้สึก ${cur}`, `Today ${esc(name)} feels ${cur}`) : L(`${esc(name)} วันนี้รู้สึกยังไง?`, `${esc(name)}, how do you feel today?`)}</p></div>
<div class="moodgrid">${moods.map((m) => `<button data-a="kidmood" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="${esc(m)}" aria-pressed="${cur === m}"><span>${emo(m)}</span><b>${esc(MOODW[m] ? L(MOODW[m][0], MOODW[m][1]) : '')}</b></button>`).join('')}</div>`;
  } else if (view === 'animals' && wild.length) {
    body = `<div class="kidguide">${guideImg(0)}<p>${(t.info.wildLabel ? L('แตะแล้วฟังชื่อ เจอตัวจริงแตะ 👀 นะ', 'Tap to hear the name · tap 👀 when you spot one') : L('แตะสัตว์ ฟังชื่อเลย! เจอตัวจริงแตะ 👀 นะ', 'Tap an animal to hear its name · tap 👀 when you spot one'))}</p></div>
<div class="animals">${wild.map((w, n) => { const key = `wild.${n}`, on = ticked(t, key, kid); return `<div class="an${on ? ' on' : ''}"><button class="hear" data-a="sayfacts" data-v="${esc(T(w.name))}. ${esc(T(w.text))}"><span>${esc(w.emo || '🐾')}</span><b>${esc(T(w.name))}</b></button><button class="seen" data-a="kidspot" data-t="${esc(t.id)}" data-d="" data-k="${esc(kid)}" data-v="${key}" data-say="${esc(L(`เจอ${T(w.name)}แล้ว!`, `Spotted a ${T(w.name)}!`))}" aria-pressed="${!!on}" aria-label="${L('เจอแล้ว', 'Spotted')}">${on ? '✓' : '👀'}</button></div>`; }).join('')}</div>`;
  } else if (view === 'numbers') {
    if (!cnt) newCount(t, kid);
    const done = cnt.hit.length >= cnt.n;
    body = `<div class="kidguide">${guideImg(1)}<p>${done ? L(`ทั้งหมด ${cnt.n} ตัว! เก่งมาก 🎉`, `${cnt.n} altogether! Brilliant 🎉`) : L('แตะนับทีละตัว — มีกี่ตัวนะ?', 'Tap them one by one — how many?')}</p></div>
<div class="countfield">${Array.from({ length: cnt.n }, (_, k) => `<button class="cnt${cnt.hit.includes(k) ? ' hit' : ''}" data-a="kidcount" data-v="${k}" aria-label="${k + 1}"><span>${esc(cnt.e)}</span><i>${cnt.hit.includes(k) ? cnt.hit.indexOf(k) + 1 : ''}</i></button>`).join('')}</div>
<div class="bignum" id="bignum">${cnt.hit.length || ''}</div>
<button class="kidbig ghost" data-a="kidnewcount">🔁 ${L('นับใหม่', 'Count again')}</button>`;
  } else if (view === 'trophies') {
    const all = trophies(t, kid), got = all.filter((x) => x[3]), seen = new Set(ls('tseen_' + kid) || []), fresh = got.filter((x) => !seen.has(x[0]));
    if (fresh.length) ls('tseen_' + kid, got.map((x) => x[0]));
    body = `<div class="kidguide${fresh.length ? ' pop' : ''}">${guideImg(0)}<p>${fresh.length ? L(`เย้! รางวัลใหม่: ${fresh.map((x) => x[2]).join(', ')} 🎉`, `Yay! New: ${fresh.map((x) => x[2]).join(', ')} 🎉`) : (got.length ? L(`${esc(name)} มี ${got.length} รางวัลแล้ว`, `${esc(name)} has ${got.length} troph${got.length === 1 ? 'y' : 'ies'}`) : L('ถ้วยรางวัลรอหนูอยู่', 'Trophies are waiting for you'))}</p></div>
<div class="trophies">${all.map((x) => `<button class="tro${x[3] ? ' got' : ''}${fresh.some((f) => f[0] === x[0]) ? ' new' : ''}" data-a="sayfacts" data-v="${esc(x[2])}"><span>${x[3] ? x[1] : '🔒'}</span><b>${esc(x[2])}</b></button>`).join('')}</div>`;
  } else if (view === 'hearts') {
    const hs = heartsFor(kid), seen = ls('hseen_' + kid) || 0;
    if (hs.length) ls('hseen_' + kid, Math.max(seen, hs[0].at));
    body = `<div class="kidhearts-list">${hs.map((h) => `<button class="${h.at > seen ? 'new' : ''}" data-a="kidheart" data-v="${esc(heartLine(h, kid))}"><span class="e">${emo(h.emoji)}</span><b>${esc(h.from)}</b>${h.text ? `<p>${emoIn(esc(h.text))}</p>` : ''}<i>🔊</i></button>`).join('') || `<div class="kidguide">${guideImg(0)}<p>${L(`ยังไม่มีหัวใจเลย — เดี๋ยวคุณตาคุณยายส่งมาให้${esc(name)}นะ 💗`, `No hearts yet — the family will send ${esc(name)} some soon 💗`)}</p></div>`}</div>`;
  } else body = `<button class="kidbig" data-a="kidnav" data-v="#/kid/${esc(kid)}">🏠</button>`;
  // kid mode's own bar: big pictures, read aloud on tap (data-say), no grown-up pages
  const kb = [['', '🏠', L('บ้าน', 'Home')], mapModel(t) && ['map', '🗺️', L('แผนที่', 'Map')], [pre ? (canColour(t, i) ? 'colour' : 'draw') : 'stamp', pre ? (canColour(t, i) ? '🎨' : '🖍️') : '🛂', pre ? (canColour(t, i) ? L('ระบายสี', 'Colour') : L('วาดรูป', 'Draw')) : L('พาสปอร์ต', 'Passport')], ['stickers', '⭐', L('สติกเกอร์', 'Stickers')], ['trophies', '🏆', L('รางวัล', 'Trophies')]].filter(Boolean);
  const bar = `<nav class="kidbar">${kb.map(([v, e, lbl]) => `<button data-a="kidnav" data-v="#/kid/${esc(kid)}${v ? '/' + v : ''}" data-say="${esc(lbl)}"${(v || 'home') === view ? ' aria-current="page"' : ''}>${KBAR[v || 'home'] ? `<img class="kbi" src="/art/kidui/bar-${KBAR[v || 'home']}.webp" alt="">` : ''}<span${KBAR[v || 'home'] ? ' class="vh"' : ''}>${e}</span><b>${lbl}</b></button>`).join('')}</nav>`;
  return `<div class="kidwrap${view === 'home' ? ' home' : ''}${KSCENE[view] ? ` scene sc-${KSCENE[view]}` : ''}${kidEnter ? ' enter' : ''}" style="${style}">${head}${body}${lock}${bar}</div>`;
}

/* ---------- kid mode actions ---------- */
let colourSaveT = 0;
Object.assign(A, {
  kidmode(b) { ls('kidmode', b.dataset.v || 'pick'); nav(b.dataset.v ? `#/kid/${b.dataset.v}` : '#/kid'); },
  kidpick(b) { beep('hello'); ls('kidmode', b.dataset.v); kidDay = null; nav(`#/kid/${b.dataset.v}`); },
  kidnav(b) { beep('tap'); kidDoor = null; if (!/\/bubbles$/.test(b.dataset.v || '')) { clearInterval(bubT); bubT = null; bubN = 0; } nav(b.dataset.v); if (b.dataset.say) sayUi(b.dataset.say); },
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
      if (mg.done.size * 2 === mg.cards.length) { mg.won = true; lvDone(trip(mg.t), mg.kid, 'match'); ls('match_' + mg.kid, (ls('match_' + mg.kid) || 0) + 1); celebrate(); star(mg.kid, 2); setTimeout(() => { render(); sayUi(L('เก่งมาก!', 'Brilliant!')); }, 350); }
    } else setTimeout(() => { mg.up = []; $$('.mcard').forEach((el, k) => { if (!mg.done.has(mg.cards[k].k)) el.classList.remove('open'); }); beep('thud'); }, 800);
  },
  kidnewmatch() { beep('pop'); const t = trip(mg.t); newMatch(t, mg.kid); render(); },
  kidmood(b) { beep('pop'); const was = b.getAttribute('aria-pressed') === 'true'; A.mood(b); if (!was) { const w = MOODW[b.dataset.v]; sayUi(L(`วันนี้${kidName(b.dataset.k)}รู้สึก${w ? w[0] : ''}`, `Today ${kidName(b.dataset.k)} feels ${w ? w[1] : ''}`)); } render(); },
  kidcount(b) {
    const k = +b.dataset.v; if (!cnt || cnt.hit.includes(k)) return;
    cnt.hit.push(k); const n = cnt.hit.length; beep('pop'); burst(b, [cnt.e, '✨']);
    say(NUMW[lang === 'th' ? 'th' : 'en'][n - 1] || String(n), lang === 'th' ? 'th-TH' : 'en-GB');
    if (n >= cnt.n) setTimeout(() => { beep('chime'); celebrate([cnt.e, '⭐', '✨']); star(kidNow(), 1); render(); sayUi(L(`ทั้งหมด ${n} ตัว!`, `${n} altogether!`)); }, 500); else render();
  },
  kidnewcount() { beep('pop'); const t = kidTrip(route().parts[1]); newCount(t); render(); },
  kidcolor(b) { beep('tap'); kidColour = b.dataset.v; $$('.palette button').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === kidColour)); drawWrap(); },
  kidcolourdone(b) { beep('chime'); burst(b, ['🎨', '✨', '⭐']); celebrate(['🎨', '⭐', '✨']); star(kidNow(), 1); setTimeout(() => nav(b.dataset.v), 900); },
  kidspot(b) {
    if (b.dataset.say) sayUi(b.dataset.say);
    beep(b.getAttribute('aria-pressed') === 'true' ? 'tap' : 'chime');
    A.tick(b);
  },
  kidword(b) { beep('tap'); say(b.dataset.v, b.dataset.lang); },
  memans(b) {
    if (memState && memState.got) return;
    if (b.dataset.ok === '1') { beep('chime'); burst(b, ['⭐', '🎉', '✨']); if (b.dataset.last === '1') { celebrate(); star(kidNow(), 2); } sayUi(L(`ใช่แล้ว! ${b.dataset.say} เก่งมาก!`, `Yes! ${b.dataset.say} — well done!`)); memState.got = true; setTimeout(render, 700); }
    else { beep('tap'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(L('อืม… ลองอีกทีนะ', 'Hmm… try again!')); }
  },
  kidpoke(b) { b.classList.remove('wig'); void b.offsetWidth; b.classList.add('wig'); beep('boing'); burst(b, ['💛', '✨']); const k = kidName(b.dataset.k), ph = [L(`สวัสดี ${k}!`, `Hello ${k}!`), L('วันนี้เล่นอะไรดี?', 'What shall we play today?'), L(`${k} เก่งที่สุดเลย!`, `${k}, you are the best!`), L('จั๊กจี้!', 'Tickles!'), L('ไปผจญภัยกันเถอะ!', 'Let’s go on an adventure!')]; sayUi(ph[Math.floor(Math.random() * ph.length)]); },
  kidjar(b) { beep('sparkle'); burst(b, ['⭐', '✨']); const n = stars(b.dataset.k), ps = pets(b.dataset.k); sayUi(L(`มีดาว ${n} ดวงแล้ว${ps.length ? ` และเพื่อน ${ps.length} ตัว` : ''}`, `${n} stars${ps.length ? ` and ${ps.length} friends` : ''} so far`)); },
  xylo(b) { const n = XYLO[+b.dataset.v]; beep('note', n[1]); b.classList.remove('lit'); void b.offsetWidth; b.classList.add('lit'); },
  drum(b) { beep(b.dataset.v); b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit'); },
  song(b) { playSong(+b.dataset.v, b.dataset.k); },
  kidhide(b) {
    const it = hs.items[+b.dataset.v], want = hs.targets[hs.found.length]; if (!it || it.found || !want) return;
    if (it.e === want[0]) {
      it.found = true; hs.found.push(want); beep('pop'); burst(b, [want[0], '✨']);
      if (hs.found.length === hs.targets.length) { sayUi(L('เจอครบแล้ว! เก่งมาก', 'Found them all! Brilliant')); setTimeout(() => { beep('yay'); celebrate(); star(kidNow(), 1); render(); }, 350); }
      else { sayUi(L(`เจอ${want[1]}แล้ว!`, `Found the ${want[2]}!`)); render(); }
    } else { beep('tap'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(L(`นั่น${it.th} ลองหา${want[1]}อีกที`, `That is the ${it.en} — look for the ${want[2]}`)); }
  },
  kidnewhide() { beep('pop'); hs = null; render(); },
  kidpix(b) { kidPix[b.dataset.g] = b.dataset.v; beep('tap'); if (b.dataset.g === 'jigsaw') jg = null; else if (b.dataset.g === 'hideseek') hs = null; else mg = null; render(); },
  kidjpick(b) { jg.pick = jg.pick === +b.dataset.v ? null : +b.dataset.v; beep('tap'); render(); },
  kidjslot(b) {
    const s = +b.dataset.v; if (jg.pick === null || jg.slots[s] !== null) { beep('tap'); return; }
    if (jg.pick === s) {
      jg.slots[s] = s; jg.tray = jg.tray.filter((x) => x !== s); jg.pick = null; beep('pop'); burst(b, ['✨']);
      if (!jg.tray.length) { jg.done = true; lvDone(kidTrip(kidNow()), kidNow(), 'jigsaw'); beep('yay'); celebrate(['🖼️', '⭐', '✨']); star(kidNow(), 2); sayUi(L('ต่อภาพเสร็จแล้ว! เก่งมาก', 'Picture done! Brilliant')); }
      render();
    } else { beep('thud'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(L('ยังไม่ใช่ช่องนี้นะ', 'Not this one — try another')); }
  },
  kidnewjig() { beep('pop'); jg = null; render(); },
  memnext() { beep('pop'); memState.n++; memState.got = false; render(); },
  memagain() { beep('pop'); memState.n = 0; memState.got = false; render(); },
  kidgift(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, kid = b.dataset.k, id = `${t.id}.tick.gift.d${i}.${kid}`;
    b.classList.add('pop'); beep('pop'); setTimeout(() => beep('fanfare'), 250);
    burst(b, ['🎉', '✨', '⭐', '🎊', giftE(i)]); celebrate(['🎁', '✨', giftE(i)]); star(kid, 2);
    sayUi(L('เย้! ได้สติกเกอร์ใหม่!', 'Yay! A new sticker!'));
    setTimeout(() => { if (!S.entries.some((e) => e.id === id)) putEntry(t, { day: i, kind: 'tick', child: kid, first_key: `gift.d${i}`, text: '' }, id); }, 650);
  },
  async kidstamp(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, kid = b.dataset.k, box = $('#kidstamp');
    box.classList.remove('done'); void box.offsetWidth; box.classList.add('done', 'slam');
    beep('thud'); setTimeout(() => beep('fanfare'), 350);
    burst(box, ['⭐', '✨', '🎉', '💫']); celebrate(['🛂', '⭐', '🎉']); star(kid, 3);
    const cheer = $('#kidcheer'); if (cheer) cheer.hidden = false;
    sayUi(L(`ปั๊ก! เก่งมาก ${kidName(kid)}!`, `Thump! Well done, ${kidName(kid)}!`));
    const id = `${t.id}.tick.stamp.d${i}.${kid}`;
    if (!S.entries.some((e) => e.id === id)) putEntry(t, { day: i, kind: 'tick', child: kid, first_key: `stamp.d${i}`, text: '' }, id);
    if (!t.days[i].done_at) {   // the stamp ceremony finishes the day (same as "Mark day done")
      t.days[i].done_at = Date.now();
      enqueue({ method: 'PUT', url: `/api/b/days/${encodeURIComponent(t.id)}/${i}`, body: { done: true } });
    }
  },
  hear(b) { say(b.dataset.v, b.dataset.lang); },
  sayfacts(b) { sayUi(b.dataset.v); },
  // 🔊 in the kid header: read the page's own line (the guide's words, the greeting, else the day's name)
  kidhear() { beep('pop'); const el = $('.kidguide p') || $('.kidhello p') || $('.kidday b'); if (el) sayUi(el.textContent.replace(/\s+/g, ' ').trim()); },
  saytale(b) { sayTale(b); },
  // drawing
  kidpen(b) { beep('tap'); pen = +b.dataset.v; $$('.drawtools [data-a="kidpen"]').forEach((x) => x.setAttribute('aria-pressed', +x.dataset.v === pen)); },
  kidundo() { beep('tap'); if (!pad.strokes.length && pad.gone) { pad.strokes = pad.gone; pad.gone = null; } else pad.strokes.pop(); const cv = $('#kidcanvas'); if (cv) redraw(cv); },
  // one tap wipes the paper (owner: starting again should be easy); ↶ brings the picture back until the next stroke
  kidclear() { if (!pad.strokes.length) return; pad.gone = pad.strokes; pad.strokes = []; beep('pop'); const cv = $('#kidcanvas'); if (cv) redraw(cv); },
  kidtray() { beep('tap'); pad.hide = !pad.hide; drawWrap(); },
  kidfull() { beep('tap'); pad.full = !pad.full; drawWrap(); },
  kiddrawdone(b) {
    const cv = $('#kidcanvas'), t = trip(b.dataset.t), kid = b.dataset.k, day = b.dataset.d === '' ? null : +b.dataset.d;
    if (!cv || !pad.strokes.length) { sayUi(L('วาดอะไรสักหน่อยก่อนนะ', 'Draw something first!')); return; }
    redraw(cv);
    cv.toBlob(async (blob) => {
      if (!blob) return;
      const id = `dr-${kid}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, at = Date.now();
      const caption = `🖍️ ${kidName(kid)}`;
      pad.strokes = []; pad.key = ''; pad.gone = null; pad.hide = false; pad.full = false;
      beep('chime'); burst(b, ['🖍️', '✨', '⭐']); sayUi(L(`สวยมาก ${kidName(kid)}!`, `Beautiful, ${kidName(kid)}!`));
      await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day === null ? '' : day}&at=${at}&caption=${encodeURIComponent(caption)}`, blob,
        local: { coll: 'media', id, row: { trip: t.id, day, caption, highlight: false, at, w: DRAW_W, h: DRAW_H } } });
      setTimeout(() => nav(`#/kid/${kid}`), 700);
    }, 'image/jpeg', 0.9);
  },
  // countdown doors
  kiddoor(b) {
    const t = trip(b.dataset.t), kid = b.dataset.k, n = +b.dataset.v, cd = t.passport.countdown, N = cd.doors.length;
    if (!doorOpen(t, n, N)) { beep('tap'); const x = doorIn(t, n, N); sayUi(L(`อีก ${x} วัน ถึงจะเปิดได้นะ`, `This door opens in ${x} ${x === 1 ? 'day' : 'days'}`)); return; }
    const id = `${t.id}.tick.cd.${n + 1}.${kid}`;
    if (!S.entries.some((e) => e.id === id)) putEntry(t, { day: null, kind: 'tick', child: kid, first_key: `cd.${n + 1}`, text: '' }, id);
    kidDoor = n; beep('creak'); setTimeout(() => beep('chime'), 250);
    render();
    burst($('#doorcard .in') || b, ['🎁', '✨', '🎉', '⭐']); celebrate(['🎁', '⭐', '✨']); star(kid, 1);
    sayUi(String(T(cd.doors[n])).replace(/\{name\}/g, kidName(kid)));
  },
  kiddoorclose() { beep('pop'); kidDoor = null; render(); },
  mappin(b) {
    const t = trip(b.dataset.t), mm = mapModel(t); if (!mm) return;
    beep('pop'); sayUi(b.dataset.say);
    if (!document.body.classList.contains('kidmode')) { const s = mm.at[b.dataset.v]; if (s) openSheet(pinSheet(t, s)); return; }   // grown-ups: the real place
    const box = $('.tmap'), cur = box ? +box.dataset.pos : mapPos(mm, kidDayOf(t)), j = mm.seq.reduce((best, v, n) => (v.k === b.dataset.v && (best < 0 || Math.abs(n - cur) < Math.abs(best - cur)) ? n : best), -1);   // the visit nearest to where we stand
    if (j < 0 || j === cur) return;
    mapFrom = cur; mapAt = j; kidDay = mm.seq[j].day; render();
  },
  ppmapday(b) {   // passport map: walk the kids to the picked day
    const box = $('.tmap'); mapFrom = box ? +box.dataset.pos : null;
    ppMapDay = { t: b.dataset.t, d: +b.dataset.v }; beep('tap'); render();
  },
  kidquiz(b) {
    const on = b.getAttribute('aria-pressed') === 'true', ans = b.querySelector('.ans');
    b.setAttribute('aria-pressed', String(!on)); if (ans) ans.hidden = on;
    if (!on) { beep('chime'); burst(b, ['⭐', '✨', '🎉']); sayUi(b.dataset.ans); } else { beep('tap'); sayUi(b.dataset.q); }
  },
  kidtalk(b) { const q = b.dataset.q.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '').trim(); b.setAttribute('aria-pressed', 'true'); beep('chime'); burst(b, ['💬', '✨', '⭐']); say(q, /[\u0E00-\u0E7F]/.test(q) ? 'th-TH' : 'en-GB'); },   // in the question's own language, without the emoji
  kidheart(b) { beep('pop'); burst(b, ['💗', '💕', '✨']); sayUi(b.dataset.v); },
  // bedtime story player (kid mode and the book)
  bedtime(b) { const e = S.entries.find((x) => x.id === b.dataset.v); if (e) openBedtime(trip(e.trip), e); },
  btclose() { closeBedtime(); },
  btplay() { btPlay(); },
  btnext() { btGo(1); },
  btprev() { btGo(-1); },
});
// ---- bubbles: spawned while the field is on the page; a pointerdown on one pops it ----
let bubT = 0, bubN = 0;
const BUB_E = ['🐟', '🐙', '⭐', '🦋', '🌼', '🍓', '🎈', '🐥', '🐢', '🌈'];
function startBubbles() {
  if (bubT && $('#bubblefield')) { const sc = $('#bubscore'); if (sc && bubN) sc.textContent = bubN; return; }   // already running: the page was only redrawn
  clearInterval(bubT); bubN = 0;
  let miss = 0;
  const spawn = () => {
    const f = $('#bubblefield');
    // left the game (back gesture, browser back…): forget the timer, or the next visit thinks it still runs and never blows a bubble —
    // but only after a few empty ticks: a page drawn a moment late (iPad, Nov 2026) used to stop the bubbles before the first one
    if (!f) { if (++miss > 4) { clearInterval(bubT); bubT = 0; } return; }
    miss = 0;
    if (f.querySelectorAll('.bub').length > 9) return;
    // bigger on a tablet (iPad owner, Nov 2026: "ลูกใหญ่หน่อย"): the size grows with the field's width, up to 1.7× a phone's
    const k = Math.min(1.7, Math.max(1, f.clientWidth / 400)), b = document.createElement('button'), sz = (52 + Math.random() * 64) * k;
    const t = (matchMedia('(prefers-reduced-motion: reduce)').matches ? 12 : 4.5 + Math.random() * 3) * 1000;
    b.className = 'bub'; b.setAttribute('aria-label', L('ฟอง', 'Bubble'));
    b.style.cssText = `left:${Math.round(6 + Math.random() * Math.max(0, f.clientWidth - sz - 12))}px;bottom:${-Math.round(sz) - 4}px;width:${sz}px;height:${sz}px;font-size:${Math.round(sz * .42)}px;--t:${t / 1000}s;--hue:${Math.floor(Math.random() * 360)}`;
    if (Math.random() < 0.45) b.textContent = BUB_E[Math.floor(Math.random() * BUB_E.length)];
    f.appendChild(b);
    // the rise in px from the field's own height, by the Web Animations API: iPad Safari left the CSS keyframes (a var() inside the
    // animation shorthand, vh inside the transform) unplayed, so every bubble stayed under the field and none ever came up
    if (b.animate) {
      b.classList.add('wa');
      const up = f.clientHeight + sz + 140, a = b.animate([{ transform: 'translateY(0) rotate(0deg)' }, { transform: `translateY(${-up}px) rotate(12deg)` }], { duration: t, easing: 'linear', fill: 'forwards' });
      a.onfinish = () => b.remove();
    } else b.addEventListener('animationend', () => b.remove());
  };
  spawn(); bubT = setInterval(spawn, 700);
}
document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest && e.target.closest('.bub'); if (!b || b.classList.contains('pop')) return;
  e.preventDefault();
  if (b.classList.contains('wa') && b.getAnimations) {   // pop where the finger caught it: freeze the rise, then grow and fade from there
    const cur = getComputedStyle(b).transform, at = cur && cur !== 'none' ? cur : '';
    b.getAnimations().forEach((a) => a.cancel()); b.style.transform = at;
    b.animate([{ transform: at || 'none', opacity: 1 }, { transform: `${at} scale(1.6)`, opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
  }
  b.classList.add('pop'); beep('bubble'); burst(b, [b.textContent || '💧', '✨']); setTimeout(() => b.remove(), 220);
  bubN++; const sc = $('#bubscore'); if (sc) sc.textContent = bubN;
  if (bubN % 15 === 0) { celebrate(['🫧', '⭐', '✨']); beep('yay'); star($('#bubblefield').dataset.k, 1); sayUi(L(`เย้! ${bubN} ฟองแล้ว!`, `Yay! ${bubN} bubbles!`)); }
});
// ---- three quiet games (owner's ask, Nov 2026: "ทำเกมส์เพิ่มอีก"): whose shadow, feed the animal, sort by colour. Five or eight easy rounds,
// a word said on every right answer, a wobble and "try again" on a wrong one, two stars at the end — nothing saved but the stars. The little
// one gets two choices instead of three. ----
// ---- levels for the thinking games (owner, Nov 2026: "ทำเกมส์เชาว์ให้มีหลายด่านขึ้น"): five each, a step harder every time; a win opens the
// next. Only the levels reached are shown — never a row of locks or "3 more to go" (play, not homework). Kept on this phone: ls('lv_<kid>')
// = {game: {at, best}}. The little one starts at level 1, the others at 2 (what they used to play). ----
const LV = {   // ten levels a game (owner, Nov 2026: "ด่านเยอะขึ้น ยากขึ้น"): 1–5 as before, 6–10 bring a twist, not only more of the same
  shadow: [{ o: 2, r: 4 }, { o: 3, r: 5 }, { o: 4, r: 5 }, { o: 4, r: 6, same: 1 }, { o: 6, r: 6, same: 1 }, { o: 6, r: 7, same: 1 }, { o: 8, r: 8, same: 1 }, { o: 8, r: 8, same: 1, flip: 1 }, { o: 9, r: 9, same: 1, flip: 1 }, { o: 9, r: 10, same: 1, half: 1 }],   // same: the wrong answers are the same kind (animals with animals); flip: the shadow faces the other way; half: only its top half shows
  feed: [{ o: 2, r: 4 }, { o: 3, r: 5 }, { o: 4, r: 5 }, { o: 5, r: 6 }, { o: 6, r: 6 }, { o: 6, r: 7 }, { o: 8, r: 8 }, { o: 8, r: 8, mem: 1 }, { o: 9, r: 9, mem: 1 }, { o: 9, r: 10, mem: 1 }],   // mem: the wish bubble hides after a moment — remember it (a tap on the animal asks again)
  sort: [{ c: 2, r: 6 }, { c: 3, r: 8 }, { c: 3, r: 10 }, { c: 4, r: 10 }, { c: 4, r: 14 }, { c: 5, r: 14 }, { c: 5, r: 16 }, { c: 6, r: 16 }, { c: 6, r: 18 }, { c: 6, r: 22 }],
  bigsmall: [{ z: [1, 0.45], r: 4 }, { z: [1, 0.62, 0.36], r: 6 }, { z: [1, 0.74, 0.52, 0.34], r: 6 }, { z: [1, 0.82, 0.66, 0.5], r: 6 }, { z: [1, 0.86, 0.72, 0.6, 0.48], r: 8 },
    { z: [1, 0.88, 0.76, 0.64, 0.52], r: 8 }, { z: [1, 0.88, 0.77, 0.66, 0.56, 0.47], r: 8 }, { z: [1, 0.9, 0.8, 0.7, 0.6, 0.5], r: 10 }, { z: [1, 0.91, 0.82, 0.73, 0.64, 0.56], r: 10 }, { z: [1, 0.92, 0.84, 0.76, 0.68, 0.6], r: 12 }],
  jigsaw: [{ c: 2, r: 2 }, { c: 3, r: 2 }, { c: 3, r: 3 }, { c: 4, r: 3 }, { c: 4, r: 4 }, { c: 5, r: 4 }, { c: 5, r: 5 }, { c: 6, r: 5 }, { c: 6, r: 6 }],   // nine: a smaller piece than 6×6 is too fiddly on a phone
  match: [{ p: 4 }, { p: 6 }, { p: 8 }, { p: 10 }, { p: 12 }, { p: 13 }, { p: 14 }, { p: 15 }, { p: 16 }, { p: 18 }],
  maze: [{ n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 8, star: 1 }, { n: 9 }, { n: 9, star: 1 }, { n: 10, star: 1 }],   // star: pick up the ⭐ on the way (it sits off the straight route)
  // where: p = the board's spots in play (0 top left … 4 middle … 8 bottom right), m = find the thing at a spot, place one there, or two: place two things from one instruction
  where: [{ p: [1, 7], m: 'find', r: 4 }, { p: [1, 7, 3, 5], m: 'find', r: 5 }, { p: [1, 7, 3, 5, 4], m: 'find', r: 6 }, { p: [1, 7, 3, 5, 4], m: 'place', r: 6 }, { p: [0, 1, 2, 3, 4, 5, 6, 7, 8], m: 'mix', r: 8 },
    { p: [0, 1, 2, 3, 4, 5, 6, 7, 8], m: 'find', r: 8 }, { p: [0, 1, 2, 3, 4, 5, 6, 7, 8], m: 'place', r: 8 }, { p: [1, 7, 3, 5, 4], m: 'two', r: 5 }, { p: [0, 1, 2, 3, 4, 5, 6, 7, 8], m: 'two', r: 6 }, { p: [0, 1, 2, 3, 4, 5, 6, 7, 8], m: 'two', r: 8 }],
  odd: [{ o: 3, r: 4 }, { o: 4, r: 5 }, { o: 4, r: 6, near: 1 }, { o: 5, r: 6, near: 1 }, { o: 6, r: 8, near: 1 }, { o: 6, r: 8, near: 2 }, { o: 7, r: 8, near: 1 }, { o: 7, r: 8, near: 2 }, { o: 8, r: 10, near: 2 }, { o: 9, r: 10, near: 2 }],   // near: the odd one is from a close group (a land animal among sea animals); 2 = always
  simon: [{ len: 2, r: 3 }, { len: 3, r: 3 }, { len: 4, r: 3 }, { len: 5, r: 3 }, { len: 6, r: 3 }, { len: 7, r: 3 }, { len: 7, r: 3, fast: 1 }, { len: 8, r: 3 }, { len: 8, r: 3, fast: 1 }, { len: 9, r: 3, fast: 1 }],   // copy the tune: how many notes, how many tunes; fast = a quicker tune
  dots: [{ s: ['tri', 'sq', 'dia', 'boat'], r: 3 }, { s: ['house', 'crown', 'boat', 'dia'], r: 3 }, { s: ['fish', 'rocket', 'house', 'crown'], r: 3 }, { s: ['heart', 'star', 'fish', 'rocket'], r: 3 }, { s: ['tree', 'star', 'heart', 'rocket', 'fish'], r: 4 },
    { s: ['house', 'crown', 'car', 'cat'], r: 4 }, { s: ['rocket', 'heart', 'car', 'cat'], r: 4 }, { s: ['star', 'tree', 'castle', 'car'], r: 4 }, { s: ['heart', 'castle', 'butterfly', 'tree', 'star'], r: 4 }, { s: ['butterfly', 'castle', 'tree', 'star', 'rocket', 'cat'], r: 5 }],
  howmany: [{ lo: 1, hi: 3, o: 2, r: 4 }, { lo: 1, hi: 5, o: 3, r: 5 }, { lo: 1, hi: 7, o: 3, r: 5 }, { lo: 1, hi: 10, o: 4, r: 6 }, { lo: 5, hi: 10, o: 4, r: 6 },
    { lo: 6, hi: 12, o: 4, r: 6 }, { lo: 8, hi: 14, o: 4, r: 6 }, { lo: 10, hi: 15, o: 5, r: 6 }, { lo: 11, hi: 18, o: 5, r: 6 }, { lo: 13, hi: 20, o: 5, r: 8 }],
  next: [{ pat: ['AB'], o: 2, show: 4, r: 4 }, { pat: ['AB'], o: 3, show: 5, r: 5 }, { pat: ['AAB', 'ABB'], o: 3, show: 5, r: 5 }, { pat: ['ABC'], o: 3, show: 5, r: 6 }, { pat: ['AABB', 'ABC', 'ABB'], o: 4, show: 7, r: 6 },
    { pat: ['ABC', 'AABB', 'ABBC'], o: 4, show: 7, r: 6 }, { pat: ['ABCD'], o: 4, show: 7, r: 6 }, { pat: ['AABC', 'ABAC', 'ABCD'], o: 4, show: 8, r: 6 }, { pat: ['ABCD', 'AABBC', 'ABACD'], o: 5, show: 8, r: 8 }, { pat: ['ABCD', 'AABC', 'ABBCD', 'AABBC', 'ABACD'], o: 5, show: 9, r: 8 }],   // level 2 = every game as it was before levels (6 pairs, 3×2 pieces, three choices)
};
/* ---------- the adventure map (owner, Nov 2026: "แผนที่ผจญภัยจะเป็น hilight") ----------
   One town per day of the book, walked in order. A town = three missions (games the app already has, at a level that climbs along the road)
   and a treasure chest that opens once the three are played. Progress = ticks `quest.d<i>.<0|1|2|chest>` (trip-wide, day null: a tick is never
   a memory of a day), so it follows the child from the iPad to the phone and sits in backups. Relatives may play; nothing of theirs is saved.
   Play, not homework: a town ahead waits in the clouds (never a lock), a tile only shows what was done. */
const QUEST_G = { shadow: ['🦒', 'เงาของใคร', 'Shadows'], feed: ['🍌', 'ป้อนอาหาร', 'Feed me'], sort: ['🧺', 'แยกสี', 'Colours'], bigsmall: ['🐘', 'ใหญ่-เล็ก', 'Big & small'], where: ['📍', 'ตรงไหนนะ', 'Where is it?'],
  odd: ['🤔', 'ไม่เข้าพวก', 'Odd one out'], next: ['➡️', 'อะไรมาต่อ', 'What’s next?'], howmany: ['🧮', 'มีกี่ตัว', 'How many?'], maze: ['🧭', 'เขาวงกต', 'Maze'], simon: ['🎹', 'จำเสียงตามสี', 'Copy the tune'],
  dots: ['✨', 'ลากจุดต่อภาพ', 'Join the dots'], match: ['🧩', 'จับคู่', 'Match'], jigsaw: ['🖼️', 'ต่อภาพ', 'Puzzle'] };
const QUEST_ORDER = ['shadow', 'maze', 'feed', 'match', 'howmany', 'dots', 'sort', 'where', 'simon', 'bigsmall', 'odd', 'jigsaw', 'next'];   // neighbours differ in kind (look · move · remember)
const QUEST_GEM = ['💎', '👑', '🗝️', '🏺', '🔮', '🧭', '🪙', '💍', '🐚', '🏮', '🪄', '🎖️', '🌟', '🦜', '🪁', '🧿'];   // what a town's chest holds (also its sticker)
let quest = null, questOpen = null, questNew = null;   // quest = the mission being played {tid, kid, town, slot, game, lv}; questOpen = the town open on the map; questNew = the chest just opened
const questMem = new Set();   // a relative's play this visit (nothing saved)
function questPlan(t, kid) {
  const n = t.days.length, lit = littleOf(t, kid), pool = QUEST_ORDER.filter((g) => g !== 'jigsaw' || t.days.some((_, j) => dayArt(t, j)) || kidPhotoPool(t).length);
  let off = 0; for (const ch of t.id) off = (off * 31 + ch.charCodeAt(0)) % 997;
  return t.days.map((_, i) => {
    const f = n > 1 ? i / (n - 1) : 0, base = lit ? 1 + Math.round(f * 4) : 2 + Math.round(f * 8);   // the road climbs: the little one 1 → 5, the others 2 → 10
    return [0, 1, 2].map((k) => { const game = pool[(off + i * 3 + k) % pool.length]; return { game, lv: Math.min(LV[game].length, base) }; });
  });
}
// the town's boss: one of its three games again, a level up — it shows once the three are played, and the chest waits for it
const questBoss = (t, kid, i) => { const m = questPlan(t, kid)[i][i % 3]; return { game: m.game, lv: Math.min(LV[m.game].length, m.lv + 1) }; };
// a hidden mission in every second town: a little creature on the map, a game the town does not have, a level easier — never needed for the chest
const QUEST_HID = ['🦋', '🐦', '🐠', '🐞', '🐿️', '🦎', '🐝', '🐌'];
function questBonus(t, kid, i) {
  if (i % 2 === 0) return null;
  const plan = questPlan(t, kid)[i], have = new Set(plan.map((m) => m.game)), pool = QUEST_ORDER.filter((g) => !have.has(g) && g !== 'jigsaw');
  const game = pool[(i * 5 + t.id.length) % pool.length]; return { game, lv: Math.max(1, Math.min(LV[game].length, plan[0].lv - 1)), e: QUEST_HID[((i - 1) / 2) % QUEST_HID.length] };
}
const questSlot = (t, kid, i, k) => (k === 'x' ? questBonus(t, kid, i) : k === 3 ? questBoss(t, kid, i) : questPlan(t, kid)[i][k]);
// a mission left unfinished twice comes back one level easier (this device only; the child never sees a number)
const questEase = (kid, t, i, k) => Math.floor(((ls('qease_' + kid) || {})[`${t.id}.${i}.${k}`] || 0) / 2);
function questQuit(q) { const all = ls('qease_' + q.kid) || {}, key = `${q.tid}.${q.town}.${q.slot}`; all[key] = (all[key] || 0) + 1; ls('qease_' + q.kid, all); }
const questKey = (i, k) => `quest.d${i}.${k}`;
const questGot = (t, kid, i, k) => !!ticked(t, questKey(i, k), kid) || questMem.has(tickId(t, questKey(i, k), kid));
const questTownDone = (t, kid, i) => questGot(t, kid, i, 'chest');
const questThree = (t, kid, i) => [0, 1, 2].every((k) => questGot(t, kid, i, k));
const questReady = (t, kid, i) => questThree(t, kid, i) && questGot(t, kid, i, 3);
const questAt = (t, kid) => { const i = t.days.findIndex((_, j) => !questTownDone(t, kid, j)); return i < 0 ? t.days.length : i; };   // the town the child stands in (= days.length: every chest is open)
function questMark(t, kid, i, k) {
  const id = tickId(t, questKey(i, k), kid); if (questGot(t, kid, i, k)) return;
  if (isEditor()) putEntry(t, { day: null, kind: 'tick', child: kid, first_key: questKey(i, k), text: '' }, id); else questMem.add(id);
}
const questIn = (t, kid, game) => (quest && quest.tid === t.id && quest.kid === kid && quest.game === game ? quest : null);
// leaving or starting a mission: no half-played board of the other mode stays behind (free play keeps its own levels)
function questReset() { kg = null; jg = null; mg = null; mz = null; dt = null; clearTimeout(simT); sm = null; }
const questTown = (t, i) => T(((t.passport || {}).days || [])[i] && t.passport.days[i].title) || T(t.days[i].title);
const questSecret = (t, i) => { const f = (((t.passport || {}).days || [])[i] || {}).facts || []; return f.length ? T(f[i % f.length]) : ''; };
// the banner on the kid home: where the road goes next
function questBanner(t, kid) {
  const at = questAt(t, kid), end = at >= t.days.length, i = end ? t.days.length - 1 : at;
  const line = end ? L('เก็บสมบัติครบแล้ว!', 'Every treasure found!') : at === 0 && !questGot(t, kid, 0, 0) && !questGot(t, kid, 0, 1) && !questGot(t, kid, 0, 2) ? L('ออกเดินทางกันเลย!', 'Let’s set off!') : L('ไปต่อกันเลย!', 'On we go!');
  return `<button class="kidquest" data-a="kidnav" data-v="#/kid/${esc(kid)}/quest" data-say="${esc(L('แผนที่ผจญภัย', 'The adventure map'))}">${artImg(t, i)}<span><b>${L('แผนที่ผจญภัย', 'Adventure map')}</b><small>${line}</small></span><i aria-hidden="true">${end ? '🏆' : '🗺️'}</i></button>`;
}
function questHtml(t, kid, guideImg) {
  const plan = questPlan(t, kid), n = t.days.length, at = questAt(t, kid), end = at >= n, open = questOpen !== null && questOpen <= Math.min(at, n - 1) ? questOpen : Math.min(at, n - 1);
  const sib = (t.theme.children || []).map((c) => c.slug).filter((x) => x !== kid && kidArt(x)).map((x) => ({ x, at: Math.min(n - 1, questAt(t, x)) }));
  const line = questNew !== null ? L('เปิดหีบแล้ว! ได้สมบัติมาหนึ่งชิ้น', 'The chest is open! One more treasure')
    : end ? L('เก็บสมบัติครบทุกเมืองแล้ว! เก่งที่สุดเลย', 'Every treasure is found! You are the best')
      : questReady(t, kid, open) && !questTownDone(t, kid, open) ? L('เล่นครบแล้ว! แตะหีบสมบัติเลย', 'All played! Tap the treasure chest')
        : questThree(t, kid, open) && !questTownDone(t, kid, open) ? L('เหลือด่านหัวหน้าอีกด่านเดียว!', 'One more: the big one!')
        : L('เล่นสามเกม แล้วเปิดหีบสมบัติ!', 'Play three games, then open the treasure chest!');
  const towns = t.days.map((_, i) => {
    const done = questTownDone(t, kid, i), here = i === Math.min(at, n - 1) && !end, ahead = i > at, isOpen = i === open && !ahead;
    const who = (here ? [`<img class="qme ${esc(kidBase(kid))}" src="${kidArt(kid, true)}" alt="">`] : []).concat(sib.filter((b) => b.at === i).map((b) => `<img class="qsib ${esc(kidBase(b.x))}" src="${kidArt(b.x, true)}" alt="">`)).join('');
    const head = `<button class="qhead" data-a="questtown" data-v="${i}" aria-expanded="${isOpen}" data-say="${esc(ahead ? L('ยังไปไม่ถึง เดินไปทีละเมืองนะ', 'Not yet — one town at a time') : questTown(t, i))}">
<span class="qart">${artImg(t, i)}${ahead ? '<span class="qcloud" aria-hidden="true">☁️</span>' : ''}${done ? `<span class="qgem" aria-hidden="true">${QUEST_GEM[i % QUEST_GEM.length]}</span>` : ''}</span>
<span class="qname"><b>${ahead ? L('เมืองในเมฆ', 'A town in the clouds') : wj(esc(questTown(t, i)))}</b>${done ? `<small>${L('เก็บสมบัติแล้ว', 'Treasure found')}</small>` : here ? `<small>${L('เราอยู่ที่นี่', 'We are here')}</small>` : ''}</span>
${who ? `<span class="qwho" aria-hidden="true">${who}</span>` : ''}</button>`;
    const ms = plan[i].map((m, k) => { const got = questGot(t, kid, i, k), g = QUEST_G[m.game]; return `<button class="qm${got ? ' got' : ''}" data-a="questgo" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-d="${i}" data-v="${k}" data-say="${esc(L(g[1], g[2]))}"><span>${g[0]}</span><b>${L(g[1], g[2])}</b>${got ? '<i aria-hidden="true">⭐</i>' : ''}</button>`; }).join('');
    const ready = questReady(t, kid, i), secret = questSecret(t, i), three = questThree(t, kid, i), bs = questBoss(t, kid, i), bg = QUEST_G[bs.game], bgot = questGot(t, kid, i, 3), hid = questBonus(t, kid, i), hgot = hid && questGot(t, kid, i, 'x');
    const boss = three ? `<button class="qboss${bgot ? ' got' : ''}" data-a="questgo" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-d="${i}" data-v="3" data-say="${esc(L('ด่านหัวหน้า', 'The big one'))}"><span aria-hidden="true">👑</span><b>${L('ด่านหัวหน้า', 'The big one')}</b><em aria-hidden="true">${bg[0]}</em>${bgot ? '<i aria-hidden="true">⭐</i>' : ''}</button>` : '';
    const hidden = hid ? `<button class="qhid${hgot ? ' got' : ''}" data-a="questgo" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-d="${i}" data-v="x" data-say="${esc(hgot ? L('เพื่อนลับของเมืองนี้', 'This town’s secret friend') : L('เจอภารกิจลับ!', 'A secret mission!'))}" aria-label="${L('ภารกิจลับ', 'Secret mission')}"><span>${hid.e}</span>${hgot ? '<i aria-hidden="true">⭐</i>' : ''}</button>` : '';
    const chest = done ? `<div class="qtreasure${questNew === i ? ' new' : ''}"><span class="gem" aria-hidden="true">${QUEST_GEM[i % QUEST_GEM.length]}</span>${secret ? `<p><small>${L('ความลับของเมืองนี้', 'This town’s secret')}</small>${esc(secret)}</p>` : `<p>${L('สมบัติของเมืองนี้!', 'This town’s treasure!')}</p>`}</div>${i + 1 < n ? `<button class="kidbig" data-a="questnext" data-v="${i + 1}">${L('ไปเมืองต่อไป', 'On to the next town')} ›</button>` : ''}`
      : `<button class="qchest${ready ? ' ready' : ''}" data-a="questchest" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-d="${i}" aria-label="${L('หีบสมบัติ', 'Treasure chest')}"><span aria-hidden="true">🧰</span><b>${ready ? L('เปิดหีบ!', 'Open it!') : L('หีบสมบัติ', 'Treasure chest')}</b></button>`;
    return `<li class="qtown${done ? ' done' : ''}${here ? ' here' : ''}${ahead ? ' ahead' : ''}${isOpen ? ' open' : ''}" id="qt${i}">${head}${isOpen ? `<div class="qbody">${hidden}<div class="qms">${ms}</div>${boss}${chest}</div>` : ''}</li>`;
  }).join('');
  return `<div class="kidguide">${guideImg(0)}<p>${line}</p></div>
<ol class="questpath">${towns}</ol>
${questPic(t, kid)}
${end ? `<div class="qend"><span aria-hidden="true">🏆</span><b>${L('นักผจญภัยตัวจริง!', 'A true adventurer!')}</b><div class="qgems" aria-hidden="true">${t.days.map((_, i) => QUEST_GEM[i % QUEST_GEM.length]).join(' ')}</div></div>` : ''}`;
}
// the treasure picture: one picture of the trip in as many pieces as there are towns; a town's chest uncovers its piece (shown once there is one)
function questPic(t, kid) {
  const n = t.days.length, src = ((t.passport || {}).style || {}).crest || dayArt(t, n - 1) || dayArt(t, 0); if (!src || !t.days.some((_, i) => questTownDone(t, kid, i))) return '';
  const cols = n <= 4 ? 2 : n <= 9 ? 3 : 4, rows = Math.ceil(n / cols), all = t.days.every((_, i) => questTownDone(t, kid, i));
  return `<div class="qpic${all ? ' all' : ''}"><b>${all ? L('ภาพสมบัติครบแล้ว!', 'The treasure picture is complete!') : L('ภาพสมบัติของเรา', 'Our treasure picture')}</b>
<div class="qpicg" style="--c:${cols};--art:url('${esc(src)}')" aria-hidden="true">${Array.from({ length: cols * rows }, (_, k) => { const on = k >= n ? all : questTownDone(t, kid, k); return `<i class="${on ? 'on' : ''}"${on ? ` style="${jgPos(k, { cols, rows })}"` : ''}>${on ? '' : '☁️'}</i>`; }).join('')}</div></div>`;
}
Object.assign(A, {
  questtown(b) {   // a town on the road: one reached opens (to play or play again); one in the clouds only says so
    const kid = kidNow(), t = kidTrip(kid), i = +b.dataset.v; if (!t) return;
    if (i > questAt(t, kid)) { beep('tap'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(b.dataset.say); return; }
    beep('pop'); questOpen = questOpen === i ? null : i; questNew = null; render(); sayUi(questTown(t, i));
  },
  questgo(b) {   // a mission: its game opens at the road's level, the child's own levels stay as they are
    const t = trip(b.dataset.t), kid = b.dataset.k, i = +b.dataset.d, k = b.dataset.v === 'x' ? 'x' : +b.dataset.v, m = questSlot(t, kid, i, k); if (!m) return;
    beep('sparkle'); questReset(); questNew = null; questOpen = i;
    quest = { tid: t.id, kid, town: i, slot: k, game: m.game, lv: Math.max(1, m.lv - questEase(kid, t, i, k)) };
    nav(`#/kid/${kid}/${m.game}`); sayUi(L(QUEST_G[m.game][1], QUEST_G[m.game][2]));
  },
  questchest(b) {
    const t = trip(b.dataset.t), kid = b.dataset.k, i = +b.dataset.d;
    if (!questReady(t, kid, i)) { beep('tap'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(questThree(t, kid, i) ? L('เล่นด่านหัวหน้าก่อนนะ', 'Play the big one first!') : L('เล่นให้ครบสามเกมก่อนนะ', 'Play the three games first!')); return; }
    if (questTownDone(t, kid, i)) return;
    beep('pop'); setTimeout(() => beep('fanfare'), 250); burst(b, ['✨', '⭐', QUEST_GEM[i % QUEST_GEM.length]]); celebrate(['🗺️', '✨', QUEST_GEM[i % QUEST_GEM.length]]); star(kid, 3);
    questMark(t, kid, i, 'chest'); questNew = i; questOpen = i;
    const secret = questSecret(t, i), last = i + 1 >= t.days.length;
    sayUi(last ? L('เย้! เก็บสมบัติครบทุกเมืองแล้ว', 'Hooray! Every treasure is found') : secret ? L(`เย้! ได้สมบัติแล้ว ความลับคือ ${secret}`, `Hooray, a treasure! The secret: ${secret}`) : L('เย้! ได้สมบัติแล้ว', 'Hooray! A treasure!'));
    setTimeout(safeRender, 500);
  },
  questnext(b) { beep('sparkle'); questNew = null; questOpen = +b.dataset.v; render(); const el = $('#qt' + b.dataset.v); if (el) el.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); const kid = kidNow(), t = kidTrip(kid); if (t) sayUi(questTown(t, +b.dataset.v)); },
});
function lvState(t, kid, game) {
  const q = questIn(t, kid, game); if (q) return { at: q.lv, best: q.lv - 1, top: q.lv, n: LV[game].length, quest: q };   // a mission plays at the road's level
  const st = (ls('lv_' + kid) || {})[game] || {}, start = littleOf(t, kid) ? 1 : 2, n = LV[game].length;
  const best = Math.min(n, st.best != null ? Math.max(st.best, start - 1) : start - 1), top = Math.min(n, best + 1);
  return { at: Math.max(1, Math.min(top, st.at || start)), best, top, n };
}
const lvOf = (t, kid, game) => LV[game][lvState(t, kid, game).at - 1];
function lvSet(kid, game, patch) { if (quest && quest.kid === kid && quest.game === game) return;   // a mission never moves the child's own levels
  const all = ls('lv_' + kid) || {}; all[game] = Object.assign({}, all[game], patch); ls('lv_' + kid, all); }
// a level won: the best moves up, the next one opens
function lvDone(t, kid, game) { const q = questIn(t, kid, game); if (q) { questMark(t, kid, q.town, q.slot); return; }
  const s = lvState(t, kid, game); lvSet(kid, game, { at: s.at, best: Math.max(s.best, s.at) }); }
// the chips of the levels reached (a ⭐ on each one won); none when only level 1 is open
function lvBar(t, kid, game) {
  const s = lvState(t, kid, game);
  if (s.quest) return `<div class="lvbar qbar"><span>${s.quest.slot === 3 ? '👑' : s.quest.slot === 'x' ? '✨' : '🗺️'} ${wj(esc(questTown(t, s.quest.town)))}</span></div>`;   // on a mission: the town, no level chips
  if (s.top < 2) return '';
  return `<div class="lvbar" role="group" aria-label="${L('ด่าน', 'Levels')}"><span>${L('ด่าน', 'Level')}</span>${Array.from({ length: s.top }, (_, k) => k + 1).map((n) => `<button class="lvc${n === s.at ? ' on' : ''}" data-a="kglv" data-g="${game}" data-v="${n}" aria-pressed="${n === s.at}" aria-label="${esc(L(`ด่าน ${n}`, `Level ${n}`))}"><b>${n}</b>${n <= s.best ? '<i aria-hidden="true">⭐</i>' : ''}</button>`).join('')}</div>`;
}
// after a win: on to the next level (or "every level done"), and the same one again
function lvWin(t, kid, game, again) {
  const s = lvState(t, kid, game);
  if (s.quest) return `<button class="kidbig" data-a="kidnav" data-v="#/kid/${esc(kid)}/quest">🗺️ ${L('กลับไปแผนที่', 'Back to the map')} ›</button>
<button class="kidbig ghost" data-a="${again[0]}"${again[1] ? ` data-v="${again[1]}"` : ''}>🔁 ${L('เล่นอีกรอบ', 'Play again')}</button>`;
  return `${s.at < s.n ? `<button class="kidbig" data-a="kglv" data-g="${game}" data-v="${s.at + 1}">⭐ ${L(`ไปด่าน ${s.at + 1}`, `On to level ${s.at + 1}`)} ›</button>` : `<p class="lvall">${L('ผ่านครบทุกด่านแล้ว! เก่งที่สุดเลย 🏆', 'Every level done! You are the best 🏆')}</p>`}
<button class="kidbig ghost" data-a="${again[0]}"${again[1] ? ` data-v="${again[1]}"` : ''}>🔁 ${L(`เล่นด่าน ${s.at} อีก`, `Level ${s.at} again`)}</button>`;
}
const lvWord = (t, kid, game) => (questIn(t, kid, game) ? L('ภารกิจ', 'the mission') : L(`ด่าน ${lvState(t, kid, game).at}`, `level ${lvState(t, kid, game).at}`));
const WHERE_E = ['🐱', '🐶', '🐰', '🐻', '🐸', '🐥', '🍎', '🚗', '⭐', '🎈', '🐢', '🦋'];
const WHERE_NAME = [['มุมบนซ้าย', 'in the top left corner'], ['ข้างบน', 'on top'], ['มุมบนขวา', 'in the top right corner'], ['ข้างซ้าย', 'on the left'], ['ตรงกลาง', 'in the middle'],
  ['ข้างขวา', 'on the right'], ['มุมล่างซ้าย', 'in the bottom left corner'], ['ข้างล่าง', 'at the bottom'], ['มุมล่างขวา', 'in the bottom right corner']];
const WHERE_ITEM = { '🐱': ['แมว', 'cat'], '🐶': ['หมา', 'dog'], '🐰': ['กระต่าย', 'rabbit'], '🐻': ['หมี', 'bear'], '🐸': ['กบ', 'frog'], '🐥': ['ลูกเจี๊ยบ', 'chick'], '🍎': ['แอปเปิล', 'apple'], '🚗': ['รถ', 'car'], '⭐': ['ดาว', 'star'], '🎈': ['ลูกโป่ง', 'balloon'], '🐢': ['เต่า', 'turtle'], '🦋': ['ผีเสื้อ', 'butterfly'] };
const ODD_GROUPS = [{ k: 'fruit', th: 'ผลไม้', en: 'fruit', e: ['🍎', '🍌', '🍇', '🍓', '🍉', '🍐', '🍒', '🍊', '🍍', '🥝'] }, { k: 'veg', th: 'ผัก', en: 'vegetables', e: ['🥕', '🥦', '🌽', '🥒', '🍆', '🥔', '🧅', '🫑', '🥬'] },
  { k: 'land', th: 'สัตว์บก', en: 'land animals', e: ['🐶', '🐱', '🐰', '🐻', '🐼', '🐵', '🐯', '🦁', '🐮', '🐷'] }, { k: 'sea', th: 'สัตว์ทะเล', en: 'sea animals', e: ['🐳', '🐙', '🐟', '🦀', '🐬', '🐠', '🦈', '🦑', '🐡'] },
  { k: 'go', th: 'พาหนะ', en: 'things that go', e: ['🚗', '🚌', '🚲', '✈️', '🚂', '🚀', '⛵', '🚁', '🚜', '🛵'] }, { k: 'wear', th: 'เสื้อผ้า', en: 'clothes', e: ['👕', '👖', '👗', '🧢', '👟', '🧦', '🧤', '🧣', '👒'] }];
const ODD_NEAR = [['fruit', 'veg'], ['land', 'sea'], ['veg', 'fruit'], ['sea', 'land']];
const HM_E = ['🐟', '🐥', '🍎', '⭐', '🐞', '🎈', '🐢', '🍓', '🦋', '🌸', '🚗', '🐸'];
const NEXT_E = ['🍎', '🍌', '🐶', '🐱', '⭐', '🌙', '🚗', '🎈', '🌸', '🐟', '🍓', '🐥'];
const SHADOW_THINGS = new Set(['🚗', '✈️', '⛵', '🎸', '🍌', '🚲', '🍄']);
const SHADOWS = [['🐘', 'ช้าง', 'elephant'], ['🦒', 'ยีราฟ', 'giraffe'], ['🐢', 'เต่า', 'turtle'], ['🐰', 'กระต่าย', 'rabbit'], ['🦀', 'ปู', 'crab'], ['🐟', 'ปลา', 'fish'],
  ['🐌', 'หอยทาก', 'snail'], ['🦋', 'ผีเสื้อ', 'butterfly'], ['🐓', 'ไก่', 'chicken'], ['🐳', 'วาฬ', 'whale'], ['🚗', 'รถ', 'car'], ['✈️', 'เครื่องบิน', 'plane'],
  ['⛵', 'เรือใบ', 'sailboat'], ['🎸', 'กีตาร์', 'guitar'], ['🍌', 'กล้วย', 'banana'], ['🦕', 'ไดโนเสาร์', 'dinosaur'], ['🐿️', 'กระรอก', 'squirrel'], ['🦆', 'เป็ด', 'duck'],
  ['🐪', 'อูฐ', 'camel'], ['🚲', 'จักรยาน', 'bike'], ['🍄', 'เห็ด', 'mushroom'], ['🦉', 'นกฮูก', 'owl']];
const FEED_PALS = [['🐼', 'แพนด้า', 'Panda'], ['🐰', 'กระต่าย', 'Bunny'], ['🐵', 'ลิง', 'Monkey'], ['🐻', 'หมี', 'Bear'], ['🐶', 'หมา', 'Puppy'], ['🐱', 'แมว', 'Kitty'], ['🐘', 'ช้าง', 'Elephant'], ['🐷', 'หมู', 'Piggy']];
const FOODS = [['🍌', 'กล้วย', 'banana', 'a banana'], ['🍎', 'แอปเปิล', 'apple', 'an apple'], ['🥕', 'แครอท', 'carrot', 'a carrot'], ['🍉', 'แตงโม', 'watermelon', 'some watermelon'],
  ['🍓', 'สตรอว์เบอร์รี', 'strawberry', 'a strawberry'], ['🍇', 'องุ่น', 'grapes', 'some grapes'], ['🌽', 'ข้าวโพด', 'corn', 'some corn'], ['🍪', 'คุกกี้', 'cookie', 'a cookie'],
  ['🧀', 'ชีส', 'cheese', 'some cheese'], ['🥦', 'บรอกโคลี', 'broccoli', 'some broccoli'], ['🍞', 'ขนมปัง', 'bread', 'some bread'], ['🥚', 'ไข่', 'egg', 'an egg']];   // [emoji, Thai, the button's word, what the animal asks for]
const capFirst = (x) => x.charAt(0).toUpperCase() + x.slice(1);
const SORT_COLS = [{ k: 'red', th: 'สีแดง', en: 'red', c: '#FF5A5F', e: ['🍎', '🍓', '🚒', '🌹', '🍒', '🐞', '🍅'] },
  { k: 'yellow', th: 'สีเหลือง', en: 'yellow', c: '#FFC62E', e: ['🍌', '🌻', '⭐', '🐥', '🧀', '🍋', '🌽'] },
  { k: 'green', th: 'สีเขียว', en: 'green', c: '#3DBE63', e: ['🥦', '🐸', '🍀', '🐢', '🥒', '🌲', '🍏'] },
  { k: 'blue', th: 'สีฟ้า', en: 'blue', c: '#3E8BFF', e: ['🐳', '💧', '🧢', '🐋', '🫐', '👖', '🧊'] },
  { k: 'orange', th: 'สีส้ม', en: 'orange', c: '#FF8C2E', e: ['🍊', '🥕', '🎃', '🦊', '🏀', '🦁', '🧡'] },
  { k: 'purple', th: 'สีม่วง', en: 'purple', c: '#A35BE0', e: ['🍇', '🍆', '🔮', '☂️', '👾', '💜', '🟣'] }];
const SORT_BASE = 4;   // the first four colours (red, yellow, green, blue) come first; orange and purple join on levels 6+

let kg = null;   // the game in hand: {game, key: trip.kid, n: round, r: this round, got, done, …}
function kgRound(g) {
  const many = g.lv.o || 2;
  if (g.game === 'shadow') {
    const want = g.deck[g.n], kind = (x) => SHADOW_THINGS.has(x[0]), pool = SHADOWS.filter((x) => x !== want && (!g.lv.same || kind(x) === kind(want)));
    g.r = { want, opts: shuffle([want].concat(shuffle(pool).slice(0, many - 1))) };
  }
  else if (g.game === 'bigsmall') {   // sizes far enough apart for a toddler's eye; big and small asked in turn, starting at random
    const zs = shuffle(g.lv.z), big = g.n % 2 === g.first;
    g.r = { thing: g.deck[g.n], sizes: zs, big, right: zs.indexOf(big ? Math.max(...zs) : Math.min(...zs)) };
  }
  else if (g.game === 'where') {
    const P = g.lv.p, mode = g.lv.m === 'mix' ? (Math.random() < 0.5 ? 'find' : 'place') : g.lv.m, items = shuffle(WHERE_E).slice(0, P.length), at = {};
    P.forEach((q, k) => { at[q] = items[k]; });
    let pos; do { pos = P[Math.floor(Math.random() * P.length)]; } while (P.length > 1 && pos === g.lastPos);
    g.lastPos = pos; g.r = { mode, at, pos, item: at[pos] };
    if (mode === 'two') {   // one instruction, two things to place: "put the cat on top and the dog on the left" — the second waits in the child's memory
      const [p1, p2] = shuffle(P.filter((q) => q !== pos)).slice(0, 1).concat([pos]).reverse(), [i1, i2] = shuffle(WHERE_E).slice(0, 2);
      g.r = { mode, steps: [{ pos: p1, item: i1 }, { pos: p2, item: i2 }], k: 0, placed: {}, pos: p1, item: i1 };
    }
  }
  else if (g.game === 'odd') {
    let A, B;
    if (g.lv.near && (g.lv.near > 1 || Math.random() < 0.6)) { const pr = ODD_NEAR[Math.floor(Math.random() * ODD_NEAR.length)]; A = ODD_GROUPS.find((x) => x.k === pr[0]); B = ODD_GROUPS.find((x) => x.k === pr[1]); }
    else { const far = (a, b) => ODD_NEAR.some((q) => q[0] === a.k && q[1] === b.k); do { [A, B] = shuffle(ODD_GROUPS).slice(0, 2); } while (far(A, B)); }
    const one = B.e[Math.floor(Math.random() * B.e.length)];
    g.r = { A, B, one, opts: shuffle(shuffle(A.e).slice(0, g.lv.o - 1).concat(one)) };
  }
  else if (g.game === 'howmany') {   // count the things (a tap numbers each one aloud), then pick the number
    let n; do { n = g.lv.lo + Math.floor(Math.random() * (g.lv.hi - g.lv.lo + 1)); } while (g.lv.hi > g.lv.lo && n === g.lastN);
    g.lastN = n;
    const gap = n > 14 ? 13 : n > 10 ? 15 : 19, items = []; for (let k = 0; k < n; k++) { let x, y, tries = 0; do { x = 9 + Math.random() * 82; y = 10 + Math.random() * 80; tries++; } while (tries < 120 && items.some((o) => Math.hypot(o.x - x, o.y - y) < gap)); items.push({ x, y }); }
    const near = [n - 1, n + 1, n - 2, n + 2, n - 3, n + 3].filter((x) => x >= 1 && x <= 20);
    g.r = { n, e: HM_E[Math.floor(Math.random() * HM_E.length)], items, ct: [], opts: shuffle([n].concat(near.slice(0, g.lv.o - 1))) };
  }
  else if (g.game === 'next') {
    const pat = g.lv.pat[Math.floor(Math.random() * g.lv.pat.length)], sym = shuffle(NEXT_E).slice(0, 4), seq = [];
    for (let k = 0; seq.length <= g.lv.show; k++) seq.push(sym['ABCD'.indexOf(pat[k % pat.length])]);
    const answer = seq[g.lv.show], others = sym.filter((x) => x !== answer && pat.includes('ABCD'[sym.indexOf(x)])).concat(shuffle(NEXT_E.filter((x) => !sym.includes(x))));
    g.r = { shown: seq.slice(0, g.lv.show), answer, opts: shuffle([answer].concat(others.slice(0, g.lv.o - 1))) };
  }
  else if (g.game === 'feed') { const want = g.deck[g.n]; g.r = { pal: g.pal, want, opts: shuffle([want].concat(shuffle(FOODS.filter((x) => x !== want)).slice(0, many - 1))) }; if (g.lv.mem) feedHide(g); }
  g.got = false; g.miss = 0;
}
function kgNew(game, t, kid) {
  const g = { game, key: `${t.id}.${kid}`, tid: t.id, kid, n: 0, lv: lvOf(t, kid, game), at: lvState(t, kid, game).at, done: false, got: false };
  if (game === 'shadow') g.deck = shuffle(SHADOWS).slice(0, g.lv.r);
  if (game === 'where' || game === 'odd' || game === 'next' || game === 'howmany') g.deck = Array(g.lv.r).fill(0);   // rounds only: each one is drawn fresh
  if (game === 'bigsmall') { g.deck = shuffle(SHADOWS.filter((x) => !/[✈️⛵🎸🚲]/u.test(x[0]))).slice(0, g.lv.r); g.first = Math.random() < 0.5 ? 0 : 1; }
  if (game === 'feed') { g.pal = FEED_PALS[Math.floor(Math.random() * FEED_PALS.length)]; g.deck = shuffle(FOODS).slice(0, g.lv.r); g.fed = []; }
  if (game === 'sort') {
    g.cols = g.lv.c <= SORT_BASE ? shuffle(SORT_COLS.slice(0, SORT_BASE)).slice(0, g.lv.c) : shuffle(SORT_COLS.slice(0, g.lv.c)); g.bin = {};
    const pool = []; g.cols.forEach((c) => shuffle(c.e).forEach((e) => pool.push({ e, k: c.k })));
    // every colour at least twice, then the rest at random, never the same thing twice
    const firsts = g.cols.flatMap((c) => pool.filter((x) => x.k === c.k).slice(0, 2)), rest = shuffle(pool.filter((x) => !firsts.includes(x)));
    g.items = shuffle(firsts.concat(rest).slice(0, g.lv.r));
  }
  kgRound(g); return g;
}
const kgFor = (game, t, kid) => { if (!kg || kg.game !== game || kg.key !== `${t.id}.${kid}` || kg.at !== lvState(t, kid, game).at) kg = kgNew(game, t, kid); return kg; };
// the question of a round, said aloud as the next one comes up
function kgAsk(g) {
  if (g.game === 'where' && g.r.mode === 'two') { const [a, b] = g.r.steps, nm = (x) => WHERE_ITEM[x.item], at = (x) => WHERE_NAME[x.pos]; return L(`วาง${nm(a)[0]}ไว้${at(a)[0]} แล้ววาง${nm(b)[0]}ไว้${at(b)[0]}`, `Put the ${nm(a)[1]} ${at(a)[1]}, then the ${nm(b)[1]} ${at(b)[1]}`); }
  if (g.game === 'where') return g.r.mode === 'find' ? L(`อะไรอยู่${WHERE_NAME[g.r.pos][0]}?`, `What is ${WHERE_NAME[g.r.pos][1]}?`) : L(`วาง${WHERE_ITEM[g.r.item][0]}ไว้${WHERE_NAME[g.r.pos][0]}`, `Put the ${WHERE_ITEM[g.r.item][1]} ${WHERE_NAME[g.r.pos][1]}`);
  if (g.game === 'odd') return L('อันไหนไม่เข้าพวก?', 'Which one does not belong?');
  if (g.game === 'next') return L('อะไรมาต่อ?', 'What comes next?');
  if (g.game === 'howmany') return L('มีกี่ตัว? แตะนับได้นะ', 'How many? Tap to count them');
  return '';
}
// feed, levels 8+: the wish shows for a moment, then the child keeps it in mind (a tap on the animal shows and says it again)
function feedHide(g, ms) { const r = g.r; clearTimeout(g.hideT); r.hid = false; g.hideT = setTimeout(() => { if (kg !== g || g.r !== r || g.got) return; r.hid = true; const w = $('#kgwant'); if (w) w.classList.add('gone'); }, ms || 2600); }
function kgWin(b, chars) { kg.done = true; lvDone(trip(kg.tid), kg.kid, kg.game); beep('fanfare'); celebrate(chars); star(kg.kid, 2); }
const kgRight = (g) => String(g.game === 'shadow' || g.game === 'feed' ? g.r.want[0] : g.game === 'where' ? (g.r.mode === 'two' ? g.r.steps[g.r.k].pos : g.r.pos) : g.game === 'odd' ? g.r.one : g.game === 'howmany' ? g.r.n : g.game === 'next' ? g.r.answer : g.game === 'bigsmall' ? g.r.right : g.game === 'sort' ? g.items[g.n].k : '');
// three wrong taps in one round: the right answer glows (owner's plan: a child who is stuck gets a hint, never a score)
const kgNope = (b, line) => { beep('tap'); b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(line); if (kg) { kg.miss = (kg.miss || 0) + 1; if (kg.miss >= 3) { const v = kgRight(kg), el = $$('[data-a="kgpick"]').find((x) => x.dataset.v === v); if (el) el.classList.add('hint'); } } };
Object.assign(A, {
  kgpal() {   // the hungry animal says its wish again (and on the memory levels shows it for a moment)
    const g = kg; if (!g || g.game !== 'feed' || g.done) return;
    beep('tap'); sayUi(L(`อยากกิน${g.r.want[1]}`, `${capFirst(g.r.want[3])}, please!`));
    if (g.lv.mem) { const w = $('#kgwant'); if (w) w.classList.remove('gone'); feedHide(g, 1800); }
  },
  kgagain(b) { beep('pop'); kg = kgNew(b.dataset.v, trip(kg.tid), kg.kid); render(); },
  kglv(b) {   // pick a level (a chip, or "on to level n" after a win): the game starts over at it
    const kid = kidNow(), t = kidTrip(kid), game = b.dataset.g, n = +b.dataset.v; if (!t || !LV[game]) return;
    beep('sparkle'); lvSet(kid, game, { at: n });
    if (game === 'jigsaw') jg = null; else if (game === 'match') mg = null; else if (game === 'maze') mz = null; else if (game === 'simon') { clearTimeout(simT); sm = null; } else if (game === 'dots') dt = null; else kg = kgNew(game, t, kid);
    render(); sayUi(L(`ด่าน ${n}!`, `Level ${n}!`));
  },
  kgpick(b) {
    const g = kg; if (!g || g.done || g.got) return;
    const v = b.dataset.v;
    if (g.game === 'shadow') {
      if (v !== g.r.want[0]) return kgNope(b, L('อืม… ไม่ใช่ ลองอีกทีนะ', 'Hmm… not that one. Try again!'));
      g.got = true; beep('chime'); burst(b, ['⭐', '✨']); sayUi(L(`ใช่แล้ว! ${g.r.want[1]}!`, `Yes! A ${g.r.want[2]}!`)); render();
      setTimeout(() => { if (kg !== g) return; g.n++; if (g.n >= g.lv.r) kgWin(b, ['🌟', g.r.want[0], '✨']); else { kgRound(g); sayUi(L('อันนี้เงาของใครเอ่ย?', 'And whose shadow is this?')); } safeRender(); }, 1300);
    } else if (g.game === 'feed') {
      if (v !== g.r.want[0]) return kgNope(b, L(`ไม่เอาอันนี้ อยากกิน${g.r.want[1]}`, `Not that one — ${g.r.want[3]}, please!`));
      g.got = true; beep('munch'); burst(b, ['💛', '😋']); g.fed.push(g.r.want[0]);
      const pal = $('#kgpal'); if (pal) { pal.classList.remove('chomp'); void pal.offsetWidth; pal.classList.add('chomp'); }
      sayUi(L(`ง่ำ ง่ำ! อร่อยจัง`, 'Yum yum! Delicious!'));
      setTimeout(() => { if (kg !== g) return; g.n++; if (g.n >= g.lv.r) { kgWin(b, [g.pal[0], '😋', '💛']); sayUi(L(`${g.pal[1]}อิ่มแล้ว! ขอบคุณนะ`, `${g.pal[2]} is full! Thank you!`)); } else { kgRound(g); sayUi(L(`อยากกิน${g.r.want[1]}`, `${capFirst(g.r.want[3])}, please!`)); } safeRender(); }, 1100);
    } else if (g.game === 'where' && g.r.mode === 'two') {
      const st = g.r.steps[g.r.k];
      if (+v !== st.pos) return kgNope(b, L(`ยังไม่ใช่ ${WHERE_ITEM[st.item][0]}ไป${WHERE_NAME[st.pos][0]}นะ`, `Not there — the ${WHERE_ITEM[st.item][1]} goes ${WHERE_NAME[st.pos][1]}`));
      g.r.placed[st.pos] = st.item; g.r.k++; beep('chime'); burst(b, [st.item, '✨']);
      if (g.r.k < g.r.steps.length) { const nx = g.r.steps[g.r.k]; g.r.pos = nx.pos; g.r.item = nx.item; sayUi(L(`ใช่! แล้ว${WHERE_ITEM[nx.item][0]}ล่ะ?`, `Yes! And the ${WHERE_ITEM[nx.item][1]}?`)); render(); return; }
      g.got = true; sayUi(L('ใช่แล้ว! จำได้ทั้งสองอย่างเลย', 'Yes! You remembered both')); render();
      setTimeout(() => { if (kg !== g) return; g.n++; if (g.n >= g.lv.r) kgWin(b, ['🧠', '⭐', '✨']); else { kgRound(g); sayUi(kgAsk(g)); } safeRender(); }, 1300);
    } else if (g.game === 'where' || g.game === 'odd' || g.game === 'next' || g.game === 'howmany') {
      const ok = g.game === 'where' ? +v === g.r.pos : g.game === 'odd' ? v === g.r.one : g.game === 'howmany' ? +v === g.r.n : v === g.r.answer;
      if (!ok) return kgNope(b, g.game === 'where' ? L(`ยังไม่ใช่ ลองดู${WHERE_NAME[g.r.pos][0]}นะ`, `Not there — look ${WHERE_NAME[g.r.pos][1]}`) : g.game === 'odd' ? L('อันนี้เข้าพวกนะ ลองอีกที', 'That one belongs — try again!') : g.game === 'howmany' ? L('ลองนับอีกทีนะ', 'Let’s count again!') : L('อืม… ไม่ใช่ ดูแถวอีกทีนะ', 'Hmm… look at the row again!'));
      g.got = true; beep('chime'); burst(b, ['⭐', '✨']);
      sayUi(g.game === 'where' ? L(`ใช่แล้ว! ${WHERE_ITEM[g.r.item][0]}อยู่${WHERE_NAME[g.r.pos][0]}`, `Yes! The ${WHERE_ITEM[g.r.item][1]} is ${WHERE_NAME[g.r.pos][1]}`)
        : g.game === 'odd' ? L(`ใช่แล้ว! อันอื่นเป็น${g.r.A.th}`, `Yes! The others are ${g.r.A.en}`) : g.game === 'howmany' ? L(`ใช่แล้ว! ${NUMW.th[g.r.n - 1]}`, `Yes! ${NUMW.en[g.r.n - 1]}!`) : L('ใช่แล้ว! เก่งมาก', 'Yes! Well done'));
      render();
      setTimeout(() => { if (kg !== g) return; g.n++; if (g.n >= g.lv.r) kgWin(b, ['🧠', '⭐', '✨']); else { kgRound(g); sayUi(kgAsk(g)); } safeRender(); }, 1300);
    } else if (g.game === 'bigsmall') {
      if (+v !== g.r.right) return kgNope(b, g.r.big ? L('ยังไม่ใหญ่ที่สุดนะ ลองอีกที', 'Not the biggest — try again!') : L('ยังไม่เล็กที่สุดนะ ลองอีกที', 'Not the smallest — try again!'));
      g.got = true; beep(g.r.big ? 'boom' : 'pop'); burst(b, ['⭐', '✨']); sayUi(g.r.big ? L('ใหญ่ที่สุด! เก่งมาก', 'The biggest! Well done') : L('เล็กที่สุด! เก่งมาก', 'The smallest! Well done')); render();
      setTimeout(() => { if (kg !== g) return; g.n++; if (g.n >= g.lv.r) kgWin(b, ['🐘', '🐭', '⭐']); else { kgRound(g); sayUi(g.r.big ? L('ตัวไหนใหญ่ที่สุด?', 'Which is the biggest?') : L('ตัวไหนเล็กที่สุด?', 'Which is the smallest?')); } safeRender(); }, 1200);
    } else if (g.game === 'sort') {
      const it = g.items[g.n], col = SORT_COLS.find((c) => c.k === it.k);
      if (v !== it.k) return kgNope(b, L(`อันนี้${col.th}นะ`, `This one is ${col.en}!`));
      beep('chime'); burst(b, [it.e, '✨']); sayUi(L(col.th, col.en)); (g.bin[it.k] = g.bin[it.k] || []).push(it.e); g.n++; g.miss = 0;
      if (g.n >= g.items.length) kgWin(b, ['🌈', '⭐', '✨']);
      safeRender();
    }
  },
});
// ---- copy the tune: four coloured pads, each its animal and note; the phone plays a tune (it starts on a tap, so iPad lets the sound out),
// the child plays it back; a wrong note just plays the tune again. Five levels, 2 to 6 notes. ----
const SIMON = [['#FF6B6B', '🐥', 261.63, 'ลูกเจี๊ยบ', 'chick'], ['#FFD43B', '🐱', 329.63, 'แมว', 'cat'], ['#51CF66', '🐸', 392.0, 'กบ', 'frog'], ['#4DABF7', '🐳', 523.25, 'วาฬ', 'whale']];
let sm = null, simT = 0;
function simonNew(t, kid) { const lv = lvOf(t, kid, 'simon'); sm = { key: `${t.id}.${kid}`, tid: t.id, kid, at: lvState(t, kid, 'simon').at, lv, n: 0, seq: [], pos: 0, turn: 'wait', done: false }; simonRound(); }
function simonRound() { sm.seq = Array.from({ length: sm.lv.len }, () => Math.floor(Math.random() * SIMON.length)); sm.pos = 0; sm.turn = 'wait'; }
const simonFor = (t, kid) => { if (!sm || sm.key !== `${t.id}.${kid}` || sm.at !== lvState(t, kid, 'simon').at) simonNew(t, kid); return sm; };
// A pad lights for a moment, then goes dark again — so the same note twice reads as two flashes (owner, Nov 2026: a repeated note looked like one), and its animal hops each time
const simLitT = {};
function simonLight(v, ms) {
  beep('note', SIMON[v][2]); const p = $(`#simonb .spad[data-v="${v}"]`); if (!p) return;
  clearTimeout(simLitT[v]); const was = p.classList.contains('lit'); p.classList.remove('lit');
  const on = () => { p.classList.add('lit'); simLitT[v] = setTimeout(() => p.classList.remove('lit'), ms || 380); const e = p.querySelector('span'); if (e && e.animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) e.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-14px) scale(1.18)' }, { transform: 'translateY(0) scale(1)' }], { duration: 320, easing: 'ease-out' }); };
  if (was) simLitT[v] = setTimeout(on, 90); else on();
}
// The row under the pads: one slot per note, filled with its animal as it plays (listen) or as the child plays it back — two chicks in a row = the chick twice
const simTrackHtml = n => `<div class="simtrack" id="simtrack" aria-hidden="true">${'<i></i>'.repeat(n)}</div>`;
function simonTrack(filled) { const el = $('#simtrack'); if (!el || !sm) return; if (el.children.length !== sm.seq.length) el.outerHTML = simTrackHtml(sm.seq.length); [...$('#simtrack').children].forEach((c, k) => { const v = filled[k]; const html = v == null ? '' : SIMON[v][1]; if (c.innerHTML !== html) { c.innerHTML = html; c.className = v == null ? '' : 'on'; c.style.setProperty('--pc', v == null ? '' : SIMON[v][0]); } }); }
function simonSay() { const el = $('#simonsay'), b = $('#simonb'); if (b) b.classList.toggle('listen', sm.turn === 'listen'); if (el) el.textContent = sm.turn === 'listen' ? L('ฟังนะ…', 'Listen…') : sm.turn === 'you' ? L('ถึงตาหนู! กดตามเพลง', 'Your turn! Play it back') : L('กดฟัง แล้วกดตามนะ', 'Listen, then play it back'); }
function simonPlay() {
  clearTimeout(simT); if (!sm || sm.done) return;
  sm.turn = 'listen'; sm.pos = 0; simonSay(); simonTrack([]); let k = 0;
  const step = () => {
    if (!$('#simonb') || !sm) { if (sm) sm.turn = 'wait'; return; }   // left the game: stop
    if (k >= sm.seq.length) { simT = setTimeout(() => { if (!sm || sm.turn !== 'listen') return; sm.turn = 'you'; simonSay(); simonTrack([]); }, 500); return; }
    simonLight(sm.seq[k], sm.lv.fast ? 260 : 380); k++; simonTrack(sm.seq.slice(0, k)); simT = setTimeout(step, sm.lv.fast ? 520 : 760);
  };
  simT = setTimeout(step, 450);
}
// ---- connect the dots: numbered stars on a night sky; the finger goes 1 → 2 → 3… and the picture appears ----
const starPts = Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 17 : 40; return [Math.round(50 + r * Math.cos(a)), Math.round(54 + r * Math.sin(a))]; });
const DOT_SHAPES = {
  tri: { p: [[50, 14], [86, 80], [14, 80]], th: 'สามเหลี่ยม', en: 'a triangle', c: '#FF8787' },
  sq: { p: [[20, 20], [80, 20], [80, 80], [20, 80]], th: 'สี่เหลี่ยม', en: 'a square', c: '#74C0FC' },
  dia: { p: [[50, 10], [85, 50], [50, 90], [15, 50]], th: 'ว่าว', en: 'a kite', c: '#FFD43B' },
  boat: { p: [[10, 58], [90, 58], [74, 84], [26, 84]], th: 'เรือ', en: 'a boat', c: '#4DABF7' },
  house: { p: [[20, 46], [50, 16], [80, 46], [80, 86], [20, 86]], th: 'บ้าน', en: 'a house', c: '#FFA94D' },
  crown: { p: [[14, 80], [14, 34], [32, 56], [50, 24], [68, 56], [86, 34], [86, 80]], th: 'มงกุฎ', en: 'a crown', c: '#FCC419' },
  fish: { p: [[12, 50], [30, 32], [55, 28], [72, 42], [90, 28], [90, 72], [72, 58], [55, 72], [30, 68]], th: 'ปลา', en: 'a fish', c: '#63E6BE' },
  rocket: { p: [[50, 8], [64, 30], [64, 64], [78, 84], [58, 78], [42, 78], [22, 84], [36, 64], [36, 30]], th: 'จรวด', en: 'a rocket', c: '#E599F7' },
  heart: { p: [[50, 86], [18, 56], [12, 36], [22, 20], [38, 18], [50, 30], [62, 18], [78, 20], [88, 36], [82, 56]], th: 'หัวใจ', en: 'a heart', c: '#FF6B9A' },
  star: { p: starPts, th: 'ดาว', en: 'a star', c: '#FFE066' },
  tree: { p: [[50, 8], [72, 38], [60, 38], [80, 64], [56, 64], [56, 90], [44, 90], [44, 64], [20, 64], [40, 38], [28, 38]], th: 'ต้นไม้', en: 'a tree', c: '#69DB7C' },
  car: { p: [[10, 72], [10, 56], [26, 52], [36, 34], [66, 34], [78, 52], [90, 56], [90, 72]], th: 'รถ', en: 'a car', c: '#FF8787' },
  cat: { p: [[22, 88], [14, 52], [20, 14], [40, 34], [60, 34], [80, 14], [86, 52], [78, 88]], th: 'แมว', en: 'a cat', c: '#FFC078' },
  castle: { p: [[14, 88], [14, 28], [28, 28], [28, 42], [42, 42], [42, 20], [58, 20], [58, 42], [72, 42], [72, 28], [86, 28], [86, 88]], th: 'ปราสาท', en: 'a castle', c: '#B197FC' },
  butterfly: { p: [[50, 32], [32, 12], [12, 22], [16, 48], [36, 52], [18, 72], [28, 90], [50, 68], [72, 90], [82, 72], [64, 52], [84, 48], [88, 22], [68, 12]], th: 'ผีเสื้อ', en: 'a butterfly', c: '#F783AC' },
};
let dt = null, dtDown = false;
function dotsNew(t, kid) { const lv = lvOf(t, kid, 'dots'); dt = { key: `${t.id}.${kid}`, tid: t.id, kid, at: lvState(t, kid, 'dots').at, lv, order: shuffle(lv.s).slice(0, lv.r), n: 0, hit: 0, shown: false, done: false }; }
const dotsFor = (t, kid) => { if (!dt || dt.key !== `${t.id}.${kid}` || dt.at !== lvState(t, kid, 'dots').at) dotsNew(t, kid); return dt; };
function dotsSvg() {
  const sh = DOT_SHAPES[dt.order[dt.n]], p = sh.p, k = dt.hit, all = dt.shown;
  const line = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
  let lines = ''; for (let i = 1; i < k; i++) lines += line(p[i - 1], p[i]); if (all) lines += line(p[p.length - 1], p[0]);
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${all ? `<polygon class="dfill" points="${p.map((q) => q.join(',')).join(' ')}" fill="${sh.c}"/>` : ''}<g class="dline">${lines}</g>
${p.map((q, i) => `<g class="dot${i < k ? ' on' : ''}${i === k && !all ? ' nx' : ''}"><circle cx="${q[0]}" cy="${q[1]}" r="3.4"/><text x="${q[0] + (q[0] > 50 ? 4.5 : -4.5)}" y="${q[1] - 4}" text-anchor="middle">${i + 1}</text><circle class="dhit" data-dot="${i}" cx="${q[0]}" cy="${q[1]}" r="8.5"/></g>`).join('')}</svg>`;
}
function dotsTry(e) {
  if (!dt || dt.done || dt.shown) return;
  const el = document.elementFromPoint(e.clientX, e.clientY), c = el && el.closest && el.closest('[data-dot]'); if (!c || +c.dataset.dot !== dt.hit) return;
  const sh = DOT_SHAPES[dt.order[dt.n]]; dt.hit++; beep('note', XYLO[(dt.hit - 1) % XYLO.length][1]);
  if (dt.hit >= sh.p.length) {
    dt.shown = true; dtDown = false; beep('chime'); sayUi(L(`เป็น${sh.th}!`, `It’s ${sh.en}!`));
    setTimeout(() => { if (!dt || dt.order[dt.n] !== Object.keys(DOT_SHAPES).find((x) => DOT_SHAPES[x] === sh)) return;
      if (dt.n + 1 >= dt.order.length) { dt.done = true; lvDone(trip(dt.tid), dt.kid, 'dots'); beep('fanfare'); celebrate(['✨', '⭐', '🌙']); star(dt.kid, 2); safeRender(); }
      else { dt.n++; dt.hit = 0; dt.shown = false; safeRender(); } }, 1700);
  }
  if (dt.shown) { safeRender(); return; }   // the picture is done: the guide says its name
  const bd = $('#dotsb'); if (bd) bd.innerHTML = dotsSvg();
}
document.addEventListener('pointerdown', (e) => { if (e.target.closest && e.target.closest('#dotsb')) { dtDown = true; e.preventDefault(); dotsTry(e); } });
document.addEventListener('pointermove', (e) => { if (dtDown) dotsTry(e); });
document.addEventListener('pointerup', () => { dtDown = false; });
document.addEventListener('pointercancel', () => { dtDown = false; });
// ---- decorate a cake (free play): tap a topping to put it on, candles too; blow them out for the birthday song and confetti ----
const CAKE_TOPS = ['🍓', '🍒', '🫐', '🍫', '⭐', '🌸', '🍬', '🍭', '🕯️'];
const HAPPY_BDAY = [0, 0, 1, 0, 3, 2, -1, 0, 0, 1, 0, 4, 3, -1, 0, 0, 7, 5, 3, 2, 1, -1, 5, 5, 5, 3, 4, 3];   // on the xylophone's eight bars
const CAKE_SVG = '<svg class="cakesvg" viewBox="0 0 200 160" aria-hidden="true"><ellipse cx="100" cy="142" rx="92" ry="13" fill="#E9ECEF"/><rect x="28" y="84" width="144" height="56" rx="12" fill="#F7B6CF"/><path d="M28 96 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 q9 14 18 0 V92 H28Z" fill="#fff"/><rect x="50" y="44" width="100" height="46" rx="12" fill="#FFE3EC"/><path d="M50 56 q8 12 16.6 0 q8 12 16.6 0 q8 12 16.6 0 q8 12 16.6 0 q8 12 16.6 0 q8 12 16.6 0 V52 H50Z" fill="#fff"/><rect x="50" y="44" width="100" height="10" rx="5" fill="#fff"/></svg>';
let ck = null;
const cakeFor = (kid) => { if (!ck || ck.kid !== kid) ck = { kid, items: [], blown: false, starred: false }; return ck; };
function cakeSpot(isCandle) {
  for (let tries = 0; tries < 60; tries++) {
    const top = isCandle || Math.random() < 0.45, x = top ? 30 + Math.random() * 40 : 20 + Math.random() * 60, y = isCandle ? 25 : top ? 36 + Math.random() * 14 : 62 + Math.random() * 16;
    if (!ck.items.some((o) => Math.hypot(o.x - x, (o.y - y) * 0.8) < 9)) return { x, y };
  }
  return null;
}
Object.assign(A, {
  simonplay() { beep('tap'); simonPlay(); },
  simonpad(b) {
    const v = +b.dataset.v; if (!sm || sm.done) return;
    simonLight(v);
    if (sm.turn !== 'you') return;   // between tunes the pads are just an instrument
    if (v !== sm.seq[sm.pos]) { sm.turn = 'wait'; b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); sayUi(L('อุ๊ย ฟังอีกทีนะ', 'Oops — listen again!')); setTimeout(simonPlay, 1500); return; }
    sm.pos++; simonTrack(sm.seq.slice(0, sm.pos));
    if (sm.pos < sm.seq.length) return;
    sm.turn = 'wait'; sm.n++; burst(b, ['⭐', '🎵']);
    if (sm.n >= sm.lv.r) { sm.done = true; lvDone(trip(sm.tid), sm.kid, 'simon'); setTimeout(() => { beep('fanfare'); celebrate(['🎵', '⭐', '✨']); star(sm.kid, 2); sayUi(L('เก่งมาก! จำเพลงได้หมดเลย', 'Brilliant! You remembered every tune')); safeRender(); }, 500); return; }
    sayUi(L('เก่งมาก! ฟังเพลงต่อไปนะ', 'Well done! Here comes the next one')); simonRound();
    setTimeout(() => { if (sm && !sm.done) { safeRender(); simonPlay(); } }, 1600);
  },
  simonagain() { beep('pop'); clearTimeout(simT); simonNew(trip(sm.tid), sm.kid); render(); },
  dotsagain() { beep('pop'); dotsNew(trip(dt.tid), dt.kid); render(); },
  hmtap(b) {
    const g = kg; if (!g || g.game !== 'howmany' || g.done) return;
    const k = +b.dataset.v; if (g.r.ct.includes(k)) return;
    g.r.ct.push(k); const n = g.r.ct.length; b.classList.add('ct'); b.dataset.c = n; beep('pop'); sayUi(L(NUMW.th[n - 1], NUMW.en[n - 1]));
  },
  cakeadd(b) {
    const c = ck; if (!c) return; const e = b.dataset.v;
    if (c.items.length >= 16) { sayUi(L('เค้กเต็มแล้ว! เป่าเทียนกันไหม', 'The cake is full! Shall we blow out the candles?')); return; }
    const at = cakeSpot(e === '🕯️'); if (!at) { sayUi(L('ไม่มีที่ว่างแล้ว', 'No more room')); return; }
    if (c.blown) c.blown = false;
    c.items.push({ e, x: at.x, y: at.y }); beep('pop'); render();
  },
  cakeblow() {
    const c = ck; if (!c || c.blown) return;
    c.blown = true; beep('whoosh'); render(); sayUi(L('สุขสันต์วันเกิด!', 'Happy birthday!'));
    let k = 0; const step = () => { if (k >= HAPPY_BDAY.length || !$('#cakebox')) return; const v = HAPPY_BDAY[k++]; if (v >= 0) beep('note', XYLO[v][1]); setTimeout(step, 360); };
    setTimeout(step, 500); celebrate(['🎂', '🎉', '🎈']);
    if (!c.starred) { c.starred = true; star(c.kid, 1); }
  },
  cakenew() { beep('pop'); if (ck) { ck.items = []; ck.blown = false; } render(); },
});
// ---- the maze: a fresh maze each round (depth-first carving), the finger draws the way from the animal to its goal; walls stop it,
// sliding back takes the last step back. Five sizes, 3×3 to 7×7. ----
const MAZE_PAIRS = [['🐭', '🧀', 'หนู', 'ชีส', 'mouse', 'cheese'], ['🐰', '🥕', 'กระต่าย', 'แครอท', 'rabbit', 'carrot'], ['🐝', '🌻', 'ผึ้ง', 'ดอกไม้', 'bee', 'flower'], ['🐶', '🦴', 'หมา', 'กระดูก', 'puppy', 'bone'], ['🐧', '🐟', 'เพนกวิน', 'ปลา', 'penguin', 'fish'], ['🐿️', '🌰', 'กระรอก', 'ลูกโอ๊ก', 'squirrel', 'nut']];
let mz = null, mzDown = false;
function mazeNew(t, kid) {
  const n = lvOf(t, kid, 'maze').n, right = Array(n * n).fill(true), bottom = Array(n * n).fill(true), seen = new Set([0]), stack = [0];
  while (stack.length) {
    const c = stack[stack.length - 1], r = Math.floor(c / n), k = c % n;
    const nb = shuffle([[r - 1, k], [r + 1, k], [r, k - 1], [r, k + 1]].filter(([y, x]) => y >= 0 && y < n && x >= 0 && x < n && !seen.has(y * n + x)));
    if (!nb.length) { stack.pop(); continue; }
    const [y, x] = nb[0], d = y * n + x;
    if (y === r) right[Math.min(c, d)] = false; else bottom[Math.min(c, d)] = false;
    seen.add(d); stack.push(d);
  }
  mz = { key: `${t.id}.${kid}`, tid: t.id, kid, at: lvState(t, kid, 'maze').at, n, right, bottom, path: [0], done: false, pair: MAZE_PAIRS[Math.floor(Math.random() * MAZE_PAIRS.length)], star: -1, got: false };
  if (lvOf(t, kid, 'maze').star) {   // the ⭐ sits off the route from start to goal, as far down a side path as possible
    const prev = { 0: -1 }, q = [0]; while (q.length) { const c = q.shift(); [c - n, c + n, c - 1, c + 1].forEach((d) => { if (d >= 0 && d < n * n && !(d in prev) && mazeOpen(c, d)) { prev[d] = c; q.push(d); } }); }
    const route = new Set(); for (let c = n * n - 1; c !== -1; c = prev[c]) route.add(c);
    const off = (c) => { let k = 0; while (!route.has(c)) { c = prev[c]; k++; } return k; };
    const cand = Array.from({ length: n * n }, (_, c) => c).filter((c) => !route.has(c)).sort((a, b) => off(b) - off(a));
    if (cand.length) mz.star = cand[Math.floor(Math.random() * Math.min(4, cand.length))];
  }
}
const mazeFor = (t, kid) => { if (!mz || mz.key !== `${t.id}.${kid}` || mz.at !== lvState(t, kid, 'maze').at) mazeNew(t, kid); return mz; };
// is there no wall between two neighbouring cells?
function mazeOpen(a, b) {
  const n = mz.n, ra = Math.floor(a / n), rb = Math.floor(b / n);
  if (ra === rb && Math.abs(a - b) === 1) return !mz.right[Math.min(a, b)];
  if (Math.abs(a - b) === n) return !mz.bottom[Math.min(a, b)];
  return false;
}
function mazeCells() {
  const n = mz.n, on = new Set(mz.path), head = mz.path[mz.path.length - 1], end = n * n - 1;
  return Array.from({ length: n * n }, (_, i) => `<div class="mz${mz.right[i] && i % n !== n - 1 ? ' wr' : ''}${mz.bottom[i] && i < end - n + 1 ? ' wb' : ''}${on.has(i) ? ' on' : ''}" data-i="${i}">${i === head ? `<span class="mzhd">${mz.pair[0]}</span>` : i === end ? `<span>${mz.pair[1]}</span>` : i === mz.star && !mz.got ? '<span class="mzstar">⭐</span>' : ''}</div>`).join('');
}
function mazeTry(i) {
  if (!mz || mz.done || i == null || isNaN(i)) return;
  const p = mz.path, last = p[p.length - 1];
  if (i === last) return;
  if (p.length > 1 && i === p[p.length - 2]) p.pop();
  else if (!p.includes(i) && mazeOpen(last, i)) { p.push(i); if (p.length % 2) beep('tap'); }
  else return;
  if (i === mz.star && !mz.got) { mz.got = true; beep('sparkle'); sayUi(L('ได้ดาวแล้ว! ไปต่อเลย', 'Got the star! Keep going')); }
  const bd = $('#mazeb'); if (bd) bd.innerHTML = mazeCells();
  if (i === mz.n * mz.n - 1 && mz.star >= 0 && !mz.got) { p.pop(); if (bd) bd.innerHTML = mazeCells(); sayUi(L('เก็บดาวก่อนนะ!', 'Pick up the star first!')); return; }
  if (i === mz.n * mz.n - 1) {
    mz.done = true; mzDown = false; lvDone(trip(mz.tid), mz.kid, 'maze'); beep('fanfare'); celebrate([mz.pair[0], mz.pair[1], '⭐']); star(mz.kid, 2);
    sayUi(L(`เย้! ${mz.pair[2]}เจอ${mz.pair[3]}แล้ว`, `Hooray! The ${mz.pair[4]} found the ${mz.pair[5]}`)); setTimeout(safeRender, 600);
  }
}
const mzCell = (e) => { const el = document.elementFromPoint(e.clientX, e.clientY), c = el && el.closest && el.closest('#mazeb .mz'); return c ? +c.dataset.i : null; };
document.addEventListener('pointerdown', (e) => { if (e.target.closest && e.target.closest('#mazeb')) { mzDown = true; e.preventDefault(); mazeTry(mzCell(e)); } });
document.addEventListener('pointermove', (e) => { if (mzDown) mazeTry(mzCell(e)); });
document.addEventListener('pointerup', () => { mzDown = false; });
document.addEventListener('pointercancel', () => { mzDown = false; });
Object.assign(A, {
  mazeagain() { beep('pop'); const t = trip(mz.tid); mazeNew(t, mz.kid); render(); },
});
// ---- animal sounds on the farm: [emoji, th, en, the sound in Thai, in English, x %, y %] — placed by hand so none overlap ----
const FARM = [['🐮', 'วัว', 'cow', 'มอ มอ', 'moo moo', 14, 54], ['🐷', 'หมู', 'pig', 'อู๊ด อู๊ด', 'oink oink', 40, 54], ['🐔', 'ไก่', 'hen', 'กุ๊ก กุ๊ก', 'cluck cluck', 68, 54],
  ['🐶', 'หมา', 'dog', 'โฮ่ง โฮ่ง', 'woof woof', 18, 80], ['🐱', 'แมว', 'cat', 'เหมียว เหมียว', 'meow', 50, 80], ['🦆', 'เป็ด', 'duck', 'ก้าบ ก้าบ', 'quack quack', 82, 80],
  ['🐑', 'แกะ', 'sheep', 'แบ๊ แบ๊', 'baa baa', 26, 28], ['🐴', 'ม้า', 'horse', 'ฮี้ ฮี้', 'neigh', 58, 28], ['🐸', 'กบ', 'frog', 'อ๊บ อ๊บ', 'ribbit', 86, 28]];
let farm = null;
const farmFor = (t, kid) => { if (!farm || farm.key !== `${t.id}.${kid}`) farm = { key: `${t.id}.${kid}`, kid, heard: new Set(), done: false }; return farm; };
// ---- bath time: the mud is a canvas over the animal; a finger rubs it away (destination-out), bubbles and a squeak while scrubbing ----
const WASH = [['🐶', 'น้องหมา', 'Puppy'], ['🐷', 'น้องหมู', 'Piggy'], ['🐘', 'น้องช้าง', 'Ellie'], ['🐰', 'น้องกระต่าย', 'Bunny'], ['🐻', 'น้องหมี', 'Teddy'], ['🦛', 'น้องฮิปโป', 'Hippo'], ['🐱', 'น้องแมว', 'Kitty'], ['🐼', 'น้องแพนด้า', 'Panda']];
let wash = null;
function washFor(t, kid) {
  if (!wash || wash.key !== `${t.id}.${kid}`) wash = { key: `${t.id}.${kid}`, kid, order: shuffle(WASH), n: 0, clean: false, cv: null };
  wash.a = wash.order[wash.n % wash.order.length]; return wash;
}
function washMount() {
  const ph = $('#washph'), box = $('#washbox'); if (!ph || !box || !wash) return;
  if (wash.clean) { ph.remove(); return; }
  // the same canvas comes back over a redraw, so a page refresh never puts the mud back
  if (wash.cv && wash.cv.dataset.n === String(wash.n)) { ph.replaceWith(wash.cv); return; }
  const w = box.clientWidth, h = box.clientHeight, cv = document.createElement('canvas');
  cv.width = w; cv.height = h; cv.className = 'mud'; cv.dataset.n = String(wash.n); cv.setAttribute('aria-label', L('ถูโคลนออก', 'Rub the mud off'));
  const x = cv.getContext('2d'), cols = ['#8B5E34', '#7A4E2A', '#9C6B3F', '#6E4524'];
  for (let i = 0; i < 46; i++) { x.fillStyle = cols[i % cols.length]; x.beginPath(); x.arc(w * (0.18 + Math.random() * 0.64), h * (0.15 + Math.random() * 0.7), Math.min(w, h) * (0.07 + Math.random() * 0.09), 0, Math.PI * 2); x.fill(); }
  wash.cv = cv; wash.moves = 0; wash.mud0 = mudLeft(cv); ph.replaceWith(cv);
}
// how much mud is left: the share of opaque pixels on a coarse grid
function mudLeft(cv) {
  try { const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data, step = 12; let on = 0, all = 0;
    for (let y = 0; y < cv.height; y += step) for (let x = 0; x < cv.width; x += step) { all++; if (d[(y * cv.width + x) * 4 + 3] > 40) on++; }
    return all ? on / all : 0; } catch (_) { return 0; }
}
let washDown = false, washLast = 0;
function washRub(e) {
  const cv = e.target; if (!wash || wash.clean || cv !== wash.cv) return;
  const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) * cv.width / r.width, y = (e.clientY - r.top) * cv.height / r.height, c = cv.getContext('2d');
  c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(x, y, Math.max(26, cv.width * 0.08), 0, Math.PI * 2); c.fill(); c.globalCompositeOperation = 'source-over';
  const now = Date.now(); if (now - washLast > 260) { washLast = now; beep('bubble'); const box = $('#washbox'); if (box) { const s = document.createElement('i'); s.className = 'suds'; s.textContent = '🫧'; s.style.left = `${(e.clientX - box.getBoundingClientRect().left)}px`; s.style.top = `${(e.clientY - box.getBoundingClientRect().top)}px`; box.appendChild(s); setTimeout(() => s.remove(), 900); } }
  if (++wash.moves % 8 === 0 && mudLeft(cv) < (wash.mud0 || 1) * 0.12) {   // nearly all of it gone: the rest washes off by itself
    wash.clean = true; c.clearRect(0, 0, cv.width, cv.height); beep('sparkle'); celebrate(['🫧', '✨', wash.a[0]]); star(wash.kid, 1);
    sayUi(L(`${wash.a[1]}สะอาดแล้ว! หอมจัง`, `${wash.a[2]} is all clean!`)); safeRender();
  }
}
document.addEventListener('pointerdown', (e) => { if (e.target.classList && e.target.classList.contains('mud')) { washDown = true; e.preventDefault(); washRub(e); } });
document.addEventListener('pointermove', (e) => { if (washDown && e.target.classList && e.target.classList.contains('mud')) washRub(e); });
document.addEventListener('pointerup', () => { washDown = false; });
document.addEventListener('pointercancel', () => { washDown = false; });
Object.assign(A, {
  farmtap(b) {
    const n = +b.dataset.v, a = FARM[n]; if (!a || !farm) return;
    beep('boing'); b.classList.remove('jump'); void b.offsetWidth; b.classList.add('jump', 'heard'); burst(b, ['🎵', '✨']);
    sayUi(L(`${a[1]}ร้อง ${a[3]}`, `The ${a[2]} says ${a[4]}`));
    farm.heard.add(n);
    if (!farm.done && farm.heard.size >= FARM.length) { farm.done = true; star(farm.kid, 1); setTimeout(() => { celebrate(['🐮', '🐷', '🐔']); sayUi(L('ฟังครบทุกตัวแล้ว เก่งมาก!', 'You heard every animal! Well done!')); }, 1400); }
  },
  washnext() { beep('pop'); if (!wash) return; wash.n++; wash.clean = false; wash.cv = null; wash.a = wash.order[wash.n % wash.order.length]; render(); sayUi(L(`${wash.a[1]}เลอะโคลน! ถูให้สะอาดหน่อย`, `${wash.a[2]} is muddy! Scrub scrub!`)); },
});
// ---- I spy: twelve things scattered without overlap; five of them are the targets, named one at a time ----
const HIDE_POOL = [['🐥', 'ลูกเจี๊ยบ', 'chick'], ['🐸', 'กบ', 'frog'], ['🦋', 'ผีเสื้อ', 'butterfly'], ['🐢', 'เต่า', 'turtle'], ['🍓', 'สตรอว์เบอร์รี', 'strawberry'], ['⭐', 'ดาว', 'star'],
  ['🎈', 'ลูกโป่ง', 'balloon'], ['🐟', 'ปลา', 'fish'], ['🌼', 'ดอกไม้', 'flower'], ['🍎', 'แอปเปิล', 'apple'], ['🚗', 'รถ', 'car'], ['🐱', 'แมว', 'cat'], ['🐶', 'หมา', 'dog'], ['🦆', 'เป็ด', 'duck'], ['🍦', 'ไอศกรีม', 'ice cream'], ['🚀', 'จรวด', 'rocket']];
let hs = null, jg = null;
function newHide(t, i, kid) {
  const pool = HIDE_POOL.slice().sort(() => Math.random() - 0.5).slice(0, 12), targets = pool.slice(0, 5), items = [], src = (pixMode(t, i, 'hideseek') === 'photo' && randPhoto(t)) || dayArt(t, i);
  pool.forEach((p) => { let x, y, tries = 0; do { x = 12 + Math.random() * 76; y = 12 + Math.random() * 76; tries++; } while (tries < 80 && items.some((o) => Math.hypot(o.x - x, o.y - y) < 17));   // whole inside the board (a tap on the edge must land)
    items.push({ e: p[0], th: p[1], en: p[2], x, y, s: 40 + Math.round(Math.random() * 16), r: Math.round(Math.random() * 40 - 20), found: false }); });
  hs = { key: `${t.id}.${i}.${kid}`, targets, found: [], items: items.sort(() => Math.random() - 0.5), src };
}
// ---- the jigsaw by finger: a piece can also be dragged onto its place (iPad owner, Nov 2026: small hands drag; the slots used to stretch
// to the board's aspect-ratio height, which Safari does not stretch grid rows to, so they came out short and did not match the pieces).
// A tap-tap still works: a press that hardly moves is left to the click. A drag that ends off the board puts the piece back. ----
let jdrag = null, jdragEnd = 0;
document.addEventListener('pointerdown', (e) => {
  const p = e.target.closest && e.target.closest('.jpiece'); if (!p || !jg || jg.done || e.button > 0) return;
  const r = p.getBoundingClientRect();
  jdrag = { p, v: +p.dataset.v, id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height, ghost: null, over: null };
});
const jslotAt = (x, y) => { const el = document.elementFromPoint(x, y); return el && el.closest ? el.closest('.jslot') : null; };
document.addEventListener('pointermove', (e) => {
  const d = jdrag; if (!d || e.pointerId !== d.id) return;
  if (!d.ghost) {
    if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 8) return;   // not a drag yet: a tap stays a tap
    const g = document.createElement('div'); g.className = 'jghost'; g.setAttribute('aria-hidden', 'true');
    g.style.cssText = `width:${d.w}px;height:${d.h}px;background-image:${getComputedStyle(d.p).backgroundImage};background-size:${getComputedStyle(d.p).backgroundSize};background-position:${getComputedStyle(d.p).backgroundPosition}`;
    document.body.appendChild(g); d.ghost = g; d.p.classList.add('lifted'); jg.pick = d.v; beep('tap');
  }
  d.ghost.style.transform = `translate(${e.clientX - d.dx}px,${e.clientY - d.dy}px) scale(1.06)`;
  const s = jslotAt(e.clientX, e.clientY);
  if (s !== d.over) { if (d.over) d.over.classList.remove('hover'); d.over = s; if (s && !s.classList.contains('filled')) s.classList.add('hover'); }
});
const jdragDone = (e) => {
  const d = jdrag; if (!d || e.pointerId !== d.id) return;
  jdrag = null; if (!d.ghost) return;   // a tap: the click does the rest
  d.ghost.remove(); d.p.classList.remove('lifted'); if (d.over) d.over.classList.remove('hover');
  jdragEnd = Date.now();   // the click that follows a drag must not pick the piece up again
  const s = e.type === 'pointerup' ? jslotAt(e.clientX, e.clientY) : null;
  if (s && jg) { jg.pick = d.v; A.kidjslot(s); if (jg && jg.pick !== null) setTimeout(render, 260); }   // wrong place: the slot shakes, then the piece shows picked (tap the right place)
  else if (jg) { jg.pick = null; render(); }
};
document.addEventListener('pointerup', jdragDone);
document.addEventListener('pointercancel', jdragDone);
document.addEventListener('click', (e) => { if (Date.now() - jdragEnd < 400 && e.target.closest && e.target.closest('.jpiece, .jslot')) { e.stopPropagation(); e.preventDefault(); } }, true);
// ---- the jigsaw: the day's picture cut into 2×2 (the little one) or 3×2; a piece shows its crop through background-position ----
function newJigsaw(t, i, kid) {
  const lv = lvOf(t, kid, 'jigsaw'), cols = lv.c, rows = lv.r, n = cols * rows, photo = pixMode(t, i, 'jigsaw') === 'photo', src = (photo && randPhoto(t)) || dayArt(t, i);
  jg = { key: `${t.id}.${i}.${kid}`, at: lvState(t, kid, 'jigsaw').at, cols, rows, src, ar: 1, slots: Array(n).fill(null), tray: Array.from({ length: n }, (_, k) => k).sort(() => Math.random() - 0.5), pick: null, done: false };
  if (photo && src) { const im = new Image(); im.onload = () => { if (jg && jg.src === src) { jg.ar = Math.min(1.5, Math.max(0.7, im.naturalWidth / im.naturalHeight)); render(); } }; im.src = src; }   // the board takes the photo's shape once known
}
const jgPos = (p, g) => `background-image:var(--art);background-size:${g.cols * 100}% ${g.rows * 100}%;background-position:${g.cols > 1 ? (p % g.cols) / (g.cols - 1) * 100 : 0}% ${g.rows > 1 ? Math.floor(p / g.cols) / (g.rows - 1) * 100 : 0}%`;
// ---- music: the xylophone's bars (C major) and two songs as bar numbers; a song lights each bar as it plays ----
const XYLO = [['C', 261.63, '#FF6B6B', '🐥'], ['D', 293.66, '#FFA94D', '🐸'], ['E', 329.63, '#FFD43B', '🐱'], ['F', 349.23, '#8CE99A', '🐶'], ['G', 392.00, '#66D9E8', '🐰'], ['A', 440.00, '#74C0FC', '🐼'], ['B', 493.88, '#B197FC', '🦊'], ['C', 523.25, '#F783AC', '🐨']];
const SONGS = [   // the whole verse (owner, Nov 2026: twice as long as the first line they used to stop at)
  { th: 'ดาวน้อย', en: 'Twinkle', seq: [0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0, -1, 4, 4, 3, 3, 2, 2, 1, -1, 4, 4, 3, 3, 2, 2, 1, -1, 0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0] },
  { th: 'ลูกแกะน้อย', en: 'Little lamb', seq: [2, 1, 0, 1, 2, 2, 2, -1, 1, 1, 1, -1, 2, 4, 4, -1, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0, -1, -1, 2, 1, 0, 1, 2, 2, 2, -1, 1, 1, 1, -1, 2, 4, 4, -1, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0] },
  { th: 'พายเรือ', en: 'Row your boat', seq: [0, 0, 0, 1, 2, -1, 2, 1, 2, 3, 4, -1, 7, 7, 7, 4, 4, 4, 2, 2, 2, 0, 0, 0, -1, 4, 3, 2, 1, 0, -1, -1, 0, 0, 0, 1, 2, -1, 2, 1, 2, 3, 4, -1, 7, 7, 7, 4, 4, 4, 2, 2, 2, 0, 0, 0, -1, 4, 3, 2, 1, 0] },
  { th: 'สะพานลอนดอน', en: 'London Bridge', seq: [4, 5, 4, 3, 2, 3, 4, -1, 1, 2, 3, -1, 2, 3, 4, -1, 4, 5, 4, 3, 2, 3, 4, -1, 1, 4, 2, 0, -1, -1, 4, 5, 4, 3, 2, 3, 4, -1, 1, 2, 3, -1, 2, 3, 4, -1, 4, 5, 4, 3, 2, 3, 4, -1, 1, 4, 2, 0] },
  { th: 'ลุงแมคโดนัลด์', en: 'Old MacDonald', seq: [0, 0, 0, 4, 5, 5, 4, -1, 2, 2, 1, 1, 0, -1, 4, 0, 0, 0, 4, 5, 5, 4, -1, 2, 2, 1, 1, 0, -1, 4, 4, 0, 0, 0, -1, 4, 4, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 4, 5, 5, 4, -1, 2, 2, 1, 1, 0] },
  { th: 'จิงเกิลเบล', en: 'Jingle bells', seq: [2, 2, 2, -1, 2, 2, 2, -1, 2, 4, 0, 1, 2, -1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 1, -1, 4, -1, 2, 2, 2, -1, 2, 2, 2, -1, 2, 4, 0, 1, 2, -1, 3, 3, 3, 3, 3, 2, 2, 2, 4, 4, 3, 1, 0] },
];
let songT = 0;
function playSong(n, kid) {
  const s = SONGS[n]; if (!s) return;
  clearTimeout(songT); let k = 0;
  const step = () => {
    const bars = $$('.xylo button'); if (!bars.length) return;
    if (k >= s.seq.length) { beep('yay'); celebrate(['🎵', '⭐', '✨']); star(kid, 1); return; }
    const v = s.seq[k++];
    if (v >= 0) { beep('note', XYLO[v][1]); const b = bars[v]; b.classList.remove('lit'); void b.offsetWidth; b.classList.add('lit'); }
    songT = setTimeout(step, 400);
  };
  step();
}
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
// grown-ups empty the star jar (and its friends) by pressing and holding it 1.5 s — a test run's stars, a fresh start; nothing on the server
let jarT = 0;
document.addEventListener('pointerdown', (e) => {
  const jar = e.target.closest && e.target.closest('.starjar'); if (!jar || !isEditor()) return;
  jar.classList.add('holding');
  jarT = setTimeout(() => { const k = jar.dataset.k; ls('stars_' + k, null); ls('pets_' + k, null); beep('pop'); toast(L('ล้างโถดาวแล้ว', 'The star jar is empty again')); render(); }, 1500);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => document.addEventListener(ev, () => { clearTimeout(jarT); const j = $('.starjar'); if (j) j.classList.remove('holding'); }, true));
// grown-ups leave kid mode by pressing and holding the lock
let holdT = 0;
document.addEventListener('pointerdown', (e) => {
  const lock = e.target.closest && e.target.closest('#kidexit'); if (!lock) return;
  lock.classList.add('holding');
  holdT = setTimeout(() => { const k = ls('kidmode'); ls('kidmode', null); beep('pop'); nav(k && k !== 'pick' ? `#/passport/${k}` : '#/'); }, 1200);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => document.addEventListener(ev, () => { clearTimeout(holdT); const l = $('#kidexit'); if (l) l.classList.remove('holding'); }, true));
