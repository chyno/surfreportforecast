"use strict";

var http = require('requestify');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');


function getDbClient(cnf) {
    return new DocumentDBClient(cnf.host, {
        masterKey: cnf.authKey
    });
};

function getDatabaseAsync(dbClient) {
    var databaseId = config.databaseId;
      console.log('creating database: Id: ' + config.databaseId);
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
                     console.log('**** erro creating db: ' + err.toString() + '*******************');
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
               // console.log(err);
                reject(err);

            } else {
                let result = results;
                resolve(result);
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
                console.log('collection: ' + collection[0].toString());
                resolve(collection[0]);
            }).catch(reason => rejectWithLog('Get collection errror.... :' + reason, reject));
        }).catch(reason => rejectWithLog('Getingt Database Error.... : ' + reason, reject));
    });
};



var database = {
    
    runDbQueryAsync(querySpec) {
        
        
        var client = getDbClient(config);

        return new Promise((resolve, reject) => {
                getConfiguredCollectionAsync(client, config).then((collection) => {
                    client.queryDocuments(collection._self, querySpec).toArray(function (err, results) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            
                            let result = results;
                            resolve(result);
                        }
                    });
                }).catch(reason => rejectWithLog('In database ... : '+ reason, reject));
        });
        
     }
         
}

module.exports = database;