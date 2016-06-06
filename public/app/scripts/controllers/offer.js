'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('OfferCtrl', function ($scope, $rootScope, $location, CurrentUserProfile, ServerCommunication) {

  // rootscope variables for loading and error
  $rootScope.errorText = 'on server, please reload the page';
  $rootScope.hasError = false;
  $rootScope.showLoading = false;

  //Call server to get dev list
  function getDeveloperList() {
    $rootScope.showLoading = true;

    ServerCommunication.getDevelopers()
    .then(
      function (response) {
        // console.log('success getDevelopers from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $scope.developerList = response;
        resetDevs();
      });
  }
  getDeveloperList();

  // Define and load the Job
  function resetJob () {
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
      status: null, //new,applied,rejected,resolved
      applicationMethod: null, //values: form or the email
      applicationEmail: null, //values: form or the email
      coverLetter: null,
      adviceToScrapp: null,
      creationDate: null,
      applyRejectDate: null
    };
  }
  resetJob();

  if (CurrentUserProfile.getJob() !== 'new') {
    // console.log(CurrentUserProfile.getJob());
    $rootScope.showLoading = true;
    ServerCommunication.getJob(CurrentUserProfile.getJob())
    .then(
      function (response) {
        $rootScope.showLoading = false;
        // console.log('success getJob from controller');
        // console.log(response);
        $scope.job = response.job;
        console.log('pre update devs');
        updateDevs();
        console.log('pre update skills');
        updateSkills();
        console.log($scope.job);
      });
  }

  // Update html components
  function updateDevs () {
    console.log('start devs load');
    for (var i = 0; i < $scope.job.developers.length; i++ ) {
      console.log('1 for ');
      console.log($scope.job.developers[i]);
      for (var j = 0; j < $scope.developerList.length; j++) {
        console.log('2 for ');
        console.log($scope.developerList[j]);

        if ($scope.job.developers[i] === $scope.developerList[j].username) {
          console.log('======');
          $scope.developerList[j].required = true;
        }
      }
    }
  }


  function resetDevs () {
    for (var i = 0; i < $scope.developerList.length; i++ ) {
      $scope.developerList[i].required = false;
    }
  }

  function updateSkills () {
    for (var i = 0; i < $scope.job.skillsRequired.length; i++ ) {
      $scope[$scope.job.skillsRequired[i]+"Required"] = true;
    }
    for (i = 0; i < $scope.job.skillsDesired.length; i++ ) {
      $scope[$scope.job.skillsDesired[i]+"Desired"] = true;
    }
  }

  function resetSkills () {
    $scope.jsDesired = false;
    $scope.jsRequired = false;
    $scope.angularDesired = false;
    $scope.angularRequired = false;
    $scope.reactDesired = false;
    $scope.reactRequired = false;
    $scope.nodeDesired = false;
    $scope.nodeRequired = false;
    $scope.meanDesired = false;
    $scope.meanRequired = false;
    $scope.pythonDesired = false;
    $scope.pythonRequired = false;
    $scope.djangoDesired = false;
    $scope.djangoRequired = false;
    $scope.cssDesired = false;
    $scope.cssRequired = false;
  }

  // selectedDevs
  $scope.addSelectedDev = function(dev) {

    dev.required = !dev.required;

    if (dev.required) {
      $scope.job.developers.push(dev.username);
    }
    else {
      $scope.job.developers.splice($scope.job.developers.indexOf(dev.username),1);
    }
    // console.log(dev);
    // console.log($scope.developerList);
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
    $rootScope.showLoading = true;

    $scope.job.status = 'new';
    $scope.job.creationDate = Date.now();

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.saveOffer($scope.job)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on save the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.saveNewClicked = function() {

    $rootScope.showLoading = true;

    // console.log('Resultado:');
    // console.log($scope.job);

    $scope.job.status = 'new';
    $scope.job.creationDate = Date.now();

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.saveOffer($scope.job)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        CurrentUserProfile.setJob('new');
        resetJob();
        resetDevs();
        resetSkills();
        $location.path('/offer');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on save the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.resolveClicked = function() {
    $rootScope.showLoading = true;

    $scope.job.status = 'resolved';

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.updateOffer($scope.job, CurrentUserProfile.getJob())
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on resolve the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.applyClicked = function() {
    $rootScope.showLoading = true;

    $scope.job.status = 'applied';
    $scope.job.applyRejectDate = Date.now();

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.updateOffer($scope.job, CurrentUserProfile.getJob())
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on apply the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.rejectClicked = function() {
    $rootScope.showLoading = true;

    $scope.job.status = 'rejected';
    $scope.job.applyRejectDate = Date.now();

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.updateOffer($scope.job, CurrentUserProfile.getJob())
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on reject the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.updateClicked = function() {
    $rootScope.showLoading = true;

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.updateOffer($scope.job, CurrentUserProfile.getJob())
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on update the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.removeClicked = function() {
    $rootScope.showLoading = true;

    // console.log('Resultado:');
    // console.log($scope.job);

    ServerCommunication.removeOffer(CurrentUserProfile.getJob())
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on remove the offer, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };
});
