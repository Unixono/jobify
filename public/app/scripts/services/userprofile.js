'use strict';

/**
 * @ngdoc service
 * @name publicApp.UserProfile
 * @description
 * # UserProfile
 * Factory in the publicApp.
 */
angular.module('publicApp')
  .factory('UserProfile', function () {

    // Object constructor.
    var UserProfile = function(username) {
      this.username = username;
      this.email = null;
      this.fullName = null;
      this.role = null;
    };

    // Set parameters functions.
    UserProfile.prototype.setUserProfileData = function(profileData) {
      if(arguments.length === 0) {
        throw 'Missing parameters for setUserProfileData function.';
      }

      this.email = profileData.email || null;
      this.fullName = profileData.fullName || null;
      this.role = profileData.role || null;
    };

    // Get parameters functions. 
    UserProfile.prototype.getUserUsername = function() {
      return this.username;
    };

    UserProfile.prototype.getUserEmail = function() {
      return this.email;
    };

    UserProfile.prototype.getUserFullName = function() {
      return this.fullName;
    };

    UserProfile.prototype.getUserRole = function() {
      return this.role;
    };

    // Public API here
    return UserProfile;
  });
