'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:OfferListCtrl
 * @description
 * # OfferListCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('OfferListCtrl', function ($scope, $rootScope, $location, ServerCommunication, CurrentUserProfile) {

    // rootscope variables for loading and error
    $rootScope.errorText = 'on server, please reload the page';
    $rootScope.hasError = false;
    $rootScope.showLoading = false;

    $scope.filterOption = {
      developers: [],
      status: [],
      company : ''
    };

    //Call server to get dev list
    function getDeveloperList() {
      $rootScope.showLoading = true;
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
      $rootScope.showLoading = true;
      ServerCommunication.getUserFilter()
      .then(
        function (response) {
          // console.log(response);
          if (response.filter.length > 0) {
            $scope.statusNew = response.filter[0];
            $scope.statusApplied = response.filter[1];
            $scope.statusRejected = response.filter[2];
            $scope.statusResolved = response.filter[3];
            $scope.filterOption.company = response.filter[4];

            for (var j = 0; j < $scope.developerList.length; j++ ) {
              for (var k = 5; k < response.filter.length; k++ ) {
                if ($scope.developerList[j].username === response.filter[k]) {
                  $scope.addSelectedDev($scope.developerList[j]);
                }
              }
            }
            $scope.updateJobList();
          } else {
            $scope.statusNew = true;
            $scope.statusApplied = true;
            $scope.statusRejected = false;
            $scope.statusResolved = false;
            $scope.filterOption.company = '';

            for (var i = 0; i < $scope.developerList.length; i++ ) {
              if (CurrentUserProfile.getUserUsername() === $scope.developerList[i].username) {
                $scope.addSelectedDev($scope.developerList[i]);
              }
            }
          }
          $rootScope.showLoading = false;
        });
    }

    $scope.updateJobList = function () {
      $rootScope.showLoading = true;

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
          $rootScope.showLoading = false;
          $rootScope.hasError = false;
          $scope.jobsList = response.offers;
        },
        function(error) {
          // console.log('error from controller');
          // console.log(error);
          $rootScope.errorText = 'reading data, please reload the page';
          $rootScope.showLoading = false;
          $rootScope.hasError = true;
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
      // $scope.updateJobList();
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
    $scope.predicate = CurrentUserProfile.getListPredicate();
    $scope.reverse = CurrentUserProfile.getListOrder();

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
      CurrentUserProfile.setListPredicate($scope.predicate);
      CurrentUserProfile.setListOrder($scope.reverse);
    };
  });
