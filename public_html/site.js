// let map = L.map('map')
//
// let Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
//     attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
// });
//
// let vectorStyles = {
//     grass: {
//         fill: true,
//         weight: 3,
//         fillColor: '#018E42',
//         color: '#018E42',
//         fillOpacity: 0.2,
//         opacity: 1,
//     },
//     ground: {
//         fill: true,
//         weight: 2,
//         fillColor: '#5D3A00',
//         color: '#5D3A00',
//         fillOpacity: 0.2,
//         opacity: 1,
//     },
//     sand: {
//         fill: true,
//         weight: 3,
//         fillColor: '#F5CB5C',
//         color: '#F5CB5C',
//         fillOpacity: 0.2,
//         opacity: 1,
//     },
//     gravel: {
//         fill: true,
//         weight: 3,
//         fillColor: '#BF1A2F',
//         color: '#BF1A2F',
//         fillOpacity: 0.2,
//         opacity: 1,
//     },
// }
//
// var legend = L.control({position: 'topright'});
// legend.onAdd = function (map) {
//
//     var div = L.DomUtil.create('div', 'info legend');
//     div.innerHTML += '<i style="background: #018E42"></i> Grass<br>';
//     div.innerHTML += '<i style="background: #5D3A00"></i> Ground<br>';
//     div.innerHTML += '<i style="background: #F5CB5C"></i> Sand<br>';
//     div.innerHTML += '<i style="background: #BF1A2F"></i> Gravel<br>';
//     return div;
// };
//
// legend.addTo(map);
//
//
// let grass = L.vectorGrid.protobuf('/tiles/{z}/{x}/{y}.pbf', {
//     vectorTileLayerStyles: vectorStyles,
//     attribution: '© OpenStreetMap contributors',
//     maxZoom: 13
// });
//
//
// map.addLayer(Esri_WorldTopoMap);
//
// grass.addTo(map)
//


const map = new maplibregl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 0, // starting zoom
    style: {
        'version': 8,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': [
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                ],
                'tileSize': 256,
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }
        },
        'layers': [
            {
                'id': 'simple-tiles',
                'type': 'raster',
                'source': 'raster-tiles',
                'minzoom': 0,
                'maxzoom': 22
            }
        ]
    },


});

map.on('load', function () {
    map.addLayer({
        "id": "grass",
        "type": "line",
        "source": {
            "type": "vector",
            "tiles": [`${document.URL}/tiles/{z}/{x}/{y}.pbf`],
        },
        "source-layer": "grass",
        "paint": {
            "line-color": "#018E42",
        }
    });

    map.addLayer({
        "id": "ground",
        "type": "line",
        "source": {
            "type": "vector",
            "tiles": [`${document.URL}/tiles/{z}/{x}/{y}.pbf`],
        },
        "source-layer": "ground",
        "paint": {
            "line-color": "#5D3A00",
        }
    });

    map.addLayer({
        "id": "sand",
        "type": "line",
        "source": {
            "type": "vector",
            "tiles": [`${document.URL}/tiles/{z}/{x}/{y}.pbf`],
        },
        "source-layer": "sand",
        "paint": {
            "line-color": "#F5CB5C",
        }
    });

    map.addLayer({
        "id": "gravel",
        "type": "line",
        "source": {
            "type": "vector",
            "tiles": [`${document.URL}/tiles/{z}/{x}/{y}.pbf`],
        },
        "source-layer": "gravel",
        "paint": {
            "line-color": "#BF1A2F",
        }
    });

    // var legend = L.control({position: 'topright'});
    // legend.onAdd = function (map) {
    //
    //     var div = L.DomUtil.create('div', 'info legend');
    //     div.innerHTML += '<i style="background: #018E42"></i> Grass<br>';
    //     div.innerHTML += '<i style="background: #5D3A00"></i> Ground<br>';
    //     div.innerHTML += '<i style="background: #F5CB5C"></i> Sand<br>';
    //     div.innerHTML += '<i style="background: #BF1A2F"></i> Gravel<br>';
    //     return div;
    // };
    //
    // legend.addTo(map);
})


fetch("/tiles/metadata.json")
    .then(response => response.json())
    .then(metadata => {
        map.setMaxZoom(metadata.maxzoom)
        map.setMinZoom(metadata.minzoom)
        let center = metadata.center.split(",")
        map.jumpTo({
            center: [center[0], center[1]],
            zoom: 9,
        })
    })
