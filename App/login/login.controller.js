(function () {
    'use strict'
    angular.module('healthAdmin')
       .controller('loginCtr', ['$rootScope', '$scope', '$window', '$state', 'api', function ($rootScope, $scope, $window, $state, api) {
           let login = function () {
               api.login($scope.loginData).then(function () {
                   $window.location.href = '/index.html#/doctors';
                  // $location.href = '/index.html#/doctors';
                   //$state.go('doctor_list');
               });
           }


           $rootScope.aside = 'login';

           $scope.loginData = {
               userName: '',
               password: '',
               remember:false
           };
           
           $scope.login = login;
       }]);
})()