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
    $scope.userName = CurrentUserProfile.getUserUsername() || 'User';

    $scope.logoutUser = function() {
      ServerCommunication.logoutUser($scope.userName).then(
        function(response) {
          CurrentUserProfile.logoutCurrentUser();
          $location.path('/');
        },
        function(error) {
          console.log(error);
        }
      );
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
