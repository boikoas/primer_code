(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .config(function ($translateProvider) {
            $translateProvider.translations('ru', {
                '_TAG_TYPES_': {
                    'TITLE': 'Типы тэгов',
                    'ADD': 'Добавить тип тэгов',
                    'EDIT': 'Редактировать тип тэгов',
                    'TOTAL_RESULTS': '{totalResults, plural, one {# тип тэгов} few {# типа Тэга} other {# типов Тэгов}}',
                    'DELETE_CONFIRMATION': 'Вы действительно хотите удалить этот тип тэга?',
                    'NAME': 'Имя',
                    'COLOR': 'Цвет'
                }
            });
        })
    ;
}());
