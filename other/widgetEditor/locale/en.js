(function () {
    'use strict';

    angular
        .module('boardio.widgetEditor')
        .config(function ($translateProvider) {
            $translateProvider.translations('en', {
                '_DATA_SOURCE_': {
                    'TITLE': 'Data units',
                    'ADD': 'Add data unit',
                    'EDIT': 'Edit data unit',
                    'TOTAL_RESULTS': '{totalResults, plural, one {one data unit} other {# data units}}',
                    'DELETE_CONFIRMATION': 'Do you really want to delete this data unit?',
                    'NAME': 'Name',
                    'ITEMS_COUNT': 'Items count',
                    'UPDATED_AT': 'Refreshed at',
                    'ADD_DATA_TITLE': 'Add data',
                    'ADD_DATA_BUTTON': 'Add data',
                    'IMPORT': 'Data unit import',
                    'ADD_MORE_CONNECTIONS': 'Add more connections',
                    'EXTERNAL_DATABASE': 'External database',
                    'EXTERNAL_DATABASE_OVER_SSH': 'External database over ssh',
                    'GOOGLE_DRIVE': 'Google Drive',
                    '_IMPORT_': {
                        'FILE_NAME': 'File name',
                        'NEW_DATA':'Import new data',
                        'CHOOSE_EXISTING': 'Choose existing data',
                        'FORMULA': 'Formula',
                        'RECENT': 'Recent'
                    },
                    'CREATE_WIDGET': 'Create widget'
                }
            });
        })
    ;
}());
