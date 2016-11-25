(function () {
    'use strict';
    let app = angular.module('healthAdmin');

    app.controller('patientListCtr', ["$scope", "api", '$rootScope', '$timeout', 'common', 'healthAdminConstant', function ($scope, api, $rootScope, $timeout, common, healthAdminConstant) {
        let getPatientList = function () {
            api.getPatientList($scope.filterData, $scope.currentPage, $scope.pageSize).then(function (data) {
                $scope.patients = data.Items;
                $scope.count = data.Count;
                
            });
        }

        let searchPatient = function (pageIndex) {
            $scope.currentPage = pageIndex ||0;
            getPatientList();
        };

        $scope.filterData = {
            keywords: '',
            startTiem: null,
            endTime: null
        };

        $scope.pageSize = healthAdminConstant.pageSize; //页码大小
        $scope.currentPage = 0;
        $scope.count = 0;
        $scope.patients = [];
        $scope.searchPatient = searchPatient;
        $scope.gender = healthAdminConstant.gender;
        $scope.getDate = common.getDate;
        $scope.getDatetime = common.getDatetime;
        $scope.getAge = common.getAge;
        $timeout(getPatientList, 0); //所有的directive执行完在去初始化数据
    }]);
})()