{
    'use strict'
    angular.module('healthAdmin')
    .controller('consultingDetailCtr', ['$scope', '$stateParams', 'api', 'common', function ($scope, $stateParams, api, common) {
        let consultingId=$stateParams.id;

        let getDetail = () => {
            api.getConsulting(consultingId).then((data) => {
                $scope.detail = data;
            });
        };

        let closePop = () => {
            window.history.go(-1);
        }

        let hideFaq = () => {
            $scope.faq = null;
        }

        let showFaq = (faq) => {
            $scope.faq = faq;
        }


        $scope.detail = {};
        $scope.faq = null;
        $scope.closePop = closePop;
        $scope.hideFaq = hideFaq;
        $scope.showFaq = showFaq;
        $scope.parseJson = JSON.parse;
        $scope.getDatetime = common.getDatetime;
        $scope.IMSite = api.IMSite;
        getDetail();
    }]);
}