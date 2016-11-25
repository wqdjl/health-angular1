(function () {
    'use strict'
    angular.module('healthAdmin').
    controller('reviewCtr', ['$scope', '$stateParams','$state', 'api', function ($scope, $stateParams,$state, api) {
        let id = $stateParams.id;
        let review = function () {
            api.putExchange(id, $scope.status, $scope.reason).then(function () {
                $scope.$parent.serchExchanges($scope.$parent.currentPage);
                $state.go('exchanges', { action: 'review' });
            });
        };
        let refuse = function () {
            if (!$scope.reason) {
                alert('请输入拒绝的理由');
                return;
            }
            $scope.status = 50;
            review();
        };
        let allow = function () {
            $scope.status = 20;
            review();
        };
        let close = function () {
           // $scope.isShowPop = false;
            window.history.go(-1);
        };

        let selectedReasonChange = function () {
            $scope.reason = $scope.selectedReason;
        };

        $scope.isShowPop  =true;
        $scope.reason = '';
        $scope.status = '';
        $scope.selectedReason = '';

        $scope.selectedReasonChange = selectedReasonChange;
        $scope.allow = allow;
        $scope.refuse = refuse;
        $scope.close = close;
    }]);
})()