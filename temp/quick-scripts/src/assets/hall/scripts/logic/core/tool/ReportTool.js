"use strict";
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