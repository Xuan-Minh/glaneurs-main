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

  // --- LOGIQUE DE L'OVERLAY D'ARCHIVES ---
  const $galleryItems = $('.archive-gallery-item');
  if ($galleryItems.length > 0) {
    let currentIndex = 0;

    const archives = $galleryItems.map(function () {
      return {
        titre: $(this).data('titre'),
        src: $(this).data('src'),
        date: $(this).data('date'),
        auteur: $(this).data('auteur')
      };
    }).get();

    function showOverlay(index) {
      if (index < 0 || index >= archives.length) return;
      currentIndex = index;
      const data = archives[index];

      const $info = $('#archive-overlay .archive-overlay-info');
      $info.removeClass('visible');

      $('#archive-overlay .archive-overlay-photo img').attr('src', data.src);
      $('#archive-overlay .archive-overlay-title').text(data.titre);
      $('#archive-overlay .archive-overlay-date').text(data.date);
      $('#archive-overlay .archive-overlay-auteur').text(data.auteur);
      $('#archive-overlay').fadeIn(300);
      $('body').css('overflow', 'hidden');

      setTimeout(function() {
        $info.addClass('visible');
      }, 10);
    }

    $galleryItems.on('click', function (e) {
      e.preventDefault();
      const clickedIndex = $galleryItems.index(this);
      showOverlay(clickedIndex);
    });

    $('.archive-overlay-arrow.left').on('click', function (e) {
      e.stopPropagation();
      showOverlay((currentIndex - 1 + archives.length) % archives.length);
    });

    $('.archive-overlay-arrow.right').on('click', function (e) {
      e.stopPropagation();
      showOverlay((currentIndex + 1) % archives.length);
    });

    $('.archive-overlay-close, .archive-overlay-bg').on('click', function () {
      $('#archive-overlay').fadeOut(300);
      $('body').css('overflow', 'auto');
    });

    $(document).on('keydown', function (e) {
      if (!$('#archive-overlay').is(':visible')) return;
      if (e.key === "ArrowLeft") $('.archive-overlay-arrow.left').click();
      if (e.key === "ArrowRight") $('.archive-overlay-arrow.right').click();
      if (e.key === "Escape") $('.archive-overlay-close').click();
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
      rootMargin: '0px 0px -80% 0px'
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