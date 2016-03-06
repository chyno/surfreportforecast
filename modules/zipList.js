var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');
var Forcast = require('./forcastList');

function ZipList(zipDao) {
  this.zipDao = zipDao;
}

 
ZipList.prototype = {
    renderLocation: function (req, res) {
        var forcast = new Forcast();
        var item;
        var self = this;
        var id = req.params.id;
        var querySpec = {
            query: 'SELECT * FROM c WHERE c.zip = @zip',
            parameters: [{
                name: '@zip',
                value: id
            }]
        };
        
        
       //mongo db query
        self.zipDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            
          item = items[0];
          forcast.showForcast(item, function(forcast) {
                  forcast.city = item.city;
                  forcast.state = item.state;
                  res.json(forcast);
             });     
        });
    },
    
      renderPossibleLocations: function (req, res) {
        var self = this;
        
        if(!req.params.id)
        { throw ("no parameter");}
        
        var id = req.params.id.toUpperCase();
        
        var querySpec = {
            query: 'SELECT * FROM c where c.state = @state',
            parameters: [{
                name: '@state',
                value: id
            }]
            
        };
        
       //mongo db query
        self.zipDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
           res.json(items);     
        });
    },
};
module.exports = ZipList;
