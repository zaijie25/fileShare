"use strict";
cc._RF.push(module, 'f9145PzqCVJ2a4kZirTn+Hc', 'AppHelper');
// hall/scripts/logic/core/tool/AppHelper.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaiduPlatform = exports.SpecialPlatform = void 0;
//渠道包配置相关
var AppHelper = /** @class */ (function () {
    function AppHelper() {
    }
    AppHelper.init = function () {
        this.specialPlatfromList = [];
        this.specialPlatfromList.push(new BaiduPlatform());
    };
    AppHelper.getConfigUrl = function () {
        return "https://d.dtdsnt.com/";
    };
    AppHelper.formatUrl = function (url) {
        //使用正则可以匹配多个
        // url = url.replace("\[app\]", LinkParamHelper.app);
        url = url.replace(/\[ch\]/g, Global.Setting.ChannelInfo.getPlayerChannel().toString());
        url = url.replace(/\[appid\]/g, Global.Setting.appId.toString());
        // url = url.replace("\[backurl\]", encodeURI(URLDefine.getWebBackGameUrl()));
        // url = url.replace(/\[invite_code\]/g, encodeURIComponent(ToolKit.getInviteCode()[1]));
        url = url.replace(/\[invite_code\]/g, encodeURIComponent(Global.Setting.ChannelInfo.getInviteId().toString()));
        if (Global.PlayerData == null)
            return url;
        url = url.replace(/\[uid\]/g, Global.PlayerData.uid.toString());
        var tmpUrl = url;
        try {
            if (tmpUrl.indexOf("token") > -1)
                tmpUrl = tmpUrl.replace("\[token\]", encodeURIComponent(Global.PlayerData.token));
            if (url.indexOf("uname") > -1)
                tmpUrl = tmpUrl.replace("\[uname\]", encodeURIComponent(Global.PlayerData.nickname));
            url = tmpUrl;
        }
        catch (e) {
            Logger.error("encodeURIComponent error");
            Global.ReportTool.ReportClientError("formatUrlError", {
                des: "encodeURIComponent error",
                token: Global.PlayerData.token,
                nickname: Global.PlayerData.nickname,
                url: url,
            });
        }
        return url;
    };
    Object.defineProperty(AppHelper, "enableWxShare", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAiTeApp", {
        //是否支持艾特跳转
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAwakeAli", {
        //是否支持跳转支付宝
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAliPaySDK", {
        //是否支持支付宝SDK支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableWXSDK", {
        //是否支持微信SDK支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAliPayInterceptorWithUrl", {
        //是否支持支付宝h5 转native 支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAliPayAuthWithUrl", {
        //是否支持支付宝h5 授权
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAliPayCheckInstall", {
        //是否支持支付宝检测
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableForceUpdateAppInstall", {
        //是否开启强更包逻辑
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableAliPayAuthWithPayAuthInfo", {
        //是否支持支付宝通过payAuthInfo授权
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableSDKPay", {
        //是否支持新版本SDK支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableUPay", {
        //是否支持UpaySDK支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppHelper, "enableSDK", {
        //是否支持SDK支付
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    //是否是百度平台
    AppHelper.isBaiduPlatform = function () {
        return this.specialPlatfromList
            && this.specialPlatfromList[0]
            && this.specialPlatfromList[0].isTargetPlatform();
    };
    //百度登录后计时状态
    AppHelper.isBaiduSpecialState = function () {
        if (!this.isBaiduPlatform())
            return false;
        //在计时过程中 才算特殊状态
        return !this.specialPlatfromList[0].isTimeup;
    };
    AppHelper.getAppCfg = function () {
        var appid = Global.Setting.appId;
        return this.appCfg[appid];
    };
    AppHelper.getAppWXShareEnable = function () {
        if (!this.checkWxkey())
            return false;
        var cfg = this.getAppCfg();
        if (cfg == null)
            return true;
        var arr = cfg.wxShare;
        if (arr.length > 1 && arr[1] != "") {
            Global.UI.fastTip(arr[1]);
        }
        return arr[0];
    };
    AppHelper.getAppWXLoginEnable = function () {
        if (!this.checkWxkey())
            return false;
        var cfg = this.getAppCfg();
        if (cfg == null)
            return true;
        var arr = cfg.wxLogin;
        if (arr.length > 1 && arr[1] != "") {
            Global.UI.fastTip(arr[1]);
        }
        return arr[0];
    };
    AppHelper.checkPlatformWXEnable = function (isShowTips) {
        if (isShowTips === void 0) { isShowTips = true; }
        var isEnable = Global.Toolkit.checkIsPlatformShowWX();
        if (!isEnable && isShowTips) {
            Global.UI.fastTip("该版本暂不支持微信功能，请手动打开微信");
        }
        return isEnable;
    };
    //游戏是否需要过滤
    AppHelper.isFilterGame = function (gid) {
        if (!this.isBaiduPlatform())
            return false;
        var baiduPlatform = this.specialPlatfromList[0];
        if (baiduPlatform && baiduPlatform.filterGameArray.indexOf(gid) > -1)
            return true;
        return false;
    };
    AppHelper.checkWxkey = function (isShowTips) {
        if (isShowTips === void 0) { isShowTips = true; }
        // //兼容老版本
        // if(Global.Setting.SystemInfo.wxKey == null || Global.Setting.SystemInfo.wxKey == "")
        //     return true;
        if (Global.Setting.SystemInfo.bundleName == null || Global.Setting.SystemInfo.bundleName == "")
            return true;
        //服务器没有配置 暂时不处理
        if (Global.Setting.serverWxMd5 == "" || Global.Setting.serverWxMd5 == null)
            return true;
        var bundleMd5 = Global.Setting.serverAndroidIdMd5;
        if (cc.sys.platform == cc.sys.IPHONE)
            bundleMd5 = Global.Setting.serverIOSIdMd5;
        if (bundleMd5 == null || bundleMd5 == "")
            return true;
        if (Global.Toolkit.md5(Global.Setting.SystemInfo.bundleName) == bundleMd5
            && Global.Toolkit.md5(Global.Setting.SystemInfo.wxKey) == Global.Setting.serverWxMd5)
            return true;
        if (isShowTips) {
            Global.UI.fastTip("该版本暂不支持微信功能");
        }
        return false;
    };
    /**
 * 检测APPID和包渠道号是否相同   主要用于定制部分渠道包和app特殊需求
 * @param appId
 * @param channel 指定包渠道号，如果channel为空，则表示所有渠道通用
 * @param enbaleConfigChannel  是否检测config渠道号
 */
    AppHelper.checkAPPAndChannel = function (appId, channel, enbaleConfigChannel) {
        if (channel === void 0) { channel = null; }
        if (enbaleConfigChannel === void 0) { enbaleConfigChannel = false; }
        //检测
        if (Global.Setting.appId != appId)
            return false;
        if (channel != null && Number(Global.Setting.SystemInfo.packChannel) == channel)
            return true;
        if (enbaleConfigChannel && Number(Global.Setting.ChannelInfo.configChannel) == channel)
            return true;
        return false;
    };
    /**
* 检测包渠道号是否相同   主要用于定制部分渠道包和app特殊需求
* @param channel 指定包渠道号，如果channel为空，则表示所有渠道通用
* @param enbaleConfigChannel  是否检测config渠道号
*/
    AppHelper.checkChannel = function (channel, enbaleConfigChannel) {
        if (channel === void 0) { channel = null; }
        if (enbaleConfigChannel === void 0) { enbaleConfigChannel = false; }
        if (channel != null && Number(Global.Setting.SystemInfo.packChannel) == channel)
            return true;
        if (enbaleConfigChannel && Number(Global.Setting.ChannelInfo.configChannel) == channel)
            return true;
        return false;
    };
    AppHelper.onPreloadRes = function (requireList, requireAtlasList, requireSpineList) {
        for (var i = 0; i < this.specialPlatfromList.length; i++) {
            var platform = this.specialPlatfromList[i];
            if (platform.isTargetPlatform()) {
                platform.onPreloadRes(requireList, requireAtlasList, requireSpineList);
            }
        }
    };
    AppHelper.afterGetConfig = function () {
        for (var i = 0; i < this.specialPlatfromList.length; i++) {
            var platform = this.specialPlatfromList[i];
            if (platform.isTargetPlatform()) {
                platform.afterGetConfig();
            }
        }
    };
    AppHelper.afterWindowInit = function (name, node, window) {
        for (var i = 0; i < this.specialPlatfromList.length; i++) {
            var platform = this.specialPlatfromList[i];
            if (platform.isTargetPlatform()) {
                platform.afterWindowInit(name, node, window);
            }
        }
    };
    AppHelper.specialPlatfromList = [];
    //是否为提现
    AppHelper.isCash = false;
    //app平台配置，后续做为可配置
    AppHelper.appCfg = {
        1001: {
            wxLogin: [false, "体验服暂不支持微信登录"],
            wxShare: [false, "体验服暂不支持微信分享"],
        },
        1002: {
            wxLogin: [false, "体验服暂不支持微信登录"],
            wxShare: [false, "体验服暂不支持微信分享"],
        },
        1003: {
            wxLogin: [false, "体验服暂不支持微信登录"],
            wxShare: [false, "体验服暂不支持微信分享"],
        },
    };
    return AppHelper;
}());
exports.default = AppHelper;
//特殊平台定制需求
var SpecialPlatform = /** @class */ (function () {
    function SpecialPlatform() {
    }
    SpecialPlatform.prototype.getName = function () {
        return "";
    };
    SpecialPlatform.prototype.isTargetPlatform = function () {
        return false;
    };
    //预加载大厅资源调用 可以修改或者添加预加载资源。
    SpecialPlatform.prototype.onPreloadRes = function (requireList, requireAtlasList, requireSpineList) { };
    ;
    //设置好gamecfg之后  用于修改gameData，
    SpecialPlatform.prototype.afterGetConfig = function () {
    };
    //window initView之后调用，负责修改UI，重定向点击事件等
    SpecialPlatform.prototype.afterWindowInit = function (name, node, window) {
    };
    return SpecialPlatform;
}());
exports.SpecialPlatform = SpecialPlatform;
//百度渠道包  688 36渠道  798 30渠道   http://192.168.1.21/zentao/task-view-851.html
var BaiduPlatform = /** @class */ (function (_super) {
    __extends(BaiduPlatform, _super);
    function BaiduPlatform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeupState = false;
        _this.timerID = null;
        _this.filterGameArray = [7005, 2008, 1001];
        return _this;
    }
    BaiduPlatform.prototype.getName = function () {
        return "baidu";
    };
    BaiduPlatform.prototype.isTargetPlatform = function () {
        return false;
        //return AppHelper.checkAPPAndChannel(688, 36) || AppHelper.checkAPPAndChannel(798, 30);
    };
    BaiduPlatform.prototype.afterGetConfig = function () {
    };
    Object.defineProperty(BaiduPlatform.prototype, "isTimeup", {
        get: function () {
            return this.timeupState;
        },
        set: function (flag) {
            this.timeupState = flag;
            if (flag) {
                Global.Event.event(GlobalEvent.UPDATE_BAIDU_STATE);
                if (this.timerID) {
                    clearInterval(this.timerID);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    BaiduPlatform.prototype.afterWindowInit = function (name, uiNode, window) {
        if (name == "WndHall") {
            // let node = cc.find("bottomNode/tixianNode/icon", uiNode);
            // if(node == null)
            //     return;
            // let sp = node.getComponent(cc.Sprite);
            // Global.ResourceManager.loadAutoAtlas(sp,"hall/specialPlatform/baidu/atlas/baiduAtlas","dilanzi_txian");
        }
    };
    return BaiduPlatform;
}(SpecialPlatform));
exports.BaiduPlatform = BaiduPlatform;

cc._RF.pop();