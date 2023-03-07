// Initialize the map
var map = L.map("mapid").setView([37.0902, -95.7129], 4);

// Add the tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 18
}).addTo(map);

// Add a marker for "Home" when the user clicks on the map
var homeMarker = null;
map.on("click", function(e) {
  if (homeMarker) {
    map.removeLayer(homeMarker);
  }
  homeMarker = L.marker(e.latlng).addTo(map);
  homeMarker.bindPopup("<h3>Home</h3><p>Your home location</p>").openPopup();
});

// Load the locations from a JSON file and add markers to the map
fetch("locations.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(locations) {
    locations.forEach(function(loc) {
      var marker = L.marker(loc.coords).addTo(map);

      // Add a popup to the marker
      marker.bindPopup("<h3>" + loc.name + "</h3><p>" + loc.description + "</p><img src='" + loc.image + "' alt='" + loc.name + "' width='300'>");

      // Add a click event listener to the marker to display a shortest route between "Home" and the selected marker
      marker.on("click", function() {
        if (homeMarker) {
          var from = homeMarker.getLatLng();
          var to = marker.getLatLng();
          var control = L.Routing.control({
            waypoints: [from, to],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
            router: L.Routing.mapbox("pk.eyJ1IjoibXVoYW1tYWQxMCIsImEiOiJja2pkN2J2Z2EweDNvMnpxdjZpNzB1ajY1In0.M0btWJioYP0oPUf_QLgnug")
          }).addTo(map);
        }
      });
    });
  });
