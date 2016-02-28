var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function ZipList(taskDao) {
  this.taskDao = taskDao;
}


ZipList.prototype = {
    showZip: function (req, res) {
        var self = this;
        var id = req.params.id;
        var querySpec = {
            query: 'SELECT * FROM c WHERE c.zip = @zip',
            parameters: [{
                name: '@zip',
                value: id
            }]
        };

        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
          res.json(items);  
           // res.render('index', {
            //    title: 'My ToDo List ',
            //    tasks: items
           // });
        });
    },

    addZip: function (req, res) {
        var self = this;
        var item = req.body;

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

     
};
module.exports = ZipList;
