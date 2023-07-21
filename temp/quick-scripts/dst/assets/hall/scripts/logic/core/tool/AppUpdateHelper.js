
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/AppUpdateHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEFwcFVwZGF0ZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOztBQUVGLDZEQUF3RDtBQUN4RCx5Q0FBb0M7QUFDcEMscUVBQWdGO0FBR2hGO0lBQUE7UUFDSSw4QkFBOEI7UUFDdEIsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLHNCQUFpQixHQUFJLElBQUksQ0FBQztRQUMxQixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLGNBQWM7SUE0U2hELENBQUM7SUF6U0csc0JBQVcsaURBQW9CO2FBSS9CO1lBQ0ksT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUE7UUFDckMsQ0FBQzthQU5ELFVBQWdDLEtBQVk7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQTtRQUN0QyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLCtDQUFrQjthQUk3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFBO1FBQ25DLENBQUM7YUFORCxVQUE4QixLQUFhO1lBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUE7UUFDcEMsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyw2Q0FBZ0I7YUFJM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQTtRQUNqQyxDQUFDO2FBTkQsVUFBNEIsSUFBUTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1FBQ2pDLENBQUM7OztPQUFBO0lBUU0sbUNBQVMsR0FBaEI7UUFDSSx1QkFBYSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLGlEQUF1QixHQUE5QixVQUErQixjQUFjO1FBQTdDLGlC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O2FBQU07WUFDSCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtZQUM1QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1lBQ3RDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUE7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyw0Q0FBa0IsR0FBMUIsVUFBMkIsZ0JBQWdCLEVBQUMsYUFBcUI7UUFBckIsOEJBQUEsRUFBQSxxQkFBcUI7UUFDN0QsT0FBTztRQUNQLElBQUksZUFBZSxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtRQUNoRSxDQUFDLENBQUE7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtRQUN2QyxJQUFJLGFBQWEsRUFBRTtZQUNmLFVBQVUsR0FBRyxlQUFlLENBQUE7WUFDNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEY7YUFBTTtZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDOUU7SUFDTCxDQUFDO0lBTUwsc0JBQUM7QUFBRCxDQWpUQSxBQWlUQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOabtOaWsOebuOWFs+mAu+i+kVxyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCBMb2FkaW5nRmFjYWRlIGZyb20gXCIuLi9sb2FkaW5nTVZDL0xvYWRpbmdGYWNhZGVcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi9BcHBIZWxwZXJcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIsIHsgUG9wV25kTmFtZSB9IGZyb20gXCIuLi8uLi9oYWxsL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFVwZGF0ZUhlbHBlciB7XHJcbiAgICAvL3RpcHNfdHlwZSDlvLnnqpfmj5DnpLogICAwIOeZu+W9leWJjSAgMeeZu+W9leWQjlxyXG4gICAgcHJpdmF0ZSBfZm9yY2VEaWFsb2dTY2VuZVR5cGUgPSAtMTtcclxuICAgIHByaXZhdGUgX2hhc1Nob3dGb3JjZURpYWxvZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfY2hlY2tWZXJzaW9uRGF0YSAgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZm9yY2VEaWFsb2dUeXBlID0gLTE7Ly8gMCDlvLrmm7QgIDEg6Z2e5by65pu0XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgZm9yY2VEaWFsb2dTY2VuZVR5cGUodmFsdWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9mb3JjZURpYWxvZ1NjZW5lVHlwZSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmb3JjZURpYWxvZ1NjZW5lVHlwZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZURpYWxvZ1NjZW5lVHlwZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaGFzU2hvd0ZvcmNlRGlhbG9nKHZhbHVlOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2hhc1Nob3dGb3JjZURpYWxvZyA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoYXNTaG93Rm9yY2VEaWFsb2coKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGFzU2hvd0ZvcmNlRGlhbG9nXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjaGVja1ZlcnNpb25EYXRhKGRhdGE6YW55KXtcclxuICAgICAgICB0aGlzLl9jaGVja1ZlcnNpb25EYXRhID0gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2hlY2tWZXJzaW9uRGF0YSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja1ZlcnNpb25EYXRhXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ29Ub0xvZ2luKCl7XHJcbiAgICAgICAgTG9hZGluZ0ZhY2FkZS5yZWxlYXNlSW5zdGFuY2UoKVxyXG4gICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIuZ29Ub0xvZ2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dMb2FkaW5nR2FtZVVwZGF0ZVVJKGFwcF9mb3JjZV90eXBlKXtcclxuICAgICAgICBsZXQgbm9Gb3JjZU5vQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmb3JjZU5vQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmdHYW1lVXBkYXRlVUkoYXBwX2ZvcmNlX3R5cGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmb3JjZVVwZGF0ZUZ1bmMgPSAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5kb3duTG9hZFVybFxyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vQ2FsbGJhY2sgPSBub0ZvcmNlTm9DYWxsYmFja1xyXG4gICAgICAgIGxldCBhdXRvQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzaG93VHlwZSA9IDE7IC8vLy8xIOS4pOS4quaMiemSriAgMiB5ZXMg5LiA5Liq5oyJ6ZKuXHJcbiAgICAgICAgaWYgKGFwcF9mb3JjZV90eXBlID09IDApIHsvL+W8uuWItuabtOaWsFxyXG4gICAgICAgICAgICBzaG93VHlwZSA9IDJcclxuICAgICAgICAgICAgbm9DYWxsYmFjayA9IGZvcmNlTm9DYWxsYmFja1xyXG4gICAgICAgICAgICBhdXRvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRHYW1lVXBkYXRlVUlcIixzaG93VHlwZSwgZm9yY2VVcGRhdGVGdW5jLCBub0NhbGxiYWNrLCBhdXRvQ2xvc2UsIGZhbHNlLHRoaXMuY2hlY2tWZXJzaW9uRGF0YS5hcHBfZm9yY2UuZGVzYyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lzU2hvd0xvZ2luVXBkYXRlRGxnKCl7XHJcbiAgICAgICAgbGV0IGRhdGEgID0gdGhpcy5fY2hlY2tWZXJzaW9uRGF0YVxyXG4gICAgICAgIGlmIChkYXRhKXtcclxuICAgICAgICAgICAgbGV0IGFwcF9mb3JjZSA9IGRhdGEuYXBwX2ZvcmNlIC8vIOW8uuabtOWtl+autVxyXG4gICAgICAgICAgICBpZiAoYXBwX2ZvcmNlKXtcclxuICAgICAgICAgICAgICAgIGxldCBhcHBfZm9yY2VfdmVyc2lvbiA9IGFwcF9mb3JjZS52ZXJzaW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgbmF0aXZlQXBwVmVyaW9uID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JjZURpYWxvZ1NjZW5lVHlwZSA9PSAxICYmIHRoaXMuaGFzU2hvd0ZvcmNlRGlhbG9nID09IGZhbHNlICYmIChHbG9iYWwuVG9vbGtpdC52ZXJzaW9uQ29tcGFyZShhcHBfZm9yY2VfdmVyc2lvbiwgbmF0aXZlQXBwVmVyaW9uKSA+IDApKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dMb2dpblVwZGF0ZURsZygpe1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNTaG93TG9naW5VcGRhdGVEbGcoKSl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja1ZlcnNpb25EYXRhKXtcclxuICAgICAgICAgICAgICAgIGxldCBhcHBfZm9yY2UgPSB0aGlzLl9jaGVja1ZlcnNpb25EYXRhLmFwcF9mb3JjZVxyXG4gICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFwcF9mb3JjZV9mb3JjZV90eXBlID0gYXBwX2ZvcmNlLmZvcmNlX3R5cGUgLy8w5by65Yi25pu05pawIDHpnZ7lvLrliLbmm7TmlrBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXBwX2ZvcmNlX3VybCA9IGFwcF9mb3JjZS51cmxcclxuICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZE1zZ0xpc3QoUG9wV25kTmFtZS5Gb3JjZVVwZGF0ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5Gb3JjZVVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9Gb3JjZU5vQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKFBvcFduZE5hbWUuRm9yY2VVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JjZU5vQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKFBvcFduZE5hbWUuRm9yY2VVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TG9naW5VcGRhdGVEbGcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JjZVVwZGF0ZUZ1bmMgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZG93bkxvYWRVcmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHBfZm9yY2VfdXJsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBhcHBfZm9yY2VfdXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9DYWxsYmFjayA9IG5vRm9yY2VOb0NhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdXRvQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd1R5cGUgPSAxOyAvLy8vMSDkuKTkuKrmjInpkq4gIDIgeWVzIOS4gOS4quaMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXBwX2ZvcmNlX2ZvcmNlX3R5cGUgPT0gMCkgey8v5by65Yi25pu05pawXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VHlwZSA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ2FsbGJhY2sgPSBmb3JjZU5vQ2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEdhbWVVcGRhdGVVSVwiLHNob3dUeXBlLCBmb3JjZVVwZGF0ZUZ1bmMsIG5vQ2FsbGJhY2ssIGF1dG9DbG9zZSwgZmFsc2UsYXBwX2ZvcmNlLmRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1Nob3dGb3JjZURpYWxvZyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2hvd0xvZ2luVXBkYXRlRGxnIGZhbHNlXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRGb3JjZVVwZGF0ZUxvZ2ljKGRhdGEpIHtcclxuICAgICAgICBpZiAoIWRhdGEpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkYXRhID09IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrVmVyc2lvbkRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGxldCBhcHBfZm9yY2UgPSBkYXRhLmFwcF9mb3JjZSAvLyDlvLrmm7TlrZfmrrVcclxuICAgICAgICBsZXQgbmF0aXZlQXBwVmVyaW9uID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uXHJcbiAgICAgICAgaWYgKGFwcF9mb3JjZSAmJiBhcHBfZm9yY2UudmVyc2lvbiAmJiAoYXBwX2ZvcmNlLnZlcnNpb24gPiAwKSAmJiBhcHBfZm9yY2UucGFja190eXBlICYmIGFwcF9mb3JjZS5wYWNrX3R5cGUgIT0gXCJcIikgeyAvL+aWsOW8uuabtOWtl+autVxyXG4gICAgICAgICAgICBsZXQgYXBwX2ZvcmNlX3ZlcnNpb24gPSBhcHBfZm9yY2UudmVyc2lvblxyXG4gICAgICAgICAgICBsZXQgYXBwX2ZvcmNlX3BhY2tfdHlwZSA9IGFwcF9mb3JjZS5wYWNrX3R5cGUgLy/ljIXnsbvlnosgIOWFqOW5s+WPsDphbGwgIOS8geS4muetvi/otoXnuqfnrb7vvJptYWluIOmprOeUsuWMhTphcHBzdG9yZSBURuWMhTp0ZXN0ZmxpZ2h0IOWNjuS4uuWMhTpodWF3ZWkgXHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVQbGF0Zm9ybSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubmF0aXZlUGxhdGZvcm1cclxuICAgICAgICAgICAgbGV0IGFwcF90aXBzX3R5cGUgPSBhcHBfZm9yY2UudGlwc190eXBlIC8vIHRpcHNfdHlwZSDlvLnnqpfmj5DnpLogICAwIOeZu+W9leWJjSAgMeeZu+W9leWQjlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFwcF90aXBzX3R5cGUgIT0gbnVsbCAmJiBhcHBfdGlwc190eXBlICE9IHVuZGVmaW5lZCAmJiBhcHBfdGlwc190eXBlICE9IFwiXCIgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VEaWFsb2dTY2VuZVR5cGUgPSBhcHBfdGlwc190eXBlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JjZURpYWxvZ1NjZW5lVHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic3RhcnRGb3JjZVVwZGF0ZUxvZ2ljIHNob3cgbG9hZGluZyB1cGRhdGUgZGxnIFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yik5pat5YyF57G75Z6LXHJcbiAgICAgICAgICAgIGlmIChhcHBfZm9yY2VfcGFja190eXBlICE9IFwiYWxsXCIgJiYgbmF0aXZlUGxhdGZvcm0gIT0gYXBwX2ZvcmNlX3BhY2tfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+WIpOaWreeJiOacrOWPt1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQudmVyc2lvbkNvbXBhcmUoYXBwX2ZvcmNlX3ZlcnNpb24sIG5hdGl2ZUFwcFZlcmlvbikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBmb3JjZV91cGRhdGVfdXJsID0gZGF0YS5mb3JjZV91cGRhdGVfdXJsIC8v5by65pu055qE5a6Y572R5LiL6L295Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBsZXQgYXBwX2ZvcmNlID0gZGF0YS5hcHBfZm9yY2UgLy8g5by65pu05a2X5q61XHJcbiAgICAgICAgICAgICAgICBsZXQgYXBwX2ZvcmNlX3VybCA9IGFwcF9mb3JjZS51cmwgLy/lvLrmm7TnmoTkuIvovb3lnLDlnYDvvIzljIXkuIvovb3nsbvlnovvvJpBbmRyb2lkIOaYr0Fwa+WcsOWdgO+8jElPUyDmmK9wbGlzdOWcsOWdgCAg6JC95Zyw6aG177ya5YyF5LiL6L296aG15Zyw5Z2AXHJcbiAgICAgICAgICAgICAgICBsZXQgYXBwX2ZvcmNlX2ZvcmNlX3R5cGUgPSBhcHBfZm9yY2UuZm9yY2VfdHlwZSAvLzDlvLrliLbmm7TmlrAgMemdnuW8uuWItuabtOaWsFxyXG4gICAgICAgICAgICAgICAgbGV0IGFwcF9mb3JjZV9kZXNjID0gYXBwX2ZvcmNlLmRlc2MgLy/mm7TmlrDor7TmmI5cclxuICAgICAgICAgICAgICAgIGxldCBhcHBfZm9yY2VfdXJsX3R5cGUgPSBhcHBfZm9yY2UudXJsX3R5cGUgLy/kuIvovb3lnLDlnYDnsbvlnosgIDAg5YyF5LiL6L295Zyw5Z2AIDEg6JC95Zyw6aG1XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZUZvcmNlVXBkYXRlQXBwSW5zdGFsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub0ZvcmNlTm9DYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvTG9naW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcmNlTm9DYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nu6fnu63or7fmsYJjaGVja3ZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEZvcmNlVXBkYXRlTG9naWMoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub0NhbGxiYWNrID0gbm9Gb3JjZU5vQ2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXV0b0Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd1R5cGUgPSAxOyAvLy8vMSDkuKTkuKrmjInpkq4gIDIgeWVzIOS4gOS4quaMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0ZvcmNlVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZV9mb3JjZV90eXBlID09IDApIHsvL+W8uuWItuabtOaWsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93VHlwZSA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9DYWxsYmFjayA9IGZvcmNlTm9DYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JjZVVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHBfZm9yY2VfZGVzYyA9PSBudWxsIHx8IGFwcF9mb3JjZV9kZXNjID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcF9mb3JjZV9kZXNjID0gXCLmnInmlrDniYjmnKzmm7TmlrDvvIzor7fljYfnuqfvvIFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZV91cmxfdHlwZSA9PSAwKSB7Ly8wIOWMheS4i+i9veWcsOWdgFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2lnbk1kNSA9IEdsb2JhbC5Ub29sa2l0Lm1kNShHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFNpZ24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ25NZDUgPT0gR2xvYmFsLlNldHRpbmcuc2VydmVySU9TQ2VydE1kNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHBfZm9yY2VfdXJsICYmIGFwcF9mb3JjZV91cmwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lvcyDkuIvovb1wbGlzdOaWh+S7tuW5tuabtOaWsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9yY2VVcGRhdGVGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmhvdFVwZGF0ZUlQQShhcHBfZm9yY2VfdXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcHBfZm9yY2VfZm9yY2VfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChhcHBfZm9yY2VfZGVzYywgZm9yY2VVcGRhdGVGdW5jLCBub0NhbGxiYWNrLCBhdXRvQ2xvc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goYXBwX2ZvcmNlX2Rlc2MsIGZvcmNlVXBkYXRlRnVuYywgbm9DYWxsYmFjaywgYXV0b0Nsb3NlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlX3VwZGF0ZV91cmwgJiYgZm9yY2VfdXBkYXRlX3VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JjZVVwZGF0ZVduZChmb3JjZV91cGRhdGVfdXJsLGlzRm9yY2VVcGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VfdXBkYXRlX3VybCAmJiBmb3JjZV91cGRhdGVfdXJsICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lvLnmoYbmj5DnpLrliKDpmaTmnKzlnLBBcHDlkI7lho3ljYfnuqdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcmNlVXBkYXRlRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGZvcmNlX3VwZGF0ZV91cmwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcF9mb3JjZV9kZXNjID0gXCLmnInmlrDniYjmnKzmm7TmlrDvvIzor7fljbjovb1BcHDlkI7ph43mlrDkuIvovb3vvIFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXBwX2ZvcmNlX2ZvcmNlX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goYXBwX2ZvcmNlX2Rlc2MsIGZvcmNlVXBkYXRlRnVuYywgbm9DYWxsYmFjaywgYXV0b0Nsb3NlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KGFwcF9mb3JjZV9kZXNjLCBmb3JjZVVwZGF0ZUZ1bmMsIG5vQ2FsbGJhY2ssIGF1dG9DbG9zZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZV91cmwgJiYgYXBwX2ZvcmNlX3VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BbmRyb2lk5LiL6L29QXBr5paH5Lu25bm25pu05pawXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHllc0NhbGxiYWNrID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREb3duTG9hZEFwa1VJXCIsIGFwcF9mb3JjZV9kZXNjLCBzaG93VHlwZSwgYXBwX2ZvcmNlX3VybCwgeWVzQ2FsbGJhY2ssIG5vQ2FsbGJhY2ssIGF1dG9DbG9zZSwgZmFsc2UpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VfdXBkYXRlX3VybCAmJiBmb3JjZV91cGRhdGVfdXJsICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9yY2VVcGRhdGVXbmQoZm9yY2VfdXBkYXRlX3VybCxpc0ZvcmNlVXBkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhcHBfZm9yY2VfdXJsX3R5cGUgPT0gMSkgey8vIDHokL3lnLDpobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZV91cmwgJiYgYXBwX2ZvcmNlX3VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9yY2VVcGRhdGVGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGFwcF9mb3JjZV91cmwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF1dG9DbG9zZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd1R5cGUgPSAxOyAvLy8vMSDkuKTkuKrmjInpkq4gIDIgeWVzIOS4gOS4quaMiemSrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFwcF9mb3JjZV9mb3JjZV90eXBlID09IDApIHsvL+W8uuWItuabtOaWsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUeXBlID0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQ2FsbGJhY2sgPSBmb3JjZU5vQ2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kR2FtZVVwZGF0ZVVJXCIsc2hvd1R5cGUsIGZvcmNlVXBkYXRlRnVuYywgbm9DYWxsYmFjaywgYXV0b0Nsb3NlLCBmYWxzZSxhcHBfZm9yY2VfZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2VfdXBkYXRlX3VybCAmJiBmb3JjZV91cGRhdGVfdXJsICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JjZVVwZGF0ZVduZChmb3JjZV91cGRhdGVfdXJsLGlzRm9yY2VVcGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlX3VwZGF0ZV91cmwgJiYgZm9yY2VfdXBkYXRlX3VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZvcmNlVXBkYXRlV25kKGZvcmNlX3VwZGF0ZV91cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZvcmNlX3VwZGF0ZV91cmwgPSBkYXRhLmZvcmNlX3VwZGF0ZV91cmxcclxuICAgICAgICAgICAgbGV0IGZvcmNlX3ZlcnNpb24gPSBkYXRhLmZvcmNlX3ZlcnNpb25cclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5Ub29sa2l0LnZlcnNpb25Db21wYXJlKGZvcmNlX3ZlcnNpb24sIG5hdGl2ZUFwcFZlcmlvbikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JjZVVwZGF0ZVduZChmb3JjZV91cGRhdGVfdXJsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dGb3JjZVVwZGF0ZVduZChmb3JjZV91cGRhdGVfdXJsLGlzRm9yY2VVcGRhdGUgPSBmYWxzZSkge1xyXG4gICAgICAgIC8v6LWw5by65pu05rWB56iLXHJcbiAgICAgICAgbGV0IGZvcmNlVXBkYXRlRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwoZm9yY2VfdXBkYXRlX3VybCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICBsZXQgZm9yY2VfdXBkYXRlX2RlYyA9IFwi5pyJ5paw54mI5pys5pu05paw77yM6K+36YeN5paw5LiL6L295ri45oiPXCJcclxuICAgICAgICBpZiAoaXNGb3JjZVVwZGF0ZSkge1xyXG4gICAgICAgICAgICBub0NhbGxiYWNrID0gZm9yY2VVcGRhdGVGdW5jXHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KGZvcmNlX3VwZGF0ZV9kZWMsIGZvcmNlVXBkYXRlRnVuYywgbm9DYWxsYmFjaywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KGZvcmNlX3VwZGF0ZV9kZWMsIGZvcmNlVXBkYXRlRnVuYywgbm9DYWxsYmFjaywgdHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==