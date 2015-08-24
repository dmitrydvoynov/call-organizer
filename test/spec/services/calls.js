'use strict';

describe('Service: Calls', function () {

  // load the service's module
  beforeEach(module('callOrganizerApp', 'LocalStorageModule'));

  // instantiate service
  var Calls,localStorageService;
  beforeEach(inject(function (_Calls_, localStorageService) {
    Calls = _Calls_;
    var calls = [
      {name:'test1 ', phone: '005 662 344 564 55', time:{hours:13,minutes:24}},
      {name:'test2 ', phone: '006 662 344 675', time:{hours:4,minutes:59}}
    ];
    localStorageService.set('calls', calls)
  }));

  it('list should exists', function () {
    expect(Calls.list().length).toBe(2);
  });

  it('new call should be saved', function () {
    Calls.add( {name:'test3 ', phone: '666 662 344 675', time:{hours:4,minutes:59}});
    expect(Calls.list().length).toBe(3);
  });

  it('call should be deleted', function () {
    var call = Calls.list()[1];
    Calls.delete(call.id);
    expect(Calls.list().length).toBe(1);
  });

  it('getNextCall should return 1 record', function () {
    var nextCall = Calls.getNextCall({hours: 5, minutes: 56});
    expect(!!nextCall).toBe(true);
    expect(nextCall.time.hours).toBe(13);
    expect(nextCall.time.minutes).toBe(24);
  });

});
