'use strict';

describe('Directive: inputTime', function () {

  // load the directive's module
  beforeEach(module('callOrganizerApp'));

  var element,
      scope,
      form;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<form name="form">' +
        '<input class="form-control" placeholder="hh:mm" input-time ng-model="newCall.time" id="timeField" name="timeField"/>'+
        '</form>'
    );
    scope.newCall = { time: {hours:13,minutes:24} };
    element = $compile(element)(scope);
    form = scope.form;
  }));

  it('validation should pass', inject(function () {
    form.timeField.$setViewValue('12:36');
    expect(scope.newCall.time.hours).toEqual(12);
    expect(scope.newCall.time.minutes).toEqual(36);
    expect(form.timeField.$valid).toBe(true);
    expect(form.$valid).toBe(true);
  }));

  it('validation should fail', inject(function () {
    form.timeField.$setViewValue('52:36');
    expect(scope.newCall.time).toBeUndefined();
    expect(form.timeField.$valid).toBe(false);
    expect(form.$valid).toBe(false);
  }));
});
