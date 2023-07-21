"use strict";
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