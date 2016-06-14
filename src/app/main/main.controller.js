(function() {
  'use strict';

  angular
    .module('drinkme')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1465889176572;
    vm.showToastr = showToastr;

    activate();

    function activate() {

    }
  }
})();
