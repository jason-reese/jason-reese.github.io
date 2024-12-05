require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",

  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
"esri/renderers/ClassBreaksRenderer",
  "esri/Color"
  
],
  function (Map, MapView, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, ClassBreaksRenderer, Color) {


    const map = new Map({
      basemap: "gray-vector"
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-100, 40],
      zoom: 5
    });

    view.constraints = {
      minZoom: 2,
      maxZoom: 7
    };

    var internetLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/0",
      popupTemplate: {
        title: "{NAME}",
        content: "<b>no internet:</b> {B28004_calc_pctNoIntE }<br>" +
          "<b>Area:</b> {AREA} sq km"
      },
      renderer: new ClassBreaksRenderer({
        field: "{B28004_calc_pctNoIntE}",
        classBreakInfos: [
          {
            minValue: 5,
            maxValue: 10,
            symbol: new SimpleFillSymbol({
              color: new Color([0, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "5% - 10%"
          },
          {
            minValue: 10,
            maxValue: 15,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "10% - 15%"
          },
          {
            minValue: 15,
            maxValue: 20,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 165, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "20% - 25%"
          },
          {
            minValue: 25,
            maxValue: 30,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 0, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "25% - 30%"
          },
          
        ]
      })

    });

    var CinternetLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/1",
      popupTemplate: {
        title: "{NAME}",
        content: "<b>State:</b> {State}<br>"+ "<b>Percent no internet:</b> {B28004_calc_pctNoIntE}"
         
      },
      renderer: new ClassBreaksRenderer({
        field: "{B28004_calc_pctNoIntE}",
        classBreakInfos: [
          {
            minValue: 0,
            maxValue: 10,
            symbol: new SimpleFillSymbol({
              color: new Color([0, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "0% - 10%"
          },
          {
            minValue: 10,
            maxValue: 20,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "10% - 20%"
          },
          {
            minValue: 20,
            maxValue: 30,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 165, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 30,
            maxValue: 50,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 0, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "30% - 50%"
          },
          {
            minValue: 50,
            maxValue: 100,
            symbol: new SimpleFillSymbol({
              color: new Color([128, 0, 128, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "50% - 100%"
          }
        ]
      })
    });

    var houseLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Highlights_Population_Housing_Basics_Boundaries/FeatureServer/1",
      popupTemplate: {
        title: "{NAME}",
        content:"<b>State:</b> {State}<br>"+ "<b>own housing:</b> {B25003_calc_pctOwnE}" 
          
      },
      renderer: new ClassBreaksRenderer({
        field: "{B25003_calc_pctOwnE}",
        classBreakInfos: [
          {
            minValue: 0,
            maxValue: 50,
            symbol: new SimpleFillSymbol({
              color: new Color([255, 0, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "0% - 10%"
          },
          {
            minValue: 50,
            maxValue: 60,
            symbol: new SimpleFillSymbol({
              color: new Color([215, 40, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "10% - 20%"
          },
          {
            minValue: 60,
            maxValue: 70,
            symbol: new SimpleFillSymbol({
              color: new Color([165, 90, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 60,
            maxValue: 70,
            symbol: new SimpleFillSymbol({
              color: new Color([127, 127, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 70,
            maxValue: 80,
            symbol: new SimpleFillSymbol({
              color: new Color([90, 215, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 80,
            maxValue: 90,
            symbol: new SimpleFillSymbol({
              color: new Color([40, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "30% - 50%"
          },
          {
            minValue: 90,
            maxValue: 100,
            symbol: new SimpleFillSymbol({
              color: new Color([0, 255, 0, 0.5]),
              outline: new SimpleLineSymbol({
                color: [200, 200, 200],
                width: 1
              })
            }),
            label: "50% - 100%"
          }
        ]
      })
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
      Layer3.visible = this.checked;
    });

    document.getElementById("toggleLayer4").addEventListener("change", function () {
      Layer4.visible = this.checked;
    });

  });