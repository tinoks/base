const navRight = document.getElementsByClassName('nav right')[0];
const mapDiv = document.getElementById('map');

let toggleMenu = (button) => {
	["modulemenu","alertmenu","socialmenu"]
		.filter(e=> e != button.target.id.toLowerCase())
		.forEach((e)=>{
			document.getElementById(e).classList.remove("show");
		})
	document.getElementById(button.target.id.toLowerCase()).classList.toggle("show")
}

function addIcons(nav,name,id,func){
	const icon = document.createElement('i');
	  	  icon.className = "material-icons md-36";
	  	  icon.innerText = name;
	  	  icon.id = id;
		  icon.addEventListener("click", func);  	  	
	nav.appendChild(icon);
}

addIcons(navRight,"view_module","moduleMenu",toggleMenu)
addIcons(navRight,"notification_important","alertMenu",toggleMenu)
addIcons(navRight,"account_circle","socialMenu",toggleMenu)




/* -- SocialMenu -- */
let socialMenu = document.createElement('div');
	socialMenu.id = "socialmenu";
	mapDiv.appendChild(socialMenu);

/* -- alertMenu -- */
let alertMenu = document.createElement('div');
	alertMenu.id = "alertmenu";
	mapDiv.appendChild(alertMenu);

/* -- moduleMenu -- */
let moduleMenu = document.createElement('div');
	moduleMenu.id = "modulemenu";
	mapDiv.appendChild(moduleMenu);
