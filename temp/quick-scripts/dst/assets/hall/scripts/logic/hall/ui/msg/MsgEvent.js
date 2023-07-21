
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/msg/MsgEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c26e6evUu9KOZNJlmbdcyrm', 'MsgEvent');
// hall/scripts/logic/hall/ui/msg/MsgEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgType = exports.MsgEvent = void 0;
var MsgEvent = /** @class */ (function () {
    function MsgEvent() {
    }
    MsgEvent.ReadMsgCallBack = "ReadMsgCallBack";
    MsgEvent.DeleteMsgCallback = "DeleteMsgCallback";
    MsgEvent.MsgListCallback = "MsgListCallback";
    MsgEvent.NoticeListCallback = "NoticeListCallback";
    MsgEvent.ReadNoticeCallback = "ReadNoticeCallback";
    return MsgEvent;
}());
exports.MsgEvent = MsgEvent;
var MsgType;
(function (MsgType) {
    MsgType[MsgType["All"] = 0] = "All";
    MsgType[MsgType["Notice"] = 1] = "Notice";
    MsgType[MsgType["Mail"] = 2] = "Mail";
})(MsgType = exports.MsgType || (exports.MsgType = {}));

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtc2dcXE1zZ0V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFVQSxDQUFDO0lBVDBCLHdCQUFlLEdBQVcsaUJBQWlCLENBQUM7SUFDNUMsMEJBQWlCLEdBQVksbUJBQW1CLENBQUM7SUFDakQsd0JBQWUsR0FBWSxpQkFBaUIsQ0FBQztJQUU3QywyQkFBa0IsR0FBVyxvQkFBb0IsQ0FBQTtJQUNqRCwyQkFBa0IsR0FBVyxvQkFBb0IsQ0FBQTtJQUk1RSxlQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksNEJBQVE7QUFZckIsSUFBWSxPQU1YO0FBTkQsV0FBWSxPQUFPO0lBRWYsbUNBQU8sQ0FBQTtJQUNQLHlDQUFVLENBQUE7SUFDVixxQ0FBUSxDQUFBO0FBRVosQ0FBQyxFQU5XLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQU1sQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNc2dFdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlYWRNc2dDYWxsQmFjazogc3RyaW5nID0gXCJSZWFkTXNnQ2FsbEJhY2tcIjsgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVsZXRlTXNnQ2FsbGJhY2sgOiBzdHJpbmcgPSBcIkRlbGV0ZU1zZ0NhbGxiYWNrXCI7ICAgICAgICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBNc2dMaXN0Q2FsbGJhY2sgOiBzdHJpbmcgPSBcIk1zZ0xpc3RDYWxsYmFja1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTm90aWNlTGlzdENhbGxiYWNrIDpzdHJpbmcgPSBcIk5vdGljZUxpc3RDYWxsYmFja1wiXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlYWROb3RpY2VDYWxsYmFjayA6c3RyaW5nID0gXCJSZWFkTm90aWNlQ2FsbGJhY2tcIlxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBNc2dUeXBlXHJcbntcclxuICAgIEFsbCA9IDAsXHJcbiAgICBOb3RpY2UgPSAxLFxyXG4gICAgTWFpbCA9IDIsXHJcbiAgIFxyXG59Il19