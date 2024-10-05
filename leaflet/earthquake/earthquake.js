var map = L.map('quakemap').setView([38, -95], 5);
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);


var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
fetch(quakeUrl)
  .then(response => response.json())
  .then(data => {
    var style = (feature) => {
      return {
        color: feature.properties.mag > 5 ? 'red' : feature.properties.mag > 3 ? 'orange' : 'yellow',
        radius: feature.properties.mag * 3
      };
    };

    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, style(feature));
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
      }
    }).addTo(map);
  })