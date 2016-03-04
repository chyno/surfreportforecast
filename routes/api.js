var express = require('express');
var http = require('requestify');
var router = express.Router();
var ZipList = require('../modules/zipList');
var ZipDao = require('../modules/db/zipDao');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('../modules/db/config');


/* GET users listing. */
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var zipDao = new ZipDao(docDbClient, config.databaseId, config.collectionId);
zipDao.init();
var zipList = new ZipList(zipDao);

router.get('/api/demo', function (req, res) {
    res.json({ msg: 'From the Node-Backend' });
});

router.get('/', function (req, res) {
    res.redirect('app/');
});


/* GET welcome view */
router.get('/views/welcome', function (req, res) {
    res.render('welcome', { nodePort: require('../app').get('port') });
});

router.get('/api/zip/:id', zipList.renderLocation.bind(zipList));
module.exports = router;