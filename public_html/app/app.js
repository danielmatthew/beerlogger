angular.module('beerApp', ['ngRoute', 'beers.controllers'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/beers.html',
      });

    $locationProvider.html5Mode(true);
  });

angular.module('beers.controllers', ['beers.services'])
  .controller('BeerCtrl', function($scope, Beer) {
    var that = this;
    this.beers = {};
    // $scope.beers = {};

    Beer.all().success(function(data) {
      that.beers = data.reverse();
    });
  });

angular.module('beers.services', [])
  .factory('Beer', function($http) {
    var o = {};

    o.all = function() {
      return $http.get('/api/beers');
    };

    o.get = function(id) {
      return $http.get('/api/beers' + id);
    };

    o.delete = function(id) {
      return $http.delete('/api/beers/' + id);
    };

    return o;
  });