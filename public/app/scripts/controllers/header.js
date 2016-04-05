'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('HeaderCtrl', function ($scope, $location, ServerCommunication, CurrentUserProfile) {
    $scope.userName = CurrentUserProfile.getUserUsername() || '';

    $scope.logoutUser = function() {
      ServerCommunication.logoutUser()
      .then(
        function(response) {
          console.log('success from controller');
          // console.log(response);
          CurrentUserProfile.logoutCurrentUser();
          $scope.userName= '';
          $location.path('/');
        },
        function(error) {
          console.log(error);
          $location.path('/');
        }
      );
    };

    $scope.goHome = function () {
      if ($scope.userName == '') {
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
        if(newValue) {
          $scope.userName = newValue;
        }
      },
      true);

  });
