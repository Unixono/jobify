'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('RegisterCtrl', function ($scope, $window, $location, ServerCommunication, CurrentUserProfile) {

  $scope.user = {
    username: null,
    email: null,
    password: null,
    role: 'developer'
  };
  $scope.updateUser = false;

  if (CurrentUserProfile.getUserUsername() != '') {
    $scope.updateUser = true;
    ServerCommunication.getLoggedUser()
    .then(
      function(response) {
        console.log('success from controller');
        console.log(response);
        $scope.user.username = response.user.username;
        $scope.user.password = response.user.password;
        $scope.user.role = response.user.role;
        $scope.user.email = response.user.email;
        $scope.emailChanged();
      },
      function(error) {
        console.log('error from cotroller');
        console.log(error);
      })
  };


  // $scope.$watch(
  //   function() {
  //     return CurrentUserProfile.getUserUsername();
  //   },
  //   function(newValue, oldValue) {
  //     if(newValue !== '') {
  //       username: ,
  //       password: null,
  //       role: 'developer'
  //     }
  //   },
  //   true
  // );

  $scope.hasError = false;
  $scope.passwordHasSpaces = false;
  $scope.emailValid = false;
  $scope.showLoading = false;


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
    $scope.errorText = "";
  }

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
    $scope.errorText = "";
  };

  $scope.emailChanged = function() {
    console.log('email change');
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test($scope.user.email)) {
      $scope.emailValid = true;
      // $scope.emailInvalid = false;
    } else {
      // $scope.emailInvalid = true;
      $scope.emailValid = false;
    }
  };

  // Call the applet api function to signUp user.
  $scope.signUpButtonClicked = function() {

    $scope.showLoading = true;

    ServerCommunication.registerUser($scope.user)
    .then(
      function(response) {
        console.log('success from controller');
        console.log(response);
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

  // Call the applet api function to signUp user.
  $scope.updateUserButtonClicked = function() {

    $scope.showLoading = true;

    ServerCommunication.updateUser($scope.user)
    .then(
      function(response) {
        console.log('success from controller');
        console.log(response);
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

  $scope.removeUserButtonClicked = function() {

    $scope.showLoading = true;

    ServerCommunication.removeUser($scope.user)
    .then(
      function(response) {
        console.log('success from controller');
        console.log(response);
        CurrentUserProfile.logoutCurrentUser();
        $scope.userName= '';
        $location.path('/');
      },
      function(error) {
        console.log('error from cotroller');
        console.log(error);
        $scope.hasError = true;
      }
    );
  };
});

