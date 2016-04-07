'use strict';

/**
 * @ngdoc service
 * @name publicApp.ServerCommunication
 * @description
 * # ServerCommunication
 * Service in the publicApp.
 */
angular.module('publicApp')
  .service('ServerCommunication', function ($http, $q) {

    var serverUrl = 'http://localhost:3000';

    this.loginUser = function(user) {
      var defer = $q.defer();
      console.log(user);
      $http.post(serverUrl + '/login', user ).success(function(response) {
        console.log('success');
        console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.getLoggedUser = function() {
      var defer = $q.defer();
      $http.get(serverUrl + '/getuser').success(function(response) {
        console.log('success');
        console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.registerUser = function(user) {
      var defer = $q.defer();
      console.log(user);
      $http.post(serverUrl + '/signup', user ).success(function(response) {
        console.log('success');
        console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.getJobsList = function() {
      var defer = $q.defer();

      $http.get(serverUrl + '/offer-list').success(function(response) {
        console.log('success');
        console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.logoutUser = function() {
      var defer = $q.defer();

      // Call to the logout method on sever.
      console.log('log out');
      $http.post(serverUrl + '/logout').success(function(response) {
        console.log('success');
        // console.log(response);
        defer.resolve('ok');
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    };
  });
