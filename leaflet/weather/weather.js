var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var basemap = L.tilelayer(basemapUrl, {attribution: '&copy; <a href = "http://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a>'})

var radarUrl ='https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-nor-900913',
  format: 'image/png',
  transparet: true
};
var radar = L.titleLayer.wms(radarUrl, radarDispalyOptions).addTo(map);

var weatherAlertsUrl =  'https://www.weather.gov/documentation/services-web-api#/default/get_alerts_active';
$.getJSON(weatherAlertsUrl, function(data) {
  L.geoJSON(data, {
    style:function(feature){
      var alertColor = 'orange';
      if (feature.properties.severity === 'Severe') alertColor = 'red';
      return { color: alertColor};
    },
        onEachFeature: function(feature, Layer) {
          layer.bindPopup(feature.properties.headline);
        }
  }).addTo(map);
});