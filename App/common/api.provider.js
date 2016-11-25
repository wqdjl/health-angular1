(function () {
    'use strict'
    let app = angular.module('healthAdmin');

    app.provider('api', [function () {
        let currentProvider = this;

        this.healthIMSite = '';  //在config里面配置
        this.IMSite = '';
        this.$get = ['$http', '$q', 'common', function ($http, $q, common) {

            let httpExecute = function (url, method, data) {
                return $http({
                    url: currentProvider.healthIMSite + url,
                    method: method,
                    data: data
                }).then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log("Error=>method:" + method + ";url:" + url + ";" + error);
                    if (error.status == 401) {
                        window.location.href = '/index.html#/login';
                    } else {
                        alert(error.statusText);
                    }
                    return $q.reject(error);
                });
            };
            let httpPost = function (url, data) {
                return httpExecute(url, 'post', data);
            };
            let httpDelete = function (url) {
                return httpExecute(url, 'delete', {});
            };
            let httpPut = function (url, data) {
                return httpExecute(url, 'put', data);
            };
            let httpGet = function (url, data) {
                return httpExecute(url, 'get', data);
            }

            let login = function (loginData) {
                loginData['AccountType'] = 1;
                let url = '/api/account/Login';
                return httpPost(url, loginData);
            }
            let getDoctorList = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/user/GetDoctors?$inlinecount=allpages&$orderby=RegisterDate desc&$top=' + pageSize + '&$skip=' + skip;
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("RegisterDate ge  datetime'" + startDate + "T00:00:00.0Z' ")
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("RegisterDate le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.keywords) {
                    let keywords = filterData.keywords;
                    filterArray.push("(indexof(DisplayName, '" + keywords + "') ge 0 or indexof(PhoneNumber, '" + keywords + "') ge 0)")
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };
            let getPatientList = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/user/GetPatients?$inlinecount=allpages&$orderby=RegisterDate desc&$top=' + pageSize + '&$skip=' + skip;
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("RegisterDate ge  datetime'" + startDate + "T00:00:00.0Z' ")
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("RegisterDate le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.keywords) {
                    let keywords = filterData.keywords;
                    filterArray.push("(indexof(DisplayName, '" + keywords + "') ge 0 or indexof(PhoneNumber, '" + keywords + "') ge 0)")
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };
            let getExchangeList = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/Finance/ReviewExchange?$inlinecount=allpages&$orderby=CreateTime desc&$top=' + pageSize + '&$skip=' + skip;
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("CreateTime ge  datetime'" + startDate + "T00:00:00.0Z' ")
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("CreateTime le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.keywords) {
                    let keywords = filterData.keywords;
                    filterArray.push("(indexof(DoctorName, '" + keywords + "') ge 0 or indexof(PhoneNumber, '" + keywords + "') ge 0)")
                }
                if (filterData.status) {
                    filterArray.push("Status eq '" + filterData.status + "'");
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };
            let getOrderList = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/BackOrder/GetAllOrders?$inlinecount=allpages&$orderby=OrderDate desc&$top=' + pageSize + '&$skip=' + skip;
                filterArray.push("PaymentStatus gt '0'");
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("OrderDate ge  datetime'" + startDate + "T00:00:00.0Z' ");
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("OrderDate le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.keywords) {
                    let keywords = filterData.keywords;
                    filterArray.push("(indexof(PatientName, '" + keywords + "') ge 0 or indexof(PhoneNumber, '" + keywords + "') ge 0 or indexof(DoctorName, '" + keywords + "') ge 0)");
                }
                if (filterData.status) {
                    let status = filterData.status;
                    filterArray.push("PaymentStatus eq '" + status + "'");
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };
            let putExchange = function (id, status, reason) {
                let url = '/api/Finance/Review/' + id;
                return httpPut(url, { Status: status, Reason: reason });
            };
            let getCoinDetailList = function (doctorId, filterStatus, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let url = 'api/CoinDetail/List?$inlinecount=allpages&$orderby=CreateTime desc&$top=' + pageSize + '&$skip=' + skip + "&userId=" + doctorId;
                if (filterStatus) {
                    url += filterStatus;
                }
                return httpGet(url, {});
            }
            let getBatchList = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/Finance/Batches?$inlinecount=allpages&$orderby=CreateTime desc&$top=' + pageSize + '&$skip=' + skip;
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("CreateTime ge  datetime'" + startDate + "T00:00:00.0Z' ")
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("CreateTime le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.status) {
                    filterArray.push("Status eq '" + filterData.status + "'");
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };
            let getExchangePaymentBatch = function (id) {
                let url = '/api/Finance/Batch/' + id;
                return httpGet(url, {});
            };
            let createExchangePaymentBatch = function (ids) {
                let url = '/api/Finance/ExchangePaymentBatch';
                return httpPost(url, ids);
            };
            let getConsultings = function (filterData, currentPage, pageSize) {
                let skip = ((currentPage || 1) - 1) * pageSize;
                let filterArray = [];
                let url = '/api/ConsultingAdmin/list?$inlinecount=allpages&$orderby=CreateTime desc&$top=' + pageSize + '&$skip=' + skip;
                if (filterData.startTime) {
                    let startDate = common.getDate(filterData.startTime);
                    filterArray.push("CreateTime ge  datetime'" + startDate + "T00:00:00.0Z' ")
                }
                if (filterData.endTime) {
                    let endTime = new Date(filterData.endTime);
                    endTime.setDate(endTime.getDate() + 1);
                    let endtDate = common.getDate(endTime);
                    filterArray.push("CreateTime le datetime'" + endtDate + "T00:00:00.0Z'");
                }
                if (filterData.keywords) {
                    let keywords = filterData.keywords;
                    filterArray.push("(indexof(PatientName, '" + keywords + "') ge 0 or indexof(Phone, '" + keywords + "') ge 0)")
                }
                if (filterData.status) {
                    filterArray.push("Status eq '" + filterData.status + "'");
                }
                let filterStr = filterArray.join(' and ');
                if (filterStr) {
                    url = url + "&$filter=" + filterStr;
                }
                return httpGet(url, {});
            };

            let getConsulting = (id) => {
                let url = '/api/ConsultingAdmin/' + id;
                return httpGet(url);
            }

            let service = {
                healthIMSite: currentProvider.healthIMSite,
                IMSite: currentProvider.IMSite,
                login: login,
                getDoctorList: getDoctorList,
                getPatientList: getPatientList,
                getOrderList: getOrderList,
                getExchangeList: getExchangeList,
                putExchange: putExchange,
                getCoinDetailList: getCoinDetailList,
                createExchangePaymentBatch: createExchangePaymentBatch,
                getBatchList: getBatchList,
                getExchangePaymentBatch: getExchangePaymentBatch,
                getConsultings: getConsultings,
                getConsulting: getConsulting

            };

            return service;
        }];
    }]);
})()