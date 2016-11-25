(function () {
    'use strict'
    let healthAdmin = angular.module('healthAdmin', ["ui.router"]);


    healthAdmin.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 'apiProvider', function ($httpProvider, $stateProvider, $urlRouterProvider, apiProvider) {
        apiProvider.healthIMSite = 'http://www.fz.ideafirst.com.cn/'; // 'http://localhost:8880/'; //  
        apiProvider.IMSite = 'http://www.fz.ideafirst.com.cn:8080/';
        $httpProvider.defaults.withCredentials = true;//跨域请求
        $stateProvider
            .state("login", {   //  用户管理=》医生
                url: "/login",
                templateUrl: "/app/login/login.html",
                controller: "loginCtr",
            })
            .state("doctor_list", {   //  用户管理=》医生
                url: "/doctors",
                templateUrl: "/app/user/doctor_list.html",
                controller: "doctorListCtr",
            })
           .state('doctor_list.coin_detail', {
               url: "/coin_detail?doctorId",
               templateUrl: "/app/finance/coindetail_list.html",
               controller: "coinDetailListCtr"
           })
            .state("patient_list", {    // 用户管理=》患者
                url: "/patients",
                templateUrl: "/app/user/patient_list.html",
                controller: "patientListCtr"
            })
            .state('exchanges', {   //财务管理=》提现审核
                url: "/exchanges?action",
                templateUrl: '/app/finance/exchanges_list.html',
                controller: 'exchangeCtr'
            })
            .state('exchanges.review', {   //财务管理=》提现审核
                url: "/review?id",
                templateUrl: '/app/finance/review.html',
                controller: 'reviewCtr'
            })
            .state("exchanges.coin_detail", {    //财务管理=》提现审核=》对应的医生收入明细
                url: "/coin_detail?doctorId",
                templateUrl: "/app/finance/coindetail_list.html",
                controller: "coinDetailListCtr",
            })
            .state("pay_list", {    //财务管理=》待付款列表=》对应的系统的待付款列表
                url: "/pay_list",
                templateUrl: "/app/finance/pay_list.html",
                controller: "payListCtr"
            })
            .state("pay", {    //财务管理=》付款=》对应的待付款详情
                url: "/pay?id",
                templateUrl: "/app/finance/pay.html",
                controller: "payCtr"
            })
            .state('orders', {     //订单管理
                url: '/orders',
                templateUrl: '/app/order/order.html',
                controller: "orderCtr"
            })
        .state('consultings', {
            url: '/consultings',
            templateUrl: '/app/consulting/consulting_list.html',
            controller: 'consultingListCtr'
        })
        .state('consultings.detail', {
            url: '/consulting_detail?id',
            templateUrl: '/app/consulting/consulting_detail.html',
            controller: 'consultingDetailCtr'
        });

        $urlRouterProvider.otherwise('doctors');
    }]);

    healthAdmin.run([function () { }]);
})()