"use strict";
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