'use strict';
angular.module(constVar.appName)
    .factory('channelMapDataService',function (){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };
        var myChannelMapService = {
            channelMap : function (data,type,colors){
                var mapPoints = new Array();
                mapPoints = this.getHotMapFun(data,type,colors);
                return new resultObject(true, "", mapPoints);
            },
            getHotMapFun : function(data,type,colors){
                var points = new Array();
                for(var j = 0; j < colors.length; j++){
                    points[j] = new Array();
                    if(type=="type1"){
                        points[j] = this.channelType1(points[j],data,colors[j].id);
                    } else if (type=="type2"){
                        points[j] = this.channelType2(points[j],data,colors[j].id);
                    } else if (type=="type3"){
                        points[j] = this.channelType3(points[j],data,colors[j].id);
                    } else if (type=="type4"){
                        points[j] = this.channelType4(points[j],data,colors[j].id);
                    } else if (type=="type5"){
                        points[j] = this.channelTypeStar(points[j],data,colors[j].name);
                    }
                }
                return points;
            },
            channelType1 : function(points,data,color){
                for(var i = 0; i < data.length; i++){
                    var newChannelType = data[i].newChannelType1==""?"00000":data[i].newChannelType1;
                    if(color==newChannelType) {
                        var point = this.getData(data[i]);
                        points.push(point);
                    }
                }
                return points;
            },
            channelType2 : function(points,data,color){
                for(var i = 0; i < data.length; i++){
                    var newChannelType = data[i].newChannelType2==""?"00000":data[i].newChannelType2;
                    if(color==newChannelType) {
                        var point = this.getData(data[i]);
                        points.push(point);
                    }
                }
                return points;
            },
            channelType3 : function(points,data,color){
                for(var i = 0; i < data.length; i++){
                    var newChannelType = data[i].newChannelType3==""?"00000":data[i].newChannelType3;
                    if(color==newChannelType) {
                        var point = this.getData(data[i]);
                        points.push(point);
                    }
                }
                return points;
            },
            channelType4 : function(points,data,color){
                for(var i = 0; i < data.length; i++){
                    var newChannelType = data[i].newChannelType4==""?"00000":data[i].newChannelType4;
                    if(color==newChannelType) {
                        var point = this.getData(data[i]);
                        points.push(point);
                    }
                }
                return points;
            },
            channelTypeStar : function(points,data,color){
                for(var i = 0; i < data.length; i++){
                    var newChannelType = data[i].channelStar==""?"00000":data[i].channelStar;
                    if(color==newChannelType) {
                        var point = this.getData(data[i]);
                        points.push(point);
                    }
                }
                return points;
            },
            getData : function(data){
                return {
                    lng : data.longitude,
                    lat : data.latitude,
                    channelName : data.channelName,
                    createDate : data.createDate,
                    newChannelType1Name : data.newChannelType1Name,
                    newChannelType2Name : data.newChannelType2Name,
                    newChannelType3Name : data.newChannelType3Name,
                    newChannelType4Name : data.newChannelType4Name,
                    channelAddr : data.channelAddr,
                    channelStar : data.channelStar,
                    countyName : data.countyName,
                    xzCountyName : data.xzCountyName,
                    xzTownName : data.xzTownName,
                    xzVillageName : data.xzVillageName,
                    bcName : data.bcName,
                    newChannelType1 : data.newChannelType1,
                    newChannelType2 : data.newChannelType2,
                    newChannelType3 : data.newChannelType3,
                    newChannelType4 : data.newChannelType4
                } ;
            }
        }
        return myChannelMapService;

    });