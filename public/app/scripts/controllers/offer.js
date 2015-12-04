'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('OfferCtrl', function ($scope, $location, CurrentUserProfile) {
  $scope.goToList = function() {
    $location.path('/offer-list');
  }

  $scope.getJob = function(job) {
    return CurrentUserProfile.getJob() === job;
  }
});
