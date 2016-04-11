'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('OfferCtrl', function ($scope, $location, CurrentUserProfile, ServerCommunication) {

  $scope.job = {
    developers: [],
    company: null,
    position: null,
    url: null,
    skillsiRequired: [],
    skillsiDesired: [],
    developerNotes: null,
    managerNotes: null,
    applicationResult: null,
    status: null, //new,applied,rejected,resolvedi, removed
    applicationMethod: null, //values: form or the emaili
    coverLetter: null,
    adviceToScrapp: null
  };

  //Call server to get dev list
  getDeveloperList();

  function getDeveloperList() {

    ServerCommunication.getDevelopers()
    .then(
      function (response) {
        console.log('success getDevelopers from controller');
        console.log(response);
        $scope.developerList = response;
      });
  };

  // selectedDevs
  $scope.selected_devs = [];

  $scope.addSelectedDev = function(user, add) {

    if (add) {
      $scope.selected_devs.push(user);
    }
    else {
      $scope.selected_devs.splice($scope.selected_devs.indexOf(user),1);
    }
    console.log(user);
    console.log($scope.selected_devs);
  }

  $scope.setEmailFocus = function () {
    document.getElementById('emailInput').focus();
  };

  $scope.goToList = function() {
    $location.path('/offer-list');
  };

  $scope.method = 'form';

  $scope.getJob = function(job) {
    return CurrentUserProfile.getJob() === job;
  };

  $scope.signUpButtonClicked = function() {

    $scope.showLoading = true;

    ServerCommunication.registerUser($scope.user)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        CurrentUserProfile.loginUser(response.user.username);
        $location.path('/offer-list');
      },
      function(error) {
        console.log('error from cotroller');
        console.log(error);
        $scope.hasError = true;
      }
    );
  };
});
