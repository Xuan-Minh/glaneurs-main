// ----------------------------------------------- Derrière le documentaire ---------------------------------- //
$(document).ready(function () {
  initDerriereLeDocumentairePage();
});

function initDerriereLeDocumentairePage() {
  initTeamRandomizer();
}

function initTeamRandomizer() {
  const $membersAll = $(".team-member");
  if (!$membersAll.length) return;

  function randomizeTeamStatesRespectHover() {
    const members = $(".team-member").not(".hover-force").toArray();
    // Remet tous ces membres en photo
    $(members).removeClass("show-info").addClass("show-photo");
    // Calcule combien de blocs texte il reste à afficher
    const hoverCount = $(".team-member.hover-force").length;
    const toShow = Math.max(0, 4 - hoverCount);
    const indices = [];
    while (indices.length < toShow && indices.length < members.length) {
      const idx = Math.floor(Math.random() * members.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    indices.forEach((idx) => {
      $(members[idx]).removeClass("show-photo").addClass("show-info");
    });
  }

  setInterval(randomizeTeamStatesRespectHover, 3000);
  randomizeTeamStatesRespectHover();
}
//  ----------------------------------------------- Portfolio ---------------------------------- //
$(document).on("click", ".team-member", function (e) {
  if ($(e.target).is(".team-portfolio")) return;
  var link = $(this).find(".team-portfolio").attr("href");
  if (link) window.open(link, "_blank");
});
