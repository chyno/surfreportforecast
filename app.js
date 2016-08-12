var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var api = require('./routes/api');
var app = express();
var webpackMiddleware;
var webpack;
var wpconfig;

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

/*
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));
}
*/

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/dist')));
app.set('port', process.env.PORT || 9000);


app.use('/', api);

var debug = require('debug')('aurelia-node');

/*

if ( app.get('env') === 'development')
{
   webpackMiddleware = require('webpack-dev-middleware');
   webpack = require('webpack');
   wpconfig = require('./app/webpack.config');
   app.use(webpackMiddleware(webpack(wpconfig), {
      publicPath: "/build",
      headers: {"X-Custom_Webpack_Header": "yes" },
      stats : { colors: true }
   }
   ));

}

*/

var server = app.listen(app.get('port'), 
function (err) {

  if (err) {
    console.log('Error: ' + err);
  }
   debug('Express server listening on port ' + server.address().port);
   console.log('Express server listening on port: ' + server.address().port);
});


module.exports = app;