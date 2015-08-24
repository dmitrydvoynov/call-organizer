'use strict';

/**
 * @ngdoc filter
 * @name callOrganizerApp.filter:formatTime
 * @function
 * @description
 * # formatTime
 * Filter in the callOrganizerApp.
 */
angular.module('callOrganizerApp')
    .filter('formatTime', function () {
        return function (input) {
            if (!input) {
                return '';
            }

            return (input.hours ? input.hours : '') + ":" + (input.minutes ? input.minutes : '');
        };
    });
