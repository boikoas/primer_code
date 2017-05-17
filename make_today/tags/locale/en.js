(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .config(function ($translateProvider) {
            $translateProvider.translations('en', {
                'TAG': 'Tag',
                'TAGS': 'Tags',
                '_TAGS_': {
                    'TITLE': 'Tags',
                    'LIST': 'List tags',
                    'ADD': 'Add tag',
                    'EDIT': 'Edit tag',
                    'TOTAL_RESULTS': '{totalResults, plural, one {one tag} other {# tags}}',
                    'DELETE_CONFIRMATION': 'Do you really want to delete this tag?',
                    'NAME': 'Name',
                    'TYPE_TAG': 'Type tag'
                }
            });
        })
    ;
}());
