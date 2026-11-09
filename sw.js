// v3 — red primero y sin esperar la caché del navegador: siempre consulta si hay versión nueva.
// La copia guardada se usa solo sin conexión.
const CACHE = '72nombres-v3';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const sameOrigin = new URL(e.request.url).origin === location.origin;
  e.respondWith(
    fetch(sameOrigin ? new Request(e.request, { cache: 'no-cache' }) : e.request).then(r => {
      if (r.ok && sameOrigin) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
