var map = L.map('combomap').setView([38, -95], 5);
var basemapUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(map);


var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
fetch(quakeUrl)
  .then(response => response.json())
  .then(data => {
    var style = (feature) => {
      return {
        color: feature.properties.mag > 5 ? 'teal' :
          feature.properties.mag > 4 ? 'purple' :
            feature.properties.mag > 3 ? 'red' :
              feature.properties.mag > 2 ? 'orange' :
                feature.properties.mag > 1 ? 'yellow' : 'lime',
        radius: feature.properties.mag * 10
      };
    };

    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, style(feature));
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.geometry.coordinates}`);
      }
    }).addTo(quakeLayer);
    quakeLayer.addTo(map);
  });

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
  }).addTo(alertLayer);
  alertLayer.addTo(map);
});

var overlays = {
  "Earthquakes": quakeLayer,
  "Weather Alerts": alertLayer
};

L.control.layers(null, overlays).addTo(map);



