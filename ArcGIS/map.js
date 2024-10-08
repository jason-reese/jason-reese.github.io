var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/views/SceneView",
        "esri/widgets/Search",
        "esri/request" // Ensure you have esri/request for AJAX
    ],
    function (
        Map, Graphic, GraphicsLayer, ElevationLayer, SceneView, Search,esriRequest
    ) 
    {
        $(document).ready(function () {
            Main = (function () {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                });
                var map = new Map({
                    basemap: "hybrid",
                    ground: {
                        layers: [layer]
                    },
                });

                var view = new SceneView({
                    container: "map",
                    viewingMode: "global",
                    map: map,
                    camera: {
                        position: {
                            x: -105.503,
                            y: 44.270,
                            z: 20000000,
                            spatialReference: {
                                wkid: 4326

                            }
                        },
                        heading: 0,
                        tilt: 0
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
                            color: [0, 255, 255],
                            outline: {
                                color: [255, 0, 255],
                                width: 3
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
                
                    const suggestList = Object.entries(myStuff).map(([key, value]) => ({
                            name: value.city,
                            location: [value.coord[1], value.coord[0]], 
                            outFields: ["*"]
                        }));
                    
                        const searchWidget = new Search({
                            view: view,
                            searchAllEnabled: false,
                            includeDefaultSources: false,
                            sources: suggestList
                        });
                
                        view.ui.add(searchWidget, {
                            position: "top-right"
                        });
                    
                    ///dont touch!!!
                };
                initMap()
                return {

                };

            })();
        });

    });