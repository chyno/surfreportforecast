"use strict";

var express = require('express');
var router = express.Router();
//var http = require('requestify');
var docdbUtils = require('../lib/docdbUtils');
var R = require('ramda');
var userSettings = require('../lib/userSettings');
var userLocations = require('../lib/userLocations');

var erroLog = function(err)
{
     console.log(err);
}
/* GET users listing. */


 
router.get('/', function (req, res) {
    res.redirect('app/');
});

var createVMPromise = R.pipe(docdbUtils.createVM, (val) => Promise.resolve(val));
var forcastCalc = R.composeP(createVMPromise, docdbUtils.showForcastByLongLat, R.head,  docdbUtils.getLatLongByZip);
var groupStateZip = R.composeP(userSettings.makecityArray, userSettings.groupByZip,docdbUtils.getStateLocations);

var renderParamRequest = R.curry((fun, req, res) => {

  if(!req.params.id)
        { throw ("no parameter");}
        
        fun(req.params.id).then((x) => {
             res.json(x);  
        }, (err) => {
            res.status(500).send('Error' + err);
        });
});

var renderRequest = R.curry((fun, req, res) => {
  fun().then((x) => {
             res.json(x);  
        }, (err) => {
            res.status(500).send('Error' + err);
        });
});

var handlePost = R.curry((fun, req, res) => {
    var body = req.body;
  fun(body).then((x) => {
             res.json(x);  
        }, (err) => {
            res.status(500).send('Error' + err);
        });
});

router.get('/api/states', renderRequest(userSettings.getStates));
router.get('/api/stateZips/:id', renderParamRequest(groupStateZip));
router.get('/api/zip/:id', renderParamRequest(forcastCalc));

router.get('/api/userLocation/:id', renderParamRequest(userLocations.getUserLocations));
router.post('/api/userLocation', handlePost(userLocations.addUserLocation));
router.delete('/api/userLocation/:id', userLocations.deleteUserLocation.bind(userLocations));

module.exports = router;