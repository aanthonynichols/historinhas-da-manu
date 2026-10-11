/** Original, quiet instrumental loops. Call start() directly from a user gesture. */
export const MUSIC_PRESETS = Object.freeze([
  Object.freeze({ id: 'jardim', label: 'Jardim encantado' }),
  Object.freeze({ id: 'soninho', label: 'Hora do soninho' }),
  Object.freeze({ id: 'passeio', label: 'Passeio nas nuvens' }),
]);

const COMPOSITIONS = {
  jardim: {
    bpm: 66, tone: 'bell', decay: 2.5, cutoff: 2200,
    chords: [[48, 55, 64], [45, 52, 60], [53, 60, 69], [55, 62, 67]],
    // Each tuple is [beat within a 16-beat phrase, MIDI pitch, duration].
    melody: [[0, 76, 2], [2, 79, 1], [3, 74, 1], [4, 72, 2], [6, 76, 2],
      [8, 77, 2], [10, 81, 1], [11, 79, 1], [12, 74, 2], [14, 72, 2]],
    answer: [[1, 67, 1.8], [5, 64, 1.8], [9, 69, 1.8], [13, 67, 1.8]],
  },
  soninho: {
    bpm: 48, tone: 'lullaby', decay: 3.4, cutoff: 1500,
    chords: [[48, 55, 64], [53, 60, 64], [45, 52, 60], [55, 59, 62]],
    melody: [[0, 72, 2], [2, 76, 2], [4, 77, 3], [7, 76, 1],
      [8, 72, 2], [10, 69, 2], [12, 71, 2], [14, 67, 2]],
    answer: [[3, 64, 2], [11, 60, 2]],
  },
  passeio: {
    bpm: 76, tone: 'pluck', decay: 1.6, cutoff: 2000,
    chords: [[50, 57, 66], [55, 62, 66], [47, 54, 62], [57, 61, 64]],
    melody: [[0, 74, 1.5], [1.5, 78, 1], [3, 81, 1], [4, 79, 1.5],
      [6, 78, 1], [7, 74, 1], [8, 71, 1.5], [10, 74, 1],
      [11, 78, 1], [12, 76, 1.5], [14, 73, 1], [15, 69, 1]],
    answer: [[0.75, 62, 1], [4.75, 66, 1], [8.75, 62, 1], [12.75, 64, 1]],
  },
};

const clampVolume = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(1, number)) : 0.5;
};
const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

/**
 * createMusicPlayer({ onStateChange? })
 * start(preset = 'jardim', volume = .5): Promise<boolean>
 * stop(), setVolume(0..1), duck(boolean), dispose(), getState()
 * A hidden page stops playback; a fresh explicit start is required afterward.
 * A system interruption (Siri, alarm, call) resumes by itself when the context runs again, or on the next tap.
 * onStateChange receives { playing, preset, volume, ducked, reason }.
 */
export function createMusicPlayer({ onStateChange } = {}) {
  let context;
  let bus;
  let master;
  let reverb;
  let wet;
  let filter;
  let timer = null;
  let playing = false;
  let disposed = false;
  let preset = 'jardim';
  let volume = 0.5;
  let ducked = false;
  let resumeWanted = false;
  let generation = 0;
  let nextPhrase = 0;
  let phraseCount = 0;
  let events = [];
  const voices = new Set();

  // While the system holds the audio, the music stays switched on for the interface.
  const getState = (reason = null) => ({ playing: playing || resumeWanted, preset, volume, ducked, reason });
  const notify = (reason) => {
    if (typeof onStateChange === 'function') onStateChange(getState(reason));
  };
  // 0.5 keeps the default near -37 dBFS RMS: audible beside the voice and below the discovery sounds.
  const targetVolume = () => volume * 0.5 * (ducked ? 0.3 : 1);

  function hold(param, now) {
    const value = param.value;
    // cancelAndHoldAtTime adds no event once the last ramp has ended, so the next ramp would start from that old point.
    if (typeof param.cancelAndHoldAtTime === 'function') param.cancelAndHoldAtTime(now);
    else param.cancelScheduledValues(now);
    param.setValueAtTime(value, now);
  }

  function adjustMaster(seconds = 0.16) {
    if (!context || !master) return;
    const now = context.currentTime;
    hold(master.gain, now);
    master.gain.linearRampToValueAtTime(playing ? targetVolume() : 0, now + seconds);
  }

  function createGraph() {
    const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AudioContextClass) return false;
    context = new AudioContextClass();
    bus = context.createGain();
    filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.4;
    master = context.createGain();
    master.gain.value = 0;
    reverb = context.createConvolver();
    wet = context.createGain();
    wet.gain.value = 0.16;

    // A deterministic short room keeps bells soft without an external asset.
    const length = Math.floor(context.sampleRate * 1.8);
    const impulse = context.createBuffer(2, length, context.sampleRate);
    let seed = 7219;
    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        seed = (seed * 16807) % 2147483647;
        const envelope = (1 - i / length) ** 3;
        data[i] = (seed / 2147483647 * 2 - 1) * envelope * 0.35;
      }
    }
    reverb.buffer = impulse;
    bus.connect(filter);
    filter.connect(master);
    filter.connect(reverb);
    reverb.connect(wet);
    wet.connect(master);
    master.connect(context.destination);
    context.onstatechange = () => {
      if (context.state === 'running') resumeAfterInterruption();
      else if (playing) stop('interrupted');
    };
    return true;
  }

  function releaseVoice(voice) {
    voice.oscillators.forEach((oscillator) => {
      oscillator.onended = null;
      oscillator.disconnect();
    });
    voice.gain.disconnect();
    voices.delete(voice);
  }

  function note(midi, at, duration, strength, pad = false) {
    // The scheduler never creates far-future nodes; at most a handful overlap.
    const gain = context.createGain();
    gain.connect(bus);
    const base = frequency(midi);
    const settings = COMPOSITIONS[preset];
    const attack = pad ? 0.7 : settings.tone === 'lullaby' ? 0.12 : 0.025;
    const sustain = pad ? duration : Math.min(duration, settings.decay);
    const end = at + Math.max(attack + 0.15, sustain) + (pad ? 0.9 : 0.7);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(strength, at + attack);
    if (pad) {
      gain.gain.setValueAtTime(strength * 0.8, at + Math.max(attack, sustain - 0.4));
      gain.gain.linearRampToValueAtTime(0, end);
    } else {
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      gain.gain.setValueAtTime(0, end + 0.015);
    }
    const oscillators = [];
    // Fundamental plus a restrained upper harmonic; no sharp saw/square waves.
    const layers = pad ? [[1, 'sine', -3], [1, 'sine', 3]]
      : settings.tone === 'bell' ? [[1, 'sine', 0], [2, 'sine', 0]]
        : [[1, 'sine', 0], [1, 'triangle', 0]];
    const voice = { gain, oscillators, at };
    voices.add(voice);
    layers.forEach(([ratio, type, detune], index) => {
      const oscillator = context.createOscillator();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(base * ratio, at);
      oscillator.detune.value = detune;
      // Scale the second layer through oscillator harmonics and the voice envelope.
      if (index === 1 && !pad) {
        const harmonics = context.createPeriodicWave(
          new Float32Array([0, 0]), new Float32Array([0, 0.15]),
          { disableNormalization: true },
        );
        if (type === 'sine') oscillator.setPeriodicWave(harmonics);
        else oscillator.setPeriodicWave(context.createPeriodicWave(
          new Float32Array([0, 0, 0, 0]),
          new Float32Array([0, 0.18, 0, -0.018]),
          { disableNormalization: true },
        ));
      }
      oscillator.connect(gain);
      oscillators.push(oscillator);
      oscillator.start(at);
      oscillator.stop(end + 0.025);
    });
    let ended = 0;
    oscillators.forEach((oscillator) => {
      oscillator.onended = () => {
        ended += 1;
        if (ended === oscillators.length) releaseVoice(voice);
      };
    });
  }

  function addPhrase(at) {
    const composition = COMPOSITIONS[preset];
    const beat = 60 / composition.bpm;
    for (let bar = 0; bar < 4; bar += 1) {
      composition.chords[bar].forEach((midi) => events.push({
        at: at + bar * 4 * beat, midi, duration: 4 * beat, strength: 0.035, pad: true,
      }));
    }
    composition.melody.forEach(([position, midi, duration]) => events.push({
      at: at + position * beat, midi,
      duration: duration * beat, strength: 0.12, pad: false,
    }));
    // The answering voice appears every other phrase, leaving plenty of space.
    if (phraseCount % 2 === 1) composition.answer.forEach(([position, midi, duration]) => events.push({
      at: at + position * beat, midi, duration: duration * beat, strength: 0.045, pad: false,
    }));
    phraseCount += 1;
    events.sort((a, b) => a.at - b.at);
    nextPhrase = at + 16 * beat;
  }

  function schedule() {
    if (!playing || !context || context.state !== 'running') return;
    const now = context.currentTime;
    const horizon = now + 0.35;
    if (nextPhrase <= horizon) {
      // Skip any missed phrase after a delayed timer; never burst stale notes.
      if (nextPhrase < now - 0.1) nextPhrase = now + 0.04;
      addPhrase(nextPhrase);
    }
    while (events.length && events[0].at <= horizon) {
      const event = events.shift();
      if (event.at >= now - 0.03) {
        note(event.midi, Math.max(now + 0.005, event.at), event.duration, event.strength, event.pad);
      }
    }
  }

  function resumeOnGesture() {
    // WebKit may keep the context suspended after an interruption until a gesture resumes it.
    if (resumeWanted && context && context.state !== 'running' && context.state !== 'closed') context.resume().catch(() => {});
  }

  function stop(reason = 'stopped') {
    generation += 1;
    playing = false;
    resumeWanted = reason === 'interrupted';
    globalThis.document?.[resumeWanted ? 'addEventListener' : 'removeEventListener']('pointerup', resumeOnGesture, true);
    if (timer !== null) globalThis.clearInterval(timer);
    timer = null;
    events = [];
    if (context) {
      const now = context.currentTime;
      // A user stop or a preset change fades each voice to avoid a click; other reasons cut a context about to pause.
      const fade = (reason === 'stopped' || reason === 'starting') && context.state === 'running';
      if (fade) adjustMaster(0.3);
      else {
        master?.gain.cancelScheduledValues(now);
        master?.gain.setValueAtTime(0, now);
      }
      [...voices].forEach((voice) => {
        // A note scheduled ahead has not started: it is cancelled, never faded from the gain's default of 1.
        const sounding = fade && voice.at <= now;
        if (sounding) {
          hold(voice.gain.gain, now);
          voice.gain.gain.linearRampToValueAtTime(0, now + 0.12);
        }
        voice.oscillators.forEach((oscillator) => {
          try { oscillator.stop(sounding ? now + 0.15 : 0); } catch { /* Already ended. */ }
        });
        if (!sounding) releaseVoice(voice);
      });
      // A note scheduled past the stop time may never fire ended; release whatever the fade left behind.
      const faded = [...voices];
      if (fade) globalThis.setTimeout(() => faded.forEach((voice) => { if (voices.has(voice)) releaseVoice(voice); }), 300);
    }
    notify(reason);
  }

  function begin(reason) {
    filter.frequency.setValueAtTime(COMPOSITIONS[preset].cutoff, context.currentTime);
    playing = true;
    phraseCount = 0;
    nextPhrase = context.currentTime + 0.06;
    adjustMaster(0.65);
    schedule();
    timer = globalThis.setInterval(schedule, 100);
    notify(reason);
  }

  function resumeAfterInterruption() {
    if (!resumeWanted || playing || disposed || globalThis.document?.hidden) return;
    resumeWanted = false;
    globalThis.document?.removeEventListener('pointerup', resumeOnGesture, true);
    begin('resumed');
  }

  async function start(id = 'jardim', requestedVolume = volume) {
    if (disposed || globalThis.document?.hidden) return false;
    // When exposed by the browser, reject calls that did not follow interaction.
    if (globalThis.navigator?.userActivation && !globalThis.navigator.userActivation.isActive) return false;
    stop('starting');
    const ticket = generation;
    preset = Object.hasOwn(COMPOSITIONS, id) ? id : 'jardim';
    volume = clampVolume(requestedVolume);
    try {
      if (!context && !createGraph()) {
        notify('unsupported');
        return false;
      }
      // Invoke resume synchronously in the click handler, before yielding to Safari.
      await context.resume();
      if (disposed || ticket !== generation || globalThis.document?.hidden || context.state !== 'running') return false;
      begin('started');
      return true;
    } catch {
      if (ticket === generation) stop('unavailable');
      return false;
    }
  }

  function setVolume(value) {
    volume = clampVolume(value);
    adjustMaster();
    notify('volume');
  }

  function duck(value) {
    ducked = Boolean(value);
    adjustMaster(ducked ? 0.1 : 0.45);
    notify('duck');
  }

  function handleVisibility() {
    if (globalThis.document?.hidden && (playing || resumeWanted)) {
      stop('hidden');
      context?.suspend().catch(() => {});
    }
  }
  globalThis.document?.addEventListener('visibilitychange', handleVisibility);

  function dispose() {
    if (disposed) return;
    disposed = true;
    stop('disposed');
    globalThis.document?.removeEventListener('visibilitychange', handleVisibility);
    if (context) {
      context.onstatechange = null;
      [bus, filter, reverb, wet, master].forEach((node) => node?.disconnect());
      context.close().catch(() => {});
    }
  }

  return { start, stop, setVolume, duck, dispose, getState };
}
