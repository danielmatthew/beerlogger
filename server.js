// server.js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// modules ==============================================
import express, { static } from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import { connect, connection } from 'mongoose';
import { join } from 'path';

// configuration ========================================
import db, { url, on, once } from './config';
var port = process.env.PORT || 3000;

var app = express();

// parse application/json
app.use(json());

// parse application/x-www-form-urlencoded
app.use(urlencoded({
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
connect(url);
var db = connection;
on('error', console.error.bind(console, 'Connection error:'));
once('open', function() {

  if (app.get('env') === 'development') {
    app.use(static(__dirname + '/src'));
  }

  if (app.get('env') === 'production') {
    app.use(static(__dirname + '/dist'));
  }

  // routes =============================================
  var apiRoutes = require('./routes')(app, express);
  app.use('/api', apiRoutes);

  app.get('*', function(req, res) {
    res.sendFile(join(__dirname + '/src/app/views/index.html'));
  });

  // start app ==========================================
  app.listen(port);
});
