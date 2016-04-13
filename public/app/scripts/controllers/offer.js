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
    skillsRequired: [],
    skillsDesired: [],
    otherSkillsRequired: '',
    otherSkillsDesired: '',
    developerNotes: null,
    managerNotes: null,
    applicationResult: null,
    status: null, //new,applied,rejected,resolved, removed
    applicationMethod: null, //values: form or the email
    applicationEmail: null, //values: form or the email
    coverLetter: null,
    adviceToScrapp: null
  };

  //Call server to get dev list
  function getDeveloperList() {

    ServerCommunication.getDevelopers()
    .then(
      function (response) {
        // console.log('success getDevelopers from controller');
        // console.log(response);
        $scope.developerList = response;
      });
  }
  getDeveloperList();

  // selectedDevs
  $scope.addSelectedDev = function(user, add) {

    if (add) {
      $scope.job.developers.push(user);
    }
    else {
      $scope.job.developers.splice($scope.job.developers.indexOf(user),1);
    }
    // console.log(user);
    // console.log($scope.job);
  };

  // selectedSkils
  $scope.addSelectedSkill = function(skill, required, desired) {

    if (desired) {
      $scope.job.skillsDesired.push(skill);
    }
    else {
      if ($scope.job.skillsDesired.indexOf(skill) > -1) {
        $scope.job.skillsDesired.splice($scope.job.skillsDesired.indexOf(skill),1);
      }
    }
    if (required) {
      $scope.job.skillsRequired.push(skill);
    }
    else {
      if ($scope.job.skillsRequired.indexOf(skill) > -1) {
        $scope.job.skillsRequired.splice($scope.job.skillsRequired.indexOf(skill),1);
      }
    }
    // console.log(skill);
    // console.log($scope.job);
  };

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

  $scope.saveClicked = function() {

    $scope.showLoading = true;

    if ($scope.getJob('new')) {
      $scope.job.status = 'new';
    }

    console.log('Resultado:');
    console.log($scope.job);

    ServerCommunication.saveOffer($scope.job)
    .then(
      function(response) {
        console.log('success from controller');
        console.log(response);
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
