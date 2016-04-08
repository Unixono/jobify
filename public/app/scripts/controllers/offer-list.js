'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:OfferListCtrl
 * @description
 * # OfferListCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('OfferListCtrl', function ($scope, $location, ServerCommunication, CurrentUserProfile) {

    $scope.jobsList = [];

    ServerCommunication.getJobsList().then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $scope.jobsList = response.jobs;
      },
      function(error) {
        console.log('error from controller');
        console.log(error);
        $location.path('/');
      });

      $scope.showJob = function() {
        CurrentUserProfile.setJob('old');
        $location.path('/offer');
      };

      $scope.newJob = function() {
        CurrentUserProfile.setJob('new');
        $location.path('/offer');
      };
  });
