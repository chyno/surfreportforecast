var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var api = require('./routes/api');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));
app.set('port', process.env.PORT || 9000);


app.use('/', api);

var debug = require('debug')('aurelia-node');


var server = app.listen(app.get('port'), function(err) {
    
  if (err)
    {
        console.log('Error: ' + err );
    }
  
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port: ' + server.address().port);
 });


module.exports = app;