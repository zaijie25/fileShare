
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/GameServer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXEdhbWVTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBQ3ZFLDREQUF1RDtBQUN2RCw4REFBeUQ7QUFDekQsa0VBQTZEO0FBRTdELGtFQUE2RDtBQUM3RCwwRUFBcUU7QUFFckUsaUVBQStEO0FBQy9ELDRDQUE0QztBQUM1Qyx1REFBa0Q7QUFFbEQsOEVBQTJGO0FBRTNGLElBQUssWUFLSjtBQUxELFdBQUssWUFBWTtJQUViLHlEQUFhLENBQUE7SUFDYixxRUFBbUIsQ0FBQTtJQUNuQixxREFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUxJLFlBQVksS0FBWixZQUFZLFFBS2hCO0FBR0Q7SUFBd0MsOEJBQWU7SUFBdkQ7UUFBQSxxRUE0M0JDO1FBaDNCVyxxQkFBZSxHQUFHLGVBQWUsQ0FBQztRQUNsQyxxQkFBZSxHQUFHLGNBQWMsQ0FBQztRQUNqQyxvQkFBYyxHQUFHLGlCQUFpQixDQUFDO1FBQ25DLHdCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLHdCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQzFDLHVCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBRXhDLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFFdkIsU0FBUztRQUNELFNBQUcsR0FBTyxFQUFFLENBQUM7UUFLYixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR3BCLE1BQU07UUFDRSxjQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUs7UUFDRyxjQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWYsZUFBUyxHQUFHLEtBQUssQ0FBQztRQUV6QixTQUFTO1FBQ0QsWUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWIsY0FBUSxHQUFnQixZQUFZLENBQUMsT0FBTyxDQUFDO1FBRXBELG1CQUFtQjtRQUNYLGlCQUFXLEdBQW9CLElBQUksa0NBQWUsRUFBRSxD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WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7WUFFakIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFkYSxvQkFBVyxHQUFHLENBQUMsQ0FBQztJQWdCbEMsZUFBQztDQWxCRCxBQWtCQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgU29ja2V0SGVscGVyIGZyb20gXCIuL3NlcnZlckhlbHBlci9Tb2NrZXRIZWxwZXJcIjtcclxuaW1wb3J0IEhhbmRsZXJIZWxwZXIgZnJvbSBcIi4vc2VydmVySGVscGVyL0hhbmRsZXJIZWxwZXJcIjtcclxuaW1wb3J0IEdhbWVFcnJvckhlbHBlciBmcm9tIFwiLi9zZXJ2ZXJIZWxwZXIvR2FtZUVycm9ySGVscGVyXCI7XHJcbmltcG9ydCBCYXNlU2VydmVySGVscGVyIGZyb20gXCIuL3NlcnZlckhlbHBlci9CYXNlU2VydmVySGVscGVyXCI7XHJcbmltcG9ydCBSZWNvbm5lY3RIZWxwZXIgZnJvbSBcIi4vc2VydmVySGVscGVyL1JlY29ubmVjdEhlbHBlclwiO1xyXG5pbXBvcnQgR2FtZUhlYXJ0QmVhdEhlbHBlciBmcm9tIFwiLi9zZXJ2ZXJIZWxwZXIvR2FtZUhlYXJ0QmVhdEhlbHBlclwiO1xyXG5pbXBvcnQgU2VydmVyUm91dGVzLCB7IFNlcnZlclJvdXRlSW5mbywgU2VydmVyVXJsIH0gZnJvbSBcIi4uL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcbmltcG9ydCB7IEhhbGxFcnJvckhlbHBlciB9IGZyb20gXCIuLi9uZXQvaGFsbC9IYWxsRXJyb3JIYW5kbGVyXCI7XHJcbi8vIGltcG9ydCAqIGFzIEJ5dGVCdWZmZXIgZnJvbSBcImJ5dGVidWZmZXJcIjtcclxuaW1wb3J0IENoZWNrSGVscGVyIGZyb20gXCIuLi9uZXQvaGFsbC9DaGVja0hlbHBlclwiO1xyXG5pbXBvcnQgR2FtZUNvbW1hbmQgZnJvbSBcIi4vQ29tbWFuZERlZmluZVwiO1xyXG5pbXBvcnQgQ2FsbGJhY2tIYW5kbGVySGVscGVyLCB7IENhbGxiYWNrSW5mbyB9IGZyb20gXCIuL3NlcnZlckhlbHBlci9DYWxsYmFja0hhbmRsZXJIZWxwZXJcIjtcclxuXHJcbmVudW0gTWVzc2FnZVN0YXRlXHJcbntcclxuICAgIElnbm9yZUFsbCA9IDAsICAgLy/lnKjmlLbliLDoh6rlt7FsZWF2ZSAg5Yiw5Y+R6YCBZW50ZXLkuYvpl7QgIOaUtuWIsOeahOWNj+iuruWFqOmDqOW/veeVpVxyXG4gICAgUGFzc1NTU0FuZEVudGVyID0gMSwgICAvL+WPquaOpeaUtnNzc++8iOato+W4uOa1geeoi++8ieWSjCAgICBlbnRlcu+8iOS4u+imgeWkhOeQhmVudGVy5aSx6LSl77yJIGFkZCB3YWl0X21hdGNoKHB2cOi/m+ahjOWJjeWMuemFjeeOqeWutilcclxuICAgIFBhc3NBbGwgPSAyLCAgICAvL+aOpeaUtuaJgOacieWNj+iurlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNlcnZlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxyXG57XHJcbiAgICAvL+e9kee7nOWGhemDqOS6i+S7tlxyXG4gICAgcHVibGljIHN0YXRpYyBFdmVudF9HYW1lU29ja2V0TXNnID0gXCJFdmVudF9HYW1lU29ja2V0TXNnXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEV2ZW50X0dhbWVTb2NrZXRPcGVuID0gXCJFdmVudF9HYW1lU29ja2V0T3BlblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFdmVudF9HYW1lU29ja2V0Q2xvc2UgPSBcIkV2ZW50X0dhbWVTb2NrZXRDbG9zZVwiO1xyXG4gICAgLy9Qcm90b2J1ZuWNj+iurlxyXG4gICAgcHVibGljIHN0YXRpYyBFdmVudF9HYW1lUEJTb2NrZXRNc2cgPSBcIkV2ZW50X0dhbWVQQlNvY2tldE1zZ1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFdmVudF9HYW1lU29ja2V0U3RhcnRDb25uZWN0ID0gXCJFdmVudF9HYW1lU29ja2V0U3RhcnRDb25uZWN0XCI7XHJcbiAgICAvL3NvY2vph43ov57or7fmsYJcclxuICAgIHB1YmxpYyBzdGF0aWMgRXZlbnRfR2FtZVNvY2tldENhbGxSZWNvbm5lY3QgPSBcIkV2ZW50X0dhbWVTb2NrZXRSZWNvbm5lY3RcIjtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUhlbHBlcktleSA9IFwiaGFuZGxlckhlbHBlclwiO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRIZWxwZXJLZXkgPSBcInNvY2tldEhlbHBlclwiO1xyXG4gICAgcHJpdmF0ZSBlcnJvckhlbHBlcktleSA9IFwiZ2FtZUVycm9ySGVscGVyXCI7XHJcbiAgICBwcml2YXRlIHJlY29ubmVjdEhlbHBlcktleSA9IFwicmVjb25uZWN0SGVscGVyS2V5XCI7XHJcbiAgICBwcml2YXRlIGhlYXJ0QmVhdEhlbHBlcktleSA9IFwiaGVhcnRiZWF0SGVscGVyS2V5XCI7XHJcbiAgICBwcml2YXRlIGNhbGxiYWNrSGVscGVyS2V5ID0gXCJjYWxsYmFja0hlbHBlcktleVwiO1xyXG5cclxuICAgIHByaXZhdGUgaGVscGVyTWFwID0ge307XHJcblxyXG4gICAgLy/mnI3liqHlmajkvb/nlKjmlbDmja5cclxuICAgIHByaXZhdGUgZHN0OmFueSA9IHt9O1xyXG5cclxuICAgIC8v5pyN5Yqh5Zmo5L2/55SoXHJcbiAgICBwcml2YXRlIG1vZDpzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja2VyID0gMDtcclxuXHJcblxyXG4gICAgLy/mtojmga/pmJ/liJdcclxuICAgIHByaXZhdGUgbXNnUXVldWUgPSBbXTtcclxuICAgIC8v6ZSB5YiX6KGoXHJcbiAgICBwcml2YXRlIGxvY2tMaXN0ID0gW107XHJcblxyXG4gICAgcHVibGljIGlzUnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6aqM6K+B5pWw5o2uXHJcbiAgICBwcml2YXRlIGxhc3RTTiA9IC0xO1xyXG5cclxuICAgIHB1YmxpYyBtc2dTdGF0ZTpNZXNzYWdlU3RhdGUgPSBNZXNzYWdlU3RhdGUuUGFzc0FsbDtcclxuXHJcbiAgICAvL+mAmueUqOWNj+iurumUmeivr+WkhOeQhiDvvIjkuJrliqHpgLvovpHplJnor6/vvIlcclxuICAgIHByaXZhdGUgZXJyb3JIZWxwZXI6IEhhbGxFcnJvckhlbHBlciA9IG5ldyBIYWxsRXJyb3JIZWxwZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgY2hlY2tIZWxwZXI6Q2hlY2tIZWxwZXIgPSBuZXcgQ2hlY2tIZWxwZXIoMik7XHJcblxyXG4gICAgcHVibGljIHNldHVwKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdEhlbHBlcih0aGlzLnNvY2tldEhlbHBlcktleSwgbmV3IFNvY2tldEhlbHBlcih0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RIZWxwZXIodGhpcy5oYW5kbGVIZWxwZXJLZXksIG5ldyBIYW5kbGVySGVscGVyKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdEhlbHBlcih0aGlzLmVycm9ySGVscGVyS2V5LCBuZXcgR2FtZUVycm9ySGVscGVyKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdEhlbHBlcih0aGlzLnJlY29ubmVjdEhlbHBlcktleSwgbmV3IFJlY29ubmVjdEhlbHBlcih0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RIZWxwZXIodGhpcy5oZWFydEJlYXRIZWxwZXJLZXksIG5ldyBHYW1lSGVhcnRCZWF0SGVscGVyKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdEhlbHBlcih0aGlzLmNhbGxiYWNrSGVscGVyS2V5LCBuZXcgQ2FsbGJhY2tIYW5kbGVySGVscGVyKHRoaXMpKTtcclxuICAgICAgICB0aGlzLm9uKEdhbWVTZXJ2ZXIuRXZlbnRfR2FtZVNvY2tldE1zZywgdGhpcywgdGhpcy5oYW5kbGVNc2cpO1xyXG4gICAgICAgIHRoaXMub24oR2FtZVNlcnZlci5FdmVudF9HYW1lUEJTb2NrZXRNc2csIHRoaXMsIHRoaXMuaGFuZGxlUGJNc2cpXHJcbiAgICAgICAgdGhpcy5vbihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRDYWxsUmVjb25uZWN0LCB0aGlzLCB0aGlzLmNsZWFyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ms6jlhozlrprliLbljY/orq7lpITnkIblh73mlbBcclxuICAgIHB1YmxpYyByZWdpc3RIYW5kbGVyKGtleTphbnksIGhhbmRsZXI6YW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5yZWdpc3RIYW5kbGVyKGtleSwgaGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj43ms6jlhozlrprliLbljY/orq7lpITnkIblh73mlbBcclxuICAgIHB1YmxpYyB1bnJlZ2lzdEhhbmRsZXIoa2V5OmFueSkge1xyXG4gICAgICAgIHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5yZW1vdmVIYW5kbGVyKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ms6jlhozpgJrnlKjplJnor6/lpITnkIblh73mlbBcclxuICAgIHB1YmxpYyByZWdpc3REZWZhdWx0SGFuZGxlcihrZXk6YW55LCBoYW5kbGVyOmFueSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxIYW5kbGVySGVscGVyPih0aGlzLmhhbmRsZUhlbHBlcktleSkucmVnaXN0RGVmYXVsdEhhbmRsZXIoa2V5LCBoYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+azqOWGjOWumuWItumUmeivr+WkhOeQhlxyXG4gICAgcHVibGljIHJlZ2lzdEVycm9ySGFuZGxlcihlcnJubzpudW1iZXIsIGhhbmRsZXI6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nZXRIZWxwZXI8R2FtZUVycm9ySGVscGVyPih0aGlzLmVycm9ySGVscGVyS2V5KS5yZWdpc3RFcnJvckhhbmRsZXIoZXJybm8sIGhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckhhbmRsZXJzKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxIYW5kbGVySGVscGVyPih0aGlzLmhhbmRsZUhlbHBlcktleSkuY2xlYXJIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVscGVyPENhbGxiYWNrSGFuZGxlckhlbHBlcj4odGhpcy5jYWxsYmFja0hlbHBlcktleSkuY2xlYXJDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuKClcclxuICAgIHtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfQURETUFOVUFMTE9DSywgdGhpcywgdGhpcy5hZGRNYW51YWxMb2NrKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIHRoaXMsIHRoaXMuYWRkVGltZUxvY2spO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9SRU1PVkVMT0NLLCB0aGlzLCB0aGlzLnJlbW92ZUxvY2spO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9VTlNIRklUX01TR0xJU1QsIHRoaXMsIHRoaXMudW5zaGZpdE1zZ0xpc3QpXHJcbiAgICAgICAgdGhpcy5jYWxsSGVscGVyKFwicnVuXCIpO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYWxsSGVscGVyKFwiY2xlYXJcIik7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmZBbGxCeUNhbGxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLmNoZWNrSGVscGVyLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5sYXN0U04gPSAtMTtcclxuICAgICAgICB0aGlzLm1zZ1N0YXRlID0gTWVzc2FnZVN0YXRlLlBhc3NBbGw7XHJcbiAgICAgICAgdGhpcy5tc2dRdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMubG9ja0xpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm1vZCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kc3QgPSB7fVxyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bnNoZml0TXNnTGlzdChtc2dMaXN0OmFueVtdKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG1zZ0xpc3QgPT0gbnVsbCB8fCBtc2dMaXN0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IG1zZ0xpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZihtc2dMaXN0W2ldLl9wYXJhbSA9PSBudWxsKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBtc2dMaXN0W2ldID0ge19wYXJhbTptc2dMaXN0W2ldfTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm1zZ1F1ZXVlLnVuc2hpZnQuYXBwbHkodGhpcy5tc2dRdWV1ZSwgbXNnTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BHYW1lKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9ja0xpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm1zZ1F1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy5sYXN0U04gPSAtMTtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxTb2NrZXRIZWxwZXI+KHRoaXMuc29ja2V0SGVscGVyS2V5KS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVscGVyPEdhbWVIZWFydEJlYXRIZWxwZXI+KHRoaXMuaGVhcnRCZWF0SGVscGVyS2V5KS5uZXRJbnRlcnZhbCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIEg5YaF5a655Li6anNvbuagvOW8j+eahFNvY2tldOa2iOaBr1xyXG4gICAgICogQHBhcmFtIGNtZCBcclxuICAgICAqIEBwYXJhbSBwYXlsb2FkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZChjbWQ6c3RyaW5nLCBwYXJhbT86YW55KVxyXG4gICAge1xyXG4gICAgICAgIHBhcmFtID0gcGFyYW0gfHwge31cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0U2VuZFBhcmFtKGNtZCk7XHJcbiAgICAgICAgZGF0YS5fcGFyYW0uX3BhcmEgPSBwYXJhbTtcclxuICAgICAgICBkYXRhLl9mdW5jID0gY21kOyAgICAgICAgICAgLy8g5pyN5Yqh5Zmo6KaB5rGCIOawtOaenOacuumcgOimgeWKoOS4iiwg5bCx57uf5LiA5Yqg5LiKXHJcbiAgICAgICAgdGhpcy5zZW5kRGlyZWN0KGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB5Zue6LCD5pa55byP55qEc29ja2V06K+35rGCXHJcbiAgICAgKiBAcGFyYW0gY21kIOWNj+iuruWQjVxyXG4gICAgICogQHBhcmFtIHBhcmFtIOWPguaVsFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVycm9yQ2FsbGJhY2sg6ZSZ6K+v5pe25Zue6LCDLCDkvKDnqbrooajnpLrkvb/nlKjpgJrnlKjlpITnkIZcclxuICAgICAqIEBwYXJhbSBsaXZpbmdUaW1lIOeUn+WtmOaXtumVv3MgLTHooajkuI3pmZDnlJ/lkb3lkajmnJ9cclxuICAgICAqIEBwYXJhbSBpblF1ZXVlIOaYr+WQpui1sOmYn+WIl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZFdpdGhDYWxsYmFjayhjbWQ6c3RyaW5nLCBwYXJhbT86YW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBlcnJvckNhbGxiYWNrPzogYW55LCBsaXZpbmdUaW1lID0gLTEsIGluUXVldWUgPSB0cnVlKXtcclxuICAgICAgICBwYXJhbSA9IHBhcmFtIHx8IHt9O1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRTZW5kUGFyYW0oY21kKTtcclxuICAgICAgICBkYXRhLl9wYXJhbS5fcGFyYSA9IHBhcmFtO1xyXG4gICAgICAgIGRhdGEuX2Z1bmMgPSBjbWQ7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gZGF0YS5fY2hlY2s7XHJcblxyXG4gICAgICAgIGxldCBjYWxsYmFja0luZm86IENhbGxiYWNrSW5mbyA9IHtcclxuICAgICAgICAgICAga2V5OiBjaGVjayxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxyXG4gICAgICAgICAgICBpblF1ZXVlOiBpblF1ZXVlLFxyXG4gICAgICAgICAgICBsaXZlOiBsaXZpbmdUaW1lLFxyXG4gICAgICAgICAgICBjbWQ6IGNtZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxDYWxsYmFja0hhbmRsZXJIZWxwZXI+KHRoaXMuY2FsbGJhY2tIZWxwZXJLZXkpLnJlZ2lzdENhbGxiYWNrKGNoZWNrLCBjYWxsYmFja0luZm8pO1xyXG4gICAgICAgIHRoaXMuc2VuZERpcmVjdChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgSDlhoXlrrnkuLpwcm90b2J1ZmZlcuagvOW8j+eahFNvY2tldOa2iOaBr1xyXG4gICAgICogQHBhcmFtIGNtZCBcclxuICAgICAqIEBwYXJhbSBwYXlsb2FkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZFBiKGNtZCwgcGF5bG9hZD86VWludDhBcnJheSlcclxuICAgIHtcclxuICAgICAgICBpZiAoY21kLmluZGV4T2YoXCIqZ2FtZSpfXCIpID09IDApIHtcclxuICAgICAgICAgICAgY21kID0gY21kLnJlcGxhY2UoXCIqZ2FtZSpfXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjbWQgPSBOdW1iZXIoY21kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRIZWxwZXI8U29ja2V0SGVscGVyPih0aGlzLnNvY2tldEhlbHBlcktleSkuc2VuZEJ1ZmZlcihjbWQsIHBheWxvYWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIEg5YaF5a655Li6anNvbuagvOW8j+eahEh0dHDor7fmsYJcclxuICAgICAqIEBwYXJhbSBtb2QgZ2FtZUdhbWVSb3V0Zei/lOWbnueahG1vZFxyXG4gICAgICogQHBhcmFtIGNtZCDljY/orq7mlrnms5XlkI1cclxuICAgICAqIEBwYXJhbSBwYXJhbSBcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZSBcclxuICAgICAqIEBwYXJhbSBvbkVycm9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEh0dHAobW9kOnN0cmluZywgY21kOnN0cmluZywgcGFyYW0/OmFueSwgY29tcGxldGU/LCBvbkVycm9yPykge1xyXG4gICAgICAgIHBhcmFtID0gcGFyYW0gfHwge307XHJcblxyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmdhbWVSb3V0ZXNcclxuICAgICAgICBpZihzZXJ2ZXJSb3V0ZXMgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdhbWVSb3V0ZXMgaXMgbnVsbCDlhYjor7fmsYJHZXRHYW1lUm91dGVcIik7XHJcbiAgICAgICAgICAgIHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlcnJvckhhbmRsZXIgPSAobmV0T2JqOmFueSk9PntcclxuICAgICAgICAgICAgaWYob25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvcihuZXRPYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/ljY/orq7pooTlpITnkIZcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5nZXRIZWxwZXI8SGFuZGxlckhlbHBlcj4odGhpcy5oYW5kbGVIZWxwZXJLZXkpLmdldEhhbmRsZXIoXCIqZ2FtZSpfNDA0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5p6E5bu65raI5oGv57uT5p6EXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ1BhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY21kOiBcIipnYW1lKl80MDRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlY2VpdmVUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFyYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyTm86IG5ldE9iai5fZXJybm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJTdHI6IG5ldE9iai5fZXJyc3RyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRXh0OiBuZXRPYmouX2VycmV4dCB8fCBjbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuSGFuZGxlKG1zZ1BhcmFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZW5kV2l0aFNlcnZlclJvdXRlQW5kTW9kKHNlcnZlclJvdXRlcy5nZXRSYW5kUm91dGUoKSwgbW9kLCBjbWQsIHBhcmFtLCBjb21wbGV0ZSwgZXJyb3JIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgSDlhoXlrrnkuLpwcm90b2J1ZmZlcuagvOW8j+eahEh0dHDor7fmsYJcclxuICAgICAqIEBwYXJhbSBtb2QgZ2FtZUdhbWVSb3V0Zei/lOWbnueahG1vZFxyXG4gICAgICogQHBhcmFtIGNtZCDljY/orq7mlrnms5XlkI1cclxuICAgICAqIEBwYXJhbSBwYXJhbSBcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZSBcclxuICAgICAqIEBwYXJhbSBvbkVycm9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZEh0dHBQYihtb2Q6c3RyaW5nLCBjbWQ6c3RyaW5nLCBidWZmZXI/OlVpbnQ4QXJyYXksIGNvbXBsZXRlPywgb25FcnJvcj8pIHtcclxuICAgICAgICBsZXQgY21kSWQ6bnVtYmVyID0gMDtcclxuICAgICAgICBpZiAoY21kLmluZGV4T2YoXCIqZ2FtZSpfXCIpID09IDApIHtcclxuICAgICAgICAgICAgbGV0IG51bSA9IGNtZC5yZXBsYWNlKFwiKmdhbWUqX1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgY21kSWQgPSBOdW1iZXIobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNtZElkID0gTnVtYmVyKGNtZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFjbWRJZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzZW5kSHR0cFBiKCkgY21kIOagvOW8j+mUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNpemUgPSBidWZmZXIgPyBidWZmZXIubGVuZ3RoIDogMDtcclxuICAgICAgICBzaXplICs9IDQ7XHJcbiAgICAgICAgbGV0IGJiID0gQnl0ZUJ1ZmZlci5hbGxvY2F0ZShzaXplLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGJiLndyaXRlVWludDMyKGNtZElkLCAwKTtcclxuICAgICAgICBpZiAoYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIGJiLmFwcGVuZChidWZmZXIsIDQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZVJvdXRlc1xyXG4gICAgICAgIGlmKHNlcnZlclJvdXRlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdhbWVSb3V0ZXMgaXMgbnVsbCDlhYjor7fmsYJHZXRHYW1lUm91dGVcIik7XHJcbiAgICAgICAgICAgIHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlcnJvckhhbmRsZXIgPSAobmV0T2JqOmFueSk9PntcclxuICAgICAgICAgICAgaWYob25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/ljY/orq7pooTlpITnkIZcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5nZXRIZWxwZXI8SGFuZGxlckhlbHBlcj4odGhpcy5oYW5kbGVIZWxwZXJLZXkpLmdldEhhbmRsZXIoXCIqZ2FtZSpfNDA0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YeN5paw5p6E5bu65raI5oGv57uT5p6EXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ1BhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY21kOiBcIipnYW1lKl80MDRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlY2VpdmVUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFyYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyTm86IG5ldE9iai5fZXJybm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJTdHI6IG5ldE9iai5fZXJyc3RyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRXh0OiBuZXRPYmouX2VycmV4dCB8fCBjbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuSGFuZGxlKG1zZ1BhcmFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZFdpdGhTZXJ2ZXJSb3V0ZUFuZE1vZChzZXJ2ZXJSb3V0ZXMuZ2V0UmFuZFJvdXRlKCksIG1vZCwgY21kLCBidWZmZXIsIGNvbXBsZXRlLCBlcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIGJiLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5zZXJ2ZXJSb3V0ZSBtb2QgIOWPkemAgWh0dHDljY/orq7vvIzkuLvopoHnlKjkuo7mi4nmiornsbvljY/orq7or7fmsYJcclxuICAgICAqIEBwYXJhbSBzZXJ2ZXJSb3V0ZSDmnI3liqHlmajov5Tlm57nmoTmnI3liqHlmajlnLDlnYDkv6Hmga9cclxuICAgICAqIEBwYXJhbSBtb2Qg5pyN5Yqh5Zmo6Lev55SxXHJcbiAgICAgKiBAcGFyYW0gY21kIOWNj+iuruaWueazleWQjVxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGUgXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbmRXaXRoU2VydmVyUm91dGVBbmRNb2Qoc2VydmVyUm91dGU6U2VydmVyUm91dGVJbmZvLCBtb2Q6c3RyaW5nLCBjbWQ6c3RyaW5nLCBwYXJhbTphbnksIGNvbXBsZXRlPywgb25FcnJvcj8pIHtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gc2VydmVyUm91dGUuZ2V0SHR0cFVybFdpdGhNb2QobW9kKTtcclxuICAgICAgICBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IFwiP19mdW5jPVwiICsgY21kICsgXCImXCIgKyB1cmxQYXJhbVxyXG4gICAgICAgIGxldCBzZW5kUGFyYW06YW55ID0ge31cclxuICAgICAgICBzZW5kUGFyYW0uX3BhcmFtID0gcGFyYW07XHJcbiAgICAgICAgc2VydmVyVXJsLnN1ZmZpeCA9IHNlcnZlclVybC5zdWZmaXggKyBzdWZmaXhcclxuICAgICAgICB0aGlzLnNlbmRXaXRoVXJsKHNlcnZlclVybCwgc2VuZFBhcmFtLCBjb21wbGV0ZSwgb25FcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4d1cmzmlrnlvI/lj5HpgIFodHRw6K+35rGCXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIHBhcmFtIFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIFxyXG4gICAgICogQHBhcmFtIG9uRXJyb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kV2l0aFVybChzZXJ2ZXJVcmw6U2VydmVyVXJsLCBwYXJhbTphbnksIGNvbXBsZXRlPzpGdW5jdGlvbiwgb25FcnJvcj86RnVuY3Rpb24pIHtcclxuICAgICAgICBHbG9iYWwuSHR0cC5zZW5kKHNlcnZlclVybCwgcGFyYW0sIChtc2c6YW55KT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlb2YobXNnKSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV0T2JqID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV0T2JqID0gSlNPTi5wYXJzZShtc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuino+aekOWNj+iuruWksei0pVwiLCBtc2csIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+a2iOaBr+aJk+WNsFxyXG4gICAgICAgICAgICAgICAgaWYobmV0T2JqLl9mdW5jICE9IEdhbWUuQ29tbWFuZC5IZWFydEJlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiSHR0cE1zZzpcIiwgbXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL+ivpeWNj+iuruWPquWcqOa4uOaIj+S4reS9v+eUqFxyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzlnKhOb0lnbm9yZVdoZW5DaGFuZ2VTY2VuZUxpc3Qg5YiZ5b+955WlXHJcbiAgICAgICAgICAgICAgICBpZighR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnYW1lc2VydmVyIGh0dHDljY/orq7ot6jlnLrmma/vvIzkuKLlvINcIiwgc2VydmVyVXJsLmdldFVybCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy/lpITnkIbplJnor69cclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmVycm9ySGVscGVyLmhhbmRsZUVycm9yKG5ldE9iaiwgb25FcnJvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXRPYmouX2Vycm5vICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNtZDpzdHJpbmcgPSBcIipnYW1lKl80MDRcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y2P6K6u6aKE5aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5nZXRIZWxwZXI8SGFuZGxlckhlbHBlcj4odGhpcy5oYW5kbGVIZWxwZXJLZXkpLmdldEhhbmRsZXIoY21kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDmnoTlu7rmtojmga/nu5PmnoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dQYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY21kOiBjbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlY2VpdmVUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wYXJhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyck5vOiBuZXRPYmouX2Vycm5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJTdHI6IG5ldE9iai5fZXJyc3RyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJFeHQ6IG5ldE9iai5fZXJyZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLkhhbmRsZShtc2dQYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUobmV0T2JqLl9wYXJhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY21kOnN0cmluZyA9IG5ldE9iai5fZnVuYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/ljY/orq7pooTlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5nZXRIYW5kbGVyKGNtZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOaehOW7uua2iOaBr+e7k+aehFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY21kOiBjbWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVjZWl2ZVRpbWU6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGFyYTogbmV0T2JqLl9wYXJhbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLkhhbmRsZShtc2dQYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvL+Wkp+Wtl+iKguW6j+ivu+WPlmNvbW1hbmRcclxuICAgICAgICAgICAgICAgIGxldCBjb21tYW5kID0gQnl0ZUJ1ZmZlci53cmFwKGJ1ZmZlci5zbGljZSgwLCA0KSwgZmFsc2UpLnJlYWRVaW50MzIoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyYURhdGEgPSBidWZmZXIuc2xpY2UoNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNtZCA9IFwiKmdhbWUqX1wiICsgY29tbWFuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUGJNc2coY21kLCBwYXJhRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIChtc2c6YW55KT0+e1xyXG5cclxuICAgICAgICAgICAgLy/or6XljY/orq7lj6rlnKjmuLjmiI/kuK3kvb/nlKhcclxuICAgICAgICAgICAgLy/lpoLmnpzlnKhOb0lnbm9yZVdoZW5DaGFuZ2VTY2VuZUxpc3Qg5YiZ5b+955WlXHJcbiAgICAgICAgICAgIGlmKCFHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnYW1lc2VydmVyIGh0dHDljY/orq7ot6jlnLrmma/vvIzkuKLlvINcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1cmw6c3RyaW5nID0gbXNnIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBmdW5jTmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSB1cmwuaW5kZXhPZihcIl9mdW5jPVwiKTtcclxuICAgICAgICAgICAgaWYoc3RhcnQgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmQgPSB1cmwuaW5kZXhPZihcIiZcIiwgc3RhcnQgKyA2KTtcclxuICAgICAgICAgICAgICAgIGlmKGVuZCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lID0gdXJsLnN1YnN0cmluZyhzdGFydCArIDYsIGVuZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/ljY/orq7lj5HpgIHlpLHotKXlpITnkIZcclxuICAgICAgICAgICAgaWYob25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvcih7X2Vycm5vOi0xLCBfZXJyc3RyOlwi572R57uc6L+e5o6l6LaF5pe277yM6K+35qOA5p+l5ZCO6YeN6K+VXCIsIF9lcnJleHQ6ZnVuY05hbWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5aSE55CG6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICBsZXQgY21kOnN0cmluZyA9IFwiKmdhbWUqXzQwNFwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5Y2P6K6u6aKE5aSE55CGXHJcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5nZXRIYW5kbGVyKGNtZCk7XHJcbiAgICAgICAgICAgICAgICBpZihoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ph43mlrDmnoTlu7rmtojmga/nu5PmnoRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jbWQ6IGNtZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlY2VpdmVUaW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcGFyYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyTm86IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyU3RyOiBcIue9kee7nOi/nuaOpeW8guW4uO+8jOivt+ajgOafpeWQjumHjeivlVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRXh0OiBmdW5jTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5IYW5kbGUobXNnUGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RHN0KGd0LCBjaGFpcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRzdC5fZ3QgPSBndDtcclxuICAgICAgICB0aGlzLmRzdC5fY2hhaXIgPSBjaGFpcjtcclxuICAgICAgICAvLyB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuc2V0RHN0KGd0LCBjaGFpcilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJEc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZHN0ID0ge31cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFzc0FsbCgpXHJcbiAgICB7dGhpcy5tc2dTdGF0ZSA9IE1lc3NhZ2VTdGF0ZS5QYXNzQWxsO31cclxuXHJcbiAgICBwdWJsaWMgaWdub3JlQWxsKClcclxuICAgIHt0aGlzLm1zZ1N0YXRlID0gTWVzc2FnZVN0YXRlLklnbm9yZUFsbDt9XHJcblxyXG4gICAgcHVibGljIHBhc3NTU1NBbmRFbnRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tc2dTdGF0ZSA9IE1lc3NhZ2VTdGF0ZS5QYXNzU1NTQW5kRW50ZXI7XHJcbiAgICAgICAgdGhpcy5sYXN0U04gPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZERpcmVjdChwYXJhbSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxTb2NrZXRIZWxwZXI+KHRoaXMuc29ja2V0SGVscGVyS2V5KS5zZW5kKHBhcmFtKTtcclxuXHJcbiAgICAgICAgaWYocGFyYW0gPT0gbnVsbCB8fCBwYXJhbS5fcGFyYW0gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGtleSA9IEdsb2JhbC5SZXBvcnRUb29sLmdlbkdhbWVLZXkoXCJzZW5kXCIpO1xyXG4gICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydFB1YmxpY0RlYnVnTG9nKGtleSwgcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kSGVhcnRCZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuc3RhcnRIZWFydGJlYXQoKTtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuc2VuZEhlYXJ0QmVhdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wSGVhcnRCZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuc3RvcEhlYXJ0QmVhdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZW5kUGFyYW0oY21kKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB7fVxyXG4gICAgICAgIGRhdGEuX2RzdCA9IHRoaXMuZHN0O1xyXG4gICAgICAgIGRhdGEuX3BhcmFtID0ge31cclxuICAgICAgICBkYXRhLl9wYXJhbS5fY21kID0gY21kO1xyXG4gICAgICAgIGRhdGEuX21vZCA9IHRoaXMubW9kO1xyXG4gICAgICAgIHRoaXMuY2hlY2tIZWxwZXIudXBkYXRlQ2hlY2tlcigpO1xyXG4gICAgICAgIGlmKGNtZCA9PSBHYW1lLkNvbW1hbmQuSGVhcnRCZWF0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0hlbHBlci5yZWNvcmRIZWFydGJlYXQoKTtcclxuICAgICAgICAgICAgZGF0YS5fY2hlY2sgPSB0aGlzLmNoZWNrSGVscGVyLmdldEhlYXJ0QmVhdENoZWNrZXIodGhpcy5sYXN0U04pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhLl9jaGVjayA9IHRoaXMuY2hlY2tIZWxwZXIuZ2V0Tm9tYWxDaGVja2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2tlcigpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ2hlY2tlcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGVja2VyKys7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja2VyID4gMTAwMDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VyID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pk77mjqXmnI3liqHlmahcclxuICAgIC8vc2VydmVySW5mbyAg5pyN5Yqh5Zmo6YWN572u5L+h5oGvICDlhbzlrrnljZXpk77mjqUg5ZKM5aSa6ZO+5o6lXHJcbiAgICBwdWJsaWMgY29ubmVjdChzZXJ2ZXJJbmZvOlNlcnZlclJvdXRlSW5mbywgbW9kOnN0cmluZywgcGJtb2RlID0gZmFsc2UsIHVzZUZ1bmMgPSB0cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIlwiO1xyXG4gICAgICAgIC8vIGlmKHBibW9kZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgbGV0IHNlcnZlclVybCAgPSBzZXJ2ZXJJbmZvLmdldFBiU29ja2V0VXJsKG1vZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHVybCA9IHNlcnZlckluZm8uZ2V0U29ja2V0VXJsKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubW9kID0gbW9kO1xyXG5cclxuICAgICAgICBsZXQgc3VmZml4ID0gdGhpcy5nZXRTb2NrZXRTdWZmaXgodXNlRnVuYyk7XHJcbiAgICAgICAgc2VydmVyVXJsLnN1ZmZpeCA9IHNlcnZlclVybC5zdWZmaXggKyBzdWZmaXg7XHJcbiAgICAgICAgdXJsID0gR2xvYmFsLlVybFV0aWwuZGVhbFdlYlNvY2tldFVybChzZXJ2ZXJVcmwpXHJcbiAgICAgICAgbGV0IGNlclBhdGggPSBzZXJ2ZXJVcmwuY2VyUGF0aFxyXG4gICAgICAgIC8vIHVybCA9IHRoaXMuZ2V0U29ja2V0VXJsKHVybCwgcGJtb2RlKTtcclxuICAgICAgICAvL3VybCA9IHRoaXMuZ2V0U29ja2V0VXJsKHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5nZXRIZWxwZXI8U29ja2V0SGVscGVyPih0aGlzLnNvY2tldEhlbHBlcktleSkuY29ubmVjdCh1cmwsIHNlcnZlckluZm8sIHBibW9kZSwgdGhpcy5tb2QsIHN1ZmZpeCxjZXJQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW/g+i3s+e9kee7nOW7tuaXtlxyXG4gICAgcHVibGljIGdldE5ldENvc3QoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrSGVscGVyKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0hlbHBlci5nZXROZXRDb3N0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjYWxsSGVscGVyKGZ1bmNOYW1lLCBwYXJhbT8pXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5oZWxwZXJNYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmhlbHBlck1hcFtrZXldW2Z1bmNOYW1lXSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVscGVyTWFwW2tleV1bZnVuY05hbWVdKHBhcmFtKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U29ja2V0VXJsKHVybDpTZXJ2ZXJVcmwsIHVzZUZ1bmMgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgdXJsLnN1ZmZpeCA9IHVybC5zdWZmaXggKyBcIj9cIisgdXJsUGFyYW1cclxuICAgICAgICBpZih1c2VGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXJsLnN1ZmZpeCArPSBcIiZfZnVuYz1ldmVudFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTb2NrZXRTdWZmaXgodXNlRnVuYyA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxQYXJhbSA9IEdsb2JhbC5VcmxVdGlsLmdldFVybENvbW1vblBhcmFtKClcclxuICAgICAgICBsZXQgc3VmZml4ID0gXCI/XCIgKyB1cmxQYXJhbVxyXG4gICAgICAgIGlmKHVzZUZ1bmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdWZmaXggKz0gXCImX2Z1bmM9ZXZlbnRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1ZmZpeDtcclxuICAgIH1cclxuXHJcbiBcclxuICAgIHByaXZhdGUgcmVnaXN0SGVscGVyKGtleTpzdHJpbmcsIGhlbHBlcjpCYXNlU2VydmVySGVscGVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaGVscGVyTWFwW2tleV0gIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumHjeWkjeazqOWGjGhlbHBlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZWxwZXJNYXBba2V5XSA9IGhlbHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEhlbHBlcjxUIGV4dGVuZHMgQmFzZVNlcnZlckhlbHBlcj4oa2V5KTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaGVscGVyTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlbHBlck1hcFtrZXldIGFzIFQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGVhckRhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubXNnUXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLmxvY2tMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sYXN0U04gPSAtMTtcclxuICAgICAgICB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuc3RvcEhlYXJ0QmVhdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUGJNc2coY21kLCBuZXREYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBfY2hlY2sgPSBuZXREYXRhLl9jaGVjaztcclxuICAgICAgICBsZXQgY2FsbGJhY2tJbmZvID0gdGhpcy5nZXRIZWxwZXI8Q2FsbGJhY2tIYW5kbGVySGVscGVyPih0aGlzLmNhbGxiYWNrSGVscGVyS2V5KS5nZXRDYWxsYmFjayhfY2hlY2spO1xyXG4gICAgICAgIGlmIChjYWxsYmFja0luZm8pe1xyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2s6IGFueSA9IGNhbGxiYWNrSW5mby5jYWxsYmFjaztcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2sgJiYgY2FsbGJhY2suZGVjb2RlUGIpICAgICAgIC8vIOaVsOaNruagvOW8j+i/mOaciemXrumimCwg5pyq5L2/55So6aqM6K+B5YWI5rOo6YeKXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwYXJhID0gY2FsbGJhY2suZGVjb2RlUGIobmV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyAvL+WmguaenOaYr+mUmeivr+WRveS7pCDmnInlj6/og73kvJrov5Tlm57nqbpcclxuICAgICAgICAgICAgICAgIC8vIGlmKHBhcmEgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcGFja0RhdGE6YW55ID0ge31cclxuICAgICAgICAgICAgICAgIC8vIHBhY2tEYXRhLl9jbWQgPSBjbWQ7XHJcbiAgICAgICAgICAgICAgICAvLyBwYWNrRGF0YS5fcGFyYSA9IHBhcmE7XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIubG9nKFwicmVjZWl2ZSBQYk1zZzogXCIgKyBKU09OLnN0cmluZ2lmeShwYWNrRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoY2FsbGJhY2tJbmZvLmluUXVldWUpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5tc2dRdWV1ZS5wdXNoKHBhY2tEYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY2FsbGJhY2socGFja0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2V0SGVscGVyPENhbGxiYWNrSGFuZGxlckhlbHBlcj4odGhpcy5jYWxsYmFja0hlbHBlcktleSkucmVtb3ZlQ2FsbGJhY2soX2NoZWNrKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5nZXRIYW5kbGVyKGNtZCk7XHJcbiAgICAgICAgICAgIGlmKGhhbmRsZXIgJiYgaGFuZGxlci5kZWNvZGVQYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmEgPSBoYW5kbGVyLmRlY29kZVBiKG5ldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/plJnor6/lkb3ku6Qg5pyJ5Y+v6IO95Lya6L+U5Zue56m6XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhY2tEYXRhOmFueSA9IHt9XHJcbiAgICAgICAgICAgICAgICBwYWNrRGF0YS5fY21kID0gY21kO1xyXG4gICAgICAgICAgICAgICAgcGFja0RhdGEuX3BhcmEgPSBwYXJhO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcInJlY2VpdmUgUGJNc2c6IFwiICsgSlNPTi5zdHJpbmdpZnkocGFja0RhdGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihoYW5kbGVyLmNoZWNrSW5RdWV1ZSAmJiBoYW5kbGVyLmNoZWNrSW5RdWV1ZShwYWNrRGF0YSkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tc2dRdWV1ZS5wdXNoKHBhY2tEYXRhKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLkhhbmRsZShwYWNrRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJNc2cobmV0RGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihuZXREYXRhID09IG51bGwgfHwgbmV0RGF0YS5fcGFyYW0gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8v6L+H5ruk5YWo6YOo5Y2P6K6uXHJcbiAgICAgICAgaWYodGhpcy5tc2dTdGF0ZSA9PSBNZXNzYWdlU3RhdGUuSWdub3JlQWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy/pmaTkuoZzZXNzaW9u5ZKMZW50ZXIg5YWo6YOo6L+H5rukXHJcbiAgICAgICAgaWYodGhpcy5tc2dTdGF0ZSA9PSBNZXNzYWdlU3RhdGUuUGFzc1NTU0FuZEVudGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gaWYobmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gbmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBHYW1lLkNvbW1hbmQuU2Vzc2lvbiB8fCBuZXREYXRhLl9wYXJhbS5fY21kID09IEdhbWUuQ29tbWFuZC5FbnRlcjtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldERhdGEuX3BhcmFtLl9jbWQgPT0gR2FtZS5Db21tYW5kLlNlc3Npb24gfHwgbmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBHYW1lLkNvbW1hbmQuRW50ZXIgfHwgbmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBHYW1lLkNvbW1hbmQuV2FpdE1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU1zZyhuZXREYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmZpbHRlck1zZyhuZXREYXRhKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImZpbHRlciBtc2dcIiwgSlNPTi5zdHJpbmdpZnkobmV0RGF0YSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ldERhdGEgPT0gbnVsbCB8fCBuZXREYXRhID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJuZXREYXRhID09IG51bGzvvIHvvIHvvIHvvIHvvIHvvIHvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJlSGFuZGxlTXNnKG5ldERhdGEpO1xyXG5cclxuICAgICAgICBsZXQgX2NoZWNrID0gbmV0RGF0YS5fY2hlY2s7XHJcbiAgICAgICAgbGV0IGNhbGxiYWNrSW5mbyA9IHRoaXMuZ2V0SGVscGVyPENhbGxiYWNrSGFuZGxlckhlbHBlcj4odGhpcy5jYWxsYmFja0hlbHBlcktleSkuZ2V0Q2FsbGJhY2soX2NoZWNrKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2tJbmZvICYmIGNhbGxiYWNrSW5mby5lcnJvckNhbGxiYWNrICYmIG5ldERhdGEuX3BhcmFtICYmIG5ldERhdGEuX3BhcmFtLl9lcnJubyl7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mby5lcnJvckNhbGxiYWNrKG5ldERhdGEuX3BhcmFtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVycm9ySGVscGVyID0gdGhpcy5nZXRIZWxwZXI8R2FtZUVycm9ySGVscGVyPih0aGlzLmVycm9ySGVscGVyS2V5KTtcclxuXHJcbiAgICAgICAgaWYoIWVycm9ySGVscGVyLmhhbmRsZVN5c0Vycm9yKG5ldERhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8v5qOA5p+lc24gIFxyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrU04obmV0RGF0YSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTTiA9IC0xO1xyXG4gICAgICAgICAgICAvL3Nu6aqM6K+B5LiN6YCa6L+H6ZyA6KaB5by65Yi26YeN6L+eXHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9DQUxMX1JFQ09OTkVDVCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFlcnJvckhlbHBlci5oYW5kbGVDbWRFcnJvcihuZXREYXRhKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFlcnJvckhlbHBlci5oYW5kbGVMb2dpY0Vycm9yKG5ldERhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBjbWQgPSBuZXREYXRhLl9wYXJhbS5fY21kXHJcblxyXG5cclxuICAgICAgICAvL+W/g+i3s+mAu+i+keWkhOeQhlxyXG4gICAgICAgIGlmKGNtZCA9PSBHYW1lLkNvbW1hbmQuSGVhcnRCZWF0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IEdsb2JhbC5SZXBvcnRUb29sLmdlbkdhbWVLZXkoXCJyZWN2X2hlMVwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0UHVibGljRGVidWdMb2coa2V5LCBuZXREYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tIZWxwZXIucmVmcmVzaENvc3RUaW1lKG5ldERhdGEuX2NoZWNrKVxyXG4gICAgICAgICAgICB0aGlzLmdldEhlbHBlcjxHYW1lSGVhcnRCZWF0SGVscGVyPih0aGlzLmhlYXJ0QmVhdEhlbHBlcktleSkuSGFuZGxlSGVhcnRCZWF0KG5ldERhdGEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlcnZlclRpbWUgPSBuZXREYXRhLl9wYXJhbS5fdGltZXM7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJUaW1lKVxyXG4gICAgICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuZG9DaGVja2VyKHNlcnZlclRpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5ID0gR2xvYmFsLlJlcG9ydFRvb2wuZ2VuR2FtZUtleShcInJlY3ZcIik7XHJcbiAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0UHVibGljRGVidWdMb2coa2V5LCBuZXREYXRhKTtcclxuXHJcbiAgICAgICAgbmV0RGF0YS5fcGFyYW0uX3JlY2VpdmVUaW1lID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgLy/ljY/orq7pooTlpITnkIZcclxuICAgICAgICBpZiAoY2FsbGJhY2tJbmZvKXsgICAgICAgICAgLy8g5Zue6LCD5pa55byP5aSE55CGXHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrSW5mby5pblF1ZXVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tc2dRdWV1ZS5wdXNoKG5ldERhdGEpO1xyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tJbmZvLmNhbGxiYWNrKG5ldERhdGEuX3BhcmFtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SGVscGVyPENhbGxiYWNrSGFuZGxlckhlbHBlcj4odGhpcy5jYWxsYmFja0hlbHBlcktleSkucmVtb3ZlQ2FsbGJhY2soX2NoZWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAgICAgICAgICAgLy8g5raI5oGv5pa55byP5aSE55CGXHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5nZXRIZWxwZXI8SGFuZGxlckhlbHBlcj4odGhpcy5oYW5kbGVIZWxwZXJLZXkpLmdldEhhbmRsZXIoY21kKTtcclxuICAgICAgICAgICAgaWYoaGFuZGxlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlci5jaGVja0luUXVldWUgJiYgaGFuZGxlci5jaGVja0luUXVldWUobmV0RGF0YS5fcGFyYW0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXNnUXVldWUucHVzaChuZXREYXRhLl9wYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5IYW5kbGUobmV0RGF0YS5fcGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlSGFuZGxlTXNnKG5ldERhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgLy/mlLbliLBlbnRlcuWSjHNlc3Npb27lkI4g5Y2P6K6u5q2j5bi45o6l5pS2ICAg6L+Z6YeM5LiN5qOA5p+l6ZSZ6K+v77yM6ZSZ6K+v5aSE55CG5pS+5Yiw5ZCO6Z2i5aSE55CGICBhZGQgcHZw5Yy56YWN5Y2P6K6uXHJcbiAgICAgICAgaWYobmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBHYW1lLkNvbW1hbmQuRW50ZXIgfHwgbmV0RGF0YS5fcGFyYW0uX2NtZCA9PSBHYW1lLkNvbW1hbmQuU2Vzc2lvbiB8fCBuZXREYXRhLl9wYXJhbS5fY21kID09IEdhbWUuQ29tbWFuZC5XYWl0TWF0Y2gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhc3NBbGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihuZXREYXRhLl9wYXJhbS5fY21kID09IEdhbWUuQ29tbWFuZC5MZWF2ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pS25Yiw6Ieq5bexbGVhdmUg5bm25LiUIOayoeaciemUmeivryDliJnkuI3mjqXlj5flkI7nu63ljY/orq7vvIzpnIDopoHnrYnkuIvmrKFlbnRlclxyXG4gICAgICAgICAgICBpZihHYW1lLkNvbnRleHQgJiYgR2FtZS5Db250ZXh0LnNlbGZTcmNcclxuICAgICAgICAgICAgICAgICYmIEdhbWUuQ29udGV4dC5zZWxmU3JjID09IG5ldERhdGEuX3BhcmFtLl9zcmNcclxuICAgICAgICAgICAgICAgICYmIChuZXREYXRhLl9wYXJhbS5fZXJybm8gPT0gbnVsbCB8fCBuZXREYXRhLl9wYXJhbS5fZXJybm8gPT0gMCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlnbm9yZUFsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hlY2tIZWxwZXIub25VcGRhdGUoZHQpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzUnVubmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2FsbEhlbHBlcihcIm9uVXBkYXRlXCIsIGR0KVxyXG4gICAgICAgIHRoaXMudXBkYXRlTG9jayhkdCk7XHJcbiAgICAgICAgd2hpbGUodGhpcy5tc2dRdWV1ZS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5oYXNMb2NrKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLm1zZ1F1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFja0luZm8gPSB0aGlzLmdldEhlbHBlcjxDYWxsYmFja0hhbmRsZXJIZWxwZXI+KHRoaXMuY2FsbGJhY2tIZWxwZXJLZXkpLmdldENhbGxiYWNrKG1zZy5fY2hlY2spO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tJbmZvICYmIGNhbGxiYWNrSW5mby5jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0luZm8uY2FsbGJhY2sobXNnLl9wYXJhbSk7ICAgICAgICAgIC8vIOWbnuiwg+W8j+eahOmcgOimgV9jaGVja+aJvuWIsOWvueW6lOeahCwg6ZyA6KaB5Lyg5aSW5bGC55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEhlbHBlcjxDYWxsYmFja0hhbmRsZXJIZWxwZXI+KHRoaXMuY2FsbGJhY2tIZWxwZXJLZXkpLnJlbW92ZUNhbGxiYWNrKG1zZy5fY2hlY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuZ2V0SGVscGVyPEhhbmRsZXJIZWxwZXI+KHRoaXMuaGFuZGxlSGVscGVyS2V5KS5nZXRIYW5kbGVyKG1zZy5fY21kKTtcclxuICAgICAgICAgICAgICAgIGlmKGhhbmRsZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLkhhbmRsZShtc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzTG9jaygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9ja0xpc3QubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrU04obXNnKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzbiA9IG1zZy5fc247XHJcblxyXG4gICAgICAgIExvZ2dlci5sb2coXCI9PT1sYXN0U046XCIgKyB0aGlzLmxhc3RTTiArIFwiICAgY3VyU046XCIgKyBzbik7XHJcbiAgICAgICAgaWYoc24gPT0gMCkgICAgLy9zbuS4ujAgIOi3s+i/h+ajgOa1iyAgIOS4u+imgeWkhOeQhiA5MDAgIDkwMSDnrYnplJnor69cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxhc3RTTiB8fCB0aGlzLmxhc3RTTiA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U04gPSBzbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RTTiArIDEgIT0gc24pIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibGFzdFNOOlwiICsgdGhpcy5sYXN0U04gKyBcIiAgIGN1clNOOlwiICsgc24pO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihcIlNuRXJyb3JcIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsYXN0U05cIjp0aGlzLmxhc3RTTixcclxuICAgICAgICAgICAgICAgIFwic2VyU25cIjpzbixcclxuICAgICAgICAgICAgICAgIFwiY2hlY2tcIjptc2cuX2NoZWNrLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJhbVwiOm1zZy5fcGFyYW0sXHJcbiAgICAgICAgICAgICAgICBcImFwcGlkXCI6R2xvYmFsLlNldHRpbmcuYXBwSWQsXHJcbiAgICAgICAgICAgICAgICBcInVpZFwiOkdsb2JhbC5QbGF5ZXJEYXRhLnVpZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RTTiA9IHNuO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBhZGRUaW1lTG9jayhrZXk6c3RyaW5nLCB0aW1lOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aW1lID0gdGltZSB8fCAwXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcInRpbWUgbG9ja1wiLCBrZXksIHRpbWUpO1xyXG4gICAgICAgIGxldCBsb2NrSW5mbyA9IExvY2tJbmZvLmNyZWF0ZShrZXksIDAsIHRpbWUpO1xyXG4gICAgICAgIHRoaXMubG9ja0xpc3QucHVzaChsb2NrSW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNYW51YWxMb2NrKGtleSlcclxuICAgIHtcclxuICAgICAgICBsZXQgbG9ja0luZm8gPSBMb2NrSW5mby5jcmVhdGUoa2V5LCAxKTtcclxuICAgICAgICB0aGlzLmxvY2tMaXN0LnB1c2gobG9ja0luZm8pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUxvY2soa2V5KVxyXG4gICAge1xyXG4gICAgICAgIC8v5LiA5qyh5Y+q5riF55CG5LiA5p2hXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubG9ja0xpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbG9jayA9IHRoaXMubG9ja0xpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKGxvY2sua2V5ID09IGtleSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTG9jayhkdClcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLmxvY2tMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdFtpXS50aW1lIC09IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvY2tMaXN0W2ldLnRpbWUgPD0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2sgPSB0aGlzLmxvY2tMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYobG9jay50eXBlID09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiTWFudWFsIExvY2sg6Kej6ZSB6LaF5pe2XCIsIGxvY2sua2V5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIExvY2tJbmZvXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgbG9ja1RpbWVvdXQgPSA2O1xyXG4gICAgcHVibGljIGtleTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGltZTpudW1iZXI7XHJcbiAgICBwdWJsaWMgdHlwZTpudW1iZXI7ICAgIC8vMCB0aW1lbG9jayAgMSBtYW51YWxsb2NrXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoa2V5LCB0eXBlLCB0aW1lPylcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9IG5ldyBMb2NrSW5mbygpO1xyXG4gICAgICAgIGluZm8ua2V5ID0ga2V5O1xyXG4gICAgICAgIGlmKHR5cGUgPT0gMClcclxuICAgICAgICAgICAgaW5mby50aW1lID0gdGltZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGluZm8udGltZSA9IExvY2tJbmZvLmxvY2tUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxufSJdfQ==