(function () {
    'use strict'
    let app = angular.module('healthAdmin');

    app.service('common', [function () {
        let getDate = function (date) {
            if (typeof date =='string') {
                date = new Date(date);
            }
            var year = date.getFullYear();
            var mouth = (date.getMonth() + 1);
            if (mouth < 10) {
                mouth = "0" + mouth;
            };
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            return year + '-' + mouth + '-' + day;
        }
        let getDatetime = function (date) {
            if (typeof date=='string') {
                var dateStr = date.split('T').join(" ").split('.')[0];
                return dateStr;
            }
           
            let year = date.getFullYear();
            let mouth = (date.getMonth() + 1);
            if (mouth < 10) {
                mouth = "0" + mouth;
            };
            let day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            let hour = date.getHours();
            if (hour < 10) {
                hour = "0" + hour;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            let seconds = date.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return year + '-' + mouth + '-' + day + " " + hour + ":" + minutes + ":" + seconds;

        }
        let getAge = function (date) {
            if (date) {
                if (typeof date == 'string') {
                    date = new Date(date);
                }
                let birthyear = date.getFullYear();
                let currentYear =new Date().getFullYear();
                return (currentYear - birthyear);
            } else {
                return "";
            }
        }

        let getShowPages = function (pageTotal, currentPage, pageSize) {
            let showPages = [];   //显示的页码

            if (pageTotal > 0) {
                currentPage = currentPage || 1;
            }
            let showPageEnd = pageTotal;
            let showPageStart = 1;
            if (pageTotal > 5) {
                if (currentPage > 2) {
                    showPageStart = currentPage - 2;

                }
                if (pageTotal - currentPage > 2) {
                    showPageEnd = currentPage + 2;
                }
                if (showPageEnd < 5) {
                    showPageEnd = 5;
                }
            }
            for (let i = showPageStart; i <= showPageEnd; i++) {
                showPages.push(i);
            }
            return showPages;
        }

        this.getDate = getDate;
        this.getDatetime = getDatetime;
        this.getShowPages = getShowPages;
        this.getAge = getAge;
    }]);
})();