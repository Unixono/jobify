'use strict';

describe('Service: CurrentUserProfile', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var CurrentUserProfile;
  beforeEach(inject(function (_CurrentUserProfile_) {
    CurrentUserProfile = _CurrentUserProfile_;
  }));

  it('should do something', function () {
    expect(!!CurrentUserProfile).toBe(true);
  });

});
