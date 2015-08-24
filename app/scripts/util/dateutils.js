dateToTime = function (date) {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes()
    }
}

getCallTimeAsMinutes = function (call) {
    return call.time.hours * 60 + call.time.minutes;
}

compareTime = function (time1, time2) {
    if (time1.hours > time2.hours) {
        return 1;
    } else if (time1.hours < time2.hours) {
        return -1;
    } else { //hours are equals
        if (time1.minutes > time2.minutes) {
            return 1;
        } else if (time1.minutes < time2.minutes) {
            return -1;
        } else {
            return 0;
        }
    }
}
