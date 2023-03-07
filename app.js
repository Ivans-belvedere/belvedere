// Initialize the map
var map = L.map("mapid").setView([49.432981933927486, 6.282164813757052], 4);

// Add the tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 18
}).addTo(map);

// Add a marker for "Home" when the user clicks on the map
var homeMarker = null;
var homeLatLng = null;
map.on("click", function(e) {
  if (homeMarker) {
    map.removeLayer(homeMarker);
  }
  homeMarker = L.marker(e.latlng).addTo(map);
  homeMarker.bindPopup("<h3>Home</h3><p>Your home location</p>").openPopup();
  homeLatLng = e.latlng;
});

// Load the locations from the JSON file
fetch("locations.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(locations) {
    // Loop through the locations and add markers to the map
    locations.forEach(function(loc) {
      var marker = L.marker(loc.coords).addTo(map);

      // Add a popup to the marker
      marker.bindPopup("<h3>" + loc.name + "</h3><p>" + loc.description + "</p><img src='" + loc.image + "' alt='" + loc.name + "' width='300'>");

      // Reposition the map when the marker is clicked
      marker.on("click", function(e) {
        var markerPoint = map.latLngToContainerPoint(e.latlng),
            markerWidth = markerPoint.x,
            markerHeight = markerPoint.y,
            windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        map.panBy([0, windowHeight*0.8 - markerHeight]);
        map.setView(e.latlng, map.getZoom(), {
          animate: true,
          duration: 0.5
        });

        // Show shortest route from home to selected location
        if (homeLatLng) {
          var osrmUrl = "http://router.project-osrm.org/route/v1/driving/" + homeLatLng.lng + "," + homeLatLng.lat + ";" + loc.coords[1] + "," + loc.coords[0] + "?overview=full&steps=true";
          fetch(osrmUrl)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              var route = L.polyline(L.PolylineUtil.decode(data.routes[0].geometry)).addTo(map);
              route.bindPopup("<h3>Shortest Route from Home to " + loc.name + "</h3><p>Distance: " + (data.routes[0].distance / 1000).toFixed(1) + " km<br>Duration: " + (data.routes[0].duration / 60).toFixed(0) + " mins</p>");
              map.fitBounds(route.getBounds(), {
                padding: [50, 50]
              });
            });
        }
      });
    });
  });
