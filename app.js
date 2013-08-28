
/**
 * Module dependencies.
 */
express = require('express');

querystring = require('querystring');
http = require('http');
path = require('path');
utils = require('util');

app = express();
appDir = __dirname;
// all environments
app.set('port', process.env.PORT || 1337);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.multipart());

app.use(express.bodyParser({
    uploadDir: "public/rte/uploads",
    keepExtensions: true,
    limit: 10000000, /* 10M  10*1000*1000 */
    defer: false
}));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


require('./public/rte/server')



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
