const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const mainSizes = {
  pony:[172,139], giraffe:[137,178], bird:[112,110],
  lion:[136,144], beast:[136,144], pig:[136,144], rabbit:[136,144], wolf:[136,144]
};

export function imageFrame(width, height, imageWidth = 1536, imageHeight = 1024) {
  const scale = Math.min(width / imageWidth, height / imageHeight);
  const w = imageWidth * scale, h = imageHeight * scale;
  return { x:(width - w) / 2, y:(height - h) / 2, width:w, height:h };
}

export function spritePosition(point, size, frame, extraSpace = 0) {
  // Reserve room for rotation and growth, rather than clipping a moving sprite.
  const marginX = Math.min(frame.width / 2, size[0] * .7 + 10);
  const marginY = Math.min(frame.height / 2, size[1] * .7 + 10 + extraSpace);
  return {
    x:clamp(point[0] / 100 * frame.width, marginX, frame.width - marginX),
    y:clamp(point[1] / 100 * frame.height, marginY, frame.height - marginY),
    marginX, marginY
  };
}

function sizeSprite(element, base, scale, minimum) {
  const factor = Math.max(scale, minimum / base[0], minimum / base[1]);
  const size = base.map(value => value * factor);
  element.style.setProperty('width', `${size[0].toFixed(2)}px`, 'important');
  element.style.setProperty('height', `${size[1].toFixed(2)}px`, 'important');
  return size;
}

function motionRoom(element, point, size, frame) {
  const left = Math.max(0, point.x - size[0] * .7 - 8);
  const right = Math.max(0, frame.width - point.x - size[0] * .7 - 8);
  const top = Math.max(0, point.y - size[1] * .7 - 8);
  const bottom = Math.max(0, frame.height - point.y - size[1] * .7 - 8);
  const values = {
    '--move-left':-Math.min(60,left), '--move-right':Math.min(80,right),
    '--move-up':-Math.min(90,top), '--move-down':Math.min(18,bottom),
    '--float-x':Math.min(18,right), '--float-y':-Math.min(11,top),
    '--hop-y':-Math.min(25,top), '--roll-x':right >= 16 ? Math.min(55,right) : -Math.min(55,left),
    '--rise-up':-Math.min(24,top), '--rise-down':Math.min(13,bottom),
    '--extra-left':-Math.min(15,left), '--extra-right':Math.min(30,right),
    '--extra-up':-Math.min(35,top)
  };
  for (const [name,value] of Object.entries(values)) element.style.setProperty(name, `${value.toFixed(2)}px`);
}

function placeSprite(element, anchor, size, frame, extraSpace = 0) {
  const point = spritePosition(anchor, size, frame, extraSpace);
  if (element.classList.contains('interactive-object')) {
    element.style.setProperty('--object-x', `${point.x.toFixed(2)}px`);
    element.style.setProperty('--object-y', `${point.y.toFixed(2)}px`);
  } else {
    element.style.left = `${point.x.toFixed(2)}px`;
    element.style.top = `${point.y.toFixed(2)}px`;
  }
  motionRoom(element, point, size, frame);
  return point;
}

export function updateSceneBurst(scene, point = null) {
  const field = scene.querySelector('.scene-playfield');
  const object = field.querySelector('.interactive-object');
  const x = point ? point[0] : parseFloat(object.style.getPropertyValue('--object-x')) || field.clientWidth / 2;
  const y = point ? point[1] : parseFloat(object.style.getPropertyValue('--object-y')) || field.clientHeight / 2;
  field.style.setProperty('--burst-x', `${x}px`);
  field.style.setProperty('--burst-y', `${y}px`);
  field.style.setProperty('--burst-base', `${point ? y : y + object.offsetHeight * .4}px`);
  const room = Math.max(0, Math.min(x,y,field.clientWidth - x,field.clientHeight - y) - 18);
  return Math.min(113,room);
}

export function moveSceneObject(scene, x, y) {
  const field = scene.querySelector('.scene-playfield');
  const object = field.querySelector('.interactive-object');
  const frame = { width:field.clientWidth, height:field.clientHeight };
  const size = [object.offsetWidth,object.offsetHeight];
  const point = placeSprite(object, [x / frame.width * 100,y / frame.height * 100], size, frame);
  object.dataset.dragX = String(point.x / frame.width * 100);
  object.dataset.dragY = String(point.y / frame.height * 100);
  updateSceneBurst(scene);
}

/** Align all interactive coordinates with the visible contain image, including letterboxing. */
export function mountSceneLayout(scene, page) {
  const image = scene.querySelector('.scene-art');
  const field = scene.querySelector('.scene-playfield');
  const anchors = page.sceneAnchors;
  let active = true;
  const layout = () => {
    if (!active || !scene.isConnected || !scene.clientWidth || !scene.clientHeight) return;
    const frame = imageFrame(scene.clientWidth,scene.clientHeight,image.naturalWidth || 1536,image.naturalHeight || 1024);
    Object.assign(field.style, {
      left:`${frame.x.toFixed(2)}px`, top:`${frame.y.toFixed(2)}px`,
      width:`${frame.width.toFixed(2)}px`, height:`${frame.height.toFixed(2)}px`
    });
    const scale = clamp(Math.min(frame.width / 780,frame.height / 520),.4,1);
    const main = field.querySelector('.interactive-object');
    const mainSize = sizeSprite(main,mainSizes[page.object] || [128,128],scale,64);
    const mainPoint = main.dataset.dragX ? [Number(main.dataset.dragX),Number(main.dataset.dragY)] : anchors.main;
    placeSprite(main,mainPoint,mainSize,frame);
    field.querySelectorAll('.extra-object').forEach((extra,index) => {
      const size = sizeSprite(extra,index === 0 ? [65,65] : [70,70],scale,48);
      placeSprite(extra,anchors.extras[index],size,frame);
    });
    const hidden = field.querySelector('.surprise-object');
    // Na pintura baixa do iPhone, o mínimo de 64 px e a folga extra empurravam o arbusto para cima de rostos.
    const hiddenSize = sizeSprite(hidden,[102,98],scale,52);
    placeSprite(hidden,anchors.hidden,hiddenSize,frame,frame.height < 300 ? 0 : 14);
    const friend = hidden.querySelector('.hidden-friend');
    Object.assign(friend.style, {
      width:`${hiddenSize[0] * .74}px`, height:`${hiddenSize[1] * .85}px`,
      left:`${hiddenSize[0] * .135}px`, bottom:`${hiddenSize[1] * .07}px`
    });
    hidden.style.setProperty('--reveal-rise', `${Math.max(12,21 * scale)}px`);
    updateSceneBurst(scene);
    field.classList.add('scene-layout-ready');
  };
  const observer = new ResizeObserver(layout);
  observer.observe(scene);
  image.addEventListener('load',layout);
  layout();
  return () => { active = false; observer.disconnect(); image.removeEventListener('load',layout); };
}
