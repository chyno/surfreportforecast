var express = require('express');
var http = require('requestify');
var router = express.Router();
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var TaskList = require('./zipList');
var ZipDao = require('./zipDao');
var key = "0f9877d63b94697f985124d9cbb9c6cb";
var lat = "38";
var long = "-77";

/* GET users listing. */
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var zipDao = new ZipDao(docDbClient, config.databaseId, config.collectionId);
var zipList = new TaskList(zipDao);
zipDao.init();

router.get('/api/demo', function(req, res) {
  res.json({ msg: 'From the Node-Backend'});
});

router.get('/', function(req, res) {
  res.redirect('app/');
});



/* GET welcome view */
router.get('/views/welcome', function(req, res) {
  res.render('welcome', {nodePort: require('../app').get('port')});
});

router.get('/api/zip/:id', zipList.showZip.bind(zipList));


router.get('/api/forecast', function(req, res) {
   var path = "/forecast/" + key + "/" + lat + "," + long;
   var  host ='https://api.forecast.io';
     
   http.get(host + path).then(function(response) {
       res.json(response.getBody());
   });
   
});
module.exports = router;