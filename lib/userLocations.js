
"use strict";
 var R = require('ramda');
var data = require('./data');
var database = require('./database');
var config = require('./config');
var UserLocations = {
        
     /*
  router.get('/api/userLocation/:id', userLocation.getUserLocations.bind(userLocation));
router.post('/api/userLocation', userLocation.addUserLocation.bind(userLocation));
router.delete('/api/userLocation/:id', userLocation.deleteUserLocation.bind(userLocation));
  */
  getUserLocations (user) {
       console.log('user is:', user);
   var querySpec = {
            query: 'SELECT * FROM c WHERE c.user = @user',
            parameters: [{
                name: '@user',
                value: user
            }]
        };
         
         
         return database.runDbQueryAsync(querySpec, config.userCollectionId);
  },

   addUserLocation (location) {
         return database.insertDocument(location, config.userCollectionId);
  },


  deleteUserLocation() {}
}

module.exports = UserLocations;