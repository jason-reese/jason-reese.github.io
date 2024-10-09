var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/views/SceneView",
        "esri/widgets/Search",
    ],

    function (
        Map, Graphic, GraphicsLayer, ElevationLayer, SceneView, Search) {
        $(document).ready(function () {
            Main = (function () {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                });
                var map = new Map({
                    basemap: "hybrid",
                    ground: {
                        layers: []
                    },
                });
                var view = new SceneView({
                    container: "map",
                    viewingMode: "global",
                    map: map,
                    camera: {
                        position: {
                            x: -111,
                            y: 25,
                            z: 2990500,
                            spatialReference: {
                                wkid: 4326
                            }
                        },
                        heading: 0,
                        tilt: 30
                    },
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            breakpoint: false
                        }
                    },
                    environment: {
                        lighting: {
                            directShadowsEnabled: false
                        }
                    }

                });

                const initMap = function () {
                    const graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);
                    for (const [key, value] of Object.entries(myStuff)) {
                        console.log(key, value)
                        const point = {
                            type: "point",
                            x: value.coord[0],
                            y: value.coord[1],

                        };

                        const markerSymbol = {
                            type: "simple-marker",
                            color: [2, 255, 255],
                            outline: {
                                color: [1, 254, 255],
                                width: 15
                            }
                        };

                        const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            popupTemplate: {
                                title: key + ": " + value.city + ", " + value.state
                            }
                        });

                        graphicsLayer.add(pointGraphic);
                    }

                    view.on("click", function (event) {
                        view.hitTest(event).then(function (response) {
                            const graphics = response.results.find(result => result.graphic.layer === graphicsLayer);
                            if (graphics) {
                                const pointZoom = graphics.geometry;
                                view.goTo({
                                    target: pointZoom,
                                    zoom: 9
                                });
                            }
                        });
                    });

                    const suggestList = Object.entries(myStuff).map(([key, value]) => ({
                        name: value.city,
                        location: [value.coord[1], value.coord[0]],
                        outFields: ["*"]
                    }));

                    const searchWidget = new Search({
                        view: view,
                        searchAllEnabled: false,
                        includeDefaultSources: true,
                        sources: suggestList
                    });

                    view.ui.add(searchWidget, {
                        position: "top-right"
                    });
                };

                initMap()
                return {
                };
            })();
        });
    });