
"use strict";


//var M = require('ramda-fantasy').Maybe;
var R = require('ramda');
var http = require('requestify');
var key = "0f9877d63b94697f985124d9cbb9c6cb";
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./modules/db/config');

var currentlyPath = R.lensPath(['currently']);
var forecastPath = R.lensPath(['daily', 'data']);


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
               // console.log(err);
                reject(err);

            } else {
                let result = results[0];
                resolve(result);
            }
        });
    });
};

function rejectWithLog(reason, fn) {
    //console.error('An error occurred', reason);
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
                value: zip
            }]
        };

        var client = getDbClient(config);
        return new Promise((resolve, reject) => {
            getConfiguredCollectionAsync(client, config).then((collection) => {
                client.queryDocuments(collection._self, querySpec).toArray(function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        let result = results[0];
                        resolve(result);
                    }
                });
            }).catch(reason => rejectWithLog(reason, reject));
        });
    },

    showForcastList(location) {

        var lat = location.latitude;
        var long = location.longitude;
        var path = "/forecast/" + key + "/" + lat + "," + long;
        var host = 'https://api.forecast.io';
        var fullpath = host + path;

        return new Promise((resolve, reject) => {
            http.get(host + path).then((response) => {
                let rspBody = response.getBody();
                rspBody.city = location.city;
                rspBody.state = location.state;


                resolve(rspBody);
            }, (reason) => {
               // console.log('rejecting ....');
                reject(reason);
            });
        });
    },
    
    createVM :
    R.curry((vm, d) => {
        vm.city = d.city;
        vm.state =d.state;
        vm.forecast = R.view(forecastPath, d);
        vm.currently = R.view(currentlyPath, d);
        return vm;
    }),
    
    rejectWithLog: rejectWithLog

};

module.exports = DocDBUtils;
