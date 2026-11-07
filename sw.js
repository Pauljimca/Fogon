/* Fogón service worker: network first when online (so updates arrive at once),
   cached copy when offline. */
const CACHE = 'fogon-app';
const SHELL = [
  './', 'index.html', 'styles.css', 'manifest.webmanifest',
  'js/i18n.js', 'js/grams.js', 'js/seed.js', 'js/app.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== 'fogon-img-v1').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)); }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const key = req.mode === 'navigate' ? 'index.html' : (url.origin + url.pathname).slice(self.registration.scope.length) || 'index.html';
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await Promise.race([fetch(req, { cache: 'no-cache' }), timeout(4000)]);
      if (res && res.ok) cache.put(key, res.clone());
      return res;
    } catch (err) {
      return (await cache.match(key)) || (await cache.match(req, { ignoreSearch: true })) || (await cache.match('index.html')) || Response.error();
    }
  })());
});
