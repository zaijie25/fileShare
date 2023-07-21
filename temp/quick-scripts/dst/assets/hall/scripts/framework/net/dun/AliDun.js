
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dun/AliDun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a55bAnt31OwLVIOyc0ejQ+', 'AliDun');
// hall/scripts/framework/net/dun/AliDun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var AppDunControl_1 = require("./AppDunControl");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var AliDun = /** @class */ (function () {
    function AliDun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "alidun";
        this._dunType = 0;
        this._group = null;
        this._dip = null;
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
    AliDun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    AliDun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg) {
            if (cfg.group) {
                this._group = cfg.group;
                Logger.error("checkCfgIsValid set group " + this._group);
            }
            else {
                Logger.error("checkCfgIsValid set group = null");
            }
            if (cfg.dip) {
                this._dip = cfg.dip;
                Logger.error("checkCfgIsValid set dip " + this._dip);
            }
            else {
                Logger.error("checkCfgIsValid set dip = null");
            }
        }
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            if (cfg && cfg.android) {
                return true;
            }
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            if (cfg && cfg.ios) {
                return true;
            }
        }
        return false;
    };
    AliDun.prototype.getCfgAppKey = function (cfg) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            if (cfg && cfg.android) {
                return cfg.android;
            }
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            if (cfg && cfg.ios) {
                return cfg.ios;
            }
        }
    };
    //异步初始化
    AliDun.prototype.init = function (cfg, callback) {
        var _this = this;
        Logger.error("init AliDun SDK");
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init AliDun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init AliDun SDK this.isTDunInit  = true");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init AliDun SDK state = " + initState);
        var appkey = this.getCfgAppKey(cfg);
        var token = this.getToken();
        if ((initState == AppDunControl_1.DUNSTATE.INIT) && appkey && token) {
            Logger.error("initAliDunSDK");
            Global.NativeEvent.initAliDunSDK(appkey, token, function (retObj) {
                Logger.error("initAliDunSDK ret = " + JSON.stringify(retObj));
                if (retObj) {
                    var result = Number(retObj.result);
                    if (result == 0 || result == 0.0) {
                        _this.isDunInit = true;
                        Global.Event.event(GlobalEvent.DunInitFinish);
                        Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.Ali_DUN, 1);
                        Logger.error("initAliDunSDK ret = 0 success ");
                    }
                    else {
                        Logger.error("initAliDunSDK ret != 0 failed ");
                        var reportParam = { "result": "ret != 0 " + result, "type": AppDunControl_1.DUNTYPE.Ali_DUN };
                        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                    }
                }
                else {
                    Logger.error("initAliDunSDK retObj == null failed ");
                    var reportParam = { "result": "initAliDunSDK retObj == null failed", "type": AppDunControl_1.DUNTYPE.Ali_DUN };
                    Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                }
                if (callback) {
                    callback();
                }
            });
        }
        else {
            Logger.error("initAliDunSDK failed ", initState, appkey, token);
        }
    };
    AliDun.prototype.getToken = function () {
        var uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        var token = uid ? uid.toString() : "token";
        return token;
    };
    //获取初始化状态
    AliDun.prototype.isInit = function () {
        if (!this.isDunInit) {
            var ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    };
    AliDun.prototype.getInitState = function () {
        var ret = Global.NativeEvent.getAliDunInitRet();
        return ret;
    };
    /*
    * hostInfo:{ token,groupName,domainName}
    */
    AliDun.prototype.getServerIPAndPort = function (host, port, attr) {
        if (!this.isDunInit) {
            Logger.error("AliDun getServerIPAndPort isDunInit = false");
            return;
        }
        var hostInfo = {};
        hostInfo["token"] = this.getToken();
        var group = this._group;
        var dip = this._dip;
        if (attr) {
            Logger.error("AliDun getServerIPAndPort set attr param");
            if (attr.group) {
                group = attr.group;
                Logger.error("AliDun getServerIPAndPort set group " + group);
            }
            else {
                Logger.error("AliDun getServerIPAndPort set group = null");
            }
            if (attr.dip) {
                dip = attr.dip;
                Logger.error("AliDun getServerIPAndPort set dip " + dip);
            }
            else {
                Logger.error("AliDun getServerIPAndPort set dip = null");
            }
        }
        if (!group || !dip) {
            Logger.error("AliDun getServerIPAndPort group == null  or dip == null");
            return;
        }
        hostInfo["groupName"] = group;
        hostInfo["domainName"] = dip;
        var serverIPAndPortJson = Global.NativeEvent.getAliDunPort(hostInfo, port);
        if (serverIPAndPortJson) {
            Logger.error("getServerIPAndPort serverIPAndPortJson = " + serverIPAndPortJson);
            var serverIPAndPort = JSON.parse(serverIPAndPortJson);
            if (serverIPAndPort) {
                if (serverIPAndPort.result != null && (serverIPAndPort.result == 0 || serverIPAndPort.result == 0.0) && serverIPAndPort.serverIp && serverIPAndPort.serverPort) {
                    var ipPortObj = { "ip": serverIPAndPort.serverIp, "port": Number(serverIPAndPort.serverPort) };
                    return ipPortObj;
                }
            }
            else {
                Logger.error("getServerIPAndPort serverIPAndPort json error");
            }
        }
        else {
            Logger.error("getServerIPAndPort serverIPAndPortJson = null");
        }
        return null;
    };
    return AliDun;
}());
exports.default = AliDun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGR1blxcQWxpRHVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUZBQTRFO0FBQzVFLGlEQUFvRDtBQUNwRCxrRUFBaUU7QUFFakU7SUFRSSxnQkFBWSxPQUFPO1FBQW5CLGlCQVNDO1FBaEJPLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixZQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ25CLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsU0FBSSxHQUFHLElBQUksQ0FBQztRQUdoQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFDLE1BQU07WUFDdkQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsQ0FBQTthQUN6RjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLDZCQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQzFCLENBQUM7SUFFTSxnQ0FBZSxHQUF0QixVQUF1QixHQUFRO1FBQzNCLElBQUksR0FBRyxFQUFDO1lBQ0osSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFDO2dCQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7YUFD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QU0sSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7b0JBQzVKLElBQUksU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQTtvQkFDOUYsT0FBTyxTQUFTLENBQUE7aUJBQ25CO2FBQ0o7aUJBQUs7Z0JBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFBO2FBQ2hFO1NBQ0o7YUFBSztZQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUUsQ0FBQTtTQUNqRTtRQUVELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTFMQSxBQTBMQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElEdW4gZnJvbSBcIi4vSUR1blwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IHsgRFVOVFlQRSwgRFVOU1RBVEUgfSBmcm9tIFwiLi9BcHBEdW5Db250cm9sXCI7XHJcbmltcG9ydCB7IFJlcG9ydFRvb2wgfSBmcm9tIFwiLi4vLi4vLi4vbG9naWMvY29yZS90b29sL1JlcG9ydFRvb2xcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsaUR1biBpbXBsZW1lbnRzIElEdW4ge1xyXG4gICAgcHJpdmF0ZSBpc0R1bkluaXQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lzU3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzZGtOYW1lID0gXCJhbGlkdW5cIjtcclxuICAgIHByaXZhdGUgX2R1blR5cGUgPSAwO1xyXG4gICAgcHJpdmF0ZSBfZ3JvdXAgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZGlwID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkdW5UeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fZHVuVHlwZSA9IGR1blR5cGVcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuaXNTdXBwb3J0U0RLKHRoaXMuc2RrTmFtZSwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1N1cHBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tBcHBJc1N1cHBvcnREdW5CeVR5cGUgZHVuVHlwZSA9IFwiICsgZHVuVHlwZSArIFwiIGlzU3VwcG9ydCA9IGZhbHNlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0FwcFN1cHBvcnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3VwcG9ydFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0NmZ0lzVmFsaWQoY2ZnOiBhbnkpIHtcclxuICAgICAgICBpZiAoY2ZnKXtcclxuICAgICAgICAgICAgaWYgKGNmZy5ncm91cCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ncm91cCA9IGNmZy5ncm91cFxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tDZmdJc1ZhbGlkIHNldCBncm91cCBcIiArIHRoaXMuX2dyb3VwKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGVja0NmZ0lzVmFsaWQgc2V0IGdyb3VwID0gbnVsbFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjZmcuZGlwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcCA9IGNmZy5kaXBcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoZWNrQ2ZnSXNWYWxpZCBzZXQgZGlwIFwiICsgdGhpcy5fZGlwKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGVja0NmZ0lzVmFsaWQgc2V0IGRpcCA9IG51bGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKXtcclxuICAgICAgICAgICAgaWYgKGNmZyAmJiBjZmcuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1Mpe1xyXG4gICAgICAgICAgICBpZiAoY2ZnICYmIGNmZy5pb3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENmZ0FwcEtleShjZmcpe1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpe1xyXG4gICAgICAgICAgICBpZiAoY2ZnICYmIGNmZy5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2ZnLmFuZHJvaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1Mpe1xyXG4gICAgICAgICAgICBpZiAoY2ZnICYmIGNmZy5pb3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjZmcuaW9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5byC5q2l5Yid5aeL5YyWXHJcbiAgICBwdWJsaWMgaW5pdChjZmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IEFsaUR1biBTREtcIilcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tDZmdJc1ZhbGlkKGNmZykpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdCBBbGlEdW4gU0RLIGNoZWNrQ2ZnSXNWYWxpZCAgPSBmYWxzZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRHVuSW5pdCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IEFsaUR1biBTREsgdGhpcy5pc1REdW5Jbml0ICA9IHRydWVcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5pdFN0YXRlID0gdGhpcy5nZXRJbml0U3RhdGUoKVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImluaXQgQWxpRHVuIFNESyBzdGF0ZSA9IFwiICsgaW5pdFN0YXRlKVxyXG4gICAgICAgIGxldCBhcHBrZXkgPSB0aGlzLmdldENmZ0FwcEtleShjZmcpXHJcbiAgICAgICAgbGV0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpIFxyXG4gICAgICAgIGlmICgoaW5pdFN0YXRlID09IERVTlNUQVRFLklOSVQpICYmIGFwcGtleSAmJiB0b2tlbikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0QWxpRHVuU0RLXCIpXHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5pbml0QWxpRHVuU0RLKGFwcGtleSwgdG9rZW4sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXRBbGlEdW5TREsgcmV0ID0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXRPYmopKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJldE9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBOdW1iZXIocmV0T2JqLnJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IDAgfHwgcmVzdWx0ID09IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRHVuSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5EdW5Jbml0RmluaXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRHVuSW5pdFJlY29yZCArIFwiX1wiICsgRFVOVFlQRS5BbGlfRFVOLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0QWxpRHVuU0RLIHJldCA9IDAgc3VjY2VzcyBcIilcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0QWxpRHVuU0RLIHJldCAhPSAwIGZhaWxlZCBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBcInJldCAhPSAwIFwiICsgcmVzdWx0LCBcInR5cGVcIjogRFVOVFlQRS5BbGlfRFVOIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9JTklUX0RVTl9FUlJPUiwgcmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0QWxpRHVuU0RLIHJldE9iaiA9PSBudWxsIGZhaWxlZCBcIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB7IFwicmVzdWx0XCI6IFwiaW5pdEFsaUR1blNESyByZXRPYmogPT0gbnVsbCBmYWlsZWRcIiwgXCJ0eXBlXCI6IERVTlRZUEUuQWxpX0RVTiB9XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9JTklUX0RVTl9FUlJPUiwgcmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXRBbGlEdW5TREsgZmFpbGVkIFwiICxpbml0U3RhdGUgLGFwcGtleSx0b2tlbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRva2VuKCl7XHJcbiAgICAgICAgbGV0IHVpZCA9IE51bWJlcihHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5VaWQpKSB8fCAwO1xyXG4gICAgICAgIGxldCB0b2tlbiA9IHVpZCA/IHVpZC50b1N0cmluZygpIDogXCJ0b2tlblwiXHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iOt+WPluWIneWni+WMlueKtuaAgVxyXG4gICAgaXNJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0R1bkluaXQpIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0R1bkluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzRHVuSW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbml0U3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHJldCA9IEdsb2JhbC5OYXRpdmVFdmVudC5nZXRBbGlEdW5Jbml0UmV0KCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgKiBob3N0SW5mbzp7IHRva2VuLGdyb3VwTmFtZSxkb21haW5OYW1lfVxyXG4gICAgKi9cclxuICAgIGdldFNlcnZlcklQQW5kUG9ydChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcixhdHRyOmFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0R1bkluaXQpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJBbGlEdW4gZ2V0U2VydmVySVBBbmRQb3J0IGlzRHVuSW5pdCA9IGZhbHNlXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGhvc3RJbmZvID0ge31cclxuICAgICAgICBob3N0SW5mb1tcInRva2VuXCJdID0gdGhpcy5nZXRUb2tlbigpXHJcbiAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5fZ3JvdXBcclxuICAgICAgICBsZXQgZGlwID0gdGhpcy5fZGlwO1xyXG4gICAgICAgIGlmIChhdHRyKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQWxpRHVuIGdldFNlcnZlcklQQW5kUG9ydCBzZXQgYXR0ciBwYXJhbVwiKVxyXG4gICAgICAgICAgICBpZiAoYXR0ci5ncm91cCl7XHJcbiAgICAgICAgICAgICAgICBncm91cCA9IGF0dHIuZ3JvdXBcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkFsaUR1biBnZXRTZXJ2ZXJJUEFuZFBvcnQgc2V0IGdyb3VwIFwiICsgZ3JvdXApXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkFsaUR1biBnZXRTZXJ2ZXJJUEFuZFBvcnQgc2V0IGdyb3VwID0gbnVsbFwiIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihhdHRyLmRpcCl7XHJcbiAgICAgICAgICAgICAgICBkaXAgPSBhdHRyLmRpcFxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQWxpRHVuIGdldFNlcnZlcklQQW5kUG9ydCBzZXQgZGlwIFwiICsgZGlwKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJBbGlEdW4gZ2V0U2VydmVySVBBbmRQb3J0IHNldCBkaXAgPSBudWxsXCIgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZ3JvdXAgfHwgIWRpcCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkFsaUR1biBnZXRTZXJ2ZXJJUEFuZFBvcnQgZ3JvdXAgPT0gbnVsbCAgb3IgZGlwID09IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBob3N0SW5mb1tcImdyb3VwTmFtZVwiXSA9IGdyb3VwXHJcbiAgICAgICAgaG9zdEluZm9bXCJkb21haW5OYW1lXCJdID0gZGlwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzZXJ2ZXJJUEFuZFBvcnRKc29uID0gR2xvYmFsLk5hdGl2ZUV2ZW50LmdldEFsaUR1blBvcnQoaG9zdEluZm8sIHBvcnQpO1xyXG4gICAgICAgIGlmIChzZXJ2ZXJJUEFuZFBvcnRKc29uKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldFNlcnZlcklQQW5kUG9ydCBzZXJ2ZXJJUEFuZFBvcnRKc29uID0gXCIgKyBzZXJ2ZXJJUEFuZFBvcnRKc29uKVxyXG4gICAgICAgICAgICBsZXQgc2VydmVySVBBbmRQb3J0ID0gSlNPTi5wYXJzZShzZXJ2ZXJJUEFuZFBvcnRKc29uKVxyXG4gICAgICAgICAgICBpZiAoc2VydmVySVBBbmRQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VydmVySVBBbmRQb3J0LnJlc3VsdCAhPSBudWxsICYmIChzZXJ2ZXJJUEFuZFBvcnQucmVzdWx0ID09IDAgfHwgc2VydmVySVBBbmRQb3J0LnJlc3VsdCA9PSAwLjApICYmIHNlcnZlcklQQW5kUG9ydC5zZXJ2ZXJJcCAmJiBzZXJ2ZXJJUEFuZFBvcnQuc2VydmVyUG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpcFBvcnRPYmogPSB7IFwiaXBcIjogc2VydmVySVBBbmRQb3J0LnNlcnZlcklwLCBcInBvcnRcIjogTnVtYmVyKHNlcnZlcklQQW5kUG9ydC5zZXJ2ZXJQb3J0KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlwUG9ydE9ialxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRTZXJ2ZXJJUEFuZFBvcnQgc2VydmVySVBBbmRQb3J0IGpzb24gZXJyb3JcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0U2VydmVySVBBbmRQb3J0IHNlcnZlcklQQW5kUG9ydEpzb24gPSBudWxsXCIgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxufSJdfQ==