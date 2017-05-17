(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.tags', {
                    url: '/tags',
                    views: {
                        'appLayoutContent': {
                            templateUrl: 'app/tags/partial/index.html'
                        }
                    }
                })
        });
}());