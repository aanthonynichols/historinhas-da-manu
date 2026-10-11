import { readFile, writeFile, mkdir, rename, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { stories } from '../src/stories.js';

const archive = process.argv.includes('--archive');
const records = [];
const missing = [];
await mkdir('output/art-originals', { recursive: true });
for (const story of stories) for (const [index, page] of story.pages.entries()) {
  const original = `public/assets/${page.sceneArt}.png`;
  const retained = `output/art-originals/${page.sceneArt}.png`;
  const delivered = `public/assets/${page.sceneArt}.webp`;
  let source = original;
  try { await access(source); } catch { source = retained; }
  let bytes;
  try { bytes = await readFile(source); } catch { missing.push(`${story.id}/${index + 1}`); continue; }
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  const args = ['-quiet', '-q', '85', '-metadata', 'none'];
  if (width > 1536) args.push('-resize', '1536', '0');
  execFileSync('cwebp', [...args, source, '-o', delivered], { stdio: 'pipe' });
  const webp = await readFile(delivered);
  records.push({ story:story.id, page:index + 1, source:retained, asset:delivered, width, height, originalBytes:bytes.length, bytes:webp.length, originalHash:createHash('sha256').update(bytes).digest('hex'), hash:createHash('sha256').update(webp).digest('hex') });
}
if (archive && missing.length) throw new Error(`Faltam ${missing.length} ilustrações: ${missing.join(', ')}. Originais não foram movidos.`);
if (archive) for (const record of records) {
  const original = record.asset.replace(/\.webp$/, '.png');
  try { await access(original); } catch { continue; }
  try { await access(record.source); throw new Error(`Original preservado já existe: ${record.source}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rename(original, record.source);
}
await writeFile('output/art-generation/delivery.json', JSON.stringify({ format:'WebP', quality:85, records, missing }, null, 2) + '\n');
console.log(JSON.stringify({ prepared:records.length, missing, originalBytes:records.reduce((n,r) => n+r.originalBytes,0), bytes:records.reduce((n,r) => n+r.bytes,0), originalsArchived:archive }));
