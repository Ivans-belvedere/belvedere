// Define the locations and their properties
var locations = [
  {
    name: "Statue of Liberty",
    description: "A gift from the people of France to the people of the United States, the Statue of Liberty is a symbol of freedom and democracy.",
    image: "https://www.nps.gov/common/uploads/stories/images/nri/20160311/articles/15B6465E-1DD8-B71C-07E5F60DFA3300F7/15B6465E-1DD8-B71C-07E5F60DFA3300F7.jpg?width=750&quality=90&mode=crop",
    coords: [40.6892, -74.0445]
  },
  {
    name: "Golden Gate Bridge",
    description: "One of the most internationally recognized symbols of San Francisco, California, and the United States.",
    image: "https://www.nps.gov/goga/learn/historyculture/images/bridgesa01.jpg?maxwidth=650&autorotate=false",
    coords: [37.8199, -122.4783]
  },
  {
    name: "Grand Canyon National Park",
    description: "One of the most breathtaking examples of erosion anywhere in the world.",
    image: "https://www.nps.gov/grca/planyourvisit/images/2014_Trip_Planning_4.jpg",
    coords: [36.1069, -112.1126]
  }
];

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
