
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/HallServer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63758h4mvhOoqt9Y90N0yA+', 'HallServer');
// hall/scripts/logic/core/net/hall/HallServer.ts

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
var EventDispatcher_1 = require("../../../../framework/event/EventDispatcher");
var NetEvent_1 = require("./NetEvent");
var HallErrorHandler_1 = require("./HallErrorHandler");
var HallHeartbeatHelper_1 = require("./HallHeartbeatHelper");
var HallBroadcastHelper_1 = require("./HallBroadcastHelper");
var GlobalEvent_1 = require("../../GlobalEvent");
var NetEvent_2 = require("../../../core/net/hall/NetEvent");
var CheckHelper_1 = require("./CheckHelper");
var ReportTool_1 = require("../../tool/ReportTool");
var HttpProxy_1 = require("../../../../framework/net/http/HttpProxy");
//大厅网络管理器
var HallServer = /** @class */ (function (_super) {
    __extends(HallServer, _super);
    function HallServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.USEWS = false;
        _this.NoWaitingNetList = [];
        //切场景后不丢弃的协议
        _this.NoIgnoreWhenChangeSceneList = [];
        //通用协议错误处理 （业务逻辑错误）
        _this.errorHelper = new HallErrorHandler_1.HallErrorHelper;
        _this.checkHelper = new CheckHelper_1.default(1);
        //数据缓存
        _this.dataCache = {};
        _this.checkInerval = 1000;
        _this.timeID = null;
        return _this;
    }
    HallServer.prototype.setup = function () {
        this.internalEvent = new EventDispatcher_1.default();
        this.heartbeatHelper = new HallHeartbeatHelper_1.default(this, this.internalEvent);
        this.broadcastHelper = new HallBroadcastHelper_1.default(this, this.internalEvent);
        this.initNoWaitingList();
        this.initNoIgnoreWhenChangeSceneList();
    };
    HallServer.prototype.clearAllCache = function () {
        this.dataCache = {};
    };
    HallServer.prototype.initNoWaitingList = function () {
        //货币信息
        this.NoWaitingNetList.push(NetEvent_2.NetAppface.GetUserPoint);
        //获取玩家信息
        this.NoWaitingNetList.push(NetEvent_2.NetAppface.GetUserInfo);
        //重连信息
        this.NoWaitingNetList.push(NetEvent_2.NetAppface.QuaryState);
        //上传信息
        this.NoWaitingNetList.push(NetEvent_2.NetAppface.PostIpInfo);
        //心跳
        this.NoWaitingNetList.push(NetEvent_1.NetOnline.HeartBeat);
        //日志
        this.NoWaitingNetList.push(NetEvent_1.NetClientLog.ClientLogReq);
        //app信息
        this.NoWaitingNetList.push(NetEvent_1.NetClientLog.DownloadAppInfo);
    };
    HallServer.prototype.initNoIgnoreWhenChangeSceneList = function () {
        //心跳
        this.NoIgnoreWhenChangeSceneList.push(NetEvent_1.NetOnline.HeartBeat);
    };
    //过滤不显示loading的界面
    HallServer.prototype.checkNetNoWating = function (extraData) {
        return this.NoWaitingNetList.indexOf(extraData.funcName) > -1;
    };
    HallServer.prototype.sendLogin = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.globalUrl + NetLogin.mod;
        if (!param.device)
            param.device = Global.Toolkit.genDeviceInfo();
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + NetEvent_1.NetLogin.mod + "?" + Global.UrlUtil.getLoginCommonParam();
        //let url = serverRoute.getUrl() + suffix;
        var serverData = this.getMsgParam(NetEvent_1.NetLogin.mod, func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting, 0, false, false);
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendVerifyCode = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.globalUrl + NetVerifyCode.mod;
        if (!param.device)
            param.device = Global.Toolkit.genDeviceInfo();
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + NetEvent_1.NetVerifyCode.mod + "?" + Global.UrlUtil.getLoginCommonParam();
        var serverData = this.getMsgParam(NetEvent_1.NetVerifyCode.mod, func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendCheckVersion = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.forceUpateUrl;
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + "checkversion" + "?" + Global.UrlUtil.getLoginCommonParam();
        var serverData = this.getMsgParam(NetEvent_1.NetCheckVersion.mod, func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting, 0, false, false);
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendPostInstallApp = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.forceUpateUrl;
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + "checkversion" + "?" + Global.UrlUtil.getLoginCommonParam();
        var serverData = this.getMsgParam(NetEvent_1.NetLogin.mod, func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendClientLog = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.logUrl;
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + "clientlog" + "?" + Global.UrlUtil.getLoginCommonParam();
        var serverData = this.getMsgParam("", func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    };
    //大厅内http协议请求
    //errorHandler  模块定制错误处理  返回true 则继续执行， false丢弃
    HallServer.prototype.send = function (mod, key, param, onComplete, errorHandler, showWaiting, cache, extra) {
        if (showWaiting === void 0) { showWaiting = true; }
        if (cache === void 0) { cache = 0; }
        if (extra === void 0) { extra = ""; }
        var serverRoutes = Global.Setting.Urls.hallRoutes;
        var suffix = Global.Setting.Urls.hallUrlSuffix;
        var serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        var extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendHeartBeat = function (mod, key, param, onComplete, errorHandler, showWaiting, cache, extra) {
        if (showWaiting === void 0) { showWaiting = true; }
        if (cache === void 0) { cache = 0; }
        if (extra === void 0) { extra = ""; }
        var serverRoutes = Global.Setting.Urls.hallRoutes;
        var suffix = Global.Setting.Urls.hallUrlSuffix;
        var serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        var isNeedParallelReq = false;
        var parallelReqKey = Global.Http.parallelReqKey;
        var heartbeatReq = parallelReqKey.heartbeat;
        if (heartbeatReq && (heartbeatReq.isReq == false)) {
            isNeedParallelReq = true;
            heartbeatReq.isReq = true;
            heartbeatReq.reqLines = [];
            Logger.error("sendheartbeat isNeedParallelReq = true");
        }
        if (isNeedParallelReq) {
            for (var i = 0; i < serverRoutes.serverInfoList.length; i++) {
                var curRoute = serverRoutes.serverInfoList[i];
                var url = curRoute.getUrl();
                if (curRoute.checkSelfIsOK()) {
                    var lineInfo = new HttpProxy_1.ParallelReqLine;
                    lineInfo.lineIndex = i;
                    lineInfo.startTime = (new Date()).valueOf();
                    lineInfo.host = curRoute.host;
                    var extraData = this.createNetExtraDataByUrl(serverRoutes, url, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache, true, i);
                    lineInfo.url = extraData.url.getUrl();
                    heartbeatReq.reqLines.push(lineInfo);
                    this.sendInternal(extraData);
                }
                else {
                    if (url.printSelf) {
                        Logger.error("route checkSelf Is not OK " + url.printSelf());
                    }
                }
            }
        }
        else {
            var extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
            this.sendInternal(extraData);
        }
    };
    //大厅内http协议请求  不重连
    HallServer.prototype.sendWithNoRetry = function (mod, key, param, onComplete, errorHandler, showWaiting, cache, extra) {
        if (showWaiting === void 0) { showWaiting = false; }
        if (cache === void 0) { cache = 0; }
        if (extra === void 0) { extra = ""; }
        var serverRoutes = Global.Setting.Urls.hallRoutes;
        var suffix = Global.Setting.Urls.hallUrlSuffix;
        var serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        var extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        extraData.retryTotalTime = 0;
        this.sendInternal(extraData);
    };
    HallServer.prototype.sendAiteLogin = function (func, param, onComplete, errorHandler, showWaiting) {
        if (showWaiting === void 0) { showWaiting = true; }
        //let url = Global.Setting.Urls.globalUrl + NetLogin.mod;
        if (!param.device)
            param.device = Global.Toolkit.genDeviceInfo();
        var serverRoutes = Global.Setting.Urls.globalRoutes;
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        var suffix = "/login/" + paramPrefix + "other" + "?" + Global.UrlUtil.getLoginCommonParam();
        var serverData = this.getMsgParam(NetEvent_1.NetLogin.mod, func, param, true);
        var extraData = this.createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, showWaiting);
        this.sendInternal(extraData);
    };
    HallServer.prototype.onUpdate = function (dt) {
        this.heartbeatHelper.onUpdate(dt);
        this.checkHelper.onUpdate(dt);
    };
    HallServer.prototype.run = function () {
        this.heartbeatHelper.run();
    };
    HallServer.prototype.stop = function () {
        this.clearAllCache();
        this.heartbeatHelper.stop();
    };
    HallServer.prototype.setSession = function (session) {
        this.heartbeatHelper.setSession(session);
    };
    /**
     *
     * @param sessionInfo
     * {
     *      _gid:xxxx,
     *      _gsc:"default",
     *      _glv:"l0"
     * }
     */
    HallServer.prototype.setGameOnlineInfo = function (sessionInfo) {
        if (sessionInfo == null)
            this.heartbeatHelper.setSession(null);
        else
            this.heartbeatHelper.setSession({ _para: sessionInfo });
    };
    HallServer.prototype.clearCache = function (mod, key, param) {
        // let url = cc.js.formatStr(Global.Setting.Urls.hallHttpUrl, mod, key);
        var cParam = this.getMsgParam(mod, key, param);
        var ckey = key + "_" + this.getParamStr(cParam);
        this.dataCache[ckey] = null;
    };
    HallServer.prototype.sendInternal = function (extraData, isRetry, isChangeServer) {
        var _this = this;
        if (isRetry === void 0) { isRetry = false; }
        if (isChangeServer === void 0) { isChangeServer = false; }
        if (extraData == null)
            return;
        if (extraData.cache != 0 && this.dataCache) {
            var key = extraData.funcName + "_" + this.getParamStr(extraData.param);
            var cache = this.dataCache[key];
            if (cache && cache.time && cache.msg) {
                var Dates = new Date();
                if (extraData.cache <= 10000) {
                    //按时效缓存, 并且在有效期内, 
                    if (Dates.getTime() - cache.time.getTime() < extraData.cache * 1000) {
                        this.onMessage(cache.msg, extraData);
                        return;
                    }
                    else {
                        this.dataCache[key] = null;
                    }
                }
                else if (extraData.cache == 10001) {
                    //按天缓存, 并且在有效期内, 只需要检查月和日就好了.没那么倒霉还跨年
                    if (Dates.getMonth() == cache.time.getMonth() && Dates.getDate() == cache.time.getDate()) {
                        this.onMessage(cache.msg, extraData);
                        return;
                    }
                    else {
                        this.dataCache[key] = null;
                    }
                }
            }
        }
        // Logger.log("isRetry = " + isRetry)
        // Logger.log("isChangeServer = " + isChangeServer)
        // Logger.log("extraData.showWaiting = " + extraData.showWaiting )
        if (extraData.showWaiting && !isRetry) {
            var waittingTips = null;
            if (extraData.funcName == NetEvent_2.NetAppface.GetConfig) {
                waittingTips = "连接中";
                Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, extraData.funcName, 15, waittingTips, 1, false);
            }
            else {
                Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, extraData.funcName, 15, waittingTips, 1, extraData.enableMask);
            }
        }
        if (isChangeServer && extraData.funcName != NetEvent_1.NetOnline.HeartBeat) {
            Global.Event.event(GlobalEvent_1.default.FORCE_HIDE_WAITING);
            var loadingStr = "重连中";
            if (extraData.funcName == NetEvent_2.NetAppface.GetConfig) {
                loadingStr = "重连中";
                Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, extraData.funcName, 15, loadingStr + extraData.serverRoutes.curIndex, 1, false);
            }
            else {
                Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, extraData.funcName, 15, loadingStr + extraData.serverRoutes.curIndex, 1, extraData.enableMask);
            }
        }
        this.checkHelper.updateChecker();
        if (extraData.funcName == NetEvent_1.NetOnline.HeartBeat) {
            this.checkHelper.recordHeartbeat(extraData.url);
            extraData.param._check = this.checkHelper.getHeartBeatChecker();
        }
        else {
            extraData.param._check = this.checkHelper.getNomalChecker();
        }
        if (!cc.sys.isNative && window.location.search != "") {
            var temp = window.location.search.substr(1);
            extraData.url.address = temp;
            extraData.url.addressHost = temp;
            extraData.url.realHost = temp;
        }
        extraData.url.suffix = Global.UrlUtil.refreshSuffixRetryTime(extraData.url.suffix, extraData.retryTimes);
        Logger.error("\u53D1\u9001\u4E86\u6D88\u606F" + extraData.url.getUrl() + "=========" + JSON.stringify(extraData.param));
        Global.Http.send(extraData.url, extraData.param, function (msg) {
            //Global.Http.sendWithServerRoute(extraData.serverRoutes.getCurRoute() ,extraData.suffix, extraData.param, (msg) => {
            if (_this.onMessage(msg, extraData) && extraData.cache != 0) {
                var key = extraData.funcName + "_" + _this.getParamStr(extraData.param);
                var cache = {};
                cache.time = new Date();
                cache.msg = msg;
                _this.dataCache[key] = cache;
            }
        }, function () {
            _this.onMessageError(extraData);
        });
    };
    HallServer.prototype.getParamStr = function (param) {
        if (!param._param)
            return "";
        return JSON.stringify(param._param);
    };
    //指定当前线路url
    HallServer.prototype.createNetExtraDataByUrl = function (serverRoutes, url, suffix, funcName, serverData, onComplete, errorHandler, showWating, cache, isParallelReq, lineIndex, enableMask) {
        if (cache === void 0) { cache = 0; }
        if (isParallelReq === void 0) { isParallelReq = false; }
        if (lineIndex === void 0) { lineIndex = 0; }
        if (enableMask === void 0) { enableMask = true; }
        if (serverRoutes == null) {
            Logger.error("serverroutes is null", funcName, suffix);
            return;
        }
        var extraData = new HallErrorHandler_1.HttpNetExtraData();
        extraData.param = serverData;
        extraData.onComplete = onComplete;
        extraData.errorHandler = errorHandler;
        extraData.funcName = funcName;
        extraData.serverRoutes = serverRoutes;
        extraData.suffix = suffix;
        extraData.isParallelReq = isParallelReq;
        extraData.lineIndex = lineIndex;
        extraData.enableMask = enableMask;
        if (isParallelReq) {
            extraData.retryTotalTime = 1;
        }
        else {
            //线路至少重试三次
            extraData.retryTotalTime = serverRoutes.length > 3 ? serverRoutes.length : 3;
        }
        extraData.sendInGame = Global.SceneManager.inGame();
        extraData.url = url;
        if (url) {
            url.suffix = url.suffix + suffix;
        }
        extraData.showWaiting = showWating;
        extraData.cache = cache;
        if (this.checkNetNoWating(extraData))
            extraData.showWaiting = false;
        return extraData;
    };
    HallServer.prototype.createNetExtraData = function (serverRoutes, suffix, funcName, serverData, onComplete, errorHandler, showWating, cache, isParallelReq, enableMask) {
        if (cache === void 0) { cache = 0; }
        if (isParallelReq === void 0) { isParallelReq = false; }
        if (enableMask === void 0) { enableMask = true; }
        if (serverRoutes == null) {
            Logger.error("serverroutes is null", funcName, suffix);
            return;
        }
        var url = null;
        var curRoute = serverRoutes.getCurRoute();
        //加了盾，有可能当前还没初始化成功,手动切换一次线路
        if (curRoute) {
            if (curRoute.checkSelfIsOK()) {
                var serverUrl = curRoute.getUrl();
                url = serverUrl;
            }
            else {
                var routesLen = serverRoutes.getRouteLen();
                if (routesLen > 1) {
                    var nextRoute = serverRoutes.getAnotherRoute();
                    if (nextRoute && nextRoute.checkSelfIsOK()) {
                        Logger.error("extraData.url changeToAnotherRoute");
                        var serverUrl = nextRoute.getUrl();
                        url = serverUrl;
                    }
                    else {
                        Logger.error("extraData.url nextRoute is null or not ok !!!");
                        var canUseRoute = serverRoutes.getCanUseRoute();
                        if (canUseRoute) {
                            var serverUrl = canUseRoute.getUrl();
                            url = serverUrl;
                        }
                        else {
                            Logger.error("extraData.url canUseRoute = null");
                        }
                    }
                }
                else if (routesLen == 1) {
                    // Logger.error("extraData.url routesLen = 1");
                    var serverUrl = curRoute.getUrl();
                    url = serverUrl;
                }
                else {
                    Logger.error("extraData.url routesLen = 0 ");
                }
            }
        }
        else {
            Logger.error("extraData.url curRoute is null !!!");
        }
        var extraData = this.createNetExtraDataByUrl(serverRoutes, url, suffix, funcName, serverData, onComplete, errorHandler, showWating, cache, isParallelReq, 0, enableMask);
        return extraData;
    };
    //处理并发请求
    HallServer.prototype.dealParallelReq = function (extraData, isSuccess) {
        if (extraData.isParallelReq) {
            Logger.error("dealParallelReq  isSuccess " + isSuccess);
            var lineIndex = extraData.lineIndex;
            var heartBeatParallelReq = Global.Http.parallelReqKey.heartbeat;
            if (heartBeatParallelReq) {
                if (heartBeatParallelReq.isRsp == false) {
                    heartBeatParallelReq.isRsp = true;
                }
                var reqLines = heartBeatParallelReq.reqLines;
                if (reqLines && reqLines.length > 0) {
                    var isParallelReqEnd = true;
                    for (var i = 0; i < reqLines.length; i++) {
                        var line = reqLines[i];
                        if (line.lineIndex == lineIndex) {
                            if (isSuccess) {
                                line.repFlag = 1;
                            }
                            else {
                                line.repFlag = 2;
                            }
                            line.endTime = (new Date()).valueOf();
                            line.reqTime = line.endTime - line.startTime;
                        }
                        else {
                            if (line.repFlag == 0) {
                                isParallelReqEnd = false;
                            }
                        }
                    }
                    //并发请求结束，判断最优线路，并合并上报每个线路的情况
                    if (isParallelReqEnd) {
                        Logger.error("dealParallelReq  isParallelReqEnd == true");
                        var successLines = [];
                        for (var i = 0; i < reqLines.length; i++) {
                            var line = reqLines[i];
                            if (line.repFlag == 1) {
                                successLines.push(line);
                            }
                        }
                        if (successLines.length > 0) {
                            successLines.sort(function (a, b) { return a.reqTime - b.reqTime; });
                            var firstLine = successLines[0];
                            Global.Setting.Urls.sortHallRoutes(firstLine.lineIndex);
                        }
                        var reportParams = [];
                        for (var i = 0; i < reqLines.length; i++) {
                            var line = reqLines[i];
                            var reportParam = { "success": line.repFlag == 1, "htime": line.reqTime, "host": line.host, "key": "heartbeat", "url": line.url };
                            reportParams.push(reportParam);
                        }
                        var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_PARALLEL_REQ;
                        Global.ReportTool.ReportPublicClientLog(reportKey, reportParams);
                    }
                }
            }
        }
    };
    HallServer.prototype.onMessageError = function (extraData) {
        var _this = this;
        extraData.retryTimes++;
        var isChangeServer = false;
        //心跳、登录相关、getConfig请求异常，触发切换线路
        if (extraData.funcName == NetEvent_1.NetOnline.HeartBeat
            || extraData.suffix.indexOf("login") > -1
            || extraData.funcName == NetEvent_2.NetAppface.GetConfig
            || extraData.funcName == NetEvent_2.NetAppface.GetGameList
            || extraData.funcName == NetEvent_2.NetAppface.GetGameRoute
            || extraData.funcName == NetEvent_1.NetCheckVersion.checkversion) {
            Logger.error("change server ");
            isChangeServer = true;
            extraData.serverRoutes.changeToAnotherRoute();
        }
        //心跳不重连
        if (extraData.funcName == NetEvent_1.NetOnline.HeartBeat) {
            this.dealParallelReq(extraData, false);
            return;
        }
        extraData.refreshUrl();
        //小于重连次数 则重新发送
        if (extraData.retryTimes < extraData.retryTotalTime) {
            //防止断网时回调太快
            setTimeout(function () { _this.sendInternal(extraData, true, isChangeServer); }, 500);
            return;
        }
        else {
            var isShowErrorDialog = true;
            if (extraData.showWaiting || extraData.funcName == NetEvent_2.NetAppface.GetGameRoute) {
                Global.Event.event(GlobalEvent_1.default.FORCE_HIDE_WAITING);
                var returnFunc = function () {
                    Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                    extraData.retryTimes = 0;
                    setTimeout(function () { _this.sendInternal(extraData, true, isChangeServer); }, 500);
                };
                if (extraData.suffix.indexOf("login") > -1 || extraData.funcName == NetEvent_1.NetCheckVersion.checkversion) {
                    //判断盾是否初始化完成，手动等待盾初始化完成然后再重试
                    if (Global.AppDun.checkIsDunLoading()) {
                        Logger.error("checkIsDunLoading true");
                        isShowErrorDialog = false;
                        Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, extraData.funcName, 15, "重连中", 1, extraData.enableMask);
                        this.startTimer(returnFunc);
                    }
                }
                else if (extraData.funcName == NetEvent_2.NetAppface.GetGameRoute) {
                    //重写重试方法
                    returnFunc = function () {
                        Logger.error("NetAppface.GetGameRoute 网络连接超时，请检查后重试");
                    };
                }
                if (isShowErrorDialog) {
                    Global.UI.showSingleBox("网络连接超时，请检查后重试", returnFunc, returnFunc);
                }
            }
            if (extraData.errorHandler && isShowErrorDialog) {
                extraData.errorHandler({ _errno: -1, _errstr: "网络连接超时，请检查后重试" });
            }
            //@todo  通用错误处理  弹窗或者上报
        }
    };
    HallServer.prototype.startTimer = function (callback) {
        var _this = this;
        clearInterval(this.timeID);
        var count = 0;
        this.timeID = setInterval(function () {
            count++;
            if (!Global.AppDun.checkIsDunLoading()) {
                clearInterval(_this.timeID);
                if (callback) {
                    callback();
                }
            }
            else {
                // 10s 自动超时
                if (count >= 10) {
                    Logger.error("check dun loading startTimer timout");
                    clearInterval(_this.timeID);
                    if (callback) {
                        callback();
                    }
                }
            }
        }, this.checkInerval);
    };
    HallServer.prototype.onMessage = function (msg, extraData) {
        var serverObj = null;
        var content = null;
        if (extraData.funcName == NetEvent_1.NetOnline.HeartBeat || extraData.funcName == NetEvent_2.NetAppface.GetConfig || extraData.funcName == NetEvent_2.NetAppface.GetGameList || extraData.funcName == NetEvent_2.NetAppface.GetGameRoute) {
            // Logger.log("sort hall routes ");
            Global.Setting.Urls.sortHallRoutes();
            if (extraData.funcName == NetEvent_1.NetOnline.HeartBeat) {
                this.dealParallelReq(extraData, true);
            }
        }
        else if (extraData.suffix.indexOf("login") > -1 || extraData.funcName == NetEvent_1.NetCheckVersion.checkversion) {
            // Logger.log("sort login routes ");
            Global.Setting.Urls.sortLoginRoutes();
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
            var reportParam0 = { "msg": msg, "url": extraData.url, "exception": e && e.message };
            Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_JSON_ERROR, reportParam0);
            return;
        }
        if (serverObj._func != NetEvent_1.NetOnline.HeartBeat) {
            Logger.error("\u6536\u5230\u670D\u52A1\u5668\u7684\u56DE\u590D" + serverObj._func + "=" + JSON.stringify(serverObj._param));
        }
        else {
            if (serverObj && serverObj._param)
                this.checkHelper.refreshCostTime(serverObj._check);
        }
        //@todo 显示放到onComplete之后  防止onComplete再调用waiting界面闪烁
        //@notice getGameRoute 产品提需求去掉loading，但是重连还要显示出来，特殊处理
        if (extraData.showWaiting || extraData.funcName == NetEvent_2.NetAppface.GetGameRoute) {
            Global.Event.event(GlobalEvent_1.default.HIDE_NET_WAITING, extraData.funcName);
        }
        //判断协议场景是否一致  登录和大厅算一个场景
        //如果在NoIgnoreWhenChangeSceneList 则忽略
        if (extraData.sendInGame != Global.SceneManager.inGame() && this.NoIgnoreWhenChangeSceneList.indexOf(extraData.funcName) < 0) {
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
    };
    //自定义errorHandler 可以处理完定制的  再执行通用的
    HallServer.prototype.tryHandleError = function (serverData) {
        return this.errorHelper.tryHandleError(serverData);
    };
    //获取心跳网络延时
    HallServer.prototype.getNetCost = function () {
        if (!this.checkHelper)
            return 0;
        return this.checkHelper.getNetCost();
    };
    HallServer.prototype.getMsgParam = function (mod, func, param, useMode, check) {
        if (useMode === void 0) { useMode = false; }
        if (check === void 0) { check = ""; }
        var msg = {};
        if (useMode) {
            msg._mod = mod;
            msg._func = func;
        }
        msg._param = param ? param : {};
        msg._check = check;
        return msg;
    };
    /**
     * 拉把协议发送接口
     * @param mod gameGameRoute返回的mod
     * @param key 协议方法名
     * @param param
     * @param complete
     * @param onError
     */
    HallServer.prototype.sendLabaMsg = function (mod, key, param, complete, onError) {
        var serverRoutes = Global.Setting.Urls.gameRoutes;
        if (serverRoutes == null) {
            Logger.error("gameRoutes is null 先请求GetGameRoute");
            serverRoutes = Global.Setting.Urls.hallRoutes;
        }
        this.sendWithServerRouteAndMod(serverRoutes.getRandRoute(), mod, key, param, complete, onError);
    };
    /**
     * 根据serverRoute mod  发送http协议，主要用于拉把类协议请求
     * @param serverRoute 服务器返回的服务器地址信息
     * @param mod 服务器路由
     * @param key 协议方法名
     * @param param
     * @param complete
     * @param onError
     */
    HallServer.prototype.sendWithServerRouteAndMod = function (serverRoute, mod, key, param, complete, onError) {
        var serverUrl = serverRoute.getHttpUrlWithMod(mod);
        var urlParam = Global.UrlUtil.getUrlCommonParam();
        var suffix = "?_func=" + key + "&" + urlParam;
        var sendParam = {};
        sendParam._param = param;
        serverUrl.suffix = serverUrl.suffix + suffix;
        this.sendWithUrl(serverUrl, sendParam, complete, onError, key);
    };
    //通过url方式
    HallServer.prototype.sendWithUrl = function (url, param, complete, onError, key) {
        var _this = this;
        if (key === void 0) { key = ""; }
        Global.Http.send(url, param, function (msg) {
            var content = Global.AESUtil.decodeMsg(msg);
            if (content == "") {
                Logger.error("解析协议失败", msg, url);
                return;
            }
            var serverObj = null;
            try {
                serverObj = JSON.parse(content);
            }
            catch (e) {
                Logger.error("解析JSON失败", msg, url, e && e.message);
                return;
            }
            //该协议只在游戏中使用
            //如果在NoIgnoreWhenChangeSceneList 则忽略
            if (!Global.SceneManager.inGame() && _this.NoIgnoreWhenChangeSceneList.indexOf(key) < 0) {
                Logger.error("game http协议跨场景，丢弃", url);
                return;
            }
            //处理错误
            if (!_this.errorHelper.handleError(serverObj, onError))
                return;
            if (complete)
                complete(serverObj._param);
        }, function () {
            //协议发送失败处理
            if (onError) {
                onError({ _errno: -1, _errstr: "网络连接超时，请检查后重试" });
            }
        });
    };
    //大厅内http协议请求url
    HallServer.prototype.getHallSendUrl = function (mod, key, param, onComplete, errorHandler, showWaiting, cache, extra) {
        if (showWaiting === void 0) { showWaiting = true; }
        if (cache === void 0) { cache = 0; }
        if (extra === void 0) { extra = ""; }
        var serverRoutes = Global.Setting.Urls.hallRoutes;
        var suffix = Global.Setting.Urls.hallUrlSuffix;
        var serverData = this.getMsgParam(mod, key, param);
        suffix = cc.js.formatStr(suffix, mod, key);
        suffix += extra;
        var extraData = this.createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, showWaiting, cache);
        var url = extraData.url;
        var sendUrl = url.getUrl();
        return sendUrl;
    };
    //心跳协议传递
    HallServer.EVENT_INTERNAL_ONHEARTBEAT = "OnHeartBeat";
    //更新msgseq
    HallServer.EVENT_INTERNAL_UPDATEMSGSEQ = "updateMsgSeq";
    return HallServer;
}(EventDispatcher_1.default));
exports.default = HallServer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcSGFsbFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrRUFBMEU7QUFDMUUsdUNBQStGO0FBQy9GLHVEQUF1RTtBQUN2RSw2REFBd0Q7QUFDeEQsNkRBQXdEO0FBQ3hELGlEQUE0QztBQUM1Qyw0REFBNkQ7QUFDN0QsNkNBQXdDO0FBRXhDLG9EQUFtRDtBQUVuRCxzRUFBMkU7QUFDM0UsU0FBUztBQUNUO0lBQXdDLDhCQUFlO0lBQXZEO1FBQUEscUVBeXhCQztRQXZ4QlcsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUVkLHNCQUFnQixHQUFHLEVBQUUsQ0FBQTtRQUU3QixZQUFZO1FBQ0osaUNBQTJCLEdBQUcsRUFBRSxDQUFBO1FBU3hDLG1CQUFtQjtRQUNYLGlCQUFXLEdBQW9CLElBQUksa0NBQWUsQ0FBQztRQU1wRCxpQkFBVyxHQUFHLElBQUkscUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNO1FBQ0UsZUFBUyxHQUFLLEVBQUUsQ0FBQztRQUVqQixrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixZQUFNLEdBQUcsSUFBSSxDQUFDOztJQTZ2QjFCLENBQUM7SUExdkJVLDBCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSw2QkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSw2QkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO0lBQzNDLENB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eEJ1Qyx5QkFBZSxHQXl4QnREO2tCQXp4Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IE5ldExvZ2luLCBOZXRPbmxpbmUsIE5ldFZlcmlmeUNvZGUsIE5ldENoZWNrVmVyc2lvbiwgTmV0Q2xpZW50TG9nIH0gZnJvbSBcIi4vTmV0RXZlbnRcIjtcclxuaW1wb3J0IHsgSGFsbEVycm9ySGVscGVyLCBIdHRwTmV0RXh0cmFEYXRhIH0gZnJvbSBcIi4vSGFsbEVycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQgSGFsbEhlYXJ0QmVhdEhlbHBlciBmcm9tIFwiLi9IYWxsSGVhcnRiZWF0SGVscGVyXCI7XHJcbmltcG9ydCBIYWxsQnJvYWRjYXN0SGVscGVyIGZyb20gXCIuL0hhbGxCcm9hZGNhc3RIZWxwZXJcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi9HbG9iYWxFdmVudFwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IENoZWNrSGVscGVyIGZyb20gXCIuL0NoZWNrSGVscGVyXCI7XHJcbmltcG9ydCB7IFNjZW5lVHlwZSB9IGZyb20gXCIuLi8uLi9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi8uLi90b29sL1JlcG9ydFRvb2xcIjtcclxuaW1wb3J0IFNlcnZlclJvdXRlcywgeyBTZXJ2ZXJSb3V0ZUluZm8gfSBmcm9tIFwiLi4vLi4vc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuaW1wb3J0IHsgUGFyYWxsZWxSZXFMaW5lIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9uZXQvaHR0cC9IdHRwUHJveHlcIjtcclxuLy/lpKfljoXnvZHnu5znrqHnkIblmahcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbFNlcnZlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBVU0VXUyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgTm9XYWl0aW5nTmV0TGlzdCA9IFtdXHJcblxyXG4gICAgLy/liIflnLrmma/lkI7kuI3kuKLlvIPnmoTljY/orq5cclxuICAgIHByaXZhdGUgTm9JZ25vcmVXaGVuQ2hhbmdlU2NlbmVMaXN0ID0gW11cclxuXHJcbiAgICAvL+W/g+i3s+WNj+iuruS8oOmAklxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9JTlRFUk5BTF9PTkhFQVJUQkVBVCA9IFwiT25IZWFydEJlYXRcIjtcclxuICAgIC8v5pu05pawbXNnc2VxXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0lOVEVSTkFMX1VQREFURU1TR1NFUSA9IFwidXBkYXRlTXNnU2VxXCI7XHJcblxyXG4gICAgLy/nu4Tku7bpgJrkv6FcclxuICAgIHByaXZhdGUgaW50ZXJuYWxFdmVudDogRXZlbnREaXNwYXRjaGVyO1xyXG4gICAgLy/pgJrnlKjljY/orq7plJnor6/lpITnkIYg77yI5Lia5Yqh6YC76L6R6ZSZ6K+v77yJXHJcbiAgICBwcml2YXRlIGVycm9ySGVscGVyOiBIYWxsRXJyb3JIZWxwZXIgPSBuZXcgSGFsbEVycm9ySGVscGVyO1xyXG4gICAgLy/lv4Pot7Pnu4Tku7ZcclxuICAgIHB1YmxpYyBoZWFydGJlYXRIZWxwZXI6IEhhbGxIZWFydEJlYXRIZWxwZXI7XHJcbiAgICAvL+W5v+aSree7hOS7tlxyXG4gICAgcHJpdmF0ZSBicm9hZGNhc3RIZWxwZXI6IEhhbGxCcm9hZGNhc3RIZWxwZXI7XHJcblxyXG4gICAgcHVibGljIGNoZWNrSGVscGVyID0gbmV3IENoZWNrSGVscGVyKDEpO1xyXG4gICAgLy/mlbDmja7nvJPlrZhcclxuICAgIHByaXZhdGUgZGF0YUNhY2hlOmFueT17fTtcclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSW5lcnZhbCA9IDEwMDA7XHJcbiAgICBwcml2YXRlIHRpbWVJRCA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpIHtcclxuICAgICAgICB0aGlzLmludGVybmFsRXZlbnQgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgdGhpcy5oZWFydGJlYXRIZWxwZXIgPSBuZXcgSGFsbEhlYXJ0QmVhdEhlbHBlcih0aGlzLCB0aGlzLmludGVybmFsRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVscGVyID0gbmV3IEhhbGxCcm9hZGNhc3RIZWxwZXIodGhpcywgdGhpcy5pbnRlcm5hbEV2ZW50KTtcclxuICAgICAgICB0aGlzLmluaXROb1dhaXRpbmdMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0Tm9JZ25vcmVXaGVuQ2hhbmdlU2NlbmVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsQ2FjaGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGF0YUNhY2hlID0ge31cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXROb1dhaXRpbmdMaXN0KClcclxuICAgIHtcclxuICAgICAgICAvL+i0p+W4geS/oeaBr1xyXG4gICAgICAgIHRoaXMuTm9XYWl0aW5nTmV0TGlzdC5wdXNoKE5ldEFwcGZhY2UuR2V0VXNlclBvaW50KTtcclxuICAgICAgICAvL+iOt+WPlueOqeWutuS/oeaBr1xyXG4gICAgICAgIHRoaXMuTm9XYWl0aW5nTmV0TGlzdC5wdXNoKE5ldEFwcGZhY2UuR2V0VXNlckluZm8pO1xyXG4gICAgICAgIC8v6YeN6L+e5L+h5oGvXHJcbiAgICAgICAgdGhpcy5Ob1dhaXRpbmdOZXRMaXN0LnB1c2goTmV0QXBwZmFjZS5RdWFyeVN0YXRlKTtcclxuICAgICAgICAvL+S4iuS8oOS/oeaBr1xyXG4gICAgICAgIHRoaXMuTm9XYWl0aW5nTmV0TGlzdC5wdXNoKE5ldEFwcGZhY2UuUG9zdElwSW5mbyk7XHJcbiAgICAgICAgLy/lv4Pot7NcclxuICAgICAgICB0aGlzLk5vV2FpdGluZ05ldExpc3QucHVzaChOZXRPbmxpbmUuSGVhcnRCZWF0KTtcclxuICAgICAgICAvL+aXpeW/l1xyXG4gICAgICAgIHRoaXMuTm9XYWl0aW5nTmV0TGlzdC5wdXNoKE5ldENsaWVudExvZy5DbGllbnRMb2dSZXEpO1xyXG4gICAgICAgIC8vYXBw5L+h5oGvXHJcbiAgICAgICAgdGhpcy5Ob1dhaXRpbmdOZXRMaXN0LnB1c2goTmV0Q2xpZW50TG9nLkRvd25sb2FkQXBwSW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Tm9JZ25vcmVXaGVuQ2hhbmdlU2NlbmVMaXN0KClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+W/g+i3s1xyXG4gICAgICAgIHRoaXMuTm9JZ25vcmVXaGVuQ2hhbmdlU2NlbmVMaXN0LnB1c2goTmV0T25saW5lLkhlYXJ0QmVhdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov4fmu6TkuI3mmL7npLpsb2FkaW5n55qE55WM6Z2iXHJcbiAgICBwcml2YXRlIGNoZWNrTmV0Tm9XYXRpbmcoZXh0cmFEYXRhOkh0dHBOZXRFeHRyYURhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTm9XYWl0aW5nTmV0TGlzdC5pbmRleE9mKGV4dHJhRGF0YS5mdW5jTmFtZSkgPiAtMTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNlbmRMb2dpbihmdW5jOiBzdHJpbmcsIHBhcmFtOiBhbnksIG9uQ29tcGxldGU/OiBGdW5jdGlvbiwgZXJyb3JIYW5kbGVyPzogRnVuY3Rpb24sIHNob3dXYWl0aW5nID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2xvYmFsVXJsICsgTmV0TG9naW4ubW9kO1xyXG4gICAgICAgIGlmKCFwYXJhbS5kZXZpY2UpXHJcbiAgICAgICAgICAgIHBhcmFtLmRldmljZSA9IEdsb2JhbC5Ub29sa2l0LmdlbkRldmljZUluZm8oKTtcclxuXHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2xvYmFsUm91dGVzO1xyXG4gICAgICAgIGxldCBwYXJhbVByZWZpeCA9IEdsb2JhbC5VcmxVdGlsLmdldFVybFBhcmFtQ29tbW9uUHJlZmV4KClcclxuICAgICAgICBsZXQgc3VmZml4ID0gXCIvbG9naW4vXCIrIHBhcmFtUHJlZml4ICsgTmV0TG9naW4ubW9kICtcIj9cIiArIEdsb2JhbC5VcmxVdGlsLmdldExvZ2luQ29tbW9uUGFyYW0oKTtcclxuICAgICAgICAvL2xldCB1cmwgPSBzZXJ2ZXJSb3V0ZS5nZXRVcmwoKSArIHN1ZmZpeDtcclxuICAgICAgICBsZXQgc2VydmVyRGF0YSA9IHRoaXMuZ2V0TXNnUGFyYW0oTmV0TG9naW4ubW9kLCBmdW5jLCBwYXJhbSwgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBmdW5jLCBzZXJ2ZXJEYXRhLCBvbkNvbXBsZXRlLCBlcnJvckhhbmRsZXIsIHNob3dXYWl0aW5nLDAsZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRWZXJpZnlDb2RlKGZ1bmM6IHN0cmluZywgcGFyYW06IGFueSwgb25Db21wbGV0ZT86IEZ1bmN0aW9uLCBlcnJvckhhbmRsZXI/OiBGdW5jdGlvbiwgc2hvd1dhaXRpbmcgPSB0cnVlKSB7XHJcbiAgICAgICAgLy9sZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5nbG9iYWxVcmwgKyBOZXRWZXJpZnlDb2RlLm1vZDtcclxuICAgICAgICBpZighcGFyYW0uZGV2aWNlKVxyXG4gICAgICAgICAgICBwYXJhbS5kZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2xvYmFsUm91dGVzO1xyXG4gICAgICAgIGxldCBwYXJhbVByZWZpeCA9IEdsb2JhbC5VcmxVdGlsLmdldFVybFBhcmFtQ29tbW9uUHJlZmV4KClcclxuICAgICAgICBsZXQgc3VmZml4ID0gIFwiL2xvZ2luL1wiICsgcGFyYW1QcmVmaXggKyBOZXRWZXJpZnlDb2RlLm1vZCArXCI/XCIgKyBHbG9iYWwuVXJsVXRpbC5nZXRMb2dpbkNvbW1vblBhcmFtKCk7XHJcbiAgICAgICAgbGV0IHNlcnZlckRhdGEgPSB0aGlzLmdldE1zZ1BhcmFtKE5ldFZlcmlmeUNvZGUubW9kLCBmdW5jLCBwYXJhbSwgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBmdW5jLCBzZXJ2ZXJEYXRhLCBvbkNvbXBsZXRlLCBlcnJvckhhbmRsZXIsIHNob3dXYWl0aW5nKTtcclxuICAgICAgICB0aGlzLnNlbmRJbnRlcm5hbChleHRyYURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQ2hlY2tWZXJzaW9uKGZ1bmM6IHN0cmluZywgcGFyYW06IGFueSwgb25Db21wbGV0ZT86IEZ1bmN0aW9uLCBlcnJvckhhbmRsZXI/OiBGdW5jdGlvbiwgc2hvd1dhaXRpbmcgPSB0cnVlKSB7XHJcbiAgICAgICAgLy9sZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5mb3JjZVVwYXRlVXJsO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmdsb2JhbFJvdXRlcztcclxuICAgICAgICBsZXQgcGFyYW1QcmVmaXggPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxQYXJhbUNvbW1vblByZWZleCgpXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9ICBcIi9sb2dpbi9cIisgcGFyYW1QcmVmaXgrXCJjaGVja3ZlcnNpb25cIiArXCI/XCIgKyBHbG9iYWwuVXJsVXRpbC5nZXRMb2dpbkNvbW1vblBhcmFtKCk7XHJcbiAgICAgICAgbGV0IHNlcnZlckRhdGEgPSB0aGlzLmdldE1zZ1BhcmFtKE5ldENoZWNrVmVyc2lvbi5tb2QsIGZ1bmMsIHBhcmFtLCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBmdW5jLCBzZXJ2ZXJEYXRhLCBvbkNvbXBsZXRlLCBlcnJvckhhbmRsZXIsIHNob3dXYWl0aW5nLDAsZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRQb3N0SW5zdGFsbEFwcChmdW5jOiBzdHJpbmcsIHBhcmFtOiBhbnksIG9uQ29tcGxldGU/OiBGdW5jdGlvbiwgZXJyb3JIYW5kbGVyPzogRnVuY3Rpb24sIHNob3dXYWl0aW5nID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZm9yY2VVcGF0ZVVybDtcclxuICAgICAgICBsZXQgc2VydmVyUm91dGVzID0gR2xvYmFsLlNldHRpbmcuVXJscy5nbG9iYWxSb3V0ZXM7XHJcbiAgICAgICAgbGV0IHBhcmFtUHJlZml4ID0gR2xvYmFsLlVybFV0aWwuZ2V0VXJsUGFyYW1Db21tb25QcmVmZXgoKVxyXG4gICAgICAgIGxldCBzdWZmaXggPSAgXCIvbG9naW4vXCIrIHBhcmFtUHJlZml4ICsgXCJjaGVja3ZlcnNpb25cIiArXCI/XCIgKyBHbG9iYWwuVXJsVXRpbC5nZXRMb2dpbkNvbW1vblBhcmFtKCk7XHJcbiAgICAgICAgbGV0IHNlcnZlckRhdGEgPSB0aGlzLmdldE1zZ1BhcmFtKE5ldExvZ2luLm1vZCwgZnVuYywgcGFyYW0sIHRydWUpO1xyXG4gICAgICAgIGxldCBleHRyYURhdGEgPSB0aGlzLmNyZWF0ZU5ldEV4dHJhRGF0YShzZXJ2ZXJSb3V0ZXMsIHN1ZmZpeCwgZnVuYywgc2VydmVyRGF0YSwgb25Db21wbGV0ZSwgZXJyb3JIYW5kbGVyLCBzaG93V2FpdGluZyk7XHJcbiAgICAgICAgdGhpcy5zZW5kSW50ZXJuYWwoZXh0cmFEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZENsaWVudExvZyhmdW5jOiBzdHJpbmcsIHBhcmFtOiBhbnksIG9uQ29tcGxldGU/OiBGdW5jdGlvbiwgZXJyb3JIYW5kbGVyPzogRnVuY3Rpb24sIHNob3dXYWl0aW5nID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMubG9nVXJsO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmdsb2JhbFJvdXRlcztcclxuICAgICAgICBsZXQgcGFyYW1QcmVmaXggPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxQYXJhbUNvbW1vblByZWZleCgpXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IFwiL2xvZ2luL1wiK3BhcmFtUHJlZml4K1wiY2xpZW50bG9nXCIgKyBcIj9cIiArIEdsb2JhbC5VcmxVdGlsLmdldExvZ2luQ29tbW9uUGFyYW0oKTtcclxuICAgICAgICBsZXQgc2VydmVyRGF0YSA9IHRoaXMuZ2V0TXNnUGFyYW0oXCJcIiwgZnVuYywgcGFyYW0sIHRydWUpO1xyXG4gICAgICAgIGxldCBleHRyYURhdGEgPSB0aGlzLmNyZWF0ZU5ldEV4dHJhRGF0YShzZXJ2ZXJSb3V0ZXMsIHN1ZmZpeCwgZnVuYywgc2VydmVyRGF0YSwgb25Db21wbGV0ZSwgZXJyb3JIYW5kbGVyLCBzaG93V2FpdGluZyk7XHJcbiAgICAgICAgdGhpcy5zZW5kSW50ZXJuYWwoZXh0cmFEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wkp+WOheWGhWh0dHDljY/orq7or7fmsYJcclxuICAgIC8vZXJyb3JIYW5kbGVyICDmqKHlnZflrprliLbplJnor6/lpITnkIYgIOi/lOWbnnRydWUg5YiZ57un57ut5omn6KGM77yMIGZhbHNl5Lii5byDXHJcbiAgICBwdWJsaWMgc2VuZChtb2Q6IHN0cmluZywga2V5OiBzdHJpbmcsIHBhcmFtOiBhbnksIG9uQ29tcGxldGU/OiBGdW5jdGlvbiwgZXJyb3JIYW5kbGVyPzogRnVuY3Rpb24sIHNob3dXYWl0aW5nID0gdHJ1ZSwgY2FjaGU9MCwgZXh0cmE6c3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXM7XHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFVybFN1ZmZpeDtcclxuICAgICAgICBsZXQgc2VydmVyRGF0YSA9IHRoaXMuZ2V0TXNnUGFyYW0obW9kLCBrZXksIHBhcmFtKTtcclxuICAgICAgICBzdWZmaXggPSBjYy5qcy5mb3JtYXRTdHIoc3VmZml4LCBtb2QsIGtleSk7XHJcbiAgICAgICAgc3VmZml4ICs9IGV4dHJhO1xyXG4gICAgICAgIGxldCBleHRyYURhdGEgPSB0aGlzLmNyZWF0ZU5ldEV4dHJhRGF0YShzZXJ2ZXJSb3V0ZXMsIHN1ZmZpeCwga2V5LCBzZXJ2ZXJEYXRhLCBvbkNvbXBsZXRlLCBlcnJvckhhbmRsZXIsIHNob3dXYWl0aW5nLCBjYWNoZSk7XHJcbiAgICAgICAgdGhpcy5zZW5kSW50ZXJuYWwoZXh0cmFEYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNlbmRIZWFydEJlYXQobW9kOiBzdHJpbmcsIGtleTogc3RyaW5nLCBwYXJhbTogYW55LCBvbkNvbXBsZXRlPzogRnVuY3Rpb24sIGVycm9ySGFuZGxlcj86IEZ1bmN0aW9uLCBzaG93V2FpdGluZyA9IHRydWUsIGNhY2hlPTAsIGV4dHJhOnN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXM7XHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFVybFN1ZmZpeDtcclxuICAgICAgICBsZXQgc2VydmVyRGF0YSA9IHRoaXMuZ2V0TXNnUGFyYW0obW9kLCBrZXksIHBhcmFtKTtcclxuICAgICAgICBzdWZmaXggPSBjYy5qcy5mb3JtYXRTdHIoc3VmZml4LCBtb2QsIGtleSk7XHJcbiAgICAgICAgc3VmZml4ICs9IGV4dHJhO1xyXG4gICAgICAgIGxldCBpc05lZWRQYXJhbGxlbFJlcSA9IGZhbHNlXHJcbiAgICAgICAgbGV0IHBhcmFsbGVsUmVxS2V5ID0gR2xvYmFsLkh0dHAucGFyYWxsZWxSZXFLZXlcclxuICAgICAgICBsZXQgaGVhcnRiZWF0UmVxID0gcGFyYWxsZWxSZXFLZXkuaGVhcnRiZWF0XHJcbiAgICAgICAgaWYgKGhlYXJ0YmVhdFJlcSAmJiAoaGVhcnRiZWF0UmVxLmlzUmVxID09IGZhbHNlKSl7XHJcbiAgICAgICAgICAgIGlzTmVlZFBhcmFsbGVsUmVxID0gdHJ1ZTtcclxuICAgICAgICAgICAgaGVhcnRiZWF0UmVxLmlzUmVxID0gdHJ1ZTtcclxuICAgICAgICAgICAgaGVhcnRiZWF0UmVxLnJlcUxpbmVzID0gW11cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2VuZGhlYXJ0YmVhdCBpc05lZWRQYXJhbGxlbFJlcSA9IHRydWVcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTmVlZFBhcmFsbGVsUmVxKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9MCA7aTxzZXJ2ZXJSb3V0ZXMuc2VydmVySW5mb0xpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyUm91dGUgPSBzZXJ2ZXJSb3V0ZXMuc2VydmVySW5mb0xpc3RbaV1cclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBjdXJSb3V0ZS5nZXRVcmwoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1clJvdXRlLmNoZWNrU2VsZklzT0soKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVJbmZvID0gbmV3IFBhcmFsbGVsUmVxTGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVJbmZvLmxpbmVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUluZm8uc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVJbmZvLmhvc3QgPSBjdXJSb3V0ZS5ob3N0XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhQnlVcmwoc2VydmVyUm91dGVzLCB1cmwsc3VmZml4LCBrZXksIHNlcnZlckRhdGEsIG9uQ29tcGxldGUsIGVycm9ySGFuZGxlciwgc2hvd1dhaXRpbmcsIGNhY2hlLHRydWUsaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUluZm8udXJsID0gZXh0cmFEYXRhLnVybC5nZXRVcmwoKVxyXG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0YmVhdFJlcS5yZXFMaW5lcy5wdXNoKGxpbmVJbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5wcmludFNlbGYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJyb3V0ZSBjaGVja1NlbGYgSXMgbm90IE9LIFwiICsgdXJsLnByaW50U2VsZigpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZXh0cmFEYXRhID0gdGhpcy5jcmVhdGVOZXRFeHRyYURhdGEoc2VydmVyUm91dGVzLCBzdWZmaXgsIGtleSwgc2VydmVyRGF0YSwgb25Db21wbGV0ZSwgZXJyb3JIYW5kbGVyLCBzaG93V2FpdGluZywgY2FjaGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRJbnRlcm5hbChleHRyYURhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/lpKfljoXlhoVodHRw5Y2P6K6u6K+35rGCICDkuI3ph43ov55cclxuICAgIHB1YmxpYyBzZW5kV2l0aE5vUmV0cnkobW9kOiBzdHJpbmcsIGtleTogc3RyaW5nLCBwYXJhbTogYW55LCBvbkNvbXBsZXRlPzogRnVuY3Rpb24sIGVycm9ySGFuZGxlcj86IEZ1bmN0aW9uLCBzaG93V2FpdGluZyA9IGZhbHNlLCBjYWNoZT0wLCBleHRyYTpzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcztcclxuICAgICAgICBsZXQgc3VmZml4ID0gR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsVXJsU3VmZml4O1xyXG4gICAgICAgIGxldCBzZXJ2ZXJEYXRhID0gdGhpcy5nZXRNc2dQYXJhbShtb2QsIGtleSwgcGFyYW0pO1xyXG4gICAgICAgIHN1ZmZpeCA9IGNjLmpzLmZvcm1hdFN0cihzdWZmaXgsIG1vZCwga2V5KTtcclxuICAgICAgICBzdWZmaXggKz0gZXh0cmE7XHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBrZXksIHNlcnZlckRhdGEsIG9uQ29tcGxldGUsIGVycm9ySGFuZGxlciwgc2hvd1dhaXRpbmcsIGNhY2hlKTtcclxuICAgICAgICBleHRyYURhdGEucmV0cnlUb3RhbFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRBaXRlTG9naW4oZnVuYzogc3RyaW5nLCBwYXJhbTogYW55LCBvbkNvbXBsZXRlPzogRnVuY3Rpb24sIGVycm9ySGFuZGxlcj86IEZ1bmN0aW9uLCBzaG93V2FpdGluZyA9IHRydWUpIHtcclxuICAgICAgICAvL2xldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmdsb2JhbFVybCArIE5ldExvZ2luLm1vZDtcclxuICAgICAgICBpZighcGFyYW0uZGV2aWNlKVxyXG4gICAgICAgICAgICBwYXJhbS5kZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2xvYmFsUm91dGVzO1xyXG4gICAgICAgIGxldCBwYXJhbVByZWZpeCA9IEdsb2JhbC5VcmxVdGlsLmdldFVybFBhcmFtQ29tbW9uUHJlZmV4KClcclxuICAgICAgICBsZXQgc3VmZml4ID1cIi9sb2dpbi9cIiArIHBhcmFtUHJlZml4ICsgXCJvdGhlclwiK1wiP1wiICsgR2xvYmFsLlVybFV0aWwuZ2V0TG9naW5Db21tb25QYXJhbSgpO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJEYXRhID0gdGhpcy5nZXRNc2dQYXJhbShOZXRMb2dpbi5tb2QsIGZ1bmMsIHBhcmFtLCB0cnVlKTtcclxuICAgICAgICBsZXQgZXh0cmFEYXRhID0gdGhpcy5jcmVhdGVOZXRFeHRyYURhdGEoc2VydmVyUm91dGVzLCBzdWZmaXgsIGZ1bmMsIHNlcnZlckRhdGEsIG9uQ29tcGxldGUsIGVycm9ySGFuZGxlciwgc2hvd1dhaXRpbmcpO1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBvblVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0SGVscGVyLm9uVXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrSGVscGVyLm9uVXBkYXRlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuKCkge1xyXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0SGVscGVyLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBbGxDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0SGVscGVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2Vzc2lvbihzZXNzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5oZWFydGJlYXRIZWxwZXIuc2V0U2Vzc2lvbihzZXNzaW9uKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzZXNzaW9uSW5mbyBcclxuICAgICAqIHtcclxuICAgICAqICAgICAgX2dpZDp4eHh4LFxyXG4gICAgICogICAgICBfZ3NjOlwiZGVmYXVsdFwiLFxyXG4gICAgICogICAgICBfZ2x2OlwibDBcIlxyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0R2FtZU9ubGluZUluZm8oc2Vzc2lvbkluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc2Vzc2lvbkluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRIZWxwZXIuc2V0U2Vzc2lvbihudWxsKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0SGVscGVyLnNldFNlc3Npb24oe19wYXJhOnNlc3Npb25JbmZvfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQ2FjaGUobW9kOiBzdHJpbmcsIGtleTogc3RyaW5nLCBwYXJhbTogYW55KXtcclxuICAgICAgICAvLyBsZXQgdXJsID0gY2MuanMuZm9ybWF0U3RyKEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEh0dHBVcmwsIG1vZCwga2V5KTtcclxuICAgICAgICBsZXQgY1BhcmFtID0gdGhpcy5nZXRNc2dQYXJhbShtb2QsIGtleSwgcGFyYW0pO1xyXG4gICAgICAgIGxldCBja2V5PSBrZXkgK1wiX1wiKyB0aGlzLmdldFBhcmFtU3RyKGNQYXJhbSk7XHJcbiAgICAgICAgdGhpcy5kYXRhQ2FjaGVbY2tleV0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZW5kSW50ZXJuYWwoZXh0cmFEYXRhPzogSHR0cE5ldEV4dHJhRGF0YSwgaXNSZXRyeSA9IGZhbHNlLGlzQ2hhbmdlU2VydmVyID0gZmFsc2UpIHtcclxuICAgICAgICBpZihleHRyYURhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKGV4dHJhRGF0YS5jYWNoZSAhPSAwICYmIHRoaXMuZGF0YUNhY2hlICApe1xyXG4gICAgICAgICAgICBsZXQga2V5PWV4dHJhRGF0YS5mdW5jTmFtZSArXCJfXCIrIHRoaXMuZ2V0UGFyYW1TdHIoZXh0cmFEYXRhLnBhcmFtKTtcclxuICAgICAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5kYXRhQ2FjaGVba2V5XTtcclxuICAgICAgICAgICAgaWYoY2FjaGUgJiYgY2FjaGUudGltZSAmJiBjYWNoZS5tc2cpe1xyXG4gICAgICAgICAgICAgICAgbGV0IERhdGVzID0gbmV3IERhdGUoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5jYWNoZTw9MTAwMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAvL+aMieaXtuaViOe8k+WtmCwg5bm25LiU5Zyo5pyJ5pWI5pyf5YaFLCBcclxuICAgICAgICAgICAgICAgICAgICAgaWYoRGF0ZXMuZ2V0VGltZSgpIC0gY2FjaGUudGltZS5nZXRUaW1lKCkgIDwgZXh0cmFEYXRhLmNhY2hlICogMTAwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKGNhY2hlLm1zZywgZXh0cmFEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2FjaGVba2V5XT1udWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGV4dHJhRGF0YS5jYWNoZSA9PSAxMDAwMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mjInlpKnnvJPlrZgsIOW5tuS4lOWcqOacieaViOacn+WGhSwg5Y+q6ZyA6KaB5qOA5p+l5pyI5ZKM5pel5bCx5aW95LqGLuayoemCo+S5iOWAkumciei/mOi3qOW5tFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKERhdGVzLmdldE1vbnRoKCkgPT0gY2FjaGUudGltZS5nZXRNb250aCgpICYmIERhdGVzLmdldERhdGUoKSA9PSBjYWNoZS50aW1lLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKGNhY2hlLm1zZywgZXh0cmFEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNhY2hlW2tleV09bnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImlzUmV0cnkgPSBcIiArIGlzUmV0cnkpXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImlzQ2hhbmdlU2VydmVyID0gXCIgKyBpc0NoYW5nZVNlcnZlcilcclxuICAgICAgICAvLyBMb2dnZXIubG9nKFwiZXh0cmFEYXRhLnNob3dXYWl0aW5nID0gXCIgKyBleHRyYURhdGEuc2hvd1dhaXRpbmcgKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChleHRyYURhdGEuc2hvd1dhaXRpbmcgJiYgIWlzUmV0cnkpIHtcclxuICAgICAgICAgICAgbGV0IHdhaXR0aW5nVGlwcyA9IG51bGxcclxuICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5mdW5jTmFtZSA9PSBOZXRBcHBmYWNlLkdldENvbmZpZyl7XHJcbiAgICAgICAgICAgICAgICB3YWl0dGluZ1RpcHMgPSBcIui/nuaOpeS4rVwiXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgZXh0cmFEYXRhLmZ1bmNOYW1lLDE1LHdhaXR0aW5nVGlwcywxLGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBleHRyYURhdGEuZnVuY05hbWUsMTUsd2FpdHRpbmdUaXBzLDEsZXh0cmFEYXRhLmVuYWJsZU1hc2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDaGFuZ2VTZXJ2ZXIgJiYgZXh0cmFEYXRhLmZ1bmNOYW1lICE9IE5ldE9ubGluZS5IZWFydEJlYXQpe1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HKTtcclxuICAgICAgICAgICAgbGV0IGxvYWRpbmdTdHIgPSBcIumHjei/nuS4rVwiXHJcbiAgICAgICAgICAgIGlmIChleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0QXBwZmFjZS5HZXRDb25maWcpe1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ1N0ciA9IFwi6YeN6L+e5LitXCJcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBleHRyYURhdGEuZnVuY05hbWUsMTUsbG9hZGluZ1N0cisgZXh0cmFEYXRhLnNlcnZlclJvdXRlcy5jdXJJbmRleCwxLGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBleHRyYURhdGEuZnVuY05hbWUsMTUsbG9hZGluZ1N0cisgZXh0cmFEYXRhLnNlcnZlclJvdXRlcy5jdXJJbmRleCwxLGV4dHJhRGF0YS5lbmFibGVNYXNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tIZWxwZXIudXBkYXRlQ2hlY2tlcigpO1xyXG4gICAgICAgIGlmKGV4dHJhRGF0YS5mdW5jTmFtZSA9PSBOZXRPbmxpbmUuSGVhcnRCZWF0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0hlbHBlci5yZWNvcmRIZWFydGJlYXQoZXh0cmFEYXRhLnVybCk7XHJcbiAgICAgICAgICAgIGV4dHJhRGF0YS5wYXJhbS5fY2hlY2sgPSB0aGlzLmNoZWNrSGVscGVyLmdldEhlYXJ0QmVhdENoZWNrZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXh0cmFEYXRhLnBhcmFtLl9jaGVjayA9IHRoaXMuY2hlY2tIZWxwZXIuZ2V0Tm9tYWxDaGVja2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUmJndpbmRvdy5sb2NhdGlvbi5zZWFyY2ghPVwiXCIpe1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICBleHRyYURhdGEudXJsLmFkZHJlc3MgPSB0ZW1wO1xyXG4gICAgICAgICAgICBleHRyYURhdGEudXJsLmFkZHJlc3NIb3N0ID0gdGVtcDtcclxuICAgICAgICAgICAgZXh0cmFEYXRhLnVybC5yZWFsSG9zdCA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4dHJhRGF0YS51cmwuc3VmZml4ID0gR2xvYmFsLlVybFV0aWwucmVmcmVzaFN1ZmZpeFJldHJ5VGltZShleHRyYURhdGEudXJsLnN1ZmZpeCwgZXh0cmFEYXRhLnJldHJ5VGltZXMpO1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihg5Y+R6YCB5LqG5raI5oGvJHtleHRyYURhdGEudXJsLmdldFVybCgpfT09PT09PT09PWArIEpTT04uc3RyaW5naWZ5KGV4dHJhRGF0YS5wYXJhbSkpO1xyXG4gICAgICAgIEdsb2JhbC5IdHRwLnNlbmQoZXh0cmFEYXRhLnVybCwgZXh0cmFEYXRhLnBhcmFtLCAobXNnKSA9PiB7XHJcbiAgICAgICAgLy9HbG9iYWwuSHR0cC5zZW5kV2l0aFNlcnZlclJvdXRlKGV4dHJhRGF0YS5zZXJ2ZXJSb3V0ZXMuZ2V0Q3VyUm91dGUoKSAsZXh0cmFEYXRhLnN1ZmZpeCwgZXh0cmFEYXRhLnBhcmFtLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgaWYoIHRoaXMub25NZXNzYWdlKG1zZywgZXh0cmFEYXRhKSAmJiBleHRyYURhdGEuY2FjaGUgIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5PWV4dHJhRGF0YS5mdW5jTmFtZSArXCJfXCIrIHRoaXMuZ2V0UGFyYW1TdHIoZXh0cmFEYXRhLnBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGxldCBjYWNoZTphbnk9IHt9XHJcbiAgICAgICAgICAgICAgICBjYWNoZS50aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNhY2hlLm1zZyA9IG1zZztcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNhY2hlW2tleV0gPSBjYWNoZTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2VFcnJvcihleHRyYURhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQYXJhbVN0cihwYXJhbSlcclxuICAgIHtcclxuICAgICAgICBpZighcGFyYW0uX3BhcmFtKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGFyYW0uX3BhcmFtKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aMh+WumuW9k+WJjee6v+i3r3VybFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVOZXRFeHRyYURhdGFCeVVybChzZXJ2ZXJSb3V0ZXMsdXJsLCBzdWZmaXgsIGZ1bmNOYW1lLCBzZXJ2ZXJEYXRhLCBvbkNvbXBsZXRlLCBlcnJvckhhbmRsZXIsIHNob3dXYXRpbmcsIGNhY2hlPTAsaXNQYXJhbGxlbFJlcSA9IGZhbHNlLGxpbmVJbmRleCA9IDAsZW5hYmxlTWFzayA9IHRydWUpe1xyXG4gICAgICAgIGlmKHNlcnZlclJvdXRlcyA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2VydmVycm91dGVzIGlzIG51bGxcIiwgZnVuY05hbWUsIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IG5ldyBIdHRwTmV0RXh0cmFEYXRhKCk7XHJcbiAgICAgICAgZXh0cmFEYXRhLnBhcmFtID0gc2VydmVyRGF0YTtcclxuICAgICAgICBleHRyYURhdGEub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XHJcbiAgICAgICAgZXh0cmFEYXRhLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcclxuICAgICAgICBleHRyYURhdGEuZnVuY05hbWUgPSBmdW5jTmFtZTtcclxuICAgICAgICBleHRyYURhdGEuc2VydmVyUm91dGVzID0gc2VydmVyUm91dGVzO1xyXG4gICAgICAgIGV4dHJhRGF0YS5zdWZmaXggPSBzdWZmaXg7XHJcbiAgICAgICAgZXh0cmFEYXRhLmlzUGFyYWxsZWxSZXEgPSBpc1BhcmFsbGVsUmVxXHJcbiAgICAgICAgZXh0cmFEYXRhLmxpbmVJbmRleCA9IGxpbmVJbmRleFxyXG4gICAgICAgIGV4dHJhRGF0YS5lbmFibGVNYXNrID0gZW5hYmxlTWFza1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpc1BhcmFsbGVsUmVxKXtcclxuICAgICAgICAgICAgZXh0cmFEYXRhLnJldHJ5VG90YWxUaW1lID0gMVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgLy/nur/ot6/oh7PlsJHph43or5XkuInmrKFcclxuICAgICAgICAgICAgZXh0cmFEYXRhLnJldHJ5VG90YWxUaW1lID0gc2VydmVyUm91dGVzLmxlbmd0aCA+IDM/IHNlcnZlclJvdXRlcy5sZW5ndGggOiAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBleHRyYURhdGEuc2VuZEluR2FtZSA9IEdsb2JhbC5TY2VuZU1hbmFnZXIuaW5HYW1lKCk7XHJcbiAgICAgICAgZXh0cmFEYXRhLnVybCA9IHVybFxyXG4gICAgICAgIGlmICh1cmwpe1xyXG4gICAgICAgICAgICB1cmwuc3VmZml4ID0gdXJsLnN1ZmZpeCArIHN1ZmZpeFxyXG4gICAgICAgIH1cclxuICAgICAgICBleHRyYURhdGEuc2hvd1dhaXRpbmcgPSBzaG93V2F0aW5nO1xyXG4gICAgICAgIGV4dHJhRGF0YS5jYWNoZSA9IGNhY2hlO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tOZXROb1dhdGluZyhleHRyYURhdGEpKVxyXG4gICAgICAgICAgICBleHRyYURhdGEuc2hvd1dhaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gZXh0cmFEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBmdW5jTmFtZSwgc2VydmVyRGF0YSwgb25Db21wbGV0ZSwgZXJyb3JIYW5kbGVyLCBzaG93V2F0aW5nLCBjYWNoZT0wLGlzUGFyYWxsZWxSZXEgPSBmYWxzZSxlbmFibGVNYXNrID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmKHNlcnZlclJvdXRlcyA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2VydmVycm91dGVzIGlzIG51bGxcIiwgZnVuY05hbWUsIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVybCA9IG51bGxcclxuICAgICAgICBsZXQgY3VyUm91dGUgPSBzZXJ2ZXJSb3V0ZXMuZ2V0Q3VyUm91dGUoKTtcclxuICAgICAgICAvL+WKoOS6huebvu+8jOacieWPr+iDveW9k+WJjei/mOayoeWIneWni+WMluaIkOWKnyzmiYvliqjliIfmjaLkuIDmrKHnur/ot69cclxuICAgICAgICBpZiAoY3VyUm91dGUpe1xyXG4gICAgICAgICAgICBpZiAoY3VyUm91dGUuY2hlY2tTZWxmSXNPSygpKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBjdXJSb3V0ZS5nZXRVcmwoKVxyXG4gICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3V0ZXNMZW4gPSBzZXJ2ZXJSb3V0ZXMuZ2V0Um91dGVMZW4oKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlc0xlbiA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Um91dGUgPSBzZXJ2ZXJSb3V0ZXMuZ2V0QW5vdGhlclJvdXRlKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFJvdXRlICYmIG5leHRSb3V0ZS5jaGVja1NlbGZJc09LKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIGNoYW5nZVRvQW5vdGhlclJvdXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gbmV4dFJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHNlcnZlclVybFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBuZXh0Um91dGUgaXMgbnVsbCBvciBub3Qgb2sgISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FuVXNlUm91dGUgPSBzZXJ2ZXJSb3V0ZXMuZ2V0Q2FuVXNlUm91dGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuVXNlUm91dGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZlclVybCA9IGNhblVzZVJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBzZXJ2ZXJVcmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBjYW5Vc2VSb3V0ZSA9IG51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocm91dGVzTGVuID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIHJvdXRlc0xlbiA9IDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZlclVybCA9IGN1clJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCByb3V0ZXNMZW4gPSAwIFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBjdXJSb3V0ZSBpcyBudWxsICEhIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICBleHRyYURhdGEgPSB0aGlzLmNyZWF0ZU5ldEV4dHJhRGF0YUJ5VXJsKHNlcnZlclJvdXRlcywgdXJsLHN1ZmZpeCwgZnVuY05hbWUsIHNlcnZlckRhdGEsIG9uQ29tcGxldGUsIGVycm9ySGFuZGxlciwgc2hvd1dhdGluZywgY2FjaGUsaXNQYXJhbGxlbFJlcSwwLGVuYWJsZU1hc2spXHJcbiAgICAgICAgcmV0dXJuIGV4dHJhRGF0YVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5aSE55CG5bm25Y+R6K+35rGCXHJcbiAgICBwdWJsaWMgZGVhbFBhcmFsbGVsUmVxKGV4dHJhRGF0YSxpc1N1Y2Nlc3Mpe1xyXG4gICAgICAgIGlmIChleHRyYURhdGEuaXNQYXJhbGxlbFJlcSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxQYXJhbGxlbFJlcSAgaXNTdWNjZXNzIFwiICsgaXNTdWNjZXNzKVxyXG4gICAgICAgICAgICBsZXQgbGluZUluZGV4ID0gZXh0cmFEYXRhLmxpbmVJbmRleFxyXG4gICAgICAgICAgICBsZXQgaGVhcnRCZWF0UGFyYWxsZWxSZXEgPSBHbG9iYWwuSHR0cC5wYXJhbGxlbFJlcUtleS5oZWFydGJlYXRcclxuICAgICAgICAgICAgaWYgKGhlYXJ0QmVhdFBhcmFsbGVsUmVxKXtcclxuICAgICAgICAgICAgICAgIGlmIChoZWFydEJlYXRQYXJhbGxlbFJlcS5pc1JzcCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRCZWF0UGFyYWxsZWxSZXEuaXNSc3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXFMaW5lcyA9IGhlYXJ0QmVhdFBhcmFsbGVsUmVxLnJlcUxpbmVzXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxTGluZXMgJiYgcmVxTGluZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzUGFyYWxsZWxSZXFFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwO2kgPCByZXFMaW5lcy5sZW5ndGggOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHJlcUxpbmVzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmxpbmVJbmRleCA9PSBsaW5lSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZS5yZXBGbGFnID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUucmVwRmxhZyA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUuZW5kVGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUucmVxVGltZSA9IGxpbmUuZW5kVGltZSAtIGxpbmUuc3RhcnRUaW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLnJlcEZsYWcgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQYXJhbGxlbFJlcUVuZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lubblj5Hor7fmsYLnu5PmnZ/vvIzliKTmlq3mnIDkvJjnur/ot6/vvIzlubblkIjlubbkuIrmiqXmr4/kuKrnur/ot6/nmoTmg4XlhrVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQYXJhbGxlbFJlcUVuZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxQYXJhbGxlbFJlcSAgaXNQYXJhbGxlbFJlcUVuZCA9PSB0cnVlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzTGluZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0wO2k8cmVxTGluZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHJlcUxpbmVzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5yZXBGbGFnID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NMaW5lcy5wdXNoKGxpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3NMaW5lcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NMaW5lcy5zb3J0KChhLGIpPT57cmV0dXJuIGEucmVxVGltZSAtIGIucmVxVGltZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RMaW5lID0gc3VjY2Vzc0xpbmVzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLnNvcnRIYWxsUm91dGVzKGZpcnN0TGluZS5saW5lSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXBvcnRQYXJhbXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0wO2k8cmVxTGluZXMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHJlcUxpbmVzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB7IFwic3VjY2Vzc1wiOiBsaW5lLnJlcEZsYWcgPT0gMSxcImh0aW1lXCI6bGluZS5yZXFUaW1lLFwiaG9zdFwiOmxpbmUuaG9zdCxcImtleVwiOlwiaGVhcnRiZWF0XCIsXCJ1cmxcIjogbGluZS51cmx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRQYXJhbXMucHVzaChyZXBvcnRQYXJhbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9QQVJBTExFTF9SRVFcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0UHVibGljQ2xpZW50TG9nKHJlcG9ydEtleSwgcmVwb3J0UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2VFcnJvcihleHRyYURhdGE6IEh0dHBOZXRFeHRyYURhdGEpIHtcclxuICAgICAgICBleHRyYURhdGEucmV0cnlUaW1lcysrO1xyXG4gICAgICAgIGxldCBpc0NoYW5nZVNlcnZlciA9IGZhbHNlXHJcbiAgICAgICAgLy/lv4Pot7PjgIHnmbvlvZXnm7jlhbPjgIFnZXRDb25maWfor7fmsYLlvILluLjvvIzop6blj5HliIfmjaLnur/ot69cclxuICAgICAgICBpZihleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0T25saW5lLkhlYXJ0QmVhdCBcclxuICAgICAgICAgICAgfHwgZXh0cmFEYXRhLnN1ZmZpeC5pbmRleE9mKFwibG9naW5cIikgPiAtMVxyXG4gICAgICAgICAgICB8fCBleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0QXBwZmFjZS5HZXRDb25maWdcclxuICAgICAgICAgICAgfHwgZXh0cmFEYXRhLmZ1bmNOYW1lID09IE5ldEFwcGZhY2UuR2V0R2FtZUxpc3RcclxuICAgICAgICAgICAgfHwgZXh0cmFEYXRhLmZ1bmNOYW1lID09IE5ldEFwcGZhY2UuR2V0R2FtZVJvdXRlXHJcbiAgICAgICAgICAgIHx8IGV4dHJhRGF0YS5mdW5jTmFtZSA9PSBOZXRDaGVja1ZlcnNpb24uY2hlY2t2ZXJzaW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGFuZ2Ugc2VydmVyIFwiKTtcclxuICAgICAgICAgICAgICAgIGlzQ2hhbmdlU2VydmVyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgZXh0cmFEYXRhLnNlcnZlclJvdXRlcy5jaGFuZ2VUb0Fub3RoZXJSb3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLy/lv4Pot7PkuI3ph43ov55cclxuICAgICAgICBpZihleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0T25saW5lLkhlYXJ0QmVhdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVhbFBhcmFsbGVsUmVxKGV4dHJhRGF0YSxmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXh0cmFEYXRhLnJlZnJlc2hVcmwoKTtcclxuICAgICAgICAvL+Wwj+S6jumHjei/nuasoeaVsCDliJnph43mlrDlj5HpgIFcclxuICAgICAgICBpZiAoZXh0cmFEYXRhLnJldHJ5VGltZXMgPCBleHRyYURhdGEucmV0cnlUb3RhbFRpbWUpIHtcclxuICAgICAgICAgICAgLy/pmLLmraLmlq3nvZHml7blm57osIPlpKrlv6tcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuc2VuZEludGVybmFsKGV4dHJhRGF0YSwgdHJ1ZSxpc0NoYW5nZVNlcnZlcik7fSwgNTAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaXNTaG93RXJyb3JEaWFsb2cgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZXh0cmFEYXRhLnNob3dXYWl0aW5nIHx8IGV4dHJhRGF0YS5mdW5jTmFtZSA9PSBOZXRBcHBmYWNlLkdldEdhbWVSb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV0dXJuRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFEYXRhLnJldHJ5VGltZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLnNlbmRJbnRlcm5hbChleHRyYURhdGEsIHRydWUsaXNDaGFuZ2VTZXJ2ZXIpO30sIDUwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5zdWZmaXguaW5kZXhPZihcImxvZ2luXCIpID4gLTEgfHwgZXh0cmFEYXRhLmZ1bmNOYW1lID09IE5ldENoZWNrVmVyc2lvbi5jaGVja3ZlcnNpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3nm77mmK/lkKbliJ3lp4vljJblrozmiJDvvIzmiYvliqjnrYnlvoXnm77liJ3lp4vljJblrozmiJDnhLblkI7lho3ph43or5VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLkFwcER1bi5jaGVja0lzRHVuTG9hZGluZygpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tJc0R1bkxvYWRpbmcgdHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3dFcnJvckRpYWxvZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgZXh0cmFEYXRhLmZ1bmNOYW1lLDE1LFwi6YeN6L+e5LitXCIsMSxleHRyYURhdGEuZW5hYmxlTWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcihyZXR1cm5GdW5jKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0QXBwZmFjZS5HZXRHYW1lUm91dGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YeN5YaZ6YeN6K+V5pa55rOVXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuRnVuYyA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIk5ldEFwcGZhY2UuR2V0R2FtZVJvdXRlIOe9kee7nOi/nuaOpei2heaXtu+8jOivt+ajgOafpeWQjumHjeivlVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1Nob3dFcnJvckRpYWxvZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLnvZHnu5zov57mjqXotoXml7bvvIzor7fmo4Dmn6XlkI7ph43or5VcIiwgcmV0dXJuRnVuYywgcmV0dXJuRnVuYylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihleHRyYURhdGEuZXJyb3JIYW5kbGVyICYmIGlzU2hvd0Vycm9yRGlhbG9nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBleHRyYURhdGEuZXJyb3JIYW5kbGVyKHtfZXJybm86LTEsIF9lcnJzdHI6XCLnvZHnu5zov57mjqXotoXml7bvvIzor7fmo4Dmn6XlkI7ph43or5VcIn0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9AdG9kbyAg6YCa55So6ZSZ6K+v5aSE55CGICDlvLnnqpfmiJbogIXkuIrmiqVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydFRpbWVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJRCk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgIHRoaXMudGltZUlEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuQXBwRHVuLmNoZWNrSXNEdW5Mb2FkaW5nKCkpe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gMTBzIOiHquWKqOi2heaXtlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49MTApe1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoZWNrIGR1biBsb2FkaW5nIHN0YXJ0VGltZXIgdGltb3V0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuY2hlY2tJbmVydmFsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UobXNnLCBleHRyYURhdGE6IEh0dHBOZXRFeHRyYURhdGEpIHtcclxuICAgICAgICBsZXQgc2VydmVyT2JqID0gbnVsbDtcclxuICAgICAgICBsZXQgY29udGVudCA9IG51bGxcclxuICAgICAgICBpZihleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0T25saW5lLkhlYXJ0QmVhdCB8fCBleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0QXBwZmFjZS5HZXRDb25maWcgfHwgZXh0cmFEYXRhLmZ1bmNOYW1lID09IE5ldEFwcGZhY2UuR2V0R2FtZUxpc3QgfHwgZXh0cmFEYXRhLmZ1bmNOYW1lID09IE5ldEFwcGZhY2UuR2V0R2FtZVJvdXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInNvcnQgaGFsbCByb3V0ZXMgXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLnNvcnRIYWxsUm91dGVzKClcclxuICAgICAgICAgICAgaWYgKGV4dHJhRGF0YS5mdW5jTmFtZSA9PSBOZXRPbmxpbmUuSGVhcnRCZWF0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVhbFBhcmFsbGVsUmVxKGV4dHJhRGF0YSx0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZiAoZXh0cmFEYXRhLnN1ZmZpeC5pbmRleE9mKFwibG9naW5cIikgPiAtMSB8fCBleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0Q2hlY2tWZXJzaW9uLmNoZWNrdmVyc2lvbil7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCJzb3J0IGxvZ2luIHJvdXRlcyBcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlVybHMuc29ydExvZ2luUm91dGVzKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwib25NZXNzYWdlIHVybCA9IFwiICsgZXh0cmFEYXRhLnVybC5nZXRVcmwoKSlcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwib25NZXNzYWdlIG1zZyA9IFwiICsgbXNnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29udGVudCA9IEdsb2JhbC5BRVNVdGlsLmRlY29kZU1zZyhtc2cpO1xyXG4gICAgICAgICAgICBpZiAoY29udGVudCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLop6PmnpDljY/orq7lpLHotKVcIiwgbXNnLCBleHRyYURhdGEudXJsLmdldFVybCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXJ2ZXJPYmogPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTWVzc2FnZUVycm9yKGV4dHJhRGF0YSk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuino+aekEpTT07lpLHotKVcIiwgbXNnLCBleHRyYURhdGEudXJsLmdldFVybCgpLCBlICYmIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGxldCByZXBvcnRQYXJhbTAgPSB7XCJtc2dcIjptc2csXCJ1cmxcIjpleHRyYURhdGEudXJsLFwiZXhjZXB0aW9uXCI6ZSAmJiBlLm1lc3NhZ2V9XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSlNPTl9FUlJPUixyZXBvcnRQYXJhbTApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJPYmouX2Z1bmMgIT0gTmV0T25saW5lLkhlYXJ0QmVhdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihg5pS25Yiw5pyN5Yqh5Zmo55qE5Zue5aSNJHtzZXJ2ZXJPYmouX2Z1bmN9PWArIEpTT04uc3RyaW5naWZ5KHNlcnZlck9iai5fcGFyYW0pKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHNlcnZlck9iaiAmJiBzZXJ2ZXJPYmouX3BhcmFtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0hlbHBlci5yZWZyZXNoQ29zdFRpbWUoc2VydmVyT2JqLl9jaGVjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0B0b2RvIOaYvuekuuaUvuWIsG9uQ29tcGxldGXkuYvlkI4gIOmYsuatom9uQ29tcGxldGXlho3osIPnlKh3YWl0aW5n55WM6Z2i6Zeq54OBXHJcbiAgICAgICAgLy9Abm90aWNlIGdldEdhbWVSb3V0ZSDkuqflk4Hmj5DpnIDmsYLljrvmjolsb2FkaW5n77yM5L2G5piv6YeN6L+e6L+Y6KaB5pi+56S65Ye65p2l77yM54m55q6K5aSE55CGXHJcbiAgICAgICAgaWYgKGV4dHJhRGF0YS5zaG93V2FpdGluZyB8fCBleHRyYURhdGEuZnVuY05hbWUgPT0gTmV0QXBwZmFjZS5HZXRHYW1lUm91dGUpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIGV4dHJhRGF0YS5mdW5jTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreWNj+iuruWcuuaZr+aYr+WQpuS4gOiHtCAg55m75b2V5ZKM5aSn5Y6F566X5LiA5Liq5Zy65pmvXHJcbiAgICAgICAgLy/lpoLmnpzlnKhOb0lnbm9yZVdoZW5DaGFuZ2VTY2VuZUxpc3Qg5YiZ5b+955WlXHJcbiAgICAgICAgaWYoZXh0cmFEYXRhLnNlbmRJbkdhbWUgIT0gR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSAmJiB0aGlzLk5vSWdub3JlV2hlbkNoYW5nZVNjZW5lTGlzdC5pbmRleE9mKGV4dHJhRGF0YS5mdW5jTmFtZSkgPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaHR0cOWNj+iurui3qOWcuuaZr++8jOS4ouW8g1wiLCBleHRyYURhdGEudXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5lcnJvckhlbHBlci5oYW5kbGVFcnJvcihzZXJ2ZXJPYmosIGV4dHJhRGF0YS5lcnJvckhhbmRsZXIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vQHRvZG8gIOWNj+iurumihOWkhOeQhlxyXG5cclxuICAgICAgICBpZiAoZXh0cmFEYXRhLm9uQ29tcGxldGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBleHRyYURhdGEub25Db21wbGV0ZShzZXJ2ZXJPYmouX3BhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ5Zue6LCDIOm7mOiupOeUqOS6i+S7tueahOW9ouW8j+a0vuWPkeWkhOWkhFxyXG4gICAgICAgICAgICBpZiAoc2VydmVyT2JqLl9mdW5jICYmIHNlcnZlck9iai5fZnVuYyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50KHNlcnZlck9iai5fZnVuYywgc2VydmVyT2JqLl9wYXJhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy/oh6rlrprkuYllcnJvckhhbmRsZXIg5Y+v5Lul5aSE55CG5a6M5a6a5Yi255qEICDlho3miafooYzpgJrnlKjnmoRcclxuICAgIHB1YmxpYyB0cnlIYW5kbGVFcnJvcihzZXJ2ZXJEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIZWxwZXIudHJ5SGFuZGxlRXJyb3Ioc2VydmVyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blv4Pot7PnvZHnu5zlu7bml7ZcclxuICAgIHB1YmxpYyBnZXROZXRDb3N0KClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5jaGVja0hlbHBlcilcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tIZWxwZXIuZ2V0TmV0Q29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TXNnUGFyYW0obW9kOiBzdHJpbmcsIGZ1bmM6IHN0cmluZywgcGFyYW06IGFueSwgdXNlTW9kZSA9IGZhbHNlLCBjaGVjayA9IFwiXCIpIHtcclxuICAgICAgICBsZXQgbXNnOiBhbnkgPSB7fVxyXG4gICAgICAgIGlmICh1c2VNb2RlKSB7XHJcbiAgICAgICAgICAgIG1zZy5fbW9kID0gbW9kXHJcbiAgICAgICAgICAgIG1zZy5fZnVuYyA9IGZ1bmM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1zZy5fcGFyYW0gPSBwYXJhbSA/IHBhcmFtIDoge31cclxuICAgICAgICBtc2cuX2NoZWNrID0gY2hlY2tcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaLieaKiuWNj+iuruWPkemAgeaOpeWPo1xyXG4gICAgICogQHBhcmFtIG1vZCBnYW1lR2FtZVJvdXRl6L+U5Zue55qEbW9kXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWNj+iuruaWueazleWQjVxyXG4gICAgICogQHBhcmFtIHBhcmFtIFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIFxyXG4gICAgICogQHBhcmFtIG9uRXJyb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kTGFiYU1zZyhtb2Qsa2V5LCBwYXJhbSwgY29tcGxldGUsIG9uRXJyb3IpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZVJvdXRlc1xyXG4gICAgICAgIGlmKHNlcnZlclJvdXRlcyA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2FtZVJvdXRlcyBpcyBudWxsIOWFiOivt+axgkdldEdhbWVSb3V0ZVwiKTtcclxuICAgICAgICAgICAgc2VydmVyUm91dGVzID0gR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsUm91dGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbmRXaXRoU2VydmVyUm91dGVBbmRNb2Qoc2VydmVyUm91dGVzLmdldFJhbmRSb3V0ZSgpLCBtb2QsIGtleSwgcGFyYW0sIGNvbXBsZXRlLCBvbkVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrnNlcnZlclJvdXRlIG1vZCAg5Y+R6YCBaHR0cOWNj+iuru+8jOS4u+imgeeUqOS6juaLieaKiuexu+WNj+iuruivt+axglxyXG4gICAgICogQHBhcmFtIHNlcnZlclJvdXRlIOacjeWKoeWZqOi/lOWbnueahOacjeWKoeWZqOWcsOWdgOS/oeaBr1xyXG4gICAgICogQHBhcmFtIG1vZCDmnI3liqHlmajot6/nlLFcclxuICAgICAqIEBwYXJhbSBrZXkg5Y2P6K6u5pa55rOV5ZCNXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gICAgIFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIFxyXG4gICAgICogQHBhcmFtIG9uRXJyb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZW5kV2l0aFNlcnZlclJvdXRlQW5kTW9kKHNlcnZlclJvdXRlOlNlcnZlclJvdXRlSW5mbywgbW9kLCBrZXksIHBhcmFtLCBjb21wbGV0ZSwgb25FcnJvcilcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gc2VydmVyUm91dGUuZ2V0SHR0cFVybFdpdGhNb2QobW9kKTtcclxuICAgICAgICBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IFwiP19mdW5jPVwiICsga2V5ICsgXCImXCIgKyB1cmxQYXJhbVxyXG4gICAgICAgIGxldCBzZW5kUGFyYW06YW55ID0ge31cclxuICAgICAgICBzZW5kUGFyYW0uX3BhcmFtID0gcGFyYW07XHJcbiAgICAgICAgc2VydmVyVXJsLnN1ZmZpeCA9IHNlcnZlclVybC5zdWZmaXggKyBzdWZmaXhcclxuICAgICAgICB0aGlzLnNlbmRXaXRoVXJsKHNlcnZlclVybCwgc2VuZFBhcmFtLCBjb21wbGV0ZSwgb25FcnJvciwga2V5KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/pgJrov4d1cmzmlrnlvI9cclxuICAgIHB1YmxpYyBzZW5kV2l0aFVybCh1cmwsIHBhcmFtLCBjb21wbGV0ZSwgb25FcnJvciwga2V5ID0gXCJcIilcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuSHR0cC5zZW5kKHVybCwgcGFyYW0sIChtc2cpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gR2xvYmFsLkFFU1V0aWwuZGVjb2RlTXNnKG1zZyk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuino+aekOWNj+iuruWksei0pVwiLCBtc2csIHVybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IHNlcnZlck9iaiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJPYmogPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLop6PmnpBKU09O5aSx6LSlXCIsIG1zZywgdXJsLCBlICYmIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v6K+l5Y2P6K6u5Y+q5Zyo5ri45oiP5Lit5L2/55SoXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5ZyoTm9JZ25vcmVXaGVuQ2hhbmdlU2NlbmVMaXN0IOWImeW/veeVpVxyXG4gICAgICAgICAgICBpZighR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSAmJiB0aGlzLk5vSWdub3JlV2hlbkNoYW5nZVNjZW5lTGlzdC5pbmRleE9mKGtleSkgPCAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnYW1lIGh0dHDljY/orq7ot6jlnLrmma/vvIzkuKLlvINcIiwgdXJsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/lpITnkIbplJnor69cclxuICAgICAgICAgICAgaWYoIXRoaXMuZXJyb3JIZWxwZXIuaGFuZGxlRXJyb3Ioc2VydmVyT2JqLCBvbkVycm9yKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmKGNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgY29tcGxldGUoc2VydmVyT2JqLl9wYXJhbSk7XHJcbiAgICAgICAgfSwgKCk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ljY/orq7lj5HpgIHlpLHotKXlpITnkIZcclxuICAgICAgICAgICAgaWYob25FcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvcih7X2Vycm5vOi0xLCBfZXJyc3RyOlwi572R57uc6L+e5o6l6LaF5pe277yM6K+35qOA5p+l5ZCO6YeN6K+VXCJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/lpKfljoXlhoVodHRw5Y2P6K6u6K+35rGCdXJsXHJcbiAgICBwdWJsaWMgZ2V0SGFsbFNlbmRVcmwobW9kOiBzdHJpbmcsIGtleTogc3RyaW5nLCBwYXJhbT86IGFueSwgb25Db21wbGV0ZT86IEZ1bmN0aW9uLCBlcnJvckhhbmRsZXI/OiBGdW5jdGlvbiwgc2hvd1dhaXRpbmcgPSB0cnVlLCBjYWNoZT0wLCBleHRyYTpzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcztcclxuICAgICAgICBsZXQgc3VmZml4ID0gR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsVXJsU3VmZml4O1xyXG4gICAgICAgIGxldCBzZXJ2ZXJEYXRhID0gdGhpcy5nZXRNc2dQYXJhbShtb2QsIGtleSwgcGFyYW0pO1xyXG4gICAgICAgIHN1ZmZpeCA9IGNjLmpzLmZvcm1hdFN0cihzdWZmaXgsIG1vZCwga2V5KTtcclxuICAgICAgICBzdWZmaXggKz0gZXh0cmE7XHJcbiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IHRoaXMuY3JlYXRlTmV0RXh0cmFEYXRhKHNlcnZlclJvdXRlcywgc3VmZml4LCBrZXksIHNlcnZlckRhdGEsIG9uQ29tcGxldGUsIGVycm9ySGFuZGxlciwgc2hvd1dhaXRpbmcsIGNhY2hlKTtcclxuICAgICAgICBsZXQgdXJsID0gZXh0cmFEYXRhLnVybFxyXG4gICAgICAgIGxldCBzZW5kVXJsID0gdXJsLmdldFVybCgpXHJcbiAgICAgICAgcmV0dXJuIHNlbmRVcmw7XHJcbiAgICB9XHJcbn0iXX0=