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
    const kt = kidTrip(p[1]) || curTrip(); artTrip = kt;
    document.documentElement.style.cssText = themeStyle(kt); document.documentElement.lang = lang;
    const key = p.slice(0, 3).join('/'), enter = key !== lastView; lastView = key; kidEnter = enter;
    app.innerHTML = `<main class="kidmain${enter ? ' enter' : ''}">${viewKid(p)}</main>`;
    hydrateColours(app); hydrateDraw(app); hydrateMap(app); hydratePager(app);
    return;
  }
  if (p[0] === 'print' && (t = trip(p[1]))) { artTrip = t;   // the memory book: A4 pages for the PDF (and a preview on screen)
    document.documentElement.style.cssText = themeStyle(t); document.documentElement.lang = lang;
    document.body.classList.toggle('serif', t.theme.display === 'serif'); document.body.classList.add('printbook');
    document.title = `${T(t.title)} · ${L('สมุดความทรงจำ', 'Memory book')}`;
    app.innerHTML = viewPrint(t);
    if (typeof hydrateColours === 'function') hydrateColours(app);
    return;
  }
  document.body.classList.remove('printbook');
  if (p[0] === 'cap') {   // deep link from the trip guide: #/cap?t=<trip>&d=<day>&key=<stop>
    const tid = mapLegacy(r.q.get('t')) || (curTrip() || {}).id, d = Math.max(0, (+r.q.get('d') || 0));
    history.replaceState(null, '', `#/t/${encodeURIComponent(tid)}/log/${d}`);
    return render();
  }
  artTrip = (p[0] === 'passport' && trip(p[2])) || curTrip();   // the shelf and the passports dress the kids for the coming trip (or the passport's)
  if (p[0] === 't' && (t = trip(p[1]))) {
    artTrip = t;
    const sec = p[2] || 'hub';
    if (sec === 'log') html = isEditor() ? viewLog(t, Math.min(t.days.length - 1, Math.max(0, +p[3] || 0))) : viewBook(t);
    else if (sec === 'book') html = viewBook(t);
    else if (sec === 'today') html = viewToday(t, p[3] === undefined || p[3] === 'full' ? undefined : +p[3], p.includes('full'));
    else if (sec === 'plan') html = viewPlan(t, p[3] === 'full');
    else if (sec === 'eat') html = viewEat(t);
    else if (sec === 'stays' || sec === 'sos' || sec === 'prep' || sec === 'learn') html = { stays: viewStays, sos: viewSos, prep: viewPrep, learn: viewLearn }[sec](t, p[3] === 'full', p[3] === 'full' && p[4] !== undefined ? +p[4] : undefined);   // glance; /full[/<k>] the report
    else if (sec === 'hearts') html = viewHearts(t);
    else if (sec === 'offline') html = isEditor() ? viewOffline(t) : viewHub(t);
    else if (sec === 'firsts') html = viewFirsts(t);
    else html = viewHub(t);
  } else if (p[0] === 'passport') html = viewPassport(p[1], p[2]);
  else if (p[0] === 'notebook') html = viewNotebook();
  else html = viewShelf();
  document.documentElement.style.cssText = t ? themeStyle(t) : themeStyle(curTrip());
  document.body.classList.toggle('serif', !!(t ? t.theme.display === 'serif' : false));
  document.documentElement.lang = lang;
  document.title = t ? `${T(t.title)} · Memory Bookshelf` : 'Memory Bookshelf';
  const key = p.slice(0, 3).join('/') + (p.includes('full') ? '/full/' + (p[4] || '') : ''), enter = key !== lastView; lastView = key;   // animate only when the page changes, not on every save
  app.innerHTML = topBar(t, p) + `<main class="wrap${enter ? ' enter' : ''}">${offline ? `<div class="notice">${L('ออฟไลน์ — แสดงข้อมูลล่าสุดที่เก็บไว้ บันทึกได้ตามปกติ ระบบจะส่งขึ้นเองเมื่อมีสัญญาณ', 'Offline — showing the last saved copy. You can keep recording; it uploads when you are back online.')}${S.syncedAt ? ` <small>· ${L('ข้อมูลล่าสุดเมื่อ', 'last synced')} ${esc(new Date(S.syncedAt).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</small>` : ''}</div>` : ''}${html}</main>` + tabBar(t, p);
  renderProgress();
  // the photo picker is one input outside #app, so a render while the picker is open cannot replace it and drop the chosen photos
  const fp = document.getElementById('fpick'), host = app.querySelector('[data-fpick]'); if (fp && host) { fp.dataset.t = host.dataset.t; fp.dataset.d = host.dataset.d; }
  if (typeof hydrateColours === 'function') hydrateColours(app);   // kid.js loads after this file
  if (enter && p[3] === 'full' && p[4] !== undefined) { const el = document.getElementById(`pg-${p[2]}-${p[4]}`); if (el) el.scrollIntoView(); }   // a glance card opens the report on its section
  if (enter && p[2] === 'book' && p[3] === 'd') { const el = document.getElementById('d' + p[4]); if (el) el.scrollIntoView(); }   // #/t/<trip>/book/d/<i> opens on that day
}
const mapLegacy = (id) => { const t = trips().find((x) => x.id === id || x.legacy_id === id); return t && t.id; };

function topBar(t, p) {
  const sub = t && p[2] && p[2] !== 'hub';
  const back = t ? `<a class="ibtn" href="${sub ? `#/t/${esc(t.id)}` : '#/'}" aria-label="${sub ? L('เมนูเล่ม', 'Book menu') : L('ชั้นหนังสือ', 'Bookshelf')}">${ic('back')}</a>` : '';
  const secName = sub ? (p[2] === 'log' ? L('บันทึก', 'Record') : secTitle(p[2]) || esc(t.theme.kicker || '')) : '';
  const ttl = t ? `<small>${sub ? secName : esc(t.theme.kicker || '')}</small>${esc(T(t.title))}` : `<small>${L('ของมีมี่และมีก้า', 'Mimi & Mika')}</small>Memory Bookshelf`;
  return `<header class="top"><div class="in">${back}<div class="ttl">${ttl}</div>
<span class="progress" id="prog"></span>
<div class="seg" role="group" aria-label="language"><button data-a="lang" data-v="th" aria-pressed="${lang === 'th'}">ไทย</button><button data-a="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button></div></div></header>`;
}
function tabBar(t, p) {
  const c = t || curTrip(); if (!c) return '';
  const dn = Math.max(0, dayNow(c)), sec = t ? (p[2] || 'hub') : (p[0] === 'passport' ? 'passport' : p[0] === 'notebook' ? 'notebook' : 'shelf');
  const item = (k, href, e, lbl) => `<a href="${href}"${sec === k ? ' aria-current="page"' : ''}><i>${ic(e)}</i>${lbl}</a>`;
  // quick mode: the five most-used stops; everything else is a tile on the book's menu (#/t/<trip>)
  const items = isEditor()
    ? [item('hub', `#/t/${esc(c.id)}`, 'home', L('เมนู', 'Menu')), item('today', `#/t/${esc(c.id)}/today`, 'today', L('วันนี้', 'Today')), item('log', `#/t/${esc(c.id)}/log/${dn}`, 'log', L('บันทึก', 'Record')),
      item('eat', `#/t/${esc(c.id)}/eat`, 'eat', L('ร้านอาหาร', 'Eat')), `<button type="button" data-a="kidmode"><i>${ic('kid')}</i>${L('โหมดเด็ก', 'Kid mode')}</button>`]
    : [item('hub', `#/t/${esc(c.id)}`, 'home', L('เมนู', 'Menu')), item('today', `#/t/${esc(c.id)}/today`, 'today', L('วันนี้', 'Today')), item('book', `#/t/${esc(c.id)}/book`, 'book', L('สมุด', 'Book')),
      item('firsts', `#/t/${esc(c.id)}/firsts`, 'firsts', L('ครั้งแรก', 'Firsts')), item('passport', '#/passport', 'passport', L('พาสปอร์ต', 'Passport'))];
  return `<nav class="bar"><div class="in">${items.join('')}</div></nav>`;
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
<p class="label" style="margin-top:6px">${L('ใส่ PIN ครั้งเดียว เครื่องนี้จะจำไว้ · ญาติใช้ PIN ดูอย่างเดียวที่พ่อแม่ให้ แล้วพิมพ์ชื่อตัวเองในช่อง "ชื่ออื่น"', "Enter the PIN once — this phone remembers it · Relatives use the view-only PIN from Mum or Dad and type their name under “Other name”")}</p></form></div>`;
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
<div class="ppmini">${children().map((k) => { const n = passportStamps(k.slug); return `<a class="ppc s kid-${esc(k.slug)}" href="#/passport/${esc(k.slug)}"><span class="emb">${kidArt(k.slug) ? `<img src="${kidArt(k.slug)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตความทรงจำ', 'Memory Passport')}</b><span class="nm">${esc(kidName(k.slug))}</span><small>${n} ${L('ตราประทับ', n === 1 ? 'stamp' : 'stamps')}</small></a>`; }).join('')}</div>
${isEditor() ? backupCard() : ''}`;
}
// off-site copy kept by the family: one tap downloads everything (data + full photos) as a zip; nags when there is something new since the last one on this phone
function backupCard() {
  const last = ls('last_backup') || 0;
  const items = [...S.entries, ...S.media, ...S.hearts, ...S.reviews];
  const fresh = items.filter((x) => (x.at || 0) > last).length;
  const when = last ? new Date(last).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const line = !items.length ? L('ยังไม่มีบันทึก — เริ่มสำรองเมื่อมีรูปหรือคำพูดแรก', 'Nothing recorded yet — back up once the first photo or quote is in')
    : !last ? L(`ยังไม่เคยสำรองจากเครื่องนี้ · มี ${items.length} รายการ`, `Never backed up from this phone · ${items.length} items`)
      : fresh ? L(`สำรองล่าสุด ${when} · มีของใหม่ ${fresh} รายการ`, `Last backup ${when} · ${fresh} new since`)
        : L(`สำรองล่าสุด ${when} · ครบแล้ว`, `Last backup ${when} · up to date`);
  const warn = items.length && (!last || fresh);
  return `<div class="part">${L('สำรองข้อมูล', 'Backup')} 💾</div>
<button class="nbcard backup${warn ? ' warn' : ''}" data-a="backup"><span class="emb">💾</span><div><b>${L('ดาวน์โหลดสำรองทั้งหมด', 'Download a full backup')}</b><small>${esc(line)}</small><small>${L('ไฟล์ .zip รวมบันทึกและรูปเต็ม เก็บไว้ในคอมหรือไดรฟ์ส่วนตัว อย่าแชร์ลิงก์สาธารณะ', 'A .zip of every record and full-size photo — keep it on a computer or private drive, never a public link')}</small></div><span class="arrow">⬇</span></button>`;
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
  return `<div class="mbook"><section class="cover">
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
<div class="part">${L('เส้นทางของเล่มนี้', 'The route of this book')} <span class="label">· ${L('ตราสีเต็ม = มีบันทึกแล้ว', 'full colour = recorded')}</span></div>
<nav class="journey">${t.days.map((d, i) => {
    const on = dayStamped(t, i), href = dayHasContent(t, i) ? `#d${i}` : edit ? `#/t/${esc(t.id)}/log/${i}` : '';
    const inner = `${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small>`;
    return href ? `<a class="${on ? 'on' : ''}" href="${href}"${href[0] === '#' && href[1] === 'd' ? ` data-a="jump" data-v="${i}"` : ''}>${inner}</a>` : `<span class="${on ? 'on' : ''}">${inner}</span>`;
  }).join('')}</nav>
${favs ? `<div class="part">${L('ช่วงเวลาที่ชอบที่สุด', 'Favourite moments')} ⭐</div>${favs}` : ''}
${firsts.length ? `<div class="part">${L('ครั้งแรกของหนู', 'Firsts')}</div><div class="firsts">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="first got"><span class="e">${esc(f.e)}</span><span class="t">${esc(e.first_key === 'custom' ? e.text : f.t)}<br><small class="muted">${L('วันที่', 'Day')} ${e.day + 1}</small></span><span class="kids">${kidBadge(e.child)}</span></div>`; }).join('')}</div>` : ''}
${drawingsHtml(t)}
${isEditor() && S.features.story && days.length ? storyBlock(t, null)
    : story ? `<div class="part">${L('นิทานของทั้งทริป', 'The story of the trip')}</div><div class="call calm" style="white-space:pre-line">${bedBtn(story)}${esc(story.text)}</div>` : ''}
${days.map((i) => dayPage(t, i)).join('') || `<div class="empty">${castHtml((t.theme.children || []).map((k) => k.slug))}${L('ยังไม่มีบันทึก — ', 'Nothing recorded yet — ')}${edit ? `<a href="#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}">${L('เริ่มบันทึกวันแรก', 'start with a day')}</a>` : L('รอพ่อแม่บันทึกระหว่างทริป', 'the grown-ups will fill it in during the trip')}</div>`}
<div class="row noprint" style="margin:28px 0 8px"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">📕 ${L('สมุดความทรงจำ (PDF A4)', 'Memory book (PDF A4)')}</a><a class="btn ghost small" href="#/print/${esc(t.id)}">👀 ${L('ดูตัวอย่างเล่ม', 'Preview the book')}</a><button class="btn ghost small" data-a="print">🖨️ ${L('พิมพ์หน้านี้', 'Print this page')}</button><button class="btn ghost small" data-a="copytext">📋 ${L('คัดลอกเป็นข้อความ', 'Copy as text')}</button></div></div>`;
}
// the whole plan, day by day, like the manual's day list: every day (recorded or not), where we sleep, the planned stops
function itinerary(t) {
  const now = dayNow(t), edit = isEditor();
  return `<div class="part">${L('แผนการเดินทาง', 'Itinerary')} <span class="label">· ${t.days.length} ${L('วัน', 'days')}</span></div><ol class="itin">${t.days.map((d, i) => {
    const has = dayHasContent(t, i), stops = (d.planned || []).filter((p) => p.kind !== 'food'), food = (d.planned || []).filter((p) => p.kind === 'food');
    const go = has ? `<a class="mini" href="#d${i}" data-a="jump" data-v="${i}">${L('อ่านบันทึก', 'Read')} ›</a>` : edit ? `<a class="mini" href="#/t/${esc(t.id)}/log/${i}">${L('บันทึก', 'Record')}</a>` : '';
    return `<li class="${has ? 'has' : ''}${i === now ? ' now' : ''}">${artImg(t, i)}<div class="grow">
<div class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${has ? ' ✓' : ''}${go}</div>
<h4>${esc(T(d.title))}</h4>
${stops.length ? `<p class="stops">${stops.map((p) => placeA(t, p)).join(' · ')}</p>` : ''}
<p class="label">${d.sleep ? `${L('นอนที่', 'Sleep')} ${d.plan && d.plan.stay ? mapA(d.plan.stay.q || d.plan.stay.addr, esc(T(d.sleep))) : esc(T(d.sleep))}` : ''}${food.length ? ` · ${L('กิน', 'Eat')} ${food.map((p) => placeA(t, p)).join(' · ')}` : ''}</p>${planHtml(t, i, i === now, true)}</div></li>`;
  }).join('')}</ol>`;
}
// the day's plan from the manual (seed → trip_days.plan): timeline, how we move, local pick, plan B, money, tips
const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const extA = (href, label, cls) => `<a class="${cls || 'mini'}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
// a place name that opens Google Maps (full query from the seed; older books fall back to name + country)
const mapA = (q, html) => `<a class="maplink" href="${esc(mapsUrl(q))}" target="_blank" rel="noopener">${html}</a>`;
const placeQ = (t, p) => p.q || [p.en || p.th || p.key, ...((t.theme && t.theme.places) || []).map((x) => x.en)].filter(Boolean).join(', ');
const placeA = (t, p, html) => mapA(placeQ(t, p), html || esc(T(p)));
const legsHtml = (legs) => `<ol class="legs">${legs.map((g) => `<li><span class="lg"><b>${esc(g.from)}</b> → <b>${esc(g.to)}</b></span><span class="by">${esc(T(g.by))}</span>${g.url ? extA(g.url, L('นำทาง', 'Directions') + ' ↗', 'mini nav') : ''}</li>`).join('')}</ol>`;
const pickHtml = (p) => `<li class="pk"><div class="eh"><span class="badge">★ ${esc(T(p.meal))}</span> <b>${mapA(p.q, esc(p.name))}</b> ${extA(mapsUrl(p.q), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}</div><p>${esc(T(p.what))}</p><div class="emeta">${p.pr ? `<span class="pr">${esc(p.pr)}</span>` : ''}${p.alt ? `<span class="alt">${L('สำรอง', 'Backup')}: ${mapA(p.alt.q, esc(p.alt.name) + ' ↗')}${p.alt.pr ? ` · ${esc(p.alt.pr)}` : ''}</span>` : ''}</div></li>`;
const foodHtml = (it) => `<li><b>${mapA(it.q, esc(it.name) + ' ↗')}</b>${it.pick ? ' <span class="tag">★</span>' : ''} <span class="label">${esc(T(it.tag))}${it.pr ? ` · ${esc(it.pr)}` : ''}</span>${T(it.what) ? `<br>${esc(T(it.what))}` : ''}${T(it.note) ? `<br><small>${esc(T(it.note))}</small>` : ''}</li>`;
const TIPK = { warn: 1, tip: 1, info: 1 };   // a tip's kind sets its marker colour (app.css .tips li.tk-*)
function planHtml(t, i, open, wx) {
  const pl = t.days[i].plan || {}, rows = pl.plan || [], dwx = wx && t.days[i].wx;
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  return `<details class="dayplan"${open ? ' open' : ''}><summary>${L('แผนวันนี้', 'Plan for the day')}${rows.length ? ` <span class="label">· ${rows.length} ${L('ช่วง', 'steps')}</span>` : ''}</summary>
<div class="pgrid">${pl.moving || (pl.legs || []).length || pl.route || dwx ? `<aside class="strip"><div class="kicker">${L('การเดินทาง', 'Getting around')}</div>
${pl.moving ? `<p class="moving"><b>${L('เดินทาง', 'Moving')}</b> ${esc(T(pl.moving))}</p>` : ''}
${(pl.legs || []).length ? legsHtml(pl.legs) : ''}
${pl.route ? `<p class="row">${extA(pl.route, ic('route') + ' ' + L('เส้นทางทั้งวันใน Google Maps', "The whole day's route in Google Maps"), 'btn ghost small')}</p>` : ''}
${dwx ? `<div class="wxbox"><div class="kicker">${L('อากาศ', 'Weather')}</div>${esc(T(dwx))}</div>` : ''}</aside>` : ''}<div class="pmain">
${rows.length ? `<ol class="tl plan">${rows.map((r) => `<li><time>${esc(r.t || '')}</time><div>${esc(T(r))}${r.note ? `<small>${esc(T(r.note))}</small>` : ''}</div></li>`).join('')}</ol>` : ''}
${pl.stay ? `<p class="stay"><b>${L('ที่พักคืนนี้', 'Tonight')}</b> ${esc(pl.stay.name)}<br><span class="addr">${esc(pl.stay.addr)}</span> ${extA(mapsUrl(pl.stay.q || pl.stay.addr), L('แผนที่', 'Map') + ' ↗')}</p>` : ''}
${pl.pick ? `<div class="call pick"><span class="lbl">${L('ร้านเด็ดของคนท้องถิ่น', 'Local pick')}</span>${esc(T(pl.pick))}</div>` : ''}
${pl.planB ? `<div class="call warn"><span class="lbl">${L('แผนสำรอง', 'Plan B')}</span>${esc(T(pl.planB))}</div>` : ''}
${pl.money ? `<p class="money"><b>${L('เงินวันนี้', 'Money today')}</b> ${esc(T(pl.money))}</p>` : ''}
${(pl.tips || []).length ? `<ul class="tips">${pl.tips.map((x) => `<li${TIPK[x.kind] ? ` class="tk-${x.kind}"` : ''}>${esc(T(x))}</li>`).join('')}</ul>` : ''}
${(pl.picks || []).length ? `<h5 class="ph">${L('ร้านแนะนำวันนี้ · เน้นร้านคนท้องถิ่น', "Today's picks · locals' places first")} <a class="mini" href="#/t/${esc(t.id)}/eat">${L('ร้านทั้งหมด', 'All places')} ›</a></h5><ul class="picks">${pl.picks.map(pickHtml).join('')}</ul>` : ''}
${(pl.food || []).length ? `<details class="sub"><summary>${L('กินตามเส้นทางวันนี้', "Eat along today's route")} <span class="label">· ${pl.food.reduce((n, f) => n + f.items.length, 0)}</span></summary><p class="label">${L('เรียงตามจุดที่ผ่าน · ★ = ร้านแนะนำ · กดชื่อเพื่อเปิด Google Maps', 'In the order you pass them · ★ = a pick · tap a name for Google Maps')}</p>${pl.food.map((f) => `<h5>${esc(T(f.stop))}</h5><ul class="eats">${f.items.map(foodHtml).join('')}</ul>`).join('')}</details>` : ''}
${eatMore(pl).length ? `<details class="sub"><summary>${L('ร้านอื่นใกล้ๆ', 'More places to eat nearby')} <span class="label">· ${eatMore(pl).length}</span></summary><ul class="eats">${eatMore(pl).map((e) => `<li><b>${e.q ? mapA(e.q, esc(e.name) + ' ↗') : esc(e.name)}</b>${e.pr ? ` <span class="label">${esc(e.pr)}</span>` : ''}${T(e.note) ? `<br><small>${esc(T(e.note))}</small>` : ''}</li>`).join('')}</ul></details>` : ''}
${(pl.learn || []).length ? `<details class="sub"><summary>${L('เรียนรู้ระหว่างทาง', 'Learn on the way')} <span class="label">· ${pl.learn.length}</span></summary>${pl.learn.map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline"><b>${L('เล่าให้เด็กฟัง', 'For the kids')}</b> ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}</details>` : ''}
${(pl.quiz || []).length ? `<details class="sub"><summary>${L('ถามหนูในรถ', 'Quiz in the car')} <span class="label">· ${pl.quiz.length}</span></summary>${quizHtml(pl.quiz)}</details>` : ''}
<p class="label">${L('จากเล่มคู่มือ · ราคาและเวลาเปิดตรวจซ้ำก่อนเดินทาง · เลขจองอยู่ในแอปคู่มือ ไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p></div></div></details>`;
}
// "more nearby" leaves out what the picks and the by-stop list already show
const eatMore = (pl) => { const seen = new Set([...(pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]), ...(pl.food || []).flatMap((f) => f.items.map((x) => x.name))]); return (pl.eat || []).filter((e) => !seen.has(e.name)); };
const quizHtml = (qs) => `<div class="quiz">${qs.map((q) => `<details class="qa"><summary>${esc(T(q.q))}</summary><p>${esc(T(q.a))}</p></details>`).join('')}</div>`;
/* ---------- the hub: one book, its topics as tiles (menu first, the detail on tap) ----------
   Every topic is its own page under #/t/<trip>/<topic>; the quick bar (tabBar) holds the five most used. */
const HUB = { book: ['book', 'สมุดความทรงจำ', 'Memory book'], today: ['today', 'วันนี้', 'Today'], plan: ['plan', 'แผนทั้งทริป', 'Whole trip'], eat: ['eat', 'ร้านอาหาร', 'Places to eat'],
  stays: ['stays', 'ที่พัก', 'Where we stay'], sos: ['sos', 'ฉุกเฉิน', 'Emergency'], prep: ['prep', 'เตรียมตัว', 'Get ready'], learn: ['learn', 'เรียนรู้', 'Learn'],
  firsts: ['firsts', 'ครั้งแรก', 'Firsts'], hearts: ['hearts', 'หัวใจ', 'Hearts'], offline: ['offline', 'ใช้ออฟไลน์', 'Offline'], log: ['log', 'บันทึกวันนี้', 'Record today'] };
const secTitle = (k) => (HUB[k] ? L(HUB[k][1], HUB[k][2]) : '');
// the day a book opens on: today during the trip, day 1 before it, the last day after
function todayIdx(t) { const n = dayNow(t); return n >= 0 ? n : tripOver(t) ? t.days.length - 1 : 0; }
const hasInfo = (t) => {
  const n = t.info || {}, more = (k) => (n.more || []).some((m) => m.page === k);
  return { stays: !!(n.stays || []).length || more('stays'), sos: !!((n.emergency || []).length || n.lost || n.ifthen) || more('sos'),
    prep: !!((n.pack || []).length || n.visa || n.bio || n.car || n.drive || (n.prices && (n.prices.rows || []).length) || (n.ifthen && (n.ifthen.book || n.ifthen.crowd))) || more('prep'),
    learn: !!((n.guide || []).length || (n.general || []).length || (n.wild || []).length || n.eatRules || t.days.some((d) => ((d.plan || {}).learn || []).length || ((d.plan || {}).quiz || []).length)) || more('learn') };
};
function viewHub(t) {
  const n = t.info || {}, st = stats(t), i = todayIdx(t), dn = dayNow(t), until = daysUntil(t), ed = isEditor(), d = t.days[i], has = hasInfo(t);
  const kids = children().filter((k) => !(t.theme.children || []).length || (t.theme.children || []).some((c) => c.slug === k.slug));
  const ages = (t.theme.children || []).map((k) => `${kidName(k.slug)} ${k.age ? T(k.age) : ''}`.trim()).join(' · ');
  const got = t.days.filter((_, j) => dayStamped(t, j)).length, hs = heartsOf(t.id), off = ls('offline_' + t.id);
  const tile = (k, href, status, cls, extra) => `<a class="tile t-${k} ${cls || ''}" href="${href}"><span class="e">${ic(HUB[k][0])}</span><b>${L(HUB[k][1], HUB[k][2])}</b>${status ? `<small>${status}</small>` : ''}${extra || ''}</a>`;
  const todayStatus = dn >= 0 ? L(`วันที่ ${i + 1} จาก ${t.days.length} · ${T(d.title)}`, `Day ${i + 1} of ${t.days.length} · ${T(d.title)}`)
    : until > 0 ? L(`อีก ${until} วัน · เริ่มที่ ${T(d.title)}`, `${until} days to go · starts with ${T(d.title)}`) : L(`จบทริปแล้ว · วันสุดท้าย: ${T(d.title)}`, `Trip over · last day: ${T(d.title)}`);
  const stops = t.days.reduce((a, x) => a + (x.planned || []).filter((p) => p.kind !== 'food').length, 0), tonight = (d.plan || {}).stay;
  const main = (n.emergency || []).find((e) => e.main) || (n.emergency || [])[0];
  const eatN = eatCount(t), picks = eatN ? eatData(t).groups.reduce((a, g) => a + g.items.filter((x) => (x.pick || []).length).length, 0) : 0;
  const learnN = t.days.reduce((a, x) => a + ((x.plan || {}).learn || []).length, 0), quizN = t.days.reduce((a, x) => a + ((x.plan || {}).quiz || []).length, 0);
  const q = (i2) => entriesOf(t.id, i2).filter((e) => e.kind === 'quote').length;
  const tiles = [
    tile('today', `#/t/${esc(t.id)}/today`, esc(todayStatus), 'today' + (dn >= 0 ? ' hi' : ''), artImg(t, i, 'tart')),
    ed ? tile('log', `#/t/${esc(t.id)}/log/${i}`, esc(dayHasContent(t, i) ? L(`${mediaOf(t.id, i).length} รูป · ${q(i)} คำพูด`, `${mediaOf(t.id, i).length} photos · ${q(i)} quotes`) : L('ยังไม่มีบันทึก — แตะเพื่อเริ่ม', 'Nothing yet — tap to start')), 'log') : '',
    tile('book', `#/t/${esc(t.id)}/book`, esc(L(`${st.photos} รูป · ${st.quotes} คำพูด · ตรา ${got}/${t.days.length}`, `${st.photos} photos · ${st.quotes} quotes · ${got}/${t.days.length} stamps`))),
    eatN ? tile('eat', `#/t/${esc(t.id)}/eat`, esc(L(`${eatN} ร้าน · ${picks} ร้านแนะนำ`, `${eatN} places · ${picks} picks`))) : '',
    tile('plan', `#/t/${esc(t.id)}/plan`, esc(L(`${t.days.length} วัน · ${stops} จุดแวะ`, `${t.days.length} days · ${stops} stops`))),
    has.stays ? tile('stays', `#/t/${esc(t.id)}/stays`, esc(tonight ? L(`คืนนี้: ${tonight.name}`, `Tonight: ${tonight.name}`) : L(`${n.stays.length} ที่พัก`, `${n.stays.length} stays`))) : '',
    has.sos ? tile('sos', `#/t/${esc(t.id)}/sos`, esc(main ? `${T(main.label)} · ${main.tel}` : L('ถ้า…ก็…', 'If… then…')), 'sos') : '',
    has.prep ? tile('prep', `#/t/${esc(t.id)}/prep`, esc([(n.pack || []).length && L('จัดกระเป๋า', 'Packing'), n.visa && L('วีซ่า', 'Visa'), n.bio && L('ด่านกักกัน', 'Biosecurity'), n.car && L('รถเช่า', 'The van'), n.ifthen && n.ifthen.book && L('จองล่วงหน้า', 'Book ahead'), n.prices && L('ค่าเข้า', 'Prices')].filter(Boolean).join(' · '))) : '',
    has.learn ? tile('learn', `#/t/${esc(t.id)}/learn`, esc([learnN && L(`${learnN} เรื่อง`, `${learnN} cards`), (n.wild || []).length && (n.wildLabel ? `${T(n.wildLabel.short)} ${n.wild.length}` : L(`สัตว์ ${n.wild.length} ชนิด`, `${n.wild.length} animals`)), quizN && L(`คำถาม ${quizN} ข้อ`, `${quizN} questions`), (n.general || []).length && L('คำศัพท์', 'Words')].filter(Boolean).join(' · '))) : '',
    tile('firsts', `#/t/${esc(t.id)}/firsts`, esc(L(`${st.firsts} ครั้งแรก`, `${st.firsts} firsts`))),
    `<a class="tile" href="#/passport"><span class="e">${ic('passport')}</span><b>${L('พาสปอร์ตเด็กๆ', "Kids' passports")}</b><small>${esc(kids.map((k) => `${kidName(k.slug)} ${t.days.filter((_, j) => dayStamped(t, j) || ticked(t, 'stamp.d' + j, k.slug)).length}`).join(' · '))} ${L('ตรา', 'stamps')}</small></a>`,
    tile('hearts', `#/t/${esc(t.id)}/hearts`, esc(hs.length ? L(`${hs.length} ดวงถึงเด็กๆ`, `${hs.length} for the kids`) : L('ส่งหัวใจถึงเด็กๆ', 'Send the kids a heart'))),
    `<a class="tile" href="#/notebook"><span class="e">${ic('notebook')}</span><b>${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</b><small>${esc(L(`${S.reviews.filter((r) => r.trip === t.id).length} รีวิวในเล่มนี้`, `${S.reviews.filter((r) => r.trip === t.id).length} reviews in this book`))}</small></a>`,
    ed ? tile('offline', `#/t/${esc(t.id)}/offline`, esc(off ? L('เก็บไว้ในเครื่องแล้ว', 'Stored on this phone') : L('ยังไม่ได้เก็บ — กดก่อนขึ้นเครื่อง', 'Not stored yet — tap before the flight')), off ? '' : 'warn') : '',
    ed ? `<button class="tile kid" data-a="kidmode"><span class="e">${ic('kid')}</span><b>${L('โหมดเด็ก', 'Kid mode')}</b><small>${L('ระบายสี วาดรูป ปั๊มตรา แผนที่…', 'Colour, draw, stamp, map…')}</small></button>` : '',
    `<a class="tile shelf" href="#/"><span class="e">${ic('shelf')}</span><b>${L('ชั้นหนังสือ', 'Bookshelf')}</b><small>${L('เปลี่ยนเล่ม', 'Other books')}</small></a>`,
  ].filter(Boolean).join('');
  return `<section class="hubhead">${stampHtml(t, true)}<div class="grow"><div class="kicker">${esc(t.theme.kicker || '')}</div><h1>${esc(T(t.title).split(' · ')[0])}</h1><p class="line">${esc(fmtRange(t))}${ages ? ' · ' + esc(ages) : ''}</p></div></section>
<div class="hubgrid">${tiles}</div>`;
}
// today: the day as one sheet (short timeline, then label → answer rows like the manual's tables); the full plan is one tap away (/today/<i>/full)
function dayGlance(t, i) {
  const d = t.days[i], pl = d.plan || {}, rows = pl.plan || [], full = `#/t/${esc(t.id)}/today/${i}/full`;
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  const money = T(pl.money), mm = money.match(/(?:วันนี้|Today)\s*≈\s*[^·(]+/), nl = (pl.learn || []).length, nq = (pl.quiz || []).length;
  const row = (dt, dd, cls) => `<div${cls ? ` class="${cls}"` : ''}><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const sheet = [
    pl.moving && row(L('เดินทาง', 'Getting around'), esc(brief(T(pl.moving)))),
    pl.stay && row(L('คืนนี้', 'Tonight'), mapA(pl.stay.q || pl.stay.addr, esc(pl.stay.name))),
    pl.pick && row(L('ร้านเด็ด', 'Local pick'), esc(brief(T(pl.pick)))),
    (pl.picks || []).length && row(L('ร้านแนะนำ', "Today's picks"), esc(pl.picks.map((p) => p.name).join(' · '))),
    pl.planB && row(L('แผนสำรอง', 'Plan B'), esc(brief(T(pl.planB))), 'warn'),
    money && row(L('เงินวันนี้', 'Money today'), `<span class="num">${esc(mm ? mm[0].replace(/^(?:วันนี้|Today)\s*/, '').trim() : brief(money))}</span>`),
    d.wx && row(L('อากาศ', 'Weather'), esc(brief(T(d.wx)))),
    (nl || nq) && row(L('เรียนรู้', 'Learn'), esc(L(`${nl} เรื่อง · ${nq} คำถามในรถ`, `${nl} cards · ${nq} car questions`))),
  ].filter(Boolean).join('');
  return `${rows.length ? `<h3 class="gh">${L('ไทม์ไลน์', 'Timeline')}</h3><ol class="tl plan brief">${rows.map((r) => `<li><time>${esc(r.t || '')}</time><div>${esc(brief(T(r), 70))}</div></li>`).join('')}</ol>` : ''}${sheet ? `<h3 class="gh">${L('สรุปของวัน', 'The day in brief')}</h3><dl class="dsheet">${sheet}</dl>` : ''}${reportBtn(full, L('อ่านแผนเต็มของวันนี้', "Read today's full plan"))}`;
}
function viewToday(t, j, full) {
  const i = j !== undefined && j >= 0 && j < t.days.length ? j : todayIdx(t), d = t.days[i], dn = dayNow(t), until = daysUntil(t), pl = d.plan || {};
  const strip = t.days.map((x, k) => `<a href="#/t/${esc(t.id)}/today/${k}${full ? '/full' : ''}" aria-current="${k === i}">${k === dn ? `<span class="today">${L('วันนี้', 'Today')}</span>` : ''}<b>${String(k + 1).padStart(2, '0')}</b><small>${esc(fmtDay(x.date, { day: 'numeric', month: 'short' }))}</small></a>`).join('');
  const banner = dn < 0 && until > 0 ? `<div class="call info">${L(`อีก ${until} วันออกเดินทาง — นี่คือแผนวันที่ ${i + 1}`, `${until} days to go — this is the plan for day ${i + 1}`)}</div>`
    : dn < 0 && until <= 0 ? `<div class="call calm">${L('จบทริปแล้ว — เปิดสมุดความทรงจำได้เลย', 'The trip is over — open the memory book')}</div>` : '';
  const mission = ((t.passport || {}).days || [])[i];
  return `${full ? backSum(`#/t/${esc(t.id)}/today/${i}`) : ''}<div class="daystrip" role="tablist">${strip}</div>
<article class="day today" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div><div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}${i === dn ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}</div><div></div><h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart')}
<div class="meta" style="grid-column:2/3">${d.sleep ? `<b>${L('นอนที่', 'Sleep')}</b> ${esc(T(d.sleep))}` : ''}${d.wx ? ` · ${esc(T(d.wx))}` : ''}</div></div></article>
${banner}
<div class="row quick">${isEditor() ? `<a class="btn" href="#/t/${esc(t.id)}/log/${i}">${ic('log')} ${L('บันทึกวันนี้', 'Record today')}</a>` : ''}${pl.route ? extA(pl.route, ic('route') + ' ' + L('เส้นทางวันนี้', "Today's route"), 'qlink') : ''}${pl.stay ? extA(mapsUrl(pl.stay.q || pl.stay.addr), ic('stays') + ' ' + L('ไปที่พัก', 'To the stay'), 'qlink') : ''}${eatCount(t) ? `<a class="qlink" href="#/t/${esc(t.id)}/eat">${ic('eat')} ${L('ร้านอาหาร', 'Eat')}</a>` : ''}</div>
${(full ? planHtml(t, i, true) : dayGlance(t, i)) || `<div class="empty">${L('วันนี้ไม่มีแผนในคู่มือ', 'No plan in the manual for this day')}</div>`}
${mission && (mission.facts || []).length ? `<div class="part kidm">${L('ภารกิจของเด็กๆ วันนี้', "The kids' mission today")}</div><div class="call pick mission"><b>${esc(T(mission.title))}</b><ul class="tips">${mission.facts.map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul></div>` : ''}`;
}
// the whole trip: one line per day (tap → that day); the road book with every plan is the full report
function viewPlan(t, full) {
  const n = t.info || {};
  if (!full) { const now = dayNow(t), dm = n.drive && infoBlocks(t).meta.prep.find((m) => m.key === 'drive');
    const rows = t.days.map((d, i) => `<li${i === now ? ' class="now"' : ''}><a href="#/t/${esc(t.id)}/today/${i}">${artImg(t, i)}<span class="grow"><span class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${dayHasContent(t, i) ? ` <span class="done">${L('บันทึกแล้ว', 'Recorded')}</span>` : ''}</span><b class="tt">${esc(T(d.title))}</b>${d.sleep ? `<small>${esc(T(d.sleep))}</small>` : ''}</span>${ic('chev')}</a></li>`).join('');
    return `<div class="tp tp-plan glance">${topicHead('plan', L('แตะวันไหนก็ได้เพื่อเปิดแผนของวันนั้น', 'Tap a day to open its plan'))}<ol class="drows">${rows}</ol>${dm ? `<div class="glg">${glc(fullHref(t, 'plan'), dm.title, dm.sub)}</div>` : ''}${reportBtn(fullHref(t, 'plan'), L('แผนทั้งทริปแบบรายงานเต็ม', 'The whole trip as a full report'))}</div>`; }
  return `<div class="tp tp-plan full">${backSum(`#/t/${esc(t.id)}/plan`)}<h1 class="h2">${secTitle('plan')}</h1><p class="lede">${L('ทุกวันของทริป — แตะ "แผนวันนี้" เพื่อดูรายละเอียด · ชื่อสถานที่กดเปิดแผนที่ได้', 'Every day of the trip — open "Plan for the day" for the detail · tap a place for its map')}</p>${itinerary(t)}${n.drive ? `<section class="pocket">${infoBlocks(t).drive}</section>` : ''}</div>`;
}
// the pocket guide, split by topic (seed info → trips.info); each block is an open <details> so a long page still folds
function infoBlocks(t) {
  const n = t.info || {}, B = { stays: [], sos: [], prep: [], learn: [], drive: '', meta: { stays: [], sos: [], prep: [], learn: [] } };
  // every section also leaves a one-line teaser (sub) for the glance page; key names the sections a glance page shows inline
  const pg = (k, sub, key, title, inner) => { title = noEmo(title); B.meta[k].push({ title, sub: sub || '', key: key || '' }); B[k].push(`<details class="pg" open id="pg-${k}-${B[k].length}"><summary>${title}</summary>${inner}</details>`); };
  const sh = (x, len) => esc(brief(T(x), len));
  const tel = (x) => `<a href="tel:${esc(String(x).split('·')[0].replace(/[^+\d]/g, ''))}">${esc(x)}</a>`;   // "number · address" → dial the number only
  const tbl = (cols, rows, cls) => `<div class="tblwrap"><table class="prices ${cls || ''}">${cols ? `<thead><tr>${cols.map((c) => `<th>${esc(T(c))}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.map((r) => `<tr>${r.map((c, k) => `<td${k === 0 ? ' class="nm"' : cols && cols[k] ? ` data-h="${esc(T(cols[k]))}"` : ''}>${esc(typeof c === 'object' ? T(c) : String(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;   // phones stack each row into a card, every value labelled by its column (app.css)
  const lede = (x) => (x && T(x) ? `<p class="lede">${esc(T(x))}</p>` : '');
  const list = (items) => `<ul class="tips">${items.map((x) => `<li>${esc(T(x))}</li>`).join('')}</ul>`;
  // tickable checklist, like the manual's boxes — ticks are a per-phone convenience (localStorage), nothing is sent
  const ckDone = ls('ck') || {};
  const chk = (items, key) => `<ul class="chk">${items.map((x, i) => { const k = `${t.id}.${key}.${i}`; return `<li><label><input type="checkbox" data-ck="${esc(k)}"${ckDone[k] ? ' checked' : ''}><span>${esc(T(x))}</span></label></li>`; }).join('')}</ul>`;
  const packSub = () => { const all = (n.pack || []).flatMap((g, gi) => g.items.map((_, i) => `${t.id}.pack${gi}.${i}`)), got = all.filter((k) => ckDone[k]).length; return esc(L(`จัดแล้ว ${got}/${all.length}`, `${got}/${all.length} packed`)); };
  const cols = (blocks) => `<div class="cols2">${blocks.join('')}</div>`;
  const dl = (rows) => `<dl class="gl">${rows.map((r) => `<div><dt>${esc(T(r.t))}</dt><dd>${esc(T(r.x))}</dd></div>`).join('')}</dl>`;
  // stays — laid out like the manual's "Where we sleep": a night-by-night strip in each stay's colour, then one card per stay
  const SC = ['#6C7A80', '#3E7EA6', '#B98535', '#5E6FA8', '#5B8A6A', '#2E8C8C', '#C9704F', '#2F4E6E', '#8A5A9E', '#A0623A'];
  const nights = t.days.map((d, i) => ({ i, d, s: (d.plan || {}).stay })).filter((x) => x.s || (x.d.sleep && !isHome(x.d.sleep)));
  const runs = []; nights.forEach((x) => { const key = x.s ? x.s.name : T(x.d.sleep), last = runs[runs.length - 1]; if (last && last.key === key) last.n.push(x); else runs.push({ key, n: [x] }); });
  const col = B.col = (r) => SC[r % SC.length], runOf = (x) => runs.findIndex((r) => r.n.includes(x));
  const stayCard = (s, k) => { const [pn, ...pr] = T(s.prop).split(' · ');
    return `<div class="stayc" style="--c:${col(k)}"><div class="sh"><span class="nn">${s.n} ${L('คืน', s.n > 1 ? 'nights' : 'night')}</span><span>${esc(T(s.ci))} → ${esc(T(s.co))}</span></div>
<h4>${esc(T(s.base))}</h4><div class="prop"><b>${esc(pn)}</b>${pr.length ? ` <span>· ${esc(pr.join(' · '))}</span>` : ''}</div>${T(s.why) ? `<p>${esc(T(s.why))}</p>` : ''}${T(s.check) ? `<p class="chk"><b>${L('เช็ค', 'Check')}:</b> ${esc(T(s.check))}</p>` : ''}
<div class="addr">${esc(s.addr)}</div>
<div class="sf">${T(s.status) ? `<span class="st">${esc(T(s.status))}</span>` : ''}<span class="acts">${extA(mapsUrl(s.q || s.addr), L('แผนที่', 'Map') + ' ↗', 'go')}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.q || s.addr)}`, L('นำทาง', 'Directions') + ' ↗', 'go')}<button class="go" data-a="driver" data-t="${esc(t.id)}" data-v="${k}">${ic('car')} ${L('ให้คนขับดู', 'Show the driver')}</button></span></div></div>`; };
  if (nights.length) pg('stays', esc(L(`${nights.length} คืน · ${runs.length} ที่พัก`, `${nights.length} nights · ${runs.length} stays`)), 'strip', `🌙 ${L('คืนต่อคืน', 'Night by night')}`, (B.strip = `<div class="nstripw"><div class="nstrip" style="--n:${nights.length}">${nights.map(({ d }) => `<div class="nd"><b>${esc(fmtDay(d.date, { day: 'numeric' }))}</b><small>${esc(fmtDay(d.date, { weekday: 'short' }))}</small></div>`).join('')}
${runs.map((r, k) => { const st = (n.stays || [])[k], a = nights.indexOf(r.n[0]) + 1; return `<span class="nb" style="grid-column:${a} / span ${r.n.length};--c:${col(k)}" title="${esc(r.key)}">${esc(st ? T(st.base) : r.key)}</span>`; }).join('')}</div></div>`) + `
<p class="label">${L('วันเช็คเอาต์คือเช้าวันที่ออก ไม่ใช่คืนเพิ่ม', 'Check-out is the morning you leave, not an extra night')}</p>
<details class="sub"><summary>${L('รายคืนพร้อมที่อยู่', 'Every night with its address')} <span class="label">· ${nights.length}</span></summary><ol class="nights">${nights.map((x) => { const { i, d, s } = x; return `<li style="--c:${col(runOf(x))}"><b>${L('คืนที่', 'Night')} ${i + 1}</b> <small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small><div>${s ? mapA(s.q || s.addr, esc(s.name)) : esc(T(d.sleep))}${s && s.addr ? `<br><span class="label">${esc(s.addr)}</span>` : ''}</div></li>`; }).join('')}</ol></details>`);
  if ((n.stays || []).length) pg('stays', esc(n.stays.map((x) => T(x.base)).join(' · ')), 'all', `🛏️ ${L('ที่พักทั้งหมด', 'All our stays')} <span class="label">· ${n.stays.length}</span>`, `<div class="stays">${n.stays.map(stayCard).join('')}</div><p class="label">${L('ให้คนขับดูที่อยู่ได้เลย · เลขจองและใบยืนยันอยู่ในแอปคู่มือ', 'Show the driver the address · bookings and confirmations live in the guide app')}</p>`);
  if (n.kit) pg('stays', sh(n.kit.lede), '', `🍳 ${esc(T(n.kit.head))}`, `${lede(n.kit.lede)}${tbl(n.kit.cols, n.kit.rows)}${n.kit.rules ? `<div class="call calm"><span class="lbl">${esc(T(n.kit.rules.title))}</span>${esc(T(n.kit.rules))}</div>` : ''}`);
  // emergency
  // emergency — one card like the manual's back page: the numbers, every night's address for a taxi, the lost-child line
  const tonight = (t.days[todayIdx(t)].plan || {}).stay, tk = (n.stays || []).findIndex((s) => tonight && (s.q === tonight.q || s.addr === tonight.addr));
  const nightsLbl = (r) => { const a = r.n[0].i + 1, z = r.n[r.n.length - 1].i + 1; return a === z ? `${L('คืนที่', 'Night')} ${a}` : `${L('คืนที่', 'Nights')} ${a}–${z}`; };
  if ((n.emergency || []).length || n.lost || runs.length) pg('sos', esc(L(`ทุกเบอร์ + ที่อยู่ทุกคืน`, 'Every number + every night’s address')), 'card', `🆘 ${L('บัตรฉุกเฉิน', 'Emergency card')}`, `<div class="ecard"><h4>${L('บัตรฉุกเฉิน', 'Emergency card')} · ${esc(T(t.title).split(' · ')[0])} · ${esc(fmtRange(t))}</h4>
${(n.emergency || []).length ? `<ul class="emerg">${n.emergency.map((e) => `<li class="${e.main ? 'main' : ''}"><span>${esc(T(e.label))}</span><b>${tel(e.tel)}</b></li>`).join('')}</ul>` : ''}
${runs.length ? `<h5>${L('ที่พักแต่ละคืน — ให้คนขับแท็กซี่ดูได้เลย', 'Each night’s address — show it to any taxi driver')}</h5><ul class="enights">${runs.map((r) => { const s0 = r.n[0].s; return `<li${tonight && s0 && s0.name === tonight.name ? ' class="now"' : ''}><b>${nightsLbl(r)}</b><span>${s0 ? (s0.addr && s0.addr.startsWith(s0.name.split(' ')[0]) ? esc(s0.addr) : `${esc(s0.name)}${s0.addr ? ` · ${esc(s0.addr)}` : ''}`) : esc(r.key)}</span></li>`; }).join('')}</ul>` : ''}
${n.lost ? `<p class="elost">${esc(T(n.lost))}</p>` : ''}</div>`);
  if (tonight) pg('sos', esc(tonight.name), 'tonight', `🛏️ ${L('ที่พักคืนนี้', 'Tonight’s address')}`, B.tonight = `<div class="stayc tonight"><h4>${esc(tonight.name)}</h4><div class="addr">${esc(tonight.addr || '')}</div><div class="sf"><span class="acts">${extA(mapsUrl(tonight.q || tonight.addr), L('แผนที่', 'Map') + ' ↗', 'go')}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(tonight.q || tonight.addr)}`, L('นำทาง', 'Directions') + ' ↗', 'go')}${tk >= 0 ? `<button class="go" data-a="driver" data-t="${esc(t.id)}" data-v="${tk}">${ic('car')} ${L('ให้คนขับดู', 'Show the driver')}</button>` : ''}</span></div></div>`);
  if (n.ifthen) { const f = n.ifthen, sub = (x) => (x ? `<h5>${esc(T(x.head))}</h5>${lede(x.lede)}${tbl(x.cols, x.rows)}` : '');
    pg('sos', sh(f.rows[0] && f.rows[0][0]) + ' …', '', `🔀 ${L('ถ้า… ก็…', 'If… then…')} <span class="label">· ${f.rows.length + ((f.mishap || {}).rows || []).length}</span>`, `${tbl(f.cols, f.rows, 'ift')}${f.mishap ? `<h5>${esc(T(f.mishap.head))}</h5>${lede(f.mishap.lede)}${tbl(f.cols, f.mishap.rows, 'ift')}` : ''}${sub(f.carry)}`);
    if (f.crowd) pg('prep', sh(f.crowd.lede), '', `👥 ${esc(T(f.crowd.head))}`, `${lede(f.crowd.lede)}${tbl(f.crowd.cols, f.crowd.rows)}`);
    if (f.book) pg('prep', sh(f.book.lede), '', `📅 ${esc(T(f.book.head))}`, `${lede(f.book.lede)}${tbl(f.book.cols, f.book.rows)}`); }
  // get ready
  if ((n.pack || []).length) pg('prep', packSub(), 'pack', `🧳 ${L('จัดกระเป๋า', 'Packing')}`, `${cols(n.pack.map((g, gi) => `<div><h5>${esc(T(g.group))}</h5>${chk(g.items, `pack${gi}`)}</div>`))}<p class="label">${L('ติ๊กไว้ในเครื่องนี้เท่านั้น', 'Ticks stay on this phone')}</p>`);
  if (n.prices && (n.prices.rows || []).length) pg('prep', esc(L(`${n.prices.rows.length} รายการ`, `${n.prices.rows.length} items`)), '', `🎟️ ${esc(T(n.prices.head))}`, tbl(n.prices.cols, n.prices.rows));
  if (n.visa) pg('prep', sh(n.visa.lede), '', `🛂 ${L('วีซ่า', 'Visa')}`, `${lede(n.visa.lede)}${cols(n.visa.groups.map((g, gi) => `<div><h5>${esc(T(g.title))}</h5>${chk(g.items, `visa${gi}`)}</div>`))}<h5>${esc(T(n.visa.flow.title))}</h5><ol class="tips">${n.visa.flow.items.map((x) => `<li>${esc(T(x))}</li>`).join('')}</ol>${n.visa.note ? `<div class="call warn">${esc(T(n.visa.note))}</div>` : ''}`);
  if (n.bio) pg('prep', sh(n.bio.lede), '', `🧳 ${L('ด่านกักกันโรค (biosecurity)', 'Biosecurity at the airport')}`, `${lede(n.bio.lede)}${cols(n.bio.groups.map((g) => `<div class="biog ${g.kind === 'never' ? 'no' : 'yes'}"><h5>${esc(T(g.title))}</h5>${list(g.items)}</div>`))}`);
  if (n.car) pg('prep', sh(n.car.lede), '', `🚙 ${L('รถเช่า', 'The van')} · ${esc(T(n.car.title))}`, `${lede(n.car.lede)}${dl(n.car.rows)}${cols(n.car.lists.map((g) => `<div><h5>${esc(T(g.title))}</h5>${list(g.items)}</div>`))}${n.car.fallback ? `<h5>${L('สำรอง', 'Fallback')} · ${esc(T(n.car.fallback.title))}</h5>${dl(n.car.fallback.rows)}` : ''}`);
  if (n.drive) { const dv = n.drive, km = dv.legs.reduce((a, g) => a + g[2], 0);
    const dvt = `${esc(T(dv.title))} <span class="label">· ${dv.legs.length} ${L('ช่วง', 'legs')} · ${km.toLocaleString()} ${L('กม.', 'km')}</span>`;
    B.meta.prep.push({ title: dvt, sub: sh(dv.lede), key: 'drive' });
    B.drive = `<details class="pg" open id="pg-prep-${B.prep.length}"><summary>${dvt}</summary>${lede(dv.lede)}${tbl(dv.cols, dv.legs.map((g) => [L('วันที่ ', 'Day ') + g[0], g[1], g[2], g[3] >= 60 ? `${Math.floor(g[3] / 60)} ${L('ชม.', 'h')} ${String(g[3] % 60).padStart(2, '0')}` : `${g[3]} ${L('นาที', 'min')}`]), 'legs')}${(dv.notes || []).map((x) => `<div class="call info">${x.title ? `<span class="lbl">${esc(T(x.title))}</span>` : ''}${esc(T(x))}</div>`).join('')}</details>`;
    B.prep.push(B.drive); }
  // learn
  if ((n.guide || []).length) pg('learn', esc(n.guide.slice(0, 3).map((g) => T(g.title)).join(' · ')), '', `🧭 ${L('เรื่องที่กำหนดแผนทั้งทริป', 'What shapes this trip')} <span class="label">· ${n.guide.length}</span>`, `<div class="gcards">${n.guide.map((g) => `<div class="gcard"><div class="kicker">${esc(T(g.sub))}</div><b>${esc(T(g.title))}</b><p>${esc(T(g.text))}</p></div>`).join('')}</div>`);
  const learnDays = t.days.map((d, i) => ({ i, d, pl: d.plan || {} })).filter((x) => (x.pl.learn || []).length || (x.pl.quiz || []).length);
  if (learnDays.length) pg('learn', esc(L(`${learnDays.reduce((a, x) => a + (x.pl.learn || []).length, 0)} เรื่อง · ${learnDays.reduce((a, x) => a + (x.pl.quiz || []).length, 0)} คำถาม`, `${learnDays.reduce((a, x) => a + (x.pl.learn || []).length, 0)} cards · ${learnDays.reduce((a, x) => a + (x.pl.quiz || []).length, 0)} questions`)), 'days', `📚 ${L('เรียนรู้ระหว่างทาง · วันต่อวัน', 'Learn on the way · day by day')} <span class="label">· ${learnDays.length} ${L('วัน', 'days')}</span>`, learnDays.map(({ i, d, pl }) => `<details class="sub"><summary>${artImg(t, i)} <b>${L('วันที่', 'Day')} ${i + 1}</b> · ${esc(T(d.title))}</summary>${(pl.learn || []).map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline"><b>${L('เล่าให้เด็กฟัง', 'For the kids')}</b> ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}${(pl.quiz || []).length ? `<h5>${L('ถามหนูในรถ', 'Quiz in the car')}</h5>${quizHtml(pl.quiz)}` : ''}</details>`).join(''));
  if ((n.general || []).length) pg('learn', esc(n.general.map((g) => T(g.theme)).join(' · ')), '', `🗣️ ${L('เรียนรู้ระหว่างนั่งรถ', 'Learn in the car')} <span class="label">· ${n.general.reduce((s, g) => s + g.items.length, 0)}</span>`, `<div class="cols2">${n.general.map((g) => `<div><h5>${esc(T(g.theme))}</h5><dl class="words">${g.items.map((x) => `<div><dt>${esc(T(x.t))}</dt><dd>${esc(T(x.x))}</dd></div>`).join('')}</dl></div>`).join('')}</div>`);
  if ((n.wild || []).length) pg('learn', esc(n.wild.slice(0, 4).map((w) => T(w.name)).join(' · ')) + (n.wild.length > 4 ? ' …' : ''), 'wild', `${n.wildLabel ? `${esc(n.wildLabel.emo || '🐾')} ${esc(T(n.wildLabel.title))}` : `🦘 ${L('สัตว์ที่จะเจอ', 'Animals we may meet')}`} <span class="label">· ${n.wild.length}</span>`, `<div class="wildg">${n.wild.map((w) => `<div class="wc"><span class="we">${esc(w.emo || '🐾')}</span><div><b>${esc(T(w.name))}</b><p>${esc(T(w.text))}</p></div></div>`).join('')}</div>`);
  if (n.eatRules) pg('learn', sh(n.eatRules.lede), '', `🍽️ ${esc(T(n.eatRules.title))}`, `${lede(n.eatRules.lede)}${list(n.eatRules.rules)}<h5>${esc(T(n.eatRules.cookTitle))}</h5>${list(n.eatRules.cook)}`);
  // any other chapter of a manual (getting around, customs, a park touring plan…): one generic block, placed on the page it names
  (n.more || []).forEach((m) => { if (!B[m.page] || m.page === 'drive') return;
    pg(m.page, sh(m.lede), '', `${esc(m.emo || '📄')} ${esc(T(m.title))}`, `${lede(m.lede)}${m.table ? tbl(m.table.cols, m.table.rows) : ''}${(m.rows || []).length ? dl(m.rows) : ''}${((gs) => (gs.length > 1 ? cols(gs.map((x) => `<div>${x}</div>`)) : gs.join('')))((m.groups || []).map((g) => `${g.title && T(g.title) ? `<h5>${esc(T(g.title))}</h5>` : ''}${list(g.items || [])}`))}${m.note && T(m.note) ? `<div class="call info">${esc(T(m.note))}</div>` : ''}`); });
  return B;
}
/* ---------- glance first, the full report one tap away ----------
   A topic opens as a few big answer cards (what you need now, a line each). "📄 Full report" (#/t/<trip>/<topic>/full[/<k>]) is the
   manual-style page; a card opens it with its own section k open and scrolled to. */
const noEmo = (s) => String(s).replace(/^(?:[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]|\s)+/u, '');   // section titles carry no emoji (the manual has none)
const brief = (s, n = 90) => { const x = String(s || '').split(/ — | · |\. |; /)[0].trim(); return x.length > n ? x.slice(0, n - 1).replace(/[\s(,–-]+$/, '') + '…' : x; };
const fullHref = (t, k, j) => `#/t/${esc(t.id)}/${k}/full${j !== undefined ? '/' + j : ''}`;
const reportBtn = (href, label) => `<a class="reportbtn" href="${href}">${ic('doc')}<b>${label || L('อ่านแบบรายงานเต็ม', 'Read the full report')}</b>${ic('chev')}</a>`;
const glc = (href, title, sub, cls) => `<a class="glc${cls ? ' ' + cls : ''}" href="${href}"><span class="gt"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${ic('chev')}</a>`;
const topicHead = (k, lede) => `<h1 class="h2">${secTitle(k)}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}`;
const backSum = (href) => `<a class="backsum" href="${href}">${ic('back')} ${L('กลับไปหน้าสรุป', 'Back to the summary')}</a>`;
const emptyTopic = () => `<div class="empty">${L('เล่มนี้ยังไม่มีข้อมูลส่วนนี้', 'This book has nothing here yet')}</div>`;
// the report: every section of the manual; from a card only that section opens, otherwise a long page (20+ chapters) opens on its first
const topicPage = (t, k, blocks, lede, open) => `<div class="tp tp-${k} full">${backSum(`#/t/${esc(t.id)}/${k}`)}${topicHead(k, lede)}${blocks.length ? `<section class="pocket" id="pocket">${blocks.map((b, i) => ((open !== undefined ? i !== open : blocks.length > 6 && i) ? b.replace('<details class="pg" open', '<details class="pg"') : b)).join('')}</section>` : emptyTopic()}</div>`;
const glancePage = (t, k, B, lede, top, skip) => (B[k].length ? `<div class="tp tp-${k} glance">${topicHead(k, lede)}${top || ''}${((ts) => (ts ? `<div class="glg">${ts}</div>` : ''))(B.meta[k].map((m, j) => (skip.includes(m.key) ? '' : glc(fullHref(t, k, j), m.title, m.sub))).join(''))}${reportBtn(fullHref(t, k))}</div>` : `<div class="tp tp-${k}">${topicHead(k, lede)}${emptyTopic()}</div>`);
function viewStays(t, full, open) {
  const B = infoBlocks(t), n = t.info || {}, lede = L('ทุกที่พักของทริป พร้อมแผนที่และการ์ดที่อยู่ให้คนขับดู', 'Every stay of the trip, with its map and an address card for the driver');
  if (full) return topicPage(t, 'stays', B.stays, lede, open);
  const ton = (t.days[todayIdx(t)].plan || {}).stay;
  const list = (n.stays || []).map((s, k) => { const now = ton && (s.q === ton.q || s.addr === ton.addr);
    return `<div class="sline${now ? ' now' : ''}" style="--c:${B.col(k)}"><div class="g"><span class="nn">${s.n} ${L('คืน', s.n > 1 ? 'nights' : 'night')}</span>${now ? ` <span class="tag">${L('คืนนี้', 'Tonight')}</span>` : ''}<b>${esc(T(s.base))}</b><small>${esc(T(s.prop).split(' · ')[0])} · ${esc(T(s.ci))} → ${esc(T(s.co))}</small></div>
<span class="acts">${extA(mapsUrl(s.q || s.addr), `${ic('pin')}<span class="vh">${L('แผนที่', 'Map')}</span>`, 'go')}<button class="go" data-a="driver" data-t="${esc(t.id)}" data-v="${k}" aria-label="${L('ให้คนขับดู', 'Show the driver')}">${ic('car')}</button></span></div>`; }).join('');
  return glancePage(t, 'stays', B, L('ปุ่มหมุดเปิดแผนที่ · ปุ่มรถแสดงที่อยู่ให้คนขับดู', 'The pin opens the map · the car shows the driver the address'), `${B.strip || ''}${list ? `<div class="slist">${list}</div>` : ''}`, ['strip', 'all']);
}
function viewSos(t, full, open) {
  const B = infoBlocks(t), n = t.info || {}, lede = L('แตะเบอร์เพื่อโทร · ใช้ได้ตอนไม่มีเน็ต', 'Tap a number to call · works offline');
  if (full) return topicPage(t, 'sos', B.sos, lede, open);
  const dial = (x) => String(x).split('·')[0].replace(/[^+\d]/g, '');
  const top = `${(n.emergency || []).length ? `<div class="calls">${n.emergency.map((e) => `<a class="callb${e.main ? ' main' : ''}" href="tel:${esc(dial(e.tel))}"><span class="ce">${ic('phone')}</span><span class="ct"><b>${esc(T(e.label))}</b><small>${esc(e.tel)}</small></span></a>`).join('')}</div>` : ''}
${B.tonight ? `<h3 class="gh">${L('คืนนี้นอนที่', 'Tonight we sleep at')}</h3>${B.tonight}` : ''}${n.lost ? `<div class="call warn lostc">${esc(T(n.lost))}</div>` : ''}`;
  return glancePage(t, 'sos', B, lede, top, ['tonight']);
}
function viewPrep(t, full, open) {
  const B = infoBlocks(t), lede = L('ก่อนออกเดินทางและระหว่างทาง', 'Before we leave and on the way');
  if (full) return topicPage(t, 'prep', B.prep, lede, open);
  const until = daysUntil(t);
  return glancePage(t, 'prep', B, L('แตะหัวข้อเพื่อเปิดรายละเอียด', 'Tap a topic for its detail'), until > 0 ? `<div class="call info">${L(`อีก ${until} วันออกเดินทาง`, `${until} days to go`)}</div>` : '', []);
}
function viewLearn(t, full, open) {
  const B = infoBlocks(t), lede = L('เรื่องเล่าในรถ คำศัพท์ สัตว์ และคำถามสำหรับเด็กๆ', 'Stories for the car, words, animals and questions for the kids');
  if (full) return topicPage(t, 'learn', B.learn, lede, open);
  return glancePage(t, 'learn', B, lede, '', []);
}
const viewHearts = (t) => `<h1 class="h2">${secTitle('hearts')}</h1>${heartsHtml(t)}`;
const viewOffline = (t) => `<h1 class="h2">${secTitle('offline')}</h1><p class="lede">${L('เก็บเล่มนี้ไว้ในเครื่องก่อนขึ้นเครื่องบินหรือลงเรือ แล้วเปิดสมุด แผน ร้านอาหาร พาสปอร์ต และโหมดเด็กได้โดยไม่ต้องมีสัญญาณ', 'Store this book on the phone before the flight or the ferry, then the book, the plans, places to eat, the passports and kid mode all open without signal')}</p>${offlineHtml(t)}
<div class="part">${L('สมุดเล่มพิมพ์', 'The printed book')}</div><div class="row noprint" style="margin:8px 0"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">${L('สมุดความทรงจำ (PDF A4)', 'Memory book (PDF A4)')}</a><a class="btn ghost small" href="#/print/${esc(t.id)}">${L('ดูตัวอย่างเล่ม', 'Preview the book')}</a></div>`;
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
${route.length ? `<aside class="route"><span class="label">${L('ที่ไปวันนี้', 'Getting around')}</span><ol>${route.map((p) => `<li class="${visited.has(p.key) ? 'done' : ''}"><b>${placeA(t, p)}</b>${visited.has(p.key) ? `<small>${L('ไปแล้ว', 'visited')} ✓</small>` : ''}</li>`).join('')}</ol></aside>` : '<div></div>'}
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
  return `<section class="blk offl noprint" id="offl"><h3>${L('ใช้ตอนไม่มีเน็ต', 'Use without signal')}</h3>
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

/* ---------- the memory book (#/print/<trip> → /api/b/pdf/<trip>): the trip as a printed book after it ends ----------
   A4 pages in the manual's language: cover · the trip in numbers + map + where we slept · contents · a page per recorded day
   · firsts · in their own words · a passport spread per child (stamps, badges, Explorer ID, colourings, drawings, stickers,
   certificate) · hearts from the family · the story of the trip · notes for the next trip · back cover. Nothing private
   beyond what the book already holds (no bookings, no passport data). */
function viewPrint(t) {
  const kids = (t.theme.children || []).map((k) => k.slug).filter((k) => children().some((c) => c.slug === k));
  const st = stats(t), days = t.days.map((_, i) => i).filter((i) => dayHasContent(t, i));
  const hearts = heartsOf(t.id), drawings = mediaOf(t.id).filter(isDrawing), story = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === null);
  const quotes = entriesOf(t.id).filter((e) => e.kind === 'quote').sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) || a.at - b.at);
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first').sort((a, b) => a.day - b.day);
  const faves = mediaOf(t.id).filter((m) => m.highlight && !isDrawing(m)).slice(0, 3);
  const short = T(t.title).split(' · ')[0], ages = kids.map((k) => { const a = (t.theme.children || []).find((c) => c.slug === k); return `${kidName(k)}${a && a.age ? ' ' + T(a.age) : ''}`; }).join(' · ');
  const printed = new Date().toLocaleDateString(LOC(), { day: 'numeric', month: 'long', year: 'numeric' });
  const stays = (t.info && t.info.stays) || [];
  const pg = (cls, inner) => `<section class="pg ${cls}">${inner}</section>`;
  const head = (kicker, title) => `<header class="pghd"><div class="kicker">${kicker}</div><h2>${title}</h2></header>`;
  // 1 · cover
  const cover = pg('cover', `<div class="cv"><div class="kicker">${esc(t.theme.kicker || '')}</div>
<h1>${esc(short)}</h1><div class="sub-it">${esc(T(t.sub))}</div>
<p class="line">${esc(fmtRange(t))}${ages ? ' · ' + esc(ages) : ''}</p>
<div class="cvart">${t.days.slice(0, 8).map((_, i) => artImg(t, i)).join('')}</div>
${faves.length ? `<div class="cvph">${faves.map((m) => `<img src="${esc(imgT(m))}" alt="">`).join('')}</div>` : ''}
${castHtml(kids)}${stampHtml(t)}
<p class="cvfoot">${L('สมุดความทรงจำ', 'Memory book')} · Memory Bookshelf · ${esc(printed)}</p></div>`);
  // 2 · the trip in numbers, the map, where we slept
  const facts = [[L('วัน', 'Days'), `${days.length}<small>/${t.days.length}</small>`], [L('รูป', 'Photos'), st.photos], [L('คำพูด', 'Quotes'), st.quotes], [L('ครั้งแรก', 'Firsts'), st.firsts], [L('ที่ไป', 'Places'), st.places]]
    .concat(hearts.length ? [[L('หัวใจจากญาติ', 'Hearts'), hearts.length]] : [], drawings.length ? [[L('ภาพวาด', 'Drawings'), drawings.length]] : []);
  const numbers = pg('numbers', `${head(L('ทริปนี้ในตัวเลข', 'The trip in numbers'), esc(short))}
<div class="facts">${facts.map(([l, v]) => `<div class="fact"><span class="label">${l}</span><b>${v}</b></div>`).join('')}</div>
<nav class="journey">${t.days.map((d, i) => `<span class="${dayStamped(t, i) ? 'on' : ''}">${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small></span>`).join('')}</nav>
${(t.passport || {}).map && typeof mapHtml === 'function' ? `<div class="pmap">${mapHtml(t, t.days.length - 1, kids)}</div>` : ''}
${stays.length ? `<h4>🛏️ ${L('เรานอนที่ไหนบ้าง', 'Where we slept')}</h4><ol class="pstays">${stays.map((s) => `<li><b>${esc(T(s.prop))}</b> <span class="label">${esc(T(s.base))} · ${esc(T(s.ci))} → ${esc(T(s.co))}</span></li>`).join('')}</ol>`
    : sleepStops(t).length ? `<h4>🛏️ ${L('เรานอนที่ไหนบ้าง', 'Where we slept')}</h4><ol class="pstays">${sleepStops(t).map((s) => `<li><b>${esc(s.name)}</b> <span class="label">${L('คืนที่', 'Nights')} ${esc(s.label)}</span></li>`).join('')}</ol>` : ''}`);
  // 3 · contents
  const contents = pg('contents', `${head(L('สารบัญ', 'Contents'), L('วันของเรา', 'Our days'))}<ol class="toc">${t.days.map((d, i) => `<li class="${dayHasContent(t, i) ? 'has' : ''}">${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><span>${esc(T(d.title))}<small>${esc(fmtDay(d.date))}${dayHasContent(t, i) ? '' : ' · ' + L('ไม่มีบันทึก', 'nothing recorded')}</small></span></li>`).join('')}</ol>`);
  // 4 · a page per recorded day (the book's own day page)
  const dayPages = days.map((i) => pg('dayp', dayPage(t, i))).join('');
  // 5 · firsts + 6 · in their own words
  const firstsPg = firsts.length ? pg('firstsp', `${head(L('เหรียญตรา', 'Badges'), L('ครั้งแรกของทริปนี้', 'Firsts on this trip'))}<div class="badges">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${esc(kidName(e.child))} · ${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>`) : '';
  const wordsPg = quotes.length ? pg('wordsp', `${head(L('คำพูดของเด็กๆ', 'In their own words'), L('สิ่งที่หนูพูด', 'Things they said'))}<div class="qgrid">${quotes.map((e) => `<div class="call ${e.highlight ? 'pick' : 'info'}"><div class="who">${kidBadge(e.child)}${esc(kidName(e.child))} · ${L('วันที่', 'Day')} ${e.day + 1}</div><q>${esc(e.text)}</q></div>`).join('')}</div>`) : '';
  // 7 · a passport spread per child
  const ppPages = kids.map((kid) => {
    const name = kidName(kid), pp = t.passport || {}, myFirsts = firsts.filter((e) => e.child === kid), mine = drawingsOf(t, kid), cert = pp.certificate, cl = (pp.lists || []).find((l) => l.certificate);
    const colours = t.days.map((_, i) => i).filter((i) => fieldVal(t, `colour.d${i}`, kid));
    const idRows = [['fav_animal', L('สัตว์ที่ชอบที่สุด', 'Favourite animal')], ['superpower', L('พลังพิเศษ', 'Superpower')], ['height_first', L('ส่วนสูงวันแรก', 'Height on day 1')], ['height_last', L('ส่วนสูงวันสุดท้าย', 'Height on the last day')]].filter(([k]) => fieldVal(t, k, kid));
    return pg('ppp kid-' + kid, `${head(L('พาสปอร์ตนักผจญภัย', 'Adventure passport'), `${kidFace(kid)} ${esc(name)}`)}
<div class="ppcols"><div>
<div class="dstamps">${t.days.map((d, i) => `<div class="dstamp${dayStamped(t, i) ? ' on' : ''}" style="--r:${((i * 37 + t.id.length * 11) % 17) - 8}deg">${artImg(t, i)}<small>${esc(((pp.days || [])[i] || {}).stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small></div>`).join('')}</div>
${idRows.length ? `<dl class="pid">${idRows.map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(fieldVal(t, k, kid))}</dd></div>`).join('')}</dl>` : ''}
${myFirsts.length ? `<div class="badges sm">${myFirsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>` : ''}
</div><div>
${colours.length ? `<div class="pcolours">${colours.slice(0, 6).map((i) => `<div class="colsvg sm" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}"></div>`).join('')}</div>` : ''}
${mine.length ? `<div class="pdraw">${mine.slice(0, 4).map((m) => `<img src="${esc(imgT(m))}" alt="">`).join('')}</div>` : ''}
${typeof stickerBoard === 'function' && stickersPlaced(t, kid).length ? `<div class="pstk">${stickerBoard(t, kid, false)}</div>` : ''}
${cert && cl && certEarned(t, kid) ? `<div class="pcert"><div class="kicker">${L('ใบประกาศเกียรติคุณ', 'Certificate')}</div><b>${esc(T(cert.title))}</b><p>${esc(T(cert.text))}</p></div>` : ''}
</div></div>`);
  }).join('');
  // 8 · hearts · 9 · the story · 10 · for the next trip · 11 · back cover
  const heartsPg = hearts.length ? pg('heartsp', `${head(L('จากครอบครัว', 'From the family'), L('หัวใจถึงเด็กๆ', 'Hearts for the kids'))}<ul class="hlist">${hearts.map((h) => `<li><span class="he">${esc(h.emoji)}</span><div class="grow"><b>${esc(h.from)}</b> → ${esc(kidName(h.child))}${h.text ? `<p>${esc(h.text)}</p>` : ''}<small class="label">${esc(new Date(h.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}</small></div></li>`).join('')}</ul>`) : '';
  const storyPg = story ? pg('storyp', `${head(L('นิทานของทั้งทริป', 'The story of the trip'), esc(short))}<div class="call calm storytxt">${esc(story.text)}</div>`) : '';
  const rs = S.reviews.filter((r) => r.trip === t.id && (r.rating || r.note));
  const notesPg = rs.length ? pg('notesp', `${head(L('บันทึกของพ่อแม่', "Parents' notes"), L('สำหรับทริปหน้า', 'For the next trip'))}<ul class="nblist">${rs.sort((a, b) => (b.rating || 0) - (a.rating || 0)).map((r) => `<li class="nbrow"><div class="nbhead"><span class="st">${r.rating ? starsTxt(r.rating) : '—'}</span><b>${RKIND[r.kind][0]} ${esc(T(r.name))}</b>${kidFaces(r.kids)}</div><div class="label">${(r.tags || []).map((k) => esc(rtagLabel(r.kind, k))).join(' · ')}</div>${r.note ? `<p>${esc(r.note)}</p>` : ''}</li>`).join('')}</ul>`) : '';
  const back = pg('back', `<div class="bk">${castHtml(kids)}<h2>${L('จบเล่ม', 'The end')}</h2><p>${esc(short)} · ${esc(fmtRange(t))}</p><p class="label">${L(`${st.photos} รูป · ${st.quotes} คำพูด · ${st.firsts} ครั้งแรก · บันทึก ${days.length} วัน`, `${st.photos} photos · ${st.quotes} quotes · ${st.firsts} firsts · ${days.length} days recorded`)}</p><p class="label">Memory Bookshelf · ${esc(printed)}</p></div>`);
  return `<div class="pbook noprint-bar"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">⬇ ${L('ดาวน์โหลด PDF', 'Download PDF')}</a><a class="btn ghost small" href="#/t/${esc(t.id)}">‹ ${L('กลับไปสมุด', 'Back to the book')}</a><span class="label">${L('ตัวอย่างสมุดความทรงจำ — หน้า A4 ตามที่จะพิมพ์', 'Memory book preview — A4 pages as they will print')}</span></div>
${cover}${numbers}${contents}${dayPages}${firstsPg}${wordsPg}${ppPages}${heartsPg}${storyPg}${notesPg}${back}`;
}

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
/* ---------- every place to eat on the trip (seed info.restaurants = the manual's "Where to eat"; older books: what the day plans name) ---------- */
let eatQ = '', eatKind = -1, eatPick = false, eatTrip = '';
function eatData(t) {
  const r = (t.info || {}).restaurants;
  if (r && (r.groups || []).length) return r;
  const groups = t.days.map((d, i) => {
    const pl = d.plan || {}, seen = new Set(), items = [], day = { th: `วันที่ ${i + 1}`, en: `Day ${i + 1}` };
    const add = (x) => { if (x && x.name && !seen.has(x.name)) { seen.add(x.name); items.push(x); } };
    (pl.picks || []).forEach((p) => { add({ name: p.name, tag: p.meal, what: p.what, pr: p.pr, q: p.q, pick: [day] }); if (p.alt) add({ name: p.alt.name, pr: p.alt.pr, q: p.alt.q }); });
    (pl.food || []).forEach((f) => f.items.forEach((x) => add({ ...x, where: T(f.stop) })));
    (pl.eat || []).forEach((e) => add(e));
    (d.planned || []).filter((p) => p.kind === 'food').forEach((p) => add({ name: T(p), q: placeQ(t, p), tag: p.meal, pick: [day] }));
    return { area: { th: `วันที่ ${i + 1} · ${d.title.th || d.title.en}`, en: `Day ${i + 1} · ${d.title.en || d.title.th}` }, kind: 0, items };
  }).filter((g) => g.items.length);
  return { kinds: [], groups };
}
const eatCount = (t) => eatData(t).groups.reduce((n, g) => n + g.items.length, 0);
const eatText = (g, x) => [x.name, x.zh, x.where, T(x.tag), (x.tag || {}).en, (x.tag || {}).th, T(x.what), T(x.why), T(x.note), T(g.area)].filter(Boolean).join(' ').toLowerCase();
const eatKindOf = (g, x) => (x.kind !== undefined ? x.kind : g.kind);   // AU: kind per area · HK: kind per place
const eatShow = (g, x) => (eatKind < 0 || eatKindOf(g, x) === eatKind) && (!eatPick || (x.pick || []).length) && (!eatQ || eatText(g, x).includes(eatQ.toLowerCase()));
function viewEat(t) {
  if (eatTrip !== t.id) { eatTrip = t.id; eatQ = ''; eatKind = -1; eatPick = false; }   // filters belong to one book
  const r = eatData(t), all = eatCount(t), kinds = r.kinds || [];
  // one entry, laid out like the manual's "Where to eat" page: name · pin · address · type tag, a line, then price + when
  const card = (g, x) => `<li class="eatc${(x.pick || []).length ? ' pk' : ''}" data-s="${esc(eatText(g, x))}" data-k="${eatKindOf(g, x)}" data-p="${(x.pick || []).length ? 1 : 0}"${eatShow(g, x) ? '' : ' hidden'}>
<div class="eh">${(x.pick || []).map((k) => `<span class="badge">★ ${esc(T(k))}</span> `).join('')}<b>${mapA(x.q || x.name, esc(x.name))}</b>${x.zh ? ` <span class="zh">${esc(x.zh)}</span>` : ''} ${extA(mapsUrl(x.q || x.name), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}${x.where ? `<span class="addr">· ${esc(x.where)}</span>` : ''}${T(x.tag) ? ` <span class="etag t-${esc(x.tk || 'x')}">${esc(T(x.tag))}</span>` : ''}${x.tour ? ` <span class="etag tour">${L('สายนักท่องเที่ยว', 'Tourist spot')}</span>` : ''}</div>
${T(x.what) ? `<p>${esc(T(x.what))}</p>` : ''}${T(x.why) ? `<p class="why"><b>${L('เหมาะกับเด็ก', 'For the kids')}</b> ${esc(T(x.why))}</p>` : ''}
<div class="emeta">${T(x.pr) ? `<span class="pr">${esc(T(x.pr))}</span>` : ''}${T(x.note) ? `<span class="nt">${esc(T(x.note))}</span>` : ''}${T(x.hours) ? `<span class="hr">${esc(T(x.hours))}</span>` : ''}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || x.name)}`, L('นำทาง', 'Directions') + ' ↗', 'go')}</div></li>`;
  const shown = r.groups.reduce((n, g) => n + g.items.filter((x) => eatShow(g, x)).length, 0);
  return `<section class="eatpage"><div class="part">${L('ร้านอาหารทั้งหมด', 'All places to eat')} <span class="label">· ${esc(T(t.title))}</span></div>
${r.lede ? `<p class="lede">${esc(T(r.lede))}</p>` : ''}
<div class="eatbar"><input id="eatq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(eatQ)}" placeholder="${L('ค้นชื่อร้าน ย่าน หรือประเภท เช่น ซีฟู้ด พาย คาเฟ่…', 'Search a name, town or type — seafood, pies, café…')}" aria-label="${L('ค้นร้าน', 'Search')}">
<div class="row chips" role="group"><button class="chip" data-a="eatk" data-v="-1" aria-pressed="${eatKind < 0}">${L('ทั้งหมด', 'All')}</button>${kinds.map((k, i) => `<button class="chip" data-a="eatk" data-v="${i}" aria-pressed="${eatKind === i}">${esc(T(k))}</button>`).join('')}<button class="chip" data-a="eatpick" aria-pressed="${eatPick}">★ ${L('ร้านแนะนำในแผน', 'Picks in the plan')}</button></div>
<p class="label" id="eatn">${L(`แสดง ${shown} จาก ${all} ร้าน`, `Showing ${shown} of ${all}`)}</p></div>
${r.groups.map((g) => `<section class="eatg"${g.items.some((x) => eatShow(g, x)) ? '' : ' hidden'}><h3>${esc(T(g.area))}${kinds[g.kind] && g.kind !== undefined && g.items.every((x) => x.kind === undefined) ? ` <span class="label">· ${esc(T(kinds[g.kind]))}</span>` : ''}</h3>${T(g.note) ? `<p class="label gnote">${esc(T(g.note))}</p>` : ''}<ul class="eatl">${g.items.map((x) => card(g, x)).join('')}</ul></section>`).join('')}
<p class="empty" id="eatnone"${shown ? ' hidden' : ''}>${L('ไม่พบร้านที่ตรงกับคำค้น', 'No place matches')}</p>
<p class="label">${L('จากเล่มคู่มือ · ราคาและเวลาเปิดตรวจซ้ำก่อนไป · กดชื่อร้านเพื่อเปิด Google Maps', 'From the manual · re-check prices and hours · tap a name for Google Maps')}</p></section>`;
}
// filter in place (no re-render: the search box keeps focus and the phone keyboard stays up)
function eatFilter() {
  const q = eatQ.toLowerCase(); let n = 0;
  $$('.eatg').forEach((sec) => {
    let any = false;
    sec.querySelectorAll('.eatc').forEach((li) => { const ok = (eatKind < 0 || +li.dataset.k === eatKind) && (!eatPick || li.dataset.p === '1') && (!q || li.dataset.s.includes(q)); li.hidden = !ok; if (ok) { any = true; n++; } });
    sec.hidden = !any;
  });
  const all = $$('.eatc').length, c = $('#eatn'), none = $('#eatnone');
  if (c) c.textContent = L(`แสดง ${n} จาก ${all} ร้าน`, `Showing ${n} of ${all}`);
  if (none) none.hidden = n > 0;
}
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
<div class="row"><button class="btn" type="button" data-a="pickphotos" data-fpick data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่มรูป', 'Add photos')}</button><span class="progress" id="prog2"></span></div>
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
${d.planned.map((p) => `<div class="check"><button data-a="place" data-v="${esc(p.key)}" data-k="${esc(p.kind || 'place')}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${visited.has(p.key)}" aria-label="${esc(T(p))}">${visited.has(p.key) ? '✓' : ''}</button><span class="grow">${p.kind === 'food' ? '🍽️ ' : ''}${esc(T(p))}${p.meal ? ` <small>· ${esc(p.meal)}</small>` : ''}</span>${extA(mapsUrl(placeQ(t, p)), L('แผนที่', 'Map') + ' ↗', 'mini nav')}</div>`).join('')}</section>` : ''}

${notebookBlock(t, i)}
${storyBlock(t, i)}

<section class="blk"><div class="row"><button class="btn${d.done_at ? ' ghost' : ''}" data-a="done" data-t="${esc(t.id)}" data-d="${i}">${d.done_at ? '✓ ' + L('วันนี้เสร็จแล้ว (แตะเพื่อยกเลิก)', 'Day done (tap to undo)') : L('จบวันนี้ ✓', 'Mark day done ✓')}</button>
<a class="btn ghost" href="#/t/${esc(t.id)}">📖 ${L('ดูในสมุด', 'See it in the book')}</a></div></section>`;
}
