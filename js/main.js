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
    console.log(srcdocupart); // Affiche la source dans la console
    // Met à jour la source de la vidéo dans le visionneur
    visionner.find("video source").attr("src", srcdocupart);
    visionner.find("video")[0].load(); // Recharge la vidéo

    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
});

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

$(window).on("scroll", function () {
    // Récupère la position actuelle de défilement
    let scrollPosition = $(window).scrollTop();

    // Vérifie si la position de défilement atteint ou dépasse 100vh
    if (scrollPosition >= $(window).height()) {
        // Déclenche la fonction
        triggerFunction();
    }
});

// Fonction à déclencher
function triggerFunction() {
    alert("Vous avez scrollé 100vh !");
    // Ajoute ici le code que tu veux exécuter
}

// Sélectionne toutes les slides
const slides = document.querySelectorAll('.slides');

// Crée un observateur
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(`Slide visible : ${entry.target.classList}`);
            triggerFunction(entry.target); // Appelle une fonction avec la slide visible
        }
    });
}, {
    root: null, // Par défaut, la fenêtre visible
    threshold: 0.5 // La slide doit être au moins à 50% visible
});

// Observe chaque slide
slides.forEach((slide) => {
    observer.observe(slide);
});

// Fonction déclenchée
function triggerFunction(slide) {
    console.log(`Fonction déclenchée pour : ${slide.classList}`);
    resetState();
    // Ajoute ici le code que tu veux exécuter
}


function resetOtherSlides(activeSlide) {
    $(".slides").not(activeSlide).each(function () {
        const slide = $(this);
        slide.find(".info").fadeOut(0); // Masque les infos des autres slides
        slide.find("h2").removeClass("move"); // Supprime l'animation des titres
        slide.find("video").removeClass("flou"); // Supprime l'effet de flou des vidéos
    });
}

$(".slides h2").click(function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement
    const slide = $(this).closest(".slides"); // Récupère la slide parente
    const info = slide.find(".info"); // Récupère l'élément .info de la slide
    resetOtherSlides(slide); // Réinitialise les autres slides
    // Affiche uniquement l'info de la slide active
    info.fadeIn(2000);

    // Ajoute des animations spécifiques à la slide active
    slide.find("h2").addClass("move");
    slide.find("video").addClass("flou");
});

$(".slides h2").click(function (event) {
    event.stopPropagation();
    const slide = $(this).closest(".slides");
    const visionner = slide.find(".visionner");
    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
});

$(".slides:not(:first-child) h2").click(function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement
    const slide = $(this).closest(".slides"); // Récupère la slide parente
    const info = slide.find(".info"); // Récupère l'élément .info de la slide

    resetOtherSlides(slide); // Réinitialise les autres slides

    // Affiche uniquement l'info de la slide active
    info.fadeIn(2000);

 
});

$(".slides h2").click(function (event) {
    event.stopPropagation();
    const slide = $(this).closest(".slides");
    const visionner = slide.find(".visionner");
    const info = slide.find(".info");

    resetOtherSlides(slide); // Réinitialise les autres slides

    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    info.fadeOut(0);
});

$(".visionner-trigger-h3").click(function(event) {
    event.stopPropagation();
    const slide = $(this).closest(".slides");
    const visionner = slide.find(".visionner");
    console.log("visionner-trigger-h3 clicked");
    visionner.fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    slide.find(".info").fadeOut(0);
});

gsap.to(".scroll-down-arrow span", {
    y: 20,
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "power2.inOut"
});

// gsap.to(".scroll-down-arrow", {
//   scrollTrigger: {
//     trigger: ".slides:nth-child(2)", // Déclenche lorsque la 2ème slide atteint le haut de l'écran
//     start: "top top", // Déclenche au sommet de la 2ème slide
//     end: "bottom top", // Fin du déclenchement
//     scrub: false, // animation non liée au défilement
//     onEnter: () => gsap.to(".scroll-down-arrow", { opacity: 0, duration: 0.3 }), // Masque la flèche
//     onLeaveBack: () => gsap.to(".scroll-down-arrow", { opacity: 1, duration: 0.3 }), // Affiche la flèche
//     markers: false // Retirer les marqueurs
//   },
//   opacity: 1, // Opacité initiale
//   duration: 0.3 // Durée de l'animation
// });

$(document).ready(function() {
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

    const menuBurger = $("#menuBurger");
    const menuVolet = $("#menuVolet");

    menuBurger.click(function() {
        menuVolet.toggleClass("open"); // Ajoute/supprime la classe "open"
    });

    // Fonction pour gérer le changement de slide et les sons
    function handleSlideChange(slide) {
        // Récupérer l'index de la slide actuelle
        const slideIndex = $(slide).index() + 1;

        // Faire un fadeOut de tous les sons
        $("audio").animate({volume: 0}, 1000, function() {
            this.pause();
        });

        // Faire un fadeIn du son de la nouvelle slide
        const newAudio = document.getElementById(`audio-slide-${slideIndex}`);
        if (newAudio) {
            newAudio.volume = 0;
            newAudio.play();
            $(newAudio).animate({volume: 0.5}, 2000);
        }
    }

    // Observer les changements de slide
    const slides = document.querySelectorAll('.slides');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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

