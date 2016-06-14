(function() {
  'use strict';

  angular
    .module('drinkme')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          
      },
      controller: NavbarController
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

    }
  }

})();
