// Memory Book service worker: app shell offline, last data offline, photos cached as you view them.
const V = 'mb-v3';
const SHELL = ['/', '/style.css', '/core.js', '/views.js', '/sheets.js', '/manifest.webmanifest', '/icon.svg', '/fonts/KIRA-UI-Regular.woff2', '/fonts/KIRA-UI-Medium.woff2', '/fonts/KIRA-UI-SemiBold.woff2', '/fonts/KIRA-UI-Bold.woff2'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.startsWith('/api/')) return;            // data is cached by the app itself
  if (u.pathname.startsWith('/img/') || u.pathname.startsWith('/trips-art/') || u.pathname.startsWith('/art/') || u.pathname.startsWith('/fonts/')) {
    e.respondWith(caches.open(V).then(async (c) => {
      const hit = await c.match(r); if (hit) return hit;
      const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res;
    }));
    return;
  }
  // app shell: network first, cache fallback
  e.respondWith(fetch(r).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(r.mode === 'navigate' ? '/' : r, cp)); } return res; })
    .catch(() => caches.match(r.mode === 'navigate' ? '/' : r)));
});
