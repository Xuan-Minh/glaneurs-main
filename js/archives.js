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
    // Le menu devient visible soit quand le hero n'est plus visible,
    // soit dès que l'intro (le début du contenu) est visible —
    // cela évite d'attendre la fin de l'intro pour afficher le menu.
    // Le menu ne doit être visible que quand le chapitre 1 est visible
    let visibleChapters = 0;

    function updateNavVisibility() {
      if (!navContainer) return;
      if (visibleChapters > 0) {
        navContainer.classList.add("is-visible");
        console.debug("Menu visible : au moins un chapitre visible", {
          visibleChapters,
        });
      } else {
        navContainer.classList.remove("is-visible");
        console.debug("Menu caché : intro ou hero", { visibleChapters });
      }
    }

    // Observer tous les chapitres
    if (chapters && chapters.length > 0) {
      const chapterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleChapters++;
            } else {
              visibleChapters--;
            }
            visibleChapters = Math.max(0, visibleChapters);
            updateNavVisibility();
          });
        },
        { rootMargin: "0px 0px -60% 0px" }
      );
      chapters.forEach((chapter) => {
        chapterObserver.observe(chapter);
      });
    }
  }
});
