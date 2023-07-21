
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/HallErrorHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '16fbe+wtABNxamppsWMRHE1', 'HallErrorHandler');
// hall/scripts/logic/core/net/hall/HallErrorHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallErrorHelper = exports.HttpNetExtraData = void 0;
var HttpNetExtraData = /** @class */ (function () {
    function HttpNetExtraData() {
        //失败后是否显示提示
        this.showErrorTips = false;
        //重连总次数  默认为3
        this.retryTotalTime = 3;
        //重试次数
        this.retryTimes = 0;
        //是否显示waiting界面
        this.showWaiting = false;
        this.sendInGame = null;
        //是否并行请求
        this.isParallelReq = false;
        //线路no
        this.lineIndex = 0;
        /**
         * 是否启用waiting界面的mask
         */
        this.enableMask = true;
        //缓存机制
        this.cache = 0; //0: 不缓存, 1-10000: 按秒时效, 10001:按天缓存
    }
    HttpNetExtraData.prototype.refreshUrl = function () {
        var url = this.serverRoutes.getCurRoute().getUrl();
        var suffix = Global.UrlUtil.refreshSuffixOperTime(this.suffix);
        this.suffix = suffix;
        url.suffix = url.suffix + suffix;
        this.url = url;
    };
    return HttpNetExtraData;
}());
exports.HttpNetExtraData = HttpNetExtraData;
var HallErrorHelper = /** @class */ (function () {
    function HallErrorHelper() {
        //登录失败
        this.CheckLoginFailed = 401;
        //三方登录失败
        this.OpenidLoginFailed = 402;
        //系统维护
        this.SystemMaintain = 403;
    }
    //服务器业务逻辑错误处理
    HallErrorHelper.prototype.tryHandleError = function (serverData) {
        if (serverData == null)
            return false;
        if (serverData._errno == null)
            return true;
        if (serverData._errno == -1)
            return false;
        if (serverData._errno == this.CheckLoginFailed || serverData._errno == this.OpenidLoginFailed) {
            this.reLogin(serverData._errstr, serverData._errno);
            return false;
        }
        //403  系统维护中   跳到登录界面
        if (serverData._errno == this.SystemMaintain) {
            this.reLogin("系统维护中，请重新登录", 403, true);
            return false;
        }
        if (serverData._errno > 1000 && serverData._errno != 2002)
            Global.UI.showSingleBox(serverData._errstr);
        //Global.UI.fastTip(serverData._errstr+"["+serverData._errno+"]");
        else if (serverData._errno == 2002) {
            Global.Toolkit.showMoneyNotEnough();
        }
        else {
            // Global.UI.fastTip(serverData._errstr+"["+serverData._errno+"]");
            Global.UI.showSingleBox(serverData._errstr);
        }
        return false;
    };
    HallErrorHelper.prototype.handleError = function (serverData, errorHandler) {
        if (serverData == null)
            return false;
        if (serverData._errno == null)
            return true;
        if (errorHandler)
            return errorHandler(serverData);
        return this.tryHandleError(serverData);
    };
    HallErrorHelper.prototype.reLogin = function (errorStr, errno, useTip) {
        if (useTip === void 0) { useTip = false; }
        var func = function () {
            Global.SceneManager.goToLogin();
        };
        if (!useTip)
            Global.UI.showSingleBox((errorStr + "[" + errno + "]"), func, func);
        else {
            Global.UI.fastTip(errorStr);
            // Global.UI.fastTip(errorStr + ["+errno+"]);
            func();
        }
    };
    return HallErrorHelper;
}());
exports.HallErrorHelper = HallErrorHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcSGFsbEVycm9ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO1FBS0ksV0FBVztRQUNKLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGFBQWE7UUFDTixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQVcxQixNQUFNO1FBQ0MsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUl0QixlQUFlO1FBQ1IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUV6QixRQUFRO1FBQ0Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsTUFBTTtRQUNDLGNBQVMsR0FBRyxDQUFDLENBQUE7UUFDcEI7O1dBRUc7UUFDSSxlQUFVLEdBQUcsSUFBSSxDQUFBO1FBR3hCLE1BQU07UUFDQyxVQUFLLEdBQVUsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO0lBV2hFLENBQUM7SUFUVSxxQ0FBVSxHQUFqQjtRQUVJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDbEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNoQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBO0FBbkRZLDRDQUFnQjtBQXNEN0I7SUFBQTtRQUVJLE1BQU07UUFDRSxxQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFDL0IsUUFBUTtRQUNBLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUVoQyxNQUFNO1FBQ0UsbUJBQWMsR0FBRyxHQUFHLENBQUM7SUFxRWpDLENBQUM7SUFuRUcsYUFBYTtJQUNOLHdDQUFjLEdBQXJCLFVBQXNCLFVBQVU7UUFFNUIsSUFBRyxVQUFVLElBQUksSUFBSTtZQUNqQixPQUFPLEtBQUssQ0FBQztRQUNqQixJQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSTtZQUN4QixPQUFPLElBQUksQ0FBQztRQUVoQixJQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1FBRWpCLElBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQzVGO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELHFCQUFxQjtRQUNyQixJQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFDM0M7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFLLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNyRCxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsa0VBQWtFO2FBQ2pFLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQ2xDO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3ZDO2FBRUQ7WUFDRyxtRUFBbUU7WUFDbEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO1FBR0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLFVBQVUsRUFBRSxZQUFZO1FBRXZDLElBQUcsVUFBVSxJQUFJLElBQUk7WUFDakIsT0FBTyxLQUFLLENBQUM7UUFDakIsSUFBRyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUk7WUFDeEIsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBRyxZQUFZO1lBQ1gsT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbkMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxpQ0FBTyxHQUFmLFVBQWdCLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBYztRQUFkLHVCQUFBLEVBQUEsY0FBYztRQUUxQyxJQUFJLElBQUksR0FBRztZQUVQLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFBO1FBQ0QsSUFBRyxDQUFDLE1BQU07WUFDTixNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUVwRTtZQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLDZDQUE2QztZQUM1QyxJQUFJLEVBQUUsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0E3RUEsQUE2RUMsSUFBQTtBQTdFWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJSb3V0ZXMsIHsgU2VydmVyVXJsIH0gZnJvbSBcIi4uLy4uL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cE5ldEV4dHJhRGF0YVxyXG57XHJcbiAgICAvL+WklumDqOWPr+mFjee9ruS/oeaBr1xyXG4gICAgLy/pk77mjqXotoXml7YgIOaaguaXtuWFiOS4jeeUqFxyXG4gICAgcHVibGljIHRpbWVvdXQ6MzAwMDtcclxuICAgIC8v5aSx6LSl5ZCO5piv5ZCm5pi+56S65o+Q56S6XHJcbiAgICBwdWJsaWMgc2hvd0Vycm9yVGlwcyA9IGZhbHNlO1xyXG4gICAgLy/ph43ov57mgLvmrKHmlbAgIOm7mOiupOS4ujNcclxuICAgIHB1YmxpYyByZXRyeVRvdGFsVGltZSA9IDM7XHJcblxyXG5cclxuICAgIC8vcm91dGVzXHJcbiAgICBwdWJsaWMgc2VydmVyUm91dGVzOlNlcnZlclJvdXRlcztcclxuICAgIC8vdXJs5ZCO57yAXHJcbiAgICBwdWJsaWMgc3VmZml4O1xyXG4gICAgLy/ljY/orq7lkI3np7BcclxuICAgIHB1YmxpYyBmdW5jTmFtZTpzdHJpbmc7XHJcbiAgICAvL+mHjei/numAu+i+keS9v+eUqFxyXG4gICAgcHVibGljIHVybDpTZXJ2ZXJVcmw7XHJcbiAgICAvL+mHjeivleasoeaVsFxyXG4gICAgcHVibGljIHJldHJ5VGltZXMgPSAwO1xyXG4gICAgcHVibGljIHBhcmFtOmFueTtcclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlOkZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGVycm9ySGFuZGxlcjpGdW5jdGlvbjtcclxuICAgIC8v5piv5ZCm5pi+56S6d2FpdGluZ+eVjOmdolxyXG4gICAgcHVibGljIHNob3dXYWl0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHNlbmRJbkdhbWUgPSBudWxsO1xyXG5cclxuICAgIC8v5piv5ZCm5bm26KGM6K+35rGCXHJcbiAgICBwdWJsaWMgaXNQYXJhbGxlbFJlcSA9IGZhbHNlO1xyXG4gICAgLy/nur/ot69ub1xyXG4gICAgcHVibGljIGxpbmVJbmRleCA9IDBcclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5ZCv55Sod2FpdGluZ+eVjOmdoueahG1hc2tcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZU1hc2sgPSB0cnVlXHJcblxyXG5cclxuICAgIC8v57yT5a2Y5py65Yi2XHJcbiAgICBwdWJsaWMgY2FjaGU6bnVtYmVyID0gMDsgLy8wOiDkuI3nvJPlrZgsIDEtMTAwMDA6IOaMieenkuaXtuaViCwgMTAwMDE65oyJ5aSp57yT5a2YXHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hVcmwoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnNlcnZlclJvdXRlcy5nZXRDdXJSb3V0ZSgpLmdldFVybCgpXHJcbiAgICAgICAgbGV0IHN1ZmZpeCA9IEdsb2JhbC5VcmxVdGlsLnJlZnJlc2hTdWZmaXhPcGVyVGltZSh0aGlzLnN1ZmZpeClcclxuICAgICAgICB0aGlzLnN1ZmZpeCA9IHN1ZmZpeFxyXG4gICAgICAgIHVybC5zdWZmaXggPSB1cmwuc3VmZml4ICsgc3VmZml4XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxsRXJyb3JIZWxwZXJcclxue1xyXG4gICAgLy/nmbvlvZXlpLHotKVcclxuICAgIHByaXZhdGUgQ2hlY2tMb2dpbkZhaWxlZCA9IDQwMTtcclxuICAgIC8v5LiJ5pa555m75b2V5aSx6LSlXHJcbiAgICBwcml2YXRlIE9wZW5pZExvZ2luRmFpbGVkID0gNDAyO1xyXG5cclxuICAgIC8v57O757uf57u05oqkXHJcbiAgICBwcml2YXRlIFN5c3RlbU1haW50YWluID0gNDAzO1xyXG5cclxuICAgIC8v5pyN5Yqh5Zmo5Lia5Yqh6YC76L6R6ZSZ6K+v5aSE55CGXHJcbiAgICBwdWJsaWMgdHJ5SGFuZGxlRXJyb3Ioc2VydmVyRGF0YSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHNlcnZlckRhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKHNlcnZlckRhdGEuX2Vycm5vID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBpZihzZXJ2ZXJEYXRhLl9lcnJubyA9PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZihzZXJ2ZXJEYXRhLl9lcnJubyA9PSB0aGlzLkNoZWNrTG9naW5GYWlsZWQgfHwgc2VydmVyRGF0YS5fZXJybm8gPT0gdGhpcy5PcGVuaWRMb2dpbkZhaWxlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVMb2dpbihzZXJ2ZXJEYXRhLl9lcnJzdHIsc2VydmVyRGF0YS5fZXJybm8pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLzQwMyAg57O757uf57u05oqk5LitICAg6Lez5Yiw55m75b2V55WM6Z2iXHJcbiAgICAgICAgaWYoc2VydmVyRGF0YS5fZXJybm8gPT0gdGhpcy5TeXN0ZW1NYWludGFpbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVMb2dpbihcIuezu+e7n+e7tOaKpOS4re+8jOivt+mHjeaWsOeZu+W9lVwiLDQwMywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNlcnZlckRhdGEuX2Vycm5vID4gMTAwMCAgJiYgc2VydmVyRGF0YS5fZXJybm8gIT0gMjAwMilcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goc2VydmVyRGF0YS5fZXJyc3RyKTtcclxuICAgICAgICAgICAgLy9HbG9iYWwuVUkuZmFzdFRpcChzZXJ2ZXJEYXRhLl9lcnJzdHIrXCJbXCIrc2VydmVyRGF0YS5fZXJybm8rXCJdXCIpO1xyXG4gICAgICAgIGVsc2UgaWYgKHNlcnZlckRhdGEuX2Vycm5vID09IDIwMDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5zaG93TW9uZXlOb3RFbm91Z2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAvLyBHbG9iYWwuVUkuZmFzdFRpcChzZXJ2ZXJEYXRhLl9lcnJzdHIrXCJbXCIrc2VydmVyRGF0YS5fZXJybm8rXCJdXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChzZXJ2ZXJEYXRhLl9lcnJzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlRXJyb3Ioc2VydmVyRGF0YSwgZXJyb3JIYW5kbGVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc2VydmVyRGF0YSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoc2VydmVyRGF0YS5fZXJybm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYoZXJyb3JIYW5kbGVyKVxyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHNlcnZlckRhdGEpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5SGFuZGxlRXJyb3Ioc2VydmVyRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZUxvZ2luKGVycm9yU3RyLCBlcnJubyx1c2VUaXAgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZnVuYyA9ICgpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIuZ29Ub0xvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF1c2VUaXApXHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KChlcnJvclN0ciArIFwiW1wiK2Vycm5vK1wiXVwiKSwgZnVuYywgZnVuYyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3JTdHIpO1xyXG4gICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKGVycm9yU3RyICsgW1wiK2Vycm5vK1wiXSk7XHJcbiAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=