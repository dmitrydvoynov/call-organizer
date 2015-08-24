'use strict';

/**
 * @ngdoc directive
 * @name callOrganizerApp.directive:inputTime
 * @description
 * # inputTime
 */
angular.module('callOrganizerApp')
    .directive('inputTime', function () {
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
                    var pattern = /^((\d\d?)(:(\d\d?))?)$/gm;
                    var result = pattern.exec(viewValue);
                    if (result == null) {
                        return undefined;
                    }
                    var timeArray = viewValue.split(":");
                    if (timeArray.length != 2) {
                        return undefined;
                    }
                    var hours = parseInt(timeArray[0]);
                    var minutes = parseInt(timeArray[1]);
                    return {
                        hours: hours,
                        minutes: minutes
                    };
                });


                ngModelController.$validators.inputTime = function (modelValue, viewValue) {
                    if (ngModelController.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    var hours = modelValue.hours;
                    var minutes = modelValue.minutes;
                    if ((hours < 0 || hours > 24) ||
                        (minutes < 0 || minutes > 59)) {
                        return false
                    }

                    return true;
                };

                ngModelController.$formatters.push(function(modelValue) {
                    if(!modelValue){
                        return "";
                    }
                    return modelValue.hours + ":" + modelValue.minutes
                });

               /* ngModelController.$render = function () {
                    if(ngModelController.$modelValue){
                        scope.time = ngModelController.$modelValue.hours + ":" + ngModelController.$modelValue.minutes;
                    }

                };*/

            }


        };
    });


/*

 ngModelController.$formatters.push(function(modelValue) {
 var unit = 'minutes', num = 0, i, unitName;

 modelValue = parseInt(modelValue || 0);

 // Figure out the largest unit of time the model value
 // fits into. For example, 3600 is 1 hour, but 1800 is 30 minutes.
 for (i = multiplierTypes.length-1; i >= 0; i--) {
 unitName = multiplierTypes[i];
 if (modelValue % multiplierMap[unitName] === 0) {
 unit = unitName;
 break;
 }
 }

 if (modelValue) {
 num = modelValue / multiplierMap[unit]
 }

 return {
 unit: unit,
 num:  num
 };
 });

 if (ngModelController.$isEmpty(modelValue)) {
 // consider empty models to be valid
 return true;
 }

 var pattern = /^((\d\d?)(:(\d\d?))?)$/gm;
 var result = pattern.exec(modelValue);
 if (result == null) {
 return false;
 }
 var timeArray = modelValue.split(":");
 if (timeArray.length != 2) {
 return false;
 }
 var hours = parseInt(timeArray[0]);
 var minutes = parseInt(timeArray[1]);
 if ((hours < 0 || hours > 24) ||
 (minutes < 0 || minutes > 59)) {
 return false
 }


 ctrl.$setValidity('minNumber', valid);

 return true;
 */
