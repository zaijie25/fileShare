"use strict";
cc._RF.push(module, '4fc062Q5nhISZQEyg5IL3yQ', 'ChannelUtil');
// hall/scripts/logic/core/tool/ChannelUtil.ts

"use strict";
/**
 * 渠道相关的工具类
 * @author Peter
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelUtil = void 0;
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var ChannelUtil = /** @class */ (function () {
    function ChannelUtil() {
    }
    ChannelUtil.prototype.getUuid = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("udid", function (info) {
                Global.Setting.SystemInfo.udid = info.funcParam;
            });
        }
    };
    ChannelUtil.prototype.getEntryType = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("entry", function (info) {
                Global.Setting.SystemInfo.entry = info.funcParam;
            });
        }
    };
    /**
     * 签名类型
     */
    ChannelUtil.prototype.getSignType = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("sign_type", function (info) {
                Global.Setting.SystemInfo.sign_type = info.funcParam;
            });
        }
    };
    //--------------------open install 相关---------------------------------
    ChannelUtil.prototype.initOpeninstall = function () {
        var _this = this;
        if (this.isCliptextVaild()) {
            Global.Setting.ChannelInfo.clipboardContent = Global.Setting.SystemInfo.clipboardText;
        }
        Global.NativeEvent.getOpenInstallData(this.initOpenInstallData.bind(this));
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("ChannelInfo", function (info) {
                // console.log("这是当前openinstall的信息111111111111",JSON.stringify(info));
                Global.Setting.SystemInfo.ChannelInfo = info.funcParam;
                _this.decodeChannelInfo();
            });
        }
        // this.getDownloadAppInfo();
    };
    //解析openinstall 和 剪貼板
    ChannelUtil.prototype.initOpenInstallData = function (content) {
        // Logger.log("initOpenInstallData content type -----", typeof (content) + " \r\n content=================" + content);
        console.log("这是当前openinstall的信息", JSON.stringify(content));
        var tempContent = Global.Setting.ChannelInfo.openInstallContent;
        if (tempContent != null && tempContent != "") {
            return;
        }
        else {
            Global.Setting.ChannelInfo.openInstallContent = content;
        }
        // Logger.log("initOpenInstallData start setting ");
        //检验openInstall
        //支持content是string 或者是table
        if (content != null && content != "") {
            var tab = null;
            if (typeof (content) == "string") {
                try {
                    tab = JSON.parse(content);
                    Logger.log("open install string : ", content);
                }
                catch (e) {
                    Logger.error("load openInstall error", content);
                    this.checkCliptextAndAppInfo();
                    return;
                }
            }
            else {
                tab = content;
                try {
                    var openInstall = JSON.stringify(tab);
                    Logger.log("open install tab : ", openInstall);
                }
                catch (e) {
                    Logger.log("open install tab parse error");
                }
            }
            var hasOpeninstallData = false;
            if (tab.cid && !isNaN(Number(tab.cid))) {
                hasOpeninstallData = true;
                Global.Setting.ChannelInfo.openInstallChannel = Number(tab.cid);
            }
            if (tab.ch && !isNaN(Number(tab.ch))) {
                hasOpeninstallData = true;
                Global.Setting.ChannelInfo.openInstallChannel = Number(tab.ch);
            }
            // Logger.log("initOpenInstallData  tab.ic::"+tab.ic);
            if (tab.ic && !isNaN(Number(tab.ic))) {
                hasOpeninstallData = true;
                Global.Setting.ChannelInfo.inviteId = Number(tab.ic);
            }
            Logger.log("initOpenInstallData  hasOpeninstallData::" + hasOpeninstallData);
            if (hasOpeninstallData) {
                Global.Setting.ChannelInfo.sourceType = 1;
            }
            else //当openinstall 返回空表时  检查剪贴板
                this.checkCliptextAndAppInfo();
        }
        else {
            this.checkCliptextAndAppInfo();
        }
    };
    ChannelUtil.prototype.PostInstallApp = function () {
        var flag = Global.Setting.storage.getBool(HallStorageKey_1.default.PostOpenInstallFlag);
        if (flag) {
            return;
        }
        var param = {};
        param.appid = Global.Setting.appId;
        param.edition = Global.HotUpdateManager.nativeVersions["hall"];
        // param.app = Global.Setting.SystemInfo.vendorChannel;
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        param.app_source = Global.Setting.SystemInfo.appConstUrl;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.HallServer.sendPostInstallApp(NetAppface.PostInstallApp, param, function (msg) {
            Global.Setting.storage.setBool(HallStorageKey_1.default.PostOpenInstallFlag, true);
        }, null, false);
    };
    ChannelUtil.prototype.checkCliptextAndAppInfo = function () {
        if (!this.decodeCliptext()) {
            // this.getDownloadAppInfo();
        }
    };
    ChannelUtil.prototype.isCliptextVaild = function () {
        var clipContent = Global.Setting.SystemInfo.clipboardText;
        if (!clipContent)
            return false;
        if (clipContent.length > 500) {
            return false;
        }
        var subStrs = clipContent.split("|");
        if (subStrs.length < 4) {
            return false;
        }
        else if (subStrs.length > 10)
            return false;
        var appId = subStrs[2];
        if (appId != Global.customApp.getAppID()) {
            return false;
        }
        var md5 = subStrs[subStrs.length - 1];
        //判断最后一位是否是md5
        var md5ContentIdnex = clipContent.lastIndexOf("|");
        var md5Content = clipContent.substr(0, md5ContentIdnex);
        if (Global.AESUtil.md5(md5Content) == md5)
            return true;
        return false;
    };
    ChannelUtil.prototype.isChannelStrVaild = function (chanStr) {
        if (chanStr == null || chanStr == "" || isNaN(Number(chanStr)))
            return false;
        var value = Number(chanStr);
        if (!Global.Toolkit.isInteger(value))
            return false;
        if (value < 0 || value > 10000000000)
            return false;
        return true;
    };
    //校验
    ChannelUtil.prototype.decodeCliptext = function () {
        var clipContent = Global.Setting.SystemInfo.clipboardText;
        if (clipContent == null || clipContent == "")
            return false;
        if (!this.isCliptextVaild())
            return false;
        var subStr = clipContent.split("|");
        if (subStr.length < 4) {
            Logger.error("剪贴板解析失败", clipContent);
            return false;
        }
        var packNo = subStr[0];
        if (this.isChannelStrVaild(packNo)) {
            Global.Setting.ChannelInfo.clipboardChannel = Number(packNo);
        }
        var ic = subStr[1];
        if (this.isChannelStrVaild(ic)) {
            Global.Setting.ChannelInfo.inviteId = Number(ic);
        }
        Global.Setting.ChannelInfo.clipboardContent = clipContent;
        Global.Setting.ChannelInfo.sourceType = 2;
        return true;
    };
    //校验
    ChannelUtil.prototype.decodeChannelInfo = function () {
        var clipContent = Global.Setting.SystemInfo.ChannelInfo;
        if (clipContent == null || clipContent == "")
            return false;
        var subStr = clipContent.split("|");
        if (subStr.length < 4) {
            Logger.error("infoPlist", clipContent);
            return false;
        }
        var packNo = subStr[0];
        if (this.isChannelStrVaild(packNo)) {
            Global.Setting.ChannelInfo.infoChannel = Number(packNo);
        }
        var ic = subStr[1];
        if (this.isChannelStrVaild(ic)) {
            Global.Setting.ChannelInfo.inviteId = Number(ic);
        }
        Global.Setting.ChannelInfo.clipboardContent = clipContent;
        Global.Setting.ChannelInfo.sourceType = 3;
        return true;
    };
    return ChannelUtil;
}());
exports.ChannelUtil = ChannelUtil;

cc._RF.pop();