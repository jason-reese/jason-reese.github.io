require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/SimpleRenderer",
  "esri/Color"

], function (Map, MapView, FeatureLayer, Legend, SimpleFillSymbol, SimpleLineSymbol, ClassBreaksRenderer, SimpleRenderer, Color) {

  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100, 40],
    zoom: 3
  });

  ///limit extent to layer draw size
  view.constraints = {
    minZoom: 1,
    maxZoom: 7
  };

  /// reference maps
  var incomeSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/0",
    outFields: ["B19049_001E"],
    renderer: new SimpleRenderer({
      field: "B19049_001E",
      symbol: new SimpleFillSymbol({
        color: new Color([0, 0, 0, 0]),
        outline: new SimpleLineSymbol({
          color: [30, 30, 30],
          width: 0.30
        })
      }),
    })
  });

  var incomeCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Median_Income_by_Race_and_Age_Selp_Emp_Boundaries/FeatureServer/1",
    renderer: new SimpleRenderer({
      field: "B19049_001E",
      symbol: new SimpleFillSymbol({
        color: new Color([0, 0, 0, 0]),
        outline: new SimpleLineSymbol({
          color: [30, 30, 30],
          width: 0.30
        })
      }),
    })
  });

  /// thematic layers
  var internetSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/0",
    popupTemplate: {
      fieldInfos: [{    ///change labels
        fieldName: "B28004_calc_numNoIntE",
        label: "No Internet"
      },
      {
        fieldName: "B28004_calc_numBBE",
        label: "Broadband Internet"
      },
      {
        fieldName: "B28004_calc_numDialE",
        label: "Dial-up Internet"
      }],
      title: "{NAME}",
      content: [{
        type: "text",
        text: "<b>Population without Broadband Internet:</b> {B28004_calc_pctNoIntE}%<br>"
      },
      {
        type: "media",
        mediaInfos: {
          title: "<b>Internet Access</b>",
          type: "pie-chart",
          value: {
            fields: ["B28004_calc_numNoIntE", "B28004_calc_numBBE", "B28004_calc_numDialE"]
          }
        }
      }]
    },
    renderer: new ClassBreaksRenderer({   ///legend breaks
      valueExpression: "$feature.B28004_calc_pctNoIntE",
      classBreakInfos: [{
        minValue: 0,
        maxValue: 10,
        symbol: new SimpleFillSymbol({
          color: new Color([255, 255, 212, 0.5]),
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
          color: new Color([254, 227, 145, 0.5]),
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
          color: new Color([254, 196, 79, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "20% - 30%"
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
        label: "30% - 40%"
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
        label: "40% - 50%"
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
        label: "50% - 60%"
      },
      ]
    })
  });

  var internetCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Internet_by_Income_Boundaries/FeatureServer/1",
    popupTemplate: {
      fieldInfos: [{
        fieldName: "B28004_calc_numNoIntE",
        label: "No Internet"
      },
      {
        fieldName: "B28004_calc_numBBE",
        label: "Broadband Internet"
      },
      {
        fieldName: "B28004_calc_numDialE",
        label: "Dial-up Internet"
      }],
      title: "{NAME}, {State}",
      content: [{
        type: "text",
        text: "<b>Population without Broadband Internet:</b> {B28004_calc_pctNoIntE}%<br>"
      },
      {
        type: "media",
        mediaInfos: {
          title: "<b>Internet Access</b>",
          type: "pie-chart",
          value: {
            fields: ["B28004_calc_numNoIntE", "B28004_calc_numBBE", "B28004_calc_numDialE"]
          }
        }
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "$feature.B28004_calc_pctNoIntE",
      classBreakInfos: [{
        minValue: 0,
        maxValue: 10,
        symbol: new SimpleFillSymbol({
          color: new Color([255, 255, 212, 0.5]),
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
          color: new Color([254, 227, 145, 0.5]),
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
          color: new Color([254, 196, 79, 0.5]),
          outline: new SimpleLineSymbol({
            color: [200, 200, 200],
            width: 1
          })
        }),
        label: "20% - 30%"
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
        label: "30% - 40%"
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
        label: "40% - 50%"
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
        label: "50% - 60%"
      },
      ]
    })
  });

  var houseSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Highlights_Population_Housing_Basics_Boundaries/FeatureServer/0",
    visible: false,
    popupTemplate: {
      fieldInfos: [{
        fieldName: "B25003_002E",
        label: "Home Owners"
      },
      {
        fieldName: "B25003_003E",
        label: "Renters"
      }],
      title: "{NAME}",
      content: [{
        type: "text",
        text: "<b>Median State Income:</b> ${B19049_001E}<br>" + "<b>Median Home Value:</b> ${B25077_001E}<br>"
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
      }]
    },

    renderer: new ClassBreaksRenderer({
      valueExpression: "$feature.B25003_calc_pctOwnE",
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
          label: "> 30%"
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
          label: "30% - 40%"
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
          label: "40% - 50%"
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
          label: "50% - 60%"
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
          label: "60% - 70%"
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
          label: "70% - 80%"
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
          label: "80% - 90%"
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
          label: "90% - 100%"
        }]
    })
  });

  var houseCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Highlights_Population_Housing_Basics_Boundaries/FeatureServer/1",
    visible: false,
    popupTemplate: {
      fieldInfos: [{
        fieldName: "B25003_002E",
        label: "Home Owners"
      },
      {
        fieldName: "B25003_003E",
        label: "Renters"
      }],
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
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "$feature.B25003_calc_pctOwnE",
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
          label: "> 30%"
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
          label: "30% - 40%"
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
          label: "40% - 50%"
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
          label: "50% - 60%"
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
          label: "60% - 70%"
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
          label: "70% - 80%"
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
          label: "80% - 90%"
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
          label: "90% - 100%"
        }]
    })
  });

  var educateSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Educational_Attainment_Boundaries/FeatureServer/0",
    visible: false,
    outFields: ["B15002_calc_pctLTHSE", "B15002_calc_pctHSE", "B15002_calc_pctSomeCollE", "B15002_calc_pctAAE", "B15002_calc_pctGEBAE"],
    popupTemplate: {
      fieldInfos: [{
        fieldName: "B15002_calc_pctLTHSE",
        label: "Less than High School Completion"
      },
      {
        fieldName: "B15002_calc_pctHSE",
        label: "High School Graduate or Equivelent "
      },
      {
        fieldName: "B15002_calc_pctSomeCollE",
        label: "Some College Completed"
      },
      {
        fieldName: "B15002_calc_pctAAE",
        label: "Associate's Degree"
      },
      {
        fieldName: "B15002_calc_pctGEBAE",
        label: "Bachelor's Degree or Higher"
      }],
      expressionInfos: [{  ///sum secondary education types for legend
        name: "participation-rate",
        expression: "($feature.B15002_calc_pctSomeCollE + $feature.B15002_calc_pctAAE + $feature.B15002_calc_pctGEBAE)"
      }],
      title: "{NAME}",
      content: [{
        type: "text",
        text: "<b>Percent of Population with GED or Equivelent:</b> {B15002_calc_pctHSE}%<br>"
      },
      {
        type: "media",
        mediaInfos: [{
          title: "<b>Education Rates</b>",
          type: "pie-chart",
          value: {
            fields: ["B15002_calc_pctLTHSE", "B15002_calc_pctHSE", "B15002_calc_pctSomeCollE", "B15002_calc_pctAAE", "B15002_calc_pctGEBAE"],
          }
        }]
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "($feature.B15002_calc_pctSomeCollE + $feature.B15002_calc_pctAAE + $feature.B15002_calc_pctGEBAE)",
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 30,
          symbol: new SimpleFillSymbol({
            color: new Color([222, 235, 247, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "20% - 30%"
        },
        {
          minValue: 30,
          maxValue: 40,
          symbol: new SimpleFillSymbol({
            color: new Color([198, 219, 239, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "30% - 40%"
        },
        {
          minValue: 40,
          maxValue: 50,
          symbol: new SimpleFillSymbol({
            color: new Color([158, 202, 225, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "40% - 50%"
        },
        {
          minValue: 50,
          maxValue: 60,
          symbol: new SimpleFillSymbol({
            color: new Color([107, 174, 214, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "50% - 60%"
        },
        {
          minValue: 60,
          maxValue: 70,
          symbol: new SimpleFillSymbol({
            color: new Color([66, 146, 198, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "60% - 70%"
        },
        {
          minValue: 70,
          maxValue: 80,
          symbol: new SimpleFillSymbol({
            color: new Color([33, 113, 181, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "70% - 80%"
        },
        {
          minValue: 80,
          maxValue: 90,
          symbol: new SimpleFillSymbol({
            color: new Color([8, 69, 148, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "80% - 90%"
        }]
    })
  });

  var educateCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_10_14_Educational_Attainment_Boundaries/FeatureServer/1",
    visible: false,
    outFields: ["B15002_calc_pctLTHSE", "B15002_calc_pctHSE", "B15002_calc_pctSomeCollE", "B15002_calc_pctAAE", "B15002_calc_pctGEBAE"],
    popupTemplate: {
      fieldInfos: [{
        fieldName: "B15002_calc_pctLTHSE",
        label: "Less than High School Completion",
      },
      {
        fieldName: "B15002_calc_pctHSE",
        label: "High School Graduate or Equivelent "
      },
      {
        fieldName: "B15002_calc_pctSomeCollE",
        label: "Some College Completed"
      },
      {
        fieldName: "B15002_calc_pctAAE",
        label: "Associate's Degree"
      },
      {
        fieldName: "B15002_calc_pctGEBAE",
        label: "Bachelor's Degree or Higher"
      }],
      title: "{NAME}, {State}",
      content: [{
        type: "text",
        text: "<b>Percent of Population with GED or Equivelent:</b> {B15002_calc_pctHSE}%<br>"
      },
      {
        type: "media",
        mediaInfos: [{
          title: "<b>Education Rates</b>",
          type: "pie-chart",
          value: {
            fields: ["B15002_calc_pctLTHSE", "B15002_calc_pctHSE", "B15002_calc_pctSomeCollE", "B15002_calc_pctAAE", "B15002_calc_pctGEBAE"],
          }
        }]
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "($feature.B15002_calc_pctSomeCollE + $feature.B15002_calc_pctAAE + $feature.B15002_calc_pctGEBAE)",
      classBreakInfos: [{
        minValue: 0,
        maxValue: 30,
        symbol: new SimpleFillSymbol({
          color: new Color([222, 235, 247, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "20% - 30%"
      },
      {
        minValue: 30,
        maxValue: 40,
        symbol: new SimpleFillSymbol({
          color: new Color([198, 219, 239, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "30% - 40%"
      },
      {
        minValue: 40,
        maxValue: 50,
        symbol: new SimpleFillSymbol({
          color: new Color([158, 202, 225, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "40% - 50%"
      },
      {
        minValue: 50,
        maxValue: 60,
        symbol: new SimpleFillSymbol({
          color: new Color([107, 174, 214, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "50% - 60%"
      },
      {
        minValue: 60,
        maxValue: 70,
        symbol: new SimpleFillSymbol({
          color: new Color([66, 146, 198, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "60% - 70%"
      },
      {
        minValue: 70,
        maxValue: 80,
        symbol: new SimpleFillSymbol({
          color: new Color([33, 113, 181, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "70% - 80%"
      },
      {
        minValue: 80,
        maxValue: 90,
        symbol: new SimpleFillSymbol({
          color: new Color([8, 69, 148, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "80% - 90%"
      }]
    })
  });

  var healthSteLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/2022_County_Health_Rankings/FeatureServer/1",
    visible: false,
    maxScale: 19000000, ///set scales for display switching
    popupTemplate: {
      title: "{STATE_NAME}",
      content: [{
        type: "text",
        text: "<b>Median State Income:</b> ${v063_rawvalue}<br>" +
          "<b>Average Life Expectancy:</b> {v147_rawvalue} Years<br>" +
          "<b>Adults with No Health Insurance: </b>{v085_rawvalue}%<br>" +
          "<b>Adults that Smoke Tobacco: </b>{v009_rawvalue}%<br>" +
          "<b>Adult Obesity:</b> {v011_rawvalue }%<br>" +
          "<b>Children Living in Poverty:</b> {v024_rawvalue }%<br>"
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "$feature.v147_rawvalue", /// force defined legend label
      classBreakInfos: [{
        minValue: 60,
        maxValue: 70,
        symbol: new SimpleFillSymbol({
          color: new Color([217, 240, 163, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "60-70"
      },
      {
        minValue: 70,
        maxValue: 80,
        symbol: new SimpleFillSymbol({
          color: new Color([173, 221, 142, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "70-80"
      },
      {
        minValue: 80,
        maxValue: 90,
        symbol: new SimpleFillSymbol({
          color: new Color([120, 198, 121, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "80-90"
      },
      {
        minValue: 90,
        maxValue: 100,
        symbol: new SimpleFillSymbol({
          color: new Color([49, 163, 84, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "90-100"
      },
      {
        minValue: 100,
        maxValue: 120,
        symbol: new SimpleFillSymbol({
          color: new Color([0, 104, 55, 0.5]),
          outline: new SimpleLineSymbol({
            color: [150, 150, 150],
            width: 0.5
          })
        }),
        label: "100-110"
      }]
    })
  });

  var healthCntyLayer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/2022_County_Health_Rankings/FeatureServer/2",
    visible: false,
    minScale: 19000000,
    popupTemplate: {
      title: "{county}, {STATE}",
      content: [{
        type: "text",
        text: "<b>Median State Income:</b> ${v063_rawvalue}<br>" +
          "<b>Average Life Expectancy: </b>{v147_rawvalue} Years<br>" +
          "<b>Adults with No Health Insurance: </b>{v085_rawvalue}%<br>" +
          "<b>Adults that Smoke Tobacco: </b>{v009_rawvalue}%<br>" +
          "<b>Adult Obesity:</b> {v011_rawvalue }%<br>" +
          "<b>Children Living in Poverty: </b>{v024_rawvalue }%<br>"
      }]
    },
    renderer: new ClassBreaksRenderer({
      valueExpression: "$feature.v147_rawvalue",
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 50,
          symbol: new SimpleFillSymbol({
            color: new Color([217, 240, 163, 0.0]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "No Data"
        },
        {
          minValue: 50,
          maxValue: 70,
          symbol: new SimpleFillSymbol({
            color: new Color([217, 240, 163, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "60-70"
        },
        {
          minValue: 70,
          maxValue: 80,
          symbol: new SimpleFillSymbol({
            color: new Color([173, 221, 142, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "70-80"
        },
        {
          minValue: 80,
          maxValue: 90,
          symbol: new SimpleFillSymbol({
            color: new Color([120, 198, 121, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "80-90"
        },
        {
          minValue: 90,
          maxValue: 100,
          symbol: new SimpleFillSymbol({
            color: new Color([49, 163, 84, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "90-100"
        },
        {
          minValue: 100,
          maxValue: 120,
          symbol: new SimpleFillSymbol({
            color: new Color([0, 104, 55, 0.5]),
            outline: new SimpleLineSymbol({
              color: [150, 150, 150],
              width: 0.5
            })
          }),
          label: "100-110"
        }]
    })
  });

  //load maps
  map.add(internetSteLayer);
  map.add(internetCntyLayer);
  map.add(houseSteLayer);
  map.add(houseCntyLayer);
  map.add(educateSteLayer);
  map.add(educateCntyLayer);
  map.add(healthSteLayer);
  map.add(healthCntyLayer);
  map.add(incomeSteLayer);
  map.add(incomeCntyLayer);

  ///Button logic for income
  const radioButtons = document.querySelectorAll('input[name="filter"]');
  radioButtons.forEach(function (button) {
    button.addEventListener('change', function (event) {
      const selectedValue = event.target.value;
      let definitionExpression = "";

      if (selectedValue === "00") {
        definitionExpression = "B19049_001E >= 0 AND B19049_001E <= 30000"
      }
      else if (selectedValue === "30") {
        definitionExpression = "B19049_001E >= 30001 AND B19049_001E <= 40000"
      }
      else if (selectedValue === "40") {
        definitionExpression = "B19049_001E >= 40001 AND B19049_001E <= 50000"
      }
      else if (selectedValue === "50") {
        definitionExpression = "B19049_001E >= 50001 AND B19049_001E <= 60000"
      }
      else if (selectedValue === "60") {
        definitionExpression = "B19049_001E >= 60001 AND B19049_001E <= 70000"
      }
      else if (selectedValue === "70") {
        definitionExpression = "B19049_001E >= 70001 AND B19049_001E <= 80000"
      }
      else if (selectedValue === "80") {
        definitionExpression = "B19049_001E >= 80001 AND B19049_001E <= 90000"
      }
      else if (selectedValue === "90") {
        definitionExpression = "B19049_001E >= 90001 AND B19049_001E <= 100000"
      }
      else if (selectedValue === "ALL") {
        definitionExpression = "B19049_001E"
      }
      incomeSteLayer.definitionExpression = definitionExpression;
      incomeCntyLayer.definitionExpression = definitionExpression
    })
  });

  ////Popups and Legend
  view.popup.dockEnabled = true;
  view.popup.dockOptions = {
    buttonEnabled: false,
    breakpoint: false,
    position: "bottom-right"
  };

  var legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: internetSteLayer,
        title: "Percent of the Population Without Internet Access",
      },
      {
        layer: internetCntyLayer,
        title: "Percent of the Population Without Internet Access"
      },
      {
        layer: houseSteLayer,
        title: "Percent of the Population that Owns a Home"
      },
      {
        layer: houseCntyLayer,
        title: "Percent of the Population that Owns a Home"
      },
      {
        layer: educateSteLayer,
        title: "Percent of Population with College Degree or Some College"
      },
      {
        layer: educateCntyLayer,
        title: "Percent of Population with College Degree or Some College"
      },
      {
        layer: healthSteLayer,
        title: "Average Life Expectancy in Years"
      },
      {
        layer: healthCntyLayer,
        title: "Average Life Expectancy in Years"
      }
    ]
  });

  view.ui.add(legend, "bottom-left");

  /// checkbox layer listeners 
  document.getElementById("toggleLayer1").addEventListener("change", function () {
    internetCntyLayer.visible = this.checked; internetSteLayer.visible = this.checked
  });
  document.getElementById("toggleLayer2").addEventListener("change", function () {
    houseCntyLayer.visible = this.checked; houseSteLayer.visible = this.checked
  });
  document.getElementById("toggleLayer3").addEventListener("change", function () {
    educateSteLayer.visible = this.checked; educateCntyLayer.visible = this.checked
  });
  document.getElementById("toggleLayer4").addEventListener("change", function () {
    healthSteLayer.visible = this.checked; healthCntyLayer.visible = this.checked
  });

  ///limit checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const maxSelection = 2;

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

      if (checkedCount > maxSelection) {
        alert('You can only select up to ' + maxSelection + ' options. Please un-select one and try again.');
        checkbox.checked = false;
      }
    });
  });
})