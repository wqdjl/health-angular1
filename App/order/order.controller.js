(function() {
    'use strict';
    let app = angular.module('healthAdmin');
    app.controller('orderCtr', [
        "$scope", "api", '$rootScope', '$timeout', 'common', 'healthAdminConstant',
        function ($scope, api, $rootScope, $timeout, common, healthAdminConstant) {
            $rootScope.aside = 'orders';
            let getOrderList=function() {
                api.getOrderList($scope.filterData, $scope.currentPage, $scope.pageSize).then(function (data) {
                    $scope.orders = data.Items;
              
                    $scope.count = data.Count;

                });

            }

            let serchOrders = function (pageIndex) {
                $scope.currentPage = pageIndex || 0;
                getOrderList();
               
            };
            let searchStatus=function(status) {
                $scope.filterData.status = status;
                serchOrders();
            }
  
            $scope.filterData = {
                keywords: '',
                status:0,
                startTime: null,
                endTime:null
            };
            $scope.pageSize = healthAdminConstant.pageSize;
            $scope.currentPage = 0;
            $scope.count = 0;

            $scope.orders = [];
            $scope.serchOrders = serchOrders;
            $scope.searchStatus = searchStatus;
            $scope.orderServiceType = healthAdminConstant.orderServiceType;
            $scope.paymentStatus = healthAdminConstant.paymentStatus;
            $scope.getDatetime = common.getDatetime;
            $timeout(getOrderList, 0); //所有的directive执行完在去初始化数据

        }]);
})();