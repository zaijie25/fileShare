"use strict";
cc._RF.push(module, 'bc4f4WulkVAgr4dE8rAWFj7', 'ErmjLeaveHandler');
// ermj/Ermj/scripts/handlers/ErmjLeaveHandler.ts

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
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjLeaveHandler = /** @class */ (function (_super) {
    __extends(ErmjLeaveHandler, _super);
    function ErmjLeaveHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjLeaveHandler.prototype.refreshData = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        if (this.context.playerList[sit]) {
            Logger.error("leave", sit, msg._src);
            this.context.playerList[sit].clear();
        }
        else {
            Logger.error("leave error");
        }
    };
    ErmjLeaveHandler.prototype.execute = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjLeaveHandler", this.Define.HeadMoveTime + 0.1);
        if (msg._src == this.context.selfSrc) {
            //重新匹配
            if (msg._para && msg._para.Reason && msg._para.Reason._reason == 103) {
                Game.Server.clearData();
                Game.Tween.clear();
                Global.HallServer.setSession(null);
                var gameTimes = msg._para && msg._para.GameTimes || 0;
                if (gameTimes > 0) {
                    Game.Server.stopGame();
                    this.mainUI.settleView.showActionBtn(true);
                    this.mainUI.flowView.showActionBtn(true);
                }
                else {
                    this.mainUI.flowView.showActionBtn(false);
                    this.mainUI.settleView.showActionBtn(false);
                    this.mainUI.matchPlayerView.active = false;
                    Game.Server.clearDst();
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
                ErmjDriver_1.default.instance.leaveGame();
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
    ErmjLeaveHandler.prototype.checkInQueue = function (msg) {
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
    return ErmjLeaveHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjLeaveHandler;

cc._RF.pop();