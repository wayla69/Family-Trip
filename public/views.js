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
  if (!S) { app.innerHTML = route().parts[0] === 'privacy' ? `<main class="wrap">${viewPrivacy()}</main>` : route().parts[0] === 'help' ? `<main class="wrap">${viewHelp()}</main>` : loginView(); document.documentElement.style.cssText = ''; return; }
  const r = route(), p = r.parts;
  let t = null, html;
  // kid mode is "locked": while it is on, every route leads back to it (a grown-up holds the lock to leave)
  const km = isEditor() && ls('kidmode');
  // a new family (no children yet) starts at the setup steps until it finishes or skips them
  if (isEditor() && !p[0] && Array.isArray(S.children) && !S.children.length && !ls('startDone')) { location.replace('#/start'); return; }
  if (km && p[0] !== 'kid') { location.replace('#/kid' + (km !== 'pick' ? '/' + km : '')); return; }
  document.body.classList.toggle('kidmode', !!(p[0] === 'kid' && isEditor()));
  if (p[0] === 'kid' && isEditor()) {
    const kt = kidTrip(p[1]) || curTrip(); artTrip = kt; artDay = kt ? kidDayOf(kt) : null;   // in kid mode the kids dress for the day picked
    document.documentElement.style.cssText = themeStyle(kt); document.documentElement.lang = lang;
    const key = p.slice(0, 3).join('/'), enter = key !== lastView; lastView = key; kidEnter = enter;
    document.body.classList.remove('padfull');   // the drawing board's full-screen sheet puts it back (hydrateDraw) while it is open
    app.innerHTML = `<main class="kidmain${enter ? ' enter' : ''}">${viewKid(p)}</main>`;
    hydrateColours(app); hydrateDraw(app); hydrateMap(app); hydratePager(app);
    ppTabsShow(app);
    return;
  }
  if (p[0] === 'reelcards' && (t = trip(p[1]))) {   // a book's film: its cards, photographed one by one by the server (server/reel.js)
    if (p[2] === 'en' || p[2] === 'th') lang = p[2];
    artTrip = t; artDay = null;
    document.documentElement.style.cssText = themeStyle(t); document.documentElement.lang = lang;
    document.body.classList.toggle('serif', t.theme.display === 'serif'); document.body.classList.add('reelbook');
    app.innerHTML = viewReelCards(t, String(p[3] || '').split('.').filter((x) => /^\d+$/.test(x)).map(Number), String(p[4] || '').split('~').filter(Boolean));
    return;
  }
  if (p[0] === 'printyear' && /^\d{4}$/.test(p[1] || '')) {   // the year's book, A4 pages for the PDF (server: GET /api/b/pdf-year/:y)
    const ts = yearTrips(+p[1]); artTrip = ts[0] || null; artDay = null;
    document.documentElement.style.cssText = ts[0] ? themeStyle(ts[0]) : ''; document.documentElement.lang = lang; document.body.classList.add('printbook');
    app.innerHTML = viewYearBook(+p[1], true);
    return;
  }
  if (p[0] === 'reelyear' && /^\d{4}$/.test(p[1] || '')) {   // the year's film: its cards (server/reel.js startYear)
    if (p[2] === 'en' || p[2] === 'th') lang = p[2];
    const ts = String(p[3] || '').split('.').map(trip).filter(Boolean); artTrip = ts[0] || null; artDay = null;
    document.documentElement.style.cssText = ts[0] ? themeStyle(ts[0]) : ''; document.documentElement.lang = lang; document.body.classList.add('reelbook');
    app.innerHTML = viewYearCards(+p[1], ts);
    return;
  }
  if (p[0] === 'print' && (t = trip(p[1]))) { artTrip = t; artDay = null;   // the memory book: A4 pages for the PDF (and a preview on screen)
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
    const stp = { photo: 'photos', rec: 'feel', quote: 'words' }[what];
    history.replaceState(null, '', ed ? `#/t/${encodeURIComponent(ct.id)}/log/${di}${stp ? '/' + stp : ''}` : `#/t/${encodeURIComponent(ct.id)}/today/${di}`);
    render();
    if (ed) setTimeout(() => goShortcut(what), 60);
    return;
  }
  artDay = null;
  artTrip = (p[0] === 'passport' && trip(p[2])) || curTrip();   // the shelf and the passports dress the kids for the coming trip (or the passport's)
  if (p[0] === 't' && (t = trip(p[1]))) {
    artTrip = t;
    const sec = p[2] || 'hub';
    // the kids dress for the day on the page: the day being read or recorded, else today during the trip, else the book's own clothes
    artDay = (sec === 'today' || sec === 'log') && /^\d+$/.test(p[3] || '') ? Math.min(t.days.length - 1, +p[3]) : dayNow(t) >= 0 ? dayNow(t) : null;
    if (sec === 'log') html = isEditor() ? viewLog(t, Math.min(t.days.length - 1, Math.max(0, +p[3] || 0)), p[4] === 'ai', p[4]) : viewBook(t);
    else if (sec === 'book') html = viewBook(t);
    else if (sec === 'today' && t.kind === 'snap') html = viewSnapLive(t);
    else if (sec === 'draft' && t.kind === 'snap' && isEditor()) html = p[3] === 'review' ? viewSnapReview(t) : viewSnapDraft(t);   // the helper drafts it (P3)   // a book from photos: the day's page (docs/SNAP-BOOK.md P2)
    else if (sec === 'days' && t.kind === 'snap' && isEditor()) html = viewSnapEdit(t);   // the parents fix the book's names, places and pictures
    else if (sec === 'today') html = viewToday(t, p[3] === undefined || p[3] === 'full' ? undefined : +p[3], p.includes('full'));
    else if (sec === 'plan') html = viewPlan(t, p[3] === 'full');
    else if (sec === 'eat') html = p[3] === 'all' ? viewEat(t) : viewEatDay(t, p[3] === 'd' ? Math.min(t.days.length - 1, Math.max(0, +p[4] || 0)) : todayIdx(t));   // day by day; /all = every place
    else if (sec === 'stays' || sec === 'sos' || sec === 'prep' || sec === 'learn') html = { stays: viewStays, sos: viewSos, prep: viewPrep, learn: viewLearn }[sec](t, p[3] === 'full', p[3] === 'full' && p[4] !== undefined ? +p[4] : undefined);   // glance; /full[/<k>] the report
    else if (sec === 'search') html = viewSearch(t);
    else if (sec === 'hearts') html = viewHearts(t);
    else if (sec === 'offline') html = isEditor() ? viewOffline(t) : viewHub(t);
    else if (sec === 'firsts') html = viewFirsts(t);
    else if (sec === 'spend') html = isEditor() ? viewSpend(t) : viewHub(t);
    else if (sec === 'check') html = isEditor() ? viewCheck(t) : viewHub(t);
    else if (sec === 'photos') html = viewPhotos(t);
    else html = viewHub(t);
  } else if (p[0] === 'passport') html = trip(p[2]) ? viewPassport(p[1], p[2], p[3]) : viewPassport(p[1], undefined, p[2]);   // #/passport/<kid>[/<trip>][/<page>]
  else if (p[0] === 'notebook') html = viewNotebook();
  else if (p[0] === 'viewers' && isEditor()) html = viewViewers();
  else if (p[0] === 'import' && isEditor()) html = viewImport();
  else if (p[0] === 'planner' && isEditor()) html = viewPlanner(p[1]);
  else if (p[0] === 'eats' && isEditor()) html = viewEats(p[1]);
  else if (p[0] === 'explore' && isEditor()) html = viewExplore(p[1], p[2]);
  else if (p[0] === 'taste' && isEditor()) html = viewTaste(p[1]);
  else if (p[0] === 'family' && isEditor()) html = viewFamily();
  else if (p[0] === 'start' && isEditor()) html = viewStart(p);
  else if (p[0] === 'privacy') html = viewPrivacy();
  else if (p[0] === 'help') html = viewHelp();
  else if (p[0] === 'emoji' && isEditor()) html = viewEmoji();
  else if (p[0] === 'snaptest' && isEditor()) html = viewSnapTest();
  else if (p[0] === 'health' && isEditor()) html = viewHealth();
  else if (p[0] === 'map') html = viewFamMap(p[1] || '');
  else if (p[0] === 'year') html = viewYear(p[1] || '');
  else if (p[0] === 'grow') { history.replaceState(null, '', `#/passport/${encodeURIComponent(p[1] || '')}/id`); html = viewPassport(p[1] || '', undefined, 'id'); }   // the old Growing up page lives in the passport's Explorer ID now
  else if (p[0] === 'inbox' && isEditor()) html = viewInbox();
  else if (p[0] === 'devices' && isEditor()) html = viewDevices();
  else if (p[0] === 'capsules' && isEditor()) html = viewCapsules();
  else if (p[0] === 'find') html = viewFind();
  else if (p[0] === 'snap' && isEditor()) html = viewSnap(p);   // a book from photos (docs/SNAP-BOOK.md)   // P0 of docs/SNAP-BOOK.md: what this phone hands over from its photos (not linked)
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
  const fp = document.getElementById('fpick'), host = app.querySelector('[data-fpick]'); if (fp && host) { fp.dataset.t = host.dataset.t; fp.dataset.d = host.dataset.d; }   // (the place a "where was it?" chip set stays: a background redraw while the phone's gallery is open must not drop it)
  if (typeof hydrateColours === 'function') hydrateColours(app);   // kid.js loads after this file
  ppTabsShow(app);
  if (enter && p[3] === 'full' && p[4] !== undefined) setTimeout(() => { const el = document.getElementById(`pg-${p[2]}-${p[4]}`); if (el && !el.closest('.tp.one')) el.scrollIntoView(); }, 0);   // after the router's scroll-to-top   // a glance card opens the report on its section
  if (p[2] === 'log' && p[4] === 'ai' ? aiOpened !== location.hash && (aiOpened = location.hash) : (aiOpened = null)) setTimeout(() => { const el = document.getElementById('aipanel'); if (el) { el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); } }, 60);   // the 21:30 reminder: open at tonight's Claude panel
  if (enter && p[2] === 'book' && p[3] === 'd') { const el = document.getElementById('d' + p[4]); if (el) el.scrollIntoView(); }   // #/t/<trip>/book/d/<i> opens on that day
}
// wide screens: today's boxes and the passport's pages go into two columns chosen by their real heights (any language, any day),
// so neither column ends far short of the other
function packBoxes(root) {
  root.querySelectorAll('.cgrid, .pp').forEach((g) => {
    const boxes = [...g.querySelectorAll(':scope > section, :scope > .ccol > section')];
    boxes.forEach((b, i) => { if (b._o === undefined) b._o = i; }); boxes.sort((a, b) => a._o - b._o);   // the order they were written in, however often they are packed again
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
// A fold opened or closed inside a packed grid (owner, Nov 2026: on a wide screen an opened box left the other column ending far short of it):
// the boxes are dealt again by their heights as they are now — without anything moving under the finger. One fold: the box that was tapped and
// every box written before it keep their columns, so it stays exactly where it is on the screen (a first version also moved the boxes above
// it and scrolled the page by the difference: the tapped box still jumped by 60–500 px in the measurements); only the boxes after it change
// sides, and only for 100 px or more of gain. Several folds at once (`box` null: the "Short · Full" switch, which sits above
// the grid): a free deal, the best split. A box changes column by being put in its place in the order the boxes were written in; the others
// are not touched, so the focus and an open list's scroll stay.
function repack(g, box) {
  if (!g.classList.contains('packed')) { packBoxes(g.parentNode || document); return; }
  const cols = [...g.querySelectorAll(':scope > .ccol')], boxes = [...g.querySelectorAll(':scope > .ccol > section')].sort((a, b) => a._o - b._o);
  const h = boxes.map((b) => b.offsetHeight), all = h.reduce((n, x) => n + x, 0), cur = boxes.map((b) => cols.indexOf(b.parentNode)), k = boxes.indexOf(box);
  const cost = (side) => { const r = h.reduce((n, x, i) => n + (side(i) ? x : 0), 0); return Math.max(r, all - r); };
  const deal = (keep) => { let b = null; for (let m = 0; m < 1 << boxes.length; m += 2) { if (cur.some((c, i) => keep(i) && (m >> i & 1) !== c)) continue; const c = cost((i) => m >> i & 1); if (!b || c < b.cost) b = { m, cost: c }; } return b; };   // the first box stays on the left
  const now = cost((i) => cur[i]), best = deal((i) => i <= k), free = k >= 0 ? deal((i) => i === k) : null;   // up to the tapped one nothing changes sides · only the tapped one stays
  const put = (m) => boxes.forEach((b, i) => { const to = cols[m >> i & 1]; if (to !== b.parentNode) to.insertBefore(b, [...to.children].find((x) => x._o > b._o) || null); });
  // Chromium keeps its "scroll anchor" (the first box it sees on the screen) still by scrolling the page: when that anchor is a box that changes
  // column here, the page scrolls with it and the fold just tapped jumps. So the anchoring is off while the boxes move (Safari has none).
  const root = document.documentElement, done = () => { void g.offsetHeight; requestAnimationFrame(() => { root.style.overflowAnchor = ''; }); };
  // A big box written late ("eat along the route · 42 places") cannot be balanced by the boxes after it. Then the boxes above it move too and
  // the page is scrolled by exactly what the tapped box moved, so it stays where it is on the screen — tried, and taken back when the page
  // cannot scroll that far (the tapped box would jump): then the careful deal below stands.
  if (free && best && best.cost - free.cost >= 300) {
    const at = box.getBoundingClientRect().top, y0 = scrollY; root.style.overflowAnchor = 'none';
    put(free.m); scrollBy(0, box.getBoundingClientRect().top - at);
    if (Math.abs(box.getBoundingClientRect().top - at) <= 1) { done(); return; }
    put(cur.reduce((m, c, i) => m | (c << i), 0)); scrollTo(0, y0);
  }
  if (!best || now - best.cost < (k >= 0 ? 100 : 1)) { done(); return; }
  root.style.overflowAnchor = 'none'; put(best.m); done();
}
let packQ = new Map(), packR = 0;   // the folds toggled in this frame, by grid
document.addEventListener('toggle', (e) => {
  const d = e.target; if (!d || !d.classList) return;
  if (d.classList.contains('dmore')) { if (d.open) packBoxes(d); return; }   // the day's folded glance: pack once it is open (closed boxes measure 0)
  const g = d.closest('.cgrid'); if (!g) return;
  const box = [...g.querySelectorAll(':scope > .ccol > section, :scope > section')].find((b) => b.contains(d));
  if (!packQ.has(g)) packQ.set(g, []); packQ.get(g).push(box);
  if (!packR) packR = requestAnimationFrame(() => { packR = 0; const q = packQ; packQ = new Map(); q.forEach((bs, gr) => { if (gr.isConnected) repack(gr, new Set(bs).size === 1 ? bs[0] : null); }); });
}, true);
if (document.fonts) document.fonts.ready.then(() => packBoxes(document));
const mapLegacy = (id) => { const t = trips().find((x) => x.id === id || x.legacy_id === id); return t && t.id; };

function topBar(t, p) {
  const sub = t && p[2] && p[2] !== 'hub';
  const up = !t ? null : ['stays', 'sos', 'prep', 'learn', 'plan'].includes(p[2]) && p[3] === 'full' ? [`#/t/${esc(t.id)}/${p[2]}`, L('หน้าสรุป', 'Summary')]
    : p[2] === 'eat' && p[3] === 'all' ? [`#/t/${esc(t.id)}/eat`, L('ร้านอาหารทีละวัน', 'Places to eat, day by day')]
    : sub ? [`#/t/${esc(t.id)}`, L('เมนูเล่ม', 'Book menu')] : ['#/', L('ชั้นหนังสือ', 'Bookshelf')];
  const back = t ? `<a class="ibtn" href="${up[0]}" aria-label="${up[1]}">${ic('back')}</a>`
    : p && ['explore', 'eats'].includes(p[0]) && p[1] ? `<a class="ibtn" href="#/${p[0]}" aria-label="${L('ทุกเมือง', 'All towns')}">${ic('back')}</a>`
    : p && p[0] && p[0] !== 'start' ? `<a class="ibtn" href="#/" aria-label="${L('ชั้นหนังสือ', 'Bookshelf')}">${ic('back')}</a>` : '';
  const secName = sub ? (p[2] === 'log' ? L('บันทึก', 'Record') : secTitle(p[2]) || esc(t.theme.kicker || '')) : '';
  const ttl = t && sub ? `<small>${secName}</small>${esc(T(t.title).split(' · ').pop())}` : `<small>${esc(kicker())}</small>${esc(appName())}`;   // the place, not the long brand name: it fits a phone's bar
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
  const lg = [['th', 'ก', 'ไทย'], ['en', 'A', 'English']].map(([v, g, nm]) => `<button type="button" class="tpo" data-a="lang" data-v="${v}" aria-pressed="${lang === v}"><span class="gl" aria-hidden="true">${g}</span><b>${nm}</b><span class="ck" aria-hidden="true">✓</span></button>`).join('');
  const fs = FS_NAMES.map(([th, en], i) => `<button type="button" class="tpo" data-a="fs" data-v="${i}" aria-pressed="${n === i}"><span class="gl" aria-hidden="true">Aa</span><b>${L(th, en)}</b><span class="ck" aria-hidden="true">✓</span></button>`).join('');
  return `<div class="part">${L('ภาษาและตัวอักษร', 'Language and text')}</div>
<div class="setlist disp">
<div class="setrow">${hubE('lang')}<span><b>${L('ภาษา', 'Language')}</b><small>${L('ทั้งแอป เตือนความจำตามภาษานี้ด้วย', 'The whole app; reminders follow it')}</small></span><div class="tpk dispk lgk" role="group" aria-label="${L('ภาษา', 'Language')}">${lg}</div></div>
<div class="setrow">${hubE('textsize')}<span><b>${L('ขนาดตัวอักษร', 'Text size')}</b><small id="fsname">${L(FS_NAMES[n][0], FS_NAMES[n][1])}</small></span><div class="tpk dispk fsk fsseg" role="group" aria-label="${L('ขนาดตัวอักษร', 'Text size')}">${fs}</div></div>
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
      item('firsts', `#/t/${esc(c.id)}/firsts`, 'firsts', L('ครั้งแรก', 'Firsts'))];   // the passports open from the shelf's cards (one passport, one door for grown-ups)
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
${BRAND && BRAND.passkey && window.PublicKeyCredential ? `<button type="button" class="btn pkbtn" data-a="pklogin"><img src="/art/hub/passkey.webp" alt="" draggable="false">${L('เข้าด้วยลายนิ้วมือหรือใบหน้า', 'Sign in with fingerprint or face')}</button><p class="pkor">${L('หรือใส่รหัส', 'or type the code')}</p>` : ''}
<label for="lcode">${L('รหัสครอบครัว', 'Family PIN')}</label>
<input id="lcode" class="field pin" type="password" inputmode="numeric" autocomplete="current-password" required aria-describedby="lerr">
<div class="pinpad" role="group" aria-label="${L('แป้นตัวเลข', 'Number pad')}">${keys.map((k) => `<button type="button" data-a="pin" data-v="${k}" aria-label="${k === 'clear' ? L('ล้าง', 'Clear') : k === 'back' ? L('ลบ', 'Delete') : k}"><img src="/art/keypad/${k}.webp" alt="" draggable="false"></button>`).join('')}</div>
<div class="row lgo"><button class="btn" type="submit">${L('เข้าสมุด', 'Open the shelf')}</button>
<span class="row" style="gap:8px">${langSeg()}<button type="button" class="ibtn fsb" data-a="fs" data-l="${+ls('fs') || 0}" aria-label="${L('ขนาดตัวอักษร', 'Text size')}">Aa</button></span></div>
<div class="err" id="lerr" role="alert"></div>
<p class="label" style="margin-top:6px"><a href="#/help">${L('คู่มือใช้งาน', 'How to use it')}</a> · <a href="#/privacy">${L('ความเป็นส่วนตัวและข้อมูลของคุณ', 'Privacy and your data')}</a> · ${L('ใส่รหัสครั้งเดียว เครื่องนี้จำไว้ · ญาติใช้รหัสจากพ่อแม่ แล้วพิมพ์ชื่อที่ "ชื่ออื่น"', "Enter the PIN once — this phone remembers it · Relatives use the view-only PIN from Mum or Dad and type their name under “Other name”")}</p></form></div>`;
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
  const add = isEditor() ? `<div class="spine add"><div class="addhd"><b class="addplus" aria-hidden="true">＋</b><div><h3>${L('เล่มใหม่', 'New book')}</h3><small>${L('เริ่มได้หลายแบบ', 'Several ways to start')}</small></div></div>
<a class="addway main pz" style="--g1:${PG.pink}" href="#/snap">${hubE('snapcam')}<span><b>${L('เล่มจากรูป', 'A book from photos')}</b><small>${L('เลือกรูปของทริป แอปจัดวันและสถานที่ให้ · ไม่ต้องวางแผนก่อน', 'Pick the trip’s photos — the app sorts the days and places · no plan needed')}</small></span><i>›</i></a>
${pdf ? `<a class="addway pz plango" style="--g1:${PG.purple}" href="#/planner">${hubE('famap')}<span><b>${L('วางแผนกับผู้ช่วย', 'Plan with the helper')}</b><small>${L('ตอบไม่กี่ข้อ ผู้ช่วยร่างเส้นทางแล้วเขียนทั้งเล่มให้ · ยังไม่ต้องมีแผน', 'Answer a few questions — the helper drafts the route, then writes the whole book · no plan needed yet')}</small></span><i>›</i></a>` : ''}
${pdf ? `<a class="addway pz" style="--g1:${PG.blue}" href="#/import">${hubE('manual')}<span><b>${L('จากคู่มือทริป (PDF)', 'From the trip manual (PDF)')}</b><small>${L('ผู้ช่วยอ่านคู่มือแล้วทำแผนรายวัน ร้าน และหน้าของเด็กให้ · ราว 5–10 นาที', 'The helper reads the manual and makes the day plans, places to eat and the kids’ pages · about 5–10 min')}</small></span><i>›</i></a>` : ''}
${S.trips.some((t) => t.id === 'sakura-hop-2028') ? '' : `<button type="button" class="addway pz" style="--g1:${PG.gold}" data-a="sample">${hubE('book')}<span><b>${L('เล่มตัวอย่าง', 'A sample book')}</b><small>${L('ทริปสมมติ 6 วันที่เติมไว้แล้ว ลบได้ทุกเมื่อ', 'A filled-in 6-day trip, delete it any time')}</small></span><i>›</i></button>`}
<button type="button" class="addway pz" style="--g1:${PG.teal}" data-a="newtrip">${hubE('pencil')}<span><b>${L('เล่มเปล่า', 'An empty book')}</b><small>${L('ใส่ชื่อทริปกับวันที่ แล้วค่อยเติมเอง', 'Type the trip name and dates, fill it in as you go')}</small></span><i>›</i></button></div>` : '';
  const welcome = isEditor() && !children().length ? `<a class="famwelcome" href="#/start"><span>${ic('family')}</span><div><b>${L('เริ่มที่ครอบครัวของเรา', 'Start with your family')}</b><small>${L('ตั้งชื่อแอป ใส่ชื่อลูก เลือกตัวการ์ตูน — ทุกหน้าจะเป็นของบ้านเรา', "Name the app, add the children and pick each one's character — every page becomes yours")}</small></div></a>` : '';
  return `${remindAsk()}${heroHtml()}${welcome}<div class="part">${L('ชั้นหนังสือ', 'The bookshelf')}</div><h1 class="h2">${L(kicker() ? `ทุกทริป${esc(kicker())}` : 'ทุกทริปของเรา', 'Every trip, one book each')}</h1>
<p class="lede">${L('เติมระหว่างเที่ยว แล้วเปิดอ่านได้อีกหลายปี', 'Fill it in on the road, reread it for years.')}</p>
<div class="shelf">${books}${add}</div>
<div class="part">${L('พาสปอร์ตนักผจญภัย', 'The kids’ passports')} 🛂</div>
<div class="ppmini">${children().map((k) => { const n = passportStamps(k.slug); return `<a class="ppc s kid-${esc(k.slug)}" href="#/passport/${esc(k.slug)}"><span class="emb">${kidArt(k.slug) ? `<img src="${kidArt(k.slug)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตนักผจญภัย', 'Adventure passport')}</b><span class="nm">${esc(kidName(k.slug))}</span><small>${n ? `${n} ${L('ตราประทับ', n === 1 ? 'stamp' : 'stamps')}` : L('ตราประทับรอหนูอยู่', 'Stamps are waiting')}</small></a>`; }).join('')}</div>
${isEditor() && (inboxLoad(), (INBOX.items || []).length) ? `<a class="nbcard ibcard" href="#/inbox"><span class="emb">${hubIc('camera')}</span><div><b>${L(`ญาติส่งรูปมา ${INBOX.items.length} รูป`, `${INBOX.items.length} photo${INBOX.items.length > 1 ? 's' : ''} from the family`)}</b><small>${L('ดูก่อนว่าจะใส่ในเล่มไหม', 'Look before they go in a book')}</small></div><span class="arrow">›</span></a>` : ''}
${S.trips.length ? `<div class="part">${L('ทุกเล่มรวมกัน', 'All our books')}</div>
<a class="nbcard findcard" href="#/find"><span class="emb">${hubIc('find')}</span><div><b>${L('ค้นความทรงจำทุกเล่ม', 'Search every book')}</b><small>${L('เช่น "หิมะครั้งแรก" "ช้าง" "ทะเล" — คำพูด ครั้งแรก รูป และบันทึก', 'e.g. "first snow", "elephant", "beach" — words, firsts, photos and notes')}</small></div><span class="arrow">›</span></a>
${isEditor() ? `<a class="nbcard" href="#/capsules"><span class="emb">${hubIc('letter')}</span><div><b>${L('จดหมายเปิดในอนาคต', 'Letters for the future')}</b><small>${L('เขียนถึงลูก ปิดผนึก แล้วแอปเตือนให้เปิดในวันที่ตั้งไว้', 'Write to the children, seal it, and the app tells you when it may be opened')}</small></div><span class="arrow">›</span></a>` : ''}
<a class="nbcard" href="#/map"><span class="emb">${hubIc('famap')}</span><div><b>${L('แผนที่ของครอบครัว', 'Our family map')}</b><small>${L('ทุกที่ที่เคยไป และตอนนั้นลูกอายุเท่าไร', 'Everywhere we have been, and how old the children were')}</small></div><span class="arrow">›</span></a>
<a class="nbcard" href="#/year/${yearOfNow()}"><span class="emb">${hubIc('year')}</span><div><b>${L(`ปี ${yearOfNow()} ของเรา`, `Our ${yearOfNow()}`)}</b><small>${L('ทุกทริปของปีเป็นเล่มเดียว เห็นลูกโตขึ้นทีละทริป', 'Every trip of the year in one book — the children growing trip by trip')}</small></div><span class="arrow">›</span></a>` : ''}
<div class="part">${L('สำหรับทริปหน้า', 'For the next trip')}</div>
<a class="nbcard" href="#/notebook"><span class="emb">${hubIc('notebook')}</span><div><b>${L('สมุดโน้ตนักเดินทาง', 'Travel notebook')}</b><small>${S.reviews.length ? L(`${S.reviews.length} รีวิว · ที่พัก ร้านอาหาร สถานที่ — ไว้วางแผนทริปหน้า`, `${S.reviews.length} reviews · stays, food, places — for planning the next trip`) : L('ให้ดาว ติดแท็ก จดว่าอะไรที่ครอบครัวเราชอบ — ไว้วางแผนทริปหน้า', 'Stars, tags and notes on what worked for our family — for planning the next trip')}</small></div><span class="arrow">›</span></a>
${isEditor() ? tasteCard() : ''}
${isEditor() ? `<a class="nbcard eatlibcard" href="#/eats"><span class="emb">${hubIc('eat')}</span><div><b>${L('คลังร้านอาหาร', 'Places to eat — our library')}</b><small>${L('ร้านจากทุกเล่ม และร้านที่ผู้ช่วยหาแล้วเช็กกับเว็บ — ไว้วางแผนทริปหน้า', 'The places from every book, and ones the helper found and checked — for planning the next trip')}</small></div><span class="arrow">›</span></a>` : ''}
${isEditor() ? `<a class="nbcard explorecard" href="#/explore"><span class="emb">${hubIc('plan')}</span><div><b>${L('สำรวจเมือง', 'Explore a town')}</b><small>${L('ที่เที่ยวที่เช็กกับเว็บแล้ว เหมาะกับอายุลูก ร้านอาหาร และที่ที่เราอยากไป', 'Things to do checked on the web, for our children’s ages, places to eat and our wish list')}</small></div><span class="arrow">›</span></a>` : ''}
${isEditor() ? backupCard() : ''}
<a class="nbcard helpcard" href="#/help"><span class="emb">${hubIc('manual')}</span><div><b>${L('คู่มือใช้งาน', 'How to use the app')}</b><small>${L('ทีละเรื่อง: เริ่มใช้ ระหว่างทริป พาสปอร์ต โหมดเด็ก ญาติ', 'One job at a time: starting, on the trip, the passport, kid mode, the family')}</small></div><span class="arrow">›</span></a>
${dispCard()}
${isEditor() ? `<div class="part">${L('ตั้งค่า', 'Settings')} <img class="partpic" src="/art/hub/settings.webp" alt=""></div>
<nav class="setlist">
<a href="#/family">${hubE('family')}<span><b>${L('ครอบครัวของเรา', 'Our family')}</b><small>${L('ชื่อแอป ชื่อลูก และเดือนเกิด', 'App name, the children and their birth months')}</small></span><i>›</i></a>
<a href="#/emoji">${hubE('emoji')}<span><b>${L('อีโมจิของเรา', 'Our emoji')}</b><small>${L(`${emoRows().length} รูป เพิ่มหรือลบได้`, `${emoRows().length} pictures, add or delete`)}</small></span><i>›</i></a>
<a href="#/viewers">${hubE('relatives')}<span><b>${L('ญาติที่ดูได้', 'Who can see the books')}</b><small>${L('รหัสและลิงก์ของแต่ละกลุ่มญาติ', 'A code and a link for each group of relatives')}</small></span><i>›</i></a>
<a href="#/snaptest">${hubE('checkphone')}<span><b>${L('ตรวจเครื่องนี้', 'Check this phone')}</b><small>${L('ลองว่ารูป คลิป และการส่งต่อ ใช้ได้บนเครื่องนี้ไหม', 'Do photos, clips and sharing work on this phone?')}</small></span><i>›</i></a>
<a href="#/devices">${hubE('devices')}<span><b>${L('มือถือที่เข้าระบบ', 'Phones signed in')}</b><small>${L('ดูว่าเครื่องไหนเปิดเล่มได้ ให้เครื่องที่หายออก เปลี่ยนรหัส', 'See which phones hold the books, sign a lost one out, change the code')}</small></span><i>›</i></a>
<a href="#/health">${hubE('room')}<span><b>${L('พื้นที่และปัญหาบนมือถือ', 'Room and phone problems')}</b><small>${L('รูปและคลิปใช้ที่ไปเท่าไร มีอะไรพังบนเครื่องไหนไหม', 'How much room photos and clips take, anything that broke on a phone')}</small></span><i>›</i></a>
<a href="#/privacy">${hubE('privacy')}<span><b>${L('ความเป็นส่วนตัวและข้อมูล', 'Privacy and your data')}</b><small>${L('เก็บอะไร ใครเห็น ขอสำเนา หรือลบทั้งหมด', 'What is kept, who sees it, take a copy or delete everything')}</small></span></a>
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
const aiToday = () => { const u = aiUsage(); return u && u.today.calls ? L(`ผู้ช่วยวันนี้ ${u.today.calls}/${u.limit} ครั้ง`, `Helper today ${u.today.calls}/${u.limit}`) : ''; };
const tok = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(Math.round(n)));
/* The year (owner, Nov 2026: "สรุปทั้งปี … ทั้งแบบคลิปและหนังสือรวมทุกทริป พร้อมตัวการ์ตูนเด็กที่โตขึ้นตามอายุในแต่ละทริป"): every
   book that starts in a year, as one book — a cover, the year in numbers with the children as they were on each trip (the drawing of
   that book's time: kidArt(slug, full, t) picks the drawing made before the trip ended), a page per trip (its best photos, a kid's
   words, its firsts) and an end. #/year/<y> shows it in the app (the same A4 pages, like the print preview), #/printyear/<y> is what
   the server prints (GET /api/b/pdf-year/:y, editors) and #/reelyear/<y>/… the cards of the year's film (POST /api/b/reel-year/:y). */
const yearTrips = (y) => S.trips.filter((t) => String(t.date_from || '').slice(0, 4) === String(y)).sort((a, b) => String(a.date_from).localeCompare(String(b.date_from)));
const yearList = () => [...new Set(S.trips.map((t) => String(t.date_from || '').slice(0, 4)).filter((x) => /^\d{4}$/.test(x)))].sort();
const yearOfNow = () => { const ys = yearList(), now = String(new Date().getFullYear()); return ys.includes(now) ? now : ys[ys.length - 1] || now; };
const yearShots = (t, n) => { const ph = mediaOf(t.id).filter((m) => !/^dr-/.test(m.id)); const fav = ph.filter((m) => m.highlight); return fav.concat(ph.filter((m) => !m.highlight)).slice(0, n); };
const yearQuote = (t) => entriesOf(t.id).filter((e) => e.kind === 'quote' && e.text).sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) || a.at - b.at)[0];
function yearAges(t) {   // the children on that trip: their drawing of the time, and how old they were when it started
  const kids = (t.theme.children || []).map((k) => k.slug).filter((k) => children().some((c) => c.slug === k));
  return kids.map((k) => { const c = children().find((x) => x.slug === k), art = kidArt(k, true, t);
    let age = ''; if (c && /^\d{4}-\d{2}$/.test(c.birth_ym || '') && t.date_from) { const [y, m] = t.date_from.split('-').map(Number), [by, bm] = c.birth_ym.split('-').map(Number), mo = (y - by) * 12 + m - bm; if (mo >= 0) age = famAgeM(mo); }
    return `<figure class="ygrow">${art ? `<img src="${esc(art)}" alt="">` : ''}<figcaption><b>${esc(kidName(k))}</b>${age ? `<small>${esc(age)}</small>` : ''}</figcaption></figure>`; }).join('');
}
function viewYearBook(y, print) {
  const ts = yearTrips(y); if (!ts.length) return emptyCard(null, L(`ปี ${y} ยังไม่มีเล่ม`, `No books in ${y} yet`), '');
  let pgn = 0; const pg = (cls, inner) => `<section class="pg ${cls}" style="--ph:var(--k${(pgn++ % 6) + 1})">${inner}</section>`;
  const head = (kicker, title, e) => `<header class="pghd">${e ? `<span class="pge" aria-hidden="true">${e}</span>` : ''}<div><div class="kicker">${kicker}</div><h2>${title}</h2></div></header>`;
  const slugs = [...new Set(ts.flatMap((t) => (t.theme.children || []).map((k) => k.slug)))];
  const sum = (f) => ts.reduce((s, t) => s + f(t), 0), st = ts.map(stats);
  const towns = new Set(famPins('').filter((p) => ts.some((t) => t.id === p.trip)).map((p) => T(p.name))).size;
  const facts = [[L('เล่ม', 'Books'), ts.length], [L('วันเดินทาง', 'Days away'), sum((t) => t.days.length)], [L('รูป', 'Photos'), st.reduce((s, x) => s + x.photos, 0)], [L('คำพูด', 'Quotes'), st.reduce((s, x) => s + x.quotes, 0)], [L('ครั้งแรก', 'Firsts'), st.reduce((s, x) => s + x.firsts, 0)], [L('เมือง', 'Towns'), towns], [L('หัวใจจากญาติ', 'Hearts'), sum((t) => heartsOf(t.id).length)]].filter(([, v]) => v);
  const cover = pg('cover yrcover', `<div class="yrc"><div class="kicker">${esc(appName())}</div><h1>${L(`ปี ${y}`, String(y))}</h1><p class="yrsub">${esc(L(`ของ${kidsNames()}`, `with ${kidsNames()}`))}</p>
<div class="yrarts">${ts.map((t) => `<figure>${artImg(t, 0)}<figcaption>${esc(T(t.title).split(' · ')[0])}</figcaption></figure>`).join('')}</div>${castHtml(slugs)}</div>`);
  const numbers = pg('yrnum', `${head(L('ปีนี้ในตัวเลข', 'The year in numbers'), L(`ปี ${y}`, String(y)), '🎉')}
<div class="facts">${facts.map(([l, v]) => `<div class="fact"><span class="label">${l}</span><b>${v}</b></div>`).join('')}</div>
<h3 class="yrh">${L('เราโตขึ้นทุกทริป', 'We grew trip by trip')}</h3>
<div class="yrgrowl">${ts.map((t) => `<div class="yrgrow"><p><b>${esc(T(t.title).split(' · ')[0])}</b><small>${esc(fmtRange(t))}</small></p><div class="ygrows">${yearAges(t)}</div></div>`).join('')}</div>`);
  const trips = ts.map((t) => { const ph = yearShots(t, 4), q = yearQuote(t), fs = entriesOf(t.id).filter((e) => e.kind === 'first').slice(0, 6);
    return pg('yrtrip', `${head(esc(fmtRange(t)), esc(T(t.title).split(' · ')[0]), '📖')}
${ph.length ? `<div class="yrph n${ph.length}">${ph.map((m, k) => `<figure style="--r:${[-2, 1.5, -1, 2][k]}deg"><img src="${esc(print ? imgF(m) : imgT(m))}" alt=""></figure>`).join('')}</div>` : `<div class="yrarts one">${artImg(t, 0)}</div>`}
${q ? `<blockquote class="yrq">“${esc(q.text)}”${q.child && q.child !== 'both' ? `<cite>— ${esc(kidName(q.child))}</cite>` : ''}</blockquote>` : ''}
${fs.length ? `<ul class="yrfirst">${fs.map((e) => { const f = firstLabel(t, e.first_key); return `<li>${esc(f.e)} ${esc(e.text || f.t)}</li>`; }).join('')}</ul>` : ''}
${print ? '' : `<p><a class="linkbtn" href="#/t/${esc(t.id)}/book">${L('เปิดเล่มนี้', 'Open this book')} ›</a></p>`}`); }).join('');
  const end = pg('yrend', `<div class="yrc">${castHtml(slugs)}<h2>${L('แล้วเจอกันปีหน้านะ!', 'See you next year!')}</h2><p class="yrsub">${esc(appName())}</p></div>`);
  return `<div class="kbook age-${esc(bookAgeAuto(ts[ts.length - 1]))} yrbook">${cover}${numbers}${trips}${end}</div>`;
}
function viewYear(y0) {
  famLoad();
  const ys = yearList(), y = /^\d{4}$/.test(y0) && ys.includes(y0) ? y0 : yearOfNow(), ts = yearTrips(y);
  const chips = ys.length > 1 ? `<div class="chips fmchips" role="group" aria-label="${L('ปี', 'Year')}">${ys.map((x) => `<a class="chip" href="#/year/${x}" aria-pressed="${x === y}">${L(`ปี ${x}`, x)}</a>`).join('')}</div>` : '';
  const ed = isEditor(), yr = (YEAR.reels || {})[y], job = typeof reelJob !== 'undefined' && reelJob && reelJob.trip === 'year:' + y ? reelJob : null;
  const film = !ed || !ts.length ? '' : `<section class="reelbox yrfilm"><div class="part">${L('คลิปทั้งปี', 'The year in a film')} 🎬</div>
${yr ? `<video class="reelvid" controls playsinline preload="metadata" src="/media/reel-year/${y}?v=${esc(yr.v)}"></video><div class="row reelrow"><a class="btn ghost small" href="/media/reel-year/${y}?v=${esc(yr.v)}&dl=1" download>${L('เก็บลงเครื่อง', 'Save to phone')}</a></div>` : ''}
${job && job.state === 'run' ? `<p class="reelrun">${L('กำลังทำคลิป', 'Making the film')} <b id="reelpct">${job.pct || 0}%</b></p>` : `${reelMoodPick()}<button type="button" class="${yr ? 'linkbtn' : 'btn wide'}" data-a="yearreel" data-v="${y}">${yr ? L('ทำคลิปทั้งปีใหม่', 'Make it again') : L('ทำคลิปทั้งปี', 'Make the year’s film')}</button>`}
${job && job.state === 'error' ? `<p class="notice">${L('ทำคลิปไม่สำเร็จ ลองอีกครั้ง', 'The film could not be made — try again')}</p>` : ''}</section>`;
  const pdf = ed && ts.length ? `<div class="row"><a class="btn" href="/api/b/pdf-year/${y}" download>${ic('book')} ${L('หนังสือทั้งปี (PDF)', 'The year’s book (PDF)')}</a></div>` : '';
  if (ed && !YEAR.at) yearLoad();
  return `${pageHead('year', PG.purple, L('ทุกเล่มรวมกัน', 'All our books'), L(`ปี ${y} ของเรา`, `Our ${y}`), L('ทุกทริปของปีเป็นเล่มเดียว เห็นลูกโตขึ้นทีละทริป', 'Every trip of the year in one book — the children growing trip by trip'))}${chips}${film}${pdf}${viewYearBook(y, false)}`;
}
const YEAR = { reels: null, at: 0 };
function yearLoad() { YEAR.at = Date.now(); api('GET', '/api/b/reel-year').then((r) => { YEAR.reels = r.years || {}; if (route().parts[0] === 'year') safeRender(); }).catch(() => {}); }
// the year film's cards: the year, a card per book (its picture, its name, the children as they were), the end
function viewYearCards(y, ts) {
  const slugs = [...new Set(ts.flatMap((t) => (t.theme.children || []).map((k) => k.slug)))];
  const cast = (t) => { const ks = slugs.filter((k) => kidArt(k, true, t)); return ks.length ? `<div class="rkids">${ks.map((k) => `<figure><img src="${esc(kidArt(k, true, t))}" alt=""><figcaption>${esc(kidName(k))}</figcaption></figure>`).join('')}</div>` : ''; };
  return `<div class="rcard rtitle"><div class="rconf" aria-hidden="true"></div><div class="rarts">${ts.slice(0, 4).map((t) => (dayArt(t, 0) ? `<img src="${esc(dayArt(t, 0))}" alt="">` : '')).join('')}</div>
<h1>${L(`ปี ${y} ของเรา`, `Our ${y}`)}</h1><p class="rdate">${esc(L(`${ts.length} ทริปของ${kidsNames()}`, `${ts.length} trip${ts.length > 1 ? 's' : ''} with ${kidsNames()}`))}</p></div>
${ts.map((t) => `<div class="rcard rday"><div class="rconf" aria-hidden="true"></div><p class="rnum">${esc(fmtRange(t))}</p>${dayArt(t, 0) ? `<img class="rart" src="${esc(dayArt(t, 0))}" alt="">` : ''}<h2>${esc(T(t.title).split(' · ')[0])}</h2>${cast(t)}</div>`).join('')}
<div class="rcard rend"><div class="rconf" aria-hidden="true"></div>${cast(ts[ts.length - 1] || null)}<h2>${L('แล้วเจอกันปีหน้านะ!', 'See you next year!')}</h2><p class="rapp">${esc(appName())}</p></div>`;
}
/* The family map (owner, Nov 2026: "แผนที่ของครอบครัว"; server/famap.js): every town of every book on one drawn map — the land is
   Natural Earth's (public/geo/land.json, scripts/geo/land.mjs), drawn on the phone, no map service. A pin per town per book in
   the book's colour, with the town's stamp from the library; a tap shows the town, the book, when, and how old each child was then.
   Chips pick one book (the map fits it) or every book. The kids open it from their own map page too (kid.js, view "world"). */
const FM = { pins: null, land: null, busy: false, at: 0, pick: null };
function famLoad() {
  if (FM.busy || (FM.pins && Date.now() - FM.at < 300e3)) return;
  FM.busy = true; FM.at = Date.now();   // asked now: no signal must not mean asking again on every redraw
  if (!FM.pins) { const c = ls('famap'); if (c && Array.isArray(c.pins)) FM.pins = c.pins; }
  Promise.all([
    api('GET', '/api/b/famap').then((r) => { FM.pins = r.pins || []; ls('famap', { pins: FM.pins }); }).catch(() => { if (!FM.pins) FM.pins = []; }),
    FM.land ? null : fetch('/geo/land.json').then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && Array.isArray(j.r)) FM.land = j; }).catch(() => {}),
  ]).finally(() => { FM.busy = false; const r = route().parts; if (r[0] === 'map' || (r[0] === 'kid' && r[2] === 'world')) safeRender(); });
}
// the pins a map shows: one book's, or every book's the viewer can see
const famPins = (tid) => (FM.pins || []).filter((p) => trip(p.trip) && (!tid || p.trip === tid));
// what a map shows: a book's pins (or all), and inside them the bubble the child or parent zoomed into
const famShown = (tid) => { const all = famPins(tid), z = FM.zoom; if (!z || z.tid !== tid) return all; const sub = all.filter((p) => z.ids.includes(p.trip + '|' + p.id)); return sub.length ? sub : all; };
// "มีมี่ 3 ขวบ · มีก้า 1 ขวบครึ่ง" on a date (YYYY-MM-DD) from each child's month of birth
function famAgesOn(date) {
  if (!/^\d{4}-\d{2}/.test(date || '')) return '';
  const [y, m] = date.split('-').map(Number);
  return children().map((k) => { if (!/^\d{4}-\d{2}$/.test(k.birth_ym || '')) return ''; const [by, bm] = k.birth_ym.split('-').map(Number), mo = (y - by) * 12 + m - bm; return mo >= 0 ? `<span class="nowrap">${esc(kidName(k.slug))} ${esc(famAgeM(mo))}</span>` : ''; }).filter(Boolean).join(' · ');
}
// the map itself: an SVG fitted to the pins (equirectangular, squeezed by the middle latitude), the land rings that touch it
function famSvg(pins, sel, big) {
  const land = FM.land;
  let la0 = 90, la1 = -90, lo0 = 180, lo1 = -180;
  for (const p of pins) { la0 = Math.min(la0, p.ll[0]); la1 = Math.max(la1, p.ll[0]); lo0 = Math.min(lo0, p.ll[1]); lo1 = Math.max(lo1, p.ll[1]); }
  if (!pins.length) { la0 = -10; la1 = 40; lo0 = 90; lo1 = 155; }
  const mid = (la0 + la1) / 2, kx = Math.cos(mid * Math.PI / 180);
  let w = Math.max(3, (lo1 - lo0) * kx), h = Math.max(3, la1 - la0);
  const pad = Math.max(w, h) * 0.18 + 1.2; w += 2 * pad; h += 2 * pad;
  if (h / w > 1.25) w = h / 1.25; if (h / w < 0.62) h = w * 0.62;
  const cx = ((lo0 + lo1) / 2) * kx, cy = -mid, W = 1000, H = Math.round(1000 * h / w), sc = W / w;
  const X = (lon) => ((lon * kx - cx) * sc + W / 2), Y = (lat) => ((-lat - cy) * sc + H / 2);
  const box = [lo0 - pad / kx - 2, lo1 + pad / kx + 2, la0 - pad - 2, la1 + pad + 2];
  let paths = '';
  if (land) for (const r of land.r) {
    let x = r[0], y = r[1], minx = x, maxx = x, miny = y, maxy = y; const pts = [[x, y]];
    for (let k = 2; k < r.length; k += 2) { x += r[k]; y += r[k + 1]; pts.push([x, y]); if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    const q = land.q; if (maxx / q < box[0] || minx / q > box[1] || maxy / q < box[2] || miny / q > box[3]) continue;
    paths += 'M' + pts.map(([a, b]) => `${X(a / q).toFixed(1)} ${Y(b / q).toFixed(1)}`).join('L') + 'Z';
  }
  const R = big ? 34 : 24;
  // pins closer than two pins' width on this map become one bubble with a number: a tap zooms into them (famzoom), so no pin hides
  // another; a label is drawn only where it has room
  const at = pins.map((p) => [X(p.ll[1]), Y(p.ll[0])]), groups = [];
  pins.forEach((p, k) => { const g = groups.find((x) => Math.hypot(at[x[0]][0] - at[k][0], at[x[0]][1] - at[k][1]) < R * 2.4); if (g) g.push(k); else groups.push([k]); });
  const labels = [];
  const dots = groups.map((g) => {
    if (g.length > 1) {
      const x = g.reduce((s, k) => s + at[k][0], 0) / g.length, y = g.reduce((s, k) => s + at[k][1], 0) / g.length, t = trip(pins[g[0]].trip), col = (t && t.theme && t.theme.accent) || '#E8467F';
      return `<g class="fmpin fmgrp" data-a="famzoom" data-v="${esc(g.map((k) => pins[k].trip + '|' + pins[k].id).join('~'))}" role="button" tabindex="0" aria-label="${L(`${g.length} เมือง แตะเพื่อขยาย`, `${g.length} towns, tap to zoom in`)}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
<circle r="${R + 8}" fill="${esc(col)}" stroke="#fff" stroke-width="6"/><text class="fmn" dy="0.36em" text-anchor="middle">${g.length}</text></g>`;
    }
    const k = g[0], p = pins[k], t = trip(p.trip), col = (t && t.theme && t.theme.accent) || '#E8467F', on = sel === k, [x, y] = at[k];
    const lw = T(p.name).length * 12 + 10, room = !big && !labels.some(([lx, ly]) => Math.abs(lx - x) < lw && Math.abs(ly - y) < 34);
    if (room) labels.push([x, y]);
    return `<g class="fmpin${on ? ' on' : ''}" data-a="${big ? 'kidworld' : 'fampin'}" data-v="${k}" role="button" tabindex="0" aria-label="${esc(T(p.name))}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
<circle r="${on ? R + 6 : R}" fill="#fff" stroke="${esc(col)}" stroke-width="${on ? 8 : 6}"/>${p.art ? `<image href="${esc(p.art)}" x="${-R + 4}" y="${-R + 4}" width="${2 * R - 8}" height="${2 * R - 8}" clip-path="circle(${R - 4}px)"/>` : `<circle r="${R * 0.42}" fill="${esc(col)}"/>`}
${room ? `<text y="${R + 26}" text-anchor="middle">${esc(T(p.name))}</text>` : ''}</g>`; }).join('');
  return `<svg class="fmsvg${big ? ' big' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${L('แผนที่ที่ครอบครัวเคยไป', 'Where our family has been')}"><rect width="${W}" height="${H}" class="fmsea"/><path class="fmland" d="${paths}"/>${dots}</svg>`;
}
function famCard(p) {
  if (!p) return '';
  const t = trip(p.trip), when = p.from ? (p.to && p.to !== p.from ? `${fmtDay(p.from, { day: 'numeric', month: 'short' })} – ${fmtDay(p.to, { day: 'numeric', month: 'short', year: 'numeric' })}` : fmtDay(p.from, { day: 'numeric', month: 'short', year: 'numeric' })) : '';
  const ages = famAgesOn(p.from);
  return `<div class="fmcard" id="fmcard">${p.art ? `<img src="${esc(p.art)}" alt="">` : ''}<div><b>${esc(T(p.name))}</b><small>${esc(T(t.title))}${when ? ' · ' + esc(when) : ''}</small>${ages ? `<small>${L('ตอนนั้น', 'Then')}: ${ages}</small>` : ''}<a class="linkbtn" href="#/t/${esc(t.id)}/book">${L('เปิดเล่มนี้', 'Open this book')} ›</a></div></div>`;
}
function viewFamMap(tid) {
  famLoad();
  if (tid && !trip(tid)) tid = '';
  const pins = famShown(tid), zoomed = pins.length < famPins(tid).length, books = [...new Set(famPins('').map((p) => p.trip))].map(trip).filter(Boolean).sort((a, b) => String(a.date_from).localeCompare(String(b.date_from)));
  const sel = FM.pick && FM.pick.tid === tid ? FM.pick.k : -1;
  const towns = new Set(famPins('').map((p) => T(p.name))).size;
  const chips = books.length > 1 ? `<div class="chips fmchips" role="group" aria-label="${L('เล่ม', 'Books')}"><a class="chip" href="#/map" aria-pressed="${!tid}">${L('ทุกเล่ม', 'Every book')}</a>${books.map((t) => `<a class="chip" href="#/map/${esc(t.id)}" aria-pressed="${t.id === tid}"><i class="fmdot" style="background:${esc(t.theme.accent || '#E8467F')}"></i>${esc(T(t.title).split(' · ')[0])} <small>${esc(String(t.date_from || '').slice(0, 4))}</small></a>`).join('')}</div>` : '';
  const body = FM.pins === null ? `<p class="muted">${L('กำลังโหลดแผนที่…', 'Loading the map…')}</p>`
    : !famPins('').length ? emptyCard(null, L('ยังไม่มีหมุดบนแผนที่', 'No pins on the map yet'), L('เมื่อเล่มมีเมืองที่พักหรือชื่อสถานที่ หมุดจะขึ้นเอง', 'Pins appear once a book has towns to stay in or place names'))
    : `${chips}${zoomed ? `<button type="button" class="linkbtn fmout" data-a="famzoom" data-v="">‹ ${L('ดูทั้งแผนที่', 'The whole map')}</button>` : ''}<div class="fmwrap">${famSvg(pins, sel, false)}</div>${sel >= 0 ? famCard(pins[sel]) : `<p class="muted fmhint">${L('แตะหมุดเพื่อดูว่าไปที่ไหน ตอนไหน และตอนนั้นลูกอายุเท่าไร', 'Tap a pin: where, when, and how old the children were')}</p>`}`;
  return `${pageHead('famap', PG.teal, L('ทุกเล่มรวมกัน', 'All our books'), L('แผนที่ของครอบครัว', 'Our family map'), towns ? L(`${books.length} เล่ม · ${towns} เมือง`, `${books.length} book${books.length > 1 ? 's' : ''} · ${towns} town${towns > 1 ? 's' : ''}`) : '')}${towns ? '' : ''}${body}
<p class="muted small fmsrc">${L('แผนที่จาก Natural Earth · หมุดจากเมืองที่พักและชื่อสถานที่ในเล่ม ไม่ใช่ตำแหน่งของโทรศัพท์', 'Map from Natural Earth · pins from the books’ towns and place names, never a phone’s position')}</p>`;
}
// room and phone problems (owner, Nov 2026: "รู้เมื่อมีอะไรพังบนมือถือ … หน้าดูพื้นที่"; server/errors.js): how much each book takes, by
// kind (clips and films grow fastest), and the script errors the family's phones reported in the last 30 days, counted
const HEALTH = { at: 0, busy: false, storage: null, errors: null, costs: null, alerts: null };
function healthLoad(force) {
  if (HEALTH.busy || (!force && Date.now() - HEALTH.at < 60e3)) return;
  HEALTH.busy = true; HEALTH.at = Date.now();
  Promise.all([api('GET', '/api/b/health/storage').catch(() => null), api('GET', '/api/b/health/errors').catch(() => null), api('GET', '/api/b/health/costs').catch(() => null), api('GET', '/api/b/health/alerts').catch(() => null), api('GET', '/api/b/health/server').catch(() => null), api('GET', '/api/b/health/orphans').catch(() => null)]).then(([s, e, c, a, v, o]) => {
    HEALTH.storage = s; HEALTH.errors = e ? e.errors : null; HEALTH.costs = c; HEALTH.alerts = a; HEALTH.server = v; HEALTH.orphans = o; HEALTH.at = Date.now();
  }).finally(() => { HEALTH.busy = false; if (route().parts[0] === 'health') safeRender(); });
}
const bytesTxt = (b) => (b >= 1073741824 ? `${(b / 1073741824).toFixed(1)} GB` : b >= 1048576 ? `${(b / 1048576).toFixed(b >= 104857600 ? 0 : 1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const HEALTH_KINDS = [['photos', '📷', 'รูป', 'Photos'], ['clips', '🎬', 'คลิป', 'Clips'], ['films', '🎞️', 'คลิปสรุปทริป', 'Trip films'], ['voices', '🎙️', 'เสียงอัด', 'Voice memos'], ['drawings', '🖍️', 'ภาพวาดของเด็ก', 'The kids’ drawings']];
function viewHealth() {
  healthLoad();
  const st = HEALTH.storage, er = HEALTH.errors;
  const when = (ms) => new Date(ms).toLocaleString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const kindsLine = (k) => HEALTH_KINDS.filter(([key]) => k[key] && k[key].n).map(([key, e, th, en]) => `<span>${e} ${L(th, en)} ${k[key].n} · <b>${bytesTxt(k[key].bytes)}</b></span>`).join('');
  const room = !st ? `<p class="muted">${L('กำลังดู…', 'Looking…')}</p>` : !st.total ? `<p class="muted">${L('ยังไม่มีรูปหรือคลิปในเล่มไหน', 'No book holds photos or clips yet')}</p>`
    : `<p class="hbig"><b>${bytesTxt(st.total)}</b> ${L('ทั้งหมด', 'in all')}</p>
<div class="hbars">${HEALTH_KINDS.filter(([k]) => st.all[k] && st.all[k].bytes).map(([k, e, th, en]) => `<div class="hbar"><span>${e} ${L(th, en)}</span><i style="width:${Math.max(2, Math.round((st.all[k].bytes / st.total) * 100))}%"></i><b>${bytesTxt(st.all[k].bytes)}</b></div>`).join('')}</div>
<ul class="hbooks">${st.books.filter((b) => b.total).sort((a, b) => b.total - a.total).map((b) => `<li><b>${esc(T(b.title))}</b> <span class="hsz">${bytesTxt(b.total)}</span><div class="hk">${kindsLine(b.kinds)}</div></li>`).join('')}</ul>
<p class="muted small">${L('ขนาดไฟล์เต็มที่เก็บไว้ · รูปย่อเพิ่มอีกราว 5% · คลิปและคลิปสรุปทริปกินที่เร็วที่สุด', 'The stored full files · thumbnails add about 5% · clips and films grow fastest')}</p>`;
  const errs = er == null ? `<p class="muted">${L('กำลังดู…', 'Looking…')}</p>` : !er.length ? `<p class="hok">✓ ${L('30 วันนี้ไม่มีมือถือเครื่องไหนรายงานปัญหา', 'No phone reported a problem in the last 30 days')}</p>`
    : `<ul class="herrs">${er.map((x) => `<li><b>${esc(x.msg)}</b><small>${[x.src ? `${x.src}:${x.line}` : '', x.route, x.device, x.ver].filter(Boolean).map(esc).join(' · ')}</small><small>${x.n > 1 ? L(`${x.n} ครั้ง · `, `${x.n} times · `) : ''}${L('ล่าสุด', 'last')} ${when(x.last_at)}</small></li>`).join('')}</ul>
<div class="row"><button class="btn ghost small" data-a="healthclear">${L('ล้างรายการ', 'Clear the list')}</button></div>`;
  // the copy and the alerts (server/alerts.js): when the last nightly copy was made and whether its restore drill passed, the disk, what was told lately
  const al = HEALTH.alerts, bk = al && al.backup, whenD = (ms) => new Date(ms).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const watch = !al ? '' : `<section class="pcard hcard" style="--g1:${PG.purple}"><h3 class="pch"><span class="pcpic">${hubIc('offline')}</span><span>${L('สำเนาและการแจ้งเตือน', 'Copies and alerts')}</span></h3><ul class="hwatch">
<li>${bk && bk.at ? `${bk.ok === false ? '⚠️' : '✓'} ${L('สำเนาล่าสุด', 'Last copy')} ${esc(whenD(bk.at))}${bk.drill === 'ok' ? ` · ${L('ซ้อมกู้ผ่าน', 'restore drill passed')}` : bk.drill === 'failed' ? ` · ⚠️ ${L('ซ้อมกู้ไม่ผ่าน', 'restore drill failed')}` : ''}${bk.ok === false && bk.tried ? ` · ⚠️ ${L('ครั้งล่าสุดล้มเหลว', 'the last try failed')} ${esc(whenD(bk.tried))}` : ''}` : L('ยังไม่มีรายงานจากการทำสำเนา (ตั้งค่า workflow Backup บน GitHub)', 'No report from the copies yet (the Backup workflow on GitHub)')}</li>
${al.disk ? `<li>${al.disk.free / al.disk.total < 0.15 ? '⚠️' : '✓'} ${L('ที่ว่างบนเซิร์ฟเวอร์', 'Free on the server')} ${bytesTxt(al.disk.free)} ${L('จาก', 'of')} ${bytesTxt(al.disk.total)}</li>` : ''}
<li>${L('แจ้งเตือนเข้ามือถือพ่อแม่เมื่อ: มือถือรายงานปัญหาถี่ · ที่เก็บใกล้เต็ม · สำเนาหรือการซ้อมกู้ล้มเหลว', 'The parents’ phones are told when: phones report many problems · storage is nearly full · a copy or its restore drill fails')}</li>
${(al.log || []).slice(0, 5).map((x) => `<li class="muted small">🔔 ${esc(whenD(x.at))} · ${esc(x.en)}</li>`).join('')}</ul></section>`;
  // month by month: the room and the helper (server/errors.js costs) — money only where the owner set prices
  const cs = HEALTH.costs, cm = cs ? cs.months.filter((m) => m.stored || m.calls) : [], maxGb = Math.max(1, ...cm.map((m) => m.stored)), usd = (x) => (x == null ? '' : `$${x < 10 ? x.toFixed(2) : Math.round(x)}`);
  const costs = !cs ? '' : `<section class="pcard hcard" style="--g1:${PG.gold}"><h3 class="pch"><span class="pcpic">${hubIc('money')}</span><span>${L('รายเดือน', 'Month by month')}</span></h3>${!cm.length ? `<p class="muted">${L('ยังไม่มีข้อมูล', 'Nothing yet')}</p>` : `<table class="hcost"><thead><tr><th>${L('เดือน', 'Month')}</th><th>${L('พื้นที่', 'Room')}</th><th>${L('ผู้ช่วย', 'Helper')}</th>${cs.priced.ai || cs.priced.store || cs.priced.server ? `<th>${L('ประมาณ', 'About')}</th>` : ''}</tr></thead><tbody>
${cm.map((m) => { const tot = [m.usdAi, m.usdStore, m.usdServer].filter((x) => x != null), sum = tot.length ? tot.reduce((a, b) => a + b, 0) : null;
    return `<tr><td>${esc(new Date(m.month + '-01T00:00:00').toLocaleDateString(LOC(), { month: 'short', year: '2-digit' }))}</td><td><span class="hbarm" style="--w:${Math.max(3, Math.round((m.stored / maxGb) * 100))}%"></span>${bytesTxt(m.stored || 1)}${m.added ? ` <small>+${bytesTxt(m.added)}</small>` : ''}</td><td>${m.calls ? L(`${m.calls} ครั้ง`, `${m.calls} ×`) : '—'}</td>${cs.priced.ai || cs.priced.store || cs.priced.server ? `<td>${esc(usd(sum))}</td>` : ''}</tr>`; }).join('')}</tbody></table>`}
<p class="muted small">${cs.priced.ai || cs.priced.store || cs.priced.server ? L('เงินประมาณจากราคาที่ตั้งไว้ในเซิร์ฟเวอร์ ยอดจริงดูในบัญชี Railway และผู้ให้บริการผู้ช่วย', 'Money estimated from the prices set on the server — the real bills are in the Railway and helper accounts') : L('ตั้งราคาในเซิร์ฟเวอร์ได้ ถ้าอยากเห็นเงินประมาณ (ยอดจริงอยู่ในบัญชี Railway และผู้ให้บริการผู้ช่วย)', 'Set prices on the server to see money estimates (the real bills are in the Railway and helper accounts)')}</p></section>`;
  return `${pageHead('room', PG.teal, L('แอปเป็นอย่างไรบ้าง', 'How the app is doing'), L('พื้นที่และปัญหาบนมือถือ', 'Room and phone problems'), L('รูปและคลิปใช้ที่ไปเท่าไร สำเนาล่าสุด และมีอะไรสะดุดบนมือถือเครื่องไหนไหม', 'How much room the photos and clips take, the last copy, and anything that broke on a phone'))}
<section class="pcard hcard" style="--g1:${PG.teal}"><h3 class="pch"><span class="pcpic">${hubIc('room')}</span><span>${L('พื้นที่ที่เล่มใช้', 'Room the books take')}</span></h3>${room}</section>
${watch}${costs}
<section class="pcard hcard" style="--g1:${PG.orange}"><h3 class="pch"><span class="pcpic">${hubIc('checkphone')}</span><span>${L('ปัญหาที่มือถือรายงาน', 'Problems the phones reported')}</span></h3>
<p class="muted small">${L('เมื่อแอปสะดุดบนมือถือ เครื่องจะส่งแค่ข้อความของปัญหา ไฟล์และบรรทัด รุ่นแอป ชนิดหน้า และชนิดเครื่อง มาเก็บไว้ 30 วัน — ไม่มีชื่อ ข้อความที่เขียน รูป หรือตำแหน่ง', 'When the app trips on a phone, the phone sends only the problem’s message, the file and line, the app version, the kind of page and of phone — kept 30 days; no names, nothing written, no photos, no position')}</p>${errs}</section>
${healthServer()}${healthOrphans()}`;
}
// the server's own problems (server/watch.js): failed answers and slow ones, by kind of request — never an id, a body or a name
function healthServer() {
  const v = HEALTH.server; if (!v) return '';
  const when = (ms) => new Date(ms).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const ev = v.events || [];
  const body = !ev.length ? `<p class="hok">✓ ${L('30 วันนี้เซิร์ฟเวอร์ไม่มีคำขอที่ล้มเหลวหรือช้าผิดปกติ', 'No failed or unusually slow requests on the server in 30 days')}</p>`
    : `<ul class="herrs">${ev.map((x) => `<li class="sv-${x.kind}"><b>${x.kind === 'error' ? `⚠️ ${x.status}` : `🐢 ${(x.ms_max / 1000).toFixed(1)} ${L('วิ', 's')}`} · <code>${esc(x.route)}</code></b>${x.msg ? `<small>${esc(x.msg)}</small>` : ''}<small>${x.n > 1 ? L(`${x.n} ครั้ง · `, `${x.n} times · `) : ''}${L('ล่าสุด', 'last')} ${esc(when(x.last_at))}</small></li>`).join('')}</ul>
<div class="row"><button class="btn ghost small" data-a="healthsrvclear">${L('ล้างรายการ', 'Clear the list')}</button></div>`;
  return `<section class="pcard hcard" style="--g1:${PG.purple}"><h3 class="pch"><span class="pcpic">${hubIc('settings')}</span><span>${L('ปัญหาบนเซิร์ฟเวอร์', 'Problems on the server')}</span></h3>
<p class="muted small">${L(`คำขอที่เซิร์ฟเวอร์ตอบผิดพลาด หรือใช้เวลาเกิน ${Math.round(v.slowMs / 1000)} วินาที นับตามชนิดคำขอ เก็บไว้ 30 วัน — ไม่มีชื่อ ข้อความ หรือรหัสของสิ่งใด`, `Requests the server failed, or that took over ${Math.round(v.slowMs / 1000)} s, counted by kind — kept 30 days; no names, no text, no ids`)}</p>${body}</section>`;
}
// files in the storage that no row names any more (server/orphans.js): an upload cut off half-way, a delete that failed —
// counted here, and taken away with two taps (only what is older than two days and in the photo folders)
function healthOrphans() {
  const o = HEALTH.orphans; if (!o) return '';
  const body = o.n ? `<p>${L(`พบไฟล์ที่ไม่มีเล่มไหนใช้ ${o.n} ไฟล์ · ${bytesTxt(o.bytes || 1)}`, `${o.n} file${o.n > 1 ? 's' : ''} no book uses · ${bytesTxt(o.bytes || 1)}`)}</p>
<div class="row"><button class="btn ghost small" data-a="orphansgo">${L('ลบไฟล์ที่ไม่มีใครใช้', 'Remove the unused files')}</button></div>`
    : `<p class="hok">✓ ${L('ไม่มีไฟล์ค้าง ทุกไฟล์มีเล่มที่ใช้อยู่', 'No stray files — every file belongs to a book')}</p>`;
  return `<section class="pcard hcard" style="--g1:${PG.gold}"><h3 class="pch"><span class="pcpic">${hubIc('room')}</span><span>${L('ไฟล์ค้าง', 'Stray files')}</span></h3>
<p class="muted small">${L(`ตรวจล่าสุด ${o.at ? new Date(o.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'} · นับเฉพาะไฟล์ที่เก่ากว่า 2 วัน`, `Checked ${o.at ? new Date(o.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'} · only files older than two days`)}</p>${body}</section>`;
}
function aiCard() {
  const u = aiUsage(); if (!u) return '';
  const d = u.days30;
  const pct = Math.min(100, Math.round((u.today.calls / Math.max(1, u.limit)) * 100));
  return `<details class="aicard"><summary>${hubE('helper')}<span><b>${L('ผู้ช่วย', 'The helper')}</b><small>${u.today.calls ? L(`วันนี้ใช้ไป ${u.today.calls} จาก ${u.limit} ครั้ง`, `Used today: ${u.today.calls} of ${u.limit}`) : L(`วันนี้ยังไม่ได้ใช้ · ได้วันละ ${u.limit} ครั้ง`, `Not used today · up to ${u.limit} a day`)}</small><span class="aibar"><i style="width:${pct}%"></i></span></span><i>›</i></summary>
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
  return `<div class="part">${L('สำเนา', 'Backup')}</div>
<button class="nbcard backup${warn ? ' warn' : ''}" data-a="backup"><span class="emb">${hubIc('offline')}</span><div><b>${L('ดาวน์โหลดสำเนาทั้งหมด', 'Download a full backup')}</b><small>${esc(line)}</small><small>${L('บันทึกและรูปเต็มทุกรูปในไฟล์เดียว · เก็บในคอมหรือไดรฟ์ส่วนตัว อย่าแชร์ต่อ', 'One file with every record and full-size photo — keep it on a computer or private drive, never a public link')}</small></div><span class="arrow">⬇</span></button>`;
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
  // the hero's actions (owner, Nov 2026: "ทำให้สวยงาม"): a row each with the app's own painted picture, a name and one quiet line —
  // the main one solid white, the extra one see-through on the hero's colour
  const hb = (tag, attrs, cls, pic, name, sub) => `<${tag} class="hbtn${cls}" ${attrs}><span class="hbpic"><img src="${pic}" alt="" draggable="false"></span><span class="hbt"><b>${name}</b><small>${sub}</small></span><span class="hbgo" aria-hidden="true">›</span></${tag}>`;
  const go = (dn >= 0 && isEditor() ? hb('a', `href="#/t/${esc(t.id)}/log/${dn}"`, '', '/art/hub/pencil.webp', L('บันทึกวันนี้', 'Record today'), L('รูป คำพูด และอารมณ์ของวันนี้', 'Photos, words and moods'))
    : hb('a', `href="#/t/${esc(t.id)}"`, '', '/art/hub/book.webp', L('เปิดเล่มนี้', 'Open the book'), L('แผน คู่มือ และความทรงจำ', 'The plan, the guide and the memories')))
    + (dn < 0 && isEditor() && (t.passport || {}).countdown ? hb('button', 'type="button" data-a="kidmode" data-v=""', ' alt', '/art/kidui/surprise.webp', L('เซอร์ไพรส์ของวันนี้', "Today's surprise"), L('ให้เด็กๆ เปิดประตูนับถอยหลัง', 'The kids open a countdown door')) : '');
  // the day circles: before the trip up to six (evenly through the book — the owner missed the days between); on it today and tomorrow
  const all = t.days.map((_, i) => i), art = dn < 0 ? (all.length <= 6 ? all : Array.from({ length: 6 }, (_, k) => Math.round(k * (all.length - 1) / 5))) : all.filter((i) => i === dn || i === dn + 1).slice(0, 2);
  return `<section class="hero${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)};--hero:${esc(t.theme.accent || '#1F3A5F')}">
<div class="txt"><div class="kicker">${dn >= 0 ? L('ตอนนี้กำลังเที่ยว', 'On the road now') : L('การผจญภัยครั้งต่อไป', 'Next adventure')} ${flagsOf(t)}</div>
<h2>${esc(dn >= 0 ? `${t.days[dn].emoji || ''} ${T(t.days[dn].title)}` : T(t.title).split(' · ')[0])}</h2>
<div class="count">${big}<span>${lbl}</span></div>
${kids ? `<p class="kids">${kids}</p>` : ''}<div class="heroacts">${go}</div></div>
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
/* A book's film (owner, Nov 2026: "คลิปสรุปทริป"; server/reel.js): the ⭐ photos and a few seconds of the day's clips, day by day, with
   a little tune — made on our server, kept with the book, watched here by everyone who may see the book; parents make and remake it */
function reelBlock(t, nDays) {
  const has = t.reel && t.reel.v, job = typeof reelJob !== 'undefined' && reelJob && reelJob.trip === t.id ? reelJob : null, run = job && job.state === 'run';
  if (!nDays || !(has || (isEditor() && mediaOf(t.id).length))) return '';
  const src = has ? `/media/reel/${encodeURIComponent(t.id)}?v=${encodeURIComponent(t.reel.v)}` : '';
  const mins = has ? `${Math.floor(t.reel.secs / 60)}:${String(t.reel.secs % 60).padStart(2, '0')}` : '';
  return `<section class="reelbox" id="reelbox"><div class="part">${L('คลิปสรุปทริป', 'The trip in a film')} 🎬</div>
${has ? `<video class="reelvid" controls playsinline preload="metadata" src="${esc(src)}"></video>
<div class="row reelrow"><button type="button" class="btn small" data-a="reelshare" data-t="${esc(t.id)}">${ic('share')} ${L('ส่งให้ญาติ', 'Send to family')}</button><a class="btn ghost small" href="${esc(src)}&dl=1" download>${L('เก็บลงเครื่อง', 'Save to phone')}</a><span class="label">${esc(mins)}</span></div>` : ''}
${run ? `<p class="reelrun">${L('กำลังทำคลิป', 'Making the film')} <b id="reelpct">${job.pct || 0}%</b> · ${L('ปิดหน้านี้ได้ เสร็จแล้วจะอยู่ตรงนี้', 'you can close this page — it will be here when ready')}</p>`
    : isEditor() ? `${has ? '' : `<p class="sub">${L('รูปเด่น ⭐ คำพูดของเด็ก เสียงที่อัดไว้ และคลิปสั้นของแต่ละวัน ต่อกันเป็นคลิปเดียวพร้อมเพลง ปิดท้ายด้วยหัวใจจากญาติ', 'The best photos ⭐, the kids’ words, the voice memos and a bit of each day’s clips, one film with music, ending with the family’s hearts')}</p>`}
${reelMoodPick()}
<button type="button" class="${has ? 'linkbtn' : 'btn wide'}" data-a="reelmake" data-t="${esc(t.id)}">${has ? L('ทำคลิปใหม่ (หลังเพิ่มรูปหรือเปลี่ยนรูปเด่น)', 'Make it again (after new photos or stars)') : L('ทำคลิปสรุปทริป', 'Make the trip film')}</button>
${job && job.state === 'error' ? `<p class="notice">${L('ทำคลิปไม่สำเร็จ ลองอีกครั้ง', 'The film could not be made — try again')}</p>` : ''}
<p class="snapnote">${ic('lock')}<span>${L('ทำบนเซิร์ฟเวอร์ของเราจากรูปในเล่มนี้ ไม่ส่งไปที่อื่น', 'Made on our own server from this book’s photos — sent nowhere else')}</span></p>` : ''}</section>`;
}
// the film's music (owner, Nov 2026: "เลือกอารมณ์เพลงได้"): three option cards, the phone remembers the choice (server/reel.js MOODS)
const REEL_MOODS = [['fun', '🎈', 'สนุก', 'Fun'], ['warm', '🌤️', 'อบอุ่น', 'Warm'], ['sleep', '🌙', 'ก่อนนอน', 'Bedtime']];
const reelMood = () => (REEL_MOODS.some(([k]) => k === ls('reelMood')) ? ls('reelMood') : 'warm');
function reelMoodPick() {
  const cur = reelMood();
  return `<div class="part pickh">${L('เพลงประกอบ', 'The music')}</div><div class="tpk reelmood" role="group" aria-label="${L('เพลงประกอบ', 'The music')}">${REEL_MOODS.map(([k, e, th, en]) => `<button type="button" class="tpo" data-a="reelmood" data-v="${k}" aria-pressed="${k === cur}"><span class="rme" aria-hidden="true">${emo(e)}</span><b>${L(th, en)}</b><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>`;
}
// the film's cards (#/reelcards/<trip>/<lang>/<days>/<words>): 720×1280 each — the book's title, one a day that has a part, and the
// end with the relatives' hearts (owner, Nov 2026: "ปิดท้ายด้วยหัวใจจากญาติ"); then each of the kids' words as a bubble, photographed
// on its own over a transparent page and laid under its photo (server/reel.js frame)
function viewReelCards(t, days, capIds = []) {
  const kids = children().filter((k) => kidArt(k.slug, true, t)), long = { day: 'numeric', month: 'long', year: 'numeric' };
  const range = esc((() => { const a = new Date(t.date_from + 'T00:00:00'), b = new Date((t.date_to || t.date_from) + 'T00:00:00');   // "17–18 November 2026", the month said once
    try { return new Intl.DateTimeFormat(LOC(), long).formatRange(a, b); } catch (_) { return fmtDay(t.date_from, long) + (b > a ? ' – ' + fmtDay(t.date_to, long) : ''); } })());
  const arts = days.map((i) => dayArt(t, i)).filter(Boolean).slice(0, 4);
  const cast = kids.length ? `<div class="rkids">${kids.map((k) => `<figure><img src="${esc(kidArt(k.slug, true, t))}" alt=""><figcaption>${esc(kidName(k.slug))}</figcaption></figure>`).join('')}</div>` : '';
  const place = (d) => (d && d.place ? T(d.place) : '');
  return `<div class="rcard rtitle"><div class="rconf" aria-hidden="true"></div>${arts.length ? `<div class="rarts">${arts.map((a) => `<img src="${esc(a)}" alt="">`).join('')}</div>` : ''}
<h1>${esc(T(t.title))}</h1><p class="rdate">${range}</p>${cast}</div>
${days.map((i) => { const d = t.days[i] || {}, art = dayArt(t, i);
    return `<div class="rcard rday"><div class="rconf" aria-hidden="true"></div><p class="rnum">${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)}</p>
${art ? `<img class="rart" src="${esc(art)}" alt="">` : `<div class="rart remo">${esc(d.emoji || '📷')}</div>`}
<h2>${esc(T(d.title) || L(`วันที่ ${i + 1}`, `Day ${i + 1}`))}</h2><p class="rdate">${esc(fmtDay(d.date, long))}${place(d) ? ' · ' + esc(place(d)) : ''}</p></div>`; }).join('')}
<div class="rcard rend"><div class="rconf" aria-hidden="true"></div>${cast}${reelHearts(t)}<h2>${L('แล้วเจอกันทริปหน้านะ!', 'See you on the next trip!')}</h2><p class="rdate">${esc(T(t.title))}</p><p class="rapp">${esc(appName())}</p></div>
${capIds.map((id) => { const e = entriesOf(t.id).find((x) => x.id === id && x.kind === 'quote'); if (!e || !e.text) return '';
    const who = e.child && e.child !== 'both' ? kidName(e.child) : '';
    return `<div class="rcapw"><div class="rcap" data-id="${esc(id)}"><p>“${esc(e.text)}”</p>${who ? `<b>— ${esc(who)}</b>` : ''}</div></div>`; }).join('')}`;
}
// the end card's hearts: how many the relatives sent this trip, and up to three of their short notes with who sent them
function reelHearts(t) {
  const hs = heartsOf(t.id); if (!hs.length) return '';
  const notes = hs.filter((h) => h.text && h.text.length <= 60).slice(-3);
  const em = [...new Set(hs.map((h) => h.emoji))].slice(0, 5).map((x) => esc(x)).join(' ');
  return `<div class="rhearts"><p class="rhn">${em} ${L(`ญาติส่งหัวใจมา ${hs.length} ดวง`, `${hs.length} heart${hs.length > 1 ? 's' : ''} from family`)}</p>${notes.map((h) => `<p class="rhx">“${esc(h.text)}”${h.from ? ` <b>— ${esc(h.from)}</b>` : ''}</p>`).join('')}</div>`;
}
// the trip's audiobook (owner, Nov 2026): every photo a child told the story of, in the order taken, its voice under it — a tap plays the
// first and each one goes on to the next (sheets.js tellplay)
function tellBook(t) {
  const told = mediaOf(t.id).map((m) => ({ m, a: audioOf(t.id).filter((x) => x.place === 'photo:' + m.id).pop() })).filter((x) => x.a);
  if (!told.length) return '';
  return `<section class="tellbook noprint" id="tellbook"><div class="part">${L('หนังสือเสียงของทริป', 'The trip’s audiobook')} 🎙️</div>
<p class="sub">${L(`ลูกเล่าเรื่องไว้ ${told.length} รูป แตะเพื่อฟังต่อกันทีละรูป`, `${told.length} photo${told.length > 1 ? 's' : ''} told by the kids — tap to hear them one after another`)}</p>
<div class="tellstrip">${told.map(({ m, a }, k) => `<button type="button" class="tellcard" data-a="tellplay" data-k="${k}" data-v="${esc(a.id)}"><img src="${esc(imgT(m))}" alt="" loading="lazy"><span>▶️</span></button>`).join('')}</div>
<audio id="tellaudio" preload="none"></audio></section>`;
}
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
${reelBlock(t, days.length)}
${tellBook(t)}
${(t.firsts || []).length || firsts.length ? `<a class="learnlink firstsgo" href="#/t/${esc(t.id)}/firsts">${hubE('firsts')}<b>${L('เหรียญครั้งแรก', 'Firsts')}</b><span class="label">${esc(firsts.length ? L(`${firsts.length} ครั้งแรก`, `${firsts.length} first${firsts.length > 1 ? 's' : ''}`) : L('เหรียญรอหนูอยู่', 'Badges waiting'))}</span>${ic('chev')}</a>` : ''}
${firsts.length ? `<div class="part">${L('ครั้งแรกของหนู', 'Firsts')}</div><div class="firsts">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<div class="first got"><span class="e">${esc(f.e)}</span><span class="t">${esc(e.first_key === 'custom' ? e.text : f.t)}<br><small class="muted">${L('วันที่', 'Day')} ${e.day + 1}</small></span><span class="kids">${kidBadge(e.child)}</span></div>`; }).join('')}</div>` : ''}
${drawingsHtml(t)}
${isEditor() && S.features.story && days.length ? storyBlock(t, null)
    : story ? `<div class="part">${L('นิทานของทั้งทริป', 'The story of the trip')}</div><div class="call calm" style="white-space:pre-line">${bedBtn(story)}${esc(story.text)}</div>` : ''}
${letterBlock(t, days.length)}
${days.map((i) => dayPage(t, i)).join('')}
${days.length ? printSet(t) : ''}<div class="row noprint" style="margin:28px 0 8px"${days.length ? '' : ' hidden'}><a class="btn small" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">📕 ${L('สมุดความทรงจำ (PDF A4)', 'Memory book (PDF A4)')}</a><a class="btn ghost small" href="#/print/${esc(t.id)}">👀 ${L('ดูตัวอย่างเล่ม', 'Preview the book')}</a></div>
<div class="row noprint bookmore pdfsizes"${days.length ? '' : ' hidden'}><span class="label">${L('ขนาดอื่น', 'Other sizes')}</span><a class="linkbtn" href="/api/b/pdf/${esc(t.id)}?size=a5" download data-a="pdf" data-sfx="-a5">${L('A5 เล่มเล็ก', 'A5, a small book')}</a><span class="label">·</span><a class="linkbtn" href="/api/b/pdf/${esc(t.id)}?shop=1" download data-a="pdf" data-sfx="-print">${L('A4 ส่งร้านพิมพ์ (ไม่มีเลขหน้า)', 'A4 for a print shop (no page numbers)')}</a></div>
<div class="row noprint bookmore"${days.length ? '' : ' hidden'}><button class="linkbtn" data-a="print">${L('พิมพ์หน้านี้', 'Print this page')}</button><span class="label">·</span><button class="linkbtn" data-a="copytext">${L('คัดลอกเป็นข้อความ', 'Copy as text')}</button><span class="label">·</span><a class="linkbtn keepbtn" href="/api/b/keep/${esc(t.id)}?lang=${lang}" download>${L('เก็บเล่มเป็นไฟล์เดียว', 'Keep the book as one file')}</a></div>
${days.length ? `<p class="muted small noprint keepnote">${L('ไฟล์เดียวที่มีทุกรูป คำพูด และเสียงของเล่มนี้ เปิดในเบราว์เซอร์ได้โดยไม่ต้องมีแอป เก็บไว้ได้นาน', 'One file with every photo, word and voice of this book — opens in any browser without the app, to keep for years')}</p>` : ''}</div>`;
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
const KEYFACT = /\b\d{1,2}:\d{2}(?:\s?[–-]\s?\d{1,2}:\d{2})?\b|\b\d{1,2}\s?h\s?\d{1,2}(?:\s?min)?\b|\d{1,2}\s?ชม\.\s?\d{1,2}\s?นาที|\b\d{1,3}(?:\s?[–-]\s?\d{1,3})?\s?(?:mins?|minutes|hrs?|hours?|h)\b|\b\d{1,3}(?:\s?[–-]\s?\d{1,3})?\s?(?:นาที|ชั่วโมง|ชม\.)|(?:HK\$|MOP ?|A\$|AU\$|NZ\$|US\$|AUD ?|HKD ?|\$|฿|¥|€|£)\d(?:[\d,]*\d)?(?:\.\d+)?(?:\s?[–-]\s?\d(?:[\d,]*\d)?(?:\.\d+)?)?|(?:\+\d{1,3} )?(?:\(\d{2,3}\) )?\b\d{3,4}(?: \d{3,4}){1,2}\b|(?:^|[^\d,.])(?<em>999|000|911|112)(?![\d,.])/g;   // no lookbehind (old Safari): the char before an emergency number is matched, emph bolds only the number
// each kind of key fact wears its own colour (owner, Nov 2026: "เพิ่มมิติในการใส่สีราคา และส่วนอื่นๆที่เน้น"): money green, a time blue, how long it takes amber, a number to call rose
const kfKind = (x) => (/^\d{1,2}:\d{2}/.test(x) ? 'kt' : /^\D/.test(x) || /[$฿¥€£]|MOP|AUD|HKD/.test(x) ? 'km' : /\d\s?(?:h|mins?|minutes|hrs?|hours?|นาที|ชั่วโมง|ชม\.)(?![a-z])/.test(x) ? 'kd' : 'kp');
const emph = (x) => { const t = String(x || ''); let out = '', at = 0; for (const m of t.matchAll(KEYFACT)) { const hit = m.groups && m.groups.em ? m.groups.em : m[0], i = m.index + m[0].length - hit.length; out += esc(t.slice(at, i)) + `<b class="kf ${kfKind(hit)}">${esc(hit)}</b>`; at = m.index + m[0].length; } return out + esc(t.slice(at)); };
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
// the record page's reminder of the day (owner, Nov 2026: "อ่านยากมาก ปรับใหม่" — it held the whole manual page inside a second fold):
// one line a step, the time and the step's own headline, tonight's bed, and one link to the full plan. Nothing folds inside it.
function planLite(t, i) {
  const pl = t.days[i].plan || {}, rows = pl.plan || [];
  if (!rows.length) return '';
  const line = (r) => { const own = r && r.h && T(r.h); return own ? emoIn(esc(own)) : tlIcon(r) + esc(T(r).split(' · ')[0]); };
  return `<details class="blk planblk fold"${ls('logall') ? ' open' : ''}><summary>${ic('clock')}<b>${L('แผนวันนี้', 'Today’s plan')}</b><small>${L(`${rows.length} ช่วง`, `${rows.length} steps`)}</small>${ic('chev', 'chv')}</summary>
<ol class="pll">${rows.map((r) => `<li><time>${esc(tlTime(r))}</time><span>${line(r)}</span></li>`).join('')}</ol>
${pl.stay && pl.stay.name ? `<p class="plstay">${ic('stays')}<span><small>${L('คืนนี้นอนที่', 'Tonight we sleep at')}</small><b>${esc(pl.stay.name)}</b></span></p>` : ''}
<a class="learnlink" href="#/t/${esc(t.id)}/today/${i}/full">${ic('doc')}<b>${L('ดูแผนเต็มของวันนี้', 'See the day’s full plan')}</b>${ic('chev')}</a></details>`;
}
// tonight's bed with its address: the name once — an address that already starts with the hotel's name is shown alone
const stayLine = (pl) => (pl.stay ? ((nm, ad) => `<p class="stay"><b>${L('ที่พักคืนนี้', 'Tonight')}</b> ${ad && ad.startsWith(nm.split(/\s+/).slice(0, 2).join(' ')) ? '' : `${esc(nm)}<br>`}<span class="addr">${addrHtml(ad)}</span> ${extA(mapsUrl(pl.stay.q || pl.stay.addr), L('แผนที่', 'Map') + ' ↗')}</p>`)(pl.stay.name || '', pl.stay.addr || '') : '');
function planHtml(t, i, open, wx, o = {}) {
  const pl = t.days[i].plan || {}, rows = pl.plan || [], dwx = wx && t.days[i].wx;
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  const nl = (pl.learn || []).length, nq = (pl.quiz || []).length, wxl = dwx ? dayFacts({ wx: t.days[i].wx }) : '';
  const picked = new Set((pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]).filter(Boolean)), nfood = (pl.food || []).reduce((n, f) => n + f.items.filter((x) => !picked.has(x.name)).length, 0) + eatMore(pl).length;
  const stay = stayLine(pl);
  return `<details class="dayplan${o.full ? ' full' : ''}"${open ? ' open' : ''}><summary>${L('แผนวันนี้', 'Plan for the day')}${rows.length ? ` <span class="label">· ${rows.length} ${L('ช่วง', 'steps')}</span>` : ''}</summary>
<div class="pgrid">${pl.moving || (pl.legs || []).length || pl.route || dwx ? `<aside class="strip"><div class="kicker">${L('การเดินทาง', 'Getting around')}</div>
${pl.moving ? `<div class="moving">${pts(T(pl.moving), 'tight')}</div>` : ''}
${(pl.legs || []).length ? legsHtml(pl.legs) : ''}
${pl.route ? `<p class="row">${extA(pl.route, ic('route') + ' ' + L('เส้นทางทั้งวันใน Google Maps', "The whole day's route in Google Maps"), 'btn ghost small')}</p>` : ''}
${wxl ? `<div class="wxbox"><div class="kicker">${L('อากาศ', 'Weather')}</div>${wxl}</div>` : ''}</aside>` : ''}<div class="pmain">
${rows.length ? `<section class="cbox c-sky"><h3 class="ch">${ic('clock')}${L('ไทม์ไลน์', 'Timeline')}</h3><ol class="tl plan">${rows.map((r) => `<li><time>${esc(tlTime(r))}</time><div>${tlRow(r)}${r.note ? `<small>${esc(T(r.note))}</small>` : ''}</div></li>`).join('')}</ol></section>` : ''}
${stay}
${pl.pick ? `<div class="call pick"><span class="lbl">${L('เคล็ดลับคนท้องถิ่น', 'Local tip')}</span>${pts(T(pl.pick))}</div>` : ''}
${pl.planB ? `<div class="call warn"><span class="lbl">${L('แผนสำรอง', 'Plan B')}</span>${pts(T(pl.planB))}</div>` : ''}
${pl.money ? `<section class="cbox c-leaf money"><h3 class="ch">${ic('money')}${L('เงินวันนี้', 'Money today')}</h3>${moneyHtml(T(pl.money), o.skipNotes)}</section>` : ''}
${(pl.tips || []).length ? `<section class="cbox c-sun"><h3 class="ch">${ic('learn')}${L('ควรรู้วันนี้', 'Good to know today')}</h3><ul class="tips">${pl.tips.map((x) => `<li${TIPK[x.kind] ? ` class="tk-${x.kind}"` : ''}>${lead(T(x))}</li>`).join('')}</ul></section>` : ''}
${(pl.picks || []).length ? `<h5 class="ph">${L('ร้านแนะนำวันนี้ · เน้นร้านคนท้องถิ่น', "Today's picks · locals' places first")} <a class="mini" href="#/t/${esc(t.id)}/eat/all">${L('ร้านทั้งหมด', 'All places')} ›</a></h5><ul class="picks">${pl.picks.map(pickHtml).join('')}</ul>` : ''}
${o.eat ? (nfood ? `<a class="learnlink" href="${o.eat}">🍽️ <b>${L('ร้านตามทางวันนี้', "Places to eat along today's route")}</b><span class="label">${L(`${nfood} ร้าน`, `${nfood} places`)}</span>${ic('chev')}</a>` : '') : `${(pl.food || []).length ? `<details class="sub"><summary>${L('กินตามเส้นทางวันนี้', "Eat along today's route")} <span class="label">· ${pl.food.reduce((n, f) => n + f.items.length, 0)}</span></summary><p class="label">${L('เรียงตามจุดที่ผ่าน · ★ = ร้านแนะนำ · กดชื่อเพื่อเปิด Google Maps', 'In the order you pass them · ★ = a pick · tap a name for Google Maps')}</p>${pl.food.map((f) => ((xs) => (xs.length ? `<h5>${esc(T(f.stop))}</h5><ul class="eats">${xs.map(foodHtml).join('')}</ul>` : ''))(f.items.filter((x) => !picked.has(x.name)))).join('')}</details>` : ''}
${eatMore(pl).length ? `<details class="sub"><summary>${L('ร้านอื่นใกล้ๆ', 'More places to eat nearby')} <span class="label">· ${eatMore(pl).length}</span></summary><ul class="eats">${eatMore(pl).map(eatLi).join('')}</ul></details>` : ''}`}
${o.learn ? (nl || nq || pl.tale ? `<a class="learnlink" href="${o.learn}">📚 <b>${L('เรียนรู้ของวันนี้', "Today's things to learn")}</b><span class="label">${[nl && L(`${nl} เรื่อง`, `${nl} cards`), nq && L(`คำถาม ${nq} ข้อ`, `${nq} questions`), pl.tale && L('นิทาน', 'a story')].filter(Boolean).join(' · ')}</span>${ic('chev')}</a>` : '') : `${(pl.learn || []).length ? `<details class="sub"><summary>${L('เรียนรู้ระหว่างทาง', 'Learn on the way')} <span class="label">· ${pl.learn.length}</span></summary>${pl.learn.map((x) => `<div class="learn"><b>${esc(T(x.name))}</b> <span class="label">${esc(T(x.country))}</span><ul>${(x.facts || []).map((f) => `<li>${lead(T(f))}</li>`).join('')}</ul>${x.kid ? `<p class="kidline"><b>${L('เล่าให้เด็กฟัง', 'For the kids')}</b> ${esc(T(x.kid))}</p>` : ''}</div>`).join('')}</details>` : ''}
${(pl.quiz || []).length ? `<details class="sub"><summary>${L('ถามหนูในรถ', 'Quiz in the car')} <span class="label">· ${pl.quiz.length}</span></summary>${quizHtml(pl.quiz)}</details>` : ''}
${pl.tale ? taleHtml(t, i, pl.tale) : ''}`}
${o.learn ? '' : `<p class="label">${L('จากคู่มือ · ราคาและเวลาเปิดเช็กซ้ำก่อนไป · เลขจองไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p>`}</div></div></details>`;
}
const eatLi = (e) => `<li><b>${e.q ? mapA(e.q, esc(e.name) + ' ↗') : esc(e.name)}</b>${e.pr ? ` <span class="label">${esc(T(e.pr))}</span>` : ''}${T(e.note) ? `<br><small>${esc(T(e.note))}</small>` : ''}</li>`;
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
const HUB_PIC = { lang: '/art/hub/lang.webp', textsize: '/art/hub/textsize.webp', emoji: '/art/hub/emoji.webp', review: '/art/hub/review.webp', today: '/art/hub/today.webp', log: '/art/emoji/camera.webp', book: '/art/hub/book.webp', eat: '/art/hub/eat.webp', plan: '/art/emoji/travel-map.webp',
  stays: '/art/hub/stays.webp', sos: '/art/hub/sos.webp', prep: '/art/emoji/suitcase.webp', learn: '/art/hub/learn.webp', firsts: '/art/emoji/star.webp',
  hearts: '/art/emoji/heart.webp', offline: '/art/hub/offline.webp', camera: '/art/hub/album.webp', passport: '/art/kidui/bar-passport.webp',
  money: '/art/hub/money.webp', notebook: '/art/hub/notebook.webp', kid: '/art/emoji/joy.webp', shelf: '/art/hub/shelf.webp', home: '/art/kidui/bar-home.webp',
  family: '/art/hub/family.webp', relatives: '/art/hub/relatives.webp', helper: '/art/hub/helper.webp', settings: '/art/hub/settings.webp',
  checkphone: '/art/hub/checkphone.webp', devices: '/art/hub/devices.webp', room: '/art/hub/room.webp', privacy: '/art/hub/privacy.webp', find: '/art/hub/find.webp',
  passkey: '/art/hub/passkey.webp', taste: '/art/emoji/heart.webp', comment: '/art/hub/comment.webp', growth: '/art/hub/growth.webp', bell: '/art/hub/bell.webp', famap: '/art/hub/map.webp', year: '/art/hub/year.webp', letter: '/art/hub/letter.webp', manual: '/art/hub/manual.webp', pencil: '/art/hub/pencil.webp', snapcam: '/art/hub/camera.webp' };
/* The settings-type pages wear the menu's look (owner, Nov 2026: "ปรับ UI ให้เข้ากับส่วนอื่นของเล่ม ทำให้สวยงาม"): a head band in the
   page's own pastel with its picture in a ringed circle, and each part a card whose heading carries its picture. Colours = the menu's brights. */
const PG = { blue: '#4F7BFF', orange: '#FF9A3C', teal: '#1CC9A4', purple: '#C850F0', pink: '#FF6FA8', gold: '#F2B90C', cyan: '#22D3EE', lime: '#9BD82A' };
const pageHead = (pic, g, kicker, title, lede) => `<header class="phead pz" style="--g1:${g}"><span class="phpic">${HUB_PIC[pic] ? `<img src="${HUB_PIC[pic]}" alt="" draggable="false">` : ''}</span><div class="phtx"><div class="phk">${kicker}</div><h1 class="h2">${title}</h1>${lede ? `<p>${lede}</p>` : ''}</div></header>`;
const pcard = (pic, g, title, body, cls = '', id = '') => `<section class="pcard${cls ? ' ' + cls : ''}"${id ? ` id="${id}"` : ''} style="--g1:${g}"><h3 class="pch"><span class="pcpic">${HUB_PIC[pic] ? `<img src="${HUB_PIC[pic]}" alt="" draggable="false">` : ''}</span><span>${title}</span></h3>${body}</section>`;
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
  const tiles = [
    t.kind === 'snap' && !snapLive(t) ? '' : tile('today', `#/t/${esc(t.id)}/today`, esc(t.kind === 'snap' ? L('ถ่ายรูป เลือกรูป บอกว่าอยู่ที่ไหน', 'Photos and where we are') : todayStatus), 'today' + (dn >= 0 || t.kind === 'snap' ? ' hi' : ''), artImg(t, i, 'tart')),
    tile('book', `#/t/${esc(t.id)}/book`, esc([st.photos && L(`${st.photos} รูป`, `${st.photos} photo${st.photos > 1 ? 's' : ''}`), st.quotes && L(`${st.quotes} คำพูด`, `${st.quotes} quote${st.quotes > 1 ? 's' : ''}`), got && L(`ตรา ${got}`, `${got} stamp${got > 1 ? 's' : ''}`)].filter(Boolean).join(' · ') || L('ยังว่าง — เติมได้ระหว่างทริป', 'Empty for now — fills in on the trip'))),
    // the travel notebook and the kids' passports are on the shelf (they span every book), so the menu holds neither
    // the menu never repeats the bar below (owner, Nov 2026): record and eat are on the parents' bar, firsts is a row in the memory book (relatives: on their bar), so relatives alone keep the eat tile
    eatN && !ed ? tile('eat', `#/t/${esc(t.id)}/eat`, esc(L(`${eatN} ร้าน · ${picks} ร้านแนะนำ`, `${eatN} places · ${picks} picks`))) : '',
    t.kind === 'snap' ? '' : tile('plan', `#/t/${esc(t.id)}/plan`, esc(L(`${t.days.length} วัน · ${stops} จุดแวะ`, `${t.days.length} days · ${stops} stops`))),   // a book from photos has no plan
    has.stays ? tile('stays', `#/t/${esc(t.id)}/stays`, esc(tonight ? L(`คืนนี้: ${tonight.name}`, `Tonight: ${tonight.name}`) : ((n.stays || []).length ? L(`${n.stays.length} ที่พัก`, `${n.stays.length} stays`) : L('ที่พัก', 'Stays')))) : '',
    has.sos ? tile('sos', `#/t/${esc(t.id)}/sos`, esc(main ? `${String(main.tel).split(' · ')[0]} · ${T(main.label)}` : L('ถ้า…ก็…', 'If… then…')), 'sos') : '',
    has.prep ? tile('prep', `#/t/${esc(t.id)}/prep`, esc([(n.pack || []).length && L('จัดกระเป๋า', 'Packing'), n.visa && L('วีซ่า', 'Visa'), n.bio && L('ด่านกักกัน', 'Biosecurity'), n.car && L('รถเช่า', 'The van'), n.ifthen && n.ifthen.book && L('จองล่วงหน้า', 'Book ahead'), n.prices && L('ค่าเข้า', 'Prices')].filter(Boolean).join(' · '))) : '',
    has.learn ? tile('learn', `#/t/${esc(t.id)}/learn`, esc([learnN && L(`${learnN} เรื่อง`, `${learnN} cards`), (n.wild || []).length && (n.wildLabel ? `${T(n.wildLabel.short)} ${n.wild.length}` : L(`สัตว์ ${n.wild.length} ชนิด`, `${n.wild.length} animals`)), quizN && L(`คำถาม ${quizN} ข้อ`, `${quizN} questions`), (n.general || []).length && L('คำศัพท์', 'Words')].filter(Boolean).join(' · '))) : '',
    st.photos ? `<a class="tile t-photos" href="#/t/${esc(t.id)}/photos">${hubE('camera')}<b>${L('รูปตามแท็ก', 'Photos by tag')}</b><small>${esc(((n) => (n ? L(`${st.photos} รูป · ${n} แท็ก`, `${st.photos} photos · ${n} tags`) : L(`${st.photos} รูป · ยังไม่มีแท็ก`, `${st.photos} photos · no tags yet`)))(new Set(mediaOf(t.id).flatMap(tagsOf)).size))}</small></a>` : '',
    tile('hearts', `#/t/${esc(t.id)}/hearts`, esc(hs.length ? L(`${hs.length} ดวงถึงเด็กๆ`, `${hs.length} for the kids`) : L('ส่งหัวใจถึงเด็กๆ', 'Send the kids a heart'))),
    ed && spendOf(t.id).length ? `<a class="tile t-spend" href="#/t/${esc(t.id)}/spend">${hubE('money')}<b>${L('ค่าใช้จ่าย', 'Spending')}</b><small>${esc(sumMoney(spendOf(t.id)))}</small></a>` : '',
  ].filter(Boolean);
  // not topics of the book, so not tiles (owner, Nov 2026: "ควรจะเป็นปุ่มแยก"): keeping the book on the phone and the way back to the shelf are
  // two rows of their own — the offline row comes up under Today while it still needs a tap (not stored yet, or new photos), else it waits at the foot.
  // Kid mode has its button on the bar below, so the menu no longer repeats it.
  // (a book from photos made after the trip has no flight to store it before: its row waits at the foot)
  const offWarn = !(off.got && !off.stale) && !(t.kind === 'snap' && !snapLive(t)), row = (cls, href, k, b, sm) => `<a class="hubrow ${cls}" href="${href}">${hubE(k)}<span class="ht"><b>${b}</b><small>${sm}</small></span>${ic('chev')}</a>`;
  const offRow = ed ? row(`t-offline${offWarn ? ' warn' : ''}`, `#/t/${esc(t.id)}/offline`, 'offline', L('เก็บเล่มไว้ใช้ตอนไม่มีเน็ต', 'Keep this book for no signal'), esc(!off.got ? L('ยังไม่ได้เก็บ — กดก่อนขึ้นเครื่อง', 'Not stored yet — tap before the flight')
    : off.stale ? L(`เก็บเมื่อ ${off.when} · มีรูปใหม่ ${off.fresh} รูป กดเก็บเพิ่ม`, `Stored ${off.when} · ${off.fresh} new photo${off.fresh > 1 ? 's' : ''}, tap to top up`) : L(`เก็บไว้ในเครื่องแล้ว · ${off.when}`, `Stored on this phone · ${off.when}`))) : '';
  // a closed book from photos: the photos found later go in from here, each to the day it was taken (snap.js snapMoreAdd)
  const moreRow = (ed && t.kind === 'snap' ? row('snapeditgo', `#/t/${esc(t.id)}/days`, 'doc', L('แก้ชื่อเล่ม ชื่อวัน และสถานที่', 'Rename the book, its days and places'), L('ย้ายรูปไปวันอื่นได้ในหน้าดูรูป', 'Move a photo to another day from its viewer')) : '')
    + (ed && t.kind === 'snap' ? `<button type="button" class="hubrow snapagaingo" data-a="snapagain" data-t="${esc(t.id)}">${hubE('plan')}<span class="ht"><b>${L('ไปที่นี่อีกครั้ง', 'Go here again')}</b><small>${L('เล่มใหม่ เมืองเดิมทีละวัน เลือกวันไปได้', 'A new book, the same towns day by day')}</small></span>${ic('chev')}</button>` : '')
    + (ed && t.kind === 'snap' && !snapLive(t) ? `<button type="button" class="hubrow snapmorego" data-a="snapmore" data-t="${esc(t.id)}">${hubE('camera')}<span class="ht"><b>${L('เติมรูปที่เจอทีหลัง', 'Add photos found later')}</b><small>${L('รูปลงวันที่ถ่ายเอง วันใหม่ต่อท้ายให้', 'Each goes to the day it was taken')}</small></span>${ic('chev')}</button>` : '');
  const shelfRow = moreRow + (ed && t.kind === 'snap' && S.features.story ? `<button type="button" class="hubrow snapplango" data-a="snapplan" data-t="${esc(t.id)}">${hubE('famap')}<span class="ht"><b>${L('วางแผนทริปแบบนี้กับผู้ช่วย', 'Plan a trip like this with the helper')}</b><small>${L('เมืองและวันของเล่มนี้เป็นคำตอบตั้งต้น', 'This book’s towns and days to start from')}</small></span>${ic('chev')}</button>` : '') + (vfOn(t) ? row('checkgo', `#/t/${esc(t.id)}/check`, 'find', L('เช็กร้านและที่เที่ยวบนเว็บ', 'Check the places on the web'), esc(vfSub(t))) : '') + row('shelfgo', '#/', 'shelf', L('ชั้นหนังสือ', 'Bookshelf'), L('เปลี่ยนเล่ม', 'Other books'))
    + (ed && t.kind === 'snap' && S.features.story ? row('snapdraftgo', `#/t/${esc(t.id)}/draft`, 'sparkle', L('ให้ผู้ช่วยร่างเล่ม', 'Let the helper draft the book'), L('ชื่อวัน สรุปวัน คำนำ นิทาน', 'Day names, summaries, foreword, stories')) : '');
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
${hero ? `<div class="hubgrid lead${tl}">${hero}</div>` : ''}${offWarn ? offRow : ''}${groups}<div class="hubrows">${offWarn ? '' : offRow}${shelfRow}</div>${typeof questLine === 'function' ? questLine(t) : ''}${pick}${artCard(t)}${isEditor() && t.source && t.source !== 'seed' ? `<div class="row end tripdel"><button type="button" class="mini" data-a="tripdel" data-t="${esc(t.id)}">${L('ลบเล่มนี้', 'Delete this book')}</button></div>` : ''}`;
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
  let near = false; const extra = [];
  if (!list.length) {   // nothing as typed: look again forgivingly (spacing, accents, a slip), and mark what was found for the snippet
    for (const e of searchIndex(t)) {
      let score = 0;
      for (const w of terms) {
        const inT = fzFind(`${e.tl.th} ${e.tl.en}`, w), inB = inT ? '' : fzFind(`${e.lc.th} ${e.lc.en}`, w);
        if (!inT && !inB) { score = 0; break; }
        score += inT ? 3 : 1; extra.push(inT || inB);
      }
      if (score) list.push({ e, score });
    }
    near = list.length > 0;
  }
  list.sort((a, b) => b.score - a.score || TOPIC_RANK[a.e.topic] - TOPIC_RANK[b.e.topic] || a.e.i - b.e.i);
  return { list, alts: [...new Set([...alts.flat(), ...extra.filter((x) => x && x.length >= 3)])], near };
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
  const out = mediaOf(t.id).filter((m) => {
    const tags = tagsOf(m).flatMap((k) => { const x = PHOTO_TAGS.find((p) => p[0] === k); return x ? [k, x[2], x[3]] : [k]; });
    const hay = [m.caption, m.place, ...tags].join(' ').toLowerCase();
    return alts.every((a) => a.some((w) => wHas(hay, w)));
  });
  if (out.length) return out;
  // nothing as typed: the same photos, forgivingly
  return mediaOf(t.id).filter((m) => { const hay = [m.caption, m.place, ...tagsOf(m)].join(' '); return terms.every((w) => !!fzFind(hay, w)); });
}
/* Search every book (owner, Nov 2026: "ค้นข้ามทุกเล่ม เช่น มีมี่เห็นหิมะครั้งแรกเมื่อไร หรือ รูปที่มีช้าง"): the family's own memories —
   the kids' words, notes and favourites, the firsts (their own words and their badge names), each day's summary and bedtime story,
   the day's name and place, the photos' captions, places and tags, the relatives' hearts — across every book, on the phone (the state
   holds them all; it works with no signal). Every word must match, through the book search's synonyms; a hit says when, in which book
   and how old the children were then. Chips narrow it to one child or to the firsts. */
const MEM_SYN = [['หิมะ', 'snow', 'snowman', 'ตุ๊กตาหิมะ'], ['ช้าง', 'elephant', 'elephants'], ['ทะเล', 'sea', 'beach', 'ชายหาด', 'หาด'], ['ปลา', 'fish', 'aquarium', 'อควาเรียม'],
  ['เครื่องบิน', 'plane', 'flight', 'airport', 'สนามบิน'], ['รถไฟ', 'train', 'mtr', 'tram'], ['เรือ', 'boat', 'ferry'], ['สวนสนุก', 'theme park', 'disney', 'disneyland'],
  ['ไอติม', 'ไอศกรีม', 'ice cream', 'gelato'], ['ฝน', 'rain', 'umbrella'], ['ภูเขา', 'mountain', 'hill', 'hike'], ['สวนสัตว์', 'zoo', 'animals', 'สัตว์'], ['นก', 'bird', 'birds'],
  ['ครั้งแรก', 'first', 'firsts'], ['ร้องไห้', 'cried', 'cry', 'tears'], ['หัวเราะ', 'laugh', 'laughed', 'giggle'], ['นอน', 'sleep', 'slept', 'nap'], ['ว่ายน้ำ', 'swim', 'pool', 'สระ']];
const memAlts = (w) => { const set = new Set(termAlts(w)); MEM_SYN.forEach((g) => { if (g.some((x) => x === w || (w.length >= 3 && x.startsWith(w)))) g.forEach((x) => set.add(x)); }); return [...set]; };
let findQ = '', findWho = '', findFirsts = false;
function memIndex() {
  const out = [];
  for (const t of S.trips) {
    const day = (i) => (i === null || i === undefined ? null : t.days[i] || null);
    for (const e of entriesOf(t.id)) {
      if (!['quote', 'note', 'fav', 'first', 'sum', 'story'].includes(e.kind)) continue;
      let text = e.text || '';
      if (e.kind === 'first') { const f = firstLabel(t, e.first_key); text = `${f.e} ${f.t}${e.text ? ' — ' + e.text : ''}`; }
      if (!text.trim()) continue;
      const d = day(e.day);
      out.push({ t, kind: e.kind, child: e.child, day: e.day, date: d ? d.date : t.date_from, text, extra: [d && T(d.title), d && d.place && T(d.place), e.tr].filter(Boolean).join(' ') });
    }
    for (const m of mediaOf(t.id)) {
      const tags = tagsOf(m).flatMap((k) => { const x = PHOTO_TAGS.find((p) => p[0] === k); return x ? [k, x[2], x[3]] : [k]; });
      const d = day(m.day), hay = [m.caption, m.place, ...tags].filter(Boolean).join(' ');
      if (hay) out.push({ t, kind: 'photo', m, day: m.day, date: d ? d.date : t.date_from, text: m.caption || '', extra: hay + ' ' + [d && T(d.title), d && d.place && T(d.place)].filter(Boolean).join(' ') });
    }
    for (const h of heartsOf(t.id)) if (h.text) out.push({ t, kind: 'heart', child: h.child, day: h.day, date: (day(h.day) || {}).date || t.date_from, text: `${h.emoji} ${h.text} — ${h.from}`, extra: '' });
  }
  return out;
}
function memFind(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean); if (!terms.length) return { list: [], alts: [] };
  const alts = terms.map(memAlts), list = [];
  for (const x of memIndex()) {
    if (findWho && x.child && x.child !== findWho && x.child !== 'both') continue;
    if (findWho && !x.child && x.kind !== 'photo') continue;
    if (findFirsts && x.kind !== 'first') continue;
    const hay = (x.text + ' ' + x.extra).toLowerCase();
    if (alts.every((a) => a.some((w) => wHas(hay, w)))) list.push(x);
  }
  let near = false; const extra = [];
  if (!list.length) {   // nothing as typed: look again forgivingly
    for (const x of memIndex()) {
      if (findWho && x.child && x.child !== findWho && x.child !== 'both') continue;
      if (findWho && !x.child && x.kind !== 'photo') continue;
      if (findFirsts && x.kind !== 'first') continue;
      const hay = x.text + ' ' + x.extra, got = terms.map((w) => fzFind(hay, w));
      if (got.every(Boolean)) { list.push(x); extra.push(...got); }
    }
    near = list.length > 0;
  }
  list.sort((a, b) => String(a.date).localeCompare(String(b.date)));
  return { list, alts: [...new Set([...alts.flat(), ...extra.filter((w) => w.length >= 3)])], near };
}
function findResults() {
  const q = findQ.trim();
  if (!q) return `<p class="empty">${L('พิมพ์สิ่งที่อยากหา เช่น หิมะ ช้าง ทะเล ไอติม — ไทยหรืออังกฤษก็ได้', 'Type what you remember — snow, elephant, beach, ice cream. Thai or English')}</p>`;
  const { list, alts, near } = memFind(q);
  if (!list.length) return `<p class="empty">${L(`ไม่พบ “${esc(q)}” ในเล่มไหนเลย ลองคำอื่น`, `Nothing for “${esc(q)}” in any book — try another word`)}</p>`;
  const kindName = { quote: ['คำพูด', 'Words'], note: ['โน้ตพ่อแม่', 'Parents’ note'], fav: ['ของโปรด', 'Favourite'], first: ['ครั้งแรก', 'A first'], sum: ['สรุปวัน', 'The day'], story: ['นิทาน', 'Story'], photo: ['รูป', 'Photo'], heart: ['หัวใจจากญาติ', 'A heart'] };
  const mark = (tx) => { const re = new RegExp(`(${[...alts].sort((a, b) => b.length - a.length).map((w) => wre(w).source).join('|')})`, 'gi'); const s = String(tx).slice(0, 220); return s.split(re).map((part, k) => (k % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join('') + (String(tx).length > 220 ? ' …' : ''); };
  const books = [...new Set(list.map((x) => x.t))];
  return `${near ? `<p class="label fznear">${L(`ไม่พบ “${esc(q)}” ตรงตัว · ผลที่ใกล้เคียง`, `No exact match for “${esc(q)}” · close matches`)}</p>` : ''}<p class="label" id="findn">${L(`พบ ${list.length} รายการ ใน ${books.length} เล่ม`, `${list.length} found in ${books.length} book${books.length > 1 ? 's' : ''}`)}</p>
${books.map((t) => { const xs = list.filter((x) => x.t === t), ph = xs.filter((x) => x.kind === 'photo'), rest = xs.filter((x) => x.kind !== 'photo');
    return `<section class="findbook"><h3>${esc(T(t.title).split(' · ')[0])} <span class="label">· ${esc(fmtRange(t))}</span></h3>
${ph.length ? `<div class="mosaic">${ph.slice(0, 12).map((x) => photoBtn(t, x.m)).join('')}</div>` : ''}
<ul class="sres">${rest.slice(0, 40).map((x) => { const ages = famAgesOn(x.date), href = x.day !== null && x.day !== undefined ? `#/t/${esc(t.id)}/book/d/${x.day}` : `#/t/${esc(t.id)}/book`;
      return `<li><a href="${href}"><span class="stopic">${esc(L(kindName[x.kind][0], kindName[x.kind][1]))}${x.child && x.child !== 'both' ? ' · ' + esc(kidName(x.child)) : ''}</span><b>${mark(x.text)}</b><span class="label">${esc(fmtDay(x.date, { day: 'numeric', month: 'short', year: 'numeric' }))}${ages ? ` · ${L('ตอน', 'then')} ${ages}` : ''}</span></a></li>`; }).join('')}</ul></section>`; }).join('')}`;
}
function viewFind() {
  return `<section class="tp tp-search">${pageHead('find', PG.orange, L('ทุกเล่มรวมกัน', 'All our books'), L('ค้นความทรงจำทุกเล่ม', 'Search every book'), '')}
<div class="bookbar"><input id="findq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(findQ)}" placeholder="${L('เช่น หิมะ ช้าง ทะเล…', 'e.g. snow, elephant, beach…')}" aria-label="${L('ค้นความทรงจำทุกเล่ม', 'Search every book')}"></div>
<div class="row chips" role="group">${[''].concat(children().map((k) => k.slug)).map((s) => `<button type="button" class="chip" data-a="findwho" data-v="${esc(s)}" aria-pressed="${findWho === s}">${s ? esc(kidName(s)) : L('ทุกคน', 'Everyone')}</button>`).join('')}<button type="button" class="chip" data-a="findfirst" aria-pressed="${findFirsts}">⭐ ${L('เฉพาะครั้งแรก', 'Firsts only')}</button></div>
<div id="findres">${findResults()}</div></section>`;
}
let bookQ = '', bookTrip = '';
// the last three searches that led somewhere, on this phone only
const rememberQ = () => { const q = bookQ.trim(); if (!q) return; ls('recentq', [q, ...(ls('recentq') || []).filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 3)); };
const topicName = (k) => (k === 'today' ? L('แผนรายวัน', 'Day plan') : secTitle(k));
function bookResults(t) {
  const q = bookQ.trim();
  if (!q) return `<p class="empty">${L('พิมพ์คำที่ต้องการ เช่น หมอ แท็กซี่ ห้องน้ำ — ไทยหรืออังกฤษก็ได้', 'Type what you need — doctor, taxi, toilet, lost child. Thai and English both work')}</p>`;
  const { list, alts, near } = bookFind(t, q), ph = photoFind(t, q);
  const phHtml = ph.length ? `<div class="sphotos"><p class="label">${ic('camera')} ${L(`รูป ${ph.length} รูป`, `${ph.length} photo${ph.length > 1 ? 's' : ''}`)}${ph.length > 12 ? L(' · 12 รูปแรก', ' · the first 12') : ''}</p><div class="mosaic">${ph.slice(0, 12).map((m) => photoBtn(t, m)).join('')}</div></div>` : '';
  if (!list.length && ph.length) return phHtml;
  if (!list.length) return `<p class="empty">${L(`ไม่พบ “${esc(q)}” ลองคำสั้นลงหรือคำอื่น`, `Nothing for “${esc(q)}” — try a shorter or different word`)}</p>`;
  const shown = list.slice(0, 30);
  return `${phHtml}${near ? `<p class="label fznear">${L(`ไม่พบ “${esc(q)}” ตรงตัว · ผลที่ใกล้เคียง`, `No exact match for “${esc(q)}” · close matches`)}</p>` : ''}<p class="label" id="bookn">${L(`พบ ${list.length} รายการ`, `${list.length} found`)}${list.length > shown.length ? L(` · แสดง ${shown.length} อันดับแรก พิมพ์ให้เจาะจงขึ้นเพื่อกรอง`, ` · the top ${shown.length} — type more to narrow`) : ''}</p>
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
// a meal and its backup each have a navigate pin: the two stack as a pair (class "two" — the pick's pin bleeds up, the backup's down, 4 px between
// them), so neither 44 px tap covers the other (they overlapped by 10–16 px: the live check of Nov 2026)
const mealDd = (p) => { const two = p.q && p.alt && p.alt.q ? ' two' : '';
  return `<span class="nmrow${two}"><b>${esc(p.name)}</b>${navB(p.q, p.name)}</span>${p.alt ? `<small class="bk"><span class="nmrow${two}"><span>${L('ร้านสำรอง', 'Backup')}: ${esc(p.alt.name)}</span>${navB(p.alt.q, p.alt.name)}</span></small>` : ''}`; };
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
const tlNote = (r) => (r && r.note ? T(r.note) : '');   // a step's own note (the Australia book has 52): it was on the full plan only
const tlMore = (r) => !!(r && r.h && T(r.h)) || T(r).includes(' · ') || !!tlNote(r);
const tlBrief = (r) => { const own = r && r.h && T(r.h), nt = tlNote(r); const [a, ...b] = own ? [own, ...T(r).split(' · ')] : T(r).split(' · '); return `<span class="tm"><span class="tmt">${own ? emoIn(esc(a)) : tlIcon(r) + esc(a)}</span>${b.length || nt ? `<span class="tlchev" aria-hidden="true">${ic('chev')}</span>` : ''}</span>${b.length || nt ? `<ul class="tsub">${b.map((x) => `<li>${esc(x)}</li>`).join('')}${nt ? `<li class="tnote">${esc(nt)}</li>` : ''}</ul>` : ''}`; };
/* Today is one page (owner, Nov 2026: "Full plan จำเป็นไหม … ทำให้เหลือหน้าเดียวโดยที่รวมกัน แต่อย่าให้เสียการใช้งานง่ายของหน้าวันนี้").
   The second page (/today/<i>/full) repeated the timeline and then held two thirds of the day's words nowhere else: the legs with their
   directions, the stay's address, the bill, the day's tips, each step's note, the long eating lists, the learn cards, quiz and story.
   Now the short view is the page as it was, and every box carries its own "more" one tap below it:
     timeline step → its details and its note · getting around → a row a leg, the manual's words + tonight's address (fold) · meals → what to order at the picks (fold) · eat along the route → the long list (the box is the fold)
     money → the bill (the box is the fold) · good to know → the tips (the box is the fold) · learn → that day on the learn page (link).
   "สรุป · เต็ม" (daySeg, action dayfull) opens or closes all of it in place; the address keeps the choice (/full), so a search result or the
   record page's link lands on the day fully open. Two versions, always — on one page. */
// the day's legs on Today (owner, Nov 2026, on the old full page's "getting around": "ปรับส่วนนี้ให้ดูง่ายหน่อย" — bullets, then a dashed line of
// the same legs, an underlined "Directions", a second route button): one row a leg — how we travel as a picture (the timeline's own icons),
// from on one line and "→ to" on the next, the how-and-how-long under them, and the navigate pin of every other place on this page
// a leg's picture is the way of travel its words name first ("Walk (or a taxi with bags)" is a walk), not the first in the icon list
const legIcon = (en) => { const m = TL_ICON.map(([re, e]) => [String(en || '').search(re), e]).filter(([k]) => k >= 0).sort((x, y) => x[0] - y[0])[0]; return m ? `<span class="tli">${emoIn(m[1])}</span>` : ''; };
const legRow = (g) => { const by = T(g.by), icon = legIcon((g.by && g.by.en) || by);
  return `<li><span class="dli" aria-hidden="true">${icon || '<i class="dot"></i>'}</span><span class="dlt"><b>${esc(g.from)}</b><b class="to"><span class="arr" aria-hidden="true">→</span> ${esc(g.to)}</b>${by ? `<small>${esc(by)}</small>` : ''}</span>${g.url ? `<a class="navb" href="${esc(g.url)}" target="_blank" rel="noopener" aria-label="${esc(L('นำทาง: ', 'Directions: ') + g.from + ' → ' + g.to)}">${ic('pin')}</a>` : ''}</li>`; };
const daySeg = (full) => `<div class="dayhd"><b>${L('แผนของวัน', 'The day’s plan')}</b><span class="seg dayseg" role="group" aria-label="${L('ดูแผนแบบสรุปหรือแบบเต็ม', 'The plan short or in full')}">${[['0', L('สรุป', 'Short')], ['1', L('เต็ม', 'Full')]].map(([v, lb]) => `<button type="button" data-a="dayfull" data-v="${v}" aria-pressed="${(v === '1') === !!full}">${lb}</button>`).join('')}</span></div>`;
// the if-then table as the owner's seeds write it ({cols, rows, mishap}) — the in-app import's model answers {plans:{head, cols, rows}}
const ifthenOf = (f) => (f && !Array.isArray(f.rows) && f.plans && Array.isArray(f.plans.rows) ? { ...f, cols: f.plans.cols || f.cols, rows: f.plans.rows, head: f.plans.head || f.head } : { ...(f || {}), rows: Array.isArray(f && f.rows) ? f.rows : [] });
// on the day itself: which timeline steps are behind us and which one is next (each row in its own time zone — Bangkok rows on day 1)
function tlStates(t, i) {
  const st = []; if (dayNow(t) !== i) return st; let found = false;
  (((t.days[i] || {}).plan || {}).plan || []).forEach((r, k) => { const m = String(r.t || '').match(/(\d{1,2}):(\d{2})/); if (!m) return;
    const at = m[1].padStart(2, '0') + ':' + m[2], now = fmtTime(Date.now(), r.tz || t.timezone);
    if (at <= now) st[k] = 'past'; else if (!found) { st[k] = 'next'; found = true; } });
  return st;
}
// a time written in words ("ตี 3": no HH:MM, so no reminder fires in the night) reads in the page's language
const tlTime = (r) => { const x = String((r && r.t) || ''); return lang === 'en' ? x.replace(/^ตี\s*(\d{1,2})$/, '$1 am') : x; };
const tlHead = (r) => { const own = r && r.h && T(r.h); return own ? emoIn(esc(own)) : tlIcon(r) + esc(T(r).split(' · ')[0]); };
// what a parent on the move opens the page for (owner, Nov 2026: "ง่ายต่อการใช้เดินทาง"): the next step, big, right under the day's name —
// a tap goes to it in the timeline; once every step is behind us it says so (and leads to tonight's record for the parents)
function nextCard(t, i) {
  if (dayNow(t) !== i) return '';
  const rows = ((t.days[i].plan || {}).plan || []), st = tlStates(t, i), k = st.indexOf('next'), after = k >= 0 ? rows.slice(k + 1).find((r) => /\d{1,2}:\d{2}/.test(r.t || '')) : null;
  if (k >= 0) return `<button type="button" class="nextc" data-a="jump" data-v="#tlbox"><span class="nx"><span class="nl">${L('ถัดไป', 'Next')}</span><time>${esc(tlTime(rows[k]))}</time></span><span class="nt"><b>${tlHead(rows[k])}</b>${after ? `<small>${L('ต่อจากนั้น', 'Then')} ${esc(tlTime(after))} · ${tlHead(after)}</small>` : ''}</span>${ic('chev')}</button>`;
  if (!st.includes('past')) return '';
  return isEditor() ? `<a class="nextc done" href="#/t/${esc(t.id)}/log/${i}"><span class="nx"><span class="nl">${L('วันนี้', 'Today')}</span><time>✓</time></span><span class="nt"><b>${L('ครบทุกช่วงของวันนี้แล้ว', 'Every step of today is done')}</b><small>${L('บันทึกวันนี้ก่อนนอน', 'Record the day before bed')}</small></span>${ic('chev')}</a>`
    : `<div class="nextc done"><span class="nx"><span class="nl">${L('วันนี้', 'Today')}</span><time>✓</time></span><span class="nt"><b>${L('ครบทุกช่วงของวันนี้แล้ว', 'Every step of today is done')}</b></span></div>`;
}
function dayGlance(t, i, pre, split, full) {   // pre (before the trip; never named `brief`, which would hide the brief() teaser below and crash a money line without "Today ≈"): the timeline, then everything else folded under one line; split: [the timeline, the rest], so the page can put the reminders line and the bag between them; full: every step, fold and the rest of the day open
  const d = t.days[i], pl = d.plan || {}, rows = pl.plan || [], op = full ? ' open' : '';
  if (!rows.length && !pl.moving && !pl.pick && !pl.planB) return '';
  const st = tlStates(t, i);   // on the day itself: steps whose time has passed fade, the next one is marked
  const money = T(pl.money), mm = money.match(/(?:วันนี้|today)\s*≈\s*[^·(]+/i), nl = (pl.learn || []).length, nq = (pl.quiz || []).length, tips = pl.tips || [], legs = pl.legs || [];
  const row = (dt, dd, cls) => `<div${cls ? ` class="${cls}"` : ''}><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const chv = ic('chev', 'chv');
  const box = (c, icon, title, rowsHtml, foot) => (rowsHtml || foot ? `<section class="cbox c-${c}"><h3 class="ch">${ic(icon)}${title}</h3>${rowsHtml ? `<dl class="dsheet">${rowsHtml}</dl>` : ''}${foot || ''}</section>` : '');
  const more = (sum, body) => `<details class="dfold cmore"${op}><summary><span class="fs">${sum}</span>${chv}</summary><div class="fb">${body}</div></details>`;   // a box's own detail, at its foot
  const fbox = (c, icon, title, sub, body) => `<section class="cbox c-${c} cone"><details class="dfold"${op}><summary class="ch">${ic(icon)}<span class="fs">${title}${sub ? ` <span class="cs">${sub}</span>` : ''}</span>${chv}</summary><div class="fb">${body}</div></details></section>`;   // a box that is one fold: its heading is the summary
  const lbox = (c, icon, href, title, sub) => `<section class="cbox c-${c} cone"><a class="ch" href="${href}">${ic(icon)}<span class="fs">${title}${sub ? ` <span class="cs">${sub}</span>` : ''}</span>${ic('chev', 'chl')}</a></section>`;   // a box that is one link: the long list lives on its own page
  const addr = pl.stay && pl.stay.addr;
  // getting around & tonight (owner, Nov 2026: a list of bullet points here "ยัง UI ไม่สวย … ปรับให้เข้ากับอันอื่น"): the box reads like the meals and the
  // timeline — a row a leg (the travel picture, from and "→ to", how long, the navigate pin), tonight's bed and the day's map in the same shape.
  // The manual's own words about the day's travel (prices, how often, which bay) and the stay's address wait in the foot fold; a one-line
  // summary ("2 h 55 in 3 legs") stays above the rows. A day without legs shows those words as its one row.
  const mv = T(pl.moving), mvShort = !!mv && points(mv).length === 1 && mv.length <= 48, mvFold = !!mv && !mvShort && legs.length > 0;
  const maps = ((t.info || {}).more || []).filter((m) => m.img && new RegExp(`^Day ${i + 1}\\b`).test((m.title || {}).en || ''));
  const goRows = [...(legs.length ? legs.map(legRow) : mv && !mvShort ? [`<li><span class="dli" aria-hidden="true">${ic('route')}</span><span class="dlt">${pts(mv, 'tight')}</span></li>`] : []),
    pl.stay && `<li class="dlbed"><span class="dli" aria-hidden="true">${emoIn('🛏️')}</span><span class="dlt"><small>${L('คืนนี้', 'Tonight')}</small><b>${esc(pl.stay.name)}</b></span>${navB(pl.stay.q || pl.stay.addr, pl.stay.name)}</li>`,
].filter(Boolean).join('');
  // the day's own map (HK day 2: the park at a glance) is a box of its own with the picture itself — it was one small link inside "Getting
  // around" that nobody found (owner, Nov 2026: "ใส่แผนที่ดิสนีให้ด้วย"); a tap opens it full size, the numbered stops fold under it
  const mapBox = maps.map((m) => `<section class="cbox c-rose dmap"><h3 class="ch">${ic('image')}${esc(T(m.title).replace(/^[^·]*·\s*/, ''))}</h3><a class="mapimg" href="${esc(m.img)}" target="_blank" rel="noopener" aria-label="${L('เปิดแผนที่เต็มจอ', 'Open the map full size')}"><img src="${esc(m.img)}" alt="${esc(T(m.title))}" loading="lazy"></a>${(m.rows || []).length ? more(L(`ลำดับจุดแวะ · ${m.rows.length} จุด`, `Our stops in order · ${m.rows.length}`), `<ol class="mapstops">${m.rows.map((r) => `<li><b>${esc(T(r.t))}</b><span>${esc(T(r.x))}</span></li>`).join('')}</ol>`) : ''}</section>`).join('');
  const go = `${mvShort ? `<p class="dlsum">${esc(mv)}</p>` : ''}${goRows ? `<ol class="dlegs">${goRows}</ol>` : ''}`;
  const goSum = [mvFold && L('รายละเอียดการเดินทาง', 'more about getting around'), addr && L('ที่อยู่ที่พัก', 'tonight’s address')].filter(Boolean).join(' · ');
  const goMore = goSum ? more(goSum.charAt(0).toUpperCase() + goSum.slice(1), `${mvFold ? pts(mv, 'tight') : ''}${addr ? stayLine(pl) : ''}`) : '';
  const picked = new Set((pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]).filter(Boolean)), nfood = (pl.food || []).reduce((n, f) => n + f.items.filter((x) => !picked.has(x.name)).length, 0) + eatMore(pl).length;
  // the manual's "local tip" of the day (plan.pick) is advice about the day — 16 of the 22 days of the two bundled books say nothing about a place
  // to eat — so it is not a row of the Meals box (it stood there as "ร้านเด็ด / Local pick"): it leads "Good to know today" under its own name
  const food = [...(pl.picks || []).map((p) => row(`<span class="mtag mk-${mealKind(p)}">${esc(T(p.meal).split(' · ')[0])}</span>${T(p.meal).includes(' · ') ? `<span class="mt">${esc(T(p.meal).split(' · ').slice(1).join(' · '))}</span>` : ''}`, mealDd(p), 'meal'))].filter(Boolean).join('');
  // the eating part of the manual's day, word for word: what to order at each pick and its backup, the places along the route by stop, the others nearby
  const near = eatMore(pl), foodMore = (pl.picks || []).length ? more(L('ร้านแนะนำสั่งอะไรดี', 'What to order at the picks'), `<ul class="picks">${pl.picks.map(pickHtml).join('')}</ul>`) : '';
  // the long list (the Australia book has 40 places on one day) is its own one-line box near the end, so opening it pushes nothing else down
  const along = nfood ? fbox('sun', 'eat', L('กินตามทางวันนี้', 'Eat along today’s route'), esc(L(`${nfood} ร้าน`, `${nfood} place${nfood === 1 ? '' : 's'}`)), `${(pl.food || []).length ? `<p class="label">${L('เรียงตามจุดที่ผ่าน · ★ = ร้านแนะนำ · กดชื่อเพื่อเปิด Google Maps', 'In the order you pass them · ★ = a pick · tap a name for Google Maps')}</p>${pl.food.map((f) => ((xs) => (xs.length ? `<h5>${esc(T(f.stop))}</h5><ul class="eats">${xs.map(foodHtml).join('')}</ul>` : ''))(f.items.filter((x) => !picked.has(x.name)))).join('')}` : ''}${near.length ? `<h5>${L('ร้านอื่นใกล้ๆ', 'More places to eat nearby')}</h5><ul class="eats">${near.map(eatLi).join('')}</ul>` : ''}`) : '';
  const lk = nl || nq || pl.tale ? infoBlocks(t).meta.learn.findIndex((m) => m.key === 'days') : -1;
  const live = wxLine(t, i), nknow = tips.length + (pl.pick ? 1 : 0);
  const tl = `${daySeg(full)}${rows.length ? `<section class="cbox c-sky" id="tlbox"><h3 class="ch">${ic('clock')}${L('ไทม์ไลน์', 'Timeline')}</h3><ol class="tl plan brief">${rows.map((r, k) => { const cl = [st[k], full && tlMore(r) ? 'open' : ''].filter(Boolean).join(' '); return `<li${cl ? ` class="${cl}"` : ''}><time>${esc(tlTime(r))}</time><div${tlMore(r) ? ` role="button" tabindex="0" aria-expanded="${!!full}"` : ''}>${st[k] === 'next' ? `<span class="nexttag">${L('ถัดไป', 'Next')}</span> ` : ''}${tlBrief(r)}</div></li>`; }).join('')}</ol></section>` : ''}`;
  const rest = `${live ? `<p class="wxpre">${ic('weather')} <span class="wxlive">${emoIn(esc(live))}</span></p>` : ''}${pre ? `<details class="dmore"${op}><summary><span><b>${L('รายละเอียดวันนี้', 'The rest of the day')}</b><small>${L('เดินทาง · มื้ออาหาร · แผนสำรอง · เงิน · ควรรู้', 'Getting around · meals · plan B · money · good to know')}</small></span>${ic('chev', 'chv')}</summary>` : ''}<div class="cgrid">${mapBox}${go || goMore ? `<section class="cbox c-ind"><h3 class="ch">${ic('route')}${L('เดินทางและที่พัก', 'Getting around & tonight')}</h3>${go}${goMore}</section>` : ''}${box('sun', 'eat', L('มื้ออาหาร', 'Meals'), food, foodMore)}${pl.planB ? `<section class="cbox c-hot"><h3 class="ch">${ic('shuffle')}${L('แผนสำรอง', 'Plan B')}</h3>${pts(T(pl.planB))}</section>` : ''}${money ? fbox('leaf', 'money', L('เงินวันนี้', 'Money today'), `<span class="num">${esc(mm ? mm[0].replace(/^(?:วันนี้|today)\s*/i, '').trim() : brief(money))}</span>`, moneyHtml(money)) : ''}${nknow ? fbox('teal', 'learn', L('ควรรู้วันนี้', 'Good to know today'), esc(L(`${nknow} ข้อ`, `${nknow} tip${nknow === 1 ? '' : 's'}`)), `<ul class="tips">${pl.pick ? `<li class="tk-local"><b class="tkl">${L('เคล็ดลับคนท้องถิ่น', 'Local tip')}</b>${emph(T(pl.pick))}</li>` : ''}${tips.map((x) => `<li${TIPK[x.kind] ? ` class="tk-${x.kind}"` : ''}>${lead(T(x))}</li>`).join('')}</ul>`) : ''}${along}${bedEats(t, i, fbox)}${rainSights(t, i, fbox)}${lk >= 0 ? lbox('rose', 'book', `#/t/${esc(t.id)}/learn/full/${lk}`, L('เรียนรู้ของวันนี้', 'Today’s things to learn'), esc([nl && L(`${nl} เรื่อง`, `${nl} card${nl === 1 ? '' : 's'}`), nq && L(`คำถามในรถ ${nq} ข้อ`, `${nq} car question${nq === 1 ? '' : 's'}`), pl.tale && L('นิทานของไกด์', 'the guide’s story')].filter(Boolean).join(' · '))) : ''}</div><p class="label dfoot"${full ? '' : ' hidden'}>${L('จากคู่มือ · ราคาและเวลาเปิดเช็กซ้ำก่อนไป · เลขจองไม่ได้เก็บที่นี่', 'From the manual · re-check prices and hours before travelling · booking numbers live in the guide app, not here')}</p>${pre ? '</details>' : ''}`;
  return split ? [tl, rest] : tl + rest;
}
// grown-ups switch the trip reminders on per phone (the server pushes 30 min before each timed step of the day);
// once on, the box leaves the Today page and lives on the Offline page (test / turn off)
// reminders, offered right after signing in (parents only), at the top of the shelf — until they are on or the parent says "later".
// On an iPhone in Safari the phone can't take reminders yet: the card says the one step that makes it possible (Home Screen).
function remindAsk() {
  if (ls('remind') || ls('remindLater')) return '';
  const rel = !isEditor();   // a relative's phone hears only "today's new photos" of the books it may see (server/push.js relatives)
  const ios = isIOS(), standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (!pushOk() && !(ios && !standalone)) return '';   // a browser that can never show them: say nothing
  const needHome = ios && !standalone;
  if (rel) return `<div class="remind ask rel"><img class="rbell" src="/art/hub/bell.webp" alt=""><span><b>${L('ให้แอปบอกเมื่อมีรูปใหม่', 'Tell me when there are new photos')}</b>
<small>${needHome ? L('บน iPhone/iPad: แตะปุ่มแชร์ ⬆️ → "เพิ่มไปยังหน้าจอโฮม" แล้วเปิดแอปจากไอคอน จากนั้นกด "เปิด"', 'On iPhone/iPad: tap Share ⬆️ → "Add to Home Screen", open the app from its icon, then tap "Turn on"')
    : L('ตอนค่ำของวันที่พ่อแม่ใส่รูปใหม่ จะมีแจ้งเตือนว่ามีกี่รูป', 'In the evening of a day with new photos, a note says how many')}</small></span>
<span class="rb"><button class="btn small ghost" data-a="remindlater">${L('ไว้ทีหลัง', 'Later')}</button>${needHome ? '' : `<button class="btn small" data-a="remind">${L('เปิด', 'Turn on')}</button>`}</span></div>`;
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
  ['rain', '☂️', 'ร่ม เสื้อกันฝน', 'Umbrella and raincoats', /\brain(y|coats?)?\b|showers?|umbrellas?|typhoon|storm/i],
  ['spare', '👕', 'เสื้อผ้าสำรอง', 'Spare clothes', /spare clothes/i],
  ['snacks', '🍎', 'ขนม ขวดน้ำ', 'Snacks and water bottles', /snacks?|water bottles?/i],
  ['nappies', '🧷', 'ผ้าอ้อม ทิชชู่เปียก', 'Nappies and wipes', /nappies|nappy|diaper/i],
  ['move', '🧳', 'วันย้ายที่พัก: เช็กของในห้องก่อนออก', 'Moving day: check the room before you go', /check ?-?out|pack the van|big bags|last pack/i],
];
const BAG_ALWAYS = ['snacks', 'nappies', 'spare'];   // a 1½-year-old and a 3-year-old: these go every day
function dayBag(t, i) {
  const d = t.days[i], rows = ((d.plan || {}).plan || []).map((r) => ({ when: r.t || '', en: r.en || '', th: r.th || '' })).concat(d.wx ? [{ when: '', en: d.wx.en || '', th: d.wx.th || '' }] : []);
  // the live forecast for that day (weather.js, within 16 days) says what the manual's climate note could not: rain, a cold or a hot day
  const f = WX[t.id] && WX[t.id].days && WX[t.id].days[i];
  if (f && f.tmin != null) {
    const wet = (f.pop != null && f.pop >= 40) || (f.code >= 51 && f.code <= 82) || f.code >= 95, cold = f.tmin < 15, hot = f.tmax >= 31;
    const when = L('พยากรณ์', 'Forecast'), pc = f.pop != null ? ` ${f.pop}%` : '';   // one row a condition, so each thing in the bag says its own reason
    rows.unshift(...[wet && { when, en: `rain${pc}`, th: `โอกาสฝน${pc}` }, cold && { when, en: `cold, ${Math.round(f.tmin)}°C at the coolest`, th: `หนาว ต่ำสุด ${Math.round(f.tmin)}°C` }, hot && { when, en: `strong sun, ${Math.round(f.tmax)}°C`, th: `แดดแรง ${Math.round(f.tmax)}°C` }].filter(Boolean));
  }
  return BAG.map(([k, e, th, en, re]) => {
    const r = rows.find((x) => re.test(x.en));
    if (!r && !BAG_ALWAYS.includes(k)) return null;
    const why = r ? `${r.when ? r.when + ' · ' : ''}${brief(L(r.th, r.en) || r.en, 70)}` : L('ทุกวัน', 'every day');
    return { k, e, th, en, why, fromPlan: !!r };
  }).filter(Boolean).sort((a, b) => b.fromPlan - a.fromPlan);
}
// the bag's count on its one line: what is in so far, never "0/n"
const bagLabel = (got, n) => (got >= n && n ? L('จัดครบแล้ว ✓', 'All packed ✓') : got ? L(`จัดแล้ว ${got}/${n}`, `${got}/${n} packed`) : L(`${n} อย่าง`, `${n} thing${n === 1 ? '' : 's'}`));
// Today's bag is the morning's job (owner, Nov 2026: Today on a trip day ran to five screens, the open list of eight things sat between the timeline
// and "getting around" all day): on the day it is open until everything is ticked or the day is under way — the first step is done and the second
// has begun (two timed steps behind us), or, where the plan marks the step we leave on (`go: true` on a timeline row), once that step's time has come — then it is its one line again, a tap away. A tick counts in place and the last one folds it (sheets.js).
function bagBlock(t, i) {
  if (!isEditor()) return '';
  const items = dayBag(t, i), ck = ls('ck') || {}, key = (k) => `${t.id}.bag.d${i}.${k}`, got = items.filter((x) => ck[key(x.k)]).length;
  const st = tlStates(t, i), go = (((t.days[i] || {}).plan || {}).plan || []).findIndex((r) => r.go);   // a step marked "go" in the plan = the one we leave on
  const under = go >= 0 ? st[go] === 'past' : st.filter((x) => x === 'past').length >= 2;
  return `<details class="bag noprint"${dayNow(t) === i && got < items.length && !under ? ' open' : ''}><summary>${emo('🎒')} ${L('กระเป๋าวันนี้', 'Today’s bag')} <span class="label bagn">${bagLabel(got, items.length)}</span>${ic('chev', 'chv')}</summary>
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
  const pre = dn < 0 && until > 0;   // `full` no longer changes the page: it is the same page with every detail open
  const banner = dn < 0 && until > 0 ? `<div class="call info${pre ? ' pre' : ''}"><b>${L(`อีก ${until} วันออกเดินทาง`, `${until} days to go`)}</b> <span class="cdsub">${L(`นี่คือแผนวันที่ ${i + 1} จากคู่มือ`, `This is the plan for day ${i + 1}`)}</span></div>`
    : dn < 0 && until <= 0 ? `<div class="call calm">${L('จบทริปแล้ว — เปิดสมุดความทรงจำได้เลย', 'The trip is over — open the memory book')}</div>` : '';
  const mission = ((t.passport || {}).days || [])[i], nop = `<div class="empty">${L('วันนี้ไม่มีแผนในคู่มือ', 'No plan in the manual for this day')}</div>`;
  return `<div class="daystrip" role="tablist">${strip}</div>
<article class="day today" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div><div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}${i === dn ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}</div><div></div><h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart')}
</div></article>
${nextCard(t, i)}${changedLine(t, i)}${checkLine(t, i)}${dayFacts(d)}
${banner}
<div class="row quick">${pl.route ? extA(pl.route, ic('route') + ' ' + L('เส้นทางวันนี้', "Today's route"), 'qlink') : ''}${pl.stay ? extA(mapsUrl(pl.stay.q || pl.stay.addr), ic('stays') + ' ' + L('ไปที่พัก', 'To the stay'), 'qlink') : ''}</div>
${((g) => (g ? `${g[0]}${dn >= 0 ? budgetLine(t) : ''}${isEditor() && (dn >= 0 || until > 0) ? remindLine(t) : ''}${bagBlock(t, i)}${g[1]}` : `${dn >= 0 ? budgetLine(t) : ''}${isEditor() && (dn >= 0 || until > 0) ? remindLine(t) : ''}${bagBlock(t, i)}${nop}`))(dayGlance(t, i, pre, true, full))}
${!pre && mission && (mission.facts || []).length ? `<div class="part kidm">${L('ภารกิจของเด็กๆ วันนี้', "The kids' mission today")}</div><div class="call pick mission"><b>${esc(T(mission.title))}</b><ul class="tips">${mission.facts.map((f) => `<li>${esc(T(f))}</li>`).join('')}</ul></div>` : ''}
${changeBlock(t, i)}${nextBlock(t, i)}${askBlock(t, i)}`;
}
// the whole trip: one line per day (tap → that day); the road book with every plan is the full report
function viewPlan(t, full) {
  const n = t.info || {};
  if (!full) { const now = dayNow(t), dm = n.drive && infoBlocks(t).meta.prep.find((m) => m.key === 'drive');
    const rows = t.days.map((d, i) => `<li${i === now ? ' class="now"' : ''}><a href="#/t/${esc(t.id)}/today/${i}">${artImg(t, i)}<span class="grow"><span class="dl"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(fmtDay(d.date))}${i === now ? ` <span class="tag">${L('วันนี้', 'Today')}</span>` : ''}${dayHasContent(t, i) ? ` <span class="done">${L('บันทึกแล้ว', 'Recorded')}</span>` : ''}</span><b class="tt">${esc(T(d.title))}</b>${d.sleep ? `<small>${esc(T(d.sleep))}</small>` : ''}</span>${ic('chev')}</a></li>`).join('');
    return `<div class="tp tp-plan glance">${topicHead('plan', L('แตะวันไหนก็ได้เพื่อเปิดแผนของวันนั้น', 'Tap a day to open its plan'))}<ol class="drows">${rows}</ol>${dm ? `<div class="glg">${glc(fullHref(t, 'plan'), dm.title, dm.sub)}</div>` : ''}${reportBtn(fullHref(t, 'plan'), L('แผนทั้งทริปแบบรายงานเต็ม', 'The whole trip as a full report'))}</div>`; }
  return `<div class="tp tp-plan full"><h1 class="vh">${secTitle('plan')}</h1><p class="lede">${L('ทุกวันของทริป — แตะวันเพื่อดูแผน · ชื่อสถานที่เปิดแผนที่ได้', 'Every day of the trip — open "Plan for the day" for the detail · tap a place for its map')}</p>${itinerary(t)}${n.drive ? ((dv) => `${repSeg(dv)}<section class="pocket">${repOpen(dv)}</section>`)(infoBlocks(t).drive) : ''}</div>`;
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
  // a long cell reads as lines, not a paragraph (owner, Nov 2026: "ยังอ่านยากเลย" on Getting around): one line a sentence, a list of fares
  // ("A ↔ B about HK$160, B ↔ C about HK$150") one line a fare, a "Day 1:" label in bold, times and prices bold (emph)
  const cellRest = (x) => { const bits = x.split(/\s+·\s+/); return bits.length > 2 || (bits.length > 1 && x.length > 60) ? `${emph(bits[0])}<small class="tsub">${bits.slice(1).map(emph).join(' · ')}</small>` : emph(x); };
  const cellLine = (x) => { const m = x.match(/^([^:·]{2,22}):\s+(.+)$/); return m && !(/\d$/.test(m[1]) && /^\d{2}/.test(m[2])) ? `<b class="clb">${esc(m[1])}:</b> ${cellRest(m[2])}` : cellRest(x); };
  const cellHtml = (x) => { if (x.length <= 70) return emph(x);
    let ls = x.replace(/([a-z0-9)%])\.\s+(?=[A-Z(])/g, '$1.\u0007').split('\u0007').map((y) => dropEndStop(y.trim())).filter(Boolean);
    ls = ls.flatMap((y) => ((y.match(/[↔→]/g) || []).length >= 2 && /,\s/.test(y) ? y.split(/,\s+(?=[^,]*[↔→])/) : [y]));
    if (ls.length < 2) {   // Thai has no full stops: a piece with a label or of some length starts a line, the short ones after it are its detail
      const g = []; points(x).forEach((y) => { if (!g.length || /^[^:·]{2,22}:\s/.test(y) || y.length >= 30) g.push([y]); else g[g.length - 1].push(y); });
      ls = g.map((z) => z.join(' · '));
      if (ls.length < 2) return pts(x, 'tight'); }
    return `<ul class="cpts">${ls.map((y) => `<li>${cellLine(y)}</li>`).join('')}</ul>`; };
  const tbl = (cols, rows, cls) => `<div class="tblwrap"><table class="prices ${cls || ''}">${cols ? `<thead><tr>${cols.map((c) => `<th>${esc(T(c))}</th>`).join('')}</tr></thead>` : ''}<tbody>${rows.map((r) => { const v = r.map(cellS);
    if (v.length > 1 && v.slice(1).every(noVal)) return `<tr class="grp"><th colspan="${v.length}">${esc(v[0])}</th></tr>`;   // a heading row ("Fantasyland — first")
    return `<tr>${v.map((x, k) => (k === 0 ? `<td class="nm">${/^\d{1,2}$/.test(x) && cols && cols[0] ? `${esc(hLbl(cols[0]))} ${esc(x)}` : esc(x)}</td>` : noVal(x) ? '<td class="nv"></td>' : `<td${x.length <= 14 ? ' class="s"' : ''}${cols && cols[k] ? ` data-h="${esc(hLbl(cols[k]))}"` : ''}>${cellHtml(x)}</td>`)).join('')}</tr>`; }).join('')}</tbody></table></div>`;   // phones stack each row into a card, every value labelled by its column (app.css)
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
  // the opening paragraph sits in one box (owner, Nov 2026: "ย่อหน้าเปิดหัวข้อ … ทำเป็นการ์ด"), its "read more" inside it — a soft card on a topic's page
  const lede = (x) => { if (!(x && T(x))) return ''; if (T(x).length <= 150) return `<div class="ledebox"><p class="lede">${esc(T(x))}</p></div>`;
    const p = points(T(x)); return `<div class="ledebox">${p.length > 1 ? `<p class="lede">${pt(p[0])}</p>${fold(`<span class="more">${L('อ่านต่อ', 'Read more')}</span>`, pts(p.slice(1).join(' · '), 'lede'), 'ledemore')}` : pts(T(x), 'lede')}</div>`; };
  // numbered steps ("1. 08:45 …") stay one step each: cut into short points first, a step's pieces became bullets among the numbers
  const list = (items) => { const raw = items.map((x) => T(x));
    if (raw.length > 1 && raw.every((x) => /^\d+\.\s/.test(x))) return `<ol class="tips nums">${raw.map((x) => `<li>${lead(x.replace(/^\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
    const xs = raw.flatMap((x) => { const p = points(x); return p.length >= 3 && p.every((y) => y.length < 40) ? p : [x]; });
    return `<ul class="tips">${xs.map((x) => `<li>${lead(x)}</li>`).join('')}</ul>`; };
  // tickable checklist, like the manual's boxes — ticks are a per-phone convenience (localStorage), nothing is sent
  const ckDone = ls('ck') || {};
  const chk = (items, key) => `<ul class="chk">${items.map((x, i) => { const k = `${t.id}.${key}.${i}`; return `<li><label><input type="checkbox" data-ck="${esc(k)}"${ckDone[k] ? ' checked' : ''}><span>${esc(T(x))}</span></label></li>`; }).join('')}</ul>`;
  const packSub = () => { const all = (n.pack || []).flatMap((g, gi) => g.items.map((_, i) => `${t.id}.pack${gi}.${i}`)), got = all.filter((k) => ckDone[k]).length; return esc(got ? L(`จัดแล้ว ${got}/${all.length}`, `${got}/${all.length} packed`) : L(`${all.length} อย่าง`, `${all.length} things`)); };
  const cols = (blocks) => `<div class="cols2">${blocks.join('')}</div>`;
  const CJK = /[\u3400-\u9FFF]/;
  const dl = (rows) => (rows.length > 2 && rows.every((r) => /^(\d{1,2}[:.]\d{2}|.{1,3})$/.test(T(r.t).trim()))
    ? `<ol class="tl plan mtl">${rows.map((r) => `<li><time>${esc(T(r.t))}</time><div>${lead(T(r.x))}</div></li>`).join('')}</ol>`   // "10:00 → …" rows, or stops 1…9
    : `<dl class="gl">${rows.map((r) => { const x = T(r.x), p = points(x);
      const bits = x.split(/\s+·\s+/), zh = (y) => ((y.match(/[\u3400-\u9FFF]/g) || []).length * 2 >= y.replace(/[\s()（）·,-]/g, '').length);
      // three or more short pieces ("HKTaxi or Uber · Octopus · Macau Taxi (澳門電召) · …") are a list, one a line (owner, Nov 2026: "รายการแอป")
      if (bits.length >= 3 && bits.every((y) => y.length <= 70)) return `<div><dt>${esc(T(r.t))}</dt><dd><ul class="cpts">${bits.map((y) => `<li${zh(y) ? ' class="zh"' : ''}>${emph(y)}</li>`).join('')}</ul></dd></div>`;
      return `<div><dt>${esc(T(r.t))}</dt><dd>${CJK.test(x) ? `<span class="cjk">${x.split(/\s+·\s+/).map((y) => `<span${(y.match(/[\u3400-\u9FFF]/g) || []).length * 2 >= y.replace(/[\s()（）·,-]/g, '').length ? ' class="zh"' : ''}>${esc(y)}</span>`).join('')}</span>` : p.length > 2 ? fold(pt(p[0]), pts(p.slice(1).join(' · '), 'tight'), 'ddf') : lead(x)}</dd></div>`; }).join('')}</dl>`);
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
const glc = (href, title, sub, cls, pic, g) => `<a class="glc${cls ? ' ' + cls : ''}${pic ? ' gpc' : ''}" href="${href}"${g ? ` style="--g1:${g}"` : ''}>${pic ? `<span class="gpic"><img src="${pic}" alt="" loading="lazy" draggable="false"></span>` : ''}<span class="gt"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${ic('chev')}</a>`;
/* each topic of a pocket guide wears a picture of its own (owner, Nov 2026: "ส่วนของ Get Ready อ่านยากมาก … เหลือส่วนนี้ที่ไม่เหมือนในเล่ม"):
   the menu's sticker pictures, picked by what the topic's title says in either language; the first rule that fits wins */
const TOPIC_PICS = [
  [/day bag|กระเป๋าประจำวัน/i, '/art/emoji/backpack.webp'],
  [/park at a glance|ภาพรวมสวน/i, '/art/hub/map.webp'],
  [/minute by minute|นาทีต่อนาที/i, '/art/hub/today.webp'],
  [/christmas|คริสต์มาส/i, '/art/emoji/gift.webp'],
  [/goes wrong|ผิดแผน/i, '/art/emoji/signpost.webp'],
  [/disney|ดิสนีย์|สวนสนุก|can ride|เล่นอะไร/i, '/art/emoji/rollercoaster.webp'],
  [/budget|งบ/i, '/art/emoji/cash.webp'],
  [/van|รถตู้|odyssey|turo/i, '/art/hub/van.webp'],
  [/drive|ขับรถ|ช่วงขับ|every leg|ทุกช่วงการเดินทาง/i, '/art/emoji/travel-map.webp'],
  [/taxi card|บัตรแท็กซี่/i, '/art/emoji/taxi.webp'],
  [/getting around|ไปไหนมาไหน|เดินทางไปไหน/i, '/art/emoji/bus.webp'],
  [/pack|จัดกระเป๋า|เตรียมของ/i, '/art/emoji/suitcase.webp'],
  [/price|ราคา|attraction|ค่าเข้า|ที่เที่ยวเพิ่ม/i, '/art/emoji/ticket.webp'],
  [/visa|วีซ่า/i, '/art/emoji/passport.webp'],
  [/biosecurity|customs|never bring|ศุลกากร|ห้ามนำ|ไบโอซีเคียว|กักกัน|ด่านตรวจ|พืช/i, '/art/hub/privacy.webp'],
  [/casino|คาสิโน/i, '/art/emoji/signpost.webp'],
  [/arrival|departure|มาถึง|วันกลับ|ขาไป|ขากลับ/i, '/art/emoji/airplane.webp'],
  [/crowd|on holiday|คนเยอะ|ใครหยุด/i, '/art/emoji/family.webp'],
  [/book|จอง/i, '/art/hub/today.webp'],
  [/kitchen|laundry|barbecue|ครัว|ซักผ้า|บาร์บีคิว/i, '/art/emoji/noodles.webp'],
  [/night by night|คืนต่อคืน|ทีละคืน/i, '/art/emoji/bed.webp'],
  [/hotel|resort|stay|ที่พัก|โรงแรม|รีสอร์ต|ask the hotels|ถามโรงแรม/i, '/art/hub/stays.webp'],
  [/emergency|ฉุกเฉิน/i, '/art/hub/sos.webp'],
  [/tonight|คืนนี้/i, '/art/emoji/bed.webp'],
  [/if…|if\.\.\.|ถ้า…|ถ้า\.\.\.|goes wrong|ผิดแผน/i, '/art/emoji/signpost.webp'],
  [/animal|สัตว์/i, '/art/emoji/koala.webp'],
  [/eating|กิน/i, '/art/emoji/noodles.webp'],
  [/learn|เรียนรู้|shapes|car|ในรถ/i, '/art/hub/learn.webp'],
];
const topicPic = (title) => { const x = String(title || '').replace(/<[^>]+>/g, ' '); const hit = TOPIC_PICS.find(([re]) => re.test(x)); return hit ? hit[1] : '/art/hub/manual.webp'; };
const TOPIC_COLS = ['#4F7BFF', '#1CC9A4', '#FF9A3C', '#C850F0', '#FF6FA8', '#F2B90C', '#22D3EE', '#9BD82A'];
const topicHead = (k, lede) => `<h1 class="vh">${secTitle(k)}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}`;
const emptyTopic = () => `<div class="empty">${L('เล่มนี้ยังไม่มีข้อมูลส่วนนี้', 'This book has nothing here yet')}</div>`;
/* Two versions, always (owner's rule, Nov 2026): the report reads short — each case, card or row a headline with its detail one tap
   below (`.ifold`) — or in full, the manual's text with every detail open, as the report was before the folds. A switch at the top
   of every report (`repSeg`, action `repmode`), kept per phone (`ls('repfull')`), changes it in place. */
const repFull = () => !!ls('repfull');
const repOpen = (html) => (repFull() ? html.replace(/<details class="ifold([^"]*)">/g, '<details class="ifold$1" open>') : html);
const repSeg = (html) => (html.includes('class="ifold') ? `<div class="tpk repseg" role="group" aria-label="${L('แบบรายงาน', 'Report view')}">${[['0', '📋', L('แบบสรุป', 'Short'), L('หัวข้อก่อน แตะดูรายละเอียด', 'Headlines, tap for detail')], ['1', '📄', L('แบบเต็ม', 'Full'), L('รายละเอียดเปิดครบทุกข้อ', 'Every detail open')]].map(([v, e, b, sm]) => `<button type="button" class="tpo" data-a="repmode" data-v="${v}" aria-pressed="${(v === '1') === repFull()}"><span class="rpe" aria-hidden="true">${e}</span><b>${b}</b><small>${sm}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>` : '');
// the report: every section of the manual; from a card only that section opens, otherwise a long page (20+ chapters) opens on its first
const topicPage = (t, k, blocks, lede, open) => (open !== undefined && onePage(t, k, blocks, open)) || ((body) => `<div class="tp tp-${k} full${repFull() ? ' repall' : ''}">${topicHead(k, lede)}${repSeg(body)}${blocks.length ? `<section class="pocket" id="pocket">${repOpen(body)}</section>` : emptyTopic()}</div>`)(blocks.map((b, i) => ((open !== undefined ? i !== open : blocks.length > 6 && i) ? b.replace('<details class="pg" open', '<details class="pg"') : b)).join(''));
// one topic, one page (owner, Nov 2026: "ซ้อนกันหลายชั้น ทำให้ใช้งานง่ายๆ"): a card of the summary opens that section alone — its title is the
// page's heading, every detail is open (no report switch, no fold inside a fold), and ‹ › at the foot walk to the topics beside it
const PG_RE = /^<details class="pg" open id="([^"]+)"><summary>([\s\S]*?)<\/summary>([\s\S]*)<\/details>$/;
const tagless = (h) => { let s = String(h || ''), p; do { p = s; s = s.replace(/<[^>]*>/g, ''); } while (s !== p); return s.replace(/[<>]/g, ''); };   // every tag gone, however nested
const pgName = (b) => { const m = PG_RE.exec(b || ''); return m ? tagless(m[2].replace(/<span class="label">[\s\S]*?<\/span>/g, '')).trim() : ''; };
const onePage = (t, k, blocks, open) => { const m = PG_RE.exec(blocks[open] || ''); if (!m) return '';
  const nav = (j, cls, lbl) => (pgName(blocks[j]) ? `<a class="pgn ${cls}" href="${fullHref(t, k, j)}"><small>${lbl}</small><b>${pgName(blocks[j])}</b></a>` : '<span></span>');
  const g = TOPIC_COLS[open % TOPIC_COLS.length];
  return `<div class="tp tp-${k} one repall" style="--g1:${g}"><header class="phead pz tphead"><span class="phpic"><img src="${topicPic(m[2])}" alt="" draggable="false"></span><div class="phtx"><h1 class="h2">${m[2]}</h1></div></header><section class="pocket" id="pocket"><div class="pg1" id="${m[1]}">${m[3].replace(/<details class="ifold([^"]*)">/g, '<details class="ifold$1" open>')}</div></section>
<nav class="pgnav" aria-label="${L('หัวข้ออื่น', 'Other topics')}">${nav(open - 1, 'prev', L('‹ ก่อนหน้า', '‹ Before'))}${nav(open + 1, 'next', L('ถัดไป ›', 'Next ›'))}</nav></div>`; };
// the summary's list: the topics for the whole trip first, then the chapters written for one day ("Day 2 · …") under their own heading,
// the day a chip instead of a prefix repeated on every row (owner, Nov 2026: the HK list was 19 look-alike rows)
const DAYPG = /^((?:Days?|วันที่)\s*\d+(?:\s*[–-]\s*\d+)?)\s+·\s+(.+)$/;
const glanceList = (t, k, meta, skip) => { const rows = meta.map((m, j) => ({ m, j, d: DAYPG.exec(m.title) })).filter((x) => !skip.includes(x.m.key));
  const all = rows.filter((x) => !x.d), byDay = rows.filter((x) => x.d), wrap = (ts) => (ts ? `<div class="glg">${ts}</div>` : '');
  const card = (x, title) => glc(fullHref(t, k, x.j), title, x.m.sub, '', topicPic(x.m.title), TOPIC_COLS[x.j % TOPIC_COLS.length]);
  if (byDay.length < 2 || !all.length) return wrap(rows.map((x) => card(x, x.m.title)).join(''));
  return `${wrap(all.map((x) => card(x, x.m.title)).join(''))}<h3 class="gh">${L('เฉพาะบางวัน', 'For one day')}</h3>${wrap(byDay.map((x) => card(x, `<span class="gday">${x.d[1]}</span>${x.d[2]}`)).join(''))}`; };
const glancePage = (t, k, B, lede, top, skip) => (B[k].length ? `<div class="tp tp-${k} glance">${topicHead(k, lede)}${top || ''}${glanceList(t, k, B.meta[k], skip)}${reportBtn(fullHref(t, k))}</div>` : `<div class="tp tp-${k}">${topicHead(k, lede)}${emptyTopic()}</div>`);
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
${B.tonight ? `<h3 class="gh">${L('คืนนี้นอนที่', 'Tonight we sleep at')}</h3>${B.tonight}` : ''}${n.lost ? `<div class="call warn lostc">${pts(T(n.lost), 'tight')}</div>` : ''}${lostBlock(t)}${careBlock(t)}`;
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
/* ---------- help and play near where we sleep (owner, Nov 2026: "โรงพยาบาลเด็ก ร้านยา สนามเด็กเล่น ห้องให้นม"; server/care.js): each
   stay's town-level position (plan.stay.ll) → the nearest library town on the phone (snapPlace) — a book from photos names its towns
   (theme.snap.places) — → GET /api/b/care?ids= (the towns' ids only). Kept in ls('care') for no signal; tonight's town opens first.
   Never opening hours or a phone number: the emergency numbers sit at the top of this page. */
const CARE_KINDS = [['hospital', '🏥', 'โรงพยาบาลที่รับเด็ก', 'Hospitals that see children'], ['pharmacy', '💊', 'ร้านยา', 'Pharmacy'],
  ['play', '🛝', 'ที่ให้เด็กๆ เล่น', 'Places to play'], ['baby', '🚼', 'ห้องให้นมและเปลี่ยนผ้าอ้อม', 'Baby rooms']];
let careAsk = '';
// the book's towns in order — tonight's first during the trip — from what was stored: {days: [place id per day], extra: [ids], names, rows}
function careOrder(t, c) {
  const ids = [], add = (id) => { if (id && ((c.rows[id] || []).length || (isEditor() && c.names[id])) && !ids.includes(id)) ids.push(id); }, at = dayNow(t);   // a town with nothing yet still shows for the parents: they can add a place they know
  if (at >= 0) add(c.days[at]);
  c.days.forEach(add); (c.extra || []).forEach(add);
  return ids;
}
function careBlock(t) {
  if (careAsk !== t.id) {
    careAsk = t.id;
    snapGeo().then((g) => {
      const pid = (d) => { const ll = d && d.plan && d.plan.stay && d.plan.stay.ll; return Array.isArray(ll) && ll.length === 2 ? (snapPlace(ll, g) || {}).id || '' : ''; };
      const days = t.days.map(pid), extra = (((t.theme || {}).snap || {}).places || []).filter((x) => typeof x === 'string'), ids = [...new Set([...days, ...extra].filter(Boolean))];
      if (!ids.length) return;
      api('GET', `/api/b/care?ids=${encodeURIComponent(ids.slice(0, 20).join(','))}`).then((r) => {
        const names = {}; ids.forEach((id) => { const p = (g.places || []).find((x) => x.id === id); if (p) names[id] = snapShort(p.name); });
        ls('care_' + t.id, { days, extra, names, rows: (r && r.places) || {} });
        const box = document.getElementById('carelib'); if (box && careAsk === t.id) box.outerHTML = careBlock(t);
      }, () => {});
    });
  }
  const c = ls('care_' + t.id), towns = c && c.rows ? careOrder(t, c) : [];
  if (!towns.length) return '<section class="blk carelib noprint" id="carelib" hidden></section>';
  const nameOf = (id) => ((n) => (n ? n[lang === 'en' ? 'en' : 'th'] || n.th : id))(c.names[id]);
  const row = (x) => `<li class="nmrow${x.own ? ' cown' : ''}"><span class="plen"><b>${esc(x.name)}</b>${x.zh ? ` <span class="zh">${esc(x.zh)}</span>` : ''}${x.own ? ` <span class="etag">${L('ที่เรารู้จัก', 'Our own')}</span>` : ''}<small>${[T(x.what), T(x.area)].filter(Boolean).map(esc).join(' · ')}</small>${x.why ? `<small class="cwhy">${esc(T(x.why))}</small>` : ''}${x.own && isEditor() ? `<button class="linkbtn" data-a="caredel" data-v="${esc(x.id)}">${L('เอาออก', 'Remove')}</button>` : ''}</span>${navB(x.q + (x.own && c.names[x.place] ? `, ${c.names[x.place].en}` : ''), x.name)}</li>`;
  const town = (id, i) => { const rows = (c.rows[id] || []).map((x) => ({ ...x, place: id }));
    return `<details class="cfold"${i ? '' : ' open'}><summary>${esc(nameOf(id))}${ic('chev', 'chv')}</summary>
${CARE_KINDS.map(([k, e, th, en]) => ((xs) => (xs.length ? `<h5>${emo(e)} ${L(th, en)}</h5><ul class="carel">${xs.map(row).join('')}</ul>` : ''))(rows.filter((x) => x.kind === k))).join('')}
${isEditor() ? `<p><button class="btn ghost small" data-a="careadd" data-v="${esc(id)}" data-n="${esc(nameOf(id))}">＋ ${L('เพิ่มที่ที่เรารู้จัก', 'Add a place we know')}</button></p>` : ''}</details>`; };
  const when = (towns.flatMap((id) => c.rows[id] || []).map((x) => x.ok).filter(Boolean).sort().pop() || '').split('-');
  return `<section class="blk carelib noprint" id="carelib"><h3>${emo('🏥')} ${L('โรงพยาบาลเด็กและที่เล่นใกล้ที่พัก', 'Hospitals and play near where we sleep')}</h3>
${towns.map(town).join('')}
<p class="label">${L('ฉุกเฉินโทรเบอร์ด้านบนก่อนเสมอ', 'In an emergency call the number at the top first')}${when.length === 2 ? ` · ${L('เช็กจากเว็บเมื่อ', 'checked on the web')} ${esc(fmtDay(`${when[0]}-${when[1]}-01`, { month: 'short', year: 'numeric' }))}` : ''} · ${L('ไม่มีเวลาเปิดปิด เช็กก่อนไป', 'no opening hours — check before you go')}</p></section>`;
}
// the papers and the things on the phone to have ready before we leave (owner, Nov 2026: "ประกันเดินทางและเอกสารเด็ก"): a fixed list, ticked
// on this phone (data-ck, the bag's own tick), shown until the trip is over — never a document number, nothing goes to the server
const DOCS = [
  ['pp', '📕', 'หนังสือเดินทางทุกคน อายุเหลือเกิน 6 เดือนนับจากวันกลับ', 'Everyone’s passports, valid 6 months past the day we come home'],
  ['visa', '🛂', 'วีซ่าหรือการลงทะเบียนเข้าประเทศ ถ้าประเทศนั้นต้องมี', 'A visa or entry registration, where the country asks for one'],
  ['ins', '🩺', 'ประกันเดินทางที่คุ้มครองเด็กๆ ด้วย', 'Travel insurance that covers the children'],
  ['tix', '🎟️', 'ตั๋วเครื่องบินและใบจองที่พักในโทรศัพท์ และพิมพ์เก็บไว้หนึ่งชุด', 'Flights and stays on the phone, and one printed set'],
  ['copy', '📄', 'สำเนาหนังสือเดินทาง เก็บแยกจากตัวจริง', 'Copies of the passports, kept apart from the real ones'],
  ['meds', '💊', 'ยาประจำตัวของเด็กๆ กับใบสั่งยาภาษาอังกฤษ', 'The children’s own medicines and an English prescription'],
  ['cards', '💳', 'บัตรที่ใช้ต่างประเทศได้ และแจ้งธนาคารแล้ว', 'Cards that work abroad, and the bank told'],
  ['sim', '📶', 'ซิมหรือ eSIM สำหรับต่างประเทศ', 'A SIM or eSIM for abroad'],
];
function docsBlock(t) {
  if (!isEditor() || tripOver(t)) return '';
  const ck = ls('ck') || {}, key = (k) => `${t.id}.docs.${k}`, got = DOCS.filter((d) => ck[key(d[0])]).length;
  return `<details class="docsck noprint"${got < DOCS.length && daysUntil(t) > 0 ? ' open' : ''}><summary>${emo('🗂️')} ${L('เอกสารและของที่ต้องพร้อม', 'Papers and things to have ready')} <span class="label">${got >= DOCS.length ? L('พร้อมครบ ✓', 'All ready ✓') : got ? L(`พร้อมแล้ว ${got}/${DOCS.length}`, `${got}/${DOCS.length} ready`) : L(`${DOCS.length} อย่าง`, `${DOCS.length} things`)}</span>${ic('chev', 'chv')}</summary>
<ul class="chk bagl">${DOCS.map(([k, e, th, en]) => `<li><label><input type="checkbox" data-ck="${esc(key(k))}"${ck[key(k)] ? ' checked' : ''}><span>${emo(e)} ${esc(L(th, en))}</span></label></li>`).join('')}</ul>
<p class="label">${L('ติ๊กเก็บไว้ในเครื่องนี้ · ไม่เก็บเลขเอกสารใดๆ', 'Ticks stay on this phone · no document number is kept')}</p></details>`;
}
function viewPrep(t, full, open) {
  const B = infoBlocks(t), lede = L('ก่อนออกเดินทางและระหว่างทาง', 'Before we leave and on the way');
  if (full) return topicPage(t, 'prep', B.prep, lede, open);
  const until = daysUntil(t);
  return glancePage(t, 'prep', B, L('แตะหัวข้อเพื่อเปิดรายละเอียด', 'Tap a topic for its detail'), `${until > 0 ? `<div class="call info">${L(`อีก ${until} วันออกเดินทาง`, `${until} days to go`)}</div>` : ''}${docsBlock(t)}`, []);
}
function viewLearn(t, full, open) {
  const B = infoBlocks(t), lede = L('เรื่องเล่าในรถ คำศัพท์ สัตว์ และคำถามสำหรับเด็กๆ', 'Stories for the car, words, animals and questions for the kids');
  if (full) return topicPage(t, 'learn', B.learn, lede, open);
  return glancePage(t, 'learn', B, lede, '', []);
}
const viewHearts = (t) => `<h1 class="vh">${secTitle('hearts')}</h1>${heartsHtml(t).replace(/<h3>[\s\S]*?<\/h3>/, '')}`;   // the page's own title, not a second "hearts for the kids"
const viewOffline = (t) => `<h1 class="vh">${secTitle('offline')}</h1><p class="lede">${L('เก็บเล่มนี้ไว้ในเครื่องก่อนขึ้นเครื่องบินหรือลงเรือ แล้วเปิดสมุด แผน ร้านอาหาร พาสปอร์ต และโหมดเด็กได้โดยไม่ต้องมีเน็ต', 'Store this book on the phone before the flight or the ferry, then the book, the plans, places to eat, the passports and kid mode all open without signal')}</p>${offlineHtml(t)}<section class="blk noprint"><h3>${ic('wifi')} ${L('ประหยัดเน็ตโรมมิ่ง', 'Save roaming data')}</h3>${upBlock()}</section>${ls('remind') ? remindBar() : remindLine(t)}`;
function favouritesHtml(t) {
  const ph = mediaOf(t.id).filter((m) => m.highlight), qs = entriesOf(t.id).filter((e) => e.kind === 'quote' && e.highlight);
  if (!ph.length && !qs.length) return '';
  return (ph.length ? `<div class="mosaic">${ph.map((m) => photoBtn(t, m)).join('')}</div>` : '') + qs.map((e) => quoteCall(e, true)).join('');
}
function photoBtn(t, m) {
  return `<button data-a="lb" data-v="${esc(m.id)}" data-t="${esc(t.id)}" aria-label="${esc(m.caption || L('รูป', 'Photo'))}"><img loading="lazy" src="${esc(imgT(m))}" alt="">${m.highlight ? '<span class="star">⭐</span>' : ''}${m.caption ? `<span class="cap">${emoIn(esc(m.caption))}</span>` : ''}${m.pending ? '<span class="cap">⏳</span>' : ''}</button>`;
}
/* Photos by spot (owner, Nov 2026: "การใส่รูป … ถ้าอยากให้มีแบบทุก check in spot หรือแนะนำตาม landmark หลักๆ"): the record page's photo box lists the
   places of the day as suggestions (photoStops below: airports on a flight day, the sights, the meals, the hotels). A tap on one opens the picker and those photos carry the place (media.place,
   set at upload) and check the place in; the book's day page then shows them under that stop. A place is kept as the name it had when the
   photo was added — stopOf() finds the stop again in either language, so the label follows the language on screen. */
// Suggestions, in the order of a travel day (owner, Nov 2026: "มี suggestions ให้เราแปะรูปตามได้ไหม เช่น สนามบิน โรงแรม ที่เที่ยว"):
//   a flight day → the airports the day names (its legs, planned stops, the kids' map) or a plain "airport", and "on the plane"
//   the sights → the planned stops, then the day's stops on the kids' map that no chip covers yet
//   the hotels → this morning's (when we move on) and tonight's · the meals → the planned food stops (behind one "meals" chip until
//   it is tapped, so the box stays short) · the check-ins made by hand
const SPOT_AIR = /airport|สนามบิน|suvarnabhumi|สุวรรณภูมิ|don mueang|ดอนเมือง/i, SPOT_FLY = /✈|🛫|🛬|\bflights?\b/i;   // a flight day: the plane in a step's headline, or the word (never "land": Toy Story Land is not a landing)
const SPOT_STOP = new Set(['the', 'and', 'for', 'bay', 'park', 'beach', 'hotel', 'resort', 'island', 'city', 'village', 'point', 'head', 'port', 'new', 'old', 'airport', 'international', 'terminal', 'apartment']);
const spotWords = (x) => String(x || '').toLowerCase().split(/[^a-z฀-๿]+/).filter((w) => w.length >= 3 && !SPOT_STOP.has(w));
const spotSame = (a, b) => { const y = spotWords(b); return spotWords(a).some((w) => y.includes(w)); };   // two names of one place ("Disneyland" · "Hong Kong Disneyland")
const bedLike = (bed, nm) => { const a = String(bed || '').toLowerCase(), c = String(nm || '').toLowerCase(); return !!a && !!c && (a.startsWith(c) || c.startsWith(a)) && Math.min(a.length, c.length) >= 0.6 * Math.max(a.length, c.length); };   // a planned stop that is the hotel itself ("Noah's Ark Hotel" · "Noah's Ark Hotel & Resort"), never a sight in the same town
function photoStops(t, i) {
  const d = (t.days || [])[i] || {}, pl = d.plan || {}, out = [], seen = new Set();
  // two planned stops at one map address are one place ("Hong Kong Disneyland" · "… rides and shows", the same `q`): one chip — the first one's name and
  // check-in — that also answers to the other's names (aka), so a photo tagged with either sits under it; a meal never merges into a sight
  const add = (key, nm, kind, q) => { const en = String((nm && nm.en) || '').trim(), th = String((nm && nm.th) || '').trim(), id = (en || th).toLowerCase(); if (!id || seen.has(id)) return null; seen.add(id);
    const same = q ? out.find((x) => x.q === q && (x.kind === 'food') === (kind === 'food')) : null;
    if (same) { same.aka.push(...[th, en].filter(Boolean)); return null; }
    const x = { key: key || '', kind, q: q || '', aka: [], name: { th: th || en, en: en || th } }; out.push(x); return x; };
  const covered = (nm) => out.some((x) => spotSame(x.name.en, (nm && nm.en) || ''));
  const mp = (t.passport || {}).map || {}, mapStops = ((mp.days || [])[i] || []).map((k) => (mp.stops || []).find((x) => x.k === k)).filter(Boolean);
  const planned = d.planned || [], isAir = (x) => /✈|🛫|🛬/.test(x.e || '') || SPOT_AIR.test(`${x.en || ''} ${x.th || ''}`);
  const beds = [((t.days[i - 1] || {}).plan || {}).stay, pl.stay].filter((b) => b && b.name).map((b) => b.name).filter((n, k, a) => a.indexOf(n) === k);
  if ((pl.plan || []).some((r) => SPOT_FLY.test(`${r.en || ''} ${(r.h || {}).en || ''}`))) {
    const known = [...planned.filter((p) => p.kind !== 'food' && isAir(p)), ...mapStops.filter(isAir)], ends = [];
    (pl.legs || []).forEach((g) => [g.from, g.to].forEach((x) => { const part = String(x || '').split(',').map((y) => y.trim()).find((y) => SPOT_AIR.test(y)); if (part && !beds.some((b) => spotSame(b, part)) && !ends.some((e) => spotSame(e, part) || e === part)) ends.push(part); }));
    const airs = ends.map((e) => known.find((k) => spotSame(k.en || '', e)) || { en: e });
    known.forEach((k) => { if (!airs.some((a) => a === k || spotSame(a.en || '', k.en || ''))) airs.push(k); });
    if (!airs.length) airs.push({ th: 'สนามบิน', en: 'Airport' });
    airs.forEach((a, n) => { add(a.key, a, 'air', a.q); if (n === 0) add('', { th: 'บนเครื่องบิน', en: 'On the plane' }, 'air'); });
  }
  planned.filter((p) => p.kind !== 'food').forEach((p) => add(p.key, p, beds.some((b) => bedLike(b, p.en)) ? 'stay' : 'place', p.q));
  mapStops.filter((x) => !isAir(x) && !covered(x) && !beds.some((b) => spotSame(b, x.en || ''))).forEach((x) => add('', x, 'map'));
  beds.forEach((b) => { if (!out.some((x) => x.kind === 'stay' && bedLike(b, x.name.en))) add('', { en: b }, 'stay'); });
  planned.filter((p) => p.kind === 'food').forEach((p) => add(p.key, p, 'food', p.q));
  placesOf(t.id, i).forEach((p) => add(p.key, p.name && typeof p.name === 'object' ? p.name : { en: p.name || p.key }, p.kind === 'food' ? 'food' : 'place'));
  return out;
}
const stopOf = (t, i, place) => { const p = String(place || '').trim().toLowerCase(); return p && i != null ? photoStops(t, i).find((x) => [x.name.th, x.name.en, ...x.aka].some((n) => n.toLowerCase() === p)) || null : null; };
const STOP_IC = { air: 'plane', place: 'pin', map: 'pin', food: 'eat', stay: 'stays' };
function photoSpots(t, i, ph) {
  const stops = photoStops(t, i); if (!stops.length) return '';
  const at = ph.map((m) => stopOf(t, i, m.place)), cnt = (x) => at.filter((y) => y && y.name.en === x.name.en).length;
  const chip = (x, hide) => { const n = cnt(x), nm = T(x.name);
    return `<button type="button" class="chip phstop${n ? ' has' : ''}${hide ? ' extra' : ''}" data-a="pickphotos" data-t="${esc(t.id)}" data-d="${i}" data-place="${esc(nm)}" data-key="${esc(x.key || '')}" data-kind="${x.kind}" aria-label="${esc(L(`เพิ่มรูปของ ${nm}`, `Add photos of ${nm}`))}${n ? esc(L(` · มีแล้ว ${n} รูป`, ` · ${n} so far`)) : ''}">${ic(STOP_IC[x.kind] || 'pin')}<span class="pn">${esc(nm)}</span>${n ? `<span class="pc">✓ ${n}</span>` : ic('plus', 'pp')}</button>`; };
  const meals = stops.filter((x) => x.kind === 'food'), wait = meals.filter((x) => !cnt(x));   // a meal that already has photos is shown; the others wait behind one chip
  return `<div class="phstops"><p class="label">${L('แนะนำจุดแปะรูปของวันนี้ · แตะแล้วเลือกรูปของที่นั่น', 'Photo spots for today · tap one and pick its photos')}</p><div class="phsrow">${stops.map((x) => chip(x, wait.includes(x))).join('')}${wait.length ? `<button type="button" class="chip phmore" data-a="phmore" aria-expanded="false">${ic('eat')}<span class="pn">${L(`มื้ออาหาร ${wait.length} ร้าน`, `Meals · ${wait.length}`)}</span>${ic('chev')}</button>` : ''}</div></div>`;
}
// the day's photos by stop (media.place, from the record page's chips, "look at today's photos" or the lightbox): one mosaic per place in the
// order the stops were first photographed, the photos with no place last and unlabelled; a day with no places at all is one plain mosaic
function mosaicByPlace(t, ph) {
  if (!ph.length) return '';
  const groups = [], at = {};
  for (const m of ph) { const raw = (m.place || '').trim(), st = raw ? stopOf(t, m.day, raw) : null, k = st ? 's:' + st.name.en.toLowerCase() : raw; if (!(k in at)) { at[k] = groups.length; groups.push({ place: st ? T(st.name) : raw, ph: [] }); } groups[at[k]].ph.push(m); }
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
const HOUR_FMT = {};   // one formatter per zone: making one per memory cost a book of 500 words a quarter of a second on a slow phone
function dayPart(at, tz) {
  let h = 12;
  try { const f = HOUR_FMT[tz || ''] || (HOUR_FMT[tz || ''] = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: tz || undefined })); h = Number(f.format(new Date(at))) % 24; } catch { /* a bad zone reads as midday */ }
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
${sum ? `${aiTag(t, sum)}<p class="daysum">${emoIn(esc(sum.text))}${trLine(sum)}</p>` : ''}
${mosaicByPlace(t, ph)}
${vidsBlock(t, i, false)}
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
<button class="btn small" data-a="sendheart" data-t="${esc(t.id)}">${L('ส่ง', 'Send')} ${emo(heartEmoji)}</button></div>${inboxSendHtml(t)}
${hs.length ? `<ul class="hlist">${hs.slice(0, 40).map((h) => `<li><span class="he">${emo(h.emoji)}</span><div class="grow"><b>${esc(h.from)}</b> → ${kidFace(h.child)} ${esc(kidName(h.child))}${h.pending ? ' ⏳' : ''}${h.text ? `<p>${emoIn(esc(h.text))}</p>` : ''}<small class="label">${esc(new Date(h.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}${h.day !== null && h.day !== undefined ? ` · ${L('วันที่', 'Day')} ${h.day + 1}` : ''}</small></div>${isEditor() || h.mine ? `<button class="mini noprint" data-a="delheart" data-v="${esc(h.id)}">${L('ลบ', 'Delete')}</button>` : ''}</li>`).join('')}</ul>` : ''}</section>`;
}
/* Letters for the future (owner, Nov 2026: "จดหมายเปิดในอนาคต"; server/capsule.js): write to a child, pick the day (their 10th, 15th or
   18th birthday from the month of birth, or any date), change it while it is open, seal it — then even this page shows only to whom and
   when, until the day comes and the phones say it may be opened. */
const CAP = { list: null, at: 0, busy: false, edit: null };
function capLoad(force) {
  if (CAP.busy || (!force && Date.now() - CAP.at < 30e3)) return;
  CAP.busy = true; CAP.at = Date.now();
  api('GET', '/api/b/capsules').then((r) => { CAP.list = r.list || []; CAP.today = r.today; }).catch(() => {}).finally(() => { CAP.busy = false; if (route().parts[0] === 'capsules') safeRender(); });
}
const capAt = (slug, age) => { const k = children().find((x) => x.slug === slug); if (!k || !/^\d{4}-\d{2}$/.test(k.birth_ym || '')) return ''; const [y, m] = k.birth_ym.split('-').map(Number); return `${y + age}-${String(m).padStart(2, '0')}-01`; };
function viewCapsules() {
  capLoad();
  const fmt = (d) => fmtDay(d, { day: 'numeric', month: 'long', year: 'numeric' }), to = (c) => (c === 'both' ? L('ลูกๆ', 'the children') : kidName(c));
  const who = (c) => (c === 'both' ? children().map((k) => kidFace(k.slug)).join('') : kidFace(c));
  const e = CAP.edit || (CAP.edit = { id: uid('cap').replace(/[^A-Za-z0-9_-]/g, ''), child: (children()[0] || { slug: 'both' }).slug, title: '', text: '', open_on: '' });
  const ages = e.child !== 'both' ? [10, 15, 18].map((a) => [a, capAt(e.child, a)]).filter(([, d]) => d && d > (CAP.today || '')) : [];
  const state = (c) => (c.open ? ['open', L('เปิดอ่านได้แล้ว', 'Ready to open')] : c.sealed ? ['sealed', L('ปิดผนึกแล้ว', 'Sealed')] : ['draft', L('ยังแก้ได้', 'Still a draft')]);
  const list = CAP.list === null ? `<p class="muted">${L('กำลังดู…', 'Looking…')}</p>` : !CAP.list.length ? '' : `<ul class="caps">${CAP.list.map((c) => { const [k, word] = state(c);
    return `<li class="${c.sealed ? 'sealed' : ''}${c.open ? ' open' : ''}"><span class="capenv"><img src="/art/hub/letter.webp" alt="">${c.sealed && !c.open ? '<i aria-hidden="true">🔒</i>' : ''}</span>
<div class="captx"><span class="capst ${k}">${word}</span><b>${L('ถึง', 'To')} ${esc(to(c.child))}${c.title ? ` · ${esc(c.title)}` : ''}</b><small>${c.open ? L('เปิดได้ตั้งแต่', 'May be opened since') : L('เปิดได้วันที่', 'Opens on')} <b>${esc(fmt(c.open_on))}</b></small>
${c.text !== undefined && (c.open || !c.sealed) ? `<p class="captext">${esc(c.text)}</p>` : ''}
<div class="row">${!c.sealed ? `<button type="button" class="btn ghost small" data-a="capedit" data-v="${esc(c.id)}">${L('แก้', 'Edit')}</button><button type="button" class="btn small" data-a="capseal" data-v="${esc(c.id)}">🔒 ${L('ปิดผนึก', 'Seal')}</button>` : ''}<button type="button" class="mini" data-a="capdel" data-v="${esc(c.id)}">${L('ลบ', 'Delete')}</button></div></div></li>`; }).join('')}</ul>`;
  const form = `<div class="pform"><div class="vgl">${L('ถึง', 'To')}<div class="row capto" role="group" aria-label="${L('ถึง', 'To')}">${children().map((k) => k.slug).concat(children().length > 1 ? ['both'] : []).map((s) => `<button type="button" class="chip" data-a="capto" data-v="${esc(s)}" aria-pressed="${s === e.child}">${who(s)} ${esc(to(s))}</button>`).join('')}</div></div>
<label class="vgl">${L('ชื่อจดหมาย (ไม่ใส่ก็ได้)', 'A title (optional)')}<input class="field" id="captitle" maxlength="120" value="${esc(e.title)}" placeholder="${L('เช่น ถึงหนูตอนอายุ 18', 'e.g. For your 18th birthday')}"></label>
<label class="vgl">${L('จดหมาย', 'The letter')}<textarea class="field paper" id="captext" rows="9" maxlength="20000" placeholder="${L('ถึงลูกรัก…', 'Dear…')}">${esc(e.text)}</textarea></label>
<div class="vgl">${L('เปิดได้เมื่อ', 'Opens')}${ages.length ? `<div class="row capage" role="group" aria-label="${L('เปิดได้เมื่อ', 'Opens')}">${ages.map(([a, d]) => `<button type="button" class="chip" data-a="capage" data-v="${d}" aria-pressed="${e.open_on === d}">🎂 ${L(`อายุ ${a} ขวบ`, `At ${a}`)}</button>`).join('')}</div>` : ''}
<input class="field" id="capdate" type="date" value="${esc(e.open_on)}" min="${esc(CAP.today || '')}" aria-label="${L('เปิดได้วันที่', 'Opens on')}"></div>
<p id="capmsg" class="label" role="status"></p>
<button type="button" class="btn" data-a="capsave">${L('บันทึก (ยังแก้ได้)', 'Save (still open to change)')}</button></div>`;
  return `${pageHead('letter', PG.pink, L('สำหรับวันข้างหน้า', 'For the years ahead'), L('จดหมายเปิดในอนาคต', 'Letters for the future'), L('เขียนถึงลูกวันนี้ ปิดผนึกไว้ แล้วแอปจะเตือนให้เปิดในวันที่ตั้งไว้ ก่อนถึงวันนั้นไม่มีใครอ่านได้ แม้แต่ในแอป', 'Write to the children today and seal it: the app tells you when it may be opened, and until then no one can read it — not even here'))}
${list}
${pcard('pencil', PG.gold, CAP.list && CAP.list.some((c) => c.id === e.id) ? L('แก้จดหมาย', 'Change the letter') : L('จดหมายฉบับใหม่', 'A new letter'), form, 'capform')}`;
}
/* The phones signed in (owner, Nov 2026: "มือถือหาย"; server/devices.js, migration 0033): every phone that holds the books — who, which
   kind, last used — and a two-tap sign-out for one or all others; then the family code, changed without signing anyone out unless asked. */
const DEV = { list: null, me: '', at: 0, busy: false, keys: null };
function devLoad(force) {
  if (DEV.busy || (!force && Date.now() - DEV.at < 30e3)) return;
  DEV.busy = true; DEV.at = Date.now();
  Promise.all([api('GET', '/api/b/devices').then((r) => { DEV.list = r.list || []; DEV.me = r.me; }).catch(() => {}),
    api('GET', '/api/b/passkeys').then((r) => { DEV.keys = r.list || []; }).catch(() => {})]).finally(() => { DEV.busy = false; if (route().parts[0] === 'devices') safeRender(); });
}
const DEV_KIND = { iphone: ['ไอโฟน', 'iPhone'], ipad: ['ไอแพด', 'iPad'], android: ['แอนดรอยด์', 'Android'], mac: ['แมค', 'Mac'], windows: ['วินโดวส์', 'Windows'], linux: ['ลินุกซ์', 'Linux'], other: ['เครื่องอื่น', 'Another device'] };
const devKind = (d) => { const [os, br] = String(d || 'other other').split(' '); const k = DEV_KIND[os] || DEV_KIND.other; return `${L(k[0], k[1])}${br && br !== 'other' ? ' · ' + br[0].toUpperCase() + br.slice(1) : ''}`; };
function viewDevices() {
  devLoad();
  const when = (ms) => new Date(ms).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const list = DEV.list, others = (list || []).filter((x) => !x.me).length;
  // who it is, as a face: Dad's and Mum's pictures for those names, the phones' picture for anyone else
  const face = (x) => { const n = String(x.name || '').trim().toLowerCase(); const pic = /^(พ่อ|ป๊ะป๋า|ปะป๊า|dad|daddy|papa)$/.test(n) ? 'dad' : /^(แม่|มี๊|หม่าม๊า|mum|mom|mummy|mama)$/.test(n) ? 'mum' : x.role === 'editor' ? '' : 'relatives';
    return `<span class="devav">${pic === 'dad' || pic === 'mum' ? `<img src="/art/hub/${pic}.webp" alt="">` : hubIc(pic || 'devices')}</span>`; };
  const rows = list === null ? `<p class="muted">${L('กำลังดู…', 'Looking…')}</p>` : !list.length ? `<p class="muted">${L('ยังไม่มีรายการ เครื่องที่เข้าระบบก่อนหน้านี้จะขึ้นเมื่อเข้าใหม่', 'Nothing listed yet — phones that signed in before this list appear when they sign in again')}</p>`
    : `<ul class="devs">${list.map((x) => `<li${x.me ? ' class="me"' : ''}>${face(x)}<div class="devtx"><b>${esc(x.name || L('ไม่มีชื่อ', 'No name'))}${x.me ? ` <span class="devme">${L('เครื่องนี้', 'This phone')}</span>` : ''}</b>
<small><span class="devrole ${x.role === 'editor' ? 'ed' : 'vw'}">${x.role === 'editor' ? L('พ่อแม่', 'Parent') : L('ญาติ', 'Relative')}${x.group ? ' · ' + esc(x.group) : ''}</span> ${esc(devKind(x.device))}</small><small>${L('ใช้ล่าสุด', 'Last used')} ${esc(when(x.seen))}</small></div>
${x.me ? '' : `<button type="button" class="btn ghost small" data-a="devout" data-v="${esc(x.uid)}">${L('ให้ออก', 'Sign out')}</button>`}</li>`).join('')}</ul>
${others ? `<button type="button" class="btn ghost wide" data-a="devoutall">${L(`ให้ทุกเครื่องออก ยกเว้นเครื่องนี้ (${others})`, `Sign out every other phone (${others})`)}</button>` : ''}`;
  return `${pageHead('devices', PG.blue, L('ความปลอดภัย', 'Keeping it safe'), L('มือถือที่เข้าระบบ', 'Phones signed in'), L('มือถือหายหรือให้คนอื่นยืม แตะ "ให้ออก" เครื่องนั้นจะเปิดเล่มไม่ได้ทันที', 'A phone lost or lent? Tap "Sign out" and it can no longer open the books'))}
${pcard('devices', PG.blue, L('เครื่องที่เปิดเล่มได้ตอนนี้', 'Phones that can open the books'), rows, 'devcard')}
${passkeyCard(when)}
${pcard('privacy', PG.purple, L('เปลี่ยนรหัสครอบครัว', 'Change the family code'), `<p class="pcsub">${L('รหัสใหม่ใช้ตอนเข้าระบบครั้งต่อไป เครื่องที่เข้าอยู่แล้วไม่หลุด เว้นแต่เลือกให้ออกด้วย', 'The new code is for the next sign-in; phones signed in now stay, unless you choose to sign them out too')}</p>
<div class="pform"><label class="vgl">${L('รหัสเดิม', 'Current code')}<input class="field" id="codeold" type="password" inputmode="numeric" autocomplete="current-password" maxlength="12"></label>
<div class="pform2"><label class="vgl">${L('รหัสใหม่ (6–12 หลัก)', 'New code (6–12 digits)')}<input class="field" id="codenew" type="password" inputmode="numeric" autocomplete="new-password" maxlength="12"></label>
<label class="vgl">${L('รหัสใหม่อีกครั้ง', 'The new code again')}<input class="field" id="codenew2" type="password" inputmode="numeric" autocomplete="new-password" maxlength="12"></label></div>
<label class="ckrow"><input type="checkbox" id="codeothers"><span><b>${L('ให้เครื่องอื่นออกด้วย', 'Sign the other phones out too')}</b><small>${L('ทุกเครื่องต้องใส่รหัสใหม่', 'Every phone signs in with the new code')}</small></span></label>
<p id="codemsg" class="label" role="status"></p>
<button type="button" class="btn" data-a="codesave">${L('เปลี่ยนรหัส', 'Change the code')}</button></div>`, 'codeblk')}`;
}
// passkeys (server/passkey.js): the phones that sign a parent in with Face ID or a fingerprint; this phone can be added
function passkeyCard(when) {
  const ks = DEV.keys, can = !!window.PublicKeyCredential;
  const list = ks === null ? '' : !ks.length ? `<p class="muted">${L('ยังไม่มีเครื่องไหนเข้าด้วยลายนิ้วมือหรือใบหน้า', 'No phone signs in with a fingerprint or face yet')}</p>`
    : `<ul class="devs pks">${ks.map((k) => `<li><span class="devav">${hubIc('passkey')}</span><div class="devtx"><b>${esc(k.name || L('ไม่มีชื่อ', 'No name'))}</b><small>${esc(devKind(k.device))} · ${L('เพิ่มเมื่อ', 'added')} ${esc(when(k.at))}</small>${k.used ? `<small>${L('ใช้ล่าสุด', 'Last used')} ${esc(when(k.used))}</small>` : ''}</div>
<button type="button" class="btn ghost small" data-a="pkdel" data-v="${esc(k.id)}">${L('ลบ', 'Remove')}</button></li>`).join('')}</ul>`;
  return pcard('passkey', PG.teal, L('เข้าด้วยลายนิ้วมือหรือใบหน้า', 'Sign in with fingerprint or face'), `<p class="pcsub">${L('เครื่องที่เพิ่มไว้เข้าได้ด้วยการสแกนนิ้วหรือหน้า ไม่ต้องพิมพ์รหัส ลายนิ้วมือไม่ออกจากเครื่อง · รหัสครอบครัวยังใช้ได้เสมอ', 'A phone added here signs in with a finger or face scan, no code to type; the fingerprint never leaves the phone · the family code always works too')}</p>
${list}${can ? `<button type="button" class="btn" data-a="pkadd">${L('เพิ่มเครื่องนี้', 'Add this phone')}</button>` : `<p class="muted small">${L('เครื่องนี้ยังเข้าด้วยลายนิ้วมือหรือใบหน้าไม่ได้', 'This phone cannot sign in with a fingerprint or face')}</p>`}`, 'pkcard');
}
/* Photos from the relatives (owner, Nov 2026: "ญาติส่งรูปเข้าเล่มได้ แต่ต้องรอพ่อแม่กดอนุมัติก่อน"; server/inbox.js): a relative sends
   photos for a book from its hearts box; they wait for the parents (#/inbox), who put each one in the book or turn it away. */
const INBOX = { items: null, at: 0, busy: false, sending: 0 };
function inboxLoad(force) {
  if (INBOX.busy || (!force && Date.now() - INBOX.at < 60e3)) return;
  INBOX.busy = true; INBOX.at = Date.now();   // asked now, answered or not: a failed ask (no signal) must not redraw and ask again in a loop
  api('GET', '/api/b/inbox').then((r) => { INBOX.items = r.items || []; }).catch(() => {}).finally(() => { INBOX.busy = false; safeRender(); });
}
function inboxSendHtml(t) {
  if (isEditor()) return '';
  inboxLoad();
  const mine = (INBOX.items || []).filter((x) => x.trip === t.id).length;
  return `<div class="hform ibsend noprint"><p class="label">${L('มีรูปของทริปนี้ไหม ส่งให้พ่อแม่ได้ พ่อแม่จะเลือกใส่ในเล่มเอง', 'Have photos of this trip? Send them — the parents choose what goes in the book')}</p>
<div class="row"><button type="button" class="btn small" data-a="inboxpick" data-t="${esc(t.id)}"${INBOX.sending ? ' disabled' : ''}>${ic('camera')} ${INBOX.sending ? L(`กำลังส่ง ${INBOX.sending} รูป…`, `Sending ${INBOX.sending}…`) : L('ส่งรูปให้พ่อแม่', 'Send photos to the parents')}</button>
${mine ? `<span class="label">${L(`รอพ่อแม่ดู ${mine} รูป`, `${mine} waiting for the parents`)} ⏳</span>` : ''}</div></div>`;
}
function viewInbox() {
  inboxLoad();
  const items = INBOX.items;
  if (items === null) return `${pageHead('camera', PG.pink, L('จากญาติ', 'From the family'), L('รูปจากญาติ', 'Photos from the family'), '')}<p class="muted">${L('กำลังดู…', 'Looking…')}</p>`;
  if (!items.length) return `${pageHead('camera', PG.pink, L('จากญาติ', 'From the family'), L('รูปจากญาติ', 'Photos from the family'), '')}${emptyCard(null, L('ไม่มีรูปรออยู่', 'No photos waiting'), L('เมื่อญาติส่งรูปมา จะรออยู่ที่นี่ให้พ่อแม่เลือกก่อน', 'When the family sends photos, they wait here for you to choose'))}`;
  const by = {}; for (const x of items) (by[x.trip] = by[x.trip] || []).push(x);
  const dayOpts = (t, d) => `<option value="">${L('ไม่ระบุวัน', 'No day')}</option>${t.days.map((dd, i) => `<option value="${i}"${d === i ? ' selected' : ''}>${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)} · ${esc(fmtDay(dd.date, { day: 'numeric', month: 'short' }))}</option>`).join('')}`;
  const dayGuess = (t, x) => { if (x.day != null) return x.day; if (!x.at) return null; const d = new Date(x.at).toLocaleDateString('en-CA', { timeZone: t.timezone || 'Asia/Bangkok' }); const k = t.days.findIndex((dd) => dd.date === d); return k >= 0 ? k : null; };
  return `${pageHead('camera', PG.pink, L('จากญาติ', 'From the family'), L('รูปจากญาติ', 'Photos from the family'), L('ดูก่อน แล้วเลือกว่ารูปไหนจะใส่ในเล่ม', 'Look first, then choose what goes in the book'))}
${Object.entries(by).map(([tid, xs]) => { const t = trip(tid); if (!t) return '';
    return `<section class="blk ibbook"><h3>${esc(T(t.title).split(' · ')[0])} <span class="label">· ${xs.length}</span></h3>
<ul class="iblist">${xs.map((x) => `<li class="ibit" id="ib-${esc(x.id)}"><img src="/media/inbox/${encodeURIComponent(x.id)}/t" alt="" loading="lazy">
<div class="ibmeta"><b>${L('จาก', 'From')} ${esc(x.from)}</b><small>${esc(new Date(x.sent).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }))}${x.caption ? ' · ' + esc(x.caption) : ''}</small>
<label class="vgl">${L('ใส่ในวัน', 'Put in')}<select class="field" id="ibday-${esc(x.id)}">${dayOpts(t, dayGuess(t, x))}</select></label>
<div class="row"><button type="button" class="btn small" data-a="inboxok" data-v="${esc(x.id)}">${L('ใส่ในเล่ม', 'Put in the book')}</button><button type="button" class="btn ghost small" data-a="inboxno" data-v="${esc(x.id)}">${L('ไม่เอา', 'Not this one')}</button></div></div></li>`).join('')}</ul>
${xs.length > 1 ? `<button type="button" class="linkbtn" data-a="inboxall" data-t="${esc(tid)}">${L(`ใส่ทั้ง ${xs.length} รูป`, `Put all ${xs.length} in`)}</button>` : ''}</section>`; }).join('')}
<p class="snapnote">${ic('lock')}<span>${L('รูปที่รออยู่ไม่อยู่ในเล่ม ไม่อยู่ในสำเนา และไม่ไปที่ผู้ช่วย จนกว่าพ่อแม่จะกดใส่', 'A photo waiting is not in the book, a copy or the helper until you put it in')}</span></p>`;
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
  return `<section class="blk noprint aipanel" id="aipanel"><h3 class="vh">${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')}</h3>${aiToday() ? `<p class="label aiuse">${esc(aiToday())}</p>` : ''}
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
  // a fourth chip beside photos · words · mood (it was a bar of its own above the date: the helper's name three times on one page)
  return `<button type="button" class="lph aijump${n ? '' : ' on'}" data-a="jump" data-v="#aipanel" aria-label="${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')}: ${n ? L(`เหลือ ${n}`, `${n} to do`) : L('ครบแล้ว', 'done')}">${ic('sparkle')}${L('ผู้ช่วย', 'Helper')}<i>${n || '✓'}</i></button>`;
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
/* ---------- check the places on the web (phase 3 of plan with the helper, server/verify.js): the helper searches the web for each
   restaurant and sight of a book the family made — still open, its hours, moved or closed; only a place's name and map address go.
   The answers are kept on the book (theme.verify); a place that may be closed shows on its day's Today page with a way to change it. */
let vfState = null;   // the job as the server reports it (GET /api/b/planner/verify)
const vfOn = (t) => isEditor() && S.features.story && t.source !== 'seed' && t.kind !== 'snap';
const vfOf = (t) => (t.theme && t.theme.verify && Array.isArray(t.theme.verify.places) ? t.theme.verify : null);
const vfBad = (p) => p.st === 'closed' || p.st === 'moved';
const VF_ST = { open: ['✓', 'เปิดอยู่', 'Open'], closed: ['⚠', 'อาจปิดแล้ว', 'May be closed'], moved: ['↪', 'ย้ายที่', 'Moved'], unsure: ['?', 'ไม่แน่ใจ', 'Not sure'] };
function vfSub(t) {
  const v = vfOf(t);
  if (!v) return L('ผู้ช่วยค้นเว็บว่าร้านยังเปิดไหม เวลาเปิด ย้ายไปไหม', 'The helper looks up whether each place is still open, its hours, if it moved');
  const bad = v.places.filter(vfBad).length;
  return bad ? L(`ควรดู ${bad} ที่ · เช็กเมื่อ ${fmtDay(new Date(v.at).toISOString().slice(0, 10), { day: 'numeric', month: 'short' })}`, `${bad} to look at · checked ${fmtDay(new Date(v.at).toISOString().slice(0, 10), { day: 'numeric', month: 'short' })}`)
    : L(`เช็กแล้ว ${v.places.length} ที่ ไม่มีที่ต้องห่วง`, `${v.places.length} places checked, nothing to worry about`);
}
function checkLine(t, i) {
  const v = vfOf(t); if (!v) return '';
  const bad = v.places.filter((p) => p.day === i && vfBad(p));
  if (!bad.length) return '';
  const ask = L(`${bad.map((p) => p.name).join(', ')} อาจปิดหรือย้ายแล้ว ขอที่อื่นแทน`, `${bad.map((p) => p.name).join(', ')} may be closed or moved — another place, please`);
  return `<div class="call warn vfwarn noprint"><span>⚠ ${L('จากการเช็กบนเว็บ', 'From the web check')}: ${bad.map((p) => `<b>${esc(p.name)}</b> ${L(VF_ST[p.st][1], VF_ST[p.st][2].toLowerCase())}${T(p.note) ? ` — ${esc(T(p.note))}` : ''}`).join(' · ')}</span>
${dchOn(t) ? `<button type="button" class="btn small" data-a="dchfill" data-v="${esc(ask)}">${L('ขอเปลี่ยนวันนี้', 'Change this day')}</button>` : ''}</div>`;
}
function viewCheck(t) {
  if (!vfOn(t)) return viewHub(t);
  if (vfState === null) { vfState = 'loading'; api('GET', '/api/b/planner/verify').then((r) => { vfState = r; if (r.status === 'running' && r.trip === t.id) vfPoll(); safeRender(); }, () => { vfState = { status: 'idle' }; safeRender(); }); }
  const v = vfOf(t), j = vfState && typeof vfState === 'object' && vfState.trip === t.id ? vfState : { status: 'idle' }, run = j.status === 'running';
  const card = (p) => { const [e, th, en] = VF_ST[p.st] || VF_ST.unsure;
    return `<li class="vfp st-${p.st}"><div class="vfh"><b>${esc(p.name)}</b><span class="vfs">${e} ${L(th, en)}</span></div>${p.hours ? `<small>🕘 ${esc(p.hours)}</small>` : ''}${T(p.note) ? `<p>${esc(T(p.note))}</p>` : ''}${p.url ? extA(p.url, L('แหล่งที่มา', 'Source'), 'linkbtn') : ''}</li>`; };
  const byDay = v ? [...new Set(v.places.map((p) => p.day))].sort((a, b) => a - b).map((d) => {
    const ps = v.places.filter((p) => p.day === d).sort((a, b) => Number(vfBad(b)) - Number(vfBad(a)));
    return pcard('today', snapPal(d), `${L(`วันที่ ${d + 1}`, `Day ${d + 1}`)} · ${esc(T((t.days[d] || {}).title))}`, `<ul class="vfl">${ps.map(card).join('')}</ul>${ps.some(vfBad) && dchOn(t) ? `<a class="btn small" href="#/t/${esc(t.id)}/today/${d}">${L('ไปขอเปลี่ยนวันนี้', 'Go and change this day')}</a>` : ''}`);
  }).join('') : '';
  const bad = v ? v.places.filter(vfBad).length : 0;
  return `${pageHead('find', PG.cyan, esc(T(t.title)), L('เช็กร้านและที่เที่ยว', 'Check the places'), L('ผู้ช่วยค้นเว็บทีละที่ ว่ายังเปิดอยู่ไหม เวลาเปิด หรือย้ายไปแล้ว — ใช้เวลาไม่กี่นาที', 'The helper searches the web for each place — still open, its hours, moved — a few minutes'))}
${run ? `<section class="impjob running"><div class="impjobhd"><span class="e">🔎</span><div><b>${L('ผู้ช่วยกำลังค้นเว็บ', 'The helper is searching')}</b><small>${L(`${j.done || 0} จาก ${j.total || '…'} ที่`, `${j.done || 0} of ${j.total || '…'} places`)}</small></div></div>
<div class="impbar"><i style="width:${Math.max(4, Math.round(((j.done || 0) / (j.total || 1)) * 100))}%"></i></div></section>`
    : `<div class="row vfgo"><button type="button" class="btn" data-a="vfstart" data-t="${esc(t.id)}">🔎 ${v ? L('เช็กอีกครั้ง', 'Check again') : L('ให้ผู้ช่วยเช็กบนเว็บ', 'Ask the helper to check')}</button>${j.status === 'error' ? `<span class="err" style="color:var(--accent2)">${esc(vfErr(j.error))}</span>` : ''}</div>`}
${v ? `<p class="vfsum">${bad ? L(`ควรดู <b>${bad}</b> ที่`, `<b>${bad}</b> to look at`) : L('ไม่มีที่ต้องห่วง', 'Nothing to worry about')} · ${L(`เช็กแล้ว ${v.places.length} ที่ เมื่อ ${esc(fmtDay(new Date(v.at).toISOString().slice(0, 10)))}`, `${v.places.length} places checked on ${esc(fmtDay(new Date(v.at).toISOString().slice(0, 10)))}`)}</p>${byDay}`
    : run ? '' : emptyCard(t, L('ยังไม่ได้เช็ก', 'Not checked yet'), L('ร้านเปิด-ปิดเปลี่ยนบ่อย เช็กก่อนไปสักสัปดาห์', 'Places change — check a week or so before you go'))}
<p class="impnote">🔒 ${L('ส่งให้ผู้ช่วยแค่ชื่อร้านหรือที่เที่ยวกับที่อยู่บนแผนที่ ไม่มีชื่อลูกหรือข้อมูลครอบครัว · ผลจากเว็บอาจไม่ล่าสุด เช็กกับร้านอีกทีถ้าสำคัญ', 'Only each place’s name and map address go to the helper — nothing about the family · what the web says may be out of date; call the place if it matters')}</p>`;
}
const vfErr = (e) => ({ limit: L('ผู้ช่วยใช้ครบโควตาวันนี้แล้ว ลองพรุ่งนี้', "Today's helper allowance is used up — try tomorrow"), json: L('คำตอบอ่านไม่ได้ ลองอีกครั้ง', 'Unreadable answer — try again'), refusal: L('ผู้ช่วยเช็กไม่ได้', 'The helper could not check') }[e] || L('ไม่สำเร็จ ลองอีกครั้ง', 'Did not work — try again'));
/* ---------- change this day (phase 2 of plan with the helper, docs/AI-PLANNER.md §4.6): rain, a tired or unwell child, a place that is
   shut → the helper writes the day again (one call, the live forecast and tonight's bed in it), the two versions side by side, "use this"
   saves it, the old day kept for one undo. Not on a bundled book: its next deploy would write the seed back over the change. */
let dch = null;   // { t, i, ask, busy, prop, err }
const DCH_CHIPS = [['🌧️', 'ฝนตก ขอที่ในร่ม', 'It rains — indoor places, please'], ['🤒', 'ลูกไม่ค่อยสบาย อยากอยู่ใกล้ที่พัก', 'A child is unwell — stay near the bed'], ['😴', 'เหนื่อย ขอวันเบาๆ', 'Tired — an easy day, please'], ['🚫', 'ที่ที่จะไปปิด', 'The place we planned is shut']];
const dchOn = (t) => isEditor() && S.features.story && t.source !== 'seed';
function changedLine(t, i) {
  const c = ((t.days[i] || {}).plan || {}).changed;
  if (!c) return '';
  return `<div class="call calm dchd noprint"><span>✨ ${L('ผู้ช่วยเปลี่ยนแผนวันนี้แล้ว', 'The helper changed today’s plan')}${T(c.why) ? ` — ${esc(T(c.why))}` : ''}</span>${isEditor() && t.source !== 'seed' && ((t.days[i] || {}).plan || {}).prev ? `<button type="button" class="linkbtn" data-a="dchundo" data-t="${esc(t.id)}" data-d="${i}">${L('กลับไปแผนเดิม', 'Back to the old plan')}</button>` : ''}</div>`;
}
// indoor places near tonight's bed that suit the children, as one-tap asks for the change box (E5): the rainy-day list's own (it loads it)
function dchIndoor(t, i) {
  const pl = t.days[i].plan || {}, ll = pl.stay && pl.stay.ll;
  if (!Array.isArray(ll) || ll.length !== 2 || sightRain.key !== `${t.id}:${i}:${ll.join(',')}` || !sightRain.list || !sightRain.list.length) return '<div class="dchin" id="dchin" hidden></div>';
  const list = sightRain.list.slice().sort((a, b) => (famLoved(b) ? 1 : 0) - (famLoved(a) ? 1 : 0) || b.fit - a.fit).slice(0, 4);
  return `<div class="dchin" id="dchin"><div class="label">🏠 ${L('ในร่มแถวที่พัก · แตะเพื่อขอ', 'Indoors near the bed · tap to ask')}</div><div class="chips">${list.map((x) => `<button type="button" class="chip" data-a="dchchip" data-v="${esc(L(`ฝนตก ไป${T(x.name)}แทน`, `It rains — go to ${x.name.en} instead`))}">${emo((SIGHT_KINDS[x.kind] || ['📍'])[0])} ${esc(T(x.name))}${famLoved(x) ? ' ★' : ''}</button>`).join('')}</div></div>`;
}
function changeBlock(t, i) {
  if (!dchOn(t)) return '';
  const st = dch && dch.t === t.id && dch.i === i ? dch : { ask: '' }, pr = st.prop;
  const rows = (pl) => ((pl && pl.plan) || []).map((r) => `<li>${r.t ? `<b>${esc(r.t)}</b> ` : ''}${esc(T(r.h) || T(r))}</li>`).join('');
  const cmp = !pr ? '' : `<div class="dchwhy">✨ ${esc(T(pr.why) || L('แผนใหม่ของวันนี้', 'A new plan for today'))}${st.fc ? `<small>${L('พยากรณ์', 'Forecast')}: ${esc(st.fc)}</small>` : ''}</div>
<div class="dchcmp"><div class="dchold"><div class="lbl">${L('แผนเดิม', 'Now')}</div><ol>${rows(t.days[i].plan)}</ol></div><div class="dchnew"><div class="lbl">${L('แผนใหม่', 'New')}</div><ol>${rows(pr.plan)}</ol></div></div>
<div class="row"><button type="button" class="btn" data-a="dchuse" data-t="${esc(t.id)}" data-d="${i}"${st.busy ? ' disabled' : ''}>✓ ${L('ใช้แผนใหม่', 'Use the new plan')}</button><button type="button" class="btn ghost" data-a="dchdrop">${L('ไม่เอา', 'No, thanks')}</button></div>`;
  return `<section class="blk noprint dchblk" id="dchblk"><h3>${ic('sparkle')} ${L('ขอเปลี่ยนวันนี้', 'Change this day')} <span class="label">${L('ผู้ช่วยเขียนวันใหม่ ดูก่อนใช้', 'the helper rewrites it — you look first')}</span></h3>
<div class="chips dchchips">${DCH_CHIPS.map(([e, th, en]) => `<button type="button" class="chip" data-a="dchchip" data-v="${esc(L(th, en))}">${emo(e)} ${L(th, en)}</button>`).join('')}</div>
${dchIndoor(t, i)}
<div class="row dchrow"><input class="field" id="dchask" maxlength="400" value="${esc(st.ask || '')}" placeholder="${L('หรือพิมพ์เอง เช่น อยากไปสวนสัตว์แทน', 'or type it, e.g. the zoo instead')}"><button type="button" class="btn" data-a="dchgo" data-t="${esc(t.id)}" data-d="${i}"${st.busy ? ' disabled' : ''}>${st.busy === 'ask' ? L('กำลังเขียน…', 'Writing…') : '✨ ' + L('ขอแผนใหม่', 'Ask')}</button></div>
${st.err ? `<div class="err" style="color:var(--accent2)">${esc(st.err)}</div>` : ''}${cmp}
<p class="label">${L('ส่งแผนของวันนี้ ที่พักคืนนี้ พยากรณ์อากาศ และอายุของเด็ก · ไม่ส่งชื่อหรือรูป · ที่เช็กอินแล้วยังอยู่ในแผน', 'Sends today’s plan, tonight’s bed, the forecast and the children’s ages · never names or photos · places already checked in stay')}</p></section>`;
}
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
// the helper's draft not yet kept (entries.src 'ai', a book from photos): a quiet tag for the parents only — never for relatives, never printed —
// leading to the page that checks the whole draft
const aiTag = (t, e) => (isEditor() && e && e.src === 'ai' && e.text ? `<a class="aitag2 noprint" href="#/t/${encodeURIComponent(t.id)}/draft/review">${ic('sparkle')}${L('ร่างโดยผู้ช่วย · ตรวจ', 'Drafted by the helper · check')}</a>` : '');
function foreBlock(t, nDays) {
  const e = entriesOf(t.id).find((x) => x.kind === 'fore'), ed = isEditor();
  if (!ed) return e && e.text ? `<div class="part">📖 ${L('คำนำ', 'Foreword')}</div><div class="call calm fore">${esc(e.text)}</div>` : '';
  if (!nDays && !e) return '';
  const ai = S.features.story && nDays;
  return `<section class="blk foreblk"><h3>${ic('book')} ${L('คำนำของสมุด', 'The book’s foreword')} <span class="label">${L('หน้าแรกของ PDF ต่อจากปก', 'the first page of the PDF after the cover')}</span></h3>
${aiTag(t, e)}<textarea id="foretext" class="field" rows="6" data-a-blur="fore" data-t="${esc(t.id)}" data-d="" data-draft="fw:${esc(t.id)}" maxlength="3000" placeholder="${L('ทริปนี้เราไป…', 'On this trip we went…')}">${esc(drafts['fw:' + t.id] ?? (e ? e.text : ''))}</textarea><p class="label savenote">${L('บันทึกเองเมื่อแตะออกจากช่อง', 'Saves by itself when you leave the box')}</p>
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
  return `${pageHead('emoji', PG.gold, L('ตั้งค่า', 'Settings'), L('อีโมจิของเรา', 'Our emoji'), L('รูปที่ใช้แทนอีโมจิในอารมณ์ หัวใจ คำพูด โน้ต และคำบรรยายรูป · เพิ่มของบ้านเราเอง หรือลบที่ไม่ใช้', 'The pictures the app draws for each emoji — in moods, hearts, quotes, notes and captions. Add your own, or delete the ones you don’t use.'))}
<section class="pcard emoadd" style="--g1:${PG.gold}"><h3 class="pch"><span class="pcpic">${hubIc('emoji')}</span><span>${L('เพิ่มอีโมจิ', 'Add an emoji')}</span></h3>
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
// a child's age in months when a book began (the passport's "Growing up, trip by trip" on the Explorer ID page)
const growAgeM = (k, t) => { if (!k || !/^\d{4}-\d{2}$/.test(k.birth_ym || '') || !t.date_from) return null; const [y, m] = t.date_from.split('-').map(Number), [by, bm] = k.birth_ym.split('-').map(Number), mo = (y - by) * 12 + m - bm; return mo >= 0 ? mo : null; };
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
<div class="onbways">${S.features.story ? `<a class="onbway main" href="#/planner"><span class="e">${ic('route')}</span><span><b>${L('วางแผนกับผู้ช่วย', 'Plan with the helper')}</b><small>${L('ตอบไม่กี่ข้อ ผู้ช่วยร่างเส้นทางแล้วเขียนทั้งเล่มให้', 'Answer a few questions — the helper drafts the route and writes the book')}</small></span>${ic('chev')}</a><a class="onbway" href="#/import"><span class="e">${ic('doc')}</span><span><b>${L('จากคู่มือทริป (PDF)', 'From the trip manual (PDF)')}</b><small>${L('ผู้ช่วยอ่านคู่มือแล้วทำแผนรายวัน ร้าน และหน้าของเด็กให้ · ราว 15 นาที', 'The helper reads the manual and makes the day plans, places to eat and the kids’ pages · about 15 min')}</small></span>${ic('chev')}</a>` : ''}
<a class="onbway main" href="#/snap"><span class="e">${ic('camera')}</span><span><b>${L('เล่มจากรูป', 'A book from photos')}</b><small>${L('เลือกรูปของทริป แอปจัดวันและสถานที่ให้', 'Pick the trip’s photos — the app sorts the days and places')}</small></span>${ic('chev')}</a>
${S.trips.some((t) => t.id === 'sakura-hop-2028') ? '' : `<button type="button" class="onbway" data-a="sample"><span class="e">${ic('book')}</span><span><b>${L('ดูเล่มตัวอย่างก่อน', 'Look at a sample book first')}</b><small>${L('ทริปสมมติ 6 วันที่เติมไว้แล้ว ใช้ชื่อลูกของบ้านคุณ ลบได้ทุกเมื่อ', 'A filled-in 6-day trip with your children’s names — delete it any time')}</small></span>${ic('chev')}</button>`}
<button type="button" class="onbway" data-a="newtrip"><span class="e">${ic('log')}</span><span><b>${L('เล่มเปล่า', 'An empty book')}</b><small>${L('ใส่ชื่อทริปกับวันที่ แล้วค่อยเติมเอง · 1 นาที', 'Type the trip name and dates, fill it in as you go · 1 min')}</small></span>${ic('chev')}</button>
<a class="onbway" href="#/"><span class="e">${ic('shelf')}</span><span><b>${L('ไปที่ชั้นหนังสือ', 'Go to the bookshelf')}</b><small>${S.trips.length ? L(`มี ${S.trips.length} เล่ม`, `${S.trips.length} book${S.trips.length > 1 ? 's' : ''}`) : L('ว่างอยู่', 'Empty for now')}</small></span>${ic('chev')}</a></div>
<ul class="onbsum">${kids.length ? `<li>✓ ${L(`ครอบครัว: ${esc(nm)}`, `Family: ${esc(nm)}`)}</li>` : `<li>○ ${L('ยังไม่ได้ใส่ลูก', 'No children yet')} · <a href="#/start/1">${L('ใส่เลย', 'Add them')}</a></li>`}
<li>${standalone ? '✓ ' + L('เปิดจากหน้าจอโฮมแล้ว', 'On the Home Screen') : '○ ' + L('ยังไม่ได้เพิ่มไว้บนหน้าจอโฮม', 'Not on the Home Screen yet')}</li>
<li>${ls('remind') ? '✓ ' + L('เตือนเปิดอยู่', 'Reminders on') : '○ ' + L('เตือนยังไม่เปิด เปิดได้ที่หน้า “วันนี้”', 'Reminders off — turn them on from Today')}</li>
<li>○ ${L('รหัสญาติ ตั้งหรือแก้ได้ที่ เมนู › ญาติ', 'Relatives’ PIN: set or change it under Menu › Relatives')}</li></ul>`;
  }
  return `<section class="onb">${head}${body}</section>`;
}

/* ---------- how to use the app (#/help): readable before sign-in, for parents and relatives alike ----------
   Owner, Nov 2026: "มีคู่มือใช้งานไหม" → "ทำหมดเลย". One page in the settings pages' look (pageHead + pcard), a card a job in the order a
   family meets them; each card says who it is for; the chips at the top jump to a card (A.jump takes a selector). Plain words from the
   Thai glossary — no developer words. A new feature a parent or relative uses gets its line here. */
const HELP = [
  ['start', 'settings', PG.blue, ['เริ่มใช้', 'Getting started'], 'all', [
    ['เปิดลิงก์ของแอป พิมพ์ชื่อตัวเอง แล้วกดรหัส แอปเข้าเองเมื่อกดตัวสุดท้าย', 'Open the app’s link, type your name, then tap in the code — it signs in by itself at the last digit'],
    ['พ่อแม่ใช้รหัสครอบครัว ญาติใช้รหัสหรือลิงก์ที่พ่อแม่ส่งให้ (ดูได้อย่างเดียว)', 'Parents use the family code; relatives use the code or link Mum or Dad sent (view only)'],
    ['ใส่ไอคอนบนหน้าจอ: iPhone กดปุ่มแชร์ › “เพิ่มไปยังหน้าจอโฮม” · Android กดเมนู ⋮ › “ติดตั้งแอป”', 'Add it to the home screen: on an iPhone tap Share › “Add to Home Screen” · on Android tap ⋮ › “Install app”'],
    ['เปิดการเตือนเมื่อแอปถาม (iPhone เตือนได้เฉพาะตอนเปิดจากไอคอนบนหน้าจอ)', 'Switch reminders on when the app asks (an iPhone sends them only from the home-screen icon)'],
    ['ภาษาไทย/English และขนาดตัวอักษร เปลี่ยนได้ที่การ์ด “ภาษาและตัวอักษร” บนชั้นหนังสือ', 'Thai/English and the text size are on the shelf’s “Language and text” card']]],
  ['shelf', 'shelf', PG.orange, ['ชั้นหนังสือและเมนูเล่ม', 'The shelf and a book’s menu'], 'all', [
    ['หนึ่งทริปคือหนึ่งเล่ม แตะปกเพื่อเปิดเมนูของเล่ม', 'One trip is one book — tap a cover to open its menu'],
    ['เมนูเป็นกล่องตามหัวข้อ: วันนี้ แผนทั้งทริป ที่พัก ฉุกเฉิน เตรียมตัว เรียนรู้ สมุดความทรงจำ', 'The menu is a box a topic: Today, the whole plan, stays, emergency, get ready, learn, the memory book'],
    ['แถบล่างของพ่อแม่: เมนู · วันนี้ · บันทึก · ร้านอาหาร · โหมดเด็ก', 'The parents’ bar: Menu · Today · Record · Eat · Kid mode'],
    ['ทุกรายงานมีสองแบบ “สรุป” และ “เต็ม” สลับได้ที่หัวหน้า', 'Every report comes in two versions, short and full — switch at the top'],
    ['ปุ่มค้นหาที่มุมบนหาได้ทั้งเล่ม พิมพ์ผิดนิดหน่อยก็ยังเจอ', 'The search at the top finds anything in the book, even with a small typo']]],
  ['before', 'today', PG.teal, ['ก่อนเดินทาง', 'Before you go'], 'parents', [
    ['หน้า “เตรียมตัว” มีรายการของที่ต้องจัด เอกสารที่ต้องพร้อม และวีซ่า ติ๊กได้ในเครื่อง', 'The “Get ready” page has the packing list, the papers to have ready and the visa — tick them on your phone'],
    ['กด “เก็บเล่มไว้ในเครื่อง” ก่อนบิน แล้วจะเปิดได้แม้ไม่มีเน็ต', 'Tap “Keep this book on the phone” before the flight, so it opens with no signal'],
    ['เด็กๆ เปิดประตูนับวันถอยหลังได้วันละบาน และช่วยจัดกระเป๋าในโหมดเด็ก', 'The children open one countdown door a day and help pack in kid mode']]],
  ['today', 'today', PG.blue, ['ระหว่างทริป: หน้าวันนี้', 'On the trip: Today'], 'all', [
    ['แอปเปิดที่หน้าวันนี้เอง บนสุดบอกว่าต่อไปทำอะไร แตะขั้นตอนเพื่อดูรายละเอียด', 'The app opens on Today by itself; the top says what is next — tap a step for its details'],
    ['ปุ่มหมุดข้างชื่อสถานที่เปิดแผนที่นำทาง', 'The pin beside a place’s name opens directions in Maps'],
    ['“กระเป๋าวันนี้” ติ๊กตอนเช้า มีร่มให้เองถ้าพยากรณ์บอกว่าฝนจะตก', '“Today’s bag” is ticked in the morning — an umbrella appears by itself when rain is forecast'],
    ['หน้าร้านอาหารบอกร้านของแต่ละมื้อ และร้านใกล้ที่พักคืนนี้', 'The eat page gives each meal’s place and places near tonight’s bed'],
    ['หน้าฉุกเฉิน: เบอร์โทร ที่อยู่คืนนี้ และ “การ์ดเด็กหลง” ไว้ตั้งเป็นภาพหน้าจอล็อกของเด็ก', 'Emergency: the numbers, tonight’s address and a lost-child card to set as the child’s lock screen']]],
  ['record', 'pencil', PG.pink, ['บันทึกตอนเย็น', 'Recording the day'], 'parents', [
    ['กด “บันทึก” ที่แถบล่าง แต่ละขั้นเป็นหน้าของมันเอง: รูป คำพูด อารมณ์ โน้ตและครั้งแรก ที่ไปและค่าใช้จ่าย', 'Tap Record on the bar — a page a step: photos, words, mood, note and firsts, places and spending'],
    ['รูปแปะตามจุดได้: แตะชิปชื่อสถานที่ แล้วเลือกรูป รูปซ้ำจะถูกถามก่อนส่ง', 'Photos by spot: tap a place’s chip, then pick photos — a copy of one already in the book is asked about first'],
    ['คำพูดของลูกจดไว้ตามคำที่พูดจริง อัดเสียงได้ไม่เกิน 30 วินาที', 'Write the children’s words as they said them; record a voice up to 30 seconds'],
    ['สามทุ่มครึ่งมีเตือนให้บันทึก ถ้าเปิดผู้ช่วยไว้ กด “ทำทั้งหมดในครั้งเดียว” ให้ผู้ช่วยสรุปวันและแต่งนิทาน', 'At 21:30 a reminder comes; with the helper on, “Do it all in one go” writes the day’s summary and a story'],
    ['กด “จบวันนี้” แล้ววันนั้นจะได้ตราประทับในพาสปอร์ต', 'Tap “Mark day done” and the day gets its stamp in the passport']]],
  ['passport', 'passport', PG.gold, ['พาสปอร์ตนักผจญภัย', 'The adventure passport'], 'all', [
    ['ลูกแต่ละคนมีพาสปอร์ตเล่มเดียว เปิดจากการ์ดบนชั้นหนังสือ', 'Each child has one passport — open it from the shelf’s cards'],
    ['เปิดทีละหน้า: ปก บัตรนักสำรวจ วีซ่าทุกทริป ภารกิจ แผนที่ รายการ สติกเกอร์ ถ้วยรางวัล ใบประกาศ', 'A page at a time: cover, Explorer ID, a visa for every trip, missions, map, lists, stickers, trophies, certificate'],
    ['เปลี่ยนหน้าด้วยแท็บด้านบน ปุ่ม ‹ › ด้านล่าง หรือปัดจอ', 'Turn pages with the tabs at the top, ‹ › at the foot, or a swipe'],
    ['พ่อแม่กด ✏️ เพื่อกรอกบัตรนักสำรวจ ติ๊กภารกิจ และรายการ', 'Parents tap ✏️ to fill in the Explorer ID, tick missions and lists'],
    ['ส่วนสูงกรอกที่บัตรนักสำรวจของแต่ละเล่มที่เดียว แล้วเส้นการเติบโตขึ้นเองเมื่อมีสองทริป', 'The height is typed in each book’s Explorer ID only — the growth line appears once two trips have one'],
    ['ใบประกาศมาเองในวันสุดท้าย ไม่ต้องติ๊กให้ครบ', 'The certificate comes by itself on the last day — nothing to complete'],
    ['ปุ่ม “พิมพ์” โหลดสมุดความทรงจำเป็น PDF ซึ่งมีหน้าพาสปอร์ตของลูกทุกคน', '“Print” downloads the memory book as a PDF, with every child’s passport pages']]],
  ['kid', 'kid', PG.purple, ['โหมดเด็ก', 'Kid mode'], 'parents', [
    ['กด “โหมดเด็ก” ที่แถบล่าง แล้วเลือกลูก หน้าจอจะล็อกไว้ให้เด็กเล่น', 'Tap Kid mode on the bar and pick a child — the screen is locked for them'],
    ['ออกจากโหมดเด็ก: กดค้างที่รูปกุญแจมุมบนประมาณหนึ่งวินาที', 'To leave: press and hold the lock in the top corner for about a second'],
    ['มีเกมฝึกเชาว์หลายด่าน แผนที่ผจญภัย ระบายสี วาดรูป และนิทานก่อนนอน ทุกปุ่มอ่านออกเสียง', 'Thinking games with levels, the adventure map, colouring, drawing and a bedtime story — every button reads itself aloud'],
    ['ปุ่ม 🛂 ⭐ 🏆 เปิดพาสปอร์ตเล่มเดียวกับของพ่อแม่ ตอนเย็นมีป้ายชวนปั๊มตราวันนี้ก่อนนอน', '🛂 ⭐ 🏆 open the same passport the parents see; in the evening a banner asks to stamp today before bed'],
    ['ล้างด่านของเกมหรือโถดาว: ผู้ใหญ่กดค้าง 1.5 วินาที', 'To start a game’s levels or the star jar again: a grown-up presses and holds for 1.5 seconds']]],
  ['relatives', 'relatives', PG.cyan, ['สำหรับญาติ', 'For the family'], 'all', [
    ['ญาติเปิดดูได้ทุกเล่มที่พ่อแม่เลือกให้ ดูอย่างเดียว แก้ไม่ได้', 'Relatives see the books the parents chose for them — to look at, not to change'],
    ['ส่งหัวใจและข้อความสั้นๆ ถึงเด็กๆ ได้จากหน้าหัวใจ เด็กจะได้ยินในโหมดเด็ก', 'Send hearts and a short note to the children from the hearts page — they hear it in kid mode'],
    ['เขียนข้อความใต้รูปได้เมื่อเปิดรูปเต็มจอ', 'Write a note under a photo when it is open full screen'],
    ['ส่งรูปให้พ่อแม่ได้ รูปจะรอให้พ่อแม่กดใส่ในเล่มก่อน', 'Send photos to Mum and Dad — they wait until the parents put them in the book'],
    ['เปิดการเตือนไว้ แล้วตอนค่ำจะรู้เมื่อมีรูปใหม่ของวันนี้', 'Switch reminders on to hear in the evening when today has new photos']]],
  ['after', 'book', PG.lime, ['หลังจบทริป', 'After the trip'], 'parents', [
    ['สมุดความทรงจำรวมรูป คำพูด ครั้งแรก และนิทานไว้เป็นวัน', 'The memory book holds the photos, words, firsts and stories day by day'],
    ['ท้ายสมุดมี PDF ขนาด A4 และ A5 เลือกปกและวัยของเล่มได้', 'At the foot of the book: a PDF in A4 or A5; choose the cover and the age the book is written for'],
    ['กด “ทำคลิปสรุปทริป” ได้คลิปแนวตั้งพร้อมเพลง ส่งต่อได้เลย', '“Make the trip film” gives a portrait film with music, ready to share'],
    ['“เก็บเล่มเป็นไฟล์เดียว” โหลดไฟล์ที่มีรูปและคำพูดทั้งเล่ม เปิดได้โดยไม่ต้องมีแอป', '“Keep the book as one file” downloads one file with every photo and word, which opens without the app'],
    ['ทริปที่ไม่ได้วางแผนไว้ ทำ “เล่มจากรูป” ได้ที่การ์ดเล่มใหม่บนชั้นหนังสือ', 'A trip you did not plan: make “A book from photos” from the shelf’s New book card']]],
  ['offline', 'offline', PG.teal, ['ตอนไม่มีเน็ต', 'With no signal'], 'all', [
    ['เล่มที่เก็บไว้ในเครื่อง พาสปอร์ต และโหมดเด็ก เปิดได้ทั้งหมด', 'A book kept on the phone, the passports and kid mode all open'],
    ['รูปและข้อความที่บันทึกตอนไม่มีเน็ต รออยู่ในเครื่อง แล้วส่งเองเมื่อมีสัญญาณ', 'Photos and words recorded with no signal wait on the phone and go by themselves once there is signal'],
    ['ตั้ง “ส่งรูปและเสียงเฉพาะตอนต่อ Wi-Fi” ได้ในหน้าใช้ตอนไม่มีเน็ต ข้อความยังส่งทันที', 'Set “Send photos and voice clips on Wi-Fi only” on the no-signal page — words still go at once']]],
  ['trouble', 'checkphone', PG.orange, ['ถ้ามีปัญหา', 'If something is wrong'], 'all', [
    ['ยังเห็นหน้าเก่าหลังแอปอัปเดต: ปิดแอปแล้วเปิดใหม่ 1–2 ครั้ง', 'Still seeing the old version after an update: close the app and open it again once or twice'],
    ['ไม่มีเสียงบน iPad: ลองแตะปุ่มอีกครั้ง เสียงจะเล่นหลังการแตะครั้งแรก', 'No sound on an iPad: tap the button once more — sound plays after the first tap'],
    ['พ่อแม่: “ตรวจเครื่องนี้” ในรายการตั้งค่าบอกว่ารูป คลิป และการแชร์ใช้ได้ไหม', 'Parents: “Check this phone” in the settings list says whether photos, clips and sharing work'],
    ['มือถือหาย: พ่อแม่ให้เครื่องนั้นออกจากระบบได้ที่ “มือถือที่เข้าระบบ”', 'A lost phone: the parents sign it out from “Phones signed in”']]],
];
function viewHelp() {
  const who = (w) => (w === 'parents' ? `<span class="hwho">${L('พ่อแม่', 'Parents')}</span>` : '');
  const cards = HELP;   // everyone reads every card; the parents' jobs carry a tag
  return `<article class="helppg">${pageHead('manual', PG.purple, L('คู่มือ', 'Guide'), L(`ใช้ ${esc(appName())} ยังไง`, `How to use ${esc(appName())}`), L('ทีละเรื่อง ตามลำดับที่ครอบครัวได้ใช้ แตะหัวข้อเพื่อไปที่เรื่องนั้น', 'One job at a time, in the order a family meets them — tap a topic to go to it'))}
<nav class="row chips helptoc" aria-label="${L('หัวข้อ', 'Topics')}">${cards.map(([k, , , t]) => `<button type="button" class="chip" data-a="jump" data-v="#help-${k}">${L(t[0], t[1])}</button>`).join('')}</nav>
${cards.map(([k, pic, g, t, w, rows]) => pcard(pic, g, `${L(t[0], t[1])}${who(w)}`, `<ul class="helpl">${rows.map(([th, en]) => `<li>${L(th, en)}</li>`).join('')}</ul>`, 'helpc', `help-${k}`)).join('')}
<p class="muted small">${L('อ่านเรื่องข้อมูลส่วนตัวได้ที่', 'About your data:')} <a href="#/privacy">${L('ความเป็นส่วนตัวและข้อมูลของคุณ', 'Privacy and your data')}</a></p>
${S ? '' : `<p><a class="btn" href="#/">${L('ไปหน้าเข้าใช้', 'Go to sign in')}</a></p>`}</article>`;
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
<p>${L(`ลบทุกเล่ม ทุกรูป ทุกคลิป ทุกเสียง ทุกข้อความ ลูกๆ ญาติ และการเตือน ออกจากเซิร์ฟเวอร์และที่เก็บไฟล์ทันที กู้คืนไม่ได้ (ยกเว้นจากสำเนาที่คุณดาวน์โหลดไว้เอง) เล่มที่มากับแอปจะกลับมาว่างเปล่า`, `Removes every book, photo, video clip, voice clip and word, the children, the relatives’ groups and the reminders from the server and the file store at once. It cannot be undone (except from a copy you downloaded yourself). The books that come with the app return empty.`)}</p>
<label class="vgl">${L(`พิมพ์ชื่อแอป “${esc(app)}” เพื่อยืนยัน`, `Type the app’s name, “${esc(app)}”, to confirm`)}<input id="erasetxt" class="field" value="${esc(eraseTyped)}" autocomplete="off" data-draft="erase"></label>
<p id="erasemsg" class="label"></p>
<button type="button" class="btn danger" data-a="erase" ${eraseTyped.trim() === app ? '' : 'disabled'}>${L('ลบข้อมูลทั้งหมดของครอบครัวนี้', 'Delete all of this family’s data')}</button></div>`;
  return `<article class="privacy">${pageHead('privacy', PG.blue, L('ความเป็นส่วนตัว', 'Privacy'), L('ความเป็นส่วนตัวและข้อมูลของคุณ', 'Privacy and your data'), L(`${esc(app)} เป็นสมุดความทรงจำส่วนตัวของครอบครัวเดียว ทำงานบนเซิร์ฟเวอร์ของครอบครัวนั้นเอง ไม่มีโฆษณา ไม่มีการติดตาม และไม่ขายข้อมูลใครทั้งสิ้น`, `${esc(app)} is one family’s private memory book, running on that family’s own server. No ads, no tracking, and nobody’s data is ever sold.`))}
${sec('ใครดูแลข้อมูล', 'Who looks after the data', who + `<p>${L('พ่อแม่ที่ถือรหัสครอบครัวเป็นคนตัดสินใจว่าจะบันทึกอะไร ใครเห็น และจะลบเมื่อไร ข้อมูลของเด็กถูกบันทึกโดยผู้ปกครองของเด็กเท่านั้น', 'The parents who hold the family PIN decide what is recorded, who sees it and when it is deleted. Children’s data is entered only by their own parents or guardians.')}</p>`)}
${sec('เก็บอะไรบ้าง', 'What is kept', ul([
  ['ชื่อเล่น เดือนและปีเกิดของลูก และตัวการ์ตูนที่เลือก', 'The children’s nicknames, month and year of birth, and the characters chosen for them'],
  ['รูป เสียง และภาพวาดที่พ่อแม่อัปโหลด (ตำแหน่ง GPS และข้อมูลกล้องถูกลบออกก่อนเก็บ)', 'Photos, voice clips and drawings the parents upload (GPS and camera data are stripped before storing)'],
  ['คลิปวิดีโอ (ไม่เกิน 30 วินาที): ทำเป็นไฟล์ใหม่ขนาดเล็ก ตำแหน่งที่ถ่าย รุ่นโทรศัพท์ และข้อมูลแฝงทั้งหมดถูกลบออกก่อนเก็บ', 'Video clips (up to 30 s): made into a new, smaller file; where it was filmed, the phone model and every other hidden detail are removed before storing'],
  ['ข้อความที่พิมพ์: คำพูดเด็ก โน้ต อารมณ์ ครั้งแรก รีวิว ค่าใช้จ่าย จดหมาย', 'Words the parents type: the kids’ quotes, notes, moods, firsts, reviews, spending, letters'],
  ['หัวใจและข้อความสั้นจากญาติ', 'Hearts and short messages from relatives'],
  ['รหัสของญาติ เก็บเป็นค่าที่อ่านคืนไม่ได้ · รหัสครอบครัวไม่ได้เก็บในฐานข้อมูล', 'Relatives’ PINs, stored only as one-way hashes · the family PIN is not stored in the database'],
  ['รูปที่ญาติส่งมา: เก็บแยกไว้ (ลบข้อมูลกล้องและตำแหน่งแล้ว) จนกว่าพ่อแม่จะเลือกใส่ในเล่ม ถ้าไม่เอาจะลบทิ้งทันที', 'Photos the relatives send: kept apart (camera data and position removed) until a parent puts one in the book; turned away, they are deleted at once'],
  ['มือถือที่เข้าระบบ: ชื่อที่พิมพ์ตอนเข้า ชนิดเครื่องสองคำ (เช่น ไอโฟน ซาฟารี) และเวลาที่ใช้ล่าสุด เพื่อให้พ่อแม่สั่งเครื่องที่หายให้ออกได้', 'Phones signed in: the name typed at sign-in, the kind of phone in two words (e.g. iPhone Safari) and when it was last used, so the parents can sign a lost one out'],
  ['เข้าด้วยลายนิ้วมือหรือใบหน้า: เก็บเฉพาะกุญแจครึ่งสาธารณะของเครื่อง ชื่อผู้เพิ่ม ชนิดเครื่อง และเวลาใช้ล่าสุด ลายนิ้วมือและใบหน้าไม่เคยออกจากโทรศัพท์', 'Signing in with a fingerprint or face: only the public half of the phone’s key, who added it, the kind of phone and when it was last used — a fingerprint or face never leaves the phone'],
  ['ข้อความใต้รูป: ชื่อที่ผู้เขียนพิมพ์และข้อความสั้นๆ ลบได้ทุกเมื่อ ลบไปพร้อมรูป', 'Notes under photos: the name the writer typed and the short note — removable any time, and gone with the photo'],
  ['ปัญหาบนเซิร์ฟเวอร์: ชนิดของคำขอที่ล้มเหลวหรือช้า (ตัดรหัสของทุกสิ่งออก) และข้อความของปัญหา เก็บ 30 วัน ไม่มีชื่อ ข้อความที่เขียน หรือเนื้อหาคำขอ', 'Problems on the server: the kind of request that failed or was slow (every id masked) and the problem’s message — kept 30 days; no names, nothing written, no request bodies'],
  ['จดหมายเปิดในอนาคต: เก็บบนเซิร์ฟเวอร์ ปิดผนึกแล้วไม่ส่งไปที่ไหนจนถึงวันเปิด อยู่ในสำเนาของครอบครัว', 'Letters for the future: kept on the server; once sealed they go nowhere until their day; in the family’s copy'],
  ['ปัญหาที่แอปสะดุดบนมือถือ: ข้อความของปัญหา ไฟล์และบรรทัด รุ่นแอป ชนิดหน้า และชนิดเครื่อง เก็บ 30 วัน ไม่มีชื่อ ข้อความที่เขียน รูป หรือตำแหน่ง', 'When the app trips on a phone: the problem’s message, the file and line, the app version, the kind of page and of phone — kept 30 days, with no names, nothing written, no photos or position'],
  ['ที่อยู่สำหรับส่งการเตือนของเครื่องที่เปิดเตือน และจำนวนครั้งที่ใช้ผู้ช่วยต่อวัน', 'The push address of each phone that turned reminders on, and how many times a day the helper was used'],
  ['ไม่เก็บ: ตำแหน่งของโทรศัพท์ รายชื่อผู้ติดต่อ ข้อมูลการจอง เลขหนังสือเดินทาง หรือประวัติการใช้งาน', 'Not kept: the phone’s location, contacts, booking details, passport numbers, or usage analytics']]))}
${sec('เก็บไว้ที่ไหน นานแค่ไหน', 'Where, and for how long', ul([
  ['บนเซิร์ฟเวอร์และที่เก็บไฟล์ที่ตั้งขึ้นสำหรับครอบครัวนี้โดยเฉพาะ (Railway) ไม่ปนกับครอบครัวอื่น', 'On a server and a file store set up for this family alone (hosted on Railway), never shared with another family'],
  ['รูปไม่มีลิงก์สาธารณะ เปิดได้เฉพาะคนที่เข้าสู่ระบบหรือถือลิงก์ของญาติ ทุกหน้าสั่งไม่ให้เครื่องมือค้นหาเก็บ', 'Photos have no public link: only someone signed in or holding a relatives’ link can open them; every page tells search engines to stay away'],
  ['เก็บจนกว่าพ่อแม่จะลบ · สำเนาอัตโนมัติเก็บไว้ 30 วัน (รายคืนช่วงมีทริป) และ 90 วัน (รายสัปดาห์)', 'Kept until the parents delete it · automatic backups are kept 30 days (nightly around a trip) and 90 days (weekly)'],
  ['สำเนาในเครื่องของคุณ (สำหรับใช้ตอนไม่มีเน็ต) ถูกล้างเมื่อออกจากระบบ', 'The copy on your own phone (for no-signal days) is cleared when you sign out']]))}
${sec('ใครอื่นเห็นบ้าง', 'Who else ever sees it', ul([
  ['ญาติที่พ่อแม่ให้รหัสหรือลิงก์: เห็นเฉพาะเล่มที่ติ๊กไว้ ดูอย่างเดียว ส่งหัวใจ เขียนใต้รูป และส่งรูปให้พ่อแม่เลือกได้ · เปิดรับแจ้งเตือนตอนค่ำว่ามีรูปใหม่กี่รูปได้ (ไม่มีรูปหรือชื่อในแจ้งเตือน)', 'Relatives the parents give a PIN or link: only the books ticked for them, read-only — hearts, notes under photos and photos for the parents to choose are allowed · they may get an evening note of how many new photos there are (no photo or name in it)'],
  ['ผู้ช่วย (Anthropic) เฉพาะเมื่อพ่อแม่กดขอ เช่น นิทาน สรุปวัน แปลภาษา: ส่งเฉพาะข้อความ ไม่ส่งรูป ไม่เก็บไว้ฝึกโมเดล', 'The helper (Anthropic), only when a parent presses for it — a story, the day in brief, a translation: words only, never photos, not used to train models'],
  ['“วางแผนกับผู้ช่วย” เฉพาะเมื่อพ่อแม่กดเอง: ส่งคำตอบในหน้านั้น เส้นทาง อายุของลูก และบทเรียนจากทริปก่อนๆ ที่พ่อแม่เก็บไว้ในสมุดโน้ต (ข้อความเท่านั้น) ไม่ส่งชื่อลูก รูป หรือความทรงจำของวันต่างๆ เลขจองที่พิมพ์มาถูกตัดออกก่อน · เบอร์ฉุกเฉินและวีซ่ามาจากตารางที่ตรวจแล้วของแอป · แผนที่ยังไม่ได้เขียนเป็นเล่ม (ไม่เกิน 8 แผน) เก็บไว้บนเซิร์ฟเวอร์ของครอบครัวให้พ่อแม่เปิดได้ทั้งสองเครื่อง ลบได้จากหน้านั้น', '“Plan with the helper”, only when a parent presses for it: the answers on that page, the route, the children’s ages and the lessons from past trips the parents kept in the notebook (words only) — never their names, photos or the days’ memories; a booking number typed in is removed first · emergency numbers and visa rules come from the app’s checked table · plans not yet written as a book (eight at most) are kept on the family’s server so both parents can open them, and can be deleted on that page'],
  ['“เช็กร้านและที่เที่ยวบนเว็บ” เฉพาะเมื่อพ่อแม่กดเอง: ส่งแค่ชื่อร้านหรือที่เที่ยวกับที่อยู่บนแผนที่ ให้ผู้ช่วยค้นเว็บ ไม่มีชื่อลูก ที่พัก หรือข้อมูลครอบครัว', '“Check the places on the web”, only when a parent presses for it: each place’s name and map address go to the helper, which searches the web — never the children’s names, the stays or anything about the family'],
  ['“คลังร้านอาหาร”: ร้านจากเล่มของครอบครัวเก็บไว้ที่เซิร์ฟเวอร์ของครอบครัวเอง · “ให้ผู้ช่วยหาร้าน” เฉพาะเมื่อพ่อแม่กดเอง: ส่งแค่ชื่อเมือง ให้ผู้ช่วยค้นเว็บ ไม่มีข้อมูลครอบครัว', 'The library of places to eat: the places from the family’s own books, kept on the family’s server · “ask the helper to find places”, only when a parent presses for it: just the town’s name, for a web search — nothing about the family'],
  ['“ให้ผู้ช่วยดูรูปวันนี้” เฉพาะเมื่อเปิดใช้และกดเอง: ส่งรูปย่อของวันนั้นครั้งเดียว ไม่เก็บ', '“Look at today’s photos”, only when switched on and pressed: that day’s small thumbnails, once, not stored'],
  ['วาดตัวการ์ตูนจากรูปลูก (OpenAI) เฉพาะเมื่อพ่อแม่อัปโหลด: รูปถูกย่อ ส่งครั้งเดียว และไม่เก็บที่ไหน', 'Drawing a character from a child’s photo (OpenAI), only when a parent uploads one: shrunk, sent once, stored nowhere'],
  ['พยากรณ์อากาศ (Open-Meteo): ส่งเฉพาะพิกัดระดับเมืองของที่พักในแผน ไม่ใช่ตำแหน่งโทรศัพท์', 'The weather forecast (Open-Meteo): only the town-level location of the planned stay, never the phone’s position'],
  ['คลิปสรุปทริป: ทำบนเซิร์ฟเวอร์ของเราจากรูปและคลิปในเล่ม เก็บไว้กับเล่ม ดูได้เฉพาะคนที่เห็นเล่มนี้ ไม่ส่งไปที่อื่น เพลงในคลิปเราแต่งเอง', 'The trip film: made on our own server from the book’s photos and clips, kept with the book, seen only by those who may see the book, sent nowhere else; its tune is our own'],
  ['เล่มจากรูป: เครื่องของคุณดูรูปเองก่อนส่ง แยกภาพซ้ำ ภาพหน้าจอ และรูปใบเสร็จหรือเอกสาร (อาจมีเลขบัตรหรือเลขจอง) พักไว้ ไม่ส่งขึ้นเล่ม เว้นแต่พ่อแม่แตะเอากลับ · การเลือกรูปเด่นดูว่ามีหน้าคนในรูปไหม บนเครื่องเท่านั้น ไม่จำหน้าใคร', 'A book from photos: your phone looks at the photos before anything is sent and sets aside repeats, screenshots and photos of receipts or papers (they may show a card or a booking number) — they are not sent unless a parent brings one back · picking the best photos looks for faces in them, on the phone only, and recognises no one'],
  ['ชื่อสถานที่ของรูป: ตามปกติเครื่องของคุณหาชื่อเองจากรายชื่อสถานที่ (GeoNames) ไม่ส่งตำแหน่งไปไหน · ถ้าพ่อแม่เปิด “ชื่อสถานที่ละเอียดจากแผนที่ออนไลน์” จะส่งตำแหน่งแบบคร่าวๆ (ราวหนึ่งกิโลเมตร) ไปถาม OpenStreetMap ผ่านเซิร์ฟเวอร์ของเรา ไม่ส่งรูปหรือชื่อใคร ไม่เก็บไว้', 'Place names for photos: normally your phone finds the name itself from a list of places (GeoNames) and sends the position nowhere · if a parent turns on “finer place names from an online map”, a rough position (about a kilometre) goes to OpenStreetMap through our server — no photo, no one’s name, nothing kept'],
  ['การเตือน: ผ่านบริการแจ้งเตือนของเครื่อง (Apple, Google) ส่งเฉพาะข้อความจากแผน ไม่มีรูปหรือชื่อ', 'Reminders: through the phone’s own push service (Apple, Google), carrying the plan’s words only, no photos or names']]))}
${sec('ภาพและเสียงในแอป', 'Pictures and sounds in the app', `<p>${L('ภาพวาดในโหมดเด็กวาดขึ้นสำหรับแอปนี้ เสียงสัตว์ในเกมฟาร์มส่วนใหญ่มาจาก Wikimedia Commons (สาธารณสมบัติหรือ CC0)', 'The kid-mode pictures were painted for this app. Most of the farm game’s animal voices come from Wikimedia Commons (public domain or CC0).')}</p>
<ul class="pvl"><li>${L('ชื่อสถานที่: จาก', 'Place names: from')} <a href="https://www.geonames.org/" target="_blank" rel="noopener">GeoNames</a> ${L('สัญญาอนุญาต', 'licensed')} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a></li><li>${L('แผนที่ของครอบครัว: แผ่นดินจาก', 'The family map: the land from')} <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> ${L('(สาธารณสมบัติ)', '(public domain)')}</li><li>${L('การหาหน้าในรูป: ', 'Finding faces in photos: ')}<a href="https://github.com/nenadmarkus/pico" target="_blank" rel="noopener">pico</a> (MIT, Nenad Markuš)</li><li>${L('เสียงหมา: ตัดจาก', 'The dog’s bark: cut from')} <a href="https://commons.wikimedia.org/wiki/File:Barking_of_a_dog.ogg" target="_blank" rel="noopener">“Barking of a dog”</a> ${L('โดย Amada44 สัญญาอนุญาต', 'by Amada44, licensed')} <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a> ${L('คลิปที่ตัดแล้วเผยแพร่ภายใต้สัญญาอนุญาตเดียวกัน', '— the trimmed clip is shared under the same licence')}</li></ul>`)}
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
/* ---------- plan with the helper (#/planner, docs/AI-PLANNER.md): a few questions → the route (one call, read and changed here) →
   "write the whole book" runs the import's job from a brief; the draft is checked and shelved on #/import like an imported one.
   Only the answers, the route and the children's ages go to the helper (server/planner.js). */
let pln = { a: null, route: null, alts: null, ideas: null, info: null, busy: '', err: '', ask: '', id: '', at: 0, plans: null, prev: null, open: false, edit: -1, geo: null };
const PL_OPTS = {
  pace: [['slow', '🐢', 'สบายๆ', 'Slow', 'วันละที่หลัก พักกลางวันได้', 'One main thing a day, room for naps'], ['normal', '🚶', 'ปกติ', 'Normal', 'ที่หลักกับที่เล็กอีกหนึ่ง', 'A main thing and a small one'], ['full', '🏃', 'เต็มวัน', 'Full', 'เที่ยวเยอะ แต่ยังให้งีบได้', 'Busy days, naps still fit']],
  move: [['transit', '🚆', 'รถสาธารณะ', 'Transit', 'รถไฟ รถเมล์ แท็กซี่', 'Trains, buses, taxis'], ['car', '🚗', 'เช่ารถ', 'A hire car', 'ขับเองทั้งทริป', 'We drive ourselves'], ['mix', '🔀', 'ผสม', 'A mix', 'ส่วนใหญ่รถสาธารณะ', 'Mostly transit']],
  budget: [['low', '🪙', 'ประหยัด', 'Careful', 'ที่ฟรีและราคาย่อมเยา', 'Free and low-cost'], ['mid', '💳', 'กลางๆ', 'Middle', 'ตามสบาย ไม่หรูมาก', 'Comfortable, not lavish'], ['high', '💎', 'สบายเต็มที่', 'Comfortable', 'จ่ายเพื่อความง่าย', 'Pay for ease']],
};
// what the family likes and needs: chips instead of typing (the keys are server/planner.js LIKES / NEEDS)
// the planner's likes and needs are the family's style table (public/tags.js), so a plan, #/taste and the libraries speak one language
// a painted picture per style (E6, the house style; the owner approved the sample, Nov 2026): our own under /art/taste, else the games'
// and food library's picture of the same thing; a style without one keeps its emoji
const TASTE_PIC = {
  local: 'taste/local', noodle: 'food/noodles', rice: 'food/rice', seafood: 'food/prawn', grill: 'food/skewer', sweet: 'food/cakeslice',
  court: 'taste/court', buffet: 'taste/buffet', veg: 'food/salad', halal: 'taste/halal', familiar: 'food/pizza',
  animals: 'game/elephant', aquarium: 'game/reeffish', sea: 'taste/sea', nature: 'game/pine', park: 'taste/park', play: 'game/balloon',
  museum: 'taste/museum', train: 'game/train', snow: 'taste/snow', farm: 'game/strawberry', food: 'taste/food', shop: 'taste/shop',
  culture: 'taste/culture', onsen: 'taste/onsen', views: 'taste/views', show: 'taste/show',
  pram: 'taste/pram', nap: 'taste/nap', walk: 'taste/walk', drive: 'game/car', mild: 'taste/mild', crowd: 'taste/crowd', early: 'taste/early',
};
const tPic = (r) => (TASTE_PIC[r[0]] ? `<img class="tpic" src="/art/${TASTE_PIC[r[0]]}.webp" alt="" draggable="false">` : emo(r[1]));
const PL_LIKES = TASTE_OUT.map((r) => r.slice(0, 4));
const PL_NEEDS = TASTE_NEED;
// changes parents ask for most, one tap each (the words go to the helper as the ask)
const PL_ASKS = [['ช้าลงอีก', 'Slower', 'ทำให้ทั้งทริปช้าลง วันละที่หลักที่เดียว', 'Make the whole trip slower: one main thing a day'], ['เพิ่มวันพัก', 'A rest day', 'เพิ่มวันพักสบายๆ ตรงกลางทริป', 'Add an easy rest day in the middle'], ['ย้ายที่พักน้อยลง', 'Fewer hotel moves', 'ย้ายที่พักให้น้อยลง', 'Fewer hotel changes'],
  ['เพิ่มที่สำหรับเด็กเล็ก', 'More for little ones', 'เพิ่มที่ที่เด็กเล็กสนุก', 'More places small children enjoy'], ['ประหยัดลง', 'Cheaper', 'ทำให้ประหยัดลง', 'Make it cheaper'], ['เดินทางสั้นลง', 'Shorter legs', 'ทำให้การเดินทางแต่ละช่วงสั้นลง', 'Make each leg shorter']];
const PL_POP = ['Tokyo', 'Osaka', 'Hokkaido', 'Seoul', 'Taipei', 'Hong Kong', 'Singapore', 'Da Nang', 'Bali', 'Sydney', 'Chiang Mai', 'Phuket'];
const plAdd = (iso, n) => new Date(Date.parse(iso) + n * 864e5).toISOString().slice(0, 10);
const plDays = (a) => (a.from && a.to && a.to >= a.from ? Math.round((Date.parse(a.to) - Date.parse(a.from)) / 864e5) + 1 : 0);
const plSpan = (n) => (n > 1 ? L(`${n} วัน ${n - 1} คืน`, `${n} days, ${n - 1} nights`) : n === 1 ? L('ไปเช้าเย็นกลับ', 'A day trip') : '');
const plNorm = (x) => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');   // accents and spaces never count (zurich = Zürich, newyork = New York)
// the library's towns and countries (GET /api/b/geo): pictures and colours for the places the plan names
// the library's places for the planner's suggestions: asked once; an empty answer (no signal, a failed ask) is asked again a few
// seconds later (it used to stay empty for the whole visit — owner's Samsung, Nov 2026: "ทำไม USA ยังไม่ขึ้น"); when it arrives the
// suggestion row is filled in place, because the parent is usually typing in "where to" and a render would be skipped (safeRender)
function plGeo() {
  if (pln.geo === null) {
    pln.geo = false;
    snapGeo().then((g) => {
      if (g && (g.places || []).length) {
        pln.geo = g;
        const sg = document.getElementById('plsug'); if (sg) sg.innerHTML = plSugHtml((pln.a || {}).dest || '');
        const pw = document.getElementById('plwhere'); if (pw && pln.a) pw.innerHTML = plWhereHtml(pln.a);
        if (route().parts[0] === 'planner') safeRender();
      } else if ((pln.geoTry = (pln.geoTry || 0) + 1) < 5) setTimeout(() => { if (pln.geo === false) { pln.geo = null; if (route().parts[0] === 'planner') plGeo(); } }, 3000 * pln.geoTry);
    });
  }
  return pln.geo || null;
}
function plPlaceOf(name) {
  const g = plGeo(); if (!g) return null;
  const en = plNorm(name && name.en !== undefined ? name.en : name), th = plNorm(name && name.th !== undefined ? name.th : name);
  if (!en && !th) return null;
  const hit = (p) => { const s = snapShort(p.name), pe = plNorm(s.en), pt = plNorm(s.th); return (en && pe === en) || (th && pt === th); };
  return g.places.find(hit) || g.places.find((p) => { const s = snapShort(p.name), pe = plNorm(s.en), pt = plNorm(s.th); return (en.length > 3 && pe.length > 3 && (pe.includes(en) || en.includes(pe))) || (th.length > 3 && pt.length > 3 && (pt.includes(th) || th.includes(pt))); }) || null;
}
// suggestions under "where to" (owner, Nov 2026: "ทำไมยังมีไม่ครบทุกประเทศ" — "Usa" offered Busan): what is typed is matched against
// each place's names AND its other names (USA, อเมริกา, Holland…) from the start of a word, never from the middle of an English word;
// a country that fits brings its towns after it; every other country of the world comes from the phone's own names (Intl.DisplayNames,
// a flag in place of a stamp) — the helper plans anywhere, the library only adds pictures. Nothing typed: a few favourites.
const PL_WORLD = 'ADAEAFAGALAMAOARATAUAZBABBBDBEBFBGBHBIBJBNBOBRBSBTBWBYBZCACDCFCGCHCICLCMCNCOCRCUCVCYCZDEDJDKDMDODZECEEEGERESETFIFJFMFRGAGBGDGEGHGMGNGQGRGTGWGYHKHNHRHTHUIDIEILINIQIRISITJMJOJPKEKGKHKIKMKNKPKRKWKZLALBLCLILKLRLSLTLULVLYMAMCMDMEMGMHMKMLMMMNMOMRMTMUMVMWMXMYMZNANENGNINLNONPNRNZOMPAPEPGPHPKPLPSPTPWPYQARORSRURWSASBSCSDSESGSISKSLSMSNSOSRSSSTSVSYSZTDTGTHTJTLTMTNTOTRTTTVTWTZUAUGUSUYUZVAVCVEVNVUWSYEZAZMZW';
let plWorldC = null;
function plWorld() {
  if (plWorldC) return plWorldC;
  plWorldC = [];
  try {
    const en = new Intl.DisplayNames(['en'], { type: 'region' }), th = new Intl.DisplayNames(['th'], { type: 'region' });
    for (let i = 0; i < PL_WORLD.length; i += 2) { const cc = PL_WORLD.slice(i, i + 2); const n = { en: en.of(cc), th: th.of(cc) }; if (n.en && n.en !== cc) plWorldC.push({ cc: cc.toLowerCase(), n: { en: n.en, th: n.th && n.th !== cc ? n.th : n.en }, flag: String.fromCodePoint(...[...cc].map((c) => 0x1F1A5 + c.charCodeAt(0))) }); }
  } catch (_) { /* an old phone without the names: the library's places only */ }
  return plWorldC;
}
// how well a typed piece fits a list of names: 0 the whole name, 1 its start, 2 the start of one of its words, 3 inside Thai (no spaces); -1 no
// how far apart two short words are: insertions, deletions, changes and a swap of two letters side by side each cost 1 (tokio, hokaido)
function plEdit(a, b, max) {
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
/* how well what is typed fits a place's names (owner, Nov 2026: "ทำการค้นหาให้ flexible"): 0 the whole name, 1 its start, 2 the start of
   one of its words, 3 inside a Thai/Chinese name, 4–5 a slip of a letter or two (tokio, hokaido, barcellona, ซิดนีน) — accents and spaces
   never count (plNorm). Never the middle of an English word ("Usa" offered Busan). One letter only finds names that start with it. */
function plFit(q, names) {
  let best = -1;
  const slack = q.length >= 7 ? 2 : q.length >= 4 ? 1 : 0;
  for (const raw of names) {
    const low = String(raw || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(), n = plNorm(low); if (!n) continue;
    let s = -1;
    const words = low.split(/[\s\-–'’.,()&/]+/).filter(Boolean);
    if (n === q) s = 0; else if (n.startsWith(q)) s = 1;
    else if (q.length >= 2 && words.some((w) => plNorm(w).startsWith(q) || plNorm(low.slice(low.indexOf(w))).startsWith(q))) s = 2;
    else if (q.length >= 2 && /[\u0E00-\u0E7F\u4E00-\u9FFF]/.test(low) && n.includes(q)) s = 3;
    else if (slack) {
      // a slip: against the whole name, the name's start of the same length, or a word's start
      const d0 = plEdit(q, n, slack), d1 = Math.min(...[n.slice(0, q.length), ...words.map((w) => plNorm(w)).filter((w) => w.length >= 3).map((w) => w.slice(0, q.length))].map((t) => plEdit(q, t, slack)));
      if (d0 <= slack && d0 <= d1) s = 3 + d0; else if (d1 <= slack) s = 3.5 + d1;   // the whole name before a start of a word (seol → Seoul before Seogwipo)
    }
    if (s >= 0 && (best < 0 || s < best)) best = s;
  }
  return best;
}
function plSugHtml(v) {
  const g = plGeo(); if (!g) return '';
  const last = plNorm(String(v || '').split(/[,،、]/).pop()), has = plNorm(v), side = lang === 'en' ? 'en' : 'th';
  const towns = g.places.map((p) => ({ n: snapShort(p.name), art: p.art, c: p.c, cc: p.cc, al: p.al || [], home: p.home }));
  const libC = (g.countries || []).map((p) => ({ n: snapShort(p.name), art: p.art, c: p.c, cc: p.cc, al: p.al || [], land: 1 }));
  let list;
  if (last.length >= 1) {
    const inLib = new Set(libC.map((p) => p.cc)), hits = [];
    const add = (p, s, o) => { if (s >= 0) hits.push({ p, s, o }); };
    const nm = (p, al) => (last.length === 1 ? [p.n.en, p.n.th] : [p.n.en, p.n.th, ...(al || [])]);   // one letter: the shown names only
    libC.forEach((p) => { const s = plFit(last, nm(p, p.al)); add(p, s, 0); if (s >= 0 && s <= 1) towns.filter((t) => t.cc === p.cc && !t.home).slice(0, 6).forEach((t, k) => add(t, s + 0.5, k + 1)); });
    towns.forEach((p) => add(p, plFit(last, nm(p, p.al)), 1));
    plWorld().forEach((p) => { if (!inLib.has(p.cc)) add({ ...p, land: 1 }, plFit(last, [p.n.en, p.n.th]), 2); });   // the library's places first
    const seen = new Set();
    list = hits.sort((a, b) => a.s - b.s || a.o - b.o || a.p.n.en.length - b.p.n.en.length).map((h) => h.p).filter((p) => { const k = plNorm(p.n.en); if (seen.has(k)) return false; seen.add(k); return true; });   // one name once (Singapore the country and the town)
    // a place already written exactly as shown is not offered again; "newyork" still offers "New York" (a tap writes it properly)
    const raw = String(v || '').split(/[,،、]/).pop().trim().toLowerCase();
    list = list.filter((p) => String(p.n[side] || '').toLowerCase() !== raw);
  } else {
    list = PL_POP.map((x) => towns.find((p) => plNorm(p.n.en) === plNorm(x))).filter(Boolean).filter((p) => !has.includes(plNorm(p.n.en)) && !has.includes(plNorm(p.n.th)));
  }
  const typed = last.length >= 1 ? ' data-r="1"' : '';
  return list.slice(0, 10).map((p) => `<button type="button" class="plsg${p.land ? ' land' : ''}" data-a="plansug" data-v="${esc(p.n[side])}"${p.cc ? ` data-cc="${esc(p.cc)}"` : ''}${typed}${p.c ? ` style="--tc:${esc(p.c)}"` : ''}>${p.art ? `<img src="${esc(p.art)}" alt="" loading="lazy" draggable="false">` : p.flag ? `<span class="plflag" aria-hidden="true">${p.flag}</span>` : ''}<span>${esc(p.n[side])}</span></button>`).join('');
}
// the towns of a route in the order slept in: [{town, days, from}] — the same town twice in a row is one stay
function plStays(rt) {
  const out = [];
  rt.days.forEach((d, i) => { const k = plNorm(T(d.town)), last = out[out.length - 1]; if (last && last.k === k) last.n++; else out.push({ k, town: d.town, n: 1, i }); });
  return out;
}
const plTownCol = (rt) => { const seen = {}; let n = 0; return rt.days.map((d) => { const k = plNorm(T(d.town)); if (!(k in seen)) { const p = plPlaceOf(d.town); seen[k] = (p && p.c) || snapPal(n); n++; } return seen[k]; }); };
// the route as words, for the other parent (the share sheet or the clipboard)
function plText(rt) {
  return [`${T(rt.title)} · ${fmtRange({ date_from: rt.from, date_to: rt.to })}`, ...rt.days.map((d, i) => `${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)} (${fmtDay(d.date, { weekday: 'short', day: 'numeric', month: 'short' })}) ${d.emoji || ''} ${T(d.title)}${d.stops && d.stops.length ? ` — ${d.stops.map((x) => T(x)).join(', ')}` : ''} · ${L('นอน', 'sleep')}: ${T(d.sleep) || T(d.town)}`)].join('\n');
}
// the planner's questions as pages (owner, Nov 2026: "UIUX แบบนี้จะยาวและใช้งานยาก … แยกเป็นหลายหน้า"): one question a page, a row of
// numbered dots on top (each a link), "back" and a big "next"; the last page holds the buttons that ask for the route. A jump to the
// route is offered from the second page on, once the family has said where.
const PL_Q = [['where', '📍', 'ไปไหน', 'Where'], ['when', '📅', 'เมื่อไร', 'When'], ['who', '👨‍👩‍👧', 'ใครไป', 'Who'], ['style', '🎒', 'แบบไหน', 'How'], ['more', '📝', 'เพิ่มเติม', 'Extras']];
function plWizard(qs, pages, go, hasDest) {
  const k = Math.max(0, PL_Q.findIndex((q) => q[0] === qs)), q = PL_Q[k], last = k === PL_Q.length - 1;
  const dots = `<nav class="plqs" aria-label="${L('คำถาม', 'Questions')}">${PL_Q.map((x, j) => `<a class="plqd${j === k ? ' now' : j < k ? ' done' : ''}" href="#/planner/${x[0]}"${j === k ? ' aria-current="step"' : ''}><i>${j < k ? '✓' : j + 1}</i><span>${L(x[2], x[3])}</span></a>`).join('')}</nav>`;
  const prev = k ? `<a class="btn ghost plback" href="#/planner/${PL_Q[k - 1][0]}">‹ ${L('ย้อน', 'Back')}</a>` : '<span></span>';
  const next = last ? '' : `<a class="btn plnext" href="#/planner/${PL_Q[k + 1][0]}">${L('ถัดไป', 'Next')} ›</a>`;
  const skip = !last && k && hasDest ? `<button type="button" class="linkbtn plskip" data-a="planroute">${L('ข้ามไปขอเส้นทางเลย', 'Skip to the route')} ›</button>` : '';
  return `${dots}<div class="plqpage" data-q="${q[0]}">${pages[q[0]]}</div>${last ? go : `<div class="row plnav">${prev}${next}</div>${skip}`}${last ? `<div class="row plnav">${prev}<span></span></div>` : ''}`;
}
// what our past books suggest for the next plan: the towns we went to (again), other towns of the countries we went to, how long
// our trips ran and the month we usually go — read on the phone from the books' titles and dates, nothing is sent
/* "where to", country first (owner, Nov 2026: "เลือกประเทศก่อนได้ไหม แล้วค่อยเป็นเมือง"): the library's countries as cards (ours first,
   then the popular ones, the rest behind "every country"); a tap opens that country's towns as cards — several may be ticked —
   and "the whole country, the helper picks the towns". Typing still works under it, and a typed town opens its country. The
   answer stays the one text in "where to" (pln.a.dest), so the route, the plans kept and the helper read it as before. */
const PL_CC_POP = ['jp', 'kr', 'tw', 'hk', 'mo', 'sg', 'my', 'vn', 'th', 'id', 'au', 'nz', 'cn', 'ae', 'gb', 'fr', 'ch', 'it', 'es', 'de', 'nl', 'us'];
function plParts(dest) { return String(dest || '').split(/[,،、]/).map((x) => plNorm(x)).filter(Boolean); }
function plBeenCc() {   // the countries of our own books (titles, places of a book from photos), by the library's town names
  const g = plGeo(); if (!g) return new Set();
  const text = (S && S.trips || []).map((t) => [t.title && t.title.en, t.title && t.title.th, ...(((t.theme || {}).snap || {}).places || []).map((x) => (x && (x.en || x.th)) || x)].filter(Boolean).join(' ')).join(' | ').toLowerCase();
  const set = new Set();
  for (const p of g.places) if (!p.home && [snapShort(p.name).en, snapShort(p.name).th, ...(p.al || [])].some((n) => String(n || '').length >= 4 && text.includes(String(n).toLowerCase()))) set.add(p.cc);
  return set;
}
function plWhereHtml(a) {
  const g = plGeo(); if (!g) return '';
  const side = lang === 'en' ? 'en' : 'th', parts = plParts(a.dest), been = plBeenCc();
  const inDest = (n) => [plNorm(n.en), plNorm(n.th)].some((k) => k && parts.includes(k));
  const cs = (g.countries || []).map((c) => ({ ...c, n: snapShort(c.name), towns: g.places.filter((p) => p.cc === c.cc) })).filter((c) => c.cc && c.towns.length);
  const picked = new Set(cs.filter((c) => inDest(c.n) || c.towns.some((p) => inDest(snapShort(p.name)))).map((c) => c.cc));
  const rank = (c) => (picked.has(c.cc) ? 0 : been.has(c.cc) ? 1 : PL_CC_POP.includes(c.cc) ? 2 + PL_CC_POP.indexOf(c.cc) / 100 : 3);
  cs.sort((x, y) => rank(x) - rank(y) || x.n[side].localeCompare(y.n[side], side));
  if (pln.cc === undefined && picked.size === 1) pln.cc = [...picked][0];   // a plan that already names towns of one country opens on them
  const cur = cs.find((c) => c.cc === pln.cc);
  const card = (attrs, pic, c, name, sub, on, cls = '') => `<button type="button" class="plcard${cls}" ${attrs} aria-pressed="${!!on}"${c ? ` style="--tc:${esc(c)}"` : ''}><span class="plcp">${pic ? `<img src="${esc(pic)}" alt="" loading="lazy" draggable="false">` : '🧭'}</span><b>${esc(name)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</button>`;
  if (!cur) {
    const show = pln.allcc ? cs : cs.slice(0, 12);
    return `<div class="part pickh">${L('1 · เลือกประเทศ', '1 · Pick a country')}</div>
<div class="plcards">${show.map((c) => card(`data-a="plancc" data-v="${esc(c.cc)}"`, c.art, c.c, c.n[side], picked.has(c.cc) ? L('เลือกไว้แล้ว', 'Picked') : been.has(c.cc) ? L('เคยไป', 'We have been') : L(`${c.towns.length} เมือง`, `${c.towns.length} town${c.towns.length === 1 ? '' : 's'}`), picked.has(c.cc))).join('')}</div>
${cs.length > 12 ? `<button type="button" class="linkbtn plallcc" data-a="planallcc">${pln.allcc ? L('ย่อรายการ', 'Fewer') : L(`ดูทุกประเทศ (${cs.length})`, `Every country (${cs.length})`)}</button>` : ''}`;
  }
  const whole = inDest(cur.n);
  return `<div class="plcty"><button type="button" class="plback" data-a="plancc" data-v="">‹ ${L('ประเทศอื่น', 'Other countries')}</button><span class="plctyn">${cur.art ? `<img src="${esc(cur.art)}" alt="" draggable="false">` : ''}<b>${esc(cur.n[side])}</b></span></div>
<div class="part pickh">${L('2 · เลือกเมือง เลือกได้หลายเมือง', '2 · Pick towns — as many as you like')}</div>
<div class="plcards">${card(`data-a="plantown" data-v="${esc(cur.n[side])}" data-whole="1"`, cur.art, cur.c, L(`ทั่ว${cur.n.th}`, `All of ${cur.n.en}`), L('ให้ผู้ช่วยเลือกเมืองให้', 'The helper picks the towns'), whole, ' whole')}${cur.towns.map((p) => { const n = snapShort(p.name); return card(`data-a="plantown" data-v="${esc(n[side])}" data-cc="${esc(cur.cc)}"`, p.art, p.c || cur.c, n[side], '', inDest(n)); }).join('')}</div>`;
}
function plHist() {
  const g = plGeo(), trips = (S && S.trips || []).filter((t) => t.date_from && t.date_to);
  const out = { html: '', len: 0, mon: null };
  if (!trips.length) return out;
  const days = trips.map((t) => Math.round((Date.parse(t.date_to) - Date.parse(t.date_from)) / 864e5) + 1).filter((n) => n > 0 && n < 40).sort((x, y) => x - y);
  if (days.length) out.len = days[Math.floor((days.length - 1) / 2)];   // the lower middle: two trips of 6 and 16 days say 6
  const mc = {}; for (const t of trips) { const m = +t.date_from.slice(5, 7); mc[m] = (mc[m] || 0) + 1; }
  const top = Object.entries(mc).sort((x, y) => y[1] - x[1])[0];
  if (top && top[1] >= 2) { const d = new Date(2030, +top[0] - 1, 1); out.mon = { th: d.toLocaleDateString('th-TH', { month: 'long' }), en: d.toLocaleDateString('en-GB', { month: 'long' }) }; }
  if (!g) return out;
  const text = trips.map((t) => [T(t.title), t.title && t.title.en, t.title && t.title.th, t.sub && (t.sub.en || ''), t.sub && (t.sub.th || ''), ...(((t.theme || {}).snap || {}).places || []).map((p) => (p && (p.en || p.th)) || p)].filter(Boolean).join(' ')).join(' | ').toLowerCase();
  const seen = (p) => [snapShort(p.name).en, snapShort(p.name).th, ...(p.al || [])].some((n) => String(n || '').length >= 4 && text.includes(String(n).toLowerCase()));
  const been = g.places.filter((p) => !p.home && seen(p)), ccs = new Set(been.map((p) => p.cc));
  const fresh = g.places.filter((p) => !p.home && ccs.has(p.cc) && !been.includes(p)).slice(0, 6);
  const chip = (p) => { const n = snapShort(p.name)[lang === 'en' ? 'en' : 'th']; return `<button type="button" class="plsg" data-a="plansug" data-v="${esc(n)}"${p.c ? ` style="--tc:${esc(p.c)}"` : ''}>${p.art ? `<img src="${esc(p.art)}" alt="" loading="lazy" draggable="false">` : ''}<span>${esc(n)}</span></button>`; };
  const part = (h, list) => (list.length ? `<div class="part pickh plhist">${h}</div><div class="plsug">${list.map(chip).join('')}</div>` : '');
  out.html = part(L('ไปที่เดิมอีกครั้ง', 'Somewhere we loved, again'), been.slice(0, 6)) + part(L('ที่ใหม่ในประเทศที่เคยไป', 'New towns in countries we know'), fresh);
  return out;
}
// the rough budget of a route (docs/BUDGET.md B1): a row a kind — the range in the money it is paid in, where it came from (the app's
// library or the helper's estimate) — the total per currency and ≈ ฿ with the rate typed on this phone (a rate box for each money without one)
const BUDGET_K = { flights: ['✈️', 'ตั๋วเครื่องบินไปกลับ', 'Return flights'], stay: ['🛏️', 'ที่พัก', 'Stays'], food: ['🍜', 'อาหาร', 'Food'], tickets: ['🎟️', 'ค่าเข้าที่เที่ยว', 'Tickets'], move: ['🚆', 'เดินทางในประเทศ', 'Getting around'] };
function plBudget(rt) {
  const b = rt && rt.budget; if (!b || !(b.lines || []).length) return '';
  const fx = fxRates(), rng = (lo, hi, cur) => (lo === hi ? fmtMoney(lo, cur) : `${fmtMoney(lo, cur)}–${hi.toLocaleString(lang === 'th' ? 'th-TH' : 'en-GB')}`);
  const baht = (lo, hi, cur) => { if (cur === 'THB' || !(+fx[cur] > 0)) return ''; const r = (v) => Math.round(v * fx[cur] / 100) * 100; return `<span class="prthb">≈ ${rng(r(lo), r(hi), 'THB')}</span>`; };
  const rows = b.lines.map((l) => { const k = BUDGET_K[l.k] || ['💸', l.k, l.k];
    const note = l.k === 'tickets' && l.n ? L(`${l.n} ที่จากคลัง`, `${l.n} places from the library`) : l.k === 'stay' && b.days > 1 ? L(`${b.days - 1} คืน`, `${b.days - 1} nights`) : l.k === 'food' ? L(`${b.days} วัน`, `${b.days} days`) : '';
    const src = l.src === 'past' ? L('จากที่เราจ่ายจริงทริปก่อน', 'From what we really spent before') : l.src === 'lib' ? L('จากราคาในคลังของแอป', 'From the app’s library prices') : L('ผู้ช่วยประมาณให้', 'The helper’s estimate');
    const was = l.past != null && l.src !== 'past' ? `<small class="plbpast">${L(`ทริปก่อนเราจ่ายจริง ≈ ${fmtMoney(l.past, l.cur)} ปรับให้แล้ว`, `Last time we really spent ≈ ${fmtMoney(l.past, l.cur)} — taken into account`)}</small>` : '';
    return `<li class="plbr"><span class="plbe" aria-hidden="true">${emo(k[0])}</span><span class="plbn"><b>${L(k[1], k[2])}</b><small>${[note, src].filter(Boolean).join(' · ')}</small>${was}</span><span class="plba"><b class="kf km">≈ ${rng(l.lo, l.hi, l.cur)}</b>${baht(l.lo, l.hi, l.cur)}</span></li>`; }).join('');
  const pastT = (b.past && b.past.trips || []).map((x) => (x.title ? esc(T(x.title)) : '')).filter(Boolean);
  const pastLine = pastT.length ? `<p class="plbwas">${emo('📒')} ${L(`เทียบกับที่เราจ่ายจริงใน ${pastT.join(', ')}`, `Compared with what we really spent on ${pastT.join(', ')}`)}</p>` : '';
  const tot = b.totals || [], all = tot.every((x) => x.cur === 'THB' || +fx[x.cur] > 0);
  const thb = all && tot.some((x) => x.cur !== 'THB') ? tot.reduce((n, x) => [n[0] + x.lo * (x.cur === 'THB' ? 1 : fx[x.cur]), n[1] + x.hi * (x.cur === 'THB' ? 1 : fx[x.cur])], [0, 0]).map((v) => Math.round(v / 1000) * 1000) : null;
  const unk = (b.unknown && (b.unknown.tickets || b.unknown.food)) ? `<p class="plbu">${[b.unknown.tickets ? L(`ค่าเข้าอีก ${b.unknown.tickets} ที่ยังไม่รู้ราคา ต้องเช็กเอง`, `${b.unknown.tickets} more places have no price yet — check them yourself`) : '', b.unknown.food ? L(`ค่าอาหาร ${b.unknown.food} วันยังไม่มีราคาในคลัง`, `Food for ${b.unknown.food} days has no library price yet`) : ''].filter(Boolean).join(' · ')}</p>` : '';
  const need = tot.map((x) => x.cur).filter((c) => c !== 'THB' && !(+fx[c] > 0));
  const rate = need.length ? `<div class="row fxrow plbfx">${need.map((c) => `<label class="fxf">1 ${esc(c)} =<input class="field" inputmode="decimal" data-fx="${esc(c)}" value="" aria-label="${esc(c)} → THB"> ${L('บาท', 'THB')}</label>`).join('')}</div><p class="label">${L('ใส่เรตแลกเงินเพื่อดูเป็นบาท · อยู่ในเครื่องนี้ ไม่ดึงจากเน็ต', 'Type a rate to see it in baht · kept on this phone · nothing is looked up online')}</p>` : '';
  return `<section class="plbudget pcard" style="--g1:${PG.lime}"><h4 class="pch">${emo('💰')} ${L('งบคร่าวๆ ทั้งทริป', 'A rough budget for the whole trip')}</h4>
${pastLine}<ul class="plbl">${rows}</ul>
<div class="plbt"><span>${L('รวมคร่าวๆ', 'Roughly in all')}</span><b>${tot.map((x) => `≈ ${rng(x.lo, x.hi, x.cur)}`).join(' + ')}</b>${thb ? `<b class="plbthb">≈ ${rng(thb[0], thb[1], 'THB')}</b>` : ''}</div>
${unk}${rate}<p class="plbq">${L('คร่าวๆ ไว้วางแผน ราคาเปลี่ยนได้ ยังไม่รวมของฝากและค่าใช้จ่ายส่วนตัว', 'Rough, for planning — prices change; souvenirs and personal spending not included')}</p></section>`;
}
function viewPlanner(qs) {
  // a new plan starts from what the family chose on #/taste (likes and needs), then what this phone kept of the plan in hand
  if (!pln.a) { const ft = famTaste(); pln.a = { dest: '', from: '', to: '', approx: '', len: 0, adults: 2, seniors: false, pace: 'slow', move: 'mix', budget: 'mid', stays: '', flights: '', want: '', avoid: '', likes: [...ft.out.like], needs: [...ft.needs], ...(ls('plan') || {}) }; pln.route = pln.route || ls('planRoute') || null; pln.id = ls('planId') || ''; pln.at = ls('planAt') || 0; }
  if (pln.info === null) { pln.info = 'loading'; api('GET', '/api/b/planner').then((r) => { pln.info = r; safeRender(); }, () => { pln.info = { on: false, left: 0, max: 0 }; safeRender(); }); }
  if (pln.plans === null) { pln.plans = []; api('GET', '/api/b/planner/plans').then((r) => { pln.plans = r.plans || []; planAdopt(); safeRender(); }, () => {}); }
  const a = pln.a, info = pln.info && typeof pln.info === 'object' ? pln.info : null, on = info ? info.on : !!S.features.story;
  if (!Array.isArray(a.likes)) a.likes = []; if (!Array.isArray(a.needs)) a.needs = [];
  const rt = pln.route, form = !rt || pln.open;
  const f = (k, th, en, ph, type = 'text', max = 200) => `<label class="vgl">${L(th, en)}<input class="field" id="pl${k}" data-pl="${k}" type="${type}" maxlength="${max}" value="${esc(a[k] == null ? '' : a[k])}"${ph ? ` placeholder="${esc(ph)}"` : ''}${k === 'dest' ? ' autocomplete="off"' : ''}></label>`;
  const tx = (k, th, en, ph, max) => `<label class="vgl">${L(th, en)}<textarea class="field" id="pl${k}" data-pl="${k}" rows="2" maxlength="${max}" placeholder="${esc(ph)}">${esc(a[k] || '')}</textarea></label>`;
  const opts = (k) => `<div class="tpk plopts" role="group">${PL_OPTS[k].map(([v, e, th, en, dth, den]) => `<button type="button" class="tpo" data-a="planopt" data-k="${k}" data-v="${v}" aria-pressed="${a[k] === v}"><span class="rme" aria-hidden="true">${emo(e)}</span><b>${L(th, en)}</b><small>${L(dth, den)}</small><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div>`;
  const chips = (k, list) => `<div class="plchips" role="group">${list.map(([v, e, th, en]) => `<button type="button" class="plchip" data-a="planchip" data-k="${k}" data-v="${v}" aria-pressed="${a[k].includes(v)}"><span aria-hidden="true">${tPic([v, e])}</span>${L(th, en)}</button>`).join('')}</div>`;
  const nd = plDays(a) || (a.from ? 0 : a.len), kids = children();
  const lens = `<div class="plchips pllens" role="group" aria-label="${L('กี่วัน', 'How many days')}">${[3, 4, 5, 6, 7, 10, 14].map((n) => `<button type="button" class="plchip" data-a="planlen" data-v="${n}" aria-pressed="${nd === n}">${n} ${L('วัน', 'days')}</button>`).join('')}</div>`;
  const now = new Date(), months = Array.from({ length: 9 }, (_, i) => { const d = new Date(now.getFullYear(), now.getMonth() + 1 + i, 1); return d.toLocaleDateString(LOC(), { month: 'long', year: 'numeric' }); });
  const ages = a.from ? famAgesOn(a.from) : '';
  // the questions, a page each (owner, Nov 2026: "แยกเป็นหลายหน้า … เรียนรู้จากประวัติเดิมเพื่อเป็น suggestion"): where · when · who · how · more,
  // each with what our past books suggest (plHist); #/planner/<step>, the phone's back goes a step back
  const hist = plHist();
  const qWhere = pcard('famap', PG.purple, L('อยากไปที่ไหน', 'Where to'), `<div class="pform"><div id="plwhere">${plWhereHtml(a)}</div>${f('dest', 'ที่เลือกไว้ หรือพิมพ์เอง', 'Picked so far — or type it', L('เช่น ญี่ปุ่น หรือ โตเกียว, เกียวโต', 'e.g. Japan, or Tokyo, Kyoto'))}
<div class="plsug" id="plsug">${plSugHtml(a.dest)}</div>
${on ? `<button type="button" class="linkbtn plidgo" data-a="planideas"${pln.busy ? ' disabled' : ''}>💡 ${L('ยังไม่รู้จะไปไหน ให้ผู้ช่วยเสนอ', 'Not sure where? Ask the helper for ideas')}</button>` : ''}
${hist.html}</div>`);
  const qWhen = pcard('year', PG.teal, L('ไปเมื่อไร กี่วัน', 'When, and how long'), `<div class="pform"><div class="pform2">${f('from', 'วันแรก', 'First day', '', 'date', 10)}${f('to', 'วันสุดท้าย', 'Last day', '', 'date', 10)}</div>
<div class="pllenrow"><span class="label">${a.from ? L('หรือแตะจำนวนวัน', 'Or tap how long') : L('ยังไม่รู้วัน? แตะจำนวนวันกับเดือนคร่าวๆ', 'No dates yet? Tap how long and roughly when')}</span>${lens}<b class="plspan" id="plspan">${esc(plSpan(nd))}</b></div>
${a.from ? '' : `<div class="plchips plmons" role="group">${months.map((m) => `<button type="button" class="plchip" data-a="planmon" data-v="${esc(m)}" aria-pressed="${a.approx === m}">${esc(m)}</button>`).join('')}</div>${f('approx', 'หรือพิมพ์เอง', 'Or type it', L('เช่น ปลายมีนาคม', 'e.g. late March'), 'text', 80)}`}
${hist.len ? `<p class="label plhint">⭐ ${L(`ทริปที่ผ่านมาเราไปราว ${hist.len} วัน`, `Our past trips ran about ${hist.len} days`)}${hist.mon ? L(` · มักไปช่วง${hist.mon.th}`, ` · usually in ${hist.mon.en}`) : ''}</p>` : ''}</div>`);
  const qWho = pcard('family', PG.pink, L('ใครไปบ้าง', 'Who is coming'), `<div class="pform"><div class="plwho"><div class="plstep" role="group" aria-label="${L('ผู้ใหญ่กี่คน', 'Adults')}"><span>${L('ผู้ใหญ่', 'Adults')}</span><button type="button" data-a="planadults" data-v="-1" aria-label="${L('ลด', 'Fewer')}">−</button><b id="pladults">${a.adults}</b><button type="button" data-a="planadults" data-v="1" aria-label="${L('เพิ่ม', 'More')}">＋</button></div>
<label class="ckrow"><input type="checkbox" data-a="planseniors"${a.seniors ? ' checked' : ''}> ${L('มีผู้สูงอายุไปด้วย', 'An older grown-up comes too')}</label></div>
${kids.length ? `<div class="plkids">${kids.map((k) => { const src = kidArt(k.slug); return `<span class="plkid">${src ? `<img src="${esc(src)}" alt="" draggable="false">` : `<span class="plke">${emo(k.emoji || '🧒')}</span>`}<b>${esc(kidName(k.slug))}</b></span>`; }).join('')}${ages ? `<small>${L('ตอนไป', 'On the trip')}: ${ages}</small>` : ''}</div>` : ''}
<p class="label">${kids.length ? `🔒 ${L('ผู้ช่วยรู้แค่อายุของเด็กๆ ไม่รู้ชื่อ', 'The helper is told the children’s ages, never their names')}` : L('ใส่ลูกๆ ในหน้าครอบครัวก่อน ผู้ช่วยจะวางแผนตามอายุ', 'Add the children on the family page first — the plan follows their ages')}</p></div>`);
  const q2 = pcard('plan', PG.teal, L('เที่ยวแบบไหน', 'How we travel'), `<div class="part pickh">${L('จังหวะ', 'Pace')}</div>${opts('pace')}<div class="part pickh">${L('การเดินทาง', 'Getting around')}</div>${opts('move')}<div class="part pickh">${L('งบ', 'Budget')}</div>${opts('budget')}
<div class="part pickh">${L('เด็กๆ ชอบอะไร (แตะได้หลายอย่าง)', 'What the children like (tap any)')}</div>${chips('likes', PL_LIKES)}${famTaste().out.like.length || famTaste().needs.length ? `<p class="label plhint">💛 ${L('เลือกไว้ให้จาก', 'Filled in from')} <a href="#/taste">${L('สิ่งที่ครอบครัวเราชอบ', 'what our family likes')}</a></p>` : ''}<div class="part pickh">${L('สิ่งที่ต้องคิดถึง', 'Things to allow for')}</div>${chips('needs', PL_NEEDS)}`);
  const q3 = pcard('notebook', PG.gold, L('ที่จองแล้วและที่อยากทำ', 'Booked already, and wishes'), `<div class="pform">${tx('want', 'ต้องไปให้ได้', 'Must do', L('เช่น สวนสัตว์อุเอโนะ ดูหิมะ', 'e.g. Ueno Zoo, seeing snow'), 500)}
${tx('stays', 'ที่พักที่จองแล้ว (ถ้ามี)', 'Stays already booked (if any)', L('เช่น 3 คืนแรกแถวอุเอโนะ', 'e.g. the first 3 nights near Ueno'), 400)}
${tx('flights', 'เที่ยวบิน (ถ้ามี)', 'Flights (if any)', L('เช่น ถึง 08:00 วันแรก กลับ 18:00 วันสุดท้าย', 'e.g. land 08:00 on day 1, leave 18:00 on the last day'), 200)}
${tx('avoid', 'ไม่เอา / ข้อจำกัดอื่น', 'Avoid / other needs', L('เช่น ไม่ขึ้นเรือ แพ้อาหารทะเล', 'e.g. no boats, a seafood allergy'), 300)}
<p class="label">🔒 ${L('ไม่ต้องใส่เลขจอง — ถ้าพิมพ์มา จะถูกตัดออกก่อนถึงผู้ช่วย', 'No booking numbers needed — any typed in are removed before the helper sees them')}</p></div>`);
  // with a route on the page the answers fold to one card; "change the answers" opens them again
  const optName = (k) => { const o = PL_OPTS[k].find((x) => x[0] === a[k]); return o ? `${emo(o[1])} ${L(o[2], o[3])}` : ''; };
  const sum = `<section class="plsum pz" style="--g1:${PG.purple}"><div class="plsumt"><b>📍 ${esc(a.dest || '—')}</b><span>${[a.from ? esc(fmtRange({ date_from: a.from, date_to: a.to || a.from })) : esc([a.approx, a.len ? L(`${a.len} วัน`, `${a.len} days`) : ''].filter(Boolean).join(' · ')), optName('pace'), optName('move'), optName('budget'), ...PL_LIKES.filter((x) => a.likes.includes(x[0])).map((x) => `${emo(x[1])} ${L(x[2], x[3])}`)].filter(Boolean).join(' · ')}</span></div><button type="button" class="mini" data-a="planopen">${ic('log')} ${L('แก้คำตอบ', 'Change the answers')}</button></section>`;
  const wait = pln.busy === 'route' || pln.busy === 'ideas' ? `<div class="plwait" role="status"><span class="plspin" aria-hidden="true"></span><div><b>${pln.busy === 'ideas' ? L('ผู้ช่วยกำลังคิดที่เที่ยวให้…', 'The helper is thinking of places…') : L('ผู้ช่วยกำลังร่างเส้นทาง…', 'The helper is drafting the route…')}</b><small>${L('ราวครึ่งนาที ดูอายุเด็ก เวลางีบ และระยะเดินทางให้', 'About half a minute — the children’s ages, naps and travel times are worked in')}</small></div></div>` : '';
  const go = `<div class="row plgo">${on && !rt && !pln.alts ? `<button type="button" class="btn ghost" data-a="planroute2"${pln.busy ? ' disabled' : ''}>⚖️ ${L('ขอ 2 แบบให้เทียบ', 'Two routes to compare')}</button>` : ''}<button type="button" class="btn" data-a="planroute"${!on || pln.busy ? ' disabled' : ''}>${pln.busy === 'route' ? L('ผู้ช่วยกำลังร่าง…', 'The helper is drafting…') : rt ? `🔁 ${L('ร่างเส้นทางใหม่จากคำตอบ', 'Draft the route again from the answers')}` : `✨ ${L('ให้ผู้ช่วยร่างเส้นทาง', 'Ask the helper for a route')}`}</button>${rt ? `<button type="button" class="btn ghost" data-a="planopen">${L('ซ่อนคำตอบ', 'Hide the answers')}</button>` : ''}</div>`;
  // "where shall we go?": a few places that fit, each a card; a tap fills "where to"
  const ideasHtml = !Array.isArray(pln.ideas) || !pln.ideas.length ? '' : `<div class="part pickh" id="plideas">${L('ผู้ช่วยเสนอ แตะเพื่อเลือก', 'Ideas from the helper — tap one')}</div><div class="plideas">${pln.ideas.map((x, k) => { const p = plPlaceOf(x.place); return `<button type="button" class="plidea pz" data-a="planidea" data-v="${k}" style="--g1:${(p && p.c) || snapPal(k)}"><span class="plie">${p && p.art ? `<img src="${esc(p.art)}" alt="" draggable="false">` : emo(x.emoji)}</span><b>${esc(T(x.place))}</b>${x.why ? `<span>${esc(T(x.why))}</span>` : ''}<small>${[x.fly ? `✈️ ${esc(T(x.fly))}` : '', `🗓️ ${L(`${x.days} วัน`, `${x.days} days`)}`, x.best ? `🌤️ ${esc(T(x.best))}` : ''].filter(Boolean).join(' · ')}</small></button>`; }).join('')}</div><p class="label">${L('เวลาบินและอากาศเป็นค่าประมาณจากผู้ช่วย', 'Flight times and weather are the helper’s rough guesses')}</p>`;
  // the plans kept for both parents' phones (not the one open now)
  const others = (pln.plans || []).filter((p) => p.id !== pln.id || !rt);
  const saved = !others.length ? '' : pcard('notebook', PG.pink, L('แผนที่เก็บไว้', 'Plans we kept'), `<ul class="plsaved">${others.map((p) => `<li><button type="button" class="plsv" data-a="planload" data-v="${esc(p.id)}"><span class="ple">${emo((p.route.days[0] || {}).emoji || '🧭')}</span><span><b>${esc(T(p.route.title))}</b><small>${esc(fmtRange({ date_from: p.route.from, date_to: p.route.to }))} · ${esc(plSpan(p.route.days.length))}${p.by ? ` · ${L('โดย', 'by')} ${esc(p.by)}` : ''}</small></span></button><button type="button" class="mini" data-a="plandrop" data-v="${esc(p.id)}" aria-label="${L('ลบแผนนี้', 'Delete this plan')}">${L('ลบ', 'Delete')}</button></li>`).join('')}</ul>
<p class="label">${L('เก็บไว้ให้ทั้งพ่อและแม่เปิดได้จากเครื่องของตัวเอง', 'Kept so both parents can open them on their own phones')}</p>`, 'plsavedc');
  // the route: the journey at a glance, what to know before saying yes, then the days
  const cols = rt ? plTownCol(rt) : [];
  const dayCard = (d, i) => { const ed = pln.edit === i, n = rt.days.length; return `<li class="plday${ed ? ' ed' : ''}" id="pld${i}" style="--tc:${cols[i]}"><div class="pldh"><span class="ple">${emo(d.emoji || '📍')}</span><div><b>${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)}</b><small>${esc(fmtDay(d.date, { weekday: 'short', day: 'numeric', month: 'short' }))} · <span class="pldtown">${esc(T(d.town))}</span></small></div><span class="pldmv"><button type="button" data-a="planmove" data-i="${i}" data-v="-1"${i ? '' : ' disabled'} aria-label="${L('เลื่อนขึ้น', 'Move earlier')}">↑</button><button type="button" data-a="planmove" data-i="${i}" data-v="1"${i < n - 1 ? '' : ' disabled'} aria-label="${L('เลื่อนลง', 'Move later')}">↓</button></span></div>
${ed ? `<label class="vgl">${L('วันนี้', 'The day')}<input class="field" data-pr="${i}.title" maxlength="120" value="${esc(T(d.title))}"></label>
<label class="vgl">${L('นอนที่', 'Sleep in')}<input class="field" data-pr="${i}.sleep" maxlength="120" value="${esc(T(d.sleep) || T(d.town))}"></label>` : `<h4 class="pldt">${esc(T(d.title))}</h4>`}
${d.stops && d.stops.length ? `<ul class="pldstops">${d.stops.map((x) => `<li${x.lib ? ` class="lib" title="${L('จากคลังที่เที่ยว เช็กกับเว็บแล้ว', 'From the library, checked on the web')}"` : ''}>${x.lib ? '<span aria-hidden="true">✓ </span>' : ''}${esc(T(x))}</li>`).join('')}</ul>` : ''}
<ul class="pldx">${d.kid ? `<li><span aria-hidden="true">⭐</span><span><small>${L('เด็กๆ ชอบ', 'The kids’ best bit')}</small>${esc(T(d.kid))}</span></li>` : ''}${d.move ? `<li><span aria-hidden="true">🚆</span><span><small>${L('เดินทาง', 'Getting there')}</small>${esc(T(d.move))}</span></li>` : ''}${d.rain ? `<li><span aria-hidden="true">☔</span><span><small>${L('ถ้าฝนตก', 'If it rains')}</small>${esc(T(d.rain))}</span></li>` : ''}${ed ? '' : `<li><span aria-hidden="true">🛏️</span><span><small>${L('นอนที่', 'Sleep in')}</small>${esc(T(d.sleep) || T(d.town))}</span></li>`}</ul>
<div class="pldact"><button type="button" data-a="planedit" data-i="${i}" aria-pressed="${ed}">${ed ? `✓ ${L('เสร็จ', 'Done')}` : L('แก้', 'Edit')}</button><button type="button" data-a="planday" data-i="${i}">${L('ขอเปลี่ยน', 'Ask to change')}</button><button type="button" data-a="planadd" data-i="${i}" aria-label="${L('เพิ่มวันหลังวันนี้', 'Add a day after this one')}">＋</button><button type="button" data-a="plandel" data-i="${i}"${n > 1 ? '' : ' disabled'} aria-label="${L('ลบวันนี้', 'Remove this day')}">✕</button></div></li>`; };
  const altsHtml = !Array.isArray(pln.alts) || !pln.alts.length ? '' : `<div class="part pickh">${L('เลือกแบบที่ชอบ', 'Pick the one you like')}</div><div class="plalts">${pln.alts.map((r, k) => `<section class="plalt" style="--tc:${snapPal(k + 2)}"><h3>${esc(T(r.label) || L(`แบบที่ ${k + 1}`, `Choice ${k + 1}`))}</h3>${T(r.why) ? `<p class="label">${esc(T(r.why))}</p>` : ''}
<div class="pljour sm">${plStays(r).map((s) => `<span class="pljt"><b>${esc(T(s.town))}</b><small>${L(`${s.n} วัน`, `${s.n} ${s.n > 1 ? 'days' : 'day'}`)}</small></span>`).join('<i aria-hidden="true">›</i>')}</div>
<ol>${r.days.map((d, i) => `<li><b>${L(`วันที่ ${i + 1}`, `Day ${i + 1}`)}</b> ${emo(d.emoji || '📍')} ${esc(T(d.title))}<small>${L('นอน', 'Sleep')}: ${esc(T(d.sleep) || T(d.town))}</small></li>`).join('')}</ol>
<button type="button" class="btn" data-a="planpick" data-v="${k}">✓ ${L('เลือกแบบนี้', 'Pick this one')}</button></section>`).join('')}</div>`;
  const left = info ? info.left : 0, max = info ? info.max : 0;
  const foot = !rt ? '' : `<div class="plfoot" id="plfoot"><b class="plfh">${L('พอใจเส้นทางแล้ว?', 'Happy with the route?')}</b><ul class="plgets">${[['📅', 'แผนรายวันพร้อมเวลา', 'Day plans with times'], ['🧭', 'คู่มือพกพา', 'The pocket guide'], ['🍜', 'ร้านอาหารแต่ละย่าน', 'Places to eat by area'], ['🎒', 'หน้าของเด็กและพาสปอร์ต', 'The kids’ pages and passport']].map(([e, th, en]) => `<li>${emo(e)} ${L(th, en)}</li>`).join('')}</ul>${!on ? '' : left > 0 ? `<button type="button" class="btn" data-a="planbook"${pln.busy ? ' disabled' : ''}>✨ ${L('ให้ผู้ช่วยเขียนทั้งเล่ม', 'Ask the helper to write the whole book')}</button><small>${L(`เดือนนี้เขียนได้อีก ${left} จาก ${max} เล่ม · ราว 5–10 นาที ได้ร่างให้ตรวจก่อนวางบนชั้น`, `${left} of ${max} books left this month · about 5–10 min, a draft to check before it goes on the shelf`)}</small>`
    : `<small>${L(`เดือนนี้เขียนครบ ${max} เล่มแล้ว — เขียนเล่มนี้ได้เดือนหน้า เส้นทางเก็บไว้ให้แล้ว`, `This month's ${max} books are written — this one can be written next month; the route is kept`)}</small>`}</div>`;
  const fx = rt && rt.facts, tile = (e, h, body, src, cls = '') => (body ? `<div class="plfact${cls}"><h4><span aria-hidden="true">${emo(e)}</span>${h}</h4>${body}<small>${src ? L('จากตารางที่แอปตรวจแล้ว', 'From the app’s checked table') : L('ผู้ช่วยประมาณให้', 'The helper’s estimate')}</small></div>` : '');
  const factsHtml = !rt ? '' : `<div class="plfacts">${tile('🛂', L('วีซ่า (หนังสือเดินทางไทย)', 'Visa (Thai passport)'), fx && fx.visa.length ? `<p>${fx.visa.map((v) => esc(T(v))).join('<br>')}</p>${fx.unsure.length ? `<p class="plwarn">${L('ยังไม่ยืนยัน เช็กกับสถานทูตก่อนจอง', 'Not confirmed — check with the embassy before booking')}</p>` : ''}` : '', 1)}${tile('🆘', L('เบอร์ฉุกเฉิน', 'Emergency numbers'), fx && fx.emergency.length ? `<p>${fx.emergency.slice(0, 4).map((x) => `${esc(T(x.label))} <b class="kf kp">${esc(x.tel)}</b>`).join('<br>')}</p>` : '', 1)}${tile('🔌', L('ไฟ เงิน ถนน', 'Power, money, roads'), fx && fx.guide.length ? `<p>${fx.guide.map((x) => esc(T(x.text))).join('<br>')}</p>` : '', 1)}${tile('🌤️', L('อากาศช่วงนั้น', 'The weather then'), rt.season ? `<p>${esc(T(rt.season))}</p>` : '')}${tile('💰', L('ค่าใช้จ่ายต่อวันคร่าวๆ', 'A rough daily spend'), rt.cost ? `<p>${esc(T(rt.cost))}</p>` : '')}${tile('🎟️', L('ควรจองล่วงหน้า', 'Worth booking ahead'), rt.ahead && rt.ahead.length ? `<ul>${rt.ahead.map((x) => `<li>${esc(T(x))}</li>`).join('')}</ul>` : '')}</div>`;
  const stays = rt ? plStays(rt) : [];
  const jour = !rt ? '' : `<div class="pljour">${stays.map((s, k) => { const p = plPlaceOf(s.town), nights = k === stays.length - 1 ? s.n - 1 : s.n; return `<button type="button" class="pljt" data-a="jump" data-v="#pld${s.i}" style="--tc:${cols[s.i]}"><span class="pljp">${p && p.art ? `<img src="${esc(p.art)}" alt="" draggable="false">` : emo(rt.days[s.i].emoji || '📍')}</span><b>${esc(T(s.town))}</b><small>${nights > 0 ? L(`${nights} คืน`, `${nights} ${nights > 1 ? 'nights' : 'night'}`) : L('วันกลับ', 'Last day')}</small></button>`; }).join('<i aria-hidden="true">›</i>')}</div>`;
  const routeHtml = !rt ? '' : pcard('today', PG.blue, `${esc(T(rt.title))} <small class="label">${esc(fmtRange({ date_from: rt.from, date_to: rt.to }))} · ${esc(plSpan(rt.days.length))}</small>`, `${jour}${rt.why ? `<p class="plwhy">${esc(T(rt.why))}</p>` : ''}
<div class="part pickh">${L('ก่อนตัดสินใจ', 'Before you say yes')}</div>${factsHtml}${plBudget(rt)}
${planEatHtml(rt, on)}
<div class="part pickh">${L('วันต่อวัน', 'Day by day')}</div><p class="label">${L('เลื่อนวัน เพิ่ม ลบ หรือแก้ชื่อได้เลย หรือบอกผู้ช่วยให้เปลี่ยน', 'Move, add or remove a day, rename it — or ask the helper to change it')}</p>
${((n, f) => (n ? `<p class="label pllib">✓ ${L(`จุดแวะ ${n} แห่งมาจาก<a href="#/explore">คลังที่เที่ยว</a> เช็กกับเว็บแล้ว${f ? ` · ผู้ช่วยเสนอนอกคลัง ${f} แห่ง` : ''}`, `${n} stop${n === 1 ? '' : 's'} from <a href="#/explore">the library</a>, checked on the web${f ? ` · ${f} suggested by the helper` : ''}`)}</p>` : ''))(rt.days.reduce((k, d) => k + (d.stops || []).filter((x) => x.lib).length, 0), rt.days.reduce((k, d) => k + (d.stops || []).filter((x) => x.new).length, 0))}
<ol class="pldays">${rt.days.map(dayCard).join('')}</ol>
<div class="plaskc"><div class="part pickh">${L('อยากให้เปลี่ยนอะไร', 'What should change')}</div><div class="plchips">${PL_ASKS.map(([th, en, ath, aen]) => `<button type="button" class="plchip" data-a="planquick" data-v="${esc(L(ath, aen))}"${pln.busy ? ' disabled' : ''}>${L(th, en)}</button>`).join('')}</div>
<div class="pform"><label class="vgl">${L('หรือพิมพ์เอง', 'Or type it')}<input class="field" id="plask" maxlength="400" value="${esc(pln.ask)}" placeholder="${L('เช่น อยู่ฮาโกเนะเพิ่มอีกคืน', 'e.g. one more night in Hakone')}"></label>
<div class="row plaskb"><button type="button" class="btn ghost" data-a="planask"${pln.busy ? ' disabled' : ''}>🔁 ${L('ให้ผู้ช่วยปรับเส้นทาง', 'Ask the helper to change the route')}</button>${pln.prev ? `<button type="button" class="btn ghost" data-a="planundo">↶ ${L('ย้อนกลับ', 'Undo')}</button>` : ''}</div></div></div>
<div class="row plmore"><button type="button" class="linkbtn" data-a="planshare">${ic('share')} ${L('ส่งเส้นทางให้อีกคนดู', 'Send the route to someone')}</button><button type="button" class="linkbtn" data-a="plannew">＋ ${L('เริ่มแผนใหม่', 'Start a new plan')}</button></div>${foot}`, 'plroute', 'plroute');
  const step = (n, th, en, done, cur, to) => `<button type="button" class="plst${done ? ' done' : ''}${cur ? ' now' : ''}" data-a="jump" data-v="${to}"><i>${done ? '✓' : n}</i><span>${L(th, en)}</span></button>`;
  const s1 = !!String(a.dest || '').trim(), s2 = !!rt;
  return `${pageHead('famap', PG.purple, L('เล่มใหม่', 'New book'), L('วางแผนกับผู้ช่วย', 'Plan with the helper'), L('ตอบไม่กี่ข้อ ผู้ช่วยร่างเส้นทางให้ดูก่อน แก้ได้ แล้วค่อยเขียนทั้งเล่ม: แผนรายวัน คู่มือพกพา ร้าน และหน้าของเด็ก สองภาษา', 'Answer a few questions; the helper drafts the route first for you to change, then writes the whole book: day plans, pocket guide, places to eat and the kids’ pages, in both languages'))}
<nav class="plsteps" aria-label="${L('ขั้นตอน', 'Steps')}">${step(1, 'ตอบคำถาม', 'Answer', s1, !s2, '#plq')}${step(2, 'ดูและแก้เส้นทาง', 'Shape the route', s2, s2, s2 ? '#plroute' : '#plq')}${step(3, 'เขียนทั้งเล่ม', 'Write the book', false, false, s2 ? '#plfoot' : '#plq')}</nav>
${!on ? `<div class="notice">${L('ผู้ช่วยยังไม่ได้เปิดใช้สำหรับครอบครัวนี้', 'The helper is not switched on for this family')}</div>` : ''}
${saved}
<div id="plq">${form ? plWizard(qs, { where: `${qWhere}${ideasHtml}`, when: qWhen, who: qWho, style: q2, more: q3 }, go, !!String(a.dest || '').trim()) : sum}</div>
${wait}${pln.err ? `<div class="err plerr" role="alert">${esc(pln.err)}</div>` : ''}
${altsHtml}${routeHtml}
<p class="impnote">🔒 ${L('ส่งให้ผู้ช่วย: คำตอบในหน้านี้ เส้นทาง และอายุของเด็ก — ไม่ส่งชื่อลูก รูป หรือความทรงจำ · เบอร์ฉุกเฉินและวีซ่ามาจากตารางที่ตรวจแล้วของแอป ไม่ได้มาจากผู้ช่วย · แผนเก็บไว้บนเซิร์ฟเวอร์ของครอบครัวให้พ่อแม่เปิดได้ทั้งสองเครื่อง', 'Sent to the helper: the answers on this page, the route and the children’s ages — never their names, photos or memories · emergency numbers and visa rules come from the app’s checked table, not from the helper · the plan is kept on the family’s server so both parents can open it')}</p>`;
}
/* ---------- the family's library of places to eat (#/eats[/<town key>], editors; server/eatlib.js): the towns it knows, a town's
   places as the books' own cards, a search box, and "ask the helper for this town" (one call with a web check — only the town's
   name is sent). The planner reads the same library for a route's towns (eatRoute). */
let eatLib = { towns: null, on: false, town: '', places: null, busy: '', err: '', add: '' };
let eatRoute = { key: '', list: null };   // the library's places for the planner's route: [{en, th, places}]
// What makes a place easy with a small child, read only from the place's own words (its "why" and "what") — never guessed
// (owner, Nov 2026: "ป้ายเด็กเล็กโอเค … กรองร้านในคลังได้"). A tap on a chip keeps the places that say it; chips filter in place.
const KID_TAGS = [
  ['chair', '🪑', 'เก้าอี้เด็ก', 'High chairs', /high ?chairs?|booster|เก้าอี้เด็ก/i],
  ['change', '🚼', 'ที่เปลี่ยนผ้าอ้อม', 'Baby changing', /chang(ing|e) (table|room|mat)|baby room|nursing|เปลี่ยนผ้าอ้อม|ห้องให้นม/i],
  ['play', '🧸', 'มุมเล่น', 'Play area', /play ?(area|ground|corner|room|zone)|playground|soft play|indoor play|มุมเล่น|สนามเด็กเล่น/i],
  ['pram', '👶', 'รถเข็นเข้าได้', 'Pram-friendly', /\b(pram|stroller|buggy|pushchair)s?\b|step-free|\blifts?\b|รถเข็นเด็ก/i],
  ['menu', '🍽️', 'เมนูเด็ก', 'Kids’ menu', /kids'? menu|children'?s menu|child(ren)?'?s? portions?|kids'? portions?|small portions?|half portions?|เมนูเด็ก/i],
  ['mild', '🌿', 'ไม่เผ็ด', 'Mild food', /\bmild\b|not spicy|no chilli|without chilli|ไม่เผ็ด/i],
];
const kidTagsOf = (x) => { const s = [x.why, x.what].map((v) => `${(v && v.en) || ''} ${(v && v.th) || ''}`).join(' '); return KID_TAGS.filter((k) => k[4].test(s)).map((k) => k[0]); };
let eatTags = new Set();
// the family's taste (#/taste, families.profile.taste — docs/PLACES-ECOSYSTEM.md F3): read from S.family, empty when none was chosen
const famTaste = () => cleanTaste(S && S.family && S.family.taste);
// a place to eat's own styles (read from its words, public/tags.js) and its child-friendly tags — one list for the cards' filters
const placeTags = (x) => [...kidTagsOf(x), ...foodStylesOf(x)];
// 1 = one of our styles and none we avoid, -1 = a style we avoid, 0 = neither; "mild food" as a need counts a mild place as ours
// what our reviews taught (E6), worked out on the phone from the travel notebook (public/tags.js learnTaste); kept per state
let learnMemo = { s: null, t: null, v: null };
const famLearned = () => { const t = S && S.family && S.family.taste; if (learnMemo.s !== (S && S.reviews) || learnMemo.t !== t) learnMemo = { s: S && S.reviews, t, v: learnTaste((S && S.reviews) || [], t) }; return learnMemo.v; };
function tasteFitEat(x) {
  const t = famTaste(), st = foodStylesOf(x), f = tasteFitLearned(st, t.food, famLearned().food);
  if (f) return f;
  return t.needs.includes('mild') && kidTagsOf(x).includes('mild') ? 1 : 0;
}
const fitBadge = (x) => (tasteFitEat(x) > 0 ? `<span class="etag fitb">💛 ${L('ตรงใจเรา', 'Our style')}</span>` : '');
// the styles the town's places have, as filter chips — the family's own styles first, marked with a heart
const foodStyleBar = (places) => {
  const t = famTaste(), have = TASTE_FOOD.filter((g) => places.some((x) => foodStylesOf(x).includes(g[0])));
  if (have.length < 2) return '';
  have.sort((a, b) => (t.food.like.includes(b[0]) ? 1 : 0) - (t.food.like.includes(a[0]) ? 1 : 0));
  return `<div class="row chips ektagbar fstyles" role="group" aria-label="${L('แนวอาหาร', 'Kind of food')}"><span class="label">${L('แนวอาหาร', 'Kind of food')}</span>${have.map((g) => `<button class="chip${t.food.like.includes(g[0]) ? ' ours' : ''}" data-a="eattag" data-v="${g[0]}" aria-pressed="${eatTags.has(g[0])}">${tPic(g)} ${L(g[2], g[3])}${t.food.like.includes(g[0]) ? ' 💛' : ''}</button>`).join('')}</div>`;
};
// our own verdict from the travel notebook on a place of the same name (any book): stars, or "we would not go again"
const famStar = (x) => (!x.fam ? '' : x.fam.again === false ? `<span class="etag famno">${L('เราไม่ไปซ้ำ', 'We wouldn’t go again')}</span>` : x.fam.r ? `<span class="etag famstar">${'★'.repeat(x.fam.r)} ${L('ของเรา', 'ours')}</span>` : x.fam.again ? `<span class="etag famstar">♥ ${L('อยากไปซ้ำ', 'We’d go again')}</span>` : x.fam.been ? `<span class="etag fambeen">✓ ${L('เคยไปแล้ว', 'Been')}</span>` : '');
const famLoved = (x) => !!(x && x.fam && (x.fam.r >= 4 || x.fam.again === true));
const famRank = (x) => (!x.fam ? 0 : x.fam.again === false ? -1 : (x.fam.r || 0) + (x.fam.again ? 0.5 : 0));
const eatTagOk = (tags) => ![...eatTags].some((k) => !tags.includes(k));
const kidTagChips = (x) => ((ks) => (ks.length ? `<span class="ektags">${ks.map((k) => ((g) => `<span class="ektag">${emo(g[1])} ${L(g[2], g[3])}</span>`)(KID_TAGS.find((y) => y[0] === k))).join('')}</span>` : ''))(kidTagsOf(x));
const kidTagBar = (places) => ((have) => (have.length ? `<div class="row chips ektagbar" role="group" aria-label="${L('เหมาะกับเด็กเล็ก', 'Easy with little ones')}"><span class="label">${L('เหมาะกับเด็กเล็ก', 'Easy with little ones')}</span>${have.map((g) => `<button class="chip" data-a="eattag" data-v="${g[0]}" aria-pressed="${eatTags.has(g[0])}">${emo(g[1])} ${L(g[2], g[3])}</button>`).join('')}</div>` : ''))(KID_TAGS.filter((g) => places.some((x) => kidTagsOf(x).includes(g[0]))));

// roughly in baht beside a place's price (owner, Nov 2026: "ราคาเป็นบาทโดยประมาณ"): the place's country gives its currency, the rate is
// the one the parents typed on this phone for the trip's spending (ls('fx')) — never fetched; no rate, nothing is shown
// CC_CUR (a country's currency) lives in tags.js, shared with the server's budget
function prThb(x) {
  const cur = CC_CUR[x.cc], rate = +(fxRates()[cur] || 0), en = (x.pr && x.pr.en) || '';
  if (!cur || cur === 'THB' || !(rate > 0)) return '';
  const n = (en.match(/\d[\d,]*(?:\.\d+)?/g) || []).map((v) => +v.replace(/,/g, '')).filter((v) => v > 0).slice(0, 2);
  if (!n.length) return '';
  const r = (v) => { const b = v * rate; return b >= 1000 ? Math.round(b / 50) * 50 : b >= 100 ? Math.round(b / 10) * 10 : Math.round(b); };
  return `<span class="prthb">≈ ${fmtMoney(r(n[0]), 'THB')}${n[1] ? `–${r(n[1]).toLocaleString(lang === 'th' ? 'th-TH' : 'en-GB')}` : ''}</span>`;
}

// the library's places in the town where we sleep tonight (owner, Nov 2026: "ร้านใกล้ที่พักคืนนี้"): the stay's town-level position →
// the nearest library town (snapPlace, on the phone) → its places, minus the ones the book already names for the day. Editors only
// (the library is the parents'); nothing about the family is sent — the town's name only.
let eatBed = { key: '', town: null, list: null };
// the meal of the hour and the kinds of place it wants first (0 restaurants · 1 food courts and quick bites · 2 cafés and sweets)
const mealOfHour = (h) => (h < 5 ? null : h < 11 ? { th: 'มื้อเช้า', en: 'breakfast', order: [2, 1, 0] } : h < 15 ? { th: 'มื้อเที่ยง', en: 'lunch', order: [1, 0, 2] } : h < 17 ? { th: 'ของว่างบ่าย', en: 'an afternoon snack', order: [2, 1, 0] } : h < 22 ? { th: 'มื้อเย็น', en: 'dinner', order: [0, 1, 2] } : null);
function bedEats(t, i, fbox) {
  const pl = t.days[i].plan || {}, ll = pl.stay && pl.stay.ll;
  if (!isEditor() || !Array.isArray(ll) || ll.length !== 2) return '';
  const key = `${t.id}:${i}:${ll.join(',')}`;
  if (eatBed.key !== key) {
    eatBed = { key, town: null, list: null };
    snapGeo().then((geo) => {
      const town = snapPlace(ll, geo); if (eatBed.key !== key) return;
      if (!town) { eatBed.list = []; return; }
      eatBed.town = town;
      api('GET', `/api/b/eatlib?for=${encodeURIComponent(JSON.stringify([[town.en, town.th]]))}`).then((r) => {
        if (eatBed.key !== key) return; eatBed.list = ((r.for || [])[0] || {}).places || [];
        // filled in place, never by drawing the page again: a late redraw would close the folds the parent has opened
        const slot = document.querySelector(`section.bedslot[data-k="${CSS.escape(key)}"]`), html = eatBed.fbox && bedEats(t, i, eatBed.fbox);
        if (!slot || !html) return;
        const tmp = document.createElement('div'); tmp.innerHTML = html; const box = tmp.firstElementChild;
        slot.className = box.className; slot.innerHTML = box.innerHTML; slot.hidden = false;
        const g = slot.closest('.cgrid'); if (g) packBoxes(g.parentNode || document);
      }, () => { if (eatBed.key === key) eatBed.list = []; });
    });
  }
  eatBed.fbox = fbox;
  const slot = `<section class="cbox bedslot" data-k="${esc(key)}" hidden><h3 class="ch"></h3></section>`;   // filled in place once the list arrives
  if (!eatBed.list) return slot;
  const own = new Set([...(pl.picks || []).flatMap((p) => [p.name, p.alt && p.alt.name]), ...(pl.food || []).flatMap((f) => f.items.map((x) => x.name))].filter(Boolean).map((n) => String(n).toLowerCase()));
  const list = (eatBed.list || []).filter((x) => !own.has(String(x.name).toLowerCase()) && x.st !== 'closed' && famRank(x) >= 0).map((x, k) => [x, k]).sort((a, b) => famRank(b[0]) - famRank(a[0]) || tasteFitEat(b[0]) - tasteFitEat(a[0]) || a[1] - b[1]).map((p) => p[0]);   // the places we loved first, the ones we would not go back to left out
  if (!list.length || !eatBed.town) return '';
  // on the day itself, the kind that fits the hour leads (E5, "กินอะไรดี"): cafés for breakfast and the afternoon, quick places and
  // restaurants at lunch, restaurants for dinner — in the town's own time
  const meal = dayNow(t) === i ? mealOfHour(hourIn(pl.tz || t.timezone)) : null;
  if (meal) list.sort((a, b) => meal.order.indexOf(a.kind) - meal.order.indexOf(b.kind));
  const tk = list[0].tkey, row = (x) => `<li class="nmrow"><span class="plen"><b>${esc(x.name)}</b><small>${[T(x.tag), T(x.pr)].filter(Boolean).map(esc).join(' · ')}${prThb(x) ? ` ${prThb(x)}` : ''}</small>${kidTagChips(x)}</span>${eatSt(x)}${famStar(x)}${fitBadge(x)}${navB(x.q || x.name, x.name)}</li>`;
  return fbox('teal', 'eat', meal ? L(`กินอะไรดี · ${meal.th} แถวที่พัก`, `What shall we eat? · ${meal.en} near the bed`) : L(`ร้านในคลังแถวที่พัก · ${eatBed.town.th}`, `Places near tonight’s bed · ${eatBed.town.en}`), esc(L(`${list.length} ร้าน`, `${list.length} place${list.length === 1 ? '' : 's'}`)),
    `<ul class="bedeats">${list.slice(0, 8).map(row).join('')}</ul><p class="label">${L('จากคลังร้านอาหารของครอบครัว · เช็กเวลาเปิดก่อนไป', 'From the family’s library of places to eat · check the hours before you go')} · <a href="#/eats/${esc(tk)}">${L(`ดูทั้ง ${list.length} ร้าน`, `See all ${list.length}`)} ›</a></p>`);
}
const eatSrc = (x) => (x.src === 'starter' ? (x.checked ? `${L('จากคลังของแอป · เช็กกับเว็บ', 'From the app’s built-in list · web check')} ${esc(fmtDay(x.checked, { month: 'short', year: '2-digit' }))}` : L('จากคลังของแอป · ยังไม่ได้เช็กวันนี้ เช็กก่อนไป', 'From the app’s built-in list · not checked today — check before you go')) : x.src === 'helper' ? `${L('ผู้ช่วยหา · เช็กกับเว็บ', 'Found by the helper · web check')}${x.checked ? ` ${esc(fmtDay(x.checked, { day: 'numeric', month: 'short', year: '2-digit' }))}` : ''}` : (() => { const t = x.trip && trip(x.trip); return t ? `${L('จากเล่ม', 'From')} ${esc(T(t.title))}` : L('จากเล่มของเรา', 'From our books'); })());
const eatSt = (x) => (x.st === 'closed' ? `<span class="etag st-closed">${L('ปิดแล้ว', 'Closed')}</span>` : x.st === 'moved' ? `<span class="etag st-closed">${L('ย้ายร้าน', 'Moved')}</span>` : x.st === 'open' ? `<span class="etag st-open">✓ ${L('ยังเปิดอยู่', 'Open')}</span>` : '');
// one place as the book's own card (views.js viewEat): name + pin + kind of food, where, a line about it, price / hours, directions
const eatLibCard = (g, x, del) => `<li class="eatc${tasteFitEat(x) > 0 ? ' fit' : ''}" data-s="${esc(eatText(g, x))}" data-k="${x.kind}" data-p="0" data-t="${placeTags(x).join(' ')}"${eatShow(g, x) && eatTagOk(placeTags(x)) ? '' : ' hidden'}>
<div class="et"><b class="en">${mapA(x.q || x.name, esc(x.name))}</b>${extA(mapsUrl(x.q || x.name), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}${T(x.tag) ? `<span class="etag t-${esc(x.tk || 'x')}">${esc(T(x.tag))}</span>` : ''}${eatSt(x)}${famStar(x)}${fitBadge(x)}</div>
${x.zh || x.where ? `<div class="ew">${x.zh ? `<span class="zh">${esc(x.zh)}</span>` : ''}${x.where ? `<span>${esc(T(x.where))}</span>` : ''}</div>` : ''}
${T(x.what) ? `<p class="ed">${esc(T(x.what))}</p>` : ''}${T(x.why) ? `<p class="why"><b>${L('เหมาะกับเด็ก', 'For the kids')}</b> ${esc(T(x.why))}</p>` : ''}${kidTagChips(x)}
<div class="ef"><span class="echips">${T(x.pr) ? `<span class="pr">${esc(T(x.pr))}</span>${prThb(x)}` : ''}${T(x.hours) ? `<span class="hr">${esc(T(x.hours))}</span>` : ''}</span>${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || x.name)}`, ic('route') + ' ' + L('นำทาง', 'Go'), 'go')}</div>
<div class="elsrc"><small>${eatSrc(x)}</small>${del ? `<button type="button" class="mini" data-a="eatlibdel" data-v="${esc(x.id)}">${L('เอาออก', 'Take out')}</button>` : ''}</div></li>`;
/* ---------- what our family likes (#/taste, editors; docs/PLACES-ECOSYSTEM.md F3; owner, Nov 2026: "ร้านอาหารและสถานที่ท่องเที่ยว
   ให้เลือกแนวที่ชอบได้"): the kinds of food and outings the family loves or skips, what to allow for, and each child's own favourites.
   Kept in the family's profile (families.profile.taste, both parents, in backups); the planner starts a new plan from it and sends it
   to the helper as words, the eat pages put the places of our style first with "ตรงใจเรา". Chips save in place, never a redraw. */
const tasteState = (side, k) => { const t = famTaste()[side]; return t.like.includes(k) ? 'like' : t.avoid.includes(k) ? 'avoid' : ''; };
const tasteChip = (side, r) => { const st = tasteState(side, r[0]); return `<button type="button" class="chip tastechip" data-a="taste" data-g="${side}" data-v="${r[0]}" data-st="${st}" aria-pressed="${!!st}"><span aria-hidden="true">${tPic(r)}</span> ${L(r[2], r[3])}<i class="tsm" aria-hidden="true">${st === 'like' ? '💛' : st === 'avoid' ? '🚫' : ''}</i></button>`; };
function tasteCard() {
  const t = famTaste(), n = t.food.like.length + t.out.like.length;
  const sub = n ? [...TASTE_OUT, ...TASTE_FOOD].filter((r) => t.out.like.includes(r[0]) || t.food.like.includes(r[0])).slice(0, 5).map((r) => `${r[1]} ${L(r[2], r[3])}`).join(' · ') : L('เลือกแนวอาหารและที่เที่ยวที่เราชอบ — ผู้ช่วยวางแผนและคลังร้านจะเรียงตามนี้', 'Pick the food and outings we love — the planner and the libraries follow it');
  return `<a class="nbcard tastecard" href="#/taste"><span class="emb">${hubIc('taste')}</span><div><b>${L('สิ่งที่ครอบครัวเราชอบ', 'What our family likes')}</b><small>${esc(sub)}</small></div><span class="arrow">›</span></a>`;
}
// what the stars we gave suggest (the travel notebook: a place or a meal of 4–5 ★ or "would go again"), read from its name and our
// note — styles not chosen yet, most named first
function tasteHints(side, which = 'like') {
  const l = famLearned()[side], list = side === 'food' ? TASTE_FOOD : TASTE_OUT;
  return (l ? l[which] : []).slice(0, 6).map((k) => list.find((r) => r[0] === k)).filter(Boolean);
}
// #/taste in pages (owner, Nov 2026: "แยกเป็นหลายหน้า … เรียนรู้จากประวัติเดิม"): outings · food · always allow for · each child
const TASTE_Q = [['out', '🎒', 'ที่เที่ยว', 'Outings'], ['food', '🍜', 'อาหาร', 'Food'], ['need', '🧳', 'ต้องคิดถึง', 'Allow for'], ['kids', '🧒', 'ลูกแต่ละคน', 'Each child']];
function viewTaste(qs) {
  const t = famTaste(), kids = children(), qsl = kids.length ? TASTE_Q : TASTE_Q.slice(0, 3);
  const k = Math.max(0, qsl.findIndex((q) => q[0] === qs)), q = qsl[k], last = k === qsl.length - 1;
  const how = `<p class="label">${L('แตะหนึ่งครั้ง = ชอบ 💛 · แตะอีกครั้ง = ไม่เอา 🚫 · แตะอีกครั้ง = เฉยๆ', 'Tap once = we love it 💛 · again = we skip it 🚫 · again = no view')}</p>`;
  const hints = (side) => { const h = tasteHints(side), lo = tasteHints(side, 'avoid'); return (h.length ? `<div class="part pickh plhist">💡 ${L('เรียนรู้จากรีวิวทริปที่ผ่านมา · ใช้แล้วเบาๆ แตะเพื่อเก็บเป็นของเรา', 'Learned from our reviews · used gently already, tap to make it ours')}</div><div class="row chips tastechips tastehints">${h.map((r) => `<button type="button" class="chip tastechip" data-st="learned" data-a="tasteadd" data-g="${side}" data-v="${r[0]}">＋ <span aria-hidden="true">${tPic(r)}</span> ${L(r[2], r[3])}</button>`).join('')}</div>` : '')
    + (lo.length ? `<p class="label tastelo">🔻 ${L('เคยให้ดาวน้อย จึงเลื่อนลงไปท้ายๆ', 'We rated these low, so they go further down')}: ${lo.map((r) => `${r[1]} ${L(r[2], r[3])}`).join(' · ')}</p>` : ''); };
  const kidSum = (c) => { const ks = t.kids[c.slug] || [], rows = [...TASTE_OUT, ...TASTE_FOOD].filter((r) => ks.includes(r[0])); return rows.length ? rows.slice(0, 6).map((r) => `${r[1]} ${L(r[2], r[3])}`).join(' · ') + (rows.length > 6 ? ' …' : '') : L('แตะเพื่อเลือก (ไม่ใส่ก็ได้)', 'Tap to choose (optional)'); };
  const kid = (c) => `<details class="tastekid"><summary class="tkh">${kidFace(c.slug)}<span class="tkn"><b>${esc(kidName(c.slug))}</b><small class="tks" data-k="${esc(c.slug)}">${esc(kidSum(c))}</small></span>${ic('chev', 'chv')}</summary><div class="row chips tastechips" role="group">${[...TASTE_OUT, ...TASTE_FOOD].map((r) => `<button type="button" class="chip" data-a="tastekid" data-k="${esc(c.slug)}" data-v="${r[0]}" aria-pressed="${(t.kids[c.slug] || []).includes(r[0])}"><span aria-hidden="true">${tPic(r)}</span> ${L(r[2], r[3])}</button>`).join('')}</div></details>`;
  const pages = {
    out: pcard('plan', PG.teal, L('แนวที่เที่ยว', 'Outings'), `${how}<div class="row chips tastechips" role="group">${TASTE_OUT.map((r) => tasteChip('out', r)).join('')}</div>${hints('out')}`),
    food: pcard('eat', PG.orange, L('แนวอาหาร', 'Food'), `${how}<div class="row chips tastechips" role="group">${TASTE_FOOD.map((r) => tasteChip('food', r)).join('')}</div>${hints('food')}`),
    need: pcard('family', PG.purple, L('สิ่งที่ต้องคิดถึงทุกทริป', 'Always allow for'), `<div class="row chips tastechips" role="group">${TASTE_NEED.map((r) => `<button type="button" class="chip" data-a="tasteneed" data-v="${r[0]}" aria-pressed="${t.needs.includes(r[0])}"><span aria-hidden="true">${tPic(r)}</span> ${L(r[2], r[3])}</button>`).join('')}</div>`),
    kids: kids.length ? pcard('kid', PG.pink, L('ของโปรดของลูกแต่ละคน', 'Each child’s favourites'), kids.map(kid).join('')) : '',
  };
  const dots = `<nav class="plqs tasteqs" style="grid-template-columns:repeat(${qsl.length},1fr)" aria-label="${L('หัวข้อ', 'Topics')}">${qsl.map((x, j) => `<a class="plqd${j === k ? ' now' : j < k ? ' done' : ''}" href="#/taste/${x[0]}"${j === k ? ' aria-current="step"' : ''}><i>${j + 1}</i><span>${L(x[2], x[3])}</span></a>`).join('')}</nav>`;
  const nav = `<div class="row plnav">${k ? `<a class="btn ghost plback" href="#/taste/${qsl[k - 1][0]}">‹ ${L('ย้อน', 'Back')}</a>` : '<span></span>'}${last ? `<a class="btn plnext" href="#/">${L('เสร็จ', 'Done')} ✓</a>` : `<a class="btn plnext" href="#/taste/${qsl[k + 1][0]}">${L('ถัดไป', 'Next')} ›</a>`}</div>`;
  const uses = `<p class="label tasteuse">🔒 ${L('บันทึกเองทุกครั้งที่แตะ · ใช้ในเครื่องมือวางแผน (บอกผู้ช่วยเป็นคำ ไม่มีชื่อลูก) และคลังร้านอาหาร (ร้านที่ตรงแนวขึ้นก่อน) · พ่อแม่เห็นเหมือนกันทั้งสองเครื่อง', 'Saved as you tap · used by the planner (the helper gets it as words, never the children’s names) and the libraries (our style first) · both parents see the same')}</p>`;
  return `${pageHead('taste', PG.pink, L('ครอบครัวของเรา', 'Our family'), L('สิ่งที่ครอบครัวเราชอบ', 'What our family likes'), L('เลือกแนวที่ชอบหรือไม่ชอบ แล้วผู้ช่วยกับคลังข้อมูลจะเลือกให้ตรงใจเรา', 'Choose what we love or skip; the helper and the libraries then pick what suits us'))}
${dots}<div class="tastepage" data-q="${q[0]}">${pages[q[0]]}${nav}${uses}</div>`;
}
/* ---------- explore a town (#/explore[/<tkey>[/eat]], editors; docs/PLACES-ECOSYSTEM.md E3, owner, Nov 2026: "ทำ E3"): the things to do
   of the library (sight_lib, every built-in row checked on the web) and its places to eat, side by side for one town. Filters: the kind,
   a style chip (the family's styles of #/taste lit and first), one child's age, indoors (a rainy day), free, the wish list. A sight's ♥
   keeps it on the family's wish list (sight_lib.wish, both parents, in backups) — the planner reads it (E4). Chips redraw the page
   (render(), Safari keeps a tapped button unfocused); the search box filters in place. */
let SIGHT = { towns: null, total: 0, town: '', list: null, kind: '', st: '', kid: '', io: false, free: false, wish: false, q: '' };
const SIGHT_KINDS = { themepark: ['🎢', 'สวนสนุก', 'Theme parks'], zoo: ['🦒', 'สวนสัตว์', 'Zoos'], aquarium: ['🐠', 'อควาเรียม', 'Aquariums'], museumkid: ['🔬', 'พิพิธภัณฑ์เด็ก', 'Hands-on museums'],
  museum: ['🏛️', 'พิพิธภัณฑ์', 'Museums'], park: ['🌳', 'สวนสาธารณะ', 'Parks'], play: ['🛝', 'ที่เล่นของเด็ก', 'Play'], beach: ['🏖️', 'ชายหาด', 'Beaches'], nature: ['🌲', 'ธรรมชาติ', 'Nature'],
  views: ['🗼', 'จุดชมวิว', 'Views'], culture: ['⛩️', 'วัดและวัง', 'Culture'], oldtown: ['🏘️', 'ย่านเก่า', 'Old towns'], market: ['🏮', 'ตลาด', 'Markets'], show: ['🎭', 'การแสดง', 'Shows'],
  farm: ['🍓', 'ฟาร์ม', 'Farms'], onsen: ['♨️', 'ออนเซ็น', 'Hot springs'], ride: ['🚡', 'นั่งรถ เรือ กระเช้า', 'Rides'], shop: ['🛍️', 'ช้อปปิ้ง', 'Shopping'] };
const SIGHT_AGES = ['0–2', '3–5', '6–9', '10+'];
const sightBand = (y) => (y == null ? 1 : y < 3 ? 0 : y < 6 ? 1 : y < 10 ? 2 : 3);
const kidYears = (k) => { if (!/^\d{4}-\d{2}$/.test((k && k.birth_ym) || '')) return null; const y = (Date.now() - Date.parse(k.birth_ym + '-15')) / (365.25 * 864e5); return y >= 0 ? y : null; };
const sightFree = (x) => /^\s*(≈\s*)?free\b/i.test((x.price && x.price.en) || '');
const sightText = (x) => [x.name, x.local, x.area, x.what, x.why, x.tip].map((v) => (v && typeof v === 'object' ? `${v.th || ''} ${v.en || ''}` : v || '')).join(' ').toLowerCase();
function sightOk(x) {
  const S2 = SIGHT, k = S2.kid && children().find((c) => c.slug === S2.kid);
  if (S2.kind && x.kind !== S2.kind) return false;
  if (S2.st && !(x.styles || []).includes(S2.st)) return false;
  if (S2.io && x.io === 'out') return false;
  if (S2.free && !sightFree(x)) return false;
  if (S2.wish && !x.wish) return false;
  if (k && (x.ages || [1, 1, 1, 1])[sightBand(kidYears(k))] === 0) return false;
  return true;
}
// one sight as a card: its picture (the library's landmark) or its kind, the name, the ages it suits, time · indoors · pram, price, why, a tip
function sightCard(x) {
  const kd = SIGHT_KINDS[x.kind] || ['📍', '', ''], ages = x.ages || [1, 1, 1, 1], t = famTaste(), ours = (x.styles || []).some((k) => t.out.like.includes(k)) && !(x.styles || []).some((k) => t.out.avoid.includes(k));
  const io = { in: ['🏠', 'ในร่ม', 'Indoors'], out: ['🌤️', 'กลางแจ้ง', 'Outdoors'], both: ['⛅', 'ในร่มและกลางแจ้ง', 'In and out'] }[x.io] || null;
  const pram = { yes: L('รถเข็นไปได้', 'Pram-friendly'), part: L('รถเข็นได้บางส่วน', 'Pram in parts'), no: L('รถเข็นไม่สะดวก', 'Not for a pram') }[x.pram] || '';
  const book = x.book === 'req' ? L('ต้องจองก่อน', 'Book ahead') : x.book === 'rec' ? L('ควรจองก่อน', 'Booking advised') : '';
  const hrs = x.hrs ? (lang === 'th' ? `ราว ${String(x.hrs).replace('.5', ' ครึ่ง')} ชม.` : `about ${x.hrs} h`) : '';
  const price = T(x.price) ? `<span class="pr">${esc(T(x.price))}</span>${prThb({ cc: x.cc, pr: x.price })}` : '';
  const pic = x.art ? `<img src="${esc(x.art)}" alt="" loading="lazy" draggable="false">` : `<span aria-hidden="true">${emo(kd[0])}</span>`;
  return `<li class="sightc${x.wish ? ' wished' : ''}${ours ? ' fit' : ''}${x.fit === -9 ? ' young' : ''}" data-s="${esc(sightText(x))}">
<div class="sct"><span class="scpic">${pic}</span><div class="scn"><b>${mapA(x.q || T(x.name), esc(T(x.name)))}</b>${x.local ? `<span class="zh">${esc(x.local)}</span>` : ''}<span class="sckd">${emo(kd[0])} ${L(kd[1], kd[2])}${T(x.area) ? ` · ${esc(T(x.area))}` : ''}</span></div>
<button type="button" class="sheart" data-a="sightwish" data-v="${esc(x.id)}" aria-pressed="${!!x.wish}" aria-label="${x.wish ? L('เอาออกจากที่อยากไป', 'Off the wish list') : L('อยากไป', 'We’d love to go')}">${x.wish ? '♥' : '♡'}</button></div>
<div class="sages" role="img" aria-label="${L('เหมาะกับอายุ', 'Ages')}">${SIGHT_AGES.map((a, k) => `<span class="sa a${ages[k]}">${ages[k] === 2 ? '★ ' : ''}${a}${lang === 'th' ? ' ขวบ' : ''}</span>`).join('')}${x.fit === -9 ? `<span class="etag st-closed">${L('ยังเล็กไปสำหรับน้องคนเล็ก', 'Too young for our youngest')}</span>` : ours ? `<span class="etag fitb">💛 ${L('ตรงใจเรา', 'Our style')}</span>` : ''}${famStar(x)}</div>
${T(x.what) ? `<p class="ed">${esc(T(x.what))}</p>` : ''}${T(x.why) ? `<p class="why"><b>${L('เหมาะกับเด็ก', 'For the kids')}</b> ${esc(T(x.why))}</p>` : ''}${T(x.tip) ? `<p class="why sctip"><b>${L('เคล็ดลับ', 'Tip')}</b> ${esc(T(x.tip))}</p>` : ''}
<div class="scfacts">${[hrs && `⏱️ ${hrs}`, io && `${io[0]} ${L(io[1], io[2])}`, pram && `👶 ${pram}`, book && `🎟️ ${book}`].filter(Boolean).map((v) => `<span class="ektag">${esc(v)}</span>`).join('')}</div>
<div class="ef"><span class="echips">${price}</span>${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || T(x.name))}`, ic('route') + ' ' + L('นำทาง', 'Go'), 'go')}</div>
<div class="elsrc"><small>${x.src === 'starter' && x.checked ? `${L('เช็กกับเว็บ', 'Checked on the web')} ${esc(fmtDay(x.checked, { month: 'short', year: '2-digit' }))}${x.url ? ` · ${extA(x.url, L('ที่มา', 'source'), 'srcl')}` : ''}` : L('ราคาและเวลาเปิดเปลี่ยนได้ เช็กก่อนไป', 'Hours and prices change — check before you go')}</small><button type="button" class="mini" data-a="sightdel" data-v="${esc(x.id)}">${L('เอาออก', 'Take out')}</button></div></li>`;
}
// the youngest child's age today in years (null when no birth month is known)
const youngestAge = () => { const ys = children().map((k) => (k.birth_ym ? (Date.now() - Date.parse(k.birth_ym + '-15')) / (365.25 * 864e5) : null)).filter((y) => y != null && y >= 0); return ys.length ? Math.min(...ys) : null; };
// "plan a day for me": a big sight in the morning, lunch nearby, a nap at the hotel for a child under four (or when the family asks
// for one), a shorter sight after, dinner — from the library on the phone, the family's style and wishes first, a new mix each tap
function buildDay(sights, eats, seed) {
  const t = famTaste(), y = youngestAge(), nap = (y != null && y < 4) || t.needs.includes('nap');
  const rank = (x) => x.fit * 10 + (x.wish ? 15 : 0);
  const pool = sights.filter((x) => x.fit > 0).sort((a, b) => rank(b) - rank(a));
  if (!pool.length) return null;
  const rot = (list) => (list.length ? list.slice(seed % list.length).concat(list.slice(0, seed % list.length)) : list);
  const top = rot(pool.slice(0, Math.max(3, Math.min(pool.length, 6))));
  const big = top.find((x) => x.hrs >= 2) || top[0];
  const small = rot(pool).find((x) => x !== big && x.kind !== big.kind && x.hrs <= 2.5) || pool.find((x) => x !== big);
  const food = (eats || []).filter((x) => tasteFitEat(x) >= 0).sort((a, b) => tasteFitEat(b) - tasteFitEat(a));
  const lunch = rot(food.filter((x) => x.kind !== 2))[0], dinner = rot(food.filter((x) => x !== lunch && x.kind !== 2))[1] || food.find((x) => x !== lunch && x.kind !== 2);
  const hm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const rows = []; let at = 9 * 60 + 30;
  rows.push({ t: hm(at), e: (SIGHT_KINDS[big.kind] || ['📍'])[0], th: T(big.name), x: big }); at += Math.round(big.hrs * 60);
  at = Math.max(at, 12 * 60); rows.push({ t: hm(at), e: '🍜', th: lunch ? lunch.name : L('มื้อกลางวันแถวนั้น', 'Lunch nearby'), eat: lunch }); at += 60;
  if (nap) { rows.push({ t: hm(at), e: '😴', th: L('กลับไปงีบที่พัก', 'Back to the hotel for a nap') }); at += 120; }
  if (small) { rows.push({ t: hm(at), e: (SIGHT_KINDS[small.kind] || ['📍'])[0], th: T(small.name), x: small }); at += Math.round(small.hrs * 60); }
  rows.push({ t: hm(Math.max(at, 17 * 60 + 30)), e: '🍽️', th: dinner ? dinner.name : L('มื้อเย็นใกล้ที่พัก', 'Dinner near the hotel'), eat: dinner });
  return { rows, nap, cost: [big, small].filter(Boolean) };
}
function dayHtml(d) {
  if (!d) return `<p class="label">${L('ยังไม่มีที่เที่ยวที่เหมาะกับวัยลูกในเมืองนี้', 'Nothing here suits the children’s age yet')}</p>`;
  return `<ol class="tl plan bday">${d.rows.map((r) => `<li><span class="tt">${r.t}</span><span class="tb"><b>${emo(r.e)} ${esc(r.th)}</b>${r.x ? `<small>${esc([T(r.x.area), r.x.hrs + L(' ชม.', ' h'), T(r.x.price)].filter(Boolean).join(' · '))}</small>` : r.eat ? `<small>${esc([T(r.eat.tag), T(r.eat.pr)].filter(Boolean).join(' · '))}</small>` : ''}</span></li>`).join('')}</ol>
${d.nap ? `<p class="label">😴 ${L('เว้นช่วงบ่ายให้ลูกงีบ', 'An afternoon gap for a nap')}</p>` : ''}
<div class="row bdayb"><button type="button" class="btn ghost" data-a="dayagain">🔀 ${L('ขอแบบอื่น', 'Another mix')}</button><button type="button" class="btn" data-a="dayplan">${L('ใส่ในแผนทริป', 'Use in a plan')} ›</button></div>`;
}
// a rainy day near tonight's bed (Today, editors): the indoor things to do of the town we sleep in that suit our children — filled in
// place like "places near tonight's bed" (a late redraw would close the folds the parent opened)
let sightRain = { key: '', town: null, list: null, fbox: null };
function rainSights(t, i, fbox) {
  const pl = t.days[i].plan || {}, ll = pl.stay && pl.stay.ll;
  if (!isEditor() || !Array.isArray(ll) || ll.length !== 2) return '';
  const key = `${t.id}:${i}:${ll.join(',')}`;
  if (sightRain.key !== key) {
    sightRain = { key, town: null, list: null, fbox };
    snapGeo().then((geo) => {
      const town = snapPlace(ll, geo); if (sightRain.key !== key) return;
      if (!town) { sightRain.list = []; return; }
      sightRain.town = town;
      api('GET', `/api/b/sights?for=${encodeURIComponent(JSON.stringify([[town.en, town.th]]))}`).then((r) => {
        if (sightRain.key !== key) return; sightRain.list = (((r.for || [])[0] || {}).sights || []).filter((x) => x.io !== 'out' && x.fit > 0);
        const din = document.getElementById('dchin'); if (din && din.hidden) { const tmp = document.createElement('div'); tmp.innerHTML = dchIndoor(t, i); const nb = tmp.firstElementChild; if (nb && !nb.hidden) din.replaceWith(nb); }
        const slot = document.querySelector(`section.rainslot[data-k="${CSS.escape(key)}"]`), html = sightRain.fbox && rainSights(t, i, sightRain.fbox);
        if (!slot || !html) return;
        const tmp = document.createElement('div'); tmp.innerHTML = html; const box = tmp.firstElementChild;
        slot.className = box.className; slot.innerHTML = box.innerHTML; slot.hidden = false;
        const g = slot.closest('.cgrid'); if (g) packBoxes(g.parentNode || document);
      }, () => { if (sightRain.key === key) sightRain.list = []; });
    });
  }
  sightRain.fbox = fbox;
  if (!sightRain.list) return `<section class="cbox rainslot" data-k="${esc(key)}" hidden><h3 class="ch"></h3></section>`;
  const list = sightRain.list.slice().filter((x) => !(x.fam && x.fam.again === false)).sort((a, b) => (famLoved(b) ? 1 : 0) - (famLoved(a) ? 1 : 0) || b.fit - a.fit);
  if (!list.length || !sightRain.town) return '';
  const row = (x) => `<li class="nmrow"><span class="plen"><b>${emo((SIGHT_KINDS[x.kind] || ['📍'])[0])} ${esc(T(x.name))}</b>${famStar(x)}<small>${esc([T(x.area), (x.hrs < 1 ? Math.round(x.hrs * 60) + L(' นาที', ' min') : x.hrs + L(' ชม.', ' h')), T(x.price)].filter(Boolean).join(' · '))}</small></span>${navB(x.q || x.name.en, T(x.name))}</li>`;
  return fbox('blue', 'weather', L(`วันฝนตก: ในร่มแถวที่พัก · ${sightRain.town.th}`, `A rainy day: indoors near tonight’s bed · ${sightRain.town.en}`), esc(L(`${list.length} แห่ง`, `${list.length} place${list.length === 1 ? '' : 's'}`)),
    `<ul class="bedeats">${list.slice(0, 8).map(row).join('')}</ul><p class="label">${L('จากคลังที่เที่ยว เช็กกับเว็บแล้ว · เช็กเวลาเปิดก่อนไป', 'From the things-to-do library, web-checked · check the hours before you go')} · <a href="#/explore/${esc(list[0].tkey)}">${L('ดูทั้งหมด', 'See all')} ›</a></p>`);
}
function viewExplore(tk, tab) {
  const S2 = SIGHT;
  if (S2.towns === null) { S2.towns = 'loading'; api('GET', '/api/b/sights').then((r) => { S2.towns = r.towns || []; S2.total = r.total || 0; safeRender(); }, () => { S2.towns = []; safeRender(); }); }
  tk = tk || '';
  if (S2.town !== tk) {
    Object.assign(S2, { town: tk, list: null, kind: '', st: '', kid: '', io: false, free: false, wish: false, q: '', eats: null, day: null, seed: 0 });
    if (tk) api('GET', `/api/b/sights?town=${encodeURIComponent(tk)}`).then((r) => { if (S2.town === tk) { S2.list = r.sights || []; safeRender(); } }, () => { if (S2.town === tk) { S2.list = []; safeRender(); } });
  }
  const towns = Array.isArray(S2.towns) ? S2.towns : [], cur = towns.find((t) => t.tkey === tk), tname = (t) => L(t.town_th || t.town, t.town);
  const head = pageHead('plan', PG.teal, L('สำหรับทริปหน้า', 'For the next trip'), tk && cur ? esc(tname(cur)) : L('สำรวจเมือง', 'Explore a town'),
    tk ? '' : L('ที่เที่ยวในเมืองยอดนิยม แต่ละแห่งเช็กกับเว็บแล้ว บอกว่าเหมาะกับเด็กวัยไหน ในร่มหรือกลางแจ้ง รถเข็นไปได้ไหม — แตะ ♡ เก็บที่ที่อยากไป', 'Things to do in popular towns, each checked on the web — the ages it suits, indoors or out, pram or not. Tap ♡ to keep the ones we’d love to go to'));
  if (!tk) {
    if (S2.towns === 'loading') return `${head}<p class="label">${L('กำลังเปิดคลัง…', 'Opening the library…')}</p>`;
    if (!towns.length) return `${head}${emptyCard(null, L('ยังไม่มีเมืองในคลังที่เที่ยว', 'No towns in the library yet'), L('เมืองจะทยอยเข้ามาเมื่อเช็กกับเว็บครบ', 'Towns arrive as each one is checked on the web'))}`;
    const byC = new Map(); for (const t of towns) { const k = t.country ? L(t.country.th, t.country.en) : L('อื่นๆ', 'Elsewhere'); if (!byC.has(k)) byC.set(k, []); byC.get(k).push(t); }
    const wished = towns.reduce((n, t) => n + (t.wish || 0), 0);
    const chip = (t) => `<a class="plchip" href="#/explore/${esc(t.tkey)}"><b>${esc(tname(t))}</b><span class="label">${t.n}${t.wish ? ` · ♥ ${t.wish}` : ''}</span></a>`;
    return `${head}<div class="part pickh">${L(`${towns.length} เมือง · ${S2.total.toLocaleString()} ที่เที่ยว${wished ? ` · อยากไป ${wished} แห่ง` : ''}`, `${towns.length} towns · ${S2.total.toLocaleString()} things to do${wished ? ` · ${wished} on our wish list` : ''}`)}</div>
${[...byC.entries()].sort((a, b) => a[0].localeCompare(b[0], lang === 'en' ? 'en' : 'th')).map(([name, list], k) => `<section class="elgrp" style="--g1:${snapPal(k)}"><h3>${esc(name)}</h3><div class="plchips eltowns xptowns">${list.map(chip).join('')}</div></section>`).join('')}
<p class="label">${L('เมืองอื่นจะทยอยเพิ่มเมื่อเช็กกับเว็บครบ · ร้านอาหารของทุกเมืองอยู่ใน', 'More towns arrive as each is checked on the web · places to eat for every town are in')} <a href="#/eats">${L('คลังร้านอาหาร', 'the eat library')} ›</a></p>`;
  }
  const list = S2.list || [];
  const tabs = `<div class="xptabs" role="tablist"><a role="tab" href="#/explore/${esc(tk)}" aria-selected="${tab !== 'eat'}">🎒 ${L('ที่เที่ยว', 'Things to do')}${list.length ? ` · ${list.length}` : ''}</a><a role="tab" href="#/explore/${esc(tk)}/eat" aria-selected="${tab === 'eat'}">🍜 ${L('ร้านอาหาร', 'Places to eat')}</a><a role="tab" href="#/explore/${esc(tk)}/day" aria-selected="${tab === 'day'}">🗓️ ${L('จัดวันให้', 'Plan a day')}</a></div>`;
  if (tab === 'eat') return `${head}${tabs}${viewEats(tk, true)}`;
  if (tab === 'day') {   // a day built on the phone from the library: no helper call
    if (S2.eats === null) { S2.eats = 'loading'; api('GET', `/api/b/eatlib?town=${encodeURIComponent(tk)}`).then((r) => { if (S2.town === tk) { S2.eats = r.places || []; safeRender(); } }, () => { if (S2.town === tk) { S2.eats = []; safeRender(); } }); }
    const ready = Array.isArray(S2.list) && Array.isArray(S2.eats);
    if (ready && !S2.day) S2.day = buildDay(S2.list, S2.eats, S2.seed);
    return `${head}${tabs}<section class="eatpage explore">${ready ? pcard('today', PG.blue, L('วันหนึ่งในเมืองนี้ จัดตามวัยและแนวของเรา', 'A day here, for our ages and style'), `${dayHtml(S2.day)}<p class="label">🔒 ${L('จัดในเครื่องจากคลัง ไม่ใช้ผู้ช่วย · เวลาเป็นแนวทาง', 'Put together on this phone from the library — no helper call · times are a guide')}</p>`) : `<p class="label">${L('กำลังจัด…', 'Putting it together…')}</p>`}</section>`;
  }
  if (S2.list === null) return `${head}${tabs}<p class="label">${L('กำลังเปิด…', 'Opening…')}</p>`;
  const t = famTaste(), kidsY = children().map((c) => [c, kidYears(c)]).filter((p) => p[1] != null);
  const kinds = Object.keys(SIGHT_KINDS).filter((k) => list.some((x) => x.kind === k));
  const styles = TASTE_OUT.filter((g) => list.some((x) => (x.styles || []).includes(g[0]))).sort((a, b) => (t.out.like.includes(b[0]) ? 1 : 0) - (t.out.like.includes(a[0]) ? 1 : 0));
  const ch = (a, v, on, label) => `<button type="button" class="chip" data-a="${a}" data-v="${esc(v)}" aria-pressed="${on}">${label}</button>`;
  const bar = `<div class="eatbar xpbar"><input id="sightq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(S2.q)}" placeholder="${L('ค้นชื่อ ย่าน หรือสิ่งที่อยากทำ', 'Search a name, an area or something to do')}" aria-label="${L('ค้นที่เที่ยว', 'Search')}">
<div class="row chips" role="group">${ch('sightf', 'io', S2.io, `🌧️ ${L('ในร่ม (วันฝนตก)', 'Indoors (a rainy day)')}`)}${list.some(sightFree) ? ch('sightf', 'free', S2.free, `🆓 ${L('เข้าฟรี', 'Free')}`) : ''}${list.some((x) => x.wish) ? ch('sightf', 'wish', S2.wish, `♥ ${L('ที่อยากไป', 'Our wish list')}`) : ''}</div>
${kidsY.length ? `<div class="row chips" role="group"><span class="label">${L('เหมาะกับ', 'Suits')}</span>${kidsY.map(([c, y]) => ch('sightkid', c.slug, S2.kid === c.slug, `${esc(kidName(c.slug))} <span class="nowrap">(${esc(famAgeM(Math.floor(y * 12)))})</span>`)).join('')}</div>` : ''}
${kinds.length > 1 || styles.length > 1 ? `<details class="xpmore"${S2.kind || S2.st ? ' open' : ''}><summary>${L('ประเภทและแนว', 'Kind and style')}${S2.kind || S2.st ? ` · ${esc([S2.kind && L(SIGHT_KINDS[S2.kind][1], SIGHT_KINDS[S2.kind][2]), S2.st && ((g) => (g ? L(g[2], g[3]) : ''))(TASTE_OUT.find((g) => g[0] === S2.st))].filter(Boolean).join(' · '))}` : ''}${ic('chev', 'chv')}</summary>` : ''}
${kinds.length > 1 ? `<div class="row chips" role="group"><span class="label">${L('ประเภท', 'Kind')}</span>${ch('sightk', '', !S2.kind, L('ทั้งหมด', 'All'))}${kinds.map((k) => ch('sightk', k, S2.kind === k, `${emo(SIGHT_KINDS[k][0])} ${L(SIGHT_KINDS[k][1], SIGHT_KINDS[k][2])}`)).join('')}</div>` : ''}
${styles.length > 1 ? `<div class="row chips" role="group"><span class="label">${L('แนว', 'Style')}</span>${styles.map((g) => ch('sightst', g[0], S2.st === g[0], `${tPic(g)} ${L(g[2], g[3])}${t.out.like.includes(g[0]) ? ' 💛' : ''}`)).join('')}</div>` : ''}${kinds.length > 1 || styles.length > 1 ? '</details>' : ''}</div>`;
  // what fits first: the wish list, then our styles and the children's ages (the server's `fit`), then the order of the list
  const shown = list.filter(sightOk).map((x, k) => [x, k]).sort((a, b) => (b[0].wish ? 1 : 0) - (a[0].wish ? 1 : 0) || (b[0].fit || 0) - (a[0].fit || 0) || a[1] - b[1]).map((p) => p[0]);
  const q = S2.q.trim().toLowerCase(), sfz = fzFilter(shown.map(sightText), q), vis = shown.filter((x, i) => !q || sfz.ok(i)).length;
  return `${head}${tabs}${bar}<p class="label" id="sightn">${L(`แสดง ${vis} จาก ${list.length} แห่ง`, `Showing ${vis} of ${list.length}`)}</p>
<ul class="sightl">${shown.map((x) => sightCard(x).replace('<li class="sightc', `<li${q && !sfz.ok(shown.indexOf(x)) ? ' hidden' : ''} class="sightc`)).join('')}</ul>
<p class="empty" id="sightnone"${vis ? ' hidden' : ''}>${L('ไม่พบที่เที่ยวที่ตรงกับตัวกรอง', 'Nothing matches these filters')}</p>
<p class="label">${L('ทุกแห่งเช็กกับเว็บก่อนเข้าคลัง · ราคาและเวลาเปิดเปลี่ยนได้ เช็กซ้ำก่อนไป', 'Every place was checked on the web before it entered the library · hours and prices change, check again before you go')}</p>`;
}
function viewEats(tk, bare) {
  const el = eatLib;
  if (el.towns === null) { el.towns = 'loading'; api('GET', '/api/b/eatlib').then((r) => { el.towns = r.towns || []; el.on = !!r.on; safeRender(); }, () => { el.towns = []; safeRender(); }); }
  tk = tk || '';
  if (el.town !== tk) { el.town = tk; el.places = null; el.err = ''; eatQ = ''; eatKind = -1; eatPick = false; eatTrip = 'lib'; eatTags = new Set(); if (tk) api('GET', `/api/b/eatlib?town=${encodeURIComponent(tk)}`).then((r) => { if (el.town === tk) { el.places = r.places || []; safeRender(); } }, () => { if (el.town === tk) { el.places = []; safeRender(); } }); }
  const towns = Array.isArray(el.towns) ? el.towns : [], cur = towns.find((t) => t.tkey === tk), total = towns.reduce((n, t) => n + t.n, 0);
  const tname = (t) => L(t.town_th || t.town, t.town);
  const wait = el.busy ? `<div class="plwait" role="status"><span class="plspin" aria-hidden="true"></span><div><b>${L('ผู้ช่วยกำลังหาร้านและเช็กกับเว็บ…', 'The helper is finding places and checking them on the web…')}</b><small>${L('ราวหนึ่งนาที ส่งไปแค่ชื่อเมือง', 'About a minute — only the town’s name is sent')}</small></div></div>` : '';
  const head = `${pageHead('eat', PG.orange, L('สำหรับทริปหน้า', 'For the next trip'), L('คลังร้านอาหาร', 'Places to eat — our library'), L('ร้านจากทุกเล่มของเรา ร้านที่ผู้ช่วยหาแล้วเช็กกับเว็บ และคลังของแอปสำหรับเมืองยอดนิยมทั่วโลก เก็บไว้ใช้ตอนวางแผนทริปหน้า', 'The places from every book of ours, ones the helper found and checked on the web, and the app’s built-in list for popular towns around the world — kept for planning the next trip'))}`;
  // the towns: ours first (from our books and the helper's searches), then every country of the built-in list; a box filters in place
  const chip = (t) => `<a class="plchip" href="#/eats/${esc(t.tkey)}" data-s="${esc(`${t.town} ${t.town_th} ${t.country ? `${t.country.en} ${t.country.th}` : ''}`.toLowerCase())}" aria-current="${t.tkey === tk}"><b>${esc(tname(t))}</b><span class="label">${t.n}</span></a>`;
  const own = towns.filter((t) => t.own > 0), rest = towns.filter((t) => !t.own), byC = new Map();
  for (const t of rest) { const k = t.country ? L(t.country.th, t.country.en) : L('อื่นๆ', 'Elsewhere'); if (!byC.has(k)) byC.set(k, []); byC.get(k).push(t); }
  const groups = [...byC.entries()].sort((a, b) => a[0].localeCompare(b[0], lang === 'en' ? 'en' : 'th'));
  const chips = !towns.length ? '' : tk ? `<div class="plchips eltowns one" style="--g1:${PG.orange}"><a class="plchip" href="#/eats">‹ ${L('ทุกเมือง', 'All towns')}</a>${[...((cur && cur.country) ? rest.filter((t) => t.country && t.country.cc === cur.country.cc) : []), ...own].map(chip).join('')}</div>`
    : `<div class="elfind"><input id="eltq" class="field" type="search" enterkeyhint="search" autocomplete="off" placeholder="${L('ค้นเมืองหรือประเทศ เช่น โอซาก้า อิตาลี', 'Search a town or country — Osaka, Italy')}" aria-label="${L('ค้นเมือง', 'Search towns')}"></div>
${own.length ? `<section class="elgrp" style="--g1:${PG.orange}"><h3>${L('ของเรา', 'Ours')} <span class="label">${L('จากเล่มของเราและที่ผู้ช่วยหาให้', 'from our books and the helper’s searches')}</span></h3><div class="plchips eltowns">${own.map(chip).join('')}</div></section>` : ''}
${groups.map(([name, list], k) => `<section class="elgrp" style="--g1:${snapPal(k)}"><h3>${esc(name)}</h3><div class="plchips eltowns">${list.map(chip).join('')}</div></section>`).join('')}
<p class="empty" id="eltnone" hidden>${L('ไม่พบเมืองนี้ในคลัง — ให้ผู้ช่วยหาได้ด้านล่าง', 'Not in the library — the helper can find it below')}</p>`;
  const addCard = !el.on ? '' : pcard('find', PG.teal, L('เมืองที่ยังไม่มีในคลัง', 'A town not in the library yet'), `<div class="pform"><label class="vgl">${L('ชื่อเมือง (ใส่ประเทศด้วยก็ได้)', 'The town (add the country if you like)')}<input class="field" id="eltown" maxlength="80" value="${esc(el.add)}" placeholder="${L('เช่น โอซาก้า ญี่ปุ่น', 'e.g. Osaka, Japan')}"></label>
<button type="button" class="btn" data-a="eatlibfill"${el.busy ? ' disabled' : ''}>${ic('search')} ${L('ให้ผู้ช่วยหาร้านและเช็กกับเว็บ', 'Ask the helper to find and check places')}</button>
<p class="label">🔒 ${L('ส่งไปแค่ชื่อเมือง ไม่มีข้อมูลครอบครัว · ใช้ผู้ช่วย 1 ครั้งต่อเมือง', 'Only the town’s name is sent, nothing about the family · one helper call a town')}</p></div>`);
  const err = el.err ? `<div class="err plerr" role="alert">${esc(el.err)}</div>` : '';
  if (!tk) return `${head}${el.towns === 'loading' ? `<p class="label">${L('กำลังเปิดคลัง…', 'Opening the library…')}</p>` : towns.length ? `<div class="part pickh">${L(`${towns.length} เมือง · ${total.toLocaleString()} ร้าน — แตะเมืองเพื่อดู`, `${towns.length} towns · ${total.toLocaleString()} places — tap a town`)}</div>${chips}` : emptyCard(null, L('คลังยังว่าง', 'The library is empty'), L('ร้านจากเล่มของเราจะมาอยู่ที่นี่เอง', 'The places from our books will appear here by themselves'))}${wait}${err}${addCard}`;
  const places = el.places || [], kinds = [L('ร้านอาหาร', 'Restaurants'), L('ศูนย์อาหารและของกินเร็ว', 'Food courts & quick bites'), L('คาเฟ่ ขนม ของหวาน', 'Cafés & sweets')];
  // a town's places under the areas its book (or the helper) put them in, in the order they came
  const areas = []; for (const x of places) { const k = T(x.area) || ''; let g = areas.find((a) => a.k === k); if (!g) areas.push(g = { k, area: x.area, items: [] }); g.items.push(x); }
  const shown = places.filter((x) => eatShow({ area: x.area }, x) && eatTagOk(placeTags(x))).length;
  for (const g of areas) g.items = g.items.map((x, k) => [x, k]).sort((a, b) => tasteFitEat(b[0]) - tasteFitEat(a[0]) || a[1] - b[1]).map((p) => p[0]);   // our style first, the styles we avoid last
  return `${bare ? '' : head + chips}
<section class="eatpage ellist"><div class="part">${esc(cur ? tname(cur) : tk)} <span class="label">· ${L(`${places.length} ร้าน`, `${places.length} places`)}</span></div>
${el.places === null ? `<p class="label">${L('กำลังเปิด…', 'Opening…')}</p>` : `<div class="eatbar"><input id="eatq" class="field" type="search" enterkeyhint="search" autocomplete="off" value="${esc(eatQ)}" placeholder="${L('ค้นชื่อร้าน ย่าน หรือประเภท', 'Search a name, area or kind of food')}" aria-label="${L('ค้นร้าน', 'Search')}">
<div class="row chips" role="group"><button class="chip" data-a="eatk" data-v="-1" aria-pressed="${eatKind < 0}">${L('ทั้งหมด', 'All')}</button>${kinds.map((k, i) => (places.some((x) => x.kind === i) ? `<button class="chip" data-a="eatk" data-v="${i}" aria-pressed="${eatKind === i}">${k}</button>` : '')).join('')}</div>
${foodStyleBar(places)}${kidTagBar(places)}
<p class="label" id="eatn">${L(`แสดง ${shown} จาก ${places.length} ร้าน`, `Showing ${shown} of ${places.length}`)}</p></div>
${areas.map((g) => `<section class="eatg"${g.items.some((x) => eatShow(g, x) && eatTagOk(placeTags(x))) ? '' : ' hidden'}><h3>${esc(T(g.area) || (cur ? tname(cur) : ''))}</h3><ul class="eatl">${g.items.map((x) => eatLibCard(g, x, true)).join('')}</ul></section>`).join('')}
<p class="empty" id="eatnone"${shown || !places.length ? ' hidden' : ''}>${L('ไม่พบร้านที่ตรงกับคำค้น', 'No place matches')}</p>`}
${wait}${err}${el.on && cur ? `<div class="row elmore"><button type="button" class="btn ghost" data-a="eatlibfill" data-v="${esc(cur.town)}" data-th="${esc(cur.town_th)}"${el.busy ? ' disabled' : ''}>${ic('search')} ${L('ให้ผู้ช่วยหาร้านเพิ่มในเมืองนี้', 'Ask the helper for more places here')}</button></div>` : ''}
<p class="label">${L('ราคาและเวลาเปิดเปลี่ยนได้ เช็กซ้ำก่อนไป · แตะหมุดเพื่อเปิดแผนที่', 'Hours and prices change — check before you go · tap the pin for the map')}</p></section>`;
}
// the planner's route card: the library's places for each town we sleep in — a few to read, the rest one tap away, and "find
// places" for a town the library does not know yet. What is here goes into the book when it is written.
// the places this family went to and loved in a town of the route (E5, "เคยไปแล้วชอบ"): the eat library's (its own list) and the things
// to do (one ask for the whole route), each with our stars — shown at the head of the town's fold
let sightRoute = { key: '', list: null };
function plLoved(t, all) {
  const key = JSON.stringify(all.map((x) => [x.en, x.th]));
  if (sightRoute.key !== key) { sightRoute = { key, list: null }; api('GET', `/api/b/sights?for=${encodeURIComponent(key)}`).then((r) => { if (sightRoute.key === key) { sightRoute.list = r.for || []; if (route().parts[0] === 'planner') safeRender(); } }, () => { if (sightRoute.key === key) sightRoute.list = []; }); }
  const sg = ((sightRoute.list || []).find((x) => x.en === t.en) || {}).sights || [];
  const items = [...sg.filter(famLoved).map((x) => [T(x.name), x]), ...t.places.filter(famLoved).map((x) => [x.name, x])];
  if (!items.length) return '';
  return `<div class="pllove"><b>💛 ${L('เคยไปแล้วชอบ', 'We went and loved')}</b><span>${items.slice(0, 6).map(([nm, x]) => `${esc(nm)} <small>${x.fam.r ? '★'.repeat(x.fam.r) : '♥'}</small>`).join(' · ')}</span></div>`;
}
function planEatHtml(rt, on) {
  const stays = plStays(rt), pairs = [...new Map(stays.map((s) => [plNorm(s.town.en), [s.town.en, s.town.th]])).values()].filter((x) => x[0]), key = JSON.stringify(pairs);
  if (eatRoute.key !== key) { eatRoute = { key, list: null }; api('GET', `/api/b/eatlib?for=${encodeURIComponent(key)}`).then((r) => { if (eatRoute.key === key) { eatRoute.list = r.for || []; if (route().parts[0] === 'planner') safeRender(); } }, () => { if (eatRoute.key === key) eatRoute.list = []; }); }
  const list = eatRoute.list;
  if (!list) return '';
  const row = (x) => `<li><span class="plen"><b>${esc(x.name)}</b>${T(x.tag) ? `<small>${esc(T(x.tag))}${T(x.pr) ? ` · ${esc(T(x.pr))}` : ''}</small>` : ''}</span>${eatSt(x)}${extA(mapsUrl(x.q || x.name), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}</li>`;
  return `<div class="part pickh">${L('ที่กินตามเส้นทาง', 'Where to eat along the route')}</div><div class="pleat">${list.map((t) => { const n = t.places.length, tk = n ? t.places[0].tkey : '';
    const lv = plLoved(t, list);
    return `<details class="pleatt" open><summary><span class="plee" aria-hidden="true">${emo('🍜')}</span><span><b>${esc(L(t.th || t.en, t.en))}</b><small>${n ? L(`${n} ร้านในคลัง`, `${n} ${n > 1 ? 'places' : 'place'} in the library`) : L('ยังไม่มีร้านในคลัง', 'Not in the library yet')}</small></span>${ic('chev', 'chv')}</summary>
${lv}${n ? `<ul class="plel">${t.places.slice(0, 5).map(row).join('')}</ul><div class="row plem">${n > 5 ? `<a class="linkbtn" href="#/eats/${esc(tk)}">${L(`ดูทั้ง ${n} ร้าน`, `See all ${n}`)} ›</a>` : ''}${on ? `<button type="button" class="linkbtn" data-a="planeat" data-v="${esc(t.en)}" data-th="${esc(t.th)}"${eatLib.busy ? ' disabled' : ''}>${L('หาร้านเพิ่ม', 'Find more')}</button>` : ''}</div>`
    : on ? `<button type="button" class="btn ghost" data-a="planeat" data-v="${esc(t.en)}" data-th="${esc(t.th)}"${eatLib.busy ? ' disabled' : ''}>${ic('search')} ${L('ให้ผู้ช่วยหาร้านและเช็กกับเว็บ', 'Ask the helper to find and check places')}</button>` : ''}</details>`; }).join('')}</div>
${eatLib.busy ? `<div class="plwait" role="status"><span class="plspin" aria-hidden="true"></span><div><b>${L('ผู้ช่วยกำลังหาร้านและเช็กกับเว็บ…', 'The helper is finding places and checking them on the web…')}</b><small>${L('ราวหนึ่งนาที ส่งไปแค่ชื่อเมือง', 'About a minute — only the town’s name is sent')}</small></div></div>` : ''}
<p class="label">${L('ร้านในคลังของเมืองเหล่านี้จะถูกใส่ในเล่มให้ ·', 'The library’s places for these towns go into the book ·')} <a href="#/eats">${L('เปิดคลังร้านอาหาร', 'Open the library')}</a></p>`;
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
  return `${pageHead('relatives', PG.pink, L('ญาติที่ดูได้', 'Who can see the books'), L('กลุ่มญาติ', 'Family groups'), L('แต่ละกลุ่มมีรหัสหรือลิงก์ของตัวเอง เห็นเฉพาะเล่มที่ติ๊ก ดูอย่างเดียว ส่งหัวใจได้ · ลบกลุ่ม = ออกจากระบบทันที', 'Each group gets its own PIN or link and sees only the books ticked for it — read-only, hearts allowed · delete a group and its phones are signed out'))}
${vgJust ? `<div class="call pick vgjust"><span>🔢 ${L('รหัสของกลุ่ม', 'PIN for')} <b>${esc(vgJust.name)}</b></span><span class="vgpin">${esc(vgJust.pin)}</span><small>${L('จดไว้ส่งให้ญาติตอนนี้ — แอปจะไม่แสดงรหัสนี้อีก', 'Note it down and send it now — the app will not show it again')}</small></div>` : ''}
${vg === 'loading' ? `<div class="empty">${L('กำลังโหลด…', 'Loading…')}</div>` : list.length ? `<div class="vglist">${list.map(card).join('')}</div>` : `<div class="empty">${L('ยังไม่มีกลุ่ม — สร้างกลุ่มแรกด้านล่าง', 'No groups yet — make the first one below')}</div>`}
<section class="pcard vgform" style="--g1:${PG.pink}"><h3 class="pch"><span class="pcpic">${hubIc(f.id ? 'pencil' : 'relatives')}</span><span>${f.id ? L('แก้ไขกลุ่ม', 'Edit group') : L('สร้างกลุ่มใหม่', 'New group')}</span></h3>
<label class="vgl">${L('ชื่อกลุ่ม', 'Group name')}<input id="vgname" class="field" maxlength="40" data-draft="vg:name" value="${esc(drafts['vg:name'] ?? f.name)}" placeholder="${L('เช่น ฝั่งคุณยาย', 'e.g. Grandma’s side')}"></label>
<label class="vgl">${f.id ? L('รหัสใหม่ (ไม่ใส่ = ใช้รหัสเดิม)', 'New PIN (leave empty to keep it)') : L('รหัส 6–12 ตัวเลข (ไม่ใส่ = ญาติเข้าทางลิงก์อย่างเดียว)', 'PIN, 6–12 digits (empty = link only)')}<input id="vgpin" class="field" inputmode="numeric" maxlength="12" autocomplete="off" data-draft="vg:pin" value="${esc(drafts['vg:pin'] || '')}"></label>
<div class="vgl">${L('เห็นสมุดเล่มไหน', 'Books this group sees')}<div class="vgchecks">${trips.map((t) => `<label class="vgck"><input type="checkbox" data-a="vgtrip" data-v="${esc(t.id)}"${f.trips.includes(t.id) ? ' checked' : ''}> ${esc(T(t.title).split(' · ')[0])}</label>`).join('')}</div></div>
<label class="vgck"><input type="checkbox" data-a="vglink"${f.link ? ' checked' : ''}> 🔗 ${L('มีลิงก์ให้กดเข้าได้เลย (ไม่ต้องพิมพ์รหัส)', 'A link that opens without typing a PIN')}</label>
${f.id && f.hasLink ? `<label class="vgck"><input type="checkbox" data-a="vgnewlink"${f.newLink ? ' checked' : ''}> ♻️ ${L('เปลี่ยนเป็นลิงก์ใหม่ (ลิงก์เดิมจะใช้ไม่ได้)', 'Make a new link (the old one stops working)')}</label>` : ''}
<div class="row" style="margin-top:10px"><button class="btn" data-a="vgsave">${f.id ? L('บันทึก', 'Save') : L('สร้างกลุ่ม', 'Make the group')}</button>${f.id ? `<button class="btn ghost" data-a="vgcancel">${L('ยกเลิก', 'Cancel')}</button>` : ''}<span class="label" id="vgmsg"></span></div></section>`;
}

// lessons from each trip (owner, Nov 2026: "บทเรียนสำหรับทริปหน้า"; POST /api/b/lessons/:trip): what worked, what did not, what to try next
// time — written by the helper from the book's own notes, kept as entry kind 'lessons', changed like any text (blur saves)
function tripLessons() {
  if (!isEditor()) return '';
  const ai = S.features.story, rows = S.trips.filter((t) => tripOver(t) || entriesOf(t.id).some((e) => e.kind === 'lessons')).sort((a, b) => String(b.date_from).localeCompare(String(a.date_from)));
  const items = rows.map((t) => { const e = entriesOf(t.id).find((x) => x.kind === 'lessons'), has = e && e.text;
    if (!has && !ai) return '';
    return `<details class="lessonbook"${has ? ' open' : ''}><summary><b>${esc(T(t.title).split(' · ')[0])}</b> <span class="label">${esc(fmtRange(t))}</span>${ic('chev', 'chv')}</summary>
<textarea class="field lessontxt" id="lessons-${esc(t.id)}" rows="${has ? 9 : 3}" data-a-blur="lessons" data-t="${esc(t.id)}" placeholder="${L('ยังไม่มีบทเรียนของทริปนี้', 'No lessons for this trip yet')}">${esc(has ? e.text : '')}</textarea>
${ai ? `<div class="row"><button type="button" class="btn small" data-a="lessonsgo" data-t="${esc(t.id)}">✨ ${has ? L('ให้ผู้ช่วยสรุปใหม่', 'Ask the helper again') : L('ให้ผู้ช่วยสรุปบทเรียน', 'Ask the helper for the lessons')}</button><span class="label">${L('ส่งเฉพาะข้อความ ไม่ส่งรูป', 'Words only — never photos')}</span></div>` : ''}</details>`; }).join('');
  return items ? `<section class="blk lessonsblk"><h3>${ic('sparkle')} ${L('บทเรียนจากแต่ละทริป', 'Lessons from each trip')}</h3><p class="muted small">${L('ได้ผล · ไม่ค่อยได้ผล · ทริปหน้าลอง — จากรีวิว อารมณ์ของเด็ก และโน้ตในเล่มนั้น', 'What worked · what did not · try next time — from that book’s reviews, moods and notes')}</p>${items}</section>` : '';
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
  return `${pageHead('notebook', PG.orange, L('สมุดโน้ตนักเดินทาง', 'Travel notebook'), L('อะไรที่ครอบครัวเราชอบ', 'What works for our family'), L('รีวิวที่พัก ร้าน และสถานที่จากทุกเล่ม — ให้ดาวจากหน้าบันทึก แล้วใช้วางแผนทริปหน้า', 'Stays, food and places from every trip — rate them on each day’s Record page, then plan the next trip from here'))}
${likesBlock(rs.length)}
${tripLessons()}
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
const eatShow = (g, x) => (eatKind < 0 || eatKindOf(g, x) === eatKind) && (!eatPick || (x.pick || []).length) && (!eatQ || eatText(g, x).includes(eatQ.toLowerCase()) || !!fzFind(eatText(g, x), eatQ));
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
  // on the day itself (owner, Nov 2026: easy on the move): a meal already behind us folds to its one line and the one to eat now or next is
  // marked — "now" from its time until 90 minutes after. A meal's time is read in the zone of the timeline step at that time (Bangkok rows on day 1).
  const mst = []; if (now === i) { let found = false; const rows = (d.plan || {}).plan || [], mins = (z) => +z.slice(0, 2) * 60 + +z.slice(3);
    ps.forEach((p, n) => { const m = T(p.meal).match(/(\d{1,2}):(\d{2})/); if (!m) return; const at = m[1].padStart(2, '0') + ':' + m[2], rw = rows.find((y) => String(y.t || '').padStart(5, '0') === at), cur = mins(fmtTime(Date.now(), (rw && rw.tz) || t.timezone)), a = mins(at);
      if (found) return; if (a + 90 > cur) { mst[n] = a <= cur ? 'now' : 'next'; found = true; } else mst[n] = 'past'; }); }
  const meal = (p, n) => {
    const k = mealKind(p), [lbl, ...w] = T(p.meal).split(' · '), x = info(p.name), bx = p.alt && info(p.alt.name), ms = mst[n];
    const alsoAll = (meals[k] || []).map((m) => m.x).filter((x2, n, arr) => arr.indexOf(x2) === n && !eatSame(x2.name, p.name) && !(p.alt && eatSame(x2.name, p.alt.name)));
    const alsoHot = alsoAll.filter((x2) => hot.has(x2)), also = alsoHot.length ? alsoHot : alsoAll.slice(0, 4), alsoMore = alsoAll.length - also.length;   // on the day's route first; the rest sit in the areas below
    const head = `<span class="mtag">${esc(lbl)}</span>${w.length ? `<span class="mtime">${esc(w.join(' · '))}</span>` : ''}`;
    return `${ms === 'past' ? `<details class="emeal mk-${k} pastm"><summary class="eh3">${head}<span class="mname">${esc(p.name)}</span>${ic('chev', 'chv')}</summary>` : `<section class="emeal mk-${k}${ms ? ' nextm' : ''}"><h3 class="eh3">${head}${ms ? `<span class="nexttag">${ms === 'now' ? L('ตอนนี้', 'Now') : L('ถัดไป', 'Next')}</span>` : ''}</h3>`}
<div class="epick"><span class="elbl">★ ${L('ร้านแนะนำ', 'Our pick')}</span><div class="et"><b class="en">${mapA(p.q || p.name, esc(p.name))}</b>${goA(p.q || p.name, L('นำทาง', 'Go'))}</div>${T(p.what) ? `<p>${esc(T(p.what))}</p>` : x && T(x.what) ? `<p>${esc(T(x.what))}</p>` : ''}${facts(x) || T(p.pr) ? `<span class="echips">${facts(x) || `<span class="pr">${esc(T(p.pr))}</span>`}</span>` : ''}</div>
${p.alt ? `<ul class="erows"><li class="erow bk"><div><span class="elbl">${L('ร้านสำรอง', 'Backup')}</span><b>${p.alt.q || bx ? mapA(p.alt.q || p.alt.name, esc(p.alt.name)) : esc(p.alt.name)}</b>${T(p.alt.what) ? `<small>${esc(T(p.alt.what))}</small>` : bx && T(bx.what) ? `<small>${esc(T(bx.what))}</small>` : ''}${facts(bx) ? `<span class="echips">${facts(bx)}</span>` : ''}</div>${p.alt.q || bx ? goA(p.alt.q || p.alt.name) : ''}</li></ul>` : ''}
${also.length ? `<div class="ealso"><span class="elbl">${L('กินมื้อนี้ได้อีก', 'Also good for this meal')}</span><ul class="erows">${also.map((x2) => row(x2)).join('')}</ul>${alsoMore > 0 ? `<small class="emoren">${L(`อีก ${alsoMore} ร้านอยู่ในย่านด้านล่าง`, `${alsoMore} more under the areas below`)}</small>` : ''}</div>` : ''}${ms === 'past' ? '</details>' : '</section>'}`;
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
  if (eatTrip !== t.id) { eatTrip = t.id; eatQ = ''; eatKind = -1; eatPick = false; eatTags = new Set(); }   // filters belong to one book
  const r = eatData(t), all = eatCount(t), kinds = r.kinds || [];
  // one entry, laid out like the manual's "Where to eat" page: name · pin · address · type tag, a line, then price + when
  // one place as a small card: name + type on top, where it is, a line about it, then price / when + directions at the foot
  const card = (g, x) => `<li class="eatc${(x.pick || []).length ? ' pk' : ''}" data-s="${esc(eatText(g, x))}" data-k="${eatKindOf(g, x)}" data-p="${(x.pick || []).length ? 1 : 0}"${eatShow(g, x) ? '' : ' hidden'}>
${(x.pick || []).length ? `<div class="epk">${x.pick.map((k) => `<span>★ ${esc(T(k))}</span>`).join('')}</div>` : ''}
<div class="et"><b class="en">${mapA(x.q || x.name, esc(x.name))}</b>${extA(mapsUrl(x.q || x.name), `<span class="mpin" aria-hidden="true"></span><span class="vh">${L('แผนที่', 'Map')}</span>`, 'pinlink')}${T(x.tag) ? `<span class="etag t-${esc(x.tk || 'x')}">${esc(T(x.tag))}</span>` : ''}${x.tour ? `<span class="etag tour">${L('สายนักท่องเที่ยว', 'Tourist spot')}</span>` : ''}</div>
${x.zh || x.where ? `<div class="ew">${x.zh ? `<span class="zh">${esc(x.zh)}</span>` : ''}${x.where ? `<span>${esc(x.where)}</span>` : ''}</div>` : ''}
${T(x.what) ? `<p class="ed">${esc(T(x.what))}</p>` : ''}${T(x.why) ? `<p class="why"><b>${L('เหมาะกับเด็ก', 'For the kids')}</b> ${esc(T(x.why))}</p>` : ''}${kidTagChips(x)}
<div class="ef"><span class="echips">${T(x.pr) ? `<span class="pr">${esc(T(x.pr))}</span>${prThb(x)}` : ''}${T(x.note) ? `<span class="nt">${esc(T(x.note))}</span>` : ''}${T(x.hours) ? `<span class="hr">${esc(T(x.hours))}</span>` : ''}</span>${extA(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(x.q || x.name)}`, ic('route') + ' ' + L('นำทาง', 'Go'), 'go')}</div></li>`;
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
  const cards = $$('.eatc'), fz = fzFilter(cards.map((li) => li.dataset.s || ''), q), at = new Map(cards.map((li, i) => [li, i]));
  $$('.eatg').forEach((sec) => {
    let any = false;
    sec.querySelectorAll('.eatc').forEach((li) => { const ok = (eatKind < 0 || +li.dataset.k === eatKind) && (!eatPick || li.dataset.p === '1') && (!q || fz.ok(at.get(li))) && eatTagOk((li.dataset.t || '').split(' ').filter(Boolean)); li.hidden = !ok; if (ok) { any = true; n++; } });
    sec.hidden = !any;
  });
  const all = $$('.eatc').length, c = $('#eatn'), none = $('#eatnone');
  if (c) c.textContent = L(`แสดง ${n} จาก ${all} ร้าน`, `Showing ${n} of ${all}`) + (fz.near && n ? L(' · ผลที่ใกล้เคียง', ' · close matches') : '');
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
// a book from photos has no last day while it is open (today is always its last): its certificate comes when the parents close it
const certEarned = (t, kid) => !!(t.passport || {}).certificate && (t.kind === 'snap' ? !t.open : tripOver(t) || dayNow(t) === t.days.length - 1);
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
// the passport's ticks and boxes take a tap only when the book is open for writing (ppW: a parent, ✏️ on, never in kid mode)
let ppW = false, ppEditOn = false;
function tickBtn(t, kid, key, day, label, emoji, extra) {
  const on = ticked(t, key, kid), ed = ppW;
  return `<button class="tick${on ? ' on' : ''}" data-a="tick" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="${day === null ? '' : day}" aria-pressed="${!!on}"${ed ? '' : ' disabled'}>
<i>${on ? '✓' : ''}</i>${emoji ? `<span class="e">${esc(emoji)}</span>` : ''}<span class="t">${esc(label)}${extra || ''}</span></button>`;
}
function yumBtns(t, kid, key) {
  const cur = ticked(t, key, kid), ed = ppW;
  return `<span class="yum">${[['yum', '😋', L('อร่อย', 'Yum')], ['yuck', '😖', L('ไม่ชอบ', 'Yuck')]].map(([v, e, lbl]) => `<button data-a="tick" data-yum="${v}" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="" aria-pressed="${!!cur && cur.text === v}" aria-label="${lbl}"${ed ? '' : ' disabled'}>${e}</button>`).join('')}</span>`;
}
function starBtns(t, kid, key) {
  const cur = ticked(t, key, kid), n = cur ? +cur.text || 0 : 0, ed = ppW;
  return `<span class="stars">${[1, 2, 3].map((v) => `<button data-a="tick" data-yum="${v}" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${esc(key)}" data-d="" aria-pressed="${v <= n}" aria-label="${v} ★"${ed ? '' : ' disabled'}>★</button>`).join('')}</span>`;
}
/* One kids' passport per child, in one place (owner, Nov 2026: "อยากให้ทำแล้วจบในที่เดียวเลย อย่าซ้ำซ้อนหลายที่มันจะเหนื่อย"): a book shown a
   page at a time — cover · Explorer ID (with the height line across every trip) · a visa per trip (today's stamp on this trip's) · daily
   missions · the map · my lists · stickers · trophies and firsts · the certificate. Two doors, one function: the shelf's passport cards
   (grown-ups; ✏️ opens the boxes and ticks for parents) and kid mode's 🛂 / ⭐ / 🏆 (locked, every page read aloud). Swipe, ‹ › or the
   page tabs turn the pages. #/passport/<kid>[/<trip>][/<page>] · #/kid/<kid>/stamp | stickers | trophies | pass/<page>.
   The height lives only in the Explorer ID (height_first / height_last); the old "Growing up" row (`height`) is read only when a restored
   backup brings one back (migration 0042 moved them). */
const ppHeight = (t, kid) => { for (const k of ['height_last', 'height_first', 'height']) { const v = fzHeight(fieldVal(t, k, kid)); if (v > 30 && v < 220) return Math.round(v * 10) / 10; } return null; };
const ppTrips = (slug) => kidTrips(slug).slice().sort((a, b) => String(a.date_from).localeCompare(String(b.date_from)));
const ppShort = (t) => T(t.title).split(' · ')[0];
function ppPages(t, kid) {
  const pp = t.passport || {};
  return [['cover', '📘', L('ปก', 'Cover')], ['id', '🪪', L('บัตรนักสำรวจ', 'Explorer ID')]]
    .concat(ppTrips(kid).map((x) => [`visa-${x.id}`, '🛂', L(`วีซ่า ${ppShort(x)}`, `${ppShort(x)} visa`)]))
    .concat([(pp.days || []).length ? ['missions', '🎯', L('ภารกิจรายวัน', 'Daily missions')] : null, ['map', '🗺️', pp.map ? L('แผนที่', 'Map') : L('เรานอนที่ไหน', 'Where we sleep')],
      kidLists(t, kid).length || littleOf(t, kid) || pp.declaration ? ['lists', '✅', L('รายการของหนู', 'My lists')] : null,
      ['stickers', '⭐', L('สติกเกอร์', 'Stickers')], ['trophies', '🏆', L('รางวัล', 'Trophies')], pp.certificate ? ['cert', '📜', L('ใบประกาศ', 'Certificate')] : null].filter(Boolean));
}
// where a page lives: the grown-ups' address, or kid mode's (this trip's visa is the old stamp page, stickers and trophies keep their names)
const ppHref = (kid, t, key, kidMode) => (kidMode ? `#/kid/${kid}/${key === `visa-${t.id}` ? 'stamp' : key === 'stickers' || key === 'trophies' ? key : 'pass/' + key}` : `#/passport/${kid}/${t.id}/${key}`);
// the tab row shows the page open now (it scrolls sideways on a phone)
function ppTabsShow(root) { const pc = $('.pptabs [aria-current]', root); if (pc) pc.parentElement.scrollLeft = pc.offsetLeft - pc.parentElement.offsetLeft - 24; }
const PP_ART = { map: 'map', stickers: 'stickers', trophies: 'trophies' };   // kid mode's own bar pictures for those pages; the visas wear the passport
function viewPassport(slug, tid, page0, kidMode) {
  const ks = children(), k = ks.find((c) => c.slug === slug) || ks[0];
  if (!k) return emptyCard(null, L('ยังไม่มีเด็กในครอบครัว', 'No children yet'), '');
  const mine = kidTrips(k.slug), t = kidMode ? kidTrip(k.slug) : mine.find((x) => x.id === tid) || (mine.includes(curTrip()) ? curTrip() : mine[0]);
  if (!t) return emptyCard(null, L('ยังไม่มีเล่ม', 'No books yet'), '');
  const pp = t.passport || {}, g = pp.guides || [], kid = k.slug, name = kidName(kid), st = pp.style;
  ppW = isEditor() && ppEditOn && !kidMode;
  const ed = ppW, canEdit = isEditor() && !kidMode;
  const pages = ppPages(t, kid), keys = pages.map((p) => p[0]);
  const page = keys.includes(page0) ? page0 : page0 === 'visa' || page0 === 'stamp' ? `visa-${t.id}` : 'cover', at = keys.indexOf(page), cur = pages[at];
  const fill = (x) => String(x || '').replace(/\{name\}/g, name).replace(/\{KID\}/g, (k.name_en || kid).toUpperCase());   // seed text templates
  const age = ((t.theme.children || []).find((c) => c.slug === kid) || {}).age;
  const firsts = entriesOf(t.id).filter((e) => e.kind === 'first' && e.child === kid);
  const words = entriesOf(t.id).filter((e) => e.kind === 'quote' && (e.child === kid || e.child === 'both')).sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) || b.at - a.at);
  const year = t.date_from.slice(0, 4), lit = littleOf(t, kid);
  const guide = (i) => g[i] ? `<img class="guide" src="${esc(g[i].art)}" alt="${esc(T(g[i].name))}">` : '';
  // blank boxes like the printed passport (no "e.g." hints); a height box shows its unit beside it
  const field = (key, label, unit) => `<div><dt>${label}</dt><dd${unit ? ' class="unitd"' : ''}>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="${key}" data-draft="pf:${esc(t.id)}:${kid}:${key}" value="${esc(drafts[`pf:${t.id}:${kid}:${key}`] ?? fieldVal(t, key, kid))}" maxlength="60"${unit ? ' inputmode="decimal"' : ''}>${unit ? `<span class="unit">${unit}</span>` : ''}` : esc(fieldVal(t, key, kid)) ? esc(fieldVal(t, key, kid)) + (unit && !/[a-zก-๙]/i.test(fieldVal(t, key, kid)) ? ' ' + unit : '') : '—'}</dd></div>`;
  const hear = (line) => (kidMode ? `<div class="kidguide">${guide(at % 2)}<p>${line}</p></div>` : '');
  const sayBtn = (line) => `<button class="mini hearbtn ppsay" data-a="sayfacts" data-v="${esc(line)}" aria-label="🔊 ${L('อ่านให้ฟัง', 'Read aloud')}">🔊</button>`;
  // a page's heading: its title, 🔊 (read aloud), and for a parent the ✏️ switch where the page has boxes or ticks
  const head = (title, line, edits) => `<header class="pphd"><h2>${title}</h2>${kidMode ? '' : sayBtn(line)}${edits && canEdit ? `<button class="mini ppedit" data-a="ppedit" aria-pressed="${ppEditOn}">✏️ ${ppEditOn ? L('เสร็จแล้ว', 'Done') : L('แก้ไข', 'Edit')}</button>` : ''}</header>`;
  let body = '';

  if (page === 'cover') {
    const line = L(`พาสปอร์ตนักผจญภัยของ${name}`, `${name}'s adventure passport`);
    body = `${hear(esc(line))}<div class="pp kid-${esc(kid)}${t.theme.display === 'serif' ? ' serif' : ''}" style="${themeStyle(t)}">
${st ? `<section class="advc" style="--ink:${esc(st.ink)};--hi:${esc(st.hi)};--bgA:${esc(st.bgA)};--bgB:${esc(st.bgB)};--gold:${esc(st.gold)}"><div class="card">
${st.crest ? `<img class="crest" src="${esc(st.crest)}" alt="">` : `<span class="crest nocrest">${stampHtml(t, true)}</span>`}
<div class="kick">${L('พาสปอร์ตนักผจญภัยของเด็กๆ', 'Kids adventure passport')}</div>
<h2>${esc(st.title.replace(new RegExp(`\\s*${st.hl}$`), ''))} <em>${esc(st.hl)}</em></h2>
<p class="sub">${esc(fill(T(st.sub)))}</p>
<div class="guides2">${g.map((x, i) => guide(i)).join('')}</div>
<p class="places">${esc(T(st.places))}</p>
<div class="xbox"><span>${L('นักสำรวจ', 'Explorer')}</span><b>${kidFace(kid)} ${esc(name)}</b></div>
<div class="foot"><span>${L('เลขที่พาสปอร์ต', 'Passport No.')} <b>${esc(fill(pp.code))}</b></span><span>${L('ใช้ได้', 'Valid')} <b>${esc(fmtRange(t))}</b></span></div>
</div></section>` : `<section class="ppc"><span class="emb">${kidArt(kid) ? `<img src="${kidArt(kid)}" alt="">` : '🌏'}</span><b>${L('พาสปอร์ตนักผจญภัย', 'Adventure Passport')}</b><span class="sub">${esc(ppShort(t))} · ${flagsOf(t)}</span>
<span class="explorer">★ ${L('นักสำรวจ', 'Explorer')} ★</span><span class="nm">${esc(name)}</span>
<small>${pp.code ? `${L('เลขที่', 'No.')} ${esc(fill(pp.code))} · ` : ''}${L('ใช้ได้', 'Valid')} ${esc(fmtRange(t))}</small></section>`}
${g.length ? `<section class="pp-page guides"><header><div><div class="kicker">${L('ไกด์สองคนของหนู', 'Meet your two guides')}</div><h3>${esc(pp.greeting ? fill(T(pp.greeting)) : L(`สวัสดี ${name}!`, `Hello, ${name}!`))}</h3></div></header>
${g.map((x, i) => `<div class="bubble${i % 2 ? ' r' : ''}">${guide(i)}<div><b>${esc(T(x.name))} ${L('บอกว่า…', 'says…')}</b><p>${esc(fill(T(x.hello)))}</p><button class="mini hearbtn" data-a="sayfacts" data-v="${esc(fill(T(x.hello)))}">🔊 ${L('อ่านให้ฟัง', 'Read aloud')}</button></div></div>`).join('')}</section>` : ''}</div>`;
  } else if (page === 'id') {
    // the Explorer ID: the one place a child's height is typed (the day-1 and last-day boxes, as printed) — and the line of it across every trip
    const books = ppTrips(kid), mOf = (x) => { const [y, mm] = String(x.date_from || '').split('-').map(Number); return y ? y * 12 + mm : null; };
    const pts = books.map((x) => ({ x, h: ppHeight(x, kid), m: mOf(x), age: growAgeM(k, x) })).filter((p) => p.h && p.m != null);
    let chart = '';
    if (pts.length >= 2) {
      const W = 320, H = 150, P = 26, m0 = Math.min(...pts.map((p) => p.m)), m1 = Math.max(...pts.map((p) => p.m)), h0 = Math.min(...pts.map((p) => p.h)) - 4, h1 = Math.max(...pts.map((p) => p.h)) + 4;
      const X = (m) => P + ((m - m0) / Math.max(1, m1 - m0)) * (W - 2 * P), Y = (h) => H - P + 6 - ((h - h0) / Math.max(1, h1 - h0)) * (H - 2 * P);
      const grew = (pts[pts.length - 1].h - pts[0].h).toFixed(1).replace(/\.0$/, '');
      chart = `<svg class="grchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${L('กราฟส่วนสูง', 'Height chart')}">
<polyline points="${pts.map((p) => `${X(p.m).toFixed(1)},${Y(p.h).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--g1)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
${pts.map((p) => `<circle cx="${X(p.m).toFixed(1)}" cy="${Y(p.h).toFixed(1)}" r="7" fill="#fff" stroke="var(--g1)" stroke-width="3"/><text x="${X(p.m).toFixed(1)}" y="${(Y(p.h) - 13).toFixed(1)}" text-anchor="middle" class="grv">${p.h}</text><text x="${X(p.m).toFixed(1)}" y="${H - 4}" text-anchor="middle" class="gra">${esc(p.age != null ? famAgeM(p.age) : fmtDay(p.x.date_from, { month: 'short', year: '2-digit' }))}</text>`).join('')}</svg>
<p class="muted small">${L(`จาก ${pts[0].h} เป็น ${pts[pts.length - 1].h} ซม. สูงขึ้น ${grew} ซม.`, `From ${pts[0].h} to ${pts[pts.length - 1].h} cm — ${grew} cm taller`)}</p>`;
    }
    // trip by trip: the character as drawn for that trip, the age then, the height, the firsts and one of the child's words
    const rows = books.map((x, i) => {
      const m = growAgeM(k, x), h = ppHeight(x, kid), art = kidArt(kid, true, x);
      const fe = entriesOf(x.id).filter((e) => e.kind === 'first' && (e.child === kid || e.child === 'both')).map((e) => { const f = (x.firsts || []).find((y) => y.key === e.first_key); return f ? f.emoji : '⭐'; }).slice(0, 10);
      const q = entriesOf(x.id).filter((e) => e.kind === 'quote' && e.text && (e.child === kid || e.child === 'both')).sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))[0];
      const inner = `<div class="grart">${art ? `<img src="${esc(art)}" alt="">` : kidFace(kid)}</div><div class="grtx"><b>${esc(ppShort(x))}</b><small>${esc(fmtRange(x))}</small>
<div class="grfacts">${m != null ? `<span class="grchip">🎂 ${esc(famAgeM(m))}</span>` : ''}${h ? `<span class="grchip">📏 ${h} ${L('ซม.', 'cm')}</span>` : ''}</div>
${fe.length ? `<div class="grfirst" title="${L('เหรียญครั้งแรก', 'Firsts')}">${fe.map((e) => `<span>${emo(e)}</span>`).join('')}</div>` : ''}${q ? `<p class="grq">“${emoIn(esc(q.text))}”</p>` : ''}</div>`;
      return `<li class="growi pz${x.id === t.id ? ' cur' : ''}" style="--g1:${Object.values(PG)[i % 8]}">${kidMode || x.id === t.id ? inner : `<a class="grgo" href="${esc(ppHref(kid, x, 'id', false))}">${inner}</a>`}</li>`;
    }).join('');
    const line = L(`นี่คือบัตรนักสำรวจของ${name}`, `This is ${name}'s explorer card`);
    body = `${hear(esc(line))}${head(L('บัตรนักสำรวจ', 'Explorer ID'), line, true)}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}">
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
<div class="mrz" aria-hidden="true">${esc(`P<${(pp.code || 'MB').split('-')[0]}<<${(k.name_en || kid).toUpperCase().replace(/[^A-Z]/g, '')}<<EXPLORER<<${year}`.padEnd(40, '<'))}</div></section>
<section class="pp-page grow" style="--g1:${PG.lime}"><header><div><div class="kicker">${L('โตขึ้นทีละทริป', 'Growing up, trip by trip')}</div><h3>📏 ${L(`${esc(name)} โตขึ้นทีละทริป`, `${esc(name)}, trip by trip`)}</h3></div></header>
${chart}<ol class="growl">${rows}</ol>
${canEdit && pts.length < 2 ? `<p class="muted small">${L('ใส่ส่วนสูงในบัตรนักสำรวจของแต่ละเล่ม (กด ✏️) แล้วเส้นการเติบโตจะขึ้นเมื่อมีสองทริปขึ้นไป', 'Note the height in each book’s Explorer ID (tap ✏️) — the growth line appears once two trips have one')}</p>` : ''}</section></div>`;
  } else if (page.startsWith('visa-')) {
    // a visa per trip: a stamp a day (inked once the day has anything recorded or is Done), the library's city stamps, and on this trip today's stamp button
    const x = mine.find((y) => `visa-${y.id}` === page) || t, xp = x.passport || {}, got = x.days.filter((_, i) => dayStamped(x, i)).length;
    const seen = new Set(ls('seen') || []), fresh = [];
    const ds = x.days.map((d, i) => {
      const on = dayStamped(x, i), id = `${x.id}:${i}`, isNew = on && !seen.has(id);
      if (isNew) fresh.push(id);
      return `<div class="dstamp${on ? ' on' : ''}${isNew ? ' new' : ''}" style="--r:${((i * 37 + x.id.length * 11) % 17) - 8}deg;--d:${Math.min(fresh.length, 12) * 90}ms" title="${esc(T(d.title))}">${artImg(x, i)}<small>${esc(((xp.days || [])[i] || {}).stamp || fmtDay(d.date, { day: 'numeric', month: 'short' }))}</small></div>`;
    }).join('');
    if (fresh.length) ls('seen', [...seen, ...fresh]);
    // the stamp ceremony (kid mode's old stamp page): on this trip, in kid mode on the picked day (not before the trip), for a parent on a trip day
    const si = x.id !== t.id ? -1 : kidMode ? (preTrip(t) ? -1 : kidDayOf(t)) : isEditor() && dayNow(t) >= 0 ? dayNow(t) : -1;
    let stamp = '';
    if (si >= 0) {
      const mineS = ticked(t, `stamp.d${si}`, kid), sd = t.days[si], spd = (pp.days || [])[si] || {};
      stamp = `<div class="ppstamp"><div class="kidstamp${mineS ? ' done' : ''}" id="kidstamp"><div class="ring"><span class="lbl">${esc(spd.stamp || fmtDay(sd.date, { day: 'numeric', month: 'short' }))}</span>${artImg(t, si, 'inked')}</div></div>
<div class="kidguide pop" id="kidcheer" ${mineS ? '' : 'hidden'}>${guide(0)}<p>${L(`เก่งมาก ${name}! ได้ตราวันนี้แล้ว`, `Well done, ${name}! Today's stamp is yours`)}</p></div>
<button class="kidbig stampbtn" data-a="kidstamp" data-t="${esc(t.id)}" data-d="${si}" data-k="${esc(kid)}">${mineS ? L('ปั๊มอีกที! 🛂', 'Stamp again! 🛂') : L('ปั๊มตรา! 🛂', 'Stamp! 🛂')}</button></div>`;
    }
    const line = si >= 0 && !ticked(t, `stamp.d${si}`, kid) ? L(`มาปั๊มตราวันนี้กัน ${name}!`, `Let's stamp today, ${name}!`) : got ? L(`ทริป${ppShort(x)} ได้ตราแล้ว ${got} ดวง`, `${ppShort(x)}: ${got} stamp${got > 1 ? 's' : ''} so far`) : L(`ตราของทริป${ppShort(x)} รอหนูอยู่`, `The stamps of ${ppShort(x)} are waiting for you`);
    body = `${hear(esc(line))}${stamp}<div class="pp kid-${esc(kid)}" style="${themeStyle(x)}">
<section class="pp-page visa"><header><div><div class="kicker">${L('วีซ่า', 'Visa')} · ${esc(fmtRange(x))}</div><h3><span class="vflags">${flagsOf(x)}</span> ${esc(ppShort(x))}</h3>
<p class="label">${((x.theme.places || []).map((p) => esc(T(p))).join(' · ')) || esc(T(x.sub))}${got ? ` · ${L(`ได้ตราแล้ว ${got}`, `${got} stamp${got > 1 ? 's' : ''}`)}` : ''}</p></div>${stampHtml(x, false)}${kidMode ? '' : sayBtn(line)}</header>
<div class="dstamps">${ds}</div>
${cityStampsHtml(x)}<p class="label" style="margin-top:10px">${L('ได้ตราเมื่อวันนั้นมีบันทึก หรือกด "จบวันนี้"', 'A stamp is inked when the day has something recorded or is marked Done')}</p></section></div>`;
  } else if (page === 'missions') {
    const feel = [['🤩', L('สุดยอด', 'Super')], ['😄', L('มีความสุข', 'Happy')], ['😴', L('ง่วงนอน', 'Sleepy')]];
    const mood = (i) => (S.entries.find((e) => e.id === `${t.id}.mood.d${i}.${kid}`) || {}).mood;
    const liveDay = dayNow(t);   // -1 before and after the trip
    // before the trip only one mission is open — the day chosen on the chips (day 1 to start); after the trip all open (owner's review, Nov 2026: 13,000 px of missions months ahead)
    const pre = liveDay < 0 && daysUntil(t) > 0, pick = pre ? (mdayPick[t.id] ?? 0) : -1;
    const missions = (pp.days || []).map((pd, i) => {
      const d = t.days[i]; if (!d) return '';
      const spots = daySpots(t, i, kid), n = spots.filter((s) => ticked(t, s.key, kid)).length;
      const pl = d.plan || {}, facts = (pd.facts || []).concat((pl.learn || []).map((y) => y.kid).filter(Boolean));   // the guide's facts + one line per stop from the manual
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
    const line = L(`ภารกิจรายวันของ${name}`, `${name}'s daily missions`);
    body = `${hear(esc(line))}${head(L('ภารกิจรายวัน', 'Daily missions'), line, true)}
${pre ? `<div class="mapdays mdays" role="group" aria-label="${L('เลือกวัน', 'Pick a day')}"><span class="label">${L('วันที่', 'Day')}</span>${(pp.days || []).map((_, i) => (t.days[i] ? `<button type="button" class="chip" data-a="mday" data-t="${esc(t.id)}" data-v="${i}" aria-pressed="${i === pick}">${i + 1}</button>` : '')).join('')}</div>` : ''}<div class="missions" style="${themeStyle(t)}">${missions}</div>`;
  } else if (page === 'map') {
    const mdSet = ppMapDay && ppMapDay.t === t.id, md = mdSet ? ppMapDay.d : mapDayOf(t), mdPre = !mdSet && preTrip(t);   // the day the map shows (a tapped day, else today)
    const stopQ = (s) => { const m = ((pp.map || {}).stops || []).find((y) => y.en === s.en); return m && m.q; };   // "Where we go" names open the real place
    const line = pp.map ? L('แผนที่การเดินทางของเรา', 'Our travel map') : L('เรานอนที่ไหนบ้าง', 'Where we sleep');
    body = `${hear(esc(line))}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}">
${pp.map ? `<section class="pp-page mapsec"><header><div><div class="kicker">${L('แผนที่', 'Map')} · ${L('วันที่', 'Day')} ${md + 1}</div><h3>🗺️ ${esc(T(pp.map.title))}</h3></div>${kidMode ? '' : sayBtn(line)}</header>${mapHtml(t, md, [kid].concat((t.theme.children || []).map((c) => c.slug).filter((s) => s !== kid)), mdPre ? 0 : null)}
<div class="mapdays" role="group" aria-label="${L('เลือกวัน', 'Pick a day')}"><span class="label">${L('วันที่', 'Day')}</span>${t.days.map((_, d) => `<button class="chip" data-a="ppmapday" data-t="${esc(t.id)}" data-v="${d}" aria-pressed="${d === md}">${d + 1}</button>`).join('')}</div>
<p class="label" style="margin-top:8px">${L('เส้นทึบ = ไปแล้ว · แตะวันให้เด็กเดินตาม · แตะหมุดเพื่อนำทาง', 'Solid line = been there · tap a day to walk the kids there · tap a pin for the real map and directions')}</p></section>` : ''}
${pp.pins ? `<section class="pp-page sleep"><header><div><div class="kicker">${esc(T(pp.pins.sub)) || `${L('หมุด', 'Hops')} · ${pp.pins.items.length}`}</div><h3>📍 ${esc(T(pp.pins.title))}</h3></div></header>
<ol>${pp.pins.items.map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${stopQ(s) && !kidMode ? mapA(stopQ(s), esc(T(s))) : esc(T(s))}</b><small>${esc(T(s.days))}</small></span><span class="pe">${esc(s.e)}</span></li>`).join('')}</ol></section>`
    : `<section class="pp-page sleep"><header><div><div class="kicker">${L('ที่พัก', 'Hops')} · ${sleepStops(t).length}</div><h3>🛏️ ${L('เรานอนที่ไหนบ้าง', 'Where we sleep')}</h3></div></header>
<ol>${sleepStops(t).map((s, n) => `<li><span class="n">${n + 1}</span><span class="t"><b>${esc(s.name)}</b><small>${L('คืนที่', s.days.length > 1 ? 'Nights' : 'Night')} ${s.label}</small></span>${artImg(t, s.art)}</li>`).join('')}</ol></section>`}</div>`;
  } else if (page === 'lists') {
    // checklists: animals, food (yum / yuck), Master Explorer. The tasting card draws each dish from the food library (kid.js gE) when its emoji has a picture
    const lists = kidLists(t, kid).map((l) => {
      const n = listGot(t, l, kid), goal = l.goal || 0;
      const rated = l.yum || l.stars, note = (it) => `${it.note ? `<small>${esc(T(it.note))}</small>` : ''}${it.say ? `<small class="say">“${esc(it.say)}”</small>` : ''}`;
      const GC = [['#2E7D32', '#E6F6EA'], ['#1565C0', '#E3F2FD'], ['#A16207', '#FFF6D6']];   // Spotted / Rides / Yummy columns, as printed
      const lb = l.groups.map((gr, gi) => `<div class="grp"${l.groups.length > 1 ? ` style="--ma:${GC[gi % 3][0]};--mt:${GC[gi % 3][1]}"` : ''}>${gr.title ? `<h5>${esc(gr.e || '')} ${esc(T(gr.title))}</h5>` : ''}<div class="ticks${rated || l.said ? ' food' : ''}">${gr.items.map((it) => rated
        ? `<div class="tick${ticked(t, `${l.key}.${it.k}`, kid) ? ' on' : ''}"><span class="e">${typeof gFood === 'function' ? gFood(it.e, it.art) : esc(it.e || '')}</span><span class="t">${esc(T(it))}${it.speak ? ` <span class="zh">${esc(it.speak.text)}</span>` : ''}${note(it)}</span>${it.speak ? `<button class="hearbtn round" data-a="hear" data-v="${esc(it.speak.text)}" data-lang="${esc(it.speak.lang)}" aria-label="🔊 ${esc(it.en)}">🔊</button>` : ''}${l.stars ? starBtns(t, kid, `${l.key}.${it.k}`) : yumBtns(t, kid, `${l.key}.${it.k}`)}</div>`
        : l.said && it.speak ? `<div class="sayrow">${tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))}<button class="hearbtn round" data-a="hear" data-v="${esc(it.speak.text)}" data-lang="${esc(it.speak.lang)}" aria-label="🔊 ${esc(it.en)}">🔊</button></div>`
        : tickBtn(t, kid, `${l.key}.${it.k}`, null, T(it), it.e, note(it))).join('')}</div></div>`).join('');
      return `<section class="pp-page plist${l.groups.length > 1 ? ' wide' : ''}" id="pl-${esc(l.key)}"><header><div><div class="kicker">${esc(l.e || '')} ${esc(T(l.sub))}</div><h3>${esc(T(l.title))}</h3></div>${n ? `<span class="count">⭐${n}</span>` : ''}</header>
${lb}
${!goal && l.goalText ? `<p class="call calm" style="margin-top:12px">${esc(T(l.goalText))}</p>` : ''}${l.said && ed ? `<p class="label" style="margin-top:8px">${L('ติ๊กเมื่อหนูพูดคำนั้นได้แล้ว', 'Tick it when you have said it!')}</p>` : ''}</section>`;
    }).join('');
    const dc = lit ? null : pp.declaration;
    // the little one: the words they say on the trip (quotes for this child), with a box to add one — instead of the customs form
    const myWords = words.filter((e) => e.child === kid);
    const littleHtml = lit ? `<section class="pp-page lwords" id="lwords"><header><div><div class="kicker">🗣️ ${esc(fill(T((lit.words || {}).sub)))}</div><h3>${esc(fill(T((lit.words || {}).title) || L('คำใหม่', 'New words')))}</h3></div>${myWords.length ? `<span class="count">${myWords.length}</span>` : ''}</header>
${ed ? `<div class="row lwrow"><input class="field" id="lw-${esc(kid)}" maxlength="120" placeholder="${esc(L('เช่น “ปา” “บ๊ายบาย” “น้ำ”', 'e.g. “dada”, “bye-bye”, “water”'))}" data-draft="lw:${esc(t.id)}:${esc(kid)}" value="${esc(drafts[`lw:${t.id}:${kid}`] || '')}"><button class="btn small" data-a="littleword" data-t="${esc(t.id)}" data-k="${esc(kid)}">＋ ${L('จดคำนี้', 'Add the word')}</button></div>` : ''}
${myWords.length ? `<ul class="lwl">${myWords.map((e) => `<li><b>“${emoIn(esc(e.text))}”</b><small class="label">${L('วันที่', 'Day')} ${e.day + 1}</small></li>`).join('')}</ul>` : `<p class="empty">${L(`คำแรกที่${esc(name)}พูดในทริปจดไว้ตรงนี้`, `The first word ${esc(name)} says on the trip goes here`)}</p>`}</section>` : '';
    const declHtml = dc ? `<section class="pp-page decl" id="decl"><header><div><div class="kicker">🛃 ${esc(T(dc.sub))}</div><h3>${esc(T(dc.title))}</h3></div></header>
<p class="label">${esc(T(dc.intro))}</p>
${dc.counts.map((c) => `<div class="dline"><span class="e">${esc(c.e)}</span><span>${esc(T(c.pre))}</span>${ed ? `<input class="field ppf num" inputmode="numeric" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(c.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(c.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${c.k}`] ?? fieldVal(t, `decl.${c.k}`, kid))}" maxlength="6">` : `<b class="num">${esc(fieldVal(t, `decl.${c.k}`, kid)) || '__'}</b>`}<span>${esc(T(c.post))}</span></div>`).join('')}
${dc.texts.map((y) => `<div class="dtext"><span class="label">${esc(T(y.label))}</span>${ed ? `<input class="field ppf" data-a-blur="field" data-t="${esc(t.id)}" data-k="${esc(kid)}" data-v="decl.${esc(y.k)}" data-draft="pf:${esc(t.id)}:${kid}:decl.${esc(y.k)}" value="${esc(drafts[`pf:${t.id}:${kid}:decl.${y.k}`] ?? fieldVal(t, `decl.${y.k}`, kid))}" maxlength="60">` : `<p>${esc(fieldVal(t, `decl.${y.k}`, kid)) || '—'}</p>`}</div>`).join('')}
<div class="declared">${L('แจ้งแล้ว<br>ถูกต้อง', 'DECLARED<br>&amp; TRUE')}<br>★ ${year} ★</div></section>` : '';
    const line = L(`รายการของ${name}`, `${name}'s lists`);
    body = `${hear(esc(line))}${head(L('รายการของหนู', 'My lists'), line, true)}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}">${lit && lit.note ? `<p class="call calm lnote">👶 ${esc(T(lit.note))}</p>` : ''}${lists}${littleHtml}${declHtml}</div>`;
  } else if (page === 'stickers') {
    const line = kidMode ? L('ลากสติกเกอร์ไปแปะได้เลย!', 'Drag your stickers onto the page!') : L(`สติกเกอร์ของ${name}`, `${name}’s stickers`);
    body = `${hear(esc(line))}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}"><section class="pp-page stkpage"><header><div><div class="kicker">${L('หน้าสติกเกอร์', 'Sticker page')}</div><h3>⭐ ${esc(L(`สติกเกอร์ของ${name}`, `${name}’s stickers`))}</h3></div>${kidMode ? '' : sayBtn(line)}</header>${stickerBoard(t, kid, !!kidMode)}
${kidMode ? '' : `<p class="label" style="margin-top:8px">${L('สติกเกอร์ได้จากภารกิจ ตราประทับ และประตูเซอร์ไพรส์ · เด็กแปะเองในโหมดเด็ก', 'Stickers come from missions, checklists, stamps and surprise doors · the kids stick them on in kid mode')}</p>`}</section></div>`;
  } else if (page === 'trophies') {
    // trophies are read off what the child already did; only kid mode marks them seen (the child's "new!" stays for the child)
    const all = trophies(t, kid), got = all.filter((y) => y[3]), seen = new Set(ls('tseen_' + kid) || []), fresh = kidMode ? got.filter((y) => !seen.has(y[0])) : [];
    if (fresh.length) ls('tseen_' + kid, got.map((y) => y[0]));
    const line = fresh.length ? L(`เย้! รางวัลใหม่: ${fresh.map((y) => y[2]).join(', ')} 🎉`, `Yay! New: ${fresh.map((y) => y[2]).join(', ')} 🎉`) : got.length ? L(`${name} มี ${got.length} รางวัลแล้ว`, `${name} has ${got.length} troph${got.length === 1 ? 'y' : 'ies'}`) : L('ถ้วยรางวัลรอหนูอยู่', 'Trophies are waiting for you');
    body = `${kidMode ? `<div class="kidguide${fresh.length ? ' pop' : ''}">${guide(0)}<p>${esc(line)}</p></div>` : ''}${head(L('ถ้วยรางวัลและเหรียญ', 'Trophies and badges'), line, false)}
${kidMode ? `<div class="trophies">${all.map((y) => `<button class="tro${y[3] ? ' got' : ''}${fresh.some((f) => f[0] === y[0]) ? ' new' : ''}" data-a="sayfacts" data-v="${esc(y[2])}"><span>${troImg(y)}</span><b>${esc(y[2])}</b></button>`).join('')}</div>` : ''}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}"><section class="pp-page"><header><div><div class="kicker">${L('เหรียญครั้งแรก', 'Badges')}</div><h3>🌟 ${L(`ครั้งแรกของ${esc(name)}`, `${esc(name)}’s firsts`)}</h3></div></header>
${firsts.length ? `<div class="badges">${firsts.map((e) => { const f = firstLabel(t, e.first_key); return `<button class="bdg" data-a="sayfacts" data-v="${esc(e.first_key === 'custom' ? e.text : f.t)}"><span>${esc(e.first_key === 'custom' ? '⭐' : f.e)}</span><b>${esc(e.first_key === 'custom' ? e.text : f.t)}</b><small>${L('วันที่', 'Day')} ${e.day + 1}</small></button>`; }).join('')}</div>`
    : `<p class="empty">${L('เหรียญจะมาเมื่อพ่อแม่ติ๊ก "ครั้งแรก" ระหว่างทริป', 'Badges appear when the grown-ups tick a “first” on the trip')}</p>`}</section>
${words.length && !lit ? `<section class="pp-page"><header><div><div class="kicker">${L('คำพูดของหนู', 'In my own words')}</div><h3>💬 ${L('สิ่งที่หนูพูด', 'Things I said')}</h3></div></header>${words.slice(0, 6).map((e) => quoteCall(e, e.highlight)).join('')}</section>` : ''}</div>
${kidMode ? '' : got.length ? `<section class="pp-page"><header><div><div class="kicker">${L('ถ้วยรางวัล', 'Trophies')}</div><h3>🏆 ${esc(L(`ถ้วยรางวัลของ${name}`, `${name}’s trophies`))}</h3></div></header><div class="trophies">${got.map((y) => `<button class="tro${y[3] ? ' got' : ''}${fresh.some((f) => f[0] === y[0]) ? ' new' : ''}" data-a="sayfacts" data-v="${esc(y[2])}"><span>${troImg(y)}</span><b>${esc(y[2])}</b></button>`).join('')}</div></section>` : `<p class="muted">${L('ถ้วยรางวัลรอหนูอยู่ ได้เมื่อเล่นในโหมดเด็ก', 'Trophies are waiting — they come from playing in kid mode')}</p>`}`;
  } else if (page === 'cert') {
    const cert = pp.certificate, earned = certEarned(t, kid);
    const line = earned ? L(`ใบประกาศของ${name}! ${certText(t, kid)}`, `${name}'s certificate! ${certText(t, kid)}`) : L(`ใบประกาศนี้จะเป็นของ${name}ในวันสุดท้ายของทริป`, `This certificate is ${name}'s on the last day of the trip`);
    body = `${hear(esc(line))}<div class="pp kid-${esc(kid)}" style="${themeStyle(t)}"><section class="pp-page cert${earned ? ' earned' : ''}" id="cert">
<div class="kicker">${L('ใบประกาศเกียรติคุณ', 'Certificate of achievement')}${kidMode ? '' : ' ' + sayBtn(line)}</div><h3>${esc(T(cert.title))}</h3>
${st && st.crest ? `<img class="crest" src="${esc(st.crest)}" alt="">` : stampHtml(t)}<p class="label">${L('ขอมอบให้', 'This certifies that')}</p><div class="cname">${kidFace(kid)} ${esc(name)}</div>
<p>${earned ? esc(certText(t, kid)) : L(`ใบประกาศนี้จะเป็นของ${esc(name)}ในวันสุดท้ายของทริป 🎉 — ไม่ต้องติ๊กให้ครบ แค่เที่ยวให้สนุก`, `This certificate is ${esc(name)}'s on the last day of the trip 🎉 — nothing to complete, just have fun`)}</p>
${earned ? `<p class="bye">${esc(T(cert.bye))}</p>` : ''}</section></div>`;
  }

  // turning the pages: the tabs (one a page, the visas each their own), ‹ › at the foot, a swipe (sheets.js) and the arrow keys
  const go = (p, cls, inner, dir) => { const href = ppHref(kid, t, p[0], kidMode), cu = p[0] === page ? ' aria-current="page"' : '', dd = dir ? ` data-dir="${dir}"` : '';
    return kidMode ? `<button type="button" class="${cls}" data-a="kidnav" data-v="${esc(href)}" data-say="${esc(p[2])}"${cu}${dd}>${inner}</button>` : `<a class="${cls}" href="${esc(href)}"${cu}${dd}>${inner}</a>`; };
  const tabIc = (p) => (kidMode && PP_ART[p[0]] ? `<img src="/art/kidui/bar-${PP_ART[p[0]]}.webp" alt="">` : kidMode && p[0].startsWith('visa-') ? `<img src="/art/kidui/bar-passport.webp" alt="">` : `<span aria-hidden="true">${p[1]}</span>`);
  const tabs = `<nav class="pptabs" aria-label="${L('หน้าในพาสปอร์ต', 'Passport pages')}">${pages.map((p) => go(p, 'ppt', `${tabIc(p)}<small>${esc(p[2])}</small>`)).join('')}</nav>`;
  const prev = pages[at - 1], next = pages[at + 1];
  const turn = `<div class="ppturn">${prev ? go(prev, 'ppgo prev', `‹ <small>${esc(prev[2])}</small>`, 'prev') : '<span></span>'}<span class="ppn">${at + 1} / ${pages.length}</span>${next ? go(next, 'ppgo next', `<small>${esc(next[2])}</small> ›`, 'next') : '<span></span>'}</div>`;
  const top = kidMode ? '' : `<div class="row ppkids" role="tablist">${ks.map((c) => `<a class="chip" role="tab" href="#/passport/${esc(c.slug)}/${esc(t.id)}/${esc(page.startsWith('visa-') ? 'cover' : page)}" aria-selected="${c.slug === kid}" aria-pressed="${c.slug === kid}">${kidFace(c.slug)} ${esc(kidName(c.slug))}</a>`).join('')}
${isEditor() ? `<button class="chip kidgo" data-a="kidmode" data-v="${esc(kid)}">🧒 ${L('โหมดเด็ก', 'Kid mode')}</button>` : ''}
<span class="sep"></span>${mine.map((x) => `<a class="chip" href="#/passport/${esc(kid)}/${esc(x.id)}/${esc(page.startsWith('visa-') ? `visa-${x.id}` : page)}" aria-pressed="${x.id === t.id}">${flagsOf(x)} ${esc(ppShort(x))}</a>`).join('')}
<a class="chip ppprint" href="/api/b/pdf/${esc(t.id)}" download data-a="pdf">🖨️ ${L('พิมพ์', 'Print')}</a></div>`;
  return `${top}<div class="ppbook${kidMode ? ' inkid' : ''}" data-page="${esc(page)}" data-trip="${esc(t.id)}" data-kid="${esc(kid)}" style="${themeStyle(t)}">${tabs}<div class="ppbody" aria-label="${esc(cur[2])}">${body}</div>${turn}</div>`;
}

/* ---------- record a day (editors) ---------- */
/* The record page in the app's look (owner, Nov 2026: "ปรับ UI ส่วนนี้ด้วยได้ไหม หลุด theme app"): each of its sections is a card like the
   settings pages' (`pcard`: a coloured top edge, the app's own painted picture beside the heading, the UI face — not the book's
   display serif and a line icon). Done on the page's finished HTML, so every block the page holds (photos, words, moods, voices,
   favourite, note, firsts, check-ins, spending, reviews, the helper's boxes) follows without each one being rewritten; the printed
   memory book keeps its own look. */
const LG_PIC = { camera: ['/art/hub/camera.webp', PG.pink], quote: ['/art/hub/comment.webp', PG.purple], kid: ['/art/kidui/mood.webp', PG.gold],
  hearts: ['/art/kidui/t-heart.webp', PG.pink], log: ['/art/hub/pencil.webp', PG.blue], firsts: ['/art/kidui/t-medal.webp', PG.gold], pin: ['/art/hub/map.webp', PG.teal],
  mic: ['/art/kidui/say.webp', PG.purple], money: ['/art/hub/money.webp', PG.lime], exchange: ['/art/hub/money.webp', PG.cyan], book: ['/art/hub/book.webp', PG.blue],
  mail: ['/art/hub/letter.webp', PG.orange], eye: ['/art/hub/helper.webp', PG.purple], globe: ['/art/hub/lang.webp', PG.cyan], sparkle: ['/art/hub/helper.webp', PG.purple],
  moon: ['/art/kidui/moon.webp', PG.blue], learn: ['/art/hub/learn.webp', PG.teal], today: ['/art/hub/today.webp', PG.blue], up: ['/art/hub/offline.webp', PG.cyan],
  wifi: ['/art/hub/offline.webp', PG.cyan], review: ['/art/hub/review.webp', PG.orange], star: ['/art/hub/review.webp', PG.orange], notebook: ['/art/hub/notebook.webp', PG.orange] };
let lgIcons = null;
function lgCards(html) {
  if (!lgIcons) lgIcons = Object.keys(ICONS).map((k) => [ic(k), k]);
  return html.replace(/<section class="blk([^"]*)"([^>]*)>(\s*<h3>\s*(<svg class="ic"[\s\S]*?<\/svg>)?)?/g, (m, cls, attrs, head, svg) => {
    if (/style=/.test(attrs)) return m;
    const k = svg ? (lgIcons.find((x) => x[0] === svg) || [])[1] : '', pic = LG_PIC[k];
    const g = pic ? pic[1] : 'var(--accent)';
    const lead = pic ? `<span class="pcpic"><img src="${pic[0]}" alt="" draggable="false"></span>` : svg ? `<span class="pcpic">${svg}</span>` : '';
    return `<section class="blk lgc${cls}"${attrs} style="--g1:${g}">${head ? `<h3>${lead}` : ''}`;
  });
}
/* The record page, a page a step (owner, Nov 2026: "หน้า record ยาวมากเลย … แบบมีหลายหน้าในส่วนนี้"): #/t/<trip>/log/<i> is the day's
   overview — the day strip, the plan line, then a tile a step with what it already holds (photos · words · mood and favourite · note
   and firsts · places and spending · the helper · day done); #/t/<trip>/log/<i>/<step> is that step alone with the step dots on top
   and back / next under it (the planner's look). The page is still drawn whole (viewLogRaw) and cut at its <!--lg:…--> marks, so
   every block keeps its own code. /log/<i>/ai (the 21:30 push) is the helper's step. */
const LG_STEPS = [['photos', '/art/hub/camera.webp', PG.pink, 'รูปและคลิป', 'Photos', ['photos']], ['words', '/art/hub/comment.webp', PG.purple, 'คำพูด', 'Words', ['words']],
  ['feel', '/art/kidui/mood.webp', PG.gold, 'อารมณ์และของโปรด', 'Mood & favourite', ['mood', 'fav', 'voices']], ['notes', '/art/hub/pencil.webp', PG.blue, 'โน้ตและครั้งแรก', 'Note & firsts', ['note', 'firsts']],
  ['places', '/art/hub/map.webp', PG.teal, 'ที่ไปและค่าใช้จ่าย', 'Places & spending', ['places']], ['ai', '/art/hub/helper.webp', PG.purple, 'ผู้ช่วย', 'The helper', ['ai']],
  ['done', '/art/hub/today.webp', PG.lime, 'จบวันนี้', 'Day done', ['done']]];
const LG_SHORT = { photos: ['รูป', 'Photos'], words: ['คำพูด', 'Words'], feel: ['อารมณ์', 'Mood'], notes: ['โน้ต', 'Notes'], places: ['ที่ไป', 'Places'], ai: ['ผู้ช่วย', 'Helper'], done: ['จบวัน', 'Done'] };
function lgStatus(t, i) {
  const es = entriesOf(t.id, i), kids = children().map((c) => c.slug), d = t.days[i];
  const ph = mediaOf(t.id, i).length + (typeof videoOf === 'function' ? videoOf(t.id, i).length : 0), qs = es.filter((e) => e.kind === 'quote').length;
  const moods = kids.filter((k) => es.some((e) => e.kind === 'mood' && e.child === k)).length, fav = es.some((e) => e.kind === 'fav'), voices = audioOf(t.id, i).length;
  const note = es.some((e) => e.kind === 'note'), firsts = es.filter((e) => e.kind === 'first').length;
  const places = placesOf(t.id, i).length, spend = spendOf(t.id, i).length, revs = S.reviews.filter((r) => r.trip === t.id && r.day === i).length;
  const ai = es.filter((e) => ['sum', 'story', 'talk', 'mquiz'].includes(e.kind)).length;
  const j = (parts) => parts.filter(Boolean).join(' · ');
  return {
    photos: [ph > 0, ph ? L(`${ph} รูป`, `${ph} photo${ph > 1 ? 's' : ''}`) : L('ยังว่าง', 'Nothing yet')],
    words: [qs > 0, qs ? L(`${qs} คำพูด`, `${qs} said`) : L('ยังว่าง', 'Nothing yet')],
    feel: [moods > 0 || fav || voices > 0, j([moods && L(`อารมณ์ ${moods}/${kids.length}`, `mood ${moods}/${kids.length}`), fav && L('ของโปรด ✓', 'favourite ✓'), voices && L(`เสียง ${voices}`, `${voices} voice${voices > 1 ? 's' : ''}`)]) || L('ยังว่าง', 'Nothing yet')],
    notes: [note || firsts > 0, j([note && L('โน้ต ✓', 'note ✓'), firsts && L(`ครั้งแรก ${firsts}`, `${firsts} first${firsts > 1 ? 's' : ''}`)]) || L('ยังว่าง', 'Nothing yet')],
    places: [places > 0 || spend > 0 || revs > 0, j([places && L(`เช็กอิน ${places}`, `${places} check-in${places > 1 ? 's' : ''}`), spend && L(`จ่าย ${spend} รายการ`, `${spend} spent`), revs && L(`รีวิว ${revs}`, `${revs} review${revs > 1 ? 's' : ''}`)]) || L('ยังว่าง', 'Nothing yet')],
    ai: [ai > 0, ai ? L(`ทำแล้ว ${ai} อย่าง`, `${ai} done`) : L('สรุป นิทาน คำถาม', 'Summary, story, questions')],
    done: [!!d.done_at, d.done_at ? L('จบวันนี้แล้ว ✓', 'Day done ✓') : L('แตะเมื่อจบวัน', 'Tap when the day is over')],
  };
}
function viewLog(t, i, evening, step) {
  const raw = lgCards(viewLogRaw(t, i, evening));
  // the whole day on one page (/log/<i>/all): two versions, always — a page a step, or everything at once
  if (step === 'all') return raw.replace(/href="#\/t\/([^"/]+)\/log\/(\d+)"/g, (m, x, y) => `href="#/t/${x}/log/${y}/all"`).replace('<!--lg:prog-->', `<p class="lgallnav"><a class="btn ghost" href="#/t/${esc(t.id)}/log/${i}">‹ ${L('ทีละหัวข้อ', 'One thing at a time')}</a></p><!--lg:prog-->`);
  const cut = raw.split(/<!--lg:(\w+)-->/), seg = { head: cut[0] };
  for (let k = 1; k < cut.length; k += 2) seg[cut[k]] = cut[k + 1];
  const hasAi = /\S/.test(seg.ai || ''), steps = LG_STEPS.filter((x) => x[0] !== 'ai' || hasAi), st = lgStatus(t, i);
  const base = `#/t/${esc(t.id)}/log/${i}`;
  if (evening && hasAi) step = 'ai';
  const k = steps.findIndex((x) => x[0] === step);
  if (k < 0) {   // the day's overview: a tile a step
    const tiles = steps.map((x) => { const s1 = st[x[0]]; return `<a class="lgtile${s1[0] ? ' has' : ''}${x[0] === 'done' ? ' end' : ''}" href="${base}/${x[0]}" style="--g1:${x[2]}"><span class="pcpic"><img src="${x[1]}" alt="" draggable="false"></span><b>${L(x[3], x[4])}</b><small>${esc(s1[1])}</small>${s1[0] ? '<i class="lgok" aria-hidden="true">✓</i>' : ''}</a>`; }).join('');
    return `${seg.head}${seg.plan || ''}<div class="part pickh">${L('บันทึกวันนี้ แตะทีละหัวข้อ', 'Record the day — one thing at a time')}</div><nav class="lgtiles">${tiles}</nav><p class="lgallgo"><a class="linkbtn" href="${base}/all">${L('ดูทั้งหมดในหน้าเดียว', 'See everything on one page')} ›</a></p>`;
  }
  const x = steps[k];
  const head = seg.head.replace(/href="#\/t\/([^"/]+)\/log\/(\d+)"/g, (m, a, b) => `href="#/t/${a}/log/${b}/${x[0]}"`);   // the day strip keeps the step
  const dots = `<nav class="plqs lgqs" style="grid-template-columns:repeat(${steps.length},1fr)" aria-label="${L('หัวข้อ', 'Steps')}">${steps.map((y, j) => `<a class="plqd${j === k ? ' now' : st[y[0]][0] ? ' done' : ''}" href="${base}/${y[0]}"${j === k ? ' aria-current="step"' : ''}><i>${j !== k && st[y[0]][0] ? '✓' : j + 1}</i><span>${L(LG_SHORT[y[0]][0], LG_SHORT[y[0]][1])}</span></a>`).join('')}</nav>`;
  let body = x[5].map((n) => seg[n] || '').join('');
  if (x[0] === 'ai') body = body.replace('<details class="blk fold aifold"', '<details open class="blk fold aifold"');
  if (x[5].every((n) => !/\S/.test(seg[n] || ''))) body = `<p class="empty">${L('วันนี้ไม่มีส่วนนี้', 'Nothing to do here today')}</p>`;
  const prev = k ? `<a class="btn ghost plback" href="${base}/${steps[k - 1][0]}">‹ ${L(LG_SHORT[steps[k - 1][0]][0], LG_SHORT[steps[k - 1][0]][1])}</a>` : `<a class="btn ghost plback" href="${base}">‹ ${L('ภาพรวม', 'Overview')}</a>`;
  const next = k < steps.length - 1 ? `<a class="btn plnext" href="${base}/${steps[k + 1][0]}">${L(LG_SHORT[steps[k + 1][0]][0], LG_SHORT[steps[k + 1][0]][1])} ›</a>` : `<a class="btn plnext" href="${base}">${L('ภาพรวมของวัน', 'The day’s overview')} ›</a>`;
  return `${head}${dots}<div class="lgstep" data-step="${x[0]}">${body}</div><div class="row plnav">${prev}${next}</div>`;
}
function viewLogRaw(t, i, evening) {
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
  return `<div class="daystrip" role="tablist">${strip}</div>
<div class="day" style="border:0;margin-top:0;padding-top:6px"><div class="hd"><div class="no">${String(i + 1).padStart(2, '0')}</div>
<div class="dl">${L('วันที่', 'Day')} ${i + 1} · ${esc(fmtDay(d.date))}</div><div></div>
<h3>${esc(T(d.title))}</h3>${artImg(t, i, 'hdart' + (dayStamped(t, i) ? '' : ' off'))}</div></div>
<!--lg:prog--><div class="logprog noprint" role="group" aria-label="${L('บันทึกวันนี้', 'Tonight’s three')}">${[['photos', 'camera', L('รูป', 'Photos'), ph.length], ['quotes', 'quote', L('คำพูด', 'Words'), quotes.length], ['mood', 'kid', L('อารมณ์', 'Mood'), kids.filter((k) => mood(k)).length]].map(([id, icon, lbl, n]) => `<button type="button" class="lpc${n ? ' on' : ''}" data-a="jump" data-v="#lg${id}" aria-label="${lbl}: ${n ? L('มีแล้ว', 'done') : L('ยังว่าง', 'empty')}">${ic(icon)}${lbl}<i>${n ? '✓' : '○'}</i></button>`).join('')}${aiJump(t, i, dk)}</div>
<!--lg:plan-->${planLite(t, i)}

<!--lg:photos--><section class="blk" id="lgphotos"><h3>${ic('camera')} ${L('รูป', 'Photos')}${ph.length ? ` <span class="label">${ph.length}</span>` : ''}</h3>
<div class="row"><button class="btn" type="button" data-a="pickphotos" data-fpick data-t="${esc(t.id)}" data-d="${i}">＋ ${L('เพิ่มรูป', 'Add photos')}</button><button class="btn ghost" type="button" data-a="pickvideo" data-t="${esc(t.id)}" data-d="${i}">＋ ${L('คลิปวิดีโอ', 'Video clip')}</button><span class="progress" id="prog2"></span></div>
${photoSpots(t, i, ph)}
${ph.length ? `<div class="lgmos" style="margin-top:10px">${mosaicByPlace(t, ph)}</div>` : ''}${vidsBlock(t, i, true)}${upBlock()}</section>

<!--lg:words--><section class="blk" id="lgquotes"><h3>${ic('quote')} ${L('คำพูดน่ารัก', 'Things they said')}</h3>
<div class="row" role="group">${kids.concat('both').map((k) => `<button class="chip" data-a="who" data-v="${k}" aria-pressed="${quoteWho === k}">${kidFace(k)} ${esc(kidName(k))}</button>`).join('')}</div>
<div class="emowrap" style="margin-top:8px"><textarea id="qtext" class="field" data-draft="q:${esc(dk)}" placeholder="${L('“หนูอยากเป็นปลา…”', '“I want to be a fish…”')}">${esc(drafts['q:' + dk] || '')}</textarea>${emoBtn('qtext')}</div>
<div class="row end" style="margin-top:6px"><button class="btn small" data-a="savequote" data-t="${esc(t.id)}" data-d="${i}">${L('บันทึกคำพูด', 'Save quote')}</button></div>
${quotes.length ? `<ul class="items">${quotes.map((e) => `<li><div class="grow">${quoteCall(e, false)}</div><button class="mini${e.highlight ? ' on' : ''}" data-a="hiq" data-v="${esc(e.id)}" aria-pressed="${!!e.highlight}" title="⭐">${e.highlight ? '⭐' : '☆'}</button><button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></li>`).join('')}</ul>` : ''}</section>

<!--lg:mood--><section class="blk" id="lgmood"><h3>${ic('kid')} ${L('อารมณ์วันนี้', 'Mood today')} <span class="label">${L('แตะซ้ำเพื่อล้าง', 'tap again to clear')}</span></h3>
${kids.map((k) => `<div class="moodrow">${kidBadge(k)}<div class="opts">${(t.moods.length ? t.moods : ['😄', '🥰', '🤩', '😋', '😴', '😢']).map((m) => `<button data-a="mood" data-k="${k}" data-v="${esc(m)}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${mood(k) === m}" aria-label="${esc(kidName(k))} ${esc(m)}">${emo(m)}</button>`).join('')}</div></div>`).join('')}</section>

<!--lg:done--><section class="blk dayendblk"><button class="btn dayend${d.done_at ? ' is-done' : ''}" data-a="done" data-t="${esc(t.id)}" data-d="${i}">${d.done_at ? '✓ ' + L('วันนี้เสร็จแล้ว (แตะเพื่อยกเลิก)', 'Day done (tap to undo)') : ic('flag') + ' ' + L('จบวันนี้', 'Mark day done')}</button>
<div class="row"><a class="btn ghost" href="#/t/${esc(t.id)}">${ic('book')} ${L('ดูในสมุด', 'See it in the book')}</a>${navigator.share ? `<button class="btn ghost" data-a="share" data-t="${esc(t.id)}" data-d="${i}">${ic('share')} ${L('ส่งให้ญาติ', 'Share with family')}</button>` : ''}<button class="btn ghost" data-a="daycard" data-t="${esc(t.id)}" data-d="${i}">${ic('image')} ${L('การ์ดวันนี้', 'Day card')}</button></div></section>

<!--lg:more--><details class="more"${moreOpen ? ' open' : ''}><summary><span><b>${L('เพิ่มเติม', 'More')}</b><small>${L('ของโปรด · โน้ต · เสียงเด็กๆ · ครั้งแรก · เช็กอิน · ค่าใช้จ่าย · รีวิว', 'favourite · note · voices · firsts · check-ins · spending · reviews')}</small></span><button type="button" class="linkbtn" data-a="logall">${ls('logall') ? L('พับเก็บได้', 'Let it fold') : L('เปิดไว้ตลอด', 'Keep open')}</button>${ic('chev', 'chv')}</summary>
<!--lg:voices-->${clipsBlock(t, i)}

<!--lg:fav--><section class="blk"><h3>${ic('hearts')} ${L('ของโปรดวันนี้', 'Favourite thing today')}</h3>
<div class="emowrap"><input id="favtext" class="field" data-a-blur="fav" data-t="${esc(t.id)}" data-d="${i}" data-draft="f:${esc(dk)}" value="${esc(drafts['f:' + dk] ?? (fav ? fav.text : ''))}" placeholder="${L('เช่น ไอติมมะม่วง', 'e.g. mango ice cream')}">${emoBtn('favtext')}</div></section>

<!--lg:note--><section class="blk"><h3>${ic('log')} ${L('โน้ตพ่อแม่', "Parents' note")}</h3>
<div class="emowrap"><textarea id="notetext" class="field" data-a-blur="note" data-t="${esc(t.id)}" data-d="${i}" data-draft="n:${esc(dk)}" placeholder="${L('บันทึกเมื่อแตะออกจากช่อง · เว้นว่าง = ลบ', 'Saved when you leave the box · empty = delete')}">${esc(drafts['n:' + dk] ?? (note ? note.text : ''))}</textarea>${emoBtn('notetext')}</div></section>

<!--lg:firsts--><section class="blk"><h3>${ic('firsts')} ${L('ครั้งแรก', 'Firsts')} <span class="label">${L('แตะรูปเด็กเพื่อติ๊ก', 'tap a child to tick')}</span></h3>
${((open, done) => `<div class="firsts">${open.map((f) => `<div class="first"><span class="e">${esc(f.emoji)}</span><span class="t">${esc(T(f.label))}</span><span class="kids">${kids.map((k) => { const fd = firstDay(f.key, k), here = fd === i, other = fd >= 0 && !here;
    return `<button data-a="first" data-v="${esc(f.key)}" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${here}" class="${other ? 'elsewhere' : ''}" aria-label="${esc(kidName(k))}: ${esc(T(f.label))}${other ? ` · ${L('วันที่', 'Day')} ${fd + 1}` : ''}">${kidBadge(k, !here)}${other ? `<small class="fday">${L('ว', 'D')}${fd + 1}</small>` : ''}</button>`; }).join('')}</span></div>`).join('')}</div>
${done.length ? `<details class="fdone"><summary>${L(`ทำไปแล้ววันอื่น (${done.length})`, `Already done on other days (${done.length})`)}</summary><ul>${done.map((f) => `<li>${esc(f.emoji)} ${esc(T(f.label))} <small class="label">${kids.map((k) => `${esc(kidName(k))} · ${L('วันที่', 'Day')} ${firstDay(f.key, k) + 1}`).join(' / ')}</small></li>`).join('')}</ul></details>` : ''}`)(t.firsts.filter((f) => !kidsDoneElsewhere(f.key)), t.firsts.filter((f) => kidsDoneElsewhere(f.key)))}
${es.filter((e) => e.kind === 'first' && e.first_key === 'custom').map((e) => `<div class="first got" style="margin-top:8px"><span class="e">⭐</span><span class="t">${esc(e.text)}</span>${kidBadge(e.child)}<button class="mini" data-a="delentry" data-v="${esc(e.id)}">${L('ลบ', 'Delete')}</button></div>`).join('')}
<div class="row" style="margin-top:8px"><input id="firsttext" class="field" style="flex:1;min-width:160px" data-draft="c:${esc(dk)}" value="${esc(drafts['c:' + dk] || '')}" placeholder="${L('ครั้งแรกอื่นๆ เช่น ใส่รองเท้าเอง', 'Another first, e.g. shoes on by herself')}">
${kids.map((k) => `<button class="btn ghost small" data-a="customfirst" data-k="${k}" data-t="${esc(t.id)}" data-d="${i}">＋ ${kidFace(k)}</button>`).join('')}</div></section>

<!--lg:places-->${(d.planned || []).length ? `<section class="blk"><h3>${ic('pin')} ${L('เช็กอิน: ที่ไปและมื้ออาหาร', 'Check in: places & meals')}</h3>
${d.planned.map((p) => `<div class="check"><button data-a="place" data-v="${esc(p.key)}" data-k="${esc(p.kind || 'place')}" data-t="${esc(t.id)}" data-d="${i}" aria-pressed="${visited.has(p.key)}" aria-label="${esc(T(p))}">${visited.has(p.key) ? '✓' : ''}</button><span class="grow">${p.kind === 'food' ? '🍽️ ' : ''}${esc(T(p))}${p.meal ? ` <small>· ${esc(p.meal)}</small>` : ''}</span>${extA(mapsUrl(placeQ(t, p)), L('แผนที่', 'Map') + ' ↗', 'mini nav')}</div>`).join('')}</section>` : ''}

${spendBlock(t, i, dk)}
${notebookBlock(t, i)}
<!--lg:moreend--></details>
<!--lg:ai-->${((g) => (g && isEditor() && S.features.story ? `<details class="blk fold aifold"${evening || ls('logall') || aiRun || ph.length || es.length ? ' open' : ''}><summary>${ic('sparkle')}<b>${L('คืนนี้ให้ผู้ช่วยทำให้', 'Tonight, with the helper')}</b><small>${ph.length || es.length ? L(`เหลือ ${aiTodo(t, i, dk).length}`, `${aiTodo(t, i, dk).length} to do`) : L('บันทึกก่อน แล้วค่อยเปิด', 'Record first, then open')}</small>${ic('chev', 'chv')}</summary>${g}</details>` : g))(aiGroup(t, i, dk))}`;
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
// video clips (≤ 30 s, owner, Nov 2026): played where they are, the poster frame first (preload none: a book of clips costs nothing until
// one is tapped); never printed, never shared as a photo. On the record page each has its caption and a delete.
const vidPlayer = (m) => `<video controls playsinline preload="none"${m.local ? '' : ` poster="/media/${encodeURIComponent(m.id)}/t"`} src="${esc(m.local || `/media/${encodeURIComponent(m.id)}`)}"></video>`;
function vidsBlock(t, i, edit) {
  const vs = videoOf(t.id, i); if (!vs.length) return '';
  return `<div class="vclips noprint">${vs.map((m) => `<figure class="vclip">${vidPlayer(m)}${edit
    ? `<div class="row"><input class="field small clipcap" data-v="${esc(m.id)}" value="${esc(m.caption || '')}" placeholder="${L('คลิปนี้คืออะไร', 'What is this clip?')}" maxlength="120"><button class="mini" data-a="delclip" data-v="${esc(m.id)}" aria-label="${L('ลบคลิป', 'Delete clip')}">✕</button></div>${m.pending ? `<small class="label">⏳ ${L('รอส่ง', 'Waiting to send')}</small>` : ''}`
    : m.caption ? `<figcaption>${emoIn(esc(m.caption))}</figcaption>` : ''}</figure>`).join('')}</div>`;
}
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
/* B3 (docs/BUDGET.md): the plan a book's spending is held against — the parents' own (set here) or the planner's estimate the book
   was written with — as spent / planned per category and money, bars that turn amber near the plan and rose over it. Editors only. */
const budgetOf = (t) => (S && S.budgets && S.budgets[t.id]) || null;
let budEdit = false;
function budgetBlock(t) {
  if (!isEditor()) return '';
  const b = budgetOf(t), all = spendOf(t.id), lines = (b && b.lines) || [];
  const spentOf = (cat, cur) => all.filter((s) => (s.cat || 'other') === cat && s.cur === cur).reduce((a, s) => a + s.amount, 0);
  const pctCls = (p) => (p > 100 ? 'over' : p >= 85 ? 'near' : '');
  const rows = lines.map((l) => {
    const c = SPEND_CATS.find((x) => x[0] === l.cat) || SPEND_CATS[5], n = spentOf(l.cat, l.cur), p = Math.round((n / l.amt) * 100);
    return `<li class="${pctCls(p)}"><span class="spl">${emo(c[1])} ${esc(L(c[2], c[3]))}</span><span class="spbar"><i style="width:${Math.min(100, Math.max(n ? 3 : 0, p))}%"></i></span><b>${n ? esc(fmtMoney(n, l.cur)) : '—'}</b><small>${esc(L('จากงบ', 'of'))} ${esc(fmtMoney(l.amt, l.cur))}</small></li>`;
  }).join('');
  const curs = [...new Set(lines.map((l) => l.cur))];
  const tots = curs.map((cur) => { const plan = lines.filter((l) => l.cur === cur).reduce((a, l) => a + l.amt, 0), n = all.filter((s) => s.cur === cur).reduce((a, s) => a + s.amount, 0); return { cur, plan, n, p: Math.round((n / plan) * 100) }; });
  const totHtml = tots.map((x) => `<p class="budtot ${pctCls(x.p)}"><b>${esc(fmtMoney(x.n, x.cur))}</b> ${L('จากงบ', 'of')} ${esc(fmtMoney(x.plan, x.cur))} · ${x.p}%${x.p > 100 ? ` · ${L(`เกินงบ ${fmtMoney(x.n - x.plan, x.cur)}`, `${fmtMoney(x.n - x.plan, x.cur)} over`)}` : x.n < x.plan ? ` · ${L(`เหลือ ${fmtMoney(x.plan - x.n, x.cur)}`, `${fmtMoney(x.plan - x.n, x.cur)} left`)}` : ''}</p>`).join('');
  const src = !b ? '' : b.src === 'own' ? L('งบที่เราตั้งเอง', 'The plan we set') : L('จากงบคร่าวๆ ตอนวางแผนกับผู้ช่วย (กลางช่วง)', 'From the rough budget when we planned with the helper (the middle of each range)');
  // the editor: one amount a category, in the plan's money (or the book's own); other money in the plan stays as it is
  const cur0 = (lines[0] && lines[0].cur) || tripCurs(t)[0];
  const edit = budEdit || !b ? `<div class="budedit" data-cur="${esc(cur0)}"><p class="label">${L(`ตั้งงบแต่ละหมวดเป็น ${cur0} · เว้นว่างได้`, `A plan for each kind in ${cur0} · leave any blank`)}</p><div class="budf">${SPEND_CATS.map(([k, e, th, en]) => { const l = lines.find((x) => x.cat === k && x.cur === cur0); return `<label class="fxf">${emo(e)} ${esc(L(th, en))}<input class="field" inputmode="numeric" data-bud="${k}" value="${l ? esc(String(l.amt)) : ''}" aria-label="${esc(L(th, en))} ${esc(cur0)}"></label>`; }).join('')}</div>
<div class="row"><button type="button" class="btn" data-a="budsave" data-trip="${esc(t.id)}">${L('บันทึกงบ', 'Save the plan')}</button>${b ? `<button type="button" class="mini" data-a="budedit">${L('ยกเลิก', 'Cancel')}</button>` : ''}${b && b.src === 'own' && (t.theme || {}).budget ? `<button type="button" class="linkbtn" data-a="budclear" data-trip="${esc(t.id)}">${L('กลับไปใช้งบจากแผน', 'Back to the planned estimate')}</button>` : ''}</div></div>` : `<button type="button" class="mini" data-a="budedit">${ic('log')} ${L('แก้งบ', 'Change the plan')}</button>`;
  return `<section class="blk budblk"><h3>${emo('🎯')} ${L('งบที่วางไว้ กับที่จ่ายจริง', 'Planned and really spent')}</h3>${b ? `<p class="label">${src}</p>${totHtml}<ul class="spbars budbars">${rows}</ul>` : `<p class="label">${L('ยังไม่ได้ตั้งงบของเล่มนี้ ตั้งไว้เพื่อดูว่าใช้ไปเท่าไรแล้ว', 'No plan for this book yet — set one to see how the spending is going')}</p>`}${edit}</section>`;
}
// Today, on a trip day: one line — spent so far of the plan, in the plan's main money
function budgetLine(t) {
  const b = isEditor() && budgetOf(t); if (!b || !(b.lines || []).length) return '';
  const cur = b.lines[0].cur, plan = b.lines.filter((l) => l.cur === cur).reduce((a, l) => a + l.amt, 0), n = spendOf(t.id).filter((s) => s.cur === cur).reduce((a, s) => a + s.amount, 0), p = Math.round((n / plan) * 100);
  return `<a class="budline ${p > 100 ? 'over' : p >= 85 ? 'near' : ''}" href="#/t/${esc(t.id)}/spend">${emo('🎯')} ${L(`ใช้ไปแล้ว ${fmtMoney(n, cur)} จากงบ ${fmtMoney(plan, cur)} (${p}%)`, `Spent ${fmtMoney(n, cur)} of a plan of ${fmtMoney(plan, cur)} (${p}%)`)} ›</a>`;
}
function viewSpend(t) {
  const all = spendOf(t.id);
  if (!all.length && budgetOf(t)) return `<h1 class="h2">${L('สรุปค่าใช้จ่ายทริป', 'Trip spending')}</h1>${budgetBlock(t)}`;
  if (!all.length) return `<h1 class="h2">${L('ค่าใช้จ่าย', 'Spending')}</h1>${emptyCard(t, L('ยังไม่มีรายการ', 'Nothing yet'), L('บันทึกค่าใช้จ่ายได้ที่หน้าบันทึกของแต่ละวัน', 'Add spending on each day’s record page'), [`#/t/${esc(t.id)}/log/${Math.max(0, dayNow(t))}`, L('ไปหน้าบันทึก', 'Open the record page')])}`+ budgetBlock(t);
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
${budgetBlock(t)}${fxBlock(t)}<div class="spgrid">${byCur}</div>
<section class="blk"><h3>${ic('today')} ${L('รายวัน', 'Day by day')}</h3><ul class="items spdays">${days.map(({ d, i, rows }) => `<li><a class="grow" href="#/t/${esc(t.id)}/log/${i}"><b>${L('วันที่', 'Day')} ${i + 1}</b> · ${esc(fmtDay(d.date, { day: 'numeric', month: 'short' }))} · ${esc(T(d.title))}</a><b>${esc(sumMoney(rows))}</b></li>`).join('')}</ul></section>
<section class="blk"><h3>${ic('up')} ${L('รายการใหญ่สุด', 'The biggest items')}</h3><ul class="items">${top.map((s) => { const c = SPEND_CATS.find((x) => x[0] === s.cat) || SPEND_CATS[5]; return `<li><div class="grow">${emo(c[1])} ${s.note ? esc(s.note) : esc(L(c[2], c[3]))} <small class="label">· ${L('วันที่', 'Day')} ${s.day + 1}</small></div><b>${esc(fmtMoney(s.amount, s.cur))}</b></li>`; }).join('')}</ul></section>`;
}
