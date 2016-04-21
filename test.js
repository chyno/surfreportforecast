var R = require('ramda-maybe');
var M = require('ramda-fantasy').Maybe;


var config = require('./modules/db/config');
var SurfDao = require('./modules/db/SurfDao');
var getDbClient;
var docdbUtils = require('./docdbUtils');


var client = docdbUtils.getZips(config, '22207').then((zips) => {
    console.log(zips);
}).catch(reason => system.config(reason));





