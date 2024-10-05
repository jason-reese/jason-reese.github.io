var map = L.map('quakemap').setView([38, -95], 5);
var basemapUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var radarUrl ='https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparet: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
  L.geoJSON(data, {
    style:function(feature){
      var alertColor = 'orange';
      if (feature.properties.severity === 'Severe') alertColor = 'red';
      else if  (feature.properties.severity === 'Moderate') alertColor = 'purple';
      return { color: alertColor};
    },
      onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.headline)
      }
          
  }).addTo(map);
});