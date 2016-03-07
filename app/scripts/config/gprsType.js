/**
 * Created by Administrator on 2015/5/5.
 */
'use strict';

angular.module(constVar.appName).constant('gprsType', [
    {
        name: '4G流量',
        id: 'lte'
    },
    {
        name: '2G&3G流量',
        id: 'gsmTd'
    },
    {
        name: '全部',
        id: 'all'
    }
]);