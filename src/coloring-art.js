const ink = '#817b68';
const line = (path, details, mask = '') => `<g${mask ? ` mask="url(#${mask})"` : ''}><path d="${path}" fill="none" stroke="${ink}" stroke-width="1.3" stroke-linejoin="round"/><path d="${details || ''}" fill="none" stroke="${ink}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g>`;

export function characterMarkup(shape, mode = 'thumb', prefix = 'character') {
  const parts = shape.rig || [{ path: shape.path, details: shape.details }];
  if (mode !== 'outline') return parts.map(part => `<path d="${part.path}" fill="${mode === 'thumb' ? '#f2dec0' : '#fffefa'}"${mode === 'thumb' ? ' stroke="#a98c64" stroke-width="1.6" stroke-linejoin="round"' : ''}/>${mode === 'thumb' ? `<path d="${part.details || ''}" fill="none" stroke="#a98c64" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`).join('');
  return parts.map((part, index) => {
    // Hidden contours stay hidden behind the next component, without covering any paint.
    const mask = `${prefix}-${index}`;
    const front = parts.slice(index + 1);
    const definition = front.length ? `<defs><mask id="${mask}" maskUnits="userSpaceOnUse" x="-2" y="-2" width="124" height="124"><rect x="-2" y="-2" width="124" height="124" fill="white"/>${front.map(next => `<path d="${next.path}" fill="black"/>`).join('')}</mask></defs>` : '';
    return definition + line(part.path, part.details, front.length ? mask : '');
  }).join('');
}

export function sceneMarkup(shape, scene, mode) {
  const { frame } = scene;
  const transform = `translate(${frame.x} ${frame.y}) scale(${frame.width / 120} ${frame.height / 120})`;
  const scenery = scene.parts.map(part => mode === 'outline' ? line(part.path, part.details) : `<path d="${part.path}" fill="${part.fill || '#fffefa'}"/>`).join('');
  const foreground = scene.parts.filter(part => part.foreground);
  if (mode === 'background') return scenery + `<g transform="${transform}">${characterMarkup(shape, 'background')}</g>`;
  const mask = 'scenery-behind-character';
  return `<defs><mask id="${mask}" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><rect width="120" height="120" fill="white"/><g transform="${transform}"><path d="${shape.path}" fill="black"/></g></mask></defs><g mask="url(#${mask})">${scenery}</g><g transform="${transform}">${characterMarkup(shape, 'outline', 'painting-character')}</g>${foreground.map(part => line(part.path, part.details)).join('')}`;
}
