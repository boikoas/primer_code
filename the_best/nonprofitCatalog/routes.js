(function () {
    'use strict';

    angular
        .module('donii')
        .config(function ($stateProvider) {
            $stateProvider
                .state('index.nonprofit-catalog', {
                    url: 'nonprofit-catalog?categoryId&whoIsItFor&age&condition&issueAreas',
                    views: {
                        "header@index": {
                            templateUrl: 'app/shared/layout/_header.third.html'
                        },
                        "content@index": {
                            component: 'nonprofitCatalog'
                        },
                        "navigation@index.nonprofit-catalog": {
                            templateUrl: 'app/shared/navigation/_navigation.html'
                        }
                    }
                })
        });
}());