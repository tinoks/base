
const navdiv = document.createElement('div');
	  navdiv.id = "nav";
document.body.appendChild(navdiv);

function addIcons(name){
	const icon = document.createElement('i');
	  	  icon.className = "material-icons md-36";
	  	  icon.innerText = name;
	navdiv.appendChild(icon);
}


addIcons("view_module")
addIcons("notification_important")
addIcons("account_circle")
addIcons("more_vert")