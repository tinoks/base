KORTxyz.func.addLayer = async (layer) => {
    KORTxyz.layers.push(layer);
    map.addLayer(layer)
    iziToast.show({
        title: 'Added',
        message: layer.id,
        buttons: [
            ['<button>Zoom to layer</button>', function (instance, toast) {
                map.fitBounds(turf.bbox(map.getSource(layer.id).serialize().data),{
                    offset: [
                        !document.getElementsByClassName("show")[0]? 0 : 150 ,
                        0
                    ],
                    padding: 100
                });
            }, true]
        ]
    });
    KORTxyz.func.addtoAside(layer);
}

KORTxyz.func.createLayer = async (filename,geojson) => {
    let name = filename.split('.')[0]
    geojson.features.forEach((e,i)=>{e.properties.fid = i})
    map.addSource(name, {
            'type': 'geojson',
            'data': geojson
        })

	let layer = {
            'id': name,
            'source': name
        };

    let datatype = geojson.features[0].geometry.type.substr(0,5)=="Multi"? geojson.features[0].geometry.type.substr(5) : geojson.features[0].geometry.type;

    let styles = {
            'point': {
                'type': 'circle',
                "layout": {},
                "paint": {
                    'circle-pitch-alignment': "map",
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [[12, 2], [22, 180]]
                    },
                    'circle-color': tinycolor.random().toRgbString(),
                    'circle-blur':0

                }
            },
            'linestring': {
                'type': 'line',
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": tinycolor.random().toRgbString(),
                    "line-width": 4,
                    "line-blur":0
                }
            },
            'polygon': {
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color':tinycolor.random().toRgbString(),
                }
            }
        };
    let layerStyle = styles[datatype.toLowerCase()];
    KORTxyz.func.addLayer({ ...layer, ...layerStyle});
}
