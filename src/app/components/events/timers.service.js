angular.module('drinkme').factory('TimersService', TimersService);

/** @ngInject **/
function TimersService(moment, notificationsFactory, $timeout) {
    var timer;
    var triggers;
    var index = 0;

    return {
        start: start,
        stop: stop
    };

    function start(triggers) {
        if (triggers.length == 0) {
            return;
        }

        if (index == triggers.length) {
            return;
        }

        if (timer) {
            stop();
        }

        var trigger = triggers[index];

        var timestamp = trigger.showAt.diff(moment());
        timer = $timeout(function () {
            notificationsFactory.create(trigger.name, 'move your body');
            index++;
            start(triggers);
        }, timestamp);
    }

    function stop() {
        $timeout.cancel(timer);
    }
}
