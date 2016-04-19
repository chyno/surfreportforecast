var DocumentDBClient = require('documentdb').DocumentClient;

function ZipList(zipDao) {
  this.zipDao = zipDao;
}

 
ZipList.prototype = {
    renderLocationByZip: function (zip) {
       
        var item;
        var self = this;
         
        var querySpec = {
            query: 'SELECT * FROM c WHERE c.zip = @zip',
            parameters: [{
                name: '@zip',
                value: zip
            }]
        };
        
        
       //mongo db query
       return  self.zipDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            return items[0];
        });
    },
    
    
};
module.exports = ZipList;
