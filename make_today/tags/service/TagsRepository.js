(function () {
    'use strict';

    angular
        .module('pbs.crm.tags')
        .factory('TagsRepository', TagsRepository);

    function TagsRepository ($pbsRestRepository, ENV) {
        var repository = new $pbsRestRepository('tags');

        repository.getApiBase = function () {
            return ENV.apiBase();
        };

        return repository;
    }
}());