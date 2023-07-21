
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dun/YunDun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22f3982r3lCf4xkatUtRq2i', 'YunDun');
// hall/scripts/framework/net/dun/YunDun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var AppDunControl_1 = require("./AppDunControl");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var YunDun = /** @class */ (function () {
    function YunDun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "yundun";
        this._dunType = 0;
        this._dunType = dunType;
        Global.NativeEvent.isSupportSDK(this.sdkName, null, function (retObj) {
            if (retObj.result == 0) {
                _this._isSupport = true;
            }
            else {
                Logger.error("checkAppIsSupportDunByType dunType = " + dunType + " isSupport = false");
            }
        });
    }
    YunDun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    YunDun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg && cfg.accessKey && cfg.uuid) {
            return true;
        }
        return false;
    };
    //异步初始化
    YunDun.prototype.init = function (cfg, callback) {
        var _this = this;
        Logger.error("init YunDun SDK");
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init YunDun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init YunDun SDK this.isTDunInit  = true");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init YunDun SDK state = " + initState);
        var accessKey = cfg.accessKey;
        var uuid = cfg.uuid;
        if ((initState == AppDunControl_1.DUNSTATE.INIT) && accessKey && uuid) {
            Logger.error("initYunDunSDK");
            Global.NativeEvent.initYunDunSDK(accessKey, uuid, function (retObj) {
                Logger.error("initYunDunSDK ret = " + JSON.stringify(retObj));
                if (retObj) {
                    var result = Number(retObj.result);
                    if (result == 0 || result == 0.0) {
                        _this.isDunInit = true;
                        Global.Event.event(GlobalEvent.DunInitFinish);
                        Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.YUN_DUN, 1);
                        Logger.error("initYunDunSDK ret = 0 success ");
                        // let reportParam = { "result": 0, "type": DUNTYPE.YUN_DUN }
                        // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                    }
                    else {
                        Logger.error("initYunDunSDK ret != 0 failed ");
                        var reportParam = { "result": "ret != 0 " + result, "type": AppDunControl_1.DUNTYPE.YUN_DUN };
                        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                    }
                }
                else {
                    Logger.error("initYunDunSDK retObj == null failed ");
                    var reportParam = { "result": "initYunDunSDK retObj == null failed", "type": AppDunControl_1.DUNTYPE.YUN_DUN };
                    Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };
    //获取初始化状态
    YunDun.prototype.isInit = function () {
        if (!this.isDunInit) {
            var ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    };
    YunDun.prototype.getInitState = function () {
        var ret = Global.NativeEvent.getYunDunInitRet();
        return ret;
    };
    YunDun.prototype.getServerIPAndPort = function (host, port, attr) {
        if (!this.isDunInit) {
            Logger.error("YunDun getServerIPAndPort isDunInit = false");
            return;
        }
        var serverIPAndPortJson = Global.NativeEvent.getYunDunServerIPAndPort(host, port);
        if (serverIPAndPortJson) {
            Logger.error("getServerIPAndPort serverIPAndPortJson = " + serverIPAndPortJson);
            var serverIPAndPort = JSON.parse(serverIPAndPortJson);
            if (serverIPAndPort) {
                if (serverIPAndPort.result != null && (serverIPAndPort.result == 0 || serverIPAndPort.result == 0.0) && serverIPAndPort.serverIp && serverIPAndPort.serverPort) {
                    var ipPortObj = { "ip": serverIPAndPort.serverIp, "port": serverIPAndPort.serverPort };
                    return ipPortObj;
                }
            }
        }
        else {
            Logger.error("getServerIPAndPort serverIPAndPortJson = null");
        }
        return null;
    };
    return YunDun;
}());
exports.default = YunDun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGR1blxcWXVuRHVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUZBQTRFO0FBQzVFLGlEQUFvRDtBQUNwRCxrRUFBaUU7QUFFakU7SUFNSSxnQkFBWSxPQUFPO1FBQW5CLGlCQVNDO1FBZE8sY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFlBQU8sR0FBRyxRQUFRLENBQUM7UUFDbkIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUdqQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFDLE1BQU07WUFDdkQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsQ0FBQTthQUN6RjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLDZCQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQzFCLENBQUM7SUFFTSxnQ0FBZSxHQUF0QixVQUF1QixHQUFRO1FBQzNCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU87SUFDQSxxQkFBSSxHQUFYLFVBQVksR0FBRyxFQUFFLFFBQW1CO1FBQXBDLGlCQThDQztRQTdDRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1lBQ3hELE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7WUFDdkQsT0FBTztTQUNWO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDcEQsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ25CLElBQUksQ0FBQyxTQUFTLElBQUksd0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFDLE1BQU07Z0JBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO2dCQUM3RCxJQUFJLE1BQU0sRUFBRTtvQkFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUNsQyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRTt3QkFDOUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyx1QkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTt3QkFDbkYsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO3dCQUM5Qyw2REFBNkQ7d0JBQzdELHVGQUF1RjtxQkFDMUY7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO3dCQUM5QyxJQUFJLFdBQVcsR0FBRyxFQUFFLFFBQVEsRUFBRSxXQUFXLEdBQUcsTUFBTSxFQUFFLE1BQU0sRUFBRSx1QkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO3dCQUM3RSxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLHVCQUFVLENBQUMsMEJBQTBCLEVBQUUsV0FBVyxDQUFDLENBQUE7cUJBQzFGO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtvQkFDcEQsSUFBSSxXQUFXLEdBQUcsRUFBRSxRQUFRLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxFQUFFLHVCQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7b0JBQzlGLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsdUJBQVUsQ0FBQywwQkFBMEIsRUFBRSxXQUFXLENBQUMsQ0FBQTtpQkFDMUY7Z0JBRUQsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLENBQUE7aUJBQ2I7WUFFTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBR0wsQ0FBQztJQUdELFNBQVM7SUFDVCx1QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2QkFBWSxHQUFaO1FBQ0ksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUdELG1DQUFrQixHQUFsQixVQUFtQixJQUFZLEVBQUUsSUFBWSxFQUFDLElBQVE7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO1lBQzNELE9BQU87U0FDVjtRQUNELElBQUksbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEYsSUFBSSxtQkFBbUIsRUFBRTtZQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxHQUFHLG1CQUFtQixDQUFDLENBQUE7WUFDL0UsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQ3JELElBQUksZUFBZSxFQUFFO2dCQUNqQixJQUFJLGVBQWUsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7b0JBQzVKLElBQUksU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtvQkFDdEYsT0FBTyxTQUFTLENBQUE7aUJBQ25CO2FBQ0o7U0FDSjthQUFLO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBRSxDQUFBO1NBQ2pFO1FBRUQsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBQ0wsYUFBQztBQUFELENBcEhBLEFBb0hDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUR1biBmcm9tIFwiLi9JRHVuXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vLi4vbG9naWMvaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgeyBEVU5UWVBFLCBEVU5TVEFURSB9IGZyb20gXCIuL0FwcER1bkNvbnRyb2xcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3Rvb2wvUmVwb3J0VG9vbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWXVuRHVuIGltcGxlbWVudHMgSUR1biB7XHJcbiAgICBwcml2YXRlIGlzRHVuSW5pdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNTdXBwb3J0ID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNka05hbWUgPSBcInl1bmR1blwiO1xyXG4gICAgcHJpdmF0ZSBfZHVuVHlwZSA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZHVuVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2R1blR5cGUgPSBkdW5UeXBlXHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmlzU3VwcG9ydFNESyh0aGlzLnNka05hbWUsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNTdXBwb3J0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoZWNrQXBwSXNTdXBwb3J0RHVuQnlUeXBlIGR1blR5cGUgPSBcIiArIGR1blR5cGUgKyBcIiBpc1N1cHBvcnQgPSBmYWxzZVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBcHBTdXBwb3J0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1N1cHBvcnRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tDZmdJc1ZhbGlkKGNmZzogYW55KSB7XHJcbiAgICAgICAgaWYgKGNmZyAmJiBjZmcuYWNjZXNzS2V5ICYmIGNmZy51dWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvILmraXliJ3lp4vljJZcclxuICAgIHB1YmxpYyBpbml0KGNmZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImluaXQgWXVuRHVuIFNES1wiKVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0NmZ0lzVmFsaWQoY2ZnKSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFl1bkR1biBTREsgY2hlY2tDZmdJc1ZhbGlkICA9IGZhbHNlXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEdW5Jbml0KSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXQgWXVuRHVuIFNESyB0aGlzLmlzVER1bkluaXQgID0gdHJ1ZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbml0U3RhdGUgPSB0aGlzLmdldEluaXRTdGF0ZSgpXHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdCBZdW5EdW4gU0RLIHN0YXRlID0gXCIgKyBpbml0U3RhdGUpXHJcbiAgICAgICAgbGV0IGFjY2Vzc0tleSA9IGNmZy5hY2Nlc3NLZXlcclxuICAgICAgICBsZXQgdXVpZCA9IGNmZy51dWlkXHJcbiAgICAgICAgaWYgKChpbml0U3RhdGUgPT0gRFVOU1RBVEUuSU5JVCkgJiYgYWNjZXNzS2V5ICYmIHV1aWQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFl1bkR1blNES1wiKVxyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuaW5pdFl1bkR1blNESyhhY2Nlc3NLZXksIHV1aWQsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXRZdW5EdW5TREsgcmV0ID0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXRPYmopKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJldE9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBOdW1iZXIocmV0T2JqLnJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IDAgfHwgcmVzdWx0ID09IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRHVuSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5EdW5Jbml0RmluaXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRHVuSW5pdFJlY29yZCArIFwiX1wiICsgRFVOVFlQRS5ZVU5fRFVOLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0WXVuRHVuU0RLIHJldCA9IDAgc3VjY2VzcyBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiAwLCBcInR5cGVcIjogRFVOVFlQRS5ZVU5fRFVOIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9JTklUX0RVTl9PSywgcmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFl1bkR1blNESyByZXQgIT0gMCBmYWlsZWQgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXBvcnRQYXJhbSA9IHsgXCJyZXN1bHRcIjogXCJyZXQgIT0gMCBcIiArIHJlc3VsdCwgXCJ0eXBlXCI6IERVTlRZUEUuWVVOX0RVTiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSU5JVF9EVU5fRVJST1IsIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFl1bkR1blNESyByZXRPYmogPT0gbnVsbCBmYWlsZWQgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBcImluaXRZdW5EdW5TREsgcmV0T2JqID09IG51bGwgZmFpbGVkXCIsIFwidHlwZVwiOiBEVU5UWVBFLllVTl9EVU4gfVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSU5JVF9EVU5fRVJST1IsIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iOt+WPluWIneWni+WMlueKtuaAgVxyXG4gICAgaXNJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0R1bkluaXQpIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0R1bkluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzRHVuSW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbml0U3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IEdsb2JhbC5OYXRpdmVFdmVudC5nZXRZdW5EdW5Jbml0UmV0KCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U2VydmVySVBBbmRQb3J0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyLGF0dHI6YW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHVuSW5pdCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIll1bkR1biBnZXRTZXJ2ZXJJUEFuZFBvcnQgaXNEdW5Jbml0ID0gZmFsc2VcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VydmVySVBBbmRQb3J0SnNvbiA9IEdsb2JhbC5OYXRpdmVFdmVudC5nZXRZdW5EdW5TZXJ2ZXJJUEFuZFBvcnQoaG9zdCwgcG9ydCk7XHJcbiAgICAgICAgaWYgKHNlcnZlcklQQW5kUG9ydEpzb24pIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0U2VydmVySVBBbmRQb3J0IHNlcnZlcklQQW5kUG9ydEpzb24gPSBcIiArIHNlcnZlcklQQW5kUG9ydEpzb24pXHJcbiAgICAgICAgICAgIGxldCBzZXJ2ZXJJUEFuZFBvcnQgPSBKU09OLnBhcnNlKHNlcnZlcklQQW5kUG9ydEpzb24pXHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJJUEFuZFBvcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJJUEFuZFBvcnQucmVzdWx0ICE9IG51bGwgJiYgKHNlcnZlcklQQW5kUG9ydC5yZXN1bHQgPT0gMCB8fCBzZXJ2ZXJJUEFuZFBvcnQucmVzdWx0ID09IDAuMCkgJiYgc2VydmVySVBBbmRQb3J0LnNlcnZlcklwICYmIHNlcnZlcklQQW5kUG9ydC5zZXJ2ZXJQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlwUG9ydE9iaiA9IHsgXCJpcFwiOiBzZXJ2ZXJJUEFuZFBvcnQuc2VydmVySXAsIFwicG9ydFwiOiBzZXJ2ZXJJUEFuZFBvcnQuc2VydmVyUG9ydCB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlwUG9ydE9ialxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRTZXJ2ZXJJUEFuZFBvcnQgc2VydmVySVBBbmRQb3J0SnNvbiA9IG51bGxcIiApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG59Il19