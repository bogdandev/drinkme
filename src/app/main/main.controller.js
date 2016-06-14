(function() {
  'use strict';

  angular
    .module('drinkme')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(EventsService, TimersService) {
    var vm = this;

    

    activate();

    function activate() {
      EventsService.loadData(moment().format('DD/MM/YYYY'));

      TimersService.start(EventsService.data.triggers);
    }
  }
})();
