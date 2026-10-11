import { stories, categories, getStory } from './stories.js';
import { icon, prop } from './art.js';
import { mountColoring, paintingThumb, lastPainting } from './coloring.js';
import { createMusicPlayer, MUSIC_PRESETS } from './music.js';
import { setupOffline, downloadBooks, getOfflineStatus, offlineSupport, OFFLINE_MESSAGES } from './offline.js';
import { sceneMotionMarkup } from './scenes.js';
import { mountSceneLayout, moveSceneObject, updateSceneBurst } from './scene-layout.js';

const app = document.querySelector('#app');
const announcer = document.querySelector('#announcer');
const STORAGE = 'historinhas-manu:v1';
const defaults = { favorites: [], progress: {}, lastStory: null, settings: { night: false, sounds: true, autoRead: false, reducedMotion: false, largeText: false, autoAdvance: false, rate: 0.85, musicPreset:'jardim', musicVolume:0.45 } };
let storageWarned = false;
function loadState() {
  let text;
  try { text = localStorage.getItem(STORAGE); } catch { return structuredClone(defaults); }
  // Um valor corrompido não indica falta de armazenamento: o próximo save() o substitui.
  let raw;
  try { raw = JSON.parse(text || 'null'); } catch { raw = null; }
  try {
    if (!raw || typeof raw !== 'object') return structuredClone(defaults);
    const state = structuredClone(defaults);
    state.favorites = Array.isArray(raw.favorites) ? raw.favorites.filter(id => getStory(id)) : [];
    state.lastStory = getStory(raw.lastStory)?.id || null;
    for (const story of stories) {
      const saved = raw.progress?.[story.id];
      if (saved && Number.isInteger(saved.page)) state.progress[story.id] = { page: Math.max(0, Math.min(story.pages.length - 1, saved.page)), completed: saved.completed === true };
    }
    for (const key of ['night', 'sounds', 'autoRead', 'reducedMotion', 'largeText', 'autoAdvance']) state.settings[key] = raw.settings?.[key] === true;
    state.settings.musicPreset = MUSIC_PRESETS.some(p => p.id === raw.settings?.musicPreset) ? raw.settings.musicPreset : 'jardim';
    state.settings.musicVolume = Number.isFinite(raw.settings?.musicVolume) ? Math.max(0,Math.min(1,raw.settings.musicVolume)) : 0.45;
    state.settings.rate = [0.75, 0.85, 1].includes(raw.settings?.rate) ? raw.settings.rate : 0.85;
    return state;
  } catch { return structuredClone(defaults); }
}
let state = loadState();
let music = null;
music = createMusicPlayer({onStateChange: updateMusicUI});
window.__manuKeep = () => narration === 'speaking' || narration === 'paused' || immersiveReading || music.getState().playing;
let offlineReady = false;
let downloadingBooks = false;
let booksProgress = null;
let offlineCheck = 0;
let view = 'library';
let category = categories[0];
let query = '';
let current = null;
let pageIndex = 0;
let narration = 'idle';
let speechUnlocked = false;
const narratorAudio = new Audio();
narratorAudio.preload = 'none';
let narrationWatchdog = null;
let speechGeneration = 0;
let playbackGeneration = 0;
let pendingAdvance = false;
let pendingNarrate = false;
let narrationError = false;
let wakeLock = null;
let wakeLockTimer = null;
let lastMusicToggle = -Infinity;
let musicStarting = false;
let audioContext = null;
let reactionTimer = null;
let toastTimer = null;
let dialogFocus = null;
let pageTurn = null;
let swipeCleanup = null;
let sceneCleanup = null;
const sceneImageLoads = new Map();
function loadSceneImage(page) {
  const src = `/assets/${page.sceneArt}.webp`;
  if (!sceneImageLoads.has(src)) {
    const image = new Image();
    const promise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => { image.onload = image.onerror = null; reject(new Error('scene timeout')); }, 12000);
      image.onload = async () => {
        // A imagem já chegou; uma falha de decode() não deve travar a virada.
        try { if (image.decode) await image.decode(); } catch { /* O navegador decodifica ao desenhar. */ }
        clearTimeout(timer); resolve(image);
      };
      image.onerror = () => { clearTimeout(timer); reject(Object.assign(new Error('scene unavailable'), { unavailable: true })); };
      image.src = src;
    }).catch(error => { if (sceneImageLoads.get(src) === promise) sceneImageLoads.delete(src); throw error; });
    sceneImageLoads.set(src, promise);
    // Retain only a few decoded neighbouring paintings in memory.
    while (sceneImageLoads.size > 6) sceneImageLoads.delete(sceneImageLoads.keys().next().value);
  }
  return sceneImageLoads.get(src);
}
function reducedPageMotion() {
  return state.settings.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function clearPageTurn() {
  if (!pageTurn) return;
  const turn = pageTurn;
  pageTurn = null;
  clearTimeout(turn.timer);
  turn.layer?.remove();
  turn.book?.classList.remove('turn-in-progress');
  turn.book?.removeAttribute('aria-busy');
}
function turnProgress(turn, progress) {
  if (!turn || pageTurn !== turn || !turn.layer) return;
  turn.progress = Math.max(0, Math.min(1, progress));
  const angle = (turn.next > pageIndex ? -1 : 1) * 180 * turn.progress;
  turn.sheet.style.transform = reducedPageMotion() ? 'none' : `rotateY(${angle}deg)`;
  if (reducedPageMotion()) turn.sheet.style.opacity = String(1 - turn.progress);
  turn.layer.style.setProperty('--turn-shadow', String(Math.sin(turn.progress * Math.PI) * .28));
}
function cleanTurnClone(clone) {
  clone.removeAttribute('id');
  clone.removeAttribute('aria-busy');
  clone.classList.remove('turn-in-progress');
  clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  clone.querySelectorAll('[tabindex]').forEach(element => element.removeAttribute('tabindex'));
  clone.querySelectorAll('button,a,input').forEach(element => { element.setAttribute('tabindex', '-1'); });
  clone.setAttribute('aria-hidden', 'true');
  clone.inert = true;
  return clone;
}
function preparePageTurn(next) {
  if (pageTurn || !current || next === pageIndex || next < 0 || next >= current.pages.length) return null;
  const book = document.querySelector('.book');
  const story = current;
  const page = story.pages[next];
  const turn = { next, story, book, progress:0, layer:null, sheet:null, timer:null, settling:false };
  pageTurn = turn;
  book.setAttribute('aria-busy', 'true');
  turn.ready = loadSceneImage(page).then(() => {
    if (pageTurn !== turn || !book.isConnected) return false;
    const layer = document.createElement('div');
    layer.className = `page-turn-layer ${next > pageIndex ? 'turn-forward' : 'turn-backward'}`;
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    const upcoming = cleanTurnClone(book.cloneNode(true));
    upcoming.classList.add('turn-under');
    upcoming.querySelector('.scene-art').classList.remove('missing');
    upcoming.querySelector('.scene-art').src = `/assets/${page.sceneArt}.webp`;
    upcoming.querySelector('.scene-art').alt = page.sceneAlt;
    upcoming.querySelector('.scene').className = `scene effect-${page.effect}`;
    upcoming.querySelector('.scene').dataset.step = '0';
    upcoming.querySelector('.page-words h1').textContent = page.title;
    upcoming.querySelector('.page-words p').textContent = page.text;
    const chapter = upcoming.querySelector('.scene-chapter');
    if (chapter) chapter.innerHTML = `${String(next + 1).padStart(2, '0')} <i>·</i> ${story.short}`;
    const count = upcoming.querySelector('.page-bottom b');
    if (count) count.textContent = String(next + 1);
    upcoming.querySelectorAll('.scene-motion,.scene-atmosphere,.ambient,.interactive-object,.extra-object,.surprise-object,.scene-hotspot,.tap-sparkle,.particles,.scene-reaction,.discovery-count,.touch-hint,.water-ripples').forEach(element => element.remove());
    const sheet = document.createElement('div');
    sheet.className = 'turn-sheet';
    const front = cleanTurnClone(book.cloneNode(true));
    front.classList.add('turn-front');
    const back = document.createElement('div');
    back.className = 'turn-verso';
    layer.append(upcoming, sheet);
    sheet.append(front, back);
    book.parentElement.append(layer);
    front.querySelector('.page-copy').scrollTop = book.querySelector('.page-copy').scrollTop;
    turn.layer = layer;
    turn.sheet = sheet;
    book.classList.add('turn-in-progress');
    turnProgress(turn, turn.progress);
    return true;
  }).catch(error => {
    if (pageTurn !== turn) return false;
    // Sem rede e sem a pintura guardada, tocar de novo falharia igual: a página abre sem a folha 3D.
    if (error.unavailable) { turn.unavailable = true; return true; }
    turnCancelled(); toast('A ilustração ainda está chegando. Toque novamente para passar a página.');
    return false;
  });
  return turn;
}
async function settlePageTurn(turn, complete) {
  if (!turn || pageTurn !== turn || turn.settling) return;
  turn.settling = true;
  if (!await turn.ready || pageTurn !== turn) return;
  if (complete) stopNarration();
  if (turn.unavailable) {
    if (!complete) { turnCancelled(); return; }
    location.hash = `/livro/${turn.story.id}/${turn.next + 1}`;
    toast('A pintura desta página não carregou. Confira a internet ou use “Guardar livros para usar sem internet” nos Ajustes.');
    return;
  }
  const duration = reducedPageMotion() ? 120 : Math.max(180, 460 * (complete ? 1 - turn.progress : turn.progress));
  turn.sheet.style.transition = `transform ${duration}ms cubic-bezier(.22,.7,.25,1), opacity ${duration}ms ease`;
  // Separate the drag position and the settling transform into distinct frames.
  void turn.sheet.offsetWidth;
  turnProgress(turn, complete ? 1 : 0);
  turn.timer = setTimeout(() => {
    if (pageTurn !== turn) return;
    if (complete) location.hash = `/livro/${turn.story.id}/${turn.next + 1}`;
    else turnCancelled();
  }, duration + 24);
}
function turnCancelled() {
  clearPageTurn();
  // A folha voltou: o que esperava por ela (fim da leitura ou um toque em Ouvir) vale para esta página.
  resumePendingAdvance();
  if (pendingNarrate) { pendingNarrate = false; narrate(); }
}
let touches = 0;
let suppressObjectClick = false;
let lastEmptyTap = 0;
let nudgeTimer = null;
let paintCleanup = null;
let immersiveReading = false;
let immersiveNative = false;
let immersiveChange = null;
const fullscreenIcon = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg>';

function syncImmersiveReading() {
  document.body.classList.toggle('immersive-reading', immersiveReading);
  document.querySelector('[data-action="fullscreen"]')?.setAttribute('aria-pressed', String(immersiveReading));
}
function exitImmersiveReading(restoreFocus = false) {
  immersiveReading = false;
  syncImmersiveReading();
  if (immersiveChange) {
    document.removeEventListener('fullscreenchange', immersiveChange);
    document.removeEventListener('webkitfullscreenchange', immersiveChange);
    immersiveChange = null;
  }
  const nativeElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (immersiveNative && nativeElement === document.documentElement) {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    try { Promise.resolve(exit?.call(document)).catch(() => {}); } catch { /* CSS mode is already restored. */ }
  }
  immersiveNative = false;
  if (restoreFocus) document.querySelector('[data-action="fullscreen"]')?.focus({ preventScroll: true });
}
function enterImmersiveReading() {
  if (!current || immersiveReading) return;
  immersiveReading = true;
  syncImmersiveReading();
  document.querySelector('[data-action="exit-fullscreen"]')?.focus({ preventScroll: true });
  // Request on the stable root: changing a page replaces the reader's DOM.
  const root = document.documentElement;
  const request = root.requestFullscreen || root.webkitRequestFullscreen;
  if (!request || document.fullscreenElement || document.webkitFullscreenElement) return;
  immersiveChange = () => {
    const element = document.fullscreenElement || document.webkitFullscreenElement;
    if (element === root) immersiveNative = true;
    else if (immersiveNative) exitImmersiveReading(true);
  };
  document.addEventListener('fullscreenchange', immersiveChange);
  document.addEventListener('webkitfullscreenchange', immersiveChange);
  try {
    Promise.resolve(request.call(root)).then(() => {
      immersiveNative = (document.fullscreenElement || document.webkitFullscreenElement) === root;
      if (!immersiveReading && immersiveNative) exitImmersiveReading();
    }).catch(() => { /* Safari can keep the immersive CSS layout without native fullscreen. */ });
  } catch { /* Native fullscreen is optional; the story still fills the viewport. */ }
}

function save() {
  try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (error) {
    // Espaço cheio (as pinturas dividem a mesma cota) não é culpa do navegador; o próximo save() tenta de novo.
    const full = error?.name === 'QuotaExceededError' || error?.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error?.code === 22 || error?.code === 1014;
    if (!storageWarned) { storageWarned = true; toast(full ? 'O espaço que a Manu tem para guardar neste aparelho está cheio. Favoritas e marcador desta visita podem não ficar salvos.' : 'Neste navegador, favoritas e marcador ficam salvos só enquanto o site estiver aberto.'); }
  }
}
function settingsClass() {
  document.documentElement.dataset.night = state.settings.night;
  // O manifest não acompanha o modo noturno; a meta pinta a barra do sistema com o fundo atual.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.settings.night ? '#253129' : '#fbf8f1');
  document.documentElement.classList.toggle('reduce-motion', state.settings.reducedMotion);
  document.documentElement.classList.toggle('large-text', state.settings.largeText);
  document.querySelectorAll('.night-button').forEach(button => { button.innerHTML = icon(state.settings.night ? 'sun' : 'moon'); button.setAttribute('aria-pressed', String(state.settings.night)); });
}
settingsClass();
const toast = message => {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  // Um diálogo aberto com showModal fica na top layer, acima de qualquer z-index do body.
  (document.querySelector('dialog[open]') || document.body).append(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 4200);
};

function header() {
  return `<header class="site-header"><a href="#/" class="brand" aria-label="Historinhas da Manu, início"><span class="brand-mark">${icon('book')}${icon('sparkle', 'brand-star')}</span><span>historinhas<span class="brand-sub">da <b>Manu</b><i>✦</i></span></span></a><nav class="main-nav" aria-label="Biblioteca"><button data-action="library" class="nav-button ${view === 'library' ? 'active' : ''}" ${view === 'library' ? 'aria-current="page"' : ''}>${icon('book')}<span>Biblioteca</span></button><button data-action="favorites" class="nav-button ${view === 'favorites' ? 'active' : ''}" ${view === 'favorites' ? 'aria-current="page"' : ''}>${icon('heart')}<span>Favoritas</span></button><a class="nav-button paint-nav" href="#/pintar/${lastPainting()}">${icon('palette')}<span>Pintar</span></a></nav><div class="header-tools"><button class="icon-button header-music" data-action="music" aria-label="Música de fundo" aria-pressed="${music.getState().playing}">${icon('music')}</button><button class="icon-button night-button" data-action="night" aria-label="Modo noturno" aria-pressed="${state.settings.night}" title="Modo noturno">${icon(state.settings.night ? 'sun' : 'moon')}</button><button class="icon-button parent-button" data-action="settings" aria-label="Ajustes da leitura" title="Ajustes da leitura">${icon('settings')}</button></div></header>`;
}
function favoriteButton(story, extra = '') {
  const selected = state.favorites.includes(story.id);
  return `<button class="favorite-button ${selected ? 'selected' : ''} ${extra}" data-action="favorite" data-id="${story.id}" aria-label="Favorita: ${story.title}" aria-pressed="${selected}">${icon('heart')}</button>`;
}
function card(story, index) {
  const saved = state.progress[story.id];
  const startPage = saved?.completed ? 0 : saved?.page ?? 0;
  return `<article class="story-card" style="--story-color:${story.color};--card-delay:${index * 55}ms"><a href="#/livro/${story.id}/${startPage + 1}" class="card-cover" aria-label="${saved?.page > 0 && !saved.completed ? 'Continuar' : 'Ler'} ${story.title}"><img src="/assets/capa-${story.id}.webp" alt="Ilustração do conto ${story.title}" width="1024" height="683" decoding="async" ${index > 2 ? 'loading="lazy"' : ''}><span class="book-edge"></span><span class="cover-label">${icon('sparkle')} ${story.original ? 'Uma história do papai' : 'Livro interativo'}</span><span class="cover-play">${icon('arrow')}</span>${saved?.completed ? `<span class="finished-label">${icon('check')} Já lemos!</span>` : ''}</a>${favoriteButton(story)}<div class="card-copy"><div class="card-meta"><span>${story.category}</span><span>${story.pages.length} páginas</span></div><h3><a href="#/livro/${story.id}/${startPage + 1}">${story.title}</a></h3><p>${story.description}</p></div></article>`;
}
function resume() {
  const story = getStory(state.lastStory);
  const saved = story && state.progress[story.id];
  if (!story || !saved || saved.completed || saved.page === 0) return '';
  return `<a class="resume-banner" href="#/livro/${story.id}/${saved.page + 1}"><span class="resume-art"><img src="/assets/capa-${story.id}.webp" alt="" width="80" height="64"></span><span class="resume-copy"><span class="eyebrow">NOSSO MARCADOR DE PÁGINA</span><strong>Continuar ${story.short}</strong><span>Paramos na página ${saved.page + 1} de ${story.pages.length}</span></span><span class="resume-progress"><span style="width:${(saved.page + 1) / story.pages.length * 100}%"></span></span><span class="round-arrow">${icon('arrow')}</span></a>`;
}
function renderLibrary(focusHeading = false) {
  sceneCleanup?.(); sceneCleanup = null;
  swipeCleanup?.(); swipeCleanup = null; clearPageTurn();
  exitImmersiveReading();
  stopNarration();
  pendingNarrate = false;
  clearTimeout(reactionTimer);
  current = null;
  document.body.classList.remove('reading');
  document.title = 'Historinhas da Manu · Era uma vez…';
  app.innerHTML = `${header()}<main id="main"><section class="hero"><div class="hero-copy"><div class="welcome"><span class="welcome-dot"></span> Feito com carinho para a Manu</div><h1>Pequenas histórias.<br>Grandes <em>aventuras.</em></h1><p>Um mundinho onde os livros ganham vida<br class="desktop-break"> e cada toque vira uma descoberta.</p><a class="button primary" href="#/livro/${state.lastStory || stories[0].id}/${(state.progress[state.lastStory]?.completed ? 0 : state.progress[state.lastStory]?.page ?? 0) + 1}">${icon('book')} Vamos ler? ${icon('arrow')}</a><div class="hero-note">${icon('hand')} Para ler, tocar e imaginar juntinhos.</div></div><div class="hero-art"><img src="/assets/hero-biblioteca.webp" class="hero-landscape" alt="Um livro aberto e uma rosa encantada num jardim, com um castelo ao fundo" width="1400" height="934"><div class="hero-art-shade"></div><span class="hero-spark spark-one">✦</span><span class="hero-spark spark-two">✧</span><div class="hero-book-note">${icon('sparkle')} A Bela e a Fera</div></div></section>${resume()}<a class="atelier-invitation" href="#/pintar/${lastPainting()}"><span class="invitation-art">${paintingThumb(lastPainting())}</span><span><span class="eyebrow">O ATELIÊ DA MANU</span><strong>Um rabisco que ganha vida.</strong><small>Pinte com o dedo ou a Apple Pencil e veja a magia acontecer.</small></span><span class="invitation-palette">${icon('palette')}</span><span class="round-arrow">${icon('arrow')}</span></a><section class="library-section" aria-labelledby="library-heading"><div class="section-top"><div><span class="eyebrow">UM NOVO ENCANTO A CADA LIVRO</span><h2 id="library-heading" tabindex="-1">${view === 'favorites' ? 'As nossas favoritas' : 'Escolha uma historinha'}</h2><p>${view === 'favorites' ? 'As histórias que ganharam um lugar no coração.' : 'Qual aventura vamos viver hoje?'}</p></div><label class="search-box">${icon('search')}<input type="search" id="story-search" aria-label="Buscar uma história" placeholder="Buscar uma história" autocomplete="off"></label></div><div class="category-list" role="group" aria-label="Filtrar histórias">${categories.map((c, i) => `<button class="category ${category === c ? 'active' : ''}" data-action="category" data-index="${i}" aria-pressed="${category === c}">${i === 0 ? icon('book') : i === 2 ? icon('sparkle') : ''}${c}</button>`).join('')}</div><div id="story-grid" class="story-grid"></div><div class="future-note"><span class="future-icon">${icon('sparkle')}</span><span>E muitas outras histórias ainda vão chegar…<small>Nosso mundinho de imaginação está só começando.</small></span><span class="future-stars" aria-hidden="true">✧ &nbsp; ✦</span></div></section><section class="together-note"><span>${icon('book')}</span><div><h2>A melhor parte é viver isso juntos.</h2><p>Escolha um cantinho aconchegante, abra um livro e deixe a imaginação passear.</p></div></section></main><footer class="site-footer"><a class="footer-brand" href="#/">historinhas da <b>Manu</b> ✦</a><span>Feito com ${icon('heart')} para os nossos momentos juntos.</span><button data-action="settings">Ajustes da leitura ${icon('settings')}</button></footer>`;
  // O template nasce com o botão de música desligado; a música pode estar tocando.
  updateMusicUI();
  app.querySelector('#story-search').value = query;
  renderGrid();
  if (focusHeading) {
    document.querySelector('#library-heading').focus({ preventScroll: true });
    // Na horizontal, herói e convites deixam a grade abaixo da dobra e o toque não mostraria nada.
    if (document.querySelector('#story-grid').getBoundingClientRect().top > innerHeight * .6) {
      const section = document.querySelector('.library-section');
      try { section.scrollIntoView({ block:'start', behavior: reducedPageMotion() ? 'instant' : 'smooth' }); } catch { section.scrollIntoView(true); }
    }
  }
}
function renderGrid() {
  // A sugestão do teclado do iPad insere a palavra seguida de espaço.
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
  const search = normalize(query);
  const filtered = stories.filter(story => (view !== 'favorites' || state.favorites.includes(story.id)) && (category === categories[0] || story.category === category) && normalize(story.title).includes(search));
  document.querySelector('#story-grid').innerHTML = filtered.length ? filtered.map(card).join('') : `<div class="empty-library">${icon(view === 'favorites' ? 'heart' : 'search')}<h3>${view === 'favorites' && !state.favorites.length ? 'Um lugar para as favoritas' : 'Nenhum livro por aqui ainda'}</h3><p>${view === 'favorites' && !state.favorites.length ? 'Toque no coração de um livro para guardar aqui.' : 'Experimente outro nome ou escolha todas as histórias.'}</p><button class="button secondary" data-action="reset-filter">Ver todas as histórias ${icon('arrow')}</button></div>`;
}
function stopNarration() {
  speechGeneration += 1;
  playbackGeneration += 1;
  clearTimeout(narrationWatchdog);
  narratorAudio.onended = narratorAudio.onerror = narratorAudio.onplaying = narratorAudio.onpause = narratorAudio.onplay = null;
  narratorAudio.pause();
  narratorAudio.removeAttribute('src');
  narratorAudio.load();
  pendingAdvance = false;
  narrationError = false;
  narration = 'idle';
  updateNarration();
}
function pauseNarration() {
  playbackGeneration += 1;
  clearTimeout(narrationWatchdog);
  narratorAudio.pause();
  narration = 'paused'; updateNarration();
}
function holdScreen(on) {
  if (!on || wakeLock || !navigator.wakeLock || document.hidden) {
    if (!on && wakeLock) { const held = wakeLock; wakeLock = null; void held.then(lock => lock?.release()).catch(() => {}); }
    return;
  }
  const request = wakeLock = Promise.resolve().then(() => navigator.wakeLock.request('screen')).then(lock => {
    if (wakeLock !== request) { void lock.release().catch(() => {}); return null; }
    // O sistema solta a trava sozinho quando a página fica oculta.
    lock.addEventListener('release', () => { if (wakeLock === request) wakeLock = null; });
    return lock;
  }, () => { if (wakeLock === request) wakeLock = null; return null; });
}
function syncWakeLock() {
  clearTimeout(wakeLockTimer);
  // O áudio sozinho não impede o Bloqueio Automático do iPad; só «Contar o livro inteiro» mantém a tela acesa.
  const reading = state.settings.autoAdvance && current && !document.hidden && !document.querySelector('dialog[open]');
  if (reading && narration === 'speaking') holdScreen(true);
  // Entre uma página e a seguinte a narração passa por 'idle'; soltar na hora abriria brecha para o bloqueio.
  else if (reading && narration === 'idle' && wakeLock) wakeLockTimer = setTimeout(() => holdScreen(false), 3000);
  else holdScreen(false);
}
function updateNarration() {
  music.duck(narration === 'speaking');
  syncWakeLock();
  const buttons = document.querySelectorAll('[data-action="narrate"]');
  if (!buttons.length) return;
  const failed = narration === 'idle' && narrationError;
  const label = narration === 'speaking' ? 'Pausar' : narration === 'paused' ? 'Continuar' : failed ? 'Tentar de novo' : 'Ouvir';
  for (const button of buttons) {
  button.innerHTML = `${icon(narration === 'speaking' ? 'pause' : failed ? 'repeat' : 'sound')}<span>${label}</span>`;
  button.setAttribute('aria-label', failed ? 'Tentar ouvir de novo a leitura desta página' : `${label} a leitura desta página`);
  button.classList.toggle('is-speaking', narration === 'speaking');
  button.classList.toggle('narration-error', failed);
  }
}
function resumePendingAdvance() {
  // Com Ajustes aberto ou a folha em movimento, o avanço do livro inteiro espera em vez de se perder.
  if (!pendingAdvance || pageTurn || document.querySelector('dialog[open]')) return;
  pendingAdvance = false;
  if (state.settings.autoAdvance && current && !document.hidden) pageIndex < current.pages.length - 1 ? setPage(pageIndex + 1) : finish();
}
function narrationFinished(token) {
  if (token !== speechGeneration) return;
  clearTimeout(narrationWatchdog);
  narration = 'idle';
  updateNarration();
  pendingAdvance = state.settings.autoAdvance;
  resumePendingAdvance();
}
function narrationFailed(token) {
  if (token !== speechGeneration) return;
  stopNarration();
  narrationError = true; updateNarration();
  toast('Não foi possível carregar a narração. Confira a internet e toque em “Tentar de novo”.');
}
function playNarration(token) {
  const attempt = ++playbackGeneration;
  clearTimeout(narrationWatchdog);
  // The timer only guards loading, never a long page already playing.
  if (narratorAudio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
    narrationWatchdog = setTimeout(() => {
      if (token === speechGeneration && narration === 'speaking') narrationFailed(token);
    }, 10000);
  }
  void narratorAudio.play().catch(error => {
    // Pausing while play is pending intentionally aborts that request.
    if (token !== speechGeneration || attempt !== playbackGeneration || (error.name === 'AbortError' && narration === 'paused')) return;
    narrationFailed(token);
  });
}
function narrate() {
  if (!current) return;
  speechUnlocked = true;
  // Durante a virada, Ouvir pertence à página que vai abrir (ou à que fica, se a folha voltar).
  if (pageTurn && narration !== 'speaking') { pendingNarrate = true; return; }
  if (narration === 'speaking') { pauseNarration(); return; }
  if (narration === 'paused') {
    narration = 'speaking'; updateNarration();
    playNarration(speechGeneration);
    return;
  }
  stopNarration();
  const token = speechGeneration;
  const audio = current.pages[pageIndex].audio;
  if (!audio) return narrationFailed(token);
  narratorAudio.src = audio;
  narratorAudio.volume = .9;
  // 0.85 («Como foi gravada») plays the approved recording at its original rhythm.
  narratorAudio.playbackRate = state.settings.rate / .85;
  narratorAudio.preservesPitch = true;
  narratorAudio.onended = () => narrationFinished(token);
  narratorAudio.onplaying = () => { if (token === speechGeneration) clearTimeout(narrationWatchdog); };
  narratorAudio.onerror = () => narrationFailed(token);
  // Central de Controle, fones e Siri pausam ou retomam o áudio sem passar pelo botão. No fim natural, pause chega antes de ended.
  narratorAudio.onpause = () => { if (token === speechGeneration && narration === 'speaking' && narratorAudio.paused && !narratorAudio.ended) pauseNarration(); };
  narratorAudio.onplay = () => { if (token === speechGeneration && narration !== 'speaking' && !narratorAudio.paused) { narration = 'speaking'; updateNarration(); } };
  narration = 'speaking'; updateNarration();
  playNarration(token);
}
function chime(effect) {
  if (!state.settings.sounds) return;
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio) return;
  try {
    audioContext ||= new Audio();
    void audioContext.resume().catch(() => {});
    const tones = effect === 'roar' ? [174.6, 146.8, 130.8] : effect === 'trot' ? [261.6, 261.6, 329.6] : effect === 'splash' ? [440, 660, 880] : effect === 'hearts' ? [523.25, 659.25, 783.99] : effect === 'fly' ? [659.25, 880] : effect === 'tap' ? [1046.5] : [523.25, 783.99];
    tones.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = audioContext.currentTime + index * 0.12;
      oscillator.type = effect === 'roar' ? 'triangle' : 'sine'; oscillator.frequency.value = frequency;
      if (effect === 'roar') oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, start + 0.4);
      gain.gain.setValueAtTime(0, start);
      // Pico acima da música de fundo e abaixo da voz; três tons sobrepostos ficam longe de clipar.
      gain.gain.linearRampToValueAtTime(0.12, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.48);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.start(start); oscillator.stop(start + 0.5);
    });
  } catch { /* A história continua mesmo sem áudio no dispositivo. */ }
}
function renderReader(story, index) {
  sceneCleanup?.(); sceneCleanup = null;
  stopNarration();
  clearTimeout(reactionTimer);
  current = story;
  pageIndex = index;
  touches = 0;
  const page = story.pages[index];
  const saved = state.progress[story.id];
  // Abrir ou folhear um livro concluído não apaga o selo; só «Ler de novo» zera a conclusão.
  state.progress[story.id] = { page: index, completed: saved?.completed === true };
  state.lastStory = story.id;
  save();
  document.body.classList.add('reading');
  document.title = `${story.title} · Página ${index + 1} · Historinhas da Manu`;
  app.innerHTML = `<main class="reader rich-story" id="main" style="--story-color:${story.color}"><header class="reader-header"><a class="reader-back" href="#/">${icon('back')}<span>Biblioteca</span></a><div class="reader-title"><span class="eyebrow">HISTORINHAS DA MANU</span><strong>${story.title}</strong></div><div class="reader-tools"><button class="icon-button" data-action="settings" aria-label="Ajustes da leitura">${icon('settings')}</button><button class="fullscreen-button" data-action="fullscreen" aria-label="Ler em tela cheia" aria-pressed="${immersiveReading}">${fullscreenIcon}<span>Tela cheia</span></button><button class="icon-button reader-music" data-action="music" aria-label="Música de fundo" aria-pressed="${music.getState().playing}">${icon('music')}</button><button class="narration-button" data-action="narrate" aria-label="Ouvir a leitura desta página">${icon('sound')}<span>Ouvir</span></button></div></header><div class="book-wrap"><div class="book"><section class="scene effect-${page.effect}" data-step="0" aria-label="Cena interativa: ${page.title}" data-effect="${page.effect}"><img class="scene-art" draggable="false" src="/assets/${page.sceneArt}.webp" alt="${page.sceneAlt}" style="object-position:50% center" width="1536" height="1024"><div class="scene-playfield">${sceneMotionMarkup(page)}<div class="scene-vignette"></div><span class="scene-chapter">${String(index + 1).padStart(2, '0')} <i>·</i> ${story.short}</span>${page.sceneHotspots.map(([x, y, w, h]) => `<div class="scene-hotspot" aria-hidden="true" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></div>`).join('')}${page.extras.map((extra, i) => `<button class="extra-object extra-${i} effect-${extra.effect}" data-action="extra" data-extra="${i}" aria-label="${extra.name}" style="left:${page.sceneAnchors.extras[i][0]}%;top:${page.sceneAnchors.extras[i][1]}%">${prop(extra.object)}</button>`).join('')}<button class="surprise-object" data-action="surprise" aria-label="${page.surpriseLabel || 'Descubra quem está escondido nas folhas'}" aria-expanded="false"><span class="hidden-friend">${prop(page.hidden)}</span>${prop('bush')}<span class="surprise-mark">?</span></button><div class="ambient ambient-b" aria-hidden="true">${prop('star')}</div><div class="ambient ambient-c" aria-hidden="true">${prop('star')}</div><button class="interactive-object object-${page.object}" data-action="interact" aria-label="${page.prompt}" style="--object-x:${page.sceneAnchors.main[0]}%;--object-y:${page.sceneAnchors.main[1]}%">${prop(page.object)}<span class="touch-indicator">${icon('hand')}</span></button><div class="scene-reaction" role="status" aria-live="polite"></div><div class="particles" aria-hidden="true"></div><div class="water-ripples" aria-hidden="true"><i></i><i></i><i></i></div></div></section><section class="page-copy" aria-labelledby="page-title"><div class="page-top"><span class="eyebrow">ERA UMA VEZ…</span>${favoriteButton(story, 'reader-favorite')}</div><div class="page-words"><span class="page-flourish" aria-hidden="true">✦</span><h1 id="page-title" tabindex="-1">${page.title}</h1><p tabindex="-1">${page.text}</p><span class="text-ornament" aria-hidden="true">— &nbsp; ✧ &nbsp; —</span></div><div class="page-bottom"><span>Página <b>${index + 1}</b> de ${story.pages.length}</span><span class="page-mini-book">${icon('book')}</span></div></section></div><div class="book-shadow"></div></div><div class="scene-tools"><span class="discovery-count" aria-hidden="true"></span><button class="touch-hint" data-action="interact">${icon('hand')}${page.prompt}${icon('sparkle')}</button></div><nav class="page-navigation" aria-label="Navegar pelas páginas"><button class="page-prev" data-action="previous" aria-label="Página anterior" ${index === 0 ? 'disabled' : ''}>${icon('back')}<span>Voltar</span></button><div class="page-dots" role="group" aria-label="Páginas do livro"><span class="mobile-page-count">${index + 1} / ${story.pages.length}</span>${story.pages.map((_, i) => `<button class="page-dot ${i === index ? 'active' : ''} ${i < index ? 'visited' : ''}" data-action="page" data-page="${i}" aria-label="Ir para página ${i + 1}" ${i === index ? 'aria-current="page"' : ''}><span></span></button>`).join('')}</div><button class="button primary page-next" data-action="next">${index === story.pages.length - 1 ? 'Final feliz!' : 'Próxima'} ${icon(index === story.pages.length - 1 ? 'heart' : 'arrow')}</button></nav><p class="reading-note">${icon('hand')} Toque, arraste e descubra. Deslize para passar a página.</p><nav class="immersive-controls" aria-label="Controles da leitura em tela cheia"><button data-action="previous" aria-label="Página anterior" ${index === 0 ? 'disabled' : ''}>${icon('back')}</button><button data-action="narrate" aria-label="Ouvir a leitura desta página">${icon('sound')}<span>Ouvir</span></button><button data-action="next" aria-label="${index === story.pages.length - 1 ? 'Concluir história' : 'Próxima página'}">${icon('arrow')}</button><button data-action="exit-fullscreen" aria-label="Sair da tela cheia">${icon('close')}<span>Sair</span></button></nav></main>`;
  updateMusicUI();
  syncImmersiveReading();
  const title = document.querySelector(immersiveReading ? '.page-words p' : '#page-title');
  title.focus({ preventScroll: true });
  announcer.textContent = `${story.title}. Página ${index + 1} de ${story.pages.length}. ${page.title}.`;
  const art = document.querySelector('.scene-art');
  // Sem a pintura, o WebKit mostraria o ícone de imagem quebrada no meio da cena.
  art.addEventListener('error', () => art.classList.add('missing'), { once:true });
  sceneCleanup = mountSceneLayout(document.querySelector('.scene'), page);
  bindSwipe();
  bindDrag();
  for (const neighbor of [index - 1, index + 1]) {
    if (story.pages[neighbor]) void loadSceneImage(story.pages[neighbor]).catch(() => {});
  }
  if (pendingNarrate || (state.settings.autoRead && speechUnlocked)) { pendingNarrate = false; narrate(); }
}
function setPage(next) {
  const turn = preparePageTurn(next);
  if (turn) void settlePageTurn(turn, true);
}
// O balão vai para a borda oposta ao alvo tocado, para não cobrir a resposta que a criança espera ver.
function showReaction(scene, text, target) {
  const reaction = scene.querySelector('.scene-reaction');
  const field = scene.querySelector('.scene-playfield').getBoundingClientRect();
  const box = target.getBoundingClientRect();
  reaction.classList.toggle('at-bottom', box.top + box.height / 2 < field.top + field.height / 2);
  reaction.textContent = text;
  return reaction;
}
// Os três alvos dividem o mesmo timer: quem limpa por último limpa o estado de todos.
function resetReaction(scene) {
  if (!scene?.isConnected) return;
  scene.classList.remove('interacted', 'show-reaction');
  scene.querySelectorAll('.extra-object.playing,.scene-hotspot.lit').forEach(el => el.classList.remove('playing', 'lit'));
  scene.querySelector('.scene-reaction').textContent = '';
}
function interact(source) {
  if (!current) return;
  const scene = document.querySelector('.scene');
  const page = current.pages[pageIndex];
  const main = scene.querySelector('.interactive-object');
  const spot = source?.classList?.contains('scene-hotspot') ? source : null;
  clearTimeout(reactionTimer);
  scene.querySelectorAll('.extra-object.playing,.scene-hotspot.lit').forEach(el => el.classList.remove('playing', 'lit'));
  main.classList.remove('nudge');
  scene.classList.remove('interacted', 'show-reaction');
  void scene.offsetWidth;
  scene.classList.add('interacted');
  spot?.classList.add('lit');
  touches += 1;
  const step = Math.min(3, touches);
  scene.dataset.step = String(step);
  const counter = document.querySelector('.discovery-count');
  const sequences = {
    build: ['Primeiro, as paredes!', 'Agora, vamos colocar o telhado!', 'Prontinha! A casa ganhou uma porta.'],
    feast: ['Um pouquinho de arroz…', 'Agora, os legumes bem coloridos!', 'Almoço prontinho! Hum… que delícia!'],
    roar: ['Raaawr… um olá bem pequenininho!', 'Raaawr! O Lion está mais animado!', 'Raaawr! O Lion ganhou um amigão!'],
    splash: ['Ploc! Uma gotinha!', 'Ploc, ploc! Duas gotinhas!', 'Chuááá! Uma festa de gotinhas!'],
    rise: ['A girafa abaixou para dizer olá…', 'Subindo, subindo… que passeio gostoso!', 'Lá no alto! O castelo está logo ali.'],
    trot: ['Pocotó! Um passinho…', 'Pocotó, pocotó! Vamos passear!', 'Pocotó! O pônei balançou a crina rosa.']
  };
  // As sequências falam do Lion, da girafa e do pônei: fora da Princesa vale a reação escrita para a página.
  // Casa e prato revelados por etapas mantêm a sequência e terminam na reação da página.
  const staged = page.effect === 'build' || page.effect === 'feast';
  const sequence = staged || current.id === 'princesa' ? sequences[page.effect] : null;
  counter.innerHTML = sequence ? [1,2,3].map(n => `<i class="${n <= step ? 'found' : ''}">${icon('sparkle')}</i>`).join('') : '';
  const text = !sequence ? page.reaction : staged ? (step < 3 ? sequence[step - 1] : page.reaction) : step === 1 ? page.reaction : sequence[step - 1];
  showReaction(scene, text, spot || main);
  const burstDistance = updateSceneBurst(scene, spot ? [spot.offsetLeft + spot.offsetWidth / 2, spot.offsetTop + spot.offsetHeight / 2] : null);
  scene.querySelector('.particles').innerHTML = Array.from({ length: 9 }, (_, i) => `<span class="particle" style="--angle:${i * 40}deg;--delay:${i * 35}ms;--distance:${Math.min(65 + (i % 3) * 24, burstDistance)}px">${page.effect === 'splash' ? prop('drop') : icon(page.effect === 'hearts' ? 'heart' : 'sparkle')}</span>`).join('');
  chime(page.effect);
  reactionTimer = setTimeout(() => resetReaction(scene), 4600);
}
function interactExtra(index) {
  if (!current) return;
  document.querySelectorAll('.extra-object.playing').forEach(el => el.classList.remove('playing'));
  const extra = current.pages[pageIndex].extras[index];
  if (!extra) return;
  const object = document.querySelector(`.extra-${index}`);
  object.classList.remove('playing');
  void object.offsetWidth;
  object.classList.add('playing');
  const scene = document.querySelector('.scene');
  scene.classList.add('show-reaction');
  showReaction(scene, extra.reaction, object);
  chime(extra.effect);
  clearTimeout(reactionTimer);
  reactionTimer = setTimeout(() => resetReaction(scene), 4200);
}
function surprise() {
  if (!current) return;
  document.querySelectorAll('.extra-object.playing').forEach(el => el.classList.remove('playing'));
  const button = document.querySelector('.surprise-object');
  const scene = document.querySelector('.scene');
  const labels = { lion: 'O Lion estava escondido! Raaawr!', rabbit: 'Achou! Um coelhinho atrás das folhas!', bird: 'Achou o passarinho! Piu, piu!', fish: 'Achou! O peixinho veio nadar com você!' };
  const found = labels[current.pages[pageIndex].hidden];
  const revealed = button.getAttribute('aria-expanded') === 'true';
  let message = found;
  // Toques seguidos não fazem o amigo piscar: até 1,5 s depois do último toque, ele só dá um pulinho.
  if (revealed && performance.now() - Number(button.dataset.touchedAt || 0) < 1500) {
    button.classList.remove('peek');
    void button.offsetWidth;
    button.classList.add('peek');
    chime('fly');
  } else {
    button.setAttribute('aria-expanded', String(!revealed));
    button.classList.toggle('revealed', !revealed);
    button.classList.remove('peek');
    if (revealed) message = 'Ele se escondeu de novo. Cadê?';
    chime(revealed ? 'magic' : 'fly');
  }
  button.dataset.touchedAt = String(performance.now());
  scene.classList.add('show-reaction');
  showReaction(scene, message, button);
  clearTimeout(reactionTimer);
  reactionTimer = setTimeout(() => resetReaction(scene), 4000);
}
function bindDrag() {
  const object = document.querySelector('.interactive-object');
  const scene = document.querySelector('.scene');
  const field = scene.querySelector('.scene-playfield');
  let drag = null;
  object.addEventListener('pointerdown', event => {
    // A mão apoiada na tela vira o ponteiro primário; o dedo que arrasta pode não ser, e um segundo dedo não rouba o arraste.
    if (event.button !== 0 || drag) return;
    const objectBox = object.getBoundingClientRect();
    const sceneBox = field.getBoundingClientRect();
    const restX = object.style.getPropertyValue('--object-x');
    const restY = object.style.getPropertyValue('--object-y');
    object.classList.add('dragging');
    object.style.setProperty('--object-x', `${objectBox.left + objectBox.width/2 - sceneBox.left}px`);
    object.style.setProperty('--object-y', `${objectBox.top + objectBox.height/2 - sceneBox.top}px`);
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: objectBox.left + objectBox.width / 2 - sceneBox.left, y: objectBox.top + objectBox.height / 2 - sceneBox.top, box: sceneBox, moved: false, restX, restY };
    object.setPointerCapture(event.pointerId);
  });
  object.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 7) return;
    drag.moved = true;
    object.classList.add('dragging');
    const radius = object.offsetWidth / 2 + 5;
    const halfHeight = object.offsetHeight / 2 + 5;
    const x = Math.max(radius, Math.min(drag.box.width - radius, drag.x + dx));
    const y = Math.max(halfHeight, Math.min(drag.box.height - halfHeight, drag.y + dy));
    moveSceneObject(scene,x,y);
  });
  const end = event => {
    if (!drag || event.pointerId !== drag.id) return;
    const { moved, restX, restY } = drag;
    drag = null;
    // Sem arraste, a posição do voo medida no pointerdown não vira o novo poleiro.
    if (!moved) { object.style.setProperty('--object-x', restX); object.style.setProperty('--object-y', restY); }
    object.classList.remove('dragging');
    if (object.hasPointerCapture(event.pointerId)) object.releasePointerCapture(event.pointerId);
    if (moved && event.type === 'pointerup') {
      suppressObjectClick = true;
      interact();
      setTimeout(() => { suppressObjectClick = false; }, 80);
    }
  };
  object.addEventListener('pointerup', end);
  object.addEventListener('pointercancel', end);
  object.addEventListener('lostpointercapture', end);
}
function emptySceneTap(clientX, clientY) {
  const scene = document.querySelector('.scene');
  if (!scene) return;
  const box = scene.getBoundingClientRect();
  const sparkle = document.createElement('span');
  sparkle.className = 'tap-sparkle';
  sparkle.setAttribute('aria-hidden', 'true');
  sparkle.style.left = `${clientX - box.left}px`;
  sparkle.style.top = `${clientY - box.top}px`;
  sparkle.innerHTML = Array.from({ length: 5 }, (_, i) => `<i style="--angle:${i * 72 - 90}deg;--delay:${i * 25}ms"></i>`).join('');
  scene.append(sparkle);
  // Com movimento reduzido não há animationend; o brilho sai pelo relógio.
  setTimeout(() => sparkle.remove(), 900);
  const main = scene.querySelector('.interactive-object');
  if (main && !scene.classList.contains('interacted') && !main.classList.contains('dragging')) {
    main.classList.remove('nudge');
    void main.offsetWidth;
    main.classList.add('nudge');
    clearTimeout(nudgeTimer);
    nudgeTimer = setTimeout(() => main.classList.remove('nudge'), 700);
  }
  const now = performance.now();
  if (now - lastEmptyTap > 400) { lastEmptyTap = now; chime('tap'); }
}
function bindSwipe() {
  let start = null;
  const book = document.querySelector('.book');
  const touchEvents = 'ontouchstart' in window;
  const cancel = () => {
    const turn = start?.turn;
    start = null;
    if (turn && pageTurn === turn) void settlePageTurn(turn, false);
  };
  const down = event => {
    if (!event.isPrimary) { cancel(); return; }
    if (pageTurn || event.target.closest('button,a') || document.querySelector('dialog[open]')) return;
    start = { id:event.pointerId, source:event.inputSource || 'pointer', target:event.target, x:event.clientX, y:event.clientY, time:performance.now(), turn:null, dx:0 };
  };
  const move = event => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.turn) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { start = null; return; }
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
      const turn = preparePageTurn(pageIndex + (dx < 0 ? 1 : -1));
      if (!turn) { start = null; return; }
      start.turn = turn;
      if (start.source === 'pointer') {
        try { book.setPointerCapture(event.pointerId); } catch { /* The gesture can continue inside the book. */ }
      }
    }
    event.preventDefault();
    start.dx = dx;
    const direction = start.turn.next > pageIndex ? -1 : 1;
    const distance = Math.max(0, dx * direction);
    const progress = Math.min(.92, distance / Math.max(160, book.clientWidth * .6));
    start.turn.progress = progress;
    turnProgress(start.turn, progress);
  };
  const up = event => {
    if (!start || event.pointerId !== start.id) return;
    const gesture = start;
    start = null;
    if (!gesture.turn) {
      // O dedo levantou sem deslizar. O Safari do iPad não gera click no toque de um div, então o personagem pintado
      // responde aqui; o resto da pintura, fora dos alvos, solta um brilho leve.
      if (Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) < 10 && performance.now() - gesture.time < 700) {
        const spot = gesture.target?.closest?.('.scene-hotspot');
        // Sem o preventDefault, o WebKit redireciona o click sintetizado para o botão vizinho e conta o toque duas vezes.
        if (spot) { event.preventDefault(); interact(spot); }
        else if (gesture.target?.closest?.('.scene') && !gesture.target.closest('[data-action]')) emptySceneTap(event.clientX, event.clientY);
      }
      return;
    }
    const elapsed = Math.max(1, performance.now() - gesture.time);
    // Safari can coalesce movement before lift-off. The release position is the
    // completed gesture; using the last move can turn a real swipe into a short one.
    const distance = (event.clientX - gesture.x) * (gesture.turn.next > pageIndex ? -1 : 1);
    // Um peteleco curto ou um risco lento da criança sobre a pintura não vira a página; o gesto do adulto continua virando.
    const complete = distance >= Math.min(110, book.clientWidth * .2) || (distance > 60 && distance / elapsed > .45);
    void settlePageTurn(gesture.turn, complete);
  };
  const lostCapture = event => {
    // Touch begins with implicit capture on the image. Transferring it to the
    // book emits a bubbling loss from that child; only a loss by the book ends our swipe.
    if (event.target === book && start?.source === 'pointer' && start.id === event.pointerId) cancel();
  };
  // iPad scroll arbitration can cancel Pointer Events while the finger still
  // delivers a valid touchend. Track that finger directly and consume only the
  // horizontal gesture; native vertical scrolling remains available.
  const pointerDown = event => { if (!touchEvents || event.pointerType !== 'touch') down(event); };
  const pointerMove = event => { if (!touchEvents || event.pointerType !== 'touch') move(event); };
  const pointerUp = event => { if (!touchEvents || event.pointerType !== 'touch') up(event); };
  const pointerCancel = event => { if (start?.source === 'pointer' && start.id === event.pointerId) cancel(); };
  const touchPoint = (event, touch) => ({
    target:event.target, pointerId:touch.identifier, clientX:touch.clientX, clientY:touch.clientY,
    isPrimary:true, inputSource:'touch', preventDefault:() => { if (event.cancelable) event.preventDefault(); }
  });
  const touchDown = event => {
    if (event.touches.length !== 1) { cancel(); return; }
    down(touchPoint(event, event.touches[0]));
  };
  const touchMove = event => {
    if (event.touches.length !== 1) { cancel(); return; }
    if (start?.source !== 'touch') return;
    const touch = Array.from(event.touches).find(point => point.identifier === start.id);
    if (touch) move(touchPoint(event, touch));
  };
  const touchUp = event => {
    if (start?.source !== 'touch') return;
    const touch = Array.from(event.changedTouches).find(point => point.identifier === start.id);
    if (touch) up(touchPoint(event, touch));
  };
  book.addEventListener('pointerdown', pointerDown);
  book.addEventListener('pointermove', pointerMove, { passive:false });
  book.addEventListener('pointerup', pointerUp);
  book.addEventListener('pointercancel', pointerCancel);
  book.addEventListener('lostpointercapture', lostCapture);
  if (touchEvents) {
    book.addEventListener('touchstart', touchDown, { passive:true });
    book.addEventListener('touchmove', touchMove, { passive:false });
    book.addEventListener('touchend', touchUp);
    book.addEventListener('touchcancel', cancel);
  }
  swipeCleanup = () => {
    const pointer = start?.source === 'pointer' ? start.id : undefined;
    start = null;
    if (pointer !== undefined && book.hasPointerCapture?.(pointer)) book.releasePointerCapture(pointer);
    book.removeEventListener('pointerdown', pointerDown);
    book.removeEventListener('pointermove', pointerMove);
    book.removeEventListener('pointerup', pointerUp);
    book.removeEventListener('pointercancel', pointerCancel);
    book.removeEventListener('lostpointercapture', lostCapture);
    book.removeEventListener('touchstart', touchDown);
    book.removeEventListener('touchmove', touchMove);
    book.removeEventListener('touchend', touchUp);
    book.removeEventListener('touchcancel', cancel);
  };
}

function makeDialog(html, className = '', trigger = document.activeElement) {
  document.querySelector('dialog')?.close();
  document.querySelector('dialog')?.remove();
  // No Safari, tocar num botão não lhe dá foco: quem abre o diálogo informa o botão.
  dialogFocus = trigger;
  const dialog = document.createElement('dialog');
  dialog.className = `modal ${className}`;
  dialog.innerHTML = html;
  const heading = dialog.querySelector('h2');
  if (heading) { heading.id = 'modal-title'; dialog.setAttribute('aria-labelledby', 'modal-title'); }
  document.body.append(dialog);
  dialog.addEventListener('click', event => {
    // O alvo também é o próprio <dialog> no padding e entre os filhos; a comemoração fecha só pelos botões.
    if (event.target !== dialog || dialog.classList.contains('finish-modal')) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(true);
  });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(true); });
  dialog.showModal();
  syncWakeLock();
}
// resume só nos fechamentos feitos pela pessoa: route() também fecha, e ali a página vai ser trocada.
function closeDialog(resume = false) {
  const dialog = document.querySelector('dialog');
  dialog?.close(); dialog?.remove();
  const target = dialogFocus;
  dialogFocus = null;
  if (target?.isConnected) target.focus();
  syncWakeLock();
  if (resume) resumePendingAdvance();
}
function settings(trigger) {
  const toggles = [
    ['sounds', 'Sons das descobertas', 'Pequenos sons quando ela toca nos objetos.', 'sound'],
    ['autoRead', 'Ouvir ao passar a página', 'Começa depois do primeiro toque em “Ouvir”.', 'book'],
    ['autoAdvance', 'Contar o livro inteiro', 'Passa as páginas depois de cada leitura.', 'sound'],
    ['largeText', 'Letras maiores', 'Um pouco mais de espaço para cada palavrinha.', 'search'],
    ['reducedMotion', 'Animações tranquilas', 'Reduz movimentos; mantém as descobertas.', 'sparkle'],
    ['night', 'Modo aconchegante', 'Uma biblioteca mais escura para o fim do dia.', 'moon']
  ];
  const support = offlineSupport();
  const offlineLocked = support !== 'ok' || downloadingBooks;
  const offlineText = support !== 'ok' ? OFFLINE_MESSAGES[support] : downloadingBooks ? booksProgressText() : offlineReady ? 'Conferindo os livros guardados…' : 'Preparando a biblioteca neste dispositivo…';
  makeDialog(`<button class="modal-close icon-button" data-action="close-dialog" aria-label="Fechar ajustes">${icon('close')}</button><div class="modal-heading"><span class="eyebrow">PARA QUEM LÊ COM A MANU</span><h2>Do nosso jeitinho.</h2><p>Pequenos ajustes para um momento gostoso.</p></div><div class="settings-list">${toggles.map(([key, label, detail, symbol]) => `<label class="setting-row">${icon(symbol)}<span><strong>${label}</strong><small>${detail}</small></span><input type="checkbox" data-setting="${key}" ${state.settings[key] ? 'checked' : ''}><span class="toggle-track" aria-hidden="true"></span></label>`).join('')}</div><label class="voice-speed"><span>Ritmo da leitura</span><select data-setting="rate"><option value="0.75" ${state.settings.rate === 0.75 ? 'selected' : ''}>Mais devagar</option><option value="0.85" ${state.settings.rate === 0.85 ? 'selected' : ''}>Como foi gravada</option><option value="1" ${state.settings.rate === 1 ? 'selected' : ''}>Um pouco mais rápida</option></select></label><section class="music-settings"><h3>Uma musiquinha de fundo</h3><p>Escolha um som suave para acompanhar a história.</p><label><span>Nosso ambiente</span><select data-setting="musicPreset">${MUSIC_PRESETS.map(p => `<option value="${p.id}" ${state.settings.musicPreset === p.id ? 'selected' : ''}>${p.label}</option>`).join('')}</select></label><label><span>Volume da música</span><input type="range" data-setting="musicVolume" min="0" max="1" step="0.05" value="${state.settings.musicVolume}" aria-label="Volume da música de fundo"></label><button class="button secondary music-start" data-action="music">${icon('music')} ${music.getState().playing ? 'Parar música' : 'Ouvir música'}</button><small>A música fica mais baixinha durante a leitura em voz alta.</small></section><section class="offline-settings"><h3>Levar a Manu com você</h3><p>Para instalar no iPad: no Safari, toque em Compartilhar e em “Adicionar à Tela de Início”.</p><button class="button secondary" data-action="download-books" ${offlineLocked ? 'disabled' : ''}>${booksButton()}</button><span class="offline-status" role="status" aria-live="polite">${offlineText}</span></section><div class="parent-note">${icon('heart')}<p>Recontos suaves para a Manu explorar com um adulto. Cada página tem narração em português, com a opção de contar o livro inteiro. Favoritas e marcador são salvos neste navegador.</p></div><button class="button primary modal-done" data-action="close-dialog">Tudo pronto ${icon('check')}</button>`, 'settings-modal', trigger);
  updateMusicUI();
  if (!offlineLocked) void showSavedBooks();
}
function updateMusicUI() {
  if (!music) return;
  const playing = music.getState().playing;
  document.querySelectorAll('[data-action="music"]').forEach(button => {
    if (!button.classList.contains('music-start')) button.setAttribute('aria-pressed',String(playing));
    button.classList.toggle('music-playing',playing);
    button.innerHTML = `${icon(playing ? 'pause' : 'music')}${button.classList.contains('music-start') ? `<span>${playing ? 'Parar música' : 'Ouvir música'}</span>` : ''}`;
  });
}
async function toggleMusic() {
  // Um toque duplo de criança ligaria e desligaria a música em seguida.
  const now = performance.now();
  if (musicStarting || now - lastMusicToggle < 600) return;
  lastMusicToggle = now;
  if (music.getState().playing) { music.stop(); return; }
  musicStarting = true;
  const started = await music.start(state.settings.musicPreset,state.settings.musicVolume).finally(() => { musicStarting = false; });
  if (!started) toast('Toque novamente para começar a musiquinha neste dispositivo.');
  music.duck(narration === 'speaking');
}
const booksProgressText = (progress = booksProgress) => progress ? `Guardando livros e áudios: ${progress.done} de ${progress.total}…` : 'Guardando livros e áudios…';
const booksButton = ({ done = 0, total = 0 } = {}) => `${icon('download')} ${total && done >= total ? 'Conferir os livros guardados' : done > 0 ? 'Completar os livros guardados' : 'Guardar livros para usar sem internet'}`;
const aboutMegabytes = bytes => bytes < 1e6 ? 'menos de 1 MB' : `cerca de ${Math.round(bytes / 1e6).toLocaleString('pt-BR')} MB`;
async function showSavedBooks() {
  const check = ++offlineCheck;
  const result = await getOfflineStatus();
  const status = document.querySelector('.offline-status');
  // Os ajustes podem ter sido fechados ou reabertos, ou um download começou: esta resposta ficou velha.
  if (check !== offlineCheck || downloadingBooks || !status) return;
  status.textContent = result.code ? result.error : result.ok ? `Livros guardados neste dispositivo: ${result.done} de ${result.total}.` : result.done > 0 ? `Guardados ${result.done} de ${result.total}. Faltam ${aboutMegabytes(result.missingBytes)}.` : `Ainda não guardados. O download tem ${aboutMegabytes(result.missingBytes)}.`;
  const button = document.querySelector('[data-action="download-books"]');
  if (!button) return;
  button.innerHTML = booksButton(result);
  button.disabled = ['inseguro', 'sem-sw'].includes(result.code);
}
async function cacheBooks() {
  if (downloadingBooks) return;
  downloadingBooks = true;
  offlineCheck += 1;
  const button = document.querySelector('[data-action="download-books"]');
  if (button) button.disabled = true;
  const update = message => { const status=document.querySelector('.offline-status'); if (status) status.textContent=message; };
  update(booksProgressText());
  const result = await downloadBooks(progress => { booksProgress = progress; update(booksProgressText()); });
  downloadingBooks = false;
  booksProgress = null;
  const partial = result.code && result.total && result.done < result.total ? `Guardamos ${result.done} de ${result.total}. ` : '';
  update(result.ok ? 'Livros guardados! Você pode brincar e ler sem internet neste dispositivo.' : partial + (result.error || 'Não foi possível guardar tudo. Confira a conexão e tente novamente.'));
  // Se os ajustes foram reabertos durante o download, o botão na tela é outro.
  const shown = document.querySelector('[data-action="download-books"]');
  if (!shown) return;
  shown.innerHTML = booksButton(result);
  shown.disabled = ['inseguro', 'sem-sw'].includes(result.code);
}
function finish(trigger) {
  if (pageTurn) return;
  exitImmersiveReading();
  stopNarration();
  state.progress[current.id] = { page: current.pages.length - 1, completed: true };
  save();
  const story = current;
  const nextStory = stories[(stories.indexOf(story) + 1) % stories.length];
  chime('hearts');
  makeDialog(`<button class="modal-close icon-button" data-action="close-dialog" aria-label="Voltar ao livro">${icon('close')}</button><div class="finish-illustration">${prop('heart')}<span>✧</span><i>✦</i></div><span class="eyebrow">E VIVERAM FELIZES…</span><h2>Fim da história.<br>Começo de um abraço!</h2><p>${story.dedication}</p><div class="finish-buttons"><a class="button primary" href="#/" data-close="true">${icon('book')} Escolher outra história</a><button class="button secondary" data-action="reread">${icon('repeat')} Ler de novo</button></div><a class="next-story-link" href="#/livro/${nextStory.id}/1" data-close="true">Que tal ${nextStory.short}? ${icon('arrow')}</a>`, 'finish-modal', trigger?.offsetParent ? trigger : document.querySelector('.page-next'));
}
function atelierMusicButton() {
  // coloring.js monta o cabeçalho sem música; o botão entra ao lado do rótulo do lápis, na mesma coluna da grade.
  const label = app.querySelector('.atelier-header .pencil-label');
  if (!label) return;
  const tools = document.createElement('div');
  tools.className = 'atelier-tools';
  label.replaceWith(tools);
  tools.append(label);
  tools.insertAdjacentHTML('beforeend', `<button class="icon-button atelier-music" data-action="music" aria-label="Música de fundo" aria-pressed="false">${icon('music')}</button>`);
  updateMusicUI();
}
function route() {
  sceneCleanup?.(); sceneCleanup = null;
  swipeCleanup?.(); swipeCleanup = null; clearPageTurn();
  paintCleanup?.(); paintCleanup = null;
  closeDialog();
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  if (parts[0] !== 'livro') exitImmersiveReading();
  if (parts[0] === 'pintar') {
    stopNarration(); pendingNarrate = false; current = null; document.body.classList.remove('reading');
    document.title = 'Ateliê da Manu · Cores que ganham vida';
    paintCleanup = mountColoring(app, { id: parts[1], icon, sound: chime, muted:!state.settings.sounds, reducedMotion:state.settings.reducedMotion });
    atelierMusicButton();
    window.scrollTo(0,0); return;
  }
  if (parts[0] === 'livro') {
    const story = getStory(parts[1]);
    if (story) {
      const number = /^\d+$/.test(parts[2] ?? '') ? Number(parts[2]) : 1;
      const index = Math.min(Math.max(number - 1, 0), story.pages.length - 1);
      // replaceState não dispara hashchange.
      if (parts[2] !== String(index + 1)) history.replaceState(null, '', `#/livro/${story.id}/${index + 1}`);
      renderReader(story, index);
      // O hash do livro não aponta para nenhum id: sem isto a página nova herda a rolagem anterior. 'instant' evita o scroll-behavior:smooth do html.
      try { window.scrollTo({ top:0, behavior:'instant' }); } catch { window.scrollTo(0, 0); }
      return;
    }
    history.replaceState(null, '', '#/');
    toast('Vamos escolher uma história na biblioteca.');
  } else if (parts[0]) history.replaceState(null, '', '#/');
  // Voltar de um livro ou do Ateliê sempre mostra a biblioteca inteira, como diz o rótulo «Biblioteca».
  view = 'library'; category = categories[0]; query = '';
  renderLibrary();
  window.scrollTo(0, 0);
}

document.addEventListener('click', event => {
  // href="#main" mudaria o hash e o route() trataria «main» como rota.
  const skip = event.target.closest('.skip-link');
  if (skip) {
    event.preventDefault();
    const main = document.querySelector('#main');
    const target = document.querySelector('#page-title, #library-heading') || main;
    if (target === main && main && !main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    target?.focus();
    return;
  }
  // Na biblioteca, a marca e os links para #/ não disparam hashchange.
  if (event.target.closest('a[href="#/"]') && location.hash === '#/' && !document.querySelector('dialog[open]')) { view = 'library'; category = categories[0]; query = ''; renderLibrary(); window.scrollTo(0, 0); }
  const button = event.target.closest('[data-action]');
  if (event.target.closest('[data-close]')) closeDialog();
  if (!button) return;
  switch (button.dataset.action) {
    case 'library': view = 'library'; category = categories[0]; query = ''; renderLibrary(true); break;
    case 'favorites': view = 'favorites'; category = categories[0]; query = ''; renderLibrary(true); break;
    case 'favorite': {
      const id = button.dataset.id;
      if (!getStory(id)) break;
      if (state.favorites.includes(id)) state.favorites = state.favorites.filter(item => item !== id); else state.favorites.push(id);
      save();
      const selected = state.favorites.includes(id);
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      if (view === 'favorites' && !current) renderGrid();
      announcer.textContent = `${getStory(id).title} ${selected ? 'guardada nas favoritas' : 'removida das favoritas'}.`;
      break;
    }
    case 'category': category = categories[Number(button.dataset.index)] || categories[0]; document.querySelectorAll('.category').forEach((el, index) => { const active = categories[index] === category; el.classList.toggle('active', active); el.setAttribute('aria-pressed', String(active)); }); renderGrid(); break;
    case 'reset-filter': view = 'library'; category = categories[0]; query = ''; renderLibrary(true); break;
    case 'night': state.settings.night = !state.settings.night; save(); settingsClass(); break;
    case 'settings': settings(button); break;
    case 'close-dialog': closeDialog(true); break;
    case 'fullscreen': enterImmersiveReading(); break;
    case 'exit-fullscreen': exitImmersiveReading(true); break;
    case 'narrate': narrate(); break;
    case 'music': void toggleMusic(); break;
    case 'download-books': void cacheBooks(); break;
    case 'interact': if (suppressObjectClick) { suppressObjectClick = false; break; } interact(button); break;
    case 'surprise': surprise(); break;
    case 'extra': interactExtra(Number(button.dataset.extra)); break;
    case 'previous': setPage(pageIndex - 1); break;
    case 'next': if (current) pageIndex === current.pages.length - 1 ? finish(button) : setPage(pageIndex + 1); break;
    case 'page': setPage(Number(button.dataset.page)); break;
    case 'reread': { closeDialog(); if (current) { state.progress[current.id] = { page: 0, completed: false }; save(); setPage(0); } break; }
  }
});
document.addEventListener('input', event => { if (event.target.dataset.setting === 'musicVolume') { state.settings.musicVolume=Number(event.target.value); music.setVolume(state.settings.musicVolume); save(); } if (event.target.id === 'story-search') { query = event.target.value; renderGrid(); } });
document.addEventListener('change', event => {
  const setting = event.target.dataset.setting;
  if (!setting || !(setting in defaults.settings)) return;
  state.settings[setting] = ['rate','musicVolume'].includes(setting) ? Number(event.target.value) : setting === 'musicPreset' ? event.target.value : event.target.checked;
  if (setting === 'autoAdvance' && state.settings.autoAdvance) state.settings.autoRead = true;
  if (setting === 'autoRead' && !state.settings.autoRead) state.settings.autoAdvance = false;
  for (const key of ['autoRead', 'autoAdvance']) {
    const checkbox = document.querySelector(`input[data-setting="${key}"]`);
    if (checkbox) checkbox.checked = state.settings[key];
  }
  if (setting === 'musicPreset' && music.getState().playing) void music.start(state.settings.musicPreset,state.settings.musicVolume);
  if (setting === 'musicVolume') music.setVolume(state.settings.musicVolume);
  save(); settingsClass();
  if (setting === 'autoRead') stopNarration();
  // O elemento aceita a nova velocidade no meio da fala; narrate() a reaplica a cada página.
  if (setting === 'rate') narratorAudio.playbackRate = state.settings.rate / .85;
});
document.addEventListener('keydown', event => {
  if (document.querySelector('dialog[open]') || event.target.closest('input,select,textarea')) return;
  if (!current) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); setPage(pageIndex + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); setPage(pageIndex - 1); }
  if (event.key === 'Escape') {
    if (immersiveReading) { event.preventDefault(); exitImmersiveReading(true); }
    else location.hash = '/';
  }
});
// No Safari do iPad, :active só acende com um ouvinte de toque, e a pinça só para com gesturestart: user-scalable=no é ignorado.
document.addEventListener('touchstart', () => {}, { passive:true });
for (const type of ['gesturestart', 'gesturechange']) document.addEventListener(type, event => event.preventDefault(), { passive:false });
// Oculta (ligação, troca de app, bloqueio): a voz pausa no ponto em que estava e espera um toque em Continuar.
document.addEventListener('visibilitychange', () => { if (document.hidden) { swipeCleanup?.(); swipeCleanup = null; clearPageTurn(); pendingAdvance = pendingNarrate = false; if (narration === 'speaking') pauseNarration(); audioContext?.suspend().catch(() => {}); } else if (current) { swipeCleanup?.(); bindSwipe(); } syncWakeLock(); });
window.addEventListener('pagehide', () => { swipeCleanup?.(); swipeCleanup = null; clearPageTurn(); exitImmersiveReading(); stopNarration(); music.stop(); });
window.addEventListener('hashchange', route);
route();
void setupOffline().then(registration => { offlineReady = Boolean(registration); }).catch(() => {});
