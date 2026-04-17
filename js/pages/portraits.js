// --- GESTION DE L'AUDIO (Web Audio API) ---
const files = [
  "audio/arirang_full.mp3", // Ambiance globale
  "audio/arirang_bass.mp3", // Portrait 1
  "audio/arirang_harp.mp3", // Portrait 2
  "audio/arirang_piano.mp3", // Portrait 3
  "audio/arirang_oboe.mp3", // Portrait 4
];

// AudioContext créé uniquement lors de la première interaction utilisateur
// pour respecter la politique d'autoplay des navigateurs.
let audioCtx = null;
let buffers = [],
  sources = [],
  gains = [];
let keepFocus = false;
let currentIndex = null;
let masterVolume = 0.6;
let _rawBuffers = null;
let _audioSetupDone = false;

window.portraitsAudioStarted = false;

// Préchargement des fichiers audio en ArrayBuffer (sans AudioContext)
Promise.all(
  files.map((url) => fetch(url).then((r) => r.arrayBuffer()))
).then((data) => {
  _rawBuffers = data;
  if (window.shouldPlayPortraitsAudio) {
    window.startPortraitsAudio();
  }
});

function fadeTo(gainNode, to, duration = 1.2) {
  if (!gainNode || !audioCtx) return;
  const now = audioCtx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(to * masterVolume, now + duration);
}

window.startPortraitsAudio = function () {
  if (window.isGloballyMuted) return;
  // Crée l'AudioContext lors de la première interaction utilisateur
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (!_audioSetupDone) {
    if (!_rawBuffers) {
      // Préchargement pas encore terminé ; on démarre dès qu'il sera prêt
      window.shouldPlayPortraitsAudio = true;
      return;
    }
    _audioSetupDone = true;
    // Décodage des ArrayBuffers avec le nouvel AudioContext
    Promise.all(
      _rawBuffers.map((data) => audioCtx.decodeAudioData(data))
    ).then((loadedBuffers) => {
      buffers = loadedBuffers;
      for (let i = 0; i < buffers.length; i++) {
        const gain = audioCtx.createGain();
        gain.gain.value = i === 0 ? 0.6 : 0;
        const src = audioCtx.createBufferSource();
        src.buffer = buffers[i];
        src.loop = true;
        src.connect(gain).connect(audioCtx.destination);
        sources.push(src);
        gains.push(gain);
      }
      const now = audioCtx.currentTime + 0.1;
      sources.forEach((src) => {
        try {
          src.start(now);
        } catch (e) {}
      });
      if (gains.length) {
        gains[0].gain.setValueAtTime(0, audioCtx.currentTime);
        gains[0].gain.linearRampToValueAtTime(
          masterVolume,
          audioCtx.currentTime + 1.2
        );
      }
      window.portraitsAudioStarted = true;
      if (typeof window.setPortraitsMuteState === "function") {
        window.setPortraitsMuteState(
          window.isGloballyMuted !== undefined ? window.isGloballyMuted : true
        );
      }
    });
    return;
  }
  if (typeof window.setPortraitsMuteState === "function") {
    window.setPortraitsMuteState(
      window.isGloballyMuted !== undefined ? window.isGloballyMuted : true
    );
  }
  if (gains.length && audioCtx.state !== "running") {
    audioCtx.resume();
  }
};

window.setPortraitsMuteState = function (isMuted) {
  const newMasterVolume = isMuted ? 0 : 0.6;
  if (masterVolume === newMasterVolume) return;
  masterVolume = newMasterVolume;
  const duration = 0.3;
  if (keepFocus && currentIndex !== null) {
    gains.forEach((g, i) => fadeTo(g, i === currentIndex ? 1 : 0, duration));
  } else {
    fadeTo(gains[0], 1, duration);
    gains.forEach((g, i) => {
      if (i > 0) fadeTo(g, 0, duration);
    });
  }
};
window.requestPortraitsFadeOut = function (duration = 500) {
  return new Promise((resolve) => {
    try {
      if (typeof window.setPortraitsMuteState === "function") {
        window.setPortraitsMuteState(true);
      }
    } catch (e) {
      // ignore
    }
    const wait = Math.max(200, duration);
    setTimeout(() => resolve(), wait);
  });
};

// --- GESTION DES INTERACTIONS (jQuery) ---
$(document).ready(function () {
  const container = $(".portraits-container");

  // 1. Fondu d'apparition synchronisé des vidéos
  if (container.length) {
    const videos = container.find(".portrait-video");
    const videoPromises = Array.from(videos).map((video) => {
      return new Promise((resolve) => {
        if (video.readyState >= 3) {
          resolve();
        } else {
          video.addEventListener("canplaythrough", resolve, { once: true });
        }
      });
    });
    Promise.all(videoPromises).then(() => {
      container.addClass("loaded");
    });
  }

  // 2. Gestion du hover sur les portraits (visuel et audio)
  container.on("mouseenter", ".portrait-section", function () {
    container.removeClass("no-hover");
    if (keepFocus || !gains.length) return;
    const idx = $(this).index() + 1;
    if (currentIndex === idx) return;
    fadeTo(gains[0], 0, 0.8);
    gains.forEach((g, i) => {
      if (i === idx) fadeTo(g, 1, 0.8);
      else if (i > 0) fadeTo(g, 0, 0.8);
    });
    currentIndex = idx;
  });

  container.on("mouseleave", function () {
    container.addClass("no-hover");
    if (keepFocus || !gains.length) return;
    currentIndex = null;
    fadeTo(gains[0], 1, 1.2);
    gains.forEach((g, i) => {
      if (i > 0) fadeTo(g, 0, 0.6);
    });
  });

  // 3. Clic sur un portrait
  container.on("click", ".portrait-section", function () {
    const target = $(this).data("target");
    $(".portrait-section").removeClass("active");
    $(this).addClass("active");
    container.addClass("has-active");
    $(".portrait-detail").removeClass("active");
    if (target) {
      $(target).addClass("active");
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
    // Audio
    if (!gains.length) return;
    keepFocus = true;
    const idx = $(this).index() + 1;
    fadeTo(gains[0], 0, 1.2);
    gains.forEach((g, i) => fadeTo(g, i === idx ? 1 : 0, 0.4));
  });

  // 4. Clic sur le bouton "Retour"
  $(document).on("click", ".back-to-portraits", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Audio
    if (!gains.length) return;
    keepFocus = false;
    currentIndex = null;
    fadeTo(gains[0], 1, 1.2);
    gains.forEach((g, i) => {
      if (i > 0) fadeTo(g, 0, 0.6);
    });
  });
});

// --- GESTIONNAIRES GLOBAUX (window) ---
window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    $(".portrait-section, .portrait-detail").removeClass("active");
    $(".portraits-container").removeClass("has-active");
    // Si on est revenu en haut manuellement, on réinitialise le son
    if (keepFocus) {
      keepFocus = false;
      currentIndex = null;
      fadeTo(gains[0], 1, 1.2);
      gains.forEach((g, i) => {
        if (i > 0) fadeTo(g, 0, 0.6);
      });
    }
  }
});

window.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    if (gains && gains.length) gains.forEach((g) => fadeTo(g, 0, 2));
  }
  if (document.visibilityState === "visible") {
    // Ne reprend l'audio que si le son n'est pas globalement coupé
    const muted = window.isGloballyMuted !== undefined ? window.isGloballyMuted : false;
    if (gains && gains.length && !keepFocus && !muted) {
      fadeTo(gains[0], 1, 1.2);
      gains.forEach((g, i) => {
        if (i > 0) fadeTo(g, 0, 0.6);
      });
    }
    if (gains && gains.length && keepFocus && currentIndex !== null && !muted) {
      fadeTo(gains[0], 0, 1.2);
      gains.forEach((g, i) => fadeTo(g, i === currentIndex ? 1 : 0, 0.4));
    }
  }
});

window.addEventListener("beforeunload", function () {
  if (gains && gains.length) gains.forEach((g) => fadeTo(g, 0, 0.8));
});
