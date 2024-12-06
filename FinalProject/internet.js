var internetSteLayer = new FeatureLayer({
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/0",
  popupTemplate: {
    title: "{NAME}, {State}",
    content: [{
      type: "text",
      text: "<b>Median State Income:</b> ${B19049_001E}<br>" + "<b>Percent without Broadband Internet:</b> {B28004_calc_pctNoIntE}%<br>"
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
    }]
  },
  renderer: new ClassBreaksRenderer({
    field: "{B28004_calc_pctNoIntE}",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 10,
        symbol: new SimpleFillSymbol({
          color: new Color([255, 255, 212, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "5% - 10%"
      },
      {
        minValue: 10,
        maxValue: 20,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 227, 145, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "10% - 15%"
      },
      {
        minValue: 20,
        maxValue: 30,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 196, 79, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "20% - 25%"
      },
      {
        minValue: 30,
        maxValue: 40,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 153, 41, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "25% - 30%"
      },
      {
        minValue: 40,
        maxValue: 50,
        symbol: new SimpleFillSymbol({
          color: new Color([217, 95, 14, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "25% - 30%"
      },
      {
        minValue: 50,
        maxValue: 70,
        symbol: new SimpleFillSymbol({
          color: new Color([153, 52, 4, 0.5]),
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
      text: "<b>Median County Income:</b> ${B19049_001E}<br>" + "<b>Percent without Broadband Internet:</b> {B28004_calc_pctNoIntE}%<br>"
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
    }]
  },
  renderer: new ClassBreaksRenderer({
    field: "{B28004_calc_pctNoIntE}",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 10,
        symbol: new SimpleFillSymbol({
          color: new Color([255, 255, 212, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "5% - 10%"
      },
      {
        minValue: 10,
        maxValue: 20,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 227, 145, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "10% - 15%"
      },
      {
        minValue: 20,
        maxValue: 30,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 196, 79, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "20% - 25%"
      },
      {
        minValue: 30,
        maxValue: 40,
        symbol: new SimpleFillSymbol({
          color: new Color([254, 153, 41, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "25% - 30%"
      },
      {
        minValue: 40,
        maxValue: 50,
        symbol: new SimpleFillSymbol({
          color: new Color([217, 95, 14, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "25% - 30%"
      },
      {
        minValue: 50,
        maxValue: 70,
        symbol: new SimpleFillSymbol({
          color: new Color([153, 52, 4, 0.5]),
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