"use strict";
cc._RF.push(module, 'fc987EkOJhIcYeBCn58XbAz', 'HttpRequest');
// hall/scripts/framework/net/http/HttpRequest.ts

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
var EventDispatcher_1 = require("../../event/EventDispatcher");
var Logger_1 = require("../../debug/Logger");
var HttpRequest = /** @class */ (function (_super) {
    __extends(HttpRequest, _super);
    function HttpRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._http = new XMLHttpRequest;
        _this._startTime = 0;
        _this._endTime = 0;
        _this.isError = false;
        return _this;
    }
    Object.defineProperty(HttpRequest.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    HttpRequest.prototype.send = function (serverUrl, data, method, responseType, headers) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "get"; }
        if (responseType === void 0) { responseType = "text"; }
        if (headers === void 0) { headers = null; }
        this._responseType = responseType;
        this._data = null;
        // Logger.error("Global.Http.cookie  = " + Global.Http.cookie)
        var url = "";
        var requestInfo = Global.DNS.getHttpRequestDNSInfo(serverUrl, 0);
        if (requestInfo != null && requestInfo.headerMap != null) {
            url = requestInfo.realUrl;
            var headerMap = requestInfo.headerMap;
            if (headerMap != null) {
                if (Global.Http.cookie) {
                    headerMap["Cookie"] = Global.Http.cookie;
                }
                var headerStr = JSON.stringify(headerMap);
                Logger_1.Logger.error("header 1 is !!!!", headerStr);
                Global.NativeEvent.setRequestProperty(headerStr);
                for (var key in headerMap) {
                    var value = headerMap[key];
                    this._http.setRequestHeader(key, value);
                }
            }
        }
        else {
            if (Global.Http.cookie) {
                var headerMap = { "Cookie": Global.Http.cookie };
                var headerStr = JSON.stringify(headerMap);
                Logger_1.Logger.error("header 2 is !!!!", headerStr);
                Global.NativeEvent.setRequestProperty(headerStr);
                for (var key in headerMap) {
                    var value = headerMap[key];
                    this._http.setRequestHeader(key, value);
                }
            }
        }
        var headSign = null;
        var sign_url = null;
        if (serverUrl.isInnerRequest) {
            var httpSignInfo = Global.UrlUtil.dealHttpSign(serverUrl);
            headSign = httpSignInfo.headSign;
            sign_url = httpSignInfo.sign_url;
        }
        else {
            sign_url = serverUrl.getUrl();
        }
        if (!sign_url) {
            Logger_1.Logger.error("http send sign_url error " + sign_url);
            return;
        }
        // Logger.error("send url", sign_url);
        url = sign_url;
        this._url = sign_url;
        var http = this._http;
        //更新链接和header信息
        http.open(method, url, true);
        if (headers && headers.length > 0) {
            for (var i = 0; i < headers.length; i++) {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        else {
            http.setRequestHeader("Content-Type", "text/plain");
        }
        if (cc.sys.isNative && headSign) {
            http.setRequestHeader("Summor", headSign);
        }
        //  if(url.indexOf("mini")>=0){
        //     http.setRequestHeader("Summor", httpSign);
        //  }
        http.responseType = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.onreadystatechange = this.onReadyStateChange.bind(this);
        http.send(data);
        http.onerror = function (e) {
            _this.onError("onerror " + "[" + _this._http.status + "]" + _this._http.statusText + ":" + _this._http.responseURL);
        };
        this._startTime = new Date().valueOf();
        http.ontimeout = function (e) { _this.httpEvent("ontimeout", e); };
    };
    HttpRequest.prototype.setTimeout = function (timeout) {
        var _this = this;
        this.clearTimer();
        if (this._http) {
            this._http.timeout = timeout;
            this._timeOut = setTimeout(function () {
                _this.onError("request timeout  " + 0);
            }, timeout);
        }
    };
    HttpRequest.prototype.clearTimer = function () {
        if (this._timeOut) {
            clearTimeout(this._timeOut);
            this._timeOut = null;
        }
    };
    HttpRequest.prototype.httpEvent = function (type, event) {
        Logger_1.Logger.error(type, event);
        this.onError("request timeout  " + 0);
    };
    HttpRequest.prototype.onReadyStateChange = function () {
        if (this._http.readyState == 4) {
            this._endTime = new Date().valueOf();
            this.clearTimer();
            if (this._http.status >= 200 && this._http.status < 300) {
                this.onComplete();
            }
            else {
                this.onError("onReadyStateChange " + "[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL);
            }
        }
    };
    HttpRequest.prototype.onError = function (content) {
        this.clearTimer();
        this._endTime = new Date().valueOf();
        Logger_1.Logger.error("onError():" + content, this._url);
        if (this.isError) {
            return;
        }
        this.isError = true;
        var hTime = this._endTime - this._startTime;
        this.event(HttpRequest.EVENT_ERROR, this._http, hTime);
        this.clear();
    };
    HttpRequest.prototype.onComplete = function () {
        this.clearTimer();
        var flag = true;
        try {
            if (this._responseType === "json") {
                this._data = JSON.parse(this._http.responseText);
                //暂不支持xml
                // } else if (this._responType === "xml") {
                // 	this._data = Utils.parseXMLFromString(this._http.responseText);
            }
            else {
                this._data = this._http.response || this._http.responseText;
            }
        }
        catch (e) {
            flag = false;
            this.onError(e);
        }
        flag && this.event(HttpRequest.EVENT_COMPLETE, this._data instanceof Array ? [this._data] : this._data);
        this.clear();
    };
    HttpRequest.prototype.clear = function () {
        this._http.onreadystatechange = null;
        this.offAll("");
    };
    HttpRequest.EVENT_COMPLETE = "complete";
    HttpRequest.EVENT_ERROR = "error";
    return HttpRequest;
}(EventDispatcher_1.default));
exports.default = HttpRequest;

cc._RF.pop();