/**
 * Created by Administrator on 2015/4/29.
 */
'use strict';
angular.module(constVar.appName)
    .factory('gisService',function ($http){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };

        var mapObj,toolbar,overview,scale,mapSwitch,marker;

        var myGisService = {

            //初始化地图信息
            showGis : function(){
                var opt = {
                    zoom:13,//设置地图zoom级别
                    center:new MMap.LngLat(123.451995,41.723155),//设置地图中心点
                    doubleClickZoom:true,//双击放大地图
                    scrollwheel:true//鼠标滚轮缩放地图
                }
                mapObj = new MMap.Map("iCenter",opt);

                mapObj.plugin(["MMap.ToolBar","MMap.OverView","MMap.Scale","MMap.MapSwitch"],function()
                {
                    //加载工具条
                    toolbar = new MMap.ToolBar();
                    toolbar.autoPosition=false;
                    mapObj.addControl(toolbar);
                    //加载鹰眼
                    overview = new MMap.OverView();
                    mapObj.addControl(overview);
                    //加载比例尺
                    scale = new MMap.Scale();
                    mapObj.addControl(scale);
                    //卫星-普通地图切换
                    mapSwitch = new MMap.MapSwitch();
                    mapObj.addControl(mapSwitch);
                });
            },

            //多点展示
            addLargePoint : function (data){
                //mapObj.clearOverlays();
                var markerData = data;

                var marker = new Array();
                for(var i = 0; i<markerData.length; i++){
                    marker[i] = new MMap.Marker({id:"m"+i,
                        position:new MMap.LngLat(markerData[i].lng,markerData[i].lat),
                        icon:"images/marker"+markerData[i].szMark+".png",
                        offset:new MMap.Pixel(0,0),
                        draggable:false //可拖动
                        //Content:"<div style='width:45px;height:40px;background:url(custom_a_j.png) 0 0;overflow: hidden;'><div style='width:40px;height:20px;margin-top:6px;margin-top:6px;margin-left:5px;'>Mark</div></div>",
                    }) //自定义构造MMap.Marker对象
                }

                var arr = new Array();
                for(var i = 0; i<marker.length; i++){
                    arr.push(marker[i]);
                }

                mapObj.addOverlays(arr);

                var inforWindowList = new Array();

                for(var i = 0; i<markerData.length; i++){
                    inforWindowList[i] = new MMap.InfoWindow
                    ({
                        draggable:false, //可拖动
                        isCustom:true,
                        //content: "<div class='alert alert-info' role='alert'>该基站下用户数为<strong>"+ markerData[i].count+"</strong></div></span><div class='alert alert-info' role='alert'>平均APRU为<strong>"+ markerData[i].count+"元</strong></div>",
                        //content: "<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'>Panel title</h3></div><div class='panel-body'>Panel content</div></div>",
                        content : this.InfoWindow(markerData[i]),
                        offset:new MMap.Pixel(-64,-380),
                        //offset:new MMap.Pixel(0,0),
                        size:new MMap.Size(375,0)
                        //content:InfoWindow('这里是标题',"<div>这是一个自定义信息窗体示例！</div><div>this is ok!</div>"),

                    });
                }

                for(var i = 0; i<inforWindowList.length; i++){
                    this.clickMarker(marker[i],inforWindowList[i])
                }

            },
            InfoWindow : function (data){
                var title = !data.cellName?data.lng+','+data.lat : data.cellName;
                var m = [];
                m.push('<div  class="con" id="abc">');
                m.push('<a onclick="document.getElementById(\'abc\').style.display=\'none\'"><img src="images/gb.png" class="close_gb"></a>');
                m.push('<div class="clear"></div>');
                m.push('<div class="main" >');
                m.push('<div class="main_t">');
                m.push('<div class="main_t_l" style="display:none;height: 0px"><img src="" /></div>');
                m.push('<div class="main_t_r">');
                m.push('<div class="main_t_r_t" style="display:none;height: 0px">'+title+'</div>');
                m.push('<div class="main_t_r_c" style="display:none"><img src="images/s1.png" /><img src="images/s1.png" /><img src="images/s1.png" /><img src="images/s2.png" /><img src="images/s2.png" /></div>');
                m.push('<div class="main_t_r_b" style="display:none">标签：川菜、和平区、美食川菜\川菜、和平区、美食</div>');
                m.push('</div>');
                m.push('<div class="clear"></div>');
                m.push('</div>');
                m.push('<div class="clear"></div>');
                m.push('<div class="main_b">');
                m.push('<div  class="main_b_list main_t_r_t" style="color:#0066ff;font-size: 14px">'+title+'</div>');
                m.push('<div  class="main_b_list">中心经度-纬度：<span style="font-weight: bold">'+data.lng+','+data.lat+'</span></div>');
                m.push('<div  class="main_b_list">总端口表(个)：<span style="font-weight: bold">'+data.all_port+'</span></div>');
                m.push('<div  class="main_b_list">已利用端口数(个)：<span style="font-weight: bold">'+(parseInt(data.onuUsedPort)+parseInt(data.posUsedPort))+'</span></div>');
                m.push('<div  class="main_b_list">移动宽带客户数(户)：<span style="font-weight: bold">'+data.userNum+'</span></div>');
                m.push('<div  class="main_b_list">移动宽带渗透率(宽带客户数/小区住户数,%)：<span style="font-weight: bold">'+data.ydrate+'</span></div>');
                m.push('<div  class="main_b_list">实装率(客户数/覆盖数,%)：<span style="font-weight: bold">'+data.szRate+'</span></div>');
                m.push('<div  class="main_b_list">用户平均ARPU(元/户)：<span style="font-weight: bold">'+data.arpu+'</span></div>');
                m.push('<div  class="main_b_list">小区状态：<span style="font-weight: bold">'+data.bzName+'</span></div>');
                m.push('<div  class="main_b_list">录入时间：<span style="font-weight: bold">'+data.stateTime+'</span></div>');
                m.push('<div  class="main_b_list">地址：<span style="font-weight: bold">'+data.cityId+'市'+data.countyId+data.townId+data.roadId+'</span></div>');
                m.push('</div>');
                m.push('</div>');
                m.push('<div style="height: 10px;margin-bottom:10px;">');
                m.push('<div style="float:right; width:300px; height: 10px">');
                m.push('<div style="float:left; width:130px; height:30px;"><img src="images/arrow.png" /></div>');
                m.push('</div>');
                m.push('<div class="clear"></div>');
                m.push('</div>');
                m.push('</div>');
                return m.join("");
            },

            //点击事件
            clickMarker : function (marker,inforWindow){
                mapObj.bind(marker,"click",function(e)
                {
                    inforWindow.open(mapObj, marker.getPosition());
                });
            },

            setCity_areaCode : function (cityId){//根据区号设置位置
                mapObj.setCity(cityId);
            },

            byCity : function (cityName){
                mapObj.clearOverlays();
                var city = cityName;
                var partition = new MMap.Partition();
                partition.byCity(city,this.addCityMarker);
            },

            byDistrict : function (city,county){
                mapObj.clearOverlays();
                var district = county;
                var city = city;
                var partition = new MMap.Partition();
                partition.byDistrict(district,city,this.byDistricty_CallBack);
            },

            byDistricty_CallBack : function (data){
                if(data.state="E0")
                {
                    //console.log(data.list);
                    var lineNum = data.list.length;//返回总数.
                    for(var i=0;i<lineNum;i++){
                        var arr = data.list[i].coords;
                        var name = data.list[i].name;

                        mapObj.clearOverlays();
                        var polygonArr = new Array();
                        var district = arr.split(";");
                        var lnglat = new Array();
                        for(var e=0;e<district.length-1;e++){
                            var lnglat=district[e].split(",");
                            polygonArr.push(new MMap.LngLat(lnglat[0],lnglat[1]));
                        }
                        var polygon=new MMap.Polygon({
                            id:"polygon01",
                            path:polygonArr, //线经纬度数组
                            strokeColor:"#005cb5", //线颜色
                            strokeOpacity:0.8, //线透明度
                            strokeWeight:6, //线宽
                            fillColor: "#f5deb3", //填充色
                            fillOpacity: 0 //填充透明度
                        });
                        mapObj.addOverlays(polygon);
                        var inforWindow = new MMap.InfoWindow({//多边形的信息窗体
                            content:name,//窗体内容
                            offset:new MMap.Pixel(0,0)//相对于基点的偏移
                        });
                        mapObj.bind(polygon,"click",function(e){
                            inforWindow.open(mapObj,e.lnglat);
                        });
                        mapObj.setFitView();
                    }
                }
            },

             removeAllOverlays : function (){
               mapObj.clearOverlays();
             },

            addCityMarker : function (data){
                marker = new MMap.Marker({
                    id:"m", //marker id
                    position:new MMap.LngLat(data.city.x,data.city.y), //位置
                    icon:"http://code.mapabc.com/images/lan_1.png",//复杂图标
                    draggable:false, //可拖动
                    visible:false//可见
                });
                mapObj.addOverlays(marker);
                mapObj.setFitView(marker);
                var inforWindow = new MMap.InfoWindow
                ({
                    content:data.city.name,
                    size:new MMap.Size(100,0),
                    offset:{x:-3,y:-32}
                });
                mapObj.bind(marker,"click",function(e)
                {
                    inforWindow.open(mapObj,marker.getPosition());
                });
            }
        }
        return myGisService;

    });