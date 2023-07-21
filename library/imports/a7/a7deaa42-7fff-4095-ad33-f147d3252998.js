"use strict";
cc._RF.push(module, 'a7deapCf/9Ala0z8UfTJSmY', 'HttpProxy');
// hall/scripts/framework/net/http/HttpProxy.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelReqLine = exports.ParallelReqInfo = void 0;
var HttpRequest_1 = require("./HttpRequest");
var ServerRoutes_1 = require("../../../logic/core/setting/ServerRoutes");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var ParallelReqInfo = /** @class */ (function () {
    function ParallelReqInfo() {
        this.isReq = false;
        this.isRsp = false;
        this.isReport = false;
        this.reqLines = [];
    }
    return ParallelReqInfo;
}());
exports.ParallelReqInfo = ParallelReqInfo;
var ParallelReqLine = /** @class */ (function () {
    function ParallelReqLine() {
        this.lineIndex = 0;
        this.repFlag = 0; // 0 未回复，1为有回包 2 为没回包
        this.startTime = 0;
        this.endTime = 0;
        this.reqTime = 0;
        this.host = "";
        this.url = "";
    }
    return ParallelReqLine;
}());
exports.ParallelReqLine = ParallelReqLine;
var HttpProxy = /** @class */ (function () {
    function HttpProxy() {
        this.cookie = "";
        this.reqList = [];
        //并发请求key
        this.parallelReqKey = {};
        this.parallelReqKey["checkversion"] = new ParallelReqInfo;
        this.parallelReqKey["heartbeat"] = new ParallelReqInfo;
    }
    HttpProxy.prototype.onUpdate = function (dt) {
        var reqModel = this.reqList.shift();
        if (reqModel) {
            var url = reqModel["url"];
            var msg = reqModel["msg"];
            var reqType = reqModel["reqType"];
            var onComplete = reqModel["onComplete"];
            var onError = reqModel["onError"];
            var timeout = reqModel["timeout"];
            var req = new HttpRequest_1.default();
            req.on(HttpRequest_1.default.EVENT_COMPLETE, this, onComplete);
            req.on(HttpRequest_1.default.EVENT_ERROR, this, onError);
            req.setTimeout(timeout);
            Logger.log("Send HallMSG:", msg, url.getUrl());
            msg = msg ? msg : "";
            var encrptedMsg = msg;
            if (url.isEncrptParam && msg) {
                encrptedMsg = Global.AESUtil.aesEncrptMsg(msg);
            }
            // Logger.log("Send Hall encrptedMsg = " + encrptedMsg)
            req.send(url, encrptedMsg, reqType);
        }
    };
    HttpProxy.prototype.pushReqListModel = function (url, msg, reqType, onComplete, onError, timeout) {
        var reqModel = {};
        reqModel["url"] = url;
        reqModel["msg"] = msg;
        reqModel["reqType"] = reqType;
        reqModel["onComplete"] = function (msg) {
            Global.ReportTool.markSuccess(url);
            if (onComplete)
                onComplete(msg);
        };
        reqModel["onError"] = onError;
        reqModel["timeout"] = timeout;
        this.reqList[this.reqList.length] = reqModel;
        Logger.log("reqList length = " + this.reqList.length);
    };
    //http post
    HttpProxy.prototype.send = function (url, param, onComplete, onError) {
        var _this = this;
        var msg = this.getSendContent(param);
        this.pushReqListModel(url, msg, "post", onComplete, function (http, hTime) {
            _this.sendError(http, url, param, onComplete, onError, hTime);
        }, HttpProxy.HttpTimeout);
    };
    HttpProxy.prototype.sendError = function (http, url, param, onComplete, onError, hTime) {
        if (hTime === void 0) { hTime = 0; }
        var needReload = this.onHttpError(http, url, hTime);
        // if (needReload){
        //     this.send(url,param,onComplete,onError)
        // }
        if (onError) {
            onError();
            onError = null;
        }
    };
    HttpProxy.prototype.sendWithServerRoute = function (serverRouteInfo, suffix, param, onComplete, onError) {
        var _this = this;
        // let url = serverRouteInfo.getUrl() + suffix;
        var serverUrl = serverRouteInfo.getUrl();
        serverUrl.suffix = serverUrl.suffix + suffix;
        var msg = this.getSendContent(param);
        this.pushReqListModel(serverUrl, msg, "post", onComplete, function (http, hTime) {
            _this.sendWithServerRouteError(http, serverUrl, serverRouteInfo, suffix, param, onComplete, onError, hTime);
        }, HttpProxy.HttpTimeout);
    };
    HttpProxy.prototype.sendWithServerRouteError = function (http, url, serverRouteInfo, suffix, param, onComplete, onError, hTime) {
        var needReload = this.onHttpError(http, url, hTime);
        if (onError) {
            onError();
            onError = null;
        }
    };
    //http get
    HttpProxy.prototype.get = function (url, onComplete, onError, param) {
        var _this = this;
        var msg = this.getSendContent(param);
        var serverUrl = new ServerRoutes_1.ServerUrl();
        serverUrl.parse(url);
        this.pushReqListModel(serverUrl, msg, "get", onComplete, function (http, hTime) {
            _this.getError(http, serverUrl, onComplete, onError, param, hTime);
        }, HttpProxy.HttpTimeout);
    };
    HttpProxy.prototype.getError = function (http, url, onComplete, onError, param, hTime) {
        if (hTime === void 0) { hTime = 0; }
        var needReload = this.onHttpError(http, url, hTime);
        if (onError) {
            onError();
            onError = null;
        }
    };
    HttpProxy.prototype.getWithRetry = function (url, onComplete, onError, param, retryTime) {
        var _this = this;
        if (retryTime === void 0) { retryTime = 0; }
        var msg = this.getSendContent(param);
        var serverUrl = new ServerRoutes_1.ServerUrl();
        serverUrl.parse(url);
        this.pushReqListModel(serverUrl, msg, "get", onComplete, function (http, hTime) {
            _this.getWithRetryError(http, serverUrl, onComplete, onError, param, retryTime, hTime);
            // this.onGetError(url, onComplete, onError, param, retryTime)
        }, HttpProxy.HttpTimeout);
    };
    HttpProxy.prototype.getWithRetryError = function (http, url, onComplete, onError, param, retryTime, hTime) {
        if (retryTime === void 0) { retryTime = 0; }
        if (hTime === void 0) { hTime = 0; }
        var needReload = this.onHttpError(http, url, hTime);
        if (onError) {
            onError();
            onError = null;
        }
    };
    //直接请求 不使用自定义httpdns
    HttpProxy.prototype.requestDirect = function (url, onComplete, onError, type, param, timeout) {
        var _this = this;
        if (type === void 0) { type = "get"; }
        if (timeout === void 0) { timeout = 15000; }
        var msg = this.getSendContent(param);
        var serverUrl = new ServerRoutes_1.ServerUrl();
        serverUrl.parse(url);
        serverUrl.isInnerRequest = false;
        this.pushReqListModel(serverUrl, msg, "get", onComplete, function (http, hTime) {
            _this.requestDirectError(http, serverUrl, onComplete, onError, type, param, timeout, hTime);
        }, timeout);
    };
    HttpProxy.prototype.requestDirectError = function (http, url, onComplete, onError, type, param, timeout, hTime) {
        if (type === void 0) { type = "get"; }
        if (timeout === void 0) { timeout = 15000; }
        if (hTime === void 0) { hTime = 0; }
        var needReload = this.onHttpError(http, url, hTime);
        if (onError) {
            onError();
            onError = null;
        }
    };
    /**
     * 1.进行错误码上报/提示
     * 2.307/302 重定向请求
     *
     *
     *
     * */
    HttpProxy.prototype.onHttpError = function (http, serverUrl, hTime) {
        if (hTime === void 0) { hTime = 0; }
        if (!http || !serverUrl) {
            Logger.error("onHttpError http  || url = null");
            return;
        }
        var httpStatus = http.status;
        var httpBody = http.response || http.responseText;
        var httpHeaders = http.getAllResponseHeaders();
        var reqUrl = serverUrl.getUrl();
        var realHost = serverUrl.realHost;
        var addrHost = serverUrl.addressHost;
        //获取host
        var host = Global.UrlUtil.getHostFromUrl(reqUrl);
        if (Global.ReportTool.isReportUrl(serverUrl)) {
            Logger.error("isReportUrl !!!!");
            return;
        }
        var reportSignUrl = "";
        if (serverUrl.isInnerRequest) {
            var httpSignInfo = Global.UrlUtil.dealHttpSign(serverUrl);
            reportSignUrl = httpSignInfo.sign_url;
        }
        else {
            reportSignUrl = serverUrl.getUrl();
        }
        var reportParam = { "error_code": httpStatus, "body": httpBody, "url": reportSignUrl, "htime": hTime, "host": realHost, "addrHost": addrHost };
        var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_HTTP_ERROR;
        //上报错误
        var sceneName = '';
        if (this.checkIsDataUrl(realHost)) {
            sceneName = 'D';
            reportKey = ReportTool_1.ReportTool.REPORT_TYPE_DATA_ERROR;
        }
        else if (reqUrl.indexOf("login") > -1) {
            sceneName = "L";
            reportKey = ReportTool_1.ReportTool.REPORT_TYPE_LOGIN_ERROR;
        }
        else if (reqUrl.indexOf("checkversion") > -1) {
            sceneName = "C";
            reportKey = ReportTool_1.ReportTool.REPORT_TYPE_CHECKVERSION_ERROR;
        }
        else if (reqUrl.indexOf("httpdns") > -1) {
            reportKey = ReportTool_1.ReportTool.REPORT_TYPE_HTTPDNS_ERROR;
        }
        var needReload = false;
        if (!this.isHostWithNoTips(reqUrl, httpStatus)) {
            Global.UI.fastTip("网络异常：H-" + sceneName + httpStatus);
        }
        //重定向
        if (httpStatus == 308 || httpStatus == 307 || httpStatus == 302) {
            var cookie = http.getResponseHeader("Set-Cookie");
            if (cookie) {
                Logger.error("httpStatus " + httpStatus);
                Logger.error("307 cookie = " + cookie);
                var cookieStrArray = cookie.split(";");
                if (cookieStrArray && cookieStrArray.length > 0) {
                    var cookieStr = cookieStrArray[0];
                    if (cookieStr && cookieStr.length > 0) {
                        cookieStr = cookieStr.trim();
                        this.cookie = cookieStr;
                        Logger.error("307 set cookie = " + this.cookie);
                    }
                }
            }
        }
        else {
            Global.ReportTool.ReportClientError(reportKey, reportParam);
        }
        Global.ReportTool.markFailed(serverUrl, httpStatus);
        // Logger.error("httpHeaders : " + httpHeaders)
        return needReload;
    };
    //过滤不需要弹tips错误的域名
    HttpProxy.prototype.isHostWithNoTips = function (url, httpStatus) {
        if (httpStatus == 0 || httpStatus == 307 || httpStatus == 302) {
            return true;
        }
        if (url) {
            if ((url.indexOf("httpdns") > -1) || url.indexOf("ip.360.cn") > -1) {
                return true;
            }
        }
        return false;
    };
    //判断链接是否是dataUrl
    HttpProxy.prototype.checkIsDataUrl = function (url) {
        if (!url)
            return false;
        var dataList = Global.Setting.dataUrlsList;
        if (!dataList)
            return false;
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].indexOf(url) > -1)
                return true;
        }
        return false;
    };
    HttpProxy.prototype.onGetError = function (url, onComplete, onError, param, retryTime) {
        var _this = this;
        retryTime++;
        if (retryTime >= 2) {
            if (onError)
                onError();
            return;
        }
        setTimeout(function () {
            _this.getWithRetry(url, onComplete, onError, param, retryTime);
        }, 1000);
    };
    HttpProxy.prototype.getSendContent = function (param) {
        if (param == null || param == "")
            return null;
        if (typeof (param) == "string")
            return param;
        return JSON.stringify(param);
    };
    HttpProxy.HttpTimeout = 15000;
    return HttpProxy;
}());
exports.default = HttpProxy;

cc._RF.pop();