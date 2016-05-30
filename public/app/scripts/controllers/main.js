'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('MainCtrl', function ($scope, $rootScope, $location, ServerCommunication, CurrentUserProfile) {
  $scope.user = {
    username: null,
    password: null
  };

  // rootscope variables for loading and error
  $rootScope.errorText = 'on server, please reload the page';
  $rootScope.hasError = false;
  $rootScope.showLoading = false;

  $scope.login = function() {
    $rootScope.showLoading = true;
    ServerCommunication.loginUser($scope.user)
    .then(
      function(response) {
        // console.log('success from controller');
        CurrentUserProfile.loginUser(response.user.username);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from controller');
        // console.log(error);
        $scope.user.password = '';
        $rootScope.errorText = error.error.message;
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  // $scope.registerUser = function() {
  //   $location.path('/register');
  // };
});
