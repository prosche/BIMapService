/**
 * Created by Administrator on 2014/11/12.
 */
'use strict';
angular.module(constVar.appName)
    .factory('sigService',function ($http,$q){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };
        var myService=   {
            sigModel : {
                successData : null
            },

            //根据经纬度，获取后台基站信息
            getLaccibak : function(url,lacci,longNum,callBackSuccFun,callBackErrorFun) {
                //console.log(url);
                if (longNum < 100000) {
                    $http(
                        {
                            url : url,
                            method : "post",
                            headers : {
                                'Content-type' : 'application/json;charset=UTF-8'
                            },
                            data : {
                                lacci : lacci,
                                longNum : longNum
                            }
                        }).success(
                        callBackSuccFun
                    ).error(
                        callBackErrorFun
                    )
                } else {
                    alert("查询半径不能大于10千米!");
                    return new resultObject(false,null,null);
                };
            },

            //using now
            requestUrl:function (url,data,methodType){
                var deferred = $q.defer();
                var httpOptions =  {
                    url : url,
                    method : methodType,
                    headers : {
                        'Content-type' : 'application/json;charset=UTF-8'
                    },
                    data : data
                };
                $http(httpOptions)
                    .success(function (data, status, headers,
                                       config){
                        if(data){
                            deferred.resolve(data, status, headers,
                                config);
                        }else{
//                            deferred.reject(data.errorMessage, status, headers,
//                                config);
                            deferred.reject(status, headers,
                                    config);
                        }
                    })
                    .error(function (data, status, headers,
                                     config){
                        deferred.reject(status, headers,
                            config);
                    });
                return deferred.promise;
            },

            //根据经纬度，获取后台基站信息
            getLacci : function getData(url,data) {
                //console.log(data);
                var methodType = "post";
                if(data.longNum < 100000){
                    return myService.requestUrl(url,data,methodType);
                } else {
                    alert("查询半径不能大于10千米!");
                }

            },

            //获取热力图展示
            getHotPoints : function getData(url) {
                var methodType = "get";
                return myService.requestUrl(url,null,methodType);
            },

            //获取热力图展示
            getLineWay : function getData(url,data) {
                var methodType = "post";
                return myService.requestUrl(url,data,methodType);
            },

            //获取热力图展示
            getHotPointsHttp : function getData(url,callBackSuccFun,callBackErrorFun) {

                return $http.get(url)
                .success(callBackSuccFun)
                 .error(callBackErrorFun);
            },

            //
            postUrlData : function getData(url,data){
            	////console.log(data);
                var methodType = "POST";
                return myService.requestUrl(url,data,methodType);
            }
        };
        return myService;
    });