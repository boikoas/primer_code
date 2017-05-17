angular
    .module('donii')
    .component('nonprofitCatalogList', {
        templateUrl: 'app/components/nonprofitCatalog/partial/_nonprofit-catalog-list.html',
        controllerAs: 'vm',
        bindings: {
            nonprofits: '<',
            nonprofitsLength: '<',
            loaded: '<'
        },
        controller: function ($mdSidenav) {
            let vm = this;
            //////////////////////////////////////
            vm.openSideNav = openSideNav;
            /////////////////////////////////////
            function openSideNav() {
                $mdSidenav('nonprofit-catalog-sidenav').toggle();
            }
        }
    });