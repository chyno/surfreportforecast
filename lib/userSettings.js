
"use strict";
 var R = require('ramda');
var data = require('./data');

var UserSettings = {
        
    byZip : R.groupBy(function(reading) {
       return  reading.zip;
    }),
    
    getGroupZipAsync(data) {
        return  new Promise( (resolve) => {
            resolve(byZip(data));
        });
    },
    
    getStates() {
      return  new Promise( (resolve) => { resolve(data.getStates()) });
    }
}

module.exports = UserSettings;