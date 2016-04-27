
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./modules/db/config');

function getDbClient(cnf) {
    return new DocumentDBClient(cnf.host, {
        masterKey: cnf.authKey
    });
};


function getDatabaseAsync(dbClient) {
    var databaseId = config.databaseId;
  //  console.log('creating database');
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


function getCollectionAsync(dbClient, databaseLink, collectionId) {
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

function rejectWithLog(reason, fn) {
    console.error('An error occurred', reason);
    fn(reason); 
}

function getConfiguredCollectionAsync(client, config) {
    
    return new Promise((resolve, reject) => {
        getDatabaseAsync(client, config).then((db) => {
            getCollectionAsync(client, db._self, config.zipCollectionId).then((collection) => {
                resolve(collection);
            }).catch(reason => rejectWithLog(reason, reject));
        }).catch(reason => rejectWithLog(reason, reject));
    });
};

var DocDBUtils = {
    getZips(zip) {
      var querySpec = {
            query: 'SELECT * FROM c WHERE c.zip = @zip',
            parameters: [{
                name: '@zip',
                value: '22207'
            }]
        };
        
        var client = getDbClient(config);
        return new Promise((resolve, reject) => {
            getConfiguredCollectionAsync(client, config).then((collection) => {
                client.queryDocuments(collection._self, querySpec).toArray(function (err, results) {
                    if (err) {
                        reject(err);
                     } else {
                        resolve(results[0]);
                    }
                });
            }).catch(reason => rejectWithLog(reason, reject));
        });
    },
    
    rejectWithLog : rejectWithLog

};

module.exports = DocDBUtils;
