"use strict";
cc._RF.push(module, 'c6cfdKBDz9M4bbS6reQYaKI', 'ErmjWinHandler');
// ermj/Ermj/scripts/handlers/ErmjWinHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjWinHandler = /** @class */ (function (_super) {
    __extends(ErmjWinHandler, _super);
    function ErmjWinHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjWinHandler.prototype.execute = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, false);
        this.context.set(this.Define.FieldInPlayTurn, false);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.showPlayTips(false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onWin(localSeat, whoSeat, msg._para.card, msg._para.type, true);
        this.context.set(this.Define.FieldHandActionEnable, false);
        // 预先设置 结算显示
        this.mainUI.settleView.setWinType(msg._para.type);
    };
    ErmjWinHandler.prototype.executeSync = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, false);
        this.context.set(this.Define.FieldInPlayTurn, false);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.showPlayTips(false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onWin(localSeat, whoSeat, msg._para.card, msg._para.type, false);
        this.context.set(this.Define.FieldHandActionEnable, false);
        // 预先设置 结算显示
        this.mainUI.settleView.setWinType(msg._para.type);
    };
    return ErmjWinHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjWinHandler;

cc._RF.pop();