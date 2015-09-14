angular.module('BeerService', [])
  .factory('Beer', ['$http', function($http) {
    return {
      get: function() {
        return $http.get('/api/beers');
      },

      delete: function(id) {
        return $http.delete('/api/beers/' + id);
      }
    };
  }]);
