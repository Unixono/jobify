'use strict';

describe('Controller: OfferListCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var OfferListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OfferListCtrl = $controller('OfferListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OfferListCtrl.awesomeThings.length).toBe(3);
  });
});
