(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .factory('TagTypesFormDescriptor', TagTypesFormDescriptor);

    function TagTypesFormDescriptor (TagTypesRepository, $translate) {
        return function () {
            return {
                create: {
                    url: TagTypesRepository.getUrl(),
                    title: $translate.instant('_TAG_TYPES_.ADD')
                },
                update: {
                    url: TagTypesRepository.getUrl(':id'),
                    title: $translate.instant('_TAG_TYPES_.EDIT')
                },
                fields: [
                    {
                        name: 'name',
                        label: $translate.instant('_TAG_TYPES_.NAME'),
                        type: 'input'
                    },
                    {
                        name: 'color',
                        label: $translate.instant('_TAG_TYPES_.COLOR'),
                        type: 'colorpicker'
                    }
                ]
            };
        };
    }
}());
