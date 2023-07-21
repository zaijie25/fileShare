
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/AppHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEFwcEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsU0FBUztBQUNUO0lBQUE7SUFtVEEsQ0FBQztJQTNTaUIsY0FBSSxHQUFsQjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUE7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFFdkQsQ0FBQztJQUVhLHNCQUFZLEdBQTFCO1FBQ0ksT0FBUSx1QkFBdUIsQ0FBQztJQUNwQyxDQUFDO0lBR2EsbUJBQVMsR0FBdkIsVUFBd0IsR0FBVTtRQUU5QixZQUFZO1FBQ1oscURBQXFEO1FBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkYsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsOEVBQThFO1FBQzlFLHlGQUF5RjtRQUN6RixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0csSUFBRyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUk7WUFDeEIsT0FBTyxHQUFHLENBQUM7UUFDZixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxF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V0FBVyxHQUFHLElBQUksQ0FBQTtZQUN2QixJQUFHLElBQUksRUFDUDtnQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbkQsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUNmO29CQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBQzlCO2FBQ0o7UUFDTCxDQUFDOzs7T0FiQTtJQWVNLHVDQUFlLEdBQXRCLFVBQXVCLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtRQUV2QyxJQUFHLElBQUksSUFBSSxTQUFTLEVBQ3BCO1lBQ0ksNERBQTREO1lBQzVELG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QseUNBQXlDO1lBQ3pDLDBHQUEwRztTQUM3RztJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBdERBLEFBc0RDLENBdERrQyxlQUFlLEdBc0RqRDtBQXREWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDdXN0b21BcHBJbmZvIGZyb20gXCIuLi8uLi9oYWxsY29tbW9uL2FwcC9DdXN0b21BcHBcIjtcclxuaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcblxyXG5cclxuLy/muKDpgZPljIXphY3nva7nm7jlhbNcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSGVscGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2ZnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3BlY2lhbFBsYXRmcm9tTGlzdDogQmFpZHVQbGF0Zm9ybVtdID0gW11cclxuXHJcbiAgIFxyXG4gICAgLy/mmK/lkKbkuLrmj5DnjrBcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNDYXNoOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5zcGVjaWFsUGxhdGZyb21MaXN0LnB1c2gobmV3IEJhaWR1UGxhdGZvcm0oKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDb25maWdVcmwoKXtcclxuICAgICAgICByZXR1cm4gIFwiaHR0cHM6Ly9kLmR0ZHNudC5jb20vXCI7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdFVybCh1cmw6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIC8v5L2/55So5q2j5YiZ5Y+v5Lul5Yy56YWN5aSa5LiqXHJcbiAgICAgICAgLy8gdXJsID0gdXJsLnJlcGxhY2UoXCJcXFthcHBcXF1cIiwgTGlua1BhcmFtSGVscGVyLmFwcCk7XHJcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcW2NoXFxdL2csIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmdldFBsYXllckNoYW5uZWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxbYXBwaWRcXF0vZywgR2xvYmFsLlNldHRpbmcuYXBwSWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgLy8gdXJsID0gdXJsLnJlcGxhY2UoXCJcXFtiYWNrdXJsXFxdXCIsIGVuY29kZVVSSShVUkxEZWZpbmUuZ2V0V2ViQmFja0dhbWVVcmwoKSkpO1xyXG4gICAgICAgIC8vIHVybCA9IHVybC5yZXBsYWNlKC9cXFtpbnZpdGVfY29kZVxcXS9nLCBlbmNvZGVVUklDb21wb25lbnQoVG9vbEtpdC5nZXRJbnZpdGVDb2RlKClbMV0pKTtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxbaW52aXRlX2NvZGVcXF0vZywgZW5jb2RlVVJJQ29tcG9uZW50KEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmdldEludml0ZUlkKCkudG9TdHJpbmcoKSkpO1xyXG5cclxuICAgICAgICBpZihHbG9iYWwuUGxheWVyRGF0YSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXFt1aWRcXF0vZywgR2xvYmFsLlBsYXllckRhdGEudWlkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGxldCB0bXBVcmwgPSB1cmw7XHJcbiAgICAgICAgdHJ5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0bXBVcmwuaW5kZXhPZihcInRva2VuXCIpID4gLSAxKVxyXG4gICAgICAgICAgICAgICAgdG1wVXJsID0gdG1wVXJsLnJlcGxhY2UoXCJcXFt0b2tlblxcXVwiLCBlbmNvZGVVUklDb21wb25lbnQoIEdsb2JhbC5QbGF5ZXJEYXRhLnRva2VuKSk7XHJcbiAgICAgICAgICAgIGlmKHVybC5pbmRleE9mKFwidW5hbWVcIikgPiAtMSlcclxuICAgICAgICAgICAgICAgIHRtcFVybCA9IHRtcFVybC5yZXBsYWNlKFwiXFxbdW5hbWVcXF1cIiwgZW5jb2RlVVJJQ29tcG9uZW50KEdsb2JhbC5QbGF5ZXJEYXRhLm5pY2tuYW1lKSk7XHJcbiAgICAgICAgICAgIHVybCA9IHRtcFVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImVuY29kZVVSSUNvbXBvbmVudCBlcnJvclwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoXCJmb3JtYXRVcmxFcnJvclwiLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzOlwiZW5jb2RlVVJJQ29tcG9uZW50IGVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICB0b2tlbjpHbG9iYWwuUGxheWVyRGF0YS50b2tlbixcclxuICAgICAgICAgICAgICAgIG5pY2tuYW1lOkdsb2JhbC5QbGF5ZXJEYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgdXJsOnVybCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5hYmxlV3hTaGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuaUr+aMgeiJvueJuei3s+i9rFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5hYmxlQWlUZUFwcCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKbmlK/mjIHot7PovazmlK/ku5jlrp1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZUF3YWtlQWxpKCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mmK/lkKbmlK/mjIHmlK/ku5jlrp1TREvmlK/ku5hcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZUFsaVBheVNESygpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpuaUr+aMgeW+ruS/oVNES+aUr+S7mFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5hYmxlV1hTREsoKXtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbmlK/mjIHmlK/ku5jlrp1oNSDovaxuYXRpdmUg5pSv5LuYXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBlbmFibGVBbGlQYXlJbnRlcmNlcHRvcldpdGhVcmwoKXtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5pSv5oyB5pSv5LuY5a6daDUg5o6I5p2DXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBlbmFibGVBbGlQYXlBdXRoV2l0aFVybCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKbmlK/mjIHmlK/ku5jlrp3mo4DmtYtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKblvIDlkK/lvLrmm7TljIXpgLvovpFcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZUZvcmNlVXBkYXRlQXBwSW5zdGFsbCgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKbmlK/mjIHmlK/ku5jlrp3pgJrov4dwYXlBdXRoSW5mb+aOiOadg1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5hYmxlQWxpUGF5QXV0aFdpdGhQYXlBdXRoSW5mbygpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmK/lkKbmlK/mjIHmlrDniYjmnKxTREvmlK/ku5hcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZVNES1BheSgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpuaUr+aMgVVwYXlTREvmlK/ku5hcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZVVQYXkoKXtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbmlK/mjIFTREvmlK/ku5hcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuYWJsZVNESygpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICAvL2FwcOW5s+WPsOmFjee9ru+8jOWQjue7reWBmuS4uuWPr+mFjee9rlxyXG4gICAgcHVibGljIHN0YXRpYyBhcHBDZmcgPSBcclxuICAgIHtcclxuICAgICAgICAxMDAxOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd3hMb2dpbjpbZmFsc2UsIFwi5L2T6aqM5pyN5pqC5LiN5pSv5oyB5b6u5L+h55m75b2VXCJdLFxyXG4gICAgICAgICAgICB3eFNoYXJlOltmYWxzZSwgXCLkvZPpqozmnI3mmoLkuI3mlK/mjIHlvq7kv6HliIbkuqtcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxMDAyOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd3hMb2dpbjpbZmFsc2UsIFwi5L2T6aqM5pyN5pqC5LiN5pSv5oyB5b6u5L+h55m75b2VXCJdLFxyXG4gICAgICAgICAgICB3eFNoYXJlOltmYWxzZSwgXCLkvZPpqozmnI3mmoLkuI3mlK/mjIHlvq7kv6HliIbkuqtcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxMDAzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd3hMb2dpbjpbZmFsc2UsIFwi5L2T6aqM5pyN5pqC5LiN5pSv5oyB5b6u5L+h55m75b2VXCJdLFxyXG4gICAgICAgICAgICB3eFNoYXJlOltmYWxzZSwgXCLkvZPpqozmnI3mmoLkuI3mlK/mjIHlvq7kv6HliIbkuqtcIl0sXHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpuaYr+eZvuW6puW5s+WPsFxyXG4gICAgcHVibGljIHN0YXRpYyBpc0JhaWR1UGxhdGZvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwZWNpYWxQbGF0ZnJvbUxpc3QgXHJcbiAgICAgICAgICAgICYmIHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdFswXSBcclxuICAgICAgICAgICAgJiYgdGhpcy5zcGVjaWFsUGxhdGZyb21MaXN0WzBdLmlzVGFyZ2V0UGxhdGZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eZvuW6pueZu+W9leWQjuiuoeaXtueKtuaAgVxyXG4gICAgcHVibGljIHN0YXRpYyBpc0JhaWR1U3BlY2lhbFN0YXRlKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5pc0JhaWR1UGxhdGZvcm0oKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8v5Zyo6K6h5pe26L+H56iL5LitIOaJjeeul+eJueauiueKtuaAgVxyXG4gICAgICAgIHJldHVybiAhdGhpcy5zcGVjaWFsUGxhdGZyb21MaXN0WzBdLmlzVGltZXVwO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRBcHBDZmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBhcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcENmZ1thcHBpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRBcHBXWFNoYXJlRW5hYmxlKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5jaGVja1d4a2V5KCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgY2ZnID0gdGhpcy5nZXRBcHBDZmcoKTtcclxuICAgICAgICBpZihjZmcgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgbGV0IGFyciA9IGNmZy53eFNoYXJlO1xyXG4gICAgICAgIGlmKGFyci5sZW5ndGggPiAxICYmIGFyclsxXSAhPSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoYXJyWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyclswXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEFwcFdYTG9naW5FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrV3hrZXkoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBjZmcgPSB0aGlzLmdldEFwcENmZygpO1xyXG4gICAgICAgIGlmKGNmZyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBsZXQgYXJyID0gY2ZnLnd4TG9naW47XHJcbiAgICAgICAgaWYoYXJyLmxlbmd0aCA+IDEgJiYgYXJyWzFdICE9IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChhcnJbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tQbGF0Zm9ybVdYRW5hYmxlKGlzU2hvd1RpcHMgPSB0cnVlKXtcclxuICAgICAgICBsZXQgaXNFbmFibGUgPSBHbG9iYWwuVG9vbGtpdC5jaGVja0lzUGxhdGZvcm1TaG93V1goKVxyXG4gICAgICAgIGlmICghaXNFbmFibGUgJiYgaXNTaG93VGlwcyl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+l54mI5pys5pqC5LiN5pSv5oyB5b6u5L+h5Yqf6IO977yM6K+35omL5Yqo5omT5byA5b6u5L+hXCIpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW5hYmxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+a4uOaIj+aYr+WQpumcgOimgei/h+a7pFxyXG4gICAgcHVibGljIHN0YXRpYyBpc0ZpbHRlckdhbWUoZ2lkKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzQmFpZHVQbGF0Zm9ybSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IGJhaWR1UGxhdGZvcm0gPSB0aGlzLnNwZWNpYWxQbGF0ZnJvbUxpc3RbMF07XHJcbiAgICAgICAgaWYoYmFpZHVQbGF0Zm9ybSAmJiBiYWlkdVBsYXRmb3JtLmZpbHRlckdhbWVBcnJheS5pbmRleE9mKGdpZCkgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrV3hrZXkoaXNTaG93VGlwcyA9IHRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gLy/lhbzlrrnogIHniYjmnKxcclxuICAgICAgICAvLyBpZihHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnd4S2V5ID09IG51bGwgfHwgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby53eEtleSA9PSBcIlwiKVxyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmJ1bmRsZU5hbWUgPT0gbnVsbCB8fCBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmJ1bmRsZU5hbWUgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy/mnI3liqHlmajmsqHmnInphY3nva4g5pqC5pe25LiN5aSE55CGXHJcbiAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuc2VydmVyV3hNZDUgPT0gXCJcIiB8fCBHbG9iYWwuU2V0dGluZy5zZXJ2ZXJXeE1kNSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBsZXQgYnVuZGxlTWQ1ID0gR2xvYmFsLlNldHRpbmcuc2VydmVyQW5kcm9pZElkTWQ1O1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuSVBIT05FKVxyXG4gICAgICAgICAgICBidW5kbGVNZDUgPSBHbG9iYWwuU2V0dGluZy5zZXJ2ZXJJT1NJZE1kNTtcclxuICAgICAgICBpZihidW5kbGVNZDUgPT0gbnVsbCB8fCBidW5kbGVNZDUgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYoR2xvYmFsLlRvb2xraXQubWQ1KEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYnVuZGxlTmFtZSkgPT0gYnVuZGxlTWQ1XHJcbiAgICAgICAgJiYgR2xvYmFsLlRvb2xraXQubWQ1KEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ud3hLZXkpID09IEdsb2JhbC5TZXR0aW5nLnNlcnZlcld4TWQ1KVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNTaG93VGlwcyl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+l54mI5pys5pqC5LiN5pSv5oyB5b6u5L+h5Yqf6IO9XCIpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIOajgOa1i0FQUElE5ZKM5YyF5rig6YGT5Y+35piv5ZCm55u45ZCMICAg5Li76KaB55So5LqO5a6a5Yi26YOo5YiG5rig6YGT5YyF5ZKMYXBw54m55q6K6ZyA5rGCXHJcbiAgICAgKiBAcGFyYW0gYXBwSWQgXHJcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCDmjIflrprljIXmuKDpgZPlj7fvvIzlpoLmnpxjaGFubmVs5Li656m677yM5YiZ6KGo56S65omA5pyJ5rig6YGT6YCa55SoXHJcbiAgICAgKiBAcGFyYW0gZW5iYWxlQ29uZmlnQ2hhbm5lbCAg5piv5ZCm5qOA5rWLY29uZmln5rig6YGT5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tBUFBBbmRDaGFubmVsKGFwcElkLCBjaGFubmVsID0gbnVsbCwgZW5iYWxlQ29uZmlnQ2hhbm5lbCA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIC8v5qOA5rWLXHJcbiAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuYXBwSWQgIT0gYXBwSWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZihjaGFubmVsICE9IG51bGwgJiYgTnVtYmVyKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ucGFja0NoYW5uZWwpID09IGNoYW5uZWwpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmKGVuYmFsZUNvbmZpZ0NoYW5uZWwgJiYgTnVtYmVyKEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmNvbmZpZ0NoYW5uZWwpID09IGNoYW5uZWwpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICog5qOA5rWL5YyF5rig6YGT5Y+35piv5ZCm55u45ZCMICAg5Li76KaB55So5LqO5a6a5Yi26YOo5YiG5rig6YGT5YyF5ZKMYXBw54m55q6K6ZyA5rGCXHJcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCDmjIflrprljIXmuKDpgZPlj7fvvIzlpoLmnpxjaGFubmVs5Li656m677yM5YiZ6KGo56S65omA5pyJ5rig6YGT6YCa55SoXHJcbiAgICAgKiBAcGFyYW0gZW5iYWxlQ29uZmlnQ2hhbm5lbCAg5piv5ZCm5qOA5rWLY29uZmln5rig6YGT5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tDaGFubmVsKGNoYW5uZWwgPSBudWxsLCBlbmJhbGVDb25maWdDaGFubmVsID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hhbm5lbCAhPSBudWxsICYmIE51bWJlcihHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnBhY2tDaGFubmVsKSA9PSBjaGFubmVsKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZihlbmJhbGVDb25maWdDaGFubmVsICYmIE51bWJlcihHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5jb25maWdDaGFubmVsKSA9PSBjaGFubmVsKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBvblByZWxvYWRSZXMocmVxdWlyZUxpc3QsIHJlcXVpcmVBdGxhc0xpc3QsIHJlcXVpcmVTcGluZUxpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwbGF0Zm9ybSA9IHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYocGxhdGZvcm0uaXNUYXJnZXRQbGF0Zm9ybSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5vblByZWxvYWRSZXMocmVxdWlyZUxpc3QsIHJlcXVpcmVBdGxhc0xpc3QsIHJlcXVpcmVTcGluZUxpc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZnRlckdldENvbmZpZygpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwbGF0Zm9ybSA9IHRoaXMuc3BlY2lhbFBsYXRmcm9tTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYocGxhdGZvcm0uaXNUYXJnZXRQbGF0Zm9ybSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybS5hZnRlckdldENvbmZpZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZnRlcldpbmRvd0luaXQobmFtZSwgbm9kZSwgd2luZG93KVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNwZWNpYWxQbGF0ZnJvbUxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGxhdGZvcm0gPSB0aGlzLnNwZWNpYWxQbGF0ZnJvbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKHBsYXRmb3JtLmlzVGFyZ2V0UGxhdGZvcm0oKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxhdGZvcm0uYWZ0ZXJXaW5kb3dJbml0KG5hbWUsIG5vZGUsIHdpbmRvdylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuLy/nibnmrorlubPlj7DlrprliLbpnIDmsYJcclxuZXhwb3J0IGNsYXNzIFNwZWNpYWxQbGF0Zm9ybVxyXG57XHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1RhcmdldFBsYXRmb3JtKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL+mihOWKoOi9veWkp+WOhei1hOa6kOiwg+eUqCDlj6/ku6Xkv67mlLnmiJbogIXmt7vliqDpooTliqDovb3otYTmupDjgIJcclxuICAgIHB1YmxpYyBvblByZWxvYWRSZXMocmVxdWlyZUxpc3QsIHJlcXVpcmVBdGxhc0xpc3QsIHJlcXVpcmVTcGluZUxpc3Qpe307XHJcblxyXG4gICAgLy/orr7nva7lpb1nYW1lY2Zn5LmL5ZCOICDnlKjkuo7kv67mlLlnYW1lRGF0Ye+8jFxyXG4gICAgcHVibGljIGFmdGVyR2V0Q29uZmlnKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICAvL3dpbmRvdyBpbml0Vmlld+S5i+WQjuiwg+eUqO+8jOi0n+i0o+S/ruaUuVVJ77yM6YeN5a6a5ZCR54K55Ye75LqL5Lu2562JXHJcbiAgICBwdWJsaWMgYWZ0ZXJXaW5kb3dJbml0KG5hbWUsIG5vZGUsIHdpbmRvdylcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8v55m+5bqm5rig6YGT5YyFICA2ODggMzbmuKDpgZMgIDc5OCAzMOa4oOmBkyAgIGh0dHA6Ly8xOTIuMTY4LjEuMjEvemVudGFvL3Rhc2stdmlldy04NTEuaHRtbFxyXG5leHBvcnQgY2xhc3MgQmFpZHVQbGF0Zm9ybSBleHRlbmRzIFNwZWNpYWxQbGF0Zm9ybVxyXG57XHJcbiAgICBwcml2YXRlIHRpbWV1cFN0YXRlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHRpbWVySUQgPSBudWxsXHJcbiAgICBwdWJsaWMgZmlsdGVyR2FtZUFycmF5ID0gWzcwMDUsIDIwMDgsIDEwMDFdOyBcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiYmFpZHVcIlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1RhcmdldFBsYXRmb3JtKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy9yZXR1cm4gQXBwSGVscGVyLmNoZWNrQVBQQW5kQ2hhbm5lbCg2ODgsIDM2KSB8fCBBcHBIZWxwZXIuY2hlY2tBUFBBbmRDaGFubmVsKDc5OCwgMzApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZnRlckdldENvbmZpZygpXHJcbiAgICB7XHJcblxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gIFxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNUaW1ldXAoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWV1cFN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNUaW1ldXAoIGZsYWcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1ldXBTdGF0ZSA9IGZsYWdcclxuICAgICAgICBpZihmbGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9CQUlEVV9TVEFURSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGltZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySUQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyV2luZG93SW5pdChuYW1lLCB1aU5vZGUsIHdpbmRvdylcclxuICAgIHtcclxuICAgICAgICBpZihuYW1lID09IFwiV25kSGFsbFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbGV0IG5vZGUgPSBjYy5maW5kKFwiYm90dG9tTm9kZS90aXhpYW5Ob2RlL2ljb25cIiwgdWlOb2RlKTtcclxuICAgICAgICAgICAgLy8gaWYobm9kZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBsZXQgc3AgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoc3AsXCJoYWxsL3NwZWNpYWxQbGF0Zm9ybS9iYWlkdS9hdGxhcy9iYWlkdUF0bGFzXCIsXCJkaWxhbnppX3R4aWFuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==