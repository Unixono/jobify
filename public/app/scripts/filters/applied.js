'use strict';

/**
 * @ngdoc filter
 * @name publicApp.filter:applied
 * @function
 * @description
 * # applied
 * Filter in the publicApp.
 */
angular.module('publicApp')
  .filter('applied', function () {
    return function(isTrue) {
      if(isTrue) {
        return 'Yes';
      }
      return 'No';
    };
  });
