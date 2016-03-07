angular.module(constVar.appName)
    .controller('gisController',function($scope,$timeout,gisService,sigService,citycountyData,jsjdData,clickCityService){

        var vm = $scope.vm = {};
        vm.citys = citycountyData;
        vm.jsjds = jsjdData;
        vm.arpus = [
            {
                name: '小于30元',
                id: '1'
            },
            {
                name: '30-40元',
                id: '2'
            },
            {
                name: '40-50元',
                id: '3'
            },
            {
                name: '大于50元',
                id: '4'
            }
        ]
        // 更换地市
        $scope.$watch('vm.city', function(city) {
            vm.county = null;
        });

        $scope.gisMapModle = {
            cityName : "沈阳",
            maxValue : 20,

            show : function () {
                var cityId;
                ////console.log($scope.mapModle.opTime + "-" + $scope.vm.city.id);
                if($scope.vm.city.id == '024'){
                    cityId = '240';
                } else {
                    cityId = $scope.vm.city.id.substr(1,3);
                }
                var url = 'data/'+constVar.dataCableType+'_cell_'+$scope.mapModle.opTime +'_'+cityId+'_day' + constVar.dataJsonType;
                ////console.log(url);
                sigService.getHotPoints(url)
                    .then(
                    function (data, status, headers,
                              config){
                        points = data;
                        gisService.addLargePoint(points);
                    },
                    function (data, status, headers,
                              config){
                        ////console.log("result:fail");
                    }
                );
            },

            showCounty : function () {
                ////console.log($scope.mapModle.opTime + "-" + $scope.vm.city.id);
                var cityId;
                if($scope.vm.city.id == '024'){
                    cityId = '240';
                } else {
                    cityId = $scope.vm.city.id.substr(1,3);
                }
                var url = constVar.backstageUrl + 'process/CPE/QueryHomeCellProcess';
                ////console.log(url);
                //console.log($scope.vm.jsjd);
                var data = {
                    opTime : $scope.mapModle.opTime.replace(/-/g,""),
                    cityCode : $scope.vm.city==null?'':cityId,
                    countyCode : $scope.vm.county==null?'':$scope.vm.county.id,
                    stateMonth:$scope.mapModle.createTime==null?'':$scope.mapModle.createTime.replace(/-/g,""),
                    szRateMin:$scope.mapModle.szlMin,
                    szRateMax:$scope.mapModle.szlMax,
                    bz:$scope.vm.jsjd==null?'':$scope.vm.jsjd.id,
                    arpuMin:$scope.vm.arpu==null?null:$scope.vm.arpu.id=='1'?0:$scope.vm.arpu.id=='2'?30:$scope.vm.arpu.id=='3'?40:$scope.vm.arpu.id=='4'?50:null,
                    arpuMax:$scope.vm.arpu==null?null:$scope.vm.arpu.id=='1'?30:$scope.vm.arpu.id=='2'?40:$scope.vm.arpu.id=='3'?50:null
                };
                //console.log(data);
                sigService.getLineWay(url,data)
                    .then(
                    function (data, status, headers,
                              config){
                        var resultData = data.result;
                        ////console.log(resultData);
                        var points = new Array();
                        for(var i = 0;i < resultData.length;i++){
                            var szRateValue = 00;
                            if(resultData[i].bz == '1' && parseInt(resultData[i].szRate) == 0) {
                                szRateValue = 10 ;
                            } else if(resultData[i].bz == '1' && parseInt(resultData[i].szRate) > 0 && parseInt(resultData[i].szRate) <= 5 ) {
                                szRateValue = 11 ;
                            } else if(resultData[i].bz == '1' && parseInt(resultData[i].szRate) > 5 && parseInt(resultData[i].szRate) <= 10 ) {
                                szRateValue = 12 ;
                            } else if(resultData[i].bz == '1' && parseInt(resultData[i].szRate) > 10 && parseInt(resultData[i].szRate) <= 20 ) {
                                szRateValue = 13 ;
                            } else if(resultData[i].bz == '1' && parseInt(resultData[i].szRate) > 20) {
                                szRateValue = 14 ;
                            } else if(resultData[i].bz == '0') {
                                szRateValue = 00 ;
                            }
                            var point = {
                                lng : resultData[i].longitude,
                                lat : resultData[i].latitude,
                                all_port : resultData[i].allPort,
                                ydrate : resultData[i].ydrate,
                                cellName : resultData[i].cellName,
                                cellId :  resultData[i].cellId,
                                townId :  resultData[i].townId,
                                roadId :  resultData[i].roadId,
                                cityId :  clickCityService.cityNameFun(resultData[i].cityCode).result,
                                countyId :  clickCityService.countyNameFun(resultData[i].countyCode).result,
                                onuUsedPort :  resultData[i].onuUsedPort,
                                posUsedPort :  resultData[i].posUsedPort,
                                userNum :  resultData[i].userNum,
                                szRate : resultData[i].szRate,
                                stateTime : resultData[i].stateTime,
                                bz : resultData[i].bz,
                                bzName : resultData[i].bz=='1'?"已覆盖":"规划中",
                                szMark : szRateValue,
                                arpu : resultData[i].arpu
                            } ;
                            points.push(point);
                        }
                        ////console.log(points);
                        gisService.removeAllOverlays();
                        gisService.addLargePoint(points);
                    },
                    function (data, status, headers,
                              config){
                        ////console.log("result:fail");
                    }
                );
            },
            
            clickCity : function(){
                $timeout(function() {
                    if($scope.vm.city != null){
                        gisService.setCity_areaCode($scope.vm.city.id)
                    }},2000
                );
            },

            clickCouty : function(){
                timeout(function() {
                    if($scope.vm.county != null){
                        gisService.byDistrict($scope.vm.city.name,$scope.vm.county.name)
                    }},2000
                );
            }
        };

        gisService.showGis();

    });
