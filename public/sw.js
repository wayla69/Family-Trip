// Memory Bookshelf service worker: app shell + all drawn art offline from the first visit; photos cached as you view them
// (or all at once with "Keep this book offline"). Data (/api) is cached by the app itself (IndexedDB) and written through its queue.
const V = 'mbs-v64';
const SHELL = ['/', '/app.css', '/core.js', '/views.js', '/sheets.js', '/kid.js', '/manifest.webmanifest', '/icon.svg',
  '/fonts/KIRA-UI-Regular.woff2', '/fonts/KIRA-UI-Medium.woff2', '/fonts/KIRA-UI-SemiBold.woff2', '/fonts/KIRA-UI-Bold.woff2',
  '/fonts/CormorantGaramond-SemiBold.woff2', '/fonts/CormorantGaramond-MediumItalic.woff2'];
// every file under public/art (test/infra.mjs checks this list is complete): day stamps, colouring pages, guides, crests, the kids
const ART = ['/art/day-1.svg', '/art/day-2.svg', '/art/day-3.svg', '/art/day-4.svg', '/art/day-5.svg', '/art/day-6.svg', '/art/day-7.svg', '/art/day-8.svg',
  '/art/day-9.svg', '/art/day-10.svg', '/art/day-11.svg', '/art/day-12.svg', '/art/day-13.svg', '/art/day-14.svg', '/art/day-15.svg', '/art/day-16.svg',
  '/art/hk/disney-map.svg', '/art/hk/day-1.svg', '/art/hk/day-2.svg', '/art/hk/day-3.svg', '/art/hk/day-4.svg', '/art/hk/day-5.svg', '/art/hk/day-6.svg',
  '/art/colour/hk/day-1.svg', '/art/colour/hk/day-2.svg', '/art/colour/hk/day-3.svg', '/art/colour/hk/day-4.svg', '/art/colour/hk/day-5.svg', '/art/colour/hk/day-6.svg',
  '/art/colour/au/day-1.svg', '/art/colour/au/day-2.svg', '/art/colour/au/day-3.svg', '/art/colour/au/day-4.svg', '/art/colour/au/day-5.svg', '/art/colour/au/day-6.svg', '/art/colour/au/day-7.svg', '/art/colour/au/day-8.svg',
  '/art/colour/au/day-9.svg', '/art/colour/au/day-10.svg', '/art/colour/au/day-11.svg', '/art/colour/au/day-12.svg', '/art/colour/au/day-13.svg', '/art/colour/au/day-14.svg', '/art/colour/au/day-15.svg', '/art/colour/au/day-16.svg',
  '/art/guides/pinky.svg', '/art/guides/bao.svg', '/art/guides/roo.svg', '/art/guides/kiki.svg', '/art/crest/hk.svg', '/art/crest/au.svg',
  '/art/kids/mimi.svg', '/art/kids/mimi-full.svg', '/art/kids/mika.svg', '/art/kids/mika-full.svg',
  '/art/kids/mimi-adventure.svg', '/art/kids/mimi-adventure-full.svg', '/art/kids/mika-adventure.svg', '/art/kids/mika-adventure-full.svg'];
const SHELL_TIMEOUT = 4000;   // on a bad connection fall back to the cached shell after this long instead of hanging

// one missing file must not stop the whole install (addAll is all-or-nothing)
const addEach = (c, urls) => Promise.allSettled(urls.map((u) => fetch(u, { cache: 'no-cache' }).then((res) => { if (res.ok) return c.put(u, res); throw new Error(u); })));
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL).then(() => addEach(c, ART))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });

// trip reminders from the server (Web Push): show them, and a tap opens that day's page
self.addEventListener('push', (e) => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Memory Bookshelf', { body: d.body || '', tag: d.tag || 'mb', renotify: true, icon: '/icon-192.png', badge: '/badge-96.png', data: { url: d.url || '/' } }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data || {}).url || '/', location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    const c = cs.find((x) => new URL(x.url).origin === location.origin);
    if (c) return c.navigate(url).then((w) => (w || c).focus()).catch(() => c.focus());
    return self.clients.openWindow(url);
  }));
});
const withTimeout = (p, ms) => new Promise((ok, no) => { const t = setTimeout(() => no(new Error('timeout')), ms); p.then((v) => { clearTimeout(t); ok(v); }, (err) => { clearTimeout(t); no(err); }); });
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.startsWith('/api/') || u.pathname.startsWith('/v/')) return;
  if (u.pathname.startsWith('/media/') || u.pathname.startsWith('/fonts/') || u.pathname.startsWith('/art/')) {   // immutable: cache first
    e.respondWith(caches.open(V).then(async (c) => {
      const hit = await c.match(r); if (hit) return hit;
      const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res;
    }));
    return;
  }
  // app shell: network first (with a timeout), cache fallback
  const key = r.mode === 'navigate' ? '/' : r;
  e.respondWith(withTimeout(fetch(r), SHELL_TIMEOUT).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(key, cp)); } return res; })
    .catch(() => caches.match(key).then((hit) => hit || fetch(r))));
});
