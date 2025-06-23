$(function () {
  // --- LOGIQUE DE L'OVERLAY (APPLICABLE PARTOUT) ---
  const $galleryItems = $('.archive-gallery-item');
  if ($galleryItems.length > 0) {
    let currentIndex = 0;
    let currentGalleryData = [];

    function buildGalleryData() {
      currentGalleryData = $galleryItems.map(function () {
        return {
          titre: $(this).data('titre'),
          src: $(this).data('src'),
          date: $(this).data('date'),
          auteur: $(this).data('auteur')
        };
      }).get();
    }

    function showOverlay(index) {
      if (index < 0 || index >= currentGalleryData.length) return;
      currentIndex = index;
      const data = currentGalleryData[index];

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

    // Important : utiliser un écouteur délégué pour fonctionner avec le contenu dynamique
    $(document).on('click', '.archive-gallery-item', function (e) {
      e.preventDefault();
      // Re-scanner la galerie à chaque clic pour être sûr d'avoir les bons éléments
      buildGalleryData(); 
      const clickedIndex = $galleryItems.index(this);
      showOverlay(clickedIndex);
    });

    $('.archive-overlay-arrow.left').on('click', function (e) {
      e.stopPropagation();
      showOverlay((currentIndex - 1 + currentGalleryData.length) % currentGalleryData.length);
    });

    $('.archive-overlay-arrow.right').on('click', function (e) {
      e.stopPropagation();
      showOverlay((currentIndex + 1) % currentGalleryData.length);
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
});