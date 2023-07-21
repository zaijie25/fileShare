
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dun/ZADun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80641GWMqtI0pjbu24Sl34C', 'ZADun');
// hall/scripts/framework/net/dun/ZADun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var AppDunControl_1 = require("./AppDunControl");
var ZADun = /** @class */ (function () {
    function ZADun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "zadun";
        this._dunType = 0;
        this._dunType = dunType;
        Global.NativeEvent.isSupportSDK(this.sdkName, null, function (retObj) {
            if (retObj.result == 0) {
                _this._isSupport = true;
            }
            else {
                Logger.error("checkAppIsSupportDunByType dunType = " + dunType + " isSupport = false");
            }
        });
    }
    ZADun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    ZADun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg && cfg.key2) {
            return true;
        }
        return false;
    };
    //异步初始化
    ZADun.prototype.init = function (cfg, callback) {
        var _this = this;
        Logger.error("init ZADun SDK");
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init ZADun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init ZADun SDK this.isTDunInit  = true");
            return;
        }
        if (!this._isSupport) {
            Logger.error("init ZADun SDK is not support");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init ZADun SDK state = " + initState);
        var zaDunkey = cfg.key2;
        if (initState == AppDunControl_1.DUNSTATE.INIT) {
            // Logger.error("initZADunSDK")
            if (zaDunkey) {
                Global.NativeEvent.initZADunSDK(zaDunkey, function (retObj) {
                    // Logger.error("initZADunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        var result = Number(retObj.result);
                        if (result == 0 || result == 0.0) {
                            _this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.ZA_DUN, 1);
                            Logger.error("initZADunSDK ret = 0 success ");
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.ZA_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        }
                        else {
                            Logger.error("initZADunSDK ret != 0 failed ");
                            var funcParam = retObj.funcParam ? retObj.funcParam : "";
                            var reportParam = { "result": "ret != 0 " + result, "type": AppDunControl_1.DUNTYPE.ZA_DUN, "error_msg": funcParam };
                            Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                        }
                    }
                    else {
                        Logger.error("initZADunSDK retObj == null failed ");
                        var reportParam = { "result": "initZADunSDK retObj == null failed", "type": AppDunControl_1.DUNTYPE.ZA_DUN };
                        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam);
                    }
                    if (callback) {
                        callback();
                    }
                });
            }
        }
    };
    ZADun.prototype.getInitState = function () {
        if (!this._isSupport) {
            return AppDunControl_1.DUNSTATE.FAILED;
        }
        var ret = Global.NativeEvent.getZADunInitRet();
        return ret;
    };
    ZADun.prototype.getPort = function (lo_port) {
        //后续App添加了单独获取port方法
        var port = 0;
        port = Global.NativeEvent.getZADunPortByAddr("", lo_port);
        Logger.error("ZADun getPort port = " + port);
        return port;
    };
    ZADun.prototype.getServerIPAndPort = function (host, lo_port, attr) {
        if (!this.isDunInit) {
            Logger.error("ZADun getServerIPAndPort isDunInit = false");
            return;
        }
        var ip = "127.0.0.1";
        var port = this.getPort(lo_port);
        return { "ip": ip, "port": port };
    };
    ZADun.prototype.isInit = function () {
        if (!this._isSupport) {
            return false;
        }
        if (!this.isDunInit) {
            var ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    };
    return ZADun;
}());
exports.default = ZADun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGR1blxcWkFEdW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpRkFBNEU7QUFDNUUsa0VBQWlFO0FBQ2pFLGlEQUFvRDtBQUVwRDtJQU9JLGVBQVksT0FBTztRQUFuQixpQkFVQztRQWZPLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFHakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUE7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBQyxNQUFNO1lBQ3ZELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEdBQUcsT0FBTyxHQUFHLG9CQUFvQixDQUFDLENBQUE7YUFDekY7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFTyw0QkFBWSxHQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lBRU0sK0JBQWUsR0FBdEIsVUFBdUIsR0FBTztRQUMxQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTztJQUNBLG9CQUFJLEdBQVgsVUFBWSxHQUFHLEVBQUMsUUFBbUI7UUFBbkMsaUJBbURDO1FBbERHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMs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cnQgSUR1biBmcm9tIFwiLi9JRHVuXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vLi4vbG9naWMvaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgeyBSZXBvcnRUb29sIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9SZXBvcnRUb29sXCI7XHJcbmltcG9ydCB7IERVTlRZUEUsIERVTlNUQVRFIH0gZnJvbSBcIi4vQXBwRHVuQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWkFEdW4gaW1wbGVtZW50cyBJRHVuIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpc0R1bkluaXQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lzU3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzZGtOYW1lID0gXCJ6YWR1blwiO1xyXG4gICAgcHJpdmF0ZSBfZHVuVHlwZSA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZHVuVHlwZSl7XHJcbiAgICAgICAgdGhpcy5fZHVuVHlwZSA9IGR1blR5cGVcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuaXNTdXBwb3J0U0RLKHRoaXMuc2RrTmFtZSwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1N1cHBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tBcHBJc1N1cHBvcnREdW5CeVR5cGUgZHVuVHlwZSA9IFwiICsgZHVuVHlwZSArIFwiIGlzU3VwcG9ydCA9IGZhbHNlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgaXNBcHBTdXBwb3J0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3VwcG9ydFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0NmZ0lzVmFsaWQoY2ZnOmFueSl7XHJcbiAgICAgICAgaWYgKGNmZyAmJiBjZmcua2V5Mil7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvILmraXliJ3lp4vljJZcclxuICAgIHB1YmxpYyBpbml0KGNmZyxjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdCBaQUR1biBTREtcIilcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tDZmdJc1ZhbGlkKGNmZykpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFpBRHVuIFNESyBjaGVja0NmZ0lzVmFsaWQgID0gZmFsc2VcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0R1bkluaXQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdCBaQUR1biBTREsgdGhpcy5pc1REdW5Jbml0ICA9IHRydWVcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2lzU3VwcG9ydCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXQgWkFEdW4gU0RLIGlzIG5vdCBzdXBwb3J0XCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuZ2V0SW5pdFN0YXRlKClcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFpBRHVuIFNESyBzdGF0ZSA9IFwiICsgaW5pdFN0YXRlKVxyXG4gICAgICAgIGxldCB6YUR1bmtleSA9IGNmZy5rZXkyXHJcbiAgICAgICAgaWYgKGluaXRTdGF0ZSA9PSBEVU5TVEFURS5JTklUKSB7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImluaXRaQUR1blNES1wiKVxyXG4gICAgICAgICAgICBpZiAoemFEdW5rZXkpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5pbml0WkFEdW5TREsoemFEdW5rZXksIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJpbml0WkFEdW5TREsgcmV0ID0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXRPYmopKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE51bWJlcihyZXRPYmoucmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IDAgfHwgcmVzdWx0ID09IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0R1bkluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkR1bkluaXRGaW5pc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRHVuSW5pdFJlY29yZCArIFwiX1wiICsgRFVOVFlQRS5aQV9EVU4sMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImluaXRaQUR1blNESyByZXQgPSAwIHN1Y2Nlc3MgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmVwb3J0UGFyYW0gPSB7IFwicmVzdWx0XCI6IDAgLFwidHlwZVwiOiBEVU5UWVBFLlpBX0RVTn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSU5JVF9EVU5fT0ssIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFpBRHVuU0RLIHJldCAhPSAwIGZhaWxlZCBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdW5jUGFyYW0gPSByZXRPYmouZnVuY1BhcmFtID8gcmV0T2JqLmZ1bmNQYXJhbTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBcInJldCAhPSAwIFwiICsgcmVzdWx0ICxcInR5cGVcIjogRFVOVFlQRS5aQV9EVU4sXCJlcnJvcl9tc2dcIjpmdW5jUGFyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0lOSVRfRFVOX0VSUk9SLCByZXBvcnRQYXJhbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFpBRHVuU0RLIHJldE9iaiA9PSBudWxsIGZhaWxlZCBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBcImluaXRaQUR1blNESyByZXRPYmogPT0gbnVsbCBmYWlsZWRcIiAsXCJ0eXBlXCI6IERVTlRZUEUuWkFfRFVOfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0lOSVRfRFVOX0VSUk9SLCByZXBvcnRQYXJhbSkgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluaXRTdGF0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzU3VwcG9ydCl7XHJcbiAgICAgICAgICAgIHJldHVybiBEVU5TVEFURS5GQUlMRURcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldCA9IEdsb2JhbC5OYXRpdmVFdmVudC5nZXRaQUR1bkluaXRSZXQoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQb3J0KGxvX3BvcnQpIHtcclxuICAgICAgICAvL+WQjue7rUFwcOa3u+WKoOS6huWNleeLrOiOt+WPlnBvcnTmlrnms5VcclxuICAgICAgICBsZXQgcG9ydCA9IDAgO1xyXG4gICAgICAgIHBvcnQgPSBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0WkFEdW5Qb3J0QnlBZGRyKFwiXCIsbG9fcG9ydClcclxuICAgICAgICBcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJaQUR1biBnZXRQb3J0IHBvcnQgPSBcIiArIHBvcnQpXHJcbiAgICAgICAgcmV0dXJuIHBvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNlcnZlcklQQW5kUG9ydChob3N0OnN0cmluZyxsb19wb3J0Om51bWJlcixhdHRyOmFueSl7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRHVuSW5pdCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIlpBRHVuIGdldFNlcnZlcklQQW5kUG9ydCBpc0R1bkluaXQgPSBmYWxzZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpcCA9IFwiMTI3LjAuMC4xXCJcclxuICAgICAgICBsZXQgcG9ydCA9IHRoaXMuZ2V0UG9ydChsb19wb3J0KVxyXG4gICAgICAgIHJldHVybiB7XCJpcFwiOmlwLFwicG9ydFwiOnBvcnR9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzU3VwcG9ydCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaXNEdW5Jbml0KSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSB0aGlzLmdldEluaXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAocmV0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNEdW5Jbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pc0R1bkluaXQ7XHJcbiAgICB9XHJcblxyXG59Il19