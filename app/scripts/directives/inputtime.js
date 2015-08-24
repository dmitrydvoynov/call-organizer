'use strict';

/**
 * Add custom parser, validator and formatter to time input.
 * Usage example:  <pre>
 * <input class="form-control" placeholder="hh:mm" input-time ng-model="newCall.time" id="timeField" name="timeField">
 *     </pre>
 *  Appropriate time format: hh:mm. hh-0-23, mm:00-59
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
                //parse time as hh:mm
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


                //validate time to be hh:mm
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

                //display stored value as hh:mm
                ngModelController.$formatters.push(function (modelValue) {
                    if (!modelValue) {
                        return "";
                    }
                    return modelValue.hours + ":" + modelValue.minutes
                });
            }


        };
    });