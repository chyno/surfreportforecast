var R = require('ramda-maybe');
var M = require('ramda-fantasy').Maybe;


var config = require('./modules/db/config');
var SurfDao = require('./modules/db/SurfDao');
var getDbClient;
var docdbUtils = require('./docdbUtils');


var client = docdbUtils.getDbClient(config);

docdbUtils.getDatabaseAsync(client, config).then((db) => 
{
  docdbUtils.getCollection(client, db._self, config.userCollectionId).then((collection) => {
     console.log(collection); 
  });    
});



