'use strict';

/**
 * @ngdoc directive
 * @name callOrganizerApp.directive:glyphiconSortClass
 * @description
 * # glyphiconSortClass
 */
angular.module('callOrganizerApp')
    .directive('tableSort', function () {
        return {
            template: function (elem, attrs) {
                return '<i class="glyphicon {{sortTypeName!=\'' + attrs.tableSortType + '\' ? \'glyphicon-sort\' : (\'glyphicon-chevron-\' + (sortReverse?\'down\':\'up\'))}} "></i>';
            },
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    scope.sortReverse = (scope.sortTypeName === attrs.tableSortType) ? !scope.sortReverse : false;
                    scope.sortTypeName = attrs.tableSortType;

                    if(scope.sortTypeName === 'time'){
                        scope.sortType = getCallTimeAsMinutes;
                    }else {
                        scope.sortType = scope.sortTypeName;
                    }
                    scope.$apply();
                });
            }
        };
    });
