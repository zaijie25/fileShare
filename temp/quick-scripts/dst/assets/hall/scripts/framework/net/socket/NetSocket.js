
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/socket/NetSocket.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d2806/oElP2oUAye/G4BDD', 'NetSocket');
// hall/scripts/framework/net/socket/NetSocket.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetSocket = exports.NetStatus = void 0;
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var NetStatus;
(function (NetStatus) {
    NetStatus[NetStatus["close"] = 0] = "close";
    NetStatus[NetStatus["connecting"] = 1] = "connecting";
    NetStatus[NetStatus["connected"] = 2] = "connected";
})(NetStatus = exports.NetStatus || (exports.NetStatus = {}));
var NetSocket = /** @class */ (function () {
    function NetSocket(url, routes, cerPath) {
        if (routes === void 0) { routes = null; }
        if (cerPath === void 0) { cerPath = null; }
        this._useBinary = false;
        this._startTime = 0;
        this._endTime = 0;
        //消息发送数量
        this._sendCount = 0;
        //消息接收数量
        this._resvCount = 0;
        this._url = url;
        this._serverRoute = routes;
        this._cerPath = cerPath;
    }
    Object.defineProperty(NetSocket.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    NetSocket.prototype.init = function (target, onMesage, onOpen, onError, onClose, useBinary) {
        if (useBinary === void 0) { useBinary = false; }
        this._target = target;
        this._onMessage = onMesage;
        this._onOpen = onOpen;
        this._onError = onError;
        this._onClose = onClose;
        this._useBinary = useBinary;
    };
    Object.defineProperty(NetSocket.prototype, "isConnected", {
        get: function () {
            return this.status == NetStatus.connected;
        },
        enumerable: false,
        configurable: true
    });
    NetSocket.prototype.send = function (msg) {
        Logger.log("Send Socket:", msg);
        if (this._socket != null && this.isConnected) {
            this._socket.send(msg);
            this._sendCount++;
        }
    };
    Object.defineProperty(NetSocket.prototype, "usePb", {
        get: function () {
            return this._useBinary;
        },
        enumerable: false,
        configurable: true
    });
    NetSocket.prototype.connect = function () {
        var _this = this;
        this._startTime = new Date().valueOf();
        if (CC_JSB) {
            var pemUrl = Global.UrlUtil.getCacertPath();
            // if (this._cerPath){
            //     pemUrl = this._cerPath
            // }
            Logger.error("------------pemUrl", pemUrl);
            this._socket = new WebSocket(this._url, {}, pemUrl);
        }
        else
            this._socket = new WebSocket(this._url);
        if (this._useBinary) {
            this._socket.binaryType = "arraybuffer";
        }
        this._socket.onopen = function () {
            _this._status = NetStatus.connected;
            if (_this._onOpen)
                _this._onOpen.call(_this._target);
        };
        this._socket.onclose = function (env) {
            _this._endTime = new Date().valueOf();
            var htime = _this._endTime - _this._startTime;
            if (env && env.reason) {
                Logger.error("net socket is closed", env.reason);
                //let reportParam = { "error_code": 0, "reason":  env.reason, "url": this._url,"htime":htime }
                var reportParam = _this.getReportParam(0, env.reason, htime);
                var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_SOCKET_ERROR;
                Global.ReportTool.ReportClientError(reportKey, reportParam);
            }
            Logger.error("net socket is closed");
            _this._status = NetStatus.close;
            if (_this._onClose)
                _this._onClose.call(_this._target);
            return null;
        };
        this._socket.onerror = function (env) {
            _this._endTime = new Date().valueOf();
            var htime = _this._endTime - _this._startTime;
            if (env) {
                var reason = "";
                try {
                    // reason = JSON.stringify(env)
                    // Logger.error("net socket error reason", reason);
                    // let reportParam = { "error_code": -1, "reason": reason, "url": this._url,"htime":htime }
                    var reportParam = _this.getReportParam(-1, reason, htime);
                    var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_SOCKET_ERROR;
                    Global.ReportTool.ReportClientError(reportKey, reportParam);
                }
                catch (e) {
                    // let reportParam = { "error_code": -1, "reason": "no reason 1", "url": this._url ,"htime":htime}
                    var reportParam = _this.getReportParam(-1, "no reason 1", htime);
                    var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_SOCKET_ERROR;
                    Global.ReportTool.ReportClientError(reportKey, reportParam);
                }
            }
            else {
                // let reportParam = { "error_code": -1, "reason": "no reason 2", "url": this._url,"htime":htime }
                var reportParam = _this.getReportParam(-1, "no reason 2", htime);
                var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_SOCKET_ERROR;
                Global.ReportTool.ReportClientError(reportKey, reportParam);
            }
            Logger.error("net socket error reason");
            _this._status = NetStatus.close;
            if (_this._onError)
                _this._onError.call(_this._target);
        };
        this._socket.onmessage = function (e) {
            if (!e || !e.data)
                return;
            _this.onMessage(e.data);
        };
        this._status = NetStatus.connecting;
    };
    NetSocket.prototype.getReportParam = function (errorCode, reason, htime) {
        var param = {};
        param.error_code = errorCode;
        param.reason = reason;
        param.url = this._url;
        param.htime = htime;
        param.sCount = this._sendCount;
        param.rCount = this._resvCount;
        //区分链接成功断开 和 链接未成功
        if (this._resvCount > 0) {
            param.error_code = -2;
        }
        if (this._serverRoute) {
            param.port = this._serverRoute.port;
            param.us_port = this._serverRoute.us_port;
            param.lo_port = this._serverRoute.lo_port;
            param.host = this._serverRoute.realHost;
            param.addr_host = this._serverRoute.host;
        }
        return param;
    };
    NetSocket.prototype.onMessage = function (data) {
        this._resvCount++;
        //data 格式化？
        if (this._onMessage)
            this._onMessage.call(this._target, data);
    };
    NetSocket.prototype.cleanSocket = function () {
        this.close();
        if (this._socket) {
            // this._socket.onclose = null;
            // this._socket.onmessage = null;
            // this._socket.onopen = null;
            // this._socket.onerror = null;
            this._socket = null;
        }
        this.cleanCallback();
    };
    NetSocket.prototype.cleanCallback = function () {
        this._useBinary = false;
        this._onMessage = null;
        this._onClose = null;
        this._onMessage = null;
        this._onError = null;
    };
    NetSocket.prototype.close = function () {
        if (cc.sys.isObjectValid(this._socket)) {
            try {
                this._socket.close();
            }
            catch (e) {
            }
        }
    };
    return NetSocket;
}());
exports.NetSocket = NetSocket;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXHNvY2tldFxcTmV0U29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUFpRTtBQUdqRSxJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFFakIsMkNBQVMsQ0FBQTtJQUNULHFEQUFjLENBQUE7SUFDZCxtREFBYSxDQUFBO0FBQ2pCLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVEO0lBc0JJLG1CQUFZLEdBQVUsRUFBRSxNQUE2QixFQUFDLE9BQWM7UUFBNUMsdUJBQUEsRUFBQSxhQUE2QjtRQUFDLHdCQUFBLEVBQUEsY0FBYztRQVg1RCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLFFBQVE7UUFDQSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVE7UUFDQSxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBTW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO0lBQzNCLENBQUM7SUFFRCxzQkFBVyw2QkFBTTthQUFqQjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVNLHdCQUFJLEdBQVgsVUFBWSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQWlCO1FBQWpCLDBCQUFBLEVBQUEsaUJBQWlCO1FBRXJFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxD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UUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU0seUJBQUssR0FBWjtRQUdJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUNyQztZQUNJLElBQ0E7Z0JBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtZQUNELE9BQU0sQ0FBQyxFQUNQO2FBRUM7U0FDSjtJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBNU5BLEFBNE5DLElBQUE7QUE1TlksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvcnRUb29sIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9SZXBvcnRUb29sXCI7XHJcbmltcG9ydCB7IFNlcnZlclJvdXRlSW5mbyB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcblxyXG5leHBvcnQgZW51bSBOZXRTdGF0dXNcclxue1xyXG4gICAgY2xvc2UgPSAwLFxyXG4gICAgY29ubmVjdGluZyA9IDEsXHJcbiAgICBjb25uZWN0ZWQgPSAyLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmV0U29ja2V0XHJcbntcclxuICAgIHByaXZhdGUgX3NvY2tldDogV2ViU29ja2V0O1xyXG4gICAgcHJpdmF0ZSBfdXJsOnN0cmluZztcclxuICAgIHByaXZhdGUgX2NlclBhdGg6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc3RhdHVzOk5ldFN0YXR1cztcclxuICAgIHByaXZhdGUgX29uT3BlbjpGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgX29uTWVzc2FnZTpGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgX29uQ2xvc2U6RnVuY3Rpb247XHJcbiAgICBwcml2YXRlIF9vbkVycm9yOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0OmFueTtcclxuICAgIHByaXZhdGUgX3VzZUJpbmFyeSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRUaW1lID0gMDtcclxuICAgIHByaXZhdGUgX2VuZFRpbWUgPSAwO1xyXG5cclxuICAgIC8v5raI5oGv5Y+R6YCB5pWw6YePXHJcbiAgICBwcml2YXRlIF9zZW5kQ291bnQgPSAwO1xyXG4gICAgLy/mtojmga/mjqXmlLbmlbDph49cclxuICAgIHByaXZhdGUgX3Jlc3ZDb3VudCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VydmVyUm91dGU6U2VydmVyUm91dGVJbmZvO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVybDpzdHJpbmcsIHJvdXRlczpTZXJ2ZXJSb3V0ZUluZm8gPSBudWxsLGNlclBhdGggPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJSb3V0ZSA9IHJvdXRlcztcclxuICAgICAgICB0aGlzLl9jZXJQYXRoID0gY2VyUGF0aFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhdHVzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHRhcmdldCwgb25NZXNhZ2UsIG9uT3Blbiwgb25FcnJvciwgb25DbG9zZSwgdXNlQmluYXJ5ID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuX29uTWVzc2FnZSA9IG9uTWVzYWdlO1xyXG4gICAgICAgIHRoaXMuX29uT3BlbiA9IG9uT3BlbjtcclxuICAgICAgICB0aGlzLl9vbkVycm9yID0gb25FcnJvcjtcclxuICAgICAgICB0aGlzLl9vbkNsb3NlID0gb25DbG9zZTtcclxuICAgICAgICB0aGlzLl91c2VCaW5hcnkgPSB1c2VCaW5hcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0Nvbm5lY3RlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHVzID09IE5ldFN0YXR1cy5jb25uZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQobXNnKVxyXG4gICAge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJTZW5kIFNvY2tldDpcIiwgbXNnKTtcclxuICAgICAgICBpZih0aGlzLl9zb2NrZXQgIT0gbnVsbCAmJiB0aGlzLmlzQ29ubmVjdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fc29ja2V0LnNlbmQobXNnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZENvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXNlUGIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VCaW5hcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpXHJcbiAgICAgICAgaWYoQ0NfSlNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwZW1VcmwgPSBHbG9iYWwuVXJsVXRpbC5nZXRDYWNlcnRQYXRoKCk7XHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9jZXJQYXRoKXtcclxuICAgICAgICAgICAgLy8gICAgIHBlbVVybCA9IHRoaXMuX2NlclBhdGhcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCItLS0tLS0tLS0tLS1wZW1VcmxcIiwgcGVtVXJsKVxyXG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuX3VybCx7fSwgcGVtVXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuX3VybCk7XHJcbiAgICAgICAgaWYodGhpcy5fdXNlQmluYXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fc29ja2V0LmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NvY2tldC5vbm9wZW4gPSAoKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSBOZXRTdGF0dXMuY29ubmVjdGVkO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9vbk9wZW4pXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbk9wZW4uY2FsbCh0aGlzLl90YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zb2NrZXQub25jbG9zZSA9IChlbnY6Q2xvc2VFdmVudCk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpXHJcbiAgICAgICAgICAgIGxldCBodGltZSA9IHRoaXMuX2VuZFRpbWUgLSB0aGlzLl9zdGFydFRpbWVcclxuICAgICAgICAgICAgaWYoZW52ICYmIGVudi5yZWFzb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm5ldCBzb2NrZXQgaXMgY2xvc2VkXCIsIGVudi5yZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcmVwb3J0UGFyYW0gPSB7IFwiZXJyb3JfY29kZVwiOiAwLCBcInJlYXNvblwiOiAgZW52LnJlYXNvbiwgXCJ1cmxcIjogdGhpcy5fdXJsLFwiaHRpbWVcIjpodGltZSB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB0aGlzLmdldFJlcG9ydFBhcmFtKDAsIGVudi5yZWFzb24sIGh0aW1lKVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcG9ydEtleSA9IFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfU09DS0VUX0VSUk9SXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihyZXBvcnRLZXksIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm5ldCBzb2NrZXQgaXMgY2xvc2VkXCIpXHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IE5ldFN0YXR1cy5jbG9zZTtcclxuICAgICAgICAgICAgaWYodGhpcy5fb25DbG9zZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UuY2FsbCh0aGlzLl90YXJnZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc29ja2V0Lm9uZXJyb3IgPSAoZW52OkV2ZW50KT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKClcclxuICAgICAgICAgICAgbGV0IGh0aW1lID0gdGhpcy5fZW5kVGltZSAtIHRoaXMuX3N0YXJ0VGltZVxyXG4gICAgICAgICAgICBpZihlbnYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWFzb24gPSBcIlwiXHJcbiAgICAgICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWFzb24gPSBKU09OLnN0cmluZ2lmeShlbnYpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwibmV0IHNvY2tldCBlcnJvciByZWFzb25cIiwgcmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmVwb3J0UGFyYW0gPSB7IFwiZXJyb3JfY29kZVwiOiAtMSwgXCJyZWFzb25cIjogcmVhc29uLCBcInVybFwiOiB0aGlzLl91cmwsXCJodGltZVwiOmh0aW1lIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB0aGlzLmdldFJlcG9ydFBhcmFtKC0xLCByZWFzb24sIGh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXBvcnRLZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX1NPQ0tFVF9FUlJPUlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKHJlcG9ydEtleSwgcmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtID0geyBcImVycm9yX2NvZGVcIjogLTEsIFwicmVhc29uXCI6IFwibm8gcmVhc29uIDFcIiwgXCJ1cmxcIjogdGhpcy5fdXJsICxcImh0aW1lXCI6aHRpbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0gdGhpcy5nZXRSZXBvcnRQYXJhbSgtMSwgXCJubyByZWFzb24gMVwiLCBodGltZSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9TT0NLRVRfRVJST1JcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihyZXBvcnRLZXksIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmVwb3J0UGFyYW0gPSB7IFwiZXJyb3JfY29kZVwiOiAtMSwgXCJyZWFzb25cIjogXCJubyByZWFzb24gMlwiLCBcInVybFwiOiB0aGlzLl91cmwsXCJodGltZVwiOmh0aW1lIH1cclxuICAgICAgICAgICAgICAgIGxldCByZXBvcnRQYXJhbSA9IHRoaXMuZ2V0UmVwb3J0UGFyYW0oLTEsIFwibm8gcmVhc29uIDJcIiwgaHRpbWUpXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0S2V5ID0gUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9TT0NLRVRfRVJST1JcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKHJlcG9ydEtleSwgcmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibmV0IHNvY2tldCBlcnJvciByZWFzb25cIilcclxuICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gTmV0U3RhdHVzLmNsb3NlO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9vbkVycm9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvci5jYWxsKHRoaXMuX3RhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NvY2tldC5vbm1lc3NhZ2UgPSAoZSk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWUgfHwgIWUuZGF0YSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UoZS5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gTmV0U3RhdHVzLmNvbm5lY3Rpbmc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmVwb3J0UGFyYW0oZXJyb3JDb2RlLCByZWFzb24sIGh0aW1lKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXJhbTphbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLmVycm9yX2NvZGUgPSBlcnJvckNvZGU7XHJcbiAgICAgICAgcGFyYW0ucmVhc29uID0gcmVhc29uO1xyXG4gICAgICAgIHBhcmFtLnVybCA9IHRoaXMuX3VybDtcclxuICAgICAgICBwYXJhbS5odGltZSA9IGh0aW1lO1xyXG4gICAgICAgIHBhcmFtLnNDb3VudCA9IHRoaXMuX3NlbmRDb3VudDtcclxuICAgICAgICBwYXJhbS5yQ291bnQgPSB0aGlzLl9yZXN2Q291bnQ7XHJcbiAgICAgICAgLy/ljLrliIbpk77mjqXmiJDlip/mlq3lvIAg5ZKMIOmTvuaOpeacquaIkOWKn1xyXG4gICAgICAgIGlmKHRoaXMuX3Jlc3ZDb3VudCA+IDApe1xyXG4gICAgICAgICAgICBwYXJhbS5lcnJvcl9jb2RlID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fc2VydmVyUm91dGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwYXJhbS5wb3J0ID0gdGhpcy5fc2VydmVyUm91dGUucG9ydDtcclxuICAgICAgICAgICAgcGFyYW0udXNfcG9ydCA9IHRoaXMuX3NlcnZlclJvdXRlLnVzX3BvcnQ7XHJcbiAgICAgICAgICAgIHBhcmFtLmxvX3BvcnQgPSB0aGlzLl9zZXJ2ZXJSb3V0ZS5sb19wb3J0O1xyXG4gICAgICAgICAgICBwYXJhbS5ob3N0ID0gdGhpcy5fc2VydmVyUm91dGUucmVhbEhvc3Q7XHJcbiAgICAgICAgICAgIHBhcmFtLmFkZHJfaG9zdCA9IHRoaXMuX3NlcnZlclJvdXRlLmhvc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3Jlc3ZDb3VudCsrO1xyXG4gICAgICAgIC8vZGF0YSDmoLzlvI/ljJbvvJ9cclxuICAgICAgICBpZih0aGlzLl9vbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIHRoaXMuX29uTWVzc2FnZS5jYWxsKHRoaXMuX3RhcmdldCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuU29ja2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgaWYodGhpcy5fc29ja2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5fc29ja2V0Lm9uY2xvc2UgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9zb2NrZXQub25tZXNzYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gdGhpcy5fc29ja2V0Lm9ub3BlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3NvY2tldC5vbmVycm9yID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhbkNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuQ2FsbGJhY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3VzZUJpbmFyeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX29uTWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb25DbG9zZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb25NZXNzYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9vbkVycm9yID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGNjLnN5cy5pc09iamVjdFZhbGlkKHRoaXMuX3NvY2tldCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2goZSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==