function run(name,file){


window.EasyFit = require('easy-fit');


  var easyFit = new EasyFit.default({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    temperatureUnit: 'celcius',
    elapsedRecordField: true,
    mode: 'cascade'
  });


  function addSession(data){
     var pos = [];
      data.sessions[0].laps[0].records.forEach((e)=> {
          e.speed = e.speed*3.6;
          if(Math.abs(e.position_long)<90 && Math.abs(e.position_lat)<90){
            pos.push({
              'type': 'Feature',
              'properties': e,
              'geometry': {
                'type': 'Point',
                'coordinates':[e.position_long,e.position_lat]
              }
            });           
          }


          }
        );

      KORTxyz.func.createLayer(name,{
        "type": "FeatureCollection",
        "features": pos
      });
  
}


  var reader = new FileReader();
      reader.onloadend = function(result) {
        easyFit.parse(result.srcElement.result, function (error, data) {
          addSession(data.activity);
        });
      };
      reader.readAsArrayBuffer(file);
}

export { run };


 


  

