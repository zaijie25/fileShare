
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/debug/Logger.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxkZWJ1Z1xcTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksUUFRWDtBQVJELFdBQVksUUFBUTtJQUVoQix1Q0FBUSxDQUFBO0lBQ1IscUNBQVUsQ0FBQTtJQUNWLHVDQUFXLENBQUE7SUFDWCxxQ0FBVSxDQUFBO0lBQ1YseUNBQVksQ0FBQTtJQUNaLHVDQUFVLENBQUE7QUFDZCxDQUFDLEVBUlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFRbkI7QUFFRDtJQUFBO0lBa0ZBLENBQUM7SUE3RWlCLGFBQU0sR0FBcEIsVUFBcUIsR0FBRztRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBRTdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUNqRDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBRWEsVUFBRyxHQUFqQjtRQUFrQixjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUVyQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDbkMsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFDakQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxD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QUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDaEQsR0FBRyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUUsQ0FBQztZQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUMsR0FBRyxDQUFDO1FBQ25DLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBRSxDQUFDO1lBQUcsR0FBRyxHQUFHLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDbEMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUVmLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUM5QixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBL0VhLGVBQVEsR0FBWSxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQ2pDLGdCQUFTLEdBQUcsSUFBSSxDQUFDO0lBK0VuQyxhQUFDO0NBbEZELEFBa0ZDLElBQUE7QUFsRlksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBMb2dMZXZlbFxyXG57XHJcbiAgICBOb25lID0gMCxcclxuICAgIExvZyA9IDB4MDEsXHJcbiAgICBXYXJuID0gMHgwMixcclxuICAgIE5ldCA9IDB4MDQsXHJcbiAgICBFcnJvciA9IDB4MDgsXHJcbiAgICBBbGwgPSAweGZmLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nZ2VyIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGxvZ0xldmVsOkxvZ0xldmVsID0gTG9nTGV2ZWwuQWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2dFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nT2JqKG9iaiwgLi4uYXJncylcclxuICAgIHtcclxuICAgICAgICBsZXQgbG9nZ2VyID0gY29uc29sZS5sb2cgfHwgY2MubG9nO1xyXG4gICAgICAgIGlmKHRoaXMubG9nRW5hYmxlICYmIHRoaXMubG9nTGV2ZWwgJiBMb2dMZXZlbC5Mb2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsb2dnZXIuY2FsbCh0aGlzLCB0aGlzLmdldExvZ0NvbnRlbnQoYXJncyksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxvZ2dlciA9IGNvbnNvbGUubG9nIHx8IGNjLmxvZztcclxuICAgICAgICBpZih0aGlzLmxvZ0VuYWJsZSAmJiB0aGlzLmxvZ0xldmVsICYgTG9nTGV2ZWwuTG9nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmNhbGwodGhpcywgdGhpcy5nZXRMb2dDb250ZW50KGFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3YXJuKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxvZ2dlciA9IGNvbnNvbGUud2FybiB8fCBjYy53YXJuO1xyXG4gICAgICAgIGlmKHRoaXMubG9nRW5hYmxlICYmIHRoaXMubG9nTGV2ZWwgJiBMb2dMZXZlbC5XYXJuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmNhbGwodGhpcywgdGhpcy5nZXRMb2dDb250ZW50KGFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBuZXQoLi4uYXJncylcclxuICAgIHtcclxuICAgICAgICBsZXQgbG9nZ2VyID0gY29uc29sZS5sb2cgfHwgY2MubG9nO1xyXG4gICAgICAgIGlmKHRoaXMubG9nRW5hYmxlICYmIHRoaXMubG9nTGV2ZWwgJiBMb2dMZXZlbC5OZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsb2dnZXIuY2FsbCh0aGlzLCB0aGlzLmdldExvZ0NvbnRlbnQoYXJncykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxvZ2dlciA9IGNvbnNvbGUuZXJyb3IgfHwgY2MuZXJyb3I7XHJcbiAgICAgICAgaWYodGhpcy5sb2dFbmFibGUgJiYgdGhpcy5sb2dMZXZlbCAmIExvZ0xldmVsLkVycm9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmNhbGwodGhpcywgdGhpcy5nZXRMb2dDb250ZW50KGFyZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TG9nQ29udGVudChhcmdzOmFueVtdKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IGFyZ3MubGVuZ3RoIC0gMTsgaSA+PTAgOyBpLS0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YoYXJnc1tpXSkgIT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YoYXJnc1tpXSkgIT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJnZXRMb2dDb250ZW50IGVycm9yICEhISBjYW4gbm90IHB1c2ggb2JqZWN0ICEhIVwiKTtcclxuICAgICAgICAgICAgICAgIGFyZ3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gIHRoaXMuZ2V0RGF0ZVN0cigpICArIGFyZ3Muam9pbihcIlxcdCxcIik7IFxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljICBnZXREYXRlU3RyKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIHN0ciA9IGQuZ2V0SG91cnMoKS50b1N0cmluZygpO1xyXG4gICAgICAgIHZhciB0aW1lU3RyID0gXCJcIjtcclxuICAgICAgICB0aW1lU3RyICs9IChzdHIubGVuZ3RoPT0xPyBcIjBcIitzdHIgOiBzdHIpICsgXCI6XCI7XHJcbiAgICAgICAgc3RyID0gZC5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcclxuICAgICAgICB0aW1lU3RyICs9IChzdHIubGVuZ3RoPT0xPyBcIjBcIitzdHIgOiBzdHIpICsgXCI6XCI7XHJcbiAgICAgICAgc3RyID0gZC5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKTtcclxuICAgICAgICB0aW1lU3RyICs9IChzdHIubGVuZ3RoPT0xPyBcIjBcIitzdHIgOiBzdHIpICsgXCI6XCI7XHJcbiAgICAgICAgc3RyID0gZC5nZXRNaWxsaXNlY29uZHMoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmKCBzdHIubGVuZ3RoPT0xICkgc3RyID0gXCIwMFwiK3N0cjtcclxuICAgICAgICBpZiggc3RyLmxlbmd0aD09MiApIHN0ciA9IFwiMFwiK3N0cjtcclxuICAgICAgICB0aW1lU3RyICs9IHN0cjtcclxuICAgIFxyXG4gICAgICAgIHRpbWVTdHIgPSBcIltcIiArIHRpbWVTdHIgKyBcIl1cIjtcclxuICAgICAgICByZXR1cm4gdGltZVN0cjtcclxuICAgIH1cclxufSJdfQ==