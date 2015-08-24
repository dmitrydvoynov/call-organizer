'use strict';

describe('Directive: inputPhoneNumber', function () {

  // load the directive's module
  beforeEach(module('callOrganizerApp'));

  var element,
    scope,
      form;

  var expectInvalid = function () {
    expect(scope.newCall.phone).toBeUndefined();
    expect(form.phoneNumberField.$valid).toBe(false);
    expect(form.$valid).toBe(false);
  };

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<form name="form">' +
        '<input class="form-control" input-phone-number ng-model="newCall.phone" id="phoneNumberField" name="phoneNumberField" placeholder="+(99)111 222 333" required>'+
        '</form>'
    );
    scope.newCall = {newCall:null};
    element = $compile(element)(scope);
    form = scope.form;
  }));

  it('validation should pass,replace + with 00, format phone and skip spaces an d(-)', inject(function () {
    form.phoneNumberField.$setViewValue('+5(66-2)34 456 455');
    expect(scope.newCall.phone).toEqual('005 662 344 564 55');
    expect(form.phoneNumberField.$valid).toBe(true);
    expect(form.$valid).toBe(true);
  }));

  it('validation should replace + to 00', inject(function () {
    form.phoneNumberField.$setViewValue('+566(234) 456 455');
    expect(scope.newCall.phone).toEqual('005 662 344 564 55');
    expect(form.phoneNumberField.$valid).toBe(true);
    expect(form.$valid).toBe(true);
  }));

  it('small phones are allowed', inject(function () {
    form.phoneNumberField.$setViewValue('+566(234) ');
    expect(scope.newCall.phone).toEqual('005 662 34');
    expect(form.phoneNumberField.$valid).toBe(true);
    expect(form.$valid).toBe(true);
  }));


  it('should fail for chars', inject(function () {
    form.phoneNumberField.$setViewValue('00-rrr 456 455');
    expectInvalid();
  }));

  it('should start with + or 00', inject(function () {
    form.phoneNumberField.$setViewValue('0456455');
    expectInvalid();
  }));

  it('should contain no more than one (-) ', inject(function () {
    form.phoneNumberField.$setViewValue('+(0-4)(5)6455');
    expectInvalid();
  }));

  it('(-) only allowed at 2-8 chars', inject(function () {
    form.phoneNumberField.$setViewValue('+123 45678 (9');
    expectInvalid();
  }));

});
