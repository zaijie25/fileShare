"use strict";
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