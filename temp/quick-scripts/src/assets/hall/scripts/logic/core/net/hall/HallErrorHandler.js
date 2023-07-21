"use strict";
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