"use strict";
cc._RF.push(module, '783f3T/K3xNVqPVjtHI0UTU', 'Logger');
// hall/scripts/framework/debug/Logger.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Log"] = 1] = "Log";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Net"] = 4] = "Net";
    LogLevel[LogLevel["Error"] = 8] = "Error";
    LogLevel[LogLevel["All"] = 255] = "All";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.logObj = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var logger = console.log || cc.log;
        if (this.logEnable && this.logLevel & LogLevel.Log) {
            logger.call(this, this.getLogContent(args), obj);
        }
    };
    Logger.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = console.log || cc.log;
        if (this.logEnable && this.logLevel & LogLevel.Log) {
            logger.call(this, this.getLogContent(args));
        }
    };
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = console.warn || cc.warn;
        if (this.logEnable && this.logLevel & LogLevel.Warn) {
            logger.call(this, this.getLogContent(args));
        }
    };
    Logger.net = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = console.log || cc.log;
        if (this.logEnable && this.logLevel & LogLevel.Net) {
            logger.call(this, this.getLogContent(args));
        }
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = console.error || cc.error;
        if (this.logEnable && this.logLevel & LogLevel.Error) {
            logger.call(this, this.getLogContent(args));
        }
    };
    Logger.getLogContent = function (args) {
        for (var i = args.length - 1; i >= 0; i--) {
            if (typeof (args[i]) != "string" && typeof (args[i]) != "number") {
                cc.error("getLogContent error !!! can not push object !!!");
                args.splice(i, 1);
            }
        }
        var content = this.getDateStr() + args.join("\t,");
        return content;
    };
    Logger.getDateStr = function () {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1)
            str = "00" + str;
        if (str.length == 2)
            str = "0" + str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    };
    Logger.logLevel = LogLevel.All;
    Logger.logEnable = true;
    return Logger;
}());
exports.Logger = Logger;

cc._RF.pop();