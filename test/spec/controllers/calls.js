'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('callOrganizerApp', 'LocalStorageModule'));

  var CallsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,localStorageService) {
    scope = $rootScope.$new();
    CallsCtrl = $controller('CallsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    var calls = [
      {name:'test11', phone: '005 662 344 564 55', time:{hours:13,minutes:24}},
      {name:'test22', phone: '006 662 344 675', time:{hours:4,minutes:59}}
    ];
    localStorageService.set('calls', calls)
  }));

  it('should be not null', function () {
    expect(!!CallsCtrl).toBe(true);
  });

  it('should have calls in table', function () {
    expect(scope.calls.length).toBe(2);
  });

  it('call should be added to table', function () {
    scope.add({name:'test33', phone: '4 662 344 675', time:{hours:8,minutes:59}});
    expect(scope.calls.length).toBe(3);
  });

  it('call should be removed to table', function () {
    var id = scope.calls[1].id;
    scope.delete(id);
    expect(scope.calls.length).toBe(1);
  });
});
