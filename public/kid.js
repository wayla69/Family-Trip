'use strict';
/* ===== Memory Bookshelf · kid mode: big buttons for Mimi (3) and Mika (1½) =====
   #/kid → pick a child · #/kid/<kid> home (pages of four huge tiles, swipe or arrows) · /colour · /draw · /spot · /stamp · /words
   · /count (surprise doors) · /pack · /map · /quiz · /stickers · /hearts · /photos · /match · /mood · /animals · /numbers · /trophies
   Locked: while kid mode is on, every route comes back here; a grown-up exits by pressing and holding the lock (1.2 s).
   Sounds are synthesised (Web Audio), words and bedtime stories are read by the phone's own voices (speechSynthesis) —
   nothing leaves the phone. Drawings are uploaded like photos (private, never public). */

/* ---------- sounds ---------- */
let audioCtx = null;
function beep(kind, x) {   // x: the note's frequency for 'note'
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
    else if (kind === 'whoosh') sweep(c, t0, 260, 1400, 0.45, 'sine', 0.14);
    else if (kind === 'boom') { sweep(c, t0, 160, 40, 0.6, 'sine', 0.55); tone(90, 0.02, 0.5, 'triangle', 0.3); }
    else if (kind === 'splash') [1100, 1500, 900, 1800, 1250].forEach((f, i) => tone(f + Math.random() * 200, i * 0.05, 0.12, 'sine', 0.12));
    else if (kind === 'sparkle') [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.06, 0.35, 'sine', 0.12));
    else if (kind === 'yay') [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.07, 0.25, 'triangle', 0.14));
    else if (kind === 'boing') sweep(c, t0, 180, 520, 0.3, 'triangle', 0.2);
    else if (kind === 'note') { tone(x, 0, 0.6, 'triangle', 0.2); tone(x * 2, 0, 0.3, 'sine', 0.05); }   // the xylophone
    else if (kind === 'kick') sweep(c, t0, 150, 45, 0.25, 'sine', 0.6);
    else if (kind === 'snare') { noise(c, t0, 0.18, 0.35, 1800); tone(190, 0, 0.1, 'triangle', 0.25); }
    else if (kind === 'hat') noise(c, t0, 0.06, 0.2, 6000);
    else if (kind === 'clap') { noise(c, t0, 0.09, 0.3, 1200); noise(c, t0 + 0.03, 0.12, 0.25, 1500); }
    else if (kind === 'frog') { sweep(c, t0, 420, 180, 0.16, 'sawtooth', 0.12); sweep(c, t0 + 0.17, 380, 160, 0.14, 'sawtooth', 0.1); }
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
  o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur);
}
// a burst of white noise through a high-pass filter (the snare, the hi-hat)
let noiseBuf = null;
function noise(c, t0, dur, vol, hp) {
  if (!noiseBuf) { noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp;
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  s.connect(f); f.connect(g); g.connect(c.destination); s.start(t0); s.stop(t0 + dur);
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
  if (!v && /^zh-HK$/i.test(langTag)) { toast(L('เครื่องนี้ยังไม่มีเสียงภาษากวางตุ้ง', 'No Cantonese voice on this phone yet (Settings › Accessibility › Spoken Content › Voices)')); return false; }
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
  t.days.forEach((_, i) => add(`gift.d${i}`, giftE(i), '', ticked(t, `gift.d${i}`, kid)));   // the morning surprise box's sticker
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
function matchDeck(t) {
  const faces = [];
  if (pixMode(t, kidDayOf(t), 'match') === 'photo') shuffle(kidPhotoPool(t)).slice(0, 6).forEach((m) => faces.push({ k: 'p' + m.id, img: imgT(m), ph: true }));   // the family's photos first, drawings fill the rest
  if (faces.length < 6) t.days.forEach((_, i) => { const a = dayArt(t, i); if (a) faces.push({ k: 'd' + i, img: a }); });
  ((t.passport || {}).days || []).forEach((pd, i) => (pd.spot || []).forEach((s) => faces.push({ k: `s${i}.${s.k}`, e: s.e })));
  if (faces.length < 6) ['🐨', '🦘', '🐬', '🐼', '🚢', '✈️'].forEach((e, i) => faces.push({ k: 'x' + i, e }));
  const seenE = new Set(), uniq = faces.filter((f) => !f.e || (!seenE.has(f.e) && seenE.add(f.e)));   // one card per face: two different keys with the same emoji would never match
  const pick = uniq.filter((f) => f.ph).concat(shuffle(uniq.filter((f) => !f.ph))).slice(0, 6); return shuffle(pick.concat(pick));
}
// which pictures a game uses (owner's ask, Nov 2026: the children's own photos are the pictures they love most): 'art' = the day's drawing,
// 'photo' = one of the family's photos (520 px thumbnails, on the phone once the book is stored) — per game, this visit
let kidPix = { jigsaw: null, hideseek: null, match: null };
const kidPhotoPool = (t) => mediaOf(t.id).filter((m) => !isDrawing(m) && !m.pending);
const pixMode = (t, i, g) => kidPix[g] || (g === 'jigsaw' && !dayArt(t, i) ? 'photo' : 'art');
const randPhoto = (t) => { const p = kidPhotoPool(t); return p.length ? imgT(p[Math.floor(Math.random() * p.length)]) : null; };
const pixPick = (t, i, g, again) => (kidPhotoPool(t).length ? `<div class="pixpick" role="group" aria-label="${L('รูปที่ใช้', 'Pictures')}">${(g === 'jigsaw' && !dayArt(t, i) ? [] : [['art', '🎨', L('ภาพวาด', 'Drawing')]]).concat([['photo', '📷', L('รูปของเรา', 'Our photos')]]).map(([v, e, l]) => `<button data-a="kidpix" data-g="${g}" data-v="${v}" aria-pressed="${pixMode(t, i, g) === v}">${e} ${l}</button>`).join('')}${pixMode(t, i, g) === 'photo' ? `<button data-a="${again}">🔀 ${L('รูปใหม่', 'New photo')}</button>` : ''}</div>` : '');
const newMatch = (t, kid) => { mg = { t: t.id, kid, cards: matchDeck(t), up: [], done: new Set(), moves: 0, won: false }; };
let cnt = null;   // counting game: {n, e, hit:[card indexes in the order tapped]}
const NUMW = { th: ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ'], en: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'] };
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
  spot: ['find', '#7FE3D2', '#24B39B'], stamp: ['stamp', '#8FB4FF', '#3F6FE0'], talk: ['talk', '#FFB0C8', '#F06A93'], memory: ['memory', '#FFD36B', '#F2A90C'], photos: ['photos', '#9CD9FF', '#3BA0E8'], mood: ['mood', '#FFC2A0', '#FF8A57'], hideseek: ['spy', '#FFD54A', '#E8A317'], jigsaw: ['jigsaw', '#A8E86A', '#2E9E4F'], bubbles: ['bubbles', '#5BB8FF', '#1E6FE8'], music: ['music', '#FF8FD8', '#7B3FE0'], _: ['', '#C9D3E6', '#8C9BB8'] };
const KBAR = { home: 'home', map: 'map', colour: 'colour', stamp: 'passport', stickers: 'stickers', trophies: 'trophies' };   // the bar's middle button: colour before the trip, the passport on it
function viewKid(p) {
  const ks = children(), kid = p[1], k = ks.find((c) => c.slug === kid);
  if (!k) {
    return `<div class="kidwrap pick enter"><h1>${L('ใครจะเล่น?', 'Who is playing?')}</h1><div class="kidpick">${ks.map((c) => `<button data-a="kidpick" data-v="${esc(c.slug)}">${kidArt(c.slug) ? `<img src="${kidArt(c.slug, true)}" alt="">` : `<span>${esc(c.emoji)}</span>`}<b>${esc(kidName(c.slug))}</b></button>`).join('')}</div>
<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button></div>`;
  }
  if (!kidTrip(kid)) return `<div class="kidwrap pick enter"><p class="empty">${L('ยังไม่มีเล่มของหนู', 'No book for you yet')}</p><button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button></div>`;   // never a page without the lock: a grown-up must be able to leave
  const t = kidTrip(kid);
  const pp = t.passport || {}, i = kidDayOf(t), d = t.days[i], pd = (pp.days || [])[i] || {}, g = pp.guides || [];
  const view = p[2] || 'home', name = kidName(kid), pre = preTrip(t), cd = pp.countdown, wild = ((t.info || {}).wild || []);
  const fill = (x) => String(x || '').replace(/\{name\}/g, name);
  const style = `--accent:${esc(pd.acc || t.theme.accent || '#1F3A5F')};--tint:${esc(pd.tint || '#F3F6FA')}`;
  const back = `<button class="kidback" data-a="kidnav" data-v="#/kid/${esc(kid)}" aria-label="${L('กลับ', 'Back')}">‹</button>`;
  const lock = `<button class="kidexit" id="kidexit" aria-label="${L('ผู้ใหญ่: กดค้างเพื่อออก', 'Grown-ups: press and hold to leave')}">🔒</button>`;
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
        kidTalk(t, i) ? [['talk', '💬', L('คุยกัน', 'Let’s talk')]] : [], !pre && i > 0 && memQuiz(t, i - 1) ? [['memory', '🧠', L('จำได้ไหม', 'Remember?')]] : [], kidPhotos(t, i).length ? [['photos', '📸', L('ดูรูป', 'Photos')]] : [], [['match', '🧩', L('จับคู่', 'Match')]], pre ? [] : [['mood', '😊', L('วันนี้รู้สึก', 'My mood')]],
        wild.length ? [['animals', (t.info.wildLabel || {}).emo || '🦘', t.info.wildLabel ? esc(T(t.info.wildLabel.short)) : L('สัตว์', 'Animals')]] : [], [['numbers', '🔢', L('นับเลข', 'Count')]], dayArt(t, i) || kidPhotoPool(t).length ? [['jigsaw', '🖼️', L('ต่อภาพ', 'Puzzle')]] : []).filter(Boolean);   // map, stickers and trophies live on the kid bar below — not twice
    const until = daysUntil(t);
    const btns = tiles.map(([v, e, lbl]) => { const k = KTILE[v] || KTILE._; return `<button class="pic" style="--k1:${k[1]};--k2:${k[2]}" data-a="kidnav" data-v="#/kid/${esc(kid)}/${v}" data-say="${esc(lbl)}">${k[0] ? `<img src="/art/kidui/${k[0]}.webp" alt="">` : `<span>${e}</span>`}<b>${lbl}</b></button>`; })
      .concat(story ? [`<button class="night" data-a="bedtime" data-v="${esc(story.id)}"><span>${emo('🌙')}</span><b>${L('นิทาน', 'Story')}</b></button>`] : [],
        heartsFor(kid).length && !fresh.length ? [`<button class="love" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(L('หัวใจจากญาติ', 'Hearts from the family'))}"><span>${emo('💗')}</span><b>${heartsFor(kid).length}</b></button>`] : []);
    const pages = []; for (let k = 0; k < btns.length; k += 4) pages.push(btns.slice(k, k + 4));
    body = `${fresh.length ? `<button class="kidhearts" data-a="kidnav" data-v="#/kid/${esc(kid)}/hearts" data-say="${esc(heartLine(fresh[0], kid))}"><span class="float" aria-hidden="true">💗</span><span class="e">${emo(fresh[0].emoji)}</span><b>${esc(L(`${fresh[0].from} ส่งหัวใจให้หนู!`, `${fresh[0].from} sent you a heart!`))}</b>${fresh.length > 1 ? `<small>+${fresh.length - 1}</small>` : ''}</button>` : ''}
${live === i && !ticked(t, `gift.d${i}`, kid) ? `<button class="kidgift" data-a="kidnav" data-v="#/kid/${esc(kid)}/gift" data-say="${esc(L('มีกล่องเซอร์ไพรส์มาให้! แตะเปิดเลย', 'A surprise box for you! Tap to open it'))}"><span class="box" aria-hidden="true">${emo('🎁')}</span><b>${L('<span class="nw">กล่องเซอร์ไพรส์</span><span class="nw">วันนี้!</span>', 'Today’s surprise box!')}</b><small>${L('แตะเปิดเลย', 'Tap to open')}</small></button>`
  : live === i && hourIn(t.timezone) >= 17 && !ticked(t, `stamp.d${i}`, kid) ? `<button class="kidnight" data-a="kidnav" data-v="#/kid/${esc(kid)}/stamp" data-say="${esc(L('ก่อนนอน มาปั๊มตราวันนี้กัน!', 'Before bed — let’s stamp today!'))}"><span class="moon" aria-hidden="true">${emo('🌙')}</span><b>${L('ปั๊มตราวันนี้ก่อนนอน!', 'Stamp today before bed!')}</b><small>🛂 ${L('ปั๊ก!', 'Thump!')}</small></button>` : ''}
<div class="kidhello">${kidArt(kid) ? `<button class="poke" data-a="kidpoke" data-k="${esc(kid)}" aria-label="${esc(name)}"><img src="${kidArt(kid, true)}" alt=""></button>` : ''}<p>${pre ? L(`<span class="nw">อีก <b>${until}</b> วัน</span> เราจะไป<span class="nw">${esc(T(t.title).split(' · ').pop())}กัน!</span>`, `<b>${until}</b> ${until === 1 ? 'sleep' : 'sleeps'} to ${esc(T(t.title).split(' · ')[0])}!`) : L(`<span class="nw">สวัสดี ${esc(name)}!</span> <span class="nw">วันนี้เล่นอะไรดี?</span>`, `Hello ${esc(name)}! What shall we play?`)}</p></div>
${stars(kid) ? `<div class="jarrow"><button class="starjar" data-a="kidjar" data-k="${esc(kid)}" aria-label="${L('โถดาว · ผู้ใหญ่กดค้างเพื่อล้าง', 'Star jar · grown-ups press and hold to empty')}">⭐ <b>${stars(kid)}</b></button>${pets(kid).length ? `<span class="pets" aria-label="${L('เพื่อน', 'Friends')}">${pets(kid).join('')}</span>` : ''}</div>` : ''}
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
    if (!jg || jg.key !== `${t.id}.${i}.${kid}`) newJigsaw(t, i, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${jg.done ? L('ต่อภาพเสร็จแล้ว! 🎉', 'Picture done! 🎉') : jg.pick === null ? L('ลากชิ้นไปใส่ช่องที่ใช่! (หรือแตะชิ้น แล้วแตะช่อง)', 'Drag a piece to its place! (or tap it, then tap the place)') : L('ใส่ตรงไหนดีนะ?', 'Where does it go?')}</p></div>
${pixPick(t, i, 'jigsaw', 'kidnewjig')}
<div class="jigboard" style="--art:url('${esc(jg.src)}');--c:${jg.cols};--ar:${jg.ar};--pa:${jg.ar * jg.rows / jg.cols}">${jg.slots.map((p, s) => `<button class="jslot${p !== null ? ' filled' : ''}" data-a="kidjslot" data-v="${s}"${p !== null ? ` style="${jgPos(p, jg)}"` : ''} aria-label="${L('ช่อง', 'Slot')} ${s + 1}"></button>`).join('')}</div>
<div class="jigtray" style="--art:url('${esc(jg.src)}');--pa:${jg.ar * jg.rows / jg.cols}">${jg.tray.map((p) => `<button class="jpiece${jg.pick === p ? ' pick' : ''}" data-a="kidjpick" data-v="${p}" style="${jgPos(p, jg)}" aria-label="${L('ชิ้น', 'Piece')} ${p + 1}"></button>`).join('')}</div>
${jg.done ? `<button class="kidbig" data-a="kidnewjig">🔁 ${L('ต่อใหม่', 'Again')}</button>` : ''}`;
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
    if (!mg || mg.t !== t.id || mg.kid !== kid) newMatch(t, kid);
    body = `<div class="kidguide">${guideImg(1)}<p>${mg.won ? L(`เก่งมาก! จับคู่ครบใน ${mg.moves} ครั้ง 🎉`, `Brilliant! All the pairs in ${mg.moves} goes 🎉`) : L('แตะเปิดการ์ดสองใบ หาคู่ที่เหมือนกัน!', 'Tap two cards — find the pairs!')}</p></div>
${pixPick(t, i, 'match', 'kidnewmatch')}
<div class="mgrid">${mg.cards.map((c, n) => `<button class="mcard${c.ph ? ' ph' : ''}${mg.up.includes(n) || mg.done.has(c.k) ? ' open' : ''}${mg.done.has(c.k) ? ' done' : ''}" data-a="kidflip" data-v="${n}" aria-label="${L('การ์ด', 'Card')} ${n + 1}"><span class="back">?</span><span class="face">${c.img ? `<img src="${esc(c.img)}" alt="">` : esc(c.e)}</span></button>`).join('')}</div>
<button class="kidbig ghost" data-a="kidnewmatch">🔁 ${L('เล่นใหม่', 'Play again')}</button>`;
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
  return `<div class="kidwrap${view === 'home' ? ' home' : ''}${kidEnter ? ' enter' : ''}" style="${style}">${head}${body}${lock}${bar}</div>`;
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
      if (mg.done.size * 2 === mg.cards.length) { mg.won = true; ls('match_' + mg.kid, (ls('match_' + mg.kid) || 0) + 1); celebrate(); star(mg.kid, 2); setTimeout(() => { render(); sayUi(L('เก่งมาก!', 'Brilliant!')); }, 350); }
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
  kidcolor(b) { beep('tap'); kidColour = b.dataset.v; $$('.palette button').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === kidColour)); },
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
      if (!jg.tray.length) { jg.done = true; beep('yay'); celebrate(['🖼️', '⭐', '✨']); star(kidNow(), 2); sayUi(L('ต่อภาพเสร็จแล้ว! เก่งมาก', 'Picture done! Brilliant')); }
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
  const spawn = () => {
    const f = $('#bubblefield'); if (!f) { clearInterval(bubT); return; }
    if (f.querySelectorAll('.bub').length > 9) return;
    const b = document.createElement('button'), sz = 52 + Math.random() * 64;
    b.className = 'bub'; b.setAttribute('aria-label', L('ฟอง', 'Bubble'));
    b.style.cssText = `left:${4 + Math.random() * 80}%;width:${sz}px;height:${sz}px;--t:${4.5 + Math.random() * 3}s;--hue:${Math.floor(Math.random() * 360)}`;
    if (Math.random() < 0.45) b.textContent = BUB_E[Math.floor(Math.random() * BUB_E.length)];
    b.addEventListener('animationend', () => b.remove());
    f.appendChild(b);
  };
  spawn(); bubT = setInterval(spawn, 700);
}
document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest && e.target.closest('.bub'); if (!b || b.classList.contains('pop')) return;
  e.preventDefault();
  b.classList.add('pop'); beep('bubble'); burst(b, [b.textContent || '💧', '✨']); setTimeout(() => b.remove(), 220);
  bubN++; const sc = $('#bubscore'); if (sc) sc.textContent = bubN;
  if (bubN % 15 === 0) { celebrate(['🫧', '⭐', '✨']); beep('yay'); star($('#bubblefield').dataset.k, 1); sayUi(L(`เย้! ${bubN} ฟองแล้ว!`, `Yay! ${bubN} bubbles!`)); }
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
  const cols = littleOf(t, kid) ? 2 : 3, rows = 2, n = cols * rows, photo = pixMode(t, i, 'jigsaw') === 'photo', src = (photo && randPhoto(t)) || dayArt(t, i);
  jg = { key: `${t.id}.${i}.${kid}`, cols, rows, src, ar: 1, slots: Array(n).fill(null), tray: Array.from({ length: n }, (_, k) => k).sort(() => Math.random() - 0.5), pick: null, done: false };
  if (photo && src) { const im = new Image(); im.onload = () => { if (jg && jg.src === src) { jg.ar = Math.min(1.5, Math.max(0.7, im.naturalWidth / im.naturalHeight)); render(); } }; im.src = src; }   // the board takes the photo's shape once known
}
const jgPos = (p, g) => `background-image:var(--art);background-size:${g.cols * 100}% ${g.rows * 100}%;background-position:${g.cols > 1 ? (p % g.cols) / (g.cols - 1) * 100 : 0}% ${g.rows > 1 ? Math.floor(p / g.cols) / (g.rows - 1) * 100 : 0}%`;
// ---- music: the xylophone's bars (C major) and two songs as bar numbers; a song lights each bar as it plays ----
const XYLO = [['C', 261.63, '#FF6B6B', '🐥'], ['D', 293.66, '#FFA94D', '🐸'], ['E', 329.63, '#FFD43B', '🐱'], ['F', 349.23, '#8CE99A', '🐶'], ['G', 392.00, '#66D9E8', '🐰'], ['A', 440.00, '#74C0FC', '🐼'], ['B', 493.88, '#B197FC', '🦊'], ['C', 523.25, '#F783AC', '🐨']];
const SONGS = [
  { th: 'ดาวน้อย', en: 'Twinkle', seq: [0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0] },
  { th: 'ลูกแกะน้อย', en: 'Little lamb', seq: [2, 1, 0, 1, 2, 2, 2, -1, 1, 1, 1, -1, 2, 4, 4] },
  { th: 'พายเรือ', en: 'Row your boat', seq: [0, 0, 0, 1, 2, -1, 2, 1, 2, 3, 4, -1, 7, 7, 7, 4, 4, 4, 2, 2, 2, 0, 0, 0, -1, 4, 3, 2, 1, 0] },
  { th: 'สะพานลอนดอน', en: 'London Bridge', seq: [4, 5, 4, 3, 2, 3, 4, -1, 1, 2, 3, -1, 2, 3, 4, -1, 4, 5, 4, 3, 2, 3, 4, -1, 1, 4, 2, 0] },
  { th: 'ลุงแมคโดนัลด์', en: 'Old MacDonald', seq: [0, 0, 0, 4, 5, 5, 4, -1, 2, 2, 1, 1, 0, -1, 0, 0, 0, 4, 5, 5, 4, -1, 2, 2, 1, 1, 0] },
  { th: 'จิงเกิลเบล', en: 'Jingle bells', seq: [2, 2, 2, -1, 2, 2, 2, -1, 2, 4, 0, 1, 2, -1, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 2, 1, -1, 4] },
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
