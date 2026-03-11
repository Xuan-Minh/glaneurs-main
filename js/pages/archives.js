$(document).ready(function () {
  initArchivesPage();
});

function initArchivesPage() {
  // --- LOGIQUE DU HEADER (hide on scroll) ---
  const $archivesScroll = $(".archives-scroll");
  if ($archivesScroll.length) {
    // Réutilise l'helper global si disponible (défini dans main.js)
    if (typeof addHideHeaderOnScroll === "function") {
      addHideHeaderOnScroll($archivesScroll);
    } else {
      // Fallback local si main.js n'est pas chargé
      const $header = $("header");
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
  }
}
