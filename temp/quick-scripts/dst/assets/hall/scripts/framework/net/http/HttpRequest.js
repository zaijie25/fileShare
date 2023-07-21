
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/http/HttpRequest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGh0dHBcXEh0dHBSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCw2Q0FBNEM7QUFHNUM7SUFBeUMsK0JBQWU7SUFBeEQ7UUFBQSxxRUFpTUM7UUE3TFcsV0FBSyxHQUFtQixJQUFJLGNBQWMsQ0FBQztRQUkzQyxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFHckIsYUFBTyxHQUFHLEtBQUssQ0FBQzs7SUFxTHBCLENBQUM7SUFuTEcsc0JBQVcsNkJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRCQUFHO2FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFTSwwQkFBSSxHQUFYLFVBQVksU0FBb0IsRUFBRSxJQUFnQixFQUFFLE1BQXNCLEVBQUUsWUFBcUIsRUFBRSxPQUFrQjtRQUFySCxpQkE2RkM7UUE3RmlDLHFCQUFBLEVBQUEsV0FBZ0I7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQUUsNkJBQUEsRUFBQSxxQkFBcUI7UUFBRSx3QkFBQSxFQUFBLGNBQWtCO1FBQ2pILElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLDhEQUE4RDtRQUM5RCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFHLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQ3ZEO1lBQ0ks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SSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNsQjtRQUNELElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTywyQkFBSyxHQUFiO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVuQixDQUFDO0lBOUxhLDBCQUFjLEdBQUcsVUFBVSxDQUFDO0lBQzVCLHVCQUFXLEdBQUcsT0FBTyxDQUFDO0lBK0x4QyxrQkFBQztDQWpNRCxBQWlNQyxDQWpNd0MseUJBQWUsR0FpTXZEO2tCQWpNb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uL2V2ZW50L0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vLi4vZGVidWcvTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFNlcnZlclVybCB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwUmVxdWVzdCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9FUlJPUiA9IFwiZXJyb3JcIjtcclxuXHJcbiAgICBwcml2YXRlIF9odHRwOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcclxuICAgIHByaXZhdGUgX2RhdGE6IGFueTtcclxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcmVzcG9uc2VUeXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zdGFydFRpbWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBfZW5kVGltZSA9IDA7XHJcblxyXG4gICAgX3RpbWVPdXQ6YW55XHJcbiAgICBpc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQoc2VydmVyVXJsOiBTZXJ2ZXJVcmwsIGRhdGE6IGFueSA9IG51bGwsIG1ldGhvZDogc3RyaW5nID0gXCJnZXRcIiwgcmVzcG9uc2VUeXBlID0gXCJ0ZXh0XCIsIGhlYWRlcnM6IFtdID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJHbG9iYWwuSHR0cC5jb29raWUgID0gXCIgKyBHbG9iYWwuSHR0cC5jb29raWUpXHJcbiAgICAgICAgbGV0IHVybCA9IFwiXCJcclxuICAgICAgICBsZXQgcmVxdWVzdEluZm8gPSBHbG9iYWwuRE5TLmdldEh0dHBSZXF1ZXN0RE5TSW5mbyhzZXJ2ZXJVcmwsMCk7XHJcbiAgICAgICAgaWYocmVxdWVzdEluZm8gIT0gbnVsbCAmJiByZXF1ZXN0SW5mby5oZWFkZXJNYXAgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybCA9IHJlcXVlc3RJbmZvLnJlYWxVcmw7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXJNYXAgPSByZXF1ZXN0SW5mby5oZWFkZXJNYXA7XHJcbiAgICAgICAgICAgIGlmKGhlYWRlck1hcCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLkh0dHAuY29va2llKXtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJNYXBbXCJDb29raWVcIl0gPSBHbG9iYWwuSHR0cC5jb29raWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJTdHIgPSBKU09OLnN0cmluZ2lmeShoZWFkZXJNYXApO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaGVhZGVyIDEgaXMgISEhIVwiLCBoZWFkZXJTdHIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnNldFJlcXVlc3RQcm9wZXJ0eShoZWFkZXJTdHIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGhlYWRlck1hcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gaGVhZGVyTWFwW2tleV1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9odHRwLnNldFJlcXVlc3RIZWFkZXIoa2V5LHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuSHR0cC5jb29raWUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlck1hcCA9IHtcIkNvb2tpZVwiOkdsb2JhbC5IdHRwLmNvb2tpZX1cclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJTdHIgPSBKU09OLnN0cmluZ2lmeShoZWFkZXJNYXApO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaGVhZGVyIDIgaXMgISEhIVwiLCBoZWFkZXJTdHIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnNldFJlcXVlc3RQcm9wZXJ0eShoZWFkZXJTdHIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBoZWFkZXJNYXApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGhlYWRlck1hcFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGtleSx2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVhZFNpZ24gPSBudWxsXHJcbiAgICAgICAgbGV0IHNpZ25fdXJsID0gbnVsbFxyXG4gICAgICAgIGlmIChzZXJ2ZXJVcmwuaXNJbm5lclJlcXVlc3Qpe1xyXG4gICAgICAgICAgICBsZXQgaHR0cFNpZ25JbmZvID0gR2xvYmFsLlVybFV0aWwuZGVhbEh0dHBTaWduKHNlcnZlclVybClcclxuICAgICAgICAgICAgaGVhZFNpZ24gPSBodHRwU2lnbkluZm8uaGVhZFNpZ25cclxuICAgICAgICAgICAgc2lnbl91cmwgPSBodHRwU2lnbkluZm8uc2lnbl91cmxcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHNpZ25fdXJsID0gc2VydmVyVXJsLmdldFVybCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghc2lnbl91cmwpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJodHRwIHNlbmQgc2lnbl91cmwgZXJyb3IgXCIgKyBzaWduX3VybClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJzZW5kIHVybFwiLCBzaWduX3VybCk7XHJcbiAgICAgICAgdXJsID0gc2lnbl91cmxcclxuICAgICAgICB0aGlzLl91cmwgPSBzaWduX3VybDtcclxuICAgICAgICBsZXQgaHR0cCA9IHRoaXMuX2h0dHA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/mm7TmlrDpk77mjqXlkoxoZWFkZXLkv6Hmga9cclxuICAgICAgICBcclxuICAgICAgICBodHRwLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChoZWFkZXJzICYmIGhlYWRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJzW2krK10sIGhlYWRlcnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYgaGVhZFNpZ24pe1xyXG4gICAgICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJTdW1tb3JcIiwgaGVhZFNpZ24pO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICBpZih1cmwuaW5kZXhPZihcIm1pbmlcIik+PTApe1xyXG4gICAgICAgIC8vICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJTdW1tb3JcIiwgaHR0cFNpZ24pO1xyXG4gICAgICAgIC8vICB9XHJcbiAgICAgICAgIFxyXG5cclxuICAgICAgICBodHRwLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSAhPT0gXCJhcnJheWJ1ZmZlclwiID8gXCJ0ZXh0XCIgOiBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGh0dHAuc2VuZChkYXRhKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaHR0cC5vbmVycm9yID0gKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwib25lcnJvciBcIiArIFwiW1wiICsgdGhpcy5faHR0cC5zdGF0dXMgKyBcIl1cIiArIHRoaXMuX2h0dHAuc3RhdHVzVGV4dCArIFwiOlwiICsgdGhpcy5faHR0cC5yZXNwb25zZVVSTClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKClcclxuICAgICAgICBodHRwLm9udGltZW91dCA9IChlKT0+eyB0aGlzLmh0dHBFdmVudChcIm9udGltZW91dFwiLCBlKX1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRpbWVvdXQodGltZW91dCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9odHRwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2h0dHAudGltZW91dCA9IHRpbWVvdXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihcInJlcXVlc3QgdGltZW91dCAgXCIgKyAwKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyVGltZXIoKXtcclxuICAgICAgICBpZiAodGhpcy5fdGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZU91dClcclxuICAgICAgICAgICAgdGhpcy5fdGltZU91dCA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBodHRwRXZlbnQodHlwZSwgZXZlbnQ6IFByb2dyZXNzRXZlbnQpIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IodHlwZSwgZXZlbnQpO1xyXG4gICAgICAgIHRoaXMub25FcnJvcihcInJlcXVlc3QgdGltZW91dCAgXCIgKyAwKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SZWFkeVN0YXRlQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9odHRwLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faHR0cC5zdGF0dXMgPj0gMjAwICYmIHRoaXMuX2h0dHAuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJvblJlYWR5U3RhdGVDaGFuZ2UgXCIgKyBcIltcIiArIHRoaXMuX2h0dHAuc3RhdHVzICsgXCJdXCIgKyB0aGlzLl9odHRwLnN0YXR1c1RleHQgKyBcIjpcIiArIHRoaXMuX2h0dHAucmVzcG9uc2VVUkwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKGNvbnRlbnQpIHtcclxuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcclxuICAgICAgICB0aGlzLl9lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwib25FcnJvcigpOlwiICsgY29udGVudCwgdGhpcy5fdXJsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0Vycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIGxldCBoVGltZSA9IHRoaXMuX2VuZFRpbWUgLSB0aGlzLl9zdGFydFRpbWVcclxuICAgICAgICB0aGlzLmV2ZW50KEh0dHBSZXF1ZXN0LkVWRU5UX0VSUk9SLCB0aGlzLl9odHRwLGhUaW1lKTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmbGFnOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlID09PSBcImpzb25cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IEpTT04ucGFyc2UodGhpcy5faHR0cC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy/mmoLkuI3mlK/mjIF4bWxcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy5fcmVzcG9uVHlwZSA9PT0gXCJ4bWxcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gXHR0aGlzLl9kYXRhID0gVXRpbHMucGFyc2VYTUxGcm9tU3RyaW5nKHRoaXMuX2h0dHAucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9odHRwLnJlc3BvbnNlIHx8IHRoaXMuX2h0dHAucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZsYWcgJiYgdGhpcy5ldmVudChIdHRwUmVxdWVzdC5FVkVOVF9DT01QTEVURSwgdGhpcy5fZGF0YSBpbnN0YW5jZW9mIEFycmF5ID8gW3RoaXMuX2RhdGFdIDogdGhpcy5fZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5faHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub2ZmQWxsKFwiXCIpXHJcbiAgICBcclxuICAgIH1cclxuXHJcbn0iXX0=