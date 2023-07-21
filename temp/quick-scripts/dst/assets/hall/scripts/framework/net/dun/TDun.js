
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dun/TDun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1fc42gFKZI4IHOcjBu6Hds', 'TDun');
// hall/scripts/framework/net/dun/TDun.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../../logic/hallcommon/const/HallStorageKey");
var AppDunControl_1 = require("./AppDunControl");
var TDun = /** @class */ (function () {
    function TDun(dunType) {
        var _this = this;
        this.isDunInit = false;
        this._isSupport = false;
        this.sdkName = "tdun";
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
    TDun.prototype.isAppSupport = function () {
        return this._isSupport;
    };
    TDun.prototype.checkCfgIsValid = function (cfg) {
        if (cfg && cfg.key) {
            return true;
        }
        return false;
    };
    //异步初始化
    TDun.prototype.init = function (cfg, callback) {
        var _this = this;
        // Logger.error("init TDun SDK")
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init TDun SDK checkCfgIsValid  = false");
            return;
        }
        if (this.isDunInit) {
            Logger.error("init TDun SDK this.isTDunInit  = true");
            return;
        }
        if (!this._isSupport) {
            Logger.error("init TDun SDK is not support");
            return;
        }
        var initState = this.getInitState();
        Logger.error("init TDun SDK state = " + initState);
        var tDunkey = cfg.key;
        if (initState == AppDunControl_1.DUNSTATE.INIT || initState == AppDunControl_1.DUNSTATE.FAILED) {
            // Logger.error("initTDunSDK")
            if (tDunkey) {
                Global.NativeEvent.initTDunSDK(tDunkey, function (retObj) {
                    // Logger.error("initTDunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        var result = Number(retObj.result);
                        if (result == 0 || result == 0.0) {
                            _this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey_1.default.DunInitRecord + "_" + AppDunControl_1.DUNTYPE.T_DUN, 1);
                            // Logger.error("initTDunSDK ret = 0 success ")
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        }
                        else {
                            Logger.error("initTDunSDK ret != 0 failed ");
                            // let reportParam = { "result": "ret != 0 " + result ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam)
                        }
                    }
                    else {
                        Logger.error("initTDunSDK retObj == null failed ");
                        // let reportParam = { "result": "initTDunSDK retObj == null failed" ,"type": DUNTYPE.T_DUN}
                        // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam) 
                    }
                    if (callback) {
                        callback();
                    }
                });
            }
        }
    };
    TDun.prototype.getInitState = function () {
        if (!this._isSupport) {
            return AppDunControl_1.DUNSTATE.FAILED;
        }
        var ret = Global.NativeEvent.getTDunInitRet();
        return ret;
    };
    TDun.prototype.getPort = function (lo_port) {
        var port = Global.NativeEvent.getTDunPort(lo_port);
        Logger.error("TDun getPort port = " + port);
        return port;
    };
    TDun.prototype.getServerIPAndPort = function (host, lo_port, attr) {
        if (!this.isDunInit) {
            Logger.error("TDun getServerIPAndPort isDunInit = false");
            return;
        }
        var ip = "127.0.0.1";
        var port = this.getPort(lo_port);
        return { "ip": ip, "port": port };
    };
    TDun.prototype.isInit = function () {
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
    return TDun;
}());
exports.default = TDun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGR1blxcVER1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlGQUE0RTtBQUU1RSxpREFBb0Q7QUFFcEQ7SUFPSSxjQUFZLE9BQU87UUFBbkIsaUJBU0M7UUFkTyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQUNqQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBR2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQUMsTUFBTTtZQUN2RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxHQUFHLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxDQUFBO2FBQ3pGO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sMkJBQVksR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUVNLDhCQUFlLEdBQXRCLFVBQXVCLEdBQU87UUFDMUIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBQztZQUNmLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTztJQUNBLG1CQUFJLEdBQVgsVUFBWSxHQUFHLEVBQUMsUUFBbUI7UUFBbkMsaUJBa0RDO1FBakRHLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7WUFDdEQsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUNyRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUE7WUFDNUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDbEQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtRQUNyQixJQUFJLFNBQVMsSUFBSSx3QkFBUSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksd0JBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDNUQsOEJBQThCO1lBQzlCLElBQUksT0FBTyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07b0JBQzNDLDhEQUE4RDtvQkFDOUQsSUFBSSxNQUFNLEVBQUU7d0JBQ1IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTt3QkFDbEMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7NEJBQzlCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsdUJBQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQ2hGLCtDQUErQzs0QkFDL0MsMERBQTBEOzRCQUMxRCx1RkFBdUY7eUJBQzFGOzZCQUFNOzRCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQTs0QkFDNUMsNkVBQTZFOzRCQUM3RSwyRkFBMkY7eUJBQzlGO3FCQUNKO3lCQUFLO3dCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQTt3QkFDbEQsNEZBQTRGO3dCQUM1Riw0RkFBNEY7cUJBQy9GO29CQUVELElBQUksUUFBUSxFQUFFO3dCQUNWLFFBQVEsRUFBRSxDQUFBO3FCQUNiO2dCQUVMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUVMLENBQUM7SUFFTSwyQkFBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2pCLE9BQU8sd0JBQVEsQ0FBQyxNQUFNLENBQUE7U0FDekI7UUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHNCQUFPLEdBQWQsVUFBZSxPQUFPO1FBQ2xCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDM0MsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLGlDQUFrQixHQUF6QixVQUEwQixJQUFXLEVBQUMsT0FBYyxFQUFDLElBQVE7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO1lBQ3pELE9BQU87U0FDVjtRQUNELElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQTtRQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRU0scUJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2pCLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQXZIQSxBQXVIQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElEdW4gZnJvbSBcIi4vSUR1blwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3Rvb2wvUmVwb3J0VG9vbFwiO1xyXG5pbXBvcnQgeyBEVU5UWVBFLCBEVU5TVEFURSB9IGZyb20gXCIuL0FwcER1bkNvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFREdW4gaW1wbGVtZW50cyBJRHVuIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpc0R1bkluaXQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2lzU3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzZGtOYW1lID0gXCJ0ZHVuXCI7XHJcbiAgICBwcml2YXRlIF9kdW5UeXBlID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkdW5UeXBlKXtcclxuICAgICAgICB0aGlzLl9kdW5UeXBlID0gZHVuVHlwZVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5pc1N1cHBvcnRTREsodGhpcy5zZGtOYW1lLCBudWxsLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXRPYmoucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzU3VwcG9ydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGVja0FwcElzU3VwcG9ydER1bkJ5VHlwZSBkdW5UeXBlID0gXCIgKyBkdW5UeXBlICsgXCIgaXNTdXBwb3J0ID0gZmFsc2VcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICBpc0FwcFN1cHBvcnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNTdXBwb3J0XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQ2ZnSXNWYWxpZChjZmc6YW55KXtcclxuICAgICAgICBpZiAoY2ZnICYmIGNmZy5rZXkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byC5q2l5Yid5aeL5YyWXHJcbiAgICBwdWJsaWMgaW5pdChjZmcsY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImluaXQgVER1biBTREtcIilcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tDZmdJc1ZhbGlkKGNmZykpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFREdW4gU0RLIGNoZWNrQ2ZnSXNWYWxpZCAgPSBmYWxzZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRHVuSW5pdCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFREdW4gU0RLIHRoaXMuaXNURHVuSW5pdCAgPSB0cnVlXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc1N1cHBvcnQpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFREdW4gU0RLIGlzIG5vdCBzdXBwb3J0XCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuZ2V0SW5pdFN0YXRlKClcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJpbml0IFREdW4gU0RLIHN0YXRlID0gXCIgKyBpbml0U3RhdGUpXHJcbiAgICAgICAgbGV0IHREdW5rZXkgPSBjZmcua2V5XHJcbiAgICAgICAgaWYgKGluaXRTdGF0ZSA9PSBEVU5TVEFURS5JTklUIHx8IGluaXRTdGF0ZSA9PSBEVU5TVEFURS5GQUlMRUQpIHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiaW5pdFREdW5TREtcIilcclxuICAgICAgICAgICAgaWYgKHREdW5rZXkpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5pbml0VER1blNESyh0RHVua2V5LCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiaW5pdFREdW5TREsgcmV0ID0gXCIgKyBKU09OLnN0cmluZ2lmeShyZXRPYmopKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE51bWJlcihyZXRPYmoucmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IDAgfHwgcmVzdWx0ID09IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0R1bkluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkR1bkluaXRGaW5pc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRHVuSW5pdFJlY29yZCArIFwiX1wiICsgRFVOVFlQRS5UX0RVTiwxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiaW5pdFREdW5TREsgcmV0ID0gMCBzdWNjZXNzIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiAwICxcInR5cGVcIjogRFVOVFlQRS5UX0RVTn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSU5JVF9EVU5fT0ssIHJlcG9ydFBhcmFtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFREdW5TREsgcmV0ICE9IDAgZmFpbGVkIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBcInJldCAhPSAwIFwiICsgcmVzdWx0ICxcInR5cGVcIjogRFVOVFlQRS5UX0RVTn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSU5JVF9URFVOX0VSUk9SLCByZXBvcnRQYXJhbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5pdFREdW5TREsgcmV0T2JqID09IG51bGwgZmFpbGVkIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmVwb3J0UGFyYW0gPSB7IFwicmVzdWx0XCI6IFwiaW5pdFREdW5TREsgcmV0T2JqID09IG51bGwgZmFpbGVkXCIgLFwidHlwZVwiOiBEVU5UWVBFLlRfRFVOfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0lOSVRfVERVTl9FUlJPUiwgcmVwb3J0UGFyYW0pIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbml0U3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc1N1cHBvcnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gRFVOU1RBVEUuRkFJTEVEXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXQgPSBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0VER1bkluaXRSZXQoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQb3J0KGxvX3BvcnQpIHtcclxuICAgICAgICBsZXQgcG9ydCA9IEdsb2JhbC5OYXRpdmVFdmVudC5nZXRURHVuUG9ydChsb19wb3J0KVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIlREdW4gZ2V0UG9ydCBwb3J0ID0gXCIgKyBwb3J0KVxyXG4gICAgICAgIHJldHVybiBwb3J0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJJUEFuZFBvcnQoaG9zdDpzdHJpbmcsbG9fcG9ydDpudW1iZXIsYXR0cjphbnkpe1xyXG4gICAgICAgIGlmICghdGhpcy5pc0R1bkluaXQpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJURHVuIGdldFNlcnZlcklQQW5kUG9ydCBpc0R1bkluaXQgPSBmYWxzZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpcCA9IFwiMTI3LjAuMC4xXCJcclxuICAgICAgICBsZXQgcG9ydCA9IHRoaXMuZ2V0UG9ydChsb19wb3J0KVxyXG4gICAgICAgIHJldHVybiB7XCJpcFwiOmlwLFwicG9ydFwiOnBvcnR9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzU3VwcG9ydCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaXNEdW5Jbml0KSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSB0aGlzLmdldEluaXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAocmV0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNEdW5Jbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pc0R1bkluaXQ7XHJcbiAgICB9XHJcblxyXG59Il19