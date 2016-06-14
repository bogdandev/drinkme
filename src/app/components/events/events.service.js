
angular.module('drinkme').factory('EventsService', EventsService);

/** @ngInject **/
function EventsService(moment) {
    var data = {triggers:[]};
    var openSessionMoment;

    return {
        loadData: loadData,
        data: data
    };

    function loadData(startTime) {
        openSessionMoment = moment(startTime, 'DD/MM/YYYY');
        var events = getEvents();
        data.triggers = [];

        events.forEach(function (event) {
            createTriggersForEvent(event);
        });
    }

    function getEvents() {

        return [
            {
                id: 1,
                name: 'Paracetamol',
                startDate: openSessionMoment.format('X'),
                endDate: openSessionMoment.clone().add(2, 'days').format('X'),
                startTime: '9:00',
                endTime: '18:00',
                interval: 60
            }
        ];
    }

    function createTriggersForEvent(event) {
        event.startDateMoment = moment(event.startDate, 'X');
        event.endDateMoment = moment(event.endDate, 'X');
        var todayEventMoment = openSessionMoment.clone();
        var startTime = event.startTime.split(':');
        var endTime = event.endTime.split(':');
        event.startTimeMoment = todayEventMoment.clone().hours(parseInt(startTime[0])).minutes(parseInt(startTime[1]));
        event.endTimeMoment = todayEventMoment.clone().hours(parseInt(endTime[0])).minutes(parseInt(endTime[1]));

        if (openSessionMoment.diff(event.startDateMoment) < 0 || openSessionMoment.diff(event.endDateMoment) > 0) {
            return;
        }

        var startHour = event.startTimeMoment.clone();

        while(startHour.diff(event.endTimeMoment) <= 0) {
            if (startHour.diff(openSessionMoment) >= 0) {
                createTrigger(startHour.format('X'));
            }
            startHour.add(event.interval, 'minutes');
        }

        function createTrigger(timestamp) {
            data.triggers.push({
                event: event.id,
                showAt: timestamp,
                name: event.name
            });
        }
    }

}


/*

Event - stored in LocalStorage
{
    id: 'ID'
    name: 'String',
    startDate: 'Timestamp',
    endDate: 'Timestamp',
    startTime: 'Timestamp',
    endTime: 'Timestamp',
    interval: Number
}

Trigger - stored in memory
{
    event: EventId,
    showAt: Timestamp,
    name: EventName
}

*/
