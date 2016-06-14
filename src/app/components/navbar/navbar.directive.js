(function () {
    'use strict';

    angular
        .module('drinkme')
        .directive('acmeNavbar', acmeNavbar);

<<<<<<< HEAD
  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          
      },
      controller: NavbarController
    };
=======
    /** @ngInject */
    function acmeNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {
                creationDate: '='
            },
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };
>>>>>>> timers

        return directive;

        /** @ngInject */
        function NavbarController(moment) {
            var vm = this;

<<<<<<< HEAD
=======
            // "vm.creationDate" is available by directive option "bindToController: true"
            vm.relativeDate = moment(vm.creationDate).fromNow();
        }
>>>>>>> timers
    }

})();
