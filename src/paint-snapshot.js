// Every living layer is a copy. Neither animation nor cropping edits the child's canvas.
// A whole-sheet copy is later cropped into small parts and enlarged, so it keeps the source resolution.
export function paintSnapshot(source, path, details = '', frame = null, fill = '#fffefa', strokeWidth = 1.05, resolution = frame ? 4 : Math.max(4, source.width / 120)) {
  const target = document.createElement('canvas'); target.width = target.height = Math.round(120 * resolution);
  const k = target.width / 120, ctx = target.getContext('2d'); ctx.scale(k, k);
  const shape = new Path2D(path);
  ctx.save(); ctx.clip(shape); ctx.fillStyle = fill; ctx.fillRect(0, 0, 120, 120);
  if (frame) {
    ctx.drawImage(source, frame.x / 120 * source.width, frame.y / 120 * source.height,
      frame.width / 120 * source.width, frame.height / 120 * source.height, 0, 0, 120, 120);
  } else ctx.drawImage(source, 0, 0, 120, 120);
  const sheen = ctx.createLinearGradient(18, 15, 100, 110);
  sheen.addColorStop(0, 'rgba(255,255,255,.12)'); sheen.addColorStop(.5, 'rgba(255,255,255,0)'); sheen.addColorStop(1, 'rgba(112,83,49,.04)');
  ctx.fillStyle = sheen; ctx.fillRect(0, 0, 120, 120); ctx.restore();
  if (strokeWidth > 0) {
    ctx.strokeStyle = '#817b68'; ctx.lineWidth = strokeWidth; ctx.lineCap = ctx.lineJoin = 'round'; ctx.stroke(shape);
    if (details) { ctx.lineWidth = strokeWidth * .95; ctx.stroke(new Path2D(details)); }
  }
  return target;
}

export function pathBounds(path, details = '') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:fixed;width:120px;height:120px;visibility:hidden;pointer-events:none';
  const drawing = document.createElementNS(svg.namespaceURI, 'path');
  drawing.setAttribute('d', `${path} ${details}`); svg.append(drawing); document.body.append(svg);
  const box = drawing.getBBox(); svg.remove();
  const x = Math.max(0, box.x - 2), y = Math.max(0, box.y - 2);
  return { x, y, width: Math.min(120 - x, Math.max(1, box.width + 4)), height: Math.min(120 - y, Math.max(1, box.height + 4)) };
}

export function cropSnapshot(bitmap, bounds) {
  const target = document.createElement('canvas'), k = bitmap.width / 120;
  target.width = Math.max(1, Math.ceil(bounds.width * k)); target.height = Math.max(1, Math.ceil(bounds.height * k));
  target.getContext('2d').drawImage(bitmap, bounds.x * k, bounds.y * k, bounds.width * k, bounds.height * k, 0, 0, target.width, target.height);
  return target;
}
