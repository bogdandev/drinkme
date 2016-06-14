(function() {
    'use strict';

    angular
        .module('drinkme')
        .directive('editEvent', editEvent);

    /** @ngInject */
    function editEvent() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/editEvent/edit-event.html',
            scope: {
                event: "="
            },
            link: link
        };

        return directive;

        /** @ngInject */
        function link(scope) {
            scope.saveEvent = saveEvent;

            function saveEvent(){
                // eventService.save(vm.event);
            }
            console.log(scope.event);
        }
        
        
    }

})();
/**
 * Created by Razvan on 14.06.2016.
 */
