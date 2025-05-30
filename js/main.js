$(document).ready(function() {
    setTimeout(function() {
        $("#transition-overlay").removeClass("active").addClass("hide");
    }, 50);
});

// ----------------------------------------------- Fade transition ---------------------------------- //
$(document).on('click', '.menu-links a', function (e) {
    const href = $(this).attr('href');
    if (href && href !== "#" && !href.startsWith("javascript")) {
        e.preventDefault();

        // Ferme le menu-volet
        $("#menuVolet").removeClass("open");

        // Lance la transition overlay après un court délai
        setTimeout(function () {
            // D'abord retire .hide, puis ajoute .active
            $("#transition-overlay").removeClass("hide").addClass("active");
            setTimeout(function () {
                window.location.href = href;
            }, 700); // Correspond à la durée de la transition CSS
        }, 300); // Délai pour laisser le menu-volet se fermer
    }
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
    info.fadeOut(500); // Masque l'info de la slide active
    slide.find("h2").removeClass("move");
    slide.find("video").removeClass("flou");
    slide.find(".sliderButton .point1").addClass("full").removeClass("empty");
    slide.find(".sliderButton .point2").addClass("empty").removeClass("full");
}
// --------------------------------- slideTrigger changement de slide --------------------------------- //
function slideTrigger(slide) {
    console.log(`Fonction déclenchée pour : ${slide.classList}`);
    // Ajoute ici le code que tu veux exécuter
}
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

// Sélectionne toutes les slides
const slides = document.querySelectorAll('.slides');
const scrollArrow = document.querySelector('.scroll-down-arrow');
// Crée un observateur
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Si la slide visible est la dernière, rotation de la flèche
            if (Array.from(slides).indexOf(entry.target) === slides.length - 1) {
                scrollArrow.classList.add('up');
            } else {
                scrollArrow.classList.remove('up');
            }
        }
    });
}, {
    root: null,
    threshold: 0.5
});

slides.forEach((slide) => {
    observer.observe(slide);
});
// --------------------------------- Reset Slide --------------------------------- //

function resetOtherSlides(activeSlide) {
    $(".slides").not(activeSlide).each(function () {
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

    $(".visionner").fadeOut(400);
    $("body").css("overflow", "auto");
    info.fadeIn(2000); // Affiche uniquement l'info de la slide active
    slide.find("h2").addClass("move");
    slide.find("video").addClass("flou");
    slide.find(".sliderButton .point2").addClass("full").removeClass("empty");
    slide.find(".sliderButton .point1").addClass("empty").removeClass("full");
});
$(document).on("keydown", function (event) {
    if (event.key === "Escape") { // Vérifie si la touche Échap est pressée
        const closeButton = $(".visionner:visible").find(".close-visionner"); // Trouve le bouton close dans le visionneur visible
        if (closeButton.length > 0) {
            closeButton.trigger("click"); // Simule un clic sur le bouton close
        }
    }
});

$(".visionner-trigger").click(function(event) {
    event.stopPropagation();
    const slide = $(this).closest(".slides");
    const visionner = slide.find(".visionner");
    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
});

$(".visionner-trigger-h3").click(function(event) {
    event.stopPropagation();
    const slide = $(this).closest(".slides");
    const visionner = slide.find(".visionner");
    const srcdocupart = slide.find("video source").attr("src"); // Récupère la source de la vidéo
    // Met à jour la source de la vidéo dans le visionneur
    visionner.find("video source").attr("src", srcdocupart);
    visionner.find("video")[0].load(); // Recharge la vidéo
    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
});
// --------------------------------- Scroll Down Arrow --------------------------------- //
gsap.to(".scroll-down-arrow div", {
    y: 20,
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "power2.inOut"
});

$(document).on('click', '.scroll-down-arrow', function () {
    const $arrow = $(this).closest('.scroll-down-arrow');
    const $slides = $('.slides');

    if ($arrow.hasClass('up')) {
        // Flèche vers le haut : remonte tout en haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Flèche vers le bas : va à la prochaine slide
        let nextSlide = null;
        $slides.each(function (i, slide) {
            const rect = slide.getBoundingClientRect();
            if (rect.top > 10) {
                nextSlide = slide;
                return false;
            }
        });
        if (nextSlide) {
            nextSlide.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
// --------------------------------- Chargement de la page --------------------------------- //
$(document).ready(function() {

   // Vérifie si l'écran de chargement est présent
    if ($(".loading-screen").length === 0) {
        // Si pas de loading-screen, rendre le conteneur visible
        $(".container").removeClass("hidden").fadeIn(1000);
    }   

    // Gestion du clic sur le bouton "Entrer"
  $("#enter-button").click(function() {
    clearInterval(intervalId); // Arrête l'animation du loading

    // 1. Fade out du loading
    $(".loading-screen").fadeOut(1000, function () {
        // 2. Juste après, on affiche l'overlay noir (reset les classes)
        $("#transition-overlay").removeClass("hide").addClass("active");

        // 3. Puis fade-out de l'overlay pour révéler l'index
        setTimeout(function() {
            $(".container").removeClass("hidden").fadeIn(1000);
            $("#transition-overlay").removeClass("active").addClass("hide");
        }, 100); // Laisse l'overlay apparaître avant de le faire disparaître
    });
    window.addEventListener('pageshow', function() {
    $("#transition-overlay").removeClass("active").addClass("hide");
});
});
    const loadingItems = $(".loading-item");
    let currentItem = 0;
    const totalItems = loadingItems.length;
    const fadeDuration = 500; // Durée du fondu en millisecondes
    const displayDuration = 3000; // Durée d'affichage de chaque item en millisecondes
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
            setTimeout(function() {
                loadingItems.eq(currentItem).addClass("active");
                isAnimating = false;
            }, fadeDuration); // Délai pour que le fondu sortant soit terminé
        } else if (currentItem === totalItems - 1) {
            // Affiche le dernier item sans le faire disparaître
            setTimeout(function() {
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
    $("#enter-button").click(function() {
        clearInterval(intervalId); // Arrête l'animation
        $(".loading-screen").fadeOut(1000, function() { // Fade out de l'écran de chargement
            $(".container").fadeIn(1000, function() {
                // Démarrer le son du premier chapitre
                var sound = new Howl({
                     src: ['audio/chap1.mp3']
});
                sound.play();
                const firstAudio = document.getElementById('audio-slide-1');
                if (firstAudio) {
                    firstAudio.volume = 0; // Volume initial à 0
                    firstAudio.play();
                    $(firstAudio).animate({volume: 0.5}, 2000); // Fade in jusqu'à 50%
                }
            }); // Fade in du container
        });
    });

    // Gestion du clic sur l'écran de chargement pour passer à l'item suivant
    $(".loading-screen").click(function() {
        showNextItem();
    });
// --------------------------------- MENU BURGER --------------------------------- //

$(document).ready(function () {
    const menuBurger = $("#menuBurger");
    const menuVolet = $("#menuVolet");

    // Gestion du clic sur le menuBurger
    menuBurger.click(function () {
        menuVolet.toggleClass("open"); // Ajoute/supprime la classe "open"
    });

    // Gestion du clic en dehors du menuVolet ou du menuBurger
    $(document).click(function (event) {
        // Vérifie si le clic est en dehors du menuVolet et du menuBurger
        if (!menuVolet.is(event.target) && menuVolet.has(event.target).length === 0 &&
            !menuBurger.is(event.target) && menuBurger.has(event.target).length === 0) {
            menuVolet.removeClass("open"); // Ferme le menuVolet
        }
    });
});
    // Fonction pour gérer le changement de slide et les sons
    function handleSlideChange(slide) {
        // Récupérer l'index de la slide actuelle
        const slideIndex = $(slide).index() + 1;
        }

    // Observer les changements de slide
    const slides = document.querySelectorAll('.slides');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetOtherSlides(entry.target); // <-- Ajout ici
                $(".visionner").fadeOut(0);
                $("body").css("overflow", "auto");
                handleSlideChange(entry.target);
        
            }
        });
    }, {
        threshold: 0.5 // Déclencher quand la slide est visible à 50%
    });

    slides.forEach(slide => {
        observer.observe(slide);
    });
});

// --------------------------------- Auto scroll MENU  --------------------------------- //
$(document).on("click", ".menu-video-item", function () {
    const slideNumber = $(this).data("slide"); // Récupère le numéro de la slide
    const isIndexPage = $(".slides").length > 0;

    if (isIndexPage) {
        // Si on est sur l'index, scrolle et simule le clic
        scrollToAndTrigger(slideNumber);
    } else {
        // Si on n'est pas sur l'index, redirige vers l'index avec un paramètre
        window.location.href = "index.php?slide=" + slideNumber;
    }

    $("#menuVolet").removeClass("open");
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

// Au chargement de l'index, si un paramètre "slide" est présent, scrolle et simule le clic
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    if (slideParam) {
        scrollToAndTrigger(slideParam); // Décrémente slideParam pour correspondre à l'index
    }
});
// Fonction pour ouvrir le visionneur
function openVisionner(videoSrc) {
    const visionner = $(".visionner");
    visionner.find("video source").attr("src", videoSrc); // Met à jour la source de la vidéo
    visionner.find("video")[0].load(); // Recharge la vidéo
    visionner.fadeIn(400).css("display", "flex"); // Affiche le visionneur
    $("body").css("overflow", "hidden"); // Désactive le défilement de la page
}

// Gestion de la fermeture du visionneur
$(document).on("click", ".close-visionner", function () {
    $(".visionner").fadeOut(400, function () {
        $("body").css("overflow", "auto"); // Réactive le défilement de la page
    });
});

// ----------------------------------------------- LANGUE ---------------------------------- //

$(document).on('click', '.lang-option', function() {
    var lang = $(this).data('lang');
    $('.lang-option').removeClass('active');
    $(this).addClass('active');
    // Appelle le serveur pour changer la langue en session
    $.post('includes/setlang.php', { lang: lang }, function() {
        location.reload(); // Recharge la page pour afficher la langue choisie
    });
});

// ----------------------------------------------- Portraits ---------------------------------- //

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
});

$(document).ready(function () {
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
            window.removeEventListener('scroll', removeActiveWhenAtTop);
        }
    }
    window.addEventListener('scroll', removeActiveWhenAtTop);

    setTimeout(function () {
        if (window.scrollY === 0) {
            $(".portrait-detail").removeClass("active");
            $(".portrait-section").removeClass("active");
            window.removeEventListener('scroll', removeActiveWhenAtTop);
        }
    }, 800);
});
window.addEventListener('scroll', function removeActiveOnTop() {
    if (window.scrollY === 0) {
        $(".portrait-section").removeClass("active");
        $(".portrait-detail").removeClass("active");
    }
});
$(document).ready(function () {
    $(".portrait-section").on("click", function () {
        $(".portrait-section").removeClass("active");
        $(this).addClass("active");
        // Ajoute la classe has-active au conteneur si un portrait est actif
        if ($('.portrait-section.active').length) {
            $('.portraits-container').addClass('has-active');
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
            window.removeEventListener('scroll', removeActiveWhenAtTop);
        }
    }
    window.addEventListener('scroll', removeActiveWhenAtTop);
    setTimeout(function () {
        if (window.scrollY === 0) {
            $(".portrait-detail").removeClass("active");
            $(".portrait-section").removeClass("active");
            $(".portraits-container").removeClass("has-active");
            window.removeEventListener('scroll', removeActiveWhenAtTop);
        }
    }, 800);
});
window.addEventListener('scroll', function removeActiveOnTop() {
    if (window.scrollY === 0) {
        $(".portrait-section").removeClass("active");
        $(".portrait-detail").removeClass("active");
        $(".portraits-container").removeClass("has-active");
    }
});


// ----------------------------------------------- Derrière le documentaire ---------------------------------- //
$(function() {
    function randomizeTeamStatesRespectHover() {
        // Sélectionne uniquement les membres qui NE sont PAS hover
        const members = $('.team-member').not('.hover-force').toArray();
        // Remet tous ces membres en photo
        $(members).removeClass('show-info').addClass('show-photo');
        // Calcule combien de blocs texte il reste à afficher
        const hoverCount = $('.team-member.hover-force').length;
        const toShow = Math.max(0, 4 - hoverCount);
        const indices = [];
        while (indices.length < toShow && indices.length < members.length) {
            const idx = Math.floor(Math.random() * members.length);
            if (!indices.includes(idx)) indices.push(idx);
        }
        indices.forEach(idx => {
            $(members[idx]).removeClass('show-photo').addClass('show-info');
        });
    }

    setInterval(randomizeTeamStatesRespectHover, 3000);
    randomizeTeamStatesRespectHover();
    

}); 
        //  ----------------------------------------------- Portfolio ---------------------------------- //
        $(document).on('click', '.team-member', function(e) {
            if ($(e.target).is('.team-portfolio')) return;
            var link = $(this).find('.team-portfolio').attr('href');
            if (link) window.open(link, '_blank');
        });

        // Reset
        $(document).on('keydown', function(e) {
            // Vérifie que l'utilisateur n'est pas en train de saisir du texte dans un input/textarea
            if (
                e.key.toLowerCase() === 'p' &&
                !$('input, textarea').is(':focus')
            ) {
                window.location.href = "includes/reset.php";
            }
        });


// ----------------------------------------------- animation texte ------------------------ //
$(document).ready(function() {
    $('.content-anim').addClass('visible');
});