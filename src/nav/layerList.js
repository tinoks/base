import './layerList.css';


let openList = (e) => {
	if(e !== undefined || !document.getElementById('listDiv').classList.contains("show")){
		document.getElementById('listDiv').classList.toggle("show")
		document.getElementsByClassName('left')[0].classList.toggle("active")
		document.getElementById('map').classList.toggle("slim")
	}
};

let closeList = () => {
	if(document.getElementById('listDiv').classList.contains("show")){
		document.getElementById('listDiv').classList.toggle("show")
		document.getElementsByClassName('left')[0].classList.toggle("active")
		document.getElementById('map').classList.toggle("slim")
	}
};

KORTxyz.func.openList = openList;
KORTxyz.func.closeList = closeList;

const icon = document.createElement('i');
  	  icon.className = "material-icons md-36";
  	  icon.innerText = "view_list";
	  icon.addEventListener("click", openList);  	  	 
document.getElementsByClassName("nav left")[0].appendChild(icon);


let startX = 0;
map.on('dragstart',(e)=>{startX =e.originalEvent.pageX})

map.on('dragend',(e)=>{
	if(startX<50 && e.originalEvent.pageX-startX>0){  openList();	}
	if(startX<350 && e.originalEvent.pageX-startX<0){ closeList();	}
})


let listDiv = document.createElement('div');
	listDiv.className = "sidebar";
	listDiv.id = "listDiv";

let	listHeader = document.createElement('ul');
	listHeader.className = "listheader";
	listHeader.innerText = "Layers";
	listHeader.id = "Layers"
	listDiv.appendChild(listHeader)

	document.body.appendChild(listDiv);