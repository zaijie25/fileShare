"use strict";
cc._RF.push(module, 'ae05dmH+UtAU75MJfLLuyye', 'ErmjCallBlockHandler');
// ermj/Ermj/scripts/handlers/ErmjCallBlockHandler.ts

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
exports.ErmjCallOtherBlockHandler = exports.ErmjCallSelfBlockHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjCallSelfBlockHandler = /** @class */ (function (_super) {
    __extends(ErmjCallSelfBlockHandler, _super);
    function ErmjCallSelfBlockHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallSelfBlockHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            var cfg = {
                isChow: msg._para.can_chow == 1,
                isPong: msg._para.can_pong == 1,
                isKong: msg._para.can_kong == 1,
                isWin: msg._para.can_win == 1,
            };
            this.mainUI.askActionView.active = true;
            this.mainUI.askActionView.showBtnByConfig(cfg, msg._para);
        }
        // 倒计时走cal_play debug听牌后没有cal_play
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
        this.mainUI.askNoticeView.setTimeRunConfig(Math.round(time / 1000), null, null);
    };
    return ErmjCallSelfBlockHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallSelfBlockHandler = ErmjCallSelfBlockHandler;
var ErmjCallOtherBlockHandler = /** @class */ (function (_super) {
    __extends(ErmjCallOtherBlockHandler, _super);
    function ErmjCallOtherBlockHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallOtherBlockHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            var cfg = {
                isChow: msg._para.can_chow == 1,
                isPong: msg._para.can_pong == 1,
                isKong: msg._para.can_kong == 1,
                isWin: msg._para.can_win == 1,
            };
            this.mainUI.askActionView.active = true;
            this.mainUI.askActionView.showBtnByConfig(cfg, msg._para);
        }
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
        this.mainUI.askNoticeView.setTimeRunConfig(Math.round(time / 1000), null, null);
    };
    return ErmjCallOtherBlockHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallOtherBlockHandler = ErmjCallOtherBlockHandler;

cc._RF.pop();