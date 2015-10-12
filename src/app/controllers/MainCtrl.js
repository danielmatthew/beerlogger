angular.module('mainCtrl', ['BeerService'])
  .controller('MainController', function($scope) {
    $scope.tagline = 'To the moon and back';
  });
