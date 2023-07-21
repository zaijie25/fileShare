
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/ReportTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '176d1DzNgNF77+KcXLiSK1k', 'ReportTool');
// hall/scripts/logic/core/tool/ReportTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportTool = void 0;
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var ServerRoutes_1 = require("../setting/ServerRoutes");
var ReportTool = /** @class */ (function () {
    function ReportTool() {
        this.logUrlsList = [];
        this.reportUrl = "";
        //上报调试日志开关，通过checkversion下发，rootadmin控制
        this.debugEnable = false;
        //debug uid 。 防止切换账号问题
        this.debugUid = 0;
        //当前使用的线路索引
        this.curIndex = 0;
        //上报次数
        this.reportTimes = 0;
        //日志是否合并上报
        this.merge = true;
        //缓存日志上限 默认5条
        this.maxLogCount = 5;
        //缓存日志时间上限 默认5分钟 秒数
        this.maxLogCacheInterval = 5 * 60;
        //缓存日志DeBug
        this.LogCache = new Array();
        //缓存日志定时器
        this.logCacheInterval = 0;
        //测试字段 (测试条数)
        // private testCount = 200;
        //测试字段 (已经产生的日志数)
        // private testNum = 0;
        //热更失败只上报一次
        this.hotUpdateReport = {};
        //每60秒写一次到缓存
        this.RECODE_TIME = 60;
        this.REQUEST_SUCCESS = "sCount";
        this.REQUEST_FAILED = "fCount";
        this.interval = 0;
        //记录成功的请求次数和域名
        this.requestResultMap = {};
        this.socketResultMap = {};
        //上报总数据结构
        this.recordTab = {};
        //热更结束之后，才可以写本地缓存，防止restart 导致日志重复上报
        this.canRecord = false;
    }
    //暂定为appdata修改，重启app生效
    ReportTool.prototype.init = function () {
        Global.Event.off(GlobalEvent.RefreshHallNetCost, this, this.onRefreshHallCostTime);
        Global.Event.on(GlobalEvent.RefreshHallNetCost, this, this.onRefreshHallCostTime);
        this.reportTimes = 0;
        this.loadLocalLogUrls();
        // if(url && url.indexOf("http") > -1)
        //     this.reportUrl = url;
        this.initReportUrl();
    };
    ReportTool.prototype.getReportUrl = function () {
        var reportUrl = Global.Setting.storage.get(HallStorageKey_1.default.ReportUrl);
        if (reportUrl == '') {
            Logger.error("reportUrl = null");
            return;
        }
        var tempUrl = JSON.parse(reportUrl);
        if (tempUrl) {
            var url = tempUrl.split('/c')[0];
            this.logUrlsList = [url];
            this.reportUrl = url + "/logCenter/";
        }
    };
    //判断host是否是reportUrl
    ReportTool.prototype.isReportUrl = function (reportUrl) {
        var host = reportUrl.realHost;
        var returnValue = false;
        for (var i = 0; i < this.logUrlsList.length; i++) {
            var url = this.logUrlsList[i];
            if (url.indexOf(host) > -1) {
                returnValue = true;
            }
        }
        return returnValue;
    };
    ReportTool.prototype.loadLocalLogUrls = function () {
        var urlsStr = Global.Setting.storage.get(HallStorageKey_1.default.ReportUrl);
        var arr = [];
        try {
            if (urlsStr != null && urlsStr != "") {
                var t = JSON.parse(urlsStr);
                arr.push(t);
            }
        }
        catch (e) {
            Logger.error("解析ReportUrl失败", urlsStr);
        }
        if (arr == null || arr.length == 0)
            return;
        //过滤无效日志
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].indexOf("http") == -1) {
                Logger.error("过滤无效域名:", arr[i]);
                arr.splice(i, 1);
            }
        }
        if (arr.length > 0)
            this.logUrlsList = arr;
        //处理多地址同host
        this.logUrlsList = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(this.logUrlsList);
    };
    ReportTool.prototype.initReportUrl = function () {
        var length = this.logUrlsList.length;
        if (length == 0) {
            Logger.error("Report URL is null");
            return;
        }
        this.curIndex = Global.Toolkit.getRoundInteger(length, 0);
        this.refreshReportUrl();
        // if(this.logUrlsList[randIndex] && this.logUrlsList[randIndex].indexOf("http") > -1)
        // {
        //     this.reportUrl = this.logUrlsList[randIndex] + "/logCenter/";
        // }
    };
    ReportTool.prototype.refreshReportUrl = function () {
        if (this.curIndex >= this.logUrlsList.length || !this.logUrlsList[this.curIndex]) {
            this.curIndex = 0;
            Logger.error("curIndex is null !! , curIndex =" + this.curIndex);
            return;
        }
        if (this.logUrlsList[this.curIndex].indexOf("http") > -1) {
            this.reportUrl = this.logUrlsList[this.curIndex] + "/logCenter/";
        }
        else {
            this.reportUrl = "https://" + this.logUrlsList[this.curIndex] + "/logCenter/";
        }
    };
    ReportTool.prototype.changeReportUrl = function () {
        this.curIndex = (this.curIndex + 1) % this.logUrlsList.length;
        this.refreshReportUrl();
    };
    ReportTool.prototype.ParseDebugConfig = function (config, uid) {
        if (config.debug && config.debug == 1) {
            Global.ReportTool.debugEnable = true;
            this.debugUid = uid;
        }
    };
    //**
    // * 上报客户端日志
    // * @param key 日志标识
    // * @param param 上报内容
    // * 只有debugEnable为true时生效 用于灰度上报
    // */
    ReportTool.prototype.ReportPublicDebugLog = function (key, param) {
        if (!this.debugEnable || this.debugUid != this.uid)
            return;
        // this.ReportLogInternal(ReportTool.DEBUG_LOG, key, param);
        this.ReportLogMixing(ReportTool.DEBUG_LOG, key, param);
    };
    ReportTool.prototype.ReportPublicClientLog = function (key, param, bacth) {
        if (bacth === void 0) { bacth = false; }
        // this.ReportLogInternal(ReportTool.DEBUG_LOG, key, param,bacth);
        //测试日志系统方法
        // this.testLogCacheFunc();
        this.ReportLogMixing(ReportTool.DEBUG_LOG, key, param);
    };
    ReportTool.prototype.genHallKey = function (key) {
        return "Hall_" + key;
    };
    ReportTool.prototype.genGameKey = function (key) {
        var gid = Game.Control.curGid;
        return "Game_" + gid + "_" + key;
    };
    //**
    // * 上报客户端错误日志
    // * @param key 日志标识
    // * @param param 上报内容
    // */
    ReportTool.prototype.ReportClientError = function (key, param) {
        //热更上报只上报一次
        if (key == ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR) {
            var gameType = param.game;
            if (!gameType) {
                return;
            }
            if (this.hotUpdateReport[gameType]) {
                return;
            }
            this.hotUpdateReport[gameType] = 1;
        }
        this.reportTimes++;
        // this.ReportLogInternal(ReportTool.ERROR_LOG, key, param);
        this.ReportLogMixing(ReportTool.ERROR_LOG, key, param);
    };
    //上报设备信息
    ReportTool.prototype.ReportDevice = function (type) {
        var _this = this;
        this.getReportUrl();
        if (this.reportUrl == '')
            return;
        var url = this.reportUrl + "basic?";
        var param = this.genDeviceParam();
        param._param.stype = type;
        var serverUlr = new ServerRoutes_1.ServerUrl();
        serverUlr.parse(url);
        if (cc.sys.os == cc.sys.OS_IOS) {
            Logger.log("ReportDevice ios param:" + param);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            Logger.log("ReportDevice android param:" + param);
        }
        Global.Http.send(serverUlr, param, function () { }, function () {
            _this.changeReportUrl();
        });
    };
    ReportTool.prototype.GetReportTimes = function () {
        return this.reportTimes;
    };
    Object.defineProperty(ReportTool.prototype, "phoneCode", {
        get: function () {
            return Global.Setting.storage.get(HallStorageKey_1.default.AreaCode) || "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "loginIp", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.ip)
                return Global.PlayerData.ip;
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "uid", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.uid)
                return Global.PlayerData.uid;
            return Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "vip", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.vip)
                return Global.PlayerData.vip;
            return Number(Global.Setting.storage.get(HallStorageKey_1.default.VIPLevel)) || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "packId", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.pack)
                return Global.PlayerData.pack;
            return Number(Global.Setting.storage.get(HallStorageKey_1.default.Channel)) || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "hallSkin", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.hallSkin) {
                return Global.Setting.SystemInfo.hallSkin;
            }
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "gameSkin", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.gameSkin) {
                return Global.Setting.SystemInfo.gameSkin;
            }
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "packageTag", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.packageTag) {
                return Global.Setting.SystemInfo.packageTag;
            }
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "pid", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.pid)
                return Global.PlayerData.pid;
            return Number(Global.Setting.storage.get(HallStorageKey_1.default.InviteCode)) || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "userType", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.type)
                return Global.PlayerData.type;
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "udid", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.udid)
                return Global.Setting.SystemInfo.udid.toString();
            return "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "entry", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.entry)
                return Global.Setting.SystemInfo.entry.toString();
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "sign_type", {
        get: function () {
            if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.sign_type)
                return Global.Setting.SystemInfo.sign_type.toString();
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "appId", {
        get: function () {
            if (Global.Setting.appId)
                return Global.Setting.appId;
            return Global.Setting.SystemInfo.appID;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "osType", {
        get: function () {
            if (!cc.sys.isNative)
                return 0;
            if (cc.sys.os == cc.sys.OS_ANDROID)
                return 1;
            if (cc.sys.os == cc.sys.OS_IOS)
                return 2;
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReportTool.prototype, "phone", {
        get: function () {
            if (Global.PlayerData && Global.PlayerData.phone)
                return Global.PlayerData.phone;
            return Global.Setting.storage.get(HallStorageKey_1.default.Phone) || "";
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param type 日志类型
     * @param key 日志标识key
     * @param contentTab 参数
     * @param bacth 是否多条
     */
    ReportTool.prototype.ReportLogInternal = function (type, key, contentTab, bacth) {
        var _this = this;
        if (bacth === void 0) { bacth = false; }
        this.getReportUrl();
        if (this.reportUrl == '')
            return;
        if (contentTab == null)
            contentTab = {};
        if (Global.Setting.SystemInfo == null)
            return;
        var suffix = "clis?";
        if (bacth) {
            suffix = "batchclis?";
        }
        var url = this.reportUrl + suffix;
        var paramTab = {};
        paramTab._mod = "logAgent";
        paramTab._func = "clientLog";
        var param = {};
        //大类型
        param.class = type;
        //子类型
        param.sub_class = key;
        var contentStr = "";
        try {
            contentStr = JSON.stringify(contentTab);
        }
        catch (_a) {
            contentStr = "";
        }
        //上报具体内容
        param.content = contentStr;
        if (contentTab.error_code) {
            param.error_code = contentTab.error_code;
        }
        if (contentTab.htime || contentTab.hTime) {
            if (contentTab.htime) {
                param.htime = contentTab.htime;
            }
            if (contentTab.hTime) {
                param.htime = contentTab.hTime;
            }
        }
        this.packLogParam(param);
        paramTab._param = param;
        var serverUlr = new ServerRoutes_1.ServerUrl();
        serverUlr.parse(url);
        Global.Http.send(serverUlr, paramTab, function () { }, function () {
            _this.changeReportUrl();
        });
    };
    //合并上报接口
    ReportTool.prototype.ReportLogMergeInternal = function (params) {
        var _this = this;
        this.getReportUrl();
        if (this.reportUrl == '')
            return;
        if (params == null)
            params = {};
        if (Global.Setting.SystemInfo == null)
            return;
        var paramTab = {};
        paramTab._mod = "logAgent";
        paramTab._func = "clientLog";
        paramTab._param = params;
        var suffix = "batchclis?";
        var url = this.reportUrl + suffix;
        var serverUlr = new ServerRoutes_1.ServerUrl();
        serverUlr.parse(url);
        Global.Http.send(serverUlr, paramTab, function () { }, function () {
            _this.changeReportUrl();
        });
    };
    //通用log 参数填充
    ReportTool.prototype.packLogParam = function (param) {
        //上报的客户端时间
        param.client_time = Date.now();
        //系统类型
        param.os_type = this.osType;
        //设备id
        param.device_id = Global.Setting.SystemInfo.deviceId;
        //系统版本
        param.os_version = cc.sys.osVersion;
        //包tag
        param.tagInfo = cc.js.formatStr("%s|%s|%s", this.hallSkin, this.gameSkin, this.packageTag);
        //设备型号
        param.phone_model = Global.Setting.SystemInfo.osBuildModel;
        //设备品牌
        param.mobile_brand = Global.Setting.SystemInfo.deviceBrand;
        //appid
        param.app_id = this.appId;
        //系统版本号
        param.app_version = Global.Setting.SystemInfo.appVersion;
        //包名
        param.app_name = Global.Setting.SystemInfo.bundleName;
        //马甲包类型
        param.copy_pack_type = Global.Setting.SystemInfo.nativePlatform;
        //是否第一次安装
        param.is_first = Global.Setting.SystemInfo.firstInstallStatus ? 1 : 0;
        //uid
        param.uid = this.uid;
        param.udid = this.udid;
        param.sign_type = this.sign_type;
        param.entry = this.entry;
        param.ios_type = Global.Toolkit.getIosSignType();
        // vip
        param.vip = this.vip;
        //手机号
        param.mobile = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, this.phone);
        //服务器设备唯一码
        param.server_id = Global.Setting.SystemInfo.server_id || "";
        //大厅版本
        param.hall_version = Global.Toolkit.genLoadingAppInfo();
        //平台id
        param.platform_id = Global.Setting.appDataPlatformId || 0;
        if (Global.SceneManager.inGame())
            param.gid = Game.Control.curGid;
        else
            param.gid = 0;
    };
    ReportTool.prototype.genDeviceParam = function () {
        var paramTab = {};
        paramTab._mod = 'logAgent';
        paramTab._func = "clientLog";
        var param = {};
        var sysInfo = Global.Setting.SystemInfo;
        if (sysInfo == null) {
            Logger.error("sysInfo is null !!!!");
            return;
        }
        //ios签名
        param.ios_sign = sysInfo.appSign;
        //微信key
        param.wx_key = sysInfo.wxKey;
        //极光key
        param.jpush_key = sysInfo.jpushKey;
        //使用的域名列表
        param.data_urls = Global.Setting.dataUrlsList;
        //正在使用的url
        param.data_url = Global.Setting.curDataUrl;
        //设备渠道号
        if (sysInfo.packChannel && !isNaN(Number(sysInfo.packChannel)))
            param.channel_id = Number(sysInfo.packChannel) || 0;
        //appdata渠道id
        param.app_data_channel_id = Global.Setting.ChannelInfo.configChannel;
        //包名
        param.pack_name = sysInfo.bundleName;
        //玩家实际渠道id
        param.pack_id = this.packId;
        //上级id
        param.pid = this.pid;
        //用户类型  0 游客  1 手机
        param.user_type = this.userType;
        //设备型号
        param.phone_model = Global.Setting.SystemInfo.osBuildModel;
        //玩家手机号 或者 缓存手机号
        param.mobile = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, this.phone);
        //手机号码区域
        param.mobile_form = this.phoneCode;
        //登录ip
        param.login_ip = this.loginIp;
        //平台id
        param.platform_id = Global.Setting.appDataPlatformId || 0;
        //大厅版本
        param.hall_version = Global.Toolkit.genLoadingAppInfo();
        param.udid = this.udid;
        param.sign_type = this.sign_type;
        param.entry = this.entry;
        param.ios_type = Global.Toolkit.getIosSignType();
        //剪贴板内容
        if (Global.ChannelUtil.isCliptextVaild())
            param.clipboardContent = Global.Setting.ChannelInfo.clipboardContent || "";
        //模拟器
        param.simulator = sysInfo.simulator;
        this.packLogParam(param);
        paramTab._param = param;
        return paramTab;
    };
    ReportTool.prototype.enableRecord = function () {
        this.canRecord = true;
    };
    ReportTool.prototype.markSuccess = function (serverUrl) {
        if (!serverUrl)
            return;
        this.recordRequestResult(serverUrl, this.REQUEST_SUCCESS);
    };
    ReportTool.prototype.markFailed = function (serverUrl, httpStatus) {
        if (!serverUrl)
            return;
        this.recordRequestResult(serverUrl, this.REQUEST_FAILED, httpStatus);
    };
    //统计socket链接成功失败  error_code = -1 不统计
    ReportTool.prototype.markSocketFailed = function (serverUrl, errorCode) {
        if (!serverUrl)
            return;
        this.recordSocketResult(serverUrl, this.REQUEST_FAILED, errorCode);
    };
    ReportTool.prototype.markSocketSuccess = function (serverUrl) {
        if (!serverUrl)
            return;
        this.recordSocketResult(serverUrl, this.REQUEST_SUCCESS);
    };
    //请求失败或者成功 计数+1
    //type: 1 成功 2 失败
    ReportTool.prototype.recordRequestResult = function (serverUrl, type, httpStatus) {
        if (httpStatus === void 0) { httpStatus = 0; }
        var host = serverUrl.realHost;
        if (!host)
            return;
        if (this.requestResultMap[host] == null) {
            this.requestResultMap[host] = LineRecordInfo.create(serverUrl);
        }
        var info = this.requestResultMap[host];
        if (info == null)
            return;
        if (type == this.REQUEST_FAILED) {
            info.fCount++;
            if (info.errCodeMap[httpStatus] == null)
                info.errCodeMap[httpStatus] = 0;
            info.errCodeMap[httpStatus]++;
        }
        else
            info.sCount++;
        //ip每次请求更新
        info.addr = serverUrl.address;
    };
    ReportTool.prototype.recordSocketResult = function (serverUrl, type, httpStatus) {
        if (httpStatus === void 0) { httpStatus = 0; }
        if (httpStatus == -2)
            return;
        var host = serverUrl.realHost;
        if (!host)
            return;
        if (this.socketResultMap[host] == null) {
            this.socketResultMap[host] = SocketRecordInfo.create(serverUrl);
        }
        var info = this.socketResultMap[host];
        if (info == null)
            return;
        if (type == this.REQUEST_FAILED)
            info.fCount++;
        else
            info.sCount++;
        //ip每次请求更新
        info.addr = serverUrl.address;
    };
    //上报上一次的请求计数
    ReportTool.prototype.reportRequestRecord = function () {
        var recordStr = Global.Setting.storage.get(HallStorageKey_1.default.RequestRecord);
        if (recordStr == null || recordStr == "") {
            return;
        }
        try {
            var decodeStr = Global.AESUtil.aesDcryptWithPKC27(recordStr);
            var content = JSON.parse(decodeStr);
            this.ReportLogInternal(ReportTool.DEBUG_LOG, ReportTool.REPORT_TYPE_REQUEST_RECORD, content);
        }
        catch (e) {
            Logger.error("decode RequestRecord failed!!!", recordStr);
        }
        Global.Setting.storage.set(HallStorageKey_1.default.RequestRecord, "");
    };
    //记录心跳刷新时间
    ReportTool.prototype.onRefreshHallCostTime = function (time, isHeartBeat, serverUrl) {
        if (!isHeartBeat) {
            return;
        }
        if (!this.requestResultMap[serverUrl.realHost])
            return;
        var info = this.requestResultMap[serverUrl.realHost];
        info.totalHBCount++;
        info.totalHBTime += time;
        if (info.maxHBTime < time)
            info.maxHBTime = time;
    };
    //把日志缓存到本地，下次登录时再上报
    ReportTool.prototype.saveRecord = function () {
        //加密后存储到本地
        try {
            this.recordTab.reqMap = this.requestResultMap;
            this.recordTab.sockMap = this.socketResultMap;
            for (var key in this.requestResultMap) {
                LineRecordInfo.deleteEmpty(this.requestResultMap[key]);
            }
            for (var key in this.socketResultMap) {
                SocketRecordInfo.deleteEmpty(this.socketResultMap[key]);
            }
            var content = JSON.stringify(this.recordTab);
            var encryptContent = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, content);
            Global.Setting.storage.set(HallStorageKey_1.default.RequestRecord, encryptContent);
        }
        catch (e) {
            Logger.error("JSON.stringify(this.successRequestMap) error !!!");
            this.requestResultMap = {};
            this.socketResultMap = {};
        }
    };
    /**
     * 超过时间限制无论缓存中有多少条日志都上报,同时清除缓存,清除Storage
     */
    ReportTool.prototype.ReportCacheTimeout = function () {
        if (this.LogCache == null || this.LogCache.length == 0)
            return;
        try {
            var mergeLog = {};
            mergeLog.data = this.LogCache;
            this.ReportLogMergeInternal(mergeLog);
        }
        catch (error) {
            Logger.error("ReportCacheTimeout:超过时限上报日志错误", error);
        }
        this.clearLogCacheAll();
    };
    /**
     * 上报上次登录后缓存在Storage中的日志(无论多少)
     */
    ReportTool.prototype.ReportLastLoginLogCache = function () {
        var lastLoginCache = Global.Setting.storage.get(HallStorageKey_1.default.PostLogCache);
        if (lastLoginCache == null || lastLoginCache == "")
            return;
        try {
            var decodeStr = Global.AESUtil.aesDcryptWithPKC27(lastLoginCache);
            var content = JSON.parse(decodeStr);
            var mergeLog = {};
            mergeLog.data = content;
            this.ReportLogMergeInternal(mergeLog);
        }
        catch (e) {
            Logger.error("decode RequestRecord failed!!!", lastLoginCache);
        }
        this.clearLogCacheAll();
    };
    /**
     * 将日志先入缓存然后再检测超过5条上报再写入localStorage
     * @param key       日志大类型
     * @param subKey    日志小类型
     * @param content   日志内容
     */
    ReportTool.prototype.ReportLogMixing = function (key, subKey, content) {
        //直接上报 不入缓存
        if (!this.merge) {
            this.ReportLogInternal(key, subKey, content);
            return;
        }
        // 拿单条日志
        var subLog = this.newLogParams(key, subKey, content);
        this.LogCache.push(subLog);
        if (this.LogCache.length >= this.maxLogCount) {
            //上报
            var mergeLog = {};
            mergeLog.data = this.LogCache;
            this.ReportLogMergeInternal(mergeLog);
            //清空缓存
            this.clearLogCacheAll();
        }
        else {
            //写Storage
            this.saveLogCacheToStorage();
        }
    };
    //合并上 报生成一条子日志
    ReportTool.prototype.newLogParams = function (key, subKey, content) {
        var param = {};
        //上报的客户端时间
        param.client_time = Date.now();
        //系统类型
        param.os_type = this.osType;
        //设备id
        param.device_id = Global.Setting.SystemInfo.deviceId;
        //系统版本
        param.os_version = cc.sys.osVersion;
        //设备型号
        param.mobile_brand = Global.Setting.SystemInfo.deviceBrand;
        param.tagInfo = cc.js.formatStr("%s|%s|%s", this.hallSkin, this.gameSkin, this.packageTag);
        //设备型号
        param.phone_model = Global.Setting.SystemInfo.osBuildModel;
        param.udid = this.udid;
        param.sign_type = this.sign_type;
        param.entry = this.entry;
        param.ios_type = Global.Toolkit.getIosSignType();
        //appid
        param.app_id = this.appId;
        //系统版本号
        param.app_version = Global.Setting.SystemInfo.appVersion;
        //包名
        param.app_name = Global.Setting.SystemInfo.bundleName;
        //马甲包类型
        param.copy_pack_type = Global.Setting.SystemInfo.nativePlatform;
        //是否第一次安装
        param.is_first = Global.Setting.SystemInfo.firstInstallStatus ? 1 : 0;
        //uid
        param.uid = this.uid;
        // vip
        param.vip = this.vip;
        //手机号
        param.mobile = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, this.phone);
        //服务器设备唯一码
        param.server_id = Global.Setting.SystemInfo.server_id || "";
        //大厅版本
        param.hall_version = Global.Toolkit.genLoadingAppInfo();
        //平台id
        param.platform_id = Global.Setting.appDataPlatformId || 0;
        //日志大类型
        param.class = key;
        //日志子类型
        param.sub_class = subKey;
        //日志内容
        var contentStr = "";
        try {
            contentStr = JSON.stringify(content);
        }
        catch (_a) {
            contentStr = "";
        }
        param.content = contentStr;
        if (content.error_code) {
            param.error_code = content.error_code;
        }
        if (content.htime || content.hTime) {
            if (content.htime) {
                param.htime = content.htime;
            }
            if (content.hTime) {
                param.htime = content.hTime;
            }
        }
        if (Global.SceneManager.inGame())
            param.gid = Game.Control.curGid;
        else
            param.gid = 0;
        return param;
    };
    /**
     * 日志缓存写入localStorage
     */
    ReportTool.prototype.saveLogCacheToStorage = function () {
        try {
            var content = JSON.stringify(this.LogCache);
            var encryptContent = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, content);
            Global.Setting.storage.set(HallStorageKey_1.default.PostLogCache, encryptContent);
        }
        catch (error) {
            Logger.error("saveLogCacheToStorage:日志写缓存失败", error);
        }
    };
    /**
     * 清除所有缓存 同时清除Storage
     */
    ReportTool.prototype.clearLogCacheAll = function () {
        this.LogCache = null;
        this.LogCache = new Array();
        Global.Setting.storage.set(HallStorageKey_1.default.PostLogCache, "");
    };
    /**
     * 模拟错误日志上报 模拟产生200条日志 每条日志产生间隔1-10秒 各种大类型以及小类型日志
     */
    // private testLogCacheFunc(){
    //     let subKeyList = [
    //         "HTTP_ERROR",
    //         "DATA_ERROR",
    //         "CHECKVERSION_ERROR",
    //         "LOGIN_ERROR",
    //         "HTTPDNS_ERROR",
    //         "HOTUPDATE_ERROR",
    //         "JSON_ERROR",
    //         "INIT_TDUN_ERROR",
    //         "SOCKET_ERROR",
    //         "TEST_ROUTE",
    //         "INIT_DUN_OK",
    //         "REQUEST_RECORD",
    //         "CHANNEL_SOURCE",
    //         "PARALLEL_REQ"
    //     ];
    //     //120-30+1
    //     // Math.floor(Math.random()*(max-min+1)+min);
    //     let randomTime = Math.floor(Math.random()*91+30);//随机时间
    //     let randomKey = Math.round(Math.random()) == 0 ? ReportTool.DEBUG_LOG : ReportTool.ERROR_LOG; //随机大类型
    //     let randomSubkey = Math.floor(Math.random()*14);//随机小类型
    //     if(randomTime == 0){
    //         this.testLogCacheFunc();
    //         return;
    //     }
    //     setTimeout(()=>{
    //         this.testNum += 1;
    //         if(this.testNum>=this.testCount) return;
    //         let content:any = {};
    //         if(randomTime<60){
    //             content.data = `日志合并上报${this.testNum}===时间间隔:${randomTime}`;
    //         }else if(randomTime<90){
    //             content.data = `日志合并上报${this.testNum}===时间间隔:${randomTime}`;
    //             content.error_code = `error_code_${randomTime}`
    //         }else{
    //             content.data = `日志合并上报${this.testNum}===时间间隔:${randomTime}`;
    //             content.error_code = `error_code_${randomTime}`
    //             content.htime = 1;
    //             content.hTime = 2;
    //         }
    //         this.ReportLogMixing(randomKey,subKeyList[randomSubkey],content);
    //         this.testLogCacheFunc();
    //     },randomTime*1000);
    // }
    ReportTool.prototype.onUpdate = function (dt) {
        if (!this.canRecord)
            return;
        this.interval += dt;
        if (this.interval >= this.RECODE_TIME) {
            this.interval = 0;
            this.saveRecord();
        }
        //5分钟上报一次日志
        this.logCacheInterval += dt;
        if (this.logCacheInterval >= this.maxLogCacheInterval) {
            this.logCacheInterval = 0;
            this.ReportCacheTimeout();
        }
    };
    //获取到nativeparam
    ReportTool.REPORT_TYPE_OPEN = 1;
    //获取appdata之后 开始热更之前
    ReportTool.REPORT_TYPE_START_CHECKVERSION = 2;
    //登录成功上报
    ReportTool.REPORT_TYPE_LOGIN = 3;
    //HTTP 异常上报
    ReportTool.REPORT_TYPE_HTTP_ERROR = "HTTP_ERROR";
    //data 异常上报
    ReportTool.REPORT_TYPE_DATA_ERROR = "DATA_ERROR";
    //checkversion 异常上报
    ReportTool.REPORT_TYPE_CHECKVERSION_ERROR = "CHECKVERSION_ERROR";
    //login 异常上报
    ReportTool.REPORT_TYPE_LOGIN_ERROR = "LOGIN_ERROR";
    //httpDNS 异常上报
    ReportTool.REPORT_TYPE_HTTPDNS_ERROR = "HTTPDNS_ERROR";
    //热更失败上报
    ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR = "HOTUPDATE_ERROR";
    //解析json失败上报
    ReportTool.REPORT_TYPE_JSON_ERROR = "JSON_ERROR";
    //初始化T盾失败
    ReportTool.REPORT_TYPE_INIT_DUN_ERROR = "INIT_DUN_ERROR";
    //socket 上报
    ReportTool.REPORT_TYPE_SOCKET_ERROR = "SOCKET_ERROR";
    //测试线路 上报
    ReportTool.REPORT_TYPE_TEST_ROUTE = "TEST_ROUTE";
    //初始化盾成功
    ReportTool.REPORT_TYPE_INIT_DUN_OK = "INIT_DUN_OK";
    //上报请求成功和失败的次数  每次启动时上报
    ReportTool.REPORT_TYPE_REQUEST_RECORD = "REQUEST_RECORD";
    //测试data 上报
    ReportTool.REPORT_TYPE_DATA_ROUTE = "REPORT_TYPE_DATA_ROUTE";
    //渠道的源
    ReportTool.REPORT_TYPE_CHANNEL_SOURCE = "CHANNEL_SOURCE";
    //热更失败域名上报
    ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR = "HOTUPDATE_HOST_ERROR";
    //子游戏热更正常上报
    ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT = "REPORT_TYPE_DOWNLOADSUBGAME_RESULT";
    //子游戏热更失败上报
    ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED = "REPORT_TYPE_DOWNLOADSUBGAME_FAILED";
    //并发请求上报
    ReportTool.REPORT_TYPE_PARALLEL_REQ = "PARALLEL_REQ";
    //客户端上报日志
    ReportTool.DEBUG_LOG = "debug";
    //客户端错误日志
    ReportTool.ERROR_LOG = "error";
    return ReportTool;
}());
exports.ReportTool = ReportTool;
var SocketRecordInfo = /** @class */ (function () {
    function SocketRecordInfo() {
        this.lo_type = 0;
        this.port = 0;
        this.sCount = 0;
        this.fCount = 0;
    }
    SocketRecordInfo.create = function (serverUrl) {
        if (serverUrl == null)
            return;
        var recordInfo = new SocketRecordInfo();
        recordInfo.addrHost = serverUrl.addressHost;
        recordInfo.host = serverUrl.realHost;
        recordInfo.port = serverUrl.port;
        recordInfo.lo_type = serverUrl.lo_type;
        return recordInfo;
    };
    SocketRecordInfo.deleteEmpty = function (info) {
        for (var key in info) {
            if (info[key] == 0 && key != "fCount" && key != "sCount")
                delete info[key];
        }
        if (info.addrHost == info.host)
            delete info.addrHost;
        if (info.addr == info.host)
            delete info.addr;
    };
    return SocketRecordInfo;
}());
var LineRecordInfo = /** @class */ (function () {
    function LineRecordInfo() {
        this.port = 0;
        this.lo_type = 0;
        this.totalHBTime = 0;
        this.totalHBCount = 0;
        this.maxHBTime = 0;
        this.sCount = 0;
        this.fCount = 0;
        this.errCodeMap = {};
    }
    LineRecordInfo.create = function (serverUrl) {
        if (serverUrl == null)
            return;
        var recordInfo = new LineRecordInfo();
        recordInfo.addrHost = serverUrl.addressHost;
        recordInfo.host = serverUrl.realHost;
        recordInfo.port = serverUrl.port;
        recordInfo.lo_type = serverUrl.lo_type;
        return recordInfo;
    };
    LineRecordInfo.deleteEmpty = function (info) {
        for (var key in info) {
            if (info[key] == 0 && key != "fCount" && key != "sCount")
                delete info[key];
        }
        if (info.addrHost == info.host)
            delete info.addrHost;
        if (info.addr == info.host)
            delete info.addr;
    };
    return LineRecordInfo;
}());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFJlcG9ydFRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW1FO0FBQ25FLHdEQUFvRDtBQUVwRDtJQUFBO1FBMkRXLGdCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRWhCLGNBQVMsR0FBRyxFQUFFLENBQUE7UUFHckIsdUNBQXVDO1FBQ2hDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTNCLHNCQUFzQjtRQUNmLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFcEIsV0FBVztRQUNILGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDckIsTUFBTTtRQUNFLGdCQUFXLEdBQUcsQ0FBQyxDQUFBO1FBRXZCLFVBQVU7UUFDRixVQUFLLEdBQVksSUFBSSxDQUFDO1FBQzlCLGFBQWE7UUFDTCxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUN4QixtQkFBbUI7UUFDWCx3QkFBbUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLFdBQVc7UUFDSCxhQUFRLEdBQWUsSUFBSSxLQUFLLEVBQU8sQ0FBQztRQUNoRCxTQUFTO1FBQ0QscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLGFBQWE7UUFDYiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixXQUFXO1FBQ0gsb0JBQWUsR0FBRyxFQUFFLENBQUE7UUF5ZjVCLFlBQVk7UUFDSixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixvQkFBZSxHQUFHLFFBQVEsQ0FBQztRQUMzQixtQkFBYyxHQUFHLFFBQVEsQ0FBQztRQUMxQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLGNBQWM7UUFDTixxQkFBZ0IsR0FBc0MsRUFBRSxDQUFDO1FBQ3pELG9CQUFlLEdBQXdDLEVBQUUsQ0FBQztRQUNsRSxTQUFTO1FBQ0QsY0FBUyxHQUFRLEVBQUUsQ0FBQTtRQUUzQixvQ0FBb0M7UUFDN0IsY0FB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VUFBVSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFBO1FBQzNDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQTtRQUNwQyxVQUFVLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUE7UUFDaEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFBO1FBQ3RDLE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7SUFFYSwwQkFBVyxHQUF6QixVQUEwQixJQUFvQjtRQUMxQyxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUksUUFBUTtnQkFDcEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUk7WUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBRXhCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtZQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDeEIsQ0FBQztJQUdMLHFCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJVcmwgfSBmcm9tIFwiLi4vc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvcnRUb29sIHtcclxuICAgIC8v6I635Y+W5YiwbmF0aXZlcGFyYW1cclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfT1BFTiA9IDE7XHJcbiAgICAvL+iOt+WPlmFwcGRhdGHkuYvlkI4g5byA5aeL54Ot5pu05LmL5YmNXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX1NUQVJUX0NIRUNLVkVSU0lPTiA9IDI7XHJcbiAgICAvL+eZu+W9leaIkOWKn+S4iuaKpVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9MT0dJTiA9IDM7XHJcblxyXG4gICAgLy9IVFRQIOW8guW4uOS4iuaKpVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9IVFRQX0VSUk9SID0gXCJIVFRQX0VSUk9SXCI7XHJcbiAgICAvL2RhdGEg5byC5bi45LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX0RBVEFfRVJST1IgPSBcIkRBVEFfRVJST1JcIlxyXG4gICAgLy9jaGVja3ZlcnNpb24g5byC5bi45LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX0NIRUNLVkVSU0lPTl9FUlJPUiA9IFwiQ0hFQ0tWRVJTSU9OX0VSUk9SXCJcclxuICAgIC8vbG9naW4g5byC5bi45LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX0xPR0lOX0VSUk9SID0gXCJMT0dJTl9FUlJPUlwiXHJcbiAgICAvL2h0dHBETlMg5byC5bi45LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX0hUVFBETlNfRVJST1IgPSBcIkhUVFBETlNfRVJST1JcIlxyXG4gICAgLy/ng63mm7TlpLHotKXkuIrmiqVcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUiA9IFwiSE9UVVBEQVRFX0VSUk9SXCJcclxuICAgIC8v6Kej5p6QanNvbuWksei0peS4iuaKpVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9KU09OX0VSUk9SID0gXCJKU09OX0VSUk9SXCJcclxuICAgIC8v5Yid5aeL5YyWVOebvuWksei0pVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9JTklUX0RVTl9FUlJPUiA9IFwiSU5JVF9EVU5fRVJST1JcIlxyXG4gICAgLy9zb2NrZXQg5LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX1NPQ0tFVF9FUlJPUiA9IFwiU09DS0VUX0VSUk9SXCI7XHJcbiAgICAvL+a1i+ivlee6v+i3ryDkuIrmiqVcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfVEVTVF9ST1VURSA9IFwiVEVTVF9ST1VURVwiO1xyXG4gICAgLy/liJ3lp4vljJbnm77miJDlip9cclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfSU5JVF9EVU5fT0sgPSBcIklOSVRfRFVOX09LXCJcclxuXHJcbiAgICAvL+S4iuaKpeivt+axguaIkOWKn+WSjOWksei0peeahOasoeaVsCAg5q+P5qyh5ZCv5Yqo5pe25LiK5oqlXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX1JFUVVFU1RfUkVDT1JEID0gXCJSRVFVRVNUX1JFQ09SRFwiO1xyXG5cclxuICAgIC8v5rWL6K+VZGF0YSDkuIrmiqVcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfREFUQV9ST1VURSA9IFwiUkVQT1JUX1RZUEVfREFUQV9ST1VURVwiO1xyXG5cclxuICAgIC8v5rig6YGT55qE5rqQXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUE9SVF9UWVBFX0NIQU5ORUxfU09VUkNFID0gXCJDSEFOTkVMX1NPVVJDRVwiO1xyXG4gICAgLy/ng63mm7TlpLHotKXln5/lkI3kuIrmiqVcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfSE9UVVBEQVRFX0hPU1RfRVJST1IgPSBcIkhPVFVQREFURV9IT1NUX0VSUk9SXCI7XHJcbiAgICAvL+WtkOa4uOaIj+eDreabtOato+W4uOS4iuaKpVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9ET1dOTE9BRFNVQkdBTUVfUkVTVUxUID0gXCJSRVBPUlRfVFlQRV9ET1dOTE9BRFNVQkdBTUVfUkVTVUxUXCI7XHJcblxyXG4gICAgLy/lrZDmuLjmiI/ng63mm7TlpLHotKXkuIrmiqVcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfRE9XTkxPQURTVUJHQU1FX0ZBSUxFRCA9IFwiUkVQT1JUX1RZUEVfRE9XTkxPQURTVUJHQU1FX0ZBSUxFRFwiO1xyXG4gICAgLy/ov5vlhaXlrZDmuLjmiI/lvILluLhcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVQT1JUX1RZUEVfTE9BRFNVQkdBTUVfRVJST1I6IFwiUkVQT1JUX1RZUEVfTE9BRFNVQkdBTUVfRVJST1JcIlxyXG5cclxuXHJcbiAgICAvL+W5tuWPkeivt+axguS4iuaKpVxyXG4gICAgcHVibGljIHN0YXRpYyBSRVBPUlRfVFlQRV9QQVJBTExFTF9SRVEgPSBcIlBBUkFMTEVMX1JFUVwiO1xyXG5cclxuXHJcbiAgICAvL+WuouaIt+err+S4iuaKpeaXpeW/l1xyXG4gICAgcHVibGljIHN0YXRpYyBERUJVR19MT0cgPSBcImRlYnVnXCI7XHJcbiAgICAvL+WuouaIt+err+mUmeivr+aXpeW/l1xyXG4gICAgcHVibGljIHN0YXRpYyBFUlJPUl9MT0cgPSBcImVycm9yXCI7XHJcblxyXG4gICAgcHVibGljIGxvZ1VybHNMaXN0ID0gW11cclxuXHJcbiAgICBwdWJsaWMgcmVwb3J0VXJsID0gXCJcIlxyXG5cclxuXHJcbiAgICAvL+S4iuaKpeiwg+ivleaXpeW/l+W8gOWFs++8jOmAmui/h2NoZWNrdmVyc2lvbuS4i+WPke+8jHJvb3RhZG1pbuaOp+WItlxyXG4gICAgcHVibGljIGRlYnVnRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy9kZWJ1ZyB1aWQg44CCIOmYsuatouWIh+aNoui0puWPt+mXrumimFxyXG4gICAgcHVibGljIGRlYnVnVWlkID0gMDtcclxuXHJcbiAgICAvL+W9k+WJjeS9v+eUqOeahOe6v+i3r+e0ouW8lVxyXG4gICAgcHJpdmF0ZSBjdXJJbmRleCA9IDA7XHJcbiAgICAvL+S4iuaKpeasoeaVsFxyXG4gICAgcHJpdmF0ZSByZXBvcnRUaW1lcyA9IDBcclxuXHJcbiAgICAvL+aXpeW/l+aYr+WQpuWQiOW5tuS4iuaKpVxyXG4gICAgcHJpdmF0ZSBtZXJnZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvL+e8k+WtmOaXpeW/l+S4iumZkCDpu5jorqQ15p2hXHJcbiAgICBwcml2YXRlIG1heExvZ0NvdW50ID0gNTtcclxuICAgIC8v57yT5a2Y5pel5b+X5pe26Ze05LiK6ZmQIOm7mOiupDXliIbpkp8g56eS5pWwXHJcbiAgICBwcml2YXRlIG1heExvZ0NhY2hlSW50ZXJ2YWwgPSA1ICogNjA7XHJcbiAgICAvL+e8k+WtmOaXpeW/l0RlQnVnXHJcbiAgICBwcml2YXRlIExvZ0NhY2hlOiBBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgIC8v57yT5a2Y5pel5b+X5a6a5pe25ZmoXHJcbiAgICBwcml2YXRlIGxvZ0NhY2hlSW50ZXJ2YWwgPSAwO1xyXG4gICAgLy/mtYvor5XlrZfmrrUgKOa1i+ivleadoeaVsClcclxuICAgIC8vIHByaXZhdGUgdGVzdENvdW50ID0gMjAwO1xyXG4gICAgLy/mtYvor5XlrZfmrrUgKOW3sue7j+S6p+eUn+eahOaXpeW/l+aVsClcclxuICAgIC8vIHByaXZhdGUgdGVzdE51bSA9IDA7XHJcbiAgICAvL+eDreabtOWksei0peWPquS4iuaKpeS4gOasoVxyXG4gICAgcHJpdmF0ZSBob3RVcGRhdGVSZXBvcnQgPSB7fVxyXG5cclxuICAgIC8v5pqC5a6a5Li6YXBwZGF0YeS/ruaUue+8jOmHjeWQr2FwcOeUn+aViFxyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5SZWZyZXNoSGFsbE5ldENvc3QsIHRoaXMsIHRoaXMub25SZWZyZXNoSGFsbENvc3RUaW1lKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5SZWZyZXNoSGFsbE5ldENvc3QsIHRoaXMsIHRoaXMub25SZWZyZXNoSGFsbENvc3RUaW1lKVxyXG4gICAgICAgIHRoaXMucmVwb3J0VGltZXMgPSAwXHJcbiBcclxuICAgICAgICB0aGlzLmxvYWRMb2NhbExvZ1VybHMoKTtcclxuICAgICAgICAvLyBpZih1cmwgJiYgdXJsLmluZGV4T2YoXCJodHRwXCIpID4gLTEpXHJcbiAgICAgICAgLy8gICAgIHRoaXMucmVwb3J0VXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuaW5pdFJlcG9ydFVybCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmVwb3J0VXJsKCkge1xyXG4gICAgICAgIGxldCByZXBvcnRVcmwgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5SZXBvcnRVcmwpO1xyXG4gICAgICAgIGlmIChyZXBvcnRVcmwgPT0gJycpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicmVwb3J0VXJsID0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZW1wVXJsID0gSlNPTi5wYXJzZShyZXBvcnRVcmwpXHJcbiAgICAgICAgaWYgKHRlbXBVcmwpIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IHRlbXBVcmwuc3BsaXQoJy9jJylbMF1cclxuICAgICAgICAgICAgdGhpcy5sb2dVcmxzTGlzdCA9IFt1cmxdO1xyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydFVybCA9IHVybCArIFwiL2xvZ0NlbnRlci9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pataG9zdOaYr+WQpuaYr3JlcG9ydFVybFxyXG4gICAgcHVibGljIGlzUmVwb3J0VXJsKHJlcG9ydFVybDogU2VydmVyVXJsKSB7XHJcbiAgICAgICAgbGV0IGhvc3QgPSByZXBvcnRVcmwucmVhbEhvc3RcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubG9nVXJsc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMubG9nVXJsc0xpc3RbaV1cclxuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKGhvc3QpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZExvY2FsTG9nVXJscygpIHtcclxuICAgICAgICBsZXQgdXJsc1N0cjogc3RyaW5nID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuUmVwb3J0VXJsKTtcclxuICAgICAgICB2YXIgYXJyOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh1cmxzU3RyICE9IG51bGwgJiYgdXJsc1N0ciAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ID0gSlNPTi5wYXJzZSh1cmxzU3RyKVxyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2godCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6Kej5p6QUmVwb3J0VXJs5aSx6LSlXCIsIHVybHNTdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA9PSAwIClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v6L+H5ruk5peg5pWI5pel5b+XXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLmluZGV4T2YoXCJodHRwXCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLov4fmu6Tml6DmlYjln5/lkI06XCIsIGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgdGhpcy5sb2dVcmxzTGlzdCA9IGFycjtcclxuICAgICAgICAvL+WkhOeQhuWkmuWcsOWdgOWQjGhvc3RcclxuICAgICAgICB0aGlzLmxvZ1VybHNMaXN0ID0gR2xvYmFsLlVybFV0aWwuZGVhbEZ1bGxVcmxXaXRoTXV0aUxpbmVzU2FtZUhvc3QodGhpcy5sb2dVcmxzTGlzdClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UmVwb3J0VXJsKCkge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmxvZ1VybHNMaXN0Lmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiUmVwb3J0IFVSTCBpcyBudWxsXCIhISEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VySW5kZXggPSBHbG9iYWwuVG9vbGtpdC5nZXRSb3VuZEludGVnZXIobGVuZ3RoLCAwKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hSZXBvcnRVcmwoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmxvZ1VybHNMaXN0W3JhbmRJbmRleF0gJiYgdGhpcy5sb2dVcmxzTGlzdFtyYW5kSW5kZXhdLmluZGV4T2YoXCJodHRwXCIpID4gLTEpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJlcG9ydFVybCA9IHRoaXMubG9nVXJsc0xpc3RbcmFuZEluZGV4XSArIFwiL2xvZ0NlbnRlci9cIjtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFJlcG9ydFVybCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJJbmRleCA+PSB0aGlzLmxvZ1VybHNMaXN0Lmxlbmd0aCB8fCAhdGhpcy5sb2dVcmxzTGlzdFt0aGlzLmN1ckluZGV4XSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY3VySW5kZXggaXMgbnVsbCAhISAsIGN1ckluZGV4ID1cIiArIHRoaXMuY3VySW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvZ1VybHNMaXN0W3RoaXMuY3VySW5kZXhdLmluZGV4T2YoXCJodHRwXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXBvcnRVcmwgPSB0aGlzLmxvZ1VybHNMaXN0W3RoaXMuY3VySW5kZXhdICsgXCIvbG9nQ2VudGVyL1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXBvcnRVcmwgPSBcImh0dHBzOi8vXCIgKyB0aGlzLmxvZ1VybHNMaXN0W3RoaXMuY3VySW5kZXhdICsgXCIvbG9nQ2VudGVyL1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVJlcG9ydFVybCgpIHtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gKHRoaXMuY3VySW5kZXggKyAxKSAlIHRoaXMubG9nVXJsc0xpc3QubGVuZ3RoXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUmVwb3J0VXJsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhcnNlRGVidWdDb25maWcoY29uZmlnLCB1aWQpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmRlYnVnICYmIGNvbmZpZy5kZWJ1ZyA9PSAxKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLmRlYnVnRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Z1VpZCA9IHVpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKlxyXG4gICAgLy8gKiDkuIrmiqXlrqLmiLfnq6/ml6Xlv5dcclxuICAgIC8vICogQHBhcmFtIGtleSDml6Xlv5fmoIfor4ZcclxuICAgIC8vICogQHBhcmFtIHBhcmFtIOS4iuaKpeWGheWuuVxyXG4gICAgLy8gKiDlj6rmnIlkZWJ1Z0VuYWJsZeS4unRydWXml7bnlJ/mlYgg55So5LqO54Gw5bqm5LiK5oqlXHJcbiAgICAvLyAqL1xyXG4gICAgcHVibGljIFJlcG9ydFB1YmxpY0RlYnVnTG9nKGtleSwgcGFyYW0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGVidWdFbmFibGUgfHwgdGhpcy5kZWJ1Z1VpZCAhPSB0aGlzLnVpZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIHRoaXMuUmVwb3J0TG9nSW50ZXJuYWwoUmVwb3J0VG9vbC5ERUJVR19MT0csIGtleSwgcGFyYW0pO1xyXG4gICAgICAgIHRoaXMuUmVwb3J0TG9nTWl4aW5nKFJlcG9ydFRvb2wuREVCVUdfTE9HLCBrZXksIHBhcmFtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVwb3J0UHVibGljQ2xpZW50TG9nKGtleSwgcGFyYW0sIGJhY3RoID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5SZXBvcnRMb2dJbnRlcm5hbChSZXBvcnRUb29sLkRFQlVHX0xPRywga2V5LCBwYXJhbSxiYWN0aCk7XHJcbiAgICAgICAgLy/mtYvor5Xml6Xlv5fns7vnu5/mlrnms5VcclxuICAgICAgICAvLyB0aGlzLnRlc3RMb2dDYWNoZUZ1bmMoKTtcclxuICAgICAgICB0aGlzLlJlcG9ydExvZ01peGluZyhSZXBvcnRUb29sLkRFQlVHX0xPRywga2V5LCBwYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdlbkhhbGxLZXkoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIFwiSGFsbF9cIiArIGtleTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2VuR2FtZUtleShrZXkpIHtcclxuICAgICAgICBsZXQgZ2lkID0gR2FtZS5Db250cm9sLmN1ckdpZDtcclxuICAgICAgICByZXR1cm4gXCJHYW1lX1wiICsgZ2lkICsgXCJfXCIgKyBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKlxyXG4gICAgLy8gKiDkuIrmiqXlrqLmiLfnq6/plJnor6/ml6Xlv5dcclxuICAgIC8vICogQHBhcmFtIGtleSDml6Xlv5fmoIfor4ZcclxuICAgIC8vICogQHBhcmFtIHBhcmFtIOS4iuaKpeWGheWuuVxyXG4gICAgLy8gKi9cclxuICAgIHB1YmxpYyBSZXBvcnRDbGllbnRFcnJvcihrZXksIHBhcmFtKSB7XHJcbiAgICAgICAgLy/ng63mm7TkuIrmiqXlj6rkuIrmiqXkuIDmrKFcclxuICAgICAgICBpZiAoa2V5ID09IFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUikge1xyXG4gICAgICAgICAgICBsZXQgZ2FtZVR5cGUgPSBwYXJhbS5nYW1lXHJcbiAgICAgICAgICAgIGlmICghZ2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ob3RVcGRhdGVSZXBvcnRbZ2FtZVR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ob3RVcGRhdGVSZXBvcnRbZ2FtZVR5cGVdID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcG9ydFRpbWVzKytcclxuICAgICAgICAvLyB0aGlzLlJlcG9ydExvZ0ludGVybmFsKFJlcG9ydFRvb2wuRVJST1JfTE9HLCBrZXksIHBhcmFtKTtcclxuICAgICAgICB0aGlzLlJlcG9ydExvZ01peGluZyhSZXBvcnRUb29sLkVSUk9SX0xPRywga2V5LCBwYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuIrmiqXorr7lpIfkv6Hmga9cclxuICAgIHB1YmxpYyBSZXBvcnREZXZpY2UodHlwZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVwb3J0VXJsKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZXBvcnRVcmwgPT0gJycpIHJldHVybjtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5yZXBvcnRVcmwgKyBcImJhc2ljP1wiO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHRoaXMuZ2VuRGV2aWNlUGFyYW0oKTtcclxuICAgICAgICBwYXJhbS5fcGFyYW0uc3R5cGUgPSB0eXBlO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVbHIgPSBuZXcgU2VydmVyVXJsKClcclxuICAgICAgICBzZXJ2ZXJVbHIucGFyc2UodXJsKVxyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIlJlcG9ydERldmljZSBpb3MgcGFyYW06XCIgKyBwYXJhbSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJSZXBvcnREZXZpY2UgYW5kcm9pZCBwYXJhbTpcIiArIHBhcmFtKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHbG9iYWwuSHR0cC5zZW5kKHNlcnZlclVsciwgcGFyYW0sICgpID0+IHsgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVJlcG9ydFVybCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgR2V0UmVwb3J0VGltZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwb3J0VGltZXNcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHBob25lQ29kZSgpIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuQXJlYUNvZGUpIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgbG9naW5JcCgpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEgJiYgR2xvYmFsLlBsYXllckRhdGEuaXApXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuUGxheWVyRGF0YS5pcDtcclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHVpZCgpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEgJiYgR2xvYmFsLlBsYXllckRhdGEudWlkKVxyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlBsYXllckRhdGEudWlkO1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIoR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuVWlkKSkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCB2aXAoKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnZpcClcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5QbGF5ZXJEYXRhLnZpcDtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlZJUExldmVsKSkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBwYWNrSWQoKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnBhY2spXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuUGxheWVyRGF0YS5wYWNrO1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIoR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuQ2hhbm5lbCkpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgaGFsbFNraW4oKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8gJiYgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5oYWxsU2tpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5oYWxsU2tpblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGdhbWVTa2luKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvICYmIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZ2FtZVNraW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZ2FtZVNraW5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBwYWNrYWdlVGFnKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvICYmIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ucGFja2FnZVRhZykge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5wYWNrYWdlVGFnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgcGlkKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuUGxheWVyRGF0YSAmJiBHbG9iYWwuUGxheWVyRGF0YS5waWQpXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuUGxheWVyRGF0YS5waWQ7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcihHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5JbnZpdGVDb2RlKSkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCB1c2VyVHlwZSgpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEgJiYgR2xvYmFsLlBsYXllckRhdGEudHlwZSlcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5QbGF5ZXJEYXRhLnR5cGU7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgdWRpZCgpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mbyAmJiBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnVkaWQpXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnVkaWQudG9TdHJpbmcoKVxyXG4gICAgICAgIHJldHVybiBcIjBcIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IGVudHJ5KCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvICYmIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZW50cnkpXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmVudHJ5LnRvU3RyaW5nKClcclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldCBzaWduX3R5cGUoKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8gJiYgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5zaWduX3R5cGUpXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnNpZ25fdHlwZS50b1N0cmluZygpXHJcbiAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgYXBwSWQoKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLmFwcElkKVxyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlNldHRpbmcuYXBwSWQ7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgb3NUeXBlKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKVxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpXHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0IHBob25lKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuUGxheWVyRGF0YSAmJiBHbG9iYWwuUGxheWVyRGF0YS5waG9uZSlcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lO1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5QaG9uZSkgfHwgXCJcIjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUg5pel5b+X57G75Z6LXHJcbiAgICAgKiBAcGFyYW0ga2V5IOaXpeW/l+agh+ivhmtleVxyXG4gICAgICogQHBhcmFtIGNvbnRlbnRUYWIg5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gYmFjdGgg5piv5ZCm5aSa5p2hXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgUmVwb3J0TG9nSW50ZXJuYWwodHlwZSwga2V5LCBjb250ZW50VGFiLCBiYWN0aCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSZXBvcnRVcmwoKTtcclxuICAgICAgICBpZih0aGlzLnJlcG9ydFVybCA9PSAnJykgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjb250ZW50VGFiID09IG51bGwpXHJcbiAgICAgICAgICAgIGNvbnRlbnRUYWIgPSB7fVxyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IFwiY2xpcz9cIlxyXG4gICAgICAgIGlmIChiYWN0aCkge1xyXG4gICAgICAgICAgICBzdWZmaXggPSBcImJhdGNoY2xpcz9cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5yZXBvcnRVcmwgKyBzdWZmaXg7XHJcbiAgICAgICAgbGV0IHBhcmFtVGFiOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtVGFiLl9tb2QgPSBcImxvZ0FnZW50XCI7XHJcbiAgICAgICAgcGFyYW1UYWIuX2Z1bmMgPSBcImNsaWVudExvZ1wiO1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICAvL+Wkp+exu+Wei1xyXG4gICAgICAgIHBhcmFtLmNsYXNzID0gdHlwZTtcclxuICAgICAgICAvL+WtkOexu+Wei1xyXG4gICAgICAgIHBhcmFtLnN1Yl9jbGFzcyA9IGtleTtcclxuICAgICAgICBsZXQgY29udGVudFN0ciA9IFwiXCJcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb250ZW50U3RyID0gSlNPTi5zdHJpbmdpZnkoY29udGVudFRhYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZW50U3RyID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S4iuaKpeWFt+S9k+WGheWuuVxyXG4gICAgICAgIHBhcmFtLmNvbnRlbnQgPSBjb250ZW50U3RyO1xyXG4gICAgICAgIGlmIChjb250ZW50VGFiLmVycm9yX2NvZGUpIHtcclxuICAgICAgICAgICAgcGFyYW0uZXJyb3JfY29kZSA9IGNvbnRlbnRUYWIuZXJyb3JfY29kZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29udGVudFRhYi5odGltZSB8fCBjb250ZW50VGFiLmhUaW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50VGFiLmh0aW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5odGltZSA9IGNvbnRlbnRUYWIuaHRpbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGVudFRhYi5oVGltZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uaHRpbWUgPSBjb250ZW50VGFiLmhUaW1lXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhY2tMb2dQYXJhbShwYXJhbSk7XHJcblxyXG4gICAgICAgIHBhcmFtVGFiLl9wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVbHIgPSBuZXcgU2VydmVyVXJsKClcclxuICAgICAgICBzZXJ2ZXJVbHIucGFyc2UodXJsKVxyXG4gICAgICAgIEdsb2JhbC5IdHRwLnNlbmQoc2VydmVyVWxyLCBwYXJhbVRhYiwgKCkgPT4geyB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUmVwb3J0VXJsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lkIjlubbkuIrmiqXmjqXlj6NcclxuICAgIHByaXZhdGUgUmVwb3J0TG9nTWVyZ2VJbnRlcm5hbChwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZ2V0UmVwb3J0VXJsKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZXBvcnRVcmwgPT0gJycpIHJldHVybjtcclxuICAgICAgICBpZiAocGFyYW1zID09IG51bGwpXHJcbiAgICAgICAgICAgIHBhcmFtcyA9IHt9XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8gPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwYXJhbVRhYjogYW55ID0ge31cclxuICAgICAgICBwYXJhbVRhYi5fbW9kID0gXCJsb2dBZ2VudFwiO1xyXG4gICAgICAgIHBhcmFtVGFiLl9mdW5jID0gXCJjbGllbnRMb2dcIjtcclxuICAgICAgICBwYXJhbVRhYi5fcGFyYW0gPSBwYXJhbXM7XHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IFwiYmF0Y2hjbGlzP1wiO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnJlcG9ydFVybCArIHN1ZmZpeDtcclxuICAgICAgICBsZXQgc2VydmVyVWxyID0gbmV3IFNlcnZlclVybCgpXHJcbiAgICAgICAgc2VydmVyVWxyLnBhcnNlKHVybClcclxuICAgICAgICBHbG9iYWwuSHR0cC5zZW5kKHNlcnZlclVsciwgcGFyYW1UYWIsICgpID0+IHsgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVJlcG9ydFVybCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mAmueUqGxvZyDlj4LmlbDloavlhYVcclxuICAgIHByaXZhdGUgcGFja0xvZ1BhcmFtKHBhcmFtKSB7XHJcbiAgICAgICAgLy/kuIrmiqXnmoTlrqLmiLfnq6/ml7bpl7RcclxuICAgICAgICBwYXJhbS5jbGllbnRfdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgLy/ns7vnu5/nsbvlnotcclxuICAgICAgICBwYXJhbS5vc190eXBlID0gdGhpcy5vc1R5cGU7XHJcbiAgICAgICAgLy/orr7lpIdpZFxyXG4gICAgICAgIHBhcmFtLmRldmljZV9pZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZGV2aWNlSWQ7XHJcbiAgICAgICAgLy/ns7vnu5/niYjmnKxcclxuICAgICAgICBwYXJhbS5vc192ZXJzaW9uID0gY2Muc3lzLm9zVmVyc2lvbjtcclxuICAgICAgICAvL+WMhXRhZ1xyXG4gICAgICAgIHBhcmFtLnRhZ0luZm8gPSBjYy5qcy5mb3JtYXRTdHIoXCIlc3wlc3wlc1wiLCB0aGlzLmhhbGxTa2luLCB0aGlzLmdhbWVTa2luLCB0aGlzLnBhY2thZ2VUYWcpXHJcblxyXG4gICAgICAgIC8v6K6+5aSH5Z6L5Y+3XHJcbiAgICAgICAgcGFyYW0ucGhvbmVfbW9kZWwgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm9zQnVpbGRNb2RlbDtcclxuICAgICAgICAvL+iuvuWkh+WTgeeJjFxyXG4gICAgICAgIHBhcmFtLm1vYmlsZV9icmFuZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZGV2aWNlQnJhbmQ7XHJcbiAgICAgICAgLy9hcHBpZFxyXG4gICAgICAgIHBhcmFtLmFwcF9pZCA9IHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgLy/ns7vnu5/niYjmnKzlj7dcclxuICAgICAgICBwYXJhbS5hcHBfdmVyc2lvbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvbjtcclxuICAgICAgICAvL+WMheWQjVxyXG4gICAgICAgIHBhcmFtLmFwcF9uYW1lID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5idW5kbGVOYW1lO1xyXG4gICAgICAgIC8v6ams55Sy5YyF57G75Z6LXHJcbiAgICAgICAgcGFyYW0uY29weV9wYWNrX3R5cGUgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtO1xyXG4gICAgICAgIC8v5piv5ZCm56ys5LiA5qyh5a6J6KOFXHJcbiAgICAgICAgcGFyYW0uaXNfZmlyc3QgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmZpcnN0SW5zdGFsbFN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIC8vdWlkXHJcbiAgICAgICAgcGFyYW0udWlkID0gdGhpcy51aWQ7XHJcblxyXG4gICAgICAgIHBhcmFtLnVkaWQgPSB0aGlzLnVkaWRcclxuXHJcbiAgICAgICAgcGFyYW0uc2lnbl90eXBlID0gdGhpcy5zaWduX3R5cGVcclxuXHJcbiAgICAgICAgcGFyYW0uZW50cnkgPSB0aGlzLmVudHJ5XHJcbiAgICAgICAgcGFyYW0uaW9zX3R5cGUgPSBHbG9iYWwuVG9vbGtpdC5nZXRJb3NTaWduVHlwZSgpXHJcblxyXG4gICAgICAgIC8vIHZpcFxyXG4gICAgICAgIHBhcmFtLnZpcCA9IHRoaXMudmlwXHJcbiAgICAgICAgLy/miYvmnLrlj7dcclxuICAgICAgICBwYXJhbS5tb2JpbGUgPSBHbG9iYWwuQUVTVXRpbC5hZXNFbmNyeXB0KEdsb2JhbC5Ub29sa2l0LmNyeXB0b0tleSwgR2xvYmFsLlRvb2xraXQuY3J5cHRvSXYsIHRoaXMucGhvbmUpXHJcbiAgICAgICAgLy/mnI3liqHlmajorr7lpIfllK/kuIDnoIFcclxuICAgICAgICBwYXJhbS5zZXJ2ZXJfaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnNlcnZlcl9pZCB8fCBcIlwiO1xyXG4gICAgICAgIC8v5aSn5Y6F54mI5pysXHJcbiAgICAgICAgcGFyYW0uaGFsbF92ZXJzaW9uID0gR2xvYmFsLlRvb2xraXQuZ2VuTG9hZGluZ0FwcEluZm8oKVxyXG4gICAgICAgIC8v5bmz5Y+waWRcclxuICAgICAgICBwYXJhbS5wbGF0Zm9ybV9pZCA9IEdsb2JhbC5TZXR0aW5nLmFwcERhdGFQbGF0Zm9ybUlkIHx8IDA7XHJcblxyXG5cclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSlcclxuICAgICAgICAgICAgcGFyYW0uZ2lkID0gR2FtZS5Db250cm9sLmN1ckdpZDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHBhcmFtLmdpZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZW5EZXZpY2VQYXJhbSgpIHtcclxuICAgICAgICBsZXQgcGFyYW1UYWI6IGFueSA9IHt9XHJcbiAgICAgICAgcGFyYW1UYWIuX21vZCA9ICdsb2dBZ2VudCc7XHJcbiAgICAgICAgcGFyYW1UYWIuX2Z1bmMgPSBcImNsaWVudExvZ1wiO1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBsZXQgc3lzSW5mbyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm87XHJcbiAgICAgICAgaWYgKHN5c0luZm8gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzeXNJbmZvIGlzIG51bGwgISEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2lvc+etvuWQjVxyXG4gICAgICAgIHBhcmFtLmlvc19zaWduID0gc3lzSW5mby5hcHBTaWduO1xyXG4gICAgICAgIC8v5b6u5L+ha2V5XHJcbiAgICAgICAgcGFyYW0ud3hfa2V5ID0gc3lzSW5mby53eEtleTtcclxuICAgICAgICAvL+aegeWFiWtleVxyXG4gICAgICAgIHBhcmFtLmpwdXNoX2tleSA9IHN5c0luZm8uanB1c2hLZXk7XHJcbiAgICAgICAgLy/kvb/nlKjnmoTln5/lkI3liJfooahcclxuICAgICAgICBwYXJhbS5kYXRhX3VybHMgPSBHbG9iYWwuU2V0dGluZy5kYXRhVXJsc0xpc3Q7XHJcbiAgICAgICAgLy/mraPlnKjkvb/nlKjnmoR1cmxcclxuICAgICAgICBwYXJhbS5kYXRhX3VybCA9IEdsb2JhbC5TZXR0aW5nLmN1ckRhdGFVcmw7XHJcbiAgICAgICAgLy/orr7lpIfmuKDpgZPlj7dcclxuICAgICAgICBpZiAoc3lzSW5mby5wYWNrQ2hhbm5lbCAmJiAhaXNOYU4oTnVtYmVyKHN5c0luZm8ucGFja0NoYW5uZWwpKSlcclxuICAgICAgICAgICAgcGFyYW0uY2hhbm5lbF9pZCA9IE51bWJlcihzeXNJbmZvLnBhY2tDaGFubmVsKSB8fCAwO1xyXG4gICAgICAgIC8vYXBwZGF0Yea4oOmBk2lkXHJcbiAgICAgICAgcGFyYW0uYXBwX2RhdGFfY2hhbm5lbF9pZCA9IEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLmNvbmZpZ0NoYW5uZWw7XHJcbiAgICAgICAgLy/ljIXlkI1cclxuICAgICAgICBwYXJhbS5wYWNrX25hbWUgPSBzeXNJbmZvLmJ1bmRsZU5hbWU7XHJcbiAgICAgICAgLy/njqnlrrblrp7pmYXmuKDpgZNpZFxyXG4gICAgICAgIHBhcmFtLnBhY2tfaWQgPSB0aGlzLnBhY2tJZFxyXG4gICAgICAgIC8v5LiK57qnaWRcclxuICAgICAgICBwYXJhbS5waWQgPSB0aGlzLnBpZDtcclxuICAgICAgICAvL+eUqOaIt+exu+WeiyAgMCDmuLjlrqIgIDEg5omL5py6XHJcbiAgICAgICAgcGFyYW0udXNlcl90eXBlID0gdGhpcy51c2VyVHlwZTtcclxuICAgICAgICAvL+iuvuWkh+Wei+WPt1xyXG4gICAgICAgIHBhcmFtLnBob25lX21vZGVsID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5vc0J1aWxkTW9kZWw7XHJcbiAgICAgICAgLy/njqnlrrbmiYvmnLrlj7cg5oiW6ICFIOe8k+WtmOaJi+acuuWPt1xyXG4gICAgICAgIHBhcmFtLm1vYmlsZSA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LCBHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdiwgdGhpcy5waG9uZSk7XHJcbiAgICAgICAgLy/miYvmnLrlj7fnoIHljLrln59cclxuICAgICAgICBwYXJhbS5tb2JpbGVfZm9ybSA9IHRoaXMucGhvbmVDb2RlO1xyXG4gICAgICAgIC8v55m75b2VaXBcclxuICAgICAgICBwYXJhbS5sb2dpbl9pcCA9IHRoaXMubG9naW5JcDtcclxuICAgICAgICAvL+W5s+WPsGlkXHJcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1faWQgPSBHbG9iYWwuU2V0dGluZy5hcHBEYXRhUGxhdGZvcm1JZCB8fCAwO1xyXG4gICAgICAgIC8v5aSn5Y6F54mI5pysXHJcbiAgICAgICAgcGFyYW0uaGFsbF92ZXJzaW9uID0gR2xvYmFsLlRvb2xraXQuZ2VuTG9hZGluZ0FwcEluZm8oKVxyXG5cclxuICAgICAgICBwYXJhbS51ZGlkID0gdGhpcy51ZGlkXHJcblxyXG4gICAgICAgIHBhcmFtLnNpZ25fdHlwZSA9IHRoaXMuc2lnbl90eXBlXHJcblxyXG4gICAgICAgIHBhcmFtLmVudHJ5ID0gdGhpcy5lbnRyeVxyXG5cclxuICAgICAgICBwYXJhbS5pb3NfdHlwZSA9IEdsb2JhbC5Ub29sa2l0LmdldElvc1NpZ25UeXBlKClcclxuXHJcbiAgICAgICAgLy/liarotLTmnb/lhoXlrrlcclxuICAgICAgICBpZiAoR2xvYmFsLkNoYW5uZWxVdGlsLmlzQ2xpcHRleHRWYWlsZCgpKVxyXG4gICAgICAgICAgICBwYXJhbS5jbGlwYm9hcmRDb250ZW50ID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uY2xpcGJvYXJkQ29udGVudCB8fCBcIlwiO1xyXG4gICAgICAgIC8v5qih5ouf5ZmoXHJcbiAgICAgICAgcGFyYW0uc2ltdWxhdG9yID0gc3lzSW5mby5zaW11bGF0b3I7XHJcblxyXG4gICAgICAgIHRoaXMucGFja0xvZ1BhcmFtKHBhcmFtKTtcclxuXHJcbiAgICAgICAgcGFyYW1UYWIuX3BhcmFtID0gcGFyYW07XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtVGFiO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/mr482MOenkuWGmeS4gOasoeWIsOe8k+WtmFxyXG4gICAgcHJpdmF0ZSBSRUNPREVfVElNRSA9IDYwO1xyXG4gICAgcHJpdmF0ZSBSRVFVRVNUX1NVQ0NFU1MgPSBcInNDb3VudFwiO1xyXG4gICAgcHJpdmF0ZSBSRVFVRVNUX0ZBSUxFRCA9IFwiZkNvdW50XCI7XHJcbiAgICBwcml2YXRlIGludGVydmFsID0gMDtcclxuICAgIC8v6K6w5b2V5oiQ5Yqf55qE6K+35rGC5qyh5pWw5ZKM5Z+f5ZCNXHJcbiAgICBwcml2YXRlIHJlcXVlc3RSZXN1bHRNYXA6IHsgW2tleTogc3RyaW5nXTogTGluZVJlY29yZEluZm8gfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRSZXN1bHRNYXA6IHsgW2tleTogc3RyaW5nXTogU29ja2V0UmVjb3JkSW5mbyB9ID0ge307XHJcbiAgICAvL+S4iuaKpeaAu+aVsOaNrue7k+aehFxyXG4gICAgcHJpdmF0ZSByZWNvcmRUYWI6IGFueSA9IHt9XHJcblxyXG4gICAgLy/ng63mm7Tnu5PmnZ/kuYvlkI7vvIzmiY3lj6/ku6XlhpnmnKzlnLDnvJPlrZjvvIzpmLLmraJyZXN0YXJ0IOWvvOiHtOaXpeW/l+mHjeWkjeS4iuaKpVxyXG4gICAgcHVibGljIGNhblJlY29yZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBlbmFibGVSZWNvcmQoKSB7XHJcbiAgICAgICAgdGhpcy5jYW5SZWNvcmQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXJrU3VjY2VzcyhzZXJ2ZXJVcmw6IFNlcnZlclVybCkge1xyXG4gICAgICAgIGlmICghc2VydmVyVXJsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZWNvcmRSZXF1ZXN0UmVzdWx0KHNlcnZlclVybCwgdGhpcy5SRVFVRVNUX1NVQ0NFU1MpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1hcmtGYWlsZWQoc2VydmVyVXJsOiBTZXJ2ZXJVcmwsIGh0dHBTdGF0dXM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghc2VydmVyVXJsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZWNvcmRSZXF1ZXN0UmVzdWx0KHNlcnZlclVybCwgdGhpcy5SRVFVRVNUX0ZBSUxFRCwgaHR0cFN0YXR1cylcclxuICAgIH1cclxuXHJcbiAgICAvL+e7n+iuoXNvY2tldOmTvuaOpeaIkOWKn+Wksei0pSAgZXJyb3JfY29kZSA9IC0xIOS4jee7n+iuoVxyXG4gICAgcHVibGljIG1hcmtTb2NrZXRGYWlsZWQoc2VydmVyVXJsOiBTZXJ2ZXJVcmwsIGVycm9yQ29kZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzZXJ2ZXJVcmwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlY29yZFNvY2tldFJlc3VsdChzZXJ2ZXJVcmwsIHRoaXMuUkVRVUVTVF9GQUlMRUQsIGVycm9yQ29kZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFya1NvY2tldFN1Y2Nlc3Moc2VydmVyVXJsOiBTZXJ2ZXJVcmwpIHtcclxuICAgICAgICBpZiAoIXNlcnZlclVybClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVjb3JkU29ja2V0UmVzdWx0KHNlcnZlclVybCwgdGhpcy5SRVFVRVNUX1NVQ0NFU1MpXHJcbiAgICB9XHJcblxyXG4gICAgLy/or7fmsYLlpLHotKXmiJbogIXmiJDlip8g6K6h5pWwKzFcclxuICAgIC8vdHlwZTogMSDmiJDlip8gMiDlpLHotKVcclxuICAgIHByaXZhdGUgcmVjb3JkUmVxdWVzdFJlc3VsdChzZXJ2ZXJVcmw6IFNlcnZlclVybCwgdHlwZSwgaHR0cFN0YXR1cyA9IDApIHtcclxuICAgICAgICBsZXQgaG9zdCA9IHNlcnZlclVybC5yZWFsSG9zdDtcclxuICAgICAgICBpZiAoIWhvc3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdFJlc3VsdE1hcFtob3N0XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFJlc3VsdE1hcFtob3N0XSA9IExpbmVSZWNvcmRJbmZvLmNyZWF0ZShzZXJ2ZXJVcmwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5yZXF1ZXN0UmVzdWx0TWFwW2hvc3RdXHJcbiAgICAgICAgaWYgKGluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0eXBlID09IHRoaXMuUkVRVUVTVF9GQUlMRUQpIHtcclxuICAgICAgICAgICAgaW5mby5mQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKGluZm8uZXJyQ29kZU1hcFtodHRwU3RhdHVzXSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaW5mby5lcnJDb2RlTWFwW2h0dHBTdGF0dXNdID0gMFxyXG4gICAgICAgICAgICBpbmZvLmVyckNvZGVNYXBbaHR0cFN0YXR1c10rK1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGluZm8uc0NvdW50Kys7XHJcbiAgICAgICAgLy9pcOavj+asoeivt+axguabtOaWsFxyXG4gICAgICAgIGluZm8uYWRkciA9IHNlcnZlclVybC5hZGRyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjb3JkU29ja2V0UmVzdWx0KHNlcnZlclVybDogU2VydmVyVXJsLCB0eXBlLCBodHRwU3RhdHVzID0gMCkge1xyXG4gICAgICAgIGlmIChodHRwU3RhdHVzID09IC0yKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGhvc3QgPSBzZXJ2ZXJVcmwucmVhbEhvc3Q7XHJcbiAgICAgICAgaWYgKCFob3N0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvY2tldFJlc3VsdE1hcFtob3N0XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0UmVzdWx0TWFwW2hvc3RdID0gU29ja2V0UmVjb3JkSW5mby5jcmVhdGUoc2VydmVyVXJsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuc29ja2V0UmVzdWx0TWFwW2hvc3RdXHJcbiAgICAgICAgaWYgKGluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0eXBlID09IHRoaXMuUkVRVUVTVF9GQUlMRUQpXHJcbiAgICAgICAgICAgIGluZm8uZkNvdW50Kys7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpbmZvLnNDb3VudCsrO1xyXG4gICAgICAgIC8vaXDmr4/mrKHor7fmsYLmm7TmlrBcclxuICAgICAgICBpbmZvLmFkZHIgPSBzZXJ2ZXJVcmwuYWRkcmVzcztcclxuICAgIH1cclxuXHJcbiAgICAvL+S4iuaKpeS4iuS4gOasoeeahOivt+axguiuoeaVsFxyXG4gICAgcHVibGljIHJlcG9ydFJlcXVlc3RSZWNvcmQoKSB7XHJcbiAgICAgICAgbGV0IHJlY29yZFN0ciA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlJlcXVlc3RSZWNvcmQpXHJcbiAgICAgICAgaWYgKHJlY29yZFN0ciA9PSBudWxsIHx8IHJlY29yZFN0ciA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGRlY29kZVN0ciA9IEdsb2JhbC5BRVNVdGlsLmFlc0RjcnlwdFdpdGhQS0MyNyhyZWNvcmRTdHIpO1xyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IEpTT04ucGFyc2UoZGVjb2RlU3RyKTtcclxuICAgICAgICAgICAgdGhpcy5SZXBvcnRMb2dJbnRlcm5hbChSZXBvcnRUb29sLkRFQlVHX0xPRywgUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9SRVFVRVNUX1JFQ09SRCwgY29udGVudClcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZGVjb2RlIFJlcXVlc3RSZWNvcmQgZmFpbGVkISEhXCIsIHJlY29yZFN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlJlcXVlc3RSZWNvcmQsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6w5b2V5b+D6Lez5Yi35paw5pe26Ze0XHJcbiAgICBwcml2YXRlIG9uUmVmcmVzaEhhbGxDb3N0VGltZSh0aW1lLCBpc0hlYXJ0QmVhdCwgc2VydmVyVXJsKSB7XHJcbiAgICAgICAgaWYgKCFpc0hlYXJ0QmVhdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5yZXF1ZXN0UmVzdWx0TWFwW3NlcnZlclVybC5yZWFsSG9zdF0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMucmVxdWVzdFJlc3VsdE1hcFtzZXJ2ZXJVcmwucmVhbEhvc3RdXHJcbiAgICAgICAgaW5mby50b3RhbEhCQ291bnQrKztcclxuICAgICAgICBpbmZvLnRvdGFsSEJUaW1lICs9IHRpbWU7XHJcbiAgICAgICAgaWYgKGluZm8ubWF4SEJUaW1lIDwgdGltZSlcclxuICAgICAgICAgICAgaW5mby5tYXhIQlRpbWUgPSB0aW1lXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5oqK5pel5b+X57yT5a2Y5Yiw5pys5Zyw77yM5LiL5qyh55m75b2V5pe25YaN5LiK5oqlXHJcbiAgICBwcml2YXRlIHNhdmVSZWNvcmQoKSB7XHJcbiAgICAgICAgLy/liqDlr4blkI7lrZjlgqjliLDmnKzlnLBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZFRhYi5yZXFNYXAgPSB0aGlzLnJlcXVlc3RSZXN1bHRNYXA7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkVGFiLnNvY2tNYXAgPSB0aGlzLnNvY2tldFJlc3VsdE1hcDtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMucmVxdWVzdFJlc3VsdE1hcCkge1xyXG4gICAgICAgICAgICAgICAgTGluZVJlY29yZEluZm8uZGVsZXRlRW1wdHkodGhpcy5yZXF1ZXN0UmVzdWx0TWFwW2tleV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuc29ja2V0UmVzdWx0TWFwKSB7XHJcbiAgICAgICAgICAgICAgICBTb2NrZXRSZWNvcmRJbmZvLmRlbGV0ZUVtcHR5KHRoaXMuc29ja2V0UmVzdWx0TWFwW2tleV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJlY29yZFRhYik7XHJcbiAgICAgICAgICAgIGxldCBlbmNyeXB0Q29udGVudCA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LCBHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdiwgY29udGVudCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlJlcXVlc3RSZWNvcmQsIGVuY3J5cHRDb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiSlNPTi5zdHJpbmdpZnkodGhpcy5zdWNjZXNzUmVxdWVzdE1hcCkgZXJyb3IgISEhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RSZXN1bHRNYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXRSZXN1bHRNYXAgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDotoXov4fml7bpl7TpmZDliLbml6DorrrnvJPlrZjkuK3mnInlpJrlsJHmnaHml6Xlv5fpg73kuIrmiqUs5ZCM5pe25riF6Zmk57yT5a2YLOa4hemZpFN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBSZXBvcnRDYWNoZVRpbWVvdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuTG9nQ2FjaGUgPT0gbnVsbCB8fCB0aGlzLkxvZ0NhY2hlLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IG1lcmdlTG9nOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgbWVyZ2VMb2cuZGF0YSA9IHRoaXMuTG9nQ2FjaGU7XHJcbiAgICAgICAgICAgIHRoaXMuUmVwb3J0TG9nTWVyZ2VJbnRlcm5hbChtZXJnZUxvZyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiUmVwb3J0Q2FjaGVUaW1lb3V0Oui2hei/h+aXtumZkOS4iuaKpeaXpeW/l+mUmeivr1wiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJMb2dDYWNoZUFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5LiK5qyh55m75b2V5ZCO57yT5a2Y5ZyoU3RvcmFnZeS4reeahOaXpeW/lyjml6DorrrlpJrlsJEpIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVwb3J0TGFzdExvZ2luTG9nQ2FjaGUoKSB7XHJcbiAgICAgICAgbGV0IGxhc3RMb2dpbkNhY2hlID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuUG9zdExvZ0NhY2hlKTtcclxuICAgICAgICBpZiAobGFzdExvZ2luQ2FjaGUgPT0gbnVsbCB8fCBsYXN0TG9naW5DYWNoZSA9PSBcIlwiKSByZXR1cm47XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGRlY29kZVN0ciA9IEdsb2JhbC5BRVNVdGlsLmFlc0RjcnlwdFdpdGhQS0MyNyhsYXN0TG9naW5DYWNoZSk7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gSlNPTi5wYXJzZShkZWNvZGVTdHIpIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgICAgIGxldCBtZXJnZUxvZzogYW55ID0ge307XHJcbiAgICAgICAgICAgIG1lcmdlTG9nLmRhdGEgPSBjb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLlJlcG9ydExvZ01lcmdlSW50ZXJuYWwobWVyZ2VMb2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkZWNvZGUgUmVxdWVzdFJlY29yZCBmYWlsZWQhISFcIiwgbGFzdExvZ2luQ2FjaGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyTG9nQ2FjaGVBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuaXpeW/l+WFiOWFpee8k+WtmOeEtuWQjuWGjeajgOa1i+i2hei/hzXmnaHkuIrmiqXlho3lhpnlhaVsb2NhbFN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSBrZXkgICAgICAg5pel5b+X5aSn57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc3ViS2V5ICAgIOaXpeW/l+Wwj+exu+Wei1xyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgICDml6Xlv5flhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBSZXBvcnRMb2dNaXhpbmcoa2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBjb250ZW50OiBhbnkpIHtcclxuICAgICAgICAvL+ebtOaOpeS4iuaKpSDkuI3lhaXnvJPlrZhcclxuICAgICAgICBpZiAoIXRoaXMubWVyZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5SZXBvcnRMb2dJbnRlcm5hbChrZXksIHN1YktleSwgY29udGVudCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5ou/5Y2V5p2h5pel5b+XXHJcbiAgICAgICAgbGV0IHN1YkxvZyA9IHRoaXMubmV3TG9nUGFyYW1zKGtleSwgc3ViS2V5LCBjb250ZW50KTtcclxuICAgICAgICB0aGlzLkxvZ0NhY2hlLnB1c2goc3ViTG9nKTtcclxuICAgICAgICBpZiAodGhpcy5Mb2dDYWNoZS5sZW5ndGggPj0gdGhpcy5tYXhMb2dDb3VudCkge1xyXG4gICAgICAgICAgICAvL+S4iuaKpVxyXG4gICAgICAgICAgICBsZXQgbWVyZ2VMb2c6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBtZXJnZUxvZy5kYXRhID0gdGhpcy5Mb2dDYWNoZTtcclxuICAgICAgICAgICAgdGhpcy5SZXBvcnRMb2dNZXJnZUludGVybmFsKG1lcmdlTG9nKTtcclxuICAgICAgICAgICAgLy/muIXnqbrnvJPlrZhcclxuICAgICAgICAgICAgdGhpcy5jbGVhckxvZ0NhY2hlQWxsKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/lhplTdG9yYWdlXHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUxvZ0NhY2hlVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5ZCI5bm25LiKIOaKpeeUn+aIkOS4gOadoeWtkOaXpeW/l1xyXG4gICAgcHJpdmF0ZSBuZXdMb2dQYXJhbXMoa2V5OiBzdHJpbmcsIHN1YktleTogc3RyaW5nLCBjb250ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge307XHJcbiAgICAgICAgLy/kuIrmiqXnmoTlrqLmiLfnq6/ml7bpl7RcclxuICAgICAgICBwYXJhbS5jbGllbnRfdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgLy/ns7vnu5/nsbvlnotcclxuICAgICAgICBwYXJhbS5vc190eXBlID0gdGhpcy5vc1R5cGU7XHJcbiAgICAgICAgLy/orr7lpIdpZFxyXG4gICAgICAgIHBhcmFtLmRldmljZV9pZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZGV2aWNlSWQ7XHJcbiAgICAgICAgLy/ns7vnu5/niYjmnKxcclxuICAgICAgICBwYXJhbS5vc192ZXJzaW9uID0gY2Muc3lzLm9zVmVyc2lvbjtcclxuICAgICAgICAvL+iuvuWkh+Wei+WPt1xyXG4gICAgICAgIHBhcmFtLm1vYmlsZV9icmFuZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZGV2aWNlQnJhbmQ7XHJcbiAgICAgICAgcGFyYW0udGFnSW5mbyA9IGNjLmpzLmZvcm1hdFN0cihcIiVzfCVzfCVzXCIsIHRoaXMuaGFsbFNraW4sIHRoaXMuZ2FtZVNraW4sIHRoaXMucGFja2FnZVRhZylcclxuXHJcbiAgICAgICAgLy/orr7lpIflnovlj7dcclxuICAgICAgICBwYXJhbS5waG9uZV9tb2RlbCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ub3NCdWlsZE1vZGVsO1xyXG5cclxuICAgICAgICBwYXJhbS51ZGlkID0gdGhpcy51ZGlkXHJcblxyXG4gICAgICAgIHBhcmFtLnNpZ25fdHlwZSA9IHRoaXMuc2lnbl90eXBlXHJcblxyXG4gICAgICAgIHBhcmFtLmVudHJ5ID0gdGhpcy5lbnRyeVxyXG5cclxuICAgICAgICBwYXJhbS5pb3NfdHlwZSA9IEdsb2JhbC5Ub29sa2l0LmdldElvc1NpZ25UeXBlKClcclxuXHJcbiAgICAgICAgLy9hcHBpZFxyXG4gICAgICAgIHBhcmFtLmFwcF9pZCA9IHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgLy/ns7vnu5/niYjmnKzlj7dcclxuICAgICAgICBwYXJhbS5hcHBfdmVyc2lvbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvbjtcclxuICAgICAgICAvL+WMheWQjVxyXG4gICAgICAgIHBhcmFtLmFwcF9uYW1lID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5idW5kbGVOYW1lO1xyXG4gICAgICAgIC8v6ams55Sy5YyF57G75Z6LXHJcbiAgICAgICAgcGFyYW0uY29weV9wYWNrX3R5cGUgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtO1xyXG4gICAgICAgIC8v5piv5ZCm56ys5LiA5qyh5a6J6KOFXHJcbiAgICAgICAgcGFyYW0uaXNfZmlyc3QgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmZpcnN0SW5zdGFsbFN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIC8vdWlkXHJcbiAgICAgICAgcGFyYW0udWlkID0gdGhpcy51aWQ7XHJcbiAgICAgICAgLy8gdmlwXHJcbiAgICAgICAgcGFyYW0udmlwID0gdGhpcy52aXBcclxuICAgICAgICAvL+aJi+acuuWPt1xyXG4gICAgICAgIHBhcmFtLm1vYmlsZSA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LCBHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdiwgdGhpcy5waG9uZSlcclxuICAgICAgICAvL+acjeWKoeWZqOiuvuWkh+WUr+S4gOeggVxyXG4gICAgICAgIHBhcmFtLnNlcnZlcl9pZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2VydmVyX2lkIHx8IFwiXCI7XHJcbiAgICAgICAgLy/lpKfljoXniYjmnKxcclxuICAgICAgICBwYXJhbS5oYWxsX3ZlcnNpb24gPSBHbG9iYWwuVG9vbGtpdC5nZW5Mb2FkaW5nQXBwSW5mbygpXHJcbiAgICAgICAgLy/lubPlj7BpZFxyXG4gICAgICAgIHBhcmFtLnBsYXRmb3JtX2lkID0gR2xvYmFsLlNldHRpbmcuYXBwRGF0YVBsYXRmb3JtSWQgfHwgMDtcclxuICAgICAgICAvL+aXpeW/l+Wkp+exu+Wei1xyXG4gICAgICAgIHBhcmFtLmNsYXNzID0ga2V5O1xyXG4gICAgICAgIC8v5pel5b+X5a2Q57G75Z6LXHJcbiAgICAgICAgcGFyYW0uc3ViX2NsYXNzID0gc3ViS2V5O1xyXG4gICAgICAgIC8v5pel5b+X5YaF5a65XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTdHIgPSBcIlwiXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29udGVudFN0ciA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGVudFN0ciA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyYW0uY29udGVudCA9IGNvbnRlbnRTdHI7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQuZXJyb3JfY29kZSkge1xyXG4gICAgICAgICAgICBwYXJhbS5lcnJvcl9jb2RlID0gY29udGVudC5lcnJvcl9jb2RlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250ZW50Lmh0aW1lIHx8IGNvbnRlbnQuaFRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuaHRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmh0aW1lID0gY29udGVudC5odGltZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LmhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5odGltZSA9IGNvbnRlbnQuaFRpbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSlcclxuICAgICAgICAgICAgcGFyYW0uZ2lkID0gR2FtZS5Db250cm9sLmN1ckdpZDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHBhcmFtLmdpZCA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pel5b+X57yT5a2Y5YaZ5YWlbG9jYWxTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2F2ZUxvZ0NhY2hlVG9TdG9yYWdlKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5Mb2dDYWNoZSk7XHJcbiAgICAgICAgICAgIGxldCBlbmNyeXB0Q29udGVudCA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LCBHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdiwgY29udGVudCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlBvc3RMb2dDYWNoZSwgZW5jcnlwdENvbnRlbnQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInNhdmVMb2dDYWNoZVRvU3RvcmFnZTrml6Xlv5flhpnnvJPlrZjlpLHotKVcIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOaciee8k+WtmCDlkIzml7bmuIXpmaRTdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJMb2dDYWNoZUFsbCgpIHtcclxuICAgICAgICB0aGlzLkxvZ0NhY2hlID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxvZ0NhY2hlID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5Qb3N0TG9nQ2FjaGUsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaooeaLn+mUmeivr+aXpeW/l+S4iuaKpSDmqKHmi5/kuqfnlJ8yMDDmnaHml6Xlv5cg5q+P5p2h5pel5b+X5Lqn55Sf6Ze06ZqUMS0xMOenkiDlkITnp43lpKfnsbvlnovku6Xlj4rlsI/nsbvlnovml6Xlv5dcclxuICAgICAqL1xyXG4gICAgLy8gcHJpdmF0ZSB0ZXN0TG9nQ2FjaGVGdW5jKCl7XHJcbiAgICAvLyAgICAgbGV0IHN1YktleUxpc3QgPSBbXHJcbiAgICAvLyAgICAgICAgIFwiSFRUUF9FUlJPUlwiLFxyXG4gICAgLy8gICAgICAgICBcIkRBVEFfRVJST1JcIixcclxuICAgIC8vICAgICAgICAgXCJDSEVDS1ZFUlNJT05fRVJST1JcIixcclxuICAgIC8vICAgICAgICAgXCJMT0dJTl9FUlJPUlwiLFxyXG4gICAgLy8gICAgICAgICBcIkhUVFBETlNfRVJST1JcIixcclxuICAgIC8vICAgICAgICAgXCJIT1RVUERBVEVfRVJST1JcIixcclxuICAgIC8vICAgICAgICAgXCJKU09OX0VSUk9SXCIsXHJcbiAgICAvLyAgICAgICAgIFwiSU5JVF9URFVOX0VSUk9SXCIsXHJcbiAgICAvLyAgICAgICAgIFwiU09DS0VUX0VSUk9SXCIsXHJcbiAgICAvLyAgICAgICAgIFwiVEVTVF9ST1VURVwiLFxyXG4gICAgLy8gICAgICAgICBcIklOSVRfRFVOX09LXCIsXHJcbiAgICAvLyAgICAgICAgIFwiUkVRVUVTVF9SRUNPUkRcIixcclxuICAgIC8vICAgICAgICAgXCJDSEFOTkVMX1NPVVJDRVwiLFxyXG4gICAgLy8gICAgICAgICBcIlBBUkFMTEVMX1JFUVwiXHJcbiAgICAvLyAgICAgXTtcclxuICAgIC8vICAgICAvLzEyMC0zMCsxXHJcbiAgICAvLyAgICAgLy8gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihtYXgtbWluKzEpK21pbik7XHJcbiAgICAvLyAgICAgbGV0IHJhbmRvbVRpbWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqOTErMzApOy8v6ZqP5py65pe26Ze0XHJcbiAgICAvLyAgICAgbGV0IHJhbmRvbUtleSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkgPT0gMCA/IFJlcG9ydFRvb2wuREVCVUdfTE9HIDogUmVwb3J0VG9vbC5FUlJPUl9MT0c7IC8v6ZqP5py65aSn57G75Z6LXHJcbiAgICAvLyAgICAgbGV0IHJhbmRvbVN1YmtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxNCk7Ly/pmo/mnLrlsI/nsbvlnotcclxuICAgIC8vICAgICBpZihyYW5kb21UaW1lID09IDApe1xyXG4gICAgLy8gICAgICAgICB0aGlzLnRlc3RMb2dDYWNoZUZ1bmMoKTtcclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAvLyAgICAgICAgIHRoaXMudGVzdE51bSArPSAxO1xyXG4gICAgLy8gICAgICAgICBpZih0aGlzLnRlc3ROdW0+PXRoaXMudGVzdENvdW50KSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgIGxldCBjb250ZW50OmFueSA9IHt9O1xyXG4gICAgLy8gICAgICAgICBpZihyYW5kb21UaW1lPDYwKXtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQuZGF0YSA9IGDml6Xlv5flkIjlubbkuIrmiqUke3RoaXMudGVzdE51bX09PT3ml7bpl7Tpl7TpmpQ6JHtyYW5kb21UaW1lfWA7XHJcbiAgICAvLyAgICAgICAgIH1lbHNlIGlmKHJhbmRvbVRpbWU8OTApe1xyXG4gICAgLy8gICAgICAgICAgICAgY29udGVudC5kYXRhID0gYOaXpeW/l+WQiOW5tuS4iuaKpSR7dGhpcy50ZXN0TnVtfT09PeaXtumXtOmXtOmalDoke3JhbmRvbVRpbWV9YDtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQuZXJyb3JfY29kZSA9IGBlcnJvcl9jb2RlXyR7cmFuZG9tVGltZX1gXHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgY29udGVudC5kYXRhID0gYOaXpeW/l+WQiOW5tuS4iuaKpSR7dGhpcy50ZXN0TnVtfT09PeaXtumXtOmXtOmalDoke3JhbmRvbVRpbWV9YDtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQuZXJyb3JfY29kZSA9IGBlcnJvcl9jb2RlXyR7cmFuZG9tVGltZX1gXHJcbiAgICAvLyAgICAgICAgICAgICBjb250ZW50Lmh0aW1lID0gMTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQuaFRpbWUgPSAyO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHRoaXMuUmVwb3J0TG9nTWl4aW5nKHJhbmRvbUtleSxzdWJLZXlMaXN0W3JhbmRvbVN1YmtleV0sY29udGVudCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudGVzdExvZ0NhY2hlRnVuYygpO1xyXG4gICAgLy8gICAgIH0scmFuZG9tVGltZSoxMDAwKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuUmVjb3JkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCA+PSB0aGlzLlJFQ09ERV9USU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZWNvcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy815YiG6ZKf5LiK5oql5LiA5qyh5pel5b+XXHJcbiAgICAgICAgdGhpcy5sb2dDYWNoZUludGVydmFsICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NhY2hlSW50ZXJ2YWwgPj0gdGhpcy5tYXhMb2dDYWNoZUludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nQ2FjaGVJbnRlcnZhbCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuUmVwb3J0Q2FjaGVUaW1lb3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmNsYXNzIFNvY2tldFJlY29yZEluZm8ge1xyXG4gICAgcHVibGljIGFkZHJIb3N0OiBzdHJpbmdcclxuICAgIHB1YmxpYyBob3N0OiBzdHJpbmdcclxuICAgIHB1YmxpYyBhZGRyOiBzdHJpbmdcclxuICAgIHB1YmxpYyBsb190eXBlID0gMDtcclxuICAgIHB1YmxpYyBwb3J0ID0gMDtcclxuICAgIHB1YmxpYyBzQ291bnQgPSAwO1xyXG4gICAgcHVibGljIGZDb3VudCA9IDA7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoc2VydmVyVXJsOiBTZXJ2ZXJVcmwpIHtcclxuICAgICAgICBpZiAoc2VydmVyVXJsID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIGxldCByZWNvcmRJbmZvID0gbmV3IFNvY2tldFJlY29yZEluZm8oKVxyXG4gICAgICAgIHJlY29yZEluZm8uYWRkckhvc3QgPSBzZXJ2ZXJVcmwuYWRkcmVzc0hvc3RcclxuICAgICAgICByZWNvcmRJbmZvLmhvc3QgPSBzZXJ2ZXJVcmwucmVhbEhvc3RcclxuICAgICAgICByZWNvcmRJbmZvLnBvcnQgPSBzZXJ2ZXJVcmwucG9ydFxyXG4gICAgICAgIHJlY29yZEluZm8ubG9fdHlwZSA9IHNlcnZlclVybC5sb190eXBlXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZEluZm9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZUVtcHR5KGluZm86IFNvY2tldFJlY29yZEluZm8pIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoaW5mb1trZXldID09IDAgJiYga2V5ICE9IFwiZkNvdW50XCIgJiYga2V5ICE9IFwic0NvdW50XCIpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaW5mb1trZXldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmZvLmFkZHJIb3N0ID09IGluZm8uaG9zdClcclxuICAgICAgICAgICAgZGVsZXRlIGluZm8uYWRkckhvc3RcclxuXHJcbiAgICAgICAgaWYgKGluZm8uYWRkciA9PSBpbmZvLmhvc3QpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBpbmZvLmFkZHJcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGluZVJlY29yZEluZm8ge1xyXG4gICAgcHVibGljIGFkZHJIb3N0OiBzdHJpbmdcclxuICAgIHB1YmxpYyBob3N0OiBzdHJpbmdcclxuICAgIHB1YmxpYyBhZGRyOiBzdHJpbmdcclxuICAgIHB1YmxpYyBwb3J0ID0gMFxyXG4gICAgcHVibGljIGxvX3R5cGUgPSAwXHJcbiAgICBwdWJsaWMgdG90YWxIQlRpbWU6IG51bWJlciA9IDBcclxuICAgIHB1YmxpYyB0b3RhbEhCQ291bnQ6IG51bWJlciA9IDBcclxuICAgIHB1YmxpYyBtYXhIQlRpbWU6IG51bWJlciA9IDBcclxuICAgIHB1YmxpYyBzQ291bnQgPSAwO1xyXG4gICAgcHVibGljIGZDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgZXJyQ29kZU1hcCA9IHt9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHNlcnZlclVybDogU2VydmVyVXJsKSB7XHJcbiAgICAgICAgaWYgKHNlcnZlclVybCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICBsZXQgcmVjb3JkSW5mbyA9IG5ldyBMaW5lUmVjb3JkSW5mbygpXHJcbiAgICAgICAgcmVjb3JkSW5mby5hZGRySG9zdCA9IHNlcnZlclVybC5hZGRyZXNzSG9zdFxyXG4gICAgICAgIHJlY29yZEluZm8uaG9zdCA9IHNlcnZlclVybC5yZWFsSG9zdFxyXG4gICAgICAgIHJlY29yZEluZm8ucG9ydCA9IHNlcnZlclVybC5wb3J0XHJcbiAgICAgICAgcmVjb3JkSW5mby5sb190eXBlID0gc2VydmVyVXJsLmxvX3R5cGVcclxuICAgICAgICByZXR1cm4gcmVjb3JkSW5mb1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVsZXRlRW1wdHkoaW5mbzogTGluZVJlY29yZEluZm8pIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoaW5mb1trZXldID09IDAgJiYga2V5ICE9IFwiZkNvdW50XCIgJiYga2V5ICE9IFwic0NvdW50XCIpXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaW5mb1trZXldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmZvLmFkZHJIb3N0ID09IGluZm8uaG9zdClcclxuICAgICAgICAgICAgZGVsZXRlIGluZm8uYWRkckhvc3RcclxuXHJcbiAgICAgICAgaWYgKGluZm8uYWRkciA9PSBpbmZvLmhvc3QpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBpbmZvLmFkZHJcclxuICAgIH1cclxuXHJcblxyXG59Il19