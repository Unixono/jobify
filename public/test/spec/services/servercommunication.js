'use strict';

describe('Service: ServerCommunication', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var ServerCommunication;
  beforeEach(inject(function (_ServerCommunication_) {
    ServerCommunication = _ServerCommunication_;
  }));

  it('should do something', function () {
    expect(!!ServerCommunication).toBe(true);
  });

});
