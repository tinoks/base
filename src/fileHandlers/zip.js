
window.shpjs = require('shpjs');


function run(name,file){

var reader = new FileReader();

  	reader.onloadend  = function(e){
       	shpjs(e.target.result)
       		.then(function(shape) {
       			KORTxyz.func.createLayer(shape.fileName,shape);
			}).catch(function(error) {
			  	console.log(error);
			});
    };

    reader.readAsArrayBuffer(file);

}

export { run };