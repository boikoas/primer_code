(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.tagTypes', {
                    url: '/tag-types',
                    views: {
                        'appLayoutContent': {
                            templateUrl: 'app/tagTypes/partial/index.html'
                        }
                    }
                })
        });
}());