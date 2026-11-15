// Service worker do Leitor de Estudo Ativo.
// Mude a versão sempre que publicar alterações, para os aparelhos baixarem a nova versão.
const VERSION = 'v3.2.0';
const APP_CACHE = `leitor-app-${VERSION}`;
const LIB_CACHE = 'leitor-libs-v1';

const APP_FILES = [
  './', './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
// PDF.js fica guardado no aparelho para abrir PDFs mesmo sem internet.
const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/legacy/build/';
const LIB_FILES = [PDFJS + 'pdf.min.mjs', PDFJS + 'pdf.worker.min.mjs'];
const LIB_HOSTS = ['cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const app = await caches.open(APP_CACHE);
    await app.addAll(APP_FILES);
    const libs = await caches.open(LIB_CACHE);
    // Bibliotecas: falha aqui não impede a instalação (são baixadas depois, sob demanda).
    await Promise.all(LIB_FILES.map(async url => {
      try { if (!(await libs.match(url))) await libs.add(new Request(url, { mode: 'cors' })); } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('leitor-app-') && k !== APP_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página: rede primeiro (pega atualizações), cache se estiver offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(APP_CACHE);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html', { ignoreSearch: true })) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Arquivos do próprio app: cache primeiro.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      const fresh = await fetch(req);
      if (fresh.ok) (await caches.open(APP_CACHE)).put(req, fresh.clone());
      return fresh;
    })());
    return;
  }

  // Bibliotecas das CDNs (versões fixas, não mudam): cache primeiro.
  if (LIB_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(LIB_CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const fresh = await fetch(req);
      if (fresh.ok) cache.put(req, fresh.clone());
      return fresh;
    })());
  }
});
