(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .factory('TagsGridDescriptor', TagsGridDescriptor);

    function TagsGridDescriptor (TagsRepository, $translate) {
        return function () {
            return {
                name: 'tags-list',
                columns: getGridColumns(),
                filters: false,
                size: 25,
                getDataFunction: TagsRepository.query.bind(TagsRepository),
                dataDefaultParams:  {
                projection: 'expanded_tag'
                },
                totalResultsText: '_TAGS_.TOTAL_RESULTS',
                formDescriptor: 'TagsFormDescriptor',
                deleteFunction: function (entityId) {
                    return TagsRepository.delete(entityId);
                },
                deleteConfirmationText: '_TAGS_.DELETE_CONFIRMATION'
            };

            ///////////

            function getGridColumns () {
                return [
                    {
                        field: 'id',
                        title: $translate.instant('ID'),
                        sortable: 'id',
                        show: true
                    },
                    {
                        field: 'name',
                        title: $translate.instant('_TAGS_.NAME'),
                        sortable: 'name',
                        show: true
                    },
                    {
                        field: 'tagType',
                        title: $translate.instant('_TAGS_.TYPE_TAG'),
                        show: true
                    },
                    {
                        field: 'actions',
                        title: $translate.instant('ACTIONS'),
                        show: true
                    }
                ];
            }

            function getFilters () {
                return [
                    {
                        field: 'id',
                        label: $translate.instant('ID'),
                        type: 'text'
                    },
                    {
                        field: 'name',
                        label: $translate.instant('_TAGS_.NAME'),
                        type: 'text'
                    }
                ];
            }
        };
    }
}());
