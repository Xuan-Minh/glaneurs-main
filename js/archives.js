$(function () {
  // --- LOGIQUE DU HEADER ---
  const $header = $("header");
  const $archivesScroll = $(".archives-scroll");
  if ($archivesScroll.length) {
    let lastScroll = 0;
    $archivesScroll.on("scroll", function () {
      const currentScroll = $archivesScroll.scrollTop();
      if (currentScroll > lastScroll && currentScroll > 200) {
        $header.addClass("hide-header");
      } else if (currentScroll < lastScroll) {
        $header.removeClass("hide-header");
      }
      if (currentScroll < 20) $header.removeClass("hide-header");
      lastScroll = currentScroll;
    });
  }
  // --- NOUVEAU: LOGIQUE POUR LES IMAGES FLOTTANTES (PARALLAXE) ---
  const $floatingImages = $(".floating-image");
  if ($archivesScroll.length && $floatingImages.length) {
    $archivesScroll.on("scroll", function () {
      const scrollTop = $archivesScroll.scrollTop();

      $floatingImages.each(function () {
        const speed = $(this).data("parallax-speed") || 0.1;
        const translateY = scrollTop * speed;
        $(this).css("transform", `translateY(${translateY}px)`);
      });
    });
  }
  // --- LOGIQUE POUR LA NAVIGATION DES CHAPITRES ---
  const navContainer = document.querySelector(".archive-nav-container");
  const navLinks = document.querySelectorAll(".nav-link");
  const chapters = document.querySelectorAll(".archive-chapter");

  if (navContainer && navLinks.length > 0 && chapters.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    const activeLinkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chapterId = entry.target.id;
            navLinks.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(
              `.nav-link[data-scroll-to='${chapterId}']`
            );
            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -40% 0px",
      }
    );

    chapters.forEach((chapter) => {
      activeLinkObserver.observe(chapter);
    });

    // ANCIENNE LOGIQUE (supprimée)
    /*
    const firstChapter = chapters[0];
    const navVisibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navContainer.classList.add('is-visible');
        } else {
          if (entry.boundingClientRect.top > 0) {
            navContainer.classList.remove('is-visible');
          }
        }
      });
    }, {
      rootMargin: '0px 0px -50% 0px'
    });

    navVisibilityObserver.observe(firstChapter);
    */

    // NOUVELLE LOGIQUE DE VISIBILITÉ
    const heroSection = document.querySelector(".archive-hero");
    if (heroSection) {
      const navVisibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Si la section hero n'est PLUS visible (l'utilisateur a scrollé vers le bas)
            if (!entry.isIntersecting) {
              navContainer.classList.add("is-visible");
            } else {
              // Si la section hero est de nouveau visible (l'utilisateur est remonté tout en haut)
              navContainer.classList.remove("is-visible");
            }
          });
        },
        {
          threshold: 0.01, // Se déclenche dès que la section hero est presque entièrement partie
        }
      );

      navVisibilityObserver.observe(heroSection);
    }
  }
});
