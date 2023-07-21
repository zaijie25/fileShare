import HallStorageKey from "../../hallcommon/const/HallStorageKey";
import { ServerUrl } from "../setting/ServerRoutes";

export class ReportTool {
    //获取到nativeparam
    public static REPORT_TYPE_OPEN = 1;
    //获取appdata之后 开始热更之前
    public static REPORT_TYPE_START_CHECKVERSION = 2;
    //登录成功上报
    public static REPORT_TYPE_LOGIN = 3;

    //HTTP 异常上报
    public static REPORT_TYPE_HTTP_ERROR = "HTTP_ERROR";
    //data 异常上报
    public static REPORT_TYPE_DATA_ERROR = "DATA_ERROR"
    //checkversion 异常上报
    public static REPORT_TYPE_CHECKVERSION_ERROR = "CHECKVERSION_ERROR"
    //login 异常上报
    public static REPORT_TYPE_LOGIN_ERROR = "LOGIN_ERROR"
    //httpDNS 异常上报
    public static REPORT_TYPE_HTTPDNS_ERROR = "HTTPDNS_ERROR"
    //热更失败上报
    public static REPORT_TYPE_HOT_UPDATE_ERROR = "HOTUPDATE_ERROR"
    //解析json失败上报
    public static REPORT_TYPE_JSON_ERROR = "JSON_ERROR"
    //初始化T盾失败
    public static REPORT_TYPE_INIT_DUN_ERROR = "INIT_DUN_ERROR"
    //socket 上报
    public static REPORT_TYPE_SOCKET_ERROR = "SOCKET_ERROR";
    //测试线路 上报
    public static REPORT_TYPE_TEST_ROUTE = "TEST_ROUTE";
    //初始化盾成功
    public static REPORT_TYPE_INIT_DUN_OK = "INIT_DUN_OK"

    //上报请求成功和失败的次数  每次启动时上报
    public static REPORT_TYPE_REQUEST_RECORD = "REQUEST_RECORD";

    //测试data 上报
    public static REPORT_TYPE_DATA_ROUTE = "REPORT_TYPE_DATA_ROUTE";

    //渠道的源
    public static REPORT_TYPE_CHANNEL_SOURCE = "CHANNEL_SOURCE";
    //热更失败域名上报
    public static REPORT_TYPE_HOTUPDATE_HOST_ERROR = "HOTUPDATE_HOST_ERROR";
    //子游戏热更正常上报
    public static REPORT_TYPE_DOWNLOADSUBGAME_RESULT = "REPORT_TYPE_DOWNLOADSUBGAME_RESULT";

    //子游戏热更失败上报
    public static REPORT_TYPE_DOWNLOADSUBGAME_FAILED = "REPORT_TYPE_DOWNLOADSUBGAME_FAILED";
    //进入子游戏异常
    public static REPORT_TYPE_LOADSUBGAME_ERROR: "REPORT_TYPE_LOADSUBGAME_ERROR"


    //并发请求上报
    public static REPORT_TYPE_PARALLEL_REQ = "PARALLEL_REQ";


    //客户端上报日志
    public static DEBUG_LOG = "debug";
    //客户端错误日志
    public static ERROR_LOG = "error";

    public logUrlsList = []

    public reportUrl = ""


    //上报调试日志开关，通过checkversion下发，rootadmin控制
    public debugEnable = false;

    //debug uid 。 防止切换账号问题
    public debugUid = 0;

    //当前使用的线路索引
    private curIndex = 0;
    //上报次数
    private reportTimes = 0

    //日志是否合并上报
    private merge: boolean = true;
    //缓存日志上限 默认5条
    private maxLogCount = 5;
    //缓存日志时间上限 默认5分钟 秒数
    private maxLogCacheInterval = 5 * 60;
    //缓存日志DeBug
    private LogCache: Array<any> = new Array<any>();
    //缓存日志定时器
    private logCacheInterval = 0;
    //测试字段 (测试条数)
    // private testCount = 200;
    //测试字段 (已经产生的日志数)
    // private testNum = 0;
    //热更失败只上报一次
    private hotUpdateReport = {}

    //暂定为appdata修改，重启app生效
    public init() {
        Global.Event.off(GlobalEvent.RefreshHallNetCost, this, this.onRefreshHallCostTime)
        Global.Event.on(GlobalEvent.RefreshHallNetCost, this, this.onRefreshHallCostTime)
        this.reportTimes = 0
 
        this.loadLocalLogUrls();
        // if(url && url.indexOf("http") > -1)
        //     this.reportUrl = url;
        this.initReportUrl();
    }

    private getReportUrl() {
        let reportUrl = Global.Setting.storage.get(HallStorageKey.ReportUrl);
        if (reportUrl == '') {
            Logger.error("reportUrl = null")
            return;
        }
        let tempUrl = JSON.parse(reportUrl)
        if (tempUrl) {
            let url = tempUrl.split('/c')[0]
            this.logUrlsList = [url];
            this.reportUrl = url + "/logCenter/";
        }
    }


    //判断host是否是reportUrl
    public isReportUrl(reportUrl: ServerUrl) {
        let host = reportUrl.realHost
        let returnValue = false;
        for (let i = 0; i < this.logUrlsList.length; i++) {
            let url = this.logUrlsList[i]
            if (url.indexOf(host) > -1) {
                returnValue = true;
            }
        }

        return returnValue;
    }

    private loadLocalLogUrls() {
        let urlsStr: string = Global.Setting.storage.get(HallStorageKey.ReportUrl);
        var arr: string[] = [];
        try {
            if (urlsStr != null && urlsStr != ""){
                let t = JSON.parse(urlsStr)
                arr.push(t);
            }
        }
        catch (e) {
            Logger.error("解析ReportUrl失败", urlsStr);
        }
        if (arr == null || arr.length == 0 )
            return;
        //过滤无效日志
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].indexOf("http") == -1) {
                Logger.error("过滤无效域名:", arr[i]);
                arr.splice(i, 1);
            }
        }
        if (arr.length > 0)
            this.logUrlsList = arr;
        //处理多地址同host
        this.logUrlsList = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(this.logUrlsList)
    }


    private initReportUrl() {
        let length = this.logUrlsList.length;
        if (length == 0) {
            Logger.error("Report URL is null"!!!);
            return;
        }
        this.curIndex = Global.Toolkit.getRoundInteger(length, 0);
        this.refreshReportUrl();
        // if(this.logUrlsList[randIndex] && this.logUrlsList[randIndex].indexOf("http") > -1)
        // {
        //     this.reportUrl = this.logUrlsList[randIndex] + "/logCenter/";
        // }
    }


    private refreshReportUrl() {
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
    }

    private changeReportUrl() {
        this.curIndex = (this.curIndex + 1) % this.logUrlsList.length
        this.refreshReportUrl();
    }

    public ParseDebugConfig(config, uid) {
        if (config.debug && config.debug == 1) {
            Global.ReportTool.debugEnable = true;
            this.debugUid = uid;
        }
    }

    //**
    // * 上报客户端日志
    // * @param key 日志标识
    // * @param param 上报内容
    // * 只有debugEnable为true时生效 用于灰度上报
    // */
    public ReportPublicDebugLog(key, param) {
        if (!this.debugEnable || this.debugUid != this.uid)
            return;
        // this.ReportLogInternal(ReportTool.DEBUG_LOG, key, param);
        this.ReportLogMixing(ReportTool.DEBUG_LOG, key, param);
    }

    public ReportPublicClientLog(key, param, bacth = false) {

        // this.ReportLogInternal(ReportTool.DEBUG_LOG, key, param,bacth);
        //测试日志系统方法
        // this.testLogCacheFunc();
        this.ReportLogMixing(ReportTool.DEBUG_LOG, key, param);
    }

    public genHallKey(key) {
        return "Hall_" + key;
    }

    public genGameKey(key) {
        let gid = Game.Control.curGid;
        return "Game_" + gid + "_" + key;
    }

    //**
    // * 上报客户端错误日志
    // * @param key 日志标识
    // * @param param 上报内容
    // */
    public ReportClientError(key, param) {
        //热更上报只上报一次
        if (key == ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR) {
            let gameType = param.game
            if (!gameType) {
                return;
            }
            if (this.hotUpdateReport[gameType]) {
                return;
            }
            this.hotUpdateReport[gameType] = 1
        }
        this.reportTimes++
        // this.ReportLogInternal(ReportTool.ERROR_LOG, key, param);
        this.ReportLogMixing(ReportTool.ERROR_LOG, key, param);
    }

    //上报设备信息
    public ReportDevice(type) {
        this.getReportUrl();
        if(this.reportUrl == '') return;
        let url = this.reportUrl + "basic?";
        let param = this.genDeviceParam();
        param._param.stype = type;
        let serverUlr = new ServerUrl()
        serverUlr.parse(url)

        if (cc.sys.os == cc.sys.OS_IOS) {
            Logger.log("ReportDevice ios param:" + param);

        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            Logger.log("ReportDevice android param:" + param);

        }

        Global.Http.send(serverUlr, param, () => { }, () => {
            this.changeReportUrl();
        });
    }


    public GetReportTimes() {
        return this.reportTimes
    }



    private get phoneCode() {
        return Global.Setting.storage.get(HallStorageKey.AreaCode) || "";
    }

    private get loginIp() {
        if (Global.PlayerData && Global.PlayerData.ip)
            return Global.PlayerData.ip;
        return ""
    }

    private get uid() {
        if (Global.PlayerData && Global.PlayerData.uid)
            return Global.PlayerData.uid;
        return Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
    }

    private get vip() {
        if (Global.PlayerData && Global.PlayerData.vip)
            return Global.PlayerData.vip;
        return Number(Global.Setting.storage.get(HallStorageKey.VIPLevel)) || 0;
    }

    private get packId() {
        if (Global.PlayerData && Global.PlayerData.pack)
            return Global.PlayerData.pack;
        return Number(Global.Setting.storage.get(HallStorageKey.Channel)) || 0;
    }

    private get hallSkin() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.hallSkin) {
            return Global.Setting.SystemInfo.hallSkin
        }
        return ""
    }

    private get gameSkin() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.gameSkin) {
            return Global.Setting.SystemInfo.gameSkin
        }
        return ""
    }

    private get packageTag() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.packageTag) {
            return Global.Setting.SystemInfo.packageTag
        }
        return ""
    }

    private get pid() {
        if (Global.PlayerData && Global.PlayerData.pid)
            return Global.PlayerData.pid;
        return Number(Global.Setting.storage.get(HallStorageKey.InviteCode)) || 0;
    }

    private get userType() {
        if (Global.PlayerData && Global.PlayerData.type)
            return Global.PlayerData.type;
        return 0;
    }

    private get udid() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.udid)
            return Global.Setting.SystemInfo.udid.toString()
        return "0"
    }

    private get entry() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.entry)
            return Global.Setting.SystemInfo.entry.toString()
        return ""
    }


    private get sign_type() {
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.sign_type)
            return Global.Setting.SystemInfo.sign_type.toString()
        return ""
    }


    private get appId() {
        if (Global.Setting.appId)
            return Global.Setting.appId;
        return Global.Setting.SystemInfo.appID;
    }

    private get osType() {
        if (!cc.sys.isNative)
            return 0;
        if (cc.sys.os == cc.sys.OS_ANDROID)
            return 1;
        if (cc.sys.os == cc.sys.OS_IOS)
            return 2;
        return 0;
    }

    private get phone() {
        if (Global.PlayerData && Global.PlayerData.phone)
            return Global.PlayerData.phone;
        return Global.Setting.storage.get(HallStorageKey.Phone) || "";
    }




    /**
     * 
     * @param type 日志类型
     * @param key 日志标识key
     * @param contentTab 参数
     * @param bacth 是否多条
     */
    private ReportLogInternal(type, key, contentTab, bacth = false) {
        this.getReportUrl();
        if(this.reportUrl == '') return;
        if (contentTab == null)
            contentTab = {}
        if (Global.Setting.SystemInfo == null)
            return;

        let suffix = "clis?"
        if (bacth) {
            suffix = "batchclis?"
        }
        let url = this.reportUrl + suffix;
        let paramTab: any = {}
        paramTab._mod = "logAgent";
        paramTab._func = "clientLog";
        let param: any = {}
        //大类型
        param.class = type;
        //子类型
        param.sub_class = key;
        let contentStr = ""
        try {
            contentStr = JSON.stringify(contentTab);
        }
        catch
        {
            contentStr = ""
        }
        //上报具体内容
        param.content = contentStr;
        if (contentTab.error_code) {
            param.error_code = contentTab.error_code
        }
        if (contentTab.htime || contentTab.hTime) {
            if (contentTab.htime) {
                param.htime = contentTab.htime
            }
            if (contentTab.hTime) {
                param.htime = contentTab.hTime
            }

        }

        this.packLogParam(param);

        paramTab._param = param;
        let serverUlr = new ServerUrl()
        serverUlr.parse(url)
        Global.Http.send(serverUlr, paramTab, () => { }, () => {
            this.changeReportUrl();
        });
    }

    //合并上报接口
    private ReportLogMergeInternal(params: any) {
        this.getReportUrl();
        if(this.reportUrl == '') return;
        if (params == null)
            params = {}
        if (Global.Setting.SystemInfo == null) return;
        let paramTab: any = {}
        paramTab._mod = "logAgent";
        paramTab._func = "clientLog";
        paramTab._param = params;
        let suffix = "batchclis?";
        let url = this.reportUrl + suffix;
        let serverUlr = new ServerUrl()
        serverUlr.parse(url)
        Global.Http.send(serverUlr, paramTab, () => { }, () => {
            this.changeReportUrl();
        });
    }


    //通用log 参数填充
    private packLogParam(param) {
        //上报的客户端时间
        param.client_time = Date.now();
        //系统类型
        param.os_type = this.osType;
        //设备id
        param.device_id = Global.Setting.SystemInfo.deviceId;
        //系统版本
        param.os_version = cc.sys.osVersion;
        //包tag
        param.tagInfo = cc.js.formatStr("%s|%s|%s", this.hallSkin, this.gameSkin, this.packageTag)

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

        param.udid = this.udid

        param.sign_type = this.sign_type

        param.entry = this.entry
        param.ios_type = Global.Toolkit.getIosSignType()

        // vip
        param.vip = this.vip
        //手机号
        param.mobile = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, this.phone)
        //服务器设备唯一码
        param.server_id = Global.Setting.SystemInfo.server_id || "";
        //大厅版本
        param.hall_version = Global.Toolkit.genLoadingAppInfo()
        //平台id
        param.platform_id = Global.Setting.appDataPlatformId || 0;


        if (Global.SceneManager.inGame())
            param.gid = Game.Control.curGid;
        else
            param.gid = 0;
    }

    private genDeviceParam() {
        let paramTab: any = {}
        paramTab._mod = 'logAgent';
        paramTab._func = "clientLog";
        let param: any = {}
        let sysInfo = Global.Setting.SystemInfo;
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
        param.pack_id = this.packId
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
        param.hall_version = Global.Toolkit.genLoadingAppInfo()

        param.udid = this.udid

        param.sign_type = this.sign_type

        param.entry = this.entry

        param.ios_type = Global.Toolkit.getIosSignType()

        //剪贴板内容
        if (Global.ChannelUtil.isCliptextVaild())
            param.clipboardContent = Global.Setting.ChannelInfo.clipboardContent || "";
        //模拟器
        param.simulator = sysInfo.simulator;

        this.packLogParam(param);

        paramTab._param = param;
        return paramTab;
    }



    //每60秒写一次到缓存
    private RECODE_TIME = 60;
    private REQUEST_SUCCESS = "sCount";
    private REQUEST_FAILED = "fCount";
    private interval = 0;
    //记录成功的请求次数和域名
    private requestResultMap: { [key: string]: LineRecordInfo } = {};
    private socketResultMap: { [key: string]: SocketRecordInfo } = {};
    //上报总数据结构
    private recordTab: any = {}

    //热更结束之后，才可以写本地缓存，防止restart 导致日志重复上报
    public canRecord = false;

    public enableRecord() {
        this.canRecord = true;
    }

    public markSuccess(serverUrl: ServerUrl) {
        if (!serverUrl)
            return;
        this.recordRequestResult(serverUrl, this.REQUEST_SUCCESS)
    }

    public markFailed(serverUrl: ServerUrl, httpStatus: number) {
        if (!serverUrl)
            return;
        this.recordRequestResult(serverUrl, this.REQUEST_FAILED, httpStatus)
    }

    //统计socket链接成功失败  error_code = -1 不统计
    public markSocketFailed(serverUrl: ServerUrl, errorCode: number) {
        if (!serverUrl)
            return;
        this.recordSocketResult(serverUrl, this.REQUEST_FAILED, errorCode)
    }

    public markSocketSuccess(serverUrl: ServerUrl) {
        if (!serverUrl)
            return;
        this.recordSocketResult(serverUrl, this.REQUEST_SUCCESS)
    }

    //请求失败或者成功 计数+1
    //type: 1 成功 2 失败
    private recordRequestResult(serverUrl: ServerUrl, type, httpStatus = 0) {
        let host = serverUrl.realHost;
        if (!host)
            return;

        if (this.requestResultMap[host] == null) {
            this.requestResultMap[host] = LineRecordInfo.create(serverUrl)
        }
        let info = this.requestResultMap[host]
        if (info == null)
            return;
        if (type == this.REQUEST_FAILED) {
            info.fCount++;
            if (info.errCodeMap[httpStatus] == null)
                info.errCodeMap[httpStatus] = 0
            info.errCodeMap[httpStatus]++
        }
        else
            info.sCount++;
        //ip每次请求更新
        info.addr = serverUrl.address;
    }

    private recordSocketResult(serverUrl: ServerUrl, type, httpStatus = 0) {
        if (httpStatus == -2)
            return;
        let host = serverUrl.realHost;
        if (!host)
            return;

        if (this.socketResultMap[host] == null) {
            this.socketResultMap[host] = SocketRecordInfo.create(serverUrl)
        }
        let info = this.socketResultMap[host]
        if (info == null)
            return;
        if (type == this.REQUEST_FAILED)
            info.fCount++;
        else
            info.sCount++;
        //ip每次请求更新
        info.addr = serverUrl.address;
    }

    //上报上一次的请求计数
    public reportRequestRecord() {
        let recordStr = Global.Setting.storage.get(HallStorageKey.RequestRecord)
        if (recordStr == null || recordStr == "") {
            return;
        }
        try {
            let decodeStr = Global.AESUtil.aesDcryptWithPKC27(recordStr);
            let content = JSON.parse(decodeStr);
            this.ReportLogInternal(ReportTool.DEBUG_LOG, ReportTool.REPORT_TYPE_REQUEST_RECORD, content)
        }
        catch (e) {
            Logger.error("decode RequestRecord failed!!!", recordStr);
        }
        Global.Setting.storage.set(HallStorageKey.RequestRecord, "");
    }

    //记录心跳刷新时间
    private onRefreshHallCostTime(time, isHeartBeat, serverUrl) {
        if (!isHeartBeat) {
            return;
        }
        if (!this.requestResultMap[serverUrl.realHost])
            return;
        let info = this.requestResultMap[serverUrl.realHost]
        info.totalHBCount++;
        info.totalHBTime += time;
        if (info.maxHBTime < time)
            info.maxHBTime = time
    }


    //把日志缓存到本地，下次登录时再上报
    private saveRecord() {
        //加密后存储到本地
        try {
            this.recordTab.reqMap = this.requestResultMap;
            this.recordTab.sockMap = this.socketResultMap;
            for (var key in this.requestResultMap) {
                LineRecordInfo.deleteEmpty(this.requestResultMap[key])
            }
            for (var key in this.socketResultMap) {
                SocketRecordInfo.deleteEmpty(this.socketResultMap[key])
            }
            let content = JSON.stringify(this.recordTab);
            let encryptContent = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, content);
            Global.Setting.storage.set(HallStorageKey.RequestRecord, encryptContent);
        }
        catch (e) {
            Logger.error("JSON.stringify(this.successRequestMap) error !!!");
            this.requestResultMap = {};
            this.socketResultMap = {};
        }
    }

    /**
     * 超过时间限制无论缓存中有多少条日志都上报,同时清除缓存,清除Storage
     */
    private ReportCacheTimeout() {
        if (this.LogCache == null || this.LogCache.length == 0) return;
        try {
            let mergeLog: any = {};
            mergeLog.data = this.LogCache;
            this.ReportLogMergeInternal(mergeLog);
        } catch (error) {
            Logger.error("ReportCacheTimeout:超过时限上报日志错误", error);
        }
        this.clearLogCacheAll();
    }

    /**
     * 上报上次登录后缓存在Storage中的日志(无论多少) 
     */
    public ReportLastLoginLogCache() {
        let lastLoginCache = Global.Setting.storage.get(HallStorageKey.PostLogCache);
        if (lastLoginCache == null || lastLoginCache == "") return;
        try {
            let decodeStr = Global.AESUtil.aesDcryptWithPKC27(lastLoginCache);
            let content = JSON.parse(decodeStr) as Array<any>;
            let mergeLog: any = {};
            mergeLog.data = content;
            this.ReportLogMergeInternal(mergeLog);
        }
        catch (e) {
            Logger.error("decode RequestRecord failed!!!", lastLoginCache);
        }
        this.clearLogCacheAll();
    }

    /**
     * 将日志先入缓存然后再检测超过5条上报再写入localStorage
     * @param key       日志大类型
     * @param subKey    日志小类型
     * @param content   日志内容
     */
    private ReportLogMixing(key: string, subKey: string, content: any) {
        //直接上报 不入缓存
        if (!this.merge) {
            this.ReportLogInternal(key, subKey, content);
            return;
        }
        // 拿单条日志
        let subLog = this.newLogParams(key, subKey, content);
        this.LogCache.push(subLog);
        if (this.LogCache.length >= this.maxLogCount) {
            //上报
            let mergeLog: any = {};
            mergeLog.data = this.LogCache;
            this.ReportLogMergeInternal(mergeLog);
            //清空缓存
            this.clearLogCacheAll();
        } else {
            //写Storage
            this.saveLogCacheToStorage();
        }
    }

    //合并上 报生成一条子日志
    private newLogParams(key: string, subKey: string, content: any): any {
        let param: any = {};
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
        param.tagInfo = cc.js.formatStr("%s|%s|%s", this.hallSkin, this.gameSkin, this.packageTag)

        //设备型号
        param.phone_model = Global.Setting.SystemInfo.osBuildModel;

        param.udid = this.udid

        param.sign_type = this.sign_type

        param.entry = this.entry

        param.ios_type = Global.Toolkit.getIosSignType()

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
        param.vip = this.vip
        //手机号
        param.mobile = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, this.phone)
        //服务器设备唯一码
        param.server_id = Global.Setting.SystemInfo.server_id || "";
        //大厅版本
        param.hall_version = Global.Toolkit.genLoadingAppInfo()
        //平台id
        param.platform_id = Global.Setting.appDataPlatformId || 0;
        //日志大类型
        param.class = key;
        //日志子类型
        param.sub_class = subKey;
        //日志内容
        let contentStr = ""
        try {
            contentStr = JSON.stringify(content);
        }
        catch
        {
            contentStr = ""
        }
        param.content = contentStr;
        if (content.error_code) {
            param.error_code = content.error_code
        }
        if (content.htime || content.hTime) {
            if (content.htime) {
                param.htime = content.htime
            }
            if (content.hTime) {
                param.htime = content.hTime
            }
        }
        if (Global.SceneManager.inGame())
            param.gid = Game.Control.curGid;
        else
            param.gid = 0;
        return param;
    }

    /**
     * 日志缓存写入localStorage
     */
    private saveLogCacheToStorage() {
        try {
            let content = JSON.stringify(this.LogCache);
            let encryptContent = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, content);
            Global.Setting.storage.set(HallStorageKey.PostLogCache, encryptContent);
        } catch (error) {
            Logger.error("saveLogCacheToStorage:日志写缓存失败", error);
        }
    }

    /**
     * 清除所有缓存 同时清除Storage
     */
    private clearLogCacheAll() {
        this.LogCache = null;
        this.LogCache = new Array<any>();
        Global.Setting.storage.set(HallStorageKey.PostLogCache, "");
    }


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

    public onUpdate(dt) {
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
    }


}

class SocketRecordInfo {
    public addrHost: string
    public host: string
    public addr: string
    public lo_type = 0;
    public port = 0;
    public sCount = 0;
    public fCount = 0;

    public static create(serverUrl: ServerUrl) {
        if (serverUrl == null)
            return
        let recordInfo = new SocketRecordInfo()
        recordInfo.addrHost = serverUrl.addressHost
        recordInfo.host = serverUrl.realHost
        recordInfo.port = serverUrl.port
        recordInfo.lo_type = serverUrl.lo_type
        return recordInfo
    }

    public static deleteEmpty(info: SocketRecordInfo) {
        for (var key in info) {
            if (info[key] == 0 && key != "fCount" && key != "sCount")
                delete info[key]
        }
        if (info.addrHost == info.host)
            delete info.addrHost

        if (info.addr == info.host)
            delete info.addr
    }
}

class LineRecordInfo {
    public addrHost: string
    public host: string
    public addr: string
    public port = 0
    public lo_type = 0
    public totalHBTime: number = 0
    public totalHBCount: number = 0
    public maxHBTime: number = 0
    public sCount = 0;
    public fCount = 0;
    public errCodeMap = {}


    public static create(serverUrl: ServerUrl) {
        if (serverUrl == null)
            return
        let recordInfo = new LineRecordInfo()
        recordInfo.addrHost = serverUrl.addressHost
        recordInfo.host = serverUrl.realHost
        recordInfo.port = serverUrl.port
        recordInfo.lo_type = serverUrl.lo_type
        return recordInfo
    }

    public static deleteEmpty(info: LineRecordInfo) {
        for (var key in info) {
            if (info[key] == 0 && key != "fCount" && key != "sCount")
                delete info[key]
        }
        if (info.addrHost == info.host)
            delete info.addrHost

        if (info.addr == info.host)
            delete info.addr
    }


}