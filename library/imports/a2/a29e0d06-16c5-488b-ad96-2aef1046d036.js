"use strict";
cc._RF.push(module, 'a29e00GFsVIi62WKu8QRtA2', 'AppDunControl');
// hall/scripts/framework/net/dun/AppDunControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUNSTATE = exports.DUNTYPE = void 0;
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var YunDun_1 = require("./YunDun");
var ZADun_1 = require("./ZADun");
var AliDun_1 = require("./AliDun");
var DUNTYPE;
(function (DUNTYPE) {
    DUNTYPE[DUNTYPE["None"] = 0] = "None";
    // T_DUN = 1,//T盾
    DUNTYPE[DUNTYPE["YUN_DUN"] = 2] = "YUN_DUN";
    DUNTYPE[DUNTYPE["ZA_DUN"] = 3] = "ZA_DUN";
    DUNTYPE[DUNTYPE["Ali_DUN"] = 4] = "Ali_DUN"; //阿里云游戏盾
})(DUNTYPE = exports.DUNTYPE || (exports.DUNTYPE = {}));
var DUNSTATE;
(function (DUNSTATE) {
    DUNSTATE[DUNSTATE["INIT"] = 10000] = "INIT";
    DUNSTATE[DUNSTATE["LOADING"] = 10001] = "LOADING";
    DUNSTATE[DUNSTATE["SUCCESS"] = 0] = "SUCCESS";
    DUNSTATE[DUNSTATE["FAILED"] = -1] = "FAILED";
})(DUNSTATE = exports.DUNSTATE || (exports.DUNSTATE = {}));
var AppDunControl = /** @class */ (function () {
    function AppDunControl() {
    }
    //设置盾配置
    AppDunControl.prototype.setDunConfig = function (cfg) {
        if (cfg == null && cfg.type == null)
            return;
        Global.Setting.storage.setObject(HallStorageKey_1.default.DunConfig, cfg);
    };
    //加载盾配置
    AppDunControl.prototype.loadDunConfig = function () {
        var cfg = Global.Setting.storage.getObject(HallStorageKey_1.default.DunConfig);
        if (cfg == null) {
            Logger.error("loadDunConfig cfg = null");
            return;
        }
        this.DUNConifg = cfg;
    };
    AppDunControl.prototype.init = function () {
        //初始化盾配置
        this.loadDunConfig();
        //初始化盾类
        this.initDun();
    };
    AppDunControl.prototype.initDun = function () {
        // this.tDun = new TDun(DUNTYPE.T_DUN);
        this.yunDun = new YunDun_1.default(DUNTYPE.YUN_DUN);
        this.zaDun = new ZADun_1.default(DUNTYPE.ZA_DUN);
        this.aliDun = new AliDun_1.default(DUNTYPE.Ali_DUN);
        //上次盾有启动成功记录没，有的话则优先启动
        if (this.DUNConifg) {
            // this.initDunSDKByStorage(DUNTYPE.T_DUN)
            this.initDunSDKByStorage(DUNTYPE.YUN_DUN);
            this.initDunSDKByStorage(DUNTYPE.ZA_DUN);
            this.initDunSDKByStorage(DUNTYPE.Ali_DUN);
        }
    };
    AppDunControl.prototype.initDunSDKByStorage = function (dunType) {
        var dunInitRecord = Global.Setting.storage.get(HallStorageKey_1.default.DunInitRecord + "_" + dunType);
        if (dunInitRecord) {
            this.initDunSDK(dunType);
        }
    };
    AppDunControl.prototype.initDunSDK = function (dunType) {
        if (!dunType) {
            Logger.log("initDunSDK dunType == null");
            return;
        }
        var isSupport = this.checkAppIsSupportDunByType(dunType);
        if (!isSupport) {
            Logger.log("initDunSDK App is not Support dunType =" + dunType);
            return;
        }
        if (!this.DUNConifg) {
            Logger.log("initDunSDK this.DUNConifg == null");
            this.loadDunConfig();
            if (!this.DUNConifg) {
                Logger.log("initDunSDK loadDunConfig DUNConifg == null");
                return;
            }
        }
        var dunObj = null;
        var dunConfig = null;
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun
            //     dunConfig = this.DUNConifg.tdun
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                dunConfig = this.DUNConifg.yundun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                dunConfig = this.DUNConifg.zadun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                dunConfig = this.DUNConifg.alidun;
                break;
            default:
                break;
        }
        if (!dunObj) {
            Logger.log("initDunSDK dunObj == null dunType = " + dunType);
            return;
        }
        if (!dunConfig) {
            Logger.log("initDunSDK dunConfig == null dunType = " + dunType);
            return;
        }
        var isCfgValid = dunObj.checkCfgIsValid(dunConfig);
        if (isSupport && isCfgValid) {
            var dunInitState = dunObj.getInitState();
            if (!this.checkDunStateIsInit(dunInitState)) {
                dunObj.init(dunConfig);
            }
            else {
                Logger.log("initDunSDK checkDunStateIsInit == true " + dunType);
            }
        }
        else {
            Logger.log("initDunSDK  can't init dunType" + dunType);
        }
    };
    //检测当前版本是否支持指定类型盾
    AppDunControl.prototype.checkAppIsSupportDunByType = function (dunType) {
        var isSupport = false;
        var dunObj = null;
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                break;
            default:
                break;
        }
        if (dunObj) {
            isSupport = dunObj.isAppSupport();
        }
        return isSupport;
    };
    //判断盾是否初始化完成
    AppDunControl.prototype.checkDunStateIsInit = function (dunInitState) {
        if (dunInitState != null) {
            //还没开始出初始化或初始化失败
            if (dunInitState == DUNSTATE.INIT || dunInitState == DUNSTATE.FAILED) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    AppDunControl.prototype.getDunIsInitByType = function (dunType) {
        if (!dunType) {
            Logger.log("getDunIsInitByType dunType = null");
            return;
        }
        var isDunInit = false;
        var dunObj = null;
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun;               
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                break;
            default:
                break;
        }
        if (dunObj) {
            isDunInit = dunObj.isInit();
        }
        //尝试启动SDK
        if (!isDunInit) {
            this.initDunSDK(dunType);
        }
        Logger.error("getDunIsInit dunType = " + dunType + " isDunInit = " + isDunInit);
        return isDunInit;
    };
    AppDunControl.prototype.getServerIPAndPort = function (host, lo_port, dunType, attr) {
        if (!host || !lo_port || !dunType) {
            Logger.log("getServerIPAndPort error host lo_port dunType ");
            return;
        }
        var isSupport = this.checkAppIsSupportDunByType(dunType);
        if (!isSupport) {
            Logger.log("getServerIPAndPort App not Support dunType = " + dunType);
            return;
        }
        var ipPortInfo = null;
        var dunObj = null;
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun;
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                break;
            default:
                break;
        }
        if (dunObj) {
            ipPortInfo = dunObj.getServerIPAndPort(host, lo_port, attr);
        }
        return ipPortInfo;
    };
    //判断是否有盾在异步初始化中
    AppDunControl.prototype.checkIsDunLoading = function () {
        var dunInitState = 0;
        var isDunLoading = false;
        if (this.yunDun) {
            dunInitState = this.yunDun.getInitState();
            if (dunInitState == DUNSTATE.LOADING) {
                isDunLoading = true;
            }
        }
        if (this.zaDun) {
            dunInitState = this.zaDun.getInitState();
            if (dunInitState == DUNSTATE.LOADING) {
                isDunLoading = true;
            }
        }
        if (this.aliDun) {
            dunInitState = this.aliDun.getInitState();
            if (dunInitState == DUNSTATE.LOADING) {
                isDunLoading = true;
            }
        }
        return isDunLoading;
    };
    return AppDunControl;
}());
exports.default = AppDunControl;

cc._RF.pop();