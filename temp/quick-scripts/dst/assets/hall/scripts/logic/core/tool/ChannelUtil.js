
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/ChannelUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXENoYW5uZWxVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztFQUlFOzs7QUFJRix3RUFBbUU7QUFJbkU7SUFBQTtJQThPQSxDQUFDO0lBNU9VLDZCQUFPLEdBQWQ7UUFFSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtnQkFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFTSxrQ0FBWSxHQUFuQjtRQUVJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFJO2dCQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUNBQVcsR0FBbEI7UUFFSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFVBQUMsSUFBSTtnQkFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDekQsQ0FB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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5rig6YGT55u45YWz55qE5bel5YW357G7XHJcbiAqIEBhdXRob3IgUGV0ZXJcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBSZXBvcnRUb29sIH0gZnJvbSBcIi4vUmVwb3J0VG9vbFwiO1xyXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi4vc2V0dGluZy9TZXR0aW5nXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbm5lbFV0aWwge1xyXG4gICBcclxuICAgIHB1YmxpYyBnZXRVdWlkKClcclxuICAgIHtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmdldEluZm9QbGlzdFBhcmFtKFwidWRpZFwiLCAoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby51ZGlkID0gaW5mby5mdW5jUGFyYW07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFbnRyeVR5cGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0SW5mb1BsaXN0UGFyYW0oXCJlbnRyeVwiLCAoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5lbnRyeSA9IGluZm8uZnVuY1BhcmFtO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOetvuWQjeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2lnblR5cGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0SW5mb1BsaXN0UGFyYW0oXCJzaWduX3R5cGVcIiwgKGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2lnbl90eXBlID0gaW5mby5mdW5jUGFyYW07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLW9wZW4gaW5zdGFsbCDnm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuIHB1YmxpYyBpbml0T3Blbmluc3RhbGwoKSB7XHJcbiAgICBpZiAodGhpcy5pc0NsaXB0ZXh0VmFpbGQoKSkge1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmNsaXBib2FyZENvbnRlbnQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmNsaXBib2FyZFRleHQ7XHJcbiAgICB9IFxyXG4gICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmdldE9wZW5JbnN0YWxsRGF0YSh0aGlzLmluaXRPcGVuSW5zdGFsbERhdGEuYmluZCh0aGlzKSlcclxuICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5nZXRJbmZvUGxpc3RQYXJhbShcIkNoYW5uZWxJbmZvXCIsIChpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5nmmK/lvZPliY1vcGVuaW5zdGFsbOeahOS/oeaBrzExMTExMTExMTExMVwiLEpTT04uc3RyaW5naWZ5KGluZm8pKTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5DaGFubmVsSW5mbyA9IGluZm8uZnVuY1BhcmFtO1xyXG4gICAgICAgICAgICB0aGlzLmRlY29kZUNoYW5uZWxJbmZvKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIHRoaXMuZ2V0RG93bmxvYWRBcHBJbmZvKCk7XHJcbn1cclxuXHJcblxyXG4vL+ino+aekG9wZW5pbnN0YWxsIOWSjCDliarosrzmnb9cclxucHJpdmF0ZSBpbml0T3Blbkluc3RhbGxEYXRhKGNvbnRlbnQ6IGFueSkge1xyXG4gICAgLy8gTG9nZ2VyLmxvZyhcImluaXRPcGVuSW5zdGFsbERhdGEgY29udGVudCB0eXBlIC0tLS0tXCIsIHR5cGVvZiAoY29udGVudCkgKyBcIiBcXHJcXG4gY29udGVudD09PT09PT09PT09PT09PT09XCIgKyBjb250ZW50KTtcclxuICAgIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmNb3Blbmluc3RhbGznmoTkv6Hmga9cIixKU09OLnN0cmluZ2lmeShjb250ZW50KSk7XHJcbiAgICBsZXQgdGVtcENvbnRlbnQgPSBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5vcGVuSW5zdGFsbENvbnRlbnQ7XHJcbiAgICBpZiAodGVtcENvbnRlbnQgIT0gbnVsbCAmJiB0ZW1wQ29udGVudCAhPSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5vcGVuSW5zdGFsbENvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgLy8gTG9nZ2VyLmxvZyhcImluaXRPcGVuSW5zdGFsbERhdGEgc3RhcnQgc2V0dGluZyBcIik7XHJcbiAgICAvL+ajgOmqjG9wZW5JbnN0YWxsXHJcbiAgICAvL+aUr+aMgWNvbnRlbnTmmK9zdHJpbmcg5oiW6ICF5pivdGFibGVcclxuICAgIGlmIChjb250ZW50ICE9IG51bGwgJiYgY29udGVudCAhPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IHRhYiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoY29udGVudCkgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGFiID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuIGluc3RhbGwgc3RyaW5nIDogXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkIG9wZW5JbnN0YWxsIGVycm9yXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NsaXB0ZXh0QW5kQXBwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0YWIgPSBjb250ZW50O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wZW5JbnN0YWxsID0gSlNPTi5zdHJpbmdpZnkodGFiKTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuIGluc3RhbGwgdGFiIDogXCIsIG9wZW5JbnN0YWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIm9wZW4gaW5zdGFsbCB0YWIgcGFyc2UgZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgaGFzT3Blbmluc3RhbGxEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRhYi5jaWQgJiYgIWlzTmFOKE51bWJlcih0YWIuY2lkKSkpIHtcclxuICAgICAgICAgICAgaGFzT3Blbmluc3RhbGxEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8ub3Blbkluc3RhbGxDaGFubmVsID0gTnVtYmVyKHRhYi5jaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhYi5jaCAmJiAhaXNOYU4oTnVtYmVyKHRhYi5jaCkpKSB7XHJcbiAgICAgICAgICAgIGhhc09wZW5pbnN0YWxsRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLm9wZW5JbnN0YWxsQ2hhbm5lbCA9IE51bWJlcih0YWIuY2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImluaXRPcGVuSW5zdGFsbERhdGEgIHRhYi5pYzo6XCIrdGFiLmljKTtcclxuICAgICAgICBpZiAodGFiLmljICYmICFpc05hTihOdW1iZXIodGFiLmljKSkpIHtcclxuICAgICAgICAgICAgaGFzT3Blbmluc3RhbGxEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uaW52aXRlSWQgPSBOdW1iZXIodGFiLmljKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImluaXRPcGVuSW5zdGFsbERhdGEgIGhhc09wZW5pbnN0YWxsRGF0YTo6XCIraGFzT3Blbmluc3RhbGxEYXRhKTtcclxuICAgICAgICBpZiAoaGFzT3Blbmluc3RhbGxEYXRhKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNvdXJjZVR5cGUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlICAgLy/lvZNvcGVuaW5zdGFsbCDov5Tlm57nqbrooajml7YgIOajgOafpeWJqui0tOadv1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ2xpcHRleHRBbmRBcHBJbmZvKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmNoZWNrQ2xpcHRleHRBbmRBcHBJbmZvKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiAgICBQb3N0SW5zdGFsbEFwcCgpIHtcclxuICAgICAgICBsZXQgZmxhZyA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0Qm9vbChIYWxsU3RvcmFnZUtleS5Qb3N0T3Blbkluc3RhbGxGbGFnKTtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fTtcclxuICAgICAgICBwYXJhbS5hcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIHBhcmFtLmVkaXRpb24gPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5uYXRpdmVWZXJzaW9uc1tcImhhbGxcIl07XHJcbiAgICAgICAgLy8gcGFyYW0uYXBwID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby52ZW5kb3JDaGFubmVsO1xyXG4gICAgICAgIHBhcmFtLnBhY2sgPSBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5nZXRSZWdpc3RDaGFubmVsKCk7XHJcbiAgICAgICAgcGFyYW0udWlkID0gTnVtYmVyKEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlVpZCkpIHx8IDA7XHJcbiAgICAgICAgcGFyYW0uYXBwX3NvdXJjZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwQ29uc3RVcmw7XHJcbiAgICAgICAgcGFyYW0uZGV2aWNlID0gR2xvYmFsLlRvb2xraXQuZ2VuRGV2aWNlSW5mbygpO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmRQb3N0SW5zdGFsbEFwcChOZXRBcHBmYWNlLlBvc3RJbnN0YWxsQXBwLCBwYXJhbSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldEJvb2woSGFsbFN0b3JhZ2VLZXkuUG9zdE9wZW5JbnN0YWxsRmxhZywgdHJ1ZSk7XHJcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tDbGlwdGV4dEFuZEFwcEluZm8oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRlY29kZUNsaXB0ZXh0KCkpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5nZXREb3dubG9hZEFwcEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpc0NsaXB0ZXh0VmFpbGQoKSB7XHJcbiAgICAgICAgbGV0IGNsaXBDb250ZW50OiBzdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmNsaXBib2FyZFRleHQ7XHJcbiAgICAgICAgaWYgKCFjbGlwQ29udGVudClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKGNsaXBDb250ZW50Lmxlbmd0aCA+IDUwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3ViU3RycyA9IGNsaXBDb250ZW50LnNwbGl0KFwifFwiKTtcclxuICAgICAgICBpZiAoc3ViU3Rycy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3ViU3Rycy5sZW5ndGggPiAxMClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhcHBJZCA9IHN1YlN0cnNbMl1cclxuICAgICAgICBpZiAoYXBwSWQgIT0gR2xvYmFsLmN1c3RvbUFwcC5nZXRBcHBJRCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWQ1ID0gc3ViU3Ryc1tzdWJTdHJzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIC8v5Yik5pat5pyA5ZCO5LiA5L2N5piv5ZCm5pivbWQ1XHJcbiAgICAgICAgbGV0IG1kNUNvbnRlbnRJZG5leCA9IGNsaXBDb250ZW50Lmxhc3RJbmRleE9mKFwifFwiKTtcclxuICAgICAgICBsZXQgbWQ1Q29udGVudCA9IGNsaXBDb250ZW50LnN1YnN0cigwLCBtZDVDb250ZW50SWRuZXgpO1xyXG4gICAgICAgIGlmIChHbG9iYWwuQUVTVXRpbC5tZDUobWQ1Q29udGVudCkgPT0gbWQ1KVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0NoYW5uZWxTdHJWYWlsZChjaGFuU3RyKSB7XHJcbiAgICAgICAgaWYgKGNoYW5TdHIgPT0gbnVsbCB8fCBjaGFuU3RyID09IFwiXCIgfHwgaXNOYU4oTnVtYmVyKGNoYW5TdHIpKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IE51bWJlcihjaGFuU3RyKVxyXG4gICAgICAgIGlmICghR2xvYmFsLlRvb2xraXQuaXNJbnRlZ2VyKHZhbHVlKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwMDAwMDAwMDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvL+agoemqjFxyXG4gICAgcHVibGljIGRlY29kZUNsaXB0ZXh0KCkge1xyXG4gICAgICAgIGxldCBjbGlwQ29udGVudDogc3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5jbGlwYm9hcmRUZXh0O1xyXG4gICAgICAgIGlmIChjbGlwQ29udGVudCA9PSBudWxsIHx8IGNsaXBDb250ZW50ID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaXNDbGlwdGV4dFZhaWxkKCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgc3ViU3RyID0gY2xpcENvbnRlbnQuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIGlmIChzdWJTdHIubGVuZ3RoIDwgNCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliarotLTmnb/op6PmnpDlpLHotKVcIiwgY2xpcENvbnRlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYWNrTm8gPSBzdWJTdHJbMF07XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsU3RyVmFpbGQocGFja05vKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5jbGlwYm9hcmRDaGFubmVsID0gTnVtYmVyKHBhY2tObyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWMgPSBzdWJTdHJbMV07XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsU3RyVmFpbGQoaWMpKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmludml0ZUlkID0gTnVtYmVyKGljKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uY2xpcGJvYXJkQ29udGVudCA9IGNsaXBDb250ZW50O1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNvdXJjZVR5cGUgPSAyO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+agoemqjFxyXG4gICAgcHJpdmF0ZSBkZWNvZGVDaGFubmVsSW5mbygpIHtcclxuICAgICAgICBsZXQgY2xpcENvbnRlbnQ6IHN0cmluZyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uQ2hhbm5lbEluZm87XHJcbiAgICAgICAgaWYgKGNsaXBDb250ZW50ID09IG51bGwgfHwgY2xpcENvbnRlbnQgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBzdWJTdHIgPSBjbGlwQ29udGVudC5zcGxpdChcInxcIik7XHJcbiAgICAgICAgaWYgKHN1YlN0ci5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluZm9QbGlzdFwiLCBjbGlwQ29udGVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhY2tObyA9IHN1YlN0clswXTtcclxuICAgICAgICBpZiAodGhpcy5pc0NoYW5uZWxTdHJWYWlsZChwYWNrTm8pKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmluZm9DaGFubmVsID0gTnVtYmVyKHBhY2tObyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWMgPSBzdWJTdHJbMV07XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsU3RyVmFpbGQoaWMpKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmludml0ZUlkID0gTnVtYmVyKGljKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uY2xpcGJvYXJkQ29udGVudCA9IGNsaXBDb250ZW50O1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNvdXJjZVR5cGUgPSAzO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==