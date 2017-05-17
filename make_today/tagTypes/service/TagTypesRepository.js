(function () {
    'use strict';

    angular
        .module('pbs.crm.tagTypes')
        .factory('TagTypesRepository', TagTypesRepository);

    function TagTypesRepository ($pbsRestRepository, ENV) {
        var repository = new $pbsRestRepository('tagTypes');

        repository.getApiBase = function () {
            return ENV.apiBase();
        };

        return repository;
    }
}());