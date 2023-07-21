"use strict";
cc._RF.push(module, '07b271ivMhDmpMxU7H9KJZO', 'GameErrorHelper');
// hall/scripts/logic/core/game/serverHelper/GameErrorHelper.ts

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
var BaseServerHelper_1 = require("./BaseServerHelper");
//游戏逻辑通用错误处理
var GameErrorHelper = /** @class */ (function (_super) {
    __extends(GameErrorHelper, _super);
    function GameErrorHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorHandlerMap = {};
        //余额不足
        _this.ERROR_NOT_ENOUGH = 301;
        _this.ERROR_NO_SERVICE = 404;
        //不在桌上
        _this.ERROR_NOT_IN_TABLE = 1001;
        //网络变化 需要回到大厅
        _this.ERROR_NET_CHANGE = 902;
        //不在桌子上
        _this.ERROR_NOT_ONTABLE = 905;
        //货币不足
        _this.ERROR_LOW_LIMIT = 906;
        //货币超出限制
        _this.ERROR_UPPER_LIMIT = 907;
        _this.ERROR_SYS_BUSY = 204;
        return _this;
    }
    GameErrorHelper.prototype.onInit = function () {
    };
    //注册子游戏定制错误处理  参数为errnoid, netData   返回true表示继续入队列 false丢弃协议
    GameErrorHelper.prototype.registErrorHandler = function (key, callback) {
        this.errorHandlerMap[key] = callback;
    };
    GameErrorHelper.prototype.clear = function () {
        this.errorHandlerMap = {};
    };
    GameErrorHelper.prototype.handleSysError = function (netData) {
        if (netData._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._errno);
        if (handler)
            return handler(netData._errno, netData);
        this.defultErrorHandler(netData._errno, netData._errstr);
    };
    GameErrorHelper.prototype.handleCmdError = function (netData) {
        if (netData._param._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._param._errno);
        if (handler)
            return handler(netData._param._errno, netData);
        this.defultErrorHandler(netData._param._errno, netData._param._errstr);
    };
    GameErrorHelper.prototype.handleLogicError = function (netData) {
        if (netData._param._para == null || netData._param._para._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._para._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._param._para._errno);
        if (handler)
            return handler(netData._param._para._errno, netData);
        this.defultErrorHandler(netData._param._para._errno, netData._param._para._errstr);
    };
    GameErrorHelper.prototype.getErrorHandler = function (key) {
        return this.errorHandlerMap[key];
    };
    //服务器errno是唯一的
    GameErrorHelper.prototype.defultErrorHandler = function (errno, errorStr) {
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        Game.Control.stopCheckMsgTimer();
        //pvp直接回选场  pve重新进游戏
        if (errno == this.ERROR_NOT_IN_TABLE) {
            // this.server.stopGame();
            this.server.clearData();
            Game.Event.event(Game.EVENT_NOT_IN_TABLE);
            return;
        }
        if (errno == this.ERROR_LOW_LIMIT) {
            this.server.stopGame();
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            Global.Toolkit.showMoneyNotEnough();
            return;
        }
        //1000以下error默认退出
        if (errno < 1000) {
            this.server.stopGame();
            var errFunc = function () { Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME); };
            var err = cc.js.formatStr("%s[%s]", errorStr, errno);
            Global.UI.showSingleBox(err, errFunc, errFunc);
            return;
        }
        if (errorStr && errorStr != "") {
            // Global.UI.fastTip(errorStr+"["+errno+"]");
            Global.UI.fastTip(errorStr + "");
            return;
        }
    };
    return GameErrorHelper;
}(BaseServerHelper_1.default));
exports.default = GameErrorHelper;

cc._RF.pop();