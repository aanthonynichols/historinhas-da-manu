import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL(process.argv.includes('--preview') ? '../output/editorial/preview/' : '../dist/', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json':'application/json; charset=utf-8', '.webmanifest':'application/manifest+json', '.m4a':'audio/mp4' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${host}`);
    const name = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const path = resolve(root, `.${name}`);
    if (!path.startsWith(root + sep) && path !== root) { res.writeHead(403); return res.end('Acesso negado'); }
    if (!(await stat(path)).isFile()) { res.writeHead(404); return res.end('Não encontrado'); }
    const data = await readFile(path);
    if (req.headers.range && extname(path) === '.m4a') {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range.trim());
      const suffix = match?.[1] === '';
      const start = !match ? -1 : suffix ? Math.max(0, data.length - Number(match[2])) : Number(match[1]);
      const end = match && match[2] && !suffix ? Math.min(Number(match[2]),data.length-1) : data.length-1;
      if (start < 0 || (suffix && !Number(match[2])) || start >= data.length || end < start) { res.writeHead(416,{'Content-Range':`bytes */${data.length}`}); return res.end(); }
      res.writeHead(206,{'Content-Type':'audio/mp4','Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});
      return res.end(data.subarray(start,end+1));
    }
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Não encontrado'); }
});
server.listen(port, host, () => console.log(`Historinhas da Manu: http://${host}:${port}`));
