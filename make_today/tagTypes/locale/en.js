(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .config(function ($translateProvider) {
            $translateProvider.translations('en', {
                '_TAG_TYPES_': {
                    'TITLE': 'Type tags',
                    'ADD': 'Add type tag',
                    'EDIT': 'Edit type tag',
                    'TOTAL_RESULTS': '{totalResults, plural, one {# type tag} few {# type tags} other {# type tags}}',
                    'DELETE_CONFIRMATION': 'Do you really want to delete this type tag?',
                    'NAME': 'Name',
                    'COLOR': 'Color'
                }
            });
        })
    ;
}());
