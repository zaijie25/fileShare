"use strict";
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