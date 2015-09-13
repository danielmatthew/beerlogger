// server.js

// modules ==============================================
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {

  // routes =============================================
  var apiRoutes = require('./routes')(app, express);
  app.use('/api', apiRoutes);

  // start app ==========================================
  app.listen(port);
});

exports = module.exports = app;
