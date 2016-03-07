'use strict';
angular.module(constVar.appName)
    .factory('clickCityService',function (){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };
        var myClickService = {
            clickCityFun : function (cityId, citys){
                var cityName;
                if(cityId != null && cityId != '999'){
                    //console.log(cityId);
                    for(var id in citys){
                        if(cityId[cityId.length-1] == citys[id].id){
                            cityName = citys[id].name;
                            break;
                        } else if (cityId==citys[id].id){
                            cityName = citys[id].name;
                            break;
                        } else {
                            cityName = "沈阳";
                        }
                    }
                    //console.log(cityName);
                    //lbsService.showClickCity($scope.mapModle.cityName);
                } else {
                    cityName = "沈阳";
                    //lbsService.showClickCity($scope.mapModle.cityName);
                }
                //console.log(cityName);
                return new resultObject(true, "", cityName);
            },
            clickCountyFun : function (countyId, countys){
                var countyName;
                if(countyId != null){
                    ////console.log($scope.citys);
                    for(var id in countys){
                        ////console.log(id);
                        if(countyId[countyId.length-1] == countys[id].id){
                            countyId = countys[id].name;
                            break;
                        } else if (countyId==countys[id].id){
                            countyId = countys[id].name;
                            break;
                        } else {
                            countyId = "沈阳";
                        }
                    }
                    ////console.log($scope.mapModle.countyName);
                    //lbsService.showClickCity($scope.mapModle.countyName);
                } else {
                    countyId = "沈阳";
                    //lbsService.showClickCity($scope.mapModle.countyName);
                }
                return new resultObject(true, "", countyId);
            },
            cityNameFun : function(cityId){
                var cityName;
                switch(cityId)
                {
                case 240:
                  cityName = "沈阳";
                  break;
                case 411:
                  cityName = "大连";
                  break;
                case 412:
                  cityName = "鞍山";
                  break;
                case 413:
                  cityName = "抚顺";
                  break;
                case 414:
                  cityName = "本溪";
                  break;
                case 415:
                  cityName = "丹东";
                  break;
                case 416:
                  cityName = "锦州";
                  break;
                case 417:
                  cityName = "营口";
                  break;
                case 418:
                  cityName = "阜新";
                  break;
                case 419:
                  cityName = "辽阳";
                  break;
                case 421:
                  cityName = "朝阳";
                  break;
                case 410:
                  cityName = "铁岭";
                  break;
                case 427:
                  cityName = "盘锦";
                  break;
                case 429:
                  cityName = "葫芦岛";
                  break;
                default:
                  cityName = "沈阳";
                };
                return new resultObject(true, "", cityName);
            },

            countyNameFun : function(countyId){
                var countyName;
                switch(countyId)
                {        
                 case 24001:
                countyName = "沈阳代销管理中心";              
                           break;                                      
                 case 24002:
                countyName = "新民";
                           break;                                      
                 case 24003:
                countyName = "辽中县";
                           break;                                      
                 case 24004:
                countyName = "法库县";
                           break;                                      
                 case 24005:
                countyName = "康平县";
                           break;                                      
                 case 24006:
                countyName = "沈北新区";
                           break;                                      
                 case 24007:
                countyName = "苏家屯";
                           break;                                      
                 case 24008:
                countyName = "浑南";
                           break;                                      
                 case 24009:
                countyName = "沈河区";
                           break;                                      
                 case 24010:
                countyName = "和平区";
                           break;                                      
                 case 24011:
                countyName = "铁西区";
                           break;                                      
                 case 24012:
                countyName = "皇姑区";
                           break;                                      
                 case 24013:
                countyName = "大东区";
                           break;                                      
                 case 24014:
                countyName = "于洪";
                           break;                                      
                 case 24015:
                countyName = "沈阳VIP客户服务中心";
                           break;                                      
                 case 24016:
                countyName = "沈阳销售中心";
                           break;                                      
                 case 24017:
                countyName = "沈阳重要客户中心";
                           break;                                      
                 case 41101:
                countyName = "大连";
                           break;                                      
                 case 41102:
                countyName = "大连开发区（县）";
                           break;                                      
                 case 41103:
                countyName = "金州";
                           break;                                      
                 case 41104:
                countyName = "普兰店";
                           break;                                      
                 case 41105:
                countyName = "瓦房店";
                           break;                                      
                 case 41106:
                countyName = "庄河";
                           break;                                      
                 case 41107:
                countyName = "旅顺";
                           break;                                      
                 case 41108:
                countyName = "长海";
                           break;                                      
                 case 41109:
                countyName = "西岗区";
                           break;                                      
                 case 41110:
                countyName = "沙河口区";
                           break;                                      
                 case 41111:
                countyName = "甘井子区";
                           break;                                      
                 case 41112:
                countyName = "大连业务策划推广中心";
                           break;                                      
                 case 41113:
                countyName = "大连销售中心";
                           break;                                      
                 case 41114:
                countyName = "大连高新园区";
                           break;                                      
                 case 41201:
                countyName = "鞍山";
                           break;                                      
                 case 41202:
                countyName = "海城市（县）";
                           break;                                      
                 case 41203:
                countyName = "台安县";
                           break;                                      
                 case 41204:
                countyName = "岫岩县";
                           break;                                      
                 case 41205:
                countyName = "西柳区";
                           break;                                      
                 case 41206:
                countyName = "铁东区";
                           break;                                      
                 case 41207:
                countyName = "铁西区";
                           break;                                      
                 case 41208:
                countyName = "立山区";
                           break;                                      
                 case 41209:
                countyName = "千山区";
                           break;                                      
                 case 41210:
                countyName = "鞍山渠道中心";
                           break;                                      
                 case 41211:
                countyName = "鞍山重要集团单位营销部";
                           break;                                      
                 case 41301:
                countyName = "新抚区";
                           break;                                      
                 case 41302:
                countyName = "抚顺县";
                           break;                                      
                 case 41303:
                countyName = "新宾县";
                           break;                                      
                 case 41304:
                countyName = "清原县";
                           break;                                      
                 case 41305:
                countyName = "顺城区";
                           break;                                      
                 case 41306:
                countyName = "望花区";
                           break;                                      
                 case 41307:
                countyName = "东洲区";
                           break;                                      
                 case 41308:
                countyName = "抚顺渠道管理中心";
                           break;                                      
                 case 41309:
                countyName = "抚顺VIP客户服务中心";
                           break;                                      
                 case 41310:
                countyName = "抚顺开发区营销中心";
                           break;                                      
                 case 41311:
                countyName = "抚顺销售中心";
                           break;                                      
                 case 41312:
                countyName = "抚顺重要客户中心";
                           break;                                      
                 case 41401:
                countyName = "平山区";
                           break;                                      
                 case 41402:
                countyName = "本溪县";
                           break;                                      
                 case 41403:
                countyName = "桓仁县";
                           break;                                      
                 case 41405:
                countyName = "明山区";
                           break;                                      
                 case 41406:
                countyName = "溪湖区";
                           break;                                      
                 case 41407:
                countyName = "南芬区";
                           break;                                      
                 case 41409:
                countyName = "本溪重要客户中心";
                           break;                                      
                 case 41501:
                countyName = "丹东";
                           break;                                      
                 case 41502:
                countyName = "东港";
                           break;                                      
                 case 41503:
                countyName = "凤城";
                           break;                                      
                 case 41504:
                countyName = "宽甸县";
                           break;                                      
                 case 41505:
                countyName = "丹东市振兴区";
                           break;                                      
                 case 41506:
                countyName = "丹东市元宝区";
                           break;                                      
                 case 41507:
                countyName = "丹东市振安区";
                           break;                                      
                 case 41508:
                countyName = "丹东市大客户中心";
                           break;                                      
                 case 41509:
                countyName = "丹东市代销管理服务中心";
                           break;                                      
                 case 41510:
                countyName = "丹东市数据中心";
                           break;                                      
                 case 41511:
                countyName = "丹东重要客户中心";
                           break;                                      
                 case 41601:
                countyName = "古塔区";
                           break;                                      
                 case 41602:
                countyName = "北镇";
                           break;                                      
                 case 41603:
                countyName = "凌海";
                           break;                                      
                 case 41604:
                countyName = "义县";
                           break;                                      
                 case 41605:
                countyName = "黑山县";
                           break;                                      
                 case 41606:
                countyName = "锦州开发区（县）";
                           break;                                      
                 case 41607:
                countyName = "凌河区";
                           break;                                      
                 case 41608:
                countyName = "太和区";
                           break;                                      
                 case 41701:
                countyName = "站前区";
                           break;                                      
                 case 41702:
                countyName = "大石桥";
                           break;                                      
                 case 41703:
                countyName = "盖州";
                           break;                                      
                 case 41704:
                countyName = "鲅鱼圈";
                           break;                                      
                 case 41705:
                countyName = "老边区";
                           break;                                      
                 case 41706:
                countyName = "西市区";
                           break;                                      
                 case 41707:
                countyName = "营口终端公司";
                           break;                                      
                 case 41801:
                countyName = "阜新";
                           break;                                      
                 case 41802:
                countyName = "阜新县";
                           break;                                      
                 case 41803:
                countyName = "彰武县";
                           break;                                      
                 case 41804:
                countyName = "清河门区";
                           break;                                      
                 case 41805:
                countyName = "新邱区";
                           break;                                      
                 case 41901:
                countyName = "辽阳市内";
                           break;                                      
                 case 41902:
                countyName = "辽阳县";
                           break;                                      
                 case 41903:
                countyName = "灯塔";
                           break;                                      
                 case 41904:
                countyName = "宏伟区";
                           break;                                      
                 case 41905:
                countyName = "弓长岭区";
                           break;                                      
                 case 41906:
                countyName = "庆阳";
                           break;                                      
                 case 41907:
                countyName = "佟二堡";
                           break;                                      
                 case 41908:
                countyName = "曙光";
                           break;                                      
                 case 41909:
                countyName = "太子河区";
                           break;                                      
                 case 42101:
                countyName = "朝阳";
                           break;                                      
                 case 42102:
                countyName = "北票";
                           break;                                      
                 case 42103:
                countyName = "凌源";
                           break;                                      
                 case 42104:
                countyName = "建平县";
                           break;                                      
                 case 42105:
                countyName = "喀左县";
                           break;                                      
                 case 42106:
                countyName = "朝阳县";
                           break;                                      
                 case 42107:
                countyName = "朝阳铁通合作（虚拟）";
                           break;                                      
                 case 42108:
                countyName = "朝阳集团服务中心";
                           break;                                      
                 case 41001:
                countyName = "铁岭";
                           break;                                      
                 case 41002:
                countyName = "开原";
                           break;                                      
                 case 41003:
                countyName = "昌图县";
                           break;                                      
                 case 41004:
                countyName = "调兵山";
                           break;                                      
                 case 41005:
                countyName = "清河区（县）";
                           break;                                      
                 case 41006:
                countyName = "西丰县";
                           break;                                      
                 case 41007:
                countyName = "铁岭县";
                           break;                                      
                 case 42701:
                countyName = "兴隆台区";
                           break;                                      
                 case 42702:
                countyName = "大洼县";
                           break;                                      
                 case 42703:
                countyName = "油田营业部";
                           break;                                      
                 case 42704:
                countyName = "盘山县";
                           break;                                      
                 case 42705:
                countyName = "双台子区";
                           break;                                      
                 case 42706:
                countyName = "辽滨营业区";
                           break;                                      
                 case 42901:
                countyName = "连山区";
                           break;                                      
                 case 42902:
                countyName = "兴城";
                           break;                                      
                 case 42903:
                countyName = "绥中县";
                           break;                                      
                 case 42904:
                countyName = "建昌县";
                           break;                                      
                 case 42905:
                countyName = "葫芦岛郊区（县）";
                           break;                                      
                 case 42906:
                countyName = "龙港区";
                           break;                                      
                 case 42907:
                countyName = "葫芦岛重要客户中心";
                           break;                                      
                 case 42908:
                countyName = "葫芦岛市场经营部";
                break;                                      
                default:
                  countyName = "沈阳代销管理中心";
                };
                return new resultObject(true, "", countyName);
            }
        }
        return myClickService;

    });