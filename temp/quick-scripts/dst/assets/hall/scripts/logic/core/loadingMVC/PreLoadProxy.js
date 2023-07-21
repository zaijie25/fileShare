
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/PreLoadProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbcb05WHmBIhbasuzpJ1C0Z', 'PreLoadProxy');
// hall/scripts/logic/core/loadingMVC/PreLoadProxy.ts

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
var LoadingConst_1 = require("./LoadingConst");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var NetEvent_1 = require("../net/hall/NetEvent");
var LoadingFacade_1 = require("./LoadingFacade");
var AppHelper_1 = require("../tool/AppHelper");
var ReportTool_1 = require("../tool/ReportTool");
var AppHotUpdateProxy_1 = require("./AppHotUpdateProxy");
//加载资源之前的操作
var PreLoadProxy = /** @class */ (function (_super) {
    __extends(PreLoadProxy, _super);
    function PreLoadProxy(manifest) {
        var _this = _super.call(this) || this;
        _this.urlIndex = 0;
        _this._startTime = -1;
        /**data速度上报 */
        _this.reportParam = {};
        _this._intervalTimer = null;
        _this.manifestNativeUrl = manifest.nativeUrl;
        _this.proxyName = PreLoadProxy.NAME;
        return _this;
    }
    PreLoadProxy.prototype.onRegister = function () {
        //初始化APP 相关信息
        Global.NativeEvent.onInit();
        Global.NativeEvent.getNativeParams(this.onloadPackChannelInfo.bind(this));
        //读取配置
        //上述操作如果卡UI进程需要用异步来操作
        Global.NativeJSBBridge.init();
        this.initDataUrls();
        //getNativeParams是同步的  不需要等待
        AppHelper_1.default.init();
        Global.DNS.init();
        //可异步也可同步
        Global.AppDun.init();
        this.requestAppUrl();
        //Global.ReportTool.ReportDevice(ReportTool.REPORT_TYPE_OPEN);
    };
    PreLoadProxy.prototype.onloadPackChannelInfo = function () {
        LoadingFacade_1.default.Instance.sendNotification(LoadingConst_1.default.UPDATE_LOADING_VERSION);
        var packCh = Global.Setting.SystemInfo.packChannel;
        if (packCh != null && packCh != "" && !isNaN(Number(packCh))) {
            Global.Setting.ChannelInfo.packageChannel = Number(packCh);
        }
    };
    PreLoadProxy.prototype.initDataUrls = function () {
        if (CC_PREVIEW || cc.sys.isBrowser) {
            Global.Setting.dataUrlsList = [];
            var appdataUrlArray = Global.Setting.Urls.dataUrls;
            // let dataName = Global.Setting.getCfgDataName();
            var dataName = "绿色大厅";
            if (appdataUrlArray && appdataUrlArray.length > 0) {
                for (var i = 0; i < appdataUrlArray.length; i++) {
                    var constUrl = appdataUrlArray[i];
                    var constDataUrl = constUrl;
                    constDataUrl = constDataUrl + cc.js.formatStr("/%s?", Global.Toolkit.md5(dataName));
                    Logger.error("constDataUrl = " + constDataUrl);
                    Global.Setting.dataUrlsList.push(constDataUrl);
                }
            }
            return;
        }
        Global.Setting.dataUrlsList = [];
        var dataUrls = Global.Setting.loadDataUrls();
        if (dataUrls && dataUrls.length > 0) {
            for (var i = 0; i < dataUrls.length; i++) {
                var dUrl = this.repackUrl(dataUrls[i]);
                Global.Setting.dataUrlsList.push(dUrl);
            }
        }
        else {
            //取不到本地缓存就是用包里面的dataUrls
            dataUrls = Global.Setting.SystemInfo.appConstUrlArray;
            for (var i = 0; i < dataUrls.length; i++) {
                var dUrl = this.repackUrl(dataUrls[i]);
                Global.Setting.dataUrlsList.push(dUrl);
            }
        }
    };
    PreLoadProxy.prototype.repackUrl = function (url) {
        //如果配置了问号 则直接用配置下发的   
        if (url.indexOf("?") > -1) {
            if (!url.startsWith("http"))
                url = "https://" + url;
            return url;
        }
        var protocal = "https:";
        var protocalArr = url.split("//");
        if (protocalArr.length > 1) {
            protocal = protocalArr[0];
            url = protocalArr[1];
        }
        var host = Global.UrlUtil.getHostFromUrl(url);
        var dataName = Global.Setting.SystemInfo.appID;
        //兼容个别老版本  20000版本强更后 可删除
        if (dataName == null || dataName == "") {
            dataName = Global.Setting.getConstUrlDataName();
        }
        var subPlatform = Global.Setting.SystemInfo.subPlatformID;
        var dataStr = "";
        if (subPlatform == "intest")
            dataStr = dataName + (subPlatform ? "_" + subPlatform : "");
        else
            dataStr = subPlatform;
        dataStr = Global.Toolkit.md5(dataStr);
        return protocal + "//" + host + "/c/" + dataStr + "?";
    };
    //请求appdata 数据
    PreLoadProxy.prototype.requestAppUrl = function () {
        //关掉闪屏页
        Global.NativeEvent.hideSplashView();
        this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "正在获取配置数据..." });
        if (CC_PREVIEW) {
            this.reqServerAppConfig();
            return;
        }
        //加载本地缓存配置
        if (!this.loadLocalAppConfig()) {
            this.reqServerAppConfig();
        }
        else {
            this.reqVerifyServerAppConfig();
        }
    };
    //本地没有缓存，请求服务器配置
    PreLoadProxy.prototype.reqServerAppConfig = function () {
        this._startTime = new Date().valueOf();
        var url = this.getConfigUrl();
        var uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        url += "uid=" + uid + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + Date.now();
        Global.Setting.dataUrlIndex = this.urlIndex;
        url = Global.UrlUtil.refreshSuffixOperTime(url);
        url = Global.UrlUtil.refreshSuffixRetryTime(url, this.urlIndex);
        Global.Setting.curDataUrl = url;
        //key, maxTime, value = "", minTime = 1,enableMask = true
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "reqServerAppConfig", 15, "", 1, false);
        Logger.error("\u53D1\u9001\u4E86\u6D88\u606F" + url + "=========");
        Global.Http.getWithRetry(url, this.handleAppConfig.bind(this), this.handleCfgReqeustError.bind(this), null, 0, false);
    };
    //本地有缓存，先进游戏，再和服务器数据做校验
    PreLoadProxy.prototype.reqVerifyServerAppConfig = function () {
        this._startTime = new Date().valueOf();
        var url = this.getConfigUrl();
        var uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        url += "uid=" + uid + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + Date.now();
        url = Global.UrlUtil.refreshSuffixOperTime(url);
        url = Global.UrlUtil.refreshSuffixRetryTime(url, this.urlIndex);
        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = url;
        Global.Http.get(url, this.verifyServerCfg.bind(this), this.verifyServerCfgError.bind(this));
    };
    PreLoadProxy.prototype.verifyServerCfgError = function () {
        this.urlIndex++;
        if (this.urlIndex < Global.Setting.dataUrlsList.length) {
            Logger.error("use back up verify");
            this.reqVerifyServerAppConfig();
        }
    };
    PreLoadProxy.prototype.handleCfgReqeustError = function () {
        this.reportParam = {};
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "reqServerAppConfig");
        this.reportDataUrlSpeed(0);
        this.urlIndex++;
        if (this.urlIndex < Global.Setting.dataUrlsList.length) {
            this.reqServerAppConfig();
        }
        else {
            this.urlIndex = 0;
            Global.UI.showSingleBox("配置文件拉取失败，请检查网络连接", this.reqServerAppConfig.bind(this), this.reqServerAppConfig.bind(this));
        }
    };
    /**
     * 加载本地缓存配置，并且解析
     * @private
     * @returns
     */
    PreLoadProxy.prototype.loadLocalAppConfig = function () {
        var content = Global.Setting.storage.get(HallStorageKey_1.default.AppConfigContent);
        if (content == null || content == "")
            return false;
        this.cachedServerContent = content;
        this._startTime = -1;
        this.handleAppConfig(content, false);
        Logger.log("加载本地缓存直接进游戏");
        return true;
    };
    //获取appconfig主地址
    PreLoadProxy.prototype.getConfigUrl = function () {
        //默认配置地址
        var url = Global.Setting.dataUrlsList[this.urlIndex];
        if (url == null) {
            url = Global.Setting.dataUrlsList[0];
            this.urlIndex = 0;
        }
        return url;
    };
    //解析AppConfig 进入热更流程
    PreLoadProxy.prototype.handleAppConfig = function (msg, saveStoreage) {
        var _this = this;
        if (saveStoreage === void 0) { saveStoreage = true; }
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "reqServerAppConfig");
        this.reportParam = {};
        try {
            var decodeMsg = Global.AESUtil.decodeMsg(msg);
            var serverCfg = JSON.parse(decodeMsg);
            var reportUrl = this.getReportUrl(serverCfg.dataUrls);
            Global.Setting.storage.set(HallStorageKey_1.default.ReportUrl, JSON.stringify(reportUrl));
            //data里面没有配置routes 这份data算失效 需要寻找下一个data
            if (serverCfg.routes == null || serverCfg.routes.length == null || serverCfg.routes.length == 0) {
                this.handleCfgReqeustError();
                Logger.error("没有配置routes");
                Global.ReportTool.ReportClientError("AppConfigError", {
                    des: "AppConfig",
                    content: msg,
                    fromLocal: !saveStoreage
                });
                return;
            }
            Logger.log("-------appconfig------", decodeMsg);
            Logger.error("\u6536\u5230\u670D\u52A1\u5668\u7684\u56DE\u590D =" + JSON.stringify(serverCfg));
            Global.Setting.parseServerInfo(serverCfg);
            this.sendNotification(LoadingConst_1.default.UPDATE_APP_INFO);
        }
        catch (e) {
            //解析文件出错可能是域名被污染或者劫持 需要替换下一个url
            this.handleCfgReqeustError();
            Logger.error("加载appCfg失败", msg);
            Global.ReportTool.ReportClientError("AppConfigError", {
                des: "AppConfig",
                content: msg,
                fromLocal: !saveStoreage
            });
            // Global.UI.showSingleBox("配置文件拉取异常，请检查网络连接", this.reqServerAppConfig.bind(this), this.reqServerAppConfig.bind(this));
            return;
        }
        if (saveStoreage) {
            Global.Setting.storage.set(HallStorageKey_1.default.AppConfigContent, msg);
        }
        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = this.getConfigUrl();
        // 优先检测剪贴板
        Global.ChannelUtil.decodeCliptext();
        Global.ChannelUtil.getUuid();
        Global.ChannelUtil.getEntryType();
        Global.ChannelUtil.getSignType();
        Global.ChannelUtil.initOpeninstall();
        //上报上次的日志
        Global.ReportTool.reportRequestRecord();
        //测试上报上次登录日志
        Global.ReportTool.ReportLastLoginLogCache();
        this.reportDataUrlSpeed(1);
        var reqCheckVersionFunc = function () {
            //设置httpdns
            Global.DNS.requestHosts(Global.Setting.Urls.globalRoutes.getRouteArr(), function () {
                //获取热更地址
                if (cc.sys.isNative) {
                    //第一安装时  需要获取到对应渠道信息信息
                    if (Global.Setting.SystemInfo.firstInstallStatus) {
                        setTimeout(function () {
                            _this.reqCheckVersion();
                        }, 500);
                    }
                    else
                        _this.reqCheckVersion();
                }
                else {
                    Global.SceneManager.goToLogin();
                }
            });
        };
        var errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes");
        if (errorReStartTimes != null && errorReStartTimes != "") {
            var num = Number(errorReStartTimes);
            if (num && (num % 3 == 0)) {
                Logger.error("errorReStartTimes = " + errorReStartTimes + " 网络异常，请重新加载 ");
                var callbackFunc = function () {
                    reqCheckVersionFunc();
                };
                Global.UI.show("WndGameRestoreUI", callbackFunc, callbackFunc);
            }
            else {
                Logger.error("errorReStartTimes = num % 3 != 0 " + errorReStartTimes);
                reqCheckVersionFunc();
            }
        }
        else {
            Logger.error("errorReStartTimes = null  ");
            reqCheckVersionFunc();
        }
        if (CC_PREVIEW) //防止不小心打开来更新出去出错
         {
            //this.reqCheckVersion()
        }
    };
    //验证服务器配置与本地配置
    PreLoadProxy.prototype.verifyServerCfg = function (msg) {
        //验证成功，不做操作
        // if (Global.Toolkit.md5(msg) == Global.Toolkit.md5(this.cachedServerContent))
        //     return;
        //@todo提示服务器更新，返回到loading界面
        // this.handleAppConfig(msg);
        // Logger.error("verifyServerCfg msg = " + msg)
        // Logger.error("verifyServerCfg cachedServerContent = " + this.cachedServerContent)
        var result = this.checkServerCfg(msg, this.cachedServerContent);
        Logger.error("verifyServerCfg checkServerCfg result = " + result);
        if (result == 4) {
            //服务器数据验证不通过  需要切换继续请求
            this.verifyServerCfgError();
            return;
        }
        this.reportDataUrlSpeed(1);
        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = this.getConfigUrl();
        if (result == 0)
            return;
        Logger.log("服务器配置更新");
        Global.Setting.storage.set(HallStorageKey_1.default.AppConfigContent, msg);
        var decodeMsg = Global.AESUtil.decodeMsg(msg);
        var serverCfg = JSON.parse(decodeMsg);
        Logger.log("-------appconfig------", decodeMsg);
        Global.Setting.parseServerInfo(serverCfg);
    };
    PreLoadProxy.prototype.reportDataUrlSpeed = function (type) {
        var endTime = new Date().valueOf();
        var time = endTime - this._startTime;
        if (this._startTime !== -1) {
            this.reportParam = { "time": time, "data_url": this.getConfigUrl(), "reportType": type };
            var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_DATA_ROUTE;
            Global.ReportTool.ReportPublicClientLog(reportKey, this.reportParam, false);
        }
    };
    //0  不做操作  1 切回到登录界面  2 重启游戏  3不操作 4 data数据有问题 需要切换下一个 5 
    PreLoadProxy.prototype.checkServerCfg = function (svrMsg, localMsg) {
        if (Global.Toolkit.md5(svrMsg) == Global.Toolkit.md5(localMsg))
            return 0;
        var serCfg = this.safeDecode(svrMsg);
        if (serCfg == null)
            return 4;
        var localCfg = this.safeDecode(localMsg);
        if (localCfg == null)
            return 2;
        //serverRoutes变化需要重启
        try {
            var localRoutesStr = JSON.stringify(localCfg.routes);
            var svrRoutesStr = JSON.stringify(serCfg.routes);
            if (Global.Toolkit.md5(localRoutesStr) != Global.Toolkit.md5(svrRoutesStr))
                return 5;
        }
        catch (e) {
            return 2;
        }
        return 3;
    };
    PreLoadProxy.prototype.safeDecode = function (cfg) {
        var serverCfg = null;
        try {
            var decodeMsg = Global.AESUtil.decodeMsg(cfg);
            serverCfg = JSON.parse(decodeMsg);
            //routes 为空 验证不通过
            if (serverCfg.routes == null || !serverCfg.routes.length || serverCfg.routes.length == 0) {
                serverCfg = null;
                Logger.error("data routes is null ");
            }
        }
        catch (e) {
            Logger.error("load app error", cfg);
            serverCfg = null;
        }
        return serverCfg;
    };
    // 接口 CheckEdition 版本信息
    /*请求
    接口 CheckEdition 版本信息
请求
{
    Appid      int32  `json:"appid"`
    Edition    string `json:"edition"` //版本号
    App  	   string `json:"app"` //hl888
    Pack       int32 `json:"pack"` //有渠道号就带
    Uid        uint64 `json:"uid"` //uid //用户id  必须带
    AppSource  string `json:"app_source"` //app用的资源热更源代号
    
    
    Device     ClientDevInfo `json:"device"` 必须带
}
ClientDevInfo 结构
type ClientDevInfo struct {
    DeviceId   string `json:"device_id"`   //设备ID   必须带
    PhoneModel string `json:"phone_model"` //手机型号 iphone6s  必须带
    OsType     int32  `json:"os_type"`     //1 web 2 aos 3 ios 必须带

    OsVersion string `json:"os_version"` //系统版本号 必须带

    AppVersion string `json:"app_version"` //客户端版本号 必须带

}
    
    返回
    {
        "_mod": "root",
        "_func": "checkversion",
        "_param": {
            "force_update_url": "https://www.baidu.com", // 强更更新地址
            "hall_update_url": "https://www.baidu.com", // 大厅更新地址
            "force_version": "1.0.1", // 强更版本号
            "hall_version": "1.0.5" // 大厅版本号
        }
    } */
    //请求检查版本更新
    PreLoadProxy.prototype.reqCheckVersion = function () {
        var _this = this;
        var param = {};
        param.appid = Global.Setting.appId;
        Global.Setting.checkVersionApp = param.appid;
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = Number(Global.Setting.SystemInfo.appID);
        }
        param.edition = Global.HotUpdateManager.getNativeHotUpdateVersion("hall", true, this.manifestNativeUrl);
        // param.app = Global.Setting.SystemInfo.vendorChannel;
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        param.app_source = Global.Setting.SystemInfo.appConstUrl;
        param.app_independent_tag = Global.Setting.SystemInfo.packageTag;
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.Toolkit.getFirstOpenTime();
        Logger.log("begin check version");
        this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "正在获取热更配置..." });
        var startRequestCheckversion = function () {
            Global.HallServer.sendCheckVersion(NetEvent_1.NetCheckVersion.checkversion, param, _this.respCheckVersion.bind(_this), _this.respCheckVersionError.bind(_this), true);
            Global.ReportTool.ReportDevice(ReportTool_1.ReportTool.REPORT_TYPE_START_CHECKVERSION);
        };
        //判断当前是否有可用线路
        this.clearIntervalTimer();
        var globalRoutes = Global.Setting.Urls.globalRoutes;
        if (globalRoutes && globalRoutes.getCurRoute()) {
            Logger.error("有可用线路");
            startRequestCheckversion();
        }
        else {
            Logger.error("无可用线路");
            //无可用线路并且有盾但是还未初始化成功则等待盾初始化成功再请求
            var times_1 = 0;
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "startRequestCheckversion", 15, "", 1, false);
            this._intervalTimer = setInterval(function () {
                times_1++;
                var globalRoutes = Global.Setting.Urls.globalRoutes;
                if (globalRoutes && globalRoutes.getCurRoute()) {
                    _this.clearIntervalTimer();
                    startRequestCheckversion();
                }
                else {
                    //超过10s 则进行弹框提示
                    if (times_1 >= 10) {
                        _this.clearIntervalTimer();
                        Global.UI.showSingleBox("网络连接超时，请检查后重试-D", _this.reqCheckVersion.bind(_this), _this.reqCheckVersion.bind(_this));
                    }
                }
            }, 1000);
        }
    };
    PreLoadProxy.prototype.clearIntervalTimer = function () {
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        if (this._intervalTimer) {
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
        }
    };
    PreLoadProxy.prototype.respCheckVersionError = function (data) {
        var _this = this;
        var checkFunc = function () {
            setTimeout(function () {
                _this.reqCheckVersion();
            }, 1000);
        };
        if (data && data._errstr) {
            Global.UI.showSingleBox(data._errstr, checkFunc.bind(this), checkFunc.bind(this));
        }
        else {
            Global.UI.showSingleBox("检查版本更新失败", checkFunc.bind(this), checkFunc.bind(this));
        }
        cc.sys.localStorage.setItem("needRestart", 2);
    };
    PreLoadProxy.prototype.respCheckVersion = function (data) {
        // console.log("这是当前的检查版本的回复",JSON.stringify(data))
        cc.sys.localStorage.setItem("needRestart", 2);
        //        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "检查更新中..." });
        if (!data || Global.Toolkit.isEmptyObject(data)) {
            Global.UI.fastTip("服务器维护中，请稍后再试!");
            return;
        }
        Global.AppUpdateHelper.checkVersionData = data;
        var force_update_url = data.force_update_url;
        //新增字段
        var official_url = data.official_url; //官网地址
        if (official_url != null && official_url != "") {
            Global.Setting.Urls.downLoadUrl = official_url;
        }
        //更新Url
        Global.Setting.Urls.forceUpateUrl = force_update_url;
        if (data.server_id) //重新使用服务器生成的id
         {
            Global.Setting.storage.set(HallStorageKey_1.default.ServerDeviceId, data.server_id.trim());
            Global.Setting.SystemInfo.server_id = data.server_id;
        }
        Global.Setting.parseCheckVersionCfg(data);
        Global.ReportTool.ParseDebugConfig(data, Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0);
        //判断维护公告
        if (this.startGameMaintainLogic(data)) {
            return;
        }
        var app_hit_hall_urls = data.app_hit_hall.url;
        var app_hit_hall_urls_new = data.app_hit_hall.new_url;
        var routes = app_hit_hall_urls_new;
        if (!routes || routes.length == 0) {
            routes = Global.UrlUtil.transferUrlArrayToRoutes(app_hit_hall_urls);
        }
        Global.DunHotUpdateUrlSetting.hotUpdateRouteCfg = routes;
        //热更后再判断强更
        this.startHotUpdateLogic(data);
    };
    PreLoadProxy.prototype.startGameMaintainLogic = function (data) {
        var update_notice = data.update_notice; //大厅维护公告
        //检测是否维护
        if (this.checkIsShowUpdateNoticeWnd(update_notice)) {
            this.showUpdateNoticeWnd(update_notice);
            return true;
        }
        return false;
    };
    PreLoadProxy.prototype.startHotUpdateLogic = function (data) {
        var app_hit_hall = data.app_hit_hall; //大厅新版本热更
        var hall_update_url = "";
        var hall_version = "";
        var hallUpdatePath = "";
        if (app_hit_hall && app_hit_hall.version) {
            hall_version = app_hit_hall.version;
            hall_update_url = data.hall_update_url;
            if (app_hit_hall.param) {
                //进行热更线路选择
                var app_hit_hall_urls = app_hit_hall.url;
                var app_hit_hall_urls_new = app_hit_hall.new_url;
                hallUpdatePath = app_hit_hall.param;
                Global.Setting.Urls.hallHotUpdateUrlArray = app_hit_hall_urls_new;
                if (!app_hit_hall_urls_new || app_hit_hall_urls_new.length == 0) {
                    Global.Setting.Urls.hallHotUpdateUrlArray = app_hit_hall_urls;
                }
                var url_index = 0;
                var errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes");
                if (errorReStartTimes != null && errorReStartTimes != "") {
                    var storage_hall_urls = Global.Setting.storage.getObject(HallStorageKey_1.default.HotUpdateHosts);
                    if (storage_hall_urls) {
                        var isSameArray = Global.Toolkit.compareArraySort(storage_hall_urls, Global.Setting.Urls.hallHotUpdateUrlArray);
                        if (isSameArray) {
                            app_hit_hall_urls = storage_hall_urls;
                        }
                        else {
                            Global.Setting.storage.setObject(HallStorageKey_1.default.HotUpdateHosts, Global.Setting.Urls.hallHotUpdateUrlArray);
                            url_index = 0;
                        }
                    }
                    var num = Number(errorReStartTimes);
                    var url_length = Global.Setting.Urls.hallHotUpdateUrlArray.length;
                    if (num && url_length > 0) {
                        Logger.error("startHotUpdateLogic errorReStartTimes = " + errorReStartTimes);
                        url_index = num % url_length;
                    }
                }
                hall_update_url = Global.Setting.Urls.hallHotUpdateUrlArray[url_index];
                if (Global.Setting.Urls.hallHotUpdateUrlArray[0] && Global.Setting.Urls.hallHotUpdateUrlArray[0]["host"]) {
                    if (url_index > 0) {
                        Global.DunHotUpdateUrlSetting.switchRoute();
                    }
                    hall_update_url = Global.DunHotUpdateUrlSetting.hotUpdateUrl;
                }
                Logger.error("startHotUpdateLogic hall_update_url = " + hall_update_url);
            }
        }
        Global.Setting.Urls.hallHotUpdateUrl = hall_update_url;
        Global.HotUpdateManager.hallNewVersion = hall_version;
        Global.HotUpdateManager.hallUpdatePath = hallUpdatePath;
        var hotUpdateProxy = this.facade.retrieveProxy(AppHotUpdateProxy_1.default.NAME);
        hotUpdateProxy.preUpdate(hall_update_url, hall_version, hallUpdatePath);
    };
    PreLoadProxy.prototype.showUpdateNoticeWnd = function (update_notice) {
        var _this = this;
        var update_notice_content = update_notice.content; //维护公告内容
        var update_notice_on_time = update_notice.on_time; // 维护开始时间
        var update_notice_down_time = update_notice.down_time; //维护结束时间
        var endTime = update_notice_down_time;
        var onlineCustomCallback = function () {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(Global.Setting.Urls.onlineService));
        };
        var officialWebCallback = function () {
            var url = Global.Setting.Urls.downLoadUrl;
            cc.sys.openURL(url);
        };
        var closeCallback = function () {
            _this.reqCheckVersion();
        };
        Global.UI.show("WndGameMaintainUI", update_notice_content, endTime, onlineCustomCallback, officialWebCallback, closeCallback);
    };
    PreLoadProxy.prototype.checkIsShowUpdateNoticeWnd = function (update_notice) {
        var nowTime = Math.round(new Date().getTime() / 1000);
        if (update_notice && update_notice.down_time != null && update_notice.down_time > 0) {
            var down_time = update_notice.down_time;
            var offset_time = down_time - nowTime;
            if (offset_time > 0) {
                return true;
            }
        }
        return false;
    };
    PreLoadProxy.prototype.getReportUrl = function (cfg) {
        if (!cfg)
            return;
        var url = cfg[this.urlIndex];
        return url;
    };
    PreLoadProxy.prototype.onRemove = function () {
    };
    PreLoadProxy.NAME = "PreLoadProxy";
    return PreLoadProxy;
}(puremvc.Proxy));
exports.default = PreLoadProxy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFByZUxvYWRQcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBa0M7QUFDbEMsd0VBQW1FO0FBQ25FLGlEQUFpRTtBQUNqRSxpREFBNEM7QUFFNUMsK0NBQTBDO0FBQzFDLGlEQUFnRDtBQUdoRCx5REFBb0Q7QUFHcEQsV0FBVztBQUNYO0lBQTBDLGdDQUFhO0lBU25ELHNCQUFZLFFBQVE7UUFBcEIsWUFDSSxpQkFBTyxTQUdWO1FBVk8sY0FBUSxHQUFHLENBQUMsQ0FBQztRQUViLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDdkIsY0FBYztRQUNOLGlCQUFXLEdBQVEsRUFBRSxDQUFBO1FBcWdCckIsb0JBQWMsR0FBRyxJQUFJLENBQUE7UUFqZ0J6QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxLQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7O0lBQ3ZDLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksYUFBYTtRQUNiLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBRXpFLE1BQU07UUFFTixxQkFBcUI7UUFDckIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsNEJBQTRCO1FBQzVCLG1CQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixTQUFTO1FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FB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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3QgZnJvbSAnLi9Mb2FkaW5nQ29uc3QnXHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tICcuLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5JztcclxuaW1wb3J0IHsgTmV0TG9naW4sIE5ldENoZWNrVmVyc2lvbiB9IGZyb20gJy4uL25ldC9oYWxsL05ldEV2ZW50JztcclxuaW1wb3J0IExvYWRpbmdGYWNhZGUgZnJvbSAnLi9Mb2FkaW5nRmFjYWRlJztcclxuaW1wb3J0IHsgU2NlbmVUeXBlIH0gZnJvbSAnLi4vc2NlbmUvU2NlbmVNYW5hZ2VyJztcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tICcuLi90b29sL0FwcEhlbHBlcic7XHJcbmltcG9ydCB7IFJlcG9ydFRvb2wgfSBmcm9tICcuLi90b29sL1JlcG9ydFRvb2wnO1xyXG5pbXBvcnQgTG9naW5Nb2RlbCBmcm9tICcuLi8uLi9oYWxsY29tbW9uL21vZGVsL0xvZ2luTW9kZWwnO1xyXG5pbXBvcnQgTG9hZGluZ0NvbnN0IGZyb20gJy4vTG9hZGluZ0NvbnN0JztcclxuaW1wb3J0IEFwcEhvdFVwZGF0ZVByb3h5IGZyb20gJy4vQXBwSG90VXBkYXRlUHJveHknO1xyXG5cclxuXHJcbi8v5Yqg6L296LWE5rqQ5LmL5YmN55qE5pON5L2cXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZUxvYWRQcm94eSBleHRlbmRzIHB1cmVtdmMuUHJveHkge1xyXG4gICAgc3RhdGljIE5BTUUgPSBcIlByZUxvYWRQcm94eVwiO1xyXG5cclxuICAgIHByaXZhdGUgdXJsSW5kZXggPSAwO1xyXG4gICAgbWFuaWZlc3ROYXRpdmVVcmw6IGFueVxyXG4gICAgcHJpdmF0ZSBfc3RhcnRUaW1lID0gLTFcclxuICAgIC8qKmRhdGHpgJ/luqbkuIrmiqUgKi9cclxuICAgIHByaXZhdGUgcmVwb3J0UGFyYW0gOiBhbnk9IHt9XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFuaWZlc3QpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWFuaWZlc3ROYXRpdmVVcmwgPSBtYW5pZmVzdC5uYXRpdmVVcmw7XHJcbiAgICAgICAgdGhpcy5wcm94eU5hbWUgPSBQcmVMb2FkUHJveHkuTkFNRTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyWQVBQIOebuOWFs+S/oeaBr1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5vbkluaXQoKTtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0TmF0aXZlUGFyYW1zKHRoaXMub25sb2FkUGFja0NoYW5uZWxJbmZvLmJpbmQodGhpcykpXHJcblxyXG4gICAgICAgIC8v6K+75Y+W6YWN572uXHJcblxyXG4gICAgICAgIC8v5LiK6L+w5pON5L2c5aaC5p6c5Y2hVUnov5vnqIvpnIDopoHnlKjlvILmraXmnaXmk43kvZxcclxuICAgICAgICBHbG9iYWwuTmF0aXZlSlNCQnJpZGdlLmluaXQoKTtcclxuICAgICAgICB0aGlzLmluaXREYXRhVXJscygpO1xyXG4gICAgICAgIC8vZ2V0TmF0aXZlUGFyYW1z5piv5ZCM5q2l55qEICDkuI3pnIDopoHnrYnlvoVcclxuICAgICAgICBBcHBIZWxwZXIuaW5pdCgpO1xyXG4gICAgICAgIEdsb2JhbC5ETlMuaW5pdCgpO1xyXG4gICAgICAgIC8v5Y+v5byC5q2l5Lmf5Y+v5ZCM5q2lXHJcbiAgICAgICAgR2xvYmFsLkFwcER1bi5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0QXBwVXJsKCk7XHJcbiAgICAgICAgLy9HbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnREZXZpY2UoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9PUEVOKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25sb2FkUGFja0NoYW5uZWxJbmZvKCkge1xyXG4gICAgICAgIExvYWRpbmdGYWNhZGUuSW5zdGFuY2Uuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5VUERBVEVfTE9BRElOR19WRVJTSU9OKVxyXG5cclxuICAgICAgICBsZXQgcGFja0NoID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5wYWNrQ2hhbm5lbDtcclxuICAgICAgICBpZiAocGFja0NoICE9IG51bGwgJiYgcGFja0NoICE9IFwiXCIgJiYgIWlzTmFOKE51bWJlcihwYWNrQ2gpKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5wYWNrYWdlQ2hhbm5lbCA9IE51bWJlcihwYWNrQ2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhVXJscygpIHtcclxuICAgICAgICBpZihDQ19QUkVWSUVXIHx8IGNjLnN5cy5pc0Jyb3dzZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3QgPSBbXVxyXG4gICAgICAgICAgICBsZXQgYXBwZGF0YVVybEFycmF5ID0gR2xvYmFsLlNldHRpbmcuVXJscy5kYXRhVXJscztcclxuICAgICAgICAgICAgLy8gbGV0IGRhdGFOYW1lID0gR2xvYmFsLlNldHRpbmcuZ2V0Q2ZnRGF0YU5hbWUoKTtcclxuICAgICAgICAgICAgbGV0IGRhdGFOYW1lID0gXCLnu7/oibLlpKfljoVcIjtcclxuICAgICAgICAgICAgaWYgKGFwcGRhdGFVcmxBcnJheSAmJiBhcHBkYXRhVXJsQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBkYXRhVXJsQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29uc3RVcmw6IHN0cmluZyA9IGFwcGRhdGFVcmxBcnJheVtpXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb25zdERhdGFVcmwgPSBjb25zdFVybDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdERhdGFVcmwgPSBjb25zdERhdGFVcmwgKyBjYy5qcy5mb3JtYXRTdHIoXCIvJXM/XCIsR2xvYmFsLlRvb2xraXQubWQ1KGRhdGFOYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjb25zdERhdGFVcmwgPSBcIiArIGNvbnN0RGF0YVVybClcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3QucHVzaChjb25zdERhdGFVcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3QgPSBbXTtcclxuICAgICAgICBsZXQgZGF0YVVybHMgPSBHbG9iYWwuU2V0dGluZy5sb2FkRGF0YVVybHMoKTtcclxuICAgICAgICBpZihkYXRhVXJscyAmJiBkYXRhVXJscy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhVXJscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRVcmwgPSB0aGlzLnJlcGFja1VybChkYXRhVXJsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3QucHVzaChkVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WPluS4jeWIsOacrOWcsOe8k+WtmOWwseaYr+eUqOWMhemHjOmdoueahGRhdGFVcmxzXHJcbiAgICAgICAgICAgIGRhdGFVcmxzID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBDb25zdFVybEFycmF5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFVcmxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZFVybCA9IHRoaXMucmVwYWNrVXJsKGRhdGFVcmxzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLmRhdGFVcmxzTGlzdC5wdXNoKGRVcmwpO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBwcml2YXRlIHJlcGFja1VybCh1cmw6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6YWN572u5LqG6Zeu5Y+3IOWImeebtOaOpeeUqOmFjee9ruS4i+WPkeeahCAgIFxyXG4gICAgICAgIGlmKHVybC5pbmRleE9mKFwiP1wiKSA+IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSlcclxuICAgICAgICAgICAgICAgIHVybCA9IFwiaHR0cHM6Ly9cIiArIHVybDtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb3RvY2FsID0gXCJodHRwczpcIlxyXG4gICAgICAgIGxldCBwcm90b2NhbEFyciA9IHVybC5zcGxpdChcIi8vXCIpO1xyXG4gICAgICAgIGlmKHByb3RvY2FsQXJyLmxlbmd0aCA+IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm90b2NhbCA9IHByb3RvY2FsQXJyWzBdO1xyXG4gICAgICAgICAgICB1cmwgPSBwcm90b2NhbEFyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhvc3QgPSBHbG9iYWwuVXJsVXRpbC5nZXRIb3N0RnJvbVVybCh1cmwpO1xyXG4gICAgICAgIGxldCBkYXRhTmFtZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSURcclxuICAgICAgICAvL+WFvOWuueS4quWIq+iAgeeJiOacrCAgMjAwMDDniYjmnKzlvLrmm7TlkI4g5Y+v5Yig6ZmkXHJcbiAgICAgICAgaWYoZGF0YU5hbWUgPT0gbnVsbCB8fCBkYXRhTmFtZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YU5hbWUgPSBHbG9iYWwuU2V0dGluZy5nZXRDb25zdFVybERhdGFOYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdWJQbGF0Zm9ybSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc3ViUGxhdGZvcm1JRFxyXG4gICAgICAgIGxldCBkYXRhU3RyID0gXCJcIlxyXG4gICAgICAgIGlmKHN1YlBsYXRmb3JtID09IFwiaW50ZXN0XCIpIGRhdGFTdHIgPSBkYXRhTmFtZSArIChzdWJQbGF0Zm9ybSA/IFwiX1wiICsgc3ViUGxhdGZvcm0gOiBcIlwiKTtcclxuICAgICAgICBlbHNlIGRhdGFTdHIgPSBzdWJQbGF0Zm9ybTtcclxuICAgICAgICBkYXRhU3RyID0gR2xvYmFsLlRvb2xraXQubWQ1KGRhdGFTdHIpXHJcbiAgICAgICAgcmV0dXJuIHByb3RvY2FsICsgXCIvL1wiICsgaG9zdCArIFwiL2MvXCIgKyBkYXRhU3RyICsgXCI/XCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgXHJcblxyXG4gICAgLy/or7fmsYJhcHBkYXRhIOaVsOaNrlxyXG4gICAgcmVxdWVzdEFwcFVybCgpIHtcclxuICAgICAgICAvL+WFs+aOiemXquWxj+mhtVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5oaWRlU3BsYXNoVmlldygpO1xyXG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX0NIRUNLX0xBQkVMLCB7IHBhcm06IFwi5q2j5Zyo6I635Y+W6YWN572u5pWw5o2uLi4uXCIgfSlcclxuICAgICAgICBpZihDQ19QUkVWSUVXKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZXFTZXJ2ZXJBcHBDb25maWcoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yqg6L295pys5Zyw57yT5a2Y6YWN572uXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRMb2NhbEFwcENvbmZpZygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxU2VydmVyQXBwQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlcVZlcmlmeVNlcnZlckFwcENvbmZpZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+acrOWcsOe8k+WtmOeahOacjeWKoeWZqOmFjee9ruaVsOaNrlxyXG4gICAgcHJpdmF0ZSBjYWNoZWRTZXJ2ZXJDb250ZW50O1xyXG5cclxuICAgIC8v5pys5Zyw5rKh5pyJ57yT5a2Y77yM6K+35rGC5pyN5Yqh5Zmo6YWN572uXHJcbiAgICBwcml2YXRlIHJlcVNlcnZlckFwcENvbmZpZygpIHtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRDb25maWdVcmwoKTtcclxuICAgICAgICBsZXQgdWlkID0gTnVtYmVyKEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlVpZCkpIHx8IDA7XHJcbiAgICAgICAgdXJsICs9IFwidWlkPVwiICsgdWlkICsgXCImYXBwdmVyPVwiICsgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uICsgXCImb3M9XCIgKyBHbG9iYWwuVG9vbGtpdC5nZXRPc1R5cGUoKSArIFwiJm49XCIgKyBEYXRlLm5vdygpXHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuZGF0YVVybEluZGV4ID0gdGhpcy51cmxJbmRleDtcclxuICAgICAgICB1cmwgPSBHbG9iYWwuVXJsVXRpbC5yZWZyZXNoU3VmZml4T3BlclRpbWUodXJsKVxyXG4gICAgICAgIHVybCA9IEdsb2JhbC5VcmxVdGlsLnJlZnJlc2hTdWZmaXhSZXRyeVRpbWUodXJsLCB0aGlzLnVybEluZGV4KTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5jdXJEYXRhVXJsID0gdXJsO1xyXG4gICAgICAgIC8va2V5LCBtYXhUaW1lLCB2YWx1ZSA9IFwiXCIsIG1pblRpbWUgPSAxLGVuYWJsZU1hc2sgPSB0cnVlXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJyZXFTZXJ2ZXJBcHBDb25maWdcIiwxNSxcIlwiLDEsZmFsc2UpXHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKGDlj5HpgIHkuobmtojmga8ke3VybH09PT09PT09PT1gKTtcclxuICAgICAgICBHbG9iYWwuSHR0cC5nZXRXaXRoUmV0cnkodXJsLCB0aGlzLmhhbmRsZUFwcENvbmZpZy5iaW5kKHRoaXMpLCB0aGlzLmhhbmRsZUNmZ1JlcWV1c3RFcnJvci5iaW5kKHRoaXMpLG51bGwsMCxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mnKzlnLDmnInnvJPlrZjvvIzlhYjov5vmuLjmiI/vvIzlho3lkozmnI3liqHlmajmlbDmja7lgZrmoKHpqoxcclxuICAgIHByaXZhdGUgcmVxVmVyaWZ5U2VydmVyQXBwQ29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldENvbmZpZ1VybCgpO1xyXG4gICAgICAgIGxldCB1aWQgPSBOdW1iZXIoR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuVWlkKSkgfHwgMDtcclxuICAgICAgICB1cmwgKz0gXCJ1aWQ9XCIgKyB1aWQgKyBcIiZhcHB2ZXI9XCIgKyBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb24gKyBcIiZvcz1cIiArIEdsb2JhbC5Ub29sa2l0LmdldE9zVHlwZSgpICsgXCImbj1cIiArIERhdGUubm93KClcclxuICAgICAgICB1cmwgPSBHbG9iYWwuVXJsVXRpbC5yZWZyZXNoU3VmZml4T3BlclRpbWUodXJsKVxyXG4gICAgICAgIHVybCA9IEdsb2JhbC5VcmxVdGlsLnJlZnJlc2hTdWZmaXhSZXRyeVRpbWUodXJsLCB0aGlzLnVybEluZGV4KTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsSW5kZXggPSB0aGlzLnVybEluZGV4O1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLmN1ckRhdGFVcmwgPSB1cmw7XHJcbiAgICAgICAgR2xvYmFsLkh0dHAuZ2V0KHVybCwgdGhpcy52ZXJpZnlTZXJ2ZXJDZmcuYmluZCh0aGlzKSwgdGhpcy52ZXJpZnlTZXJ2ZXJDZmdFcnJvci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZlcmlmeVNlcnZlckNmZ0Vycm9yKCkge1xyXG4gICAgICAgIHRoaXMudXJsSW5kZXgrKztcclxuICAgICAgICBpZiAodGhpcy51cmxJbmRleCA8IEdsb2JhbC5TZXR0aW5nLmRhdGFVcmxzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwidXNlIGJhY2sgdXAgdmVyaWZ5XCIpXHJcbiAgICAgICAgICAgIHRoaXMucmVxVmVyaWZ5U2VydmVyQXBwQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQ2ZnUmVxZXVzdEVycm9yKCkge1xyXG4gICAgICAgIHRoaXMucmVwb3J0UGFyYW0gPSB7fVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwicmVxU2VydmVyQXBwQ29uZmlnXCIpXHJcbiAgICAgICAgdGhpcy5yZXBvcnREYXRhVXJsU3BlZWQoMClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVybEluZGV4Kys7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsSW5kZXggPCBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxU2VydmVyQXBwQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVybEluZGV4ID0gMDtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLphY3nva7mlofku7bmi4nlj5blpLHotKXvvIzor7fmo4Dmn6XnvZHnu5zov57mjqVcIiwgdGhpcy5yZXFTZXJ2ZXJBcHBDb25maWcuYmluZCh0aGlzKSwgdGhpcy5yZXFTZXJ2ZXJBcHBDb25maWcuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veacrOWcsOe8k+WtmOmFjee9ru+8jOW5tuS4lOino+aekFxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZExvY2FsQXBwQ29uZmlnKCkge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuQXBwQ29uZmlnQ29udGVudCk7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQgPT0gbnVsbCB8fCBjb250ZW50ID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhY2hlZFNlcnZlckNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xXHJcbiAgICAgICAgdGhpcy5oYW5kbGVBcHBDb25maWcoY29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCLliqDovb3mnKzlnLDnvJPlrZjnm7TmjqXov5vmuLjmiI9cIilcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/ojrflj5ZhcHBjb25maWfkuLvlnLDlnYBcclxuICAgIHByaXZhdGUgZ2V0Q29uZmlnVXJsKCkge1xyXG4gICAgICAgIC8v6buY6K6k6YWN572u5Zyw5Z2AXHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3RbdGhpcy51cmxJbmRleF07XHJcbiAgICAgICAgaWYgKHVybCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVybCA9IEdsb2JhbC5TZXR0aW5nLmRhdGFVcmxzTGlzdFswXVxyXG4gICAgICAgICAgICB0aGlzLnVybEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/op6PmnpBBcHBDb25maWcg6L+b5YWl54Ot5pu05rWB56iLXHJcbiAgICBwcml2YXRlIGhhbmRsZUFwcENvbmZpZyhtc2csIHNhdmVTdG9yZWFnZSA9IHRydWUpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORyxcInJlcVNlcnZlckFwcENvbmZpZ1wiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVwb3J0UGFyYW0gPSB7fVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkZWNvZGVNc2cgPSBHbG9iYWwuQUVTVXRpbC5kZWNvZGVNc2cobXNnKTtcclxuICAgICAgICAgICAgbGV0IHNlcnZlckNmZyA9IEpTT04ucGFyc2UoZGVjb2RlTXNnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgbGV0IHJlcG9ydFVybCA9IHRoaXMuZ2V0UmVwb3J0VXJsKHNlcnZlckNmZy5kYXRhVXJscyk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlJlcG9ydFVybCwgSlNPTi5zdHJpbmdpZnkocmVwb3J0VXJsKSk7XHJcbiAgICAgICAgICAgIC8vZGF0YemHjOmdouayoeaciemFjee9rnJvdXRlcyDov5nku71kYXRh566X5aSx5pWIIOmcgOimgeWvu+aJvuS4i+S4gOS4qmRhdGFcclxuICAgICAgICAgICAgaWYgKHNlcnZlckNmZy5yb3V0ZXMgPT0gbnVsbCB8fCBzZXJ2ZXJDZmcucm91dGVzLmxlbmd0aCA9PSBudWxsIHx8IHNlcnZlckNmZy5yb3V0ZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2ZnUmVxZXVzdEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInphY3nva5yb3V0ZXNcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihcIkFwcENvbmZpZ0Vycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXM6IFwiQXBwQ29uZmlnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUxvY2FsOiAhc2F2ZVN0b3JlYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLWFwcGNvbmZpZy0tLS0tLVwiLCBkZWNvZGVNc2cpXHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihg5pS25Yiw5pyN5Yqh5Zmo55qE5Zue5aSNID1gKyBKU09OLnN0cmluZ2lmeShzZXJ2ZXJDZmcpKTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcucGFyc2VTZXJ2ZXJJbmZvKHNlcnZlckNmZyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuVVBEQVRFX0FQUF9JTkZPKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy/op6PmnpDmlofku7blh7rplJnlj6/og73mmK/ln5/lkI3ooqvmsaHmn5PmiJbogIXliqvmjIEg6ZyA6KaB5pu/5o2i5LiL5LiA5LiqdXJsXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2ZnUmVxZXVzdEVycm9yKCk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWKoOi9vWFwcENmZ+Wksei0pVwiLCBtc2cpO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihcIkFwcENvbmZpZ0Vycm9yXCIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzOiBcIkFwcENvbmZpZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tTG9jYWw6ICFzYXZlU3RvcmVhZ2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6YWN572u5paH5Lu25ouJ5Y+W5byC5bi477yM6K+35qOA5p+l572R57uc6L+e5o6lXCIsIHRoaXMucmVxU2VydmVyQXBwQ29uZmlnLmJpbmQodGhpcyksIHRoaXMucmVxU2VydmVyQXBwQ29uZmlnLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2F2ZVN0b3JlYWdlKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LkFwcENvbmZpZ0NvbnRlbnQsIG1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsSW5kZXggPSB0aGlzLnVybEluZGV4O1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLmN1ckRhdGFVcmwgPSB0aGlzLmdldENvbmZpZ1VybCgpO1xyXG4gICAgICAgIC8vIOS8mOWFiOajgOa1i+WJqui0tOadv1xyXG4gICAgICAgIEdsb2JhbC5DaGFubmVsVXRpbC5kZWNvZGVDbGlwdGV4dCgpXHJcbiAgICAgICAgR2xvYmFsLkNoYW5uZWxVdGlsLmdldFV1aWQoKVxyXG4gICAgICAgIEdsb2JhbC5DaGFubmVsVXRpbC5nZXRFbnRyeVR5cGUoKVxyXG4gICAgICAgIEdsb2JhbC5DaGFubmVsVXRpbC5nZXRTaWduVHlwZSgpXHJcbiAgICAgICAgR2xvYmFsLkNoYW5uZWxVdGlsLmluaXRPcGVuaW5zdGFsbCgpOyBcclxuICAgICAgICAvL+S4iuaKpeS4iuasoeeahOaXpeW/l1xyXG4gICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLnJlcG9ydFJlcXVlc3RSZWNvcmQoKTtcclxuICAgICAgICAvL+a1i+ivleS4iuaKpeS4iuasoeeZu+W9leaXpeW/l1xyXG4gICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydExhc3RMb2dpbkxvZ0NhY2hlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVwb3J0RGF0YVVybFNwZWVkKDEpXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCByZXFDaGVja1ZlcnNpb25GdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+iuvue9rmh0dHBkbnNcclxuICAgICAgICAgICAgR2xvYmFsLkROUy5yZXF1ZXN0SG9zdHMoR2xvYmFsLlNldHRpbmcuVXJscy5nbG9iYWxSb3V0ZXMuZ2V0Um91dGVBcnIoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bng63mm7TlnLDlnYBcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+esrOS4gOWuieijheaXtiAg6ZyA6KaB6I635Y+W5Yiw5a+55bqU5rig6YGT5L+h5oGv5L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZmlyc3RJbnN0YWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXFDaGVja1ZlcnNpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxQ2hlY2tWZXJzaW9uKClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5nb1RvTG9naW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVycm9yUmVTdGFydFRpbWVzID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZXJyb3JSZVN0YXJ0VGltZXNcIilcclxuICAgICAgICBpZiAoZXJyb3JSZVN0YXJ0VGltZXMgIT0gbnVsbCAmJiBlcnJvclJlU3RhcnRUaW1lcyAhPSBcIlwiKXtcclxuICAgICAgICAgICAgbGV0IG51bSAgPSBOdW1iZXIoZXJyb3JSZVN0YXJ0VGltZXMpXHJcbiAgICAgICAgICAgIGlmIChudW0gJiYgKG51bSAlIDMgPT0gMCkpe1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXJyb3JSZVN0YXJ0VGltZXMgPSBcIiArIGVycm9yUmVTdGFydFRpbWVzICsgXCIg572R57uc5byC5bi477yM6K+36YeN5paw5Yqg6L29IFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWxsYmFja0Z1bmMgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXFDaGVja1ZlcnNpb25GdW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kR2FtZVJlc3RvcmVVSVwiLGNhbGxiYWNrRnVuYyxjYWxsYmFja0Z1bmMpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImVycm9yUmVTdGFydFRpbWVzID0gbnVtICUgMyAhPSAwIFwiICsgZXJyb3JSZVN0YXJ0VGltZXMpXHJcbiAgICAgICAgICAgICAgICByZXFDaGVja1ZlcnNpb25GdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImVycm9yUmVTdGFydFRpbWVzID0gbnVsbCAgXCIpXHJcbiAgICAgICAgICAgIHJlcUNoZWNrVmVyc2lvbkZ1bmMoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQ0NfUFJFVklFVykvL+mYsuatouS4jeWwj+W/g+aJk+W8gOadpeabtOaWsOWHuuWOu+WHuumUmVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLnJlcUNoZWNrVmVyc2lvbigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+mqjOivgeacjeWKoeWZqOmFjee9ruS4juacrOWcsOmFjee9rlxyXG4gICAgcHJpdmF0ZSB2ZXJpZnlTZXJ2ZXJDZmcobXNnKSB7XHJcbiAgICAgICAgLy/pqozor4HmiJDlip/vvIzkuI3lgZrmk43kvZxcclxuICAgICAgICAvLyBpZiAoR2xvYmFsLlRvb2xraXQubWQ1KG1zZykgPT0gR2xvYmFsLlRvb2xraXQubWQ1KHRoaXMuY2FjaGVkU2VydmVyQ29udGVudCkpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy9AdG9kb+aPkOekuuacjeWKoeWZqOabtOaWsO+8jOi/lOWbnuWIsGxvYWRpbmfnlYzpnaJcclxuICAgICAgICAvLyB0aGlzLmhhbmRsZUFwcENvbmZpZyhtc2cpO1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcInZlcmlmeVNlcnZlckNmZyBtc2cgPSBcIiArIG1zZylcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJ2ZXJpZnlTZXJ2ZXJDZmcgY2FjaGVkU2VydmVyQ29udGVudCA9IFwiICsgdGhpcy5jYWNoZWRTZXJ2ZXJDb250ZW50KVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoZWNrU2VydmVyQ2ZnKG1zZywgdGhpcy5jYWNoZWRTZXJ2ZXJDb250ZW50KTtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJ2ZXJpZnlTZXJ2ZXJDZmcgY2hlY2tTZXJ2ZXJDZmcgcmVzdWx0ID0gXCIgKyByZXN1bHQpXHJcbiAgICAgICBcclxuICAgICAgICBpZiAocmVzdWx0ID09IDQpIHtcclxuICAgICAgICAgICAgLy/mnI3liqHlmajmlbDmja7pqozor4HkuI3pgJrov4cgIOmcgOimgeWIh+aNoue7p+e7reivt+axglxyXG4gICAgICAgICAgICB0aGlzLnZlcmlmeVNlcnZlckNmZ0Vycm9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXBvcnREYXRhVXJsU3BlZWQoMSlcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5kYXRhVXJsSW5kZXggPSB0aGlzLnVybEluZGV4O1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLmN1ckRhdGFVcmwgPSB0aGlzLmdldENvbmZpZ1VybCgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCLmnI3liqHlmajphY3nva7mm7TmlrBcIilcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5BcHBDb25maWdDb250ZW50LCBtc2cpO1xyXG4gICAgICAgIGxldCBkZWNvZGVNc2cgPSBHbG9iYWwuQUVTVXRpbC5kZWNvZGVNc2cobXNnKTtcclxuICAgICAgICBsZXQgc2VydmVyQ2ZnID0gSlNPTi5wYXJzZShkZWNvZGVNc2cpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tYXBwY29uZmlnLS0tLS0tXCIsIGRlY29kZU1zZylcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5wYXJzZVNlcnZlckluZm8oc2VydmVyQ2ZnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVwb3J0RGF0YVVybFNwZWVkKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcclxuICAgICAgICBsZXQgdGltZSA9IGVuZFRpbWUgLSB0aGlzLl9zdGFydFRpbWUgXHJcbiAgICAgICAgaWYodGhpcy5fc3RhcnRUaW1lICE9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVwb3J0UGFyYW0gPSB7IFwidGltZVwiOiB0aW1lLCAgXCJkYXRhX3VybFwiOiB0aGlzLmdldENvbmZpZ1VybCgpLFwicmVwb3J0VHlwZVwiOnR5cGV9XHJcbiAgICAgICAgICAgIGxldCByZXBvcnRLZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RBVEFfUk9VVEVcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0UHVibGljQ2xpZW50TG9nKHJlcG9ydEtleSwgdGhpcy5yZXBvcnRQYXJhbSwgZmFsc2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8wICDkuI3lgZrmk43kvZwgIDEg5YiH5Zue5Yiw55m75b2V55WM6Z2iICAyIOmHjeWQr+a4uOaIjyAgM+S4jeaTjeS9nCA0IGRhdGHmlbDmja7mnInpl67popgg6ZyA6KaB5YiH5o2i5LiL5LiA5LiqIDUgXHJcbiAgICBwcml2YXRlIGNoZWNrU2VydmVyQ2ZnKHN2ck1zZywgbG9jYWxNc2cpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQubWQ1KHN2ck1zZykgPT0gR2xvYmFsLlRvb2xraXQubWQ1KGxvY2FsTXNnKSlcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgbGV0IHNlckNmZyA9IHRoaXMuc2FmZURlY29kZShzdnJNc2cpO1xyXG4gICAgICAgIGlmIChzZXJDZmcgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgbGV0IGxvY2FsQ2ZnID0gdGhpcy5zYWZlRGVjb2RlKGxvY2FsTXNnKTtcclxuICAgICAgICBpZiAobG9jYWxDZmcgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcblxyXG4gICAgICAgIC8vc2VydmVyUm91dGVz5Y+Y5YyW6ZyA6KaB6YeN5ZCvXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGxvY2FsUm91dGVzU3RyID0gSlNPTi5zdHJpbmdpZnkobG9jYWxDZmcucm91dGVzKTtcclxuICAgICAgICAgICAgbGV0IHN2clJvdXRlc1N0ciA9IEpTT04uc3RyaW5naWZ5KHNlckNmZy5yb3V0ZXMpO1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQubWQ1KGxvY2FsUm91dGVzU3RyKSAhPSBHbG9iYWwuVG9vbGtpdC5tZDUoc3ZyUm91dGVzU3RyKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAzO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzYWZlRGVjb2RlKGNmZykge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJDZmcgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkZWNvZGVNc2cgPSBHbG9iYWwuQUVTVXRpbC5kZWNvZGVNc2coY2ZnKTtcclxuICAgICAgICAgICAgc2VydmVyQ2ZnID0gSlNPTi5wYXJzZShkZWNvZGVNc2cpO1xyXG4gICAgICAgICAgICAvL3JvdXRlcyDkuLrnqbog6aqM6K+B5LiN6YCa6L+HXHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJDZmcucm91dGVzID09IG51bGwgfHwgIXNlcnZlckNmZy5yb3V0ZXMubGVuZ3RoIHx8IHNlcnZlckNmZy5yb3V0ZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcnZlckNmZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkYXRhIHJvdXRlcyBpcyBudWxsIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkIGFwcCBlcnJvclwiLCBjZmcpO1xyXG4gICAgICAgICAgICBzZXJ2ZXJDZmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VydmVyQ2ZnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDmjqXlj6MgQ2hlY2tFZGl0aW9uIOeJiOacrOS/oeaBr1xyXG4gICAgLyror7fmsYJcclxuICAgIOaOpeWPoyBDaGVja0VkaXRpb24g54mI5pys5L+h5oGvXHJcbuivt+axglxyXG57XHJcblx0QXBwaWQgICAgICBpbnQzMiAgYGpzb246XCJhcHBpZFwiYFxyXG5cdEVkaXRpb24gICAgc3RyaW5nIGBqc29uOlwiZWRpdGlvblwiYCAvL+eJiOacrOWPtyBcclxuXHRBcHAgIFx0ICAgc3RyaW5nIGBqc29uOlwiYXBwXCJgIC8vaGw4ODhcclxuXHRQYWNrICAgICAgIGludDMyIGBqc29uOlwicGFja1wiYCAvL+aciea4oOmBk+WPt+WwseW4piBcclxuXHRVaWQgICAgICAgIHVpbnQ2NCBganNvbjpcInVpZFwiYCAvL3VpZCAvL+eUqOaIt2lkICDlv4XpobvluKZcclxuXHRBcHBTb3VyY2UgIHN0cmluZyBganNvbjpcImFwcF9zb3VyY2VcImAgLy9hcHDnlKjnmoTotYTmupDng63mm7TmupDku6Plj7cgIFxyXG5cdFxyXG5cdFxyXG5cdERldmljZSAgICAgQ2xpZW50RGV2SW5mbyBganNvbjpcImRldmljZVwiYCDlv4XpobvluKZcclxufVxyXG5DbGllbnREZXZJbmZvIOe7k+aehFxyXG50eXBlIENsaWVudERldkluZm8gc3RydWN0IHtcclxuXHREZXZpY2VJZCAgIHN0cmluZyBganNvbjpcImRldmljZV9pZFwiYCAgIC8v6K6+5aSHSUQgICDlv4XpobvluKZcclxuXHRQaG9uZU1vZGVsIHN0cmluZyBganNvbjpcInBob25lX21vZGVsXCJgIC8v5omL5py65Z6L5Y+3IGlwaG9uZTZzICDlv4XpobvluKZcclxuXHRPc1R5cGUgICAgIGludDMyICBganNvbjpcIm9zX3R5cGVcImAgICAgIC8vMSB3ZWIgMiBhb3MgMyBpb3Mg5b+F6aG75bimXHJcblxyXG5cdE9zVmVyc2lvbiBzdHJpbmcgYGpzb246XCJvc192ZXJzaW9uXCJgIC8v57O757uf54mI5pys5Y+3IOW/hemhu+W4plxyXG5cclxuXHRBcHBWZXJzaW9uIHN0cmluZyBganNvbjpcImFwcF92ZXJzaW9uXCJgIC8v5a6i5oi356uv54mI5pys5Y+3IOW/hemhu+W4plxyXG5cclxufVxyXG4gICAgXHJcbiAgICDov5Tlm55cclxuICAgIHtcclxuICAgICAgICBcIl9tb2RcIjogXCJyb290XCIsXHJcbiAgICAgICAgXCJfZnVuY1wiOiBcImNoZWNrdmVyc2lvblwiLFxyXG4gICAgICAgIFwiX3BhcmFtXCI6IHtcclxuICAgICAgICAgICAgXCJmb3JjZV91cGRhdGVfdXJsXCI6IFwiaHR0cHM6Ly93d3cuYmFpZHUuY29tXCIsIC8vIOW8uuabtOabtOaWsOWcsOWdgFxyXG4gICAgICAgICAgICBcImhhbGxfdXBkYXRlX3VybFwiOiBcImh0dHBzOi8vd3d3LmJhaWR1LmNvbVwiLCAvLyDlpKfljoXmm7TmlrDlnLDlnYBcclxuICAgICAgICAgICAgXCJmb3JjZV92ZXJzaW9uXCI6IFwiMS4wLjFcIiwgLy8g5by65pu054mI5pys5Y+3XHJcbiAgICAgICAgICAgIFwiaGFsbF92ZXJzaW9uXCI6IFwiMS4wLjVcIiAvLyDlpKfljoXniYjmnKzlj7dcclxuICAgICAgICB9XHJcbiAgICB9ICovXHJcbiAgICAvL+ivt+axguajgOafpeeJiOacrOabtOaWsFxyXG4gICAgcHVibGljIHJlcUNoZWNrVmVyc2lvbigpIHtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge307XHJcbiAgICAgICAgcGFyYW0uYXBwaWQgPSBHbG9iYWwuU2V0dGluZy5hcHBJZDtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5jaGVja1ZlcnNpb25BcHAgPSBwYXJhbS5hcHBpZFxyXG4gICAgICAgIGxldCBtZWdlU2VydmVyRmxhZyA9IEdsb2JhbC5Ub29sa2l0LmNoZWNrTWVnZVNlcnZlcigpXHJcbiAgICAgICAgaWYobWVnZVNlcnZlckZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXJhbS5vbGRfYXBwX2lkID0gTnVtYmVyKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSUQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtLmVkaXRpb24gPSAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbihcImhhbGxcIix0cnVlLHRoaXMubWFuaWZlc3ROYXRpdmVVcmwpIFxyXG4gICAgICAgIC8vIHBhcmFtLmFwcCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8udmVuZG9yQ2hhbm5lbDtcclxuICAgICAgICBwYXJhbS5wYWNrID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uZ2V0UmVnaXN0Q2hhbm5lbCgpO1xyXG4gICAgICAgIHBhcmFtLnVpZCA9IE51bWJlcihHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5VaWQpKSB8fCAwO1xyXG4gICAgICAgIHBhcmFtLmFwcF9zb3VyY2UgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcENvbnN0VXJsO1xyXG4gICAgICAgIHBhcmFtLmFwcF9pbmRlcGVuZGVudF90YWcgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnBhY2thZ2VUYWc7XHJcbiAgICAgICAgcGFyYW0uaGFsbF9za2luID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5oYWxsU2tpbjtcclxuICAgICAgICBwYXJhbS5kZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQuZ2V0Rmlyc3RPcGVuVGltZSgpO1xyXG5cclxuICAgICAgICBMb2dnZXIubG9nKFwiYmVnaW4gY2hlY2sgdmVyc2lvblwiKVxyXG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX0NIRUNLX0xBQkVMLCB7IHBhcm06IFwi5q2j5Zyo6I635Y+W54Ot5pu06YWN572uLi4uXCIgfSlcclxuICAgICAgICBsZXQgc3RhcnRSZXF1ZXN0Q2hlY2t2ZXJzaW9uID0gKCk9PntcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZENoZWNrVmVyc2lvbihOZXRDaGVja1ZlcnNpb24uY2hlY2t2ZXJzaW9uLCBwYXJhbSwgdGhpcy5yZXNwQ2hlY2tWZXJzaW9uLmJpbmQodGhpcyksIHRoaXMucmVzcENoZWNrVmVyc2lvbkVycm9yLmJpbmQodGhpcyksIHRydWUpO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnREZXZpY2UoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9TVEFSVF9DSEVDS1ZFUlNJT04pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIpOaWreW9k+WJjeaYr+WQpuacieWPr+eUqOe6v+i3r1xyXG4gICAgICAgIHRoaXMuY2xlYXJJbnRlcnZhbFRpbWVyKCk7XHJcbiAgICAgICAgbGV0IGdsb2JhbFJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2xvYmFsUm91dGVzXHJcbiAgICAgICAgaWYgKGdsb2JhbFJvdXRlcyAmJiBnbG9iYWxSb3V0ZXMuZ2V0Q3VyUm91dGUoKSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuacieWPr+eUqOe6v+i3r1wiKVxyXG4gICAgICAgICAgICBzdGFydFJlcXVlc3RDaGVja3ZlcnNpb24oKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5peg5Y+v55So57q/6LevXCIpXHJcbiAgICAgICAgICAgIC8v5peg5Y+v55So57q/6Lev5bm25LiU5pyJ55u+5L2G5piv6L+Y5pyq5Yid5aeL5YyW5oiQ5Yqf5YiZ562J5b6F55u+5Yid5aeL5YyW5oiQ5Yqf5YaN6K+35rGCXHJcbiAgICAgICAgICAgIGxldCB0aW1lcyA9IDA7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcInN0YXJ0UmVxdWVzdENoZWNrdmVyc2lvblwiLDE1LFwiXCIsMSxmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aW1lcyArKztcclxuICAgICAgICAgICAgICAgIGxldCBnbG9iYWxSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmdsb2JhbFJvdXRlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFJvdXRlcyAmJiBnbG9iYWxSb3V0ZXMuZ2V0Q3VyUm91dGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckludGVydmFsVGltZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFJlcXVlc3RDaGVja3ZlcnNpb24oKVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6LaF6L+HMTBzIOWImei/m+ihjOW8ueahhuaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aW1lcyA+PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJbnRlcnZhbFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi572R57uc6L+e5o6l6LaF5pe277yM6K+35qOA5p+l5ZCO6YeN6K+VLURcIiwgdGhpcy5yZXFDaGVja1ZlcnNpb24uYmluZCh0aGlzKSwgdGhpcy5yZXFDaGVja1ZlcnNpb24uYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhckludGVydmFsVGltZXIoKXtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HKTtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxUaW1lcil7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxUaW1lcilcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxUaW1lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ludGVydmFsVGltZXIgPSBudWxsXHJcblxyXG5cclxuICAgIHB1YmxpYyByZXNwQ2hlY2tWZXJzaW9uRXJyb3IoZGF0YSkge1xyXG4gICAgICAgIGxldCBjaGVja0Z1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXFDaGVja1ZlcnNpb24oKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuX2VycnN0cikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChkYXRhLl9lcnJzdHIsIGNoZWNrRnVuYy5iaW5kKHRoaXMpLCBjaGVja0Z1bmMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmo4Dmn6XniYjmnKzmm7TmlrDlpLHotKVcIiwgY2hlY2tGdW5jLmJpbmQodGhpcyksIGNoZWNrRnVuYy5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibmVlZFJlc3RhcnRcIiwgMilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzcENoZWNrVmVyc2lvbihkYXRhKSB7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOajgOafpeeJiOacrOeahOWbnuWkjVwiLEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm5lZWRSZXN0YXJ0XCIsIDIpXHJcbiAgICAgICAgLy8gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpO1xyXG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX0NIRUNLX0xBQkVMLCB7IHBhcm06IFwi5qOA5p+l5pu05paw5LitLi4uXCIgfSlcclxuICAgICAgICBpZighZGF0YSB8fCBHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KGRhdGEpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmnI3liqHlmajnu7TmiqTkuK3vvIzor7fnqI3lkI7lho3or5UhXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIEdsb2JhbC5BcHBVcGRhdGVIZWxwZXIuY2hlY2tWZXJzaW9uRGF0YSA9IGRhdGFcclxuICAgICAgICBsZXQgZm9yY2VfdXBkYXRlX3VybCA9IGRhdGEuZm9yY2VfdXBkYXRlX3VybFxyXG4gICAgICAgIC8v5paw5aKe5a2X5q61XHJcbiAgICAgICAgbGV0IG9mZmljaWFsX3VybCA9IGRhdGEub2ZmaWNpYWxfdXJsIC8v5a6Y572R5Zyw5Z2AXHJcbiAgICAgICAgaWYgKG9mZmljaWFsX3VybCAhPSBudWxsICYmIG9mZmljaWFsX3VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlVybHMuZG93bkxvYWRVcmwgPSBvZmZpY2lhbF91cmxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5pu05pawVXJsXHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5mb3JjZVVwYXRlVXJsID0gZm9yY2VfdXBkYXRlX3VybFxyXG5cclxuICAgICAgICBpZihkYXRhLnNlcnZlcl9pZCApIC8v6YeN5paw5L2/55So5pyN5Yqh5Zmo55Sf5oiQ55qEaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlNlcnZlckRldmljZUlkLCBkYXRhLnNlcnZlcl9pZC50cmltKCkpO1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnNlcnZlcl9pZCA9IGRhdGEuc2VydmVyX2lkXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnBhcnNlQ2hlY2tWZXJzaW9uQ2ZnKGRhdGEpO1xyXG5cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5QYXJzZURlYnVnQ29uZmlnKGRhdGEsIE51bWJlcihHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5VaWQpKSB8fCAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3nu7TmiqTlhazlkYpcclxuICAgICAgICBpZiAodGhpcy5zdGFydEdhbWVNYWludGFpbkxvZ2ljKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXBwX2hpdF9oYWxsX3VybHMgPSBkYXRhLmFwcF9oaXRfaGFsbC51cmxcclxuICAgICAgICBsZXQgYXBwX2hpdF9oYWxsX3VybHNfbmV3ID0gZGF0YS5hcHBfaGl0X2hhbGwubmV3X3VybFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIGxldCByb3V0ZXMgPSBhcHBfaGl0X2hhbGxfdXJsc19uZXdcclxuICAgICAgICBpZiAoIXJvdXRlcyB8fCByb3V0ZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcm91dGVzID0gR2xvYmFsLlVybFV0aWwudHJhbnNmZXJVcmxBcnJheVRvUm91dGVzKGFwcF9oaXRfaGFsbF91cmxzKSBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkR1bkhvdFVwZGF0ZVVybFNldHRpbmcuaG90VXBkYXRlUm91dGVDZmcgPSByb3V0ZXNcclxuICAgICAgICAvL+eDreabtOWQjuWGjeWIpOaWreW8uuabtFxyXG4gICAgICAgIHRoaXMuc3RhcnRIb3RVcGRhdGVMb2dpYyhkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRHYW1lTWFpbnRhaW5Mb2dpYyhkYXRhKSB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZV9ub3RpY2UgPSBkYXRhLnVwZGF0ZV9ub3RpY2UgLy/lpKfljoXnu7TmiqTlhazlkYpcclxuICAgICAgICAvL+ajgOa1i+aYr+WQpue7tOaKpFxyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNTaG93VXBkYXRlTm90aWNlV25kKHVwZGF0ZV9ub3RpY2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1VwZGF0ZU5vdGljZVduZCh1cGRhdGVfbm90aWNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRIb3RVcGRhdGVMb2dpYyhkYXRhKSB7XHJcbiAgICAgICAgbGV0IGFwcF9oaXRfaGFsbCA9IGRhdGEuYXBwX2hpdF9oYWxsIC8v5aSn5Y6F5paw54mI5pys54Ot5pu0XHJcbiAgICAgICAgbGV0IGhhbGxfdXBkYXRlX3VybCA9IFwiXCJcclxuICAgICAgICBsZXQgaGFsbF92ZXJzaW9uID0gXCJcIlxyXG4gICAgICAgIGxldCBoYWxsVXBkYXRlUGF0aCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGFwcF9oaXRfaGFsbCAmJiBhcHBfaGl0X2hhbGwudmVyc2lvbiApIHtcclxuICAgICAgICAgICAgaGFsbF92ZXJzaW9uID0gYXBwX2hpdF9oYWxsLnZlcnNpb25cclxuICAgICAgICAgICAgaGFsbF91cGRhdGVfdXJsID0gZGF0YS5oYWxsX3VwZGF0ZV91cmxcclxuICAgICAgICAgICAgaWYgKGFwcF9oaXRfaGFsbC5wYXJhbSApIHtcclxuICAgICAgICAgICAgICAgIC8v6L+b6KGM54Ot5pu057q/6Lev6YCJ5oupXHJcbiAgICAgICAgICAgICAgICBsZXQgYXBwX2hpdF9oYWxsX3VybHMgPSBhcHBfaGl0X2hhbGwudXJsXHJcbiAgICAgICAgICAgICAgICBsZXQgYXBwX2hpdF9oYWxsX3VybHNfbmV3ID0gYXBwX2hpdF9oYWxsLm5ld191cmxcclxuICAgICAgICAgICAgICAgIGhhbGxVcGRhdGVQYXRoID0gYXBwX2hpdF9oYWxsLnBhcmFtXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmxBcnJheSA9IGFwcF9oaXRfaGFsbF91cmxzX25ld1xyXG4gICAgICAgICAgICAgICAgaWYoIWFwcF9oaXRfaGFsbF91cmxzX25ldyB8fCBhcHBfaGl0X2hhbGxfdXJsc19uZXcubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXkgPSBhcHBfaGl0X2hhbGxfdXJsc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB1cmxfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yUmVTdGFydFRpbWVzID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZXJyb3JSZVN0YXJ0VGltZXNcIilcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvclJlU3RhcnRUaW1lcyAhPSBudWxsICYmIGVycm9yUmVTdGFydFRpbWVzICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG9yYWdlX2hhbGxfdXJscyA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkhvdFVwZGF0ZUhvc3RzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdG9yYWdlX2hhbGxfdXJscyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1NhbWVBcnJheSA9IEdsb2JhbC5Ub29sa2l0LmNvbXBhcmVBcnJheVNvcnQoc3RvcmFnZV9oYWxsX3VybHMsR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1NhbWVBcnJheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBfaGl0X2hhbGxfdXJscyA9IHN0b3JhZ2VfaGFsbF91cmxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkhvdFVwZGF0ZUhvc3RzLEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybEFycmF5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsX2luZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gID0gTnVtYmVyKGVycm9yUmVTdGFydFRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmxfbGVuZ3RoID0gR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bSAmJiB1cmxfbGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInN0YXJ0SG90VXBkYXRlTG9naWMgZXJyb3JSZVN0YXJ0VGltZXMgPSBcIiArIGVycm9yUmVTdGFydFRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmxfaW5kZXggPSBudW0gJSB1cmxfbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGFsbF91cGRhdGVfdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXlbdXJsX2luZGV4XVxyXG4gICAgICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXlbMF0gJiYgR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsQXJyYXlbMF1bXCJob3N0XCJdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVybF9pbmRleD4wKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkR1bkhvdFVwZGF0ZVVybFNldHRpbmcuc3dpdGNoUm91dGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBoYWxsX3VwZGF0ZV91cmwgPSBHbG9iYWwuRHVuSG90VXBkYXRlVXJsU2V0dGluZy5ob3RVcGRhdGVVcmxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic3RhcnRIb3RVcGRhdGVMb2dpYyBoYWxsX3VwZGF0ZV91cmwgPSBcIiArIGhhbGxfdXBkYXRlX3VybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmwgPSBoYWxsX3VwZGF0ZV91cmxcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5oYWxsTmV3VmVyc2lvbiA9IGhhbGxfdmVyc2lvblxyXG4gICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhhbGxVcGRhdGVQYXRoID0gaGFsbFVwZGF0ZVBhdGg7XHJcbiAgICAgICAgbGV0IGhvdFVwZGF0ZVByb3h5ID0gPEFwcEhvdFVwZGF0ZVByb3h5PnRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoQXBwSG90VXBkYXRlUHJveHkuTkFNRSlcclxuICAgICAgICAgICAgaG90VXBkYXRlUHJveHkucHJlVXBkYXRlKGhhbGxfdXBkYXRlX3VybCwgaGFsbF92ZXJzaW9uLGhhbGxVcGRhdGVQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgc2hvd1VwZGF0ZU5vdGljZVduZCh1cGRhdGVfbm90aWNlKSB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZV9ub3RpY2VfY29udGVudCA9IHVwZGF0ZV9ub3RpY2UuY29udGVudCAvL+e7tOaKpOWFrOWRiuWGheWuuVxyXG4gICAgICAgIGxldCB1cGRhdGVfbm90aWNlX29uX3RpbWUgPSB1cGRhdGVfbm90aWNlLm9uX3RpbWUgLy8g57u05oqk5byA5aeL5pe26Ze0XHJcbiAgICAgICAgbGV0IHVwZGF0ZV9ub3RpY2VfZG93bl90aW1lID0gdXBkYXRlX25vdGljZS5kb3duX3RpbWUgLy/nu7TmiqTnu5PmnZ/ml7bpl7RcclxuICAgICAgICBsZXQgZW5kVGltZSA9IHVwZGF0ZV9ub3RpY2VfZG93bl90aW1lXHJcbiAgICAgICAgbGV0IG9ubGluZUN1c3RvbUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChHbG9iYWwuU2V0dGluZy5VcmxzLm9ubGluZVNlcnZpY2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9mZmljaWFsV2ViQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsXHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbG9zZUNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlcUNoZWNrVmVyc2lvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kR2FtZU1haW50YWluVUlcIiwgdXBkYXRlX25vdGljZV9jb250ZW50LCBlbmRUaW1lLCBvbmxpbmVDdXN0b21DYWxsYmFjaywgb2ZmaWNpYWxXZWJDYWxsYmFjaywgY2xvc2VDYWxsYmFjaylcclxuXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNTaG93VXBkYXRlTm90aWNlV25kKHVwZGF0ZV9ub3RpY2UpIHtcclxuICAgICAgICBsZXQgbm93VGltZSA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh1cGRhdGVfbm90aWNlICYmIHVwZGF0ZV9ub3RpY2UuZG93bl90aW1lICE9IG51bGwgJiYgdXBkYXRlX25vdGljZS5kb3duX3RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkb3duX3RpbWUgPSB1cGRhdGVfbm90aWNlLmRvd25fdGltZVxyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0X3RpbWUgPSBkb3duX3RpbWUgLSBub3dUaW1lXHJcbiAgICAgICAgICAgIGlmIChvZmZzZXRfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJlcG9ydFVybChjZmcpIHtcclxuICAgICAgICBpZighY2ZnKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHVybCA9IGNmZ1t0aGlzLnVybEluZGV4XTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG5cclxuICAgIH1cclxufSJdfQ==