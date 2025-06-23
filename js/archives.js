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

  // --- LOGIQUE POUR LA NAVIGATION DES CHAPITRES ---
  const navContainer = document.querySelector('.archive-nav-container');
  const navLinks = document.querySelectorAll('.nav-link');
  const chapters = document.querySelectorAll('.archive-chapter');

  if (navContainer && navLinks.length > 0 && chapters.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    const activeLinkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapterId = entry.target.id;
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[data-scroll-to='${chapterId}']`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, { 
      rootMargin: '0px 0px -40% 0px'
    });

    chapters.forEach(chapter => {
      activeLinkObserver.observe(chapter);
    });

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
  }
});