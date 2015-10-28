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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
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
  });
