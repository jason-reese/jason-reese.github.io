require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/popup/content/PieChartMediaInfo",
  "esri/popup/content/support/ChartMediaInfoValue",
  "esri/popup/content/MediaContent",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/SimpleRenderer",
  "esri/Color"

], function (Map, MapView, FeatureLayer, PieChartMediaInfo, ChartMediaInfoValue, MediaContent, Legend, Expand, SimpleFillSymbol, SimpleLineSymbol, ClassBreaksRenderer, SimpleRenderer, Color) {

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

  var incomeSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/0",
    renderer: new ClassBreaksRenderer({
      field: "{B19049_001E}",
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 30000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.1]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 30000,
          maxValue: 45000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.2]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 45000,
          maxValue: 60000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.3]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 60000,
          maxValue: 75000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.4]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "10% - 15%"
        },
        {
          minValue: 75000,
          maxValue: 90000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "20% - 25%"
        },
        {
          minValue: 90000,
          maxValue: 1000000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.6]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "25% - 30%"
        },
      ]
    })
  });
 

  var incomeCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/1",
    renderer: new ClassBreaksRenderer({
      field: "{B19049_001E}",
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 30000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.1]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 30000,
          maxValue: 45000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.2]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 45000,
          maxValue: 60000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.3]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "5% - 10%"
        },
        {
          minValue: 60000,
          maxValue: 75000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.4]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "10% - 15%"
        },
        {
          minValue: 75000,
          maxValue: 90000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "20% - 25%"
        },
        {
          minValue: 90000,
          maxValue: 1000000,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 0, 0, 0.6]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "25% - 30%"
        },
      ]
    })
  });


    var internetSteLayer = new FeatureLayer({
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

    var internetCntyLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/1",
      popupTemplate: {
        title: "{NAME}, {State}",
        content: [{
          type: "text",
          text: "<b>Median County Income:</b> ${B19049_001E}<br>" + "<b>Percent without Broadband Internt:</b> {B28004_calc_pctNoIntE}%<br>"
        },
        {
          type: "media",
          mediaInfos: {
            title: "<b>Internet Access</b>",
            type: "pie-chart",
            value: {
              fields: ["B28004_calc_numNoIntE", "B28004_calc_numBBE", "B28004_calc_numDialE"],

            }
          }
        }
        ]
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

    var houseCntyLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Highlights_Population_Housing_Basics_Boundaries/FeatureServer/1",
      popupTemplate: {
        title: "{NAME}, {State}",
        content: [{
          type: "text",
          text: "<b>Median County Income:</b> ${B19049_001E}<br>" + "<b>Median Home Value:</b> ${B25077_001E}<br>"
        },
        {
          type: "media",
          mediaInfos: {
            title: "<b>HomeOwnership Rate</b>",
            type: "pie-chart",
            value: {
              fields: ["B25003_002E", "B25003_003E"],
            }
          }
        }
        ]
      },

      renderer: new ClassBreaksRenderer({
        field: "{B25003_calc_pctOwnE}",
        classBreakInfos: [
          {
            minValue: 0,
            maxValue: 30,
            symbol: new SimpleFillSymbol({
              color: new Color([224, 236, 244, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "0% - 10%"
          },
          {
            minValue: 30,
            maxValue: 40,
            symbol: new SimpleFillSymbol({
              color: new Color([191, 211, 230, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "0% - 10%"
          },
          {
            minValue: 40,
            maxValue: 50,
            symbol: new SimpleFillSymbol({
              color: new Color([158, 188, 218, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "10% - 20%"
          },
          {
            minValue: 50,
            maxValue: 60,
            symbol: new SimpleFillSymbol({
              color: new Color([140, 150, 198, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 60,
            maxValue: 70,
            symbol: new SimpleFillSymbol({
              color: new Color([140, 107, 177, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 70,
            maxValue: 80,
            symbol: new SimpleFillSymbol({
              color: new Color([136, 65, 157, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "20% - 30%"
          },
          {
            minValue: 80,
            maxValue: 90,
            symbol: new SimpleFillSymbol({
              color: new Color([129, 15, 124, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "30% - 50%"
          },
          {
            minValue: 90,
            maxValue: 100,
            symbol: new SimpleFillSymbol({
              color: new Color([77, 0, 75, 0.5]),
              outline: new SimpleLineSymbol({
                color: [150, 150, 150],
                width: 0.5
              })
            }),
            label: "50% - 100%"
          }
        ]
      })
    });








    map.add(incomeSteLayer);
    map.add(incomeCntyLayer);


    ////map.add(internetSteLayer);
    map.add(internetCntyLayer);


    ///map.add(houseSteLayer);
    map.add(houseCntyLayer);

    document.getElementById("toggleLayer1").addEventListener("change", function () {
      internetCntyLayer.visible = this.checked;
    });

    document.getElementById("toggleLayer2").addEventListener("change", function () {
      houseCntyLayer.visible = this.checked;
    });

    document.getElementById("toggleLayer3").addEventListener("change", function () {
      houseSteLayer.visible = this.checked;
    });

    document.getElementById("toggleLayer4").addEventListener("change", function () {
      internetSteLayer.visible = this.checked;
    });

    document.getElementById("toggleLayer4").addEventListener("change", function () {
      internetSteLayer.visible = this.checked;

    }); document.getElementById("toggleLayer4").addEventListener("change", function () {
      internetSteLayer.visible = this.checked;

    }); document.getElementById("toggleLayer4").addEventListener("change", function () {
      internetSteLayer.visible = this.checked;
    });


  });