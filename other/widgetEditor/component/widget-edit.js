(function () {
    'use strict';

    angular
        .module('boardio.widgetEditor')
        .component('widgetEdit', {
            bindings: {
                dashboard: '<',
                widgetType:'=',
                widgetName:'@',
                dataSource:'<',
                widgetId:'<?',
                widgetSizeSetting: '='
            },
            controllerAs: 'vm',
            templateUrl: 'app/widgetEditor/partial/widget-edit.html',
            controller: function ($scope, $pbsPreloader, $q, $translate,$http, ENV, DataSourceManager,Widget, Preloader,WidgetManager,WIDGET_REGISTRY,
                                  WIDGET_EVENTS, $location,  $compile, $rootScope,Dashboard, WidgetRepository, $state,$timeout)
            {
                var vm = this;
                var excludeWidgetTypes = ['TEXT'];
                vm.dimensions = [];
                vm.widgetTypes = getTypes(excludeWidgetTypes);
                vm.PRELOADER_FLAG = 'widget.form';
                $scope.onSuccess = onSuccess;
                vm.onWidgetTypeChange = onWidgetTypeChange;
                vm.applySize = applySize;
                vm.applyNameByDataSource = applyNameByDataSource;
                vm.$onChanges=onChanges;
                vm.$onInit=activate;
                //////////////////////////

                function onChanges() {
                    if (vm.dataSource) {
                        if (vm.widgetId != undefined) {
                            vm.method = 'PATCH';
                            vm.url = ENV.dashboardsApiBase() + 'widgets/' + vm.widgetId;
                            $scope.widget.type = vm.widgetType;
                            loadAll();
                        } else {
                            vm.method = 'POST';
                            vm.url = ENV.dashboardsApiBase() + 'widgets';
                            $scope.widget.dashboard = ENV.dashboardsApiBase() + 'dashboards/' + vm.dashboard;
                            $scope.widget.dataSource = vm.dataSource._id;
                            $scope.widget.name = vm.widgetName;
                            $scope.datasourceName = vm.widgetName;
                            $scope.widget.type = vm.widgetType;
                            loadAll();
                        }
                    }
                }


                function activate () {
                    Preloader.show(vm.PRELOADER_FLAG);
                    vm.dashboards=[];
                    vm.dataSources = [];

                    Dashboard.search({size: 1000, sort: 'orderBy'}).$promise
                        .then(function(response) {
                            vm.dashboards= response;
                        });

                    if(vm.widgetId!=undefined){
                        vm.method = 'PATCH';
                        vm.url = ENV.dashboardsApiBase() + 'widgets/'+vm.widgetId;
                        $http.get(vm.url).then(function successCallback(responce) {
                            $scope.widget=responce.data;
                            $scope.datasourceName = vm.widgetName;
                            loadAll();
                        });
                    } else {
                        $scope.widget = {
                            position: {
                                x: -1,
                                y: -1
                            },
                            settings: {
                                dateFit: true
                            },
                            dimensions: {}
                        };
                        vm.method = 'POST';
                        vm.url = ENV.dashboardsApiBase() + 'widgets';
                        $scope.widget.dashboard = ENV.dashboardsApiBase()+'dashboards/'+vm.dashboard;
                        $scope.widget.dataSource = vm.dataSource._id;
                        $scope.widget.name=vm.widgetName;
                        $scope.datasourceName = vm.widgetName;
                        $scope.widget.type = vm.widgetType;
                        loadAll();
                    }


                }

                function loadAll() {
                    onWidgetTypeChange();
                    updatePreviewSubscription();
                    Preloader.hide(vm.PRELOADER_FLAG);
                }

                function applyNameByDataSource () {
                    angular.forEach(vm.dataSources.items, function (ds) {
                        if (ds._id === $scope.widget.dataSource) {
                            $scope.datasourceName = ds.name;
                        }
                    });
                }

                function getTypes (exclude) {
                    var exclude = exclude ? exclude : [];
                    var types = [];

                    angular.forEach(WIDGET_REGISTRY, function (widgetMetaData) {
                        if(exclude.indexOf(widgetMetaData.dbType) === -1){
                            types.push(widgetMetaData.dbType);
                        }
                    });

                    return types;
                }
                function onWidgetTypeChange () {
                    reloadSizes();
                    setFirstSize();
                }

                function reloadSizes () {
                    vm.widgetType=$scope.widget.type;
                    vm.widgetSizes = WidgetManager.getCompiledSizes(
                        WidgetManager.fetchWidgetType($scope.widget.type)
                    );
                }
                function setFirstSize () {
                    if(!vm.widgetSizeSetting) {
                        vm.widgetSizeSetting = {};
                    }
                    if(!vm.widgetSizeSetting[vm.widgetType]) {
                        vm.widgetSizeSetting[vm.widgetType] = [vm.widgetSizes[0].key, vm.widgetSizes[0].width, vm.widgetSizes[0].height];
                    }
                    $scope.widget.sizeKey = vm.widgetSizeSetting[vm.widgetType][0];
                    $scope.widget.size = {
                        width : vm.widgetSizeSetting[vm.widgetType][1],
                        height : vm.widgetSizeSetting[vm.widgetType][2]
                    };
                }
                function onSuccess () {
                    $rootScope.$broadcast(WIDGET_EVENTS.UPDATED);
                    $scope.widget = {};
                    $state.go("app.showDashboard", {id:vm.dashboard});
                }
                function applySize () {
                    angular.forEach(vm.widgetSizes, function (size) {
                        if ($scope.widget.sizeKey === size.key) {
                            vm.widgetSizeSetting[vm.widgetType][0] = size.key;
                            vm.widgetSizeSetting[vm.widgetType][1] = size.width;
                            vm.widgetSizeSetting[vm.widgetType][2] = size.height;
                            $scope.widget.size = {
                                width : size.width,
                                height : size.height
                            };
                            if ($scope.widget.resize) {
                                $scope.widget.resize();
                            }
                        }
                    });
                }

                function updatePreviewSubscription () {
                    $scope.$watch('widget.dataSource', function () {
                        reloadWidgetData();
                    });

                    $scope.$watch('widget.type', function () {
                        updatePreview();
                    });

                    $scope.$watchCollection('widget.settings', function () {
                        reloadWidgetData();
                    });
                }
                function updatePreview () {
                    if ($scope.widget.type) {
                        var html = $compile('<widget widget="widget"></widget>')($scope);
                        angular.element('.widget-preview').html(html);
                        reloadWidgetData();
                    }
                }

                function reloadWidgetData () {
                    if (!($scope.widget.type && $scope.widget.dataSource)) {
                        return;
                    } else {
                        if (vm.dataSource) {
                            //необходимо для проверки прав, брал пример с Widget_Form_Factory
                            $scope.widget.dataSourceResponseStatus = "200";
                            $timeout(function () {
                                if ($scope.widget.update) {
                                    $scope.widget.update(vm.dataSource);
                                }
                            }, 1);
                        } else {
                            var dataSourceLink = $scope.widget.dataSource + '?projection=exp_data_source';
                            $http.get(dataSourceLink)
                                .then(
                                    function (response) {
                                            if ($scope.widget.update) {
                                                $scope.widget.update(response.data);
                                            }
                                        vm.dimensions = response.data.sourceDimensions;
                                        $scope.widget.dataSourceResponseStatus = response.status;
                                    }
                                );
                        }
                    }
                }
            }
        });
}());
