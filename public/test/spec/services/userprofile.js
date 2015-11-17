'use strict';

describe('Service: UserProfile', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var UserProfile;
  beforeEach(inject(function (_UserProfile_) {
    UserProfile = _UserProfile_;
  }));

  it('should do something', function () {
    expect(!!UserProfile).toBe(true);
  });

});
