'use strict';

describe('Filter: formatTime', function () {

  // load the filter's module
  beforeEach(module('callOrganizerApp'));

  // initialize a new instance of the filter before each test
  var formatTime;
  beforeEach(inject(function ($filter) {
    formatTime = $filter('formatTime');
  }));

  it('should format time', function () {
    var time = { hours:13, minutes:24};
    expect(formatTime(time)).toBe('13:24');
  });
  it('should skip empty values', function () {
    var time;
    expect(formatTime(time)).toBe('');
  });

});
