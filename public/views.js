'use strict';
/* ===== Memory Bookshelf · views (render functions return HTML strings) ===== */
const drafts = {};          // text being typed, survives re-renders and syncs
let quoteWho = 'mimi';
let lastView = null;

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
  // kid mode is "locked": while it is on, every route leads back to it (a grown-up holds the lock to leave)
  const km = isEditor() && ls('kidmode');
  if (km && p[0] !== 'kid') { location.replace('#/kid' + (km !== 'pick' ? '/' + km : '')); return; }
  document.body.classList.toggle('kidmode', !!(p[0] === 'kid' && isEditor()));
  if (p[0] === 'kid' && isEditor()) {
    const kt = kidTrip(p[1]) || curTrip();
    document.documentElement.style.cssText = themeStyle(kt); document.documentElement.lang = lang;
    const key = p.slice(0, 3).join('/'), enter = key !== lastView; lastView = key; kidEnter = enter;
    app.innerHTML = `<main class="kidmain${enter ? ' enter' : ''}">${viewKid(p)}</main>`;
    hydrateColours(app); hydrateDraw(app); hydrateMap(app);
    return;
  }
  if (p[0] === 'cap') {   // deep link from the trip guide: #/cap?t=<trip>&d=<day>&key=<stop>
    const tid = mapLegacy(r.q.get('t')) || (curTrip() || {}).id, d = Math.max(0, (+r.q.get('d') || 0));
    history.replaceState(null, '', `#/t/${encodeURIComponent(tid)}/log/${d}`);
    return render();
  }
  if (p[0] === 't' && (t = trip(p[1]))) {
    if (p[2] === 'log') html = isEditor() ? viewLog(t, Math.min(t.days.length - 1, Math.max(0, +p[3] || 0))) : viewBook(t);
    else if (p[2] === 'firsts') html = viewFirsts(t);
    else html = viewBook(t);
  } else if (p[0] === 'passport') html = viewPassport(p[1], p[2]);
  else if (p[0] === 'notebook') html = viewNotebook();
  else html = viewShelf();
  document.documentElement.style.cssText = t ? themeStyle(t) : themeStyle(curTrip());
  document.body.classList.toggle('serif', !!(t ? t.theme.display === 'serif' : false));
  document.documentElement.lang = lang;
  document.title = t ? `${T(t.title)} · Memory Bookshelf` : 'Memory Bookshelf';
  const key = p.slice(0, 3).join('/'), enter = key !== lastView; lastView = key;   // animate only when the page changes, not on every save
  app.innerHTML = topBar(t, p) + `<main class="wrap${enter ? ' enter' : ''}">${offline ? `<div class="notice">${L('ออฟไลน์ — แสดงข้อมูลล่าสุดที่เก็บไว้ บันทึกได้ตามปกติ ระบบจะส่งขึ้นเองเมื่อมีสัญญาณ', 'Offline — showing the last saved copy. You can keep recording; it uploads when you are back online.')}${S.syncedAt ? ` <small>· ${L('ข้อมูลล่าสุดเมื่อ', 'last synced')} ${esc(new Date(S.syncedAt).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</small>` : ''}</div>` : ''}${html}</main>` + tabBar(t, p);
  renderProgress();
  if (typeof hydrateColours === 'function') hydrateColours(app);   // kid.js loads after this file
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
  const cur = (k) => ((k === 'shelf' && !t && p[0] !== 'passport') || (k === 'book' && t && !p[2]) || (k === 'log' && p[2] === 'log') || (k === 'firsts' && p[2] === 'firsts') || (k === 'passport' && p[0] === 'passport') ? ' aria-current="page"' : '');
  return `<nav class="bar"><div class="in">
<a href="#/"${cur('shelf')}><i>📚</i>${L('ชั้นหนังสือ', 'Shelf')}</a>
<a href="#/t/${esc(c.id)}"${cur('book')}><i>📖</i>${L('สมุด', 'Book')}</a>
${isEditor() ? `<a href="#/t/${esc(c.id)}/log/${dn}"${cur('log')}><i>✏️</i>${L('บันทึก', 'Record')}</a>` : ''}
<a href="#/t/${esc(c.id)}/firsts"${cur('firsts')}><i>🌟</i>${L('ครั้งแรก', 'Firsts')}</a>
<a href="#/passport"${cur('passport')}><i>🛂</i>${L('พาสปอร์ต', 'Passport')}</a>
</div></nav>`;
}
function renderProgress() {
  const el = $('#prog'); if (!el) return;
  const pend = queue.length;
  el.textContent = packing ? L(`เก็บไว้ในเครื่อง ${packing.done}/${packing.total}`, `Storing ${packing.done}/${packing.total}`) : progress ? L(`กำลังอัปโหลด ${Math.min(progress.done + 1, progress.total)}/${progress.total}`, `Uploading ${Math.min(progress.done + 1, progress.total)}/${progress.total}`)
    : pend ? L(`รอส่ง ${pend}`, `${pend} waiting`) : '';
}

/* ---------- login ---------- */
// PIN login: one field + a big number pad; "who's this?" is optional and remembered on the device
function loginView() {
  const who = ls('name') || '';
  const chips = [['พ่อ', 'Dad'], ['แม่', 'Mum']].map(([th, en]) => { const v = L(th, en); return `<button type="button" class="chip" data-a="who-login" data-v="${esc(v)}" aria-pressed="${who === v}">${esc(v)}</button>`; }).join('');
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'];
  return `<div class="login"><form id="lf" autocomplete="on">
<div class="loginart" aria-hidden="true">${['/art/hk/day-2.svg', '/art/day-4.svg', '/art/day-13.svg'].map((a, i) => `<img class="art f${i}" src="${a}" alt="">`).join('')}${castHtml(KID_ART)}</div>
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
    const st = stats(t), n = t.days.length, got = t.days.filter((_, i) => dayStamped(t, i)).length;
    const ph = mediaOf(t.id).filter((m) => m.highlight).concat(mediaOf(t.id).filter((m) => !m.highlight)).slice(0, 3);
    const visual = ph.length
      ? `<div class="polas">${ph.map((m) => `<img loading="lazy" src="${esc(imgT(m))}" alt="">`).join('')}</div>`
      : `<div class="arts">${t.days.slice(0, 6).map((d, i) => artImg(t, i)).join('')}</div>`;
    return `<a class="spine${t.theme.display === 'serif' ? ' serif' : ''}" href="#/t/${esc(t.id)}" style="${themeStyle(t)}">
<div class="kicker">${esc(t.theme.kicker || T(t.sub))}</div>
<span class="badge">${stampHtml(t, true)}</span>
<h2>${esc(T(t.title).split(' · ')[0])}</h2><div class="sub-it">${esc(T(t.sub))}</div>
${visual}
<div class="meta"><span>${flagsOf(t)} ${esc(fmtRange(t))}</span><span>📷 ${st.photos} · 💬 ${st.quotes}</span></div>
<div class="prog" title="${L('ตราประทับ', 'Stamps')} ${got}/${n}"><i style="width:${n ? Math.round((got / n) * 100) : 0}%"></i></div></a>`;
  }).join('');
  const add = isEditor() ? `<button class="spine add" data-a="newtrip"><span><b style="font-size:32px;display:block">＋</b>${L('เล่มใหม่', 'New book')}</span></button>` : '';
  return `${heroHtml()}<div class="part">${L('ชั้นหนังสือ', 'The bookshelf')}</div><h1 class="h2">${L('ทุกทริปของมีมี่และมีก้า', 'Every trip, one book each')}</h1>
<p class="lede">${L('แต่ละทริปคือหนึ่งเล่ม เปิดอ่านได้ทั้งตอนเที่ยวและอีกหลายปีข้างหน้า', 'Each trip is a book — to fill in on the road and reread for years.')}</p>
<div class="shelf">${books}${add}</div>
<div class="part">${L('พาสปอร์ตของเด็กๆ', 'The kids’ passports')} 🛂</div>
<a class="nbcard" href="#/notebook"><span class="emb">📓</span><div><b>${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</b><small>${S.reviews.length ? L(`${S.reviews.length} รีวิว · ที่พัก ร้านอาหาร สถานที่ — ไว้วางแผนทริปหน้า`, `${S.reviews.length} reviews · stays, food, places — for planning the next trip`) : L('ให้ดาว ติดแท็ก จดว่าอะไรเวิร์กกับครอบครัวเรา — ไว้วางแผนทริปหน้า', 'Stars, tags and notes on what worked for our family — for planning the next trip')}</small></div><span class="arrow">›</span></a>
<div class="ppmini">${children().map((k) => { const n = passportStamps(k.slug); return `<a class="ppc s kid-${esc(k.slug)}" href="#/passport/${esc(k.slug)}"><span class="emb">${kidArt(k.slug) ? `<img src="${kidArt(k.slug)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตความทรงจำ', 'Memory Passport')}</b><span class="nm">${esc(kidName(k.slug))}</span><small>${n} ${L('ตราประทับ', n === 1 ? 'stamp' : 'stamps')}</small></a>`; }).join('')}</div>`;
}
const artImg = (t, i, cls) => { const a = dayArt(t, i); return a ? `<img class="art${cls ? ' ' + cls : ''}" src="${esc(a)}" alt="" loading="lazy">` : `<span class="art emo${cls ? ' ' + cls : ''}">${esc(t.days[i].emoji || '📍')}</span>`; };
// the kids standing together, as drawn characters (Mimi pulls her wagon, as in the photo)
const castHtml = (slugs) => { const ks = slugs.filter((k) => kidArt(k)); return ks.length ? `<div class="cast" aria-hidden="true">${ks.map((k) => `<img class="who ${esc(k)}" src="${kidArt(k, true)}" alt="">`).join('')}</div>` : ''; };
const flagsOf = (t) => ((t.theme && t.theme.places) || []).map((p) => p.flag).join('');
// "next adventure": a countdown before the trip, today's day during it; nothing once it is over
function heroHtml() {
  const t = curTrip(); if (!t) return '';
  const dn = dayNow(t), until = daysUntil(t);
  if (dn < 0 && until <= 0) return '';
  const kids = (t.theme.children || []).map((k) => `${kidFace(k.slug)} ${esc(kidName(k.slug))}${k.age ? ' ' + esc(T(k.age)) : ''}`).join(' · ');
  const big = dn >= 0 ? `<b>${dn + 1}</b><small>/ ${t.days.length}</small>` : `<b>${until}</b>`;
  const lbl = dn >= 0 ? L('วันที่ของทริป', 'day of the trip') : L(until === 1 ? 'พรุ่งนี้ออกเดินทาง!' : 'วันก่อนออกเดินทาง', until === 1 ? 'day to go — tomorrow!' : 'days to go');
  const go = (dn >= 0 && isEditor() ? `<a class="btn" href="#/t/${esc(t.id)}/log/${dn}">✏️ ${L('บันทึกวันนี้', 'Record today')}</a>` : `<a class="btn" href="#/t/${esc(t.id)}">📖 ${L('เปิดเล่มนี้', 'Open the book')}</a>`)
    + (dn < 0 && isEditor() && (t.passport || {}).countdown ? ` <button class="btn ghost" data-a="kidmode" data-v="">🎁 ${L('เด็กๆ เปิดเซอร์ไพรส์วันนี้', "Today's surprise for the kids")}</button>` : '');
  const art = t.days.map((_, i) => i).filter((i) => dn < 0 || i === dn || i === dn + 1).slice(0, dn < 0 ? 5 : 2);
  return `<section class="hero${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)};--hero:${esc(t.theme.accent || '#1F3A5F')}">
<div class="txt"><div class="kicker">${dn >= 0 ? L('ตอนนี้กำลังเที่ยว', 'On the road now') : L('การผจญภัยครั้งต่อไป', 'Next adventure')} ${flagsOf(t)}</div>
<h2>${esc(dn >= 0 ? `${t.days[dn].emoji || ''} ${T(t.days[dn].title)}` : T(t.title).split(' · ')[0])}</h2>
<div class="count">${big}<span>${lbl}</span></div>
${kids ? `<p class="kids">${kids}</p>` : ''}${go}</div>
<div class="float">${art.slice(0, 3).map((i, j) => artImg(t, i, 'f' + j)).join('')}${castHtml((t.theme.children || []).map((k) => k.slug))}</div></section>`;
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
${heartsHtml(t)}
<div class="part">${L('เส้นทางของเล่มนี้', 'The route of this book')} <span class="label">· ${L('ตราสีเต็ม = มีบันทึกแล้ว', 'full colour = recorded')}</span></div>
<nav class="journey">${t.days.map((d, i) => {
    const on = dayStamped(t, i), href = dayHasContent(t, i) ? `#d${i}` : edit ? `#/t/${esc(t.id)}/log/${i}` : '';
    const inner = `${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small>`;
    return href ? `<a class="${on ? 'on' : ''}" href="${href}"${href[0] === '#' && href[1] === 'd' ? ` data-a="jump" data-v="${i}"` : ''}>${inner}</a>` : `<span class="${on ? 'on' : ''}">${inner}</span>`;
  }).join('')}</nav>
${itinerary(t)}
${infoHtml(t)}
${favs ? `<div class="part">${L('ช่วงเวลาที่ชอบที่สุด', 'Favourite moments')} ⭐</div>${favs}` : ''}
${firsts.length ? `<div class="part">${L('ครั้งแรกของหนู', 'Firsts')}</div><div class="firsts">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="first got"><span class="e">${esc(f.e)}</span><span class="t">${esc(e.first_key === 'custom' ? e.text : f.t)}<br><small class="muted">${L('วันที่', 'Day')} ${e.day + 1}</small></span><span class="kids">${kidBadge(e.child)}</span></div>`; }).join('')}</div>` : ''}
${drawingsHtml(t)}
${isEditor() && S.features.story && days.length ? storyBlock(t, null)
    : story ? `<div class="part">${L('นิทานของทั้งทริป', 'The story of the trip')}</div><div class="call calm" style="white-space:pre-line">${bedBtn(story)}${esc(story.text)}</div>` : ''}
${days.map((i) => dayPage(t, i)).join('') || `<div class="empty">${castHtml((t.theme.children || []).map((k) => k.slug))}${L('ยังไม่มีบันทึก — ', 'Nothing recorded yet — ')}${edit ? `<a href="#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}">${L('เริ่มบันทึกวันแรก', 'start with a day')}</a>` : L('รอพ่อแม่บันทึกระหว่างทริป', 'the grown-ups will fill it in during the trip')}</div>`}
${offlineHtml(t)}
<div class="row noprint" style="margin:28px 0 8px"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">⬇ ${L('ดาวน์โหลด PDF (A4)', 'Download PDF (A4)')}</a><button class="btn ghost small" data-a="print">🖨️ ${L('พิมพ์', 'Print')}</button><button class="btn ghost small" data-a="copytext">📋 ${L('คัดลอกเป็นข้อความ', 'Copy as text')}</button></div>`;
}
// the whole plan, day by day, like the manual's day list: every day (recorded or not), where we sleep, the planned stops
function itinerary(t) {
  const now = dayNow(t), edit = isEditor();
  return `<div class="part">${L('แผนการเดินทาง', 'Itinerary')} <span class="label">· ${t.days.length} ${L('วัน', 'days')}</span></div><ol class="itin">${t.days.map((d, i) => {
    const has = dayHasContent(t, i), stops = (d.planned || []).filter((p) => p.kind !== 'food'), food = (d.planned || []).filter((p) => p.kind === 'food');
    const go = has ? `<a class="mini" href="#d${i}" data-a="jump" data-v="${i}">${L('อ่านบันทึก', 'Read')} ›</a>` : edit ? `<a class="mini" href="#/t/${esc(t.id)}/log/${i}">✏️ ${L('บันทึก', 'Record')}</a>` : '';
    return `<li class="${has ? 'has' : ''}${i === now ? ' now' : ''}">${artImg(t, i)}<div class="grow">
<div class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${has ? ' ✓' : ''}</div>
<h4>${esc(T(d.title))}</h4>
${stops.length ? `<p class="stops">${stops.map((p) => esc(T(p))).join(' · ')}</p>` : ''}
<p class="label">${d.sleep ? `🛏️ ${esc(T(d.sleep))}` : ''}${food.length ? ` · 🍽️ ${food.map((p) => esc(T(p))).join(' · ')}` : ''}</p>${planHtml(t, i, i === now)}</div>${go}</li>`;
  }).join('')}</ol>`;
}
// the day's plan from the manual (seed → trip_days.plan): timeline, how we move, local pick, plan B, money, tips
const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const extA = (href, label, cls) => `<a class="${cls || 'mini'}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
const TIPK = { warn: '⚠️', tip: '💡', info: 'ℹ️' };
function planHtml(t, i, open) {
  const pl = t.days[i].plan || {}, rows = pl.plan || [];
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  return `<details class="dayplan"${open ? ' open' : ''}><summary>🗓️ ${L('แผนวันนี้', 'Plan for the day')}${rows.length ? ` <span class="label">· ${rows.length} ${L('ช่วง', 'steps')}</span>` : ''}</summary>
${pl.moving ? `<p class="moving">🚶 <b>${L('เดินทาง', 'Moving')}</b> ${esc(T(pl.moving))}${pl.route ? ` · ${extA(pl.route, L('เส้นทางใน Google Maps', 'Route in Google Maps') + ' ↗')}` : ''}</p>` : ''}
${rows.length ? `<ol class="tl plan">${rows.map((r) => `<li><time>${esc(r.t || '')}</time><div>${esc(T(r))}${r.note ? `<small>${esc(T(r.note))}</small>` : ''}</div></li>`).join('')}</ol>` : ''}
${pl.stay ? `<p class="stay">🛏️ <b>${L('ที่พักคืนนี้', 'Tonight')}</b> ${esc(pl.stay.name)}<br><span class="addr">${esc(pl.stay.addr)}</span> ${extA(mapsUrl(pl.stay.q || pl.stay.addr), L('แผนที่', 'Map') + ' ↗')}</p>` : ''}
${pl.pick ? `<div class="call pick"><span class="lbl">Local pick</span>${esc(T(pl.pick))}</div>` : ''}
${pl.planB ? `<div class="call warn"><span class="lbl">Plan B</span>${esc(T(pl.planB))}</div>` : ''}
${pl.money ? `<p class="money">💰 <b>${L('เงินวันนี้', 'Money today')}</b> ${esc(T(pl.money))}</p>` : ''}
${(pl.tips || []).length ? `<ul class="tips">${pl.tips.map((x) => `<li>${TIPK[x.kind] || '•'} ${esc(T(x))}</li>`).join('')}</ul>` : ''}
${(pl.eat || []).length ? `<details class="sub"><summary>🍽️ ${L('ร้านอื่นใกล้ๆ', 'More places to eat nearby')} <span class="label">· ${pl.eat.length}</span></summary><ul class="eats">${pl.eat.map((e) => `<li><b>${esc(e.name)}</b>${e.pr ? ` <span class="label">${esc(e.pr)}</span>` : ''}${T(e.note) ? `<br><small>${esc(T(e.note))}</small>` : ''} ${e.q ? extA(mapsUrl(e.q), '↗') : ''}</li>`).join('')}</ul></details>` : ''}
${(pl.learn || []).length ? `<details class="sub"><summary>📚 ${L('เรียนรู้ระหว่างทาง', 'Learn on the way')} <span class="label">· ${pl.learn.length}</span></summary>${pl.learn.map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline">🧒 ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}</details>` : ''}
${(pl.quiz || []).length ? `<details class="sub"><summary>❓ ${L('ถามหนูในรถ', 'Quiz in the car')} <span class="label">· ${pl.quiz.length}</span></summary>${quizHtml(pl.quiz)}</details>` : ''}
<p class="label">${L('จากเล่มคู่มือ · ราคาและเวลาเปิดตรวจซ้ำก่อนเดินทาง · เลขจองอยู่ในแอปคู่มือ ไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p></details>`;
}
const quizHtml = (qs) => `<div class="quiz">${qs.map((q) => `<details class="qa"><summary>${esc(T(q.q))}</summary><p>${esc(T(q.a))}</p></details>`).join('')}</div>`;
// the pocket guide from the seed (trips.info): stays with addresses, emergency numbers, prices, key facts, packing, things to learn
function infoHtml(t) {
  const n = t.info || {}; if (!Object.keys(n).length) return '';
  const tel = (x) => `<a href="tel:${esc(String(x).split('·')[0].replace(/[^+\d]/g, ''))}">${esc(x)}</a>`;   // "number · address" → dial the number only
  const blocks = [];
  if ((n.stays || []).length) blocks.push(`<details class="pg"><summary>🛏️ ${L('ที่พัก', 'Where we stay')} <span class="label">· ${n.stays.length}</span></summary><div class="stays">${n.stays.map((s, k) => `<div class="stayc"><div class="kicker">${k + 1} · ${esc(T(s.base))} · ${esc(T(s.ci))} → ${esc(T(s.co))} · ${s.n} ${L('คืน', s.n > 1 ? 'nights' : 'night')}</div><b>${esc(T(s.prop))}</b><div class="addr">${esc(s.addr)}</div>${T(s.why) ? `<small>${esc(T(s.why))}</small>` : ''}<div class="row">${extA(mapsUrl(s.q || s.addr), '🗺️ ' + L('เปิดแผนที่', 'Open in Maps'), 'btn ghost small')}</div></div>`).join('')}</div>
<p class="label">${L('ให้คนขับดูที่อยู่ได้เลย · เลขจองและใบยืนยันอยู่ในแอปคู่มือ', 'Show the driver the address · bookings and confirmations live in the guide app')}</p></details>`);
  if ((n.emergency || []).length) blocks.push(`<details class="pg"><summary>🆘 ${L('เบอร์ฉุกเฉิน', 'Emergency numbers')}</summary><ul class="emerg">${n.emergency.map((e) => `<li class="${e.main ? 'main' : ''}"><span>${esc(T(e.label))}</span><b>${tel(e.tel)}</b></li>`).join('')}</ul>${n.lost ? `<div class="call warn"><span class="lbl">${L('ถ้าเด็กหลง', 'If a child is lost')}</span>${esc(T(n.lost))}</div>` : ''}</details>`);
  if (n.prices && (n.prices.rows || []).length) blocks.push(`<details class="pg"><summary>🎟️ ${esc(T(n.prices.head))}</summary><div class="tblwrap"><table class="prices"><thead><tr>${n.prices.cols.map((c) => `<th>${esc(T(c))}</th>`).join('')}</tr></thead><tbody>${n.prices.rows.map((r) => `<tr>${r.map((c, k) => `<td${k === 0 ? ' class="nm"' : ''}>${esc(T(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`);
  if ((n.guide || []).length) blocks.push(`<details class="pg"><summary>🧭 ${L('เรื่องที่กำหนดแผนทั้งทริป', 'What shapes this trip')} <span class="label">· ${n.guide.length}</span></summary><div class="gcards">${n.guide.map((g) => `<div class="gcard"><div class="kicker">${esc(T(g.sub))}</div><b>${esc(T(g.title))}</b><p>${esc(T(g.text))}</p></div>`).join('')}</div></details>`);
  if ((n.pack || []).length) blocks.push(`<details class="pg"><summary>🧳 ${L('จัดกระเป๋า', 'Packing')}</summary>${n.pack.map((g) => `<h5>${esc(T(g.group))}</h5><ul class="tips">${g.items.map((x) => `<li>${esc(T(x))}</li>`).join('')}</ul>`).join('')}</details>`);
  if ((n.general || []).length) blocks.push(`<details class="pg"><summary>🗣️ ${L('เรียนรู้ระหว่างนั่งรถ', 'Learn in the car')} <span class="label">· ${n.general.reduce((s, g) => s + g.items.length, 0)}</span></summary>${n.general.map((g) => `<h5>${esc(g.emo || '')} ${esc(T(g.theme))}</h5><dl class="gl">${g.items.map((x) => `<div><dt>${esc(T(x.t))}</dt><dd>${esc(T(x.x))}</dd></div>`).join('')}</dl>`).join('')}</details>`);
  if ((n.wild || []).length) blocks.push(`<details class="pg"><summary>🦘 ${L('สัตว์ที่จะเจอ', 'Animals we may meet')} <span class="label">· ${n.wild.length}</span></summary><dl class="gl">${n.wild.map((w) => `<div><dt>${esc(w.emo || '')} ${esc(T(w.name))}</dt><dd>${esc(T(w.text))}</dd></div>`).join('')}</dl></details>`);
  return blocks.length ? `<section class="pocket noprint" id="pocket"><div class="part">${L('คู่มือพกพา', 'Pocket guide')} <span class="label">· ${L('ใช้ได้ออฟไลน์', 'works offline')}</span></div>${blocks.join('')}</section>` : '';
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
  const food = pl.filter((p) => p.kind === 'food'), firsts = es.filter((e) => e.kind === 'first'), hs = heartsOf(t.id, i);
  return `<article class="day" id="d${i}">
<div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div>
<div class="moods">${moods.map((m) => `<span class="pill">${kidFace(m.child)} ${esc(m.mood)}</span>`).join('')}${hs.map((h) => `<span class="pill heart" title="${esc(h.text)}">${esc(h.emoji)} ${esc(h.from)}</span>`).join('')}</div>
<h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart')}
<div class="meta" style="grid-column:2/3">${d.sleep ? `<b>${L('นอนที่', 'Sleep')}</b> ${esc(T(d.sleep))}` : ''}${d.wx ? ` · ${esc(T(d.wx))}` : ''}</div></div>
<div class="body">
${route.length ? `<aside class="route"><span class="label">${L('ที่ไปวันนี้', 'Getting around')}</span><ol>${route.map((p) => `<li class="${visited.has(p.key) ? 'done' : ''}"><b>${esc(T(p))}</b>${visited.has(p.key) ? `<small>${L('ไปแล้ว', 'visited')} ✓</small>` : ''}</li>`).join('')}</ol></aside>` : '<div></div>'}
<div>
${ph.length ? `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : ''}
${timeline.length ? `<ol class="tl">${timeline.map((x) => `<li><time>${esc(fmtTime(x.at, t.timezone))}</time><div>${x.h}</div></li>`).join('')}</ol>` : ''}
${note ? `<div class="call calm"><span class="lbl">${L('บันทึกพ่อแม่', "Parents' note")}</span>${esc(note.text)}</div>` : ''}
${story ? `<div class="call pick" style="white-space:pre-line"><span class="lbl">${L('นิทานก่อนนอน', 'Bedtime story')}</span>${bedBtn(story)}${esc(story.text)}</div>` : ''}
</div></div>
${food.length || fav || firsts.length ? `<div class="foot3">
${food.length ? `<div><h4>${L('กินอะไร', 'Where we ate')}</h4><ul>${food.map((p) => `<li>${esc(T(p.name))}</li>`).join('')}</ul></div>` : ''}
${fav ? `<div><h4>${L('ของโปรดวันนี้', 'Favourite today')}</h4><p>${esc(fav.text)}</p></div>` : ''}
${firsts.length ? `<div><h4>${L('ครั้งแรกวันนี้', 'First today')}</h4><ul>${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<li>${esc(f.e)} ${esc(e.first_key === 'custom' ? e.text : f.t)} — ${esc(kidName(e.child))}</li>`; }).join('')}</ul></div>` : ''}
</div>` : ''}
${isEditor() ? `<p class="noprint" style="margin-top:10px"><a class="btn ghost small" href="#/t/${esc(t.id)}/log/${i}">✏️ ${L('แก้ไขวันนี้', 'Edit this day')}</a></p>` : ''}
</article>`;
}

/* ---------- keep a book on the phone (before the flight, before the ferry…) ---------- */
function offlineHtml(t) {
  const got = ls('offline_' + t.id), n = mediaOf(t.id).length, stale = got && got.n !== n;
  const when = got ? new Date(got.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
  return `<section class="blk offl noprint" id="offl"><h3>📴 ${L('ใช้ตอนไม่มีเน็ต', 'Use without signal')}</h3>
<p class="label">${got && !stale ? L(`เล่มนี้อยู่ในเครื่องแล้ว (${when}) — เปิดสมุด พาสปอร์ต โหมดเด็ก และรูปย่อทุกรูปได้โดยไม่ต้องมีสัญญาณ บันทึกใหม่จะส่งขึ้นเองเมื่อกลับมาออนไลน์`, `Stored on this phone (${when}) — the book, passports, kid mode and every thumbnail open without signal; new notes upload when you are back online`)
    : got ? L(`เก็บไว้เมื่อ ${when} แต่มีรูปใหม่ตั้งแต่นั้น กดอีกครั้งเพื่อเก็บให้ครบ`, `Stored ${when}, but there are new photos since — tap again to top up`)
      : L('กดก่อนขึ้นเครื่องหรือก่อนลงเรือ: แอปจะดึงรูปย่อทุกรูป รูปโปรดขนาดเต็ม และภาพวาดทั้งหมดของเล่มนี้มาเก็บไว้ในเครื่อง', 'Tap before the flight or the ferry: the app stores every thumbnail, the full-size favourites and all the drawings of this book on this phone')}</p>
<div class="row"><button class="btn small" data-a="offline" data-t="${esc(t.id)}"${packing ? ' disabled' : ''}>${got && !stale ? '✓ ' : ''}${L('เก็บเล่มนี้ไว้ในเครื่อง', 'Keep this book on the phone')}</button>
${n > 0 ? `<button class="btn ghost small" data-a="offline" data-t="${esc(t.id)}" data-v="all"${packing ? ' disabled' : ''}>${L(`รวมรูปเต็มทั้ง ${n} รูป`, `With all ${n} full-size photos`)}</button>` : ''}</div></section>`;
}

/* ---------- hearts from the family (relatives on the view link too) ---------- */
const HEARTS = ['💗', '🤗', '😘', '⭐', '👏', '🎈'];
const heartsOf = (tid, day) => (S.hearts || []).filter((h) => h.trip === tid && (day === undefined || h.day === day));
let heartTo = 'both', heartEmoji = HEARTS[0];
function heartsHtml(t) {
  const hs = heartsOf(t.id).slice().sort((a, b) => b.at - a.at), kids = (t.theme.children || []).map((k) => k.slug);
  const to = kids.length ? kids.concat(kids.length > 1 ? ['both'] : []) : ['both'];
  if (!to.includes(heartTo)) heartTo = to[to.length - 1];
  return `<section class="blk hearts${hs.length ? '' : ' noprint'}" id="hearts"><h3>💗 ${L('หัวใจถึงเด็กๆ', 'Hearts for the kids')}${hs.length ? ` <span class="label">· ${hs.length}</span>` : ''}</h3>
<div class="hform noprint"><p class="label">${L(`ส่งหัวใจหรือข้อความสั้นๆ ${kids.map(kidName).join(L('กับ', ' & '))}จะเห็นในโหมดเด็ก และมือถืออ่านให้ฟัง`, `Send a heart or a short note — ${kids.map(kidName).join(' & ')} see it in kid mode and the phone reads it out`)}</p>
<div class="row">${to.map((k) => `<button class="chip" data-a="heartto" data-v="${esc(k)}" aria-pressed="${k === heartTo}">${kidFace(k)} ${esc(kidName(k))}</button>`).join('')}</div>
<div class="row emo" role="group" aria-label="${L('เลือกหัวใจ', 'Pick a heart')}">${HEARTS.map((e) => `<button data-a="heartemo" data-v="${e}" aria-pressed="${e === heartEmoji}">${e}</button>`).join('')}</div>
<div class="row"><input class="field" id="hfrom" data-draft="hfrom" value="${esc(drafts.hfrom ?? (ls('heartfrom') || ''))}" placeholder="${L('ชื่อผู้ส่ง เช่น ยาย, ปู่', 'From, e.g. Grandma')}" maxlength="24" style="flex:1;min-width:120px">
<input class="field" id="htext" data-draft="htext" value="${esc(drafts.htext || '')}" placeholder="${L('ข้อความสั้นๆ (ไม่ใส่ก็ได้)', 'A short note (optional)')}" maxlength="140" style="flex:3;min-width:180px"></div>
<button class="btn small" data-a="sendheart" data-t="${esc(t.id)}">${L('ส่ง', 'Send')} ${heartEmoji}</button></div>
${hs.length ? `<ul class="hlist">${hs.slice(0, 40).map((h) => `<li><span class="he">${esc(h.emoji)}</span><div class="grow"><b>${esc(h.from)}</b> → ${kidFace(h.child)} ${esc(kidName(h.child))}${h.pending ? ' ⏳' : ''}${h.text ? `<p>${esc(h.text)}</p>` : ''}<small class="label">${esc(new Date(h.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}${h.day !== null && h.day !== undefined ? ` · ${L('วันที่', 'Day')} ${h.day + 1}` : ''}</small></div>${isEditor() || h.mine ? `<button class="mini noprint" data-a="delheart" data-v="${esc(h.id)}">${L('ลบ', 'Delete')}</button>` : ''}</li>`).join('')}</ul>` : ''}</section>`;
}
// the kids' finger drawings, all together (pre-trip ones have no day)
function drawingsHtml(t) {
  const ds = mediaOf(t.id).filter(isDrawing);
  return ds.length ? `<div class="part">${L('ภาพวาดของเด็กๆ', "The kids' drawings")} 🖍️</div><div class="mosaic drawings">${ds.map((m) => photoBtn(t, m)).join('')}</div>` : '';
}
const bedBtn = (e) => `<button class="btn ghost small noprint bedbtn" data-a="bedtime" data-v="${esc(e.id)}">🌙 ${L('อ่านให้ฟังก่อนนอน', 'Read it at bedtime')}</button>`;

/* ---------- bedtime story by Claude (editors, only when pressed) ---------- */
function storyBlock(t, day) {
  const st = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === day);
  const can = isEditor() && S.features.story;
  if (!st && !can) return '';
  const whole = day === null, dv = whole ? '' : day;
  return `<section class="blk${st ? '' : ' noprint'}" id="storyblk"><h3>✨ ${whole ? L('นิทานของทั้งทริป', 'The story of the whole trip') : L('นิทานก่อนนอนของวันนี้', "Tonight's bedtime story")}</h3>
${st ? `${bedBtn(st)}<div class="call calm" id="storytext" style="white-space:pre-line">${esc(st.text)}</div>` : `<div class="call calm" id="storytext" style="white-space:pre-line" hidden></div>`}
${can ? `<div class="row noprint" style="margin-top:8px">
<button class="btn small" data-a="story" data-t="${esc(t.id)}" data-d="${dv}" id="storygo">✨ ${st ? L('แต่งใหม่', 'Write again') : L('ให้ Claude แต่งนิทาน', 'Ask Claude for a story')}</button>
<button class="btn ghost small" data-a="storystop" id="storystop" hidden>■ ${L('หยุด', 'Stop')}</button>
${st ? `<button class="mini" data-a="delentry" data-v="${esc(st.id)}">${L('ลบนิทาน', 'Delete story')}</button>` : ''}
<span class="label">${L('ส่งเฉพาะข้อความที่บันทึกไว้ ไม่ส่งรูป', 'Sends only the written notes — never photos')}</span></div>` : ''}</section>`;
}

/* ---------- travel notebook: how a stay / restaurant / place worked for us (editors write, everyone reads) ----------
   One review per thing per trip, id `<trip>.rev.<kind>.<slug>`: stars, preset tags, each kid's verdict, "again?", a note.
   The notebook page (#/notebook) reads across trips so the next trip can be planned from what worked. */
const RTAGS = {
  stay: [['kidsleep', 'เด็กนอนดี', 'kids slept well'], ['cot', 'มีเปลเด็ก', 'cot provided'], ['kitchen', 'มีครัว', 'kitchen'], ['laundry', 'เครื่องซักผ้า', 'laundry'], ['parking', 'ที่จอดรถ', 'parking'], ['pool', 'สระว่ายน้ำ', 'pool'], ['quiet', 'เงียบ', 'quiet'], ['nearfood', 'ใกล้ของกิน', 'food nearby'], ['clean', 'สะอาด', 'clean'], ['small', 'ห้องเล็ก', 'small room'], ['noisy', 'เสียงดัง', 'noisy'], ['stairs', 'บันไดเยอะ', 'lots of stairs']],
  food: [['kidsate', 'เด็กกินได้', 'kids ate it'], ['highchair', 'มีเก้าอี้เด็ก', 'high chair'], ['yummy', 'อร่อย', 'delicious'], ['fast', 'ได้เร็ว', 'quick'], ['value', 'คุ้ม', 'good value'], ['stroller', 'รถเข็นเข้าได้', 'stroller fits'], ['view', 'วิวดี', 'nice view'], ['wait', 'รอนาน', 'long wait'], ['pricey', 'แพง', 'pricey'], ['loud', 'เสียงดัง', 'loud']],
  place: [['stroller', 'รถเข็นได้', 'stroller-friendly'], ['playground', 'สนามเด็กเล่น', 'playground'], ['shade', 'ร่มเงา', 'shade'], ['toilets', 'ห้องน้ำสะดวก', 'toilets handy'], ['nap', 'เด็กงีบได้', 'nap-friendly'], ['worth', 'คุ้มค่าเข้า', 'worth the ticket'], ['free', 'ฟรี', 'free'], ['short', 'ใช้เวลาสั้น', 'quick visit'], ['long', 'ใช้เวลานาน', 'takes long'], ['crowded', 'คนเยอะ', 'crowded'], ['carrier', 'ต้องเป้อุ้ม', 'needs the carrier']],
};
const RKIND = { stay: ['🛏️', 'ที่พัก', 'Stay'], food: ['🍽️', 'ร้านอาหาร', 'Food'], place: ['📍', 'สถานที่', 'Place'] };
const VERDICT = { love: '😍', ok: '🙂', no: '😖' };
const rtagLabel = (kind, k) => { const x = (RTAGS[kind] || []).find((t) => t[0] === k); return x ? L(x[1], x[2]) : k; };
const rslug = (key) => { const s = String(key).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40); if (s.length >= 3) return s; let h = 5381; for (const c of String(key)) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return 'k' + h.toString(36); };
const revId = (t, kind, key) => `${t.id}.rev.${kind}.${rslug(key)}`;
const reviewOf = (t, kind, key) => S.reviews.find((r) => r.id === revId(t, kind, key));
const starsTxt = (n) => (n ? '★'.repeat(n) + '☆'.repeat(5 - n) : '');
const kidFaces = (kids) => Object.entries(kids || {}).map(([k, v]) => `<span class="kv" title="${esc(kidName(k))}">${kidFace(k)}${VERDICT[v] || ''}</span>`).join('');
const isHome = (sleep) => /^(home|บ้าน)$/i.test(T(sleep).trim());
// everything worth a review on this day: tonight's stay, every planned stop and meal, extra check-ins
function reviewables(t, i) {
  const d = t.days[i], out = [];
  if (d.sleep && !isHome(d.sleep)) out.push({ kind: 'stay', key: d.sleep.en || d.sleep.th || T(d.sleep), name: { th: d.sleep.th || T(d.sleep), en: d.sleep.en || T(d.sleep) } });
  (d.planned || []).forEach((p) => out.push({ kind: p.kind === 'food' ? 'food' : 'place', key: p.key, name: { th: p.th || p.en, en: p.en || p.th } }));
  placesOf(t.id, i).filter((p) => !(d.planned || []).some((x) => x.key === p.key)).forEach((p) => out.push({ kind: p.kind === 'food' ? 'food' : 'place', key: p.key, name: p.name }));
  return out;
}
function reviewCard(t, i, it, ed) {
  const r = reviewOf(t, it.kind, it.key) || {}, id = revId(t, it.kind, it.key), kids = children().map((c) => c.slug), tags = r.tags || [];
  const has = r.rating || (r.tags || []).length || Object.keys(r.kids || {}).length || r.note || r.again !== undefined && r.again !== null;
  const ctx = `data-t="${esc(t.id)}" data-d="${i}" data-kind="${it.kind}" data-key="${esc(it.key)}" data-nth="${esc(it.name.th)}" data-nen="${esc(it.name.en)}"`;
  return `<details class="rev${has ? ' has' : ''}" id="r-${esc(id)}" ${ctx}${has ? ' open' : ''}><summary><span class="k">${RKIND[it.kind][0]}</span><b>${esc(T(it.name))}</b><span class="st">${r.rating ? starsTxt(r.rating) : ''}</span>${kidFaces(r.kids)}${r.again === false ? '<span class="tag">✗</span>' : r.again ? '<span class="tag ok">↻</span>' : ''}</summary>
<div class="rbody">
<div class="stars" role="group" aria-label="${L('ให้ดาว', 'Stars')}">${[1, 2, 3, 4, 5].map((n) => `<button data-a="rate" data-v="${n}" aria-pressed="${r.rating === n}" aria-label="${n} ★"${ed ? '' : ' disabled'}>${r.rating && n <= r.rating ? '★' : '☆'}</button>`).join('')}${r.rating && ed ? `<button class="mini" data-a="rate" data-v="0">${L('ล้าง', 'clear')}</button>` : ''}</div>
<div class="row rtags">${(RTAGS[it.kind] || []).map(([k, th, en]) => `<button class="chip" data-a="rtag" data-v="${k}" aria-pressed="${tags.includes(k)}"${ed ? '' : ' disabled'}>${L(th, en)}</button>`).join('')}</div>
<div class="rkids">${kids.map((k) => `<div class="rkid">${kidBadge(k)}<span class="opts">${Object.entries(VERDICT).map(([v, e]) => `<button data-a="rkid" data-k="${k}" data-v="${v}" aria-pressed="${(r.kids || {})[k] === v}" aria-label="${esc(kidName(k))} ${e}"${ed ? '' : ' disabled'}>${e}</button>`).join('')}</span></div>`).join('')}
<div class="rkid again"><span class="label">${L('ไปอีกไหม?', 'Again?')}</span><span class="opts"><button data-a="ragain" data-v="1" aria-pressed="${r.again === true}"${ed ? '' : ' disabled'}>👍 ${L('ไปอีก', 'yes')}</button><button data-a="ragain" data-v="0" aria-pressed="${r.again === false}"${ed ? '' : ' disabled'}>👎 ${L('ไม่แล้ว', 'no')}</button></span></div></div>
${ed ? `<textarea class="field rnote" data-a-blur="rnote" data-draft="r:${esc(id)}" placeholder="${L('จดสั้นๆ: ห้องไหนดี เมนูที่เด็กชอบ ควรไปกี่โมง…', 'Short note: which room, what the kids ate, best time to go…')}" maxlength="500">${esc(drafts['r:' + id] ?? (r.note || ''))}</textarea>` : r.note ? `<p class="rnotetxt">${esc(r.note)}</p>` : ''}
${ed && has ? `<button class="mini" data-a="rdel">${L('ลบรีวิว', 'Delete review')}</button>` : ''}</div></details>`;
}
function notebookBlock(t, i) {
  const items = reviewables(t, i); if (!items.length) return '';
  const ed = isEditor(), n = items.filter((it) => reviewOf(t, it.kind, it.key)).length;
  return `<section class="blk" id="notebook"><h3>📓 ${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')} <span class="label">${n}/${items.length} · ${L('ไว้วางแผนทริปหน้า', 'for the next trip')}</span></h3>
<p class="label">${L('ที่พัก ร้าน สถานที่ของวันนี้ เป็นอย่างไรสำหรับครอบครัวเรา? ให้ดาว ติดแท็ก บอกว่าเด็กๆ ชอบไหม', 'How did today’s stay, meals and places work for us? Stars, tags, and the kids’ verdicts')}</p>
<div class="revs">${items.map((it) => reviewCard(t, i, it, ed)).join('')}</div></section>`;
}
function viewNotebook() {
  const rs = S.reviews.slice(), byTrip = (r) => trip(r.trip);
  const where = (r) => { const t = byTrip(r); return t ? `${flagsOf(t)} ${esc(T(t.title).split(' · ')[0])}${r.day !== null && r.day !== undefined ? ` · ${L('วันที่', 'Day')} ${r.day + 1}` : ''}` : ''; };
  const row = (r) => `<li class="nbrow"><div class="nbhead"><span class="st">${r.rating ? starsTxt(r.rating) : '—'}</span><b>${esc(T(r.name))}</b>${kidFaces(r.kids)}${r.again === false ? `<span class="tag">${L('ไม่ไปอีก', 'not again')}</span>` : r.again ? `<span class="tag ok">${L('ไปอีก', 'again')}</span>` : ''}${isEditor() && byTrip(r) && r.day !== null && r.day !== undefined ? `<a class="mini" href="#/t/${esc(r.trip)}/log/${r.day}#notebook" aria-label="${L('แก้ไข', 'Edit')}">✏️</a>` : ''}</div>
<div class="label">${where(r)}${(r.tags || []).length ? ' · ' + r.tags.map((k) => esc(rtagLabel(r.kind, k))).join(' · ') : ''}</div>${r.note ? `<p>${esc(r.note)}</p>` : ''}</li>`;
  const sortBy = (a, b) => (b.rating || 0) - (a.rating || 0) || b.at - a.at;
  const count = (list, pick) => { const m = {}; list.forEach((r) => (r.tags || []).forEach((k) => { if (pick(k, r)) m[`${r.kind}:${k}`] = (m[`${r.kind}:${k}`] || 0) + 1; })); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 10); };
  const good = count(rs.filter((r) => (r.rating || 0) >= 4 || r.again === true), () => true), bad = count(rs.filter((r) => (r.rating && r.rating <= 2) || r.again === false), () => true);
  const chip = ([kk, n]) => { const [kind, k] = kk.split(':'); return `<span class="chip">${RKIND[kind][0]} ${esc(rtagLabel(kind, k))} <small>×${n}</small></span>`; };
  const sections = ['stay', 'food', 'place'].map((kind) => { const list = rs.filter((r) => r.kind === kind).sort(sortBy); return list.length ? `<div class="part">${RKIND[kind][0]} ${L(RKIND[kind][1], RKIND[kind][2])} <span class="label">· ${list.length}</span></div><ul class="nblist">${list.map(row).join('')}</ul>` : ''; }).join('');
  const lessons = rs.filter((r) => r.note && ((r.rating && r.rating <= 2) || r.again === false)).sort((a, b) => b.at - a.at);
  const live = curTrip();
  return `<div class="part">${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</div><h1 class="h2">${L('อะไรเวิร์กกับครอบครัวเรา', 'What works for our family')}</h1>
<p class="lede">${L('รีวิวที่พัก ร้านอาหาร และสถานที่จากทุกทริป — ให้ดาวในหน้า "บันทึก" ของแต่ละวัน แล้วใช้หน้านี้วางแผนทริปหน้า', 'Stays, food and places from every trip — rate them on each day’s Record page, then plan the next trip from here')}</p>
${rs.length ? `<div class="nbsum"><div><h4>👍 ${L('สิ่งที่เวิร์ก', 'What worked')}</h4><div class="row">${good.map(chip).join('') || `<span class="label">${L('ยังไม่มี', 'nothing yet')}</span>`}</div></div>
<div><h4>👎 ${L('ครั้งหน้าเลี่ยง', 'Avoid next time')}</h4><div class="row">${bad.map(chip).join('') || `<span class="label">${L('ยังไม่มี', 'nothing yet')}</span>`}</div></div></div>
${sections}
${lessons.length ? `<div class="part">📝 ${L('บทเรียนสำหรับทริปหน้า', 'Lessons for next time')}</div><ul class="nblist">${lessons.map(row).join('')}</ul>` : ''}
<div class="row noprint" style="margin:20px 0"><button class="btn small" data-a="copynotebook">📋 ${L('คัดลอกเป็นข้อความ (เอาไปวางแผนทริปหน้า)', 'Copy as text (for planning the next trip)')}</button></div>`
    : `<div class="empty">${L('ยังไม่มีรีวิว — ', 'No reviews yet — ')}${isEditor() && live ? `<a href="#/t/${esc(live.id)}/log/${Math.max(0, dayNow(live))}#notebook">${L('เริ่มให้ดาวที่พักและร้านของวันนี้', 'start with today’s stay and meals')}</a>` : L('พ่อแม่จะให้ดาวระหว่างทริป', 'the grown-ups rate things during the trip')}</div>`}`;
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

/* ---------- the kids' passports (everyone; editors tick) ----------
   The printed "Kids Adventure Passport", alive: one passport per child per trip — Explorer ID, the two guides,
   a stamp per recorded day, daily missions (guide facts, "today I felt", spot-these ticks), animal / food / explorer
   checklists and a certificate. Content from the trip seed (`passport`); ticks are entries kind 'tick', ID answers 'field'.
   No real passport data — ever (PRD privacy): the number and the MRZ line are decorative. */
const kidTrips = (slug) => trips().filter((t) => !(t.theme.children || []).length || (t.theme.children || []).some((c) => c.slug === slug));
const passportStamps = (slug) => kidTrips(slug).reduce((n, t) => n + t.days.filter((_, i) => dayStamped(t, i)).length, 0);
const tickId = (t, key, kid) => `${t.id}.tick.${key}.${kid}`;
const ticked = (t, key, kid) => S.entries.find((e) => e.id === tickId(t, key, kid));
const fieldVal = (t, key, kid) => { const e = S.entries.find((x) => x.id === `${t.id}.field.${key}.${kid}`); return e ? e.text : ''; };
const ppList = (pp, key) => (pp.lists || []).find((l) => l.key === key);
const listItems = (l) => (l ? l.groups.flatMap((g) => g.items) : []);
const listGot = (t, l, kid) => listItems(l).filter((it) => ticked(t, `${l.key}.${it.k}`, kid)).length;
const certEarned = (t, kid) => { const l = (t.passport && t.passport.lists || []).find((x) => x.certificate); return !!l && listGot(t, l, kid) >= l.goal; };
// "where we sleep": consecutive nights in the same place, from the days' Sleep line
function sleepStops(t) {
  const out = [];
  t.days.forEach((d, i) => {
    const name = T(d.sleep); if (!name || /^(home|บ้าน)$/i.test(name)) return;
    const s = out.find((x) => x.name === name);
    if (s) s.days.push(i); else out.push({ name, days: [i], art: i });
  });
  const fmt = (ds) => ds.reduce((r, x) => { const l = r[r.length - 1]; if (l && x === l[1] + 1) l[1] = x; else r.push([x, x]); return r; }, []).map(([a, b]) => (a === b ? a + 1 : `${a + 1}–${b + 1}`)).join(', ');
  return out.map((s) => ({ ...s, label: fmt(s.days) }));
}
function tickBtn(t, kid, key, day, label, emoji, extra) {
  const on = ticked(t, key, kid), ed = isEditor();
  return `<button class="tick${on ? ' on' : ''}" data-a="tick" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="${day === null ? '' : day}" aria-pressed="${!!on}"${ed ? '' : ' disabled'}>
<i>${on ? '✓' : ''}</i>${emoji ? `<span class="e">${esc(emoji)}</span>` : ''}<span class="t">${esc(label)}${extra || ''}</span></button>`;
}
function yumBtns(t, kid, key) {
  const cur = ticked(t, key, kid), ed = isEditor();
  return `<span class="yum">${[['yum', '😋', L('อร่อย', 'Yum')], ['yuck', '😖', L('ไม่ชอบ', 'Yuck')]].map(([v, e, lbl]) => `<button data-a="tick" data-yum="${v}" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="" aria-pressed="${!!cur && cur.text === v}" aria-label="${lbl}"${ed ? '' : ' disabled'}>${e}</button>`).join('')}</span>`;
}
function starBtns(t, kid, key) {
  const cur = ticked(t, key, kid), n = cur ? +cur.text || 0 : 0, ed = isEditor();
  return `<span class="stars">${[1, 2, 3].map((v) => `<button data-a="tick" data-yum="${v}" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="" aria-pressed="${v <= n}" aria-label="${v} ★"${ed ? '' : ' disabled'}>★</button>`).join('')}</span>`;
}
function viewPassport(slug, tid) {
  const ks = children(), k = ks.find((c) => c.slug === slug) || ks[0];
  if (!k) return `<div class="empty">${L('ยังไม่มีข้อมูลเด็ก', 'No children yet')}</div>`;
  const mine = kidTrips(k.slug), t = mine.find((x) => x.id === tid) || (mine.includes(curTrip()) ? curTrip() : mine[0]);
  if (!t) return `<div class="empty">${L('ยังไม่มีทริป', 'No trips yet')}</div>`;
  const pp = t.passport || {}, g = pp.guides || [], ed = isEditor(), kid = k.slug, name = kidName(kid), st = pp.style;
  const fill = (x) => String(x || '').replace(/\{name\}/g, name).replace(/\{KID\}/g, (k.name_en || kid).toUpperCase());   // seed text templates
  const age = ((t.theme.children || []).find((c) => c.slug === kid) || {}).age;
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first' && e.child === kid);
  const words = entriesOf(t.id).filter((e) => e.kind === 'quote' && (e.child === kid || e.child === 'both')).sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) || b.at - a.at);
  const seen = new Set(ls('seen') || []), fresh = [];
  const got = t.days.filter((_, i) => dayStamped(t, i)).length;
  const short = T(t.title).split(' · ')[0], year = t.date_from.slice(0, 4);
  const mrz = esc(`P<${(pp.code || 'MB').split('-')[0]}<<${(k.name_en || kid).toUpperCase().replace(/[^A-Z]/g, '')}<<EXPLORER<<${year}`.padEnd(40, '<'));   // decorative only
  const guide = (i) => g[i] ? `<img class="guide" src="${esc(g[i].art)}" alt="${esc(T(g[i].name))}">` : '';
  const field = (key, label, ph) => `<div><dt>${label}</dt><dd>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${key}" data-draft="pf:${esc(t.id)}:${kid}:${key}" value="${esc(drafts[`pf:${t.id}:${kid}:${key}`] ?? fieldVal(t, key, kid))}" placeholder="${esc(ph || '')}" maxlength="60">` : esc(fieldVal(t, key, kid)) || '—'}</dd></div>`;

  // visa: a stamp per day of this trip (inked once the day has anything recorded or is Done)
  const ds = t.days.map((d, i) => {
    const on = dayStamped(t, i), id = `${t.id}:${i}`, isNew = on && !seen.has(id);
    if (isNew) fresh.push(id);
    return `<div class="dstamp${on ? ' on' : ''}${isNew ? ' new' : ''}" style="--r:${((i * 37 + t.id.length * 11) % 17) - 8}deg;--d:${Math.min(fresh.length, 12) * 90}ms" title="${esc(T(d.title))}">${artImg(t, i)}<small>${esc(((pp.days || [])[i] || {}).stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small></div>`;
  }).join('');
  if (fresh.length) ls('seen', [...seen, ...fresh]);

  // daily missions
  const feel = [['🤩', L('สุดยอด', 'Super')], ['😄', L('มีความสุข', 'Happy')], ['😴', L('ง่วงนอน', 'Sleepy')]];
  const mood = (i) => (S.entries.find((e) => e.id === `${t.id}.mood.d${i}.${kid}`) || {}).mood;
  const missions = (pp.days || []).map((pd, i) => {
    const d = t.days[i]; if (!d) return '';
    const spots = pd.spot || [], n = spots.filter((s) => ticked(t, `spot.d${i}.${s.k}`, kid)).length;
    const pl = d.plan || {}, facts = (pd.facts || []).concat((pl.learn || []).map((x) => x.kid).filter(Boolean));   // the guide's facts + one line per stop from the manual
    return `<article class="mission${dayStamped(t, i) ? ' stamped' : ''}" id="m${i}"${pd.acc ? ` style="--accent:${esc(pd.acc)};--tint:${esc(pd.tint || '')}"` : ''}>
<header>${artImg(t, i)}<div><div class="kicker">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div><h4>${esc(T(pd.title) || T(d.title))}</h4></div>${pd.stamp ? `<span class="mstamp${dayStamped(t, i) ? ' on' : ''}">${esc(pd.stamp)}</span>` : ''}</header>
${facts.length ? `<div class="says">${guide(0)}<div><b>${esc(T((g[0] || {}).name))} ${L('เล่าว่า…', 'says…')}</b><ul>${facts.map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul><button class="mini hearbtn" data-a="sayfacts" data-v="${esc(facts.map((f) => T(f)).join(' '))}">🔊 ${L('อ่านให้ฟัง', 'Read aloud')}</button></div></div>` : ''}
${(pl.quiz || []).length ? `<div class="mquiz"><b>❓ ${L(`${T((g[1] || {}).name)} ถาม…`, `${T((g[1] || {}).name)} asks…`)}</b>${quizHtml(pl.quiz)}</div>` : ''}
${fieldVal(t, `colour.d${i}`, kid) ? `<div class="colsvg sm" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}" title="${L('ภาพที่หนูระบาย', 'My colouring')}"></div>` : ''}
${drawingsOf(t, kid, i).length ? `<div class="mdraw">${drawingsOf(t, kid, i).map((m) => `<button data-a="lb" data-v="${esc(m.id)}" data-t="${esc(t.id)}" aria-label="${L('ภาพที่หนูวาด', 'My drawing')}"><img src="${esc(imgT(m))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
<div class="felt"><span class="label">${L(`วันนี้${name}รู้สึก…`, 'Today I felt…')}</span>${feel.map(([e, lbl]) => `<button data-a="mood" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="${e}" aria-pressed="${mood(i) === e}"${ed ? '' : ' disabled'}><span>${e}</span><small>${lbl}</small></button>`).join('')}</div>
${spots.length ? `<div class="spot"><div class="spothd">${guide(1)}<b>${L(`ภารกิจของ${T((g[1] || {}).name)}: หาให้เจอ!`, `${T((g[1] || {}).name)}'s mission: spot these!`)}</b><span class="label">${n}/${spots.length}</span></div>
<div class="ticks">${spots.map((s) => tickBtn(t, kid, `spot.d${i}.${s.k}`, i, T(s), s.e)).join('')}</div></div>` : ''}
</article>`;
  }).join('');

  // checklists: animals, food (yum / yuck), Master Explorer → certificate
  const lists = (pp.lists || []).map((l) => {
    const items = listItems(l), n = listGot(t, l, kid), goal = l.goal || 0;
    const rated = l.yum || l.stars, note = (it) => `${it.note ? `<small>${esc(T(it.note))}</small>` : ''}${it.say ? `<small class="say">“${esc(it.say)}”</small>` : ''}`;
    const GC = [['#2E7D32', '#E6F6EA'], ['#1565C0', '#E3F2FD'], ['#A16207', '#FFF6D6']];   // Spotted / Rides / Yummy columns, as printed
    const body = l.groups.map((gr, gi) => `<div class="grp"${l.groups.length > 1 ? ` style="--accent:${GC[gi % 3][0]};--tint:${GC[gi % 3][1]}"` : ''}>${gr.title ? `<h5>${esc(gr.e || '')} ${esc(T(gr.title))}</h5>` : ''}<div class="ticks${rated || l.said ? ' food' : ''}">${gr.items.map((it) => rated
      ? `<div class="tick${ticked(t, `${l.key}.${it.k}`, kid) ? ' on' : ''}"><span class="e">${esc(it.e || '')}</span><span class="t">${esc(T(it))}${note(it)}</span>${l.stars ? starBtns(t, kid, `${l.key}.${it.k}`) : yumBtns(t, kid, `${l.key}.${it.k}`)}</div>`
      : l.said && it.speak ? `<div class="sayrow">${tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))}<button class="hearbtn round" data-a="hear" data-v="${esc(it.speak.text)}" data-lang="${esc(it.speak.lang)}" aria-label="🔊 ${esc(it.en)}">🔊</button></div>`
      : tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))).join('')}</div></div>`).join('');
    return `<section class="pp-page plist${l.groups.length > 1 ? ' wide' : ''}" id="pl-${esc(l.key)}"><header><div><div class="kicker">${esc(l.e || '')} ${esc(T(l.sub))}</div><h3>${esc(T(l.title))}</h3></div><span class="count">${n}<small>/${items.length}</small></span></header>
${goal ? `<div class="goal"><div class="bar"><i style="width:${Math.min(100, Math.round((n / goal) * 100))}%"></i></div><span class="label">${n >= goal ? '🎉 ' : ''}${esc(T(l.goalText))}</span></div>` : ''}${body}
${!goal && l.goalText ? `<p class="call calm" style="margin-top:12px">${esc(T(l.goalText))}</p>` : ''}${l.said ? `<p class="label" style="margin-top:8px">${L('ติ๊กเมื่อหนูพูดคำนั้นได้แล้ว', 'Tick it when you have said it!')}</p>` : ''}</section>`;
  }).join('');
  const dc = pp.declaration;
  const declHtml = dc ? `<section class="pp-page decl" id="decl"><header><div><div class="kicker">🛃 ${esc(T(dc.sub))}</div><h3>${esc(T(dc.title))}</h3></div></header>
<p class="label">${esc(T(dc.intro))}</p>
${dc.counts.map((c) => `<div class="dline"><span class="e">${esc(c.e)}</span><span>${esc(T(c.pre))}</span>${ed ? `<input class="field ppf num" inputmode="numeric" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(c.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(c.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${c.k}`] ?? fieldVal(t, `decl.${c.k}`, kid))}" maxlength="6">` : `<b class="num">${esc(fieldVal(t, `decl.${c.k}`, kid)) || '__'}</b>`}<span>${esc(T(c.post))}</span></div>`).join('')}
${dc.texts.map((x) => `<div class="dtext"><span class="label">${esc(T(x.label))}</span>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(x.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(x.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${x.k}`] ?? fieldVal(t, `decl.${x.k}`, kid))}" maxlength="60">` : `<p>${esc(fieldVal(t, `decl.${x.k}`, kid)) || '—'}</p>`}</div>`).join('')}
<div class="declared">${L('แจ้งแล้ว<br>ถูกต้อง', 'DECLARED<br>&amp; TRUE')}<br>★ ${t.date_from.slice(0, 4)} ★</div></section>` : '';
  const cl = (pp.lists || []).find((l) => l.certificate), cert = pp.certificate;
  const earned = certEarned(t, kid);
  const certHtml = cert && cl ? `<section class="pp-page cert${earned ? ' earned' : ''}" id="cert">
<div class="kicker">${L('ใบประกาศเกียรติคุณ', 'Certificate of achievement')}</div><h3>${esc(T(cert.title))}</h3>
${st && st.crest ? `<img class="crest" src="${esc(st.crest)}" alt="">` : stampHtml(t)}<p class="label">${L('ขอมอบให้', 'This certifies that')}</p><div class="cname">${kidFace(kid)} ${esc(name)}</div>
<p>${earned ? esc(T(cert.text)) : L(`ติ๊ก "${T(cl.title)}" อีก ${cl.goal - listGot(t, cl, kid)} ช่อง ใบประกาศนี้จะเป็นของ${name}`, `Tick ${cl.goal - listGot(t, cl, kid)} more in “${T(cl.title)}” and this certificate is ${name}'s`)}</p>
${earned ? `<p class="bye">${esc(T(cert.bye))}</p>` : ''}</section>` : '';

  return `<div class="row ppkids" role="tablist">${ks.map((c) => `<a class="chip" role="tab" href="#/passport/${esc(c.slug)}/${esc(t.id)}" aria-selected="${c.slug === kid}" aria-pressed="${c.slug === kid}">${kidFace(c.slug)} ${esc(kidName(c.slug))}</a>`).join('')}
${ed ? `<button class="chip kidgo" data-a="kidmode" data-v="${esc(kid)}">🧒 ${L('โหมดเด็ก', 'Kid mode')}</button>` : ''}
<span class="sep"></span>${mine.map((x) => `<a class="chip" href="#/passport/${esc(kid)}/${esc(x.id)}" aria-pressed="${x.id === t.id}">${flagsOf(x)} ${esc(T(x.title).split(' · ')[0])}</a>`).join('')}</div>
<div class="pp kid-${esc(kid)}${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)}">
${st ? `<section class="advc" style="--ink:${esc(st.ink)};--hi:${esc(st.hi)};--bgA:${esc(st.bgA)};--bgB:${esc(st.bgB)};--gold:${esc(st.gold)}"><div class="card">
<img class="crest" src="${esc(st.crest)}" alt="">
<div class="kick">${L('พาสปอร์ตนักผจญภัยของเด็กๆ', 'Kids adventure passport')}</div>
<h2>${esc(st.title.replace(new RegExp(`\\s*${st.hl}$`), ''))} <em>${esc(st.hl)}</em></h2>
<p class="sub">${esc(fill(T(st.sub)))}</p>
<div class="guides2">${g.map((x, i) => guide(i)).join('')}</div>
<p class="places">${esc(T(st.places))}</p>
<div class="xbox"><span>${L('นักสำรวจ', 'Explorer')}</span><b>${kidFace(kid)} ${esc(name)}</b></div>
<div class="foot"><span>${L('เลขที่พาสปอร์ต', 'Passport No.')} <b>${esc(fill(pp.code))}</b></span><span>${L('ใช้ได้', 'Valid')} <b>${esc(fmtRange(t))}</b></span></div>
</div></section>` : `<section class="ppc"><span class="emb">${kidArt(kid) ? `<img src="${kidArt(kid)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตนักผจญภัย', 'Adventure Passport')}</b><span class="sub">${esc(short)} · ${flagsOf(t)}</span>
<span class="explorer">★ ${L('นักสำรวจ', 'Explorer')} ★</span><span class="nm">${esc(name)}</span>
<small>${pp.code ? `${L('เลขที่', 'No.')} ${esc(fill(pp.code))} · ` : ''}${L('ใช้ได้', 'Valid')} ${esc(fmtRange(t))}</small></section>`}
<section class="pp-page bio">
<div class="photo">${kidArt(kid) ? `<img src="${kidArt(kid)}" alt="">` : `<span>${esc(k.emoji || '🙂')}</span>`}</div>
<dl>
<div><dt>${L('ชื่อนักสำรวจ', 'Explorer name')}</dt><dd>${esc(name)}</dd></div>
<div><dt>${L('อายุ', 'Age')}</dt><dd>${age ? esc(T(age)) : '—'}</dd></div>
${field('fav_animal', L('สัตว์ที่ชอบที่สุด', 'My favourite animal'), L('เช่น โลมา', 'e.g. dolphin'))}
${field('superpower', L('พลังพิเศษของหนูคือ…', 'My superpower is…'), L('เช่น วิ่งเร็วมาก', 'e.g. running super fast'))}
${field('height_first', L('ส่วนสูง วันแรก', 'My height · Day 1'), 'cm')}
${field('height_last', L(`ส่วนสูง วันที่ ${t.days.length}`, `My height · Day ${t.days.length}`), 'cm')}
</dl>
<div class="mrz" aria-hidden="true">${mrz}</div></section>
${g.length ? `<section class="pp-page guides"><header><div><div class="kicker">${L('ไกด์สองคนของหนู', 'Meet your two guides')}</div><h3>${esc(pp.greeting ? fill(T(pp.greeting)) : L(`สวัสดี ${name}!`, `Hello, ${name}!`))}</h3></div></header>
${g.map((x, i) => `<div class="bubble${i % 2 ? ' r' : ''}">${guide(i)}<div><b>${esc(T(x.name))} ${L('บอกว่า…', 'says…')}</b><p>${esc(fill(T(x.hello)))}</p></div></div>`).join('')}</section>` : ''}
<section class="pp-page visa"><header><div><div class="kicker">${L('วีซ่า', 'Visa')} · ${esc(fmtRange(t))}</div><h3>${flagsOf(t)} ${esc(short)}</h3>
<p class="label">${((t.theme.places || []).map((p) => esc(T(p))).join(' · ')) || esc(T(t.sub))} · ${got}/${t.days.length} ${L('ตรา', 'stamps')}</p></div>${stampHtml(t, false)}</header>
<div class="dstamps">${ds}</div>
<p class="label" style="margin-top:10px">${L('ได้ตราเมื่อวันนั้นมีบันทึก หรือกด "จบวันนี้"', 'A stamp is inked when the day has something recorded or is marked Done')}</p></section>
${pp.pins ? `<section class="pp-page sleep"><header><div><div class="kicker">${L('หมุด', 'Hops')} · ${pp.pins.items.length} · ${esc(T(pp.pins.sub))}</div><h3>📍 ${esc(T(pp.pins.title))}</h3></div></header>
<ol>${pp.pins.items.map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${esc(T(s))}</b><small>${esc(T(s.days))}</small></span><span class="pe">${esc(s.e)}</span></li>`).join('')}</ol></section>`
    : `<section class="pp-page sleep"><header><div><div class="kicker">${L('ที่พัก', 'Hops')} · ${sleepStops(t).length}</div><h3>🛏️ ${L('เรานอนที่ไหนบ้าง', 'Where we sleep')}</h3></div></header>
<ol>${sleepStops(t).map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${esc(s.name)}</b><small>${L('คืนที่', s.days.length > 1 ? 'Days' : 'Day')} ${s.label}</small></span>${artImg(t, s.art)}</li>`).join('')}</ol></section>`}
${pp.map ? `<section class="pp-page mapsec"><header><div><div class="kicker">${L('แผนที่', 'Map')} · ${L('วันที่', 'Day')} ${mapDayOf(t) + 1}</div><h3>🗺️ ${esc(T(pp.map.title))}</h3></div></header>${mapHtml(t, mapDayOf(t), [kid].concat((t.theme.children || []).map((c) => c.slug).filter((s) => s !== kid)), preTrip(t) ? 0 : null)}
<p class="label" style="margin-top:8px">${L('เส้นทึบ = ไปมาแล้ว · แตะหมุดเพื่อฟังชื่อ', 'Solid line = been there · tap a pin to hear its name')}</p></section>` : ''}
</div>
${missions ? `<div class="part">${L('ภารกิจรายวัน', 'Daily missions')} · ${esc(name)}</div><div class="missions" style="${themeStyle(t)}">${missions}</div>` : ''}
<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}">${lists}${declHtml}${certHtml}
<section class="pp-page stkpage"><header><div><div class="kicker">${L('หน้าสติกเกอร์', 'Sticker page')}</div><h3>⭐ ${L(`สติกเกอร์ของ${name}`, `${name}’s stickers`)}</h3></div></header>${stickerBoard(t, kid, false)}
<p class="label" style="margin-top:8px">${L('ได้สติกเกอร์จากภารกิจ เช็กลิสต์ ตราประทับ และประตูเซอร์ไพรส์ · เด็กๆ แปะเองในโหมดเด็ก', 'Stickers come from missions, checklists, stamps and surprise doors · the kids stick them on in kid mode')}</p></section>
<section class="pp-page"><header><div><div class="kicker">${L('เหรียญตรา', 'Badges')}</div><h3>🌟 ${L(`ครั้งแรกของ${name}`, `${name}’s firsts`)}</h3></div></header>
${firsts.length ? `<div class="badges">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>`
    : `<p class="empty">${L('เหรียญจะมาเมื่อพ่อแม่ติ๊ก "ครั้งแรก" ระหว่างทริป', 'Badges appear when the grown-ups tick a “first” on the trip')}</p>`}</section>
${words.length ? `<section class="pp-page"><header><div><div class="kicker">${L('คำพูดของหนู', 'In my own words')}</div><h3>💬 ${L('สิ่งที่หนูพูด', 'Things I said')}</h3></div></header>${words.slice(0, 6).map((e) => quoteCall(e, e.highlight)).join('')}</section>` : ''}
</div>`;
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
<h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart' + (dayStamped(t, i) ? '' : ' off'))}</div></div>
${planHtml(t, i, i === now) ? `<section class="blk planblk">${planHtml(t, i, i === now)}</section>` : ''}

<section class="blk"><h3>📷 ${L('รูป', 'Photos')} <span class="label">${ph.length}</span></h3>
<div class="row"><label class="btn"><input id="fpick" type="file" accept="image/*" multiple hidden data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่มรูป', 'Add photos')}</label><span class="progress" id="prog2"></span></div>
${ph.length ? `<div class="mosaic" style="margin-top:10px">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : ''}</section>

<section class="blk"><h3>💬 ${L('คำพูดน่ารัก', 'Things they said')}</h3>
<div class="row" role="group">${kids.concat('both').map((k) => `<button class="chip" data-a="who" data-v="${k}" aria-pressed="${quoteWho === k}">${kidFace(k)} ${esc(kidName(k))}</button>`).join('')}</div>
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
${kids.map((k) => `<button class="btn ghost small" data-a="customfirst" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}">＋ ${kidFace(k)}</button>`).join('')}</div></section>

${(d.planned || []).length ? `<section class="blk"><h3>📍 ${L('เช็คอินที่ไป & มื้ออาหาร', 'Check in: places & meals')}</h3>
${d.planned.map((p) => `<div class="check"><button data-a="place" data-v="${esc(p.key)}" data-k="${esc(p.kind || 'place')}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${visited.has(p.key)}" aria-label="${esc(T(p))}">${visited.has(p.key) ? '✓' : ''}</button><span class="grow">${p.kind === 'food' ? '🍽️ ' : ''}${esc(T(p))}${p.meal ? ` <small>· ${esc(p.meal)}</small>` : ''}</span></div>`).join('')}</section>` : ''}

${notebookBlock(t, i)}
${storyBlock(t, i)}

<section class="blk"><div class="row"><button class="btn${d.done_at ? ' ghost' : ''}" data-a="done" data-t="${esc(t.id)}" data-d="${i}">${d.done_at ? '✓ ' + L('วันนี้เสร็จแล้ว (แตะเพื่อยกเลิก)', 'Day done (tap to undo)') : L('จบวันนี้ ✓', 'Mark day done ✓')}</button>
<a class="btn ghost" href="#/t/${esc(t.id)}">📖 ${L('ดูในสมุด', 'See it in the book')}</a></div></section>`;
}
