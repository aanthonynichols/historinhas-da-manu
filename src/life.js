import { paintSnapshot } from './paint-snapshot.js';
import { createLivingScene } from './life-scene.js';

// The animated creature is a snapshot: the child's canvas is never changed.
// Explicit cleanup stops silently. Natural completion, Escape, resize and hiding the page call onEnd once.
export function playDrawingLife({ canvas, path, details = '', rig = null, scene = null, type = 'butterfly', onEnd, reducedMotion = false, muted = false, caption = '' }) {
  const rect = canvas.getBoundingClientRect();
  const width = window.innerWidth, height = window.innerHeight;
  const size = Math.min(240, Math.max(112, Math.min(width, height) * .23));
  const subject = scene?.frame;
  const start = { x: rect.left + rect.width * (subject ? (subject.x + subject.width / 2) / 120 : .5), y: rect.top + rect.height * (subject ? (subject.y + subject.height / 2) / 120 : .5) };
  const paperScale = subject ? rect.width * subject.width / 120 / size : .94;
  const duration = reducedMotion ? 1800 : 7800;
  const stage = document.createElement('div');
  stage.className = `drawing-life-stage drawing-life-${type}`;
  const scenery = scene ? createLivingScene({ canvas, scene, rect, width, height, reducedMotion }) : null;
  if (scenery) stage.append(scenery.element);
  const groundY = scenery?.groundY ?? height - 22;
  const walkers = ['turtle', 'snail', 'pony', 'cat', 'dog', 'doll', 'princess', 'teddy'];
  const effects = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  // Reduced motion draws no particles, so its effects layer needs no pixels.
  effects.width = reducedMotion ? 0 : Math.round(width * dpr); effects.height = reducedMotion ? 0 : Math.round(height * dpr);
  effects.style.width = `${width}px`; effects.style.height = `${height}px`;
  // Com a memória de canvas do iOS no limite, getContext pode devolver null: a criatura anda sem partículas.
  const fx = effects.getContext('2d');
  fx?.scale(dpr, dpr);
  stage.append(effects);
  const entity = document.createElement('div');
  entity.className = 'drawing-life-creature';
  entity.style.width = entity.style.height = `${size}px`;
  const aura = document.createElement('div'); aura.className = 'drawing-life-aura'; entity.append(aura);
  const model = document.createElement('div'); model.className = 'drawing-life-model'; entity.append(model);
  const bitmap = rig ? null : paintSnapshot(canvas, path, details, subject);
  // Butterfly, bee and snail build their bodies from bitmap and never attach surface.
  const surface = rig || ['butterfly', 'bee', 'snail'].includes(type) ? null : bitmap.cloneNode();
  if (surface) { surface.getContext('2d').drawImage(bitmap, 0, 0); surface.className = 'drawing-life-paint'; }
  const articulated = [];
  if (rig) {
    for (const part of rig) {
      const layer = paintSnapshot(canvas, part.path, part.details, subject);
      layer.className = `drawing-life-articulated rig-${part.motion}`;
      layer.dataset.rig = part.id;
      layer.style.transformOrigin = `${part.pivot[0] / 120 * 100}% ${part.pivot[1] / 120 * 100}%`;
      model.append(layer); articulated.push({ part, layer });
    }
  } else if (type === 'butterfly') {
    for (const side of ['left', 'right']) {
      const wing = bitmap.cloneNode(); wing.getContext('2d').drawImage(bitmap, 0, 0);
      wing.className = `drawing-life-wing drawing-life-wing-${side}`;
      model.append(wing);
    }
    const body = document.createElement('div'); body.className = 'drawing-life-butterfly-body';
    body.innerHTML = '<svg viewBox="0 0 120 120"><path d="M60 51C57 59 58 76 60 82C62 76 63 59 60 51Z" fill="#655542"/><circle cx="60" cy="51" r="2.7" fill="#655542"/><path d="M59 50Q56 39 50 38M61 50Q64 39 70 38" fill="none" stroke="#655542" stroke-width="1.3" stroke-linecap="round"/></svg>';
    model.append(body);
  } else if (type === 'fish') {
    surface.classList.add('drawing-life-fish-body'); model.append(surface);
    const tail = bitmap.cloneNode(); tail.getContext('2d').drawImage(bitmap, 0, 0);
    tail.className = 'drawing-life-fish-tail'; model.append(tail);
  } else if (type === 'flower') {
    surface.classList.add('drawing-life-flower-stem'); model.append(surface);
    const blossom = bitmap.cloneNode(); blossom.getContext('2d').drawImage(bitmap, 0, 0);
    blossom.className = 'drawing-life-flower-blossom'; model.append(blossom);
  } else if (type === 'bee') {
    // Masks match the coloring silhouette; every moving wing keeps its painted pixels.
    const wings = paintedLayer(bitmap, 'drawing-life-bee-wings', 'M0 0H120V49H0Z');
    const body = paintedLayer(bitmap, 'drawing-life-bee-body', 'M97 67C97 92 65 106 42 89C23 75 28 48 51 44C73 39 97 48 97 67Z');
    model.append(wings, body);
  } else if (type === 'bird') {
    model.append(surface);
    model.append(paintedLayer(bitmap, 'drawing-life-bird-wing', 'M41 63Q69 48 74 61Q68 80 48 79Q39 73 41 63Z'));
  } else if (type === 'rocket') {
    const flame = document.createElement('div'); flame.className = 'drawing-life-rocket-flame';
    flame.innerHTML = '<span></span>'; model.append(flame, surface);
  } else if (type === 'kite') {
    surface.classList.add('drawing-life-kite-canopy'); model.append(surface);
    model.append(paintedLayer(bitmap, 'drawing-life-kite-tail', 'M0 85H120V120H0Z'));
  } else if (type === 'turtle') {
    surface.classList.add('drawing-life-turtle-shell');
    model.append(paintedLayer(bitmap, 'drawing-life-turtle-foot drawing-life-turtle-foot-back', 'M0 87H60V120H0Z'));
    model.append(paintedLayer(bitmap, 'drawing-life-turtle-foot drawing-life-turtle-foot-front', 'M60 87H120V120H60Z'));
    model.append(surface);
  } else if (type === 'snail') {
    const body = paintedLayer(bitmap, 'drawing-life-snail-body', 'M18 75Q13 73 13 80C16 98 72 104 99 91C111 85 111 70 106 64Q102 60 99 65L93 79L68 75Z');
    const shell = paintedLayer(bitmap, 'drawing-life-snail-shell', 'M77 56A29 29 0 1 1 19 56A29 29 0 1 1 77 56Z');
    const antennae = paintedLayer(bitmap, 'drawing-life-snail-antennae', 'M88 42H120V72H88Z');
    model.append(body, shell, antennae);
  } else model.append(surface);
  stage.append(entity);
  const close = document.createElement('button'); close.type = 'button';
  close.className = 'drawing-life-close'; close.textContent = 'Voltar a pintar';
  close.setAttribute('aria-label', 'Encerrar a animação e voltar a pintar');
  // O life-button da folha continua focado e já diz «Voltar a pintar»: é a parada do teclado. Este botão fica para o toque e o VoiceOver.
  close.tabIndex = -1;
  close.addEventListener('click', finish); stage.append(close);
  const text = caption || canvas.closest('.paint-paper')?.querySelector('.alive-caption')?.textContent || '';
  const label = document.createElement('p'); label.className = 'drawing-life-caption'; label.textContent = text;
  if (text) stage.append(label);
  const groundShadow = document.createElement('div'); groundShadow.className = 'drawing-life-ground-shadow';
  // Only the full animation positions the shadow; WebKit paints an unplaced blurred one as a black square.
  if (!reducedMotion && (type === 'ball' || walkers.includes(type) || type === 'castle')) stage.append(groundShadow);
  // The live .alive-caption on the sheet keeps announcing the phrase; only the close button is exposed here.
  for (const decor of [scenery?.element, effects, entity, groundShadow, label]) decor?.setAttribute('aria-hidden', 'true');
  // The stage takes every touch so nothing reaches the hidden Ateliê; it only ends by the button, Escape or navigation.
  stage.addEventListener('pointerdown', event => { if (!event.target.closest('.drawing-life-close')) event.preventDefault(); });
  let frame = 0, stopped = false, finished = false, last = 0, emission = 0;
  const particles = [], audio = muted ? null : makeAudio(type, scene?.kind, reducedMotion);
  const points = route(type, start, width, height, size, groundY);
  const began = performance.now();
  function cleanup() {
    if (stopped) return;
    stopped = true; cancelAnimationFrame(frame); document.removeEventListener('keydown', keydown); window.removeEventListener('resize', finish);
    document.removeEventListener('visibilitychange', hidden); window.removeEventListener('pagehide', finish);
    audio?.stop(); stage.remove(); particles.length = 0;
    // iOS returns canvas memory only after garbage collection; empty buffers release it now.
    for (const layer of [...stage.querySelectorAll('canvas'), bitmap]) if (layer) layer.width = layer.height = 0;
  }
  function finish() { if (finished || stopped) return; finished = true; cleanup(); onEnd?.(); }
  function keydown(event) { if (event.key === 'Escape') finish(); }
  function hidden() { if (document.hidden) finish(); }
  document.addEventListener('keydown', keydown);
  window.addEventListener('resize', finish, { once: true });
  document.addEventListener('visibilitychange', hidden); window.addEventListener('pagehide', finish);
  // Um erro num quadro encerra a animação em vez de deixar o palco parado sobre o Ateliê.
  function tick(now) { try { step(now); } catch (error) { finish(); throw error; } }
  function step(now) {
    if (stopped) return;
    const elapsed = now - began, t = Math.min(1, elapsed / duration);
    const dt = Math.min(40, last ? now - last : 16); last = now;
    fx?.clearRect(0, 0, width, height);
    scenery?.update(elapsed, t);
    if (reducedMotion) {
      const reveal = Math.min(1, elapsed / 350), fade = Math.max(0, (elapsed - 1300) / 500);
      entity.style.transform = `translate3d(${start.x - size / 2}px,${start.y - size / 2}px,0) scale(${paperScale * (.97 + reveal * .03)})`;
      entity.style.opacity = String(reveal * (1 - fade));
      model.style.transform = 'none';
    } else {
      const p = sample(points, t);
      const floor = groundY - size * .40;
      if (type === 'ball') p.y = Math.min(floor, p.y);
      if (walkers.includes(type)) {
        // First lift out of the sheet, then land gently before walking on the painted grass.
        if (t < .18) { const u = t / .18; p.x = start.x + (width * .18 - start.x) * u; p.y = start.y + (floor - start.y) * u * u; }
        else p.y = floor - (['pony', 'cat', 'dog'].includes(type) ? Math.abs(Math.sin(elapsed / 155)) * 2 : ['doll', 'princess', 'teddy'].includes(type) ? Math.abs(Math.sin(elapsed / 260)) * 8 : 0);
      }
      const ahead = sample(points, Math.min(1, t + .006));
      const heading = Math.atan2(ahead.y - p.y, ahead.x - p.x);
      const lift = Math.min(1, t / .10), land = type === 'ball' ? ballContact(t) : 0;
      const depth = type === 'butterfly' ? 1 + Math.sin(t * Math.PI * 4) * .11 : type === 'fish' ? 1 + Math.sin(t * Math.PI * 3) * .07 : 1;
      const scale = (paperScale + lift * (1 - paperScale)) * depth;
      let rotation = 0, sx = 1, sy = 1;
      if (type === 'butterfly') rotation = Math.sin(t * 24) * 9 + Math.cos(heading) * 18;
      if (type === 'fish') { rotation = Math.sin(elapsed / 300) * 4 + Math.sin(heading) * 12; sx = ahead.x > p.x ? -1 : 1; }
      if (type === 'ball') { rotation = t * 1050; sx = 1 + land * .21; sy = 1 - land * .22; }
      if (type === 'flower') rotation = Math.sin(elapsed / 480) * 13;
      if (type === 'star') rotation = t * 330 + Math.sin(t * 14) * 10;
      if (type === 'bee') { rotation = Math.sin(elapsed / 270) * 6 + Math.sin(heading) * 14; sx = ahead.x < p.x ? -1 : 1; }
      if (type === 'bird') { rotation = Math.sin(heading) * 17; sx = ahead.x < p.x ? -1 : 1; }
      if (type === 'rocket') rotation = Math.cos(heading) * 20 + Math.sin(elapsed / 180) * 2;
      if (type === 'kite') rotation = Math.sin(elapsed / 430) * 15 + Math.sin(elapsed / 1100) * 7;
      if (type === 'turtle') rotation = Math.sin(elapsed / 180) * 2;
      if (type === 'snail') rotation = Math.sin(elapsed / 650) * 1.5;
      if (type === 'heart') { rotation = Math.sin(elapsed / 550) * 9; sx = sy = 1 + Math.pow(Math.max(0, Math.sin(elapsed / 150)), 6) * .09; }
      if (['pony', 'cat', 'dog'].includes(type)) rotation = Math.sin(elapsed / 310) * 1.3;
      if (['doll', 'princess', 'teddy'].includes(type)) rotation = Math.sin(elapsed / 420) * 3;
      if (type === 'baby') rotation = Math.sin(elapsed / 550) * 7;
      if (type === 'castle') rotation = Math.sin(elapsed / 1000) * .6;
      entity.style.transform = `translate3d(${p.x - size / 2}px,${p.y - size / 2}px,0) scale(${scale})`;
      model.style.transform = type === 'ball' ? `scale(${sx},${sy}) rotate(${rotation}deg)` : `rotate(${rotation}deg) scale(${sx},${sy})`;
      entity.style.opacity = String(Math.min(1, elapsed / 180) * (type === 'castle' ? Math.min(1, (1 - t) / .12) : 1));
      aura.style.opacity = String(type === 'star' ? .64 + Math.sin(elapsed / 250) * .15 : .22);
      if (type === 'butterfly') {
        const flap = 16 + (Math.sin(elapsed / 75) + 1) * 31;
        model.querySelector('.drawing-life-wing-left').style.transform = `rotateY(${flap}deg)`;
        model.querySelector('.drawing-life-wing-right').style.transform = `rotateY(${-flap}deg)`;
      }
      if (type === 'fish') model.querySelector('.drawing-life-fish-tail').style.transform = `rotateY(${Math.sin(elapsed / 105) * 36}deg) rotate(${Math.sin(elapsed / 105) * 5}deg)`;
      if (type === 'flower') model.querySelector('.drawing-life-flower-blossom').style.transform = `scale(${.76 + Math.min(1, t / .17) * .24}) rotate(${Math.sin(elapsed / 380) * 5}deg)`;
      if (type === 'bee') model.querySelector('.drawing-life-bee-wings').style.transform = `rotateX(${25 + Math.sin(elapsed / 28) * 47}deg) scaleY(${.92 + Math.sin(elapsed / 28) * .12})`;
      if (type === 'bird') model.querySelector('.drawing-life-bird-wing').style.transform = `rotateX(${Math.sin(elapsed / 105) * 52}deg) rotate(${Math.sin(elapsed / 105) * -17}deg)`;
      if (type === 'rocket') model.querySelector('.drawing-life-rocket-flame').style.transform = `scale(${.82 + Math.sin(elapsed / 55) * .09},${.82 + Math.min(1, t / .24) * .45 + Math.sin(elapsed / 40) * .13})`;
      if (type === 'kite') model.querySelector('.drawing-life-kite-tail').style.transform = `rotate(${Math.sin(elapsed / 260) * 12}deg)`;
      if (type === 'turtle') {
        model.querySelector('.drawing-life-turtle-foot-back').style.transform = `rotate(${Math.sin(elapsed / 170) * 12}deg)`;
        model.querySelector('.drawing-life-turtle-foot-front').style.transform = `rotate(${-Math.sin(elapsed / 170) * 12}deg)`;
      }
      if (type === 'snail') {
        model.querySelector('.drawing-life-snail-body').style.transform = `scale(${1 + Math.sin(elapsed / 460) * .035},${1 - Math.sin(elapsed / 460) * .025})`;
        model.querySelector('.drawing-life-snail-shell').style.transform = `translateY(${Math.sin(elapsed / 650) * 1.5}px) rotate(${Math.sin(elapsed / 650) * 2}deg)`;
        model.querySelector('.drawing-life-snail-antennae').style.transform = `rotate(${Math.sin(elapsed / 390) * 7}deg)`;
      }
      for (const { part, layer } of articulated) {
        const phase = elapsed / 240;
        let angle = 0, y = 0, stretch = 1;
        if (part.motion === 'step' && t >= .16) {
          const offset = ((part.id.includes('front') ? 1 : 0) + (part.id.includes('far') ? 1 : 0)) * Math.PI;
          angle = Math.sin(elapsed / 155 + offset) * 11;
        }
        if (part.motion === 'wave') angle = Math.sin(phase) * (part.id.includes('esquerdo') ? -7 : 9);
        if (part.motion === 'wag') angle = Math.sin(elapsed / (type === 'dog' ? 140 : 370)) * (type === 'pony' ? 8 : 12);
        if (part.motion === 'sway') angle = Math.sin(elapsed / 410) * (type === 'castle' ? 1.6 : 3);
        if (part.motion === 'bob') angle = Math.sin(elapsed / 530) * 2;
        if (part.motion === 'glow') { stretch = 1 + Math.sin(elapsed / 570) * .025; layer.style.filter = `drop-shadow(0 0 ${5 + Math.sin(elapsed / 570) * 2}px rgba(238,194,100,.5))`; }
        layer.style.transform = `translateY(${y}px) rotate(${angle}deg) scale(${stretch})`;
      }
      if (fx && type === 'kite') drawKiteString(fx, p, size, elapsed, rotation);
      if (type === 'ball' || walkers.includes(type) || type === 'castle') {
        const separation = Math.max(0, floor - p.y);
        groundShadow.style.transform = `translate3d(${p.x - size * .27}px,${groundY - 4}px,0) scale(${Math.max(.25, 1 - separation / height)})`;
        groundShadow.style.width = `${size * .54}px`;
        groundShadow.style.opacity = String(.08 + .15 * (1 - separation / height));
      }
      if (fx) {
        emission += dt;
        if (emission > (type === 'rocket' ? 30 : type === 'star' ? 25 : type === 'fish' ? 130 : ['turtle', 'snail'].includes(type) ? 210 : 70) && t < .94) {
          emission = 0;
          particles.push(particle(type, p, size, heading));
        }
        // Paper-lift dust appears around the drawing, never hiding the painting.
        if (t < .12 && particles.length < 22) particles.push(particle('lift', start, size, -Math.PI / 2));
        for (let i = particles.length - 1; i >= 0; i--) {
          const dot = particles[i]; dot.age += dt;
          if (dot.age > dot.life) { particles.splice(i, 1); continue; }
          dot.x += dot.vx * dt / 1000; dot.y += dot.vy * dt / 1000;
          drawParticle(fx, dot);
        }
      }
    }
    if (t >= 1) finish(); else frame = requestAnimationFrame(tick);
  }
  // O palco só entra no documento depois de toda a preparação: um erro antes daqui não deixa palco órfão,
  // e o catch de coloring.js devolve o Ateliê ao normal.
  document.body.append(stage);
  frame = requestAnimationFrame(tick);
  return cleanup;
}

function paintedLayer(bitmap, className, mask) {
  const layer = document.createElement('canvas'); layer.width = layer.height = bitmap.width;
  layer.className = className;
  const ctx = layer.getContext('2d'); ctx.scale(bitmap.width / 120, bitmap.height / 120);
  ctx.clip(new Path2D(mask)); ctx.drawImage(bitmap, 0, 0, 120, 120);
  return layer;
}
function drawKiteString(ctx, p, size, elapsed, angle) {
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(angle * Math.PI / 180);
  ctx.strokeStyle = 'rgba(129,123,104,.48)'; ctx.lineWidth = 1.2; ctx.lineCap = 'round';
  const sway = Math.sin(elapsed / 460) * size * .18;
  ctx.beginPath(); ctx.moveTo(0, size * .4); ctx.bezierCurveTo(sway, size * .6, -sway * .8, size * .83, sway * .65, size * 1.02); ctx.stroke(); ctx.restore();
}

function route(type, origin, w, h, size, groundY) {
  const off = size * 1.1, floor = groundY - size * .40;
  const point = (t, x, y) => ({ t, x, y });
  const start = point(0, origin.x, origin.y);
  if (['turtle', 'snail', 'pony', 'cat', 'dog', 'doll', 'princess', 'teddy'].includes(type)) return [start, point(.18, w * .18, floor), point(.38, w * .34, floor), point(.59, w * .57, floor), point(.78, w * .83, floor), point(1, w + off, floor)];
  if (type === 'baby') return [start, point(.18, w * .52, h * .48), point(.40, w * .28, h * .42), point(.62, w * .55, h * .35), point(.82, w * .81, h * .40), point(1, w + off, h * .33)];
  if (type === 'castle') return [start, point(.23, w * .50, floor), point(.65, w * .50, floor), point(1, w * .50, floor)];
  if (type === 'bee') return [start, point(.13, w * .54, h * .34), point(.29, w * .17, h * .25), point(.44, w * .34, h * .58), point(.59, w * .60, h * .43), point(.74, w * .75, h * .21), point(1, w + off, h * .38)];
  if (type === 'bird') return [start, point(.13, w * .54, h * .34), point(.31, w * .14, h * .25), point(.48, w * .38, h * .53), point(.66, w * .68, h * .28), point(.82, w * .89, h * .20), point(1, w + off, h * .12)];
  if (type === 'rocket') return [start, point(.13, origin.x - size * .12, origin.y - size * .20), point(.32, w * .48, h * .48), point(.53, w * .35, h * .30), point(.75, w * .63, h * .14), point(1, w * .73, -off)];
  if (type === 'kite') return [start, point(.15, w * .58, h * .38), point(.32, w * .22, h * .30), point(.51, w * .43, h * .49), point(.68, w * .77, h * .23), point(.82, w * .80, h * .26), point(1, w + off, h * .21)];
  if (type === 'ball') return [start, point(.13, w * .52, h * .3), point(.27, w * .37, floor), point(.41, w * .22, h * .39), point(.54, w * .30, floor), point(.66, w * .5, h * .56), point(.77, w * .69, floor), point(.85, w * .84, floor - size * .42), point(.91, w * .97, floor), point(1, w + off, floor)];
  if (type === 'fish') return [start, point(.12, w * .61, h * .39), point(.30, w * .16, h * .32), point(.46, w * .28, h * .68), point(.61, w * .60, h * .60), point(.77, w * .81, h * .29), point(1, w + off, h * .44)];
  if (type === 'flower') return [start, point(.16, w * .56, h * .40), point(.34, w * .25, h * .33), point(.52, w * .40, h * .58), point(.72, w * .77, h * .32), point(1, w * .92, -off)];
  if (type === 'star') return [start, point(.18, w * .5, h * .40), point(.37, w * .18, h * .26), point(.53, w * .35, h * .65), point(.72, w * .7, h * .38), point(1, w + off, -off)];
  if (type === 'heart') return [start, point(.16, w * .58, h * .50), point(.34, w * .22, h * .57), point(.54, w * .44, h * .31), point(.73, w * .75, h * .25), point(1, w * .66, -off)];
  return [start, point(.11, w * .63, h * .43), point(.26, w * .18, h * .28), point(.42, w * .34, h * .67), point(.58, w * .73, h * .57), point(.72, w * .64, h * .20), point(.84, w * .86, h * .32), point(1, w + off, h * .14)];
}

// A smooth cubic path keeps travel continuous through the whole viewport.
function sample(points, t) {
  let i = points.findIndex((p, index) => index < points.length - 1 && t <= points[index + 1].t);
  if (i < 0) return points.at(-1);
  const a = points[i], b = points[i + 1], before = points[Math.max(0, i - 1)], after = points[Math.min(points.length - 1, i + 2)];
  const u = Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t))), u2 = u * u, u3 = u2 * u;
  const value = axis => {
    const m1 = (b[axis] - before[axis]) / (b.t - before.t) * (b.t - a.t);
    const m2 = (after[axis] - a[axis]) / (after.t - a.t) * (b.t - a.t);
    return (2 * u3 - 3 * u2 + 1) * a[axis] + (u3 - 2 * u2 + u) * m1 + (-2 * u3 + 3 * u2) * b[axis] + (u3 - u2) * m2;
  };
  return { x: value('x'), y: value('y') };
}
function ballContact(t) { return Math.max(...[.27, .54, .77, .91].map(hit => Math.exp(-(((t - hit) / .013) ** 2)))); }
function particle(type, p, size, heading) {
  const bubble = type === 'fish';
  if (type === 'rocket') return { type, x: p.x + (Math.random() - .5) * size * .09, y: p.y + size * .4, vx: (Math.random() - .5) * 24, vy: 50 + Math.random() * 40, size: 3 + Math.random() * 5, age: 0, life: 500 + Math.random() * 450, color: Math.random() > .55 ? '#efb96e' : '#f3d69d', angle: Math.random() * Math.PI };

  return { type, x: p.x - Math.cos(heading) * size * .25 + (Math.random() - .5) * size * .35, y: p.y - Math.sin(heading) * size * .25 + (Math.random() - .5) * size * .3,
    vx: (Math.random() - .5) * 26, vy: bubble ? -35 - Math.random() * 25 : -10 - Math.random() * 24,
    size: bubble ? 3 + Math.random() * 6 : type === 'star' ? 2 + Math.random() * 4 : 1.6 + Math.random() * 3,
    age: 0, life: bubble ? 1400 : type === 'lift' ? 950 : 800 + Math.random() * 400,
    color: type === 'heart' ? '#d892a9' : ['flower', 'turtle', 'snail'].includes(type) ? '#b3bc8c' : type === 'bird' ? '#a8c6d4' : type === 'kite' ? '#b9acd4' : type === 'fish' ? '#9bc9d5' : '#dfbc78', angle: Math.random() * Math.PI };
}
function drawParticle(ctx, p) {
  const progress = p.age / p.life, opacity = Math.sin(Math.PI * progress) * .72;
  ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = opacity;
  if (p.type === 'fish') {
    ctx.strokeStyle = p.color; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, p.size * (.65 + progress * .5), 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-p.size * .23, -p.size * .25, p.size * .2, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.rotate(p.angle + progress * .4); ctx.fillStyle = p.color;
    const r = p.size * (1 - progress * .5); ctx.beginPath();
    ctx.moveTo(0, -r * 1.5); ctx.quadraticCurveTo(r * .15, -r * .15, r, 0); ctx.quadraticCurveTo(r * .15, r * .15, 0, r * 1.5); ctx.quadraticCurveTo(-r * .15, r * .15, -r, 0); ctx.quadraticCurveTo(-r * .15, -r * .15, 0, -r * 1.5); ctx.fill();
  }
  ctx.restore();
}

function makeAudio(type, environment, short = false) {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return null;
  let ctx;
  try { ctx = new Context(); } catch { return null; }
  let ended = false;
  // Acima da música de fundo (volume × 0,5) e abaixo da voz: o pico medido fica perto de 0,12, longe de clipar.
  const master = ctx.createGain(); master.gain.value = .30; master.connect(ctx.destination);
  const notes = { doll: [523,659,784,659,880,784,1047,784], princess: [587,740,880,1175,988,880,1319,1175], baby: [392,494,587,494,440,587,659,523], teddy: [330,440,523,440,392,523,659,523], pony: [392,523,659,587,523,784,659,880], cat: [440,554,659,554,494,740,659,880], dog: [349,440,523,440,587,523,659,784], castle: [523,784,1047,1319,1175,1047,1568,1319], bee: [659, 784, 988, 880, 784, 1047, 988, 1319], bird: [1047, 1319, 1568, 1319, 1175, 1568, 1760, 1568], rocket: [262, 392, 523, 659, 784, 1047, 1175, 1568], kite: [440, 659, 880, 784, 659, 988, 880, 1175], turtle: [294, 349, 440, 349, 294, 392, 440, 523], snail: [262, 330, 392, 330, 294, 349, 392, 523], butterfly: [784, 988, 1175, 1047, 880, 1319, 1175, 1568], fish: [392, 523, 659, 587, 440, 659, 784, 523], flower: [523, 659, 784, 1047, 784, 659, 880, 1047], star: [784, 1175, 1568, 1760, 1568, 1319, 1976, 2349], heart: [392, 494, 587, 784, 659, 587, 494, 784], ball: [262, 330, 392, 523, 392, 330, 523, 659] }[type] || [523, 659, 784];
  const voices = [];
  function tone(freq, at, length, volume = .24, waveform = 'sine') {
    if (ended) return;
    const osc = ctx.createOscillator(), gain = ctx.createGain(); osc.type = waveform;
    osc.frequency.setValueAtTime(freq, at); gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(volume, at + .035); gain.gain.exponentialRampToValueAtTime(.0001, at + length);
    osc.connect(gain); gain.connect(master); osc.start(at); osc.stop(at + length + .03); voices.push(osc);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); };
  }
  const schedule = () => {
    if (ended) return;
    const at = ctx.currentTime + .03;
    // The reduced stage closes the context at 1.8 s, so its phrase must fade out by about 1.5 s.
    if (short) { notes.slice(0, 3).forEach((note, i) => { tone(note, at + i * .45, .5); tone(note * 2, at + i * .45 + .055, .32, .045); }); tone(notes[0], at + .9, .5, .12); return; }
    notes.forEach((note, i) => { tone(note, at + i * .82, .65); tone(note * 2, at + i * .82 + .055, .38, .045); });
    tone(notes[0] / 2, at, 1.25, .18, 'triangle');
    const glide = (from, to, delay, length, volume, waveform = 'sine') => {
      const osc = ctx.createOscillator(), gain = ctx.createGain(); osc.type = waveform;
      const when = at + delay; osc.frequency.setValueAtTime(from, when); osc.frequency.exponentialRampToValueAtTime(to, when + length);
      gain.gain.setValueAtTime(.0001, when); gain.gain.linearRampToValueAtTime(volume, when + Math.min(.1, length / 3)); gain.gain.exponentialRampToValueAtTime(.0001, when + length);
      osc.connect(gain); gain.connect(master); osc.start(when); osc.stop(when + length + .02); voices.push(osc); osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    };
    if (environment === 'underwater') [.2,1.3,2.5,3.8,5.1,6.4].forEach(delay => glide(360,710,delay,.28,.035));
    if (type === 'pony') [1.5,2.1,2.7,3.3,3.9,4.5,5.1,5.7,6.3,6.9].forEach(delay => { tone(155,at+delay,.1,.10,'triangle'); tone(190,at+delay+.14,.09,.08,'triangle'); });
    if (['cat','dog','teddy','doll','princess'].includes(type)) [1.6,2.3,3,3.7,4.4,5.1,5.8,6.5].forEach((delay,i) => tone(i%2?196:165,at+delay,.13,.045,'triangle'));
    if (type === 'baby') [.5,2.7,4.9].forEach(delay => { glide(440,587,delay,.4,.04); glide(587,494,delay+.4,.5,.035); });
    if (type === 'castle') [1.4,3.8,5.8].forEach(delay => [1047,1319,1568].forEach((note,i) => tone(note,at+delay+i*.12,.5,.10)));
    if (type === 'bee') [0, 1.8, 3.6, 5.4].forEach(delay => glide(175, 220, delay, 1.1, .055, 'triangle'));
    if (type === 'bird') [0.2, 1.5, 3, 4.5, 6].forEach(delay => { glide(1100, 1700, delay, .16, .15); glide(1650, 1200, delay + .18, .22, .10); });
    if (type === 'rocket') [0.3, 2.2, 4.1, 5.8].forEach(delay => glide(130, 420, delay, 1.15, .055, 'triangle'));
    if (type === 'kite') [0.1, 2.1, 4.1].forEach(delay => { glide(440, 494, delay, 1.6, .045); glide(659, 587, delay + .2, 1.4, .035); });
    if (type === 'turtle') [1.5, 2.6, 3.7, 4.8, 5.9, 7].forEach((delay, i) => tone(i % 2 ? 196 : 147, at + delay, .16, .10, 'triangle'));
    if (type === 'snail') [1.2, 3.2, 5.2].forEach(delay => glide(294, 330, delay, .75, .06));
    if (type === 'ball') [.27, .54, .77, .91].forEach((fraction, i) => {
      const bounce = at + fraction * 7.8, osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.frequency.setValueAtTime(150 + i * 22, bounce); osc.frequency.exponentialRampToValueAtTime(65, bounce + .16);
      gain.gain.setValueAtTime(.35, bounce); gain.gain.exponentialRampToValueAtTime(.0001, bounce + .19);
      osc.connect(gain); gain.connect(master); osc.start(bounce); osc.stop(bounce + .2); voices.push(osc); osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    });
  };
  if (ctx.state === 'suspended') ctx.resume().then(schedule).catch(() => {}); else schedule();
  return { stop() { if (ended) return; ended = true; voices.forEach(voice => { try { voice.stop(); } catch { /* already ended */ } }); master.disconnect(); ctx.close().catch(() => {}); } };
}
