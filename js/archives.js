$(function () {
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
});

$(function () {
  // Récupère toutes les images de la galerie
  const $galleryItems = $('.archive-gallery-item');
  let currentIndex = 0;

  // Stocke les infos de chaque archive dans un tableau
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

  // 1. Retire l'animation
  const $info = $('#archive-overlay .archive-overlay-info');
  $info.removeClass('visible');

  // Mets à jour le contenu
  $('#archive-overlay .archive-overlay-photo img').attr('src', data.src);
  $('#archive-overlay .archive-overlay-title').text(data.titre);
  $('#archive-overlay .archive-overlay-date').text(data.date);
  $('#archive-overlay .archive-overlay-auteur').text(data.auteur);
  $('#archive-overlay').fadeIn(300);
  $('body').css('overflow', 'hidden');

  // 2. Relance l'animation après un court délai (pour forcer le repaint)
  setTimeout(function() {
    $info.addClass('visible');
  }, 10);
}

  // Ouvre l'overlay au clic sur une image
  $galleryItems.on('click', function () {
    showOverlay($(this).data('index'));
  });

  // Navigation flèches
  $('.archive-overlay-arrow.left').on('click', function (e) {
    e.stopPropagation();
    showOverlay((currentIndex - 1 + archives.length) % archives.length);
  });
  $('.archive-overlay-arrow.right').on('click', function (e) {
    e.stopPropagation();
    showOverlay((currentIndex + 1) % archives.length);
  });

  // Ferme l'overlay
  $('.archive-overlay-close, .archive-overlay-bg').on('click', function () {
    $('#archive-overlay').fadeOut(300);
    $('body').css('overflow', 'auto');
  });

  // Navigation clavier (optionnel)
  $(document).on('keydown', function (e) {
    if (!$('#archive-overlay').is(':visible')) return;
    if (e.key === "ArrowLeft") $('.archive-overlay-arrow.left').click();
    if (e.key === "ArrowRight") $('.archive-overlay-arrow.right').click();
    if (e.key === "Escape") $('.archive-overlay-close').click();
  });
});
// 

