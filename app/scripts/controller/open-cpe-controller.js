/**
 * Created by Administrator on 2015/8/21.
 */
angular.module(constVar.appName)
    .controller('opencpeController',function($scope){
        $scope.openCpeModel = {
            onclick : function(){
                window.open("#/cpeMap");
            },
            openGisHCell : function(){
                window.open("#/giscellmap");
            },
            openGprs : function(){
                window.open("#/lteMap");
            },
            openChannel : function(){
                window.open("#/channelMap");
            },
            openChannelBusiness : function(){
                window.open("#/channelBusinessMap");
            },
            openCell : function(){
                window.open("#/cellMap");
            },
            loadChannel : function() {
                window.open("#/channelMap");
                //window.close();
            },
            loadChannelBusiness : function() {
                window.open("#/channelBusinessMap");
                //window.close();
            },
            loadGprs : function() {
                window.open("#/lteMap");
                //window.close();
            },
            loadGisHCell : function() {
                window.open("#/giscellmap");
                //window.close();
            },
            loadCell : function() {
                window.open("#/cellMap");
                //window.close();
            },
            load : function() {
                window.open("#/cpeMap");
                //window.close();
            }
    }
    });
