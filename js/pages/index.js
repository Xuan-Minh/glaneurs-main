$(document).ready(function () {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingVideo = document.getElementById("loading-bg-video");

  if (loadingScreen && loadingVideo) {
    // On attend que la vidéo soit prête à être lue fluidement
    loadingVideo.addEventListener(
      "canplaythrough",
      function () {
        // On ajoute la classe au conteneur parent pour déclencher les deux fondus
        loadingScreen.classList.add("loaded");
      },
      { once: true },
    ); // L'événement ne se déclenche qu'une fois
  }

  $(".definition-text").each(function () {
    const definitionText = $(this).data("definition");
    $(this).text(definitionText);
  });
  if ($(".loading-screen").length === 0) {
    // Si pas de loading-screen, rendre le conteneur visible
    $(".container").removeClass("hidden").fadeIn(1000);
    $(document).one("click.startAudio keydown.startAudio", function () {
      const audio = document.getElementById("audio-bgm");
      // Vérifier si l'audio est en pause (ce qui inclut le cas où il n'a jamais joué)
      // et qu'il n'y a pas de modale vidéo active
      if (audio && audio.paused && $(".visionner:visible").length === 0) {
        // Si l'audio n'a jamais été initialisé (pas de loading screen / localStorage vidé),
        // on déclenche l'init complète (déverrouille + persistance) sur cette interaction.
        try {
          if (
            typeof window.initSiteAudio === "function" &&
            localStorage.getItem("audioHasBeenInitialized") !== "true"
          ) {
            window.initSiteAudio();
            return;
          }
        } catch (e) {}

        playBgmAudio();
      }
    });
  }

  // Init index-only (regroupé ici pour garder un seul DOM-ready dans ce fichier)
  initIndexAutoCloseNonActiveSlides();
  initIndexWheelAndScrollArrow();
});

// ----------------------------------------------- LOADING SCREEN ANIMATION ---------------------------------- //
const loadingItems = $(".loading-item");
let currentItem = 0;
const totalItems = loadingItems.length;
const fadeDuration = 500; // Durée du fondu en millisecondes
const displayDuration = 4000; // Durée d'affichage de chaque item en millisecondes
let intervalId; // Variable pour stocker l'ID de l'intervalle
let isAnimating = false; // Variable pour éviter les clics multiples

// Affiche le premier item
loadingItems.eq(0).addClass("active");

// Fonction pour afficher l'item suivant
function showNextItem() {
  if (isAnimating) return; // Empêche les clics multiples
  isAnimating = true;

  // Fait disparaître l'item actuel si ce n'est pas le dernier
  if (currentItem < totalItems - 1) {
    loadingItems.eq(currentItem).removeClass("active");
  }

  // Incrémente l'index
  currentItem++;

  // Vérifie si on est arrivé à l'avant-dernier item
  if (currentItem < totalItems - 1) {
    // Affiche l'item suivant
    setTimeout(function () {
      loadingItems.eq(currentItem).addClass("active");
      isAnimating = false;
    }, fadeDuration); // Délai pour que le fondu sortant soit terminé
  } else if (currentItem === totalItems - 1) {
    // Affiche le dernier item sans le faire disparaître
    setTimeout(function () {
      loadingItems.eq(currentItem).addClass("active");
      isAnimating = false;
    }, fadeDuration);
    clearInterval(intervalId); // Arrête l'intervalle
  } else {
    // On est arrivé au dernier item, on arrête l'intervalle
    clearInterval(intervalId);
    isAnimating = false;
  }
}

// Défilement automatique des loading-item
intervalId = setInterval(showNextItem, displayDuration + fadeDuration);

// Gestion du clic sur l'écran de chargement pour passer à l'item suivant
$(".loading-screen").click(function () {
  showNextItem();
});
// ----------------------------------------------- ENTRER---------------------------------- //
$("#enter-button").click(function (e) {
  // Empêcher le fonctionnement si le bouton est en mode WIP
  if ($(this).hasClass("wip") || $(this).prop("disabled")) {
    e.preventDefault();
    return;
  }

  clearInterval(intervalId);

  const $overlay = $("#transition-overlay");

  // 1) Faire apparaître le rideau noir en fondu (0 -> 1)
  $overlay.removeClass("hide").addClass("active");

  // 2) Quand il est opaque, basculer du loading à la homeBouton
  setTimeout(function () {
    $(".loading-screen").remove(); // retire le loading (plus de flash)
    $(".container").removeClass("hidden").show();

    // 3) Puis faire disparaître le rideau noir (1 -> 0)
    requestAnimationFrame(() => {
      $overlay.addClass("hide");
    });
  }, 750); // = durée transition CSS de l’overlay (0.7s) + petite marge

  // Sécurité retour bfcache
  window.addEventListener("pageshow", function () {
    $("#transition-overlay").addClass("hide").removeClass("active");
    // Empêcher toute relance de l'audio d'ambiance si un visionneur est affiché
    try {
      if ($ && $(".visionner:visible").length > 0) {
        if (typeof stopBgmAudio === "function") stopBgmAudio();
      }
    } catch (e) {}
  });
});

// ------------------------------------ INFO SLIDE IN&OUT ------------------------------------------------ //
const TRANSFORM_ANIMATION_DURATION = 1500; // Durée en ms, doit correspondre à la transition CSS (1.5s)
/**
 * @param {jQuery} $slide L'élément jQuery du slide concerné.
 */
let authorFadeInTimer = null;
function showInfoPanel($slide) {
  if (!$slide || !$slide.length) return;

  const isFirst = $slide.hasClass("slide1");

  const $h2 = $slide.find("h2");
  const $info = $slide.find(".info");
  const $point2 = $slide.find(".point2");

  if ($point2.hasClass("full")) return;

  // C'est parfait, on annule tout timer précédent.
  clearTimeout(authorFadeInTimer);

  fadeVisionnerTriggerH3($slide, true);

  // Si c'est la première slide, on évite d'appliquer le zoom / flou pour conserver la mise en page
  if (!isFirst) {
    $h2.addClass("animate-transform");
    requestAnimationFrame(() => {
      $h2.addClass("move");
    });

    // C'est la bonne méthode : on utilise un timer fiable.
    authorFadeInTimer = setTimeout(() => {
      $h2.addClass("author-visible");
    }, 1500); // 1.5s, comme la transition CSS
  } else {
    // Première slide : on saute move/author-visible/flou pour garder la cohérence visuelle.
  }

  $info.fadeIn(500);
  $slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
  $slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
  if (!isFirst) {
    $slide.find("video").addClass("flou");
  }
}

/**
 * Cache le panneau d'information pour un slide donné.
 * @param {jQuery} $slide L'élément jQuery du slide concerné.
 */
function hideInfoPanel($slide) {
  if (!$slide || !$slide.length) return;

  const $h2 = $slide.find("h2");
  const $info = $slide.find(".info");
  const $point1 = $slide.find(".point1");

  if ($point1.hasClass("full")) return;

  // Parfait : on annule le timer et on cache l'auteur immédiatement.
  clearTimeout(authorFadeInTimer);
  $h2.removeClass("author-visible");

  fadeVisionnerTriggerH3($slide, false);

  $h2.addClass("animate-transform");
  requestAnimationFrame(() => {
    $h2.removeClass("move");
  });

  // Ce bloc est OK, il sert à nettoyer la classe d'animation, ce qui est une bonne pratique.
  $h2.one("transitionend", function (e) {
    if (e.originalEvent.propertyName === "transform") {
      $(this).removeClass("animate-transform");
    }
  });

  $info.fadeOut(300);
  $slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
  $slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
  $slide.find("video").removeClass("flou");
}
// NOUVELLE FONCTION : Réinitialisation forcée d'un slide
/**
 * Réinitialise l'état d'un slide à sa position par défaut, sans animation.
 * C'est la solution pour corriger les états incohérents lors d'un scroll rapide.
 * @param {jQuery} $slide L'élément jQuery du slide à réinitialiser.
 */
function resetSlideState($slide) {
  if (!$slide || !$slide.length) return;
  const $h2 = $slide.find("h2");
  clearTimeout(authorFadeInTimer);
  // On retire toutes les classes d'animation et d'état
  $h2.removeClass("move author-visible animate-transform");

  // On cache l'info et on remet les boutons dans leur état initial
  $slide.find(".info").hide();
  fadeVisionnerTriggerH3($slide, false);
  $slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
  $slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
}
// --------------------------------- EVENT HANDLERS --------------------------------- //

// Clic sur le point 2 (pour afficher les infos)
$(".point2").on("click", function () {
  showInfoPanel($(this).closest(".slides"));
});

// Clic sur le point 1 (pour cacher les infos)
$(".point1").on("click", function () {
  hideInfoPanel($(this).closest(".slides"));
});
/**
 * Ajoute temporairement la classe pour animer la transformation.
 * @param {jQuery} $element L'élément jQuery h2.
 */
function triggerH2TransformAnimation($element) {
  if (!$element || !$element.length) return;
  $element.addClass("animate-transform");
  // NOUVEAU : On écoute la fin de la transition pour libérer le verrou
  $element.one("transitionend", function (e) {
    if (e.originalEvent.propertyName === "transform") {
      $element.removeClass("animate-transform");
      isAnimating = false; // On libère le verrou ici
    }
  });
}

function fadeVisionnerTriggerH3($slide, fadeOut = true) {
  const $trigger = $slide.find(".visionner-trigger-h3").not(".always-visible");
  if (!$trigger.length) return;
  if (fadeOut) {
    $trigger.removeClass("fade-in").addClass("fade-out");
  } else {
    $trigger.removeClass("fade-out").addClass("fade-in");
  }
}

// --------------------------------- Reset Slide --------------------------------- //

function resetSlideState($slide) {
  if (!$slide || !$slide.length) return;

  // --- DÉBUT DE LA CORRECTION ---
  // On remplace l'ancien contenu par une logique plus complète et correcte.
  const $h2 = $slide.find("h2");

  clearTimeout(authorFadeInTimer);

  // On retire toutes les classes d'état et d'animation
  $h2.removeClass("move author-visible animate-transform");

  // On cache l'info et on remet les boutons dans leur état initial
  $slide.find(".info").hide();
  fadeVisionnerTriggerH3($slide, false);
  $slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
  $slide.find(".sliderButton .point2").addClass("empty").removeClass("full");

  // La ligne la plus importante : on retire le flou !
  $slide.find("video").removeClass("flou");
  // --- FIN DE LA CORRECTION ---
}

// --------------------------------- Player video --------------------------------- //
let lastFocusedElement; // Variable pour se souvenir du dernier élément focus

function focusTrap(container) {
  const focusableElements = container
    .find('a[href], button, iframe, [tabindex]:not([tabindex="-1"])')
    .filter(":visible");
  const firstFocusableElement = focusableElements.first();
  const lastFocusableElement = focusableElements.last();

  // Déplace le focus sur le premier élément (l'iframe)
  firstFocusableElement.focus();

  container.on("keydown.focusTrap", function (e) {
    if (e.key === "Tab" || e.keyCode === 9) {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement[0]) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement[0]) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

function removeFocusTrap(container) {
  container.off("keydown.focusTrap");
  if (lastFocusedElement) {
    lastFocusedElement.focus(); // Rend le focus à l'élément qui a ouvert la modale
  }
}

$(".close-visionner").click(function (event) {
  event.stopPropagation();
  const slide = $(this).closest(".slides");
  const info = slide.find(".info");
  const visionner = slide.find(".visionner");
  removeFocusTrap(visionner);
  visionner.find("iframe").remove();

  // Correction ici : un seul fadeOut avec le callback
  visionner.fadeOut(400, function () {
    // On cache le lien car on affiche l'info
    fadeVisionnerTriggerH3(slide, true); // CHANGEMENT ICI : de false à true
    try {
      window.__visionnerOpen = false;
    } catch (e) {}
    // Relancer l'ambiance uniquement après fermeture effective de la modale
    try {
      if (!($ && $(".visionner:visible").length > 0)) {
        if (typeof window.resumeBgmAudio === "function") {
          window.resumeBgmAudio(0.3, 600);
        } else {
          playBgmAudio();
        }
      }
    } catch (e) {}
  });

  $("body").css("overflow", "auto");
  info.fadeIn(2000);

  const $h2 = slide.find("h2");
  const isFirst = slide.hasClass("slide1");
  if (!isFirst) {
    if (!$h2.hasClass("move")) {
      triggerH2TransformAnimation($h2);
    }
    $h2.addClass("move");

    // C'est la bonne méthode : on utilise un timer fiable.
    authorFadeInTimer = setTimeout(() => {
      $h2.addClass("author-visible");
    }, 1500); // 1.5s, comme la transition CSS

    slide.find("video").addClass("flou");
  } else {
    // S'assurer qu'aucune classe indésirable ne reste
    $h2.removeClass("move author-visible animate-transform");
    slide.find("video").removeClass("flou");
  }
  slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
  slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
});

let vimeoPlayer = null;

$(".visionner-trigger, .visionner-trigger-h3").click(function (event) {
  event.stopPropagation();

  lastFocusedElement = $(this);
  stopBgmAudio();
  try {
    // Flag interne si nécessaire plus tard
    window.__visionnerOpen = true;
  } catch (e) {}
  const slide = $(this).closest(".slides");
  const isFirstSlide = slide.hasClass("slide1");
  // Prévenir tout flicker : retirer immédiatement les classes flou/move si première slide
  if (isFirstSlide) {
    slide.find("video").removeClass("flou");
    slide.find("h2").removeClass("move author-visible animate-transform");
  }
  const visionner = slide.find(".visionner");
  const vimeoId = $(this).data("vimeo");
  const lang = $(this).data("lang") || "fr";
  const rawTimecode =
    $(this).data("timecode") ||
    slide.find("[data-timecode]").data("timecode") ||
    "";
  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&texttrack=${lang}`;

  // Supprime tout iframe existant dans le visionneur
  visionner.find("iframe").remove();

  // Crée et injecte le nouvel iframe
  const iframe = $(
    `<iframe src="${vimeoUrl}" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`,
  );
  visionner.append(iframe);

  // Détruit l'ancien player Vimeo s'il existe
  if (vimeoPlayer) {
    vimeoPlayer.unload().catch(() => {});
    vimeoPlayer = null;
  }

  // Crée un nouveau player Vimeo et attache l'event 'ended'
  vimeoPlayer = new Vimeo.Player(iframe[0]);
  // Helper: parse "#t=1m2s" or "#t=62s" or "62" to seconds
  function parseTimecode(tc) {
    if (!tc) return null;
    let s = String(tc).trim();
    if (s.startsWith("#t=")) s = s.slice(3);
    if (/^\d+$/.test(s)) return parseInt(s, 10);
    const m = s.match(/(?:(\d+)m)?(?:(\d+)s)?/i);
    if (!m) return null;
    const mins = m[1] ? parseInt(m[1], 10) : 0;
    const secs = m[2] ? parseInt(m[2], 10) : 0;
    return mins * 60 + secs;
  }
  const startAt = parseTimecode(rawTimecode);

  const hasTimecode = startAt != null && !isNaN(startAt) && startAt > 0;
  vimeoPlayer
    .ready()
    .then(() => {
      if (hasTimecode) {
        return vimeoPlayer.setCurrentTime(startAt).catch(() => {});
      }
    })
    .then(() => vimeoPlayer.play().catch(() => {}));
  vimeoPlayer.on("ended", function () {
    visionner.fadeOut(400, function () {
      $("body").css("overflow", "auto");
      const info = slide.find(".info");
      info.fadeIn(2000);
      // Pour la première slide, ne pas appliquer le zoom ni le flou pour garder la cohérence visuelle
      if (!isFirstSlide) {
        slide.find("h2").addClass("move");
        fadeVisionnerTriggerH3(slide, true);
        slide.find("video").addClass("flou");
      } else {
        // S'assurer que la première slide ne garde pas de classes d'animation indésirables
        slide.find("h2").removeClass("move author-visible animate-transform");
        fadeVisionnerTriggerH3(slide, false);
        slide.find("video").removeClass("flou");
      }
      slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
      slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
      // Redémarrer l'ambiance après disparition effective
      try {
        if (!($ && $(".visionner:visible").length > 0)) {
          if (typeof window.resumeBgmAudio === "function") {
            window.resumeBgmAudio(0.3, 600);
          } else {
            playBgmAudio();
          }
        }
      } catch (e) {}
    });
  });

  visionner
    .fadeIn(400, function () {
      $("body").css("overflow", "hidden");
      slide.find(".info").fadeOut(0);
      focusTrap(visionner);
      // Si c'est la première slide, veille à ne pas appliquer le flou/zoom
      if (isFirstSlide) {
        slide.find("video").removeClass("flou");
        slide.find("h2").removeClass("move author-visible animate-transform");
        fadeVisionnerTriggerH3(slide, false);
      }
    })
    .css("display", "flex");
});
// -------------------------------- AUTO CLOSE Player Vimeo --------------------------------- //

function initIndexAutoCloseNonActiveSlides() {
  const slides = document.querySelectorAll(".slides");
  if (slides.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      let activeSlide = null;
      let maxRatio = 0;

      // 1. On détermine quelle slide est la plus visible à l'écran
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeSlide = entry.target;
        }
      });

      // 2. On boucle sur TOUTES les slides
      if (activeSlide) {
        slides.forEach((slide) => {
          // Si la slide n'est PAS la slide active, on la force à se réinitialiser.
          if (slide !== activeSlide) {
            resetSlideState($(slide));
          }
        });
      }
    },
    {
      // On observe à plusieurs seuils pour une détection plus fiable
      threshold: [0.2, 0.5, 0.8],
    },
  );

  slides.forEach((slide) => observer.observe(slide));
}

// --------------------------------- LOGIQUE SLIDES (INDEX) --------------------------------- //
// Note: index.js n'est chargé que sur la home. On y garde donc toutes les interactions
// spécifiques aux slides (scroll/wheel/flèche/?slide) pour éviter d'alourdir main.js.

// Expose la fonction pour permettre à main.js (menu global) de déléguer le scroll sur l'index.
window.scrollToAndTrigger = function (slideNumber) {
  const idx = Number(slideNumber);
  if (!Number.isFinite(idx)) return;

  const $slide = $(".slides").eq(idx); // slideNumber correspond déjà à l'index
  if ($slide.length === 0) return;

  $slide[0].scrollIntoView({ behavior: "smooth", block: "start" });

  // Simule un clic pour ouvrir le visionneur
  setTimeout(function () {
    $slide.find("button.visionner-trigger-h3").trigger("click");
  }, 600);
};

// Navigation clavier (flèches) entre slides
$(document).on("keydown", function (e) {
  if ($("input, textarea").is(":focus")) return;
  if ($(".slides").length <= 1) return;

  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

  const $slides = $(".slides");
  let currentIndex = 0;
  let minDist = Infinity;
  const viewportMiddle = window.innerHeight / 2;

  $slides.each(function (i, slide) {
    const rect = slide.getBoundingClientRect();
    const slideMiddle = rect.top + rect.height / 2;
    const dist = Math.abs(slideMiddle - viewportMiddle);
    if (dist < minDist) {
      minDist = dist;
      currentIndex = i;
    }
  });

  if (e.key === "ArrowDown" && currentIndex < $slides.length - 1) {
    $slides.eq(currentIndex + 1)[0].scrollIntoView({ behavior: "smooth" });
  }
  if (e.key === "ArrowUp" && currentIndex > 0) {
    $slides.eq(currentIndex - 1)[0].scrollIntoView({ behavior: "smooth" });
  }
});

function initIndexWheelAndScrollArrow() {
  const slides = document.querySelectorAll(".slides");
  const scrollArrow = document.querySelector(".scroll-down-arrow");
  const container = document.querySelector(".container");

  // Scroll depuis d'autres pages: ?slide=<index>
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get("slide");
    if (slideParam != null && typeof window.scrollToAndTrigger === "function") {
      window.scrollToAndTrigger(slideParam);
    }
  } catch (e) {
    // noop
  }

  // Sur l'index, on peut avoir du scroll-snap CSS. Dans ce cas, ne PAS intercepter la molette.
  if (slides.length && container) {
    let hasCssScrollSnap = false;
    try {
      const snapType = (
        getComputedStyle(container).scrollSnapType || ""
      ).trim();
      hasCssScrollSnap = snapType !== "" && snapType !== "none";
    } catch (e) {
      hasCssScrollSnap = false;
    }

    if (!hasCssScrollSnap) {
      let wheelDebounce = false;
      container.addEventListener(
        "wheel",
        (ev) => {
          if (wheelDebounce) return;
          const delta = ev.deltaY;
          if (Math.abs(delta) < 40) return;
          wheelDebounce = true;

          ev.preventDefault();

          if (delta > 0) {
            // vers le bas : prochaine slide
            const $slides = $(slides);
            let nextSlide = null;
            $slides.each(function (i, slide) {
              const rect = slide.getBoundingClientRect();
              if (rect.top > 10) {
                nextSlide = slide;
                return false;
              }
            });
            if (nextSlide) nextSlide.scrollIntoView({ behavior: "smooth" });
          } else {
            // vers le haut : slide précédente
            const viewportMiddle = window.innerHeight / 2;
            let currentIndex = 0;
            let minDist = Infinity;
            slides.forEach((slide, i) => {
              const rect = slide.getBoundingClientRect();
              const slideMiddle = rect.top + rect.height / 2;
              const dist = Math.abs(slideMiddle - viewportMiddle);
              if (dist < minDist) {
                minDist = dist;
                currentIndex = i;
              }
            });
            if (currentIndex > 0)
              slides[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
          }

          setTimeout(() => (wheelDebounce = false), 600);
        },
        { passive: false },
      );
    }
  }

  // Observer pour inverser l'icône (down/up) selon la slide visible
  if (slides.length && scrollArrow) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (Array.from(slides).indexOf(entry.target) === slides.length - 1) {
            scrollArrow.classList.add("up");
          } else {
            scrollArrow.classList.remove("up");
          }
        });
      },
      { threshold: 0.5 },
    );
    slides.forEach((slide) => observer.observe(slide));
  }
}

// Handler de clic sur la flèche (delegation)
$(document).on(
  "click",
  ".scroll-down-arrow, .scroll-down-arrow img",
  function (event) {
    event.stopPropagation();
    const $arrow = $(this).closest(".scroll-down-arrow");
    const container = document.querySelector(".container");
    if (!container) return;

    if ($arrow.hasClass("up")) {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const $slides = $(".slides");
    let nextSlide = null;
    $slides.each(function (i, slide) {
      const rect = slide.getBoundingClientRect();
      if (rect.top > 10) {
        nextSlide = slide;
        return false;
      }
    });
    if (nextSlide) nextSlide.scrollIntoView({ behavior: "smooth" });
  },
);
