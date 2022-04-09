let map = L.map('map')

let Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

let vectorStyles = {
    grass: {
        fill: true,
        weight: 3,
        fillColor: '#018E42',
        color: '#018E42',
        fillOpacity: 0.2,
        opacity: 1,
    },
    ground: {
        fill: true,
        weight: 2,
        fillColor: '#5D3A00',
        color: '#5D3A00',
        fillOpacity: 0.2,
        opacity: 1,
    },
    sand: {
        fill: true,
        weight: 3,
        fillColor: '#F5CB5C',
        color: '#F5CB5C',
        fillOpacity: 0.2,
        opacity: 1,
    },
    gravel: {
        fill: true,
        weight: 3,
        fillColor: '#BF1A2F',
        color: '#BF1A2F',
        fillOpacity: 0.2,
        opacity: 1,
    },
}


let grass = L.vectorGrid.protobuf('/tiles/{z}/{x}/{y}.pbf', {
    vectorTileLayerStyles: vectorStyles,
    attribution: '© OpenStreetMap contributors',
    maxZoom: 13
});


map.addLayer(Esri_WorldTopoMap);

grass.addTo(map)

fetch("/tiles/metadata.json")
    .then(response => response.json())
    .then(metadata => {
        map.setMaxZoom(metadata.maxzoom)
        map.setMinZoom(metadata.minzoom)
        let center = metadata.center.split(",")
        map.setView([center[1], center[0]], 10)
    })
