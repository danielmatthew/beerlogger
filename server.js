// server.js

// modules ==============================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

// configuration ========================================
var db = require('./config');
var port = process.env.PORT || 3000;

var app = express();

// connect to db
mongoose.connect(db.url);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// use morgan to log requests to console
app.use(morgan('dev'));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {

  app.use(express.static(__dirname + '/src/public'));

  // routes =============================================
  var apiRoutes = require('./routes')(app, express);
  app.use('/api', apiRoutes);

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/public/views/index.html'));
  });
  // start app ==========================================
  app.listen(port);
});
