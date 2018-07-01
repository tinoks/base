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
                !document.getElementsByClassName("show")[0]? 0 : -150 ,
                0
            ]
        });
                console.log(map.getSource(layer.id).serialize().data)
            }, true]
        ]
    });
    KORTxyz.func.addtoAside(layer);
}

KORTxyz.func.createLayer = async (filename,geojson) => {
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
            'linestring': {
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

KORTxyz.func.addtoAside = (layer) => {
    let li = document.createElement("li");
        li.className = "listitem";
        li.addEventListener("click",(e)=>{
            console.log(e.toElement.style)
            if(e.toElement.className == "material-icons md-36" && !e.toElement.style.transform){
               e.toElement.style.transform = "rotate(90deg)";
               e.target.parentElement.nextElementSibling.style.display = "block";
               e.target.parentElement.nextElementSibling.style.visibility = "visible";
            }else{
               e.toElement.style.transform = null;
               e.target.parentElement.nextElementSibling.style.display = "none";  
               e.target.parentElement.nextElementSibling.style.visibility = "hidden";
            }
        })
        li.id = layer.id;

    let text = document.createElement("p");
        text.innerText = layer.id;
        li.appendChild(text);

    let icon = document.createElement('i');
        icon.className = "material-icons md-36";
        icon.innerText = "keyboard_arrow_right";
        icon.style.marginLeft = "auto"
        li.appendChild(icon);

    document.getElementById("Layers").appendChild(li);

    let menu = document.createElement('ul');
        menu.className = "listmenu";
    var menuEl = document.createElement('li');
        menuEl.innerText = "Style";
        menu.appendChild(menuEl)
    var menuEl = document.createElement('li');
        menuEl.innerText = "Table";
        menu.appendChild(menuEl)
    var menuEl = document.createElement('li');
        menuEl.innerText = "Popup";
        menu.appendChild(menuEl)
    document.getElementById("Layers").appendChild(menu);

    KORTxyz.func.openList();

}