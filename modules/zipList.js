var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');
var Forcast = require('./forcastList');

function ZipList(taskDao) {
  this.taskDao = taskDao;
}

 
ZipList.prototype = {
    renderLocation: function (req, res) {
        var self = this;
        var id = req.params.id;
        var querySpec = {
            query: 'SELECT * FROM c WHERE c.zip = @zip',
            parameters: [{
                name: '@zip',
                value: id
            }]
        };
        
        var forcast = new Forcast();

       //mongo db query
        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            //res.json(items[0]);
          //Render the forcast call 
          forcast.showForcast(items[0], function(forcast) {
                  res.json(forcast);
             });
             
           
        });
    },
 

     
};
module.exports = ZipList;
