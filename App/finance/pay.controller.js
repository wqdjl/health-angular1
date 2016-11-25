(function () {
    'use strict'
    angular.module('healthAdmin')
    .controller('payCtr', ['$stateParams', '$scope', '$sce', 'api', 'common', 'healthAdminConstant', function ($stateParams, $scope,$sce, api, common, healthAdminConstant) {
        let id = $stateParams['id'];
        let batchPayment = localStorage.getItem(id);
        if (batchPayment) {
            $scope.batch = JSON.parse(batchPayment);
            localStorage.removeItem(id);
        } else {
            api.getExchangePaymentBatch(id).then(function (data) {
                $scope.batch = data;
            });
        }
        $scope.getDatetime = common.getDatetime;
        $scope.exchangePaymentBatchStatus = healthAdminConstant.exchangePaymentBatchStatus;
        //$scope.videoUrl = $sce.trustAsResourceUrl(videoUrl);
        $scope.action =   $sce.trustAsResourceUrl(api.healtIMSite + '/Exchanges/Payment');
    }]);
})();