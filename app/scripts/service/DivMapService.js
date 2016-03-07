'use strict';
angular.module(constVar.appName)
    .factory('divMapService',function (){

        function resultObject(status,errorMessage,result){
            this.status= status;// true/false
            this.errorMessage = errorMessage;//错误信息
            this.result = result;//结果对象 可能为数组
        };
        var myCellMapService = {
            divColorMap : function (colors){
                return new resultObject(true, "", this.divColorMapFun(colors));
            },
            divColorMapFun : function(color){
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
                    //console.log(color[i].name,color[i].color)
                    div.appendChild(child);
                }
                //console.log(div);
                return div;
            }
        }
        return myCellMapService;

    });