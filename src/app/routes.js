angular.module('routes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/beers.html'
      });
    $locationProvider.html5Mode(true);
  });
