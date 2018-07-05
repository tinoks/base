import './navDivs.css'
const mapDiv = document.getElementById('map');

let navRight = document.createElement('div');
	navRight.className = "nav right";
	mapDiv.appendChild(navRight);

let navLeft = document.createElement('div');
	navLeft.className = "nav left";
	mapDiv.appendChild(navLeft);
