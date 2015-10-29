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
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        // console.log('error');
        // console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    }

    return {
      loginUser: loginUser
    };

  });
