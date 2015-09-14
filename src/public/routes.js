angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '',
      controller: 'MainController'
    });

  $locationProvider.html5Mode(true);
}]);
