(function () {
    'use strict';

    angular
        .module('boardio.widgetEditor')
        .config(function ($translateProvider) {
            $translateProvider.translations('ru', {
                '_DATA_MARK_': {
                    'TITLE': 'Источники данных',
                    'ADD': 'Добавить источник данных',
                    'EDIT': 'Редактировать источник данных',
                    'TOTAL_RESULTS': '{totalResults, plural, one {# источник данных} few {# источника данных} other {# источников данных}}',
                    'DELETE_CONFIRMATION': 'Вы действительно хотите удалить этот источник данных?',
                    'NAME': 'Имя',
                    'ITEMS_COUNT': 'Количество объектов',
                    'UPDATED_AT': 'Время обновления',
                    'ADD_DATA_TITLE': 'Добавить данные',
                    'ADD_DATA_BUTTON': 'Добавить данные',
                    'IMPORT': 'Импорт источника данных',
                    'ADD_MORE_CONNECTIONS': 'Добавить больше соединений',
                    'EXTERNAL_DATABASE': 'Внешняя база данных',
                    'EXTERNAL_DATABASE_OVER_SSH': 'Внешняя база данных через SSH',
                    'GOOGLE_DRIVE': 'Google Drive',
                    '_IMPORT_': {
                        'FILE_NAME': 'Имя файла',
                        'NEW_DATA':'Импортировать новые данные',
                        'CHOOSE_EXISTING': 'Использовать существующие данные',
                        'FORMULA': 'Формула',
                        'RECENT': 'Недавние'
                    },
                    'CREATE_WIDGET': 'Создать показатель'
                }
            });
        })
    ;
}());
