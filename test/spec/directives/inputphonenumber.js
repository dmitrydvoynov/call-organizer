'use strict';

describe('Directive: inputPhoneNumber', function () {

  // load the directive's module
  beforeEach(module('callOrganizerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input-phone-number></input-phone-number>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the inputPhoneNumber directive');
  }));
});
