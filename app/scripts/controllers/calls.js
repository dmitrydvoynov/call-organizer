'use strict';

/**
 * Main controller for Call Organizer web page
 * @ngdoc function
 * @name callOrganizerApp.controller:CallsCtrl
 * @description
 * # CallsCtrl
 * Controller of the callOrganizerApp
 */
angular.module('callOrganizerApp')
    .controller('CallsCtrl', ["$scope", "Calls", function ($scope, Calls) {
        //model fields
        $scope.calls = Calls.list();
        $scope.newCall;
        $scope.nextCall = Calls.getNextCall(dateToTime(new Date()));

        //format and sort fields
        $scope.sortType = 'name';   // type of sort, could be string or function
        $scope.sortTypeName = 'name'; // name of the sort. must be string
        $scope.sortReverse = false;

        $scope.filter = '';
        $scope.filterName = 'all';

        // utility functions, used on templates
        $scope.getDate = function () {
            return new Date();
        };
        $scope.compareTime = compareTime;
        $scope.dateToTime = dateToTime;


        $scope.refresh = function () {
            $scope.calls = Calls.list();
            $scope.nextCall = Calls.getNextCall(dateToTime(new Date()));
        };

        /**
         * filter call list.
         * @param predicate Possible values 'all' ( display all records in list), 'next' (display just calls in future ), 'finished' (display just calls in past)
         */
        $scope.filterCalls = function (predicate) {
            if (predicate === 'all') {
                $scope.filterName = 'all';
                $scope.filter = '';
            } else if (predicate === 'next') {
                $scope.filterName = 'next';
                $scope.filter = function (value, index, array) {
                    return compareTime(value.time, dateToTime(new Date())) > 0
                }

            } else if (predicate === 'finished') {
                $scope.filterName = 'finished';
                $scope.filter = function (value, index, array) {
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