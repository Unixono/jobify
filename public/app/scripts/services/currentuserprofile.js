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

    this.loginUser = function(username) {
      currentUser = new UserProfile(username);
    };

    this.getUserUsername = function() {
      // If user still does not exist.
      if(!currentUser) {
        return 'User';
      }

      return currentUser.getUserUsername();
    };

    this.logoutCurrentUser = function() {
      currentUser = null;
    };

  });
