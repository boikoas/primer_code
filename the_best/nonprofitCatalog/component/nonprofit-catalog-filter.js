angular
    .module('donii')
    .component('nonprofitCatalogFilter', {
        templateUrl: 'app/components/nonprofitCatalog/partial/_nonprofit-catalog-filter.html',
        controllerAs: 'vm',
        bindings: {
            filter: '<',
            filterTypes: '<',
            issueAreas: '<',
            nonprofitsLength: '<',
            onFiltersChange:'&'
        },
        controller: function ($mdDialog, $scope, $q, filterFilter) {
            let vm = this;
            //////////////////////////////////////
            vm.changeFilter = changeFilter;
            vm.openMenu = openMenu;
            vm.setAgeToChild = setAgeToChild;
            vm.getMatches= getMatches;
            /////////////////////////////////////
            function changeFilter() {
                if (vm.filter.gender!=='Child') {
                    vm.filter.issueAreas=vm.issueAreas;
                    vm.onFiltersChange({$event:vm.filter});
                }
            }

            function openMenu($mdMenu, ev) {
                $scope.originatorEv = ev;
                $mdMenu.open(ev);
            }

            function setAgeToChild(genderChild, age) {
                vm.filter.gender = genderChild;
                vm.filter.age = age;
                changeFilter();
            }

            function getMatches(query) {
                if (query) {
                    return $q.when(filterFilter(vm.filterTypes.issueAreas, query));
                } else {
                    return $q.when(vm.filterTypes.issueAreas);
                }
            }
        }
    });