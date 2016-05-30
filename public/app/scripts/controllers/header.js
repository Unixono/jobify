'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, $location, $route, ServerCommunication, CurrentUserProfile) {
    // console.log(CurrentUserProfile.getUserUsername());
    $scope.userName = CurrentUserProfile.getUserUsername();

    // rootscope variables for loading and error
    $rootScope.errorText = 'on server, please reload the page';
    $rootScope.hasError = false;
    $rootScope.showLoading = false;

    $scope.settings = function () {
      // set user option
      CurrentUserProfile.setRegister('settings');
      $route.reload();
      $location.path('/register');
    };

    $scope.logoutUser = function() {
      $rootScope.showLoading = true;
      ServerCommunication.logoutUser()
      .then(
        function(response) {
          // console.log('success from controller');
          // console.log(response);
          $rootScope.showLoading = false;
          $rootScope.hasError = false;
          CurrentUserProfile.logoutCurrentUser();
          $location.path('/');
        },
        function(error) {
          // console.log(error);
          $rootScope.showLoading = false;
          $rootScope.hasError = true;
          $rootScope.errorText = 'when logout user, please reload the page';
          $location.path('/');
        }
      );
    };

    $scope.goHome = function () {
      if (CurrentUserProfile.getUserUsername() === '') {
        $location.path('/');
      }
      else {
        $location.path('/offer-list');
      }
    };

    $scope.$watch(
      function() {
        return CurrentUserProfile.getUserUsername();
      },
      function(newValue, oldValue) {
          $scope.userName = newValue;
          if ($scope.userName === '') {
            $scope.goHome();
          }
      },
      true
    );

    $scope.registerUser = function() {
      CurrentUserProfile.setRegister('register');
      $route.reload();
      $location.path('/register');
    };
  });
