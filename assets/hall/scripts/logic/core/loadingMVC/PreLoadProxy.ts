import Const from './LoadingConst'
import HallStorageKey from '../../hallcommon/const/HallStorageKey';
import { NetLogin, NetCheckVersion } from '../net/hall/NetEvent';
import LoadingFacade from './LoadingFacade';
import { SceneType } from '../scene/SceneManager';
import AppHelper from '../tool/AppHelper';
import { ReportTool } from '../tool/ReportTool';
import LoginModel from '../../hallcommon/model/LoginModel';
import LoadingConst from './LoadingConst';
import AppHotUpdateProxy from './AppHotUpdateProxy';


//加载资源之前的操作
export default class PreLoadProxy extends puremvc.Proxy {
    static NAME = "PreLoadProxy";

    private urlIndex = 0;
    manifestNativeUrl: any
    private _startTime = -1
    /**data速度上报 */
    private reportParam : any= {}

    constructor(manifest) {
        super();
        this.manifestNativeUrl = manifest.nativeUrl;
        this.proxyName = PreLoadProxy.NAME;
    }

    onRegister() {
        //初始化APP 相关信息
        Global.NativeEvent.onInit();
        Global.NativeEvent.getNativeParams(this.onloadPackChannelInfo.bind(this))

        //读取配置

        //上述操作如果卡UI进程需要用异步来操作
        Global.NativeJSBBridge.init();
        this.initDataUrls();
        //getNativeParams是同步的  不需要等待
        AppHelper.init();
        Global.DNS.init();
        //可异步也可同步
        Global.AppDun.init();
        this.requestAppUrl();
        //Global.ReportTool.ReportDevice(ReportTool.REPORT_TYPE_OPEN);
       
    }

    private onloadPackChannelInfo() {
        LoadingFacade.Instance.sendNotification(Const.UPDATE_LOADING_VERSION)

        let packCh = Global.Setting.SystemInfo.packChannel;
        if (packCh != null && packCh != "" && !isNaN(Number(packCh))) {
            Global.Setting.ChannelInfo.packageChannel = Number(packCh);
        }
    }

    private initDataUrls() {
        if(CC_PREVIEW || cc.sys.isBrowser)
        {
            Global.Setting.dataUrlsList = []
            let appdataUrlArray = Global.Setting.Urls.dataUrls;
            // let dataName = Global.Setting.getCfgDataName();
            let dataName = "3002_intest";
            if (appdataUrlArray && appdataUrlArray.length > 0) {
                for (let i = 0; i < appdataUrlArray.length; i++) {
                    let constUrl: string = appdataUrlArray[i]
                    let constDataUrl = constUrl;
                    constDataUrl = constDataUrl + cc.js.formatStr("/%s?",Global.Toolkit.md5(dataName))
                    Logger.error("constDataUrl = " + constDataUrl)
                    Global.Setting.dataUrlsList.push(constDataUrl);
                }
            }
            return
        }
        Global.Setting.dataUrlsList = [];
        let dataUrls = Global.Setting.loadDataUrls();
        if(dataUrls && dataUrls.length > 0)
        {
            for (let i = 0; i < dataUrls.length; i++) {
                let dUrl = this.repackUrl(dataUrls[i]);
                Global.Setting.dataUrlsList.push(dUrl);
            }
        }
        else
        {
            //取不到本地缓存就是用包里面的dataUrls
            dataUrls = Global.Setting.SystemInfo.appConstUrlArray;
            for (let i = 0; i < dataUrls.length; i++) {
                let dUrl = this.repackUrl(dataUrls[i]);
                Global.Setting.dataUrlsList.push(dUrl);
            }   
        }
    }

   
    private repackUrl(url:string)
    {
        //如果配置了问号 则直接用配置下发的   
        if(url.indexOf("?") > -1)
        {
            if(!url.startsWith("http"))
                url = "https://" + url;
            return url;
        }
        let protocal = "https:"
        let protocalArr = url.split("//");
        if(protocalArr.length > 1)
        {
            protocal = protocalArr[0];
            url = protocalArr[1];
        }
        let host = Global.UrlUtil.getHostFromUrl(url);
        let dataName = Global.Setting.SystemInfo.appID
        //兼容个别老版本  20000版本强更后 可删除
        if(dataName == null || dataName == "")
        {
            dataName = Global.Setting.getConstUrlDataName();
        }
        let subPlatform = Global.Setting.SystemInfo.subPlatformID
        let dataStr = ""
        if(subPlatform == "intest") dataStr = dataName + (subPlatform ? "_" + subPlatform : "");
        else dataStr = subPlatform;
        dataStr = Global.Toolkit.md5(dataStr)
        return protocal + "//" + host + "/c/" + dataStr + "?";
    }


   

    //请求appdata 数据
    requestAppUrl() {
        //关掉闪屏页
        Global.NativeEvent.hideSplashView();
        this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "正在获取配置数据..." })
        if(CC_PREVIEW)
        {
            this.reqServerAppConfig();
            return
        }
        //加载本地缓存配置
        if (!this.loadLocalAppConfig()) {
            this.reqServerAppConfig();
        }
        else {
            this.reqVerifyServerAppConfig();
        }
    }

    //本地缓存的服务器配置数据
    private cachedServerContent;

    //本地没有缓存，请求服务器配置
    private reqServerAppConfig() {
        this._startTime = new Date().valueOf();
        let url = this.getConfigUrl();
        let uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        url += "uid=" + uid + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + Date.now()
        Global.Setting.dataUrlIndex = this.urlIndex;
        url = Global.UrlUtil.refreshSuffixOperTime(url)
        url = Global.UrlUtil.refreshSuffixRetryTime(url, this.urlIndex);
        Global.Setting.curDataUrl = url;
        //key, maxTime, value = "", minTime = 1,enableMask = true
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"reqServerAppConfig",15,"",1,false)
        Logger.error(`发送了消息${url}=========`);
        Global.Http.getWithRetry(url, this.handleAppConfig.bind(this), this.handleCfgReqeustError.bind(this),null,0,false);
    }

    //本地有缓存，先进游戏，再和服务器数据做校验
    private reqVerifyServerAppConfig() {
        this._startTime = new Date().valueOf();
        let url = this.getConfigUrl();
        let uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        url += "uid=" + uid + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + Date.now()
        url = Global.UrlUtil.refreshSuffixOperTime(url)
        url = Global.UrlUtil.refreshSuffixRetryTime(url, this.urlIndex);
        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = url;
        Global.Http.get(url, this.verifyServerCfg.bind(this), this.verifyServerCfgError.bind(this));
    }

    private verifyServerCfgError() {
        this.urlIndex++;
        if (this.urlIndex < Global.Setting.dataUrlsList.length) {
            Logger.error("use back up verify")
            this.reqVerifyServerAppConfig();
        }
    }

    private handleCfgReqeustError() {
        this.reportParam = {}
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"reqServerAppConfig")
        this.reportDataUrlSpeed(0)
        
        this.urlIndex++;
        if (this.urlIndex < Global.Setting.dataUrlsList.length) {
            this.reqServerAppConfig();
        }
        else {
            this.urlIndex = 0;
            Global.UI.showSingleBox("配置文件拉取失败，请检查网络连接", this.reqServerAppConfig.bind(this), this.reqServerAppConfig.bind(this));
        }
    }
    



    /**
     * 加载本地缓存配置，并且解析
     * @private
     * @returns
     */
    private loadLocalAppConfig() {
        let content = Global.Setting.storage.get(HallStorageKey.AppConfigContent);
        if (content == null || content == "")
            return false;
        this.cachedServerContent = content;
        this._startTime = -1
        this.handleAppConfig(content, false);
        Logger.log("加载本地缓存直接进游戏")
        return true;
    }


    //获取appconfig主地址
    private getConfigUrl() {
        //默认配置地址

        let url = Global.Setting.dataUrlsList[this.urlIndex];
        if (url == null) {
            url = Global.Setting.dataUrlsList[0]
            this.urlIndex = 0;
        }
        return url;
    }


    //解析AppConfig 进入热更流程
    private handleAppConfig(msg, saveStoreage = true) {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"reqServerAppConfig")
        
        this.reportParam = {}
        try {
            let decodeMsg = Global.AESUtil.decodeMsg(msg);
            let serverCfg = JSON.parse(decodeMsg);
            
           let reportUrl = this.getReportUrl(serverCfg.dataUrls);
            Global.Setting.storage.set(HallStorageKey.ReportUrl, JSON.stringify(reportUrl));
            //data里面没有配置routes 这份data算失效 需要寻找下一个data
            if (serverCfg.routes == null || serverCfg.routes.length == null || serverCfg.routes.length == 0) {
                this.handleCfgReqeustError();
                Logger.error("没有配置routes");
                Global.ReportTool.ReportClientError("AppConfigError",
                    {
                        des: "AppConfig",
                        content: msg,
                        fromLocal: !saveStoreage
                    })
                return;
            }
            Logger.log("-------appconfig------", decodeMsg)
            Logger.error(`收到服务器的回复 =`+ JSON.stringify(serverCfg));
            Global.Setting.parseServerInfo(serverCfg);

            this.sendNotification(Const.UPDATE_APP_INFO);
        }
        catch (e) {
            //解析文件出错可能是域名被污染或者劫持 需要替换下一个url
            this.handleCfgReqeustError();
            Logger.error("加载appCfg失败", msg);
            Global.ReportTool.ReportClientError("AppConfigError",
                {
                    des: "AppConfig",
                    content: msg,
                    fromLocal: !saveStoreage
                })
            // Global.UI.showSingleBox("配置文件拉取异常，请检查网络连接", this.reqServerAppConfig.bind(this), this.reqServerAppConfig.bind(this));
            return;
        }

        if (saveStoreage) {
            Global.Setting.storage.set(HallStorageKey.AppConfigContent, msg);
        }

        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = this.getConfigUrl();
        // 优先检测剪贴板
        Global.ChannelUtil.decodeCliptext()
        Global.ChannelUtil.getUuid()
        Global.ChannelUtil.getEntryType()
        Global.ChannelUtil.getSignType()
        Global.ChannelUtil.initOpeninstall(); 
        //上报上次的日志
        Global.ReportTool.reportRequestRecord();
        //测试上报上次登录日志
        Global.ReportTool.ReportLastLoginLogCache();

        this.reportDataUrlSpeed(1)
        

        let reqCheckVersionFunc = () => {
            //设置httpdns
            Global.DNS.requestHosts(Global.Setting.Urls.globalRoutes.getRouteArr(), () => {
                //获取热更地址
                if (cc.sys.isNative) {
                    //第一安装时  需要获取到对应渠道信息信息
                    if (Global.Setting.SystemInfo.firstInstallStatus) {
                        setTimeout(() => {
                            this.reqCheckVersion()
                        }, 500);
                    }
                    else
                        this.reqCheckVersion()
                } else {
                    Global.SceneManager.goToLogin();
                }
            })
        }
        let errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes")
        if (errorReStartTimes != null && errorReStartTimes != ""){
            let num  = Number(errorReStartTimes)
            if (num && (num % 3 == 0)){
                Logger.error("errorReStartTimes = " + errorReStartTimes + " 网络异常，请重新加载 ")
                    let callbackFunc = ()=>{
                        reqCheckVersionFunc();
                    }
                    Global.UI.show("WndGameRestoreUI",callbackFunc,callbackFunc)
            }else {
                Logger.error("errorReStartTimes = num % 3 != 0 " + errorReStartTimes)
                reqCheckVersionFunc();
            }
        }else {
            Logger.error("errorReStartTimes = null  ")
            reqCheckVersionFunc()
        }

        if(CC_PREVIEW)//防止不小心打开来更新出去出错
        {
            //this.reqCheckVersion()
        }

    }

    //验证服务器配置与本地配置
    private verifyServerCfg(msg) {
        //验证成功，不做操作
        // if (Global.Toolkit.md5(msg) == Global.Toolkit.md5(this.cachedServerContent))
        //     return;

        //@todo提示服务器更新，返回到loading界面
        // this.handleAppConfig(msg);
        // Logger.error("verifyServerCfg msg = " + msg)
        // Logger.error("verifyServerCfg cachedServerContent = " + this.cachedServerContent)
        
        let result = this.checkServerCfg(msg, this.cachedServerContent);
        Logger.error("verifyServerCfg checkServerCfg result = " + result)
       
        if (result == 4) {
            //服务器数据验证不通过  需要切换继续请求
            this.verifyServerCfgError();
            return;
        }
        this.reportDataUrlSpeed(1)
        Global.Setting.dataUrlIndex = this.urlIndex;
        Global.Setting.curDataUrl = this.getConfigUrl();
        if (result == 0)
            return;
        Logger.log("服务器配置更新")
        Global.Setting.storage.set(HallStorageKey.AppConfigContent, msg);
        let decodeMsg = Global.AESUtil.decodeMsg(msg);
        let serverCfg = JSON.parse(decodeMsg);
        Logger.log("-------appconfig------", decodeMsg)
        Global.Setting.parseServerInfo(serverCfg);

    }

    reportDataUrlSpeed(type)
    {
        let endTime = new Date().valueOf();
        let time = endTime - this._startTime 
        if(this._startTime !== -1)
        {
            this.reportParam = { "time": time,  "data_url": this.getConfigUrl(),"reportType":type}
            let reportKey = ReportTool.REPORT_TYPE_DATA_ROUTE
            Global.ReportTool.ReportPublicClientLog(reportKey, this.reportParam, false)
        }

    }


    //0  不做操作  1 切回到登录界面  2 重启游戏  3不操作 4 data数据有问题 需要切换下一个 5 
    private checkServerCfg(svrMsg, localMsg) {
        if (Global.Toolkit.md5(svrMsg) == Global.Toolkit.md5(localMsg))
            return 0;
        let serCfg = this.safeDecode(svrMsg);
        if (serCfg == null)
            return 4;
        let localCfg = this.safeDecode(localMsg);
        if (localCfg == null)
            return 2;

        //serverRoutes变化需要重启
        try {
            let localRoutesStr = JSON.stringify(localCfg.routes);
            let svrRoutesStr = JSON.stringify(serCfg.routes);
            if (Global.Toolkit.md5(localRoutesStr) != Global.Toolkit.md5(svrRoutesStr))
                return 5;
        }
        catch (e) {
            return 2;
        }

        return 3;

    }


    private safeDecode(cfg) {
        let serverCfg = null;
        try {
            let decodeMsg = Global.AESUtil.decodeMsg(cfg);
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
    }


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
    public reqCheckVersion() {
       
        let param: any = {};
        param.appid = Global.Setting.appId;
        Global.Setting.checkVersionApp = param.appid
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if(megeServerFlag)
        {
            param.old_app_id = Number(Global.Setting.SystemInfo.appID)
        }
        param.edition =  Global.HotUpdateManager.getNativeHotUpdateVersion("hall",true,this.manifestNativeUrl) 
        // param.app = Global.Setting.SystemInfo.vendorChannel;
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        param.app_source = Global.Setting.SystemInfo.appConstUrl;
        param.app_independent_tag = Global.Setting.SystemInfo.packageTag;
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.Toolkit.getFirstOpenTime();

        Logger.log("begin check version")
        this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "正在获取热更配置..." })
        let startRequestCheckversion = ()=>{
            Global.HallServer.sendCheckVersion(NetCheckVersion.checkversion, param, this.respCheckVersion.bind(this), this.respCheckVersionError.bind(this), true);
            Global.ReportTool.ReportDevice(ReportTool.REPORT_TYPE_START_CHECKVERSION);
        }
        //判断当前是否有可用线路
        this.clearIntervalTimer();
        let globalRoutes = Global.Setting.Urls.globalRoutes
        if (globalRoutes && globalRoutes.getCurRoute()){
            Logger.error("有可用线路")
            startRequestCheckversion()
        }else {
            Logger.error("无可用线路")
            //无可用线路并且有盾但是还未初始化成功则等待盾初始化成功再请求
            let times = 0;
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "startRequestCheckversion",15,"",1,false)
            this._intervalTimer = setInterval(()=>{
                times ++;
                let globalRoutes = Global.Setting.Urls.globalRoutes
                if (globalRoutes && globalRoutes.getCurRoute()){
                    this.clearIntervalTimer();
                    startRequestCheckversion()
                }else {
                    //超过10s 则进行弹框提示
                    if (times >= 10){
                        this.clearIntervalTimer();
                        Global.UI.showSingleBox("网络连接超时，请检查后重试-D", this.reqCheckVersion.bind(this), this.reqCheckVersion.bind(this))
                    }
                }
            },1000)
        }
    }

    private clearIntervalTimer(){
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        if (this._intervalTimer){
            clearInterval(this._intervalTimer)
            this._intervalTimer = null;
        }
    }

    private _intervalTimer = null


    public respCheckVersionError(data) {
        let checkFunc = () => {
            setTimeout(() => {
                this.reqCheckVersion();
            }, 1000);
        }
        if (data && data._errstr) {
            Global.UI.showSingleBox(data._errstr, checkFunc.bind(this), checkFunc.bind(this));
        } else {
            Global.UI.showSingleBox("检查版本更新失败", checkFunc.bind(this), checkFunc.bind(this));
        }
        cc.sys.localStorage.setItem("needRestart", 2)
    }

    public respCheckVersion(data) {
       // console.log("这是当前的检查版本的回复",JSON.stringify(data))
        cc.sys.localStorage.setItem("needRestart", 2)
        //        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "检查更新中..." })
        if(!data || Global.Toolkit.isEmptyObject(data))
        {
            Global.UI.fastTip("服务器维护中，请稍后再试!")
            return

        }
      
        Global.AppUpdateHelper.checkVersionData = data
        let force_update_url = data.force_update_url
        //新增字段
        let official_url = data.official_url //官网地址
        if (official_url != null && official_url != "") {
            Global.Setting.Urls.downLoadUrl = official_url
        }

        //更新Url
        Global.Setting.Urls.forceUpateUrl = force_update_url

        if(data.server_id ) //重新使用服务器生成的id
        {
            Global.Setting.storage.set(HallStorageKey.ServerDeviceId, data.server_id.trim());
            Global.Setting.SystemInfo.server_id = data.server_id
        }
           
        Global.Setting.parseCheckVersionCfg(data);

        Global.ReportTool.ParseDebugConfig(data, Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0);
            
        //判断维护公告
        if (this.startGameMaintainLogic(data)) {
            return
        }
        let app_hit_hall_urls = data.app_hit_hall.url
        let app_hit_hall_urls_new = data.app_hit_hall.new_url
           
        let routes = app_hit_hall_urls_new
        if (!routes || routes.length == 0) {
            routes = Global.UrlUtil.transferUrlArrayToRoutes(app_hit_hall_urls) 
        }
        Global.DunHotUpdateUrlSetting.hotUpdateRouteCfg = routes
        //热更后再判断强更
        this.startHotUpdateLogic(data)
    }

    private startGameMaintainLogic(data) {
        let update_notice = data.update_notice //大厅维护公告
        //检测是否维护
        if (this.checkIsShowUpdateNoticeWnd(update_notice)) {
            this.showUpdateNoticeWnd(update_notice);
            return true
        }
        return false;
    }

    private startHotUpdateLogic(data) {
        let app_hit_hall = data.app_hit_hall //大厅新版本热更
        let hall_update_url = ""
        let hall_version = ""
        let hallUpdatePath = "";
        if (app_hit_hall && app_hit_hall.version ) {
            hall_version = app_hit_hall.version
            hall_update_url = data.hall_update_url
            if (app_hit_hall.param ) {
                //进行热更线路选择
                let app_hit_hall_urls = app_hit_hall.url
                let app_hit_hall_urls_new = app_hit_hall.new_url
                hallUpdatePath = app_hit_hall.param
                Global.Setting.Urls.hallHotUpdateUrlArray = app_hit_hall_urls_new
                if(!app_hit_hall_urls_new || app_hit_hall_urls_new.length == 0)
                {
                    Global.Setting.Urls.hallHotUpdateUrlArray = app_hit_hall_urls
                }
               
                let url_index = 0;
                let errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes")
                if (errorReStartTimes != null && errorReStartTimes != ""){
                    let storage_hall_urls = Global.Setting.storage.getObject(HallStorageKey.HotUpdateHosts)
                    if (storage_hall_urls){
                        let isSameArray = Global.Toolkit.compareArraySort(storage_hall_urls,Global.Setting.Urls.hallHotUpdateUrlArray)
                        if (isSameArray){
                            app_hit_hall_urls = storage_hall_urls
                        }else {
                            Global.Setting.storage.setObject(HallStorageKey.HotUpdateHosts,Global.Setting.Urls.hallHotUpdateUrlArray)
                            url_index = 0
                        }
                    }
                    let num  = Number(errorReStartTimes)
                    let url_length = Global.Setting.Urls.hallHotUpdateUrlArray.length
                    if (num && url_length > 0){
                        Logger.error("startHotUpdateLogic errorReStartTimes = " + errorReStartTimes)
                        url_index = num % url_length
                    }
                }
                hall_update_url = Global.Setting.Urls.hallHotUpdateUrlArray[url_index]
                if(Global.Setting.Urls.hallHotUpdateUrlArray[0] && Global.Setting.Urls.hallHotUpdateUrlArray[0]["host"])
                {
                    if(url_index>0)
                    {
                        Global.DunHotUpdateUrlSetting.switchRoute()
                    }
                    hall_update_url = Global.DunHotUpdateUrlSetting.hotUpdateUrl

                }

                Logger.error("startHotUpdateLogic hall_update_url = " + hall_update_url)
            }
        }
        Global.Setting.Urls.hallHotUpdateUrl = hall_update_url
        Global.HotUpdateManager.hallNewVersion = hall_version
        Global.HotUpdateManager.hallUpdatePath = hallUpdatePath;
        let hotUpdateProxy = <AppHotUpdateProxy>this.facade.retrieveProxy(AppHotUpdateProxy.NAME)
            hotUpdateProxy.preUpdate(hall_update_url, hall_version,hallUpdatePath);
    }

    
    private showUpdateNoticeWnd(update_notice) {
        let update_notice_content = update_notice.content //维护公告内容
        let update_notice_on_time = update_notice.on_time // 维护开始时间
        let update_notice_down_time = update_notice.down_time //维护结束时间
        let endTime = update_notice_down_time
        let onlineCustomCallback = () => {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(Global.Setting.Urls.onlineService));
        }
        let officialWebCallback = () => {
            let url = Global.Setting.Urls.downLoadUrl
            cc.sys.openURL(url);
        }
        let closeCallback = () => {
            this.reqCheckVersion()
        }
        Global.UI.show("WndGameMaintainUI", update_notice_content, endTime, onlineCustomCallback, officialWebCallback, closeCallback)

    }
    

    private checkIsShowUpdateNoticeWnd(update_notice) {
        let nowTime = Math.round(new Date().getTime() / 1000)
        
        if (update_notice && update_notice.down_time != null && update_notice.down_time > 0) {
            let down_time = update_notice.down_time
            let offset_time = down_time - nowTime
            if (offset_time > 0) {
                return true;
            }
        }
        return false;
    }

    private getReportUrl(cfg) {
        if(!cfg) return;
        let url = cfg[this.urlIndex];
        return url;
    }

    onRemove() {

    }
}