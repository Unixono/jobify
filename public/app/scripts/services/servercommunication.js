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

    function loginUser(user) {
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
    }

    // WARNING!! Partial implementation!!!
    // The user variable is hardcoded. We have to pass the user as an argument to this function.
    function registerUser() {
      var defer = $q.defer();
      var user = {'username': 'lea', 'password': '123'};
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
    }

    return {
      loginUser: loginUser,
      registerUser: registerUser
    };

  });
