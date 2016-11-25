{
    'use strict'

    angular.module('healthAdmin')
    .directive('page', [function () {
        return {
            restirct: 'AE',
            replace: true,
            scope: {
                pageSize: '=',
                count: '=',
                content: '@',
                currentPage: '=',
                onPageChange: '&',
                currentDataCount:'='
            },
            template:
                ` <div class ="col-xs-12">
                     <div class ="row">
                       <div class ="col-xs-5">
                       <p>共有{{pageTotal}}页{{count}}{{content}}</p>
                       </div>
                       <div class ="col-xs-7">
                   <ul class ="pagination pull-right">
                    <li ng-if="1<currentPage" ng-click="onPageChange({pageIndex:currentPage-1})"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                    <li ng-class ="{active:showPage==currentPage}" ng-repeat="showPage in showPages" ng-click="onPageChange({pageIndex:showPage})"><a href="javascript:void(0)">{{showPage}}</a></li>

                    <li ng-if="pageTotal>currentPage" ng-click="onPageChange({pageIndex:currentPage+1})"><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                  </ul>
                 </div>
             </div>
           </div>
                `,
            link: function (scope, iElement, attr) {
                let getShowPages = (pageTotal, currentPage, pageSize) => {
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
                };
                let build = () => {
                    scope.pageTotal = Math.ceil(scope.count / scope.pageSize);
                    if (scope.pageTotal == 0) {
                        scope.currentPage = 0;
                    }
                    else if (scope.currentPage > 1 && scope.currentDataCount == 0) {
                        scope.currentPage = scope.pageTotal;
                        scope.onPageChange();
                    } else {
                        if (scope.currentPage == 0 && scope.pageTotal > 0) {
                            scope.currentPage = 1;
                        }
                        scope.showPages = getShowPages(scope.pageTotal, scope.currentPage, scope.pageSize);
                    }
                };

                scope.$watchGroup(['count', 'currentPage'], function (last, current) {
                    if (last[0] != current[0] || last[1] != current[1]) {
                        build();
                        console.log(' count build');
                    }
                });
            }
        }

    }]);
}