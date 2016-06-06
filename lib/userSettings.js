
"use strict";
 var R = require('ramda');


var UserSettings = {
        
    byZip : R.groupBy(function(reading) {
        return  reading.zip;
    });
}

module.exports = UserSettings;