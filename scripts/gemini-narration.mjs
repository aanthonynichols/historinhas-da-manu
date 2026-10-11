// Credentials arrive exclusively as JSON on stdin; never put them in CLI arguments.
import { stories } from '../src/stories.js';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const run = promisify(execFile);
const args = process.argv.slice(2);
const option = (name, fallback) => { const i = args.indexOf(`--${name}`); return i < 0 ? fallback : args[i + 1]; };
const sha = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const output = path.resolve(option('output', fileURLToPath(new URL('../output/gemini-narration/', import.meta.url))));
const model = option('model', 'gemini-3.8-live');
const voice = option('voice', 'Aoede');
const mode = option('mode', 'sample');
const concurrency = Math.min(3, Math.max(1, Number(option('concurrency', '1')) || 1));
const setupTimeout = 30000;
const turnTimeout = 120000;
const sessions = new Set();
const cancellation = new AbortController();
let cancelled = false;
process.once('SIGINT', () => { cancelled = true; cancellation.abort(); for (const session of sessions) session.close(); });

function safeError(error) {
  const status = error?.status ?? error?.code;
  const text = String(error?.message || '').toLowerCase();
  if (status === 401 || status === 403 || /api key|unauthenticated|permission|expired|invalid token/.test(text)) return 'Autenticação recusada ou expirada. Forneça uma credencial válida e autorizada para Gemini Live.';
  if (status === 429 || /quota|resource exhausted/.test(text)) return 'Limite ou quota do Gemini atingido. Nenhum áudio público foi substituído.';
  if (/not found|unsupported|not supported/.test(text)) return 'Modelo ou configuração indisponível para esta conta. Confira --model e suporte ao Gemini Live.';
  if (/timeout/.test(text)) return 'Tempo limite do Gemini Live excedido. O checkpoint preserva as páginas concluídas.';
  if (/transcription mismatch/.test(text)) return 'A transcrição não corresponde exatamente ao texto. A página ficou em staging para revisão e o lote parou.';
  return cancelled ? 'Geração cancelada; checkpoint preservado.' : 'A geração não foi concluída. Confira acesso ao Gemini Live, conexão e ferramentas de áudio do macOS.';
}
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
function timed(promise, ms) {
  let timer; let abort;
  return Promise.race([promise, new Promise((_, reject) => {
    abort = () => reject(new Error('cancelled'));
    if (cancellation.signal.aborted) return abort();
    cancellation.signal.addEventListener('abort', abort, { once: true });
    timer = setTimeout(() => reject(new Error('timeout')), ms);
  })]).finally(() => { clearTimeout(timer); cancellation.signal.removeEventListener('abort', abort); });
}
function delay(ms) {
  let timer;
  return timed(new Promise(resolve => { timer = setTimeout(resolve, ms); }), ms + 1000).finally(() => clearTimeout(timer));
}
function quotaError(error) { return Number(error?.status ?? error?.code) === 429 || /quota|resource.?exhausted|429/.test(String(error?.message || '').toLowerCase()); }
async function generateWithQuotaRetry(client, text) {
  for (let retry = 0; ; retry++) {
    try { return await generate(client, text); }
    catch (error) { if (!quotaError(error) || retry >= 2 || cancelled) throw error; console.log(`Quota temporária; nova tentativa em ${(retry + 1) * 5} segundos.`); await delay((retry + 1) * 5000); }
  }
}
async function credentials() {
  let hidden = false;
  try {
    if (process.stdin.isTTY) { process.stdin.setRawMode(true); hidden = true; }
    process.stderr.write('Ready for credential JSON on hidden stdin.\n');
    process.stdin.resume();
    let input = '';
    const parsed = await new Promise((resolve,reject) => {
      const data = chunk => {
        input += chunk.toString();
        if (input.includes('\u0003')) { process.stdin.off('data', data); reject(new Error('cancelled')); return; }
        if (input.length > 16384) { process.stdin.off('data', data); reject(new Error('authentication input too large')); return; }
        if (input.includes('\n')) { process.stdin.off('data',data); try { resolve(JSON.parse(input.trim())); } catch { reject(new Error('invalid token')); } input = ''; }
      };
      process.stdin.on('data', data);
      process.stdin.once('end', () => { if (input) { try { resolve(JSON.parse(input)); } catch { reject(new Error('invalid token')); } } else reject(new Error('invalid token')); });
    });
    if (typeof parsed.apiKey !== 'string' || !parsed.apiKey.trim()) throw new Error('invalid token');
    return parsed;
  } finally { process.stdin.pause(); if (hidden) process.stdin.setRawMode(false); }
}
function wav(pcm) {
  const header = Buffer.alloc(44);
  header.write('RIFF'); header.writeUInt32LE(36 + pcm.length, 4); header.write('WAVE', 8); header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22); header.writeUInt32LE(24000, 24); header.writeUInt32LE(48000, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34); header.write('data', 36); header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}
async function generate(client, text) {
  const setup = deferred(); const complete = deferred();
  setup.promise.catch(() => {});
  // Avoid unhandled rejection while the setup phase is pending.
  complete.promise.catch(() => {});
  const chunks = []; let transcript = ''; let transcriptionFinished = false; let session; let abandoned = false;
  try {
    const connection = client.live.connect({
      model,
      config: { responseModalities: ['AUDIO'], outputAudioTranscription: {}, speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } }, systemInstruction: 'Você é uma narradora brasileira adulta, com voz feminina doce e acolhedora, contando um livro ilustrado para uma criança de dois anos e meio. Fale exclusivamente português do Brasil com pronúncia brasileira natural. A voz é humana e expressiva: ritmo tranquilo mas vivo, pausas entre as frases, pequenas variações de tom que convidam a imaginar. Não soletrar, não falar como assistente digital, não exagerar voz de bebê. Leia EXATAMENTE o texto recebido, sem prefácio, título, comentário, repetição ou alteração. Termine logo após a última palavra.' },
      callbacks: {
        onmessage(message) {
          if (message.setupComplete) setup.resolve();
          const content = message.serverContent;
          for (const part of content?.modelTurn?.parts || []) {
            if (part.inlineData?.data) {
              const mime = part.inlineData.mimeType || '';
              if (!mime.startsWith('audio/pcm') || (mime.includes('rate=') && !mime.includes('rate=24000'))) { complete.reject(new Error('unsupported audio format')); continue; }
              chunks.push(Buffer.from(part.inlineData.data, 'base64'));
            }
          }
          if (content?.outputTranscription?.text) transcript += content.outputTranscription.text;
          if (content?.outputTranscription?.finished === true) transcriptionFinished = true;
          if (content?.interrupted) complete.reject(new Error('interrupted'));
          if (content?.turnComplete) complete.resolve();
        },
        onerror(error) { setup.reject(error); complete.reject(error); },
        onclose(event) { const error = new Error(cancelled ? 'cancelled' : event?.reason || 'connection closed'); setup.reject(error); complete.reject(error); }
      }
    });
    connection.then(connected => { if (abandoned || cancelled) connected.close(); }).catch(() => {});
    session = await timed(connection, setupTimeout);
    sessions.add(session);
    await timed(setup.promise, setupTimeout);
    if (cancelled) throw new Error('cancelled');
    session.sendClientContent({ turns: [{ role: 'user', parts: [{ text }] }], turnComplete: true });
    await timed(complete.promise, turnTimeout);
    // Transcription is delivered independently and can finish after the audio turn.
    const transcriptionDeadline = Date.now() + 6000;
    while (!transcriptionFinished && normalize(transcript) !== normalize(text) && Date.now() < transcriptionDeadline) await delay(50);
    // Keep callbacks open briefly for any last audio/transcription fragments.
    await delay(150);
    const pcm = Buffer.concat(chunks);
    if (!pcm.length || pcm.length % 2) throw new Error('invalid audio');
    return { pcm, transcript };
  } finally { abandoned = true; session?.close(); sessions.delete(session); }
}
async function main() {
  if (!['probe', 'sample', 'batch', 'verify'].includes(mode)) throw new Error('unsupported mode');
  await mkdir(output, { recursive: true });
  const manifestPath = path.join(output, 'manifest.json');
  let manifest = { version: 1, model, voice, language: 'pt-BR', clips: [] };
  try { manifest = JSON.parse(await readFile(manifestPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const all = stories.flatMap(story => story.pages.map((page, index) => ({ story: story.id, page: index + 1, text: page.text, textHash: sha(page.text), file: `${story.id}-${index + 1}.m4a` })));
  const selected = mode === 'sample' ? all.filter(item => item.story === option('story', 'chapeuzinho') && item.page === Number(option('page', '1'))) : all;
  if (!selected.length) throw new Error('invalid selection');
  async function verify(item) {
    const data = await readFile(path.join(output, item.file));
    if (sha(data) !== item.audioHash || data.toString('ascii', 4, 8) !== 'ftyp') throw new Error('invalid audio');
    const { stdout } = await run('/usr/bin/afinfo', [path.join(output, item.file)]);
    if (!stdout.includes('aac') || !(Number(stdout.match(/audio\s+(\d+)\s+valid frames/)?.[1]) > 0)) throw new Error('invalid frames');
  }
  if (mode === 'verify') {
    for (const page of all) { const clip = manifest.clips.find(c => c.file === page.file && c.textHash === page.textHash && c.model === model && c.voice === voice && c.transcriptMatch); if (!clip) throw new Error('missing approved page'); await verify(clip); }
    console.log(JSON.stringify({ ready: true, verified: all.length, output, publicReplaced: false })); return;
  }
  const sdkPath = option('sdk');
  const { GoogleGenAI } = sdkPath ? await import(pathToFileURL(path.join(sdkPath, 'dist/node/index.mjs')).href) : await import('@google/genai');
  const auth = await credentials();
  const ephemeral = auth.ephemeral === true || auth.apiKey.startsWith('auth_tokens/');
  if (ephemeral && concurrency > 1) throw new Error('unsupported ephemeral concurrency');
  const client = new GoogleGenAI({ apiKey: auth.apiKey, httpOptions: { apiVersion: ephemeral ? 'v1beta' : 'v1beta' } });
  auth.apiKey = '';
  if (mode === 'probe') {
    const setup = deferred(); setup.promise.catch(() => {});
    const session = await timed(client.live.connect({ model, config: { responseModalities:['AUDIO'], speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:voice}}} }, callbacks:{onmessage:message => { if (message.setupComplete) setup.resolve(); }, onerror:error => setup.reject(error), onclose:() => setup.reject(new Error('connection closed'))} }),setupTimeout);
    sessions.add(session);
    try { await timed(setup.promise,setupTimeout); console.log(JSON.stringify({ready:true,model,voice,credentialsPersisted:false,audioGenerated:false})); }
    finally { session.close(); sessions.delete(session); }
    return;
  }
  let cursor = 0; let checkpoint = Promise.resolve();
  async function worker() {
    while (cursor < selected.length && !cancelled) {
      const page = selected[cursor++];
      const existing = manifest.clips.find(c => c.file === page.file);
      if (existing?.textHash === page.textHash && existing.model === model && existing.voice === voice && existing.transcriptMatch) { await verify(existing); console.log(`Reutilizado: ${page.file}`); continue; }
      for (let attempt = 1; attempt <= 3; attempt++) {
      const result = await generateWithQuotaRetry(client, page.text);
      const wavPath = path.join(output, `${page.file}.wav`);
      const pendingPath = path.join(output, `${page.file}.pending.m4a`);
      await writeFile(wavPath, wav(result.pcm));
      await run('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', wavPath, pendingPath]);
      const data = await readFile(pendingPath);
      const { stdout } = await run('/usr/bin/afinfo', [pendingPath]);
      const durationSeconds = Number(stdout.match(/estimated duration:\s*([\d.]+)/)?.[1]);
      const validFrames = Number(stdout.match(/audio\s+(\d+)\s+valid frames/)?.[1]);
      if (!(durationSeconds > 0 && validFrames > 0) || data.toString('ascii', 4, 8) !== 'ftyp' || !stdout.includes('aac')) throw new Error('invalid encoded audio');
      await rename(pendingPath, path.join(output, page.file));
      const { text, ...source } = page;
      const clip = { ...source, model, voice, attempt, durationSeconds, validFrames, bytes: (await stat(path.join(output, page.file))).size, audioHash: sha(data), transcript: result.transcript, transcriptMatch: normalize(result.transcript) === normalize(page.text) };
      checkpoint = checkpoint.then(async () => { manifest.clips = [...manifest.clips.filter(c => c.file !== clip.file), clip]; const temporary = `${manifestPath}.tmp`; await writeFile(temporary, JSON.stringify(manifest, null, 2) + '\n'); await rename(temporary, manifestPath); });
      await checkpoint;
      console.log(`${clip.transcriptMatch ? 'Preparado' : 'Revisão de transcrição necessária'}: ${clip.file}`);
      if (clip.transcriptMatch) break;
      if (attempt === 3) throw new Error('transcription mismatch');
      console.log(`Repetindo a mesma página, tentativa ${attempt + 1}/3: ${page.file}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  await checkpoint;
  if (cancelled) throw new Error('cancelled');
  console.log(JSON.stringify({ prepared: selected.length, output, manifestPath, publicReplaced: false }));
}
main().catch(error => { for (const session of sessions) session.close(); console.error(safeError(error)); process.exitCode = 1; });
