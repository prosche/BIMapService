/**
 * Created by Administrator on 2015/4/29.
 */
'use strict';
angular.module(constVar.appName)
    .factory('timeService',function (){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };

        var myTimeService = {
            getBeforeDate : function (n){
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon=d.getMonth()+1;
                var day=d.getDate();
                if(day <= n){
                    if(mon>1) {
                        mon=mon-1;
                    }
                    else {
                        year = year-1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate()-n);
                year = d.getFullYear();
                mon=d.getMonth()+1;
                day=d.getDate();
                var s = year+''+(mon<10?('0'+mon):mon)+''+(day<10?('0'+day):day);
                //var s = year+''+mon+''+day;
                //myTimeService.requestUrl(true, "", s);
                return new resultObject(true, "", s);
            }
        }
        return myTimeService;

    });