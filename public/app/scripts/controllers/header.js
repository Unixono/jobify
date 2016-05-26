'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('HeaderCtrl', function ($scope, $location, $route, ServerCommunication, CurrentUserProfile) {
    // console.log(CurrentUserProfile.getUserUsername());
    $scope.userName = CurrentUserProfile.getUserUsername();

    $scope.settings = function () {
      // set user option
      CurrentUserProfile.setRegister('settings');
      $route.reload();
      $location.path('/register');
    };

    $scope.logoutUser = function() {
      ServerCommunication.logoutUser()
      .then(
        function(response) {
          // console.log('success from controller');
          // console.log(response);
          CurrentUserProfile.logoutCurrentUser();
          $location.path('/');
        },
        function(error) {
          console.log(error);
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
