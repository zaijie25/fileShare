import EventDispatcher from "../../../framework/event/EventDispatcher";
import SocketHelper from "./serverHelper/SocketHelper";
import HandlerHelper from "./serverHelper/HandlerHelper";
import GameErrorHelper from "./serverHelper/GameErrorHelper";
import BaseServerHelper from "./serverHelper/BaseServerHelper";
import ReconnectHelper from "./serverHelper/ReconnectHelper";
import GameHeartBeatHelper from "./serverHelper/GameHeartBeatHelper";
import ServerRoutes, { ServerRouteInfo, ServerUrl } from "../setting/ServerRoutes";
import { HallErrorHelper } from "../net/hall/HallErrorHandler";
// import * as ByteBuffer from "bytebuffer";
import CheckHelper from "../net/hall/CheckHelper";
import GameCommand from "./CommandDefine";
import CallbackHandlerHelper, { CallbackInfo } from "./serverHelper/CallbackHandlerHelper";

enum MessageState
{
    IgnoreAll = 0,   //在收到自己leave  到发送enter之间  收到的协议全部忽略
    PassSSSAndEnter = 1,   //只接收sss（正常流程）和    enter（主要处理enter失败） add wait_match(pvp进桌前匹配玩家)
    PassAll = 2,    //接收所有协议
}


export default class GameServer extends EventDispatcher
{
    //网络内部事件
    public static Event_GameSocketMsg = "Event_GameSocketMsg";
    public static Event_GameSocketOpen = "Event_GameSocketOpen";
    public static Event_GameSocketClose = "Event_GameSocketClose";
    //Protobuf协议
    public static Event_GamePBSocketMsg = "Event_GamePBSocketMsg";
    public static Event_GameSocketStartConnect = "Event_GameSocketStartConnect";
    //sock重连请求
    public static Event_GameSocketCallReconnect = "Event_GameSocketReconnect";

    private handleHelperKey = "handlerHelper";
    private socketHelperKey = "socketHelper";
    private errorHelperKey = "gameErrorHelper";
    private reconnectHelperKey = "reconnectHelperKey";
    private heartBeatHelperKey = "heartbeatHelperKey";
    private callbackHelperKey = "callbackHelperKey";

    private helperMap = {};

    //服务器使用数据
    private dst:any = {};

    //服务器使用
    private mod:string;

    private checker = 0;


    //消息队列
    private msgQueue = [];
    //锁列表
    private lockList = [];

    public isRunning = false;

    //服务器验证数据
    private lastSN = -1;

    public msgState:MessageState = MessageState.PassAll;

    //通用协议错误处理 （业务逻辑错误）
    private errorHelper: HallErrorHelper = new HallErrorHelper();

    public checkHelper:CheckHelper = new CheckHelper(2);

    public setup()
    {
        this.registHelper(this.socketHelperKey, new SocketHelper(this));
        this.registHelper(this.handleHelperKey, new HandlerHelper(this));
        this.registHelper(this.errorHelperKey, new GameErrorHelper(this));
        this.registHelper(this.reconnectHelperKey, new ReconnectHelper(this));
        this.registHelper(this.heartBeatHelperKey, new GameHeartBeatHelper(this));
        this.registHelper(this.callbackHelperKey, new CallbackHandlerHelper(this));
        this.on(GameServer.Event_GameSocketMsg, this, this.handleMsg);
        this.on(GameServer.Event_GamePBSocketMsg, this, this.handlePbMsg)
        this.on(GameServer.Event_GameSocketCallReconnect, this, this.clearData);
    }

    //注册定制协议处理函数
    public registHandler(key:any, handler:any)
    {
        this.getHelper<HandlerHelper>(this.handleHelperKey).registHandler(key, handler);
    }

    //反注册定制协议处理函数
    public unregistHandler(key:any) {
        this.getHelper<HandlerHelper>(this.handleHelperKey).removeHandler(key);
    }

    //注册通用错误处理函数
    public registDefaultHandler(key:any, handler:any)
    {
        this.getHelper<HandlerHelper>(this.handleHelperKey).registDefaultHandler(key, handler);
    }

    //注册定制错误处理
    public registErrorHandler(errno:number, handler:Function)
    {
        this.getHelper<GameErrorHelper>(this.errorHelperKey).registErrorHandler(errno, handler);
    }

    public clearHandlers()
    {
        this.getHelper<HandlerHelper>(this.handleHelperKey).clearHandlers();
        this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).clearCallbacks();
    }

    public run()
    {
        Game.Event.on(Game.EVENT_ADDMANUALLOCK, this, this.addManualLock);
        Game.Event.on(Game.EVENT_ADDTIMELOCK, this, this.addTimeLock);
        Game.Event.on(Game.EVENT_REMOVELOCK, this, this.removeLock);
        Game.Event.on(Game.EVENT_UNSHFIT_MSGLIST, this, this.unshfitMsgList)
        this.callHelper("run");
        this.isRunning = true;
    }

    public stop()
    {
        this.callHelper("clear");
        Game.Event.offAllByCaller(this);
        this.checkHelper.clear();
        this.lastSN = -1;
        this.msgState = MessageState.PassAll;
        this.msgQueue = [];
        this.lockList = [];
        this.mod = "";
        this.dst = {}
        this.isRunning = false;
    }

    private unshfitMsgList(msgList:any[])
    {
        if(msgList == null || msgList.length == 0)
            return;
        // for(let i = 0; i < msgList.length; i++)
        // {
        //     if(msgList[i]._param == null)
        //     {
        //         msgList[i] = {_param:msgList[i]};
        //     }
        // }
        this.msgQueue.unshift.apply(this.msgQueue, msgList);
    }

    public stopGame()
    {
        this.isRunning = false;
        this.lockList = [];
        this.msgQueue = [];
        this.lastSN = -1;
        this.getHelper<SocketHelper>(this.socketHelperKey).clear();
        this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).netInterval = 0;
    }

    /**
     * 发送 内容为json格式的Socket消息
     * @param cmd 
     * @param payload 
     */
    public send(cmd:string, param?:any)
    {
        param = param || {}
        let data = this.getSendParam(cmd);
        data._param._para = param;
        data._func = cmd;           // 服务器要求 水果机需要加上, 就统一加上
        this.sendDirect(data);
    }

    /**
     * 发送回调方式的socket请求
     * @param cmd 协议名
     * @param param 参数
     * @param callback 回调
     * @param errorCallback 错误时回调, 传空表示使用通用处理
     * @param livingTime 生存时长s -1表不限生命周期
     * @param inQueue 是否走队列
     */
    public sendWithCallback(cmd:string, param?:any, callback?: Function, errorCallback?: any, livingTime = -1, inQueue = true){
        param = param || {};
        let data = this.getSendParam(cmd);
        data._param._para = param;
        data._func = cmd;
        let check = data._check;

        let callbackInfo: CallbackInfo = {
            key: check,
            callback: callback,
            errorCallback: errorCallback,
            inQueue: inQueue,
            live: livingTime,
            cmd: cmd
        }
        this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).registCallback(check, callbackInfo);
        this.sendDirect(data);
    }

    /**
     * 发送 内容为protobuffer格式的Socket消息
     * @param cmd 
     * @param payload 
     */
    public sendPb(cmd, payload?:Uint8Array)
    {
        if (cmd.indexOf("*game*_") == 0) {
            cmd = cmd.replace("*game*_", "");
            cmd = Number(cmd);
        }
        this.getHelper<SocketHelper>(this.socketHelperKey).sendBuffer(cmd, payload)
    }

    /**
     * 发送 内容为json格式的Http请求
     * @param mod gameGameRoute返回的mod
     * @param cmd 协议方法名
     * @param param 
     * @param complete 
     * @param onError 
     */
    public sendHttp(mod:string, cmd:string, param?:any, complete?, onError?) {
        param = param || {};

        let serverRoutes = Global.Setting.Urls.gameRoutes
        if(serverRoutes == null)
        {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }

        let errorHandler = (netObj:any)=>{
            if(onError) {
                onError(netObj);
            }
            else {
                //协议预处理
                let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler("*game*_404");
                if(handler) {
                    //重新构建消息结构
                    let msgParam = {
                        _cmd: "*game*_404",
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: netObj._errno,
                            errStr: netObj._errstr,
                            errExt: netObj._errext || cmd,
                        },
                    }
                    handler.Handle(msgParam);
                }
            }
            return true;
        }
        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, cmd, param, complete, errorHandler);
    }

    /**
     * 发送 内容为protobuffer格式的Http请求
     * @param mod gameGameRoute返回的mod
     * @param cmd 协议方法名
     * @param param 
     * @param complete 
     * @param onError 
     */
    public sendHttpPb(mod:string, cmd:string, buffer?:Uint8Array, complete?, onError?) {
        let cmdId:number = 0;
        if (cmd.indexOf("*game*_") == 0) {
            let num = cmd.replace("*game*_", "");
            cmdId = Number(num);
        }
        else {
            cmdId = Number(cmd);
        }
        if(!cmdId) {
            Logger.error("sendHttpPb() cmd 格式错误");
            return;
        }

        let size = buffer ? buffer.length : 0;
        size += 4;
        let bb = ByteBuffer.allocate(size, false, false);
        bb.writeUint32(cmdId, 0);
        if (buffer) {
            bb.append(buffer, 4);
        }

        let serverRoutes = Global.Setting.Urls.gameRoutes
        if(serverRoutes == null) {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }

        let errorHandler = (netObj:any)=>{
            if(onError) {
                onError();
            }
            else {
                //协议预处理
                let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler("*game*_404");
                if(handler) {
                    //重新构建消息结构
                    let msgParam = {
                        _cmd: "*game*_404",
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: netObj._errno,
                            errStr: netObj._errstr,
                            errExt: netObj._errext || cmd,
                        },
                    }
                    handler.Handle(msgParam);
                }
            }
            return true;
        }

        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, cmd, buffer, complete, errorHandler);
        bb.clear();
    }

    /**
     * 根据serverRoute mod  发送http协议，主要用于拉把类协议请求
     * @param serverRoute 服务器返回的服务器地址信息
     * @param mod 服务器路由
     * @param cmd 协议方法名
     * @param param
     * @param complete 
     * @param onError 
     */
    public sendWithServerRouteAndMod(serverRoute:ServerRouteInfo, mod:string, cmd:string, param:any, complete?, onError?) {
        let serverUrl = serverRoute.getHttpUrlWithMod(mod);
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        let suffix = "?_func=" + cmd + "&" + urlParam
        let sendParam:any = {}
        sendParam._param = param;
        serverUrl.suffix = serverUrl.suffix + suffix
        this.sendWithUrl(serverUrl, sendParam, complete, onError);
    }

    /**
     * 通过url方式发送http请求
     * @param url 
     * @param param 
     * @param complete 
     * @param onError 
     */
    public sendWithUrl(serverUrl:ServerUrl, param:any, complete?:Function, onError?:Function) {
        Global.Http.send(serverUrl, param, (msg:any)=>{
            if(typeof(msg) == "string") {
                let netObj = null;
                try {
                    netObj = JSON.parse(msg);
                }
                catch(e) {
                    Logger.error("解析协议失败", msg, e);
                    return;
                }

                //消息打印
                if(netObj._func != Game.Command.HeartBeat) {
                    Logger.log("HttpMsg:", msg);
                }

                //该协议只在游戏中使用
                //如果在NoIgnoreWhenChangeSceneList 则忽略
                if(!Global.SceneManager.inGame())
                {
                    Logger.error("gameserver http协议跨场景，丢弃", serverUrl.getUrl());
                    return;
                }

                //处理错误
                if(!this.errorHelper.handleError(netObj, onError)) {
                    if(netObj._errno != null) {
                        let cmd:string = "*game*_404";

                        //协议预处理
                        let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(cmd);
                        if(handler) {
                            //重新构建消息结构
                            let msgParam = {
                                _cmd: cmd,
                                _receiveTime: Date.now(),
                                _para: {
                                    errNo: netObj._errno,
                                    errStr: netObj._errstr,
                                    errExt: netObj._errext,
                                },
                            }
                            handler.Handle(msgParam);
                        }
                    }
                    return;
                }

                if(complete) {
                    complete(netObj._param);
                }
                else {
                    let cmd:string = netObj._func;

                    //协议预处理
                    let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(cmd);
                    if(handler) {
                        //重新构建消息结构
                        let msgParam = {
                            _cmd: cmd,
                            _receiveTime: Date.now(),
                            _para: netObj._param,
                        }
                        handler.Handle(msgParam);
                    }
                }
            }
            else {
                let buffer = new Uint8Array(msg);
                //大字节序读取command
                let command = ByteBuffer.wrap(buffer.slice(0, 4), false).readUint32(0);
                let paraData = buffer.slice(4);

                let cmd = "*game*_" + command;
                this.handlePbMsg(cmd, paraData);
            }
        },
        (msg:any)=>{

            //该协议只在游戏中使用
            //如果在NoIgnoreWhenChangeSceneList 则忽略
            if(!Global.SceneManager.inGame())
            {
                Logger.error("gameserver http协议跨场景，丢弃");
                return;
            }

            let url:string = msg || "";
            let funcName:string = "";
            let start = url.indexOf("_func=");
            if(start != -1) {
                let end = url.indexOf("&", start + 6);
                if(end != -1) {
                    funcName = url.substring(start + 6, end)
                }
            }

            //协议发送失败处理
            if(onError) {
                onError({_errno:-1, _errstr:"网络连接超时，请检查后重试", _errext:funcName});
            }
            else {
                //处理错误
                let cmd:string = "*game*_404";

                //协议预处理
                let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(cmd);
                if(handler) {
                    //重新构建消息结构
                    let msgParam = {
                        _cmd: cmd,
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: -1,
                            errStr: "网络连接异常，请检查后重试",
                            errExt: funcName,
                        },
                    }
                    handler.Handle(msgParam);
                }
            }
        })
    }

    public setDst(gt, chair)
    {
        this.dst._gt = gt;
        this.dst._chair = chair;
        // this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).setDst(gt, chair)
    }

    public clearDst()
    {
        this.dst = {}
    }

    public passAll()
    {this.msgState = MessageState.PassAll;}

    public ignoreAll()
    {this.msgState = MessageState.IgnoreAll;}

    public passSSSAndEnter()
    {
        this.msgState = MessageState.PassSSSAndEnter;
        this.lastSN = -1;
    }

    public sendDirect(param)
    {
        this.getHelper<SocketHelper>(this.socketHelperKey).send(param);

        if(param == null || param._param == null)
            return;        
        let key = Global.ReportTool.genGameKey("send");
        Global.ReportTool.ReportPublicDebugLog(key, param);
    }

    public sendHeartBeat()
    {
        this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).startHeartbeat();
        this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).sendHeartBeat();
    }

    public stopHeartBeat()
    {
        this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).stopHeartBeat();
    }

    public getSendParam(cmd)
    {
        let data: any = {}
        data._dst = this.dst;
        data._param = {}
        data._param._cmd = cmd;
        data._mod = this.mod;
        this.checkHelper.updateChecker();
        if(cmd == Game.Command.HeartBeat)
        {
            this.checkHelper.recordHeartbeat();
            data._check = this.checkHelper.getHeartBeatChecker(this.lastSN);
        }
        else
        {
            data._check = this.checkHelper.getNomalChecker();
        }
        this.updateChecker();
        return data;
    }

    private updateChecker()
    {
        this.checker++;
        if(this.checker > 100000)
        {
            this.checker = 0;
        }
    }

    //链接服务器
    //serverInfo  服务器配置信息  兼容单链接 和多链接
    public connect(serverInfo:ServerRouteInfo, mod:string, pbmode = false, useFunc = true)
    {
        let url = "";
        // if(pbmode)
        // {
        let serverUrl  = serverInfo.getPbSocketUrl(mod);
        // }
        // else
        // {
        //     url = serverInfo.getSocketUrl();
        // }
        this.mod = mod;

        let suffix = this.getSocketSuffix(useFunc);
        serverUrl.suffix = serverUrl.suffix + suffix;
        url = Global.UrlUtil.dealWebSocketUrl(serverUrl)
        let cerPath = serverUrl.cerPath
        // url = this.getSocketUrl(url, pbmode);
        //url = this.getSocketUrl(url, true);
        this.getHelper<SocketHelper>(this.socketHelperKey).connect(url, serverInfo, pbmode, this.mod, suffix,cerPath);
    }

    //获取心跳网络延时
    public getNetCost()
    {
        if(!this.checkHelper)
            return 0;
        return this.checkHelper.getNetCost();
    }


    public callHelper(funcName, param?)
    {
        for(let key in this.helperMap)
        {
            if(this.helperMap[key][funcName])
                this.helperMap[key][funcName](param)
        }
    }

    public getSocketUrl(url:ServerUrl, useFunc = false)
    {
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        url.suffix = url.suffix + "?"+ urlParam
        if(useFunc)
        {
            url.suffix += "&_func=event";
        }
        return url;
    }

    public getSocketSuffix(useFunc = false)
    {
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        let suffix = "?" + urlParam
        if(useFunc)
        {
            suffix += "&_func=event";
        }
        return suffix;
    }

 
    private registHelper(key:string, helper:BaseServerHelper)
    {
        if(this.helperMap[key] != null)
        {
            Logger.error("重复注册helper");
        }
        this.helperMap[key] = helper;
    }

    private getHelper<T extends BaseServerHelper>(key):T
    {
        if(!this.helperMap[key])
            return null;
        return this.helperMap[key] as T;
    }


    public clearData()
    {
        this.msgQueue = [];
        this.lockList = [];
        this.lastSN = -1;
        this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).stopHeartBeat();
    }

    private handlePbMsg(cmd, netData)
    {
        let _check = netData._check;
        let callbackInfo = this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).getCallback(_check);
        if (callbackInfo){
            let callback: any = callbackInfo.callback;
            if(callback && callback.decodePb)       // 数据格式还有问题, 未使用验证先注释
            {
                // let para = callback.decodePb(netData);
                // //如果是错误命令 有可能会返回空
                // if(para == null)
                //     return;
                // let packData:any = {}
                // packData._cmd = cmd;
                // packData._para = para;
                // Logger.log("receive PbMsg: " + JSON.stringify(packData));
                // if(callbackInfo.inQueue)
                //     this.msgQueue.push(packData);
                // else{
                //     callback(packData);
                //     this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).removeCallback(_check);
                // }
            }
        }
        else{
            let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(cmd);
            if(handler && handler.decodePb)
            {
                let para = handler.decodePb(netData);
                //如果是错误命令 有可能会返回空
                if(para == null)
                    return;
                let packData:any = {}
                packData._cmd = cmd;
                packData._para = para;
                Logger.log("receive PbMsg: " + JSON.stringify(packData));

                if(handler.checkInQueue && handler.checkInQueue(packData))
                    this.msgQueue.push(packData);
                else
                    handler.Handle(packData);
            }
        }
    }

    private filterMsg(netData)
    {
        if(netData == null || netData._param == null)
            return false;
        //过滤全部协议
        if(this.msgState == MessageState.IgnoreAll)
            return false;
        //除了session和enter 全部过滤
        if(this.msgState == MessageState.PassSSSAndEnter)
        {
            // if(netData._param._cmd == null)
            //     return false;
            // return netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.Enter;
            return netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.Enter || netData._param._cmd == Game.Command.WaitMatch;
        }
        return true;
    }

    private handleMsg(netData)
    {
        if(!this.filterMsg(netData))
        {
            Logger.error("filter msg", JSON.stringify(netData));
            return ;
        }

        if (netData == null || netData == undefined) {
            Logger.error("netData == null！！！！！！！");
            return;
        }

        this.preHandleMsg(netData);

        let _check = netData._check;
        let callbackInfo = this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).getCallback(_check);
        if (callbackInfo && callbackInfo.errorCallback && netData._param && netData._param._errno){
            callbackInfo.errorCallback(netData._param);
            return;
        }

        let errorHelper = this.getHelper<GameErrorHelper>(this.errorHelperKey);

        if(!errorHelper.handleSysError(netData))
            return;

        //检查sn  
        if(!this.checkSN(netData))
        {
            this.lastSN = -1;
            //sn验证不通过需要强制重连
            Game.Event.event(Game.EVENT_CALL_RECONNECT);
            return;
        }

        if(!errorHelper.handleCmdError(netData))
            return;
        
        if(!errorHelper.handleLogicError(netData))
            return;

        let cmd = netData._param._cmd


        //心跳逻辑处理
        if(cmd == Game.Command.HeartBeat)
        {
            let key = Global.ReportTool.genGameKey("recv_he1");
            Global.ReportTool.ReportPublicDebugLog(key, netData);

            this.checkHelper.refreshCostTime(netData._check)
            this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).HandleHeartBeat(netData);

            let serverTime = netData._param._times;
            if (serverTime)
                Game.Component.doChecker(serverTime);
            return;
        }

        let key = Global.ReportTool.genGameKey("recv");
        Global.ReportTool.ReportPublicDebugLog(key, netData);

        netData._param._receiveTime = Date.now();

        //协议预处理
        if (callbackInfo){          // 回调方式处理
            if(callbackInfo.inQueue)
                this.msgQueue.push(netData);
            else{
                callbackInfo.callback(netData._param);
                this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).removeCallback(_check);
            }
        }
        else{           // 消息方式处理
            let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(cmd);
            if(handler)
            {
                if(handler.checkInQueue && handler.checkInQueue(netData._param))
                    this.msgQueue.push(netData._param);
                else
                    handler.Handle(netData._param);
            }
        }
    }

    private preHandleMsg(netData)
    {
        //收到enter和session后 协议正常接收   这里不检查错误，错误处理放到后面处理  add pvp匹配协议
        if(netData._param._cmd == Game.Command.Enter || netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.WaitMatch)
        {
            this.passAll();
            return;
        }
        if(netData._param._cmd == Game.Command.Leave)
        {
            //收到自己leave 并且 没有错误 则不接受后续协议，需要等下次enter
            if(Game.Context && Game.Context.selfSrc
                && Game.Context.selfSrc == netData._param._src
                && (netData._param._errno == null || netData._param._errno == 0))
                this.ignoreAll();
        }

    }

    public onUpdate(dt)
    {
        this.checkHelper.onUpdate(dt);
        if(!this.isRunning)
            return;
        this.callHelper("onUpdate", dt)
        this.updateLock(dt);
        while(this.msgQueue.length > 0)
        {
            if(this.hasLock())
                return;
            let msg = this.msgQueue.shift();
            let callbackInfo = this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).getCallback(msg._check);
            if (callbackInfo && callbackInfo.callback){
                callbackInfo.callback(msg._param);          // 回调式的需要_check找到对应的, 需要传外层的数据
                this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).removeCallback(msg._check);
            }
            else{
                let handler = this.getHelper<HandlerHelper>(this.handleHelperKey).getHandler(msg._cmd);
                if(handler != null)
                {
                    handler.Handle(msg);
                }
            }
        }
    }

    private hasLock()
    {
        return this.lockList.length > 0;
    }

    private checkSN(msg)
    {
        let sn = msg._sn;

        Logger.log("===lastSN:" + this.lastSN + "   curSN:" + sn);
        if(sn == 0)    //sn为0  跳过检测   主要处理 900  901 等错误
            return true;
        if (!this.lastSN || this.lastSN < 0) {
            this.lastSN = sn;
            return true;
        }
        if (this.lastSN + 1 != sn) {
            Logger.error("lastSN:" + this.lastSN + "   curSN:" + sn);
            Global.ReportTool.ReportClientError("SnError",
            {
                "lastSN":this.lastSN,
                "serSn":sn,
                "check":msg._check,
                "param":msg._param,
                "appid":Global.Setting.appId,
                "uid":Global.PlayerData.uid,
            })
            return false;
        }
        this.lastSN = sn;
        return true;
    }

    
    private addTimeLock(key:string, time:number)
    {
        time = time || 0
        Logger.log("time lock", key, time);
        let lockInfo = LockInfo.create(key, 0, time);
        this.lockList.push(lockInfo);
    }

    private addManualLock(key)
    {
        let lockInfo = LockInfo.create(key, 1);
        this.lockList.push(lockInfo);
    }


    private removeLock(key)
    {
        //一次只清理一条
        for(let i = 0; i < this.lockList.length; i++)
        {
            let lock = this.lockList[i];
            if(lock.key == key)
            {
                this.lockList.splice(i, 1);
                return;
            }
        }
    }


    private updateLock(dt)
    {
        for(let i = this.lockList.length - 1; i >= 0; i--)
        {
            this.lockList[i].time -= dt;
            if(this.lockList[i].time <= 0)
            {
                let lock = this.lockList[i];
                if(lock.type == 1)
                {
                    Logger.error("Manual Lock 解锁超时", lock.key)
                }
                this.lockList.splice(i, 1);
            }
        }
    }
}

class LockInfo
{
    public static lockTimeout = 6;
    public key:string;
    public time:number;
    public type:number;    //0 timelock  1 manuallock

    public static create(key, type, time?)
    {
        let info = new LockInfo();
        info.key = key;
        if(type == 0)
            info.time = time;
        else
            info.time = LockInfo.lockTimeout;
        return info;
    }

}