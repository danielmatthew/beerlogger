angular.module('BeerService', [])
  .factory('Beer', ['$http', function($http) {

    var beerFactory = {};

    beerFactory.all = function() {
      return $http.get('/api/beers');
    };

    beerFactory.get = function(id) {
      return $http.get('/api/beers' + id);
    };

    beerFactory.delete = function(id) {
      return $http.delete('/api/beers/' + id);
    };

    return beerFactory;
  }]);
