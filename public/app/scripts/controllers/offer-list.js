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

    $scope.filterOption = {
      developers: [],
      status: [],
      company : '',
      position : ''
    };

    //Call server to get dev list
    function getDeveloperList() {

      ServerCommunication.getDevelopers()
      .then(
        function (response) {
          // console.log('success getDevelopers from controller');
          // console.log(response);
          $scope.developerList = response;
          initFilters();
        });
    }
    getDeveloperList();

    function initFilters() {
      $scope.statusNew = true;
      $scope.statusApplied = true;
      $scope.statusRejected = false;
      $scope.statusResolved = false;

      for (var i = 0; i < $scope.developerList.length; i++ ) {
        if (CurrentUserProfile.getUserUsername() === $scope.developerList[i].username) {
          $scope.addSelectedDev($scope.developerList[i]);
        }
      }
    }

    $scope.updateJobList = function () {
      $scope.jobsList = [];
      $scope.filterOption.status = [];

      if ($scope.statusNew) {
        $scope.filterOption.status.push('new');
      }
      if ($scope.statusApplied) {
        $scope.filterOption.status.push('applied');
      }
      if ($scope.statusRejected) {
        $scope.filterOption.status.push('rejected');
      }
      if ($scope.statusResolved) {
        $scope.filterOption.status.push('resolved');
      }

      // console.log($scope.filterOption);

      ServerCommunication.getJobsList($scope.filterOption)
      .then(
        function(response) {
          // console.log('success from controller');
          // console.log(response.offers);
          $scope.jobsList = response.offers;
        },
        function(error) {
          console.log('error from controller');
          console.log(error);
          $location.path('/');
        });
    };

    // selectedDevs
    $scope.addSelectedDev = function(dev) {

      dev.required = !dev.required;

      if (dev.required) {
        $scope.filterOption.developers.push(dev.username);
      }
      else {
        $scope.filterOption.developers.splice($scope.filterOption.developers.indexOf(dev.username),1);
      }
      $scope.updateJobList();
      // console.log(dev);
      // console.log($scope.developerList);
      // console.log($scope.job);
    };

    $scope.showJob = function(id) {
      CurrentUserProfile.setJob(id);
      // console.log (CurrentUserProfile.getJob());
      $location.path('/offer');
    };

    $scope.newJob = function() {
      CurrentUserProfile.setJob('new');
      $location.path('/offer');
    };

    //column order
    $scope.predicate = 'job.company';
    $scope.reverse = true;

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

  });
