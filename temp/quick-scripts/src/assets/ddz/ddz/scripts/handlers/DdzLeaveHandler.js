"use strict";
cc._RF.push(module, '278de0jTKRFv5idSSu/F+Ib', 'DdzLeaveHandler');
// ddz/ddz/scripts/handlers/DdzLeaveHandler.ts

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
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDriver_1 = require("../DdzDriver");
var DdzLeaveHandler = /** @class */ (function (_super) {
    __extends(DdzLeaveHandler, _super);
    function DdzLeaveHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzLeaveHandler.prototype.refreshData = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        if (this.context.playerList[sit]) {
            Logger.error("leave", sit, msg._src);
            this.context.playerList[sit].clear();
        }
        else {
            Logger.error("leave error");
        }
    };
    DdzLeaveHandler.prototype.execute = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "DdzLeaveHandler", this.Define.HeadMoveTime + 0.1);
        if (msg._src == this.context.selfSrc) {
            //重新匹配
            if (msg._para && msg._para.Reason && msg._para.Reason._reason == 103) {
                Game.Server.clearData();
                Game.Tween.clear();
                Global.HallServer.setSession(null);
                var gameTimes = msg._para && msg._para.GameTimes || 0;
                if (gameTimes > 0) {
                    Game.Server.stopGame();
                    this.mainUI.askActionView.showRewardActionView(true);
                    this.mainUI.gameSettleView.showActionBtn(true);
                }
                else {
                    this.mainUI.askActionView.showRewardActionView(false);
                    this.mainUI.matchPlayerView.active = false;
                    this.mainUI.gameSettleView.showActionBtn(false);
                    Game.Server.dst = {};
                    Game.Control.trySendEnter({ "_from": "jump" });
                }
            }
            else {
                this.mainUI.callPlayer(sit, "hide");
                if (msg._para && msg._para.Reason && msg._para.Reason._reason == 102) {
                    Global.Toolkit.transmitHallMsg("金币不够啦，是否前往充值？", function () {
                        Global.UI.show("WndRecharge");
                    });
                }
                else if (msg._para && msg._para.Reason && msg._para.Reason._explain) {
                    Global.Toolkit.transmitHallMsg(msg._para.Reason._explain, null, null, 1);
                }
                DdzDriver_1.default.instance.leaveGame();
            }
        }
        else {
            if (this.context.get(this.Define.FieldInSettle)) // 结算中 不去处理其他玩家的leave
                return;
            if (msg._para && msg._para.Reason && (msg._para.Reason._reason == 103 || msg._para.Reason._reason == 105)) {
                // 103 105不处理
            }
            else {
                this.mainUI.callPlayer(sit, "hide");
            }
        }
    };
    DdzLeaveHandler.prototype.checkInQueue = function (msg) {
        //不是自己 就放到对列中
        if (msg._src != Game.Context.selfSrc)
            return true;
        if (msg._para && msg._para.Reason && (msg._para.Reason._reason == 102 || msg._para.Reason._reason == 103 || msg._para.Reason._reason == 20)) {
            //重新匹配中不发送心跳
            if (msg._para.Reason._reason == 103) {
                if (Game.Server.stopHeartBeat)
                    Game.Server.stopHeartBeat();
            }
            return true;
        }
        return false;
    };
    return DdzLeaveHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzLeaveHandler;

cc._RF.pop();