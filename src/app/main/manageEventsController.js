(function() {
    'use strict';

    angular
        .module('drinkme')
        .controller('manageEventsController', manageEventsController);

    /** @ngInject */
    function manageEventsController() {
        var vm = this;
        vm.events = JSON.parse(localStorage.getItem('events')) || [{name:"Paracetamol"},{name:"Apa"}];

        vm.deleteEvent = deleteEvent;
        vm.editEvent = editEvent;
        vm.isEditingMode = false;

        function deleteEvent(index){
            events.splice(index,1);
        }
        
        function editEvent(event){
            vm.isEditingMode = true;
            vm.selectedEvent = event;
            console.log(vm.isEditingMode);
        }
    }

})();
