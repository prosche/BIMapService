/**
 * Created by Administrator on 2015/7/7.
 */
angular.module(constVar.appName)
    .controller('mapController',function($scope,$timeout,$compile,citycountyData,cityData,customerData,lbsService,sigService,dataType,gprsType,countysData,channelType1,channelType2,channelType3,channelType4,countyData,timeService,channelStar,hotMapDataService,channelMapDataService){
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
            console.log("$scope.mapModle.cityId:" + $scope.mapModle.cityId );
            console.log("city:" + city);
            console.log($scope.vm.countys);

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
                    console.log("city["+i+"]:" + cityArray[i]);
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
            console.log($scope.vm.countys);
            //$scope.vm.countys.unshift({id:null,typeName:'全部'});
        });

        $scope.cpeDataMapType = true;
        $scope.cpeHotMapType = false;
        $scope.mapModle = {
            cityName : "沈阳市",
            maxValue : 3000,
            opTime : "",
            businessName : "",
            clickType : "",
            showMapTypeName : "指标图",

            showData : function(type){
                if(type==='cpe' || type==="gprs"){
                    var url = constVar.backstageUrl + 'process/CPE/QueryCpeLteProcess';
                    //var url = 'data/channel.json';
                    console.log(url);
                    if($scope.mapModle.customerId=='day'){
                        var data = {
                            opTime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
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
                            opTime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
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
                            console.log(data);
                            var resultData = data.result;
                            var points = new Array();
                            console.log($scope.mapModle.dataTypeId);
                            console.log($scope.mapModle.customerId);
                            console.log($scope.mapModle.gprsTypeId);
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
                            console.log(hotPoints);
                            console.log(divPoints);
                            lbsService.remove_overlay();
                            lbsService.showDivClickMap($scope.mapModle.showDiv(type));
                            lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                        },
                        function (data, status, headers,
                                  config){
                            //console.log("result:fail");
                        }
                    );
                }
            },

            show : function (type) {
                console.log($scope.mapModle.maxValue);
                console.log($scope.mapModle.opTime + "-" + $scope.mapModle.dataTypeId + "-" + $scope.mapModle.cityId + "-" + $scope.mapModle.customerId);
                if($scope.mapModle.gprsTypeId == null){
                    var url = 'data/' + type + '_' + $scope.mapModle.dataTypeId + '_' + $scope.mapModle.opTime + "_" + $scope.mapModle.cityId + "_" + $scope.mapModle.customerId + constVar.dataJsonType;
                } else {
                    var url = 'data/' + type + '_' + $scope.mapModle.dataTypeId + '_' + $scope.mapModle.opTime + "_" + $scope.mapModle.cityId + "_" + $scope.mapModle.customerId + "_" + $scope.mapModle.gprsTypeId + constVar.dataJsonType;
                }
                console.log(url);
                sigService.getHotPoints(url)
                    .then(
                    function (data, status, headers,
                              config){
                        console.log(data);
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
                        console.log(divPoints);
                        lbsService.showDivClickMap($scope.mapModle.showDiv());
                        lbsService.showHotPoints(hotPoints,$scope.mapModle.maxValue);
                    },
                    function (data, status, headers,
                              config){
                        console.log("result:fail");
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
                    console.log(url);
                    var data = {
                        optime : $scope.mapModle.opTime.replace(/-/g,"")==""?timeService.getBeforeDate(1).result:$scope.mapModle.opTime.replace(/-/g,""),
                        cityId : $scope.mapModle.cityId=={}?"":$scope.mapModle.cityId,
                        countyId : $scope.mapModle.countyId=={}?"":$scope.mapModle.countyId,
                        newChannelType1 : $scope.mapModle.channelType1Id =={}?"":$scope.mapModle.channelType1Id,
                        newChannelType2 : $scope.mapModle.channelType2Id =={}?"":$scope.mapModle.channelType2Id,
                        xzCountyName : $scope.mapModle.xzCountyName == {}?"":$scope.mapModle.xzCountyName,
                        bcName : $scope.mapModle.businessName == ""?"":$scope.mapModle.businessName
                    };
                    console.log($scope.mapForm.opTime);
                    console.log($scope.mapForm.cityId);
                    console.log($scope.mapForm);
                    console.log(data);

                    sigService.getLineWay(url,data)
                        //sigService.getHotPoints(url,data)
                        .then(
                        function (data, status, headers,
                                  config){
                            $scope.mapModle.resultData = data.result;
                            console.log($scope.mapModle.resultData);
                            $scope.mapModle.showColorFun("type4");

                        },
                        function (data, status, headers,
                                  config){
                            //console.log("result:fail");
                        }
                    );
                }
            },
            showType : function(){
                lbsService.unShowHotPoints();
            },
            clickCity : function(){
                //console.log(city.name);
                lbsService.unShowHotPoints();
                console.log($scope.mapModle.cityId);
                if($scope.mapModle.cityId != null && $scope.mapModle.cityId != '999'){
                    console.log($scope.citys);
                    for(var id in $scope.citys){
                        if($scope.mapModle.cityId[$scope.mapModle.cityId.length-1] == $scope.citys[id].id){
                            $scope.mapModle.cityName = $scope.citys[id].name;
                        } else if ($scope.mapModle.cityId==$scope.citys[id].id){
                            $scope.mapModle.cityName = $scope.citys[id].name;
                        }
                    }
                    console.log($scope.mapModle.cityName);
                    lbsService.showClickCity($scope.mapModle.cityName);
                } else {
                    $scope.mapModle.cityName = "沈阳市";
                    lbsService.showClickCity($scope.mapModle.cityName);
                }
            },

            clickCounty : function(){
                //console.log(city.name);
                lbsService.unShowHotPoints();
                console.log($scope.mapModle.countyId);
                if($scope.mapModle.countyId != null){
                    console.log($scope.citys);
                    for(var id in $scope.countys){
                        console.log(id);
                        if($scope.mapModle.countyId[$scope.mapModle.countyId.length-1] == $scope.countys[id].id){
                            $scope.mapModle.countyName = $scope.countys[id].name;
                            break;
                        } else if ($scope.mapModle.countyId==$scope.vm.countys[id].id){
                            $scope.mapModle.countyName = $scope.vm.countys[id].name;
                            break;
                        } else {
                            $scope.mapModle.countyName = "沈阳市";
                        }
                    }
                    console.log($scope.mapModle.countyName);
                    lbsService.showClickCity($scope.mapModle.countyName);
                } else {
                    $scope.mapModle.countyName = "沈阳市";
                    lbsService.showClickCity($scope.mapModle.countyName);
                }
            },

            getColorData : function(data){
                var channelStarColor;
                if(data.channelStar=='一星'){
                    channelStarColor = '4169E1';
                } else if (data.channelStar=='二星'){
                    channelStarColor = '00BFFF';
                } else if (data.channelStar=='三星'){
                    channelStarColor = '00FF00';
                } else if (data.channelStar=='四星'){
                    channelStarColor = '800080';
                } else if (data.channelStar=='五星'){
                    channelStarColor = 'FFA500';
                } else if (data.channelStar=='六星'){
                    channelStarColor = 'FFC0CB';
                } else {
                    channelStarColor = '808080';
                }
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
                    newChannelType4 : data.newChannelType4,
                    channelStarColor : channelStarColor,
                    newChannelType1Color : data.newChannelType1==""?'808080':('00000'+(parseInt(data.newChannelType1)*parseInt(data.newChannelType1)*parseInt(data.newChannelType1)/3.1415/1.68/60000000*0x1000000<<0).toString(16)).slice(-6),
                    newChannelType2Color : data.newChannelType2==""?'808080':('00000'+(parseInt(data.newChannelType2)*parseInt(data.newChannelType2)*parseInt(data.newChannelType2)/3.1415/1.68/60000000*0x1000000<<0).toString(16)).slice(-6),
                    newChannelType3Color : data.newChannelType3==""?'808080':('00000'+(parseInt(data.newChannelType3)*parseInt(data.newChannelType3)*parseInt(data.newChannelType3)/3.1415/1.68/60000000*0x1000000<<0).toString(16)).slice(-6),
                    newChannelType4Color : data.newChannelType4==""?'808080':('00000'+(parseInt(data.newChannelType4)*parseInt(data.newChannelType4)*parseInt(data.newChannelType4)/3.1415/1.68/60000000*0x1000000<<0).toString(16)).slice(-6)
                } ;
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
            showColorDivMap : function(color){
                var div = document.createElement("div");
                for(var i = 0 ; i<color.length ; i++){
                    // 创建一个DOM元素
                    var child = document.createElement("div");
                    child.setAttribute("id","baiduColorDiv"+i);
                    // 添加文字说明
                    child.appendChild(document.createTextNode(color[i].name));
                    // 设置样式
                    //child.className = "btn btn-primary";
                    //child.style.cursor = "pointer";
                    //child.style.border = "1px solid gray";
                    child.style.width = "40px";
                    child.style.height = "20px";
                    child.style.fontSize = "6px";
                    child.style.display = "block";/*内联对象需加*/
                    child.style.wordBreak = "keep-all";/* 不换行 */
                    child.style.whiteSpace = "nowrap";/* 不换行 */
                    child.style.overflow = "hidden";/* 内容超出宽度时隐藏超出部分的内容 */
                    child.style.textOverflow = "ellipsis";/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
                    child.title = color[i].name;
                    child.style.backgroundColor = "#"+color[i].color;
                    //$('#baiduLbsDiv'+i).html(name[i].name);
                    console.log(color[i].name,color[i].color)
                    div.appendChild(child);
                }
                console.log(div);
                return div;
            },
            showColorFun : function (ColorType) {
                var data = $scope.mapModle.resultData;
                var colors = $scope.channelType4s;
                if(ColorType=="type1"){
                    colors = $scope.channelType1s;
                } else if (ColorType=="type2"){
                    colors = $scope.channelType2s;
                } else if (ColorType=="type3"){
                    colors = $scope.channelType3s;
                } else if (ColorType=="type4"){
                    colors = $scope.channelType4s;
                } else if (ColorType=="type5"){
                    colors = $scope.channelStar;
                }
                var points = channelMapDataService.channelMap(data,ColorType,colors).result;
                console.log(channelMapDataService.channelMap(data,ColorType,colors));
                for(var i = 0; i < colors.length; i++){
                    console.log(colors[i].id);
                    lbsService.showLagerPoints(points[i],$scope.mapForm.clickType,colors[i].id);
                }
                lbsService.showDivClickMap(this.showColorDivMap(colors));
            },
            /*
            showColorFun : function (ColorType) {
                console.log($scope.mapModle.color,ColorType);
                lbsService.remove_overlay();
                var points = new Array();
                var resultData = $scope.mapModle.resultData;
                var colors;
                var colorNameDivMap = new Array();
                var colorDivMap = new Array();
                if(ColorType == "type1"){
                    console.log($scope.channelType1s);
                    colors = $scope.channelType1s;
                    for(var j = 0; j < colors.length; j++){
                        points[j] = new Array();
                        for(var i = 0; i < resultData.length; i++){
                            var newChannelType = resultData[i].newChannelType1==""?"00000":resultData[i].newChannelType1;
                            if(colors[j].id==newChannelType) {
                            var point = $scope.mapModle.getColorData(resultData[i]);
                            points[j].push(point);
                            }
                        }
                        var color = colors[j].color;
                        console.log(points[j]);
                        console.log(color);
                        lbsService.showLagerPoints(points[j],$scope.mapForm.clickType,color);
                    }
                    lbsService.showDivClickMap(this.showColorDivMap(colors));
                } else if (ColorType == "type2"){
                    console.log($scope.channelType2s);
                    colors = $scope.channelType2s;
                    for(var j = 0; j < colors.length; j++){
                        points[j] = new Array();
                        for(var i = 0; i < resultData.length; i++){
                            var newChannelType = resultData[i].newChannelType2==""?"00000":resultData[i].newChannelType2;
                            if(colors[j].id==newChannelType) {
                            var point = $scope.mapModle.getColorData(resultData[i]);
                            points[j].push(point);
                            }
                        }
                        var color = colors[j].color;
                        console.log(points[j]);
                        console.log(color);
                        lbsService.showLagerPoints(points[j],$scope.mapForm.clickType,color);
                    }
                    lbsService.showDivClickMap(this.showColorDivMap(colors));
                } else if (ColorType == "type3"){
                    console.log($scope.channelType3s);
                    colors = $scope.channelType3s;
                    for(var j = 0; j < colors.length; j++){
                        points[j] = new Array();
                        for(var i = 0; i < resultData.length; i++){
                            var newChannelType = resultData[i].newChannelType3==""?"00000":resultData[i].newChannelType3;
                            if(colors[j].id==newChannelType) {
                            var point = $scope.mapModle.getColorData(resultData[i]);
                            points[j].push(point);
                            }
                        }
                        var color = colors[j].color;
                        console.log(points[j]);
                        console.log(color);
                        lbsService.showLagerPoints(points[j],$scope.mapForm.clickType,color);
                    }
                    lbsService.showDivClickMap(this.showColorDivMap(colors));
                } else if (ColorType == "type4"){
                    console.log($scope.channelType4s);
                    colors = $scope.channelType4s;
                    for(var j = 0; j < colors.length; j++){
                        points[j] = new Array();
                        for(var i = 0; i < resultData.length; i++){
                            var newChannelType = resultData[i].newChannelType4==""?"00000":resultData[i].newChannelType4;
                            if(colors[j].id==newChannelType) {
                                var point = $scope.mapModle.getColorData(resultData[i]);
                                points[j].push(point);
                            }
                        }
                        var color = colors[j].color;
                        console.log(points[j]);
                        console.log(color);
                        lbsService.showLagerPoints(points[j],$scope.mapForm.clickType,color);
                    }
                    lbsService.showDivClickMap(this.showColorDivMap(colors));
                } else if (ColorType == "type5"){
                    console.log($scope.channelStars);
                    colors = $scope.channelStars;
                    for(var j = 0; j < colors.length; j++){
                        points[j] = new Array();
                        for(var i = 0; i < resultData.length; i++){
                            var newChannelType = resultData[i].channelStar==""?"00000":resultData[i].channelStar;
                            if(colors[j].name==newChannelType) {
                            var point = $scope.mapModle.getColorData(resultData[i]);
                            points[j].push(point);
                            }
                        }
                        var color = colors[j].color;
                        console.log(points[j]);
                        console.log(color);
                        lbsService.showLagerPoints(points[j],$scope.mapForm.clickType,color);
                    }
                    lbsService.showDivClickMap(this.showColorDivMap(colors));
                }
            }
            */
        };

        var getClickPoints = function(){
        };

        $timeout(function() {
            console.log("start");
            lbsService.showLbs(getClickPoints,$scope.mapModle.cityName);
        }, 4000);

        $timeout(function() {
            //var new_script = document.createElement("script");
            // document.write("<script  src='http://localhost:3000/vender/bootstrap-select/dist/js/bootstrap-select.js'><\/script>");
            //var m = $mySelector;
            $mySelector();
        }, 3000);
    });
