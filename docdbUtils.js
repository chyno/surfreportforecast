
var DocumentDBClient = require('documentdb').DocumentClient;

function getDbClient(cnf) {
    return new DocumentDBClient(cnf.host, {
        masterKey: cnf.authKey
    });
};


function getDatabaseAsync(dbClient, config) {
    var databaseId = config.databaseId;
    console.log('creating database');
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: databaseId
        }]
    };

    return new Promise((resolve, reject) => {
        dbClient.queryDatabases(querySpec)
            .toArray(function (err, results) {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    resolve(results[0]);
                }
            });
    });
};


function getCollection(dbClient, databaseLink, collectionId) {
    //client, databaseLink, collectionId, callback
    var col;
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: collectionId
        }]
    };
    return new Promise((resolve, reject) => {
        dbClient.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                console.log(err);
                reject(err);

            } else {
                col = results[0];
                resolve(col);
            }
        });
    });
};

var DocDBUtils = {
    getConfiguredCollectionAsync: (config) => {
        var client = getDbClient(config);
        return new Promise((resolve, reject) => {
             getDatabaseAsync(client, config).then((db) => {
                getCollection(client, db._self, config.userCollectionId).then((collection) => {
                    resolve(collection);
                });
            });
        });



    }
};


module.exports = DocDBUtils;
