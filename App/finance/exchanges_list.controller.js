(function () {
    'use strict'
    let app = angular.module('healthAdmin');
    app.controller('exchangeCtr', ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', '$sce', 'api', 'common', 'healthAdminConstant',
        function ($rootScope, $scope, $state, $stateParams, $timeout, $sce, api, common, healthAdminConstant) {
            $scope.pageSize = healthAdminConstant.pageSize;  //页码大小
            let action = $stateParams['action']; //review,pay ，all
            let selectedExchangeIds = [];
            let getExchanges = function () {
                api.getExchangeList($scope.filterData, $scope.currentPage, $scope.pageSize).then(function (data) {
                    $scope.exchanges = data.Items;
                    $scope.count = data.Count;
                  
                    if (action == 'pay') {
                        $scope.selectedAll = data.Count;
                        $scope.exchanges.forEach(function (exchange, index) {
                            if (!$scope.selectedIds[exchange.Id]) {
                                $scope.selectedIds[exchange.Id] = exchange;
                                $scope.selectedIds[exchange.Id]['checked'] = !!$scope.selectedIds[exchange.Id]['checked'];
                                $scope.selectedAll = false;
                            } else {
                                if (!$scope.selectedIds[exchange.Id]['checked']) {
                                    $scope.selectedAll = false;
                                }
                            }
                        });
                    }
                });
            };
            let serchExchanges = function (pageIndex) {
                if (!pageIndex) {     //search 
                    $scope.selectedIds = {};
                    $scope.totalSeleted = 0;
                    $scope.totalMoney = 0;
                }
                $scope.currentPage = pageIndex || 0;
                getExchanges();
            };
            let selectAll = function () {
                $scope.exchanges.forEach(function (exchange, index) {
                    if ($scope.selectedIds[exchange.Id]['checked'] != $scope.selectedAll) {
                        $scope.selectedIds[exchange.Id]['checked'] = $scope.selectedAll;
                        if ($scope.selectedIds[exchange.Id]['checked']) {
                            $scope.totalSeleted += 1;
                            $scope.totalMoney += $scope.selectedIds[exchange.Id].ExchangeCoins;
                        } else {
                            $scope.totalSeleted -= 1;
                            $scope.totalMoney -= $scope.selectedIds[exchange.Id].ExchangeCoins;
                        }
                    }
                });
                $scope.totalMoney = Math.abs($scope.totalMoney);
            };
            let select = function (id) {
                if ($scope.selectedIds[id]['checked']) {
                    $scope.totalSeleted += 1;
                    $scope.totalMoney += $scope.selectedIds[id].ExchangeCoins;
                    $scope.selectedAll = true;
                    $scope.exchanges.forEach(function (exchange, index) {
                        if (!$scope.selectedIds[exchange.Id]['checked']) {
                            $scope.selectedAll = false;
                            return;
                        }
                    });
                } else {
                    $scope.selectedAll = false;
                    $scope.totalSeleted -= 1;
                    $scope.totalMoney -= $scope.selectedIds[id].ExchangeCoins;
                }
                $scope.totalMoney = Math.abs($scope.totalMoney);
            };
            let pay = function (e) {
                let ids = [];
                for (let key in $scope.selectedIds) {
                    if ($scope.selectedIds[key]['checked']) {
                        ids.push($scope.selectedIds[key]["Id"]);
                    }
                }
                if (ids.length == 0) {
                    alert('请选择提现记录');
                    event.preventDefault()
                } 
            };

            if (action == 'review') {
                $scope.titleInfo = '提现审核';
            } else if (action == 'pay') {
                $scope.titleInfo = '提现付款';
            } else if (action == 'all') {
                $scope.titleInfo = '提现记录';
            }

            $scope.pageSize = healthAdminConstant.pageSize;  //页码大小
            $scope.selectedIds = {};
            $scope.filterData = {
                keywords: '',
                startTime: null,
                endTime: null,
                status: null
            };
            if (action == "review") {
                $scope.filterData.status = 10;
            } else if (action == "pay") {
                $scope.filterData.status = 20;
            } else {
                $scope.filterData.status = null;
            }
            $scope.formAction = $sce.trustAsResourceUrl(api.healthIMSite + '/Exchanges/ExchangePaymentBatchAndPay');
            $scope.action = action;
            $scope.currentPage = 0;
            $scope.count = 0;
            $scope.exchanges = [];
            $scope.totalSeleted = 0;
            $scope.totalMoney = 0;

            $scope.exchangeStatus = healthAdminConstant.exchangeStatus;
            $scope.getDatetime = common.getDatetime;

            $scope.selectAll = selectAll;
            $scope.serchExchanges = serchExchanges;
            $scope.pay = pay;
            $scope.select = select;

            $timeout(getExchanges, 0); //所有的directive执行完在去初始化数据
        }]);
})()