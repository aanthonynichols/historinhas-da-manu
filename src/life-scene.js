import { paintSnapshot, pathBounds, cropSnapshot } from './paint-snapshot.js';

// Painted scenery unfolds from the sheet into a little stage around the drawing.
export function createLivingScene({ canvas, scene, rect, width, height, reducedMotion }) {
  const element = document.createElement('div');
  element.className = `drawing-life-scenery scenery-${scene.kind}`;
  const backdrop = document.createElement('div'); backdrop.className = 'drawing-life-backdrop'; element.append(backdrop);
  const groundHeight = Math.min(118, Math.max(56, height * .11));
  const groundY = height - groundHeight * .42;
  const layers = scene.parts.map((part, index) => {
    const bounds = pathBounds(part.path, part.details);
    const holder = document.createElement('div');
    holder.className = `drawing-life-scenery-part scenery-part-${part.motion}${part.foreground ? ' scenery-ground' : ''}`;
    holder.dataset.scenery = part.id;
    const sheet = paintSnapshot(canvas, part.path, part.details, null, part.fill, 0), image = cropSnapshot(sheet, bounds);
    sheet.width = sheet.height = 0;
    image.className = 'drawing-life-scenery-paint'; holder.append(image); element.append(holder);
    // Keep enlarged contours as vectors: small suns and flowers remain sharp on the iPad Pro.
    const lines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lines.setAttribute('viewBox', `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`);
    lines.setAttribute('preserveAspectRatio', 'none'); lines.classList.add('drawing-life-scenery-lines');
    lines.innerHTML = `<path d="${part.path}"/><path d="${part.details || ''}"/>`;
    holder.append(lines);
    holder.style.transformOrigin = `${((part.pivot?.[0] ?? (bounds.x + bounds.width / 2)) - bounds.x) / bounds.width * 100}% ${((part.pivot?.[1] ?? (bounds.y + bounds.height / 2)) - bounds.y) / bounds.height * 100}%`;
    const from = { x: rect.left + (bounds.x + bounds.width / 2) / 120 * rect.width,
      y: rect.top + (bounds.y + bounds.height / 2) / 120 * rect.height,
      width: bounds.width / 120 * rect.width, height: bounds.height / 120 * rect.height };
    const center = { x: (bounds.x + bounds.width / 2) / 120, y: (bounds.y + bounds.height / 2) / 120 };
    const scale = Math.min(width, height) / 120 * .95;
    let to = { x: center.x * width, y: center.y * height * .85,
      width: bounds.width * scale, height: bounds.height * scale };
    if (part.foreground) to = { x: width / 2, y: height - groundHeight / 2, width: width + 16, height: groundHeight };
    else {
      to.width = Math.min(width * .3, to.width); to.height = to.width * bounds.height / bounds.width;
      if (part.motion === 'sun' || part.motion === 'star') to.y = Math.max(to.height * .65, center.y * height * .5);
      // Parts drawn on the sheet's ground stand in the grass band; in space the low planet keeps floating.
      const grounded = part.grounded ?? (scene.kind !== 'space' && !['sun', 'star', 'cloud', 'glow'].includes(part.motion) && bounds.y + bounds.height >= 92);
      if (grounded) to.y = groundY - to.height / 2 + Math.min(10, to.height * .08);
      to.x = Math.max(to.width * .65 + 8, Math.min(width - to.width * .65 - 8, to.x));
      to.y = Math.max(to.height * .65 + 8, Math.min(height - to.height * .65 - 8, to.y));
    }
    return { part, holder, image, from, to, index };
  });
  function update(elapsed, progress) {
    const reveal = Math.min(1, elapsed / (reducedMotion ? 280 : 700));
    const fade = Math.min(1, Math.max(0, (progress - .89) / .11));
    backdrop.style.opacity = String(reveal * (1 - fade) * .96);
    const unfolded = reducedMotion ? 0 : 1 - Math.pow(1 - Math.min(1, elapsed / 1150), 3);
    for (const layer of layers) {
      const { part, holder, image, from, to, index } = layer;
      const value = key => from[key] + (to[key] - from[key]) * unfolded;
      let x = value('x'), y = value('y'), rotation = 0, sx = 1, sy = 1;
      const phase = elapsed / 1000 + index * .9;
      if (!reducedMotion) {
        if (part.motion === 'cloud') { x += Math.sin(phase * .6) * Math.min(25, width * .025) * unfolded; y += Math.sin(phase * .8) * 3; }
        if (['grass', 'flower', 'sway'].includes(part.motion)) rotation = Math.sin(phase * 1.7) * (part.foreground ? 1 : 5);
        if (part.motion === 'water') { sx = 1 + Math.sin(phase * 1.7) * .035; sy = 1 + Math.cos(phase * 1.3) * .045; }
        if (part.motion === 'bob') y += Math.sin(phase * 2.4) * 6;
        if (part.motion === 'sun' || part.motion === 'star' || part.motion === 'glow') {
          const glow = .5 + Math.sin(phase * 1.6) * .18;
          image.style.filter = `drop-shadow(0 0 ${8 + glow * 12}px rgba(239,199,110,${glow * .44}))`;
          if (part.motion === 'sun') rotation = Math.sin(phase * .7) * 6;
          if (part.motion === 'star') sx = sy = 1 + Math.sin(phase * 1.4) * .07;
        }
      }
      holder.style.width = `${value('width')}px`; holder.style.height = `${value('height')}px`;
      holder.style.transform = `translate3d(${x - value('width') / 2}px,${y - value('height') / 2}px,0) rotate(${rotation}deg) scale(${sx},${sy})`;
      holder.style.opacity = String(reveal * (1 - fade));
    }
  }
  return { element, groundY, update };
}
