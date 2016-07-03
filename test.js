'use strict'
var R = require('ramda');
var moment = require('moment');
var docdbUtils = require('./lib/docdbUtils');

 
 // var forcastCalc = R.composeP(createVMPromise, docdbUtils.showForcastByLongLat, R.head,  docdbUtils.getLatLongByZip);

 
docdbUtils.getLatLongByZip('22207').then (res => {
    var res2 = R.head(res);
    console.log(res2);
})

 