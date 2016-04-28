var express = require('express');
var router = express.Router();
var http = require('requestify');
var docdbUtils = require('../docdbUtils');
var R = require('ramda');
var ZipList = require('../modules/zipList');
var UserLocations = require('../modules/userLocations');
var SurfDao = require('../modules/db/SurfDao');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../modules/db/config');
var zipDao, userDao, zipList, userLocation ;


var erroLog = function(err)
{
     console.log(err);
}
/* GET users listing. */
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

zipDao = new SurfDao(docDbClient, config.databaseId, config.zipCollectionId);
zipDao.init(erroLog);
zipList = new ZipList(zipDao);

userDao = new SurfDao(docDbClient, config.databaseId, config.userCollectionId);
userDao.init(erroLog);
userLocation = new UserLocations(userDao);

 
router.get('/', function (req, res) {
    res.redirect('app/');
});


var forcastCalc = R.composeP(docdbUtils.showForcastList, docdbUtils.getZips);
 
 var renderPossibleLocations = function (req, res) {
        var self = this;
        
        if(!req.params.id)
        { throw ("no parameter");}
        
        forcastCalc(req.params.id).then((x) => {
        var result = docdbUtils.createVM({},x);
        res.json(result); 
 });
 };  


//router.get('/api/zip/:id', zipList.renderPossibleLocations.bind(zipList));
//router.get('/api/stateZips/:id', zipList.renderPossibleLocations.bind(zipList));

router.get('/api/zip/:id', zipList.renderLocation.bind(zipList));
router.get('/api/stateZips/:id', zipList.renderPossibleLocations.bind(zipList));

//Current User Items getUserLocations
router.get('/api/userLocation/:id', userLocation.getUserLocations.bind(userLocation));
router.post('/api/userLocation', userLocation.addUserLocation.bind(userLocation));
router.delete('/api/userLocation/:id', userLocation.deleteUserLocation.bind(userLocation));

module.exports = router;