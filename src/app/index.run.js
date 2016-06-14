(function () {
    'use strict';

    angular
        .module('drinkme')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, EventsService, TimersService) {
        EventsService.loadData(moment());
        TimersService.start(EventsService.data.triggers);
        $log.debug('runBlock end');
    }

})();
