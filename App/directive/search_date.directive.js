(function () {
    'use strict'
    let app = angular.module('healthAdmin');

    app.directive('searchDate', ['common', function (common) {
        return {
            restrict: 'AE',
            scope: {
                starttime: '=',
                endtime: '=',

            },
            template: `
                 <div class ="form-group">
                <label> {{title}}：</label>
                <input type="date" class ="form-control" ng-model="starttime" id="starttime" type="date" ng-change="changestarttime()" max={{maxValue}} />
            </div>
            <div class ="form-group">
                <label>&nbsp; 至&nbsp; </label>
                <input type="date" class ="form-control"  ng-model="endtime" id="endtime" type="date" min={{endtimeMinValue}} max={{maxValue}} />
            </div> `
            ,
            link: function (scope, iElement, attr) {
                scope.title = attr.title || "注册时间"
                {
                    let newDate = new Date();
                    newDate.setDate(newDate.getDate());
                    scope.maxValue = common.getDate(newDate);
                }

                scope.endtime = new Date();

                {
                    let newDate = new Date();
                    let currentWeekDay = newDate.getDay() || 7;//周日用7表示
                    newDate.setDate(newDate.getDate() - currentWeekDay + 1);
                    scope.starttime = newDate;
                    //console.log("linkstart:" + new Date() + JSON.stringify(scope));
                }

                let changeendtime = function () {
                    scope.endtime = scope.endtime || new Date();
                    if (scope.endtime < scope.starttime) {
                        scope.endtime = scope.starttime;
                    }
                };
                let changeMinTime = function () {
                    if (scope.starttime) {
                        let mintime = scope.starttime;
                        scope.endtimeMinValue = common.getDate(mintime);
                    } else {
                        scope.endtimeMinValue = null;
                    }
                }


                scope.changestarttime = function () {
                    if (this.starttime===undefined) {
                        this.starttime = new Date();
                    }
                    changeendtime();
                    changeMinTime();
                }

                changeMinTime();
            }

        };
    }]);
})()