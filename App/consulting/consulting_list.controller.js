{
    'use strict'
    angular.module('healthAdmin')
    .controller('consultingListCtr', ['$scope', '$timeout', 'healthAdminConstant', 'api', 'common',
        function ($scope, $timeout, healthAdminConstant, api, common) {

            let changeTab = (status) => {
                $scope.filterData.status = status;
                searchConsultings();
            };

            let getConsulting = () => {
                api.getConsultings($scope.filterData, $scope.currentPage, $scope.pageSize).then(function (data) {
                    $scope.consultings = data.Items;
                    $scope.count = data.Count;
                })
            };

            let searchConsultings = (pageIndex) => {
                $scope.currentPage = pageIndex || 0;
                getConsulting();
            }


            $scope.filterData = {
                startTime: null,
                endTime: null,
                keywords: '',
                status: 0
            };
            $scope.pageSize = healthAdminConstant.pageSize;
            $scope.currentPage = 0;
            $scope.count = 0;
            $scope.consultings = [];

            $scope.getDatetime = common.getDatetime;
            $scope.gender = healthAdminConstant.gender;
            $scope.doctorTitle = healthAdminConstant.doctorTitle;
            $scope.CType = healthAdminConstant.CType;
            $scope.serviceType = healthAdminConstant.serviceType;
            $scope.consultingStatus = healthAdminConstant.consultingStatus;
            $scope.titleGrade = healthAdminConstant.titleGrade;

            $scope.changeTab = changeTab;
            $scope.searchConsultings = searchConsultings;


            $timeout(getConsulting, 0);

        }]);
}