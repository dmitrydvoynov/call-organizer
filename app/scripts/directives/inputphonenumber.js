'use strict';

/**
 * *Add custom parser for phone number. It parses and normilise phone number to 00XXX XXX XXX.
 * Usage example:  <pre>
 * <input class="form-control" input-phone-number ng-model="newCall.phone" id="phoneNumberField" name="phoneNumberField" placeholder="+(99)111 222 333" required>
 * See documentatino for phone parsing rules.
 *
 * @ngdoc directive
 * @name callOrganizerApp.directive:inputPhoneNumber
 * @description
 * # inputPhoneNumber
 */
angular.module('callOrganizerApp')
    .directive('inputPhoneNumber', function () {
        return {
            /* scope: {},*/
            require: 'ngModel',
            // restrict: 'E',
            link: function (scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function (viewValue) {
                    if (ngModelController.$isEmpty(viewValue)) {
                        // consider empty models to be valid
                        return {};
                    }

                    // You should ignore all whitespaces when storing  record
                    var parsedValue = viewValue.trim();
                    if (parsedValue.lastIndexOf("+", 0) === 0) { //string starts with +
                        //You should convert first letter '+' to '00'
                        parsedValue = parsedValue.slice(1);
                    } else if (parsedValue.lastIndexOf("00", 0) !== 0) {
                        //phone number should start with '+', or '00'
                        return undefined;
                    }

                    var pattern = /([^0-9\(\)\-\s])/;
                    var result = pattern.exec(parsedValue);
                    if (result != null) {
                        //each phone number should start with '+', or '00' string followed by  digit characters or characters '(', ')', '­'
                        return undefined;
                    }

                    //check that number has only one (-) in the beginning of the string (2-8)
                    var specialChars = ['(', ')', '-']
                    var foundChars = [];
                    for (var i = 2; i <= 8; i++) {
                        var ch = parsedValue.charAt(i);
                        if (specialChars.indexOf(ch) != -1) {
                            if (foundChars.indexOf(ch) != -1) {
                                return undefined;
                            }
                            foundChars.push(ch);
                        }
                    }

                    //check that number has only one (-) in the beginning of the string (2-8)
                    for (var i = 9; i < parsedValue.length; i++) {
                        var ch = parsedValue.charAt(i);
                        if (specialChars.indexOf(ch) != -1) {
                            return undefined;
                        }
                    }

                    parsedValue = parsedValue.replace(/\s+/g, "");
                    parsedValue = parsedValue.replace(/([\(\)-])/g, "");

                    var resultValue = "00";
                    for (var i = 0; i < parsedValue.length; i++) {
                        resultValue = resultValue.concat(parsedValue.charAt(i));
                        if (i % 3 == 0) {
                            resultValue = resultValue.concat(' ')
                        }
                    }
                    return resultValue.trim(); // trim in case we have trailing space
                });


            }


        };
    });
