const CACHE = '72nombres-v1';
const FILES = ['/72-nombres/', '/72-nombres/index.html', '/72-nombres/icon-192.png', '/72-nombres/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});