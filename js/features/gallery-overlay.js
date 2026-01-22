$(function () {
  // --- LOGIQUE DE L'OVERLAY (APPLICABLE PARTOUT) ---
  function getGalleryItems() {
    return $(".archive-gallery-item");
  }

  // Toujours initialiser les handlers : certains contenus peuvent être injectés après le DOM ready.
  let currentIndex = 0;
  let currentGalleryData = [];

  function showOverlay(index) {
    const $overlay = $("#archive-overlay");
    if (!$overlay.length) return;
    if (!Array.isArray(currentGalleryData) || currentGalleryData.length === 0)
      return;
    if (typeof index !== "number" || Number.isNaN(index)) return;
    if (index < 0 || index >= currentGalleryData.length) return;

    currentIndex = index;
    const data = currentGalleryData[index];
    if (!data) return;

    const $info = $("#archive-overlay .archive-overlay-info");
    $info.removeClass("visible");

    $("#archive-overlay .archive-overlay-photo img").attr("src", data.src);
    $("#archive-overlay .archive-overlay-title").text(data.titre);
    $("#archive-overlay .archive-overlay-date").text(data.date);
    $("#archive-overlay .archive-overlay-auteur").text(data.auteur);
    $overlay.fadeIn(300);
    $("body").css("overflow", "hidden");

    setTimeout(function () {
      $info.addClass("visible");
    }, 10);
  }

  // Important : utiliser un écouteur délégué pour fonctionner avec le contenu dynamique
  $(document).on("click", ".archive-gallery-item", function (e) {
    const $overlay = $("#archive-overlay");
    if (!$overlay.length) return;

    e.preventDefault();
    const $items = getGalleryItems();
    if (!$items.length) return;

    // (re)construit la liste au moment du clic pour prendre en compte du contenu injecté
    currentGalleryData = $items
      .map(function () {
        return {
          titre: $(this).data("titre"),
          src: $(this).data("src"),
          date: $(this).data("date"),
          auteur: $(this).data("auteur"),
        };
      })
      .get();
    if (!currentGalleryData.length) return;

    const clickedIndex = $items.index(this);
    showOverlay(clickedIndex);
  });

  $(".archive-overlay-arrow.left").on("click", function (e) {
    if (!currentGalleryData.length) return;
    e.stopPropagation();
    showOverlay(
      (currentIndex - 1 + currentGalleryData.length) %
        currentGalleryData.length,
    );
  });

  $(".archive-overlay-arrow.right").on("click", function (e) {
    if (!currentGalleryData.length) return;
    e.stopPropagation();
    showOverlay((currentIndex + 1) % currentGalleryData.length);
  });

  $(".archive-overlay-close, .archive-overlay-bg").on("click", function () {
    $("#archive-overlay").fadeOut(300);
    $("body").css("overflow", "auto");
  });

  $(document).on("keydown", function (e) {
    if (!$("#archive-overlay").is(":visible")) return;
    if (e.key === "ArrowLeft") $(".archive-overlay-arrow.left").click();
    if (e.key === "ArrowRight") $(".archive-overlay-arrow.right").click();
    if (e.key === "Escape") $(".archive-overlay-close").click();
  });
});
