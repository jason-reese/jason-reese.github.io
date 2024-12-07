  var classBreaksRenderer = new ClassBreaksRenderer({
    field: "B19049_001E",
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
        label: "< $30000"
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
        label: "$30000 - $45000"
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
        label: "$45000 - $60000"
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
        label: "$60000 - $75000"
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
        label: "$75000 - $90000"
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
        label: "> $90000"
      }
    ]
  });

var incomeSteLayer = new FeatureLayer({
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/0",
  renderer: classBreaksRenderer,
  outFields: ["B19049_001E"]
});

var incomeCntyLayer = new FeatureLayer({
  url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/1",
  renderer: classBreaksRenderer,
  outFields: ["B19049_001E"]
});


return {
  incomeSteLayer: incomeSteLayer,
  incomeCntyLayer: incomeCntyLayer
};