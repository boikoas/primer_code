angular
    .module('donii')
    .component('nonprofitCatalog', {
        templateUrl: 'app/components/nonprofitCatalog/partial/_nonprofit-catalog.html',
        controllerAs: 'vm',
        controller: function ($mdDialog, $mdSidenav, $stateParams, searchService, $scope, categoryService, issueAreaService, _) {
            let vm = this;
            vm.issueAreas = [];
            let searchParams = {
                category: undefined,
                recipient: {
                    accepted_condition: undefined,
                    accepted_gender: undefined,
                    accepted_age: undefined,
                    accepted_issue: undefined
                }
            };
            vm.$onInit = onInit;
            vm.closeSideNav = closeSideNav;
            vm.onFiltersChange = onFiltersChange;
            vm.loaded = false;
            vm.nonprofits = undefined;
            vm.filter = {
                gender: undefined,
                age: undefined,
                condition: undefined,
                issueAreas: undefined,
                category: undefined
            };
            vm.filterTypes = {
                childs: [
                    {
                        name: 'Boy',
                        value: 'Male',
                        restriction: false
                    },
                    {
                        name: 'Girl',
                        value: 'Female',
                        restriction: false
                    }
                ],
                typesGender: [
                    {
                        name: 'Man',
                        value: 'Male',
                    },
                    {
                        name: 'Women',
                        value: 'Female'
                    },
                    {
                        name: 'Any Gender',
                        value: 'Any'
                    },
                    {
                        name: 'Child',
                        value: 'Child'
                    }
                ],
                allAges: [
                    'Baby (<1 year)',
                    'Toddler (1 - 3)',
                    'Child (4 - 12)',
                    'Teen (13 - 18)',
                ],
                conditions: ['New', 'Gently used'],
                category: [],
                issueAreas: []
            };
            ////////////////////////////////////////////////
            function onInit() {
                if ($stateParams.whoIsItFor !== null && $stateParams.whoIsItFor !== undefined) {
                    searchParams.recipient.accepted_gender = $stateParams.whoIsItFor;
                }
                if ($stateParams.condition !== null && $stateParams.condition !== undefined) {
                    searchParams.recipient.accepted_condition = $stateParams.condition;
                }

                if ($stateParams.age !== null && $stateParams.age !== undefined) {
                    searchParams.recipient.accepted_age = $stateParams.age;
                }
                issueAreaService
                    .getAll()
                    .then(function (data) {
                        if ($stateParams.issueAreas !== null && $stateParams.issueAreas !== undefined) {
                            let tempIssueArray = [];
                            angular.forEach(data, function (item) {
                                angular.forEach($stateParams.issueAreas.split(','), function (stateItem) {
                                    if (item.id == stateItem) {
                                        tempIssueArray.push(item);
                                    }
                                })
                            });
                            vm.issueAreas = tempIssueArray;
                        }
                        vm.filterTypes.issueAreas = data;
                    });

                categoryService
                    .getAllParentCategories()
                    .then(function (responce) {
                        closeSideNav();
                        vm.filterTypes.categories = responce;
                        if ($stateParams.categoryId !== null && $stateParams.categoryId !== undefined) {
                            let oneCategory = getSingleCategory($stateParams.categoryId);
                            vm.filter.category = oneCategory;
                            searchParams.category = oneCategory;
                            if (oneCategory.acceptable_age.length > 0 || oneCategory.acceptable_gender.length > 0) {
                                addFiltersRestriction();
                            }
                        }
                        loadNonprofits();
                    });
            }

            function addFiltersRestriction() {
                vm.filterTypes.typesGender = [];
                vm.filterTypes.allAges = [];
                if (searchParams.category.acceptable_gender.length > 0) {
                    angular.forEach(searchParams.category.acceptable_gender, function (item) {
                        if (item === "Male") {
                            vm.filterTypes.typesGender.push({
                                name: 'Man',
                                value: 'Male'
                            });
                        }
                        if (item === "Female") {
                            vm.filterTypes.typesGender.push({
                                name: 'Women',
                                value: 'Female'
                            });
                        }
                        if (item === "Any") {
                            vm.filterTypes.typesGender.push({
                                name: 'Any Gender',
                                value: 'Any'
                            });
                        }
                    });
                }
                if (searchParams.category.acceptable_age.length > 0) {
                    vm.filterTypes.allAges = searchParams.category.acceptable_age;
                    vm.filterTypes.typesGender.push({
                        name: 'Child',
                        value: 'Child'
                    });
                }
            }

            function onFiltersChange(filter) {
                vm.filter = filter;
                changeFilter();
                if (vm.filter.age !== undefined) {
                    vm.filter.gender = 'Child';
                    vm.filter.age = undefined;
                }
            }

            function changeFilter() {
                if (vm.filter.gender !== undefined) {
                    searchParams.recipient.accepted_gender = vm.filter.gender;
                }
                if (vm.filter.age !== undefined) {
                    searchParams.recipient.accepted_age = vm.filter.age;
                }
                if (vm.filter.condition !== undefined) {
                    searchParams.recipient.accepted_condition = vm.filter.condition;
                }
                if (vm.filter.issueAreas !== undefined) {
                    searchParams.recipient.accepted_issue = vm.filter.issueAreas;
                }
                if (vm.filter.category !== undefined) {
                    searchParams.category = vm.filter.category;
                }
                setStateParams();
            }

            function getSingleCategory(id) {
                let findCategory = null;
                angular.forEach(vm.filterTypes.categories, function (items) {
                    angular.forEach(items.categories, function (item) {
                        if (item.id == id) {
                            findCategory = item;
                            return;
                        }
                    });
                });
                return findCategory;
            }

            function loadNonprofits() {
                searchService.reset();
                if (searchParams.category !== undefined) {
                    searchService.addCategory(searchParams.category);
                }
                if (searchParams.recipient.accepted_condition !== undefined) {
                    searchService.addAcceptedCondition(searchParams.recipient.accepted_condition);
                }
                if (searchParams.recipient.accepted_gender !== undefined) {
                    searchService.addAcceptedGender(searchParams.recipient.accepted_gender);
                }
                if (searchParams.recipient.accepted_age !== undefined) {
                    searchService.addAcceptedAge(searchParams.recipient.accepted_age);
                }
                if (searchParams.recipient.accepted_issue !== undefined) {
                    angular.forEach(searchParams.recipient.accepted_issue, function (item) {
                        searchService.addIssueArea(item);
                    })
                }
                searchService.updateResults().then(function (data) {
                    $scope.$broadcast('nonprofits-ready', data);
                    vm.nonprofitsLength = data.length;
                    vm.nonprofits = _.chunk(data, 2);
                    vm.loaded = true;
                });
            }

            function setStateParams() {
                //save params to $state
                if (vm.filter.gender !== undefined) {
                    $stateParams.whoIsItFor = vm.filter.gender;
                }
                if (vm.filter.age !== undefined) {
                    $stateParams.age = vm.filter.age;
                }
                if (vm.filter.condition !== undefined) {
                    $stateParams.condition = vm.filter.condition;
                }
                if (vm.filter.category !== undefined) {
                    $stateParams.categoryId = vm.filter.category;
                }
                if (vm.filter.issueAreas !== undefined) {
                    let tempIssueAreasId = [];
                    angular.forEach(vm.filter.issueAreas, function (item) {
                        tempIssueAreasId.push(item.id);
                    });
                    $stateParams.issueAreas = tempIssueAreasId.join(',');
                }
                loadNonprofits();
            }

            function closeSideNav() {
                $mdSidenav('nonprofit-catalog-sidenav').close();
            }

        }
    });