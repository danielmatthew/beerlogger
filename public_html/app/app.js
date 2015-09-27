angular.module('beerApp', ['ngRoute', 'beers.controllers'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/beers.html',
      })
      .when('/:_id', {
        templateUrl: 'app/views/editBeer.html'
      });

    $locationProvider.html5Mode(true);
  });

angular.module('beers.controllers', ['beers.services'])
  .controller('BeerController', function($scope, Beer) {
    $scope.numBeers = null;
    $scope.beers = {};
    $scope.formData = {};

    Beer.all().success(function(data) {
      $scope.beers = data;
      $scope.numBeers = Object.keys($scope.beers).length;
    });

    $scope.addBeer = function() {
      if ($scope.formData) {
        Beer.add($scope.formData)
          .success(function(data) {
            $scope.numBeers++;
            $scope.message = data.message;
            $scope.beers.push(data.data);
            $scope.formData = {};
          });
      }
    };

    $scope.deleteBeer = function(id) {
      Beer.delete(id)
        .success(function(data) {
          Beer.all()
            .success(function(data) {
              $scope.beers = data;
              $scope.message = data.message;
              $scope.numBeers--;
            });
        });
    };
  })

  .controller('EditBeerController', function($scope, $routeParams, Beer) {
    $scope.beer = null;

    Beer.get($routeParams._id)
      .success(function(data) {
        $scope.beer = data;
      });

    $scope.updateBeer = function() {
      Beer.put($routeParams._id, $scope.beer)
        .success(function(data) {
          $scope.message = data.message;
        });
    };

    // $scope.updateBeer = function($routeParams._id, $scope.beer) {
    //   .success(function(data) {
    //     $scope.message = data.message;
    //   });
    // };
  });

angular.module('beers.services', [])
  .factory('Beer', function($http) {
    var o = {};

    o.all = function() {
      return $http.get('/api/beers');
    };

    o.add = function(data) {
      return $http.post('/api/beers', data);
    };

    o.get = function(id) {
      return $http.get('/api/beers/' + id);
    };

    o.put = function(id, data) {
      return $http.put('/api/beers/' + id, data);
    };

    o.delete = function(id) {
      return $http.delete('/api/beers/' + id);
    };

    return o;
  });
