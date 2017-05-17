(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .factory('TagTypesGridDescriptor', TagTypesGridDescriptor);

    function TagTypesGridDescriptor (TagTypesRepository, $translate) {
        return function () {
            return {
                name: 'tag-types-list',
                columns: getGridColumns(),
                filters: false,
                size: 25,
                getDataFunction: TagTypesRepository.query.bind(TagTypesRepository),
                dataDefaultParams: {},
                totalResultsText: '_TAG_TYPES_.TOTAL_RESULTS',
                formDescriptor: 'TagTypesFormDescriptor',
                deleteFunction: function (entityId) {
                    return TagTypesRepository.delete(entityId);
                },
                deleteConfirmationText: '_TAG_TYPES_.DELETE_CONFIRMATION'
            };

            ///////////

            function getGridColumns () {
                return [
                    {
                        field: 'name',
                        title: $translate.instant('_TAG_TYPES_.NAME'),
                        sortable: 'name',
                        show: true
                    },
                    {
                        field: 'color',
                        title: $translate.instant('_TAG_TYPES_.COLOR'),
                        sortable: 'color',
                        show: true
                    },
                    {
                        field: 'actions',
                        title: $translate.instant('ACTIONS'),
                        show: true
                    }
                ];
            }

        };
    }
}());
