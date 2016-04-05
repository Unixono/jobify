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
    var currentUser = null;

    var offerScreen = 'new';

    this.setJob = function (job) {
      offerScreen = job;
    };
 
    this.getJob = function () {
      return offerScreen;
    };
    this.loginUser = function(username) {
      currentUser = new UserProfile(username);
    };

    this.getUserUsername = function() {
      // If user still does not exist.
      if(!currentUser) {
        return '';
      }

      return currentUser.getUserUsername();
    };

    this.logoutCurrentUser = function() {
      console.log('logout user from service');
      currentUser = null;
    };

  });
