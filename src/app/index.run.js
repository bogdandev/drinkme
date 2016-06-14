(function() {
  'use strict';

  angular
    .module('drinkme')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
