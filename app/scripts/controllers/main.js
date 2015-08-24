'use strict';

/**
 * @ngdoc function
 * @name callOrganizerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the callOrganizerApp
 */
angular.module('callOrganizerApp')
    .controller('MainCtrl', ["$scope", "Calls", function ($scope, Calls) {
        $scope.calls = Calls.list();

        $scope.sortType = 'name';
        $scope.sortTypeName = 'name';
        $scope.sortReverse = false;

        $scope.filter = '';
        $scope.filterName = 'all';
        $scope.newCall;

        $scope.nextCall = Calls.getNextCall(new Date());

        $scope.getDate = function() {
            return new Date();
        };
        $scope.compareTime = compareTime;
        $scope.dateToTime = dateToTime;

        $scope.refresh = function () {
            $scope.calls = Calls.list();
            $scope.nextCall = Calls.getNextCall(new Date());
        };

        $scope.filterCalls = function (predicate) {
            if(predicate === 'all'){
                $scope.filterName = 'all';
                $scope.filter = '';
            }else if(predicate === 'next'){
                $scope.filterName = 'next';
                $scope.filter = function (value, index, array) {
                    return compareTime(value.time, dateToTime(new Date())) > 0
                }

            }else if(predicate === 'finished') {
                $scope.filterName = 'finished';
                $scope.filter=  function (value, index, array) {
                    return compareTime(value.time, dateToTime(new Date())) < 0
                }
            }
        };

        $scope.add = function (call) {
            Calls.add(call);
            $scope.refresh();
        };

        $scope.delete = function (id) {
            Calls.delete(id);
            $scope.refresh();
        };


    }]
);