import { stories } from '../src/stories.js';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat, mkdtemp, rm, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';

const run = promisify(execFile);
const output = fileURLToPath(new URL('../public/audio/', import.meta.url));
const manifestPath = path.join(output, 'manifest.json');
const voice = 'Luciana';
const rate = 135;
const sha256 = text => createHash('sha256').update(text).digest('hex');
await mkdir(output, { recursive: true });
let previous = { clips: [] };
try { previous = JSON.parse(await readFile(manifestPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const clips = stories.flatMap(story => story.pages.map((page, index) => ({ story: story.id, page: index + 1, file: `${story.id}-${index + 1}.m4a`, text: page.text, textHash: sha256(page.text) })));
const results = new Array(clips.length);
const temporary = await mkdtemp(path.join(os.tmpdir(), 'manu-narration-'));
let cursor = 0;
let checkpoint = Promise.resolve();
async function inspect(file) {
  const buffer = await readFile(file);
  if (buffer.length < 4096 || buffer.toString('ascii', 4, 8) !== 'ftyp') throw new Error(`Invalid MP4 audio: ${file}`);
  const { stdout } = await run('/usr/bin/afinfo', [file]);
  const duration = Number(stdout.match(/estimated duration:\s*([\d.]+)/)?.[1]);
  const frames = Number(stdout.match(/audio\s+(\d+)\s+valid frames/)?.[1]);
  if (!(duration > 0 && frames > 0) || !stdout.includes('aac')) throw new Error(`Missing AAC audio frames: ${file}`);
  return { bytes: (await stat(file)).size, durationSeconds: duration, validFrames: frames, audioHash: sha256(buffer) };
}
async function worker() {
  while (cursor < clips.length) {
    const index = cursor++;
    const clip = clips[index];
    const destination = path.join(output, clip.file);
    const old = previous.clips.find(item => item.file === clip.file);
    let exists = false;
    try { await stat(destination); exists = true; } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (exists && !old) throw new Error(`Refusing to overwrite unrecognized audio: ${destination}`);
    if (!exists || old.textHash !== clip.textHash || old.voice !== voice || old.rate !== rate) {
      const input = path.join(temporary, `${index}.txt`);
      const aiff = path.join(temporary, `${index}.aiff`);
      const encoded = path.join(temporary, `${index}.m4a`);
      await writeFile(input, clip.text, 'utf8');
      await run('/usr/bin/say', ['-v', voice, '-r', String(rate), '-o', aiff, '-f', input]);
      await run('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', aiff, encoded]);
      await inspect(encoded);
      await rename(encoded, destination);
    }
    const { text, ...metadata } = clip;
    results[index] = { ...metadata, voice, rate, ...await inspect(destination) };
    // Checkpoint each successful clip so interrupted runs safely resume.
    checkpoint = checkpoint.then(async () => {
      const completed = results.filter(Boolean);
      const saved = [...completed, ...previous.clips.filter(item => !completed.some(current => current.file === item.file))];
      await writeFile(manifestPath, JSON.stringify({ version: 1, format: 'AAC in M4A', language: 'pt-BR', voice, rate, clips: saved }, null, 2) + '\n');
    });
    await checkpoint;
    process.stdout.write(`${index + 1}/${clips.length} ${clip.file}\n`);
  }
}
try {
  // macOS speech and codec services require a normal host execution environment.
  await Promise.all([worker(), worker()]);
  await writeFile(manifestPath, JSON.stringify({ version: 1, format: 'AAC in M4A', language: 'pt-BR', voice, rate, clips: results }, null, 2) + '\n');
  console.log(JSON.stringify({ clips: results.length, bytes: results.reduce((n, c) => n + c.bytes, 0), durationSeconds: results.reduce((n, c) => n + c.durationSeconds, 0), manifestPath }));
} finally { await rm(temporary, { recursive: true, force: true }); }
