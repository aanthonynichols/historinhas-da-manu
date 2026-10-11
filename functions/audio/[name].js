// Cloudflare Pages answers a Range on static files with the whole file (200), and the iPad's media stack
// expects 206 for byte ranges. Only a GET with a single byte range is cut here; everything else, including
// the service worker's own full download (which needs 200 and the audio MIME), goes to the asset server intact.
export async function onRequest({ request, env }) {
  const header = request.method === 'GET' ? request.headers.get('range') : null;
  const match = header && /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return env.ASSETS.fetch(request);
  const ifRange = request.headers.get('if-range');
  const headers = new Headers(request.headers);
  headers.delete('range');
  headers.delete('if-range');
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: 'GET', headers }));
  if (asset.status !== 200) return asset;
  if (ifRange) {
    // RFC 9110 §13.1.5: a stale or weak validator gets the whole current file, never a slice to splice onto old bytes.
    const etag = asset.headers.get('etag');
    const fresh = ifRange.startsWith('"') ? Boolean(etag) && !etag.startsWith('W/') && ifRange === etag : !ifRange.startsWith('W/') && ifRange === asset.headers.get('last-modified');
    if (!fresh) { const full = new Headers(asset.headers); full.set('Accept-Ranges', 'bytes'); return new Response(asset.body, { status: 200, headers: full }); }
  }
  const data = await asset.arrayBuffer();
  const size = data.byteLength;
  const suffix = match[1] === '';
  const start = suffix ? Math.max(0, size - Number(match[2])) : Number(match[1]);
  const end = !suffix && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  const out = new Headers(asset.headers);
  out.set('Accept-Ranges', 'bytes');
  out.delete('Content-Encoding');
  if ((suffix && !Number(match[2])) || start >= size || end < start) {
    out.set('Content-Range', `bytes */${size}`);
    out.delete('Content-Length');
    return new Response(null, { status: 416, headers: out });
  }
  out.set('Content-Range', `bytes ${start}-${end}/${size}`);
  out.set('Content-Length', String(end - start + 1));
  return new Response(data.slice(start, end + 1), { status: 206, headers: out });
}
