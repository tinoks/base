document.getElementById("map").addEventListener("dragover", e => e.preventDefault(), false);

document.getElementById("map").addEventListener("dragleave", dropL, false);
document.getElementById("map").addEventListener("dragover", dropE, false);

function dropE(e) {		document.getElementById("map").style.opacity =  0.5;	}
function dropL(e) {		document.getElementById("map").style.opacity =  1;	}


document.getElementById("map").addEventListener("drop", function(e) {
	e.preventDefault()
	document.getElementById("map").style.opacity =  1;
	Array.from(e.dataTransfer.files).forEach(file => {
		let datatype=file.name.substr(file.name.lastIndexOf('.')+1).toLowerCase();
		import(/* webpackChunkName: datatype */ './fileHandlers/'+datatype)
							.then(module => { module.run(file.name,file) });
	});
});