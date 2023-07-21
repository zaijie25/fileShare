"use strict";
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