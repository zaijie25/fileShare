"use strict";
cc._RF.push(module, '9c02aNQzwRHMLTXgnM6aqbl', 'DdzEasyHandlers');
// ddz/ddz/scripts/handlers/DdzEasyHandlers.ts

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
exports.DdzLeaveMatchHandler = exports.DdzOfflineHandler = exports.DdzRefreshHandler = exports.DdzWaitHandler = exports.DdzEndHandler = exports.DdzStartHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDriver_1 = require("../DdzDriver");
//游戏开始协议
var DdzStartHandler = /** @class */ (function (_super) {
    __extends(DdzStartHandler, _super);
    function DdzStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzStartHandler.prototype.refreshData = function (msg) {
        this.context.set(this.Define.FieldGameStart, true);
    };
    DdzStartHandler.prototype.execute = function (msg) {
        this.mainUI.showActionTimer(false);
    };
    DdzStartHandler.prototype.executeSync = function (msg) {
        this.mainUI.showActionTimer(false);
    };
    return DdzStartHandler;
}(DdzBaseHandler_1.default));
exports.DdzStartHandler = DdzStartHandler;
//游戏结束
var DdzEndHandler = /** @class */ (function (_super) {
    __extends(DdzEndHandler, _super);
    function DdzEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzEndHandler.prototype.refreshData = function () {
        //清理单局数据
        this.context.clearByRound();
    };
    DdzEndHandler.prototype.execute = function () {
        this.mainUI.callAllPlayers('showPlayerNormalEffect');
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        // this.mainUI.clearByRound();      // 放到手动操作那边清理
    };
    return DdzEndHandler;
}(DdzBaseHandler_1.default));
exports.DdzEndHandler = DdzEndHandler;
//等待下一局
var DdzWaitHandler = /** @class */ (function (_super) {
    __extends(DdzWaitHandler, _super);
    function DdzWaitHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzWaitHandler.prototype.execute = function (msg) {
        if (msg._para.status == 1) {
            Logger.log("结算中");
        }
        else {
            this.mainUI.showActionTimer(false);
            this.mainUI.matchPlayerView.active = true;
        }
    };
    return DdzWaitHandler;
}(DdzBaseHandler_1.default));
exports.DdzWaitHandler = DdzWaitHandler;
//刷新玩家信息
var DdzRefreshHandler = /** @class */ (function (_super) {
    __extends(DdzRefreshHandler, _super);
    function DdzRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // "_param":{
    //     "_cmd":"refresh",
    //     "_src":"p5",
    //     "_para":{
    //         "app_id":12,
    //         "user_id":680272,
    //         "nick_name":"贵宾680272",
    //         "headimg":"5",
    //         "point":475,
    //         "user_type":1,
    //         "register_ip":"192.168.1.224",
    //         "os_type":1,
    //         "itime":1556027819,
    //         "last_login_time":"2019-04-30 23:55:55"
    //     }
    // }
    DdzRefreshHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.context.playerList[localSeat].refresh(msg._para);
    };
    DdzRefreshHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.mainUI.callPlayer(localSeat, "setPlayerPoint", this.context.playerList[localSeat].point);
        if (localSeat == 0)
            this.mainUI.selfInfoView.updateSelfPoint(this.context.playerList[localSeat].point);
    };
    return DdzRefreshHandler;
}(DdzBaseHandler_1.default));
exports.DdzRefreshHandler = DdzRefreshHandler;
var DdzOfflineHandler = /** @class */ (function (_super) {
    __extends(DdzOfflineHandler, _super);
    function DdzOfflineHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOfflineHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        Logger.log(localSeat, '------->offline');
        // 重连需要补发状态，暂不处理离线
    };
    return DdzOfflineHandler;
}(DdzBaseHandler_1.default));
exports.DdzOfflineHandler = DdzOfflineHandler;
var DdzLeaveMatchHandler = /** @class */ (function (_super) {
    __extends(DdzLeaveMatchHandler, _super);
    function DdzLeaveMatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzLeaveMatchHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.matchPlayerView.active = false;
        if (this.context.isWaitMatch) {
            this.context.isWaitMatch = false;
            Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
            }, function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                DdzDriver_1.default.instance.leaveGame();
            });
        }
    };
    return DdzLeaveMatchHandler;
}(DdzBaseHandler_1.default));
exports.DdzLeaveMatchHandler = DdzLeaveMatchHandler;

cc._RF.pop();