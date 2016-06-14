(function() {
    'use strict';

    angular
        .module('drinkme')
        .controller('addEventController', addEventController);

    /** @ngInject */
    function addEventController(EventsService, TimersService) {
        var vm = this;
        vm.newEvent = {
            name:'',
            startDate: new Date(),
            endDate: new Date(),
            startTime:new Date(),
            endTime:new Date(),
            interval:10
        };

        vm.addEvent = addEvent;

        function parseEvent(event){
            return {
                name:event.name,
                startDate: moment(event.startDate).format('DD/MM/YYYY'),
                endDate: moment(event.endDate).format('DD/MM/YYYY'),
                startTime:moment(event.startTime).format('HH:mm'),
                endTime:moment(event.endTime).format('HH:mm'),
                interval:event.interval
            };
        }
        function addEvent(){
            var requestObject = parseEvent(vm.newEvent);
            EventsService.addEvent(requestObject);
            EventsService.loadData(moment());
            TimersService.start(EventsService.data.triggers);
        }
    }

})();
