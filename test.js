var R = require('ramda');
//var M = require('ramda-fantasy').Maybe;
var frc = require("./app/test/fake/forecast.js");
var config = require('./modules/db/config');
var docdbUtils = require('./docdbUtils');
var http = require('requestify');
var key = "0f9877d63b94697f985124d9cbb9c6cb";


function showForcastList(location) {
   
   var lat = location.latitude;
    var long = location.longitude;
    var path = "/forecast/" + key + "/" + lat + "," + long;
    var host = 'https://api.forecast.io';
     var fullpath = host + path;
     
    return new Promise((resolve, reject) => { 
        
        http.get(host + path).then((response) => {
            var rspBody = response.getBody();
            //console.log(rspBody);
             resolve(rspBody); 
          }, (reason) => {
                console.log('rejecting ..');
             reject(reason); 
          });
          
          
    });
        
} 

/*
var client = docdbUtils.getZips(config, '22207').then((zips) => {
    showForcastList(zips[0]).then((forcast) =>{
        console.log(forcast);
    }, (reason) =>{
        console.log(reason);
    });
}).catch(reason => system.config(reason));
*/




var currentlyPath = R.lensPath(['currently']);
var forecastPath = R.lensPath(['daily', 'data']);
//var vm = {currently : '', forecast: ''};
var data = frc.getSample();
var createVM = R.curry( (vm,d) =>
{
    vm.forecast = R.view(forecastPath, d);
     vm.currently = R.view(currentlyPath, d);
    return vm;
}
);

var ans = R.composeP(showForcastList, docdbUtils.getZips);
 

 ans('22207').then((x) => {
     var result = createVM({},x);
     console.log(result);
     
 });
 
/*
ans("22207").then((loc) => {
    var vm = createVM({},loc);
    console.log( vm.toString());
});
*/

//var rv = R.view(dailyPath);

//console.log(createVM({},data));
//console.log(R.view(currentlyPath,data));
