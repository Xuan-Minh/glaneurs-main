/*$(".slide1 h2").click(function() { 
    $(".visionner").fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    $(".info").fadeOut(0);
});
$(".slide2 h2").click(function() {
    $(".visionner").fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    $(".info").fadeOut(0);

});
$(".slide3 h2").click(function() {
    $(".visionner").fadeIn(400).css("display", "flex");
    $("body").css("overflow", "hidden");
    $(".info").fadeOut(0);
});*/

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


// function resetState() {
//     $(".visionner").fadeOut(400);
//     $(".info").fadeOut(0);
//     $("body").css("overflow", "auto");
//     $(".slide1 h2").removeClass("move");
//     $(".slide1 video").removeClass("flou");
//     $(".slide1 .sliderButton .point2").removeClass("full");
//     $(".slide1 .sliderButton .point2").addClass("empty");
//     $(".slide1 .sliderButton .point1").removeClass("empty");
//     $(".slide1 .sliderButton .point1").addClass("full");
//     $(".slide2 h2").removeClass("move");
//     $(".slide2 video").removeClass("flou");
//     $(".slide2 .sliderButton .point2").removeClass("full");
//     $(".slide2 .sliderButton .point2").addClass("empty");
//     $(".slide2 .sliderButton .point1").removeClass("empty");
//     $(".slide2 .sliderButton .point1").addClass("full");
//     $(".slide3 h2").removeClass("move");
//     $(".slide3 video").removeClass("flou");
//     $(".slide3 .sliderButton .point2").removeClass("full");
//     $(".slide3 .sliderButton .point2").addClass("empty");
//     $(".slide3 .sliderButton .point1").removeClass("empty");
//     $(".slide3 .sliderButton .point1").addClass("full");
    
// }

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

$(".slides:not(:first-child) h2").click(function (event) {
    event.stopPropagation(); // Empêche la propagation de l'événement
    const slide = $(this).closest(".slides"); // Récupère la slide parente
    const info = slide.find(".info"); // Récupère l'élément .info de la slide

    resetOtherSlides(slide); // Réinitialise les autres slides

    // Affiche uniquement l'info de la slide active
    info.fadeIn(2000);

    // Supprime les animations spécifiques à la slide active
    // slide.find("h2").addClass("move");
    // slide.find("video").addClass("flou");
});

/* $("slide1 h2").click(function move() {
    $("this h2").removeClass("move");
    $("this video").removeClass("flou");
    $("this .info").fadeIn(2000);
}); */
// function move() {   
//     $(".slide1 h2").removeClass("move");
//     $(".slide1 video").removeClass("flou");
//     $(".slide1 .info").fadeIn(2000);
// }