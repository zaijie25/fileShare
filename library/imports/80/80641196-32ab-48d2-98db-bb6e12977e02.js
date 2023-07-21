"use strict";
cc._RF.push(module, '80641GWMqtI0pjbu24Sl34C', 'ZADun');
// hall/scripts/framework/net/dun/ZADun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var AppDunControl_1 = require("./AppDunControl");
var ZADun = /** @class */ (function () {
    function ZADun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "zadun";
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
    ZADun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    ZADun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg && cfg.key2) {
            return true;
        }
        return false;
    };
    //异步初始化
    ZADun.prototype.init = function (cfg, callback) {
        var _this = this;
        Logger.error("init ZADun SDK");
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init ZADun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init ZADun SDK this.isTDunInit  = true");
            return;
        }
        if (!this._isSupport) {
            Logger.error("init ZADun SDK is not support");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init ZADun SDK state = " + initState);
        var zaDunkey = cfg.key2;
        if (initState == AppDunControl_1.DUNSTATE.INIT) {
            // Logger.error("initZADunSDK")
            if (zaDunkey) {
                Global.NativeEvent.initZADunSDK(zaDunkey, function (retObj) {
                    // Logger.error("initZADunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        var result = Number(retObj.result);
                        if (result == 0 || result == 0.0) {
                            _this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.ZA_DUN, 1);
                            Logger.error("initZADunSDK ret = 0 success ");
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.ZA_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        }
                        else {
                            Logger.error("initZADunSDK ret != 0 failed ");
                            var funcParam = retObj.funcParam ? retObj.funcParam : "";
                            var reportParam = { "result": "ret != 0 " + result, "type": AppDunControl_1.DUNTYPE.ZA_DUN, "error_msg": funcParam };
                            Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                        }
                    }
                    else {
                        Logger.error("initZADunSDK retObj == null failed ");
                        var reportParam = { "result": "initZADunSDK retObj == null failed", "type": AppDunControl_1.DUNTYPE.ZA_DUN };
                        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                    }
                    if (callback) {
                        callback();
                    }
                });
            }
        }
    };
    ZADun.prototype.getInitState = function () {
        if (!this._isSupport) {
            return AppDunControl_1.DUNSTATE.FAILED;
        }
        var ret = Global.NativeEvent.getZADunInitRet();
        return ret;
    };
    ZADun.prototype.getPort = function (lo_port) {
        //后续App添加了单独获取port方法
        var port = 0;
        port = Global.NativeEvent.getZADunPortByAddr("", lo_port);
        Logger.error("ZADun getPort port = " + port);
        return port;
    };
    ZADun.prototype.getServerIPAndPort = function (host, lo_port, attr) {
        if (!this.isDunInit) {
            Logger.error("ZADun getServerIPAndPort isDunInit = false");
            return;
        }
        var ip = "127.0.0.1";
        var port = this.getPort(lo_port);
        return { "ip": ip, "port": port };
    };
    ZADun.prototype.isInit = function () {
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
    return ZADun;
}());
exports.default = ZADun;

cc._RF.pop();