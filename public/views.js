'use strict';
/* ===== Memory Bookshelf · views (render functions return HTML strings) ===== */
const drafts = {};          // text being typed, survives re-renders and syncs
let quoteWho = 'mimi';
let mdayPick = {};   // the passport before the trip: which day's mission is open, per book (a tap on the day chips; survives re-renders)
let lastView = null;

// a shortcut's box on the record page: scrolled into view and lit up; the quote box gets the cursor. Browsers only open the camera,
// the file picker or the microphone from a tap, so the photo / voice buttons are shown big and ready rather than pressed for you.
function goShortcut(what) {
  const el = what === 'photo' ? $('[data-a="pickphotos"]') : what === 'rec' ? $('[data-a="rec"]') : what === 'quote' ? $('#qtext') : null;
  if (!el) return;
  const blk = el.closest('.blk') || el;
  blk.scrollIntoView({ block: 'center' }); blk.classList.add('golit'); setTimeout(() => blk.classList.remove('golit'), 2600);
  if (what === 'quote') el.focus();
}
function curTrip() {
  const ts = trips(); if (!ts.length) return null;
  const live = ts.find((t) => dayNow(t) >= 0); if (live) return live;
  const today = todayIn('Asia/Bangkok');
  return ts.find((t) => t.date_from > today) || ts[ts.length - 1];
}

function render() {
  const app = $('#app');
  if (!S) { app.innerHTML = route().parts[0] === 'privacy' ? `<main class="wrap">${viewPrivacy()}</main>` : loginView(); document.documentElement.style.cssText = ''; return; }
  const r = route(), p = r.parts;
  let t = null, html;
  // kid mode is "locked": while it is on, every route leads back to it (a grown-up holds the lock to leave)
  const km = isEditor() && ls('kidmode');
  // a new family (no children yet) starts at the setup steps until it finishes or skips them
  if (isEditor() && !p[0] && Array.isArray(S.children) && !S.children.length && !ls('startDone')) { location.replace('#/start'); return; }
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
  if (p[0] === 'go') {   // home-screen icon shortcuts (manifest "shortcuts", Android): straight to today's record page, the right box in view
    const ct = curTrip(), what = p[1] || 'today';
    if (!ct) { history.replaceState(null, '', '#/'); return render(); }
    const di = todayIdx(ct), ed = isEditor() && what !== 'today';
    history.replaceState(null, '', ed ? `#/t/${encodeURIComponent(ct.id)}/log/${di}` : `#/t/${encodeURIComponent(ct.id)}/today/${di}`);
    render();
    if (ed) setTimeout(() => goShortcut(what), 60);
    return;
  }
  artTrip = (p[0] === 'passport' && trip(p[2])) || curTrip();   // the shelf and the passports dress the kids for the coming trip (or the passport's)
  if (p[0] === 't' && (t = trip(p[1]))) {
    artTrip = t;
    const sec = p[2] || 'hub';
    if (sec === 'log') html = isEditor() ? viewLog(t, Math.min(t.days.length - 1, Math.max(0, +p[3] || 0)), p[4] === 'ai') : viewBook(t);
    else if (sec === 'book') html = viewBook(t);
    else if (sec === 'today') html = viewToday(t, p[3] === undefined || p[3] === 'full' ? undefined : +p[3], p.includes('full'));
    else if (sec === 'plan') html = viewPlan(t, p[3] === 'full');
    else if (sec === 'eat') html = p[3] === 'all' ? viewEat(t) : viewEatDay(t, p[3] === 'd' ? Math.min(t.days.length - 1, Math.max(0, +p[4] || 0)) : todayIdx(t));   // day by day; /all = every place
    else if (sec === 'stays' || sec === 'sos' || sec === 'prep' || sec === 'learn') html = { stays: viewStays, sos: viewSos, prep: viewPrep, learn: viewLearn }[sec](t, p[3] === 'full', p[3] === 'full' && p[4] !== undefined ? +p[4] : undefined);   // glance; /full[/<k>] the report
    else if (sec === 'search') html = viewSearch(t);
    else if (sec === 'hearts') html = viewHearts(t);
    else if (sec === 'offline') html = isEditor() ? viewOffline(t) : viewHub(t);
    else if (sec === 'firsts') html = viewFirsts(t);
    else if (sec === 'spend') html = isEditor() ? viewSpend(t) : viewHub(t);
    else if (sec === 'photos') html = viewPhotos(t);
    else html = viewHub(t);
  } else if (p[0] === 'passport') html = viewPassport(p[1], p[2]);
  else if (p[0] === 'notebook') html = viewNotebook();
  else if (p[0] === 'viewers' && isEditor()) html = viewViewers();
  else if (p[0] === 'import' && isEditor()) html = viewImport();
  else if (p[0] === 'family' && isEditor()) html = viewFamily();
  else if (p[0] === 'start' && isEditor()) html = viewStart(p);
  else if (p[0] === 'privacy') html = viewPrivacy();
  else if (p[0] === 'emoji' && isEditor()) html = viewEmoji();
  else html = viewShelf();
  document.documentElement.style.cssText = t ? themeStyle(t) : themeStyle(curTrip());
  document.body.classList.toggle('serif', !!(t ? t.theme.display === 'serif' : false));
  document.documentElement.lang = lang;
  document.body.classList.toggle('onb', p[0] === 'start');   // the setup steps have no bottom bar
  document.title = t ? `${T(t.title)} · ${appName()}` : appName();
  const key = p.slice(0, 3).join('/') + (p.includes('full') ? '/full/' + (p[4] || '') : ''), enter = key !== lastView; lastView = key;   // animate only when the page changes, not on every save
  app.innerHTML = topBar(t, p) + `<main class="wrap${enter ? ' enter' : ''}">${offline ? `<div class="notice">${L('ไม่มีเน็ต — บันทึกได้ตามปกติ จะส่งเองเมื่อเน็ตกลับมา', 'Offline — showing the last saved copy. You can keep recording; it uploads when you are back online.')}${S.syncedAt ? ` <small>· ${L('ข้อมูลล่าสุดเมื่อ', 'last synced')} ${esc(new Date(S.syncedAt).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))}</small>` : ''}</div>` : ''}${html}</main>` + tabBar(t, p);
  if (p[0] === 't' && p[2] === 'search' && enter) setTimeout(() => { const q = $('#bookq'); if (q) q.focus(); }, 60);   // a search page opens ready to type
  renderProgress(); packBoxes(app); if (typeof hydrateMap === 'function') hydrateMap(app);   // the passport map walks the kids to a tapped day
  // the photo picker is one input outside #app, so a render while the picker is open cannot replace it and drop the chosen photos
  const fp = document.getElementById('fpick'), host = app.querySelector('[data-fpick]'); if (fp && host) { fp.dataset.t = host.dataset.t; fp.dataset.d = host.dataset.d; }
  if (typeof hydrateColours === 'function') hydrateColours(app);   // kid.js loads after this file
  if (enter && p[3] === 'full' && p[4] !== undefined) setTimeout(() => { const el = document.getElementById(`pg-${p[2]}-${p[4]}`); if (el) el.scrollIntoView(); }, 0);   // after the router's scroll-to-top   // a glance card opens the report on its section
  if (p[2] === 'log' && p[4] === 'ai' ? aiOpened !== location.hash && (aiOpened = location.hash) : (aiOpened = null)) setTimeout(() => { const el = document.getElementById('aipanel'); if (el) { el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); } }, 60);   // the 21:30 reminder: open at tonight's Claude panel
  if (enter && p[2] === 'book' && p[3] === 'd') { const el = document.getElementById('d' + p[4]); if (el) el.scrollIntoView(); }   // #/t/<trip>/book/d/<i> opens on that day
}
// wide screens: today's boxes and the passport's pages go into two columns chosen by their real heights (any language, any day),
// so neither column ends far short of the other
function packBoxes(root) {
  root.querySelectorAll('.cgrid, .pp').forEach((g) => {
    const boxes = [...g.querySelectorAll(':scope > section, :scope > .ccol > section')];
    g.querySelectorAll(':scope > .ccol').forEach((c) => c.remove()); g.classList.remove('packed'); boxes.forEach((b) => g.append(b));
    if (g.clientWidth < (g.classList.contains('pp') ? 858 : 694) || boxes.length < 2) return;
    const h = boxes.map((b) => b.offsetHeight); let best = null;
    for (let m = 0; m < 1 << boxes.length; m++) {
      if (m & 1) continue;   // the first box stays on the left
      const r = h.reduce((n, x, i) => n + (m >> i & 1 ? x : 0), 0), l = h.reduce((n, x) => n + x, 0) - r, cost = Math.max(l, r);
      if (!best || cost < best.cost) best = { m, cost };
    }
    const cols = [0, 1].map(() => { const c = document.createElement('div'); c.className = 'ccol'; return c; });
    boxes.forEach((b, i) => cols[best.m >> i & 1].append(b));
    g.append(...cols); g.classList.add('packed');
  });
}
let packT; addEventListener('resize', () => { clearTimeout(packT); packT = setTimeout(() => packBoxes(document), 150); });
document.addEventListener('toggle', (e) => { if (e.target && e.target.classList && e.target.classList.contains('dmore') && e.target.open) packBoxes(e.target); }, true);   // the day's folded glance: pack once it is open (closed boxes measure 0)
if (document.fonts) document.fonts.ready.then(() => packBoxes(document));
const mapLegacy = (id) => { const t = trips().find((x) => x.id === id || x.legacy_id === id); return t && t.id; };

function topBar(t, p) {
  const sub = t && p[2] && p[2] !== 'hub';
  const up = !t ? null : p[2] === 'today' && p[4] === 'full' ? [`#/t/${esc(t.id)}/today/${esc(p[3])}`, L('วันนี้', 'Today')]
    : ['stays', 'sos', 'prep', 'learn', 'plan'].includes(p[2]) && p[3] === 'full' ? [`#/t/${esc(t.id)}/${p[2]}`, L('หน้าสรุป', 'Summary')]
    : p[2] === 'eat' && p[3] === 'all' ? [`#/t/${esc(t.id)}/eat`, L('ร้านอาหารทีละวัน', 'Places to eat, day by day')]
    : sub ? [`#/t/${esc(t.id)}`, L('เมนูเล่ม', 'Book menu')] : ['#/', L('ชั้นหนังสือ', 'Bookshelf')];
  const back = t ? `<a class="ibtn" href="${up[0]}" aria-label="${up[1]}">${ic('back')}</a>`
    : p && p[0] && p[0] !== 'start' ? `<a class="ibtn" href="#/" aria-label="${L('ชั้นหนังสือ', 'Bookshelf')}">${ic('back')}</a>` : '';
  const secName = sub ? (p[2] === 'log' ? L('บันทึก', 'Record') : secTitle(p[2]) || esc(t.theme.kicker || '')) : '';
  const ttl = t ? `<small>${sub ? secName : esc(t.theme.kicker || '')}</small>${esc(T(t.title).split(' · ').pop())}` : `<small>${esc(kicker())}</small>${esc(appName())}`;   // the place, not the long brand name: it fits a phone's bar
  return `<header class="top"><div class="in">${back}<div class="ttl">${ttl}</div>
<span class="progress" id="prog"></span>${t && sub && p[2] !== 'search' ? `<a class="ibtn" href="#/t/${esc(t.id)}/search" aria-label="${L('ค้นหาทั้งเล่ม', 'Search the whole book')}">${ic('search')}</a>` : ''}</div></header>`;
}
// the language switch (sign-in page, the shelf) and the reading size (the shelf: four Aa of growing size; the sign-in page: one Aa that cycles)
const FS_NAMES = [['ปกติ', 'Normal'], ['ใหญ่', 'Large'], ['ใหญ่มาก', 'Larger'], ['ใหญ่สุด', 'Largest']];
const langSeg = () => `<span class="seg" role="group" aria-label="${L('ภาษา', 'Language')}"><button type="button" data-a="lang" data-v="th" aria-pressed="${lang === 'th'}">ไทย</button><button type="button" data-a="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button></span>`;
const fsSeg = () => { const n = +ls('fs') || 0; return `<span class="seg fsseg" role="group" aria-label="${L('ขนาดตัวอักษร', 'Text size')}">${FS_NAMES.map(([th, en], i) => `<button type="button" data-a="fs" data-v="${i}" data-l="${i}" aria-pressed="${n === i}" aria-label="${L(th, en)}">Aa</button>`).join('')}</span>`; };
// the shelf's "language and text" card — for everyone who signs in, relatives included: the one place these settings live (the top bar stays back · title · search)
function dispCard() {
  const n = +ls('fs') || 0;
  return `<div class="part">${L('ภาษาและตัวอักษร', 'Language and text')}</div>
<div class="setlist disp">
<div class="setrow">${hubE('globe')}<span><b>${L('ภาษา', 'Language')}</b><small>${L('ทั้งแอป เตือนความจำตามภาษานี้ด้วย', 'The whole app; reminders follow it')}</small></span>${langSeg()}</div>
<div class="setrow"><span class="e fse">Aa</span><span><b>${L('ขนาดตัวอักษร', 'Text size')}</b><small id="fsname">${L(FS_NAMES[n][0], FS_NAMES[n][1])}</small></span>${fsSeg()}</div>
</div>`;
}
function tabBar(t, p) {
  const c = t || curTrip(); if (!c) return '';
  const dn = Math.max(0, dayNow(c)), sec = t ? (p[2] || 'hub') : (p[0] === 'passport' ? 'passport' : p[0] === 'notebook' ? 'notebook' : 'shelf');
  const pi = (e) => `<i${HUB_PIC[e] ? ' class="pic"' : ''}>${hubIc(e)}</i>`;   // the same glossy pictures as the book menu
  const item = (k, href, e, lbl) => `<a href="${href}"${sec === k ? ' aria-current="page"' : ''}>${pi(e)}${lbl}</a>`;
  // quick mode: the five most-used stops; everything else is a tile on the book's menu (#/t/<trip>)
  const items = isEditor()
    ? [item('hub', `#/t/${esc(c.id)}`, 'home', L('เมนู', 'Menu')), item('today', `#/t/${esc(c.id)}/today`, 'today', L('วันนี้', 'Today')), item('log', `#/t/${esc(c.id)}/log/${dn}`, 'log', L('บันทึก', 'Record')),
      item('eat', `#/t/${esc(c.id)}/eat`, 'eat', L('ร้านอาหาร', 'Eat')), `<button type="button" data-a="kidmode">${pi('kid')}${L('โหมดเด็ก', 'Kid mode')}</button>`]
    : [item('hub', `#/t/${esc(c.id)}`, 'home', L('เมนู', 'Menu')), item('today', `#/t/${esc(c.id)}/today`, 'today', L('วันนี้', 'Today')), item('book', `#/t/${esc(c.id)}/book`, 'book', L('สมุด', 'Book')),
      item('firsts', `#/t/${esc(c.id)}/firsts`, 'firsts', L('ครั้งแรก', 'Firsts')), item('passport', '#/passport', 'passport', L('พาสปอร์ต', 'Passport'))];
  return `<nav class="bar"><div class="in">${items.join('')}</div></nav>`;
}
function renderProgress() {
  document.querySelectorAll('.upw').forEach((u) => { const h = upBlock(); if (u.outerHTML !== h) u.outerHTML = h; });   // the Wi-Fi box only — never a re-render over typed text
  const el = $('#prog'); if (!el) return;
  const pend = queue.length;
  el.textContent = packing ? L(`เก็บไว้ในเครื่อง ${packing.done}/${packing.total}`, `Storing ${packing.done}/${packing.total}`) : progress ? L(`กำลังอัปโหลด ${Math.min(progress.done + 1, progress.total)}/${progress.total}`, `Uploading ${Math.min(progress.done + 1, progress.total)}/${progress.total}`)
    : heldCount() && heldCount() === pend ? L(`📶 รอ Wi-Fi ${pend}`, `📶 ${pend} for Wi-Fi`)
    : pend ? L(`รอส่ง ${pend}`, `${pend} waiting`) : '';
}

/* ---------- login ---------- */
// PIN login: one field + a big number pad; "who's this?" is optional and remembered on the device
function loginView() {
  const who = ls('name') || '';
  const chips = [['พ่อ', 'Dad', 'dad'], ['แม่', 'Mum', 'mum']].map(([th, en, pic]) => { const v = L(th, en); return `<button type="button" class="chip who" data-a="who-login" data-v="${esc(v)}" aria-pressed="${who === v}"><img src="/art/hub/${pic}.webp" alt="" draggable="false">${esc(v)}</button>`; }).join('');   // the owner's dad and mum faces
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'];
  return `<div class="login"><form id="lf" autocomplete="on">
<div class="loginart" aria-hidden="true">${['/art/hk/day-2.svg', '/art/day-4.svg', '/art/day-13.svg'].map((a, i) => `<img class="art f${i}" src="${a}" alt="">`).join('')}${castHtml(kidArtSlugs())}</div>
<div class="kicker">${L('สมุดความทรงจำ · ส่วนตัว', 'Private family book')}</div>
<h1>${esc(appName()).replace(' ', ' <br>')}</h1><p class="muted">${kicker() ? L(`ความทรงจำ${esc(kicker())} ทุกทริป`, `${esc(kicker())}'s memories, every trip`) : L('ความทรงจำของครอบครัว ทุกทริป', 'Our family memories, every trip')}</p>
<div class="row lwho"><span class="lwl">${L('ใครใช้เครื่องนี้', 'Who is this?')}</span>${chips}<input id="lname" class="field" style="flex:1;min-width:110px" value="${esc(who)}" placeholder="${L('ชื่ออื่น', 'Other name')}" maxlength="24"></div>
<label for="lcode">${L('รหัสครอบครัว', 'Family PIN')}</label>
<input id="lcode" class="field pin" type="password" inputmode="numeric" autocomplete="current-password" required aria-describedby="lerr">
<div class="pinpad" role="group" aria-label="${L('แป้นตัวเลข', 'Number pad')}">${keys.map((k) => `<button type="button" data-a="pin" data-v="${k}" aria-label="${k === 'clear' ? L('ล้าง', 'Clear') : k === 'back' ? L('ลบ', 'Delete') : k}"><img src="/art/keypad/${k}.webp" alt="" draggable="false"></button>`).join('')}</div>
<div class="row lgo"><button class="btn" type="submit">${L('เข้าสมุด', 'Open the shelf')}</button>
<span class="row" style="gap:8px">${langSeg()}<button type="button" class="ibtn fsb" data-a="fs" data-l="${+ls('fs') || 0}" aria-label="${L('ขนาดตัวอักษร', 'Text size')}">Aa</button></span></div>
<div class="err" id="lerr" role="alert"></div>
<p class="label" style="margin-top:6px"><a href="#/privacy">${L('ความเป็นส่วนตัวและข้อมูลของคุณ', 'Privacy and your data')}</a> · ${L('ใส่รหัสครั้งเดียว เครื่องนี้จำไว้ · ญาติใช้รหัสจากพ่อแม่ แล้วพิมพ์ชื่อที่ "ชื่ออื่น"', "Enter the PIN once — this phone remembers it · Relatives use the view-only PIN from Mum or Dad and type their name under “Other name”")}</p></form></div>`;
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
<div class="meta"><span>${flagsOf(t)} ${esc(fmtRange(t))}</span><span>${[st.photos ? `${ic('camera')} ${st.photos}` : '', st.quotes ? `${ic('quote')} ${st.quotes}` : ''].filter(Boolean).join(' · ')}</span></div>
<div class="prog" title="${L('ตราประทับ', 'Stamps')} ${got}/${n}"><i style="width:${n ? Math.round((got / n) * 100) : 0}%"></i></div></a>`;
  }).join('');
  // a new book, both ways in one place: from the trip manual (the helper reads the PDF) or an empty book filled in by hand
  const pdf = S.features.story;
  const add = isEditor() ? `<div class="spine add"><div class="addhd"><b class="addplus" aria-hidden="true">＋</b><div><h3>${L('เล่มใหม่', 'New book')}</h3><small>${pdf ? L('เริ่มได้ 2 แบบ', 'Two ways to start') : L('ทริปใหม่ เล่มใหม่', 'A new trip, a new book')}</small></div></div>
${pdf ? `<a class="addway main" href="#/import"><span class="e">${ic('doc')}</span><span><b>${L('จากคู่มือทริป (PDF)', 'From the trip manual (PDF)')}</b><small>${L('ผู้ช่วยอ่านคู่มือแล้วทำแผนรายวัน ร้าน และหน้าของเด็กให้ · ราว 5–10 นาที', 'The helper reads the manual and makes the day plans, places to eat and the kids’ pages · about 5–10 min')}</small></span><i>›</i></a>` : ''}
${S.trips.some((t) => t.id === 'sakura-hop-2028') ? '' : `<button type="button" class="addway" data-a="sample"><span class="e">${ic('book')}</span><span><b>${L('เล่มตัวอย่าง', 'A sample book')}</b><small>${L('ทริปสมมติ 3 วันที่เติมไว้แล้ว ลบได้ทุกเมื่อ', 'A filled-in 3-day trip, delete it any time')}</small></span><i>›</i></button>`}
<button type="button" class="addway" data-a="newtrip"><span class="e">${ic('log')}</span><span><b>${L('เล่มเปล่า', 'An empty book')}</b><small>${L('ใส่ชื่อทริปกับวันที่ แล้วค่อยเติมเอง', 'Type the trip name and dates, fill it in as you go')}</small></span><i>›</i></button></div>` : '';
  const welcome = isEditor() && !children().length ? `<a class="famwelcome" href="#/start"><span>${ic('family')}</span><div><b>${L('เริ่มที่ครอบครัวของเรา', 'Start with your family')}</b><small>${L('ตั้งชื่อแอป ใส่ชื่อลูก เลือกตัวการ์ตูน — ทุกหน้าจะเป็นของบ้านเรา', "Name the app, add the children and pick each one's character — every page becomes yours")}</small></div></a>` : '';
  return `${remindAsk()}${heroHtml()}${welcome}<div class="part">${L('ชั้นหนังสือ', 'The bookshelf')}</div><h1 class="h2">${L(kicker() ? `ทุกทริป${esc(kicker())}` : 'ทุกทริปของเรา', 'Every trip, one book each')}</h1>
<p class="lede">${L('เติมระหว่างเที่ยว แล้วเปิดอ่านได้อีกหลายปี', 'Fill it in on the road, reread it for years.')}</p>
<div class="shelf">${books}${add}</div>
<div class="part">${L('พาสปอร์ตนักผจญภัย', 'The kids’ passports')} 🛂</div>
<div class="ppmini">${children().map((k) => { const n = passportStamps(k.slug); return `<a class="ppc s kid-${esc(k.slug)}" href="#/passport/${esc(k.slug)}"><span class="emb">${kidArt(k.slug) ? `<img src="${kidArt(k.slug)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตนักผจญภัย', 'Adventure passport')}</b><span class="nm">${esc(kidName(k.slug))}</span><small>${n ? `${n} ${L('ตราประทับ', n === 1 ? 'stamp' : 'stamps')}` : L('ตราประทับรอหนูอยู่', 'Stamps are waiting')}</small></a>`; }).join('')}</div>
<div class="part">${L('สำหรับทริปหน้า', 'For the next trip')} 📓</div>
<a class="nbcard" href="#/notebook"><span class="emb">📓</span><div><b>${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</b><small>${S.reviews.length ? L(`${S.reviews.length} รีวิว · ที่พัก ร้านอาหาร สถานที่ — ไว้วางแผนทริปหน้า`, `${S.reviews.length} reviews · stays, food, places — for planning the next trip`) : L('ให้ดาว ติดแท็ก จดว่าอะไรที่ครอบครัวเราชอบ — ไว้วางแผนทริปหน้า', 'Stars, tags and notes on what worked for our family — for planning the next trip')}</small></div><span class="arrow">›</span></a>
${isEditor() ? backupCard() : ''}
${dispCard()}
${isEditor() ? `<div class="part">${L('ตั้งค่า', 'Settings')} <img class="partpic" src="/art/hub/settings.webp" alt=""></div>
<nav class="setlist">
<a href="#/family">${hubE('family')}<span><b>${L('ครอบครัวของเรา', 'Our family')}</b><small>${L('ชื่อแอป ชื่อลูก และเดือนเกิด', 'App name, the children and their birth months')}</small></span><i>›</i></a>
<a href="#/emoji">${hubE('kid')}<span><b>${L('อีโมจิของเรา', 'Our emoji')}</b><small>${L(`${emoRows().length} รูป เพิ่มหรือลบได้`, `${emoRows().length} pictures, add or delete`)}</small></span><i>›</i></a>
<a href="#/viewers">${hubE('relatives')}<span><b>${L('ญาติที่ดูได้', 'Who can see the books')}</b><small>${L('รหัสและลิงก์ของแต่ละกลุ่มญาติ', 'A code and a link for each group of relatives')}</small></span><i>›</i></a>
<a href="#/privacy">${hubE('settings')}<span><b>${L('ความเป็นส่วนตัวและข้อมูล', 'Privacy and your data')}</b><small>${L('เก็บอะไร ใครเห็น ขอสำเนา หรือลบทั้งหมด', 'What is kept, who sees it, take a copy or delete everything')}</small></span></a>
${aiCard()}</nav>` : ''}
<div class="row end setout"><button class="btn ghost small" data-a="logout">⎋ ${L('ออกจากระบบ', 'Sign out')}</button></div>`;
}
// off-site copy kept by the family: one tap downloads everything (data + full photos) as a zip; nags when there is something new since the last one on this phone
// Claude usage (editors): today's calls against the daily cap + the last 30 days; fetched from /api/b/ai at most once a minute,
// and again right after a Claude button finished (aiUseAt = 0)
let aiUse = null, aiUseAt = 0;
function aiUsage() {
  if (!isEditor() || !S.features.story || !navigator.onLine) return aiUse;
  if (Date.now() - aiUseAt > 60000) { aiUseAt = Date.now(); api('GET', '/api/b/ai').then((r) => { aiUse = r; safeRender(); }, () => {}); }
  return aiUse;
}
const aiToday = () => { const u = aiUsage(); return u ? L(`ผู้ช่วยวันนี้ ${u.today.calls}/${u.limit} ครั้ง`, `Helper today ${u.today.calls}/${u.limit}`) : ''; };
const tok = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(Math.round(n)));
function aiCard() {
  const u = aiUsage(); if (!u) return '';
  const d = u.days30;
  const pct = Math.min(100, Math.round((u.today.calls / Math.max(1, u.limit)) * 100));
  return `<details class="aicard"><summary>${hubE('helper')}<span><b>${L('ผู้ช่วย', 'The helper')}</b><small>${L(`วันนี้ใช้ไป ${u.today.calls} จาก ${u.limit} ครั้ง`, `Used today: ${u.today.calls} of ${u.limit}`)}</small><span class="aibar"><i style="width:${pct}%"></i></span></span><i>›</i></summary>
<div class="aimore"><span>${L('30 วัน', '30 days')}: ${d.calls} ${L('ครั้ง', 'times')} · ${tok(d.tin + d.tcache)} ${L('คำที่อ่าน', 'words read')}${d.tcache ? ` (${L('ซ้ำ', 'repeated')} ${tok(d.tcache)})` : ''} · ${tok(d.tout)} ${L('คำที่เขียน', 'written')}${u.usd30 != null ? ` · ≈ $${u.usd30.toFixed(2)}` : ''}</span>
<small>${L('นับใหม่ทุกวัน · ยอดจริงอยู่ในบัญชีผู้ให้บริการ', 'Starts again each day · the exact bill is in the provider’s account')}</small></div></details>`;
}
function backupCard() {
  const last = ls('last_backup') || 0;
  const items = [...S.entries, ...S.media, ...S.hearts, ...S.reviews];
  const fresh = items.filter((x) => (x.at || 0) > last).length;
  const when = last ? new Date(last).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const line = !items.length ? L('ยังไม่มีบันทึก — ทำสำเนาได้เมื่อมีรูปหรือคำพูดแรก', 'Nothing recorded yet — back up once the first photo or quote is in')
    : !last ? L(`ยังไม่เคยทำสำเนาจากเครื่องนี้ · มี ${items.length} รายการ`, `Never backed up from this phone · ${items.length} items`)
      : fresh ? L(`สำเนาล่าสุด ${when} · มีของใหม่ ${fresh} รายการ`, `Last backup ${when} · ${fresh} new since`)
        : L(`สำเนาล่าสุด ${when} · ครบแล้ว`, `Last backup ${when} · up to date`);
  const warn = items.length && (!last || fresh);
  return `<div class="part">${L('สำเนา', 'Backup')} 💾</div>
<button class="nbcard backup${warn ? ' warn' : ''}" data-a="backup"><span class="emb">💾</span><div><b>${L('ดาวน์โหลดสำเนาทั้งหมด', 'Download a full backup')}</b><small>${esc(line)}</small><small>${L('บันทึกและรูปเต็มทุกรูปในไฟล์เดียว · เก็บในคอมหรือไดรฟ์ส่วนตัว อย่าแชร์ต่อ', 'A .zip of every record and full-size photo — keep it on a computer or private drive, never a public link')}</small></div><span class="arrow">⬇</span></button>`;
}
const artImg = (t, i, cls) => { const a = dayArt(t, i); return a ? `<img class="art${cls ? ' ' + cls : ''}" src="${esc(a)}" alt="" loading="lazy">` : `<span class="art emo${cls ? ' ' + cls : ''}">${esc(t.days[i].emoji || '📍')}</span>`; };
// the kids standing together, as drawn characters (Mimi pulls her wagon, as in the photo)
const castHtml = (slugs) => { const ks = slugs.filter((k) => kidArt(k)); return ks.length ? `<div class="cast" aria-hidden="true">${ks.map((k) => `<img class="who ${esc(k)} ${esc(kidBase(k))}" src="${kidArt(k, true)}" alt="">`).join('')}</div>` : ''; };
// "มีมี่ 3 ขวบ · มีก้า 1 ขวบครึ่ง": each name with its age in a span that never wraps inside (Thai line breaking split a name in two on the book cover)
const agesHtml = (ks) => ks.map((k) => `<span class="nowrap">${esc(kidName(k.slug))}${k.age ? ' ' + esc(T(k.age)) : ''}</span>`).join(' · ');
const flagsOf = (t) => ((t.theme && t.theme.places) || []).map((p) => p.flag).join('');
// "next adventure": a countdown before the trip, today's day during it; nothing once it is over
function heroHtml() {
  const t = curTrip(); if (!t) return '';
  const dn = dayNow(t), until = daysUntil(t);
  if (dn < 0 && until <= 0) return '';
  const kids = (t.theme.children || []).map((k) => `${kidFace(k.slug)} ${esc(kidName(k.slug))}${k.age ? ' ' + esc(T(k.age)) : ''}`).join(' · ');
  const big = dn >= 0 ? `<b>${dn + 1}</b><small>/ ${t.days.length}</small>` : `<b>${until}</b>`;
  const lbl = dn >= 0 ? L('วันที่ของทริป', 'day of the trip') : L(until === 1 ? 'พรุ่งนี้ออกเดินทาง!' : 'วันก่อนออกเดินทาง', until === 1 ? 'day to go — tomorrow!' : 'days to go');
  const go = (dn >= 0 && isEditor() ? `<a class="btn" href="#/t/${esc(t.id)}/log/${dn}">${ic('log')} ${L('บันทึกวันนี้', 'Record today')}</a>` : `<a class="btn" href="#/t/${esc(t.id)}">${ic('book')} ${L('เปิดเล่มนี้', 'Open the book')}</a>`)
    + (dn < 0 && isEditor() && (t.passport || {}).countdown ? ` <button class="btn ghost" data-a="kidmode" data-v="">${ic('gift')} ${L('เด็กๆ เปิดเซอร์ไพรส์วันนี้', "Today's surprise for the kids")}</button>` : '');
  // the day circles: before the trip up to six (evenly through the book — the owner missed the days between); on it today and tomorrow
  const all = t.days.map((_, i) => i), art = dn < 0 ? (all.length <= 6 ? all : Array.from({ length: 6 }, (_, k) => Math.round(k * (all.length - 1) / 5))) : all.filter((i) => i === dn || i === dn + 1).slice(0, 2);
  return `<section class="hero${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)};--hero:${esc(t.theme.accent || '#1F3A5F')}">
<div class="txt"><div class="kicker">${dn >= 0 ? L('ตอนนี้กำลังเที่ยว', 'On the road now') : L('การผจญภัยครั้งต่อไป', 'Next adventure')} ${flagsOf(t)}</div>
<h2>${esc(dn >= 0 ? `${t.days[dn].emoji || ''} ${T(t.days[dn].title)}` : T(t.title).split(' · ')[0])}</h2>
<div class="count">${big}<span>${lbl}</span></div>
${kids ? `<p class="kids">${kids}</p>` : ''}${go}</div>
<div class="float">${art.slice(0, 6).map((i, j) => artImg(t, i, 'f' + j)).join('')}${castHtml((t.theme.children || []).map((k) => k.slug))}</div></section>`;
}
// stamp text is sized to its longest word, so a long place name never breaks mid-word or spills out of the circle
const longWord = (...s) => Math.max(4, ...s.join(' ').split(/\s+/).map((w) => [...w].length));
function stampHtml(t, small) {
  const earned = stampEarned(t), txt = (t.stamp && t.stamp.text) || [T(t.title)];
  return `<div class="stamp${earned ? '' : ' pending'}${small ? ' s' : ''}" title="${earned ? L('ได้ตราประทับแล้ว', 'Stamp earned') : L('ตราประจำทริป — ได้เมื่อจบทุกวัน หรือเมื่อทริปจบ', 'Earned when every day is Done or the trip is over')}">
<div style="--n:${Math.max(4, ...txt.map((x) => [...String(x || '')].length))}">${esc(txt[0] || '')}<b>${esc(t.theme.badge || '📖')}</b>${esc(txt[1] || '')}<br>${esc(txt[2] || '')}</div></div>`;
}

/* ---------- book ---------- */
function viewBook(t) {
  const st = stats(t), kids = (t.theme.children || []);
  const ages = agesHtml(kids);
  const days = t.days.map((d, i) => i).filter((i) => dayHasContent(t, i));
  const favs = favouritesHtml(t), firsts = entriesOf(t.id).filter((e) => e.kind === 'first');
  const story = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === null);
  const edit = isEditor();
  return `<div class="mbook"><section class="cover">
<div class="kicker">${esc(t.theme.kicker || '')}</div>
${stampHtml(t)}
<h1>${esc(T(t.title).split(' · ')[0])}</h1>
<div class="sub-it">${esc(T(t.sub))}</div>
<p class="line">${esc(fmtRange(t))}${ages ? ' · ' + ages : ''}</p>
${(() => { const f = [[L('รูป', 'Photos'), st.photos], [L('คำพูด', 'Quotes'), st.quotes], [L('ครั้งแรก', 'Firsts'), st.firsts], [L('ที่ไป', 'Places'), st.places]].filter(([, v]) => v);   // only what the book holds: never a row of zeros
  return f.length ? `<div class="facts">${f.map(([l, v]) => `<div class="fact"><span class="label">${l}</span><b>${v}</b></div>`).join('')}</div>` : ''; })()}
</section>
<div class="part">${L('เส้นทางของเล่มนี้', 'The route of this book')} <span class="label">· ${L('ตราสีเต็ม = มีบันทึกแล้ว', 'full colour = recorded')}</span></div>
<nav class="journey">${t.days.map((d, i) => {
    const on = dayStamped(t, i), href = dayHasContent(t, i) ? `#d${i}` : edit ? `#/t/${esc(t.id)}/log/${i}` : '';
    const inner = `${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small>`;
    return href ? `<a class="${on ? 'on' : ''}" href="${href}"${href[0] === '#' && href[1] === 'd' ? ` data-a="jump" data-v="#d${i}"` : ''}>${inner}</a>` : `<span class="${on ? 'on' : ''}">${inner}</span>`;
  }).join('')}</nav>
${days.length ? '' : `<div class="empty bookstart">${castHtml((t.theme.children || []).map((k) => k.slug))}<b>${L('เล่มนี้ยังว่าง', 'This book is still empty')}</b>${edit ? `<p>${L('บันทึกคืนละนิด — รูป คำพูด อารมณ์ — แล้วสมุดจะเต็มเอง', 'A little each night — photos, words, moods — and the book fills itself')}</p><a class="btn" href="#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}">${ic('log')} ${L('เริ่มบันทึกวันแรก', 'Record the first day')}</a>` : `<p>${L('รอพ่อแม่บันทึกระหว่างทริป', 'The grown-ups will fill it in during the trip')}</p>`}</div>`}
${foreBlock(t, days.length)}
${favs ? `<div class="part">${L('ช่วงเวลาที่ชอบที่สุด', 'Favourite moments')} ⭐</div>${favs}` : ''}
${firsts.length ? `<div class="part">${L('ครั้งแรกของหนู', 'Firsts')}</div><div class="firsts">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="first got"><span class="e">${esc(f.e)}</span><span class="t">${esc(e.first_key === 'custom' ? e.text : f.t)}<br><small class="muted">${L('วันที่', 'Day')} ${e.day + 1}</small></span><span class="kids">${kidBadge(e.child)}</span></div>`; }).join('')}</div>` : ''}
${drawingsHtml(t)}
${isEditor() && S.features.story && days.length ? storyBlock(t, null)
    : story ? `<div class="part">${L('นิทานของทั้งทริป', 'The story of the trip')}</div><div class="call calm" style="white-space:pre-line">${bedBtn(story)}${esc(story.text)}</div>` : ''}
${letterBlock(t, days.length)}
${days.map((i) => dayPage(t, i)).join('')}
${days.length ? printSet(t) : ''}<div class="row noprint" style="margin:28px 0 8px"${days.length ? '' : ' hidden'}><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">📕 ${L('สมุดความทรงจำ (PDF A4)', 'Memory book (PDF A4)')}</a><a class="btn ghost small" href="#/print/${esc(t.id)}">👀 ${L('ดูตัวอย่างเล่ม', 'Preview the book')}</a></div>
<div class="row noprint bookmore"${days.length ? '' : ' hidden'}><button class="linkbtn" data-a="print">${L('พิมพ์หน้านี้', 'Print this page')}</button><span class="label">·</span><button class="linkbtn" data-a="copytext">${L('คัดลอกเป็นข้อความ', 'Copy as text')}</button></div></div>`;
}
// the whole plan, day by day, like the manual's day list: every day (recorded or not), where we sleep, the planned stops
function itinerary(t) {
  const now = dayNow(t), edit = isEditor(), lk = infoBlocks(t).meta.learn.findIndex((m) => m.key === 'days');
  const seen = new Map(); t.days.forEach((d) => String(T((d.plan || {}).money) || '').split(/\s+·\s+/).map((r) => r.trim()).filter((r) => r && !MONEY_AMT.test(r)).forEach((r) => seen.set(r, (seen.get(r) || 0) + 1)));
  const common = new Set([...seen].filter(([, c]) => c > 1).map(([r]) => r));   // said once, at the foot
  return `<div class="part">${L('แผนการเดินทาง', 'Itinerary')} <span class="label">· ${t.days.length} ${L('วัน', 'days')}</span></div><ol class="itin">${t.days.map((d, i) => {
    const has = dayHasContent(t, i), stops = (d.planned || []).filter((p) => p.kind !== 'food'), food = (d.planned || []).filter((p) => p.kind === 'food');
    const go = has ? `<a class="mini" href="#d${i}" data-a="jump" data-v="#d${i}">${L('อ่านบันทึก', 'Read')} ›</a>` : edit ? `<a class="mini" href="#/t/${esc(t.id)}/log/${i}">${L('บันทึก', 'Record')}</a>` : '';
    return `<li class="${has ? 'has' : ''}${i === now ? ' now' : ''}">${artImg(t, i)}<div class="grow">
<div class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${has ? ' ✓' : ''}${go}</div>
<h4>${esc(T(d.title))}</h4>
${stops.length ? `<p class="stops">${stops.map((p) => placeA(t, p)).join(' · ')}</p>` : ''}
${((sl, fd) => (sl || fd ? `<p class="label">${[sl, fd].filter(Boolean).join(' · ')}</p>` : ''))(d.sleep && !(d.plan && d.plan.stay) ? `${L('นอนที่', 'Sleep')} ${esc(T(d.sleep))}` : '', food.length ? `${L('กิน', 'Eat')} ${food.map((p) => placeA(t, p)).join(' · ')}` : '')}${planHtml(t, i, i === now, true, { full: true, learn: lk >= 0 ? `#/t/${esc(t.id)}/learn/full/${lk}` : '', eat: `#/t/${esc(t.id)}/eat/d/${i}`, skipNotes: common })}</div></li>`;
  }).join('')}</ol>${[...common].map((x) => `<p class="label manualnote">${L('เงินทุกวัน', 'Money, every day')}: ${esc(x)}</p>`).join('')}<p class="label manualnote">${L('จากคู่มือ · ราคาและเวลาเปิดเช็กซ้ำก่อนไป · เลขจองไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p>`;
}
// the day's plan from the manual (seed → trip_days.plan): timeline, how we move, local pick, plan B, money, tips
// an address for a driver: "33 Pak Yan Road · 挪亞方舟度假酒店 · 馬灣珀欣路33號" — a line per piece, the Chinese ones larger
const addrHtml = (a) => { const x = String(a || ''), p = x.split(/\s+·\s+/); return p.length > 1 && /[\u3400-\u9FFF]/.test(x) ? `<span class="cjk">${p.map((y) => `<span${/[\u3400-\u9FFF]/.test(y) ? ' class="zh"' : ''}>${esc(y)}</span>`).join('')}</span>` : esc(x); };
const durTxt = (m) => (m < 60 ? `${m} ${L('นาที', 'min')}` : `${Math.floor(m / 60)} ${L('ชม.', 'h')}${m % 60 ? ` ${m % 60}${L(' นาที', '')}` : ''}`);   // docs/STYLE.md §5: 50 นาที · 1 ชม. · 1 ชม. 5 นาที
const nightAddr = (nm, ad) => { nm = String(nm || ''); ad = String(ad || ''); const head = nm.split(/\s+/).slice(0, 2).join(' ');
  if (ad && head && ad.startsWith(head)) { const k = ad.search(/,\s|\s·\s/); return k > 0 ? `<b>${esc(ad.slice(0, k))}</b><small>${addrHtml(ad.slice(k).replace(/^[\s,·]+/, ''))}</small>` : `<b>${esc(ad)}</b>`; }
  return `<b>${esc(nm)}</b>${ad ? `<small>${addrHtml(ad)}</small>` : ''}`; };
const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const extA = (href, label, cls) => `<a class="${cls || 'mini'}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
// a place name that opens Google Maps (full query from the seed; older books fall back to name + country)
const mapA = (q, html) => `<a class="maplink" href="${esc(mapsUrl(q))}" target="_blank" rel="noopener">${html}</a>`;
const placeQ = (t, p) => p.q || [p.en || p.th || p.key, ...((t.theme && t.theme.places) || []).map((x) => x.en)].filter(Boolean).join(', ');
const placeA = (t, p, html) => mapA(placeQ(t, p), html || esc(T(p)));
const legsHtml = (legs) => `<ol class="legs">${legs.map((g) => `<li><span class="lg"><b>${esc(g.from)}</b> → <b>${esc(g.to)}</b></span><span class="by">${esc(T(g.by))}</span>${g.url ? extA(g.url, L('นำทาง', 'Directions') + ' ↗', 'mini nav') : ''}</li>`).join('')}</ol>`;
const pickHtml = (p) => `<li class="pk"><div class="eh"><span class="badge">★ ${esc(T(p.meal))}</span> <b>${p.q ? mapA(p.q, esc(p.name)) : esc(p.name)}</b> ${p.q ? extA(mapsUrl(p.q), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink') : ''}</div><p>${esc(T(p.what))}</p><div class="emeta">${p.pr ? `<span class="pr">${esc(T(p.pr))}</span>` : ''}${p.alt ? `<span class="alt">${L('ร้านสำรอง', 'Backup')}: ${p.alt.q ? mapA(p.alt.q, esc(p.alt.name) + ' ↗') : esc(p.alt.name)}${p.alt.pr ? ` · ${esc(T(p.alt.pr))}` : ''}${T(p.alt.what) ? ` — ${esc(T(p.alt.what))}` : ''}</span>` : ''}</div></li>`;
const foodHtml = (it) => `<li><b>${mapA(it.q, esc(it.name) + ' ↗')}</b>${it.pick ? ' <span class="tag">★</span>' : ''} <span class="label">${esc(T(it.tag))}${it.pr ? ` · ${esc(T(it.pr))}` : ''}</span>${T(it.what) ? `<br>${esc(T(it.what))}` : ''}${T(it.note) ? `<br><small>${esc(T(it.note))}</small>` : ''}</li>`;
const TIPK = { warn: 1, tip: 1, info: 1 };
/* the manual's long sentences, made skimmable: points() cuts a paragraph at top-level ". ", "; " and " · " (never inside brackets),
   then any piece still long at " — " or ": " (Thai paragraphs rarely have full stops). pts() shows one point as a line and several as a list. */
// No lookbehind in these patterns: Safari before 16.4 (iPadOS 15 on an iPad mini 4 / Air 2, early iPadOS 16) refuses the whole file
// over a single lookbehind group, and the app shows nothing. The checks below look back by hand — same splits as the old patterns.
const PT_ABBR = /(?:^|[\s(])(?:[A-Z]|St|Mt|Dr|Mr|Mrs|Ms|No|Nos|Rd|Ave|approx|vs|e\.g|i\.e)\.$/;
// split a manual line into points: after a sentence's stop ("…late. Then") or a semicolon, never after an initial or a short title,
// and at a " · " — the whitespace goes, as String.split with the old pattern did
function splitPoints(t) {
  const out = [], re = /\s+/g; let last = 0, m;
  while ((m = re.exec(t))) {
    const i = m.index, pre = t.slice(0, i), end = i + m[0].length;
    if (end < t.length && (/[A-Za-z0-9)"'’][.;]$/.test(pre) || /;$/.test(pre)) && !PT_ABBR.test(pre)) { out.push(t.slice(last, i)); last = end; continue; }
    const dot = /^\s+·\s+/.exec(t.slice(i));
    if (dot) { out.push(t.slice(last, i)); last = i + dot[0].length; re.lastIndex = last; }
  }
  out.push(t.slice(last));
  return out;
}
// cut a long point at " — " or at "label: rest" (never after "ว่า", "that", "say"…, which open a quote); separators kept, as a capturing split
function splitCut(x) {
  const out = [], re = /\s+—\s+|:\s+/g; let last = 0, m;
  while ((m = re.exec(x))) {
    if (m[0][0] === ':') {
      const pre = x.slice(0, m.index), end = m.index + m[0].length;
      if (end >= x.length || /(?:ว่า|that|them|say|says|teach \w+)$/.test(pre)) { re.lastIndex = m.index + 1; continue; }
    }
    out.push(x.slice(last, m.index), m[0]); last = m.index + m[0].length;
  }
  out.push(x.slice(last));
  return out;
}
// a point's closing ";" or "." goes — but not the stop of a Thai abbreviation at the end ("มี.ค.")
const dropEndStop = (x) => { if (/;\s*$/.test(x)) return x.replace(/;\s*$/, ''); const m = /\.\s*$/.exec(x); return m && !/[ก-๙]\.[ก-๙]{1,2}$/.test(x.slice(0, m.index)) ? x.slice(0, m.index) : x; };
const points = (s) => {
  if (/\n\s*\n/.test(String(s || ''))) return String(s).split(/\n\s*\n/).flatMap(points);   // a blank line in the manual is a new point
  let d = 0; const SEP = { '.': '\u0001', ';': '\u0002', '·': '\u0003', '—': '\u0004', ':': '\u0005' };
  const t = String(s || '').replace(/[().;·—:]/g, (c) => { if (c === '(') { d++; return c; } if (c === ')') { d = Math.max(0, d - 1); return c; } return d ? SEP[c] : c; });
  // a full stop counts only after a Latin letter, digit or bracket (Thai dates like มี.ค. never split), and never after an initial or a
  // short title ("Conde S. Januário", "St. John's", "Mt. Annan", "No. 5") — those are inside a name
  let parts = splitPoints(t);
  // still long: cut at a dash or a colon too — only where both sides are a phrase of their own (never a bare label "แผนวันฝนตก" or a
  // tail "ไม่ไปซ้ำ" as a bullet), and never at a colon that opens a quote ("สอนมีมี่ว่า: …", "tell them: …")
  const cut = (x) => { const bits = splitCut(x), out = []; let cur = bits[0];
    for (let k = 1; k < bits.length; k += 2) { if (cur.trim().length >= 25 && bits.slice(k + 1).join('').trim().length >= 25) { out.push(cur); cur = bits[k + 1]; } else cur += bits[k] + bits[k + 1]; }
    return [...out, cur]; };
  parts = parts.flatMap((x) => (x.length > 110 ? cut(x) : [x]));
  parts = parts.map((x) => dropEndStop(x.replace(/[\u0001-\u0005]/g, (c) => '.;·—:'[c.charCodeAt(0) - 1])).replace(/^[—–-]\s*/, '').trim()).filter(Boolean);
  // a numbered list written "1 · first · 2 · second": the number joins its item ("1. first"), never a point of its own
  parts = parts.flatMap((x, j) => { const m = x.match(/^(.*\S:)\s+(1)$/); return m && parts[j + 2] === '2' ? [m[1], m[2]] : [x]; });   // "Cut in this order: 1 · …"
  return parts.reduce((o, x, j) => { if (/^\d{1,2}$/.test(x) && j < parts.length - 1) o.push(`\u0006${x}`); else if (o.length && o[o.length - 1].startsWith('\u0006') && !/\s/.test(o[o.length - 1])) o[o.length - 1] = `${o[o.length - 1].slice(1)}. ${x}`; else o.push(x); return o; }, []).map((x) => x.replace(/^\u0006/, ''));
};
// what a parent acts on stands out in a report line (owner's review, Nov 2026): times, prices and phone numbers in bold — colour stays
// on the headings. Match the raw text, escape each piece (never decorate escaped text: "Cook's" → &#39; → "39").
const KEYFACT = /\b\d{1,2}:\d{2}(?:\s?[–-]\s?\d{1,2}:\d{2})?\b|(?:HK\$|MOP ?|A\$|AU\$|NZ\$|US\$|AUD ?|HKD ?|\$|฿|¥|€|£)\d[\d,]*(?:\.\d+)?(?:\s?[–-]\s?\d[\d,]*(?:\.\d+)?)?|(?:\+\d{1,3} )?(?:\(\d{2,3}\) )?\b\d{3,4}(?: \d{3,4}){1,2}\b|(?:^|[^\d,.])(?<em>999|000|911|112)(?![\d,.])/g;   // no lookbehind (old Safari): the char before an emergency number is matched, emph bolds only the number
const emph = (x) => { const t = String(x || ''); let out = '', at = 0; for (const m of t.matchAll(KEYFACT)) { const hit = m.groups && m.groups.em ? m.groups.em : m[0], i = m.index + m[0].length - hit.length; out += esc(t.slice(at, i)) + `<b class="kf">${esc(hit)}</b>`; at = m.index + m[0].length; } return out + esc(t.slice(at)); };
const pt = (x) => { const m = x.match(/^(.*?)\s*\(([^()]{45,})\)\s*(.*)$/); return m ? `${emph(m[1] + (m[3] ? ' ' + m[3] : ''))}<small>${emph(m[2])}</small>` : emph(x); };   // a long bracket drops to a small line
const lead = (s) => ((p) => `${pt(p[0] || '')}${p.slice(1).map((y) => `<small class="tsub">${pt(y)}</small>`).join('')}`)(points(s));
const cap1 = (x) => x.replace(/^[a-z](?=[a-z]*(?:[\s,:;!?)]|$))/, (c) => c.toUpperCase());   // "book Nov" → "Book Nov"; eSIM and iPhone stay
const pts = (s, cls) => { const p = points(s).map(cap1), a = p.findIndex((x) => /^1\. /.test(x));
  let z = a; while (a >= 0 && z + 1 < p.length && p[z + 1].startsWith(`${z - a + 2}. `)) z++;
  if (a >= 0 && z > a && a <= 1) { const rest = p.slice(z + 1);   // "1 · … · 2 · …" is a numbered list; what follows it reads as its own points
    return `${p.slice(0, a).map((x) => `<p class="pt1">${pt(x)}</p>`).join('')}<ol class="pts nums${cls ? ' ' + cls : ''}">${p.slice(a, z + 1).map((x) => `<li>${pt(cap1(x.replace(/^\d+\.\s/, '')))}</li>`).join('')}</ol>${rest.length > 1 ? `<ul class="pts${cls ? ' ' + cls : ''}">${rest.map((x) => `<li>${pt(x)}</li>`).join('')}</ul>` : rest.map((x) => `<p class="pt1${cls ? ' ' + cls : ''}">${pt(x)}</p>`).join('')}`; }
  return p.length > 1 ? `<ul class="pts${cls ? ' ' + cls : ''}">${p.map((x) => `<li>${pt(x)}</li>`).join('')}</ul>` : `<p class="pt1${cls ? ' ' + cls : ''}">${pt(p[0] || '')}</p>`; };   // one point keeps the list's size (a lone answer is never bigger than its neighbours)
// money as a small bill: one line per item with its amount on the right, the day's total last, footnotes small
const MONEY_AMT = /(≈\s*)?(HK\$|MOP|A\$|AU\$|\$|฿)\s?[\d,]/;
const moneyHtml = (s, skip) => {
  const rows = String(s || '').split(/\s+·\s+/).filter((r) => !(skip && skip.has(r.trim()))), cur = MONEY_AMT;
  return `<dl class="bill">${rows.map((r) => { const m = r.match(cur);
    if (!m) return `<div class="bn"><dd>${esc(r)}</dd></div>`;
    const lab = r.slice(0, m.index).trim(), all = r.slice(m.index).trim(), tot = /^(today|วันนี้)\b/i.test(lab), br = all.match(/^(.*?\S)\s*\(([^()]+)\)\s*$/), amt = br ? br[1] : all;
    return `<div${tot ? ' class="tot"' : ''}><dt>${esc(lab || '—')}</dt><dd>${esc(amt)}</dd></div>${br ? `<div class="bn"><dd>${esc(br[2])}</dd></div>` : ''}`; }).join('')}</dl>`;
};
// a timeline row: the first part is the line, the rest (after " · ") sit underneath, smaller
const tlRow = (r) => { const own = r && r.h && T(r.h), [a, ...b] = own ? [own, ...T(r).split(' · ')] : T(r).split(' · '); return `<span class="tm">${own ? emoIn(esc(a)) : esc(a)}</span>${b.length ? `<span class="tsub">${b.map(esc).join('<br>')}</span>` : ''}`; };   // the full plan: the step's own headline, then every detail (nothing folded on the report)   // a tip's kind sets its marker colour (app.css .tips li.tk-*)
// o.full: a report — every timeline line whole. o.learn / o.eat (the plan page): the day's learn cards, quiz and story, and the long
// eat-along-the-route lists, are one link each to the page that holds them word for word; the manual's footnote is said once below
function planHtml(t, i, open, wx, o = {}) {
  const pl = t.days[i].plan || {}, rows = pl.plan || [], dwx = wx && t.days[i].wx;
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  const nl = (pl.learn || []).length, nq = (pl.quiz || []).length, wxl = dwx ? dayFacts({ wx: t.days[i].wx }) : '';
  const picked = new Set((pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]).filter(Boolean)), nfood = (pl.food || []).reduce((n, f) => n + f.items.filter((x) => !picked.has(x.name)).length, 0) + eatMore(pl).length;
  // tonight's bed: the name once — an address that already starts with the hotel's name is shown alone
  const stay = pl.stay ? ((nm, ad) => `<p class="stay"><b>${L('ที่พักคืนนี้', 'Tonight')}</b> ${ad && ad.startsWith(nm.split(/\s+/).slice(0, 2).join(' ')) ? '' : `${esc(nm)}<br>`}<span class="addr">${addrHtml(ad)}</span> ${extA(mapsUrl(pl.stay.q || pl.stay.addr), L('แผนที่', 'Map') + ' ↗')}</p>`)(pl.stay.name || '', pl.stay.addr || '') : '';
  return `<details class="dayplan${o.full ? ' full' : ''}"${open ? ' open' : ''}><summary>${L('แผนวันนี้', 'Plan for the day')}${rows.length ? ` <span class="label">· ${rows.length} ${L('ช่วง', 'steps')}</span>` : ''}</summary>
<div class="pgrid">${pl.moving || (pl.legs || []).length || pl.route || dwx ? `<aside class="strip"><div class="kicker">${L('การเดินทาง', 'Getting around')}</div>
${pl.moving ? `<div class="moving">${pts(T(pl.moving), 'tight')}</div>` : ''}
${(pl.legs || []).length ? legsHtml(pl.legs) : ''}
${pl.route ? `<p class="row">${extA(pl.route, ic('route') + ' ' + L('เส้นทางทั้งวันใน Google Maps', "The whole day's route in Google Maps"), 'btn ghost small')}</p>` : ''}
${wxl ? `<div class="wxbox"><div class="kicker">${L('อากาศ', 'Weather')}</div>${wxl}</div>` : ''}</aside>` : ''}<div class="pmain">
${rows.length ? `<section class="cbox c-sky"><h3 class="ch">${ic('clock')}${L('ไทม์ไลน์', 'Timeline')}</h3><ol class="tl plan">${rows.map((r) => `<li><time>${esc(r.t || '')}</time><div>${tlRow(r)}${r.note ? `<small>${esc(T(r.note))}</small>` : ''}</div></li>`).join('')}</ol></section>` : ''}
${stay}
${pl.pick ? `<div class="call pick"><span class="lbl">${L('เคล็ดลับคนท้องถิ่น', 'Local tip')}</span>${pts(T(pl.pick))}</div>` : ''}
${pl.planB ? `<div class="call warn"><span class="lbl">${L('แผนสำรอง', 'Plan B')}</span>${pts(T(pl.planB))}</div>` : ''}
${pl.money ? `<section class="cbox c-leaf money"><h3 class="ch">${ic('money')}${L('เงินวันนี้', 'Money today')}</h3>${moneyHtml(T(pl.money), o.skipNotes)}</section>` : ''}
${(pl.tips || []).length ? `<section class="cbox c-sun"><h3 class="ch">${ic('learn')}${L('ควรรู้วันนี้', 'Good to know today')}</h3><ul class="tips">${pl.tips.map((x) => `<li${TIPK[x.kind] ? ` class="tk-${x.kind}"` : ''}>${lead(T(x))}</li>`).join('')}</ul></section>` : ''}
${(pl.picks || []).length ? `<h5 class="ph">${L('ร้านแนะนำวันนี้ · เน้นร้านคนท้องถิ่น', "Today's picks · locals' places first")} <a class="mini" href="#/t/${esc(t.id)}/eat/all">${L('ร้านทั้งหมด', 'All places')} ›</a></h5><ul class="picks">${pl.picks.map(pickHtml).join('')}</ul>` : ''}
${o.eat ? (nfood ? `<a class="learnlink" href="${o.eat}">🍽️ <b>${L('ร้านตามทางวันนี้', "Places to eat along today's route")}</b><span class="label">${L(`${nfood} ร้าน`, `${nfood} places`)}</span>${ic('chev')}</a>` : '') : `${(pl.food || []).length ? `<details class="sub"><summary>${L('กินตามเส้นทางวันนี้', "Eat along today's route")} <span class="label">· ${pl.food.reduce((n, f) => n + f.items.length, 0)}</span></summary><p class="label">${L('เรียงตามจุดที่ผ่าน · ★ = ร้านแนะนำ · กดชื่อเพื่อเปิด Google Maps', 'In the order you pass them · ★ = a pick · tap a name for Google Maps')}</p>${pl.food.map((f) => ((xs) => (xs.length ? `<h5>${esc(T(f.stop))}</h5><ul class="eats">${xs.map(foodHtml).join('')}</ul>` : ''))(f.items.filter((x) => !picked.has(x.name)))).join('')}</details>` : ''}
${eatMore(pl).length ? `<details class="sub"><summary>${L('ร้านอื่นใกล้ๆ', 'More places to eat nearby')} <span class="label">· ${eatMore(pl).length}</span></summary><ul class="eats">${eatMore(pl).map((e) => `<li><b>${e.q ? mapA(e.q, esc(e.name) + ' ↗') : esc(e.name)}</b>${e.pr ? ` <span class="label">${esc(T(e.pr))}</span>` : ''}${T(e.note) ? `<br><small>${esc(T(e.note))}</small>` : ''}</li>`).join('')}</ul></details>` : ''}`}
${o.learn ? (nl || nq || pl.tale ? `<a class="learnlink" href="${o.learn}">📚 <b>${L('เรียนรู้ของวันนี้', "Today's things to learn")}</b><span class="label">${[nl && L(`${nl} เรื่อง`, `${nl} cards`), nq && L(`คำถาม ${nq} ข้อ`, `${nq} questions`), pl.tale && L('นิทาน', 'a story')].filter(Boolean).join(' · ')}</span>${ic('chev')}</a>` : '') : `${(pl.learn || []).length ? `<details class="sub"><summary>${L('เรียนรู้ระหว่างทาง', 'Learn on the way')} <span class="label">· ${pl.learn.length}</span></summary>${pl.learn.map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${lead(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline"><b>${L('เล่าให้เด็กฟัง', 'For the kids')}</b> ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}</details>` : ''}
${(pl.quiz || []).length ? `<details class="sub"><summary>${L('ถามหนูในรถ', 'Quiz in the car')} <span class="label">· ${pl.quiz.length}</span></summary>${quizHtml(pl.quiz)}</details>` : ''}
${pl.tale ? taleHtml(t, i, pl.tale) : ''}`}
${o.learn ? '' : `<p class="label">${L('จากคู่มือ · ราคาและเวลาเปิดเช็กซ้ำก่อนไป · เลขจองไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p>`}</div></div></details>`;
}
// "more nearby" leaves out what the picks and the by-stop list already show
const eatMore = (pl) => { const seen = [...(pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]), ...(pl.food || []).flatMap((f) => f.items.map((x) => x.name))].filter(Boolean).map((x) => x.toLowerCase());
  return (pl.eat || []).filter((e) => { const n = String(e.name || '').toLowerCase(); return n && !seen.some((x) => x === n || x.includes(n) || n.includes(x)); }); };
// the guide's story of the day — a little picture book: scenes with an emoji and a heading, numbers stand out;
// "Listen" reads it scene by scene and lights up the scene being read (kid.js sayTale)
const taleNum = (s) => String(s || '').split(/(\d+(?:[.,]\d+)*(?:\s?(?:kilometres|metres|hectares|hours|km|ha|m)(?![A-Za-z])|\s?(?:กิโลเมตร|เมตร|เฮกตาร์|ชั่วโมง))?)/).map((x, n) => (n % 2 ? `<b class="tnum">${esc(x)}</b>` : esc(x))).join('');   // match the raw text, then escape: never inside an entity like &#39;
function taleHtml(t, i, x) {
  const g = ((t.passport || {}).guides || [])[0], sc = (x.scenes || []).length ? x.scenes : [{ e: '📖', th: x.th, en: x.en }];
  const mins = Math.max(1, Math.round(String(x.en || '').split(/\s+/).length / 130));
  return `<details class="tale"><summary>${g ? `<img class="tguide" src="${esc(g.art)}" alt="">` : '<span class="tguide">📖</span>'}<span class="thd"><small>${L('เรื่องเล่าของไกด์', "The guide's story")}${g ? ` · ${esc(T(g.name))}` : ''}</small><b>${esc(T(t.days[i].title))}</b><span class="label">${sc.length > 1 ? L(`${sc.length} ตอน · `, `${sc.length} scenes · `) : ''}${L(`ฟังราว ${mins} นาที`, `about ${mins} min to listen`)}</span></span></summary>
<div class="tbody"><button class="talebtn" data-a="saytale"><span class="play">▶ ${L('ฟังเรื่องนี้', 'Listen to the story')}</span><span class="stop">■ ${L('หยุด', 'Stop')}</span></button>
<ol class="scenes">${sc.map((s) => `<li data-say="${esc([T(s.h), T(s)].filter(Boolean).join('. '))}"><span class="se" aria-hidden="true">${esc(s.e || '•')}</span><div>${s.h ? `<h5>${esc(T(s.h))}</h5>` : ''}<p>${taleNum(T(s))}</p></div></li>`).join('')}</ol></div></details>`;
}
const quizHtml = (qs) => `<div class="quiz">${qs.map((q) => `<details class="qa"><summary>${esc(T(q.q))}</summary><p>${esc(T(q.a))}</p></details>`).join('')}</div>`;
/* ---------- the hub: one book, its topics as tiles (menu first, the detail on tap) ----------
   Every topic is its own page under #/t/<trip>/<topic>; the quick bar (tabBar) holds the five most used. */
const HUB = { book: ['book', 'สมุดความทรงจำ', 'Memory book'], today: ['today', 'วันนี้', 'Today'], plan: ['plan', 'แผนทั้งทริป', 'Whole trip'], eat: ['eat', 'ร้านอาหาร', 'Places to eat'],
  stays: ['stays', 'ที่พัก', 'Where we stay'], sos: ['sos', 'ฉุกเฉิน', 'Emergency'], prep: ['prep', 'เตรียมตัว', 'Get ready'], learn: ['learn', 'เรียนรู้', 'Learn'],
  firsts: ['firsts', 'ครั้งแรก', 'Firsts'], photos: ['camera', 'รูปตามแท็ก', 'Photos by tag'], spend: ['money', 'ค่าใช้จ่าย', 'Spending'], hearts: ['hearts', 'หัวใจ', 'Hearts'], offline: ['offline', 'ใช้ตอนไม่มีเน็ต', 'Offline'], log: ['log', 'บันทึกวันนี้', 'Record today'], search: ['search', 'ค้นหา', 'Search'] };
const secTitle = (k) => (HUB[k] ? L(HUB[k][1], HUB[k][2]) : '');
// the book menu's glossy pictures (the owner's sets: public/art/hub, the emoji pack, kid mode's passport); a key without one keeps its line icon
const HUB_PIC = { today: '/art/hub/today.webp', log: '/art/emoji/camera.webp', book: '/art/hub/book.webp', eat: '/art/hub/eat.webp', plan: '/art/emoji/travel-map.webp',
  stays: '/art/hub/stays.webp', sos: '/art/hub/sos.webp', prep: '/art/emoji/suitcase.webp', learn: '/art/hub/learn.webp', firsts: '/art/emoji/star.webp',
  hearts: '/art/emoji/heart.webp', offline: '/art/hub/offline.webp', camera: '/art/hub/album.webp', passport: '/art/kidui/bar-passport.webp',
  money: '/art/hub/money.webp', notebook: '/art/hub/notebook.webp', kid: '/art/emoji/joy.webp', shelf: '/art/hub/shelf.webp', home: '/art/kidui/bar-home.webp',
  family: '/art/hub/family.webp', relatives: '/art/hub/relatives.webp', helper: '/art/hub/helper.webp', settings: '/art/hub/settings.webp' };
const hubIc = (k) => (HUB_PIC[k] ? `<img src="${HUB_PIC[k]}" alt="" draggable="false">` : ic(k));
const hubE = (k) => `<span class="e${HUB_PIC[k] ? ' pic' : ''}">${hubIc(k)}</span>`;
// the day a book opens on: today during the trip, day 1 before it, the last day after
function todayIdx(t) { const n = dayNow(t); return n >= 0 ? n : tripOver(t) ? t.days.length - 1 : 0; }
const hasInfo = (t) => {
  const n = t.info || {}, more = (k) => (n.more || []).some((m) => m.page === k);
  return { stays: !!(n.stays || []).length || more('stays'), sos: !!((n.emergency || []).length || n.lost || n.ifthen) || more('sos'),
    prep: !!((n.pack || []).length || n.visa || n.bio || n.car || n.drive || (n.prices && (n.prices.rows || []).length) || (n.ifthen && (n.ifthen.book || n.ifthen.crowd))) || more('prep'),
    learn: !!((n.guide || []).length || (n.general || []).length || (n.wild || []).length || n.eatRules || t.days.some((d) => ((d.plan || {}).learn || []).length || ((d.plan || {}).quiz || []).length)) || more('learn') };
};
// the book's own pictures (server/bookart.js): a book without the owner's hand-drawn circles can have the helper draw one per day + the passport crest
// a book with its own drawings, or one whose every day already has a stock library picture (theme.artDays), needs no helper drawing
const artOwn = (t) => !!(t.theme && ((t.theme.art && !String(t.theme.art).startsWith('/media/art/')) || (Array.isArray(t.theme.artDays) && t.days.length && t.days.every((_, i) => t.theme.artDays[i]))));
function artCard(t) {
  if (!isEditor() || !(S.features || {}).bookArt || artOwn(t)) return '';
  const job = typeof artJob !== 'undefined' && artJob && artJob.trip === t.id ? artJob : null, has = !!(t.theme && t.theme.art);
  const running = job && job.status === 'running';
  return `<div class="call info artcall" data-trip="${esc(t.id)}"><b>${L('รูปประจำเล่ม', "The book's pictures")}</b><span>${running
    ? (job.total ? L(`ผู้ช่วยกำลังวาด… ${job.done}/${job.total}`, `The helper is drawing… ${job.done}/${job.total}`) : L('ผู้ช่วยกำลังเริ่มวาด…', 'The helper is starting to draw…'))
    : has ? L('วงกลมประจำวัน ตราพาสปอร์ต และไกด์สองตัว วาดโดยผู้ช่วยแล้ว', 'The day circles, the passport crest and the two guides were drawn by the helper')
    : L('ให้ผู้ช่วยวาดวงกลมประจำวัน ตราพาสปอร์ต และไกด์สองตัวของเล่มนี้ — ใช้แค่ชื่อวันกับหัวข้อในแผน ไม่ส่งรูปหรือบันทึกของครอบครัว', "Let the helper draw a circle for every day, the passport crest and the two guides — from the day titles and headlines only, never a photo or a record")}</span>${running ? '' : `<button type="button" class="btn small" data-a="bookart" data-t="${esc(t.id)}">${has ? L('วาดใหม่', 'Draw again') : L('วาดรูปด้วยผู้ช่วย ✨', 'Draw them ✨')}</button>`}</div>`;
}
function viewHub(t) {
  const n = t.info || {}, st = stats(t), i = todayIdx(t), dn = dayNow(t), until = daysUntil(t), ed = isEditor(), d = t.days[i], has = hasInfo(t);
  const kids = children().filter((k) => !(t.theme.children || []).length || (t.theme.children || []).some((c) => c.slug === k.slug));
  const ages = agesHtml(t.theme.children || []);
  const got = t.days.filter((_, j) => dayStamped(t, j)).length, hs = heartsOf(t.id), off = offState(t);
  const tile = (k, href, status, cls, extra) => `<a class="tile t-${k} ${cls || ''}" href="${href}">${hubE(HUB[k][0])}<b>${L(HUB[k][1], HUB[k][2])}</b>${status ? `<small>${status}</small>` : ''}${extra || ''}</a>`;
  const todayStatus = dn >= 0 ? L(`วันที่ ${i + 1} จาก ${t.days.length} · ${T(d.title)}`, `Day ${i + 1} of ${t.days.length} · ${T(d.title)}`)
    : until > 0 ? L(`อีก ${until} วัน · เริ่มที่ ${T(d.title)}`, `${until} days to go · starts with ${T(d.title)}`) : L(`จบทริปแล้ว · วันสุดท้าย: ${T(d.title)}`, `Trip over · last day: ${T(d.title)}`);
  const stops = t.days.reduce((a, x) => a + (x.planned || []).filter((p) => p.kind !== 'food').length, 0), tonight = (d.plan || {}).stay;
  const main = (n.emergency || []).find((e) => e.main) || (n.emergency || [])[0];
  const eatN = eatCount(t), picks = eatN ? eatData(t).groups.reduce((a, g) => a + g.items.filter((x) => (x.pick || []).length).length, 0) : 0;
  const learnN = t.days.reduce((a, x) => a + ((x.plan || {}).learn || []).length, 0), quizN = t.days.reduce((a, x) => a + ((x.plan || {}).quiz || []).length, 0);
  const q = (i2) => entriesOf(t.id, i2).filter((e) => e.kind === 'quote').length;
  const tiles = [
    tile('today', `#/t/${esc(t.id)}/today`, esc(todayStatus), 'today' + (dn >= 0 ? ' hi' : ''), artImg(t, i, 'tart')),
    ed ? tile('log', `#/t/${esc(t.id)}/log/${i}`, esc(dayHasContent(t, i) ? ((np, nq) => [np && L(`${np} รูป`, `${np} photos`), nq && L(`${nq} คำพูด`, `${nq} quotes`)].filter(Boolean).join(' · ') || L('บันทึกแล้ว', 'Recorded'))(mediaOf(t.id, i).length, q(i)) : L('ยังไม่มีบันทึก — แตะเพื่อเริ่ม', 'Nothing yet — tap to start')), 'log') : '',
    tile('book', `#/t/${esc(t.id)}/book`, esc([st.photos && L(`${st.photos} รูป`, `${st.photos} photo${st.photos > 1 ? 's' : ''}`), st.quotes && L(`${st.quotes} คำพูด`, `${st.quotes} quote${st.quotes > 1 ? 's' : ''}`), got && L(`ตรา ${got}`, `${got} stamp${got > 1 ? 's' : ''}`)].filter(Boolean).join(' · ') || L('ยังว่าง — เติมได้ระหว่างทริป', 'Empty for now — fills in on the trip'))),
    eatN ? tile('eat', `#/t/${esc(t.id)}/eat`, esc(L(`${eatN} ร้าน · ${picks} ร้านแนะนำ`, `${eatN} places · ${picks} picks`))) : '',
    tile('plan', `#/t/${esc(t.id)}/plan`, esc(L(`${t.days.length} วัน · ${stops} จุดแวะ`, `${t.days.length} days · ${stops} stops`))),
    has.stays ? tile('stays', `#/t/${esc(t.id)}/stays`, esc(tonight ? L(`คืนนี้: ${tonight.name}`, `Tonight: ${tonight.name}`) : ((n.stays || []).length ? L(`${n.stays.length} ที่พัก`, `${n.stays.length} stays`) : L('ที่พัก', 'Stays')))) : '',
    has.sos ? tile('sos', `#/t/${esc(t.id)}/sos`, esc(main ? `${T(main.label)} · ${main.tel}` : L('ถ้า…ก็…', 'If… then…')), 'sos') : '',
    has.prep ? tile('prep', `#/t/${esc(t.id)}/prep`, esc([(n.pack || []).length && L('จัดกระเป๋า', 'Packing'), n.visa && L('วีซ่า', 'Visa'), n.bio && L('ด่านกักกัน', 'Biosecurity'), n.car && L('รถเช่า', 'The van'), n.ifthen && n.ifthen.book && L('จองล่วงหน้า', 'Book ahead'), n.prices && L('ค่าเข้า', 'Prices')].filter(Boolean).join(' · '))) : '',
    has.learn ? tile('learn', `#/t/${esc(t.id)}/learn`, esc([learnN && L(`${learnN} เรื่อง`, `${learnN} cards`), (n.wild || []).length && (n.wildLabel ? `${T(n.wildLabel.short)} ${n.wild.length}` : L(`สัตว์ ${n.wild.length} ชนิด`, `${n.wild.length} animals`)), quizN && L(`คำถาม ${quizN} ข้อ`, `${quizN} questions`), (n.general || []).length && L('คำศัพท์', 'Words')].filter(Boolean).join(' · '))) : '',
    tile('firsts', `#/t/${esc(t.id)}/firsts`, esc(st.firsts ? L(`${st.firsts} ครั้งแรก`, `${st.firsts} first${st.firsts > 1 ? 's' : ''}`) : L('เหรียญรอหนูอยู่', 'Badges waiting to be earned'))),
    st.photos ? `<a class="tile t-photos" href="#/t/${esc(t.id)}/photos">${hubE('camera')}<b>${L('รูปตามแท็ก', 'Photos by tag')}</b><small>${esc(((n) => (n ? L(`${st.photos} รูป · ${n} แท็ก`, `${st.photos} photos · ${n} tags`) : L(`${st.photos} รูป · ยังไม่มีแท็ก`, `${st.photos} photos · no tags yet`)))(new Set(mediaOf(t.id).flatMap(tagsOf)).size))}</small></a>` : '',
    `<a class="tile" href="#/passport">${hubE('passport')}<b>${L('พาสปอร์ตนักผจญภัย', "Kids' passports")}</b><small>${esc(((xs) => (xs.length ? xs.join(' · ') + ' ' + L('ตรา', 'stamps') : L('ตราประทับรอวันเดินทาง', 'Stamps wait for the trip')))(kids.map((k) => [k, t.days.filter((_, j) => dayStamped(t, j) || ticked(t, 'stamp.d' + j, k.slug)).length]).filter(([, n]) => n).map(([k, n]) => `${kidName(k.slug)} ${n}`)))}</small></a>`,
    tile('hearts', `#/t/${esc(t.id)}/hearts`, esc(hs.length ? L(`${hs.length} ดวงถึงเด็กๆ`, `${hs.length} for the kids`) : L('ส่งหัวใจถึงเด็กๆ', 'Send the kids a heart'))),
    ed && spendOf(t.id).length ? `<a class="tile t-spend" href="#/t/${esc(t.id)}/spend">${hubE('money')}<b>${L('ค่าใช้จ่าย', 'Spending')}</b><small>${esc(sumMoney(spendOf(t.id)))}</small></a>` : '',
    `<a class="tile" href="#/notebook">${hubE('notebook')}<b>${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</b><small>${esc(((n) => (n ? L(`${n} รีวิวในเล่มนี้`, `${n} review${n === 1 ? '' : 's'} in this book`) : L('ให้ดาวที่พักและร้านไว้ใช้ทริปหน้า', 'Star the stays and places for next time')))(S.reviews.filter((r) => r.trip === t.id).length))}</small></a>`,
    ed ? tile('offline', `#/t/${esc(t.id)}/offline`, esc(!off.got ? L('ยังไม่ได้เก็บ — กดก่อนขึ้นเครื่อง', 'Not stored yet — tap before the flight')
      : off.stale ? L(`เก็บเมื่อ ${off.when} · มีรูปใหม่ ${off.fresh} รูป กดเก็บเพิ่ม`, `Stored ${off.when} · ${off.fresh} new photo${off.fresh > 1 ? 's' : ''}, tap to top up`) : L(`เก็บไว้ในเครื่องแล้ว · ${off.when}`, `Stored on this phone · ${off.when}`)), off.got && !off.stale ? '' : 'warn') : '',
    ed ? `<button class="tile kid" data-a="kidmode">${hubE('kid')}<b>${L('โหมดเด็ก', 'Kid mode')}</b><small>${L('ระบายสี วาดรูป ปั๊มตรา และแผนที่', 'Colour, draw, stamps and the map')}</small></button>` : '',
    `<a class="tile shelfgo" href="#/">${hubE('shelf')}<b>${L('ชั้นหนังสือ', 'Bookshelf')}</b><small>${L('เปลี่ยนเล่ม', 'Other books')}</small></a>`,
  ].filter(Boolean);
  // the tiles in three named groups, the group the family needs now first: on the trip "during the trip", before it "get ready",
  // after it "memories" — so a parent reads one heading, not fifteen tiles (the Today tile stays on top by itself)
  const GROUPS = { now: ['ระหว่างทริป', 'During the trip', /\bt-(log|eat|stays|sos)\b/], mem: ['ความทรงจำ', 'Memories', /\bt-(book|firsts|photos|hearts)\b|href="#\/passport"|tile kid\b/], prep: ['แผนและเตรียมตัว', 'Plans & getting ready', /./] };
  const order = dn >= 0 ? ['now', 'mem', 'prep'] : until > 0 ? ['prep', 'now', 'mem'] : ['mem', 'now', 'prep'];
  const groupOf = (h) => ['now', 'mem', 'prep'].find((g) => GROUPS[g][2].test(h));   // matched in this order: "prep" takes whatever is left
  const hero = tiles.filter((h) => /\btile t-today\b/.test(h)).join(''), rest = tiles.filter((h) => !/\btile t-today\b/.test(h));
  const tl = ` tl-${esc((S.family && S.family.tiles) || 'pastel')}`;   // the family's chosen tile look (pastel · the book's colour · plain), the same on every phone
  const groups = order.map((g) => { const xs = rest.filter((h) => groupOf(h) === g); return xs.length ? `<div class="part hubpart">${L(GROUPS[g][0], GROUPS[g][1])}</div><div class="hubgrid${tl}">${xs.join('')}</div>` : ''; }).join('');
  // the menu's colours, picked the way the menu looks: a heading like the groups above, three small cards each showing its tiles
  const pick = isEditor() ? `<section class="tilepick"><div class="part pickh">${L('สีของเมนู', 'Menu colours')}</div><div class="tpk" role="group" aria-label="${L('สีของเมนู', 'Menu colours')}">${[['pastel', 'สีสัน', 'Colourful'], ['accent', 'สีเล่ม', 'Book colour'], ['plain', 'เรียบ', 'Plain']].map(([k, th, en]) => `<button type="button" class="tpo tpo-${k}" data-a="tiles" data-v="${k}" aria-pressed="${tl === ` tl-${k}`}"><span class="sw" aria-hidden="true"><i></i><i></i><i></i></span><b>${L(th, en)}</b><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div></section>` : '';
  return `<section class="hubhead">${stampHtml(t, true)}<div class="grow"><div class="kicker">${esc(t.theme.kicker || '')}</div><h1>${esc(T(t.title).split(' · ')[0])}</h1><p class="line">${esc(fmtRange(t))}${ages ? ' · ' + ages : ''}</p></div></section>
<a class="hubsearch" href="#/t/${esc(t.id)}/search">${ic('search')}<span><b>${L('ค้นหาทั้งเล่ม', 'Search the whole book')}</b><small>${L('หมอ · ยา · แท็กซี่ · ห้องน้ำ · เด็กหลง', 'doctor · pharmacy · taxi · toilet · lost child')}</small></span></a>
<div class="hubgrid lead${tl}">${hero}</div>${groups}${typeof questLine === 'function' ? questLine(t) : ''}${pick}${artCard(t)}${isEditor() && t.source && t.source !== 'seed' ? `<div class="row end tripdel"><button type="button" class="mini" data-a="tripdel" data-t="${esc(t.id)}">${L('ลบเล่มนี้', 'Delete this book')}</button></div>` : ''}`;
}
/* ---------- search the whole book ----------
   One index per book, both languages (a Thai phone finds "taxi", an English one finds "แท็กซี่"): the pocket-guide sections (stays, emergency,
   get ready, learn), each day's plan, and every place to eat. Words people reach for in a hurry also find their synonyms (หมอ → hospital). */
const SYN = [['หมอ', 'แพทย์', 'โรงพยาบาล', 'คลินิก', 'doctor', 'hospital', 'clinic', 'ป่วย', 'ไม่สบาย'], ['ยา', 'ร้านขายยา', 'pharmacy', 'medicine', 'chemist', 'watsons', 'mannings'],
  ['แท็กซี่', 'taxi', 'uber', 'ให้คนขับดู'], ['ห้องน้ำ', 'toilet', 'restroom', 'bathroom'], ['ฉุกเฉิน', 'emergency', 'ตำรวจ', 'police', 'ambulance', 'รถพยาบาล', '999', '000'],
  ['พาสปอร์ต', 'หนังสือเดินทาง', 'passport', 'กงสุล', 'consulate'], ['เด็กหลง', 'เด็กหาย', 'เด็กพลัดหลง', 'หลงทาง', 'lost child', 'missing child'],   // a lost child is not a lost passport: bare "lost" stays out of this group
  ['ของหาย', 'ทำหาย', 'lost', 'missing', 'stolen', 'ถูกขโมย'], ['เงิน', 'money', 'cash', 'atm', 'octopus', 'บัตรเครดิต', 'hk$', 'mop', 'a$'],
  ['ฝน', 'rain', 'พายุ', 'typhoon', 'อากาศ', 'weather'], ['ที่พัก', 'โรงแรม', 'hotel', 'stay', 'airbnb', 'เช็กอิน', 'check-in'], ['ตั๋ว', 'ticket', 'จอง', 'booking', 'book'],
  ['เรือ', 'ferry', 'boat'], ['รถไฟ', 'train', 'mtr'], ['สนามบิน', 'airport'], ['ซิม', 'sim', 'esim', 'wifi', 'อินเทอร์เน็ต', 'internet']];
const SUGGEST = [['หมอ', 'Doctor'], ['ยา', 'Pharmacy'], ['แท็กซี่', 'Taxi'], ['ห้องน้ำ', 'Toilet'], ['ฉุกเฉิน', 'Emergency'], ['พาสปอร์ต', 'Passport'], ['เด็กหลง', 'Lost child'], ['เงิน', 'Money'], ['ฝน', 'Rain'], ['ซิม', 'SIM']];
const TOPIC_RANK = { sos: 0, stays: 1, prep: 2, today: 3, learn: 4, eat: 5 };
const bookIdx = new Map();
const flatText = (o, l) => {   // every word of a seed object in one language ("{th,en}" leaves pick l; links and ids are left out)
  if (o == null) return '';
  if (typeof o === 'string') return /^https?:/.test(o) ? '' : o;
  if (typeof o === 'number') return String(o);
  if (Array.isArray(o)) return o.map((x) => flatText(x, l)).join(' ');
  return Object.entries(o).map(([k, v]) => (k === 'th' || k === 'en' ? (k === l || (o[l] === undefined && k === 'en') || (o[l] === undefined && o.en === undefined) ? flatText(v, l) : '')
    : /^(tz|key|kind|e|emo|art|img|route|href|url|t|k|n|id)$/.test(k) ? '' : flatText(v, l))).join(' ');
};
function searchIndex(t) {
  const key = `${t.id}:${t.seed || ''}`;   // a new seed (a deploy with a revised manual) builds the index again
  if (bookIdx.has(key)) return bookIdx.get(key);
  const out = [], keep = lang, box = document.createElement('div'), B = {};
  const plain = (h) => { box.innerHTML = (h || '').replace(/<\/(td|th|li|p|h[1-6]|div|tr|dd|dt|summary|section|ul|ol|small)>/gi, '$& ');   // cells and list items must not run together
     return box.textContent.replace(/\s+/g, ' ').trim(); };
  try { for (const l of ['th', 'en']) { lang = l; B[l] = infoBlocks(t); } } finally { lang = keep; }
  const add = (topic, href, title, text, extra) => out.push({ topic, href, title, text, tl: { th: title.th.toLowerCase(), en: title.en.toLowerCase() }, lc: { th: text.th.toLowerCase(), en: text.en.toLowerCase() }, i: out.length, ...extra });
  ['sos', 'stays', 'prep', 'learn'].forEach((k) => (B.th.meta[k] || []).forEach((m, j) => {
    const me = (B.en.meta[k] || [])[j] || m;
    if (m.key === 'ifthen') {   // "If… then…" is a list of situations: each row is its own hit, titled by the situation (ลูกไม่สบาย, เด็กหลง…)
      const f = (t.info || {}).ifthen, href = `#/t/${t.id}/${k}/full/${j}`, row = (r) => ({ th: r.map((c) => flatText(c, 'th')).join(' · '), en: r.map((c) => flatText(c, 'en')).join(' · ') });
      [...(f.rows || []), ...((f.mishap || {}).rows || [])].forEach((r) => add(k, href, { th: flatText(r[0], 'th'), en: flatText(r[0], 'en') }, row(r)));
      if (f.carry) add(k, href, { th: flatText(f.carry.head, 'th'), en: flatText(f.carry.head, 'en') }, { th: flatText([f.carry.lede, f.carry.rows], 'th'), en: flatText([f.carry.lede, f.carry.rows], 'en') });
      return;
    }
    add(k, `#/t/${t.id}/${k}/full/${j}`, { th: plain(m.title), en: plain(me.title) }, { th: plain(B.th[k][j]), en: plain((B.en[k] || [])[j]) });
    // the lost-child advice is its own hit too (the card it sits on is long, so its snippet would stop before the advice)
    if (m.key === 'card' && (t.info || {}).lost) add(k, `#/t/${t.id}/${k}/full/${j}`, { th: 'ถ้าเด็กหลง', en: 'If a child is lost' }, { th: flatText(t.info.lost, 'th'), en: flatText(t.info.lost, 'en') });
  }));
  t.days.forEach((d, i) => {
    const pl = d.plan || {}, part = (l) => [d.title, d.sleep, d.wx, pl.plan, pl.moving, pl.pick, pl.picks, pl.planB, pl.tips, pl.money, pl.stay, pl.legs, pl.food, pl.eat, d.planned].map((x) => flatText(x, l)).join(' · ');
    add('today', `#/t/${t.id}/today/${i}/full`, { th: `วันที่ ${i + 1} · ${flatText(d.title, 'th')}`, en: `Day ${i + 1} · ${flatText(d.title, 'en')}` }, { th: part('th'), en: part('en') });
  });
  eatData(t).groups.forEach((g) => g.items.forEach((x) => {
    const part = (l) => flatText([x.name, x.zh, x.where, x.tag, x.what, x.why, x.note, g.area], l);
    add('eat', `#/t/${t.id}/eat/all`, { th: x.name, en: x.name }, { th: part('th'), en: part('en') }, { place: x.name, area: g.area });
  }));
  bookIdx.set(key, out);
  return out;
}
// short Thai words that sit inside longer ones: หมอ ≠ หมอก/หมอน, ยา ≠ ยาก/ยาว — the next letter must not continue the word
const WGUARD = { 'หมอ': '(?![กนง])', 'ยา': '(?![กวนง])' };
const wreMemo = new Map();   // the search runs these over every entry on each key press: build each one once
const wre = (w) => { if (!wreMemo.has(w)) wreMemo.set(w, new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (WGUARD[w] || ''), 'i')); return wreMemo.get(w); };
const wHas = (text, w) => (WGUARD[w] ? wre(w).test(text) : text.includes(w));
const termAlts = (w) => { const set = new Set([w]); SYN.forEach((g) => { if (g.some((x) => x === w || (w.length >= 3 && x.includes(w)))) g.forEach((x) => set.add(x)); }); return [...set]; };
function bookFind(t, q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean); if (!terms.length) return { list: [], alts: [] };
  const alts = terms.map(termAlts), list = [];
  for (const e of searchIndex(t)) {
    let score = 0;
    for (const a of alts) {
      let best = 0;
      a.forEach((w, n) => { const exact = n === 0; if (wHas(e.tl.th, w) || wHas(e.tl.en, w)) best = Math.max(best, exact ? 6 : 4); else if (wHas(e.lc.th, w) || wHas(e.lc.en, w)) best = Math.max(best, exact ? 2 : 1); });
      if (!best) { score = 0; break; }
      score += best;
    }
    if (score) list.push({ e, score });
  }
  list.sort((a, b) => b.score - a.score || TOPIC_RANK[a.e.topic] - TOPIC_RANK[b.e.topic] || a.e.i - b.e.i);
  return { list, alts: [...new Set(alts.flat())] };
}
// the words around the first hit, the hit marked (escape first, decorate never: each piece is escaped on its own)
function snippet(e, alts) {
  const hit = (tx) => { const lw = (tx || '').toLowerCase(); let k0 = -1; for (const w of alts) { const k = WGUARD[w] ? lw.search(wre(w)) : lw.indexOf(w); if (k >= 0 && (k0 < 0 || k < k0)) k0 = k; } return k0; };
  const l = lang, o = l === 'th' ? 'en' : 'th';
  // always the reader's language (a Thai word can find an English line through a synonym — the snippet stays English then);
  // the other language only when this one has no text at all
  const text = e.text[l] || e.text[o] || '', at = hit(text);
  if (at < 0) return esc(text.slice(0, 110)) + (text.length > 110 ? ' …' : '');
  let from = Math.max(0, at - 36), to = Math.min(text.length, at + 110);
  if (from) { const k = text.indexOf(' ', from); if (k >= 0 && k < at) from = k + 1; }   // start and end on a space, not inside a word
  if (to < text.length) { const k = text.lastIndexOf(' ', to); if (k > at + 20) to = k; }
  const seg = (from ? '… ' : '') + text.slice(from, to) + (to < text.length ? ' …' : '');
  const re = new RegExp(`(${[...alts].sort((a, b) => b.length - a.length).map((w) => wre(w).source).join('|')})`, 'gi');
  return seg.split(re).map((part, k) => (k % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join('');
}
// photos that match every word (or its synonyms) in their caption, place or tags — a tag matches by its key and its Thai and English names
function photoFind(t, q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean); if (!terms.length) return [];
  const alts = terms.map(termAlts);
  return mediaOf(t.id).filter((m) => {
    const tags = tagsOf(m).flatMap((k) => { const x = PHOTO_TAGS.find((p) => p[0] === k); return x ? [k, x[2], x[3]] : [k]; });
    const hay = [m.caption, m.place, ...tags].join(' ').toLowerCase();
    return alts.every((a) => a.some((w) => wHas(hay, w)));
  });
}
let bookQ = '', bookTrip = '';
// the last three searches that led somewhere, on this phone only
const rememberQ = () => { const q = bookQ.trim(); if (!q) return; ls('recentq', [q, ...(ls('recentq') || []).filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 3)); };
const topicName = (k) => (k === 'today' ? L('แผนรายวัน', 'Day plan') : secTitle(k));
function bookResults(t) {
  const q = bookQ.trim();
  if (!q) return `<p class="empty">${L('พิมพ์คำที่ต้องการ เช่น หมอ แท็กซี่ ห้องน้ำ — ไทยหรืออังกฤษก็ได้', 'Type what you need — doctor, taxi, toilet, lost child. Thai and English both work')}</p>`;
  const { list, alts } = bookFind(t, q), ph = photoFind(t, q);
  const phHtml = ph.length ? `<div class="sphotos"><p class="label">${ic('camera')} ${L(`รูป ${ph.length} รูป`, `${ph.length} photo${ph.length > 1 ? 's' : ''}`)}${ph.length > 12 ? L(' · 12 รูปแรก', ' · the first 12') : ''}</p><div class="mosaic">${ph.slice(0, 12).map((m) => photoBtn(t, m)).join('')}</div></div>` : '';
  if (!list.length && ph.length) return phHtml;
  if (!list.length) return `<p class="empty">${L(`ไม่พบ “${esc(q)}” ลองคำสั้นลงหรือคำอื่น`, `Nothing for “${esc(q)}” — try a shorter or different word`)}</p>`;
  const shown = list.slice(0, 30);
  return `${phHtml}<p class="label" id="bookn">${L(`พบ ${list.length} รายการ`, `${list.length} found`)}${list.length > shown.length ? L(` · แสดง ${shown.length} อันดับแรก พิมพ์ให้เจาะจงขึ้นเพื่อกรอง`, ` · the top ${shown.length} — type more to narrow`) : ''}</p>
<ul class="sres">${shown.map(({ e }) => `<li class="k-${e.topic}"><a href="${esc(e.href)}"${e.place ? ` data-a="eatgo" data-t="${esc(t.id)}" data-v="${esc(e.place)}"` : ''}><span class="stopic">${esc(topicName(e.topic))}</span><b>${esc((e.title[lang] || e.title.en).replace(/\s+·\s+\d+$/, ''))}</b>${e.place ? `<span class="label">${esc(T(e.area))}</span>` : ''}<span class="ssnip">${snippet(e, alts)}</span></a></li>`).join('')}</ul>`;
}
function viewSearch(t) {
  if (bookTrip !== t.id) { bookTrip = t.id; bookQ = ''; }
  searchIndex(t);   // built once, before the first letter
  return `<section class="tp tp-search"><h1 class="h2">${L('ค้นหาทั้งเล่ม', 'Search the whole book')}</h1>
<p class="lede">${L('ค้นทั้งเล่ม: ฉุกเฉิน ที่พัก แผน ร้าน และรูป — ไม่ต้องไล่เปิดทีละหน้า', 'Emergency, stays, get ready, the day plans, places to eat and photos (captions, tags, places) — one box, no page hunting')}</p>
<div class="bookbar"><input id="bookq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(bookQ)}" placeholder="${L('เช่น หมอ แท็กซี่ ห้องน้ำ ตั๋ว…', 'e.g. doctor, taxi, toilet, tickets…')}" aria-label="${L('ค้นหาทั้งเล่ม', 'Search the whole book')}"></div>
${((r) => (r.length ? `<div class="row chips recent" role="group"><span class="label">${L('ค้นล่าสุด', 'Recent')}</span>${r.map((q) => `<button class="chip" data-a="sq" data-v="${esc(q)}">${ic('search')} ${esc(q)}</button>`).join('')}</div>` : ''))(ls('recentq') || [])}
<div class="row chips" role="group">${SUGGEST.map(([th, en]) => `<button class="chip" data-a="sq" data-v="${esc(L(th, en))}">${esc(L(th, en))}</button>`).join('')}</div>
<div id="bookres">${bookResults(t)}</div></section>`;
}
// which meal a pick is (its colour everywhere): breakfast · lunch · dinner · snack
const mealKind = (p) => { const m = ((p.meal || {}).en || '').toLowerCase(); return /breakfast/.test(m) ? 'bf' : /lunch/.test(m) ? 'lu' : /dinner/.test(m) ? 'di' : 'sn'; };
// a meal in one line: the pick (opens Maps), then its backup — so a hungry family never has to search
// a name with its navigate button (Today's answer rows): the name is plain text, the 44 px pin opens Maps — an underlined name read as a link to a page
const navB = (q, label) => (q ? `<a class="navb" href="${esc(mapsUrl(q))}" target="_blank" rel="noopener" aria-label="${esc(L('นำทางไป ', 'Navigate to ') + label)}">${ic('pin')}</a>` : '');
const mealDd = (p) => `<span class="nmrow"><b>${esc(p.name)}</b>${navB(p.q, p.name)}</span>${p.alt ? `<small class="bk"><span class="nmrow">${L('ร้านสำรอง', 'Backup')}: ${esc(p.alt.name)}${navB(p.alt.q, p.alt.name)}</span></small>` : ''}`;
// Today's header (owner's review, Nov 2026: "reads like a lecture, not a trip"): the bed and the weather as short icon lines, not one paragraph —
// each " · " piece of d.wx is its own line, the "(averages, not a forecast …)" aside drops to one quiet word, "x — do y" leads with the y
const WX_ICON = [[/sunset|พระอาทิตย์ตก/i, '🌅'], [/°C/, '🌡️'], [/\bwindy?\b|ลม|breeze|sleeve|เสื้อ|jacket|\bcool|เย็น/i, '🧥'], [/\bsea\b|น้ำทะเล|water park|สวนน้ำ/i, '🌊'], [/clock|นาฬิกา|daylight|ออมแสง/i, '🕒'], [/rain|ฝน|umbrella|ร่ม/i, '☔'], [/\bsun\b|\bsunny\b|แดด|\bhats?\b|หมวก/i, '🧢'], [/dark|มืด|night|ค่ำ/i, '🌙']];
function dayFacts(d) {
  const lines = [];
  if (d.sleep) lines.push(['🛏️', `<b>${esc(T(d.sleep))}</b>`]);
  let avg = false;
  String(T(d.wx) || '').split(' · ').map((x) => x.trim()).filter(Boolean).forEach((x) => {
    const p = x.replace(/\s*\(([^)]*)\)\s*$/, (m, a) => { if (/forecast|พยากรณ์|average|เฉลี่ย/i.test(a)) avg = true; return ''; });
    const [lead, ...rest] = p.split(' — '), ico = (WX_ICON.find(([re]) => re.test(p)) || [, '☁️'])[1];
    const sun = lead.match(/(?:sunset|พระอาทิตย์ตก)[^\d]*(\d{1,2}[:.]\d{2})/i);
    const txt = sun ? `<b>${L('พระอาทิตย์ตก', 'Sunset')} ${esc(sun[1])}</b>${rest.length ? ` <small>${esc(rest.join(' — '))}</small>` : ''}`
      : rest.length ? `<b>${esc(rest.join(' — '))}</b> <small>${esc(lead)}</small>` : esc(lead);
    lines.push([ico, txt]);
  });
  if (!lines.length) return '';
  return `<ul class="dfacts" style="grid-column:2/3">${lines.map(([e, h]) => `<li><span class="fi" aria-hidden="true">${emoIn(e)}</span><span>${h}</span></li>`).join('')}${avg ? `<li class="avg"><span class="fi"></span><small>${L('อากาศเป็นค่าเฉลี่ยช่วงนี้ ไม่ใช่พยากรณ์', 'Weather: usual for the season, not a forecast')}</small></li>` : ''}</ul>`;
}
// a travel icon per timeline step, picked from its English words (first match wins)
const TL_ICON = [[/\bdeparts?\b|\bflight\b|\bfly\b|boarding|\bTG ?\d|\bQF ?\d|take ?off/i, '✈️'], [/\bland\b|arriv|immigration/i, '🛬'], [/check in|check-in/i, '🧳'], [/\bbus\b|coach|shuttle/i, '🚌'], [/ferry|\bboat\b|cruise/i, '⛴️'], [/train|MTR|metro|tram|\brail/i, '🚆'], [/\bdrive\b|\bcar\b|van\b|taxi|\bUber/i, '🚗'], [/breakfast/i, '🥐'], [/lunch|dinner|\beat\b|snack|restaurant|dim sum|café|cafe/i, '🍽️'], [/bath|\bbed\b|sleep|nap/i, '🛁'], [/beach|swim|pool|water park/i, '🏖️'], [/theme park|water park|disney|\bzoo\b|aquarium|ocean park|fun zone/i, '🎡'], [/walk|hike|trail/i, '🚶'], [/museum|temple|church|ruins/i, '🏛️'], [/shop|market|mall/i, '🛍️'], [/hotel|resort|apartment/i, '🏨']];
const tlIcon = (r) => { const en = (r && r.en) || ''; const m = TL_ICON.find(([re]) => re.test(en.split(' · ')[0])) || TL_ICON.find(([re]) => re.test(en)); return m ? `<span class="tli" aria-hidden="true">${emoIn(m[1])}</span>` : ''; };
// Today's timeline (owner's review, Nov 2026): each step reads as its first clause; the rest (" · " pieces) folds below it, one tap opens it (sheets.js)
// a step with its own headline (seed format: plan rows carry h {th, en}, a fun line that starts with an emoji) shows that line; the whole step folds below it
const tlMore = (r) => !!(r && r.h && T(r.h)) || T(r).includes(' · ');
const tlBrief = (r) => { const own = r && r.h && T(r.h); const [a, ...b] = own ? [own, ...T(r).split(' · ')] : T(r).split(' · '); return `<span class="tm"><span class="tmt">${own ? emoIn(esc(a)) : tlIcon(r) + esc(a)}</span>${b.length ? `<span class="tlchev" aria-hidden="true">${ic('chev')}</span>` : ''}</span>${b.length ? `<ul class="tsub">${b.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`; };
// today: the day as one sheet (short timeline, then label → answer rows like the manual's tables); the full plan is one tap away (/today/<i>/full)
// the if-then table as the owner's seeds write it ({cols, rows, mishap}) — the in-app import's model answers {plans:{head, cols, rows}}
const ifthenOf = (f) => (f && !Array.isArray(f.rows) && f.plans && Array.isArray(f.plans.rows) ? { ...f, cols: f.plans.cols || f.cols, rows: f.plans.rows, head: f.plans.head || f.head } : { ...(f || {}), rows: Array.isArray(f && f.rows) ? f.rows : [] });
function dayGlance(t, i, pre) {   // pre (before the trip; never named `brief`, which would hide the brief() teaser below and crash a money line without "Today ≈"): the timeline, then everything else folded under one line
  const d = t.days[i], pl = d.plan || {}, rows = pl.plan || [], full = `#/t/${esc(t.id)}/today/${i}/full`;
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  // on the day itself: steps whose time has passed fade, the next one is marked (each row in its own time zone — Bangkok rows on day 1)
  const st = [];
  if (dayNow(t) === i) { let found = false;
    rows.forEach((r, k) => { const m = String(r.t || '').match(/(\d{1,2}):(\d{2})/); if (!m) return;
      const at = m[1].padStart(2, '0') + ':' + m[2], now = fmtTime(Date.now(), r.tz || t.timezone);
      if (at <= now) st[k] = 'past'; else if (!found) { st[k] = 'next'; found = true; } }); }
  const money = T(pl.money), mm = money.match(/(?:วันนี้|today)\s*≈\s*[^·(]+/i), nl = (pl.learn || []).length, nq = (pl.quiz || []).length;
  const row = (dt, dd, cls) => `<div${cls ? ` class="${cls}"` : ''}><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const box = (c, icon, title, rowsHtml) => (rowsHtml ? `<section class="cbox c-${c}"><h3 class="ch">${ic(icon)}${title}</h3><dl class="dsheet">${rowsHtml}</dl></section>` : '');
  const go = [pl.moving && row(L('เดินทาง', 'Getting around'), esc(T(pl.moving))),
    pl.stay && row(L('คืนนี้', 'Tonight'), `<span class="nmrow">${esc(pl.stay.name)}${navB(pl.stay.q || pl.stay.addr, pl.stay.name)}</span>`),
    ...((t.info || {}).more || []).filter((m) => m.img && new RegExp(`^Day ${i + 1}\\b`).test((m.title || {}).en || '')).map((m) => row(L('แผนที่', 'Map'), `<a href="${esc(m.img)}" target="_blank" rel="noopener">${esc(T(m.title).replace(/^[^·]*·\s*/, ''))} ↗</a>`))].filter(Boolean).join('');
  const food = [pl.pick && row(L('ร้านเด็ด', 'Local pick'), esc(T(pl.pick))),
    ...(pl.picks || []).map((p) => row(`<span class="mtag mk-${mealKind(p)}">${esc(T(p.meal).split(' · ')[0])}</span>${T(p.meal).includes(' · ') ? `<span class="mt">${esc(T(p.meal).split(' · ').slice(1).join(' · '))}</span>` : ''}`, mealDd(p), 'meal'))].filter(Boolean).join('');
  const more = [money && row(L('เงินวันนี้', 'Money today'), `<span class="num">${esc(mm ? mm[0].replace(/^(?:วันนี้|today)\s*/i, '').trim() : brief(money))}</span>`),
    d.wx && row(L('อากาศ', 'Weather'), esc(T(d.wx))),
    wxLine(t, i) && !pre && row(L('พยากรณ์วันนี้', 'Live forecast'), `<span class="wxlive">${emoIn(esc(wxLine(t, i)))}</span>`),   // before the trip the live line sits above the fold instead
    (nl || nq) && row(L('เรียนรู้', 'Learn'), esc(L(`${nl} เรื่อง · ${nq} คำถามในรถ`, `${nl} card${nl === 1 ? '' : 's'} · ${nq} car question${nq === 1 ? '' : 's'}`)))].filter(Boolean).join('');
  return `${rows.length ? `<section class="cbox c-sky"><h3 class="ch">${ic('clock')}${L('ไทม์ไลน์', 'Timeline')}</h3><ol class="tl plan brief">${rows.map((r, k) => `<li${st[k] ? ` class="${st[k]}"` : ''}><time>${esc(r.t || '')}</time><div${tlMore(r) ? ' role="button" tabindex="0" aria-expanded="false"' : ''}>${st[k] === 'next' ? `<span class="nexttag">${L('ถัดไป', 'Next')}</span> ` : ''}${tlBrief(r)}</div></li>`).join('')}</ol></section>` : ''}
${pre && wxLine(t, i) ? `<p class="wxpre">${ic('weather')} <span class="wxlive">${emoIn(esc(wxLine(t, i)))}</span></p>` : ''}${pre ? `<details class="dmore"><summary><span><b>${L('รายละเอียดวันนี้', 'The rest of the day')}</b><small>${L('เดินทาง · มื้ออาหาร · แผนสำรอง · เงิน · อากาศ', 'Getting around · meals · plan B · money · weather')}</small></span>${ic('chev', 'chv')}</summary>` : ''}<div class="cgrid">${box('ind', 'route', L('เดินทางและที่พัก', 'Getting around & tonight'), go)}${box('sun', 'eat', L('มื้ออาหาร', 'Meals'), food)}${pl.planB ? `<section class="cbox c-hot"><h3 class="ch">${ic('shuffle')}${L('แผนสำรอง', 'Plan B')}</h3>${pts(T(pl.planB))}</section>` : ''}${box('leaf', 'money', L('เงิน อากาศ และเรื่องเล่า', 'Money, weather, stories'), more)}</div>${pre ? '</details>' : ''}
${reportBtn(full, L('อ่านแผนเต็มของวันนี้', "Read today's full plan"))}`;
}
// grown-ups switch the trip reminders on per phone (the server pushes 30 min before each timed step of the day);
// once on, the box leaves the Today page and lives on the Offline page (test / turn off)
// reminders, offered right after signing in (parents only), at the top of the shelf — until they are on or the parent says "later".
// On an iPhone in Safari the phone can't take reminders yet: the card says the one step that makes it possible (Home Screen).
function remindAsk() {
  if (!isEditor() || ls('remind') || ls('remindLater')) return '';
  const ios = isIOS(), standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (!pushOk() && !(ios && !standalone)) return '';   // a browser that can never show them: say nothing
  const needHome = ios && !standalone;
  return `<div class="remind ask">${ic('bell')}<span><b>${L('ให้แอปเตือนระหว่างทริป', 'Reminders during the trip')}</b>
<small>${needHome ? L('บน iPhone/iPad: แตะปุ่มแชร์ ⬆️ → "เพิ่มไปยังหน้าจอโฮม" แล้วเปิดแอปจากไอคอน จากนั้นกด "เปิดการเตือน" ตรงนี้', 'On iPhone/iPad: tap Share ⬆️ → "Add to Home Screen", open the app from its icon, then turn reminders on here')
    : L('ก่อนกิจกรรม 30 นาที · ประตูเซอร์ไพรส์ 08:00 · ชวนบันทึก 21:30', '30 min before each step · a surprise door at 08:00 · record the day at 21:30')}</small></span>
<span class="rb"><button class="btn small ghost" data-a="remindlater">${L('ไว้ทีหลัง', 'Later')}</button>${needHome ? '' : `<button class="btn small" data-a="remind">${L('เปิดการเตือน', 'Turn on')}</button>`}</span></div>`;
}
// one line, never a second card (owner's review, Nov 2026: the same reminder card sat on the shelf, the Today page and the no-signal page):
// on → "เตือนเปิดอยู่ ✓" with a link to the no-signal page (test / turn off live there); off → the line and one "เปิด" button.
// A browser that can never show reminders gets nothing (the shelf's ask card already says the iPhone Home-Screen step).
function remindLine(t) {
  if (!isEditor()) return '';
  const on = !!ls('remind');
  if (!on && !pushOk()) return '';
  return `<div class="remind line${on ? ' on' : ''}">${ic('bell')}<span><b>${on ? L('เตือนเปิดอยู่ ✓ ก่อนทุกกิจกรรม 30 นาที', 'Reminders on ✓ 30 min before each step') : L('ยังไม่เปิดเตือนก่อนกิจกรรม 30 นาที', 'Reminders 30 min before each step are off')}</b></span>${on ? `<a class="btn small ghost" href="#/t/${esc(t.id)}/offline">${L('ตั้งค่า', 'Settings')}</a>` : `<button class="btn small" data-a="remind">${L('เปิด', 'Turn on')}</button>`}</div>`;
}
function remindBar() {
  const on = !!ls('remind');
  return `<div class="remind${on ? ' on' : ''}">${ic('bell')}<span><b>${on ? L('เตือนก่อนทุกกิจกรรม 30 นาที · เปิดอยู่', 'Reminders 30 min before each step · on') : L('ให้แอปเตือนก่อนทุกกิจกรรม 30 นาที', 'Remind me 30 min before each step')}</b>
<small>${L('เด้งแม้ล็อกจอ: ก่อนกิจกรรม 30 นาที · ประตูเซอร์ไพรส์ 08:00 · ชวนบันทึก 21:30 · เก็บเล่มก่อนบิน 2 วัน', 'Pops up on this phone even when locked · from the times in the day’s plan · plus: store the book 2 days before the flight · a surprise door each morning at 08:00 · record the day each evening at 21:30')}</small></span>
<span class="rb">${on ? `<button class="btn small ghost" data-a="remindtest">${L('ทดสอบ', 'Test')}</button>` : ''}<button class="btn small${on ? ' ghost' : ''}" data-a="remind">${on ? L('ปิด', 'Turn off') : L('เปิดการเตือน', 'Turn on')}</button></span></div>`;
}
// ask the guide (editors, when Claude is on): a question answered from this book's manual only; the answer is not stored
// today's bag: what the day's own plan says to carry — read from the manual's timeline rows and the climate note (English text,
// matched by rule), each item with the step that asks for it; plus a short everyday line. Ticks stay on this phone (ls 'ck').
const BAG = [
  ['passports', '📕', 'หนังสือเดินทางทุกคน', 'Everyone’s passports', /\bpassports\b|immigration|passport control|border/i],
  ['kidpp', '🛂', 'พาสปอร์ตนักผจญภัยของเด็กๆ', 'The kids’ adventure passport', /\bthe Passport\b|Passport stamps|adventure passport/i],
  ['swim', '🩱', 'ชุดว่ายน้ำ ผ้าเช็ดตัว', 'Swimmers and a towel', /\bswim|water ?park|water play|netted baths/i],
  ['sun', '🧴', 'ครีมกันแดด หมวก', 'Sunscreen and hats', /sunscreen|\bhats?\b|strong sun/i],
  ['warm', '🧥', 'เสื้อแขนยาว / แจ็กเก็ต', 'A long-sleeve layer / jackets', /jacket|long-sleeve|\blayer\b|cool(s)? (down|quickly)|\bcold\b/i],
  ['carrier', '🎒', 'เป้อุ้มมีก้า', 'Mika’s carrier', /\bcarrier\b/i],
  ['pram', '🛒', 'รถเข็น', 'The stroller', /stroller|\bpram\b/i],
  ['cash', '💵', 'เงินสด', 'Cash', /\bcash\b/i],
  ['octopus', '💳', 'บัตร Octopus', 'Octopus cards', /Octopus/],
  ['contactless', '💳', 'บัตร contactless (รถไฟ เรือ)', 'Contactless cards (train, ferry)', /contactless|\bOpal\b/i],
  ['tickets', '🎟️', 'ตั๋ว / บอร์ดดิ้งพาสในโทรศัพท์', 'Tickets / boarding passes on the phone', /boarding pass|timed ticket|tickets? on the phone/i],
  ['spare', '👕', 'เสื้อผ้าสำรอง', 'Spare clothes', /spare clothes/i],
  ['snacks', '🍎', 'ขนม ขวดน้ำ', 'Snacks and water bottles', /snacks?|water bottles?/i],
  ['nappies', '🧷', 'ผ้าอ้อม ทิชชู่เปียก', 'Nappies and wipes', /nappies|nappy|diaper/i],
  ['move', '🧳', 'วันย้ายที่พัก: เช็กของในห้องก่อนออก', 'Moving day: check the room before you go', /check ?-?out|pack the van|big bags|last pack/i],
];
const BAG_ALWAYS = ['snacks', 'nappies', 'spare'];   // a 1½-year-old and a 3-year-old: these go every day
function dayBag(t, i) {
  const d = t.days[i], rows = ((d.plan || {}).plan || []).map((r) => ({ when: r.t || '', en: r.en || '', th: r.th || '' })).concat(d.wx ? [{ when: '', en: d.wx.en || '', th: d.wx.th || '' }] : []);
  return BAG.map(([k, e, th, en, re]) => {
    const r = rows.find((x) => re.test(x.en));
    if (!r && !BAG_ALWAYS.includes(k)) return null;
    const why = r ? `${r.when ? r.when + ' · ' : ''}${brief(L(r.th, r.en) || r.en, 70)}` : L('ทุกวัน', 'every day');
    return { k, e, th, en, why, fromPlan: !!r };
  }).filter(Boolean).sort((a, b) => b.fromPlan - a.fromPlan);
}
function bagBlock(t, i) {
  if (!isEditor()) return '';
  const items = dayBag(t, i), ck = ls('ck') || {}, key = (k) => `${t.id}.bag.d${i}.${k}`, got = items.filter((x) => ck[key(x.k)]).length;
  return `<details class="bag noprint"${dayNow(t) === i && got < items.length ? ' open' : ''}><summary>${emo('🎒')} ${L('กระเป๋าวันนี้', 'Today’s bag')} <span class="label">${got ? L(`จัดแล้ว ${got}/${items.length}`, `${got}/${items.length} packed`) : L(`${items.length} อย่าง`, `${items.length} thing${items.length === 1 ? '' : 's'}`)}</span>${ic('chev', 'chv')}</summary>
<ul class="chk bagl">${items.map((x) => `<li><label><input type="checkbox" data-ck="${esc(key(x.k))}"${ck[key(x.k)] ? ' checked' : ''}><span>${emo(x.e)} ${esc(L(x.th, x.en))}<small>${esc(x.why)}</small></span></label></li>`).join('')}</ul>
<p class="label">${L('จากแผนของวันนี้ในคู่มือ · ติ๊กเก็บไว้ในเครื่องนี้', 'From today’s plan in the manual · ticks stay on this phone')}</p></details>`;
}
function askBlock(t, i) {
  if (!isEditor() || !S.features.story) return '';
  const a = askAns && askAns.t === t.id ? askAns : null, dv = `data-t="${esc(t.id)}" data-d="${i}"`;
  const ex = [L('ถ้าฝนตกวันนี้ทำอะไรแทน', 'What do we do if it rains today?'), L('ร้านกินง่ายใกล้ที่พักคืนนี้', 'An easy dinner near tonight’s stay?'), L('ถ้าเด็กหลงทำยังไง', 'What if a child gets lost?')];
  return `<section class="ask noprint"><h3>${ic('route')} ${L('ถามไกด์', 'Ask the guide')} <span class="label">${L('ผู้ช่วยตอบจากคู่มือของเล่มนี้เท่านั้น', 'The helper answers from this book’s manual only')}</span></h3>
<div class="row askrow"><input id="askq" class="field" type="search" enterkeyhint="send" maxlength="300" data-draft="ask:${esc(t.id)}" value="${esc(drafts['ask:' + t.id] ?? (a ? a.q : ''))}" placeholder="${L('เช่น วันนี้กินข้าวเที่ยงที่ไหน', 'e.g. where do we have lunch today?')}">
<button class="btn" data-a="ask" ${dv} id="askgo">${L('ถาม', 'Ask')}</button><button class="btn ghost" data-a="storystop" id="askstop" hidden>■</button></div>
<div class="chips">${ex.map((x) => `<button class="chip" data-a="ask" ${dv} data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>
<div class="call calm askans" id="askans"${a && (a.text || a.html) ? '' : ' hidden'}>${a ? a.html || esc(a.text) : ''}</div></section>`;
}
function viewToday(t, j, full) {
  ensureWx(t);   // the live forecast arrives in the background and re-renders once (see core.js)
  const i = j !== undefined && j >= 0 && j < t.days.length ? j : todayIdx(t), d = t.days[i], dn = dayNow(t), until = daysUntil(t), pl = d.plan || {};
  const strip = t.days.map((x, k) => `<a href="#/t/${esc(t.id)}/today/${k}${full ? '/full' : ''}" aria-current="${k === i}">${k === dn ? `<span class="today">${L('วันนี้', 'Today')}</span>` : ''}<b>${String(k + 1).padStart(2, '0')}</b><small>${esc(fmtDay(x.date, { day: 'numeric', month: 'short' }))}</small></a>`).join('');
  // before the trip (owner's review, Nov 2026: this page ran 3,500 px months ahead): the countdown with the two things to do now,
  // the day's timeline, the rest of the day under one line, the bag closed, the kids' mission waiting for the trip
  const pre = dn < 0 && until > 0 && !full, has = pre ? hasInfo(t) : null;
  const banner = dn < 0 && until > 0 ? `<div class="call info${pre ? ' pre' : ''}"><b>${L(`อีก ${until} วันออกเดินทาง`, `${until} days to go`)}</b> <span class="cdsub">${L(`นี่คือแผนวันที่ ${i + 1} จากคู่มือ`, `This is the plan for day ${i + 1}`)}</span>${pre ? `<div class="row">${has.prep ? `<a class="btn small ghost" href="#/t/${esc(t.id)}/prep">${ic('prep')} ${L('สิ่งที่ต้องเตรียม', 'What to prepare')}</a>` : ''}${isEditor() ? `<a class="btn small ghost" href="#/t/${esc(t.id)}/offline">${ic('offline')} ${L('เก็บเล่มไว้ในเครื่อง', 'Store the book on the phone')}</a>` : ''}</div>` : ''}</div>`
    : dn < 0 && until <= 0 ? `<div class="call calm">${L('จบทริปแล้ว — เปิดสมุดความทรงจำได้เลย', 'The trip is over — open the memory book')}</div>` : '';
  const mission = ((t.passport || {}).days || [])[i];
  return `<div class="daystrip" role="tablist">${strip}</div>
<article class="day today" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div><div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}${i === dn ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}</div><div></div><h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart')}
${dayFacts(d)}</div></article>
${banner}
${isEditor() && (dn >= 0 || until > 0) ? remindLine(t) : ''}
<div class="row quick">${isEditor() ? `<a class="btn" href="#/t/${esc(t.id)}/log/${i}">${ic('log')} ${L('บันทึกวันนี้', 'Record today')}</a>` : ''}${pl.route ? extA(pl.route, ic('route') + ' ' + L('เส้นทางวันนี้', "Today's route"), 'qlink') : ''}${pl.stay ? extA(mapsUrl(pl.stay.q || pl.stay.addr), ic('stays') + ' ' + L('ไปที่พัก', 'To the stay'), 'qlink') : ''}${eatCount(t) ? `<a class="qlink" href="#/t/${esc(t.id)}/eat/d/${i}">${ic('eat')} ${L('ร้านอาหาร', 'Eat')}</a>` : ''}</div>
${full ? '' : bagBlock(t, i)}
${full ? '' : nextBlock(t, i)}
${full ? '' : askBlock(t, i)}
${(full ? planHtml(t, i, true, false, { full: true }) : dayGlance(t, i, pre)) || `<div class="empty">${L('วันนี้ไม่มีแผนในคู่มือ', 'No plan in the manual for this day')}</div>`}
${!pre && mission && (mission.facts || []).length ? `<div class="part kidm">${L('ภารกิจของเด็กๆ วันนี้', "The kids' mission today")}</div><div class="call pick mission"><b>${esc(T(mission.title))}</b><ul class="tips">${mission.facts.map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul></div>` : ''}`;
}
// the whole trip: one line per day (tap → that day); the road book with every plan is the full report
function viewPlan(t, full) {
  const n = t.info || {};
  if (!full) { const now = dayNow(t), dm = n.drive && infoBlocks(t).meta.prep.find((m) => m.key === 'drive');
    const rows = t.days.map((d, i) => `<li${i === now ? ' class="now"' : ''}><a href="#/t/${esc(t.id)}/today/${i}">${artImg(t, i)}<span class="grow"><span class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${dayHasContent(t, i) ? ` <span class="done">${L('บันทึกแล้ว', 'Recorded')}</span>` : ''}</span><b class="tt">${esc(T(d.title))}</b>${d.sleep ? `<small>${esc(T(d.sleep))}</small>` : ''}</span>${ic('chev')}</a></li>`).join('');
    return `<div class="tp tp-plan glance">${topicHead('plan', L('แตะวันไหนก็ได้เพื่อเปิดแผนของวันนั้น', 'Tap a day to open its plan'))}<ol class="drows">${rows}</ol>${dm ? `<div class="glg">${glc(fullHref(t, 'plan'), dm.title, dm.sub)}</div>` : ''}${reportBtn(fullHref(t, 'plan'), L('แผนทั้งทริปแบบรายงานเต็ม', 'The whole trip as a full report'))}</div>`; }
  return `<div class="tp tp-plan full"><h1 class="h2">${secTitle('plan')}</h1><p class="lede">${L('ทุกวันของทริป — แตะวันเพื่อดูแผน · ชื่อสถานที่เปิดแผนที่ได้', 'Every day of the trip — open "Plan for the day" for the detail · tap a place for its map')}</p>${itinerary(t)}${n.drive ? ((dv) => `${repSeg(dv)}<section class="pocket">${repOpen(dv)}</section>`)(infoBlocks(t).drive) : ''}</div>`;
}
// the pocket guide, split by topic (seed info → trips.info); each block is an open <details> so a long page still folds
function infoBlocks(t) {
  const n = t.info || {}, B = { stays: [], sos: [], prep: [], learn: [], drive: '', meta: { stays: [], sos: [], prep: [], learn: [] } };
  // every section also leaves a one-line teaser (sub) for the glance page; key names the sections a glance page shows inline
  const pg = (k, sub, key, title, inner) => { title = noEmo(title); B.meta[k].push({ title, sub: sub || '', key: key || '' }); B[k].push(`<details class="pg" open id="pg-${k}-${B[k].length}"><summary>${title}</summary>${inner}</details>`); };
  const sh = (x, len) => { const a = brief(T(x), len || 48); return esc(/…$/.test(a) ? brief(T(x), 110) : a); };   // one short phrase; never cut with "…" (a long clause keeps the old, longer teaser)   // a glance card's second line: one short phrase (owner, Nov 2026: "reads like a lecture")
  const tel = (x) => `<a href="tel:${esc(String(x).split('·')[0].replace(/[^+\d]/g, ''))}">${esc(x)}</a>`;   // "number · address" → dial the number only
  const cellS = (c) => (c && typeof c === 'object' ? T(c) : String(c == null ? '' : c)).trim(), noVal = (x) => !x || /^[—–-]$/.test(x);
  const hLbl = (c) => T(c).split(/\s+·\s+|\s*\(/)[0].trim();   // a stacked cell's label: the header's first words, not its whole note
  const tbl = (cols, rows, cls) => `<div class="tblwrap"><table class="prices ${cls || ''}">${cols ? `<thead><tr>${cols.map((c) => `<th>${esc(T(c))}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.map((r) => { const v = r.map(cellS);
    if (v.length > 1 && v.slice(1).every(noVal)) return `<tr class="grp"><th colspan="${v.length}">${esc(v[0])}</th></tr>`;   // a heading row ("Fantasyland — first")
    return `<tr>${v.map((x, k) => (k === 0 ? `<td class="nm">${/^\d{1,2}$/.test(x) && cols && cols[0] ? `${esc(hLbl(cols[0]))} ${esc(x)}` : esc(x)}</td>` : noVal(x) ? '<td class="nv"></td>' : `<td${x.length <= 14 ? ' class="s"' : ''}${cols && cols[k] ? ` data-h="${esc(hLbl(cols[k]))}"` : ''}>${esc(x)}</td>`)).join('')}</tr>`; }).join('')}</tbody></table></div>`;   // phones stack each row into a card, every value labelled by its column (app.css)
  // a to-do table (when · task · action, or what · for · when/how) as cards: the date as a chip, the task bold, the action as short points
  const steps = (cols, rows) => { const c = (cols || []).map((x) => (x.en || T(x)).toLowerCase()), w = c[0] === 'when' ? [0, 1, 2] : [1, 0, 2];
    if ((cols || []).length !== 3) return tbl(cols, rows);
    return `<ol class="steps">${rows.map((r) => { const v = r.map((x) => (typeof x === 'object' ? T(x) : String(x))), done = /^(done|เสร็จ)/i.test(v[w[0]]);
      return `<li${done ? ' class="ok"' : ''}><span class="when">${done ? '✓ ' : ''}${esc(v[w[0]])}</span><b>${esc(v[w[1]])}</b>${pts(v[w[2]], 'tight')}</li>`; }).join('')}</ol>`; };
  // the pocket guide reads like the Today page (owner's review, Nov 2026): a short headline you see first, the detail one tap below it
  const fold = (head, body, cls) => `<details class="ifold${cls ? ' ' + cls : ''}"><summary><span class="fs">${head}</span>${ic('chev')}</summary><div class="fb">${body}</div></details>`;
  const cellT = (c) => (typeof c === 'object' && c ? T(c) : String(c == null ? '' : c));
  // an if-then table as one line per case ("ถ้า … "), what to do folded under it; a third column keeps its label
  const ifts = (cols, rows) => `<div class="ifts">${rows.map((r) => fold(`<b>${esc(cellT(r[0]))}</b>`, r.slice(1).map((c, k) => [c, k]).filter(([c]) => !/^[—–-]?$/.test(cellT(c).trim())).map(([c, k]) => `${r.length > 2 && cols && cols[k + 1] ? `<span class="label">${esc(T(cols[k + 1]))}</span>` : ''}${pts(cellT(c), 'tight')}`).join(''), 'ift')).join('')}</div>`;
  // a long opening paragraph: its first point stays, the rest folds under "อ่านต่อ"
  const lede = (x) => { if (!(x && T(x))) return ''; if (T(x).length <= 150) return `<p class="lede">${esc(T(x))}</p>`;
    const p = points(T(x)); return p.length > 1 ? `<p class="lede">${pt(p[0])}</p>${fold(`<span class="more">${L('อ่านต่อ', 'Read more')}</span>`, pts(p.slice(1).join(' · '), 'lede'), 'ledemore')}` : pts(T(x), 'lede'); };
  const list = (items) => { const xs = items.flatMap((x) => { const p = points(T(x)); return p.length >= 3 && p.every((y) => y.length < 40) ? p : [T(x)]; });
    if (xs.length > 1 && xs.every((x) => /^\d+\.\s/.test(x))) return `<ol class="tips nums">${xs.map((x) => `<li>${lead(x.replace(/^\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
    return `<ul class="tips">${xs.map((x) => `<li>${lead(x)}</li>`).join('')}</ul>`; };
  // tickable checklist, like the manual's boxes — ticks are a per-phone convenience (localStorage), nothing is sent
  const ckDone = ls('ck') || {};
  const chk = (items, key) => `<ul class="chk">${items.map((x, i) => { const k = `${t.id}.${key}.${i}`; return `<li><label><input type="checkbox" data-ck="${esc(k)}"${ckDone[k] ? ' checked' : ''}><span>${esc(T(x))}</span></label></li>`; }).join('')}</ul>`;
  const packSub = () => { const all = (n.pack || []).flatMap((g, gi) => g.items.map((_, i) => `${t.id}.pack${gi}.${i}`)), got = all.filter((k) => ckDone[k]).length; return esc(got ? L(`จัดแล้ว ${got}/${all.length}`, `${got}/${all.length} packed`) : L(`${all.length} อย่าง`, `${all.length} things`)); };
  const cols = (blocks) => `<div class="cols2">${blocks.join('')}</div>`;
  const CJK = /[\u3400-\u9FFF]/;
  const dl = (rows) => (rows.length > 2 && rows.every((r) => /^(\d{1,2}[:.]\d{2}|.{1,3})$/.test(T(r.t).trim()))
    ? `<ol class="tl plan mtl">${rows.map((r) => `<li><time>${esc(T(r.t))}</time><div>${pts(T(r.x), 'tight')}</div></li>`).join('')}</ol>`   // "10:00 → …" rows, or stops 1…9
    : `<dl class="gl">${rows.map((r) => { const x = T(r.x), p = points(x);
      return `<div><dt>${esc(T(r.t))}</dt><dd>${CJK.test(x) ? `<span class="cjk">${x.split(/\s+·\s+/).map((y) => `<span${CJK.test(y) ? ' class="zh"' : ''}>${esc(y)}</span>`).join('')}</span>` : p.length > 2 ? fold(pt(p[0]), pts(p.slice(1).join(' · '), 'tight'), 'ddf') : lead(x)}</dd></div>`; }).join('')}</dl>`);
  // stays — laid out like the manual's "Where we sleep": a night-by-night strip in each stay's colour, then one card per stay
  const SC = ['#B5486F', '#3E7EA6', '#B98535', '#5E6FA8', '#5B8A6A', '#2E8C8C', '#C9704F', '#2F4E6E', '#8A5A9E', '#A0623A'];
  const nights = t.days.map((d, i) => ({ i, d, s: (d.plan || {}).stay })).filter((x) => x.s || (x.d.sleep && !isHome(x.d.sleep)));
  const runs = []; nights.forEach((x) => { const key = x.s ? x.s.name : T(x.d.sleep), last = runs[runs.length - 1]; if (last && last.key === key) last.n.push(x); else runs.push({ key, n: [x] }); });
  const col = B.col = (r) => SC[r % SC.length], runOf = (x) => runs.findIndex((r) => r.n.includes(x));
  const stayCard = (s, k) => { const [pn, ...pr] = T(s.prop).split(' · ');
    return `<div class="stayc" style="--c:${col(k)}"><div class="sh"><span class="nn">${s.n} ${L('คืน', s.n > 1 ? 'nights' : 'night')}</span><span>${esc(T(s.ci))} → ${esc(T(s.co))}</span></div>
<h4>${esc(T(s.base))}</h4><div class="prop"><b>${esc(pn)}</b>${pr.length ? ` <span>· ${esc(pr.join(' · '))}</span>` : ''}</div>${T(s.why) ? pts(T(s.why)) : ''}${T(s.check) ? `<div class="chk"><b>${L('เช็ก', 'Check')}</b>${pts(T(s.check))}</div>` : ''}
<div class="addr">${addrHtml(s.addr)}</div>
<div class="sf">${T(s.status) ? `<span class="st">${esc(T(s.status))}</span>` : ''}<span class="acts">${extA(mapsUrl(s.q || s.addr), L('แผนที่', 'Map') + ' ↗', 'go')}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.q || s.addr)}`, L('นำทาง', 'Directions') + ' ↗', 'go')}<button class="go" data-a="driver" data-t="${esc(t.id)}" data-v="${k}">${ic('car')} ${L('ให้คนขับดู', 'Show the driver')}</button></span></div></div>`; };
  if (nights.length) pg('stays', esc(L(`${nights.length} คืน · ${runs.length} ที่พัก`, `${nights.length} nights · ${runs.length} stays`)), 'strip', `🌙 ${L('คืนต่อคืน', 'Night by night')}`, (B.strip = `<div class="nstripw"><div class="nstrip" style="--n:${nights.length}">${nights.map(({ d }) => `<div class="nd"><b>${esc(fmtDay(d.date, { day: 'numeric' }))}</b><small>${esc(fmtDay(d.date, { weekday: 'short' }))}</small></div>`).join('')}
${runs.map((r, k) => { const st = (n.stays || [])[k], a = nights.indexOf(r.n[0]) + 1; return `<span class="nb" style="grid-column:${a} / span ${r.n.length};--c:${col(k)}" title="${esc(r.key)}">${esc(st ? T(st.base) : r.key)}</span>`; }).join('')}</div></div>`) + `
<p class="label">${L('วันเช็กเอาต์คือเช้าวันที่ออก ไม่ใช่คืนเพิ่ม', 'Check-out is the morning you leave, not an extra night')}</p>
<details class="sub"><summary>${L('รายคืนพร้อมที่อยู่', 'Every night with its address')} <span class="label">· ${nights.length}</span></summary><ol class="nights">${nights.map((x) => { const { i, d, s } = x; return `<li style="--c:${col(runOf(x))}"><b>${L('คืนที่', 'Night')} ${i + 1}</b> <small>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small><div>${s ? mapA(s.q || s.addr, esc(s.name)) : esc(T(d.sleep))}${s && s.addr ? `<br><span class="label">${esc(s.addr)}</span>` : ''}</div></li>`; }).join('')}</ol></details>`);
  if ((n.stays || []).length) pg('stays', esc(n.stays.map((x) => T(x.base)).join(' · ')), 'all', `🛏️ ${L('ที่พักทั้งหมด', 'All our stays')} <span class="label">· ${n.stays.length}</span>`, `<div class="stays">${n.stays.map(stayCard).join('')}</div><p class="label">${L('ให้คนขับดูที่อยู่ได้เลย · เลขจองและใบยืนยันอยู่ในแอปคู่มือ', 'Show the driver the address · bookings and confirmations live in the guide app')}</p>`);
  if (n.kit) pg('stays', sh(n.kit.lede), '', `🍳 ${esc(T(n.kit.head))}`, `${lede(n.kit.lede)}${tbl(n.kit.cols, n.kit.rows)}${n.kit.rules ? `<div class="call calm"><span class="lbl">${esc(T(n.kit.rules.title))}</span>${pts(T(n.kit.rules))}</div>` : ''}`);
  // emergency
  // emergency — one card like the manual's back page: the numbers, every night's address for a taxi, the lost-child line
  const tonight = (t.days[todayIdx(t)].plan || {}).stay, tk = (n.stays || []).findIndex((s) => tonight && (s.q === tonight.q || s.addr === tonight.addr));
  const nightsLbl = (r) => { const a = r.n[0].i + 1, z = r.n[r.n.length - 1].i + 1; return a === z ? `${L('คืนที่', 'Night')} ${a}` : `${L('คืนที่', 'Nights')} ${a}–${z}`; };
  if ((n.emergency || []).length || n.lost || runs.length) pg('sos', esc(L(`ทุกเบอร์ + ที่อยู่ทุกคืน`, 'Every number + every night’s address')), 'card', `🆘 ${L('บัตรฉุกเฉิน', 'Emergency card')}`, `<div class="ecard"><h4>${esc(T(t.title).split(' · ').pop())} <span class="label">· ${esc(fmtRange(t))}</span></h4>
${(n.emergency || []).length ? `<ul class="emerg">${n.emergency.map((e) => { const [lb, ...lx] = T(e.label).split(' · '), [num, ...tx] = String(e.tel).split(' · '), more = [...lx, ...tx];   // the number on the right, an address under the name
  return `<li class="${e.main ? 'main' : ''}"><span>${esc(lb)}${more.length ? `<small>${esc(more.join(' · '))}</small>` : ''}</span><b>${tel(num)}</b></li>`; }).join('')}</ul>` : ''}
${runs.length ? `<h5>${L('ที่พักแต่ละคืน — ให้คนขับแท็กซี่ดูได้เลย', 'Each night’s address — show it to any taxi driver')}</h5><ul class="enights">${runs.map((r) => { const s0 = r.n[0].s; return `<li${tonight && s0 && s0.name === tonight.name ? ' class="now"' : ''}><b>${nightsLbl(r)}</b><span>${s0 ? nightAddr(s0.name, s0.addr) : esc(r.key)}</span></li>`; }).join('')}</ul>` : ''}
${n.lost ? `<div class="elost">${pts(T(n.lost), 'tight')}</div>` : ''}</div>`);
  if (tonight) pg('sos', esc(tonight.name), 'tonight', `🛏️ ${L('ที่พักคืนนี้', 'Tonight’s address')}`, B.tonight = `<div class="stayc tonight"><h4>${esc(tonight.name)}</h4><div class="addr">${addrHtml(tonight.addr || '')}</div><div class="sf"><span class="acts">${extA(mapsUrl(tonight.q || tonight.addr), L('แผนที่', 'Map') + ' ↗', 'go')}${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(tonight.q || tonight.addr)}`, L('นำทาง', 'Directions') + ' ↗', 'go')}${tk >= 0 ? `<button class="go" data-a="driver" data-t="${esc(t.id)}" data-v="${tk}">${ic('car')} ${L('ให้คนขับดู', 'Show the driver')}</button>` : ''}</span></div></div>`);
  if (n.ifthen) { const f = ifthenOf(n.ifthen), sub = (x) => (x ? `<h5>${esc(T(x.head))}</h5>${lede(x.lede)}${ifts(x.cols, x.rows)}` : '');
    pg('sos', esc(f.rows.slice(0, 3).map((r) => T(r[0])).join(' · ')), 'ifthen', `🔀 ${L('ถ้า… ก็…', 'If… then…')}${f.rows.length + ((f.mishap || {}).rows || []).length ? ` <span class="label">· ${f.rows.length + ((f.mishap || {}).rows || []).length}</span>` : ''}`, `${ifts(f.cols, f.rows)}${f.mishap ? `<h5>${esc(T(f.mishap.head))}</h5>${lede(f.mishap.lede)}${ifts(f.cols, f.mishap.rows)}` : ''}${sub(f.carry)}`);
    if (f.crowd) pg('prep', sh(f.crowd.lede), '', `👥 ${esc(T(f.crowd.head))}`, `${lede(f.crowd.lede)}${tbl(f.crowd.cols, f.crowd.rows)}`);
    if (f.book) pg('prep', sh(f.book.lede), '', `📅 ${esc(T(f.book.head))}`, `${f.book.lede && T(f.book.lede) ? `<p class="lede">${esc(points(T(f.book.lede))[0])}</p>` : ''}${steps(f.book.cols, f.book.rows)}`); }
  // get ready
  if ((n.pack || []).length) pg('prep', packSub(), 'pack', `🧳 ${L('จัดกระเป๋า', 'Packing')}`, `${cols(n.pack.map((g, gi) => `<div><h5>${esc(T(g.group))}</h5>${chk(g.items, `pack${gi}`)}</div>`))}<p class="label">${L('ติ๊กไว้ในเครื่องนี้เท่านั้น', 'Ticks stay on this phone')}</p>`);
  if (n.prices && (n.prices.rows || []).length) pg('prep', esc(L(`${n.prices.rows.length} รายการ`, `${n.prices.rows.length} items`)), '', `🎟️ ${esc(T(n.prices.head))}`, tbl(n.prices.cols, n.prices.rows));
  if (n.visa) pg('prep', sh(n.visa.lede), '', `🛂 ${L('วีซ่า', 'Visa')}`, `${lede(n.visa.lede)}${cols((n.visa.groups || []).map((g, gi) => `<div><h5>${esc(T(g.title))}</h5>${chk(g.items || [], `visa${gi}`)}</div>`))}${n.visa.flow ? `<h5>${esc(T(n.visa.flow.title))}</h5><ol class="tips">${(n.visa.flow.items || []).map((x) => `<li>${lead(T(x))}</li>`).join('')}</ol>` : ''}${n.visa.note ? `<div class="call warn">${pts(T(n.visa.note))}</div>` : ''}`);
  if (n.bio) pg('prep', sh(n.bio.lede), '', `🧳 ${L('ด่านตรวจอาหารและพืชขาเข้า', 'Biosecurity at the airport')}`, `${lede(n.bio.lede)}${cols(n.bio.groups.map((g) => `<div class="biog ${g.kind === 'never' ? 'no' : 'yes'}"><h5>${esc(T(g.title))}</h5>${list(g.items)}</div>`))}`);
  if (n.car) pg('prep', sh(n.car.lede), '', `🚙 ${L('รถเช่า', 'The van')} · ${esc(T(n.car.title))}`, `${lede(n.car.lede)}${dl(n.car.rows)}${cols(n.car.lists.map((g) => `<div><h5>${esc(T(g.title))}</h5>${list(g.items)}</div>`))}${n.car.fallback ? `<h5>${L('ทางเลือกสำรอง', 'Fallback')} · ${esc(T(n.car.fallback.title))}</h5>${dl(n.car.fallback.rows)}` : ''}`);
  if (n.drive) { const dv = n.drive, km = dv.legs.reduce((a, g) => a + g[2], 0);
    const dvt = `${esc(T(dv.title))} <span class="label">· ${dv.legs.length} ${L('ช่วง', 'legs')} · ${km.toLocaleString()} ${L('กม.', 'km')}</span>`;
    B.meta.prep.push({ title: dvt, sub: sh(dv.lede), key: 'drive' });
    B.drive = `<details class="pg" open id="pg-prep-${B.prep.length}"><summary>${dvt}</summary>${lede(dv.lede)}${tbl(dv.cols.slice(1), dv.legs.flatMap((g, k) => [...(k && dv.legs[k - 1][0] === g[0] ? [] : [[L('วันที่ ', 'Day ') + g[0], '—', '—']]), [g[1], g[2], durTxt(g[3])]]), 'legs')}${(dv.notes || []).map((x) => `<div class="call info">${x.title ? `<span class="lbl">${esc(T(x.title))}</span>` : ''}${pts(T(x))}</div>`).join('')}</details>`;
    B.prep.push(B.drive); }
  // learn
  if ((n.guide || []).length) pg('learn', esc(n.guide.slice(0, 3).map((g) => T(g.title)).join(' · ')), '', `🧭 ${L('เรื่องที่กำหนดแผนทั้งทริป', 'What shapes this trip')} <span class="label">· ${n.guide.length}</span>`, `<div class="gcards">${n.guide.map((g) => `<div class="gcard">${T(g.text) ? fold(`<b>${esc(T(g.title))}</b><div class="gsub">${esc(T(g.sub))}</div>`, pts(T(g.text), 'tight'), 'gf') : `<b>${esc(T(g.title))}</b><div class="gsub">${esc(T(g.sub))}</div>`}</div>`).join('')}</div>`);
  const learnDays = t.days.map((d, i) => ({ i, d, pl: d.plan || {} })).filter((x) => (x.pl.learn || []).length || (x.pl.quiz || []).length);
  if (learnDays.length) pg('learn', esc(L(`${learnDays.reduce((a, x) => a + (x.pl.learn || []).length, 0)} เรื่อง · ${learnDays.reduce((a, x) => a + (x.pl.quiz || []).length, 0)} คำถาม`, `${learnDays.reduce((a, x) => a + (x.pl.learn || []).length, 0)} cards · ${learnDays.reduce((a, x) => a + (x.pl.quiz || []).length, 0)} questions`)), 'days', `📚 ${L('เรียนรู้ระหว่างทาง · วันต่อวัน', 'Learn on the way · day by day')} <span class="label">· ${learnDays.length} ${L('วัน', 'days')}</span>`, learnDays.map(({ i, d, pl }) => `<details class="sub"><summary>${artImg(t, i)} <span class="st"><b>${L('วันที่', 'Day')}&nbsp;${i + 1}</b> · ${esc(T(d.title))}</span></summary>${(pl.learn || []).map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${lead(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline"><b>${L('เล่าให้เด็กฟัง', 'For the kids')}</b> ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}${(pl.quiz || []).length ? `<h5>${L('ถามหนูในรถ', 'Quiz in the car')}</h5>${quizHtml(pl.quiz)}` : ''}${pl.tale ? taleHtml(t, i, pl.tale) : ''}</details>`).join(''));
  if ((n.general || []).length) pg('learn', esc(n.general.map((g) => T(g.theme)).join(' · ')), '', `🗣️ ${L('เรียนรู้ระหว่างนั่งรถ', 'Learn in the car')} <span class="label">· ${n.general.reduce((s, g) => s + g.items.length, 0)}</span>`, `<div class="cols2">${n.general.map((g) => `<div><h5>${esc(T(g.theme))}</h5><dl class="words">${g.items.map((x) => `<div><dt>${esc(T(x.t))}</dt><dd>${esc(T(x.x))}</dd></div>`).join('')}</dl></div>`).join('')}</div>`);
  if ((n.wild || []).length) pg('learn', esc(n.wild.slice(0, 4).map((w) => T(w.name)).join(' · ')) + (n.wild.length > 4 ? ` · +${n.wild.length - 4}` : ''), 'wild', `${n.wildLabel ? `${esc(n.wildLabel.emo || '🐾')} ${esc(T(n.wildLabel.title))}` : `🦘 ${L('สัตว์ที่จะเจอ', 'Animals we may meet')}`} <span class="label">· ${n.wild.length}</span>`, `<div class="wildg">${n.wild.map((w) => `<div class="wc"><span class="we">${esc(w.emo || '🐾')}</span><div><b>${esc(T(w.name))}</b><p class="wt">${lead(T(w.text))}</p></div></div>`).join('')}</div>`);
  if (n.eatRules) pg('learn', sh(n.eatRules.lede), '', `🍽️ ${esc(T(n.eatRules.title))}`, `${lede(n.eatRules.lede)}${list(n.eatRules.rules)}<h5>${esc(T(n.eatRules.cookTitle))}</h5>${list(n.eatRules.cook)}`);
  // any other chapter of a manual (getting around, customs, a park touring plan…): one generic block, placed on the page it names
  (n.more || []).forEach((m) => { if (!B[m.page] || m.page === 'drive') return;
    pg(m.page, sh(m.lede), m.img ? 'map' : '', `${esc(m.emo || '📄')} ${esc(T(m.title))}`, `${m.img ? `<a class="mapimg" href="${esc(m.img)}" target="_blank" rel="noopener"><img src="${esc(m.img)}" alt="${esc(T(m.title))}" loading="lazy"></a>` : ''}${lede(m.lede)}${m.table ? tbl(m.table.cols, m.table.rows) : ''}${(m.rows || []).length ? dl(m.rows) : ''}${((gs) => (gs.length > 1 ? cols(gs.map((x) => `<div>${x}</div>`)) : gs.join('')))((m.groups || []).map((g) => `${g.title && T(g.title) && !noEmo(T(m.title)).includes(T(g.title).trim()) ? `<h5>${esc(T(g.title))}</h5>` : ''}${list(g.items || [])}`))}${m.note && T(m.note) ? `<div class="call info">${pts(T(m.note))}</div>` : ''}`); });
  return B;
}
/* ---------- glance first, the full report one tap away ----------
   A topic opens as a few big answer cards (what you need now, a line each). "📄 Full report" (#/t/<trip>/<topic>/full[/<k>]) is the
   manual-style page; a card opens it with its own section k open and scrolled to. */
const noEmo = (s) => String(s).replace(/^(?:[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]|\s)+/u, '');   // section titles carry no emoji (the manual has none)
// the first whole point of a paragraph (a short heading takes the next one along), capped
const brief = (s, n = 110) => {   // a teaser that ends on a whole phrase: the first point; if long, up to its last clause break (bracket closed, dash, comma, ·), and only then a "…"
  const p = points(s), x = (p[0] && p[0].length < 30 && p[1] ? `${p[0]}: ${p[1]}` : p[0] || '').trim();
  if (x.length <= n * 1.45) return x;
  const open = (z) => (z.match(/\(/g) || []).length > (z.match(/\)/g) || []).length, tidy = (z) => z.replace(/[\s,;:—–·(-]+$/, '');
  const cuts = [...x.slice(0, n * 1.3).matchAll(/\)(?=\s)|(?=\s[—–]\s)|(?=[,;]\s)|(?=\s·\s)/g)].map((m) => m.index + (m[0] === ')' ? 1 : 0)).filter((k) => k >= n * 0.4 && !open(x.slice(0, k)));
  if (cuts.length) return tidy(x.slice(0, cuts[cuts.length - 1]));
  if (x.length <= n * 2) return x;   // one long clause with no break: show it whole rather than cut a word
  const sp = [...x.slice(0, n).matchAll(/\s/g)].map((m) => m.index).filter((k) => k >= n * 0.5 && !open(x.slice(0, k)));
  return `${tidy(x.slice(0, sp.length ? sp[sp.length - 1] : n - 1))}…`;
};
const fullHref = (t, k, j) => `#/t/${esc(t.id)}/${k}/full${j !== undefined ? '/' + j : ''}`;
const reportBtn = (href, label) => `<a class="reportbtn" href="${href}">${ic('doc')}<b>${label || L('อ่านแบบรายงานเต็ม', 'Read the full report')}</b>${ic('chev')}</a>`;
const glc = (href, title, sub, cls) => `<a class="glc${cls ? ' ' + cls : ''}" href="${href}"><span class="gt"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${ic('chev')}</a>`;
const topicHead = (k, lede) => `<h1 class="h2">${secTitle(k)}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}`;
const emptyTopic = () => `<div class="empty">${L('เล่มนี้ยังไม่มีข้อมูลส่วนนี้', 'This book has nothing here yet')}</div>`;
/* Two versions, always (owner's rule, Nov 2026): the report reads short — each case, card or row a headline with its detail one tap
   below (`.ifold`) — or in full, the manual's text with every detail open, as the report was before the folds. A switch at the top
   of every report (`repSeg`, action `repmode`), kept per phone (`ls('repfull')`), changes it in place. */
const repFull = () => !!ls('repfull');
const repOpen = (html) => (repFull() ? html.replace(/<details class="ifold([^"]*)">/g, '<details class="ifold$1" open>') : html);
const repSeg = (html) => (html.includes('class="ifold') ? `<div class="tpk repseg" role="group" aria-label="${L('แบบรายงาน', 'Report view')}">${[['0', '📋', L('แบบสรุป', 'Short'), L('หัวข้อก่อน แตะดูรายละเอียด', 'Headlines, tap for detail')], ['1', '📄', L('แบบเต็ม', 'Full'), L('รายละเอียดเปิดครบทุกข้อ', 'Every detail open')]].map(([v, e, b, sm]) => `<button type="button" class="tpo" data-a="repmode" data-v="${v}" aria-pressed="${(v === '1') === repFull()}"><span class="rpe" aria-hidden="true">${e}</span><b>${b}</b><small>${sm}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>` : '');
// the report: every section of the manual; from a card only that section opens, otherwise a long page (20+ chapters) opens on its first
const topicPage = (t, k, blocks, lede, open) => ((body) => `<div class="tp tp-${k} full${repFull() ? ' repall' : ''}">${topicHead(k, lede)}${repSeg(body)}${blocks.length ? `<section class="pocket" id="pocket">${repOpen(body)}</section>` : emptyTopic()}</div>`)(blocks.map((b, i) => ((open !== undefined ? i !== open : blocks.length > 6 && i) ? b.replace('<details class="pg" open', '<details class="pg"') : b)).join(''));
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
${B.tonight ? `<h3 class="gh">${L('คืนนี้นอนที่', 'Tonight we sleep at')}</h3>${B.tonight}` : ''}${n.lost ? `<div class="call warn lostc">${pts(T(n.lost), 'tight')}</div>` : ''}${lostBlock(t)}`;
  return glancePage(t, 'sos', B, lede, top, ['tonight']);
}
/* ---------- lost-child card (SOS page, editors): drawn on the phone (sheets.js drawLostCard) as a lock-screen picture — the child,
   "I'm lost, please call my parents" in English / Thai / the local language, the parents' numbers, tonight's address, the
   emergency number. This morning's photo and the numbers stay on the phone: the photo only in memory, the numbers in localStorage. */
let lostKid = null, lostPhoto = null;   // lostPhoto: an object URL of this morning's photo, never uploaded or stored
function lostBlock(t) {
  if (!isEditor()) return '';
  const kids = children().map((c) => c.slug), k = kids.includes(lostKid) ? lostKid : kids[0], tel = ls('lostTel') || ['', ''];
  return `<section class="blk lostcard noprint"><h3>${ic('passport')} ${L('การ์ดเด็กหลง', 'Lost-child card')}</h3>
<p class="label">${L('ทุกเช้า: ถ่ายรูปลูกในชุดวันนี้ → ได้การ์ดตั้งเป็นหน้าจอล็อก มีชื่อ เบอร์พ่อแม่ ที่พักคืนนี้ และเบอร์ฉุกเฉิน', 'Each morning: a photo of the child in today’s clothes → a card for the lock screen or to show staff — name, the parents’ numbers, tonight’s address and the emergency number')}</p>
<div class="row" role="group">${kids.map((x) => `<button class="chip" data-a="lckid" data-v="${esc(x)}" aria-pressed="${x === k}">${kidFace(x)} ${esc(kidName(x))}</button>`).join('')}</div>
<div class="row lcrow"><input class="field" id="lctel0" type="tel" inputmode="tel" autocomplete="tel" placeholder="${L('เบอร์พ่อ/แม่ เช่น +66 81 234 5678', 'A parent’s number, e.g. +66 81 234 5678')}" value="${esc(tel[0] || '')}" data-lc="0">
<input class="field" id="lctel1" type="tel" inputmode="tel" placeholder="${L('เบอร์ที่ 2 (ถ้ามี)', 'A second number (optional)')}" value="${esc(tel[1] || '')}" data-lc="1"></div>
<div class="row lcrow"><label class="btn ghost small">${ic('camera')} ${lostPhoto ? L('เปลี่ยนรูป', 'Change photo') : L('รูปเช้านี้', 'This morning’s photo')}<input type="file" id="lcfile" accept="image/*" hidden></label>
${lostPhoto ? `<img class="lcthumb" src="${esc(lostPhoto)}" alt="">` : `<span class="label">${L('ไม่เลือกก็ได้ จะใช้รูปการ์ตูนแทน', 'Optional — the drawing is used instead')}</span>`}
<button class="btn small" data-a="lostcard" data-t="${esc(t.id)}" data-v="${esc(k)}">🪪 ${L('ทำการ์ด', 'Make the card')}</button></div>
<p class="label">🔒 ${L('รูปและเบอร์อยู่ในเครื่องนี้เท่านั้น ไม่อัปโหลด', 'The photo and numbers stay on this phone — nothing is uploaded')}</p>
<img class="lcprev" id="lcprev" alt="" hidden></section>`;
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
const viewHearts = (t) => `<h1 class="h2">${secTitle('hearts')}</h1>${heartsHtml(t).replace(/<h3>[\s\S]*?<\/h3>/, '')}`;   // the page's own title, not a second "hearts for the kids"
const viewOffline = (t) => `<h1 class="h2">${secTitle('offline')}</h1><p class="lede">${L('เก็บเล่มนี้ไว้ในเครื่องก่อนขึ้นเครื่องบินหรือลงเรือ แล้วเปิดสมุด แผน ร้านอาหาร พาสปอร์ต และโหมดเด็กได้โดยไม่ต้องมีเน็ต', 'Store this book on the phone before the flight or the ferry, then the book, the plans, places to eat, the passports and kid mode all open without signal')}</p>${offlineHtml(t)}<section class="blk noprint"><h3>${ic('wifi')} ${L('ประหยัดเน็ตโรมมิ่ง', 'Save roaming data')}</h3>${upBlock()}</section>${ls('remind') ? remindBar() : remindLine(t)}
<div class="part">${L('สมุดภาพสำหรับพิมพ์', 'The printed book')}</div><div class="row noprint" style="margin:8px 0"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">${L('สมุดความทรงจำ (PDF A4)', 'Memory book (PDF A4)')}</a><a class="btn ghost small" href="#/print/${esc(t.id)}">${L('ดูตัวอย่างเล่ม', 'Preview the book')}</a></div>`;
function favouritesHtml(t) {
  const ph = mediaOf(t.id).filter((m) => m.highlight), qs = entriesOf(t.id).filter((e) => e.kind === 'quote' && e.highlight);
  if (!ph.length && !qs.length) return '';
  return (ph.length ? `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : '') + qs.map((e) => quoteCall(e, true)).join('');
}
function photoBtn(t, m) {
  return `<button data-a="lb" data-v="${esc(m.id)}" data-t="${esc(t.id)}" aria-label="${esc(m.caption || L('รูป', 'Photo'))}"><img loading="lazy" src="${esc(imgT(m))}" alt="">${m.highlight ? '<span class="star">⭐</span>' : ''}${m.caption ? `<span class="cap">${emoIn(esc(m.caption))}</span>` : ''}${m.pending ? '<span class="cap">⏳</span>' : ''}</button>`;
}
// the day's photos by stop (media.place, from "look at today's photos" or the lightbox): one mosaic per place in the order the stops were
// first photographed, the photos with no place last and unlabelled; a day with no places at all is one plain mosaic
function mosaicByPlace(t, ph) {
  if (!ph.length) return '';
  const groups = [], at = {};
  for (const m of ph) { const k = (m.place || '').trim(); if (!(k in at)) { at[k] = groups.length; groups.push({ place: k, ph: [] }); } groups[at[k]].ph.push(m); }
  if (groups.length === 1 && !groups[0].place) return `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>`;
  groups.sort((a, b) => (a.place ? 0 : 1) - (b.place ? 0 : 1));
  return groups.map((g) => `<div class="phgrp">${g.place ? `<div class="label">📍 ${esc(g.place)}</div>` : ''}<div class="mosaic">${g.ph.map((m) => photoBtn(t, m)).join('')}</div></div>`).join('');
}
// the other language under a text (Thai ↔ English), when "translate this day" has run — the book reads in both
const trLine = (e) => (e && e.tr ? `<span class="tr" lang="${/[\u0E00-\u0E7F]/.test(e.tr) ? 'th' : 'en'}">${esc(e.tr)}</span>` : '');
function quoteCall(e, pick) {
  return `<div class="call ${pick ? 'pick' : 'info'}"><div class="who">${kidBadge(e.child)}${esc(kidName(e.child))}${e.pending ? ' <span class="tag">⏳</span>' : ''}</div>${pick ? `<span class="lbl">${L('คำพูดที่ชอบ', 'Favourite words')}</span>` : ''}<q>${emoIn(esc(e.text))}</q>${trLine(e)}</div>`;
}
// the memory book's day, said short (owner's review, Nov 2026: "สรุปให้ดี สั้นๆ กระชับ ไม่ใช่ลอกมาลง"): the header keeps where we slept and
// the temperature in one line — never the plan's packing tips, sunset or forecast notes; the side box tells the day in the plan's own
// headlines (one emoji + a few words each), then the places we really checked in at, with short names (no bay numbers, no brackets)
const shortName = (s) => String(s || '').replace(/\s*\([^)]*\)/g, '').split(/\s+[—·]\s+|:\s|,\s/)[0].trim();
function dayMem(d) {
  const bed = shortName(T(d.sleep)), tmp = (String(T(d.wx) || '').match(/-?\d+\s*[–-]\s*-?\d+\s*°C/) || [])[0];
  const bits = [bed && ['🛏️', bed], tmp && ['🌡️', tmp.replace(/\s+/g, '')]].filter(Boolean);
  return bits.length ? `<p class="dmem" style="grid-column:2/3">${bits.map(([e, x]) => `<span>${emoIn(e)} ${esc(x)}</span>`).join('')}</p>` : '';
}
function dayStory(t, d, route, visited) {
  const seen = new Set(), hl = ((d.plan || {}).plan || []).map((r) => r && r.h && T(r.h)).filter((h) => h && !seen.has(h) && seen.add(h));
  const went = route.filter((p) => visited.has(p.key)).map((p) => shortName(T(p))).filter((n, k, a) => n && a.indexOf(n) === k);
  if (!hl.length && !went.length) return '<div></div>';
  return `<aside class="route dstory">${hl.length ? `<span class="label">${L('วันนี้ของเรา', 'Our day')}</span><ol>${hl.map((h) => `<li><b>${emoIn(esc(h))}</b></li>`).join('')}</ol>` : ''}${went.length ? `<span class="label">${L('ไปมาแล้ว', 'Where we went')}</span><ol class="went">${went.map((n) => `<li class="done"><b>📍 ${esc(n)}</b><small>✓</small></li>`).join('')}</ol>` : ''}</aside>`;
}
// a memory is told by the part of the day, not the clock (owner, Nov 2026: "เช้า / บ่าย / เย็น" reads like a children's book)
function dayPart(at, tz) {
  let h = 12; try { h = Number(new Date(at).toLocaleString('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: tz || undefined })) % 24; } catch { /* a bad zone reads as midday */ }
  return h >= 5 && h < 11 ? L('ช่วงเช้า', 'Morning') : h >= 11 && h < 13 ? L('ตอนกลางวัน', 'Midday') : h >= 13 && h < 17 ? L('ช่วงบ่าย', 'Afternoon') : h >= 17 && h < 20 ? L('ตอนเย็น', 'Evening') : L('ตอนค่ำ', 'Night');
}
function dayPage(t, i) {
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i), pl = placesOf(t.id, i);
  const moods = es.filter((e) => e.kind === 'mood' && e.mood);
  const fav = es.find((e) => e.kind === 'fav'), note = es.find((e) => e.kind === 'note'), story = es.find((e) => e.kind === 'story'), sum = es.find((e) => e.kind === 'sum' && e.text);
  const visited = new Set(pl.map((p) => p.key));
  const planned = (d.planned || []).filter((p) => p.kind !== 'food');
  const extra = pl.filter((p) => p.kind !== 'food' && !planned.some((x) => x.key === p.key));
  const route = planned.concat(extra.map((p) => ({ key: p.key, en: p.name.en, th: p.name.th })));
  const timeline = [
    ...es.filter((e) => e.kind === 'quote').map((e) => ({ at: e.at, h: quoteCall(e, e.highlight) })),
    ...pl.map((p) => ({ at: p.at, h: `<span>${p.kind === 'food' ? '🍽️' : '📍'} ${esc(shortName(T(p.name)))}</span>` })),
    ...es.filter((e) => e.kind === 'first').map((e) => { const f = firstLabel(t, e.first_key); return { at: e.at, h: `<span>${esc(f.e)} ${L('ครั้งแรก', 'First')}: ${esc(e.first_key === 'custom' ? e.text : f.t)} · ${esc(kidName(e.child))}</span>` }; }),
  ].sort((a, b) => a.at - b.at);
  const food = pl.filter((p) => p.kind === 'food'), firsts = es.filter((e) => e.kind === 'first'), hs = heartsOf(t.id, i);
  return `<article class="day" id="d${i}">
<div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div>
<div class="moods">${moods.map((m) => `<span class="pill">${kidFace(m.child)} ${emo(m.mood)}</span>`).join('')}${hs.map((h) => `<span class="pill heart" title="${esc(h.text)}">${emo(h.emoji)} ${esc(h.from)}</span>`).join('')}</div>
<h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart')}
${dayMem(d)}</div>
<div class="body">
${dayStory(t, d, route, visited)}
<div>
${sum ? `<p class="daysum">${emoIn(esc(sum.text))}${trLine(sum)}</p>` : ''}
${mosaicByPlace(t, ph)}
${audioOf(t.id, i).length ? `<div class="clips noprint">${audioOf(t.id, i).map((m) => `<div class="clip"><span>${ic('mic')} ${esc(m.caption || L('เสียงจากวันนี้', 'A voice from today'))}</span>${clipPlayer(m)}</div>`).join('')}</div>` : ''}
${timeline.length ? `<ol class="tl parts">${timeline.map((x, k) => { const pt = dayPart(x.at, t.timezone), prev = k ? dayPart(timeline[k - 1].at, t.timezone) : ''; return `<li${pt === prev ? ' class="same"' : ''}><time>${pt === prev ? '' : esc(pt)}</time><div>${x.h}</div></li>`; }).join('')}</ol>` : ''}
${note ? `<div class="call calm"><span class="lbl">${L('โน้ตพ่อแม่', "Parents' note")}</span>${emoIn(esc(note.text))}${trLine(note)}</div>` : ''}
${story ? `<div class="call pick" style="white-space:pre-line"><span class="lbl">${L('นิทานก่อนนอน', 'Bedtime story')}</span>${bedBtn(story)}${esc(story.text)}</div>` : ''}
</div></div>
${food.length || fav || firsts.length ? `<div class="foot3">
${food.length ? `<div><h4>${L('กินอะไร', 'Where we ate')}</h4><ul>${food.map((p) => `<li>${esc(shortName(T(p.name)))}</li>`).join('')}</ul></div>` : ''}
${fav ? `<div><h4>${L('ของโปรดวันนี้', 'Favourite today')}</h4><p>${emoIn(esc(fav.text))}${trLine(fav)}</p></div>` : ''}
${firsts.length ? `<div><h4>${L('ครั้งแรกวันนี้', 'First today')}</h4><ul>${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<li>${esc(f.e)} ${esc(e.first_key === 'custom' ? e.text : f.t)} — ${esc(kidName(e.child))}${e.first_key === 'custom' ? trLine(e) : ''}</li>`; }).join('')}</ul></div>` : ''}
</div>` : ''}
<p class="noprint" style="margin-top:10px">${isEditor() ? `<a class="btn ghost small" href="#/t/${esc(t.id)}/log/${i}">${ic('log')} ${L('แก้ไขวันนี้', 'Edit this day')}</a> ` : ''}<button class="btn ghost small" data-a="daycard" data-t="${esc(t.id)}" data-d="${i}">${ic('image')} ${L('การ์ดวันนี้', 'Day card')}</button></p>
</article>`;
}

/* ---------- keep a book on the phone (before the flight, before the ferry…) ---------- */
// what this phone holds of a book: nothing · all of it (and when) · all of it up to N photos taken since
function offState(t) {
  const got = ls('offline_' + t.id), n = mediaOf(t.id).length, fresh = got ? Math.max(0, n - (got.n || 0)) : 0;
  return { got, n, fresh, stale: !!got && fresh > 0, when: got ? new Date(got.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '' };
}
/* ---------- photos on Wi-Fi only (roaming): the switch, what is waiting, and "send now" — record page and the offline page ---------- */
function upBlock() {
  const on = wifiOnly(), n = queue.filter((o) => o.blob).length, held = heldCount(), known = !!netType();
  return `<div class="upw"><label class="vgck"><input type="checkbox" data-a="wifionly"${on ? ' checked' : ''}> 📶 ${L('ส่งรูปและเสียงเฉพาะตอนต่อ Wi-Fi', 'Send photos and voice clips on Wi-Fi only')}</label>
<p class="label">${on ? (known ? L('บนเน็ตมือถือ รูปจะรอ แล้วส่งเองเมื่อต่อ Wi-Fi · ข้อความส่งทันที', 'On mobile data photos wait on the phone and go by themselves on Wi-Fi · words always go at once')
    : L('iPhone ไม่บอกแอปว่าต่อ Wi-Fi ไหม — ต่อ Wi-Fi แล้วกดปุ่มข้างล่างเพื่อส่งรูป · ข้อความส่งทันที', 'This phone (e.g. iPhone) doesn’t tell the app when it is on Wi-Fi — photos wait on the phone until you tap send: join the hotel Wi-Fi, then tap the button below · words always go at once'))
    : L('เปิดไว้ตอนโรมมิ่ง จะได้ไม่เปลืองเน็ต (รูปละ 3–5 MB)', 'Turn on while roaming to save data (3–5 MB a photo)')}</p>
${held ? `<div class="row"><button class="btn small" data-a="upnow">⬆️ ${L(`ส่งที่รออยู่ ${held} รายการตอนนี้`, `Send the ${held} waiting now`)}</button></div>` : n && on ? `<p class="label">${L(`กำลังส่ง ${n} รายการ`, `Sending ${n}`)}</p>` : ''}</div>`;
}
function offlineHtml(t) {
  const { got, n, stale, fresh, when } = offState(t);
  return `<section class="blk offl noprint" id="offl"><h3>${L('เก็บเล่มไว้ในเครื่อง', 'Keep this book on the phone')}</h3>
<p class="label">${got && !stale ? L(`เล่มนี้อยู่ในเครื่องแล้ว (${when}) — เปิดสมุด พาสปอร์ต โหมดเด็ก และรูปย่อทุกรูปได้โดยไม่ต้องมีเน็ต บันทึกใหม่จะส่งขึ้นเองเมื่อกลับมามีเน็ต`, `Stored on this phone (${when}) — the book, passports, kid mode and every thumbnail open without signal; new notes upload when you are back online`)
    : got ? L(`เก็บไว้เมื่อ ${when} แต่มีรูปใหม่ ${fresh} รูปตั้งแต่นั้น กดอีกครั้งเพื่อเก็บให้ครบ`, `Stored ${when}, but ${fresh} new photo${fresh > 1 ? 's' : ''} since — tap again to top up`)
      : L('กดก่อนขึ้นเครื่อง: เก็บรูปย่อทุกรูป รูปโปรดขนาดเต็ม และภาพวาดของเล่มนี้ไว้ในเครื่อง', 'Tap before the flight or the ferry: the app stores every thumbnail, the full-size favourites and all the drawings of this book on this phone')}</p>
<div class="row"><button class="btn small" data-a="offline" data-t="${esc(t.id)}"${packing ? ' disabled' : ''}>${got && !stale ? '✓ ' : ''}${L('เก็บเล่มนี้ไว้ในเครื่อง', 'Keep this book on the phone')}</button>
${n > 0 ? `<button class="btn ghost small" data-a="offline" data-t="${esc(t.id)}" data-v="all"${packing ? ' disabled' : ''}>${L(`รวมรูปเต็มทั้ง ${n} รูป`, `With all ${n} full-size photos`)}</button>` : ''}</div></section>`;
}

/* ---------- hearts from the family (relatives on the view link too) ---------- */
const HEARTS = ['💗', '😍', '👏', '🙏', '⭐', '🎉'];   // the picker: each has a drawing in public/art/emoji (older hearts may hold 🤗 😘 🎈)
const heartsOf = (tid, day) => (S.hearts || []).filter((h) => h.trip === tid && (day === undefined || h.day === day));
let heartTo = 'both', heartEmoji = HEARTS[0];
function heartsHtml(t) {
  const hs = heartsOf(t.id).slice().sort((a, b) => b.at - a.at), tk = (t.theme.children || []).map((k) => k.slug), kids = children().map((k) => k.slug).filter((s) => !tk.length || tk.includes(s));
  const to = kids.length ? kids.concat(kids.length > 1 ? ['both'] : []) : ['both'];
  if (!to.includes(heartTo)) heartTo = to[to.length - 1];
  return `<section class="blk hearts${hs.length ? '' : ' noprint'}" id="hearts"><h3>${ic('hearts')} ${L('หัวใจถึงเด็กๆ', 'Hearts for the kids')}${hs.length ? ` <span class="label">· ${hs.length}</span>` : ''}</h3>
<div class="hform noprint"><p class="label">${L(`ส่งหัวใจหรือข้อความสั้นๆ ${kids.map((k) => esc(kidName(k))).join(L('กับ', ' & '))}จะเห็นในโหมดเด็ก และมือถืออ่านให้ฟัง`, `Send a heart or a short note — ${kids.map(kidName).join(' & ')} see it in kid mode and the phone reads it out`)}</p>
<div class="row">${to.map((k) => `<button class="chip" data-a="heartto" data-v="${esc(k)}" aria-pressed="${k === heartTo}">${kidFace(k)} ${esc(kidName(k))}</button>`).join('')}</div>
<div class="row emo" role="group" aria-label="${L('เลือกหัวใจ', 'Pick a heart')}">${HEARTS.map((e) => `<button data-a="heartemo" data-v="${e}" aria-pressed="${e === heartEmoji}" aria-label="${e}">${emo(e)}</button>`).join('')}</div>
<div class="row"><input class="field" id="hfrom" data-draft="hfrom" value="${esc(drafts.hfrom ?? (ls('heartfrom') || ''))}" placeholder="${L('ชื่อผู้ส่ง เช่น ยาย, ปู่', 'From, e.g. Grandma')}" maxlength="24" style="flex:1;min-width:120px">
<span class="emowrap" style="flex:3;min-width:180px"><input class="field" id="htext" data-draft="htext" value="${esc(drafts.htext || '')}" placeholder="${L('ข้อความสั้นๆ (ไม่ใส่ก็ได้)', 'A short note (optional)')}" maxlength="140">${emoBtn('htext')}</span></div>
<button class="btn small" data-a="sendheart" data-t="${esc(t.id)}">${L('ส่ง', 'Send')} ${emo(heartEmoji)}</button></div>
${hs.length ? `<ul class="hlist">${hs.slice(0, 40).map((h) => `<li><span class="he">${emo(h.emoji)}</span><div class="grow"><b>${esc(h.from)}</b> → ${kidFace(h.child)} ${esc(kidName(h.child))}${h.pending ? ' ⏳' : ''}${h.text ? `<p>${emoIn(esc(h.text))}</p>` : ''}<small class="label">${esc(new Date(h.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}${h.day !== null && h.day !== undefined ? ` · ${L('วันที่', 'Day')} ${h.day + 1}` : ''}</small></div>${isEditor() || h.mine ? `<button class="mini noprint" data-a="delheart" data-v="${esc(h.id)}">${L('ลบ', 'Delete')}</button>` : ''}</li>`).join('')}</ul>` : ''}</section>`;
}
// the kids' finger drawings, all together (pre-trip ones have no day)
function drawingsHtml(t) {
  const ds = mediaOf(t.id).filter(isDrawing);
  return ds.length ? `<div class="part">${L('ภาพวาดของเด็กๆ', "The kids' drawings")} 🖍️</div><div class="mosaic drawings">${ds.map((m) => photoBtn(t, m)).join('')}</div>` : '';
}
const bedBtn = (e) => `<button class="btn ghost small noprint bedbtn" data-a="bedtime" data-v="${esc(e.id)}">🌙 ${L('อ่านให้ฟังก่อนนอน', 'Read it at bedtime')}</button>`;

// the printed cover: 'photo' only when the parents chose it and the book has a ⭐ photo; else the day pictures
const starredPhotos = (t) => mediaOf(t.id).filter((m) => m.highlight && !isDrawing(m));
const coverMode = (t) => { const e = entriesOf(t.id).find((x) => x.kind === 'cover'); return e && e.text === 'photo' && starredPhotos(t).length ? 'photo' : 'art'; };
// the printed book grows with the children (owner, Nov 2026): 'little' (1–3: big pictures, big type, few words, a handprint page),
// 'kid' (4–7: bright and playful, a drawing page), 'big' (8+: a travel journal, writing lines) — by the youngest child's age at the
// end of the trip, unless the parents chose (entry kind 'bookage', id `<trip>.bookage.all`)
const BOOK_AGES = { little: ['/art/emoji/teddy.webp', 'เด็กเล็ก', 'Little ones', '1–3 ขวบ', 'ages 1–3', 'รูปใหญ่ ตัวโต', 'big pictures'], kid: ['/art/emoji/palette.webp', 'เด็ก', 'Kids', '4–7 ขวบ', 'ages 4–7', 'มีหน้าวาดรูป', 'a drawing page'], big: ['/art/hub/notebook.webp', 'เด็กโต', 'Big kids', '8 ขวบขึ้นไป', '8 and up', 'แบบสมุดบันทึก', 'a journal'] };
const monthsAt = (ym, iso) => { if (!/^\d{4}-\d{2}$/.test(ym || '') || !iso) return null; const [y, m] = ym.split('-').map(Number), d = new Date(iso); const mo = (d.getFullYear() - y) * 12 + d.getMonth() + 1 - m; return mo >= 0 ? mo : null; };
const bookAgeAuto = (t) => {
  const end = (t.days[t.days.length - 1] || {}).date || t.date_to;
  const ms = (t.theme.children || []).map((k) => { const c = children().find((x) => x.slug === k.slug); const mo = c ? monthsAt(c.birth_ym, end) : null;
    return mo != null ? mo : (k.age && parseFloat(String(k.age.en || '').replace('½', '.5'))) * 12 || null; }).filter((x) => x != null);
  const y = ms.length ? Math.min(...ms) / 12 : 5;
  return y < 4 ? 'little' : y < 8 ? 'kid' : 'big';
};
const bookAgeSet = (t) => { const e = entriesOf(t.id).find((x) => x.kind === 'bookage'); return e && BOOK_AGES[e.text] ? e.text : 'auto'; };
const bookAge = (t) => (bookAgeSet(t) === 'auto' ? bookAgeAuto(t) : bookAgeSet(t));
// the printed book's look, one card on the book page (editors; owner's review, Nov 2026: "ทำใหม่ ใช้ icon ที่เรามี"):
// the cover as two little paper previews (the day pictures / the ⭐ photo — only once a photo is starred) and the style by age
// as three cards with the app's own drawn icons; the card that fits the youngest child now says so, and choosing it means
// "follow their age" (saved as 'auto', so next year's book moves on by itself)
function bookAgePick(t) {
  const set = bookAgeSet(t), cur = bookAge(t), fit = bookAgeAuto(t);
  return `<div class="pspart">${L('สไตล์ตามวัย', 'Style for their age')}</div><div class="tpk agek" role="group" aria-label="${L('สไตล์ตามวัย', 'Style for their age')}">${Object.entries(BOOK_AGES).map(([k, a]) => `<button type="button" class="tpo" data-a="bookage" data-t="${esc(t.id)}" data-v="${k === fit ? 'auto' : k}" data-age="${k}" aria-pressed="${cur === k}"><img class="psi" src="${a[0]}" alt="" draggable="false"><b>${L(a[1], a[2])}</b><small>${L(a[3], a[4])}<br>${L(a[5], a[6])}</small>${k === fit ? `<span class="psfit">${set === 'auto' || set === k ? L('✓ ตามวัยลูก', '✓ Their age') : L('วัยตอนนี้', 'Their age now')}</span>` : ''}<span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>`;
}
function coverPick(t) {
  const fav = starredPhotos(t)[0]; if (!fav) return '';
  const m = coverMode(t), n = Math.min(t.days.length, 6);
  const prev = { art: `<span class="mcv mcv-a"><i></i><span class="mcvg">${Array.from({ length: n }, (_, i) => artImg(t, i)).join('')}</span></span>`, photo: `<span class="mcv mcv-p"><img src="${esc(imgT(fav))}" alt=""><i></i></span>` };
  return `<div class="pspart">${L('ปก', 'Cover')}</div><div class="tpk cvk" role="group" aria-label="${L('ปกเล่มพิมพ์', 'Printed cover')}">${[['art', L('ภาพประจำวัน', 'Day pictures')], ['photo', L('รูปโปรด ⭐', 'Starred photo ⭐')]].map(([k, l]) => `<button type="button" class="tpo" data-a="cover" data-t="${esc(t.id)}" data-v="${k}" aria-pressed="${m === k}">${prev[k]}<b>${l}</b><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>`;
}
function printSet(t) {
  if (!isEditor()) return '';
  return `<section class="noprint printset coverpick agepick"><div class="pshd"><img src="/art/hub/book.webp" alt="" draggable="false"><div><b>${L('เล่มพิมพ์ของลูก', 'The printed book')}</b><small>${L('เลือกปกและสไตล์ แล้วกดดูตัวอย่างได้เลย', 'Pick a cover and a style, then preview it')}</small></div></div>${coverPick(t)}${bookAgePick(t)}</section>`;
}

/* ---------- the memory book (#/print/<trip> → /api/b/pdf/<trip>): the trip as a printed book after it ends ----------
   A4 pages in the manual's language: cover · the trip in numbers + map + where we slept · contents · a page per recorded day
   · firsts · in their own words · a passport spread per child (stamps, badges, Explorer ID, colourings, drawings, stickers,
   certificate) · hearts from the family · the story of the trip · notes for the next trip · back cover. Nothing private
   beyond what the book already holds (no bookings, no passport data). */
// where we slept, for the printed book (owner, Nov 2026: "ทำให้น่าสนใจ ไม่ใช่ตัดแปะจากใน app" — never a review score, a room type
// or a booking site): a card per stay with the picture of the day we arrived, the town in big letters, the place's short name and the nights
function stayTowns(t, stays) {
  const ss = sleepStops(t);
  const base = (k, s) => { const n = shortName(s.name).toLowerCase(); const m = stays.find((x) => shortName(T(x.prop)).toLowerCase().startsWith(n.slice(0, 12))) || (stays.length === ss.length ? stays[k] : null); return m ? shortName(T(m.base)) : ''; };
  return ss.map((s, k) => ({ town: base(k, s), nm: shortName(s.name).replace(/\s*\((?:airbnb|booking[^)]*)\)/i, ''), n: s.days.length, art: s.art }));
}
function bedsHtml(t, stays) {
  const ts = stayTowns(t, stays); if (!ts.length) return '';
  return `<h4 class="bedsh">🛏️ ${L('บ้านพักของเรา', 'Where we slept')}</h4><div class="beds">${ts.map((s, k) => `<div class="bed" style="--kc:var(--k${(k % 6) + 1})">${artImg(t, s.art)}<div><b>${esc(s.town || s.nm)}</b>${s.town ? `<small>${esc(s.nm)}</small>` : ''}<span class="nights">🌙 ${L(`${s.n} คืน`, `${s.n} night${s.n > 1 ? 's' : ''}`)}</span></div></div>`).join('')}</div>`;
}
// the trip as a line of towns, home to home (the numbers page; the stamps already live in the passport)
function routeHtml(t, stays) {
  const ts = stayTowns(t, stays).map((s) => s.town || s.nm).filter((x, k, a) => x && x !== a[k - 1]); if (!ts.length) return '';
  const home = `<span class="rt home">🏠 ${L('บ้าน', 'Home')}</span>`;
  return `<div class="proute">${home}${ts.map((x, k) => `<i aria-hidden="true">→</i><span class="rt" style="--kc:var(--k${(k % 6) + 1})">${esc(x)}</span>`).join('')}<i aria-hidden="true">→</i>${home}</div>`;
}
function viewPrint(t) {
  const kids = (t.theme.children || []).map((k) => k.slug).filter((k) => children().some((c) => c.slug === k));
  const st = stats(t), days = t.days.map((_, i) => i).filter((i) => dayHasContent(t, i));
  const hearts = heartsOf(t.id), drawings = mediaOf(t.id).filter(isDrawing), story = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === null);
  const quotes = entriesOf(t.id).filter((e) => e.kind === 'quote').sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) || a.at - b.at);
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first').sort((a, b) => a.day - b.day);
  const faves = mediaOf(t.id).filter((m) => m.highlight && !isDrawing(m)).slice(0, 3);
  const short = T(t.title).split(' · ')[0], ages = agesHtml(kids.map((k) => (t.theme.children || []).find((c) => c.slug === k) || { slug: k }));
  const printed = new Date().toLocaleDateString(LOC(), { day: 'numeric', month: 'long', year: 'numeric' });
  const stays = (t.info && t.info.stays) || [];
  const age = bookAge(t); let pgn = 0;
  const pg = (cls, inner) => `<section class="pg ${cls}" style="--ph:var(--k${(pgn++ % 6) + 1})">${inner}</section>`;
  const head = (kicker, title, e) => `<header class="pghd">${e ? `<span class="pge" aria-hidden="true">${e}</span>` : ''}<div><div class="kicker">${kicker}</div><h2>${title}</h2></div></header>`;
  // 1 · cover — two layouts (owner's pick, Nov 2026): 'art' = the day pictures as a grid on the manual's cream panel (the default:
  // every book has them), 'photo' = the first ⭐ photo full width over a band in the book's colour (only when a photo is starred;
  // the parents switch on the book page → entry kind 'cover', id `<trip>.cover.all`)
  const cvMode = coverMode(t), cvTitle = `<div class="cvhd"><div class="cvtx"><div class="kicker">${esc(t.theme.kicker || '')}</div>
<h1>${esc(short)}</h1><div class="sub-it">${esc(T(t.sub))}</div>
<p class="line">${esc(fmtRange(t))}${ages ? ' · ' + ages : ''}</p></div>${cvMode === 'art' ? stampHtml(t) : ''}</div>`;
  const cvFoot = `<p class="cvfoot">${L('สมุดความทรงจำ', 'Memory book')} · ${esc(appName())} · ${esc(printed)}</p>`;
  const nArt = t.days.length <= 6 ? 6 : 12, more = t.days.length - nArt;
  const cover = pg('cover', cvMode === 'photo'
    ? `<div class="cv photo"><div class="cvph"><img class="big" src="${esc(imgF(faves[0]))}" alt="">${stampHtml(t)}${castHtml(kids)}</div>
<div class="cvband">${cvTitle}<div class="cvft"><div class="cvart strip">${t.days.slice(0, 8).map((_, i) => artImg(t, i)).join('')}</div>${cvFoot}</div></div></div>`
    : `<div class="cv art">${cvTitle}
<div class="cvart${nArt > 6 ? ' c4' : ''}">${t.days.slice(0, nArt).map((d, i) => `<figure style="--kc:var(--k${(i % 6) + 1})">${artImg(t, i)}<span class="cvd"><i>${i + 1}</i><b><em>${L('วันที่', 'Day')}</em>${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))}</b></span><small>${esc(T(d.title))}</small></figure>`).join('')}${more > 0 ? `<p class="cvmore">${L(`และอีก ${more} วัน`, `and ${more} more day${more > 1 ? 's' : ''}`)}</p>` : ''}</div>
<div class="cvft">${castHtml(kids)}${cvFoot}</div></div>`);
  // 2 · the trip in numbers, the map, where we slept
  const facts = [days.length ? [L('วันที่บันทึก', 'Days recorded'), days.length] : [L('วัน', 'Days'), t.days.length], ...[[L('รูป', 'Photos'), st.photos], [L('คำพูด', 'Quotes'), st.quotes], [L('ครั้งแรก', 'Firsts'), st.firsts], [L('ที่ไป', 'Places'), st.places]].filter(([, v]) => v)]   // never a row of zeros
    .concat(hearts.length ? [[L('หัวใจจากญาติ', 'Hearts'), hearts.length]] : [], drawings.length ? [[L('ภาพวาด', 'Drawings'), drawings.length]] : []);
  const numbers = pg('numbers', `${head(L('ทริปนี้ในตัวเลข', 'The trip in numbers'), esc(short), '🗺️')}
<div class="facts">${facts.map(([l, v]) => `<div class="fact"><span class="label">${l}</span><b>${v}</b></div>`).join('')}</div>
${routeHtml(t, stays)}
${(t.passport || {}).map && typeof mapHtml === 'function' ? `<div class="pmap">${mapHtml(t, t.days.length - 1, kids)}</div>` : ''}
${bedsHtml(t, stays)}`);
  // 3 · contents
  const contents = pg('contents', `${head(L('สารบัญ', 'Contents'), L('วันของเรา', 'Our days'), '📚')}<ol class="toc">${t.days.map((d, i) => `<li class="${dayHasContent(t, i) ? 'has' : ''}">${artImg(t, i)}<b>${String(i + 1).padStart(2, '0')}</b><span>${esc(T(d.title))}<small>${esc(fmtDay(d.date))}</small></span></li>`).join('')}</ol>`);
  // 4 · a page per recorded day (the book's own day page)
  const dayPages = days.map((i) => pg('dayp', dayPage(t, i))).join('');
  // 5 · firsts + 6 · in their own words
  const firstsPg = firsts.length ? pg('firstsp', `${head(L('เหรียญครั้งแรก', 'Badges'), L('ครั้งแรกของทริปนี้', 'Firsts on this trip'), '🏅')}<div class="badges">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${esc(kidName(e.child))} · ${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>`) : '';
  const wordsPg = quotes.length ? pg('wordsp', `${head(L('คำพูดของเด็กๆ', 'In their own words'), L('สิ่งที่หนูพูด', 'Things they said'), '💬')}<div class="qgrid">${quotes.map((e) => `<div class="call ${e.highlight ? 'pick' : 'info'}"><div class="who">${kidBadge(e.child)}${esc(kidName(e.child))} · ${L('วันที่', 'Day')} ${e.day + 1}</div><q>${emoIn(esc(e.text))}</q>${trLine(e)}</div>`).join('')}</div>`) : '';
  // 7 · a passport spread per child
  const ppPages = kids.map((kid) => {
    const name = kidName(kid), pp = t.passport || {}, myFirsts = firsts.filter((e) => e.child === kid), mine = drawingsOf(t, kid), cert = pp.certificate, cl = (pp.lists || []).find((l) => l.certificate);
    const colours = t.days.map((_, i) => i).filter((i) => fieldVal(t, `colour.d${i}`, kid));
    const idRows = [['fav_animal', L('สัตว์ที่ชอบที่สุด', 'Favourite animal')], ['superpower', L('พลังพิเศษ', 'Superpower')], ['height_first', L('ส่วนสูงวันแรก', 'Height on day 1')], ['height_last', L('ส่วนสูงวันสุดท้าย', 'Height on the last day')]].filter(([k]) => fieldVal(t, k, kid));
    // the stamps run across the whole sheet (owner's review, Nov 2026: "สแตมป์ทำให้เต็มหน้า"): alone on the page they fill it
    // (3 a row up to 9 days, else 4); with the rest of the passport below they take a row of six
    const more = idRows.length || myFirsts.length || colours.length || mine.length || cert && certEarned(t, kid) || (typeof stickerBoard === 'function' && stickersPlaced(t, kid).length);
    const nd = t.days.length, sz = more ? 'sm' : nd <= 6 ? 'c3 r2' : nd <= 9 ? 'c3' : 'c4';
    return pg('ppp kid-' + kid + (more ? '' : ' ppfull'), `${head(L('พาสปอร์ตนักผจญภัย', 'Adventure passport'), `${kidFace(kid)} ${esc(name)}`, '🛂')}
<div class="dstamps pst ${sz}">${t.days.map((d, i) => `<div class="dstamp${dayStamped(t, i) ? ' on' : ''}" style="--r:${((i * 37 + t.id.length * 11) % 17) - 8}deg">${artImg(t, i)}<b>${L('วันที่', 'Day')} ${i + 1}</b><small>${esc(((pp.days || [])[i] || {}).stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small></div>`).join('')}</div>${cityStampsHtml(t, "pr")}
<div class="ppcols"${more ? '' : ' hidden'}><div>
${idRows.length ? `<dl class="pid">${idRows.map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(fieldVal(t, k, kid))}</dd></div>`).join('')}</dl>` : ''}
${myFirsts.length ? `<div class="badges sm">${myFirsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>` : ''}
</div><div>
${colours.length ? `<div class="pcolours">${colours.slice(0, 6).map((i) => `<div class="colsvg sm" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}"></div>`).join('')}</div>` : ''}
${mine.length ? `<div class="pdraw">${mine.slice(0, 4).map((m) => `<img src="${esc(imgT(m))}" alt="">`).join('')}</div>` : ''}
${typeof stickerBoard === 'function' && stickersPlaced(t, kid).length ? `<div class="pstk">${stickerBoard(t, kid, false)}</div>` : ''}
${cert && certEarned(t, kid) ? `<div class="pcert"><div class="kicker">${L('ใบประกาศเกียรติคุณ', 'Certificate')}</div><b>${esc(T(cert.title))}</b><p>${esc(certText(t, kid))}</p></div>` : ''}
</div></div>`);
  }).join('');
  const myPages = kids.map((kid) => {
    const name = kidName(kid), c = (t.theme.children || []).find((k) => k.slug === kid) || {}, ag = T(c.age) || '';
    const facts = [['height_first', '📏', L('สูงวันแรก', 'Height on day 1')], ['height_last', '📏', L('สูงวันสุดท้าย', 'Height on the last day')], ['fav_animal', '🐾', L('สัตว์ที่ชอบที่สุด', 'Favourite animal')], ['superpower', '⚡', L('พลังพิเศษ', 'Superpower')]]
      .map(([k, e, l]) => [e, l, ((v) => (/^height/.test(k) && /^\d+(\.\d+)?$/.test(String(v || '').trim()) ? `${String(v).trim()} ${L('ซม.', 'cm')}` : v))(fieldVal(t, k, kid))]).filter(([, , v]) => v);
    const lines = (n) => `<div class="wlines">${'<i></i>'.repeat(n)}</div>`;
    const act = age === 'little' ? `<div class="myact hand"><b>✋ ${L('วางมือหนูตรงนี้ แล้ววาดรอบมือ', 'Put your hand here and draw around it')}</b><div class="drawbox"></div><p class="label">${L(`มือของ${name} ตอนอายุ ${ag}`, `${name}'s hand at ${ag}`)}</p></div>`
      : age === 'kid' ? `<div class="myact"><b>🖍️ ${L('วาดสิ่งที่ชอบที่สุดในทริปนี้', 'Draw your favourite thing from this trip')}</b><div class="drawbox"></div><b class="wq">${L('ชอบที่สุดเพราะ…', 'I liked it best because…')}</b>${lines(2)}</div>`
      : `<div class="myact journal"><b>✏️ ${L('เขียนถึงตัวเองตอนโต', 'A note to your future self')}</b>${lines(7)}<b class="wq">${L('3 อย่างที่ชอบที่สุด', 'My top three')}</b><ol class="top3"><li>${lines(1)}</li><li>${lines(1)}</li><li>${lines(1)}</li></ol></div>`;
    return pg('mypage kid-' + kid, `${head(L('หน้าของหนู', 'My page'), `${kidFace(kid)} ${esc(name)}`, '🌟')}
<div class="myhero">${castHtml([kid])}<div class="mybig"><p class="myage">${ag ? L(`ทริปนี้ ${esc(name)} อายุ <b>${esc(ag)}</b>`, `On this trip ${esc(name)} was <b>${esc(ag)}</b>`) : esc(name)}</p>
${facts.length ? `<ul class="myfacts">${facts.map(([e, l, v]) => `<li><span>${e}</span>${l} <b>${esc(v)}</b></li>`).join('')}</ul>` : ''}</div></div>${act}`);
  }).join('');
  // 8 · hearts · 9 · the story · 10 · for the next trip · 11 · back cover
  const heartsPg = hearts.length ? pg('heartsp', `${head(L('จากญาติ', 'From the family'), L('หัวใจถึงเด็กๆ', 'Hearts for the kids'), '💗')}<ul class="hlist">${hearts.map((h) => `<li><span class="he">${emo(h.emoji)}</span><div class="grow"><b>${esc(h.from)}</b> → ${esc(kidName(h.child))}${h.text ? `<p>${emoIn(esc(h.text))}</p>` : ''}<small class="label">${esc(new Date(h.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}</small></div></li>`).join('')}</ul>`) : '';
  const storyPg = story ? pg('storyp', `${head(L('นิทานของทั้งทริป', 'The story of the trip'), esc(short), '📖')}<div class="call calm storytxt">${esc(story.text)}</div>`) : '';
  const rs = S.reviews.filter((r) => r.trip === t.id && (r.rating || r.note));
  const notesPg = rs.length ? pg('notesp', `${head(L('โน้ตของพ่อแม่', "Parents' notes"), L('สำหรับทริปหน้า', 'For the next trip'), '📝')}<ul class="nblist">${rs.sort((a, b) => (b.rating || 0) - (a.rating || 0)).map((r) => `<li class="nbrow"><div class="nbhead"><span class="st">${r.rating ? starsTxt(r.rating) : '—'}</span><b>${RKIND[r.kind][0]} ${esc(T(r.name))}</b>${kidFaces(r.kids)}</div><div class="label">${(r.tags || []).map((k) => esc(rtagLabel(r.kind, k))).join(' · ')}</div>${r.note ? `<p>${esc(r.note)}</p>` : ''}</li>`).join('')}</ul>`) : '';
  const fore = entriesOf(t.id).find((e) => e.kind === 'fore' && e.text);   // the foreword: the first page after the cover
  const forePg = fore ? pg('forep', `${head(L('คำนำ', 'Foreword'), esc(T(t.title).split(' · ')[0]), '✍️')}<div class="call calm fore">${esc(fore.text)}</div>`) : '';
  const letter = entriesOf(t.id).find((e) => e.kind === 'letter' && e.text);   // the letter to the kids: the last page before the back cover
  const letterPg = letter ? pg('letterp', `${head(L('จดหมายถึงลูก', 'A letter to you'), L('ไว้อ่านตอนโต', 'For when you are older'), '💌')}<div class="letter">${esc(letter.text)}</div>`) : '';
  // the back cover fills its sheet (owner, Nov 2026: it printed as a strip at the top and read as a missing page): the children, "the end",
  // the trip, the day pictures in a row, a line to the next trip — never a count
  const back = pg('back', `<div class="bk">${castHtml(kids)}<h2>${L('จบเล่ม', 'The end')}</h2><p class="bkt">${esc(short)}</p><p class="bkd">${esc(fmtRange(t))}</p>
<div class="bkart">${t.days.slice(0, 8).map((_, i) => artImg(t, i)).join('')}</div>
<p class="bknext">${L('แล้วเจอกันทริปหน้านะ!', 'See you on the next trip!')}</p><p class="label">${esc(appName())} · ${esc(printed)}</p></div>`);
  return `<div class="pbook noprint-bar"><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">⬇ ${L('ดาวน์โหลด PDF', 'Download PDF')}</a><a class="btn ghost small" href="#/t/${esc(t.id)}">‹ ${L('กลับไปสมุด', 'Back to the book')}</a><span class="label">${L('ตัวอย่างสมุดความทรงจำ — หน้า A4 ตามที่จะพิมพ์', 'Memory book preview — A4 pages as they will print')}</span></div>
<div class="kbook age-${age}">${cover}${forePg}${numbers}${contents}${dayPages}${firstsPg}${wordsPg}${ppPages}${myPages}${heartsPg}${storyPg}${notesPg}${letterPg}${back}</div>`;
}

/* ---------- the day in a few lines (record page): typed, or written by Claude from the day's notes; shown on the book's day page ---------- */
function sumBlock(t, i, dk) {
  const s = entriesOf(t.id, i).find((e) => e.kind === 'sum'), ai = S.features.story;
  return `<section class="blk sumblk"><h3>${ic('book')} ${L('สรุปวันนี้', 'Today in brief')} <span class="label">${L('ขึ้นในสมุด', 'in the book')}</span></h3>
<textarea id="sumtext" class="field" data-a-blur="sum" data-t="${esc(t.id)}" data-d="${i}" data-draft="s:${esc(dk)}" maxlength="600" placeholder="${L('2–3 บรรทัดว่าวันนี้เป็นยังไง', 'Two or three lines about today')}">${esc(drafts['s:' + dk] ?? (s ? s.text : ''))}</textarea><p class="label savenote">${L('บันทึกเองเมื่อแตะออกจากช่อง', 'Saves by itself when you leave the box')}</p>
${ai ? `<div class="row" style="margin-top:6px"><button class="btn small" data-a="story" data-m="sum" data-t="${esc(t.id)}" data-d="${i}" id="sumgo">✨ ${s ? L('สรุปใหม่', 'Summarise again') : L('ให้ผู้ช่วยสรุปวันนี้', 'Ask the helper to sum up the day')}</button>
<button class="btn ghost small" data-a="storystop" id="sumstop" hidden>■ ${L('หยุด', 'Stop')}</button>
<span class="label" id="summsg"></span></div>` : ''}</section>`;
}

/* ---------- a note for the relatives (record page): Claude writes it from the day's notes, the parents edit it and send it themselves.
   Never saved anywhere: it lives in the box's draft until it is shared (with up to three photos from this phone, as the plain share does) ---------- */
function msgBlock(t, i, dk) {
  if (!isEditor() || !S.features.story) return '';
  const dr = drafts['m:' + dk] || '';
  return `<section class="blk noprint msgblk"><h3>${ic('mail')} ${L('ส่งข่าวให้ญาติ', 'News for the family')}</h3>
<p class="label">${L('แก้ได้ แล้วส่งทาง LINE เอง', 'Edit it, then send it on LINE yourself')}</p>
<textarea id="msgtext" class="field" rows="5" data-draft="m:${esc(dk)}" maxlength="1500"${dr ? '' : ' hidden'}>${esc(dr)}</textarea>
<div class="row" style="margin-top:6px"><button class="btn small" data-a="story" data-m="msg" data-t="${esc(t.id)}" data-d="${i}" id="msggo">✨ ${dr ? L('เขียนใหม่', 'Write again') : L('ให้ผู้ช่วยเขียนข่าว', 'Ask the helper to write it')}</button>
<button class="btn ghost small" data-a="storystop" id="msgstop" hidden>■ ${L('หยุด', 'Stop')}</button>
<button class="btn small" data-a="share" data-src="msg" data-t="${esc(t.id)}" data-d="${i}" id="msgsend"${dr ? '' : ' hidden'}>${navigator.share ? `📤 ${L('ส่ง', 'Send')}` : `📋 ${L('คัดลอก', 'Copy')}`}</button>
<span class="label" id="msgmsg"></span></div></section>`;
}

/* ---------- look at today's photos (record page, editors, only with the owner's PHOTO_AI switch): Claude sees the day's small
   thumbnails once, on a press, and writes a caption where there is none, a few tags from PHOTO_TAGS and the stop each photo belongs to ---------- */
function photoAiBlock(t, i) {
  if (!isEditor() || !S.features.photoAi) return '';
  const ph = mediaOf(t.id, i), todo = ph.filter((m) => !m.ai && !m.pending).length, seen = ph.length - todo;
  if (!ph.length) return '';
  return `<section class="blk phaiblk"><h3>${ic('eye')} ${L('ให้ผู้ช่วยดูรูปวันนี้', 'The helper looks at today’s photos')} <span class="label">${seen ? L(`ดูแล้ว ${seen}/${ph.length}`, `${seen}/${ph.length} seen`) : L(`${ph.length} รูป`, `${ph.length} photo${ph.length === 1 ? '' : 's'}`)}</span></h3>
${aiNote(L('ได้คำบรรยาย แท็ก สถานที่ และดาว ⭐ รูปโปรด', 'A caption, tags, the place and a ⭐ on the best ones'), L('ส่งรูปย่อของวันนี้ ไม่เกิน 12 รูป ไม่มีตำแหน่งที่ถ่าย เฉพาะตอนกด · คำบรรยายใส่ให้เฉพาะรูปที่ยังว่าง · ดาวติดให้ 1–2 รูปถ้าวันนี้ยังไม่มีดาว แตะรูปเพื่อเปลี่ยนได้', 'Sends today’s small thumbnails (never the full file, no GPS), up to 12 a press, with the day’s stop names, only when you press · captions only where there is none · a ⭐ on 1–2 photos if the day has no star yet; tap a photo to change it'))}
<div class="row" style="margin-top:6px"><button class="btn small" data-a="photoai" data-t="${esc(t.id)}" data-d="${i}" id="phaigo"${todo ? '' : ' disabled'}>👀 ${todo ? L(`ดูรูปที่ยังไม่ได้ดู (${Math.min(todo, 12)})`, `Look at the new ones (${Math.min(todo, 12)})`) : L('ดูครบแล้ว', 'All seen')}</button>${seen ? `<button class="btn ghost small" data-a="photoai" data-all="1" data-t="${esc(t.id)}" data-d="${i}">${L('ดูใหม่ทั้งวัน', 'Look again at the whole day')}</button>` : ''}<a class="btn ghost small" href="#/t/${esc(t.id)}/photos">🏷️ ${L('รูปตามแท็ก', 'Photos by tag')}</a></div></section>`;
}

/* ---------- tonight, Claude helps (record page, editors): one panel for every Claude button of the day, in the order they are used —
   photos first (their captions feed the rest), then the summary, both languages, the story, the bedtime questions, tomorrow's game and
   the note for the relatives. Each row shows where it stands and jumps to its box; "do it all" runs what is not done yet of
   photos → summary → story → questions, one Claude call each, and stops on the first that fails or on Stop. ---------- */
let aiRun = null;
let aiOpened = null;   // the /log/<i>/ai link scrolls to the panel once per arrival (not on every save's re-render)   // {n, of, stop} while "do it all" is running
// a one-line note with the details behind ⓘ
const aiNote = (short, long) => `<details class="ainote"><summary><span>${short}</span> <span class="i" aria-label="${L('รายละเอียด', 'Details')}">ⓘ</span></summary><p>${long}</p></details>`;
function aiSteps(t, i, dk) {
  const ph = mediaOf(t.id, i), es = entriesOf(t.id, i), seen = ph.filter((m) => m.ai).length;
  const words = es.filter((e) => ['quote', 'note', 'fav', 'sum', 'first'].includes(e.kind) && e.text && (e.kind !== 'first' || e.first_key === 'custom'));
  const trd = words.filter((e) => e.tr).length, has = (k) => es.some((e) => e.kind === k && e.text);
  const story = entriesOf(t.id).some((e) => e.kind === 'story' && e.day === i), draft = !!drafts['m:' + dk];
  const out = [];
  if (S.features.photoAi && ph.length) out.push({ k: 'photo', e: '👀', th: 'ดูรูป', en: 'Photos', sel: '.phaiblk', done: seen === ph.length, stat: `${seen}/${ph.length}` });
  out.push({ k: 'sum', e: '📖', th: 'สรุปวันนี้', en: 'Today in brief', sel: '.sumblk', done: has('sum') });
  out.push({ k: 'tr', e: '🌐', th: 'แปลสองภาษา', en: 'Both languages', sel: '.trblk', done: !!words.length && trd === words.length, stat: words.length ? `${trd}/${words.length}` : '' });
  out.push({ k: 'story', e: '✨', th: 'นิทานก่อนนอน', en: 'Bedtime story', sel: '#storyblk', done: story });
  out.push({ k: 'talk', e: '💬', th: 'คำถามก่อนนอน', en: 'Bedtime questions', sel: '.talkblk', done: has('talk') });
  out.push({ k: 'mquiz', e: '🧠', th: 'เกมพรุ่งนี้เช้า', en: 'Morning game', sel: '.mquizblk', done: !!memQuiz(t, i) });
  out.push({ k: 'msg', e: '💌', th: 'ข่าวถึงญาติ', en: 'News for family', sel: '.msgblk', done: draft, stat: draft ? L('ร่างไว้', 'drafted') : '' });
  return out;
}
// what "do it all" will run, in order: the four that make the evening (photos, summary, story, questions), skipping what is done
const aiTodo = (t, i, dk) => aiSteps(t, i, dk).filter((s) => ['photo', 'sum', 'story', 'talk'].includes(s.k) && !s.done).map((s) => s.k);
// Claude calls "do it all" will make: one per step, the photos one per 12 not yet seen
const aiCalls = (t, i, dk) => aiTodo(t, i, dk).reduce((n, k) => n + (k === 'photo' ? Math.max(1, Math.ceil(mediaOf(t.id, i).filter((m) => !m.ai && !m.pending).length / 12)) : 1), 0);
function aiPanel(t, i, dk) {
  if (!isEditor() || !S.features.story) return '';
  const steps = aiSteps(t, i, dk), todo = aiTodo(t, i, dk), calls = aiCalls(t, i, dk);
  const all = aiRun ? `<button class="btn small" id="aiall" disabled aria-busy="true">⏳ ${L(`กำลังทำ ${aiRun.n}/${aiRun.of}…`, `Working ${aiRun.n} of ${aiRun.of}…`)}</button><button class="btn ghost small" data-a="aistop" id="aistop">■ ${L('หยุด', 'Stop')}</button>`
    : `<button class="btn small" data-a="aiall" data-t="${esc(t.id)}" data-d="${i}" id="aiall"${todo.length ? '' : ' disabled'}>${todo.length ? `✨ ${L(`ทำทั้งหมดในครั้งเดียว (ผู้ช่วย ${calls} ครั้ง)`, `Do it all (${calls} step${calls > 1 ? 's' : ''})`)}` : `✓ ${L('ทำครบแล้ว', 'All done')}`}</button>`;
  return `<section class="blk noprint aipanel" id="aipanel"><h3>${ic('sparkle')} ${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')} <span class="label">${esc(aiToday())}</span></h3>
${aiNote(L('บันทึกรูป คำพูด อารมณ์ก่อน แล้วไล่จากบนลงล่าง', 'Record photos, words and moods first, then go from the top'), L('ส่งเฉพาะข้อความที่บันทึกไว้ ไม่ส่งรูป (ยกเว้นปุ่ม "ดูรูป" ที่ส่งรูปย่อของวันนี้ เฉพาะตอนกด) · แต่ละปุ่มใช้โควตา 1 ครั้งต่อวัน · "ทำทั้งหมด" ทำ ดูรูป → สรุป → นิทาน → คำถาม ข้ามข้อที่ทำแล้ว กดหยุดได้', 'Every button sends the helper only the written notes, never photos — except "Photos", which sends today’s small thumbnails (never the full file, no GPS) when you press it · each button is one request from the daily allowance · do the photos first: their captions make the summary and the story fuller · "Do it all" runs photos → summary → story → questions in turn, skipping what is done; Stop works any time'))}
<div class="row" style="margin-top:8px">${all}</div>
<ol class="aisteps">${steps.map((x) => `<li><button class="aistep${x.done ? ' done' : ''}" data-a="jump" data-v="${x.sel}" data-k="${x.k}"><span class="e">${x.e}</span><b>${L(x.th, x.en)}</b><small>${x.done ? (x.stat && x.k !== 'msg' ? '✓ ' + esc(x.stat) : '✓') : esc(x.stat || '')}</small></button></li>`).join('')}</ol></section>`;
}
// the Claude blocks of the day, together under the panel (without Claude only the boxes that still make sense stay: the typed summary, saved questions/game)
const aiGroup = (t, i, dk) => `${aiPanel(t, i, dk)}
${photoAiBlock(t, i)}
${sumBlock(t, i, dk)}
${trBlock(t, i)}
${storyBlock(t, i)}
${talkBlock(t, i)}
${mquizBlock(t, i)}
${msgBlock(t, i, dk)}`;
// under the day strip: one tap down to the panel, with what is still to do tonight
function aiJump(t, i, dk) {
  if (!isEditor() || !S.features.story) return '';
  const n = aiTodo(t, i, dk).length;
  return `<button class="aijump noprint" data-a="jump" data-v="#aipanel">✨ ${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')}${n ? ` <small>${L(`เหลือ ${n}`, `${n} to do`)}</small>` : ' <small>✓</small>'} ↓</button>`;
}

/* ---------- both languages (record page): Claude translates the day's words Thai ↔ English; shown under each text in the book ---------- */
function trBlock(t, i) {
  if (!S.features.story) return '';
  const es = entriesOf(t.id, i).filter((e) => ['quote', 'note', 'fav', 'sum', 'first'].includes(e.kind) && e.text && (e.kind !== 'first' || e.first_key === 'custom'));
  const todo = es.filter((e) => !e.tr).length;
  return `<section class="blk trblk"><h3>${ic('globe')} ${L('สองภาษา', 'Both languages')} <span class="label">${!es.length ? L('ยังไม่มีคำให้แปล', 'Nothing to translate yet') : es.length - todo ? L(`แปลแล้ว ${es.length - todo}/${es.length}`, `${es.length - todo}/${es.length} translated`) : L(`${es.length} ข้อความ`, `${es.length} text${es.length === 1 ? '' : 's'}`)}</span></h3>
<p class="label">${L('ให้สมุดอ่านได้ทั้งไทยและอังกฤษ', 'So the book reads in Thai and English')}</p>
<div class="row" style="margin-top:6px"><button class="btn small" data-a="translate" data-t="${esc(t.id)}" data-d="${i}"${todo ? '' : ' disabled'}>🌐 ${todo ? L(`แปลวันนี้ (${todo})`, `Translate today (${todo})`) : L('แปลครบแล้ว', 'All translated')}</button></div></section>`;
}

/* ---------- bedtime questions (record page): Claude asks the kids three tiny questions about today; they hear them in kid mode ---------- */
/* ---------- tomorrow in five lines (Today page, editors, the evening before): Claude reads tomorrow's plan, the forecast and how
   today went; streamed into the box, never saved (nextAns keeps it while the page is open) ---------- */
let nextAns = null;   // {t, i, text}
function nextBlock(t, i) {
  if (!isEditor() || !S.features.story || i + 1 >= t.days.length) return '';
  const a = nextAns && nextAns.t === t.id && nextAns.i === i ? nextAns.text : '';
  return `<section class="blk noprint nextblk"><h3>${ic('moon')} ${L('เตรียมพรุ่งนี้', 'Ready for tomorrow')} <span class="label">${L(`วันที่ ${i + 2} ใน 5 บรรทัด`, `day ${i + 2} in five lines`)}</span></h3>
<div class="call calm" id="nexttext" style="white-space:pre-line"${a ? '' : ' hidden'}>${esc(a)}</div>
<div class="row" style="margin-top:6px"><button class="btn small" data-a="story" data-m="next" data-t="${esc(t.id)}" data-d="${i}" id="nextgo">✨ ${a ? L('สรุปใหม่', 'Again') : L('ให้ผู้ช่วยสรุปพรุ่งนี้', 'Ask the helper about tomorrow')}</button>
<button class="btn ghost small" data-a="storystop" id="nextstop" hidden>■ ${L('หยุด', 'Stop')}</button>
<span class="label">${L('จากแผนพรุ่งนี้ พยากรณ์อากาศ และบันทึกวันนี้ · ไม่ส่งรูป · ไม่บันทึก', 'From tomorrow’s plan, the forecast and today’s notes · never photos · not saved')}</span></div></section>`;
}
/* ---------- the morning memory game (record page, in the evening): Claude turns the day's notes into three picture questions;
   saved (kind mquiz) so kid mode can play them next morning ---------- */
const memQuiz = (t, i) => { const e = entriesOf(t.id, i).find((x) => x.kind === 'mquiz'); if (!e) return null; try { const q = JSON.parse(e.text); return Array.isArray(q) && q.length ? q : null; } catch (_) { return null; } };
function mquizBlock(t, i) {
  const q = memQuiz(t, i);
  if (!S.features.story && !q) return '';
  return `<section class="blk noprint mquizblk"><h3>${ic('learn')} ${L('เกมความจำพรุ่งนี้เช้า', 'Memory game for tomorrow morning')} <span class="label">${L('เด็กๆ เล่นในโหมดเด็ก', 'the kids play it in kid mode')}</span></h3>
<div class="call calm" id="mquiztext"${q ? '' : ' hidden'}>${q ? q.map((x) => `<div>❓ ${esc(x.q)} <small class="label">${x.a.map((c, n) => `${n === x.ok ? '✓ ' : ''}${esc(c.e)} ${esc(c.t)}`).join(' · ')}</small></div>`).join('') : ''}</div>
${S.features.story ? `<div class="row" style="margin-top:6px"><button class="btn small" data-a="story" data-m="mquiz" data-t="${esc(t.id)}" data-d="${i}" id="mquizgo">✨ ${q ? L('ตั้งเกมใหม่', 'New game') : L('ให้ผู้ช่วยตั้งเกมจากวันนี้', 'Ask the helper for a game from today')}</button>
<button class="btn ghost small" data-a="storystop" id="mquizstop" hidden>■ ${L('หยุด', 'Stop')}</button>
</div>` : ''}</section>`;
}
function talkBlock(t, i) {
  const e = entriesOf(t.id, i).find((x) => x.kind === 'talk');
  if (!S.features.story && !e) return '';
  return `<section class="blk noprint talkblk"><h3>${ic('quote')} ${L('คำถามชวนคุยก่อนนอน', 'Bedtime questions')} <span class="label">${L('เด็กๆ ฟังในโหมดเด็ก', 'the kids hear them in kid mode')}</span></h3>
<div class="call calm" id="talktext" style="white-space:pre-line"${e ? '' : ' hidden'}>${e ? esc(e.text) : ''}</div>
${S.features.story ? `<div class="row" style="margin-top:6px"><button class="btn small" data-a="story" data-m="talk" data-t="${esc(t.id)}" data-d="${i}" id="talkgo">✨ ${e ? L('ตั้งคำถามใหม่', 'New questions') : L('ให้ผู้ช่วยตั้งคำถาม', 'Ask the helper for questions')}</button>
<button class="btn ghost small" data-a="storystop" id="talkstop" hidden>■ ${L('หยุด', 'Stop')}</button>
${e ? `<button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button>` : ''}</div>` : ''}</section>`;
}

/* ---------- a letter to the kids for when they are older (book page; the last page of the PDF): typed, or drafted by Claude
   from the whole trip's notes, then edited by hand (blur saves). Relatives read it; only the family writes it. ---------- */
/* ---------- the book's foreword (book page, near the top; the PDF's first page after the cover): typed, or drafted by Claude from
   the whole trip's notes and edited by hand (blur saves). Relatives read it. ---------- */
function foreBlock(t, nDays) {
  const e = entriesOf(t.id).find((x) => x.kind === 'fore'), ed = isEditor();
  if (!ed) return e && e.text ? `<div class="part">📖 ${L('คำนำ', 'Foreword')}</div><div class="call calm fore">${esc(e.text)}</div>` : '';
  if (!nDays && !e) return '';
  const ai = S.features.story && nDays;
  return `<section class="blk foreblk"><h3>${ic('book')} ${L('คำนำของสมุด', 'The book’s foreword')} <span class="label">${L('หน้าแรกของ PDF ต่อจากปก', 'the first page of the PDF after the cover')}</span></h3>
<textarea id="foretext" class="field" rows="6" data-a-blur="fore" data-t="${esc(t.id)}" data-d="" data-draft="fw:${esc(t.id)}" maxlength="3000" placeholder="${L('ทริปนี้เราไป…', 'On this trip we went…')}">${esc(drafts['fw:' + t.id] ?? (e ? e.text : ''))}</textarea><p class="label savenote">${L('บันทึกเองเมื่อแตะออกจากช่อง', 'Saves by itself when you leave the box')}</p>
${ai ? `<div class="row noprint" style="margin-top:6px"><button class="btn small" data-a="story" data-m="fore" data-t="${esc(t.id)}" data-d="" id="forego">✨ ${e ? L('ร่างใหม่', 'Draft again') : L('ให้ผู้ช่วยร่างคำนำ', 'Ask the helper for a first draft')}</button>
<button class="btn ghost small" data-a="storystop" id="forestop" hidden>■ ${L('หยุด', 'Stop')}</button>
<span class="label" id="foremsg">${L('จากบันทึกทั้งทริป ไม่ส่งรูป · แก้ในช่องได้', 'From the whole trip’s notes, never photos · edit it in the box')}</span></div>` : ''}</section>`;
}
function letterBlock(t, nDays) {
  const e = entriesOf(t.id).find((x) => x.kind === 'letter'), ed = isEditor();
  if (!ed) return e && e.text ? `<div class="part">💌 ${L('จดหมายถึงลูก', 'A letter to you')}</div><div class="call calm letter">${esc(e.text)}</div>` : '';
  if (!nDays && !e) return '';   // an empty book shows the way in first; the letter box comes once a day is recorded
  const ai = S.features.story && nDays;
  return `<section class="blk letterblk"><h3>${ic('mail')} ${L(`จดหมายถึง${esc(kidsNames() || 'ลูก')}`, `A letter to ${esc(kidsNames() || 'you')}`)} <span class="label">${L('ไว้อ่านตอนโต · หน้าสุดท้ายของ PDF', 'for when they are older · the last page of the PDF')}</span></h3>
<textarea id="lettertext" class="field" rows="8" data-a-blur="letter" data-t="${esc(t.id)}" data-d="" data-draft="l:${esc(t.id)}" maxlength="4000" placeholder="${L(`ถึง${esc(kidsNames() || 'ลูก')}…`, `Dear ${esc(kidsNames() || 'you')}…`)}">${esc(drafts['l:' + t.id] ?? (e ? e.text : ''))}</textarea><p class="label savenote">${L('บันทึกเองเมื่อแตะออกจากช่อง', 'Saves by itself when you leave the box')}</p>
${ai ? `<div class="row noprint" style="margin-top:6px"><button class="btn small" data-a="story" data-m="letter" data-t="${esc(t.id)}" data-d="" id="lettergo">✨ ${e ? L('ร่างใหม่', 'Draft again') : L('ให้ผู้ช่วยร่างจดหมาย', 'Ask the helper for a first draft')}</button>
<button class="btn ghost small" data-a="storystop" id="letterstop" hidden>■ ${L('หยุด', 'Stop')}</button>
<span class="label" id="lettermsg">${L('จากบันทึกทั้งทริป ไม่ส่งรูป · แก้ในช่องให้เป็นคำของเราเอง', 'From the whole trip’s notes, never photos · make it your own words in the box')}</span></div>` : ''}</section>`;
}
/* ---------- what our family likes (travel notebook, editors): Claude reads the notebook of every trip ---------- */
let likes = undefined;   // undefined = not asked yet · null = none saved · {text, lang, at, n}
function likesBlock(n) {
  if (!isEditor()) return '';
  if (likes === undefined && navigator.onLine) { likes = null; api('GET', '/api/b/likes').then((r) => { likes = r; safeRender(); }, () => {}); }
  const ai = S.features.story && n;
  if (!ai && !(likes && likes.text)) return '';
  return `<section class="blk likesblk"><h3>${ic('sparkle')} ${L('ครอบครัวเราชอบอะไร', 'What our family likes')}${likes && likes.at ? ` <span class="label">${esc(new Date(likes.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short', year: 'numeric' }))}</span>` : ''}</h3>
<div class="call calm" id="likestext" style="white-space:pre-line"${likes && likes.text ? '' : ' hidden'}>${likes && likes.text ? esc(likes.text) : ''}</div>
${ai ? `<div class="row" style="margin-top:6px"><button class="btn small" data-a="likes" id="likesgo">✨ ${likes && likes.text ? L('สรุปใหม่', 'Sum up again') : L('ให้ผู้ช่วยสรุปจากทุกทริป', 'Ask the helper to sum up every trip')}</button>
<span class="label">${L('ส่งเฉพาะข้อความในสมุดโน้ต ไม่ส่งรูป', 'Sends only the notebook’s words — never photos')}</span></div>` : ''}</section>`;
}

/* ---------- bedtime story by Claude (editors, only when pressed) ---------- */
function storyBlock(t, day) {
  const st = entriesOf(t.id).find((e) => e.kind === 'story' && e.day === day);
  const can = isEditor() && S.features.story;
  if (!st && !can) return '';
  const whole = day === null, dv = whole ? '' : day;
  return `<section class="blk${st ? '' : ' noprint'}" id="storyblk"><h3>${ic('sparkle')} ${whole ? L('นิทานของทั้งทริป', 'The story of the whole trip') : L('นิทานก่อนนอนของวันนี้', "Tonight's bedtime story")}</h3>
${st ? `${bedBtn(st)}<div class="call calm" id="storytext" style="white-space:pre-line">${esc(st.text)}</div>` : `<div class="call calm" id="storytext" style="white-space:pre-line" hidden></div>`}
${can ? `<div class="row noprint" style="margin-top:8px">
<button class="btn small" data-a="story" data-t="${esc(t.id)}" data-d="${dv}" id="storygo">✨ ${st ? L('แต่งใหม่', 'Write again') : L('ให้ผู้ช่วยแต่งนิทาน', 'Ask the helper for a story')}</button>
<button class="btn ghost small" data-a="storystop" id="storystop" hidden>■ ${L('หยุด', 'Stop')}</button>
${st ? `<button class="mini" data-a="delentry" data-v="${esc(st.id)}">${L('ลบนิทาน', 'Delete story')}</button>` : ''}
${whole ? `<span class="label">${L('ส่งเฉพาะข้อความที่บันทึกไว้ ไม่ส่งรูป', 'Sends only the written notes — never photos')}${aiToday() ? ' · ' + esc(aiToday()) : ''}</span>` : ''}</div>` : ''}</section>`;
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
  return `<section class="blk" id="notebook"><h3>${ic('notebook')} ${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')} <span class="label">${n ? `${n}/${items.length} · ` : ''}${L('ไว้วางแผนทริปหน้า', 'for the next trip')}</span></h3>
<p class="label">${L('วันนี้ที่พัก ร้าน สถานที่ เป็นยังไงบ้าง? ให้ดาว ติดแท็ก บอกว่าเด็กชอบไหม', 'How did today’s stay, meals and places work for us? Stars, tags, and the kids’ verdicts')}</p>
<div class="revs">${items.map((it) => reviewCard(t, i, it, ed)).join('')}</div></section>`;
}
/* ---------- relatives in groups (editors): each group its own view-only PIN and/or link, and the books it may see ----------
   The list comes from /api/b/viewers (not part of the offline state); a PIN is shown once, right after it is set, never again. */
let vg = null, vgForm = null, vgJust = null;

/* ---------- our family (#/family, editors): the app's name, the children, and how each one is drawn ----------
   The two hand-drawn characters (a girl with her wagon, a toddler) recoloured per child; the server renders the SVG (server/family.js).
   fam = the form being edited; saved as a whole with PUT /api/b/family, then the state is reloaded. */
/* ---------- the family's emoji library (#/emoji, editors): every picture, delete one (two taps), add one of your own
   (an emoji + a name + a picture from the phone; the server shrinks it to 160 px), bring back the original set ---------- */
let emoForm = { ch: '', th: '', en: '', file: null, url: null, err: '', busy: false };
function viewEmoji() {
  const rows = emoRows(), f = emoForm;
  const card = (e) => `<li class="emocard"><img src="${esc(e.src)}" alt=""><b>${esc(L(e.th || e.en, e.en || e.th))}</b><small>${esc(e.ch)}${(e.alt || []).length ? ` ${esc(e.alt.slice(0, 4).join(' '))}` : ''}</small>
<button type="button" class="mini emodel" data-a="emodel" data-v="${esc(e.id)}" aria-label="${esc(L(`ลบ ${e.th || e.en}`, `Delete ${e.en || e.th}`))}">${L('ลบ', 'Delete')}</button></li>`;
  return `<div class="part">${L('ตั้งค่า', 'Settings')}</div><h1 class="h2">${emo('😄')} ${L('อีโมจิของเรา', 'Our emoji')}</h1>
<p class="lede">${L('รูปที่ใช้แทนอีโมจิในอารมณ์ หัวใจ คำพูด โน้ต และคำบรรยายรูป · เพิ่มของบ้านเราเอง หรือลบที่ไม่ใช้', 'The pictures the app draws for each emoji — in moods, hearts, quotes, notes and captions. Add your own, or delete the ones you don’t use.')}</p>
<section class="blk emoadd"><h3>＋ ${L('เพิ่มอีโมจิ', 'Add an emoji')}</h3>
<div class="emoaddrow"><label class="emopic${f.url ? ' on' : ''}">${f.url ? `<img id="emprev" src="${esc(f.url)}" alt="">` : `<span>🖼️</span><small>${L('เลือกรูป', 'Pick a picture')}</small>`}<input type="file" id="emfile" accept="image/*"></label>
<div class="emofields"><label>${L('อีโมจิที่จะให้รูปนี้แทน', 'The emoji it stands for')}<input class="field emoch" data-emf="ch" value="${esc(f.ch)}" maxlength="16" placeholder="🦘" inputmode="text"></label>
<div class="famrow"><label>${L('ชื่อ (ไทย)', 'Name (Thai)')}<input class="field" data-emf="th" value="${esc(f.th)}" maxlength="30" placeholder="${L('จิงโจ้', 'จิงโจ้')}"></label><label>${L('ชื่อ (อังกฤษ)', 'Name (English)')}<input class="field" data-emf="en" value="${esc(f.en)}" maxlength="30" placeholder="Kangaroo"></label></div></div></div>
<p class="famhint">${L('รูปพื้นใสดีที่สุด ย่อเหลือ 160 px · เห็นเฉพาะคนที่เข้าสู่ระบบ', 'A picture with a see-through background works best. It is shrunk to 160 px and kept in your family’s own storage, seen only by people who are signed in.')}</p>
${f.err ? `<div class="notice">${esc(f.err)}</div>` : ''}
<div class="row end"><button type="button" class="btn" data-a="emoadd" ${f.busy ? 'disabled' : ''}>${f.busy ? '⏳ ' + L('กำลังเพิ่ม…', 'Adding…') : L('เพิ่มอีโมจิ', 'Add emoji')}</button></div></section>
<h2 class="famh3">${L('ทั้งหมด', 'All of them')} <span class="pill">${rows.length}</span></h2>
${rows.length ? `<ul class="emolist">${rows.map(card).join('')}</ul>` : `<p class="empty">${L('ยังไม่มีอีโมจิ', 'No emoji yet')}</p>`}
<div class="row end" style="margin-top:14px"><button type="button" class="btn ghost small" data-a="emodefaults">↺ ${L('เอาชุดเดิมกลับมา', 'Bring back the original set')}</button></div>`;
}
let fam = null;
const famBuilt = () => { const ks = fam.kids.filter((k) => k.name_en.trim()); const ini = ks.map((k) => k.name_en.trim()[0].toUpperCase()).join(''); const th = ks.map((k) => k.name_th.trim() || k.name_en.trim());
  const app = 'LifeBook', nth = th.length <= 1 ? th.join('') : th.slice(0, -1).join(' ') + 'และ' + th[th.length - 1];
  return { app: { th: app, en: app }, kicker: { th: ks.length ? `ของ${nth}` : 'สมุดความทรงจำของครอบครัว', en: ks.length ? ks.map((k) => k.name_en.trim()).join(' & ') : 'Our family memory books' } }; };
// the drawing for a kid card: the look being edited (rendered by the server from ?look=), or Mimi / Mika as drawn
const famArt = (k, full) => (k.avatar ? `/media/kid/${encodeURIComponent(k.slug)}/${full ? 'full' : 'face'}.png?v=${encodeURIComponent(k.avatar)}` : k.look ? `/art/kids/${encodeURIComponent(k.slug || 'new')}${full ? '-full' : ''}.svg?look=${encodeURIComponent(JSON.stringify(k.look))}` : kidArt(k.slug, full));
// each child's colour on the page: their top colour, a shade deep enough for text and borders on paper
const FAM_TONE = { red: '#E53935', blue: '#2F7FE0', green: '#2E9E62', yellow: '#D9940A', purple: '#8E5BE0', pink: '#E8467F', teal: '#1E9488', orange: '#EE7424', mint: '#2A9C84' };
const famTone = (k) => FAM_TONE[(k.look && k.look.top) || (k.slug === 'mika' ? 'mint' : 'red')];
const famMonths = (ym) => { if (!/^\d{4}-\d{2}$/.test(ym || '')) return null; const [y, m] = ym.split('-').map(Number), n = new Date(), mo = (n.getFullYear() - y) * 12 + n.getMonth() + 1 - m; return mo >= 0 ? mo : null; };
const famAgeM = (mo) => (mo == null ? '' : mo < 12 ? L(`${mo} เดือน`, `${mo} mo`) : L(`${Math.floor(mo / 12)}${mo % 12 >= 6 ? ' ขวบครึ่ง' : ' ขวบ'}`, `${Math.floor(mo / 12)}${mo % 12 >= 6 ? '½' : ''} yrs`));
const famAge = (ym) => famAgeM(famMonths(ym));   // "3 ขวบครึ่ง" today from a birth month, '' when unknown
function viewFamily() {
  if (!fam) {
    const c = (S.family && S.family.custom) || {}, ca = c.app || {}, ck = c.kicker || {};   // only what the parents typed; empty = built from the children
    fam = { app: { th: ca.th || '', en: ca.en || '' }, kicker: { th: ck.th || '', en: ck.en || '' },
      kids: children().map((k) => ({ slug: k.slug, name_th: k.name_th, name_en: k.name_en, emoji: k.emoji || '', birth_ym: k.birth_ym || '', look: k.look ? { ...k.look } : null, avatar: k.avatar || null, avatars: Array.isArray(k.avatars) ? k.avatars : [] })), err: '', busy: false, busyKid: null, quota: null };
  }
  if (!fam.kids.length && route().parts[0] === 'start') fam.kids.push({ slug: '', name_th: '', name_en: '', emoji: '🧒', birth_ym: '', look: null, avatar: null, avatars: [] });   // the setup opens with one card to fill
  const built = famBuilt(), shown = { app: L(fam.app.th, fam.app.en) || L(built.app.th, built.app.en), kicker: L(fam.kicker.th, fam.kicker.en) || L(built.kicker.th, built.kicker.en) };
  if (fam.quota === null && S.features.avatar) { fam.quota = 'loading'; api('GET', '/api/b/family/avatars').then((r) => { fam.quota = r; safeRender(); }, () => { fam.quota = { left: {}, yearly: 3 }; }); }
  const q = fam.quota && typeof fam.quota === 'object' ? fam.quota : { left: {}, yearly: 3 };
  const drawn = (k) => !!(k.avatar || k.look || k.slug === 'mimi' || k.slug === 'mika');
  const cast = fam.kids.filter(drawn).map((k) => `<img class="who ${k.avatar ? 'drawnai' : k.look ? (k.look.base === 'boy' ? 'mika' : 'mimi') : k.slug}" src="${famArt(k, true)}" alt="">`).join('');
  const card = (k, i) => {
    const look = k.look || null, age = famAge(k.birth_ym), nm = L(k.name_th || k.name_en, k.name_en || k.name_th);
    return `<article class="famkid" style="--kc:${famTone(k)}">
<div class="famstage"><span class="famnum">${i + 1}</span>${drawn(k) ? `<img src="${famArt(k, true)}" alt="">` : `<span class="e">${esc(k.emoji || '🧒')}</span>`}
<div class="famtag"><b>${esc(nm) || L('ลูกคนใหม่', 'New child')}</b>${age ? `<small>${esc(age)}</small>` : ''}</div></div>
<div class="fambody">
<div class="famrow"><label>${L('ชื่อเล่น (ไทย)', 'Name (Thai)')}<input class="field" data-fam="${i}:name_th" value="${esc(k.name_th)}" maxlength="40"></label><label>${L('ชื่อเล่น (อังกฤษ)', 'Name (English)')}<input class="field" data-fam="${i}:name_en" value="${esc(k.name_en)}" maxlength="40" required></label></div>
<div class="famrow famrow2"><label><span>${L('เดือนและปีเกิด', 'Month and year of birth')} <b class="famreq">*</b></span><input class="field ${k.birth_ym ? '' : 'famneed'}" type="month" data-fam="${i}:birth_ym" value="${esc(k.birth_ym)}" required></label><label>${L('อีโมจิ', 'Emoji')}<input class="field famemo" data-fam="${i}:emoji" value="${esc(k.emoji)}" maxlength="8"></label>
<small class="famagenow ${k.birth_ym ? 'on' : ''}">${k.birth_ym ? L(`ตอนนี้ ${famAge(k.birth_ym)}`, `Now ${famAge(k.birth_ym)}`) : L('ใช้คิดอายุลูกในแต่ละเล่ม', 'Used for the age in each book')}</small></div>
${!S.features.avatar ? '' : (() => {   // no drawing helper on this server: no box at all (nothing for a parent to do here)
  const saved = children().some((c) => c.slug === k.slug), left = q.left[k.slug], busy = fam.busyKid === i, who = esc(nm) || L('ลูก', 'your child');
  const body = !saved ? `<p class="famhint">${L('กดบันทึกครอบครัวก่อน แล้วค่อยอัปโหลดรูป', 'Save the family first, then upload a photo')}</p>`
    : !k.birth_ym || !(children().find((c) => c.slug === k.slug) || {}).birth_ym ? `<p class="famhint">${L('ใส่เดือนและปีเกิดแล้วกดบันทึกก่อน จะได้วาดตัวละครให้ตรงวัย', 'Add the month and year of birth and save first, so the AI draws the character at the right age')}</p>`
    : `<label class="famupload ${busy ? 'busy' : ''} ${left === 0 ? 'off' : ''}"><span class="e">${busy ? '🎨' : '📷'}</span><span><b>${busy ? L('กำลังวาดตัวละคร…', 'The AI is drawing…') : k.avatar ? L('อัปโหลดรูปใหม่ วาดอีกครั้ง', 'Upload a new photo, draw again') : L('อัปโหลดรูปลูก ให้วาดเป็นตัวละคร', 'Upload a photo, the AI draws the character')}</b><small>${busy ? L('ราว 30–60 วินาที อย่าเพิ่งปิดหน้านี้', 'About 30–60 seconds — keep this page open') : L('รูปหน้าตรง เห็นทั้งตัว แสงสว่าง ได้ผลดีที่สุด', 'Facing the camera, whole body, good light works best')}</small></span>
<input type="file" accept="image/*" data-famavatar="${i}" ${fam.busyKid !== null || left === 0 ? 'disabled' : ''}></label>
<div class="famleft">${left === undefined ? '' : left > 0 ? L(`เหลือ ${left} จาก ${q.yearly} ครั้งในรอบ 12 เดือน`, `${left} of ${q.yearly} tries left this year`) : L(`ใช้ครบ ${q.yearly} ครั้งของปีนี้แล้ว`, `All ${q.yearly} tries used this year`)}${k.avatar ? ` · <button type="button" class="linkbtn" data-a="famavoff" data-i="${i}">${L('กลับไปใช้ภาพเดิม', 'Back to the plain drawing')}</button>` : ''}</div>`;
  const last = k.avatars.length ? k.avatars[k.avatars.length - 1] : null, nowM = famMonths(k.birth_ym);
  const grown = last && last.age_m != null && nowM != null && nowM - last.age_m >= 12;   // a year older than the newest drawing
  const hist = k.avatars.length ? `<p class="famhist">${ic('image')} ${L(`วาดไว้ ${k.avatars.length} ตัว`, `${k.avatars.length} drawing${k.avatars.length > 1 ? 's' : ''}`)}${last && last.age_m != null ? L(` · ตัวล่าสุดตอนอายุ ${famAgeM(last.age_m)}`, ` · the newest at ${famAgeM(last.age_m)}`) : ''} · ${L('แต่ละเล่มใช้ตัวที่ตรงกับช่วงทริปนั้น', 'each book shows the one from its own time')}</p>` : '';
  const nudge = grown && S.features.avatar ? `<div class="famgrow">🌱 <b>${L(`${who}โตขึ้นแล้ว`, `${who} has grown`)}</b> ${L(`ตอนนี้ ${famAgeM(nowM)} อัปโหลดรูปใหม่ ให้ตัวละครโตตามด้วย`, `now ${famAgeM(nowM)} — upload a new photo so the character grows up too`)}</div>` : '';
  return `<div class="famai"><div class="famaihd"><b>✨ ${L(`ตัวละครของ${who}`, `${who}'s character`)}</b></div>${nudge}${body}${hist}</div>`;
})()}
<div class="famacts"><button type="button" class="mini" data-a="fammove" data-i="${i}" data-v="-1" ${i === 0 ? 'disabled' : ''} aria-label="${L('เลื่อนขึ้น', 'Move up')}">↑</button><button type="button" class="mini" data-a="fammove" data-i="${i}" data-v="1" ${i === fam.kids.length - 1 ? 'disabled' : ''} aria-label="${L('เลื่อนลง', 'Move down')}">↓</button><button type="button" class="mini famdel" data-a="famdel" data-i="${i}">${L('เอาออก', 'Remove')}</button></div>
</div></article>`;
  };
  return `<section class="famhero"><div class="famherotx"><div class="kicker"><img class="kickpic" src="/art/hub/family.webp" alt=""> ${L('ครอบครัวของเรา', 'Our family')}</div><h2>${L('ใครอยู่ในสมุดเล่มนี้', 'Who is in these books')}</h2>
<p>${S.features.avatar ? L('ตั้งชื่อแอป ใส่ชื่อลูก อัปโหลดรูปให้วาดตัวละคร — ทุกหน้า นิทาน และการเตือนจะใช้ชื่อและตัวละครนี้', 'Name the app, add the children and upload a photo to draw each one’s character. Every page, story and reminder uses them.')
  : L('ตั้งชื่อแอปและชื่อลูก — ทุกหน้า นิทาน และการเตือนจะใช้ชื่อนี้', 'Name the app and add the children. Every page, story and reminder uses their names.')}</p></div>
<div class="cast" aria-hidden="true">${cast}</div></section>

<section class="famapp"><div class="fampreview" aria-hidden="true"><small>${esc(shown.kicker)}</small><b>${esc(shown.app)}</b><span>${L('หน้าตาบนหัวแอปและหน้าเข้าสู่ระบบ', 'How it shows at the top and on the sign-in page')}</span></div>
<div class="famappf"><h3>${ic('device')} ${L('ชื่อแอป', 'App name')}</h3>
<div class="famrow"><label>${L('ชื่อแอป (ไทย)', 'App name (Thai)')}<input class="field" data-famp="app:th" value="${esc(fam.app.th)}" maxlength="40"></label><label>${L('ชื่อแอป (อังกฤษ)', 'App name (English)')}<input class="field" data-famp="app:en" value="${esc(fam.app.en)}" maxlength="40"></label></div>
<div class="famrow"><label>${L('บรรทัดเล็กใต้ชื่อ (ไทย)', 'Line under the name (Thai)')}<input class="field" data-famp="kicker:th" value="${esc(fam.kicker.th)}" maxlength="40"></label><label>${L('บรรทัดเล็กใต้ชื่อ (อังกฤษ)', 'Line under the name (English)')}<input class="field" data-famp="kicker:en" value="${esc(fam.kicker.en)}" maxlength="40"></label></div>
<p class="famhint">${L('เว้นว่างได้ แอปจะใช้ชื่อ LifeBook และบรรทัดเล็กจากชื่อลูก', 'Leave empty for LifeBook with the children’s names under it')}</p></div></section>

<h2 class="famh3">🧒 ${L('ลูกๆ', 'The children')} <span class="pill">${fam.kids.length ? L(`${fam.kids.length} คน`, `${fam.kids.length}`) : L('ได้ถึง 6 คน', 'up to 6')}</span></h2>
<div class="famkids">${fam.kids.map(card).join('')}
${fam.kids.length < 6 ? `<div class="famaddtiles"><button type="button" class="famaddtile" data-a="famadd"><span>＋</span><b>${L('เพิ่มลูกอีกคน', 'Add a child')}</b><small>${S.features.avatar ? L('ใส่ชื่อ บันทึก แล้วอัปโหลดรูปให้วาด', 'Add a name, save, then upload a photo to draw them') : L('ใส่ชื่อและเดือนเกิด แล้วกดบันทึก', 'Add a name and birth month, then save')}</small></button>
</div>` : ''}</div>
${fam.err ? `<div class="notice">${esc(fam.err)}</div>` : ''}
<div class="famsave"><button type="button" class="btn" data-a="famsave" ${fam.busy ? 'disabled' : ''}>${fam.busy ? '⏳ ' + L('กำลังบันทึก…', 'Saving…') : (route().parts[0] === 'start' ? L('บันทึกแล้วไปต่อ', 'Save and continue') : '💾 ' + L('บันทึกครอบครัว', 'Save our family'))}</button><a class="btn ghost" href="#/">${L('ยกเลิก', 'Cancel')}</a></div>
<p class="impnote">🔒 ${S.features.avatar ? L('รูปลูกถูกย่อแล้วส่งให้ผู้ช่วยวาดภาพครั้งเดียว ไม่เก็บรูปไว้ที่ไหน เก็บแค่ตัวการ์ตูน ซึ่งเห็นได้เฉพาะคนในครอบครัวที่เข้าสู่ระบบ · ', 'The photo is shrunk and sent once to the drawing helper. The photo is kept nowhere, only the cartoon, which only signed-in family can see · ') : ''}${L('ชื่อและเดือนเกิดอยู่ในฐานข้อมูลของครอบครัวนี้เท่านั้น หน้าเข้าสู่ระบบแสดงแค่ชื่อแอปและภาพวาด · ลูกที่มีบันทึกแล้วเอาออกไม่ได้ (เปลี่ยนชื่อได้)', "Names and birth months stay in this family's own database; the sign-in page shows only the app's name and the drawings · a child with memories recorded cannot be removed (but can be renamed)")}</p>`;
}
   // the groups · the form being filled {id, name, trips, link} · {name, pin} just saved
/* ---------- first run (#/start/<n>, editors): a new family sets itself up in four steps ----------
   0 welcome · 1 the family (the #/family form) · 2 a PIN for the relatives · 3 the Home-Screen icon (an iPhone sends
   reminders only from it) · 4 reminders · 5 the first book. Every step but the family can be skipped; `ls('startDone')`
   ends the redirect from the shelf. The owner's rule: one main button a page, a dot row for the place. */
const START_LAST = 5;
function viewStart(p) {
  const n = Math.min(START_LAST, Math.max(0, parseInt(p[1], 10) || 0));
  const ios = isIOS(), android = /Android/.test(navigator.userAgent);
  const standalone = matchMedia('(display-mode: standalone)').matches || !!navigator.standalone;
  const head = n && n < START_LAST ? `<div class="onbhd"><a class="ibtn" href="#/start/${n - 1}" aria-label="${L('ย้อนกลับ', 'Back')}">${ic('back')}</a>
<div class="onbdots" aria-label="${L(`ขั้น ${n} จาก 4`, `Step ${n} of 4`)}">${[1, 2, 3, 4].map((i) => `<span class="${i === n ? 'on' : i < n ? 'done' : ''}"></span>`).join('')}</div><span class="label">${n}/4</span></div>` : '';
  const next = (to, th, en, ghost) => `<a class="btn onbnext${ghost ? ' ghost' : ''}" href="#/start/${to}">${L(th, en)}</a>`;
  const row = (no, th, en, sth, sen) => `<li><span class="onbno">${no}</span><span><b>${L(th, en)}</b><small>${L(sth, sen)}</small></span></li>`;
  let body;
  if (n === 0) body = `<div class="kicker">${L('สมุดส่วนตัวของครอบครัว', 'Private family book')}</div>
<h1 class="h2">${L('ยินดีต้อนรับสู่สมุดความทรงจำของครอบครัว', 'Welcome to your family’s memory book')}</h1>
<p class="lede">${L('ทริปละเล่ม เติมระหว่างเที่ยว เก็บไว้อ่านอีกหลายปี · ตั้งค่า 4 ขั้น ราว 3 นาที', 'One book per trip, filled in on the road and reread for years. Four steps, about three minutes.')}</p>
<div class="onbart"><div class="cast" aria-hidden="true"><img class="who mimi" src="/art/kids/mimi-full.svg" alt=""><img class="who mika" src="/art/kids/mika-full.svg" alt=""></div><p class="label">${L('ตัวละครตัวอย่าง ขั้นแรกจะเปลี่ยนเป็นลูกของบ้านคุณ', 'Sample characters — the first step makes them your own children')}</p></div>
<ol class="onbsteps">${row(1, 'ครอบครัวของเรา', 'Your family', 'ชื่อลูกๆ เดือนเกิด ตัวการ์ตูนของแต่ละคน', 'The children’s names, birth months and characters')}
${row(2, 'รหัสสำหรับญาติ', 'A PIN for the relatives', 'ปู่ย่าตายายเปิดดูได้ แก้ไม่ได้', 'Grandparents can look, not change')}
${row(3, 'เพิ่มไว้บนหน้าจอโฮม', 'Add to the Home Screen', 'เปิดเร็วเหมือนแอป และรับการเตือนได้', 'Opens like an app and can show reminders')}
${row(4, 'เตือนระหว่างทริป', 'Reminders during the trip', 'ก่อนแต่ละช่วง 30 นาที และตอนค่ำให้บันทึกวัน', '30 min before each step, and the evening nudge to record the day')}</ol>
${next(1, 'เริ่มตั้งค่า', 'Start')}
<p class="label onbpriv">${L('รูปและข้อความอยู่บนเซิร์ฟเวอร์ของครอบครัวคุณเท่านั้น ไม่มีโฆษณา ไม่มีการติดตาม', 'Photos and words stay on your family’s own server. No ads, no tracking.')} · <a href="#/privacy">${L('นโยบายความเป็นส่วนตัว', 'Privacy policy')}</a> · <button type="button" class="linkbtn" data-a="startskip">${L('ข้ามการตั้งค่า', 'Skip setup')}</button></p>`;
  else if (n === 1) body = `<h1 class="h2">${L('ครอบครัวของเรา', 'Your family')}</h1>
<p class="lede">${L('ชื่อแอปจะเป็นของบ้านคุณ ตั้งจากชื่อลูกให้เอง แก้ได้ทีหลัง', 'The app names itself after the children; everything can be changed later.')}</p>${viewFamily()}`;
  else if (n === 2) {
    if (vg === null) { vg = 'loading'; api('GET', '/api/b/viewers').then((r) => { vg = r.groups; safeRender(); }, () => { vg = []; safeRender(); }); }
    if (!vgForm || vgForm.id) vgForm = { id: '', name: L('ญาติ', 'Relatives'), trips: S.trips.map((t) => t.id), link: true };
    const f = vgForm, had = Array.isArray(vg) && vg.length;
    body = `<h1 class="h2">${L('รหัสสำหรับญาติ', 'A PIN for the relatives')}</h1>
<p class="lede">${L('ปู่ย่าตายายใช้รหัสนี้ดูเล่มและส่งหัวใจได้ แก้ไม่ได้ · ข้ามได้ ตั้งทีหลังที่ เมนู › ญาติ', 'Grandparents sign in with it, read the books and send the kids hearts, but cannot change anything. Skippable: set it later under Menu › Relatives.')}</p>
${vgJust ? `<div class="call pick vgjust"><span>${L('รหัสของกลุ่ม', 'PIN for')} <b>${esc(vgJust.name)}</b></span><span class="vgpin">${esc(vgJust.pin)}</span><small>${L('จดไว้ส่งให้ญาติ แอปไม่เก็บรหัสเป็นตัวเลข เปลี่ยนได้ทีหลัง', 'Write it down for the relatives — the app keeps no copy; it can be changed later')}</small></div>${next(3, 'ต่อไป', 'Next')}`
    : `<div class="vgform onb"><label class="vgl">${L('ชื่อกลุ่ม', 'Group name')}<input id="vgname" class="field" value="${esc(drafts['vg:name'] ?? f.name)}" data-draft="vg:name" maxlength="40"></label>
<label class="vgl">${L('รหัส 6–12 ตัวเลข', 'PIN, 6–12 digits')}<input id="vgpin" class="field onbpin" inputmode="numeric" pattern="[0-9]*" value="${esc(drafts['vg:pin'] ?? '')}" data-draft="vg:pin" maxlength="12" autocomplete="off"></label>
<p class="label">${had ? L('มีกลุ่มญาติอยู่แล้ว กลุ่มนี้จะเพิ่มเข้าไป', 'A relatives’ group exists already; this adds another') : L('กลุ่มนี้เห็นทุกเล่ม และได้ลิงก์เปิดดูด้วย', 'This group sees every book and gets a view link too')}</p>
<p id="vgmsg" class="notice" hidden></p>
<button type="button" class="btn onbnext" data-a="vgsave">${L('บันทึกรหัส', 'Save the PIN')}</button></div>${next(3, 'ข้ามไปก่อน', 'Skip for now', true)}`}`;
  } else if (n === 3) body = `<h1 class="h2">${L('เพิ่มไว้บนหน้าจอโฮม', 'Add to the Home Screen')}</h1>
<p class="lede">${L('เปิดได้ในแตะเดียวเหมือนแอป', 'Opens in one tap, like an app.')} ${ios ? `<b>${L('บน iPhone/iPad การเตือนทำงานเฉพาะจากไอคอนบนหน้าจอโฮม', 'On an iPhone or iPad, reminders work only from the Home-Screen icon.')}</b>` : ''}</p>
${standalone ? `<div class="call calm">✓ ${L('เรียบร้อย ตอนนี้เปิดจากหน้าจอโฮมอยู่แล้ว', 'Done — you are already opening it from the Home Screen.')}</div>${next(4, 'ต่อไป', 'Next')}`
    : `<ol class="onbsteps">${ios ? `${row(1, 'แตะปุ่มแชร์ใน Safari', 'Tap Share in Safari', 'สี่เหลี่ยมมีลูกศรชี้ขึ้น กลางแถบล่าง', 'The square with the arrow, bottom centre')}
${row(2, 'เลื่อนลง แตะ “เพิ่มไปยังหน้าจอโฮม”', 'Scroll down, tap “Add to Home Screen”', '', '')}
${row(3, 'แตะ “เพิ่ม” มุมขวาบน', 'Tap “Add”, top right', 'แล้วเปิดแอปจากไอคอนใหม่', 'Then open the app from the new icon')}`
      : android ? `${row(1, 'แตะเมนู ⋮ ของเบราว์เซอร์', 'Tap the browser’s ⋮ menu', 'มุมขวาบน', 'Top right')}
${row(2, 'แตะ “ติดตั้งแอป” หรือ “เพิ่มลงหน้าจอหลัก”', 'Tap “Install app” or “Add to Home screen”', '', '')}
${row(3, 'เปิดจากไอคอนใหม่', 'Open it from the new icon', '', '')}`
      : `${row(1, 'เปิดลิงก์นี้บนมือถือ', 'Open this link on your phone', 'ขั้นนี้ทำบนมือถือที่จะใช้ระหว่างทริป', 'This step is for the phone you will carry on the trip')}`}</ol>
<div class="onbicon"><span class="onbtile">${(curTrip() && dayArt(curTrip(), 0)) ? artImg(curTrip(), 0) : `<span class="e">${esc((famProf().app && '📖') || '📖')}</span>`}</span><small>${esc(appName())}</small></div>
${next(4, 'ทำแล้ว เปิดจากหน้าจอโฮมแล้ว', 'Done, I open it from the Home Screen')}${next(4, 'ไว้ทีหลัง', 'Later', true)}`}`;
  else if (n === 4) {
    const on = !!ls('remind'), can = pushOk(), needHome = ios && !standalone;
    body = `<h1 class="h2">${L('เตือนระหว่างทริป', 'Reminders during the trip')}</h1>
<p class="lede">${L('ส่งเฉพาะช่วงทริป ใช้แค่ข้อความจากแผน ไม่มีรูปหรือชื่อลูกออกไป', 'Only around a trip, with the plan’s words alone — no photos or names leave the phone.')}</p>
<ol class="onbsteps times">${row('−30', 'ก่อนแต่ละช่วงของวัน', 'Before each step of the day', '“08:00 · อีก 30 นาที — ขึ้นเรือข้ามไป Central”', '“08:00 · in 30 min — the ferry to Central”')}
${row('08:00', 'ประตูเซอร์ไพรส์ให้เด็กๆ', 'The kids’ surprise door', 'ทุกเช้าช่วงนับถอยหลังก่อนเดินทาง', 'Every countdown morning before the trip')}
${row('21:30', 'บันทึกวันนี้ก่อนนอน', 'Record the day before bed', 'ไม่เตือนถ้าบันทึกไปแล้ว', 'Not sent when the day is already recorded')}
${row('19:00', 'เก็บเล่มไว้ในเครื่อง', 'Keep the book on the phone', 'สองวันก่อนบิน ให้ใช้ได้ตอนไม่มีเน็ต', 'Two days before the flight, for no-signal days')}</ol>
${on ? `<div class="call calm">✓ ${L('เปิดเตือนบนเครื่องนี้แล้ว', 'Reminders are on for this phone')}</div>${next(5, 'ต่อไป', 'Next')}`
    : needHome ? `<div class="call warn"><span class="lbl">${L('ยังเปิดไม่ได้', 'Not yet')}</span>${L('iPhone/iPad ต้องเปิดแอปจากไอคอนบนหน้าจอโฮมก่อน (ขั้นที่แล้ว) แล้วค่อยเปิดเตือนที่หน้า “วันนี้”', 'An iPhone or iPad needs the Home-Screen icon first (the previous step); then turn reminders on from Today.')}</div>${next(5, 'ต่อไป', 'Next')}`
    : can ? `<button type="button" class="btn onbnext" data-a="remind">${ic('bell')} ${L('เปิดเตือนบนเครื่องนี้', 'Turn reminders on for this phone')}</button><button type="button" class="btn ghost onbnext" data-a="startlater">${L('ไว้ก่อน', 'Not now')}</button>`
    : `<div class="call info">${L('เบราว์เซอร์นี้ยังไม่รองรับการแจ้งเตือน เปิดได้ทีหลังบนมือถือจากหน้า “วันนี้”', 'This browser cannot show reminders; turn them on later from Today on the phone.')}</div>${next(5, 'ต่อไป', 'Next')}`}`;
  } else {
    ls('startDone', 1);
    const kids = children(), nm = kidsNames();
    body = `<div class="onbart">${castHtml(kids.map((k) => k.slug))}</div><div class="kicker" style="text-align:center">${esc(kicker())}</div>
<h1 class="h2" style="text-align:center">${L('พร้อมแล้ว มาทำเล่มแรกกัน', 'All set — let’s make the first book')}</h1>
<p class="lede" style="text-align:center;max-width:none">${S.trips.length ? L('ชั้นหนังสือมีเล่มอยู่แล้ว เปิดดูได้เลย', 'The shelf already has a book — open it.') : L('ชั้นหนังสือยังว่าง เริ่มได้ 2 แบบ', 'The shelf is empty. Two ways to start.')}</p>
<div class="onbways">${S.features.story ? `<a class="onbway main" href="#/import"><span class="e">${ic('doc')}</span><span><b>${L('จากคู่มือทริป (PDF)', 'From the trip manual (PDF)')}</b><small>${L('ผู้ช่วยอ่านคู่มือแล้วทำแผนรายวัน ร้าน และหน้าของเด็กให้ · ราว 15 นาที', 'The helper reads the manual and makes the day plans, places to eat and the kids’ pages · about 15 min')}</small></span>${ic('chev')}</a>` : ''}
${S.trips.some((t) => t.id === 'sakura-hop-2028') ? '' : `<button type="button" class="onbway" data-a="sample"><span class="e">${ic('book')}</span><span><b>${L('ดูเล่มตัวอย่างก่อน', 'Look at a sample book first')}</b><small>${L('ทริปสมมติ 3 วันที่เติมไว้แล้ว ใช้ชื่อลูกของบ้านคุณ ลบได้ทุกเมื่อ', 'A filled-in 3-day trip with your children’s names — delete it any time')}</small></span>${ic('chev')}</button>`}
<button type="button" class="onbway" data-a="newtrip"><span class="e">${ic('log')}</span><span><b>${L('เล่มเปล่า', 'An empty book')}</b><small>${L('ใส่ชื่อทริปกับวันที่ แล้วค่อยเติมเอง · 1 นาที', 'Type the trip name and dates, fill it in as you go · 1 min')}</small></span>${ic('chev')}</button>
<a class="onbway" href="#/"><span class="e">${ic('shelf')}</span><span><b>${L('ไปที่ชั้นหนังสือ', 'Go to the bookshelf')}</b><small>${S.trips.length ? L(`มี ${S.trips.length} เล่ม`, `${S.trips.length} book${S.trips.length > 1 ? 's' : ''}`) : L('ว่างอยู่', 'Empty for now')}</small></span>${ic('chev')}</a></div>
<ul class="onbsum">${kids.length ? `<li>✓ ${L(`ครอบครัว: ${esc(nm)}`, `Family: ${esc(nm)}`)}</li>` : `<li>○ ${L('ยังไม่ได้ใส่ลูก', 'No children yet')} · <a href="#/start/1">${L('ใส่เลย', 'Add them')}</a></li>`}
<li>${standalone ? '✓ ' + L('เปิดจากหน้าจอโฮมแล้ว', 'On the Home Screen') : '○ ' + L('ยังไม่ได้เพิ่มไว้บนหน้าจอโฮม', 'Not on the Home Screen yet')}</li>
<li>${ls('remind') ? '✓ ' + L('เตือนเปิดอยู่', 'Reminders on') : '○ ' + L('เตือนยังไม่เปิด เปิดได้ที่หน้า “วันนี้”', 'Reminders off — turn them on from Today')}</li>
<li>○ ${L('รหัสญาติ ตั้งหรือแก้ได้ที่ เมนู › ญาติ', 'Relatives’ PIN: set or change it under Menu › Relatives')}</li></ul>`;
  }
  return `<section class="onb">${head}${body}</section>`;
}

/* ---------- privacy and your data (#/privacy): readable before sign-in; the erase box for editors ----------
   The plain-words policy (PDPA): what is kept, where, who else ever sees it, how long, and the rights — each with the button
   that exercises it. The operator comes from /api/brand (OPERATOR_NAME / OPERATOR_EMAIL on the server). */
let eraseTyped = '';
function viewPrivacy() {
  const op = (S && S.operator) || (BRAND && BRAND.operator) || {}, ed = !!(S && isEditor()), app = appName();
  const sec = (th, en, body) => `<section class="pvsec"><h2>${L(th, en)}</h2>${body}</section>`;
  const ul = (rows) => `<ul class="pvl">${rows.map(([th, en]) => `<li>${L(th, en)}</li>`).join('')}</ul>`;
  const who = op.name ? `<p>${L(`ผู้ดูแลระบบนี้คือ <b>${esc(op.name)}</b>`, `This instance is run by <b>${esc(op.name)}</b>`)}${op.email ? ` · <a href="mailto:${esc(op.email)}">${esc(op.email)}</a>` : ''}</p>`
    : `<p class="notice">${L('ยังไม่ได้ระบุชื่อผู้ดูแลระบบ ตั้งได้ในหน้าตั้งค่าของเซิร์ฟเวอร์', 'No operator is named yet — it is set in the server’s settings')}</p>`;
  const erase = !ed ? '' : `<div class="call warn pverase"><span class="lbl">${L('ลบข้อมูลทั้งหมด', 'Delete everything')}</span>
<p>${L(`ลบทุกเล่ม ทุกรูป ทุกเสียง ทุกข้อความ ลูกๆ ญาติ และการเตือน ออกจากเซิร์ฟเวอร์และที่เก็บไฟล์ทันที กู้คืนไม่ได้ (ยกเว้นจากสำเนาที่คุณดาวน์โหลดไว้เอง) เล่มที่มากับแอปจะกลับมาว่างเปล่า`, `Removes every book, photo, voice clip and word, the children, the relatives’ groups and the reminders from the server and the file store at once. It cannot be undone (except from a copy you downloaded yourself). The books that come with the app return empty.`)}</p>
<label class="vgl">${L(`พิมพ์ชื่อแอป “${esc(app)}” เพื่อยืนยัน`, `Type the app’s name, “${esc(app)}”, to confirm`)}<input id="erasetxt" class="field" value="${esc(eraseTyped)}" autocomplete="off" data-draft="erase"></label>
<p id="erasemsg" class="label"></p>
<button type="button" class="btn danger" data-a="erase" ${eraseTyped.trim() === app ? '' : 'disabled'}>${L('ลบข้อมูลทั้งหมดของครอบครัวนี้', 'Delete all of this family’s data')}</button></div>`;
  return `<article class="privacy"><div class="part">${L('ความเป็นส่วนตัว', 'Privacy')}</div><h1 class="h2">${L('ความเป็นส่วนตัวและข้อมูลของคุณ', 'Privacy and your data')}</h1>
<p class="lede">${L(`${esc(app)} เป็นสมุดความทรงจำส่วนตัวของครอบครัวเดียว ทำงานบนเซิร์ฟเวอร์ของครอบครัวนั้นเอง ไม่มีโฆษณา ไม่มีการติดตาม และไม่ขายข้อมูลใครทั้งสิ้น`, `${app} is one family’s private memory book, running on that family’s own server. No ads, no tracking, and nobody’s data is ever sold.`)}</p>
${sec('ใครดูแลข้อมูล', 'Who looks after the data', who + `<p>${L('พ่อแม่ที่ถือรหัสครอบครัวเป็นคนตัดสินใจว่าจะบันทึกอะไร ใครเห็น และจะลบเมื่อไร ข้อมูลของเด็กถูกบันทึกโดยผู้ปกครองของเด็กเท่านั้น', 'The parents who hold the family PIN decide what is recorded, who sees it and when it is deleted. Children’s data is entered only by their own parents or guardians.')}</p>`)}
${sec('เก็บอะไรบ้าง', 'What is kept', ul([
  ['ชื่อเล่น เดือนและปีเกิดของลูก และตัวการ์ตูนที่เลือก', 'The children’s nicknames, month and year of birth, and the characters chosen for them'],
  ['รูป เสียง และภาพวาดที่พ่อแม่อัปโหลด (ตำแหน่ง GPS และข้อมูลกล้องถูกลบออกก่อนเก็บ)', 'Photos, voice clips and drawings the parents upload (GPS and camera data are stripped before storing)'],
  ['ข้อความที่พิมพ์: คำพูดเด็ก โน้ต อารมณ์ ครั้งแรก รีวิว ค่าใช้จ่าย จดหมาย', 'Words the parents type: the kids’ quotes, notes, moods, firsts, reviews, spending, letters'],
  ['หัวใจและข้อความสั้นจากญาติ', 'Hearts and short messages from relatives'],
  ['รหัสของญาติ เก็บเป็นค่าที่อ่านคืนไม่ได้ · รหัสครอบครัวไม่ได้เก็บในฐานข้อมูล', 'Relatives’ PINs, stored only as one-way hashes · the family PIN is not stored in the database'],
  ['ที่อยู่สำหรับส่งการเตือนของเครื่องที่เปิดเตือน และจำนวนครั้งที่ใช้ผู้ช่วยต่อวัน', 'The push address of each phone that turned reminders on, and how many times a day the helper was used'],
  ['ไม่เก็บ: ตำแหน่งของโทรศัพท์ รายชื่อผู้ติดต่อ ข้อมูลการจอง เลขหนังสือเดินทาง หรือประวัติการใช้งาน', 'Not kept: the phone’s location, contacts, booking details, passport numbers, or usage analytics']]))}
${sec('เก็บไว้ที่ไหน นานแค่ไหน', 'Where, and for how long', ul([
  ['บนเซิร์ฟเวอร์และที่เก็บไฟล์ที่ตั้งขึ้นสำหรับครอบครัวนี้โดยเฉพาะ (Railway) ไม่ปนกับครอบครัวอื่น', 'On a server and a file store set up for this family alone (hosted on Railway), never shared with another family'],
  ['รูปไม่มีลิงก์สาธารณะ เปิดได้เฉพาะคนที่เข้าสู่ระบบหรือถือลิงก์ของญาติ ทุกหน้าสั่งไม่ให้เครื่องมือค้นหาเก็บ', 'Photos have no public link: only someone signed in or holding a relatives’ link can open them; every page tells search engines to stay away'],
  ['เก็บจนกว่าพ่อแม่จะลบ · สำเนาอัตโนมัติเก็บไว้ 30 วัน (รายคืนช่วงมีทริป) และ 90 วัน (รายสัปดาห์)', 'Kept until the parents delete it · automatic backups are kept 30 days (nightly around a trip) and 90 days (weekly)'],
  ['สำเนาในเครื่องของคุณ (สำหรับใช้ตอนไม่มีเน็ต) ถูกล้างเมื่อออกจากระบบ', 'The copy on your own phone (for no-signal days) is cleared when you sign out']]))}
${sec('ใครอื่นเห็นบ้าง', 'Who else ever sees it', ul([
  ['ญาติที่พ่อแม่ให้รหัสหรือลิงก์: เห็นเฉพาะเล่มที่ติ๊กไว้ ดูอย่างเดียว ส่งหัวใจได้', 'Relatives the parents give a PIN or link: only the books ticked for them, read-only, hearts allowed'],
  ['ผู้ช่วย (Anthropic) เฉพาะเมื่อพ่อแม่กดขอ เช่น นิทาน สรุปวัน แปลภาษา: ส่งเฉพาะข้อความ ไม่ส่งรูป ไม่เก็บไว้ฝึกโมเดล', 'The helper (Anthropic), only when a parent presses for it — a story, the day in brief, a translation: words only, never photos, not used to train models'],
  ['“ให้ผู้ช่วยดูรูปวันนี้” เฉพาะเมื่อเปิดใช้และกดเอง: ส่งรูปย่อของวันนั้นครั้งเดียว ไม่เก็บ', '“Look at today’s photos”, only when switched on and pressed: that day’s small thumbnails, once, not stored'],
  ['วาดตัวการ์ตูนจากรูปลูก (OpenAI) เฉพาะเมื่อพ่อแม่อัปโหลด: รูปถูกย่อ ส่งครั้งเดียว และไม่เก็บที่ไหน', 'Drawing a character from a child’s photo (OpenAI), only when a parent uploads one: shrunk, sent once, stored nowhere'],
  ['พยากรณ์อากาศ (Open-Meteo): ส่งเฉพาะพิกัดระดับเมืองของที่พักในแผน ไม่ใช่ตำแหน่งโทรศัพท์', 'The weather forecast (Open-Meteo): only the town-level location of the planned stay, never the phone’s position'],
  ['การเตือน: ผ่านบริการแจ้งเตือนของเครื่อง (Apple, Google) ส่งเฉพาะข้อความจากแผน ไม่มีรูปหรือชื่อ', 'Reminders: through the phone’s own push service (Apple, Google), carrying the plan’s words only, no photos or names']]))}
${sec('คุกกี้', 'Cookies', `<p>${L('ใช้คุกกี้ 1 ตัวสำหรับจำว่าเข้าสู่ระบบแล้ว ไม่มีคุกกี้โฆษณาหรือวิเคราะห์ และไม่มีสคริปต์ของบุคคลที่สาม', 'One cookie remembers that you are signed in. There are no advertising or analytics cookies and no third-party scripts.')}</p>`)}
${sec('สิทธิ์ของคุณ', 'Your rights', `<ul class="pvl">
<li>${L('ดูและแก้ไข: ทุกอย่างแก้ได้ในแอป', 'See and correct: everything can be edited in the app')}</li>
<li>${L('ขอสำเนา: ปุ่ม “สำเนา” บนชั้นหนังสือดาวน์โหลดทุกอย่างเป็นไฟล์เดียว', 'Take a copy: the “backup” button on the shelf downloads everything as one file (data + photos)')}${ed ? ` · <a href="/api/export.zip" download>${L('ดาวน์โหลดตอนนี้', 'Download now')}</a>` : ''}</li>
<li>${L('ถอนความยินยอม: ปิดการเตือนได้ที่หน้า “วันนี้” · ลบญาติออกได้ที่ เมนู › ญาติ', 'Withdraw: turn reminders off from Today · remove a relatives’ group under Menu › Relatives')}</li>
<li>${L('ลบ: ลบรูป ข้อความ หรือทั้งเล่มได้ในแอป หรือลบทุกอย่างด้วยปุ่มด้านล่าง', 'Erase: delete a photo, a note or a whole book in the app, or everything with the button below')}</li>
<li>${L('ร้องเรียน: ติดต่อผู้ดูแลระบบข้างต้น หรือสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)', 'Complain: write to the operator above, or to Thailand’s Personal Data Protection Committee (PDPC)')}</li></ul>`)}
${erase}
<p class="label">${L('ฉบับ 7 พฤศจิกายน 2569', 'Version 7 November 2026')}${S ? '' : ` · <a href="#/">${L('กลับไปหน้าเข้าสู่ระบบ', 'Back to sign-in')}</a>`}</p></article>`;
}

/* ---------- a book from a Trip Operations Manual PDF (#/import, editors) ----------
   The PDF goes to the server once; the server extracts the text, removes private lines and values, asks Claude for the plan and
   the kids' pages, and keeps the result as a draft. The parents read the draft's summary here and press "save as a book".
   imp (sheets.js) holds the page's state: the chosen file, the slug, the running job (polled every 3 s) and the drafts. */
const IMP_STEPS = [['text', /^text /, 'อ่านคู่มือ', 'Reading the manual', 'อ่านคู่มือและตัดบรรทัดที่เป็นข้อมูลส่วนตัวออก', 'Reading the manual and dropping the private lines'],
  ['structure', /^structure:/, 'แผนรายวัน', 'Day plans', 'วางแผนรายวัน จุดแวะ และเส้นทาง', 'Laying out each day, its stops and the legs between them'],
  ['info', /^info:/, 'คู่มือพกพา', 'Pocket guide', 'เบอร์ฉุกเฉิน ที่พัก ราคา ของที่ต้องเตรียม', 'Emergency numbers, stays, prices, what to pack'],
  ['restaurants', /^restaurants:/, 'ร้านอาหาร', 'Places to eat', 'จดร้านอาหารทุกร้านในคู่มือ ทีละย่าน', 'Every place to eat in the manual, area by area'],
  ['kids', /^kids:/, 'หน้าของเด็กๆ', "Kids' pages", 'ภารกิจ เรื่องน่ารู้ และคำถามของแต่ละวัน', "Missions, facts and quizzes for every day"],
  ['extras', /^extras:/, 'สัตว์ คำ และครั้งแรก', 'Animals, words & firsts', 'สัตว์ที่จะได้เจอ คำท้องถิ่น ของอร่อย ครั้งแรกของทริป และแผนที่', 'The animals, local words, tastes, firsts and the map of this trip'],
  ['thai', /^thai /, 'แปลไทย', 'Thai', 'แปลทั้งเล่มเป็นภาษาไทย', 'Translating the whole book into Thai'],
  ['seed', /^seed:/, 'ประกอบเล่ม', 'Binding the book', 'ประกอบเล่มและตรวจข้อมูลส่วนตัวอีกครั้ง', 'Binding the book and scanning it for private data once more']];
const impStepName = (step) => { const k = String(step).split(/[: ]/)[0]; const row = IMP_STEPS.find(([key]) => key === k); return row ? L(row[2], row[3]) : step; };
const impMins = (ms) => { const m = Math.round(ms / 60000); return m < 1 ? L('ไม่ถึงนาที', 'under a minute') : L(`${m} นาที`, `${m} min`); };
function viewImport() {
  if (imp.list === null) { imp.list = 'loading'; impRefresh(); }
  const j = imp.job || { status: 'idle' }, running = j.status === 'running', on = !!S.features.story;
  const log = (j.log || []).map((l) => l.replace(/^\d\d:\d\d:\d\d /, ''));
  const done = new Set(); IMP_STEPS.forEach(([k, re]) => { if (j.status === 'done' || log.some((l) => re.test(l))) done.add(k); });   // a finished job ticks every step
  const at = IMP_STEPS.findIndex(([k]) => !done.has(k));   // the step in progress
  const usd = (c) => (c && typeof c.usd === 'number' ? `≈ $${c.usd.toFixed(2)} (≈ ฿${Math.round(c.usd * 35)})` : L('ยังไม่ทราบราคา', 'cost unknown'));
  const took = (c) => ((c && c.calls) || []).reduce((a, r) => a + (r.s || 0), 0) * 1000;
  const elapsed = running && j.started ? impMins(Date.now() - j.started) : '';
  const logBox = `<details class="impwarn"><summary>${L('รายละเอียดทางเทคนิค', 'Technical details')}</summary><pre class="implog">${log.map(esc).join('\n')}</pre></details>`;
  // the job card: while running it leads the page with a progress bar and the step in hand; done and error are a short banner
  let jobCard = '';
  if (running) {
    const pct = Math.round((done.size / IMP_STEPS.length) * 100);
    jobCard = `<section class="impjob running"><div class="impjobhd"><span class="e">✨</span><div><b>${L('ผู้ช่วยกำลังเขียนเล่ม', 'The helper is writing')} <i>${esc(j.slug || '')}</i></b>
<small>${elapsed ? L(`ผ่านไป ${elapsed}`, `${elapsed} so far`) + ' · ' : ''}${L('ปกติใช้ 5–10 นาที · ปิดหน้านี้ได้ ระบบทำต่อเอง', 'Usually 5–10 min · you can leave this page, the helper carries on')}</small></div></div>
<div class="impbar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.max(4, pct)}%"></i></div>
<ol class="impsteps">${IMP_STEPS.map(([k, , th, en, dth, den], i) => `<li class="${done.has(k) ? 'done' : i === at ? 'now' : ''}"><span>${done.has(k) ? '✓' : i === at ? '…' : i + 1}</span><div>${L(th, en)}${i === at ? `<small>${L(dth, den)}</small>` : ''}</div></li>`).join('')}</ol>${logBox}</section>`;
  } else if (j.status === 'done') {
    jobCard = `<section class="impjob done"><div class="impjobhd"><span class="e">🎉</span><div><b>${L('เล่มพร้อมให้ตรวจแล้ว', 'The draft is ready')} <i>${esc(j.slug || '')}</i></b><small>${L('เลื่อนลงไปดูว่ามีอะไรในเล่ม แล้วค่อยวางบนชั้น', 'Scroll down to see what is inside, then put it on the shelf')}</small></div></div>${logBox}</section>`;
  } else if (j.status === 'error') {
    jobCard = `<section class="impjob error"><div class="impjobhd"><span class="e">😔</span><div><b>${L('ครั้งนี้ไม่สำเร็จ', 'That did not work')} <i>${esc(j.slug || '')}</i></b><small>${esc(impErr(j.error || ''))} · ${L('ส่งใหม่ได้เลย', 'you can send it again')}</small></div></div>${logBox}</section>`;
  }
  const tile = (v, e, th, en) => (v ? `<div class="imptile"><span>${e}</span><b>${v}</b><small>${L(th, en)}</small></div>` : '');
  const draftCard = (d) => {
    const pk = d.peek || {}, c = d.cover || {}, g = Array.isArray(c.gradient) && c.gradient.length >= 2 ? `style="background:linear-gradient(135deg,${c.gradient.map(esc).join(',')})"` : '';
    const when = d.date_from && d.date_to ? ` · ${fmtDay(d.date_from, { day: 'numeric', month: 'short' })} – ${fmtDay(d.date_to, { day: 'numeric', month: 'short', year: 'numeric' })}` : '';
    const calls = (d.cost && d.cost.calls) || [], byStep = new Map();
    for (const r of calls) { const k = impStepName(r.step); const row = byStep.get(k) || { usd: 0, s: 0, n: 0, model: r.model }; row.usd += r.usd || 0; row.s += r.s || 0; row.n++; byStep.set(k, row); }
    const costRows = [...byStep].map(([k, r]) => `<tr><td>${esc(k)}${r.n > 1 ? ` <small>×${r.n}</small>` : ''}</td><td>${esc(String(r.model || '').replace(/^claude-/, '').replace(/-\d+-\d+$/, ''))}</td><td class="n">$${r.usd.toFixed(3)}</td><td class="n">${r.s} s</td></tr>`).join('');
    const warns = (d.report && d.report.warns) || [], todo = (d.report && d.report.todo) || 0;
    return `<article class="impdraft"><div class="impcover" ${g}><span class="e">${esc(c.emoji || '📖')}</span><b>${esc(T(d.title) || d.slug)}</b><small>${d.days} ${L('วัน', 'days')}${when}</small><code>${esc(d.slug)}</code></div>
<div class="impbody">
<div class="impstats">${tile(d.days, '📅', 'วัน', 'days')}${tile(pk.stops, '📍', 'จุดแวะ', 'stops')}${tile(pk.restaurants, '🍽️', 'ร้านอาหาร', 'places to eat')}${tile(pk.stays, '🛏️', 'ที่พัก', 'stays')}${tile(pk.missions, '🛂', 'ภารกิจเด็ก', "kids' missions")}${tile(pk.wild, '🐾', 'สัตว์และเพื่อน', 'animals & friends')}${tile(pk.firsts, '🌟', 'ครั้งแรก', 'firsts')}${tile(pk.words, '💬', 'คำท้องถิ่น', 'local words')}${tile(pk.food, '😋', 'ของอร่อยให้ชิม', 'tastes to try')}${tile(pk.map, '🗺️', 'จุดบนแผนที่', 'map stops')}</div>
${Array.isArray(d.toc) && d.toc.length ? `<details class="imptoc" open><summary>${ic('book')} ${L('สารบัญ', 'Contents')}</summary><ol>${d.toc.slice(0, 20).map((x, i) => `<li><em>${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)}</em><span>${esc(x.e || '')}</span>${esc(T(x.t) || '')}</li>`).join('')}${d.toc.length > 20 ? `<li>… ${d.toc.length - 20} ${L('วันถัดไป', 'more days')}</li>` : ''}</ol></details>` : ''}
<details class="impcost"><summary>💸 ${L('ค่าใช้จ่ายของเล่มนี้ (รายละเอียดทางเทคนิค)', 'This book’s cost (technical details)')} ${usd(d.cost)}${calls.length ? ` · ${impMins(took(d.cost))}` : ''}</summary>${costRows ? `<table><thead><tr><th>${L('ขั้นตอน', 'Step')}</th><th>${L('โมเดล', 'Model')}</th><th class="n">USD</th><th class="n">${L('เวลา', 'Time')}</th></tr></thead><tbody>${costRows}</tbody></table>` : ''}</details>
${warns.length || todo ? `<details class="impwarn"><summary>⚠️ ${L('ข้อควรดูก่อนวางบนชั้น', 'Worth a look before shelving')} <span class="pill">${warns.length + (todo ? 1 : 0)}</span></summary><ul>${todo ? `<li>${L(`มี ${todo} จุดที่ไม่พบในคู่มือ จึงเว้นไว้ว่า "รอเติม" แก้ได้ในแอปทีหลัง`, `${todo} spots were not in the manual and are marked TODO — edit them in the app later`)}</li>` : ''}${warns.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></details>` : `<p class="label">✅ ${L('ไม่มีข้อควรระวัง พร้อมวางบนชั้น', 'Nothing to flag — ready for the shelf')}</p>`}
<div class="row impacts"><button class="btn" data-a="impsave" data-v="${esc(d.id)}">📚 ${L('วางเล่มนี้บนชั้น', 'Put it on the shelf')}</button><button class="btn ghost small" data-a="impdel" data-v="${esc(d.id)}">${L('ทิ้งร่างนี้', 'Discard')}</button></div></div></article>`;
  };
  const list = Array.isArray(imp.list) ? imp.list : [];
  const how = `<div class="imphow"><div><span>1</span><b>${L('เลือกไฟล์ PDF', 'Pick the PDF')}</b><small>${L('คู่มือทริปที่วางแผนไว้', 'The Trip Operations Manual')}</small></div><div><span>2</span><b>${L('ผู้ช่วยเขียนเล่ม', 'The helper writes')}</b><small>${L('ราว 5–10 นาที หน้านี้อัปเดตเอง', 'About 5–10 min, this page updates itself')}</small></div><div><span>3</span><b>${L('ตรวจแล้ววางบนชั้น', 'Check and shelve')}</b><small>${L('ได้ร่างให้ดูก่อน ค่อยบันทึก', 'A draft to look at before you keep it')}</small></div></div>`;
  const form = running ? '' : `<div class="impcard">
<label class="impdrop ${imp.file ? 'has' : ''} ${!on ? 'off' : ''}"><input id="impfile" type="file" accept="application/pdf,.pdf" ${!on ? 'disabled' : ''}>
<span class="e">${imp.file ? '📘' : '📄'}</span><b>${imp.file ? esc(imp.file.name) : L('แตะเพื่อเลือกไฟล์ PDF', 'Tap to choose the PDF')}</b><small>${imp.file ? `${(imp.file.size / 1048576).toFixed(1)} MB · ${L('แตะอีกครั้งเพื่อเปลี่ยน', 'tap again to change')}` : L('ไม่เกิน 25 MB', 'Up to 25 MB')}</small></label>
<label class="label impslug">${L('ชื่อสั้นของเล่ม (ใช้ในลิงก์)', 'Short name for the link')} <small>${L('อักษรอังกฤษตัวเล็ก ตัวเลข และ -', 'small letters, digits and -')}</small><input id="impslug" class="field" maxlength="60" value="${esc(imp.slug || '')}" placeholder="tokyo-2027"></label>
<button class="btn impgo" data-a="impstart" ${!on ? 'disabled' : ''}>✨ ${L('ให้ผู้ช่วยเขียนเล่ม', 'Ask the helper to write the book')}</button>
${imp.err ? `<div class="err" style="color:var(--accent2)">${esc(imp.err)}</div>` : ''}
</div>`;
  return `<div class="part">${L('เล่มใหม่', 'New book')}</div>
${running ? jobCard : `<section class="hero imphero"><div><div class="kicker">${L('จากคู่มือทริป สู่สมุดความทรงจำ', 'From the trip manual to a memory book')}</div><h2>${L('ทำเล่มใหม่จาก PDF', 'A new book from a PDF')}</h2>
<p class="kids">${L(`ส่งคู่มือทริปมา แล้วผู้ช่วยจะเขียนเล่มให้ครบ: แผนรายวัน คู่มือพกพา ร้านอาหาร และหน้าของ${esc(kidsNames() || 'เด็กๆ')} สองภาษา`, `Send the trip manual and the helper writes the whole book: day plans, pocket guide, places to eat, and ${kidsNames() ? esc(kidsNames()) + "'s" : "the kids'"} pages in both languages.`)}</p></div>${castHtml(kidArtSlugs())}</section>`}
${!on ? `<div class="notice">${L('ผู้ช่วยยังไม่ได้เปิดใช้สำหรับครอบครัวนี้ — ให้ผู้ดูแลแอปเปิดก่อน จึงจะใช้หน้านี้ได้', 'Set ANTHROPIC_API_KEY on the server to use this page')}</div>` : ''}
${running ? `<p class="impnote">${L('ส่งได้ทีละเล่ม รอเล่มนี้เสร็จก่อนนะ', 'One book at a time — wait for this one to finish')}</p>` : `<div class="impmain">${form}${how}</div>`}
${!running ? jobCard : ''}
${list.length ? `<h2 class="h3 imph3">${L('ร่างที่รอขึ้นชั้น', 'Drafts waiting for the shelf')}</h2>${list.map(draftCard).join('')}` : ''}
<p class="impnote">🔒 ${L('ไฟล์ PDF ถูกอ่านแล้วลบทันทีบนเซิร์ฟเวอร์ · บรรทัดที่มีเลขจอง ตั๋ว หนังสือเดินทาง วันเกิด หรือยอดเงินบาท ถูกตัดออกก่อนส่งให้ผู้ช่วย · รูปใน PDF ไม่ถูกส่ง · เล่มถูกตรวจอีกครั้งก่อนเก็บ', 'The PDF is read and deleted on the server at once · lines with booking numbers, e-tickets, passports, birthdays or baht amounts are removed before anything reaches the helper · images are never sent · the book is scanned again before it is kept')}<br>${L('เล่มที่นำเข้ายังไม่มีภาพวาดประจำวัน ใช้สีของเล่มและไกด์กีกี้กับรูไปก่อน', 'An imported book has no drawings of its own yet: its colours and the guides Kiki and Roo stand in.')}</p>`;
}
const impErr = (e) => ({ limit: L('ผู้ช่วยใช้ครบโควตาวันนี้แล้ว ลองพรุ่งนี้', "Today's helper allowance is used up — try tomorrow"), privacy: L('พบข้อมูลส่วนตัวในเล่ม จึงไม่บันทึก', 'Private data found in the book — not kept'), text: L('อ่านข้อความจาก PDF ไม่ได้ (สแกนเป็นรูป?)', 'No text in the PDF (a scanned image?)'), pdftotext: L('เซิร์ฟเวอร์นี้ยังอ่าน PDF ไม่ได้ แจ้งผู้ดูแลระบบ', 'This server cannot read PDFs yet — tell the operator'), refusal: L('ผู้ช่วยเขียนเล่มนี้ไม่ได้', 'The helper could not write this book'), json: L('คำตอบอ่านไม่ได้ ลองอีกครั้ง', 'Unreadable answer — try again') }[e] || e);
function viewViewers() {
  if (vg === null) { vg = 'loading'; api('GET', '/api/b/viewers').then((r) => { vg = r.groups; safeRender(); }, () => { vg = []; safeRender(); }); }
  const trips = S.trips, list = Array.isArray(vg) ? vg : [];
  const f = vgForm || (vgForm = { id: '', name: '', trips: trips.map((t) => t.id), link: true });
  const tname = (id) => { const t = trips.find((x) => x.id === id); return t ? T(t.title).split(' · ')[0] : id; };
  const card = (g) => `<div class="vgcard"><div class="vghd"><b>👪 ${esc(g.name)}</b><span class="label">${g.pin ? `🔢 ${L('มีรหัส', 'PIN set')}` : ''}${g.pin && g.link ? ' · ' : ''}${g.link ? `🔗 ${L('มีลิงก์', 'link')}` : ''}</span></div>
<div class="vgtrips">${g.trips.length ? g.trips.map((x) => `<span class="pill">${ic('book')} ${esc(tname(x))}</span>`).join('') : `<span class="label">${L('ยังไม่เห็นเล่มไหนเลย', 'No books yet')}</span>`}</div>
<div class="row">${g.link ? `<button class="btn small" data-a="vgshare" data-v="${esc(g.link)}" data-n="${esc(g.name)}">${navigator.share ? '📤 ' + L('ส่งลิงก์', 'Send the link') : '📋 ' + L('คัดลอกลิงก์', 'Copy the link')}</button>` : ''}
<button class="btn ghost small" data-a="vgedit" data-v="${esc(g.id)}">✏️ ${L('แก้ไข', 'Edit')}</button>
<button class="mini" data-a="vgdel" data-v="${esc(g.id)}">${L('ลบกลุ่ม', 'Delete group')}</button></div></div>`;
  return `<div class="part">${L('ญาติที่ดูได้', 'Who can see the books')}</div><h1 class="h2"><img class="h1pic" src="/art/hub/relatives.webp" alt=""> ${L('กลุ่มญาติ', 'Family groups')}</h1>
<p class="lede">${L('แต่ละกลุ่มมีรหัสหรือลิงก์ของตัวเอง เห็นเฉพาะเล่มที่ติ๊ก ดูอย่างเดียว ส่งหัวใจได้ · ลบกลุ่ม = ออกจากระบบทันที', 'Each group gets its own PIN or link and sees only the books ticked for it — read-only, hearts allowed · delete a group and its phones are signed out')}</p>
${vgJust ? `<div class="call pick vgjust"><span>🔢 ${L('รหัสของกลุ่ม', 'PIN for')} <b>${esc(vgJust.name)}</b></span><span class="vgpin">${esc(vgJust.pin)}</span><small>${L('จดไว้ส่งให้ญาติตอนนี้ — แอปจะไม่แสดงรหัสนี้อีก', 'Note it down and send it now — the app will not show it again')}</small></div>` : ''}
${vg === 'loading' ? `<div class="empty">${L('กำลังโหลด…', 'Loading…')}</div>` : list.length ? `<div class="vglist">${list.map(card).join('')}</div>` : `<div class="empty">${L('ยังไม่มีกลุ่ม — สร้างกลุ่มแรกด้านล่าง', 'No groups yet — make the first one below')}</div>`}
<section class="blk vgform"><h3>${f.id ? `✏️ ${L('แก้ไขกลุ่ม', 'Edit group')}` : `＋ ${L('สร้างกลุ่มใหม่', 'New group')}`}</h3>
<label class="vgl">${L('ชื่อกลุ่ม', 'Group name')}<input id="vgname" class="field" maxlength="40" data-draft="vg:name" value="${esc(drafts['vg:name'] ?? f.name)}" placeholder="${L('เช่น ฝั่งคุณยาย', 'e.g. Grandma’s side')}"></label>
<label class="vgl">${f.id ? L('รหัสใหม่ (ไม่ใส่ = ใช้รหัสเดิม)', 'New PIN (leave empty to keep it)') : L('รหัส 6–12 ตัวเลข (ไม่ใส่ = ญาติเข้าทางลิงก์อย่างเดียว)', 'PIN, 6–12 digits (empty = link only)')}<input id="vgpin" class="field" inputmode="numeric" maxlength="12" autocomplete="off" data-draft="vg:pin" value="${esc(drafts['vg:pin'] || '')}"></label>
<div class="vgl">${L('เห็นสมุดเล่มไหน', 'Books this group sees')}<div class="vgchecks">${trips.map((t) => `<label class="vgck"><input type="checkbox" data-a="vgtrip" data-v="${esc(t.id)}"${f.trips.includes(t.id) ? ' checked' : ''}> ${esc(T(t.title).split(' · ')[0])}</label>`).join('')}</div></div>
<label class="vgck"><input type="checkbox" data-a="vglink"${f.link ? ' checked' : ''}> 🔗 ${L('มีลิงก์ให้กดเข้าได้เลย (ไม่ต้องพิมพ์รหัส)', 'A link that opens without typing a PIN')}</label>
${f.id && f.hasLink ? `<label class="vgck"><input type="checkbox" data-a="vgnewlink"${f.newLink ? ' checked' : ''}> ♻️ ${L('เปลี่ยนเป็นลิงก์ใหม่ (ลิงก์เดิมจะใช้ไม่ได้)', 'Make a new link (the old one stops working)')}</label>` : ''}
<div class="row" style="margin-top:10px"><button class="btn" data-a="vgsave">${f.id ? L('บันทึก', 'Save') : L('สร้างกลุ่ม', 'Make the group')}</button>${f.id ? `<button class="btn ghost" data-a="vgcancel">${L('ยกเลิก', 'Cancel')}</button>` : ''}<span class="label" id="vgmsg"></span></div></section>`;
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
  return `<div class="part">${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</div><h1 class="h2">${L('อะไรที่ครอบครัวเราชอบ', 'What works for our family')}</h1>
<p class="lede">${L('รีวิวที่พัก ร้าน และสถานที่จากทุกเล่ม — ให้ดาวจากหน้าบันทึก แล้วใช้วางแผนทริปหน้า', 'Stays, food and places from every trip — rate them on each day’s Record page, then plan the next trip from here')}</p>
${likesBlock(rs.length)}
${rs.length ? `<div class="nbsum"><div><h4>👍 ${L('สิ่งที่ชอบ', 'What worked')}</h4><div class="row">${good.map(chip).join('') || `<span class="label">${L('ยังไม่มี', 'nothing yet')}</span>`}</div></div>
<div><h4>👎 ${L('ครั้งหน้าเลี่ยง', 'Avoid next time')}</h4><div class="row">${bad.map(chip).join('') || `<span class="label">${L('ยังไม่มี', 'nothing yet')}</span>`}</div></div></div>
${sections}
${lessons.length ? `<div class="part">📝 ${L('บทเรียนสำหรับทริปหน้า', 'Lessons for next time')}</div><ul class="nblist">${lessons.map(row).join('')}</ul>` : ''}
<div class="row noprint" style="margin:20px 0"><button class="btn small" data-a="copynotebook">📋 ${L('คัดลอกเป็นข้อความ (เอาไปวางแผนทริปหน้า)', 'Copy as text (for planning the next trip)')}</button></div>`
    : isEditor() && live ? emptyCard(live, L('ยังไม่มีรีวิว', 'No reviews yet'), L('ให้ดาวที่พักและร้านจากหน้าบันทึก แล้วมาอ่านรวมที่นี่ก่อนวางแผนทริปหน้า', 'Star the stays and meals on the record page, then read them all here before planning the next trip'), [`#/t/${esc(live.id)}/log/${Math.max(0, dayNow(live))}#notebook`, L('เริ่มให้ดาวของวันนี้', 'Start with today’s')])
    : `<div class="empty">${L('ยังไม่มีรีวิว — ', 'No reviews yet — ')}${isEditor() && live ? '' : L('พ่อแม่จะให้ดาวระหว่างทริป', 'the grown-ups rate things during the trip')}</div>`}`;
}

/* ---------- firsts page (everyone) ---------- */
/* ---------- every place to eat on the trip (seed info.restaurants = the manual's "Where to eat"; older books: what the day plans name) ---------- */
let eatQ = '', eatKind = -1, eatPick = false, eatTrip = '';
let ppMapDay = null;   // the day a grown-up picked under the passport map {t, d}
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
// Eat, one day at a time: each meal's pick + backup, then what else fits that meal nearby, then every place near the day's route and bed.
// "Near a day" = the area names that day (AU: "Jervis Bay · Days 2–4"), the area of the day's bed (HK: "Studio City — …"), or an area holding a place the plan names for the day.
const eatDays = (s) => { const out = new Set(); String(s || '').replace(/Days?\s+(\d+(?:\s*(?:–|-|,|and|or|to)\s*\d+)*)/gi, (_, g) => { g.split(/\s*(?:,|and|or)\s*/).forEach((x) => { const m = x.match(/(\d+)\s*(?:–|-|to)\s*(\d+)/); if (m) for (let k = +m[1]; k <= +m[2]; k++) out.add(k - 1); else if (+x) out.add(+x - 1); }); }); return out; };
const eatMeal = (s) => (/breakfast|morning/i.test(s) ? 'bf' : /lunch|picnic/i.test(s) ? 'lu' : /dinner|evening/i.test(s) ? 'di' : /treat|snack|ice|dessert|afternoon/i.test(s) ? 'sn' : '');
function eatForDay(t, i) {
  const r = eatData(t), sleep = ((t.days[i].sleep || {}).en || T(t.days[i].sleep) || '').toLowerCase(), meals = {}, near = [];
  r.groups.forEach((g) => {
    let hit = false;
    g.items.forEach((x) => {
      const ms = (x.pick || []).filter((k) => eatDays(k.en).has(i)).map((k) => eatMeal(k.en));
      if (!ms.length && x.note && eatDays(x.note.en).has(i) && eatMeal(x.note.en)) ms.push(eatMeal(x.note.en));
      if (ms.length || (x.pick || []).some((k) => eatDays(k.en).has(i))) hit = true;
      [...new Set(ms.filter(Boolean))].forEach((m) => (meals[m] = meals[m] || []).push({ g, x }));
    });
    const area = (g.area || {}).en || T(g.area), ds = eatDays(area), key = area.split(' — ')[0].toLowerCase();
    if (ds.size ? ds.has(i) : hit || (sleep && key.length > 3 && sleep.includes(key))) near.push(g);
  });
  // the day's real radius: an area tied to "Days 11–16" holds sixty places, but the day passes a handful of them — the ones whose
  // address or name is in the day's own words (planned stops, drive legs, the bed, the timeline) are "hot"; the rest fold away
  // "hot" = on the day's route (its stops, drive legs and meal picks); the bed's own neighbourhood counts as reachable but folds
  // away, so a resort with thirty in-house restaurants does not open on every night slept there
  const bedTxt = dayText(t, i, true), hot = new Set(), bed = new Set();
  const txt = placeWords(bedTxt).reduce((s, w) => s.split(w).join(' '), dayText(t, i));   // the first leg leaves the hotel every day: its words belong to the bed tier, not the route
  near.forEach((g) => {
    const gw = placeWords(((g.area || {}).en || T(g.area) || '').split(' — ')[0].split(' · ')[0]);
    const gIn = (s) => gw.length > 0 && gw.every((w) => s.includes(w));
    g.items.forEach((x) => {
      const lw = placeWords(`${x.where || ''} ${String(x.q || '').replace(x.name || '', '')}`);   // the place's own location words (address, mall, suburb)
      const inTxt = (s) => (lw.length ? lw.some((w) => s.includes(w)) : gIn(s));   // no address of its own (a shop inside the resort) → it is where its area is
      if (inTxt(txt)) hot.add(x); else if (inTxt(bedTxt)) bed.add(x);
    });
  });
  return { r, meals, near, hot, bed };
}
const PLACE_STOP = new Set(['sydney', 'hong', 'kong', 'macau', 'macao', 'cotai', 'taipa', 'central', 'hotel', 'resort', 'street', 'road', 'station', 'market', 'beach', 'park', 'house', 'restaurant', 'kitchen', 'cafe', 'café', 'shop', 'shops', 'food', 'court', 'level', 'floor', 'ground', 'lobby', 'wing', 'north', 'south', 'east', 'west', 'town', 'city', 'village', 'the', 'and', 'near', 'walk', 'taxi', 'ferry', 'train', 'light', 'rail', 'from', 'into', 'back', 'home', 'with', 'wharf', 'point', 'tower', 'plaza', 'mall', 'centre', 'center', 'square', 'garden', 'gardens', 'island', 'harbour', 'bakery', 'noodles', 'noodle', 'dumplings', 'roast', 'tea', 'australia']);
const placeWords = (s) => String(s || '').toLowerCase().split(/[^a-z0-9'’]+/).filter((w) => w.length >= 4 && !PLACE_STOP.has(w));
// the points the day actually touches: planned stops (with their map addresses), drive legs, the meal picks and the bed —
// not the title or the timeline prose, which name whole regions and would pull every place in them back in
function dayText(t, i, bedOnly) {
  const d = t.days[i], pl = d.plan || {}, s = (x) => (x == null ? '' : typeof x === 'string' ? x : [x.en, x.name, x.key, x.q, x.from, x.to, x.addr].filter((v) => typeof v === 'string').join(' '));
  return (bedOnly ? [d.sleep, pl.stay] : [...(d.planned || []), ...(pl.legs || []), ...(pl.picks || [])]).map(s).join(' ').toLowerCase();
}
const eatSame = (a, b) => { a = (a || '').toLowerCase(); b = (b || '').toLowerCase(); return !!a && !!b && (a === b || a.startsWith(b) || b.startsWith(a)); };
const goA = (q, label) => extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`, ic('route') + (label ? ' ' + label : `<span class="vh">${L('นำทาง', 'Go')}</span>`), label ? 'go' : 'go sq');
function viewEatDay(t, i) {
  const d = t.days[i], ps = (d.plan || {}).picks || [], { r, meals, near, hot, bed } = eatForDay(t, i), all = eatCount(t), now = dayNow(t);
  const KN = { bf: L('มื้อเช้า', 'Breakfast'), lu: L('มื้อกลางวัน', 'Lunch'), di: L('มื้อเย็น', 'Dinner'), sn: L('ของว่าง', 'Snack') };
  const info = (name) => { for (const g of r.groups) for (const x of g.items) if (eatSame(x.name, name)) return x; return null; };
  const facts = (x) => (x ? [T(x.pr) && `<span class="pr">${esc(T(x.pr))}</span>`, T(x.hours) && `<span class="hr">${esc(T(x.hours))}</span>`].filter(Boolean).join('') : '');
  const row = (x, cls) => `<li class="erow${cls ? ' ' + cls : ''}"><div><b>${mapA(x.q || x.name, esc(x.name))}</b>${T(x.tag) ? ` <span class="etag">${esc(T(x.tag))}</span>` : ''}${T(x.what) ? `<small>${esc(T(x.what))}</small>` : ''}${facts(x) ? `<span class="echips">${facts(x)}</span>` : ''}</div>${goA(x.q || x.name)}</li>`;
  const meal = (p) => {
    const k = mealKind(p), [lbl, ...w] = T(p.meal).split(' · '), x = info(p.name), bx = p.alt && info(p.alt.name);
    const alsoAll = (meals[k] || []).map((m) => m.x).filter((x2, n, arr) => arr.indexOf(x2) === n && !eatSame(x2.name, p.name) && !(p.alt && eatSame(x2.name, p.alt.name)));
    const alsoHot = alsoAll.filter((x2) => hot.has(x2)), also = alsoHot.length ? alsoHot : alsoAll.slice(0, 4), alsoMore = alsoAll.length - also.length;   // on the day's route first; the rest sit in the areas below
    return `<section class="emeal mk-${k}"><h3 class="eh3"><span class="mtag">${esc(lbl)}</span>${w.length ? `<span class="mtime">${esc(w.join(' · '))}</span>` : ''}</h3>
<div class="epick"><span class="elbl">★ ${L('ร้านแนะนำ', 'Our pick')}</span><div class="et"><b class="en">${mapA(p.q || p.name, esc(p.name))}</b>${goA(p.q || p.name, L('นำทาง', 'Go'))}</div>${T(p.what) ? `<p>${esc(T(p.what))}</p>` : x && T(x.what) ? `<p>${esc(T(x.what))}</p>` : ''}${facts(x) || T(p.pr) ? `<span class="echips">${facts(x) || `<span class="pr">${esc(T(p.pr))}</span>`}</span>` : ''}</div>
${p.alt ? `<ul class="erows"><li class="erow bk"><div><span class="elbl">${L('ร้านสำรอง', 'Backup')}</span><b>${p.alt.q || bx ? mapA(p.alt.q || p.alt.name, esc(p.alt.name)) : esc(p.alt.name)}</b>${T(p.alt.what) ? `<small>${esc(T(p.alt.what))}</small>` : bx && T(bx.what) ? `<small>${esc(T(bx.what))}</small>` : ''}${facts(bx) ? `<span class="echips">${facts(bx)}</span>` : ''}</div>${p.alt.q || bx ? goA(p.alt.q || p.alt.name) : ''}</li></ul>` : ''}
${also.length ? `<div class="ealso"><span class="elbl">${L('กินมื้อนี้ได้อีก', 'Also good for this meal')}</span><ul class="erows">${also.map((x2) => row(x2)).join('')}</ul>${alsoMore > 0 ? `<small class="emoren">${L(`อีก ${alsoMore} ร้านอยู่ในย่านด้านล่าง`, `${alsoMore} more under the areas below`)}</small>` : ''}</div>` : ''}</section>`;
  };
  const seen = new Set(ps.flatMap((p) => [p.name, p.alt && p.alt.name]).filter(Boolean));
  // areas within reach: the places on today's route open first; an area's other places fold under "N more"; areas with nothing on
  // the route sit together under one line at the end — so a Sydney day shows the handful it passes, not all sixty
  const kindTag = (g) => (g.kind !== undefined && (r.kinds || [])[g.kind] ? `<small class="ek">${esc(T(r.kinds[g.kind]))}</small>` : '');
  const grp = (g, xs, inner, tag) => `<details class="enear"><summary><span class="ea"><b>${esc(T(g.area))}</b>${tag ? `<small class="ek bedtag">🛏 ${L('ที่พักคืนนี้', 'tonight’s bed')}</small>` : ''}${kindTag(g)}</span><span class="n">${xs.length}</span>${ic('chev')}</summary><ul class="erows">${xs.map((x) => row(x)).join('')}</ul>${inner || ''}</details>`;
  const parts = near.map((g) => { const xs = g.items.filter((x) => ![...seen].some((n) => eatSame(n, x.name))), hotXs = xs.filter((x) => hot.has(x)), bedXs = hotXs.length ? [] : xs.filter((x) => bed.has(x)); const top = hotXs.length ? hotXs : bedXs; return { g, xs, top, isBed: !hotXs.length && bedXs.length > 0, rest: xs.filter((x) => !top.includes(x)) }; }).filter((p) => p.xs.length);
  const onHtml = parts.filter((p) => p.top.length).map((p) => grp(p.g, p.top, p.rest.length ? `<details class="emore"><summary>${L(`อีก ${p.rest.length} ร้านในย่านนี้`, `${p.rest.length} more in this area`)}</summary><ul class="erows">${p.rest.map((x) => row(x)).join('')}</ul></details>` : '', p.isBed)).join('');
  const far = parts.filter((p) => !p.top.length), farN = far.reduce((a, p) => a + p.xs.length, 0);
  const farHtml = far.length ? `<details class="enearfar"><summary>${L(`ย่านอื่นที่ไปถึงได้วันนี้ · ${farN} ร้าน`, `Other areas within today’s reach · ${farN} places`)}${ic('chev')}</summary><div class="enears">${far.map((p) => grp(p.g, p.xs)).join('')}</div></details>` : '';
  const nearHtml = onHtml || farHtml ? `${onHtml ? `<h3 class="gh">${L('ร้านตรงเส้นทางและที่พักวันนี้', 'On today’s route and by the bed')}</h3><div class="enears">${onHtml}</div>` : `<h3 class="gh">${L('ร้านใกล้เส้นทางและที่พักวันนี้', 'More near today’s route and bed')}</h3>`}${farHtml}` : '';
  const allBtn = (cls) => `<a class="btn ${cls}" href="#/t/${esc(t.id)}/eat/all">${ic('eat')} ${L(`ร้านทั้งหมด ${all} ร้าน · ค้นหา`, `All ${all} places · search`)} ›</a>`;
  return `<section class="eatpage eatday"><div class="part">${L('กินที่ไหนดี · ทีละวัน', 'Where to eat · day by day')}</div>
<div class="daystrip" role="tablist" aria-label="${L('เลือกวัน', 'Pick a day')}">${t.days.map((x, n) => `<a href="#/t/${esc(t.id)}/eat/d/${n}" aria-current="${n === i}">${n === now ? `<span class="today">${L('วันนี้', 'Today')}</span>` : ''}<b>${String(n + 1).padStart(2, '0')}</b><small>${esc(fmtDay(x.date, { day: 'numeric', month: 'short' }))}</small></a>`).join('')}</div>
<header class="edhead">${artImg(t, i, 'mart')}<div><span class="mdn">${L('วันที่', 'Day')} ${i + 1}${i === now ? ` · ${L('วันนี้', 'Today')}` : ''}${d.date ? ` · ${esc(fmtDay(d.date))}` : ''}</span><h1 class="h2">${esc(T(d.title))}</h1>${T(d.sleep) && !isHome(d.sleep) ? `<span class="label">${ic('stays')} ${esc(T(d.sleep))}</span>` : ''}</div></header>
${ps.length ? `<div class="emeals">${ps.map(meal).join('')}</div>` : `<p class="empty">${L('วันนี้ยังไม่มีร้านแนะนำในแผน', 'No meal picks in the plan for this day')}</p>`}
${nearHtml}
<div class="row eatall">${i > 0 ? `<a class="btn ghost" href="#/t/${esc(t.id)}/eat/d/${i - 1}">‹ ${L('วันก่อน', 'Day')} ${i}</a>` : ''}${i < t.days.length - 1 ? `<a class="btn ghost" href="#/t/${esc(t.id)}/eat/d/${i + 1}">${L('วันถัดไป', 'Day')} ${i + 2} ›</a>` : ''}</div>
${allBtn('wide')}</section>`;
}
function viewEat(t) {
  if (eatTrip !== t.id) { eatTrip = t.id; eatQ = ''; eatKind = -1; eatPick = false; }   // filters belong to one book
  const r = eatData(t), all = eatCount(t), kinds = r.kinds || [];
  // one entry, laid out like the manual's "Where to eat" page: name · pin · address · type tag, a line, then price + when
  // one place as a small card: name + type on top, where it is, a line about it, then price / when + directions at the foot
  const card = (g, x) => `<li class="eatc${(x.pick || []).length ? ' pk' : ''}" data-s="${esc(eatText(g, x))}" data-k="${eatKindOf(g, x)}" data-p="${(x.pick || []).length ? 1 : 0}"${eatShow(g, x) ? '' : ' hidden'}>
${(x.pick || []).length ? `<div class="epk">${x.pick.map((k) => `<span>★ ${esc(T(k))}</span>`).join('')}</div>` : ''}
<div class="et"><b class="en">${mapA(x.q || x.name, esc(x.name))}</b>${extA(mapsUrl(x.q || x.name), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}${T(x.tag) ? `<span class="etag t-${esc(x.tk || 'x')}">${esc(T(x.tag))}</span>` : ''}${x.tour ? `<span class="etag tour">${L('สายนักท่องเที่ยว', 'Tourist spot')}</span>` : ''}</div>
${x.zh || x.where ? `<div class="ew">${x.zh ? `<span class="zh">${esc(x.zh)}</span>` : ''}${x.where ? `<span>${esc(x.where)}</span>` : ''}</div>` : ''}
${T(x.what) ? `<p class="ed">${esc(T(x.what))}</p>` : ''}${T(x.why) ? `<p class="why"><b>${L('เหมาะกับเด็ก', 'For the kids')}</b> ${esc(T(x.why))}</p>` : ''}
<div class="ef"><span class="echips">${T(x.pr) ? `<span class="pr">${esc(T(x.pr))}</span>` : ''}${T(x.note) ? `<span class="nt">${esc(T(x.note))}</span>` : ''}${T(x.hours) ? `<span class="hr">${esc(T(x.hours))}</span>` : ''}</span>${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || x.name)}`, ic('route') + ' ' + L('นำทาง', 'Go'), 'go')}</div></li>`;
  const shown = r.groups.reduce((n, g) => n + g.items.filter((x) => eatShow(g, x)).length, 0);
  return `<section class="eatpage"><div class="part">${L('ร้านอาหารทั้งหมด', 'All places to eat')} <span class="label">· ${esc(T(t.title))}</span></div>

${r.lede ? `<p class="lede">${esc(T(r.lede))}</p>` : ''}
<div class="eatbar"><input id="eatq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(eatQ)}" placeholder="${L('ค้นชื่อร้าน ย่าน หรือประเภท เช่น ซีฟู้ด พาย คาเฟ่…', 'Search a name, town or type — seafood, pies, café…')}" aria-label="${L('ค้นร้าน', 'Search')}">
<div class="row chips" role="group"><button class="chip" data-a="eatk" data-v="-1" aria-pressed="${eatKind < 0}">${L('ทั้งหมด', 'All')}</button>${kinds.map((k, i) => `<button class="chip" data-a="eatk" data-v="${i}" aria-pressed="${eatKind === i}">${esc(T(k))}</button>`).join('')}<button class="chip" data-a="eatpick" aria-pressed="${eatPick}">★ ${L('ร้านแนะนำในแผน', 'Picks in the plan')}</button></div>
<p class="label" id="eatn">${L(`แสดง ${shown} จาก ${all} ร้าน`, `Showing ${shown} of ${all}`)}</p></div>
${r.groups.map((g) => `<section class="eatg"${g.items.some((x) => eatShow(g, x)) ? '' : ' hidden'}><h3>${esc(T(g.area))}${kinds[g.kind] && g.kind !== undefined && g.items.every((x) => x.kind === undefined) ? ` <span class="label">· ${esc(T(kinds[g.kind]))}</span>` : ''}</h3>${T(g.note) ? `<p class="label gnote">${esc(T(g.note))}</p>` : ''}<ul class="eatl">${g.items.map((x) => card(g, x)).join('')}</ul></section>`).join('')}
<p class="empty" id="eatnone"${shown ? ' hidden' : ''}>${L('ไม่พบร้านที่ตรงกับคำค้น', 'No place matches')}</p>
<p class="label">${L('จากคู่มือ · ราคาและเวลาเปิดเช็กซ้ำก่อนไป · แตะหมุดเพื่อนำทาง', 'From the manual · re-check prices and hours · tap a name for Google Maps')}</p></section>`;
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
    return `<div class="first${who.length ? ' got' : ''}"><span class="e">${esc(f.emoji)}</span><span class="t">${esc(T(f.label))}</span><span class="kids">${children().map((c) => kidBadge(c.slug, !who.includes(c.slug))).join('')}</span></div>`;
  }).join('');
  const custom = got.filter((e) => e.first_key === 'custom').map((e) => `<div class="first got"><span class="e">⭐</span><span class="t">${esc(e.text)}</span><span class="kids">${kidBadge(e.child)}</span></div>`).join('');
  return `<div class="part">${esc(T(t.title))}</div><h1 class="h2">${L(`ครั้งแรกของ${esc(kidsNames() || 'ลูก')}`, `${kidsNames() ? esc(kidsNames()) + "'s" : "The kids'"} firsts`)}</h1>
<p class="lede">${L('ติ๊กได้ในหน้า "บันทึก" ของแต่ละวัน', 'Tick them on each day’s Record page')}</p>
<div class="firsts" style="margin-top:14px">${cat}${custom}</div>${!cat && !custom ? `<div class="empty">${L('ทริปนี้ยังไม่มีรายการครั้งแรก', 'No firsts list for this trip yet')}</div>` : ''}`;
}

/* ---------- the kids' passports (everyone; editors tick) ----------
   The printed "Kids Adventure Passport", alive: one passport per child per trip — Explorer ID, the two guides,
   a stamp per recorded day, daily missions (guide facts, "today I felt", spot-these ticks), animal / food / explorer
   checklists and a certificate. Content from the trip seed (`passport`); ticks are entries kind 'tick', ID answers 'field'.
   No real passport data — ever (PRD privacy): the number and the MRZ line are decorative. */
const kidTrips = (slug) => trips().filter((t) => !(t.theme.children || []).length || (t.theme.children || []).some((c) => c.slug === slug));
// the stock library's city and country stamps (seed passport.stamps = [{art, day}]): each one appears once its day is stamped —
// never an empty slot for one still to come (play, not homework)
const cityStamps = (t) => ((t.passport || {}).stamps || []).filter((s) => s && s.art && t.days[s.day] && dayStamped(t, s.day));
const cityStampsHtml = (t, cls = '') => { const xs = cityStamps(t); return xs.length ? `<div class="cstamps ${cls}">${xs.map((s, n) => `<img src="${esc(s.art)}" alt="" style="--r:${((n * 29 + 7) % 15) - 7}deg">`).join('')}</div>` : ''; };
const passportStamps = (slug) => kidTrips(slug).reduce((n, t) => n + t.days.filter((_, i) => dayStamped(t, i)).length, 0);
const tickId = (t, key, kid) => `${t.id}.tick.${key}.${kid}`;
const ticked = (t, key, kid) => S.entries.find((e) => e.id === tickId(t, key, kid));
const fieldVal = (t, key, kid) => { const e = S.entries.find((x) => x.id === `${t.id}.field.${key}.${kid}`); return e ? e.text : ''; };
const ppList = (pp, key) => (pp.lists || []).find((l) => l.key === key);
const listItems = (l) => (l ? l.groups.flatMap((g) => g.items) : []);
const listGot = (t, l, kid) => listItems(l).filter((it) => ticked(t, `${l.key}.${it.k}`, kid)).length;
// the little one's edition (seed passport.little, for the kids it names — a toddler): point / touch / make-the-sound missions
// instead of the spot list, no words-to-say or Master Explorer checklist, a "new words" page instead of the customs form,
// (the certificate is the same for everyone: it comes by itself on the last day — the passport is play, not homework)
const littleOf = (t, kid) => { const l = (t.passport || {}).little; return l && (l.kids || []).includes(kid) ? l : null; };
function daySpots(t, i, kid) {
  if (littleOf(t, kid)) return ((littleOf(t, kid).days || [])[i] || []).map((s) => ({ ...s, key: `little.d${i}.${s.k}` }));
  return ((((t.passport || {}).days || [])[i] || {}).spot || []).map((s) => ({ ...s, key: `spot.d${i}.${s.k}` }));
}
const kidLists = (t, kid) => ((t.passport || {}).lists || []).filter((l) => !littleOf(t, kid) || !(l.said || l.certificate));
// the certificate comes by itself on the last day of the trip (and stays after) — nothing to tick, no goal to reach
const certEarned = (t, kid) => !!(t.passport || {}).certificate && (tripOver(t) || dayNow(t) === t.days.length - 1);
const certText = (t, kid) => { const l = littleOf(t, kid); return l && l.cert ? T(l.cert) : T((t.passport || {}).certificate.text); };
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
  const mdSet = ppMapDay && ppMapDay.t === t.id, md = mdSet ? ppMapDay.d : mapDayOf(t), mdPre = !mdSet && preTrip(t);   // the day the map shows (a tapped day, else today)
  const stopQ = (s) => { const m = ((pp.map || {}).stops || []).find((x) => x.en === s.en); return m && m.q; };   // "Where we go" names open the real place
  const mrz = esc(`P<${(pp.code || 'MB').split('-')[0]}<<${(k.name_en || kid).toUpperCase().replace(/[^A-Z]/g, '')}<<EXPLORER<<${year}`.padEnd(40, '<'));   // decorative only
  const guide = (i) => g[i] ? `<img class="guide" src="${esc(g[i].art)}" alt="${esc(T(g[i].name))}">` : '';
  // blank boxes like the printed passport (no "e.g." hints); a height box shows its unit beside it
  const field = (key, label, unit) => `<div><dt>${label}</dt><dd${unit ? ' class="unitd"' : ''}>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${key}" data-draft="pf:${esc(t.id)}:${kid}:${key}" value="${esc(drafts[`pf:${t.id}:${kid}:${key}`] ?? fieldVal(t, key, kid))}" maxlength="60"${unit ? ' inputmode="decimal"' : ''}>${unit ? `<span class="unit">${unit}</span>` : ''}` : esc(fieldVal(t, key, kid)) ? esc(fieldVal(t, key, kid)) + (unit ? ' ' + unit : '') : '—'}</dd></div>`;

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
  const liveDay = dayNow(t);   // -1 before and after the trip
  // before the trip only one mission is open — the day chosen on the chips (day 1 to start); after the trip all open (owner's review, Nov 2026: 13,000 px of missions months ahead)
  const pre = liveDay < 0 && daysUntil(t) > 0, pick = pre ? (mdayPick[t.id] ?? 0) : -1;
  const missions = (pp.days || []).map((pd, i) => {
    const d = t.days[i]; if (!d) return '';
    const lit = littleOf(t, kid), spots = daySpots(t, i, kid), n = spots.filter((s) => ticked(t, s.key, kid)).length;
    const pl = d.plan || {}, facts = (pd.facts || []).concat((pl.learn || []).map((x) => x.kid).filter(Boolean));   // the guide's facts + one line per stop from the manual
    const open = liveDay < 0 ? (!pre || i === pick) : i === liveDay;   // during the trip only today's mission is open (the rest fold away, a tap opens one)
    return `<article class="mission${dayStamped(t, i) ? ' stamped' : ''}${i === liveDay ? ' today' : ''}" id="m${i}"${pd.acc ? ` style="--ma:${esc(pd.acc)};--mt:${esc(pd.tint || '')}"` : ''}><details class="mfold"${open ? ' open' : ''}><summary>
<header>${artImg(t, i)}<div><div class="kicker">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}${i === liveDay ? ` · <b>${L('วันนี้', 'today')}</b>` : ''}</div><h4>${esc(T(pd.title) || T(d.title))}</h4></div>${pd.stamp ? `<span class="mstamp${dayStamped(t, i) ? ' on' : ''}" style="--n:${longWord(pd.stamp)}">${esc(pd.stamp)}</span>` : ''}</header></summary>
${facts.length ? `<div class="says">${guide(0)}<div><b>${esc(T((g[0] || {}).name))} ${L('เล่าว่า…', 'says…')}</b><ul>${facts.map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul><button class="mini hearbtn" data-a="sayfacts" data-v="${esc(facts.map((f) => T(f)).join(' '))}">🔊 ${L('อ่านให้ฟัง', 'Read aloud')}</button></div></div>` : ''}
${pl.tale ? taleHtml(t, i, pl.tale) : ''}
${(pl.quiz || []).length && !lit ? `<div class="mquiz"><b>❓ ${L(`${T((g[1] || {}).name)} ถาม…`, `${T((g[1] || {}).name)} asks…`)}</b>${quizHtml(pl.quiz)}</div>` : ''}
${fieldVal(t, `colour.d${i}`, kid) ? `<div class="colsvg sm" data-src="${esc(colourUrl(t, i))}" data-fill="${esc(colourFill(t, i, kid))}" title="${L('ภาพที่หนูระบาย', 'My colouring')}"></div>` : ''}
${drawingsOf(t, kid, i).length ? `<div class="mdraw">${drawingsOf(t, kid, i).map((m) => `<button data-a="lb" data-v="${esc(m.id)}" data-t="${esc(t.id)}" aria-label="${L('ภาพที่หนูวาด', 'My drawing')}"><img src="${esc(imgT(m))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
<div class="felt"><span class="label">${L(`วันนี้${esc(name)}รู้สึก…`, 'Today I felt…')}</span>${feel.map(([e, lbl]) => `<button data-a="mood" data-t="${esc(t.id)}" data-d="${i}" data-k="${esc(kid)}" data-v="${e}" aria-pressed="${mood(i) === e}"${ed ? '' : ' disabled'}><span>${e}</span><small>${lbl}</small></button>`).join('')}</div>
${spots.length ? `<div class="spot${lit ? ' little' : ''}"><div class="spothd">${guide(1)}<b>${lit ? L(`ภารกิจของ${esc(name)}: ชี้ แตะ ทำเสียง!`, `${esc(name)}'s mission: point, touch, make the sound!`) : L(`ภารกิจของ${T((g[1] || {}).name)}: หาให้เจอ!`, `${T((g[1] || {}).name)}'s mission: spot these!`)}</b>${n ? `<span class="label got">⭐ ${n}</span>` : ''}</div>
<div class="ticks">${spots.map((s) => tickBtn(t, kid, s.key, i, T(s), s.e)).join('')}</div></div>` : ''}
</details></article>`;
  }).join('');

  // checklists: animals, food (yum / yuck), Master Explorer → certificate. The tasting card draws each dish from the food library (kid.js gE) when its emoji has a picture
  const lists = kidLists(t, kid).map((l) => {
    const items = listItems(l), n = listGot(t, l, kid), goal = l.goal || 0;
    const rated = l.yum || l.stars, note = (it) => `${it.note ? `<small>${esc(T(it.note))}</small>` : ''}${it.say ? `<small class="say">“${esc(it.say)}”</small>` : ''}`;
    const GC = [['#2E7D32', '#E6F6EA'], ['#1565C0', '#E3F2FD'], ['#A16207', '#FFF6D6']];   // Spotted / Rides / Yummy columns, as printed
    const body = l.groups.map((gr, gi) => `<div class="grp"${l.groups.length > 1 ? ` style="--ma:${GC[gi % 3][0]};--mt:${GC[gi % 3][1]}"` : ''}>${gr.title ? `<h5>${esc(gr.e || '')} ${esc(T(gr.title))}</h5>` : ''}<div class="ticks${rated || l.said ? ' food' : ''}">${gr.items.map((it) => rated
      ? `<div class="tick${ticked(t, `${l.key}.${it.k}`, kid) ? ' on' : ''}"><span class="e">${typeof gFood === 'function' ? gFood(it.e, it.art) : esc(it.e || '')}</span><span class="t">${esc(T(it))}${note(it)}</span>${l.stars ? starBtns(t, kid, `${l.key}.${it.k}`) : yumBtns(t, kid, `${l.key}.${it.k}`)}</div>`
      : l.said && it.speak ? `<div class="sayrow">${tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))}<button class="hearbtn round" data-a="hear" data-v="${esc(it.speak.text)}" data-lang="${esc(it.speak.lang)}" aria-label="🔊 ${esc(it.en)}">🔊</button></div>`
      : tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))).join('')}</div></div>`).join('');
    return `<section class="pp-page plist${l.groups.length > 1 ? ' wide' : ''}" id="pl-${esc(l.key)}"><header><div><div class="kicker">${esc(l.e || '')} ${esc(T(l.sub))}</div><h3>${esc(T(l.title))}</h3></div>${n ? `<span class="count">⭐${n}</span>` : ''}</header>
${body}
${!goal && l.goalText ? `<p class="call calm" style="margin-top:12px">${esc(T(l.goalText))}</p>` : ''}${l.said ? `<p class="label" style="margin-top:8px">${L('ติ๊กเมื่อหนูพูดคำนั้นได้แล้ว', 'Tick it when you have said it!')}</p>` : ''}</section>`;
  }).join('');
  const lit = littleOf(t, kid), dc = lit ? null : pp.declaration;
  // the little one: the words they say on the trip (quotes for this child), with a box to add one — instead of the customs form
  const myWords = words.filter((e) => e.child === kid);
  const littleHtml = lit ? `<section class="pp-page lwords" id="lwords"><header><div><div class="kicker">🗣️ ${esc(fill(T((lit.words || {}).sub)))}</div><h3>${esc(fill(T((lit.words || {}).title) || L('คำใหม่', 'New words')))}</h3></div><span class="count">${myWords.length}</span></header>
${ed ? `<div class="row lwrow"><input class="field" id="lw-${esc(kid)}" maxlength="120" placeholder="${esc(L('เช่น “ปา” “บ๊ายบาย” “น้ำ”', 'e.g. “dada”, “bye-bye”, “water”'))}" data-draft="lw:${esc(t.id)}:${esc(kid)}" value="${esc(drafts[`lw:${t.id}:${kid}`] || '')}"><button class="btn small" data-a="littleword" data-t="${esc(t.id)}" data-k="${esc(kid)}">＋ ${L('จดคำนี้', 'Add the word')}</button></div>` : ''}
${myWords.length ? `<ul class="lwl">${myWords.map((e) => `<li><b>“${emoIn(esc(e.text))}”</b><small class="label">${L('วันที่', 'Day')} ${e.day + 1}</small></li>`).join('')}</ul>` : `<p class="empty">${L(`ยังไม่มีคำ — คำแรกที่${esc(name)}พูดในทริปจดไว้ตรงนี้`, `No words yet — the first word ${esc(name)} says on the trip goes here`)}</p>`}</section>` : '';
  const declHtml = dc ? `<section class="pp-page decl" id="decl"><header><div><div class="kicker">🛃 ${esc(T(dc.sub))}</div><h3>${esc(T(dc.title))}</h3></div></header>
<p class="label">${esc(T(dc.intro))}</p>
${dc.counts.map((c) => `<div class="dline"><span class="e">${esc(c.e)}</span><span>${esc(T(c.pre))}</span>${ed ? `<input class="field ppf num" inputmode="numeric" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(c.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(c.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${c.k}`] ?? fieldVal(t, `decl.${c.k}`, kid))}" maxlength="6">` : `<b class="num">${esc(fieldVal(t, `decl.${c.k}`, kid)) || '__'}</b>`}<span>${esc(T(c.post))}</span></div>`).join('')}
${dc.texts.map((x) => `<div class="dtext"><span class="label">${esc(T(x.label))}</span>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(x.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(x.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${x.k}`] ?? fieldVal(t, `decl.${x.k}`, kid))}" maxlength="60">` : `<p>${esc(fieldVal(t, `decl.${x.k}`, kid)) || '—'}</p>`}</div>`).join('')}
<div class="declared">${L('แจ้งแล้ว<br>ถูกต้อง', 'DECLARED<br>&amp; TRUE')}<br>★ ${t.date_from.slice(0, 4)} ★</div></section>` : '';
  const cert = pp.certificate;
  const earned = certEarned(t, kid);
  const certHtml = cert ? `<section class="pp-page cert${earned ? ' earned' : ''}" id="cert">
<div class="kicker">${L('ใบประกาศเกียรติคุณ', 'Certificate of achievement')}</div><h3>${esc(T(cert.title))}</h3>
${st && st.crest ? `<img class="crest" src="${esc(st.crest)}" alt="">` : stampHtml(t)}<p class="label">${L('ขอมอบให้', 'This certifies that')}</p><div class="cname">${kidFace(kid)} ${esc(name)}</div>
<p>${earned ? esc(certText(t, kid)) : L(`ใบประกาศนี้จะเป็นของ${esc(name)}ในวันสุดท้ายของทริป 🎉 — ไม่ต้องติ๊กให้ครบ แค่เที่ยวให้สนุก`, `This certificate is ${esc(name)}'s on the last day of the trip 🎉 — nothing to complete, just have fun`)}</p>
${earned ? `<p class="bye">${esc(T(cert.bye))}</p>` : ''}</section>` : '';

  return `<div class="row ppkids" role="tablist">${ks.map((c) => `<a class="chip" role="tab" href="#/passport/${esc(c.slug)}/${esc(t.id)}" aria-selected="${c.slug === kid}" aria-pressed="${c.slug === kid}">${kidFace(c.slug)} ${esc(kidName(c.slug))}</a>`).join('')}
${ed ? `<button class="chip kidgo" data-a="kidmode" data-v="${esc(kid)}">🧒 ${L('โหมดเด็ก', 'Kid mode')}</button>` : ''}
<span class="sep"></span>${mine.map((x) => `<a class="chip" href="#/passport/${esc(kid)}/${esc(x.id)}" aria-pressed="${x.id === t.id}">${flagsOf(x)} ${esc(T(x.title).split(' · ')[0])}</a>`).join('')}</div>
<div class="pp kid-${esc(kid)}${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)}">
${st ? `<section class="advc" style="--ink:${esc(st.ink)};--hi:${esc(st.hi)};--bgA:${esc(st.bgA)};--bgB:${esc(st.bgB)};--gold:${esc(st.gold)}"><div class="card">
${st.crest ? `<img class="crest" src="${esc(st.crest)}" alt="">` : `<span class="crest nocrest">${stampHtml(t, true)}</span>`}
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
${field('fav_animal', L('สัตว์ที่ชอบ', 'Favourite animal'))}
${field('superpower', L('พลังพิเศษ', 'Superpower'))}
${field('height_first', L('ส่วนสูง วันแรก', 'Height · Day 1'), L('ซม.', 'cm'))}
${field('height_last', L(`ส่วนสูง วันที่ ${t.days.length}`, `Height · Day ${t.days.length}`), L('ซม.', 'cm'))}
</dl>
<div class="mrz" aria-hidden="true">${mrz}</div></section>
${g.length ? `<section class="pp-page guides"><header><div><div class="kicker">${L('ไกด์สองคนของหนู', 'Meet your two guides')}</div><h3>${esc(pp.greeting ? fill(T(pp.greeting)) : L(`สวัสดี ${name}!`, `Hello, ${name}!`))}</h3></div></header>
${g.map((x, i) => `<div class="bubble${i % 2 ? ' r' : ''}">${guide(i)}<div><b>${esc(T(x.name))} ${L('บอกว่า…', 'says…')}</b><p>${esc(fill(T(x.hello)))}</p></div></div>`).join('')}</section>` : ''}
<section class="pp-page visa"><header><div><div class="kicker">${L('วีซ่า', 'Visa')} · ${esc(fmtRange(t))}</div><h3><span class="vflags">${flagsOf(t)}</span> ${esc(short)}</h3>
<p class="label">${((t.theme.places || []).map((p) => esc(T(p))).join(' · ')) || esc(T(t.sub))} · ${got ? L(`ได้ตราแล้ว ${got}`, `${got} stamp${got > 1 ? 's' : ''}`) : L('ยังไม่มีตรา', 'No stamps yet')}</p></div>${stampHtml(t, false)}</header>
<div class="dstamps">${ds}</div>
${cityStampsHtml(t)}<p class="label" style="margin-top:10px">${L('ได้ตราเมื่อวันนั้นมีบันทึก หรือกด "จบวันนี้"', 'A stamp is inked when the day has something recorded or is marked Done')}</p></section>
${pp.pins ? `<section class="pp-page sleep"><header><div><div class="kicker">${esc(T(pp.pins.sub)) || `${L('หมุด', 'Hops')} · ${pp.pins.items.length}`}</div><h3>📍 ${esc(T(pp.pins.title))}</h3></div></header>
<ol>${pp.pins.items.map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${stopQ(s) ? mapA(stopQ(s), esc(T(s))) : esc(T(s))}</b><small>${esc(T(s.days))}</small></span><span class="pe">${esc(s.e)}</span></li>`).join('')}</ol></section>`
    : `<section class="pp-page sleep"><header><div><div class="kicker">${L('ที่พัก', 'Hops')} · ${sleepStops(t).length}</div><h3>🛏️ ${L('เรานอนที่ไหนบ้าง', 'Where we sleep')}</h3></div></header>
<ol>${sleepStops(t).map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${esc(s.name)}</b><small>${L('คืนที่', s.days.length > 1 ? 'Nights' : 'Night')} ${s.label}</small></span>${artImg(t, s.art)}</li>`).join('')}</ol></section>`}
${pp.map ? `<section class="pp-page mapsec"><header><div><div class="kicker">${L('แผนที่', 'Map')} · ${L('วันที่', 'Day')} ${md + 1}</div><h3>🗺️ ${esc(T(pp.map.title))}</h3></div></header>${mapHtml(t, md, [kid].concat((t.theme.children || []).map((c) => c.slug).filter((s) => s !== kid)), mdPre ? 0 : null)}
<div class="mapdays" role="group" aria-label="${L('เลือกวัน', 'Pick a day')}"><span class="label">${L('วันที่', 'Day')}</span>${t.days.map((_, d) => `<button class="chip" data-a="ppmapday" data-t="${esc(t.id)}" data-v="${d}" aria-pressed="${d === md}">${d + 1}</button>`).join('')}</div>
<p class="label" style="margin-top:8px">${L('เส้นทึบ = ไปแล้ว · แตะวันให้เด็กเดินตาม · แตะหมุดเพื่อนำทาง', 'Solid line = been there · tap a day to walk the kids there · tap a pin for the real map and directions')}</p></section>` : ''}
</div>
${missions ? `<div class="part">${L('ภารกิจรายวัน', 'Daily missions')} · ${esc(name)}</div>${pre ? `<div class="mapdays mdays" role="group" aria-label="${L('เลือกวัน', 'Pick a day')}"><span class="label">${L('วันที่', 'Day')}</span>${(pp.days || []).map((_, i) => (t.days[i] ? `<button type="button" class="chip" data-a="mday" data-t="${esc(t.id)}" data-v="${i}" aria-pressed="${i === pick}">${i + 1}</button>` : '')).join('')}</div>` : ''}<div class="missions" style="${themeStyle(t)}">${missions}</div>` : ''}
<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}">${lit && lit.note ? `<p class="call calm lnote">👶 ${esc(T(lit.note))}</p>` : ''}${lists}${littleHtml}${declHtml}${certHtml}
<section class="pp-page stkpage"><header><div><div class="kicker">${L('หน้าสติกเกอร์', 'Sticker page')}</div><h3>⭐ ${L(`สติกเกอร์ของ${esc(name)}`, `${esc(name)}’s stickers`)}</h3></div></header>${stickerBoard(t, kid, false)}
<p class="label" style="margin-top:8px">${L('สติกเกอร์ได้จากภารกิจ ตราประทับ และประตูเซอร์ไพรส์ · เด็กแปะเองในโหมดเด็ก', 'Stickers come from missions, checklists, stamps and surprise doors · the kids stick them on in kid mode')}</p></section>
<section class="pp-page"><header><div><div class="kicker">${L('เหรียญครั้งแรก', 'Badges')}</div><h3>🌟 ${L(`ครั้งแรกของ${esc(name)}`, `${esc(name)}’s firsts`)}</h3></div></header>
${firsts.length ? `<div class="badges">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="bdg"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${L('วันที่', 'Day')} ${e.day + 1}</small></div>`; }).join('')}</div>`
    : `<p class="empty">${L('เหรียญจะมาเมื่อพ่อแม่ติ๊ก "ครั้งแรก" ระหว่างทริป', 'Badges appear when the grown-ups tick a “first” on the trip')}</p>`}</section>
${words.length && !lit ? `<section class="pp-page"><header><div><div class="kicker">${L('คำพูดของหนู', 'In my own words')}</div><h3>💬 ${L('สิ่งที่หนูพูด', 'Things I said')}</h3></div></header>${words.slice(0, 6).map((e) => quoteCall(e, e.highlight)).join('')}</section>` : ''}
</div>`;
}

/* ---------- record a day (editors) ---------- */
function viewLog(t, i, evening) {
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i), now = dayNow(t);
  const dk = `${t.id}:${i}`;
  const strip = t.days.map((x, j) => {
    const n = entriesOf(t.id, j).length + mediaOf(t.id, j).length;
    return `<a href="#/t/${esc(t.id)}/log/${j}" aria-current="${j === i}">${j === now ? `<span class="today">${L('วันนี้', 'Today')}</span>` : ''}<b>${String(j + 1).padStart(2, '0')}</b><small>${esc(fmtDay(x.date, { day: 'numeric', month: 'short' }))}${n ? `<i class="has" title="${esc(L(`บันทึกแล้ว ${n} อย่าง`, `${n} recorded`))}"></i>` : ''}</small></a>`;
  }).join('');
  const quotes = es.filter((e) => e.kind === 'quote');
  const mood = (k) => (es.find((e) => e.kind === 'mood' && e.child === k) || {}).mood;
  const fav = es.find((e) => e.kind === 'fav'), note = es.find((e) => e.kind === 'note');
  const visited = new Set(placesOf(t.id, i).map((p) => p.key));
  // a first happens once per child per trip: on its own day it is ticked here; on any other day it shows the day it happened
  // (and a tap there no longer removes it); firsts both kids already had on other days fold away under the list
  const firstDay = (key, k) => { const e = entriesOf(t.id).find((x) => x.kind === 'first' && x.first_key === key && x.child === k); return e ? e.day : -1; };
  const kidsDoneElsewhere = (key) => kids.every((k) => { const fd = firstDay(key, k); return fd >= 0 && fd !== i; });
  const kids = children().map((c) => c.slug);
  // tonight's three (photos, words, moods) and "day done" come first; everything else folds under "more" — open once it holds
  // something of this day, or always when the parents asked for that (ls logall)
  const moreOpen = !!(ls('logall') || fav || note || visited.size || audioOf(t.id, i).length || spendOf(t.id, i).length || es.some((e) => e.kind === 'first') || S.reviews.some((r) => r.trip === t.id && r.day === i));
  return `<div class="daystrip" role="tablist">${strip}</div>${aiJump(t, i, dk)}
<div class="day" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div><div></div>
<h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart' + (dayStamped(t, i) ? '' : ' off'))}</div></div>
<div class="logprog noprint" role="group" aria-label="${L('บันทึกวันนี้', 'Tonight’s three')}">${[['photos', 'camera', L('รูป', 'Photos'), ph.length], ['quotes', 'quote', L('คำพูด', 'Words'), quotes.length], ['mood', 'kid', L('อารมณ์', 'Mood'), kids.filter((k) => mood(k)).length]].map(([id, icon, lbl, n]) => `<button type="button" class="lpc${n ? ' on' : ''}" data-a="jump" data-v="#lg${id}" aria-label="${lbl}: ${n ? L('มีแล้ว', 'done') : L('ยังว่าง', 'empty')}">${ic(icon)}${lbl}<i>${n ? '✓' : '○'}</i></button>`).join('')}</div>
${planHtml(t, i, i === now) ? `<details class="blk planblk fold"${ls('logall') ? ' open' : ''}><summary>${ic('clock')}<b>${L('แผนวันนี้', 'Today’s plan')}</b><small>${L(`${((d.plan || {}).plan || []).length} ช่วง`, `${((d.plan || {}).plan || []).length} steps`)}</small>${ic('chev', 'chv')}</summary>${planHtml(t, i, i === now)}</details>` : ''}

<section class="blk" id="lgphotos"><h3>${ic('camera')} ${L('รูป', 'Photos')}${ph.length ? ` <span class="label">${ph.length}</span>` : ''}</h3>
<div class="row"><button class="btn" type="button" data-a="pickphotos" data-fpick data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่มรูป', 'Add photos')}</button><span class="progress" id="prog2"></span></div>
${ph.length ? `<div class="mosaic" style="margin-top:10px">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : ''}${upBlock()}</section>

<section class="blk" id="lgquotes"><h3>${ic('quote')} ${L('คำพูดน่ารัก', 'Things they said')}</h3>
<div class="row" role="group">${kids.concat('both').map((k) => `<button class="chip" data-a="who" data-v="${k}" aria-pressed="${quoteWho === k}">${kidFace(k)} ${esc(kidName(k))}</button>`).join('')}</div>
<div class="emowrap" style="margin-top:8px"><textarea id="qtext" class="field" data-draft="q:${esc(dk)}" placeholder="${L('“หนูอยากเป็นปลา…”', '“I want to be a fish…”')}">${esc(drafts['q:' + dk] || '')}</textarea>${emoBtn('qtext')}</div>
<div class="row end" style="margin-top:6px"><button class="btn small" data-a="savequote" data-t="${esc(t.id)}" data-d="${i}">${L('บันทึกคำพูด', 'Save quote')}</button></div>
${quotes.length ? `<ul class="items">${quotes.map((e) => `<li><div class="grow">${quoteCall(e, false)}</div><button class="mini${e.highlight ? ' on' : ''}" data-a="hiq" data-v="${esc(e.id)}" aria-pressed="${!!e.highlight}" title="⭐">${e.highlight ? '⭐' : '☆'}</button><button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></li>`).join('')}</ul>` : ''}</section>

<section class="blk" id="lgmood"><h3>${ic('kid')} ${L('อารมณ์วันนี้', 'Mood today')} <span class="label">${L('แตะซ้ำเพื่อล้าง', 'tap again to clear')}</span></h3>
${kids.map((k) => `<div class="moodrow">${kidBadge(k)}<div class="opts">${(t.moods.length ? t.moods : ['😄', '🥰', '🤩', '😋', '😴', '😢']).map((m) => `<button data-a="mood" data-k="${k}" data-v="${esc(m)}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${mood(k) === m}" aria-label="${esc(kidName(k))} ${esc(m)}">${emo(m)}</button>`).join('')}</div></div>`).join('')}</section>

<section class="blk dayendblk"><button class="btn dayend${d.done_at ? ' is-done' : ''}" data-a="done" data-t="${esc(t.id)}" data-d="${i}">${d.done_at ? '✓ ' + L('วันนี้เสร็จแล้ว (แตะเพื่อยกเลิก)', 'Day done (tap to undo)') : ic('flag') + ' ' + L('จบวันนี้', 'Mark day done')}</button>
<div class="row"><a class="btn ghost" href="#/t/${esc(t.id)}">${ic('book')} ${L('ดูในสมุด', 'See it in the book')}</a>${navigator.share ? `<button class="btn ghost" data-a="share" data-t="${esc(t.id)}" data-d="${i}">${ic('share')} ${L('ส่งให้ญาติ', 'Share with family')}</button>` : ''}<button class="btn ghost" data-a="daycard" data-t="${esc(t.id)}" data-d="${i}">${ic('image')} ${L('การ์ดวันนี้', 'Day card')}</button></div></section>

<details class="more"${moreOpen ? ' open' : ''}><summary><span><b>${L('เพิ่มเติม', 'More')}</b><small>${L('ของโปรด · โน้ต · เสียงเด็กๆ · ครั้งแรก · เช็กอิน · ค่าใช้จ่าย · รีวิว', 'favourite · note · voices · firsts · check-ins · spending · reviews')}</small></span><button type="button" class="linkbtn" data-a="logall">${ls('logall') ? L('พับเก็บได้', 'Let it fold') : L('เปิดไว้ตลอด', 'Keep open')}</button>${ic('chev', 'chv')}</summary>
${clipsBlock(t, i)}

<section class="blk"><h3>${ic('hearts')} ${L('ของโปรดวันนี้', 'Favourite thing today')}</h3>
<div class="emowrap"><input id="favtext" class="field" data-a-blur="fav" data-t="${esc(t.id)}" data-d="${i}" data-draft="f:${esc(dk)}" value="${esc(drafts['f:' + dk] ?? (fav ? fav.text : ''))}" placeholder="${L('เช่น ไอติมมะม่วง', 'e.g. mango ice cream')}">${emoBtn('favtext')}</div></section>

<section class="blk"><h3>${ic('log')} ${L('โน้ตพ่อแม่', "Parents' note")}</h3>
<div class="emowrap"><textarea id="notetext" class="field" data-a-blur="note" data-t="${esc(t.id)}" data-d="${i}" data-draft="n:${esc(dk)}" placeholder="${L('บันทึกเมื่อแตะออกจากช่อง · เว้นว่าง = ลบ', 'Saved when you leave the box · empty = delete')}">${esc(drafts['n:' + dk] ?? (note ? note.text : ''))}</textarea>${emoBtn('notetext')}</div></section>

<section class="blk"><h3>${ic('firsts')} ${L('ครั้งแรก', 'Firsts')} <span class="label">${L('แตะรูปเด็กเพื่อติ๊ก', 'tap a child to tick')}</span></h3>
${((open, done) => `<div class="firsts">${open.map((f) => `<div class="first"><span class="e">${esc(f.emoji)}</span><span class="t">${esc(T(f.label))}</span><span class="kids">${kids.map((k) => { const fd = firstDay(f.key, k), here = fd === i, other = fd >= 0 && !here;
    return `<button data-a="first" data-v="${esc(f.key)}" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${here}" class="${other ? 'elsewhere' : ''}" aria-label="${esc(kidName(k))}: ${esc(T(f.label))}${other ? ` · ${L('วันที่', 'Day')} ${fd + 1}` : ''}">${kidBadge(k, !here)}${other ? `<small class="fday">${L('ว', 'D')}${fd + 1}</small>` : ''}</button>`; }).join('')}</span></div>`).join('')}</div>
${done.length ? `<details class="fdone"><summary>${L(`ทำไปแล้ววันอื่น (${done.length})`, `Already done on other days (${done.length})`)}</summary><ul>${done.map((f) => `<li>${esc(f.emoji)} ${esc(T(f.label))} <small class="label">${kids.map((k) => `${esc(kidName(k))} · ${L('วันที่', 'Day')} ${firstDay(f.key, k) + 1}`).join(' / ')}</small></li>`).join('')}</ul></details>` : ''}`)(t.firsts.filter((f) => !kidsDoneElsewhere(f.key)), t.firsts.filter((f) => kidsDoneElsewhere(f.key)))}
${es.filter((e) => e.kind === 'first' && e.first_key === 'custom').map((e) => `<div class="first got" style="margin-top:8px"><span class="e">⭐</span><span class="t">${esc(e.text)}</span>${kidBadge(e.child)}<button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></div>`).join('')}
<div class="row" style="margin-top:8px"><input id="firsttext" class="field" style="flex:1;min-width:160px" data-draft="c:${esc(dk)}" value="${esc(drafts['c:' + dk] || '')}" placeholder="${L('ครั้งแรกอื่นๆ เช่น ใส่รองเท้าเอง', 'Another first, e.g. shoes on by herself')}">
${kids.map((k) => `<button class="btn ghost small" data-a="customfirst" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}">＋ ${kidFace(k)}</button>`).join('')}</div></section>

${(d.planned || []).length ? `<section class="blk"><h3>${ic('pin')} ${L('เช็กอิน: ที่ไปและมื้ออาหาร', 'Check in: places & meals')}</h3>
${d.planned.map((p) => `<div class="check"><button data-a="place" data-v="${esc(p.key)}" data-k="${esc(p.kind || 'place')}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${visited.has(p.key)}" aria-label="${esc(T(p))}">${visited.has(p.key) ? '✓' : ''}</button><span class="grow">${p.kind === 'food' ? '🍽️ ' : ''}${esc(T(p))}${p.meal ? ` <small>· ${esc(p.meal)}</small>` : ''}</span>${extA(mapsUrl(placeQ(t, p)), L('แผนที่', 'Map') + ' ↗', 'mini nav')}</div>`).join('')}</section>` : ''}

${spendBlock(t, i, dk)}
${notebookBlock(t, i)}
</details>
${((g) => (g && isEditor() && S.features.story ? `<details class="blk fold aifold"${evening || ls('logall') || aiRun || ph.length || es.length ? ' open' : ''}><summary>${ic('sparkle')}<b>${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')}</b><small>${ph.length || es.length ? L(`เหลือ ${aiTodo(t, i, dk).length}`, `${aiTodo(t, i, dk).length} to do`) : L('บันทึกก่อน แล้วค่อยเปิด', 'Record first, then open')}</small>${ic('chev', 'chv')}</summary>${g}</details>` : g))(aiGroup(t, i, dk))}`;
}
// what we actually spent today: amount + category + a word → a row; the day's total in the heading, the trip's so far underneath.
// A grown-up's number, so it stays on this page (and in our database) — never in the printed memory book or a seed.
const SPEND_CATS = [['food', '🍜', 'กิน', 'Food'], ['transport', '🚕', 'เดินทาง', 'Transport'], ['tickets', '🎟️', 'ค่าเข้า', 'Tickets'], ['stay', '🛏️', 'ที่พัก', 'Stay'], ['shop', '🛍️', 'ซื้อของ', 'Shopping'], ['other', '🧾', 'อื่นๆ', 'Other']];
// the day's places to eat, for the spend box's dropdown: the plan's picks and backups first, then what is on the route, near the
// bed, and the rest of the day's areas — a meal can be at several of them, or at none of them ("other, type it in")
function spendPlaces(t, i) {
  const { near, hot, bed } = eatForDay(t, i), ps = ((t.days[i].plan || {}).picks || []), seen = new Set(), out = [];
  const grp = (label, names) => { const xs = names.filter((n) => n && !seen.has(n)); xs.forEach((n) => seen.add(n)); if (xs.length) out.push([label, xs]); };
  grp(L('ร้านในแผนวันนี้', 'In today’s plan'), ps.flatMap((p) => [p.name, p.alt && p.alt.name]));
  const items = near.flatMap((g) => g.items);
  grp(L('ตรงเส้นทางวันนี้', 'On today’s route'), items.filter((x) => hot.has(x)).map((x) => x.name));
  grp(L('ใกล้ที่พัก', 'Near the bed'), items.filter((x) => bed.has(x)).map((x) => x.name));
  grp(L('ร้านอื่นในโซนวันนี้', 'Elsewhere in today’s areas'), items.map((x) => x.name));
  return out;
}
// the kids' voices: a few seconds each, recorded on the phone, kept with the day. Played here, in the book and in kid mode —
// never in the printed book (paper cannot play them) and never sent anywhere else.
const clipPlayer = (m) => `<audio controls preload="none" src="${esc(m.local || `/media/${encodeURIComponent(m.id)}`)}"></audio>`;
function clipsBlock(t, i) {
  const cs = audioOf(t.id, i), can = typeof MediaRecorder !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  return `<section class="blk clips"><h3>${ic('mic')} ${L('เสียงของเด็กๆ', 'Their voices')} ${cs.length ? `<span class="label">${cs.length}</span>` : ''}</h3>
<div class="row"><button class="btn${recState ? ' rec' : ''}" type="button" data-a="rec" data-t="${esc(t.id)}" data-d="${i}"${can ? '' : ' disabled'}>${recState ? `■ ${L('หยุด', 'Stop')} <span id="rectime">0:00</span>` : `● ${L('อัดเสียง', 'Record')}`}</button><span class="label">${can ? L('ไม่เกิน 30 วินาที · แตะหยุดเมื่อพอ', 'Up to 30 s · tap Stop when done') : L('เครื่องนี้อัดเสียงไม่ได้', 'This device cannot record')}</span></div>
${cs.length ? `<ul class="items">${cs.map((m) => `<li><div class="grow">${clipPlayer(m)}<input class="field small clipcap" data-v="${esc(m.id)}" value="${esc(m.caption || '')}" placeholder="${L('ใครพูดอะไร เช่น มีมี่ร้องเพลง', 'Who said what, e.g. Mimi singing')}" maxlength="120"></div><button class="mini" data-a="delclip" data-v="${esc(m.id)}" aria-label="${L('ลบ', 'Delete')}">✕</button></li>`).join('')}</ul>` : ''}</section>`;
}
function spendBlock(t, i, dk) {
  const rows = spendOf(t.id, i), all = spendOf(t.id), curs = tripCurs(t), cur = curs.includes(spendCur) ? spendCur : curs[0];
  const places = spendPlaces(t, i);
  return `<section class="blk spend"><h3>${ic('money')} ${L('จ่ายจริงวันนี้', 'Spent today')} ${rows.length ? `<span class="label">${esc(sumMoney(rows))}</span>` : ''}</h3>
<div class="row" role="group">${SPEND_CATS.map(([k, e, th, en]) => `<button class="chip" data-a="spendcat" data-v="${k}" aria-pressed="${spendCat === k}">${emo(e)} ${L(th, en)}</button>`).join('')}</div>
${places.length ? `<div class="row spendfood" style="margin-top:8px"${spendCat === 'food' ? '' : ' hidden'}><select id="spendplace" class="field" aria-label="${L('ร้าน', 'Place')}"><option value="">${L('ร้านไหน? (เลือก หรือพิมพ์เองด้านล่าง)', 'Which place? (pick, or type below)')}</option>${places.map(([label, xs]) => `<optgroup label="${esc(label)}">${xs.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}</optgroup>`).join('')}<option value="">${L('อื่นๆ — ไม่อยู่ในลิสต์ พิมพ์เอง', 'Other — not on the list, type it')}</option></select></div>` : ''}
<div class="row" style="margin-top:8px"><input id="spendamt" class="field" style="flex:1;min-width:110px" inputmode="decimal" placeholder="0" aria-label="${L('จำนวนเงิน', 'Amount')}" data-draft="sa:${esc(dk)}" value="${esc(drafts['sa:' + dk] || '')}">
${curs.length > 1 ? curs.map((c) => `<button class="chip" data-a="spendcur" data-v="${c}" aria-pressed="${cur === c}">${c}</button>`).join('') : `<span class="label">${cur}</span>`}
<input id="spendnote" class="field" style="flex:2;min-width:150px" maxlength="200" placeholder="${L('เช่น ติ่มซำมื้อเที่ยง', 'e.g. dim sum lunch')}" data-draft="sn:${esc(dk)}" value="${esc(drafts['sn:' + dk] || '')}">
<button class="btn small" data-a="addspend" data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่ม', 'Add')}</button></div>
${rows.length ? `<ul class="items">${rows.map((s) => { const c = SPEND_CATS.find((x) => x[0] === s.cat) || SPEND_CATS[5]; return `<li><div class="grow">${emo(c[1])} <b>${esc(fmtMoney(s.amount, s.cur))}</b>${s.note ? ` · ${esc(s.note)}` : ''}</div><button class="mini" data-a="delspend" data-v="${esc(s.id)}" aria-label="${L('ลบ', 'Delete')}">✕</button></li>`; }).join('')}</ul>` : ''}
${all.length ? `<p class="lede" style="margin:8px 0 0;font-size:14px">${L('ทั้งทริปจนถึงตอนนี้', 'Whole trip so far')}: <b>${esc(sumMoney(all))}</b>${thbLine(all) ? ` (${esc(thbLine(all))})` : ''} · <a href="#/t/${esc(t.id)}/spend">${L('ดูสรุป ›', 'See the summary ›')}</a> · ${L('อยู่ในสมุดของเราเท่านั้น ไม่เข้าเล่มพิมพ์', 'stays in our book, not in the printed one')}</p>` : ''}</section>`;
}
// the trip's spending (editors): totals per currency (no exchange rates — each currency stays its own), by category with bars,
// day by day, and the biggest items; from what was typed on the record pages; never in the printed book
// the rates box on the spending page: one field per foreign currency of this book; typing updates the baht figures in place
// (never a re-render over the field), leaving the field redraws the page
function fxBlock(t) {
  const all = spendOf(t.id), curs = [...new Set(all.map((s) => s.cur))].filter((c) => c !== 'THB');
  if (!curs.length) return '';
  const fx = fxRates(), hint = { HKD: '4.4', MOP: '4.3', AUD: '23', JPY: '0.23', USD: '34', EUR: '37', GBP: '44', SGD: '26' };
  return `<section class="blk fxbox"><h3>${ic('exchange')} ${L('เป็นเงินบาทโดยประมาณ', 'Roughly in baht')}</h3>
<div class="row fxrow">${curs.map((c) => `<label class="fxf">1 ${esc(c)} =<input class="field" inputmode="decimal" data-fx="${esc(c)}" value="${esc(fx[c] || '')}" placeholder="${esc(hint[c] || '')}" aria-label="${esc(c)} → THB"> ${L('บาท', 'THB')}</label>`).join('')}</div>
<p class="fxres" id="fxres">${fxResult(t)}</p>
<p class="label">${L('ใส่เรตที่แลกจริง · อยู่ในเครื่องนี้ ไม่ดึงจากเน็ต', 'Type the rate you actually got · kept on this phone · nothing is looked up online')}</p></section>`;
}
function fxResult(t) {
  const r = toThb(spendOf(t.id));
  return r.missing.length ? L(`ใส่เรต ${r.missing.join(', ')} เพื่อดูยอดรวมเป็นบาท`, `Add a rate for ${r.missing.join(', ')} to see the total in baht`)
    : `${L('ทั้งทริป', 'Whole trip')} <b>≈ ${esc(fmtMoney(Math.round(r.thb), 'THB'))}</b>`;
}
/* ---------- every photo of the book, by tag: chips filter in place (no re-render), photos grouped by day → stop ---------- */
let photoTag = '';   // the tag chip pressed on the photos page (this visit)
function viewPhotos(t) {
  const ph = mediaOf(t.id), counts = {};
  ph.forEach((m) => tagsOf(m).forEach((k) => { counts[k] = (counts[k] || 0) + 1; }));
  const keys = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  if (!keys.includes(photoTag)) photoTag = '';
  const days = t.days.map((d, i) => ({ i, d, ph: ph.filter((m) => m.day === i) })).filter((x) => x.ph.length);
  const loose = ph.filter((m) => m.day === null || m.day === undefined);
  const grp = (list) => mosaicByPlace(t, list);
  if (!ph.length) return `<h1 class="h2">${L('รูปทั้งเล่ม', 'Every photo')}</h1>${emptyCard(t, L('ยังไม่มีรูปในเล่มนี้', 'No photos in this book yet'), L('รูปที่ถ่ายในหน้าบันทึกจะมาอยู่ที่นี่ เรียงตามวันและที่เที่ยว', 'Photos from the record page land here, by day and by place'), isEditor() ? [`#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}`, L('ถ่ายรูปวันนี้', 'Add today’s photos')] : null)}`;
  return `<h1 class="h2">${L('รูปทั้งเล่ม', 'Every photo')} <span class="label">${ph.length}</span></h1>
<p class="lede">${keys.length ? L('แตะแท็กเพื่อกรอง · แท็กมาจากผู้ช่วย หรือพิมพ์เองตอนเปิดรูป', 'Tap a tag to filter · tags come from “The helper looks at today’s photos” or are typed in the photo viewer')
    : L('ยังไม่มีแท็ก — กด “ให้ผู้ช่วยดูรูปวันนี้” ในหน้าบันทึก หรือพิมพ์เองตอนเปิดรูป', 'No tags yet — on a day’s record page press “The helper looks at today’s photos”, or type tags in the photo viewer')}</p>
${keys.length ? `<div class="chips" id="phtags"><button class="chip" data-a="phtag" data-v="" aria-pressed="${!photoTag}">${L('ทั้งหมด', 'All')} ${ph.length}</button>${keys.map((k) => `<button class="chip" data-a="phtag" data-v="${esc(k)}" aria-pressed="${photoTag === k}">${tagHtml(k)} ${counts[k]}</button>`).join('')}</div>` : ''}
<div id="phlist">${days.map((x) => `<section class="blk phday" data-day="${x.i}"><h3>${L('วันที่', 'Day')} ${x.i + 1} <span class="label">${esc(fmtDay(x.d.date, { day: 'numeric', month: 'short' }))} · ${esc(T(x.d.title))}</span></h3>${grp(x.ph)}</section>`).join('')}
${loose.length ? `<section class="blk phday"><h3>${L('ไม่ระบุวัน', 'No day')}</h3>${grp(loose)}</section>` : ''}</div>`;
}
const emptyCard = (t, title, line, act) => `<div class="empty bookstart">${castHtml(((t && t.theme && t.theme.children) || []).map((k) => k.slug))}<b>${title}</b>${line ? `<p>${line}</p>` : ''}${act ? `<a class="btn" href="${act[0]}">${act[1]}</a>` : ''}</div>`;
function viewSpend(t) {
  const all = spendOf(t.id);
  if (!all.length) return `<h1 class="h2">${L('ค่าใช้จ่าย', 'Spending')}</h1>${emptyCard(t, L('ยังไม่มีรายการ', 'Nothing yet'), L('บันทึกค่าใช้จ่ายได้ที่หน้าบันทึกของแต่ละวัน', 'Add spending on each day’s record page'), [`#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}`, L('ไปหน้าบันทึก', 'Open the record page')])}`;
  const curs = [...new Set(all.map((s) => s.cur))];
  const byCur = curs.map((c) => {
    const rows = all.filter((s) => s.cur === c), total = rows.reduce((a, s) => a + s.amount, 0);
    const cats = SPEND_CATS.map(([k, e, th, en]) => ({ k, e, name: L(th, en), n: rows.filter((s) => (s.cat || 'other') === k).reduce((a, s) => a + s.amount, 0) })).filter((x) => x.n > 0).sort((a, b) => b.n - a.n);
    const max = Math.max(...cats.map((x) => x.n));
    return `<section class="blk spsum"><h3>${esc(c)} · ${esc(fmtMoney(total, c))}${c !== 'THB' ? ` <span class="label fxa" data-fxc="${esc(c)}">${esc(thbLine(rows))}</span>` : ''}</h3><ul class="spbars">${cats.map((x) => `<li><span class="spl">${emo(x.e)} ${esc(x.name)}</span><span class="spbar"><i style="width:${Math.max(3, Math.round((x.n / max) * 100))}%"></i></span><b>${esc(fmtMoney(x.n, c))}</b><small>${Math.round((x.n / total) * 100)}%</small></li>`).join('')}</ul></section>`;
  }).join('');
  const days = t.days.map((d, i) => ({ d, i, rows: spendOf(t.id, i) })).filter((x) => x.rows.length);
  const top = [...all].sort((a, b) => b.amount - a.amount).slice(0, 5);
  return `<div class="part">${L('ค่าใช้จ่ายจริง', 'What we actually spent')}</div><h1 class="h2">${L('สรุปค่าใช้จ่ายทริป', 'Trip spending')}</h1>
<p class="lede">${L(`ทั้งหมด ${all.length} รายการ · ${esc(sumMoney(all))} · แยกตามสกุลเงิน (เงินบาทด้านล่างเป็นค่าประมาณจากเรตที่ใส่เอง) · อยู่ในสมุดของเราเท่านั้น ไม่เข้าเล่มพิมพ์`, `${all.length} items · ${esc(sumMoney(all))} · each currency on its own (the baht below is an estimate at your own rate) · stays in our book, not in the printed one`)}</p>
${fxBlock(t)}<div class="spgrid">${byCur}</div>
<section class="blk"><h3>${ic('today')} ${L('รายวัน', 'Day by day')}</h3><ul class="items spdays">${days.map(({ d, i, rows }) => `<li><a class="grow" href="#/t/${esc(t.id)}/log/${i}"><b>${L('วันที่', 'Day')} ${i + 1}</b> · ${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))} · ${esc(T(d.title))}</a><b>${esc(sumMoney(rows))}</b></li>`).join('')}</ul></section>
<section class="blk"><h3>${ic('up')} ${L('รายการใหญ่สุด', 'The biggest items')}</h3><ul class="items">${top.map((s) => { const c = SPEND_CATS.find((x) => x[0] === s.cat) || SPEND_CATS[5]; return `<li><div class="grow">${emo(c[1])} ${s.note ? esc(s.note) : esc(L(c[2], c[3]))} <small class="label">· ${L('วันที่', 'Day')} ${s.day + 1}</small></div><b>${esc(fmtMoney(s.amount, s.cur))}</b></li>`; }).join('')}</ul></section>`;
}
