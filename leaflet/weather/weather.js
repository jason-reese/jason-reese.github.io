var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'ttps://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}';
var basemap = L.tileLayer(basemapUrl)



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
      return { color: alertColor};
    },
      onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.headline)
      }
          
  }).addTo(map);
});