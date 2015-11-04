'use strict';

describe('Filter: applied', function () {

  // load the filter's module
  beforeEach(module('publicApp'));

  // initialize a new instance of the filter before each test
  var applied;
  beforeEach(inject(function ($filter) {
    applied = $filter('applied');
  }));

  it('should return the input prefixed with "applied filter:"', function () {
    var text = 'angularjs';
    expect(applied(text)).toBe('applied filter: ' + text);
  });

});
