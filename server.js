var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Beer = require('./models/beer');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://bl_user:qwerty123@ds037551.mongolab.com:37551/beerlocker');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  var router = express.Router();

  router.get('/', function(req, res) {
    res.json({
      'message': 'No beers'
    });
  });

  // Add new beer
  router.post('/beers', function(req, res) {

    var beer = new Beer();

    beer.name = req.body.name;
    beer.style = req.body.style;
    beer.brewer = req.body.brewer;
    beer.liked = req.body.liked;

    beer.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          'message': 'Added ' + beer._id + ' successfully',
          data: beer
        });
      }
    });
  });

  router.get('/beers', function(req, res) {
    Beer.find(function(err, beers) {
      if (err) {
        res.send(err);
      } else {
        res.json(beers);
      }
    });
  });

  router.get('/beers/:id', function(req, res) {
    Beer.findById(req.params.id, function(err, beer) {
      if (err) {
        res.send(err);
      } else {
        res.json(beer);
      }
    });
  });

  router.put('/beers/:id', function(req, res) {
    Beer.findById(req.params.id, function(err, beer) {
      if (err) {
        res.send(err);
      }

      if (req.body.name) beer.name = req.body.name;
      if (req.body.style) beer.style = req.body.style;
      if (req.body.brewer) beer.brewer = req.body.brewer;
      if (req.body.liked) beer.liked = req.body.liked;

      beer.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: 'Beer updated',
            data: beer
          });
        }
      });
    });
  });

  router.delete('/beers/:id', function(req, res) {
    Beer.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: 'Beer deleted'
        });
      }
    });
  });

  // Register all routes with /api
  app.use('/api', router);

  app.listen(3000);
});
