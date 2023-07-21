"use strict";
cc._RF.push(module, '8b4a7oj5OpPFoucGP/3SfdU', 'ErmjEasyHandler');
// ermj/Ermj/scripts/handlers/ErmjEasyHandler.ts

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
exports.ErmjLeaveMatchHandler = exports.ErmjOfflineHandler = exports.ErmjRefreshHandler = exports.ErmjWaitHandler = exports.ErmjEndHandler = exports.ErmjStartHandler = exports.ErmjReadyHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjReadyHandler = /** @class */ (function (_super) {
    __extends(ErmjReadyHandler, _super);
    function ErmjReadyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjReadyHandler.prototype.execute = function (msg) {
        this.context.isWaitMatch = false;
        this.mainUI.matchPlayerView.active = false;
        // let time = msg._timeo *1000 - (Date.now() - msg._receiveTime);
        // // if (time <= 0)
        // //     time = 1000;
        // if (time >= 1000)
        //     this.mainUI.showActionTimer(true, 0, time, null);
    };
    ErmjReadyHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return ErmjReadyHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjReadyHandler = ErmjReadyHandler;
var ErmjStartHandler = /** @class */ (function (_super) {
    __extends(ErmjStartHandler, _super);
    function ErmjStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjStartHandler.prototype.refreshData = function (msg) {
        this.context.set(this.Define.FieldGameStart, true);
    };
    ErmjStartHandler.prototype.execute = function (msg) {
        // 游戏开始时 显示设定方位盒
        this.mainUI.askNoticeView.active = true;
        this.mainUI.askNoticeView.setChairLook(this.context.selfSrc);
        this.context.isWaitMatch = false; // 游戏开始取消匹配状态
        this.mainUI.matchPlayerView.active = false;
        this.mainUI.callAllPlayers("setMatched", true);
        this.mainUI.gameStartView.active = true;
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjStartHandler", 1);
    };
    ErmjStartHandler.prototype.executeSync = function (msg) {
        // 游戏开始时 显示设定方位盒
        this.mainUI.askNoticeView.active = true;
        this.mainUI.askNoticeView.setChairLook(this.context.selfSrc);
        this.mainUI.callAllPlayers("setMatched", false);
    };
    return ErmjStartHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjStartHandler = ErmjStartHandler;
var ErmjEndHandler = /** @class */ (function (_super) {
    __extends(ErmjEndHandler, _super);
    function ErmjEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjEndHandler.prototype.refreshData = function (msg) {
        //清理单局数据
        this.context.clearByRound();
    };
    ErmjEndHandler.prototype.execute = function (msg) {
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
    };
    return ErmjEndHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjEndHandler = ErmjEndHandler;
//等待下一局
var ErmjWaitHandler = /** @class */ (function (_super) {
    __extends(ErmjWaitHandler, _super);
    function ErmjWaitHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjWaitHandler.prototype.execute = function (msg) {
        if (msg._para.status == 1) {
            Logger.log("结算中");
        }
        else {
            this.mainUI.matchPlayerView.active = true;
        }
    };
    return ErmjWaitHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjWaitHandler = ErmjWaitHandler;
//刷新玩家信息
var ErmjRefreshHandler = /** @class */ (function (_super) {
    __extends(ErmjRefreshHandler, _super);
    function ErmjRefreshHandler() {
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
    ErmjRefreshHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.context.playerList[localSeat].refresh(msg._para);
        if (localSeat == this.context.selfLocalSeat) {
            Global.PlayerData.point = this.context.playerList[localSeat].point;
        }
    };
    ErmjRefreshHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.mainUI.callPlayer(localSeat, "setPlayerPoint", this.context.playerList[localSeat].point);
    };
    return ErmjRefreshHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjRefreshHandler = ErmjRefreshHandler;
var ErmjOfflineHandler = /** @class */ (function (_super) {
    __extends(ErmjOfflineHandler, _super);
    function ErmjOfflineHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjOfflineHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        Logger.log(localSeat, '------->offline');
        // 重连需要补发状态，暂不处理离线
    };
    return ErmjOfflineHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjOfflineHandler = ErmjOfflineHandler;
var ErmjLeaveMatchHandler = /** @class */ (function (_super) {
    __extends(ErmjLeaveMatchHandler, _super);
    function ErmjLeaveMatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjLeaveMatchHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.matchPlayerView.active = false;
        if (this.context.isWaitMatch) {
            this.context.isWaitMatch = false;
            Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
            }, function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                ErmjDriver_1.default.instance.leaveGame();
            });
        }
    };
    return ErmjLeaveMatchHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjLeaveMatchHandler = ErmjLeaveMatchHandler;

cc._RF.pop();