
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzLeaveHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpMZWF2ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDBDQUFxQztBQUVyQztJQUE2QyxtQ0FBYztJQUEzRDs7SUEyRUEsQ0FBQztJQTFFYSxxQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7YUFDRztZQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRVMsaUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTVGLElBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQztZQUNoQyxNQUFNO1lBQ04sSUFBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENB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QUNiLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDaEMsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksR0FBRyxJQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBQztZQUN6SSxZQUFZO1lBQ1osSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksR0FBRyxFQUFDO2dCQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTtvQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQTNFQSxBQTJFQyxDQTNFNEMsd0JBQWMsR0EyRTFEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VIYW5kbGVyIGZyb20gXCIuL0RkekJhc2VIYW5kbGVyXCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6TGVhdmVIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnKXtcclxuICAgICAgICBsZXQgc2l0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQucGxheWVyTGlzdFtzaXRdKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibGVhdmVcIiwgc2l0LCBtc2cuX3NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W3NpdF0uY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibGVhdmUgZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IHNpdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkRkekxlYXZlSGFuZGxlclwiLCB0aGlzLkRlZmluZS5IZWFkTW92ZVRpbWUgKyAwLjEpO1xyXG5cclxuICAgICAgICBpZihtc2cuX3NyYyA9PSB0aGlzLmNvbnRleHQuc2VsZlNyYyl7XHJcbiAgICAgICAgICAgIC8v6YeN5paw5Yy56YWNXHJcbiAgICAgICAgICAgIGlmKG1zZy5fcGFyYSAmJiBtc2cuX3BhcmEuUmVhc29uICYmIG1zZy5fcGFyYS5SZWFzb24uX3JlYXNvbiA9PSAxMDMpe1xyXG4gICAgICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLlR3ZWVuLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZXRTZXNzaW9uKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdhbWVUaW1lcyA9IG1zZy5fcGFyYSAmJiBtc2cuX3BhcmEuR2FtZVRpbWVzIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZVRpbWVzID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc3RvcEdhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNob3dSZXdhcmRBY3Rpb25WaWV3KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmdhbWVTZXR0bGVWaWV3LnNob3dBY3Rpb25CdG4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2hvd1Jld2FyZEFjdGlvblZpZXcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLm1hdGNoUGxheWVyVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5nYW1lU2V0dGxlVmlldy5zaG93QWN0aW9uQnRuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLlNlcnZlci5kc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wudHJ5U2VuZEVudGVyKHtcIl9mcm9tXCI6XCJqdW1wXCJ9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihzaXQsIFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChtc2cuX3BhcmEgJiYgbXNnLl9wYXJhLlJlYXNvbiAmJiBtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsTXNnKFwi6YeR5biB5LiN5aSf5ZWm77yM5piv5ZCm5YmN5b6A5YWF5YC877yfXCIsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYXJnZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIG1zZy5fcGFyYSAmJiAgbXNnLl9wYXJhLlJlYXNvbiAmJiBtc2cuX3BhcmEuUmVhc29uLl9leHBsYWluKXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC50cmFuc21pdEhhbGxNc2cobXNnLl9wYXJhLlJlYXNvbi5fZXhwbGFpbixudWxsLG51bGwsMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5sZWF2ZUdhbWUoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRJblNldHRsZSkpICAgIC8vIOe7k+eul+S4rSDkuI3ljrvlpITnkIblhbbku5bnjqnlrrbnmoRsZWF2ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZihtc2cuX3BhcmEgJiYgbXNnLl9wYXJhLlJlYXNvbiAmJiAobXNnLl9wYXJhLlJlYXNvbi5fcmVhc29uID09IDEwMyB8fCBtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTA1KSl7XHJcbiAgICAgICAgICAgICAgICAvLyAxMDMgMTA15LiN5aSE55CGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIoc2l0LCBcImhpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2cpe1xyXG4gICAgICAgIC8v5LiN5piv6Ieq5bexIOWwseaUvuWIsOWvueWIl+S4rVxyXG4gICAgICAgIGlmIChtc2cuX3NyYyAhPSBHYW1lLkNvbnRleHQuc2VsZlNyYykgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmIChtc2cuX3BhcmEgJiYgbXNnLl9wYXJhLlJlYXNvbiAmJiAobXNnLl9wYXJhLlJlYXNvbi5fcmVhc29uID09IDEwMiB8fCBtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAzICB8fCBtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMjApKXtcclxuICAgICAgICAgICAgLy/ph43mlrDljLnphY3kuK3kuI3lj5HpgIHlv4Pot7NcclxuICAgICAgICAgICAgaWYobXNnLl9wYXJhLlJlYXNvbi5fcmVhc29uID09IDEwMyl7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lLlNlcnZlci5zdG9wSGVhcnRCZWF0KVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnN0b3BIZWFydEJlYXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19