
const mapdiv = document.getElementById("map");

const navdiv = document.createElement('div');
	  navdiv.id = "nav";
	  mapdiv.appendChild(navdiv);
const aside = document.createElement('aside');
document.body.appendChild(aside);

function addIcons(name,func){
	const icon = document.createElement('i');
	  	  icon.className = "material-icons md-36";
	  	  icon.innerText = name;
	  	  icon.id = name;
	  	  if(!!func){
		  	  icon.addEventListener("click", func);  	  	
	  	  }
	navdiv.appendChild(icon);
}

addIcons("view_module")
addIcons("notification_important")
addIcons("account_circle")
addIcons("more_vert",toggleAside)

document.getElementById("more_vert").style.height = "100vh";



function toggleAside(){
	if(aside.style.width.slice(0, -2)*1 > 0){
		aside.style.width = "0"
	}else{
		aside.style.width = "400px"
	}
}




const startEvent = !window.ontouchstart? 'mousedown': 'touchstart';
let startTime = 0;
let startX = 0;
	aside.addEventListener(startEvent, function(event) {
		    startX = event.screenX;
		    startTime = event.timeStamp;
		}, false);

const endEvent = !window.ontouchend? 'mouseup': 'touchend';
let endTime = 0;
let endX = 0;
	aside.addEventListener(endEvent, function(event) {
	    endX = event.screenX;
	    endTime = event.timeStamp;
	    handleGesture();
	}, false); 


function handleGesture() {
    if (endTime-startTime<600 && endX-startX>10 ) {
        toggleAside();
    }
}