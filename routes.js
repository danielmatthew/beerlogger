// routes.js
var Beer = require('./models/beer');

module.exports = function(app, express) {
  // server routes ========================================
  var router = express.Router();

  router.get('/', function(req, res) {
    res.json({
      'message': 'No beers'
    });
  });

  router.route('/beers')
    .post(function(req, res) {

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
    })
    .get(function(req, res) {
      Beer.find(function(err, beers) {
        if (err) {
          res.send(err);
        } else {
          res.json(beers);
        }
      });
    });

  router.route('/beers/:id')
    .get(function(req, res) {
      Beer.findById(req.params.id, function(err, beer) {
        if (err) {
          res.send(err);
        } else {
          res.json(beer);
        }
      });
    })
    .put(function(req, res) {
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
    })
    .delete(function(req, res) {
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


  // frontend routes =====================================
  router.route('*')
    .get(function(req, res) {
      res.text('lol');
    });

  return router;
};
