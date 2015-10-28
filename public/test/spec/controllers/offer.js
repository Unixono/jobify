'use strict';

describe('Controller: OfferCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var OfferCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OfferCtrl = $controller('OfferCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OfferCtrl.awesomeThings.length).toBe(3);
  });
});
