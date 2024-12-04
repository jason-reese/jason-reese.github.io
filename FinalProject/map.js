require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/SimpleRenderer",

], 
function (Map, MapView, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, ClassBreaksRenderer) {

  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100, 40],
    zoom: 4
  });

  view.constraints = {
    minZoom: 2,
    maxZoom: 7
  };


  var internetLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/0",
    popupTemplate: { title: "{NAME}",
    content: "<b>no interent:</b> {B28004_calc_pctNoIntE}<br>" +
      "<b>Area:</b> {AREA} sq km"}
  });


  var CinternetLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/1",
    popupTemplate: { title: "{NAME}",
    content: "<b>Percent no internet:</b> {B28004_calc_pctNoIntE}<br>" +
      "<b>Area:</b> {AREA} sq km"}
  });

  
  var houseLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Highlights_Population_Housing_Basics_Boundaries/FeatureServer/1",
    popupTemplate: { title: "{NAME}",
    content: "<b>housing:</b> {B25003_calc_pctOwnE}<br>" +
      "<b>Area:</b> {AREA} sq km"}
  });


  map.add(internetLayer);
  map.add(CinternetLayer);
  map.add(houseLayer);

  
  document.getElementById("toggleLayer1").addEventListener("change", function () {
    CinternetLayer.visible = this.checked;
  });

  document.getElementById("toggleLayer2").addEventListener("change", function () {
    houseLayer.visible = this.checked;
  });

  document.getElementById("toggleLayer3").addEventListener("change", function () {
    CinternetLayer.visible = this.checked;
  });
});