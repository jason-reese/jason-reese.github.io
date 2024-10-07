var map = L.map('weathermap').setView([38, -95], 5);
var basemapUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);


var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true,
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function (data) {
  L.geoJSON(data, {
    style: function (feature) {
      var alertColor = 'orange';
      if (feature.properties.severity === 'Severe') alertColor = 'red';
      else if (feature.properties.severity === 'Moderate') alertColor = 'purple';
      return { color: alertColor };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.headline)
    }

  }).addTo(map);
});