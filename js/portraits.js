$(document).ready(function () {
  const container = $(".portraits-container");

  // Ajoute la classe "no-hover" lorsque la souris quitte le conteneur
  container.on("mouseleave", function () {
    container.addClass("no-hover");
  });

  // Retire la classe "no-hover" lorsque la souris entre dans le conteneur
  container.on("mouseenter", function () {
    container.removeClass("no-hover");
  });

  //  ------------------------ Clic sur un portrait ------------------------ //
  $(".portrait-section").on("click", function () {
    const target = $(this).data("target");
    // Retire .active de tous les portraits
    $(".portrait-section").removeClass("active");
    // Ajoute .active à celui cliqué
    $(this).addClass("active");
    // Masque tous les détails
    $(".portrait-detail").removeClass("active");
    // Affiche le détail correspondant
    if (target) {
      $(target).addClass("active");
      // Scroll vers la section de détail
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});
$(document).on("click", ".back-to-portraits", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });

  function removeActiveWhenAtTop() {
    if (window.scrollY === 0) {
      $(".portrait-detail").removeClass("active");
      $(".portrait-section").removeClass("active");
      window.removeEventListener("scroll", removeActiveWhenAtTop);
    }
  }
  window.addEventListener("scroll", removeActiveWhenAtTop);

  setTimeout(function () {
    if (window.scrollY === 0) {
      $(".portrait-detail").removeClass("active");
      $(".portrait-section").removeClass("active");
      window.removeEventListener("scroll", removeActiveWhenAtTop);
    }
  }, 800);
});
window.addEventListener("scroll", function removeActiveOnTop() {
  if (window.scrollY === 0) {
    $(".portrait-section").removeClass("active");
    $(".portrait-detail").removeClass("active");
    $(".portraits-container").removeClass("has-active");
    // Remet l'ambiance sonore globale
    if (gains.length) {
      keepFocus = false;
      currentIndex = null;
      fadeTo(gains[0], 1, 1.2); // ambiance, fade in plus long (1.2s)
      gains.forEach((g, i) => { if (i > 0) fadeTo(g, 0, 0.6); });
    }
  }
});
$(document).ready(function () {
  $(".portrait-section").on("click", function () {
    $(".portrait-section").removeClass("active");
    $(this).addClass("active");
    // Ajoute la classe has-active au conteneur si un portrait est actif
    if ($(".portrait-section.active").length) {
      $(".portraits-container").addClass("has-active");
    }
  });
});

$(document).on("click", ".back-to-portraits", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
  function removeActiveWhenAtTop() {
    if (window.scrollY === 0) {
      $(".portrait-detail").removeClass("active");
      $(".portrait-section").removeClass("active");
      $(".portraits-container").removeClass("has-active");
      window.removeEventListener("scroll", removeActiveWhenAtTop);
    }
  }
  window.addEventListener("scroll", removeActiveWhenAtTop);
  setTimeout(function () {
    if (window.scrollY === 0) {
      $(".portrait-detail").removeClass("active");
      $(".portrait-section").removeClass("active");
      $(".portraits-container").removeClass("has-active");
      window.removeEventListener("scroll", removeActiveWhenAtTop);
    }
  }, 800);
});
window.addEventListener("scroll", function removeActiveOnTop() {
  if (window.scrollY === 0) {
    $(".portrait-section").removeClass("active");
    $(".portrait-detail").removeClass("active");
    $(".portraits-container").removeClass("has-active");
  }
});
// ---------------- SONS PORTRAITS ---------------- //
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const files = [
  'audio/ow_full.mp3',         // ambiance globale
  'audio/ow_harmonica.mp3',    // portrait 1
  'audio/ow_banjo.mp3',        // portrait 2
  'audio/ow_whistling.mp3',    // portrait 3
  'audio/ow_flute.mp3'         // portrait 4
];

let buffers = [];
let sources = [];
let gains = [];
let keepFocus = false;
let currentIndex = null;

// Chargement de tous les fichiers audio
Promise.all(files.map(url =>
  fetch(url)
    .then(r => r.arrayBuffer())
    .then(data => audioCtx.decodeAudioData(data))
)).then(loadedBuffers => {
  buffers = loadedBuffers;
  // Création des sources et gains
  for (let i = 0; i < buffers.length; i++) {
    const gain = audioCtx.createGain();
    gain.gain.value = (i === 0) ? 0 : 0; // ambiance à 0.4, solos à 0
    const src = audioCtx.createBufferSource();
    src.buffer = buffers[i];
    src.loop = true;
    src.connect(gain).connect(audioCtx.destination);
    sources.push(src);
    gains.push(gain);
  }
  // Démarre toutes les pistes en même temps
  const now = audioCtx.currentTime + 0.1;
  sources.forEach(src => src.start(now));
  if (gains.length) {
  gains[0].gain.setValueAtTime(0, audioCtx.currentTime);
  gains[0].gain.linearRampToValueAtTime(masterVolume, audioCtx.currentTime + 1.2); // 1.2s de fade in
}
});


// Hover sur un portrait
$('.portrait-section').on('mouseenter', function () {
  if (keepFocus || !gains.length) return;
  const idx = $(this).index() + 1;
  if (currentIndex === idx) return;

  // Fade out ambiance et tous les instruments sauf le nouveau
  fadeTo(gains[0], 0, 0.8); // ambiance, fade out doux
  gains.forEach((g, i) => {
    if (i === idx) {
      fadeTo(g, 1, 0.8); // fade in instrument hoveré
    } else if (i > 0) {
      fadeTo(g, 0, 0.8); // fade out tous les autres instruments
    }
  });
  currentIndex = idx;
});

// Fin du hover
$('.portrait-section').on('mouseleave', function () {
  if (keepFocus || !gains.length) return;
  currentIndex = null;
  fadeTo(gains[0], 1, 1.2); // ambiance, fade in plus long (1.2s)
  gains.forEach((g, i) => { if (i > 0) fadeTo(g, 0, 0.6); });
});



// Clic sur un portrait : focus permanent
$('.portrait-section').on('click', function () {
  if (!gains.length) return;
  keepFocus = true;
  const idx = $(this).index() + 1;
  fadeTo(gains[0], 0, 1.2); // ambiance, fade out plus long (1.2s)
  gains.forEach((g, i) => fadeTo(g, i === idx ? 1 : 0, 0.4));
});

// Clic sur "voir les autres" : retour à l'ambiance globale
$('.back-to-portraits').on('click', function () {
  if (!gains.length) return;
  keepFocus = false;
  currentIndex = null;
  fadeTo(gains[0], 1, 1.2); // ambiance, fade in plus long (1.2s)
  gains.forEach((g, i) => { if (i > 0) fadeTo(g, 0, 0.6); });
});

// Quand le curseur quitte la fenêtre du navigateur
$(document).on('mouseleave', function (e) {
  // Vérifie que ce n'est pas juste un leave d'un élément interne
  if (!gains.length || keepFocus) return;
  // e.relatedTarget est null quand on quitte la fenêtre
  if (e.relatedTarget === null || e.toElement === null) {
    currentIndex = null;
    fadeTo(gains[0], 1, 1.2); // ambiance, fade in douce
    gains.forEach((g, i) => { if (i > 0) fadeTo(g, 0, 0.6); });
  }
});
// ----------------------- VOLUME ------------------------ //
let masterVolume = 0.05; // même valeur que ci-dessus
$('#volumeRange').val(masterVolume); 

$('#volumeRange').on('input', function () {
  masterVolume = parseFloat(this.value);
  gains.forEach((gain, i) => {
    // On garde la valeur cible (1 ou 0) mais on applique le masterVolume
    fadeTo(gain, (gain.gain.value > 0 ? 0.5 : 0), 0.1); // transition douce
  });
});
function fadeTo(gainNode, to, duration = 1.2) {
  const now = audioCtx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  // Fixe la valeur de départ à la valeur actuelle pour éviter les sauts
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(to * masterVolume, now + duration);
}

window.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    // Fade out toutes les pistes en 2s
    if (gains && gains.length) {
      gains.forEach(g => fadeTo(g, 0, 2));
    }
  }
   if (document.visibilityState === "visible") {
    // Si aucun portrait n'est en focus, fade in ambiance
    if (gains && gains.length && !keepFocus) {
      fadeTo(gains[0], 1, 1.2); // ambiance, fade in douce
      gains.forEach((g, i) => { if (i > 0) fadeTo(g, 0, 0.6); });
    }
    // Si un portrait est en focus, ne relance que la piste correspondante
    if (gains && gains.length && keepFocus && currentIndex !== null) {
      fadeTo(gains[0], 0, 1.2);
      gains.forEach((g, i) => fadeTo(g, i === currentIndex ? 1 : 0, 0.4));
    }
  }
});
window.addEventListener("beforeunload", function () {
  // Fade out toutes les pistes en 0.8s
  if (gains && gains.length) {
    gains.forEach(g => fadeTo(g, 0, 0.8));
  }
})
function updateSoundWave(volume) {
  // Génère une onde simple selon le volume (0 = plat, 1 = grande amplitude)
  const points = [];
  const amplitude = 10 + 10 * volume; // min 10, max 30
  const length = 120;
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * length;
    // Onde sinusoïdale simple
    const y = 20 + Math.sin(i / steps * Math.PI * 2 * 2) * amplitude;
    points.push(`${x},${y}`);
  }
  $(".sound-wave-line").attr("points", points.join(" "));
}

// Animation frame pour suivre le volume de l'instrument actif
function animateSoundWave() {
  let vol = 0;
  // Si un instrument est en focus, prends son gain, sinon ambiance
  if (keepFocus && currentIndex !== null && gains[currentIndex]) {
    vol = Math.min(1, gains[currentIndex].gain.value / masterVolume);
  } else if (gains[0]) {
    vol = Math.min(1, gains[0].gain.value / masterVolume);
  }
  updateSoundWave(vol);
  requestAnimationFrame(animateSoundWave);
}

// Lance l'animation si une .portrait-detail est visible
$(function () {
  if ($(".portrait-detail").length) {
    animateSoundWave();
  }
});
let wavePhase = 0;
let lastVol = 0;

function updateSoundCloud(volume) {
  // Amplitude adaptée
  const amplitude = 2 + 18 * Math.pow(volume, 1.5);
  const length = 120;
  const steps = 40;
  const points = [];
  wavePhase += 0.025 + 0.01 * volume;

  // Haut de la forme (onde principale)
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * length;
    let y = 20 + Math.sin((i / steps) * Math.PI * 2 * (2.5 + volume) + wavePhase) * amplitude;
    // Pic sur attaque
    const attack = Math.max(0, volume - lastVol) * 2.2;
    if (attack > 0.01) {
      const center = steps / 2;
      const spread = 2 + 10 * attack;
      const peak = Math.exp(-Math.pow(i - center, 2) / (2 * spread * spread)) * 32 * attack;
      y -= peak;
    }
    points.push(`${x},${y}`);
  }
  // Bas de la forme (retour par le bas, onde inversée ou ligne droite)
  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * length;
    let y = 20 + Math.sin((i / steps) * Math.PI * 2 * (2.5 + volume) + wavePhase + Math.PI) * (amplitude * 0.5) + 10;
    points.push(`${x},${y + 15}`);
  }
  $(".sound-wave-cloud").attr("points", points.join(" "));
  lastVol = volume;
}

// Animation frame pour suivre le volume de l'instrument actif
function animateSoundCloud() {
  let vol = 0;
  if (keepFocus && currentIndex !== null && gains[currentIndex]) {
    vol = Math.min(1, gains[currentIndex].gain.value / masterVolume);
  } else if (gains[0]) {
    vol = Math.min(1, gains[0].gain.value / masterVolume);
  }
  updateSoundCloud(vol);
  requestAnimationFrame(animateSoundCloud);
}

// Lance l'animation si une .portrait-detail est visible
$(function () {
  if ($(".portrait-detail").length) {
    animateSoundCloud();
  }
});