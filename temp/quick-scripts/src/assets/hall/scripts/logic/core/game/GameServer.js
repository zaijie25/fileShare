"use strict";
cc._RF.push(module, 'e1e05CJ3mdE/aasNUy0Ge3K', 'GameServer');
// hall/scripts/logic/core/game/GameServer.ts

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
var EventDispatcher_1 = require("../../../framework/event/EventDispatcher");
var SocketHelper_1 = require("./serverHelper/SocketHelper");
var HandlerHelper_1 = require("./serverHelper/HandlerHelper");
var GameErrorHelper_1 = require("./serverHelper/GameErrorHelper");
var ReconnectHelper_1 = require("./serverHelper/ReconnectHelper");
var GameHeartBeatHelper_1 = require("./serverHelper/GameHeartBeatHelper");
var HallErrorHandler_1 = require("../net/hall/HallErrorHandler");
// import * as ByteBuffer from "bytebuffer";
var CheckHelper_1 = require("../net/hall/CheckHelper");
var CallbackHandlerHelper_1 = require("./serverHelper/CallbackHandlerHelper");
var MessageState;
(function (MessageState) {
    MessageState[MessageState["IgnoreAll"] = 0] = "IgnoreAll";
    MessageState[MessageState["PassSSSAndEnter"] = 1] = "PassSSSAndEnter";
    MessageState[MessageState["PassAll"] = 2] = "PassAll";
})(MessageState || (MessageState = {}));
var GameServer = /** @class */ (function (_super) {
    __extends(GameServer, _super);
    function GameServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleHelperKey = "handlerHelper";
        _this.socketHelperKey = "socketHelper";
        _this.errorHelperKey = "gameErrorHelper";
        _this.reconnectHelperKey = "reconnectHelperKey";
        _this.heartBeatHelperKey = "heartbeatHelperKey";
        _this.callbackHelperKey = "callbackHelperKey";
        _this.helperMap = {};
        //服务器使用数据
        _this.dst = {};
        _this.checker = 0;
        //消息队列
        _this.msgQueue = [];
        //锁列表
        _this.lockList = [];
        _this.isRunning = false;
        //服务器验证数据
        _this.lastSN = -1;
        _this.msgState = MessageState.PassAll;
        //通用协议错误处理 （业务逻辑错误）
        _this.errorHelper = new HallErrorHandler_1.HallErrorHelper();
        _this.checkHelper = new CheckHelper_1.default(2);
        return _this;
    }
    GameServer.prototype.setup = function () {
        this.registHelper(this.socketHelperKey, new SocketHelper_1.default(this));
        this.registHelper(this.handleHelperKey, new HandlerHelper_1.default(this));
        this.registHelper(this.errorHelperKey, new GameErrorHelper_1.default(this));
        this.registHelper(this.reconnectHelperKey, new ReconnectHelper_1.default(this));
        this.registHelper(this.heartBeatHelperKey, new GameHeartBeatHelper_1.default(this));
        this.registHelper(this.callbackHelperKey, new CallbackHandlerHelper_1.default(this));
        this.on(GameServer.Event_GameSocketMsg, this, this.handleMsg);
        this.on(GameServer.Event_GamePBSocketMsg, this, this.handlePbMsg);
        this.on(GameServer.Event_GameSocketCallReconnect, this, this.clearData);
    };
    //注册定制协议处理函数
    GameServer.prototype.registHandler = function (key, handler) {
        this.getHelper(this.handleHelperKey).registHandler(key, handler);
    };
    //反注册定制协议处理函数
    GameServer.prototype.unregistHandler = function (key) {
        this.getHelper(this.handleHelperKey).removeHandler(key);
    };
    //注册通用错误处理函数
    GameServer.prototype.registDefaultHandler = function (key, handler) {
        this.getHelper(this.handleHelperKey).registDefaultHandler(key, handler);
    };
    //注册定制错误处理
    GameServer.prototype.registErrorHandler = function (errno, handler) {
        this.getHelper(this.errorHelperKey).registErrorHandler(errno, handler);
    };
    GameServer.prototype.clearHandlers = function () {
        this.getHelper(this.handleHelperKey).clearHandlers();
        this.getHelper(this.callbackHelperKey).clearCallbacks();
    };
    GameServer.prototype.run = function () {
        Game.Event.on(Game.EVENT_ADDMANUALLOCK, this, this.addManualLock);
        Game.Event.on(Game.EVENT_ADDTIMELOCK, this, this.addTimeLock);
        Game.Event.on(Game.EVENT_REMOVELOCK, this, this.removeLock);
        Game.Event.on(Game.EVENT_UNSHFIT_MSGLIST, this, this.unshfitMsgList);
        this.callHelper("run");
        this.isRunning = true;
    };
    GameServer.prototype.stop = function () {
        this.callHelper("clear");
        Game.Event.offAllByCaller(this);
        this.checkHelper.clear();
        this.lastSN = -1;
        this.msgState = MessageState.PassAll;
        this.msgQueue = [];
        this.lockList = [];
        this.mod = "";
        this.dst = {};
        this.isRunning = false;
    };
    GameServer.prototype.unshfitMsgList = function (msgList) {
        if (msgList == null || msgList.length == 0)
            return;
        // for(let i = 0; i < msgList.length; i++)
        // {
        //     if(msgList[i]._param == null)
        //     {
        //         msgList[i] = {_param:msgList[i]};
        //     }
        // }
        this.msgQueue.unshift.apply(this.msgQueue, msgList);
    };
    GameServer.prototype.stopGame = function () {
        this.isRunning = false;
        this.lockList = [];
        this.msgQueue = [];
        this.lastSN = -1;
        this.getHelper(this.socketHelperKey).clear();
        this.getHelper(this.heartBeatHelperKey).netInterval = 0;
    };
    /**
     * 发送 内容为json格式的Socket消息
     * @param cmd
     * @param payload
     */
    GameServer.prototype.send = function (cmd, param) {
        param = param || {};
        var data = this.getSendParam(cmd);
        data._param._para = param;
        data._func = cmd; // 服务器要求 水果机需要加上, 就统一加上
        this.sendDirect(data);
    };
    /**
     * 发送回调方式的socket请求
     * @param cmd 协议名
     * @param param 参数
     * @param callback 回调
     * @param errorCallback 错误时回调, 传空表示使用通用处理
     * @param livingTime 生存时长s -1表不限生命周期
     * @param inQueue 是否走队列
     */
    GameServer.prototype.sendWithCallback = function (cmd, param, callback, errorCallback, livingTime, inQueue) {
        if (livingTime === void 0) { livingTime = -1; }
        if (inQueue === void 0) { inQueue = true; }
        param = param || {};
        var data = this.getSendParam(cmd);
        data._param._para = param;
        data._func = cmd;
        var check = data._check;
        var callbackInfo = {
            key: check,
            callback: callback,
            errorCallback: errorCallback,
            inQueue: inQueue,
            live: livingTime,
            cmd: cmd
        };
        this.getHelper(this.callbackHelperKey).registCallback(check, callbackInfo);
        this.sendDirect(data);
    };
    /**
     * 发送 内容为protobuffer格式的Socket消息
     * @param cmd
     * @param payload
     */
    GameServer.prototype.sendPb = function (cmd, payload) {
        if (cmd.indexOf("*game*_") == 0) {
            cmd = cmd.replace("*game*_", "");
            cmd = Number(cmd);
        }
        this.getHelper(this.socketHelperKey).sendBuffer(cmd, payload);
    };
    /**
     * 发送 内容为json格式的Http请求
     * @param mod gameGameRoute返回的mod
     * @param cmd 协议方法名
     * @param param
     * @param complete
     * @param onError
     */
    GameServer.prototype.sendHttp = function (mod, cmd, param, complete, onError) {
        var _this = this;
        param = param || {};
        var serverRoutes = Global.Setting.Urls.gameRoutes;
        if (serverRoutes == null) {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }
        var errorHandler = function (netObj) {
            if (onError) {
                onError(netObj);
            }
            else {
                //协议预处理
                var handler = _this.getHelper(_this.handleHelperKey).getHandler("*game*_404");
                if (handler) {
                    //重新构建消息结构
                    var msgParam = {
                        _cmd: "*game*_404",
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: netObj._errno,
                            errStr: netObj._errstr,
                            errExt: netObj._errext || cmd,
                        },
                    };
                    handler.Handle(msgParam);
                }
            }
            return true;
        };
        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, cmd, param, complete, errorHandler);
    };
    /**
     * 发送 内容为protobuffer格式的Http请求
     * @param mod gameGameRoute返回的mod
     * @param cmd 协议方法名
     * @param param
     * @param complete
     * @param onError
     */
    GameServer.prototype.sendHttpPb = function (mod, cmd, buffer, complete, onError) {
        var _this = this;
        var cmdId = 0;
        if (cmd.indexOf("*game*_") == 0) {
            var num = cmd.replace("*game*_", "");
            cmdId = Number(num);
        }
        else {
            cmdId = Number(cmd);
        }
        if (!cmdId) {
            Logger.error("sendHttpPb() cmd 格式错误");
            return;
        }
        var size = buffer ? buffer.length : 0;
        size += 4;
        var bb = ByteBuffer.allocate(size, false, false);
        bb.writeUint32(cmdId, 0);
        if (buffer) {
            bb.append(buffer, 4);
        }
        var serverRoutes = Global.Setting.Urls.gameRoutes;
        if (serverRoutes == null) {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }
        var errorHandler = function (netObj) {
            if (onError) {
                onError();
            }
            else {
                //协议预处理
                var handler = _this.getHelper(_this.handleHelperKey).getHandler("*game*_404");
                if (handler) {
                    //重新构建消息结构
                    var msgParam = {
                        _cmd: "*game*_404",
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: netObj._errno,
                            errStr: netObj._errstr,
                            errExt: netObj._errext || cmd,
                        },
                    };
                    handler.Handle(msgParam);
                }
            }
            return true;
        };
        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, cmd, buffer, complete, errorHandler);
        bb.clear();
    };
    /**
     * 根据serverRoute mod  发送http协议，主要用于拉把类协议请求
     * @param serverRoute 服务器返回的服务器地址信息
     * @param mod 服务器路由
     * @param cmd 协议方法名
     * @param param
     * @param complete
     * @param onError
     */
    GameServer.prototype.sendWithServerRouteAndMod = function (serverRoute, mod, cmd, param, complete, onError) {
        var serverUrl = serverRoute.getHttpUrlWithMod(mod);
        var urlParam = Global.UrlUtil.getUrlCommonParam();
        var suffix = "?_func=" + cmd + "&" + urlParam;
        var sendParam = {};
        sendParam._param = param;
        serverUrl.suffix = serverUrl.suffix + suffix;
        this.sendWithUrl(serverUrl, sendParam, complete, onError);
    };
    /**
     * 通过url方式发送http请求
     * @param url
     * @param param
     * @param complete
     * @param onError
     */
    GameServer.prototype.sendWithUrl = function (serverUrl, param, complete, onError) {
        var _this = this;
        Global.Http.send(serverUrl, param, function (msg) {
            if (typeof (msg) == "string") {
                var netObj = null;
                try {
                    netObj = JSON.parse(msg);
                }
                catch (e) {
                    Logger.error("解析协议失败", msg, e);
                    return;
                }
                //消息打印
                if (netObj._func != Game.Command.HeartBeat) {
                    Logger.log("HttpMsg:", msg);
                }
                //该协议只在游戏中使用
                //如果在NoIgnoreWhenChangeSceneList 则忽略
                if (!Global.SceneManager.inGame()) {
                    Logger.error("gameserver http协议跨场景，丢弃", serverUrl.getUrl());
                    return;
                }
                //处理错误
                if (!_this.errorHelper.handleError(netObj, onError)) {
                    if (netObj._errno != null) {
                        var cmd = "*game*_404";
                        //协议预处理
                        var handler = _this.getHelper(_this.handleHelperKey).getHandler(cmd);
                        if (handler) {
                            //重新构建消息结构
                            var msgParam = {
                                _cmd: cmd,
                                _receiveTime: Date.now(),
                                _para: {
                                    errNo: netObj._errno,
                                    errStr: netObj._errstr,
                                    errExt: netObj._errext,
                                },
                            };
                            handler.Handle(msgParam);
                        }
                    }
                    return;
                }
                if (complete) {
                    complete(netObj._param);
                }
                else {
                    var cmd = netObj._func;
                    //协议预处理
                    var handler = _this.getHelper(_this.handleHelperKey).getHandler(cmd);
                    if (handler) {
                        //重新构建消息结构
                        var msgParam = {
                            _cmd: cmd,
                            _receiveTime: Date.now(),
                            _para: netObj._param,
                        };
                        handler.Handle(msgParam);
                    }
                }
            }
            else {
                var buffer = new Uint8Array(msg);
                //大字节序读取command
                var command = ByteBuffer.wrap(buffer.slice(0, 4), false).readUint32(0);
                var paraData = buffer.slice(4);
                var cmd = "*game*_" + command;
                _this.handlePbMsg(cmd, paraData);
            }
        }, function (msg) {
            //该协议只在游戏中使用
            //如果在NoIgnoreWhenChangeSceneList 则忽略
            if (!Global.SceneManager.inGame()) {
                Logger.error("gameserver http协议跨场景，丢弃");
                return;
            }
            var url = msg || "";
            var funcName = "";
            var start = url.indexOf("_func=");
            if (start != -1) {
                var end = url.indexOf("&", start + 6);
                if (end != -1) {
                    funcName = url.substring(start + 6, end);
                }
            }
            //协议发送失败处理
            if (onError) {
                onError({ _errno: -1, _errstr: "网络连接超时，请检查后重试", _errext: funcName });
            }
            else {
                //处理错误
                var cmd = "*game*_404";
                //协议预处理
                var handler = _this.getHelper(_this.handleHelperKey).getHandler(cmd);
                if (handler) {
                    //重新构建消息结构
                    var msgParam = {
                        _cmd: cmd,
                        _receiveTime: Date.now(),
                        _para: {
                            errNo: -1,
                            errStr: "网络连接异常，请检查后重试",
                            errExt: funcName,
                        },
                    };
                    handler.Handle(msgParam);
                }
            }
        });
    };
    GameServer.prototype.setDst = function (gt, chair) {
        this.dst._gt = gt;
        this.dst._chair = chair;
        // this.getHelper<GameHeartBeatHelper>(this.heartBeatHelperKey).setDst(gt, chair)
    };
    GameServer.prototype.clearDst = function () {
        this.dst = {};
    };
    GameServer.prototype.passAll = function () { this.msgState = MessageState.PassAll; };
    GameServer.prototype.ignoreAll = function () { this.msgState = MessageState.IgnoreAll; };
    GameServer.prototype.passSSSAndEnter = function () {
        this.msgState = MessageState.PassSSSAndEnter;
        this.lastSN = -1;
    };
    GameServer.prototype.sendDirect = function (param) {
        this.getHelper(this.socketHelperKey).send(param);
        if (param == null || param._param == null)
            return;
        var key = Global.ReportTool.genGameKey("send");
        Global.ReportTool.ReportPublicDebugLog(key, param);
    };
    GameServer.prototype.sendHeartBeat = function () {
        this.getHelper(this.heartBeatHelperKey).startHeartbeat();
        this.getHelper(this.heartBeatHelperKey).sendHeartBeat();
    };
    GameServer.prototype.stopHeartBeat = function () {
        this.getHelper(this.heartBeatHelperKey).stopHeartBeat();
    };
    GameServer.prototype.getSendParam = function (cmd) {
        var data = {};
        data._dst = this.dst;
        data._param = {};
        data._param._cmd = cmd;
        data._mod = this.mod;
        this.checkHelper.updateChecker();
        if (cmd == Game.Command.HeartBeat) {
            this.checkHelper.recordHeartbeat();
            data._check = this.checkHelper.getHeartBeatChecker(this.lastSN);
        }
        else {
            data._check = this.checkHelper.getNomalChecker();
        }
        this.updateChecker();
        return data;
    };
    GameServer.prototype.updateChecker = function () {
        this.checker++;
        if (this.checker > 100000) {
            this.checker = 0;
        }
    };
    //链接服务器
    //serverInfo  服务器配置信息  兼容单链接 和多链接
    GameServer.prototype.connect = function (serverInfo, mod, pbmode, useFunc) {
        if (pbmode === void 0) { pbmode = false; }
        if (useFunc === void 0) { useFunc = true; }
        var url = "";
        // if(pbmode)
        // {
        var serverUrl = serverInfo.getPbSocketUrl(mod);
        // }
        // else
        // {
        //     url = serverInfo.getSocketUrl();
        // }
        this.mod = mod;
        var suffix = this.getSocketSuffix(useFunc);
        serverUrl.suffix = serverUrl.suffix + suffix;
        url = Global.UrlUtil.dealWebSocketUrl(serverUrl);
        var cerPath = serverUrl.cerPath;
        // url = this.getSocketUrl(url, pbmode);
        //url = this.getSocketUrl(url, true);
        this.getHelper(this.socketHelperKey).connect(url, serverInfo, pbmode, this.mod, suffix, cerPath);
    };
    //获取心跳网络延时
    GameServer.prototype.getNetCost = function () {
        if (!this.checkHelper)
            return 0;
        return this.checkHelper.getNetCost();
    };
    GameServer.prototype.callHelper = function (funcName, param) {
        for (var key in this.helperMap) {
            if (this.helperMap[key][funcName])
                this.helperMap[key][funcName](param);
        }
    };
    GameServer.prototype.getSocketUrl = function (url, useFunc) {
        if (useFunc === void 0) { useFunc = false; }
        var urlParam = Global.UrlUtil.getUrlCommonParam();
        url.suffix = url.suffix + "?" + urlParam;
        if (useFunc) {
            url.suffix += "&_func=event";
        }
        return url;
    };
    GameServer.prototype.getSocketSuffix = function (useFunc) {
        if (useFunc === void 0) { useFunc = false; }
        var urlParam = Global.UrlUtil.getUrlCommonParam();
        var suffix = "?" + urlParam;
        if (useFunc) {
            suffix += "&_func=event";
        }
        return suffix;
    };
    GameServer.prototype.registHelper = function (key, helper) {
        if (this.helperMap[key] != null) {
            Logger.error("重复注册helper");
        }
        this.helperMap[key] = helper;
    };
    GameServer.prototype.getHelper = function (key) {
        if (!this.helperMap[key])
            return null;
        return this.helperMap[key];
    };
    GameServer.prototype.clearData = function () {
        this.msgQueue = [];
        this.lockList = [];
        this.lastSN = -1;
        this.getHelper(this.heartBeatHelperKey).stopHeartBeat();
    };
    GameServer.prototype.handlePbMsg = function (cmd, netData) {
        var _check = netData._check;
        var callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(_check);
        if (callbackInfo) {
            var callback = callbackInfo.callback;
            if (callback && callback.decodePb) // 数据格式还有问题, 未使用验证先注释
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
        else {
            var handler = this.getHelper(this.handleHelperKey).getHandler(cmd);
            if (handler && handler.decodePb) {
                var para = handler.decodePb(netData);
                //如果是错误命令 有可能会返回空
                if (para == null)
                    return;
                var packData = {};
                packData._cmd = cmd;
                packData._para = para;
                Logger.log("receive PbMsg: " + JSON.stringify(packData));
                if (handler.checkInQueue && handler.checkInQueue(packData))
                    this.msgQueue.push(packData);
                else
                    handler.Handle(packData);
            }
        }
    };
    GameServer.prototype.filterMsg = function (netData) {
        if (netData == null || netData._param == null)
            return false;
        //过滤全部协议
        if (this.msgState == MessageState.IgnoreAll)
            return false;
        //除了session和enter 全部过滤
        if (this.msgState == MessageState.PassSSSAndEnter) {
            // if(netData._param._cmd == null)
            //     return false;
            // return netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.Enter;
            return netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.Enter || netData._param._cmd == Game.Command.WaitMatch;
        }
        return true;
    };
    GameServer.prototype.handleMsg = function (netData) {
        if (!this.filterMsg(netData)) {
            Logger.error("filter msg", JSON.stringify(netData));
            return;
        }
        if (netData == null || netData == undefined) {
            Logger.error("netData == null！！！！！！！");
            return;
        }
        this.preHandleMsg(netData);
        var _check = netData._check;
        var callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(_check);
        if (callbackInfo && callbackInfo.errorCallback && netData._param && netData._param._errno) {
            callbackInfo.errorCallback(netData._param);
            return;
        }
        var errorHelper = this.getHelper(this.errorHelperKey);
        if (!errorHelper.handleSysError(netData))
            return;
        //检查sn  
        if (!this.checkSN(netData)) {
            this.lastSN = -1;
            //sn验证不通过需要强制重连
            Game.Event.event(Game.EVENT_CALL_RECONNECT);
            return;
        }
        if (!errorHelper.handleCmdError(netData))
            return;
        if (!errorHelper.handleLogicError(netData))
            return;
        var cmd = netData._param._cmd;
        //心跳逻辑处理
        if (cmd == Game.Command.HeartBeat) {
            var key_1 = Global.ReportTool.genGameKey("recv_he1");
            Global.ReportTool.ReportPublicDebugLog(key_1, netData);
            this.checkHelper.refreshCostTime(netData._check);
            this.getHelper(this.heartBeatHelperKey).HandleHeartBeat(netData);
            var serverTime = netData._param._times;
            if (serverTime)
                Game.Component.doChecker(serverTime);
            return;
        }
        var key = Global.ReportTool.genGameKey("recv");
        Global.ReportTool.ReportPublicDebugLog(key, netData);
        netData._param._receiveTime = Date.now();
        //协议预处理
        if (callbackInfo) { // 回调方式处理
            if (callbackInfo.inQueue)
                this.msgQueue.push(netData);
            else {
                callbackInfo.callback(netData._param);
                this.getHelper(this.callbackHelperKey).removeCallback(_check);
            }
        }
        else { // 消息方式处理
            var handler = this.getHelper(this.handleHelperKey).getHandler(cmd);
            if (handler) {
                if (handler.checkInQueue && handler.checkInQueue(netData._param))
                    this.msgQueue.push(netData._param);
                else
                    handler.Handle(netData._param);
            }
        }
    };
    GameServer.prototype.preHandleMsg = function (netData) {
        //收到enter和session后 协议正常接收   这里不检查错误，错误处理放到后面处理  add pvp匹配协议
        if (netData._param._cmd == Game.Command.Enter || netData._param._cmd == Game.Command.Session || netData._param._cmd == Game.Command.WaitMatch) {
            this.passAll();
            return;
        }
        if (netData._param._cmd == Game.Command.Leave) {
            //收到自己leave 并且 没有错误 则不接受后续协议，需要等下次enter
            if (Game.Context && Game.Context.selfSrc
                && Game.Context.selfSrc == netData._param._src
                && (netData._param._errno == null || netData._param._errno == 0))
                this.ignoreAll();
        }
    };
    GameServer.prototype.onUpdate = function (dt) {
        this.checkHelper.onUpdate(dt);
        if (!this.isRunning)
            return;
        this.callHelper("onUpdate", dt);
        this.updateLock(dt);
        while (this.msgQueue.length > 0) {
            if (this.hasLock())
                return;
            var msg = this.msgQueue.shift();
            var callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(msg._check);
            if (callbackInfo && callbackInfo.callback) {
                callbackInfo.callback(msg._param); // 回调式的需要_check找到对应的, 需要传外层的数据
                this.getHelper(this.callbackHelperKey).removeCallback(msg._check);
            }
            else {
                var handler = this.getHelper(this.handleHelperKey).getHandler(msg._cmd);
                if (handler != null) {
                    handler.Handle(msg);
                }
            }
        }
    };
    GameServer.prototype.hasLock = function () {
        return this.lockList.length > 0;
    };
    GameServer.prototype.checkSN = function (msg) {
        var sn = msg._sn;
        Logger.log("===lastSN:" + this.lastSN + "   curSN:" + sn);
        if (sn == 0) //sn为0  跳过检测   主要处理 900  901 等错误
            return true;
        if (!this.lastSN || this.lastSN < 0) {
            this.lastSN = sn;
            return true;
        }
        if (this.lastSN + 1 != sn) {
            Logger.error("lastSN:" + this.lastSN + "   curSN:" + sn);
            Global.ReportTool.ReportClientError("SnError", {
                "lastSN": this.lastSN,
                "serSn": sn,
                "check": msg._check,
                "param": msg._param,
                "appid": Global.Setting.appId,
                "uid": Global.PlayerData.uid,
            });
            return false;
        }
        this.lastSN = sn;
        return true;
    };
    GameServer.prototype.addTimeLock = function (key, time) {
        time = time || 0;
        Logger.log("time lock", key, time);
        var lockInfo = LockInfo.create(key, 0, time);
        this.lockList.push(lockInfo);
    };
    GameServer.prototype.addManualLock = function (key) {
        var lockInfo = LockInfo.create(key, 1);
        this.lockList.push(lockInfo);
    };
    GameServer.prototype.removeLock = function (key) {
        //一次只清理一条
        for (var i = 0; i < this.lockList.length; i++) {
            var lock = this.lockList[i];
            if (lock.key == key) {
                this.lockList.splice(i, 1);
                return;
            }
        }
    };
    GameServer.prototype.updateLock = function (dt) {
        for (var i = this.lockList.length - 1; i >= 0; i--) {
            this.lockList[i].time -= dt;
            if (this.lockList[i].time <= 0) {
                var lock = this.lockList[i];
                if (lock.type == 1) {
                    Logger.error("Manual Lock 解锁超时", lock.key);
                }
                this.lockList.splice(i, 1);
            }
        }
    };
    //网络内部事件
    GameServer.Event_GameSocketMsg = "Event_GameSocketMsg";
    GameServer.Event_GameSocketOpen = "Event_GameSocketOpen";
    GameServer.Event_GameSocketClose = "Event_GameSocketClose";
    //Protobuf协议
    GameServer.Event_GamePBSocketMsg = "Event_GamePBSocketMsg";
    GameServer.Event_GameSocketStartConnect = "Event_GameSocketStartConnect";
    //sock重连请求
    GameServer.Event_GameSocketCallReconnect = "Event_GameSocketReconnect";
    return GameServer;
}(EventDispatcher_1.default));
exports.default = GameServer;
var LockInfo = /** @class */ (function () {
    function LockInfo() {
    }
    LockInfo.create = function (key, type, time) {
        var info = new LockInfo();
        info.key = key;
        if (type == 0)
            info.time = time;
        else
            info.time = LockInfo.lockTimeout;
        return info;
    };
    LockInfo.lockTimeout = 6;
    return LockInfo;
}());

cc._RF.pop();