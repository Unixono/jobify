'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
.controller('RegisterCtrl', function ($scope, $location) {

  $scope.role = developer;

  $scope.passwordHasSpaces = false;
  var userEmail;


  // Show the password complexity using a progress bar.
  $scope.passwordComplexity = 0;
  $scope.passwordChange = function( password, retypePassword ) {

    // $scope.passwordComplexity = score;
    if( password.indexOf(" ") > -1 ) {
      $scope.passwordHasSpaces = true;
      $scope.passwordAdvice = $rootScope.translate('wa_spaces_not_allowe');
    }
    else {
      $scope.passwordHasSpaces = false;
      $scope.passwordAdvice = "";
    }

    if(password !== retypePassword) {
      $scope.retypePasswordAdvice = $rootScope.translate('wa_doesnt_match');
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
      $scope.retypePasswordAdvice = $rootScope.translate('wa_doesnt_match');
    }
    else {
      $scope.retypePasswordAdvice = "";
    }
    $scope.errorText = "";
  };

  $scope.emailChanged = function() {
    $scope.errorText = "";
  };

  // Call the applet api function to signUp user.
  $scope.signUpButtonClicked = function(email, name, password, cpassword) {

    $scope.showLoading = true;

    userEmail = email;

    appletInteraction._signupUser(email, password, cpassword, name, 'signUpCallback');
  };

  $window.signUpCallback = function(returnValue) {
    // console.log('signUpCallback');
    var response = angular.fromJson(returnValue);
    $scope.showLoading = false;
    var error = errorHandler.checkCriticalError(response);
    if(error === false) {
      if( response.severity !== null ) {
        // If there was an error, print the error message.
        $scope.errorText = $rootScope.translateError(response.errorCode);
      }
      else {
        userAccount.setUserEmail( userEmail );
        var nextView = { view:'ALMOST_DONE' };
        viewManager.setNextView( nextView );
      }
    }
    $scope.$apply();
  };
});

