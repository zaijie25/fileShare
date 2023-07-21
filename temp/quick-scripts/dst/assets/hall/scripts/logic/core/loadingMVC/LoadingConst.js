
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/LoadingConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f493aVL379Kd5iqUDbb1HCY', 'LoadingConst');
// hall/scripts/logic/core/loadingMVC/LoadingConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingConst = /** @class */ (function () {
    function LoadingConst() {
    }
    LoadingConst.START_UP = "START_UP";
    LoadingConst.LOADING_SCENE = "LOADING_SCENE";
    LoadingConst.CHECK_UPDATE = "CHECK_UPDATE";
    LoadingConst.SHOW_CHECK_LABEL = "SHOW_CHECK_LABEL";
    LoadingConst.SHOW_PROGRESS_LABEL = "SHOW_PROGRESS_LABEL";
    LoadingConst.SHOW_PROGRESS_BAR = "SHOW_PROGRESS_BAR";
    LoadingConst.LOAD_HALL_SCENE = "LOAD_HALL_SCENE";
    LoadingConst.UPDATE_LOADING_VERSION = "UPDATE_LOADING_VERSION"; //更新loading界面的版本号
    LoadingConst.UPDATE_APP_INFO = "UPDATE_APP_INFO"; //获取到appdata之后
    LoadingConst.INIT_LOADING_SCENE = "INIT_LOADING_SCENE"; //初始化场景
    LoadingConst.CLEAR_LOADING_TIMER = "CLEAR_LOADING_TIMER"; //清除loading 定时器
    LoadingConst.DUN_INIT_FINISH = "DUN_INIT_FINISH"; //盾初始化完成
    LoadingConst.CHCEK_HOTUPDATE_PROGRESS = "CHCEK_HOTUPDATE_PROGRESS"; //检查热更进度
    return LoadingConst;
}());
exports.default = LoadingConst;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXExvYWRpbmdDb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFlQSxDQUFDO0lBZGlCLHFCQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLDBCQUFhLEdBQUcsZUFBZSxDQUFDO0lBQ2hDLHlCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQzlCLDZCQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQ3RDLGdDQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQzVDLDhCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBQ3hDLDRCQUFlLEdBQUcsaUJBQWlCLENBQUM7SUFDcEMsbUNBQXNCLEdBQUcsd0JBQXdCLENBQUMsQ0FBQSxpQkFBaUI7SUFDbkUsNEJBQWUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFHLGNBQWM7SUFDckQsK0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxPQUFPO0lBQ2xELGdDQUFtQixHQUFHLHFCQUFxQixDQUFDLENBQUEsZUFBZTtJQUMzRCw0QkFBZSxHQUFHLGlCQUFpQixDQUFDLENBQUEsUUFBUTtJQUM1QyxxQ0FBd0IsR0FBRywwQkFBMEIsQ0FBQyxDQUFBLFFBQVE7SUFFaEYsbUJBQUM7Q0FmRCxBQWVDLElBQUE7a0JBZm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyBTVEFSVF9VUCA9IFwiU1RBUlRfVVBcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTE9BRElOR19TQ0VORSA9IFwiTE9BRElOR19TQ0VORVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDSEVDS19VUERBVEUgPSBcIkNIRUNLX1VQREFURVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTSE9XX0NIRUNLX0xBQkVMID0gXCJTSE9XX0NIRUNLX0xBQkVMXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNIT1dfUFJPR1JFU1NfTEFCRUwgPSBcIlNIT1dfUFJPR1JFU1NfTEFCRUxcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV19QUk9HUkVTU19CQVIgPSBcIlNIT1dfUFJPR1JFU1NfQkFSXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExPQURfSEFMTF9TQ0VORSA9IFwiTE9BRF9IQUxMX1NDRU5FXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVQREFURV9MT0FESU5HX1ZFUlNJT04gPSBcIlVQREFURV9MT0FESU5HX1ZFUlNJT05cIjsvL+abtOaWsGxvYWRpbmfnlYzpnaLnmoTniYjmnKzlj7dcclxuICAgIHB1YmxpYyBzdGF0aWMgVVBEQVRFX0FQUF9JTkZPID0gXCJVUERBVEVfQVBQX0lORk9cIjsgICAvL+iOt+WPluWIsGFwcGRhdGHkuYvlkI5cclxuICAgIHB1YmxpYyBzdGF0aWMgSU5JVF9MT0FESU5HX1NDRU5FID0gXCJJTklUX0xPQURJTkdfU0NFTkVcIjsgLy/liJ3lp4vljJblnLrmma9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ0xFQVJfTE9BRElOR19USU1FUiA9IFwiQ0xFQVJfTE9BRElOR19USU1FUlwiOy8v5riF6ZmkbG9hZGluZyDlrprml7blmahcclxuICAgIHB1YmxpYyBzdGF0aWMgRFVOX0lOSVRfRklOSVNIID0gXCJEVU5fSU5JVF9GSU5JU0hcIjsvL+ebvuWIneWni+WMluWujOaIkFxyXG4gICAgcHVibGljIHN0YXRpYyBDSENFS19IT1RVUERBVEVfUFJPR1JFU1MgPSBcIkNIQ0VLX0hPVFVQREFURV9QUk9HUkVTU1wiOy8v5qOA5p+l54Ot5pu06L+b5bqmXHJcbiAgICBcclxufSJdfQ==