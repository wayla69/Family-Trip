'use strict';
/* ===== Memory Bookshelf · views (render functions return HTML strings) ===== */
const drafts = {};          // text being typed, survives re-renders and syncs
let quoteWho = 'mimi';

function curTrip() {
  const ts = trips(); if (!ts.length) return null;
  const live = ts.find((t) => dayNow(t) >= 0); if (live) return live;
  const today = todayIn('Asia/Bangkok');
  return ts.find((t) => t.date_from > today) || ts[ts.length - 1];
}

function render() {
  const app = $('#app');
  if (!S) { app.innerHTML = loginView(); document.documentElement.style.cssText = ''; return; }
  const r = route(), p = r.parts;
  let t = null, html;
  if (p[0] === 'cap') {   // deep link from the trip guide: #/cap?t=<trip>&d=<day>&key=<stop>
    const tid = mapLegacy(r.q.get('t')) || (curTrip() || {}).id, d = Math.max(0, (+r.q.get('d') || 0));
    history.replaceState(null, '', `#/t/${encodeURIComponent(tid)}/log/${d}`);
    return render();
  }
  if (p[0] === 't' && (t = trip(p[1]))) {
    if (p[2] === 'log') html = isEditor() ? viewLog(t, Math.min(t.days.length - 1, Math.max(0, +p[3] || 0))) : viewBook(t);
    else if (p[2] === 'firsts') html = viewFirsts(t);
    else html = viewBook(t);
  } else html = viewShelf();
  document.documentElement.style.cssText = t ? themeStyle(t) : themeStyle(curTrip());
  document.body.classList.toggle('serif', !!(t ? t.theme.display === 'serif' : false));
  document.documentElement.lang = lang;
  document.title = t ? `${T(t.title)} · Memory Bookshelf` : 'Memory Bookshelf';
  app.innerHTML = topBar(t, p) + `<main class="wrap">${offline ? `<div class="notice">${L('ออฟไลน์ — แสดงข้อมูลล่าสุดที่เก็บไว้ บันทึกได้ตามปกติ ระบบจะส่งขึ้นเองเมื่อมีสัญญาณ', 'Offline — showing the last saved copy. You can keep recording; it uploads when you are back online.')}</div>` : ''}${html}</main>` + tabBar(t, p);
  renderProgress();
}
const mapLegacy = (id) => { const t = trips().find((x) => x.id === id || x.legacy_id === id); return t && t.id; };

function topBar(t, p) {
  const back = t ? `<a class="ibtn" href="#/" aria-label="${L('ชั้นหนังสือ', 'Bookshelf')}">‹</a>` : '';
  const ttl = t ? `<small>${esc(t.theme.kicker || '')}</small>${esc(T(t.title))}` : `<small>${L('ของมีมี่และมีก้า', 'Mimi & Mika')}</small>Memory Bookshelf`;
  return `<header class="top"><div class="in">${back}<div class="ttl">${ttl}</div>
<span class="progress" id="prog"></span>
<div class="seg" role="group" aria-label="language"><button data-a="lang" data-v="th" aria-pressed="${lang === 'th'}">ไทย</button><button data-a="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button></div></div></header>`;
}
function tabBar(t, p) {
  const c = t || curTrip(); if (!c) return '';
  const dn = Math.max(0, dayNow(c));
  const cur = (k) => ((k === 'shelf' && !t) || (k === 'book' && t && !p[2]) || (k === 'log' && p[2] === 'log') || (k === 'firsts' && p[2] === 'firsts') ? ' aria-current="page"' : '');
  return `<nav class="bar"><div class="in">
<a href="#/"${cur('shelf')}><i>📚</i>${L('ชั้นหนังสือ', 'Shelf')}</a>
<a href="#/t/${esc(c.id)}"${cur('book')}><i>📖</i>${L('สมุด', 'Book')}</a>
${isEditor() ? `<a href="#/t/${esc(c.id)}/log/${dn}"${cur('log')}><i>✏️</i>${L('บันทึก', 'Record')}</a>` : ''}
<a href="#/t/${esc(c.id)}/firsts"${cur('firsts')}><i>🌟</i>${L('ครั้งแรก', 'Firsts')}</a>
</div></nav>`;
}
function renderProgress() {
  const el = $('#prog'); if (!el) return;
  const pend = queue.length;
  el.textContent = progress ? L(`กำลังอัปโหลด ${Math.min(progress.done + 1, progress.total)}/${progress.total}`, `Uploading ${Math.min(progress.done + 1, progress.total)}/${progress.total}`)
    : pend ? L(`รอส่ง ${pend}`, `${pend} waiting`) : '';
}

/* ---------- login ---------- */
// PIN login: one field + a big number pad; "who's this?" is optional and remembered on the device
function loginView() {
  const who = ls('name') || '';
  const chips = [['พ่อ', 'Dad'], ['แม่', 'Mum']].map(([th, en]) => { const v = L(th, en); return `<button type="button" class="chip" data-a="who-login" data-v="${esc(v)}" aria-pressed="${who === v}">${esc(v)}</button>`; }).join('');
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'];
  return `<div class="login"><form id="lf" autocomplete="on">
<div class="kicker">${L('สมุดครอบครัว · ส่วนตัว', 'Private family book')}</div>
<h1>Memory<br>Bookshelf</h1><p class="muted">${L('ความทรงจำของมีมี่และมีก้า ทุกทริป', "Mimi & Mika's memories, every trip")}</p>
<label for="lcode">${L('PIN ครอบครัว', 'Family PIN')}</label>
<input id="lcode" class="field pin" type="password" inputmode="numeric" autocomplete="current-password" required aria-describedby="lerr">
<div class="pinpad" role="group" aria-label="${L('แป้นตัวเลข', 'Number pad')}">${keys.map((k) => `<button type="button" data-a="pin" data-v="${k}"${k === 'clear' ? ` aria-label="${L('ล้าง', 'Clear')}"` : k === 'back' ? ` aria-label="${L('ลบ', 'Delete')}"` : ''}>${k === 'clear' ? 'C' : k === 'back' ? '⌫' : k}</button>`).join('')}</div>
<label>${L('ใครใช้เครื่องนี้ (ไม่บังคับ)', 'Who is this? (optional)')}</label>
<div class="row">${chips}<input id="lname" class="field" style="flex:1;min-width:110px" value="${esc(who)}" placeholder="${L('ชื่ออื่น', 'Other name')}" maxlength="24"></div>
<div class="row" style="margin-top:16px"><button class="btn" type="submit">${L('เข้าสมุด', 'Open the shelf')}</button>
<span class="seg"><button type="button" data-a="lang" data-v="th" aria-pressed="${lang === 'th'}">ไทย</button><button type="button" data-a="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button></span></div>
<div class="err" id="lerr" role="alert"></div>
<p class="label" style="margin-top:6px">${L('ใส่ PIN ครั้งเดียว เครื่องนี้จะจำไว้', 'Enter the PIN once — this phone remembers it')}</p></form></div>`;
}

/* ---------- shelf ---------- */
function viewShelf() {
  const books = trips().map((t) => {
    const st = stats(t), earned = stampEarned(t);
    return `<a class="spine${t.theme.display === 'serif' ? ' serif' : ''}" href="#/t/${esc(t.id)}" style="${themeStyle(t)}">
<div class="kicker">${esc(t.theme.kicker || T(t.sub))}</div>
<span class="badge">${stampHtml(t, true)}</span>
<h2>${esc(T(t.title).split(' · ')[0])}</h2><div class="sub-it">${esc(T(t.sub))}</div>
<div class="meta"><span>${esc(fmtRange(t))}</span><span>📷 ${st.photos} · 💬 ${st.quotes}${earned ? '' : ''}</span></div></a>`;
  }).join('');
  const add = isEditor() ? `<button class="spine add" data-a="newtrip"><span><b style="font-size:32px;display:block">＋</b>${L('เล่มใหม่', 'New book')}</span></button>` : '';
  return `<div class="part">${L('ชั้นหนังสือ', 'The bookshelf')}</div><h1 class="h2">${L('ทุกทริปของมีมี่และมีก้า', "Every trip, one book each")}</h1>
<p class="lede">${L('แต่ละทริปคือหนึ่งเล่ม เปิดอ่านได้ทั้งตอนเที่ยวและอีกหลายปีข้างหน้า', 'Each trip is a book — to fill in on the road and reread for years.')}</p>
<div class="shelf">${books}${add}</div>`;
}
function stampHtml(t, small) {
  const earned = stampEarned(t), txt = (t.stamp && t.stamp.text) || [T(t.title)];
  return `<div class="stamp${earned ? '' : ' pending'}${small ? ' s' : ''}" title="${earned ? L('ได้ตราประทับแล้ว', 'Stamp earned') : L('ตราประทับจะได้เมื่อกด Done ครบทุกวัน หรือเมื่อจบทริป', 'Earned when every day is Done or the trip is over')}">
<div>${esc(txt[0] || '')}<b>${esc(t.theme.badge || '📖')}</b>${esc(txt[1] || '')}<br>${esc(txt[2] || '')}</div></div>`;
}

/* ---------- book ---------- */
function viewBook(t) {
  const st = stats(t), kids = (t.theme.children || []);
  const ages = kids.map((k) => `${kidName(k.slug)} ${k.age ? T(k.age) : ''}`.trim()).join(' · ');
  const days = t.days.map((d, i) => i).filter((i) => dayHasContent(t, i));
  const favs = favouritesHtml(t), firsts = entriesOf(t.id).filter((e) => e.kind === 'first');
  const story = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === null);
  const edit = isEditor();
  return `<section class="cover">
<div class="kicker">${esc(t.theme.kicker || '')}</div>
${stampHtml(t)}
<h1>${esc(T(t.title).split(' · ')[0])}</h1>
<div class="sub-it">${esc(T(t.sub))}</div>
<p class="line">${esc(fmtRange(t))}${ages ? ' · ' + esc(ages) : ''}</p>
<div class="facts">
<div class="fact"><span class="label">${L('รูป', 'Photos')}</span><b>${st.photos}</b></div>
<div class="fact"><span class="label">${L('คำพูด', 'Quotes')}</span><b>${st.quotes}</b></div>
<div class="fact"><span class="label">${L('ครั้งแรก', 'Firsts')}</span><b>${st.firsts}</b></div>
<div class="fact"><span class="label">${L('ที่ไป', 'Places')}</span><b>${st.places}</b></div>
</div></section>
${days.length ? `<div class="part">${L('สารบัญ', 'Contents')}</div><nav class="toc">${days.map((i) => `<a href="#d${i}" data-a="jump" data-v="${i}"><span>${String(i + 1).padStart(2, '0')}</span><span>${esc(T(t.days[i].title))}</span></a>`).join('')}</nav>` : ''}
${favs ? `<div class="part">${L('ช่วงเวลาที่ชอบที่สุด', 'Favourite moments')} ⭐</div>${favs}` : ''}
${firsts.length ? `<div class="part">${L('ครั้งแรกของหนู', 'Firsts')}</div><div class="firsts">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="first got"><span class="e">${esc(f.e)}</span><span class="t">${esc(e.first_key === 'custom' ? e.text : f.t)}<br><small class="muted">${L('วันที่', 'Day')} ${e.day + 1}</small></span><span class="kids">${kidBadge(e.child)}</span></div>`; }).join('')}</div>` : ''}
${isEditor() && S.features.story && days.length ? storyBlock(t, null)
    : story ? `<div class="part">${L('นิทานของทั้งทริป', 'The story of the trip')}</div><div class="call calm" style="white-space:pre-line">${esc(story.text)}</div>` : ''}
${days.map((i) => dayPage(t, i)).join('') || `<div class="empty">${L('ยังไม่มีบันทึก — ', 'Nothing recorded yet — ')}${edit ? `<a href="#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}">${L('เริ่มบันทึกวันแรก', 'start with a day')}</a>` : L('รอพ่อแม่บันทึกระหว่างทริป', 'the grown-ups will fill it in during the trip')}</div>`}
<div class="row noprint" style="margin:28px 0 8px"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">⬇ ${L('ดาวน์โหลด PDF (A4)', 'Download PDF (A4)')}</a><button class="btn ghost small" data-a="print">🖨️ ${L('พิมพ์', 'Print')}</button><button class="btn ghost small" data-a="copytext">📋 ${L('คัดลอกเป็นข้อความ', 'Copy as text')}</button></div>`;
}
function favouritesHtml(t) {
  const ph = mediaOf(t.id).filter((m) => m.highlight), qs = entriesOf(t.id).filter((e) => e.kind === 'quote' && e.highlight);
  if (!ph.length && !qs.length) return '';
  return (ph.length ? `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : '') + qs.map((e) => quoteCall(e, true)).join('');
}
function photoBtn(t, m) {
  return `<button data-a="lb" data-v="${esc(m.id)}" data-t="${esc(t.id)}" aria-label="${esc(m.caption || L('รูป', 'Photo'))}"><img loading="lazy" src="${esc(imgT(m))}" alt="">${m.highlight ? '<span class="star">⭐</span>' : ''}${m.caption ? `<span class="cap">${esc(m.caption)}</span>` : ''}${m.pending ? '<span class="cap">⏳</span>' : ''}</button>`;
}
function quoteCall(e, pick) {
  return `<div class="call ${pick ? 'pick' : 'info'}"><div class="who">${kidBadge(e.child)}${esc(kidName(e.child))}${e.pending ? ' <span class="tag">⏳</span>' : ''}</div>${pick ? `<span class="lbl">${L('คำพูดที่ชอบ', 'Favourite words')}</span>` : ''}<q>${esc(e.text)}</q></div>`;
}
function dayPage(t, i) {
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i), pl = placesOf(t.id, i);
  const moods = es.filter((e) => e.kind === 'mood' && e.mood);
  const fav = es.find((e) => e.kind === 'fav'), note = es.find((e) => e.kind === 'note'), story = es.find((e) => e.kind === 'story');
  const visited = new Set(pl.map((p) => p.key));
  const planned = (d.planned || []).filter((p) => p.kind !== 'food');
  const extra = pl.filter((p) => p.kind !== 'food' && !planned.some((x) => x.key === p.key));
  const route = planned.concat(extra.map((p) => ({ key: p.key, en: p.name.en, th: p.name.th })));
  const timeline = [
    ...es.filter((e) => e.kind === 'quote').map((e) => ({ at: e.at, h: quoteCall(e, e.highlight) })),
    ...pl.map((p) => ({ at: p.at, h: `<span>${p.kind === 'food' ? '🍽️' : '📍'} ${esc(T(p.name))}</span>` })),
    ...es.filter((e) => e.kind === 'first').map((e) => { const f = firstLabel(t, e.first_key); return { at: e.at, h: `<span>${esc(f.e)} ${L('ครั้งแรก', 'First')}: ${esc(e.first_key === 'custom' ? e.text : f.t)} · ${esc(kidName(e.child))}</span>` }; }),
  ].sort((a, b) => a.at - b.at);
  const food = pl.filter((p) => p.kind === 'food'), firsts = es.filter((e) => e.kind === 'first');
  return `<article class="day" id="d${i}">
<div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div>
<div class="moods">${moods.map((m) => `<span class="pill">${kidEmoji(m.child)} ${esc(m.mood)}</span>`).join('')}</div>
<h3 style="grid-column:2/4">${esc(d.emoji)} ${esc(T(d.title))}</h3>
<div class="meta" style="grid-column:2/4">${d.sleep ? `<b>${L('นอนที่', 'Sleep')}</b> ${esc(T(d.sleep))}` : ''}${d.wx ? ` · ${esc(T(d.wx))}` : ''}</div></div>
<div class="body">
${route.length ? `<aside class="route"><span class="label">${L('ที่ไปวันนี้', 'Getting around')}</span><ol>${route.map((p) => `<li class="${visited.has(p.key) ? 'done' : ''}"><b>${esc(T(p))}</b>${visited.has(p.key) ? `<small>${L('ไปแล้ว', 'visited')} ✓</small>` : ''}</li>`).join('')}</ol></aside>` : '<div></div>'}
<div>
${ph.length ? `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : ''}
${timeline.length ? `<ol class="tl">${timeline.map((x) => `<li><time>${esc(fmtTime(x.at, t.timezone))}</time><div>${x.h}</div></li>`).join('')}</ol>` : ''}
${note ? `<div class="call calm"><span class="lbl">${L('บันทึกพ่อแม่', "Parents' note")}</span>${esc(note.text)}</div>` : ''}
${story ? `<div class="call pick" style="white-space:pre-line"><span class="lbl">${L('นิทานก่อนนอน', 'Bedtime story')}</span>${esc(story.text)}</div>` : ''}
</div></div>
${food.length || fav || firsts.length ? `<div class="foot3">
${food.length ? `<div><h4>${L('กินอะไร', 'Where we ate')}</h4><ul>${food.map((p) => `<li>${esc(T(p.name))}</li>`).join('')}</ul></div>` : ''}
${fav ? `<div><h4>${L('ของโปรดวันนี้', 'Favourite today')}</h4><p>${esc(fav.text)}</p></div>` : ''}
${firsts.length ? `<div><h4>${L('ครั้งแรกวันนี้', 'First today')}</h4><ul>${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<li>${esc(f.e)} ${esc(e.first_key === 'custom' ? e.text : f.t)} — ${esc(kidName(e.child))}</li>`; }).join('')}</ul></div>` : ''}
</div>` : ''}
${isEditor() ? `<p class="noprint" style="margin-top:10px"><a class="btn ghost small" href="#/t/${esc(t.id)}/log/${i}">✏️ ${L('แก้ไขวันนี้', 'Edit this day')}</a></p>` : ''}
</article>`;
}

/* ---------- bedtime story by Claude (editors, only when pressed) ---------- */
function storyBlock(t, day) {
  const st = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === day);
  const can = isEditor() && S.features.story;
  if (!st && !can) return '';
  const whole = day === null, dv = whole ? '' : day;
  return `<section class="blk${st ? '' : ' noprint'}" id="storyblk"><h3>✨ ${whole ? L('นิทานของทั้งทริป', 'The story of the whole trip') : L('นิทานก่อนนอนของวันนี้', "Tonight's bedtime story")}</h3>
${st ? `<div class="call calm" id="storytext" style="white-space:pre-line">${esc(st.text)}</div>` : `<div class="call calm" id="storytext" style="white-space:pre-line" hidden></div>`}
${can ? `<div class="row noprint" style="margin-top:8px">
<button class="btn small" data-a="story" data-t="${esc(t.id)}" data-d="${dv}" id="storygo">✨ ${st ? L('แต่งใหม่', 'Write again') : L('ให้ Claude แต่งนิทาน', 'Ask Claude for a story')}</button>
<button class="btn ghost small" data-a="storystop" id="storystop" hidden>■ ${L('หยุด', 'Stop')}</button>
${st ? `<button class="mini" data-a="delentry" data-v="${esc(st.id)}">${L('ลบนิทาน', 'Delete story')}</button>` : ''}
<span class="label">${L('ส่งเฉพาะข้อความที่บันทึกไว้ ไม่ส่งรูป', 'Sends only the written notes — never photos')}</span></div>` : ''}</section>`;
}

/* ---------- firsts page (everyone) ---------- */
function viewFirsts(t) {
  const got = entriesOf(t.id).filter((e) => e.kind === 'first');
  const cat = t.firsts.map((f) => {
    const who = got.filter((e) => e.first_key === f.key).map((e) => e.child);
    return `<div class="first${who.length ? ' got' : ''}"><span class="e">${esc(f.emoji)}</span><span class="t">${esc(T(f.label))}</span><span class="kids">${['mimi', 'mika'].map((k) => kidBadge(k, !who.includes(k))).join('')}</span></div>`;
  }).join('');
  const custom = got.filter((e) => e.first_key === 'custom').map((e) => `<div class="first got"><span class="e">⭐</span><span class="t">${esc(e.text)}</span><span class="kids">${kidBadge(e.child)}</span></div>`).join('');
  return `<div class="part">${esc(T(t.title))}</div><h1 class="h2">${L('ครั้งแรกของมีมี่และมีก้า', "Mimi & Mika's firsts")}</h1>
<p class="lede">${L('ติ๊กได้ในหน้า "บันทึก" ของแต่ละวัน', 'Tick them on each day’s Record page')}</p>
<div class="firsts" style="margin-top:14px">${cat}${custom}</div>${!cat && !custom ? `<div class="empty">${L('ทริปนี้ยังไม่มีรายการครั้งแรก', 'No firsts list for this trip yet')}</div>` : ''}`;
}

/* ---------- record a day (editors) ---------- */
function viewLog(t, i) {
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i), now = dayNow(t);
  const dk = `${t.id}:${i}`;
  const strip = t.days.map((x, j) => {
    const n = entriesOf(t.id, j).length + mediaOf(t.id, j).length;
    return `<a href="#/t/${esc(t.id)}/log/${j}" aria-current="${j === i}">${j === now ? `<span class="today">${L('วันนี้', 'Today')}</span>` : ''}<b>${String(j + 1).padStart(2, '0')}</b><small>${esc(fmtDay(x.date, { day: 'numeric', month: 'short' }))}${n ? ` · ${n}` : ''}</small></a>`;
  }).join('');
  const quotes = es.filter((e) => e.kind === 'quote');
  const mood = (k) => (es.find((e) => e.kind === 'mood' && e.child === k) || {}).mood;
  const fav = es.find((e) => e.kind === 'fav'), note = es.find((e) => e.kind === 'note');
  const visited = new Set(placesOf(t.id, i).map((p) => p.key));
  const gotFirst = (key, k) => es.some((e) => e.kind === 'first' && e.first_key === key && e.child === k) || entriesOf(t.id).some((e) => e.kind === 'first' && e.first_key === key && e.child === k);
  const kids = children().map((c) => c.slug);
  return `<div class="daystrip" role="tablist">${strip}</div>
<div class="day" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div><div></div>
<h3 style="grid-column:2/4">${esc(d.emoji)} ${esc(T(d.title))}</h3></div></div>

<section class="blk"><h3>📷 ${L('รูป', 'Photos')} <span class="label">${ph.length}</span></h3>
<div class="row"><label class="btn"><input id="fpick" type="file" accept="image/*" multiple hidden data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่มรูป', 'Add photos')}</label><span class="progress" id="prog2"></span></div>
${ph.length ? `<div class="mosaic" style="margin-top:10px">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : ''}</section>

<section class="blk"><h3>💬 ${L('คำพูดน่ารัก', 'Things they said')}</h3>
<div class="row" role="group">${kids.concat('both').map((k) => `<button class="chip" data-a="who" data-v="${k}" aria-pressed="${quoteWho === k}">${kidEmoji(k)} ${esc(kidName(k))}</button>`).join('')}</div>
<textarea id="qtext" class="field" data-draft="q:${esc(dk)}" placeholder="${L('“หนูอยากเป็นปลา…”', '“I want to be a fish…”')}" style="margin-top:8px">${esc(drafts['q:' + dk] || '')}</textarea>
<div class="row end" style="margin-top:6px"><button class="btn small" data-a="savequote" data-t="${esc(t.id)}" data-d="${i}">${L('บันทึกคำพูด', 'Save quote')}</button></div>
${quotes.length ? `<ul class="items">${quotes.map((e) => `<li><div class="grow">${quoteCall(e, false)}</div><button class="mini${e.highlight ? ' on' : ''}" data-a="hiq" data-v="${esc(e.id)}" aria-pressed="${!!e.highlight}" title="⭐">${e.highlight ? '⭐' : '☆'}</button><button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></li>`).join('')}</ul>` : ''}</section>

<section class="blk"><h3>🙂 ${L('อารมณ์วันนี้', 'Mood today')} <span class="label">${L('แตะซ้ำเพื่อล้าง', 'tap again to clear')}</span></h3>
${kids.map((k) => `<div class="moodrow">${kidBadge(k)}<div class="opts">${(t.moods.length ? t.moods : ['😄', '🥰', '🤩', '😋', '😴', '😢']).map((m) => `<button data-a="mood" data-k="${k}" data-v="${esc(m)}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${mood(k) === m}" aria-label="${esc(kidName(k))} ${esc(m)}">${esc(m)}</button>`).join('')}</div></div>`).join('')}</section>

<section class="blk"><h3>💖 ${L('ของโปรดวันนี้', 'Favourite thing today')}</h3>
<input id="favtext" class="field" data-a-blur="fav" data-t="${esc(t.id)}" data-d="${i}" data-draft="f:${esc(dk)}" value="${esc(drafts['f:' + dk] ?? (fav ? fav.text : ''))}" placeholder="${L('เช่น ไอติมมะม่วง', 'e.g. mango ice cream')}"></section>

<section class="blk"><h3>📝 ${L('บันทึกพ่อแม่', "Parents' note")}</h3>
<textarea id="notetext" class="field" data-a-blur="note" data-t="${esc(t.id)}" data-d="${i}" data-draft="n:${esc(dk)}" placeholder="${L('บันทึกเมื่อแตะออกจากช่อง · เว้นว่าง = ลบ', 'Saved when you leave the box · empty = delete')}">${esc(drafts['n:' + dk] ?? (note ? note.text : ''))}</textarea></section>

<section class="blk"><h3>🌟 ${L('ครั้งแรก', 'Firsts')} <span class="label">${L('แตะรูปเด็กเพื่อติ๊ก', 'tap a child to tick')}</span></h3>
<div class="firsts">${t.firsts.map((f) => `<div class="first"><span class="e">${esc(f.emoji)}</span><span class="t">${esc(T(f.label))}</span><span class="kids">${kids.map((k) => `<button data-a="first" data-v="${esc(f.key)}" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${gotFirst(f.key, k)}" aria-label="${esc(kidName(k))}: ${esc(T(f.label))}">${kidBadge(k, !gotFirst(f.key, k))}</button>`).join('')}</span></div>`).join('')}</div>
${es.filter((e) => e.kind === 'first' && e.first_key === 'custom').map((e) => `<div class="first got" style="margin-top:8px"><span class="e">⭐</span><span class="t">${esc(e.text)}</span>${kidBadge(e.child)}<button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></div>`).join('')}
<div class="row" style="margin-top:8px"><input id="firsttext" class="field" style="flex:1;min-width:160px" data-draft="c:${esc(dk)}" value="${esc(drafts['c:' + dk] || '')}" placeholder="${L('ครั้งแรกอื่นๆ เช่น ใส่รองเท้าเอง', 'Another first, e.g. shoes on by herself')}">
${kids.map((k) => `<button class="btn ghost small" data-a="customfirst" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}">＋ ${kidEmoji(k)}</button>`).join('')}</div></section>

${(d.planned || []).length ? `<section class="blk"><h3>📍 ${L('เช็คอินที่ไป & มื้ออาหาร', 'Check in: places & meals')}</h3>
${d.planned.map((p) => `<div class="check"><button data-a="place" data-v="${esc(p.key)}" data-k="${esc(p.kind || 'place')}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${visited.has(p.key)}" aria-label="${esc(T(p))}">${visited.has(p.key) ? '✓' : ''}</button><span class="grow">${p.kind === 'food' ? '🍽️ ' : ''}${esc(T(p))}${p.meal ? ` <small>· ${esc(p.meal)}</small>` : ''}</span></div>`).join('')}</section>` : ''}

${storyBlock(t, i)}

<section class="blk"><div class="row"><button class="btn${d.done_at ? ' ghost' : ''}" data-a="done" data-t="${esc(t.id)}" data-d="${i}">${d.done_at ? '✓ ' + L('วันนี้เสร็จแล้ว (แตะเพื่อยกเลิก)', 'Day done (tap to undo)') : L('จบวันนี้ ✓', 'Mark day done ✓')}</button>
<a class="btn ghost" href="#/t/${esc(t.id)}">📖 ${L('ดูในสมุด', 'See it in the book')}</a></div></section>`;
}
