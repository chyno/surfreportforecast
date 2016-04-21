//var R = require('ramda-maybe');
//var M = require('ramda-fantasy').Maybe;
var config = require('./modules/db/config');
var docdbUtils = require('./docdbUtils');
var http = require('requestify');
var key = "0f9877d63b94697f985124d9cbb9c6cb";

function showForcastList(location) {
   var lat = location.latitude;
    var long = location.longitude;
    var path = "/forecast/" + key + "/" + lat + "," + long;
    var host = 'https://api.forecast.io';
    
    return new Promise((resolve, reject) => { 
        
        http.get(host + path).then((response) => {
             resolve(response.getBody()); 
          }, (reason) => {
             reject(reason); 
          });
          
          
    });
        
}

 

var client = docdbUtils.getZips(config, '22207').then((zips) => {
    showForcastList(zips).then((forcast) =>{
        console.log(forcast);
    }, (reason) =>{
        console.log(reason);
    });
}).catch(reason => system.config(reason));





