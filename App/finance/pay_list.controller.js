(function () {
    'use strict';
    let app = angular.module('healthAdmin');

    app.controller('payListCtr', ["$scope", "api", '$rootScope', '$timeout', 'common', 'healthAdminConstant', function ($scope, api, $rootScope, $timeout, common, healthAdminConstant) {
        $rootScope.aside = 'payList'
        const pageSize = healthAdminConstant.pageSize;  //页码大小

        let getPayList = function () {   
            api.getBatchList($scope.filterData, $scope.currentPage, pageSize).then(function (data) {
                $scope.showPages = [];
                $scope.payments = data.Items;
                $scope.count = data.Count;
                $scope.pageTotal = Math.ceil($scope.count / pageSize);

                if ($scope.pageTotal == 0) {
                    $scope.currentPage = 0;
                }
                else if ($scope.currentPage > 1 && data.Items.length == 0) {
                    $scope.currentPage = $scope.pageTotal;
                    getCoinDetails();
                } else {
                    if ($scope.currentPage == 0 && $scope.pageTotal > 0) {
                        $scope.currentPage = 1;
                    }
                    $scope.showPages = common.getShowPages($scope.pageTotal, $scope.currentPage, pageSize);
                }

            });
        }
        let serchPayments = function (pageIndex) {
            $scope.currentPage = pageIndex || 0;
            getPayList();
        };

        $scope.filterData = {
            startTime: new Date(),
            endTime: new Date(),
            status:''
        };

        $scope.currentPage = 0;
        $scope.count = 0;
        $scope.pageTotal = 0;
        $scope.showPages = [];   //显示的页码
        $scope.payments = [];
        $scope.serchPayments = serchPayments;
       
        $scope.ExchangePaymentBatchStatus = healthAdminConstant.ExchangePaymentBatchStatus;
        $scope.getDatetime = common.getDatetime;


        $timeout(function () {
            getPayList();
        }, 0); //所有的directive执行完在去初始化数据


    }]);
})()