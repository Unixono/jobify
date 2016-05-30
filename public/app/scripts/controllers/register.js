'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('RegisterCtrl', function ($scope, $rootScope,  $window, $location, ServerCommunication, CurrentUserProfile) {

  // Reset check fields
  $scope.passwordHasSpaces = false;
  $scope.emailValid = false;
  $scope.updateUser = false;
  $rootScope.errorText = 'on server, please reload the page';
  $rootScope.hasError = false;
  $rootScope.showLoading = false;

  $scope.user = {
    username: null,
    email: null,
    password: null,
    role: 'developer',
    filter: null
  };

  $scope.goHome = function () {
    if (CurrentUserProfile.getUserUsername() === '') {
      $location.path('/');
    }
    else {
      $location.path('/offer-list');
    }
  };


  // If current user exists, load settings
  if (CurrentUserProfile.getRegister() === 'settings') {
    $rootScope.showLoading = true;
    $scope.updateUser = true;
    ServerCommunication.getLoggedUser()
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $scope.user.username = response.user.username;
        $scope.user.password = response.user.password;
        $scope.user.role = response.user.role;
        $scope.user.email = response.user.email;
        if ($scope.user.email) {
          if ($scope.user.email !== '') {
            $scope.emailChanged();
          }
        }
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'on import user, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      });
  }

  // Show the password complexity using a progress bar.
  $scope.passwordComplexity = 0;
  $scope.passwordChange = function( password, retypePassword ) {

    // $scope.passwordComplexity = score;
    if( password.indexOf(" ") > -1 ) {
      $scope.passwordHasSpaces = true;
      $scope.passwordAdvice = 'Spaces not allowed';
    }
    else {
      $scope.passwordHasSpaces = false;
      $scope.passwordAdvice = "";
    }

    if(password !== retypePassword) {
      $scope.retypePasswordAdvice = 'Password doesnt match';
    }
    else {
      $scope.retypePasswordAdvice = "";
    }
  };

  $scope.passwordMatches = function( password, retypePassword ) {
    if(password === undefined || retypePassword === undefined) {
      return false;
    }

    if(password === retypePassword) {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.retypePasswordAdvice = "";
  $scope.retypePasswordChanged = function(password, retypePassword) {
    if(password !== retypePassword) {
      $scope.retypePasswordAdvice = 'Password doesnt match';
    }
    else {
      $scope.retypePasswordAdvice = "";
    }
  };

  $scope.emailChanged = function() {
    // console.log('email change');
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test($scope.user.email)) {
      $scope.emailValid = true;
    } else {
      $scope.emailValid = false;
    }
  };

  // Call the applet api function to signUp user.
  $scope.signUpButtonClicked = function() {
    $rootScope.showLoading = true;

    ServerCommunication.registerUser($scope.user)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        CurrentUserProfile.loginUser(response.user.username);
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = error.message;
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  // Call the applet api function to signUp user.
  $scope.updateUserButtonClicked = function() {
    $rootScope.showLoading = true;

    ServerCommunication.updateUser($scope.user)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        CurrentUserProfile.loginUser(response.user.username);
        $location.path('/offer-list');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = error.message;
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };

  $scope.removeUserButtonClicked = function() {
    $rootScope.showLoading = true;
    ServerCommunication.removeUser($scope.user)
    .then(
      function(response) {
        // console.log('success from controller');
        // console.log(response);
        $rootScope.showLoading = false;
        $rootScope.hasError = false;
        CurrentUserProfile.logoutCurrentUser();
        $location.path('/');
      },
      function(error) {
        // console.log('error from cotroller');
        // console.log(error);
        $rootScope.errorText = 'removing user, please try again';
        $rootScope.showLoading = false;
        $rootScope.hasError = true;
      }
    );
  };
});
