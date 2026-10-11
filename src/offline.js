let registrationPromise;
let setupFailure = null;
const UNAVAILABLE = { ok: false, available: false, done: 0, cached: 0, total: 0, failed: [] };
/** Every failed result carries `code` (one of these keys) and `error`, the matching text for the parent. */
export const OFFLINE_MESSAGES = {
  inseguro: 'Para guardar os livros, abra a Manu pelo endereço https:// no Safari ou pelo ícone da Tela de Início.',
  'sem-sw': 'Este navegador não deixa guardar livros. Abra a Manu pelo Safari ou pelo ícone da Tela de Início.',
  preparo: 'A preparação para usar sem internet ainda não terminou. Tente de novo em instantes, com internet.',
  'sem-resposta': 'A preparação para usar sem internet não respondeu. Tente de novo com internet.',
  rede: 'Não foi possível baixar tudo. Confira a conexão e toque de novo para continuar de onde parou.',
  quota: 'Falta espaço neste iPad para guardar os livros. Libere espaço e tente de novo.'
};
const failure = code => ({ ...UNAVAILABLE, code, error: OFFLINE_MESSAGES[code] });
const NO_WORKER = new Error('O navegador não entregou um registro de service worker.');

/** What this page can do before any download: 'ok', 'inseguro' (no HTTPS) or 'sem-sw' (no service worker). */
export function offlineSupport() {
  if (!globalThis.isSecureContext) return 'inseguro';
  return 'serviceWorker' in navigator ? 'ok' : 'sem-sw';
}

/** Asks the browser to keep books and paintings under storage pressure; resolves true when granted. */
export async function keepStorage() {
  try { return Boolean(await navigator.storage?.persisted?.() || await navigator.storage?.persist?.()); }
  catch { return false; }
}

// Rejects as soon as the installing worker is discarded, instead of waiting for the deadline.
function installFailed(registration) {
  const worker = registration.installing || registration.waiting;
  return new Promise((_, reject) => {
    if (!worker) return;
    const check = () => { if (worker.state === 'redundant') reject(new Error('A instalação offline falhou.')); };
    worker.addEventListener('statechange', check);
    check();
  });
}

function deadline(promise, ms, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); })
  ]).finally(() => clearTimeout(timer));
}

/** Register only when the parent app explicitly calls this function. */
export async function setupOffline() {
  const support = offlineSupport();
  if (support !== 'ok') { setupFailure = support; return null; }
  if (!registrationPromise) {
    registrationPromise = (async () => {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
      if (!registration) throw NO_WORKER;
      if (registration.active?.state === 'activated') return registration;
      await deadline(Promise.race([navigator.serviceWorker.ready, installFailed(registration)]), 30000, 'A preparação offline demorou demais.');
      return registration;
    })().then(registration => { setupFailure = null; return registration; }, error => {
      registrationPromise = null;
      setupFailure = error === NO_WORKER || error?.name === 'SecurityError' ? 'sem-sw' : 'preparo';
      return null;
    });
  }
  return registrationPromise;
}

async function request(action, onProgress) {
  const registration = await setupOffline();
  // The active worker can accept messages on the very first visit, before a reload.
  const worker = registration?.active || navigator.serviceWorker?.controller;
  if (!worker) return failure(setupFailure || 'preparo');
  return new Promise(resolve => {
    const channel = new MessageChannel();
    let settled = false;
    let timer;
    const finish = result => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      channel.port1.close();
      resolve(result);
    };
    const renew = () => {
      clearTimeout(timer);
      timer = setTimeout(() => finish(failure('sem-resposta')), action === 'CACHE_BOOKS' ? 120000 : 30000);
    };
    channel.port1.onmessage = event => {
      const data = event.data;
      if (data?.type === 'progress') {
        renew();
        // A UI callback must not interrupt the cache transaction.
        try { onProgress?.({ done: data.done, total: data.total }); } catch { /* Caller owns UI errors. */ }
      } else if (data?.type === 'complete') {
        const { type, ...result } = data;
        finish(result.code ? { ...result, error: OFFLINE_MESSAGES[result.code] || OFFLINE_MESSAGES.rede } : result);
      }
    };
    channel.port1.onmessageerror = () => finish(failure('sem-resposta'));
    renew();
    try { worker.postMessage({ action }, [channel.port2]); }
    catch { finish(failure('preparo')); }
  });
}

/** Resolves { ok, done, total, failed, missingBytes, persisted? } or a failure with code and error. */
export async function downloadBooks(onProgress) {
  const result = await request('CACHE_BOOKS', onProgress);
  // Once the books are saved, ask to keep them (and the paintings) when the iPad runs short of space.
  return result.ok ? { ...result, persisted: await keepStorage() } : result;
}
/** Resolves { ok, done, total, missing: [paths], missingBytes } or a failure with code and error. */
export function getOfflineStatus() { return request('OFFLINE_STATUS'); }
