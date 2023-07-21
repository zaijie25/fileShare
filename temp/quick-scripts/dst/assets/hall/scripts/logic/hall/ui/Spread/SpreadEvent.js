
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/SpreadEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6327bN4hpdLbowusnyyg7R2', 'SpreadEvent');
// hall/scripts/logic/hall/ui/Spread/SpreadEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadEvent = void 0;
var SpreadEvent = /** @class */ (function () {
    function SpreadEvent() {
    }
    SpreadEvent.GetAgentShare = "GetAgentShare";
    SpreadEvent.GetAgentCommi = "GetAgentCommi";
    SpreadEvent.MsgListCallback = "MsgListCallback";
    SpreadEvent.GetSelfReadRecord = "GetSelfReadRecord";
    SpreadEvent.GetSelfRead = "GetSelfRead";
    SpreadEvent.BindSucceed = "BindSucceed";
    //刷新短链接
    SpreadEvent.RefreshShortUrl = "RefreshShortUrl";
    SpreadEvent.GetDayAgentShare = "GetDayAgentShare";
    //领取记录
    SpreadEvent.GetDayAgentRecord = "GetDayAgentRecord";
    //领取奖励
    SpreadEvent.GetDayAgent = "GetDayAgent";
    //获取
    SpreadEvent.GetUserShareUrl = "GetUserShareUrl";
    //返佣金
    SpreadEvent.GetDayAgentCommi = "GetDayAgentCommi";
    return SpreadEvent;
}());
exports.SpreadEvent = SpreadEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFNwcmVhZEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFtQkEsQ0FBQztJQWpCMEIseUJBQWEsR0FBVyxlQUFlLENBQUM7SUFDeEMseUJBQWEsR0FBWSxlQUFlLENBQUM7SUFDekMsMkJBQWUsR0FBWSxpQkFBaUIsQ0FBQztJQUM3Qyw2QkFBaUIsR0FBWSxtQkFBbUIsQ0FBQztJQUNqRCx1QkFBVyxHQUFZLGFBQWEsQ0FBQztJQUNyQyx1QkFBVyxHQUFZLGFBQWEsQ0FBQztJQUM1RCxPQUFPO0lBQ2dCLDJCQUFlLEdBQVUsaUJBQWlCLENBQUM7SUFDM0MsNEJBQWdCLEdBQVcsa0JBQWtCLENBQUM7SUFDckUsTUFBTTtJQUNpQiw2QkFBaUIsR0FBVyxtQkFBbUIsQ0FBQztJQUN2RSxNQUFNO0lBQ2lCLHVCQUFXLEdBQVcsYUFBYSxDQUFDO0lBQzNELElBQUk7SUFDbUIsMkJBQWUsR0FBVyxpQkFBaUIsQ0FBQztJQUNuRSxLQUFLO0lBQ2tCLDRCQUFnQixHQUFXLGtCQUFrQixDQUFDO0lBQ3pFLGtCQUFDO0NBbkJELEFBbUJDLElBQUE7QUFuQlksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3ByZWFkRXZlbnQge1xyXG4gIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHZXRBZ2VudFNoYXJlOiBzdHJpbmcgPSBcIkdldEFnZW50U2hhcmVcIjsgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0QWdlbnRDb21taSA6IHN0cmluZyA9IFwiR2V0QWdlbnRDb21taVwiOyAgICAgICAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTXNnTGlzdENhbGxiYWNrIDogc3RyaW5nID0gXCJNc2dMaXN0Q2FsbGJhY2tcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0U2VsZlJlYWRSZWNvcmQgOiBzdHJpbmcgPSBcIkdldFNlbGZSZWFkUmVjb3JkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdldFNlbGZSZWFkIDogc3RyaW5nID0gXCJHZXRTZWxmUmVhZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCaW5kU3VjY2VlZCA6IHN0cmluZyA9IFwiQmluZFN1Y2NlZWRcIjtcclxuICAgIC8v5Yi35paw55+t6ZO+5o6lXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZnJlc2hTaG9ydFVybDpzdHJpbmcgPSBcIlJlZnJlc2hTaG9ydFVybFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHZXREYXlBZ2VudFNoYXJlOiBzdHJpbmcgPSBcIkdldERheUFnZW50U2hhcmVcIjtcclxuICAgIC8v6aKG5Y+W6K6w5b2VXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdldERheUFnZW50UmVjb3JkOiBzdHJpbmcgPSBcIkdldERheUFnZW50UmVjb3JkXCI7XHJcbiAgICAvL+mihuWPluWlluWKsVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHZXREYXlBZ2VudDogc3RyaW5nID0gXCJHZXREYXlBZ2VudFwiO1xyXG4gICAgLy/ojrflj5ZcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0VXNlclNoYXJlVXJsOiBzdHJpbmcgPSBcIkdldFVzZXJTaGFyZVVybFwiO1xyXG4gICAgLy/ov5TkvaPph5FcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0RGF5QWdlbnRDb21taTogc3RyaW5nID0gXCJHZXREYXlBZ2VudENvbW1pXCI7XHJcbn0iXX0=