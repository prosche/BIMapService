/**
 * Created by Administrator on 2015/4/29.
 */
'use strict';
angular.module(constVar.appName)
    .factory('lbsService',function ($http){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };

        //定义Baidu Lbs Map头
        var map ;

        //比例尺
        var top_left_control;
        var top_left_navigation;

        //热力展示
        var heatmapOverlay;

        //路书
        var drv;
        var lushu;

        //画圆
        var circle;
        //DIV类型
        var clickType;
        var myZoomCtrl;

        var myLbsService = {
            positionModel : {
                successData : null
            },

            lbsServiceModel : {
                lng : null
            },

            //初始化地图信息
            showLbs : function(callBackFun,cityname){
                // 百度地图API功能
                map = new BMap.Map("container");

                // map.centerAndZoom("沈阳",12);
                if(!cityname){
                    cityname ="沈阳";
                }
                map.centerAndZoom(cityname,8);
            /*    var point = new BMap.Point(123.440642, 41.810849);
                map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别*/
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.enableScrollWheelZoom(); // 允许滚轮缩放

                //比例尺
                top_left_control = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT
                }); // 左上角，添加比例尺
                top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
                //	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
                /*缩放控件type有四种类型:
                 BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

                //增加比例尺功能
                map.addControl(top_left_control);
                map.addControl(top_left_navigation);

                ////设置圆心点半径
                heatmapOverlay = new BMapLib.HeatmapOverlay({
                    "radius": 20
                });

                var getMapPointValue;
                // 单击获取点击的经纬度
                map
                    .addEventListener(
                    "click",callBackFun
                   );

                /*map.addEventListener("load",function(){
                    //myDis.close();  //关闭鼠标测距大
                })*/
                //map.addEventListener("tilesloaded",function(){alert("地图加载完毕");});
            },

            //设置当前地市
            showClickCity : function(city) {
                if(map!=null){
                    map.centerAndZoom(city,12);
                }
            },
            //海量点
            showLagerPoints : function(lagerPoints,type,color){
                if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
                    clickType = type;
                    var points = lagerPoints;
                    //for (var i = 0; i < data.data.length; i++) {
                    //	points.push(new BMap.Point(data.data[i][0], data.data[i][1]));
                    //}
                    var options = {
                        size: BMAP_POINT_SIZE_BIG,
                        shape: BMAP_POINT_SHAPE_STAR, //BMAP_POINT_SHAPE_WATERDROP
                        color:  "#"+color
                    }
                    var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection

                    pointCollection.addEventListener('click', myLbsService.clickDIVPoint);
                    //map.clearOverlays();
                    map.addOverlay(pointCollection);  // 添加Overlay
                } else {
                    alert('请在chrome、safari、IE8+以上浏览器查看本示例');
                }
            },

            //点聚合
            markersPoint : function(lagerPoints) {
                //console.log("lagerPoints.length :" + lagerPoints.length);
                var MAX = lagerPoints.length;
                var markers = [];
                var pt = null;
                var i = 0;
                for (; i < MAX; i++) {
                    pt = new BMap.Point(lagerPoints[i].lng +","+ lagerPoints[i].lat);
                    markers.push(new BMap.Marker(pt));
                }
                //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
                var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:markers});
            },

            //div展示点信息
            clickDIVPoint : function (e) {
                var opts;
                var infoWindow;
                if(clickType=='channel'){
                    //自定义展示信息
                    opts = {
                        width : 350,     // 信息窗口宽度
                        height: 300,     // 信息窗口高度
                        title : "渠道信息情况" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }

                    //alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                    infoWindow = new BMap.InfoWindow(
                        '<div  class="main_b_list">渠道名称：<span style="font-weight: bold">'+e.point.channelName+'</span></div>'
                        + '<div  class="main_b_list">渠道入网时间：<span style="font-weight: bold">'+e.point.createDate+'</span></div>'
                        + '<div  class="main_b_list">渠道类型：<span style="font-weight: bold">'+e.point.newChannelType1Name+" / "+e.point.newChannelType2Name+" / "+e.point.newChannelType3Name+" / "+e.point.newChannelType4Name+'</span></div>'
                        + '<div  class="main_b_list">渠道地址：<span style="font-weight: bold">'+e.point.channelAddr+'</span></div>'
                        + '<div  class="main_b_list">渠道星级：<span style="font-weight: bold">'+e.point.channelStar+'</span></div>'
                        + '<div  class="main_b_list">归属营业区：<span style="font-weight: bold">'+e.point.countyName+'</span></div>'
                        + '<div  class="main_b_list">归属行政区/ 归属行政乡镇/ 归属行政村：<span style="font-weight: bold">'+e.point.xzCountyName+" / "+e.point.xzTownName+" / "+e.point.xzVillageName+'</span></div>'
                        + '<div  class="main_b_list">归属商业圈：<span style="font-weight: bold">'+e.point.bcName+'</span></div>'
                        ,opts);  // 创建信息窗口对象

                } else if (clickType=='cpe'){
                    opts = {
                        width : 350,     // 信息窗口宽度
                        height: 130,     // 信息窗口高度
                        title : "信息情况" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }

                    //alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                    infoWindow = new BMap.InfoWindow(
                        /*'<div  class="main_b_list">4G流量：<span style="font-weight: bold">'+e.point.lteVolume+'</span>M;&nbsp日累计4G流量：<span style="font-weight: bold">'+e.point.mtdLteVolume+'</span>M</div>'
                        + '<div  class="main_b_list">4G用户数：<span style="font-weight: bold">'+e.point.lteCounts+'</span>户;&nbsp日累计4G用户数：<span style="font-weight: bold">'+e.point.mtdLteCounts+'</span>户</div>'
                        + */'<div  class="main_b_list">CPE数：<span style="font-weight: bold">'+e.point.cpeCnt+'</span>个;&nbsp日累计CPE数：<span style="font-weight: bold">'+e.point.mtdCpeCnt+'</span>个</div>'
                        + '<div  class="main_b_list">CPE流量：<span style="font-weight: bold">'+e.point.flows+'</span>M;&nbsp日累计CPE流量：<span style="font-weight: bold">'+e.point.mtdFlows+'</span>M</div>'
                        + '<div  class="main_b_list">基站利用率：<span style="font-weight: bold">'+e.point.lte+'</span>%'
                        ,opts);  // 创建信息窗口对象

                } else if (clickType=='gprs'){
                    opts = {
                        width : 350,     // 信息窗口宽度
                        height: 200,     // 信息窗口高度
                        title : "信息情况" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }

                    //alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                    infoWindow = new BMap.InfoWindow(
                        '<div  class="main_b_list">4G流量：<span style="font-weight: bold">'+e.point.lteVolume+'</span>M;&nbsp日累计4G流量：<span style="font-weight: bold">'+e.point.mtdLteVolume+'</span>M</div>'
                        + '<div  class="main_b_list">4G用户数：<span style="font-weight: bold">'+e.point.lteCounts+'</span>户;&nbsp日累计4G用户数：<span style="font-weight: bold">'+e.point.mtdLteCounts+'</span>户</div>'
                        + '<div  class="main_b_list">2G&3G流量：<span style="font-weight: bold">'+e.point.usersCounts+'</span>M;&nbsp日累计2G&3G流量：<span style="font-weight: bold">'+e.point.mtdUsersCounts+'</span>M</div>'
                        + '<div  class="main_b_list">2G&3G用户数：<span style="font-weight: bold">'+e.point.flows+'</span>户;&nbsp日累计2G&3G用户数：<span style="font-weight: bold">'+e.point.mtdFlows+'</span>户</div>'
                        + '<div  class="main_b_list">基站利用率：<span style="font-weight: bold">'+e.point.lte+'</span>%;&nbsp日累计基站利用率：<span style="font-weight: bold">'+e.point.mtdLte+'</span>%</div>'
                        ,opts);  // 创建信息窗口对象

                } else if (clickType=='cell'){
                    opts = {
                        width : 350,     // 信息窗口宽度
                        height: 290,     // 信息窗口高度
                        title : "分区信息情况" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }

                    //alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                    infoWindow = new BMap.InfoWindow(
                        '<div  class="main_b_list">分区名称：<span style="font-weight: bold">'+e.point.dataName+'</span>'
                        + '<div  class="main_b_list">分区内基站小区数：<span style="font-weight: bold">'+e.point.lacCiCnt+'</span>个'
                        + '<div  class="main_b_list">分区饱和承载量：<span style="font-weight: bold">'+e.point.lacCiBh+'</span>'
                        + '<div  class="main_b_list">分区内已发展CPE客户数：<span style="font-weight: bold">'+e.point.cpeCnt+'</span>户'
                        + '<div  class="main_b_list">分区内已发展CPE客户平均ARPU：<span style="font-weight: bold">'+e.point.avgCpeArpu+'</span>元'
                        + '<div  class="main_b_list">分区承载率 I/H：<span style="font-weight: bold">'+e.point.dataCz+'</span>'
                        + '<div  class="main_b_list">分区内基站小区平均利用率：<span style="font-weight: bold">'+e.point.avgLte+'</span>%'
                        + '<div  class="main_b_list">分区内自忙时利用率超过50%的基站数：<span style="font-weight: bold">'+e.point.lteMore50+'</span>个'
                        + '<div  class="main_b_list">分区内下挂CPE数超过10个的基站小区数：<span style="font-weight: bold">'+e.point.cpeCntM10+'</span>个'
                        ,opts);  // 创建信息窗口对象

                } else {
                    opts = {
                        width : 200,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title : "信息情况" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }
                    infoWindow = new BMap.InfoWindow(e.point.lng + ',' + e.point.lat , opts);  // 创建信息窗口对象
                }
                map.openInfoWindow(infoWindow,new BMap.Point(e.point.lng,e.point.lat)); //开启信息窗口
            },
            //单击热点图层
            clickHotPoint : function (e)//单击热点图层
            {
                var customPoi = e.customPoi;//poi的默认字段
                var contentPoi=e.content;//poi的自定义字段
                var content = '<p style="width:280px;margin:0;line-height:20px;">地址：' + customPoi.address + '<br/>价格:'+contentPoi.dayprice+'元'+'</p>';
                var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                    title: customPoi.title, //标题
                    width: 290, //宽度
                    height: 40, //高度
                    panel : "panel", //检索结果面板
                    enableAutoPan : true, //自动平移
                    enableSendToPhone: true, //是否显示发送到手机按钮
                    searchTypes :[
                        BMAPLIB_TAB_SEARCH,   //周边检索
                        BMAPLIB_TAB_TO_HERE,  //到这里去
                        BMAPLIB_TAB_FROM_HERE //从这里出发
                    ]
                });
                var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
                searchInfoWindow.open(point);
            },

            //自定义空间
            // 百度地图API功能
            showDivMap : function(dayValue,timeValue) {
                var cr = new BMap.CopyrightControl({
                    anchor: BMAP_ANCHOR_TOP_RIGHT
                }); //设置版权控件位置
                map.addControl(cr); //添加版权控件
                var bs = map.getBounds(); //返回地图可视区域
                cr.addCopyright({
                    id: 1,
                    content: "<a href='#' style='font-size:20px;background:yellow'> "+ dayValue+ " "+ timeValue.hour + ":" + timeValue.min + "</a>",
                    bounds: bs
                });
                //Copyright(id,content,bounds)类作为CopyrightControl.addCopyright()方法的参数
            },

            showDivButtonMap : function(divContent) {
                var cr = new BMap.CopyrightControl({
                    offset: new BMap.Size(10, 50),
                    anchor: BMAP_ANCHOR_TOP_RIGHT
                }); //设置版权控件位置
                map.addControl(cr); //添加版权控件
                var bs = map.getBounds(); //返回地图可视区域
                cr.addCopyright({
                    id: 1,
                    content: divContent,
                    bounds: bs
                });
                //Copyright(id,content,bounds)类作为CopyrightControl.addCopyright()方法的参数
            },

            showDivClickMap : function(divType) {

                function ZoomControl(){
                    // 默认停靠位置和偏移量
                    this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
                    this.defaultOffset = new BMap.Size(10, 50);
                }
                // 通过JavaScript的prototype属性继承于BMap.Control
                ZoomControl.prototype = new BMap.Control();

                // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                ZoomControl.prototype.initialize = function(map){
                    // 创建一个DOM元素
                    var div = divType;
                    // 添加DOM元素到地图中
                    map.getContainer().appendChild(div);
                    // 将DOM元素返回
                    return div;
                }
                // 创建控件
                map.removeControl(myZoomCtrl);
                myZoomCtrl = new ZoomControl();
                map.addControl(myZoomCtrl); //添加版权控件
            },

            //显示热力图
            showHotPoints : function(points,maxcounts) {
                map.addOverlay(heatmapOverlay);
                if (!myLbsService.isSupportCanvas()) {
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }
                //	alert("显示热力图");
                heatmapOverlay.setDataSet({
                    data: points,
                    max: maxcounts
                });
                heatmapOverlay.show();
            },

            replayShowHotPoints : function repalyHeatmap() {
                heatmapOverlay.show();
            },

            //关闭显示热力图
            unShowHotPoints : function closeHeatmap() {
                if(map!=null){
                    heatmapOverlay.hide();
                }
            },

            //浏览器是否支持canvas功能
            isSupportCanvas : function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
            } ,

         //两点之间的轨迹
            showLineWay : function (startLng,endLng) {
                var p1 = new BMap.Point(startLng);
                var p2 = new BMap.Point(endLng);

                var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false}});
                driving.search(p1, p2);
            },

            //路书功能
            showLuShu : function(data){
                  drv = new BMap.DrivingRoute(map, {
                    onSearchComplete: function(res) {
                        if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                            //构成路线的point的数组.
                            var arrPois = res.getPlan(0).getRoute(0).getPath();
                            map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
                            map.setViewport(arrPois);
                            //可选的输入参数，非必填项。可输入选项包括：
                            lushu = new BMapLib.LuShu(map,arrPois,{
                                defaultContent:"个人运动轨迹",//"从天安门到百度大厦"
                                autoView:false,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                                icon  : new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                                speed: 409,//覆盖物移动速度，单位米/秒
                                enableRotation:false,//是否设置marker随着道路的走向进行旋转
                                //要在覆盖物移动过程中，显示的特殊点
                                landmarkPois: [
                                    /*{lng:116.314782,lat:39.913508,html:'加油站',pauseTime:2},
                                    {lng:116.315391,lat:39.964429,html:'高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',pauseTime:3},
                                    {lng:116.381476,lat:39.974073,html:'肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>',pauseTime:2}
          */
                                ]});
                        }
                    }
                });

                for(var i = 0; i< data.length-1 ; i ++){
                    drv.search(new BMap.Point(data[i].lng,data[i].lat), new BMap.Point(data[i+1].lng,data[i+1].lat));
                    //console.log("From At:" + data[i].hour + ":" + data[i].minute + ", lng" + data[i].lng +","+data[i].lat + "; To At:" + data[i+1].hour + ":" + data[i+1].minute + ", lng" +  data[i+1].lng + "," + data[i+1].lat);
                }
//                var p1 = new BMap.Point(123.451101,41.81684);
//                var p2 = new BMap.Point(123.451243,41.816711);
//                var p3 = new BMap.Point(123.453001,41.813301);
//                drv.search(p1, p2);
//                drv.search(p2, p3);
            },

            runLuShu : function(){
                lushu.start();
            },
            stopLuShu : function(){
                lushu.stop();
            },
            pauseLuShu : function(){
                lushu.pause();
            },
            hideLuShuTitle : function(){
                lushu.hideInfoWindow();
            },
            showLuShuTitle : function(){
                lushu.showInfoWindow();
            }, 
            
            //多点标记
            showLargePoints : function(data){
            	myLbsService.remove_overlay();
//                var json_data = [[123.451101,41.81684],[123.451243,41.816711],[123.453001,41.813301]];
                var pointArray = new Array();
                for(var i=0;i<data.length;i++){
                    var marker = new BMap.Marker(new BMap.Point(data[i].lng,data[i].lat)); // 创建点
                    map.addOverlay(marker);    //增加点
                    pointArray[i] = new BMap.Point(data[i].lng,data[i].lat);
                    marker.addEventListener("click",attribute);
                    marker.setLabel(myLbsService.labelTest(i , data[i]));
                }
                //让所有点在视野范围内
                map.setViewport(pointArray);
                //获取覆盖物位置
                function attribute(e){
                    var p = e.target;
                    //console.log(data);
//                    alert("marker的位置是" + "lng:" + p.getPosition().lng + ", lat:" + p.getPosition().lat);
//                  //自定义展示信息
                    var opts = {
                        width : 200,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title : "经纬度信息" , // 信息窗口标题
                        enableMessage:false,//设置允许信息窗发送短息
                        message:""
                    }

                    for(var i = 0; i< data.length ; i ++){
                       if(p.getPosition().lng == data[i].lng && p.getPosition().lat == data[i].lat){
                           //console.log(data[i]);
                           //alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                           var infoWindow = new BMap.InfoWindow('时间为' +data[i].hour +':'+ data[i].minute + ' 。 ' + p.getPosition().lng + ',' + p.getPosition().lat, opts);  // 创建信息窗口对象
                           map.openInfoWindow(infoWindow,new BMap.Point(p.getPosition().lng,p.getPosition().lat)); //开启信息窗口
                       }
                    }
                
                };
            },
 
            //测量两点距离
            showDistance : function(){
                //测距
                var myDis = new BMapLib.DistanceTool(map);
                myDis.open();  //开启鼠标测距
                // 如果要调试事件接口，请打开下方屏蔽代码，
                // 在firefox或者chrome下查看调试信息
/*

                myDis.addEventListener("drawend", function(e) {
                    //console.log("drawend");
                    //console.log(e.points);
                    //console.log(e.overlays);
                    //console.log(e.distance);
                });

                myDis.addEventListener("addpoint", function(e) {
                    //console.log("addpoint");
                    //console.log(e.point);
                    //console.log(e.pixel);
                    //console.log(e.index);
                    //console.log(e.distance);
                });

                myDis.addEventListener("removepolyline", function(e) {
                    //console.log("removepolyline");
                    //console.log(e);
                });
*/
            },

            //创建圆
            createCircle : function(lng,lat,radius){
                map.removeOverlay(circle);
                circle = new BMap.Circle(
                    new BMap.Point(lng, lat),
                    radius,
                    {/*strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5*/
                        fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3}
                ); //创建圆
                map.addOverlay(circle);
                circle
                    .addEventListener(
                    "click",myLbsService.overlay_style
                );
            },

            //获取marker的属性
            overlay_style : function (e){
            var p = e.target;
            if(p instanceof BMap.Marker){
                alert("该覆盖物是点，点的坐标是：" + p.getPosition().lng + "," + p.getPosition().lat);
            }else if(p instanceof BMap.Circle){
                alert("该覆盖物是圆，圆的半径是：" + p.getRadius() + "，圆的中心点坐标是：" + p.getCenter().lng + "," + p.getCenter().lat);
            }else if(p instanceof BMap.Polyline){
                alert("该覆盖物是折线，所画点的个数是：" + p.getPath().length);
            }else{
                alert("无法获知该覆盖物类型");
            }
        },

            //绘制工具条
            drawToolbar : function(){
                map.enableScrollWheelZoom();
                var overlays = [];
                var overlaycomplete = function(e){
                    overlays.push(e.overlay);
                    alert(overlays.length);
                };
                var styleOptions = {
                    strokeColor:"red",    //边线颜色。
                    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
                //实例化鼠标绘制工具
                var drawingManager = new BMapLib.DrawingManager(map, {
                    isOpen: true, //是否开启绘制模式
                    enableDrawingTool: true, //是否显示工具栏
                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                        offset: new BMap.Size(5, 5)//偏离值
                    },
                    circleOptions: styleOptions, //圆的样式
                    polylineOptions: styleOptions, //线的样式
                    polygonOptions: styleOptions, //多边形的样式
                    rectangleOptions: styleOptions //矩形的样式
                });
                //添加鼠标绘制工具监听事件，用于获取绘制结果
                drawingManager.addEventListener('overlaycomplete', overlaycomplete);
                function clearAll() {
                    for(var i = 0; i < overlays.length; i++){
                        map.removeOverlay(overlays[i]);
                    }
                    overlays.length = 0
                };

            },
            
        	//清除覆盖物
            remove_overlay : function (){
        		map.clearOverlays();         
        	},

            labelTest : function(number , data){
            	var num = parseInt(number) + 1;
            	var label = new BMap.Label("顺序:第" + num +"位; 所在时间：" + data.hour + ":" + data.minute,{offset:new BMap.Size(20,-10)});
                label.setStyle({
       			 color : "blue",
       			 fontSize : "12px",
       			 height : "20px",
       			 lineHeight : "20px",
       			 fontFamily:"微软雅黑"
       		 });
                return label
//                return new BMap.Label("时间:"+data.hour +":"+ data.minute,{offset:new BMap.Size(20,-10)});
            }

    }
        return myLbsService;

    });