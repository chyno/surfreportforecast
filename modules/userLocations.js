var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');


function UserLocations(userDao) {
    this.userDao = userDao;
}


UserLocations.prototype = {
    getUserLocations: function (req, res) {

        var self = this;
        var username = req.params.id;
        var querySpec = {
            query: 'SELECT * FROM c WHERE c.username = @username',
            parameters: [{
                name: '@username',
                value: username
            }]
        };
        
        
        //mongo db query
        self.userDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            if (!items || items.length < 1) {
                res.send('No Itesm for user');

            }
            else {
                //res.send(items.length);
                res.json(items[0]);
            }

        });
    },

    addUserLocation: function (req, res) {
       
    },

    deleteUserLocation: function (req, res) {
    }
}

module.exports = UserLocations;