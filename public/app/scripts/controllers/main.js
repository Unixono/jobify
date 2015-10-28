'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MainCtrl', function ($scope) {
    $scope.user = {
      name: null,
      password: null
    };

    $scope.login = function() {
      if($scope.user.name && $scope.user.password) {
        console.log($scope.user);
      }
      else {
        console.log('Error');
      }
    };

  });
