let fadeInterval = null;
let isGloballyMuted = true; 
let audioContextStarted = false;

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

// ... (le code au-dessus reste le même)

function playArirangAudio() {
  const audio = document.getElementById("audio-arirang");
  if (audio) {
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          if (audio.muted) audio.muted = false;
          fadeAudio(audio, 0.3, 2000);
          $(document).off('click.autoplay keydown.autoplay');
        }).catch(error => {
          // Ajout d’un log plus détaillé
          console.error("Arirang audio autoplay was prevented or failed:", error);
          if (audio.error) {
            console.error("Audio error code:", audio.error.code);
          }
          $(document).one('click.autoplay keydown.autoplay', function() {
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
    window.location.href = "includes/reset.php";
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
// ----------------------------------------------- HOVER VIDEO ---------------------------------- //
$(".menu-video-item").on("mouseenter", function () {
    const video = $(this).find(".menu-video")[0];
    if (video) {
      video.play().catch(error => {
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

document.addEventListener('DOMContentLoaded', () => {
    const audioContainer = document.getElementById('global-audio-control-container');
    const waveCanvas = document.getElementById('wave');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const iconSoundOff = document.getElementById('icon-sound-off');

    if (!audioContainer || !waveCanvas || !iconSoundOn || !iconSoundOff) {
        return;
    }

    const ctx = waveCanvas.getContext('2d');
    const canvasWidth = waveCanvas.width;
    const canvasHeight = waveCanvas.height;
    

    
    let animationFrameId;
    let waveXOffset = 0;

    // --- NOUVELLE LOGIQUE DE PERSISTANCE ---
    // Au chargement de la page, on vérifie si l'utilisateur a déjà activé le son par le passé.
    if (localStorage.getItem('audioHasBeenInitialized') === 'true') {
        audioContextStarted = true;
        // On récupère son dernier choix (activé ou coupé)
        isGloballyMuted = localStorage.getItem('isSiteMuted') === 'true';

        // Si le son doit être activé, on tente de le lancer
        if (!isGloballyMuted) {
            // On utilise un petit délai pour s'assurer que les scripts des autres pages (portraits.js) sont chargés
            setTimeout(() => {
                if (typeof playArirangAudio === 'function') {
                    playArirangAudio();
                }
                if (typeof startPortraitsAudio === 'function') {
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
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function drawMovingWave() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight / 2);
        for (let x = 0; x < canvasWidth; x++) {
            const y = canvasHeight / 2 + Math.sin((x + waveXOffset) * 0.4) * (canvasHeight / 3.5);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        waveXOffset += 0.3;
        if (waveXOffset > Math.PI * 100) waveXOffset = 0;

        if (!isGloballyMuted) {
            animationFrameId = requestAnimationFrame(drawMovingWave);
        }
    }

function updateAudioElements() {
    const mediaElements = document.querySelectorAll('audio, video');
    mediaElements.forEach(media => {
        if (media.tagName === "AUDIO") {
            if (media.closest('.loading-screen')) {
                media.muted = true;
            } else {
                media.muted = isGloballyMuted;
            }
        }
        // NE TOUCHE PAS AUX VIDEOS DE FOND
    });

        // AJOUT : Communique l'état du son au script des portraits s'il est présent
        if (typeof window.setPortraitsMuteState === 'function') {
            window.setPortraitsMuteState(isGloballyMuted);
        }
    }

    function updateUI() {
        if (isGloballyMuted) {
            iconSoundOn.classList.add('icon-hidden');
            iconSoundOff.classList.remove('icon-hidden');
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            drawFlatLine();
        } else {
            iconSoundOn.classList.remove('icon-hidden');
            iconSoundOff.classList.add('icon-hidden');
            drawMovingWave();
        }
        // On sauvegarde l'état uniquement après la première interaction
        if (audioContextStarted) {
            localStorage.setItem('isSiteMuted', isGloballyMuted);
        }
    }

    function initAudio() {
        if (audioContextStarted) return;
        
        isGloballyMuted = false;
        audioContextStarted = true;

        // --- MODIFICATION ---
        // On sauvegarde que l'utilisateur a activé le son pour la première fois.
        localStorage.setItem('audioHasBeenInitialized', 'true');
        localStorage.setItem('isSiteMuted', 'false'); // On sauvegarde l'état "activé"

        if (typeof playArirangAudio === 'function') {
            playArirangAudio();
        }
        if (typeof startPortraitsAudio === 'function') {
            startPortraitsAudio();
        }

        updateAudioElements();
        updateUI();
    }

    // ... (le code de initAudio() reste le même) ...

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
            if (typeof playArirangAudio === 'function') {
                playArirangAudio();
            }
            if (typeof startPortraitsAudio === 'function') {
                startPortraitsAudio();
            }
        }
        
        // On met à jour les éléments audio et l'icône.
        updateAudioElements();
        updateUI();
    }


    audioContainer.addEventListener('click', handleSoundIconClick);

    const enterButton = document.getElementById('enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', initAudio);
    }

    // État initial au chargement (prend en compte le localStorage)
    updateUI();
    updateAudioElements();
});