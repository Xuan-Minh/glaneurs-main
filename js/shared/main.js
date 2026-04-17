// Map pour stocker les intervals de fade par élément audio (évite la concurrence)
const fadeIntervals = new WeakMap();
let isGloballyMuted =
  localStorage.getItem("audioHasBeenInitialized") === "true"
    ? localStorage.getItem("isSiteMuted") === "true"
    : true;
let audioContextStarted =
  localStorage.getItem("audioHasBeenInitialized") === "true";
// Expose via getter/setter pour garantir la cohérence entre la variable locale et window,
// même si un script tiers écrit directement sur window.isGloballyMuted.
Object.defineProperty(window, "isGloballyMuted", {
  get() {
    return isGloballyMuted;
  },
  set(v) {
    isGloballyMuted = v;
  },
  configurable: true,
  enumerable: false,
});
window.shouldPlayPortraitsAudio = false;
window.isLangSwitching = false;

function getLocalizedMessage(key) {
  const langAttr =
    (document && document.documentElement && document.documentElement.lang) ||
    "";
  const nav = (navigator && navigator.language) || "";
  const lang = (langAttr || nav).toLowerCase();
  const locale = lang.startsWith("ko")
    ? "ko"
    : lang.startsWith("en")
      ? "en"
      : "fr";
  const messages = {
    autoplayBlocked: {
      fr: "Le son est bloqué par votre navigateur. Cliquez pour l'activer.",
      ko: "브라우저에서 소리가 차단되었습니다. 클릭하여 활성화하세요.",
      en: "Audio is blocked by your browser. Click to enable it.",
    },
  };
  return (
    (messages[key] && messages[key][locale]) ||
    (messages[key] && messages[key].fr) ||
    ""
  );
}

function getI18nMessage(key) {
  try {
    if (window && window.I18N && typeof window.I18N[key] === "string")
      return window.I18N[key];
  } catch (e) {}
  return getLocalizedMessage(key);
}

function fadeAudio(audio, to, duration = 1000) {
  if (!audio) return;
  // Annule l'interval existant pour CE audio
  const prev = fadeIntervals.get(audio);
  if (prev) clearInterval(prev);

  const start = Number(audio.volume) || 0;
  const step = (to - start) / (duration / 50);
  let current = start;
  let count = 0;

  const id = setInterval(() => {
    current += step;
    count += 1;
    audio.volume = Math.max(0, Math.min(1, current));
    if (
      (step > 0 && current >= to) ||
      (step < 0 && current <= to) ||
      count > duration / 50
    ) {
      audio.volume = to;
      clearInterval(id);
      fadeIntervals.delete(audio);
      if (to === 0)
        try {
          audio.pause();
        } catch (e) {}
    }
  }, 50);

  fadeIntervals.set(audio, id);
}

function playBgmAudio() {
  if (isGloballyMuted) return;
  try {
    if ($ && $(".visionner:visible").length > 0) return; // Ne jamais lancer si un visionneur est ouvert
  } catch (e) {}

  // Synchronise l'état global et l'UI quand l'autoplay est bloqué par le navigateur.
  // On met à jour le visuel uniquement, sans persister dans localStorage : c'est une
  // restriction du navigateur, pas un choix explicite de l'utilisateur.
  function handleAutoplayBlocked() {
    isGloballyMuted = true;
    try {
      const iconOn = document.getElementById("icon-sound-on");
      const iconOff = document.getElementById("icon-sound-off");
      if (iconOn) iconOn.classList.add("icon-hidden");
      if (iconOff) iconOff.classList.remove("icon-hidden");
      if (typeof window.animateWaveAmplitude === "function") {
        window.animateWaveAmplitude(0, 600).catch(() => {});
      }
    } catch (e) {
      console.error("handleAutoplayBlocked() visual update failed:", e);
    }
  }

  const audio = document.getElementById("audio-bgm");
  if (audio) {
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        // Identifiant du timeout de vérification retardée, annulé si play() réussit
        let fallbackTimeoutId;
        playPromise
          .then((_) => {
            // La lecture a démarré : annuler la vérification retardée pour éviter les faux-positifs
            clearTimeout(fallbackTimeoutId);
            if (audio.muted) audio.muted = false;
            fadeAudio(audio, 0.6, 500);
            $(document).off("click.autoplay keydown.autoplay");
          })
          .catch((error) => {
            // Annuler le timeout de secours pour éviter une double notification
            clearTimeout(fallbackTimeoutId);
            console.error("BGM audio autoplay was prevented or failed:", error);
            if (audio && audio.error) {
              console.error("Audio error code:", audio.error.code);
            }
            try {
              if (audio && !audio.paused) {
                // La lecture a bien commencé malgré le rejet : on enlève les handlers
                $(document).off("click.autoplay keydown.autoplay");
                return;
              }
            } catch (e) {
              // noop
            }

            // Autoplay bloqué : synchroniser l'état et l'UI avec la réalité
            handleAutoplayBlocked();

            // Indiquer à l'utilisateur qu'il doit interagir pour autoriser le son
            try {
              if (typeof showNotification === "function") {
                // double-check: ne pas montrer si audio s'est mis à jouer
                const mainAudio = document.getElementById("audio-bgm");
                if (!(mainAudio && !mainAudio.paused)) {
                  showNotification(getI18nMessage("autoplayBlocked"));
                }
              }
            } catch (e) {
              // noop
            }

            // Remplacer tout listener .autoplay existant pour éviter l'accumulation
            $(document).off("click.autoplay keydown.autoplay");
            $(document).one("click.autoplay keydown.autoplay", function () {
              // L'utilisateur a interagi : réactiver le son et tenter la lecture.
              isGloballyMuted = false;
              if (typeof window.updateUI === "function") {
                try {
                  window.updateUI();
                } catch (e) {}
              }
              playBgmAudio();
            });
          });
        // Vérifier après délai si autoplay bloqué (annulé par .then() si play() a réussi)
        fallbackTimeoutId = setTimeout(() => {
          try {
            const a = document.getElementById("audio-bgm");
            if (a) {
              // Seul a.paused est fiable : currentTime peut rester à 0 pendant le buffering
              const consideredBlocked = a.paused;
              if (consideredBlocked) {
                // Autoplay bloqué : synchroniser l'état et l'UI avec la réalité
                handleAutoplayBlocked();
                try {
                  if (typeof showNotification === "function") {
                    if (a.paused) {
                      showNotification(getI18nMessage("autoplayBlocked"));
                    }
                  }
                } catch (e) {}
                // Remplacer tout listener .autoplay existant pour éviter l'accumulation
                $(document).off("click.autoplay keydown.autoplay");
                $(document).one("click.autoplay keydown.autoplay", function () {
                  // L'utilisateur a interagi : réactiver le son et tenter la lecture.
                  isGloballyMuted = false;
                  if (typeof window.updateUI === "function") {
                    try {
                      window.updateUI();
                    } catch (e) {}
                  }
                  playBgmAudio();
                });
              }
            }
          } catch (e) {
            // noop
          }
        }, 600);
      }
    } else if (!audio.muted && audio.volume < 0.3) {
      fadeAudio(audio, 0.3, 2000);
    }
  }
}

function stopBgmAudio() {
  const audio = document.getElementById("audio-bgm");
  if (!audio) return;
  fadeAudio(audio, 0, 800); // Fade out en 0.8s
  try {
    if (typeof window.animateWaveAmplitude === "function") {
      window.animateWaveAmplitude(0, 300).catch(() => {});
    }
  } catch (e) {
    // noop
  }
}

window.resumeBgmAudio = function (targetVol = 0.3, duration = 600) {
  try {
    if (isGloballyMuted) return;
    if ($ && $(".visionner:visible").length > 0) return; // Ne rien faire si une modale est visible
  } catch (e) {}

  const audio = document.getElementById("audio-bgm");
  if (!audio) return;

  const safeVol = Math.max(0, Math.min(1, Number(targetVol) || 0.3));
  const start = audio.paused ? audio.play() : Promise.resolve();
  (start || Promise.resolve())
    .then(() => {
      try {
        if (audio.muted) audio.muted = false;
      } catch (e) {}
      try {
        fadeAudio(audio, safeVol, Math.max(0, Number(duration) || 600));
      } catch (e) {}
    })
    .catch(() => {
      // Si la reprise directe échoue (autoplay), laisser playBgmAudio gérer le fallback
      try {
        if (typeof playBgmAudio === "function") playBgmAudio();
      } catch (e) {}
    });
};

$(document).on("keydown", function (e) {
  // Vérifie que l'utilisateur n'est pas en train de saisir du texte dans un input/textarea
  if (e.key.toLowerCase() === "p" && !$("input, textarea").is(":focus")) {
    window.location.href = "tools/reset.php";
  }
  if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    $(".visionner:visible").each(function () {
      $(this).find(".close-visionner").trigger("click");
    });
  }
});
$(document).ready(function () {
  // ----------------------------------------------- LOADING ---------------------------------- //

  window.addEventListener("beforeunload", stopBgmAudio);
  // Symétrie : arrêter l'audio quand la page est cachée/chargée via bfcache
  window.addEventListener("pagehide", stopBgmAudio);
  window.addEventListener("visibilitychange", function () {
    // Ne fait rien si l'utilisateur n'a jamais activé le son
    if (!audioContextStarted) return;

    if (document.visibilityState === "hidden") {
      stopBgmAudio();
    }
    // Quand la page redevient visible, relancer l'audio et l'animation de la wave
    if (document.visibilityState === "visible") {
      if (!isGloballyMuted) {
        // Ne relance pas l'audio d'ambiance si un visionneur est ouvert
        try {
          if (!($ && $(".visionner:visible").length > 0)) {
            if (typeof playBgmAudio === "function") playBgmAudio();
          }
        } catch (e) {}
      }
      try {
        requestAnimationFrame(() => {
          if (typeof updateUI === "function") {
            updateUI();
          } else if (typeof window.animateWaveAmplitude === "function") {
            window
              .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
              .catch(() => {});
          }
        });
      } catch (e) {}
    }
  });

  // Alt+tab : visibilitychange ne se déclenche pas quand l'utilisateur bascule vers
  // une autre application (la page reste « visible » dans son onglet). On utilise
  // blur/focus pour couper et reprendre le son dans ce cas.
  window.addEventListener("blur", function () {
    if (!audioContextStarted) return;
    stopBgmAudio();
  });

  window.addEventListener("focus", function () {
    if (!audioContextStarted) return;
    if (!isGloballyMuted && document.visibilityState === "visible") {
      try {
        if (
          !($ && $(".visionner:visible").length > 0) &&
          !document.querySelector(".loading-screen")
        ) {
          if (typeof playBgmAudio === "function") playBgmAudio();
        }
      } catch (e) {}
    }
    try {
      requestAnimationFrame(() => {
        if (typeof updateUI === "function") {
          updateUI();
        } else if (typeof window.animateWaveAmplitude === "function") {
          window
            .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
            .catch(() => {});
        }
      });
    } catch (e) {}
  });

  $(document).on("click", ".transition-link", async function (e) {
    e.preventDefault();
    const href = $(this).attr("href");

    // Si le lien est invalide, ne rien faire
    if (!href || href === "#" || href.startsWith("javascript")) return;

    // Normalise les URLs pour vérifier si on est déjà sur la page
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const targetPath = new URL(href, window.location.origin).pathname.replace(
      /\/$/,
      "",
    );

    if (currentPath === targetPath) {
      // Si on est déjà sur la page, on ferme juste le menu s'il est ouvert
      $("#menuVolet").removeClass("open");
      $("#menuBurger").removeClass("open");
      return;
    }

    // Si on doit changer de page :
    // 1. Gérer l'audio (fade global + portraits)
    if (typeof stopBgmAudio === "function") stopBgmAudio();

    const portraitsFadePromise =
      typeof window.requestPortraitsFadeOut === "function"
        ? window.requestPortraitsFadeOut(600)
        : new Promise((res) => setTimeout(res, 300));

    // 2. Fermer le menu-volet (ne fait rien s'il est déjà fermé)
    $("#menuVolet").removeClass("open");
    $("#menuBurger").removeClass("open");

    // 3. Attendre la fin du fade, puis lancer l'animation de transition
    try {
      await portraitsFadePromise;
    } catch (e) {
      // noop
    }

    // On attend un court délai pour la fermeture visuelle du menu
    setTimeout(function () {
      $("#transition-overlay").removeClass("hide").addClass("active");
      // On attend la fin de l'animation de l'overlay avant de changer de page
      setTimeout(function () {
        window.location.href = href;
      }, 700); // Durée de la transition CSS
    }, 200); // Délai pour la fermeture du menu
  });

  window.addEventListener("pageshow", function (event) {
    // On ne fait rien si la page n'est pas chargée depuis le cache
    if (!event.persisted) {
      return;
    }

    // Si on vient du cache (bouton précédent), on force la ré-animation
    const overlay = $("#transition-overlay");
    overlay.css("transition", "none");
    overlay.removeClass("hide");
    void overlay[0].offsetHeight;
    overlay.css("transition", "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)");
    overlay.addClass("hide");
    window.scrollTo(0, 0);
    $("body").css("overflow", "auto");
    $(".visionner").fadeOut(0);

    // Demande au module portraits de se fondre si présent, puis stop l'audio principal.
    (async function () {
      if (typeof window.requestPortraitsFadeOut === "function") {
        try {
          await window.requestPortraitsFadeOut(500);
        } catch (e) {}
      }
      if (typeof stopBgmAudio === "function") {
        stopBgmAudio();
      }
    })();

    // Réinitialise l'UI audio / waveform lors du retour depuis le bfcache
    try {
      requestAnimationFrame(() => {
        if (typeof updateUI === "function") updateUI();
        else if (typeof window.animateWaveAmplitude === "function")
          window
            .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
            .catch(() => {});
      });
    } catch (e) {}
  });

  // --- ANIMATION D'ENTRÉE POUR UN CHARGEMENT NORMAL ---
  // Ce code est correct et nécessaire. Il gère la toute première visite de la page.
  setTimeout(function () {
    $("#transition-overlay").addClass("hide");
  }, 50);

  // Ancien DOMContentLoaded: sécurité pour éviter un overlay bloqué lors de certains enchaînements.
  setTimeout(function () {
    if (!window.isLangSwitching) {
      $("#transition-overlay").addClass("hide");
    }
  }, 50);

  // ----------------------------------------------- Menu Burger & Menu Volet ---------------------------------- //
  // Sélectionne les éléments du menu burger (icône) et du menu volet (navigation latérale)
  const menuBurger = $("#menuBurger");
  const menuVolet = $("#menuVolet");

  // Ouvre/ferme le menu volet au clic sur le burger (supporte <button> ou <div>)
  menuBurger.on("click keydown", function (e) {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
    ) {
      $(this).toggleClass("open");
      menuVolet.toggleClass("open");
      // Met à jour aria-expanded pour l’accessibilité
      const expanded = $(this).hasClass("open");
      $(this).attr("aria-expanded", expanded ? "true" : "false");
      e.preventDefault();
    }
  });

  // Ferme le menu volet si clic en dehors du menu ou du burger
  $(document).click(function (event) {
    if (
      !menuVolet.is(event.target) &&
      menuVolet.has(event.target).length === 0 &&
      !menuBurger.is(event.target) &&
      menuBurger.has(event.target).length === 0
    ) {
      menuVolet.removeClass("open");
      menuBurger.removeClass("open");
    }
  });

  // ----------------------------------------------- Animation de contenu ---------------------------------- //
  // Déclenche l’animation (class .visible) au scroll / apparition dans le viewport.
  // (Ancien bloc $(function(){...}) regroupé ici pour n’avoir qu’un seul ready.)
  {
    const anims = document.querySelectorAll(".content-anim");
    if (anims && anims.length) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target); // Optionnel : n'observe plus après animation
            }
          });
        },
        { threshold: 0.2 },
      ); // 20% visible

      anims.forEach((el) => observer.observe(el));
    }
  }

  // Ancien DOMContentLoaded: init du contrôle audio global (si présent sur la page)
  initGlobalAudioControls();
});
// ----------------------------------------------- Fade transition ---------------------------------- //

// --------------------------------- Auto scroll MENU  --------------------------------- //
$(document).on("click", ".menu-video-item", function () {
  const slideNumber = $(this).data("slide");
  const isIndexPage = $(".slides").length > 0;

  $("#menuVolet").removeClass("open");
  $("#menuBurger").removeClass("open");

  if (isIndexPage && typeof window.scrollToAndTrigger === "function") {
    // Sur l'index : logique gérée par index.js
    window.scrollToAndTrigger(slideNumber);
  } else {
    // Sur une autre page : transition overlay + délai
    setTimeout(function () {
      $("#transition-overlay").removeClass("hide").addClass("active");
      setTimeout(function () {
        window.location.href = "index?slide=" + slideNumber;
      }, 700); // Durée de la transition CSS
    }, 300); // Laisse le menu-volet se fermer
  }
});
// ----------------------------------------------- HOVER VIDEO ---------------------------------- //
$(".menu-video-item").on("mouseenter", function () {
  const video = $(this).find(".menu-video")[0];
  if (video) {
    video.play();
  }
});

$(".menu-video-item").on("mouseleave", function () {
  const video = $(this).find(".menu-video")[0];
  if (video) {
    video.pause();
  }
});

// ----------------------------------------------- LANGUE ---------------------------------- //

$(document).on("click", ".lang-option", function (e) {
  e.preventDefault();
  window.isLangSwitching = true;
  let lang = $(this).data("lang") || $(this).attr("lang");
  if ($(this).hasClass("active")) return;

  $(".lang-option").removeClass("active");
  $(this).addClass("active");
  $("#menuVolet").removeClass("open");

  // Transition sonore : fade out audio et wave
  if (typeof stopBgmAudio === "function") stopBgmAudio();
  if (typeof window.animateWaveAmplitude === "function")
    window.animateWaveAmplitude(0, 600);

  // Animation fade-in sur la page de départ
  const $overlay = $("#transition-overlay");
  $overlay.removeClass("hide").addClass("active fade-in");

  // Attendre ~700ms pour laisser le fade-in s'afficher, puis changer la langue
  setTimeout(function () {
    let url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }, 700); // même durée que la transition CSS
});

// Helper réutilisable pour cacher/montrer le header sur un conteneur scrollable.
// Utilisé par certaines pages (ex: archives) dont le scroll est interne au conteneur.
function addHideHeaderOnScroll($scrollContainer) {
  if (!$scrollContainer || !$scrollContainer.length) return;

  const $header = $("header");
  let lastScrollLocal = 0;

  $scrollContainer
    .off("scroll.hideHeader")
    .on("scroll.hideHeader", function () {
      const currentScroll = $scrollContainer.scrollTop();
      if (currentScroll > lastScrollLocal && currentScroll > 200) {
        $header.addClass("hide-header");
      } else if (currentScroll < lastScrollLocal) {
        $header.removeClass("hide-header");
      }
      if (currentScroll < 20) $header.removeClass("hide-header");
      lastScrollLocal = currentScroll;
    });
}
// ----------------------------------------------- hide navbar apres scroll ------------------------ //
let lastScroll = 0;
const $header = $("header");

window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 200) {
    // Scroll vers le bas : cache le header
    $header.addClass("hide-header");
  } else if (currentScroll < lastScroll) {
    // Scroll vers le haut : montre le header
    $header.removeClass("hide-header");
  }
  if (currentScroll < 20) $header.removeClass("hide-header");
  lastScroll = currentScroll;
});
// Reset

// Effet halo brumeux au clic
document.addEventListener("click", function (e) {
  const halo = document.createElement("div");
  halo.className = "halo-click";
  halo.style.left = e.clientX - 90 + "px"; // centre l'effet sur le clic
  halo.style.top = e.clientY - 90 + "px";
  document.body.appendChild(halo);
  setTimeout(() => halo.remove(), 1000); // retire l'effet après l'anim
});

function initGlobalAudioControls() {
  const audioContainer = document.getElementById(
    "global-audio-control-container",
  );
  const waveCanvas = document.getElementById("wave");
  const iconSoundOn = document.getElementById("icon-sound-on");
  const iconSoundOff = document.getElementById("icon-sound-off");

  if (!audioContainer || !waveCanvas || !iconSoundOn || !iconSoundOff) {
    return;
  }

  // Accessible overlay support: si un overlay informatif est injecté côté JS/HTML,
  // s'assurer qu'il est lisible par les lecteurs d'écran et focusable.
  try {
    const overlayContent = document.querySelector(
      ".portraits-sound-overlay__content",
    );
    if (overlayContent) {
      if (!overlayContent.hasAttribute("role"))
        overlayContent.setAttribute("role", "status");
      if (!overlayContent.hasAttribute("aria-live"))
        overlayContent.setAttribute("aria-live", "polite");
      // Rendre focusable pour tab-order et permettre aux lecteurs d'écran d'y aller
      if (!overlayContent.hasAttribute("tabindex"))
        overlayContent.setAttribute("tabindex", "-1");
      // Assurer une visibilité de focus
      overlayContent.classList.add("accessible-focusable");
    }
  } catch (e) {}

  const ctx = waveCanvas.getContext("2d");
  const canvasWidth = waveCanvas.width;
  const canvasHeight = waveCanvas.height;
  let animationFrameId;
  let waveXOffset = 0;
  // Amplitude factor 0..1 for the visual wave; we animate this value for smooth fallback
  let waveAmplitude = isGloballyMuted ? 0 : 1;
  // Expose for external modules and notifications
  window.waveAmplitude = waveAmplitude;
  let _amplitudeAnim = null; // RAF id for amplitude animation

  // --- LOGIQUE DE PERSISTANCE ---
  // isGloballyMuted et audioContextStarted sont déjà initialisés depuis localStorage
  // au niveau module ; on se contente ici de lancer l'audio si nécessaire.
  if (audioContextStarted && !isGloballyMuted) {
    setTimeout(() => {
      // Ne pas démarrer si l'écran de chargement est encore affiché : l'audio
      // sera lancé par initAudio() quand l'utilisateur cliquera sur « Entrer ».
      if (document.querySelector(".loading-screen")) return;
      if (typeof playBgmAudio === "function") {
        playBgmAudio();
      }
      if (typeof window.startPortraitsAudio === "function") {
        window.shouldPlayPortraitsAudio = true;
        window.startPortraitsAudio();
      }
    }, 100);
  }
  // --- FIN DE LA LOGIQUE DE PERSISTANCE ---

  function drawFlatLine() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawMovingWave() {
    animationFrameId = null;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    const amplitude = waveAmplitude * (canvasHeight / 3.5);
    for (let x = 0; x < canvasWidth; x++) {
      const y =
        canvasHeight / 2 + Math.sin((x + waveXOffset) * 0.4) * amplitude;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
    waveXOffset += 0.3;
    if (waveXOffset > Math.PI * 100) waveXOffset = 0;

    const RUN_THRESHOLD = 0.001;
    if (waveAmplitude > RUN_THRESHOLD) {
      // Planifie la prochaine frame si aucune n'est en file
      if (!animationFrameId)
        animationFrameId = requestAnimationFrame(drawMovingWave);
    } else {
      // Arrête la boucle proprement
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      drawFlatLine();
    }
  }

  window.animateWaveAmplitude = function (to, duration = 500) {
    if (_amplitudeAnim) cancelAnimationFrame(_amplitudeAnim);
    const start = performance.now();
    const from = waveAmplitude;
    const diff = to - from;

    return new Promise((resolve) => {
      function step(now) {
        const t = Math.min(1, (now - start) / Math.max(1, duration));
        // ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        waveAmplitude = from + diff * eased;
        // exposer l'état courant pour les autres modules
        try {
          window.waveAmplitude = waveAmplitude;
        } catch (e) {}
        // If we are animating towards non-zero amplitude, ensure the draw loop runs
        if (waveAmplitude > 0 && !animationFrameId) {
          animationFrameId = requestAnimationFrame(drawMovingWave);
        }
        if (t < 1) {
          _amplitudeAnim = requestAnimationFrame(step);
        } else {
          waveAmplitude = to;
          try {
            window.waveAmplitude = waveAmplitude;
          } catch (e) {}
          _amplitudeAnim = null;
          // If amplitude reached 0, cancel draw loop and show flat line
          if (waveAmplitude <= 0) {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
            drawFlatLine();
          }
          resolve();
        }
      }

      _amplitudeAnim = requestAnimationFrame(step);
    });
  };

  // Helper debug pour observer l'état de la waveform depuis la console
  window.getWaveState = function () {
    return {
      waveAmplitude: typeof waveAmplitude === "number" ? waveAmplitude : null,
      animationFrameRunning: !!animationFrameId,
      amplitudeAnimRunning: !!_amplitudeAnim,
      waveXOffset: waveXOffset,
    };
  };

  // Helper pour forcer l'arrêt de toute animation de wave (utile pour debug)
  window.stopWaveAnimation = function () {
    try {
      if (_amplitudeAnim) cancelAnimationFrame(_amplitudeAnim);
    } catch (e) {}
    _amplitudeAnim = null;
    try {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } catch (e) {}
    animationFrameId = null;
    try {
      waveAmplitude = 0;
      try {
        window.waveAmplitude = 0;
      } catch (e) {}
    } catch (e) {}
    try {
      drawFlatLine();
    } catch (e) {}
    return window.getWaveState();
  };

  function updateAudioElements() {
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((media) => {
      if (media.tagName === "AUDIO") {
        // Ne pas forcer le muted immédiatement pour le player principal
        if (media.id === "audio-bgm") {
          // Laisser le contrôle de ce player à playBgmAudio/stopBgmAudio (fade)
        } else if (media.closest(".loading-screen")) {
          media.muted = true;
        } else {
          media.muted = isGloballyMuted;
        }
      }
    });

    // AJOUT : Communique l'état du son au script des portraits s'il est présent
    if (typeof window.setPortraitsMuteState === "function") {
      window.setPortraitsMuteState(isGloballyMuted);
    }
  }

  function updateUI() {
    if (isGloballyMuted) {
      iconSoundOn.classList.add("icon-hidden");
      iconSoundOff.classList.remove("icon-hidden");
      // Smoothly animate the visible waveform to a flat line
      if (typeof window.animateWaveAmplitude === "function") {
        window.animateWaveAmplitude(0, 600).catch(() => {});
      } else {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        drawFlatLine();
      }
    } else {
      iconSoundOn.classList.remove("icon-hidden");
      iconSoundOff.classList.add("icon-hidden");
      // Animate amplitude back to full and start moving wave
      if (typeof window.animateWaveAmplitude === "function") {
        window
          .animateWaveAmplitude(1, 600)
          .then(() => {
            if (!animationFrameId)
              animationFrameId = requestAnimationFrame(drawMovingWave);
          })
          .catch(() => {
            if (!animationFrameId)
              animationFrameId = requestAnimationFrame(drawMovingWave);
          });
      } else {
        drawMovingWave();
      }
    }
    // On sauvegarde l'état uniquement après la première interaction
    if (audioContextStarted) {
      localStorage.setItem("isSiteMuted", isGloballyMuted);
    }
  }
  // Expose updateUI globalement pour que visibilitychange / pageshow puissent la rappeler
  window.updateUI = updateUI;

  function hintWave(duration = 600) {
    // Si la waveform n'existe pas, rien
    if (typeof window.animateWaveAmplitude !== "function")
      return Promise.resolve();
    // Montre l'amplitude brièvement puis retourne à l'état précédent
    const from = waveAmplitude;
    return window
      .animateWaveAmplitude(1, Math.min(300, duration / 2))
      .then(() => {
        return window.animateWaveAmplitude(from, Math.max(300, duration / 2));
      });
  }

  // Expose en option : showNotification peut l'utiliser en fallback.
  try {
    window.hintWave = hintWave;
  } catch (e) {}

  function initAudio() {
    if (audioContextStarted) {
      // Visiteur de retour : le contexte est déjà initialisé mais l'audio n'a pas été
      // lancé pendant le loading screen. On le démarre ici si nécessaire.
      if (!isGloballyMuted) {
        if (typeof playBgmAudio === "function") playBgmAudio();
        if (typeof window.startPortraitsAudio === "function")
          window.startPortraitsAudio();
      }
      updateUI();
      return;
    }

    isGloballyMuted = false;
    audioContextStarted = true;

    localStorage.setItem("audioHasBeenInitialized", "true");
    localStorage.setItem("isSiteMuted", "false");

    if (typeof playBgmAudio === "function") {
      playBgmAudio();
    }
    if (typeof window.startPortraitsAudio === "function") {
      window.startPortraitsAudio();
    }

    updateAudioElements();
    updateUI();
    // Le CTA flottant a été retiré — plus de mise à jour nécessaire
  }

  // Expose l'init pour les pages / scripts qui n'ont pas le bouton "Entrer".
  // (Toujours déclenché par une interaction utilisateur : clic/clavier.)
  try {
    window.initSiteAudio = initAudio;
  } catch (e) {}

  function handleSoundIconClick() {
    // Si le contexte audio n'a pas encore été initié par l'utilisateur (via le bouton "Entrer"),
    // on initialise ici pour éviter un état "bloqué" quand le loading screen n'est pas affiché.
    if (!audioContextStarted) {
      initAudio();
      return;
    }

    isGloballyMuted = !isGloballyMuted; // On inverse l'état

    // Utiliser le fade plutôt que le mute instantané pour audio-bgm
    if (isGloballyMuted) {
      if (typeof stopBgmAudio === "function") stopBgmAudio();
    } else {
      if (typeof playBgmAudio === "function") playBgmAudio();
      if (typeof window.startPortraitsAudio === "function")
        window.startPortraitsAudio();
    }

    // Mettre à jour les autres éléments audio et l'UI
    updateAudioElements();
    updateUI();
    // CTA retiré — plus d'appel nécessaire
  }

  audioContainer.addEventListener("click", handleSoundIconClick);

  const enterButton = document.getElementById("enter-button");
  if (enterButton) {
    enterButton.addEventListener("click", initAudio);
  }
  // État initial au chargement (prend en compte le localStorage)
  // Initial UI sync
  updateUI();
  updateAudioElements();
  // CTA supprimé — pas d'appel nécessaire
}

/**
 * Affiche une notification en bas de l'écran.
 * @param {string} message Le message à afficher.
 * @param {number} duration La durée d'affichage en millisecondes (par défaut 3000).
 */
function showNotification(message, duration = 3000) {
  // Crée l'élément de notification s'il n'existe pas déjà
  let notification = document.getElementById("notification-popup");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification-popup";
    document.body.appendChild(notification);
  }

  // Si l'audio principal est déjà en train de jouer, on évite d'afficher
  // une notification (empêche les faux-positifs d'autoplay).
  try {
    const bgm = document.getElementById("audio-bgm");
    if (bgm && !bgm.paused) {
      return; // audio déjà en cours => ne pas afficher la popup
    }
  } catch (e) {
    // noop
  }

  // Définit le message et affiche la notification
  notification.textContent = message;
  notification.classList.add("show");

  // Si la waveform visuelle est disponible, lui demander un petit fade-out (atténuation) pour attirer l'attention
  try {
    const from =
      typeof window.waveAmplitude === "number" ? window.waveAmplitude : 1;
    if (typeof window.animateWaveAmplitude === "function") {
      // Anime vers 0 puis restaure l'amplitude précédente
      window
        .animateWaveAmplitude(0, Math.min(300, 800 / 2))
        .then(() => window.animateWaveAmplitude(from, Math.max(300, 800 / 2)))
        .catch(() => {});
    } else if (typeof window.hintWave === "function") {
      // Si hintWave existe mais animateWaveAmplitude non, on l'utilise en fallback
      window.hintWave(800).catch(() => {});
    }
  } catch (e) {
    // noop
  }

  // Cache la notification après la durée spécifiée
  setTimeout(() => {
    notification.classList.remove("show");
  }, duration);
}
