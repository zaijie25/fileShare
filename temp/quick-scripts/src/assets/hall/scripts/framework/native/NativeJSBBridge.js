"use strict";
cc._RF.push(module, '52bdeY7N6hOa5vpMpRzphgL', 'NativeJSBBridge');
// hall/scripts/framework/native/NativeJSBBridge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../logic/hallcommon/const/HallStorageKey");
var NativeJSBBridge = /** @class */ (function () {
    function NativeJSBBridge() {
        this.REPORT_CLICK_GAME_KEY = "clickGame";
        this.clickGames = [];
    }
    NativeJSBBridge.prototype.init = function () {
        if (CC_PREVIEW)
            return;
        if (cc.sys.isBrowser)
            return;
        if (Global.Toolkit.checkVersionSupport(20009)) {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
                if (native && native.JSBBridge) {
                    this.jsbBridge = native.JSBBridge.getInstance();
                }
            }
        }
    };
    NativeJSBBridge.prototype.addClickGames = function (gameid) {
        if (gameid && gameid != null) {
            this.clickGames[this.clickGames.length] = gameid;
        }
        var uid = Global.Setting.storage.get(HallStorageKey_1.default.Uid) || 'guest';
        this.setBuglyUserID(uid);
        this.addBuglyUserValue(this.REPORT_CLICK_GAME_KEY, JSON.stringify(this.clickGames));
    };
    /**
     * 打印本地日志
     * @param level 1 2 3 4
     * @param tag
     * @param msg 标题
     * @returns null
     */
    NativeJSBBridge.prototype.log = function (level, tag, msg) {
        if (this.jsbBridge && this.jsbBridge.log) {
            this.jsbBridge.log(level, tag, msg);
        }
    };
    /**
     * 设置上报UserID
     * @param userID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyUserID = function (userID) {
        if (this.jsbBridge && this.jsbBridge.setBuglyUserID) {
            this.jsbBridge.setBuglyUserID(userID);
        }
    };
    /**
     * 设置上报Tag
     * @param userID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyTag = function (tag) {
        if (this.jsbBridge && this.jsbBridge.setBuglyTag) {
            this.jsbBridge.setBuglyTag(tag);
        }
    };
    /**
     * 设置上报玩家自定义信息
     * @param key
     * @param value
     * @returns null
     */
    NativeJSBBridge.prototype.addBuglyUserValue = function (key, value) {
        if (this.jsbBridge && this.jsbBridge.addBuglyUserValue) {
            this.jsbBridge.addBuglyUserValue(key, value);
        }
    };
    /**
     * 移除上报玩家自定义信息
     * @param key
     * @returns null
     */
    NativeJSBBridge.prototype.removeBuglyUserValue = function (key) {
        if (this.jsbBridge && this.jsbBridge.removeBuglyUserValue) {
            this.jsbBridge.removeBuglyUserValue(key);
        }
    };
    /**
     * 设置bugly 上报错误信息
     * @param msg
     * @param stack
     * @returns null
     */
    NativeJSBBridge.prototype.reportException = function (msg, stack) {
        if (this.jsbBridge && this.jsbBridge.reportException) {
            this.jsbBridge.reportException(msg, stack);
        }
    };
    /**
     * 设置bugly AppID
     * @param appID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppID = function (appID) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppID) {
            this.jsbBridge.setBuglyAppID(appID);
        }
    };
    /**
     * 设置bugly 渠道id
     * @param channel
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppChannel = function (channel) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppChannel) {
            this.jsbBridge.setBuglyAppChannel(channel);
        }
    };
    /**
     * 设置bugly 上报原生版本号
     * @param channel
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppVersion = function (version) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppVersion) {
            this.jsbBridge.setBuglyAppVersion(version);
        }
    };
    /**
     * 解密数据
     * @param encryptData
     * @returns string 解密数据
     */
    NativeJSBBridge.prototype.decryptData = function (encryptData) {
        if (this.jsbBridge && this.jsbBridge.decryptData) {
            var retData = this.jsbBridge.decryptData(encryptData);
            if (retData) {
                retData = Global.Toolkit.strReplaceCtrChar(retData);
            }
            // Logger.error("decryptData = " + retData)
            return retData;
        }
    };
    /**
     * 获取加密数据
     * @param sign_key
     * @param deviceId
     * @returns string 加密数据
     */
    NativeJSBBridge.prototype.getLoginSign = function (sign_key, deviceId) {
        if (this.jsbBridge && this.jsbBridge.getLoginSign) {
            var retData = this.jsbBridge.getLoginSign(sign_key, deviceId);
            // Logger.error("getLoginSign = " + retData)
            return retData;
        }
    };
    /**
     * 获取总内存
     * @param null
     * @returns int 总内存
     */
    NativeJSBBridge.prototype.getTotalMem = function () {
        if (this.jsbBridge && this.jsbBridge.getTotalMem) {
            var retData = this.jsbBridge.getTotalMem();
            Logger.error("getTotalMem = " + retData);
            return retData;
        }
    };
    /**
     * 获取剩余可用内存
     * @param null
     * @returns int 可用内存
     */
    NativeJSBBridge.prototype.getFreeMem = function () {
        if (this.jsbBridge && this.jsbBridge.getFreeMem) {
            var retData = this.jsbBridge.getFreeMem();
            Logger.error("getFreeMem = " + retData);
            return retData;
        }
    };
    /**
     * 获取已用内存(IOS 可以获取 Android 获取不了)
     * @param null
     * @returns int 已用内存
     */
    NativeJSBBridge.prototype.getUsedMem = function () {
        if (this.jsbBridge && this.jsbBridge.getUsedMem) {
            var retData = this.jsbBridge.getUsedMem();
            Logger.error("getUsedMem = " + retData);
            return retData;
        }
    };
    return NativeJSBBridge;
}());
exports.default = NativeJSBBridge;

cc._RF.pop();