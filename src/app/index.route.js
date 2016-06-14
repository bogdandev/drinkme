(function() {
    'use strict';

    angular
        .module('drinkme')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs:"vm"
            })
            .state('add', {
                url: '/add',
                templateUrl: 'app/main/add-event.html',
                controller: 'addEventController',
                controllerAs:"vm"
            })
            .state('manage', {
                url: '/manage',
                templateUrl: 'app/main/manage-events.html',
                controller: 'manageEventsController',
                controllerAs:"vm"
            })
        ;

        $urlRouterProvider.otherwise('/');
    }

})();
