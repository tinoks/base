
KORTxyz.func.addtoAside = (layer) => {

    let li = document.createElement("li");
        li.className = "listitem";
        li.id = layer.id;

    let text = document.createElement("p");
        text.innerText = layer.id;
        text.addEventListener('click',(e)=>{
            map.fitBounds(turf.bbox(map.getSource(e.target.innerText).serialize().data),{
              offset: [
                !document.getElementsByClassName("show")[0]? 0 : 150 ,
                0
              ],
              padding:100
            });            
        })
        li.appendChild(text);

    let iconbrush = document.createElement('i');
        iconbrush.className = "material-icons md-18";
        iconbrush.innerText = "brush";
        iconbrush.addEventListener('click', (e)=>{ iconbrushOpen(e) });
        li.appendChild(iconbrush);

    let listicon = document.createElement('i');
        listicon.className = "material-icons md-18";
        listicon.innerText = "format_list_numbered_rtl";
        listicon.addEventListener('click', (e)=>{ listiconOpen(e) });
        li.appendChild(listicon);

    let popupicon = document.createElement('i');
        popupicon.className = "material-icons md-18";
        popupicon.innerText = "speaker_notes";
        popupicon.addEventListener('click', ()=>{ KORTxyz.func.closeList()});
        li.appendChild(popupicon);

    document.getElementById("Layers").appendChild(li);
}

function iconbrushOpen(e){

  if(!document.getElementsByTagName("styles-bar")[0]){
    require('.././tags/stylesbar.tag');
    require('.././tags/colorpicker.tag');
    document.getElementsByClassName("sidebar")[0].appendChild(document.createElement("styles-bar"));
  }

  if(KORTxyz.states.sidebar.layer == null){
    KORTxyz.states.sidebar = {"type":"style","layer":e.target.parentElement.id};
    e.target.style.color = "black";
    const layer = map.getLayer(KORTxyz.states.sidebar.layer).serialize().paint;
    let paint = {};
    for(let prop in layer) {
      if(prop != "circle-pitch-alignment"){
        paint[prop] = typeof layer[prop] == "object"?  JSON.stringify(layer[prop]) : layer[prop];
      }
    }
    riot.mount('styles-bar',{
      "paint": paint,
      "data": map.getSource(KORTxyz.states.sidebar.layer).serialize().data
    });
    document.getElementsByClassName("sidebar")[0].classList.toggle("show")
  }
  else if(KORTxyz.states.sidebar.layer==e.target.parentElement.id &&
    document.getElementsByClassName("sidebar")[0].classList.contains("show")){
    e.target.style.color = null;
    KORTxyz.states.sidebar.layer == null;
    document.getElementsByClassName("sidebar")[0].classList.toggle("show")
  }
  else{
    if(document.getElementsByClassName("sidebar")[0].classList.contains("show")){
      document.getElementById(KORTxyz.states.sidebar.layer).children[1].style = null;
      KORTxyz.states.sidebar.layer == null;
      document.getElementsByClassName("sidebar")[0].classList.toggle("show");
    }
    setTimeout(
      (timeoutEvent)=>{
        e.target.style.color = "black";
        KORTxyz.states.sidebar = {"type":"style","layer":e.target.parentElement.id};
        document.getElementsByClassName("sidebar")[0].classList.toggle("show")
        const layer = map.getLayer(KORTxyz.states.sidebar.layer).serialize().paint;
        let paint = {};
        for(let prop in layer) {
          if(prop != "circle-pitch-alignment"){
            paint[prop] = typeof layer[prop] == "object"?  JSON.stringify(layer[prop]) : layer[prop];
          }
        }
        riot.mount('styles-bar',{
          "paint": paint,
          "data": map.getSource(KORTxyz.states.sidebar.layer).serialize().data
        });
      },200
    ) 
  }
}

function listiconOpen(e){
// first time loader;
          if(!document.getElementsByTagName("table-bar")[0]){
            
            window.agGrid = require('ag-grid');
            
            require('.././tags/tablebar.tag');
            require('../../node_modules/ag-grid/dist/styles/ag-grid.css');
            require('../../node_modules/ag-grid/dist/styles/ag-theme-balham.css');
            
            document.getElementById('map').appendChild(document.createElement("table-bar"));
            riot.mount('table-bar',{"event":e});
            tableFuncOn(e.target.parentElement.id)
            e.target.style.color = "black";
          }
          // second time loader;
          else{
            if(e.target.parentElement.id == KORTxyz.states.table){
              document.getElementsByTagName("table-bar")[0].classList.toggle("show");
              tableFuncOff(e.target.parentElement.id)
              KORTxyz.states.table = null;
              e.target.style.color = null;
            }
            else{
              if(document.getElementsByTagName("table-bar")[0].classList == "show"){
                tableFuncOff(KORTxyz.states.table)
                document.getElementById(KORTxyz.states.table).children[2].style = null;
                document.getElementsByTagName("table-bar")[0].classList.toggle("show");
              }
              tableFuncOn(e.target.parentElement.id)
              e.target.style.color = "black";
              setTimeout(()=>{
                riot.mount('table-bar',{"event":e});
              },200)
            }
          }
}

function tableFuncOn(name){
  KORTxyz.func[name] = (e) =>{
    if(e.type == "mouseenter"){
      map.getCanvas().style.cursor = 'pointer';
    }
    else if(e.type == "mouseleave"){
      map.getCanvas().style.cursor = '';
    }
     else if(e.type == "click"){
      gridOptions.api.getRowNode(e.features[0].properties.fid).setSelected(true)
      gridOptions.api.ensureIndexVisible(gridOptions.api.getRowNode(e.features[0].properties.fid).rowIndex)
    }
  }

    map.on('click',name,  KORTxyz.func[name]);

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter',name,  KORTxyz.func[name]);

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', name, KORTxyz.func[name]);
} 

function tableFuncOff(name){
    map.off('click',name, KORTxyz.func[name]);

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.off('mouseenter',name, KORTxyz.func[name]);

    // Change it back to a pointer when it leaves.
    map.off('mouseleave', name, KORTxyz.func[name]);
}