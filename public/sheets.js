'use strict';
/* ===== Memory Bookshelf · actions, photos, lightbox, sheets, boot ===== */

/* ---------- writes (all through the offline queue) ---------- */
function putEntry(t, row, id) {
  const body = { trip: t.id, day: row.day, kind: row.kind, child: row.child || null, text: row.text || '', mood: row.mood || null, first_key: row.first_key || null, lang: row.lang || null, highlight: !!row.highlight, at: row.at || Date.now() };
  const cur = S.entries.find((e) => e.id === id), tr = cur && cur.text === body.text ? cur.tr || null : null;   // an edited text drops its translation (the server does the same)
  return enqueue({ method: 'PUT', url: '/api/b/entries/' + encodeURIComponent(id), body, local: { coll: 'entries', id, row: { ...body, tr, created_by: S.me.name, mine: true } } });
}
const delEntry = (id) => enqueue({ method: 'DELETE', url: '/api/b/entries/' + encodeURIComponent(id), local: { coll: 'entries', id, del: true } });
let spendCat = 'food', spendCur = '';   // the spend box remembers the last category / money while recording

// the day as a message for LINE or Messages: title and date, what they said, the favourite, the firsts — the photos travel
// along as files from this phone (never a link: nothing in the book has a public URL)
function shareText(t, i) {
  const d = t.days[i], es = entriesOf(t.id, i);
  const lines = [`${T(d.title)} · ${fmtDay(d.date)}`];
  es.filter((e) => e.kind === 'quote').forEach((e) => lines.push(`${kidName(e.child)}: “${e.text}”`));
  const fav = es.find((e) => e.kind === 'fav'); if (fav && fav.text) lines.push(`${L('ของโปรดวันนี้', 'Favourite today')}: ${fav.text}`);
  es.filter((e) => e.kind === 'first').forEach((e) => { const f = t.firsts.find((x) => x.key === e.first_key); lines.push(`🌟 ${kidName(e.child)} — ${e.first_key === 'custom' ? e.text : f ? T(f.label) : e.first_key}`); });
  return lines.join('\n');
}

// shrink on the phone before upload (saves mobile data); EXIF is stripped again on the server anyway
async function shrink(file) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const s = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
    if (s === 1 && file.type === 'image/jpeg' && file.size < 4e6) return file;
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob((b) => res(b || file), 'image/jpeg', 0.86));
  } catch (_) { return file; }   // e.g. HEIC the browser can't decode — the server converts it
}
async function addPhotos(t, day, files) {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
  if (!list.length) return;
  toast(L(`เตรียมรูป ${list.length} รูป…`, `Preparing ${list.length} photos…`));
  for (const f of list) {
    const blob = await shrink(f);
    const id = uid('ph');
    const at = f.lastModified && Math.abs(f.lastModified - Date.now()) < 400 * 864e5 ? Math.min(f.lastModified, Date.now()) : Date.now();
    await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}`, blob,
      local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0 } } });
  }
}

/* ---------- voice memos: a few seconds of the kids' own voices, recorded on the phone (MediaRecorder) and queued exactly like a
   photo (blob upload, retried offline). 30 s cap. The clip stays in our bucket; it never goes to Claude or anywhere else. */
let recState = null, kidAudioEl = null;
async function startRec(t, day) {
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (_) { toast(L('ไม่ได้รับอนุญาตให้ใช้ไมค์', 'Microphone not allowed')); return; }
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((m) => MediaRecorder.isTypeSupported(m)) || '';
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined), chunks = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = async () => {
    stream.getTracks().forEach((x) => x.stop());
    const st = recState; recState = null; clearInterval(st.timer);
    const secs = Math.round((Date.now() - st.started) / 1000), type = (rec.mimeType || mime || 'audio/webm').split(';')[0];
    const blob = new Blob(chunks, { type });
    if (blob.size < 1000 || secs < 1) { toast(L('สั้นเกินไป ลองอัดใหม่', 'Too short — try again')); render(); return; }
    await addClip(t, day, blob, secs); render();
  };
  recState = { rec, stream, started: Date.now(), timer: setInterval(() => { const el = $('#rectime'), sec = Math.round((Date.now() - recState.started) / 1000); if (el) el.textContent = `0:${String(sec).padStart(2, '0')}`; if (sec >= 30) stopRec(); }, 250) };
  rec.start(); render();
}
function stopRec() { if (recState && recState.rec.state !== 'inactive') recState.rec.stop(); }
async function addClip(t, day, blob, secs) {
  const id = uid('vc'), at = Date.now(), type = blob.type || 'audio/webm';
  await enqueue({ method: 'PUT', url: `/api/b/media/${id}?trip=${encodeURIComponent(t.id)}&day=${day}&at=${at}&kind=audio`, blob,
    local: { coll: 'media', id, row: { trip: t.id, day, caption: '', highlight: false, at, w: 0, h: 0, mime: type } } });
  toast(L(`เก็บเสียง ${secs} วินาทีแล้ว`, `${secs} s of voice saved`));
}

/* ---------- actions ---------- */
const A = {
  lang(b) { lang = b.dataset.v; ls('lang', lang); render(); if (ls('remind')) pushSub().then((s) => s && api('POST', '/api/b/push/sub', { ...s.toJSON(), lang })).catch(() => {}); },   // reminders follow the language
  fs() {   // text size: normal → large → larger → largest (the page content zooms; the bars stay put)
    const n = ((+ls('fs') || 0) + 1) % 4; ls('fs', n); document.documentElement.dataset.fs = String(n);
    $$('.fsb').forEach((b) => { b.dataset.l = n; });
    toast(L(`ขนาดตัวอักษร: ${['ปกติ', 'ใหญ่', 'ใหญ่มาก', 'ใหญ่สุด'][n]}`, `Text size: ${['normal', 'large', 'larger', 'largest'][n]}`));
  },
  sq(b) { bookQ = b.dataset.v; const i = $('#bookq'), r = $('#bookres'), t = trip(route().parts[1]); if (i) i.value = bookQ; if (r && t) r.innerHTML = bookResults(t); },   // a suggestion chip
  eatgo(b) { eatTrip = b.dataset.t; eatQ = b.dataset.v; eatKind = -1; eatPick = false; location.hash = `#/t/${encodeURIComponent(b.dataset.t)}/eat/all`; },   // a place found by the search: open the list filtered to it
  async remind() {
    if (ls('remind')) {
      const s = await pushSub().catch(() => null);
      if (s) { await api('POST', '/api/b/push/unsub', { endpoint: s.endpoint }).catch(() => {}); await s.unsubscribe().catch(() => {}); }
      ls('remind', null); render(); toast(L('ปิดการเตือนบนเครื่องนี้แล้ว', 'Reminders off on this phone')); return;
    }
    if (!pushOk()) {
      const ios = /iP(hone|ad|od)/.test(navigator.userAgent) && !matchMedia('(display-mode: standalone)').matches;
      toast(ios ? L('บน iPhone: กดปุ่มแชร์ → "เพิ่มไปยังหน้าจอโฮม" แล้วเปิดแอปจากไอคอน จึงจะเปิดการเตือนได้', 'On iPhone: Share → "Add to Home Screen", open the app from its icon, then turn reminders on')
        : L('เบราว์เซอร์นี้ยังไม่รองรับการแจ้งเตือน', 'This browser cannot show reminders')); return;
    }
    if (await Notification.requestPermission() !== 'granted') { toast(L('ต้องกด "อนุญาต" การแจ้งเตือนก่อน', 'Allow notifications first')); return; }
    try {
      const { key } = await api('GET', '/api/b/push/key'), reg = await navigator.serviceWorker.ready;
      const s = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(key) }));
      await api('POST', '/api/b/push/sub', { ...s.toJSON(), lang });
      ls('remind', 1); render(); toast(L('เปิดการเตือนแล้ว ✓ จะเด้งก่อนทุกกิจกรรม 30 นาที · ทดสอบหรือปิดได้ที่หน้าใช้ออฟไลน์', 'Reminders on ✓ — 30 min before each step · test or turn off on the Offline page'));
    } catch (_) { toast(L('เปิดการเตือนไม่สำเร็จ ลองอีกครั้ง', 'Could not turn reminders on — try again')); }
  },
  async remindtest() {
    const s = await pushSub().catch(() => null);
    if (!s) { ls('remind', null); render(); toast(L('เครื่องนี้ยังไม่ได้เปิดการเตือน', 'Reminders are not on for this phone')); return; }
    try { await api('POST', '/api/b/push/test', { endpoint: s.endpoint }); toast(L('ส่งแล้ว — ดูแจ้งเตือนบนเครื่องนี้', 'Sent — look for it on this phone')); }
    catch (_) { toast(L('ส่งทดสอบไม่สำเร็จ', 'The test did not go through')); }
  },
  jump(b, e) { e.preventDefault(); const el = document.getElementById('d' + b.dataset.v); if (el) el.scrollIntoView({ behavior: 'smooth' }); },
  pin(b) {
    const f = $('#lcode'), k = b.dataset.v;
    f.value = k === 'clear' ? '' : k === 'back' ? f.value.slice(0, -1) : (f.value + k).slice(0, 32);
    $('#lerr').textContent = '';
  },
  'who-login'(b) { const n = $('#lname'); n.value = n.value === b.dataset.v ? '' : b.dataset.v; $$('[data-a="who-login"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === n.value)); },
  print() { window.print(); },
  async pdf(b) {   // fetch, then save: a failed render shows a message instead of replacing the app with an error page
    if (b.getAttribute('aria-busy') === 'true') return;
    if (!navigator.onLine) { toast(L('ต้องมีสัญญาณตอนสร้าง PDF', 'Making the PDF needs a connection')); return; }
    b.setAttribute('aria-busy', 'true'); toast(L('กำลังสร้าง PDF พร้อมรูป… อาจใช้เวลาครึ่งนาที', 'Making the PDF with photos… may take half a minute'));
    try {
      const r = await fetch(b.getAttribute('href'), { credentials: 'same-origin' });
      if (!r.ok || !/pdf/.test(r.headers.get('content-type') || '')) throw new Error(String(r.status));
      const url = URL.createObjectURL(await r.blob()), a = document.createElement('a');
      a.href = url; a.download = (b.getAttribute('href').split('/').pop() || 'memory-book') + '.pdf'; document.body.append(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 10000);
      toast(L('ได้ไฟล์ PDF แล้ว ✓', 'PDF ready ✓'));
    } catch (_) { toast(L('สร้าง PDF ไม่สำเร็จ ลองอีกครั้งในอีกสักครู่', 'Could not make the PDF — try again in a moment')); }
    finally { b.removeAttribute('aria-busy'); }
  },
  async copytext() {
    const t = trip(route().parts[1]); if (!t) return;
    const lines = [T(t.title), fmtRange(t), ''];
    t.days.forEach((d, i) => {
      if (!dayHasContent(t, i)) return;
      const es = entriesOf(t.id, i);
      lines.push(`${L('วันที่', 'Day')} ${i + 1} · ${fmtDay(d.date)} — ${T(d.title)}`);
      const pl = placesOf(t.id, i).map((p) => T(p.name)); if (pl.length) lines.push(`  ${L('ที่ไป', 'Places')}: ${pl.join(', ')}`);
      const md = es.filter((e) => e.kind === 'mood' && e.mood).map((e) => `${kidName(e.child)} ${e.mood}`); if (md.length) lines.push(`  ${L('อารมณ์', 'Mood')}: ${md.join(' · ')}`);
      es.filter((e) => e.kind === 'quote').forEach((e) => lines.push(`  “${e.text}” — ${kidName(e.child)}`));
      const fav = es.find((e) => e.kind === 'fav'); if (fav) lines.push(`  ${L('ของโปรด', 'Favourite')}: ${fav.text}`);
      const note = es.find((e) => e.kind === 'note'); if (note) lines.push(`  ${L('บันทึก', 'Note')}: ${note.text}`);
      es.filter((e) => e.kind === 'first').forEach((e) => lines.push(`  ${L('ครั้งแรก', 'First')}: ${e.first_key === 'custom' ? e.text : firstLabel(t, e.first_key).t} — ${kidName(e.child)}`));
      lines.push('');
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(L('คัดลอกแล้ว', 'Copied')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Copy not available here')); }
  },
  who(b) { quoteWho = b.dataset.v; render(); },
  async savequote(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, ta = $('#qtext'), text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    delete drafts[ta.dataset.draft]; ta.value = '';
    await putEntry(t, { day: d, kind: 'quote', child: quoteWho, text }, uid('q'));
    toast(L('บันทึกคำพูดแล้ว', 'Quote saved'));
  },
  hiq(b) { const e = S.entries.find((x) => x.id === b.dataset.v); if (e) putEntry(trip(e.trip), { ...e, highlight: !e.highlight }, e.id); },
  spendcat(b) { spendCat = b.dataset.v; $$('[data-a="spendcat"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === spendCat)); const f = $('.spendfood'); if (f) f.hidden = spendCat !== 'food'; },
  spendcur(b) { spendCur = b.dataset.v; $$('[data-a="spendcur"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === spendCur)); },
  async addspend(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, amt = $('#spendamt'), note = $('#spendnote');
    const n = Number(String(amt.value).replace(/[^\d.]/g, ''));
    if (!(n >= 0) || !amt.value.trim()) { amt.focus(); return; }
    const curs = tripCurs(t), cur = curs.includes(spendCur) ? spendCur : curs[0], id = uid('sp');
    const body = { trip: t.id, day: d, amount: n, cur, cat: spendCat, note: note.value.trim() };
    delete drafts[amt.dataset.draft]; delete drafts[note.dataset.draft]; amt.value = ''; note.value = '';
    await enqueue({ method: 'PUT', url: '/api/b/spend/' + encodeURIComponent(id), body, local: { coll: 'spend', id, row: { ...body, at: Date.now(), created_by: S.me.name } } });
    toast(L('จดแล้ว', 'Noted'));
  },
  delspend(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/spend/' + encodeURIComponent(b.dataset.v), local: { coll: 'spend', id: b.dataset.v, del: true } }); },
  rec(b) { if (recState) stopRec(); else startRec(trip(b.dataset.t), +b.dataset.d); },
  delclip(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/media/' + encodeURIComponent(b.dataset.v), local: { coll: 'media', id: b.dataset.v, del: true } }); },
  kidplay(b) { kidAudioEl = kidAudioEl || new Audio(); kidAudioEl.src = `/media/${encodeURIComponent(b.dataset.v)}`; kidAudioEl.play().catch(() => {}); },
  // the day's words and up to three photos go to whatever the phone can share with (LINE, Messages…); the photos are fetched
  // from our own server with the session cookie and handed over as files, so no public link is ever made
  async share(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d, files = [];
    const own = b.dataset.src === 'msg' && $('#msgtext') ? $('#msgtext').value.trim() : '', text = own || shareText(t, i);   // Claude's note (edited) or the plain day
    if (!navigator.share) {   // a desktop browser: copy the words instead
      try { await navigator.clipboard.writeText(text); toast(L('คัดลอกข้อความแล้ว — วางใน LINE ได้เลย', 'Copied — paste it into LINE')); } catch (_) { toast(L('คัดลอกไม่สำเร็จ', 'Could not copy')); }
      return;
    }
    if (navigator.onLine) {
      const ph = mediaOf(t.id, i), pick = ph.filter((m) => m.highlight).concat(ph.filter((m) => !m.highlight)).filter((m) => !m.pending).slice(0, 3);
      for (const m of pick) { try { const r = await fetch(`/media/${encodeURIComponent(m.id)}`, { credentials: 'same-origin' }); if (r.ok) files.push(new File([await r.blob()], `${m.id}.jpg`, { type: 'image/jpeg' })); } catch (_) {} }
    }
    const withFiles = files.length && navigator.canShare && navigator.canShare({ files });
    try { await navigator.share(withFiles ? { text, files } : { text }); } catch (e) { if (e.name !== 'AbortError') toast(L('แชร์ไม่สำเร็จ', 'Could not share')); }
  },
  // sign out: the cookie goes on the server, the offline copy of the book goes from this phone (a lent phone keeps nothing)
  async logout(b) {
    if (queue.length) { toast(L('ยังมีบันทึกรอส่ง — ต่อเน็ตให้ส่งเสร็จก่อนออกจากระบบ', 'Some records are still waiting to upload — connect first')); return; }
    if (!armed(b, L('แตะอีกครั้งเพื่อออกจากระบบ', 'Tap again to sign out'))) return;
    try { await api('POST', '/api/logout'); } catch (_) {}
    await idb.set('state', null); ls('state', null); ls('lostTel', null);   // the parents' numbers for the lost-child card go too
    S = null; location.hash = '#/'; render();
  },
  delentry(b) { if (armed(b)) delEntry(b.dataset.v); },
  mood(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, k = b.dataset.k, id = `${t.id}.mood.d${d}.${k}`;
    const cur = S.entries.find((e) => e.id === id);
    if (cur && cur.mood === b.dataset.v) delEntry(id);   // tap again = clear
    else { burst(b, [b.dataset.v, '✨']); putEntry(t, { day: d, kind: 'mood', child: k, mood: b.dataset.v }, id); }
  },
  first(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, key = b.dataset.v, k = b.dataset.k;
    const ex = S.entries.find((e) => e.trip === t.id && e.kind === 'first' && e.first_key === key && e.child === k);
    if (ex && ex.day !== d) { toast(L(`${kidName(k)} ได้ "ครั้งแรก" นี้ไปแล้วในวันที่ ${ex.day + 1} — แก้ได้ที่หน้าวันนั้น`, `${kidName(k)} already had this first on day ${ex.day + 1} — change it on that day`)); return; }   // never untick another day's first from here
    if (ex) delEntry(ex.id); else { burst(b, ['🌟', '✨', '🎉']); putEntry(t, { day: d, kind: 'first', child: k, first_key: key }, `${t.id}.first.${key}.${k}`); }
  },
  customfirst(b) {
    const inp = $('#firsttext'), text = inp.value.trim(); if (!text) { inp.focus(); return; }
    delete drafts[inp.dataset.draft]; inp.value = '';
    putEntry(trip(b.dataset.t), { day: +b.dataset.d, kind: 'first', child: b.dataset.k, first_key: 'custom', text }, uid('fc'));
  },
  // the little one's new words (passport page): a quote for that child on today's day of the trip
  littleword(b) {
    const t = trip(b.dataset.t), kid = b.dataset.k, inp = $(`#lw-${kid}`), text = inp ? inp.value.trim() : '';
    if (!text) { if (inp) inp.focus(); return; }
    delete drafts[inp.dataset.draft]; inp.value = '';
    putEntry(t, { day: todayIdx(t), kind: 'quote', child: kid, text }, uid('q'));
    burst(b, ['🗣️', '✨', '💛']);
  },
  // passport: a mission spot / animal / explorer box (tap again to untick); food has YUM / YUCK
  tick(b) {
    const t = trip(b.dataset.t), k = b.dataset.k, key = b.dataset.v, yum = b.dataset.yum || '', id = `${t.id}.tick.${key}.${k}`;
    const cur = S.entries.find((e) => e.id === id), before = certEarned(t, k);
    if (cur && cur.text === yum) { delEntry(id); return; }
    burst(b, yum === 'yuck' ? ['😖', '💦'] : yum ? ['😋', '✨'] : ['⭐', '✨', '🎉']);
    putEntry(t, { day: b.dataset.d === '' ? null : +b.dataset.d, kind: 'tick', child: k, first_key: key, text: yum }, id);
    if (!before && certEarned(t, k)) toast(L(`🎉 ${kidName(k)} ได้ใบประกาศนักสำรวจแล้ว!`, `🎉 ${kidName(k)} earned the explorer certificate!`));
  },
  place(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, key = b.dataset.v;
    const p = (t.days[d].planned || []).find((x) => x.key === key) || { en: key, th: key };
    const id = `${t.id}:${key}`, done = !S.places.some((x) => x.trip === t.id && x.key === key);
    if (done) burst(b, ['📍', '✨']);
    enqueue({ method: 'PUT', url: '/api/b/places', body: { trip: t.id, key, day: d, kind: b.dataset.k, name: { en: p.en, th: p.th, zh: p.zh }, done, at: Date.now() },
      local: done ? { coll: 'places', id, row: { trip: t.id, key, day: d, kind: b.dataset.k, name: { en: p.en, th: p.th }, at: Date.now() } } : { coll: 'places', id, del: true } });
  },
  done(b) {
    const t = trip(b.dataset.t), d = +b.dataset.d, day = t.days[d], done = !day.done_at;
    day.done_at = done ? Date.now() : null;   // optimistic; not re-applied after reload, the server copy wins
    if (done) { burst(b, ['🎉', '✨', '⭐']); toast(L('ได้ตราประทับของวันนี้ในพาสปอร์ตแล้ว 🛂', 'Today’s stamp is in the passports 🛂')); }
    enqueue({ method: 'PUT', url: `/api/b/days/${encodeURIComponent(t.id)}/${d}`, body: { done } });
  },
  // Claude, only when pressed: data-m "story" (bedtime story, #story…), "sum" (the day in a few lines into the #sumtext box, #sum…)
  // or "msg" (a note for the relatives into #msgtext — never saved, kept as a draft until it is shared);
  // story/sum are saved by the server, so the page reloads the state; a summary lands in its textarea and stays editable (blur saves)
  async story(b) {
    if (storyCtl) return;
    const mode = ['sum', 'msg', 'talk', 'letter'].includes(b.dataset.m) ? b.dataset.m : 'story', sum = ['sum', 'msg', 'letter'].includes(mode);   // sum/msg write into a textarea; story/talk into a box
    const t = trip(b.dataset.t), day = b.dataset.d === '' ? null : +b.dataset.d;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตเพื่อใช้ Claude', 'Claude needs a connection')); return; }
    const box = $(`#${mode}text`), msg = sum ? $(`#${mode}msg`) : box, before = sum ? box.value : '';
    const say = (x) => { if (sum) { box.value = before; msg.textContent = x; } else box.textContent = x; };
    const show = (x) => { if (sum) box.value = x; else box.textContent = x; };
    box.hidden = false; show(''); box.classList.add('writing'); if (sum) box.readOnly = true;
    $(`#${mode}go`).disabled = true; $(`#${mode}stop`).hidden = false;
    storyCtl = new AbortController();
    let text = '';
    try {
      const r = await fetch('/api/b/story', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal,
        headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: t.id, day, lang, mode }) });
      if (r.status === 422) { say(L('ยังไม่มีบันทึกของวันนี้ — เพิ่มคำพูด คำอธิบายรูป หรือเช็คอินก่อน', 'Nothing written down yet — add a quote, a photo caption or a check-in first')); return; }
      if (r.status === 429) { say(L('วันนี้ใช้ Claude ครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the Claude writing for today — more tomorrow')); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '', ev = null;
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {   // one SSE event per blank line
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2); ev = null;
          let data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; show(text); }
          else if (ev === 'done' && mode === 'msg') {   // nothing saved: keep it as the box's draft so a re-render can't lose it
            drafts[box.dataset.draft] = box.value = d.text || text; msg.textContent = '';
            const send = $('#msgsend'); if (send) send.hidden = false;
            toast(L('แก้ข้อความได้ แล้วกดส่ง', 'Edit it if you like, then send'));
          } else if (ev === 'done') {
            if (sum) delete drafts[box.dataset.draft];   // the saved summary wins over a half-typed draft
            storyCtl = null; await load(); render();
            toast(mode === 'letter' ? L('เก็บร่างจดหมายแล้ว — แก้ในช่องให้เป็นคำของเราเอง', 'Draft saved — make it your own words in the box') : sum ? L('เก็บสรุปไว้ในสมุดแล้ว — แก้ในช่องได้', 'Summary saved in the book — edit it in the box') : mode === 'talk' ? L('คำถามอยู่ในโหมดเด็กแล้ว — แตะ 💬 คุยกัน', 'The questions are in kid mode — tap 💬 Let’s talk') : L('เก็บนิทานไว้ในสมุดแล้ว', 'Story saved in the book'));
          } else if (ev === 'error') say(d.error === 'refusal' ? L('Claude เขียนอันนี้ไม่ได้ ลองเพิ่มบันทึกแล้วลองใหม่', 'Claude could not write this one — try again later') : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') { if (sum) box.value = before; toast(L('หยุดแล้ว — ไม่ได้บันทึก', 'Stopped — nothing saved')); }
      else say(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally {
      storyCtl = null; aiUseAt = 0;
      const bx = $(`#${mode}text`); if (bx) { bx.classList.remove('writing'); bx.readOnly = false; }
      const go = $(`#${mode}go`), stop = $(`#${mode}stop`); if (go) go.disabled = false; if (stop) stop.hidden = true;
    }
  },
  storystop() { if (storyCtl) storyCtl.abort(); },
  lckid(b) { lostKid = b.dataset.v; render(); },
  async lostcard(b) {
    const t = trip(b.dataset.t), kid = b.dataset.v;
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const blob = await drawLostCard(t, kid, lostPhoto, ls('lostTel') || []);
      lastCard = blob;
      const prev = $('#lcprev'); if (prev) { if (prev.src.startsWith('blob:')) URL.revokeObjectURL(prev.src); prev.src = URL.createObjectURL(blob); prev.hidden = false; }
      const file = new File([blob], `lost-card-${kid}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); } catch (e) { if (e.name !== 'AbortError') throw e; } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast(L('บันทึกรูปการ์ดแล้ว', 'Card saved')); }
    } catch (_) { toast(L('ทำการ์ดไม่สำเร็จ', 'Could not make the card')); }
    finally { b.disabled = false; b.removeAttribute('aria-busy'); }
  },
  // the day card: drawn here, then the phone's share sheet (LINE…), or a download on a computer
  async daycard(b) {
    const t = trip(b.dataset.t), i = +b.dataset.d;
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const blob = await drawDayCard(t, i), file = new File([blob], `${t.id}-day${i + 1}.png`, { type: 'image/png' });
      lastCard = blob;
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); } catch (e) { if (e.name !== 'AbortError') throw e; } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast(L('บันทึกรูปการ์ดแล้ว', 'Card saved')); }
    } catch (_) { toast(L('ทำการ์ดไม่สำเร็จ', 'Could not make the card')); }
    finally { b.disabled = false; b.removeAttribute('aria-busy'); }
  },
  // what our family likes: the notebook of every trip → Claude → saved for both parents (settings), streamed into #likestext
  async likes(b) {
    if (storyCtl) return;
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตเพื่อใช้ Claude', 'Claude needs a connection')); return; }
    const box = $('#likestext'), before = box.textContent; box.hidden = false; box.textContent = ''; b.disabled = true;
    storyCtl = new AbortController();
    let text = '';
    try {
      const r = await fetch('/api/b/likes', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal, headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ lang }) });
      if (r.status === 422) { box.textContent = L('ยังไม่มีรีวิวในสมุดโน้ต — ให้ดาวที่พัก ร้าน สถานที่ ในหน้าบันทึกก่อน', 'No reviews yet — rate stays, food and places on the record pages first'); return; }
      if (r.status === 429) { box.textContent = L('วันนี้ใช้ Claude ครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the Claude writing for today — more tomorrow'); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
          let ev = null, data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; box.textContent = text; }
          else if (ev === 'done') { likes = d; storyCtl = null; render(); toast(L('เก็บสรุปไว้แล้ว', 'Saved')); }
          else if (ev === 'error') box.textContent = L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
        }
      }
    } catch (e) {
      box.textContent = e.name === 'AbortError' ? before : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again');
    } finally { storyCtl = null; aiUseAt = 0; const g = $('#likesgo'); if (g) g.disabled = false; }
  },
  jump(b) { const el = $(b.dataset.v); if (el) { el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); } },
  // relatives' groups (#/viewers): the form lives in vgForm (views.js) so a background render keeps the ticks
  wifionly(b) { ls('wifionly', b.checked ? 1 : null); upNow = false; renderProgress(); flush(); },
  upnow() { upNow = true; toast(L('กำลังส่งรูปที่รออยู่…', 'Sending the waiting photos…')); renderProgress(); flush(); },
  vgtrip(b) { const s2 = new Set(vgForm.trips); if (b.checked) s2.add(b.dataset.v); else s2.delete(b.dataset.v); vgForm.trips = [...s2]; },
  vglink(b) { vgForm.link = b.checked; },
  vgnewlink(b) { vgForm.newLink = b.checked; },
  vgedit(b) {
    const g = (Array.isArray(vg) ? vg : []).find((x) => x.id === b.dataset.v); if (!g) return;
    vgForm = { id: g.id, name: g.name, trips: [...g.trips], link: !!g.link, hasLink: !!g.link, newLink: false }; vgJust = null;
    delete drafts['vg:name']; delete drafts['vg:pin']; render();
    setTimeout(() => { const n = $('#vgname'); if (n) n.scrollIntoView({ block: 'center' }); }, 30);
  },
  vgcancel() { vgForm = null; delete drafts['vg:name']; delete drafts['vg:pin']; render(); },
  async vgsave(b) {
    const name = $('#vgname').value.trim(), pin = $('#vgpin').value.trim(), msg = $('#vgmsg'), f = vgForm;
    if (!name) { msg.textContent = L('ใส่ชื่อกลุ่มก่อน', 'Give the group a name'); $('#vgname').focus(); return; }
    if (pin && !/^\d{6,12}$/.test(pin)) { msg.textContent = L('PIN ต้องเป็นตัวเลข 6–12 หลัก', 'The PIN must be 6–12 digits'); $('#vgpin').focus(); return; }
    if (!f.id && !pin && !f.link) { msg.textContent = L('ต้องมี PIN หรือลิงก์อย่างน้อยหนึ่งอย่าง', 'Give it a PIN or a link'); return; }
    const id = f.id || 'vg-' + Math.random().toString(36).slice(2, 10);
    b.disabled = true;
    try {
      await api('PUT', '/api/b/viewers/' + id, { name, trips: f.trips, ...(pin ? { pin } : {}), link: f.newLink ? 'new' : f.link });
      vgJust = pin ? { name, pin } : null; vgForm = null; vg = null; delete drafts['vg:name']; delete drafts['vg:pin'];
      toast(L('บันทึกกลุ่มแล้ว', 'Group saved')); render(); scrollTo(0, 0);
    } catch (e) {
      b.disabled = false;
      msg.textContent = e.code === 409 ? L('PIN นี้ใช้แล้ว (ซ้ำกับกลุ่มอื่นหรือ PIN ของครอบครัว) — ลองตัวอื่น', 'That PIN is taken (another group or the family PIN) — try another')
        : e.code === 400 ? L('ต้องมี PIN หรือลิงก์อย่างน้อยหนึ่งอย่าง', 'Give it a PIN or a link') : L('บันทึกไม่สำเร็จ ลองใหม่', 'Could not save — try again');
    }
  },
  async vgdel(b) {
    if (!armed(b, L('แตะอีกครั้ง — คนในกลุ่มจะออกจากระบบ', 'Tap again — its phones get signed out'))) return;
    try { await api('DELETE', '/api/b/viewers/' + encodeURIComponent(b.dataset.v)); vg = null; vgJust = null; toast(L('ลบกลุ่มแล้ว', 'Group deleted')); render(); } catch (_) { toast(L('ลบไม่สำเร็จ', 'Could not delete')); }
  },
  async vgshare(b) {
    const url = location.origin + b.dataset.v, text = L(`สมุดความทรงจำของมีมี่และมีก้า (${b.dataset.n})`, `Mimi & Mika's memory books (${b.dataset.n})`);
    if (navigator.share) { try { await navigator.share({ text, url }); } catch (e) { if (e.name !== 'AbortError') toast(L('แชร์ไม่สำเร็จ', 'Could not share')); } return; }
    try { await navigator.clipboard.writeText(url); toast(L('คัดลอกลิงก์แล้ว', 'Link copied')); } catch (_) { toast(url); }
  },
  // both languages: the server sends the day's untranslated words to Claude and saves each translation; then the state reloads
  async translate(b) {
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตเพื่อแปล', 'Translating needs a connection')); return; }
    if (queue.length) { toast(L('รอให้บันทึกส่งเสร็จก่อน แล้วค่อยแปล', 'Wait for the records to upload, then translate')); return; }
    b.disabled = true; b.setAttribute('aria-busy', 'true');
    try {
      const r = await api('POST', '/api/b/translate', { trip: b.dataset.t, day: +b.dataset.d }); aiUseAt = 0;
      await load(); safeRender();
      toast(L(`แปลแล้ว ${r.n} ข้อความ`, `${r.n} translated`));
    } catch (e) {
      b.disabled = false; b.removeAttribute('aria-busy');
      toast(e.code === 422 ? L('ไม่มีข้อความใหม่ให้แปล', 'Nothing new to translate') : e.code === 429 ? L('วันนี้ใช้ Claude ครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the Claude writing for today — more tomorrow') : L('แปลไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    }
  },
  // ask the guide: the question goes with excerpts of this book's manual (picked on the server), the answer streams back; never saved —
  // the last answer stays on this page (askAns) until another question; a chip (data-v) asks its own question
  async ask(b) {
    if (storyCtl) return;
    const t = trip(b.dataset.t), day = b.dataset.d === '' ? null : +b.dataset.d, inp = $('#askq');
    if (b.dataset.v && inp) { inp.value = b.dataset.v; drafts[inp.dataset.draft] = inp.value; }
    const q = inp ? inp.value.trim() : '';
    if (!q) { if (inp) inp.focus(); return; }
    const box = $('#askans');
    if (!navigator.onLine) { askOffline(t, q, box); return; }   // no signal: answer from the manual on the phone, without Claude
    box.hidden = false; box.textContent = ''; box.classList.add('writing');
    $('#askgo').disabled = true; $('#askstop').hidden = false;
    askAns = { t: t.id, q, text: '' };
    storyCtl = new AbortController();
    const say = (x) => { box.textContent = x; askAns.text = x; };
    let text = '';
    try {
      const r = await fetch('/api/b/ask', { method: 'POST', credentials: 'same-origin', signal: storyCtl.signal,
        headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: t.id, day, lang, q }) });
      if (r.status === 429) { say(L('วันนี้ใช้ Claude ครบจำนวนแล้ว — พรุ่งนี้ใช้ต่อได้', 'That’s all the Claude writing for today — more tomorrow')); return; }
      if (!r.ok) throw new Error('http ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await rd.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
          let ev = null, data = '';
          chunk.split('\n').forEach((l) => { if (l.startsWith('event: ')) ev = l.slice(7); else if (l.startsWith('data: ')) data += l.slice(6); });
          const d = JSON.parse(data || '{}');
          if (!ev) { text += d.t; say(text); }
          else if (ev === 'done') say(d.text || text);
          else if (ev === 'error') say(d.error === 'refusal' ? L('Claude ตอบข้อนี้ไม่ได้ ลองถามแบบอื่น', 'Claude could not answer that one — try asking another way') : L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') { say(''); box.hidden = true; askAns = null; }
      else if (!text) { storyCtl = null; askOffline(t, q, box); }   // the network dropped (roaming, a ferry): fall back to the manual on the phone
      else say(L('ไม่สำเร็จ ลองใหม่อีกครั้ง', 'That didn’t work — try again'));
    } finally {
      storyCtl = null; aiUseAt = 0; box.classList.remove('writing');
      const go = $('#askgo'), stop = $('#askstop'); if (go) go.disabled = false; if (stop) stop.hidden = true;
    }
  },
  lb(b) { openLb(b.dataset.t, b.dataset.v); },
  newtrip() { openSheet(newTripSheet()); },
  pickphotos(b) { const fp = $('#fpick'); fp.dataset.t = b.dataset.t; fp.dataset.d = b.dataset.d; fp.click(); },
  // full backup zip (editors only on the server too); the browser downloads it in place, the page stays
  backup() {
    if (!navigator.onLine) { toast(L('ต้องต่อเน็ตก่อนจึงสำรองได้', 'Connect to the internet to back up')); return; }
    if (queue.length) toast(L('ยังมีบันทึกรอส่ง — ไฟล์นี้จะยังไม่มีรายการเหล่านั้น', 'Some records are still waiting to send — this file will not have them yet'));
    else toast(L('กำลังเตรียมไฟล์สำรอง… รูปเยอะอาจใช้เวลาสักครู่', 'Preparing the backup… many photos can take a minute'));
    ls('last_backup', Date.now());
    const a = document.createElement('a'); a.href = '/api/export.zip'; a.download = ''; document.body.appendChild(a); a.click(); a.remove();
    render();
  },
  async createtrip(b, e) {
    e.preventDefault();
    const f = $('#ntf'), title = f.title.value.trim(), from = f.from.value, to = f.to.value;
    const slug = (f.slug.value.trim() || title).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || uid('trip');
    if (!title || !from || !to) return;
    try {
      await api('POST', '/api/b/trips', { slug, title: { th: title, en: f.title_en.value.trim() || title }, date_from: from, date_to: to, accent: f.accent.value });
      closeSheet(); await load(); nav('#/t/' + slug);
    } catch (err) { $('#nterr').textContent = err.code === 409 ? L('มีเล่มชื่อนี้แล้ว', 'A book with this id exists') : L('ตรวจวันที่อีกครั้ง (ไม่เกิน 60 วัน)', 'Check the dates (60 days max)'); }
  },
  closesheet() { closeSheet(); },
  eatk(b) { eatKind = +b.dataset.v; $$('[data-a="eatk"]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.v === b.dataset.v)); eatFilter(); },
  eatpick(b) { eatPick = !eatPick; b.setAttribute('aria-pressed', eatPick); eatFilter(); },
  driver(b) {   // big-print address card to hand a taxi driver (works offline: it's in the book's state)
    const st = ((trip(b.dataset.t) || {}).info || {}).stays || [], x = st[+b.dataset.v]; if (!x) return;
    const parts = String(x.addr).split(' · ');
    openSheet(`<div class="drivercard"><div class="kicker">${L('กรุณาพาไปที่', 'Please take us to')}${parts.length > 1 ? ' · 請送我們到' : ''}</div><b>${esc(T(x.prop))}</b>${parts.map((a) => `<p>${esc(a)}</p>`).join('')}</div>
<div class="row end">${extA(mapsUrl(x.q || x.addr), '🗺️ ' + L('เปิดแผนที่', 'Open in Maps'), 'btn ghost small')}<button class="btn small" data-a="closesheet">${L('ปิด', 'Close')}</button></div>`);
  },
  offline(b) { if (!navigator.onLine) { toast(L('ต้องมีสัญญาณตอนเก็บ', 'Needs a connection to store the book')); return; } packOffline(trip(b.dataset.t), b.dataset.v === 'all'); },
  // hearts from the family
  heartto(b) { heartTo = b.dataset.v; $$('[data-a="heartto"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === heartTo)); },
  heartemo(b) { heartEmoji = b.dataset.v; $$('[data-a="heartemo"]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === heartEmoji)); const s = $('[data-a="sendheart"]'); if (s) s.textContent = `${L('ส่ง', 'Send')} ${heartEmoji}`; },
  sendheart(b) {
    const t = trip(b.dataset.t), f = $('#hfrom'), m = $('#htext'), from = f.value.trim(), text = m.value.trim();
    if (!from) { f.focus(); toast(L('ใส่ชื่อผู้ส่งก่อนนะ เด็กๆ จะได้รู้ว่าใครส่ง', 'Add your name so the kids know who it is from')); return; }
    ls('heartfrom', from); delete drafts.hfrom; delete drafts.htext; m.value = '';
    const id = uid('h'), dn = dayNow(t), day = dn >= 0 ? dn : null, at = Date.now();
    burst(b, [heartEmoji, '💕', '✨']);
    toast(L(`ส่ง ${heartEmoji} ถึง${kidName(heartTo)}แล้ว`, `${heartEmoji} sent to ${kidName(heartTo)}`));
    enqueue({ method: 'PUT', url: '/api/b/hearts/' + id, limit: true, body: { trip: t.id, day, child: heartTo, emoji: heartEmoji, text, from },
      local: { coll: 'hearts', id, row: { trip: t.id, day, child: heartTo, emoji: heartEmoji, text, from, at, mine: true } } });
  },
  delheart(b) { if (armed(b)) enqueue({ method: 'DELETE', url: '/api/b/hearts/' + encodeURIComponent(b.dataset.v), local: { coll: 'hearts', id: b.dataset.v, del: true } }); },
};

/* ---------- fav/note save when leaving the field; empty = delete ---------- */
async function saveBlur(el) {
  const kind = el.dataset.aBlur, text = el.value.trim();
  if (kind === 'rnote') {   // travel-notebook note: the card holds the context
    delete drafts[el.dataset.draft];
    const card = el.closest('.rev'), cur = reviewFrom(card); if ((cur.note || '') !== text) putReview(card, { note: text }); return;
  }
  const t = trip(el.dataset.t);
  // passport Explorer ID answers are per child, not per day
  const field = kind === 'field', whole = kind === 'letter', d = field || whole ? null : +el.dataset.d;   // the letter belongs to the whole trip
  const id = field ? `${t.id}.field.${el.dataset.v}.${el.dataset.k}` : whole ? `${t.id}.letter.all` : `${t.id}.${kind}.d${d}`, cur = S.entries.find((e) => e.id === id);
  delete drafts[el.dataset.draft];
  if (!text) { if (cur) await delEntry(id); return; }
  if (!cur || cur.text !== text) await putEntry(t, field ? { day: null, kind, child: el.dataset.k, first_key: el.dataset.v, text } : { day: d, kind, text }, id);
}

// travel notebook: a review card (details.rev) carries its context; every tap upserts the whole row
const reviewFrom = (card) => { const t = trip(card.dataset.t); return reviewOf(t, card.dataset.kind, card.dataset.key) || { trip: t.id, day: +card.dataset.d, kind: card.dataset.kind, key: card.dataset.key, name: { th: card.dataset.nth, en: card.dataset.nen }, rating: null, tags: [], kids: {}, again: null, note: '' }; };
function putReview(card, patch) {
  const t = trip(card.dataset.t), cur = reviewFrom(card), id = revId(t, cur.kind, cur.key);
  const body = { trip: t.id, day: cur.day, kind: cur.kind, key: cur.key, name: cur.name, rating: cur.rating, tags: cur.tags || [], kids: cur.kids || {}, again: cur.again, note: cur.note || '', ...patch };
  return enqueue({ method: 'PUT', url: '/api/b/reviews/' + encodeURIComponent(id), body, local: { coll: 'reviews', id, row: { ...body, at: Date.now(), created_by: S.me.name } } });
}
Object.assign(A, {
  rate(b) { const card = b.closest('.rev'), n = +b.dataset.v, cur = reviewFrom(card); if (n && n >= 4) burst(b, ['⭐', '✨']); putReview(card, { rating: n === 0 || cur.rating === n ? null : n }); },
  rtag(b) { const card = b.closest('.rev'), cur = reviewFrom(card), k = b.dataset.v, tags = (cur.tags || []).includes(k) ? cur.tags.filter((x) => x !== k) : [...(cur.tags || []), k]; putReview(card, { tags }); },
  rkid(b) { const card = b.closest('.rev'), cur = reviewFrom(card), kids = { ...(cur.kids || {}) }; if (kids[b.dataset.k] === b.dataset.v) delete kids[b.dataset.k]; else kids[b.dataset.k] = b.dataset.v; if (b.dataset.v === 'love') burst(b, ['😍', '💕']); putReview(card, { kids }); },
  ragain(b) { const card = b.closest('.rev'), cur = reviewFrom(card), v = b.dataset.v === '1'; putReview(card, { again: cur.again === v ? null : v }); },
  rdel(b) { if (!armed(b)) return; const card = b.closest('.rev'), cur = reviewFrom(card), id = revId(trip(card.dataset.t), cur.kind, cur.key); enqueue({ method: 'DELETE', url: '/api/b/reviews/' + encodeURIComponent(id), local: { coll: 'reviews', id, del: true } }); },
  async copynotebook() {
    const lines = [L('สมุดโน้ตนักเดินทาง — อะไรเวิร์กกับครอบครัวเรา', 'Travel notebook — what works for our family'), ''];
    for (const kind of ['stay', 'food', 'place']) {
      const list = S.reviews.filter((r) => r.kind === kind).sort((a, b) => (b.rating || 0) - (a.rating || 0)); if (!list.length) continue;
      lines.push(`${RKIND[kind][0]} ${L(RKIND[kind][1], RKIND[kind][2])}`);
      list.forEach((r) => { const t = trip(r.trip); lines.push(`  ${r.rating ? '★'.repeat(r.rating) : '—'} ${T(r.name)} (${t ? T(t.title).split(' · ')[0] : r.trip}${r.day !== null && r.day !== undefined ? ` ${L('วันที่', 'day')} ${r.day + 1}` : ''})${(r.tags || []).length ? ' · ' + r.tags.map((k) => rtagLabel(r.kind, k)).join(', ') : ''}${Object.entries(r.kids || {}).map(([k, v]) => ` · ${kidName(k)} ${VERDICT[v]}`).join('')}${r.again === false ? ` · ${L('ไม่ไปอีก', 'not again')}` : r.again ? ` · ${L('ไปอีก', 'again')}` : ''}${r.note ? ` — ${r.note}` : ''}`); });
      lines.push('');
    }
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(L('คัดลอกแล้ว', 'Copied')); } catch (_) { toast(L('คัดลอกไม่ได้ในเบราว์เซอร์นี้', 'Copy not available here')); }
  },
});

// ask the guide without a connection: the question's key words (filler like "ถ้า… ทำยังไง", "where can we…" dropped) go through
// the book's own search on the phone; the best few sections are shown as links. No Claude, nothing sent.
const ASK_FILL_TH = /ทำยังไงดี|ทำยังไง|ทำอย่างไร|ยังไงดี|ยังไง|อย่างไร|ที่ไหนดี|ที่ไหน|ตรงไหน|อะไรดี|อะไร|ได้ไหม|ได้มั้ย|หรือเปล่า|ไหม|มั้ย|บ้าง|วันนี้|คืนนี้|พรุ่งนี้|ควรจะ|ควร|ถ้า|เรา|จะ|ดีไหม|นะ|คะ|ค่ะ|ครับ|จ้ะ|หน่อย/g;
const ASK_FILL_EN = /\b(what|where|when|which|how|who|do|does|did|we|i|is|are|was|the|a|an|to|if|can|could|should|would|today|tonight|tomorrow|for|of|in|on|at|our|us|it|there|any|some|near|good|best|please)\b/gi;
function askOffline(t, q, box) {
  const core = q.replace(ASK_FILL_TH, ' ').replace(ASK_FILL_EN, ' ').replace(/[?？!.,]/g, ' ').replace(/\s+/g, ' ').trim();
  let hits = core ? bookFind(t, core).list : [];
  if (!hits.length && core) {   // no section has every word: take the best per word
    const seen = new Map();
    core.split(' ').filter((w) => w.length > 1).forEach((w) => bookFind(t, w).list.slice(0, 8).forEach((x) => { const c = seen.get(x.e); if (!c || c.score < x.score) seen.set(x.e, x); }));
    hits = [...seen.values()].sort((a, b) => b.score - a.score);
  }
  const alts = core ? core.split(' ') : [];
  const html = `<p class="label">📴 ${L('ออฟไลน์ — ส่วนในคู่มือที่ตรงกับคำถาม (ไม่ได้ใช้ Claude)', 'Offline — the parts of the manual that match (no Claude)')}</p>`
    + (hits.length ? `<ul class="sres">${hits.slice(0, 5).map(({ e }) => `<li class="k-${e.topic}"><a href="${esc(e.href)}"><span class="stopic">${esc(topicName(e.topic))}</span><b>${esc((e.title[lang] || e.title.en).replace(/\s+·\s+\d+$/, ''))}</b><span class="ssnip">${snippet(e, alts)}</span></a></li>`).join('')}</ul>`
      : `<p>${L('ไม่พบในคู่มือ ลองคำสั้นๆ เช่น หมอ แท็กซี่ ห้องน้ำ', 'Nothing in the manual — try one word: doctor, taxi, toilet')}</p>`)
    + `<p><a href="#/t/${esc(t.id)}/search">${L('ค้นทั้งเล่ม ›', 'Search the whole book ›')}</a></p>`;
  askAns = { t: t.id, q, html };
  box.hidden = false; box.innerHTML = html;
}
/* ---------- the day as one picture (4:5, for LINE): drawn on this phone from what the book already holds — the day's ⭐ photo
   (or its art), the date and title, today in brief (or the favourite words), one quote, the app's name. Nothing is uploaded or
   sent to an AI; it goes only where the grown-up shares it. ---------- */
const CARD_W = 1080, CARD_H = 1350;
const loadImg = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => ok(null); im.src = src; });
// lines that fit maxW: Thai has no spaces, so break between words found by Intl.Segmenter (or between characters without it)
function wrapLines(ctx, text, maxW, maxLines) {
  const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? [...new Intl.Segmenter(lang === 'en' ? 'en' : 'th', { granularity: 'word' }).segment(text)].map((x) => x.segment) : [...text];
  const lines = []; let cur = '';
  for (const w of seg) {
    if (w === '\n') { lines.push(cur.trim()); cur = ''; continue; }
    if (ctx.measureText(cur + w).width > maxW && cur.trim()) { lines.push(cur.trim()); cur = w.trimStart(); } else cur += w;
  }
  if (cur.trim()) lines.push(cur.trim());
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, '…'); }
  return lines;
}
async function drawDayCard(t, i) {
  await (document.fonts ? document.fonts.ready : Promise.resolve());
  const css = getComputedStyle(document.documentElement), accent = css.getPropertyValue('--accent').trim() || '#1F3A5F';
  const c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
  const g = c.getContext('2d'), F = (w, px) => `${w} ${px}px "KIRA UI", system-ui, sans-serif`, M = 72, W = CARD_W - M * 2;
  g.fillStyle = '#FFFDF8'; g.fillRect(0, 0, CARD_W, CARD_H);
  g.fillStyle = accent; g.fillRect(0, 0, CARD_W, 18);
  const d = t.days[i], es = entriesOf(t.id, i), ph = mediaOf(t.id, i).filter((m) => !m.pending);
  const pick = ph.find((m) => m.highlight) || ph[0];
  let y = 96;
  g.fillStyle = accent; g.font = F(700, 30); g.fillText(`${L('วันที่', 'DAY')} ${i + 1} · ${fmtDay(d.date)}`.toUpperCase(), M, y);
  g.fillStyle = '#1F2A3A'; g.font = F(700, 60);
  for (const ln of wrapLines(g, T(d.title), W, 2)) { y += 74; g.fillText(ln, M, y); }
  y += 36;
  const photo = pick && (await loadImg(`/media/${encodeURIComponent(pick.id)}`));
  const art = dayArt(t, i) && (await loadImg(dayArt(t, i)));
  const boxH = 600;
  g.save(); g.beginPath(); g.roundRect ? g.roundRect(M, y, W, boxH, 36) : g.rect(M, y, W, boxH); g.clip();
  if (photo) { const s = Math.max(W / photo.width, boxH / photo.height), w = photo.width * s, h = photo.height * s; g.drawImage(photo, M + (W - w) / 2, y + (boxH - h) / 2, w, h); }
  else { g.fillStyle = css.getPropertyValue('--panel').trim() || '#F7F2EA'; g.fillRect(M, y, W, boxH); if (art) g.drawImage(art, M + (W - 440) / 2, y + 80, 440, 440); }
  g.restore();
  if (photo && art) { g.save(); g.beginPath(); g.arc(M + W - 90, y + boxH - 90, 76, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); g.clip(); g.drawImage(art, M + W - 160, y + boxH - 160, 140, 140); g.restore(); }
  y += boxH + 64;
  const sum = es.find((e) => e.kind === 'sum' && e.text), fav = es.find((e) => e.kind === 'fav' && e.text);
  const quote = es.filter((e) => e.kind === 'quote').sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))[0];
  g.fillStyle = '#1F2A3A'; g.font = F(500, 38);
  const lead = sum ? sum.text : fav ? `${L('ของโปรดวันนี้', 'Favourite today')}: ${fav.text}` : '';
  for (const ln of wrapLines(g, lead, W, quote ? 3 : 6)) { g.fillText(ln, M, y); y += 54; }
  if (quote) {
    y += lead ? 24 : 0;
    g.fillStyle = accent; g.font = F(600, 40);
    const ql = wrapLines(g, `“${quote.text}”`, W - 40, 3);
    g.fillRect(M, y - 38, 8, ql.length * 56 + 44);
    g.fillStyle = '#1F2A3A'; for (const ln of ql) { g.fillText(ln, M + 32, y); y += 56; }
    g.fillStyle = '#6D7480'; g.font = F(500, 30); g.fillText(`— ${kidName(quote.child)}`, M + 32, y); y += 40;
  }
  g.fillStyle = '#6D7480'; g.font = F(600, 28);
  g.fillText(`MM Memory · ${T(t.title).split(' · ')[0]}`, M, CARD_H - 56);
  return new Promise((ok) => c.toBlob(ok, 'image/png'));
}
// the lost-child card: 1080×1920 (a phone's lock screen; the top is left calm for the clock). English first (staff anywhere read it),
// the local language where the book's timezone has one (Hong Kong / Macau: Traditional Chinese), Thai for the child
const LOST_LOCAL = [[/Hong_Kong|Macau/, { head: '我走失了', call: '請致電我的父母', stay: '我們住在', sos: '緊急求助' }]];
async function drawLostCard(t, kid, photoUrl, tels) {
  await (document.fonts ? document.fonts.ready : Promise.resolve());
  const W0 = 1080, H0 = 1920, th = t.theme || {}, accent = th.accent || '#1F3A5F', ink = th.ink || '#1F2A3A', muted = th.muted || '#6D7480';   // the book's light colours, also in dark mode
  const c = document.createElement('canvas'); c.width = W0; c.height = H0;
  const g = c.getContext('2d'), F = (w, px) => `${w} ${px}px "KIRA UI", system-ui, "PingFang HK", "Noto Sans CJK TC", sans-serif`, M = 80, W = W0 - M * 2;
  const rr = (x, y, w, h, r) => { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); };
  const center = (txt, y) => { g.fillText(txt, (W0 - g.measureText(txt).width) / 2, y); };
  const loc = (LOST_LOCAL.find(([re]) => re.test(t.timezone || '')) || [])[1];
  const d = t.days[todayIdx(t)], stay = (d.plan || {}).stay, sos = ((t.info || {}).emergency || []).find((e) => e.main);
  const ch = children().find((x) => x.slug === kid) || { name_en: kid, name_th: '' };
  const ageRaw = (((th.children || []).find((x) => x.slug === kid) || {}).age);
  const ageS = String(ageRaw == null ? '' : typeof ageRaw === 'object' ? ageRaw.en || ageRaw.th || '' : ageRaw).trim(), age = /^\d+$/.test(ageS) ? `${ageS} years old` : ageS;
  const nums = (tels || []).map((x) => String(x || '').trim()).filter(Boolean).slice(0, 2);
  g.fillStyle = '#FFFDF8'; g.fillRect(0, 0, W0, H0);
  g.fillStyle = th.calm || th.panel || '#EEF3EF'; g.fillRect(0, 0, W0, 340);   // calm area under the lock-screen clock
  // bottom up: the footer, the emergency bar, tonight's address, the call box — the photo takes what is left
  g.fillStyle = muted; g.font = F(600, 30);
  center(`${new Date(d.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · MM Memory`, H0 - 44);
  let bottom = H0 - 96;
  if (sos) {
    const sh = 100; bottom -= sh;
    g.fillStyle = '#B42318'; rr(M, bottom, W, sh, 50); g.fill();
    g.fillStyle = '#fff'; g.font = F(800, 52); center(`Emergency${loc ? ' · ' + loc.sos : ''}  ${String(sos.tel).split('·')[0].trim()}`, bottom + 68);
    bottom -= 44;
  }
  if (stay) {
    g.font = F(800, 46); const nl = wrapLines(g, stay.name, W, 2);
    g.font = F(500, 34); const al = wrapLines(g, stay.addr || '', W, 3);
    let y = bottom - (al.length * 44 + nl.length * 56 + 52) + 34;
    bottom = y - 34 - 40;
    g.fillStyle = muted; g.font = F(700, 34); center(`We are staying at${loc ? ' · ' + loc.stay : ''}`, y);
    y += 56; g.fillStyle = ink; g.font = F(800, 46); for (const ln of nl) { center(ln, y); y += 56; }
    g.fillStyle = '#3A4350'; g.font = F(500, 34); for (const ln of al) { center(ln, y - 8); y += 44; }
  }
  const callH = 110 + Math.max(1, nums.length) * 88, cy = bottom - callH;
  g.fillStyle = accent; rr(M, cy, W, callH, 32); g.fill();
  g.fillStyle = '#fff'; g.font = F(700, 42); center(`Please call my parents${loc ? ' · ' + loc.call : ''}`, cy + 62);
  let yy = cy + 72;
  if (nums.length) { g.font = F(800, 72); nums.forEach((n) => { yy += 88; center(`📞 ${n}`, yy); }); }
  else { yy += 80; g.font = F(600, 44); center('(ใส่เบอร์ในหน้า SOS ก่อน)', yy); }
  // the top: who this is
  let y = 440;
  g.fillStyle = '#B42318'; g.font = F(800, 92); center(`I'M LOST${loc ? ' · ' + loc.head : ''}`, y);
  y += 66; g.fillStyle = '#B42318'; g.font = F(700, 50); center('หนูพลัดหลงกับพ่อแม่', y);
  const nameY = cy - 50 - (age ? 52 : 0);
  g.fillStyle = ink; g.font = F(800, 78); center(`${String(ch.name_en || '').toUpperCase()}${ch.name_th ? '  ' + ch.name_th : ''}`, nameY);
  if (age) { g.fillStyle = muted; g.font = F(600, 40); center(age, nameY + 52); }
  const top = y + 36, bh = Math.max(240, Math.min(600, nameY - 90 - top)), bw = Math.min(560, Math.round(bh * 0.88)), bx = (W0 - bw) / 2;
  const img = (photoUrl && (await loadImg(photoUrl))) || (await loadImg(kidArt(kid, true, t)));
  g.save(); rr(bx, top, bw, bh, 40); g.clip();
  g.fillStyle = th.panel || '#F7F2EA'; g.fillRect(bx, top, bw, bh);
  if (img) { const sc = photoUrl ? Math.max(bw / img.width, bh / img.height) : Math.min(bw / img.width, bh / img.height) * 0.92, w = img.width * sc, h = img.height * sc; g.drawImage(img, bx + (bw - w) / 2, top + (bh - h) / 2, w, h); }
  g.restore();
  g.strokeStyle = accent; g.lineWidth = 8; rr(bx, top, bw, bh, 40); g.stroke();
  return new Promise((ok) => c.toBlob(ok, 'image/png'));
}
let lastCard = null;   // the last day card drawn (kept for the tests)
let storyCtl = null;   // AbortController while a story (or a guide answer) streams
let askAns = null;     // the last guide answer on the Today page {t, q, text} — kept across re-renders, never stored

/* ---------- lightbox ---------- */
let lbState = null;
function openLb(tid, id) {
  const r = route(), t = trip(tid);
  const inDay = r.parts[2] === 'log' ? +r.parts[3] : null;
  const list = (inDay === null ? mediaOf(tid).filter((m) => document.querySelector(`[data-a="lb"][data-v="${CSS.escape(m.id)}"]`)) : mediaOf(tid, inDay));
  lbState = { t, list, i: Math.max(0, list.findIndex((m) => m.id === id)) };
  drawLb();
}
function drawLb() {
  const lb = $('#lb'); if (!lbState) { lb.hidden = true; lb.innerHTML = ''; return; }
  const { list, i } = lbState, m = list[i]; if (!m) { lbState = null; return drawLb(); }
  const ed = isEditor();
  lb.innerHTML = `<div class="bar"><button data-lb="close" aria-label="${L('ปิด', 'Close')}">✕</button><span class="grow">${i + 1} / ${list.length}</span>
${ed ? `<button data-lb="star" aria-pressed="${!!m.highlight}">${m.highlight ? '⭐' : '☆'} ${L('ชอบ', 'Fave')}</button><button data-lb="del">${L('ลบ', 'Delete')}</button>` : ''}</div>
<div class="stage"><img src="${esc(imgF(m))}" alt="${esc(m.caption)}">${list.length > 1 ? `<button class="nav prev" data-lb="prev" aria-label="prev">‹</button><button class="nav next" data-lb="next" aria-label="next">›</button>` : ''}</div>
<div class="capbox">${ed ? `<input id="lbcap" value="${esc(m.caption || '')}" placeholder="${L('คำอธิบายรูป', 'Caption')}" maxlength="500">` : m.caption ? `<p>${esc(m.caption)}</p>` : ''}</div>`;
  lb.hidden = false;
}
function lbAct(k, btn) {
  const s = lbState; if (!s) return;
  const m = s.list[s.i];
  if (k === 'close') { lbState = null; drawLb(); render(); return; }
  if (k === 'prev' || k === 'next') { s.i = (s.i + (k === 'next' ? 1 : -1) + s.list.length) % s.list.length; drawLb(); return; }
  if (k === 'star') { m.highlight = !m.highlight; enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { highlight: m.highlight }, local: { coll: 'media', id: m.id, row: { highlight: m.highlight } } }); drawLb(); return; }
  if (k === 'del') {
    if (!armed(btn)) return;
    enqueue({ method: 'DELETE', url: '/api/b/media/' + encodeURIComponent(m.id), local: { coll: 'media', id: m.id, del: true } });
    s.list.splice(s.i, 1); if (s.i >= s.list.length) s.i = s.list.length - 1; if (!s.list.length) lbState = null; drawLb();
  }
}
function saveCaption(inp) {
  const m = lbState && lbState.list[lbState.i]; if (!m || m.caption === inp.value) return;
  m.caption = inp.value;
  enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(m.id), body: { caption: inp.value }, local: { coll: 'media', id: m.id, row: { caption: inp.value } } });
}

/* ---------- sheet ---------- */
function openSheet(html) { $('#scrim').hidden = false; const s = $('#sheet'); s.innerHTML = html; s.hidden = false; const f = s.querySelector('input'); if (f) f.focus(); }
function closeSheet() { $('#scrim').hidden = true; $('#sheet').hidden = true; $('#sheet').innerHTML = ''; }
const sheetOpen = () => !$('#sheet').hidden || !$('#lb').hidden;
function newTripSheet() {
  return `<h3>${L('เล่มใหม่', 'New book')}</h3><form id="ntf">
<label class="label">${L('ชื่อทริป', 'Trip name')}</label><input name="title" class="field" required maxlength="80" placeholder="${L('เช่น เชียงใหม่หน้าหนาว', 'e.g. Chiang Mai in winter')}">
<label class="label">${L('ชื่อภาษาอังกฤษ (ไม่บังคับ)', 'English name (optional)')}</label><input name="title_en" class="field" maxlength="80">
<div class="row" style="margin-top:8px"><label class="label" style="flex:1">${L('วันแรก', 'From')}<input name="from" type="date" class="field" required></label><label class="label" style="flex:1">${L('วันสุดท้าย', 'To')}<input name="to" type="date" class="field" required></label></div>
<div class="row" style="margin-top:8px"><label class="label" style="flex:1">${L('รหัสเล่ม (ไม่บังคับ)', 'Book id (optional)')}<input name="slug" class="field" maxlength="40" placeholder="chiang-mai-2027"></label><label class="label">${L('สีปก', 'Colour')}<input name="accent" type="color" value="#1F3A5F" class="field" style="height:44px;width:70px;padding:4px"></label></div>
<div class="err" id="nterr" style="color:var(--accent2);min-height:20px;margin-top:6px"></div>
<div class="row end"><button type="button" class="btn ghost" data-a="closesheet">${L('ยกเลิก', 'Cancel')}</button><button class="btn" data-a="createtrip">${L('สร้างเล่ม', 'Create')}</button></div></form>`;
}

/* ---------- events ---------- */
document.addEventListener('click', (e) => {
  const lb = e.target.closest('[data-lb]'); if (lb) { lbAct(lb.dataset.lb, lb); return; }
  if (e.target.closest('.sres a')) rememberQ();   // a search that found what was needed comes back as a chip next time
  const b = e.target.closest('[data-a]');
  if (b && A[b.dataset.a]) { if (b.tagName === 'A' || b.type === 'submit') e.preventDefault(); A[b.dataset.a](b, e); return; }
  if (e.target.id === 'scrim') closeSheet();
});
document.addEventListener('input', (e) => { const el = e.target; if (el.dataset && el.dataset.fx) { const fx = ls('fx') || {}, v = parseFloat(String(el.value).replace(',', '.')); if (v > 0 && v < 100000) fx[el.dataset.fx] = v; else delete fx[el.dataset.fx]; ls('fx', fx); const t = trip(route().parts[1]), r = $('#fxres'); if (t && r) r.innerHTML = fxResult(t); document.querySelectorAll('.fxa').forEach((x) => { const rows = spendOf(t.id).filter((s2) => s2.cur === x.dataset.fxc); x.textContent = thbLine(rows); }); } if (el.dataset && el.dataset.lc) { const v = ls('lostTel') || ['', '']; v[+el.dataset.lc] = el.value.slice(0, 40); ls('lostTel', v); } if (el.dataset && el.dataset.draft) drafts[el.dataset.draft] = el.value; if (el.id === 'eatq') { eatQ = el.value.trim(); eatFilter(); } if (el.id === 'bookq') { bookQ = el.value; const r = $('#bookres'), t = trip(route().parts[1]); if (r && t) r.innerHTML = bookResults(t); } });
document.addEventListener('focusout', (e) => { const el = e.target; if (el.dataset && el.dataset.aBlur) saveBlur(el); if (el.id === 'lbcap') saveCaption(el); });
document.addEventListener('focusout', (e) => {   // a voice memo's caption ("who said what") saves when the box is left, like a photo caption
  const el = e.target; if (!el.classList || !el.classList.contains('clipcap')) return;
  const id = el.dataset.v, m = S && S.media.find((x) => x.id === id), cap = el.value.trim();
  if (m && (m.caption || '') !== cap) enqueue({ method: 'PATCH', url: '/api/b/media/' + encodeURIComponent(id), body: { caption: cap }, local: { coll: 'media', id, row: { caption: cap } } });
});
document.addEventListener('change', (e) => {
  if (e.target.dataset && e.target.dataset.ck) { const m = ls('ck') || {}; if (e.target.checked) m[e.target.dataset.ck] = 1; else delete m[e.target.dataset.ck]; ls('ck', m); return; }
  if (e.target.dataset && e.target.dataset.fx) { safeRender(); return; }   // leaving a rate field: redraw (the field has lost focus)
  if (e.target.id === 'lcfile') { const f = e.target.files && e.target.files[0]; if (f) { if (lostPhoto) URL.revokeObjectURL(lostPhoto); lostPhoto = URL.createObjectURL(f); render(); } return; }   // this morning's photo: in memory only
  if (e.target.id === 'fpick') { const el = e.target; addPhotos(trip(el.dataset.t), +el.dataset.d, el.files); el.value = ''; }
  if (e.target.id === 'spendplace') { const n = $('#spendnote'); if (n) { if (e.target.value) { n.value = e.target.value; drafts[n.dataset.draft] = n.value; $('#spendamt').focus(); } else n.focus(); } }   // a picked place becomes the note; "other" → type it
});
document.addEventListener('keydown', (e) => {
  if (lbState) { if (e.key === 'Escape') lbAct('close'); if (e.key === 'ArrowRight') lbAct('next'); if (e.key === 'ArrowLeft') lbAct('prev'); return; }
  if (e.key === 'Escape') closeSheet();
  if (e.key === 'Enter' && e.target.id === 'askq') { e.preventDefault(); const b = $('#askgo'); if (b && !b.disabled) A.ask(b); }   // Enter = ask the guide
  if (e.key === 'Enter' && e.target.id === 'bookq') { e.preventDefault(); const a = $('.sres a'); if (a) a.click(); }   // Enter = open the best hit
});
let sx = null;
document.addEventListener('touchstart', (e) => { if (lbState && e.target.closest('.stage')) sx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => { if (sx === null || !lbState) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) lbAct(dx < 0 ? 'next' : 'prev'); });
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'ntf') { e.preventDefault(); A.createtrip(null, e); return; }
  if (e.target.id !== 'lf') return;
  e.preventDefault();
  const name = $('#lname').value.trim(); ls('name', name);
  const r = await fetch('/api/login', { method: 'POST', credentials: 'same-origin', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: $('#lcode').value, name }) });
  if (r.ok) { await load(); render(); flush(); return; }
  $('#lcode').value = '';
  $('#lerr').textContent = r.status === 429 ? L('ใส่ผิดหลายครั้งเกินไป รอ 10 นาทีแล้วลองใหม่', 'Too many wrong tries — wait 10 minutes') : L('PIN ไม่ถูกต้อง', 'Wrong PIN');
});

/* ---------- boot ---------- */
async function refresh() {
  if (document.hidden || sheetOpen() || flushing || (queue.length && !(allHeld && holdMedia()))) return;
  const before = JSON.stringify([S && S.entries.length, S && S.media.length, S && S.places.length]);
  if ((await load()) === 'ok' && JSON.stringify([S.entries.length, S.media.length, S.places.length]) !== before) safeRender();
}
(async function boot() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  queue = await idb.all();
  seq = Math.max(seq, ...queue.map((o) => o.seq || 0));
  // open from the phone's own copy at once, then ask the server (a 304 when nothing changed) and redraw only if something did
  const c = await idb.get('state');
  if (c && c.etag) {
    S = c; overlay();
    render();
    load().then((r) => { if (r !== 'same') safeRender(); });   // new data, signed out, or offline (load sets the banner)
  } else { await load(); render(); }
  if (ls('remind')) pushSub().then((s) => { if (!s) { ls('remind', null); render(); } }).catch(() => {});   // the phone dropped the subscription
  window.addEventListener('hashchange', () => { closeSheet(); lbState = null; drawLb(); render(); window.scrollTo(0, 0); });
  window.addEventListener('online', () => { offline = false; flush(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { flush(); refresh(); } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => render());
  setInterval(() => { if (queue.length && !(allHeld && holdMedia())) flush(); else refresh(); }, 30000);
  if (S) flush();
})();
