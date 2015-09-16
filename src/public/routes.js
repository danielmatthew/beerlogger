angular.module('routes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/public/views/beers.html'
      });
    $locationProvider.html5Mode(true);
  });
