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

var createVMPromise = R.pipe(docdbUtils.createVM, (val) => Promise.resolve(val));
var forcastCalc = R.composeP(createVMPromise,docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);
//var forcastCalc = R.composeP(docdbUtils.showForcastByLongLat, docdbUtils.getLatLongByZip);

var getStateZips =  (state) => Promise.resolve(
    [
        {zip: '11111111', 
        city: 'Honolulu' },
        {zip: '22222222', 
        city: 'Paeia' },
        {zip: '555555', 
        city: 'SPreksville' }
    ]);


var renderParamRequest = R.curry((fun, req, res) => {

  if(!req.params.id)
        { throw ("no parameter");}
        
        fun(req.params.id).then((x) => {
             res.json(x);  
        }, (err) => {
            res.status(500).send('Error' + err);
        });
});



router.get('/api/stateZips/:id', renderParamRequest(getStateZips));

router.get('/api/zip/:id', renderParamRequest(forcastCalc));


module.exports = router;