window.KORTxyz = {
	layers:[],
	func: {}
};



KORTxyz.func.addLayer = (layer) => {
    KORTxyz.layers.push(layer);
    map.addLayer(layer)
    iziToast.show({
        title: 'Added',
        message: layer.id,
        buttons: [
            ['<button>Zoom to layer</button>', function (instance, toast) {
                map.fitBounds(turf.bbox(map.getSource(layer.id).serialize().data),{
            offset: [
                document.getElementsByTagName("aside")[0].style.width.substr(0,3) == 400 ? -200 : 0,
                0
            ]
        });
                console.log(map.getSource(layer.id).serialize().data)
            }, true]
        ]
    });
}

KORTxyz.func.createLayer = (filename,geojson) => {
    console.log(geojson)
    let name = filename.split('.')[0]
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
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [[12, 2], [22, 180]]
                    },
                    'circle-color': '#'+(Math.random()*0xFFFFFF<<0).toString(16)
                }
            },
            'line': {
                'type': 'line',
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                    "line-width": 4
                }
            },
            'polygon': {
                'type': 'fill',
                'layout': {},
                'paint': {
                    'fill-color':'#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
                    'fill-opacity': 0.8,
                    'fill-outline-color': '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6) //[ "step", ["zoom"],"rgba(0, 0, 0, 0)",10,"grey"]
                }
            }
        };
    let layerStyle = styles[datatype.toLowerCase()];

    KORTxyz.func.addLayer({ ...layer, ...layerStyle});

    }

