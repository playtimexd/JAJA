// Offline cache. Bump VERSION whenever files change.
const VERSION = 'hibou-v8';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css', 'css/game.css',
  'js/main.js', 'js/util.js', 'js/i18n.js', 'js/store.js', 'js/audio.js', 'js/widgets.js', 'js/owl.js', 'js/ui.js', 'js/game.js', 'js/arts.js',
  'js/content/svg.js', 'js/content/math.js', 'js/content/francais.js', 'js/content/anglais.js', 'js/content/pairs.js', 'js/content/anglais2.js', 'js/talk.js', 'js/content/arts/dessin.js', 'js/content/arts/dessin2.js', 'js/content/arts/dessin3.js', 'js/content/arts/pliage.js', 'js/content/arts/recup.js', 'js/content/arts/fetes.js',
  'icons/icon.svg', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
];
self.addEventListener('install', (e) => e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
// network first (so updates arrive), cache fallback (so it works offline)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).pathname.startsWith('/tts')) return; // voice comes live from the PC, never from the cache
  e.respondWith(fetch(e.request).then((r) => {
    const copy = r.clone();
    caches.open(VERSION).then((c) => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
