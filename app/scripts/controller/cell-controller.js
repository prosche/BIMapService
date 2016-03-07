angular.module(constVar.appName)
    .controller('cellController',function($scope,$timeout,$compile,timeService,lbsService,clickCityService,divMapService,sigService,cellMapDataService,cityData,countysData,countyData){
        $scope.citys = cityData;
        $scope.countys = countyData;

        var colors = [
            {id:'0',name:'小于10%',color:'00FF00'},
            {id:'1',name:'10-30%',color:'FFFF00'},
            {id:'2',name:'大于30%',color:'FF8000'},
            {id:'3',name:'不继续发展',color:'FF0000'}
        ];
        $scope.vm = {};
        $scope.vm.citys = countysData;
        // 更换地市
        $scope.$watch('cellModle.cityId', function(city) {
            $scope.vm.countys  = $scope.vm.citys[14].countys;

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
        });

        $scope.cellModle = {
            cityName : "沈阳市",
            opTime : "",

            clickCity : function(a){
                lbsService.unShowHotPoints();
                var cityId = $scope.cellModle.cityId;
                if(cityId!=""){
                    var city = clickCityService.clickCityFun(cityId,$scope.citys);
                    lbsService.showClickCity(city.result);
                    $timeout(function() {
                        cityId = $scope.cellModle.cityId;
                        var city = clickCityService.clickCityFun(cityId,$scope.citys);
                        lbsService.showClickCity(city.result);
                    }, 2000);
                }
            },
            clickCounty : function(countyId){
                lbsService.unShowHotPoints();
                var countyId = $scope.cellModle.countyId;
                if(countyId!=null){
                    var county = clickCityService.clickCityFun(countyId,$scope.vm.countys);
                    lbsService.showClickCity(county.result);
                    $timeout(function() {
                        countyId = $scope.cellModle.countyId;
                        var county = clickCityService.clickCityFun(countyId,$scope.vm.countys);
                        lbsService.showClickCity(county.result);
                    }, 2000);  
                };
            },
            showCellData : function(type){
                var url = constVar.backstageUrl + 'process/CPE/QueryCellProcess';
                var day = timeService.getBeforeDate(1).result;
                var data = {
                    opMonth : $scope.cellModle.opTime.replace(/-/g,"")==""?day.substring(0,6):$scope.cellModle.opTime.replace(/-/g,"").substring(0,6),
                    opTime : $scope.cellModle.opTime.replace(/-/g,"")==""?day:$scope.cellModle.opTime.replace(/-/g,""),
                    cityId : $scope.cellModle.cityId=={}?"":$scope.cellModle.cityId,
                    countyId : $scope.cellModle.countyId=={}?"":$scope.cellModle.countyId,
                    cpeCntMin : $scope.cellModle.cpeCountsMin =={}?"":$scope.cellModle.cpeCountsMin,
                    cpeCntMax : $scope.cellModle.cpeCountsMax =={}?"":$scope.cellModle.cpeCountsMax,
                    lacCiBhMin : $scope.cellModle.areaMin =={}?"":$scope.cellModle.areaMin,
                    lacCiBhMax : $scope.cellModle.areaMax =={}?"":$scope.cellModle.areaMax,
                    avgCpeArpuMin : $scope.cellModle.arpuMin == {}?"":$scope.cellModle.arpuMin,
                    avgCpeArpuMax : $scope.cellModle.arpuMax == {}?"":$scope.cellModle.arpuMax,
                    avgLteMin : $scope.cellModle.cellRateMin =={}?"":$scope.cellModle.cellRateMin,
                    avgLteMax : $scope.cellModle.cellRateMax =={}?"":$scope.cellModle.cellRateMax,
                    dataName : $scope.cellModle.cellName =={}?"":$scope.cellModle.cellName
                };
                //console.log(data);
                sigService.getLineWay(url,data)
                    .then(
                    function (data, status, headers,
                              config){
                        //////console.log(data);
                        var resultData = data.result;
                        var points = cellMapDataService.celllMap(resultData,colors).result;
                        //////console.log(points);
                        lbsService.remove_overlay();
                        $scope.cellModle.cellMapFun(points,type);
                    },
                    function (data, status, headers,
                              config){
                    }
                );
            },
            cellMapFun : function(data,type){
                for(var i =0 ; i< colors.length;i++){
                    lbsService.showLagerPoints(data[i],type,colors[i].color);
                }
                var colorDiv = divMapService.divColorMap(colors).result;
                ////console.log(colorDiv);
                lbsService.showDivClickMap(colorDiv);
            }
        };

        var getClickPoints = function(){
        };

        $timeout(function() {
            ////////console.log("start");
            lbsService.showLbs(getClickPoints,$scope.cellModle.cityName);
        }, 4000);

        $timeout(function() {
            //var new_script = document.createElement("script");
            // document.write("<script  src='http://localhost:3000/vender/bootstrap-select/dist/js/bootstrap-select.js'><\/script>");
            //var m = $mySelector;
            $mySelector();
        }, 3000);
    });
