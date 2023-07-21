
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/const/HallStorageKey.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e23daR7kCFPZaNcWdbxccLT', 'HallStorageKey');
// hall/scripts/logic/hallcommon/const/HallStorageKey.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey = /** @class */ (function () {
    function HallStorageKey() {
    }
    //账号信息相关
    //手机号码
    HallStorageKey.Phone = "Phone";
    //密码（md5）
    HallStorageKey.Pwd = "Pwd";
    //地区码
    HallStorageKey.AreaCode = "AreaCode";
    //Token
    HallStorageKey.Token = "Token";
    //uid
    HallStorageKey.Uid = "Uid";
    HallStorageKey.Channel = "Channel";
    HallStorageKey.InviteCode = "InviteCode";
    HallStorageKey.WebDeviceId = "WebDeviceId";
    //server配置内容
    HallStorageKey.AppConfigContent = "AppConfigContent";
    //缓存上次appid
    HallStorageKey.AppID = "AppID";
    HallStorageKey.BaiduIntervelTimes = "BaiduIntervelTime";
    HallStorageKey.Sale = "Sale";
    HallStorageKey.ServerDeviceId = "ServerDeviceId";
    HallStorageKey.ReportUrl = "ReportUrl";
    //Vip Level
    HallStorageKey.VIPLevel = "VIPLevel";
    //盾配置
    HallStorageKey.DunConfig = "DunConfig";
    //初始化记录
    HallStorageKey.DunInitRecord = "DunInitRecord";
    //登录返回的login线路
    HallStorageKey.LoginRoutes = "LoginRoutes";
    //请求成功，失败状况
    HallStorageKey.RequestRecord = "RequestSuccessRecord";
    //上报OpenInstall统计
    HallStorageKey.PostOpenInstallFlag = "PostOpenInstallFlag";
    //上报Sharetrace统计
    HallStorageKey.PostSharetraceFlag = "PostSharetraceFlag";
    //上报logCache缓存
    HallStorageKey.PostLogCache = "PostLogCache";
    //first
    HallStorageKey.FirstOpen = "FirstOpen";
    //热更线路地址
    HallStorageKey.HotUpdateHosts = "HotUpdateHosts";
    //app热更线路地址
    HallStorageKey.AppHotUpdateHosts = "AppHotUpdateHosts";
    //DATAURLS
    HallStorageKey.DATAURLS = "DATAURLS";
    return HallStorageKey;
}());
exports.default = HallStorageKey;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGNvbnN0XFxIYWxsU3RvcmFnZUtleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUF5RUEsQ0FBQztJQXZFRyxRQUFRO0lBQ1IsTUFBTTtJQUNRLG9CQUFLLEdBQUcsT0FBTyxDQUFDO0lBQzlCLFNBQVM7SUFDSyxrQkFBRyxHQUFHLEtBQUssQ0FBQztJQUMxQixLQUFLO0lBQ1MsdUJBQVEsR0FBRyxVQUFVLENBQUM7SUFFcEMsT0FBTztJQUNPLG9CQUFLLEdBQUcsT0FBTyxDQUFDO0lBRTlCLEtBQUs7SUFDUyxrQkFBRyxHQUFHLEtBQUssQ0FBQztJQUVaLHNCQUFPLEdBQUcsU0FBUyxDQUFDO0lBRXBCLHlCQUFVLEdBQUcsWUFBWSxDQUFDO0lBRzFCLDBCQUFXLEdBQUcsYUFBYSxDQUFDO0lBRzFDLFlBQVk7SUFDRSwrQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUVwRCxXQUFXO0lBQ0csb0JBQUssR0FBRyxPQUFPLENBQUM7SUFFaEIsaUNBQWtCLEdBQUcsbUJBQW1CLENBQUM7SUFFekMsbUJBQUksR0FBRyxNQUFNLENBQUE7SUFFYiw2QkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBRWxDLHdCQUFTLEdBQUcsV0FBVyxDQUFDO0lBRXRDLFdBQVc7SUFDRyx1QkFBUSxHQUFHLFVBQVUsQ0FBQztJQUVwQyxLQUFLO0lBQ1Msd0JBQVMsR0FBRyxXQUFXLENBQUM7SUFFdEMsT0FBTztJQUNPLDRCQUFhLEdBQUcsZUFBZSxDQUFDO0lBRTlDLGNBQWM7SUFDQSwwQkFBVyxHQUFHLGFBQWEsQ0FBQztJQUcxQyxXQUFXO0lBQ0csNEJBQWEsR0FBRyxzQkFBc0IsQ0FBQTtJQUdwRCxpQkFBaUI7SUFDSCxrQ0FBbUIsR0FBRyxxQkFBcUIsQ0FBQTtJQUV6RCxnQkFBZ0I7SUFDRixpQ0FBa0IsR0FBRyxvQkFBb0IsQ0FBQTtJQUN2RCxjQUFjO0lBQ0EsMkJBQVksR0FBRyxjQUFjLENBQUE7SUFDM0MsT0FBTztJQUNPLHdCQUFTLEdBQUcsV0FBVyxDQUFBO0lBRXJDLFFBQVE7SUFDTSw2QkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBRWhELFdBQVc7SUFDRyxnQ0FBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUV0RCxVQUFVO0lBQ0ksdUJBQVEsR0FBRyxVQUFVLENBQUM7SUFDeEMscUJBQUM7Q0F6RUQsQUF5RUMsSUFBQTtrQkF6RW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsU3RvcmFnZUtleVxyXG57XHJcbiAgICAvL+i0puWPt+S/oeaBr+ebuOWFs1xyXG4gICAgLy/miYvmnLrlj7fnoIFcclxuICAgIHB1YmxpYyBzdGF0aWMgUGhvbmUgPSBcIlBob25lXCI7ICAgXHJcbiAgICAvL+Wvhuegge+8iG1kNe+8iVxyXG4gICAgcHVibGljIHN0YXRpYyBQd2QgPSBcIlB3ZFwiOyAgXHJcbiAgICAvL+WcsOWMuueggVxyXG4gICAgcHVibGljIHN0YXRpYyBBcmVhQ29kZSA9IFwiQXJlYUNvZGVcIjtcclxuICAgIFxyXG4gICAgLy9Ub2tlblxyXG4gICAgcHVibGljIHN0YXRpYyBUb2tlbiA9IFwiVG9rZW5cIjtcclxuXHJcbiAgICAvL3VpZFxyXG4gICAgcHVibGljIHN0YXRpYyBVaWQgPSBcIlVpZFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2hhbm5lbCA9IFwiQ2hhbm5lbFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSW52aXRlQ29kZSA9IFwiSW52aXRlQ29kZVwiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFdlYkRldmljZUlkID0gXCJXZWJEZXZpY2VJZFwiO1xyXG5cclxuXHJcbiAgICAvL3NlcnZlcumFjee9ruWGheWuuVxyXG4gICAgcHVibGljIHN0YXRpYyBBcHBDb25maWdDb250ZW50ID0gXCJBcHBDb25maWdDb250ZW50XCI7XHJcblxyXG4gICAgLy/nvJPlrZjkuIrmrKFhcHBpZFxyXG4gICAgcHVibGljIHN0YXRpYyBBcHBJRCA9IFwiQXBwSURcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEJhaWR1SW50ZXJ2ZWxUaW1lcyA9IFwiQmFpZHVJbnRlcnZlbFRpbWVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNhbGUgPSBcIlNhbGVcIlxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU2VydmVyRGV2aWNlSWQgPSBcIlNlcnZlckRldmljZUlkXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBSZXBvcnRVcmwgPSBcIlJlcG9ydFVybFwiO1xyXG5cclxuICAgIC8vVmlwIExldmVsXHJcbiAgICBwdWJsaWMgc3RhdGljIFZJUExldmVsID0gXCJWSVBMZXZlbFwiO1xyXG5cclxuICAgIC8v55u+6YWN572uXHJcbiAgICBwdWJsaWMgc3RhdGljIER1bkNvbmZpZyA9IFwiRHVuQ29uZmlnXCI7XHJcblxyXG4gICAgLy/liJ3lp4vljJborrDlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgRHVuSW5pdFJlY29yZCA9IFwiRHVuSW5pdFJlY29yZFwiO1xyXG5cclxuICAgIC8v55m75b2V6L+U5Zue55qEbG9naW7nur/ot69cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9naW5Sb3V0ZXMgPSBcIkxvZ2luUm91dGVzXCI7XHJcblxyXG5cclxuICAgIC8v6K+35rGC5oiQ5Yqf77yM5aSx6LSl54q25Ya1XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlcXVlc3RSZWNvcmQgPSBcIlJlcXVlc3RTdWNjZXNzUmVjb3JkXCJcclxuXHJcblxyXG4gICAgLy/kuIrmiqVPcGVuSW5zdGFsbOe7n+iuoVxyXG4gICAgcHVibGljIHN0YXRpYyBQb3N0T3Blbkluc3RhbGxGbGFnID0gXCJQb3N0T3Blbkluc3RhbGxGbGFnXCJcclxuXHJcbiAgICAvL+S4iuaKpVNoYXJldHJhY2Xnu5/orqFcclxuICAgIHB1YmxpYyBzdGF0aWMgUG9zdFNoYXJldHJhY2VGbGFnID0gXCJQb3N0U2hhcmV0cmFjZUZsYWdcIlxyXG4gICAgLy/kuIrmiqVsb2dDYWNoZee8k+WtmFxyXG4gICAgcHVibGljIHN0YXRpYyBQb3N0TG9nQ2FjaGUgPSBcIlBvc3RMb2dDYWNoZVwiXHJcbiAgICAvL2ZpcnN0XHJcbiAgICBwdWJsaWMgc3RhdGljIEZpcnN0T3BlbiA9IFwiRmlyc3RPcGVuXCJcclxuXHJcbiAgICAvL+eDreabtOe6v+i3r+WcsOWdgFxyXG4gICAgcHVibGljIHN0YXRpYyBIb3RVcGRhdGVIb3N0cyA9IFwiSG90VXBkYXRlSG9zdHNcIjtcclxuXHJcbiAgICAvL2FwcOeDreabtOe6v+i3r+WcsOWdgFxyXG4gICAgcHVibGljIHN0YXRpYyBBcHBIb3RVcGRhdGVIb3N0cyA9IFwiQXBwSG90VXBkYXRlSG9zdHNcIjtcclxuXHJcbiAgICAvL0RBVEFVUkxTXHJcbiAgICBwdWJsaWMgc3RhdGljIERBVEFVUkxTID0gXCJEQVRBVVJMU1wiO1xyXG59Il19