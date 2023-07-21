"use strict";
cc._RF.push(module, 'c17c5jOd05MlKPbp9uWj2qF', 'ErmjPlayHandler');
// ermj/Ermj/scripts/handlers/ErmjPlayHandler.ts

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
exports.ErmjKongHandler = exports.ErmjPongHandler = exports.ErmjChowHandler = exports.ErmjPlayHandler = exports.ErmjCallPlayHandler = exports.ErmjPlayStartHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjPlayStartHandler = /** @class */ (function (_super) {
    __extends(ErmjPlayStartHandler, _super);
    function ErmjPlayStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPlayStartHandler.prototype.execute = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, true);
        this.mainUI.diceAnimComp.node.active = false;
        this.mainUI.askBtnView.setAutoPlayBtnShow(true);
    };
    return ErmjPlayStartHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPlayStartHandler = ErmjPlayStartHandler;
var ErmjCallPlayHandler = /** @class */ (function (_super) {
    __extends(ErmjCallPlayHandler, _super);
    function ErmjCallPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallPlayHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askActionView.active = false;
        var time = 0;
        var serverTime = msg._times;
        if (serverTime && Game.Component.correctTime) {
            var dev = Game.Component.correctTime(serverTime);
            time = msg._timeo * 1000 - dev;
        }
        else {
            time = msg._timeo * 1000 - (Date.now() - msg._receiveTime);
        }
        if (!time || time <= 0)
            time = 1000;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        this.mainUI.askNoticeView.whichLocationTurn(localSeat);
        this.mainUI.askNoticeView.setTimeRunConfig(Math.round(time / 1000), null, null);
        Game.Component.scheduleOnce(function () {
            _this.mainUI.callMjPlayer(localSeat, "readyForOut", msg._para.draw_card); // 重连时等UI初始化帧结束, 下一帧再执行
        }, 0);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInPlayTurn, true);
            this.mainUI.selfPlayView.showPlayTips(true);
            this.mainUI.selfPlayView.readyForOut(msg._para.draw_card);
        }
    };
    return ErmjCallPlayHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallPlayHandler = ErmjCallPlayHandler;
var ErmjPlayHandler = /** @class */ (function (_super) {
    __extends(ErmjPlayHandler, _super);
    function ErmjPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPlayHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInPlayTurn, false);
            this.mainUI.selfPlayView.showPlayTips(false);
            this.mainUI.askActionView.active = false;
        }
        this.mainUI.onPlay(localSeat, msg._para.card, msg._para.flag == 1);
    };
    ErmjPlayHandler.prototype.executeSync = function (msg) {
    };
    return ErmjPlayHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPlayHandler = ErmjPlayHandler;
var ErmjChowHandler = /** @class */ (function (_super) {
    __extends(ErmjChowHandler, _super);
    function ErmjChowHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChowHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onChow(localSeat, msg._para.cards, msg._para.chow_card, whoSeat);
    };
    return ErmjChowHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjChowHandler = ErmjChowHandler;
var ErmjPongHandler = /** @class */ (function (_super) {
    __extends(ErmjPongHandler, _super);
    function ErmjPongHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPongHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onPong(localSeat, msg._para.cards, whoSeat);
    };
    return ErmjPongHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPongHandler = ErmjPongHandler;
var ErmjKongHandler = /** @class */ (function (_super) {
    __extends(ErmjKongHandler, _super);
    function ErmjKongHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjKongHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onKong(localSeat, msg._para.cards || [], msg._para.type, whoSeat);
    };
    return ErmjKongHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjKongHandler = ErmjKongHandler;

cc._RF.pop();