const icons = {
  music: '<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',

  palette: '<path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1-4c-1-1 0-3 2-3h2c3 0 4-3 2-6a10 10 0 0 0-9-5Z"/><circle cx="7" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="16" cy="8" r="1"/>',
  pencil: '<path d="m16 3 5 5-12 12-6 1 1-6 12-12ZM13 6l5 5M4 15l5 5"/>',
  eraser: '<path d="m14 3 7 7-10 11H6l-4-4L14 3ZM7 12l7 7m-3 2h10"/>',

  book: '<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z"/><path d="M12 6v14"/>',
  library: '<path d="M4 4v16M8 4v16M12 4v16M16 5l4 14M3 20h18"/>',
  heart: '<path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.9a5.2 5.2 0 0 0 0-7.4Z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  sparkle: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  sound: '<path d="m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m0-6-6 6"/>',
  play: '<path d="m8 4 13 8-13 8V4Z"/>',
  pause: '<path d="M7 4v16M17 4v16"/>',
  moon: '<path d="M20.6 14.1A9 9 0 0 1 9.9 3.4 9 9 0 1 0 20.6 14.1Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="8" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  hand: '<path d="M9 12V4a2 2 0 0 1 4 0v7m0-3a2 2 0 0 1 4 0v3m0-1a2 2 0 0 1 4 0v6c0 4-3 6-7 6h-1c-2 0-4-1-5-3l-4-6a2 2 0 0 1 3-2l2 2"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  repeat: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/>',
  home: '<path d="m3 10 9-7 9 7v11h-7v-7h-4v7H3Z"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>'
};
export function icon(name, className = '') { return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.sparkle}</svg>`; }

const characterFrames = { lion:[0,0], giraffe:[1,0], wolf:[2,0], beast:[3,0], pig:[4,0], dwarf:[0,1], rabbit:[1,1], bird:[2,1], butterfly:[3,1] };
const objectFrames = { basket:[0,0], flower:[1,0], rose:[2,0], heart:[3,0], door:[4,0], window:[0,1], star:[1,1], book:[2,1], cup:[3,1], straw:[4,1], wood:[0,2], brick:[1,2], wind:[2,2], braid:[3,2], wand:[4,2], carriage:[0,3], slipper:[1,3], apple:[2,3], sun:[3,3], plate:[4,3], castle:[0,4], drop:[1,4], bush:[2,4], strawberries:[3,4] };
let spriteSerial = 0;
export function prop(name) {
  if (name === 'fish') return '<svg class="prop-svg watercolor-sprite sprite-fish" viewBox="0 0 1254 1254" aria-hidden="true"><image href="/assets/sprite-fish.webp" width="1254" height="1254"/></svg>';
  if (name === 'pony') return '<svg class="prop-svg watercolor-sprite sprite-pony" viewBox="0 0 1536 1024" aria-hidden="true"><image href="/assets/sprites-pony.webp" width="1536" height="1024"/></svg>';
  const isCharacter = Boolean(characterFrames[name]);
  const [column,row] = (isCharacter ? characterFrames : objectFrames)[name] || objectFrames.star;
  const atlasWidth = isCharacter ? 1536 : 1254;
  const atlasHeight = isCharacter ? 1024 : 1254;
  const cellWidth = atlasWidth / 5;
  const cellHeight = atlasHeight / (isCharacter ? 2 : 5);
  const cropId = `sprite-crop-${++spriteSerial}`;
  return `<svg class="prop-svg watercolor-sprite sprite-${name}" viewBox="0 0 ${cellWidth} ${cellHeight}" aria-hidden="true"><defs><clipPath id="${cropId}"><rect width="${cellWidth}" height="${cellHeight}"/></clipPath></defs><g clip-path="url(#${cropId})"><image href="/assets/sprites-${isCharacter ? 'characters' : 'objects'}.webp" x="${-column*cellWidth}" y="${-row*cellHeight}" width="${atlasWidth}" height="${atlasHeight}"/></g></svg>`;
}
export const objectNames = [...Object.keys(characterFrames), ...Object.keys(objectFrames), 'pony', 'fish'];
