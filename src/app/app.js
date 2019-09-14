angular.module('beerApp', ['ngRoute', 'beers.controllers', 'angularMoment'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/beers.html',
      })
      .when('/:_id', {
        templateUrl: 'app/views/editBeer.html'
      });

    $locationProvider.html5Mode(true);
  }]);

angular.module('beers.controllers', ['beers.services', 'ui.bootstrap'])
  .controller('BeerController', ['$scope', 'Beer', function($scope, Beer) {
    $scope.totalItems = null;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;

    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to:' + $scope.currentPage);
    };

    $scope.numBeers = null;
    $scope.beers = {};
    $scope.formData = {};

    Beer.all().success(function(data) {
      $scope.beers = data;

      $scope.$watch('currentPage + itemsPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;

        $scope.paginatedBeers = $scope.beers.slice(begin, end);
      });

      $scope.totalItems = $scope.numBeers = Object.keys($scope.beers).length;
    });

    $scope.addBeer = function() {
      if ($scope.formData) {
        Beer
          .add($scope.formData)
          .success(function(data) {
            $scope.numBeers++;
            $scope.message = data.message;
            $scope.paginatedBeers.push(data.data);
            $scope.formData = {};
          });
      }
    };

    $scope.deleteBeer = function(id) {
      Beer.delete(id)
        .success(function(data) {
          Beer.all()
            .success(function(data) {
              $scope.paginatedBeers = data;
              $scope.message = data.message;
              $scope.numBeers--;
            });
        });
    };
  }])

  .controller('EditBeerController', ['$scope', '$routeParams', 'Beer', function($scope, $routeParams, Beer) {
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
  }]);

angular.module('beers.services', [])
  .factory('Beer', ['$http', function($http) {
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
  }]);
