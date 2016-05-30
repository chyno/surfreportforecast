"use strict";

var express = require('express');
var router = express.Router();
var http = require('requestify');
var docdbUtils = require('../lib/docdbUtils');
var R = require('ramda');



var erroLog = function(err)
{
     console.log(err);
}
/* GET users listing. */


 
router.get('/', function (req, res) {
    res.redirect('app/');
});


var forcastCalc = R.composeP(docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);
var renderParamRequest = R.curry((fun, req, res) => {
        
   
       if(!req.params.id)
        { throw ("no parameter");}
        
        
       // res.json({foo : 'bar'});
        
        fun(req.params.id).then((x) => {
            var result = docdbUtils.createVM({},x);
            res.json(result);  
        }, (err) => {
            res.status(500).send('Error' + err);
        });
        
         
     });


//router.get('/api/zip/:id', zipList.renderPossibleLocations.bind(zipList));
//router.get('/api/stateZips/:id', zipList.renderPossibleLocations.bind(zipList));

router.get('/api/zip/:id', renderParamRequest(forcastCalc));
//router.get('/api/stateZips/:id', renderParamRequest(docdbUtils.getStateLocations));

//Current User Items getUserLocations
////router.get('/api/userLocation/:id', userLocation.getUserLocations.bind(userLocation));
//router.post('/api/userLocation', userLocation.addUserLocation.bind(userLocation));
//router.delete('/api/userLocation/:id', userLocation.deleteUserLocation.bind(userLocation));

module.exports = router;