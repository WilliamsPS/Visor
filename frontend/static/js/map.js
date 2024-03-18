document.addEventListener("DOMContentLoaded", function () {
  // Código para inicializar el mapa y personalizarlo
  var map = L.map("map").setView([-9.189967, -75.015152], 5);

  // Capa de teselas del mapa base de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Eliminar el marcador existente (Tumbes)
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Código para agregar el marcador "Thing 001"
  var thing001 = L.marker([-3.8503363602720975, -80.40632815428121]).addTo(map);
  thing001.bindPopup("Thing 001").openPopup();

  // Código para hacer zoom al hacer clic en el marcador "Thing 001"
  thing001.on("click", function () {
    map.setView(thing001.getLatLng(), 10);
    showCustomIconOnce(); // Llamar a la función para mostrar información del dispositivo
  });

  // Función para mostrar información del dispositivo
  function showCustomIconOnce() {
    if (!showCustomIconOnce.hasShown) {
      // Puedes agregar aquí la lógica para mostrar información adicional
      //alert("Información adicional del dispositivo Thing 001");
      showCustomIconOnce.hasShown = true;
    }
  }
});




