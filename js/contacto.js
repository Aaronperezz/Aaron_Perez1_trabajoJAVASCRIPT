/*
 *************** seccion contacto mapa *********** */

// Inicializamos el mapa y lo centramos en la dirección del negocio

if (document.getElementById("map")) {
  console.log("Iniciando Leaflet...");

  var map = L.map("map").setView([39.452218, -0.380005], 15); // Coordenadas para Calle Andarella 1, Valencia

  // Añadimos las capas del mapa desde OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Añadimos un marcador en la dirección de tu negocio
  var marker = L.marker([39.462428, -0.413913])
    .addTo(map)
    .bindPopup("Alpha Digital Media, Calle Andarella 1.")
    .openPopup();

  // Solicitamos la ubicación del usuario y mostramos la ruta hacia el negocio
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Añadimos la capa de enrutamiento desde la ubicación actual hasta el negocio
        L.Routing.control({
          waypoints: [
            L.latLng(userLat, userLng), // Posición del usuario
            L.latLng(39.462428, -0.413913), // Dirección del negocio
          ],
          routeWhileDragging: true,
        }).addTo(map);
      },
      function () {
        alert(
          "No pudimos obtener tu ubicación, pero puedes explorar el mapa manualmente."
        );
      }
    );
  } else {
    alert("Tu navegador no soporta la geolocalización.");
  }
}
