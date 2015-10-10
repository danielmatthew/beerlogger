// server.js

// modules ==============================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compression = require('compression');
var mongoose = require('mongoose');
var path = require('path');

// configuration ========================================
var db = require('./config');
var port = process.env.PORT || 3000;

var app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// gzip requests that pass through middleware
app.use(compression());

// use morgan to log requests to console
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,\Authorization');
  next();
});

// connect to db
mongoose.connect(db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {

  app.use(express.static(__dirname + '/public_html'));

  // routes =============================================
  var apiRoutes = require('./routes')(app, express);
  app.use('/api', apiRoutes);

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public_html/app/views/index.html'));
  });

  // start app ==========================================
  app.listen(port);
});
