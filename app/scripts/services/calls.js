'use strict';

/**
 * Use local storea ge to store calls.
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
                /**
                 * Retrieve list of all calls from local storage.
                 * Each call has it's own id.
                 * @returns {*}
                 */
                list: function () {
                    var calls = localStorageService.get('calls');
                    if (calls == null) {
                        return [];
                    }
                    return calls;
                },
                /**
                 * In the ordered list of calls (by time ASC) find first record where time of call > current time and return that record. 
                 * @param currentTime
                 * @returns {*}
                 */
                getNextCall: function (currentTime) {
                    var result = null;
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
                /**
                 * Save new call in the list of call. The new unuque identifier will be assigned to call object.
                 * @param newCall
                 */
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
                /**
                 * Remove call from the list
                 * @param id
                 */
                delete: function (id) {
                    var calls = this.list();
                    var elementId = -1;
                    for (var i = 0; i < calls.length; i++) {
                        if (calls[i].id == id) {
                            elementId = i;
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
