var http = require('requestify');

function ForcastList() {
  this.key = "0f9877d63b94697f985124d9cbb9c6cb";
}

ForcastList.prototype = {
    showForcast: function (item, cb) {
     //Need to set long and lat from the items object
   var lat = item.latitude;
    var long = item.longitude;
    var path = "/forecast/" + this.key + "/" + lat + "," + long;
    var host = 'https://api.forecast.io';

    http.get(host + path).then(function (response) {
        cb(response.getBody());    
    });
    }
}

module.exports = ForcastList;

/*
{
  "zip": "00210",
  "city": "Portsmouth",
  "state": "NH",
  "latitude": "43.005895",
  "longitude": "-71.013202",
  "timezone": "-5",
  "dst": "1",
  "id": "5d3431d3-ea85-cc49-7c65-6ac9d2e29c5a"
}
*/