'use strict';

describe('Service: Calls', function () {

  // load the service's module
  beforeEach(module('callOrganizerApp'));

  // instantiate service
  var Calls;
  beforeEach(inject(function (_Calls_) {
    Calls = _Calls_;
  }));

  it('should do something', function () {
    expect(!!Calls).toBe(true);
  });

});
