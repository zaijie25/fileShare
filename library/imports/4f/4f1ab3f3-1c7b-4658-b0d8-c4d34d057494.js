"use strict";
cc._RF.push(module, '4f1abPzHHtGWLDYxNNNBXSU', 'AppUpdateHelper');
// hall/scripts/logic/core/tool/AppUpdateHelper.ts

"use strict";
/**
 * 更新相关逻辑
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingFacade_1 = require("../loadingMVC/LoadingFacade");
var AppHelper_1 = require("./AppHelper");
var HallPopMsgHelper_1 = require("../../hall/tool/HallPopMsgHelper");
var AppUpdateHelper = /** @class */ (function () {
    function AppUpdateHelper() {
        //tips_type 弹窗提示   0 登录前  1登录后
        this._forceDialogSceneType = -1;
        this._hasShowForceDialog = false;
        this._checkVersionData = null;
        this._forceDialogType = -1; // 0 强更  1 非强更
    }
    Object.defineProperty(AppUpdateHelper.prototype, "forceDialogSceneType", {
        get: function () {
            return this._forceDialogSceneType;
        },
        set: function (value) {
            this._forceDialogSceneType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppUpdateHelper.prototype, "hasShowForceDialog", {
        get: function () {
            return this._hasShowForceDialog;
        },
        set: function (value) {
            this._hasShowForceDialog = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppUpdateHelper.prototype, "checkVersionData", {
        get: function () {
            return this._checkVersionData;
        },
        set: function (data) {
            this._checkVersionData = data;
        },
        enumerable: false,
        configurable: true
    });
    AppUpdateHelper.prototype.goToLogin = function () {
        LoadingFacade_1.default.releaseInstance();
        Global.SceneManager.goToLogin();
    };
    AppUpdateHelper.prototype.showLoadingGameUpdateUI = function (app_force_type) {
        var _this = this;
        var noForceNoCallback = function () {
            _this.goToLogin();
        };
        var forceNoCallback = function () {
            _this.showLoadingGameUpdateUI(app_force_type);
        };
        var forceUpdateFunc = function () {
            var url = Global.Setting.Urls.downLoadUrl;
            cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
        };
        var noCallback = noForceNoCallback;
        var autoClose = true;
        var showType = 1; ////1 两个按钮  2 yes 一个按钮
        if (app_force_type == 0) { //强制更新
            showType = 2;
            noCallback = forceNoCallback;
            autoClose = false;
        }
        Global.UI.show("WndGameUpdateUI", showType, forceUpdateFunc, noCallback, autoClose, false, this.checkVersionData.app_force.desc);
    };
    AppUpdateHelper.prototype.checkIsShowLoginUpdateDlg = function () {
        var data = this._checkVersionData;
        if (data) {
            var app_force = data.app_force; // 强更字段
            if (app_force) {
                var app_force_version = app_force.version;
                var nativeAppVerion = Global.Setting.SystemInfo.appVersion;
                if (this.forceDialogSceneType == 1 && this.hasShowForceDialog == false && (Global.Toolkit.versionCompare(app_force_version, nativeAppVerion) > 0)) {
                    return true;
                }
            }
        }
        return false;
    };
    AppUpdateHelper.prototype.showLoginUpdateDlg = function () {
        var _this = this;
        if (this.checkIsShowLoginUpdateDlg()) {
            if (this._checkVersionData) {
                var app_force_1 = this._checkVersionData.app_force;
                if (app_force_1) {
                    var app_force_force_type_1 = app_force_1.force_type; //0强制更新 1非强制更新
                    var app_force_url_1 = app_force_1.url;
                    HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.ForceUpdate, function () {
                        HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.ForceUpdate);
                        var noForceNoCallback = function () {
                            HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.ForceUpdate);
                        };
                        var forceNoCallback = function () {
                            HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.ForceUpdate);
                            _this.showLoginUpdateDlg();
                        };
                        var forceUpdateFunc = function () {
                            var url = Global.Setting.Urls.downLoadUrl;
                            if (app_force_url_1) {
                                url = app_force_url_1;
                            }
                            cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                        };
                        var noCallback = noForceNoCallback;
                        var autoClose = true;
                        var showType = 1; ////1 两个按钮  2 yes 一个按钮
                        if (app_force_force_type_1 == 0) { //强制更新
                            showType = 2;
                            noCallback = forceNoCallback;
                            autoClose = false;
                        }
                        Global.UI.show("WndGameUpdateUI", showType, forceUpdateFunc, noCallback, autoClose, false, app_force_1.desc);
                        _this.hasShowForceDialog = true;
                    });
                }
            }
        }
        else {
            Logger.error("showLoginUpdateDlg false");
        }
    };
    AppUpdateHelper.prototype.startForceUpdateLogic = function (data) {
        var _this = this;
        if (!data) {
            Logger.error("data == null");
            return false;
        }
        this.checkVersionData = data;
        var app_force = data.app_force; // 强更字段
        var nativeAppVerion = Global.Setting.SystemInfo.appVersion;
        if (app_force && app_force.version && (app_force.version > 0) && app_force.pack_type && app_force.pack_type != "") { //新强更字段
            var app_force_version = app_force.version;
            var app_force_pack_type = app_force.pack_type; //包类型  全平台:all  企业签/超级签：main 马甲包:appstore TF包:testflight 华为包:huawei 
            var nativePlatform = Global.Setting.SystemInfo.nativePlatform;
            var app_tips_type = app_force.tips_type; // tips_type 弹窗提示   0 登录前  1登录后
            if (app_tips_type != null && app_tips_type != undefined && app_tips_type != "") {
                this.forceDialogSceneType = app_tips_type;
                if (this.forceDialogSceneType == 1) {
                    return false;
                }
                else {
                    Logger.error("startForceUpdateLogic show loading update dlg ");
                }
            }
            //判断包类型
            if (app_force_pack_type != "all" && nativePlatform != app_force_pack_type) {
                return false;
            }
            //判断版本号
            if (Global.Toolkit.versionCompare(app_force_version, nativeAppVerion) > 0) {
                var force_update_url_1 = data.force_update_url; //强更的官网下载地址
                var app_force_2 = data.app_force; // 强更字段
                var app_force_url_2 = app_force_2.url; //强更的下载地址，包下载类型：Android 是Apk地址，IOS 是plist地址  落地页：包下载页地址
                var app_force_force_type = app_force_2.force_type; //0强制更新 1非强制更新
                var app_force_desc = app_force_2.desc; //更新说明
                var app_force_url_type = app_force_2.url_type; //下载地址类型  0 包下载地址 1 落地页
                if (AppHelper_1.default.enableForceUpdateAppInstall) {
                    var noForceNoCallback = function () {
                        _this.goToLogin();
                    };
                    var forceNoCallback = function () {
                        //继续请求checkversion
                        _this.startForceUpdateLogic(data);
                    };
                    var noCallback = noForceNoCallback;
                    var autoClose = true;
                    var showType = 1; ////1 两个按钮  2 yes 一个按钮
                    var isForceUpdate = false;
                    if (app_force_force_type == 0) { //强制更新
                        showType = 2;
                        noCallback = forceNoCallback;
                        autoClose = false;
                        isForceUpdate = true;
                    }
                    if (app_force_desc == null || app_force_desc === "") {
                        app_force_desc = "有新版本更新，请升级！";
                    }
                    if (app_force_url_type == 0) { //0 包下载地址
                        if (cc.sys.os === cc.sys.OS_IOS) {
                            var signMd5 = Global.Toolkit.md5(Global.Setting.SystemInfo.appSign);
                            if (signMd5 == Global.Setting.serverIOSCertMd5) {
                                if (app_force_url_2 && app_force_url_2 != "") {
                                    //ios 下载plist文件并更新
                                    var forceUpdateFunc = function () {
                                        Global.NativeEvent.hotUpdateIPA(app_force_url_2);
                                    };
                                    if (app_force_force_type == 0) {
                                        Global.UI.showSingleBox(app_force_desc, forceUpdateFunc, noCallback, autoClose, false);
                                    }
                                    else {
                                        Global.UI.showYesNoBox(app_force_desc, forceUpdateFunc, noCallback, autoClose);
                                    }
                                }
                                else {
                                    if (force_update_url_1 && force_update_url_1 != "") {
                                        this.showForceUpdateWnd(force_update_url_1, isForceUpdate);
                                    }
                                    else {
                                        return false;
                                    }
                                }
                            }
                            else {
                                if (force_update_url_1 && force_update_url_1 != "") {
                                    //弹框提示删除本地App后再升级
                                    var forceUpdateFunc = function () {
                                        cc.sys.openURL(Global.Toolkit.DealWithUrl(force_update_url_1));
                                    };
                                    app_force_desc = "有新版本更新，请卸载App后重新下载！";
                                    if (app_force_force_type == 0) {
                                        Global.UI.showSingleBox(app_force_desc, forceUpdateFunc, noCallback, autoClose, false);
                                    }
                                    else {
                                        Global.UI.showYesNoBox(app_force_desc, forceUpdateFunc, noCallback, autoClose);
                                    }
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else if (cc.sys.os === cc.sys.OS_ANDROID) {
                            if (app_force_url_2 && app_force_url_2 != "") {
                                //Android下载Apk文件并更新
                                var yesCallback = function () {
                                };
                                Global.UI.show("WndDownLoadApkUI", app_force_desc, showType, app_force_url_2, yesCallback, noCallback, autoClose, false);
                            }
                            else {
                                if (force_update_url_1 && force_update_url_1 != "") {
                                    this.showForceUpdateWnd(force_update_url_1, isForceUpdate);
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                    else if (app_force_url_type == 1) { // 1落地页
                        if (app_force_url_2 && app_force_url_2 != "") {
                            var forceUpdateFunc = function () {
                                cc.sys.openURL(Global.Toolkit.DealWithUrl(app_force_url_2));
                            };
                            var autoClose_1 = true;
                            var showType_1 = 1; ////1 两个按钮  2 yes 一个按钮
                            if (app_force_force_type == 0) { //强制更新
                                showType_1 = 2;
                                noCallback = forceNoCallback;
                                autoClose_1 = false;
                            }
                            Global.UI.show("WndGameUpdateUI", showType_1, forceUpdateFunc, noCallback, autoClose_1, false, app_force_desc);
                        }
                        else {
                            if (force_update_url_1 && force_update_url_1 != "") {
                                this.showForceUpdateWnd(force_update_url_1, isForceUpdate);
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
                else {
                    if (force_update_url_1 && force_update_url_1 != "") {
                        this.showForceUpdateWnd(force_update_url_1);
                    }
                    else {
                        return false;
                    }
                }
                return true;
            }
        }
        else {
            var force_update_url = data.force_update_url;
            var force_version = data.force_version;
            if (Global.Toolkit.versionCompare(force_version, nativeAppVerion) > 0) {
                this.showForceUpdateWnd(force_update_url);
                return true;
            }
        }
        return false;
    };
    AppUpdateHelper.prototype.showForceUpdateWnd = function (force_update_url, isForceUpdate) {
        if (isForceUpdate === void 0) { isForceUpdate = false; }
        //走强更流程
        var forceUpdateFunc = function () {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(force_update_url));
        };
        var noCallback = null;
        var force_update_dec = "有新版本更新，请重新下载游戏";
        if (isForceUpdate) {
            noCallback = forceUpdateFunc;
            Global.UI.showSingleBox(force_update_dec, forceUpdateFunc, noCallback, false, false);
        }
        else {
            Global.UI.showYesNoBox(force_update_dec, forceUpdateFunc, noCallback, true);
        }
    };
    return AppUpdateHelper;
}());
exports.default = AppUpdateHelper;

cc._RF.pop();