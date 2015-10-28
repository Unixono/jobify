'use strict';

describe('Controller: SiteListCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var SiteListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiteListCtrl = $controller('SiteListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SiteListCtrl.awesomeThings.length).toBe(3);
  });
});
