'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('RegisterCtrl', function ($scope, $window, $location) {

  $scope.role = 'developer';

  $scope.passwordHasSpaces = false;
  $scope.emailValid = false;
  $scope.showLoading = false;
  var userEmail;


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
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test(email)) {
      $scope.emailValid = true;
    } else {
      $scope.emailValid = false;
    }
  };

  // Call the applet api function to signUp user.
  $scope.signUpButtonClicked = function(email, name, password, cpassword) {

    $scope.showLoading = true;

    userEmail = email;

    this.registerUser = function(email, name, password, role) {
    // appletInteraction._signupUser(email, password, cpassword, name, 'signUpCallback');
  };

  $window.signUpCallback = function(returnValue) {
    // console.log('signUpCallback');
    // var response = angular.fromJson(returnValue);
    // $scope.showLoading = false;
    // var error = errorHandler.checkCriticalError(response);
    // if(error === false) {
      // if( response.severity !== null ) {
        // If there was an error, print the error message.
        // $scope.errorText = 'Error registering user';
      // }
      // else {
        // $location.path('/offer-list');
      // }
    // }
    // $scope.$apply();
  };
});

