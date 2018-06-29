let openList = (e) => {
	if(e !== undefined || !document.getElementById('listDiv').classList.contains("show")){
		document.getElementById('listDiv').classList.toggle("show")
		document.getElementById('map').classList.toggle("slim")
	}
};

let closeList = () => {
	if(document.getElementById('listDiv').classList.contains("show")){
		document.getElementById('listDiv').classList.toggle("show")
		document.getElementById('map').classList.toggle("slim")
	}
};

let toggleMenu = (button) => {
	["modulemenu","alertmenu","socialmenu"]
		.filter(e=> e != button.target.id.toLowerCase())
		.forEach((e)=>{
			document.getElementById(e).classList.remove("show");
		})
	document.getElementById(button.target.id.toLowerCase()).classList.toggle("show")
}

KORTxyz.func.openList = openList;
KORTxyz.func.closeList = closeList;

const mapDiv = document.getElementById('map');

let navRight = document.createElement('div');
	navRight.className = "nav right";
	mapDiv.appendChild(navRight);

let navLeft = document.createElement('div');
	navLeft.className = "nav left";
	mapDiv.appendChild(navLeft);

function addIcons(nav,name,id,func){
	const icon = document.createElement('i');
	  	  icon.className = "material-icons md-36";
	  	  icon.innerText = name;
	  	  icon.id = id;
	  	  if(!!func){
		  	  icon.addEventListener("click", func);  	  	
	  	  }
	nav.appendChild(icon);
}

addIcons(navRight,"view_module","moduleMenu",toggleMenu)
addIcons(navRight,"notification_important","alertMenu",toggleMenu)
addIcons(navRight,"account_circle","socialMenu",toggleMenu)

addIcons(navLeft,"view_list","list",openList)
let searchInput = document.createElement('input');
	searchInput.id = "searchInput";
	searchInput.setAttribute("type", "search");
	searchInput.setAttribute("placeholder", "type to search..");
	navLeft.appendChild(searchInput);

/* -- SIDEBAR -- */
let listDiv = document.createElement('div');
	listDiv.className = "sidebar";
	listDiv.id = "listDiv";

	listHeader = document.createElement('ul');
	listHeader.className = "listheader";
	listHeader.innerText = "Layers";
	listHeader.id = "Layers"
	listDiv.appendChild(listHeader)

	document.body.appendChild(listDiv);

let startX = 0;
map.on('dragstart',(e)=>{startX =e.originalEvent.pageX})

map.on('dragend',(e)=>{
	if(startX<50 && e.originalEvent.pageX-startX>0){  openList();	}
	if(startX<350 && e.originalEvent.pageX-startX<0){ closeList();	}
})


/* -- SocialMenu -- */
let socialMenu = document.createElement('div');
	socialMenu.id = "socialmenu";
	mapDiv.appendChild(socialMenu);

/* -- alertMenu -- */
let alertMenu = document.createElement('div');
	alertMenu.id = "alertmenu";
	mapDiv.appendChild(alertMenu);

/* -- SocialMenu -- */
let moduleMenu = document.createElement('div');
	moduleMenu.id = "modulemenu";
	mapDiv.appendChild(moduleMenu);
