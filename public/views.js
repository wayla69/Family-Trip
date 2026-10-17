'use strict';
/* ===== Memory Book · views ===== */
function langSeg() {
  return `<div class="seg" role="group" aria-label="Language"><button data-a="lang" data-v="th" aria-pressed="${lang === 'th'}">ไทย</button><button data-a="lang" data-v="en" aria-pressed="${lang === 'en'}">EN</button></div>`;
}
function shell(title, inner, opt = {}) {
  const r = route(), p = r.parts[0] || '';
  const cur = (x) => (p === x ? ' aria-current="page"' : '');
  const center = isEditor() ? `<button class="cap" data-a="cap" aria-label="${L('บันทึกความทรงจำ', 'Add a memory')}">📷</button>` : '<span></span>';
  return `<header class="top"><div class="in">${opt.back ? `<button class="iconbtn" data-a="back" aria-label="Back">‹</button>` : ''}<div class="brand">${esc(title)}</div>${S.me.role === 'viewer' ? `<span class="tag">👀 ${L('ดูอย่างเดียว', 'view only')}</span>` : ''}${langSeg()}</div></header>
<main class="wrap">${inner}</main>
<nav class="bar" aria-label="Sections"><div class="in">
  <a href="#/"${p === '' || p === 'trip' ? ' aria-current="page"' : ''}><i>📖</i>${L('สมุด', 'Book')}</a>
  <a href="#/stamps"${cur('stamps')}><i>🏅</i>${L('แสตมป์', 'Stamps')}</a>
  ${center}
  <a href="#/kids"${cur('kids')}><i>🧒</i>${L('เด็กๆ', 'Kids')}</a>
  <a href="#/letters"${cur('letters')}><i>💌</i>${L('จดหมาย', 'Letters')}</a>
</div></nav>`;
}

function render() {
  const app = $('#app');
  if (!S) { app.innerHTML = loginView(); return; }
  const r = route(), p = r.parts[0] || '';
  let html;
  if (p === 'trip') html = viewTrip(r.parts[1], r.q);
  else if (p === 'stamps') html = viewStamps(r.parts[1]);
  else if (p === 'kids') html = viewKids();
  else if (p === 'letters') html = viewLetters();
  else if (p === 'cap') {   // deep link from the trip guide: #/cap?t=<trip>&d=<day>&key=<stop>
    const q = r.q, tid = q.get('t') || (curTrip() && curTrip().id) || '';
    history.replaceState(null, '', '#/trip/' + encodeURIComponent(tid));
    app.innerHTML = viewTrip(tid, new URLSearchParams());
    if (isEditor()) setTimeout(() => openCapture({ trip: tid, day: q.get('d'), key: q.get('key') || '' }), 0);
    return;
  }
  else if (p === 'book') { app.innerHTML = viewBook(r.parts[1], r.parts[2]); document.title = 'Memory Book'; return; }
  else html = viewShelf();
  app.innerHTML = html;
  document.documentElement.lang = lang;
}

/* ---------- login ---------- */
function loginView() {
  return `<div class="login"><div class="card"><div class="hero2">📖</div>
<h1 class="h1" style="text-align:center">${L('สมุดความทรงจำ', 'Memory Book')}</h1>
<p class="sub" style="text-align:center">${L('ของครอบครัวเรา', 'Our family’s')}</p>
<form id="lf" style="margin-top:14px">
<label>${L('รหัสครอบครัว', 'Family code')}<input id="lcode" type="password" autocomplete="current-password" autocapitalize="none" required></label>
<label style="display:block;margin-top:10px">${L('ชื่อเล่นของคุณ (ไว้บอกว่าใครบันทึก)', 'Your name (shows who saved a memory)')}<input id="lname" type="text" maxlength="24" value="${esc(ls('name') || '')}" placeholder="${L('เช่น พ่อ / แม่', 'e.g. Dad / Mum')}"></label>
<p id="lerr" class="sub" style="color:var(--red);min-height:20px;margin-top:8px"></p>
<button class="btn" style="width:100%">${L('เข้าสมุด', 'Open the book')}</button>
</form>
<div style="display:flex;justify-content:center;margin-top:14px">${langSeg()}</div></div></div>`;
}

/* ---------- shelf ---------- */
function onThisDay() {
  const d = new Date(), y = d.getFullYear();
  const hits = allMems().filter((m) => { const x = new Date(m.at); return x.getFullYear() < y && x.getMonth() === d.getMonth() && x.getDate() === d.getDate(); });
  if (!hits.length) return '';
  const yrs = y - new Date(Math.min(...hits.map((m) => m.at))).getFullYear();
  const ph = hits.flatMap((m) => m.photos).slice(0, 8);
  const q = hits.find((m) => m.text.trim());
  return `<div class="card otd"><h3>🕰️ ${L(`วันนี้เมื่อ ${yrs} ปีก่อน`, `${yrs} year${yrs > 1 ? 's' : ''} ago today`)}</h3>
${ph.length ? `<div class="thumbs">${ph.map((p) => `<img src="${pSrc(p)}" alt="" loading="lazy">`).join('')}</div>` : ''}
${q ? `<p style="margin-top:8px">“${esc(q.text)}”</p>` : ''}</div>`;
}
const tripBg = (t) => (t.cover && t.cover.length === 2 ? `;background:linear-gradient(135deg,${esc(t.cover[0])},${esc(t.cover[1])})` : '');
function coverCard(t) {
  const ms = memsOf(t.id), ph = ms.reduce((a, m) => a + m.photos.length, 0), st = S.checkins.filter((c) => c.trip === t.id).length;
  const col = hasArt(t)
    ? `<div class="col">${[1, 4, 8, 12].map((n) => `<img src="/art/day-${n}.svg" alt="">`).join('')}</div>`
    : `<div class="big">${t.days[0] && t.days[0].emo || '🧳'}</div>`;
  return `<a class="cover" href="#/trip/${esc(t.id)}" style="text-decoration:none${tripBg(t)}">${col}<b>${esc(tt(t))}</b><span>${esc(tripDates(t))}</span><div class="cnt">📸 ${ph} · 🏅 ${st}</div></a>`;
}
function viewShelf() {
  const pend = queue.length;
  const names = kids().map(kn).join(L(' และ ', ' & '));
  const sealed = S.letters.filter((l) => !l.open).length;
  return shell(L('สมุดความทรงจำ', 'Memory Book'), `
<h1 class="h1">${L('ความทรงจำของ', 'Memories of')} ${esc(names)}</h1><p class="sub">${L('ทุกทริป ทุกรอยยิ้ม อยู่ในเล่มเดียว', 'Every trip, every smile, in one book')}</p>
${pend || offline ? `<div class="card" style="margin-top:12px;border-color:var(--gold)">${offline ? `📡 ${L('ออฟไลน์ — เห็นข้อมูลล่าสุดที่เคยโหลด', 'Offline — showing the last loaded data')}<br>` : ''}${pend ? `⏳ ${L(`รอส่งขึ้นสมุด ${pend} รายการ (เก็บในเครื่องไว้แล้ว)`, `${pend} memor${pend > 1 ? 'ies' : 'y'} waiting to upload (safe on this device)`)} <button class="btn small" data-a="retry" style="margin-left:6px">${L('ส่งเลย', 'Send now')}</button>` : ''}</div>` : ''}
<div class="kidrow" style="margin-top:14px">${kids().map((k) => `<a class="kidbtn" href="#/stamps/${esc(k.id)}" style="text-decoration:none;color:inherit">${kavHtml(k)}<div><b>${esc(kn(k))}</b><span>🏅 ${medals(k.id).filter((m) => m.v >= m.g).length}/${medals(k.id).length} ${L('เหรียญ', 'medals')}</span></div></a>`).join('')}</div>
<div style="margin-top:14px">${onThisDay()}</div>
<div class="sec"><h2>${L('ชั้นหนังสือ', 'The shelf')}</h2></div>
<div class="shelf">${trips().map(coverCard).join('')}
${isEditor() ? `<button class="cover add" data-a="addtrip"><div class="big">＋</div><b>${L('ทริปใหม่', 'New trip')}</b><span>${L('เริ่มเล่มใหม่บนชั้น', 'Start a new book')}</span></button>` : ''}</div>
<div class="sec"><h2>${L('ของสะสม', 'Keepsakes')}</h2></div>
<div class="linkgrid">
<a class="lk" href="#/letters"><i>💌</i><div>${L('จดหมายถึงอนาคต', 'Letters to the future')}<small>${sealed} ${L('ฉบับยังปิดผนึก', 'sealed')}</small></div></a>
<a class="lk" href="#/kids"><i>🧒</i><div>${L('โปรไฟล์เด็กๆ', 'Kids’ profiles')}<small>${L('ส่วนสูง ของโปรด', 'height, favourites')}</small></div></a>
<a class="lk" href="/api/export.zip" download><i>💾</i><div>${L('สำรองข้อมูล + รูป', 'Backup with photos')}<small>.zip</small></div></a>
<button class="lk" data-a="logout"><i>👋</i><div>${L('ออกจากระบบ', 'Sign out')}<small>${esc(S.me.name)}</small></div></button>
</div>`);
}

/* ---------- trip view ---------- */
function tripStats(t, k) {
  const ms = memsOf(t.id).filter((m) => forKid(m, k));
  const days = new Set(ms.map((m) => m.day).concat(S.checkins.filter((c) => c.trip === t.id).map((c) => c.day)));
  days.delete(0);
  return { photos: ms.reduce((a, m) => a + m.photos.length, 0), moments: ms.filter((m) => m.text.trim()).length, stamps: S.checkins.filter((c) => c.trip === t.id).length, days: days.size };
}
function momentHtml(m) {
  const ks = m.kids.map((id) => kid(id)).filter(Boolean);
  const who = ks.map((k) => `<div>${kavHtml(k, 's')}${m.mood[k.id] ? `<div class="mo">${esc(m.mood[k.id])}</div>` : ''}</div>`).join('');
  const stop = m.stop ? `<span>${m.stop.kind === 'food' ? '🍽' : '📍'} ${esc(stopName(m.trip, m.stop.key, m.stop.name))}</span>` : '';
  const acts = isEditor() ? `<button data-a="editmem" data-id="${esc(m.id)}">${L('แก้ไข', 'Edit')}</button><button data-a="delmem" data-id="${esc(m.id)}">${L('ลบ', 'Delete')}</button>` : '';
  return `<div class="mom"><div class="who">${who}</div><div class="tx">${m.text.trim() ? `<q>${esc(m.text)}</q>` : ''}<div class="meta"><span>${fmtTime(m.at)}</span>${stop}${m.by ? `<span>· ${esc(m.by)}</span>` : ''}${m.pending ? '<span class="tag warn">⏳</span>' : ''}${acts}</div></div></div>`;
}
function dayCard(t, d, k) {
  const ms = memsOf(t.id).filter((m) => m.day === d.n && forKid(m, k)).sort((a, b) => a.at - b.at);
  const photos = ms.flatMap((m) => m.photos.map((p) => ({ p, m })));
  const lbKey = t.id + ':' + d.n + ':' + k;
  window.LB = window.LB || {};
  window.LB[lbKey] = photos.map(({ p, m }) => ({ src: pFull(p), thumb: pSrc(p), cap: m.text }));
  const story = S.stories.find((s) => s.trip === t.id && s.day === d.n && s.lang === lang) || S.stories.find((s) => s.trip === t.id && s.day === d.n);
  const stops = d.stops;
  const done = stops.filter((s) => checkin(t.id, s.key)).length;
  const now = tripDayNow(t) === d.n;
  const mos = photos.length ? `<div class="mos">${photos.slice(0, 6).map(({ p }, i) => `<button data-a="lb" data-k="${esc(lbKey)}" data-i="${i}" aria-label="photo"><img src="${pSrc(p)}" alt="" loading="lazy">${i === 5 && photos.length > 6 ? `<span class="more">+${photos.length - 6}</span>` : ''}${p.local ? '<span class="pend">⏳</span>' : ''}</button>`).join('')}</div>` : '';
  const stopRows = stops.map((s) => {
    const c = checkin(t.id, s.key);
    return `<div class="stop"><button class="ck${c ? ' on' : ''}" ${isEditor() ? '' : 'disabled'} data-a="stop" data-t="${esc(t.id)}" data-d="${d.n}" data-key="${esc(s.key)}" aria-label="check in">${c ? '✓' : ''}</button><span>${s.kind === 'food' ? '🍽' : '📍'} ${esc(s[lang] || s.en)}</span>${isEditor() ? `<button class="cm" data-a="cap" data-t="${esc(t.id)}" data-d="${d.n}" data-key="${esc(s.key)}" aria-label="memory">📷</button>` : ''}</div>`;
  }).join('');
  const art = hasArt(t) ? `<img class="art" src="${artSrc(t, d)}" alt="">` : `<div class="emo">${d.emo || '📍'}</div>`;
  return `<section class="pc" style="--acc:${esc(d.acc)};--tint0:${esc(d.tint)}">
<div class="ph">${art}<div><b>${L('วันที่', 'Day')} ${d.n} · ${esc(d.date[lang] || d.date.en)}</b><small>${esc(dtitle(d))}</small></div>${isEditor() ? `<button class="add" data-a="cap" data-t="${esc(t.id)}" data-d="${d.n}" aria-label="add">＋</button>` : ''}</div>
<div class="body">${mos}${ms.map(momentHtml).join('')}
${story ? `<div class="story"><small>✨ ${L('เรื่องของวันนี้', 'The story of the day')}</small>${esc(story.text)}</div>` : ''}
${!ms.length && !story ? `<p class="sub" style="margin:0 0 6px">${L('ยังไม่มีความทรงจำของวันนี้', 'No memories for this day yet')}</p>` : ''}
${isEditor() ? `<div class="dayact"><button class="btn small sec2" data-a="story" data-t="${esc(t.id)}" data-d="${d.n}">✍️ ${story ? L('แก้เรื่องเล่า', 'Edit story') : L('เขียนเรื่องเล่า', 'Write story')}</button>${S.features.story ? `<button class="btn small sec2" data-a="aistory" data-t="${esc(t.id)}" data-d="${d.n}">✨ ${L('ให้ Claude เล่า', 'Ask Claude')}</button>` : ''}</div>` : ''}
${stops.length ? `<details class="stops"${now ? ' open' : ''}><summary>🏅 ${L('สถานที่ & มื้ออาหาร', 'Places & meals')} (${done}/${stops.length})</summary>${stopRows}</details>` : ''}
</div></section>`;
}
function viewTrip(id, q) {
  const t = trip(id); if (!t) return shell('', `<div class="empty"><b>🤔</b>${L('ไม่พบทริปนี้', 'Trip not found')}</div>`, { back: true });
  const k = q.get('k') || '';
  const st = tripStats(t, k);
  const msAll = memsOf(t.id);
  const act = (d) => msAll.some((m) => m.day === d.n) || S.checkins.some((c) => c.trip === t.id && c.day === d.n) || S.stories.some((s) => s.trip === t.id && s.day === d.n);
  const nowN = tripDayNow(t);
  const shown = t.days.filter((d) => showAllDays || act(d) || d.n === nowN);
  const looseMs = msAll.filter((m) => m.day === 0 && forKid(m, k));
  const hero = `<div class="hero" style="${tripBg(t).slice(1)}"><p>${esc(tripDates(t))}${t.place ? ' · ' + esc(t.place) : ''}</p><h1>${esc(tt(t))}</h1>${hasArt(t) ? `<div class="col">${[1, 3, 5, 7, 9, 11, 13, 16].map((n) => `<img src="/art/day-${n}.svg" alt="">`).join('')}</div>` : ''}</div>`;
  const chips = `<div class="chips" style="margin-top:12px"><button class="chip" data-a="kf" data-k="" aria-pressed="${!k}">${L('ทุกคน', 'Everyone')}</button>${kids().map((x) => `<button class="chip" data-a="kf" data-k="${esc(x.id)}" aria-pressed="${k === x.id}">${x.emoji} ${esc(kn(x))}</button>`).join('')}</div>`;
  const books = `<div class="dayact" style="margin:0 0 4px">${kids().map((x) => `<a class="btn small sec2" style="text-decoration:none" href="#/book/${esc(t.id)}/${esc(x.id)}">📖 ${L('หนังสือของ', 'Book of')} ${esc(kn(x))}</a>`).join('')}</div>`;
  return shell(tt(t), `${hero}
<div class="stats"><div><b>${st.photos}</b><span>${L('รูป', 'photos')}</span></div><div><b>${st.moments}</b><span>${L('คำพูด', 'quotes')}</span></div><div><b>${st.stamps}</b><span>${L('แสตมป์', 'stamps')}</span></div><div><b>${st.days}</b><span>${L('วัน', 'days')}</span></div></div>
${chips}${books}
${looseMs.length ? `<section class="pc"><div class="ph"><div class="emo">🧺</div><div><b>${L('ช่วงเวลาอื่นๆ', 'Other moments')}</b><small>${L('ไม่ได้ระบุวัน', 'not tied to a day')}</small></div></div><div class="body">${looseMs.map(momentHtml).join('')}</div></section>` : ''}
${shown.map((d) => dayCard(t, d, k)).join('') || `<div class="empty"><b>📷</b>${L('ยังไม่มีความทรงจำ — กดปุ่ม 📷 ตรงกลางเพื่อเริ่ม', 'No memories yet — tap the 📷 button to start')}</div>`}
${t.days.length > shown.length || showAllDays ? `<div style="text-align:center;margin-top:16px"><button class="btn small sec2" data-a="alldays">${showAllDays ? L('ซ่อนวันที่ยังว่าง', 'Hide empty days') : L(`แสดงทุกวัน (${t.days.length})`, `Show all days (${t.days.length})`)}</button></div>` : ''}`, { back: true });
}

/* ---------- stamps ---------- */
function stampSvg(c) {
  const t = trip(c.trip), d = dayOf(t, c.day) || { acc: '#E0529C', tint: '#FFE3EE' };
  const rot = (hash(c.key) % 15) - 7, col = d.acc;
  const em = c.kind === 'food' ? '🍽️' : '📍';
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${esc(c.name)}"><g transform="rotate(${rot} 50 50)"><circle cx="50" cy="50" r="46" fill="${esc(col)}" fill-opacity=".13"/><circle cx="50" cy="50" r="45" fill="none" stroke="${esc(col)}" stroke-width="3.2"/><circle cx="50" cy="50" r="38" fill="none" stroke="${esc(col)}" stroke-width="1.4" stroke-dasharray="2.5 3.5"/><text x="50" y="58" font-size="30" text-anchor="middle">${em}</text><rect x="30" y="68" width="40" height="13" rx="6.5" fill="${esc(col)}"/><text x="50" y="78" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="KIRA UI,sans-serif">${c.day ? 'DAY ' + c.day : 'TRIP'}</text></g></svg>`;
}
function viewStamps(kidId) {
  const ks = kids(), k = kid(kidId) || ks[0];
  const ms = medals(k.id);
  const bytrip = trips().map((t) => ({ t, cs: S.checkins.filter((c) => c.trip === t.id).sort((a, b) => a.at - b.at) })).filter((x) => x.cs.length);
  const s = kidStats(k.id);
  return shell(L('แสตมป์ & เหรียญ', 'Stamps & medals'), `
<div class="chips">${ks.map((x) => `<a class="chip" href="#/stamps/${esc(x.id)}" aria-pressed="${x.id === k.id}">${x.emoji} ${esc(kn(x))}</a>`).join('')}</div>
<div class="card" style="display:flex;gap:14px;align-items:center;margin-top:8px">${kavHtml(k, 'l')}<div><div class="h1" style="font-size:22px">${L('พาสปอร์ตของ', 'Passport of')} ${esc(kn(k))}</div><div class="sub">🏅 ${s.stamps} ${L('แสตมป์', 'stamps')} · 📸 ${s.photos} · 💬 ${s.quotes}</div></div></div>
<div class="sec"><h2>${L('เหรียญ', 'Medals')}</h2></div>
<div class="medals">${ms.map((m) => { const on = m.v >= m.g; return `<div class="medal${on ? '' : ' off'}"><i>${m.e}</i><b>${m[lang]}</b>${on ? `<small>✓ ${L('ได้แล้ว!', 'earned!')}</small>` : `<div class="bar"><u style="width:${Math.round(m.v / m.g * 100)}%"></u></div><small>${m.v}/${m.g}</small>`}</div>`; }).join('')}</div>
${bytrip.map(({ t, cs }) => `<div class="sec"><h2>${esc(tt(t))}</h2><a href="#/trip/${esc(t.id)}">${L('เปิดเล่ม', 'Open')} ›</a></div><div class="stamps">${cs.map((c) => `<div class="stamp">${stampSvg(c)}<b>${esc(stopName(c.trip, c.key, c.name))}</b><small>${fmtDate(c.at)}</small></div>`).join('')}</div>`).join('') || `<div class="empty"><b>🏅</b>${L('ยังไม่มีแสตมป์ — เช็คอินที่สถานที่หรือร้านอาหารในสมุดทริปเพื่อสะสม', 'No stamps yet — check in at a place or meal inside a trip')}</div>`}`, { back: false });
}

/* ---------- kids ---------- */
function viewKids() {
  const heightN = (s) => parseFloat(String(s).replace(',', '.')) || 0;
  return shell(L('เด็กๆ', 'The kids'), kids().map((k) => {
    const rows = trips().map((t) => ({ t, p: S.tripkid.find((x) => x.trip === t.id && x.kid === k.id) })).filter((x) => x.p || true);
    const hs = rows.filter((r) => r.p && heightN(r.p.height) > 0);
    const mx = Math.max(1, ...hs.map((r) => heightN(r.p.height)));
    return `<div class="kcard" style="--c:${esc(k.color)}"><header>${kavHtml(k, 'l')}<div style="flex:1"><h3>${esc(kn(k))}</h3><div class="sub">${k.birth ? `🎂 ${esc(k.birth)} · ${ageText(k.birth)}` : L('ยังไม่ได้ใส่วันเกิด', 'No birthday yet')}</div></div>${isEditor() ? `<button class="btn small sec2" data-a="kidedit" data-id="${esc(k.id)}">✏️</button>` : ''}</header>
${hs.length ? `<div class="bars">${hs.map((r) => `<div><i style="height:${Math.round(heightN(r.p.height) / mx * 70)}px"></i>${esc(r.p.height)}<br>${esc(tt(r.t)).slice(0, 10)}</div>`).join('')}</div>` : ''}
${rows.map(({ t, p }) => `<div class="krow"><b>${esc(tt(t))}</b>${p ? `<span>${[p.age && '🎈 ' + esc(p.age), p.height && '📏 ' + esc(p.height), p.fav && '⭐ ' + esc(p.fav)].filter(Boolean).join(' · ') || '—'}${p.note ? '<br>' + esc(p.note) : ''}</span>` : `<span>—</span>`}${isEditor() ? `<button class="btn small sec2" data-a="tkedit" data-id="${esc(k.id)}" data-t="${esc(t.id)}">${p ? '✏️' : '＋'}</button>` : ''}</div>`).join('')}
</div>`;
  }).join(''));
}

/* ---------- letters ---------- */
function untilText(d) {
  const a = new Date(), b = new Date(d + 'T00:00:00');
  let m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) m--;
  const y = Math.floor(m / 12); m = m % 12;
  if (y <= 0 && m <= 0) return L(`อีก ${Math.max(1, Math.ceil((b - a) / 864e5))} วัน`, `in ${Math.max(1, Math.ceil((b - a) / 864e5))} days`);
  return L(`อีก ${y ? y + ' ปี ' : ''}${m ? m + ' เดือน' : ''}`, `in ${y ? y + ' y ' : ''}${m ? m + ' m' : ''}`);
}
function viewLetters() {
  const ls_ = S.letters;
  const item = (l) => {
    const k = kid(l.to), who = k ? kn(k) : L('ทุกคน', 'everyone');
    if (l.open) return `<button class="letter" data-a="readletter" data-id="${esc(l.id)}"><i>💌</i><div><b>${esc(l.title || L('ถึง ', 'To ') + who)}</b><small>${L('ถึง', 'for')} ${esc(who)} · ${L('เขียนโดย', 'by')} ${esc(l.by)} · ${fmtDate(l.at)}</small></div></button>`;
    return `<button class="letter sealed" data-a="${l.mine ? 'editletter' : 'sealedtoast'}" data-id="${esc(l.id)}"><i>🔒</i><div><b>${esc(l.title || L('ถึง ', 'To ') + who)}</b><small>${L('เปิดอ่านได้', 'opens')} ${esc(l.open_at)} (${untilText(l.open_at)})${l.mine ? ' · ' + L('ของคุณ แตะเพื่อแก้', 'yours — tap to edit') : ''}</small></div></button>`;
  };
  return shell(L('จดหมายถึงอนาคต', 'Letters to the future'), `
<p class="sub">${L('ปิดผนึกจริงที่เซิร์ฟเวอร์ — ข้อความจะไม่ถูกส่งมาที่เครื่องของคนอื่นจนถึงวันเปิด (เห็นเฉพาะผู้เขียนเอง)', 'Truly sealed on the server — the text is not sent to anyone else until the opening date (only the author can see their own).')}</p>
${isEditor() ? `<div style="margin:12px 0"><button class="btn" data-a="newletter">✉️ ${L('เขียนจดหมายใหม่', 'Write a letter')}</button></div>` : ''}
${ls_.length ? ls_.map(item).join('') : `<div class="empty"><b>💌</b>${L('ยังไม่มีจดหมาย — เขียนถึงมีมี่และมีก้าตอนโต แล้วตั้งวันเปิดอ่าน', 'No letters yet — write to the kids for when they are older and set an opening date')}</div>`}`);
}

/* ---------- printable book ---------- */
function viewBook(tripId, kidId) {
  const t = trip(tripId), k = kid(kidId);
  if (!t || !k) return shell('', '<div class="empty">?</div>', { back: true });
  const ms = memsOf(t.id).filter((m) => forKid(m, k.id)).sort((a, b) => a.at - b.at);
  const prof = S.tripkid.find((x) => x.trip === t.id && x.kid === k.id);
  const days = t.days.filter((d) => ms.some((m) => m.day === d.n) || S.checkins.some((c) => c.trip === t.id && c.day === d.n) || S.stories.some((s) => s.trip === t.id && s.day === d.n));
  const cover = `<div class="page"><div class="cov"><div class="big">${k.emoji}</div><h1>${esc(tt(t))}</h1><h2>${L('ของ', 'of')} ${esc(kn(k))}</h2><p>${esc(tripDates(t))}${prof && prof.age ? ' · ' + esc(prof.age) : ''}</p>
${hasArt(t) ? `<div class="cgrid">${[1, 3, 5, 7, 9, 11, 13, 16].map((n) => `<img src="/art/day-${n}.svg" alt="">`).join('')}</div>` : ''}
${prof && (prof.height || prof.fav || prof.note) ? `<p>${[prof.height && '📏 ' + esc(prof.height), prof.fav && '⭐ ' + esc(prof.fav)].filter(Boolean).join(' · ')}</p><p><i>${esc(prof.note || '')}</i></p>` : ''}</div></div>`;
  const pages = days.map((d) => {
    const dm = ms.filter((m) => m.day === d.n), ph = dm.flatMap((m) => m.photos);
    const story = S.stories.find((s) => s.trip === t.id && s.day === d.n && s.lang === lang) || S.stories.find((s) => s.trip === t.id && s.day === d.n);
    const cs = S.checkins.filter((c) => c.trip === t.id && c.day === d.n);
    return `<div class="page" style="--acc:${esc(d.acc)}"><div class="dh">${hasArt(t) ? `<img src="${artSrc(t, d)}" alt="">` : `<span style="font-size:30pt">${d.emo || '📍'}</span>`}<div><h2>${L('วันที่', 'Day')} ${d.n} · ${esc(dtitle(d))}</h2><small>${esc(d.date[lang] || d.date.en)}</small></div></div>
${ph.length ? `<div class="pm">${ph.map((p) => `<img src="${pFull(p)}" alt="">`).join('')}</div>` : ''}
${story ? `<div class="st">${esc(story.text)}</div>` : ''}
${dm.filter((m) => m.text.trim()).map((m) => `<div class="bq"><q>${esc(m.text)}</q>${m.mood[k.id] ? ' ' + esc(m.mood[k.id]) : ''}</div>`).join('')}
${cs.length ? `<div class="sg">${cs.map((c) => `<div>${stampSvg(c)}</div>`).join('')}</div>` : ''}</div>`;
  }).join('');
  const bar = `<div class="bookbar"><button class="btn small sec2" data-a="back">‹ ${L('กลับ', 'Back')}</button><div class="chips" style="padding:0">${kids().map((x) => `<a class="chip" href="#/book/${esc(t.id)}/${esc(x.id)}" aria-pressed="${x.id === k.id}">${x.emoji} ${esc(kn(x))}</a>`).join('')}</div><button class="btn small" data-a="print">🖨 ${L('พิมพ์ / PDF', 'Print / PDF')}</button></div>`;
  return bar + cover + (pages || `<div class="empty"><b>📖</b>${L('ยังไม่มีเนื้อหาในเล่มนี้', 'Nothing in this book yet')}</div>`);
}
