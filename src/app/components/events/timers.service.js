angular.module('drinkme').factory('TimersService', TimersService);

/** @ngInject **/
function TimersService(moment, _, NotificationsFactory, $timeout) {
    var timer;
    var triggers;
    var index = 0;
    
    return {
        start   :   start,
        stop    :   stop
    };

    function start (triggers) {
        if (triggers.length == 0) {
            return;
        }

        if (index == triggers.length) {
            return; 
        }

        stop();

        var trigger = triggers[index];

        var timestamp = trigger.showAtMoment.diff(moment());

        timer = $timeout(function () {
            NotificationsFactory.create(trigger.name);
            index++;
            start(triggers);
        }, timestamp);
    }

    function stop () {
        timer();
    }
}