'use strict';
angular.module(constVar.appName)
    .factory('hotMapDataService',function (){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };

        function countObject(day,days,users,flows,lte,gsmTd,all){
            this.day= day;
            this.days = days;
            this.users = users;
            this.flows=flows;
            this.lte=lte;
            this.gsmTd=gsmTd;
            this.all=all;
        };

        var myHotMapService = {
            hotMap : function (data,type,customer,dataType,gprsType){
                var hotMapPoints = new Array();
                var hotType = new countObject(customer=="day"?"1":"0",customer=="days"?"1":"0",dataType=="users"?"1":"0",dataType=="flows"?"1":"0",gprsType=="lte"?"1":"0",gprsType=="gsmTd"?"1":"0",gprsType=="all"?"1":"0");
                //console.log(hotType.day+hotType.days + hotType.users+hotType.flows +hotType.lte+hotType.gsmTd +hotType.all);
                var hotMapType = hotType.day+hotType.days + hotType.users+hotType.flows +hotType.lte+hotType.gsmTd +hotType.all;
                hotMapPoints = this.getHotMapFun(data,hotMapType);
                return new resultObject(true, "", hotMapPoints);
            },
            getHotMapFun : function(data,type){
                if(type=="1010000"){
                    return this.cpeCnt(data);
                } else if (type=="1001000"){
                    return this.remirk2(data);
                } else if (type=="0110000"){
                    return this.mtdCpeCnt(data);
                } else if (type=="0101000"){
                    return this.remirk1(data);
                } else if (type=="1010100"){
                    return this.lteCounts(data);
                } else if (type=="1010010"){
                    return this.gsmTdCounts(data);
                } else if (type=="1010001"){
                    return this.usersCounts(data);
                } else if (type=="1001100"){
                    return this.lteVolume(data);
                } else if (type=="1001010"){
                    return this.gsmTdVolume(data);
                } else if (type=="1001001"){
                    return this.allVolume(data);
                } else if (type=="0110100"){
                    return this.mtdLteCounts(data);
                } else if (type=="0110010"){
                    return this.mtdGsmTdCounts(data);
                } else if (type=="0110001"){
                    return this.mtdUsersCounts(data);
                } else if (type=="0101100"){
                    return this.mtdLteVolume(data);
                } else if (type=="0101010"){
                    return this.mtdGsmTdVolume(data);
                } else if (type=="0101001"){
                    return this.mtdAllVolume(data);
                }
            },
            cpeCnt : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].cpeCnt==""?0:data[i].cpeCnt
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            remirk2 : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].remirk2==""?0:data[i].remirk2
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdCpeCnt : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdCpeCnt==""?0:data[i].mtdCpeCnt
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            remirk1 : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].remirk1==""?0:data[i].remirk1
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            lteCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].lteCounts==""?0:data[i].lteCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            gsmTdCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].gsmTdCounts==""?0:data[i].gsmTdCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            usersCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].usersCounts==""?0:data[i].usersCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            lteVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].lteVolume==""?0:data[i].lteVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            gsmTdVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].gsmTdVolume==""?0:data[i].gsmTdVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            allVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].allVolume==""?0:data[i].allVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdLteCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdLteCounts==""?0:data[i].mtdLteCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdgsmTdCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdgsmTdCounts==""?0:data[i].mtdgsmTdCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdUsersCounts : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdUsersCounts==""?0:data[i].mtdUsersCounts
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdLteVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdLteVolume==""?0:data[i].mtdLteVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdgsmTdVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdgsmTdVolume==""?0:data[i].mtdgsmTdVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            },
            mtdAllVolume : function(data){
                var hotPoints = new Array();
                for(var i = 0;i < data.length;i++){
                    var hotPoint = {
                        lng : data[i].longId,
                        lat : data[i].latId,
                        count : data[i].mtdAllVolume==""?0:data[i].mtdAllVolume
                    };
                    hotPoints.push(hotPoint);
                }
                return hotPoints;
            }
        }
        return myHotMapService;

    });