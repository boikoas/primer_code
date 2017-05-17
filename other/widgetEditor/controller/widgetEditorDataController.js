(function () {
    'use strict';

    angular
        .module('boardio.widgetEditor')
        .controller('widgetEditorDataController', widgetEditorDataController);
    function widgetEditorDataController (
        $stateParams
    ) {
        this.dashboardId = $stateParams.dashboard;
        this.dashboardDataSourceId = $stateParams.datasource;
        this.widgetType='SINGLE_VALUE';

    };
    }());
