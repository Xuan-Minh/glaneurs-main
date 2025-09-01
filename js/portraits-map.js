document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.indexOf("portraits.php") === -1) return;
  if (!window.parcours || !parcours.length) {
    console.error("[DEBUG] Tableau parcours manquant ou vide !");
    return;
  }
  let mapInit = false;
  function initMapParcours() {
    if (mapInit) return;
    mapInit = true;
    const center = [parcours[0].lat, parcours[0].lng];
    const map = L.map("map-parcours").setView(center, 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    const latlngs = parcours.map((p) => [p.lat, p.lng]);
    L.polyline(latlngs, { color: "blue", weight: 4 }).addTo(map);
    parcours.forEach((point) => {
      L.circleMarker([point.lat, point.lng], {
        radius: 7,
        color: "red",
        fillColor: "#fff",
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(
          `<b>${point.name}</b><br><a href="https://www.google.com/maps?q=${point.lat},${point.lng}" target="_blank">Voir sur Google Maps</a>`
        );
    });
    map.fitBounds(latlngs);
  }

  // Initialise la carte si la section Lee est visible au chargement
  if (
    document.querySelector("#detail2") &&
    document.querySelector("#detail2").offsetParent !== null
  ) {
    initMapParcours();
  }
  // Sinon, écoute l'ouverture de la section Lee
  document.querySelectorAll(".portrait-section").forEach((section) => {
    section.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      if (target === "#detail2") {
        setTimeout(initMapParcours, 100); // attend l'affichage effectif
      }
    });
  });
});
