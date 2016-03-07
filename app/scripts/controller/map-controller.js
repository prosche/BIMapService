/**
 * Created by Administrator on 2015/7/7.
 */
angular.module(constVar.appName)
    .controller('mapController',function($scope,$timeout,$compile,clickCityService,citycountyData,divMapService,cityData,customerData,lbsService,sigService,dataType,gprsType,countysData,channelType1,channelType2,channelType3,channelType4,countyData,timeService,channelStar,hotMapDataService,channelMapDataService){
        var divPoints;
        var hotPoints;
        $scope.citys = cityData;
        $scope.countys = countyData;
        $scope.customers = customerData;
        $scope.dataTypes = dataType;
        $scope.gprsTypes = gprsType;
        $scope.channelType1s = channelType1;
        $scope.channelType2s = channelType2;
        $scope.channelType3s = channelType3;
        $scope.channelType4s = channelType4;
        $scope.channelStars = channelStar;

        var colorTypes = {
            "type1" : channelType1,
            "type2" : channelType2,
            "type3" : channelType3,
            "type4" : channelType4,
            "type5" : channelStar
        };

        $scope.vm = {};
        $scope.vm.citys = countysData;
        $scope.SelectdCollection = {};

        // 更换地市
        $scope.$watch('mapModle.cityId', function(city) {
            $scope.vm.countys  = $scope.vm.citys[14].countys;
            ////console.log("$scope.mapModle.cityId:" + $scope.mapModle.cityId );
            ////console.log("city:" + city);
            ////console.log($scope.vm.countys);

            if($scope.vm.countys.length!=0){
                for(var a = 0 ; a < parseInt($scope.vm.countys.length);a++){
                    $scope.vm.countys[a] =null;
                }
                $scope.vm.countys.length = 0;
            }
            var cityArray=new Object();
            cityArray = city;
            if(cityArray != null ){
                var num = 0;
                for(var i = 0;i<parseInt(cityArray.length);i++){
                    ////console.log("city["+i+"]:" + cityArray[i]);
                    if(cityArray[i] != '999'){
                        for(var j = 0;j<parseInt($scope.vm.citys.length);j++){
                            if(cityArray[i]==$scope.vm.citys[j].id){
                                for(var m = 0 ; m < parseInt($scope.vm.citys[j].countys.length); m++){
                                    $scope.vm.countys[num] = $scope.vm.citys[j].countys[m];
                                    num++;
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if($scope.vm.countys==""){
                for(var j = 0;j<parseInt($scope.vm.citys.length);j++){
                    if(cityArray==$scope.vm.citys[j].id){
                        for(var m = 0 ; m < parseInt($scope.vm.citys[j].countys.length); m++){
                            $scope.vm.countys[num] = $scope.vm.citys[j].countys[m];
                            num++;
                        }
                        break;
                    }
                }
            }
            ////console.log($scope.vm.countys);
            //$scope.vm.countys.unshift({id:null,typeName:'全部'});
        });

        $scope.cpeDataMapType = true;
        $scope.cpeHotMapType = false;
        $scope.mapModle = {
            cityName : "沈阳市",
            maxValue : 30,
            opTime : "",
            businessName : "",
            clickType : "",
            showMapTypeName : "指标图",

            changeMaxValue : function(){
                if(hotPoints!=null && $('#baiduLbsDiv').html("指标图")){
                        lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                }
            },
            showData : function(type){
                if(type==='cpe' || type==="gprs"){
                    var url = constVar.backstageUrl + 'process/CPE/QueryCpeLteProcess';
                    //var url = 'data/channel.json';
                    ////console.log(url);
                    if($scope.mapModle.customerId=='day'){
                        var data = {
                            optime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
                            cityId : $scope.mapModle.cityId=={}?"":$scope.mapModle.cityId,
                            countyId : $scope.mapModle.countyId=={}?"":$scope.mapModle.countyId,
                            lteMin : $scope.mapModle.cpeRateMin =={}?"":$scope.mapModle.cpeRateMin,
                            lteMax : $scope.mapModle.cpeRateMax =={}?"":$scope.mapModle.cpeRateMax,
                            lteCountsMin : $scope.mapModle.lteUserCountsMin =={}?"":$scope.mapModle.lteUserCountsMin,
                            lteCountsMax : $scope.mapModle.lteUserCountsMax =={}?"":$scope.mapModle.lteUserCountsMax,
                            cpeCntMin : $scope.mapModle.cpeCountsMin == {}?"":$scope.mapModle.cpeCountsMin,
                            cpeCntMax : $scope.mapModle.cpeCountsMax == {}?"":$scope.mapModle.cpeCountsMax,
                            gsmCountsMin : $scope.mapModle.gsmTdUserCountsMin =={}?"":$scope.mapModle.gsmTdUserCountsMin,
                            gsmCountsMax : $scope.mapModle.gsmTdUserCountsMax =={}?"":$scope.mapModle.gsmTdUserCountsMax,
                            lteVolumeMin : $scope.mapModle.lteFlowsMin =={}?"":$scope.mapModle.lteFlowsMin,
                            lteVolumeMax : $scope.mapModle.lteFlowsMax =={}?"":$scope.mapModle.lteFlowsMax,
                            gsmVolumeMin : $scope.mapModle.gsmTdFlowsMin =={}?"":$scope.mapModle.gsmTdFlowsMin,
                            gsmVolumeMax : $scope.mapModle.gsmTdFlowsMax =={}?"":$scope.mapModle.gsmTdFlowsMax
                        };
                    } else {
                        var data = {
                            optime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
                            cityId : $scope.mapModle.cityId=={}?"":$scope.mapModle.cityId,
                            countyId : $scope.mapModle.countyId=={}?"":$scope.mapModle.countyId,
                            mtdLteMin : $scope.mapModle.cpeRateMin =={}?"":$scope.mapModle.cpeRateMin,
                            mtdLteMax : $scope.mapModle.cpeRateMax =={}?"":$scope.mapModle.cpeRateMax,
                            mtdLteCountsMin : $scope.mapModle.lteUserCountsMin =={}?"":$scope.mapModle.lteUserCountsMin,
                            mtdLteCountsMax : $scope.mapModle.lteUserCountsMax =={}?"":$scope.mapModle.lteUserCountsMax,
                            mtdCpeCntMin : $scope.mapModle.cpeCountsMin == {}?"":$scope.mapModle.cpeCountsMin,
                            mtdCpeCntMax : $scope.mapModle.cpeCountsMax == {}?"":$scope.mapModle.cpeCountsMax,
                            mtdGsmCountsMin : $scope.mapModle.gsmTdUserCountsMin =={}?"":$scope.mapModle.gsmTdUserCountsMin,
                            mtdGsmCountsMax : $scope.mapModle.gsmTdUserCountsMax =={}?"":$scope.mapModle.gsmTdUserCountsMax,
                            mtdLteVolumeMin : $scope.mapModle.lteFlowsMin =={}?"":$scope.mapModle.lteFlowsMin,
                            mtdLteVolumeMax : $scope.mapModle.lteFlowsMax =={}?"":$scope.mapModle.lteFlowsMax,
                            mtdGsmVolumeMin : $scope.mapModle.gsmTdFlowsMin =={}?"":$scope.mapModle.gsmTdFlowsMin,
                            mtdGsmVolumeMax : $scope.mapModle.gsmTdFlowsMax =={}?"":$scope.mapModle.gsmTdFlowsMax
                        };
                    };
                    console.log(data);
                    sigService.getLineWay(url,data)
                        .then(
                        function (data, status, headers,
                                  config){
                            ////console.log(data);
                            var resultData = data.result;
                            var points = new Array();
                            ////console.log($scope.mapModle.dataTypeId);
                            ////console.log($scope.mapModle.customerId);
                            ////console.log($scope.mapModle.gprsTypeId);
                            hotPoints = hotMapDataService.hotMap(resultData,type,$scope.mapModle.customerId,$scope.mapModle.dataTypeId,$scope.mapModle.gprsTypeId).result;
                            for(var i = 0;i < resultData.length;i++){
                                var point = {
                                    lng : resultData[i].longId,
                                    lat : resultData[i].latId,
                                    cityId : resultData[i].cityId,
                                    countyId : resultData[i].countyId,
                                    gsmVolume : resultData[i].gsmVolume==""?0:resultData[i].gsmVolume,
                                    tdVolume : resultData[i].tdVolume==""?0:resultData[i].tdVolume,
                                    lteVolume : resultData[i].lteVolume==""?0:resultData[i].lteVolume,
                                    allVolume : resultData[i].allVolume==""?0:resultData[i].allVolume,
                                    gsmCounts : resultData[i].gsmCounts==""?0:resultData[i].gsmCounts,
                                    tdCounts : resultData[i].tdCounts==""?0:resultData[i].tdCounts,
                                    lteCounts : resultData[i].lteCounts==""?0:resultData[i].lteCounts,
                                    usersCounts : resultData[i].usersCounts==""?0:resultData[i].usersCounts,
                                    lte : resultData[i].lte==""?0:resultData[i].lte,
                                    cpeCnt : resultData[i].cpeCnt==""?0:resultData[i].cpeCnt,
                                    flows : resultData[i].remirk2==""?0:resultData[i].remirk2,
                                    mtdGsmVolume : resultData[i].mtdGsmVolume==""?0:resultData[i].mtdGsmVolume,
                                    mtdTdVolume : resultData[i].mtdTdVolume==""?0:resultData[i].mtdTdVolume,
                                    mtdLteVolume : resultData[i].mtdLteVolume==""?0:resultData[i].mtdLteVolume,
                                    mtdAllVolume : resultData[i].mtdAllVolume==""?0:resultData[i].mtdAllVolume,
                                    mtdGsmCounts : resultData[i].mtdGsmCounts==""?0:resultData[i].mtdGsmCounts,
                                    mtdTdCounts : resultData[i].mtdTdCounts==""?0:resultData[i].mtdTdCounts,
                                    mtdLteCounts : resultData[i].mtdLteCounts==""?0:resultData[i].mtdLteCounts,
                                    mtdUsersCounts : resultData[i].mtdUsersCounts==""?0:resultData[i].mtdUsersCounts,
                                    mtdLte : resultData[i].mtdLte==""?0:resultData[i].mtdLte,
                                    mtdCpeCnt : resultData[i].mtdCpeCnt==""?0:resultData[i].mtdCpeCnt,
                                    mtdFlows : resultData[i].remirk1==""?0:resultData[i].remirk1
                                };
                                points.push(point);
                            }
                            divPoints = points;
                            ////console.log(hotPoints);
                            ////console.log(divPoints);
                            lbsService.remove_overlay();
                            lbsService.showDivClickMap($scope.mapModle.showDiv(type));
                            lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                        },
                        function (data, status, headers,
                                  config){
                            //////console.log("result:fail");
                        }
                    );
                }
            },

            show : function (type) {
                ////console.log($scope.mapModle.maxValue);
                ////console.log($scope.mapModle.opTime + "-" + $scope.mapModle.dataTypeId + "-" + $scope.mapModle.cityId + "-" + $scope.mapModle.customerId);
                if($scope.mapModle.gprsTypeId == null){
                    var url = 'data/' + type + '_' + $scope.mapModle.dataTypeId + '_' + $scope.mapModle.opTime + "_" + $scope.mapModle.cityId + "_" + $scope.mapModle.customerId + constVar.dataJsonType;
                } else {
                    var url = 'data/' + type + '_' + $scope.mapModle.dataTypeId + '_' + $scope.mapModle.opTime + "_" + $scope.mapModle.cityId + "_" + $scope.mapModle.customerId + "_" + $scope.mapModle.gprsTypeId + constVar.dataJsonType;
                }
                ////console.log(url);
                sigService.getHotPoints(url)
                    .then(
                    function (data, status, headers,
                              config){
                        ////console.log(data);
                        hotPoints = data;
                        var resultData = data;
                        var points = new Array();
                        for(var i = 0;i < resultData.length;i++){
                            var point = {
                                lng : resultData[i].lng,
                                lat : resultData[i].lat,
                                count : resultData[i].count
                            };
                            points.push(point);
                        }
                        divPoints = points;
                        ////console.log(divPoints);
                        lbsService.showDivClickMap($scope.mapModle.showDiv());
                        lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                    },
                    function (data, status, headers,
                              config){
                        ////console.log("result:fail");
                    }
                );
            },

            showDiv : function(type){
                // 创建一个DOM元素
                var div = document.createElement("div");
                div.setAttribute("id","baiduLbsDiv");
                // 添加文字说明
                div.appendChild(document.createTextNode("指标图"));
                // 设置样式
                div.className = "btn btn-primary";
                //div.style.cursor = "pointer";
                //div.style.border = "1px solid gray";
                div.style.backgroundColor = "#337ab7";
                // 绑定事件,点击一次放大两级
                div.onclick = function(e){
                    if($('#baiduLbsDiv').html()=="热力图"){
                        $('#baiduLbsDiv').html("指标图");
                        $('#baiduLbsDiv').css({"backgroundColor":"#337ab7"});
                        lbsService.remove_overlay();
                        lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                    } else {
                        $('#baiduLbsDiv').html("热力图");
                        $('#baiduLbsDiv').css({"backgroundColor":"#d0251b"});
                        lbsService.remove_overlay();
                        $scope.mapModle.showCpeColor(type);
                    }
                    showMapType();
                }
                return div;
            },

            getData : function(type){
                $scope.mapForm.clickType = type;
                if(type=='channel'){
                    var url = constVar.backstageUrl + 'process/CPE/QueryChannelProcess';
                    //var url = 'data/channel.json';
                    ////console.log(url);
                    var data = {
                        optime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
                        cityId : $scope.mapModle.cityId=={}?"":$scope.mapModle.cityId,
                        countyId : $scope.mapModle.countyId=={}?"":$scope.mapModle.countyId,
                        newChannelType1 : $scope.mapModle.channelType1Id =={}?"":$scope.mapModle.channelType1Id,
                        newChannelType2 : $scope.mapModle.channelType2Id =={}?"":$scope.mapModle.channelType2Id,
                        xzCountyName : $scope.mapModle.xzCountyName == {}?"":$scope.mapModle.xzCountyName,
                        bcName : $scope.mapModle.businessName == ""?"":$scope.mapModle.businessName
                    };
                    sigService.getLineWay(url,data)
                        //sigService.getHotPoints(url,data)
                        .then(
                        function (data, status, headers,
                                  config){
                            $scope.mapModle.resultData = data.result;
                            //console.log($scope.mapModle.resultData);
                            $scope.mapModle.showColorFun("type1");

                        },
                        function (data, status, headers,
                                  config){
                        }
                    );
                }
            },
            showType : function(){
                lbsService.unShowHotPoints();
            },
            clickCity : function(){
                //////console.log(city.name);
                // lbsService.unShowHotPoints();
                // lbsService.showClickCity(clickCityService.clickCityFun($scope.mapModle.cityId,$scope.citys).result);

                lbsService.unShowHotPoints();
                var cityId = $scope.mapModle.cityId;
                if(cityId!=""){
                    var city = clickCityService.clickCityFun(cityId,$scope.citys);
                    lbsService.showClickCity(city.result);
                    $timeout(function() {
                        cityId = $scope.mapModle.cityId;
                        var city = clickCityService.clickCityFun(cityId,$scope.citys);
                        lbsService.showClickCity(city.result);
                    }, 2000);
                }
            },
            clickCounty : function(){
                // lbsService.unShowHotPoints();
                // lbsService.showClickCity(clickCityService.clickCityFun($scope.mapModle.countyId,$scope.countys).result);

                lbsService.unShowHotPoints();
                var countyId = $scope.mapModle.countyId;
                if(countyId!=null){
                    var county = clickCityService.clickCityFun(countyId,$scope.vm.countys);
                    lbsService.showClickCity(county.result);
                    $timeout(function() {
                        countyId = $scope.mapModle.countyId;
                        var county = clickCityService.clickCityFun(countyId,$scope.vm.countys);
                        lbsService.showClickCity(county.result);
                    }, 2000);  
                };
            },
            showCpeColor : function(type){
                var pointsOne = new Array();
                var pointsTwo = new Array();
                for(var i = 0; i < divPoints.length; i++){
                    if(parseInt(divPoints[i].lte) > 50 && parseInt(divPoints[i].cpeCnt) > 10){
                        pointsOne.push(divPoints[i]);
                    } else {
                        pointsTwo.push(divPoints[i]);
                    }
                }
                lbsService.showLagerPoints(pointsOne,type,"FF0000");
                lbsService.showLagerPoints(pointsTwo,type,"808080");
            },
            showColorFun : function (ColorType) {
                var data = $scope.mapModle.resultData;
                var colors = $scope.channelType4s;
                if(data!=null){
                    if(ColorType=="type1"){
                        colors = $scope.channelType1s;
                    } else if (ColorType=="type2"){
                        colors = $scope.channelType2s;
                    } else if (ColorType=="type3"){
                        colors = $scope.channelType3s;
                    } else if (ColorType=="type4"){
                        colors = $scope.channelType4s;
                    } else if (ColorType=="type5"){
                        colors = $scope.channelStars;
                    }
                    var points = channelMapDataService.channelMap(data,ColorType,colors).result;
                    ////console.log(channelMapDataService.channelMap(data,ColorType,colors));
                    for(var i = 0; i < colors.length; i++){
                        ////console.log(colors[i].id);
                        lbsService.showLagerPoints(points[i],$scope.mapForm.clickType,colors[i].color);
                    }
                    //lbsService.showDivClickMap(this.showColorDivMap(colors));
                    lbsService.showDivClickMap(divMapService.divColorMap(colors).result);
                }
            }
        };

        var getClickPoints = function(){
        };

        $timeout(function() {
            ////console.log("start");
            lbsService.showLbs(getClickPoints,$scope.mapModle.cityName);
        }, 4000);

        $timeout(function() {
            //var new_script = document.createElement("script");
            // document.write("<script  src='http://localhost:3000/vender/bootstrap-select/dist/js/bootstrap-select.js'><\/script>");
            //var m = $mySelector;
            $mySelector();
        }, 3000);
    });
