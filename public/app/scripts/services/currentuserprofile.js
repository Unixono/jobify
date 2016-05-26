'use strict';

/**
 * @ngdoc service
 * @name publicApp.CurrentUserProfile
 * @description
 * # CurrentUserProfile
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('CurrentUserProfile', function (UserProfile) {

    // UserName cookies operations
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length,c.length);
        }
      }
      return "";
    }
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    // Current user vars
    var currentUser = getCookie('jobifyUser');

    var offerScreen = 'new';

    var registerScreen = 'register';

    // Curren user screen status operations
    this.setJob = function (job) {
      offerScreen = job;
    };

    this.getJob = function () {
      return offerScreen;
    };

    this.setRegister = function (reg) {
      registerScreen = reg;
    };

    this.getRegister = function () {
      return registerScreen;
    };

    // Current user operations
    this.loginUser = function(username) {
      setCookie('jobifyUser', username, 7);
      currentUser = username;
      // currentUser = new UserProfile(username);
    };

    this.getUserUsername = function() {
      // If user still does not exist.
      // console.log(currentUser);
      // if(!currentUser) {
      //   return '';
      // }
      //
      return currentUser;
    };

    this.getUser = function () {
      // If user still does not exist.
      // if(!currentUser) {
        // return '';
      // }
      return currentUser;
    };

    this.logoutCurrentUser = function() {
      // console.log('logout user from service');
      setCookie('jobifyUser', '', 7);
      currentUser = '';
    };

  });
