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

//  ------------------------ Clic sur un portrait ------------------------ //
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
