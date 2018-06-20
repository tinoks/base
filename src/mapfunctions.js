window.KORTxyz = {
	layers:[],
	func: {}
};



KORTxyz.func.addLayer = (data) => {
    KORTxyz.layers.push(data);
    map.addLayer(KORTxyz.layers.filter(e=>e.id==data.id)[0])
}

KORTxyz.func.createLayer = (name,geojson) => {

	let layer = {
        'id': name.split('.')[0],
        'source': {
            'type': 'geojson',
            'data': geojson
        }}

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
        }
    let layerStyle = styles[datatype.toLowerCase()];

    KORTxyz.func.addLayer({ ...layer, ...layerStyle})

    }

