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

    this.registerUser = function(email, name, password, role) {
      var defer = $q.defer();
      var user = {'username': name, 'password': password, 'email': email, 'role': role};
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

    this.logoutUser = function(user) {
      var defer = $q.defer();

      // Call to the logout method on sever.
      
      defer.resolve('ok');

      return defer.promise;
    };

  });
