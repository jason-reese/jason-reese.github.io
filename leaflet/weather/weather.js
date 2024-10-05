var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href = "http://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a>'})

var radarUrl ='https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/daa.cgi?';
var radarDisplayOptions = {
  layers: 'nexrad-nor-900913',
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
      return { color: alertColor};
    }
  }).addTo(map);
});