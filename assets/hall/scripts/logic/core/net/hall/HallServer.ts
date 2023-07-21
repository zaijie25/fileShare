import EventDispatcher from "../../../../framework/event/EventDispatcher";
import { NetLogin, NetOnline, NetVerifyCode, NetCheckVersion, NetClientLog } from "./NetEvent";
import { HallErrorHelper, HttpNetExtraData } from "./HallErrorHandler";
import HallHeartBeatHelper from "./HallHeartbeatHelper";
import HallBroadcastHelper from "./HallBroadcastHelper";
import GlobalEvent from "../../GlobalEvent";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import CheckHelper from "./CheckHelper";
import { SceneType } from "../../scene/SceneManager";
import { ReportTool } from "../../tool/ReportTool";
import ServerRoutes, { ServerRouteInfo } from "../../setting/ServerRoutes";
import { ParallelReqLine } from "../../../../framework/net/http/HttpProxy";
//大厅网络管理器
export default class HallServer extends EventDispatcher {

    private USEWS = false;

    private NoWaitingNetList = []

    //切场景后不丢弃的协议
    private NoIgnoreWhenChangeSceneList = []

    //心跳协议传递
    public static EVENT_INTERNAL_ONHEARTBEAT = "OnHeartBeat";
    //更新msgseq
    public static EVENT_INTERNAL_UPDATEMSGSEQ = "updateMsgSeq";

    //组件通信
    private internalEvent: EventDispatcher;
    //通用协议错误处理 （业务逻辑错误）
    private errorHelper: HallErrorHelper = new HallErrorHelper;
    //心跳组件
    public heartbeatHelper: HallHeartBeatHelper;
    //广播组件
    private broadcastHelper: HallBroadcastHelper;

    public checkHelper = new CheckHelper(1);
    //数据缓存
    private dataCache:any={};

    private checkInerval = 1000;
    private timeID = null;


    public setup() {
        this.internalEvent = new EventDispatcher();
        this.heartbeatHelper = new HallHeartBeatHelper(this, this.internalEvent);
        this.broadcastHelper = new HallBroadcastHelper(this, this.internalEvent);
        this.initNoWaitingList();
        this.initNoIgnoreWhenChangeSceneList();
    }

    public clearAllCache()
    {
        this.dataCache = {}
    }

    private initNoWaitingList()
    {
        //货币信息
        this.NoWaitingNetList.push(NetAppface.GetUserPoint);
        //获取玩家信息
        this.NoWaitingNetList.push(NetAppface.GetUserInfo);
        //重连信息
        this.NoWaitingNetList.push(NetAppface.QuaryState);
        //上传信息
        this.NoWaitingNetList.push(NetAppface.PostIpInfo);
        //心跳
        this.NoWaitingNetList.push(NetOnline.HeartBeat);
        //日志
        this.NoWaitingNetList.push(NetClientLog.ClientLogReq);
        //app信息
        this.NoWaitingNetList.push(NetClientLog.DownloadAppInfo);
    }

    private initNoIgnoreWhenChangeSceneList()
    {
        
        //心跳
        this.NoIgnoreWhenChangeSceneList.push(NetOnline.HeartBeat);
    }

    //过滤不显示loading的界面
    private checkNetNoWating(extraData:HttpNetExtraData)
    {
        return this.NoWaitingNetList.indexOf(extraData.funcName) > -1;
    }


    public sendLogin(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.globalUrl + NetLogin.mod;
        if(!param.device)
            param.device = Global.Toolkit.genDeviceInfo();

        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix = "/login/"+ paramPrefix + NetLogin.mod +"?" + Global.UrlUtil.getLoginCommonParam();
        //let url = serverRoute.getUrl() + suffix;
        let serverData = this.getMsgParam(NetLogin.mod, func, param, true);
        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting,0,false,false);
        this.sendInternal(extraData);
    }

    public sendVerifyCode(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.globalUrl + NetVerifyCode.mod;
        if(!param.device)
            param.device = Global.Toolkit.genDeviceInfo();
        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix =  "/login/" + paramPrefix + NetVerifyCode.mod +"?" + Global.UrlUtil.getLoginCommonParam();
        let serverData = this.getMsgParam(NetVerifyCode.mod, func, param, true);
        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    }

    public sendCheckVersion(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.forceUpateUrl;
        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix =  "/login/"+ paramPrefix+"checkversion" +"?" + Global.UrlUtil.getLoginCommonParam();
        let serverData = this.getMsgParam(NetCheckVersion.mod, func, param, true);

        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting,0,false,false);
        this.sendInternal(extraData);
        
    }

    public sendPostInstallApp(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.forceUpateUrl;
        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix =  "/login/"+ paramPrefix + "checkversion" +"?" + Global.UrlUtil.getLoginCommonParam();
        let serverData = this.getMsgParam(NetLogin.mod, func, param, true);
        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    }

    public sendClientLog(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.logUrl;
        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix = "/login/"+paramPrefix+"clientlog" + "?" + Global.UrlUtil.getLoginCommonParam();
        let serverData = this.getMsgParam("", func, param, true);
        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    }

    //大厅内http协议请求
    //errorHandler  模块定制错误处理  返回true 则继续执行， false丢弃
    public send(mod: string, key: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true, cache=0, extra:string = "") {
        let serverRoutes = Global.Setting.Urls.hallRoutes;
        let suffix = Global.Setting.Urls.hallUrlSuffix;
        let serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        let extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        this.sendInternal(extraData);
    }


    public sendHeartBeat(mod: string, key: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true, cache=0, extra:string = ""){
        let serverRoutes = Global.Setting.Urls.hallRoutes;
        let suffix = Global.Setting.Urls.hallUrlSuffix;
        let serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        let isNeedParallelReq = false
        let parallelReqKey = Global.Http.parallelReqKey
        let heartbeatReq = parallelReqKey.heartbeat
        if (heartbeatReq && (heartbeatReq.isReq == false)){
            isNeedParallelReq = true;
            heartbeatReq.isReq = true;
            heartbeatReq.reqLines = []
            Logger.error("sendheartbeat isNeedParallelReq = true")
        }
        if (isNeedParallelReq){
            for (let i =0 ;i<serverRoutes.serverInfoList.length;i++){
                let curRoute = serverRoutes.serverInfoList[i]
                let url = curRoute.getUrl()
                if (curRoute.checkSelfIsOK()){
                    let lineInfo = new ParallelReqLine
                    lineInfo.lineIndex = i;
                    lineInfo.startTime = (new Date()).valueOf()
                    lineInfo.host = curRoute.host
                    let extraData = this.createNetExtraDataByUrl(serverRoutes, url,suffix, key, serverData, onComplete, errorHandler, showWaiting, cache,true,i);
                    lineInfo.url = extraData.url.getUrl()
                    heartbeatReq.reqLines.push(lineInfo)
                    this.sendInternal(extraData);
                }else {
                    if (url.printSelf){
                        Logger.error("route checkSelf Is not OK " + url.printSelf())
                    }
                }
                
            }
        }else {
            let extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
            this.sendInternal(extraData);
        }

        
    }

    //大厅内http协议请求  不重连
    public sendWithNoRetry(mod: string, key: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = false, cache=0, extra:string = "") {
        let serverRoutes = Global.Setting.Urls.hallRoutes;
        let suffix = Global.Setting.Urls.hallUrlSuffix;
        let serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        let extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        extraData.retryTotalTime = 0;
        this.sendInternal(extraData);
    }

    public sendAiteLogin(func: string, param: any, onComplete?: Function, errorHandler?: Function, showWaiting = true) {
        //let url = Global.Setting.Urls.globalUrl + NetLogin.mod;
        if(!param.device)
            param.device = Global.Toolkit.genDeviceInfo();
        let serverRoutes = Global.Setting.Urls.globalRoutes;
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let suffix ="/login/" + paramPrefix + "other"+"?" + Global.UrlUtil.getLoginCommonParam();
        let serverData = this.getMsgParam(NetLogin.mod, func, param, true);
        let extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    }


    public onUpdate(dt) {
        this.heartbeatHelper.onUpdate(dt);
        this.checkHelper.onUpdate(dt);
    }

    public run() {
        this.heartbeatHelper.run();
    }

    public stop() {
        this.clearAllCache();
        this.heartbeatHelper.stop();
    }

    public setSession(session) {
        this.heartbeatHelper.setSession(session);
    }


    /**
     * 
     * @param sessionInfo 
     * {
     *      _gid:xxxx,
     *      _gsc:"default",
     *      _glv:"l0"
     * }
     */
    public setGameOnlineInfo(sessionInfo)
    {
        if(sessionInfo == null)
            this.heartbeatHelper.setSession(null);
        else
            this.heartbeatHelper.setSession({_para:sessionInfo});
    }

    public clearCache(mod: string, key: string, param: any){
        // let url = cc.js.formatStr(Global.Setting.Urls.hallHttpUrl, mod, key);
        let cParam = this.getMsgParam(mod, key, param);
        let ckey= key +"_"+ this.getParamStr(cParam);
        this.dataCache[ckey] = null;
    }
    private sendInternal(extraData?: HttpNetExtraData, isRetry = false,isChangeServer = false) {
        if(extraData == null)
            return;
        if(extraData.cache != 0 && this.dataCache  ){
            let key=extraData.funcName +"_"+ this.getParamStr(extraData.param);
            let cache = this.dataCache[key];
            if(cache && cache.time && cache.msg){
                let Dates = new Date()
                if (extraData.cache<=10000){
                     //按时效缓存, 并且在有效期内, 
                     if(Dates.getTime() - cache.time.getTime()  < extraData.cache * 1000){
                        this.onMessage(cache.msg, extraData)
                        return
                    }else{
                        this.dataCache[key]=null;
                    }
                }else if(extraData.cache == 10001){
                    //按天缓存, 并且在有效期内, 只需要检查月和日就好了.没那么倒霉还跨年
                    if(Dates.getMonth() == cache.time.getMonth() && Dates.getDate() == cache.time.getDate()){
                        this.onMessage(cache.msg, extraData)
                        return 
                    }else{
                        this.dataCache[key]=null;
                    }

                }
           }
        }
        // Logger.log("isRetry = " + isRetry)
        // Logger.log("isChangeServer = " + isChangeServer)
        // Logger.log("extraData.showWaiting = " + extraData.showWaiting )
        
        if (extraData.showWaiting && !isRetry) {
            let waittingTips = null
            if (extraData.funcName == NetAppface.GetConfig){
                waittingTips = "连接中"
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, extraData.funcName,15,waittingTips,1,false);
            }
            else
            {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, extraData.funcName,15,waittingTips,1,extraData.enableMask);
            }
        }

        if (isChangeServer && extraData.funcName != NetOnline.HeartBeat){
            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
            let loadingStr = "重连中"
            if (extraData.funcName == NetAppface.GetConfig){
                loadingStr = "重连中"
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, extraData.funcName,15,loadingStr+ extraData.serverRoutes.curIndex,1,false);
            }
            else
            {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, extraData.funcName,15,loadingStr+ extraData.serverRoutes.curIndex,1,extraData.enableMask);
            }
            
        }

        this.checkHelper.updateChecker();
        if(extraData.funcName == NetOnline.HeartBeat)
        {
            this.checkHelper.recordHeartbeat(extraData.url);
            extraData.param._check = this.checkHelper.getHeartBeatChecker();
        }
        else
        {
            extraData.param._check = this.checkHelper.getNomalChecker();
        }
        if(!cc.sys.isNative&&window.location.search!=""){
            let temp = window.location.search.substr(1);
            extraData.url.address = temp;
            extraData.url.addressHost = temp;
            extraData.url.realHost = temp;
        }
        extraData.url.suffix = Global.UrlUtil.refreshSuffixRetryTime(extraData.url.suffix, extraData.retryTimes);
        Logger.error(`发送了消息${extraData.url.getUrl()}=========`+ JSON.stringify(extraData.param));
        Global.Http.send(extraData.url, extraData.param, (msg) => {
        //Global.Http.sendWithServerRoute(extraData.serverRoutes.getCurRoute() ,extraData.suffix, extraData.param, (msg) => {
           if( this.onMessage(msg, extraData) && extraData.cache != 0){
                let key=extraData.funcName +"_"+ this.getParamStr(extraData.param);
                let cache:any= {}
                cache.time = new Date();
                cache.msg = msg;
                this.dataCache[key] = cache;
           }
        }, () => {
                this.onMessageError(extraData);
            });
    }


    private getParamStr(param)
    {
        if(!param._param)
            return "";
        return JSON.stringify(param._param);
    }

    //指定当前线路url
    private createNetExtraDataByUrl(serverRoutes,url, suffix, funcName, serverData, onComplete, errorHandler, showWating, cache=0,isParallelReq = false,lineIndex = 0,enableMask = true){
        if(serverRoutes == null)
        {
            Logger.error("serverroutes is null", funcName, suffix);
            return;
        }
        let extraData = new HttpNetExtraData();
        extraData.param = serverData;
        extraData.onComplete = onComplete;
        extraData.errorHandler = errorHandler;
        extraData.funcName = funcName;
        extraData.serverRoutes = serverRoutes;
        extraData.suffix = suffix;
        extraData.isParallelReq = isParallelReq
        extraData.lineIndex = lineIndex
        extraData.enableMask = enableMask
        
        if (isParallelReq){
            extraData.retryTotalTime = 1
        }else {
            //线路至少重试三次
            extraData.retryTotalTime = serverRoutes.length > 3? serverRoutes.length : 3;
        }
        
        extraData.sendInGame = Global.SceneManager.inGame();
        extraData.url = url
        if (url){
            url.suffix = url.suffix + suffix
        }
        extraData.showWaiting = showWating;
        extraData.cache = cache;
        if(this.checkNetNoWating(extraData))
            extraData.showWaiting = false;
        return extraData;
    }

    private createNetExtraData(serverRoutes, suffix, funcName, serverData, onComplete, errorHandler, showWating, cache=0,isParallelReq = false,enableMask = true) {
        if(serverRoutes == null)
        {
            Logger.error("serverroutes is null", funcName, suffix);
            return;
        }
        let url = null
        let curRoute = serverRoutes.getCurRoute();
        //加了盾，有可能当前还没初始化成功,手动切换一次线路
        if (curRoute){
            if (curRoute.checkSelfIsOK()){
                let serverUrl = curRoute.getUrl()
                url = serverUrl
            }else {
                let routesLen = serverRoutes.getRouteLen()
                if (routesLen > 1){
                    let nextRoute = serverRoutes.getAnotherRoute()
                    if (nextRoute && nextRoute.checkSelfIsOK()){
                        Logger.error("extraData.url changeToAnotherRoute");
                        let serverUrl = nextRoute.getUrl()
                        url = serverUrl
                    }else {
                        Logger.error("extraData.url nextRoute is null or not ok !!!");
                        let canUseRoute = serverRoutes.getCanUseRoute()
                        if (canUseRoute){
                            let serverUrl = canUseRoute.getUrl()
                            url = serverUrl
                        }else {
                            Logger.error("extraData.url canUseRoute = null");
                        }
                        
                    }
                }else if(routesLen == 1) {
                    // Logger.error("extraData.url routesLen = 1");
                    let serverUrl = curRoute.getUrl()
                    url = serverUrl
                }else {
                    Logger.error("extraData.url routesLen = 0 ");
                }
            }
        }else {
            Logger.error("extraData.url curRoute is null !!!");
        }
        
        let  extraData = this.createNetExtraDataByUrl(serverRoutes, url,suffix, funcName, serverData, onComplete, errorHandler, showWating, cache,isParallelReq,0,enableMask)
        return extraData
        
    }

    //处理并发请求
    public dealParallelReq(extraData,isSuccess){
        if (extraData.isParallelReq){
            Logger.error("dealParallelReq  isSuccess " + isSuccess)
            let lineIndex = extraData.lineIndex
            let heartBeatParallelReq = Global.Http.parallelReqKey.heartbeat
            if (heartBeatParallelReq){
                if (heartBeatParallelReq.isRsp == false){
                    heartBeatParallelReq.isRsp = true;
                }

                let reqLines = heartBeatParallelReq.reqLines
                if (reqLines && reqLines.length > 0){
                    let isParallelReqEnd = true;
                    for (let i = 0;i < reqLines.length ; i++){
                        let line = reqLines[i]
                        if (line.lineIndex == lineIndex){
                            if (isSuccess){
                                line.repFlag = 1
                            }else {
                                line.repFlag = 2
                            }
                            line.endTime = (new Date()).valueOf()
                            line.reqTime = line.endTime - line.startTime
                        }else {
                            if (line.repFlag == 0){
                                isParallelReqEnd = false
                            }
                        }
                    }
                    //并发请求结束，判断最优线路，并合并上报每个线路的情况
                    if (isParallelReqEnd){
                        Logger.error("dealParallelReq  isParallelReqEnd == true")
                        let successLines = []
                        for (let i =0;i<reqLines.length;i++){
                            let line = reqLines[i]
                            if (line.repFlag == 1){
                                successLines.push(line)
                            }
                        }
                        if (successLines.length > 0){
                            successLines.sort((a,b)=>{return a.reqTime - b.reqTime})
                            let firstLine = successLines[0]
                            Global.Setting.Urls.sortHallRoutes(firstLine.lineIndex)
                        }
                        
                    
                        let reportParams = []
                        for (let i =0;i<reqLines.length;i++){
                            let line = reqLines[i]
                            let reportParam = { "success": line.repFlag == 1,"htime":line.reqTime,"host":line.host,"key":"heartbeat","url": line.url}
                            reportParams.push(reportParam)
                        }
                        let reportKey = ReportTool.REPORT_TYPE_PARALLEL_REQ
                        Global.ReportTool.ReportPublicClientLog(reportKey, reportParams)
                    }
 
                }
                
            }
        }
    }

    private onMessageError(extraData: HttpNetExtraData) {
        extraData.retryTimes++;
        let isChangeServer = false
        //心跳、登录相关、getConfig请求异常，触发切换线路
        if(extraData.funcName == NetOnline.HeartBeat 
            || extraData.suffix.indexOf("login") > -1
            || extraData.funcName == NetAppface.GetConfig
            || extraData.funcName == NetAppface.GetGameList
            || extraData.funcName == NetAppface.GetGameRoute
            || extraData.funcName == NetCheckVersion.checkversion)
            {
                Logger.error("change server ");
                isChangeServer = true
                extraData.serverRoutes.changeToAnotherRoute();
            }
        //心跳不重连
        if(extraData.funcName == NetOnline.HeartBeat)
        {
            this.dealParallelReq(extraData,false)
            return;
        }

        extraData.refreshUrl();
        //小于重连次数 则重新发送
        if (extraData.retryTimes < extraData.retryTotalTime) {
            //防止断网时回调太快
            setTimeout(()=>{this.sendInternal(extraData, true,isChangeServer);}, 500)
            return;
        }
        else {
            let isShowErrorDialog = true;
            if (extraData.showWaiting || extraData.funcName == NetAppface.GetGameRoute) {
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                let returnFunc = () => {
                    Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                    extraData.retryTimes = 0;
                    setTimeout(()=>{this.sendInternal(extraData, true,isChangeServer);}, 500)
                }
                
                if (extraData.suffix.indexOf("login") > -1 || extraData.funcName == NetCheckVersion.checkversion)
                {
                    //判断盾是否初始化完成，手动等待盾初始化完成然后再重试
                    if (Global.AppDun.checkIsDunLoading()){
                        Logger.error("checkIsDunLoading true")
                        isShowErrorDialog = false;
                        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, extraData.funcName,15,"重连中",1,extraData.enableMask);
                        this.startTimer(returnFunc)
                    }
                }else if (extraData.funcName == NetAppface.GetGameRoute){
                    //重写重试方法
                    returnFunc = ()=>{
                        Logger.error("NetAppface.GetGameRoute 网络连接超时，请检查后重试")
                    }
                }
                if (isShowErrorDialog){
                    Global.UI.showSingleBox("网络连接超时，请检查后重试", returnFunc, returnFunc)
                }
            }
            if(extraData.errorHandler && isShowErrorDialog)
            {
                extraData.errorHandler({_errno:-1, _errstr:"网络连接超时，请检查后重试"})
            }
            //@todo  通用错误处理  弹窗或者上报
        }
    }

    private startTimer(callback) {
        clearInterval(this.timeID);
        let count = 0
        this.timeID = setInterval(() => {
            count ++;
            if (!Global.AppDun.checkIsDunLoading()){
                clearInterval(this.timeID);
                if (callback){
                    callback()
                }
            }else {
                // 10s 自动超时
                if (count >=10){
                    Logger.error("check dun loading startTimer timout")
                    clearInterval(this.timeID);
                    if (callback){
                        callback()
                    }
                }
            }
        }, this.checkInerval);
    }


    private onMessage(msg, extraData: HttpNetExtraData) {
        let serverObj = null;
        let content = null
        if(extraData.funcName == NetOnline.HeartBeat || extraData.funcName == NetAppface.GetConfig || extraData.funcName == NetAppface.GetGameList || extraData.funcName == NetAppface.GetGameRoute)
        {
            // Logger.log("sort hall routes ");
            Global.Setting.Urls.sortHallRoutes()
            if (extraData.funcName == NetOnline.HeartBeat){
                this.dealParallelReq(extraData,true)
            }
                
        }else if (extraData.suffix.indexOf("login") > -1 || extraData.funcName == NetCheckVersion.checkversion){
            // Logger.log("sort login routes ");
            Global.Setting.Urls.sortLoginRoutes()
        }
        try {
            // Logger.error("onMessage url = " + extraData.url.getUrl())
            // Logger.error("onMessage msg = " + msg)
            
            content = Global.AESUtil.decodeMsg(msg);
            if (content == "") {
                Logger.error("解析协议失败", msg, extraData.url.getUrl());
            }
            serverObj = JSON.parse(content);
        }
        catch (e) {
            this.onMessageError(extraData);
            Logger.error("解析JSON失败", msg, extraData.url.getUrl(), e && e.message);
            let reportParam0 = {"msg":msg,"url":extraData.url,"exception":e && e.message}
            Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_JSON_ERROR,reportParam0)
            return;
        }

        if (serverObj._func != NetOnline.HeartBeat)
        {
            Logger.error(`收到服务器的回复${serverObj._func}=`+ JSON.stringify(serverObj._param));
        } 
        else
        {
            if(serverObj && serverObj._param)
                this.checkHelper.refreshCostTime(serverObj._check);
        }

        //@todo 显示放到onComplete之后  防止onComplete再调用waiting界面闪烁
        //@notice getGameRoute 产品提需求去掉loading，但是重连还要显示出来，特殊处理
        if (extraData.showWaiting || extraData.funcName == NetAppface.GetGameRoute) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, extraData.funcName);
        }

        //判断协议场景是否一致  登录和大厅算一个场景
        //如果在NoIgnoreWhenChangeSceneList 则忽略
        if(extraData.sendInGame != Global.SceneManager.inGame() && this.NoIgnoreWhenChangeSceneList.indexOf(extraData.funcName) < 0)
        {
            Logger.error("http协议跨场景，丢弃", extraData.url);
            return;
        }


        if (!this.errorHelper.handleError(serverObj, extraData.errorHandler))
            return;

        //@todo  协议预处理

        if (extraData.onComplete != null) {
            extraData.onComplete(serverObj._param);
        }
        else {
            //没有回调 默认用事件的形式派发处处
            if (serverObj._func && serverObj._func != "") {
                this.event(serverObj._func, serverObj._param);
            }
        }
        return true;
    }




    //自定义errorHandler 可以处理完定制的  再执行通用的
    public tryHandleError(serverData) {
        return this.errorHelper.tryHandleError(serverData);
    }

    //获取心跳网络延时
    public getNetCost()
    {
        if(!this.checkHelper)
            return 0;
        return this.checkHelper.getNetCost();
    }

    private getMsgParam(mod: string, func: string, param: any, useMode = false, check = "") {
        let msg: any = {}
        if (useMode) {
            msg._mod = mod
            msg._func = func;
        }
        msg._param = param ? param : {}
        msg._check = check
        return msg;
    }


    /**
     * 拉把协议发送接口
     * @param mod gameGameRoute返回的mod
     * @param key 协议方法名
     * @param param 
     * @param complete 
     * @param onError 
     */
    public sendLabaMsg(mod,key, param, complete, onError)
    {
        let serverRoutes = Global.Setting.Urls.gameRoutes
        if(serverRoutes == null)
        {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }
        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, key, param, complete, onError);
    }

    /**
     * 根据serverRoute mod  发送http协议，主要用于拉把类协议请求
     * @param serverRoute 服务器返回的服务器地址信息
     * @param mod 服务器路由
     * @param key 协议方法名
     * @param param     
     * @param complete 
     * @param onError 
     */
    public sendWithServerRouteAndMod(serverRoute:ServerRouteInfo, mod, key, param, complete, onError)
    {
        let serverUrl = serverRoute.getHttpUrlWithMod(mod);
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        let suffix = "?_func=" + key + "&" + urlParam
        let sendParam:any = {}
        sendParam._param = param;
        serverUrl.suffix = serverUrl.suffix + suffix
        this.sendWithUrl(serverUrl, sendParam, complete, onError, key);
    }


    //通过url方式
    public sendWithUrl(url, param, complete, onError, key = "")
    {
        Global.Http.send(url, param, (msg)=>
        {
            let content = Global.AESUtil.decodeMsg(msg);
            if (content == "") {
                Logger.error("解析协议失败", msg, url);
                return ;
            }
    
            let serverObj = null;
            try {
                serverObj = JSON.parse(content);
            }
            catch (e) {
                Logger.error("解析JSON失败", msg, url, e && e.message);
                return;
            }

            //该协议只在游戏中使用
            //如果在NoIgnoreWhenChangeSceneList 则忽略
            if(!Global.SceneManager.inGame() && this.NoIgnoreWhenChangeSceneList.indexOf(key) < 0)
            {
                Logger.error("game http协议跨场景，丢弃", url);
                return;
            }

            //处理错误
            if(!this.errorHelper.handleError(serverObj, onError))
                return;

            if(complete)
                complete(serverObj._param);
        }, ()=>
        {
            //协议发送失败处理
            if(onError)
            {
                onError({_errno:-1, _errstr:"网络连接超时，请检查后重试"});
            }
        })
    }

    //大厅内http协议请求url
    public getHallSendUrl(mod: string, key: string, param?: any, onComplete?: Function, errorHandler?: Function, showWaiting = true, cache=0, extra:string = "") {
        let serverRoutes = Global.Setting.Urls.hallRoutes;
        let suffix = Global.Setting.Urls.hallUrlSuffix;
        let serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        let extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        let url = extraData.url
        let sendUrl = url.getUrl()
        return sendUrl;
    }
}