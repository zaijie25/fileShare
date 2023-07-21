
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/http/HttpProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGh0dHBcXEh0dHBQcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMseUVBQXNGO0FBQ3RGLGtFQUFpRTtBQUVqRTtJQUFBO1FBRVcsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLFVBQUssR0FBRyxLQUFLLENBQUE7UUFDYixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFOWSwwQ0FBZTtBQVE1QjtJQUFBO1FBRVcsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLFlBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQSxxQkFBcUI7UUFDakMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osU0FBSSxHQUFHLEVBQUUsQ0FBQTtRQUNULFFBQUcsR0FBRyxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSwwQ0FBZTtBQVc1QjtJQU9JO1FBTE8sV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFlBQU8sR0FBRyxFQUFFLENBQUE7UUFDbkIsU0FBUztRQUNGLG1CQUFjLEdBQUcsRUFBRSxDQUFBO1FBR3RCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQztJQUMzRCxDQUFDO0lBR00sNEJBQVEsR0FBZixVQUFnQixFQUFFO1FBRWQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLFFBQVEs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QUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVE7WUFDMUIsT0FBTyxLQUFLLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhDLENBQUM7SUF4Uk0scUJBQVcsR0FBRyxLQUFLLENBQUM7SUF5Ui9CLGdCQUFDO0NBMVJELEFBMFJDLElBQUE7a0JBMVJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEh0dHBSZXF1ZXN0IGZyb20gXCIuL0h0dHBSZXF1ZXN0XCI7XHJcbmltcG9ydCB7IFNlcnZlclJvdXRlSW5mbywgU2VydmVyVXJsIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3Rvb2wvUmVwb3J0VG9vbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmFsbGVsUmVxSW5mb1xyXG57XHJcbiAgICBwdWJsaWMgaXNSZXEgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc1JzcCA9IGZhbHNlXHJcbiAgICBwdWJsaWMgaXNSZXBvcnQgPSBmYWxzZTtcclxuICAgIHB1YmxpYyByZXFMaW5lcyA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYWxsZWxSZXFMaW5lXHJcbntcclxuICAgIHB1YmxpYyBsaW5lSW5kZXggPSAwO1xyXG4gICAgcHVibGljIHJlcEZsYWcgPSAwOy8vIDAg5pyq5Zue5aSN77yMMeS4uuacieWbnuWMhSAyIOS4uuayoeWbnuWMhVxyXG4gICAgcHVibGljIHN0YXJ0VGltZSA9IDA7XHJcbiAgICBwdWJsaWMgZW5kVGltZSA9IDA7XHJcbiAgICBwdWJsaWMgcmVxVGltZSA9IDA7XHJcbiAgICBwdWJsaWMgaG9zdCA9IFwiXCJcclxuICAgIHB1YmxpYyB1cmwgPSBcIlwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0dHBQcm94eSB7XHJcbiAgICBzdGF0aWMgSHR0cFRpbWVvdXQgPSAxNTAwMDtcclxuICAgIHB1YmxpYyBjb29raWUgPSBcIlwiO1xyXG4gICAgcHVibGljIHJlcUxpc3QgPSBbXVxyXG4gICAgLy/lubblj5Hor7fmsYJrZXlcclxuICAgIHB1YmxpYyBwYXJhbGxlbFJlcUtleSA9IHt9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnBhcmFsbGVsUmVxS2V5W1wiY2hlY2t2ZXJzaW9uXCJdID0gbmV3IFBhcmFsbGVsUmVxSW5mbztcclxuICAgICAgICB0aGlzLnBhcmFsbGVsUmVxS2V5W1wiaGVhcnRiZWF0XCJdID0gbmV3IFBhcmFsbGVsUmVxSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBvblVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBsZXQgcmVxTW9kZWwgPSB0aGlzLnJlcUxpc3Quc2hpZnQoKVxyXG4gICAgICAgIGlmIChyZXFNb2RlbCl7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSByZXFNb2RlbFtcInVybFwiXVxyXG4gICAgICAgICAgICBsZXQgbXNnID0gcmVxTW9kZWxbXCJtc2dcIl1cclxuICAgICAgICAgICAgbGV0IHJlcVR5cGUgPSByZXFNb2RlbFtcInJlcVR5cGVcIl1cclxuICAgICAgICAgICAgbGV0IG9uQ29tcGxldGUgPSByZXFNb2RlbFtcIm9uQ29tcGxldGVcIl1cclxuICAgICAgICAgICAgbGV0IG9uRXJyb3IgPSByZXFNb2RlbFtcIm9uRXJyb3JcIl1cclxuICAgICAgICAgICAgbGV0IHRpbWVvdXQgPSByZXFNb2RlbFtcInRpbWVvdXRcIl1cclxuICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXEub24oSHR0cFJlcXVlc3QuRVZFTlRfQ09NUExFVEUsIHRoaXMsIG9uQ29tcGxldGUpXHJcbiAgICAgICAgICAgIHJlcS5vbihIdHRwUmVxdWVzdC5FVkVOVF9FUlJPUiwgdGhpcywgb25FcnJvcik7XHJcbiAgICAgICAgICAgIHJlcS5zZXRUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiU2VuZCBIYWxsTVNHOlwiLCBtc2csIHVybC5nZXRVcmwoKSlcclxuICAgICAgICAgICAgbXNnID0gbXNnID8gbXNnOiBcIlwiXHJcbiAgICAgICAgICAgIGxldCBlbmNycHRlZE1zZyA9IG1zZ1xyXG4gICAgICAgICAgICBpZiAodXJsLmlzRW5jcnB0UGFyYW0gJiYgbXNnKXtcclxuICAgICAgICAgICAgICAgIGVuY3JwdGVkTXNnID0gR2xvYmFsLkFFU1V0aWwuYWVzRW5jcnB0TXNnKG1zZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKFwiU2VuZCBIYWxsIGVuY3JwdGVkTXNnID0gXCIgKyBlbmNycHRlZE1zZylcclxuICAgICAgICAgICAgcmVxLnNlbmQodXJsLCBlbmNycHRlZE1zZywgcmVxVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHVzaFJlcUxpc3RNb2RlbCh1cmw6U2VydmVyVXJsLG1zZzpzdHJpbmcscmVxVHlwZTpzdHJpbmcsb25Db21wbGV0ZTpGdW5jdGlvbixvbkVycm9yOkZ1bmN0aW9uLHRpbWVvdXQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgcmVxTW9kZWwgPSB7fVxyXG4gICAgICAgIHJlcU1vZGVsW1widXJsXCJdID0gdXJsO1xyXG4gICAgICAgIHJlcU1vZGVsW1wibXNnXCJdID0gbXNnO1xyXG4gICAgICAgIHJlcU1vZGVsW1wicmVxVHlwZVwiXSA9IHJlcVR5cGU7XHJcbiAgICAgICAgcmVxTW9kZWxbXCJvbkNvbXBsZXRlXCJdID0gKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5tYXJrU3VjY2Vzcyh1cmwpO1xyXG4gICAgICAgICAgICBpZihvbkNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXFNb2RlbFtcIm9uRXJyb3JcIl0gPSBvbkVycm9yXHJcbiAgICAgICAgcmVxTW9kZWxbXCJ0aW1lb3V0XCJdID0gdGltZW91dFxyXG4gICAgICAgIHRoaXMucmVxTGlzdFt0aGlzLnJlcUxpc3QubGVuZ3RoXSA9IHJlcU1vZGVsO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJyZXFMaXN0IGxlbmd0aCA9IFwiICsgdGhpcy5yZXFMaXN0Lmxlbmd0aClcclxuICAgIH1cclxuICAgIC8vaHR0cCBwb3N0XHJcbiAgICBwdWJsaWMgc2VuZCh1cmw6IFNlcnZlclVybCwgcGFyYW06IGFueSwgb25Db21wbGV0ZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1zZyA9IHRoaXMuZ2V0U2VuZENvbnRlbnQocGFyYW0pO1xyXG4gICAgICAgIHRoaXMucHVzaFJlcUxpc3RNb2RlbCh1cmwsbXNnLFwicG9zdFwiLG9uQ29tcGxldGUsIChodHRwOiBYTUxIdHRwUmVxdWVzdCxoVGltZTpudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kRXJyb3IoaHR0cCwgdXJsLCBwYXJhbSwgb25Db21wbGV0ZSwgb25FcnJvcixoVGltZSlcclxuICAgICAgICB9LEh0dHBQcm94eS5IdHRwVGltZW91dClcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRFcnJvcihodHRwOiBYTUxIdHRwUmVxdWVzdCwgdXJsOiBTZXJ2ZXJVcmwsIHBhcmFtOiBhbnksIG9uQ29tcGxldGU6IEZ1bmN0aW9uLCBvbkVycm9yOiBGdW5jdGlvbixoVGltZSA9IDApIHtcclxuICAgICAgICBsZXQgbmVlZFJlbG9hZCA9IHRoaXMub25IdHRwRXJyb3IoaHR0cCwgdXJsLGhUaW1lKVxyXG4gICAgICAgIC8vIGlmIChuZWVkUmVsb2FkKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZW5kKHVybCxwYXJhbSxvbkNvbXBsZXRlLG9uRXJyb3IpXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAob25FcnJvcikge1xyXG4gICAgICAgICAgICBvbkVycm9yKClcclxuICAgICAgICAgICAgb25FcnJvciA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRXaXRoU2VydmVyUm91dGUoc2VydmVyUm91dGVJbmZvOiBTZXJ2ZXJSb3V0ZUluZm8sIHN1ZmZpeCwgcGFyYW06IGFueSwgb25Db21wbGV0ZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy8gbGV0IHVybCA9IHNlcnZlclJvdXRlSW5mby5nZXRVcmwoKSArIHN1ZmZpeDtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gc2VydmVyUm91dGVJbmZvLmdldFVybCgpXHJcbiAgICAgICAgc2VydmVyVXJsLnN1ZmZpeCA9IHNlcnZlclVybC5zdWZmaXggKyBzdWZmaXhcclxuICAgICAgICBsZXQgbXNnID0gdGhpcy5nZXRTZW5kQ29udGVudChwYXJhbSk7XHJcbiAgICAgICAgdGhpcy5wdXNoUmVxTGlzdE1vZGVsKHNlcnZlclVybCxtc2csXCJwb3N0XCIsb25Db21wbGV0ZSwgKGh0dHA6IFhNTEh0dHBSZXF1ZXN0LGhUaW1lOm51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRXaXRoU2VydmVyUm91dGVFcnJvcihodHRwLCBzZXJ2ZXJVcmwsIHNlcnZlclJvdXRlSW5mbywgc3VmZml4LCBwYXJhbSwgb25Db21wbGV0ZSwgb25FcnJvcixoVGltZSlcclxuICAgICAgICB9LEh0dHBQcm94eS5IdHRwVGltZW91dClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRXaXRoU2VydmVyUm91dGVFcnJvcihodHRwOiBYTUxIdHRwUmVxdWVzdCwgdXJsLCBzZXJ2ZXJSb3V0ZUluZm86IFNlcnZlclJvdXRlSW5mbywgc3VmZml4LCBwYXJhbTogYW55LCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24saFRpbWU6bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5lZWRSZWxvYWQgPSB0aGlzLm9uSHR0cEVycm9yKGh0dHAsIHVybCxoVGltZSlcclxuXHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgb25FcnJvcigpXHJcbiAgICAgICAgICAgIG9uRXJyb3IgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vaHR0cCBnZXRcclxuICAgIHB1YmxpYyBnZXQodXJsOiBzdHJpbmcsIG9uQ29tcGxldGU6IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24sIHBhcmFtPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG1zZyA9IHRoaXMuZ2V0U2VuZENvbnRlbnQocGFyYW0pO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBuZXcgU2VydmVyVXJsKClcclxuICAgICAgICBzZXJ2ZXJVcmwucGFyc2UodXJsKVxyXG4gICAgICAgIHRoaXMucHVzaFJlcUxpc3RNb2RlbChzZXJ2ZXJVcmwsbXNnLFwiZ2V0XCIsb25Db21wbGV0ZSwgKGh0dHA6IFhNTEh0dHBSZXF1ZXN0LGhUaW1lOm51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldEVycm9yKGh0dHAsIHNlcnZlclVybCwgb25Db21wbGV0ZSwgb25FcnJvciwgcGFyYW0saFRpbWUpO1xyXG4gICAgICAgIH0sSHR0cFByb3h5Lkh0dHBUaW1lb3V0KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RXJyb3IoaHR0cDogWE1MSHR0cFJlcXVlc3QsIHVybDogU2VydmVyVXJsLCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uLCBwYXJhbT86IGFueSxoVGltZSA9IDApIHtcclxuICAgICAgICBsZXQgbmVlZFJlbG9hZCA9IHRoaXMub25IdHRwRXJyb3IoaHR0cCwgdXJsLGhUaW1lKVxyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICBvbkVycm9yID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2l0aFJldHJ5KHVybDogc3RyaW5nLCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uLCBwYXJhbT86IGFueSwgcmV0cnlUaW1lID0gMCkge1xyXG4gICAgICAgIGxldCBtc2cgPSB0aGlzLmdldFNlbmRDb250ZW50KHBhcmFtKTtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gbmV3IFNlcnZlclVybCgpXHJcbiAgICAgICAgc2VydmVyVXJsLnBhcnNlKHVybClcclxuICAgICAgICB0aGlzLnB1c2hSZXFMaXN0TW9kZWwoc2VydmVyVXJsLG1zZyxcImdldFwiLG9uQ29tcGxldGUsIChodHRwOiBYTUxIdHRwUmVxdWVzdCxoVGltZTpudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRXaXRoUmV0cnlFcnJvcihodHRwLCBzZXJ2ZXJVcmwsIG9uQ29tcGxldGUsIG9uRXJyb3IsIHBhcmFtLCByZXRyeVRpbWUsaFRpbWUpXHJcbiAgICAgICAgICAgIC8vIHRoaXMub25HZXRFcnJvcih1cmwsIG9uQ29tcGxldGUsIG9uRXJyb3IsIHBhcmFtLCByZXRyeVRpbWUpXHJcbiAgICAgICAgfSxIdHRwUHJveHkuSHR0cFRpbWVvdXQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRXaXRoUmV0cnlFcnJvcihodHRwOiBYTUxIdHRwUmVxdWVzdCwgdXJsOiBTZXJ2ZXJVcmwsIG9uQ29tcGxldGU6IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24sIHBhcmFtPzogYW55LCByZXRyeVRpbWUgPSAwLGhUaW1lID0gMCkge1xyXG4gICAgICAgIGxldCBuZWVkUmVsb2FkID0gdGhpcy5vbkh0dHBFcnJvcihodHRwLCB1cmwsaFRpbWUpXHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgb25FcnJvcigpXHJcbiAgICAgICAgICAgIG9uRXJyb3IgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgLy/nm7TmjqXor7fmsYIg5LiN5L2/55So6Ieq5a6a5LmJaHR0cGRuc1xyXG4gICAgIHB1YmxpYyByZXF1ZXN0RGlyZWN0KHVybCwgb25Db21wbGV0ZTogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbiwgdHlwZTogc3RyaW5nID0gXCJnZXRcIiwgcGFyYW0/OiBhbnksIHRpbWVvdXQgPSAxNTAwMCkge1xyXG4gICAgICAgIGxldCBtc2cgPSB0aGlzLmdldFNlbmRDb250ZW50KHBhcmFtKTtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gbmV3IFNlcnZlclVybCgpXHJcbiAgICAgICAgc2VydmVyVXJsLnBhcnNlKHVybClcclxuICAgICAgICBzZXJ2ZXJVcmwuaXNJbm5lclJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnB1c2hSZXFMaXN0TW9kZWwoc2VydmVyVXJsLG1zZyxcImdldFwiLG9uQ29tcGxldGUsKGh0dHA6IFhNTEh0dHBSZXF1ZXN0LGhUaW1lOm51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3REaXJlY3RFcnJvcihodHRwLCBzZXJ2ZXJVcmwsIG9uQ29tcGxldGUsIG9uRXJyb3IsIHR5cGUsIHBhcmFtLCB0aW1lb3V0LGhUaW1lKVxyXG4gICAgICAgIH0sdGltZW91dClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcXVlc3REaXJlY3RFcnJvcihodHRwOiBYTUxIdHRwUmVxdWVzdCwgdXJsLCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uLCB0eXBlOiBzdHJpbmcgPSBcImdldFwiLCBwYXJhbT86IGFueSwgdGltZW91dCA9IDE1MDAwLGhUaW1lID0gMCkge1xyXG4gICAgICAgIGxldCBuZWVkUmVsb2FkID0gdGhpcy5vbkh0dHBFcnJvcihodHRwLCB1cmwsaFRpbWUpXHJcblxyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICBvbkVycm9yID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIDEu6L+b6KGM6ZSZ6K+v56CB5LiK5oqlL+aPkOekulxyXG4gICAgICogMi4zMDcvMzAyIOmHjeWumuWQkeivt+axglxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIFxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgb25IdHRwRXJyb3IoaHR0cDogWE1MSHR0cFJlcXVlc3QsIHNlcnZlclVybDogU2VydmVyVXJsLGhUaW1lID0gMCkge1xyXG4gICAgICAgIGlmICghaHR0cCB8fCAhc2VydmVyVXJsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9uSHR0cEVycm9yIGh0dHAgIHx8IHVybCA9IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaHR0cFN0YXR1cyA9IGh0dHAuc3RhdHVzO1xyXG4gICAgICAgIGxldCBodHRwQm9keSA9IGh0dHAucmVzcG9uc2UgfHwgaHR0cC5yZXNwb25zZVRleHRcclxuICAgICAgICBsZXQgaHR0cEhlYWRlcnMgPSBodHRwLmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xyXG4gICAgICAgIGxldCByZXFVcmwgPSBzZXJ2ZXJVcmwuZ2V0VXJsKCk7XHJcbiAgICAgICAgbGV0IHJlYWxIb3N0ID0gc2VydmVyVXJsLnJlYWxIb3N0O1xyXG4gICAgICAgIGxldCBhZGRySG9zdCA9IHNlcnZlclVybC5hZGRyZXNzSG9zdFxyXG5cclxuICAgICAgICAvL+iOt+WPlmhvc3RcclxuICAgICAgICBsZXQgaG9zdCA9IEdsb2JhbC5VcmxVdGlsLmdldEhvc3RGcm9tVXJsKHJlcVVybCk7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5SZXBvcnRUb29sLmlzUmVwb3J0VXJsKHNlcnZlclVybCkpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaXNSZXBvcnRVcmwgISEhIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVwb3J0U2lnblVybCA9IFwiXCJcclxuICAgICAgICBpZiAoc2VydmVyVXJsLmlzSW5uZXJSZXF1ZXN0KXtcclxuICAgICAgICAgICAgbGV0IGh0dHBTaWduSW5mbyA9IEdsb2JhbC5VcmxVdGlsLmRlYWxIdHRwU2lnbihzZXJ2ZXJVcmwpXHJcbiAgICAgICAgICAgIHJlcG9ydFNpZ25VcmwgPSBodHRwU2lnbkluZm8uc2lnbl91cmxcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcG9ydFNpZ25VcmwgPSBzZXJ2ZXJVcmwuZ2V0VXJsKClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcImVycm9yX2NvZGVcIjogaHR0cFN0YXR1cywgXCJib2R5XCI6IGh0dHBCb2R5LCBcInVybFwiOiByZXBvcnRTaWduVXJsICxcImh0aW1lXCI6aFRpbWUsXCJob3N0XCI6cmVhbEhvc3QsIFwiYWRkckhvc3RcIjphZGRySG9zdCB9XHJcbiAgICAgICAgbGV0IHJlcG9ydEtleSA9IFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSFRUUF9FUlJPUlxyXG4gICAgICAgIC8v5LiK5oql6ZSZ6K+vXHJcbiAgICAgICAgbGV0IHNjZW5lTmFtZSA9ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNEYXRhVXJsKHJlYWxIb3N0KSkge1xyXG4gICAgICAgICAgICBzY2VuZU5hbWUgPSAnRCdcclxuICAgICAgICAgICAgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9EQVRBX0VSUk9SXHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXFVcmwuaW5kZXhPZihcImxvZ2luXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgc2NlbmVOYW1lID0gXCJMXCJcclxuICAgICAgICAgICAgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9MT0dJTl9FUlJPUlxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVxVXJsLmluZGV4T2YoXCJjaGVja3ZlcnNpb25cIikgPiAtMSkge1xyXG4gICAgICAgICAgICBzY2VuZU5hbWUgPSBcIkNcIlxyXG4gICAgICAgICAgICByZXBvcnRLZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0NIRUNLVkVSU0lPTl9FUlJPUlxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVxVXJsLmluZGV4T2YoXCJodHRwZG5zXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9IVFRQRE5TX0VSUk9SXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZWVkUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSG9zdFdpdGhOb1RpcHMocmVxVXJsLCBodHRwU3RhdHVzKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIue9kee7nOW8guW4uO+8mkgtXCIgKyBzY2VuZU5hbWUgKyBodHRwU3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43lrprlkJFcclxuICAgICAgICBpZiAoaHR0cFN0YXR1cyA9PSAzMDggfHwgaHR0cFN0YXR1cyA9PSAzMDcgfHwgaHR0cFN0YXR1cyA9PSAzMDIpIHtcclxuICAgICAgICAgICAgbGV0IGNvb2tpZSA9IGh0dHAuZ2V0UmVzcG9uc2VIZWFkZXIoXCJTZXQtQ29va2llXCIpXHJcbiAgICAgICAgICAgIGlmIChjb29raWUpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImh0dHBTdGF0dXMgXCIgKyBodHRwU3RhdHVzKVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiMzA3IGNvb2tpZSA9IFwiICsgY29va2llKVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvb2tpZVN0ckFycmF5ID0gY29va2llLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZVN0ckFycmF5ICYmIGNvb2tpZVN0ckFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29va2llU3RyID0gY29va2llU3RyQXJyYXlbMF1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29va2llU3RyICYmIGNvb2tpZVN0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZVN0ciA9IGNvb2tpZVN0ci50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29va2llID0gY29va2llU3RyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIjMwNyBzZXQgY29va2llID0gXCIgKyB0aGlzLmNvb2tpZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IocmVwb3J0S2V5LCByZXBvcnRQYXJhbSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5tYXJrRmFpbGVkKHNlcnZlclVybCwgaHR0cFN0YXR1cyk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiaHR0cEhlYWRlcnMgOiBcIiArIGh0dHBIZWFkZXJzKVxyXG4gICAgICAgIHJldHVybiBuZWVkUmVsb2FkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+H5ruk5LiN6ZyA6KaB5by5dGlwc+mUmeivr+eahOWfn+WQjVxyXG4gICAgcHJpdmF0ZSBpc0hvc3RXaXRoTm9UaXBzKHVybCwgaHR0cFN0YXR1cykge1xyXG4gICAgICAgIGlmIChodHRwU3RhdHVzID09IDAgfHwgaHR0cFN0YXR1cyA9PSAzMDcgfHwgaHR0cFN0YXR1cyA9PSAzMDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgaWYgKCh1cmwuaW5kZXhPZihcImh0dHBkbnNcIikgPiAtMSkgfHwgdXJsLmluZGV4T2YoXCJpcC4zNjAuY25cIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat6ZO+5o6l5piv5ZCm5pivZGF0YVVybFxyXG4gICAgcHJpdmF0ZSBjaGVja0lzRGF0YVVybCh1cmwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXVybClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBkYXRhTGlzdCA9IEdsb2JhbC5TZXR0aW5nLmRhdGFVcmxzTGlzdDtcclxuICAgICAgICBpZighZGF0YUxpc3QpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YUxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhTGlzdFtpXS5pbmRleE9mKHVybCkgPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldEVycm9yKHVybDogc3RyaW5nLCBvbkNvbXBsZXRlOiBGdW5jdGlvbiwgb25FcnJvciwgcGFyYW0sIHJldHJ5VGltZSkge1xyXG4gICAgICAgIHJldHJ5VGltZSsrO1xyXG4gICAgICAgIGlmIChyZXRyeVRpbWUgPj0gMikge1xyXG4gICAgICAgICAgICBpZiAob25FcnJvcilcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRXaXRoUmV0cnkodXJsLCBvbkNvbXBsZXRlLCBvbkVycm9yLCBwYXJhbSwgcmV0cnlUaW1lKTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VuZENvbnRlbnQocGFyYW0pIHtcclxuICAgICAgICBpZiAocGFyYW0gPT0gbnVsbCB8fCBwYXJhbSA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodHlwZW9mIChwYXJhbSkgPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbSlcclxuXHJcbiAgICB9XHJcbn0iXX0=