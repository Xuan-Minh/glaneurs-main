let fadeInterval = null;
let isGloballyMuted = true;
let audioContextStarted = false;
window.shouldPlayPortraitsAudio = false;

function fadeAudio(audio, to, duration = 1000) {
  if (!audio) return;
  if (fadeInterval) clearInterval(fadeInterval); // Annule tout fade en cours
  const start = audio.volume;
  const step = (to - start) / (duration / 50);
  let current = start;
  let count = 0;
  fadeInterval = setInterval(() => {
    current += step;
    count += 1;
    audio.volume = Math.max(0, Math.min(1, current));
    if (
      (step > 0 && current >= to) ||
      (step < 0 && current <= to) ||
      count > duration / 50
    ) {
      audio.volume = to;
      clearInterval(fadeInterval);
      fadeInterval = null;
      if (to === 0) audio.pause();
    }
  }, 50);
}

function addHideHeaderOnScroll(scrollElement) {
  const $header = $("header");
  let lastScroll = 0;
  $(scrollElement).on("scroll", function () {
    const currentScroll = $(this).scrollTop();
    if (currentScroll > lastScroll && currentScroll > 200) {
      $header.addClass("hide-header");
    } else if (currentScroll < lastScroll) {
      $header.removeClass("hide-header");
    }
    if (currentScroll < 20) $header.removeClass("hide-header");
    lastScroll = currentScroll;
  });
}

function playArirangAudio() {
  if (isGloballyMuted) return;
  const audio = document.getElementById("audio-arirang");
  if (audio) {
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            if (audio.muted) audio.muted = false;
            fadeAudio(audio, 0.6, 500);
            $(document).off("click.autoplay keydown.autoplay");
          })
          .catch((error) => {
            // Ajout d’un log plus détaillé
            console.error(
              "Arirang audio autoplay was prevented or failed:",
              error
            );
            if (audio.error) {
              console.error("Audio error code:", audio.error.code);
            }
            $(document).one("click.autoplay keydown.autoplay", function () {
              if (!isGloballyMuted) playArirangAudio();
            });
          });
      }
    } else if (!audio.muted && audio.volume < 0.3) {
      fadeAudio(audio, 0.3, 2000);
    }
  }
}

// ... (le reste de votre code reste le même)

function stopArirangAudio() {
  const audio = document.getElementById("audio-arirang");
  if (!audio) return;
  fadeAudio(audio, 0, 800); // Fade out en 0.8s
}

$(document).on("keydown", function (e) {
  // Vérifie que l'utilisateur n'est pas en train de saisir du texte dans un input/textarea
  if (e.key.toLowerCase() === "p" && !$("input, textarea").is(":focus")) {
    window.location.href = "tools/reset.php";
  }
  if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    // Ferme tous les visionneurs ouverts
    $(".visionner:visible").each(function () {
      $(this).find(".close-visionner").trigger("click");
    });
  }
  if (
    !$("input, textarea").is(":focus") && // Pas dans un champ texte
    $(".slides").length > 1
  ) {
    const $slides = $(".slides");
    // Trouve la slide la plus visible (milieu de l'écran)
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

    if (e.key === "ArrowDown") {
      // Flèche bas : slide suivante
      if (currentIndex < $slides.length - 1) {
        $slides.eq(currentIndex + 1)[0].scrollIntoView({ behavior: "smooth" });
      }
    }
    if (e.key === "ArrowUp") {
      // Flèche haut : slide précédente
      if (currentIndex > 0) {
        $slides.eq(currentIndex - 1)[0].scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});
$(document).ready(function () {
  // ----------------------------------------------- LOADING ---------------------------------- //

  window.addEventListener("beforeunload", stopArirangAudio);
  window.addEventListener("visibilitychange", function () {
    // Ne fait rien si l'utilisateur n'a jamais activé le son
    if (!audioContextStarted) return;

    if (document.visibilityState === "hidden") {
      stopArirangAudio();
    }
    // Ne relance le son que s'il n'est pas coupé globalement
    if (document.visibilityState === "visible" && !isGloballyMuted) {
      playArirangAudio();
    }
  });

  $(document).on("click", ".transition-link", function (e) {
    e.preventDefault();
    const href = $(this).attr("href");

    // Si le lien est invalide, ne rien faire
    if (!href || href === "#" || href.startsWith("javascript")) return;

    // Normalise les URLs pour vérifier si on est déjà sur la page
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const targetPath = new URL(href, window.location.origin).pathname.replace(
      /\/$/,
      ""
    );

    if (currentPath === targetPath) {
      // Si on est déjà sur la page, on ferme juste le menu s'il est ouvert
      $("#menuVolet").removeClass("open");
      $("#menuBurger").removeClass("open");
      return;
    }

    // Si on doit changer de page :
    // 1. Gérer l'audio
    if (typeof stopArirangAudio === "function") stopArirangAudio();

    // 2. Fermer le menu-volet (ne fait rien s'il est déjà fermé)
    $("#menuVolet").removeClass("open");
    $("#menuBurger").removeClass("open");

    // 3. Lancer l'animation de transition
    // On attend un peu que le menu se ferme visuellement
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

    // Étape A : On retire la classe 'hide' et on désactive la transition
    // pour que l'overlay redevienne visible instantanément, sans animation.
    overlay.css("transition", "none");
    overlay.removeClass("hide");

    // Étape B (L'ASTUCE CLÉ) : On force le navigateur à recalculer le style.
    // En demandant son 'offsetHeight', on l'oblige à prendre en compte le changement de l'étape A.
    // Sans cette ligne, le navigateur est "trop intelligent" et ne voit pas de changement à animer.
    void overlay[0].offsetHeight;

    // Étape C : Maintenant que le navigateur sait que l'overlay est visible,
    // on réactive l'animation et on rajoute la classe pour le faire disparaître en fondu.
    overlay.css("transition", "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)");
    overlay.addClass("hide");

    // Étape D : On réinitialise le reste de la page pour un état propre
    window.scrollTo(0, 0);
    $("body").css("overflow", "auto");
    $(".visionner").fadeOut(0);
    if (typeof stopArirangAudio === "function") {
      stopArirangAudio();
    }
  });

  // --- ANIMATION D'ENTRÉE POUR UN CHARGEMENT NORMAL ---
  // Ce code est correct et nécessaire. Il gère la toute première visite de la page.
  setTimeout(function () {
    $("#transition-overlay").addClass("hide");
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
  const slides = document.querySelectorAll(".slides");
  const scrollArrow = document.querySelector(".scroll-down-arrow");
  if (slides.length && scrollArrow) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              Array.from(slides).indexOf(entry.target) ===
              slides.length - 1
            ) {
              scrollArrow.classList.add("up");
            } else {
              scrollArrow.classList.remove("up");
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    slides.forEach((slide) => observer.observe(slide));
  }

  // Handler de clic sur la flèche (à l'extérieur de l'observer)
  $(document).on(
    "click",
    ".scroll-down-arrow, .scroll-down-arrow img",
    function (event) {
      event.stopPropagation();
      const $arrow = $(this).closest(".scroll-down-arrow");
      if ($arrow.hasClass("up")) {
        console.log("Flèche UP cliquée");
        $(".container")[0].scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const $slides = $(".slides");
        let nextSlide = null;
        $slides.each(function (i, slide) {
          const rect = slide.getBoundingClientRect();
          if (rect.top > 10) {
            nextSlide = slide;
            return false;
          }
        });
        if (nextSlide) {
          nextSlide.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  );
  // ----------------------------------------------- Scroll depuis d'autres pages---------------------------------- //
  const urlParams = new URLSearchParams(window.location.search);
  const slideParam = urlParams.get("slide");
  if (slideParam) {
    scrollToAndTrigger(slideParam); // Décrémente slideParam pour correspondre à l'index
  }
});
// ----------------------------------------------- Fade transition ---------------------------------- //

// --------------------------------- Auto scroll MENU  --------------------------------- //
$(document).on("click", ".menu-video-item", function () {
  const slideNumber = $(this).data("slide");
  const isIndexPage = $(".slides").length > 0;

  $("#menuVolet").removeClass("open");
  $("#menuBurger").removeClass("open");

  if (isIndexPage) {
    // Sur l'index : pas de transition, pas de délai
    scrollToAndTrigger(slideNumber);
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
// Fonction pour scroller et simuler le clic
function scrollToAndTrigger(slideNumber) {
  const $slide = $(".slides").eq(slideNumber); // Pas de -1 car slideNumber correspond déjà à l'index
  if ($slide.length === 0) return;

  $slide[0].scrollIntoView({ behavior: "smooth", block: "start" });

  // Simule un clic sur le H2 pour ouvrir le visionneur
  setTimeout(function () {
    $slide.find("button.visionner-trigger-h3").trigger("click");
  }, 600);
}
// ----------------------------------------------- HOVER VIDEO ---------------------------------- //
$(".menu-video-item").on("mouseenter", function () {
  const video = $(this).find(".menu-video")[0];
  if (video) {
    video.play().catch((error) => {
      // Gère les erreurs potentielles si l'autoplay est bloqué
      // console.warn("Video play被阻止:", error);
    });
  }
});

$(".menu-video-item").on("mouseleave", function () {
  const video = $(this).find(".menu-video")[0];
  if (video) {
    video.pause();
  }
});

// ----------------------------------------------- LANGUE ---------------------------------- //

$(document).on("click", ".lang-option", function () {
  let lang = $(this).data("lang");
  if ($(this).hasClass("active")) return;

  $(".lang-option").removeClass("active");
  $(this).addClass("active");
  $("#menuVolet").removeClass("open");

  // Lance l'animation overlay
  $("#transition-overlay").removeClass("hide").addClass("active");

  // Après la transition, change la langue via l'URL
  setTimeout(function () {
    let url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  }, 700); // 700ms = durée de la transition CSS
});

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

// ----------------------------------------------- Animation de contenu ---------------------------------- //
$(function () {
  // Sélectionne tous les éléments à animer
  const anims = document.querySelectorAll(".content-anim");

  // Crée l'observer
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // Optionnel : n'observe plus après animation
        }
      });
    },
    { threshold: 0.2 }
  ); // 20% visible

  anims.forEach((el) => observer.observe(el));
});

// Effet halo brumeux au clic
document.addEventListener("click", function (e) {
  const halo = document.createElement("div");
  halo.className = "halo-click";
  halo.style.left = e.clientX - 90 + "px"; // centre l'effet sur le clic
  halo.style.top = e.clientY - 90 + "px";
  document.body.appendChild(halo);
  setTimeout(() => halo.remove(), 1000); // retire l'effet après l'anim
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    if (!$(".loading-screen").length) {
      $("#transition-overlay").addClass("hide"); // .hide déclenche la transition CSS
    }
  }, 50);
});
document.addEventListener("DOMContentLoaded", () => {
  const audioContainer = document.getElementById(
    "global-audio-control-container"
  );
  const waveCanvas = document.getElementById("wave");
  const iconSoundOn = document.getElementById("icon-sound-on");
  const iconSoundOff = document.getElementById("icon-sound-off");

  if (!audioContainer || !waveCanvas || !iconSoundOn || !iconSoundOff) {
    return;
  }

  const ctx = waveCanvas.getContext("2d");
  const canvasWidth = waveCanvas.width;
  const canvasHeight = waveCanvas.height;

  let animationFrameId;
  let waveXOffset = 0;

  // --- NOUVELLE LOGIQUE DE PERSISTANCE ---
  // Au chargement de la page, on vérifie si l'utilisateur a déjà activé le son par le passé.
  if (localStorage.getItem("audioHasBeenInitialized") === "true") {
    audioContextStarted = true;
    // On récupère son dernier choix (activé ou coupé)
    isGloballyMuted = localStorage.getItem("isSiteMuted") === "true";

    // Si le son doit être activé, on tente de le lancer
    if (!isGloballyMuted) {
      setTimeout(() => {
        if (typeof playArirangAudio === "function") {
          playArirangAudio();
        }
        // MODIFICATION ICI : On ne lance pas directement, on lève le drapeau
        if (typeof startPortraitsAudio === "function") {
          window.shouldPlayPortraitsAudio = true;
          // On essaie quand même de le lancer, au cas où il serait déjà prêt
          startPortraitsAudio();
        }
      }, 100);
    }
  }
  // --- FIN DE LA NOUVELLE LOGIQUE ---

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
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    for (let x = 0; x < canvasWidth; x++) {
      const y =
        canvasHeight / 2 +
        Math.sin((x + waveXOffset) * 0.4) * (canvasHeight / 3.5);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
    waveXOffset += 0.3;
    if (waveXOffset > Math.PI * 100) waveXOffset = 0;

    if (!isGloballyMuted) {
      animationFrameId = requestAnimationFrame(drawMovingWave);
    }
  }

  function updateAudioElements() {
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((media) => {
      if (media.tagName === "AUDIO") {
        if (media.closest(".loading-screen")) {
          media.muted = true;
        } else {
          media.muted = isGloballyMuted;
        }
      }
      // NE TOUCHE PAS AUX VIDEOS DE FOND
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
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      drawFlatLine();
    } else {
      iconSoundOn.classList.remove("icon-hidden");
      iconSoundOff.classList.add("icon-hidden");
      drawMovingWave();
    }
    // On sauvegarde l'état uniquement après la première interaction
    if (audioContextStarted) {
      localStorage.setItem("isSiteMuted", isGloballyMuted);
    }
  }

  function initAudio() {
    if (audioContextStarted) return;

    isGloballyMuted = false;
    audioContextStarted = true;

    localStorage.setItem("audioHasBeenInitialized", "true");
    localStorage.setItem("isSiteMuted", "false");

    // On ne lance le son que si isGloballyMuted est faux
    if (!isGloballyMuted) {
      if (typeof playArirangAudio === "function") {
        playArirangAudio();
      }
      if (typeof startPortraitsAudio === "function") {
        startPortraitsAudio();
      }
    }

    updateAudioElements();
    updateUI();
  }

  function handleSoundIconClick() {
    // Si le contexte audio n'a pas encore été initié par l'utilisateur (via le bouton "Entrer"),
    // l'icône de son ne doit rien faire. C'est le bouton "Entrer" qui a la priorité.
    if (!audioContextStarted) {
      return;
    }

    // Si on arrive ici, c'est que initAudio() a déjà été appelé au moins une fois.
    // L'icône peut maintenant gérer le changement d'état (muet/non muet).
    isGloballyMuted = !isGloballyMuted; // On inverse l'état

    // Si on vient de réactiver le son, on s'assure que la lecture est bien lancée.
    if (!isGloballyMuted) {
      if (typeof playArirangAudio === "function") {
        playArirangAudio();
      }
      if (typeof startPortraitsAudio === "function") {
        startPortraitsAudio();
      }
    }

    // On met à jour les éléments audio et l'icône.
    updateAudioElements();
    updateUI();
  }

  audioContainer.addEventListener("click", handleSoundIconClick);

  const enterButton = document.getElementById("enter-button");
  if (enterButton) {
    enterButton.addEventListener("click", initAudio);
  }

  // État initial au chargement (prend en compte le localStorage)
  updateUI();
  updateAudioElements();
});

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

  // Définit le message et affiche la notification
  notification.textContent = message;
  notification.classList.add("show");

  // Cache la notification après la durée spécifiée
  setTimeout(() => {
    notification.classList.remove("show");
  }, duration);
}

const feedbackButton = document.querySelector(".feedback-button");

if (feedbackButton) {
  feedbackButton.addEventListener("click", function () {
    const email = this.dataset.email;

    // Utilise l'API du presse-papiers (moderne et sécurisée)
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // Succès de la copie
        const successMessage =
          this.dataset.lang === "ko"
            ? "이메일이 복사되었습니다!"
            : this.dataset.lang === "en"
            ? "Email copied to clipboard!"
            : "Email copié dans le presse-papiers !";
        showNotification(successMessage);
      })
      .catch((err) => {
        // Erreur lors de la copie
        console.error("Erreur lors de la copie de l'email : ", err);
        const errorMessage =
          this.dataset.lang === "ko"
            ? "복사 실패"
            : this.dataset.lang === "en"
            ? "Copy failed"
            : "La copie a échoué";
        showNotification(errorMessage);
      });
  });
}
