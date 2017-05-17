(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .config(function ($translateProvider) {
            $translateProvider.translations('ru', {
                'TAG': 'Тег',
                'TAGS': 'Теги',
                '_TAGS_': {
                    'TITLE': 'Теги',
                    'LIST': 'Список тегов',
                    'ADD': 'Добавить тег',
                    'EDIT': 'Редактировать тег',
                    'TOTAL_RESULTS': '{totalResults, plural, one {# тег} few {# тега} other {# тегов}}',
                    'DELETE_CONFIRMATION': 'Вы действительно хотите удалить этот тег?',
                    'NAME': 'Название',
                    'TYPE_TAG': 'Тип тэга'
                }
            });
        })
    ;
}());
