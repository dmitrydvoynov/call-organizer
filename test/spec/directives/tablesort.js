'use strict';

describe('Directive: glyphiconSort', function () {

  // load the directive's module
  beforeEach(module('callOrganizerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<glyphicon-sort-class></glyphicon-sort-class>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the glyphiconSortClass directive');
  }));
});
