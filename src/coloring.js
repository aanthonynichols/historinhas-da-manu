import { playDrawingLife } from './life.js';

import { coloringDrawings as outlines } from './coloring-shapes.js';
import { coloringScenes } from './coloring-scenes.js';
import { characterMarkup, sceneMarkup } from './coloring-art.js';

const colors = [ ['#e5b84f','Amarelo'], ['#e897b1','Rosa'], ['#78aabd','Azul'], ['#8daa75','Verde'], ['#e49457','Laranja'], ['#aa91c0','Roxo'], ['#cf6b60','Vermelho'], ['#9e7c59','Marrom'] ];
const memory = new Map();
const thumbCache = new Map();
// v3: uma chave por desenho, em décimos de unidade. v2 e v1 são só lidas, nunca regravadas.
const PAINT_PREFIX = 'historinhas-manu:desenhos:v3:';
const PAINT_STORAGE = 'historinhas-manu:desenhos:v2';
const LEGACY_PAINT_STORAGE = 'historinhas-manu:desenhos:v1';
const LAST_PAINTING = 'historinhas-manu:ultimo-desenho';
// Cota medida no WebKit: cerca de 5,24 milhões de caracteres por origem. A sobra fica para favoritos e marcadores.
const PAINT_LIMIT = 5_000_000;
const TOUCH_WIDTH = 7, ERASER_WIDTH = 14;
const DIGITS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
let pickerPosition = { top:0, left:0 };
let retained = null;
try { retained = JSON.parse(localStorage.getItem(PAINT_STORAGE) || '{}'); } catch { retained = {}; }
if (!retained || typeof retained !== 'object' || Array.isArray(retained)) retained = {};
let legacy = {};
try { legacy = JSON.parse(localStorage.getItem(LEGACY_PAINT_STORAGE) || '{}'); } catch { /* Older paintings remain untouched. */ }
if (!legacy || typeof legacy !== 'object' || Array.isArray(legacy)) legacy = {};
const storedSizes = new Map();
let storageUsed = 0;
try { for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i), size = localStorage.getItem(key)?.length || 0; storageUsed += key.length + size; if (key.startsWith(PAINT_PREFIX)) storedSizes.set(key, size); } } catch { /* Sem armazenamento: as pinturas ficam na memória da sessão. */ }

const clampUnit = v => Math.round(Math.max(-10, Math.min(130, v)) * 10) / 10;
const clampWidth = v => Math.round(Math.max(.5, Math.min(20, v)) * 10) / 10;
function pack(values) {
  let text = '';
  for (const value of values) { let v = value < 0 ? -value * 2 - 1 : value * 2; do { const low = v % 32; v = Math.floor(v / 32); text += DIGITS[v ? low + 32 : low]; } while (v); }
  return text;
}
function unpack(text) {
  const values = []; let v = 0, shift = 1;
  for (const char of text) { const digit = DIGITS.indexOf(char); if (digit < 0) return null; v += (digit % 32) * shift; if (digit >= 32) shift *= 32; else { values.push(v % 2 ? -(v + 1) / 2 : v / 2); v = 0; shift = 1; } }
  return shift === 1 && v === 0 ? values : null;
}
function encodeStroke(stroke) {
  const width = stroke.points[0][2], even = stroke.points.every(p => p[2] === width), values = [];
  let x0 = 0, y0 = 0, w0 = 0;
  for (const [x,y,w] of stroke.points) { const qx = Math.round(x*10), qy = Math.round(y*10), qw = Math.round(w*10); values.push(qx-x0, qy-y0); if (!even) values.push(qw-w0); x0 = qx; y0 = qy; w0 = qw; }
  return JSON.stringify([stroke.color, stroke.eraser ? 1 : 0, even ? Math.round(width*10) : 0, pack(values), ...(stroke.g ? [stroke.g] : [])]);
}
function decodePainting(raw) {
  let records; try { records = JSON.parse(raw); } catch { return null; }
  if (!Array.isArray(records)) return null;
  return records.flatMap(record => {
    if (!Array.isArray(record) || !/^#[0-9a-f]{6}$/i.test(record[0]) || ![0,1].includes(record[1]) || !Number.isInteger(record[2]) || record[2] < 0 || typeof record[3] !== 'string') return [];
    const values = unpack(record[3]), stride = record[2] ? 2 : 3;
    if (!values?.length || values.length % stride) return [];
    const points = []; let x = 0, y = 0, w = 0;
    for (let i = 0; i < values.length; i += stride) { x += values[i]; y += values[i+1]; w = record[2] || w + values[i+2]; points.push([clampUnit(x/10), clampUnit(y/10), clampWidth(w/10)]); }
    return [{ color:record[0], eraser:record[1] === 1, points, ...(Number.isInteger(record[4]) && record[4] > 0 ? { g:record[4] } : {}) }];
  });
}
function sanitize(source) {
  return Array.isArray(source) ? source.filter(s => s && typeof s === 'object' && /^#[0-9a-f]{6}$/i.test(s.color) && typeof s.eraser === 'boolean' && Array.isArray(s.points)).map(s => ({ color:s.color, eraser:s.eraser, points:s.points.filter(p => Array.isArray(p) && p.length === 3 && p.every(Number.isFinite)).map(p => [clampUnit(p[0]),clampUnit(p[1]),clampWidth(p[2])]) })).filter(s => s.points.length) : [];
}
function storedPainting(id) {
  if (memory.has(id)) return memory.get(id);
  let raw = null;
  try { raw = localStorage.getItem(PAINT_PREFIX + id); } catch { /* Segue para as versões anteriores. */ }
  const current = raw === null ? null : decodePainting(raw);
  if (current) return current;
  if (Object.prototype.hasOwnProperty.call(retained, id)) return sanitize(retained[id]);
  if (!Array.isArray(legacy[id])) return [];
  // Keep old character colors in the same parts of the new, smaller character.
  // V1 stays intact so the previous release can still read its own paintings.
  const f = coloringScenes[id].frame;
  return sanitize(legacy[id]).map(stroke => ({ ...stroke, points: stroke.points.map(([x,y,width]) => [clampUnit(f.x+x*f.width/120), clampUnit(f.y+y*f.height/120), clampWidth(width*f.width/120)]) }));
}
const quotaError = error => error?.name === 'QuotaExceededError' || error?.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error?.code === 22 || error?.code === 1014;

export const coloringShapes = Object.keys(outlines);
export function lastPainting() {
  try { const id = localStorage.getItem(LAST_PAINTING); return outlines[id] ? id : 'borboleta'; } catch { return 'borboleta'; }
}
export function paintingThumb(id) {
  const shape = outlines[id] || outlines.borboleta;
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${characterMarkup(shape)}</svg>`;
}

export function mountColoring(mount, { id = 'borboleta', icon, sound, onBack, muted = false, reducedMotion = false }) {
  id = outlines[id] ? id : 'borboleta';
  const shape = outlines[id];
  const scene = coloringScenes[id];
  let strokes = storedPainting(id);
  let color = colors[0][0];
  let eraser = false;
  let alive = false;
  let lifeCleanup = null;
  let frame = null;
  let startedAt = 0;
  let cleared = null;
  let clearTimer = null;
  let armedAt = 0;
  let penUntil = 0;
  let lastTouch = { id:null, time:0 };
  let gestures = strokes.reduce((top, s) => Math.max(top, s.g || 0), 0);
  // Um traço por ponteiro: a mão apoiada não bloqueia o dedo que pinta.
  const active = new Map();
  const pinch = new Set();
  const encoded = new WeakMap();
  try { localStorage.setItem(LAST_PAINTING, id); } catch { /* Só um atalho para voltar ao último desenho. */ }

  mount.innerHTML = `<main class="atelier" id="main"><header class="atelier-header"><a href="#/" class="reader-back" draggable="false">${icon('back')}<span>Biblioteca</span></a><div class="reader-title"><span class="eyebrow">UM MUNDINHO DE CORES</span><strong>Ateliê da Manu</strong></div><span class="pencil-label">${icon('sparkle')} Dedo ou Apple Pencil</span></header><div class="atelier-layout"><aside class="shape-picker" aria-label="Escolha um desenho"><h1>Vamos colorir?</h1><p>20 mundinhos para pintar e brincar.</p><div class="shape-options">${Object.entries(outlines).map(([key,value]) => `<a href="#/pintar/${key}" class="shape-option ${key === id ? 'selected' : ''}" draggable="false" aria-label="Colorir ${value.name}" ${key === id ? 'aria-current="page"' : ''}>${paintingThumb(key)}<span>${value.name}</span></a>`).join('')}</div><div class="pencil-note">${icon('heart')}<p>Cada rabisco é uma descoberta. Não precisa ficar dentro das linhas!</p></div></aside><section class="paint-workspace" aria-label="Colorir ${shape.name}"><div class="paint-top"><div><span class="eyebrow">UM POUQUINHO DE COR, UM MONTÃO DE MAGIA</span><h2>${shape.gender === 'm' ? 'Meu' : 'Minha'} ${shape.name.toLowerCase()}</h2></div><span class="paint-instruction">Pinte o mundinho inteiro!</span></div><p class="scene-paint-hint">${scene.hint}</p><div class="paint-paper"><span class="paint-spark paint-spark-a" aria-hidden="true">✧</span><span class="paint-spark paint-spark-b" aria-hidden="true">✦</span><div class="canvas-holder"><svg class="shape-background" viewBox="0 0 120 120" aria-hidden="true">${sceneMarkup(shape, scene, 'background')}</svg><canvas id="painting-canvas" tabindex="0" aria-label="Área para pintar ${shape.name} e ${scene.label.toLowerCase()} com o dedo ou a Apple Pencil. Pelo teclado, use as setas para mover e Enter ou espaço para pintar.">Área de desenho. Use um navegador com suporte a canvas.</canvas><svg class="shape-outline" viewBox="0 0 120 120" aria-hidden="true">${sceneMarkup(shape, scene, 'outline')}</svg></div><div class="alive-caption" role="status" aria-live="polite"></div></div><div class="paint-palette" role="group" aria-label="Escolha uma cor">${colors.map(([hex,name],index) => `<button class="color-swatch ${index === 0 ? 'selected' : ''}" data-paint="color" data-color="${hex}" style="--swatch:${hex}" aria-label="${name}" aria-pressed="${index === 0}">${index === 0 ? icon('check') : ''}</button>`).join('')}<button class="eraser-button" data-paint="eraser" aria-label="Usar borracha" aria-pressed="false">${icon('eraser')}</button></div><div class="paint-actions"><button class="paint-undo" data-paint="undo" aria-label="Desfazer último rabisco">${icon('back')}<span>Desfazer</span></button><button class="button primary life-button" data-paint="life">${icon('sparkle')} Dar vida!</button><button class="paint-clear" data-paint="clear">${icon('repeat')}<span>Começar de novo</span></button></div><p class="drawing-save-note" aria-live="polite">${icon('pencil')} Pinte o personagem e o cenário. Suas cores ficam guardadas neste navegador.</p></section></div></main>`;
  document.body.classList.add('painting');
  const canvas = mount.querySelector('#painting-canvas');
  const holder = mount.querySelector('.canvas-holder');
  const picker = mount.querySelector('.shape-options');
  picker.scrollTop = pickerPosition.top; picker.scrollLeft = pickerPosition.left;
  const selected = picker.querySelector('.selected');
  const selectedBox = selected.getBoundingClientRect(), pickerBox = picker.getBoundingClientRect();
  if (selectedBox.bottom > pickerBox.bottom) picker.scrollTop += selectedBox.bottom - pickerBox.bottom + 6;
  else if (selectedBox.top < pickerBox.top) picker.scrollTop -= pickerBox.top - selectedBox.top + 6;
  if (selectedBox.right > pickerBox.right) picker.scrollLeft += selectedBox.right - pickerBox.right + 6;
  else if (selectedBox.left < pickerBox.left) picker.scrollLeft -= pickerBox.left - selectedBox.left + 6;
  const paper = mount.querySelector('.paint-paper');
  const ctx = canvas.getContext('2d');
  const completed = document.createElement('canvas');
  const completedCtx = completed.getContext('2d');
  const undoButton = mount.querySelector('[data-paint="undo"]');
  const keyboardPoint = [60, 60];
  const caption = mount.querySelector('.alive-caption');
  const lifeButton = mount.querySelector('[data-paint="life"]');
  const clearButton = mount.querySelector('[data-paint="clear"]');
  const saveNote = mount.querySelector('.drawing-save-note');
  const savedNote = saveNote.innerHTML;
  let saveProblem = null;
  let scale = 1;

  function persist() {
    memory.set(id, strokes);
    const key = PAINT_PREFIX + id, inProgress = new Set(active.values());
    const text = `[${strokes.map(s => { if (inProgress.has(s)) return encodeStroke(s); if (!encoded.has(s)) encoded.set(s, encodeStroke(s)); return encoded.get(s); }).join(',')}]`;
    const growth = text.length - (storedSizes.get(key) ?? -key.length);
    let problem = null;
    if (growth > 0 && storageUsed + growth > PAINT_LIMIT) problem = 'full';
    else try { localStorage.setItem(key, text); storageUsed += growth; storedSizes.set(key, text.length); } catch (error) { problem = quotaError(error) ? 'full' : 'off'; }
    // O que está na tela continua na memória da sessão; o aviso é para o adulto.
    if (problem === saveProblem) return;
    saveProblem = problem;
    saveNote.classList.toggle('save-warning', !!problem);
    saveNote.innerHTML = problem ? `${icon('heart')} Para os adultos: ${problem === 'full' ? 'acabou o espaço para guardar pinturas neste navegador' : 'este navegador não está guardando as pinturas'}. O que está na tela fica até fechar o app.` : savedNote;
  }
  function renderStroke(target, stroke, k = scale) {
    target.save();
    target.scale(k,k);
    // Os rabiscos atravessam as linhas: criatividade livre, sem tarefa de precisão.
    target.lineCap = 'round'; target.lineJoin = 'round';
    target.globalCompositeOperation = stroke.eraser ? 'destination-out' : 'source-over';
    target.strokeStyle = stroke.color; target.fillStyle = stroke.color;
    const width = stroke.points[0][2];
    if (stroke.points.length === 1) {
      const [x,y] = stroke.points[0]; target.beginPath(); target.arc(x,y,width/2,0,Math.PI*2); target.fill();
    } else if (stroke.points.every(p => p[2] === width)) {
      target.lineWidth = width; target.beginPath(); target.moveTo(stroke.points[0][0],stroke.points[0][1]);
      for (const [x,y] of stroke.points) target.lineTo(x,y);
      target.stroke();
    } else {
      for (let i=1;i<stroke.points.length;i++) {
        const before=stroke.points[i-1], point=stroke.points[i];
        target.lineWidth=(point[2]+before[2])/2; target.beginPath(); target.moveTo(before[0],before[1]); target.lineTo(point[0],point[1]); target.stroke();
      }
    }
    target.restore();
  }
  function rebuildCache() {
    const inProgress = new Set(active.values());
    completedCtx.clearRect(0,0,completed.width,completed.height);
    for (const stroke of strokes) if (!inProgress.has(stroke)) renderStroke(completedCtx,stroke);
  }
  // Um traço que termina antes de outro mais novo refaz o cache para manter a ordem das cores.
  function settle(stroke) {
    const inProgress = new Set(active.values());
    if (strokes.slice(strokes.lastIndexOf(stroke)+1).some(s => !inProgress.has(s))) rebuildCache();
    else renderStroke(completedCtx,stroke);
  }
  function draw() {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(completed,0,0);
    for (const stroke of active.values()) renderStroke(ctx,stroke);
    undoButton.disabled = !strokes.length && !cleared;
  }
  function scheduleDraw() { if (!frame) frame=requestAnimationFrame(() => { frame=null; draw(); }); }
  function resize() {
    const size=Math.max(1,holder.getBoundingClientRect().width);
    canvas.width=Math.round(size*Math.min(devicePixelRatio||1,2)); canvas.height=canvas.width;
    completed.width=canvas.width; completed.height=canvas.height;
    scale=canvas.width/120; rebuildCache(); draw();
  }
  function addPoint(pointerId, next) {
    const stroke=active.get(pointerId), last=stroke.points.at(-1);
    if (Math.hypot(next[0]-last[0],next[1]-last[1]) <= Math.max(.4,last[2]*.1)) return;
    if (stroke.points.length >= 400) {
      // Um rabisco muito longo continua num trecho novo, sem perder nada do começo.
      stroke.g ||= ++gestures;
      const rest={ color:stroke.color, eraser:stroke.eraser, pen:stroke.pen, g:stroke.g, points:[last,next] };
      strokes.push(rest); active.set(pointerId,rest); settle(stroke);
      return;
    }
    stroke.points.push(next);
  }
  function point(event, stroke = null) {
    const box=canvas.getBoundingClientRect();
    const width=(stroke ? stroke.eraser : eraser) ? ERASER_WIDTH : event.pointerType === 'pen' ? 3.5+Math.max(.3,event.pressure || .5)*5.5 : TOUCH_WIDTH;
    return [clampUnit((event.clientX-box.left)/box.width*120),clampUnit((event.clientY-box.top)/box.height*120),clampWidth(width)];
  }
  function hasInk() {
    const data=completedCtx.getImageData(0,0,completed.width,completed.height).data;
    for (let i=3;i<data.length;i+=4) if (data[i]) return true;
    return false;
  }
  function disarmClear() {
    clearTimeout(clearTimer);
    if (!clearButton.classList.contains('confirm-clear')) return;
    clearButton.classList.remove('confirm-clear'); clearButton.innerHTML=`${icon('repeat')}<span>Começar de novo</span>`;
  }
  function syncTools() {
    mount.querySelectorAll('.color-swatch').forEach(el => { const on=!eraser && el.dataset.color === color; el.classList.toggle('selected',on); el.setAttribute('aria-pressed',String(on)); el.innerHTML=on?icon('check'):''; });
    const rubber=mount.querySelector('.eraser-button'); rubber.classList.toggle('selected',eraser); rubber.setAttribute('aria-pressed',String(eraser));
  }
  function stopLife() { lifeCleanup?.(); lifeCleanup = null; alive=false; disarmClear(); paper.classList.remove('alive'); caption.textContent=''; lifeButton.innerHTML=`${icon('sparkle')} Dar vida!`; }
  function live() {
    // O toque duplo da criança não desliga a mágica que acabou de começar.
    if (alive) { if (performance.now()-startedAt >= 800) stopLife(); return; }
    if (!hasInk()) {
      // Quem ainda não lê ouve um brilho e vê a cor da vez pulsar: é por ali que a pintura começa.
      sound('magic');
      const hint=mount.querySelector(`.color-swatch[data-color="${color}"]`);
      hint.classList.remove('hint-pulse'); void hint.offsetWidth; hint.classList.add('hint-pulse');
      caption.textContent='Pinte um pouquinho e toque em Dar vida!';
      return;
    }
    alive=true; startedAt=performance.now(); disarmClear();
    paper.classList.add('alive');
    caption.textContent=shape.caption || { borboleta:'Olha! Sua borboleta está voando!',bola:'Pula, pula! A sua bola ganhou vida!',flor:'A sua flor está dançando!',estrela:'Sua estrelinha está brilhando!',peixinho:'Chuá! Seu peixinho está nadando!',coracao:'Um abraço de todas as cores!',abelhinha:'Zum, zum! Sua abelhinha veio brincar!',passarinho:'Piu, piu! Seu passarinho está cantando!',foguete:'Lá vai seu foguete passear entre as estrelas!',pipa:'Sua pipa está dançando com o ventinho!',tartaruguinha:'O sol brilha! Sua tartaruguinha passeia pela grama!',caracol:'Seu caracol leva as cores para passear!' }[id];
    lifeButton.innerHTML=`${icon('pencil')} Voltar a pintar`;
    try { lifeCleanup = playDrawingLife({ canvas, path:shape.path, details:shape.details, rig:shape.rig, scene, type:shape.motion, onEnd:stopLife, reducedMotion:reducedMotion || matchMedia('(prefers-reduced-motion: reduce)').matches, muted }); } catch { stopLife(); }
  }
  function cancel(pointerId) {
    const stroke=active.get(pointerId); active.delete(pointerId);
    const parts=stroke.g ? strokes.filter(s => s.g === stroke.g) : [stroke];
    strokes=strokes.filter(s => !parts.includes(s));
    if (parts.length > 1) rebuildCache();
  }
  paper.addEventListener('pointerdown', event => {
    if (event.button !== 0 || active.has(event.pointerId)) return;
    const touch=event.pointerType === 'touch', pen=event.pointerType === 'pen', now=performance.now();
    if (touch && pinch.size) { pinch.add(event.pointerId); return; }
    // A palma que encosta junto com a Apple Pencil não pinta.
    if (touch && ([...active.values()].some(s => s.pen) || now < penUntil)) return;
    if (touch) {
      const first=active.get(lastTouch.id);
      // Dois dedos que chegam juntos são pinça, não rabisco.
      if (first && now-lastTouch.time < 150 && Math.hypot(first.points.at(-1)[0]-first.points[0][0],first.points.at(-1)[1]-first.points[0][1]) < 3) { cancel(lastTouch.id); pinch.add(lastTouch.id).add(event.pointerId); scheduleDraw(); return; }
      lastTouch={ id:event.pointerId, time:now };
    }
    if (active.size >= 5) return;
    event.preventDefault();
    stopLife();
    if (pen) for (const [other,stroke] of active) if (!stroke.pen) cancel(other);
    try { paper.setPointerCapture(event.pointerId); } catch { /* O ponteiro continua na folha pela captura implícita. */ }
    const stroke={ color,eraser,pen,points:[point(event)] };
    active.set(event.pointerId,stroke); strokes.push(stroke); scheduleDraw();
  });
  paper.addEventListener('pointermove', event => {
    if (!active.has(event.pointerId)) return;
    event.preventDefault();
    const samples = event.getCoalescedEvents?.();
    for (const sample of samples?.length ? samples : [event]) addPoint(event.pointerId,point(sample,active.get(event.pointerId)));
    scheduleDraw();
  });
  const release = event => {
    const stroke=active.get(event.pointerId); if (!stroke) return;
    active.delete(event.pointerId);
    if (stroke.pen) penUntil=performance.now()+800;
    try { if (paper.hasPointerCapture(event.pointerId)) paper.releasePointerCapture(event.pointerId); } catch { /* Captura já liberada. */ }
    const parts=stroke.g ? strokes.filter(s => s.g === stroke.g) : [stroke];
    // Um traço feito só na margem não deixa tinta e não ocupa o Desfazer.
    const inked=parts.some(s => s.points.some(([x,y,w]) => x > -w/2 && x < 120+w/2 && y > -w/2 && y < 120+w/2));
    if (inked) { settle(stroke); cleared=null; }
    else { strokes=strokes.filter(s => !parts.includes(s)); if (parts.length > 1) rebuildCache(); }
    scheduleDraw(); persist();
    if (inked) { paper.classList.remove('just-painted'); void paper.offsetWidth; paper.classList.add('just-painted'); }
  };
  paper.addEventListener('pointerup',release);
  paper.addEventListener('pointercancel',release);
  paper.addEventListener('lostpointercapture',release);
  const lift = event => { if (pinch.delete(event.pointerId)) pinch.clear(); };
  window.addEventListener('pointerup',lift); window.addEventListener('pointercancel',lift);
  canvas.addEventListener('keydown', event => {
    if (active.size) return;
    const moves={ArrowLeft:[-6,0],ArrowRight:[6,0],ArrowUp:[0,-6],ArrowDown:[0,6]};
    if (moves[event.key]) {
      event.preventDefault();
      keyboardPoint[0]=Math.max(0,Math.min(120,keyboardPoint[0]+moves[event.key][0]));
      keyboardPoint[1]=Math.max(0,Math.min(120,keyboardPoint[1]+moves[event.key][1]));
      caption.textContent=`Ponto de pintura: ${keyboardPoint[0]}, ${keyboardPoint[1]}. Enter ou espaço para pintar.`;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); stopLife(); cleared=null;
      const stroke={color,eraser,points:[[keyboardPoint[0],keyboardPoint[1],eraser ? ERASER_WIDTH : TOUCH_WIDTH]]};
      strokes.push(stroke); renderStroke(completedCtx,stroke);
      draw(); persist();
    }
  });
  mount.addEventListener('click', click);
  function click(event) {
    const button=event.target.closest('[data-paint]'); if (!button) return;
    const action=button.dataset.paint;
    for (const pointerId of [...active.keys()]) release({pointerId});
    if (action !== 'clear') disarmClear();
    if (action === 'color') { color=button.dataset.color; eraser=false; syncTools(); sound('magic'); }
    if (action === 'eraser') { eraser=!eraser; syncTools(); }
    if (action === 'life') live();
    if (action === 'undo') {
      stopLife();
      // Depois de "Começar de novo", o Desfazer devolve a pintura inteira.
      if (!strokes.length && cleared) { strokes=cleared; cleared=null; }
      else { const last=strokes.pop(); if (last?.g) strokes=strokes.filter(s => s.g !== last.g); }
      rebuildCache(); draw(); persist();
    }
    if (action === 'clear') {
      if (!strokes.length) return;
      // Uma segunda ação evita apagar o desenho por um toque acidental; o toque duplo rápido não confirma.
      if (!button.classList.contains('confirm-clear')) { button.classList.add('confirm-clear'); button.innerHTML=`${icon('repeat')}<span>Apagar meus rabiscos?</span>`; armedAt=performance.now(); clearTimer=setTimeout(disarmClear,4000); return; }
      if (performance.now()-armedAt < 600) return;
      stopLife(); cleared=strokes; strokes=[]; rebuildCache(); draw(); persist();
    }
  }
  // As miniaturas mostram as cores que a criança já pôs em cada desenho.
  function thumbFor(key) {
    if (!thumbCache.has(key)) {
      const list = key === id ? strokes : storedPainting(key), f = coloringScenes[key].frame, sheet = document.createElement('canvas');
      sheet.width = sheet.height = 140;
      const g = list.some(s => !s.eraser) && sheet.getContext('2d');
      if (g) { g.scale(140/f.width,140/f.height); g.translate(-f.x,-f.y); for (const s of list) renderStroke(g,s,1); }
      thumbCache.set(key, g ? sheet.toDataURL() : '');
    }
    return thumbCache.get(key);
  }
  const pendingThumbs = [...picker.querySelectorAll('.shape-option')];
  let thumbTimer = setTimeout(function paintThumbs() {
    const option = pendingThumbs.shift(); if (!option) return;
    const key = option.getAttribute('href').slice(9), art = outlines[key], url = thumbFor(key);
    if (url) option.querySelector('svg').insertAdjacentHTML('beforeend', `<clipPath id="thumb-paint-${key}">${(art.rig || [art]).map(part => `<path d="${part.path}"/>`).join('')}</clipPath><image href="${url}" width="120" height="120" clip-path="url(#thumb-paint-${key})"/>${characterMarkup(art,'outline',`thumb-${key}`)}`);
    thumbTimer = setTimeout(paintThumbs, 0);
  }, 150);
  const observer=new ResizeObserver(resize); observer.observe(holder); resize();
  return () => { pickerPosition = { top:picker.scrollTop, left:picker.scrollLeft }; stopLife(); persist(); thumbCache.delete(id); clearTimeout(thumbTimer); observer.disconnect(); clearTimeout(clearTimer); window.removeEventListener('pointerup',lift); window.removeEventListener('pointercancel',lift); if (frame) cancelAnimationFrame(frame); mount.removeEventListener('click',click); document.body.classList.remove('painting'); onBack?.(); };
}
