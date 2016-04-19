var R = require('ramda-maybe');
var M = require('ramda-fantasy').Maybe;
var ZipList = require('./pfmodules/ZipList');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./modules/db/config');
var SurfDao = require('./modules/db/SurfDao');
var getDbClient;



getDbClient = (cnf, zip) => {
    var docDb = new DocumentDBClient(cnf.host, {
        masterKey: cnf.authKey
    });

    return {
        client: docDb,
        zip: zip,
        databaseId: cnf.databaseId,
        collectionId: cnf.zipCollectionId

    }
};

//getOrCreateDatabase: function (client, databaseId, callback) {

getDatabase = (data) => {
    console.log('get ro creating database');
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: data.databaseId
        }]
    };

    data.client.queryDatabases(querySpec).toArray(function (err, results) {

        if (err) {
            callback(err);

        } else {
            if (results.length === 0) {
                var databaseSpec = {
                    id: databaseId
                };

                client.createDatabase(databaseSpec, function (err, created) {
                    callback(null, created);
                });

            } else {
                callback(null, results[0]);
            }
        }
    });
};


var fn = R.curry(getDbClient)(config);

var result = fn("22207");

var fn2 = (data) => {
    var client = data.client;
    var zip = data.zip;
    var databaseId = data.databaseId;
    var collectionId = data.collectionId;

    console.log('creating database');
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: databaseId
        }]
    };

    return new Promise((resolve, reject) => {
        console.log('in promise. arg passed in: ' + arg);

        client.queryDatabases(querySpec)
            .toArray(function (err, results) {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    resolve(results);
                    console.log(results);
                }
            });
    });
};

var res2 = dbPromise('bar').then((rs) => {
    console.log('in thepromise . argument: ' + rs);
});

//console.log(res2);

/*
 var prm = new Promise(
     (resolve) => {
         console.log('In Promise');         
         resolve({ foo: 'bar' });}
         ) .then(result => console.log(result));

*/

