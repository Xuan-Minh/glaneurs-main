$(document).ready(function() {


     let isAnimating = false;
     const definitionContainer = $('#definition-text');
    if (definitionContainer.length) {
        const definitionText = definitionContainer.data('definition');
        definitionContainer.text(definitionText);
    }
     if ($(".loading-screen").length === 0) {
    // Si pas de loading-screen, rendre le conteneur visible
    $(".container").removeClass("hidden").fadeIn(1000);
    // Ne pas appeler playArirangAudio() directement.
    // Attendre la première interaction de l'utilisateur.
    $(document).one('click.startAudio keydown.startAudio', function() {
        const audio = document.getElementById("audio-arirang");
        // Vérifier si l'audio est en pause (ce qui inclut le cas où il n'a jamais joué)
        // et qu'il n'y a pas de modale vidéo active
        if (audio && audio.paused && $('.visionner:visible').length === 0) {
            playArirangAudio();
        }
    });
  }
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
  // ------------------------------------ INFO SLIDE IN&OUT ------------------------------------------------ //
  const TRANSFORM_ANIMATION_DURATION = 1500; // Durée en ms, doit correspondre à la transition CSS (1.5s)
/**
* @param {jQuery} $slide L'élément jQuery du slide concerné.
*/
function showInfoPanel($slide) {
    if (!$slide || !$slide.length) return;

    const $h2 = $slide.find('h2');
    const $info = $slide.find('.info');
    const $point2 = $slide.find('.point2');

    // Si l'info est déjà visible, on ne fait rien.
    if ($point2.hasClass('full')) return;

    // Cache le bouton "Visionner"
    fadeVisionnerTriggerH3($slide, true);

    $h2.addClass('animate-transform');
    requestAnimationFrame(() => {
        $h2.addClass('move');
    });

    $h2.one('transitionend', function(e) {
        if (e.originalEvent.propertyName === 'transform') {
            $(this).addClass('author-visible');
        }
    });

    $info.fadeIn(500);
    $slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
    $slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
}

/**
 * Cache le panneau d'information pour un slide donné.
 * @param {jQuery} $slide L'élément jQuery du slide concerné.
 */
function hideInfoPanel($slide) {
    if (!$slide || !$slide.length) return;

    const $h2 = $slide.find('h2');
    const $info = $slide.find('.info');
    const $point1 = $slide.find('.point1');

    // Si l'info est déjà cachée, on ne fait rien.
    if ($point1.hasClass('full')) return;

    // Fait réapparaître le bouton "Visionner"
    fadeVisionnerTriggerH3($slide, false);

    $h2.removeClass('author-visible');
    
    setTimeout(() => {
        $h2.removeClass('move');
        $info.fadeOut(300);

        $h2.one('transitionend', function() {
            $(this).removeClass('animate-transform');
        });
    }, 50);

    $slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
    $slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
}


// --------------------------------- EVENT HANDLERS --------------------------------- //

// Clic sur le point 2 (pour afficher les infos)
$('.point2').on('click', function() {
    showInfoPanel($(this).closest('.slides'));
});

// Clic sur le point 1 (pour cacher les infos)
$('.point1').on('click', function() {
    hideInfoPanel($(this).closest('.slides'));
});
/**
 * Ajoute temporairement la classe pour animer la transformation.
 * @param {jQuery} $element L'élément jQuery h2.
 */
 function triggerH2TransformAnimation($element) {
        if (!$element || !$element.length) return;
        $element.addClass('animate-transform');
        // NOUVEAU : On écoute la fin de la transition pour libérer le verrou
        $element.one('transitionend', function(e) {
            if (e.originalEvent.propertyName === 'transform') {
                $element.removeClass('animate-transform');
                isAnimating = false; // On libère le verrou ici
            }
        });
    }


function fadeVisionnerTriggerH3($slide, fadeOut = true) {
  const $trigger = $slide.find('.visionner-trigger-h3').not('.always-visible');
  if (!$trigger.length) return;
  if (fadeOut) {
    $trigger.removeClass('fade-in').addClass('fade-out');
  } else {
    $trigger.removeClass('fade-out').addClass('fade-in');
  }
}

// --------------------------------- Reset Slide --------------------------------- //

function resetOtherSlides(activeSlide) {
  $(".slides")
    .not(activeSlide)
    .each(function () {
      const slide = $(this);
      slide.find(".info").fadeOut(0);

      const $h2 = slide.find("h2");
      if ($h2.hasClass("move")) {
        triggerH2TransformAnimation($h2);
      }
      $h2.removeClass("move");
      // NOUVEAU : On s'assure de cacher l'auteur aussi lors du reset
      $h2.removeClass("author-visible");

      slide.find("video").removeClass("flou");
      fadeVisionnerTriggerH3(slide, false);
      slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
      slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
    });
}

// --------------------------------- Player video --------------------------------- //
let lastFocusedElement; // Variable pour se souvenir du dernier élément focus

function focusTrap(container) {
    const focusableElements = container.find('a[href], button, iframe, [tabindex]:not([tabindex="-1"])').filter(':visible');
    const firstFocusableElement = focusableElements.first();
    const lastFocusableElement = focusableElements.last();

    // Déplace le focus sur le premier élément (l'iframe)
    firstFocusableElement.focus();

    container.on('keydown.focusTrap', function(e) {
        if (e.key === 'Tab' || e.keyCode === 9) {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement[0]) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement[0]) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

function removeFocusTrap(container) {
    container.off('keydown.focusTrap');
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
  });

  playArirangAudio();
  $("body").css("overflow", "auto");
  info.fadeIn(2000);

  const $h2 = slide.find("h2");
  if (!$h2.hasClass("move")) {
    triggerH2TransformAnimation($h2);
  }
  $h2.addClass("move");

  slide.find("video").addClass("flou");
  slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
  slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
});

let vimeoPlayer = null;

$(".visionner-trigger, .visionner-trigger-h3").click(function (event) {
  event.stopPropagation();

  lastFocusedElement = $(this); 
  stopArirangAudio();
  const slide = $(this).closest(".slides");
  const visionner = slide.find(".visionner");
  const vimeoId = $(this).data("vimeo");
  const lang = $(this).data("lang") || "fr";
  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&texttrack=${lang}`;

  // Supprime tout iframe existant dans le visionneur
  visionner.find("iframe").remove();

  // Crée et injecte le nouvel iframe
  const iframe = $(`<iframe src="${vimeoUrl}" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
  visionner.append(iframe);

  // Détruit l'ancien player Vimeo s'il existe
  if (vimeoPlayer) {
    vimeoPlayer.unload().catch(()=>{});
    vimeoPlayer = null;
  }

  // Crée un nouveau player Vimeo et attache l'event 'ended'
  vimeoPlayer = new Vimeo.Player(iframe[0]);
  vimeoPlayer.on('ended', function () {
    visionner.fadeOut(400, function () {
      $("body").css("overflow", "auto");
      const info = slide.find('.info');
      info.fadeIn(2000);
      slide.find("h2").addClass("move");
      fadeVisionnerTriggerH3(slide, true);
      slide.find("video").addClass("flou");
      slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
      slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
    });
  });

  visionner.fadeIn(400, function () {
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
    focusTrap(visionner);
  }).css("display", "flex");
});
// -------------------------------- AUTO CLOSE Player Vimeo --------------------------------- //

$(function () {
  // Observer pour fermer l'info quand la slide sort du viewport
  const slides = document.querySelectorAll('.slides');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Si la slide sort du viewport, ferme son info
        hideInfoPanel($(entry.target)); // MODIFIÉ : On appelle la nouvelle fonction unifiée
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