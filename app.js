// Load the locations data from a JSON file
fetch('locations.json')
  .then(response => response.json())
  .then(data => {
    // Convert the data to an array
    const locations = Object.values(data);
    
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

    // Loop through the locations and add markers to the map
    locations.forEach(function(loc) {
      var marker = L.marker(loc.coords).addTo(map);
      
      // Add a popup to the marker
      marker.bindPopup("<h3>" + loc.name + "</h3><p>" + loc.description + "</p><img src='" + loc.image + "' alt='" + loc.name + "' width='300'>");
    });
  })
  .catch(error => console.error(error));
