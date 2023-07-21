
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/SystemInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXFN5c3RlbUluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBbUU7QUFFbkUsVUFBVTtBQUNWO0lBc0ZJO1FBckZRLGFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQSxLQUFLO1FBRXhCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsaUJBQVksR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztRQUM1RCx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFDcEMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBS3JDLGtCQUFhLEdBQVksS0FBSyxDQUFDLENBQUEsV0FBVztRQUMxQyxnQkFBVyxHQUFXLEdBQUcsQ0FBQyxDQUFBLHNCQUFzQjtRQUd4RCwwQ0FBMEM7UUFDbEMsZUFBVSxHQUFZLEtBQUssQ0FBQyxDQUFBLFVBQVU7UUF1QnZDLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxHQUFHLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsR0FBRyxDQUFDO1FBQzFCLDJCQUFzQixHQUFHLEdBQUcsQ0FBQztRQU83QixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFdEIsU0FBSSxHQUFHLEdBQUcsQ0FBQTtRQUVqQjs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUE7UUFFakI7O1dBRUc7UUFDSSxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBSXJCLFFBQVE7UUFDRCxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUUxQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUzQixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLGdCQUFn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QUQsQ0F2VkEsQUF1VkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5cclxuLy/lrZjlgqjns7vnu5/nm7jlhbPkv6Hmga9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtSW5mbyB7XHJcbiAgICBwcml2YXRlIF92ZXJzaW9uID0gXCIwLjAuMVwiOy8v54mI5pys5Y+3XHJcbiAgICBwcml2YXRlIF9kZXZpY2VJZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaXNJcGhvbmVYOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9uZXRXb3JrVHlwZTogbnVtYmVyID0gLTE7IC8vIC0xIG5vbmUgMSB3aWZpIDI6IDJHIDM6M0cgNDo0R1xyXG4gICAgcHJpdmF0ZSBfaXNOZXR3b3JrQXZhaWxhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2ZpcnN0SW5zdGFsbFN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfd2lkdGhTY2FsZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaGVpZ3RoU2NhbGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2ZpeEhlaWdodFNjYWxlOiBudW1iZXI7Ly8g6YCC6YWN6auY5bqm5ZCO55qE5a695bqm57yp5pS+5YC8XHJcbiAgICBwcml2YXRlIF9pcEFkZHJlc3M6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2lzU3VwcG9ydFdTUzogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pSv5oyBV1NT5Y2P6K6uXHJcbiAgICBwcml2YXRlIF9hcHBWZXJzaW9uOiBzdHJpbmcgPSBcIjBcIjsvL2FwcE5hdGl2Zea4uOaIj+eJiOacrOWPt++8jOS+m+W8uuabtOS9v+eUqFxyXG4gICAgcHJpdmF0ZSBfcGtnVmVyc2lvbjogc3RyaW5nOy8vYXBw5YyF54mI5pysXHJcbiAgICBwcml2YXRlIF9nYW1lVXJsSnNvbkNmZzogc3RyaW5nOy8vQXBwIGdhbWVVcmwganNvbiDphY3nva5cclxuICAgIC8vIHByaXZhdGUgX3ZlbmRvckNoYW5uZWw6IHN0cmluZzsvL+iBlOi/kOa4oOmBk2lkXHJcbiAgICBwcml2YXRlIF9uYXRpdmVMb2c6IGJvb2xlYW4gPSBmYWxzZTsvL+acrOWcsOaJk+WNsOaYr+WQpuW8gOWQr1xyXG4gICAgcHJpdmF0ZSBfYnVuZGxlTmFtZTogc3RyaW5nOy8v5Y6f55Sf5YyF5ZCNXHJcbiAgICBwcml2YXRlIF9sb2dpblNpZ246IHN0cmluZzsvL3NpZ25cclxuICAgIHByaXZhdGUgX3dlYmdsRGF0YTogc3RyaW5nOy8vc2lnblxyXG5cclxuICAgIHB1YmxpYyB3eEtleTpzdHJpbmc7XHJcbiAgICBwdWJsaWMganB1c2hLZXk6c3RyaW5nO1xyXG4gICAgcHVibGljIGFwcFNpZ246c3RyaW5nOyAvL0FQUOetvuWQjeS/oeaBr1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSn5Y6F5Li755qu6IKkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYWxsU2tpbjpzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIOWtkOa4uOaIj+earuiCpFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2FtZVNraW46c3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YyF5qCH5b+XIOepuuihqOekuuWumOaWueWMhSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBhY2thZ2VUYWc6c3RyaW5nXHJcblxyXG4gICAgcHVibGljIG5hdGl2ZVNjcmVlbldpZHRoID0gXCIwXCI7XHJcbiAgICBwdWJsaWMgbmF0aXZlU2NyZWVuSGVpZ2h0ID0gXCIwXCI7XHJcbiAgICBwdWJsaWMgbmF0aXZlU2NyZWVuRGVuc2l0eSA9IFwiMFwiO1xyXG4gICAgcHVibGljIG5hdGl2ZVNjcmVlbkRlbnNpdHlEcGkgPSBcIjBcIjtcclxuICAgIHB1YmxpYyBjbGlwYm9hcmRUZXh0O1xyXG4gICAgcHVibGljIENoYW5uZWxJbmZvO1xyXG4gICAgcHVibGljIGhvc3RJcDtcclxuICAgIHB1YmxpYyBvc0J1aWxkTW9kZWw7XHJcbiAgICBwdWJsaWMgb3NCdWlsZFZlcnNpb25TREs7XHJcbiAgICBwdWJsaWMgb3NCdWlsZFZlcnNpb25SZWxlYXNlO1xyXG4gICAgcHVibGljIGludml0ZVNvdXJjZVR5cGUgPSAwO1xyXG4gICAgcHVibGljIGRldmljZUJyYW5kID0gXCJcIjtcclxuICAgIHByaXZhdGUgb25CYWNrZ3JvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHVkaWQgPSBcIjBcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWl5Y+j57G75Z6LIDEg5Li6bWRt5LiL6L29IO+8jOWtl+auteS4uuepuuaIluWAvOmdnjHliJnkuLrpnZ5tZG3kuIvovb1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVudHJ5ID0gXCJcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog562+5ZCN57G75Z6LIDEg5YaF6YOo5LyB5Lia562+IDIg5YaF6YOo6LaF57qn562+IDMg5aSW6YOo6LaF57qn562+IOWtl+auteS4uuepuuaIljDliJnkuLrvvIjlpJbpg6jkvIHkuJrnrb4v5LiN5pSv5oyB5Lyg5Y+C55qE5aSW6YOo6LaF57qn562+77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaWduX3R5cGUgPSBcIlwiXHJcblxyXG4gICAgcHVibGljIG5hdGl2ZVBsYXRmb3JtOiBzdHJpbmc7XHJcblxyXG4gICAgLy9hcHDnq6/muKDpgZNcclxuICAgIHB1YmxpYyBwYWNrQ2hhbm5lbDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9hcHBDb25zdFVybDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgYXBwQ29uc3RCYWNrdXBVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgYXBwQ29uc3RCYWNrdXBVcmwxOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGFwcENvbnN0VXJsQXJyYXkgPSBbXTsgLy8gYXBwIGRhdGEg5Z+f5ZCN5pWw57uEXHJcbiAgICBwdWJsaWMgYXBwSUQ6c3RyaW5nID0gXCJcIiAvLyBhcHAgSURcclxuICAgIHB1YmxpYyBzdWJQbGF0Zm9ybUlEOnN0cmluZyA9IFwiXCI7Ly/mgLvku6NpZFxyXG4gICAgcHVibGljIGFwcE5hbWU6c3RyaW5nID0gXCJcIjsvL2FwcCDlkI3np7BcclxuICAgIHB1YmxpYyB6aXBNb2RlbDpib29sZWFuID0gZmFsc2U7Ly/mmK/lkKZ6aXDmlrnlvI9cclxuICAgIHB1YmxpYyBzaW11bGF0b3I6c3RyaW5nID0gXCJcIjsvL+aooeaLn+WZqCAwLeecn+acuiAxLeaooeaLn+WZqCDnqbrlrZfnrKbkuLLvvJrmsqHmo4DmtYvlh7rmnaVcclxuXHJcbiAgICBwdWJsaWMgb3JpZW50YXRpb25MYW5kc2NhcGUgPSB0cnVlOyAvL+aoquWxj1xyXG4gICAgcHVibGljIHNlcnZlcl9pZCA9XCJcIi8v5pyN5Yqh5Zmo5LiL5Y+R55qEc2VydmVyX2lkXHJcblxyXG4gICAgcHVibGljIGNlckRpckZpbGVzID0gW11cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZlcnNpb24odmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHZlclxyXG4gICAgICAgIC8vIExvZ2dlci5sb2coXCItLS0tLS0tLS0tLS0tLXNldFN5c3RlbU1vZGVsIHZlcnNpb24gPSBcIiArIHRoaXMuX3ZlcnNpb24pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFZlcnNpb24oKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLS0tLS0tZ2V0U3lzdGVtTW9kZWwgdmVyc2lvbiA9PT1cIiArIHRoaXMuX3ZlcnNpb24pXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERldmljZUluZm8oKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmdldE5hdGl2ZVBhcmFtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblJlc3VtZSgpIHtcclxuICAgICAgICB0aGlzLm9uQmFja2dyb3VuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGV2aWNlSWQodjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2ID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9kZXZpY2VJZCA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZXZpY2VJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9kZXZpY2VJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBkZXZpY2VpZCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LldlYkRldmljZUlkKTtcclxuICAgICAgICAgICAgaWYgKGRldmljZWlkID09IG51bGwgfHwgZGV2aWNlaWQgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZGV2aWNlaWQgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJZCgpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuV2ViRGV2aWNlSWQsIGRldmljZWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kZXZpY2VJZCA9IGRldmljZWlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV2aWNlSWQudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBpcEFkZHJlc3Modjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faXBBZGRyZXNzID0gdjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlwQWRkcmVzcygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pcEFkZHJlc3NcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHZlcnNpb24odjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2ZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBpc0lwaG9uZVgoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSXBob25lWDtcclxuICAgIH1cclxuXHJcbiAgICAvL+W+ruS/oWlQaG9uZVjpgILphY1cclxuICAgIHB1YmxpYyBnZXQgaXNXWElwaG9uZVgoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgbGV0IGlzWCA9IC9pcGhvbmUvZ2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAoKExheWEuQnJvd3Nlci5jbGllbnRIZWlnaHQgPT0gNzI0KSAmJiBMYXlhLkJyb3dzZXIuY2xpZW50V2lkdGggPT0gMzc1KVxyXG4gICAgICAgIC8vICAgICBpZiAoaXNYKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzSXBob25lWCh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNJcGhvbmVYID0gdjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldCBuZXRXb3JrVHlwZSh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9uZXRXb3JrVHlwZSA9IHY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmV0V29ya1R5cGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmV0V29ya1R5cGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNOZXR3b3JrQXZhaWxhYmxlKHY6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc05ldHdvcmtBdmFpbGFibGUgPSB2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzTmV0d29ya0F2YWlsYWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNOZXR3b3JrQXZhaWxhYmxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZpcnN0SW5zdGFsbFN0YXR1cyh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyc3RJbnN0YWxsU3RhdHVzID0gdjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGZpcnN0SW5zdGFsbFN0YXR1cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3RJbnN0YWxsU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGZpeEhlaWdodFNjYWxlKCk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gcmV0dXJuIGxheWEudXRpbHMuQnJvd3Nlci5jbGllbnRXaWR0aCAvIGxheWEudXRpbHMuQnJvd3Nlci5jbGllbnRIZWlnaHRcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHdpZHRoU2NhbGUoKTogbnVtYmVyIHtcclxuICAgICAgICAvLyByZXR1cm4gbGF5YS51dGlscy5Ccm93c2VyLmNsaWVudFdpZHRoIC8gbGF5YS51dGlscy5Ccm93c2VyLmNsaWVudEhlaWdodCAqIExheWEuc3RhZ2UuZGVzaWduSGVpZ2h0IC8gTGF5YS5zdGFnZS5kZXNpZ25XaWR0aDtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzU3VwcG9ydFdTUygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1N1cHBvcnRXU1M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzU3VwcG9ydFdTUyhmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNTdXBwb3J0V1NTID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFwcFZlcnNpb24oKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBWZXJzaW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjQwMDAwXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFwcFZlcnNpb24oZmxhZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYXBwVmVyc2lvbiA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrVmVyc2lvbihzdXBwb3J0VmVyc2lvbikge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGxldCB2ZXJzaW9uID0gdGhpcy5hcHBWZXJzaW9uO1xyXG4gICAgICAgIGxldCBudW1WZXIgPSBOdW1iZXIodmVyc2lvbilcclxuXHJcbiAgICAgICAgaWYgKGlzTmFOKG51bVZlcikgfHwgbnVtVmVyID49IHN1cHBvcnRWZXJzaW9uKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwa2dWZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGtnVmVyc2lvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGtnVmVyc2lvbihmbGFnOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9wa2dWZXJzaW9uID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGdhbWVVcmxKc29uQ2ZnKGNmZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZVVybEpzb25DZmcgPSBjZmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBnYW1lVXJsSnNvbkNmZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lVXJsSnNvbkNmZ1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBnZXQgdmVuZG9yQ2hhbm5lbCgpOiBzdHJpbmcge1xyXG4gICAgLy8gICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbmRvckNoYW5uZWw7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2V0IHZlbmRvckNoYW5uZWwoZmxhZzogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAgdGhpcy5fdmVuZG9yQ2hhbm5lbCA9IGZsYWc7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYXRpdmVMb2coKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTG9nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuYXRpdmVMb2coZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZUxvZyA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBidW5kbGVOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVuZGxlTmFtZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBidW5kbGVOYW1lKGZsYWc6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2J1bmRsZU5hbWUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgd2ViZ2xEYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2ViZ2xEYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdlYmdsRGF0YShmbGFnOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl93ZWJnbERhdGEgPSBmbGFnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBsb2dpblNpZ24oKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9sb2dpblNpZ247XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2dpblNpZ247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsb2dpblNpZ24oZmxhZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbG9naW5TaWduID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFwcENvbnN0VXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYXBwQ29uc3RVcmwgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhcHBDb25zdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwQ29uc3RVcmw7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59Il19