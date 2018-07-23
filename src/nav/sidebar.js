import './sidebar.css';

let sideDiv = document.createElement('div');
	sideDiv.className = "sidebar";

	document.body.appendChild(sideDiv);


let openSidebar = (e) => {
	if(e !== undefined || !document.getElementById('listDiv').classList.contains("show")){
		document.getElementById('listDiv').classList.toggle("show")
		document.getElementsByClassName('left')[0].classList.toggle("active")
	}
};
KORTxyz.func.openSidebar = openSidebar;


let closeSidebar = () => {
	if(document.getElementsByClassName('sidebar')[0].classList.contains("show")){
		document.getElementsByClassName('sidebar')[0].classList.toggle("show")
		
	}
};
KORTxyz.func.closeSidebar =closeSidebar;

	
