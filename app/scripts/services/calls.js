'use strict';

/**
 * @ngdoc service
 * @name callOrganizerApp.Calls
 * @description
 * # Calls
 * Factory in the callOrganizerApp.
 */
angular.module('callOrganizerApp')
    .factory('Calls', ['localStorageService',
        function (localStorageService) {
            return {
                list: function () {
                    var calls = localStorageService.get('calls');
                    if (calls == null) {
                        return [];
                    }
                    return calls;
                },
                getNextCall: function (date) {
                    var result = null;
                    var currentTime = dateToTime(date);
                    var calls = this.list();
                    for (var i = 0; i < calls.length; i++) {
                        var call = calls[i];
                        if (result == null) {
                            result = call;
                        } else {
                            if (compareTime(call, currentTime) > 0
                                && compareTime(call, result) < 0) {
                                result = call;
                            }
                        }
                    }
                    return result;
                },
                add: function (newCall) {
                    var calls = this.list();
                    //search for max id
                    var nextId = 0;
                    if (calls.length > 0) {
                        nextId = calls[calls.length - 1].id + 1;
                    }

                    newCall.id = nextId;
                    //save element
                    calls.push(newCall);
                    localStorageService.set('calls', calls);
                },
                delete: function (id) {
                    var calls = this.list();
                    var elementId = -1;
                    for (var i = 0; i < calls.length; i++) {
                        if (calls[i].id == id) {
                            elementId = id;
                            break;
                        }
                    }
                    if (elementId != -1) {
                        calls.splice(elementId, 1);
                    }
                    localStorageService.set('calls', calls);
                }

            };
        }
    ]
);
