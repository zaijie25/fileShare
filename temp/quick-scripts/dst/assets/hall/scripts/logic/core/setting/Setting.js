
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/Setting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a5430cKD1HC42D/a8rF8gR', 'Setting');
// hall/scripts/logic/core/setting/Setting.ts

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
exports.ServerType = void 0;
var Urls_1 = require("./Urls");
var BaseSetting_1 = require("../../../framework/setting/BaseSetting");
var SettingData_1 = require("./SettingData");
var SystemInfo_1 = require("./SystemInfo");
var ChannelInfo_1 = require("./ChannelInfo");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var AppHelper_1 = require("../tool/AppHelper");
var SkinConfig_1 = require("../../hallcommon/app/SkinConfig");
var ServerType;
(function (ServerType) {
    ServerType[ServerType["DEVELOP"] = 1] = "DEVELOP";
    ServerType[ServerType["INTEST"] = 2] = "INTEST";
    ServerType[ServerType["RELEASE"] = 3] = "RELEASE";
    ServerType[ServerType["K8S"] = 4] = "K8S";
    ServerType[ServerType["THS"] = 5] = "THS";
    ServerType[ServerType["THSINTEST"] = 6] = "THSINTEST";
})(ServerType = exports.ServerType || (exports.ServerType = {}));
var Setting = /** @class */ (function (_super) {
    __extends(Setting, _super);
    function Setting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //AppConfig服务器配置
        _this.AppConfig = {};
        // 是否限制充值
        _this.rechargeLimited = false;
        //是否限制游客登录
        _this.vistorLoginLimited = false;
        //是否限制手机注册
        _this.registLimited = false;
        //是否热更
        _this.isStartHotUpdate = true;
        //游戏帧率
        _this.FPSConfig = 30;
        //大厅帧率
        _this.HallFPSConfig = 60;
        _this.appId = 0;
        _this.checkVersionApp = 0;
        _this.headNameRange = 20;
        //金币比率
        _this.glodRatio = 10000;
        //小数点保留位数
        _this.fixCount = 2;
        //是否允许自动登录
        _this.enableAutoLogin = true;
        //切到后台重连时间
        _this.backgroundReconnectTime = 5;
        //大厅心跳拉取跑马灯数量
        _this.boardcastCount = 2;
        //socket强制重连次数
        _this.socketReconnectTimes = 5;
        //重连间隔
        _this.socketReconnectInterval = 4;
        //多久没收到数据  需要重连
        _this.socketReconnectReceiveCheckInteval = 10;
        //enter之后5秒内没收到消息算服务器异常，退出游戏
        _this.enterTimeout = 5;
        //是否需要大厅选场
        _this.needHallChooseRoom = false;
        //微信好友title
        _this.wxFirendShareTitle = "588棋牌";
        _this.wxFirendShareContent = "我正在玩588棋牌，登录送礼，大奖不停，快来陪我一起娱乐吧！";
        _this.wxIconUrl = "https://res.qqlql.com/icons/588.png";
        //朋友圈
        _this.wxMomentShareTitle = "588棋牌";
        _this.wxMomentShareContent = "";
        _this.shareUrl = "http://1m142.cn";
        _this.signKey = "";
        //推广微信客服
        _this.spreadWx = "yyoop12a";
        _this.WX_APP_ID = "wx20f5eb186bcb0b5a";
        //推广qq
        _this.spreadQQ = "156381867";
        _this.aiteAppKey = "bfe1a232-c751-4fdf-b1c5-67c20bcdefbb";
        _this.aite_url = "";
        _this.loginAite_url = "";
        _this.dataUrlIndex = 0;
        //缓存的游戏图标数量
        _this.cachedGameItemCount = 8;
        //关闭vip
        _this.vipDisable = false;
        _this.hallBGM = "hall/sound/dtBGM1";
        //用来验证微信登录是否可用
        //服务器配置微信key md5值
        _this.serverWxMd5 = "";
        //安卓包名md5
        _this.serverAndroidIdMd5 = "";
        //ios包名md5
        _this.serverIOSIdMd5 = "";
        //ios签名信息
        _this.serverIOSCertMd5 = "";
        _this.useHttpDNS = true;
        //data列表
        _this.dataUrlsList = [];
        //是否开启log
        _this.logEnable = false;
        //是否是自营业返利
        _this.ispersonalTax = false;
        //是否开启微信登录按钮
        _this.weixinLoginDisable = false;
        //验证码发送时间间隔
        _this.phoneVerifyCodeInterval = 60;
        //APP所属平台信息，只有上报使用
        _this.appDataPlatformId = 0;
        //是否App Store 开启微信功能
        _this.isAppStoreEnableWXSDK = false;
        //支付宝上报包名
        _this.alipayReportPackageName = "";
        //网速dns 数组
        _this.WangsuDNS = [];
        //客服类型
        _this.loginKeFuType = 0;
        //资源服务器地址
        _this.resServerUrl = "";
        //判断是否关闭合服功能，默认开启
        _this.isCloseMegeServer = false;
        //alioss的配置
        _this.alioss_endpoint = "https://oss-cn-hongkong.aliyuncs.com";
        _this.alioss_file_url = "https://aiteoss.oss-cn-hongkong.aliyuncs.com/";
        _this.alioss_bucket = "aite-hk";
        return _this;
    }
    Setting.prototype.setup = function () {
        this.Urls = new Urls_1.default();
        this.settingData = new SettingData_1.default();
        this.settingData.setup(this.storage);
        this.SystemInfo = new SystemInfo_1.default();
        this.ChannelInfo = new ChannelInfo_1.default;
        this.ChannelInfo.setup();
        this.SkinConfig = new SkinConfig_1.default();
        this.SkinConfig.setup();
    };
    Setting.prototype.parseCheckVersionCfg = function (config) {
        if (config.app) {
            this.serverWxMd5 = config.app.wx_sum;
            this.serverIOSIdMd5 = config.app.ios_sum;
            this.serverAndroidIdMd5 = config.app.and_sum;
            this.serverIOSCertMd5 = config.app.ios_cert;
        }
        if (config.custom) {
            var cfInfo = config.custom.new_login_kefu;
            // 0 网页 3 艾特
            if (cfInfo && cfInfo.type != null && cfInfo.type != undefined) {
                var cfType = cfInfo.type;
                this.loginKeFuType = cfType;
                if (cfType == 4) {
                    this.loginAite_url = cfInfo.aite_url;
                    this.aite_url = cfInfo.aite_url;
                }
                var servicerModel = Global.ModelManager.getModel("ServicerModel");
                servicerModel.initData([cfInfo]);
            }
            if (cfInfo && cfInfo.url && cfInfo.url != "" && cfInfo.url.indexOf("http") > -1) {
                this.Urls.onlineService = cfInfo.url;
            }
        }
        if (config.data_hosts && config.data_hosts.length && config.data_hosts.length > 0) {
            this.recordDataUrls(config.data_hosts);
        }
    };
    Setting.prototype.parseServerInfo = function (serverCfg) {
        this.AppConfig = serverCfg;
        //常规属性赋值
        this.parseNormalData(serverCfg);
        //马甲包处理
        this.parseMaJiaBaoData(serverCfg);
    };
    Setting.prototype.parseNormalData = function (serverCfg) {
        var version = serverCfg.version;
        if (version) {
            Global.HotUpdateManager.hallNewVersion = version;
        }
        if (serverCfg.isCloseMegeServer) {
            this.isCloseMegeServer = serverCfg.isCloseMegeServer == 1;
        }
        if (serverCfg.clearStorage) {
            var isClearStorage = serverCfg.clearStorage == 1;
            if (isClearStorage) {
                Logger.error("clearStorage true");
                //清除登录线路
                this.storage.removeKey(HallStorageKey_1.default.LoginRoutes);
                //清除Token
                this.storage.removeKey(HallStorageKey_1.default.Token);
                //清除 AppID
                this.storage.removeKey(HallStorageKey_1.default.AppID);
                //清除DataURL
                this.storage.removeKey(HallStorageKey_1.default.DATAURLS);
            }
        }
        this.Urls.parse(serverCfg);
        var appid = serverCfg.appid;
        Global.Setting.appId = appid;
        this.saveAppId(serverCfg.appid);
        var key = CC_PREVIEW ? serverCfg.web_key : serverCfg.sign_key;
        if (key) {
            this.signKey = key;
            this.SystemInfo.loginSign = Global.UrlUtil.getPlatformSign("[" + this.SystemInfo.deviceId + "]", key);
        }
        if (serverCfg.vipDisable == 1) {
            this.vipDisable = true;
        }
        if (serverCfg.useHttpDNS) {
            this.useHttpDNS = serverCfg.useHttpDNS == 1;
        }
        if (serverCfg.dataUrls) {
            this.recordDataUrls(serverCfg.dataUrls);
        }
        if (serverCfg.personalTax) {
            this.ispersonalTax = serverCfg.personalTax == 1;
        }
        else {
            this.ispersonalTax = false;
        }
        if (serverCfg.logEnable)
            this.logEnable = serverCfg.logEnable == 1;
        else
            this.logEnable = false;
        if (serverCfg.alipayPkg) {
            this.alipayReportPackageName = serverCfg.alipayPkg;
        }
        if (serverCfg.WangsuDNS) {
            if (serverCfg.WangsuDNS.length > 0) {
                this.WangsuDNS = serverCfg.WangsuDNS;
            }
        }
        if (serverCfg.DunConfig) {
            Global.AppDun.setDunConfig(serverCfg.DunConfig);
        }
        if (serverCfg.whiteHosts) {
            var whiteHostsJson = JSON.stringify(serverCfg.whiteHosts);
            // Logger.error("whiteHostsJson:" + whiteHostsJson)
            Global.NativeEvent.setWhiteHosts(whiteHostsJson);
        }
        //369 特殊处理，高版本隐藏微信按钮，低版本不处理
        if (this.SystemInfo.appID == "8003") {
            if (AppHelper_1.default.enableForceUpdateAppInstall) {
                if (serverCfg.weixinLoginDisable) {
                    this.weixinLoginDisable = serverCfg.weixinLoginDisable == 1;
                }
                else {
                    this.weixinLoginDisable = false;
                }
            }
        }
        else {
            if (serverCfg.weixinLoginDisable) {
                this.weixinLoginDisable = serverCfg.weixinLoginDisable == 1;
            }
            else {
                this.weixinLoginDisable = false;
            }
        }
        if (serverCfg.platform_id) {
            this.appDataPlatformId = serverCfg.platform_id;
        }
        if (serverCfg.reportUrls && serverCfg.reportUrls.length > 0) {
            Global.Setting.storage.set(HallStorageKey_1.default.ReportUrl, JSON.stringify(serverCfg.reportUrls));
        }
        if (serverCfg.DNSConfig) {
            Global.DNS.setDNSConfg(serverCfg.DNSConfig);
        }
        if (serverCfg.rechargeLimited) {
            this.rechargeLimited = serverCfg.rechargeLimited == 1;
        }
        if (serverCfg.vistorLoginLimited) {
            this.vistorLoginLimited = serverCfg.vistorLoginLimited == 1;
        }
        if (serverCfg.registLimited) {
            this.registLimited = serverCfg.registLimited == 1;
        }
        Logger.logEnable = this.logEnable;
        //@todo native开关控制
        Global.NativeEvent.nativeLog(Logger.logEnable);
        if (CC_PREVIEW)
            Logger.logEnable = true;
        var channel = serverCfg.channelid;
        this.setChannelID(channel);
    };
    Setting.prototype.setChannelID = function (channel) {
        if (channel != null && !isNaN(Number(channel))) {
            this.ChannelInfo.configChannel = channel;
        }
    };
    /**
     * 例子：
     * 读取字段：majiabao
     * 解析内容：
     * {"huawei":{"svrCfg":{"appid":688,"channelid":0,"download_url":"https://58879.com/","platform_id":17,"routes":[{"host":"intest.lu77n.cn","port":443}]},"switch":1}}
     *
     *
     * ***/
    Setting.prototype.parseMaJiaBaoData = function (serverCfg) {
        this.parseAppStoreData(serverCfg);
        var nativePlatform = this.SystemInfo.nativePlatform;
        if (nativePlatform != null && nativePlatform.length > 1) {
            var majiabaoCfg = serverCfg["majiabao"];
            if (majiabaoCfg != null && majiabaoCfg != undefined) {
                var platformCfg = majiabaoCfg[nativePlatform];
                if (platformCfg != null && platformCfg != undefined) {
                    var svrCfg = platformCfg["svrCfg"];
                    if (svrCfg != null && svrCfg != undefined) {
                        this.parseNormalData(svrCfg);
                    }
                }
            }
        }
    };
    Setting.prototype.parseAppStoreData = function (serverCfg) {
        if (serverCfg.appstore) {
            var appstore = serverCfg.appstore;
            if (appstore && appstore.enableWXSDK) {
                if (appstore.enableWXSDK.length > 0) {
                    var bundleName = Global.Setting.SystemInfo.bundleName;
                    for (var i = 0; i < appstore.enableWXSDK.length; i++) {
                        var info = appstore.enableWXSDK[i];
                        if (info === bundleName) {
                            this.isAppStoreEnableWXSDK = true;
                            break;
                        }
                    }
                }
            }
        }
    };
    //如果data配置了新的data域名，就写到本地
    Setting.prototype.recordDataUrls = function (urlArr) {
        if (urlArr && urlArr.length > 0) {
            this.storage.setObject(HallStorageKey_1.default.DATAURLS, urlArr);
        }
    };
    //加载本地url
    Setting.prototype.loadDataUrls = function () {
        var urls = this.storage.getObject(HallStorageKey_1.default.DATAURLS);
        if (urls == null || urls.length == 0)
            return null;
        urls = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(urls);
        return urls;
        // let dataName = this.getConstUrlDataName();
        // for (let i = 0; i < urls.length; i++) {
        //     let dataUrl = urls[i];
        //     if (!dataUrl.startsWith("http")) {
        //         dataUrl = "https://" + dataUrl
        //     } 
        //     if(dataUrl.indexOf("?")<0){
        //         dataUrl = dataUrl+"/config/"+dataName
        //     }else{
        //         dataUrl = dataUrl
        //     }
        //     this.dataUrlsList.push(dataUrl);
        // }
    };
    /**
     * 获取data name
     * 1. 10021之前是通过URL截取data name
     * 2. 10021之后通过native 上传data name，格式为 appID_subPlatfromID.data
     * **/
    Setting.prototype.getConstUrlDataName = function () {
        var dataName = "";
        var getOldStyleDataName = function () {
            var url = ""; //Global.Setting.getCfgDataUrl();
            if (Global.Setting.SystemInfo.appConstUrl)
                url = Global.Setting.SystemInfo.appConstUrl;
            var arr = url.split("/");
            var name = arr[arr.length - 1];
            return name;
        };
        var appID = Global.Setting.SystemInfo.appID;
        var subPlatformID = Global.Setting.SystemInfo.subPlatformID;
        if (appID != null && appID != "") {
            if (subPlatformID != null && subPlatformID != "") {
                dataName = appID + "_" + subPlatformID;
            }
            else {
                dataName = appID;
            }
        }
        else {
            dataName = getOldStyleDataName();
        }
        return dataName;
    };
    Setting.prototype.saveAppId = function (appId) {
        var oldId = this.storage.getNumber(HallStorageKey_1.default.AppID, -1);
        if (oldId != -1 && oldId != appId) {
            //appid变化 需清理缓存  只需要清理project  version  不能清理整个文件夹
            if (cc.sys.isNative) {
                Logger.error("appid 变化 不清理缓存");
                // let resPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/project.manifest";
                // if (jsb.fileUtils.isFileExist(resPath)) {
                //     jsb.fileUtils.removeFile(resPath);
                // }
                //关闭合服AppID不一致则重启
                Global.UI.clearAllUIPrefab();
                if (this.isCloseMegeServer) {
                    Logger.error("appid 变化 重启");
                    Global.NativeEvent.unzipHallPackage();
                }
                else {
                    Logger.error("appid 变化 合服不重启");
                }
                setTimeout(function () {
                    cc.game.restart();
                }, 1000);
            }
        }
        Global.Setting.storage.set(HallStorageKey_1.default.AppID, Global.Setting.appId);
    };
    // public getCfgDataUrl() {
    //     return this.Urls.getCfgDataUrl(this.serverType);
    // }
    // public getCfgDataBackupUrl(cfgUrl) {
    //     return this.Urls.getCfgDataBackupUrl(Global.Toolkit.DealWithUrl(cfgUrl));
    // }
    // public getCfgDataBackupUrl1(cfgUrl) {
    //     return this.Urls.getCfgDataBackupUrl1(Global.Toolkit.DealWithUrl(cfgUrl));
    // }
    Setting.prototype.getCfgDataName = function () {
        return this.Urls.getDataNameWithServerType(this.serverType);
    };
    Setting.prototype.getDataHttpDnsArr = function () {
        var arr = [];
        if (!this.dataUrlsList || this.dataUrlsList.length == 0)
            return arr;
        for (var i = 0; i < this.dataUrlsList.length; i++) {
            var domain = this.getDomain(this.dataUrlsList[i]);
            if (domain && domain != "")
                arr.push(domain);
        }
        return arr;
    };
    Setting.prototype.getDomain = function (url) {
        if (!url)
            return "";
        var urlarr = url.split("//");
        if (urlarr.length < 2)
            return "";
        var newUrl = urlarr[1];
        return newUrl.split("/")[0];
    };
    /** 百度状态判断, 方便子游戏调用 */
    Setting.prototype.isBaiduSpecialState = function () {
        return false;
    };
    /** 大厅使用的头像是否圆头 */
    Setting.prototype.isCircleHeadImage = function () {
        return this.SkinConfig.headImgShape == 1;
    };
    Setting.sendSharetraceReportFlag = "sendSharetraceReportFlag";
    return Setting;
}(BaseSetting_1.default));
exports.default = Setting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXFNldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUMxQixzRUFBaUU7QUFDakUsNkNBQXdDO0FBQ3hDLDJDQUFzQztBQUN0Qyw2Q0FBd0M7QUFDeEMsd0VBQW1FO0FBQ25FLCtDQUEwQztBQUMxQyw4REFBeUQ7QUFFekQsSUFBWSxVQU9YO0FBUEQsV0FBWSxVQUFVO0lBQ2xCLGlEQUFXLENBQUE7SUFDWCwrQ0FBVSxDQUFBO0lBQ1YsaURBQVcsQ0FBQTtJQUNYLHlDQUFPLENBQUE7SUFDUCx5Q0FBTyxDQUFBO0lBQ1AscURBQWEsQ0FBQTtBQUNqQixDQUFDLEVBUFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFPckI7QUFFRDtJQUFxQywyQkFBVztJQUFoRDtRQUFBLHFFQWlpQkM7UUFoaUJHLGdCQUFnQjtRQUNULGVBQVMsR0FBUSxFQUFFLENBQUM7UUFLM0IsU0FBUztRQUNGLHFCQUFlLEdBQVcsS0FBSyxDQUFBO1FBRXRDLFVBQVU7UUFDSCx3QkFBa0IsR0FBVyxLQUFLLENBQUE7UUFFekMsVUFBVTtRQUNILG1CQUFhLEdBQVcsS0FBSyxDQUFBO1FBU3BDLE1BQU07UUFDQyxzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFeEMsTUFBTTtRQUNDLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFFdEIsTUFBTTtRQUNDLG1CQUFhLEdBQUcsRUFBRSxDQUFDO1FBS25CLFdBQUssR0FBRyxDQUFDLENBQUM7UUFFVixxQkFBZSxHQUFHLENBQUMsQ0FBQztRQUVwQixtQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUUxQixNQUFNO1FBQ0MsZUFBUyxHQUFHLEtBQUssQ0FBQztRQUV6QixTQUFTO1FBQ0YsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUVwQixVQUFVO1FBQ0gscUJBQWUsR0FBRyxJQUFJLENB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SSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU8sMkJBQVMsR0FBakIsVUFBa0IsR0FBVztRQUN6QixJQUFJLENBQUMsR0FBRztZQUNKLE9BQU8sRUFBRSxDQUFDO1FBQ2QsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVBLHNCQUFzQjtJQUNmLHFDQUFtQixHQUExQjtRQUNHLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxrQkFBa0I7SUFDWCxtQ0FBaUIsR0FBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBbmNhLGdDQUF3QixHQUFHLDBCQUEwQixDQUFDO0lBb2N4RSxjQUFDO0NBamlCRCxBQWlpQkMsQ0FqaUJvQyxxQkFBVyxHQWlpQi9DO2tCQWppQm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXJscyBmcm9tIFwiLi9VcmxzXCI7XHJcbmltcG9ydCBCYXNlU2V0dGluZyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL3NldHRpbmcvQmFzZVNldHRpbmdcIjtcclxuaW1wb3J0IFNldHRpbmdEYXRhIGZyb20gXCIuL1NldHRpbmdEYXRhXCI7XHJcbmltcG9ydCBTeXN0ZW1JbmZvIGZyb20gXCIuL1N5c3RlbUluZm9cIjtcclxuaW1wb3J0IENoYW5uZWxJbmZvIGZyb20gXCIuL0NoYW5uZWxJbmZvXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgU2tpbkNvbmZpZyBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9hcHAvU2tpbkNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGVudW0gU2VydmVyVHlwZSB7XHJcbiAgICBERVZFTE9QID0gMSwgICAgLy/lhoXnvZHlvIDlj5HmnI1cclxuICAgIElOVEVTVCA9IDIsICAgICAvL+Wklue9kea1i+ivleacjVxyXG4gICAgUkVMRUFTRSA9IDMsICAgIC8v5q2j5byP5pyNXHJcbiAgICBLOFMgPSA0LFxyXG4gICAgVEhTID0gNSxcclxuICAgIFRIU0lOVEVTVCA9IDYsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBCYXNlU2V0dGluZyB7XHJcbiAgICAvL0FwcENvbmZpZ+acjeWKoeWZqOmFjee9rlxyXG4gICAgcHVibGljIEFwcENvbmZpZzogYW55ID0ge307XHJcblxyXG4gICAgLy91cmzphY3nva7lnLDlnYBcclxuICAgIHB1YmxpYyBVcmxzOiBVcmxzO1xyXG5cclxuICAgIC8vIOaYr+WQpumZkOWItuWFheWAvFxyXG4gICAgcHVibGljIHJlY2hhcmdlTGltaXRlZDpib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAvL+aYr+WQpumZkOWItua4uOWuoueZu+W9lVxyXG4gICAgcHVibGljIHZpc3RvckxvZ2luTGltaXRlZDpib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAvL+aYr+WQpumZkOWItuaJi+acuuazqOWGjFxyXG4gICAgcHVibGljIHJlZ2lzdExpbWl0ZWQ6Ym9vbGVhbiA9IGZhbHNlXHJcbiAgICAvL+ezu+e7n+S/oeaBryAgXHJcbiAgICBwdWJsaWMgU3lzdGVtSW5mbzogU3lzdGVtSW5mbztcclxuICAgIC8v5YyF5rig6YGT5Y+35pWw5o2uXHJcbiAgICBwdWJsaWMgQ2hhbm5lbEluZm86IENoYW5uZWxJbmZvO1xyXG5cclxuICAgIC8v55qu6IKk6YWN572u5L+h5oGvXHJcbiAgICBwdWJsaWMgU2tpbkNvbmZpZzogU2tpbkNvbmZpZztcclxuXHJcbiAgICAvL+aYr+WQpueDreabtFxyXG4gICAgcHVibGljIGlzU3RhcnRIb3RVcGRhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8v5ri45oiP5bin546HXHJcbiAgICBwdWJsaWMgRlBTQ29uZmlnID0gMzA7XHJcblxyXG4gICAgLy/lpKfljoXluKfnjodcclxuICAgIHB1YmxpYyBIYWxsRlBTQ29uZmlnID0gNjA7XHJcblxyXG4gICAgLy/mnI3liqHlmajnsbvlnotcclxuICAgIHB1YmxpYyBzZXJ2ZXJUeXBlOiBTZXJ2ZXJUeXBlO1xyXG5cclxuICAgIHB1YmxpYyBhcHBJZCA9IDA7XHJcblxyXG4gICAgcHVibGljIGNoZWNrVmVyc2lvbkFwcCA9IDA7XHJcblxyXG4gICAgcHVibGljIGhlYWROYW1lUmFuZ2UgPSAyMDtcclxuXHJcbiAgICAvL+mHkeW4geavlOeOh1xyXG4gICAgcHVibGljIGdsb2RSYXRpbyA9IDEwMDAwO1xyXG5cclxuICAgIC8v5bCP5pWw54K55L+d55WZ5L2N5pWwXHJcbiAgICBwdWJsaWMgZml4Q291bnQgPSAyO1xyXG5cclxuICAgIC8v5piv5ZCm5YWB6K646Ieq5Yqo55m75b2VXHJcbiAgICBwdWJsaWMgZW5hYmxlQXV0b0xvZ2luID0gdHJ1ZTtcclxuXHJcbiAgICAvL+WIh+WIsOWQjuWPsOmHjei/nuaXtumXtFxyXG4gICAgcHVibGljIGJhY2tncm91bmRSZWNvbm5lY3RUaW1lID0gNTtcclxuXHJcbiAgICAvL+Wkp+WOheW/g+i3s+aLieWPlui3kemprOeBr+aVsOmHj1xyXG4gICAgcHVibGljIGJvYXJkY2FzdENvdW50ID0gMjtcclxuXHJcbiAgICAvL3NvY2tldOW8uuWItumHjei/nuasoeaVsFxyXG4gICAgcHVibGljIHNvY2tldFJlY29ubmVjdFRpbWVzID0gNTtcclxuICAgIC8v6YeN6L+e6Ze06ZqUXHJcbiAgICBwdWJsaWMgc29ja2V0UmVjb25uZWN0SW50ZXJ2YWwgPSA0O1xyXG5cclxuICAgIC8v5aSa5LmF5rKh5pS25Yiw5pWw5o2uICDpnIDopoHph43ov55cclxuICAgIHB1YmxpYyBzb2NrZXRSZWNvbm5lY3RSZWNlaXZlQ2hlY2tJbnRldmFsID0gMTA7XHJcblxyXG4gICAgLy9lbnRlcuS5i+WQjjXnp5LlhoXmsqHmlLbliLDmtojmga/nrpfmnI3liqHlmajlvILluLjvvIzpgIDlh7rmuLjmiI9cclxuICAgIHB1YmxpYyBlbnRlclRpbWVvdXQgPSA1O1xyXG5cclxuICAgIFxyXG4gICAgLy/mmK/lkKbpnIDopoHlpKfljoXpgInlnLpcclxuICAgIHB1YmxpYyBuZWVkSGFsbENob29zZVJvb20gPSBmYWxzZTtcclxuXHJcbiAgICAvL+W+ruS/oeWlveWPi3RpdGxlXHJcbiAgICBwdWJsaWMgd3hGaXJlbmRTaGFyZVRpdGxlOiBzdHJpbmcgPSBcIjU4OOaji+eJjFwiO1xyXG4gICAgcHVibGljIHd4RmlyZW5kU2hhcmVDb250ZW50OiBzdHJpbmcgPSBcIuaIkeato+WcqOeOqTU4OOaji+eJjO+8jOeZu+W9lemAgeekvO+8jOWkp+WlluS4jeWBnO+8jOW/q+adpemZquaIkeS4gOi1t+WoseS5kOWQp++8gVwiO1xyXG4gICAgcHVibGljIHd4SWNvblVybDogc3RyaW5nID0gXCJodHRwczovL3Jlcy5xcWxxbC5jb20vaWNvbnMvNTg4LnBuZ1wiXHJcbiAgICAvL+aci+WPi+WciFxyXG4gICAgcHVibGljIHd4TW9tZW50U2hhcmVUaXRsZTogc3RyaW5nID0gXCI1ODjmo4vniYxcIjtcclxuICAgIHB1YmxpYyB3eE1vbWVudFNoYXJlQ29udGVudDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgc2hhcmVVcmw6IHN0cmluZyA9IFwiaHR0cDovLzFtMTQyLmNuXCJcclxuXHJcbiAgICBwdWJsaWMgc2lnbktleTogc3RyaW5nID0gXCJcIlxyXG5cclxuICAgIC8v5o6o5bm/5b6u5L+h5a6i5pyNXHJcbiAgICBwdWJsaWMgc3ByZWFkV3ggPSBcInl5b29wMTJhXCI7XHJcblxyXG4gICAgcHVibGljIFdYX0FQUF9JRCA9IFwid3gyMGY1ZWIxODZiY2IwYjVhXCJcclxuICAgIC8v5o6o5bm/cXFcclxuICAgIHB1YmxpYyBzcHJlYWRRUSA9IFwiMTU2MzgxODY3XCI7XHJcblxyXG4gICAgcHVibGljIGFpdGVBcHBLZXkgPSBcImJmZTFhMjMyLWM3NTEtNGZkZi1iMWM1LTY3YzIwYmNkZWZiYlwiXHJcbiAgICBwdWJsaWMgYWl0ZV91cmwgICA9IFwiXCJcclxuICAgIHB1YmxpYyBsb2dpbkFpdGVfdXJsICAgPSBcIlwiXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlbmRTaGFyZXRyYWNlUmVwb3J0RmxhZyA9IFwic2VuZFNoYXJldHJhY2VSZXBvcnRGbGFnXCI7XHJcbiAgICBwdWJsaWMgZGF0YVVybEluZGV4ID0gMDtcclxuICAgIHB1YmxpYyBjdXJEYXRhVXJsOiBzdHJpbmc7XHJcblxyXG5cclxuICAgXHJcblxyXG4gICAgLy/nvJPlrZjnmoTmuLjmiI/lm77moIfmlbDph49cclxuICAgIHB1YmxpYyBjYWNoZWRHYW1lSXRlbUNvdW50ID0gODtcclxuXHJcblxyXG4gICAgLy/lhbPpl612aXBcclxuICAgIHB1YmxpYyB2aXBEaXNhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGhhbGxCR00gPSBcImhhbGwvc291bmQvZHRCR00xXCI7XHJcblxyXG5cclxuICAgIC8v55So5p2l6aqM6K+B5b6u5L+h55m75b2V5piv5ZCm5Y+v55SoXHJcbiAgICAvL+acjeWKoeWZqOmFjee9ruW+ruS/oWtleSBtZDXlgLxcclxuICAgIHB1YmxpYyBzZXJ2ZXJXeE1kNTogc3RyaW5nID0gXCJcIjtcclxuICAgIC8v5a6J5Y2T5YyF5ZCNbWQ1XHJcbiAgICBwdWJsaWMgc2VydmVyQW5kcm9pZElkTWQ1ID0gXCJcIjtcclxuICAgIC8vaW9z5YyF5ZCNbWQ1XHJcbiAgICBwdWJsaWMgc2VydmVySU9TSWRNZDUgPSBcIlwiO1xyXG4gICAgLy9pb3Pnrb7lkI3kv6Hmga9cclxuICAgIHB1YmxpYyBzZXJ2ZXJJT1NDZXJ0TWQ1ID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgdXNlSHR0cEROUyA9IHRydWU7XHJcblxyXG4gICAgLy9kYXRh5YiX6KGoXHJcbiAgICBwdWJsaWMgZGF0YVVybHNMaXN0ID0gW107XHJcblxyXG4gICAgLy/mmK/lkKblvIDlkK9sb2dcclxuICAgIHB1YmxpYyBsb2dFbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvL+aYr+WQpuaYr+iHquiQpeS4mui/lOWIqVxyXG4gICAgcHVibGljIGlzcGVyc29uYWxUYXggPSBmYWxzZTtcclxuICAgIC8v5piv5ZCm5byA5ZCv5b6u5L+h55m75b2V5oyJ6ZKuXHJcbiAgICBwdWJsaWMgd2VpeGluTG9naW5EaXNhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy/pqozor4HnoIHlj5HpgIHml7bpl7Tpl7TpmpRcclxuICAgIHB1YmxpYyBwaG9uZVZlcmlmeUNvZGVJbnRlcnZhbCA9IDYwO1xyXG5cclxuXHJcbiAgICAvL0FQUOaJgOWxnuW5s+WPsOS/oeaBr++8jOWPquacieS4iuaKpeS9v+eUqFxyXG4gICAgcHVibGljIGFwcERhdGFQbGF0Zm9ybUlkID0gMDtcclxuXHJcbiAgICAvL+aYr+WQpkFwcCBTdG9yZSDlvIDlkK/lvq7kv6Hlip/og71cclxuICAgIHB1YmxpYyBpc0FwcFN0b3JlRW5hYmxlV1hTREsgPSBmYWxzZVxyXG5cclxuICAgIC8v5pSv5LuY5a6d5LiK5oql5YyF5ZCNXHJcbiAgICBwdWJsaWMgYWxpcGF5UmVwb3J0UGFja2FnZU5hbWUgPSBcIlwiXHJcblxyXG4gICAgLy/nvZHpgJ9kbnMg5pWw57uEXHJcbiAgICBwdWJsaWMgV2FuZ3N1RE5TID0gW11cclxuXHJcbiAgICAvL+Wuouacjeexu+Wei1xyXG4gICAgcHVibGljIGxvZ2luS2VGdVR5cGUgPSAwIDtcclxuXHJcbiAgICAvL+i1hOa6kOacjeWKoeWZqOWcsOWdgFxyXG4gICAgcHVibGljIHJlc1NlcnZlclVybCA9IFwiXCI7XHJcblxyXG4gICAgLy/liKTmlq3mmK/lkKblhbPpl63lkIjmnI3lip/og73vvIzpu5jorqTlvIDlkK9cclxuICAgIHB1YmxpYyBpc0Nsb3NlTWVnZVNlcnZlciA9IGZhbHNlO1xyXG5cclxuICAgIC8vYWxpb3Nz55qE6YWN572uXHJcbiAgICBwdWJsaWMgYWxpb3NzX2VuZHBvaW50ID0gXCJodHRwczovL29zcy1jbi1ob25na29uZy5hbGl5dW5jcy5jb21cIjtcclxuICAgIHB1YmxpYyBhbGlvc3NfZmlsZV91cmwgPSBcImh0dHBzOi8vYWl0ZW9zcy5vc3MtY24taG9uZ2tvbmcuYWxpeXVuY3MuY29tL1wiO1xyXG4gICAgcHVibGljIGFsaW9zc19idWNrZXQgPSBcImFpdGUtaGtcIjtcclxuICAgIHB1YmxpYyBzZXR1cCgpIHtcclxuICAgICAgICB0aGlzLlVybHMgPSBuZXcgVXJscygpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ0RhdGEgPSBuZXcgU2V0dGluZ0RhdGEoKTtcclxuICAgICAgICB0aGlzLnNldHRpbmdEYXRhLnNldHVwKHRoaXMuc3RvcmFnZSk7XHJcbiAgICAgICAgdGhpcy5TeXN0ZW1JbmZvID0gbmV3IFN5c3RlbUluZm8oKVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbEluZm8gPSBuZXcgQ2hhbm5lbEluZm87XHJcbiAgICAgICAgdGhpcy5DaGFubmVsSW5mby5zZXR1cCgpO1xyXG4gICAgICAgIHRoaXMuU2tpbkNvbmZpZyA9IG5ldyBTa2luQ29uZmlnKCk7XHJcbiAgICAgICAgdGhpcy5Ta2luQ29uZmlnLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBwYXJzZUNoZWNrVmVyc2lvbkNmZyhjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmFwcCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlcld4TWQ1ID0gY29uZmlnLmFwcC53eF9zdW07XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVySU9TSWRNZDUgPSBjb25maWcuYXBwLmlvc19zdW07XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyQW5kcm9pZElkTWQ1ID0gY29uZmlnLmFwcC5hbmRfc3VtO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlcklPU0NlcnRNZDUgPSBjb25maWcuYXBwLmlvc19jZXJ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLmN1c3RvbSkge1xyXG4gICAgICAgICAgICBsZXQgY2ZJbmZvID0gY29uZmlnLmN1c3RvbS5uZXdfbG9naW5fa2VmdTtcclxuICAgICAgICAgICAgLy8gMCDnvZHpobUgMyDoib7niblcclxuICAgICAgICAgICAgaWYgKGNmSW5mbyAmJiBjZkluZm8udHlwZSAhPSBudWxsICYmIGNmSW5mby50eXBlICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2ZUeXBlID0gY2ZJbmZvLnR5cGVcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5LZUZ1VHlwZSA9IGNmVHlwZVxyXG4gICAgICAgICAgICAgICAgaWYgKGNmVHlwZSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luQWl0ZV91cmwgPSBjZkluZm8uYWl0ZV91cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5haXRlX3VybCA9IGNmSW5mby5haXRlX3VybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlck1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNlcnZpY2VyTW9kZWxcIik7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlck1vZGVsLmluaXREYXRhKFtjZkluZm9dKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNmSW5mbyAmJiBjZkluZm8udXJsICYmIGNmSW5mby51cmwgIT0gXCJcIiAmJiBjZkluZm8udXJsLmluZGV4T2YoXCJodHRwXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXJscy5vbmxpbmVTZXJ2aWNlID0gY2ZJbmZvLnVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLmRhdGFfaG9zdHMgJiYgY29uZmlnLmRhdGFfaG9zdHMubGVuZ3RoICYmIGNvbmZpZy5kYXRhX2hvc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmREYXRhVXJscyhjb25maWcuZGF0YV9ob3N0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZVNlcnZlckluZm8oc2VydmVyQ2ZnKSB7XHJcbiAgICAgICAgdGhpcy5BcHBDb25maWcgPSBzZXJ2ZXJDZmc7XHJcbiAgICAgICAgLy/luLjop4TlsZ7mgKfotYvlgLxcclxuICAgICAgICB0aGlzLnBhcnNlTm9ybWFsRGF0YShzZXJ2ZXJDZmcpXHJcbiAgICAgICAgLy/pqaznlLLljIXlpITnkIZcclxuICAgICAgICB0aGlzLnBhcnNlTWFKaWFCYW9EYXRhKHNlcnZlckNmZylcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlTm9ybWFsRGF0YShzZXJ2ZXJDZmcpIHtcclxuICAgICAgICBsZXQgdmVyc2lvbiA9IHNlcnZlckNmZy52ZXJzaW9uXHJcbiAgICAgICAgaWYgKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaGFsbE5ld1ZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLmlzQ2xvc2VNZWdlU2VydmVyKXtcclxuICAgICAgICAgICAgdGhpcy5pc0Nsb3NlTWVnZVNlcnZlciA9IHNlcnZlckNmZy5pc0Nsb3NlTWVnZVNlcnZlciA9PSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuY2xlYXJTdG9yYWdlKXtcclxuICAgICAgICAgICAgbGV0IGlzQ2xlYXJTdG9yYWdlID0gc2VydmVyQ2ZnLmNsZWFyU3RvcmFnZSA9PSAxXHJcbiAgICAgICAgICAgIGlmIChpc0NsZWFyU3RvcmFnZSl7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjbGVhclN0b3JhZ2UgdHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgLy/muIXpmaTnmbvlvZXnur/ot69cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVLZXkoSGFsbFN0b3JhZ2VLZXkuTG9naW5Sb3V0ZXMpXHJcbiAgICAgICAgICAgICAgICAvL+a4hemZpFRva2VuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlS2V5KEhhbGxTdG9yYWdlS2V5LlRva2VuKVxyXG4gICAgICAgICAgICAgICAgLy/muIXpmaQgQXBwSURcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVLZXkoSGFsbFN0b3JhZ2VLZXkuQXBwSUQpXHJcbiAgICAgICAgICAgICAgICAvL+a4hemZpERhdGFVUkxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVLZXkoSGFsbFN0b3JhZ2VLZXkuREFUQVVSTFMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLlVybHMucGFyc2Uoc2VydmVyQ2ZnKTtcclxuICAgICAgICBsZXQgYXBwaWQgPSBzZXJ2ZXJDZmcuYXBwaWQ7XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuYXBwSWQgPSBhcHBpZDtcclxuICAgICAgICB0aGlzLnNhdmVBcHBJZChzZXJ2ZXJDZmcuYXBwaWQpO1xyXG5cclxuICAgICAgICBsZXQga2V5ID0gQ0NfUFJFVklFVyA/IHNlcnZlckNmZy53ZWJfa2V5IDogc2VydmVyQ2ZnLnNpZ25fa2V5O1xyXG4gICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaWduS2V5ID0ga2V5O1xyXG4gICAgICAgICAgICB0aGlzLlN5c3RlbUluZm8ubG9naW5TaWduID0gR2xvYmFsLlVybFV0aWwuZ2V0UGxhdGZvcm1TaWduKFwiW1wiICsgdGhpcy5TeXN0ZW1JbmZvLmRldmljZUlkICsgXCJdXCIsIGtleSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcudmlwRGlzYWJsZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlwRGlzYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLnVzZUh0dHBETlMpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VIdHRwRE5TID0gc2VydmVyQ2ZnLnVzZUh0dHBETlMgPT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuZGF0YVVybHMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmREYXRhVXJscyhzZXJ2ZXJDZmcuZGF0YVVybHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlcnZlckNmZy5wZXJzb25hbFRheCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzcGVyc29uYWxUYXggPSBzZXJ2ZXJDZmcucGVyc29uYWxUYXggPT0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc3BlcnNvbmFsVGF4ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLmxvZ0VuYWJsZSlcclxuICAgICAgICAgICAgdGhpcy5sb2dFbmFibGUgPSBzZXJ2ZXJDZmcubG9nRW5hYmxlID09IDE7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmxvZ0VuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuYWxpcGF5UGtnKXtcclxuICAgICAgICAgICAgdGhpcy5hbGlwYXlSZXBvcnRQYWNrYWdlTmFtZSA9IHNlcnZlckNmZy5hbGlwYXlQa2c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLldhbmdzdUROUyl7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJDZmcuV2FuZ3N1RE5TLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5XYW5nc3VETlMgPSBzZXJ2ZXJDZmcuV2FuZ3N1RE5TXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuRHVuQ29uZmlnKXtcclxuICAgICAgICAgICAgR2xvYmFsLkFwcER1bi5zZXREdW5Db25maWcoc2VydmVyQ2ZnLkR1bkNvbmZpZylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcud2hpdGVIb3N0cyl7XHJcbiAgICAgICAgICAgIGxldCB3aGl0ZUhvc3RzSnNvbiA9IEpTT04uc3RyaW5naWZ5KHNlcnZlckNmZy53aGl0ZUhvc3RzKVxyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJ3aGl0ZUhvc3RzSnNvbjpcIiArIHdoaXRlSG9zdHNKc29uKVxyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2V0V2hpdGVIb3N0cyh3aGl0ZUhvc3RzSnNvbilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vMzY5IOeJueauiuWkhOeQhu+8jOmrmOeJiOacrOmakOiXj+W+ruS/oeaMiemSru+8jOS9jueJiOacrOS4jeWkhOeQhlxyXG4gICAgICAgIGlmICh0aGlzLlN5c3RlbUluZm8uYXBwSUQgPT0gXCI4MDAzXCIpIHtcclxuICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVGb3JjZVVwZGF0ZUFwcEluc3RhbGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJDZmcud2VpeGluTG9naW5EaXNhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWl4aW5Mb2dpbkRpc2FibGUgPSBzZXJ2ZXJDZmcud2VpeGluTG9naW5EaXNhYmxlID09IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VpeGluTG9naW5EaXNhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2VydmVyQ2ZnLndlaXhpbkxvZ2luRGlzYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWl4aW5Mb2dpbkRpc2FibGUgPSBzZXJ2ZXJDZmcud2VpeGluTG9naW5EaXNhYmxlID09IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlaXhpbkxvZ2luRGlzYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLnBsYXRmb3JtX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwRGF0YVBsYXRmb3JtSWQgPSBzZXJ2ZXJDZmcucGxhdGZvcm1faWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLnJlcG9ydFVybHMgJiYgc2VydmVyQ2ZnLnJlcG9ydFVybHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5SZXBvcnRVcmwsIEpTT04uc3RyaW5naWZ5KHNlcnZlckNmZy5yZXBvcnRVcmxzKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuRE5TQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5ETlMuc2V0RE5TQ29uZmcoc2VydmVyQ2ZnLkROU0NvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLnJlY2hhcmdlTGltaXRlZCkge1xyXG4gICAgICAgICAgIHRoaXMucmVjaGFyZ2VMaW1pdGVkID0gc2VydmVyQ2ZnLnJlY2hhcmdlTGltaXRlZCA9PSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VydmVyQ2ZnLnZpc3RvckxvZ2luTGltaXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpc3RvckxvZ2luTGltaXRlZCA9IHNlcnZlckNmZy52aXN0b3JMb2dpbkxpbWl0ZWQgPT0gMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChzZXJ2ZXJDZmcucmVnaXN0TGltaXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdExpbWl0ZWQgPSBzZXJ2ZXJDZmcucmVnaXN0TGltaXRlZCA9PSAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBMb2dnZXIubG9nRW5hYmxlID0gdGhpcy5sb2dFbmFibGU7XHJcbiAgICAgICAgLy9AdG9kbyBuYXRpdmXlvIDlhbPmjqfliLZcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQubmF0aXZlTG9nKExvZ2dlci5sb2dFbmFibGUpXHJcblxyXG4gICAgICAgIGlmIChDQ19QUkVWSUVXKVxyXG4gICAgICAgICAgICBMb2dnZXIubG9nRW5hYmxlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIGxldCBjaGFubmVsID0gc2VydmVyQ2ZnLmNoYW5uZWxpZDtcclxuICAgICAgICB0aGlzLnNldENoYW5uZWxJRChjaGFubmVsKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q2hhbm5lbElEKGNoYW5uZWwpIHtcclxuICAgICAgICBpZiAoY2hhbm5lbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIoY2hhbm5lbCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbm5lbEluZm8uY29uZmlnQ2hhbm5lbCA9IGNoYW5uZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS+i+WtkO+8mlxyXG4gICAgICog6K+75Y+W5a2X5q6177yabWFqaWFiYW9cclxuICAgICAqIOino+aekOWGheWuue+8mlxyXG4gICAgICoge1wiaHVhd2VpXCI6e1wic3ZyQ2ZnXCI6e1wiYXBwaWRcIjo2ODgsXCJjaGFubmVsaWRcIjowLFwiZG93bmxvYWRfdXJsXCI6XCJodHRwczovLzU4ODc5LmNvbS9cIixcInBsYXRmb3JtX2lkXCI6MTcsXCJyb3V0ZXNcIjpbe1wiaG9zdFwiOlwiaW50ZXN0Lmx1NzduLmNuXCIsXCJwb3J0XCI6NDQzfV19LFwic3dpdGNoXCI6MX19XHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogKioqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZU1hSmlhQmFvRGF0YShzZXJ2ZXJDZmcpIHtcclxuICAgICAgICB0aGlzLnBhcnNlQXBwU3RvcmVEYXRhKHNlcnZlckNmZylcclxuICAgICAgICBsZXQgbmF0aXZlUGxhdGZvcm06IHN0cmluZyA9IHRoaXMuU3lzdGVtSW5mby5uYXRpdmVQbGF0Zm9ybTtcclxuICAgICAgICBpZiAobmF0aXZlUGxhdGZvcm0gIT0gbnVsbCAmJiBuYXRpdmVQbGF0Zm9ybS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBtYWppYWJhb0NmZyA9IHNlcnZlckNmZ1tcIm1hamlhYmFvXCJdXHJcbiAgICAgICAgICAgIGlmIChtYWppYWJhb0NmZyAhPSBudWxsICYmIG1hamlhYmFvQ2ZnICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXRmb3JtQ2ZnID0gbWFqaWFiYW9DZmdbbmF0aXZlUGxhdGZvcm1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtQ2ZnICE9IG51bGwgJiYgcGxhdGZvcm1DZmcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN2ckNmZyA9IHBsYXRmb3JtQ2ZnW1wic3ZyQ2ZnXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdnJDZmcgIT0gbnVsbCAmJiBzdnJDZmcgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VOb3JtYWxEYXRhKHN2ckNmZylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlQXBwU3RvcmVEYXRhKHNlcnZlckNmZykge1xyXG4gICAgICAgIGlmIChzZXJ2ZXJDZmcuYXBwc3RvcmUpIHtcclxuICAgICAgICAgICAgbGV0IGFwcHN0b3JlID0gc2VydmVyQ2ZnLmFwcHN0b3JlXHJcbiAgICAgICAgICAgIGlmIChhcHBzdG9yZSAmJiBhcHBzdG9yZS5lbmFibGVXWFNESykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFwcHN0b3JlLmVuYWJsZVdYU0RLLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVuZGxlTmFtZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYnVuZGxlTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwc3RvcmUuZW5hYmxlV1hTREsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZm8gPSBhcHBzdG9yZS5lbmFibGVXWFNES1tpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbyA9PT0gYnVuZGxlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FwcFN0b3JlRW5hYmxlV1hTREsgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/lpoLmnpxkYXRh6YWN572u5LqG5paw55qEZGF0YeWfn+WQje+8jOWwseWGmeWIsOacrOWcsFxyXG4gICAgcHVibGljIHJlY29yZERhdGFVcmxzKHVybEFycikge1xyXG4gICAgICAgIGlmICh1cmxBcnIgJiYgdXJsQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldE9iamVjdChIYWxsU3RvcmFnZUtleS5EQVRBVVJMUywgdXJsQXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb3mnKzlnLB1cmxcclxuICAgIHB1YmxpYyBsb2FkRGF0YVVybHMoKSB7XHJcbiAgICAgICAgbGV0IHVybHMgPSB0aGlzLnN0b3JhZ2UuZ2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkRBVEFVUkxTKTtcclxuICAgICAgICBpZiAodXJscyA9PSBudWxsIHx8IHVybHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB1cmxzID0gR2xvYmFsLlVybFV0aWwuZGVhbEZ1bGxVcmxXaXRoTXV0aUxpbmVzU2FtZUhvc3QodXJscylcclxuICAgICAgICByZXR1cm4gdXJscztcclxuICAgICAgICAvLyBsZXQgZGF0YU5hbWUgPSB0aGlzLmdldENvbnN0VXJsRGF0YU5hbWUoKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgbGV0IGRhdGFVcmwgPSB1cmxzW2ldO1xyXG4gICAgICAgIC8vICAgICBpZiAoIWRhdGFVcmwuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcclxuICAgICAgICAvLyAgICAgICAgIGRhdGFVcmwgPSBcImh0dHBzOi8vXCIgKyBkYXRhVXJsXHJcbiAgICAgICAgLy8gICAgIH0gXHJcblxyXG4gICAgICAgIC8vICAgICBpZihkYXRhVXJsLmluZGV4T2YoXCI/XCIpPDApe1xyXG4gICAgICAgIC8vICAgICAgICAgZGF0YVVybCA9IGRhdGFVcmwrXCIvY29uZmlnL1wiK2RhdGFOYW1lXHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgZGF0YVVybCA9IGRhdGFVcmxcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB0aGlzLmRhdGFVcmxzTGlzdC5wdXNoKGRhdGFVcmwpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmRhdGEgbmFtZVxyXG4gICAgICogMS4gMTAwMjHkuYvliY3mmK/pgJrov4dVUkzmiKrlj5ZkYXRhIG5hbWVcclxuICAgICAqIDIuIDEwMDIx5LmL5ZCO6YCa6L+HbmF0aXZlIOS4iuS8oGRhdGEgbmFtZe+8jOagvOW8j+S4uiBhcHBJRF9zdWJQbGF0ZnJvbUlELmRhdGFcclxuICAgICAqICoqL1xyXG4gICAgcHVibGljIGdldENvbnN0VXJsRGF0YU5hbWUoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFOYW1lID0gXCJcIjtcclxuICAgICAgICBsZXQgZ2V0T2xkU3R5bGVEYXRhTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiXCIgLy9HbG9iYWwuU2V0dGluZy5nZXRDZmdEYXRhVXJsKCk7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcENvbnN0VXJsKVxyXG4gICAgICAgICAgICAgICAgdXJsID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBDb25zdFVybDtcclxuICAgICAgICAgICAgbGV0IGFyciA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXBwSUQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEO1xyXG4gICAgICAgIGxldCBzdWJQbGF0Zm9ybUlEID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5zdWJQbGF0Zm9ybUlEO1xyXG4gICAgICAgIGlmIChhcHBJRCAhPSBudWxsICYmIGFwcElEICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKHN1YlBsYXRmb3JtSUQgIT0gbnVsbCAmJiBzdWJQbGF0Zm9ybUlEICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gYXBwSUQgKyBcIl9cIiArIHN1YlBsYXRmb3JtSURcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gYXBwSURcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhTmFtZSA9IGdldE9sZFN0eWxlRGF0YU5hbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFOYW1lO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgIFxyXG5cclxuICAgIHB1YmxpYyBzYXZlQXBwSWQoYXBwSWQpIHtcclxuICAgICAgICBsZXQgb2xkSWQgPSB0aGlzLnN0b3JhZ2UuZ2V0TnVtYmVyKEhhbGxTdG9yYWdlS2V5LkFwcElELCAtMSk7XHJcbiAgICAgICAgaWYgKG9sZElkICE9IC0xICYmIG9sZElkICE9IGFwcElkKSB7XHJcbiAgICAgICAgICAgIC8vYXBwaWTlj5jljJYg6ZyA5riF55CG57yT5a2YICDlj6rpnIDopoHmuIXnkIZwcm9qZWN0ICB2ZXJzaW9uICDkuI3og73muIXnkIbmlbTkuKrmlofku7blpLlcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYXBwaWQg5Y+Y5YyWIOS4jea4heeQhue8k+WtmFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCByZXNQYXRoID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKFwiaGFsbFwiKSArIFwiL3Byb2plY3QubWFuaWZlc3RcIjtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHJlc1BhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAganNiLmZpbGVVdGlscy5yZW1vdmVGaWxlKHJlc1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63lkIjmnI1BcHBJROS4jeS4gOiHtOWImemHjeWQr1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmNsZWFyQWxsVUlQcmVmYWIoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xvc2VNZWdlU2VydmVyKXtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhcHBpZCDlj5jljJYg6YeN5ZCvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC51bnppcEhhbGxQYWNrYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYXBwaWQg5Y+Y5YyWIOWQiOacjeS4jemHjeWQr1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuQXBwSUQsIEdsb2JhbC5TZXR0aW5nLmFwcElkKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGdldENmZ0RhdGFVcmwoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuVXJscy5nZXRDZmdEYXRhVXJsKHRoaXMuc2VydmVyVHlwZSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIGdldENmZ0RhdGFCYWNrdXBVcmwoY2ZnVXJsKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuVXJscy5nZXRDZmdEYXRhQmFja3VwVXJsKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGNmZ1VybCkpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyBnZXRDZmdEYXRhQmFja3VwVXJsMShjZmdVcmwpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5VcmxzLmdldENmZ0RhdGFCYWNrdXBVcmwxKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGNmZ1VybCkpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDZmdEYXRhTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVXJscy5nZXREYXRhTmFtZVdpdGhTZXJ2ZXJUeXBlKHRoaXMuc2VydmVyVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldERhdGFIdHRwRG5zQXJyKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhVXJsc0xpc3QgfHwgdGhpcy5kYXRhVXJsc0xpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBhcnJcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGFVcmxzTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZG9tYWluID0gdGhpcy5nZXREb21haW4odGhpcy5kYXRhVXJsc0xpc3RbaV0pO1xyXG4gICAgICAgICAgICBpZiAoZG9tYWluICYmIGRvbWFpbiAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZG9tYWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbWFpbih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdXJsKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICBsZXQgdXJsYXJyID0gdXJsLnNwbGl0KFwiLy9cIik7XHJcbiAgICAgICAgaWYgKHVybGFyci5sZW5ndGggPCAyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICBsZXQgbmV3VXJsID0gdXJsYXJyWzFdO1xyXG4gICAgICAgIHJldHVybiBuZXdVcmwuc3BsaXQoXCIvXCIpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgICAvKiog55m+5bqm54q25oCB5Yik5patLCDmlrnkvr/lrZDmuLjmiI/osIPnlKggKi9cclxuICAgICBwdWJsaWMgaXNCYWlkdVNwZWNpYWxTdGF0ZSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlpKfljoXkvb/nlKjnmoTlpLTlg4/mmK/lkKblnIblpLQgKi9cclxuICAgIHB1YmxpYyBpc0NpcmNsZUhlYWRJbWFnZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraW5Db25maWcuaGVhZEltZ1NoYXBlID09IDE7XHJcbiAgICB9XHJcbn0iXX0=