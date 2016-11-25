(function () {
    'use strict';
    let app = angular.module('healthAdmin');

    app.controller('doctorListCtr', ["$scope", "api", '$rootScope', '$timeout', 'common', 'healthAdminConstant', function ($scope, api, $rootScope, $timeout, common, healthAdminConstant) {
        $rootScope.aside = 'doctors'
       
        let getDoctorList = function () {     
            api.getDoctorList($scope.filterData, $scope.currentPage, $scope.pageSize).then(function (data) {
                $scope.doctors = data.Items;
                $scope.count = data.Count; 
            });
        }
        let searchDoctors = function (pageIndex) {
            $scope.currentPage = pageIndex || 0;
            getDoctorList();
        };

        $scope.filterData = {
            keywords: '',
            startTime: new Date(),
            endTime: new Date(),
        };

        $scope.pageSize = healthAdminConstant.pageSize;  //页码大小
        $scope.currentPage = 0;
        $scope.count = 0;
        $scope.pageTotal = 0;
        $scope.showPages = [];   //显示的页码
        $scope.doctors = [];
        $scope.searchDoctors = searchDoctors;
        $scope.gender = healthAdminConstant.gender;
        $scope.doctorTitle = healthAdminConstant.doctorTitle;
        $scope.getDatetime = common.getDatetime;

        
        $timeout(function () {
        getDoctorList();
        }, 0); //所有的directive执行完在去初始化数据


    }]);
})()