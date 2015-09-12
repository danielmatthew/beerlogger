var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');


var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    'message': 'No beers'
  });
});

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
  var beersRef = new firebase('https://beers-dm.firebaseio.com/beers');

  var newBeerRef = beersRef.push();
  newBeerRef.set({
    name: req.body.name,
    style: req.body.style
  }, function(error) {
    if (error) {
      res.send(err);
    } else {
      res.json({
        'message': 'Saved successfully: ' + newBeerRef.key()
      });
    }
  });
});

beersRoute.get(function(req, res) {
  var beersRef = new firebase('https://beers-dm.firebaseio.com/beers');

  beersRef.once('value', function(snapshot) {
    res.json(snapshot.val());
  }, function(errorObject) {
    res.send(errorObject);
  });
});

var beer = router.route('/beers/:id');
beer.get(function(req, res) {
  var beersRef = new firebase('https://beers-dm.firebaseio.com/beers/'+req.params.id);

  beersRef.once('value', function(snapshot) {
    res.json(snapshot.val());
  }, function(errorObject) {
    res.send(errorObject);
  });
});

beer.put(function(req, res) {
  var beersRef = new firebase('https://beers-dm.firebaseio.com/beers/'+req.params.id);

  // Get beer
  beersRef.once('value', function(snapshot) {
    res.json(snapshot.val());
  }, function(errorObject) {
    res.send(errorObject);
  });

  beersRef.set({
    name: req.body.name,
    style: req.body.style
  });
});

beer.delete(function(req, res) {
  var beersRef = new firebase('https://beers-dm.firebaseio.com/beers/'+req.params.id);
});

app.use('/api', router);

app.listen(port);
console.log('Beers on port ' + port);
