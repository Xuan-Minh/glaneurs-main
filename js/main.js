let fadeInterval = null;

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
    if ((step > 0 && current >= to) || (step < 0 && current <= to) || count > duration / 50) {
      audio.volume = to;
      clearInterval(fadeInterval);
      fadeInterval = null;
      if (to === 0) audio.pause();
    }
  }, 50);
}

function playArirangAudio() {
  const audio = document.getElementById("audio-arirang");
  if (!audio) return;
  audio.volume = 0;
  // Ne pas remettre audio.currentTime = 0;
  audio.play();
  fadeAudio(audio, 0.3, 2000); // Fade in jusqu'à 50% en 1.2s
}

function stopArirangAudio() {
  const audio = document.getElementById("audio-arirang");
  if (!audio) return;
  fadeAudio(audio, 0, 800); // Fade out en 0.8s
}

$(document).on("keydown", function (e) {
  // Vérifie que l'utilisateur n'est pas en train de saisir du texte dans un input/textarea
  if (e.key.toLowerCase() === "p" && !$("input, textarea").is(":focus")) {
    window.location.href = "includes/reset.php";
  }
  if (e.key === "Escape") {
    // Vérifie si la touche Échap est pressée
    const closeButton = $(".visionner:visible").find(".close-visionner"); // Trouve le bouton close dans le visionneur visible
    if (closeButton.length > 0) {
      closeButton.trigger("click"); // Simule un clic sur le bouton close
    }
  }
});
$(document).ready(function () {
  // ----------------------------------------------- LOADING ---------------------------------- //

window.addEventListener("beforeunload", stopArirangAudio);
window.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") stopArirangAudio();
  if (document.visibilityState === "visible") playArirangAudio();
});

  if ($(".loading-screen").length === 0) {
    // Si pas de loading-screen, rendre le conteneur visible
    $(".container").removeClass("hidden").fadeIn(1000);
    playArirangAudio();
  }

  // Gestion du clic sur le bouton "Entrer"
  $("#enter-button").click(function () {
    clearInterval(intervalId); // Arrête l'animation du loading

    // 1. Fade out du loading
    $(".loading-screen").fadeOut(1000, function () {
      // 2. Juste après, on affiche l'overlay noir (reset les classes)
      $("#transition-overlay").removeClass("hide").addClass("active");

      // 3. Puis fade-out de l'overlay pour révéler l'index
      setTimeout(function () {
        $(".container").removeClass("hidden").fadeIn(1000);
        $("#transition-overlay").removeClass("active").addClass("hide");
      }, 100); // Laisse l'overlay apparaître avant de le faire disparaître
    });

    window.addEventListener("pageshow", function () {
      $("#transition-overlay").removeClass("active").addClass("hide");
    });
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

  // Gestion du clic sur le bouton "Entrer"
 $("#enter-button").click(function () {
  clearInterval(intervalId); // Arrête l'animation
  $(".loading-screen").fadeOut(1000, function () {
    $(".container").fadeIn(1000, function () {
      playArirangAudio();
    });
  });
});
  // Gestion du clic sur l'écran de chargement pour passer à l'item suivant
  $(".loading-screen").click(function () {
    showNextItem();
  });
  

  // ----------------------------------------------- Transition overlay ---------------------------------- //
  setTimeout(function () {
    $("#transition-overlay").removeClass("active").addClass("hide");
  }, 50);

  // ----------------------------------------------- Menu Burger ---------------------------------- //
  // Sélectionne les éléments du menuBurger et du menuVolet
  const menuBurger = $("#menuBurger");
  const menuVolet = $("#menuVolet");

  // Gestion du clic sur le menuBurger
  menuBurger.click(function () {
    $(this).toggleClass("open");
    menuVolet.toggleClass("open"); // Ajoute/supprime la classe "open"
  });

  // Gestion du clic en dehors du menuVolet ou du menuBurger
  $(document).click(function (event) {
    // Vérifie si le clic est en dehors du menuVolet et du menuBurger
    if (
      !menuVolet.is(event.target) &&
      menuVolet.has(event.target).length === 0 &&
      !menuBurger.is(event.target) &&
      menuBurger.has(event.target).length === 0
    ) {
      menuVolet.removeClass("open"); // Ferme le menuVolet
       $("#menuBurger").removeClass("open");
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
$(document).on("click", ".menu-links a", function (e) {
  const href = $(this).attr("href");
  if (!href || href === "#" || href.startsWith("javascript")) return;

  // Normalise l'URL courante et la cible
  const current = window.location.pathname.replace(/\/$/, "").replace(/^\/index\.php$/, "/");
  let target = href.replace(/^\.\//, "/").replace(/\/$/, "");
  if (target === "" || target === "/") target = "/index.php";
  if (!target.startsWith("/")) target = "/" + target;

  // Si on est déjà sur la page demandée, ne rien faire (juste fermer le menu)
  if (
    current === target ||
    (current === "/index.php" && (target === "/" || target === "/index.php")) ||
    (current === "/" && (target === "/" || target === "/index.php"))
  ) {
    e.preventDefault();
    $("#menuVolet").removeClass("open");
    $("#menuBurger").removeClass("open");
    return;
  }

  // Sinon, navigation normale avec transition
  e.preventDefault();

  // Fade out audio si besoin
  if (typeof gains !== "undefined" && gains.length) {
    gains.forEach(g => fadeTo(g, 0, 0.8));
  }
  if (typeof stopArirangAudio === "function") stopArirangAudio();

  // Ferme le menu-volet
  $("#menuVolet").removeClass("open");
  $("#menuBurger").removeClass("open");

  // Lance la transition overlay après un court délai
  setTimeout(function () {
    $("#transition-overlay").removeClass("hide").addClass("active");
    setTimeout(function () {
      if (typeof stopArirangAudio === "function") stopArirangAudio();
      window.location.href = href;
    }, 800); // Correspond à la durée du fade
  }, 300);
});
// ------------------------------------ INFO SLIDE IN&OUT ------------------------------------------------ //
function slideIn(slide, info) {
  resetOtherSlides(slide); // Réinitialise les autres slides
  $("body").css("overflow", "auto");
  info.fadeIn(2000); // Affiche l'info de la slide active
  slide.find("h2").addClass("move");
  slide.find("video").addClass("flou");
  slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
  slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
}
function slideOut(slide, info) {
  $("body").css("overflow", "auto");
  info.fadeOut(200); // Masque l'info de la slide active
  slide.find("h2").removeClass("move");
  slide.find("video").removeClass("flou");
  slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
  slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
}
// --------------------------------- slideTrigger changement de slide --------------------------------- //

$(".sliderButton .point2").click(function (event) {
  event.stopPropagation(); // Empêche la propagation de l'événement
  const slide = $(this).closest(".slides"); // Récupère la slide parente
  const info = slide.find(".info"); // Récupère l'élément .info de la slide
  slideIn(slide, info); // Appelle slideIn pour cette slide
});

$(".sliderButton .point1").click(function (event) {
  event.stopPropagation(); // Empêche la propagation de l'événement
  const slide = $(this).closest(".slides"); // Récupère la slide parente
  const info = slide.find(".info"); // Récupère l'élément .info de la slide
  slideOut(slide, info); // Appelle slideOut pour cette slide
});

// --------------------------------- Reset Slide --------------------------------- //

function resetOtherSlides(activeSlide) {
  $(".slides")
    .not(activeSlide)
    .each(function () {
      const slide = $(this);
      slide.find(".info").fadeOut(0); // Masque les infos des autres slides
      slide.find("h2").removeClass("move"); // Supprime l'animation des titres
      slide.find("video").removeClass("flou"); // Supprime l'effet de flou des vidéos
      slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
      slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
    });
}

// --------------------------------- Player video --------------------------------- //
$(".close-visionner").click(function (event) {
  event.stopPropagation(); // Empêche la propagation de l'événement
  const slide = $(this).closest(".slides"); // Récupère la slide parente
  const info = slide.find(".info"); // Récupère l'élément .info de la slide
  const visionner = slide.find(".visionner");
  $(".visionner").fadeOut(400);
  playArirangAudio();
  $("body").css("overflow", "auto");
  info.fadeIn(2000); // Affiche uniquement l'info de la slide active
  slide.find("h2").addClass("move");
  slide.find("video").addClass("flou");
  slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
  slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
});


$(".visionner-trigger, .visionner-trigger-h3").click(function (event) {
  event.stopPropagation();
  stopArirangAudio();
  const slide = $(this).closest(".slides");
  const visionner = slide.find(".visionner");
  visionner.fadeIn(400, function () {
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
  }).css("display", "flex");
});
// -------------------------------- AUTO CLOSE Player Vimeo --------------------------------- //
$(function () {
  $('.visionner iframe').each(function () {
    // Crée un player Vimeo pour chaque iframe
    let player = new Vimeo.Player(this);

    player.on('ended', function () {
      // Ferme le visionneur quand la vidéo est terminée
      const $visionner = $(this.element).closest('.visionner');
      const $slide = $visionner.closest('.slides');
      const $info = $slide.find('.info');
      $visionner.fadeOut(400, function () {
        $("body").css("overflow", "auto");
        // Affiche l'info comme lors du clic sur la croix
        $info.fadeIn(2000);
        $slide.find("h2").addClass("move");
        $slide.find("video").addClass("flou");
        $slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
        $slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
      });
    });
  });
});

$(function () {
  // Observer pour fermer l'info quand la slide sort du viewport
  const slides = document.querySelectorAll('.slides');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Si la slide sort du viewport, ferme son info
        const $slide = $(entry.target);
        const $info = $slide.find('.info');
        if ($info.is(':visible')) {
          slideOut($slide, $info);
        }
      }
    });
  }, { threshold: 0.2 }); // 20% visible

  slides.forEach(slide => observer.observe(slide));
});
// --------------------------------- Scroll Down Arrow --------------------------------- //
gsap.to(".scroll-down-arrow div", {
  y: 20,
  opacity: 0,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power2.inOut",
});

$(document).on(
  "click",
  ".scroll-down-arrow, .scroll-down-arrow img",
  function () {
    const $arrow = $(this).closest(".scroll-down-arrow");
    if ($arrow.hasClass("up")) {
      // Flèche vers le haut : remonte tout en haut
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Flèche vers le bas : va à la prochaine slide
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
    $slide.find("h2").trigger("click");
  }, 600);
}


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
    url.searchParams.set('lang', lang);
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
  const anims = document.querySelectorAll('.content-anim');

  // Crée l'observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');  
        obs.unobserve(entry.target); // Optionnel : n'observe plus après animation
      }
    });
  }, { threshold: 0.2 }); // 20% visible

  anims.forEach(el => observer.observe(el));
});

// Effet halo brumeux au clic
document.addEventListener('click', function(e) {
  const halo = document.createElement('div');
  halo.className = 'halo-click';
  halo.style.left = (e.clientX - 90) + 'px'; // centre l'effet sur le clic
  halo.style.top = (e.clientY - 90) + 'px';
  document.body.appendChild(halo);
  setTimeout(() => halo.remove(), 1000); // retire l'effet après l'anim
});

// Animation de la ligne blanche dans le header (uniquement sur l'index)
if ($('.sound-wave-header .sound-wave-line').length && typeof playArirangAudio === "function") {
  let wavePhase = 0;
  let lastVol = 0;

  function updateHeaderSoundWave(volume) {
    const amplitude = 8 + 12 * Math.pow(volume, 1.3); // amplitude adaptée
    const length = 120;
    const steps = 32;
    const points = [];
    wavePhase += 0.045 + 0.01 * volume;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * length;
      const y = 20 + Math.sin((i / steps) * Math.PI * 2 * (2.2 + volume) + wavePhase) * amplitude;
      points.push(`${x},${y}`);
    }
    $(".sound-wave-header .sound-wave-line").attr("points", points.join(" "));
    lastVol = volume;
  }

  function animateHeaderSoundWave() {
    // Utilise le volume de l'audio principal (Arirang)
    let audio = document.getElementById("audio-arirang");
    let vol = 0;
    if (audio && !audio.paused) {
      vol = audio.volume; // ou utilise une variable volume si tu fais un fade
    }
    updateHeaderSoundWave(vol);
    requestAnimationFrame(animateHeaderSoundWave);
  }

  animateHeaderSoundWave();
}
