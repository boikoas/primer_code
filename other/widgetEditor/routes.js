(function () {
    'use strict';

    angular
        .module('boardio.widgetEditor')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.widgetEditor', {
                    url: '/widgeteditor?dashboard&datasource',
                    views: {
                        'appLayoutContent': {
                            templateUrl: 'app/widgetEditor/partial/index.html',
                            controller:   'widgetEditorDataController',
                            controllerAs: 'vm'
                        }
                    }
                })
        });
}());
