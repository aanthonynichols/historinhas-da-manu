import { cp, mkdir, readdir, writeFile, readFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = process.argv.includes('--preview') ? join(root, 'output/editorial/preview') : join(root, 'dist');
// dist is generated, ignored output in this product; sources and snapshots stay intact.
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'public'), out, { recursive: true });
await cp(join(root, 'index.html'), join(out, 'index.html'));
for (const file of (await readdir(join(root, 'src'))).filter(file => /\.(js|css)$/.test(file))) {
  await cp(join(root, 'src', file), join(out, file));
}
const sourceHash = createHash('sha256');
for (const file of (await readdir(join(root, 'src'))).sort()) sourceHash.update(await readFile(join(root,'src',file)));
sourceHash.update(await readFile(join(root,'index.html')));
const audioFiles = (await readdir(join(root,'public/audio'))).filter(file => file.endsWith('.m4a')).sort();
sourceHash.update(audioFiles.join('|'));
sourceHash.update(await readFile(join(root,'public/audio/manifest.json')));
const worker = await readFile(join(root,'public/sw.js'),'utf8');
sourceHash.update(worker);
for (const file of (await readdir(join(root, 'public'))).sort()) {
  if (/\.(json|webmanifest|svg)$/.test(file)) sourceHash.update(await readFile(join(root, 'public', file)));
}
for (const file of (await readdir(join(root, 'public/assets'))).sort()) sourceHash.update(await readFile(join(root, 'public/assets', file)));
// Offline art follows what src/ references, never a readdir: originals kept in public/assets stay out of the download.
// Literal references (and literal ternaries) are support art for the core; story and page fields become saved books.
const { stories } = await import(pathToFileURL(join(root, 'src/stories.js')).href);
const code = (await Promise.all((await readdir(join(root, 'src'))).filter(file => /\.(js|css)$/.test(file)).map(file => readFile(join(root, 'src', file), 'utf8')))).join('\n');
const coreArt = new Set(), storyFields = [], pageFields = [];
const loose = code.match(/\/assets\/[\w.-]*['"`]\s*\+|\/assets\/(?![\w.-]|\$\{)/);
if (loose) throw new Error(`build: '${loose[0]}' monta caminho de /assets/ por concatenação; use literal, ternário de literais ou template com sceneArt/cover/id, ou ensine a expansão em scripts/build.mjs.`);
for (const [ref] of code.matchAll(/\/assets\/(?:[\w.-]|\$\{[^}]+\})+/g)) {
  const [, before, expression, after = ''] = /^([^$]*)(?:\$\{([^}]+)\}(.*))?$/.exec(ref);
  const choice = expression && /^\w+ \? '([\w-]+)' : '([\w-]+)'$/.exec(expression);
  const field = expression?.split('.').pop();
  if (!expression) coreArt.add(ref);
  else if (choice) choice.slice(1).forEach(value => coreArt.add(before + value + after));
  else if (['id', 'cover'].includes(field)) storyFields.push([before, field, after]);
  else if (field === 'sceneArt') pageFields.push([before, field, after]);
  else throw new Error(`build: ${ref} não tem lista offline conhecida; ensine a expansão em scripts/build.mjs.`);
}
const fill = (record, [before, field, after]) => before + record[field] + after;
const assets = [...new Set(stories.flatMap(story => [...storyFields.map(field => fill(story, field)), ...story.pages.flatMap(page => [...pageFields.map(field => fill(page, field)), page.audio])]))].filter(path => !coreArt.has(path));
const files = {};
for (const path of [...coreArt, ...assets]) {
  const data = await readFile(join(root, 'public', path)).catch(() => { throw new Error(`build: ${path} é referenciado em src/, mas não existe em public/.`); });
  if (!coreArt.has(path)) files[path] = { revision: createHash('sha256').update(data).digest('hex').slice(0, 16), bytes: data.length };
}
const stamped = worker.replace("const VERSION = 'v1';",`const VERSION = '${sourceHash.digest('hex').slice(0,16)}';`).replace('const CORE_ART = [];', `const CORE_ART = ${JSON.stringify([...coreArt])};`);
if (stamped.includes("const VERSION = 'v1';") || stamped.includes('const CORE_ART = [];')) throw new Error('build: public/sw.js perdeu as marcas de VERSION ou CORE_ART.');
await writeFile(join(out,'sw.js'),stamped);
await writeFile(join(out, 'offline-assets.json'), JSON.stringify({ assets, files }, null, 2));
console.log(`Site estático gerado em ${out} (sem dependências externas).`);
