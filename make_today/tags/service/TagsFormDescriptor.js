(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .factory('TagsFormDescriptor', TagsFormDescriptor);

    function TagsFormDescriptor (TagsRepository, TagTypesRepository, $translate) {
        return function () {
            return {
                create: {
                    url: TagsRepository.getUrl(),
                    title: $translate.instant('_TAGS_.ADD')
                },
                update: {
                    url: TagsRepository.getUrl(':id'),
                    title: $translate.instant('_TAGS_.EDIT')
                },
                fields: [
                    {
                        name: 'name',
                        label: $translate.instant('_TAGS_.NAME'),
                        type: 'input'
                    },
                    {
                        name: 'tagType',
                        label: $translate.instant('_TAGS_.TYPE_TAG'),
                        type: 'select',
                        data: TagTypesRepository.getDictionary(),
                        selectKey: '_id'
                    }
                ]
            };
        };
    }
}());
