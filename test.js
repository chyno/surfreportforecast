var R = require('ramda');
//var M = require('ramda-fantasy').Maybe;

var docdbUtils = require('./lib/docdbUtils');

var fakeRes = {
    json(result)
    {
        console.log(result)
    }
}


var forcastCalc = R.composeP(docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);
var renderParamRequest = R.curry((fun, req, res) => {
        
   
       if(!req.params.id)
        { throw ("no parameter");}
        
        console.log(fun.toString());
       // res.json({foo : 'bar'});
        
        fun(req.params.id).then((x) => {
            console.log('x is: ' +x);
            var result = docdbUtils.createVM({},x);
            res.json(result);  
        });
        
         
     });



//router.get('/api/zip/:id', renderParamRequest(forcastCalc));
// renderParamRequest(forcastCalc, {params: {id: '22207'}}, fakeRes);
docdbUtils.getLatLongByZip('22207').then( (res) => {
     console.log(res);
}, (err) => {
     console.log(err);
});