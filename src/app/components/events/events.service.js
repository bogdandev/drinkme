
angular.module('drinkme').factory('EventsService', EventsService);

/** @ngInject **/
function EventsService(moment, _) {
    var data = {
        triggers : [], 
        events : []
    };
    var openSessionMoment;

    return {
        loadData    :	loadData,
        addEvent    :   addEvent,
        removeEvent :   removeEvent,
        editEvent   :   editEvent,
        getEvents   :   getEvents,
        data        :   data
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
        data.events = JSON.parse(localStorage.getItem("events")) || [];

        return data.events;
    }

    function setEvents() {
        localStorage.setItem('events', JSON.stringify(data.events));
    }

    function addEvent(event) {
        if (event) { 
            data.events.push(event);
            setEvents();
        }    
    }
    
    function removeEvent(event) {
        if (event) {
            var index = _.findIndex(data.events, {id : event.id});
            
            if (index > -1){
                data.events.splice(index, 1);

                setEvents();
            }
        }
    }

    function editEvent(eventId, event) {
        if (eventId && event) {
            var index = _.findIndex(data.events, {id : eventId});

            if (index > -1) {
                data.events[index] = event;

                setEvents();
            }
        }
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
                createTrigger(startHour.clone());
            }
            startHour.add(event.interval, 'minutes');
        }

        data.triggers = _.orderBy(data.triggers, function (trigger) {
            return trigger.showAtMoment.format('x');
        });

        function createTrigger(showAtMoment) {
            data.triggers.push({
                event: event.id,
                showAt: showAtMoment,
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
