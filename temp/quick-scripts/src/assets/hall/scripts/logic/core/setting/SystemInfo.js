"use strict";
cc._RF.push(module, '37e2fiYgPhOmq2aM1kZI2ch', 'SystemInfo');
// hall/scripts/logic/core/setting/SystemInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
//存储系统相关信息
var SystemInfo = /** @class */ (function () {
    function SystemInfo() {
        this._version = "0.0.1"; //版本号
        this._isIphoneX = false;
        this._netWorkType = -1; // -1 none 1 wifi 2: 2G 3:3G 4:4G
        this._isNetworkAvailable = true;
        this._firstInstallStatus = false;
        this._isSupportWSS = false; //是否支持WSS协议
        this._appVersion = "0"; //appNative游戏版本号，供强更使用
        // private _vendorChannel: string;//联运渠道id
        this._nativeLog = false; //本地打印是否开启
        this.nativeScreenWidth = "0";
        this.nativeScreenHeight = "0";
        this.nativeScreenDensity = "0";
        this.nativeScreenDensityDpi = "0";
        this.inviteSourceType = 0;
        this.deviceBrand = "";
        this.onBackground = false;
        this.udid = "0";
        /**
         * 入口类型 1 为mdm下载 ，字段为空或值非1则为非mdm下载
         */
        this.entry = "";
        /**
         * 签名类型 1 内部企业签 2 内部超级签 3 外部超级签 字段为空或0则为（外部企业签/不支持传参的外部超级签）
         */
        this.sign_type = "";
        //app端渠道
        this.packChannel = null;
        this._appConstUrl = "";
        this.appConstBackupUrl = "";
        this.appConstBackupUrl1 = "";
        this.appConstUrlArray = []; // app data 域名数组
        this.appID = ""; // app ID
        this.subPlatformID = ""; //总代id
        this.appName = ""; //app 名称
        this.zipModel = false; //是否zip方式
        this.simulator = ""; //模拟器 0-真机 1-模拟器 空字符串：没检测出来
        this.orientationLandscape = true; //横屏
        this.server_id = ""; //服务器下发的server_id
        this.cerDirFiles = [];
    }
    Object.defineProperty(SystemInfo.prototype, "Version", {
        get: function () {
            // Logger.log("--------------getSystemModel version ===" + this._version)
            return this._version;
        },
        set: function (ver) {
            this._version = ver;
            // Logger.log("--------------setSystemModel version = " + this._version)
        },
        enumerable: false,
        configurable: true
    });
    SystemInfo.prototype.init = function () {
    };
    SystemInfo.prototype.getDeviceInfo = function () {
        Global.NativeEvent.getNativeParams();
    };
    SystemInfo.prototype.onResume = function () {
        this.onBackground = false;
    };
    Object.defineProperty(SystemInfo.prototype, "deviceId", {
        get: function () {
            if (this._deviceId == null) {
                var deviceid = Global.Setting.storage.get(HallStorageKey_1.default.WebDeviceId);
                if (deviceid == null || deviceid == "") {
                    deviceid = Global.Toolkit.genDeviceId();
                    Global.Setting.storage.set(HallStorageKey_1.default.WebDeviceId, deviceid);
                }
                this._deviceId = deviceid;
            }
            return this._deviceId.trim();
        },
        set: function (v) {
            if (v == null || v == "")
                return;
            this._deviceId = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "ipAddress", {
        get: function () {
            return this._ipAddress;
        },
        set: function (v) {
            this._ipAddress = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "version", {
        get: function () {
            return this._version;
        },
        set: function (v) {
            this._version = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "isIphoneX", {
        get: function () {
            return this._isIphoneX;
        },
        set: function (v) {
            this._isIphoneX = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "isWXIphoneX", {
        //微信iPhoneX适配
        get: function () {
            // if (cc.sys.isNative) {
            //     return false;
            // } else {
            //     let isX = /iphone/gi.test(navigator.userAgent) && ((Laya.Browser.clientHeight == 724) && Laya.Browser.clientWidth == 375)
            //     if (isX) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "netWorkType", {
        get: function () {
            return this._netWorkType;
        },
        set: function (v) {
            this._netWorkType = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "isNetworkAvailable", {
        get: function () {
            return this._isNetworkAvailable;
        },
        set: function (v) {
            this._isNetworkAvailable = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "firstInstallStatus", {
        get: function () {
            return this._firstInstallStatus;
        },
        set: function (v) {
            this._firstInstallStatus = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "fixHeightScale", {
        get: function () {
            // return laya.utils.Browser.clientWidth / laya.utils.Browser.clientHeight
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "widthScale", {
        get: function () {
            // return laya.utils.Browser.clientWidth / laya.utils.Browser.clientHeight * Laya.stage.designHeight / Laya.stage.designWidth;
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "isSupportWSS", {
        get: function () {
            if (cc.sys.isNative) {
                return this._isSupportWSS;
            }
            else {
                return true;
            }
            // return false;
        },
        set: function (flag) {
            this._isSupportWSS = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "appVersion", {
        get: function () {
            if (cc.sys.isNative) {
                return this._appVersion;
            }
            else {
                return "40000";
            }
        },
        set: function (flag) {
            this._appVersion = flag;
        },
        enumerable: false,
        configurable: true
    });
    SystemInfo.prototype.checkVersion = function (supportVersion) {
        if (!cc.sys.isNative)
            return true;
        var version = this.appVersion;
        var numVer = Number(version);
        if (isNaN(numVer) || numVer >= supportVersion)
            return true;
        return false;
    };
    Object.defineProperty(SystemInfo.prototype, "pkgVersion", {
        get: function () {
            if (cc.sys.isNative) {
                return this._pkgVersion;
            }
            else {
                return "";
            }
        },
        set: function (flag) {
            this._pkgVersion = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "gameUrlJsonCfg", {
        get: function () {
            return this._gameUrlJsonCfg;
        },
        set: function (cfg) {
            this._gameUrlJsonCfg = cfg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "nativeLog", {
        // public get vendorChannel(): string {
        //     if (cc.sys.isNative) {
        //         return this._vendorChannel;
        //     } else {
        //         return "";
        //     }
        // }
        // public set vendorChannel(flag: string) {
        //     this._vendorChannel = flag;
        // }
        get: function () {
            if (cc.sys.isNative) {
                return this._nativeLog;
            }
            else {
                return false;
            }
        },
        set: function (flag) {
            this._nativeLog = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "bundleName", {
        get: function () {
            if (cc.sys.isNative) {
                return this._bundleName;
            }
            else {
                return "";
            }
        },
        set: function (flag) {
            this._bundleName = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "webglData", {
        get: function () {
            if (cc.sys.isNative) {
                return this._webglData;
            }
            else {
                return "";
            }
        },
        set: function (flag) {
            this._webglData = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "loginSign", {
        get: function () {
            // if (cc.sys.isNative) {
            //     return this._loginSign;
            // } else {
            //     return "";
            // }
            return this._loginSign;
        },
        set: function (flag) {
            this._loginSign = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SystemInfo.prototype, "appConstUrl", {
        get: function () {
            return this._appConstUrl;
        },
        set: function (url) {
            this._appConstUrl = url;
        },
        enumerable: false,
        configurable: true
    });
    return SystemInfo;
}());
exports.default = SystemInfo;

cc._RF.pop();