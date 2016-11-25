(function () {
    'use strict'
    let app = angular.module('healthAdmin');
    app.controller('coinDetailListCtr', ['$scope', "$stateParams", '$timeout', '$state', 'api', 'common', 'healthAdminConstant',
        function ($scope, $stateParams, $timeout, $state, api, common, healthAdminConstant) {
        //$stateParams 获取url参数
        let doctorId = $stateParams['doctorId'];
        let action = $stateParams['action'];
      
        let filterStatusStr = "&$filter=CoinDetailType eq '4'";  //默认是签到
        let getCoinDetails = function () {
            api.getCoinDetailList(doctorId, filterStatusStr, $scope.currentPage, $scope.pageSize).then(function (data) {
                $scope.coinDetails = data.Items;
                $scope.count = data.Count;
              
            });
        };
        let changeTab = function (tab) { //tab ,1: 签到，2：咨询收入，3：广告，4：提成
            $scope.tab = tab;
            switch (tab) {
                case 1:
                    filterStatusStr = "&$filter=CoinDetailType eq '4'";
                    break;
                case 2:
                    filterStatusStr = "&$filter=CoinDetailType le '64' and CoinDetailType ge '16'";
                    break;
                case 3:
                    filterStatusStr = "&$filter=CoinDetailType eq '1024'";
                    break;
                case 4:
                    filterStatusStr = "&$filter=CoinDetailType eq '512'";
                    break;
                default:
                    filterStatusStr = "&$filter=CoinDetailType eq '4'";
            }
            $scope.currentPage = 0;
            getCoinDetails();
        }
        let serchCoinDetails = function (pageIndex) {
            $scope.currentPage = pageIndex || 0;
            getCoinDetails();
        }
        let close = function () {
            //$scope.isShowPop = false;
            window.history.go(-1);
        };
        $scope.pageSize = 5;
        $scope.isShowPop = true;
        $scope.close = close;
        $scope.currentPage = 0;
        $scope.count = 0;
        $scope.totalPage = 0;
        $scope.coinDetails = [];
        $scope.tab = 1;
        $scope.serchCoinDetails = serchCoinDetails;
        $scope.changeTab = changeTab;
        $scope.getDatetime = common.getDatetime;

        $scope.coinDetailType = healthAdminConstant.coinDetailType;
        $scope.settlementStatus = healthAdminConstant.settlementStatus;

        $timeout(serchCoinDetails, 0);
    }]);
})()