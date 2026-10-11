import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { stories } from '../src/stories.js';
import { objectNames } from '../src/art.js';
import { coloringDrawings } from '../src/coloring-shapes.js';
import { coloringScenes } from '../src/coloring-scenes.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const expected = ['chapeuzinho', 'bela', 'rapunzel', 'porquinhos', 'cinderela', 'branca', 'pinoquio', 'peter-pan', 'pequena-sereia'];
assert.deepEqual(stories.map(s => s.id).sort(), expected.sort(), 'A biblioteca deve conter os dez contos pedidos, sem IDs duplicados.');
const known = new Set(objectNames);
const totalPages = stories.reduce((sum,story) => sum + story.pages.length,0);
const assets = new Set(['app-icon', 'sprites-pony', 'sprites-characters', 'sprites-objects', 'sprite-fish', ...stories.filter(s => s.cover.endsWith('.png')).map(s => s.cover.slice(0, -4))]);
const sceneAssets = new Set();
// Re-encoded from existing art, never repainted: home-screen icons and WebP derivatives with their expected size.
const icons = { 'app-icon-180': 180, 'app-icon-192': 192, 'app-icon-512': 512 };
const derived = { ...Object.fromEntries(stories.map(s => [`capa-${s.id}`, [1024, 683]])), 'hero-biblioteca': [1400, 934], 'sprites-characters': [1536, 1024], 'sprites-objects': [1254, 1254], 'sprites-pony': [1536, 1024], 'sprite-fish': [1254, 1254] };
// art.js crops the atlases by pixel, so each WebP atlas must keep the size of its PNG source.
const atlases = ['sprites-characters', 'sprites-objects', 'sprites-pony', 'sprite-fish'];
const motionProfiles = new Set(['breeze', 'clouds', 'water', 'warm', 'hearth', 'flutters', 'nightstars', 'sparkles', 'wind']);
const text = value => typeof value === 'string' && value.trim().length > 0;
const position = value => Array.isArray(value) && value.length === 2 && value.every(n => Number.isFinite(n) && n >= 0 && n <= 100);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const normalizeTranscript = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const sourceOnly = process.argv.includes('--source-only');
for (const story of stories) {
  assert.ok(story.pages.length >= 12 && story.pages.length <= 15, `${story.id}: o conto completo precisa de 12 a 15 páginas.`);
  for (const key of ['title', 'short', 'theme', 'color', 'category', 'description', 'dedication', 'cover']) assert.ok(text(story[key]), `${story.id}: falta ${key}.`);
  assert.match(story.cover, /^[a-z0-9][a-z0-9-]*\.(png|webp)$/, `${story.id}: referência de capa inválida.`);
  story.pages.forEach((page, index) => {
    const label = `${story.id}, página ${index + 1}`;
    for (const key of ['title', 'text', 'prompt', 'reaction', 'effect', 'art']) assert.ok(text(page[key]), `${label}: falta ${key}.`);
    assert.ok(page.text.split(/\s+/).length >= 60, `${label}: texto curto demais para o manuscrito integral.`);
    assert.ok(known.has(page.object) && known.has(page.hidden), `${label}: objeto desconhecido.`);
    assert.ok(position(page.position), `${label}: posição inválida.`);
    assert.ok(Array.isArray(page.extras) && page.extras.length >= 2, `${label}: faltam descobertas extras.`);
    for (const extra of page.extras) assert.ok(known.has(extra.object) && text(extra.name) && text(extra.reaction) && text(extra.effect) && position(extra.position), `${label}: descoberta extra inválida.`);
    if (!page.art.startsWith('scene-')) assets.add(page.art);
    assert.equal(page.sceneArt, `scene-${story.id}-${String(index + 1).padStart(2, '0')}`, `${label}: precisa de uma ilustração própria para este momento.`);
    assert.ok(text(page.sceneAlt) && text(page.sceneMotion?.profile), `${label}: falta direção da cena e da animação.`);
    assert.ok(motionProfiles.has(page.sceneMotion.profile), `${label}: perfil de animação desconhecido.`);
    assert.ok(position(page.sceneAnchors?.main) && position(page.sceneAnchors?.hidden), `${label}: faltam âncoras da ilustração.`);
    assert.ok(page.sceneAnchors.extras?.length === page.extras.length && page.sceneAnchors.extras.every(position), `${label}: faltam posições próprias das descobertas.`);
    assert.ok(!sceneAssets.has(page.sceneArt), `${label}: uma ilustração não pode ser reutilizada em outra página.`);
    sceneAssets.add(page.sceneArt);
  });
}
for (const story of stories.filter(s => s.cover.endsWith('.webp'))) assert.ok(sceneAssets.has(story.cover.slice(0, -5)), `${story.id}: a capa WebP precisa corresponder a uma cena da biblioteca.`);

if (sourceOnly) {
  console.log(`Estrutura editorial conferida: ${stories.length} livros, ${totalPages} páginas completas. Áudios, imagens e build ainda não conferidos nesta modalidade.`);
  process.exit(0);
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
assert.equal(assets.size, 11, 'São necessárias 11 ilustrações PNG: ícone, quatro atlas de sprites e seis capas.');
assert.deepEqual((await readdir(join(root, 'public/assets'))).filter(file => file.endsWith('.png')).sort(), [...assets, ...Object.keys(icons)].map(name => `${name}.png`).sort(), 'Os arquivos PNG devem corresponder às 20 ilustrações de origem e aos ícones derivados.');
for (const [name, size] of Object.entries(icons)) {
  const png = await readFile(join(root, 'public/assets', `${name}.png`));
  assert.ok(png.subarray(0, 8).equals(signature) && png.readUInt32BE(16) === size && png.readUInt32BE(20) === size, `${name}: o ícone deve ser um PNG de ${size}×${size}.`);
}
for (const name of assets) {
  const file = join(root, 'public/assets', `${name}.png`);
  const png = await readFile(file);
  assert.ok(png.subarray(0, 8).equals(signature), `${name}: assinatura PNG inválida.`);
  assert.equal(png.toString('ascii', 12, 16), 'IHDR', `${name}: cabeçalho PNG inválido.`);
  assert.ok(png.readUInt32BE(16) >= 256 && png.readUInt32BE(20) >= 256, `${name}: ilustração pequena demais.`);
}
assert.equal(sceneAssets.size, totalPages, 'Cada página deve ter uma cena individual.');
assert.deepEqual((await readdir(join(root, 'public/assets'))).filter(file => file.endsWith('.webp')).sort(), [...sceneAssets, ...Object.keys(derived)].map(name => `${name}.webp`).sort(), 'Os WebP devem ser exatamente as cenas das páginas e os derivados conhecidos.');
for (const [name, [width, height]] of Object.entries(derived)) {
  const metadata = execFileSync('webpinfo', ['-summary', join(root, 'public/assets', `${name}.webp`)], { encoding:'utf8', stdio:'pipe' });
  assert.ok(/No error detected\./.test(metadata) && Number(metadata.match(/Width:\s*(\d+)/)?.[1]) === width && Number(metadata.match(/Height:\s*(\d+)/)?.[1]) === height, `${name}: o derivado WebP deve decodificar com ${width}×${height} px.`);
  if (atlases.includes(name)) {
    const png = await readFile(join(root, 'public/assets', `${name}.png`));
    assert.ok(png.readUInt32BE(16) === width && png.readUInt32BE(20) === height, `${name}: o atlas WebP deve ter o tamanho do PNG de origem, ou o recorte de art.js se desloca.`);
  }
}
const sceneHashes = new Set();
for (const name of sceneAssets) {
  const file = join(root, 'public/assets', `${name}.webp`);
  const image = await readFile(file);
  assert.equal(image.toString('ascii', 0, 4), 'RIFF', `${name}: WebP inválido.`);
  assert.equal(image.toString('ascii', 8, 12), 'WEBP', `${name}: WebP inválido.`);
  const metadata = execFileSync('webpinfo', ['-summary', file], { encoding:'utf8', stdio:'pipe' });
  assert.match(metadata, /No error detected\./, `${name}: WebP não decodifica.`);
  const width = Number(metadata.match(/Width:\s*(\d+)/)?.[1]);
  const height = Number(metadata.match(/Height:\s*(\d+)/)?.[1]);
  assert.ok(width >= 1024 && height >= 683 && width > height, `${name}: resolução insuficiente para a cena do iPad.`);
  const hash = sha256(image);
  assert.ok(!sceneHashes.has(hash), `${name}: desenho repetido em outra página.`);
  sceneHashes.add(hash);
}

const narrationBytes = await readFile(join(root, 'public/audio/manifest.json'));
const narration = JSON.parse(narrationBytes.toString('utf8'));
assert.equal(narration.version, 1, 'Manifesto de narração: versão inválida.');
assert.equal(narration.language, 'pt-BR', 'A narração deve estar em português brasileiro.');
assert.ok(text(narration.voice), 'Manifesto de narração: falta identificar a voz.');
if (narration.format !== undefined) assert.equal(narration.format, 'AAC in M4A', 'Manifesto de narração: formato inválido.');
assert.ok(Array.isArray(narration.clips), 'Manifesto de narração: clips deve ser uma lista.');
assert.equal(narration.clips.length, totalPages, 'O manifesto deve ter uma gravação por página.');
const clipsById = new Map();
const clipFiles = new Set();
for (const clip of narration.clips) {
  assert.ok(text(clip.story) && Number.isInteger(clip.page) && clip.page >= 1 && clip.page <= stories.find(s => s.id === clip.story)?.pages.length, 'Manifesto de narração: identificador de página inválido.');
  const id = `${clip.story}/${clip.page}`;
  assert.ok(!clipsById.has(id), `${id}: ID duplicado no manifesto.`);
  assert.equal(clip.file, `${clip.story}-${clip.page}.m4a`, `${id}: nome de áudio inválido.`);
  assert.ok(!clipFiles.has(clip.file), `${id}: arquivo duplicado no manifesto.`);
  clipsById.set(id, clip);
  clipFiles.add(clip.file);
}
const audioNames = (await readdir(join(root, 'public/audio'))).filter(file => file.endsWith('.m4a')).sort();
const expectedAudio = stories.flatMap(story => story.pages.map((_, index) => `${story.id}-${index + 1}.m4a`)).sort();
assert.deepEqual([...clipFiles].sort(), expectedAudio, 'O manifesto deve corresponder exatamente às páginas dos dez livros.');
assert.deepEqual(audioNames, expectedAudio, 'Cada página deve ter um único áudio preparado, sem arquivos extras.');
for (const story of stories) for (const [index,page] of story.pages.entries()) {
  const id = `${story.id}/${index + 1}`;
  const clip = clipsById.get(id);
  assert.ok(clip, `${id}: página ausente do manifesto.`);
  assert.equal(page.audio, `/audio/${clip.file}`, `${id}: página aponta para outro arquivo de áudio.`);
  assert.equal(clip.textHash, sha256(page.text), `${id}: o texto da página diverge do texto narrado.`);
  assert.equal(clip.voice, narration.voice, `${id}: voz diverge do manifesto.`);
  if (clip.language !== undefined) assert.equal(clip.language, 'pt-BR', `${id}: idioma inválido.`);
  if (narration.model !== undefined) assert.equal(clip.model, narration.model, `${id}: modelo diverge do manifesto.`);
  const gemini = /gemini/i.test([narration.provider, narration.model, clip.provider, clip.model].join(' '));
  if (gemini) {
    assert.equal(clip.transcriptMatch, true, `${id}: transcrição Gemini não aprovada.`);
    assert.ok(text(clip.transcript), `${id}: transcrição Gemini ausente.`);
    assert.equal(normalizeTranscript(clip.transcript), normalizeTranscript(page.text), `${id}: transcrição Gemini não corresponde ao texto da página.`);
  }
  const path = join(root, 'public/audio', clip.file);
  const audio = await readFile(path);
  assert.ok(audio.length > 500 && audio.toString('ascii', 4, 8) === 'ftyp', `${id}: contêiner M4A inválido.`);
  assert.ok(Number.isInteger(clip.bytes) && clip.bytes === audio.length, `${id}: tamanho do áudio diverge do manifesto.`);
  assert.equal(clip.audioHash, sha256(audio), `${id}: hash do áudio diverge do manifesto.`);
  assert.ok(Number.isFinite(clip.durationSeconds) && clip.durationSeconds > 0, `${id}: duração inválida no manifesto.`);
  assert.ok(Number.isInteger(clip.validFrames) && clip.validFrames > 0, `${id}: frames inválidos no manifesto.`);
  const info = execFileSync('/usr/bin/afinfo', [path], { encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024 });
  assert.match(info, /Data format:[^\n]*\baac\b/i, `${id}: o arquivo deve conter áudio AAC.`);
  const duration = Number(info.match(/estimated duration:\s*([\d.]+)/)?.[1]);
  const frames = Number(info.match(/audio\s+(\d+)\s+valid frames/)?.[1]);
  assert.ok(duration > 0 && Math.abs(duration - clip.durationSeconds) <= 0.000001, `${id}: duração real diverge do manifesto.`);
  assert.equal(frames, clip.validFrames, `${id}: frames reais divergem do manifesto.`);
}
for (const file of (await readdir(join(root, 'src'))).filter(file => file.endsWith('.js'))) execFileSync(process.execPath, ['--check', join(root, 'src', file)], { stdio: 'pipe' });
for (const file of ['public/sw.js', 'functions/audio/[name].js']) execFileSync(process.execPath, ['--check', join(root, file)], { stdio: 'pipe' });
assert.deepEqual(JSON.parse(await readFile(join(root, 'public/_routes.json'), 'utf8')), { version: 1, include: ['/audio/*'], exclude: [] }, '_routes.json: a Function de Range deve atender só /audio/*.');
const coloring = await readFile(join(root, 'src/coloring.js'), 'utf8');
const drawingIds = ['borboleta', 'bola', 'flor', 'estrela', 'peixinho', 'coracao', 'abelhinha', 'passarinho', 'foguete', 'pipa', 'tartaruguinha', 'caracol', 'boneca', 'princesa', 'ponei', 'bebe', 'ursinho', 'gatinho', 'cachorrinho', 'castelo'];
assert.deepEqual(Object.keys(coloringDrawings).sort(), [...drawingIds].sort(), 'O ateliê deve oferecer os vinte desenhos.');
assert.deepEqual(Object.keys(coloringScenes).sort(), [...drawingIds].sort(), 'Cada desenho precisa de seu próprio cenário.');
const sceneryMotions = new Set(['sun', 'cloud', 'grass', 'flower', 'water', 'star', 'sway', 'bob', 'glow', 'still']);
for (const id of drawingIds) {
  const drawing = coloringDrawings[id], scene = coloringScenes[id], f = scene.frame;
  for (const key of ['name', 'path', 'details', 'motion']) assert.ok(text(drawing[key]), `${id}: falta ${key}.`);
  assert.ok(text(scene.label) && text(scene.hint), `${id}: falta a descrição do ambiente.`);
  assert.ok(Object.values(f).every(Number.isFinite) && f.x >= 0 && f.y >= 0 && f.width > 0 && f.height > 0 && f.x+f.width <= 120 && f.y+f.height <= 120, `${id}: personagem fora da folha.`);
  assert.ok(scene.parts.length >= 3, `${id}: cenário incompleto.`);
  assert.equal(new Set(scene.parts.map(part => part.id)).size, scene.parts.length, `${id}: elementos ambientais duplicados.`);
  for (const part of scene.parts) assert.ok(text(part.path) && text(part.name) && sceneryMotions.has(part.motion), `${id}/${part.id}: elemento pintável inválido.`);
}
for (const capability of ['pointerdown', 'pointermove', 'pointerup', 'localStorage', 'undo', 'eraser', 'life']) assert.ok(coloring.includes(capability), `Ateliê: falta suporte a ${capability}.`);
const workerSource = await readFile(join(root, 'public/sw.js'), 'utf8');
for (const module of ['coloring-shapes', 'coloring-scenes', 'coloring-art', 'paint-snapshot', 'life-scene']) assert.ok(workerSource.includes(`'/${module}.js'`), `${module}: módulo deve estar no cache offline.`);

const files = ['index.html', ...((await readdir(join(root, 'src'))).filter(f => /\.(js|css)$/.test(f)).map(f => `src/${f}`))];
for (const file of files) {
  const source = await readFile(join(root, file), 'utf8');
  const remote = [...source.matchAll(/https?:\/\/[^\s'"<>`)]+/g)].map(m => m[0]).filter(url => url !== 'http://www.w3.org/2000/svg' && !/^https?:\/\/(localhost|127\.0\.0\.1)([:/]|$)/.test(url));
  assert.deepEqual(remote, [], `${file}: dependências remotas não são permitidas.`);
  for (const [, imported] of source.matchAll(/(?:from\s*|import\s*)['"](\.\/[^'"]+)['"]/g)) await access(join(root, 'src', imported));
}
const html = await readFile(join(root, 'index.html'), 'utf8');
for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"\s]+)"/g)) await access(join(root, /\.(js|css)$/.test(ref) ? 'src' : 'public', ref));
for (const [, ref] of html.matchAll(/'(\/assets\/[^'\s]+)'/g)) await access(join(root, 'public', ref));
const webManifest = JSON.parse(await readFile(join(root, 'public/manifest.webmanifest'), 'utf8'));
assert.equal(webManifest.theme_color, html.match(/name="theme-color" content="([^"]+)"/)?.[1], 'manifest e index.html devem declarar a mesma cor de tema.');
for (const icon of webManifest.icons) {
  await access(join(root, 'public', icon.src));
  const size = icons[icon.src.match(/\/(app-icon-\d+)\.png$/)?.[1]];
  if (icon.type === 'image/png') assert.equal(icon.sizes, `${size}x${size}`, `${icon.src}: tamanho declarado no manifest diverge do arquivo.`);
}

let hasDist = false;
let offlineSummary = '';
try { await access(join(root, 'dist/index.html')); hasDist = true; } catch { /* Build is checked when present. */ }
if (hasDist && !sourceOnly) {
  for (const file of ['index.html', ...(await readdir(join(root, 'src'))).filter(file => /\.(js|css)$/.test(file))]) {
    const source = await readFile(join(root, file === 'index.html' ? file : `src/${file}`));
    assert.ok(source.equals(await readFile(join(root, 'dist', file))), `dist/${file}: build desatualizado.`);
  }
  for (const asset of assets) assert.ok((await readFile(join(root, 'public/assets', `${asset}.png`))).equals(await readFile(join(root, 'dist/assets', `${asset}.png`))), `dist: ilustração ${asset} desatualizada.`);
  for (const asset of sceneAssets) assert.ok((await readFile(join(root, 'public/assets', `${asset}.webp`))).equals(await readFile(join(root, 'dist/assets', `${asset}.webp`))), `dist: cena ${asset} desatualizada.`);
  for (const file of [...Object.keys(icons).map(name => `${name}.png`), ...Object.keys(derived).map(name => `${name}.webp`)]) assert.ok((await readFile(join(root, 'public/assets', file))).equals(await readFile(join(root, 'dist/assets', file))), `dist: derivado ${file} desatualizado.`);
  assert.deepEqual((await readdir(join(root, 'dist/assets'))).sort(), (await readdir(join(root, 'public/assets'))).sort(), 'dist/assets não pode conservar cenas de builds anteriores.');
  assert.ok(narrationBytes.equals(await readFile(join(root, 'dist/audio/manifest.json'))), 'dist/audio/manifest.json: manifesto desatualizado.');
  assert.deepEqual((await readdir(join(root, 'dist/audio'))).filter(file => file.endsWith('.m4a')).sort(), expectedAudio, 'dist/audio: devem existir exatamente os mesmos áudios da fonte.');
  for (const file of expectedAudio) {
    const built = await readFile(join(root, 'dist/audio', file));
    assert.ok(built.equals(await readFile(join(root, 'public/audio', file))), `dist/audio/${file}: áudio desatualizado.`);
    const clip = clipsById.get(`${file.replace(/-\d+\.m4a$/, '')}/${Number(file.match(/-(\d+)\.m4a$/)[1])}`);
    assert.equal(sha256(built), clip.audioHash, `dist/audio/${file}: hash diverge do manifesto.`);
  }
  // Offline contract: the core installs all-or-nothing, the saved books cover every page shown, and nothing unused is downloaded.
  const builtWorker = await readFile(join(root, 'dist/sw.js'), 'utf8');
  const coreArt = JSON.parse(builtWorker.match(/^const CORE_ART = (\[.*\]);$/m)?.[1] || '[]');
  assert.ok(/^const VERSION = '[0-9a-f]{16}';$/m.test(builtWorker) && coreArt.length, 'dist/sw.js: o build deve carimbar VERSION e CORE_ART.');
  const core = [...builtWorker.match(/^const CORE = \[([\s\S]*?)\];$/m)[1].matchAll(/'(\/[^']+)'/g)].map(match => match[1]).concat(coreArt);
  for (const path of core) await access(join(root, 'dist', path === '/index.html' ? 'index.html' : path)).catch(() => assert.fail(`${path}: falta no dist e derrubaria a instalação do núcleo.`));
  assert.ok(!core.includes('/assets/app-icon.png'), 'O ícone de origem de 1254 px não pode pesar no núcleo.');
  assert.deepEqual(core.filter(path => path.endsWith('.png')), [], 'O núcleo usa os derivados WebP; PNG de origem (herói, avatar, atlas) não podem pesar na instalação.');
  const sourceCode = (await Promise.all((await readdir(join(root, 'src'))).filter(file => /\.(js|css)$/.test(file)).map(file => readFile(join(root, 'src', file), 'utf8')))).join('\n');
  assert.ok(!/\/assets\/[\w.-]*['"`]\s*\+|\/assets\/(?![\w.-]|\$\{)/.test(sourceCode), 'src/: caminho de /assets/ montado por concatenação fica fora do núcleo e da lista offline.');
  for (const [ref] of sourceCode.matchAll(/\/assets\/[\w-]+\.(?:png|webp|svg)\b/g)) assert.ok(core.includes(ref), `${ref}: arte fixa usada pelo app precisa estar no núcleo offline.`);
  const offline = JSON.parse(await readFile(join(root, 'dist/offline-assets.json'), 'utf8'));
  assert.equal(new Set(offline.assets).size, offline.assets.length, 'A lista offline não pode repetir recursos.');
  for (const path of offline.assets) {
    const data = await readFile(join(root, 'dist', path));
    assert.deepEqual(offline.files[path], { revision: sha256(data).slice(0, 16), bytes: data.length }, `${path}: revisão ou tamanho divergente na lista offline.`);
    assert.ok(!core.includes(path), `${path}: o mesmo recurso não pode ficar no núcleo e nos livros guardados.`);
  }
  const saved = new Set([...offline.assets, ...core]);
  for (const story of stories) {
    assert.ok(saved.has(`/assets/capa-${story.id}.webp`), `${story.id}: a capa WebP exibida na biblioteca precisa estar guardada para usar sem internet.`);
    for (const page of story.pages) assert.ok(saved.has(`/assets/${page.sceneArt}.webp`) && saved.has(page.audio), `${page.audio}: cena e narração precisam estar na lista offline.`);
  }
  const shown = new Set([...sceneAssets].map(name => `/assets/${name}.webp`).concat(expectedAudio.map(file => `/audio/${file}`), stories.map(story => `/assets/capa-${story.id}.webp`)));
  for (const path of offline.assets) assert.ok(shown.has(path), `${path}: arquivo que o app não exibe não pode entrar no download offline.`);
  const megabytes = bytes => (bytes / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  let coreBytes = 0;
  for (const path of core) coreBytes += (await readFile(join(root, 'dist', path === '/index.html' ? 'index.html' : path))).length;
  offlineSummary = ` Núcleo offline: ${core.length} arquivos, ${megabytes(coreBytes)} MB. Livros guardados: ${offline.assets.length} recursos, ${megabytes(Object.values(offline.files).reduce((sum, file) => sum + file.bytes, 0))} MB.`;
}
console.log(`Verificação estrutural concluída: ${stories.length} histórias, ${totalPages} páginas com cenas WebP próprias, ${assets.size} ilustrações PNG de origem, ${Object.keys(icons).length} ícones e ${Object.keys(derived).length} derivados WebP, ${totalPages} áudios AAC pt-BR e ${drawingIds.length} desenhos com ambientes para colorir. ${sourceOnly ? 'Somente a fonte foi conferida (--source-only).' : hasDist ? 'Build e manifesto de áudio conferidos.' : 'Build ainda não gerado.'}${offlineSummary}`);
