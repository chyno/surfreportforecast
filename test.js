var R = require('ramda');
var moment = require('moment');
//var M = require('ramda-fantasy').Maybe;

var docdbUtils = require('./lib/docdbUtils');

var fakeRes = {
    json(vm)
    {
       // var result = vm.forecast;
        //console.log(vm.forecast[0]);//result.daily.data[0].toString());
        console.log(vm.forecast[0]);
    }
}


var forcastCalc = R.composeP(docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);
var renderParamRequest = R.curry((fun, req, res) => {
        
   if(!req.params.id)
        { throw ("no parameter");}
        
         fun(req.params.id).then((x) => {
             
            var result = docdbUtils.createVM({},x);
            res.json(result);  
        });
        
         
     });

 
 
//var formatdate = cmoment("MMM Do YY");

//var a = cmoment('1462852800');

//router.get('/api/zip/:id', renderParamRequest(forcastCalc));
renderParamRequest(forcastCalc, {params: {id: '22207'}}, fakeRes);
  //docdbUtils.getLatLongByZip('22207');