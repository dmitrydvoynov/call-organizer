'use strict';

/**
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
                    var parsedValue = viewValue.replace(/\s+/, "");
                    if (parsedValue.lastIndexOf("+", 0) === 0) { //string starts with +
                        //You should convert first letter '+' to '00'
                        parsedValue = parsedValue.slice(1);
                    } else if (parsedValue.lastIndexOf("00", 0) !== 0) {
                        //phone number should start with '+', or '00'
                        return undefined;
                    }

                    var pattern = /([^0-9\(\)-])/;
                    var result = pattern.exec(parsedValue);
                    if (result != null) {
                        //each phone number should start with '+', or '00' string followed by  digit characters or characters '(', ')', '­'
                        return undefined;
                    }

                    var allowedChars = ['(', ')', '-']
                    var foundChars = [];
                    for (var i = 2; i < 8; i++) {
                        var ch = parsedValue.charAt(i);
                        if (allowedChars.indexOf(ch) != -1) {
                            if (foundChars.indexOf(ch) != -1) {
                                return undefined;
                            }
                            foundChars.push(ch);
                        }
                    }

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
