'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular
  .module('publicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {

    // I have to set this flag in order to send login credentials in every http request.
    // More info: http://blog.ionic.io/angularjs-authentication/
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/site-list', {
        templateUrl: 'views/site-list.html',
        controller: 'SiteListCtrl',
        controllerAs: 'siteList'
      })
      .when('/offer-list', {
        templateUrl: 'views/offer-list.html',
        controller: 'OfferListCtrl',
        controllerAs: 'offerList'
      })
      .when('/offer', {
        templateUrl: 'views/offer.html',
        controller: 'OfferCtrl',
        controllerAs: 'offer'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run( function( ) {
    $.material.init();
    $.material.ripples();
    $.material.checkbox();
    $.material.radio();
  });
