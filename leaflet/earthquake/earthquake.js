var map = L.map('quakemap').setView([38, -95], 5);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var basemap = L.tileLayer(basemapUrl, {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
fetch(quakeUrl)
  .then(response => response.json())
  .then(data => {
    var style = (feature) => {
      return {
        //used lower magnitudes because of low daily intensities
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
    }).addTo(map);
  });

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<strong>Magnitude</strong><br>';
  div.innerHTML += '<div><span style="background: teal;"></span> > 5</div>';
  div.innerHTML += '<div><span style="background: purple;"></span> 4 - 5</div>';
  div.innerHTML += '<div><span style="background: red;"></span> 3 - 4</div>';
  div.innerHTML += '<div><span style="background: yellow;"></span> 1 - 2</div>';
  div.innerHTML += '<div><span style="background: lime;"></span> > 1</div>';
  return div;
};

legend.addTo(map);