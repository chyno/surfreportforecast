'use strict'
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


var createVMPromise = R.pipe(docdbUtils.createVM, (val) => Promise.resolve(val));
var forcastCalc = R.composeP(createVMPromise,docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);
var renderParamRequest = R.curry((fun, req, res) => {
        
   if(!req.params.id)
        { throw ("no parameter");}
        
         fun(req.params.id).then((x) => {
            var result = docdbUtils.createVM({},x);
            console.log(x);  
        });
  });

 
 
 var getStateZips = (state) => {
    
    return new Promise((resolve, reject) =>
    {
        resolve(
    [
        {zip: '11111111', 
        city: 'Honolulu' },
        {zip: '22222222', 
        city: 'Paeia' },
        {zip: '555555', 
        city: 'SPreksville' }
    ]);
    }    
    );
}

 

forcastCalc('22207').then(x => {
   
  console.log('VM: ' +x.city);  
} );

//var formatdate = cmoment("MMM Do YY");

//var a = cmoment('1462852800');

//router.get('/api/zip/:id', renderParamRequest(forcastCalc));
//renderParamRequest(forcastCalc, {params: {id: '22207'}}, fakeRes);
//console.log(getStateZips);
//getStateZips('1').then((res) => {console.log(res);});
  