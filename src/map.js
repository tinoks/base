import mapboxgl from 'mapbox-gl';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

const mapdiv = document.createElement('div');
	  mapdiv.id = "map";
document.body.appendChild(mapdiv);

mapboxgl.accessToken = 'pk.eyJ1IjoidGlub2tzIiwiYSI6ImNqaWtrY3NkaTF4Y28zdm43eDByMWZjYTUifQ.1MdnI-NexWOVDdoDO9dnEw';
window.map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'https://free.tilehosting.com/styles/basic/style.json?key=qmiUgsEporZLdttoqWLA', // stylesheet location
    center: [11, 55.8], // starting position [lng, lat]
    zoom: 6 // starting zoom
});

document.getElementsByClassName("mapboxgl-ctrl-attrib")[0].remove()
document.getElementsByClassName("mapboxgl-ctrl-logo")[0].remove()

map.on('click',()=>{
	KORTxyz.func.closeList();
	KORTxyz.func.closeSidebar();
})