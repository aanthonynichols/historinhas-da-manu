/* These caches belong only to Historinhas da Manu. The build stamps VERSION and CORE_ART. */
const PREFIX = 'historinhas-manu:';
const VERSION = 'v1';
const CACHE = `${PREFIX}nucleo:${VERSION}`;
// Saved books outlive releases; each entry carries the revision of offline-assets.json it was saved from.
const BOOKS = `${PREFIX}livros`;
const REVISION = 'x-manu-revision';
// Support art referenced literally by src/ (sprites, avatar, hero), resolved by scripts/build.mjs.
const CORE_ART = [];
const CORE = [
  '/index.html', '/app.js', '/stories.js', '/art.js', '/coloring.js', '/life.js',
  '/coloring-shapes.js', '/coloring-scenes.js', '/coloring-art.js', '/paint-snapshot.js', '/life-scene.js',
  '/music.js', '/offline.js', '/scenes.js', '/scene-layout.js', '/scene-anchors.js', '/story-manuscripts.js', '/styles.css', '/coloring.css', '/life.css', '/scenes.css',
  '/manifest.webmanifest', '/offline-assets.json', '/assets/favicon.svg', ...CORE_ART
];
const CORE_PATHS = new Set(CORE);
const LIST = '/offline-assets.json';
const isLegacy = name => name.startsWith(PREFIX) && !name.startsWith(`${PREFIX}nucleo:`) && name !== BOOKS;
let booksDownload = null;
let lastProgress = null;
const listeners = new Set();
let libraryPromise = null;
let tidyPromise = null;

function localURL(path, allowFragment = false) {
  const url = new URL(path, self.location.origin);
  if (url.origin !== self.location.origin || url.search || (url.hash && !allowFragment)) return null;
  if (allowFragment) url.hash = '';
  return url;
}

function validResponse(response, path) {
  if (!response || response.status !== 200 || response.type === 'opaque' || response.redirected) return false;
  if (new URL(response.url || path, self.location.origin).origin !== self.location.origin) return false;
  const type = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (path.endsWith('.png')) return type === 'image/png';
  if (path.endsWith('.webp')) return type === 'image/webp';
  if (path.endsWith('.m4a')) return ['audio/mp4','audio/x-m4a','audio/aac','application/octet-stream'].includes(type);
  if (path.endsWith('.svg')) return type === 'image/svg+xml';
  if (path.endsWith('.js')) return /^(text|application)\/(javascript|ecmascript)$/.test(type);
  if (path.endsWith('.css')) return type === 'text/css';
  if (path.endsWith('.html') || path === '/') return type === 'text/html';
  if (path.endsWith('.webmanifest')) return ['application/manifest+json', 'application/json', 'application/octet-stream'].includes(type);
  if (path.endsWith('.json')) return ['application/json', 'application/octet-stream'].includes(type);
  return false;
}

async function fresh(path) {
  // Fetch only the static allowlist with this same-origin owner session; never store a login redirect.
  // Sites canonicalizes /index.html to /. Keep the stable cache key, but fetch
  // the canonical entry directly so login redirects remain strictly rejected.
  const target = path === '/index.html' ? '/' : path;
  const response = await fetch(target, { credentials: 'same-origin', redirect: 'error', cache: 'no-cache' });
  if (!validResponse(response, path)) throw new Error('Recurso indisponível ou com formato incorreto.');
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // A partial shell must not replace the last working offline version.
    const resources = await Promise.all(CORE.map(async path => [path, await retry(() => fresh(path))]));
    await Promise.all(resources.map(([path, response]) => cache.put(path, response)));
    await self.skipWaiting();
  })());
});

// A flaky Wi-Fi gets two short second chances per core file; the install stays all-or-nothing.
async function retry(load) {
  for (const wait of [500, 1500]) {
    try { return await load(); } catch { await new Promise(resolve => setTimeout(resolve, wait)); }
  }
  return load();
}

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Books move before anything is deleted; a failed move keeps the legacy cache for the next status check.
    await tidyBooks().catch(() => {});
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE && name !== BOOKS && !isLegacy(name)).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = localURL(request.url, true);
  if (!url) return;
  const path = url.pathname;
  if (request.mode === 'navigate' || path === '/' || path === '/index.html') {
    if (path !== '/' && path !== '/index.html') return;
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      // The shell is versioned with the core, so a weak network never holds the child on a blank screen.
      const shell = await cache.match('/index.html');
      if (validResponse(shell, '/index.html')) return shell;
      try {
        const response = await fresh('/index.html');
        try { await cache.put('/index.html', response.clone()); } catch { /* The live page still works if storage is full. */ }
        return response;
      } catch {
        return (await cache.match('/index.html')) || new Response('Abra a Manu com internet uma vez para guardar seu mundinho.', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }
  if (!CORE_PATHS.has(path) && !/^\/assets\/[^/]+\.(png|webp|svg)$/.test(path) && !/^\/audio\/[^/]+\.m4a$/.test(path)) return;
  event.respondWith((async () => {
    const [core, books] = await Promise.all([caches.open(CACHE), caches.open(BOOKS)]);
    for (const cached of [await core.match(path), await books.match(path)]) if (validResponse(cached, path)) return rangeResponse(cached, request);
    const response = await fresh(path);
    try { await keep(path, response.clone(), core, books); } catch { /* Do not block online play when storage is full. */ }
    return rangeResponse(response, request);
  })());
});

async function keep(path, response, core, books) {
  if (CORE_PATHS.has(path)) return core.put(path, response);
  const { files } = await library();
  // Art outside this release's list is left to the HTTP cache instead of growing the saved books.
  if (files[path]) await books.put(path, revised(response, files[path].revision));
}

function revised(response, revision, body = response.body) {
  const headers = new Headers(response.headers);
  headers.set(REVISION, revision);
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

// The list of this release comes from its own core cache, so saved books always match the running code.
function library() {
  libraryPromise ||= (async () => {
    let response = await (await caches.open(CACHE)).match(LIST);
    if (!response) response = await fresh(LIST);
    return validateAssets(await response.json());
  })().catch(error => { libraryPromise = null; throw error; });
  return libraryPromise;
}

function validateAssets(data) {
  const list = Array.isArray(data) ? data : data?.assets;
  if (!Array.isArray(list) || !list.length) throw new Error('Lista de ilustrações vazia.');
  const assets = list.map(path => {
    if (typeof path !== 'string') throw new Error('Lista de ilustrações inválida.');
    const url = localURL(path);
    if (!url || !/^\/(?:assets\/[^/]+\.(?:png|webp)|audio\/[^/]+\.m4a)$/.test(url.pathname)) throw new Error('Ilustração fora da biblioteca.');
    return url.pathname;
  });
  const files = {};
  for (const path of assets) files[path] = { revision: String(data?.files?.[path]?.revision || ''), bytes: Number(data?.files?.[path]?.bytes) || 0 };
  return { assets: [...new Set(assets)], files };
}

// Copies books saved before the split cache (one item at a time, keeping only bytes whose hash matches this release's revision),
// then drops what this release no longer lists or revised.
function tidyBooks() {
  tidyPromise ||= (async () => {
    const { files } = await library();
    const books = await caches.open(BOOKS);
    for (const name of (await caches.keys()).filter(isLegacy)) {
      const legacy = await caches.open(name);
      for (const request of await legacy.keys()) {
        const path = new URL(request.url).pathname;
        const response = await legacy.match(request);
        if (files[path] && !CORE_PATHS.has(path) && validResponse(response, path) && !(await books.match(path))) {
          const body = await response.arrayBuffer();
          if (!files[path].bytes || body.byteLength === files[path].bytes) {
            const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', body))].map(byte => byte.toString(16).padStart(2, '0')).join('').slice(0, 16);
            if (hash === files[path].revision) await books.put(path, revised(response, files[path].revision, body));
          }
        }
        await legacy.delete(request);
      }
      await caches.delete(name);
    }
    for (const request of await books.keys()) {
      const path = new URL(request.url).pathname;
      if (!files[path] || (await books.match(request))?.headers.get(REVISION) !== files[path].revision) await books.delete(request);
    }
  })().finally(() => { tidyPromise = null; });
  return tidyPromise;
}

async function saved(path, files, core, books) {
  if (CORE_PATHS.has(path)) return validResponse(await core.match(path), path);
  const response = await books.match(path);
  return validResponse(response, path) && response.headers.get(REVISION) === files[path].revision;
}

const bytesOf = (paths, files) => paths.reduce((sum, path) => sum + files[path].bytes, 0);

async function offlineStatus() {
  await tidyBooks().catch(() => {});
  const { assets, files } = await library();
  const [core, books] = await Promise.all([caches.open(CACHE), caches.open(BOOKS)]);
  const missing = [];
  for (const path of assets) if (!(await saved(path, files, core, books))) missing.push(path);
  const done = assets.length - missing.length;
  return { ok: !missing.length, available: true, done, cached: done, total: assets.length, missing, missingBytes: bytesOf(missing, files) };
}

async function cacheBooks(report) {
  await tidyBooks().catch(() => {});
  const { assets, files } = await library();
  const [core, books] = await Promise.all([caches.open(CACHE), caches.open(BOOKS)]);
  const failed = [];
  let done = 0;
  let full = false;
  report({ done, total: assets.length });
  // Sequential fetching keeps memory and network pressure low on an iPad.
  for (const [index, path] of assets.entries()) {
    if (!(await saved(path, files, core, books))) {
      let response, body;
      try { response = await fresh(path); body = await response.arrayBuffer(); }
      catch { failed.push(path); report({ done, total: assets.length }); continue; }
      // The bytes already arrived, so a failing put is storage, whatever name the engine gives the error.
      try { await books.put(path, revised(response, files[path].revision, body)); }
      catch { full = true; failed.push(...assets.slice(index)); break; }
    }
    done += 1;
    report({ done, total: assets.length });
  }
  const result = { ok: failed.length === 0, available: true, done, cached: done, total: assets.length, failed, missingBytes: bytesOf(failed, files) };
  return full ? { ...result, code: 'quota' } : failed.length ? { ...result, code: 'rede' } : result;
}

self.addEventListener('message', event => {
  const port = event.ports?.[0];
  if (!port || !event.source?.url || new URL(event.source.url).origin !== self.location.origin) return;
  const action = event.data?.action;
  if (!['CACHE_BOOKS', 'OFFLINE_STATUS'].includes(action)) return;
  event.waitUntil((async () => {
    try {
      let result;
      if (action === 'OFFLINE_STATUS') result = await offlineStatus();
      else {
        // A page reloaded mid-download joins the running download and hears its progress at once.
        listeners.add(port);
        if (lastProgress) port.postMessage({ type: 'progress', ...lastProgress });
        booksDownload ||= cacheBooks(progress => {
          lastProgress = progress;
          listeners.forEach(listener => listener.postMessage({ type: 'progress', ...progress }));
        }).finally(() => { booksDownload = null; lastProgress = null; });
        try { result = await booksDownload; } finally { listeners.delete(port); }
      }
      port.postMessage({ type: 'complete', ...result });
    } catch {
      port.postMessage({ type: 'complete', ok: false, available: true, done: 0, cached: 0, total: 0, failed: [], code: 'rede' });
    }
  })());
});

async function rangeResponse(response, request) {
  const header = request.headers.get('range');
  if (!header || !new URL(request.url).pathname.endsWith('.m4a')) return response;
  // Like a server, ignore a Range this player never sends (multiple ranges) and answer the whole file.
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return response;
  const data = await response.arrayBuffer();
  const suffix = match[1] === '';
  const start = suffix ? Math.max(0, data.byteLength - Number(match[2])) : Number(match[1]);
  const end = !suffix && match[2] ? Math.min(Number(match[2]),data.byteLength-1) : data.byteLength-1;
  if ((suffix && !Number(match[2])) || start >= data.byteLength || end < start) return new Response(null,{status:416,headers:{'Content-Range':`bytes */${data.byteLength}`}});
  const headers = new Headers(response.headers);
  headers.set('Content-Range',`bytes ${start}-${end}/${data.byteLength}`);
  headers.set('Content-Length',String(end-start+1)); headers.set('Accept-Ranges','bytes');
  return new Response(data.slice(start,end+1),{status:206,headers});
}
