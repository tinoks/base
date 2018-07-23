function run(name,file){

var reader = new FileReader();

    reader.onloadend  = function(e){
    	const togeojson = require('@mapbox/togeojson');
        var dom = (new DOMParser()).parseFromString(e.target.result, 'text/xml');
		let data = togeojson.gpx( dom );
		KORTxyz.func.createLayer(name, data);
    };

    reader.readAsText(file)


}

export { run };