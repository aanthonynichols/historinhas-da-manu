// Promote a verified local generation, preserving the previously served audio.
import assert from 'node:assert/strict';
import { stories } from '../src/stories.js';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, cp, rename, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const stagingFlag = process.argv.indexOf('--staging');
const stagingArgument = process.argv[stagingFlag + 1];
assert.ok(stagingFlag < 0 || (stagingArgument && !stagingArgument.startsWith('--')), '--staging precisa de um caminho.');
const staging = stagingFlag < 0 ? join(root, 'output/gemini-narration') : resolve(root, stagingArgument);
const destination = join(root, 'public/audio');
const sha = data => createHash('sha256').update(data).digest('hex');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const manifest = JSON.parse(await readFile(join(staging, 'manifest.json'), 'utf8'));
const pages = stories.flatMap(story => story.pages.map((page, i) => ({ story: story.id, page: i + 1, text: page.text, file: `${story.id}-${i + 1}.m4a` })));
assert.equal(manifest.clips.length, pages.length, 'O lote deve conter todas as páginas.');
assert.match(manifest.model, /^gemini-/);
assert.equal(manifest.language, 'pt-BR');
assert.equal(new Set(manifest.clips.map(c => c.file)).size, pages.length);
const clips = [];
for (const page of pages) {
  const clip = manifest.clips.find(c => c.file === page.file);
  assert.ok(clip && clip.model === manifest.model && clip.voice === manifest.voice && clip.transcriptMatch);
  assert.equal(clip.story, page.story); assert.equal(clip.page, page.page);
  assert.equal(clip.textHash, sha(page.text));
  assert.equal(normalize(clip.transcript), normalize(page.text));
  const data = await readFile(join(staging, page.file));
  assert.equal(clip.audioHash, sha(data)); assert.equal(clip.bytes, data.length);
  assert.equal(data.toString('ascii', 4, 8), 'ftyp');
  const info = execFileSync('/usr/bin/afinfo', [join(staging, page.file)], { encoding: 'utf8' });
  assert.match(info, /Data format:[^\n]*\baac\b/i);
  assert.equal(Number(info.match(/audio\s+(\d+)\s+valid frames/)?.[1]), clip.validFrames);
  assert.ok(Math.abs(Number(info.match(/estimated duration:\s*([\d.]+)/)?.[1]) - clip.durationSeconds) < 0.000001);
  clips.push(clip);
}
if (!process.argv.includes('--apply')) {
  console.log(JSON.stringify({ verified: clips.length, voice: manifest.voice, model: manifest.model, publicReplaced: false }));
} else {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const prepared = join(root, `output/narration-promote-${stamp}`);
  const rollback = join(root, `output/rollback/narration-before-gemini-${stamp}`);
  await mkdir(prepared, { recursive: true });
  await mkdir(join(root, 'output/rollback'), { recursive: true });
  for (const clip of clips) await cp(join(staging, clip.file), join(prepared, clip.file), { errorOnExist: true });
  await writeFile(join(prepared, 'manifest.json'), JSON.stringify({ ...manifest, provider: 'Google Gemini Live', format: 'AAC in M4A', generatedFor: 'Historinhas da Manu', clips }, null, 2) + '\n');
  await access(join(destination, 'manifest.json'));
  await rename(destination, rollback);
  try { await rename(prepared, destination); } catch (error) { await rename(rollback, destination); throw error; }
  console.log(JSON.stringify({ promoted: clips.length, voice: manifest.voice, model: manifest.model, rollback, publicReplaced: true }));
}
