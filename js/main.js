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
// Crée un observateur
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            slideTrigger(entry.target); // Appelle une fonction avec la slide visible
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



gsap.to(".scroll-down-arrow div", {
    y: 20,
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "power2.inOut"
});

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
$(document).on("click", ".menu-video-item", function() {
    var index = $(this).index(); // 0 = Chapitre 1, 1 = Chapitre 2, etc.
    var $slide = $('.slides').eq(index + 1); // +1 car la première slide est le documentaire

    if ($slide.length === 0) return;

    // Scroll smooth natif
    $slide[0].scrollIntoView({ behavior: "smooth", block: "start" });

    // Ouvre le visionneur après un court délai (pour laisser le scroll finir)
    setTimeout(function() {
        $slide.find('h2').trigger('click');
    }, 600);

    // Ferme le menu-volet si besoin
    $("#menuVolet").removeClass("open");
});
// LANGUE
$("#languageToggle").click(function () {
    const button = $(this);
    const isKR = button.text() === "KR"; // Vérifie si le bouton est en mode KR

    if (isKR) {
        // Passe en coréen
        $("h1").each(function () {
            const krVersion = $(this).data("krversion"); // Récupère la version coréenne
            if (krVersion) {
                $(this).text(krVersion); // Change le texte du h1
            }
        });
        button.text("FR"); // Change le texte du bouton en FR
    } else {
        // Passe en français
        $("h1").each(function () {
            const frVersion = $(this).data("frversion") || $(this).data("chapitre"); // Récupère la version française
            if (frVersion) {
                $(this).text(frVersion); // Change le texte du h1
            }
        });
        button.text("KR"); // Change le texte du bouton en KR
    }
});
