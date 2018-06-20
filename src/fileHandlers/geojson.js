
function run(name,file){
  var reader = new FileReader();
      reader.onloadend  = function(e){
		const worker = new Worker('./workers/jsonworker.js');
		worker.postMessage(e.target.result); 
		worker.onmessage = function(e) {
		  KORTxyz.func.createLayer(name,e.data)
		}
      };

    reader.readAsText(file)
}

export { run };

