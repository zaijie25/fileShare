"use strict";
cc._RF.push(module, 'e1fc42gFKZI4IHOcjBu6Hds', 'TDun');
// hall/scripts/framework/net/dun/TDun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var AppDunControl_1 = require("./AppDunControl");
var TDun = /** @class */ (function () {
    function TDun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "tdun";
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
    TDun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    TDun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg && cfg.key) {
            return true;
        }
        return false;
    };
    //异步初始化
    TDun.prototype.init = function (cfg, callback) {
        var _this = this;
        // Logger.error("init TDun SDK")
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init TDun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init TDun SDK this.isTDunInit  = true");
            return;
        }
        if (!this._isSupport) {
            Logger.error("init TDun SDK is not support");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init TDun SDK state = " + initState);
        var tDunkey = cfg.key;
        if (initState == AppDunControl_1.DUNSTATE.INIT || initState == AppDunControl_1.DUNSTATE.FAILED) {
            // Logger.error("initTDunSDK")
            if (tDunkey) {
                Global.NativeEvent.initTDunSDK(tDunkey, function (retObj) {
                    // Logger.error("initTDunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        var result = Number(retObj.result);
                        if (result == 0 || result == 0.0) {
                            _this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.T_DUN, 1);
                            // Logger.error("initTDunSDK ret = 0 success ")
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        }
                        else {
                            Logger.error("initTDunSDK ret != 0 failed ");
                            // let reportParam = { "result": "ret != 0 " + result ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam)
                        }
                    }
                    else {
                        Logger.error("initTDunSDK retObj == null failed ");
                        // let reportParam = { "result": "initTDunSDK retObj == null failed" ,"type": DUNTYPE.T_DUN}
                        // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam) 
                    }
                    if (callback) {
                        callback();
                    }
                });
            }
        }
    };
    TDun.prototype.getInitState = function () {
        if (!this._isSupport) {
            return AppDunControl_1.DUNSTATE.FAILED;
        }
        var ret = Global.NativeEvent.getTDunInitRet();
        return ret;
    };
    TDun.prototype.getPort = function (lo_port) {
        var port = Global.NativeEvent.getTDunPort(lo_port);
        Logger.error("TDun getPort port = " + port);
        return port;
    };
    TDun.prototype.getServerIPAndPort = function (host, lo_port, attr) {
        if (!this.isDunInit) {
            Logger.error("TDun getServerIPAndPort isDunInit = false");
            return;
        }
        var ip = "127.0.0.1";
        var port = this.getPort(lo_port);
        return { "ip": ip, "port": port };
    };
    TDun.prototype.isInit = function () {
        if (!this._isSupport) {
            return false;
        }
        if (!this.isDunInit) {
            var ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    };
    return TDun;
}());
exports.default = TDun;

cc._RF.pop();