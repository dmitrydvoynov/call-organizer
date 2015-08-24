'use strict';

describe('Directive: tableSort', function () {

  // load the directive's module
  beforeEach(module('callOrganizerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should add new icon', inject(function ($compile) {
    element = angular.element('<a table-sort table-sort-type="name"></a>');
    scope.sortReverse = false;
    scope.sortTypeName = 'name';
    scope.sortType = 'name';
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.find('i').length).toBe(1);
    expect(element.find('i').hasClass('glyphicon-chevron-up')).toBeTruthy();
  }));
});
