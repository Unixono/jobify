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

    var serverUrl = 'http://0.0.0.0:3000';
    // var serverUrl = 'http://server:3000';

    this.loginUser = function(user) {
      var defer = $q.defer();
      // console.log(user);
      $http.post(serverUrl + '/login', user ).success(function(response) {
        // console.log('success');
        // console.log(response);
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
        // console.log('success');
        // console.log(response);
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
      // console.log(user);
      $http.post(serverUrl + '/signup', user ).success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.updateUser = function(user) {
      var defer = $q.defer();
      // console.log(user);
      $http.put(serverUrl + '/updateuser', user ).success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.getJobsList = function(filter) {
      var defer = $q.defer();

      // console.log(filter);
      $http.post(serverUrl + '/offer-list', filter).success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });

      return defer.promise;
    };

    this.getJob = function(id) {
      var defer = $q.defer();
      // console.log(id);
      $http.get(serverUrl + '/offer/'+ id ).success(function(response) {
        // console.log('success');
        // console.log(response);
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
      // console.log('log out');
      $http.post(serverUrl + '/logout').success(function(response) {
        // console.log('success');
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

    this.removeUser = function(user) {
      var defer = $q.defer();

      // Call to the logout method on sever.
      // console.log('remove user');
      $http.put(serverUrl + '/removeuser', user ).success(function(response) {
        // console.log('success');
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

    this.getDevelopers = function() {
      var defer = $q.defer();

      // Call to the getDeveloperList method on sever.
      // console.log('get developers');
      $http.get(serverUrl + '/getdeveloperlist').success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response.devs);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    };

    this.saveOffer = function(offer) {
      var defer = $q.defer();
      // offer.creationDate = Date.now();
      // console.log(offer);
      $http.put(serverUrl + '/saveoffer', offer ).success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    };

    this.updateOffer = function(offer, id) {
      var defer = $q.defer();
      // console.log(id);
      // console.log(offer);
      var params = {
        offer : offer,
        id : id
      };
      $http.put(serverUrl + '/updateoffer', params ).success(function(response) {
        // console.log('success');
        // console.log(response);
        defer.resolve(response);
      })
      .error(function(err) {
        console.log('error');
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    };

    this.removeOffer = function(id) {
      var defer = $q.defer();
      console.log(id);
      $http.put(serverUrl + '/removeoffer/'+id ).success(function(response) {
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
  });
