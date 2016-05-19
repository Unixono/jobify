'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, ServerCommunication, CurrentUserProfile) {
    $scope.user = {
      username: null,
      password: null
    };

    $scope.hasError = "";

    $scope.login = function() {
      ServerCommunication.loginUser($scope.user)
      .then(
        function(response) {
          // console.log('success from controller');
          // console.log(response);
          CurrentUserProfile.loginUser(response.user.username);
          $location.path('/offer-list');
        },
        function(error) {
          console.log('error from controller');
          console.log(error);
          $scope.user.password = '';
          $scope.hasError = error.error.message;
        }
      );
    };

    // $scope.registerUser = function() {
    //   $location.path('/register');
    // };
  });
