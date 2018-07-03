import './styles/progress.css';

var progress = document.createElement('div');
	progress.setAttribute("id","progress");

document.body.appendChild(progress);

var progress2 = document.createElement('div');
	progress2.setAttribute("id","progress2");

document.body.appendChild(progress2);


window.currentProgress=0;
window.maxProgress=0;

window.setProgress = (e) => {
	document.getElementById("progress").setAttribute("style", "width:"+e+"%")
	document.getElementById("progress2").setAttribute("style", "width:"+e+"%")
}

	map.on("dataloading", function(e){
	    currentProgress++;
	    maxProgress++;
	})

	map.on("data", function(e){
		if(e.dataType == "source" && e.sourceDataType != "metadata"){
	    	currentProgress--
	    };
	    if(e.isSourceLoaded){
	    	currentProgress=0;
	    	maxProgress=0;
	    }
		setProgress((currentProgress/maxProgress)*50)
	})


	map.on("error", function(e){
	    if(e.dataType=="source" && e.sourceDataType != "metadata"){ 
	    	currentProgress--
	    };
	    if(e.isSourceLoaded){
	    	currentProgress=0;
	    	maxProgress=0;
	    }
		setProgress((currentProgress/maxProgress)*50)

	})		


